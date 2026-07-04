const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const shell = document.querySelector(".game-shell");
const menu = document.getElementById("startMenu");
const menuButton = document.getElementById("menuButton");
const startButton = document.getElementById("startButton");
const soundToggleButton = document.getElementById("soundToggleButton");
const bgmToggleButton = document.getElementById("bgmToggleButton");
const menuSoundToggleButton = document.getElementById("menuSoundToggleButton");
const menuBgmToggleButton = document.getElementById("menuBgmToggleButton");
const soundToggleButtons = [soundToggleButton, menuSoundToggleButton].filter(Boolean);
const bgmToggleButtons = [bgmToggleButton, menuBgmToggleButton].filter(Boolean);
const menuPointStatus = document.getElementById("menuPointStatus");
const playerChooser = document.getElementById("playerChooser");
const chooserTitle = document.getElementById("chooserTitle");
const chooserOptions = document.getElementById("chooserOptions");
const chooserClose = document.getElementById("chooserClose");
const modeSelect = document.getElementById("modeSelect");
const firstBatSelect = document.getElementById("firstBatSelect");
const inningsSelect = document.getElementById("inningsSelect");
const menuPlayerCards = Array.from(document.querySelectorAll(".menu-player-card"));
const awayBatterLName = document.getElementById("awayBatterLName");
const awayBatterCName = document.getElementById("awayBatterCName");
const awayBatterRName = document.getElementById("awayBatterRName");
const homeBatterLName = document.getElementById("homeBatterLName");
const homeBatterCName = document.getElementById("homeBatterCName");
const homeBatterRName = document.getElementById("homeBatterRName");
const awayPitcherName = document.getElementById("awayPitcherName");
const homePitcherName = document.getElementById("homePitcherName");
const awayBatterLStats = document.getElementById("awayBatterLStats");
const awayBatterCStats = document.getElementById("awayBatterCStats");
const awayBatterRStats = document.getElementById("awayBatterRStats");
const homeBatterLStats = document.getElementById("homeBatterLStats");
const homeBatterCStats = document.getElementById("homeBatterCStats");
const homeBatterRStats = document.getElementById("homeBatterRStats");
const awayPitcherStats = document.getElementById("awayPitcherStats");
const homePitcherStats = document.getElementById("homePitcherStats");
const activeBatterName = document.getElementById("activeBatterName");
const activePitcherName = document.getElementById("activePitcherName");
const activeBatterStats = document.getElementById("activeBatterStats");
const activePitcherStats = document.getElementById("activePitcherStats");

const field = {
  centerX: canvas.width / 2,
  moundY: 72,
  plateY: 746,
  plateX: canvas.width / 2,
  plateScale: 1.3,
  strikeZoneTop: 702,
  strikeZoneBottom: 756,
  strikeZoneWidth: 72,
  rightBox: { left: 452, right: 585, top: 649, bottom: 780 },
  leftBox: { left: 695, right: 828, top: 649, bottom: 780 }
};

const batterMoveTuning = {
  plateSideGap: 46,
  moundSideShrink: (42 * field.plateScale) / 3,
  horizontalRangeScale: 0.5,
  plateSideNudge: 10,
  shoeLimitOffsetY: -12,
  keyboardMoveSpeed: 5.2
};

const showHbpHitBox = false;

const batters = [
  { id: "otani", name: "オオタニ", bats: "L", power: 8, meet: 6, run: 7, fielding: 6, arm: 7, cost: 7 },
  { id: "ichiro", name: "イチロー", bats: "L", power: 2, meet: 10, run: 8, fielding: 8, arm: 9, cost: 8 },
  { id: "sato", name: "サトウ", bats: "L", power: 6, meet: 5, run: 4, fielding: 4, arm: 5, cost: 4 },
  { id: "freeman", name: "フリーマン", bats: "L", power: 6, meet: 7, run: 4, fielding: 6, arm: 5, cost: 5 },
  { id: "schwarber", name: "シュワバー", bats: "L", power: 10, meet: 1, run: 3, fielding: 2, arm: 4, cost: 4 },
  { id: "shuto", name: "シュウトウ", bats: "L", power: 1, meet: 3, run: 10, fielding: 8, arm: 6, cost: 4 },
  { id: "shinjo", name: "シンジョウ", bats: "R", power: 3, meet: 2, run: 6, fielding: 9, arm: 10, cost: 4 },
  { id: "suzuki", name: "スズキ", bats: "R", power: 6, meet: 5, run: 6, fielding: 5, arm: 7, cost: 5 },
  { id: "trout", name: "トラウト", bats: "R", power: 7, meet: 6, run: 6, fielding: 6, arm: 5, cost: 6 },
  { id: "judge", name: "ジャッジ", bats: "R", power: 9, meet: 7, run: 5, fielding: 4, arm: 5, cost: 7 },
  { id: "ruth", name: "ルース", bats: "R", power: 10, meet: 10, run: 5, fielding: 5, arm: 6, cost: 9 }
];

const pitchers = [
  { id: "shohei", name: "ショウヘイ", throws: "R", fastKmh: 163, rightBreak: 8, leftBreak: 2, slowChange: 5, fastChange: 2, control: 4, stuff: 5, fielding: 6, cost: 5 },
  { id: "yamamoto", name: "ヤマモト", throws: "R", fastKmh: 157, rightBreak: 6, leftBreak: 3, slowChange: 4, fastChange: 7, control: 8, stuff: 7, fielding: 6, cost: 5 },
  { id: "saiki", name: "サイキ", throws: "R", fastKmh: 155, rightBreak: 5, leftBreak: 2, slowChange: 9, fastChange: 7, control: 6, stuff: 4, fielding: 5, cost: 5 },
  { id: "kershaw", name: "カーショウ", throws: "L", fastKmh: 148, rightBreak: 4, leftBreak: 9, slowChange: 6, fastChange: 4, control: 8, stuff: 5, fielding: 4, cost: 5 },
  { id: "hikari", name: "ヒカリ", throws: "L", fastKmh: 250, rightBreak: 1, leftBreak: 1, slowChange: 9, fastChange: 1, control: 1, stuff: 5, fielding: 6, cost: 5 },
  { id: "magari", name: "マガリ", throws: "R", fastKmh: 90, rightBreak: 10, leftBreak: 10, slowChange: 10, fastChange: 10, control: 10, stuff: 3, fielding: 8, cost: 5 }
];

const pitchTypes = {
  normal: { key: "5", label: "直球", speedFactor: 0.87, baseKmhFactor: 0.87, color: "#ffffff", targetSpread: 30 },
  slow: { key: "8", label: "遅い球", speedFactor: 0.72, baseKmhFactor: 0.73, color: "#ffe66b", targetSpread: 42 },
  fast: { key: "2", label: "速球", speedFactor: 1.15, baseKmhFactor: 1, color: "#aee7ff", targetSpread: 24 }
};

// 表示球速はそのままに、実際の到達時間だけを調整する係数。
const actualPitchSpeedBoost = 1.265 * 1.15;
const pitchWindupDuration = 940;
const pitchSpeedChangeLimit = 0.7;
const pitchSpeedChangeEffect = 1.05;
const maxPitchSpeedChangeAmount = (0.0018 + 10 * 0.00072) * 9 * pitchSpeedChangeEffect;
const batJudgmentSpeedMultiplier = 1.6;
const batLengthMultiplier = 0.648 * 0.85;
const batThicknessMultiplier = 1.5;
const sweetSpotTuning = {
  visualBaseHalfWidth: 0.003125,
  visualMeetStep: 0.000208375,
  scoreBaseHalfWidth: 0.105,
  scoreMeetStep: 0.007,
  visualMinHalfWidth: 0.0025,
  minHalfWidth: 0.045,
  maxHalfWidth: 0.14
};

const teams = {
  away: { label: "チームA" },
  home: { label: "チームB" }
};

const teamIds = ["away", "home"];
const batterRoles = ["L", "C", "R"];
const baseNames = ["first", "second", "third"];
const baseIndexByName = { home: 0, first: 1, second: 2, third: 3 };
const baseNameByIndex = ["home", "first", "second", "third"];
const fielderPointLimit = 20;
const defaultMenuSelection = {
  away: { pitcher: "shohei", L: "otani", C: "ichiro", R: "suzuki" },
  home: { pitcher: "yamamoto", L: "schwarber", C: "judge", R: "shuto" }
};

const scoringHitTypes = new Set(["single", "double", "triple", "homer"]);
const defenseFieldDistanceScale = 0.8 * 1.15;
const defenseFenceHeightScale = 1.15;
const defenseFielderSpeedScale = 1.5;

const defenseField = {
  fenceDistance: 2280 * defenseFieldDistanceScale,
  fenceHeight: 120 * defenseFenceHeightScale,
  grassRadius: 2190 * defenseFieldDistanceScale,
  deepHitDistance: 1440 * defenseFieldDistanceScale,
  doubleDistance: 1770 * defenseFieldDistanceScale,
  wallHitDistance: 2160 * defenseFieldDistanceScale,
  foulLineTopY: -1065 * defenseFieldDistanceScale,
  foulLineInset: -2250 * defenseFieldDistanceScale,
  fielderReactionDelay: 0.05,
  bases: {
    home: { x: field.plateX, y: field.plateY + 42 },
    first: { x: 1352, y: 290 },
    second: { x: field.plateX, y: -208 },
    third: { x: -72, y: 290 }
  }
};

const battedBallSpeedMultiplier = {
  grounder: 1.62,
  liner: 4,
  fly: 1
};
const battedBallPaceMultiplier = 1.3;

const hardGrounderTuning = {
  minPower: 0.58,
  initialSpeedScale: 0.86,
  rollMinDistance: 660,
  rollMaxDistance: 3100,
  rollDistanceScale: 1.18,
  rollBaseSpeed: 330,
  rollEaseExponent: 2.05
};

const defenseRollTuning = {
  distanceScale: 2.25,
  grounderScale: 1.5,
  outfieldGrounderLinerScale: 1.95
};

const deepDriveTuning = {
  minPowerHitter: 8,
  minPower: 1.34,
  maxPower: 3.22,
  powerStep: 0.34,
  qualityBonus: 0.56,
  sweetSpotBonus: 0.48,
  timingPenaltyScale: 1150
};
const bigOutfieldFlyHeightScale = 1.5;

const yellowZoneHitTuning = {
  maxContactBoost: 0.55,
  minHitEase: 0.74,
  maxHitEase: 0.98,
  baseHitEase: 0.58,
  boostHitEase: 1.25,
  qualityHitEase: 0.22,
  sweetSpotHitEase: 0.14,
  velocityHitEase: 0.18,
  deepDriveRollRatio: 0.42,
  fenceRollRatio: 0.18,
  lineLinerRollRatio: 0.16,
  dropRollRatio: 0.56,
  linerRollRatio: 0.2,
  liftDamping: 10,
  driveLiftAssist: 12,
  carryBoost: 0.42,
  fenceScoreBoost: 0.28
};
const effectiveBatterPowerScale = 0.9;
const nonYellowHitChancePenalty = 0.7;

const defenseThrowResultHoldSeconds = 0.55;
const defenseThrowSetSeconds = 0.42;
const batterRunnerSpeedScale = 1.5;
const runnerSpeedBaseRun = 3.5;
const runnerSpeedUnit = 27.84375;
const abilitySpeedBaseRating = 3.5;
const fielderSpeedUnit = 21.176470588235293;
const throwSpeedUnit = 77.6470588235294;
const batterRunnerSecondBaseRiskMargin = 0.18;
const wallReboundTuning = {
  minDistance: 96,
  maxDistance: 230,
  powerDistance: 58,
  baseRollSpeed: 145,
  minRollSeconds: 1.8,
  maxRollSeconds: 5.8
};

function outfielderStartPoint(side, depthRatio = 0.8) {
  const center = defenseField.bases.home;
  const angle = side === "L" ? -132 : side === "R" ? -48 : -90;
  const radians = degreesToRadians(angle);
  const depth = defenseField.fenceDistance * depthRatio;
  return {
    x: center.x + Math.cos(radians) * depth,
    y: center.y + Math.sin(radians) * depth
  };
}

const defensiveLineups = {
  away: [
    { role: "P", name: "P", x: field.centerX, y: 250, speed: 8, fielding: 8, arm: 6 },
    { role: "L", name: "L", ...outfielderStartPoint("L"), speed: 6, fielding: 6, arm: 6 },
    { role: "C", name: "C", ...outfielderStartPoint("C"), speed: 6, fielding: 7, arm: 7, rangeBonus: 44 },
    { role: "R", name: "R", ...outfielderStartPoint("R"), speed: 6, fielding: 6, arm: 6 }
  ],
  home: [
    { role: "P", name: "P", x: field.centerX, y: 250, speed: 8, fielding: 8, arm: 6 },
    { role: "L", name: "L", ...outfielderStartPoint("L"), speed: 6, fielding: 6, arm: 6 },
    { role: "C", name: "C", ...outfielderStartPoint("C"), speed: 6, fielding: 7, arm: 7, rangeBonus: 44 },
    { role: "R", name: "R", ...outfielderStartPoint("R"), speed: 6, fielding: 6, arm: 6 }
  ]
};

const batterSprite = new Image();
batterSprite.src = "assets/batter-sprites.png";

const batterHbpSprite = new Image();
batterHbpSprite.src = "assets/batter-hbp.png";

const batterFollowSprite = new Image();
batterFollowSprite.src = "assets/batter-follow.png";

const teamBBatterSprite = new Image();
teamBBatterSprite.src = "assets/team-b-batter.png";

const teamBBatterHbpSprite = new Image();
teamBBatterHbpSprite.src = "assets/team-b-batter-hbp.png";

const teamBBatterFollowSprite = new Image();
teamBBatterFollowSprite.src = "assets/team-b-batter-follow.png";

const teamAPitcherSprite = new Image();
teamAPitcherSprite.src = "assets/team-a-pitcher.png";

const teamBPitcherSprite = new Image();
teamBPitcherSprite.src = "assets/team-b-pitcher.png";

const batterSpriteSets = {
  away: {
    image: batterSprite,
    hbpImage: batterHbpSprite,
    followImage: batterFollowSprite,
    frames: {
      stance: { sx: 300, sy: 44, sw: 368, sh: 766 },
      swing: { sx: 909, sy: 86, sw: 799, sh: 709 },
      follow: { sx: 341, sy: 66, sw: 797, sh: 794 },
      hbp: { sx: 397, sy: 48, sw: 896, sh: 805 }
    }
  },
  home: {
    image: teamBBatterSprite,
    hbpImage: teamBBatterHbpSprite,
    followImage: teamBBatterFollowSprite,
    frames: {
      stance: { sx: 299, sy: 44, sw: 367, sh: 766 },
      swing: { sx: 908, sy: 87, sw: 799, sh: 707 },
      follow: { sx: 352, sy: 72, sw: 888, sh: 770 },
      hbp: { sx: 398, sy: 46, sw: 901, sh: 804 }
    }
  }
};

const pitcherSpriteSets = {
  away: {
    image: teamAPitcherSprite,
    frames: {
      set: { sx: 235, sy: 77, sw: 250, sh: 658 },
      windup: { sx: 666, sy: 78, sw: 311, sh: 674 },
      release: { sx: 1164, sy: 190, sw: 413, sh: 573 }
    }
  },
  home: {
    image: teamBPitcherSprite,
    frames: {
      set: { sx: 245, sy: 78, sw: 247, sh: 641 },
      windup: { sx: 663, sy: 84, sw: 323, sh: 664 },
      release: { sx: 1165, sy: 211, sw: 414, sh: 548 }
    }
  }
};

let gameMode = "versus";
let gamePhase = "menu";
let maxInnings = 1;
let firstBatTeam = "away";
const playerTeam = "away";
let battingTeam = "away";
let inning = 1;
let half = "top";
let scores = { away: 0, home: 0 };
let selected = createSelectedTeams(defaultMenuSelection);
let menuSelection = cloneMenuSelection(defaultMenuSelection);
let battingOrderIndex = { away: 0, home: 0 };
let bases = createEmptyBases();

let activeBatter = selected.away.batters[0].player;
let activePitcher = selected.home.pitcher;
let activeBatterSide = "R";

let pitcher = {
  x: field.centerX,
  y: field.moundY,
  windupTime: 0,
  minX: field.centerX - 86,
  maxX: field.centerX + 86,
  moveStep: 18
};

let batter = {
  x: 520,
  y: 720,
  speed: 330
};

let count = { strikes: 0, balls: 0, outs: 0 };
let ball = {
  x: pitcher.x,
  y: pitcher.y,
  prevX: pitcher.x,
  prevY: pitcher.y,
  vx: 0,
  vy: 0,
  baseVx: 0,
  baseVy: 0,
  speedScale: 1,
  radius: 9,
  active: false,
  inPitch: false,
  crossedPlate: false,
  touchedPlate: false,
  wasHit: false,
  pitchStartTime: 0,
  plateTime: 0,
  targetX: field.plateX,
  targetY: field.plateY,
  spin: 0,
  curvePower: 0,
  trail: []
};

let currentPitchType = "";
let currentPitchSpeedKmh = null;
let message = "メニューで設定して試合開始";
let isPitching = false;
let pendingPitch = null;
let autoPitchTimer = Number.POSITIVE_INFINITY;
let computerPitchPlan = null;

let swingState = {
  isSwinging: false,
  startTime: 0,
  duration: 450,
  followHoldDuration: 200,
  cooldownUntil: 0,
  didSwingThisPitch: false,
  madeContact: false,
  lastCheckProgress: 0
};

let defenseState = createDefenseState();

let hitEffect = { active: false, startTime: 0, text: "", color: "#fff2a8" };
let hbpPose = { active: false, startTime: 0, duration: 1800 };
const keysDown = new Set();
const pitchAdjustmentKeys = ["1", "3", "4", "6"];
let pitchControlLockoutKeys = new Set();
let mouseAim = { active: false, x: 0, y: 0 };
let lastFrameTime = performance.now();

const sounds = {
  swing: new Audio("audio/swing.wav"),
  hit: new Audio("audio/hit2.mp3"),
  cheer: new Audio("audio/スタジアムの歓声.mp3"),
  firework: new Audio("audio/打ち上け\u3099花火.mp3")
};

Object.values(sounds).forEach((sound) => {
  sound.preload = "auto";
  sound.volume = 0.75;
});

const bgmTracks = {
  menu: new Audio("audio/sports_broadcast_baseball_bgm_loop.wav"),
  relaxed: new Audio("audio/bright_relaxed_sports_broadcast_bgm_loop.wav"),
  scoring: new Audio("audio/mountain_wind_stadium_anthem_bgm_loop.wav")
};

Object.values(bgmTracks).forEach((track) => {
  track.preload = "auto";
  track.loop = true;
  track.volume = 0.42;
});

let currentBgmKey = null;
let bgmNeedsUserGesture = false;
const audioSettings = {
  soundEffects: true,
  bgm: true
};

const hitLabels = {
  single: "ヒット",
  double: "ツーベース",
  triple: "スリーベース",
  homer: "ホームラン",
  grounder: "内野ゴロ",
  lineLiner: "ライン際ライナー",
  lineDrop: "ライン際ポテン",
  fenceLiner: "低いフェン直ライナー",
  frontDrop: "手前ポテン",
  lineEdge: "ライン際ギリギリ",
  chaseFly: "追走フライ",
  toweringFly: "大飛球",
  fenceEdgeFly: "フェンス際大飛球",
  popup: "内野ポップフライ",
  routineFly: "平凡なフライ",
  fly: "フライ",
  foul: "ファウル"
};

const deepDriveLabel = "強烈な打球";

function populateSelects() {
  updateMenuAbilityPanels();
}

function handLabel(hand) {
  if (hand === "R") return "右";
  if (hand === "L") return "左";
  return "左右";
}

function cloneMenuSelection(source) {
  return Object.fromEntries(teamIds.map((team) => [team, { ...source[team] }]));
}

function createSelectedTeams(selection) {
  return Object.fromEntries(teamIds.map((team) => [team, createSelectedTeam(selection[team])]));
}

function createSelectedTeam(selection) {
  return {
    pitcher: findById(pitchers, selection.pitcher),
    batters: batterRoles.map((role) => ({
      role,
      player: findById(batters, selection[role])
    }))
  };
}

function createEmptyBases() {
  return Object.fromEntries(baseNames.map((base) => [base, null]));
}

function createDefenseState() {
  return {
    active: false,
    startTime: 0,
    duration: 1500,
    fielders: [],
    chosenFielder: null,
    target: { x: field.centerX, y: field.plateY },
    origin: { x: field.plateX, y: field.plateY },
    ballPath: { x: 0, y: -1 },
    battedBall: null,
    landingTarget: null,
    outcome: null,
    runner: null,
    baseRunners: [],
    throw: null,
    homeRunFireworks: null,
    homeRunFireworksSoundPlayed: false,
    resolved: false,
    trailResetAtLanding: false
  };
}

function resetDefenseState() {
  defenseState = createDefenseState();
}

function readMenu() {
  gameMode = modeSelect.value;
  firstBatTeam = firstBatSelect.value;
  maxInnings = Number(inningsSelect.value);
  selected = createSelectedTeams(menuSelection);
}

function findById(list, id) {
  return list.find((item) => item.id === id) || list[0];
}

function getMenuTeamCost(team) {
  const selection = menuSelection[team];
  return (findById(batters, selection.L).cost ?? 5)
    + (findById(batters, selection.C).cost ?? 5)
    + (findById(batters, selection.R).cost ?? 5);
}

function updateMenuPointStatus() {
  if (!menuPointStatus) return;
  const awayCost = getMenuTeamCost("away");
  const homeCost = getMenuTeamCost("home");
  const isOver = awayCost > fielderPointLimit || homeCost > fielderPointLimit;
  menuPointStatus.textContent = `野手獲得ポイント  チームA ${awayCost}/${fielderPointLimit}  |  チームB ${homeCost}/${fielderPointLimit}`;
  menuPointStatus.classList.toggle("over-limit", isOver);
  startButton.disabled = isOver;
}

function getMenuRoleLabel(role) {
  if (role === "pitcher") return "投手";
  if (role === "L") return "レフト";
  if (role === "C") return "センター";
  return "ライト";
}

function getChooserPlayerSummary(player, kind) {
  if (kind === "pitcher") {
    return `球速 ${player.fastKmh} / 制球 ${player.control} / 球威 ${player.stuff} / 守備 ${player.fielding ?? 5}`;
  }
  return `パ ${player.power} / ミ ${player.meet} / 走 ${player.run} / 守 ${player.fielding ?? 5} / 肩 ${player.arm ?? 5}`;
}

function getChooserPlayerStats(player, kind) {
  if (kind === "pitcher") {
    return [
      speedRow("球速", player.fastKmh),
      statRow("投", handLabel(player.throws)),
      pitchCross(player),
      statRow("制球", player.control),
      statRow("球威", player.stuff),
      statRow("守備", player.fielding ?? 5)
    ].join("");
  }
  return [
    statRow("打", handLabel(player.bats)),
    statRow("パワー", player.power),
    statRow("ミート", player.meet),
    statRow("走塁", player.run),
    statRow("守備", player.fielding ?? 5),
    statRow("肩", player.arm ?? 5),
    costBadge(player.cost ?? 5)
  ].join("");
}

function renderChooserOption(player, team, role, kind) {
  const unavailable = isMenuPlayerUnavailable(team, role, kind, player.id);
  const selectedClass = player.id === menuSelection[team][role] ? " selected" : "";
  const unavailableClass = unavailable ? " unavailable" : "";
  const side = kind === "pitcher" ? handLabel(player.throws) : handLabel(player.bats);
  return `
    <button class="chooser-option${selectedClass}${unavailableClass}" type="button" data-team="${team}" data-role="${role}" data-player-id="${player.id}" data-kind="${kind}" ${unavailable ? "disabled" : ""}>
      <strong>${player.name} ${side}</strong>
      <div class="chooser-card-stats compact-stats">${getChooserPlayerStats(player, kind)}</div>
    </button>
  `;
}

function openPlayerChooser(card) {
  const team = card.dataset.team;
  const role = card.dataset.role;
  const kind = card.dataset.kind;
  const list = kind === "pitcher" ? pitchers : batters;
  chooserTitle.textContent = `${teamLabel(team)} ${getMenuRoleLabel(role)}`;
  chooserOptions.innerHTML = list.map((player) => renderChooserOption(player, team, role, kind)).join("");
  playerChooser.classList.remove("hidden");
}

function isMenuPlayerUnavailable(team, role, kind, playerId) {
  if (kind !== "batter") return false;
  return batterRoles.some((otherRole) => otherRole !== role && menuSelection[team][otherRole] === playerId);
}

function closePlayerChooser() {
  playerChooser.classList.add("hidden");
}

function selectMenuPlayer(option) {
  const team = option.dataset.team;
  const role = option.dataset.role;
  menuSelection[team][role] = option.dataset.playerId;
  closePlayerChooser();
  updateMenuAbilityPanels();
}

const menuPanelElements = {
  away: {
    pitcher: { name: awayPitcherName, stats: awayPitcherStats },
    L: { name: awayBatterLName, stats: awayBatterLStats },
    C: { name: awayBatterCName, stats: awayBatterCStats },
    R: { name: awayBatterRName, stats: awayBatterRStats }
  },
  home: {
    pitcher: { name: homePitcherName, stats: homePitcherStats },
    L: { name: homeBatterLName, stats: homeBatterLStats },
    C: { name: homeBatterCName, stats: homeBatterCStats },
    R: { name: homeBatterRName, stats: homeBatterRStats }
  }
};

function renderMenuPlayerPanel(team, role) {
  const panel = menuPanelElements[team][role];
  if (role === "pitcher") {
    renderPitcherPanel(findById(pitchers, menuSelection[team].pitcher), panel.name, panel.stats);
    return;
  }
  renderBatterPanel(findById(batters, menuSelection[team][role]), panel.name, panel.stats);
}

function updateMenuAbilityPanels() {
  teamIds.forEach((team) => {
    renderMenuPlayerPanel(team, "pitcher");
    batterRoles.forEach((role) => renderMenuPlayerPanel(team, role));
  });
  updateMenuPointStatus();
  updateSidebarAbilityPanels();
}

function renderBatterPanel(player, nameElement, statsElement) {
  nameElement.textContent = `${player.name} ${handLabel(player.bats)}`;
  statsElement.innerHTML = [
    statRow("パワー", player.power),
    statRow("ミート", player.meet),
    statRow("走塁", player.run),
    statRow("守備", player.fielding ?? 5),
    statRow("肩", player.arm ?? 5),
    costBadge(player.cost ?? 5)
  ].join("");
}

function renderPitcherPanel(player, nameElement, statsElement) {
  nameElement.textContent = `${player.name} ${handLabel(player.throws)}`;
  statsElement.innerHTML = [
    speedRow("球速", player.fastKmh),
    pitchCross(player),
    statRow("制球", player.control),
    statRow("球威", player.stuff),
    statRow("守備", player.fielding ?? 5)
  ].join("");
}

function updateSidebarAbilityPanels() {
  if (!activeBatterName || !activePitcherName || !activeBatterStats || !activePitcherStats) return;
  activePitcherName.textContent = `${activePitcher.name} ${handLabel(activePitcher.throws)}`;
  activePitcherStats.innerHTML = [
    speedRow("球速", activePitcher.fastKmh),
    pitchCross(activePitcher),
    statRow("制球", activePitcher.control),
    statRow("球威", activePitcher.stuff)
  ].join("");

  activeBatterName.textContent = `${activeBatter.name} ${handLabel(activeBatter.bats)}`;
  activeBatterStats.innerHTML = [
    statRow("パワー", activeBatter.power),
    statRow("ミート", activeBatter.meet),
    statRow("走塁", activeBatter.run),
    statRow("守備", activeBatter.fielding ?? 5),
    statRow("肩", activeBatter.arm ?? 5),
    statRow("打席", handLabel(activeBatterSide))
  ].join("");
}

function statRow(label, value) {
  return `
    <div class="stat-row">
      <span class="stat-name">${label}</span>
      <span class="stat-value">${value}</span>
    </div>
  `;
}

function costBadge(value) {
  return `
    <div class="cost-badge">
      <span class="cost-label">獲得</span>
      <strong class="cost-value">${value}</strong>
      <span class="cost-unit">pt</span>
    </div>
  `;
}

function speedRow(label, value) {
  return `
    <div class="stat-row speed-row">
      <span class="stat-name">${label}</span>
      <span class="stat-value">${value} km/h</span>
    </div>
  `;
}

function pitchCross(player) {
  return `
    <div class="pitch-cross" aria-label="変化能力">
      <div class="cross-cell cross-up"><span>減速</span><strong>${player.slowChange}</strong></div>
      <div class="cross-cell cross-left"><span>左</span><strong>${player.leftBreak}</strong></div>
      <div class="cross-core">変化</div>
      <div class="cross-cell cross-right"><span>右</span><strong>${player.rightBreak}</strong></div>
      <div class="cross-cell cross-down"><span>加速</span><strong>${player.fastChange}</strong></div>
    </div>
  `;
}

function startGame() {
  readMenu();
  if (getMenuTeamCost("away") > fielderPointLimit || getMenuTeamCost("home") > fielderPointLimit) {
    message = `野手獲得ポイントは各チーム${fielderPointLimit}以内`;
    updateMenuPointStatus();
    return;
  }
  scores = { away: 0, home: 0 };
  bases = createEmptyBases();
  battingOrderIndex = { away: 0, home: 0 };
  inning = 1;
  half = "top";
  battingTeam = firstBatTeam;
  count = { strikes: 0, balls: 0, outs: 0 };
  resetDefenseState();
  gamePhase = "playing";
  shell?.classList.remove("menu-open");
  menu.classList.add("hidden");
  closePlayerChooser();
  setMatchup();
  resetBall();
  resetSwing();
  message = `${teamLabel(battingTeam)}攻撃: ${activeBatter.name} vs ${activePitcher.name}`;
  updateCurrentBgm(true);
  scheduleNextPitch();
}

function showMenu() {
  gamePhase = "menu";
  shell?.classList.add("menu-open");
  menu.classList.remove("hidden");
  updateMenuAbilityPanels();
  resetBall();
  resetSwing();
  resetDefenseState();
  message = "メニューで設定して試合開始";
  updateCurrentBgm(true);
}

