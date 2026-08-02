// 走塁まわりの回帰テスト。
// 塁状態(bases)は得点と成績の正なので、走者が消える・未到達で得点する・
// 長打が一塁止まりになる といった不整合をここで固定する。
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

function createGameContext(seed = null) {
  const canvas = makeElement("gameCanvas");
  canvas.width = 1280;
  canvas.height = 860;
  canvas.getContext = () => createCanvasContext();

  [
    "startMenu", "menuButton", "startButton", "practiceStartButton", "pitchingPracticeStartButton",
    "soundToggleButton", "bgmToggleButton", "menuSoundToggleButton", "menuBgmToggleButton",
    "menuPointStatus", "playerChooser", "chooserTitle", "chooserOptions", "chooserClose",
    "chooserTitleHome", "chooserOptionsHome", "chooserCloseHome", "modeSelect", "awayPresetSelect",
    "homePresetSelect", "firstBatSelect", "inningsSelect", "stadiumSelect", "practicePitcherControlSelect",
    "practicePitcherTypeSelect", "practiceBatterSelect", "practicePitcherSelect", "p1DefenseSelect",
    "p2DefenseSelect"
  ].forEach(makeElement);

  makeElement("modeSelect").value = seed === null ? "versus" : "watch";
  makeElement("awayPresetSelect").value = "tigers";
  makeElement("homePresetSelect").value = "dodgers";
  makeElement("firstBatSelect").value = "away";
  makeElement("inningsSelect").value = "3";
  makeElement("stadiumSelect").value = "fireworks";
  makeElement("p1DefenseSelect").value = seed === null ? "manual" : "auto";
  makeElement("p2DefenseSelect").value = seed === null ? "manual" : "auto";

  let now = 1000;
  let mathObject = Math;
  if (seed !== null) {
    let randomState = seed >>> 0;
    const seededMath = Object.create(Math);
    seededMath.random = () => {
      randomState = (randomState * 1664525 + 1013904223) >>> 0;
      return randomState / 4294967296;
    };
    mathObject = seededMath;
  }

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
    Audio: function Audio(src = "") {
      this.src = src;
      this.currentTime = 0;
      this.loop = false;
      this.muted = false;
      this.paused = true;
      this.play = () => Promise.resolve();
      this.pause = () => {};
    },
    performance: { now: () => now },
    requestAnimationFrame() {},
    setTimeout(callback) { callback(); return 0; },
    Math: mathObject,
    Set,
    Number,
    JSON,
    __advanceTime(ms) { now += ms; }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, "script.js"), "utf8"), context, { filename: "script.js" });
  return context;
}

function makeRunner(context, code) {
  return vm.runInContext(`(function(){${code}})()`, context, { filename: "baserunning-eval.js" });
}

// ---------------------------------------------------------------------------
// 単体テスト
// ---------------------------------------------------------------------------
const unit = createGameContext();
const run = (code) => makeRunner(unit, code);

run("startGame(); return 0;");

const setBases = `
  bases = createEmptyBases();
  count.outs = 0;
  defenseState.startTime = 0;
  defenseState.baseRunners = [];
  defenseState.runner = null;
  defenseState.throw = null;
  defenseState.battedBall = null;
  defenseState.outcome = null;
  defenseState.completedForceOutBases = [];
`;

function baseSnapshot(code) {
  return run(`
    ${setBases}
    ${code}
    return JSON.stringify({
      runs: typeof runs === "number" ? runs : null,
      first: bases.first ? bases.first.name : null,
      second: bases.second ? bases.second.name : null,
      third: bases.third ? bases.third.name : null,
      outs: count.outs
    });
  `);
}

function expectBases(label, code, expected) {
  const actual = baseSnapshot(code);
  const actualObject = JSON.parse(actual);
  Object.entries(expected).forEach(([key, value]) => {
    assert(
      actualObject[key] === value,
      `${label}: ${key} は ${JSON.stringify(value)} を期待したが ${JSON.stringify(actualObject[key])} だった (${actual})`
    );
  });
}

// --- applyRunnerResults: 塁の重複で走者が消えないこと (P0-1) ---
// 目標塁が競合しても、どちらの走者も塁上から消えないこと。
// (一塁走者が留まったまま打者が一塁へ来る状態は本来成立しないが、
//  そこで走者を握り潰さないのが applyRunnerResults の役割)
expectBases(
  "一塁走者が留まる横で打者走者が一塁に来ても走者は消えない",
  `
    const runs = applyRunnerResults([
      { runnerInfo: { id: "R1", name: "RUN1", run: 5 }, startBase: "first", targetBase: "first" },
      { runnerInfo: { id: "B", name: "BAT", run: 5 }, startBase: "batter", targetBase: "first" }
    ]).runs;
  `,
  { first: "RUN1", second: "BAT", third: null }
);

