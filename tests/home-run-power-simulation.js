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
    let wallHits = 0;
    let nearFenceInPlay = 0;
    let linerHomers = 0;
    let flyHomers = 0;
    let barelyHomers = 0;
    let ordinaryHomers = 0;
    let longHomers = 0;
    let monsterHomers = 0;
    let distanceTotal = 0;
    let minimumDistance = Infinity;
    let maxDistance = 0;
    let homeRunTimeTotal = 0;
    for (let index = 0; index < samples; index += 1) {
      const launchAngles = [16, 20, 24, 28, 34];
      const profile = {
        quality: 0.62,
        feedbackScore: 0.62,
        displayOverallScore: 0.65,
        power: 1.28,
        exitVelocity: 1.02,
        carry: 1,
        launchAngle: launchAngles[index % launchAngles.length],
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
        minimumDistance = Math.min(minimumDistance, ball.flightDistanceMeters);
        maxDistance = Math.max(maxDistance, ball.flightDistanceMeters);
        homeRunTimeTotal += ball.ballTime;
        if (ball.isLiner) linerHomers += 1;
        else flyHomers += 1;
        const fenceTravelDistance = getFenceIntersectionFromPoint(ball.origin, ball.direction)?.travelDistance
          ?? defenseField.fenceDistance;
        const fenceMeters = getBattedBallDistanceMeters(fenceTravelDistance, {
          direction: ball.direction,
          fenceTravelDistance
        });
        const clearance = ball.flightDistanceMeters - fenceMeters;
        if (clearance <= 18) barelyHomers += 1;
        else if (ball.flightDistanceMeters <= 145) ordinaryHomers += 1;
        else if (ball.flightDistanceMeters <= 160) longHomers += 1;
        else monsterHomers += 1;
      }
      if (ball.wallHit) wallHits += 1;
      if (!ball.fenceOver && !ball.wallHit) {
        const fenceTravelDistance = getFenceIntersectionFromPoint(ball.origin, ball.direction)?.travelDistance
          ?? defenseField.fenceDistance;
        const fenceMeters = getBattedBallDistanceMeters(fenceTravelDistance, {
          direction: ball.direction,
          fenceTravelDistance
        });
        if (ball.flightDistanceMeters >= fenceMeters - 5) nearFenceInPlay += 1;
      }
    }
    const powerProfile = getHomeRunPowerProfile();
    return {
      power: rating,
      candidateRate: Math.round(candidates / samples * 1000) / 10,
      homeRunRate: Math.round(homers / samples * 1000) / 10,
      wallHitRate: Math.round(wallHits / samples * 1000) / 10,
      nearFenceInPlayRate: Math.round(nearFenceInPlay / samples * 1000) / 10,
      averageHomeRunMeters: homers ? Math.round(distanceTotal / homers * 10) / 10 : 0,
      minimumHomeRunMeters: homers ? Math.round(minimumDistance * 10) / 10 : 0,
      maxHomeRunMeters: Math.round(maxDistance * 10) / 10,
      averageHomeRunSeconds: homers ? Math.round(homeRunTimeTotal / homers * 100) / 100 : 0,
      linerHomerRate: homers ? Math.round(linerHomers / homers * 1000) / 10 : 0,
      flyHomerRate: homers ? Math.round(flyHomers / homers * 1000) / 10 : 0,
      barelyHomerRate: homers ? Math.round(barelyHomers / homers * 1000) / 10 : 0,
      ordinaryHomerRate: homers ? Math.round(ordinaryHomers / homers * 1000) / 10 : 0,
      longHomerRate: homers ? Math.round(longHomers / homers * 1000) / 10 : 0,
      monsterHomerRate: homers ? Math.round(monsterHomers / homers * 1000) / 10 : 0,
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
const powerFive = result.find((entry) => entry.power === 5);
if (!(powerFive.wallHitRate > 5 && powerFive.homeRunRate > 5)) {
  throw new Error("ordinary power should produce both home runs and fence hits");
}
if (!(powerFive.minimumHomeRunMeters < powerFive.averageHomeRunMeters - 2)) {
  throw new Error("power 5 should include weaker home runs instead of one fixed distance");
}
if (!(powerFive.barelyHomerRate > 5 && powerFive.linerHomerRate > 10 && powerFive.flyHomerRate > 20)) {
  throw new Error("power 5 should produce barely-cleared, liner, and fly-ball home runs");
}
if (!(powerTen.maxHomeRunMeters <= 162)) {
  throw new Error("normal power ratings should not produce superhuman home-run distance");
}
if (!(powerForty.monsterHomerRate > powerTen.monsterHomerRate + 25)) {
  throw new Error("monster home runs should remain concentrated among super-power hitters");
}
