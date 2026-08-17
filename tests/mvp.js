const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { assert } = require("./check-utils");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "script.js"), "utf8");

function extractFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  assert(start >= 0, `missing function ${name}`);
  const open = source.indexOf("{", start);
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(start, index + 1);
  }
  throw new Error(`unclosed function ${name}`);
}

const configStart = source.indexOf("const MVP_CONFIG =");
const configEnd = source.indexOf("const stealTuning =", configStart);
assert(configStart >= 0 && configEnd > configStart, "MVP_CONFIG must be independently configurable");

const functionNames = [
  "isFinalMvpGameState",
  "calculateWinProbability",
  "formatMvpPitchingOuts",
  "getMvpBattingBasicScore",
  "getMvpPitchingBasicScore",
  "getMvpSeedValue",
  "getMvpFinalSpecial",
  "buildMvpReason",
  "calculateActivityPointStandings",
  "calculateGameMVP"
];

const context = {
  console,
  Math,
  automaticTiebreakRunnerUsed: { away: false, home: false },
  clamp(value, min, max) { return Math.max(min, Math.min(max, value)); },
  formatPitcherInningsFromOuts(outs) { return `${Math.floor(outs / 3)}.${outs % 3}`; },
  getTeamTimesReachedBase() { return 1; }
};
vm.createContext(context);
vm.runInContext(
  `${source.slice(configStart, configEnd)}\n${functionNames.map(extractFunction).join("\n")}\nthis.MVP_CONFIG = MVP_CONFIG;`,
  context,
  { filename: "mvp-unit.js" }
);

function emptyGame(scores = { away: 1, home: 0 }) {
  return {
    scores,
    maxInnings: 3,
    final: true,
    batterGameRecords: { away: {}, home: {} },
    pitcherGameRecords: { away: {}, home: {} },
    mvpGameRecords: { away: {}, home: {} },
    rosterPlayers: { away: [], home: [] }
  };
}

function eventRecord(id, name, values = {}) {
  return {
    id,
    name,
    eventBasic: 0,
    wpa: 0,
    eventSpecial: 0,
    reasons: [],
    strikeoutsByHalf: {},
    ...values
  };
}

const shortShutout = emptyGame();
shortShutout.batterGameRecords.away.hitter = {
  id: "hitter", name: "打者", hits: 1, rbi: 1, runs: 1
};
shortShutout.pitcherGameRecords.away.pitcher = {
  id: "pitcher", name: "投手", started: true, outs: 9, strikeouts: 4,
  hitsAllowed: 1, walksAllowed: 0, runsAllowed: 0, earnedRunsAllowed: 0
};
shortShutout.mvpGameRecords.away.pitcher = eventRecord("pitcher", "投手", {
  strikeoutsByHalf: { "1-top": 3, "2-top": 1 }
});
const shortMvp = context.calculateGameMVP(shortShutout);
assert(shortMvp.playerId === "pitcher", `3回完封投手がMVPになるべき (${shortMvp.playerName})`);
assert(shortMvp.reason.includes("完封"), `完封理由を表示すべき (${shortMvp.reason})`);

const grandSlamGame = emptyGame({ away: 5, home: 3 });
grandSlamGame.batterGameRecords.away.slugger = {
  id: "slugger", name: "スラッガー", atBats: 2, hits: 1, homeRuns: 1, rbi: 4, runs: 1
};
grandSlamGame.mvpGameRecords.away.slugger = eventRecord("slugger", "スラッガー", {
  wpa: 0.42,
  eventSpecial: 2.5,
  reasons: [{ text: "逆転満塁ホームラン！", priority: 105 }]
});
grandSlamGame.pitcherGameRecords.away.pitcher = {
  id: "pitcher", name: "投手", started: true, outs: 9, strikeouts: 1,
  hitsAllowed: 5, walksAllowed: 2, runsAllowed: 3, earnedRunsAllowed: 3
};
const slamMvp = context.calculateGameMVP(grandSlamGame);
assert(slamMvp.playerId === "slugger", `逆転満塁弾の打者がMVPになるべき (${slamMvp.playerName})`);
assert(slamMvp.reason.includes("逆転満塁"), "最も強い理由を採用すべき");