function setMatchup() {
  activeBatter = getCurrentBatter(battingTeam);
  activePitcher = selected[fieldingTeam()].pitcher;
  activeBatterSide = resolveBatterSide(activeBatter, activePitcher);
  const box = getBatterMoveBox();
  batter.x = (box.left + box.right) / 2;
  batter.y = 738;
  updateSidebarAbilityPanels();
}

function getCurrentBatter(team) {
  const lineup = selected[team].batters;
  return lineup[battingOrderIndex[team] % lineup.length].player;
}

function advanceBattingOrder() {
  battingOrderIndex[battingTeam] = (battingOrderIndex[battingTeam] + 1) % selected[battingTeam].batters.length;
}

function resolveBatterSide(batterInfo, pitcherInfo) {
  if (batterInfo.bats === "S") return pitcherInfo.throws === "R" ? "L" : "R";
  return batterInfo.bats;
}

function teamLabel(team) {
  return teams[team]?.label || team;
}

function fieldingTeam() {
  return battingTeam === "away" ? "home" : "away";
}

function isPlayerBatting() {
  return gameMode !== "single" || battingTeam === playerTeam;
}

function isPlayerPitching() {
  return gameMode === "versus" || (gameMode === "single" && fieldingTeam() === playerTeam);
}

function scheduleNextPitch(delay = 900) {
  if (gameMode === "single" && !isPlayerPitching()) {
    computerPitchPlan = chooseComputerPitchPlan();
    autoPitchTimer = performance.now() + delay;
    return;
  }
  computerPitchPlan = null;
  autoPitchTimer = Number.POSITIVE_INFINITY;
}

function resetBall() {
  ball.x = pitcher.x;
  ball.y = pitcher.y + 18;
  ball.prevX = ball.x;
  ball.prevY = ball.y;
  ball.vx = 0;
  ball.vy = 0;
  ball.baseVx = 0;
  ball.baseVy = 0;
  ball.speedScale = 1;
  ball.active = false;
  ball.inPitch = false;
  ball.crossedPlate = false;
  ball.touchedPlate = false;
  ball.wasHit = false;
  ball.pitchStartTime = 0;
  ball.plateTime = 0;
  ball.targetX = field.plateX;
  ball.targetY = field.plateY;
  ball.spin = 0;
  ball.curvePower = 0;
  ball.trail = [];
  hbpPose.active = false;
  computerPitchPlan = null;
  isPitching = false;
  pendingPitch = null;
  currentPitchType = "";
  currentPitchSpeedKmh = null;
  releasePitchControlLockout();
}

function clearPitchControlKeys() {
  pitchAdjustmentKeys.forEach((key) => {
    keysDown.delete(key);
    keysDown.delete(`Digit${key}`);
    keysDown.delete(`Numpad${key}`);
  });
  releasePitchControlLockout();
}

function armPitchControlLockout() {
  pitchControlLockoutKeys = new Set(pitchAdjustmentKeys.filter((key) => isKeyHeld(key)));
}

function releasePitchControlLockout(key = null) {
  if (key === null) {
    pitchControlLockoutKeys.clear();
    return;
  }
  pitchControlLockoutKeys.delete(key);
}

function resetSwing() {
  swingState.isSwinging = false;
  swingState.startTime = 0;
  swingState.didSwingThisPitch = false;
  swingState.madeContact = false;
  swingState.lastCheckProgress = 0;
}

function resetCountOnly() {
  count.strikes = 0;
  count.balls = 0;
}

function startPitch(typeKey, options = {}) {
  if (gamePhase !== "playing" || isPitching || pendingPitch || ball.active) return;
  const pitch = pitchTypes[typeKey];
  if (!pitch) {
    message = "球種は 5/8/2 から選んでください";
    return;
  }
  const now = performance.now();
  const startX = pitcher.x;
  const startY = pitcher.y + 96;
  const course = options.course || getHeldCourseAim();
  const control = activePitcher.control ?? 5;
  const controlProfile = getPitchControlProfile(control);
  const intendedX = options.targetX ?? (field.plateX + course.offset);
  const intendedY = options.targetY ?? field.plateY;
  const baseSpread = options.targetSpread ?? (course.direction === 0 ? pitch.targetSpread : 8);
  const targetSpread = baseSpread * controlProfile.spread;
  const controlMiss = getPitchControlMiss(controlProfile, intendedX, intendedY);
  const targetX = controlMiss.x + randomBetween(-targetSpread, targetSpread);
  const targetY = controlMiss.y + randomBetween(-30, 34) * controlProfile.verticalSpread;
  const speedKmh = Math.round(activePitcher.fastKmh * pitch.baseKmhFactor * randomBetween(0.9, 1.1));
  const referenceKmh = 150 * pitch.baseKmhFactor;
  const baseGameSpeed = 8.05 * pitch.speedFactor;
  const speedRatio = speedKmh / referenceKmh;
  const actualPitchSpeed = baseGameSpeed * speedRatio * actualPitchSpeedBoost;
  const framesToPlate = (field.plateY - startY) / actualPitchSpeed;

  resetSwing();
  ball.x = startX;
  ball.y = startY;
  ball.prevX = startX;
  ball.prevY = startY;
  ball.radius = typeKey === "fast" ? 8 : 9;
  ball.active = false;
  ball.baseVx = 0;
  ball.baseVy = 0;
  ball.speedScale = 1;
  ball.inPitch = false;
  ball.crossedPlate = false;
  ball.touchedPlate = false;
  ball.wasHit = false;
  ball.pitchStartTime = now;
  ball.plateTime = now + pitchWindupDuration + framesToPlate * (1000 / 60);
  ball.targetX = targetX;
  ball.targetY = targetY;
  ball.spin = 0;
  ball.curvePower = 0;
  ball.trail = [];
  currentPitchType = typeKey;
  currentPitchSpeedKmh = null;
  isPitching = true;
  pitcher.windupTime = now;
  pendingPitch = { releaseTime: now + pitchWindupDuration, startX, startY, targetX, targetY, framesToPlate, speedKmh };
  autoPitchTimer = Number.POSITIVE_INFINITY;
  message = `${pitch.label}、モーション開始`;
}

function getPitchControlProfile(control = 5) {
  const wildness = clamp((10 - (control ?? 5)) / 9, 0, 1);
  return {
    wildness,
    spread: clamp(0.72 + wildness * 2.65, 0.72, 3.37),
    verticalSpread: clamp(0.82 + wildness * 2.35, 0.82, 3.17),
    wildMissChance: wildness * 0.22,
    mistakeChance: wildness * 0.18
  };
}

function getPitchControlMiss(controlProfile, intendedX, intendedY) {
  if (controlProfile.wildness <= 0) return { x: intendedX, y: intendedY };
  const roll = Math.random();
  if (roll < controlProfile.mistakeChance) {
    const centerPull = 0.58 + controlProfile.wildness * 0.28;
    return {
      x: intendedX + (field.plateX - intendedX) * centerPull,
      y: intendedY + (field.plateY - intendedY) * centerPull
    };
  }
  if (roll < controlProfile.mistakeChance + controlProfile.wildMissChance) {
    const missDistance = randomBetween(34, 120 + controlProfile.wildness * 90);
    const angle = randomBetween(0, Math.PI * 2);
    return {
      x: intendedX + Math.cos(angle) * missDistance,
      y: intendedY + Math.sin(angle) * missDistance * 0.72
    };
  }
  return { x: intendedX, y: intendedY };
}

function releasePendingPitch() {
  if (!pendingPitch || performance.now() < pendingPitch.releaseTime) return;
  ball.x = pendingPitch.startX;
  ball.y = pendingPitch.startY;
  ball.prevX = ball.x;
  ball.prevY = ball.y;
  ball.vx = (pendingPitch.targetX - pendingPitch.startX) / pendingPitch.framesToPlate;
  ball.vy = (pendingPitch.targetY - pendingPitch.startY) / pendingPitch.framesToPlate;
  ball.baseVx = ball.vx;
  ball.baseVy = ball.vy;
  ball.speedScale = 1;
  ball.active = true;
  ball.inPitch = true;
  ball.crossedPlate = false;
  ball.touchedPlate = isBallTouchingHomePlate();
  ball.pitchStartTime = pendingPitch.releaseTime;
  ball.plateTime = pendingPitch.releaseTime + pendingPitch.framesToPlate * (1000 / 60);
  ball.trail = [];
  currentPitchSpeedKmh = pendingPitch.speedKmh;
  armPitchControlLockout();
  pendingPitch = null;
  message = `${pitchTypes[currentPitchType].label} ${currentPitchSpeedKmh}km/h`;
}

function getHeldCourseAim() {
  if (isKeyHeld("4") && !isKeyHeld("6")) return { direction: -1, offset: -48 };
  if (isKeyHeld("6") && !isKeyHeld("4")) return { direction: 1, offset: 48 };
  return { direction: 0, offset: 0 };
}

function movePitcherOnPlate(direction) {
  if (gamePhase !== "playing" || isPitching || pendingPitch || ball.active) return;
  pitcher.x = clamp(pitcher.x + direction * pitcher.moveStep, pitcher.minX, pitcher.maxX);
  ball.x = pitcher.x;
  message = direction < 0 ? "投手位置を左へ移動" : "投手位置を右へ移動";
}

function chooseComputerPitchPlan() {
  const roll = Math.random();
  const type = roll < 0.45 ? "normal" : roll < 0.72 ? "fast" : "slow";
  const courseRoll = Math.random();
  let course = { direction: 0, offset: randomBetween(-18, 18) };
  if (courseRoll < 0.28) course = { direction: -1, offset: randomBetween(-58, -28) };
  else if (courseRoll < 0.56) course = { direction: 1, offset: randomBetween(28, 58) };

  const plan = {
    type,
    course,
    targetSpread: type === "slow" ? 34 : type === "fast" ? 18 : 24,
    bendDirection: 0,
    bendStart: randomBetween(0.28, 0.52),
    bendEnd: randomBetween(0.62, 0.86),
    bendChance: 0.75
  };

  if (Math.random() < 0.52) plan.bendDirection = Math.random() < 0.5 ? -1 : 1;
  if (Math.random() < 0.04) {
    plan.targetX = batter.x + randomBetween(-18, 18);
    plan.targetY = batter.y - randomBetween(30, 72);
    plan.targetSpread = 12;
    plan.bendDirection = Math.random() < 0.5 ? -1 : 1;
    plan.bendStart = 0.18;
    plan.bendEnd = 0.72;
    plan.bendChance = 1;
  }
  return plan;
}

function computerBendPitch() {
  if (gameMode !== "single" || isPlayerPitching() || !computerPitchPlan || !isPitching || !ball.inPitch || ball.crossedPlate) return;
  const progress = getPitchProgress();
  if (computerPitchPlan.bendDirection !== 0 && progress > computerPitchPlan.bendStart && progress < computerPitchPlan.bendEnd && Math.random() < 0.035 * computerPitchPlan.bendChance) {
    applyPitchBend(computerPitchPlan.bendDirection);
  }
}

function swingBat() {
  const now = performance.now();
  if (gamePhase !== "playing" || !isPlayerBatting()) return;
  startSwing(now);
}

function startSwing(now = performance.now()) {
  if (now < swingState.cooldownUntil || swingState.isSwinging) return;
  swingState.isSwinging = true;
  swingState.startTime = now;
  swingState.cooldownUntil = now + 430;
  swingState.didSwingThisPitch = true;
  swingState.madeContact = false;
  swingState.lastCheckProgress = 0;
  playSound("swing");
  if (!isPitching || pendingPitch) message = "まだ投球されていません";
}

function computerSwingBat() {
  if (gameMode !== "single" || isPlayerBatting() || !isPitching || !ball.inPitch || ball.crossedPlate || swingState.didSwingThisPitch) return;
  const progress = getPitchProgress();
  if (progress < 0.72 || progress > 1.08) return;
  const plateDistance = distanceToHomePlate(ball.x, ball.y, ball.radius);
  const chaseScore = clamp(1 - plateDistance / (105 + activeBatter.meet * 12), 0, 1);
  const timingWindow = Math.max(0, 1 - Math.abs(progress - 0.92) / 0.26);
  const swingChance = 0.018 + timingWindow * (0.11 + chaseScore * 0.18 + activeBatter.meet * 0.006);
  if (Math.random() < swingChance) startSwing();
}

function update(delta) {
  const now = performance.now();
  updateCurrentBgm();
  if (gamePhase === "defense") {
    updateDefensePlay(now);
    if (hitEffect.active && now - hitEffect.startTime > 1000) hitEffect.active = false;
    return;
  }
  if (gamePhase === "playing" && isPlayerBatting()) updateBatter(delta);
  if (gameMode === "single" && gamePhase === "playing" && !isPitching && !pendingPitch && !ball.active && now > autoPitchTimer) {
    const plan = computerPitchPlan || chooseComputerPitchPlan();
    startPitch(plan.type, plan);
  }
  releasePendingPitch();
  computerBendPitch();
  if (ball.active) updateBall(delta);
  computerSwingBat();
  if (isPitching && ball.inPitch && !swingState.madeContact && isBallHittingBatter()) {
    if (isStrikePitchForHbp()) {
      ball.crossedPlate = true;
      finishPitch("ストライク", "strike", 0, performance.now() - ball.plateTime);
    } else {
      finishPitch("デッドボール", "hbp");
    }
    return;
  }
  if (isPitching && ball.inPitch && isBatInJudgmentWindow(now) && !swingState.madeContact) {
    checkSwingContact();
  }
  if (isPitching && ball.inPitch && !ball.crossedPlate && hasBallPassedHomePlate()) {
    ball.crossedPlate = true;
    judgePitchAtPlate();
  }
  if (swingState.isSwinging && now - swingState.startTime > swingState.duration + swingState.followHoldDuration) swingState.isSwinging = false;
  if (hitEffect.active && now - hitEffect.startTime > 1000) hitEffect.active = false;
  if (hbpPose.active && now - hbpPose.startTime > hbpPose.duration) hbpPose.active = false;
}

function updateBatter(delta = 1000 / 60) {
  const box = getBatterMoveBox();
  if (mouseAim.active) {
    batter.x = mouseAim.x;
    batter.y = mouseAim.y;
  }
  const keyboardMove = getBatterKeyboardMove();
  if (keyboardMove.x || keyboardMove.y) {
    const frameScale = delta / (1000 / 60);
    batter.x += keyboardMove.x * batterMoveTuning.keyboardMoveSpeed * frameScale;
    batter.y += keyboardMove.y * batterMoveTuning.keyboardMoveSpeed * frameScale;
    mouseAim.active = false;
  }
  batter.x = clamp(batter.x, box.left, box.right);
  batter.y = clamp(batter.y, box.top, box.bottom);
}

function getBatterKeyboardMove() {
  return {
    x: (isKeyHeld("ArrowRight") ? 1 : 0) - (isKeyHeld("ArrowLeft") ? 1 : 0),
    y: (isKeyHeld("ArrowDown") ? 1 : 0) - (isKeyHeld("ArrowUp") ? 1 : 0)
  };
}

function isBatInJudgmentWindow(now = performance.now()) {
  return swingState.isSwinging && now - swingState.startTime <= swingState.duration;
}

function getBatterMoveBox() {
  const baseBox = activeBatterSide === "R" ? field.rightBox : field.leftBox;
  const plateHalfTop = 36 * field.plateScale;
  const plateLeftLimit = field.plateX - plateHalfTop - batterMoveTuning.plateSideGap;
  const plateRightLimit = field.plateX + plateHalfTop + batterMoveTuning.plateSideGap;
  const rawLeft = activeBatterSide === "R" ? baseBox.left : Math.max(baseBox.left, plateRightLimit);
  const rawRight = activeBatterSide === "R" ? Math.min(baseBox.right, plateLeftLimit) : baseBox.right;
  const plateNudge = activeBatterSide === "R" ? batterMoveTuning.plateSideNudge : -batterMoveTuning.plateSideNudge;
  const center = (rawLeft + rawRight) / 2 + plateNudge;
  const halfWidth = ((rawRight - rawLeft) * batterMoveTuning.horizontalRangeScale) / 2;
  const plateTop = field.plateY - 12 * field.plateScale;
  return {
    left: center - halfWidth,
    right: center + halfWidth,
    top: Math.max(baseBox.top + batterMoveTuning.moundSideShrink, plateTop + batterMoveTuning.shoeLimitOffsetY),
    bottom: baseBox.bottom
  };
}

function updateBall(delta) {
  const frameScale = delta / (1000 / 60);
  ball.trail.push({ x: ball.x, y: ball.y });
  if (ball.trail.length > 26) ball.trail.shift();
  const prevX = ball.x;
  const prevY = ball.y;
  ball.prevX = prevX;
  ball.prevY = prevY;
  if (ball.inPitch) {
    const progress = getPitchProgress();
    const heldBend = isPlayerPitching() ? getHeldBendDirection() : 0;
    const heldSpeedChange = isPlayerPitching() ? getHeldSpeedChangeDirection() : 0;
    if (heldBend !== 0) applyPitchBend(heldBend, frameScale, progress);
    if (heldSpeedChange !== 0) applyPitchSpeedChange(heldSpeedChange, frameScale);
    ball.x += ball.curvePower * Math.max(0, progress - 0.28) * 0.31 * frameScale;
  }
  ball.x += ball.vx * frameScale;
  ball.y += ball.vy * frameScale;
  ball.spin += 0.18 * frameScale;
  if (ball.inPitch) markPlateTouch(prevX, prevY, ball.x, ball.y);
  if (!ball.inPitch) ball.vy += 0.18 * frameScale;
  if (ball.inPitch && isPitchOutOfHorizontalBounds()) {
    ball.crossedPlate = true;
    finishPitch("ボール", "ball", 0, 0);
    return;
  }
  if (ball.y < -80 || ball.y > canvas.height + 90 || ball.x < -140 || ball.x > canvas.width + 140) {
    ball.active = false;
  }
}

function isPitchOutOfHorizontalBounds() {
  return ball.x + ball.radius < 0 || ball.x - ball.radius > canvas.width;
}

function applyPitchBend(direction, frameScale = 1, progress = getPitchProgress()) {
  const rating = direction > 0 ? activePitcher.rightBreak : activePitcher.leftBreak;
  const ability = 0.55 + rating * 0.09;
  const bendStrength = (0.11 + Math.sin(progress * Math.PI) * 0.07) * ability;
  ball.curvePower = clamp(ball.curvePower + direction * bendStrength * frameScale, -4.25 * ability, 4.25 * ability);
  ball.vx = clamp(ball.vx + direction * bendStrength * 0.55 * frameScale, -6.1, 6.1);
  ball.spin += direction * 0.42 * frameScale;
  message = direction < 0 ? "左へ変化中" : "右へ変化中";
}

function applyPitchSpeedChange(direction, frameScale = 1) {
  const rating = direction < 0 ? activePitcher.slowChange : activePitcher.fastChange;
  const ratingEffect = Math.pow(clamp(rating, 1, 10) / 10, 2);
  const changeAmount = maxPitchSpeedChangeAmount * ratingEffect * frameScale;
  const nextScale = clamp(ball.speedScale + direction * changeAmount, 1 - pitchSpeedChangeLimit, 1 + pitchSpeedChangeLimit);
  if (nextScale === ball.speedScale) return;

  const velocityMultiplier = nextScale / ball.speedScale;
  ball.vx *= velocityMultiplier;
  ball.vy *= velocityMultiplier;
  ball.speedScale = nextScale;
  updateDynamicPlateTime();
  message = direction < 0 ? `減速中: ${rating}` : `加速中: ${rating}`;
}

function updateDynamicPlateTime() {
  if (!ball.inPitch || ball.vy <= 0) return;
  const framesToPlate = Math.max(0, (field.plateY - ball.y) / ball.vy);
  ball.plateTime = performance.now() + framesToPlate * (1000 / 60);
}

function getHeldBendDirection() {
  const left = isPitchControlHeld("4");
  const right = isPitchControlHeld("6");
  if (left === right) return 0;
  return left ? -1 : 1;
}

function getHeldSpeedChangeDirection() {
  const slow = isPitchControlHeld("1");
  const fast = isPitchControlHeld("3");
  if (slow === fast) return 0;
  return slow ? -1 : 1;
}

function isKeyHeld(key) {
  return keysDown.has(key) || keysDown.has(`Digit${key}`) || keysDown.has(`Numpad${key}`);
}

function isPitchControlHeld(key) {
  return isKeyHeld(key) && !pitchControlLockoutKeys.has(key);
}

function checkSwingContact() {
  const bestHit = findBestSwingContact();
  if (!bestHit) return;
  const contact = buildContactProfile(bestHit);
  if (!contact.isContact) return;

  swingState.madeContact = true;
  playSound("hit");
  const result = promoteLiftedContactResult(decideHitResult(contact));
  result.direction = result.direction || (result.popupFly
    ? getPopupFlyDirection(contact.timeDiff)
    : result.routineFly
    ? getRoutineFlyDirection(contact.timeDiff)
    : result.frontDrop
    ? getFrontDropDirection(contact.timeDiff)
    : result.grounderGap || result.gapLiner
    ? getInfieldGapGrounderDirection(contact.timeDiff)
    : getHitDirection(contact.timeDiff, result.kind === "foul"));
  if ((result.kind === "hit" || result.kind === "out") && !isFairDirection(result.direction)) {
    result.label = hitLabels.foul;
    result.kind = "foul";
    result.power = Math.min(result.power, 0.32);
  }
  finishPitch(result.label, result.kind, result.power, contact.timeDiff, result.direction);
}

function promoteLiftedContactResult(result) {
  const profile = result?.battedProfile;
  if (!profile || result.kind !== "hit") return result;
  if (result.deepDrive || result.fenceEdgeFly || result.fenceLiner || result.chaseFly || result.lineLiner) return result;
  const powerDriveScore = getPowerDriveScore();
  if (profile.isFoul || profile.launchAngle < 16 || profile.exitVelocity < 0.78 || profile.carry < 0.62) return result;
  if (powerDriveScore < 0.18) return result;
  if (profile.carry >= 0.92 || profile.launchAngle >= 26 || profile.fenceEdgeFlyScore >= 0.36) {
    return powerDriveScore >= 0.42 ? makeDeepDriveResultFromProfile(profile) : makeFenceEdgeFlyResultFromProfile(profile);
  }
  return makeFenceEdgeFlyResultFromProfile(profile);
}

