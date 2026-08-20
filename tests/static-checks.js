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
    // 外角の速球が決まりすぎないよう、コーナー狙いの散らばりだけ球種で変える
    // 落球はライナー限定から強い打球全般へ広げ、既存のエラー演出を流用する
    "const battedBallDropTuning",
    "const infielderGrounderErrorTuning",
    "function getBattedBallDropChance",
    "function shouldDropBattedBallOnCatch",
    "function getInfielderGrounderErrorChance",
    "function getInfielderGrounderErrorType",
    "fieldingError: true",
    "!outcome?.fieldingError && !outcome?.droppedBall",
    "const pitchControlTuning",
    "function getPitchTypeControlMultiplier",
    "edgeSpread * getPitchTypeControlMultiplier(options.pitchType)",
    "cpuPlateSideNudge: 13",
    "function updateComputerBatterPosition",
    "function shouldMoveComputerBatter",
    "batterMoveTuning.cpuPitchSideMoveScale",
    "batterMoveTuning.cpuSlowPitchMoveBonus",
    "updateComputerBatterPosition(delta);",
    // CPUの盗塁は打者の更新と同じ経路で毎フレーム進める
    "function planComputerSteal",
    "function updateComputerSteal",
    "function getComputerStealChance",
    "updateComputerSteal(now);",
    "planComputerSteal(now);",
    "const outsideSign = activeBatterSide === \"R\" ? 1 : -1",
    // 見極めは外角に逃げる球だけでなく、ゾーンから外れる球全般を対象にする
    "function getComputerPitchReadScore",
    // 選球は「手元での横のズレ」と「変化量の読み」で決める
    "function getComputerCurveReadScale",
    // ベースをかすめる球は当たりやすくし、増えた接触はファウル・詰まった当たりに逃がす
    "const edgeStrikeContactTuning",
    "const edgeExtendedUse = isEdgeStrikeContact",
    "const edgeExtendedFoulChance = edgeStrikeOutsideAssist",
    "const edgeExtendedFoul = edgeExtendedUse > 0",
    "exitVelocity: finalExitVelocity",
    "carry: finalCarry",
    "const lateralMiss = Math.max(0, Math.abs(ball.x - field.plateX) - field.strikeZoneWidth / 2 - ball.radius)",
    "const breakPressure = clamp(Math.abs(ball.curvePower)",
    "const chaseTemptation = clamp(",
    "computerBatterTuning.swingChanceExponent",
    "const zoneExitScore = clamp(projectedDistance / computerBatterTuning.zoneExitFullRead, 0, 1)",
    "const pitchReadScore = getComputerPitchReadScore()",
    // 振り始めは投球ごとに1点だけ決める
    "function getComputerSwingTargetProgress",
    "if (progress < getComputerSwingTargetProgress()) return",
    "swingState.computerSwingProgress = null",
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
    "const aimControlScore = hasAim ? 1 : 0"
  ],
  "script.js bunt aim leniency"
);

assertIncludesAll(
  script,
  [
    "function updatePlayerChooserGamepadScroll",
    "playerChooser.classList.contains(\"hidden\")",
    "pane.scrollHeight <= pane.clientHeight",
    "pane.scrollTop + y * 26",
    "updatePlayerChooserGamepadScroll(gamepad, team, y)"
  ],
  "player chooser gamepad scrolling"
);

assertIncludesAll(
  script,
  [
    "function drawDefenseCatchEffect()",
    "outcome?.caught || outcome.fieldingError",
    "const edgeCatch = (catchVisual?.edgeCatchRatio ?? 0) >= 0.78",
    "const particleCount = edgeCatch ? 12 : 9",
    "ctx.createRadialGradient(",
    "function isNoBounceDefenseCatch",
    "battedBall.isGrounder || outcome.postLandingPickup",
    "function drawSimpleDefensePickupEffect",
    "function drawFieldingErrorEffect()",
    "outcome?.fieldingError",
    'ctx.strokeText("エラー!"'
  ],
  "script.js defense result effects"
);
assert(!script.includes('ctx.strokeText("キャッチ!"'), "catch effects should not use the old large catch text");

