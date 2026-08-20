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
    "practicePitcherTypeSelect", "practiceBatterSelect", "practicePitcherSelect"

  ].forEach(makeElement);

  makeElement("modeSelect").value = seed === null ? "versus" : "watch";
  makeElement("awayPresetSelect").value = "tigers";
  makeElement("homePresetSelect").value = "dodgers";
  makeElement("firstBatSelect").value = "away";
  makeElement("inningsSelect").value = "3";
  makeElement("stadiumSelect").value = "fireworks";

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

expectBases(
  "非フォースの3アウト目より先に生還した走者は得点する",
  `
    const runs = applyRunnerResults([
      createRunnerResult({ id: "R3", name: "RUN3", run: 5 }, "third", "home", { scoreTime: 0.4 })
    ], { scoringDeadline: 1.0 }).runs;
  `,
  { runs: 1, third: null }
);

expectBases(
  "非フォースの3アウト目より後の生還は得点しない",
  `
    const runs = applyRunnerResults([
      createRunnerResult({ id: "R3", name: "RUN3", run: 5 }, "third", "home", { scoreTime: 1.2 })
    ], { scoringDeadline: 1.0 }).runs;
  `,
  { runs: 0, third: null }
);

const twoOutStrikeoutSteal = JSON.parse(run(`
  startGame();
  gameMode = "watch";
  count.outs = 2;
  count.strikes = 2;
  bases.first = makeBaseRunner({ id: "R1", name: "RUN1", run: 5 });
  let pitcherOutsRecorded = 0;
  const originalRecordOuts = recordCurrentPitcherOuts;
  recordCurrentPitcherOuts = function(amount) {
    pitcherOutsRecorded += amount;
    return originalRecordOuts(amount);
  };
  stealState = createStealState();
  stealState.active = true;
  stealState.startBase = "first";
  stealState.targetBase = "second";
  stealState.runner = { ...makeBaseRunner(bases.first), arrived: false };
  finishPitch("空振り", "strike");
  resolveSteal(true);
  const result = { pitcherOutsRecorded, battingTeam, outs: count.outs };
  recordCurrentPitcherOuts = originalRecordOuts;
  return JSON.stringify(result);
`));
assert(
  twoOutStrikeoutSteal.pitcherOutsRecorded === 1,
  `二死で三振と盗塁死が重なっても投手アウトは1つだけ (${twoOutStrikeoutSteal.pitcherOutsRecorded})`
);
assert(
  twoOutStrikeoutSteal.battingTeam === "home" && twoOutStrikeoutSteal.outs === 0,
  `三振を3アウト目として正常に攻守交代する (${JSON.stringify(twoOutStrikeoutSteal)})`
);

