const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const shell = document.querySelector(".game-shell");
const menu = document.getElementById("startMenu");
const menuButton = document.getElementById("menuButton");
const startButton = document.getElementById("startButton");
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
  shoeLimitOffsetY: -12
};

const showHbpHitBox = false;

const batters = [
  { id: "otani", name: "オオタニ", bats: "L", power: 8, meet: 6, run: 8, fielding: 5, arm: 5, cost: 5 },
  { id: "ichiro", name: "イチロー", bats: "L", power: 3, meet: 10, run: 10, fielding: 5, arm: 5, cost: 5 },
  { id: "sato", name: "サトウ", bats: "L", power: 6, meet: 5, run: 5, fielding: 5, arm: 5, cost: 5 },
  { id: "schwarber", name: "シュワバー", bats: "L", power: 9, meet: 3, run: 3, fielding: 5, arm: 5, cost: 5 },
  { id: "suzuki", name: "スズキ", bats: "R", power: 6, meet: 5, run: 6, fielding: 5, arm: 5, cost: 5 },
  { id: "judge", name: "ジャッジ", bats: "R", power: 9, meet: 7, run: 6, fielding: 5, arm: 5, cost: 5 },
  { id: "ruth", name: "ルース", bats: "R", power: 10, meet: 8, run: 4, fielding: 5, arm: 5, cost: 5 }
];

