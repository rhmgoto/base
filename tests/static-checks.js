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
    "<option value=\"shiokaze\">潮風球場</option>",
    "id=\"spectatorModeButton\""
  ],
  "index.html home run vision field option"
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
    "function startSpectatorMode",
    "function drawSpectatorMode",
    "function drawShiokazeAreaFeatures",
    "function drawShiokazeShelters",
    "function getShiokazeBallparkEntrancePoint",
    "潮風公園",
    "東海岸エリア",
    "魚釣りエリア",
    "const stickX = Math.abs(gamepad?.axes?.[0] ?? 0) >= 0.2",
    "spectatorModeButton?.addEventListener"
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

console.log("Static checks passed");