const walkoffScoring = JSON.parse(run(`
  startGame();
  battingTeam = getSecondBatTeam();
  half = "bottom";
  inning = maxInnings;
  scores.away = 2;
  scores.home = 2;
  bases = createEmptyBases();
  const results = [
    createRunnerResult({ id: "R3", name: "LEAD", run: 5 }, "third", "home"),
    createRunnerResult({ id: "R2", name: "TRAIL", run: 5 }, "second", "home"),
    createRunnerResult({ id: "B", name: "BAT", run: 5 }, "batter", "second")
  ];
  const ordinaryRuns = applyRunnerResults(results).runs;

  startGame();
  battingTeam = getSecondBatTeam();
  half = "bottom";
  inning = maxInnings;
  scores.away = 2;
  scores.home = 2;
  bases = createEmptyBases();
  const homerRuns = applyRunnerResults([
    createRunnerResult({ id: "R3H", name: "LEAD-H", run: 5 }, "third", "home"),
    createRunnerResult({ id: "R2H", name: "TRAIL-H", run: 5 }, "second", "home"),
    createRunnerResult({ id: "BH", name: "BAT-H", run: 5 }, "batter", "home")
  ], { homer: true }).runs;
  const result = { ordinaryRuns, homerRuns, homerFinalScore: scores.home };
  startGame();
  return JSON.stringify(result);
`));
assert(
  walkoffScoring.ordinaryRuns === 1,
  `サヨナラ本塁打以外は勝ち越しに必要な1点だけ (${walkoffScoring.ordinaryRuns})`
);
assert(
  walkoffScoring.homerRuns === 3 && walkoffScoring.homerFinalScore === 5,
  `サヨナラ本塁打は全走者の得点を認める (${JSON.stringify(walkoffScoring)})`
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
// ノーバウンド捕球の判定: 見た目 (接触時の高さ) と結果を一致させる
// ---------------------------------------------------------------------------
const liner = { isLiner: true, ballTime: 0.6 };
const popup = { isPopupFly: true, ballTime: 2.0 };
const grounder = { isGrounder: true, ballTime: 0.4 };

// 落下時刻を過ぎていても、まだ浮いているなら空中で捕ったとみなす
assert(
  run(`return isCaughtAirBattedBallAtTime(${JSON.stringify(liner)}, 1.5, 36);`) === true,
  "落下時刻を過ぎていても、高さが残っていればノーバウンド捕球とすべき"
);
assert(
  run(`return isCaughtAirBattedBallAtTime(${JSON.stringify(liner)}, 1.5, 0);`) === false,
  "地面に着いた打球はノーバウンド捕球にしないべき"
);
assert(
  run(`return isCaughtAirBattedBallAtTime(${JSON.stringify(popup)}, 2.4, 20);`) === true,
  "内野ポップフライも高さが残っていればノーバウンド捕球とすべき"
);
// ゴロは高さがあっても地面の打球として扱う
assert(
  run(`return isCaughtAirBattedBallAtTime(${JSON.stringify(grounder)}, 0.2, 40);`) === false,
  "ゴロはノーバウンド捕球の対象にしないべき"
);
// 高さが分からない場合は従来どおり時刻で判定する
assert(
  run(`return isCaughtAirBattedBallAtTime(${JSON.stringify(liner)}, 0.5, null);`) === true,
  "高さが不明なら落下前は空中扱いのままにすべき"
);
assert(
  run(`return isCaughtAirBattedBallAtTime(${JSON.stringify(liner)}, 1.5, null);`) === false,
  "高さが不明なら落下後は地面扱いのままにすべき"
);

// 落球はライナーに限らず「強い打球」全般が対象。守備力で増減し、弱い打球では起きない。
assert(
  run(`return JSON.stringify([battedBallDropTuning.linerChance, battedBallDropTuning.freezeSeconds]);`) === "[0.05,0.9]",
  "ライナーの落球率と硬直時間の基準値"
);

const dropChances = JSON.parse(run(`
  const average = { role: "P", fielding: 5 };
  return JSON.stringify({
    ライナー: getBattedBallDropChance({ isLiner: true, power: 0.5 }, average),
    弱いゴロ: getBattedBallDropChance({ isGrounder: true, power: 0.5 }, average),
    強いゴロ: getBattedBallDropChance({ isGrounder: true, power: 1.1 }, average),
    強いフライ: getBattedBallDropChance({ isRoutineFly: true, power: 1.1 }, average),
    バント: getBattedBallDropChance({ isBunt: true, power: 1.1 }, average),
    "強いゴロ_守備10": getBattedBallDropChance({ isGrounder: true, power: 1.1 }, { role: "P", fielding: 10 }),
    "強いゴロ_守備1": getBattedBallDropChance({ isGrounder: true, power: 1.1 }, { role: "P", fielding: 1 }),
    "硬直_弱": getBattedBallDropFreezeSeconds({ power: 0.5 }),
    "硬直_強": getBattedBallDropFreezeSeconds({ power: 1.3 })
  });
`));

assert(dropChances.ライナー > 0.07 && dropChances.ライナー < 0.1, `守備力が平均のライナーは約8% (${dropChances.ライナー})`);
assert(dropChances.弱いゴロ === 0, `弱い打球では落球しない (${dropChances.弱いゴロ})`);
assert(dropChances.バント === 0, "バントは落球の対象外");
assert(dropChances.強いゴロ > 0 && dropChances.強いフライ > 0, "強い打球はライナー以外でも落球しうる");
assert(
  dropChances["強いゴロ_守備1"] > dropChances.強いゴロ && dropChances.強いゴロ > dropChances["強いゴロ_守備10"],
  `守備力が低いほど落球しやすいべき (守備1 ${dropChances["強いゴロ_守備1"]} / 平均 ${dropChances.強いゴロ} / 守備10 ${dropChances["強いゴロ_守備10"]})`
);
assert(
  dropChances["硬直_強"] > dropChances["硬直_弱"],
  `強い打球ほど硬直が長いべき (${dropChances["硬直_弱"]} / ${dropChances["硬直_強"]})`
);

// 落球は記録上のエラーにはせず、見た目でわかるようにする
assert(
  run(`
    const previous = Math.random;
    Math.random = () => 0.01;
    const dropped = shouldDropBattedBallOnCatch({ isGrounder: true, power: 1.2 }, { role: "P", fielding: 5 });
    Math.random = () => 0.99;
    const safe = shouldDropBattedBallOnCatch({ isGrounder: true, power: 1.2 }, { role: "P", fielding: 5 });
    Math.random = previous;
    return JSON.stringify({ dropped, safe });
  `) === '{"dropped":true,"safe":false}',
  "落球は確率どおりに起きるべき"
);

// ---------------------------------------------------------------------------
// フェンス直撃は結果表示に残す (安打成立時は文言から分からなくなるため)
// ---------------------------------------------------------------------------
assert(
  run(`return getBattedBallHighlightLabel({ wallHit: true });`) === "フェンス直撃",
  "フェンス直撃の打球は結果表示に残すべき"
);
assert(
  run(`return getBattedBallHighlightLabel({ groundRuleDouble: true });`) === "エンタイトルツーベース",
  "エンタイトルツーベースも結果表示に残すべき"
);
assert(
  run(`return getBattedBallHighlightLabel({ wallHit: true, fenceOver: true });`) === "",
  "柵越えはホームランとして表示されるので、直撃の文言は付けないべき"
);
assert(
  run(`return getBattedBallHighlightLabel({ isLiner: true });`) === "",
  "通常の打球には余分な文言を付けないべき"
);
assert(
  run(`return withBattedBallHighlight("一塁セーフ: 得点なし", { wallHit: true });`) === "フェンス直撃 / 一塁セーフ: 得点なし",
  "フェンス直撃は結果文言の先頭に付くべき"
);
assert(
  run(`return withBattedBallHighlight("ヒット: 1点", { isGrounder: true });`) === "ヒット: 1点",
  "通常の打球では文言を変えないべき"
);

// ---------------------------------------------------------------------------
// CPU守備の送球先: 本塁 → 三塁 → 二塁 → 一塁 の順に、間に合う一番先の塁へ投げる
// ---------------------------------------------------------------------------
const cpuThrow = JSON.parse(run(`
  function scenario(build) {
    startGame();
    gameMode = "versus";
    battingTeam = "away";
    defenseControlMode = { away: "manual", home: "manual" };
    gamePhase = "defense";
    bases = createEmptyBases();
    activeBatter = findById(batters, "suzuki");
    const target = { x: field.plateX + 120, y: field.plateY - 420 };
    const ball = {
      target, direction: normalize({ x: 0.3, y: -1 }), flightDistance: 420, landingDistance: 420,
      ballTime: 1.1, isGrounder: true, isLiner: false, isDeep: false, power: 0.5, trajectory: "grounder",
      fenceOver: false, wallHit: false, groundRuleDouble: false
    };
    const outcome = { kind: "force", caught: true, needsThrow: true, fieldingTime: 1.4 };
    const fielder = { role: "SS", x: target.x, y: target.y, speed: 5, fielding: 6, arm: 6 };
    build(ball, outcome, fielder, target);
    return getAutomaticForceThrowTargetBase(outcome, ball, defenseState.runner, {
      fielder, fieldingTarget: target, baseRunners: defenseState.baseRunners, minStartTime: 1.4
    });
  }

  // 打者は一塁に到達済み、一塁走者が三塁へ向かっている
  const advancingRunner = scenario((ball, outcome, fielder, target) => {
    bases.first = makeBaseRunner(findById(batters, "ichiro"));
    defenseState = {
      ...createDefenseState(), active: true, resolved: false,
      startTime: performance.now() - 10000,
      outcome, battedBall: ball, runner: createBatterRunner(activeBatter),
      baseRunners: createDefenseBaseRunnerAnimations(outcome, ball, null, fielder, target),
      chosenFielder: fielder, target
    };
    updateBatterRunner(9);
    updateDefenseBaseRunners(9);
    handleBatterRunnerBaseCommand("third", "advance");
    updateDefenseBaseRunners(9.1);
  });

  // 通常のゴロ (一塁に普通の走力の走者)
  const ordinaryGrounder = scenario((ball, outcome, fielder, target) => {
    bases.first = makeBaseRunner(findById(batters, "sato"));
    defenseState = {
      ...createDefenseState(), active: true, resolved: false,
      startTime: performance.now() - 1500,
      outcome, battedBall: ball, runner: createBatterRunner(activeBatter),
      baseRunners: createDefenseBaseRunnerAnimations(outcome, ball, null, fielder, target),
      chosenFielder: fielder, target
    };
    updateBatterRunner(1.4);
    updateDefenseBaseRunners(1.4);
  });

  // 足の速い走者だと二塁は間に合わない (走者2.65秒に対し送球2.71秒)。
  // その場合は先の塁を狙わず、一塁で確実にアウトを取る。
  const fastRunnerGrounder = scenario((ball, outcome, fielder, target) => {
    bases.first = makeBaseRunner(findById(batters, "ichiro"));
    defenseState = {
      ...createDefenseState(), active: true, resolved: false,
      startTime: performance.now() - 1500,
      outcome, battedBall: ball, runner: createBatterRunner(activeBatter),
      baseRunners: createDefenseBaseRunnerAnimations(outcome, ball, null, fielder, target),
      chosenFielder: fielder, target
    };
    updateBatterRunner(1.4);
    updateDefenseBaseRunners(1.4);
  });

  // 走者なし
  const emptyBases = scenario((ball, outcome, fielder, target) => {
    defenseState = {
      ...createDefenseState(), active: true, resolved: false,
      startTime: performance.now() - 1500,
      outcome, battedBall: ball, runner: createBatterRunner(activeBatter),
      baseRunners: [], chosenFielder: fielder, target
    };
    updateBatterRunner(1.4);
  });

  return JSON.stringify({ advancingRunner, ordinaryGrounder, fastRunnerGrounder, emptyBases });
`));

assert(
  cpuThrow.advancingRunner === "third",
  `三塁へ向かう走者がいるなら三塁へ投げるべき (${cpuThrow.advancingRunner})`
);
assert(
  cpuThrow.ordinaryGrounder === "second",
  `通常のゴロでは間に合う一番先の塁 (二塁) へ投げるべき (${cpuThrow.ordinaryGrounder})`
);
assert(
  cpuThrow.fastRunnerGrounder === "first",
  `先の塁が間に合わないなら一塁で確実にアウトを取るべき (${cpuThrow.fastRunnerGrounder})`
);
assert(
  cpuThrow.emptyBases === "first",
  `走者がいなければ一塁へ投げるべき (${cpuThrow.emptyBases})`
);
assert(
  run(`return JSON.stringify([
    getCpuLeadForceThrowRequiredMargin("home"),
    getCpuLeadForceThrowRequiredMargin("third"),
    getCpuLeadForceThrowRequiredMargin("second"),
    getCpuLeadForceThrowRequiredMargin("first")
  ]);`) === "[0.1,0.08,0.06,0.02]",
  "先の塁ほど必要な余裕を大きくしておくべき"
);

// ---------------------------------------------------------------------------
// 踏み終えて先へ進んだ塁では、もう封殺されない
// (打者走者が三塁にいるのに一塁への送球でアウトになる不具合の再発防止)
// ---------------------------------------------------------------------------
const forceRelease = JSON.parse(run(`
  function setup() {
    startGame();
    gameMode = "versus";
    battingTeam = "away";
    defenseControlMode = { away: "manual", home: "manual" };
    gamePhase = "defense";
    bases = createEmptyBases();
    activeBatter = findById(batters, "suzuki");
    const target = { x: field.plateX + 250, y: field.plateY - 900 };
    const hit = {
      target, direction: normalize({ x: 0.3, y: -1 }), flightDistance: 900, landingDistance: 900,
      ballTime: 2.0, isGrounder: false, isLiner: true, isDeep: true, power: 0.8, trajectory: "liner",
      fenceOver: false, wallHit: false, groundRuleDouble: false
    };
    const outcome = { kind: "force", caught: true, needsThrow: true, fieldingTime: 3.0 };
    const fielder = { role: "C", x: target.x, y: target.y, speed: 5, fielding: 5, arm: 5 };
    defenseState = {
      ...createDefenseState(),
      active: true, resolved: false,
      startTime: performance.now() - 20000,
      outcome, battedBall: hit,
      runner: createBatterRunner(activeBatter),
      baseRunners: [],
      chosenFielder: fielder, target
    };
    return defenseState.runner;
  }
  function throwToFirst(endTime) {
    return {
      targetBase: "first", baseLabel: "一塁",
      startTime: endTime - 0.9, endTime, holdDeadline: endTime + 1, safe: true,
      playType: "force", tagTime: null, baseTouchTime: endTime
    };
  }

  // 一塁を踏んで先の塁へ進んだあと、一塁へ送球された
  const advanced = setup();
  updateBatterRunner(4.2);
  handleBatterRunnerBaseCommand("second", "advance");
  updateBatterRunner(9.0);
  const advancedThrow = throwToFirst(15.0);
  defenseState.throw = advancedThrow;
  const advancedResult = {
    forceActive: isForceTargetActive("first"),
    judged: judgeOutPlay(advanced, "first", advancedThrow).result,
    thrownOut: Boolean(getThrowOutRunner(advancedThrow)),
    cpuTarget: getAutomaticForceThrowTargetBase(defenseState.outcome, defenseState.battedBall, advanced, { baseRunners: [] })
  };

  // 通常のゴロアウト: 一塁へ走行中に送球が先着
  const grounder = setup();
  updateBatterRunner(2.0);
  const grounderResult = {
    forceActive: isForceTargetActive("first"),
    judged: judgeOutPlay(grounder, "first", throwToFirst(3.0)).result
  };

  // 一塁に到達済みでも、送球のほうが先に着いていればアウトのまま
  const settled = setup();
  updateBatterRunner(6.0);
  const settledResult = {
    forceActive: isForceTargetActive("first"),
    judged: judgeOutPlay(settled, "first", throwToFirst(3.0)).result
  };

  return JSON.stringify({ advancedResult, grounderResult, settledResult });
`));

assert(
  forceRelease.advancedResult.forceActive === false,
  "一塁を踏んで先へ進んだ走者は、一塁の封殺対象から外れるべき"
);
assert(
  forceRelease.advancedResult.judged === "SAFE",
  `先の塁にいる走者が一塁への送球でアウトになってはいけない (${forceRelease.advancedResult.judged})`
);
assert(
  forceRelease.advancedResult.thrownOut === false,
  "先の塁にいる走者が一塁への送球でアウトになってはいけない"
);
assert(
  forceRelease.advancedResult.cpuTarget !== "first",
  `打者走者が一塁を通過済みならCPUは一塁へ投げないべき (${forceRelease.advancedResult.cpuTarget})`
);
assert(
  forceRelease.grounderResult.judged === "FORCE_OUT",
  `通常のゴロアウトは成立し続けるべき (${forceRelease.grounderResult.judged})`
);
assert(
  forceRelease.settledResult.judged === "FORCE_OUT",
  `一塁到達済みでも送球が先着していればアウトのままであるべき (${forceRelease.settledResult.judged})`
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
// 走り終えた走者とアウトになった走者は待たない。
// (タッチアップやゴロアウトの進塁に限らず、走っている走者はすべて待つ。
//  待たずに打ち切ると getSettledRunnerBase が踏み終えた塁で止めてしまう)
assert(
  run(`
    defenseState.baseRunners = [
      { startBase: "first", targetBase: "second", arrivalTime: 5.1, arrived: true },
      { startBase: "second", targetBase: "third", arrivalTime: 6.2, isOut: true }
    ];
    return getAdvancingRunnerHoldDeadline() === null;
  `) === true,
  "走り終えた走者とアウトの走者では待ち時間を延ばさないべき"
);
assert(
  run(`
    defenseState.baseRunners = [{ startBase: "first", targetBase: "second", arrivalTime: 5.1, arrived: false }];
    return getAdvancingRunnerHoldDeadline();
  `) === 5.1,
  "ヒットで進塁中の走者も、走り切るまではプレーを終わらせないべき"
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
// プレー途中で走者アニメーションを作り直しても、走り出した走者を巻き戻さないこと。
// 作り直しは bases (プレー開始時の塁) から再生成するため、以前は手動の進塁指示や
// すでに走った分が消え、生還済みの走者まで開始塁に戻されて得点が消えていた。
// ---------------------------------------------------------------------------
const midPlayRunnerRefresh = JSON.parse(run(`
  startGame();
  gameMode = "versus";
  battingTeam = "away";
  defenseControlMode = { away: "manual", home: "manual" };
  gamePhase = "defense";
  count.outs = 0;
  bases = createEmptyBases();
  bases.first = makeBaseRunner(findById(batters, "sato"));
  bases.second = makeBaseRunner(findById(batters, "shuto"));
  bases.third = makeBaseRunner(findById(batters, "ichiro"));
  activeBatter = findById(batters, "suzuki");

  const target = { x: field.plateX + 380, y: field.plateY - 1300 };
  const hit = {
    target, direction: normalize({ x: 0.3, y: -1 }), flightDistance: 1300, landingDistance: 1300,
    ballTime: 2.4, isGrounder: false, isLiner: true, isDeep: true,
    power: 0.8, trajectory: "liner", fenceOver: false, wallHit: false, groundRuleDouble: false
  };
  const outcome = { kind: "single", label: "ヒット", scoreType: "single", caught: false, needsThrow: false, fieldingTime: 4.0 };
  const fielder = { role: "R", x: target.x, y: target.y, speed: 5, fielding: 5, arm: 5 };
  const runners = createDefenseBaseRunnerAnimations(outcome, hit, null, fielder, target);
  defenseState = {
    ...createDefenseState(), active: true, resolved: false,
    startTime: performance.now() - 9000, duration: 40000,
    outcome, battedBall: hit, runner: createBatterRunner(activeBatter),
    baseRunners: runners, fielders: [fielder], chosenFielder: fielder, target
  };
  // 二塁走者と三塁走者を手動で本塁へ走らせ、生還済みにする
  runners.forEach((entry) => {
    if (entry.startBase === "second" || entry.startBase === "third") {
      entry.manualTargetBase = "home";
      entry.targetBase = "home";
      entry.currentBase = "home";
      entry.arrived = true;
      entry.running = false;
      entry.arrivalTime = 6;
    }
  });
  // 打者走者が一塁を飛び出して戻れず、一塁送球でアウトになる
  defenseState.throw = {
    targetBase: "first", baseLabel: "一塁", startTime: 5, endTime: 7,
    holdDeadline: 12, safe: false, playType: "tag", tagTime: 7, baseTouchTime: 7
  };
  defenseState.baseRunners = refreshDefenseBaseRunnerAnimations(outcome, hit, defenseState.throw, fielder, target);
  const settled = {};
  defenseState.baseRunners.forEach((entry) => {
    settled[entry.startBase] = getSettledRunnerBase(entry, 9);
  });
  const runs = resolveDefensePlayBaseState({
    batterInfo: activeBatter, forceOutBases: [], outRunners: [], batterOut: true
  });
  return JSON.stringify({
    settled,
    runs,
    first: bases.first ? bases.first.name : null,
    second: bases.second ? bases.second.name : null,
    third: bases.third ? bases.third.name : null
  });
`));

assert(
  midPlayRunnerRefresh.settled.second === "home" && midPlayRunnerRefresh.settled.third === "home",
  `作り直しで生還済みの走者を開始塁へ戻してはいけない (${JSON.stringify(midPlayRunnerRefresh.settled)})`
);
assert(
  midPlayRunnerRefresh.runs === 2,
  `打者走者がアウトになっても、先に生還した2人の得点は消えない (${midPlayRunnerRefresh.runs}点)`
);
assert(
  midPlayRunnerRefresh.first === null && midPlayRunnerRefresh.third === null,
  `生還した走者が塁に残ってはいけない (一塁 ${midPlayRunnerRefresh.first} / 三塁 ${midPlayRunnerRefresh.third})`
);

assert(
  run(`
    // 塁上で止まったままの走者は、新しい判断 (タッチアップなど) を受け取れる
    return shouldKeepLiveDefenseBaseRunner({
      startBase: "third", currentBase: "third", running: false, arrived: true
    }) === false;
  `) === true,
  "塁で止まっている走者は作り直しの対象のままにする"
);
assert(
  run(`
    return shouldKeepLiveDefenseBaseRunner({
      startBase: "second", currentBase: "second", targetBase: "home",
      manualTargetBase: "home", running: true, arrived: false
    }) === true;
  `) === true,
  "手動の進塁指示を受けた走者は作り直しで消さない"
);

// ---------------------------------------------------------------------------
// 捕球アウトと送球アウトが同じプレーで重なる場合。
// 以前は finishDefensePlay が「送球アウトの枝」に入ると捕球アウトの枝に到達せず、
// 打者のアウトが数えられないうえ、アウトのはずの打者が一塁に置かれていた。
// ---------------------------------------------------------------------------
const caughtFlyWithThrowOut = JSON.parse(run(`
  function playTagUp(tagUpSafe, outsBefore) {
    startGame();
    gameMode = "watch";
    battingTeam = "away";
    gamePhase = "defense";
    count.outs = outsBefore;
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "sato"));
    bases.second = makeBaseRunner(findById(batters, "shuto"));
    bases.third = makeBaseRunner(findById(batters, "ichiro"));
    activeBatter = findById(batters, "suzuki");
    const target = { x: field.plateX + 200, y: field.plateY - 1500 };
    const hit = {
      target, direction: normalize({ x: 0.15, y: -1 }), flightDistance: 1500, landingDistance: 1500,
      ballTime: 3.2, isGrounder: false, isLiner: false, isDeep: true, isPopupFly: false,
      power: 0.7, trajectory: "fly", fenceOver: false, wallHit: false, groundRuleDouble: false
    };
    const outcome = { kind: "out", label: "外野フライ", caught: true, needsThrow: false, fieldingTime: 3.2 };
    const fielder = { role: "C", x: target.x, y: target.y, speed: 5, fielding: 5, arm: 5 };
    const runners = createDefenseBaseRunnerAnimations(outcome, hit, null, fielder, target);
    defenseState = {
      ...createDefenseState(), active: true, resolved: false,
      startTime: performance.now() - 12000, duration: 30000,
      outcome, battedBall: hit, runner: createBatterRunner(activeBatter),
      baseRunners: runners, fielders: [fielder], chosenFielder: fielder, target
    };
    updateDefenseBaseRunners(12);
    updateBatterRunner(12);
    const third = runners.find((entry) => entry.startBase === "third");
    const arrival = third && third.arrivalTime ? third.arrivalTime : 5;
    const endTime = tagUpSafe ? arrival + 0.6 : arrival - 0.4;
    defenseState.throw = {
      targetBase: "home", baseLabel: "本塁", startTime: 3.3, endTime,
      holdDeadline: 12, safe: tagUpSafe, playType: "tag", tagTime: endTime, baseTouchTime: endTime
    };
    finishDefensePlay();
    return {
      tagUpPlanned: Boolean(third && third.tagUp),
      outs: count.outs,
      runs: scores[battingTeam],
      first: bases.first ? bases.first.name : null,
      second: bases.second ? bases.second.name : null,
      third: bases.third ? bases.third.name : null
    };
  }
  return JSON.stringify({ out: playTagUp(false, 0), safe: playTagUp(true, 0) });
`));

assert(caughtFlyWithThrowOut.out.tagUpPlanned === true, "前提: 深い外野フライで三塁走者がタッチアップすること");
assert(
  caughtFlyWithThrowOut.out.outs === 2,
  `捕球アウトとタッチアップ死でアウトは2つ増えるべき (${caughtFlyWithThrowOut.out.outs})`
);
assert(
  caughtFlyWithThrowOut.out.third === null,
  `タッチアップでアウトになった走者は三塁に残らない (${caughtFlyWithThrowOut.out.third})`
);
assert(
  caughtFlyWithThrowOut.out.first === "サトウ" && caughtFlyWithThrowOut.out.second === "シュウトウ",
  `捕球アウトの打者を一塁に置いて満塁にしてはいけない (${caughtFlyWithThrowOut.out.first}/${caughtFlyWithThrowOut.out.second})`
);
assert(caughtFlyWithThrowOut.out.runs === 0, "タッチアップ死では得点しない");
assert(
  caughtFlyWithThrowOut.safe.outs === 1 && caughtFlyWithThrowOut.safe.runs === 1,
  `タッチアップが成功すれば犠飛で1点、アウトは捕球の1つだけ (${caughtFlyWithThrowOut.safe.outs}アウト ${caughtFlyWithThrowOut.safe.runs}点)`
);

const manualTwoOutTagUpState = JSON.parse(run(`
  startGame();
  gameMode = "versus";
  battingTeam = "away";
  gamePhase = "defense";
  count.outs = 2;
  scores = { away: 0, home: 0 };
  bases = createEmptyBases();
  bases.first = makeBaseRunner(findById(batters, "sato"));
  bases.second = makeBaseRunner(findById(batters, "shuto"));
  const thirdRunner = makeBaseRunner(findById(batters, "ichiro"));
  bases.third = thirdRunner;
  activeBatter = findById(batters, "suzuki");
  const target = { x: field.plateX + 200, y: field.plateY - 1500 };
  const hit = {
    target, direction: normalize({ x: 0.15, y: -1 }), flightDistance: 1500, landingDistance: 1500,
    ballTime: 3.2, isGrounder: false, isLiner: false, isDeep: true, isPopupFly: false,
    power: 0.7, trajectory: "fly", fenceOver: false, wallHit: false, groundRuleDouble: false
  };
  const outcome = { kind: "out", label: "外野フライ", caught: true, needsThrow: false, fieldingTime: 3.2 };
  const fielder = { role: "C", x: target.x, y: target.y, speed: 5, fielding: 5, arm: 5 };
  defenseState = {
    ...createDefenseState(), active: true, resolved: false,
    startTime: performance.now() - 12000, duration: 30000,
    outcome, battedBall: hit, runner: createBatterRunner(activeBatter),
    baseRunners: [{
      ...thirdRunner,
      startBase: "third",
      currentBase: "third",
      targetBase: "third",
      manualTargetBase: null,
      tagUp: false,
      scored: false,
      route: [{ ...defenseField.bases.third }],
      routeStartTime: 0,
      routeDuration: 0,
      arrivalTime: 0,
      arrived: true,
      x: defenseField.bases.third.x,
      y: defenseField.bases.third.y,
      speed: getDefenseBaseRunnerSpeed(thirdRunner)
    }],
    fielders: [fielder], chosenFielder: fielder, target,
    unifiedCircleCatchComplete: true,
    throw: null
  };
  handleBatterRunnerBaseCommand("home", "advance");
  const command = {
    targetBase: defenseState.baseRunners[0]?.targetBase,
    tagUp: Boolean(defenseState.baseRunners[0]?.tagUp),
    throwTarget: defenseState.throw?.targetBase || null
  };
  finishDefensePlay();
  return JSON.stringify({
    command,
    outs: count.outs,
    runs: scores.away
  });
`));

assert(manualTwoOutTagUpState.command.targetBase === "third", "2アウト捕球後の手動タッチアップ指示は走者を本塁へ向かわせない");
assert(manualTwoOutTagUpState.command.tagUp === false, "2アウト捕球後の手動タッチアップ指示で tagUp を立てない");
assert(manualTwoOutTagUpState.command.throwTarget === null, "2アウト捕球後の手動タッチアップ指示で本塁送球を作らない");
assert(manualTwoOutTagUpState.runs === 0, "2アウト満塁の外野フライ捕球後に手動タッチアップ得点を認めない");

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
    const scoringCandidates = (results || []).filter((result) => (
      result && !result.out && getBatterRunnerTargetIndex(result.targetBase) >= 4
    )).length;
    const elapsed = Number.isFinite(defenseState.startTime)
      ? (performance.now() - defenseState.startTime) / 1000
      : null;
    (results || []).forEach((result) => {
      if (!result || result.out || getBatterRunnerTargetIndex(result.targetBase) < 4) return;
      if (!allowRuns) return;
      // 走路を持つのは守備アニメーション上の走者だけ。四球や本塁打の
      // 機械的な進塁は到達判定の対象外。
      const info = result.runnerInfo || {};
      if (!info.route) return;
      const settled = info.arrived
        || (elapsed !== null && Number.isFinite(info.arrivalTime) && info.arrivalTime <= elapsed);
      if (!settled) tally.phantomRuns += 1;
    });
    const outcome = originalApplyRunnerResults(results, options);
    suppressedRuns += Math.max(0, scoringCandidates - (outcome?.runs || 0));
    return outcome;
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
const grounderErrorChances = JSON.parse(run(`
  const ball = { isGrounder: true, power: 1.1 };
  return JSON.stringify({
    low: getInfielderGrounderErrorChance(ball, { role: "SS", fielding: 1 }),
    average: getInfielderGrounderErrorChance(ball, { role: "SS", fielding: 5 }),
    elite: getInfielderGrounderErrorChance(ball, { role: "SS", fielding: 10 }),
    outfielder: getInfielderGrounderErrorChance(ball, { role: "L", fielding: 1 }),
    fumble: getInfielderGrounderErrorType(ball, { role: "SS", fielding: 1 }, () => 0.01),
    misplay: getInfielderGrounderErrorType(ball, { role: "SS", fielding: 1 }, () => 0.18)
  });
`));
assert(grounderErrorChances.low >= 0.2, `low fielding should cause frequent grounder errors (${grounderErrorChances.low})`);
assert(grounderErrorChances.elite < 0.01, `elite fielding should almost never cause grounder errors (${grounderErrorChances.elite})`);
assert(grounderErrorChances.low > grounderErrorChances.average && grounderErrorChances.average > grounderErrorChances.elite, "grounder error chance should fall with fielding ability");
assert(grounderErrorChances.outfielder === 0, "grounder fumbles and misplays should be limited to infielders");
assert(grounderErrorChances.fumble === "fumble" && grounderErrorChances.misplay === "misplay", "grounder errors should include both fumbles and misplays");
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