const pitchers = [
  { id: "shohei", name: "ショウヘイ", throws: "R", fastKmh: 163, rightBreak: 7, leftBreak: 2, slowChange: 5, fastChange: 2, control: 3, stuff: 4, fielding: 5, cost: 5 },
  { id: "yamamoto", name: "ヤマモト", throws: "R", fastKmh: 157, rightBreak: 6, leftBreak: 3, slowChange: 2, fastChange: 7, control: 8, stuff: 7, fielding: 5, cost: 5 },
  { id: "saiki", name: "サイキ", throws: "R", fastKmh: 155, rightBreak: 5, leftBreak: 2, slowChange: 8, fastChange: 2, control: 6, stuff: 5, fielding: 5, cost: 5 },
  { id: "kershaw", name: "カーショウ", throws: "L", fastKmh: 148, rightBreak: 4, leftBreak: 8, slowChange: 6, fastChange: 4, control: 8, stuff: 5, fielding: 5, cost: 5 },
  { id: "hikari", name: "ヒカリ", throws: "L", fastKmh: 250, rightBreak: 1, leftBreak: 1, slowChange: 9, fastChange: 1, control: 1, stuff: 5, fielding: 5, cost: 5 },
  { id: "magari", name: "マガリ", throws: "R", fastKmh: 90, rightBreak: 10, leftBreak: 10, slowChange: 10, fastChange: 10, control: 10, stuff: 3, fielding: 5, cost: 5 }
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
const pitchSpeedChangeEffect = 0.7;
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
const defaultMenuSelection = {
  away: { pitcher: "shohei", L: "otani", C: "ichiro", R: "suzuki" },
  home: { pitcher: "yamamoto", L: "schwarber", C: "judge", R: "ruth" }
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

const defenseThrowResultHoldSeconds = 0.55;
const defenseThrowSetSeconds = 0.42;
const batterRunnerSpeedScale = 1.5;

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
let mouseAim = { active: false, x: 0, y: 0 };
let lastFrameTime = performance.now();

const sounds = {
  swing: new Audio("audio/swing.wav"),
  hit: new Audio("audio/hit2.mp3")
};

Object.values(sounds).forEach((sound) => {
  sound.preload = "auto";
  sound.volume = 0.75;
});

const hitLabels = {
  single: "ヒット",
  double: "ツーベース",
  triple: "スリーベース",
  homer: "ホームラン",
  grounder: "内野ゴロ",
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
    throw: null,
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
  return (findById(pitchers, selection.pitcher).cost ?? 5)
    + (findById(batters, selection.L).cost ?? 5)
    + (findById(batters, selection.C).cost ?? 5)
    + (findById(batters, selection.R).cost ?? 5);
}

function updateMenuPointStatus() {
  if (!menuPointStatus) return;
  const awayCost = getMenuTeamCost("away");
  const homeCost = getMenuTeamCost("home");
  const isOver = awayCost > 30 || homeCost > 30;
  menuPointStatus.textContent = `獲得ポイント  チームA ${awayCost}/30  |  チームB ${homeCost}/30`;
  menuPointStatus.classList.toggle("over-limit", isOver);
  startButton.disabled = isOver;
}

function openPlayerChooser(card) {
  const team = card.dataset.team;
  const role = card.dataset.role;
  const list = card.dataset.kind === "pitcher" ? pitchers : batters;
  const roleLabel = role === "pitcher" ? "投手" : role === "L" ? "レフト" : role === "C" ? "センター" : "ライト";
  chooserTitle.textContent = `${teamLabel(team)} ${roleLabel}`;
  chooserOptions.innerHTML = list.map((player) => `
    <button class="chooser-option${player.id === menuSelection[team][role] ? " selected" : ""}${isMenuPlayerUnavailable(team, role, card.dataset.kind, player.id) ? " unavailable" : ""}" type="button" data-team="${team}" data-role="${role}" data-player-id="${player.id}" data-kind="${card.dataset.kind}" ${isMenuPlayerUnavailable(team, role, card.dataset.kind, player.id) ? "disabled" : ""}>
      <strong>${player.name}</strong>
      <span>${card.dataset.kind === "pitcher"
        ? `球速 ${player.fastKmh} / 制球 ${player.control} / 球威 ${player.stuff} / 守備 ${player.fielding ?? 5}`
        : `パ ${player.power} / ミ ${player.meet} / 走 ${player.run} / 守 ${player.fielding ?? 5} / 肩 ${player.arm ?? 5}`}</span>
      <em>${player.cost ?? 5}pt</em>
    </button>
  `).join("");
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

function updateMenuAbilityPanels() {
  renderPitcherPanel(findById(pitchers, menuSelection.away.pitcher), awayPitcherName, awayPitcherStats);
  renderBatterPanel(findById(batters, menuSelection.away.L), awayBatterLName, awayBatterLStats);
  renderBatterPanel(findById(batters, menuSelection.away.C), awayBatterCName, awayBatterCStats);
  renderBatterPanel(findById(batters, menuSelection.away.R), awayBatterRName, awayBatterRStats);
  renderPitcherPanel(findById(pitchers, menuSelection.home.pitcher), homePitcherName, homePitcherStats);
  renderBatterPanel(findById(batters, menuSelection.home.L), homeBatterLName, homeBatterLStats);
  renderBatterPanel(findById(batters, menuSelection.home.C), homeBatterCName, homeBatterCStats);
  renderBatterPanel(findById(batters, menuSelection.home.R), homeBatterRName, homeBatterRStats);
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
    statRow("獲得", player.cost ?? 5)
  ].join("");
}

function renderPitcherPanel(player, nameElement, statsElement) {
  nameElement.textContent = `${player.name} ${handLabel(player.throws)}`;
  statsElement.innerHTML = [
    speedRow("球速", player.fastKmh),
    pitchCross(player),
    statRow("制球", player.control),
    statRow("球威", player.stuff),
    statRow("守備", player.fielding ?? 5),
    statRow("獲得", player.cost ?? 5)
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
  if (getMenuTeamCost("away") > 30 || getMenuTeamCost("home") > 30) {
    message = "獲得ポイントは各チーム30以内";
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
  const controlSpread = 1 + (10 - control) * 0.18;
  const targetSpread = (options.targetSpread ?? (course.direction === 0 ? pitch.targetSpread : 8)) * controlSpread;
  const targetX = (options.targetX ?? (field.plateX + course.offset)) + randomBetween(-targetSpread, targetSpread);
  const targetY = (options.targetY ?? field.plateY) + randomBetween(-30, 34) * controlSpread;
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

function updateBatter() {
  const box = getBatterMoveBox();
  if (mouseAim.active) {
    batter.x = mouseAim.x;
    batter.y = mouseAim.y;
  }
  batter.x = clamp(batter.x, box.left, box.right);
  batter.y = clamp(batter.y, box.top, box.bottom);
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
  const left = isKeyHeld("4");
  const right = isKeyHeld("6");
  if (left === right) return 0;
  return left ? -1 : 1;
}

function getHeldSpeedChangeDirection() {
  const slow = isKeyHeld("1");
  const fast = isKeyHeld("3");
  if (slow === fast) return 0;
  return slow ? -1 : 1;
}

function isKeyHeld(key) {
  return keysDown.has(key) || keysDown.has(`Digit${key}`) || keysDown.has(`Numpad${key}`);
}

function checkSwingContact() {
  const bestHit = findBestSwingContact();
  if (!bestHit) return;
  const contact = buildContactProfile(bestHit);
  if (!contact.isContact) return;

  swingState.madeContact = true;
  playSound("hit");
  const result = decideHitResult(contact);
  result.direction = result.popupFly
    ? getPopupFlyDirection(contact.timeDiff)
    : result.routineFly
    ? getRoutineFlyDirection(contact.timeDiff)
    : result.frontDrop
    ? getFrontDropDirection(contact.timeDiff)
    : result.grounderGap || result.gapLiner
    ? getInfieldGapGrounderDirection(contact.timeDiff)
    : getHitDirection(contact.timeDiff, result.kind === "foul");
  if ((result.kind === "hit" || result.kind === "out") && !isFairDirection(result.direction)) {
    result.label = hitLabels.foul;
    result.kind = "foul";
    result.power = Math.min(result.power, 0.32);
  }
  finishPitch(result.label, result.kind, result.power, contact.timeDiff, result.direction);
}

function playSound(name) {
  const sound = sounds[name];
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
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
  const contactRange = ((inGoodContactZone ? ball.radius + 48 : outsideStrikeZone ? ball.radius + 18 : ball.radius + 28) + meetBonus) * batThicknessMultiplier;

  const timeDiff = performance.now() - ball.plateTime;
  const timingScore = Math.max(0, 1 - Math.abs(timeDiff) / (360 + activeBatter.meet * 7));
  // 判定バットを太くした分、快打評価では中心線からの距離を少し戻す。
  const effectiveBatDistance = distanceToBat / batThicknessMultiplier;
  const barrelScore = Math.max(0, 1 - effectiveBatDistance / (64 + activeBatter.meet * 3));
  const sweetSpotScore = getSweetSpotScore(bestHit.batContact.t);
  const plateDistance = distanceToGoodContactZone(bestHit.x, bestHit.y, ball.radius);
  const zoneReach = 46 + activeBatter.meet * 10;
  const zoneScore = inGoodContactZone ? 1 : clamp(1 - plateDistance / zoneReach, 0, 1);
  const chasePenalty = inGoodContactZone ? 0 : clamp(plateDistance / (74 + activeBatter.meet * 9), 0, outsideStrikeZone ? 0.72 : 0.58);
  const stuffPenalty = ((activePitcher.stuff ?? 5) - 5) * 0.025;
  const edgePenalty = outsideStrikeZone ? 0.22 : !inGoodContactZone ? 0.12 : strikeZoneDistance > -ball.radius * 0.5 ? 0.07 : 0;
  const lowMeetPressure = clamp((10 - activeBatter.meet) / 7, 0, 1);
  const sweetSpotMiss = 1 - sweetSpotScore;
  const sweetSpotPenalty = sweetSpotMiss * (inGoodContactZone ? 0.14 : 0.3)
    + Math.pow(sweetSpotMiss, 1.25) * lowMeetPressure * (inGoodContactZone ? 0.28 : 0.44);
  const lowMeetQualityDrag = sweetSpotMiss * lowMeetPressure * 0.16;
  const quality = clamp(timingScore * 0.38 + barrelScore * 0.22 + sweetSpotScore * 0.18 + zoneScore * 0.22 + 0.06 + (inGoodContactZone ? 0.3 : 0) - chasePenalty - stuffPenalty - edgePenalty - sweetSpotPenalty - lowMeetQualityDrag, 0, 1);
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
    quality
  };
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
  const {
    timeDiff,
    quality,
    zoneScore,
    plateDistance,
    outsideStrikeZone,
    sweetSpotScore,
    inGoodContactZone
  } = contact;
  const abs = Math.abs(timeDiff);
  const power = activeBatter.power;
  const meet = activeBatter.meet;
  const stuffPressure = ((activePitcher.stuff ?? 5) - 5) * 0.025;
  const chasePenalty = inGoodContactZone ? 0 : (1 - zoneScore) * 0.42 + (outsideStrikeZone ? 0.3 : 0.16);
  const timingPenalty = abs > 260 ? 0.18 : abs > 150 ? 0.08 : 0;
  const powerBoost = (power - 5) * 0.035;
  const meetBoost = (meet - 5) * 0.018;
  const zoneReward = inGoodContactZone ? 0.12 : 0;
  const readableQuality = clamp(quality + powerBoost + meetBoost + zoneReward - stuffPressure - chasePenalty - timingPenalty, 0, 1);
  const missLuck = Math.random();
  const lowMeetPressure = clamp((10 - meet) / 7, 0, 1);
  const sweetSpotMiss = 1 - sweetSpotScore;

  if (lowMeetPressure > 0.35 && sweetSpotMiss > 0.42 && missLuck < lowMeetPressure * sweetSpotMiss * 0.72) {
    return missLuck < 0.62 ? { label: hitLabels.grounder, kind: "out", power: 0.1 } : makePopupFlyResult(0.32);
  }

  if (outsideStrikeZone && (!inGoodContactZone || readableQuality < 0.48)) {
    return missLuck < 0.72
      ? { label: hitLabels.foul, kind: "foul", power: 0.14 }
      : makePopupFlyResult(0.32);
  }

  if (abs > 310 || readableQuality < 0.24) {
    return missLuck < 0.66
      ? { label: hitLabels.foul, kind: "foul", power: 0.16 }
      : (missLuck < 0.84 ? { label: hitLabels.grounder, kind: "out", power: 0.1 } : makePopupFlyResult(0.34));
  }

  if (readableQuality < 0.42 || plateDistance > 88) {
    if (missLuck < 0.46) return { label: hitLabels.grounder, kind: "out", power: 0.14 };
    if (missLuck < 0.7) return makePopupFlyResult(0.38);
    return { label: hitLabels.foul, kind: "foul", power: 0.18 };
  }

  if (!inGoodContactZone) {
    if (readableQuality > 0.84 && sweetSpotScore > 0.78 && abs <= 85 && power >= 8 && Math.random() < 0.06) {
      return makeDeepDriveResult(contact, -0.34);
    }
    if (readableQuality > 0.66 && sweetSpotScore > 0.62 && abs <= 140 && missLuck < 0.42 + meet * 0.012) {
      return Math.random() < 0.42 ? makeFrontDropResult(0.54) : makeGapLinerResult(0.78);
    }
    if (missLuck < 0.46) return { label: hitLabels.foul, kind: "foul", power: 0.2 };
    if (missLuck < 0.68) return { label: hitLabels.grounder, kind: "out", power: 0.14 };
    if (missLuck < 0.78) return makePopupFlyResult(0.42);
    if (missLuck < 0.9) return Math.random() < 0.36 ? makeFrontDropResult(0.52) : makeGapGrounderResult(0.68);
    return { label: hitLabels.grounder, kind: "out", power: 0.26 };
  }

  if (readableQuality < 0.6) {
    if (sweetSpotScore > 0.58 && zoneScore > 0.62 && missLuck < 0.42 + meet * 0.018) {
      return Math.random() < 0.38 ? makeFrontDropResult(0.56) : makeGapLinerResult(0.8);
    }
    if (missLuck < 0.48) return { label: hitLabels.grounder, kind: "out", power: 0.2 };
    if (missLuck < 0.62) return makeRoutineFlyResult(0.58);
    if (missLuck < 0.9) return Math.random() < 0.34 ? makeFrontDropResult(0.53) : makeGapGrounderResult(0.7);
    return { label: hitLabels.foul, kind: "foul", power: 0.22 };
  }

  if (readableQuality < 0.78) {
    if (missLuck < 0.86 + meet * 0.012) {
      return Math.random() < 0.32 ? makeFrontDropResult(0.6) : makeGapLinerResult(0.82);
    }
    if (power >= 8 && sweetSpotScore > 0.72 && missLuck < 0.84) return makeDeepDriveResult(contact, -0.24);
    if (missLuck < 0.78) return { label: hitLabels.grounder, kind: "out", power: 0.32 };
    if (missLuck < 0.94) return makeRoutineFlyResult(0.62);
    return makePopupFlyResult(0.46);
  }

  if (readableQuality < 0.9) {
    const roll = Math.random() - powerBoost - sweetSpotScore * 0.12;
    if (power >= 9 && roll < 0.12) return makeDeepDriveResult(contact, 0.58);
    if (power >= 8 && roll < 0.26) return makeDeepDriveResult(contact, 0.26);
    if (roll < 0.38) return makeDeepDriveResult(contact, -0.02);
    if (roll < 0.97) return Math.random() < 0.24 ? makeFrontDropResult(0.62) : makeGapLinerResult(0.84);
    return makeHitResult("single", 0.72);
  }

  const barrelRoll = Math.random() - powerBoost * 1.4 - sweetSpotScore * 0.2;
  if (power >= 9 && barrelRoll < 0.18) return makeDeepDriveResult(contact, 0.7);
  if (power >= 8 && barrelRoll < 0.42) return makeDeepDriveResult(contact, 0.34);
  if (barrelRoll < 0.58) return makeDeepDriveResult(contact, 0.08);
  if (barrelRoll < 0.99) return Math.random() < 0.2 ? makeFrontDropResult(0.64) : makeGapLinerResult(0.84);
  return makeHitResult("single", 0.78);
}

function makeHitResult(scoreType, power) {
  return { label: hitLabels[scoreType], kind: "hit", power, scoreType };
}

function makeDeepDriveResult(contact, bonus = 0) {
  const batterPower = activeBatter?.power ?? 5;
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

function makeGapGrounderResult(power) {
  return { label: hitLabels.grounder, kind: "hit", power: Math.max(power, 0.62), scoreType: "single", grounderGap: true };
}

function makeGapLinerResult(power) {
  return { label: hitLabels.single, kind: "hit", power: Math.min(Math.max(power, 0.84), 0.855), scoreType: "single", gapLiner: true };
}

function makeFrontDropResult(power) {
  return { label: hitLabels.single, kind: "hit", power: clamp(power, 0.52, 0.66), scoreType: "single", frontDrop: true };
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

function advanceRunners(type, batterInfo) {
  let runs = 0;
  if (type === "walk") {
    if (bases.first && bases.second && bases.third) runs += 1;
    if (bases.first && bases.second) bases.third = bases.second;
    if (bases.first) bases.second = bases.first;
    bases.first = makeBaseRunner(batterInfo);
    scores[battingTeam] += runs;
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
    const nextBase = base + steps;
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
  return runs;
}

function makeBaseRunner(player) {
  return player ? { id: player.id, name: player.name, run: player.run ?? 5 } : null;
}

function formatRuns(runs) {
  return runs > 0 ? `${runs}点` : "得点なし";
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
    throw: throwState,
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
  if (battedBall.fenceOver) return 2500;
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
  const speed = (54 + (batterInfo.run ?? 5) * 4.5) * 2.0625 * batterRunnerSpeedScale;
  const route = [start, destination];
  const distance = getRunnerRouteDistance(route);
  return {
    start,
    destination,
    route,
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
  if (shouldUseRunnerPositionForOutfieldThrow(outcome, battedBall, fieldingTarget, fielder, runner)) {
    return hasBatterRunnerReachedFirstAtFielding(outcome, battedBall, fieldingTarget, fielder, runner) ? "second" : "first";
  }
  if (outcome.scoreType === "double" || outcome.scoreType === "triple" || outcome.kind === "double") return "second";
  if (shouldBatterRunnerTrySecond(outcome, battedBall, fieldingTarget, fielder, runner)) return "second";
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

function shouldBatterRunnerTrySecond(outcome, battedBall, fieldingTarget, fielder, runner) {
  if (!outcome || outcome.caught || !battedBall || !fieldingTarget || !fielder || !runner) return false;
  if (outcome.scoreType !== "single" && outcome.kind !== "single") return false;

  const runnerToSecond = createBatterRunner(activeBatter);
  setBatterRunnerDestination(runnerToSecond, "second");
  const fieldingTime = getFieldingTimeForThrowDecision(outcome, battedBall, fieldingTarget, fielder);
  const distanceToSecond = Math.hypot(defenseField.bases.second.x - fieldingTarget.x, defenseField.bases.second.y - fieldingTarget.y);
  const throwProfileToSecond = getThrowProfile(fielder, distanceToSecond);
  const throwTimeToSecond = throwProfileToSecond.throwTime;
  const defenseTimeToSecond = fieldingTime + defenseThrowSetSeconds + throwTimeToSecond;
  const ballDepth = getFenceDistance(fieldingTarget);
  const longHit = outcome.kind === "double"
    || battedBall.wallHit
    || battedBall.groundRuleDouble
    || battedBall.isDeep
    || battedBall.landingDistance > defenseField.doubleDistance * 0.58
    || ballDepth > defenseField.fenceDistance * 0.58;

  return longHit && runnerToSecond.arrivalTime <= defenseTimeToSecond + 0.24;
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
  const destination = { ...(targetBase === "second" ? defenseField.bases.second : defenseField.bases.first) };
  const route = targetBase === "second"
    ? [{ ...defenseField.bases.home }, { ...defenseField.bases.first }, destination]
    : [{ ...defenseField.bases.home }, destination];
  runner.start = { ...route[0] };
  runner.destination = destination;
  runner.route = route;
  runner.targetBase = targetBase;
  runner.baseLabel = targetBase === "second" ? "二塁" : "一塁";
  runner.arrivalTime = getRunnerRouteDistance(route) / runner.speed;
  runner.arrived = false;
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
  const baseSpeed = 430 + arm * 46;
  const longThrowPenalty = 0.76 - arm * 0.045;
  const speedMultiplier = clamp(1 - longThrowFactor * longThrowPenalty, 0.22, 1);
  const throwSpeed = baseSpeed * speedMultiplier;
  const minimumTime = 0.78 + longThrowFactor * (1.35 - arm * 0.055);
  const throwTime = Math.max(distance / throwSpeed, minimumTime);
  const arcHeight = 38 + longThrowFactor * (210 - arm * 7);
  return { throwSpeed, throwTime, arcHeight, longThrowFactor };
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
  if ((outcome.caught && !outcome.needsThrow) || battedBall.fenceOver) return battedBall.target;
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
  const isDeepDrive = label === deepDriveLabel;
  const distance = isPopupFly
    ? randomBetween(300, 500)
    : isRoutineFly
    ? randomBetween(1200, 1700)
    : 180 + Math.pow(Math.max(power, 0.08), 0.86) * 1040;
  const fenceDistance = defenseField.fenceDistance;
  const isGrounder = !isPopupFly && !isRoutineFly && (label === hitLabels.grounder || power < 0.38);
  const isLiner = !isGrounder && !isPopupFly && !isRoutineFly && power < 0.86;
  const trajectory = isGrounder ? "grounder" : isLiner ? "liner" : "fly";
  const isSoftDrop = label === hitLabels.single && isLiner && power <= 0.66;
  const carryScale = isPopupFly || isRoutineFly ? 1 : isGrounder ? 0.62 : isLiner ? 0.72 : power < 1.05 ? 0.82 : 1;
  const landingDistance = distance * carryScale;
  const isHardOutfieldHit = isLiner && power >= 0.78 && landingDistance > 620;
  const isDeep = distance > defenseField.deepHitDistance;
  const ballSpeedMultiplier = battedBallSpeedMultiplier[trajectory] ?? 1;
  const baseBallTime = isGrounder ? 0.32 : isPopupFly ? 1.08 : isRoutineFly ? 1.18 : isLiner ? 0.58 : 0.7;
  const baseBallSpeed = (isGrounder ? 1220 : isLiner ? 760 : isPopupFly ? 360 : isRoutineFly ? 540 : 620)
    * ballSpeedMultiplier
    * battedBallPaceMultiplier
    * (isSoftDrop ? 0.74 : isGrounder && power >= hardGrounderTuning.minPower ? hardGrounderTuning.initialSpeedScale : isHardOutfieldHit ? 0.88 : 1);
  const fairDeepFlight = !isGrounder && isFairDirection(direction);
  const fenceIntersection = isFairDirection(direction) ? getFenceIntersectionFromPoint(origin, direction) : null;
  const fenceTravelDistance = fenceIntersection?.travelDistance ?? fenceDistance;
  const possibleWallHit = isDeepDrive
    && power >= 1.34
    && distance > defenseField.deepHitDistance
    && Math.random() < 0.18;
  const possibleFenceOver = fairDeepFlight && fenceIntersection && distance > fenceTravelDistance;
  const possibleHomerFlightDistance = fenceTravelDistance + clamp((distance - fenceTravelDistance) * 0.62, 420, 760);
  const possibleHomerHeight = getBattedBallMaxHeight(trajectory, power, possibleHomerFlightDistance);
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
    : isRoutineFly ? randomBetween(210, 290)
    : isSoftDrop ? 56 : getBattedBallMaxHeight(trajectory, power, flightDistance);
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
        x: target.x - direction.x * clamp(220 + power * 180, 240, 520),
        y: target.y - direction.y * clamp(220 + power * 180, 240, 520)
      }, 42)
    : null;
  const ballTime = baseBallTime / (ballSpeedMultiplier * battedBallPaceMultiplier) + flightDistance / baseBallSpeed;
  return { origin, direction, target, wallReboundTarget, distance, landingDistance, flightDistance, power, trajectory, isGrounder, isLiner, isPopupFly, isRoutineFly, isSoftDrop, isHardOutfieldHit, isDeep, fenceOver, wallHit, groundRuleDouble: false, ballTime, maxHeight, wallImpactHeight };
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
  return (150 + fielder.speed * 24) * (4 / 9) * defenseFielderSpeedScale;
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
  updateThrowState(elapsedSeconds);
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
    return {
      ...fielder,
      currentX: fielder.x + dx * runProgress,
      currentY: fielder.y + dy * runProgress
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
  const runnerProgress = clamp(elapsedSeconds / runner.arrivalTime, 0, 1);
  const point = getRunnerRoutePoint(runner.route || [runner.start, runner.destination], runnerProgress);
  runner.x = point.x;
  runner.y = point.y;
  runner.arrived = runnerProgress >= 1;
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
    const t = 1 - Math.pow(1 - reboundProgress, 1.8);
    return {
      x: landing.x + (defenseState.target.x - landing.x) * t,
      y: landing.y + (defenseState.target.y - landing.y) * t
    };
  }
  if (defenseState.battedBall?.fenceOver) {
    const ballTime = Math.max(0.1, defenseState.battedBall.ballTime ?? 1);
    const travelProgress = getBattedBallTravelProgress(clamp(elapsedSeconds / ballTime, 0, 1));
    return {
      x: defenseState.origin.x + (defenseState.target.x - defenseState.origin.x) * travelProgress,
      y: defenseState.origin.y + (defenseState.target.y - defenseState.origin.y) * travelProgress
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
      const advanceType = defenseState.throw?.targetBase === "second" ? "double" : "single";
      const runs = advanceRunners(advanceType, activeBatter);
      const baseLabel = defenseState.throw?.baseLabel || "一塁";
      message = `${baseLabel}セーフ: ${formatRuns(runs)}`;
      showEffect(runs > 0 ? `セーフ +${runs}` : "セーフ", "#fff2a8");
    }
  } else if (outcome.kind === "out") {
    count.outs += 1;
    message = `${outcome.label}、アウト`;
    showEffect("アウト", "#ffcf70");
  } else {
    const scoreType = getScoringHitType(outcome);
    const runs = advanceRunners(scoreType, activeBatter);
    const label = getHitLabelByScoreType(scoreType);
    message = `${label}: ${formatRuns(runs)}`;
    showEffect(runs > 0 ? `${label} +${runs}` : label, scoreType === "homer" ? "#ff6f61" : "#fff2a8");
  }

  advanceBattingOrder();
  setMatchup();
  checkCountEnd();
  if (gamePhase === "playing") scheduleNextPitch(900);
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
    const side = timeDiff < 0 ? -1 : 1;
    return normalize({ x: side * randomBetween(0.95, 1.32), y: randomBetween(-0.82, -0.34) });
  }
  if (timeDiff < -95) return normalize({ x: activeBatterSide === "R" ? randomBetween(-1.02, -0.42) : randomBetween(0.42, 1.02), y: randomBetween(-1.02, -0.66) });
  if (timeDiff > 95) return normalize({ x: activeBatterSide === "R" ? randomBetween(0.42, 1.02) : randomBetween(-1.02, -0.42), y: randomBetween(-1.02, -0.66) });
  if (Math.random() < 0.72) {
    const side = Math.random() < 0.5 ? -1 : 1;
    return normalize({ x: side * randomBetween(0.34, 0.76), y: randomBetween(-1.02, -0.68) });
  }
  return normalize({ x: randomBetween(-0.24, 0.24), y: randomBetween(-1.05, -0.74) });
}

function getInfieldGapGrounderDirection(timeDiff) {
  const pullSide = activeBatterSide === "R" ? -1 : 1;
  const oppositeSide = -pullSide;
  const side = timeDiff < -70
    ? pullSide
    : timeDiff > 70
      ? oppositeSide
      : (Math.random() < 0.5 ? -1 : 1);
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
  const pullSide = activeBatterSide === "R" ? -1 : 1;
  const oppositeSide = -pullSide;
  const side = timeDiff < -80
    ? pullSide
    : timeDiff > 80
      ? oppositeSide
      : (Math.random() < 0.5 ? -1 : 1);
  return normalize({
    x: side * randomBetween(0.2, 0.4),
    y: randomBetween(-1.08, -0.92)
  });
}

function getPopupFlyDirection(timeDiff) {
  const drift = clamp(timeDiff / 280, -1, 1) * 0.18 + randomBetween(-0.16, 0.16);
  return normalize({
    x: drift,
    y: randomBetween(-1.08, -0.92)
  });
}

function getRoutineFlyDirection(timeDiff) {
  const pullSide = activeBatterSide === "R" ? -1 : 1;
  const oppositeSide = -pullSide;
  const side = timeDiff < -80
    ? pullSide
    : timeDiff > 80
      ? oppositeSide
      : (Math.random() < 0.5 ? -1 : 1);
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
  const extension = Math.max(0, (42 + meetDelta * 3.5) * scale * zoneScale);
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
  drawGrounderBounceMarks();
  drawPostLandingBounceMarker();
  drawLandingImpactMarker();
  drawThrowPath();
  drawDefenseFielders();
  drawBatterRunner();
  drawBallTrail();
  drawBall();
  ctx.restore();
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
    drawDefenseFielder(fielder.currentX, fielder.currentY, fielder.role, isChosen, runProgress);
  });
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
  drawMiniRunner(runner.x, runner.y, runProgress);
}

function drawMiniRunner(x, y, runProgress) {
  const bob = Math.sin(runProgress * Math.PI * 12) * 3;
  const stride = Math.sin(runProgress * Math.PI * 14);
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.ellipse(x, y + 30, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.translate(x, y + bob);
  ctx.scale(0.82, 0.82);

  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  drawLine(-8, 20, -18 - stride * 8, 38);
  drawLine(8, 20, 18 + stride * 8, 38);
  drawLine(-14, 7, -27 - stride * 5, 20);
  drawLine(14, 7, 27 + stride * 5, 20);

  ctx.fillStyle = "#d84e5f";
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

  ctx.fillStyle = "#bf4331";
  ctx.beginPath();
  ctx.arc(0, -29, 25, Math.PI, Math.PI * 2);
  ctx.lineTo(25, -29);
  ctx.quadraticCurveTo(7, -13, -18, -16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawDefenseFielder(x, y, role, isChosen, runProgress = 0) {
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
  const radius = defenseState.battedBall?.trajectory === "fly" ? ball.radius + 2 : ball.radius;
  drawWallImpactEffect(elapsedSeconds, heightOffset);

  if (heightOffset > 4) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
    ctx.beginPath();
    ctx.ellipse(ball.x, ball.y + 4, radius + heightOffset * 0.08, 5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  if (defenseState.throw?.active) {
    ctx.strokeStyle = "rgba(174, 231, 255, 0.82)";
    ctx.lineWidth = 6;
    drawLine(ball.x - 24, ball.y - heightOffset + 3, ball.x + 12, ball.y - heightOffset - 3);
    ctx.fillStyle = "rgba(174, 231, 255, 0.22)";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y - heightOffset, radius + 8, 0, Math.PI * 2);
    ctx.fill();
  } else if (defenseState.battedBall?.trajectory === "grounder") {
    ctx.strokeStyle = "rgba(216, 149, 72, 0.55)";
    ctx.lineWidth = 3;
    drawLine(ball.x - 18, ball.y + 8, ball.x + 12, ball.y + 8);
  } else if (defenseState.battedBall?.trajectory === "liner") {
    ctx.strokeStyle = "rgba(174, 231, 255, 0.42)";
    ctx.lineWidth = 4;
    drawLine(ball.x - 20, ball.y - heightOffset, ball.x + 8, ball.y - heightOffset);
  } else {
    ctx.strokeStyle = "rgba(255, 242, 168, 0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y - heightOffset, radius + 8, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y - heightOffset, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#bf4331";
  ctx.lineWidth = 2;
  const seam = Math.sin(ball.spin) * 3;
  drawLine(ball.x - 4, ball.y - heightOffset - 2 + seam, ball.x + 4, ball.y - heightOffset + 2 - seam);
  drawLine(ball.x - 4, ball.y - heightOffset + 2 - seam, ball.x + 4, ball.y - heightOffset - 2 + seam);
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
  const t = clamp(secondsAfterImpact / 0.58, 0, 1);
  const slideHeight = (battedBall.wallImpactHeight ?? 90) * Math.pow(1 - t, 2);
  const bounce = Math.abs(Math.sin(t * Math.PI * 3)) * 12 * Math.pow(1 - t, 1.4);
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
  drawPanel(18, 18, 360, 150, "#233047");
  ctx.fillStyle = "#fff2a8";
  ctx.font = "bold 24px monospace";
  ctx.fillText(gameMode === "single" ? "MODE: 1人用" : "MODE: 2人用", 38, 52);
  ctx.fillStyle = "#f8f3d8";
  ctx.font = "bold 22px monospace";
  ctx.fillText(`${inning}${half === "top" ? "表" : "裏"}  A ${scores.away} - B ${scores.home}`, 38, 86);
  ctx.fillText(`S ${Math.min(count.strikes, 2)}  B ${Math.min(count.balls, 3)}  O ${Math.min(count.outs, 2)}`, 38, 120);
  drawBaseRunnerIndicator(306, 78);
  const pitchLabel = currentPitchType ? pitchTypes[currentPitchType].label : "---";
  const speedLabel = currentPitchSpeedKmh ? `${currentPitchSpeedKmh}km/h` : "---";
  ctx.fillStyle = "#aee7ff";
  ctx.font = "bold 16px monospace";
  ctx.fillText(`PITCH: ${pitchLabel}  SPEED: ${speedLabel}`, 38, 148);
  drawPanel(760, 18, 500, 74, "#fff0b8");
  ctx.fillStyle = "#233047";
  ctx.font = "bold 24px sans-serif";
  fitText(message, 786, 64, 452);
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
  drawPanel(760, 104, 500, 74, "#fff0b8");
  ctx.fillStyle = "#233047";
  ctx.font = "bold 18px sans-serif";
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  const stateLabel = getDefenseStateLabel(elapsedSeconds);
  fitText(`守備: ${defenseState.chosenFielder.role} / ${stateLabel}`, 786, 136, 452);
  ctx.font = "bold 15px sans-serif";
  const runnerBaseLabel = defenseState.runner?.baseLabel || "一塁";
  const runnerLabel = defenseState.runner?.arrived ? `走者: ${runnerBaseLabel}到達` : `走者: ${runnerBaseLabel}へ`;
  const prediction = defenseState.throw
    ? defenseState.throw.safe ? "判定予測: セーフ" : "判定予測: アウト"
    : `判定予測: ${getDefensePredictionLabel(defenseState.outcome)}`;
  fitText(`${runnerLabel}   ${prediction}`, 786, 166, 452);
  drawMiniDefenseField(1010, 188, 240, 176);
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

  ctx.fillStyle = "#fff8df";
  ctx.font = "bold 13px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("守備ミニ球場", x + 12, y + 10);
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
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) event.preventDefault();
  keysDown.add(event.code);
  keysDown.add(event.key);
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

window.addEventListener("keyup", (event) => {
  keysDown.delete(event.code);
  keysDown.delete(event.key);
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
menuPlayerCards.forEach((card) => {
  const picker = card.querySelector(".position-picker");
  picker.addEventListener("click", () => openPlayerChooser(card));
  picker.addEventListener("keydown", (event) => {
    if (event.code !== "Enter" && event.code !== "Space") return;
    event.preventDefault();
    openPlayerChooser(card);
  });
});
chooserClose.addEventListener("click", closePlayerChooser);
chooserOptions.addEventListener("click", (event) => {
  const option = event.target.closest(".chooser-option");
  if (!option) return;
  selectMenuPlayer(option);
});
populateSelects();
showMenu();
requestAnimationFrame(gameLoop);