function playSound(name) {
  if (!audioSettings.soundEffects) return;
  const sound = sounds[name];
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function playScoringCheer(runs) {
  if (runs > 0) playSound("cheer");
}

function updateHomeRunFireworksSound(elapsedSeconds) {
  const fireworks = defenseState.homeRunFireworks;
  if (!fireworks || defenseState.homeRunFireworksSoundPlayed) return;
  if (elapsedSeconds < fireworks.startDelay) return;
  defenseState.homeRunFireworksSoundPlayed = true;
  playSound("firework");
}

function updateAudioToggleButtons() {
  soundToggleButtons.forEach((button) => {
    button.textContent = audioSettings.soundEffects ? "効果音 ON" : "効果音 OFF";
    button.setAttribute("aria-pressed", String(audioSettings.soundEffects));
  });
  bgmToggleButtons.forEach((button) => {
    button.textContent = audioSettings.bgm && bgmNeedsUserGesture ? "BGM開始" : audioSettings.bgm ? "BGM ON" : "BGM OFF";
    button.setAttribute("aria-pressed", String(audioSettings.bgm));
  });
}

function setSoundEffectsEnabled(enabled) {
  audioSettings.soundEffects = enabled;
  updateAudioToggleButtons();
}

function setBgmEnabled(enabled) {
  audioSettings.bgm = enabled;
  if (enabled) {
    updateCurrentBgm(true);
  } else {
    pauseAllBgm();
  }
  updateAudioToggleButtons();
}

function toggleSoundEffects() {
  setSoundEffectsEnabled(!audioSettings.soundEffects);
}

function toggleBgm() {
  setBgmEnabled(!audioSettings.bgm);
}

function handleBgmButtonClick() {
  if (audioSettings.bgm && (bgmNeedsUserGesture || !currentBgmKey)) {
    unlockBgmAfterUserGesture();
    return;
  }
  toggleBgm();
}

function getCurrentBgmKey() {
  if (gamePhase === "menu" || gamePhase === "gameover") return "menu";
  if (gamePhase !== "playing" && gamePhase !== "defense") return null;
  return bases.second || bases.third ? "scoring" : "relaxed";
}

function pauseAllBgm() {
  Object.values(bgmTracks).forEach((track) => {
    track.muted = true;
    if (typeof track.pause === "function") track.pause();
  });
  currentBgmKey = null;
  bgmNeedsUserGesture = false;
}

function updateCurrentBgm(force = false) {
  const nextKey = getCurrentBgmKey();
  if (!audioSettings.bgm || !nextKey) {
    pauseAllBgm();
    return;
  }
  if (!force && currentBgmKey === nextKey) return;

  Object.entries(bgmTracks).forEach(([key, track]) => {
    if (key === nextKey) return;
    track.muted = true;
    if (typeof track.pause === "function") track.pause();
  });

  const nextTrack = bgmTracks[nextKey];
  if (!nextTrack) return;
  currentBgmKey = nextKey;
  nextTrack.muted = false;
  const playResult = nextTrack.play?.();
  if (playResult?.catch) {
    playResult
      .then(() => {
        bgmNeedsUserGesture = false;
        updateAudioToggleButtons();
      })
      .catch(() => {
        bgmNeedsUserGesture = true;
        if (currentBgmKey === nextKey) currentBgmKey = null;
        updateAudioToggleButtons();
      });
  } else {
    bgmNeedsUserGesture = false;
    updateAudioToggleButtons();
  }
}

function unlockBgmAfterUserGesture() {
  if (!audioSettings.bgm) return;
  if (!bgmNeedsUserGesture && currentBgmKey) return;
  updateCurrentBgm(true);
}

function findBestSwingContact() {
  const swingProgress = getBatSwingProgress();
  const previousProgress = Math.min(swingState.lastCheckProgress, swingProgress);
  const sweep = swingProgress - previousProgress;
  const samples = Math.max(8, Math.ceil(Math.abs(sweep) * 36));
  let bestHit = null;
  for (let i = 0; i <= samples; i += 1) {
    const sampleRatio = i / samples;
    const progress = previousProgress + sweep * sampleRatio;
    const sampleX = ball.prevX + (ball.x - ball.prevX) * sampleRatio;
    const sampleY = ball.prevY + (ball.y - ball.prevY) * sampleRatio;
    const bat = getBatSegment(progress);
    const batContact = closestPointOnSegment(sampleX, sampleY, bat.x1, bat.y1, bat.x2, bat.y2);
    if (!bestHit || batContact.distance < bestHit.distanceToBat) {
      bestHit = { batContact, distanceToBat: batContact.distance, x: sampleX, y: sampleY };
    }
  }
  swingState.lastCheckProgress = swingProgress;
  return bestHit;
}

function buildContactProfile(bestHit) {
  const distanceToBat = bestHit.distanceToBat;
  const meetBonus = (activeBatter.meet - 5) * 3;
  const nearPlate = Math.abs(bestHit.y - field.plateY) < 138 + meetBonus;
  const inGoodContactZone = isBallInGoodContactZone(bestHit.x, bestHit.y, ball.radius);
  const strikeZoneDistance = distanceToHomePlate(bestHit.x, bestHit.y, ball.radius);
  const outsideStrikeZone = strikeZoneDistance > 0;
  const contactRange = ((inGoodContactZone ? ball.radius + 58 : outsideStrikeZone ? ball.radius + 22 : ball.radius + 36) + meetBonus) * batThicknessMultiplier;

  const timeDiff = performance.now() - ball.plateTime;
  const timingScore = Math.max(0, 1 - Math.abs(timeDiff) / (360 + activeBatter.meet * 7));
  // 判定バットを太くした分、快打評価では中心線からの距離を少し戻す。
  const effectiveBatDistance = distanceToBat / batThicknessMultiplier;
  const barrelScore = Math.max(0, 1 - effectiveBatDistance / (78 + activeBatter.meet * 4));
  const sweetSpotScore = getSweetSpotScore(bestHit.batContact.t);
  const plateDistance = distanceToGoodContactZone(bestHit.x, bestHit.y, ball.radius);
  const zoneReach = 68 + activeBatter.meet * 12;
  const zoneScore = inGoodContactZone ? 1 : clamp(1 - plateDistance / zoneReach, 0, 1);
  const chasePenalty = inGoodContactZone ? 0 : clamp(plateDistance / (92 + activeBatter.meet * 10), 0, outsideStrikeZone ? 0.72 : 0.42);
  const stuffPenalty = ((activePitcher.stuff ?? 5) - 5) * 0.05;
  const edgePenalty = inGoodContactZone ? 0 : outsideStrikeZone ? 0.32 : 0.14;
  const yellowZoneBoost = getYellowZoneContactBoost(inGoodContactZone, outsideStrikeZone, zoneScore);
  const lowMeetPressure = clamp((10 - activeBatter.meet) / 7, 0, 1);
  const sweetSpotMiss = 1 - sweetSpotScore;
  const sweetSpotPenalty = sweetSpotMiss * (inGoodContactZone ? 0.07 : 0.18)
    + Math.pow(sweetSpotMiss, 1.18) * lowMeetPressure * (inGoodContactZone ? 0.14 : 0.28);
  const lowMeetQualityDrag = sweetSpotMiss * lowMeetPressure * 0.08;
  const quality = clamp(timingScore * 0.4 + barrelScore * 0.26 + sweetSpotScore * 0.12 + zoneScore * 0.24 + 0.1 + (inGoodContactZone ? 0.48 : 0) + yellowZoneBoost - chasePenalty - stuffPenalty - edgePenalty - sweetSpotPenalty - lowMeetQualityDrag, 0, 1);
  return {
    isContact: nearPlate && distanceToBat <= contactRange,
    timeDiff,
    timingScore,
    barrelScore,
    sweetSpotScore,
    zoneScore,
    plateDistance,
    outsideStrikeZone,
    inGoodContactZone,
    yellowZoneBoost,
    quality
  };
}

function getYellowZoneContactBoost(inGoodContactZone, outsideStrikeZone, zoneScore) {
  if (inGoodContactZone) return yellowZoneHitTuning.maxContactBoost;
  if (outsideStrikeZone) return 0;
  return clamp((zoneScore - 0.42) / 0.58, 0, 1) * yellowZoneHitTuning.maxContactBoost;
}

function judgePitchAtPlate() {
  if (swingState.madeContact) return;
  if (swingState.didSwingThisPitch) {
    finishPitch("空振り", "strike", 0, performance.now() - ball.plateTime);
    return;
  }
  const inZone = ball.touchedPlate || isBallInStrikeZone();
  finishPitch(inZone ? "見逃しストライク" : "ボール", inZone ? "strike" : "ball", 0, 0);
}

function decideHitResult(contact) {
  return decideHitResultFromBattedProfile(contact);
}

function decideHitResultFromBattedProfile(contact) {
  const profile = buildBattedBallProfile(contact);
  const { outsideStrikeZone } = contact;
  const roll = Math.random();

  if (profile.isFoul) {
    return { label: hitLabels.foul, kind: "foul", power: profile.power, direction: profile.direction };
  }

  if (isYellowZoneContact(contact)) {
    const yellowResult = decideYellowZoneHitResult(profile, contact, roll);
    if (yellowResult) return yellowResult;
    return decideNormalZoneHitResult(profile, contact, roll);
  }
  const result = outsideStrikeZone
    ? decideOutsideZoneHitResult(profile, contact, roll)
    : decideNormalZoneHitResult(profile, contact, roll);
  return contact.inGoodContactZone ? result : applyNonYellowHitChancePenalty(result, profile);
}

function isYellowZoneContact(contact) {
  return (contact.yellowZoneBoost ?? 0) > 0;
}

function applyNonYellowHitChancePenalty(result, profile, penaltyRoll = Math.random()) {
  if (!result || result.kind !== "hit") return result;
  if (penaltyRoll >= nonYellowHitChancePenalty) return result;
  if (profile.launchAngle <= 10) {
    return { label: hitLabels.grounder, kind: "out", power: Math.min(result.power ?? profile.power, 0.72), direction: profile.direction, battedProfile: profile };
  }
  if (profile.launchAngle >= 24) return makeRoutineFlyResultFromProfile(profile);
  return makePopupFlyResultFromProfile(profile);
}

function decideOutsideZoneHitResult(profile, contact, roll) {
  const { quality } = contact;

  if (quality < 0.36 && roll < 0.42) {
    return profile.launchAngle < 8
      ? { label: hitLabels.grounder, kind: "out", power: profile.power, direction: profile.direction, battedProfile: profile }
      : makePopupFlyResultFromProfile(profile);
  }

  if (profile.launchAngle >= 64) return makePopupFlyResultFromProfile(profile);

  if (profile.launchAngle >= 24) {
    if (profile.exitVelocity >= 1.16 && profile.carry >= 1.05 && profile.fenceEdgeFlyScore > 0.28 && roll < profile.fenceEdgeFlyScore) {
      return makeFenceEdgeFlyResultFromProfile(profile);
    }
    if (profile.exitVelocity >= 0.86 && roll < 0.18) return makeChaseFlyResultFromProfile(profile);
    return roll < 0.68 ? makeRoutineFlyResultFromProfile(profile) : makePopupFlyResultFromProfile(profile);
  }

  return decideNormalZoneHitResult(profile, contact, roll);
}

function decideNormalZoneHitResult(profile, contact, roll) {
  const { quality, timingScore, sweetSpotScore, zoneScore, inGoodContactZone } = contact;
  const powerRating = getEffectiveBatterPower(activeBatter);
  const powerDriveScore = getPowerDriveScore(powerRating);
  const easyCenterDrive = inGoodContactZone
    && zoneScore >= 0.86
    && profile.exitVelocity >= 0.5
    && profile.carry >= 0.42
    && quality >= 0.16
    && sweetSpotScore >= 0.16;
  const easyCenterHomerDrive = inGoodContactZone
    && zoneScore >= 0.92
    && powerDriveScore >= 0.35
    && profile.exitVelocity >= 0.72
    && profile.carry >= 0.68
    && quality >= 0.34
    && sweetSpotScore >= 0.36;
  const centerDriveRoll = clamp(0.08 + quality * 0.04 + sweetSpotScore * 0.04, 0.09, 0.22);
  const centerHomerRoll = clamp(0.28 - quality * 0.08 - sweetSpotScore * 0.05, 0.14, 0.28);

  if (profile.launchAngle >= 64) {
    if (easyCenterHomerDrive) return makeDeepDriveResultFromProfile(profile);
    if (easyCenterDrive && powerDriveScore >= 0.18) return makeFenceEdgeFlyResultFromProfile(profile);
    const liftedMistake = inGoodContactZone
      && powerDriveScore >= 0.35
      && profile.exitVelocity >= 1.0
      && profile.carry >= 0.95
      && quality >= 0.55
      && sweetSpotScore >= 0.64;
    if (liftedMistake) {
      if (roll < profile.fenceEdgeFlyScore * 0.86) return makeFenceEdgeFlyResultFromProfile(profile);
      return makeDeepDriveResultFromProfile(profile);
    }
    if (easyCenterDrive) return makeGapLinerResult(profile);
    return makePopupFlyResultFromProfile(profile);
  }

  if (easyCenterHomerDrive && powerDriveScore >= 0.42 && profile.launchAngle >= 4 && roll > centerHomerRoll) {
    return makeDeepDriveResultFromProfile(profile);
  }

  if (easyCenterDrive && profile.launchAngle >= 4 && roll > centerDriveRoll) {
    if (powerDriveScore < 0.18) return makeGapLinerResult(profile);
    return roll > centerDriveRoll + 0.12 && powerDriveScore >= 0.35
      ? makeDeepDriveResultFromProfile(profile)
      : makeFenceEdgeFlyResultFromProfile(profile);
  }

  if (profile.launchAngle >= 30) {
    if (profile.fenceEdgeFlyScore > 0.16 && roll < profile.fenceEdgeFlyScore) return makeFenceEdgeFlyResultFromProfile(profile);
    if (profile.toweringFlyScore > 0.42 && roll < profile.toweringFlyScore) return makeToweringFlyResultFromProfile(profile);
    if (profile.chaseFlyScore > 0.46 && roll < profile.chaseFlyScore) return makeChaseFlyResultFromProfile(profile);
    if (profile.exitVelocity >= 1.02 && profile.carry >= 0.98) return makeDeepDriveResultFromProfile(profile);
    if (!inGoodContactZone && profile.launchAngle <= 38 && profile.exitVelocity >= 0.62 && quality >= 0.34) {
      if (roll < 0.34 + sweetSpotScore * 0.08) return makeGapLinerResult(profile);
    }
    return makeRoutineFlyResultFromProfile(profile);
  }

  if (profile.launchAngle <= 7) {
    if (easyCenterHomerDrive && roll > 0.2) return makeDeepDriveResultFromProfile(profile);
    if (easyCenterDrive && powerDriveScore >= 0.18 && roll > 0.12) return makeFenceEdgeFlyResultFromProfile(profile);
    if (profile.exitVelocity >= 0.66 && (profile.gapScore > 0.3 || quality > 0.44)) return makeGapGrounderResult(profile);
    return { label: hitLabels.grounder, kind: "out", power: profile.power, direction: profile.direction, battedProfile: profile };
  }

  if (profile.exitVelocity < 0.44 || timingScore < 0.17 || zoneScore < 0.13) {
    return roll < 0.72
      ? { label: hitLabels.grounder, kind: "out", power: profile.power, direction: profile.direction, battedProfile: profile }
      : makePopupFlyResultFromProfile(profile);
  }

  if (profile.launchAngle < 15) {
    if (easyCenterHomerDrive && roll > 0.22) return makeDeepDriveResultFromProfile(profile);
    if (easyCenterDrive && powerDriveScore >= 0.18 && roll > 0.14) return makeFenceEdgeFlyResultFromProfile(profile);
    return profile.exitVelocity >= 0.58 || sweetSpotScore > 0.44
      ? makeGapGrounderResult(profile)
      : { label: hitLabels.grounder, kind: "out", power: profile.power, direction: profile.direction, battedProfile: profile };
  }

  if (profile.launchAngle <= 29) {
    if (easyCenterHomerDrive && roll > 0.34) return makeDeepDriveResultFromProfile(profile);
    if (profile.launchAngle >= 20 && easyCenterDrive && powerDriveScore >= 0.18) {
      if (roll > 0.44) return makeFenceEdgeFlyResultFromProfile(profile);
      if (roll > 0.28 && powerDriveScore >= 0.35) return makeDeepDriveResultFromProfile(profile);
    }
    if (profile.launchAngle >= 24 && profile.exitVelocity >= 0.9 && profile.carry >= 0.78 && quality >= 0.5 && sweetSpotScore >= 0.62) {
      if (roll > 0.46) return makeFenceEdgeFlyResultFromProfile(profile);
      if (roll > 0.28) return makeDeepDriveResultFromProfile(profile);
    }
    if (!inGoodContactZone && profile.frontDropScore > 0.24 && roll < profile.frontDropScore) return makeFrontDropResultFromProfile(profile);
    if (profile.fenceLinerScore > 0.3 && roll < profile.fenceLinerScore) return makeFenceLinerResultFromProfile(profile);
    if (!inGoodContactZone && profile.lineEdgeScore > 0.38 && roll < profile.lineEdgeScore + 0.08) return makeLineEdgeResultFromProfile(profile);
    if (!inGoodContactZone && profile.lineLinerScore > 0.34 && roll < profile.lineLinerScore + 0.16) return makeLineLinerResultFromProfile(profile);
    if (!inGoodContactZone && profile.lineDropScore > 0.24 && roll < profile.lineDropScore) return makeLineDropResultFromProfile(profile);
    if (!inGoodContactZone && profile.frontDropScore > 0.2 && roll < profile.frontDropScore + 0.08) return makeFrontDropResultFromProfile(profile);
    if (profile.exitVelocity >= 0.66 && quality >= 0.38) return makeGapLinerResult(profile);
    if (profile.launchAngle >= 20 && profile.exitVelocity >= 0.58 && quality >= 0.32) return makeGapLinerResult(profile);
    if (profile.exitVelocity >= 0.5 && roll < 0.78 + sweetSpotScore * 0.16) return makeFrontDropResult(profile);
    return makeRoutineFlyResultFromProfile(profile);
  }

  if (profile.launchAngle >= 29 && profile.fenceEdgeFlyScore > 0.3 && roll < profile.fenceEdgeFlyScore * 0.9) return makeFenceEdgeFlyResultFromProfile(profile);
  if (profile.launchAngle >= 29 && profile.exitVelocity >= 0.74 && roll < 0.48) return makeRoutineFlyResultFromProfile(profile);
  if (profile.exitVelocity >= 0.68 && quality >= 0.38) return makeGapLinerResult(profile);
  if (profile.exitVelocity >= 0.9 && quality >= 0.54 && powerDriveScore >= 0.42) return makeDeepDriveResultFromProfile(profile);
  return makeRoutineFlyResultFromProfile(profile);
}

function decideYellowZoneHitResult(profile, contact, roll) {
  const { quality, sweetSpotScore, yellowZoneBoost = 0 } = contact;
  const excellentContact = profile.exitVelocity >= 0.9 && profile.carry >= 0.82 && quality >= 0.58 && sweetSpotScore >= 0.76;
  const strongContact = profile.exitVelocity >= 0.76 && profile.carry >= 0.62 && quality >= 0.48 && sweetSpotScore >= 0.62;
  const driveContact = profile.exitVelocity >= 0.68 && quality >= 0.44 && sweetSpotScore >= 0.56;
  const hitEase = clamp(
    yellowZoneHitTuning.baseHitEase
      + yellowZoneBoost * yellowZoneHitTuning.boostHitEase
      + quality * yellowZoneHitTuning.qualityHitEase
      + sweetSpotScore * yellowZoneHitTuning.sweetSpotHitEase
      + clamp((profile.exitVelocity - 0.5) / 0.6, 0, 1) * yellowZoneHitTuning.velocityHitEase,
    yellowZoneHitTuning.minHitEase,
    yellowZoneHitTuning.maxHitEase
  );
  if (roll > hitEase) {
    return profile.exitVelocity >= 0.52 && quality >= 0.42
      ? makeGapLinerResult(profile)
      : null;
  }

  if (excellentContact && profile.launchAngle >= 14 && roll > hitEase * yellowZoneHitTuning.deepDriveRollRatio) {
    return makeDeepDriveResultFromProfile(profile);
  }
  if (strongContact && profile.launchAngle >= 12 && roll > hitEase * yellowZoneHitTuning.fenceRollRatio) {
    return makeFenceEdgeFlyResultFromProfile(profile);
  }
  if (excellentContact && profile.launchAngle >= 10) {
    return makeFenceEdgeFlyResultFromProfile(profile);
  }
  if (profile.launchAngle >= 18 && profile.launchAngle <= 48 && roll > hitEase * yellowZoneHitTuning.dropRollRatio) {
    return makeLineDropResultFromProfile(profile);
  }
  if (driveContact && profile.launchAngle >= 12 && profile.launchAngle <= 58 && roll > hitEase * yellowZoneHitTuning.lineLinerRollRatio) {
    return makeLineLinerResultFromProfile(profile);
  }
  if (profile.exitVelocity >= 0.64 && roll > hitEase * yellowZoneHitTuning.linerRollRatio) {
    return makeGapLinerResult(profile);
  }
  if (profile.launchAngle <= 12) return makeGapGrounderResult(profile);
  if (profile.exitVelocity >= 0.58) return makeGapLinerResult(profile);
  return makeFrontDropResultFromProfile(profile);
}

function buildBattedBallProfile(contact) {
  const {
    timeDiff,
    quality,
    timingScore = 0.5,
    barrelScore = 0.5,
    zoneScore,
    plateDistance,
    outsideStrikeZone,
    sweetSpotScore,
    inGoodContactZone,
    yellowZoneBoost = 0
  } = contact;
  const abs = Math.abs(timeDiff);
  const power = getEffectiveBatterPower(activeBatter);
  const meet = activeBatter.meet;
  const powerDriveScore = getPowerDriveScore(power);
  const stuffPressure = ((activePitcher.stuff ?? 5) - 5) * 0.05;
  const chasePenalty = inGoodContactZone ? 0 : (1 - zoneScore) * 0.5 + (outsideStrikeZone ? 0.42 : 0.18);
  const timingPenaltyScale = inGoodContactZone ? 0.45 : yellowZoneBoost > 0 ? 0.68 : 1;
  const timingPenalty = (abs > 260 ? 0.18 : abs > 150 ? 0.08 : 0) * timingPenaltyScale;
  const powerBoost = (power - 5) * 0.035;
  const meetBoost = (meet - 5) * 0.018;
  const pitchQualityBoost = inGoodContactZone ? 0.3 : outsideStrikeZone ? -0.26 - (1 - zoneScore) * 0.16 : -0.08 + yellowZoneBoost * 0.35;
  const outsideZoneDrag = outsideStrikeZone && !inGoodContactZone ? clamp(0.16 + (1 - zoneScore) * 0.18, 0.16, 0.34) : 0;
  const sweetSpotCenterBoost = clamp((sweetSpotScore - 0.82) / 0.18, 0, 1) * 0.1;
  const readableQuality = clamp(quality + powerBoost + meetBoost + pitchQualityBoost + sweetSpotCenterBoost - stuffPressure - chasePenalty - timingPenalty, 0, 1);
  const lowMeetPressure = clamp((10 - meet) / 7, 0, 1);
  const sweetSpotMiss = 1 - sweetSpotScore;
  const timingPull = clamp(timeDiff / 260, -1, 1);
  const yellowDriveScore = yellowZoneBoost > 0
    ? yellowZoneBoost * clamp((quality - 0.42) / 0.36, 0, 1) * clamp((sweetSpotScore - 0.52) / 0.34, 0, 1)
    : 0;
  const qualityDrag = sweetSpotMiss * (0.12 + lowMeetPressure * 0.1) + chasePenalty * 0.25 + stuffPressure + outsideZoneDrag;
  const centerDriveScore = inGoodContactZone
    ? clamp((zoneScore - 0.76) / 0.24, 0, 1) * clamp((quality - 0.12) / 0.42, 0, 1) * clamp((sweetSpotScore - 0.12) / 0.58, 0, 1)
    : 0;
  const exitVelocity = clamp(0.4 + readableQuality * 0.88 + powerBoost * 1.7 + sweetSpotCenterBoost * 0.08 + yellowDriveScore * 0.18 + centerDriveScore * 0.18 - qualityDrag * 0.82, 0.12, 1.75);
  const hardLiftScore = clamp((exitVelocity - 0.78) / 0.58, 0, 1)
    * clamp((quality + barrelScore + timingScore) / 2.15, 0, 1)
    * clamp(zoneScore + (inGoodContactZone ? 0.18 : 0), 0, 1)
    * (0.28 + powerDriveScore * 0.72);
  const hittableLiftBoost = inGoodContactZone ? 11 + sweetSpotScore * 5 : 0;
  const yellowLiftDamping = yellowZoneBoost * yellowZoneHitTuning.liftDamping * (1 - clamp((sweetSpotScore - 0.56) / 0.34, 0, 1));
  const timingLiftPenalty = Math.abs(timingPull) * (inGoodContactZone ? 2.2 : yellowZoneBoost > 0 ? 3.6 : 6);
  const centerDriveLiftAssist = inGoodContactZone
    ? centerDriveScore * (12 + powerDriveScore * 32)
    : 0;
  const yellowDriveLiftAssist = yellowDriveScore * yellowZoneHitTuning.driveLiftAssist;
  const hardContactLiftAssist = hardLiftScore * (inGoodContactZone ? 22 : 14);
  const liftBoost = hittableLiftBoost + readableQuality * 9.4 + sweetSpotScore * 6.6 + sweetSpotCenterBoost * 10 + centerDriveLiftAssist + yellowDriveLiftAssist + hardContactLiftAssist - yellowLiftDamping - outsideZoneDrag * 20;
  const mishitLift = Math.max(0, sweetSpotMiss - 0.6) * 20 + lowMeetPressure * sweetSpotMiss * 5;
  const launchAngle = clamp(
    2
      + sweetSpotScore * 31
      + readableQuality * 23
      + (power - 5) * 2.1
      - timingLiftPenalty
      - Math.max(0, plateDistance - 44) * 0.08
      + liftBoost
      + mishitLift,
    -10,
    68
  );
  const spin = clamp((1 - sweetSpotScore) * 0.58 + Math.abs(timingPull) * 0.3 + (outsideStrikeZone && !inGoodContactZone ? 0.18 : 0), 0, 1.35);
  const carry = clamp(exitVelocity * (1 - spin * 0.18) + (launchAngle > 14 && launchAngle < 44 ? 0.34 : 0) + (power - 5) * 0.05 + sweetSpotCenterBoost * 0.12 + (inGoodContactZone ? 0.18 + centerDriveScore * (0.12 + powerDriveScore * 0.48) : 0) + hardLiftScore * 0.24 + yellowZoneBoost * 0.28 + yellowDriveScore * yellowZoneHitTuning.carryBoost - outsideZoneDrag * 0.42, 0.08, 1.85);
  const direction = getPhysicsHitDirection(timingPull, spin, launchAngle);
  const gapScore = clamp(exitVelocity * 0.42 + sweetSpotScore * 0.28 + zoneScore * 0.2 - spin * 0.22, 0, 1);
  const lineContact = clamp((Math.abs(timingPull) - 0.28) / 0.58, 0, 1);
  const lineQuality = clamp(readableQuality * 0.58 + sweetSpotScore * 0.34 + zoneScore * 0.18 - spin * 0.16, 0, 1);
  const lowDriveContact = clamp((launchAngle - 15) / 16, 0, 1) * clamp((32 - launchAngle) / 13, 0, 1);
  const lineLinerScore = clamp(
    (lineContact * 0.84 + lowDriveContact * 0.32)
      * lineQuality
      * clamp((exitVelocity - 0.54) / 0.5, 0, 1),
    0,
    0.9
  );
  const lineDropScore = clamp(
    0.16 + (0.22 + lineContact * 0.78)
      * (1 - sweetSpotScore * 0.32)
      * clamp((launchAngle - 12) / 16, 0, 1)
      * clamp((1.08 - exitVelocity) / 0.54, 0, 1)
      * (0.72 + readableQuality * 0.32),
    0,
    0.86
  );
  const frontDropScore = clamp(
    0.18 + (0.3 + readableQuality * 0.76)
      * clamp((launchAngle - 11) / 10, 0, 1)
      * clamp((29 - launchAngle) / 13, 0, 1)
      * clamp((1.08 - exitVelocity) / 0.58, 0, 1)
      * (0.68 + (1 - sweetSpotScore) * 0.42)
      * (1 - lineContact * 0.18),
    0,
    0.88
  );
  const lineEdgeScore = clamp(
    lineContact
      * clamp((Math.abs(timingPull) - 0.46) / 0.34, 0, 1)
      * clamp((exitVelocity - 0.5) / 0.62, 0, 1)
      * clamp((28 - launchAngle) / 16, 0, 1)
      * (0.56 + zoneScore * 0.32 + sweetSpotScore * 0.22),
    0,
    0.78
  );
  const fenceLinerScore = clamp(
    clamp((exitVelocity - 0.84) / 0.38, 0, 1)
      * clamp((carry - 0.76) / 0.36, 0, 1)
      * clamp((launchAngle - 14) / 12, 0, 1)
      * clamp((30 - launchAngle) / 14, 0, 1)
      * (0.38 + powerDriveScore * 0.48 + centerDriveScore * 0.24 + yellowDriveScore * 0.22)
      * (outsideStrikeZone && !inGoodContactZone ? 0.34 : 1),
    0,
    0.84
  );
  const chaseFlyScore = clamp(
    readableQuality
      * clamp((launchAngle - 31) / 21, 0, 1)
      * clamp((carry - 0.78) / 0.42, 0, 1)
      * (0.72 + Math.abs(timingPull) * 0.32),
    0,
    0.82
  ) * (outsideStrikeZone && !inGoodContactZone ? 0.34 : 1);
  const toweringFlyScore = clamp(
    readableQuality
      * sweetSpotScore
      * clamp((power - 5.5) / 4.5, 0, 1)
      * clamp((launchAngle - 33) / 23, 0, 1)
      * clamp((carry - 0.86) / 0.44, 0, 1),
    0,
    0.78
  ) * (outsideStrikeZone && !inGoodContactZone ? 0.24 : 1);
  const fenceEdgeFlyScore = clamp(
    0.3 + (0.4 + readableQuality * 0.86)
      * (0.45 + sweetSpotScore * 0.65)
      * clamp((power - 3.8) / 4.2, 0, 1)
      * clamp((launchAngle - 24) / 17, 0, 1)
      * clamp((carry - 0.58) / 0.48, 0, 1)
      * clamp((2.05 - carry) / 1, 0, 1),
    0,
    0.92
  ) * (outsideStrikeZone && !inGoodContactZone ? 0.26 : 1);
  const centerFenceEdgeFlyScore = clamp(fenceEdgeFlyScore + centerDriveScore * powerDriveScore * 0.36, 0, 0.96);
  const yellowFenceEdgeFlyScore = clamp(centerFenceEdgeFlyScore + yellowDriveScore * yellowZoneHitTuning.fenceScoreBoost, 0, 0.96);
  const isFoul = Math.abs(timingPull) > 0.82 && (readableQuality < 0.62 || spin > 0.72);
  return {
    exitVelocity,
    launchAngle,
    direction,
    spin,
    carry,
    gapScore,
    timingPull,
    lineLinerScore,
    lineDropScore,
    frontDropScore,
    lineEdgeScore,
    fenceLinerScore,
    chaseFlyScore,
    toweringFlyScore,
    fenceEdgeFlyScore: yellowZoneBoost > 0 ? yellowFenceEdgeFlyScore : inGoodContactZone ? centerFenceEdgeFlyScore : fenceEdgeFlyScore,
    power: clamp(exitVelocity * 0.74 + carry * 0.52, 0.08, deepDriveTuning.maxPower),
    readableQuality,
    sweetSpotCenterBoost,
    outsideZoneDrag,
    pitchQualityBoost,
    yellowZoneBoost,
    isFoul
  };
}

function getEffectiveBatterPower(batter = activeBatter) {
  return (batter?.power ?? 5) * effectiveBatterPowerScale;
}

function getPowerDriveScore(power = getEffectiveBatterPower(activeBatter)) {
  return clamp((power - 3) / 7, 0, 1);
}

function getPullSide() {
  return activeBatterSide === "R" ? -1 : 1;
}

function getOppositeFieldSide() {
  return -getPullSide();
}

function getTimingSideFromPullValue(timingPull, threshold = 0.08) {
  if (timingPull < -threshold) return getPullSide();
  if (timingPull > threshold) return getOppositeFieldSide();
  return 0;
}

function getTimingSideFromTimeDiff(timeDiff, threshold = 70) {
  if (timeDiff < -threshold) return getPullSide();
  if (timeDiff > threshold) return getOppositeFieldSide();
  return 0;
}

function getPhysicsHitDirection(timingPull, spin, launchAngle) {
  const timingSide = getTimingSideFromPullValue(timingPull);
  const timingStrength = clamp(Math.abs(timingPull), 0, 1);
  const sideBias = timingSide * (0.18 + timingStrength * 0.86);
  const centerDriftScale = 1 - timingStrength * 0.72;
  const centerDrift = (randomBetween(-0.16, 0.16) + spin * randomBetween(-0.12, 0.12)) * centerDriftScale;
  const vertical = launchAngle < 8 ? randomBetween(-0.78, -0.6) : randomBetween(-1.08, -0.78);
  return normalize({
    x: sideBias + centerDrift,
    y: vertical
  });
}

function makePopupFlyResultFromProfile(profile) {
  return { ...makePopupFlyResult(clamp(profile.power, 0.3, 0.52)), direction: profile.direction, battedProfile: profile };
}

function makeRoutineFlyResultFromProfile(profile) {
  return { ...makeRoutineFlyResult(clamp(profile.power, 0.52, 0.76)), direction: profile.direction, battedProfile: profile };
}

function makeLineLinerResultFromProfile(profile) {
  return { label: hitLabels.lineLiner, kind: "hit", power: clamp(profile.power, 0.78, 0.98), scoreType: "double", lineLiner: true, direction: getLineBallDirection(profile, 0.82), battedProfile: profile };
}

function makeLineDropResultFromProfile(profile) {
  return { label: hitLabels.lineDrop, kind: "hit", power: clamp(profile.power, 0.54, 0.72), scoreType: "single", lineDrop: true, direction: getLineBallDirection(profile, 0.62), battedProfile: profile };
}

function makeFenceLinerResultFromProfile(profile) {
  const side = getTimingSideFromPullValue(profile.timingPull ?? 0, 0.28);
  return { label: hitLabels.fenceLiner, kind: "hit", power: clamp(profile.power + profile.carry * 0.24, 1.02, 1.46), scoreType: "single", fenceLiner: true, direction: normalize({ x: side * randomBetween(0.04, 0.22) + randomBetween(-0.1, 0.1), y: -1 }), battedProfile: profile };
}

function makeFrontDropResultFromProfile(profile) {
  const timingSide = getTimingSideFromPullValue(profile.timingPull ?? 0, 0.06);
  const sideDrift = timingSide
    ? timingSide * randomBetween(0.18, 0.38)
    : randomBetween(-0.18, 0.18);
  return { label: hitLabels.frontDrop, kind: "hit", power: clamp(profile.power, 0.48, 0.64), scoreType: "single", frontDrop: true, direction: normalize({ x: sideDrift, y: -1 }), battedProfile: profile };
}

function makeLineEdgeResultFromProfile(profile) {
  return { label: hitLabels.lineEdge, kind: "hit", power: clamp(profile.power, 0.62, 0.92), scoreType: "single", lineEdge: true, direction: getLineBallDirection(profile, 0.96), battedProfile: profile };
}

function makeChaseFlyResultFromProfile(profile) {
  const sideDrift = clamp(Math.abs(profile.timingPull ?? 0) * 0.34 + randomBetween(0.08, 0.22), 0.12, 0.52);
  const side = getPulledHitSide(profile.timingPull ?? 0);
  return { label: hitLabels.chaseFly, kind: "hit", power: clamp(profile.power + profile.carry * 0.18, 0.9, 1.24), scoreType: "double", chaseFly: true, direction: normalize({ x: side * sideDrift, y: -1 }), battedProfile: profile };
}

function makeToweringFlyResultFromProfile(profile) {
  const side = getPulledHitSide(profile.timingPull ?? 0);
  const centerDrift = randomBetween(-0.18, 0.18);
  const sideDrift = Math.abs(profile.timingPull ?? 0) > 0.28 ? side * randomBetween(0.12, 0.34) : centerDrift;
  return { label: hitLabels.toweringFly, kind: "out", power: clamp(profile.power + profile.carry * 0.36, 1.08, deepDriveTuning.maxPower), toweringFly: true, direction: normalize({ x: sideDrift, y: -1 }), battedProfile: profile };
}

function makeFenceEdgeFlyResultFromProfile(profile) {
  const side = getTimingSideFromPullValue(profile.timingPull ?? 0, 0.42);
  const driveFloor = 1.02 + getPowerDriveScore() * 0.26;
  return { label: hitLabels.fenceEdgeFly, kind: "hit", power: clamp(profile.power + profile.carry * 0.42, driveFloor, 1.82), scoreType: "single", fenceEdgeFly: true, direction: normalize({ x: side * randomBetween(0.04, 0.16) + randomBetween(-0.07, 0.07), y: -1 }), battedProfile: profile };
}

function makeDeepDriveResultFromProfile(profile) {
  const driveFloor = 1.18 + getPowerDriveScore() * 0.32;
  return { label: deepDriveLabel, kind: "hit", power: clamp(profile.power + profile.carry * 0.5, driveFloor, deepDriveTuning.maxPower), scoreType: "single", deepDrive: true, direction: profile.direction, battedProfile: profile };
}

function getPulledHitSide(timingPull) {
  return timingPull < 0 ? getPullSide() : getOppositeFieldSide();
}

function getLineBallDirection(profile, sideStrength = 0.76) {
  const side = getPulledHitSide(profile.timingPull ?? 0);
  return normalize({
    x: side * randomBetween(sideStrength, sideStrength + 0.16),
    y: -randomBetween(0.78, 0.96)
  });
}

function makeHitResult(scoreType, power) {
  return { label: hitLabels[scoreType], kind: "hit", power, scoreType };
}

function makeDeepDriveResult(contact, bonus = 0) {
  const batterPower = getEffectiveBatterPower(activeBatter);
  const drivePower = clamp(
    deepDriveTuning.minPower
      + Math.max(0, batterPower - deepDriveTuning.minPowerHitter) * deepDriveTuning.powerStep
      + contact.quality * deepDriveTuning.qualityBonus
      + contact.sweetSpotScore * deepDriveTuning.sweetSpotBonus
      - Math.abs(contact.timeDiff) / deepDriveTuning.timingPenaltyScale
      + bonus,
    0.9,
    deepDriveTuning.maxPower
  );
  return { label: deepDriveLabel, kind: "hit", power: drivePower, scoreType: "single", deepDrive: true };
}

function getProfileResultPower(profileOrPower) {
  return typeof profileOrPower === "number" ? profileOrPower : profileOrPower?.power ?? 0.62;
}

function getProfileResultSource(profileOrPower) {
  return typeof profileOrPower === "number" ? null : profileOrPower;
}

function getProfileResultDirection(profileOrPower) {
  return typeof profileOrPower === "number" ? null : profileOrPower?.direction ?? null;
}

function makeGapGrounderResult(profileOrPower) {
  const power = getProfileResultPower(profileOrPower);
  return { label: hitLabels.grounder, kind: "hit", power: Math.max(power, 0.62), scoreType: "single", grounderGap: true, direction: getProfileResultDirection(profileOrPower), battedProfile: getProfileResultSource(profileOrPower) };
}

function makeGapLinerResult(profileOrPower) {
  const power = getProfileResultPower(profileOrPower);
  return { label: hitLabels.single, kind: "hit", power: Math.min(Math.max(power, 0.84), 0.855), scoreType: "single", gapLiner: true, direction: getProfileResultDirection(profileOrPower), battedProfile: getProfileResultSource(profileOrPower) };
}

function makeFrontDropResult(profileOrPower) {
  const power = getProfileResultPower(profileOrPower);
  return { label: hitLabels.frontDrop, kind: "hit", power: clamp(power, 0.52, 0.66), scoreType: "single", frontDrop: true, direction: getProfileResultDirection(profileOrPower), battedProfile: getProfileResultSource(profileOrPower) };
}

function makePopupFlyResult(power) {
  return { label: hitLabels.popup, kind: "out", power: clamp(power, 0.3, 0.5), popupFly: true };
}

function makeRoutineFlyResult(power) {
  return { label: hitLabels.routineFly, kind: "out", power: clamp(power, 0.52, 0.72), routineFly: true };
}

function finishPitch(label, kind, power = 0, timeDiff = 0, hitDirection = null) {
  isPitching = false;
  ball.inPitch = false;
  pendingPitch = null;
  autoPitchTimer = Number.POSITIVE_INFINITY;
  clearPitchControlKeys();
  if (kind === "strike") {
    count.strikes += 1;
    const suffix = shouldShowTimingSuffix(label) ? `: ${timingSuffix(timeDiff)}` : "";
    message = `${label}${suffix}`;
    showEffect(label, "#f9f871");
    ball.active = false;
  } else if (kind === "foul") {
    if (count.strikes < 2) count.strikes += 1;
    message = `ファウル: ${timingSuffix(timeDiff)}`;
    showEffect("ファウル", "#fff2a8");
    launchHitBall(power, timeDiff, true, hitDirection);
  } else if (kind === "ball") {
    count.balls += 1;
    message = "ボール";
    showEffect("ボール", "#aee7ff");
    ball.active = false;
  } else if (kind === "hbp") {
    const runs = advanceRunners("walk", activeBatter);
    message = runs > 0 ? `デッドボール: ${runs}点` : "デッドボール";
    showEffect(runs > 0 ? `デッドボール +${runs}` : "デッドボール", "#ff8f70");
    hbpPose.active = true;
    hbpPose.startTime = performance.now();
    ball.active = false;
    resetCountOnly();
    advanceBattingOrder();
    setMatchup();
  } else if (kind === "out") {
    startDefensePlay(label, kind, power, timeDiff, hitDirection);
    return;
  } else if (kind === "hit") {
    startDefensePlay(label, kind, power, timeDiff, hitDirection);
    return;
  }
  checkCountEnd();
}

function getScoringHitType(outcome) {
  if (!outcome || !scoringHitTypes.has(outcome.scoreType)) return "single";
  return outcome.scoreType;
}

function getHitLabelByScoreType(scoreType) {
  return hitLabels[scoreType] || hitLabels.single;
}

function advanceRunners(type, batterInfo, battedBall = null, outcome = null) {
  let runs = 0;
  if (type === "walk") {
    if (bases.first && bases.second && bases.third) runs += 1;
    if (bases.first && bases.second) bases.third = bases.second;
    if (bases.first) bases.second = bases.first;
    bases.first = makeBaseRunner(batterInfo);
    scores[battingTeam] += runs;
    playScoringCheer(runs);
    return runs;
  }

  const steps = type === "homer" ? 4 : type === "triple" ? 3 : type === "double" ? 2 : 1;
  const runners = [
    { base: 3, runner: bases.third },
    { base: 2, runner: bases.second },
    { base: 1, runner: bases.first },
    { base: 0, runner: makeBaseRunner(batterInfo) }
  ].filter((entry) => entry.runner);
  bases = createEmptyBases();
  runners.forEach(({ base, runner }) => {
    const nextBase = base + steps + getExtraRunnerAdvance(base, type, runner, battedBall, outcome);
    if (nextBase >= 4) {
      runs += 1;
    } else if (nextBase === 3) {
      bases.third = runner;
    } else if (nextBase === 2) {
      bases.second = runner;
    } else if (nextBase === 1) {
      bases.first = runner;
    }
  });
  scores[battingTeam] += runs;
  playScoringCheer(runs);
  return runs;
}

function getExtraRunnerAdvance(base, type, runner, battedBall, outcome) {
  if (!runner || !battedBall || type === "walk" || type === "homer" || type === "triple") return 0;
  if (base === 2 && type === "single" && shouldRunnerScoreFromSecondOnSingle(runner, battedBall, outcome)) return 1;
  if (base === 1 && type === "double" && shouldRunnerScoreFromFirstOnDouble(runner, battedBall, outcome)) return 1;
  return 0;
}

function createDefenseBaseRunnerAnimations(outcome, battedBall, throwState = null, fielder = null, fieldingTarget = null) {
  return [
    createDefenseBaseRunner("first", bases.first, outcome, battedBall, throwState, fielder, fieldingTarget),
    createDefenseBaseRunner("second", bases.second, outcome, battedBall, throwState, fielder, fieldingTarget),
    createDefenseBaseRunner("third", bases.third, outcome, battedBall, throwState, fielder, fieldingTarget)
  ].filter(Boolean);
}

function createDefenseBaseRunner(baseName, runnerInfo, outcome, battedBall, throwState = null, fielder = null, fieldingTarget = null) {
  if (!runnerInfo) return null;
  const startBase = baseIndexByName[baseName];
  const tagUp = shouldTagUpFromThird(baseName, runnerInfo, outcome, battedBall, fielder, fieldingTarget);
  const advanceType = tagUp ? "tagup" : getDefenseBaseRunnerAdvanceType(outcome, throwState);
  const nextBase = advanceType
    ? Math.min(4, startBase + getBaseAdvanceSteps(advanceType) + (advanceType === "tagup" ? 0 : getExtraRunnerAdvance(startBase, advanceType, runnerInfo, battedBall, outcome)))
    : startBase;
  const route = createBaseRunnerRoute(startBase, nextBase);
  const speed = getDefenseBaseRunnerSpeed(runnerInfo);
  const distance = getRunnerRouteDistance(route);
  return {
    ...runnerInfo,
    startBase: baseName,
    targetBase: nextBase >= 4 ? "home" : baseNameByIndex[nextBase],
    tagUp,
    scored: nextBase >= 4,
    route,
    x: route[0].x,
    y: route[0].y,
    speed,
    arrivalTime: distance > 0 ? distance / speed : 0,
    arrived: distance === 0
  };
}

function getDefenseBaseRunnerAdvanceType(outcome, throwState = null) {
  if (!outcome) return null;
  if (outcome.kind === "out" || (outcome.caught && !outcome.needsThrow)) return null;
  if (outcome.kind === "force") {
    if (!throwState?.safe) return null;
    return throwState.targetBase === "second" ? "double" : "single";
  }
  return getScoringHitType(outcome);
}

function getBaseAdvanceSteps(type) {
  return type === "homer" ? 4 : type === "triple" ? 3 : type === "double" ? 2 : type === "single" || type === "tagup" ? 1 : 0;
}

function shouldTagUpFromThird(baseName, runnerInfo, outcome, battedBall, fielder = null, fieldingTarget = null) {
  if (baseName !== "third" || !runnerInfo || !outcome || !battedBall || !fielder || !fieldingTarget) return false;
  if (outcome.kind !== "out" || !outcome.caught || outcome.needsThrow) return false;
  if (fielder.role === "P" || battedBall.isGrounder || battedBall.isLiner || battedBall.isPopupFly) return false;
  const catchDepth = getFenceDistance(fieldingTarget);
  if (catchDepth < defenseField.fenceDistance * 0.42) return false;
  const runnerTime = getRunnerRouteDistance(createBaseRunnerRoute(3, 4)) / getDefenseBaseRunnerSpeed(runnerInfo);
  const throwDistance = Math.hypot(defenseField.bases.home.x - fieldingTarget.x, defenseField.bases.home.y - fieldingTarget.y);
  const throwProfile = getThrowProfile(fielder, throwDistance);
  const defenseTime = (outcome.fieldingTime ?? battedBall.ballTime ?? 0) + defenseThrowSetSeconds + throwProfile.throwTime;
  return runnerTime + getTagUpRiskMargin(runnerInfo, fielder, catchDepth) < defenseTime;
}

function getTagUpRiskMargin(runnerInfo, fielder, catchDepth) {
  const runnerBoost = ((runnerInfo.run ?? 5) - 5) * 0.025;
  const armPenalty = ((fielder?.arm ?? 5) - 5) * 0.035;
  const depthBonus = clamp((catchDepth - defenseField.fenceDistance * 0.42) / (defenseField.fenceDistance * 0.38), 0, 1) * 0.14;
  return clamp(0.22 - runnerBoost + armPenalty - depthBonus, 0.08, 0.34);
}

function createBaseRunnerRoute(startBase, nextBase) {
  const route = [];
  const clampedNext = Math.min(4, Math.max(startBase, nextBase));
  for (let base = startBase; base <= clampedNext; base += 1) {
    route.push({ ...getDefenseBasePoint(base) });
  }
  return route.length ? route : [{ ...getDefenseBasePoint(startBase) }];
}

function getDefenseBasePoint(base) {
  if (base >= 4 || base <= 0) return defenseField.bases.home;
  return defenseField.bases[baseNameByIndex[base]];
}

function getDefenseBaseRunnerSpeed(runnerInfo) {
  return getRunnerSpeed(runnerInfo);
}

function getRunnerSpeed(runnerInfo) {
  return (runnerSpeedBaseRun + (runnerInfo?.run ?? 5)) * runnerSpeedUnit;
}

function shouldRunnerScoreFromSecondOnSingle(runner, battedBall, outcome) {
  return getAggressiveRunnerScore(runner, battedBall, outcome) >= 0.78;
}

function shouldRunnerScoreFromFirstOnDouble(runner, battedBall, outcome) {
  return getAggressiveRunnerScore(runner, battedBall, outcome) >= 0.92;
}

function getAggressiveRunnerScore(runner, battedBall, outcome) {
  const fieldingPoint = battedBall.wallReboundTarget || battedBall.target || defenseField.bases.second;
  const depthRatio = clamp(getFenceDistance(fieldingPoint) / defenseField.fenceDistance, 0, 1);
  const runnerBoost = ((runner.run ?? 5) - 5) * 0.07;
  const ballTimeBoost = clamp((battedBall.ballTime ?? 0.8) / 4, 0, 0.28);
  const trajectoryBoost = battedBall.wallHit || battedBall.groundRuleDouble
    ? 0.28
    : battedBall.isLiner ? 0.12
    : battedBall.isGrounder ? 0.06
    : 0.16;
  const powerBoost = clamp((battedBall.power ?? 0.5) * 0.12, 0, 0.24);
  const shortHitPenalty = outcome?.scoreType === "single" && depthRatio < 0.38 ? 0.18 : 0;
  return depthRatio * 0.78 + runnerBoost + ballTimeBoost + trajectoryBoost + powerBoost - shortHitPenalty;
}

function makeBaseRunner(player) {
  return player ? { id: player.id, name: player.name, run: player.run ?? 5 } : null;
}

function formatRuns(runs) {
  return runs > 0 ? `${runs}点` : "得点なし";
}

function createHomeRunFireworks(battedBall) {
  if (!battedBall?.fenceOver) return null;
  const center = getFenceCenter();
  const direction = normalize({
    x: (battedBall.target?.x ?? field.centerX) - center.x,
    y: (battedBall.target?.y ?? center.y - defenseField.fenceDistance) - center.y
  });
  const side = normalize({ x: -direction.y, y: direction.x });
  const colors = ["#fff2a8", "#ff6f61", "#aee7ff", "#d6f2df", "#ffb3f0"];
  const bursts = Array.from({ length: 10 }, (_, burstIndex) => {
    const standDistance = defenseField.fenceDistance + randomBetween(70, 260);
    const lateral = randomBetween(-420, 420);
    const origin = {
      x: center.x + direction.x * standDistance + side.x * lateral,
      y: center.y + direction.y * standDistance + side.y * lateral
    };
    const sparkCount = 22 + Math.floor(randomBetween(0, 13));
    return {
      origin,
      delay: burstIndex * 0.24 + randomBetween(0, 0.18),
      color: colors[burstIndex % colors.length],
      sparks: Array.from({ length: sparkCount }, () => {
        const angle = randomBetween(0, Math.PI * 2);
        const speed = randomBetween(82, 190);
        return {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
          size: randomBetween(4.5, 8.5)
        };
      })
    };
  });
  return {
    startDelay: Math.max(0.15, battedBall.ballTime ?? 0.7),
    duration: 3,
    bursts
  };
}

function startDefensePlay(label, kind, power, timeDiff, hitDirection = null) {
  const direction = hitDirection || getHitDirection(timeDiff, false);
  const battedBall = buildBattedBall(power, direction, label);
  const fielders = getDefensiveLineup(fieldingTeam()).map((fielder) => ({ ...fielder, currentX: fielder.x, currentY: fielder.y }));
  let chosenFielder = chooseDefenseFielder(fielders, battedBall);
  const runner = createBatterRunner(activeBatter);
  let outcome = resolveDefenseOutcome(chosenFielder, battedBall, runner);
  let fieldingTarget = getDefenseFieldingTarget(battedBall, outcome);
  if (shouldOutfielderHandleFieldingTarget(battedBall, fieldingTarget) && chosenFielder.role === "P") {
    chosenFielder = chooseDefenseFielder(
      fielders.filter((fielder) => fielder.role !== "P"),
      { ...battedBall, target: fieldingTarget, landingDistance: Math.max(battedBall.landingDistance ?? 0, getFenceDistance(fieldingTarget)) }
    );
    outcome = resolveDefenseOutcome(chosenFielder, battedBall, runner);
    fieldingTarget = getDefenseFieldingTarget(battedBall, outcome);
  }
  const fenceOutcome = resolveFenceBoundaryOutcome(battedBall, outcome, fieldingTarget);
  if (fenceOutcome) {
    outcome = fenceOutcome.outcome;
    fieldingTarget = fenceOutcome.target;
  } else {
    const grounderPickup = resolveGrounderPickupThrow(chosenFielder, battedBall, outcome, fieldingTarget, runner);
    if (grounderPickup) {
      outcome = grounderPickup.outcome;
      fieldingTarget = grounderPickup.target;
    }
  }
  outcome = alignFieldingTimeWithBallArrival(battedBall, outcome, fieldingTarget, chosenFielder);
  setBatterRunnerDestination(runner, getBatterRunnerTargetBase(outcome, battedBall, fieldingTarget, chosenFielder, runner));
  outcome = createThrowPlayForFieldedHit(chosenFielder, battedBall, outcome, fieldingTarget, runner);
  const throwState = createThrowState(chosenFielder, fieldingTarget, outcome, runner);
  const baseRunners = createDefenseBaseRunnerAnimations(outcome, battedBall, throwState, chosenFielder, fieldingTarget);

  gamePhase = "defense";
  isPitching = false;
  pendingPitch = null;
  autoPitchTimer = Number.POSITIVE_INFINITY;
  resetSwing();
  ball.active = true;
  ball.inPitch = false;
  ball.crossedPlate = true;
  ball.wasHit = true;
  ball.trail = [];
  ball.x = battedBall.origin.x;
  ball.y = battedBall.origin.y;
  ball.vx = 0;
  ball.vy = 0;
  ball.radius = 8;

  defenseState = {
    ...createDefenseState(),
    active: true,
    startTime: performance.now(),
    duration: getDefenseDuration(battedBall, outcome, runner, throwState, fieldingTarget),
    fielders,
    chosenFielder,
    target: fieldingTarget,
    landingTarget: battedBall.target,
    origin: battedBall.origin,
    ballPath: direction,
    battedBall,
    outcome,
    runner,
    baseRunners,
    throw: throwState,
    homeRunFireworks: createHomeRunFireworks(battedBall),
    resolved: false
  };

  message = battedBall.fenceOver
    ? "大きな当たり、フェンス際へ"
    : battedBall.wallHit
      ? "高いフェンスへ一直線"
    : `${chosenFielder.role} が打球へ走る`;
}

function getDefensiveLineup(team) {
  const template = defensiveLineups[team];
  const pitcherInfo = selected[team].pitcher;
  const fieldersByRole = new Map(selected[team].batters.map((entry) => [entry.role, entry.player]));
  return template.map((fielder) => {
    if (fielder.role === "P") {
      return clampFielderInsideFence({
        ...fielder,
        name: pitcherInfo.name,
        speed: pitcherInfo.fielding ?? 5,
        fielding: pitcherInfo.fielding ?? 5,
        arm: 5
      });
    }
    const player = fieldersByRole.get(fielder.role) || selected[team].batters[0].player;
    return clampFielderInsideFence({
      ...fielder,
      name: player.name,
      speed: player.fielding ?? 5,
      fielding: player.fielding ?? 5,
      arm: player.arm ?? 5
    });
  });
}

function getDefenseDuration(battedBall, outcome, runner, throwState, fieldingTarget = null) {
  if (battedBall.fenceOver) return Math.max(3600, ((battedBall.ballTime ?? 0.7) + 3.25) * 1000);
  const runnerSeconds = runner ? runner.arrivalTime : 0;
  const throwSeconds = throwState ? throwState.endTime + 0.55 : 0;
  const fieldingSeconds = (outcome.fieldingTime ?? battedBall.ballTime) + (outcome.caught ? 0.75 : 1.45);
  const rollSeconds = (!outcome.caught || outcome.needsThrow) && fieldingTarget
    ? battedBall.ballTime + getDefenseRollDuration(battedBall, battedBall.target, fieldingTarget) + 0.45
    : 0;
  return clamp(Math.max(fieldingSeconds, runnerSeconds, throwSeconds, rollSeconds) * 1000, 1900, 12500);
}

function alignFieldingTimeWithBallArrival(battedBall, outcome, fieldingTarget, fielder = null) {
  if (!outcome?.needsThrow || !battedBall || !fieldingTarget) return outcome;
  const visualArrivalTime = getDefenseBallFieldingArrivalTime(battedBall, fieldingTarget);
  const fielderArrivalTime = getDefenseFielderArrivalTime(fielder, fieldingTarget);
  const fieldingTime = Math.max(outcome.fieldingTime ?? battedBall.ballTime, visualArrivalTime, fielderArrivalTime);
  return fieldingTime === outcome.fieldingTime ? outcome : { ...outcome, fieldingTime };
}

function getDefenseFielderArrivalTime(fielder, fieldingTarget) {
  if (!fielder || !fieldingTarget) return 0;
  const distance = Math.hypot(fieldingTarget.x - fielder.x, fieldingTarget.y - fielder.y);
  return defenseField.fielderReactionDelay + distance / getFielderSpeed(fielder);
}

function getDefenseBallFieldingArrivalTime(battedBall, fieldingTarget) {
  const landing = battedBall.target;
  const rollDistance = Math.hypot(fieldingTarget.x - landing.x, fieldingTarget.y - landing.y);
  if (rollDistance < 8) return battedBall.ballTime ?? 0;
  return (battedBall.ballTime ?? 0)
    + getDefenseRollDuration(battedBall, landing, fieldingTarget);
}

function createBatterRunner(batterInfo) {
  const start = { ...defenseField.bases.home };
  const destination = { ...defenseField.bases.first };
  const speed = getRunnerSpeed(batterInfo);
  const route = [start, destination];
  const distance = getRunnerRouteDistance(route);
  return {
    start,
    destination,
    route,
    currentBase: "home",
    returnBase: "home",
    routeStartTime: 0,
    routeDuration: distance / speed,
    targetBase: "first",
    baseLabel: "一塁",
    x: start.x,
    y: start.y,
    speed,
    arrivalTime: distance / speed,
    arrived: false
  };
}

function getBatterRunnerTargetBase(outcome, battedBall = null, fieldingTarget = null, fielder = null, runner = null) {
  if (outcome?.targetBase) return outcome.targetBase;
  if (!outcome || outcome.kind === "force" || outcome.kind === "out") return "first";
  return "first";
}

function shouldUseRunnerPositionForOutfieldThrow(outcome, battedBall, fieldingTarget, fielder, runner) {
  if (!outcome || outcome.caught || !battedBall || !fieldingTarget || !fielder || !runner) return false;
  if (battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  return fielder.role !== "P" && isDeepOutfieldBall(battedBall) && (outcome.scoreType || outcome.kind === "single" || outcome.kind === "double");
}

function getFieldingTimeForThrowDecision(outcome, battedBall, fieldingTarget, fielder) {
  return Math.max(
    outcome?.fieldingTime ?? battedBall?.ballTime ?? 0,
    getDefenseBallFieldingArrivalTime(battedBall, fieldingTarget),
    getDefenseFielderArrivalTime(fielder, fieldingTarget)
  );
}

function hasBatterRunnerReachedFirstAtFielding(outcome, battedBall, fieldingTarget, fielder, runner) {
  return getFieldingTimeForThrowDecision(outcome, battedBall, fieldingTarget, fielder) >= runner.arrivalTime;
}

function shouldHoldBatterRunnerAtFirstOnLongHit(outcome, battedBall, fieldingTarget, fielder, runner) {
  if (!outcome || outcome.caught || !battedBall || !fieldingTarget || !fielder || !runner) return false;
  if (battedBall.fenceOver || battedBall.groundRuleDouble) return false;
  if (fielder.role === "P") return false;
  if (!isDeepOutfieldBall(battedBall) && !battedBall.wallHit && !isAtOutfieldFence(fieldingTarget, 28)) return false;
  return !canBatterRunnerBeatThrowToSecond(outcome, battedBall, fieldingTarget, fielder, runner);
}

function canBatterRunnerBeatThrowToSecond(outcome, battedBall, fieldingTarget, fielder, runner) {
  if (!outcome || !battedBall || !fieldingTarget || !fielder || !runner) return false;
  const runnerToSecond = { ...runner };
  setBatterRunnerDestination(runnerToSecond, "second");
  const fieldingTime = getFieldingTimeForThrowDecision(outcome, battedBall, fieldingTarget, fielder);
  const distanceToSecond = Math.hypot(defenseField.bases.second.x - fieldingTarget.x, defenseField.bases.second.y - fieldingTarget.y);
  const throwProfileToSecond = getThrowProfile(fielder, distanceToSecond);
  const defenseTimeToSecond = fieldingTime + defenseThrowSetSeconds + throwProfileToSecond.throwTime;
  return runnerToSecond.arrivalTime + batterRunnerSecondBaseRiskMargin < defenseTimeToSecond;
}

function shouldBatterRunnerTrySecond(outcome, battedBall, fieldingTarget, fielder, runner) {
  if (!outcome || outcome.caught || !battedBall || !fieldingTarget || !fielder || !runner) return false;
  if (outcome.scoreType !== "single" && outcome.kind !== "single") return false;

  const ballDepth = getFenceDistance(fieldingTarget);
  const longHit = outcome.kind === "double"
    || battedBall.wallHit
    || battedBall.groundRuleDouble
    || battedBall.isDeep
    || battedBall.landingDistance > defenseField.doubleDistance * 0.58
    || ballDepth > defenseField.fenceDistance * 0.58;

  return longHit && canBatterRunnerBeatThrowToSecond(outcome, battedBall, fieldingTarget, fielder, runner);
}

function createThrowPlayForFieldedHit(fielder, battedBall, outcome, fieldingTarget, runner) {
  if (!outcome || outcome.caught || outcome.needsThrow || !runner) return outcome;
  if (battedBall?.fenceOver || battedBall?.groundRuleDouble) return outcome;
  const isFieldedHit = ["single", "double"].includes(outcome.kind) || scoringHitTypes.has(outcome.scoreType);
  const isInPlayFenceBall = fieldingTarget && isAtOutfieldFence(fieldingTarget);
  if (!isFieldedHit && !(fielder.role !== "P" && (isDeepOutfieldBall(battedBall) || isInPlayFenceBall))) return outcome;
  return {
    ...outcome,
    kind: "force",
    label: `${fielder.role} 送球`,
    caught: true,
    needsThrow: true,
    fieldingTime: Math.max(
      outcome.fieldingTime ?? battedBall?.ballTime ?? 0,
      getDefenseBallFieldingArrivalTime(battedBall, fieldingTarget),
      getDefenseFielderArrivalTime(fielder, fieldingTarget)
    )
  };
}

function isAtOutfieldFence(point, tolerance = 3) {
  return point && point.y < getFenceCenter().y && getFenceDistance(point) >= defenseField.fenceDistance - tolerance;
}

function setBatterRunnerDestination(runner, targetBase) {
  if (!runner) return;
  const route = createBatterRunnerRoute(runner, targetBase);
  const destination = { ...route[route.length - 1] };
  const routeStartTime = runner.routeStartTime ?? 0;
  const routeDuration = getRunnerRouteDistance(route) / runner.speed;
  runner.start = { ...route[0] };
  runner.destination = destination;
  runner.route = route;
  runner.targetBase = targetBase;
  runner.baseLabel = getBaseLabel(targetBase);
  runner.routeStartTime = routeStartTime;
  runner.routeDuration = routeDuration;
  runner.arrivalTime = routeStartTime + routeDuration;
  runner.arrived = false;
}

function createBatterRunnerRoute(runner, targetBase) {
  const targetIndex = getBatterRunnerTargetIndex(targetBase);
  const currentBase = runner.currentBase ?? "home";
  const currentIndex = getRunnerBaseIndex(currentBase);
  const atHomeStart = currentBase === "home"
    && Math.hypot((runner.x ?? defenseField.bases.home.x) - defenseField.bases.home.x, (runner.y ?? defenseField.bases.home.y) - defenseField.bases.home.y) < 1;
  if (atHomeStart && targetIndex > 0) {
    return createBaseRunnerRoute(0, targetIndex);
  }
  if ((runner.arrived || runner.routeStartTime === undefined) && currentIndex >= 0 && targetIndex > currentIndex) {
    return createBaseRunnerRoute(currentIndex, targetIndex);
  }
  if (!runner.arrived && targetIndex > currentIndex) {
    const route = [{ x: runner.x, y: runner.y }];
    for (let base = Math.max(1, currentIndex + 1); base <= targetIndex; base += 1) {
      route.push({ ...getDefenseBasePoint(base) });
    }
    return route;
  }
  return [{ x: runner.x, y: runner.y }, getDefenseBasePointByName(targetBase)];
}

function getRunnerBaseIndex(baseName) {
  return baseIndexByName[baseName] ?? (baseName === "home" ? 0 : -1);
}

function getBatterRunnerTargetIndex(baseName) {
  return baseName === "home" ? 4 : getRunnerBaseIndex(baseName);
}

function getDefenseBasePointByName(baseName) {
  return { ...(defenseField.bases[baseName] || defenseField.bases.first) };
}

function getBaseLabel(baseName) {
  return baseName === "home" ? "本塁" : baseName === "third" ? "三塁" : baseName === "second" ? "二塁" : "一塁";
}

function getNextBatterRunnerBase(baseName) {
  return baseName === "first" ? "second" : baseName === "second" ? "third" : baseName === "third" ? "home" : null;
}

function getPreviousBatterRunnerBase(baseName) {
  return baseName === "home" ? "third" : baseName === "third" ? "second" : baseName === "second" ? "first" : baseName === "first" ? "home" : null;
}

function setBatterRunnerManualDestination(runner, targetBase, elapsedSeconds) {
  if (!runner || !targetBase) return;
  if (!canBatterRunnerTargetBase(runner, targetBase)) return;
  runner.currentBase = runner.arrived ? runner.targetBase : runner.currentBase;
  runner.returnBase = runner.arrived ? runner.currentBase : runner.returnBase;
  runner.arrived = false;
  runner.routeStartTime = elapsedSeconds;
  runner.route = createBatterRunnerRoute(runner, targetBase);
  runner.destination = { ...runner.route[runner.route.length - 1] };
  runner.targetBase = targetBase;
  runner.baseLabel = getBaseLabel(targetBase);
  runner.routeDuration = getRunnerRouteDistance(runner.route) / runner.speed;
  runner.arrivalTime = elapsedSeconds + runner.routeDuration;
}

function canBatterRunnerTargetBase(runner, targetBase) {
  if (!runner || !targetBase) return false;
  if (targetBase === "first") return runner.currentBase !== "home" || runner.targetBase !== "first";
  const targetIndex = getBatterRunnerTargetIndex(targetBase);
  const currentIndex = getRunnerBaseIndex(runner.currentBase ?? "home");
  return targetIndex > currentIndex || runner.targetBase === targetBase || !runner.arrived;
}

function handleBatterRunnerBaseCommand(targetBase) {
  if (!canControlBatterRunner()) return;
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  updateBatterRunner(elapsedSeconds);
  const runner = defenseState.runner;
  if (!canBatterRunnerTargetBase(runner, targetBase)) return;
  setBatterRunnerManualDestination(runner, targetBase, elapsedSeconds);
  retargetDefenseThrowToBatterRunner(elapsedSeconds);
  message = `${getBaseLabel(targetBase)}へ走塁指示`;
}

function canControlBatterRunner() {
  return gamePhase === "defense"
    && isPlayerBatting()
    && defenseState.active
    && !defenseState.resolved
    && defenseState.runner
    && !defenseState.battedBall?.fenceOver;
}

function retargetDefenseThrowToBatterRunner(elapsedSeconds = 0) {
  const runner = defenseState.runner;
  if (!runner || !defenseState.chosenFielder || !defenseState.target || defenseState.outcome?.kind === "homer") return;
  defenseState.outcome = {
    ...(defenseState.outcome || {}),
    kind: "force",
    label: `${defenseState.chosenFielder.role} 送球`,
    caught: true,
    needsThrow: true,
    fieldingTime: Math.max(
      defenseState.outcome?.fieldingTime ?? defenseState.battedBall?.ballTime ?? 0,
      getDefenseBallFieldingArrivalTime(defenseState.battedBall, defenseState.target),
      getDefenseFielderArrivalTime(defenseState.chosenFielder, defenseState.target)
    )
  };
  defenseState.throw = createThrowState(defenseState.chosenFielder, defenseState.target, defenseState.outcome, runner);
  defenseState.duration = getDefenseDuration(defenseState.battedBall, defenseState.outcome, runner, defenseState.throw, defenseState.target);
  if (elapsedSeconds * 1000 > defenseState.duration - 400) {
    defenseState.duration = elapsedSeconds * 1000 + 1200;
  }
}

function getRunnerRouteDistance(route) {
  return route.slice(1).reduce((total, point, index) => {
    const previous = route[index];
    return total + Math.hypot(point.x - previous.x, point.y - previous.y);
  }, 0);
}

function createThrowState(fielder, fieldingTarget, outcome, runner) {
  if (!outcome.needsThrow) return null;
  const destination = runner?.destination || defenseField.bases.first;
  const distance = Math.hypot(destination.x - fieldingTarget.x, destination.y - fieldingTarget.y);
  const throwProfile = getThrowProfile(fielder, distance);
  const fieldingTime = outcome.fieldingTime + defenseThrowSetSeconds;
  const throwTime = throwProfile.throwTime;
  return {
    active: false,
    from: { ...fieldingTarget },
    to: { ...destination },
    prepareStartTime: outcome.fieldingTime,
    startTime: fieldingTime,
    endTime: fieldingTime + throwTime,
    throwTime,
    arcHeight: throwProfile.arcHeight,
    baseLabel: runner?.baseLabel || "一塁",
    targetBase: runner?.targetBase || "first",
    safe: runner.arrivalTime <= fieldingTime + throwTime
  };
}

function getThrowProfile(fielder, distance) {
  const arm = clamp(fielder?.arm ?? 5, 1, 10);
  const longThrowFactor = clamp((distance - 420) / 1180, 0, 1);
  const baseSpeed = getArmThrowSpeed(arm);
  const longThrowPenalty = 0.76 - arm * 0.045;
  const speedMultiplier = clamp(1 - longThrowFactor * longThrowPenalty, 0.22, 1);
  const throwSpeed = baseSpeed * speedMultiplier;
  const minimumTime = 0.78 + longThrowFactor * (1.35 - arm * 0.055);
  const throwTime = Math.max(distance / throwSpeed, minimumTime);
  const arcHeight = 38 + longThrowFactor * (210 - arm * 7);
  return { throwSpeed, throwTime, arcHeight, longThrowFactor };
}

function getArmThrowSpeed(armRating) {
  return (abilitySpeedBaseRating + clamp(armRating ?? 5, 1, 10)) * throwSpeedUnit;
}

function resolveGrounderPickupThrow(fielder, battedBall, outcome, fieldingTarget, runner) {
  if (outcome.caught || outcome.kind !== "single" || !runner || battedBall.fenceOver || battedBall.wallHit) return null;
  const distance = Math.hypot(fieldingTarget.x - fielder.x, fieldingTarget.y - fielder.y);
  const pickupDelay = battedBall.isGrounder ? 0.34 : battedBall.isLiner ? 0.46 : 0.58;
  const pickupTime = Math.max(
    battedBall.ballTime + pickupDelay,
    defenseField.fielderReactionDelay + distance / getFielderSpeed(fielder) + 0.22
  );
  const targetBase = getBatterRunnerTargetBase(outcome, battedBall, fieldingTarget, fielder, runner);
  const throwRunner = createBatterRunner(activeBatter);
  setBatterRunnerDestination(throwRunner, targetBase);
  if (pickupTime >= throwRunner.arrivalTime) return null;
  return {
    target: fieldingTarget,
    outcome: {
      kind: "force",
      label: `${fielder.role} ${battedBall.isGrounder ? "ゴロ処理" : "捕球処理"}`,
      caught: true,
      needsThrow: true,
      targetBase,
      fieldingTime: pickupTime
    }
  };
}

function getDefenseFieldingTarget(battedBall, outcome) {
  if (battedBall.fenceOver) return getHomeRunFielderWatchTarget(battedBall);
  if (outcome.caught && !outcome.needsThrow) return battedBall.target;
  if (battedBall.wallHit) return battedBall.wallReboundTarget || battedBall.target;
  const hardGrounder = isHardGrounder(battedBall);
  const strongOutfieldRoll = (battedBall.isLiner || hardGrounder || battedBall.power >= 0.58) && battedBall.landingDistance > 620;
  const fenceRoom = Math.max(0, defenseField.fenceDistance - battedBall.flightDistance - 120);
  const fenceRollDistance = clamp(fenceRoom * 0.72, 680, 1500);
  const baseRollDistance = outcome.kind === "double"
    ? strongOutfieldRoll ? fenceRollDistance : 820
    : strongOutfieldRoll ? clamp(fenceRoom * 0.46, 520, 1120) : 340;
  const scaledRollDistance = baseRollDistance * defenseRollTuning.distanceScale;
  const outfieldRollScale = isOutfieldGrounderOrLiner(battedBall)
    ? defenseRollTuning.outfieldGrounderLinerScale
    : 1;
  const grounderRollScale = battedBall.isGrounder ? defenseRollTuning.grounderScale : 1;
  const rollDistance = hardGrounder
    ? clamp(scaledRollDistance * grounderRollScale * outfieldRollScale * hardGrounderTuning.rollDistanceScale, hardGrounderTuning.rollMinDistance, hardGrounderTuning.rollMaxDistance * grounderRollScale * outfieldRollScale)
    : scaledRollDistance * grounderRollScale * outfieldRollScale;
  const projectedTarget = {
    x: battedBall.target.x + battedBall.direction.x * rollDistance,
    y: battedBall.target.y + battedBall.direction.y * rollDistance
  };
  if (isPastOutfieldFence(projectedTarget)) {
    if (shouldBounceIntoStands(battedBall, projectedTarget)) {
      battedBall.groundRuleDouble = true;
    }
    return clampPointInsideFence(projectedTarget, 0);
  }
  return clampPointInsideFence(projectedTarget, 12);
}

function getHomeRunFielderWatchTarget(battedBall) {
  return clampPointInsideFence(battedBall?.target || { x: field.centerX, y: defenseField.bases.home.y - defenseField.fenceDistance }, 86);
}

function shouldBounceIntoStands(battedBall, projectedTarget) {
  return false;
}

function getOutfieldFenceOvershoot(point) {
  if (!isPastOutfieldFence(point)) return 0;
  return getFenceDistance(point) - defenseField.fenceDistance;
}

function isOutfieldGrounderOrLiner(battedBall) {
  if (!battedBall || (!battedBall.isGrounder && !battedBall.isLiner)) return false;
  return Math.max(0, field.plateY - battedBall.target.y) > defenseField.fenceDistance * 0.28
    || battedBall.landingDistance > defenseField.fenceDistance * 0.28;
}

function resolveFenceBoundaryOutcome(battedBall, outcome, fieldingTarget) {
  if (!battedBall.groundRuleDouble) return null;
  return {
    target: fieldingTarget,
    outcome: {
      kind: "double",
      label: "エンタイトル2ベース",
      scoreType: "double",
      caught: false,
      fieldingTime: getDefenseBallFieldingArrivalTime(battedBall, fieldingTarget)
    }
  };
}

function getFenceCenter() {
  return defenseField.bases.home;
}

function getFenceDistance(point) {
  const center = getFenceCenter();
  return Math.hypot(point.x - center.x, point.y - center.y);
}

function isPastOutfieldFence(point) {
  return point.y < getFenceCenter().y && getFenceDistance(point) > defenseField.fenceDistance;
}

function clampPointInsideFence(point, inset = 0) {
  if (!isPastOutfieldFence(point)) return { ...point };
  const center = getFenceCenter();
  const distance = getFenceDistance(point) || 1;
  const scale = Math.max(0, defenseField.fenceDistance - inset) / distance;
  return {
    x: center.x + (point.x - center.x) * scale,
    y: center.y + (point.y - center.y) * scale
  };
}

function clampFielderInsideFence(fielder) {
  const point = clampPointInsideFence(fielder, 36);
  return { ...fielder, x: point.x, y: point.y };
}

function getFenceIntersectionFromPoint(origin, direction) {
  const center = getFenceCenter();
  const dx = direction.x;
  const dy = direction.y;
  const ox = origin.x - center.x;
  const oy = origin.y - center.y;
  const a = dx * dx + dy * dy;
  const b = 2 * (ox * dx + oy * dy);
  const c = ox * ox + oy * oy - defenseField.fenceDistance * defenseField.fenceDistance;
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0 || a === 0) return null;
  const root = Math.sqrt(discriminant);
  const candidates = [(-b - root) / (2 * a), (-b + root) / (2 * a)].filter((value) => value > 0);
  if (!candidates.length) return null;
  const travelDistance = Math.min(...candidates);
  const point = {
    x: origin.x + dx * travelDistance,
    y: origin.y + dy * travelDistance
  };
  if (point.y >= center.y) return null;
  return { point, travelDistance };
}

function buildBattedBall(power, direction, label) {
  const origin = { x: field.plateX, y: field.plateY - 10 };
  const isPopupFly = label === hitLabels.popup;
  const isRoutineFly = label === hitLabels.routineFly || label === hitLabels.fly;
  const isLineLiner = label === hitLabels.lineLiner;
  const isLineDrop = label === hitLabels.lineDrop;
  const isFenceLiner = label === hitLabels.fenceLiner;
  const isFrontDrop = label === hitLabels.frontDrop;
  const isLineEdge = label === hitLabels.lineEdge;
  const isChaseFly = label === hitLabels.chaseFly;
  const isToweringFly = label === hitLabels.toweringFly;
  const isFenceEdgeFly = label === hitLabels.fenceEdgeFly;
  const isDeepDrive = label === deepDriveLabel;
  const fenceDistance = defenseField.fenceDistance;
  const distance = isPopupFly
    ? randomBetween(300, 500)
    : isFrontDrop
    ? randomBetween(760, 1080)
    : isLineEdge
    ? randomBetween(1320, 2020)
    : isLineLiner
    ? randomBetween(1560, 1980)
    : isLineDrop
    ? randomBetween(820, 1220)
    : isFenceLiner
    ? fenceDistance + randomBetween(-70, 95)
    : isChaseFly
    ? randomBetween(1600, 2140)
    : isFenceEdgeFly
    ? fenceDistance + randomBetween(-180, 188)
    : isDeepDrive
    ? fenceDistance + randomBetween(-240, 257) + Math.max(0, power - 1.25) * 145 + Math.max(0, power - 2.05) * 650
    : isToweringFly
    ? randomBetween(1760, 2195) + Math.max(0, power - 1.12) * 350 + Math.max(0, power - 2.0) * 530
    : isRoutineFly
    ? randomBetween(1200, 1700)
    : 180 + Math.pow(Math.max(power, 0.08), 0.86) * 1040;
  const isGrounder = !isPopupFly && !isRoutineFly && !isFrontDrop && !isLineEdge && !isLineLiner && !isLineDrop && !isFenceLiner && !isChaseFly && !isFenceEdgeFly && (label === hitLabels.grounder || power < 0.38);
  const isLiner = isFrontDrop || isLineEdge || isLineLiner || isLineDrop || isFenceLiner || (!isGrounder && !isPopupFly && !isRoutineFly && !isChaseFly && !isFenceEdgeFly && power < 0.86);
  const trajectory = isGrounder ? "grounder" : isLiner ? "liner" : "fly";
  const isSoftDrop = isFrontDrop || isLineDrop || (label === hitLabels.single && isLiner && power <= 0.66);
  const carryScale = isPopupFly || isRoutineFly ? 1 : isGrounder ? 0.62 : isLiner ? 0.72 : power < 1.05 ? 0.82 : 1;
  const landingDistance = isLineLiner
    ? distance * randomBetween(0.82, 0.92)
    : isFrontDrop
    ? distance * randomBetween(0.9, 0.98)
    : isLineEdge
    ? distance * randomBetween(0.88, 0.98)
    : isLineDrop
    ? distance * randomBetween(0.94, 1.02)
    : isFenceLiner
    ? Math.min(distance, fenceDistance + 80) * randomBetween(0.98, 1.01)
    : isChaseFly
    ? distance * randomBetween(0.92, 1.04)
    : isFenceEdgeFly
    ? Math.min(distance, fenceDistance + 180) * randomBetween(0.99, 1.02)
    : isToweringFly
    ? distance * randomBetween(0.94, 1.04)
    : distance * carryScale;
  const isHardOutfieldHit = isLiner && power >= 0.78 && landingDistance > 620;
  const isDeep = distance > defenseField.deepHitDistance;
  const ballSpeedMultiplier = battedBallSpeedMultiplier[trajectory] ?? 1;
  const baseBallTime = isGrounder
    ? 0.32
    : isPopupFly
    ? 1.08
    : isFrontDrop
    ? 1.02
    : isLineDrop
    ? 0.94
    : isFenceLiner
    ? 0.64
    : isLineEdge
    ? 0.72
    : isChaseFly
    ? 1.48
    : isFenceEdgeFly
    ? 1.76
    : isToweringFly
    ? 1.84
    : isRoutineFly
    ? 1.18
    : isLiner
    ? 0.58
    : 0.7;
  const baseBallSpeed = (isGrounder ? 1220 : isLiner ? 760 : isPopupFly ? 360 : isRoutineFly ? 540 : 620)
    * ballSpeedMultiplier
    * battedBallPaceMultiplier
    * (isLineEdge ? 1.04 : isLineLiner ? 1.08 : isFenceLiner ? 0.96 : isFenceEdgeFly ? 0.66 : isToweringFly ? 0.68 : isChaseFly ? 0.78 : isSoftDrop ? 0.74 : isGrounder && power >= hardGrounderTuning.minPower ? hardGrounderTuning.initialSpeedScale : isHardOutfieldHit ? 0.88 : 1);
  const fairDeepFlight = !isGrounder && isFairDirection(direction);
  const fenceIntersection = isFairDirection(direction) ? getFenceIntersectionFromPoint(origin, direction) : null;
  const fenceTravelDistance = fenceIntersection?.travelDistance ?? fenceDistance;
  const possibleWallHit = isDeepDrive
    && power >= 1.34
    && distance > defenseField.deepHitDistance
    && Math.random() < 0.36;
  const possibleFenceOver = fairDeepFlight && fenceIntersection && distance > fenceTravelDistance;
  const possibleHomerFlightDistance = getPossibleHomeRunFlightDistance(
    distance,
    fenceTravelDistance,
    { isFenceEdgeFly, isToweringFly, isChaseFly, isDeepDrive, power }
  );
  const possibleHomerHeight = isFenceEdgeFly
    ? randomBetween(330, 450) * bigOutfieldFlyHeightScale
    : isToweringFly
    ? randomBetween(390, 540) * bigOutfieldFlyHeightScale
    : getBattedBallMaxHeight(trajectory, power, possibleHomerFlightDistance) * (isRoutineFly || isChaseFly || isDeepDrive ? bigOutfieldFlyHeightScale : 1);
  const heightAtFence = fenceIntersection
    ? getBattedBallHeightAtDistance(fenceTravelDistance, {
        flightDistance: possibleHomerFlightDistance,
        maxHeight: possibleHomerHeight,
        trajectory
      })
    : 0;
  const fenceOver = !possibleWallHit && possibleFenceOver && getBattedBallHeightAtDistance(fenceTravelDistance, {
    flightDistance: possibleHomerFlightDistance,
    maxHeight: possibleHomerHeight,
    trajectory
  }) >= defenseField.fenceHeight;
  const wallHit = !fenceOver && fairDeepFlight && fenceIntersection && (distance >= fenceTravelDistance || distance >= defenseField.wallHitDistance || possibleWallHit);
  const flightDistance = fenceOver ? possibleHomerFlightDistance : wallHit ? fenceTravelDistance : landingDistance;
  const maxHeight = fenceOver
    ? possibleHomerHeight
    : isPopupFly ? randomBetween(170, 230)
    : isRoutineFly ? randomBetween(320, 430) * 1.28
    : isToweringFly ? randomBetween(360, 520) * bigOutfieldFlyHeightScale
    : isFenceEdgeFly ? randomBetween(330, 450) * bigOutfieldFlyHeightScale
    : isChaseFly ? randomBetween(240, 330) * bigOutfieldFlyHeightScale
    : isFrontDrop ? randomBetween(48, 70)
    : isLineLiner ? randomBetween(34, 58)
    : isLineEdge ? randomBetween(30, 54)
    : isFenceLiner ? randomBetween(82, 132)
    : isSoftDrop ? 56 : getBattedBallMaxHeight(trajectory, power, flightDistance) * (trajectory === "fly" ? 1.32 : 1);
  const wallImpactHeight = wallHit ? clamp(heightAtFence || 74 + (power - 0.75) * 88, 18, defenseField.fenceHeight - 8) : 0;
  const rawTarget = {
    x: origin.x + direction.x * flightDistance,
    y: origin.y + direction.y * flightDistance
  };
  const target = wallHit && fenceIntersection
    ? fenceIntersection.point
    : fenceOver
      ? rawTarget
      : clampPointInsideFence(rawTarget, 12);
  const wallReboundTarget = wallHit
    ? clampPointInsideFence({
        x: target.x - direction.x * getWallReboundDistance(power),
        y: target.y - direction.y * getWallReboundDistance(power)
      }, 42)
    : null;
  const ballTime = baseBallTime / (ballSpeedMultiplier * battedBallPaceMultiplier) + flightDistance / baseBallSpeed;
  return { origin, direction, target, wallReboundTarget, distance, landingDistance, flightDistance, power, trajectory, isGrounder, isLiner, isPopupFly, isRoutineFly, isLineLiner, isLineDrop, isFenceLiner, isFrontDrop, isLineEdge, isChaseFly, isToweringFly, isFenceEdgeFly, isSoftDrop, isHardOutfieldHit, isDeep, fenceOver, wallHit, groundRuleDouble: false, ballTime, maxHeight, wallImpactHeight };
}

function getPossibleHomeRunFlightDistance(distance, fenceTravelDistance, traits = {}) {
  const overFenceDistance = Math.max(0, distance - fenceTravelDistance);
  if (traits.isFenceEdgeFly) {
    return fenceTravelDistance + clamp(overFenceDistance * 0.73, 10, 158);
  }
  if (traits.isToweringFly || traits.isDeepDrive) {
    const perfectBonus = traits.power >= 2.15 ? Math.max(0, traits.power - 2.15) * 359 : 0;
    return fenceTravelDistance + clamp(overFenceDistance * 0.41 + perfectBonus, 34, 530 + perfectBonus);
  }
  if (traits.isChaseFly) {
    return fenceTravelDistance + clamp(overFenceDistance * 0.55, 42, 308);
  }
  return fenceTravelDistance + clamp(overFenceDistance * 0.5, 42, 445);
}

function getWallReboundDistance(power) {
  return clamp(
    wallReboundTuning.minDistance + Math.max(0, power - 0.75) * wallReboundTuning.powerDistance,
    wallReboundTuning.minDistance,
    wallReboundTuning.maxDistance
  );
}

function isHardGrounder(battedBall) {
  return Boolean(battedBall?.isGrounder && battedBall.power >= hardGrounderTuning.minPower);
}

function getBattedBallMaxHeight(trajectory, power, flightDistance) {
  if (trajectory === "grounder") return 12;
  if (trajectory === "liner") return 24 + clamp(power, 0, 1.3) * 18;
  return 150 + clamp((flightDistance - 420) / 900, 0, 1) * 120 + clamp((power - 0.85) / 0.55, 0, 1) * 90;
}

function chooseDefenseFielder(fielders, battedBall) {
  const eligibleFielders = isDeepOutfieldBall(battedBall)
    ? fielders.filter((fielder) => fielder.role !== "P")
    : fielders;
  return eligibleFielders.reduce((best, fielder) => {
    const distance = Math.hypot(battedBall.target.x - fielder.x, battedBall.target.y - fielder.y);
    const roleFit = getDefenseRoleFit(fielder, battedBall);
    const speed = getFielderSpeed(fielder);
    const score = distance / speed - roleFit;
    const candidate = { ...fielder, distanceToTarget: distance, roleFit, score };
    return !best || candidate.score < best.score ? candidate : best;
  }, null);
}

function isDeepOutfieldBall(battedBall) {
  if (!battedBall) return false;
  const outfieldDepth = Math.max(0, field.plateY - battedBall.target.y);
  return outfieldDepth > defenseField.fenceDistance * 0.34
    || battedBall.landingDistance > defenseField.fenceDistance * 0.34
    || battedBall.wallHit
    || battedBall.groundRuleDouble
    || battedBall.isDeep;
}

function shouldOutfielderHandleFieldingTarget(battedBall, fieldingTarget) {
  if (!battedBall || !fieldingTarget) return false;
  const targetDepthFromHome = getFenceDistance(fieldingTarget);
  const targetOutfieldDepth = Math.max(0, defenseField.bases.home.y - fieldingTarget.y);
  return targetDepthFromHome > defenseField.fenceDistance * 0.34
    || targetOutfieldDepth > defenseField.fenceDistance * 0.34
    || battedBall.wallHit
    || battedBall.isDeep;
}

function getDefenseRoleFit(fielder, battedBall) {
  const side = battedBall.direction.x;
  const pitcherGrounder = isPitcherHandledGrounder(battedBall);
  const strongOutfieldBall = battedBall.landingDistance > 880 || (battedBall.isLiner && battedBall.power >= 0.78);
  if (battedBall.isLineLiner || battedBall.isLineDrop) {
    if (fielder.role === "P") return -7.5;
    if (fielder.role === "L") return side < 0 ? 2.4 : -1.2;
    if (fielder.role === "R") return side > 0 ? 2.4 : -1.2;
    if (fielder.role === "C") return -0.35;
  }
  if (battedBall.isChaseFly && fielder.role !== "P") return 1.15 + (fielder.rangeBonus ?? 0) / 70;
  if (battedBall.isPopupFly) return fielder.role === "P" ? 3.6 : -0.4;
  if (battedBall.isRoutineFly && fielder.role !== "P") return 1.15;
  if (fielder.role === "P") return pitcherGrounder ? 5.1 : strongOutfieldBall ? -8 : -0.9;
  if (pitcherGrounder) return -1.65;
  if (fielder.role === "L") return side < -0.18 ? 1.05 : side > 0.25 ? -0.55 : 0.15;
  if (fielder.role === "R") return side > 0.18 ? 1.05 : side < -0.25 ? -0.55 : 0.15;
  if (fielder.role === "C") return 0.5 + (fielder.rangeBonus ?? 0) / 80 - Math.abs(side) * 0.25;
  return 0;
}

function getFielderSpeed(fielder) {
  return getFieldingMoveSpeed(fielder?.speed ?? fielder?.fielding ?? 5);
}

function getFieldingMoveSpeed(fieldingRating) {
  return (abilitySpeedBaseRating + clamp(fieldingRating ?? 5, 1, 10)) * fielderSpeedUnit;
}

function isPitcherHandledGrounder(battedBall) {
  return battedBall.isGrounder && !isDeepOutfieldBall(battedBall) && (
    battedBall.landingDistance < 920 || (battedBall.power < 0.72 && battedBall.landingDistance < 1120)
  );
}

function getBattedBallFielderRelation(fielder, battedBall) {
  const fromHomeToBall = Math.max(0, field.plateY - battedBall.target.y);
  const fromHomeToFielder = Math.max(0, field.plateY - fielder.y);
  const sideGap = Math.abs(battedBall.target.x - fielder.x);
  const frontGap = fromHomeToFielder - fromHomeToBall;
  const behindGap = fromHomeToBall - fromHomeToFielder;
  return {
    sideGap,
    frontGap,
    behindGap,
    landsInFront: frontGap > 60,
    splitsGap: behindGap > 130 && sideGap > 135
  };
}

function resolveDefenseOutcome(fielder, battedBall, runner = null) {
  if (battedBall.fenceOver) return { kind: "homer", label: hitLabels.homer, scoreType: "homer", caught: false };
  if (battedBall.wallHit) return { kind: "double", label: "フェンス直撃", scoreType: "double", caught: false };

  const speed = getFielderSpeed(fielder);
  const pitcherGrounderReach = fielder.role === "P" && isPitcherHandledGrounder(battedBall) ? 132 : 0;
  const fielderReach = battedBall.isGrounder || battedBall.isLiner
    ? 18 + fielder.fielding * 7 + (fielder.rangeBonus ?? 0) * 0.35
    : 28 + fielder.fielding * 11 + (fielder.rangeBonus ?? 0);
  const adjustedFielderReach = fielderReach + pitcherGrounderReach;
  const runDistance = Math.max(0, fielder.distanceToTarget - adjustedFielderReach);
  const fielderTime = defenseField.fielderReactionDelay + runDistance / speed;
  const ballTime = battedBall.ballTime;
  const grounderPenalty = battedBall.isGrounder ? 0.55 : battedBall.isLiner ? 0.08 : 0;
  const canField = fielderTime <= ballTime - grounderPenalty;
  const relation = getBattedBallFielderRelation(fielder, battedBall);

  if (battedBall.isLineLiner) {
    const reactionWindow = ballTime + 0.04 + (fielder.fielding ?? 5) * 0.012;
    if (fielderTime <= reactionWindow) {
      return { kind: "out", label: `${fielder.role} ライン際好捕`, caught: true, needsThrow: false, fieldingTime: Math.max(ballTime, fielderTime) };
    }
    return { kind: "double", label: hitLabels.double, scoreType: "double", caught: false, fieldingTime: ballTime };
  }

  if (battedBall.isLineDrop) {
    const catchWindow = ballTime - 0.1 + (fielder.fielding ?? 5) * 0.018;
    if (fielder.role !== "P" && fielderTime <= catchWindow) {
      return { kind: "out", label: `${fielder.role} スライディング捕球`, caught: true, needsThrow: false, fieldingTime: ballTime };
    }
    return { kind: "single", label: hitLabels.single, scoreType: "single", caught: false, fieldingTime: Math.max(ballTime, fielderTime + 0.18) };
  }

  if (battedBall.isChaseFly) {
    const chaseWindow = ballTime + 0.05 + (fielder.fielding ?? 5) * 0.018;
    if (fielder.role !== "P" && fielderTime <= chaseWindow) {
      return { kind: "out", label: `${fielder.role} 追いついた`, caught: true, needsThrow: false, fieldingTime: Math.max(ballTime, fielderTime) };
    }
    const missDistance = Math.max(0, fielder.distanceToTarget - getFielderSpeed(fielder) * Math.max(0, ballTime - defenseField.fielderReactionDelay));
    return missDistance > 190
      ? { kind: "triple", label: hitLabels.triple, scoreType: "triple", caught: false, fieldingTime: ballTime }
      : { kind: "double", label: hitLabels.double, scoreType: "double", caught: false, fieldingTime: ballTime };
  }

  if (battedBall.isSoftDrop && fielder.role !== "P") {
    return { kind: "single", label: hitLabels.single, scoreType: "single", caught: false, fieldingTime: ballTime };
  }

  if (canField) {
    if (fielder.role === "P") {
      if (battedBall.isGrounder && runner) {
        return { kind: "force", label: "P ゴロ処理", caught: true, needsThrow: true, fieldingTime: ballTime };
      }
      return { kind: "out", label: "P 捕球", caught: true, needsThrow: false, fieldingTime: ballTime };
    }
    const straightAtFielder = relation.sideGap < 92;
    if (battedBall.isGrounder) {
      if (straightAtFielder && runner && ballTime < runner.arrivalTime) {
        return { kind: "force", label: `${fielder.role} バウンド捕球`, caught: true, needsThrow: true, fieldingTime: ballTime };
      }
      return { kind: "single", label: hitLabels.single, scoreType: "single", caught: false, fieldingTime: ballTime };
    }
    if (battedBall.isLiner && !straightAtFielder) {
      return { kind: "single", label: hitLabels.single, scoreType: "single", caught: false, fieldingTime: ballTime };
    }
    return { kind: "out", label: `${fielder.role} 捕球`, caught: true, needsThrow: false, fieldingTime: ballTime };
  }
  if (battedBall.isGrounder) {
    const pickupTime = Math.max(ballTime + 0.22, fielderTime + 0.16);
    if (fielder.role === "P" && isPitcherHandledGrounder(battedBall)) {
      return { kind: "force", label: "P ゴロ処理", caught: true, needsThrow: true, fieldingTime: pickupTime };
    }
    if (relation.sideGap < 92 && runner && pickupTime < runner.arrivalTime) {
      return { kind: "force", label: `${fielder.role} バウンド捕球`, caught: true, needsThrow: true, fieldingTime: pickupTime };
    }
  }
  if (relation.splitsGap) return { kind: "double", label: hitLabels.double, scoreType: "double", caught: false };
  if (relation.landsInFront) return { kind: "single", label: hitLabels.single, scoreType: "single", caught: false };
  if (battedBall.isGrounder || battedBall.isLiner) {
    return resolveDroppedBallOutcome(fielder, battedBall, relation);
  }
  if (battedBall.isDeep || battedBall.distance > defenseField.doubleDistance) return { kind: "double", label: hitLabels.double, scoreType: "double", caught: false };
  return { kind: "single", label: hitLabels.single, scoreType: "single", caught: false };
}

function resolveDroppedBallOutcome(fielder, battedBall, relation = getBattedBallFielderRelation(fielder, battedBall)) {
  const outfieldDepth = field.plateY - battedBall.target.y;
  const sideDepth = Math.abs(battedBall.target.x - field.plateX);
  const fielderMissDistance = Math.hypot(battedBall.target.x - fielder.x, battedBall.target.y - fielder.y);
  if (relation.splitsGap) return { kind: "double", label: hitLabels.double, scoreType: "double", caught: false };
  if (relation.landsInFront && fielderMissDistance < 520) return { kind: "single", label: hitLabels.single, scoreType: "single", caught: false };
  const gapLiner = battedBall.isLiner && (fielderMissDistance > 520 || outfieldDepth > 760 || sideDepth > 760);
  const throughOutfield = gapLiner || outfieldDepth > 1160 || sideDepth > 1120 || fielderMissDistance > 820;
  if (throughOutfield) return { kind: "double", label: hitLabels.double, scoreType: "double", caught: false };
  return { kind: "single", label: hitLabels.single, scoreType: "single", caught: false };
}

function updateDefensePlay(now) {
  if (!defenseState.active) return;
  const progress = clamp((now - defenseState.startTime) / defenseState.duration, 0, 1);
  const eased = 1 - Math.pow(1 - progress, 2);
  const elapsedSeconds = (now - defenseState.startTime) / 1000;

  updateBatterRunner(elapsedSeconds);
  updateDefenseBaseRunners(elapsedSeconds);
  updateThrowState(elapsedSeconds);
  updateHomeRunFireworksSound(elapsedSeconds);
  const ballPoint = getDefenseBallPoint(progress, eased, elapsedSeconds);
  ball.x = ballPoint.x;
  ball.y = ballPoint.y;
  if (shouldResetTrailAtLanding(elapsedSeconds)) {
    ball.trail = [];
    defenseState.trailResetAtLanding = true;
  }
  ball.trail.push({ x: ball.x, y: ball.y, progress, elapsedSeconds });
  if (ball.trail.length > 26) ball.trail.shift();
  ball.spin += 0.22;

  defenseState.fielders = defenseState.fielders.map((fielder) => {
    if (fielder.role !== defenseState.chosenFielder.role) return fielder;
    const chaseTarget = getDefenseFielderChaseTarget(elapsedSeconds);
    const dx = chaseTarget.x - fielder.x;
    const dy = chaseTarget.y - fielder.y;
    const distance = Math.hypot(dx, dy) || 1;
    const runSeconds = Math.max(0, elapsedSeconds - defenseField.fielderReactionDelay);
    const maxRunDistance = getFielderSpeed(fielder) * runSeconds;
    const runProgress = clamp(maxRunDistance / distance, 0, 1);
    const current = clampPointInsideFence({
      x: fielder.x + dx * runProgress,
      y: fielder.y + dy * runProgress
    }, 36);
    return {
      ...fielder,
      currentX: current.x,
      currentY: current.y
    };
  });

  if (shouldResolveDefensePlayNow(elapsedSeconds)) {
    finishDefensePlay();
    return;
  }

  if (progress >= 1 && !defenseState.resolved) {
    finishDefensePlay();
  }
}

function getDefenseFielderChaseTarget(elapsedSeconds) {
  if (defenseState.battedBall?.fenceOver) return defenseState.target;
  if (defenseState.outcome?.caught || defenseState.throw) return defenseState.target;
  const ballTime = Math.max(0.1, defenseState.battedBall?.ballTime ?? 1);
  if (elapsedSeconds <= ballTime) return defenseState.landingTarget || defenseState.target;
  return defenseState.target;
}

function shouldResolveDefensePlayNow(elapsedSeconds) {
  const outcome = defenseState.outcome;
  if (!outcome || defenseState.resolved) return false;

  if (outcome.kind === "out" && outcome.caught && !outcome.needsThrow) {
    return elapsedSeconds >= outcome.fieldingTime;
  }

  const throwState = defenseState.throw;
  if (throwState && !throwState.safe) {
    return elapsedSeconds >= throwState.endTime + defenseThrowResultHoldSeconds;
  }

  return false;
}

function updateBatterRunner(elapsedSeconds) {
  const runner = defenseState.runner;
  if (!runner) return;
  const routeStartTime = runner.routeStartTime ?? 0;
  const routeDuration = runner.routeDuration ?? runner.arrivalTime;
  const runnerProgress = routeDuration > 0 ? clamp((elapsedSeconds - routeStartTime) / routeDuration, 0, 1) : 1;
  const point = getRunnerRoutePoint(runner.route || [runner.start, runner.destination], runnerProgress);
  runner.x = point.x;
  runner.y = point.y;
  runner.arrived = runnerProgress >= 1;
  if (runner.arrived) {
    runner.currentBase = runner.targetBase;
    runner.returnBase = getPreviousBatterRunnerBase(runner.currentBase) || runner.returnBase;
  }
}

function updateDefenseBaseRunners(elapsedSeconds) {
  if (!defenseState.baseRunners?.length) return;
  defenseState.baseRunners.forEach((runner) => {
    if (!runner.route || runner.route.length < 2 || runner.arrivalTime <= 0) {
      const point = runner.route?.[0] || getDefenseBasePoint(baseIndexByName[runner.startBase] ?? 0);
      runner.x = point.x;
      runner.y = point.y;
      runner.arrived = true;
      return;
    }
    const runnerProgress = clamp(elapsedSeconds / runner.arrivalTime, 0, 1);
    const point = getRunnerRoutePoint(runner.route, runnerProgress);
    runner.x = point.x;
    runner.y = point.y;
    runner.arrived = runnerProgress >= 1;
  });
}

function getRunnerRoutePoint(route, progress) {
  if (!route || route.length < 2) return route?.[0] || defenseField.bases.home;
  const totalDistance = getRunnerRouteDistance(route);
  let remaining = totalDistance * clamp(progress, 0, 1);
  for (let i = 1; i < route.length; i += 1) {
    const previous = route[i - 1];
    const current = route[i];
    const segmentDistance = Math.hypot(current.x - previous.x, current.y - previous.y);
    if (remaining <= segmentDistance || i === route.length - 1) {
      const t = segmentDistance > 0 ? clamp(remaining / segmentDistance, 0, 1) : 1;
      return {
        x: previous.x + (current.x - previous.x) * t,
        y: previous.y + (current.y - previous.y) * t
      };
    }
    remaining -= segmentDistance;
  }
  return route[route.length - 1];
}

function updateThrowState(elapsedSeconds) {
  const throwState = defenseState.throw;
  if (!throwState) return;
  throwState.active = elapsedSeconds >= throwState.startTime && elapsedSeconds <= throwState.endTime;
}

function getDefenseBallPoint(progress, eased, elapsedSeconds = 0) {
  const throwState = defenseState.throw;
  if (throwState && elapsedSeconds >= throwState.startTime) {
    const throwProgress = clamp((elapsedSeconds - throwState.startTime) / throwState.throwTime, 0, 1);
    const t = 1 - Math.pow(1 - throwProgress, 1.4);
    return {
      x: throwState.from.x + (throwState.to.x - throwState.from.x) * t,
      y: throwState.from.y + (throwState.to.y - throwState.from.y) * t
    };
  }

  const landing = defenseState.landingTarget || defenseState.target;
  const outcome = defenseState.outcome;
  if (outcome?.caught && !outcome?.needsThrow) {
    const fieldingTime = Math.max(0.1, outcome.fieldingTime ?? defenseState.battedBall?.ballTime ?? 1);
    const catchProgress = clamp(elapsedSeconds / fieldingTime, 0, 1);
    const t = getBattedBallTravelProgress(catchProgress);
    return {
      x: defenseState.origin.x + (defenseState.target.x - defenseState.origin.x) * t,
      y: defenseState.origin.y + (defenseState.target.y - defenseState.origin.y) * t
    };
  }
  if (defenseState.battedBall?.wallHit) {
    const ballTime = Math.max(0.1, defenseState.battedBall.ballTime ?? 1);
    if (elapsedSeconds <= ballTime) {
      const travelProgress = getBattedBallTravelProgress(clamp(elapsedSeconds / ballTime, 0, 1));
      return {
        x: defenseState.origin.x + (landing.x - defenseState.origin.x) * travelProgress,
        y: defenseState.origin.y + (landing.y - defenseState.origin.y) * travelProgress
      };
    }
    const reboundDuration = getDefenseRollDuration(defenseState.battedBall, landing, defenseState.target);
    const reboundProgress = clamp((elapsedSeconds - ballTime) / reboundDuration, 0, 1);
    const t = 1 - Math.pow(1 - reboundProgress, 1.15);
    return {
      x: landing.x + (defenseState.target.x - landing.x) * t,
      y: landing.y + (defenseState.target.y - landing.y) * t
    };
  }
  if (defenseState.battedBall?.fenceOver) {
    const ballTime = Math.max(0.1, defenseState.battedBall.ballTime ?? 1);
    const travelProgress = getBattedBallTravelProgress(clamp(elapsedSeconds / ballTime, 0, 1));
    const homerTarget = defenseState.landingTarget || defenseState.battedBall.target || defenseState.target;
    return {
      x: defenseState.origin.x + (homerTarget.x - defenseState.origin.x) * travelProgress,
      y: defenseState.origin.y + (homerTarget.y - defenseState.origin.y) * travelProgress
    };
  }

  const ballTime = Math.max(0.1, defenseState.battedBall?.ballTime ?? defenseState.duration / 1000);
  if (elapsedSeconds <= ballTime) {
    const t = getBattedBallTravelProgress(elapsedSeconds / ballTime);
    return {
      x: defenseState.origin.x + (landing.x - defenseState.origin.x) * t,
      y: defenseState.origin.y + (landing.y - defenseState.origin.y) * t
    };
  }
  const rollProgress = getDefenseRollProgress(elapsedSeconds, ballTime);
  const t = getRollingEaseProgress(rollProgress);
  return {
    x: landing.x + (defenseState.target.x - landing.x) * t,
    y: landing.y + (defenseState.target.y - landing.y) * t
  };
}

function getPostLandingHoldSeconds(battedBall) {
  if (!battedBall || battedBall.isGrounder) return 0;
  if (battedBall.isSoftDrop) return 0.58;
  if (battedBall.isLiner) return 0.44;
  return 0.34;
}

function shouldResetTrailAtLanding(elapsedSeconds) {
  const battedBall = defenseState.battedBall;
  if (!battedBall || battedBall.isGrounder || battedBall.wallHit || battedBall.fenceOver) return false;
  if (defenseState.trailResetAtLanding) return false;
  if (defenseState.outcome?.caught && !defenseState.outcome?.needsThrow) return false;
  return elapsedSeconds >= Math.max(0.1, battedBall.ballTime ?? 1);
}

function getRollingEaseProgress(progress, battedBall = defenseState.battedBall) {
  const t = clamp(progress, 0, 1);
  const exponent = isHardGrounder(battedBall) ? hardGrounderTuning.rollEaseExponent : 2.2;
  return 1 - Math.pow(1 - t, exponent);
}

function getDefenseRollDuration(battedBall, landing, target) {
  const rollDistance = Math.hypot(target.x - landing.x, target.y - landing.y);
  if (battedBall?.wallHit) {
    const powerFactor = clamp(0.86 + (battedBall.power ?? 0.9) * 0.08, 0.86, 1.02);
    return clamp(
      rollDistance / (wallReboundTuning.baseRollSpeed * powerFactor),
      wallReboundTuning.minRollSeconds,
      wallReboundTuning.maxRollSeconds
    );
  }
  const trajectory = battedBall?.trajectory;
  const baseSpeed = isHardGrounder(battedBall) ? hardGrounderTuning.rollBaseSpeed : trajectory === "grounder" ? 430 : trajectory === "liner" ? 390 : 350;
  const powerFactor = battedBall?.power ? clamp(0.72 + battedBall.power * 0.18, 0.72, 0.96) : 0.82;
  return clamp(rollDistance / (baseSpeed * battedBallPaceMultiplier * powerFactor), 1.15, 8.4);
}

function getDefenseRollProgress(elapsedSeconds, ballTime) {
  const landing = defenseState.landingTarget || defenseState.target;
  const rollTime = getDefenseRollDuration(defenseState.battedBall, landing, defenseState.target);
  return clamp((elapsedSeconds - ballTime) / rollTime, 0, 1);
}

function getBattedBallTravelProgress(progress) {
  const clamped = clamp(progress, 0, 1);
  const trajectory = defenseState.battedBall?.trajectory;
  if (trajectory === "fly") return clamped;
  if (trajectory === "liner") return clamped;
  return 1 - Math.pow(1 - clamped, 2);
}

function finishDefensePlay() {
  const outcome = defenseState.outcome;
  defenseState.resolved = true;
  defenseState.active = false;
  gamePhase = "playing";
  ball.active = false;
  resetCountOnly();

  if (outcome.kind === "force") {
    if (defenseState.throw && !defenseState.throw.safe) {
      count.outs += 1;
      message = `${defenseState.throw.baseLabel}アウト`;
      showEffect("アウト", "#ffcf70");
    } else {
      const advanceType = getBatterRunnerAdvanceTypeFromThrow(defenseState.throw);
      const runs = advanceRunners(advanceType, activeBatter, defenseState.battedBall, outcome);
      const baseLabel = defenseState.throw?.baseLabel || "一塁";
      message = `${baseLabel}セーフ: ${formatRuns(runs)}`;
      showEffect(runs > 0 ? `セーフ +${runs}` : "セーフ", "#fff2a8");
    }
  } else if (outcome.kind === "out") {
    count.outs += 1;
    const tagUpRuns = count.outs < 3 ? applyDefenseTagUps() : 0;
    message = tagUpRuns > 0 ? `${outcome.label}、アウト / タッチアップ ${tagUpRuns}点` : `${outcome.label}、アウト`;
    showEffect(tagUpRuns > 0 ? `タッチアップ +${tagUpRuns}` : "アウト", "#ffcf70");
  } else {
    const scoreType = getScoringHitType(outcome);
    const runs = advanceRunners(scoreType, activeBatter, defenseState.battedBall, outcome);
    const label = getHitLabelByScoreType(scoreType);
    message = `${label}: ${formatRuns(runs)}`;
    showEffect(runs > 0 ? `${label} +${runs}` : label, scoreType === "homer" ? "#ff6f61" : "#fff2a8");
  }

  advanceBattingOrder();
  setMatchup();
  checkCountEnd();
  if (gamePhase === "playing") scheduleNextPitch(900);
}

function getBatterRunnerAdvanceTypeFromThrow(throwState) {
  if (throwState?.targetBase === "home") return "homer";
  if (throwState?.targetBase === "third") return "triple";
  if (throwState?.targetBase === "second") return "double";
  return "single";
}

function applyDefenseTagUps() {
  const scoredTagUps = defenseState.baseRunners?.filter((runner) => runner.tagUp && runner.scored) || [];
  if (!scoredTagUps.length) return 0;
  scoredTagUps.forEach((runner) => {
    if (runner.startBase === "third") bases.third = null;
  });
  scores[battingTeam] += scoredTagUps.length;
  playScoringCheer(scoredTagUps.length);
  return scoredTagUps.length;
}

function checkCountEnd() {
  if (count.strikes >= 3) {
    count.outs += 1;
    resetCountOnly();
    message = "三振";
    showEffect("三振", "#f9f871");
    advanceBattingOrder();
    setMatchup();
  }
  if (count.balls >= 4) {
    const runs = advanceRunners("walk", activeBatter);
    resetCountOnly();
    message = runs > 0 ? `四球: ${runs}点` : "四球";
    showEffect(runs > 0 ? `四球 +${runs}` : "四球", "#aee7ff");
    advanceBattingOrder();
    setMatchup();
  }
  if (count.outs >= 3) changeSide();
}

function changeSide() {
  count.outs = 0;
  bases = createEmptyBases();
  resetCountOnly();
  resetBall();
  resetSwing();
  const firstHalfTeam = firstBatTeam;
  const secondHalfTeam = firstBatTeam === "away" ? "home" : "away";
  if (battingTeam === firstHalfTeam) {
    battingTeam = secondHalfTeam;
    half = "bottom";
    setMatchup();
    message = `${inning}回ウラ、${teamLabel(battingTeam)}攻撃`;
  } else {
    if (inning >= maxInnings) {
      endGame();
      return;
    }
    inning += 1;
    half = "top";
    battingTeam = firstHalfTeam;
    setMatchup();
    message = `${inning}回表、${teamLabel(battingTeam)}攻撃`;
  }
  scheduleNextPitch();
}

function endGame() {
  gamePhase = "gameover";
  const result = scores.away === scores.home ? "引き分け" : scores.away > scores.home ? "チームA勝利" : "チームB勝利";
  message = `試合終了 ${scores.away}-${scores.home} ${result}`;
  showEffect(result, "#ff6f61");
}

function launchHitBall(power, timeDiff, isFoul, directionOverride = null) {
  const direction = directionOverride || getHitDirection(timeDiff, isFoul);
  const speed = 4.2 + Math.pow(power, 1.22) * 16;
  ball.x = field.plateX;
  ball.y = field.plateY - 10;
  ball.vx = direction.x * speed;
  ball.vy = direction.y * speed;
  ball.radius = 8;
  ball.active = true;
  ball.inPitch = false;
  ball.crossedPlate = true;
  ball.wasHit = true;
  ball.trail = [];
}

function getHitDirection(timeDiff, isFoul) {
  if (isFoul) {
    const side = getTimingSideFromTimeDiff(timeDiff, 0) || (Math.random() < 0.5 ? -1 : 1);
    return normalize({ x: side * randomBetween(0.95, 1.32), y: randomBetween(-0.82, -0.34) });
  }
  const timingSide = getTimingSideFromTimeDiff(timeDiff, 95);
  if (timingSide) {
    return normalize({ x: timingSide * randomBetween(0.48, 1.08), y: randomBetween(-1.02, -0.66) });
  }
  if (Math.random() < 0.72) {
    const side = Math.random() < 0.5 ? -1 : 1;
    return normalize({ x: side * randomBetween(0.34, 0.76), y: randomBetween(-1.02, -0.68) });
  }
  return normalize({ x: randomBetween(-0.24, 0.24), y: randomBetween(-1.05, -0.74) });
}

function getInfieldGapGrounderDirection(timeDiff) {
  const side = getTimingSideFromTimeDiff(timeDiff, 70) || (Math.random() < 0.5 ? -1 : 1);
  const laneRoll = Math.random();
  if (laneRoll < 0.38) {
    return normalize({
      x: side * randomBetween(0.32, 0.48),
      y: randomBetween(-0.98, -0.82)
    });
  }
  if (laneRoll < 0.9) {
    return normalize({
      x: side * randomBetween(0.76, 0.9),
      y: randomBetween(-0.78, -0.66)
    });
  }
  return normalize({
    x: side * randomBetween(0.54, 0.64),
    y: randomBetween(-0.98, -0.86)
  });
}

function getFrontDropDirection(timeDiff) {
  const side = getTimingSideFromTimeDiff(timeDiff, 80) || (Math.random() < 0.5 ? -1 : 1);
  return normalize({
    x: side * randomBetween(0.2, 0.4),
    y: randomBetween(-1.08, -0.92)
  });
}

function getPopupFlyDirection(timeDiff) {
  const timingSide = getTimingSideFromTimeDiff(timeDiff, 70);
  const drift = timingSide * clamp(Math.abs(timeDiff) / 280, 0, 1) * 0.24 + randomBetween(-0.12, 0.12);
  return normalize({
    x: drift,
    y: randomBetween(-1.08, -0.92)
  });
}

function getRoutineFlyDirection(timeDiff) {
  const side = getTimingSideFromTimeDiff(timeDiff, 80) || (Math.random() < 0.5 ? -1 : 1);
  return normalize({
    x: side * randomBetween(0.18, 0.48),
    y: randomBetween(-1.08, -0.86)
  });
}

function isFairDirection(direction) {
  if (direction.y >= -0.05) return false;
  return Math.abs(direction.x / direction.y) <= Math.tan(55 * Math.PI / 180);
}

function isBallHittingBatter() {
  if (!ball.inPitch || ball.crossedPlate || ball.y < field.strikeZoneTop - 60) return false;
  const box = getHbpHitBox();
  return ball.x + ball.radius > box.left
    && ball.x - ball.radius < box.right
    && ball.y + ball.radius > box.top
    && ball.y - ball.radius < box.bottom;
}

function getHbpHitBox() {
  return {
    left: batter.x - 22,
    right: batter.x + 22,
    top: batter.y - 118,
    bottom: batter.y + 42
  };
}

function isStrikePitchForHbp() {
  if (ball.touchedPlate || isBallTouchingHomePlate()) return true;
  if (!ball.inPitch || ball.vy <= 0) return false;

  const plateBottom = field.plateY + 42 * field.plateScale;
  const framesToPlateBottom = (plateBottom - ball.y) / ball.vy;
  if (framesToPlateBottom < 0) return false;

  const currentProgress = getPitchProgress();
  const samples = Math.max(6, Math.ceil(framesToPlateBottom / 3));
  for (let i = 1; i <= samples; i += 1) {
    const framesAhead = framesToPlateBottom * (i / samples);
    const progress = clamp(currentProgress + (i / samples) * (1.25 - currentProgress), 0, 1.25);
    const curveDrift = ball.curvePower * Math.max(0, progress - 0.28) * 0.31 * framesAhead;
    const projectedX = ball.x + ball.vx * framesAhead + curveDrift;
    const projectedY = ball.y + ball.vy * framesAhead;
    if (isBallTouchingHomePlate(projectedX, projectedY, ball.radius)) return true;
  }
  return false;
}

function nextPitch() {
  if (gamePhase === "defense") return;
  if (gamePhase === "gameover") {
    showMenu();
    return;
  }
  if (gamePhase === "playing" && (isPitching || pendingPitch || ball.inPitch)) return;
  resetBall();
  resetSwing();
  message = gameMode === "single" ? "次の投球を待っています" : "5/8/2で投球してください";
  scheduleNextPitch(700);
}

function isBallInStrikeZone() {
  return isBallTouchingHomePlate();
}

function getHomePlatePoints() {
  const scale = field.plateScale;
  return [
    { x: field.plateX - 36 * scale, y: field.plateY - 12 * scale },
    { x: field.plateX + 36 * scale, y: field.plateY - 12 * scale },
    { x: field.plateX + 26 * scale, y: field.plateY + 22 * scale },
    { x: field.plateX, y: field.plateY + 42 * scale },
    { x: field.plateX - 26 * scale, y: field.plateY + 22 * scale }
  ];
}

function getGoodContactZonePoints() {
  const scale = field.plateScale;
  const meet = activeBatter?.meet ?? 5;
  const meetDelta = meet - 5;
  const plateTop = field.plateY - 12 * scale;
  const zoneScale = 2 / 3;
  const pitcherDirectionShrink = 18 * scale;
  const extension = Math.max(0, (42 + meetDelta * 3.5) * scale * zoneScale - pitcherDirectionShrink);
  const sidePad = meetDelta * 1.7 * scale;
  const halfTop = clamp(((36 * scale) + sidePad) * zoneScale, 14 * scale, 50 * scale);
  const halfShoulder = clamp(((26 * scale) + sidePad * 0.85) * zoneScale, 10 * scale, 40 * scale);
  return [
    { x: field.plateX - halfTop, y: plateTop - extension },
    { x: field.plateX + halfTop, y: plateTop - extension },
    { x: field.plateX + halfTop, y: plateTop },
    { x: field.plateX + halfShoulder, y: field.plateY + 22 * scale },
    { x: field.plateX - halfShoulder, y: field.plateY + 22 * scale },
    { x: field.plateX - halfTop, y: plateTop }
  ];
}

function hasBallPassedHomePlate() {
  const plateBottom = field.plateY + 42 * field.plateScale;
  return ball.y - ball.radius > plateBottom;
}

function markPlateTouch(prevX, prevY, nextX, nextY) {
  if (ball.touchedPlate) return;
  const samples = Math.max(2, Math.ceil(Math.hypot(nextX - prevX, nextY - prevY) / Math.max(1, ball.radius * 0.75)));
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const x = prevX + (nextX - prevX) * t;
    const y = prevY + (nextY - prevY) * t;
    if (isBallTouchingHomePlate(x, y, ball.radius)) {
      ball.touchedPlate = true;
      return;
    }
  }
}