assertIncludesAll(
  script,
  [
    "const quickDefenseThrowSpeedScale = 1.1",
    "const normalDefenseThrowSpeedScale = 0.8 * 0.85",
    "const normalDefenseThrowArcMultiplier = 1.5",
    "const quickDefenseThrowTimeMultiplier = 1 / quickDefenseThrowSpeedScale",
    "const normalDefenseThrowTimeMultiplier = 1 / normalDefenseThrowSpeedScale",
    "const quickDefenseThrowTimingWindowMs = 450",
    "const quickThrow = throwState.throwTimingSuccess && !isPreparing",
    "const defenseThrowBallFill = defenseState.throw?.active && defenseState.throw.throwTimingSuccess",
    '? "#ff8a83"',
    "drawBaseballIcon(ball.x, ball.y - visualHeightOffset, radius, defenseThrowBallFill)",
    "const trailLength = 44",
    "if (!isPreparing && !quickThrow)"
  ],
  "script.js quick and normal throw distinction"
);
assert(!script.includes("早い送球！"), "quick throws should no longer show the temporary diagnostic text");
assert(!script.includes("defenseThrowNotice"), "quick throw diagnostic notice state should be removed");
const quickThrowDrawSection = script.slice(
  script.indexOf("function drawThrowPath()"),
  script.indexOf("function drawBatterRunner()")
);
assert(!quickThrowDrawSection.includes("globalCompositeOperation"), "quick throws should not use full-canvas additive blending");
assert(!quickThrowDrawSection.includes("shadowBlur"), "quick throws should not use large shadow blurs that can flash the canvas");
assert(!quickThrowDrawSection.includes("arrivalAge"), "quick throws should not use the old arrival burst");
assert(!quickThrowDrawSection.includes("radius: 20"), "quick throws should not use the old large red ball layers");
assert(!quickThrowDrawSection.includes("rgba(255, 92, 84"), "quick throws should color the baseball itself instead of drawing a red shadow");
const defenseGamepadInputStart = script.indexOf('if (gamePhase === "defense" && team === fieldingTeam())');
const defenseGamepadInputEnd = script.indexOf('if (gamePhase === "defense" && team === battingTeam)', defenseGamepadInputStart);
const defenseGamepadInputSection = script.slice(defenseGamepadInputStart, defenseGamepadInputEnd);
assert(defenseGamepadInputSection.includes("justPressed(gamepadButtons.A)"), "screen BTN 2 should be the defense throw button");
assert(!defenseGamepadInputSection.includes("justPressed(gamepadButtons.B)"), "screen BTN 1 should not throw");
assert(!defenseGamepadInputSection.includes("justPressed(gamepadButtons.X)"), "screen BTN 3 should not throw");
const batterRunnerTargetSection = script.slice(
  script.indexOf("function getBatterRunnerTargetBase"),
  script.indexOf("function getFieldingTimeForThrowDecision")
);
assert(batterRunnerTargetSection.includes('if (battedBall?.groundRuleDouble) return "second"'), "ground-rule doubles should still award second");
assert(!batterRunnerTargetSection.includes('outcome.scoreType === "double"'), "ordinary double labels should not auto-send a manual batter-runner to second");
assert(!batterRunnerTargetSection.includes('return "third"'), "ordinary triple labels should not auto-send a manual batter-runner to third");
assertIncludesAll(
  script,
  [
    "function shouldHoldCameraForShortDefenseThrow",
    "return distance <= 820",
    "focusX = defenseState.throw.from.x",
    "focusY = defenseState.throw.from.y"
  ],
  "short infield throw camera stability"
);

assertIncludesAll(
  script,
  [
    "catchVisual: null",
    "landingMissVisual: null",
    "const distance = Math.hypot(current.x - ball.x, current.y - ball.y)",
    "candidate.distance <= candidate.circleRadius + ballRadius",
    "function startDefenseCatchVisual",
    "function drawDefenseCatchBallTransition",
    "function updateDefenseLandingMissVisual",
    "function drawDefenseLandingMissEffect",
    "defenseState.catchVisual?.caughtInAir"
  ],
  "script.js visible catch-range result alignment"
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
    "<option value=\"fireworks\" selected>大花火スタジアム</option>",
    "<option value=\"hyperOcean\">ハイパーオーシャンパーク</option>",
    "<option value=\"riverside\">リバーサイドパーク</option>",
    "<option value=\"spaceStadium\">スペーススタジアム</option>",
    "<option value=\"nextDome\">ネクストドーム</option>"
  ],
  "index.html visible stadium options"
);

assert(!html.includes("spectatorModeButton"), "index.html should no longer expose spectator mode");
assert(!html.includes("value=\"xStadium\""), "X Stadium should stay hidden from the normal stadium selector");
assert(!html.includes("value=\"homeRunVision\""), "Home Run Vision Field should stay hidden from the normal stadium selector");
assert(!html.includes("value=\"mStadium\""), "M Stadium should stay hidden from the normal stadium selector");
assert(!html.includes("value=\"aozora\""), "Aozora Ground should stay hidden from the normal stadium selector");
assert(!html.includes("value=\"shiokaze\""), "Shiokaze Stadium should stay hidden from the normal stadium selector");
assert(!html.includes("value=\"americanRoyal\""), "American Royal Park should stay hidden from the normal stadium selector");
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
    "cpuAutoChangeThresholdRatio: 0.5",
    "const changeThreshold = maxStamina * (staminaTuning.cpuAutoChangeThresholdRatio ?? 0.5)",
    "function maybeAutoChangeCpuPitcher",
    "function getNextUnusedPitcher",
    "if (gameMode === \"watch\") return true",
    "if (gameMode === \"single\") return team !== playerTeam",
    "maybeAutoChangeCpuPitcher(fieldingTeam());",
    "function applySharedComputerPitchAim",
    "plan.targetX = sharedAim.targetX;",
    "plan.targetY = sharedAim.targetY;",
    "plan.targetSpread = sharedAim.targetSpread;"
  ],
  "CPU pitcher auto change and shared player/CPU pitch aim"
);

assertIncludesAll(
  script.replace(/\r\n/g, "\n"),
  [
    // プレー途中の走者作り直しは、走り出した走者を残す版を通す
    "function refreshDefenseBaseRunnerAnimations",
    "function shouldKeepLiveDefenseBaseRunner",
    "popupReductionRate: 0.1",
    "goodBuntPopupScale: 0.74",
    "function resolveBuntPopupOutcome",
    "&& Math.random() < buntTuning.popupReductionRate",
    "popupConvertedToPitcherFront",
    "const pitcherFrontGrounder = popupConvertedToPitcherFront",
    "popupConvertedToPitcherFront\n          ? randomBetween(-6, 1)"
  ],
  "bunt popup reduction and pitcher-front grounder conversion"
);

assertIncludesAll(
  script,
  [
    "const homeRunVarietyTuning",
    "function getDeepDriveBallPaceScale",
    "function getNaturalFenceWallHitChance",
    "deepDriveTrajectory",
    "const clearsFenceNaturally",
    "const candidateCarryMeters",
    "randomBetween(-14, 4)",
    "batterPowerRating: batterPower.rating"
  ],
  "continuous home-run distance, trajectory, and wall-hit variety"
);

console.log("Static checks passed");
