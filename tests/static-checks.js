const fs = require("fs");
const path = require("path");
const {
  assert,
  assertBalancedHtmlTags,
  assertIncludesAll,
  assertNoMojibake,
  unique
} = require("./check-utils");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");

const domIdsUsedByScript = unique(
  [...script.matchAll(/\b(?:getElementById|byId|optionalById)\("([^"]+)"\)/g)].map((match) => match[1])
);
const missingDomIds = domIdsUsedByScript.filter((id) => !html.includes(`id="${id}"`));

assert(
  missingDomIds.length === 0,
  `script.js references missing index.html id(s): ${missingDomIds.join(", ")}`
);

const htmlIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = unique(htmlIds.filter((id, index) => htmlIds.indexOf(id) !== index));

assert(
  duplicateIds.length === 0,
  `index.html contains duplicate id(s): ${duplicateIds.join(", ")}`
);

const scriptSyntax = new Function(script);
assert(typeof scriptSyntax === "function", "script.js should parse as JavaScript");

const audioSources = unique(
  [...script.matchAll(/new Audio\("([^"]+)"\)/g)].map((match) => match[1])
);
const missingAudioSources = audioSources.filter((source) => {
  const filePath = path.join(root, source);
  return !fs.existsSync(filePath);
});

assert(
  missingAudioSources.length === 0,
  `script.js references missing audio file(s): ${missingAudioSources.join(", ")}`
);

assertIncludesAll(
  html,
  ["試合開始", "チームA（1P）", "チームB（2P）", "メインメニューに戻る", "効果音 ON"],
  "index.html"
);

assertNoMojibake(html, "index.html");
assertNoMojibake(readme, "README.md");
assertNoMojibake(script, "script.js");
assertBalancedHtmlTags(html, ["button", "option", "p", "h3", "span"]);
assert(!/aria-label="[^"]*>\s*$/m.test(html), "index.html contains a broken aria-label");

assertIncludesAll(
  script,
  [
    "function getComputerOutsideEscapeTakeAdjustment",
    "cpuPlateSideNudge: 13",
    "function updateComputerBatterPosition",
    "function shouldMoveComputerBatter",
    "batterMoveTuning.cpuPitchSideMoveScale",
    "batterMoveTuning.cpuSlowPitchMoveBonus",
    "else if (gamePhase === \"playing\") updateComputerBatterPosition(delta)",
    "const outsideSign = activeBatterSide === \"R\" ? 1 : -1",
    "const awayEscapeScore = clamp(escapeAmount / 34, 0, 1)",
    "const slowPitchScore = clamp(",
    "const meetReadSkill = clamp(((activeBatter?.meet ?? 5) - 3) / 12, 0, 1)",
    "const adjustedStrikeConfidence = clamp(strikeConfidence - outsideEscapeTake.confidencePenalty, 0, 1)",
    "outsideEscapeTake.chaseMultiplier",
    "outsideEscapeTake.swingMultiplier",
    "const contactRescueExtension = ball.radius * 2",
    "const contactRange = naturalContactRange + contactRescueExtension",
    "contactRescueUse",
    "const rescueChasePenalty = contactRescueUse",
    "const outsideReachUse = clamp(Math.max(naturalOutsideReachUse, contactRescueUse * 1.18)",
    "const rescueContactDrag = clamp(Math.max(contactRescueUse, outsideReachUse * 0.45)",
    "const buntAimMemoryDuration = 650",
    "function getBuntAimForContact",
    "now - swingState.buntAimMemoryTime <= buntAimMemoryDuration",
    "const gamepadX = Math.abs(axisX) >= 0.22 ? axisX : 0",
    "const aimedSide = Math.abs(buntAimX) > 0 ? Math.sign(buntAimX) : 0",
    "const aimControlScore = hasAim ? 1 : 0",
    "const noAimPitcherFrontBoost = hasAim ? 0 : 0.22"
  ],
  "script.js bunt aim leniency"
);

assertIncludesAll(
  script,
  [
    "function drawDefenseCatchEffect()",
    "outcome?.caught || outcome.fieldingError",
    'ctx.strokeText("キャッチ!"',
    "function isNoBounceDefenseCatch",
    "battedBall.isGrounder || outcome.postLandingPickup",
    "function drawSimpleDefensePickupEffect",
    "function drawFieldingErrorEffect()",
    "outcome?.fieldingError",
    'ctx.strokeText("エラー!"'
  ],
  "script.js defense result effects"
);

assertIncludesAll(
  script,
  [
    "stuff: -64",
    "id: \"homeRunVision\"",
    "name: \"ホームランヴィジョンフィールド\"",
    "suppressFoulGroundStands: true",
    "hasReliefCar: true",
    "function getHomeRunVisionAdvice",
    "const homeRunVisionAdvicePatterns = buildHomeRunVisionAdvicePatterns()",
    "patterns.length !== 256",
    "return patterns",
    "function drawHomeRunVisionBeyondOutfield",
    "ホームランヴィジョン",
    "無観客・スイング解析中",
    "function drawHomeRunVisionAdviceText",
    "function wrapJapaneseTextForCanvas",
    "homeRunVisionDisplay.advice",
    "function drawReliefCarEntrance",
    "duration: 3600",
    "const silver = ctx.createLinearGradient",
    "isHomeRunVisionField() ? Math.max(6400, duration) : duration",
    "function getHomeRunVisionScreenFocusPoint",
    "const visionWeight = clamp"
  ],
  "script.js home run vision field"
);

assertIncludesAll(
  html,
  [
    "<option value=\"homeRunVision\">ホームランヴィジョンフィールド</option>",
    "<option value=\"mStadium\">Mスタジアム</option>",
    "<option value=\"shiokaze\">潮風球場</option>"
  ],
  "index.html home run vision field option"
);

assert(!html.includes("spectatorModeButton"), "index.html should no longer expose spectator mode");
assert(!html.includes("value=\"xStadium\""), "X Stadium should stay hidden from the normal stadium selector");
assert(!script.includes("startSpectatorMode"), "script.js should no longer include spectator mode startup");
assert(!script.includes('gamePhase === "spectator"'), "script.js should no longer route through spectator mode");

assertIncludesAll(
  script,
  [
    "id: \"mStadium\"",
    "name: \"Mスタジアムです。\"",
    "surface: \"obsidian\"",
    "centerFenceMeters: 118",
    "lineFenceMeters: 118",
    "hasMStadium: true",
    "function getObsidianFieldFill",
    "function drawMStadiumBeyondOutfield",
    "drawMStadiumBeyondOutfield();",
    "function createMStadiumHomeRunRocket",
    "function drawMStadiumHomeRunRocket",
    "function drawMStadiumPhotoRocket",
    "function drawMStadiumHomeRunEnding",
    "Mスタジアムです。ここからまた、新しい勝負が始まります。",
    "drawMStadiumHomeRunRocket(fireworks, elapsedSeconds);"
  ],
  "script.js M stadium"
);

assertIncludesAll(
  script,
  [
    "id: \"xStadium\"",
    "name: \"Xスタジアム\"",
    "hasXStadium: true",
    "gamePhase = \"xStadiumPrompt\"",
    "XスタジアムにGOしますか？",
    "applyStadiumPreset(\"xStadium\")",
    "duration: stadium.hasXStadium ? 64",
    "64秒間、白いロケットが打球の余韻を運びます。",
    "試合状況はそのまま、球場だけが切り替わります。"
  ],
  "script.js X stadium hidden transition"
);

assertIncludesAll(
  script,
  [
    "id: \"shiokaze\"",
    "name: \"潮風球場\"",
    "surface: \"seaBreezeGrass\"",
    "hasSeaBreeze: true",
    "seaBreezeParkMeters: { width: 1024, depth: 256 }",
    "function applySeaBreezeToBattedBallDirection",
    "function drawShiokazeParkBeyondOutfield",
    "function drawShiokazeAreaFeatures",
    "function drawShiokazeShelters",
    "潮風公園",
    "東海岸エリア",
    "魚釣りエリア"
  ],
  "script.js shiokaze stadium"
);

const defenseDrawSection = script.slice(
  script.indexOf("function drawDefenseView()"),
  script.indexOf("function drawHomeRunFireworks()")
);
assert(
  defenseDrawSection.indexOf("drawDefenseFielders();") < defenseDrawSection.indexOf("drawDefenseCatchEffect();")
    && defenseDrawSection.indexOf("drawBall();") < defenseDrawSection.indexOf("drawFieldingErrorEffect();"),
  "defense catch and error effects should render over fielders and the ball"
);

["normal", "slow", "fast", "special"].forEach((pitchType) => {
  assert(
    script.includes(`gamePhase === "playing" && isPlayerPitching()`) && script.includes(`startPitch("${pitchType}")`),
    `pitch key for ${pitchType} should only be active during playing phase`
  );
});

assertIncludesAll(
  script,
  [
    "cpuAutoChangeThreshold: 40",
    "function maybeAutoChangeCpuPitcher",
    "function getNextUnusedPitcher",
    "if (gameMode === \"watch\") return true",
    "if (gameMode === \"single\") return team !== playerTeam",
    "maybeAutoChangeCpuPitcher(fieldingTeam());",
    "function getCpuInsidePitchTargetX",
    "const safeDistance = (Number.isFinite(ball.radius) ? ball.radius : pitchRadius) * 3",
    "insideEdgeX - course.direction * safeDistance",
    "plan.targetX = getCpuInsidePitchTargetX(plan.targetX, sharedAim.course, getPitchRadius(plan.type));"
  ],
  "CPU pitcher auto change and inside target safety"
);

console.log("Static checks passed");