function isBallTouchingHomePlate(x = ball.x, y = ball.y, radius = ball.radius) {
  const points = getHomePlatePoints();
  if (isPointInPolygon(x, y, points)) return true;
  return points.some((point, index) => {
    const nextPoint = points[(index + 1) % points.length];
    return distancePointToSegment(x, y, point.x, point.y, nextPoint.x, nextPoint.y) <= radius;
  });
}

function distanceToHomePlate(x = ball.x, y = ball.y, radius = ball.radius) {
  const points = getHomePlatePoints();
  if (isPointInPolygon(x, y, points)) return 0;
  const edgeDistance = points.reduce((minDistance, point, index) => {
    const nextPoint = points[(index + 1) % points.length];
    return Math.min(minDistance, distancePointToSegment(x, y, point.x, point.y, nextPoint.x, nextPoint.y));
  }, Number.POSITIVE_INFINITY);
  return Math.max(0, edgeDistance - radius);
}

function isBallInGoodContactZone(x = ball.x, y = ball.y, radius = ball.radius) {
  return distanceToGoodContactZone(x, y, radius) <= 0;
}

function distanceToGoodContactZone(x = ball.x, y = ball.y, radius = ball.radius) {
  const points = getGoodContactZonePoints();
  if (isPointInPolygon(x, y, points)) return 0;
  const edgeDistance = points.reduce((minDistance, point, index) => {
    const nextPoint = points[(index + 1) % points.length];
    return Math.min(minDistance, distancePointToSegment(x, y, point.x, point.y, nextPoint.x, nextPoint.y));
  }, Number.POSITIVE_INFINITY);
  return Math.max(0, edgeDistance - radius);
}