expectBases(
  "三塁走者が留まる横で二塁走者が三塁を狙っても走者は消えない",
  `
    const runs = applyRunnerResults([
      { runnerInfo: { id: "R3", name: "RUN3", run: 5 }, startBase: "third", targetBase: "third" },
      { runnerInfo: { id: "R2", name: "RUN2", run: 5 }, startBase: "second", targetBase: "third" },
      { runnerInfo: { id: "B", name: "BAT", run: 5 }, startBase: "batter", targetBase: "first" }
    ]).runs;
  `,
  { first: "BAT", second: "RUN2", third: "RUN3" }
);

expectBases(
  "先頭走者が生還すれば後続は詰めて進める",
  `
    const runs = applyRunnerResults([
      { runnerInfo: { id: "R3", name: "RUN3", run: 5 }, startBase: "third", targetBase: "home" },
      { runnerInfo: { id: "R2", name: "RUN2", run: 5 }, startBase: "second", targetBase: "third" },
      { runnerInfo: { id: "B", name: "BAT", run: 5 }, startBase: "batter", targetBase: "first" }
    ]).runs;
  `,
  { runs: 1, first: "BAT", second: null, third: "RUN2" }
);

expectBases(
  "アウトになった走者は塁に残らない",
  `
    const runs = applyRunnerResults([
      { runnerInfo: { id: "R1", name: "RUN1", run: 5 }, startBase: "first", targetBase: "second", out: true },
      { runnerInfo: { id: "B", name: "BAT", run: 5 }, startBase: "batter", targetBase: "first" }
    ]).runs;
  `,
  { runs: 0, first: "BAT", second: null, third: null }
);

// --- applyRunnerResults: 得点の抑止 (3アウト目の封殺) ---
expectBases(
  "allowRuns:false なら生還しても得点しない",
  `
    const runs = applyRunnerResults([
      { runnerInfo: { id: "R3", name: "RUN3", run: 5 }, startBase: "third", targetBase: "home" }
    ], { allowRuns: false }).runs;
  `,
  { runs: 0, third: null }
);

// --- 四球の押し出し ---
expectBases(
  "四球: 一塁が空いていれば走者は動かない",
  `
    bases.second = makeBaseRunner({ id: "R2", name: "RUN2" });
    bases.third = makeBaseRunner({ id: "R3", name: "RUN3" });
    const runs = advanceRunners("walk", { id: "B", name: "BAT" });
  `,
  { runs: 0, first: "BAT", second: "RUN2", third: "RUN3" }
);

expectBases(
  "四球: 一三塁なら一塁走者だけ進む",
  `
    bases.first = makeBaseRunner({ id: "R1", name: "RUN1" });
    bases.third = makeBaseRunner({ id: "R3", name: "RUN3" });
    const runs = advanceRunners("walk", { id: "B", name: "BAT" });
  `,
  { runs: 0, first: "BAT", second: "RUN1", third: "RUN3" }
);

expectBases(
  "四球: 満塁なら押し出しで1点",
  `
    bases.first = makeBaseRunner({ id: "R1", name: "RUN1" });
    bases.second = makeBaseRunner({ id: "R2", name: "RUN2" });
    bases.third = makeBaseRunner({ id: "R3", name: "RUN3" });
    const runs = advanceRunners("walk", { id: "B", name: "BAT" });
  `,
  { runs: 1, first: "BAT", second: "RUN1", third: "RUN2" }
);

// ---------------------------------------------------------------------------
// 現仕様: CPU攻撃(自動走塁)の打者走者は長打性の当たりでも一塁で止まる。
// 記録・表示・塁状態がすべて単打で揃うこと。進塁の判断はプレイヤー操作に委ねる。
// ---------------------------------------------------------------------------
expectBases(
  "自動走塁: 二塁打性の当たりでも打者は一塁で止まる",
  `
    const previousMode = gameMode;
    gameMode = "watch";
    const runs = advanceRunners("double", { id: "B", name: "BAT", run: 5 }, { ballTime: 1.5 }, { scoreType: "double" });
    gameMode = previousMode;
  `,
  { first: "BAT", second: null, third: null }
);

