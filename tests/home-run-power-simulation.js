const fs = require("fs");
const path = require("path");
const vm = require("vm");

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
  return new Proxy(
    { measureText(text) { return { width: String(text).length * 12 }; } },
    {
      get(target, prop) { return prop in target ? target[prop] : () => {}; },
      set(target, prop, value) { target[prop] = value; return true; }
    }
  );
}

function createGameContext(seed = 260724) {
  const canvas = makeElement("gameCanvas");
  canvas.width = 1280;
  canvas.height = 860;
  canvas.getContext = () => createCanvasContext();
  [
    "startMenu", "menuButton", "startButton", "practiceStartButton", "pitchingPracticeStartButton",
    "homeRunDerbyStartButton", "soundToggleButton", "bgmToggleButton", "menuSoundToggleButton",
    "menuBgmToggleButton", "menuPointStatus", "playerChooser", "chooserTitle", "chooserOptions",
    "chooserClose", "chooserTitleHome", "chooserOptionsHome", "chooserCloseHome", "modeSelect",
    "awayPresetSelect", "homePresetSelect", "firstBatSelect", "inningsSelect", "stadiumSelect",
    "practicePitcherControlSelect", "practicePitcherTypeSelect", "practiceBatterSelect",
    "practicePitcherSelect", "pitchingPracticePitcherSelect", "pitchingPracticeBatterSelect",
    "pitchingPracticeBatterTypeSelect", "p1DefenseSelect", "p2DefenseSelect",
    "homeRunDerbyPlayerCountSelect", "homeRunDerbyAwayBatterSelect", "homeRunDerbyHomeBatterSelect"
  ].forEach(makeElement);
  makeElement("modeSelect").value = "watch";
  makeElement("awayPresetSelect").value = "dodgers";
  makeElement("homePresetSelect").value = "dodgers";
  makeElement("firstBatSelect").value = "away";
  makeElement("inningsSelect").value = "3";
  makeElement("stadiumSelect").value = "fireworks";
  makeElement("p1DefenseSelect").value = "auto";
  makeElement("p2DefenseSelect").value = "auto";

  let randomState = seed >>> 0;
  const seededMath = Object.create(Math);
  seededMath.random = () => {
    randomState = (randomState * 1664525 + 1013904223) >>> 0;
    return randomState / 4294967296;
  };
  const context = {
    console,
    window: { addEventListener() {} },
    document: {
      getElementById: makeElement,
      querySelector() { return makeElement("gameShell"); },
      querySelectorAll() { return []; }
    },
    navigator: { getGamepads() { return []; } },
    Image: function Image() { this.complete = true; this.naturalWidth = 1800; },
    Audio: function Audio() { this.play = () => Promise.resolve(); this.pause = () => {}; },
    performance: { now: () => 1000 },
    requestAnimationFrame() {},
    setTimeout() { return 0; },
    Math: seededMath,
    Set,
    Number
  };
  vm.createContext(context);
  return context;
}

const context = createGameContext();
vm.runInContext(fs.readFileSync(path.join(root, "script.js"), "utf8"), context, { filename: "script.js" });

const result = vm.runInContext(`
(() => {
  applyStadiumPreset("fireworks");
  activePitcher = findById(pitchers, "yamamoto");
  const samples = 6000;
  const powers = [1, 5, 8, 9, 10, 20, 30, 40, 43];
  return powers.map((rating) => {
    activeBatter = { ...findById(batters, "judge"), power: rating, meet: 6 };
    let candidates = 0;
    let homers = 0;
    let walls = 0;
    let warningTrack = 0;
    let distanceTotal = 0;
    let maxDistance = 0;
    for (let index = 0; index < samples; index += 1) {
      const profile = {
        quality: 0.62,
        feedbackScore: 0.62,
        displayOverallScore: 0.65,
        power: 1.28,
        exitVelocity: 1.02,
        carry: 1,
        launchAngle: 28,
        direction: normalize({ x: 0.08, y: -1 }),
        zoneBand: "middle",
        preserveUnifiedDirection: true
      };
      const hit = makeUnifiedFlyResult(profile, 0.62);
      const ball = buildBattedBall(hit.power, hit.direction, hit.label, hit.battedProfile);
      if (hit.battedProfile?.unifiedHomerCandidate) {
        candidates += 1;
      }
      if (ball.fenceOver) {
        homers += 1;
        distanceTotal += ball.flightDistanceMeters;
        maxDistance = Math.max(maxDistance, ball.flightDistanceMeters);
      }
      if (ball.cancelledHomerFallback === "wall") walls += 1;
      if (ball.cancelledHomerFallback === "warningTrack") warningTrack += 1;
    }
    const fallbackTotal = walls + warningTrack;
    const powerProfile = getHomeRunPowerProfile();
    return {
      power: rating,
      candidateRate: Math.round(candidates / samples * 1000) / 10,
      homeRunRate: Math.round(homers / samples * 1000) / 10,
      averageHomeRunMeters: homers ? Math.round(distanceTotal / homers * 10) / 10 : 0,
      maxHomeRunMeters: Math.round(maxDistance * 10) / 10,
      cancelledWallRate: fallbackTotal ? Math.round(walls / fallbackTotal * 1000) / 10 : 0,
      candidateBonus: Math.round(powerProfile.candidateBonus * 1000) / 10,
      carryBonusMeters: Math.round(powerProfile.carryBonusMeters * 10) / 10
    };
  });
})()
`, context);

console.table(result);

for (let index = 1; index < result.length; index += 1) {
  if (result[index].candidateRate < result[index - 1].candidateRate - 1) {
    throw new Error("home-run candidate rate should not decrease as power rises");
  }
  if (result[index].averageHomeRunMeters < result[index - 1].averageHomeRunMeters - 1) {
    throw new Error("average home-run distance should not materially decrease as power rises");
  }
}

const powerEight = result.find((entry) => entry.power === 8);
const powerTen = result.find((entry) => entry.power === 10);
const powerForty = result.find((entry) => entry.power === 40);
if (!(powerEight.homeRunRate > result.find((entry) => entry.power === 5).homeRunRate)) {
  throw new Error("power 8 should homer more often than power 5");
}
if (!(powerTen.homeRunRate > powerEight.homeRunRate)) {
  throw new Error("power 10 should homer more often than power 8");
}
if (!(powerForty.averageHomeRunMeters > powerTen.averageHomeRunMeters + 25)) {
  throw new Error("super-power hitters should have clearly exceptional home-run distance");
}
for (const power of [5, 8, 9, 10, 20, 40]) {
  const entry = result.find((item) => item.power === power);
  if (entry.cancelledWallRate < 65 || entry.cancelledWallRate > 95) {
    throw new Error(`cancelled home runs should usually become wall hits at power ${power}`);
  }
}