function isPointInPolygon(x, y, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const pi = points[i];
    const pj = points[j];
    const intersects = (pi.y > y) !== (pj.y > y) && x < ((pj.x - pi.x) * (y - pi.y)) / (pj.y - pi.y) + pi.x;
    if (intersects) inside = !inside;
  }
  return inside;
}

function getPitchProgress() {
  const total = ball.plateTime - ball.pitchStartTime;
  if (total <= 0) return 0;
  return clamp((performance.now() - ball.pitchStartTime) / total, 0, 1.25);
}

function getBatSegment(progress = getBatSwingProgress()) {
  const side = activeBatterSide === "R" ? 1 : -1;
  const handleX = batter.x + side * 46;
  const handleY = batter.y - 2 - (36 * field.plateScale);
  const swingArc = getBatSwingArc(progress);
  const angle = activeBatterSide === "R" ? swingArc.angle : Math.PI - swingArc.angle;
  const length = 172 * batLengthMultiplier;
  return { x1: handleX, y1: handleY, x2: handleX + Math.cos(angle) * length, y2: handleY + Math.sin(angle) * length };
}

function getSwingProgress() {
  if (!swingState.isSwinging) return 0;
  return clamp((performance.now() - swingState.startTime) / swingState.duration, 0, 1);
}