expectBases(
  "自動走塁: 二塁打性の当たりでも一塁走者は二塁まで",
  `
    const previousMode = gameMode;
    gameMode = "watch";
    bases.first = makeBaseRunner({ id: "R1", name: "RUN1", run: 5 });
    const runs = advanceRunners("double", { id: "B", name: "BAT", run: 5 }, { ballTime: 1.5 }, { scoreType: "double" });
    gameMode = previousMode;
  `,
  { first: "BAT", second: "RUN1", third: null }
);

assert(
  run(`
    const previousMode = gameMode;
    gameMode = "watch";
    const result = {
      scoringHitType: getScoringHitType({ kind: "double", scoreType: "double" }),
      targetBase: getBatterRunnerTargetBase({ kind: "double", scoreType: "double" }, { ballTime: 1.5 })
    };
    gameMode = previousMode;
    return JSON.stringify(result);
  `) === '{"scoringHitType":"single","targetBase":"first"}',
  "自動走塁: 長打性の当たりは記録も目標塁も単打・一塁で揃うべき"
);

// 手動走塁では打者走者は一塁で待ち、その先はプレイヤーが指示する
assert(
  run(`return getBatterRunnerTargetBase({ kind: "double", scoreType: "double" }, { ballTime: 1.5 });`) === "first",
  "手動走塁: 打者走者は一塁で止まるべき"
);
assert(
  run(`return getScoringHitType({ kind: "double", scoreType: "double" });`) === "double",
  "手動走塁: 打球結果そのものは二塁打として保たれるべき"
);

// 本塁打とエンタイトルツーベースは、どちらのモードでも自動で塁が決まる
expectBases(
  "ホームランは全員生還",
  `
    const previousMode = gameMode;
    gameMode = "watch";
    bases.first = makeBaseRunner({ id: "R1", name: "RUN1", run: 5 });
    bases.third = makeBaseRunner({ id: "R3", name: "RUN3", run: 5 });
    const runs = advanceRunners("homer", { id: "B", name: "BAT", run: 5 }, { fenceOver: true }, { scoreType: "homer" });
    gameMode = previousMode;
  `,
  { runs: 3, first: null, second: null, third: null }
);

assert(
  run(`return getBatterRunnerTargetBase({ scoreType: "homer" }, { fenceOver: true });`) === "home",
  "本塁打の打者走者の目標塁は本塁であるべき"
);
assert(
  run(`return getBatterRunnerTargetBase({ kind: "double", scoreType: "double" }, { groundRuleDouble: true });`) === "second",
  "エンタイトルツーベースは自動で二塁が与えられるべき"
);
expectBases(
  "エンタイトルツーベースでは打者は二塁へ",
  `
    const previousMode = gameMode;
    gameMode = "watch";
    const runs = advanceRunners("double", { id: "B", name: "BAT", run: 5 }, { groundRuleDouble: true }, { scoreType: "double" });
    gameMode = previousMode;
  `,
  { first: null, second: "BAT", third: null }
);

// --- 未到達の走者は得点しない (P0-2) ---
expectBases(
  "守備プレー終了時に到達していない走者は得点しない",
  `
    defenseState.runner = { startBase: "batter", targetBase: "first", arrived: true, arrivalTime: 4 };
    defenseState.baseRunners = [
      {
        startBase: "third", currentBase: "third", targetBase: "home",
        id: "R3", name: "RUN3", run: 5,
        arrived: false, arrivalTime: 99, isOut: false
      }
    ];
    const runs = resolveDefensePlayBaseState({ batterInfo: { id: "B", name: "BAT", run: 5 } });
  `,
  { runs: 0, third: "RUN3" }
);

expectBases(
  "到達済みの走者は得点する",
  `
    defenseState.runner = { startBase: "batter", targetBase: "first", arrived: true, arrivalTime: 4 };
    defenseState.baseRunners = [
      {
        startBase: "third", currentBase: "third", targetBase: "home",
        id: "R3", name: "RUN3", run: 5,
        arrived: true, arrivalTime: 3, isOut: false
      }
    ];
    const runs = resolveDefensePlayBaseState({ batterInfo: { id: "B", name: "BAT", run: 5 } });
  `,
  { runs: 1, first: "BAT", third: null }
);

