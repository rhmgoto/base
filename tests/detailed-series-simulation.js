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
  const base = { measureText(text) { return { width: String(text).length * 12 }; } };
  return new Proxy(base, {
    get(target, prop) { return prop in target ? target[prop] : () => {}; },
    set(target, prop, value) { target[prop] = value; return true; }
  });
}

function createGameContext(seed) {
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

  makeElement("modeSelect").value = "watch";
  makeElement("awayPresetSelect").value = "tigers";
  makeElement("homePresetSelect").value = "dodgers";
  makeElement("firstBatSelect").value = "away";
  makeElement("inningsSelect").value = "3";
  makeElement("stadiumSelect").value = "fireworks";
  makeElement("p1DefenseSelect").value = "auto";
  makeElement("p2DefenseSelect").value = "auto";

  let now = 1000;
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
    Math: seededMath,
    Set,
    Number,
    __advanceTime(ms) { now += ms; }
  };
  vm.createContext(context);
  return context;
}

const gameCount = Number(process.argv[2] || 32);
const seed = Number(process.argv[3] || 260717);
const teamAKey = process.argv[4] || "dodgers";
const teamBKey = process.argv[5] || "samurai";
const requestedInnings = Number(process.argv[6] || 9);
const context = createGameContext(seed);
vm.runInContext(fs.readFileSync(path.join(root, "script.js"), "utf8"), context, { filename: "script.js" });