function getBatSwingProgress() {
  if (!swingState.isSwinging) return 0;
  return clamp((performance.now() - swingState.startTime) / (swingState.duration / batJudgmentSpeedMultiplier), 0, 1);
}

function getBatSwingArc(progress) {
  const startAngle = batterAngleToCanvasRadians(200);
  const impactAngle = batterAngleToCanvasRadians(125);
  const finishAngle = batterAngleToCanvasRadians(45);
  const windupHold = 0.1;
  const impactAt = 0.62;
  if (progress <= windupHold) return { angle: startAngle, phase: "ready" };
  if (progress <= impactAt) {
    const t = (progress - windupHold) / (impactAt - windupHold);
    const eased = t * t * (3 - 2 * t);
    return { angle: startAngle + (impactAngle - startAngle) * eased, phase: "swing" };
  }
  const t = (progress - impactAt) / (1 - impactAt);
  const eased = 1 - Math.pow(1 - t, 2);
  return { angle: impactAngle + (finishAngle - impactAngle) * eased, phase: "follow" };
}

function describeTiming(timeDiff) {
  if (timeDiff < -230) return "かなり早い";
  if (timeDiff < -85) return "少し早い";
  if (timeDiff <= 85) return "ジャスト";
  if (timeDiff <= 230) return "少し遅い";
  return "かなり遅い";
}

function timingSuffix(timeDiff) {
  return Number.isFinite(timeDiff) ? `${describeTiming(timeDiff)} (${Math.round(timeDiff)}ms)` : "";
}

function shouldShowTimingSuffix(label) {
  return label === "空振り" || label === "ストライク";
}

function showEffect(text, color) {
  hitEffect.active = true;
  hitEffect.startTime = performance.now();
  hitEffect.text = text;
  hitEffect.color = color;
}

function draw() {
  if (gamePhase === "defense") {
    drawDefenseView();
    drawHud();
    drawHitEffect();
    return;
  }
  drawField();
  drawPlateAndZone();
  drawGoodContactZone();
  drawPitcher();
  drawBatter();
  drawHbpHitBox();
  drawBallTrail();
  drawBall();
  drawSwingEffect();
  drawHud();
  drawHitEffect();
}