// --- タッチアウト時も得点が戻り値に反映されること (P0-4) ---
assert(
  run(`
    ${setBases}
    defenseState.runner = { startBase: "batter", targetBase: "first", arrived: true, arrivalTime: 4 };
    const outRunner = {
      startBase: "first", currentBase: "first", targetBase: "second",
      id: "R1", name: "RUN1", run: 5, arrived: true, arrivalTime: 3
    };
    defenseState.baseRunners = [
      {
        startBase: "third", currentBase: "third", targetBase: "home",
        id: "R3", name: "RUN3", run: 5, arrived: true, arrivalTime: 3
      },
      outRunner
    ];
    count.outs = 1;
    const before = scores[battingTeam];
    const runs = resolveDefensePlayBaseState({
      batterInfo: { id: "B", name: "BAT", run: 5 },
      outRunners: [outRunner]
    });
    return runs === 1 && scores[battingTeam] - before === 1;
  `) === true,
  "タッチアウト時の生還は戻り値と得点の両方に反映されるべき"
);

// --- 封殺後の押し出し (P1-5) ---
expectBases(
  "一二塁で二塁封殺なら二塁走者は三塁へ押し出される",
  `
    bases.first = makeBaseRunner({ id: "R1", name: "RUN1", run: 5 });
    bases.second = makeBaseRunner({ id: "R2", name: "RUN2", run: 5 });
    const runs = resolveDefensePlayBaseState({
      batterInfo: { id: "B", name: "BAT", run: 5 },
      forceOutBases: ["second"]
    });
  `,
  { first: "BAT", second: null, third: "RUN2" }
);

expectBases(
  "満塁で本塁封殺なら三塁走者だけアウトで他は1つ進む",
  `
    bases.first = makeBaseRunner({ id: "R1", name: "RUN1", run: 5 });
    bases.second = makeBaseRunner({ id: "R2", name: "RUN2", run: 5 });
    bases.third = makeBaseRunner({ id: "R3", name: "RUN3", run: 5 });
    const runs = resolveDefensePlayBaseState({
      batterInfo: { id: "B", name: "BAT", run: 5 },
      forceOutBases: ["home"]
    });
  `,
  { runs: 0, first: "BAT", second: "RUN1", third: "RUN2" }
);

expectBases(
  "一塁封殺(打者アウト)では二塁走者は塁に残る",
  `
    bases.second = makeBaseRunner({ id: "R2", name: "RUN2", run: 5 });
    const runs = resolveDefensePlayBaseState({
      batterInfo: { id: "B", name: "BAT", run: 5 },
      forceOutBases: ["first"]
    });
  `,
  { runs: 0, first: null, second: "RUN2", third: null }
);

// ---------------------------------------------------------------------------
// 手動走塁: 進塁指示と帰塁指示 (走りすぎた走者を戻せること)
// ---------------------------------------------------------------------------
const manualRunnerSteps = JSON.parse(run(`
  startGame();
  gameMode = "versus";
  battingTeam = "away";
  defenseControlMode = { away: "manual", home: "manual" };
  gamePhase = "defense";
  bases = createEmptyBases();
  activeBatter = findById(batters, "suzuki");
  const runner = createBatterRunner(activeBatter);
  defenseState = {
    ...createDefenseState(),
    active: true,
    startTime: performance.now() - 6000,
    runner,
    baseRunners: [],
    battedBall: { ballTime: 1, isGrounder: true },
    outcome: { kind: "single", scoreType: "single", caught: false, fieldingTime: 1 }
  };
  updateBatterRunner(6);
  const steps = [];
  const record = () => steps.push(defenseState.runner.targetBase);
  record();
  handleBatterRunnerBaseCommand("second", "advance");
  record();
  handleBatterRunnerBaseCommand("first", "return");
  record();
  return JSON.stringify({ manual: isManualBaserunningControl(), steps });
`));

assert(manualRunnerSteps.manual === true, "手動走塁の前提が成立していない");
assert(
  manualRunnerSteps.steps.join(",") === "first,second,first",
  `手動走塁: 進塁指示のあと帰塁指示で元の塁に戻せるべき (${manualRunnerSteps.steps.join(",")})`
);

