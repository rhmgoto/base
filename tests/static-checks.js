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
    "const aimedSide = Math.abs(buntAimX) >= 0.22 ? Math.sign(buntAimX) : 0",
    "const aimedFoulRelief = aimedSide ? 0.08 + aimControlScore * 0.12 : 0"
  ],
  "script.js bunt aim leniency"
);

["normal", "slow", "fast", "special"].forEach((pitchType) => {
  assert(
    script.includes(`gamePhase === "playing" && isPlayerPitching()`) && script.includes(`startPitch("${pitchType}")`),
    `pitch key for ${pitchType} should only be active during playing phase`
  );
});

console.log("Static checks passed");