const twoWayGame = emptyGame();
twoWayGame.batterGameRecords.away.twoway = {
  id: "twoway", name: "二刀流", hits: 1, homeRuns: 1, rbi: 1, runs: 1
};
twoWayGame.pitcherGameRecords.away.twoway = {
  id: "twoway", name: "二刀流", started: true, outs: 9, strikeouts: 3,
  hitsAllowed: 2, walksAllowed: 0, runsAllowed: 0, earnedRunsAllowed: 0
};
twoWayGame.mvpGameRecords.away.twoway = eventRecord("twoway", "二刀流");
const twoWayMvp = context.calculateGameMVP(twoWayGame);
assert(twoWayMvp.playerId === "twoway", "打撃と投球を同じ選手IDへ合算すべき");
assert(twoWayMvp.basicScore > 6, `二刀流の基本点を合算すべき (${twoWayMvp.basicScore})`);

const winnerOnlyGame = emptyGame();
winnerOnlyGame.batterGameRecords.away.winner = { id: "winner", name: "勝者", hits: 1 };
winnerOnlyGame.batterGameRecords.home.loser = {
  id: "loser", name: "敗者", hits: 4, homeRuns: 4, rbi: 8, runs: 4
};
const winnerOnlyMvp = context.calculateGameMVP(winnerOnlyGame);
assert(winnerOnlyMvp.team === "away", "MVP候補は原則として勝利チームに限定すべき");
assert(Number.isFinite(winnerOnlyMvp.activityPoints), "MVP結果に活躍ポイントを含めるべき");

const fullRosterGame = emptyGame();
fullRosterGame.rosterPlayers.away = [
  { id: "starter", name: "先発", role: "pitcher", kind: "pitcher" },
  { id: "unused", name: "未出場", role: "bench1", kind: "batter" }
];
fullRosterGame.rosterPlayers.home = [
  { id: "opponent", name: "相手選手", role: "SS", kind: "batter" }
];
fullRosterGame.pitcherGameRecords.away.starter = {
  id: "starter", name: "先発", started: true, outs: 3, strikeouts: 1,
  hitsAllowed: 0, walksAllowed: 0, runsAllowed: 0, earnedRunsAllowed: 0
};
const fullStandings = context.calculateActivityPointStandings(fullRosterGame, { allTeams: true });
assert(fullStandings.length === 3, "両チームの未出場選手を含む全登録選手を一覧に含めるべき");
assert(fullStandings.find((entry) => entry.playerId === "unused").activityPoints === 0, "未出場選手は0活躍ポイントにすべき");
const repeatedStandings = context.calculateActivityPointStandings(fullRosterGame, { allTeams: true });
assert(
  fullStandings.map((entry) => entry.playerId).join(",") === repeatedStandings.map((entry) => entry.playerId).join(","),
  "試合中の同点順位は再描画しても入れ替わらないようにすべき"
);

const liveGame = emptyGame();
liveGame.final = false;
liveGame.pitcherGameRecords.away.pitcher = {
  id: "pitcher", name: "投手", started: true, outs: 3, strikeouts: 0,
  hitsAllowed: 0, walksAllowed: 0, runsAllowed: 0, earnedRunsAllowed: 0
};
const livePitcher = context.calculateActivityPointStandings(liveGame, { allTeams: true })
  .find((entry) => entry.playerId === "pitcher");
assert(livePitcher.specialBonus === 0, "試合途中に完投・完封ボーナスを付与してはいけない");

function state({ inning, half = "top", outs = 0, away = 0, home = 0 }) {
  return {
    maxInnings: 3,
    inning,
    half,
    firstBatTeam: "away",
    battingTeam: half === "top" ? "away" : "home",
    outs,
    scores: { away, home },
    bases: { first: false, second: false, third: false },
    pendingGameEnd: false,
    gameOver: false
  };
}
const earlySwing = context.calculateWinProbability(state({ inning: 1, away: 1 }), "away")
  - context.calculateWinProbability(state({ inning: 1 }), "away");
const lateSwing = context.calculateWinProbability(state({ inning: 3, outs: 1, away: 1 }), "away")
  - context.calculateWinProbability(state({ inning: 3, outs: 1 }), "away");
assert(lateSwing > earlySwing, `同じ1点でも終盤のWPAを大きくすべき (early=${earlySwing}, late=${lateSwing})`);

context.MVP_CONFIG.tieBreakSeed = 20260817;
const seededGame = emptyGame();
seededGame.batterGameRecords.away.a = { id: "a", name: "A", hits: 1 };
seededGame.batterGameRecords.away.b = { id: "b", name: "B", hits: 1 };
const seededFirst = context.calculateGameMVP(seededGame).playerId;
const seededSecond = context.calculateGameMVP(seededGame).playerId;
assert(seededFirst === seededSecond, "seed指定時の同点判定は再現可能であるべき");

console.log("MVP checks passed");