// 塁上の走者を、打者走者と独立に動かせること。
// 到達しても startBase は動かないので、停止判定は currentBase を見る必要がある。
const baseRunnerSteps = JSON.parse(run(`
  startGame();
  gameMode = "versus";
  battingTeam = "away";
  defenseControlMode = { away: "manual", home: "manual" };
  gamePhase = "defense";
  bases = createEmptyBases();
  bases.first = makeBaseRunner(findById(batters, "ichiro"));
  activeBatter = findById(batters, "suzuki");
  const target = { x: field.plateX + 200, y: field.plateY - 700 };
  const single = {
    target, direction: normalize({ x: 0.3, y: -1 }), flightDistance: 700, landingDistance: 700,
    ballTime: 1.4, isGrounder: false, isLiner: true, isDeep: false, power: 0.6, trajectory: "liner",
    fenceOver: false, wallHit: false, groundRuleDouble: false
  };
  const outcome = { kind: "single", scoreType: "single", caught: false, needsThrow: false, fieldingTime: 1.8 };
  const fielder = { role: "C", x: target.x, y: target.y, speed: 5, fielding: 5, arm: 5 };
  const runners = createDefenseBaseRunnerAnimations(outcome, single, null, fielder, target);
  const runnerA = runners[0];
  defenseState = {
    ...createDefenseState(),
    active: true, resolved: false,
    startTime: performance.now() - 9000,
    outcome, battedBall: single,
    runner: createBatterRunner(activeBatter),
    baseRunners: runners,
    chosenFielder: fielder, target
  };
  updateDefenseBaseRunners(9);
  updateBatterRunner(9);
  const afterArrival = {
    currentBase: runnerA.currentBase,
    startBase: runnerA.startBase,
    stoppedOnSecond: isDefenseBaseRunnerStoppedOnBase(runnerA, 2)
  };
  handleBatterRunnerBaseCommand("third", "advance");
  const afterAdvance = { runnerA: runnerA.targetBase, batter: defenseState.runner.targetBase };
  handleBatterRunnerBaseCommand("second", "return");
  const afterReturn = { runnerA: runnerA.targetBase };
  return JSON.stringify({ afterArrival, afterAdvance, afterReturn });
`));

assert(
  baseRunnerSteps.afterArrival.stoppedOnSecond === true,
  `二塁に到達した走者は停止中と判定されるべき (${JSON.stringify(baseRunnerSteps.afterArrival)})`
);
assert(
  baseRunnerSteps.afterArrival.startBase === "first",
  "startBase はプレー開始時の塁のまま保たれるべき (封殺や走者の同定に使うため)"
);
assert(
  baseRunnerSteps.afterAdvance.runnerA === "third",
  `二塁の走者に三塁への進塁を指示できるべき (${baseRunnerSteps.afterAdvance.runnerA})`
);
assert(
  baseRunnerSteps.afterAdvance.batter === "first",
  "塁上走者への指示で打者走者が動いてはいけない"
);
assert(
  baseRunnerSteps.afterReturn.runnerA === "second",
  `走り出した塁上走者を二塁へ帰塁させられるべき (${baseRunnerSteps.afterReturn.runnerA})`
);

// ---------------------------------------------------------------------------
// 挟殺: 走者が塁と塁の間にいるとき、向かっている塁にボールが先着したらアウト
// ---------------------------------------------------------------------------
const rundown = JSON.parse(run(`
  function setup(withFirstRunner) {
    startGame();
    gameMode = "versus";
    battingTeam = "away";
    defenseControlMode = { away: "manual", home: "manual" };
    gamePhase = "defense";
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "ichiro"));
    if (withFirstRunner) bases.second = makeBaseRunner(findById(batters, "shuto"));
    activeBatter = findById(batters, "suzuki");
    const target = { x: field.plateX + 150, y: field.plateY - 500 };
    const ball = {
      target, direction: normalize({ x: 0.3, y: -1 }), flightDistance: 500, landingDistance: 500,
      ballTime: 1.2, isGrounder: true, isLiner: false, isDeep: false, power: 0.5, trajectory: "grounder",
      fenceOver: false, wallHit: false, groundRuleDouble: false
    };
    const outcome = { kind: "single", scoreType: "single", caught: false, needsThrow: false, fieldingTime: 1.5 };
    const fielder = { role: "SS", x: target.x, y: target.y, speed: 5, fielding: 5, arm: 5 };
    const runners = createDefenseBaseRunnerAnimations(outcome, ball, null, fielder, target);
    defenseState = {
      ...createDefenseState(),
      active: true, resolved: false,
      startTime: performance.now() - 9000,
      outcome, battedBall: ball,
      runner: createBatterRunner(activeBatter),
      baseRunners: runners,
      chosenFielder: fielder, target
    };
    updateDefenseBaseRunners(9);
    updateBatterRunner(9);
    return runners.find((entry) => entry.startBase === "first");
  }

  function throwTo(base, arrivalTime, playType) {
    return {
      targetBase: base, baseLabel: getBaseLabel(base),
      startTime: 9.05, endTime: arrivalTime, holdDeadline: arrivalTime + 1, safe: true,
      playType, tagTime: playType === "tag" ? arrivalTime : null, baseTouchTime: arrivalTime
    };
  }

  // 二塁に到達した走者が三塁へ暴走した状態を作る
  const advancing = setup(false);
  handleBatterRunnerBaseCommand("third", "advance");
  const advanceOut = judgeOutPlay(advancing, "third", throwTo("third", advancing.arrivalTime - 0.5, "tag")).result;
  const advanceSafe = judgeOutPlay(advancing, "third", throwTo("third", advancing.arrivalTime + 1.0, "tag")).result;

  // 三塁へ走り出したあと二塁へ帰塁する状態
  const retreating = setup(false);
  handleBatterRunnerBaseCommand("third", "advance");
  handleBatterRunnerBaseCommand("second", "return");
  const retreatTarget = retreating.targetBase;
  const retreatOut = judgeOutPlay(retreating, "second", throwTo("second", retreating.arrivalTime - 0.5, "force")).result;

  // 塁上で止まっている走者はアウトにならない
  const standing = setup(false);
  const standingResult = judgeOutPlay(standing, "second", throwTo("second", 11.0, "tag")).result;

  // 通過するだけの塁ではタッチアウトにならない
  const passing = setup(false);
  const passingDestined = isRunnerDestinedForBase(passing, "third");

  return JSON.stringify({
    advanceOut, advanceSafe, retreatTarget, retreatOut,
    standingStopped: isDefenseBaseRunnerStoppedOnBase(standing, 2),
    standingResult,
    passingDestined
  });
`));