function drawField() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#5fa85b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < canvas.width; i += 56) {
    ctx.fillStyle = i % 112 === 0 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.045)";
    ctx.fillRect(i, 0, 56, canvas.height);
  }
  ctx.fillStyle = "#d89548";
  ctx.beginPath();
  ctx.moveTo(field.centerX, 70);
  ctx.lineTo(24, 836);
  ctx.lineTo(1256, 836);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#68b560";
  ctx.beginPath();
  ctx.arc(field.centerX, 754, 405, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.76)";
  ctx.lineWidth = 5;
  const plateTopY = field.plateY - 12 * field.plateScale;
  const plateHalfTop = 36 * field.plateScale;
  const lineEndY = 92;
  const lineDx = Math.tan(55 * Math.PI / 180) * (plateTopY - lineEndY);
  drawLine(field.plateX - plateHalfTop, plateTopY, field.plateX - plateHalfTop - lineDx, lineEndY);
  drawLine(field.plateX + plateHalfTop, plateTopY, field.plateX + plateHalfTop + lineDx, lineEndY);
  ctx.fillStyle = "#c8793b";
  ctx.beginPath();
  ctx.ellipse(pitcher.x, pitcher.y + 18, 68, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f8f3d8";
  ctx.fillRect(field.centerX - 96, pitcher.y + 13, 192, 8);
  ctx.fillStyle = "#233047";
  ctx.fillRect(pitcher.x - 9, pitcher.y + 9, 18, 16);
}

function drawDefenseView() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#5fa85b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const camera = getDefenseCameraOffset();
  ctx.save();
  ctx.translate(camera.x, camera.y);

  ctx.fillStyle = "#d89548";
  ctx.beginPath();
  ctx.moveTo(field.plateX, field.plateY + 42);
  ctx.lineTo(defenseField.foulLineInset, defenseField.foulLineTopY);
  ctx.lineTo(canvas.width - defenseField.foulLineInset, defenseField.foulLineTopY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#6ebf69";
  ctx.beginPath();
  ctx.arc(field.plateX, field.plateY + 42, defenseField.grassRadius, Math.PI, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.78)";
  ctx.lineWidth = 5;
  drawLine(field.plateX, field.plateY + 42, defenseField.foulLineInset, defenseField.foulLineTopY);
  drawLine(field.plateX, field.plateY + 42, canvas.width - defenseField.foulLineInset, defenseField.foulLineTopY);
  drawDefenseBases();

  ctx.strokeStyle = "rgba(35,48,71,0.28)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(field.plateX, field.plateY + 42, defenseField.fenceDistance, Math.PI, Math.PI * 2);
  ctx.stroke();
  drawOutfieldWall();

  drawDefenseTarget();
  drawHomeRunFireworks();
  drawGrounderBounceMarks();
  drawPostLandingBounceMarker();
  drawLandingImpactMarker();
  drawThrowPath();
  drawDefenseFielders();
  drawDefenseBaseRunners();
  drawBatterRunner();
  drawBallTrail();
  drawBall();
  ctx.restore();
}

