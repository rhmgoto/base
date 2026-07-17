const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { assert } = require("./check-utils");

const root = path.resolve(__dirname, "..");
const elements = new Map();

function makeElement(id) {
  if (elements.has(id)) return elements.get(id);
  const element = {
    id,
    value: "",
    dataset: {},
    attributes: {},
    className: "",
    innerHTML: "",
    textContent: "",
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() { return false; }
    },
    addEventListener() {},
    setAttribute(name, value) { this.attributes[name] = String(value); },
    getAttribute(name) { return this.attributes[name] ?? null; },
    getBoundingClientRect() { return { left: 0, top: 0, width: 1280, height: 860 }; },
    querySelector() { return makeElement(`${id}-child`); }
  };
  elements.set(id, element);
  return element;
}

function createCanvasContext() {
  const base = { measureText(text) { return { width: String(text).length * 12 }; } };
  return new Proxy(base, {
    get(target, prop) { return prop in target ? target[prop] : () => {}; },
    set(target, prop, value) { target[prop] = value; return true; }
  });
}

function createGameContext() {
  const canvas = makeElement("gameCanvas");
  canvas.width = 1280;
  canvas.height = 860;
  canvas.getContext = () => createCanvasContext();

  makeElement("modeSelect").value = "versus";
  makeElement("awayPresetSelect").value = "dodgers";
  makeElement("homePresetSelect").value = "dodgers";
  makeElement("firstBatSelect").value = "away";
  makeElement("inningsSelect").value = "1";
  makeElement("stadiumSelect").value = "fireworks";
  makeElement("p1DefenseSelect").value = "auto";
  makeElement("p2DefenseSelect").value = "auto";

  const context = {
    console,
    window: { addEventListener() {} },
    document: {
      getElementById: makeElement,
      querySelector() { return makeElement("gameShell"); },
      querySelectorAll() { return []; }
    },
    Image: function Image() { this.complete = true; this.naturalWidth = 1800; },
    Audio: function Audio(src = "") {
      this.src = src;
      this.currentTime = 0;
      this.loop = false;
      this.muted = false;
      this.paused = true;
      this.play = () => Promise.resolve();
      this.pause = () => {};
    },
    performance: { now: () => 1000 },
    requestAnimationFrame() {},
    setTimeout(callback) { callback(); return 0; },
    Math,
    Set,
    Number
  };
  vm.createContext(context);
  return context;
}

function runInGame(context, code) {
  return vm.runInContext(code, context, { filename: "pitch-aim-eval.js" });
}

const context = createGameContext();
vm.runInContext(fs.readFileSync(path.join(root, "script.js"), "utf8"), context, { filename: "script.js" });