const simulationCode = `
(() => {
  const frameMs = 1000 / 60;
  const maxFramesPerGame = 2500000;
  const battedLabels = [
    hitLabels.softGrounder,
    hitLabels.grounder,
    hitLabels.hardGrounder,
    hitLabels.scorchingGrounder,
    hitLabels.gapGrounder,
    hitLabels.lineEdgeGrounder,
    hitLabels.centerReturnGrounder,
    hitLabels.single,
    hitLabels.cleanHit,
    hitLabels.outfieldLiner,
    hitLabels.lineLiner,
    hitLabels.lineDrop,
    hitLabels.fenceLiner,
    hitLabels.frontDrop,
    hitLabels.lineEdge,
    hitLabels.centerReturnLiner,
    deepDriveLabel,
    superDeepDriveLabel,
    hitLabels.chaseFly,
    hitLabels.toweringFly,
    hitLabels.fenceEdgeFly,
    hitLabels.popup,
    hitLabels.routineFly,
    "バントゴロ",
    hitLabels.foul
  ];
  const resultKeys = ["out", "single", "double", "triple", "homer", "error", "foul", "foulOut", "other"];
  const byLabel = Object.fromEntries(battedLabels.map((label) => [
    label,
    { total: 0, ...Object.fromEntries(resultKeys.map((key) => [key, 0])), wallHit: 0, overFielderFly: 0, deepNonHomer: 0, runs: 0 }
  ]));
  const games = [];
  const seriesTeams = ["${teamAKey}", "${teamBKey}"];
  const battingTotals = Object.fromEntries(seriesTeams.map((team) => [team, {}]));
  const pitchingTotals = Object.fromEntries(seriesTeams.map((team) => [team, {}]));
  const teamTotals = Object.fromEntries(seriesTeams.map((team) => [team, {
    games: 0, wins: 0, losses: 0, runs: 0, runsAllowed: 0, hits: 0, homeRuns: 0,
    strikeouts: 0, walks: 0, hbp: 0, sacrificeBunts: 0, sacrificeFlies: 0,
    errorsReached: 0, shutouts: 0, scorelessGames: 0, oneRunGames: 0,
    extraInningGames: 0, mercyGames: 0, noHitters: 0, perfectGames: 0
  }]));
  const noContact = { strikeout: 0, walk: 0, hbp: 0 };
  const physicalResults = { wallHit: 0, fenceOver: 0, overFielderFly: 0, deepNonHomer: 0 };
  let currentContact = null;
  let resolvingFeedback = null;
  let currentGameIndex = -1;

  function addBattingRecord(teamKey, record) {
    if (!record || !(record.plateAppearances > 0)) return;
    const totals = battingTotals[teamKey];
    const aggregate = totals[record.id] || {
      id: record.id, name: record.name, games: 0, plateAppearances: 0, atBats: 0,
      runs: 0, hits: 0, rbi: 0, doubles: 0, triples: 0, homeRuns: 0,
      strikeouts: 0, walks: 0, hbp: 0, sacrificeBunts: 0, sacrificeFlies: 0,
      errorsReached: 0
    };
    aggregate.games += 1;
    ["plateAppearances", "atBats", "runs", "hits", "rbi", "doubles", "triples", "homeRuns",
      "strikeouts", "walks", "hbp", "sacrificeBunts", "sacrificeFlies", "errorsReached"]
      .forEach((stat) => { aggregate[stat] += record[stat] || 0; });
    totals[record.id] = aggregate;
  }

  function addPitchingRecord(teamKey, record) {
    if (!record || !((record.outs || 0) > 0 || (record.pitchCount || 0) > 0)) return;
    const totals = pitchingTotals[teamKey];
    const aggregate = totals[record.id] || {
      id: record.id, name: record.name, games: 0, gamesStarted: 0, wins: 0, losses: 0,
      saves: 0, holds: 0, outs: 0, pitchCount: 0, hitsAllowed: 0, homeRunsAllowed: 0,
      strikeouts: 0, walksAllowed: 0, runsAllowed: 0, earnedRunsAllowed: 0
    };
    aggregate.games += 1;
    aggregate.gamesStarted += Number(Boolean(record.started));
    aggregate.wins += Number(Boolean(record.win));
    aggregate.losses += Number(Boolean(record.loss));
    aggregate.saves += Number(Boolean(record.save));
    aggregate.holds += Number(Boolean(record.hold));
    ["outs", "pitchCount", "hitsAllowed", "homeRunsAllowed", "strikeouts", "walksAllowed", "runsAllowed", "earnedRunsAllowed"]
      .forEach((stat) => { aggregate[stat] += record[stat] || 0; });
    totals[record.id] = aggregate;
  }

  function summarizeBattingRecord(record) {
    const singles = Math.max(0, record.hits - record.doubles - record.triples - record.homeRuns);
    const obpDenominator = record.atBats + record.walks + record.hbp + record.sacrificeFlies;
    const obp = obpDenominator ? (record.hits + record.walks + record.hbp) / obpDenominator : 0;
    const slg = record.atBats ? (singles + record.doubles * 2 + record.triples * 3 + record.homeRuns * 4) / record.atBats : 0;
    return {
      ...record,
      average: record.atBats ? record.hits / record.atBats : 0,
      onBasePercentage: obp,
      sluggingPercentage: slg,
      ops: obp + slg
    };
  }

  function summarizePitchingRecord(record) {
    return {
      ...record,
      innings: formatPitcherInningsFromOuts(record.outs),
      era: record.outs ? record.earnedRunsAllowed * 27 / record.outs : null,
      whip: record.outs ? (record.walksAllowed + record.hitsAllowed) * 3 / record.outs : null,
      strikeoutsPerNine: record.outs ? record.strikeouts * 27 / record.outs : null
    };
  }

  function ensureLabel(label) {
    if (!byLabel[label]) {
      byLabel[label] = { total: 0, ...Object.fromEntries(resultKeys.map((key) => [key, 0])), wallHit: 0, overFielderFly: 0, deepNonHomer: 0, runs: 0 };
    }
    return byLabel[label];
  }

  function classifyFinalMessage(finalMessage, fallback = {}) {
    const text = finalMessage || "";
    if (text.includes("ファールフライ") && text.includes("アウト")) return "foulOut";
    if (text.includes("ファウル")) return "foul";
    if (text.includes("ホームラン")) return "homer";
    if (text.includes("スリーベース")) return "triple";
    if (text.includes("ツーベース") || text.includes("フェンス直撃")) return "double";
    if (text.includes("ヒット") || text.includes("セーフ")) return "single";
    if (text.includes("エラー")) return "error";
    if (text.includes("アウト") || text.includes("ゲッツー") || text.includes("進塁")) return "out";
    if (fallback.foulPlay) return fallback.caught ? "foulOut" : "foul";
    if (fallback.fenceOver || fallback.scoreType === "homer" || fallback.kind === "homer") return "homer";
    if (fallback.fieldingError) return "error";
    if (fallback.caught || fallback.kind === "out") return "out";
    if (["single", "double", "triple"].includes(fallback.scoreType)) return fallback.scoreType;
    return "other";
  }

  const originalShowBattingFeedback = showBattingFeedback;
  showBattingFeedback = function(contact, result = {}) {
    currentContact = {
      label: result?.label || result?.battedProfile?.label || "打球",
      team: battingTeam,
      batter: activeBatter?.name || "",
      inning,
      half
    };
    return originalShowBattingFeedback(contact, result);
  };

  const originalShowEffect = showEffect;
  showEffect = function(text, color) {
    if (resolvingFeedback && !resolvingFeedback.message) {
      resolvingFeedback.message = message;
      resolvingFeedback.effect = text;
    }
    return originalShowEffect(text, color);
  };

  const originalFinishDefensePlay = finishDefensePlay;
  finishDefensePlay = function() {
    const event = currentContact || {
      label: defenseState?.battedBall?.label || "打球",
      team: battingTeam,
      batter: activeBatter?.name || "",
      inning,
      half
    };
    const scoreBefore = { ...scores };
    resolvingFeedback = {
      fallback: {
        foulPlay: Boolean(defenseState.foulPlay),
        fenceOver: Boolean(defenseState.battedBall?.fenceOver),
        caught: Boolean(defenseState.outcome?.caught),
        fieldingError: Boolean(defenseState.outcome?.fieldingError),
        kind: defenseState.outcome?.kind,
        scoreType: defenseState.outcome?.scoreType
      }
    };
    const returnValue = originalFinishDefensePlay();
    const finalResult = classifyFinalMessage(
      resolvingFeedback.message || resolvingFeedback.effect || "",
      resolvingFeedback.fallback
    );
    const entry = ensureLabel(event.label);
    const battedBall = defenseState.battedBall;
    const wasWallHit = Boolean(battedBall?.wallHit);
    const wasFenceOver = Boolean(battedBall?.fenceOver);
    const wasOverFielderFly = Boolean(battedBall?.battedProfile?.unifiedOverFielderFly);
    const wasDeepNonHomer = Boolean(battedBall?.isDeep && !wasFenceOver);
    entry.total += 1;
    entry[finalResult] += 1;
    entry.wallHit += Number(wasWallHit);
    entry.overFielderFly += Number(wasOverFielderFly);
    entry.deepNonHomer += Number(wasDeepNonHomer);
    entry.runs += Math.max(0, scores.away - scoreBefore.away) + Math.max(0, scores.home - scoreBefore.home);
    physicalResults.wallHit += Number(wasWallHit);
    physicalResults.fenceOver += Number(wasFenceOver);
    physicalResults.overFielderFly += Number(wasOverFielderFly);
    physicalResults.deepNonHomer += Number(wasDeepNonHomer);
    games[currentGameIndex].battedBalls += 1;
    games[currentGameIndex].results[finalResult] = (games[currentGameIndex].results[finalResult] || 0) + 1;
    currentContact = null;
    resolvingFeedback = null;
    return returnValue;
  };

  const originalCheckCountEnd = checkCountEnd;
  checkCountEnd = function() {
    const wasStrikeout = count.strikes >= 3;
    const wasWalk = count.balls >= 4;
    const returnValue = originalCheckCountEnd();
    if (wasStrikeout) {
      noContact.strikeout += 1;
      games[currentGameIndex].strikeouts += 1;
    }
    if (wasWalk) {
      noContact.walk += 1;
      games[currentGameIndex].walks += 1;
    }
    return returnValue;
  };

  const originalFinishPitch = finishPitch;
  finishPitch = function(label, kind, power = 0, timeDiff = 0, hitDirection = null, battedProfile = null) {
    if (kind === "hbp") {
      noContact.hbp += 1;
      games[currentGameIndex].hbp += 1;
    }
    return originalFinishPitch(label, kind, power, timeDiff, hitDirection, battedProfile);
  };

  for (let gameIndex = 0; gameIndex < ${gameCount}; gameIndex += 1) {
    currentGameIndex = gameIndex;
    const awayKey = gameIndex % 2 === 0 ? "${teamAKey}" : "${teamBKey}";
    const homeKey = gameIndex % 2 === 0 ? "${teamBKey}" : "${teamAKey}";
    modeSelect.value = "watch";
    awayPresetSelect.value = awayKey;
    homePresetSelect.value = homeKey;
    firstBatSelect.value = "away";
    inningsSelect.value = "${requestedInnings}";
    stadiumSelect.value = "fireworks";
    p1DefenseSelect.value = "auto";
    p2DefenseSelect.value = "auto";
    selectedTeamPresetBySide = { ...defaultTeamPresetBySide };
    menuSelection = cloneMenuSelection(defaultMenuSelection);
    games.push({
      game: gameIndex + 1,
      awayKey,
      homeKey,
      away: teamPresets[awayKey].label,
      home: teamPresets[homeKey].label,
      awayRuns: 0,
      homeRuns: 0,
      innings: 0,
      battedBalls: 0,
      strikeouts: 0,
      walks: 0,
      hbp: 0,
      results: {}
    });
    currentContact = null;
    resolvingFeedback = null;
    startGame();

    let frames = 0;
    while (gamePhase !== "gameover" && frames < maxFramesPerGame) {
      __advanceTime(frameMs);
      update(frameMs);
      frames += 1;
    }
    if (gamePhase !== "gameover") {
      throw new Error(\`game \${gameIndex + 1} did not finish after \${frames} frames\`);
    }
    games[gameIndex].awayRuns = scores.away;
    games[gameIndex].homeRuns = scores.home;
    games[gameIndex].innings = inning;
    games[gameIndex].frames = frames;
    games[gameIndex].message = message;
    games[gameIndex].lineScore = { away: [...inningScores.away], home: [...inningScores.home] };
    games[gameIndex].awayHits = getTeamHitsFromBatters("away");
    games[gameIndex].homeHits = getTeamHitsFromBatters("home");
    games[gameIndex].awayAchievement = getPitchingAchievement("away", true)?.label || null;
    games[gameIndex].homeAchievement = getPitchingAchievement("home", true)?.label || null;
    getBattingGameRecordEntries("away").forEach((record) => addBattingRecord(awayKey, record));
    getBattingGameRecordEntries("home").forEach((record) => addBattingRecord(homeKey, record));
    getPitcherGameRecordEntries("away").forEach((record) => addPitchingRecord(awayKey, record));
    getPitcherGameRecordEntries("home").forEach((record) => addPitchingRecord(homeKey, record));

    [["away", awayKey, homeKey], ["home", homeKey, awayKey]].forEach(([side, teamKey, opponentKey]) => {
      const opponentSide = side === "away" ? "home" : "away";
      const ownRuns = scores[side];
      const opponentRuns = scores[opponentSide];
      const summary = teamTotals[teamKey];
      summary.games += 1;
      summary.runs += ownRuns;
      summary.runsAllowed += opponentRuns;
      summary.hits += getTeamHitsFromBatters(side);
      const battingEntries = getBattingGameRecordEntries(side);
      summary.homeRuns += battingEntries.reduce((sum, record) => sum + (record.homeRuns || 0), 0);
      summary.strikeouts += battingEntries.reduce((sum, record) => sum + (record.strikeouts || 0), 0);
      summary.walks += battingEntries.reduce((sum, record) => sum + (record.walks || 0), 0);
      summary.hbp += battingEntries.reduce((sum, record) => sum + (record.hbp || 0), 0);
      summary.sacrificeBunts += battingEntries.reduce((sum, record) => sum + (record.sacrificeBunts || 0), 0);
      summary.sacrificeFlies += battingEntries.reduce((sum, record) => sum + (record.sacrificeFlies || 0), 0);
      summary.errorsReached += battingEntries.reduce((sum, record) => sum + (record.errorsReached || 0), 0);
      summary.wins += Number(ownRuns > opponentRuns);
      summary.losses += Number(ownRuns < opponentRuns);
      summary.shutouts += Number(ownRuns > opponentRuns && opponentRuns === 0);
      summary.scorelessGames += Number(ownRuns === 0);
      summary.oneRunGames += Number(Math.abs(ownRuns - opponentRuns) === 1);
      summary.extraInningGames += Number(inning > ${requestedInnings});
      summary.mercyGames += Number(message.includes("コールドゲーム"));
      const achievement = getPitchingAchievement(side, true);
      summary.noHitters += Number(achievement?.label === "ノーヒットノーラン");
      summary.perfectGames += Number(achievement?.label === "完全試合");
    });
  }

  const totals = games.reduce((summary, game) => {
    summary.awayRuns += game.awayRuns;
    summary.homeRuns += game.homeRuns;
    summary.battedBalls += game.battedBalls;
    summary.strikeouts += game.strikeouts;
    summary.walks += game.walks;
    summary.hbp += game.hbp;
    if (game.awayRuns > game.homeRuns) summary.awayWins += 1;
    else if (game.homeRuns > game.awayRuns) summary.homeWins += 1;
    else summary.ties += 1;
    if (game.innings > ${requestedInnings}) summary.extraInningGames += 1;
    Object.entries(game.results).forEach(([key, value]) => {
      summary.results[key] = (summary.results[key] || 0) + value;
    });
    return summary;
  }, {
    awayWins: 0,
    homeWins: 0,
    ties: 0,
    awayRuns: 0,
    homeRuns: 0,
    extraInningGames: 0,
    battedBalls: 0,
    strikeouts: 0,
    walks: 0,
    hbp: 0,
    results: {}
  });

  return {
    seed: ${seed},
    requestedInnings: ${requestedInnings},
    stadium: stadiumPresets[currentStadiumId]?.name || currentStadiumId,
    teams: Object.fromEntries(seriesTeams.map((team) => [team, teamPresets[team].label])),
    games,
    teamTotals,
    battingTotals: Object.fromEntries(seriesTeams.map((team) => [team, Object.values(battingTotals[team]).map(summarizeBattingRecord).sort((a, b) => b.ops - a.ops)])),
    pitchingTotals: Object.fromEntries(seriesTeams.map((team) => [team, Object.values(pitchingTotals[team]).map(summarizePitchingRecord).sort((a, b) => b.outs - a.outs)])),
    byLabel,
    physicalResults,
    noContact,
    totals
  };
})()
`;

const result = vm.runInContext(simulationCode, context, { filename: "watch-match-simulation-eval.js" });
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