function drawHomeRunFireworks() {
  const fireworks = defenseState.homeRunFireworks;
  if (!defenseState.active || !fireworks) return;
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000 - fireworks.startDelay;
  if (elapsedSeconds < 0 || elapsedSeconds > fireworks.duration + 0.65) return;

  ctx.save();
  ctx.lineCap = "round";
  fireworks.bursts.forEach((burst) => {
    const age = elapsedSeconds - burst.delay;
    if (age < 0 || age > 1.08) return;
    const progress = clamp(age / 1.08, 0, 1);
    const alpha = 1 - progress;
    const rise = 42 + progress * 82;
    const x = burst.origin.x;
    const y = burst.origin.y - rise;

    ctx.strokeStyle = `rgba(255, 255, 255, ${0.28 * alpha})`;
    ctx.lineWidth = 4;
    drawLine(x, y + 52, x, y - 14);

    burst.sparks.forEach((spark) => {
      const sx = x + spark.x * progress;
      const sy = y + spark.y * progress + progress * progress * 42;
      ctx.strokeStyle = hexToRgba(burst.color, 0.95 * alpha);
      ctx.lineWidth = spark.size;
      drawLine(
        sx - spark.x * 0.11 * (1 - progress),
        sy - spark.y * 0.11 * (1 - progress),
        sx,
        sy
      );
    });

    ctx.fillStyle = hexToRgba("#ffffff", 0.58 * alpha);
    ctx.beginPath();
    ctx.arc(x, y, 18 + progress * 36, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function hexToRgba(hex, alpha) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

function drawDefenseBases() {
  const { home, first, second, third } = defenseField.bases;
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.lineWidth = 4;
  drawLine(first.x, first.y, second.x, second.y);
  drawLine(second.x, second.y, third.x, third.y);

  drawBaseDiamond(home.x, home.y, "H", "#fff8df");
  drawBaseDiamond(first.x, first.y, "1", "#fff8df");
  drawBaseDiamond(second.x, second.y, "2", "#fff8df");
  drawBaseDiamond(third.x, third.y, "3", "#fff8df");
  ctx.restore();
}

function drawBaseDiamond(x, y, label, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = color;
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 3;
  ctx.fillRect(-13, -13, 26, 26);
  ctx.strokeRect(-13, -13, 26, 26);
  ctx.restore();

  ctx.fillStyle = "#233047";
  ctx.font = "bold 13px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y + 1);
}

function drawOutfieldWall() {
  const homeY = field.plateY + 42;
  const wallHeight = defenseField.fenceHeight;
  ctx.save();

  ctx.strokeStyle = "rgba(18, 34, 47, 0.32)";
  ctx.lineWidth = 70;
  ctx.beginPath();
  ctx.arc(field.plateX, homeY + 18, defenseField.fenceDistance + 12, Math.PI, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#254b55";
  ctx.lineWidth = 58;
  ctx.beginPath();
  ctx.arc(field.plateX, homeY, defenseField.fenceDistance, Math.PI, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#173340";
  ctx.lineWidth = 22;
  ctx.beginPath();
  ctx.arc(field.plateX, homeY + 18, defenseField.fenceDistance, Math.PI, Math.PI * 2);
  ctx.stroke();

  for (let layer = 0; layer <= 5; layer += 1) {
    const t = layer / 5;
    ctx.strokeStyle = `rgba(37, 75, 85, ${0.34 - t * 0.035})`;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(field.plateX, homeY - wallHeight * t, defenseField.fenceDistance, Math.PI, Math.PI * 2);
    ctx.stroke();
  }

  ctx.strokeStyle = "#7fc7b0";
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.arc(field.plateX, homeY - wallHeight, defenseField.fenceDistance, Math.PI, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 240, 184, 0.8)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(field.plateX, homeY - wallHeight - 10, defenseField.fenceDistance - 2, Math.PI, Math.PI * 2);
  ctx.stroke();

  for (let angle = 185; angle <= 355; angle += 17) {
    const rad = degreesToRadians(angle);
    const x = field.plateX + Math.cos(rad) * defenseField.fenceDistance;
    const y = homeY + Math.sin(rad) * defenseField.fenceDistance;
    ctx.strokeStyle = "#102833";
    ctx.lineWidth = 8;
    drawLine(x, y - wallHeight - 14, x, y + 24);
    ctx.strokeStyle = "rgba(255, 240, 184, 0.55)";
    ctx.lineWidth = 2;
    drawLine(x - 3, y - wallHeight - 8, x - 3, y + 18);
  }
  ctx.restore();
}

function getDefenseCameraOffset() {
  if (!defenseState.active) return { x: 0, y: 0 };
  if (defenseState.battedBall?.fenceOver) return getHomeRunCameraOffset();
  const chosen = defenseState.fielders.find((fielder) => fielder.role === defenseState.chosenFielder.role);
  const focusX = chosen ? ball.x * 0.68 + chosen.currentX * 0.32 : ball.x;
  const focusY = chosen ? ball.y * 0.68 + chosen.currentY * 0.32 : ball.y;
  const homeY = field.plateY + 42;
  const minX = field.plateX - defenseField.fenceDistance - 160;
  const maxX = field.plateX + defenseField.fenceDistance + 160;
  const minY = homeY - defenseField.fenceDistance - 180;
  const maxY = homeY + 120;
  const cameraX = clamp(canvas.width / 2 - focusX, canvas.width - maxX, -minX);
  const cameraY = clamp(canvas.height / 2 - focusY, canvas.height - maxY, -minY);
  return { x: cameraX, y: cameraY };
}

function getHomeRunCameraOffset() {
  const battedBall = defenseState.battedBall;
  const fireworks = defenseState.homeRunFireworks;
  const center = getFenceCenter();
  const elapsedSeconds = defenseState.active ? (performance.now() - defenseState.startTime) / 1000 : 0;
  const travelProgress = clamp(elapsedSeconds / Math.max(0.1, battedBall.ballTime ?? 1), 0, 1);
  const standFocus = getHomeRunStandFocusPoint();
  const ballFocus = {
    x: ball.x,
    y: ball.y - getDefenseBallVisualHeightOffset(getDefenseBallHeightAtPoint(travelProgress, elapsedSeconds), battedBall) * 0.28
  };
  const standWeight = clamp((elapsedSeconds - (battedBall.ballTime ?? 0.8) * 0.58) / 0.7, 0, 1);
  const focusX = ballFocus.x * (1 - standWeight) + standFocus.x * standWeight;
  const focusY = ballFocus.y * (1 - standWeight) + standFocus.y * standWeight;
  const minX = field.plateX - defenseField.fenceDistance - 360;
  const maxX = field.plateX + defenseField.fenceDistance + 360;
  const minY = center.y - defenseField.fenceDistance - 760;
  const maxY = center.y + 120;
  return {
    x: clamp(canvas.width / 2 - focusX, canvas.width - maxX, -minX),
    y: clamp(canvas.height * 0.44 - focusY, canvas.height - maxY, -minY)
  };
}

function getHomeRunStandFocusPoint() {
  const fireworks = defenseState.homeRunFireworks;
  if (fireworks?.bursts?.length) {
    const total = fireworks.bursts.reduce((sum, burst) => ({
      x: sum.x + burst.origin.x,
      y: sum.y + burst.origin.y
    }), { x: 0, y: 0 });
    return {
      x: total.x / fireworks.bursts.length,
      y: total.y / fireworks.bursts.length - 95
    };
  }
  const target = defenseState.battedBall?.target || {
    x: field.plateX,
    y: getFenceCenter().y - defenseField.fenceDistance - 260
  };
  return { x: target.x, y: target.y - 100 };
}

function drawDefenseTarget() {
  if (!defenseState.active) return;
  const target = defenseState.landingTarget || defenseState.target;
  ctx.save();
  ctx.strokeStyle = "rgba(255, 242, 168, 0.72)";
  ctx.fillStyle = "rgba(255, 242, 168, 0.24)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(target.x, target.y, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.setLineDash([8, 8]);
  drawBattedBallGuide(target);
  if (defenseState.outcome && !defenseState.outcome.caught && defenseState.target !== target) {
    ctx.setLineDash([4, 8]);
    ctx.strokeStyle = "rgba(174, 231, 255, 0.55)";
    drawLine(target.x, target.y, defenseState.target.x, defenseState.target.y);
  }
  ctx.restore();
}

function drawLandingImpactMarker() {
  if (!defenseState.active || !defenseState.battedBall) return;
  const battedBall = defenseState.battedBall;
  if (battedBall.isGrounder) return;
  if (defenseState.outcome?.caught && !battedBall.isGrounder && !defenseState.outcome?.needsThrow) return;
  if (battedBall.fenceOver || battedBall.wallHit) return;

  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  const impactAge = elapsedSeconds - battedBall.ballTime;
  if (impactAge < 0 || impactAge > 1.45) return;

  const target = defenseState.landingTarget || defenseState.target;
  const alpha = 1 - impactAge / 1.45;
  const relation = defenseState.chosenFielder
    ? getBattedBallFielderRelation(defenseState.chosenFielder, battedBall)
    : null;
  const label = battedBall.isGrounder ? "バウンド" : relation?.landsInFront ? "手前落下" : "落下";

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(216, 149, 72, 0.42)";
  ctx.beginPath();
  ctx.ellipse(target.x, target.y + 8, 32 + impactAge * 38, 10 + impactAge * 14, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 242, 168, 0.88)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(target.x, target.y, 20 + impactAge * 48, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(110, 76, 35, 0.55)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(target.x - 18, target.y + 7);
  ctx.quadraticCurveTo(target.x - 6, target.y - 12 - impactAge * 18, target.x + 7, target.y + 4);
  ctx.quadraticCurveTo(target.x + 17, target.y + 16, target.x + 28, target.y + 5);
  ctx.stroke();

  ctx.globalAlpha = Math.min(1, alpha * 1.35);
  ctx.font = "bold 16px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(70, 46, 20, 0.7)";
  ctx.fillStyle = "#fff0a8";
  const labelY = target.y - 34 - impactAge * 14;
  ctx.strokeText(label, target.x, labelY);
  ctx.fillText(label, target.x, labelY);
  ctx.restore();
}

function drawGrounderBounceMarks() {
  if (!defenseState.active || !defenseState.battedBall?.isGrounder) return;
  const battedBall = defenseState.battedBall;
  if (battedBall.fenceOver || battedBall.wallHit) return;

  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  const ballTime = Math.max(0.1, battedBall.ballTime ?? 1);
  const activeProgress = clamp(elapsedSeconds / ballTime, 0, 1);
  const landing = defenseState.landingTarget || defenseState.target;
  const origin = defenseState.origin;
  const marks = 5;

  ctx.save();
  for (let i = 1; i <= marks; i += 1) {
    const t = i / (marks + 1);
    if (t > activeProgress + 0.24) continue;
    const fade = clamp(1 - Math.max(0, activeProgress - t) / 0.55, 0.2, 1);
    const x = origin.x + (landing.x - origin.x) * t;
    const y = origin.y + (landing.y - origin.y) * t;
    const size = 8 + i * 2;

    ctx.globalAlpha = fade;
    ctx.fillStyle = "rgba(216, 149, 72, 0.34)";
    ctx.beginPath();
    ctx.ellipse(x, y + 7, size * 1.7, size * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 242, 168, 0.55)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y + 2, size, Math.PI * 0.12, Math.PI * 1.32);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPostLandingBounceMarker() {
  if (!defenseState.active || !defenseState.battedBall || defenseState.battedBall.isGrounder) return;
  const battedBall = defenseState.battedBall;
  if (battedBall.fenceOver || battedBall.wallHit) return;
  if (defenseState.outcome?.caught && !defenseState.outcome?.needsThrow) return;

  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  const ballTime = Math.max(0.1, battedBall.ballTime ?? 1);
  if (elapsedSeconds < ballTime) return;

  const holdSeconds = getPostLandingHoldSeconds(battedBall);
  const holdAge = elapsedSeconds - ballTime;
  const rollT = getDefenseRollProgress(elapsedSeconds, ballTime);
  if (rollT > 0.68) return;

  const isLandingHold = holdAge < holdSeconds;
  const bouncePhase = getPostLandingBounceVisualPhase(rollT, battedBall);
  const alpha = isLandingHold
    ? 0.54 + bouncePhase * 0.28
    : (1 - rollT / 0.68) * (0.35 + bouncePhase * 0.55);
  const markerPoint = rollT < 0.08 ? defenseState.landingTarget || defenseState.target : ball;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "rgba(255, 242, 168, 0.82)";
  ctx.fillStyle = "rgba(216, 149, 72, 0.28)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(markerPoint.x, markerPoint.y + 8, 30 + bouncePhase * 18, 9 + bouncePhase * 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawBattedBallGuide(target) {
  const trajectory = defenseState.battedBall?.trajectory;
  if (trajectory === "fly" || trajectory === "liner") {
    ctx.beginPath();
    for (let i = 0; i <= 18; i += 1) {
      const t = i / 18;
      const x = defenseState.origin.x + (target.x - defenseState.origin.x) * t;
      const y = defenseState.origin.y + (target.y - defenseState.origin.y) * t - getBattedBallFlightHeight(t, defenseState.battedBall) * 0.62;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    return;
  }
  drawLine(defenseState.origin.x, defenseState.origin.y, target.x, target.y);
}

function drawDefenseFielders() {
  if (!defenseState.active) return;
  const runProgress = clamp((performance.now() - defenseState.startTime) / defenseState.duration, 0, 1);
  defenseState.fielders.forEach((fielder) => {
    const isChosen = fielder.role === defenseState.chosenFielder.role;
    const position = getDefenseFielderDrawPosition(fielder);
    drawDefenseFielder(position.x, position.y, fielder.role, fielder.name, isChosen, runProgress);
  });
}

function getDefenseFielderDrawPosition(fielder) {
  return {
    x: fielder.currentX ?? fielder.x,
    y: fielder.currentY ?? fielder.y
  };
}

function drawThrowPath() {
  const throwState = defenseState.throw;
  if (!throwState) return;
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  if (elapsedSeconds < throwState.prepareStartTime) return;

  const isPreparing = elapsedSeconds < throwState.startTime;
  const throwProgress = isPreparing
    ? 0
    : clamp((elapsedSeconds - throwState.startTime) / throwState.throwTime, 0, 1);
  const ballX = throwState.from.x + (throwState.to.x - throwState.from.x) * throwProgress;
  const ballY = throwState.from.y + (throwState.to.y - throwState.from.y) * throwProgress;
  const direction = normalize({
    x: throwState.to.x - throwState.from.x,
    y: throwState.to.y - throwState.from.y
  });
  const arrowX = throwState.from.x + (throwState.to.x - throwState.from.x) * 0.72;
  const arrowY = throwState.from.y + (throwState.to.y - throwState.from.y) * 0.72;

  ctx.save();
  ctx.strokeStyle = isPreparing ? "rgba(255, 242, 168, 0.44)" : throwState.safe ? "rgba(255, 227, 116, 0.9)" : "rgba(174, 231, 255, 0.95)";
  ctx.lineWidth = isPreparing ? 4 : 9;
  ctx.setLineDash(isPreparing ? [6, 12] : [18, 10]);
  drawLine(throwState.from.x, throwState.from.y, throwState.to.x, throwState.to.y);
  ctx.setLineDash([]);

  if (!isPreparing) {
    ctx.strokeStyle = throwState.safe ? "rgba(255, 255, 255, 0.72)" : "rgba(255, 255, 255, 0.86)";
    ctx.lineWidth = 4;
    drawLine(ballX - direction.x * 44, ballY - direction.y * 44, ballX + direction.x * 16, ballY + direction.y * 16);
  }

  if (!isPreparing) {
    ctx.fillStyle = throwState.safe ? "#ffe374" : "#aee7ff";
    ctx.beginPath();
    ctx.moveTo(arrowX + direction.x * 24, arrowY + direction.y * 24);
    ctx.lineTo(arrowX - direction.x * 18 - direction.y * 13, arrowY - direction.y * 18 + direction.x * 13);
    ctx.lineTo(arrowX - direction.x * 18 + direction.y * 13, arrowY - direction.y * 18 - direction.x * 13);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawBatterRunner() {
  const runner = defenseState.runner;
  if (!runner) return;
  const runProgress = clamp((performance.now() - defenseState.startTime) / Math.max(1, runner.arrivalTime * 1000), 0, 1);
  drawMiniRunner(runner.x, runner.y, runProgress, { jersey: "#d84e5f", cap: "#bf4331" });
}

function drawDefenseBaseRunners() {
  if (!defenseState.baseRunners?.length) return;
  const elapsedMs = performance.now() - defenseState.startTime;
  defenseState.baseRunners.forEach((runner) => {
    const runProgress = runner.arrivalTime > 0
      ? clamp(elapsedMs / Math.max(1, runner.arrivalTime * 1000), 0, 1)
      : 0;
    drawMiniRunner(runner.x, runner.y, runProgress, {
      jersey: runner.scored && runner.arrived ? "#ffcf70" : "#ff9f43",
      cap: "#c76c20",
      scale: 0.76
    });
  });
}

function drawMiniRunner(x, y, runProgress, options = {}) {
  const bob = Math.sin(runProgress * Math.PI * 12) * 3;
  const stride = Math.sin(runProgress * Math.PI * 14);
  const scale = options.scale ?? 0.82;
  const jersey = options.jersey || "#d84e5f";
  const cap = options.cap || "#bf4331";
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.ellipse(x, y + 30, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.translate(x, y + bob);
  ctx.scale(scale, scale);

  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  drawLine(-8, 20, -18 - stride * 8, 38);
  drawLine(8, 20, 18 + stride * 8, 38);
  drawLine(-14, 7, -27 - stride * 5, 20);
  drawLine(14, 7, 27 + stride * 5, 20);

  ctx.fillStyle = jersey;
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 3;
  roundRect(-16, -2, 32, 28, 9);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ffd7b2";
  ctx.beginPath();
  ctx.arc(0, -24, 23, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = cap;
  ctx.beginPath();
  ctx.arc(0, -29, 25, Math.PI, Math.PI * 2);
  ctx.lineTo(25, -29);
  ctx.quadraticCurveTo(7, -13, -18, -16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawDefenseFielder(x, y, role, name, isChosen, runProgress = 0) {
  const teamColor = fieldingTeam() === "away" ? "#153f24" : "#153f24";
  const accentColor = isChosen ? "#ffcf70" : "#ffffff";
  const bob = isChosen ? Math.sin(runProgress * Math.PI * 10) * 3 : 0;
  const stride = isChosen ? Math.sin(runProgress * Math.PI * 12) : 0;
  const scale = isChosen ? 1.08 : 0.96;
  const groundY = y + 34 * scale;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
  ctx.beginPath();
  ctx.ellipse(x, groundY, isChosen ? 30 : 24, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(x, y + bob);
  ctx.scale(scale, scale);

  ctx.strokeStyle = "rgba(35, 48, 71, 0.35)";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  drawLine(-10, 24, -22 - stride * 8, 42);
  drawLine(10, 24, 22 + stride * 8, 42);

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(-23 - stride * 8, 44, 10, 5, -0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(23 + stride * 8, 44, 10, 5, 0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = teamColor;
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 4;
  ctx.beginPath();
  roundRect(-18, 0, 36, 32, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-4, 4, 8, 28);

  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 5;
  drawLine(-17, 9, -31 - stride * 6, 23);
  drawLine(17, 9, 31 + stride * 6, 23);

  ctx.fillStyle = "#fff7f0";
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(-33 - stride * 6, 25, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(33 + stride * 6, 25, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ffd7b2";
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, -25, 25, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = teamColor;
  ctx.beginPath();
  ctx.arc(0, -30, 27, Math.PI, Math.PI * 2);
  ctx.lineTo(27, -30);
  ctx.quadraticCurveTo(10, -12, -20, -15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = teamColor;
  ctx.beginPath();
  ctx.ellipse(24, -28, 17, 7, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = accentColor;
  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(role, 0, -33);

  ctx.fillStyle = "#233047";
  ctx.beginPath();
  ctx.arc(-8, -25, 2.5, 0, Math.PI * 2);
  ctx.arc(8, -25, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, -18, 7, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();

  ctx.restore();
  drawDefenseFielderNameLabel(x, y + bob, name || role, role, isChosen);
}

function drawDefenseFielderNameLabel(x, y, name, role, isChosen) {
  const label = role === "P" ? `投 ${name}` : name;
  ctx.save();
  const rect = getDefenseFielderNameLabelRect(x, y, label, isChosen);

  ctx.fillStyle = isChosen ? "rgba(255, 207, 112, 0.96)" : "rgba(255, 255, 255, 0.92)";
  ctx.strokeStyle = "rgba(35, 48, 71, 0.72)";
  ctx.lineWidth = 2;
  roundRect(rect.x, rect.y, rect.width, rect.height, 7);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#233047";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  fitText(label, rect.x + rect.width / 2, rect.y + rect.height / 2 + 1, rect.width - 12);
  ctx.restore();
}

function getDefenseFielderNameLabelRect(x, y, label, isChosen) {
  const fontSize = isChosen ? 17 : 15;
  ctx.font = `bold ${fontSize}px sans-serif`;
  const textWidth = Math.min(ctx.measureText(label).width, 112);
  const width = textWidth + 18;
  const height = fontSize + 12;
  const visible = getDefenseVisibleWorldBounds();
  const prefersLeft = x + 48 + width > visible.right;
  return {
    x: clamp(prefersLeft ? x - 48 - width : x + 48, visible.left, visible.right - width),
    y: clamp(y - 40, visible.top, visible.bottom - height),
    width,
    height
  };
}

function getDefenseVisibleWorldBounds() {
  const camera = getDefenseCameraOffset();
  return {
    left: -camera.x + 14,
    right: canvas.width - camera.x - 14,
    top: -camera.y + 16,
    bottom: canvas.height - camera.y - 16
  };
}

function drawPlateAndZone() {
  const scale = field.plateScale;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(field.plateX - 36 * scale, field.plateY - 12 * scale);
  ctx.lineTo(field.plateX + 36 * scale, field.plateY - 12 * scale);
  ctx.lineTo(field.plateX + 26 * scale, field.plateY + 22 * scale);
  ctx.lineTo(field.plateX, field.plateY + 42 * scale);
  ctx.lineTo(field.plateX - 26 * scale, field.plateY + 22 * scale);
  ctx.closePath();
  ctx.fill();
}

function drawGoodContactZone() {
  const points = getGoodContactZonePoints();
  ctx.save();
  ctx.fillStyle = "rgba(255, 238, 112, 0.18)";
  ctx.strokeStyle = "rgba(255, 248, 178, 0.32)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawPitcher() {
  const team = fieldingTeam();
  const spriteSet = pitcherSpriteSets[team];
  if (spriteSet.image.complete && spriteSet.image.naturalWidth > 0) {
    drawPitcherSprite(team);
    return;
  }
  drawPlayer(pitcher.x, pitcher.y, 1, "#286ed6", true);
}

function drawPitcherSprite(team) {
  const spriteSet = pitcherSpriteSets[team];
  const frames = spriteSet.frames;
  let frame = frames.set;
  if (pendingPitch) {
    const motionProgress = clamp((performance.now() - pitcher.windupTime) / pitchWindupDuration, 0, 1);
    frame = motionProgress < 0.12 ? frames.set : motionProgress < 0.8 ? frames.windup : frames.release;
  } else if (isPitching) {
    frame = frames.release;
  }
  const drawHeight = frame === frames.release ? 132 : 148;
  const drawWidth = drawHeight * (frame.sw / frame.sh);
  const footY = pitcher.y + 64;
  const drawX = frame === frames.release ? pitcher.x - drawWidth * 0.52 : pitcher.x - drawWidth * 0.5;
  ctx.save();
  if (activePitcher.throws === "L") {
    ctx.translate(pitcher.x * 2, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(spriteSet.image, frame.sx, frame.sy, frame.sw, frame.sh, drawX, footY - drawHeight, drawWidth, drawHeight);
  ctx.restore();
}

function drawBatter() {
  const spriteSet = batterSpriteSets[battingTeam];
  const pose = getBatterPoseLayers()[0].pose;
  const image = getBatterPoseImage(spriteSet, pose);
  if (image.complete && image.naturalWidth > 0) {
    drawBatterSprite(battingTeam);
  } else {
    drawPlayer(batter.x, batter.y, 1.18, "#e04f42", false);
  }
}

function drawHbpHitBox() {
  if (!showHbpHitBox) return;
  const box = getHbpHitBox();
  ctx.save();
  ctx.fillStyle = "rgba(255, 96, 96, 0.12)";
  ctx.strokeStyle = "rgba(255, 96, 96, 0.52)";
  ctx.lineWidth = 2;
  ctx.fillRect(box.left, box.top, box.right - box.left, box.bottom - box.top);
  ctx.strokeRect(box.left, box.top, box.right - box.left, box.bottom - box.top);
  ctx.restore();
}

function drawBatterSprite(team) {
  const spriteSet = batterSpriteSets[team];
  const frames = spriteSet.frames;
  const layers = getBatterPoseLayers();
  ctx.save();
  if (activeBatterSide === "L") {
    ctx.translate(batter.x * 2, 0);
    ctx.scale(-1, 1);
  }
  layers.flatMap(expandBatterPoseLayer).forEach((layer) => {
    const image = getBatterPoseImage(spriteSet, layer.pose);
    const frame = frames[layer.pose];
    const drawHeight = getBatterDrawHeight(layer.pose);
    const drawWidth = drawHeight * (frame.sw / frame.sh);
    const drawX = getBatterDrawX(layer.pose, drawWidth);
    const drawY = batter.y + 58 - drawHeight;
    ctx.globalAlpha = layer.alpha;
    ctx.drawImage(image, frame.sx, frame.sy, frame.sw, frame.sh, drawX, drawY, drawWidth, drawHeight);
  });
  ctx.globalAlpha = 1;
  ctx.restore();
}

function getBatterPoseLayers() {
  if (hbpPose.active) return [{ pose: "hbp", alpha: 1 }];
  if (!swingState.isSwinging) return [{ pose: "stance", alpha: 1 }];
  const elapsed = performance.now() - swingState.startTime;
  if (elapsed < 200) return [{ pose: "stance", alpha: 1 }];
  if (elapsed < 350) return blendPose("swingStart", "swing", (elapsed - 200) / 150);
  if (elapsed < 430) return [{ pose: "swing", alpha: 1 }];
  if (elapsed < swingState.duration) return blendPose("swing", "follow", (elapsed - 430) / (swingState.duration - 430));
  return [{ pose: "follow", alpha: 1 }];
}

function expandBatterPoseLayer(layer) {
  if (layer.pose !== "swingStart") return [layer];
  return [{ pose: "stance", alpha: layer.alpha }];
}

function getBatterPoseImage(spriteSet, pose) {
  if (pose === "hbp") return spriteSet.hbpImage;
  if (pose === "follow") return spriteSet.followImage;
  return spriteSet.image;
}

function blendPose(fromPose, toPose, amount) {
  const alpha = clamp(amount, 0, 1);
  return [
    { pose: fromPose, alpha: 1 - alpha },
    { pose: toPose, alpha }
  ];
}

function getBatterDrawHeight(pose) {
  if (pose === "hbp") return 232;
  if (pose === "follow") return 198;
  if (pose === "swing") return 198;
  return 204;
}

function getBatterDrawX(pose, drawWidth) {
  if (pose === "hbp") return batter.x - drawWidth * 0.56;
  if (pose === "follow") return batter.x - drawWidth * 0.58;
  if (pose === "swing") return batter.x - 70;
  return batter.x - drawWidth * 0.52;
}

function drawPlayer(x, y, scale, uniformColor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#fff2a8";
  ctx.beginPath();
  ctx.arc(0, -45, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = uniformColor;
  ctx.fillRect(-20, -30, 40, 46);
  ctx.restore();
}

function drawBallTrail() {
  for (let i = 0; i < ball.trail.length; i += 1) {
    const p = ball.trail[i];
    const alpha = i / Math.max(1, ball.trail.length);
    const heightOffset = gamePhase === "defense" ? getDefenseBallHeightAtPoint(p.progress ?? 0, p.elapsedSeconds ?? 0) : 0;
    ctx.fillStyle = `rgba(255, 245, 204, ${alpha * 0.42})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y - heightOffset, 3 + alpha * 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBall() {
  if (!ball.active && !isPitching) ctx.globalAlpha = 0.5;
  if (gamePhase === "defense") {
    drawDefenseBall();
    ctx.globalAlpha = 1;
    return;
  }
  const pitch = pitchTypes[currentPitchType];
  ctx.fillStyle = pitch ? pitch.color : "#ffffff";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#bf4331";
  ctx.lineWidth = 2;
  const seam = Math.sin(ball.spin) * 3;
  drawLine(ball.x - 4, ball.y - 2 + seam, ball.x + 4, ball.y + 2 - seam);
  drawLine(ball.x - 4, ball.y + 2 - seam, ball.x + 4, ball.y - 2 + seam);
  ctx.globalAlpha = 1;
}

function drawDefenseBall() {
  const progress = defenseState.active
    ? clamp((performance.now() - defenseState.startTime) / defenseState.duration, 0, 1)
    : 0;
  const elapsedSeconds = defenseState.active ? (performance.now() - defenseState.startTime) / 1000 : 0;
  const heightOffset = getDefenseBallHeightAtPoint(progress, elapsedSeconds);
  const battedBall = defenseState.battedBall;
  const highFlyAmount = getHighFlyVisualAmount(battedBall, heightOffset);
  const visualHeightOffset = getDefenseBallVisualHeightOffset(heightOffset, battedBall);
  const radius = battedBall?.trajectory === "fly" ? ball.radius + 2 - highFlyAmount * 1.8 : ball.radius;
  drawWallImpactEffect(elapsedSeconds, visualHeightOffset);

  if (heightOffset > 4) {
    const shadowAlpha = 0.24 - highFlyAmount * 0.14;
    const shadowWidth = highFlyAmount > 0
      ? radius + 14 + heightOffset * 0.024
      : radius + heightOffset * 0.08;
    ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
    ctx.beginPath();
    ctx.ellipse(ball.x, ball.y + 4, shadowWidth, 5 - highFlyAmount * 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  if (highFlyAmount > 0.18) {
    ctx.save();
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.16 + highFlyAmount * 0.2})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    drawLine(ball.x, ball.y, ball.x, ball.y - visualHeightOffset);
    ctx.setLineDash([]);
    ctx.strokeStyle = `rgba(174, 231, 255, ${0.24 + highFlyAmount * 0.24})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y - visualHeightOffset, radius + 12 + highFlyAmount * 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  if (defenseState.throw?.active) {
    ctx.strokeStyle = "rgba(174, 231, 255, 0.82)";
    ctx.lineWidth = 6;
    drawLine(ball.x - 24, ball.y - visualHeightOffset + 3, ball.x + 12, ball.y - visualHeightOffset - 3);
    ctx.fillStyle = "rgba(174, 231, 255, 0.22)";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y - visualHeightOffset, radius + 8, 0, Math.PI * 2);
    ctx.fill();
  } else if (battedBall?.trajectory === "grounder") {
    ctx.strokeStyle = "rgba(216, 149, 72, 0.55)";
    ctx.lineWidth = 3;
    drawLine(ball.x - 18, ball.y + 8, ball.x + 12, ball.y + 8);
  } else if (battedBall?.trajectory === "liner") {
    ctx.strokeStyle = "rgba(174, 231, 255, 0.42)";
    ctx.lineWidth = 4;
    drawLine(ball.x - 20, ball.y - visualHeightOffset, ball.x + 8, ball.y - visualHeightOffset);
  } else {
    ctx.strokeStyle = `rgba(255, 242, 168, ${0.45 + highFlyAmount * 0.2})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y - visualHeightOffset, radius + 8 + highFlyAmount * 6, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y - visualHeightOffset, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#bf4331";
  ctx.lineWidth = 2;
  const seam = Math.sin(ball.spin) * 3;
  drawLine(ball.x - 4, ball.y - visualHeightOffset - 2 + seam, ball.x + 4, ball.y - visualHeightOffset + 2 - seam);
  drawLine(ball.x - 4, ball.y - visualHeightOffset + 2 - seam, ball.x + 4, ball.y - visualHeightOffset - 2 + seam);
}

function getHighFlyVisualAmount(battedBall, heightOffset) {
  if (!battedBall || battedBall.trajectory !== "fly") return 0;
  const highArc = battedBall.isRoutineFly || battedBall.isToweringFly || battedBall.isFenceEdgeFly || battedBall.isChaseFly || battedBall.isDeep || battedBall.maxHeight >= 320;
  if (!highArc) return 0;
  return clamp(heightOffset / 380, 0, 1);
}

function getDefenseBallVisualHeightOffset(heightOffset, battedBall) {
  const highFlyAmount = getHighFlyVisualAmount(battedBall, heightOffset);
  return heightOffset * (1 + highFlyAmount * 0.42);
}

function drawWallImpactEffect(elapsedSeconds, heightOffset) {
  const battedBall = defenseState.battedBall;
  if (!battedBall?.wallHit) return;
  const impactTime = battedBall.ballTime ?? 0;
  const impactAge = elapsedSeconds - impactTime;
  if (impactAge < 0 || impactAge > 0.5) return;
  const impactPoint = defenseState.landingTarget || battedBall.target;
  const alpha = 1 - impactAge / 0.5;
  ctx.save();
  ctx.strokeStyle = `rgba(255, 242, 168, ${0.85 * alpha})`;
  ctx.fillStyle = `rgba(255, 111, 97, ${0.22 * alpha})`;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(impactPoint.x, impactPoint.y - heightOffset, 22 + impactAge * 46, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.72 * alpha})`;
  ctx.lineWidth = 3;
  drawLine(impactPoint.x - 34, impactPoint.y - heightOffset, impactPoint.x + 34, impactPoint.y - heightOffset);
  drawLine(impactPoint.x, impactPoint.y - heightOffset - 30, impactPoint.x, impactPoint.y - heightOffset + 30);
  ctx.restore();
}

function getDefenseBallHeightAtPoint(progress, elapsedSeconds = 0) {
  const throwState = defenseState.throw;
  if (throwState && elapsedSeconds >= throwState.startTime) {
    return getDefenseThrowHeight(elapsedSeconds);
  }

  const trajectory = defenseState.battedBall?.trajectory;
  const battedBall = defenseState.battedBall;
  if (defenseState.outcome?.caught && !defenseState.outcome?.needsThrow) {
    const fieldingTime = Math.max(0.1, defenseState.outcome.fieldingTime ?? battedBall?.ballTime ?? 1);
    const catchProgress = clamp(elapsedSeconds / fieldingTime, 0, 1);
    if (trajectory === "grounder") return Math.abs(Math.sin(catchProgress * Math.PI * 8)) * 8;
    return getBattedBallFlightHeight(catchProgress, battedBall);
  }
  if (defenseState.outcome && (!defenseState.outcome.caught || defenseState.outcome.needsThrow)) {
    const ballTime = Math.max(0.1, battedBall?.ballTime ?? defenseState.duration / 1000);
    if (elapsedSeconds <= ballTime) {
      const t = clamp(elapsedSeconds / ballTime, 0, 1);
      if (trajectory === "grounder") return Math.abs(Math.sin(t * Math.PI * 7)) * 8;
      if (battedBall?.wallHit) return getWallHitFlightHeight(t, battedBall);
      return getBattedBallFlightHeight(t, battedBall);
    }
    if (battedBall?.wallHit) return getWallHitAfterImpactHeight(elapsedSeconds - ballTime, battedBall);
    if (battedBall?.fenceOver) return 0;
    const rollT = getDefenseRollProgress(elapsedSeconds, ballTime);
    return getPostLandingBounceHeight(rollT, battedBall);
  }
  if (trajectory === "grounder") return Math.abs(Math.sin(progress * Math.PI * 8)) * 8;
  return getBattedBallFlightHeight(progress, battedBall);
}

function getBattedBallFlightHeight(progress, battedBall) {
  if (!battedBall) return 0;
  const t = clamp(progress, 0, 1);
  return getParabolicArcHeight(t, battedBall.maxHeight ?? 120);
}

function getPostLandingBouncePhase(rollProgress, battedBall) {
  const t = clamp(rollProgress, 0, 1);
  const bounceCount = battedBall?.isSoftDrop ? 1.8 : battedBall?.isLiner ? 2.15 : 2.35;
  return Math.abs(Math.sin(t * Math.PI * bounceCount));
}

function getPostLandingBounceVisualPhase(rollProgress, battedBall) {
  const t = clamp(rollProgress, 0, 1);
  const lateRollDamping = Math.pow(1 - t, 1.65);
  return getPostLandingBouncePhase(t, battedBall) * lateRollDamping;
}

function getPostLandingBounceHeight(rollProgress, battedBall) {
  const t = clamp(rollProgress, 0, 1);
  const bounceHeight = battedBall?.isSoftDrop ? 20 : battedBall?.isLiner ? 17 : 13;
  const damping = Math.pow(1 - t, 3.35);
  return getPostLandingBouncePhase(t, battedBall) * bounceHeight * damping;
}

function getWallHitFlightHeight(progress, battedBall) {
  const t = clamp(progress, 0, 1);
  const arcHeight = getBattedBallFlightHeight(t, battedBall);
  return Math.max(arcHeight, (battedBall.wallImpactHeight ?? 90) * t);
}

function getWallHitAfterImpactHeight(secondsAfterImpact, battedBall) {
  const t = clamp(secondsAfterImpact / 0.42, 0, 1);
  const slideHeight = (battedBall.wallImpactHeight ?? 90) * Math.pow(1 - t, 3);
  const bounce = Math.abs(Math.sin(t * Math.PI * 2.4)) * 5 * Math.pow(1 - t, 1.6);
  return slideHeight + bounce;
}

function getBattedBallHeightAtDistance(distanceAlongFlight, battedBall) {
  if (!battedBall || battedBall.flightDistance <= 0) return 0;
  return getBattedBallFlightHeight(distanceAlongFlight / battedBall.flightDistance, battedBall);
}

function getDefenseThrowHeight(elapsedSeconds) {
  const throwState = defenseState.throw;
  if (!throwState) return 0;
  const t = clamp((elapsedSeconds - throwState.startTime) / throwState.throwTime, 0, 1);
  return getParabolicArcHeight(t, throwState.arcHeight ?? 42);
}

function getParabolicArcHeight(t, maxHeight) {
  const clamped = clamp(t, 0, 1);
  return Math.max(0, maxHeight * 4 * clamped * (1 - clamped));
}

function drawSwingEffect() {
  if (!swingState.isSwinging) return;
  drawBatDebugPath();
  const progress = getSwingProgress();
  ctx.strokeStyle = `rgba(255, 242, 168, ${1 - progress * 0.7})`;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(batter.x + (activeBatterSide === "R" ? -68 : 68), batter.y - 50, 88, Math.PI * 1.03, Math.PI * (1.64 + progress * 0.25));
  ctx.stroke();
}

function drawBatDebugPath() {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const current = getBatSegment();
  const hitWidth = getVisibleBatHitWidth();
  const sweetSpot = getSweetSpotSegment(current);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.055)";
  ctx.lineWidth = hitWidth;
  drawLine(current.x1, current.y1, current.x2, current.y2);

  ctx.strokeStyle = "rgba(255, 214, 102, 0.22)";
  ctx.lineWidth = hitWidth + 4;
  drawLine(sweetSpot.x1, sweetSpot.y1, sweetSpot.x2, sweetSpot.y2);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 3;
  drawLine(current.x1, current.y1, current.x2, current.y2);

  ctx.strokeStyle = "rgba(35, 48, 71, 0.18)";
  ctx.lineWidth = 1.2;
  drawLine(current.x1, current.y1, current.x2, current.y2);
  ctx.restore();
}

function getVisibleBatHitWidth() {
  const inGoodContactZone = isBallInGoodContactZone();
  const outsideStrikeZone = distanceToHomePlate(ball.x, ball.y, ball.radius) > 0;
  const meetBonus = (activeBatter.meet - 5) * 3;
  return Math.max(14, ((inGoodContactZone ? ball.radius + 48 : outsideStrikeZone ? ball.radius + 18 : ball.radius + 28) + meetBonus) * batThicknessMultiplier);
}

function getSweetSpotSegment(segment) {
  const center = 0.68;
  const halfWidth = getSweetSpotHalfWidth("visual");
  const start = clamp(center - halfWidth, 0, 1);
  const end = clamp(center + halfWidth, 0, 1);
  return {
    x1: segment.x1 + (segment.x2 - segment.x1) * start,
    y1: segment.y1 + (segment.y2 - segment.y1) * start,
    x2: segment.x1 + (segment.x2 - segment.x1) * end,
    y2: segment.y1 + (segment.y2 - segment.y1) * end
  };
}

function drawHud() {
  drawPanel(18, 18, 360, 126, "#233047");
  ctx.fillStyle = "#fff2a8";
  ctx.font = "bold 24px monospace";
  ctx.fillText(gameMode === "single" ? "MODE: 1人用" : "MODE: 2人用", 38, 52);
  ctx.fillStyle = "#f8f3d8";
  ctx.font = "bold 22px monospace";
  ctx.fillText(`${inning}${half === "top" ? "表" : "裏"}  A ${scores.away} - B ${scores.home}`, 38, 86);
  ctx.fillText(`S ${Math.min(count.strikes, 2)}  B ${Math.min(count.balls, 3)}  O ${Math.min(count.outs, 2)}`, 38, 120);
  drawBaseRunnerIndicator(306, 78);
  if (gamePhase === "defense") drawDefenseHud();
}

function drawBaseRunnerIndicator(x, y) {
  const size = 17;
  drawHudBaseDiamond(x, y - 22, size, Boolean(bases.second));
  drawHudBaseDiamond(x + 24, y + 2, size, Boolean(bases.first));
  drawHudBaseDiamond(x - 24, y + 2, size, Boolean(bases.third));
}

function drawHudBaseDiamond(x, y, size, occupied) {
  const half = size / 2;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y - half);
  ctx.lineTo(x + half, y);
  ctx.lineTo(x, y + half);
  ctx.lineTo(x - half, y);
  ctx.closePath();
  ctx.fillStyle = occupied ? "#d7372f" : "#3d4b52";
  ctx.strokeStyle = occupied ? "#ffb3a8" : "#9eaeb3";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawDefenseHud() {
  if (!defenseState.active) return;
  drawMiniDefenseField(1010, 104, 240, 176);
}

function drawMiniDefenseField(x, y, width, height) {
  const home = defenseField.bases.home;
  const project = (point) => {
    const outDepth = home.y - point.y;
    return {
      x: clamp(x + width / 2 + ((point.x - home.x) / defenseField.fenceDistance) * width * 0.48, x + 12, x + width - 12),
      y: clamp(y + height - 20 - (outDepth / defenseField.fenceDistance) * (height - 38), y + 12, y + height - 12)
    };
  };
  const basePoints = {
    home: project(defenseField.bases.home),
    first: project(defenseField.bases.first),
    second: project(defenseField.bases.second),
    third: project(defenseField.bases.third)
  };

  ctx.save();
  ctx.fillStyle = "rgba(18, 32, 42, 0.88)";
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 242, 168, 0.75)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "rgba(92, 168, 91, 0.72)";
  ctx.beginPath();
  ctx.arc(x + width / 2, y + height - 18, width * 0.52, Math.PI, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(216, 149, 72, 0.78)";
  ctx.beginPath();
  ctx.moveTo(basePoints.home.x, basePoints.home.y);
  ctx.lineTo(basePoints.first.x, basePoints.first.y);
  ctx.lineTo(basePoints.second.x, basePoints.second.y);
  ctx.lineTo(basePoints.third.x, basePoints.third.y);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(basePoints.home.x, basePoints.home.y);
  ctx.lineTo(basePoints.first.x, basePoints.first.y);
  ctx.lineTo(basePoints.second.x, basePoints.second.y);
  ctx.lineTo(basePoints.third.x, basePoints.third.y);
  ctx.closePath();
  ctx.stroke();

  Object.values(basePoints).forEach((base) => {
    ctx.fillStyle = "#fff8df";
    ctx.beginPath();
    ctx.rect(base.x - 4, base.y - 4, 8, 8);
    ctx.fill();
  });

  defenseState.fielders.forEach((fielder) => {
    const p = project({ x: fielder.currentX ?? fielder.x, y: fielder.currentY ?? fielder.y });
    const chosen = fielder.role === defenseState.chosenFielder?.role;
    ctx.fillStyle = chosen ? "#ffe374" : "#aee7ff";
    ctx.strokeStyle = "#102833";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(p.x, p.y, chosen ? 7 : 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#102833";
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(fielder.role, p.x, p.y);
  });

  if (defenseState.baseRunners?.length) {
    defenseState.baseRunners.forEach((runner) => {
      const runnerPoint = project(runner);
      ctx.fillStyle = runner.scored && runner.arrived ? "#ffcf70" : "#ff9f43";
      ctx.strokeStyle = "#102833";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(runnerPoint.x, runnerPoint.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#102833";
      ctx.font = "bold 9px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(runner.scored ? "H" : "R", runnerPoint.x, runnerPoint.y);
    });
  }

  if (defenseState.runner) {
    const runnerPoint = project(defenseState.runner);
    ctx.fillStyle = "#ff6f61";
    ctx.strokeStyle = "#102833";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(runnerPoint.x, runnerPoint.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  if (ball.active) {
    const ballPoint = project(ball);
    ctx.fillStyle = "#fff2a8";
    ctx.strokeStyle = "#102833";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballPoint.x, ballPoint.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function getDefensePredictionLabel(outcome) {
  if (!outcome) return "---";
  if (outcome.label === "フェンス直撃" && outcome.scoreType === "double") return "フェンス直撃 2ベース";
  if (outcome.scoreType && scoringHitTypes.has(outcome.scoreType)) return getHitLabelByScoreType(outcome.scoreType);
  return outcome.label;
}

function getDefenseStateLabel(elapsedSeconds) {
  const outcome = defenseState.outcome;
  const throwState = defenseState.throw;
  if (throwState) {
    if (elapsedSeconds < throwState.startTime) return "捕球へ走る";
    if (elapsedSeconds <= throwState.endTime) return `${throwState.baseLabel}へ送球中`;
    return throwState.safe ? `${throwState.baseLabel}セーフ` : `${throwState.baseLabel}アウト`;
  }
  if (outcome.kind === "out") return "フライ/ライナー捕球";
  if (outcome.kind === "homer") return "ホームラン";
  if (outcome.label === "フェンス直撃") return "フェンス直撃";
  return "打球処理中";
}

function drawPlayersInfo() {
  drawPitcherGameCard(
    pitcher.x + 105,
    pitcher.y + 28,
    activePitcher
  );
  drawBatterGameCard(
    canvas.width - 356,
    canvas.height - 130,
    activeBatter
  );
}

function drawPitcherGameCard(x, y, player) {
  const width = 344;
  const height = 224;
  const safeX = clamp(x, 18, canvas.width - width - 18);
  const safeY = clamp(y, 100, canvas.height - height - 18);
  drawAbilityCardFrame(safeX, safeY, width, height, "投手能力", player.name, "#3787bd");
  drawGameStatRow(safeX + 16, safeY + 54, 150, "球速", `${player.fastKmh} km/h`);
  drawGameStatRow(safeX + 182, safeY + 54, 144, "制球", player.control ?? 5);
  drawGameStatRow(safeX + 182, safeY + 84, 144, "球威", player.stuff ?? 5);
  drawGamePitchCross(safeX + 72, safeY + 106, player);
}

function drawBatterGameCard(x, y, player) {
  const width = 300;
  const height = 118;
  const safeX = clamp(x, 18, canvas.width - width - 18);
  const safeY = clamp(y, 100, canvas.height - height - 18);
  drawAbilityCardFrame(safeX, safeY, width, height, "打者能力", player.name, "#d84e5f");
  drawGameStatRow(safeX + 16, safeY + 56, 126, "パワー", player.power);
  drawGameStatRow(safeX + 158, safeY + 56, 126, "ミート", player.meet);
  drawGameStatRow(safeX + 16, safeY + 86, 126, "走塁", player.run);
  drawGameStatRow(safeX + 158, safeY + 86, 126, "打席", handLabel(activeBatterSide));
}

function drawAbilityCardFrame(x, y, width, height, role, name, headerColor) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(x + 5, y + 5, width, height);
  ctx.fillStyle = "rgba(248, 251, 255, 0.96)";
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "#78acd0";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = headerColor;
  ctx.fillRect(x, y, width, 40);
  ctx.strokeStyle = "#78acd0";
  ctx.lineWidth = 3;
  drawLine(x, y + 40, x + width, y + 40);
  ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
  roundRect(x + 10, y + 8, 76, 24, 6);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText(role, x + 18, y + 26);
  ctx.font = "bold 24px sans-serif";
  fitText(name, x + 98, y + 28, width - 112);
}

function drawGameStatRow(x, y, width, label, value) {
  ctx.fillStyle = "#eaf6ff";
  roundRect(x, y, width, 24, 7);
  ctx.fill();
  ctx.strokeStyle = "#b8d8ea";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#233047";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText(label, x + 8, y + 16);
  ctx.textAlign = "right";
  ctx.font = "bold 17px sans-serif";
  ctx.fillText(String(value), x + width - 8, y + 18);
  ctx.textAlign = "left";
}

function drawGamePitchCross(x, y, player) {
  drawCrossCell(x + 66, y, 66, 32, "減速", player.slowChange);
  drawCrossCell(x, y + 38, 66, 32, "左", player.leftBreak);
  ctx.fillStyle = "#3787bd";
  roundRect(x + 72, y + 38, 54, 32, 8);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("変化", x + 85, y + 59);
  drawCrossCell(x + 132, y + 38, 66, 32, "右", player.rightBreak);
  drawCrossCell(x + 66, y + 76, 66, 32, "加速", player.fastChange);
}

function drawCrossCell(x, y, width, height, label, value) {
  ctx.fillStyle = "#ffffff";
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.strokeStyle = "#a9cce2";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#39749b";
  ctx.font = "bold 12px sans-serif";
  ctx.fillText(label, x + 8, y + 20);
  ctx.textAlign = "right";
  ctx.fillStyle = "#213a56";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText(String(value), x + width - 8, y + 23);
  ctx.textAlign = "left";
}

function drawMiniHelp() {
  drawPanel(18, 736, 300, 92, "rgba(255, 240, 184, 0.9)");
  ctx.fillStyle = "#233047";
  ctx.font = "bold 15px sans-serif";
  ctx.fillText("投手: 5/8/2投球 4/6左右 1/3速度", 34, 766);
  ctx.fillText("打者: マウス移動 左クリック", 34, 794);
  ctx.fillText("Enter: 次の投球", 34, 818);
}

function drawHitEffect() {
  if (!hitEffect.active) return;
  const t = (performance.now() - hitEffect.startTime) / 1000;
  ctx.save();
  ctx.globalAlpha = 1 - t * 0.34;
  ctx.fillStyle = hitEffect.color;
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 7;
  ctx.font = "bold 58px sans-serif";
  ctx.textAlign = "center";
  ctx.strokeText(hitEffect.text, field.centerX, 390 - t * 52);
  ctx.fillText(hitEffect.text, field.centerX, 390 - t * 52);
  ctx.restore();
}

function drawPanel(x, y, width, height, color) {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(x + 5, y + 5, width, height);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "#f3d57c";
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, width, height);
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function roundRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function fitText(text, x, y, maxWidth) {
  let fontSize = 24;
  ctx.font = `bold ${fontSize}px sans-serif`;
  while (ctx.measureText(text).width > maxWidth && fontSize > 15) {
    fontSize -= 1;
    ctx.font = `bold ${fontSize}px sans-serif`;
  }
  ctx.fillText(text, x, y);
}

function distancePointToSegment(px, py, x1, y1, x2, y2) {
  return closestPointOnSegment(px, py, x1, y1, x2, y2).distance;
}

function closestPointOnSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;
  if (lengthSq === 0) return { distance: Math.hypot(px - x1, py - y1), t: 0 };
  const t = clamp(((px - x1) * dx + (py - y1) * dy) / lengthSq, 0, 1);
  return { distance: Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy)), t };
}

function getSweetSpotScore(t) {
  const center = 0.68;
  const halfWidth = getSweetSpotHalfWidth("score");
  return clamp(1 - Math.abs(t - center) / halfWidth, 0, 1);
}

function getSweetSpotHalfWidth(type) {
  const meetDelta = (activeBatter?.meet ?? 5) - 5;
  const base = type === "visual" ? sweetSpotTuning.visualBaseHalfWidth : sweetSpotTuning.scoreBaseHalfWidth;
  const step = type === "visual" ? sweetSpotTuning.visualMeetStep : sweetSpotTuning.scoreMeetStep;
  const min = type === "visual" ? sweetSpotTuning.visualMinHalfWidth : sweetSpotTuning.minHalfWidth;
  return clamp(base + meetDelta * step, min, sweetSpotTuning.maxHalfWidth);
}

function normalize(vector) {
  const length = Math.hypot(vector.x, vector.y) || 1;
  return { x: vector.x / length, y: vector.y / length };
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function batterAngleToCanvasRadians(degreesFromUp) {
  return degreesToRadians(degreesFromUp - 90);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function updateMouseAim(event) {
  const point = getCanvasPoint(event);
  mouseAim = { active: true, x: point.x, y: point.y };
}

function getCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height)
  };
}

function gameLoop(time) {
  const delta = Math.min(40, time - lastFrameTime);
  lastFrameTime = time;
  update(delta);
  draw();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
  unlockBgmAfterUserGesture();
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) event.preventDefault();
  keysDown.add(event.code);
  keysDown.add(event.key);
  if (!event.repeat && event.code === "Space" && gamePhase === "playing" && isPlayerBatting()) swingBat();
  if (!event.repeat && event.code === "ArrowUp" && gamePhase === "defense") handleBatterRunnerBaseCommand("second");
  if (!event.repeat && event.code === "ArrowLeft" && gamePhase === "defense") handleBatterRunnerBaseCommand("third");
  if (!event.repeat && event.code === "ArrowDown" && gamePhase === "defense") handleBatterRunnerBaseCommand("home");
  if (!event.repeat && event.code === "ArrowRight" && gamePhase === "defense") handleBatterRunnerBaseCommand("first");
  if (event.code === "Enter") nextPitch();
  if (event.key === "r" || event.key === "R") showMenu();
  if (event.key === "o" || event.key === "O") {
    modeSelect.value = "single";
    if (gamePhase !== "menu") switchLiveMode("single");
  }
  if (event.key === "t" || event.key === "T") {
    modeSelect.value = "versus";
    if (gamePhase !== "menu") switchLiveMode("versus");
  }
  if (isPlayerPitching() && event.key === "7") movePitcherOnPlate(-1);
  if (isPlayerPitching() && event.key === "9") movePitcherOnPlate(1);
  if (isPlayerPitching() && event.key === "5") startPitch("normal");
  if (isPlayerPitching() && event.key === "8") startPitch("slow");
  if (isPlayerPitching() && event.key === "2") startPitch("fast");
});

window.addEventListener("pointerdown", (event) => {
  if (bgmToggleButtons.includes(event.target)) return;
  unlockBgmAfterUserGesture();
});

window.addEventListener("keyup", (event) => {
  keysDown.delete(event.code);
  keysDown.delete(event.key);
  const key = event.code.startsWith("Digit") || event.code.startsWith("Numpad") ? event.code.slice(-1) : event.key;
  releasePitchControlLockout(key);
});

window.addEventListener("blur", () => {
  keysDown.clear();
  releasePitchControlLockout();
});

document.addEventListener?.("visibilitychange", () => {
  if (document.hidden) {
    keysDown.clear();
    releasePitchControlLockout();
  }
});

canvas.addEventListener("mousemove", (event) => {
  if (gamePhase !== "playing" || !isPlayerBatting()) return;
  updateMouseAim(event);
});

canvas.addEventListener("mouseleave", () => {
  mouseAim.active = false;
});

canvas.addEventListener("mousedown", (event) => {
  if (event.button !== 0) return;
  if (gamePhase !== "playing" || !isPlayerBatting()) return;
  event.preventDefault();
  updateMouseAim(event);
  swingBat();
});

function switchLiveMode(mode) {
  gameMode = mode;
  scheduleNextPitch(700);
  message = mode === "single" ? "1人用に変更" : "2人用に変更";
}

startButton.addEventListener("click", startGame);
menuButton.addEventListener("click", showMenu);
soundToggleButtons.forEach((button) => button.addEventListener("click", toggleSoundEffects));
bgmToggleButtons.forEach((button) => button.addEventListener("click", handleBgmButtonClick));
menuPlayerCards.forEach((card) => {
  const picker = card.querySelector(".position-picker");
  const openCardChooser = () => openPlayerChooser(card);
  card.addEventListener("click", openCardChooser);
  card.addEventListener("keydown", (event) => {
    if (event.code !== "Enter" && event.code !== "Space") return;
    event.preventDefault();
    openCardChooser();
  });
  picker.addEventListener("click", (event) => {
    event.stopPropagation();
    openCardChooser();
  });
});
chooserClose.addEventListener("click", closePlayerChooser);
chooserOptions.addEventListener("click", (event) => {
  const option = event.target.closest(".chooser-option");
  if (!option) return;
  selectMenuPlayer(option);
});
populateSelects();
updateAudioToggleButtons();
showMenu();
setTimeout(() => updateCurrentBgm(true), 0);
requestAnimationFrame(gameLoop);