assert(rundown.advanceOut === "TAG_OUT", `挟殺: 進行方向の塁にボールが先着したらアウトになるべき (${rundown.advanceOut})`);
assert(rundown.advanceSafe === "SAFE", `挟殺: 走者が先に到達すればセーフであるべき (${rundown.advanceSafe})`);
assert(rundown.retreatTarget === "second", `帰塁指示で走者の目標が二塁になるべき (${rundown.retreatTarget})`);
assert(
  rundown.retreatOut === "TAG_OUT" || rundown.retreatOut === "FORCE_OUT",
  `挟殺: 帰塁方向でもボールが先着したらアウトになるべき (${rundown.retreatOut})`
);
assert(rundown.standingStopped === true, "塁上で止まっている走者の前提が崩れている");
assert(rundown.standingResult === "SAFE", `塁上で止まっている走者をアウトにしてはいけない (${rundown.standingResult})`);
assert(rundown.passingDestined === false, "通過するだけの塁をタッチ対象にしてはいけない");

// ---------------------------------------------------------------------------
// 現仕様として維持する挙動 (意図的な簡略化なので変更しない)
// ---------------------------------------------------------------------------
assert(
  run(`
    return JSON.stringify({
      third: shouldAdvanceOnGroundOut("third", { run: 5 }, { kind: "out", caught: true, needsThrow: false }, { isGrounder: true }),
      second: shouldAdvanceOnGroundOut("second", { run: 5 }, { kind: "out", caught: true, needsThrow: false }, { isGrounder: true }),
      first: shouldAdvanceOnGroundOut("first", { run: 5 }, { kind: "out", caught: true, needsThrow: false }, { isGrounder: true })
    });
  `) === '{"third":true,"second":true,"first":true}',
  "現仕様: ゴロアウトでは全走者が無条件に1つ進塁する"
);

expectBases(
  "現仕様: ゴロアウトで三塁走者は無条件に生還する",
  `
    bases.third = makeBaseRunner({ id: "R3", name: "RUN3", run: 5 });
    count.outs = 1;
    defenseState.baseRunners = [{
      startBase: "third", currentBase: "third", targetBase: "home",
      id: "R3", name: "RUN3", run: 5,
      groundOutAdvance: true, tagUp: false,
      arrived: true, arrivalTime: 3
    }];
    const runs = applyDefenseOutAdvancements();
  `,
  { runs: 1, third: null }
);

// 進塁するかどうかは無条件でも、進塁先が与えられるのは走り切れた走者だけ
expectBases(
  "捕球アウト後の進塁でも、走り切れていない走者は得点しない",
  `
    bases.third = makeBaseRunner({ id: "R3", name: "RUN3", run: 5 });
    count.outs = 1;
    defenseState.baseRunners = [{
      startBase: "third", currentBase: "third", targetBase: "home",
      id: "R3", name: "RUN3", run: 5,
      groundOutAdvance: true, tagUp: false,
      arrived: false, arrivalTime: 99
    }];
    const runs = applyDefenseOutAdvancements();
  `,
  { runs: 0, third: "RUN3" }
);