const result = JSON.parse(runInGame(context, `(() => {
  const originalRandom = Math.random;
  let seed = 260717;
  Math.random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  try {
    gameMode = "watch";
    count.balls = 0;
    count.strikes = 0;
    const zonePoints = getGoodContactZonePoints();
    const zoneCenter = getPolygonCenter(zonePoints);
    const centerMarkerRadius = getGoodContactZoneCenterMarkerRadius();
    const centerZoneRate = getGoodContactZoneDistanceRate(zoneCenter.x, zoneCenter.y, 0);
    const markerEdgeZoneRate = getGoodContactZoneDistanceRate(zoneCenter.x + centerMarkerRadius, zoneCenter.y, 0);
    const outsideMarkerZoneRate = getGoodContactZoneDistanceRate(zoneCenter.x + centerMarkerRadius + 4 * field.plateScale, zoneCenter.y, 0);
    const zoneScoreChecks = [0, 20, 50, 80, 100, 130, 170, 190].map((rate) => ({
      rate,
      score: getZoneScoreFromDistanceRate(rate),
      cap: getZoneBattingFeedbackCap(rate),
      overall: getRawBattingFeedbackScore({
        timingScore: 1,
        sweetSpotScore: 1,
        barrelScore: 1,
        zoneScore: getZoneScoreFromDistanceRate(rate),
        zoneDistanceRate: rate,
        quality: 1,
        profileScore: 1
      })
    }));
    const planChecks = [];
    for (let index = 0; index < 10000; index += 1) {
      const plan = chooseComputerPitchPlan();
      const shared = getSharedPitchCourseAim(plan.course, getPitchRadius(plan.type), plan.type, pitchTypes[plan.type]);
      planChecks.push({
        targetDifference: Math.abs(plan.targetX - shared.targetX),
        targetYDifference: Math.abs(plan.targetY - shared.targetY),
        spreadDifference: Math.abs(plan.targetSpread - shared.targetSpread),
        locked: plan.lockTarget === true
      });
    }

    const byControl = [];
    for (let control = 1; control <= 10; control += 1) {
      let maximumDeviation = 0;
      let normalPitchCount = 0;
      let majorMissCount = 0;
      const effectiveControl = clamp(control * pitcherAbilityTuning.globalMultiplier, 1, 10);
      for (const pitchType of ["normal", "fast"]) {
        for (const direction of [-1, 1]) {
          const aim = getSharedPitchCourseAim({ direction }, getPitchRadius(pitchType), pitchType, pitchTypes[pitchType]);
          const profile = getPitchControlProfile(effectiveControl, 0, {
            pitchType,
            courseDirection: direction,
            countPressure: 0
          });
          const allowedDeviation = aim.targetSpread * profile.spread;
          for (let sample = 0; sample < 10000; sample += 1) {
            const controlMiss = getPitchControlMiss(profile, aim.targetX, aim.targetY);
            if (controlMiss.type !== "none") {
              majorMissCount += 1;
              continue;
            }
            const targetX = controlMiss.x + randomBetween(-allowedDeviation, allowedDeviation);
            const deviation = Math.abs(targetX - aim.targetX);
            maximumDeviation = Math.max(maximumDeviation, deviation);
            normalPitchCount += 1;
            if (deviation > allowedDeviation + 0.0001) {
              throw new Error("non-mistake straight pitch exceeded the shared player spread");
            }
          }
        }
      }
      byControl.push({ control, effectiveControl, maximumDeviation, normalPitchCount, majorMissCount });
    }
    return JSON.stringify({
      planCount: planChecks.length,
      maximumPlanTargetDifference: Math.max(...planChecks.map((item) => item.targetDifference)),
      maximumPlanTargetYDifference: Math.max(...planChecks.map((item) => item.targetYDifference)),
      maximumPlanSpreadDifference: Math.max(...planChecks.map((item) => item.spreadDifference)),
      lockedPlanCount: planChecks.filter((item) => item.locked).length,
      fixedPitchTargetY: getPitchVerticalTarget(),
      expectedPitchTargetY: field.plateY,
      centerZoneRate,
      markerEdgeZoneRate,
      outsideMarkerZoneRate,
      zoneScoreChecks,
      byControl
    });
  } finally {
    Math.random = originalRandom;
  }
})()`));

assert(result.planCount === 10000, "should inspect 10,000 CPU pitch plans");
assert(result.maximumPlanTargetDifference < 0.0001, "CPU and player target X should match");
assert(result.maximumPlanTargetYDifference < 0.0001, "CPU and player target Y should match");
assert(result.maximumPlanSpreadDifference < 0.0001, "CPU and player base spread should match");
assert(result.lockedPlanCount === 0, "CPU should not lock targets outside the player control rules");
assert(result.fixedPitchTargetY === result.expectedPitchTargetY, "all pitches should use the single fixed vertical target");
assert(result.centerZoneRate === 0 && result.markerEdgeZoneRate === 0, "the complete center marker should receive the best zone score");
assert(result.outsideMarkerZoneRate > 0, "zone score should fall after contact leaves the center marker");
assert(JSON.stringify(result.zoneScoreChecks.map((item) => item.score)) === JSON.stringify([1, 0.98, 0.85, 0.65, 0.5, 0.3, 0.1, 0]), "zone scores should follow the requested distance curve");
assert(JSON.stringify(result.zoneScoreChecks.map((item) => item.cap)) === JSON.stringify([1, 1, 1, 1, 1, 0.7, 0.5, 0.3]), "zone caps should stay open inside the zone and tighten outside it");
assert(Math.abs(result.zoneScoreChecks.find((item) => item.rate === 100).overall - 0.84) < 0.0001, "the zone edge should use its weighted score without a zone cap");
assert(Math.abs(result.zoneScoreChecks.find((item) => item.rate === 130).overall - 0.7) < 0.0001, "slight outside contact should cap overall feedback at seventy");
assert(Math.abs(result.zoneScoreChecks.find((item) => item.rate === 170).overall - 0.5) < 0.0001, "outside contact should cap overall feedback at fifty");
assert(Math.abs(result.zoneScoreChecks.find((item) => item.rate === 190).overall - 0.3) < 0.0001, "far outside contact should cap overall feedback at thirty");
assert(result.byControl.every((item) => item.normalPitchCount > 30000), "each control rating needs enough normal pitches");
assert(result.byControl.every((item) => item.maximumDeviation <= 69.001), "normal straight pitches must stay inside the shared spread limit");

console.log(JSON.stringify(result));
console.log("Pitch aim simulation passed");