// 走り切る前にプレーを終わらせないこと (終わらせると到達判定が常に不成立になる)
assert(
  run(`
    defenseState.baseRunners = [
      { startBase: "third", targetBase: "home", tagUp: true, arrivalTime: 8.3, isOut: false },
      { startBase: "first", targetBase: "second", groundOutAdvance: true, arrivalTime: 5.1, isOut: false }
    ];
    return getAdvancingRunnerHoldDeadline();
  `) === 8.3,
  "進塁中の走者がいる間はプレーの終了を待つべき"
);
assert(
  run(`
    defenseState.baseRunners = [{ startBase: "first", targetBase: "second", arrivalTime: 5.1 }];
    return getAdvancingRunnerHoldDeadline() === null;
  `) === true,
  "進塁する走者がいなければ待ち時間は延ばさないべき"
);

assert(
  run(`
    return shouldTagUpFromBase(
      "second",
      { run: 10 },
      { kind: "out", caught: true, needsThrow: false, fieldingTime: 3 },
      { isGrounder: false, isLiner: false, isPopupFly: false, ballTime: 3 },
      { role: "C", arm: 1 },
      { x: field.plateX, y: field.plateY - defenseField.fenceDistance * 0.95 }
    ) === false;
  `) === true,
  "現仕様: タッチアップは三塁からのみで、二塁からは発生しない"
);

// ---------------------------------------------------------------------------
// 統合テスト: シード固定の観戦試合で走塁の不変条件を検査する
// ---------------------------------------------------------------------------
const integrationSeeds = [260717, 991143, 20260802];
const integrationReport = [];

integrationSeeds.forEach((seed) => {
  const context = createGameContext(seed);
  const report = vm.runInContext(
    `
(() => {
  const frameMs = 1000 / 60;
  const maxFramesPerGame = 2500000;
  const violations = [];
  const tally = { plays: 0, runs: 0, outs: 0, doubles: 0, triples: 0, homers: 0, singles: 0, phantomRuns: 0 };

  function occupancy() {
    return ["first", "second", "third"].filter((name) => bases[name]).length;
  }
  function baseIds() {
    return ["first", "second", "third"].map((name) => (bases[name] ? bases[name].id || bases[name].name : null));
  }

  // 攻守交代で塁が消えるので、交代直前の状態を控えておく
  let sideChangeSnapshot = null;
  const originalChangeSide = changeSide;
  changeSide = function() {
    sideChangeSnapshot = { occupancy: occupancy(), outs: count.outs };
    return originalChangeSide();
  };

  // 3アウト目の封殺などで無効化された生還は、塁上にもアウトにも得点にも現れない。
  // 走者の収支を合わせるために別途数えておく。
  let suppressedRuns = 0;
  const originalApplyRunnerResults = applyRunnerResults;
  applyRunnerResults = function(results, options = {}) {
    const allowRuns = !options || options.allowRuns !== false;
    const elapsed = Number.isFinite(defenseState.startTime)
      ? (performance.now() - defenseState.startTime) / 1000
      : null;
    (results || []).forEach((result) => {
      if (!result || result.out || getBatterRunnerTargetIndex(result.targetBase) < 4) return;
      if (!allowRuns) {
        suppressedRuns += 1;
        return;
      }
      // 走路を持つのは守備アニメーション上の走者だけ。四球や本塁打の
      // 機械的な進塁は到達判定の対象外。
      const info = result.runnerInfo || {};
      if (!info.route) return;
      const settled = info.arrived
        || (elapsed !== null && Number.isFinite(info.arrivalTime) && info.arrivalTime <= elapsed);
      if (!settled) tally.phantomRuns += 1;
    });
    return originalApplyRunnerResults(results, options);
  };

  const originalFinishDefensePlay = finishDefensePlay;
  finishDefensePlay = function() {
    const wasFoul = Boolean(defenseState.foulPlay);
    const before = {
      occupancy: occupancy(),
      outs: count.outs,
      away: scores.away,
      home: scores.home
    };
    sideChangeSnapshot = null;
    suppressedRuns = 0;
    const returnValue = originalFinishDefensePlay();
    if (wasFoul) return returnValue;
    tally.plays += 1;

    const after = sideChangeSnapshot || { occupancy: occupancy(), outs: count.outs };
    const runsScored = (scores.away - before.away) + (scores.home - before.home);
    const outsAdded = after.outs - before.outs;
    tally.runs += runsScored;
    tally.outs += Math.max(0, outsAdded);

    // アウトは1プレーで3を超えない
    if (after.outs > 3) {
      violations.push("アウトが3を超えた: " + after.outs + " (" + message + ")");
    }
    if (outsAdded < 0) {
      violations.push("アウトが減った: " + before.outs + " -> " + after.outs + " (" + message + ")");
    }

    // 走者の保存則: 直前の走者 + 打者 = 残った走者 + アウト + 得点
    // イニングが終わったプレーでは3アウトを超える分のアウトが記録されないので、
    // 収支は「増えていないこと」だけを見る。走者が湧くのは常に異常。
    const expected = before.occupancy + 1;
    const accounted = after.occupancy + Math.max(0, outsAdded) + runsScored + suppressedRuns;
    const inningEnded = after.outs >= 3;
    if (inningEnded ? accounted > expected : accounted !== expected) {
      violations.push(
        "走者の収支が合わない: 開始 " + before.occupancy + "人+打者 / 終了 " + after.occupancy +
        "人 + " + outsAdded + "アウト + " + runsScored + "点 + 無効化された生還 " + suppressedRuns +
        " (" + message + ")"
      );
    }

    // 同じ走者が2つの塁に同時にいない
    const ids = baseIds().filter(Boolean);
    if (new Set(ids).size !== ids.length) {
      violations.push("同じ走者が複数の塁にいる: " + ids.join(",") + " (" + message + ")");
    }

    return returnValue;
  };

  // 打席結果は表示文言ではなく記録された種別で数える
  const originalRecordBatterPlateAppearance = recordBatterPlateAppearance;
  recordBatterPlateAppearance = function(type, options) {
    if (type === "double") tally.doubles += 1;
    else if (type === "triple") tally.triples += 1;
    else if (type === "homer") tally.homers += 1;
    else if (type === "single") tally.singles += 1;
    return originalRecordBatterPlateAppearance(type, options);
  };

  for (let gameIndex = 0; gameIndex < 6; gameIndex += 1) {
    modeSelect.value = "watch";
    awayPresetSelect.value = "tigers";
    homePresetSelect.value = "dodgers";
    firstBatSelect.value = "away";
    inningsSelect.value = "3";
    stadiumSelect.value = "fireworks";
    p1DefenseSelect.value = "auto";
    p2DefenseSelect.value = "auto";
    selectedTeamPresetBySide = { ...defaultTeamPresetBySide };
    menuSelection = cloneMenuSelection(defaultMenuSelection);
    startGame();
    let frames = 0;
    while (gamePhase !== "gameover" && frames < maxFramesPerGame) {
      __advanceTime(frameMs);
      update(frameMs);
      frames += 1;
    }
    if (gamePhase !== "gameover") {
      violations.push("試合 " + (gameIndex + 1) + " が終了しなかった");
      break;
    }
  }
  return { violations: violations.slice(0, 20), violationCount: violations.length, tally };
})()
`,
    context,
    { filename: "baserunning-integration.js" }
  );

  assert(
    report.violationCount === 0,
    `走塁の不変条件違反 (seed ${seed}): ${report.violations.join(" / ")}`
  );
  assert(
    report.tally.plays > 100,
    `seed ${seed}: 検査したプレーが少なすぎる (${report.tally.plays})`
  );
  assert(
    report.tally.phantomRuns === 0,
    `seed ${seed}: 走り切っていない走者が得点している (${report.tally.phantomRuns}件)`
  );
  integrationReport.push({ seed, ...report.tally });
});

// CPU攻撃では打者走者が一塁で止まるので、二塁打・三塁打は記録されない。
// (エンタイトルツーベースだけは例外的に二塁が与えられる)
const totalTriples = integrationReport.reduce((sum, entry) => sum + entry.triples, 0);
assert(
  totalTriples === 0,
  `CPU攻撃では三塁打は記録されないはず ${JSON.stringify(integrationReport)}`
);
assert(
  integrationReport.every((entry) => entry.singles > 0),
  `安打が1本も記録されていない試合がある ${JSON.stringify(integrationReport)}`
);

process.stdout.write(`${JSON.stringify(integrationReport)}\n`);
process.stdout.write("Baserunning check passed\n");
