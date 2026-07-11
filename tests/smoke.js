const fs = require("fs");
const path = require("path");
const vm = require("vm");
const {
  assert: checkAssert,
  assertBalancedHtmlTags,
  assertIncludesAll,
  assertNoMojibake
} = require("./check-utils");

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
      contains() {
        return false;
      }
    },
    addEventListener() {},
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getAttribute(name) {
      return this.attributes[name] ?? null;
    },
    getBoundingClientRect() {
      return { left: 0, top: 0, width: 1280, height: 860 };
    },
    querySelector() {
      return makeElement(`${id}-child`);
    }
  };
  elements.set(id, element);
  return element;
}

function createCanvasContext() {
  const base = {
    measureText(text) {
      return { width: String(text).length * 12 };
    }
  };
  return new Proxy(base, {
    get(target, prop) {
      if (prop in target) return target[prop];
      return () => {};
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    }
  });
}

function createGameContext() {
  const canvas = makeElement("gameCanvas");
  canvas.width = 1280;
  canvas.height = 860;
  canvas.getContext = () => createCanvasContext();

  [
    "startMenu",
    "menuButton",
    "startButton",
    "practiceStartButton",
    "soundToggleButton",
    "bgmToggleButton",
    "menuSoundToggleButton",
    "menuBgmToggleButton",
    "menuPointStatus",
    "playerChooser",
    "chooserTitle",
    "chooserOptions",
    "chooserClose",
    "chooserTitleHome",
    "chooserOptionsHome",
    "chooserCloseHome",
    "modeSelect",
    "awayPresetSelect",
    "homePresetSelect",
    "firstBatSelect",
    "inningsSelect",
    "practicePitcherControlSelect",
    "practicePitcherTypeSelect",
    "practiceBatterSelect",
    "practicePitcherSelect",
    "awayBatterLName",
    "awayBatterCName",
    "awayBatterRName",
    "awayBatterCAName",
    "homeBatterLName",
    "homeBatterCName",
    "homeBatterRName",
    "homeBatterCAName",
    "awayPitcherName",
    "homePitcherName",
    "awayBatterLStats",
    "awayBatterCStats",
    "awayBatterRStats",
    "awayBatterCAStats",
    "homeBatterLStats",
    "homeBatterCStats",
    "homeBatterRStats",
    "homeBatterCAStats",
    "awayPitcherStats",
    "homePitcherStats"
  ].forEach(makeElement);

  makeElement("modeSelect").value = "versus";
  makeElement("awayPresetSelect").value = "tigers";
  makeElement("homePresetSelect").value = "dodgers";
  makeElement("firstBatSelect").value = "away";
  makeElement("inningsSelect").value = "1";
  makeElement("p1DefenseSelect").value = "auto";
  makeElement("p2DefenseSelect").value = "auto";

  let now = 1000;
  const context = {
    console,
    window: { addEventListener() {} },
    document: {
      getElementById: makeElement,
      querySelector() {
        return makeElement("gameShell");
      },
      querySelectorAll() {
        return [];
      }
    },
    Image: function Image() {
      this.complete = true;
      this.naturalWidth = 1800;
    },
    Audio: function Audio(src = "") {
      this.src = src;
      this.currentTime = 0;
      this.loop = false;
      this.muted = false;
      this.paused = true;
      this.playCount = 0;
      this.pauseCount = 0;
      this.play = () => {
        this.paused = false;
        this.playCount += 1;
        return Promise.resolve();
      };
      this.pause = () => {
        this.paused = true;
        this.pauseCount += 1;
      };
    },
    performance: { now: () => now },
    requestAnimationFrame() {},
    setTimeout(callback) {
      callback();
      return 0;
    },
    Math,
    Set,
    Number,
    __advanceTime(ms) {
      now += ms;
    }
  };
  vm.createContext(context);
  return context;
}

function runInGame(context, code) {
  return vm.runInContext(code, context, { filename: "smoke-eval.js" });
}

function assert(condition, message) {
  checkAssert(condition, message);
}

function assertHtmlShell() {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
  assertIncludesAll(html, [
    'id="gameCanvas"',
    'id="startMenu"',
    'id="startButton"',
    'id="practiceStartButton"',
    'id="soundToggleButton"',
    'id="bgmToggleButton"',
    'id="menuSoundToggleButton"',
    'id="menuBgmToggleButton"',
    'id="modeSelect"',
    'id="awayPresetSelect"',
    'id="homePresetSelect"',
    'value="tigers"',
    'value="dodgers"',
    'value="dendos"',
    'value="semiauto"',
    'value="watch"',
    'value="practice"',
    'id="practicePitcherControlSelect"',
    'id="practicePitcherTypeSelect"',
    'id="practiceBatterSelect"',
    'id="practicePitcherSelect"',
    'id="firstBatSelect"',
    'id="inningsSelect"',
    'value="5"',
    'value="9"',
    'id="awayPitcherCard"',
    'id="awayPitcher4Card"',
    'id="awayPitcher5Card"',
    'id="homePitcher4Card"',
    'id="homePitcher5Card"',
    'id="homeBatterRCard"',
    'id="homeBatterCACard"',
    'id="activeBatterStats"'
  ], "index.html");
  assertIncludesAll(html, ["試合開始", "打撃練習開始", "メインメニューに戻る", "効果音 ON"], "index.html");
  assert(html.includes(">BGM ON</button>"), "BGM toggle should default to ON");
  assert(html.includes("menu-audio-controls"), "main menu should include audio controls");
  assert(!html.includes('id="playerEditorButton"') && !html.includes('id="playerEditor"'), "main menu should no longer expose the old ability editor");
  assert(!/aria-label="[^"]*>\s*$/m.test(html), "index.html contains a broken aria-label");
  assertBalancedHtmlTags(html, ["button", "option", "p", "h3", "span"]);
  assertNoMojibake(html, "index.html");
  assert(/\.player-chooser\s*\{[\s\S]*background:\s*transparent;[\s\S]*pointer-events:\s*none;/.test(css), "player chooser parent should not visually or interactively cover both teams");
  assert(/\.player-chooser\s*\{[\s\S]*inset:\s*34px 0 auto;/.test(css), "player chooser should stay inside the visible game screen");
  assert(/\.chooser-pane\s*\{[\s\S]*position:\s*absolute;[\s\S]*width:\s*50%;/.test(css), "each player chooser pane should be exactly half-width");
  assert(/\.chooser-pane\[data-chooser-team="away"\]\s*\{\s*left:\s*0;/.test(css), "1P chooser pane should stay on the left side");
  assert(/\.chooser-pane\[data-chooser-team="home"\]\s*\{\s*right:\s*0;/.test(css), "2P chooser pane should stay on the right side");
  assert(/\.chooser-pane\.hidden\s*\{\s*display:\s*none;/.test(css), "hidden chooser panes should not cover the opposite team");
  assert(/overflow-x:\s*hidden;/.test(css), "player chooser should avoid horizontal overflow when five cards are shown");
  assert(/\.game-shell\.menu-open\s*\{[\s\S]*width:\s*100vw;[\s\S]*max-width:\s*none;/.test(css), "menu-open game shell should use the full viewport width");
  assert(/\.game-shell\s*\{[\s\S]*padding:\s*2px 0;/.test(css), "game shell should minimize vertical padding on the play screen");
  assert(/canvas\s*\{[\s\S]*height:\s*calc\(100vh - 8px\);/.test(css), "canvas should stretch vertically to use the screen height");
  assert(/\.chooser-options\s*\{[\s\S]*gap:\s*2px;/.test(css), "chooser card gaps should be tightly compressed");
  assert(/\.chooser-option\s*\{\s*display:\s*grid;\s*justify-self:\s*center;\s*width:\s*82%;/.test(css), "chooser cards should be narrowed enough to fit five columns inside each pane");
  assert(/\.chooser-options\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\);/.test(css), "each player chooser pane should show five cards per row");
  assert(/\.field-role-C\s*\{\s*left:\s*50%;\s*top:\s*17%;/.test(css), "center fielder card should sit in the top outfield row");
  assert(/\.pitcher-role-pitcher\s*\{\s*left:\s*50%;\s*top:\s*34%;/.test(css), "starting pitcher card should sit below the outfield row");
  assert(/\.pitcher-role-pitcher5\s*\{\s*left:\s*61%;\s*top:\s*58%;/.test(css), "fifth pitcher card should sit in the lower two-column pitcher row");
}

assertHtmlShell();
assertNoMojibake(fs.readFileSync(path.join(root, "README.md"), "utf8"), "README.md");

const context = createGameContext();
vm.runInContext(fs.readFileSync(path.join(root, "script.js"), "utf8"), context, {
  filename: "script.js"
});

assert(makeElement("awayBatterLName").textContent.length > 0, "menu cards are not populated");

const audioToggleState = JSON.parse(runInGame(
  context,
  `(() => {
    let playCount = 0;
    sounds.swing.play = () => {
      playCount += 1;
      return Promise.resolve();
    };
    playSound("swing");
    const afterOn = playCount;
    toggleSoundEffects();
    playSound("swing");
    const afterOff = playCount;
    toggleBgm();
    const bgmAfterOff = {
      enabled: audioSettings.bgm,
      text: bgmToggleButton.textContent,
      pressed: bgmToggleButton.getAttribute?.("aria-pressed")
    };
    toggleSoundEffects();
    toggleBgm();
    return JSON.stringify({
      afterOn,
      afterOff,
      soundEnabled: audioSettings.soundEffects,
      bgmEnabled: audioSettings.bgm,
      soundText: soundToggleButton.textContent,
      menuSoundText: menuSoundToggleButton.textContent,
      soundPressed: soundToggleButton.getAttribute?.("aria-pressed"),
      menuSoundPressed: menuSoundToggleButton.getAttribute?.("aria-pressed"),
      bgmAfterOff,
      bgmText: bgmToggleButton.textContent,
      menuBgmText: menuBgmToggleButton.textContent,
      bgmPressed: bgmToggleButton.getAttribute?.("aria-pressed"),
      menuBgmPressed: menuBgmToggleButton.getAttribute?.("aria-pressed")
    });
  })()`
));

assert(audioToggleState.afterOn === 1, "sound effects should play when enabled");
assert(audioToggleState.afterOff === 1, "sound effects should not play when muted");
assert(audioToggleState.soundEnabled === true, "sound toggle should restore sound effects");
assert(audioToggleState.bgmEnabled === true, "BGM toggle should restore BGM");
assert(audioToggleState.soundText.includes("ON"), "sound toggle text should show restored ON state");
assert(audioToggleState.menuSoundText.includes("ON"), "menu sound toggle should mirror restored ON state");
assert(audioToggleState.soundPressed === "true", "sound toggle should expose pressed ON state");
assert(audioToggleState.menuSoundPressed === "true", "menu sound toggle should expose pressed ON state");
assert(audioToggleState.bgmAfterOff.enabled === false, "BGM toggle should disable BGM");
assert(audioToggleState.bgmAfterOff.text === "BGM OFF", "BGM toggle text should show OFF state");
assert(audioToggleState.bgmAfterOff.pressed === "false", "BGM toggle should expose pressed OFF state");
assert(audioToggleState.bgmText === "BGM ON", "BGM toggle text should show restored ON state");
assert(audioToggleState.menuBgmText === "BGM ON", "menu BGM toggle should mirror restored ON state");
assert(audioToggleState.bgmPressed === "true", "BGM toggle should expose pressed ON state");
assert(audioToggleState.menuBgmPressed === "true", "menu BGM toggle should expose pressed ON state");

const scoringCheerState = JSON.parse(runInGame(
  context,
  `(() => {
    let cheerCount = 0;
    sounds.cheer.play = () => {
      cheerCount += 1;
      return Promise.resolve();
    };

    const batter = findById(batters, "suzuki");
    const runner = findById(batters, "ichiro");
    const shallowSingle = {
      target: { x: field.centerX, y: defenseField.bases.home.y - 120 },
      direction: normalize({ x: 0, y: -1 }),
      flightDistance: 120,
      landingDistance: 120,
      ballTime: 1,
      isGrounder: true,
      isLiner: false,
      isDeep: false,
      power: 0.4,
      trajectory: "grounder"
    };

    bases = createEmptyBases();
    scores = { away: 0, home: 0 };
    battingTeam = "away";
    const noScoreRuns = advanceRunners("single", batter, shallowSingle, { kind: "single", scoreType: "single", caught: false });
    const afterNoScore = cheerCount;

    bases = createEmptyBases();
    bases.first = makeBaseRunner(runner);
    bases.second = makeBaseRunner(runner);
    bases.third = makeBaseRunner(runner);
    const scoringRuns = advanceRunners("walk", batter);
    const afterScore = cheerCount;

    setSoundEffectsEnabled(false);
    bases = createEmptyBases();
    bases.first = makeBaseRunner(runner);
    bases.second = makeBaseRunner(runner);
    bases.third = makeBaseRunner(runner);
    const mutedRuns = advanceRunners("walk", batter);
    const afterMutedScore = cheerCount;
    setSoundEffectsEnabled(true);

    return JSON.stringify({
      noScoreRuns,
      scoringRuns,
      mutedRuns,
      afterNoScore,
      afterScore,
      afterMutedScore,
      cheerSrc: sounds.cheer.src
    });
  })()`
));

assert(scoringCheerState.cheerSrc.includes(".mp3"), "scoring cheer should use the stadium crowd audio file");
assert(scoringCheerState.noScoreRuns === 0, "ordinary non-scoring advances should not score");
assert(scoringCheerState.afterNoScore === 0, "stadium cheer should not play when no run scores");
assert(scoringCheerState.scoringRuns === 1, "loaded walks should score one run");
assert(scoringCheerState.afterScore === 1, "stadium cheer should play when a run scores");
assert(scoringCheerState.mutedRuns === 1, "muted scoring test should still score");
assert(scoringCheerState.afterMutedScore === 1, "stadium cheer should respect the sound effects mute");

const bgmSelectionState = JSON.parse(runInGame(
  context,
  `(() => {
    showMenu();
    const menuKey = getCurrentBgmKey();
    const menuSrc = bgmTracks.menu.src;
    startGame();
    bases = createEmptyBases();
    updateCurrentBgm(true);
    const emptyKey = currentBgmKey;
    const relaxedSrc = bgmTracks.relaxed.src;
    bases.first = makeBaseRunner(findById(batters, "ichiro"));
    updateCurrentBgm(true);
    const firstKey = currentBgmKey;
    bases.second = makeBaseRunner(findById(batters, "shuto"));
    updateCurrentBgm(true);
    const secondKey = currentBgmKey;
    const scoringSrc = bgmTracks.scoring.src;
    bases.second = null;
    bases.third = makeBaseRunner(findById(batters, "suzuki"));
    updateCurrentBgm(true);
    const thirdKey = currentBgmKey;
    toggleBgm();
    const mutedKey = currentBgmKey;
    const mutedStates = Object.fromEntries(Object.entries(bgmTracks).map(([key, track]) => [key, { muted: track.muted, paused: track.paused }]));
    toggleBgm();
    showMenu();
    return JSON.stringify({
      menuKey,
      menuSrc,
      emptyKey,
      relaxedSrc,
      firstKey,
      secondKey,
      scoringSrc,
      thirdKey,
      mutedKey,
      mutedStates
    });
  })()`
));

assert(bgmSelectionState.menuKey === "menu", "main menu should select the menu BGM");
assert(bgmSelectionState.menuSrc.includes("sports_broadcast_baseball_bgm_loop.wav"), "menu BGM should use the sports broadcast loop");
assert(bgmSelectionState.emptyKey === "relaxed", "empty bases should select the relaxed play BGM");
assert(bgmSelectionState.firstKey === "relaxed", "runner on first should keep the relaxed play BGM");
assert(bgmSelectionState.relaxedSrc.includes("bright_relaxed_sports_broadcast_bgm_loop.wav"), "relaxed play BGM should use the bright relaxed loop");
assert(bgmSelectionState.secondKey === "scoring", "runner on second should select the scoring-position BGM");
assert(bgmSelectionState.thirdKey === "scoring", "runner on third should select the scoring-position BGM");
assert(bgmSelectionState.scoringSrc.includes("mountain_wind_stadium_anthem_bgm_loop.wav"), "scoring-position BGM should use the stadium anthem loop");
assert(bgmSelectionState.mutedKey === null, "turning BGM off should clear the active BGM key");
assert(Object.values(bgmSelectionState.mutedStates).every((state) => state.muted && state.paused), "turning BGM off should mute and pause every BGM track");

const bgmUnlockState = JSON.parse(runInGame(
  context,
  `(() => {
    showMenu();
    const originalPlay = bgmTracks.menu.play;
    let attempts = 0;
    bgmTracks.menu.play = () => {
      attempts += 1;
      if (attempts === 1) {
        return {
          catch() {},
          then() {
            return {
              catch(callback) {
                callback(new Error("autoplay blocked"));
              }
            };
          }
        };
      }
      bgmTracks.menu.paused = false;
      return {
        catch() {},
        then(callback) {
          callback();
          return { catch() {} };
        }
      };
    };
    updateCurrentBgm(true);
    const blocked = {
      attempts,
      needsGesture: bgmNeedsUserGesture,
      current: currentBgmKey,
      buttonText: bgmToggleButton.textContent
    };
    handleBgmButtonClick();
    bgmTracks.menu.play = originalPlay;
    return JSON.stringify({
      blocked,
      attempts,
      needsGesture: bgmNeedsUserGesture,
      current: currentBgmKey,
      paused: bgmTracks.menu.paused
    });
  })()`
));

assert(bgmUnlockState.blocked.attempts === 1, "initial menu BGM should try to play immediately");
assert(bgmUnlockState.blocked.needsGesture === true, "blocked menu BGM should wait for a user gesture retry");
assert(bgmUnlockState.blocked.current === null, "blocked menu BGM should clear the current BGM key for retry");
assert(bgmUnlockState.blocked.buttonText.includes("BGM"), "blocked menu BGM should show a start prompt on the BGM button");
assert(bgmUnlockState.attempts === 2, "BGM button should retry menu BGM without changing screens");
assert(bgmUnlockState.needsGesture === false, "successful unlock should clear the user gesture flag");
assert(bgmUnlockState.current === "menu", "successful unlock should keep menu BGM active");
assert(bgmUnlockState.paused === false, "successful unlock should start menu BGM playback");

const lineupState = JSON.parse(runInGame(
  context,
  "JSON.stringify({ teams: Object.keys(selected), awayRoles: selected.away.batters.map((entry) => entry.role), homeRoles: selected.home.batters.map((entry) => entry.role), awayBatters: selected.away.batters.map((entry) => entry.player.id), homeBatters: selected.home.batters.map((entry) => entry.player.id), awayPitchers: selected.away.pitchers.map((entry) => entry.id), homePitchers: selected.home.pitchers.map((entry) => entry.id), awayActivePitcher: selected.away.activePitcherId })"
));

assert(lineupState.teams.length === 2, "game should have two teams");
assert(lineupState.awayRoles.join(",") === "2B,CA,R,L,SS,C,DH", "away lineup should use the requested batting order");
assert(lineupState.homeRoles.join(",") === "R,L,2B,CA,C,SS,DH", "home lineup should use the requested batting order");
assert(lineupState.awayPitchers.length === 5 && lineupState.homePitchers.length === 5, "each team should carry five pitchers");
assert(lineupState.awayActivePitcher === lineupState.awayPitchers[0], "the first pitcher slot should be the starter");
assert(lineupState.awayPitchers.join(",") === "skubal,melton,jansen,hanifee,summers", "away default pitchers should match the requested regular roster");
assert(lineupState.homePitchers.join(",") === "shohei,yamamoto,ediaz,sasaki,rojas", "home default pitchers should match the requested regular roster");
assert(lineupState.awayBatters.join(",") === "mcgonigle,dingler,carpenter,greene,torkelson,outman,jones", "away default fielders should match the requested regular batting order");
assert(lineupState.homeBatters.join(",") === "otani,betts,freeman,willsmith,tucker,kimhyesong,rushing", "home default fielders should match the requested regular batting order");

const semiAutoControlState = JSON.parse(runInGame(
  context,
  `(() => {
    modeSelect.value = "versus";
    p1DefenseSelect.value = "semiauto";
    p2DefenseSelect.value = "manual";
    readMenu();
    battingTeam = "away";
    const awaySemiBaserun = isManualBaserunningControl("away");
    const homeManualDefense = isManualDefenseControl();
    p2DefenseSelect.value = "semiauto";
    readMenu();
    battingTeam = "away";
    const homeSemiDefense = isManualDefenseControl();
    p1DefenseSelect.value = "manual";
    readMenu();
    battingTeam = "away";
    const awayManualBaserun = isManualBaserunningControl("away");
    p1DefenseSelect.value = "auto";
    readMenu();
    battingTeam = "away";
    const awayAutoBaserun = isManualBaserunningControl("away");
    p1DefenseSelect.value = "auto";
    p2DefenseSelect.value = "auto";
    readMenu();
    return JSON.stringify({
      awayMode: defenseControlMode.away,
      homeMode: defenseControlMode.home,
      awaySemiBaserun,
      homeManualDefense,
      homeSemiDefense,
      awayManualBaserun,
      awayAutoBaserun
    });
  })()`
));

assert(semiAutoControlState.awaySemiBaserun === true, "semi-auto should make baserunning manual");
assert(semiAutoControlState.homeManualDefense === true, "manual should keep defense manual");
assert(semiAutoControlState.homeSemiDefense === false, "semi-auto should keep defense fully automatic");
assert(semiAutoControlState.awayManualBaserun === true, "manual should keep baserunning manual");
assert(semiAutoControlState.awayAutoBaserun === false, "auto should keep baserunning automatic");

const swingLockState = JSON.parse(runInGame(
  context,
  `(() => {
    gameMode = "practice";
    showMenu();
    startGame();
    startPitch("normal", { targetX: field.plateX, targetY: field.plateY });
    __advanceTime(10);
    startSwing();
    const firstStart = swingState.startTime;
    const firstCooldown = swingState.cooldownUntil;
    const firstDidSwing = swingState.didSwingThisPitch;
    swingState.isSwinging = false;
    __advanceTime(600);
    startSwing();
    return JSON.stringify({
      firstDidSwing,
      firstStart,
      firstCooldown,
      secondStart: swingState.startTime,
      secondCooldown: swingState.cooldownUntil,
      didSwingThisPitch: swingState.didSwingThisPitch
    });
  })()`
));

assert(swingLockState.firstDidSwing === true, "the first swing should mark the current pitch as swung at");
assert(swingLockState.secondStart === swingLockState.firstStart, "a second swing should not restart during the same pitch");
assert(swingLockState.secondCooldown === swingLockState.firstCooldown, "a second swing should not refresh cooldown during the same pitch");
assert(swingLockState.didSwingThisPitch === true, "the swing lock should remain tied to the current pitch");

const weakSwingState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    gameMode = "versus";
    gamePhase = "playing";
    battingTeam = "away";
    activeBatter = { ...findById(batters, "ichiro"), power: 3, meet: 10 };
    resetSwing();
    startSwing(performance.now(), "weak");
    const weak = {
      type: swingState.type,
      meet: getEffectiveBatterMeet(activeBatter),
      power: getEffectiveBatterPower(activeBatter) / effectiveBatterPowerScale
    };
    resetSwing();
    startSwing(performance.now(), "strong");
    const strong = {
      type: swingState.type,
      meet: getEffectiveBatterMeet(activeBatter),
      power: getEffectiveBatterPower(activeBatter) / effectiveBatterPowerScale
    };
    resetSwing();
    startSwing(performance.now(), "bunt");
    const bunt = {
      type: swingState.type,
      meet: getEffectiveBatterMeet(activeBatter),
      power: getEffectiveBatterPower(activeBatter) / effectiveBatterPowerScale
    };
    const buntProfile = buildBattedBallProfile({
      timeDiff: 0,
      quality: 0.9,
      timingScore: 0.9,
      barrelScore: 0.9,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      sweetSpotScore: 0.95,
      inGoodContactZone: true,
      yellowZoneBoost: 0
    });
    const buntBall = buildBattedBall(buntProfile.power, buntProfile.direction, hitLabels.grounder, buntProfile);
    const buntFielder = chooseBuntDefenseFielder(getDefensiveLineup("away"), buntBall);
    const buntOutcome = resolveDefenseOutcome(buntFielder, buntBall, createBatterRunner(activeBatter));
    const solidBuntRandom = Math.random;
    const solidBuntRolls = [0.5, 0.5, 0.5, 0.18, 0.01, 0.5, 0.5];
    Math.random = () => solidBuntRolls.length ? solidBuntRolls.shift() : 0.5;
    const solidBuntProfile = buildBattedBallProfile({
      timeDiff: 52,
      quality: 0.3,
      timingScore: 0.38,
      barrelScore: 0.38,
      zoneScore: 0.62,
      plateDistance: 30,
      outsideStrikeZone: false,
      sweetSpotScore: 0.36,
      inGoodContactZone: true,
      yellowZoneBoost: 0
    });
    Math.random = solidBuntRandom;
    const badBuntRandom = Math.random;
    const badBuntRolls = [0.5, 0.5, 0.9, 0.02, 0.5, 0.5];
    Math.random = () => badBuntRolls.length ? badBuntRolls.shift() : 0.5;
    const badBuntProfile = buildBattedBallProfile({
      timeDiff: 180,
      quality: 0.18,
      timingScore: 0.22,
      barrelScore: 0.28,
      zoneScore: 0.42,
      plateDistance: 52,
      outsideStrikeZone: false,
      sweetSpotScore: 0.22,
      inGoodContactZone: false,
      yellowZoneBoost: 0
    });
    Math.random = badBuntRandom;
    const badBuntBall = buildBattedBall(badBuntProfile.power, badBuntProfile.direction, hitLabels.popup, badBuntProfile);
    const badBuntFielder = chooseBuntDefenseFielder(getDefensiveLineup("away"), badBuntBall);
    const badBuntOutcome = resolveDefenseOutcome(badBuntFielder, badBuntBall, createBatterRunner(activeBatter));
    count = { strikes: 2, balls: 0, outs: 0 };
    finishPitch(hitLabels.foul, "foul", 0.2, 0, badBuntProfile.direction, badBuntProfile);
    const twoStrikeBuntFoul = {
      strikes: count.strikes,
      outs: count.outs,
      message
    };
    count = { strikes: 2, balls: 0, outs: 0 };
    resetSwing();
    startSwing(performance.now(), "bunt");
    const directBuntFoulProfile = buildBattedBallProfile({
      timeDiff: 180,
      quality: 0.18,
      timingScore: 0.22,
      barrelScore: 0.28,
      zoneScore: 0.42,
      plateDistance: 52,
      outsideStrikeZone: false,
      sweetSpotScore: 0.22,
      inGoodContactZone: false,
      yellowZoneBoost: 0
    });
    const directBuntFoulResult = decideHitResultFromBattedProfile({
      timeDiff: 180,
      quality: 0.18,
      timingScore: 0.22,
      barrelScore: 0.28,
      zoneScore: 0.42,
      plateDistance: 52,
      outsideStrikeZone: false,
      sweetSpotScore: 0.22,
      inGoodContactZone: false,
      yellowZoneBoost: 0
    });
    finishPitch(directBuntFoulResult.label, "foul", directBuntFoulResult.power, 180, directBuntFoulResult.direction, directBuntFoulResult.battedProfile);
    const directTwoStrikeBuntFoul = {
      profileHasBunt: directBuntFoulProfile.isBunt === true,
      resultHasBunt: directBuntFoulResult.battedProfile?.isBunt === true,
      strikes: count.strikes,
      outs: count.outs,
      message
    };
    resetSwing();
    gamepadState.previousButtons.away = new Set();
    handleGamepadButtonPresses({
      buttons: [{ pressed: false }, { pressed: true }, { pressed: false }, { pressed: false }],
      axes: [0, 0]
    }, "away");
    const button1Type = swingState.type;
    resetSwing();
    bases = createEmptyBases();
    stealState = createStealState();
    gamepadState.previousButtons.away = new Set();
    handleGamepadButtonPresses({
      buttons: [{ pressed: false }, { pressed: true }, { pressed: false }, { pressed: false }],
      axes: [0, -1]
    }, "away");
    const button1WithStickType = swingState.type;
    const button1WithStickStealActive = stealState.active;
    resetSwing();
    gamepadState.previousButtons.away = new Set();
    handleGamepadButtonPresses({
      buttons: [{ pressed: false }, { pressed: false }, { pressed: true }, { pressed: false }],
      axes: [0, 0]
    }, "away");
    const button2Type = swingState.type;
    resetSwing();
    gamepadState.previousButtons.away = new Set();
    handleGamepadButtonPresses({
      buttons: [{ pressed: false }, { pressed: false }, { pressed: false }, { pressed: true }],
      axes: [0, 0]
    }, "away");
    const button3Type = swingState.type;
    resetSwing();
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    stealState = createStealState();
    isPitching = true;
    pendingPitch = { releaseTime: performance.now() + 200, typeKey: "normal" };
    currentPitchType = "normal";
    gamepadState.previousButtons.away = new Set();
    handleGamepadButtonPresses({
      buttons: [{ pressed: true }, { pressed: false }, { pressed: false }, { pressed: false }],
      axes: [0, -1]
    }, "away");
    const button0StealActive = stealState.active;
    const button0StealTarget = stealState.targetBase;
    return JSON.stringify({ weak, strong, bunt, buntProfile, buntBall, buntFielderRole: buntFielder.role, buntOutcome, solidBuntProfile, badBuntProfile, badBuntBall, badBuntFielderRole: badBuntFielder.role, badBuntOutcome, twoStrikeBuntFoul, directTwoStrikeBuntFoul, button1Type, button1WithStickType, button1WithStickStealActive, button2Type, button3Type, button0StealActive, button0StealTarget });
  })()`
));

assert(weakSwingState.weak.type === "weak", "button-1/weak swing should mark the swing type");
assert(weakSwingState.weak.meet === 12, "weak swing should allow high-meet batters to exceed 10 by adding two meet points");
assert(weakSwingState.weak.power === 1, "weak swing should lower power by two with a floor of one");
assert(weakSwingState.strong.meet === 10 && weakSwingState.strong.power === 3, "strong swing should keep the batter's normal meet and power");
assert(weakSwingState.bunt.type === "bunt", "button-3/bunt swing should mark the swing type");
assert(weakSwingState.bunt.meet === 15, "bunt swing should add five meet points and allow values over 10");
assert(weakSwingState.bunt.power === 1, "bunt swing should sharply reduce power with a floor of one");
assert(weakSwingState.buntProfile.isBunt === true && weakSwingState.buntProfile.power <= 0.34 && weakSwingState.buntProfile.launchAngle <= 3, "good bunt contact should become a weak ground-ball profile instead of an outfield drive");
assert(weakSwingState.buntProfile.buntLineChance >= 0.9 && weakSwingState.buntProfile.buntPitcherFrontChance <= 0.04, "60-ish good bunt contact should strongly favor the first-base or third-base line instead of rolling in front of the pitcher");
assert(weakSwingState.buntBall.isBunt === true && weakSwingState.buntBall.landingDistance >= 180 && weakSwingState.buntBall.landingDistance < 560 && weakSwingState.buntBall.distance < 590, "bunt batted balls should roll longer for pitcher fielding while staying inside the infield");
assert(Math.abs(weakSwingState.buntProfile.direction.x) >= 0.78 && Math.abs(weakSwingState.buntBall.direction.x) >= 0.78, "good bunt direction should stay near the first-base or third-base line after batted-ball construction");
assert(["P", "1B", "2B", "SS", "3B"].includes(weakSwingState.buntFielderRole), "bunts should be assigned to the pitcher or an infielder");
assert(weakSwingState.buntOutcome.kind === "force" && weakSwingState.buntOutcome.needsThrow === true && weakSwingState.buntOutcome.targetBase === "first", "bunts should always become an infield throw play instead of leaking to the outfield");
assert(weakSwingState.buntProfile.buntFoulChance >= 0.075 && weakSwingState.badBuntProfile.buntFoulChance > weakSwingState.buntProfile.buntFoulChance, "bunt foul chance should exist and rise on poor bunt contact");
assert(weakSwingState.solidBuntProfile.solidBuntContact === true && weakSwingState.solidBuntProfile.pitcherBuntPopup === false, "solid bunt contact should be protected from becoming pitcher popup flies too often");
assert(weakSwingState.solidBuntProfile.protectedPopupChance < weakSwingState.solidBuntProfile.pitcherBuntPopupChance, "solid bunt contact should lower the popup-fly chance");
assert(weakSwingState.solidBuntProfile.buntLineChance >= 0.18 && weakSwingState.solidBuntProfile.buntLineChance <= 0.28, "30-50 point bunts should not over-favor the first-base or third-base line");
assert(weakSwingState.solidBuntProfile.buntPitcherFrontChance >= 0.68, "30-50 point bunts should more often roll in front of the pitcher");
assert(weakSwingState.badBuntProfile.buntLineChance < weakSwingState.buntProfile.buntLineChance, "bad bunt contact should reduce first-base and third-base line placement");
assert(weakSwingState.badBuntProfile.pitcherBuntPopup === true && weakSwingState.badBuntBall.isPopupFly === true, "clearly bad bunt contact should still be able to become a pitcher-area popup fly");
assert(weakSwingState.badBuntFielderRole === "P", "pitcher-area bunt popups should favor the pitcher as the defender");
assert(weakSwingState.badBuntOutcome.kind === "out" && weakSwingState.badBuntOutcome.caught === true && weakSwingState.badBuntOutcome.needsThrow === false, "pitcher-area bunt popups should be caught in the air instead of bouncing into a bunt throw play");
assert(weakSwingState.twoStrikeBuntFoul.outs === 1 && weakSwingState.twoStrikeBuntFoul.strikes === 0 && weakSwingState.twoStrikeBuntFoul.message.includes("三振"), "two-strike bunt fouls should count as strikeouts");
assert(weakSwingState.directTwoStrikeBuntFoul.profileHasBunt === true && weakSwingState.directTwoStrikeBuntFoul.resultHasBunt === true && weakSwingState.directTwoStrikeBuntFoul.outs === 1 && weakSwingState.directTwoStrikeBuntFoul.strikes === 0 && weakSwingState.directTwoStrikeBuntFoul.message.includes("三振"), "two-strike bunt fouls from the normal batted-ball result path should display strikeout and add an out");
assert(weakSwingState.button1Type === "weak", "gamepad button 1 should start a weak swing when pressed alone");
assert(weakSwingState.button1WithStickType === "weak" && weakSwingState.button1WithStickStealActive === false, "gamepad button 1 should stay a weak swing even with a direction held");
assert(weakSwingState.button2Type === "strong", "gamepad button 2 should keep starting the existing strong swing");
assert(weakSwingState.button3Type === "bunt", "gamepad button 3 should start a bunt swing");
assert(weakSwingState.button0StealActive === true && weakSwingState.button0StealTarget === "second", "gamepad button 0 plus a direction should start steals instead of weak swings");

const hbpAfterSwingState = JSON.parse(runInGame(
  context,
  `(() => {
    function putPitchInHbpBox(didSwing) {
      resetBall();
      resetSwing();
      const box = getHbpHitBox();
      ball.x = (box.left + box.right) / 2;
      ball.y = (box.top + box.bottom) / 2;
      ball.prevX = ball.x;
      ball.prevY = ball.y;
      ball.radius = 8;
      ball.vx = 0;
      ball.vy = 0;
      ball.baseVx = 0;
      ball.baseVy = 0;
      ball.active = true;
      ball.inPitch = true;
      ball.crossedPlate = false;
      ball.plateTime = performance.now();
      isPitching = true;
      swingState.didSwingThisPitch = didSwing;
      swingState.madeContact = false;
      update(16);
      return { strikes: count.strikes, balls: count.balls, message, hbpPoseActive: hbpPose.active };
    }

    startGame();
    count = { strikes: 0, balls: 0, outs: 0 };
    bases = createEmptyBases();
    const afterSwing = putPitchInHbpBox(true);
    startGame();
    count = { strikes: 0, balls: 0, outs: 0 };
    bases = createEmptyBases();
    const noSwing = putPitchInHbpBox(false);
    return JSON.stringify({ afterSwing, noSwing });
  })()`
));

assert(hbpAfterSwingState.afterSwing.strikes === 1, "a pitch hitting the batter after a swing should count as a strike");
assert(!hbpAfterSwingState.afterSwing.message.includes("デッドボール"), "a pitch hitting the batter after a swing should not become hit-by-pitch");
assert(hbpAfterSwingState.noSwing.message.includes("デッドボール"), "a pitch hitting the batter without a swing should still become hit-by-pitch");

const lineupEditState = JSON.parse(runInGame(
  context,
  `(() => {
    menuSelection = cloneMenuSelection(defaultMenuSelection);
    const originalFirst = menuSelection.away["2B"];
    const originalRight = menuSelection.away.R;
    const originalLeft = menuSelection.away.L;
    const positionChanged = changeLineupSlotPosition("away", "2B", "R");
    selected = createSelectedTeams(menuSelection);
    const afterPosition = {
      order: [...menuSelection.away.lineupOrder],
      firstRole: selected.away.batters[0].role,
      firstPlayer: selected.away.batters[0].player.id,
      secondBasePlayer: menuSelection.away["2B"],
      rightPlayer: menuSelection.away.R
    };
    const playersSwapped = swapMenuLineupPlayers("away", "R", "L");
    selected = createSelectedTeams(menuSelection);
    const afterDrag = {
      order: [...menuSelection.away.lineupOrder],
      firstRole: selected.away.batters[0].role,
      firstPlayer: selected.away.batters[0].player.id,
      leftPlayer: menuSelection.away.L,
      rightPlayer: menuSelection.away.R
    };
    const movedToFifth = moveMenuLineupRoleToSlot("away", "R", 4);
    selected = createSelectedTeams(menuSelection);
    const afterNumberPick = {
      order: [...menuSelection.away.lineupOrder],
      fifthRole: selected.away.batters[4].role,
      fifthPlayer: selected.away.batters[4].player.id
    };
    menuSelection = cloneMenuSelection(defaultMenuSelection);
    selected = createSelectedTeams(menuSelection);
    return JSON.stringify({
      originalFirst,
      originalRight,
      originalLeft,
      positionChanged,
      playersSwapped,
      movedToFifth,
      afterPosition,
      afterDrag,
      afterNumberPick
    });
  })()`
));

assert(lineupEditState.positionChanged === true, "lineup position select should accept another fielder role");
assert(lineupEditState.afterPosition.order.join(",") === "R,CA,2B,L,SS,C,DH", "changing a slot position should update batting order roles");
assert(lineupEditState.afterPosition.firstRole === "R", "changed first slot should use the selected defensive position");
assert(lineupEditState.afterPosition.firstPlayer === lineupEditState.originalFirst, "changing position should keep the player in the batting slot");
assert(lineupEditState.afterPosition.secondBasePlayer === lineupEditState.originalRight, "changing position should swap the displaced fielder into the old position");
assert(lineupEditState.playersSwapped === true, "dragging a lineup card should swap players between slots");
assert(lineupEditState.afterDrag.order.join(",") === "R,CA,2B,L,SS,C,DH", "dragging players should not change slot defensive positions");
assert(lineupEditState.afterDrag.firstPlayer === lineupEditState.originalLeft, "dragging to the first slot should move that player into the slot");
assert(lineupEditState.afterDrag.leftPlayer === lineupEditState.originalFirst, "dragging should move the original first-slot player to the target slot");
assert(lineupEditState.movedToFifth === true, "number picking should move a batting-order role to the selected slot");
assert(lineupEditState.afterNumberPick.order.join(",") === "CA,2B,L,SS,R,C,DH", "number picking should reorder the batting slots");
assert(lineupEditState.afterNumberPick.fifthRole === "R", "number picking should put the chosen role at the requested order number");

const teamResetState = JSON.parse(runInGame(
  context,
  `(() => {
    menuSelection = cloneMenuSelection(defaultMenuSelection);
    updateMenuAbilityPanels();
    resetMenuTeam("away");
    const awayBlankRoles = [...pitcherRoles, ...batterRoles].every((role) => menuSelection.away[role] === "");
    const awayLineupReset = menuSelection.away.lineupOrder.join(",");
    const awayCost = getMenuTeamCost("away");
    const complete = isMenuTeamComplete("away");
    const startDisabled = startButton.disabled;
    const blankPitcherName = awayPitcherName.textContent;
    const blankBatterName = awayBatterSSName.textContent;
    autoFillMenuTeam("away");
    const autoPitcher = menuSelection.away.pitcher;
    const autoShortstop = menuSelection.away.SS;
    const autoLineup = menuSelection.away.lineupOrder.join(",");
    const autoComplete = isMenuTeamComplete("away");
    const autoCost = getMenuTeamCost("away");
    menuSelection = cloneMenuSelection(defaultMenuSelection);
    updateMenuAbilityPanels();
    return JSON.stringify({
      awayBlankRoles,
      awayLineupReset,
      awayCost,
      complete,
      startDisabled,
      blankPitcherName,
      blankBatterName,
      autoPitcher,
      autoShortstop,
      autoLineup,
      autoComplete,
      autoCost
    });
  })()`
));

assert(teamResetState.awayBlankRoles === true, "team reset should clear all selected pitchers and fielders");
assert(teamResetState.awayLineupReset === "SS,2B,L,C,R,CA,DH", "team reset should restore the default batting-order slots");
assert(teamResetState.awayCost === 0, "blank reset cards should count as zero points");
assert(teamResetState.complete === false, "a reset team should be treated as incomplete");
assert(teamResetState.startDisabled === true, "a reset team should disable the start button");
assert(teamResetState.blankPitcherName === "未選択", "reset pitchers should render as blank cards");
assert(teamResetState.blankBatterName === "未選択", "reset fielders should render as blank cards");
assert(teamResetState.autoPitcher === "skubal", "auto fill should restore the default starting pitcher");
assert(teamResetState.autoShortstop === "torkelson", "auto fill should restore the default fielder selections");
assert(teamResetState.autoLineup === "2B,CA,R,L,SS,C,DH", "auto fill should restore the default batting order");
assert(teamResetState.autoComplete === true, "auto fill should make the team complete");
assert(teamResetState.autoCost > 0 && teamResetState.autoCost <= 65, "auto fill should restore a valid point total");

const rosterAndPointState = JSON.parse(runInGame(
  context,
  `(() => {
    const shuto = findById(batters, "shuto");
    const kimhyesong = findById(batters, "kimhyesong");
    const trout = findById(batters, "trout");
    const freeman = findById(batters, "freeman");
    const leejunghoo = findById(batters, "leejunghoo");
    const rodgersBatter = findById(batters, "rodgers");
    const dingler = findById(catchers, "dingler");
    const calraleigh = findById(catchers, "calraleigh");
    const rodgersCatcher = findById(catchers, "rodgers");
    const harper = findById(batters, "harper");
    const tucker = findById(batters, "tucker");
    const arraez = findById(batters, "arraez");
    const wittjr = findById(batters, "wittjr");
    const goldschmidt = findById(batters, "goldschmidt");
    const acunajr = findById(batters, "acunajr");
    const ydiaz = findById(batters, "ydiaz");
    const tairaRemoved = !batters.some((batter) => batter.id === "taira");
    const shohei = findById(pitchers, "shohei");
    const sawamura = findById(pitchers, "sawamura");
    const magari = findById(pitchers, "magari");
    const misiorowski = findById(pitchers, "misiorowski");
    const miller = findById(pitchers, "miller");
    const ootake = findById(pitchers, "ootake");
    const hanifee = findById(pitchers, "hanifee");
    const sugiyama = findById(pitchers, "sugiyama");
    const sasaki = findById(pitchers, "sasaki");
    const matsui = findById(pitchers, "matsui");
    const rodgers = findById(pitchers, "rodgers");
    const fujinami = findById(pitchers, "fujinami");
    const skubal = findById(pitchers, "skubal");
    const ashby = findById(pitchers, "ashby");
    const melton = findById(pitchers, "melton");
    const cyyoung = findById(pitchers, "cyyoung");
    const maddux = findById(pitchers, "maddux");
    const ediaz = findById(pitchers, "ediaz");
    const jansen = findById(pitchers, "jansen");
    const ichiro = findById(batters, "ichiro");
    const ruth = findById(batters, "ruth");
    const nagashima = findById(batters, "nagashima");
    const bonds = findById(batters, "bonds");
    const sadaharu = findById(batters, "sadaharu");
    const nomura = findById(catchers, "nomura");
    const johnnybench = findById(catchers, "johnnybench");
    const selectedStarter = findById(pitchers, menuSelection.away.pitcher);
    const originalCost = selectedStarter.cost;
    const baseCost = getMenuTeamCost("away");
    selectedStarter.cost = 99;
    const pitcherIncludedCost = getMenuTeamCost("away");
    selectedStarter.cost = originalCost;
    const defaultAwayPitcherCost = getMenuPitcherTeamCost("away");
    const defaultHomePitcherCost = getMenuPitcherTeamCost("home");
    const originalAway = { ...menuSelection.away };
    menuSelection.away = { ...originalAway, SS: "nagashima", "2B": "ruth", L: "otani", C: "ichiro", R: "judge", CA: "nomura" };
    updateMenuPointStatus();
    const overLimitDisabled = startButton.disabled;
    const overLimitText = awayPitcherPointStatus.textContent;
    menuSelection.away = originalAway;
    updateMenuPointStatus();
    menuSelection.away = { ...originalAway, pitcher: "cyyoung", pitcher2: "maddux", pitcher3: "sawamura" };
    updateMenuPointStatus();
    const pitcherOverLimitDisabled = startButton.disabled;
    const pitcherOverLimitText = awayPitcherPointStatus.textContent;
    menuSelection.away = originalAway;
    updateMenuPointStatus();
    openPlayerChooser({ dataset: { team: "away", role: "L", kind: "batter" } });
    const chooserHtml = chooserOptions.innerHTML;
    const firstBatterOption = chooserHtml.match(/data-player-id="([^"]+)"/)?.[1] || "";
    const originalCreatorFirst = chooserHtml.trim().startsWith('<form class="original-player-creator');
    openPlayerChooser({ dataset: { team: "home", role: "R", kind: "batter" } });
    const simultaneousAwayChooserHtml = chooserOptions.innerHTML;
    const simultaneousHomeChooserHtml = chooserOptionsHome.innerHTML;
    const simultaneousChooserTitles = [chooserTitle.textContent, chooserTitleHome.textContent];
    closePlayerChooser("home");
    const makeOriginalForm = (values) => {
      const status = { textContent: "" };
      return {
        dataset: { team: "away", role: "L", kind: "batter" },
        classList: { toggle() {} },
        getAttribute(name) {
          return this.dataset[name.replace(/^data-/, "")] || "";
        },
        querySelector(selector) {
          if (selector === "[data-original-point-status]") return status;
          return null;
        },
        querySelectorAll(selector) {
          if (selector === "[data-original-field]") {
            return Object.entries(values).map(([field, value]) => ({ dataset: { originalField: field }, value: String(value), closest: () => null }));
          }
          return [];
        },
        status
      };
    };
    const originalOverForm = makeOriginalForm({ cost: 1, power: 12, meet: 12, run: 12, infieldDefense: 12, outfieldDefense: 12, arm: 12 });
    const originalOverState = updateOriginalBatterCreatorState(originalOverForm);
    const originalValidForm = makeOriginalForm({ name: "テストオリジナル", bats: "L", cost: 5, power: 4, meet: 4, run: 4, infieldDefense: 4, outfieldDefense: 4, arm: 4 });
    submitOriginalBatterCreator(originalValidForm);
    const originalSelected = menuSelection.away.L === "original-away-batter";
    const originalPlayer = findSelectedById(getPlayerListForRole("L"), "original-away-batter");
    const originalSelectedCost = getMenuPlayerCost(getPlayerListForRole("L"), "original-away-batter");
    closePlayerChooser();
    menuSelection.away = originalAway;
    updateMenuPointStatus();
    openPlayerChooser({ dataset: { team: "away", role: "CA", kind: "catcher" } });
    const catcherChooserHtml = chooserOptions.innerHTML;
    const firstCatcherOption = catcherChooserHtml.match(/data-player-id="([^"]+)"/)?.[1] || "";
    const catcherChooserHasDingler = catcherChooserHtml.includes('data-player-id="dingler"');
    closePlayerChooser();
    menuSelection.away = { ...originalAway, SS: "nagashima" };
    updateMenuPointStatus();
    openPlayerChooser({ dataset: { team: "away", role: "R", kind: "batter" } });
    const overLimitBatterChooserHtml = chooserOptions.innerHTML;
    const overLimitBatterDisabled = overLimitBatterChooserHtml.includes('data-player-id="ichiro"') && overLimitBatterChooserHtml.includes("disabled");
    const beforeOverLimitPick = menuSelection.away.R;
    selectMenuPlayer({ dataset: { team: "away", role: "R", kind: "batter", playerId: "ichiro" } });
    const overLimitPickBlocked = menuSelection.away.R === beforeOverLimitPick;
    closePlayerChooser();
    menuSelection.away = originalAway;
    updateMenuPointStatus();
    openPlayerChooser({ dataset: { team: "away", role: "pitcher", kind: "pitcher" } });
    const pitcherChooserHtml = chooserOptions.innerHTML;
    const firstPitcherOption = pitcherChooserHtml.match(/data-player-id="([^"]+)"/)?.[1] || "";
    const pitcherChooserHasPitchHandRow = pitcherChooserHtml.includes(">投<") || pitcherChooserHtml.includes(">投</span>");
    closePlayerChooser();
    openPlayerChooser({ dataset: { team: "away", role: "pitcher2", kind: "pitcher" } });
    const pitcher2ChooserHtml = chooserOptions.innerHTML;
    const duplicatePitcherDisabled = pitcher2ChooserHtml.includes('data-player-id="shohei"') && pitcher2ChooserHtml.includes("disabled");
    closePlayerChooser();
    menuSelection.away = { ...originalAway, pitcher: "rodgers", pitcher2: "shohei", pitcher3: "saiki" };
    openPlayerChooser({ dataset: { team: "away", role: "CA", kind: "catcher" } });
    const catcherWithRodgersPitcherHtml = chooserOptions.innerHTML;
    const rodgersCatcherAllowedWithPitcher = catcherWithRodgersPitcherHtml.includes('data-player-id="rodgers"') && !catcherWithRodgersPitcherHtml.match(/data-player-id="rodgers"[^>]*disabled/);
    closePlayerChooser();
    menuSelection.away = { ...originalAway, CA: "rodgers" };
    openPlayerChooser({ dataset: { team: "away", role: "pitcher", kind: "pitcher" } });
    const pitcherWithRodgersCatcherHtml = chooserOptions.innerHTML;
    const rodgersPitcherAllowedWithCatcher = pitcherWithRodgersCatcherHtml.includes('data-player-id="rodgers"') && !pitcherWithRodgersCatcherHtml.match(/data-player-id="rodgers"[^>]*disabled/);
    closePlayerChooser();
    menuSelection.away = { ...originalAway, pitcher: "rodgers", CA: "rodgers" };
    const rodgersPitcherCatcherComplete = isMenuTeamComplete("away");
    const rodgersPitcherCatcherCost = getMenuTeamCost("away");
    const rodgersPitcherCatcherRawCost = getMenuFielderTeamCost("away") + getMenuPitcherTeamCost("away");
    menuSelection.away = { ...originalAway, pitcher: "rodgers", SS: "harper", "2B": "freeman", L: "suzuki", C: "leejunghoo", R: "otani", CA: "willsmith" };
    openPlayerChooser({ dataset: { team: "away", role: "SS", kind: "batter" } });
    const batterWithRodgersPitcherHtml = chooserOptions.innerHTML;
    const rodgersBatterAllowedWithPitcher = batterWithRodgersPitcherHtml.includes('data-player-id="rodgers"') && !batterWithRodgersPitcherHtml.match(/data-player-id="rodgers"[^>]*disabled/);
    closePlayerChooser();
    menuSelection.away = { ...originalAway, pitcher: "rodgers", pitcher2: "misiorowski", pitcher3: "miller", SS: "rodgers", "2B": "freeman", L: "suzuki", C: "leejunghoo", R: "otani", CA: "willsmith" };
    const rodgersPitcherBatterComplete = isMenuTeamComplete("away");
    const rodgersPitcherBatterCost = getMenuTeamCost("away");
    const rodgersPitcherBatterRawCost = getMenuFielderTeamCost("away") + getMenuPitcherTeamCost("away");
    menuSelection.away = { ...originalAway, pitcher: "shohei", pitcher2: "misiorowski", pitcher3: "miller", SS: "rodgers", CA: "willsmith" };
    openPlayerChooser({ dataset: { team: "away", role: "pitcher", kind: "pitcher" } });
    const pitcherWithRodgersBatterHtml = chooserOptions.innerHTML;
    const rodgersPitcherAllowedWithBatter = pitcherWithRodgersBatterHtml.includes('data-player-id="rodgers"') && !pitcherWithRodgersBatterHtml.match(/data-player-id="rodgers"[^>]*disabled/);
    closePlayerChooser();
    openPlayerChooser({ dataset: { team: "away", role: "CA", kind: "catcher" } });
    const catcherWithRodgersBatterHtml = chooserOptions.innerHTML;
    const rodgersCatcherDisabledByBatter = catcherWithRodgersBatterHtml.includes('data-player-id="rodgers"') && catcherWithRodgersBatterHtml.includes("disabled");
    closePlayerChooser();
    menuSelection.away = { ...menuSelection.away, CA: "rodgers" };
    const rodgersBatterConflictIncomplete = !isMenuTeamComplete("away");
    menuSelection.away = originalAway;
    const selectedPitcherIds = createSelectedTeams(menuSelection).away.pitchers.map((pitcherInfo) => pitcherInfo.id);
    const costBadgeName = { textContent: "" };
    const costBadgeStats = { innerHTML: "" };
    renderBatterPanel(shuto, costBadgeName, costBadgeStats);
    const cardHtml = costBadgeStats.innerHTML;
    const pitcherCardName = { textContent: "" };
    const pitcherCardStats = { innerHTML: "" };
    renderPitcherPanel(shohei, pitcherCardName, pitcherCardStats);
    const pitcherCardHtml = pitcherCardStats.innerHTML;
    const injectedBatter = {
      id: 'custom" onclick="alert(1)',
      name: '<img src=x onerror=alert(1)>',
      bats: "R",
      power: 5,
      meet: 5,
      run: 5,
      infieldDefense: 5,
      outfieldDefense: 5,
      arm: 5,
      cost: 1
    };
    batters.push(injectedBatter);
    renderPracticePlayerSelect(practiceBatterSelect, batters, injectedBatter.id, "batter");
    const escapedPracticeSelectHtml = practiceBatterSelect.innerHTML;
    openPlayerChooser({ dataset: { team: "away", role: "R", kind: "batter" } });
    const escapedChooserHtml = chooserOptions.innerHTML;
    closePlayerChooser();
    batters.pop();
    renderPracticePlayerSelects();
    return JSON.stringify({
      shuto: {
        bats: shuto.bats,
        power: shuto.power,
        meet: shuto.meet,
        run: shuto.run,
        infieldDefense: shuto.infieldDefense,
        outfieldDefense: shuto.outfieldDefense,
        arm: shuto.arm,
        cost: shuto.cost
      },
      kimhyesong: {
        bats: kimhyesong.bats,
        power: kimhyesong.power,
        meet: kimhyesong.meet,
        run: kimhyesong.run,
        infieldDefense: kimhyesong.infieldDefense,
        outfieldDefense: kimhyesong.outfieldDefense,
        arm: kimhyesong.arm,
        cost: kimhyesong.cost
      },
      trout: {
        bats: trout.bats,
        power: trout.power,
        meet: trout.meet,
        run: trout.run,
        infieldDefense: trout.infieldDefense,
        outfieldDefense: trout.outfieldDefense,
        arm: trout.arm,
        cost: trout.cost
      },
      freeman: {
        bats: freeman.bats,
        power: freeman.power,
        meet: freeman.meet,
        run: freeman.run,
        infieldDefense: freeman.infieldDefense,
        outfieldDefense: freeman.outfieldDefense,
        arm: freeman.arm,
        cost: freeman.cost
      },
      leejunghoo: {
        bats: leejunghoo.bats,
        power: leejunghoo.power,
        meet: leejunghoo.meet,
        run: leejunghoo.run,
        infieldDefense: leejunghoo.infieldDefense,
        outfieldDefense: leejunghoo.outfieldDefense,
        arm: leejunghoo.arm,
        cost: leejunghoo.cost
      },
      dingler: {
        bats: dingler.bats,
        power: dingler.power,
        meet: dingler.meet,
        run: dingler.run,
        arm: dingler.arm,
        cost: dingler.cost
      },
      calraleigh: {
        bats: calraleigh.bats,
        power: calraleigh.power,
        meet: calraleigh.meet,
        run: calraleigh.run,
        arm: calraleigh.arm,
        cost: calraleigh.cost
      },
      nomura: {
        bats: nomura.bats,
        power: nomura.power,
        meet: nomura.meet,
        run: nomura.run,
        arm: nomura.arm,
        cost: nomura.cost
      },
      johnnybench: {
        bats: johnnybench.bats,
        power: johnnybench.power,
        meet: johnnybench.meet,
        run: johnnybench.run,
        arm: johnnybench.arm,
        cost: johnnybench.cost
      },
      rodgersCatcher: {
        bats: rodgersCatcher.bats,
        power: rodgersCatcher.power,
        meet: rodgersCatcher.meet,
        run: rodgersCatcher.run,
        arm: rodgersCatcher.arm,
        cost: rodgersCatcher.cost
      },
      rodgersBatter: {
        bats: rodgersBatter.bats,
        power: rodgersBatter.power,
        meet: rodgersBatter.meet,
        run: rodgersBatter.run,
        infieldDefense: rodgersBatter.infieldDefense,
        outfieldDefense: rodgersBatter.outfieldDefense,
        arm: rodgersBatter.arm,
        cost: rodgersBatter.cost
      },
      harper: {
        bats: harper.bats,
        power: harper.power,
        meet: harper.meet,
        run: harper.run,
        infieldDefense: harper.infieldDefense,
        outfieldDefense: harper.outfieldDefense,
        arm: harper.arm,
        cost: harper.cost
      },
      tucker: {
        bats: tucker.bats,
        power: tucker.power,
        meet: tucker.meet,
        run: tucker.run,
        infieldDefense: tucker.infieldDefense,
        outfieldDefense: tucker.outfieldDefense,
        arm: tucker.arm,
        cost: tucker.cost
      },
      arraez: {
        bats: arraez.bats,
        power: arraez.power,
        meet: arraez.meet,
        run: arraez.run,
        infieldDefense: arraez.infieldDefense,
        outfieldDefense: arraez.outfieldDefense,
        arm: arraez.arm,
        cost: arraez.cost
      },
      wittjr: {
        bats: wittjr.bats,
        power: wittjr.power,
        meet: wittjr.meet,
        run: wittjr.run,
        infieldDefense: wittjr.infieldDefense,
        outfieldDefense: wittjr.outfieldDefense,
        arm: wittjr.arm,
        cost: wittjr.cost
      },
      goldschmidt: {
        bats: goldschmidt.bats,
        power: goldschmidt.power,
        meet: goldschmidt.meet,
        run: goldschmidt.run,
        infieldDefense: goldschmidt.infieldDefense,
        outfieldDefense: goldschmidt.outfieldDefense,
        arm: goldschmidt.arm,
        cost: goldschmidt.cost
      },
      acunajr: {
        bats: acunajr.bats,
        power: acunajr.power,
        meet: acunajr.meet,
        run: acunajr.run,
        infieldDefense: acunajr.infieldDefense,
        outfieldDefense: acunajr.outfieldDefense,
        arm: acunajr.arm,
        cost: acunajr.cost
      },
      ydiaz: {
        bats: ydiaz.bats,
        power: ydiaz.power,
        meet: ydiaz.meet,
        run: ydiaz.run,
        infieldDefense: ydiaz.infieldDefense,
        outfieldDefense: ydiaz.outfieldDefense,
        arm: ydiaz.arm,
        cost: ydiaz.cost
      },
      tairaRemoved,
      ichiro: {
        bats: ichiro.bats,
        power: ichiro.power,
        meet: ichiro.meet,
        run: ichiro.run,
        infieldDefense: ichiro.infieldDefense,
        outfieldDefense: ichiro.outfieldDefense,
        arm: ichiro.arm,
        cost: ichiro.cost
      },
      ruth: {
        bats: ruth.bats,
        power: ruth.power,
        meet: ruth.meet,
        run: ruth.run,
        infieldDefense: ruth.infieldDefense,
        outfieldDefense: ruth.outfieldDefense,
        arm: ruth.arm,
        cost: ruth.cost
      },
      nagashima: {
        bats: nagashima.bats,
        power: nagashima.power,
        meet: nagashima.meet,
        run: nagashima.run,
        infieldDefense: nagashima.infieldDefense,
        outfieldDefense: nagashima.outfieldDefense,
        arm: nagashima.arm,
        cost: nagashima.cost
      },
      bonds: {
        bats: bonds.bats,
        power: bonds.power,
        meet: bonds.meet,
        run: bonds.run,
        infieldDefense: bonds.infieldDefense,
        outfieldDefense: bonds.outfieldDefense,
        arm: bonds.arm,
        cost: bonds.cost
      },
      sadaharu: {
        bats: sadaharu.bats,
        power: sadaharu.power,
        meet: sadaharu.meet,
        run: sadaharu.run,
        infieldDefense: sadaharu.infieldDefense,
        outfieldDefense: sadaharu.outfieldDefense,
        arm: sadaharu.arm,
        cost: sadaharu.cost
      },
      shohei: {
        fastKmh: shohei.fastKmh,
        stuff: shohei.stuff,
        stamina: shohei.stamina,
        cost: shohei.cost
      },
      sawamura: {
        fastKmh: sawamura.fastKmh,
        rightBreak: sawamura.rightBreak,
        leftBreak: sawamura.leftBreak,
        slowChange: sawamura.slowChange,
        fastChange: sawamura.fastChange,
        control: sawamura.control,
        stuff: sawamura.stuff,
        fielding: sawamura.fielding,
        stamina: sawamura.stamina,
        cost: sawamura.cost
      },
      magari: {
        throws: magari.throws,
        fastKmh: magari.fastKmh,
        rightBreak: magari.rightBreak,
        leftBreak: magari.leftBreak,
        slowChange: magari.slowChange,
        fastChange: magari.fastChange,
        control: magari.control,
        stuff: magari.stuff,
        fielding: magari.fielding,
        stamina: magari.stamina,
        cost: magari.cost
      },
      misiorowski: {
        throws: misiorowski.throws,
        fastKmh: misiorowski.fastKmh,
        rightBreak: misiorowski.rightBreak,
        leftBreak: misiorowski.leftBreak,
        slowChange: misiorowski.slowChange,
        fastChange: misiorowski.fastChange,
        control: misiorowski.control,
        stuff: misiorowski.stuff,
        fielding: misiorowski.fielding,
        stamina: misiorowski.stamina,
        cost: misiorowski.cost
      },
      miller: {
        throws: miller.throws,
        fastKmh: miller.fastKmh,
        rightBreak: miller.rightBreak,
        leftBreak: miller.leftBreak,
        slowChange: miller.slowChange,
        fastChange: miller.fastChange,
        control: miller.control,
        stuff: miller.stuff,
        fielding: miller.fielding,
        stamina: miller.stamina,
        cost: miller.cost
      },
      ootake: {
        throws: ootake.throws,
        fastKmh: ootake.fastKmh,
        rightBreak: ootake.rightBreak,
        leftBreak: ootake.leftBreak,
        slowChange: ootake.slowChange,
        fastChange: ootake.fastChange,
        control: ootake.control,
        stuff: ootake.stuff,
        fielding: ootake.fielding,
        stamina: ootake.stamina,
        cost: ootake.cost
      },
      hanifee: {
        throws: hanifee.throws,
        fastKmh: hanifee.fastKmh,
        rightBreak: hanifee.rightBreak,
        leftBreak: hanifee.leftBreak,
        slowChange: hanifee.slowChange,
        fastChange: hanifee.fastChange,
        control: hanifee.control,
        stuff: hanifee.stuff,
        fielding: hanifee.fielding,
        stamina: hanifee.stamina,
        cost: hanifee.cost
      },
      sugiyama: {
        throws: sugiyama.throws,
        fastKmh: sugiyama.fastKmh,
        rightBreak: sugiyama.rightBreak,
        leftBreak: sugiyama.leftBreak,
        slowChange: sugiyama.slowChange,
        fastChange: sugiyama.fastChange,
        control: sugiyama.control,
        stuff: sugiyama.stuff,
        fielding: sugiyama.fielding,
        stamina: sugiyama.stamina,
        cost: sugiyama.cost
      },
      sasaki: {
        throws: sasaki.throws,
        fastKmh: sasaki.fastKmh,
        rightBreak: sasaki.rightBreak,
        leftBreak: sasaki.leftBreak,
        slowChange: sasaki.slowChange,
        fastChange: sasaki.fastChange,
        control: sasaki.control,
        stuff: sasaki.stuff,
        fielding: sasaki.fielding,
        stamina: sasaki.stamina,
        cost: sasaki.cost
      },
      matsui: {
        throws: matsui.throws,
        fastKmh: matsui.fastKmh,
        rightBreak: matsui.rightBreak,
        leftBreak: matsui.leftBreak,
        slowChange: matsui.slowChange,
        fastChange: matsui.fastChange,
        control: matsui.control,
        stuff: matsui.stuff,
        fielding: matsui.fielding,
        stamina: matsui.stamina,
        cost: matsui.cost
      },
      rodgers: {
        throws: rodgers.throws,
        fastKmh: rodgers.fastKmh,
        rightBreak: rodgers.rightBreak,
        leftBreak: rodgers.leftBreak,
        slowChange: rodgers.slowChange,
        fastChange: rodgers.fastChange,
        control: rodgers.control,
        stuff: rodgers.stuff,
        fielding: rodgers.fielding,
        stamina: rodgers.stamina,
        cost: rodgers.cost
      },
      fujinami: {
        throws: fujinami.throws,
        fastKmh: fujinami.fastKmh,
        rightBreak: fujinami.rightBreak,
        leftBreak: fujinami.leftBreak,
        slowChange: fujinami.slowChange,
        fastChange: fujinami.fastChange,
        control: fujinami.control,
        stuff: fujinami.stuff,
        fielding: fujinami.fielding,
        stamina: fujinami.stamina,
        cost: fujinami.cost
      },
      skubal: {
        throws: skubal.throws,
        fastKmh: skubal.fastKmh,
        rightBreak: skubal.rightBreak,
        leftBreak: skubal.leftBreak,
        slowChange: skubal.slowChange,
        fastChange: skubal.fastChange,
        control: skubal.control,
        stuff: skubal.stuff,
        fielding: skubal.fielding,
        stamina: skubal.stamina,
        cost: skubal.cost
      },
      ashby: {
        throws: ashby.throws,
        fastKmh: ashby.fastKmh,
        rightBreak: ashby.rightBreak,
        leftBreak: ashby.leftBreak,
        slowChange: ashby.slowChange,
        fastChange: ashby.fastChange,
        control: ashby.control,
        stuff: ashby.stuff,
        fielding: ashby.fielding,
        stamina: ashby.stamina,
        cost: ashby.cost
      },
      melton: {
        throws: melton.throws,
        fastKmh: melton.fastKmh,
        rightBreak: melton.rightBreak,
        leftBreak: melton.leftBreak,
        slowChange: melton.slowChange,
        fastChange: melton.fastChange,
        control: melton.control,
        stuff: melton.stuff,
        fielding: melton.fielding,
        stamina: melton.stamina,
        cost: melton.cost
      },
      cyyoung: {
        throws: cyyoung.throws,
        fastKmh: cyyoung.fastKmh,
        rightBreak: cyyoung.rightBreak,
        leftBreak: cyyoung.leftBreak,
        slowChange: cyyoung.slowChange,
        fastChange: cyyoung.fastChange,
        control: cyyoung.control,
        stuff: cyyoung.stuff,
        fielding: cyyoung.fielding,
        stamina: cyyoung.stamina,
        cost: cyyoung.cost
      },
      maddux: {
        throws: maddux.throws,
        fastKmh: maddux.fastKmh,
        rightBreak: maddux.rightBreak,
        leftBreak: maddux.leftBreak,
        slowChange: maddux.slowChange,
        fastChange: maddux.fastChange,
        control: maddux.control,
        stuff: maddux.stuff,
        fielding: maddux.fielding,
        stamina: maddux.stamina,
        cost: maddux.cost
      },
      ediaz: {
        throws: ediaz.throws,
        fastKmh: ediaz.fastKmh,
        rightBreak: ediaz.rightBreak,
        leftBreak: ediaz.leftBreak,
        slowChange: ediaz.slowChange,
        fastChange: ediaz.fastChange,
        control: ediaz.control,
        stuff: ediaz.stuff,
        fielding: ediaz.fielding,
        stamina: ediaz.stamina,
        cost: ediaz.cost
      },
      jansen: {
        throws: jansen.throws,
        fastKmh: jansen.fastKmh,
        rightBreak: jansen.rightBreak,
        leftBreak: jansen.leftBreak,
        slowChange: jansen.slowChange,
        fastChange: jansen.fastChange,
        control: jansen.control,
        stuff: jansen.stuff,
        fielding: jansen.fielding,
        stamina: jansen.stamina,
        cost: jansen.cost
      },
      baseCost,
      pitcherIncludedCost,
      defaultAwayPitcherCost,
      defaultHomePitcherCost,
      teamPointLimit,
      overLimitDisabled,
      overLimitText,
      pitcherOverLimitDisabled,
      pitcherOverLimitText,
      chooserHtml,
      simultaneousAwayChooserHtml,
      simultaneousHomeChooserHtml,
      simultaneousChooserTitles,
      catcherChooserHtml,
      pitcherChooserHtml,
      pitcherChooserHasPitchHandRow,
      overLimitBatterDisabled,
      overLimitPickBlocked,
      firstBatterOption,
      firstCatcherOption,
      catcherChooserHasDingler,
      firstPitcherOption,
      pitcher2ChooserHtml,
      duplicatePitcherDisabled,
      rodgersCatcherAllowedWithPitcher,
      rodgersPitcherAllowedWithCatcher,
      rodgersPitcherCatcherComplete,
      rodgersPitcherCatcherCost,
      rodgersPitcherCatcherRawCost,
      rodgersBatterAllowedWithPitcher,
      rodgersPitcherBatterComplete,
      rodgersPitcherBatterCost,
      rodgersPitcherBatterRawCost,
      rodgersPitcherAllowedWithBatter,
      rodgersCatcherDisabledByBatter,
      rodgersBatterConflictIncomplete,
      selectedPitcherIds,
      cardHtml,
      pitcherCardHtml,
      escapedPracticeSelectHtml,
      escapedChooserHtml,
      originalCreatorFirst,
      originalOverRemaining: originalOverState.remaining,
      originalSelected,
      originalPlayer: {
        name: originalPlayer.name,
        bats: originalPlayer.bats,
        power: originalPlayer.power,
        meet: originalPlayer.meet,
        run: originalPlayer.run,
        infieldDefense: originalPlayer.infieldDefense,
        outfieldDefense: originalPlayer.outfieldDefense,
        arm: originalPlayer.arm,
        cost: originalPlayer.cost
      },
      originalSelectedCost,
      originalHasCostStepper: chooserHtml.includes('data-original-step-field="cost"'),
      originalHasPowerStepper: chooserHtml.includes('data-original-step-field="power"'),
      originalUsesDirectNumberInput: chooserHtml.includes('type="number" data-original-field="cost"') || chooserHtml.includes('type="number" data-original-field="power"'),
      awayFielderPointText: awayFielderPointStatus.textContent,
      menuText: awayPitcherPointStatus.textContent + " " + awayFielderPointStatus.textContent
    });
  })()`
));

const latestSpreadsheetRosterState = JSON.parse(runInGame(
  context,
  `JSON.stringify({
    sato: findById(batters, "sato"),
    harper: findById(batters, "harper"),
    carpenter: findById(batters, "carpenter"),
    mcgonigle: findById(batters, "mcgonigle"),
    darvish: findById(pitchers, "darvish"),
    rojas: findById(pitchers, "rojas"),
    summers: findById(pitchers, "summers")
  })`
));

assert(latestSpreadsheetRosterState.sato.arm === 6, "Sato arm should match the latest spreadsheet");
assert(latestSpreadsheetRosterState.harper.arm === 8, "Harper arm should match the latest spreadsheet");
assert(latestSpreadsheetRosterState.carpenter.arm === 4, "Carpenter arm should match the latest spreadsheet");
assert(latestSpreadsheetRosterState.mcgonigle.arm === 6, "McGonigle arm should match the latest spreadsheet");
assert(latestSpreadsheetRosterState.darvish.rightBreak === 9, "Darvish right break should match the latest spreadsheet");
assert(latestSpreadsheetRosterState.darvish.leftBreak === 8, "Darvish left break should match the latest spreadsheet");
assert(latestSpreadsheetRosterState.darvish.cost === 6, "Darvish cost should match the latest spreadsheet");
assert(latestSpreadsheetRosterState.rojas.throws === "R" && latestSpreadsheetRosterState.rojas.fastKmh === 77 && latestSpreadsheetRosterState.rojas.cost === 1, "Rojas should be available as a new pitcher");
assert(latestSpreadsheetRosterState.summers.throws === "L" && latestSpreadsheetRosterState.summers.fastKmh === 152 && latestSpreadsheetRosterState.summers.cost === 1, "Summers should be available as a new pitcher");

assert(rosterAndPointState.shuto.bats === "L", "Shuto should be a left-handed batter");
assert(rosterAndPointState.shuto.power === 2, "Shuto power should match the roster table");
assert(rosterAndPointState.shuto.meet === 3, "Shuto meet should match the roster table");
assert(rosterAndPointState.shuto.run === 10, "Shuto run should match the roster table");
assert(rosterAndPointState.shuto.infieldDefense === 3, "Shuto infield defense should match the roster table");
assert(rosterAndPointState.shuto.outfieldDefense === 8, "Shuto outfield defense should match the roster table");
assert(rosterAndPointState.shuto.arm === 7, "Shuto arm should match the roster table");
assert(rosterAndPointState.shuto.cost === 5, "Shuto cost should match the roster table");
assert(rosterAndPointState.kimhyesong.bats === "L", "Kim Hye-seong should be a left-handed batter");
assert(rosterAndPointState.kimhyesong.power === 4, "Kim Hye-seong power should match the roster table");
assert(rosterAndPointState.kimhyesong.meet === 4, "Kim Hye-seong meet should match the roster table");
assert(rosterAndPointState.kimhyesong.run === 5, "Kim Hye-seong run should match the roster table");
assert(rosterAndPointState.kimhyesong.infieldDefense === 5, "Kim Hye-seong infield defense should match the roster table");
assert(rosterAndPointState.kimhyesong.outfieldDefense === 5, "Kim Hye-seong outfield defense should match the roster table");
assert(rosterAndPointState.kimhyesong.arm === 5, "Kim Hye-seong arm should match the roster table");
assert(rosterAndPointState.kimhyesong.cost === 3, "Kim Hye-seong cost should match the roster table");
assert(rosterAndPointState.trout.bats === "R", "Trout should be a right-handed batter");
assert(rosterAndPointState.trout.power === 7, "Trout power should match the roster table");
assert(rosterAndPointState.trout.meet === 6, "Trout meet should match the roster table");
assert(rosterAndPointState.trout.run === 6, "Trout run should match the roster table");
assert(rosterAndPointState.trout.infieldDefense === 3, "Trout infield defense should match the roster table");
assert(rosterAndPointState.trout.outfieldDefense === 6, "Trout outfield defense should match the roster table");
assert(rosterAndPointState.trout.arm === 5, "Trout arm should match the roster table");
assert(rosterAndPointState.trout.cost === 6, "Trout cost should match the roster table");
assert(rosterAndPointState.freeman.bats === "L", "Freeman should be a left-handed batter");
assert(rosterAndPointState.freeman.power === 6, "Freeman power should match the roster table");
assert(rosterAndPointState.freeman.meet === 7, "Freeman meet should match the roster table");
assert(rosterAndPointState.freeman.run === 4, "Freeman run should match the roster table");
assert(rosterAndPointState.freeman.infieldDefense === 7, "Freeman infield defense should match the roster table");
assert(rosterAndPointState.freeman.outfieldDefense === 2, "Freeman outfield defense should match the roster table");
assert(rosterAndPointState.freeman.arm === 7, "Freeman arm should match the roster table");
assert(rosterAndPointState.freeman.cost === 6, "Freeman cost should match the roster table");
assert(rosterAndPointState.leejunghoo.bats === "L", "Lee Jung-hoo should be a left-handed batter");
assert(rosterAndPointState.leejunghoo.power === 4, "Lee Jung-hoo power should match the roster table");
assert(rosterAndPointState.leejunghoo.meet === 8, "Lee Jung-hoo meet should match the roster table");
assert(rosterAndPointState.leejunghoo.run === 5, "Lee Jung-hoo run should match the roster table");
assert(rosterAndPointState.leejunghoo.infieldDefense === 2, "Lee Jung-hoo infield defense should match the roster table");
assert(rosterAndPointState.leejunghoo.outfieldDefense === 6, "Lee Jung-hoo outfield defense should match the roster table");
assert(rosterAndPointState.leejunghoo.arm === 6, "Lee Jung-hoo arm should match the roster table");
assert(rosterAndPointState.leejunghoo.cost === 5, "Lee Jung-hoo cost should match the roster table");
assert(rosterAndPointState.dingler.bats === "R", "Dingler should be a right-handed batter");
assert(rosterAndPointState.dingler.power === 7, "Dingler power should match the catcher roster table");
assert(rosterAndPointState.dingler.meet === 3, "Dingler meet should match the catcher roster table");
assert(rosterAndPointState.dingler.run === 3, "Dingler run should match the roster table");
assert(rosterAndPointState.dingler.arm === 7, "Dingler arm should match the catcher roster table");
assert(rosterAndPointState.dingler.cost === 5, "Dingler cost should match the roster table");
assert(rosterAndPointState.calraleigh.power === 8 && rosterAndPointState.calraleigh.arm === 7, "Cal Raleigh should be available as a catcher");
assert(rosterAndPointState.nomura.power === 10 && rosterAndPointState.nomura.meet === 10 && rosterAndPointState.nomura.arm === 10 && rosterAndPointState.nomura.cost === 15, "Nomura catcher should match the updated roster table");
assert(rosterAndPointState.johnnybench.power === 9 && rosterAndPointState.johnnybench.meet === 9 && rosterAndPointState.johnnybench.arm === 13 && rosterAndPointState.johnnybench.cost === 16, "Johnny Bench should be available as a new elite catcher");
assert(rosterAndPointState.rodgersCatcher.bats === "R", "Rodgers catcher should be a right-handed batter");
assert(rosterAndPointState.rodgersCatcher.power === 6, "Rodgers catcher power should match the catcher roster table");
assert(rosterAndPointState.rodgersCatcher.meet === 1, "Rodgers catcher meet should match the catcher roster table");
assert(rosterAndPointState.rodgersCatcher.run === 3, "Rodgers catcher run should match the catcher roster table");
assert(rosterAndPointState.rodgersCatcher.arm === 6, "Rodgers catcher arm should match the catcher roster table");
assert(rosterAndPointState.rodgersCatcher.cost === 3, "Rodgers catcher cost should match the catcher roster table");
assert(rosterAndPointState.rodgersBatter.bats === "R", "Rodgers fielder should be a right-handed batter");
assert(rosterAndPointState.rodgersBatter.power === 6, "Rodgers fielder power should match the roster table");
assert(rosterAndPointState.rodgersBatter.meet === 1, "Rodgers fielder meet should match the roster table");
assert(rosterAndPointState.rodgersBatter.run === 3, "Rodgers fielder run should match the roster table");
assert(rosterAndPointState.rodgersBatter.infieldDefense === 3, "Rodgers fielder infield defense should match the roster table");
assert(rosterAndPointState.rodgersBatter.outfieldDefense === 3, "Rodgers fielder outfield defense should match the roster table");
assert(rosterAndPointState.rodgersBatter.arm === 6, "Rodgers fielder arm should match the roster table");
assert(rosterAndPointState.rodgersBatter.cost === 3, "Rodgers fielder cost should match the roster table");
assert(rosterAndPointState.harper.bats === "L", "Harper should be a left-handed batter");
assert(rosterAndPointState.harper.power === 8, "Harper power should match the roster table");
assert(rosterAndPointState.harper.infieldDefense === 5, "Harper infield defense should match the roster table");
assert(rosterAndPointState.harper.outfieldDefense === 4, "Harper outfield defense should match the roster table");
assert(rosterAndPointState.harper.run === 6, "Harper run should match the roster table");
assert(rosterAndPointState.harper.arm === 8, "Harper arm should match the roster table");
assert(rosterAndPointState.harper.cost === 8, "Harper cost should match the roster table");
assert(rosterAndPointState.tucker.bats === "L", "Tucker should be a left-handed batter");
assert(rosterAndPointState.tucker.power === 6, "Tucker power should match the roster table");
assert(rosterAndPointState.tucker.meet === 5, "Tucker meet should match the roster table");
assert(rosterAndPointState.tucker.run === 7, "Tucker run should match the roster table");
assert(rosterAndPointState.tucker.infieldDefense === 2, "Tucker infield defense should match the roster table");
assert(rosterAndPointState.tucker.outfieldDefense === 6, "Tucker outfield defense should match the roster table");
assert(rosterAndPointState.tucker.arm === 7, "Tucker arm should match the roster table");
assert(rosterAndPointState.tucker.cost === 5, "Tucker cost should match the roster table");
assert(rosterAndPointState.arraez.bats === "L", "Arraez should be a left-handed batter");
assert(rosterAndPointState.arraez.power === 2, "Arraez power should match the roster table");
assert(rosterAndPointState.arraez.meet === 9, "Arraez meet should match the roster table");
assert(rosterAndPointState.arraez.run === 5, "Arraez run should match the roster table");
assert(rosterAndPointState.arraez.infieldDefense === 3, "Arraez infield defense should match the roster table");
assert(rosterAndPointState.arraez.outfieldDefense === 2, "Arraez outfield defense should match the roster table");
assert(rosterAndPointState.arraez.arm === 5, "Arraez arm should match the roster table");
assert(rosterAndPointState.arraez.cost === 5, "Arraez cost should match the roster table");
assert(rosterAndPointState.wittjr.bats === "R", "Witt Jr. should be a right-handed batter");
assert(rosterAndPointState.wittjr.power === 6, "Witt Jr. power should match the roster table");
assert(rosterAndPointState.wittjr.meet === 5, "Witt Jr. meet should match the roster table");
assert(rosterAndPointState.wittjr.run === 9, "Witt Jr. run should match the roster table");
assert(rosterAndPointState.wittjr.infieldDefense === 8, "Witt Jr. infield defense should match the roster table");
assert(rosterAndPointState.wittjr.outfieldDefense === 4, "Witt Jr. outfield defense should match the roster table");
assert(rosterAndPointState.wittjr.arm === 7, "Witt Jr. arm should match the roster table");
assert(rosterAndPointState.wittjr.cost === 7, "Witt Jr. cost should match the roster table");
assert(rosterAndPointState.goldschmidt.bats === "R", "Goldschmidt should be a right-handed batter");
assert(rosterAndPointState.goldschmidt.power === 7, "Goldschmidt power should match the roster table");
assert(rosterAndPointState.goldschmidt.meet === 6, "Goldschmidt meet should match the roster table");
assert(rosterAndPointState.goldschmidt.run === 6, "Goldschmidt run should match the roster table");
assert(rosterAndPointState.goldschmidt.infieldDefense === 6, "Goldschmidt infield defense should match the roster table");
assert(rosterAndPointState.goldschmidt.outfieldDefense === 2, "Goldschmidt outfield defense should match the roster table");
assert(rosterAndPointState.goldschmidt.arm === 6, "Goldschmidt arm should match the roster table");
assert(rosterAndPointState.goldschmidt.cost === 6, "Goldschmidt cost should match the roster table");
assert(rosterAndPointState.acunajr.bats === "R", "Acuna Jr. should be a right-handed batter");
assert(rosterAndPointState.acunajr.power === 6, "Acuna Jr. power should match the roster table");
assert(rosterAndPointState.acunajr.meet === 6, "Acuna Jr. meet should match the roster table");
assert(rosterAndPointState.acunajr.run === 10, "Acuna Jr. run should match the roster table");
assert(rosterAndPointState.acunajr.infieldDefense === 2, "Acuna Jr. infield defense should match the roster table");
assert(rosterAndPointState.acunajr.outfieldDefense === 3, "Acuna Jr. outfield defense should match the roster table");
assert(rosterAndPointState.acunajr.arm === 8, "Acuna Jr. arm should match the roster table");
assert(rosterAndPointState.acunajr.cost === 7, "Acuna Jr. cost should match the roster table");
assert(rosterAndPointState.ydiaz.bats === "R", "Y. Diaz should be a right-handed batter");
assert(rosterAndPointState.ydiaz.power === 5, "Y. Diaz power should match the roster table");
assert(rosterAndPointState.ydiaz.meet === 9, "Y. Diaz meet should match the roster table");
assert(rosterAndPointState.ydiaz.run === 4, "Y. Diaz run should match the roster table");
assert(rosterAndPointState.ydiaz.infieldDefense === 1, "Y. Diaz infield defense should match the roster table");
assert(rosterAndPointState.ydiaz.outfieldDefense === 2, "Y. Diaz outfield defense should match the roster table");
assert(rosterAndPointState.ydiaz.arm === 3, "Y. Diaz arm should match the roster table");
assert(rosterAndPointState.ydiaz.cost === 5, "Y. Diaz cost should match the roster table");
assert(rosterAndPointState.tairaRemoved === true, "Taira should be removed from the batter roster");
assert(rosterAndPointState.ichiro.meet === 17 && rosterAndPointState.ichiro.outfieldDefense === 11 && rosterAndPointState.ichiro.arm === 11 && rosterAndPointState.ichiro.cost === 17, "Ichiro should match the updated roster table");
assert(rosterAndPointState.ruth.power === 13 && rosterAndPointState.ruth.meet === 12 && rosterAndPointState.ruth.outfieldDefense === 7 && rosterAndPointState.ruth.cost === 17, "Ruth should match the updated roster table");
assert(rosterAndPointState.nagashima.power === 11 && rosterAndPointState.nagashima.meet === 10 && rosterAndPointState.nagashima.run === 8 && rosterAndPointState.nagashima.infieldDefense === 11 && rosterAndPointState.nagashima.cost === 15, "Nagashima should match the updated roster table");
assert(rosterAndPointState.bonds.power === 13 && rosterAndPointState.bonds.meet === 9 && rosterAndPointState.bonds.outfieldDefense === 10 && rosterAndPointState.bonds.arm === 8 && rosterAndPointState.bonds.cost === 17, "Bonds should be available as a new elite outfielder");
assert(rosterAndPointState.sadaharu.power === 14 && rosterAndPointState.sadaharu.infieldDefense === 8 && rosterAndPointState.sadaharu.arm === 7 && rosterAndPointState.sadaharu.cost === 17, "Sadaharu should be available as a new elite infielder");
assert(rosterAndPointState.shohei.fastKmh === 165, "Shohei fastball should match the pitcher roster table");
assert(rosterAndPointState.shohei.stuff === 9, "Shohei stuff should match the pitcher roster table");
assert(rosterAndPointState.shohei.stamina === 8, "Shohei stamina should match the pitcher roster table");
assert(rosterAndPointState.shohei.cost === 9, "Shohei pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.sawamura.fastKmh === 172, "Sawamura fastball should match the pitcher roster table");
assert(rosterAndPointState.sawamura.rightBreak === 9, "Sawamura right break should match the pitcher roster table");
assert(rosterAndPointState.sawamura.leftBreak === 8, "Sawamura left break should match the pitcher roster table");
assert(rosterAndPointState.sawamura.slowChange === 6, "Sawamura slow change should match the pitcher roster table");
assert(rosterAndPointState.sawamura.fastChange === 9, "Sawamura fast change should match the pitcher roster table");
assert(rosterAndPointState.sawamura.control === 7, "Sawamura control should match the pitcher roster table");
assert(rosterAndPointState.sawamura.stuff === 11, "Sawamura stuff should match the pitcher roster table");
assert(rosterAndPointState.sawamura.fielding === 8, "Sawamura fielding should match the pitcher roster table");
assert(rosterAndPointState.sawamura.stamina === 12, "Sawamura stamina should match the pitcher roster table");
assert(rosterAndPointState.sawamura.cost === 15, "Sawamura pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.magari.throws === "R", "Magari should be a right-handed pitcher");
assert(rosterAndPointState.magari.fastKmh === 100, "Magari fastball should match the pitcher roster table");
assert(rosterAndPointState.magari.rightBreak === 9, "Magari right break should match the pitcher roster table");
assert(rosterAndPointState.magari.leftBreak === 9, "Magari left break should match the pitcher roster table");
assert(rosterAndPointState.magari.slowChange === 9, "Magari slow change should match the pitcher roster table");
assert(rosterAndPointState.magari.fastChange === 9, "Magari fast change should match the pitcher roster table");
assert(rosterAndPointState.magari.control === 9, "Magari control should match the pitcher roster table");
assert(rosterAndPointState.magari.stuff === 6, "Magari stuff should match the pitcher roster table");
assert(rosterAndPointState.magari.fielding === 8, "Magari fielding should match the pitcher roster table");
assert(rosterAndPointState.magari.stamina === 4, "Magari stamina should match the pitcher roster table");
assert(rosterAndPointState.magari.cost === 5, "Magari pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.misiorowski.throws === "R", "Misiorowski should be a right-handed pitcher");
assert(rosterAndPointState.misiorowski.fastKmh === 169, "Misiorowski fastball should match the pitcher roster table");
assert(rosterAndPointState.misiorowski.rightBreak === 7, "Misiorowski right break should match the pitcher roster table");
assert(rosterAndPointState.misiorowski.leftBreak === 4, "Misiorowski left break should match the pitcher roster table");
assert(rosterAndPointState.misiorowski.slowChange === 5, "Misiorowski slow change should match the pitcher roster table");
assert(rosterAndPointState.misiorowski.fastChange === 7, "Misiorowski fast change should match the pitcher roster table");
assert(rosterAndPointState.misiorowski.control === 5, "Misiorowski control should match the pitcher roster table");
assert(rosterAndPointState.misiorowski.stuff === 8, "Misiorowski stuff should match the pitcher roster table");
assert(rosterAndPointState.misiorowski.fielding === 4, "Misiorowski fielding should match the pitcher roster table");
assert(rosterAndPointState.misiorowski.stamina === 7, "Misiorowski stamina should match the pitcher roster table");
assert(rosterAndPointState.misiorowski.cost === 8, "Misiorowski pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.miller.throws === "R", "Miller should be a right-handed pitcher");
assert(rosterAndPointState.miller.fastKmh === 171, "Miller fastball should match the pitcher roster table");
assert(rosterAndPointState.miller.rightBreak === 8, "Miller right break should match the pitcher roster table");
assert(rosterAndPointState.miller.leftBreak === 6, "Miller left break should match the pitcher roster table");
assert(rosterAndPointState.miller.slowChange === 8, "Miller slow change should match the pitcher roster table");
assert(rosterAndPointState.miller.fastChange === 3, "Miller fast change should match the pitcher roster table");
assert(rosterAndPointState.miller.control === 6, "Miller control should match the pitcher roster table");
assert(rosterAndPointState.miller.stuff === 12, "Miller stuff should match the pitcher roster table");
assert(rosterAndPointState.miller.fielding === 6, "Miller fielding should match the pitcher roster table");
assert(rosterAndPointState.miller.stamina === 2, "Miller stamina should match the pitcher roster table");
assert(rosterAndPointState.miller.cost === 4, "Miller pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.ootake.throws === "L", "Otake should be a left-handed pitcher");
assert(rosterAndPointState.ootake.fastKmh === 143, "Otake fastball should match the pitcher roster table");
assert(rosterAndPointState.ootake.rightBreak === 4, "Otake right break should match the pitcher roster table");
assert(rosterAndPointState.ootake.leftBreak === 4, "Otake left break should match the pitcher roster table");
assert(rosterAndPointState.ootake.slowChange === 5, "Otake slow change should match the pitcher roster table");
assert(rosterAndPointState.ootake.fastChange === 5, "Otake fast change should match the pitcher roster table");
assert(rosterAndPointState.ootake.control === 10, "Otake control should match the pitcher roster table");
assert(rosterAndPointState.ootake.stuff === 7, "Otake stuff should match the pitcher roster table");
assert(rosterAndPointState.ootake.fielding === 8, "Otake fielding should match the pitcher roster table");
assert(rosterAndPointState.ootake.stamina === 6, "Otake stamina should match the pitcher roster table");
assert(rosterAndPointState.ootake.cost === 6, "Otake pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.hanifee.throws === "R", "Hanifee should be a right-handed pitcher");
assert(rosterAndPointState.hanifee.fastKmh === 156, "Hanifee fastball should match the pitcher roster table");
assert(rosterAndPointState.hanifee.rightBreak === 2, "Hanifee right break should match the pitcher roster table");
assert(rosterAndPointState.hanifee.leftBreak === 10, "Hanifee left break should match the pitcher roster table");
assert(rosterAndPointState.hanifee.slowChange === 2, "Hanifee slow change should match the pitcher roster table");
assert(rosterAndPointState.hanifee.fastChange === 2, "Hanifee fast change should match the pitcher roster table");
assert(rosterAndPointState.hanifee.control === 5, "Hanifee control should match the pitcher roster table");
assert(rosterAndPointState.hanifee.stuff === 2, "Hanifee stuff should match the pitcher roster table");
assert(rosterAndPointState.hanifee.fielding === 5, "Hanifee fielding should match the pitcher roster table");
assert(rosterAndPointState.hanifee.stamina === 2, "Hanifee stamina should match the pitcher roster table");
assert(rosterAndPointState.hanifee.cost === 3, "Hanifee pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.sugiyama.throws === "R", "Sugiyama should be a right-handed pitcher");
assert(rosterAndPointState.sugiyama.fastKmh === 158, "Sugiyama fastball should match the pitcher roster table");
assert(rosterAndPointState.sugiyama.rightBreak === 2, "Sugiyama right break should match the pitcher roster table");
assert(rosterAndPointState.sugiyama.leftBreak === 1, "Sugiyama left break should match the pitcher roster table");
assert(rosterAndPointState.sugiyama.slowChange === 9, "Sugiyama slow change should match the pitcher roster table");
assert(rosterAndPointState.sugiyama.fastChange === 7, "Sugiyama fast change should match the pitcher roster table");
assert(rosterAndPointState.sugiyama.control === 3, "Sugiyama control should match the pitcher roster table");
assert(rosterAndPointState.sugiyama.stuff === 9, "Sugiyama stuff should match the pitcher roster table");
assert(rosterAndPointState.sugiyama.fielding === 3, "Sugiyama fielding should match the pitcher roster table");
assert(rosterAndPointState.sugiyama.stamina === 2, "Sugiyama stamina should match the pitcher roster table");
assert(rosterAndPointState.sugiyama.cost === 3, "Sugiyama pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.sasaki.throws === "R", "Sasaki should be a right-handed pitcher");
assert(rosterAndPointState.sasaki.fastKmh === 165, "Sasaki fastball should match the pitcher roster table");
assert(rosterAndPointState.sasaki.rightBreak === 5, "Sasaki right break should match the pitcher roster table");
assert(rosterAndPointState.sasaki.leftBreak === 2, "Sasaki left break should match the pitcher roster table");
assert(rosterAndPointState.sasaki.slowChange === 6, "Sasaki slow change should match the pitcher roster table");
assert(rosterAndPointState.sasaki.fastChange === 4, "Sasaki fast change should match the pitcher roster table");
assert(rosterAndPointState.sasaki.control === 4, "Sasaki control should match the pitcher roster table");
assert(rosterAndPointState.sasaki.stuff === 7, "Sasaki stuff should match the pitcher roster table");
assert(rosterAndPointState.sasaki.fielding === 4, "Sasaki fielding should match the pitcher roster table");
assert(rosterAndPointState.sasaki.stamina === 5, "Sasaki stamina should match the pitcher roster table");
assert(rosterAndPointState.sasaki.cost === 6, "Sasaki pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.matsui.throws === "L", "Matsui should be a left-handed pitcher");
assert(rosterAndPointState.matsui.fastKmh === 150, "Matsui fastball should match the pitcher roster table");
assert(rosterAndPointState.matsui.rightBreak === 2, "Matsui right break should match the pitcher roster table");
assert(rosterAndPointState.matsui.leftBreak === 5, "Matsui left break should match the pitcher roster table");
assert(rosterAndPointState.matsui.slowChange === 5, "Matsui slow change should match the pitcher roster table");
assert(rosterAndPointState.matsui.fastChange === 5, "Matsui fast change should match the pitcher roster table");
assert(rosterAndPointState.matsui.control === 5, "Matsui control should match the pitcher roster table");
assert(rosterAndPointState.matsui.stuff === 5, "Matsui stuff should match the pitcher roster table");
assert(rosterAndPointState.matsui.fielding === 5, "Matsui fielding should match the pitcher roster table");
assert(rosterAndPointState.matsui.stamina === 2, "Matsui stamina should match the pitcher roster table");
assert(rosterAndPointState.matsui.cost === 3, "Matsui pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.rodgers.throws === "R", "Rodgers should be a right-handed pitcher");
assert(rosterAndPointState.rodgers.fastKmh === 125, "Rodgers fastball should match the pitcher roster table");
assert(rosterAndPointState.rodgers.rightBreak === 2, "Rodgers right break should match the pitcher roster table");
assert(rosterAndPointState.rodgers.leftBreak === 2, "Rodgers left break should match the pitcher roster table");
assert(rosterAndPointState.rodgers.slowChange === 3, "Rodgers slow change should match the pitcher roster table");
assert(rosterAndPointState.rodgers.fastChange === 1, "Rodgers fast change should match the pitcher roster table");
assert(rosterAndPointState.rodgers.control === 3, "Rodgers control should match the pitcher roster table");
assert(rosterAndPointState.rodgers.stuff === 3, "Rodgers stuff should match the pitcher roster table");
assert(rosterAndPointState.rodgers.fielding === 3, "Rodgers fielding should match the pitcher roster table");
assert(rosterAndPointState.rodgers.stamina === 2, "Rodgers stamina should match the pitcher roster table");
assert(rosterAndPointState.rodgers.cost === 3, "Rodgers pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.fujinami.throws === "R", "Fujinami should be a right-handed pitcher");
assert(rosterAndPointState.fujinami.fastKmh === 159, "Fujinami fastball should match the pitcher roster table");
assert(rosterAndPointState.fujinami.rightBreak === 6, "Fujinami right break should match the pitcher roster table");
assert(rosterAndPointState.fujinami.leftBreak === 3, "Fujinami left break should match the pitcher roster table");
assert(rosterAndPointState.fujinami.slowChange === 5, "Fujinami slow change should match the pitcher roster table");
assert(rosterAndPointState.fujinami.fastChange === 5, "Fujinami fast change should match the pitcher roster table");
assert(rosterAndPointState.fujinami.control === 1, "Fujinami control should match the pitcher roster table");
assert(rosterAndPointState.fujinami.stuff === 6, "Fujinami stuff should match the pitcher roster table");
assert(rosterAndPointState.fujinami.fielding === 3, "Fujinami fielding should match the pitcher roster table");
assert(rosterAndPointState.fujinami.stamina === 6, "Fujinami stamina should match the pitcher roster table");
assert(rosterAndPointState.fujinami.cost === 5, "Fujinami pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.skubal.throws === "L", "Skubal should be a left-handed pitcher");
assert(rosterAndPointState.skubal.fastKmh === 164, "Skubal fastball should match the pitcher roster table");
assert(rosterAndPointState.skubal.rightBreak === 5, "Skubal right break should match the pitcher roster table");
assert(rosterAndPointState.skubal.leftBreak === 8, "Skubal left break should match the pitcher roster table");
assert(rosterAndPointState.skubal.slowChange === 8, "Skubal slow change should match the pitcher roster table");
assert(rosterAndPointState.skubal.fastChange === 4, "Skubal fast change should match the pitcher roster table");
assert(rosterAndPointState.skubal.control === 5, "Skubal control should match the pitcher roster table");
assert(rosterAndPointState.skubal.stuff === 7, "Skubal stuff should match the pitcher roster table");
assert(rosterAndPointState.skubal.fielding === 5, "Skubal fielding should match the pitcher roster table");
assert(rosterAndPointState.skubal.stamina === 7, "Skubal stamina should match the pitcher roster table");
assert(rosterAndPointState.skubal.cost === 8, "Skubal pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.ashby.throws === "L", "Ashby should be a left-handed pitcher");
assert(rosterAndPointState.ashby.fastKmh === 157, "Ashby fastball should match the pitcher roster table");
assert(rosterAndPointState.ashby.rightBreak === 3, "Ashby right break should match the pitcher roster table");
assert(rosterAndPointState.ashby.leftBreak === 5, "Ashby left break should match the pitcher roster table");
assert(rosterAndPointState.ashby.slowChange === 3, "Ashby slow change should match the pitcher roster table");
assert(rosterAndPointState.ashby.fastChange === 3, "Ashby fast change should match the pitcher roster table");
assert(rosterAndPointState.ashby.control === 3, "Ashby control should match the pitcher roster table");
assert(rosterAndPointState.ashby.stuff === 4, "Ashby stuff should match the pitcher roster table");
assert(rosterAndPointState.ashby.fielding === 5, "Ashby fielding should match the pitcher roster table");
assert(rosterAndPointState.ashby.stamina === 4, "Ashby stamina should match the pitcher roster table");
assert(rosterAndPointState.ashby.cost === 3, "Ashby pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.melton.throws === "R", "Melton should be a right-handed pitcher");
assert(rosterAndPointState.melton.fastKmh === 155, "Melton fastball should match the pitcher roster table");
assert(rosterAndPointState.melton.rightBreak === 4, "Melton right break should match the pitcher roster table");
assert(rosterAndPointState.melton.leftBreak === 3, "Melton left break should match the pitcher roster table");
assert(rosterAndPointState.melton.slowChange === 8, "Melton slow change should match the pitcher roster table");
assert(rosterAndPointState.melton.fastChange === 3, "Melton fast change should match the pitcher roster table");
assert(rosterAndPointState.melton.control === 9, "Melton control should match the pitcher roster table");
assert(rosterAndPointState.melton.stuff === 5, "Melton stuff should match the pitcher roster table");
assert(rosterAndPointState.melton.fielding === 8, "Melton fielding should match the pitcher roster table");
assert(rosterAndPointState.melton.stamina === 6, "Melton stamina should match the pitcher roster table");
assert(rosterAndPointState.melton.cost === 6, "Melton pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.cyyoung.fastKmh === 175, "Cy Young fastball should match the pitcher roster table");
assert(rosterAndPointState.cyyoung.rightBreak === 10, "Cy Young right break should match the pitcher roster table");
assert(rosterAndPointState.cyyoung.leftBreak === 9, "Cy Young left break should match the pitcher roster table");
assert(rosterAndPointState.cyyoung.slowChange === 9, "Cy Young slow change should match the pitcher roster table");
assert(rosterAndPointState.cyyoung.fastChange === 10, "Cy Young fast change should match the pitcher roster table");
assert(rosterAndPointState.cyyoung.control === 9, "Cy Young control should match the pitcher roster table");
assert(rosterAndPointState.cyyoung.stuff === 11, "Cy Young stuff should match the pitcher roster table");
assert(rosterAndPointState.cyyoung.fielding === 8, "Cy Young fielding should match the pitcher roster table");
assert(rosterAndPointState.cyyoung.stamina === 12, "Cy Young stamina should match the pitcher roster table");
assert(rosterAndPointState.cyyoung.cost === 18, "Cy Young pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.maddux.fastKmh === 155, "Maddux fastball should match the pitcher roster table");
assert(rosterAndPointState.maddux.rightBreak === 14, "Maddux right break should match the pitcher roster table");
assert(rosterAndPointState.maddux.leftBreak === 12, "Maddux left break should match the pitcher roster table");
assert(rosterAndPointState.maddux.slowChange === 11, "Maddux slow change should match the pitcher roster table");
assert(rosterAndPointState.maddux.fastChange === 10, "Maddux fast change should match the pitcher roster table");
assert(rosterAndPointState.maddux.control === 11, "Maddux control should match the pitcher roster table");
assert(rosterAndPointState.maddux.stuff === 10, "Maddux stuff should match the pitcher roster table");
assert(rosterAndPointState.maddux.stamina === 11, "Maddux stamina should match the pitcher roster table");
assert(rosterAndPointState.maddux.cost === 17, "Maddux pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.ediaz.throws === "R", "E. Diaz should be a right-handed pitcher");
assert(rosterAndPointState.ediaz.fastKmh === 164, "E. Diaz fastball should match the pitcher roster table");
assert(rosterAndPointState.ediaz.rightBreak === 8, "E. Diaz right break should match the pitcher roster table");
assert(rosterAndPointState.ediaz.leftBreak === 1, "E. Diaz left break should match the pitcher roster table");
assert(rosterAndPointState.ediaz.slowChange === 4, "E. Diaz slow change should match the pitcher roster table");
assert(rosterAndPointState.ediaz.fastChange === 9, "E. Diaz fast change should match the pitcher roster table");
assert(rosterAndPointState.ediaz.control === 6, "E. Diaz control should match the pitcher roster table");
assert(rosterAndPointState.ediaz.stuff === 13, "E. Diaz stuff should match the pitcher roster table");
assert(rosterAndPointState.ediaz.fielding === 6, "E. Diaz fielding should match the pitcher roster table");
assert(rosterAndPointState.ediaz.stamina === 2, "E. Diaz stamina should match the pitcher roster table");
assert(rosterAndPointState.ediaz.cost === 4, "E. Diaz pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.jansen.throws === "R", "Jansen should be a right-handed pitcher");
assert(rosterAndPointState.jansen.fastKmh === 161, "Jansen fastball should match the pitcher roster table");
assert(rosterAndPointState.jansen.rightBreak === 9, "Jansen right break should match the pitcher roster table");
assert(rosterAndPointState.jansen.leftBreak === 7, "Jansen left break should match the pitcher roster table");
assert(rosterAndPointState.jansen.slowChange === 3, "Jansen slow change should match the pitcher roster table");
assert(rosterAndPointState.jansen.fastChange === 6, "Jansen fast change should match the pitcher roster table");
assert(rosterAndPointState.jansen.control === 4, "Jansen control should match the pitcher roster table");
assert(rosterAndPointState.jansen.stuff === 11, "Jansen stuff should match the pitcher roster table");
assert(rosterAndPointState.jansen.fielding === 5, "Jansen fielding should match the pitcher roster table");
assert(rosterAndPointState.jansen.stamina === 2, "Jansen stamina should match the pitcher roster table");
assert(rosterAndPointState.jansen.cost === 4, "Jansen pitcher cost should match the pitcher roster table");
assert(rosterAndPointState.pitcherIncludedCost > rosterAndPointState.baseCost, "pitcher cost should affect the combined team point total");
assert(rosterAndPointState.teamPointLimit === 65, "combined point limit should be 65 per team");
assert(rosterAndPointState.defaultAwayPitcherCost === 22, "default away pitcher cost should remain visible in the point breakdown");
assert(rosterAndPointState.defaultHomePitcherCost === 28, "default home pitcher cost should remain visible in the point breakdown");
assert(rosterAndPointState.overLimitDisabled === true, "teams over 65 combined points should not be startable");
assert(rosterAndPointState.overLimitText.includes("/65"), "menu should show the 65-point combined limit");
assert(rosterAndPointState.pitcherOverLimitDisabled === true, "pitcher-heavy teams over 65 combined points should not be startable");
assert(rosterAndPointState.pitcherOverLimitText.includes("/65"), "menu should show the combined pitcher point total");
assert(rosterAndPointState.awayFielderPointText === "", "menu should show only the combined point total");
assert(rosterAndPointState.overLimitBatterDisabled === true, "chooser should disable players that would exceed the team point limit");
assert(rosterAndPointState.overLimitPickBlocked === true, "selecting an over-limit player should be ignored");
assert(rosterAndPointState.originalCreatorFirst === true, "batter chooser should show the original-player creator as the first card");
assert(rosterAndPointState.simultaneousAwayChooserHtml.length > 0 && rosterAndPointState.simultaneousHomeChooserHtml.length > 0, "player chooser should render 1P and 2P option panes at the same time");
assert(rosterAndPointState.simultaneousChooserTitles[0].includes("1P") && rosterAndPointState.simultaneousChooserTitles[1].includes("2P"), "player chooser panes should label the 1P and 2P sides clearly");
assert(!rosterAndPointState.chooserHtml.includes("オリジナル選手作成") && !rosterAndPointState.chooserHtml.includes("この選手を使う"), "original-player creator should fit into a normal card without extra title or use button text");
assert(rosterAndPointState.originalOverRemaining < 0, "original-player creator should block stat totals above cost times five");
assert(rosterAndPointState.originalSelected === true, "valid original-player creator entries should be selectable");
assert(rosterAndPointState.originalPlayer.name === "テストオリジナル" && rosterAndPointState.originalPlayer.bats === "L", "original-player creator should apply name and batting side");
assert(rosterAndPointState.originalPlayer.power === 4 && rosterAndPointState.originalPlayer.meet === 4 && rosterAndPointState.originalPlayer.run === 4, "original-player creator should apply batting and running stats");
assert(rosterAndPointState.originalPlayer.infieldDefense === 4 && rosterAndPointState.originalPlayer.outfieldDefense === 4 && rosterAndPointState.originalPlayer.arm === 4, "original-player creator should apply fielding and arm stats");
assert(rosterAndPointState.originalPlayer.cost === 5 && rosterAndPointState.originalSelectedCost === 5, "original-player creator should use the entered acquisition point cost");
assert(rosterAndPointState.originalHasCostStepper === true && rosterAndPointState.originalHasPowerStepper === true, "original-player creator should use arrow steppers for acquisition points and ability values");
assert(rosterAndPointState.originalUsesDirectNumberInput === false, "original-player creator should not use direct numeric inputs for acquisition points or ability values");
assert(rosterAndPointState.chooserHtml.includes("chooser-player-title"), "batter chooser should show cost beside the player name");
assert(rosterAndPointState.chooserHtml.includes("chooser-card-stats"), "batter chooser should render card-style stat rows");
assert(rosterAndPointState.chooserHtml.length > 0, "batter chooser should show batting side");
assert(!rosterAndPointState.chooserHtml.includes('data-player-id="dingler"'), "batter chooser should not list catcher-only players");
assert(rosterAndPointState.catcherChooserHtml.includes("chooser-card-stats"), "catcher chooser should render card-style stat rows");
assert(rosterAndPointState.catcherChooserHasDingler === true, "catcher chooser should include Dingler");
assert(rosterAndPointState.pitcherChooserHtml.length > 0, "pitcher chooser should show throwing side");
assert(rosterAndPointState.pitcherChooserHasPitchHandRow === false, "pitcher chooser should not duplicate throwing side in a separate pitch-hand row");
assert(rosterAndPointState.duplicatePitcherDisabled === true, "pitcher chooser should prevent duplicate pitchers in the same team");
assert(rosterAndPointState.rodgersCatcherAllowedWithPitcher === true, "catcher chooser should allow Rodgers when Rodgers is already selected as a pitcher");
assert(rosterAndPointState.rodgersPitcherAllowedWithCatcher === true, "pitcher chooser should allow Rodgers when Rodgers is already selected as catcher");
assert(rosterAndPointState.rodgersPitcherCatcherComplete === true, "teams should be complete when Rodgers is selected as both pitcher and catcher");
assert(rosterAndPointState.rodgersPitcherCatcherCost === rosterAndPointState.rodgersPitcherCatcherRawCost - 3, "pitcher plus catcher Rodgers should waive one Rodgers cost");
assert(rosterAndPointState.rodgersBatterAllowedWithPitcher === true, "batter chooser should allow Rodgers when Rodgers is already selected as a pitcher");
assert(rosterAndPointState.rodgersPitcherAllowedWithBatter === true, "pitcher chooser should allow Rodgers when Rodgers is already selected as a fielder");
assert(rosterAndPointState.rodgersPitcherBatterComplete === true, "teams should be complete when Rodgers is selected as both pitcher and fielder");
assert(rosterAndPointState.rodgersPitcherBatterCost === rosterAndPointState.rodgersPitcherBatterRawCost - 3, "pitcher plus fielder Rodgers should waive one Rodgers cost");
assert(rosterAndPointState.rodgersCatcherDisabledByBatter === true, "catcher chooser should block Rodgers when Rodgers is already selected as a fielder");
assert(rosterAndPointState.rodgersBatterConflictIncomplete === true, "teams should not be complete when Rodgers is selected as both fielder and another role");
assert(rosterAndPointState.pitcherChooserHtml.includes("chooser-player-title"), "pitcher chooser should show cost beside the player name");
assert(rosterAndPointState.pitcherChooserHtml.includes("stamina-stat-row"), "pitcher chooser should include stamina in the card stats");
assert(rosterAndPointState.firstBatterOption === "ichiro", "batter chooser should sort candidates by cost descending");
assert(rosterAndPointState.firstCatcherOption === "johnnybench", "catcher chooser should sort candidates by cost descending");
assert(rosterAndPointState.firstPitcherOption === "cyyoung", "pitcher chooser should sort candidates by cost descending");
assert(rosterAndPointState.selectedPitcherIds.length === 5, "selected teams should include five pitchers");
assert(rosterAndPointState.chooserHtml.includes("内野"), "batter chooser should use the short infield label");
assert(rosterAndPointState.chooserHtml.includes("外野"), "batter chooser should use the short outfield label");
assert(!rosterAndPointState.catcherChooserHtml.includes("内野"), "catcher chooser should not show infield defense");
assert(!rosterAndPointState.catcherChooserHtml.includes("外野"), "catcher chooser should not show outfield defense");
assert(!rosterAndPointState.chooserHtml.includes("起用守備"), "batter chooser should not show the redundant assigned-defense row");
assert(!rosterAndPointState.cardHtml.includes("cost-badge"), "batter cards should move cost into the title area");
assert(!rosterAndPointState.pitcherCardHtml.includes("cost-badge"), "pitcher cards should move cost into the title area");
assert(rosterAndPointState.escapedPracticeSelectHtml.includes("&quot;"), "practice player selects should escape player ids");
assert(rosterAndPointState.escapedPracticeSelectHtml.includes("&lt;img"), "practice player selects should escape player names");
assert(rosterAndPointState.escapedChooserHtml.includes("&quot;"), "player chooser should escape player ids in data attributes");
assert(rosterAndPointState.escapedChooserHtml.includes("&lt;img"), "player chooser should escape player names");

const singlePlayerOpponentState = JSON.parse(runInGame(
  context,
  `(() => {
    modeSelect.value = "single";
    awayPresetSelect.value = "tigers";
    homePresetSelect.value = "dendos";
    firstBatSelect.value = "away";
    menuSelection.away = cloneTeamSelection(defaultMenuSelection.away);
    readMenu();
    updateMenuPointStatus();
    const preStartAwayCost = getMenuTeamCost("away");
    const preStartHomeCost = getMenuTeamCost("home");
    const preStartDisabled = startButton.disabled;
    const preStartHomeLabel = teamLabel("home");
    const preStartPitchers = selected.home.pitchers.map((pitcherInfo) => pitcherInfo.id);
    const preStartBatters = Object.fromEntries(selected.home.batters.map((entry) => [entry.role, entry.player.id]));
    startGame();
    autoPitchTimer = 0;
    update(16);
    const dendosCpuAutoPitchStarted = Boolean(isPitching || pendingPitch);
    battingTeam = "away";
    const awayBattingPlayerControlled = isPlayerBatting();
    const cpuPitchingPlayerControlled = isPlayerPitching();
    battingTeam = "home";
    const cpuBattingPlayerControlled = isPlayerBatting();
    const playerPitchingVsCpu = isPlayerPitching();
    const startedPhase = gamePhase;
    const startedMode = gameMode;
    modeSelect.value = "versus";
    awayPresetSelect.value = "tigers";
    homePresetSelect.value = "dodgers";
    gameMode = "versus";
    selectedTeamPresetBySide = { ...defaultTeamPresetBySide };
    menuSelection = cloneMenuSelection(defaultMenuSelection);
    selected = createSelectedTeams(menuSelection);
    battingTeam = "away";
    gamePhase = "menu";
    isPitching = false;
    pendingPitch = null;
    autoPitchTimer = Number.POSITIVE_INFINITY;
    computerPitchPlan = null;
    keysDown.clear();
    pitchControlLockoutKeys.clear();
    resetBall();
    resetSwing();
    resetDefenseState();
    setMatchup();
    return JSON.stringify({
      preStartHomeCost,
      preStartAwayCost,
      preStartDisabled,
      preStartHomeLabel,
      preStartPitchers,
      preStartBatters,
      gamePhase: startedPhase,
      modeLabel: startedMode,
      awayBattingPlayerControlled,
      cpuPitchingPlayerControlled,
      cpuBattingPlayerControlled,
      playerPitchingVsCpu,
      dendosCpuAutoPitchStarted
    });
  })()`
));

assert(singlePlayerOpponentState.preStartHomeCost > 59, "Dendos should be allowed to exceed the normal point limit as a CPU opponent");
assert(singlePlayerOpponentState.preStartAwayCost <= 65, "single-player Dendos mode should keep the player roster under the normal point limit");
assert(singlePlayerOpponentState.preStartDisabled === false, "single-player mode should remain startable with Dendos as the over-limit CPU opponent");
assert(singlePlayerOpponentState.preStartHomeLabel === "デンドーズ", "single-player mode should label the home team as Dendos when selected");
assert(singlePlayerOpponentState.preStartPitchers.join(",") === "cyyoung,sawamura,maddux,hikari,magari", "Dendos should use the requested elite pitching staff");
assert(singlePlayerOpponentState.preStartBatters.R === "ichiro", "Dendos right fielder should be Ichiro");
assert(singlePlayerOpponentState.preStartBatters.C === "bonds", "Dendos center fielder should be Bonds");
assert(singlePlayerOpponentState.preStartBatters.L === "ruth", "Dendos left fielder should be Ruth");
assert(singlePlayerOpponentState.preStartBatters.SS === "nagashima", "Dendos shortstop should be Nagashima");
assert(singlePlayerOpponentState.preStartBatters["2B"] === "sadaharu", "Dendos second baseman should be Sadaharu");
assert(singlePlayerOpponentState.preStartBatters.CA === "johnnybench", "Dendos should use Johnny Bench as catcher");
assert(singlePlayerOpponentState.gamePhase === "playing", "single-player Dendos opponent mode should start a game");
assert(singlePlayerOpponentState.awayBattingPlayerControlled === true, "player should bat when Team A is batting against Dendos");
assert(singlePlayerOpponentState.cpuPitchingPlayerControlled === false, "Dendos should pitch automatically");
assert(singlePlayerOpponentState.cpuBattingPlayerControlled === false, "Dendos should bat automatically");
assert(singlePlayerOpponentState.playerPitchingVsCpu === true, "player should pitch when defending against Dendos");
assert(singlePlayerOpponentState.dendosCpuAutoPitchStarted === true, "CPU pitcher should start pitching automatically against Dendos");

const watchModeState = JSON.parse(runInGame(
  context,
  `(() => {
    modeSelect.value = "watch";
    awayPresetSelect.value = "tigers";
    homePresetSelect.value = "dodgers";
    firstBatSelect.value = "home";
    inningsSelect.value = "9";
    p1DefenseSelect.value = "manual";
    p2DefenseSelect.value = "semiauto";
    selectedTeamPresetBySide = { ...defaultTeamPresetBySide };
    menuSelection = cloneMenuSelection(defaultMenuSelection);
    readMenu();
    const readState = {
      gameMode,
      firstBatTeam,
      maxInnings,
      awayPreset: getSelectedTeamPresetId("away"),
      homePreset: getSelectedTeamPresetId("home"),
      awayDefenseControl: defenseControlMode.away,
      homeDefenseControl: defenseControlMode.home,
      awayDefenseSelect: p1DefenseSelect.value,
      homeDefenseSelect: p2DefenseSelect.value
    };
    battingTeam = "away";
    const awayBattingPlayerControlled = isPlayerBatting();
    const homePitchingPlayerControlled = isPlayerPitching();
    const manualHomeDefense = isManualDefenseControl();
    const manualAwayRun = isManualBaserunningControl("away");
    battingTeam = "home";
    const homeBattingPlayerControlled = isPlayerBatting();
    const awayPitchingPlayerControlled = isPlayerPitching();
    const manualAwayDefense = isManualDefenseControl();
    const manualHomeRun = isManualBaserunningControl("home");
    startGame();
    const startedPhase = gamePhase;
    const startedBattingTeam = battingTeam;
    const startedPitchers = {
      away: selected.away.pitchers.length,
      home: selected.home.pitchers.length
    };
    const autoScheduleAllowed = shouldAutoScheduleComputerPitch();
    autoPitchTimer = performance.now() - 1;
    update(16);
    const autoPitchStarted = Boolean(isPitching || pendingPitch);
    modeSelect.value = "versus";
    awayPresetSelect.value = "tigers";
    homePresetSelect.value = "dodgers";
    firstBatSelect.value = "away";
    inningsSelect.value = "1";
    p1DefenseSelect.value = "auto";
    p2DefenseSelect.value = "auto";
    gameMode = "versus";
    selectedTeamPresetBySide = { ...defaultTeamPresetBySide };
    menuSelection = cloneMenuSelection(defaultMenuSelection);
    selected = createSelectedTeams(menuSelection);
    battingTeam = "away";
    gamePhase = "menu";
    isPitching = false;
    pendingPitch = null;
    autoPitchTimer = Number.POSITIVE_INFINITY;
    computerPitchPlan = null;
    keysDown.clear();
    pitchControlLockoutKeys.clear();
    resetBall();
    resetSwing();
    resetDefenseState();
    setMatchup();
    return JSON.stringify({
      readState,
      awayBattingPlayerControlled,
      homePitchingPlayerControlled,
      manualHomeDefense,
      manualAwayRun,
      homeBattingPlayerControlled,
      awayPitchingPlayerControlled,
      manualAwayDefense,
      manualHomeRun,
      startedPhase,
      startedBattingTeam,
      startedPitchers,
      autoScheduleAllowed,
      autoPitchStarted
    });
  })()`
));

assert(watchModeState.readState.gameMode === "watch", "watch mode should be read from the mode selector");
assert(watchModeState.readState.firstBatTeam === "home", "watch mode should honor the first-bat selection");
assert(watchModeState.readState.maxInnings === 9, "watch mode should honor the innings selection");
assert(watchModeState.readState.awayPreset === "tigers", "watch mode should honor Team A preset selection");
assert(watchModeState.readState.homePreset === "dodgers", "watch mode should honor Team B preset selection");
assert(watchModeState.readState.awayDefenseControl === "auto" && watchModeState.readState.homeDefenseControl === "auto", "watch mode should force defense and baserunning to auto");
assert(watchModeState.readState.awayDefenseSelect === "auto" && watchModeState.readState.homeDefenseSelect === "auto", "watch mode should show auto in both defense and baserunning selectors");
assert(watchModeState.awayBattingPlayerControlled === false && watchModeState.homeBattingPlayerControlled === false, "watch mode should not let either batter side wait for player input");
assert(watchModeState.homePitchingPlayerControlled === false && watchModeState.awayPitchingPlayerControlled === false, "watch mode should not let either pitcher side wait for player input");
assert(watchModeState.manualHomeDefense === false && watchModeState.manualAwayDefense === false, "watch mode should disable manual defense");
assert(watchModeState.manualAwayRun === false && watchModeState.manualHomeRun === false, "watch mode should disable manual baserunning");
assert(watchModeState.startedPhase === "playing", "watch mode should start a normal game");
assert(watchModeState.startedBattingTeam === "home", "watch mode should start with the selected first-bat team");
assert(watchModeState.startedPitchers.away === 5 && watchModeState.startedPitchers.home === 5, "watch mode should allow both teams' selected rosters");
assert(watchModeState.autoScheduleAllowed === true, "watch mode should schedule CPU pitches automatically");
assert(watchModeState.autoPitchStarted === true, "watch mode should start the CPU pitch without player input");

const teamPresetSelectionState = JSON.parse(runInGame(
  context,
  `(() => {
    modeSelect.value = "versus";
    awayPresetSelect.value = "dendos";
    homePresetSelect.value = "tigers";
    readMenu();
    updateMenuPointStatus();
    openPlayerChooser({ dataset: { team: "away", role: "R", kind: "batter" } });
    const awayChooserHtml = chooserOptions.innerHTML;
    const awayOtaniAllowed = awayChooserHtml.includes('data-player-id="otani"') && !awayChooserHtml.match(/data-player-id="otani"[^>]*disabled/);
    closePlayerChooser();
    const state = {
      awayPreset: getSelectedTeamPresetId("away"),
      homePreset: getSelectedTeamPresetId("home"),
      awayLabel: teamLabel("away"),
      homeLabel: teamLabel("home"),
      awayCost: getMenuTeamCost("away"),
      homeCost: getMenuTeamCost("home"),
      awayPointText: awayPitcherPointStatus.textContent,
      homePointText: homePitcherPointStatus.textContent,
      startDisabled: startButton.disabled,
      awayPitchers: selected.away.pitchers.map((pitcherInfo) => pitcherInfo.id),
      homePitchers: selected.home.pitchers.map((pitcherInfo) => pitcherInfo.id),
      awayOtaniAllowed
    };
    awayPresetSelect.value = "tigers";
    homePresetSelect.value = "dodgers";
    readMenu();
    updateMenuAbilityPanels();
    return JSON.stringify(state);
  })()`
));

assert(teamPresetSelectionState.awayPreset === "dendos", "Team A preset select should apply Dendos");
assert(teamPresetSelectionState.homePreset === "tigers", "Team B preset select should apply Tigers");
assert(teamPresetSelectionState.awayLabel === "デンドーズ", "Team A label should follow the selected preset");
assert(teamPresetSelectionState.homeLabel === "タイガース", "Team B label should follow the selected preset");
assert(teamPresetSelectionState.awayCost > 59, "Dendos should exceed the normal point limit");
assert(teamPresetSelectionState.awayPointText.includes("制限なし"), "Dendos point status should show no limit");
assert(!teamPresetSelectionState.awayPointText.includes("/65"), "Dendos point status should not show the normal limit");
assert(teamPresetSelectionState.homePointText.includes("/65"), "non-Dendos teams should keep the normal point limit");
assert(teamPresetSelectionState.startDisabled === false, "Dendos as Team A should remain startable despite exceeding the limit");
assert(teamPresetSelectionState.awayPitchers.join(",") === "cyyoung,sawamura,maddux,hikari,magari", "Dendos preset should apply the elite pitching staff to Team A");
assert(teamPresetSelectionState.homePitchers.join(",") === "skubal,melton,jansen,hanifee,summers", "Tigers preset should apply to Team B");
assert(teamPresetSelectionState.awayOtaniAllowed === true, "Dendos teams should still allow player swaps without point-limit blocking");
assert(!rosterAndPointState.escapedChooserHtml.includes("<img src=x"), "player chooser should not render saved player names as HTML");

const pitcherChangeState = JSON.parse(runInGame(
  context,
  `(() => {
    selected = createSelectedTeams(defaultMenuSelection);
    battingTeam = "away";
    gamePhase = "playing";
    setMatchup();
    const starter = selected.home.activePitcherId;
    const changed = changePitcher("home", selected.home.pitchers[1].id);
    const afterChange = selected.home.activePitcherId;
    const activeAfterChange = activePitcher.id;
    const backToStarter = changePitcher("home", starter);
    const usedIds = [...selected.home.usedPitcherIds];
    return JSON.stringify({ starter, changed, afterChange, activeAfterChange, backToStarter, usedIds });
  })()`
));

assert(pitcherChangeState.changed === true, "teams should be able to change to an unused bench pitcher");
assert(pitcherChangeState.afterChange === pitcherChangeState.activeAfterChange, "active pitcher should update after a pitching change");
assert(pitcherChangeState.backToStarter === false, "removed pitchers should not be able to re-enter");
assert(pitcherChangeState.usedIds.includes(pitcherChangeState.starter), "the starter should count as used");

const pitcherStaminaState = JSON.parse(runInGame(
  context,
  `(() => {
    selected = createSelectedTeams(defaultMenuSelection);
    battingTeam = "away";
    gamePhase = "playing";
    setMatchup();
    const pitcherInfo = activePitcher;
    const max = getPitcherMaxStamina(pitcherInfo);
    const initial = pitcherInfo.currentStamina;
    const initialPitchCount = pitcherInfo.pitchCount;
    startPitch("fast", { course: { direction: 0, offset: 0 }, targetSpread: 0, targetX: field.plateX, targetY: field.plateY });
    const afterFast = pitcherInfo.currentStamina;
    const afterFastPitchCount = pitcherInfo.pitchCount;
    resetBall();
    const beforeSpecial = pitcherInfo.currentStamina;
    startPitch("special", { course: { direction: 0, offset: 0 }, targetSpread: 0, targetX: field.plateX, targetY: field.plateY });
    const afterSpecial = pitcherInfo.currentStamina;
    const specialPendingMultiplier = pendingPitch.pitchAbilityMultiplier;
    const specialStuffMultiplier = pitchTypes.special.stuffMultiplier;
    currentPitchType = "special";
    ball.pitchAbilityMultiplier = specialPendingMultiplier;
    const specialStuff = getEffectivePitcherStuff({ ...pitcherInfo, stuff: 10 });
    currentPitchType = "fast";
    ball.pitchAbilityMultiplier = pitchTypes.fast.abilityMultiplier ?? 1;
    const fastStuff = getEffectivePitcherStuff({ ...pitcherInfo, stuff: 10 });
    const slowSpeedRatio = pitchTypes.slow.speedFactor / pitchTypes.normal.speedFactor;
    const fastSpeedRatio = pitchTypes.fast.speedFactor / pitchTypes.normal.speedFactor;
    const fastSpeedFactor = pitchTypes.fast.speedFactor;
    const specialSpeedFactor = pitchTypes.special.speedFactor;
    const specialBaseKmhFactor = pitchTypes.special.baseKmhFactor;
    resetBall();
    pitcherInfo.currentStamina = max;
    activePitcher = pitcherInfo;
    currentPitchType = "fast";
    ball.inPitch = true;
    ball.staminaMistake = false;
    const beforeHorizontalVariation = pitcherInfo.currentStamina;
    consumePitchVariationStamina("horizontal");
    const afterHorizontalVariation = pitcherInfo.currentStamina;
    consumePitchVariationStamina("horizontal");
    const afterRepeatedHorizontalVariation = pitcherInfo.currentStamina;
    consumePitchVariationStamina("vertical");
    const afterVerticalVariation = pitcherInfo.currentStamina;
    pitcherInfo.currentStamina = max;
    const beforeHitPenalty = pitcherInfo.currentStamina;
    recordPitcherHitAllowed(fieldingTeam(), pitcherInfo, 1);
    const afterHitPenalty = pitcherInfo.currentStamina;
    recordCurrentPitcherWalkAllowed(1, pitcherInfo);
    const afterWalkPenalty = pitcherInfo.currentStamina;
    recordResponsiblePitcherRunsAllowed(fieldingTeam(), 2, [pitcherInfo.id, pitcherInfo.id], staminaTuning.runPenalty);
    const afterRunPenalty = pitcherInfo.currentStamina;
    recordResponsiblePitcherRunsAllowed(fieldingTeam(), 1, [pitcherInfo.id], staminaTuning.homerRunPenalty);
    const afterHomerRunPenalty = pitcherInfo.currentStamina;
    resetBall();
    pitcherInfo.currentStamina = max * 0.35;
    const tiredState = getPitcherStaminaState(pitcherInfo).label;
    const tiredSpeedDrop = getStaminaSpeedDrop(pitcherInfo);
    const tiredControl = getStaminaAdjustedControl(pitcherInfo);
    const tiredBend = getStaminaChangeMultiplier(pitcherInfo, staminaTuning.bendExhaustedMultiplier);
    const beforeRecovery = pitcherInfo.currentStamina;
    adjustPitcherStamina(pitcherInfo, staminaTuning.strikeoutRecovery);
    const afterStrikeoutRecovery = pitcherInfo.currentStamina;
    adjustPitcherStamina(pitcherInfo, 999);
    const capped = pitcherInfo.currentStamina;
    pitcherInfo.currentStamina = max * 0.15;
    const exhaustedState = getPitcherStaminaState(pitcherInfo).label;
    const exhaustedSpeedDrop = getStaminaSpeedDrop(pitcherInfo);
    const freshMultiplier = getStaminaAbilityMultiplier({ ...pitcherInfo, currentStamina: max * 0.75 });
    const lightMultiplier = getStaminaAbilityMultiplier({ ...pitcherInfo, currentStamina: max * 0.6 });
    const tiredMultiplier = getStaminaAbilityMultiplier({ ...pitcherInfo, currentStamina: max * 0.4 });
    const heavyMultiplier = getStaminaAbilityMultiplier({ ...pitcherInfo, currentStamina: max * 0.2 });
    const emptyMultiplier = getStaminaAbilityMultiplier({ ...pitcherInfo, currentStamina: max * 0.05 });
    const deepEmptyMultiplier = getStaminaAbilityMultiplier({ ...pitcherInfo, currentStamina: max * 0.04 });
    const emptyBend = getStaminaChangeMultiplier({ ...pitcherInfo, currentStamina: max * 0.05 }, staminaTuning.bendExhaustedMultiplier);
    const barHtml = staminaBar(pitcherInfo);
    const gameStaminaText = getPitcherGameStaminaText(pitcherInfo);
    return JSON.stringify({
      stamina: pitcherInfo.stamina,
      fastKmh: pitcherInfo.fastKmh,
      control: pitcherInfo.control,
      max,
      initial,
      initialPitchCount,
      afterFast,
      afterFastPitchCount,
      fastCost: pitchTypes.fast.staminaCost,
      pitchCostMultiplier: staminaTuning.pitchCostMultiplier,
      beforeSpecial,
      afterSpecial,
      specialCost: pitchTypes.special.staminaCost,
      specialPendingMultiplier,
      specialStuffMultiplier,
      specialStuff,
      fastStuff,
      stuffEffectScale: pitcherAbilityTuning.stuffEffectScale,
      slowSpeedRatio,
      fastSpeedRatio,
      fastSpeedFactor,
      specialSpeedFactor,
      specialBaseKmhFactor,
      beforeHorizontalVariation,
      afterHorizontalVariation,
      afterRepeatedHorizontalVariation,
      afterVerticalVariation,
      horizontalVariationCostRate: staminaTuning.horizontalVariationCostRate,
      verticalVariationCostRate: staminaTuning.verticalVariationCostRate,
      beforeHitPenalty,
      afterHitPenalty,
      afterWalkPenalty,
      afterRunPenalty,
      afterHomerRunPenalty,
      hitPenalty: staminaTuning.hitPenalty,
      walkPenalty: staminaTuning.walkPenalty,
      runPenalty: staminaTuning.runPenalty,
      homerRunPenalty: staminaTuning.homerRunPenalty,
      tiredState,
      tiredSpeedDrop,
      tiredControl,
      tiredBend,
      freshMultiplier,
      lightMultiplier,
      tiredMultiplier,
      heavyMultiplier,
      emptyMultiplier,
      deepEmptyMultiplier,
      emptyBend,
      beforeRecovery,
      afterStrikeoutRecovery,
      capped,
      exhaustedState,
      exhaustedSpeedDrop,
      barHtml,
      gameStaminaText
    });
  })()`
));

assert(pitcherStaminaState.stamina === 8, "active default pitcher should use the roster stamina rating");
assert(Math.abs(pitcherStaminaState.max - 145.6) < 0.001, "stamina rating eight should create thirty-percent more current-stamina points");
assert(pitcherStaminaState.initial === pitcherStaminaState.max, "selected pitchers should begin at full stamina");
assert(Math.abs(pitcherStaminaState.pitchCostMultiplier - 0.55) < 0.001, "pitch stamina consumption should use fifty-five percent of the base pitch cost");
assert(Math.abs(pitcherStaminaState.initial - pitcherStaminaState.afterFast - pitcherStaminaState.fastCost * pitcherStaminaState.pitchCostMultiplier) < 0.001, "fastballs should consume fifty-five percent of their base stamina cost");
assert(pitcherStaminaState.initialPitchCount === 0, "pitchers should begin with zero pitches thrown");
assert(pitcherStaminaState.afterFastPitchCount === 1, "starting a pitch should increment the pitch count");
assert(Math.abs(pitcherStaminaState.beforeSpecial - pitcherStaminaState.afterSpecial - 6 * pitcherStaminaState.pitchCostMultiplier) < 0.001, "special pitches should use the reduced base stamina cost");
assert(pitcherStaminaState.specialCost === 6, "special pitch stamina cost should be six");
assert(Math.abs(pitcherStaminaState.specialPendingMultiplier - 1) < 0.001, "special pitches should not inflate control and movement through the general ability multiplier");
assert(Math.abs(pitcherStaminaState.specialStuffMultiplier - 2) < 0.001, "special pitches should double pitcher stuff internally");
assert(pitcherStaminaState.specialStuff > 10 && Math.abs(pitcherStaminaState.specialStuff / pitcherStaminaState.fastStuff - 2) < 0.001, "special pitch stuff should be allowed to exceed ten internally");
assert(Math.abs(pitcherStaminaState.stuffEffectScale - 1.4) < 0.001, "pitcher stuff penalties should be increased to 1.4x");
assert(Math.abs(pitcherStaminaState.slowSpeedRatio - 0.7) < 0.000001, "slow pitches should be seventy percent of normal actual speed");
assert(Math.abs(pitcherStaminaState.fastSpeedRatio - 1.4) < 0.000001, "fast pitches should be 1.4x normal actual speed");
assert(Math.abs(pitcherStaminaState.fastSpeedFactor - 1.15) < 0.000001, "fast pitch actual speed should keep its current factor");
assert(Math.abs(pitcherStaminaState.specialSpeedFactor - pitcherStaminaState.fastSpeedFactor * 1.1) < 0.001, "special pitches should be ten percent faster than fast pitches");
assert(Math.abs(pitcherStaminaState.specialBaseKmhFactor - 1.1) < 0.001, "special pitch displayed speed should be ten percent above the fast pitch base");
assert(Math.abs(pitcherStaminaState.beforeHorizontalVariation - pitcherStaminaState.afterHorizontalVariation - pitcherStaminaState.fastCost * pitcherStaminaState.horizontalVariationCostRate * pitcherStaminaState.pitchCostMultiplier) < 0.001, "post-release horizontal variation should add ten percent of the base pitch stamina cost");
assert(Math.abs(pitcherStaminaState.afterHorizontalVariation - pitcherStaminaState.afterRepeatedHorizontalVariation) < 0.001, "repeated horizontal variation in one pitch should not stack stamina cost");
assert(Math.abs(pitcherStaminaState.afterRepeatedHorizontalVariation - pitcherStaminaState.afterVerticalVariation - pitcherStaminaState.fastCost * pitcherStaminaState.verticalVariationCostRate * pitcherStaminaState.pitchCostMultiplier) < 0.001, "post-release vertical variation should add twenty percent of the base pitch stamina cost");
assert(Math.abs(pitcherStaminaState.beforeHitPenalty - pitcherStaminaState.afterHitPenalty - pitcherStaminaState.hitPenalty) < 0.001, "hits allowed should reduce pitcher stamina by three");
assert(Math.abs(pitcherStaminaState.afterHitPenalty - pitcherStaminaState.afterWalkPenalty - pitcherStaminaState.walkPenalty) < 0.001, "walks and hit batters should reduce pitcher stamina by three");
assert(Math.abs(pitcherStaminaState.afterWalkPenalty - pitcherStaminaState.afterRunPenalty - pitcherStaminaState.runPenalty * 2) < 0.001, "non-homer runs allowed should reduce pitcher stamina by five per run");
assert(Math.abs(pitcherStaminaState.afterRunPenalty - pitcherStaminaState.afterHomerRunPenalty - pitcherStaminaState.homerRunPenalty) < 0.001, "home-run runs allowed should reduce pitcher stamina by seven per run");
assert(typeof pitcherStaminaState.tiredState === "string", "35 percent stamina should be marked as tired");
assert(Math.abs(pitcherStaminaState.tiredSpeedDrop - pitcherStaminaState.fastKmh * 0.2) < 0.001, "30-50 percent stamina should reduce speed by twenty percent");
assert(Math.abs(pitcherStaminaState.tiredControl - pitcherStaminaState.control * 0.8) < 0.001, "30-50 percent stamina should reduce control by twenty percent");
assert(Math.abs(pitcherStaminaState.tiredBend - 0.8) < 0.001, "30-50 percent stamina should reduce pitch movement by twenty percent");
assert(Math.abs(pitcherStaminaState.freshMultiplier - 1) < 0.001, "70 percent or more stamina should keep full ability");
assert(Math.abs(pitcherStaminaState.lightMultiplier - 0.9) < 0.001, "50-70 percent stamina should reduce abilities by ten percent");
assert(Math.abs(pitcherStaminaState.tiredMultiplier - 0.8) < 0.001, "30-50 percent stamina should reduce abilities by twenty percent");
assert(Math.abs(pitcherStaminaState.heavyMultiplier - 0.7) < 0.001, "10-30 percent stamina should reduce abilities by thirty percent");
assert(Math.abs(pitcherStaminaState.emptyMultiplier - 0.5) < 0.001, "5-10 percent stamina should reduce abilities by fifty percent");
assert(Math.abs(pitcherStaminaState.deepEmptyMultiplier - 0.3) < 0.001, "below five percent stamina should reduce abilities by seventy percent");
assert(pitcherStaminaState.emptyBend < 0.25, "below ten percent stamina should make breaking balls barely move");
assert(Math.abs(pitcherStaminaState.afterStrikeoutRecovery - pitcherStaminaState.beforeRecovery - 5) < 0.001, "strikeouts should recover five stamina points");
assert(pitcherStaminaState.capped === pitcherStaminaState.max, "stamina recovery should be capped at the initial maximum");
assert(typeof pitcherStaminaState.exhaustedState === "string", "10-30 percent stamina should still report a fatigue label");
assert(Math.abs(pitcherStaminaState.exhaustedSpeedDrop - pitcherStaminaState.fastKmh * 0.3) < 0.001, "10-30 percent stamina should drop speed by thirty percent");
assert(pitcherStaminaState.barHtml.includes("stamina-row"), "pitcher sidebar should render a stamina bar");
assert(/\d+\/\d+/.test(pitcherStaminaState.barHtml), "pitcher sidebar stamina bar should show numeric current and max stamina");
assert(/^\d+\/\d+$/.test(pitcherStaminaState.gameStaminaText), "in-game pitcher stamina bar should show current and max stamina numbers");
assert(pitcherStaminaState.barHtml.includes("stamina-mark-70"), "stamina bar should show the seventy-percent fatigue mark");
assert(pitcherStaminaState.barHtml.includes("stamina-mark-50"), "stamina bar should show the fifty-percent fatigue mark");
assert(pitcherStaminaState.barHtml.includes("stamina-mark-30"), "stamina bar should show the thirty-percent fatigue mark");
assert(pitcherStaminaState.barHtml.includes("stamina-mark-10"), "stamina bar should show the ten-percent fatigue mark");

const battingTighteningState = JSON.parse(runInGame(
  context,
  `(() => {
    activeBatter = { ...findById(batters, "judge"), power: 10, meet: 5 };
    const zonePoints = getGoodContactZonePoints();
    const plateTop = field.plateY - 12 * field.plateScale;
    const topY = Math.min(...zonePoints.map((point) => point.y));
    const topWidth = Math.abs(zonePoints[1].x - zonePoints[0].x);
    const profile = buildBattedBallProfile({
      timeDiff: 80,
      quality: 0.58,
      timingScore: 0.7,
      barrelScore: 0.68,
      sweetSpotScore: 0.56,
      zoneScore: 0.72,
      plateDistance: 30,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      yellowZoneBoost: 0
    });
    const hit = { label: hitLabels.single, kind: "hit", power: profile.power, scoreType: "single", battedProfile: profile };
    const demoted = applyNonYellowHitChancePenalty(hit, profile, 0.897);
    const kept = applyNonYellowHitChancePenalty(hit, profile, 0.899);
    activePitcher = findById(pitchers, "yamamoto");
    activeBatterSide = "R";
    ball.radius = 8;
    ball.plateTime = performance.now();
    const scaledOutsideRange = (ball.radius + 22) * batThicknessMultiplier * meetZoneWidthScale;
    const outsideReachContact = buildContactProfile({
      distanceToBat: scaledOutsideRange + ball.radius * meetZoneWidthScale,
      x: field.plateX + field.strikeZoneWidth,
      y: field.plateY,
      batContact: { t: 0.98 }
    });
    const outsideCleanerContact = buildContactProfile({
      distanceToBat: scaledOutsideRange - 2,
      x: field.plateX + field.strikeZoneWidth,
      y: field.plateY,
      batContact: { t: 0.82 }
    });
    ball.x = field.plateX + field.strikeZoneWidth;
    ball.y = field.plateY;
    const outsideVisibleHitWidth = getVisibleBatHitWidth();
    const unscaledOutsideVisibleHitWidth = ((ball.radius + 18) + ball.radius * 2) * batThicknessMultiplier;
    const earlyFeedback = buildBattingFeedbackLines({
      timeDiff: -82,
      sweetSpotScore: 0.62,
      barrelScore: 0.7,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      quality: 0.74
    }, { label: hitLabels.lineLiner });
    const lateFeedback = buildBattingFeedbackLines({
      timeDiff: 96,
      sweetSpotScore: 0.38,
      barrelScore: 0.42,
      zoneScore: 0.48,
      plateDistance: 52,
      outsideStrikeZone: true,
      inGoodContactZone: false,
      quality: 0.28
    }, { label: hitLabels.grounder });
    const goodFoulDirection = normalize({ x: 1.7, y: -1 });
    const nudgedGoodDirection = nudgeGoodContactDirectionFair(goodFoulDirection, {
      timeDiff: 104,
      timingScore: 0.68,
      sweetSpotScore: 0.62,
      barrelScore: 0.66,
      zoneScore: 1,
      inGoodContactZone: true,
      quality: 0.76
    }, { kind: "hit", label: hitLabels.single });
    const weakFoulDirection = normalize({ x: 1.7, y: -1 });
    const nudgedWeakDirection = nudgeGoodContactDirectionFair(weakFoulDirection, {
      timeDiff: 230,
      timingScore: 0.22,
      sweetSpotScore: 0.28,
      barrelScore: 0.32,
      zoneScore: 0.52,
      inGoodContactZone: false,
      quality: 0.24
    }, { kind: "hit", label: hitLabels.single });
    return JSON.stringify({
      topExtension: plateTop - topY,
      topWidth,
      effectivePower10: getEffectiveBatterPower({ power: 10 }),
      effectivePower1: getEffectiveBatterPower({ power: 1 }),
      visualSweetSpotHalfWidth: getSweetSpotHalfWidth("visual"),
      scoreSweetSpotHalfWidth: getSweetSpotHalfWidth("score"),
      meetZoneWidthScale,
      outsideVisibleHitWidth,
      unscaledOutsideVisibleHitWidth,
      scoreAtVisibleEdge: getSweetSpotScore(0.68 + getSweetSpotHalfWidth("visual")),
      scoreOutsideVisibleEdge: getSweetSpotScore(0.68 + getSweetSpotHalfWidth("visual") * 1.1),
      scoreAtScoringEdge: getSweetSpotScore(0.68 + getSweetSpotHalfWidth("score")),
      scoreTwoWidthsOutside: getSweetSpotScore(0.68 + getSweetSpotHalfWidth("score") * 2),
      scoreFourWidthsOutside: getSweetSpotScore(0.68 + getSweetSpotHalfWidth("score") * 4),
      scoreAtBatHandleEnd: getSweetSpotScore(0),
      scoreAtBatTipEnd: getSweetSpotScore(1),
      balancedAllGood: getBattingFeedbackBalancedScore({ timingScore: 0.9, sweetSpotScore: 0.86, barrelScore: 0.88, zoneScore: 1, quality: 0.92 }),
      balancedWeakSweetSpot: getBattingFeedbackBalancedScore({ timingScore: 0.9, sweetSpotScore: 0.22, barrelScore: 0.86, zoneScore: 1, quality: 1 }),
      balancedPlayable: getBattingFeedbackBalancedScore({ timingScore: 0.74, sweetSpotScore: 0.62, barrelScore: 0.65, zoneScore: 1, quality: 0.78 }),
      demotedKind: demoted.kind,
      keptKind: kept.kind,
      outsideReachContact: outsideReachContact.isContact,
      outsideReachUse: outsideReachContact.outsideReachUse,
      outsideReachQuality: outsideReachContact.quality,
      outsideCleanerQuality: outsideCleanerContact.quality,
      goodFoulNudgedFair: isFairDirection(nudgedGoodDirection),
      weakFoulStillFoul: !isFairDirection(nudgedWeakDirection),
      earlyFeedback: earlyFeedback.join(" / "),
      lateFeedback: lateFeedback.join(" / ")
    });
  })()`
));

assert(battingTighteningState.topExtension <= 20, "good-contact yellow zone should stay controlled after the extra pitcher-side extension");
assert(battingTighteningState.topExtension >= 10, "good-contact yellow zone should extend farther toward the pitcher");
assert(battingTighteningState.topWidth > 60, "good-contact yellow zone should keep its horizontal reach");
assert(Math.abs(battingTighteningState.effectivePower10 - 9) < 0.001, "effective batter power should be reduced by ten percent");
assert(Math.abs(battingTighteningState.effectivePower1 - 0.9) < 0.001, "low effective batter power should also be reduced by ten percent");
assert(battingTighteningState.scoreSweetSpotHalfWidth > battingTighteningState.visualSweetSpotHalfWidth * 5.4, "scored sweet spot should be thirty percent more forgiving than the previous scoring width");
assert(Math.abs(battingTighteningState.scoreSweetSpotHalfWidth - 0.01208) < 0.001, "sweet spot scoring should be boosted by thirty percent from the current narrowed width");
assert(Math.abs(battingTighteningState.meetZoneWidthScale - 0.8) < 0.001, "meet zone width should use the requested eighty-percent scale");
assert(Math.abs(battingTighteningState.outsideVisibleHitWidth - battingTighteningState.unscaledOutsideVisibleHitWidth * 0.8) < 0.001, "visible meet zone should be narrowed to eighty percent");
assert(battingTighteningState.scoreAtVisibleEdge > 0.78, "visible sweet-spot edge should still receive useful sweet-spot scoring");
assert(battingTighteningState.scoreOutsideVisibleEdge > 0.66, "nearby contact just outside the visible sweet spot should still receive partial scoring");
assert(battingTighteningState.scoreAtScoringEdge >= 0.67, "sweet-spot scoring should stay generous at the scoring edge");
assert(battingTighteningState.scoreTwoWidthsOutside >= 0.5 && battingTighteningState.scoreTwoWidthsOutside < battingTighteningState.scoreAtScoringEdge, "sweet-spot scoring should keep a stronger useful tail outside the scoring edge");
assert(battingTighteningState.scoreFourWidthsOutside >= 0.3 && battingTighteningState.scoreFourWidthsOutside < battingTighteningState.scoreTwoWidthsOutside, "farther sweet-spot misses should fade more gradually instead of dropping off a cliff");
assert(battingTighteningState.scoreAtBatHandleEnd >= 0.15 && battingTighteningState.scoreAtBatTipEnd >= 0.15, "bat contact should keep at least a fifteen-percent sweet-spot score floor");
assert(battingTighteningState.balancedAllGood > 0.7, "balanced batting feedback should still reward all-around good contact after the ten-point reduction");
assert(battingTighteningState.balancedWeakSweetSpot < 0.62, "balanced batting feedback should be stricter when the sweet spot is poor");
assert(battingTighteningState.balancedPlayable >= 0.5 && battingTighteningState.balancedPlayable <= 0.69, "balanced batting feedback should keep playable contact about five points lower");
assert(battingTighteningState.demotedKind === "out", "non-yellow hits should lose the penalty roll most of the time");
assert(battingTighteningState.keptKind === "hit", "non-yellow hits should remain hits outside the penalty roll");
assert(battingTighteningState.outsideReachContact === true, "outside pitches should be reachable about one extra ball width off the plate");
assert(battingTighteningState.outsideReachUse > 0, "extended outside reach should be tracked as tip contact");
assert(battingTighteningState.outsideReachQuality <= 0.28, "outside tip contact should usually become a foul or weak out-quality ball");
assert(battingTighteningState.goodFoulNudgedFair === true, "good 50-plus contact should be nudged back toward fair territory when it only barely leaks foul");
assert(battingTighteningState.weakFoulStillFoul === true, "weak or badly mistimed contact should still be allowed to stay foul");
assert(battingTighteningState.earlyFeedback.includes("早い"), "batting feedback should show early timing");
assert(battingTighteningState.lateFeedback.includes("遅い"), "batting feedback should show late timing");
assert(battingTighteningState.earlyFeedback.includes("スイートスポット"), "batting feedback should show practical sweet-spot quality");
assert(battingTighteningState.earlyFeedback.includes("接触の深さ"), "batting feedback should show contact depth quality");
assert(battingTighteningState.lateFeedback.includes("ゾーン"), "batting feedback should show zone quality");

const battingPracticeModeState = JSON.parse(runInGame(
  context,
  `(() => {
    modeSelect.value = "practice";
    practicePitcherControlSelect.value = "auto";
    practicePitcherTypeSelect.value = "A";
    renderPracticePlayerSelects();
    practiceBatterSelect.value = "ruth";
    practicePitcherSelect.value = "sawamura";
    readMenu();
    const practiceAutoPlayerBatting = isPlayerBatting();
    const practiceAutoPlayerPitching = isPlayerPitching();
    const autoSchedulesPitch = (() => {
      scheduleNextPitch(1234);
      return Number.isFinite(autoPitchTimer) && Boolean(computerPitchPlan);
    })();
    const autoStartsPitch = (() => {
      gamePhase = "playing";
      resetBall();
      isPitching = false;
      pendingPitch = null;
      scheduleNextPitch(0);
      autoPitchTimer = performance.now() - 1;
      update(16);
      const started = isPitching === true && Boolean(pendingPitch);
      isPitching = false;
      pendingPitch = null;
      resetBall();
      return started;
    })();
    const singleCpuJudgmentSchedulesTwoSeconds = (() => {
      startGame();
      gameMode = "single";
      battingTeam = "away";
      gamePhase = "playing";
      resetBall();
      finishPitch("ストライク", "strike");
      const delay = autoPitchTimer - performance.now();
      return delay > 1900 && delay <= 2050 && Boolean(computerPitchPlan);
    })();
    const practiceAutoJudgmentSchedulesNextPitch = (() => {
      modeSelect.value = "practice";
      practicePitcherControlSelect.value = "auto";
      practicePitcherTypeSelect.value = "A";
      practicePitcherSelect.value = "battingpractice";
      readMenu();
      startGame();
      resetBall();
      finishPitch("ストライク", "strike");
      const delay = autoPitchTimer - performance.now();
      return delay > 1900 && delay <= 2050 && Boolean(computerPitchPlan);
    })();
    practicePitcherSelect.value = "sawamura";
    practiceBatterSelect.value = "ruth";
    readMenu();
    startGame();
    const selectedPracticeBatter = activeBatter.id;
    const selectedPracticePitcher = activePitcher.id;
    const practiceStaminaBeforePitch = activePitcher.currentStamina;
    const practicePitchCountBeforePitch = activePitcher.pitchCount;
    startPitch("special", { course: { direction: 0, offset: 0 }, targetSpread: 0, targetX: field.plateX, targetY: field.plateY });
    const practiceStaminaAfterPitch = activePitcher.currentStamina;
    const practicePitchCountAfterPitch = activePitcher.pitchCount;
    const practiceStaminaBeforeHomer = activePitcher.currentStamina;
    applyHomeRunPitcherStaminaPenalty(activePitcher);
    const practiceStaminaAfterHomer = activePitcher.currentStamina;
    gameMode = "versus";
    const versusPitcher = createMatchPitcher(findById(pitchers, "sawamura"));
    const versusStaminaBeforeHomer = versusPitcher.currentStamina;
    applyHomeRunPitcherStaminaPenalty(versusPitcher);
    const versusStaminaAfterHomer = versusPitcher.currentStamina;
    gameMode = "practice";
    resetBall();
    count = { strikes: 2, balls: 3, outs: 2 };
    bases.first = makeBaseRunner(findById(batters, "ichiro"));
    resetPracticePlateAppearance();
    const practiceSameBatterAfterReset = activeBatter.id === selectedPracticeBatter;
    const practiceSamePitcherAfterReset = activePitcher.id === selectedPracticePitcher;
    const practiceCountReset = count.strikes === 0 && count.balls === 0 && count.outs === 0 && !bases.first;
    practicePitcherControlSelect.value = "manual";
    readMenu();
    const practiceManualPlayerPitching = isPlayerPitching();
    modeSelect.value = "practice";
    practiceBatterSelect.value = "rodgers";
    practicePitcherSelect.value = "rodgers";
    readMenu();
    startGame();
    const practiceRodgersVsRodgers = activeBatter.id === "rodgers"
      && activePitcher.id === "rodgers"
      && activeBatter.power === 6
      && activePitcher.fastKmh === 125;
    renderPracticePlayerSelects();
    const practicePitcherHasBattingPractice = practicePitcherSelect.innerHTML.includes('value="battingpractice"') && practicePitcherSelect.innerHTML.includes("打撃投手");
    const battingPracticeNotRosterPitcher = !pitchers.some((pitcher) => pitcher.id === "battingpractice");
    practicePitcherSelect.value = "battingpractice";
    practicePitcherTypeSelect.value = "A";
    readMenu();
    startGame();
    const battingPracticePitcher = {
      id: activePitcher.id,
      throws: activePitcher.throws,
      fastKmh: activePitcher.fastKmh,
      control: activePitcher.control,
      stuff: activePitcher.stuff,
      fielding: activePitcher.fielding,
      practiceOnly: activePitcher.practiceOnly === true
    };
    const battingPracticePlan = chooseComputerPitchPlan();
    practicePitcherType = "B";
    const battingPracticeTypeBPlan = chooseComputerPitchPlan();
    const practicePitchTypeRandom = Math.random;
    practicePitcherType = "C";
    Math.random = () => 0.5;
    const battingPracticeTypeCPlan = chooseComputerPitchPlan();
    Math.random = practicePitchTypeRandom;
    practicePitcherType = "A";
    activeBatter = { ...findById(batters, "otani"), power: 9, meet: 7 };
    resetSwing();
    startSwing(performance.now(), "strong");
    const battingPracticeHomerProfile = buildBattedBallProfile({
      timeDiff: 0,
      timingScore: 0.92,
      sweetSpotScore: 0.9,
      barrelScore: 0.9,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      quality: 0.82
    });
    const homerRandom = Math.random;
    const homerRolls = [0.01];
    Math.random = () => homerRolls.length ? homerRolls.shift() : 0.5;
    const battingPracticeHomerResult = decideHitResultFromBattedProfile({
      timeDiff: 0,
      timingScore: 0.9,
      sweetSpotScore: 0.86,
      barrelScore: 0.86,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      quality: 0.76
    });
    const battingPracticeHomerBall = buildBattedBall(
      battingPracticeHomerResult.power,
      battingPracticeHomerResult.direction,
      battingPracticeHomerResult.label,
      battingPracticeHomerResult.battedProfile
    );
    const moderateHomerRolls = [0.56];
    Math.random = () => moderateHomerRolls.length ? moderateHomerRolls.shift() : 0.5;
    const battingPracticeModerateHomerResult = decideHitResultFromBattedProfile({
      timeDiff: 32,
      timingScore: 0.64,
      sweetSpotScore: 0.58,
      barrelScore: 0.58,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      quality: 0.54
    });
    const battingPracticeModerateHomerBall = buildBattedBall(
      battingPracticeModerateHomerResult.power,
      battingPracticeModerateHomerResult.direction,
      battingPracticeModerateHomerResult.label,
      battingPracticeModerateHomerResult.battedProfile
    );
    Math.random = homerRandom;
    activePitcher = createMatchPitcher(findById(pitchers, "sawamura"));
    practiceActivePitcher = activePitcher;
    const normalPracticeProfile = buildBattedBallProfile({
      timeDiff: 0,
      timingScore: 0.92,
      sweetSpotScore: 0.9,
      barrelScore: 0.9,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      quality: 0.82
    });
    gameMode = "versus";
    const handednessContact = {
      timeDiff: 0,
      timingScore: 0.78,
      sweetSpotScore: 0.72,
      barrelScore: 0.72,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      quality: 0.66
    };
    activeBatter = { ...findById(batters, "ichiro"), bats: "L", power: 5, meet: 7 };
    activePitcher = { ...findById(pitchers, "sawamura"), throws: "R", stuff: 5 };
    const leftVsRightMultiplier = getHandednessBattingContactMultiplier(activeBatter, activePitcher);
    const leftVsRightProfile = buildBattedBallProfile(handednessContact);
    activePitcher = { ...activePitcher, throws: "L" };
    const leftVsLeftMultiplier = getHandednessBattingContactMultiplier(activeBatter, activePitcher);
    const leftVsLeftProfile = buildBattedBallProfile(handednessContact);
    activeBatter = { ...findById(batters, "trout"), bats: "R", power: 5, meet: 7 };
    activePitcher = { ...findById(pitchers, "sawamura"), throws: "L", stuff: 5 };
    const rightVsLeftMultiplier = getHandednessBattingContactMultiplier(activeBatter, activePitcher);
    const rightVsLeftProfile = buildBattedBallProfile(handednessContact);
    activePitcher = { ...activePitcher, throws: "R" };
    const rightVsRightMultiplier = getHandednessBattingContactMultiplier(activeBatter, activePitcher);
    const rightVsRightProfile = buildBattedBallProfile(handednessContact);
    modeSelect.value = "versus";
    const contact = {
      timeDiff: 12,
      timingScore: 0.92,
      sweetSpotScore: 0.9,
      barrelScore: 0.9,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      quality: 0.92
    };
    showBattingFeedback(contact, { label: hitLabels.lineLiner });
    const feedbackShownOutsidePractice = battingFeedback.active === true;
    gameMode = "practice";
    showBattingFeedback(contact, { label: hitLabels.lineLiner });
    const feedbackShownInPractice = battingFeedback.active === true;
    appendBattedBallFeedback({
      exitSpeedKmh: 151,
      flightDistanceMeters: 118,
      flightDistance: 1320,
      trajectory: "liner",
      isLiner: true,
      battedProfile: { launchAngle: 17 },
      power: 0.9
    });
    const feedbackIncludesBattedMetrics = battingFeedback.lines.some((line) => line.includes("打球速度") && line.includes("打球角度") && line.includes("飛距離"));
    const originalRandom = Math.random;
    Math.random = () => 0.2;
    const sixtyUpgrade = applyFeedbackQualityHitUpgrade({ label: hitLabels.routineFly, kind: "out", routineFly: true, power: 0.55 }, {
      launchAngle: 12,
      exitVelocity: 0.58,
      carry: 0.58,
      power: 0.62,
      direction: normalize({ x: 0.2, y: -1 }),
      lineDropScore: 0.12,
      lineLinerScore: 0.12
    }, {
      timingScore: 0.74,
      sweetSpotScore: 0.62,
      barrelScore: 0.65,
      zoneScore: 1,
      inGoodContactZone: true,
      quality: 0.78
    });
    const fiftyFiveUpgrade = applyFeedbackQualityHitUpgrade({ label: hitLabels.routineFly, kind: "out", routineFly: true, power: 0.54 }, {
      launchAngle: 15,
      exitVelocity: 0.54,
      carry: 0.58,
      power: 0.66,
      direction: normalize({ x: 0.08, y: -1 }),
      lineDropScore: 0.1,
      lineLinerScore: 0.12,
      quality: 0.56
    }, {
      timingScore: 0.62,
      sweetSpotScore: 0.54,
      barrelScore: 0.58,
      zoneScore: 1,
      inGoodContactZone: true,
      quality: 0.58
    });
    const eightyUpgrade = applyFeedbackQualityHitUpgrade({ label: hitLabels.single, kind: "hit", scoreType: "single", power: 0.64 }, {
      launchAngle: 22,
      exitVelocity: 0.78,
      carry: 0.78,
      power: 0.9,
      direction: normalize({ x: 0.08, y: -1 }),
      fenceLinerScore: 0.2
    }, {
      timingScore: 0.86,
      sweetSpotScore: 0.78,
      barrelScore: 0.82,
      zoneScore: 1,
      inGoodContactZone: true,
      quality: 0.86
    });
    const seventyUpgrade = applyFeedbackQualityHitUpgrade({ label: hitLabels.routineFly, kind: "out", routineFly: true, power: 0.6 }, {
      launchAngle: 16,
      exitVelocity: 0.72,
      carry: 0.72,
      power: 0.76,
      direction: normalize({ x: 0.08, y: -1 }),
      lineLinerScore: 0.12
    }, {
      timingScore: 0.82,
      sweetSpotScore: 0.7,
      barrelScore: 0.74,
      zoneScore: 1,
      inGoodContactZone: true,
      quality: 0.82
    });
    activeBatter = { ...activeBatter, power: 8 };
    const ninetyUpgrade = applyFeedbackQualityHitUpgrade({ label: hitLabels.single, kind: "hit", scoreType: "single", power: 0.72 }, {
      launchAngle: 30,
      exitVelocity: 1.02,
      carry: 1.05,
      power: 1.2,
      direction: normalize({ x: 0.04, y: -1 }),
      fenceEdgeFlyScore: 0.5
    }, {
      timingScore: 0.95,
      sweetSpotScore: 0.92,
      barrelScore: 0.92,
      zoneScore: 1,
      inGoodContactZone: true,
      quality: 0.94
    });
    const superUpgrade = applyFeedbackQualityHitUpgrade({ label: hitLabels.single, kind: "hit", scoreType: "single", power: 0.82 }, {
      launchAngle: 27,
      exitVelocity: 1.14,
      carry: 1.12,
      power: 1.22,
      direction: normalize({ x: 0.06, y: -1 }),
      fenceEdgeFlyScore: 0.54,
      quality: 0.9
    }, {
      timingScore: 0.92,
      sweetSpotScore: 0.88,
      barrelScore: 0.9,
      zoneScore: 1,
      inGoodContactZone: true,
      quality: 0.9
    });
    const lineEdgeBoost = makeHardOpenLaneResult({
      launchAngle: 18,
      exitVelocity: 0.78,
      carry: 0.72,
      power: 0.9,
      direction: normalize({ x: 0.32, y: -1 }),
      timingPull: 0.38,
      lineEdgeScore: 0.22,
      lineLinerScore: 0.1,
      gapScore: 0.28,
      quality: 0.62
    });
    const sixtyStrongBall = buildBattedBall(
      sixtyUpgrade.power,
      sixtyUpgrade.direction,
      sixtyUpgrade.label,
      sixtyUpgrade.battedProfile
    );
    const seventyStrongBall = buildBattedBall(
      seventyUpgrade.power,
      seventyUpgrade.direction,
      seventyUpgrade.label,
      seventyUpgrade.battedProfile
    );
    activeBatter = { ...activeBatter, power: 1, meet: 9 };
    const lowPowerDropUpgrade = applyFeedbackQualityHitUpgrade({ label: hitLabels.grounder, kind: "out", grounder: true, power: 0.48 }, {
      launchAngle: 20,
      exitVelocity: 0.72,
      carry: 0.68,
      power: 0.66,
      direction: normalize({ x: 0.04, y: -1 }),
      lineDropScore: 0.12,
      frontDropScore: 0.08,
      lineLinerScore: 0.1,
      quality: 0.78
    }, {
      timingScore: 0.84,
      sweetSpotScore: 0.78,
      barrelScore: 0.76,
      zoneScore: 1,
      inGoodContactZone: true,
      quality: 0.82
    });
    const lowPowerNormalDrop = decideNormalZoneHitResult({
      launchAngle: 21,
      exitVelocity: 0.7,
      carry: 0.66,
      power: 0.64,
      direction: normalize({ x: 0.03, y: -1 }),
      lineDropScore: 0.1,
      frontDropScore: 0.1,
      lineLinerScore: 0.08,
      gapScore: 0.1,
      quality: 0.72
    }, {
      timingScore: 0.82,
      sweetSpotScore: 0.76,
      barrelScore: 0.74,
      zoneScore: 0.96,
      inGoodContactZone: true,
      quality: 0.78
    }, 0.36);
    activeBatter = findById(batters, "ichiro");
    const ichiroModerateScoreContact = {
      timingScore: 0.62,
      sweetSpotScore: 0.56,
      barrelScore: 0.56,
      zoneScore: 0.94,
      inGoodContactZone: true,
      quality: 0.54
    };
    const ichiroModerateScoreProfile = {
      launchAngle: 8,
      exitVelocity: 0.52,
      carry: 0.5,
      power: 0.56,
      direction: normalize({ x: 0.03, y: -1 }),
      lineDropScore: 0.04,
      frontDropScore: 0.04,
      lineLinerScore: 0.05,
      gapScore: 0.08,
      quality: 0.54
    };
    const ichiroModerateScore = getDisplayedBattingFeedbackScore(ichiroModerateScoreContact);
    const ichiroModerateDriveSkill = getLowPowerHighMeetDriveSkill({
      power: getEffectiveBatterPower(activeBatter),
      meet: activeBatter.meet,
      ...ichiroModerateScoreContact
    });
    const ichiroModerateDrive = decideNormalZoneHitResult(
      ichiroModerateScoreProfile,
      ichiroModerateScoreContact,
      0.48
    );
    const ichiroModerateGrounderOverride = applyFeedbackQualityHitUpgrade(
      { label: hitLabels.grounder, kind: "hit", scoreType: "single", grounderGap: true, power: 0.58 },
      {
        launchAngle: 2,
        exitVelocity: 0.44,
        carry: 0.44,
        power: 0.52,
        direction: normalize({ x: 0.04, y: -1 }),
        lineDropScore: 0.04,
        lineLinerScore: 0.04,
        gapScore: 0.1,
        quality: 0.54
      },
      ichiroModerateScoreContact
    );
    const strongFeedbackOffZoneContact = {
      timeDiff: 24,
      timingScore: 0.76,
      sweetSpotScore: 0.68,
      barrelScore: 0.68,
      zoneScore: 0.68,
      inGoodContactZone: false,
      outsideStrikeZone: false,
      plateDistance: 18,
      quality: 0.66
    };
    activeBatter = findById(batters, "ichiro");
    Math.random = () => 0.12;
    const strongFeedbackOffZoneResult = decideHitResultFromBattedProfile(strongFeedbackOffZoneContact);
    Math.random = originalRandom;
    activeBatter = { ...findById(batters, "judge"), power: 9, meet: 5 };
    const powerModerateFenceProfile = {
      launchAngle: 34,
      exitVelocity: 0.82,
      carry: 0.86,
      power: 1.12,
      direction: normalize({ x: 0.04, y: -1 }),
      timingPull: 0.04,
      lineEdgeScore: 0.03,
      lineLinerScore: 0.04,
      fenceEdgeFlyScore: 0.46,
      feedbackScore: 0.66,
      quality: 0.66
    };
    const powerModerateFenceResult = applyFeedbackQualityHitUpgrade(
      { label: hitLabels.fenceEdgeFly, kind: "hit", scoreType: "single", fenceEdgeFly: true, power: 1.16, battedProfile: powerModerateFenceProfile },
      powerModerateFenceProfile,
      {
        timingScore: 0.72,
        sweetSpotScore: 0.68,
        barrelScore: 0.68,
        zoneScore: 1,
        inGoodContactZone: true,
        quality: 0.66
      }
    );
    const directModerateFenceResult = makeFenceEdgeFlyResultFromProfile({
      launchAngle: 36,
      exitVelocity: 0.86,
      carry: 0.82,
      power: 1.14,
      direction: normalize({ x: 0.02, y: -1 }),
      timingPull: 0.02,
      lineEdgeScore: 0.02,
      feedbackScore: 0.64,
      quality: 0.64
    });
    const genericSixtyBounceResult = applyFeedbackQualityHitUpgrade(
      { label: hitLabels.routineFly, kind: "out", routineFly: true, power: 0.68 },
      {
        launchAngle: 38,
        exitVelocity: 0.5,
        carry: 0.58,
        power: 0.72,
        direction: normalize({ x: 0.02, y: -1 }),
        timingPull: 0.02,
        lineEdgeScore: 0.02,
        lineLinerScore: 0.04,
        feedbackScore: 0.65,
        quality: 0.65
      },
      {
        timingScore: 0.72,
        sweetSpotScore: 0.66,
        barrelScore: 0.66,
        zoneScore: 0.86,
        inGoodContactZone: true,
        quality: 0.64
      }
    );
    const moderateSharedProfile = {
      launchAngle: 18,
      exitVelocity: 0.58,
      carry: 0.56,
      power: 0.68,
      direction: normalize({ x: 0.06, y: -1 }),
      timingPull: 0.08,
      lineEdgeScore: 0.05,
      lineDropScore: 0.12,
      lineLinerScore: 0.1,
      quality: 0.64
    };
    activeBatter = findById(batters, "ichiro");
    Math.random = () => 0.18;
    const ichiroSharedModerate = applyFeedbackQualityHitUpgrade(
      { label: hitLabels.grounder, kind: "hit", scoreType: "single", grounderGap: true, power: 0.62 },
      moderateSharedProfile,
      {
        timingScore: 0.72,
        sweetSpotScore: 0.66,
        barrelScore: 0.66,
        zoneScore: 0.86,
        inGoodContactZone: true,
        quality: 0.64
      }
    );
    activeBatter = { ...findById(batters, "sato"), power: 6, meet: 5 };
    Math.random = () => 0.18;
    const powerSharedModerate = applyFeedbackQualityHitUpgrade(
      { label: hitLabels.fenceEdgeFly, kind: "hit", scoreType: "single", fenceEdgeFly: true, power: 1.08 },
      moderateSharedProfile,
      {
        timingScore: 0.72,
        sweetSpotScore: 0.66,
        barrelScore: 0.66,
        zoneScore: 0.86,
        inGoodContactZone: true,
        quality: 0.64
      }
    );
    const sharedModerateContact = {
      timeDiff: 24,
      timingScore: 0.7,
      sweetSpotScore: 0.64,
      barrelScore: 0.64,
      zoneScore: 0.72,
      inGoodContactZone: false,
      outsideStrikeZone: false,
      plateDistance: 18,
      quality: 0.62
    };
    activeBatter = findById(batters, "ichiro");
    Math.random = () => 0.44;
    const ichiroEarlySharedModerate = decideHitResultFromBattedProfile(sharedModerateContact);
    activeBatter = { ...findById(batters, "sato"), power: 6, meet: 5 };
    Math.random = () => 0.44;
    const powerEarlySharedModerate = decideHitResultFromBattedProfile(sharedModerateContact);
    const sharedSixtyCleanContact = {
      timingScore: 0.72,
      sweetSpotScore: 0.66,
      barrelScore: 0.66,
      zoneScore: 0.86,
      inGoodContactZone: true,
      quality: 0.64
    };
    const makeSixtyCleanCase = (batter, profile, initialResult) => {
      activeBatter = batter;
      Math.random = () => 0.5;
      const result = applyFeedbackQualityHitUpgrade(initialResult, profile, sharedSixtyCleanContact);
      const ball = buildBattedBall(result.power, result.direction, result.label, result.battedProfile);
      return { result, ball };
    };
    const lowPowerSixtyClean = makeSixtyCleanCase(
      { ...findById(batters, "ichiro"), power: 1, meet: 9 },
      {
        launchAngle: 3,
        exitVelocity: 0.34,
        carry: 0.36,
        power: 0.4,
        direction: normalize({ x: 0.02, y: -1 }),
        timingPull: 0.02,
        lineEdgeScore: 0.02,
        lineDropScore: 0.04,
        lineLinerScore: 0.04,
        quality: 0.64
      },
      { label: hitLabels.grounder, kind: "out", grounder: true, power: 0.4 }
    );
    activeBatter = { ...findById(batters, "ichiro"), power: 2, meet: 8 };
    Math.random = () => 0.5;
    const weakPowerCleanContact = {
      timeDiff: 34,
      timingScore: 0.68,
      sweetSpotScore: 0.56,
      barrelScore: 0.58,
      zoneScore: 0.78,
      inGoodContactZone: true,
      outsideStrikeZone: false,
      plateDistance: 8,
      quality: 0.56
    };
    const weakPowerCleanResult = decideHitResultFromBattedProfile(weakPowerCleanContact);
    const weakPowerCleanBall = buildBattedBall(
      weakPowerCleanResult.power,
      weakPowerCleanResult.direction,
      weakPowerCleanResult.label,
      weakPowerCleanResult.battedProfile
    );
    const averageSixtyClean = makeSixtyCleanCase(
      { ...findById(batters, "suzuki"), power: 5, meet: 5 },
      {
        launchAngle: 17,
        exitVelocity: 0.56,
        carry: 0.54,
        power: 0.64,
        direction: normalize({ x: 0.04, y: -1 }),
        timingPull: 0.04,
        lineEdgeScore: 0.04,
        lineDropScore: 0.1,
        lineLinerScore: 0.08,
        quality: 0.64
      },
      { label: hitLabels.routineFly, kind: "out", routineFly: true, power: 0.6 }
    );
    const powerSixtyClean = makeSixtyCleanCase(
      { ...findById(batters, "ruth"), power: 9, meet: 5 },
      {
        launchAngle: 40,
        exitVelocity: 0.78,
        carry: 0.82,
        power: 1.08,
        direction: normalize({ x: 0.04, y: -1 }),
        timingPull: 0.04,
        lineEdgeScore: 0.03,
        lineDropScore: 0.08,
        lineLinerScore: 0.08,
        fenceEdgeFlyScore: 0.54,
        quality: 0.64
      },
      { label: hitLabels.fenceEdgeFly, kind: "hit", scoreType: "single", fenceEdgeFly: true, power: 1.12 }
    );
    Math.random = originalRandom;
    activeBatter = { ...findById(batters, "ichiro"), power: 1, meet: 10 };
    Math.random = () => 0.5;
    const lowPowerPerfectDrive = applyFeedbackQualityHitUpgrade({ label: hitLabels.single, kind: "hit", scoreType: "single", power: 0.72 }, {
      launchAngle: 27,
      exitVelocity: 0.9,
      carry: 0.86,
      power: 0.82,
      direction: normalize({ x: 0.04, y: -1 }),
      fenceEdgeFlyScore: 0.42,
      quality: 0.96
    }, {
      timingScore: 0.99,
      sweetSpotScore: 0.98,
      barrelScore: 0.98,
      zoneScore: 1,
      inGoodContactZone: true,
      quality: 0.99
    });
    const lowPowerPerfectBall = buildBattedBall(
      lowPowerPerfectDrive.power,
      lowPowerPerfectDrive.direction,
      lowPowerPerfectDrive.label,
      lowPowerPerfectDrive.battedProfile
    );
    Math.random = originalRandom;
    gameMode = "versus";
    gamePhase = "playing";
    count = { strikes: 0, balls: 0, outs: 0 };
    bases = createEmptyBases();
    battingTeam = "away";
    battingOrderIndex = { away: 0, home: 0 };
    practiceActiveBatter = null;
    practiceActivePitcher = null;
    selected = createSelectedTeams(menuSelection);
    setMatchup();
    resetBall();
    return JSON.stringify({
      practiceAutoPlayerBatting,
      practiceAutoPlayerPitching,
      autoSchedulesPitch,
      autoStartsPitch,
      singleCpuJudgmentSchedulesTwoSeconds,
      practiceAutoJudgmentSchedulesNextPitch,
      selectedPracticeBatter,
      selectedPracticePitcher,
      practiceStaminaBeforePitch,
      practiceStaminaAfterPitch,
      practicePitchCountBeforePitch,
      practicePitchCountAfterPitch,
      practiceStaminaBeforeHomer,
      practiceStaminaAfterHomer,
      versusStaminaBeforeHomer,
      versusStaminaAfterHomer,
      practiceSameBatterAfterReset,
      practiceSamePitcherAfterReset,
      practiceCountReset,
      practiceManualPlayerPitching,
      practiceRodgersVsRodgers,
      practicePitcherHasBattingPractice,
      battingPracticeNotRosterPitcher,
      battingPracticePitcher,
      battingPracticePlanType: battingPracticePlan.type,
      battingPracticePlanTargetX: battingPracticePlan.targetX,
      battingPracticePlanTargetSpread: battingPracticePlan.targetSpread,
      battingPracticePlanHasShape: Boolean(battingPracticePlan.bendSegments?.length || battingPracticePlan.speedChangeSegments?.length),
      battingPracticeTypeBType: battingPracticeTypeBPlan.type,
      battingPracticeTypeBTargetAwayFromCenter: Math.abs(battingPracticeTypeBPlan.targetX - field.plateX),
      battingPracticeTypeBHasShape: Boolean(battingPracticeTypeBPlan.bendSegments?.length || battingPracticeTypeBPlan.speedChangeSegments?.length),
      battingPracticeTypeCType: battingPracticeTypeCPlan.type,
      battingPracticeTypeCHasShape: Boolean(battingPracticeTypeCPlan.bendSegments?.length || battingPracticeTypeCPlan.speedChangeSegments?.length),
      battingPracticeHomerBoostMultiplier,
      battingPracticeHomerProfilePower: battingPracticeHomerProfile.power,
      normalPracticeProfilePower: normalPracticeProfile.power,
      battingPracticeHomerProfileFenceScore: battingPracticeHomerProfile.fenceEdgeFlyScore,
      normalPracticeProfileFenceScore: normalPracticeProfile.fenceEdgeFlyScore,
      battingPracticeHomerResultDeepDrive: Boolean(battingPracticeHomerResult.deepDrive),
      battingPracticeHomerBallFenceOver: battingPracticeHomerBall.fenceOver,
      battingPracticeModerateHomerCandidate: Boolean(battingPracticeModerateHomerResult.battedProfile?.battingPracticeHomerCandidate),
      battingPracticeModerateHomerBallFenceOver: battingPracticeModerateHomerBall.fenceOver,
      leftVsRightMultiplier,
      leftVsLeftMultiplier,
      leftVsRightExitVelocity: leftVsRightProfile.exitVelocity,
      leftVsLeftExitVelocity: leftVsLeftProfile.exitVelocity,
      leftVsRightCarry: leftVsRightProfile.carry,
      leftVsLeftCarry: leftVsLeftProfile.carry,
      rightVsLeftMultiplier,
      rightVsRightMultiplier,
      rightVsLeftExitVelocity: rightVsLeftProfile.exitVelocity,
      rightVsRightExitVelocity: rightVsRightProfile.exitVelocity,
      rightVsLeftCarry: rightVsLeftProfile.carry,
      rightVsRightCarry: rightVsRightProfile.carry,
      feedbackShownOutsidePractice,
      feedbackShownInPractice,
      feedbackIncludesBattedMetrics,
      fiftyFiveUpgradeHit: fiftyFiveUpgrade.kind === "hit",
      sixtyUpgradeHit: sixtyUpgrade.kind === "hit",
      sixtyUpgradeLowFast: sixtyStrongBall.isLiner && !sixtyStrongBall.isGrounder && sixtyStrongBall.maxHeight >= 110 && sixtyStrongBall.maxHeight <= 164 && sixtyStrongBall.exitSpeedKmh >= 145,
      seventyUpgradeHardBounce: seventyUpgrade.kind === "hit" && Boolean(seventyUpgrade.hardOutfieldBounce || seventyUpgrade.lineLiner || seventyUpgrade.gapLiner) && !seventyUpgrade.frontDrop,
      seventyUpgradeSpeed: seventyStrongBall.exitSpeedKmh,
      lowPowerDropUpgrade: Boolean(lowPowerDropUpgrade.hardOutfieldBounce || lowPowerDropUpgrade.lineLiner),
      lowPowerNormalDrop: Boolean(lowPowerNormalDrop.hardOutfieldBounce || lowPowerNormalDrop.lineLiner),
      weakPowerCleanHit: weakPowerCleanResult.kind === "hit" && Boolean(weakPowerCleanResult.hardOutfieldBounce),
      weakPowerCleanLabel: weakPowerCleanResult.label,
      weakPowerCleanCenterLane: Math.abs(weakPowerCleanBall.direction.x) <= 0.42,
      weakPowerCleanOverInfield: weakPowerCleanBall.isLiner && !weakPowerCleanBall.isGrounder && weakPowerCleanBall.maxHeight >= 110 && weakPowerCleanBall.exitSpeedKmh >= 145,
      ichiroModerateScore,
      ichiroModerateDriveSkill,
      ichiroModerateDrive: Boolean(ichiroModerateDrive.hardOutfieldBounce || ichiroModerateDrive.lineLiner),
      ichiroModerateGrounderOverride: Boolean(ichiroModerateGrounderOverride.hardOutfieldBounce || ichiroModerateGrounderOverride.lineLiner),
      strongFeedbackOffZoneScore: getDisplayedBattingFeedbackScore(strongFeedbackOffZoneContact),
      strongFeedbackOffZoneRescued: Boolean(strongFeedbackOffZoneResult.hardOutfieldBounce || strongFeedbackOffZoneResult.lineEdge || strongFeedbackOffZoneResult.lineLiner || strongFeedbackOffZoneResult.battedProfile?.outfieldHitConvertedGrounder),
      strongFeedbackOffZoneNotPenaltyOut: strongFeedbackOffZoneResult.kind === "hit" || Boolean(strongFeedbackOffZoneResult.battedProfile?.outfieldHitConvertedGrounder),
      powerModerateFenceConverted: Boolean(powerModerateFenceResult.hardOutfieldBounce || powerModerateFenceResult.lineEdge || powerModerateFenceResult.lineLiner || powerModerateFenceResult.lineDrop),
      powerModerateFenceStillFly: Boolean(powerModerateFenceResult.fenceEdgeFly),
      directModerateFenceConverted: Boolean(directModerateFenceResult.hardOutfieldBounce || directModerateFenceResult.lineEdge || directModerateFenceResult.lineLiner || directModerateFenceResult.lineDrop),
      directModerateFenceStillFly: Boolean(directModerateFenceResult.fenceEdgeFly),
      genericSixtyBounce: Boolean(genericSixtyBounceResult.hardOutfieldBounce || genericSixtyBounceResult.lineEdge || genericSixtyBounceResult.lineLiner || genericSixtyBounceResult.lineDrop),
      ichiroSharedModerate: Boolean(ichiroSharedModerate.hardOutfieldBounce || ichiroSharedModerate.lineEdge || ichiroSharedModerate.lineDrop || ichiroSharedModerate.lineLiner),
      powerSharedModerate: Boolean(powerSharedModerate.hardOutfieldBounce || powerSharedModerate.lineEdge || powerSharedModerate.lineDrop || powerSharedModerate.lineLiner),
      powerSharedModerateNotFence: !powerSharedModerate.fenceEdgeFly,
      ichiroEarlySharedModerate: Boolean(ichiroEarlySharedModerate.hardOutfieldBounce || ichiroEarlySharedModerate.lineEdge || ichiroEarlySharedModerate.lineDrop || ichiroEarlySharedModerate.lineLiner),
      powerEarlySharedModerate: Boolean(powerEarlySharedModerate.hardOutfieldBounce || powerEarlySharedModerate.lineEdge || powerEarlySharedModerate.lineDrop || powerEarlySharedModerate.lineLiner),
      powerEarlySharedModerateNotFence: !powerEarlySharedModerate.fenceEdgeFly,
      lowPowerSixtyClean: Boolean(lowPowerSixtyClean.result.hardOutfieldBounce) && lowPowerSixtyClean.ball.isHardOutfieldBounce && !lowPowerSixtyClean.ball.isGrounder && lowPowerSixtyClean.ball.maxHeight >= 110 && lowPowerSixtyClean.ball.maxHeight <= 164 && lowPowerSixtyClean.ball.exitSpeedKmh >= 145,
      averageSixtyClean: Boolean(averageSixtyClean.result.hardOutfieldBounce) && averageSixtyClean.ball.isHardOutfieldBounce && !averageSixtyClean.ball.isGrounder && averageSixtyClean.ball.maxHeight >= 110 && averageSixtyClean.ball.maxHeight <= 164 && averageSixtyClean.ball.exitSpeedKmh >= 145,
      powerSixtyClean: Boolean(powerSixtyClean.result.hardOutfieldBounce) && powerSixtyClean.ball.isHardOutfieldBounce && !powerSixtyClean.ball.isGrounder && !powerSixtyClean.result.fenceEdgeFly && powerSixtyClean.ball.maxHeight >= 110 && powerSixtyClean.ball.maxHeight <= 164 && powerSixtyClean.ball.exitSpeedKmh >= 145,
      lowPowerPerfectDeep: lowPowerPerfectDrive.kind === "hit" && !lowPowerPerfectDrive.grounderGap,
      lowPowerPerfectReachesWall: !lowPowerPerfectBall.isGrounder && (lowPowerPerfectBall.wallHit || lowPowerPerfectBall.fenceOver || lowPowerPerfectBall.flightDistanceMeters >= 38),
      lowPowerPerfectMeters: lowPowerPerfectBall.flightDistanceMeters,
      eightyUpgradeStrong: Boolean(eightyUpgrade.fenceLiner || eightyUpgrade.lineEdge || eightyUpgrade.gapLiner),
      ninetyUpgradeDeep: Boolean(ninetyUpgrade.deepDrive),
      superUpgradeLabel: superUpgrade.label,
      specialHardLaneBoosted: Boolean(lineEdgeBoost.lineEdge || lineEdgeBoost.hardOutfieldBounce || lineEdgeBoost.lineLiner)
    });
  })()`
));

assert(battingPracticeModeState.practiceAutoPlayerBatting === true, "practice mode should always let the player bat");
assert(battingPracticeModeState.practiceAutoPlayerPitching === false, "practice auto pitcher should not be player-controlled");
assert(battingPracticeModeState.autoSchedulesPitch === true, "practice auto pitcher should schedule computer pitches");
assert(battingPracticeModeState.autoStartsPitch === true, "practice auto pitcher should start pitching when the timer elapses");
assert(battingPracticeModeState.singleCpuJudgmentSchedulesTwoSeconds === true, "single-player CPU pitchers should start the next motion about two seconds after pitch judgment");
assert(battingPracticeModeState.selectedPracticeBatter === "ruth", "practice mode should use the individually selected batter");
assert(battingPracticeModeState.selectedPracticePitcher === "sawamura", "practice mode should use the individually selected pitcher");
assert(battingPracticeModeState.practiceStaminaAfterPitch === battingPracticeModeState.practiceStaminaBeforePitch, "practice mode pitches should not consume pitcher stamina");
assert(battingPracticeModeState.practicePitchCountAfterPitch === battingPracticeModeState.practicePitchCountBeforePitch + 1, "practice mode pitches should still count as pitches thrown");
assert(battingPracticeModeState.practiceStaminaAfterHomer === battingPracticeModeState.practiceStaminaBeforeHomer, "practice mode homers should not consume pitcher stamina");
assert(battingPracticeModeState.versusStaminaBeforeHomer - battingPracticeModeState.versusStaminaAfterHomer === 7, "versus mode home-run run penalties should consume seven stamina for a solo homer");
assert(battingPracticeModeState.practiceSameBatterAfterReset === true, "practice mode should keep the same batter after each plate appearance");
assert(battingPracticeModeState.practiceSamePitcherAfterReset === true, "practice mode should keep the same pitcher after each plate appearance");
assert(battingPracticeModeState.practiceCountReset === true, "practice mode should reset the count and bases between repeated matchups");
assert(battingPracticeModeState.practiceAutoJudgmentSchedulesNextPitch === true, "auto batting practice should schedule the next CPU pitch after the previous result is judged");
assert(battingPracticeModeState.practiceManualPlayerPitching === true, "practice manual pitcher should be player-controlled");
assert(battingPracticeModeState.practiceRodgersVsRodgers === true, "batting practice should allow Rodgers to bat against pitcher Rodgers");
assert(battingPracticeModeState.practicePitcherHasBattingPractice === true, "batting practice pitcher should appear only in the practice pitcher select");
assert(battingPracticeModeState.battingPracticeNotRosterPitcher === true, "batting practice pitcher should not be added to the regular pitcher roster");
assert(battingPracticeModeState.battingPracticePitcher.id === "battingpractice" && battingPracticeModeState.battingPracticePitcher.throws === "L" && battingPracticeModeState.battingPracticePitcher.fastKmh === 120 && battingPracticeModeState.battingPracticePitcher.control === 18 && battingPracticeModeState.battingPracticePitcher.stuff === -18 && battingPracticeModeState.battingPracticePitcher.fielding === 5 && battingPracticeModeState.battingPracticePitcher.practiceOnly === true, "batting practice pitcher should use the requested simple left-handed practice-only ratings");
assert(["normal", "fast"].includes(battingPracticeModeState.battingPracticePlanType) && Math.abs(battingPracticeModeState.battingPracticePlanTargetX - 640) <= 8 && battingPracticeModeState.battingPracticePlanTargetSpread === 3 && battingPracticeModeState.battingPracticePlanHasShape === false, "batting practice pitcher type A should throw simple center-zone fastballs or straight balls");
assert(["normal", "fast"].includes(battingPracticeModeState.battingPracticeTypeBType) && battingPracticeModeState.battingPracticeTypeBTargetAwayFromCenter >= 32 && battingPracticeModeState.battingPracticeTypeBHasShape === false, "batting practice pitcher type B should attack the edges without breaking balls");
assert(battingPracticeModeState.battingPracticeTypeCHasShape === true, "batting practice pitcher type C should use normal CPU pitch variation with movement");
assert(battingPracticeModeState.battingPracticeHomerBoostMultiplier === 4.2, "batting practice pitcher home-run boost should be set to 4.2x");
assert(battingPracticeModeState.battingPracticeHomerProfilePower > battingPracticeModeState.normalPracticeProfilePower, "batting practice pitcher should create stronger home-run-ready contact than a normal practice pitcher");
assert(battingPracticeModeState.battingPracticeHomerProfileFenceScore > battingPracticeModeState.normalPracticeProfileFenceScore, "batting practice pitcher should raise fence-threatening contact compared with a normal practice pitcher");
assert(battingPracticeModeState.battingPracticeHomerResultDeepDrive === true && battingPracticeModeState.battingPracticeHomerBallFenceOver === true, "good contact against the batting practice pitcher should frequently become a fence-clearing deep drive");
assert(battingPracticeModeState.battingPracticeModerateHomerCandidate === true && battingPracticeModeState.battingPracticeModerateHomerBallFenceOver === true, "moderate good contact against the batting practice pitcher should now become a home-run candidate much more often");
assert(Math.abs(battingPracticeModeState.leftVsRightMultiplier - 1.2) < 0.001 && battingPracticeModeState.leftVsLeftMultiplier === 1, "left batters should get a 1.2x matchup boost against right-handed pitchers only");
assert(battingPracticeModeState.leftVsRightExitVelocity > battingPracticeModeState.leftVsLeftExitVelocity && battingPracticeModeState.leftVsRightCarry > battingPracticeModeState.leftVsLeftCarry, "left-on-right matchup boost should improve batted-ball speed and carry");
assert(Math.abs(battingPracticeModeState.rightVsLeftMultiplier - 1.2) < 0.001 && battingPracticeModeState.rightVsRightMultiplier === 1, "right batters should get a 1.2x matchup boost against left-handed pitchers only");
assert(battingPracticeModeState.rightVsLeftExitVelocity > battingPracticeModeState.rightVsRightExitVelocity && battingPracticeModeState.rightVsLeftCarry > battingPracticeModeState.rightVsRightCarry, "right-on-left matchup boost should improve batted-ball speed and carry");
assert(battingPracticeModeState.feedbackShownOutsidePractice === true, "batting feedback should also show during real games");
assert(battingPracticeModeState.feedbackShownInPractice === true, "batting feedback should show in practice mode");
assert(battingPracticeModeState.feedbackIncludesBattedMetrics === true, "batting practice feedback should include batted-ball speed, angle, and distance");
assert(battingPracticeModeState.fiftyFiveUpgradeHit === true, "mid-50 feedback contact should still create hit-like batted balls");
assert(battingPracticeModeState.sixtyUpgradeHit === true, "sixty-percent feedback contact should become a hit-like ball");
assert(battingPracticeModeState.sixtyUpgradeLowFast === true, "sixty-percent feedback contact should become a fast liner-style hit over the infield");
assert(battingPracticeModeState.seventyUpgradeHardBounce === true, "seventy-percent feedback contact should favor hard bouncing outfield hits");
assert(battingPracticeModeState.lowPowerDropUpgrade === true, "low-power good contact should favor sharp low liners that bounce in the outfield");
assert(battingPracticeModeState.lowPowerNormalDrop === true, "low-power normal-zone contact should clear the infield as hard outfield-bounce liners");
assert(battingPracticeModeState.weakPowerCleanHit === true, "power-2 hitters should get clean outfield hits when contact reaches the 50-60 range");
assert(battingPracticeModeState.weakPowerCleanLabel === "クリーンヒット", "power-2 clean contact should be visibly labeled as a clean hit");
assert(battingPracticeModeState.weakPowerCleanCenterLane === true, "power-2 clean contact should prefer center/gap lanes instead of line-edge hits");
assert(battingPracticeModeState.weakPowerCleanOverInfield === true, "power-2 clean contact should clear the infield as a fast liner instead of becoming a grounder");
assert(battingPracticeModeState.ichiroModerateScore >= 0.45 && battingPracticeModeState.ichiroModerateScore <= 0.55, "Ichiro-style test contact should cover the lowered moderate feedback range");
assert(battingPracticeModeState.ichiroModerateDriveSkill > 0.24, "Ichiro-style high meet should unlock sharp outfield-bounce contact in the lowered moderate range");
assert(battingPracticeModeState.ichiroModerateDrive === true, "Ichiro-style lowered moderate contact should often clear the infield as a hard outfield-bounce liner");
assert(battingPracticeModeState.ichiroModerateGrounderOverride === true, "Ichiro-style lowered moderate contact should override many grounder-hit routes into hard outfield-bounce liners");
assert(battingPracticeModeState.strongFeedbackOffZoneScore >= 0.5, "strong feedback rescue should cover the same contact after the ten-point score reduction");
assert(battingPracticeModeState.strongFeedbackOffZoneRescued === true, "displayed 55-plus contact should be rescued into hard outfield-bounce or line-edge contact");
assert(battingPracticeModeState.strongFeedbackOffZoneNotPenaltyOut === true, "displayed 55-plus contact should not be demoted by the non-yellow penalty");
assert(battingPracticeModeState.powerModerateFenceConverted === true, "power hitters should convert moderate feedback fence-edge flies into hit-like drives");
assert(battingPracticeModeState.powerModerateFenceStillFly === false, "moderate feedback should reduce excessive fence-edge fly results for power hitters");
assert(battingPracticeModeState.directModerateFenceConverted === true, "direct moderate fence-edge calls should also convert into hard outfield-bounce or line contact");
assert(battingPracticeModeState.directModerateFenceStillFly === false, "direct moderate fence-edge calls should not remain fence-edge flies");
assert(battingPracticeModeState.genericSixtyBounce === true, "displayed 60-ish contact should create low outfield-bounce or strong line contact regardless of batter type");
assert(battingPracticeModeState.ichiroSharedModerate === true, "moderate contact should use the shared result mix for average hitters");
assert(battingPracticeModeState.powerSharedModerate === true, "moderate contact should use the shared result mix for power hitters too");
assert(battingPracticeModeState.powerSharedModerateNotFence === true, "power hitters should not default to fence-edge flies on moderate contact");
assert(battingPracticeModeState.ichiroEarlySharedModerate === true, "early moderate-contact routing should work for average hitters before type-specific branches");
assert(battingPracticeModeState.powerEarlySharedModerate === true, "early moderate-contact routing should work for power hitters before type-specific branches");
assert(battingPracticeModeState.powerEarlySharedModerateNotFence === true, "early moderate-contact routing should stop power hitters defaulting to fence-edge flies");
assert(battingPracticeModeState.lowPowerSixtyClean === true, "low-power sixty-ish contact should still create a fast outfield clean hit over the infield");
assert(battingPracticeModeState.averageSixtyClean === true, "average sixty-ish contact should create the shared fast outfield clean hit over the infield");
assert(battingPracticeModeState.powerSixtyClean === true, "power sixty-ish contact should be lowered from excessive flies into a fast outfield clean hit over the infield");
assert(battingPracticeModeState.lowPowerPerfectDeep === true, "even a power-1 batter should reach a deep-drive result on near-perfect contact");
assert(battingPracticeModeState.lowPowerPerfectReachesWall === true, `near-perfect power-1 contact should reach the outfield on the real-field scale (${battingPracticeModeState.lowPowerPerfectMeters}m)`);
assert(battingPracticeModeState.seventyUpgradeSpeed >= 135, "seventy-percent hard contact should show a forceful real-scale exit velocity");
assert(battingPracticeModeState.eightyUpgradeStrong === true, "eighty-percent feedback contact should upgrade to a strong batted ball");
assert(battingPracticeModeState.ninetyUpgradeDeep === true, "ninety-percent feedback contact should create a deep-drive candidate");
assert(battingPracticeModeState.superUpgradeLabel === "超強烈な打球", "eighty-plus elite feedback contact should become a super deep drive");
assert(battingPracticeModeState.specialHardLaneBoosted === true, "hard open-lane contact should create special hard lane drives or outfield-bounce liners");

const stealStateCheck = JSON.parse(runInGame(
  context,
  `(() => {
    const originalEnabled = stealTuning.enabled;
    stealTuning.enabled = true;
    gameMode = "versus";
    battingTeam = "away";
    gamePhase = "playing";
    bases = createEmptyBases();
    stealState = createStealState();
    const runner = { ...findById(batters, "shuto"), run: 7 };
    bases.first = makeBaseRunner(runner);
    isPitching = true;
    pendingPitch = { releaseTime: 1000, typeKey: "normal" };
    ball.crossedPlate = false;
    currentPitchType = "normal";
    const normalStarted = tryStartSteal("second", 1000);
    const normalArrival = stealState.arrivalTime;
    stealState.plateReached = true;
    updateStealState(2350);
    const normalThrowStarted = Boolean(stealState.throw);
    const normalThrowStart = stealState.throw.startTime;
    const normalThrowEnd = stealState.throw.endTime;
    const normalThrowTime = stealState.throw.throwTime;
    const normalSafe = stealState.throw.safe;
    updateStealState(1000 + normalArrival * 1000 + 5);
    const normalSuccess = bases.second?.id === runner.id && !bases.first;

    bases = createEmptyBases();
    bases.first = makeBaseRunner(runner);
    stealState = createStealState();
    isPitching = true;
    pendingPitch = { releaseTime: 11000, typeKey: "normal" };
    ball.crossedPlate = false;
    currentPitchType = "normal";
    tryStartSteal("second", 11000);
    stealState.plateReached = true;
    finishPitch("空振り", "strike", 0, 0);
    updateStealState(12350);
    const swingMissDelay = stealState.swingMissDelaySeconds;
    const swingMissThrowStart = stealState.throw.startTime;

    bases = createEmptyBases();
    bases.first = makeBaseRunner(runner);
    stealState = createStealState();
    isPitching = true;
    pendingPitch = { releaseTime: 2000, typeKey: "slow" };
    ball.crossedPlate = false;
    currentPitchType = "slow";
    tryStartSteal("second", 2000);
    const slowArrival = stealState.arrivalTime;
    stealState.plateReached = true;
    updateStealState(3350);
    const slowSafe = stealState.throw.safe;

    bases = createEmptyBases();
    bases.first = makeBaseRunner(runner);
    stealState = createStealState();
    isPitching = true;
    pendingPitch = { releaseTime: 3000, typeKey: "fast" };
    ball.crossedPlate = false;
    currentPitchType = "fast";
    tryStartSteal("second", 3000);
    const fastArrival = stealState.arrivalTime;
    stealState.plateReached = true;
    updateStealState(4350);
    const fastSafe = stealState.throw.safe;

    bases = createEmptyBases();
    bases.first = makeBaseRunner(runner);
    stealState = createStealState();
    isPitching = true;
    pendingPitch = { releaseTime: 6000, typeKey: "normal" };
    ball.crossedPlate = false;
    currentPitchType = "normal";
    const blockedPitchStealStarted = tryStartSteal("second", 6000);
    isPitching = false;
    pendingPitch = null;
    ball.active = false;
    const beforeBlockedPitchCount = activePitcher.pitchCount ?? 0;
    startPitch("fast");
    const nextPitchBlocked = (activePitcher.pitchCount ?? 0) === beforeBlockedPitchCount && blockedPitchStealStarted && stealState.active;

    bases = createEmptyBases();
    bases.first = makeBaseRunner(runner);
    stealState = createStealState();
    isPitching = true;
    pendingPitch = { releaseTime: 7000, typeKey: "normal" };
    ball.crossedPlate = false;
    currentPitchType = "normal";
    tryStartSteal("second", 6060);
    const quickJumpLead = stealState.jumpLead;
    const quickArrival = stealState.arrivalTime;

    bases = createEmptyBases();
    bases.first = makeBaseRunner(runner);
    stealState = createStealState();
    isPitching = true;
    pendingPitch = { releaseTime: 8000, typeKey: "normal" };
    ball.crossedPlate = false;
    currentPitchType = "normal";
    tryStartSteal("second", 7900);
    const lateJumpLead = stealState.jumpLead;
    const lateArrival = stealState.arrivalTime;

    bases = createEmptyBases();
    bases.first = makeBaseRunner(runner);
    stealState = createStealState();
    isPitching = false;
    pendingPitch = null;
    ball.active = false;
    ball.crossedPlate = false;
    currentPitchType = "normal";
    const earlyRequestAccepted = tryStartSteal("second", 9000);
    startPitch("normal");
    const earlyRequestStarted = stealState.active;
    const earlyRequestPenalty = stealState.jumpLead;
    const earlyRequestArrival = stealState.arrivalTime;

    bases = createEmptyBases();
    bases.second = makeBaseRunner(runner);
    stealState = createStealState();
    isPitching = true;
    pendingPitch = { releaseTime: 4000, typeKey: "normal" };
    ball.crossedPlate = false;
    currentPitchType = "normal";
    const thirdStarted = tryStartSteal("third", 4000);

    bases = createEmptyBases();
    bases.first = makeBaseRunner(runner);
    bases.second = makeBaseRunner(findById(batters, "ichiro"));
    stealState = createStealState();
    isPitching = true;
    pendingPitch = { releaseTime: 5000, typeKey: "normal" };
    ball.crossedPlate = false;
    currentPitchType = "normal";
    const blockedStarted = tryStartSteal("second", 5000);
    stealTuning.enabled = originalEnabled;
    stealState = createStealState();
    isPitching = false;
    pendingPitch = null;
    return JSON.stringify({
      normalStarted,
      normalThrowStarted,
      normalArrival,
      normalThrowStart,
      normalThrowEnd,
      normalThrowTime,
      catcherThrowSpeedScale: stealTuning.catcherThrowSpeedScale,
      swingMissDelay,
      swingMissThrowStart,
      normalSafe,
      normalSuccess,
      slowArrival,
      fastArrival,
      slowSafe,
      fastSafe,
      quickJumpLead,
      lateJumpLead,
      quickArrival,
      lateArrival,
      earlyRequestAccepted,
      earlyRequestStarted,
      earlyRequestPenalty,
      earlyRequestArrival,
      thirdStarted,
      blockedStarted,
      nextPitchBlocked
    });
  })()`
));

assert(stealStateCheck.normalStarted === true, "first-base runners should be able to start a steal with stick+B during the pitch motion");
assert(stealStateCheck.normalThrowStarted === true, "catchers should automatically throw to the steal base after the ball reaches home");
assert(Math.abs(stealStateCheck.catcherThrowSpeedScale - 0.95) < 0.001, "catcher steal throws should use the requested 0.95 speed scale");
assert(Math.abs(stealStateCheck.swingMissDelay - 0.16) < 0.001, "catcher steal throws should add a 0.16-second delay after a swing-and-miss");
assert(Math.abs(stealStateCheck.swingMissThrowStart - stealStateCheck.normalThrowStart - 0.16) < 0.001, "swing-and-miss steal throws should start 0.16 seconds later than a clean catch");
assert(stealStateCheck.normalThrowTime > 0.85, "catcher throws should keep a visible exchange and travel time with the 0.95 arm scale");
assert(stealStateCheck.normalSafe === true && stealStateCheck.normalSuccess === true, "run-seven runners should be viable steal threats against an average fastball timing");
assert(stealStateCheck.slowArrival < stealStateCheck.normalArrival, "slow pitches should give stealers a better jump");
assert(stealStateCheck.fastArrival > stealStateCheck.normalArrival, "fast pitches should make steal attempts harder");
assert(stealStateCheck.slowSafe === true, "slow pitches should be easier to steal on");
assert(typeof stealStateCheck.fastSafe === "boolean", "fast pitch steal outcomes should still resolve cleanly");
assert(stealStateCheck.quickJumpLead > 0, "steals started right after the motion begins should get a better jump");
assert(stealStateCheck.lateJumpLead < 0, "steals started late in the motion should get a worse jump");
assert(stealStateCheck.quickArrival < stealStateCheck.lateArrival, "shorter reaction time after motion start should improve steal arrival time");
assert(stealStateCheck.earlyRequestAccepted === true && stealStateCheck.earlyRequestStarted === true, "pre-motion steal input should become an early-start steal when the pitcher begins moving");
assert(stealStateCheck.earlyRequestPenalty < stealStateCheck.lateJumpLead, "pre-motion steal input should be penalized more than a late but legal jump");
assert(stealStateCheck.earlyRequestArrival > stealStateCheck.lateArrival, "pre-motion steal input should be the worst steal jump");
assert(stealStateCheck.thirdStarted === true, "second-base runners should be able to attempt a steal of third");
assert(stealStateCheck.blockedStarted === false, "runners should not steal into an occupied base");
assert(stealStateCheck.nextPitchBlocked === true, "pitchers should not start the next pitch while a steal attempt is unresolved");

const hudBaseRunnerState = JSON.parse(runInGame(
  context,
  `(() => {
    const drawnText = [];
    const originalFillText = ctx.fillText;
    ctx.fillText = (text, x, y) => {
      drawnText.push(String(text));
      return originalFillText.call(ctx, text, x, y);
    };
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "ichiro"));
    bases.second = makeBaseRunner(findById(batters, "shuto"));
    bases.third = null;
    drawHud();
    ctx.fillText = originalFillText;
    return JSON.stringify({
      firstNameShown: drawnText.some((text) => text.includes("1塁:イチロー")),
      secondNameShown: drawnText.some((text) => text.includes("2塁:シュウト")),
      thirdEmptyShown: drawnText.some((text) => text.includes("3塁:---"))
    });
  })()`
));

assert(hudBaseRunnerState.firstNameShown === true, "batting HUD should show the first-base runner name");
assert(hudBaseRunnerState.secondNameShown === true, "batting HUD should show the second-base runner name");
assert(hudBaseRunnerState.thirdEmptyShown === true, "batting HUD should show empty bases clearly");

const batJudgmentTrimState = JSON.parse(runInGame(
  context,
  `(() => {
    const originalSide = activeBatterSide;
    const originalBatter = { ...batter };
    batter.x = field.plateX;
    batter.y = field.plateY;
    const raw = { x1: field.plateX, y1: field.plateY, x2: field.plateX + 100, y2: field.plateY };
    activeBatterSide = "R";
    const right = trimBatJudgmentSegment(raw);
    activeBatterSide = "L";
    const left = trimBatJudgmentSegment(raw);
    activeBatterSide = "R";
    const innerMishit = getInsideMishitContactMultiplier({ x: field.plateX - field.strikeZoneWidth * 0.5 }, 0);
    const innerChaseMishit = getInsideMishitContactMultiplier({ x: field.plateX - field.strikeZoneWidth * 0.5 }, 0, true);
    const innerSweetSpot = getInsideMishitContactMultiplier({ x: field.plateX - field.strikeZoneWidth * 0.5 }, 0.9);
    const outsideMishit = getInsideMishitContactMultiplier({ x: field.plateX + field.strikeZoneWidth * 0.5 }, 0);
    activeBatterSide = originalSide;
    batter.x = originalBatter.x;
    batter.y = originalBatter.y;
    return JSON.stringify({
      rightStartTrim: right.x1 - raw.x1,
      rightEndTrim: raw.x2 - right.x2,
      leftStartTrim: left.x1 - raw.x1,
      leftEndTrim: raw.x2 - left.x2,
      rightLength: right.x2 - right.x1,
      leftLength: left.x2 - left.x1,
      innerMishit,
      innerChaseMishit,
      innerSweetSpot,
      outsideMishit,
      meet1LengthScale: getMeetBatLengthScale(1),
      meet5LengthScale: getMeetBatLengthScale(5),
      meet10LengthScale: getMeetBatLengthScale(10),
      meet1ContactScale: getMeetBatContactScale(1),
      meet5ContactScale: getMeetBatContactScale(5),
      meet10ContactScale: getMeetBatContactScale(10)
    });
  })()`
));

assert(Math.abs(batJudgmentTrimState.rightStartTrim - 71.5) < 0.001, "right batter inside end should be trimmed another ten percent");
assert(Math.abs(batJudgmentTrimState.rightEndTrim + 5) < 0.001, "right batter outside end should extend five percent past the raw bat");
assert(Math.abs(batJudgmentTrimState.leftStartTrim + 5) < 0.001, "left batter outside end should extend five percent past the raw bat");
assert(Math.abs(batJudgmentTrimState.leftEndTrim - 71.5) < 0.001, "left batter inside end should be trimmed another ten percent");
assert(Math.abs(batJudgmentTrimState.rightLength - 33.5) < 0.001 && Math.abs(batJudgmentTrimState.leftLength - 33.5) < 0.001, "bat judgment segment should be shorter overall while favoring the outside edge");
assert(batJudgmentTrimState.meet1LengthScale < batJudgmentTrimState.meet5LengthScale && batJudgmentTrimState.meet10LengthScale > batJudgmentTrimState.meet5LengthScale, "meet should now change bat reach length");
assert(batJudgmentTrimState.meet1ContactScale < 0.8 && batJudgmentTrimState.meet10ContactScale > 1.25, "meet should strongly change the bat contact width");
assert(batJudgmentTrimState.innerMishit < 0.55, "inside balls far from the sweet spot should lose much of their contact width");
assert(batJudgmentTrimState.innerChaseMishit < batJudgmentTrimState.innerMishit, "inside balls outside the zone should lose even more contact width");
assert(batJudgmentTrimState.innerSweetSpot === 1, "inside sweet-spot contact should keep full contact width");
assert(batJudgmentTrimState.outsideMishit === 1, "outside mishits should not receive the inside-whiff penalty");

const defenseNameLabelState = JSON.parse(runInGame(
  context,
  `(() => {
    const originalDrawDefenseFielder = drawDefenseFielder;
    const calls = [];
    drawDefenseFielder = (x, y, role, name, isChosen) => {
      calls.push({ x, y, role, name, isChosen });
    };
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now(),
      duration: 1000,
      chosenFielder: { role: "C" },
      fielders: [
        { role: "C", name: "イチロー", x: 100, y: 200, currentX: 360, currentY: 420 },
        { role: "P", name: "ショウヘイ", x: 640, y: 250 }
      ]
    };
    drawDefenseFielders();
    drawDefenseFielder = originalDrawDefenseFielder;
    return JSON.stringify(calls);
  })()`
));

assert(defenseNameLabelState[0].name === "イチロー", "fielder name should be passed to the defense character renderer");
assert(defenseNameLabelState[0].x === 360 && defenseNameLabelState[0].y === 420, "fielder name labels should follow the moving fielder position");
assert(defenseNameLabelState[1].name === "ショウヘイ", "pitcher name should be passed to the defense character renderer");

const defenseNameLabelCameraState = JSON.parse(runInGame(
  context,
  `(() => {
    const originalCamera = getDefenseCameraOffset;
    getDefenseCameraOffset = () => ({ x: -900, y: -280 });
    const rect = getDefenseFielderNameLabelRect(1500, 260, "イチロー", true);
    const bounds = getDefenseVisibleWorldBounds();
    getDefenseCameraOffset = originalCamera;
    return JSON.stringify({ rect, bounds });
  })()`
));

assert(defenseNameLabelCameraState.rect.x > 1400, "fielder name labels should use camera-adjusted world coordinates");
assert(defenseNameLabelCameraState.rect.x >= defenseNameLabelCameraState.bounds.left, "fielder name labels should stay inside the visible camera bounds");
assert(defenseNameLabelCameraState.rect.x + defenseNameLabelCameraState.rect.width <= defenseNameLabelCameraState.bounds.right, "fielder name labels should not be clamped to the pre-camera canvas edge");

const alignedDefenseState = JSON.parse(runInGame(
  context,
  `(() => {
    const fielder = { x: 0, y: 0, speed: 5, fielding: 5 };
    const target = { x: 900, y: 0 };
    const battedBall = {
      target: { x: 100, y: 0 },
      ballTime: 0.2,
      isGrounder: true,
      isSoftDrop: false
    };
    const outcome = alignFieldingTimeWithBallArrival(
      battedBall,
      { kind: "force", caught: true, needsThrow: true, fieldingTime: 0.2 },
      target,
      fielder
    );
    return JSON.stringify({
      fieldingTime: outcome.fieldingTime,
      fielderArrivalTime: getDefenseFielderArrivalTime(fielder, target)
    });
  })()`
));

assert(
  alignedDefenseState.fieldingTime >= alignedDefenseState.fielderArrivalTime,
  "throw timing should wait until the fielder reaches the fielding target"
);

const defenseTuningState = JSON.parse(runInGame(
  context,
  `(() => {
    const fielder = { role: "C", x: 100, y: 100, speed: 5, fielding: 5 };
    const target = { x: 700, y: 100 };
    const reaction5 = getFielderReactionDelay({ fielding: 5 });
    const runBeforeDelay = Math.max(0, reaction5 * 0.5 - reaction5);
    return JSON.stringify({
      fenceDistance: defenseField.fenceDistance,
      fenceHeight: defenseField.fenceHeight,
      grassRadius: defenseField.grassRadius,
      hardBattedBallSpeedScale,
      fielderMoveSpeedScale: defenseFielderMoveSpeedScale,
      fielderSpeed: getFielderSpeed({ speed: 5 }),
      fielderSpeed1: getFielderSpeed({ speed: 1 }),
      fielderSpeed10: getFielderSpeed({ speed: 10 }),
      oldFielderSpeed36: (abilitySpeedBaseRating + getBaseCompressedMovementRating(3.6)) * fielderSpeedUnit * defenseFielderMoveSpeedScale,
      oldFielderSpeed10: (abilitySpeedBaseRating + getBaseCompressedMovementRating(10)) * fielderSpeedUnit * defenseFielderMoveSpeedScale,
      reaction1: getFielderReactionDelay({ fielding: 1 }),
      reaction5,
      reaction10: getFielderReactionDelay({ fielding: 10 }),
      arrival5: getDefenseFielderArrivalTime(fielder, target),
      travelOnly5: Math.hypot(target.x - fielder.x, target.y - fielder.y) / getFielderSpeed(fielder),
      runBeforeDelay,
      grounderTravelHalf: (() => {
        defenseState = { ...createDefenseState(), battedBall: { trajectory: "grounder" } };
        return getBattedBallTravelProgress(0.5);
      })(),
      hardGrounderRollHalf: (() => {
        const hardGrounder = { trajectory: "grounder", isGrounder: true, power: 0.82 };
        return getRollingEaseProgress(0.5, hardGrounder);
      })()
    });
  })()`
));

assert(Math.abs(defenseTuningState.fenceDistance - 2097.6) < 0.001, "fence distance should be 15% longer than the compact field");
assert(Math.abs(defenseTuningState.fenceHeight - 138) < 0.001, "fence height should be 15% taller");
assert(Math.abs(defenseTuningState.grassRadius - 2014.8) < 0.001, "outfield grass should match the wider field scale");
assert(defenseTuningState.hardBattedBallSpeedScale === 0.8, "hard-hit batted balls should be about twenty percent slower");
assert(defenseTuningState.fielderMoveSpeedScale === 0.880308, "defensive fielder movement should be another ten percent faster");
assert(Math.abs(defenseTuningState.fielderSpeed1 - defenseTuningState.oldFielderSpeed36 * 1.2) < 0.001, "fielding speed 1 should be twenty percent faster than the previous low-end baseline");
assert(Math.abs(defenseTuningState.fielderSpeed10 - defenseTuningState.oldFielderSpeed10) < 0.001, "fielding speed 10 should keep the previous top speed");
assert(defenseTuningState.fielderSpeed > defenseTuningState.fielderSpeed1 && defenseTuningState.fielderSpeed < defenseTuningState.fielderSpeed10, "fielding movement should be redistributed across ten steps");
assert(defenseTuningState.reaction5 > 0.2, "average fielders should hesitate briefly before moving");
assert(defenseTuningState.reaction10 < defenseTuningState.reaction5, "elite fielders should react sooner than average fielders");
assert(defenseTuningState.reaction1 > defenseTuningState.reaction5, "weak fielders should react later than average fielders");
assert(defenseTuningState.arrival5 > defenseTuningState.travelOnly5, "fielder arrival time should include reaction delay");
assert(defenseTuningState.runBeforeDelay === 0, "fielders should not begin moving before their reaction delay");
assert(Math.abs(defenseTuningState.grounderTravelHalf - 0.5) < 0.001, "grounders should travel smoothly into the first bounce point");
assert(defenseTuningState.hardGrounderRollHalf < 0.75, "hard grounder rolling should avoid an abrupt early jump after the bounce point");

const fenceState = JSON.parse(runInGame(
  context,
  `(() => {
    const outside = { x: field.plateX, y: defenseField.bases.home.y - defenseField.fenceDistance - 260 };
    const clamped = clampPointInsideFence(outside, 36);
    const wallBall = buildBattedBall(1.2, normalize({ x: 0, y: -1 }), "wall");
    wallBall.wallHit = true;
    wallBall.fenceOver = false;
    wallBall.target = getFenceIntersectionFromPoint(wallBall.origin, wallBall.direction).point;
    wallBall.wallReboundTarget = clampPointInsideFence({
      x: wallBall.target.x - wallBall.direction.x * getWallReboundDistance(wallBall.power),
      y: wallBall.target.y - wallBall.direction.y * getWallReboundDistance(wallBall.power)
    }, 42);
    defenseState = {
      ...createDefenseState(),
      battedBall: wallBall,
      outcome: { kind: "double", label: "wall", scoreType: "double", caught: false },
      origin: wallBall.origin,
      landingTarget: wallBall.target,
      target: wallBall.wallReboundTarget,
      duration: 2500
    };
    const afterWall = getDefenseBallPoint(0.7, 0.7, wallBall.ballTime + 0.4);
    const reboundTravelDistance = Math.hypot(wallBall.wallReboundTarget.x - wallBall.target.x, wallBall.wallReboundTarget.y - wallBall.target.y);
    const wallRollDuration = getDefenseRollDuration(wallBall, wallBall.target, wallBall.wallReboundTarget);

    const roller = {
      target: { x: field.plateX, y: defenseField.bases.home.y - defenseField.fenceDistance + 80 },
      direction: normalize({ x: 0, y: -1 }),
      flightDistance: defenseField.fenceDistance - 80,
      landingDistance: defenseField.fenceDistance - 80,
      ballTime: 0.5,
      isGrounder: false,
      isLiner: true,
      power: 1.2,
      trajectory: "liner",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const target = getDefenseFieldingTarget(roller, { kind: "single", scoreType: "single", caught: false });
    const runner = createBatterRunner(findById(batters, "suzuki"));
    const fielder = { role: "C", x: field.plateX, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.75, speed: 5, fielding: 5, arm: 5 };
    const outcome = { kind: "single", scoreType: "single", caught: false, fieldingTime: 0.5 };
    setBatterRunnerDestination(runner, getBatterRunnerTargetBase(outcome, roller, target, fielder, runner));
    const throwPlay = createThrowPlayForFieldedHit(fielder, roller, outcome, target, runner);
    const boundary = resolveFenceBoundaryOutcome(roller, outcome, target);

    return JSON.stringify({
      clampedDistance: getFenceDistance(clamped),
      wallDistance: getFenceDistance(wallBall.target),
      reboundDistance: getFenceDistance(afterWall),
      reboundTravelDistance,
      wallRollDuration,
      rollerGroundRuleDouble: roller.groundRuleDouble,
      rollerNeedsThrow: throwPlay.needsThrow,
      boundaryKind: boundary?.outcome.kind,
      boundaryLabel: boundary?.outcome.label
    });
  })()`
));

assert(fenceState.clampedDistance <= defenseTuningState.fenceDistance - 35, "fielders should stay inside the fence");
assert(Math.abs(fenceState.wallDistance - defenseTuningState.fenceDistance) < 1, "wall hits should impact the fence");
assert(fenceState.reboundDistance < fenceState.wallDistance, "wall hits should bounce back into the field");
assert(fenceState.reboundTravelDistance <= 235, "wall hits should rebound only a short distance");
assert(fenceState.wallRollDuration >= 1.8, "wall-hit rebounds should roll slowly after impact");
assert(fenceState.rollerGroundRuleDouble === false, "balls rolling to the fence should remain in play");
assert(fenceState.rollerNeedsThrow === true, "balls rolling to the fence should be fielded and thrown");
assert(fenceState.boundaryKind === undefined, "balls rolling to the fence should not become ground-rule doubles");

const homeRunDistanceVarietyState = JSON.parse(runInGame(
  context,
  `(() => {
    const fence = defenseField.fenceDistance;
    function homerMeters(extraDistance, traits) {
      return getBattedBallDistanceMeters(getPossibleHomeRunFlightDistance(fence + extraDistance, fence, {
        isDeepDrive: true,
        ...traits
      }));
    }
    return JSON.stringify({
      nearWall: homerMeters(260, { contactScore: 0.58, profileExitVelocity: 0.98, profileCarry: 0.96, power: 1.42 }),
      solid: homerMeters(520, { contactScore: 0.72, profileExitVelocity: 1.1, profileCarry: 1.08, power: 1.65 }),
      strong: homerMeters(620, { contactScore: 0.72, profileExitVelocity: 1.14, profileCarry: 1.1, power: 1.78 }),
      veryStrong: homerMeters(700, { contactScore: 0.78, profileExitVelocity: 1.18, profileCarry: 1.16, power: 1.8 }),
      elite: homerMeters(900, { contactScore: 0.92, profileExitVelocity: 1.42, profileCarry: 1.36, power: 2.15 }),
      perfect: homerMeters(1400, { contactScore: 0.98, profileExitVelocity: 1.7, profileCarry: 1.75, power: 2.7 })
    });
  })()`
));

assert(homeRunDistanceVarietyState.nearWall >= 118 && homeRunDistanceVarietyState.nearWall <= 129, "near-wall homers should still exist around the 118m center-field fence");
assert(homeRunDistanceVarietyState.solid >= 131 && homeRunDistanceVarietyState.solid <= 141, "solid homers should reach beyond the 118m center-field fence");
assert(homeRunDistanceVarietyState.strong >= 142 && homeRunDistanceVarietyState.strong <= 152, "strong homers should reach the 140m range");
assert(homeRunDistanceVarietyState.veryStrong >= 153 && homeRunDistanceVarietyState.veryStrong <= 164, "very strong homers should reach beyond 150m");
assert(homeRunDistanceVarietyState.elite > homeRunDistanceVarietyState.veryStrong, "elite homers should carry beyond ordinary strong homers");
assert(homeRunDistanceVarietyState.perfect >= 207 && homeRunDistanceVarietyState.perfect <= 240, "only near-perfect contact should reach roughly 220m");

const homeRunFireworksState = JSON.parse(runInGame(
  context,
  `(() => {
    bases = createEmptyBases();
    const homerBall = buildBattedBall(2.2, normalize({ x: 0.04, y: -1 }), hitLabels.toweringFly);
    homerBall.fenceOver = true;
    homerBall.ballTime = 0.9;
    homerBall.target = {
      x: field.plateX,
      y: defenseField.bases.home.y - defenseField.fenceDistance - 520
    };
    const fireworks = createHomeRunFireworks(homerBall);
    bases.first = makeBaseRunner(findById(batters, "ichiro"));
    bases.second = makeBaseRunner(findById(batters, "shuto"));
    bases.third = makeBaseRunner(findById(batters, "suzuki"));
    const grandSlamFireworks = createHomeRunFireworks(homerBall);
    bases = createEmptyBases();
    const watchTarget = getDefenseFieldingTarget(homerBall, { kind: "homer", scoreType: "homer", caught: false });
    const duration = getDefenseDuration(homerBall, { kind: "homer", scoreType: "homer", caught: false }, null, null);
    const ordinaryBall = { ...homerBall, fenceOver: false };
    let fireworkSoundCount = 0;
    sounds.firework.play = () => {
      fireworkSoundCount += 1;
      return Promise.resolve();
    };
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now() - 1400,
      duration,
      battedBall: homerBall,
      homeRunFireworks: fireworks,
      fielders: [{ role: "C", x: field.plateX, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.8, currentX: field.plateX, currentY: defenseField.bases.home.y - defenseField.fenceDistance * 0.8 }],
      chosenFielder: { role: "C" },
      target: watchTarget,
      landingTarget: homerBall.target,
      origin: homerBall.origin,
      outcome: { kind: "homer", scoreType: "homer", caught: false }
    };
    const earlyChaseTarget = getDefenseFielderChaseTarget(0.3);
    const lateChaseTarget = getDefenseFielderChaseTarget(1.4);
    defenseState.startTime = performance.now() - 500;
    updateDefensePlay(performance.now());
    const fireworkSoundBeforeStart = fireworkSoundCount;
    const currentFielder = defenseState.fielders[0];
    defenseState.homeRunFireworksSoundPlayed = false;
    defenseState.startTime = performance.now() - 1000;
    updateDefensePlay(performance.now());
    const fireworkSoundAfterStart = fireworkSoundCount;
    updateDefensePlay(performance.now());
    const fireworkSoundAfterRepeat = fireworkSoundCount;
    setSoundEffectsEnabled(false);
    defenseState.homeRunFireworksSoundPlayed = false;
    defenseState.startTime = performance.now() - 1000;
    updateDefensePlay(performance.now());
    const fireworkSoundAfterMuted = fireworkSoundCount;
    setSoundEffectsEnabled(true);
    ball.x = homerBall.target.x;
    ball.y = homerBall.target.y;
    const camera = getDefenseCameraOffset();
    const standFocus = getHomeRunStandFocusPoint();
    const visibleBounds = getDefenseVisibleWorldBounds();
    defenseState.runner = {
      arrived: false,
      targetBase: "home",
      x: defenseField.bases.third.x,
      y: defenseField.bases.third.y
    };
    const resolvesBeforeFireworksEnd = shouldResolveDefensePlayNow(fireworks.startDelay + fireworks.duration - 0.05);
    const resolvesAfterFireworksEnd = shouldResolveDefensePlayNow(fireworks.startDelay + fireworks.duration + 0.05);
    return JSON.stringify({
      hasFireworks: Boolean(fireworks),
      burstCount: fireworks?.bursts.length,
      grandSlamBurstCount: grandSlamFireworks?.bursts.length,
      grandSlamSparkMin: Math.min(...(grandSlamFireworks?.bursts.map((burst) => burst.sparks.length) || [0])),
      grandSlamDuration: grandSlamFireworks?.duration,
      sparkCounts: fireworks?.bursts.map((burst) => burst.sparks.length),
      startDelay: fireworks?.startDelay,
      duration: fireworks?.duration,
      defenseDuration: duration,
      watchTargetDistance: getFenceDistance(watchTarget),
      earlyChaseDistance: getFenceDistance(earlyChaseTarget),
      lateChaseDistance: getFenceDistance(lateChaseTarget),
      currentFielderDistance: getFenceDistance({ x: currentFielder.currentX, y: currentFielder.currentY }),
      fenceDistance: defenseField.fenceDistance,
      ordinaryFireworks: createHomeRunFireworks(ordinaryBall),
      fireworkSoundBeforeStart,
      fireworkSoundAfterStart,
      fireworkSoundAfterRepeat,
      fireworkSoundAfterMuted,
      fireworkSrc: sounds.firework.src,
      camera,
      standFocus,
      visibleBounds,
      resolvesBeforeFireworksEnd,
      resolvesAfterFireworksEnd,
      fenceTopY: defenseField.bases.home.y - defenseField.fenceDistance
    });
  })()`
));

assert(homeRunFireworksState.hasFireworks === true, "home runs should create fireworks");
assert(homeRunFireworksState.burstCount >= 10, "home run fireworks should launch many visible bursts");
assert(homeRunFireworksState.grandSlamBurstCount > homeRunFireworksState.burstCount * 2, "grand slams should create much more fireworks than solo shots");
assert(homeRunFireworksState.grandSlamSparkMin >= 36, "grand slam fireworks should use denser bursts");
assert(homeRunFireworksState.grandSlamDuration > homeRunFireworksState.duration, "grand slam fireworks should last longer");
assert(homeRunFireworksState.sparkCounts.every((count) => count >= 22), "each fireworks burst should have many sparks");
assert(Math.abs(homeRunFireworksState.startDelay - 0.9) < 0.001, "fireworks should start when the ball reaches the stands");
assert(homeRunFireworksState.duration === 3, "home run fireworks should last about three seconds");
assert(homeRunFireworksState.defenseDuration >= 3900, "home run defense view should stay long enough to show three-second fireworks");
assert(homeRunFireworksState.fireworkSrc.includes(".mp3"), "home run fireworks should use the launch-fireworks audio file");
assert(homeRunFireworksState.fireworkSoundBeforeStart === 0, "firework sound should wait until the visual fireworks start");
assert(homeRunFireworksState.fireworkSoundAfterStart === 1, "firework sound should play once when home run fireworks start");
assert(homeRunFireworksState.fireworkSoundAfterRepeat === 1, "firework sound should not repeat every frame");
assert(homeRunFireworksState.fireworkSoundAfterMuted === 1, "firework sound should respect the sound effects mute");
assert(homeRunFireworksState.watchTargetDistance <= homeRunFireworksState.fenceDistance - 80, "fielders should stop inside the fence on home runs");
assert(homeRunFireworksState.earlyChaseDistance <= homeRunFireworksState.fenceDistance - 80, "fielders should not chase center-field homers into the stands before the ball lands");
assert(homeRunFireworksState.lateChaseDistance <= homeRunFireworksState.fenceDistance - 80, "fielders should not chase center-field homers into the stands after the ball lands");
assert(homeRunFireworksState.currentFielderDistance <= homeRunFireworksState.fenceDistance - 35, "fielder current positions should stay inside the fence");
assert(homeRunFireworksState.ordinaryFireworks === null, "non-home-run balls should not create fireworks");
assert(homeRunFireworksState.camera.y > 0, "home run camera should tilt upward toward the stands");
assert(homeRunFireworksState.standFocus.y < homeRunFireworksState.fenceTopY, "home run stand focus should be behind the outfield wall");
assert(homeRunFireworksState.visibleBounds.top <= homeRunFireworksState.standFocus.y, "home run camera should keep the stands visible");
assert(homeRunFireworksState.visibleBounds.bottom >= homeRunFireworksState.standFocus.y, "home run camera should frame the stand focus point");
assert(homeRunFireworksState.resolvesBeforeFireworksEnd === false, "home runs should wait until fireworks finish");
assert(homeRunFireworksState.resolvesAfterFireworksEnd === true, "home runs should advance after fireworks even before the batter finishes circling the bases");

const runnerSpeedState = JSON.parse(runInGame(
  context,
  `(() => {
    const slowRunner = createBatterRunner({ id: "slow", name: "SLOW", run: 1 });
    const normalRunner = createBatterRunner({ id: "normal", name: "NORMAL", run: 5 });
    const fastRunner = createBatterRunner({ id: "fast", name: "FAST", run: 10 });
    const oldRating3Speed = (runnerSpeedBaseRun + getBaseCompressedMovementRating(3)) * runnerSpeedUnit;
    const oldRating10Speed = (runnerSpeedBaseRun + getBaseCompressedMovementRating(10)) * runnerSpeedUnit;
    return JSON.stringify({
      slow: slowRunner.speed,
      normal: normalRunner.speed,
      fast: fastRunner.speed,
      baseRunnerSpeed: getDefenseBaseRunnerSpeed({ run: 5 }),
      runnerSpeedScale,
      oldRating3Speed,
      oldRating10Speed,
      effectiveRun1: getEffectiveRunRating(1),
      effectiveRun5: getEffectiveRunRating(5),
      effectiveRun10: getEffectiveRunRating(10)
    });
  })()`
));

assert(Math.abs(runnerSpeedState.runnerSpeedScale - 0.85) < 0.001, "all runners should use the requested fifteen-percent speed reduction");
assert(Math.abs(runnerSpeedState.slow - runnerSpeedState.oldRating3Speed * 0.85 * 1.2) < 0.001, "run 1 should be twenty percent faster than the previous low-end baseline");
assert(runnerSpeedState.normal > runnerSpeedState.slow && runnerSpeedState.normal < runnerSpeedState.fast, "runner speed should be redistributed across ten steps");
assert(Math.abs(runnerSpeedState.baseRunnerSpeed - runnerSpeedState.normal) < 0.001, "base runners and batter-runners should use the same speed");
assert(Math.abs(runnerSpeedState.fast - runnerSpeedState.oldRating10Speed * 0.85) < 0.001, "run 10 should keep the previous top speed");
assert(Math.abs(runnerSpeedState.effectiveRun1 - 3.76) < 0.001, "effective run rating 1 should be boosted while preserving the top end");
assert(runnerSpeedState.effectiveRun5 > runnerSpeedState.effectiveRun1 && runnerSpeedState.effectiveRun5 < runnerSpeedState.effectiveRun10, "effective run ratings should be spread between the new low and unchanged high");
assert(Math.abs(runnerSpeedState.effectiveRun10 - 7.975) < 0.001, "effective run rating should compress the high end");

const pitchSpeedChangeState = JSON.parse(runInGame(
  context,
  "JSON.stringify({ actualSpeedBoost: actualPitchSpeedBoost, actualSpeedReductionScale: actualPitchSpeedReductionScale, bendEffect: pitchBendEffect, effect: pitchSpeedChangeEffect, amount: maxPitchSpeedChangeAmount })"
));

assert(Math.abs(pitchSpeedChangeState.actualSpeedReductionScale - 0.8) < 0.000001, "actual pitch speed reduction scale should stay at eighty percent");
assert(Math.abs(pitchSpeedChangeState.actualSpeedBoost - (1.265 * 1.15 * 1.15 * 1.1 * 1.3 * 1.2 * pitchSpeedChangeState.actualSpeedReductionScale)) < 0.000001, "actual pitch speed should be reduced without changing displayed speed");
assert(Math.abs(pitchSpeedChangeState.bendEffect - 1.15) < 0.000001, "pitch bend effect should be boosted by fifteen percent");
assert(Math.abs(pitchSpeedChangeState.effect - (1.05 * 1.15)) < 0.000001, "pitch speed-change effect should be boosted another fifteen percent");
assert(Math.abs(pitchSpeedChangeState.amount - ((0.0018 + 10 * 0.00072) * 9 * 1.05 * 1.15)) < 0.000001, "pitch speed-change amount should use the boosted effect");

const pitchControlState = JSON.parse(runInGame(
  context,
  `(() => {
    const low = getPitchControlProfile(1);
    const high = getPitchControlProfile(10);
    const lowEdgeFastball = getPitchControlProfile(1, 0, { pitchType: "fast", courseDirection: 1 });
    const highEdgeFastball = getPitchControlProfile(10, 0, { pitchType: "fast", courseDirection: 1 });
    const rightEdgeNormalX = getPitchCourseTargetX({ direction: 1, offset: 48 }, getPitchRadius("normal"), "normal");
    const leftEdgeFastX = getPitchCourseTargetX({ direction: -1, offset: -48 }, getPitchRadius("fast"), "fast");
    const rightEdgeSpecialX = getPitchCourseTargetX({ direction: 1, offset: 48 }, getPitchRadius("special"), "special");
    const slowLegacyX = getPitchCourseTargetX({ direction: 1, offset: 48 }, getPitchRadius("slow"), "slow");
    const normalEdgeSpread = getPitchCourseBaseSpread({ direction: 1, offset: 48 }, "normal", pitchTypes.normal);
    const fastEdgeSpread = getPitchCourseBaseSpread({ direction: -1, offset: -48 }, "fast", pitchTypes.fast);
    const specialEdgeSpread = getPitchCourseBaseSpread({ direction: 1, offset: 48 }, "special", pitchTypes.special);
    const intended = { x: field.plateX + 96, y: field.plateY - 36 };
    const edgeIntended = { x: field.plateX + 58, y: field.plateY };
    const originalRandom = Math.random;
    Math.random = () => 0;
    const lowMistake = getPitchControlMiss(low, intended.x, intended.y);
    Math.random = () => 0.4;
    const lowWild = getPitchControlMiss(low, intended.x, intended.y);
    Math.random = () => 0;
    const highMistake = getPitchControlMiss(high, intended.x, intended.y);
    Math.random = () => 0.45;
    const lowEdgeWild = getPitchControlMiss(lowEdgeFastball, edgeIntended.x, edgeIntended.y);
    Math.random = () => 0.1;
    const highEdgeNoMiss = getPitchControlMiss(highEdgeFastball, edgeIntended.x, edgeIntended.y);
    Math.random = originalRandom;
    return JSON.stringify({
      low,
      high,
      lowEdgeFastball,
      highEdgeFastball,
      rightEdgeNormalDistance: distanceToHomePlate(rightEdgeNormalX, field.plateY, getPitchRadius("normal")),
      leftEdgeFastDistance: distanceToHomePlate(leftEdgeFastX, field.plateY, getPitchRadius("fast")),
      rightEdgeSpecialDistance: distanceToHomePlate(rightEdgeSpecialX, field.plateY, getPitchRadius("special")),
      slowLegacyOffset: slowLegacyX - field.plateX,
      normalEdgeSpread,
      fastEdgeSpread,
      specialEdgeSpread,
      lowMistakeType: lowMistake.type,
      lowWildType: lowWild.type,
      lowEdgeWildType: lowEdgeWild.type,
      lowEdgeWildX: lowEdgeWild.x,
      highEdgeNoMissType: highEdgeNoMiss.type,
      highEdgeNoMissX: highEdgeNoMiss.x,
      edgeIntendedX: edgeIntended.x,
      lowMistakeDistanceFromCenter: Math.hypot(lowMistake.x - field.plateX, lowMistake.y - field.plateY),
      highMistakeDistanceFromCenter: Math.hypot(highMistake.x - field.plateX, highMistake.y - field.plateY),
      intendedDistanceFromCenter: Math.hypot(intended.x - field.plateX, intended.y - field.plateY)
    });
  })()`
));

assert(pitchControlState.low.spread > pitchControlState.high.spread * 4, "low-control pitchers should have much larger horizontal command spread");
assert(pitchControlState.low.verticalSpread > pitchControlState.high.verticalSpread * 3, "low-control pitchers should have much larger vertical command spread");
assert(pitchControlState.rightEdgeNormalDistance < 0.6, "commanded normal pitches should target a ball that grazes the plate edge");
assert(pitchControlState.leftEdgeFastDistance < 0.6, "commanded fastballs should target a ball that grazes the plate edge");
assert(pitchControlState.rightEdgeSpecialDistance < 0.6, "commanded special pitches should target a ball that grazes the plate edge");
assert(pitchControlState.slowLegacyOffset === 48, "commanded slow pitches should keep their previous offset target");
assert(pitchControlState.normalEdgeSpread === 2 && pitchControlState.fastEdgeSpread === 2 && pitchControlState.specialEdgeSpread === 2, "high-control edge command pitch types should use a tight edge spread");
assert(Math.abs(pitchControlState.low.mistakeChance - 0.275) < 0.000001, "low-control major misses should leak to the middle half the time");
assert(Math.abs(pitchControlState.low.wildMissChance - 0.275) < 0.000001, "low-control major misses should go clearly outside the zone half the time");
assert(pitchControlState.high.mistakeChance === 0, "high-control pitchers should not have forced middle mistakes");
assert(pitchControlState.lowMistakeType === "mistake", "low-control middle leaks should be tagged as controllable mistakes");
assert(pitchControlState.lowWildType === "wild", "low-control wild misses should be tagged as controllable wild pitches");
assert(pitchControlState.lowMistakeDistanceFromCenter < pitchControlState.intendedDistanceFromCenter * 0.3, "low-control mistakes should drift strongly toward the middle");
assert(pitchControlState.highMistakeDistanceFromCenter === pitchControlState.intendedDistanceFromCenter, "high-control pitches should keep the intended target when no miss is applied");
assert(pitchControlState.highEdgeFastball.spread < 0.5, "high-control pitchers should spot edge fastballs tightly");
assert(pitchControlState.lowEdgeFastball.spread > pitchControlState.highEdgeFastball.spread * 8, "low-control pitchers should struggle much more with edge fastballs");
assert(pitchControlState.lowEdgeWildType === "wild", "low-control edge fastballs should be able to miss off the intended side");
assert(pitchControlState.lowEdgeWildX > pitchControlState.edgeIntendedX + 45, "low-control outside fastballs should miss farther outside");
assert(pitchControlState.highEdgeNoMissType === "none" && pitchControlState.highEdgeNoMissX === pitchControlState.edgeIntendedX, "high-control edge fastballs should stay on the intended corner when not forced to miss");

const baseRunnerAnimationState = JSON.parse(runInGame(
  context,
  `(() => {
    bases = createEmptyBases();
    bases.second = makeBaseRunner(findById(batters, "shuto"));
    const battedBall = {
      target: { x: field.plateX, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.74 },
      direction: normalize({ x: 0, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.74,
      landingDistance: defenseField.fenceDistance * 0.74,
      ballTime: 3.2,
      isGrounder: false,
      isLiner: true,
      isDeep: true,
      power: 0.95,
      trajectory: "liner",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const outcome = { kind: "single", scoreType: "single", caught: false, fieldingTime: 3.2 };
    const animations = createDefenseBaseRunnerAnimations(outcome, battedBall, null);
    defenseState = { ...createDefenseState(), active: true, startTime: performance.now(), baseRunners: animations };
    updateDefenseBaseRunners(20);
    const runner = defenseState.baseRunners[0];
    return JSON.stringify({
      count: animations.length,
      startBase: runner.startBase,
      targetBase: runner.targetBase,
      scored: runner.scored,
      arrived: runner.arrived,
      x: runner.x,
      y: runner.y,
      thirdX: defenseField.bases.third.x,
      thirdY: defenseField.bases.third.y
    });
  })()`
));

assert(baseRunnerAnimationState.count === 1, "defense should animate existing base runners");
assert(baseRunnerAnimationState.startBase === "second", "second-base runner animation should preserve the starting base");
assert(baseRunnerAnimationState.targetBase === "third", "auto runners should stop at the next base on non-homer hits");
assert(baseRunnerAnimationState.scored === false, "auto runners should not be marked as scored on non-homer singles from second");
assert(baseRunnerAnimationState.arrived === true, "base runner animation should arrive at its destination");
assert(Math.abs(baseRunnerAnimationState.x - baseRunnerAnimationState.thirdX) < 0.001, "auto runner should finish at third base");
assert(Math.abs(baseRunnerAnimationState.y - baseRunnerAnimationState.thirdY) < 0.001, "auto runner should finish at third base");

const toweringFlyAndTagUpState = JSON.parse(runInGame(
  context,
  `(() => {
    const towering = buildBattedBall(1.18, normalize({ x: 0.08, y: -1 }), hitLabels.toweringFly);
    const thirdRunner = makeBaseRunner(findById(batters, "shuto"));
    const deepTarget = { x: field.plateX + 80, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.72 };
    const shallowTarget = { x: field.plateX + 80, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.28 };
    const flyBall = {
      target: deepTarget,
      direction: normalize({ x: 0.08, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.72,
      landingDistance: defenseField.fenceDistance * 0.72,
      ballTime: 2.7,
      isGrounder: false,
      isLiner: false,
      isPopupFly: false,
      isToweringFly: true,
      isDeep: true,
      power: 1.05,
      trajectory: "fly",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const outcome = { kind: "out", label: hitLabels.toweringFly, caught: true, needsThrow: false, fieldingTime: 2.7 };
    const deepFielder = { role: "C", x: deepTarget.x, y: deepTarget.y, speed: 5, fielding: 5, arm: 5 };
    const shallowFielder = { ...deepFielder, x: shallowTarget.x, y: shallowTarget.y, arm: 10 };
    gameMode = "versus";
    battingTeam = "away";
    defenseControlMode = { away: "auto", home: "auto" };
    count.outs = 0;
    bases = createEmptyBases();
    bases.third = thirdRunner;
    const deepAnimations = createDefenseBaseRunnerAnimations(outcome, flyBall, null, deepFielder, deepTarget);
    const shallowAnimations = createDefenseBaseRunnerAnimations(outcome, { ...flyBall, target: shallowTarget, landingDistance: defenseField.fenceDistance * 0.28, isDeep: false }, null, shallowFielder, shallowTarget);
    const tagThrow = createTagUpVisualThrowState(deepFielder, deepTarget, outcome, flyBall, deepAnimations);
    defenseControlMode.away = "semiauto";
    const semiAutoAnimations = createDefenseBaseRunnerAnimations(outcome, flyBall, null, deepFielder, deepTarget);
    defenseControlMode.away = "auto";
    const rightDeepTarget = { x: field.plateX + 340, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.82 };
    const leftDeepTarget = { x: field.plateX - 260, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.72 };
    const rightFly = { ...flyBall, target: rightDeepTarget, landingDistance: defenseField.fenceDistance * 0.82, flightDistance: defenseField.fenceDistance * 0.82 };
    const leftFly = { ...flyBall, target: leftDeepTarget, landingDistance: defenseField.fenceDistance * 0.72, flightDistance: defenseField.fenceDistance * 0.72 };
    const fastSecondRunner = makeBaseRunner({ id: "fast2", name: "fast2", run: 9 });
    const slowSecondRunner = makeBaseRunner({ id: "slow2", name: "slow2", run: 2 });
    const fastFirstRunner = makeBaseRunner({ id: "fast1", name: "fast1", run: 9 });
    const slowFirstRunner = makeBaseRunner({ id: "slow1", name: "slow1", run: 7 });
    bases = createEmptyBases();
    bases.second = fastSecondRunner;
    const fastSecondRight = createDefenseBaseRunnerAnimations(outcome, rightFly, null, { ...deepFielder, x: rightDeepTarget.x, y: rightDeepTarget.y }, rightDeepTarget)[0];
    bases = createEmptyBases();
    bases.second = slowSecondRunner;
    const slowSecondRight = createDefenseBaseRunnerAnimations(outcome, rightFly, null, { ...deepFielder, x: rightDeepTarget.x, y: rightDeepTarget.y, arm: 8 }, rightDeepTarget)[0];
    bases = createEmptyBases();
    bases.second = fastSecondRunner;
    const fastSecondLeft = createDefenseBaseRunnerAnimations(outcome, leftFly, null, { ...deepFielder, x: leftDeepTarget.x, y: leftDeepTarget.y }, leftDeepTarget)[0];
    bases = createEmptyBases();
    bases.first = fastFirstRunner;
    const fastFirstDeep = createDefenseBaseRunnerAnimations(outcome, rightFly, null, { ...deepFielder, x: rightDeepTarget.x, y: rightDeepTarget.y }, rightDeepTarget)[0];
    bases = createEmptyBases();
    bases.first = slowFirstRunner;
    const slowFirstDeep = createDefenseBaseRunnerAnimations(outcome, rightFly, null, { ...deepFielder, x: rightDeepTarget.x, y: rightDeepTarget.y }, rightDeepTarget)[0];
    count.outs = 2;
    bases = createEmptyBases();
    bases.third = thirdRunner;
    const twoOutThird = createDefenseBaseRunnerAnimations(outcome, flyBall, null, deepFielder, deepTarget)[0];
    count.outs = 0;
    defenseState = { ...createDefenseState(), baseRunners: deepAnimations };
    const tagUpRuns = applyDefenseOutAdvancements();
    return JSON.stringify({
      toweringFlag: towering.isToweringFly,
      toweringHeight: towering.maxHeight,
      toweringBallTime: towering.ballTime,
      toweringVisualAmount: getHighFlyVisualAmount(towering, towering.maxHeight * 0.9),
      toweringVisualHeight: getDefenseBallVisualHeightOffset(towering.maxHeight * 0.9, towering),
      grounderVisualHeight: getDefenseBallVisualHeightOffset(120, { trajectory: "grounder", maxHeight: 12 }),
      deepTagUp: deepAnimations[0],
      shallowTagUp: shallowAnimations[0],
      semiAutoTagUp: semiAutoAnimations[0],
      fastSecondRight,
      slowSecondRight,
      fastSecondLeft,
      fastFirstDeep,
      slowFirstDeep,
      twoOutThird,
      tagUpStartsAfterCatch: Math.abs((deepAnimations[0]?.routeStartTime ?? 0) - outcome.fieldingTime) < 0.001,
      tagUpVisualThrow: Boolean(tagThrow?.visualOnly) && tagThrow.targetBase === "home" && tagThrow.startTime > outcome.fieldingTime,
      tagUpRuns,
      thirdAfterTag: bases.third
    });
  })()`
));

assert(toweringFlyAndTagUpState.toweringFlag === true, "towering-fly labels should create towering fly balls");
assert(toweringFlyAndTagUpState.toweringHeight >= 540, "towering flies should use the boosted high arc");
assert(toweringFlyAndTagUpState.toweringBallTime > 2.2, "towering flies should stay in the air longer");
assert(toweringFlyAndTagUpState.toweringVisualAmount > 0.8, "towering flies should use high-fly visual treatment");
assert(toweringFlyAndTagUpState.toweringVisualHeight > toweringFlyAndTagUpState.toweringHeight * 0.9, "towering flies should be drawn visibly higher than their raw arc");
assert(toweringFlyAndTagUpState.grounderVisualHeight === 120, "grounders should not receive high-fly visual height treatment");
assert(toweringFlyAndTagUpState.deepTagUp.tagUp === true, "third-base runners should tag up on deep caught flies when likely safe");
assert(toweringFlyAndTagUpState.deepTagUp.scored === true, "successful tag-up runners should head home");
assert(toweringFlyAndTagUpState.shallowTagUp.tagUp === false, "third-base runners should not tag up on shallow caught flies");
assert(toweringFlyAndTagUpState.semiAutoTagUp.tagUp === false, "semi-auto baserunning should leave tag-up decisions to the player");
assert(toweringFlyAndTagUpState.fastSecondRight.tagUp === false, "second-base runners should not try automatic tag ups");
assert(toweringFlyAndTagUpState.slowSecondRight.tagUp === false, "slow second-base runners should often stay on deep right-field flies");
assert(toweringFlyAndTagUpState.fastSecondLeft.tagUp === false, "second-base runners should favor right-field tag-up chances rather than left-field flies");
assert(toweringFlyAndTagUpState.fastFirstDeep.tagUp === false, "first-base runners should not try automatic tag ups");
assert(toweringFlyAndTagUpState.slowFirstDeep.tagUp === false, "first-base runners below the high-speed threshold should usually stay put");
assert(toweringFlyAndTagUpState.twoOutThird?.tagUp !== true, "tag-up choices should not be created when the catch itself would be the third out");
assert(toweringFlyAndTagUpState.tagUpStartsAfterCatch === true, "tag-up runners should visibly start after the catch instead of resolving immediately");
assert(toweringFlyAndTagUpState.tagUpVisualThrow === true, "caught deep flies with tag-up runners should create a quick visual throw to the target base");
assert(toweringFlyAndTagUpState.tagUpRuns === 1, "successful tag ups should add a run");
assert(toweringFlyAndTagUpState.thirdAfterTag === null, "successful tag ups should clear third base");

const grounderLeadRunnerState = JSON.parse(runInGame(
  context,
  `(() => {
    const slowRunner = makeBaseRunner({ id: "slow", name: "slow", run: 2 });
    const fastRunner = makeBaseRunner({ id: "fast", name: "fast", run: 9 });
    const grounder = { isGrounder: true, isLiner: false, isPopupFly: false, trajectory: "grounder", ballTime: 0.7, target: defenseField.bases.second };
    const outcome = { kind: "force", caught: true, needsThrow: true, fieldingTime: 0.62 };
    bases = createEmptyBases();
    bases.first = slowRunner;
    const slowLead = createDefenseBaseRunner("first", slowRunner, outcome, grounder);
    bases.first = fastRunner;
    const fastLead = createDefenseBaseRunner("first", fastRunner, outcome, grounder);
    const hitRunLead = createDefenseBaseRunner("first", fastRunner, outcome, grounder, null, null, null, { active: true, startBase: "first", targetBase: "second", runnerId: "fast" });
    const firstBase = defenseField.bases.first;
    return JSON.stringify({
      slowLeadDistance: Math.hypot(slowLead.x - firstBase.x, slowLead.y - firstBase.y),
      fastLeadDistance: Math.hypot(fastLead.x - firstBase.x, fastLead.y - firstBase.y),
      hitRunLeadDistance: Math.hypot(hitRunLead.x - firstBase.x, hitRunLead.y - firstBase.y),
      fastArrivalEarlier: fastLead.arrivalTime < createForcedRunnerFromInfo(fastRunner, "first", "second").arrivalTime,
      hitRunArrivalEarlier: hitRunLead.arrivalTime < fastLead.arrivalTime
    });
  })()`
));

assert(grounderLeadRunnerState.slowLeadDistance > 0, "ground-ball base runners should start with a visible lead from the base");
assert(grounderLeadRunnerState.fastLeadDistance > grounderLeadRunnerState.slowLeadDistance, "faster runners should take a larger ground-ball lead");
assert(grounderLeadRunnerState.hitRunLeadDistance > grounderLeadRunnerState.fastLeadDistance, "hit-and-run runners should start much farther toward the next base");
assert(grounderLeadRunnerState.fastArrivalEarlier === true && grounderLeadRunnerState.hitRunArrivalEarlier === true, "runner leads should make force-play arrival times earlier");

const outAdvancementState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    battingTeam = "away";
    scores = { away: 0, home: 0 };
    count.outs = 0;
    activeBatter = findById(batters, "suzuki");
    bases = createEmptyBases();
    const secondRunner = makeBaseRunner(findById(batters, "ichiro"));
    bases.second = secondRunner;
    const groundTarget = { x: defenseField.bases.first.x - 60, y: defenseField.bases.first.y - 40 };
    const groundBall = {
      target: groundTarget,
      direction: normalize({ x: 0.2, y: -1 }),
      flightDistance: 260,
      landingDistance: 260,
      ballTime: 1.1,
      isGrounder: true,
      isLiner: false,
      isPopupFly: false,
      isToweringFly: false,
      isDeep: false,
      power: 0.55,
      trajectory: "grounder",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const groundOutcome = { kind: "out", label: "内野ゴロ", caught: true, needsThrow: false, fieldingTime: 1.1 };
    const groundFielder = { role: "SS", x: groundTarget.x, y: groundTarget.y, speed: 5, fielding: 5, arm: 5 };
    const groundRunners = createDefenseBaseRunnerAnimations(groundOutcome, groundBall, null, groundFielder, groundTarget);
    defenseState = { ...createDefenseState(), outcome: groundOutcome, battedBall: groundBall, baseRunners: groundRunners };
    finishDefensePlay();
    const groundResult = {
      runnerAdvanced: bases.third?.id === secondRunner.id,
      outs: count.outs,
      targetBase: groundRunners[0]?.targetBase,
      groundOutAdvance: groundRunners[0]?.groundOutAdvance === true
    };

    startGame();
    battingTeam = "away";
    scores = { away: 0, home: 0 };
    count.outs = 0;
    activeBatter = findById(batters, "suzuki");
    bases = createEmptyBases();
    const thirdGroundRunner = makeBaseRunner(findById(batters, "shuto"));
    bases.third = thirdGroundRunner;
    const forceGroundOutcome = { kind: "force", label: "内野ゴロ", caught: true, needsThrow: true, fieldingTime: 1.1 };
    const forceGroundRunners = createDefenseBaseRunnerAnimations(forceGroundOutcome, groundBall, null, groundFielder, groundTarget);
    const batterRunner = createBatterRunner(activeBatter);
    defenseState = {
      ...createDefenseState(),
      outcome: forceGroundOutcome,
      battedBall: groundBall,
      runner: batterRunner,
      baseRunners: forceGroundRunners,
      throw: { targetBase: "first", baseLabel: "一塁", startTime: 1.2, endTime: 1.45, safe: false },
      completedForceOutBases: ["first"]
    };
    finishDefensePlay();
    const groundForceScoreResult = {
      scored: scores.away,
      thirdCleared: bases.third === null,
      batterOut: bases.first === null,
      runnerTargetBase: forceGroundRunners[0]?.targetBase,
      outs: count.outs
    };

    startGame();
    battingTeam = "away";
    scores = { away: 0, home: 0 };
    count.outs = 0;
    activeBatter = findById(batters, "suzuki");
    bases = createEmptyBases();
    const thirdRunner = makeBaseRunner(findById(batters, "shuto"));
    bases.third = thirdRunner;
    const deepTarget = { x: field.plateX + 70, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.72 };
    const flyBall = {
      target: deepTarget,
      direction: normalize({ x: 0.1, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.72,
      landingDistance: defenseField.fenceDistance * 0.72,
      ballTime: 2.6,
      isGrounder: false,
      isLiner: false,
      isPopupFly: false,
      isToweringFly: true,
      isDeep: true,
      power: 1.0,
      trajectory: "fly",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const flyOutcome = { kind: "out", label: "外野フライ", caught: true, needsThrow: false, fieldingTime: 2.6 };
    const flyFielder = { role: "C", x: deepTarget.x, y: deepTarget.y, speed: 5, fielding: 5, arm: 5 };
    const flyRunners = createDefenseBaseRunnerAnimations(flyOutcome, flyBall, null, flyFielder, deepTarget);
    defenseState = { ...createDefenseState(), outcome: flyOutcome, battedBall: flyBall, baseRunners: flyRunners };
    finishDefensePlay();
    return JSON.stringify({
      groundResult,
      groundForceScoreResult,
      flyTagUp: flyRunners[0]?.tagUp === true,
      flyTargetBase: flyRunners[0]?.targetBase,
      flyScored: scores.away === 1,
      thirdCleared: bases.third === null,
      flyOuts: count.outs
    });
  })()`
));

assert(outAdvancementState.groundResult.groundOutAdvance === true, "runners should be marked to advance on routine ground outs");
assert(outAdvancementState.groundResult.targetBase === "third", "a runner on second should advance to third on a routine ground out");
assert(outAdvancementState.groundResult.runnerAdvanced === true, "ground-out advancement should update the base state");
assert(outAdvancementState.groundResult.outs === 1, "ground-out advancement should still record the batter out");
assert(outAdvancementState.groundForceScoreResult.runnerTargetBase === "home", "third-base runners should head home on ground balls with a first-base out");
assert(outAdvancementState.groundForceScoreResult.scored === 1, "ground-ball force outs at first should score runners who reach home before the play ends");
assert(outAdvancementState.groundForceScoreResult.thirdCleared === true, "scoring ground-ball runners should clear third base");
assert(outAdvancementState.groundForceScoreResult.batterOut === true, "the batter-runner should remain out at first on the scoring groundout");
assert(outAdvancementState.groundForceScoreResult.outs === 1, "the scoring groundout should still record one out");
assert(outAdvancementState.flyTagUp === true, "deep caught flies should let eligible runners tag up");
assert(outAdvancementState.flyTargetBase === "home", "a third-base runner should target home on a deep caught fly");
assert(outAdvancementState.flyScored === true, "tagging from third on a deep caught fly should score");
assert(outAdvancementState.thirdCleared === true, "tagging up should clear the runner's original base");
assert(outAdvancementState.flyOuts === 1, "fly-out advancement should still record the batter out");

const immediateCatchOutCallState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    const battedBall = {
      origin: { x: field.plateX, y: field.plateY - 10 },
      target: { x: field.plateX + 80, y: field.plateY - 520 },
      direction: normalize({ x: 0.1, y: -1 }),
      ballTime: 0.6,
      isGrounder: false,
      isLiner: false,
      trajectory: "fly",
      power: 0.6,
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const runner = createBatterRunner(activeBatter);
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: 0,
      duration: 5000,
      fielders: [{ role: "C", x: battedBall.target.x, y: battedBall.target.y, currentX: battedBall.target.x, currentY: battedBall.target.y, speed: 5, fielding: 5, arm: 5 }],
      chosenFielder: { role: "C", x: battedBall.target.x, y: battedBall.target.y, speed: 5, fielding: 5, arm: 5 },
      target: battedBall.target,
      landingTarget: battedBall.target,
      origin: battedBall.origin,
      battedBall,
      outcome: { kind: "out", label: "C catch", caught: true, needsThrow: false, fieldingTime: 0.6 },
      runner
    };
    gamePhase = "defense";
    message = "C running";
    updateDefensePlay(590);
    const beforeCatch = { message, outCallShown: defenseState.outCallShown, active: defenseState.active };
    updateDefensePlay(610);
    return JSON.stringify({
      beforeCatch,
      afterMessage: message,
      afterOutCallShown: defenseState.outCallShown,
      stillActive: defenseState.active,
      outs: count.outs
    });
  })()`
));

assert(immediateCatchOutCallState.beforeCatch.outCallShown === false, "caught fly out call should wait until the catch moment");
assert(immediateCatchOutCallState.afterOutCallShown === true, "caught fly out call should be shown as soon as the catch happens");
assert(immediateCatchOutCallState.afterOutCallShown === true, "caught fly out message should appear immediately");
assert(immediateCatchOutCallState.stillActive === true, "immediate out call should not skip the remaining defense resolution");

const throwProfileState = JSON.parse(runInGame(
  context,
  `(() => {
    const weakLong = getThrowProfile({ arm: 3 }, 1500);
    const strongLong = getThrowProfile({ arm: 10 }, 1500);
    const weakShort = getThrowProfile({ arm: 1 }, 420);
    const strongShort = getThrowProfile({ arm: 10 }, 420);
    const normalShort = getThrowProfile({ arm: 5 }, 420);
    const normalLong = getThrowProfile({ arm: 5 }, 1500);
    const deepOutfieldFrom = { x: field.centerX, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.72 };
    const home = getDefenseBasePointByName("home");
    const deepHomeDistance = Math.hypot(home.x - deepOutfieldFrom.x, home.y - deepOutfieldFrom.y);
    const weakOutfieldHome = getThrowProfile({ role: "C", arm: 1 }, deepHomeDistance, { targetBase: "home", from: deepOutfieldFrom });
    const weakNonOutfieldHome = getThrowProfile({ role: "SS", arm: 1 }, deepHomeDistance, { targetBase: "home", from: deepOutfieldFrom });
    const arm8OutfieldHome = getThrowProfile({ role: "C", arm: 8 }, deepHomeDistance, { targetBase: "home", from: deepOutfieldFrom });
    const arm9OutfieldHome = getThrowProfile({ role: "C", arm: 9 }, deepHomeDistance, { targetBase: "home", from: deepOutfieldFrom });
    const strongOutfieldHome = getThrowProfile({ role: "C", arm: 10 }, deepHomeDistance, { targetBase: "home", from: deepOutfieldFrom });
    const strongNonOutfieldHome = getThrowProfile({ role: "SS", arm: 10 }, deepHomeDistance, { targetBase: "home", from: deepOutfieldFrom });
    return JSON.stringify({
      weakLongTime: weakLong.throwTime,
      strongLongTime: strongLong.throwTime,
      weakLongArc: weakLong.arcHeight,
      strongLongArc: strongLong.arcHeight,
      weakShortSpeed: weakShort.throwSpeed,
      strongShortSpeed: strongShort.throwSpeed,
      normalShortSpeed: normalShort.throwSpeed,
      normalShortTime: normalShort.throwTime,
      normalLongTime: normalLong.throwTime,
      normalShortArc: normalShort.arcHeight,
      normalLongArc: normalLong.arcHeight,
      weakLongBounce: Boolean(weakLong.bounce?.enabled),
      normalLongBounce: Boolean(normalLong.bounce?.enabled),
      strongLongBounce: Boolean(strongLong.bounce?.enabled),
      weakShortBounce: Boolean(weakShort.bounce?.enabled),
      weakOutfieldHomeSpeed: weakOutfieldHome.throwSpeed,
      weakNonOutfieldHomeSpeed: weakNonOutfieldHome.throwSpeed,
      arm8OutfieldHomeBounce: Boolean(arm8OutfieldHome.bounce?.enabled),
      arm9OutfieldHomeBounce: Boolean(arm9OutfieldHome.bounce?.enabled),
      arm8OutfieldHomeTime: arm8OutfieldHome.throwTime,
      arm9OutfieldHomeTime: arm9OutfieldHome.throwTime,
      strongOutfieldHomeSpeed: strongOutfieldHome.throwSpeed,
      strongNonOutfieldHomeSpeed: strongNonOutfieldHome.throwSpeed
    });
  })()`
));

assert(throwProfileState.normalLongTime > throwProfileState.normalShortTime, "long throws should be slower than short throws");
assert(throwProfileState.normalLongArc > throwProfileState.normalShortArc, "long throws should have a higher arc");
assert(throwProfileState.strongLongTime < throwProfileState.weakLongTime, "strong-arm fielders should throw long balls faster");
assert(throwProfileState.strongLongArc < throwProfileState.weakLongArc, "strong-arm fielders should throw long balls on a lower arc");
assert(Math.abs(throwProfileState.normalShortSpeed - 803.6470588235293) < 0.001, "arm 5 should use the redistributed low-end-boosted throw speed");
assert(Math.abs(throwProfileState.strongShortSpeed - 1205.470588235294) < 0.001, "arm 10 should keep the previous top throw speed");
assert(Math.abs(throwProfileState.weakShortSpeed - 482.1882352941177) < 0.001, "arm 1 should be twenty percent faster than the previous low-end throw speed");
assert(throwProfileState.weakLongBounce === true, "weak arms should bounce deep outfield throws");
assert(throwProfileState.normalLongBounce === true, "average arms should bounce deep outfield throws");
assert(throwProfileState.strongLongBounce === false, "strong arms should be able to reach deep throws without a bounce");
assert(throwProfileState.weakShortBounce === false, "short throws should stay no-bounce even for weak arms");
assert(Math.abs(throwProfileState.weakOutfieldHomeSpeed - throwProfileState.weakNonOutfieldHomeSpeed) < 0.001, "arm 1 outfield-to-home speed should stay unchanged");
assert(throwProfileState.strongOutfieldHomeSpeed <= throwProfileState.strongNonOutfieldHomeSpeed * 0.81, "arm 10 outfield-to-home speed should be reduced by about twenty percent");
assert(throwProfileState.arm8OutfieldHomeBounce === true, "arm 8 outfield throws home should bounce before the plate");
assert(throwProfileState.arm9OutfieldHomeBounce === false, "arm 9 outfield throws home should barely reach without bouncing");
assert(throwProfileState.arm8OutfieldHomeTime > throwProfileState.arm9OutfieldHomeTime, "bounced arm 8 throws home should arrive slower than arm 9 throws");

const variedBattedBallState = JSON.parse(runInGame(
  context,
  `(() => {
    const lineLiner = {
      target: { x: 1060, y: 180 },
      direction: normalize({ x: 0.86, y: -0.82 }),
      power: 0.92,
      ballTime: 0.92,
      landingDistance: 1380,
      distance: 1600,
      isGrounder: false,
      isLiner: true,
      isLineLiner: true,
      fenceOver: false,
      wallHit: false
    };
    const lineDrop = {
      ...lineLiner,
      power: 0.62,
      ballTime: 1.05,
      landingDistance: 500,
      distance: 980,
      isLineLiner: false,
      isLineDrop: true,
      isSoftDrop: true
    };
    const chaseFly = {
      ...lineLiner,
      power: 1.04,
      ballTime: 2.08,
      landingDistance: 1840,
      distance: 1960,
      isLiner: false,
      isLineLiner: false,
      isChaseFly: true,
      trajectory: "fly"
    };
    const fastFielder = { role: "R", x: 900, y: 320, speed: 10, fielding: 10, arm: 10, distanceToTarget: 160 };
    const weakFielder = { role: "R", x: 620, y: 540, speed: 2, fielding: 2, arm: 2, distanceToTarget: 760 };
    const fastChaser = { ...fastFielder, distanceToTarget: 470 };
    const weakChaser = { ...weakFielder, distanceToTarget: 980 };
    const runner = createBatterRunner({ id: "runner", name: "RUNNER", run: 8 });
    const originalRandom = Math.random;

    Math.random = () => 0.5;
    const builtLine = buildBattedBall(0.9, normalize({ x: 0.86, y: -0.82 }), hitLabels.lineLiner);
    Math.random = originalRandom;
    const builtLineOutfielderOutcome = resolveDefenseOutcome(
      { role: "C", x: builtLine.target.x, y: builtLine.target.y + 42, speed: 8, fielding: 8, arm: 5, distanceToTarget: 42, fieldingPoint: builtLine.target },
      builtLine,
      runner
    );
    const builtLineFielderChoice = chooseDefenseFielder(getDefensiveLineup("away"), builtLine);
    const builtLineInfielderRouteReaction = getDefensiveLineup("away")
      .filter((fielder) => isInfielderRole(fielder.role))
      .some((fielder) => isInfielderReactionRouteBall(fielder, builtLine));
    const excellentLineProfile = {
      power: 1.08,
      quality: 0.86,
      feedbackScore: 0.86,
      exitVelocity: 1.02,
      carry: 0.98,
      timingPull: -0.42,
      direction: normalize({ x: -0.94, y: -0.82 })
    };
    Math.random = () => 0.99;
    const excellentLine = buildBattedBall(1.08, excellentLineProfile.direction, hitLabels.lineLiner, excellentLineProfile);
    Math.random = originalRandom;
    const hardOutfieldBounceResult = makeHardOutfieldBounceHitResultFromProfile({
      power: 0.82,
      quality: 0.62,
      feedbackScore: 0.62,
      exitVelocity: 0.74,
      carry: 0.72,
      launchAngle: 17,
      timingPull: 0.04,
      direction: normalize({ x: 0.14, y: -1 }),
      lineLinerScore: 0.06
    });
    Math.random = () => 0.5;
    const hardOutfieldBounceBall = buildBattedBall(
      hardOutfieldBounceResult.power,
      hardOutfieldBounceResult.direction,
      hardOutfieldBounceResult.label,
      hardOutfieldBounceResult.battedProfile
    );
    const hardOutfieldBounceInfieldClearHeight = getParabolicArcHeight(
      clamp(860 / hardOutfieldBounceBall.landingDistance, 0, 1),
      hardOutfieldBounceBall.maxHeight
    );
    const hardOutfieldBounceInfieldPoint = getClosestPointOnBattedBallRoute({ x: 640, y: 640 }, hardOutfieldBounceBall);
    const hardOutfieldBounceInfielder = {
      role: "SS",
      x: hardOutfieldBounceInfieldPoint.x,
      y: hardOutfieldBounceInfieldPoint.y,
      speed: 10,
      fielding: 10,
      arm: 8
    };
    const hardOutfieldBounceRouteCatch = getInfielderRouteBodyCatch(
      hardOutfieldBounceInfielder,
      hardOutfieldBounceBall,
      hardOutfieldBounceInfieldPoint
    );
    const hardOutfieldBounceCloseCatch = getCloseHardBallCatch(
      hardOutfieldBounceInfielder,
      hardOutfieldBounceBall,
      hardOutfieldBounceInfieldPoint,
      0
    );
    const hardOutfieldBounceDifficultCatch = getDifficultHardBallCatch(
      hardOutfieldBounceInfielder,
      hardOutfieldBounceBall,
      0.1,
      hardOutfieldBounceBall.ballTime,
      0
    );
    const hardOutfieldBounceReactionRoute = isInfielderReactionRouteBall(hardOutfieldBounceInfielder, hardOutfieldBounceBall);
    const hardOutfieldBounceAttemptRoute = isInfielderAttemptRouteBall(hardOutfieldBounceInfielder, hardOutfieldBounceBall);
    const hardOutfieldBounceFieldingTarget = getDefenseFieldingTarget(hardOutfieldBounceBall, {
      kind: "single",
      scoreType: "single",
      caught: false,
      fieldingTime: hardOutfieldBounceBall.ballTime,
      fieldingPoint: hardOutfieldBounceBall.target
    });
    const hardOutfieldBouncePostLandingRoll = Math.hypot(
      hardOutfieldBounceFieldingTarget.x - hardOutfieldBounceBall.target.x,
      hardOutfieldBounceFieldingTarget.y - hardOutfieldBounceBall.target.y
    );
    const hardOutfieldBounceRollDuration = getDefenseRollDuration(
      hardOutfieldBounceBall,
      hardOutfieldBounceBall.target,
      hardOutfieldBounceFieldingTarget
    );
    const hardOutfieldBounceOutfielderOutcome = resolveDefenseOutcome(
      {
        role: "C",
        x: hardOutfieldBounceBall.target.x,
        y: hardOutfieldBounceBall.target.y,
        speed: 10,
        fielding: 10,
        arm: 8,
        distanceToTarget: 0,
        fieldingPoint: hardOutfieldBounceBall.target
      },
      hardOutfieldBounceBall,
      runner
    );
    Math.random = originalRandom;
    const builtDrop = buildBattedBall(0.62, normalize({ x: -0.7, y: -0.9 }), hitLabels.lineDrop);
    const builtFrontDrop = buildBattedBall(0.58, normalize({ x: 0.1, y: -1 }), hitLabels.frontDrop);
    const builtLineEdgeGrounder = buildBattedBall(0.86, normalize({ x: -0.96, y: -0.8 }), hitLabels.lineEdgeGrounder);
    const builtLineEdge = buildBattedBall(0.82, normalize({ x: 0.98, y: -0.78 }), hitLabels.lineEdge);
    Math.random = () => 0.5;
    const builtLineEdgeRollTarget = getDefenseFieldingTarget(builtLineEdge, { kind: "double", scoreType: "double", caught: false });
    Math.random = originalRandom;
    const builtChase = buildBattedBall(1.04, normalize({ x: 0.36, y: -1 }), hitLabels.chaseFly);
    const builtFenceEdge = buildBattedBall(1.28, normalize({ x: 0.08, y: -1 }), hitLabels.fenceEdgeFly);
    const builtRoutineFly = buildBattedBall(0.68, normalize({ x: 0.16, y: -1 }), hitLabels.routineFly);
    Math.random = () => 0.99;
    const builtFenceLiner = buildBattedBall(1.26, normalize({ x: 0.05, y: -1 }), hitLabels.fenceLiner);
    Math.random = () => 0.02;
    const shortFenceLiner = buildBattedBall(1.02, normalize({ x: 0.04, y: -1 }), hitLabels.fenceLiner);
    Math.random = () => 0.99;
    const homerFenceLiner = buildBattedBall(1.62, normalize({ x: 0.04, y: -1 }), hitLabels.fenceLiner);
    Math.random = () => 0.47;
    const fenceEdgeWall = buildBattedBall(1.28, normalize({ x: 0.04, y: -1 }), hitLabels.fenceEdgeFly);
    Math.random = () => 0.3;
    const deepDriveWall = buildBattedBall(1.86, normalize({ x: 0.04, y: -1 }), deepDriveLabel);
    const oldDeepDriveBaseBallSpeed = 760 * battedBallSpeedMultiplier.liner * battedBallPaceMultiplier * hardBattedBallSpeedScale * 1.45;
    const oldDeepDriveBallTimeEstimate = 0.7 / (battedBallSpeedMultiplier.liner * battedBallPaceMultiplier) + deepDriveWall.flightDistance / oldDeepDriveBaseBallSpeed;
    Math.random = () => 0.99;
    const fenceEdgeHomer = buildBattedBall(1.28, normalize({ x: 0.04, y: -1 }), hitLabels.fenceEdgeFly);
    Math.random = () => 0.82;
    const barelyHomer = buildBattedBall(1.34, normalize({ x: 0, y: -1 }), hitLabels.fenceEdgeFly);
    Math.random = () => 0.99;
    const deepDriveHomer = buildBattedBall(2.25, normalize({ x: 0.04, y: -1 }), deepDriveLabel);
    Math.random = () => 0.99;
    const perfectDeepDriveHomer = buildBattedBall(2.5, normalize({ x: 0.04, y: -1 }), deepDriveLabel);
    Math.random = originalRandom;
    const marginalHomeRunDistance = getPossibleHomeRunFlightDistance(
      defenseField.fenceDistance + 80,
      defenseField.fenceDistance,
      { isDeepDrive: true, power: 1.48, contactScore: 0.54, profileExitVelocity: 0.94 }
    );
    const solidHomeRunDistance = getPossibleHomeRunFlightDistance(
      defenseField.fenceDistance + 340,
      defenseField.fenceDistance,
      { isDeepDrive: true, power: 1.82, contactScore: 0.74, profileExitVelocity: 1.12 }
    );
    const monsterHomeRunDistance = getPossibleHomeRunFlightDistance(
      defenseField.fenceDistance + 760,
      defenseField.fenceDistance,
      { isDeepDrive: true, power: 2.58, contactScore: 0.96, profileExitVelocity: 1.48 }
    );
    const sameRawWeakHomeRunDistance = getPossibleHomeRunFlightDistance(
      defenseField.fenceDistance + 360,
      defenseField.fenceDistance,
      { isDeepDrive: true, power: 1.42, contactScore: 0.56, profileExitVelocity: 0.96, profileCarry: 0.98 }
    );
    const sameRawSolidHomeRunDistance = getPossibleHomeRunFlightDistance(
      defenseField.fenceDistance + 360,
      defenseField.fenceDistance,
      { isDeepDrive: true, power: 1.9, contactScore: 0.76, profileExitVelocity: 1.18, profileCarry: 1.24 }
    );
    const sameRawPerfectHomeRunDistance = getPossibleHomeRunFlightDistance(
      defenseField.fenceDistance + 360,
      defenseField.fenceDistance,
      { isDeepDrive: true, power: 2.62, contactScore: 0.98, profileExitVelocity: 1.58, profileCarry: 1.68 }
    );
    const solidSeventySpeed = getDisplayExitSpeedKmh({
      power: 0.92,
      profile: { exitVelocity: 0.82, feedbackScore: 0.72 },
      trajectory: "liner",
      isLiner: true
    });
    const lowerSolidSpeed = getDisplayExitSpeedKmh({
      power: 0.82,
      profile: { exitVelocity: 0.72, feedbackScore: 0.62 },
      trajectory: "liner",
      isLiner: true
    });
    const shallowFlyHomerScale = getHomeRunBallSpeedScale({
      contactScore: 0.62,
      profileExitVelocity: 0.92,
      power: 1.25,
      flightDistance: defenseField.fenceDistance + 40,
      fenceTravelDistance: defenseField.fenceDistance,
      isLiner: false
    });
    const monsterFlyHomerScale = getHomeRunBallSpeedScale({
      contactScore: 0.94,
      profileExitVelocity: 1.48,
      power: 2.48,
      flightDistance: defenseField.fenceDistance + 520,
      fenceTravelDistance: defenseField.fenceDistance,
      isLiner: false
    });
    const lineFast = resolveDefenseOutcome(fastFielder, lineLiner, runner);
    const lineWeak = resolveDefenseOutcome(weakFielder, lineLiner, runner);
    const dropFast = resolveDefenseOutcome(fastFielder, lineDrop, runner);
    const dropWeak = resolveDefenseOutcome(weakFielder, lineDrop, runner);
    const chaseFast = resolveDefenseOutcome(fastChaser, chaseFly, runner);
    const chaseWeak = resolveDefenseOutcome(weakChaser, chaseFly, runner);
    const lateRoutineFly = {
      target: { x: 760, y: 260 },
      direction: normalize({ x: 0.14, y: -1 }),
      power: 0.68,
      ballTime: 1.4,
      landingDistance: 1320,
      distance: 1380,
      isGrounder: false,
      isLiner: false,
      isRoutineFly: true,
      trajectory: "fly",
      fenceOver: false,
      wallHit: false
    };
    const lateFielder = { role: "C", x: 640, y: 360, speed: 5, fielding: 6, arm: 5, distanceToTarget: getFielderSpeed({ speed: 5 }) * 1.5 };
    const lateFlyCatch = resolveDefenseOutcome(lateFielder, lateRoutineFly, runner);
    const extraLateFielder = { ...lateFielder, distanceToTarget: getFielderSpeed({ speed: 5 }) * 2.55 };
    const extraLateFlyCatch = resolveDefenseOutcome(extraLateFielder, lateRoutineFly, runner);
    const visualLateFielder = { ...lateFielder, fielding: 2, speed: 2, distanceToTarget: getFielderSpeed({ speed: 2 }) * 1.88 };
    const visualLateFlyCatch = resolveDefenseOutcome(visualLateFielder, lateRoutineFly, runner);
    const eliteFlyFielder = { ...lateFielder, fielding: 10, speed: 10, distanceToTarget: getFielderSpeed({ speed: 10 }) * 1.62 };
    const eliteFlyCatch = resolveDefenseOutcome(eliteFlyFielder, lateRoutineFly, runner);
    const flyProfile = {
      power: 0.62,
      quality: 0.34,
      timingPull: 0.22,
      direction: normalize({ x: 0.04, y: -1 })
    };
    Math.random = () => 0.18;
    const variedFlyA = makeRoutineFlyResultFromProfile(flyProfile);
    Math.random = () => 0.82;
    const variedFlyB = makeRoutineFlyResultFromProfile(flyProfile);
    Math.random = originalRandom;
    defenseState = {
      ...createDefenseState(),
      battedBall: lateRoutineFly,
      landingTarget: lateRoutineFly.target,
      target: { x: 999, y: 999 },
      outcome: { kind: "single", caught: false },
      throw: null
    };
    const flyChaseTarget = getDefenseFielderChaseTarget(0.5);
    defenseState = {
      ...createDefenseState(),
      battedBall: { ...lateRoutineFly, wallHit: true, isRoutineFly: true, isGrounder: false, isLiner: false, ballTime: 2.4 },
      landingTarget: lateRoutineFly.target,
      target: { x: 999, y: 999 },
      outcome: { kind: "double", caught: false },
      throw: null
    };
    const wallFlyChaseTarget = getDefenseFielderChaseTarget(0.5);
    defenseState = {
      ...createDefenseState(),
      battedBall: { ...lineDrop, target: { x: 720, y: 260 }, ballTime: 1.05, isLiner: true, isLineDrop: true, isSoftDrop: true },
      landingTarget: { x: 720, y: 260 },
      target: { x: 760, y: 80 },
      outcome: { kind: "single", caught: false },
      throw: null
    };
    const lineDropChaseTarget = getDefenseFielderChaseTarget(0.45);

    return JSON.stringify({
      linerSpeedMultiplier: battedBallSpeedMultiplier.liner,
      oldLinerBallTimeEstimate: (builtLine.ballTime - builtLine.flightDistance / 760) * (4 / battedBallSpeedMultiplier.liner) + builtLine.flightDistance / 760,
      builtLineBallTime: builtLine.ballTime,
      builtLineFlag: builtLine.isLineLiner,
      builtLineExitSpeed: builtLine.exitSpeedKmh,
      builtLineDirectionX: Math.abs(builtLine.direction.x),
      builtLineDirectionRatio: Math.abs(builtLine.direction.x / builtLine.direction.y),
      builtLineLandingDistance: builtLine.landingDistance,
      builtLineDistance: builtLine.distance,
      builtLineLandingRatio: builtLine.landingDistance / builtLine.distance,
      builtLineWallHit: builtLine.wallHit,
      builtLineOutfielderCaught: builtLineOutfielderOutcome.caught,
      builtLineOutfielderKind: builtLineOutfielderOutcome.kind,
      builtLineFielderRole: builtLineFielderChoice.role,
      builtLineInfielderRouteReaction,
      excellentLineWallHit: excellentLine.wallHit,
      excellentLineOver: excellentLine.fenceOver,
      excellentLineDistance: excellentLine.distance,
      excellentLineFlightDistance: excellentLine.flightDistance,
      excellentLineFenceDistance: defenseField.fenceDistance,
      hardOutfieldBounceResult: Boolean(hardOutfieldBounceResult.hardOutfieldBounce || hardOutfieldBounceResult.lineLiner),
      hardOutfieldBounceFlag: hardOutfieldBounceBall.isHardOutfieldBounce,
      hardOutfieldBounceTrajectory: hardOutfieldBounceBall.trajectory,
      hardOutfieldBounceLandingDistance: hardOutfieldBounceBall.landingDistance,
      hardOutfieldBounceHeight: hardOutfieldBounceBall.maxHeight,
      hardOutfieldBounceInfieldClearHeight,
      hardOutfieldBounceLineLiner: hardOutfieldBounceBall.isLineLiner,
      hardOutfieldBounceDirectionX: Math.abs(hardOutfieldBounceBall.direction.x),
      hardOutfieldBounceRouteCatch: hardOutfieldBounceRouteCatch.caught,
      hardOutfieldBounceCloseCatch: hardOutfieldBounceCloseCatch.caught,
      hardOutfieldBounceDifficultCatch: hardOutfieldBounceDifficultCatch.caught,
      hardOutfieldBounceReactionRoute,
      hardOutfieldBounceAttemptRoute,
      hardOutfieldBouncePostLandingRoll,
      hardOutfieldBounceRollDuration,
      hardOutfieldBounceOutfielderCaught: hardOutfieldBounceOutfielderOutcome.caught,
      hardOutfieldBounceOutfielderKind: hardOutfieldBounceOutfielderOutcome.kind,
      builtDropFlag: builtDrop.isLineDrop,
      builtFrontDropFlag: builtFrontDrop.isFrontDrop,
      builtFrontDropSoft: builtFrontDrop.isSoftDrop,
      builtFrontDropTrajectory: builtFrontDrop.trajectory,
      builtFrontDropHeight: builtFrontDrop.maxHeight,
      builtFrontDropLandingDistance: builtFrontDrop.landingDistance,
      builtFrontDropBallTime: builtFrontDrop.ballTime,
      builtLineEdgeGrounderFlag: builtLineEdgeGrounder.isLineEdgeGrounder,
      builtLineEdgeGrounderTrajectory: builtLineEdgeGrounder.trajectory,
      builtLineEdgeGrounderDirectionX: Math.abs(builtLineEdgeGrounder.direction.x),
      builtLineEdgeGrounderLandingDistance: builtLineEdgeGrounder.landingDistance,
      builtLineEdgeGrounderDistance: builtLineEdgeGrounder.distance,
      builtLineEdgeFlag: builtLineEdge.isLineEdge,
      builtLineEdgeDirectionX: Math.abs(builtLineEdge.direction.x),
      builtLineEdgeTrajectory: builtLineEdge.trajectory,
      builtLineEdgeHeight: builtLineEdge.maxHeight,
      builtLineEdgeLandingDistance: builtLineEdge.landingDistance,
      builtLineEdgeDistance: builtLineEdge.distance,
      builtLineEdgeRollDistance: Math.hypot(builtLineEdgeRollTarget.x - builtLineEdge.target.x, builtLineEdgeRollTarget.y - builtLineEdge.target.y),
      builtLineEdgeRollDirectionX: Math.sign(builtLineEdgeRollTarget.x - builtLineEdge.target.x) === Math.sign(builtLineEdge.direction.x),
      builtChaseFlag: builtChase.isChaseFly,
      builtFenceLinerFlag: builtFenceLiner.isFenceLiner,
      builtFenceLinerTrajectory: builtFenceLiner.trajectory,
      builtFenceLinerWallHit: builtFenceLiner.wallHit,
      builtFenceLinerOver: builtFenceLiner.fenceOver,
      builtFenceLinerHeight: builtFenceLiner.maxHeight,
      shortFenceLinerWallHit: shortFenceLiner.wallHit,
      shortFenceLinerOver: shortFenceLiner.fenceOver,
      shortFenceLinerLandingBeforeFence: shortFenceLiner.flightDistance < defenseField.fenceDistance,
      homerFenceLinerOver: homerFenceLiner.fenceOver,
      homerFenceLinerTrajectory: homerFenceLiner.trajectory,
      homerFenceLinerHeight: homerFenceLiner.maxHeight,
      builtFenceEdgeFlag: builtFenceEdge.isFenceEdgeFly,
      builtFenceEdgeTrajectory: builtFenceEdge.trajectory,
      builtFenceEdgeDistanceFromFence: Math.abs(builtFenceEdge.distance - defenseField.fenceDistance),
      builtFenceEdgeHeight: builtFenceEdge.maxHeight,
      fenceEdgeWallHit: fenceEdgeWall.wallHit,
      fenceEdgeWallOver: fenceEdgeWall.fenceOver,
      fenceEdgeWallFlightOverFence: fenceEdgeWall.flightDistance - defenseField.fenceDistance,
      fenceEdgeHomerOver: fenceEdgeHomer.fenceOver,
      fenceEdgeHomerWallHit: fenceEdgeHomer.wallHit,
      fenceEdgeHomerFlightOverFence: fenceEdgeHomer.flightDistance - defenseField.fenceDistance,
      barelyHomerOver: barelyHomer.fenceOver,
      barelyHomerFlightOverFence: barelyHomer.flightDistance - defenseField.fenceDistance,
      deepDriveWallHit: deepDriveWall.wallHit,
      deepDriveWallOver: deepDriveWall.fenceOver,
      deepDriveBallTime: deepDriveWall.ballTime,
      oldDeepDriveBallTimeEstimate,
      deepDriveExitSpeed: deepDriveWall.exitSpeedKmh,
      deepDriveHomerOver: deepDriveHomer.fenceOver,
      deepDriveHomerWallHit: deepDriveHomer.wallHit,
      deepDriveHomerFlightOverFence: deepDriveHomer.flightDistance - defenseField.fenceDistance,
      deepDriveHomerDistanceMeters: deepDriveHomer.flightDistanceMeters,
      deepDriveHomerMetric: getBattedBallMetricText(deepDriveHomer),
      perfectDeepDriveHomerOver: perfectDeepDriveHomer.fenceOver,
      perfectDeepDriveHomerFlightOverFence: perfectDeepDriveHomer.flightDistance - defenseField.fenceDistance,
      perfectDeepDriveHomerDistanceMeters: perfectDeepDriveHomer.flightDistanceMeters,
      perfectDeepDriveHomerMetric: getBattedBallMetricText(perfectDeepDriveHomer),
      displayedFenceDistanceMeters: getBattedBallDistanceMeters(defenseField.fenceDistance),
      marginalHomeRunOverFence: marginalHomeRunDistance - defenseField.fenceDistance,
      solidHomeRunOverFence: solidHomeRunDistance - defenseField.fenceDistance,
      monsterHomeRunOverFence: monsterHomeRunDistance - defenseField.fenceDistance,
      marginalHomeRunMeters: getBattedBallDistanceMeters(marginalHomeRunDistance),
      solidHomeRunMeters: getBattedBallDistanceMeters(solidHomeRunDistance),
      monsterHomeRunMeters: getBattedBallDistanceMeters(monsterHomeRunDistance),
      sameRawWeakHomeRunMeters: getBattedBallDistanceMeters(sameRawWeakHomeRunDistance),
      sameRawSolidHomeRunMeters: getBattedBallDistanceMeters(sameRawSolidHomeRunDistance),
      sameRawPerfectHomeRunMeters: getBattedBallDistanceMeters(sameRawPerfectHomeRunDistance),
      solidSeventySpeed,
      lowerSolidSpeed,
      shallowFlyHomerScale,
      monsterFlyHomerScale,
      builtLineMetric: getBattedBallMetricText(builtLine),
      builtRoutineFlyFlag: builtRoutineFly.isRoutineFly,
      builtRoutineFlyHeight: builtRoutineFly.maxHeight,
      builtRoutineFlyLandingDistance: builtRoutineFly.landingDistance,
      builtRoutineFlyVisualAmount: getHighFlyVisualAmount(builtRoutineFly, builtRoutineFly.maxHeight * 0.85),
      builtRoutineFlyVisualHeight: getDefenseBallVisualHeightOffset(builtRoutineFly.maxHeight * 0.85, builtRoutineFly),
      lineFast,
      lineWeak,
      dropFast,
      dropWeak,
      chaseFast,
      chaseWeak,
      lateFlyCatch,
      extraLateFlyCatch,
      visualLateFlyCatch,
      eliteFlyCatch,
      variedFlyDirectionGap: Math.abs(variedFlyA.direction.x - variedFlyB.direction.x),
      flyChaseTargetIsLanding: flyChaseTarget.x === lateRoutineFly.target.x && flyChaseTarget.y === lateRoutineFly.target.y,
      wallFlyChaseTargetIsLanding: wallFlyChaseTarget.x === lateRoutineFly.target.x && wallFlyChaseTarget.y === lateRoutineFly.target.y,
      lineDropChaseTargetIsLanding: lineDropChaseTarget.x === 720 && lineDropChaseTarget.y === 260
    });
  })()`
));

assert(variedBattedBallState.builtLineFlag === true, "line-liner labels should create line-liner batted balls");
assert(variedBattedBallState.builtLineExitSpeed >= 120, "in-play liners should carry a display exit velocity");
assert(variedBattedBallState.builtLineMetric.includes("打球速度"), "in-play batted balls should display exit velocity");
assert(variedBattedBallState.builtLineDirectionX > 0.74, "line-liner labels should send the ball close to a foul-line lane");
assert(variedBattedBallState.builtLineDirectionRatio > 1.32, "line-liner labels should travel nearly along the foul line");
assert(variedBattedBallState.builtLineLandingDistance < variedBattedBallState.builtLineDistance * 0.72, "ordinary line-liners should bounce in front instead of carrying all the way to an outfielder");
assert(variedBattedBallState.builtLineWallHit === false, "ordinary line-liners should stay in play before the wall");
assert(variedBattedBallState.builtLineOutfielderCaught === false, "ordinary line-liners should not become direct outfielder catches");
assert(["single", "double"].includes(variedBattedBallState.builtLineOutfielderKind), "ordinary line-liners should stay as hit-like plays when they reach the outfield");
assert(["L", "R"].includes(variedBattedBallState.builtLineFielderRole), "line-liner labels should be assigned to corner outfielders instead of middle infielders");
assert(variedBattedBallState.builtLineInfielderRouteReaction === false, "deep line-liners should not become easy direct route catches for infielders");
assert(variedBattedBallState.builtRoutineFlyLandingDistance >= 1350, "ordinary outfield flies should land deeper to create more tag-up chances");
assert(variedBattedBallState.excellentLineWallHit === true, "excellent line-liners should be able to turn into fence-direct shots");
assert(variedBattedBallState.excellentLineOver === false, "excellent line-liners should hit the fence instead of becoming automatic home runs");
assert(variedBattedBallState.excellentLineFlightDistance >= variedBattedBallState.excellentLineFenceDistance - 120, "excellent line-liners should carry close to the fence");
assert(variedBattedBallState.hardOutfieldBounceResult === true, "hard low contact should be able to resolve as a sharp outfield-bounce liner");
assert(variedBattedBallState.hardOutfieldBounceFlag === true, "hard outfield-bounce liners should keep a dedicated batted-ball flag");
assert(variedBattedBallState.hardOutfieldBounceTrajectory === "liner", "hard outfield-bounce balls should clear the infield as liners");
assert(variedBattedBallState.hardOutfieldBounceLandingDistance >= 1250, "hard outfield-bounce liners should take their first bounce in shallow outfield, not before the infielders");
assert(variedBattedBallState.hardOutfieldBounceHeight >= 110 && variedBattedBallState.hardOutfieldBounceHeight <= 164, "hard outfield-bounce liners should visibly clear infielders while staying on a fast liner path");
assert(variedBattedBallState.hardOutfieldBounceInfieldClearHeight >= 80, "hard outfield-bounce liners should still be airborne while passing the infielders");
assert(variedBattedBallState.hardOutfieldBounceLineLiner === false, "hard outfield-bounce liners should not use the line-edge liner route");
assert(variedBattedBallState.hardOutfieldBounceDirectionX <= 0.42, "hard outfield-bounce liners should stay in center/gap lanes instead of hugging the foul lines");
assert(variedBattedBallState.hardOutfieldBounceRouteCatch === false, "hard outfield-bounce liners should not be body-caught by infielders");
assert(variedBattedBallState.hardOutfieldBounceCloseCatch === false, "hard outfield-bounce liners should not use close infielder catch rescue");
assert(variedBattedBallState.hardOutfieldBounceDifficultCatch === false, "hard outfield-bounce liners should not use difficult infielder catch rescue");
assert(variedBattedBallState.hardOutfieldBounceReactionRoute === false, "hard outfield-bounce liners should not invite an infielder reaction route");
assert(variedBattedBallState.hardOutfieldBounceAttemptRoute === false, "hard outfield-bounce liners should not invite an infielder attempt route");
assert(variedBattedBallState.hardOutfieldBouncePostLandingRoll >= 300, "uncaught hard outfield-bounce liners should keep rolling after the first landing");
assert(variedBattedBallState.hardOutfieldBounceRollDuration >= 1, "uncaught hard outfield-bounce liners should show a visible post-landing roll duration");
assert(variedBattedBallState.hardOutfieldBounceOutfielderCaught === false, "clean-hit outfield-bounce liners should drop in front of outfielders instead of becoming direct catches");
assert(["single", "double"].includes(variedBattedBallState.hardOutfieldBounceOutfielderKind), "clean-hit outfield-bounce liners should remain hit outcomes after dropping");
assert(Math.abs(variedBattedBallState.linerSpeedMultiplier - 3.2) < 0.001, "liner batted balls should use the twenty-percent slower speed multiplier");
assert(variedBattedBallState.builtLineBallTime > variedBattedBallState.oldLinerBallTimeEstimate, "line-liner travel time should be slower than the previous multiplier");
assert(variedBattedBallState.builtDropFlag === true, "line-drop labels should create line-drop batted balls");
assert(variedBattedBallState.builtFrontDropFlag === true, "front-drop labels should create front-drop batted balls");
assert(variedBattedBallState.builtFrontDropSoft === true, "front drops should behave like soft drops");
assert(variedBattedBallState.builtFrontDropTrajectory === "fly", "front drops should use a natural fly-ball trajectory");
assert(variedBattedBallState.builtFrontDropHeight >= 100 && variedBattedBallState.builtFrontDropHeight <= 170, "front drops should fall with a soft parabolic arc");
assert(variedBattedBallState.builtFrontDropBallTime > 1.35, "front drops should not drop suddenly in front of the outfielders");
assert(variedBattedBallState.builtFrontDropLandingDistance < 1100, "front drops should land in front of the fielders");
assert(variedBattedBallState.builtLineEdgeGrounderFlag === true, "line-edge grounder labels should create line-edge grounder batted balls");
assert(variedBattedBallState.builtLineEdgeGrounderTrajectory === "grounder", "line-edge grounders should stay on a grounder trajectory");
assert(variedBattedBallState.builtLineEdgeGrounderDirectionX > 0.65, "line-edge grounders should stay close to the foul line");
assert(variedBattedBallState.builtLineEdgeGrounderLandingDistance < variedBattedBallState.builtLineEdgeGrounderDistance * 0.65, "line-edge grounders should bounce early and then roll down the line");
assert(variedBattedBallState.builtLineEdgeFlag === true, "line-edge labels should create line-edge batted balls");
assert(variedBattedBallState.builtLineEdgeDirectionX > 0.65, "line-edge balls should stay close to the foul line");
assert(variedBattedBallState.builtLineEdgeTrajectory === "liner", "line-edge balls should stay as low liner trajectories");
assert(variedBattedBallState.builtLineEdgeHeight <= 42, "line-edge liners should stay visibly low instead of becoming high flies");
assert(variedBattedBallState.builtLineEdgeLandingDistance < variedBattedBallState.builtLineEdgeDistance * 0.9, "line-edge liners should bounce before their final carry distance");
assert(variedBattedBallState.builtLineEdgeRollDistance >= 360, "line-edge liners should keep rolling naturally after the bounce");
assert(variedBattedBallState.builtLineEdgeRollDirectionX === true, "line-edge rolls should continue along the foul-line side");
assert(variedBattedBallState.builtChaseFlag === true, "chase-fly labels should create chase-fly batted balls");
assert(variedBattedBallState.builtFenceLinerFlag === true, "fence-liner labels should create low fence-liner batted balls");
assert(variedBattedBallState.builtFenceLinerTrajectory === "liner", "fence liners should use a liner trajectory");
assert(variedBattedBallState.builtFenceLinerWallHit === true, "low fence liners should be able to hit the wall");
assert(variedBattedBallState.builtFenceLinerOver === false, "low fence liners should stay in play instead of becoming high fly homers");
assert(variedBattedBallState.builtFenceLinerHeight < 260, "fence liners should stay visibly lower than large fly balls");
assert(variedBattedBallState.shortFenceLinerWallHit === false && variedBattedBallState.shortFenceLinerOver === false, "lower-angle fence liners should be able to fall in front of the wall");
assert(variedBattedBallState.shortFenceLinerLandingBeforeFence === true, "short fence liners should land before reaching the fence");
assert(variedBattedBallState.homerFenceLinerOver === true, "higher-angle strong fence liners should be able to clear the fence as liner home runs");
assert(variedBattedBallState.homerFenceLinerTrajectory === "liner", "liner home runs should keep the liner trajectory");
assert(variedBattedBallState.homerFenceLinerHeight < 360, "liner home runs should stay lower than towering fly balls");
assert(variedBattedBallState.builtFenceEdgeFlag === true, "fence-edge labels should create fence-edge batted balls");
assert(variedBattedBallState.builtFenceEdgeTrajectory === "fly", "fence-edge balls should use a fly trajectory");
assert(variedBattedBallState.builtFenceEdgeDistanceFromFence <= 520, "shortened fence-edge balls should still land in deep outfield range");
assert(variedBattedBallState.builtFenceEdgeHeight >= 495, "fence-edge balls should have the boosted large fly-ball arc");
assert(variedBattedBallState.fenceEdgeWallHit === true, "stretched fence-edge flies should be able to reach the wall");
assert(variedBattedBallState.fenceEdgeWallOver === false, "barely short fence-edge flies should stay in play");
assert(variedBattedBallState.fenceEdgeWallFlightOverFence <= 0, "wall-scraper misses should stop at the fence instead of becoming routine fly outs");
assert(variedBattedBallState.fenceEdgeHomerOver || variedBattedBallState.fenceEdgeHomerWallHit, "strong fence-edge flies should threaten the wall or barely clear it");
assert(variedBattedBallState.fenceEdgeHomerFlightOverFence >= -80, "stretched fence-edge fly distance should reach the fence area");
assert(variedBattedBallState.barelyHomerOver === true, "the best fence-edge flies should be able to become barely-cleared home runs");
assert(variedBattedBallState.barelyHomerFlightOverFence > 0, "barely-cleared fence-edge flies should carry just beyond the fence");
assert(variedBattedBallState.deepDriveWallHit === true, "deep drives should be able to reach the wall");
assert(variedBattedBallState.deepDriveWallOver === false, "wall-bound deep drives should stay in play");
assert(variedBattedBallState.deepDriveBallTime < variedBattedBallState.oldDeepDriveBallTimeEstimate * 0.96, "strong deep drives should travel even faster than the previous boost");
assert(variedBattedBallState.deepDriveExitSpeed >= 178, "strong deep drives should display a more powerful exit velocity");
assert(variedBattedBallState.deepDriveHomerOver === false, "strong but imperfect deep drives should now be able to stay in play");
assert(variedBattedBallState.deepDriveHomerWallHit === true, "strong but imperfect deep drives can now threaten the wall instead of clearing it");
assert(variedBattedBallState.perfectDeepDriveHomerOver === true, "perfect deep drives should still become home runs");
assert(variedBattedBallState.perfectDeepDriveHomerFlightOverFence > variedBattedBallState.deepDriveHomerFlightOverFence + 240, "perfect deep drives should keep a clearly larger home-run ceiling");
assert(variedBattedBallState.displayedFenceDistanceMeters === 118, "displayed center-field fence distance should match the 118m field reference");
assert(variedBattedBallState.marginalHomeRunOverFence < variedBattedBallState.solidHomeRunOverFence, "barely-cleared home runs should not all carry to the same distance");
assert(variedBattedBallState.solidHomeRunOverFence < variedBattedBallState.monsterHomeRunOverFence, "monster contact should still create the longest home runs");
assert(variedBattedBallState.marginalHomeRunMeters < variedBattedBallState.solidHomeRunMeters, "displayed home-run distances should vary with contact quality");
assert(variedBattedBallState.solidHomeRunMeters < variedBattedBallState.monsterHomeRunMeters, "displayed monster shots should remain visibly longer");
assert(variedBattedBallState.sameRawWeakHomeRunMeters < variedBattedBallState.sameRawSolidHomeRunMeters, "home-run distance should grow even when raw wall distance is the same but contact is better");
assert(variedBattedBallState.sameRawSolidHomeRunMeters + 8 <= variedBattedBallState.sameRawPerfectHomeRunMeters, "perfect contact should add a visibly larger home-run distance ceiling");
assert(variedBattedBallState.marginalHomeRunMeters <= 125, "barely-cleared home runs should display near-wall distances");
assert(variedBattedBallState.monsterHomeRunMeters >= 125, "perfect contact should still display as an extra-large home run");
assert(variedBattedBallState.solidSeventySpeed >= variedBattedBallState.lowerSolidSpeed + 12, "seventy-percent strong contact should get a more forceful exit-speed display");
assert(variedBattedBallState.shallowFlyHomerScale < 0.9, "short non-liner home runs should float instead of racing out");
assert(variedBattedBallState.monsterFlyHomerScale > variedBattedBallState.shallowFlyHomerScale + 0.18, "elite home runs should gain speed as contact quality rises");
assert(variedBattedBallState.perfectDeepDriveHomerDistanceMeters >= 118, "home runs should carry a displayed flight distance");
assert(variedBattedBallState.perfectDeepDriveHomerMetric.includes("飛距離"), "home runs should display flight distance");
assert(variedBattedBallState.perfectDeepDriveHomerDistanceMeters > variedBattedBallState.deepDriveHomerDistanceMeters, "perfect home runs should show a longer displayed distance than ordinary deep drives");
assert(variedBattedBallState.builtRoutineFlyFlag === true, "routine-fly labels should create routine fly balls");
assert(variedBattedBallState.builtRoutineFlyHeight >= 400, "routine outfield flies should have a visibly high arc");
assert(variedBattedBallState.builtRoutineFlyVisualAmount > 0.75, "routine outfield flies should use high-fly visual treatment");
assert(variedBattedBallState.builtRoutineFlyVisualHeight > variedBattedBallState.builtRoutineFlyHeight * 0.85, "routine outfield flies should be drawn higher than their raw arc");
assert(variedBattedBallState.lineFast.caught === true, "good fielders should be able to catch line shots near the line");
assert(variedBattedBallState.lineWeak.scoreType === "double", "weak fielders should allow line shots to become extra-base hits");
assert(variedBattedBallState.dropFast.caught === true, "fast fielders should be able to steal line drops");
assert(variedBattedBallState.dropWeak.scoreType === "single", "weak fielders should allow line drops to fall in");
assert(variedBattedBallState.chaseFast.caught === true, "fast outfielders should catch chase flies");
assert(["double", "triple"].includes(variedBattedBallState.chaseWeak.scoreType), "slow outfielders should allow chase flies to become extra-base hits");
assert(variedBattedBallState.lateFlyCatch.caught === true && variedBattedBallState.lateFlyCatch.kind === "out", "outfielders reaching a fly ball at the visual catch point should record an out");
assert(variedBattedBallState.extraLateFlyCatch.caught === false, "outfielders should not catch fly balls when they are clearly late to the landing point");
assert(variedBattedBallState.visualLateFlyCatch.caught === false, "low-fielding outfielders should miss fly balls unless they truly reach the landing point");
assert(variedBattedBallState.eliteFlyCatch.caught === true && variedBattedBallState.eliteFlyCatch.kind === "out", "elite outfielders should still catch fly balls when their range gets them there");
assert(variedBattedBallState.variedFlyDirectionGap > 0.08, "routine fly balls should vary their landing direction enough to test fielder range");
assert(variedBattedBallState.flyChaseTargetIsLanding === true, "fielders should chase fly-ball landing predictions before the ball drops");
assert(variedBattedBallState.wallFlyChaseTargetIsLanding === true, "fielders should chase wall-hit fly-ball predictions before the ball drops");
assert(variedBattedBallState.lineDropChaseTargetIsLanding === true, "fielders should also chase line-drop landing points before the ball falls");

const infieldGrounderOutBoostState = JSON.parse(runInGame(
  context,
  `(() => {
    const profile = {
      power: 0.48,
      timingPull: 0,
      quality: 0.42,
      exitVelocity: 0.5,
      direction: normalize({ x: 0, y: -1 })
    };
    activeBatter = { power: 5, meet: 5 };
    const originalRandom = Math.random;
    Math.random = () => 0.25;
    const unchanged = makeGrounderOutResultFromProfile(profile, profile.power, { boostRoll: 0.71 });
    Math.random = () => 0.75;
    const unchangedOther = makeGrounderOutResultFromProfile(profile, profile.power, { boostRoll: 0.71 });
    Math.random = originalRandom;
    const secondSide = makeGrounderOutResultFromProfile(profile, profile.power, { boostRoll: 0.29, sideRoll: 0.8, sideAmount: 0.4, power: 1.25 });
    const shortSide = makeGrounderOutResultFromProfile(profile, profile.power, { boostRoll: 0.29, sideRoll: 0.2, sideAmount: 0.4, power: 1.25 });
    const pulledByTiming = makeGrounderOutResultFromProfile({ ...profile, timingPull: 0.3 }, profile.power, { boostRoll: 0.29, sideRoll: 0.2, sideAmount: 0.4, power: 1.25 });
    activeBatter = { power: 9, meet: 8 };
    Math.random = () => 0.8;
    const hardContact = makeGrounderOutResultFromProfile({ ...profile, quality: 0.86, exitVelocity: 1.15 }, 0.92, { boostRoll: 0.71 });
    activeBatter = { power: 2, meet: 3 };
    Math.random = () => 0.2;
    const weakContact = makeGrounderOutResultFromProfile({ ...profile, quality: 0.18, exitVelocity: 0.28, timingPull: 0.65 }, 0.46, { boostRoll: 0.71 });
    Math.random = originalRandom;
    const secondBall = buildBattedBall(secondSide.power, secondSide.direction, secondSide.label);
    const shortBall = buildBattedBall(shortSide.power, shortSide.direction, shortSide.label);
    const gapGrounder = makeGapGrounderResult({ ...profile, direction: normalize({ x: 0.06, y: -1 }), power: 0.56 });
    const hardLaneContact = {
      quality: 0.62,
      sweetSpotScore: 0.56,
      inGoodContactZone: true
    };
    const hardLaneProfile = {
      ...profile,
      power: 0.86,
      quality: 0.62,
      exitVelocity: 0.92,
      launchAngle: 12,
      gapScore: 0.48,
      lineEdgeScore: 0.18,
      lineLinerScore: 0.18,
      sweetSpotScore: 0.56,
      direction: normalize({ x: 0.04, y: -1 })
    };
    const hardLaneAllowed = shouldRouteHardContactToOpenLane(hardLaneProfile, hardLaneContact, 0.28);
    const hardLaneResult = makeHardOpenLaneResult(hardLaneProfile);
    const centerGrounderResult = makeCenterReturnResultFromProfile({
      ...profile,
      power: 0.84,
      quality: 0.66,
      exitVelocity: 0.86,
      launchAngle: 5,
      timingPull: 0.02,
      direction: normalize({ x: 0.02, y: -1 })
    });
    const centerLinerResult = makeCenterReturnResultFromProfile({
      ...profile,
      power: 0.9,
      quality: 0.68,
      exitVelocity: 0.92,
      launchAngle: 14,
      timingPull: -0.03,
      direction: normalize({ x: -0.03, y: -1 })
    });
    const centerGrounderBall = buildBattedBall(centerGrounderResult.power, centerGrounderResult.direction, centerGrounderResult.label, centerGrounderResult.battedProfile);
    const centerLinerBall = buildBattedBall(centerLinerResult.power, centerLinerResult.direction, centerLinerResult.label, centerLinerResult.battedProfile);
    return JSON.stringify({
      chance: infieldGrounderTuning.secondShortOutBoostChance,
      powerFloor: infieldGrounderTuning.secondShortPowerFloor,
      gapMinSide: infieldGrounderTuning.gapGrounderMinSide,
      unchangedX: unchanged.direction.x,
      unchangedOtherX: unchangedOther.direction.x,
      unchangedPower: unchanged.power,
      hardPower: hardContact.power,
      weakPower: weakContact.power,
      weakX: weakContact.direction.x,
      secondX: secondSide.direction.x,
      secondPower: secondSide.power,
      secondLandingDistance: secondBall.landingDistance,
      shortX: shortSide.direction.x,
      shortLandingDistance: shortBall.landingDistance,
      pulledX: pulledByTiming.direction.x,
      gapGrounderX: Math.abs(gapGrounder.direction.x),
      gapGrounderPower: gapGrounder.power,
      hardLaneAllowed,
      hardLaneKind: hardLaneResult.kind,
      hardLaneGap: Boolean(hardLaneResult.grounderGap || hardLaneResult.lineEdge || hardLaneResult.lineLiner || hardLaneResult.gapLiner || hardLaneResult.centerReturn),
      hardLaneX: Math.abs(hardLaneResult.direction.x),
      centerGrounderFlag: Boolean(centerGrounderResult.centerReturnGrounder),
      centerGrounderBallGrounder: centerGrounderBall.isGrounder,
      centerGrounderX: Math.abs(centerGrounderBall.direction.x),
      centerLinerFlag: Boolean(centerLinerResult.centerReturnLiner),
      centerLinerBallLiner: centerLinerBall.isLiner,
      centerLinerX: Math.abs(centerLinerBall.direction.x),
      isOut: secondSide.kind === "out" && secondSide.label === hitLabels.grounder
    });
  })()`
));

assert(infieldGrounderOutBoostState.chance === 0.39, "infield grounder out boost should create slightly more deep infield grounders");
assert(infieldGrounderOutBoostState.powerFloor === 1.16, "boosted second-short grounder outs should stay firm without forcing too many automatic outs");
assert(infieldGrounderOutBoostState.gapMinSide >= 0.28, "gap grounders should be nudged away from the middle of the fielder");
assert(Math.abs(infieldGrounderOutBoostState.unchangedX - infieldGrounderOutBoostState.unchangedOtherX) > 0.02, "non-boosted grounder outs should vary their direction a little");
assert(infieldGrounderOutBoostState.unchangedPower >= 0.32 && infieldGrounderOutBoostState.unchangedPower <= 1.38, "non-boosted grounder outs should keep playable power variation");
assert(infieldGrounderOutBoostState.hardPower > infieldGrounderOutBoostState.weakPower, "better contact and power should create faster grounders");
assert(Math.abs(infieldGrounderOutBoostState.weakX) > Math.abs(infieldGrounderOutBoostState.unchangedX), "poor timing should create more directional grounder drift");
assert(infieldGrounderOutBoostState.secondX > 0.25, "boosted grounder outs should be able to target the second-base side");
assert(infieldGrounderOutBoostState.secondPower >= 1.16, "boosted second-base side grounders should not die in front of the pitcher");
assert(infieldGrounderOutBoostState.secondLandingDistance > 880, "boosted second-base side grounders should roll clearly beyond the middle infielders");
assert(infieldGrounderOutBoostState.shortX < -0.25, "boosted grounder outs should be able to target the shortstop side");
assert(infieldGrounderOutBoostState.shortLandingDistance > 880, "boosted shortstop-side grounders should roll clearly beyond the middle infielders");
assert(infieldGrounderOutBoostState.pulledX > 0.25, "timing pull should influence boosted infield grounder direction");
assert(infieldGrounderOutBoostState.gapGrounderX >= infieldGrounderOutBoostState.gapMinSide * 0.7, "gap grounders should be aimed into the lanes instead of straight at infielders");
assert(infieldGrounderOutBoostState.gapGrounderPower >= 0.66, "gap grounders should stay firm enough to challenge infield range");
assert(infieldGrounderOutBoostState.hardLaneAllowed === true, "strong low contact should sometimes be routed away from fielder-perfect lanes");
assert(infieldGrounderOutBoostState.hardLaneKind === "hit", "open-lane hard contact should become a fielding challenge instead of an automatic front-of-fielder out");
assert(infieldGrounderOutBoostState.hardLaneGap === true, "open-lane hard contact should use line, gap, or center-return batted-ball routes");
assert(infieldGrounderOutBoostState.hardLaneX <= 0.12 || infieldGrounderOutBoostState.hardLaneX >= 0.3, "open-lane hard contact should be scattered toward a lane or kept clean through the middle");
assert(infieldGrounderOutBoostState.centerGrounderFlag === true && infieldGrounderOutBoostState.centerGrounderBallGrounder === true, "clean center-return grounders should stay on the ground");
assert(infieldGrounderOutBoostState.centerGrounderX <= 0.12, "clean center-return grounders should stay near the middle");
assert(infieldGrounderOutBoostState.centerLinerFlag === true && infieldGrounderOutBoostState.centerLinerBallLiner === true, "clean center-return liners should stay as liner hits");
assert(infieldGrounderOutBoostState.centerLinerX <= 0.14, "clean center-return liners should stay near the middle");
assert(infieldGrounderOutBoostState.isOut === true, "boosted infield grounders should remain ordinary outs");

const battedProfileState = JSON.parse(runInGame(
  context,
  `(() => {
    activeBatter = findById(batters, "judge");
    activeBatterSide = "R";
    const good = buildBattedBallProfile({
      timeDiff: 8,
      quality: 0.92,
      timingScore: 0.98,
      barrelScore: 0.95,
      sweetSpotScore: 0.96,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true
    });
    const bad = buildBattedBallProfile({
      timeDiff: 280,
      quality: 0.28,
      timingScore: 0.2,
      barrelScore: 0.25,
      sweetSpotScore: 0.18,
      zoneScore: 0.26,
      plateDistance: 110,
      outsideStrikeZone: true,
      inGoodContactZone: false
    });
    const medium = buildBattedBallProfile({
      timeDiff: 95,
      quality: 0.52,
      timingScore: 0.64,
      barrelScore: 0.56,
      sweetSpotScore: 0.48,
      zoneScore: 0.7,
      plateDistance: 28,
      outsideStrikeZone: false,
      inGoodContactZone: true
    });
    const nearCenter = buildBattedBallProfile({
      timeDiff: 8,
      quality: 0.72,
      timingScore: 0.9,
      barrelScore: 0.9,
      sweetSpotScore: 0.84,
      zoneScore: 0.94,
      plateDistance: 4,
      outsideStrikeZone: false,
      inGoodContactZone: true
    });
    const center = buildBattedBallProfile({
      timeDiff: 8,
      quality: 0.72,
      timingScore: 0.9,
      barrelScore: 0.9,
      sweetSpotScore: 1,
      zoneScore: 0.94,
      plateDistance: 4,
      outsideStrikeZone: false,
      inGoodContactZone: true
    });
    const hittableMistake = buildBattedBallProfile({
      timeDiff: 14,
      quality: 0.78,
      timingScore: 0.94,
      barrelScore: 0.9,
      sweetSpotScore: 0.9,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true
    });
    const originalRandom = Math.random;
    Math.random = () => 0.62;
    const centerDriveResult = decideHitResultFromBattedProfile({
      timeDiff: 14,
      quality: 0.78,
      timingScore: 0.94,
      barrelScore: 0.9,
      sweetSpotScore: 0.9,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true
    });
    Math.random = () => 0.3;
    const centerDriveWallBall = buildBattedBall(centerDriveResult.power, normalize({ x: 0.04, y: -1 }), centerDriveResult.label);
    Math.random = () => 0.99;
    const centerDriveHomerBall = buildBattedBall(centerDriveResult.power, normalize({ x: 0.04, y: -1 }), centerDriveResult.label);
    Math.random = () => 0.6;
    const offTimingCenterDriveResult = decideHitResultFromBattedProfile({
      timeDiff: 185,
      quality: 0.66,
      timingScore: 0.58,
      barrelScore: 0.78,
      sweetSpotScore: 0.78,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true
    });
    Math.random = () => 0.58;
    const forgivingCenterDriveResult = decideHitResultFromBattedProfile({
      timeDiff: 230,
      quality: 0.48,
      timingScore: 0.48,
      barrelScore: 0.64,
      sweetSpotScore: 0.56,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true
    });
    Math.random = () => 0.3;
    const veryForgivingCenterDriveResult = decideHitResultFromBattedProfile({
      timeDiff: 255,
      quality: 0.45,
      timingScore: 0.45,
      barrelScore: 0.62,
      sweetSpotScore: 0.52,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true
    });
    Math.random = () => 0.42;
    const looseCenterDriveResult = decideHitResultFromBattedProfile({
      timeDiff: 215,
      quality: 0.3,
      timingScore: 0.42,
      barrelScore: 0.46,
      sweetSpotScore: 0.24,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true
    });
    const hardLowLift = buildBattedBallProfile({
      timeDiff: 120,
      quality: 0.58,
      timingScore: 0.66,
      barrelScore: 0.74,
      sweetSpotScore: 0.26,
      zoneScore: 0.9,
      plateDistance: 14,
      outsideStrikeZone: false,
      inGoodContactZone: true
    });
    const gapLinerDirectionResult = makeGapLinerResult(hardLowLift);
    const gapLinerBall = buildBattedBall(gapLinerDirectionResult.power, gapLinerDirectionResult.direction, gapLinerDirectionResult.label);
    const liftedGenericResult = promoteLiftedContactResult({
      label: hitLabels.single,
      kind: "hit",
      power: hardLowLift.power,
      scoreType: "single",
      gapLiner: true,
      battedProfile: hardLowLift
    });
    const chasedOutside = buildBattedBallProfile({
      timeDiff: 14,
      quality: 0.78,
      timingScore: 0.94,
      barrelScore: 0.9,
      sweetSpotScore: 0.9,
      zoneScore: 0.44,
      plateDistance: 72,
      outsideStrikeZone: true,
      inGoodContactZone: false
    });
    Math.random = () => 0.2;
    const outsideDecision = decideHitResultFromBattedProfile({
      x: field.plateX + 92,
      y: field.plateY,
      timeDiff: 18,
      quality: 0.34,
      timingScore: 0.72,
      barrelScore: 0.62,
      sweetSpotScore: 0.58,
      zoneScore: 0.28,
      plateDistance: 92,
      outsideStrikeZone: true,
      inGoodContactZone: false,
      yellowZoneBoost: 0
    });
    Math.random = () => 0.5;
    const insideChasePopup = decideHitResultFromBattedProfile({
      x: field.plateX - 72,
      y: field.plateY,
      timeDiff: 18,
      quality: 0.72,
      timingScore: 0.9,
      barrelScore: 0.82,
      sweetSpotScore: 0.82,
      zoneScore: 0.26,
      plateDistance: 98,
      outsideStrikeZone: true,
      inGoodContactZone: false,
      yellowZoneBoost: 0
    });
    Math.random = originalRandom;
    const yellowZoneBoost = getYellowZoneContactBoost(true, false, 1);
    const yellowCenterBoost = getYellowZoneContactBoost(true, false, 1);
    const yellowHighBoost = getYellowZoneContactBoost(true, true, 1);
    const yellowZoneNoBoost = buildBattedBallProfile({
      timeDiff: 26,
      quality: 0.58,
      timingScore: 0.78,
      barrelScore: 0.72,
      sweetSpotScore: 0.72,
      zoneScore: 0.82,
      plateDistance: 18,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      yellowZoneBoost: 0
    });
    const yellowZoneBoosted = buildBattedBallProfile({
      timeDiff: 26,
      quality: 0.58 + yellowZoneBoost,
      timingScore: 0.78,
      barrelScore: 0.72,
      sweetSpotScore: 0.72,
      zoneScore: 0.82,
      plateDistance: 18,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      yellowZoneBoost
    });
    Math.random = () => 0.5;
    const yellowZoneResult = decideHitResultFromBattedProfile({
      timeDiff: 26,
      quality: 0.58 + yellowZoneBoost,
      timingScore: 0.78,
      barrelScore: 0.72,
      sweetSpotScore: 0.72,
      zoneScore: 0.82,
      plateDistance: 18,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      yellowZoneBoost
    });
    Math.random = () => 0.55;
    const yellowFenceResult = decideHitResultFromBattedProfile({
      timeDiff: 18,
      quality: 0.72 + yellowZoneBoost,
      timingScore: 0.88,
      barrelScore: 0.82,
      sweetSpotScore: 0.82,
      zoneScore: 0.86,
      plateDistance: 12,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      yellowZoneBoost
    });
    Math.random = () => 0.24;
    const yellowLineLinerResult = decideHitResultFromBattedProfile({
      timeDiff: 92,
      quality: 0.7 + yellowZoneBoost,
      timingScore: 0.86,
      barrelScore: 0.82,
      sweetSpotScore: 0.74,
      zoneScore: 0.86,
      plateDistance: 12,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      yellowZoneBoost
    });
    Math.random = () => 0.86;
    const yellowDeepDriveResult = decideHitResultFromBattedProfile({
      timeDiff: 16,
      quality: 0.82 + yellowZoneBoost,
      timingScore: 0.94,
      barrelScore: 0.9,
      sweetSpotScore: 0.9,
      zoneScore: 0.92,
      plateDistance: 8,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      yellowZoneBoost
    });
    Math.random = () => 0.3;
    const yellowDeepDriveWallBall = buildBattedBall(yellowDeepDriveResult.power, normalize({ x: 0.04, y: -1 }), yellowDeepDriveResult.label);
    Math.random = () => 0.99;
    const yellowDeepDriveHomerBall = buildBattedBall(yellowDeepDriveResult.power, normalize({ x: 0.04, y: -1 }), yellowDeepDriveResult.label);
    Math.random = () => 0.58;
    const yellowDropResult = decideHitResultFromBattedProfile({
      timeDiff: 42,
      quality: 0.56 + yellowZoneBoost,
      timingScore: 0.8,
      barrelScore: 0.7,
      sweetSpotScore: 0.66,
      zoneScore: 0.8,
      plateDistance: 22,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      yellowZoneBoost
    });
    Math.random = () => 0.99;
    const yellowFallbackResult = decideHitResultFromBattedProfile({
      timeDiff: 54,
      quality: 0.5 + yellowZoneBoost,
      timingScore: 0.72,
      barrelScore: 0.64,
      sweetSpotScore: 0.6,
      zoneScore: 0.78,
      plateDistance: 24,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      yellowZoneBoost
    });
    const yellowPopupEscape = decideHitResultFromBattedProfile({
      timeDiff: 12,
      quality: 0.62 + yellowZoneBoost,
      timingScore: 0.86,
      barrelScore: 0.76,
      sweetSpotScore: 0.82,
      zoneScore: 0.84,
      plateDistance: 16,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      yellowZoneBoost
    });
    Math.random = () => 0.96;
    const yellowCenterResult = decideHitResultFromBattedProfile({
      timeDiff: 18,
      quality: 0.56 + yellowCenterBoost,
      timingScore: 0.78,
      barrelScore: 0.72,
      sweetSpotScore: 0.7,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      yellowZoneBoost: yellowCenterBoost
    });
    Math.random = () => 0.9;
    const yellowHighOutsideResult = decideHitResultFromBattedProfile({
      timeDiff: 20,
      quality: 0.54 + yellowHighBoost,
      timingScore: 0.76,
      barrelScore: 0.7,
      sweetSpotScore: 0.68,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: true,
      inGoodContactZone: true,
      yellowZoneBoost: yellowHighBoost
    });
    const yellowHighOutsideProfile = buildBattedBallProfile({
      timeDiff: 20,
      quality: 0.54 + yellowHighBoost,
      timingScore: 0.76,
      barrelScore: 0.7,
      sweetSpotScore: 0.68,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: true,
      inGoodContactZone: true,
      yellowZoneBoost: yellowHighBoost
    });
    const oppositeLineDropProfile = buildBattedBallProfile({
      timeDiff: 220,
      quality: 0.54,
      timingScore: 0.56,
      barrelScore: 0.58,
      sweetSpotScore: 0.42,
      zoneScore: 0.72,
      plateDistance: 24,
      outsideStrikeZone: false,
      inGoodContactZone: false
    });
    const pulledLineDropProfile = buildBattedBallProfile({
      timeDiff: -220,
      quality: 0.54,
      timingScore: 0.56,
      barrelScore: 0.58,
      sweetSpotScore: 0.42,
      zoneScore: 0.72,
      plateDistance: 24,
      outsideStrikeZone: false,
      inGoodContactZone: false
    });
    const oppositeLineDropDecision = decideNormalZoneHitResult({
      ...oppositeLineDropProfile,
      launchAngle: 20,
      exitVelocity: 0.64,
      frontDropScore: 0.1,
      fenceLinerScore: 0.1,
      lineEdgeScore: 0.01,
      lineLinerScore: 0.1,
      lineDropScore: 0.3,
      oppositeFieldContact: 0.72
    }, {
      quality: 0.5,
      timingScore: 0.56,
      sweetSpotScore: 0.42,
      zoneScore: 0.72,
      inGoodContactZone: false
    }, 0.4);
    const goodGapGrounderDecision = decideNormalZoneHitResult({
      ...oppositeLineDropProfile,
      launchAngle: 12,
      exitVelocity: 0.72,
      gapScore: 0.42,
      direction: normalize({ x: 0.24, y: -1 }),
      frontDropScore: 0.1,
      fenceLinerScore: 0.1,
      lineEdgeScore: 0.01,
      lineLinerScore: 0.1,
      lineDropScore: 0.1
    }, {
      quality: 0.52,
      timingScore: 0.62,
      sweetSpotScore: 0.48,
      zoneScore: 0.58,
      inGoodContactZone: true
    }, 0.48);
    const goodLineEdgeDecision = decideNormalZoneHitResult({
      ...oppositeLineDropProfile,
      launchAngle: 23,
      exitVelocity: 0.82,
      gapScore: 0.1,
      frontDropScore: 0.1,
      fenceLinerScore: 0.1,
      lineEdgeScore: 0.36,
      lineLinerScore: 0.1,
      lineDropScore: 0.1
    }, {
      quality: 0.54,
      timingScore: 0.62,
      sweetSpotScore: 0.48,
      zoneScore: 0.58,
      inGoodContactZone: true
    }, 0.44);
    const lowLineEdgeLinerDecision = decideNormalZoneHitResult({
      ...oppositeLineDropProfile,
      launchAngle: 20,
      exitVelocity: 0.68,
      gapScore: 0.12,
      direction: normalize({ x: 0.3, y: -1 }),
      frontDropScore: 0.08,
      fenceLinerScore: 0.08,
      lineEdgeScore: 0.2,
      lineLinerScore: 0.12,
      lineDropScore: 0.08
    }, {
      quality: 0.48,
      timingScore: 0.62,
      sweetSpotScore: 0.48,
      zoneScore: 0.58,
      inGoodContactZone: true
    }, 0.5);
    const lowLineEdgeGrounderDecision = decideNormalZoneHitResult({
      ...oppositeLineDropProfile,
      launchAngle: 10,
      exitVelocity: 0.62,
      gapScore: 0.12,
      direction: normalize({ x: -0.34, y: -1 }),
      frontDropScore: 0.08,
      fenceLinerScore: 0.08,
      lineEdgeScore: 0.18,
      lineLinerScore: 0.08,
      lineDropScore: 0.08
    }, {
      quality: 0.46,
      timingScore: 0.62,
      sweetSpotScore: 0.46,
      zoneScore: 0.58,
      inGoodContactZone: true
    }, 0.48);
    const fenceLinerDecision = decideNormalZoneHitResult({
      ...oppositeLineDropProfile,
      launchAngle: 27,
      exitVelocity: 0.94,
      carry: 0.9,
      gapScore: 0.14,
      direction: normalize({ x: 0.06, y: -1 }),
      frontDropScore: 0.08,
      fenceLinerScore: 0.34,
      lineEdgeScore: 0.08,
      lineLinerScore: 0.08,
      lineDropScore: 0.08
    }, {
      quality: 0.54,
      timingScore: 0.74,
      sweetSpotScore: 0.58,
      zoneScore: 0.82,
      inGoodContactZone: true
    }, 0.42);
    const goodLineDropDecision = decideNormalZoneHitResult({
      ...oppositeLineDropProfile,
      launchAngle: 22,
      exitVelocity: 0.74,
      gapScore: 0.1,
      frontDropScore: 0.1,
      fenceLinerScore: 0.1,
      lineEdgeScore: 0.1,
      lineLinerScore: 0.1,
      lineDropScore: 0.28
    }, {
      quality: 0.48,
      timingScore: 0.62,
      sweetSpotScore: 0.44,
      zoneScore: 0.58,
      inGoodContactZone: true
    }, 0.38);
    const widerCenterLinerDecision = decideNormalZoneHitResult({
      ...oppositeLineDropProfile,
      launchAngle: 16,
      exitVelocity: 0.58,
      quality: 0.34,
      gapScore: 0.18,
      direction: normalize({ x: 0.11, y: -1 }),
      timingPull: 0.18,
      frontDropScore: 0.08,
      fenceLinerScore: 0.08,
      lineEdgeScore: 0.04,
      lineLinerScore: 0.12,
      lineDropScore: 0.08
    }, {
      quality: 0.34,
      timingScore: 0.58,
      sweetSpotScore: 0.34,
      zoneScore: 0.78,
      inGoodContactZone: true
    }, 0.62);
    const easierLineEdgeDecision = decideNormalZoneHitResult({
      ...oppositeLineDropProfile,
      launchAngle: 18,
      exitVelocity: 0.56,
      quality: 0.34,
      gapScore: 0.12,
      direction: normalize({ x: 0.14, y: -1 }),
      timingPull: 0.12,
      frontDropScore: 0.08,
      fenceLinerScore: 0.08,
      lineEdgeScore: 0.08,
      lineLinerScore: 0.1,
      lineDropScore: 0.08
    }, {
      quality: 0.34,
      timingScore: 0.58,
      sweetSpotScore: 0.34,
      zoneScore: 0.72,
      inGoodContactZone: true
    }, 0.82);
    activeBatter = { power: 2, meet: 8 };
    activePitcher = { stuff: 5 };
    const lowPowerGoodContact = {
      timeDiff: 20,
      quality: 0.84,
      timingScore: 0.86,
      barrelScore: 0.86,
      sweetSpotScore: 0.84,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true
    };
    const lowPowerGoodProfile = buildBattedBallProfile(lowPowerGoodContact);
    const lowPowerGoodResult = applyFeedbackQualityHitUpgrade(
      { label: hitLabels.routineFly, kind: "out", routineFly: true, power: 0.58 },
      lowPowerGoodProfile,
      lowPowerGoodContact
    );
    const lowPowerGoodBall = buildBattedBall(lowPowerGoodResult.power, lowPowerGoodResult.direction || normalize({ x: 0.04, y: -1 }), lowPowerGoodResult.label, lowPowerGoodResult.battedProfile);
    const lowPowerEliteContact = {
      timeDiff: 4,
      quality: 0.98,
      timingScore: 0.98,
      barrelScore: 0.98,
      sweetSpotScore: 0.98,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true
    };
    const lowPowerEliteProfile = buildBattedBallProfile(lowPowerEliteContact);
    const lowPowerEliteResult = applyFeedbackQualityHitUpgrade(
      { label: hitLabels.single, kind: "hit", scoreType: "single", power: 0.72 },
      lowPowerEliteProfile,
      lowPowerEliteContact
    );
    Math.random = () => 0.99;
    const lowPowerEliteBall = buildBattedBall(lowPowerEliteResult.power, lowPowerEliteResult.direction || normalize({ x: 0.04, y: -1 }), lowPowerEliteResult.label, lowPowerEliteResult.battedProfile);
    Math.random = originalRandom;
    return JSON.stringify({
      goodExitVelocity: good.exitVelocity,
      badExitVelocity: bad.exitVelocity,
      goodCarry: good.carry,
      badCarry: bad.carry,
      goodSpin: good.spin,
      badSpin: bad.spin,
      goodLaunchAngle: good.launchAngle,
      goodContactEaseScale,
      mediumExitVelocity: medium.exitVelocity,
      mediumLaunchAngle: medium.launchAngle,
      mediumSpin: medium.spin,
      nearCenterPower: nearCenter.power,
      centerPower: center.power,
      centerBoost: center.sweetSpotCenterBoost,
      centerFenceEdgeScore: center.fenceEdgeFlyScore,
      centerToweringFlyScore: center.toweringFlyScore,
      mistakeExitVelocity: hittableMistake.exitVelocity,
      mistakeCarry: hittableMistake.carry,
      mistakeLaunchAngle: hittableMistake.launchAngle,
      mistakeFenceEdgeScore: hittableMistake.fenceEdgeFlyScore,
      centerDriveKind: centerDriveResult.kind,
      centerDriveFenceEdge: Boolean(centerDriveResult.fenceEdgeFly),
      centerDriveDeepDrive: Boolean(centerDriveResult.deepDrive),
      centerDriveFenceLiner: Boolean(centerDriveResult.fenceLiner),
      centerDriveRoutineFly: Boolean(centerDriveResult.routineFly),
      centerDriveWallHit: centerDriveWallBall.wallHit,
      centerDriveHomerOver: centerDriveHomerBall.fenceOver,
      offTimingCenterDriveKind: offTimingCenterDriveResult.kind,
      offTimingCenterDriveFenceEdge: Boolean(offTimingCenterDriveResult.fenceEdgeFly),
      offTimingCenterDriveDeepDrive: Boolean(offTimingCenterDriveResult.deepDrive),
      offTimingCenterDriveRoutineFly: Boolean(offTimingCenterDriveResult.routineFly),
      forgivingCenterDriveKind: forgivingCenterDriveResult.kind,
      forgivingCenterDriveFenceEdge: Boolean(forgivingCenterDriveResult.fenceEdgeFly),
      forgivingCenterDriveDeepDrive: Boolean(forgivingCenterDriveResult.deepDrive),
      forgivingCenterDriveGapLiner: Boolean(forgivingCenterDriveResult.gapLiner),
      forgivingCenterDriveRoutineFly: Boolean(forgivingCenterDriveResult.routineFly),
      veryForgivingCenterDriveKind: veryForgivingCenterDriveResult.kind,
      veryForgivingCenterDriveDeepDrive: Boolean(veryForgivingCenterDriveResult.deepDrive),
      veryForgivingCenterDriveFenceEdge: Boolean(veryForgivingCenterDriveResult.fenceEdgeFly),
      veryForgivingCenterDriveGapLiner: Boolean(veryForgivingCenterDriveResult.gapLiner),
      veryForgivingCenterDriveGrounder: Boolean(veryForgivingCenterDriveResult.grounderGap),
      looseCenterDriveKind: looseCenterDriveResult.kind,
      looseCenterDriveGrounder: Boolean(looseCenterDriveResult.grounderGap),
      looseCenterDriveFenceEdge: Boolean(looseCenterDriveResult.fenceEdgeFly),
      looseCenterDriveDeepDrive: Boolean(looseCenterDriveResult.deepDrive),
      hardLowLiftExitVelocity: hardLowLift.exitVelocity,
      hardLowLiftLaunchAngle: hardLowLift.launchAngle,
      gapLinerHasDirection: Boolean(gapLinerDirectionResult.direction),
      gapLinerIsLiner: gapLinerBall.isLiner,
      gapLinerMaxHeight: gapLinerBall.maxHeight,
      gapLinerLaneWidth: Math.abs(gapLinerDirectionResult.direction.x),
      liftedGenericFenceEdge: Boolean(liftedGenericResult.fenceEdgeFly),
      liftedGenericDeepDrive: Boolean(liftedGenericResult.deepDrive),
      liftedGenericGrounder: Boolean(liftedGenericResult.grounderGap),
      outsideExitVelocity: chasedOutside.exitVelocity,
      outsideCarry: chasedOutside.carry,
      outsideLaunchAngle: chasedOutside.launchAngle,
      outsideFenceEdgeScore: chasedOutside.fenceEdgeFlyScore,
      outsideToweringFlyScore: chasedOutside.toweringFlyScore,
      outsideZoneDrag: chasedOutside.outsideZoneDrag,
      outsideDecisionKind: outsideDecision.kind,
      outsideDecisionLabel: outsideDecision.label,
      insideChasePopupKind: insideChasePopup.kind,
      insideChasePopupFly: Boolean(insideChasePopup.popupFly),
      yellowZoneBoost,
      yellowCenterBoost,
      yellowHighBoost,
      yellowNoBoostPower: yellowZoneNoBoost.power,
      yellowBoostedPower: yellowZoneBoosted.power,
      yellowNoBoostCarry: yellowZoneNoBoost.carry,
      yellowBoostedCarry: yellowZoneBoosted.carry,
      yellowBoostedLaunchAngle: yellowZoneBoosted.launchAngle,
      yellowResultKind: yellowZoneResult.kind,
      yellowResultRoutineFly: Boolean(yellowZoneResult.routineFly),
      yellowFenceKind: yellowFenceResult.kind,
      yellowFenceEdge: Boolean(yellowFenceResult.fenceEdgeFly),
      yellowFenceDeepDrive: Boolean(yellowFenceResult.deepDrive),
      yellowFenceLiner: Boolean(yellowFenceResult.fenceLiner),
      yellowLineLinerKind: yellowLineLinerResult.kind,
      yellowLineLiner: Boolean(yellowLineLinerResult.lineLiner),
      yellowLineLinerFenceEdge: Boolean(yellowLineLinerResult.fenceEdgeFly),
      yellowLineLinerDeepDrive: Boolean(yellowLineLinerResult.deepDrive),
      yellowDeepDriveKind: yellowDeepDriveResult.kind,
      yellowDeepDrive: Boolean(yellowDeepDriveResult.deepDrive),
      yellowDeepDriveWallHit: yellowDeepDriveWallBall.wallHit,
      yellowDeepDriveHomerOver: yellowDeepDriveHomerBall.fenceOver,
      yellowDropKind: yellowDropResult.kind,
      yellowDropLineDrop: Boolean(yellowDropResult.lineDrop),
      yellowDropRoutineFly: Boolean(yellowDropResult.routineFly),
      yellowDropPopup: Boolean(yellowDropResult.popupFly),
      yellowFallbackKind: yellowFallbackResult.kind,
      yellowFallbackLabel: yellowFallbackResult.label,
      yellowFallbackFrontDrop: Boolean(yellowFallbackResult.frontDrop),
      yellowFallbackLowOutfield: Boolean(yellowFallbackResult.lineDrop || yellowFallbackResult.lineLiner || yellowFallbackResult.gapLiner || yellowFallbackResult.lineEdge || yellowFallbackResult.lineEdgeGrounder),
      yellowPopupEscapeKind: yellowPopupEscape.kind,
      yellowPopupEscapePopup: Boolean(yellowPopupEscape.popupFly),
      yellowCenterKind: yellowCenterResult.kind,
      yellowCenterRoutineFly: Boolean(yellowCenterResult.routineFly),
      yellowCenterPopup: Boolean(yellowCenterResult.popupFly),
      yellowHighOutsideKind: yellowHighOutsideResult.kind,
      yellowHighOutsideRoutineFly: Boolean(yellowHighOutsideResult.routineFly),
      yellowHighOutsidePopup: Boolean(yellowHighOutsideResult.popupFly),
      yellowHighOutsideDrag: yellowHighOutsideProfile.outsideZoneDrag,
      yellowHighOutsideFenceScore: yellowHighOutsideProfile.fenceEdgeFlyScore,
      oppositeLineDropContact: oppositeLineDropProfile.oppositeFieldContact,
      pulledLineDropContact: pulledLineDropProfile.pulledContact,
      oppositeLineDropScore: oppositeLineDropProfile.lineDropScore,
      pulledLineDropScore: pulledLineDropProfile.lineDropScore,
      oppositeLineDropDecision: Boolean(oppositeLineDropDecision.lineDrop || oppositeLineDropDecision.lineEdge),
      goodLowDriveLaneDecision: Boolean(goodGapGrounderDecision.grounderGap || goodGapGrounderDecision.lineLiner || goodGapGrounderDecision.lineEdge || goodGapGrounderDecision.lineDrop),
      goodLineEdgeDecision: Boolean(goodLineEdgeDecision.lineEdge) && goodLineEdgeDecision.scoreType === "double",
      lowLineEdgeLinerDecision: Boolean(lowLineEdgeLinerDecision.lineEdge) && lowLineEdgeLinerDecision.scoreType === "double",
      lowLineEdgeGrounderDecision: Boolean(lowLineEdgeGrounderDecision.lineEdgeGrounder) && lowLineEdgeGrounderDecision.scoreType === "double",
      fenceLinerDecision: Boolean(fenceLinerDecision.fenceLiner),
      goodLineDropDecision: Boolean(goodLineDropDecision.lineDrop || goodLineDropDecision.lineEdge),
      widerCenterLinerDecision: Boolean(widerCenterLinerDecision.centerReturnLiner),
      easierLineEdgeDecision: Boolean(easierLineEdgeDecision.lineEdge) && easierLineEdgeDecision.scoreType === "double",
      lowPowerGoodExitVelocity: lowPowerGoodProfile.exitVelocity,
      lowPowerGoodCarry: lowPowerGoodProfile.carry,
      lowPowerGoodStrongHit: lowPowerGoodResult.kind === "hit" && !lowPowerGoodResult.routineFly,
      lowPowerGoodBallSpeed: lowPowerGoodBall.exitSpeedKmh,
      lowPowerEliteFenceThreat: Boolean(lowPowerEliteResult.fenceEdgeFly || lowPowerEliteResult.deepDrive),
      lowPowerEliteHomerPossible: lowPowerEliteBall.fenceOver,
      lowPowerEliteHomerMeters: lowPowerEliteBall.flightDistanceMeters
    });
  })()`
));

assert(battedProfileState.goodExitVelocity > battedProfileState.badExitVelocity, "good contact should produce higher exit velocity");
assert(battedProfileState.goodCarry > battedProfileState.badCarry, "good contact should carry farther");
assert(battedProfileState.goodSpin < battedProfileState.badSpin, "mishits should add more spin and drag");
assert(battedProfileState.goodLaunchAngle >= 34, "good contact should be able to lift outfield fly balls");
assert(battedProfileState.goodContactEaseScale === 1.2, "good-contact ease should make strong contact roughly twenty percent more accessible");
assert(battedProfileState.mediumExitVelocity > 0.55, "medium contact should still produce useful exit velocity");
assert(battedProfileState.mediumLaunchAngle >= 18, "medium contact should not stay too grounder-heavy");
assert(battedProfileState.mediumLaunchAngle <= 68, "medium contact should stay within the playable launch-angle cap");
assert(battedProfileState.mediumSpin < 0.75, "medium contact should avoid excessive mishit spin");
assert(battedProfileState.centerBoost >= 0.095, "centered sweet-spot contact should receive the roughly ten-percent clean-hit boost");
assert(battedProfileState.centerPower > battedProfileState.nearCenterPower, "centered sweet-spot contact should create more clean impact than near-center contact");
assert(battedProfileState.centerFenceEdgeScore >= 0.45 || battedProfileState.centerToweringFlyScore >= 0.42, "centered sweet-spot contact should more often threaten a big outfield fly");
assert(battedProfileState.mistakeExitVelocity > battedProfileState.outsideExitVelocity + 0.35, "mistake pitches should produce much harder contact than chased pitches");
assert(battedProfileState.mistakeCarry > battedProfileState.outsideCarry + 0.45, "mistake pitches should carry much farther than chased pitches");
assert(battedProfileState.mistakeFenceEdgeScore > battedProfileState.outsideFenceEdgeScore * 2.5, "mistake pitches should be far more likely to threaten the fence");
assert(battedProfileState.centerDriveKind === "hit", "middle-zone mistake contact should create a threatening drive");
assert(battedProfileState.centerDriveFenceEdge || battedProfileState.centerDriveDeepDrive || battedProfileState.centerDriveFenceLiner, "middle-zone mistake contact should be able to lift toward the fence");
assert(battedProfileState.centerDriveRoutineFly === false, "middle-zone mistake contact should not fall back to a routine fly first");
assert(battedProfileState.centerDriveWallHit === true, "middle-zone mistake contact should be able to hit the fence");
assert(battedProfileState.centerDriveHomerOver === true, "middle-zone mistake contact should be able to clear the fence");
assert(["hit", "out"].includes(battedProfileState.offTimingCenterDriveKind), "slightly off-timing middle-zone contact should resolve as a playable ball");
assert(battedProfileState.forgivingCenterDriveKind === "hit", "forgiving middle-zone contact should still be a hit");
assert(battedProfileState.forgivingCenterDriveRoutineFly === false, "forgiving middle-zone contact should not become a routine fly");
assert(battedProfileState.veryForgivingCenterDriveKind === "hit", "very forgiving middle-zone contact should still be a hit");
assert(battedProfileState.veryForgivingCenterDriveGrounder === false, "very forgiving middle-zone contact should not stay as a grounder");
assert(["hit", "out", "foul"].includes(battedProfileState.looseCenterDriveKind), "loose middle-zone contact should resolve as a playable result under stronger stuff pressure");
assert(battedProfileState.looseCenterDriveGrounder === false, "loose middle-zone contact should not stay as a grounder");
assert(battedProfileState.hardLowLiftExitVelocity >= 0.9, "hard contact should keep strong exit velocity");
assert(battedProfileState.hardLowLiftLaunchAngle >= 24, "hard contact should lift even when the sweet spot is imperfect");
assert(battedProfileState.gapLinerHasDirection === true, "gap-liner results should preserve the profile hit direction");
assert(battedProfileState.gapLinerIsLiner === true, "gap-liner singles should remain liner trajectories instead of becoming routine flies");
assert(battedProfileState.gapLinerMaxHeight >= 48, "gap-liner singles should have enough height to clear infielders more often");
assert(battedProfileState.gapLinerLaneWidth >= 0.28, "gap-liner singles should be scattered into lanes instead of staying at middle infielders");
assert(battedProfileState.liftedGenericFenceEdge || battedProfileState.liftedGenericDeepDrive, "lifted strong contact should not lose its launch angle when converted to a play result");
assert(battedProfileState.liftedGenericGrounder === false, "lifted strong contact should not remain a grounder-style result");
assert(battedProfileState.outsideToweringFlyScore < 0.12, "outside-zone chased pitches should rarely become towering extra-base flies");
assert(battedProfileState.outsideZoneDrag >= 0.16, "outside-zone chased pitches should receive long-ball drag");
assert(["out", "hit"].includes(battedProfileState.outsideDecisionKind), "outside-zone hit decision should resolve without falling through or throwing");
assert(typeof battedProfileState.outsideDecisionLabel === "string", "outside-zone hit decision should return a visible result label");
assert(battedProfileState.insideChasePopupKind === "out" && battedProfileState.insideChasePopupFly === true, "inside chased balls should more often turn into popup flies");
assert(battedProfileState.yellowZoneBoost >= 0.37, "yellow-zone edge contact should receive the stronger good-contact chance boost");
assert(battedProfileState.yellowCenterBoost >= 0.55, "yellow-zone center contact should receive the full strong boost");
assert(battedProfileState.yellowHighBoost >= 0.55, "yellow-zone contact above the plate should still receive the full boost");
assert(battedProfileState.yellowBoostedPower > battedProfileState.yellowNoBoostPower, "yellow-zone contact boost should create better contact");
assert(battedProfileState.yellowBoostedCarry >= battedProfileState.yellowNoBoostCarry, "yellow-zone contact boost should preserve or improve carry");
assert(battedProfileState.yellowBoostedLaunchAngle >= 24, "yellow-zone contact boost should lift strong contact toward fence drives");
assert(battedProfileState.yellowResultKind === "hit", "yellow-zone boosted contact should turn catchable fly outcomes into hittable liners");
assert(battedProfileState.yellowResultRoutineFly === false, "yellow-zone boosted contact should not be routed to a routine fly");
assert(battedProfileState.yellowFenceKind === "hit", "strong yellow-zone contact should be able to threaten the fence");
assert(battedProfileState.yellowFenceEdge || battedProfileState.yellowFenceDeepDrive || battedProfileState.yellowFenceLiner, "strong yellow-zone contact should create fence-threatening hits");
assert(battedProfileState.yellowLineLinerKind === "hit", "strong yellow-zone contact should create driven liner hits");
assert(battedProfileState.yellowDeepDriveKind === "hit", "excellent yellow-zone contact should create deep drives");
assert(battedProfileState.yellowDeepDrive === true, "excellent yellow-zone contact should have a fence-threatening deep-drive route");
assert(battedProfileState.yellowDeepDriveWallHit === true, "excellent yellow-zone deep drives should be able to hit the fence");
assert(battedProfileState.yellowDeepDriveHomerOver === true, "excellent yellow-zone deep drives should be able to clear the fence");
assert(battedProfileState.yellowDropKind === "hit", "yellow-zone contact should create drop hits");
assert(battedProfileState.yellowDropRoutineFly === false && battedProfileState.yellowDropPopup === false, "yellow-zone contact should not collapse into easy fly outs");
assert(["hit", "out", "foul"].includes(battedProfileState.yellowFallbackKind), "yellow-zone fallback should always return a concrete play result");
assert(typeof battedProfileState.yellowFallbackLabel === "string", "yellow-zone fallback should return a visible label");
assert(battedProfileState.yellowFallbackFrontDrop === false, "yellow-zone fallback hits should avoid overusing soft front-drop bloopers");
assert(battedProfileState.yellowFallbackLowOutfield === true, "yellow-zone fallback hits should favor low outfield, line-drop, or sharp line-edge hits");
assert(battedProfileState.yellowPopupEscapeKind === "hit", "yellow-zone boosted high contact should escape pitcher-fly outcomes");
assert(battedProfileState.yellowPopupEscapePopup === false, "yellow-zone boosted high contact should not become a popup fly");
assert(battedProfileState.yellowCenterKind === "hit", "yellow-zone center contact should be easy to hit");
assert(battedProfileState.yellowCenterRoutineFly === false, "yellow-zone center contact should not become a routine fly");
assert(battedProfileState.yellowCenterPopup === false, "yellow-zone center contact should not become a popup fly");
assert(battedProfileState.yellowHighOutsideKind === "hit", "yellow-zone contact above the plate should still route to a hit");
assert(battedProfileState.yellowHighOutsideRoutineFly === false, "yellow-zone contact above the plate should not become a routine fly");
assert(battedProfileState.yellowHighOutsidePopup === false, "yellow-zone contact above the plate should not become a popup fly");
assert(battedProfileState.yellowHighOutsideDrag === 0, "yellow-zone contact above the plate should not receive outside-zone long-ball drag");
assert(battedProfileState.yellowHighOutsideFenceScore > 0.4, "yellow-zone contact above the plate should still threaten strong contact");
assert(battedProfileState.oppositeLineDropContact > 0.45, "late opposite-field contact should be tracked for line-drop results");
assert(battedProfileState.pulledLineDropContact > 0.45, "early pulled contact should still be tracked separately");
assert(battedProfileState.oppositeLineDropScore > 0.18, "opposite-field late contact should be a strong line-drop candidate");
assert(battedProfileState.pulledLineDropScore > 0.18, "early pulled contact should also be a strong line-drop candidate");
assert(battedProfileState.oppositeLineDropDecision === true, "late opposite-field low liners should be able to resolve as line drops or sharp line-edge hits before generic liners");
assert(battedProfileState.goodLowDriveLaneDecision === true, "well-hit low balls should be able to become hard low liners, line-edge hits, or grounders through the lanes");
assert(battedProfileState.goodLineEdgeDecision === true, "well-hit pulled or opposite balls should be able to become extra-base line-edge hits");
assert(battedProfileState.lowLineEdgeLinerDecision === true, "low side-driven liners should more often become line-edge hits");
assert(battedProfileState.lowLineEdgeGrounderDecision === true, "low side-driven grounders should more often become sharp line-edge grounders");
assert(battedProfileState.fenceLinerDecision === true, "hard low lifted contact should more often become fence-liner candidates");
assert(battedProfileState.goodLineDropDecision === true, "well-hit low liners should be able to drop in front of the outfielders or rip down the line");
assert(battedProfileState.widerCenterLinerDecision === true, "slightly wider strong center contact should resolve as a center-return liner more often");
assert(battedProfileState.easierLineEdgeDecision === true, "moderately side-driven strong contact should resolve as a line-edge hit more often");
assert(battedProfileState.lowPowerGoodExitVelocity >= 1.0, "low-power hitters should still create strong exit velocity on 75-plus quality contact");
assert(battedProfileState.lowPowerGoodCarry >= 1.0, "low-power hitters should still create meaningful carry on 75-plus quality contact");
assert(battedProfileState.lowPowerGoodStrongHit === true, "low-power 75-plus quality contact should upgrade into a strong hit-like ball");
assert(battedProfileState.lowPowerGoodBallSpeed >= 160, "low-power strong contact should show a forceful batted-ball speed");
assert(battedProfileState.lowPowerEliteFenceThreat === true, "low-power elite contact should be able to threaten the fence");
assert(battedProfileState.lowPowerEliteHomerPossible === true, "low-power elite contact should be able to clear the fence in its best cases");
assert(battedProfileState.lowPowerEliteHomerMeters <= 125, "low-power elite homers should stay in a believable near-wall range");

const powerSeparationState = JSON.parse(runInGame(
  context,
  `(() => {
    const originalRandom = Math.random;
    const contact = {
      timeDiff: 18,
      quality: 0.72,
      timingScore: 0.9,
      barrelScore: 0.82,
      sweetSpotScore: 0.82,
      zoneScore: 1,
      plateDistance: 0,
      outsideStrikeZone: false,
      inGoodContactZone: true,
      yellowZoneBoost: 0
    };
    const values = {};
    activePitcher = findById(pitchers, "yamamoto");
    activeBatterSide = "R";
    [1, 5, 10].forEach((power) => {
      Math.random = () => 0.5;
      activeBatter = { ...findById(batters, "judge"), power, meet: 5 };
      const hit = promoteLiftedContactResult(decideHitResultFromBattedProfile(contact));
      const battedBall = buildBattedBall(hit.power, normalize({ x: 0.04, y: -1 }), hit.label);
      values[power] = {
        label: hit.label,
        distance: battedBall.distance,
        fenceOver: battedBall.fenceOver,
        wallHit: battedBall.wallHit
      };
    });
    activeBatter = { ...findById(batters, "judge"), power: 10, meet: 5 };
    Math.random = () => 0.01;
    const powerHitterHomerConverted = shouldReducePowerHitterHomeRunToWallHit({
      fenceOver: true,
      isDeepDrive: true,
      contactScore: 0.72,
      profileExitVelocity: 1.12,
      profileCarry: 1.08,
      power: 1.7
    });
    Math.random = () => 0.99;
    const powerHitterHomerKept = shouldReducePowerHitterHomeRunToWallHit({
      fenceOver: true,
      isDeepDrive: true,
      contactScore: 0.72,
      profileExitVelocity: 1.12,
      profileCarry: 1.08,
      power: 1.7
    });
    activeBatter = { ...findById(batters, "suzuki"), power: 5, meet: 5 };
    const moderateCleanHit = makeModerateContactVarietyResult({
      power: 0.58,
      quality: 0.56,
      feedbackScore: 0.56,
      exitVelocity: 0.5,
      carry: 0.42,
      launchAngle: 14,
      direction: normalize({ x: 0.02, y: -1 }),
      timingPull: 0,
      lineEdgeScore: 0.02,
      lineDropScore: 0.04,
      lineLinerScore: 0.06
    }, 0.56, 0.4);
    const lateRollCleanHit = makeModerateContactVarietyResult({
      power: 0.58,
      quality: 0.56,
      feedbackScore: 0.56,
      exitVelocity: 0.5,
      carry: 0.42,
      launchAngle: 14,
      direction: normalize({ x: 0.02, y: -1 }),
      timingPull: 0,
      lineEdgeScore: 0.02,
      lineDropScore: 0.04,
      lineLinerScore: 0.06
    }, 0.56, 0.9);
    const lateRollCleanBall = buildBattedBall(
      lateRollCleanHit.power,
      lateRollCleanHit.direction,
      lateRollCleanHit.label,
      lateRollCleanHit.battedProfile
    );
    Math.random = originalRandom;
    return JSON.stringify({
      values,
      powerHitterHomerConverted,
      powerHitterHomerKept,
      moderateCleanHit: {
        kind: moderateCleanHit.kind,
        hardOutfieldBounce: Boolean(moderateCleanHit.hardOutfieldBounce),
        scoreType: moderateCleanHit.scoreType,
        power: moderateCleanHit.power
      },
      lateRollCleanHit: {
        kind: lateRollCleanHit.kind,
        hardOutfieldBounce: Boolean(lateRollCleanHit.hardOutfieldBounce),
        label: lateRollCleanHit.label,
        trajectory: lateRollCleanBall.trajectory,
        maxHeight: lateRollCleanBall.maxHeight,
        landingDistance: lateRollCleanBall.landingDistance,
        exitSpeedKmh: lateRollCleanBall.exitSpeedKmh
      }
    });
  })()`
));

assert(powerSeparationState.values[1].fenceOver === false && powerSeparationState.values[1].wallHit === false, "power-1 hitters should stay in scrappy-hit range even on strong contact");
assert(powerSeparationState.values[5].wallHit === true || powerSeparationState.values[5].distance > powerSeparationState.values[1].distance * 1.5, "power-5 hitters should clearly outdistance power-1 hitters");
assert(powerSeparationState.values[10].distance > powerSeparationState.values[1].distance * 1.5, "power-10 hitters should keep a deep-outfield ceiling without guaranteeing homers");
assert(powerSeparationState.values[10].distance >= powerSeparationState.values[5].distance, "power-10 hitters should not lose distance to power-5 hitters on strong contact");
assert(powerSeparationState.powerHitterHomerConverted === true, "some power-hitter home-run candidates should be converted into fence doubles");
assert(powerSeparationState.powerHitterHomerKept === false, "power-hitter home-run conversion should not remove every homer");
assert(powerSeparationState.moderateCleanHit.kind === "hit" && powerSeparationState.moderateCleanHit.hardOutfieldBounce === true, "50-60 percent batting feedback should more often become sharp clean outfield hits");
assert(powerSeparationState.moderateCleanHit.power >= 1, "moderate clean hits should be driven firmly enough to clear the infield");
assert(powerSeparationState.lateRollCleanHit.kind === "hit" && powerSeparationState.lateRollCleanHit.hardOutfieldBounce === true, "late-roll moderate feedback should now still become a clean outfield-bounce drive most of the time");
assert(powerSeparationState.lateRollCleanHit.label === "クリーンヒット", "late-roll moderate feedback should visibly prefer clean hits over line-edge or drop routes");
assert(powerSeparationState.lateRollCleanHit.trajectory === "liner" && powerSeparationState.lateRollCleanHit.maxHeight >= 132, "clean-hit drives should visibly clear the infield as low liners");
assert(powerSeparationState.lateRollCleanHit.landingDistance >= 1320, "clean-hit drives should take their first bounce in front of the outfielders");
assert(powerSeparationState.lateRollCleanHit.exitSpeedKmh >= 130, "clean-hit drives should show a fast real-scale exit velocity");

const hitDirectionState = JSON.parse(runInGame(
  context,
  `(() => {
    const originalRandom = Math.random;
    Math.random = () => 0.5;
    const contact = {
      quality: 0.72,
      timingScore: 0.82,
      barrelScore: 0.8,
      sweetSpotScore: 0.72,
      zoneScore: 0.86,
      plateDistance: 18,
      outsideStrikeZone: false,
      inGoodContactZone: true
    };
    activeBatter = findById(batters, "suzuki");

    activeBatterSide = "R";
    const rightEarly = buildBattedBallProfile({ ...contact, timeDiff: -180 }).direction;
    const rightLate = buildBattedBallProfile({ ...contact, timeDiff: 180 }).direction;
    const rightNeutral = buildBattedBallProfile({ ...contact, timeDiff: 0 }).direction;
    Math.random = () => 0.99;
    const rightLateAgainstJitter = buildBattedBallProfile({ ...contact, timeDiff: 140 }).direction;
    Math.random = () => 0.01;
    const rightEarlyAgainstJitter = buildBattedBallProfile({ ...contact, timeDiff: -140 }).direction;
    Math.random = () => 0.5;
    const rightFrontDropEarly = makeFrontDropResultFromProfile({ timingPull: -0.7, power: 0.58 }).direction;
    const rightFrontDropLate = makeFrontDropResultFromProfile({ timingPull: 0.7, power: 0.58 }).direction;
    const rightLineDropLate = makeLineDropResultFromProfile({ timingPull: 0.72, power: 0.62 }).direction;
    const rightNeutralStrongLiner = makeLineLinerResultFromProfile({ timingPull: 0, power: 0.92, direction: normalize({ x: 0.02, y: -1 }) }).direction;
    const rightNeutralGapLiner = makeGapLinerResult({ timingPull: 0, power: 0.9, direction: normalize({ x: 0.01, y: -1 }) }).direction;

    activeBatterSide = "L";
    const leftEarly = buildBattedBallProfile({ ...contact, timeDiff: -180 }).direction;
    const leftLate = buildBattedBallProfile({ ...contact, timeDiff: 180 }).direction;
    const leftNeutral = buildBattedBallProfile({ ...contact, timeDiff: 0 }).direction;
    const leftLineEarly = getLineBallDirection({ timingPull: -0.7 }, 0.82);
    const leftLineLate = getLineBallDirection({ timingPull: 0.7 }, 0.82);
    const leftLineDropLate = makeLineDropResultFromProfile({ timingPull: 0.72, power: 0.62 }).direction;

    Math.random = originalRandom;
    return JSON.stringify({
      rightEarlyX: rightEarly.x,
      rightLateX: rightLate.x,
      rightNeutralX: rightNeutral.x,
      rightLateAgainstJitterX: rightLateAgainstJitter.x,
      rightEarlyAgainstJitterX: rightEarlyAgainstJitter.x,
      rightFrontDropEarlyX: rightFrontDropEarly.x,
      rightFrontDropLateX: rightFrontDropLate.x,
      rightLineDropLateX: rightLineDropLate.x,
      rightNeutralStrongLinerAbsX: Math.abs(rightNeutralStrongLiner.x),
      rightNeutralGapLinerAbsX: Math.abs(rightNeutralGapLiner.x),
      leftEarlyX: leftEarly.x,
      leftLateX: leftLate.x,
      leftNeutralX: leftNeutral.x,
      leftLineEarlyX: leftLineEarly.x,
      leftLineLateX: leftLineLate.x,
      leftLineDropLateX: leftLineDropLate.x
    });
  })()`
));

assert(hitDirectionState.rightEarlyX < -0.35, "right-handed early contact should pull to left field");
assert(hitDirectionState.rightLateX > 0.35, "right-handed late contact should go opposite field");
assert(Math.abs(hitDirectionState.rightNeutralX) < 0.12, "right-handed just contact should stay near center with neutral random drift");
assert(hitDirectionState.rightLateAgainstJitterX > 0, "right-handed clear late contact should not be flipped back to pull side by random drift");
assert(hitDirectionState.rightEarlyAgainstJitterX < 0, "right-handed clear early contact should not be flipped back to opposite field by random drift");
assert(hitDirectionState.rightFrontDropEarlyX < 0, "right-handed front drops should respect pull timing");
assert(hitDirectionState.rightFrontDropLateX > 0, "right-handed front drops should respect opposite-field timing");
assert(hitDirectionState.rightLineDropLateX > 0.62, "right-handed late line drops should fall toward the right-field line");
assert(hitDirectionState.rightNeutralStrongLinerAbsX > 0.28, "strong liners should be aimed into outfield lanes instead of straight at fielders");
assert(hitDirectionState.rightNeutralGapLinerAbsX > 0.22, "gap liners should avoid the straight center-fielder lane");
assert(hitDirectionState.leftEarlyX > 0.35, "left-handed early contact should pull to right field");
assert(hitDirectionState.leftLateX < -0.35, "left-handed late contact should go opposite field");
assert(Math.abs(hitDirectionState.leftNeutralX) < 0.12, "left-handed just contact should stay near center with neutral random drift");
assert(hitDirectionState.leftLineEarlyX > 0.55, "left-handed line balls should pull on early contact");
assert(hitDirectionState.leftLineLateX < -0.55, "left-handed line balls should go opposite on late contact");
assert(hitDirectionState.leftLineDropLateX < -0.62, "left-handed late line drops should fall toward the left-field line");

const rareBattedBallFrequencyState = JSON.parse(runInGame(
  context,
  `(() => {
    activeBatter = findById(batters, "suzuki");
    activeBatterSide = "R";
    const linerDrop = buildBattedBallProfile({
      timeDiff: 58,
      quality: 0.5,
      timingScore: 0.84,
      barrelScore: 0.56,
      sweetSpotScore: 0.32,
      zoneScore: 0.68,
      plateDistance: 32,
      outsideStrikeZone: false,
      inGoodContactZone: false
    });
    activeBatter = findById(batters, "judge");
    const fenceEdge = buildBattedBallProfile({
      timeDiff: 28,
      quality: 0.76,
      timingScore: 0.9,
      barrelScore: 0.82,
      sweetSpotScore: 0.76,
      zoneScore: 0.92,
      plateDistance: 8,
      outsideStrikeZone: false,
      inGoodContactZone: true
    });
    return JSON.stringify({
      linerDropLaunchAngle: linerDrop.launchAngle,
      linerDropFrontDropScore: linerDrop.frontDropScore,
      linerDropLineDropScore: linerDrop.lineDropScore,
      fenceEdgeLaunchAngle: fenceEdge.launchAngle,
      fenceEdgeCarry: fenceEdge.carry,
      fenceEdgeScore: fenceEdge.fenceEdgeFlyScore
    });
  })()`
));

assert(rareBattedBallFrequencyState.linerDropLaunchAngle > 12 && rareBattedBallFrequencyState.linerDropLaunchAngle <= 46, "liner drops should cover low liners and shallow lifted balls");
assert(rareBattedBallFrequencyState.linerDropFrontDropScore >= 0.2 || rareBattedBallFrequencyState.linerDropLineDropScore >= 0.2, "outfield-front drops should be common enough to enter the result lottery under stronger stuff pressure");
assert(rareBattedBallFrequencyState.fenceEdgeLaunchAngle >= 35, "fence-edge fly candidates should include big outfield fly angles");
assert(rareBattedBallFrequencyState.fenceEdgeCarry >= 0.76, "fence-edge fly candidates should include reachable carry values");
assert(rareBattedBallFrequencyState.fenceEdgeScore >= 0.42, "fence-edge flies should be common enough to enter the result lottery");

const runnerDecisionState = JSON.parse(runInGame(
  context,
  `(() => {
    activeBatter = findById(batters, "ichiro");
    defenseState = createDefenseState();
    const fielder = { role: "C", x: field.plateX, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.72, speed: 5, fielding: 5, arm: 5 };
    const runner = createBatterRunner(activeBatter);
    const longBall = {
      target: { x: fielder.x, y: fielder.y + 80 },
      direction: normalize({ x: 0, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.62,
      landingDistance: defenseField.fenceDistance * 0.62,
      ballTime: 8.0,
      isGrounder: false,
      isLiner: true,
      isDeep: true,
      power: 0.9,
      trajectory: "liner",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const normalTarget = { x: field.plateX, y: field.plateY - 360 };
    const normalBall = { ...longBall, target: normalTarget, landingDistance: 360, isDeep: false };
    const riskyBall = { ...longBall, ballTime: 0.55, isDeep: true, landingDistance: defenseField.fenceDistance * 0.62 };
    const longTarget = getBatterRunnerTargetBase({ kind: "single", scoreType: "single", caught: false, fieldingTime: 8.0 }, longBall, fielder, fielder, runner);
    const normalTargetBase = getBatterRunnerTargetBase({ kind: "single", scoreType: "single", caught: false, fieldingTime: 0.5 }, normalBall, normalTarget, fielder, runner);
    const riskyTargetBase = getBatterRunnerTargetBase({ kind: "single", scoreType: "single", caught: false, fieldingTime: 0.55 }, riskyBall, fielder, fielder, runner);
    activeBatter = findById(batters, "murakami");
    const slowRunner = createBatterRunner(activeBatter);
    const slowLongTarget = getBatterRunnerTargetBase({ kind: "single", scoreType: "single", caught: false, fieldingTime: 2.2 }, longBall, fielder, fielder, slowRunner);
    activeBatter = findById(batters, "schwarber");
    const slowWallRunner = createBatterRunner(activeBatter);
    const wallFielder = { role: "C", x: field.plateX, y: defenseField.bases.home.y - defenseField.fenceDistance, speed: 5, fielding: 5, arm: 10 };
    const wallBall = {
      ...longBall,
      target: { x: wallFielder.x, y: wallFielder.y },
      wallReboundTarget: { x: wallFielder.x, y: wallFielder.y + 140 },
      flightDistance: defenseField.fenceDistance,
      landingDistance: defenseField.fenceDistance,
      ballTime: 2.0,
      wallHit: true,
      isDeep: true
    };
    const slowWallTarget = getBatterRunnerTargetBase({ kind: "double", scoreType: "double", caught: false, fieldingTime: 2.0 }, wallBall, wallFielder, wallFielder, slowWallRunner);
    setBatterRunnerDestination(runner, longTarget);
    const throwPlay = createThrowPlayForFieldedHit(fielder, longBall, { kind: "single", scoreType: "single", caught: false, fieldingTime: 8.0 }, fielder, runner);
    const firstThrowState = createThrowState(fielder, fielder, throwPlay, runner);
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    activeBatter = findById(batters, "suzuki");
    const forceBatterRunner = createBatterRunner(activeBatter);
    const forceGrounder = {
      ...normalBall,
      target: { x: defenseField.bases.second.x - 120, y: defenseField.bases.second.y + 80 },
      isGrounder: true,
      isLiner: false,
      trajectory: "grounder",
      ballTime: 0.6
    };
    const forceFieldingTarget = forceGrounder.target;
    setBatterRunnerDestination(forceBatterRunner, "first");
    const secondForceOutcome = createThrowPlayForFieldedHit(
      { ...fielder, role: "SS", fielding: 10, arm: 10 },
      forceGrounder,
      { kind: "single", scoreType: "single", caught: false, fieldingTime: 0.6 },
      forceFieldingTarget,
      forceBatterRunner
    );
    const secondForceBaseRunners = createDefenseBaseRunnerAnimations(secondForceOutcome, forceGrounder, null, { ...fielder, role: "SS", fielding: 10, arm: 10 }, forceFieldingTarget);
    const secondForceTargetBase = getInitialDefenseThrowTargetBase(secondForceOutcome, forceGrounder, forceBatterRunner);
    const secondForceRunnerAutoTarget = secondForceBaseRunners[0]?.targetBase;
    const secondForceThrowState = createThrowState(
      { ...fielder, role: "SS", fielding: 10, arm: 10 },
      forceFieldingTarget,
      secondForceOutcome,
      forceBatterRunner,
      { targetBase: secondForceTargetBase, baseRunners: secondForceBaseRunners }
    );
    const forcedSecondRunner = secondForceBaseRunners[0];
    if (forcedSecondRunner) {
      forcedSecondRunner.targetBase = "second";
      forcedSecondRunner.manualTargetBase = "second";
      forcedSecondRunner.arrivalTime = 3.0;
      forcedSecondRunner.arrived = false;
    }
    secondForceThrowState.startTime = 1.4;
    secondForceThrowState.endTime = 2.1;
    defenseState = {
      ...createDefenseState(),
      runner: forceBatterRunner,
      baseRunners: secondForceBaseRunners,
      throw: secondForceThrowState
    };
    refreshDefenseThrowSafety();
    const secondForceOut = defenseState.throw.safe === false;
    recordCompletedForceOut(defenseState.throw);
    const secondForceVisibleRunnerCount = getVisibleDefenseBaseRunners().length;
    const secondForceRemovedFirstRunnerDisplay = !defenseState.baseRunners.some((entry) => entry.startBase === "first");
    defenseState = {
      ...createDefenseState(),
      completedForceOutBases: ["first"],
      runner: forceBatterRunner,
      baseRunners: []
    };
    const batterForceHidden = isBatterRunnerOutOnCompletedForce();
    count = { strikes: 0, balls: 0, outs: 0 };
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    applyForceOutBaseState("second", activeBatter);
    const secondForceClearsFirstRunner = bases.first?.id === activeBatter.id;
    bases = createEmptyBases();
    const forcedFirstRunner = makeBaseRunner(findById(batters, "shuto"));
    const forcedSecondRunnerInfo = makeBaseRunner(findById(batters, "ichiro"));
    bases.first = forcedFirstRunner;
    bases.second = forcedSecondRunnerInfo;
    const thirdForceTargetBase = getInitialDefenseThrowTargetBase(secondForceOutcome, forceGrounder, forceBatterRunner);
    const thirdForceBaseRunners = createDefenseBaseRunnerAnimations(secondForceOutcome, forceGrounder, null, { ...fielder, role: "SS", fielding: 10, arm: 10 }, forceFieldingTarget);
    const forcedThirdRunner = thirdForceBaseRunners.find((entry) => entry.startBase === "second");
    if (forcedThirdRunner) {
      forcedThirdRunner.targetBase = "third";
      forcedThirdRunner.manualTargetBase = "third";
      forcedThirdRunner.arrivalTime = 3.2;
      forcedThirdRunner.arrived = false;
    }
    const thirdForceThrowState = createThrowState(
      { ...fielder, role: "SS", fielding: 10, arm: 10 },
      forceFieldingTarget,
      secondForceOutcome,
      forceBatterRunner,
      { targetBase: thirdForceTargetBase, baseRunners: thirdForceBaseRunners }
    );
    thirdForceThrowState.startTime = 1.4;
    thirdForceThrowState.endTime = 2.1;
    defenseState = {
      ...createDefenseState(),
      runner: forceBatterRunner,
      baseRunners: thirdForceBaseRunners,
      throw: thirdForceThrowState
    };
    refreshDefenseThrowSafety();
    const thirdForceOut = defenseState.throw.safe === false;
    const thirdForceConflictBatterRunner = createBatterRunner(activeBatter);
    thirdForceConflictBatterRunner.targetBase = "third";
    thirdForceConflictBatterRunner.currentBase = "third";
    thirdForceConflictBatterRunner.arrivalTime = 1.1;
    thirdForceConflictBatterRunner.arrived = true;
    thirdForceConflictBatterRunner.route = [
      { ...defenseField.bases.home },
      { ...defenseField.bases.first },
      { ...defenseField.bases.second },
      { ...defenseField.bases.third }
    ];
    const thirdForceConflictBaseRunners = thirdForceBaseRunners.map((entry) => ({ ...entry }));
    const thirdForceConflictRunner = thirdForceConflictBaseRunners.find((entry) => entry.startBase === "second");
    if (thirdForceConflictRunner) {
      thirdForceConflictRunner.targetBase = "third";
      thirdForceConflictRunner.manualTargetBase = "third";
      thirdForceConflictRunner.arrivalTime = 3.2;
      thirdForceConflictRunner.arrived = false;
    }
    defenseState = {
      ...createDefenseState(),
      runner: thirdForceConflictBatterRunner,
      baseRunners: thirdForceConflictBaseRunners,
      outcome: secondForceOutcome,
      battedBall: forceGrounder,
      throw: {
        ...thirdForceThrowState,
        targetBase: "third",
        startTime: 1.4,
        endTime: 2.1,
        safe: true
      }
    };
    refreshDefenseThrowSafety();
    const thirdForceIgnoresNonForcedBatterAtThird = defenseState.throw.safe === false;
    count = { strikes: 0, balls: 0, outs: 0 };
    bases = createEmptyBases();
    bases.first = forcedFirstRunner;
    bases.second = forcedSecondRunnerInfo;
    applyForceOutBaseState("third", activeBatter);
    const thirdForceClearsSecondRunner = bases.first?.id === activeBatter.id && bases.second?.id === forcedFirstRunner.id && !bases.third;
    count = { strikes: 0, balls: 0, outs: 0 };
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    applyCompletedForceOutBaseState(["second", "first"], activeBatter);
    const doublePlayClearsBases = !bases.first && !bases.second && !bases.third;
    bases = createEmptyBases();
    bases.second = makeBaseRunner(findById(batters, "ichiro"));
    const secondOnlyNoForceTarget = getLeadForceThrowTargetBase(secondForceOutcome, forceGrounder);
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    const lineDropForceTarget = getLeadForceThrowTargetBase(secondForceOutcome, { ...forceGrounder, isGrounder: false, isLiner: true, trajectory: "liner" });
    const caughtFlyForceTarget = getLeadForceThrowTargetBase(
      { kind: "out", caught: true, needsThrow: false },
      { ...forceGrounder, isGrounder: false, isLiner: false, trajectory: "fly" }
    );
    defenseState = { ...createDefenseState(), completedForceOutBases: ["first"] };
    const batterOutRemovesSecondForce = isForceTargetActive("second");
    defenseState = createDefenseState();
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    bases.second = makeBaseRunner(findById(batters, "ichiro"));
    bases.third = makeBaseRunner(findById(batters, "otani"));
    const loadedForceTarget = getLeadForceThrowTargetBase(secondForceOutcome, forceGrounder);
    gameMode = "versus";
    battingTeam = "away";
    defenseControlMode = { away: "auto", home: "auto" };
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    bases.second = makeBaseRunner(findById(batters, "ichiro"));
    const fallbackForceBaseRunners = createDefenseBaseRunnerAnimations(secondForceOutcome, forceGrounder, null, { ...fielder, role: "SS", fielding: 10, arm: 10 }, forceFieldingTarget);
    const fallbackThirdRunner = fallbackForceBaseRunners.find((entry) => entry.startBase === "second");
    const fallbackSecondRunner = fallbackForceBaseRunners.find((entry) => entry.startBase === "first");
    if (fallbackThirdRunner) fallbackThirdRunner.arrivalTime = 0.1;
    if (fallbackSecondRunner) fallbackSecondRunner.arrivalTime = 6.2;
    const fallbackLeadForceTarget = getLeadForceThrowTargetBase(secondForceOutcome, forceGrounder);
    const autoFallbackForceTarget = getInitialDefenseThrowTargetBase(secondForceOutcome, forceGrounder, forceBatterRunner, {
      fielder: { ...fielder, role: "SS", fielding: 10, arm: 10 },
      fieldingTarget: forceFieldingTarget,
      baseRunners: fallbackForceBaseRunners,
      minStartTime: 0.6,
      autoFallback: true
    });
    gameMode = "versus";
    battingTeam = "away";
    defenseControlMode = { away: "manual", home: "auto" };
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    bases.second = makeBaseRunner(findById(batters, "ichiro"));
    const manualRunDoubleRunners = createDefenseBaseRunnerAnimations(
      { kind: "double", scoreType: "double", caught: false },
      longBall,
      null,
      fielder,
      fielder
    );
    const manualRunFirstTarget = manualRunDoubleRunners.find((entry) => entry.startBase === "first")?.targetBase;
    const manualRunSecondTarget = manualRunDoubleRunners.find((entry) => entry.startBase === "second")?.targetBase;
    const manualAdvanceBaseRunner = manualRunDoubleRunners.find((entry) => entry.startBase === "first");
    const manualAdvanceBatterRunner = createBatterRunner(findById(batters, "sato"));
    manualAdvanceBatterRunner.x = defenseField.bases.first.x;
    manualAdvanceBatterRunner.y = defenseField.bases.first.y;
    manualAdvanceBatterRunner.currentBase = "first";
    manualAdvanceBatterRunner.targetBase = "first";
    manualAdvanceBatterRunner.arrived = true;
    if (manualAdvanceBaseRunner) {
      manualAdvanceBaseRunner.x = defenseField.bases.second.x;
      manualAdvanceBaseRunner.y = defenseField.bases.second.y;
      manualAdvanceBaseRunner.startBase = "second";
      manualAdvanceBaseRunner.targetBase = "second";
      manualAdvanceBaseRunner.arrived = true;
    }
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now(),
      resolved: false,
      runner: manualAdvanceBatterRunner,
      baseRunners: manualAdvanceBaseRunner ? [manualAdvanceBaseRunner] : [],
      chosenFielder: fielder,
      target: fielder,
      battedBall: longBall,
      outcome: { kind: "force", caught: true, needsThrow: true, fieldingTime: 1.0 },
      throw: null
    };
    gamePhase = "defense";
    battingTeam = "away";
    gameMode = "versus";
    handleBatterRunnerBaseCommand("third", "advance");
    const manualSpecificBaseRunnerTarget = defenseState.baseRunners[0]?.targetBase;
    const manualSpecificBatterRunnerTarget = defenseState.runner?.targetBase;
    const manualReturnBaseRunner = defenseState.baseRunners[0];
    if (manualReturnBaseRunner) {
      manualReturnBaseRunner.x = (defenseField.bases.second.x + defenseField.bases.third.x) / 2;
      manualReturnBaseRunner.y = (defenseField.bases.second.y + defenseField.bases.third.y) / 2;
      manualReturnBaseRunner.startBase = "second";
      manualReturnBaseRunner.targetBase = "third";
      manualReturnBaseRunner.arrived = false;
    }
    defenseState.runner.targetBase = "first";
    defenseState.runner.currentBase = "first";
    defenseState.runner.arrived = true;
    handleBatterRunnerBaseCommand("second", "return");
    const manualSpecificReturnBaseRunnerTarget = defenseState.baseRunners[0]?.targetBase;
    const manualSpecificReturnBatterRunnerTarget = defenseState.runner?.targetBase;
    defenseControlMode = { away: "auto", home: "auto" };
    defenseState = { ...createDefenseState(), completedForceOutBases: ["first"] };
    const thirdForceAfterBatterOutActive = isForceTargetActive("third");
    runner.x = defenseField.bases.first.x;
    runner.y = defenseField.bases.first.y;
    runner.currentBase = "first";
    runner.targetBase = "first";
    runner.arrived = true;
    setBatterRunnerManualDestination(runner, "second", 2.4);
    const manualThrowPlay = createThrowPlayForFieldedHit(fielder, longBall, { kind: "single", scoreType: "single", caught: false, fieldingTime: 8.0 }, fielder, runner);
    const manualThrowState = createThrowState(fielder, fielder, manualThrowPlay, runner);
    const manualThirdThrowState = createThrowState(fielder, fielder, manualThrowPlay, runner, { targetBase: "third" });
    runner.x = (defenseField.bases.first.x + defenseField.bases.second.x) / 2;
    runner.y = (defenseField.bases.first.y + defenseField.bases.second.y) / 2;
    runner.currentBase = "first";
    runner.targetBase = "second";
    runner.arrived = false;
    setBatterRunnerManualDestination(runner, "first", 2.8, "return");
    const returnTargetBase = runner.targetBase;
    runner.x = defenseField.bases.first.x;
    runner.y = defenseField.bases.first.y;
    runner.currentBase = "first";
    runner.targetBase = "first";
    runner.arrived = true;
    setBatterRunnerManualDestination(runner, "third", 3.0);
    const firstToThirdStopsAtSecond = runner.targetBase === "first";
    const firstToThirdFirstStepSecond = runner.route?.[1]?.x !== defenseField.bases.third.x;
    const beforeFirstRunner = createBatterRunner(findById(batters, "ichiro"));
    beforeFirstRunner.x = (defenseField.bases.home.x + defenseField.bases.first.x) / 2;
    beforeFirstRunner.y = (defenseField.bases.home.y + defenseField.bases.first.y) / 2;
    beforeFirstRunner.currentBase = "home";
    beforeFirstRunner.targetBase = "first";
    beforeFirstRunner.arrived = false;
    setBatterRunnerManualDestination(beforeFirstRunner, "second", 0.4);
    const beforeFirstToSecondFirstStepFirst = beforeFirstRunner.targetBase === "first";
    const beforeFirstToSecondTouchesSecond = !beforeFirstRunner.route.some((point) => point.x === defenseField.bases.second.x && point.y === defenseField.bases.second.y);
    defenseState = { ...createDefenseState(), runner: beforeFirstRunner };
    beforeFirstRunner.routeStartTime = 0;
    updateBatterRunner(beforeFirstRunner.routeDuration * 0.55);
    const touchedFirstWhileRunning = beforeFirstRunner.currentBase === "first";
    runner.x = defenseField.bases.second.x;
    runner.y = defenseField.bases.second.y;
    runner.currentBase = "second";
    runner.targetBase = "second";
    runner.arrived = true;
    setBatterRunnerManualDestination(runner, "third", 3.2);
    const thirdTargetBase = runner.targetBase;
    runner.x = (defenseField.bases.second.x + defenseField.bases.third.x) / 2;
    runner.y = (defenseField.bases.second.y + defenseField.bases.third.y) / 2;
    runner.currentBase = "second";
    runner.targetBase = "third";
    runner.arrived = false;
    setBatterRunnerManualDestination(runner, "first", 3.4);
    const returnFromBeyondSecondTouchesSecond = runner.route.some((point) => point.x === defenseField.bases.second.x && point.y === defenseField.bases.second.y);
    runner.x = defenseField.bases.third.x;
    runner.y = defenseField.bases.third.y;
    runner.currentBase = "third";
    runner.targetBase = "third";
    runner.arrived = true;
    setBatterRunnerManualDestination(runner, "home", 3.6);
    const homeTargetBase = runner.targetBase;
    const commandThrowPlay = { ...manualThrowPlay, fieldingTime: 1.0 };
    gameMode = "versus";
    defenseControlMode = { away: "auto", home: "manual" };
    gamePhase = "defense";
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now() - 1100,
      chosenFielder: fielder,
      target: fielder,
      battedBall: longBall,
      outcome: commandThrowPlay,
      runner,
      baseRunners: [],
      throw: createThrowState(fielder, fielder, commandThrowPlay, runner),
      resolved: false
    };
    handleDefenseThrowCommand("second");
    const manualCommandTargetBase = defenseState.throw.targetBase;
    defenseState.runner.targetBase = "first";
    defenseState.throw = { targetBase: "home" };
    const backHomeAdvanceType = getBatterRunnerAdvanceTypeFromThrow(defenseState.throw);
    bases = createEmptyBases();
    const backHomeRunsEmpty = advanceRunners(backHomeAdvanceType, activeBatter, longBall, { kind: "force", caught: true, needsThrow: true });
    const backHomeBatterOnFirst = bases.first?.id === activeBatter.id;
    const runningAfterHoldRunner = createBatterRunner(findById(batters, "ichiro"));
    runningAfterHoldRunner.x = (defenseField.bases.first.x + defenseField.bases.second.x) / 2;
    runningAfterHoldRunner.y = (defenseField.bases.first.y + defenseField.bases.second.y) / 2;
    runningAfterHoldRunner.currentBase = "first";
    runningAfterHoldRunner.targetBase = "second";
    runningAfterHoldRunner.arrived = false;
    defenseState = {
      ...createDefenseState(),
      active: true,
      resolved: false,
      runner: runningAfterHoldRunner,
      outcome: { kind: "force", caught: true, needsThrow: true },
      throw: { startTime: 1, endTime: 1.4, holdDeadline: 3.4, safe: true }
    };
    const waitsForRunningBatterRunner = shouldResolveDefensePlayNow(3.6);
    runningAfterHoldRunner.x = defenseField.bases.second.x;
    runningAfterHoldRunner.y = defenseField.bases.second.y;
    runningAfterHoldRunner.arrived = true;
    const resolvesAfterBatterRunnerSettles = shouldResolveDefensePlayNow(3.6);
    const lateSecondRunner = createBatterRunner(findById(batters, "ichiro"));
    lateSecondRunner.x = defenseField.bases.first.x;
    lateSecondRunner.y = defenseField.bases.first.y;
    lateSecondRunner.currentBase = "first";
    lateSecondRunner.targetBase = "first";
    lateSecondRunner.arrived = true;
    defenseState = {
      ...createDefenseState(),
      active: true,
      resolved: false,
      runner: lateSecondRunner,
      outcome: { kind: "force", caught: true, needsThrow: true },
      throw: { startTime: 1, endTime: 1.5, holdDeadline: 5.5, safe: true, targetBase: "second" }
    };
    setBatterRunnerManualDestination(lateSecondRunner, "second", 2.0);
    refreshDefenseThrowSafety();
    const lateRunnerToAlreadyHeldSecondSafe = defenseState.throw.safe;
    const keyedLateSecondRunner = createBatterRunner(findById(batters, "ichiro"));
    keyedLateSecondRunner.x = defenseField.bases.first.x;
    keyedLateSecondRunner.y = defenseField.bases.first.y;
    keyedLateSecondRunner.currentBase = "first";
    keyedLateSecondRunner.targetBase = "first";
    keyedLateSecondRunner.arrived = true;
    gameMode = "versus";
    gamePhase = "defense";
    defenseControlMode = { away: "auto", home: "manual" };
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now() - 2000,
      resolved: false,
      runner: keyedLateSecondRunner,
      chosenFielder: fielder,
      target: fielder,
      battedBall: longBall,
      outcome: { kind: "force", caught: true, needsThrow: true, fieldingTime: 0.6 },
      throw: { startTime: 1, endTime: 1.5, holdDeadline: 3.5, safe: true, targetBase: "second", baseLabel: "second" }
    };
    updateThrowState(2.0);
    handleBatterRunnerBaseCommand("second");
    const keyedLateRunnerToHeldSecondSafe = defenseState.throw.safe;
    const keyedLateRunnerThrowStillSecond = defenseState.throw.targetBase === "second";
    const keyedLateRunnerHeldBase = defenseState.heldBallBase;
    const inFlightSecondRunner = createBatterRunner(findById(batters, "ichiro"));
    inFlightSecondRunner.x = defenseField.bases.first.x;
    inFlightSecondRunner.y = defenseField.bases.first.y;
    inFlightSecondRunner.currentBase = "first";
    inFlightSecondRunner.targetBase = "first";
    inFlightSecondRunner.arrived = true;
    gameMode = "versus";
    gamePhase = "defense";
    defenseControlMode = { away: "auto", home: "manual" };
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now() - 2000,
      resolved: false,
      runner: inFlightSecondRunner,
      chosenFielder: fielder,
      target: fielder,
      battedBall: longBall,
      outcome: { kind: "force", caught: true, needsThrow: true, fieldingTime: 0.6 },
      throw: { startTime: 1, endTime: 2.4, holdDeadline: 4.4, safe: true, targetBase: "second", baseLabel: "second" }
    };
    handleBatterRunnerBaseCommand("second");
    const inFlightSecondThrowKept = defenseState.throw.targetBase === "second" && defenseState.throw.endTime === 2.4;
    const inFlightSecondSafe = defenseState.throw.safe;
    const lateFirstThrowRunner = createBatterRunner(findById(batters, "ichiro"));
    lateFirstThrowRunner.x = defenseField.bases.first.x + 90;
    lateFirstThrowRunner.y = defenseField.bases.first.y - 90;
    lateFirstThrowRunner.currentBase = "first";
    lateFirstThrowRunner.targetBase = "second";
    lateFirstThrowRunner.arrived = false;
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now() - 3600,
      resolved: false,
      runner: lateFirstThrowRunner,
      chosenFielder: fielder,
      target: fielder,
      battedBall: longBall,
      outcome: { kind: "force", caught: true, needsThrow: true, fieldingTime: 1.0 },
      throw: createThrowState(fielder, fielder, { kind: "force", caught: true, needsThrow: true, fieldingTime: 1.0 }, lateFirstThrowRunner, { manualWait: true })
    };
    const lateFirstThrowAcceptedBefore = canManualDefenseThrow("second");
    handleDefenseThrowCommand("second");
    const lateFirstThrowAcceptedAfter = Number.isFinite(defenseState.throw.startTime) && defenseState.throw.targetBase === "second";
    const finalRuleRunner = createBatterRunner(findById(batters, "ichiro"));
    finalRuleRunner.currentBase = "first";
    finalRuleRunner.targetBase = "second";
    finalRuleRunner.arrivalTime = 4.2;
    finalRuleRunner.arrived = false;
    defenseState = {
      ...createDefenseState(),
      runner: finalRuleRunner,
      throw: { targetBase: "second", endTime: 2.1, safe: true }
    };
    refreshDefenseThrowSafety();
    const finalRuleOutWhenThrowArrivedFirst = defenseState.throw.safe === false;
    const alreadySafeRunner = createBatterRunner(findById(batters, "ichiro"));
    alreadySafeRunner.currentBase = "second";
    alreadySafeRunner.targetBase = "second";
    alreadySafeRunner.arrivalTime = 1.2;
    alreadySafeRunner.arrived = true;
    defenseState = {
      ...createDefenseState(),
      runner: alreadySafeRunner,
      throw: { targetBase: "second", startTime: 2.2, endTime: 3.0, safe: false }
    };
    refreshDefenseThrowSafety();
    const lateThrowToAlreadySafeRunnerSafe = defenseState.throw.safe;
    const alreadySafeHeldBaseRunner = createBatterRunner(findById(batters, "ichiro"));
    alreadySafeHeldBaseRunner.currentBase = "second";
    alreadySafeHeldBaseRunner.targetBase = "second";
    alreadySafeHeldBaseRunner.arrivalTime = 1.2;
    alreadySafeHeldBaseRunner.arrived = true;
    defenseState = {
      ...createDefenseState(),
      runner: alreadySafeHeldBaseRunner,
      chosenFielder: fielder,
      target: fielder,
      battedBall: longBall,
      outcome: { kind: "force", caught: true, needsThrow: true, fieldingTime: 0.6 },
      heldBallBase: "second",
      heldBallSince: 3.0,
      throw: { targetBase: "second", startTime: 2.2, endTime: 3.0, holdDeadline: 5.0, safe: false }
    };
    retargetDefenseThrowToBatterRunner(3.2);
    const lateHeldBaseToAlreadySafeRunnerSafe = defenseState.throw.safe;
    const alreadySafeBaseRunner = {
      ...makeBaseRunner(findById(batters, "nomo")),
      startBase: "second",
      targetBase: "third",
      manualTargetBase: "third",
      arrivalTime: 1.2,
      arrived: true,
      route: [{ ...defenseField.bases.second }, { ...defenseField.bases.third }],
      x: defenseField.bases.third.x,
      y: defenseField.bases.third.y
    };
    defenseState = {
      ...createDefenseState(),
      runner: null,
      baseRunners: [alreadySafeBaseRunner],
      throw: { targetBase: "third", startTime: 2.2, endTime: 3.0, holdDeadline: 5.0, safe: false }
    };
    refreshDefenseThrowSafety();
    const lateThrowToAlreadySafeBaseRunnerSafe = defenseState.throw.safe;
    defenseState = {
      ...createDefenseState(),
      runner: null,
      baseRunners: [alreadySafeBaseRunner],
      heldBallBase: "third",
      heldBallSince: 3.0,
      throw: { targetBase: "third", startTime: 2.2, endTime: 3.0, holdDeadline: 5.0, safe: false }
    };
    refreshDefenseThrowSafety();
    const lateHeldBaseToAlreadySafeBaseRunnerSafe = defenseState.throw.safe;
    const lateBaseRunner = {
      ...makeBaseRunner(findById(batters, "nomo")),
      startBase: "second",
      targetBase: "third",
      manualTargetBase: "third",
      arrivalTime: 4.2,
      arrived: false,
      route: [{ ...defenseField.bases.second }, { ...defenseField.bases.third }],
      x: defenseField.bases.second.x,
      y: defenseField.bases.second.y
    };
    defenseState = {
      ...createDefenseState(),
      runner: null,
      baseRunners: [lateBaseRunner],
      throw: { targetBase: "third", startTime: 1.0, endTime: 2.1, holdDeadline: 5.0, safe: true }
    };
    refreshDefenseThrowSafety();
    const earlyThrowToLateBaseRunnerOut = defenseState.throw.safe === false;
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    defenseState = {
      ...createDefenseState(),
      runner: forceBatterRunner,
      baseRunners: [],
      outcome: { kind: "force", caught: true, needsThrow: true },
      throw: { targetBase: "second", startTime: 1.0, endTime: 1.25, holdDeadline: 3.25, safe: true }
    };
    refreshDefenseThrowSafety();
    const secondForceOutWithoutAnimationRunner = defenseState.throw.safe === false;
    const forceSnapshot = createForceTargetsForPlay(forceGrounder, { kind: "force", caught: true, needsThrow: true });
    bases = createEmptyBases();
    defenseState = {
      ...createDefenseState(),
      forceTargets: forceSnapshot,
      runner: forceBatterRunner,
      baseRunners: [],
      outcome: { kind: "force", caught: true, needsThrow: true },
      battedBall: forceGrounder,
      throw: { targetBase: "second", startTime: 1.0, endTime: 1.25, holdDeadline: 3.25, safe: true }
    };
    refreshDefenseThrowSafety();
    const secondForceOutFromSnapshotAfterBasesClear = defenseState.throw.safe === false;
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    gameMode = "versus";
    gamePhase = "defense";
    defenseControlMode = { away: "auto", home: "manual" };
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now() - 1100,
      resolved: false,
      runner: forceBatterRunner,
      baseRunners: [],
      chosenFielder: { ...fielder, role: "SS", fielding: 8, arm: 8 },
      target: forceFieldingTarget,
      battedBall: forceGrounder,
      outcome: { kind: "single", caught: true, needsThrow: true, fieldingTime: 0.6 },
      throw: { prepareStartTime: 0.6, startTime: Number.POSITIVE_INFINITY, endTime: Number.POSITIVE_INFINITY, holdDeadline: 4.0, safe: true, targetBase: "first" }
    };
    handleDefenseThrowCommand("second");
    const manualGrounderSecondForceKind = defenseState.outcome.kind;
    const manualGrounderSecondForceOut = defenseState.throw.safe === false;
    count = { strikes: 0, balls: 0, outs: 0 };
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    activeBatter = findById(batters, "suzuki");
    const forceOutBatterId = activeBatter.id;
    defenseState = {
      ...createDefenseState(),
      outcome: { kind: "single", caught: true, needsThrow: true },
      battedBall: forceGrounder,
      runner: forceBatterRunner,
      throw: { targetBase: "second", baseLabel: "second", startTime: 1.0, endTime: 1.4, holdDeadline: 3.4, safe: true }
    };
    gamePhase = "defense";
    finishDefensePlay();
    const throwOutDespiteSingleOutcome = count.outs === 1 && bases.first?.id === forceOutBatterId && !bases.second;
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    gameMode = "versus";
    gamePhase = "defense";
    defenseControlMode = { away: "auto", home: "manual" };
    activeBatter = findById(batters, "suzuki");
    const completedForceBatterId = activeBatter.id;
    const completedForceRunner = createBatterRunner(activeBatter);
    const completedForceOutcome = { kind: "force", caught: true, needsThrow: true, fieldingTime: 0.4 };
    const completedForceBaseRunners = createDefenseBaseRunnerAnimations(completedForceOutcome, forceGrounder, null, { ...fielder, role: "SS", fielding: 10, arm: 10 }, forceFieldingTarget);
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now(),
      resolved: false,
      runner: completedForceRunner,
      baseRunners: completedForceBaseRunners,
      chosenFielder: { ...fielder, role: "SS", fielding: 10, arm: 10 },
      target: forceFieldingTarget,
      battedBall: forceGrounder,
      outcome: completedForceOutcome,
      throw: createThrowState(
        { ...fielder, role: "SS", fielding: 10, arm: 10 },
        forceFieldingTarget,
        completedForceOutcome,
        completedForceRunner,
        { manualWait: true, targetBase: "second", baseRunners: completedForceBaseRunners }
      )
    };
    handleDefenseThrowCommand("second");
    updateThrowState(defenseState.throw.endTime + 0.01);
    const completedForceRecordedBeforeFinish = defenseState.completedForceOutBases.includes("second") && defenseState.throw.safe === false;
    count = { strikes: 0, balls: 0, outs: 0 };
    finishDefensePlay();
    const completedForceSurvivesFinish = count.outs === 1 && bases.first?.id === completedForceBatterId && !bases.second && !bases.third;
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    gameMode = "versus";
    gamePhase = "defense";
    defenseControlMode = { away: "auto", home: "manual" };
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now() - 300,
      resolved: false,
      runner: forceBatterRunner,
      baseRunners: createDefenseBaseRunnerAnimations(secondForceOutcome, forceGrounder, null, { ...fielder, role: "SS", fielding: 8, arm: 8 }, forceFieldingTarget),
      chosenFielder: { ...fielder, role: "SS", fielding: 8, arm: 8 },
      target: forceFieldingTarget,
      battedBall: forceGrounder,
      outcome: { kind: "force", caught: true, needsThrow: true, fieldingTime: 0.8 },
      throw: createThrowState(
        { ...fielder, role: "SS", fielding: 8, arm: 8 },
        forceFieldingTarget,
        { kind: "force", caught: true, needsThrow: true, fieldingTime: 0.8 },
        forceBatterRunner,
        { manualWait: true, targetBase: "first" }
      )
    };
    const earlySecondCommandAllowed = canManualDefenseThrow("second");
    handleDefenseThrowCommand("second");
    const earlySecondCommandScheduled = defenseState.throw.targetBase === "second"
      && Number.isFinite(defenseState.throw.startTime)
      && defenseState.throw.startTime >= 0.8;
    const earlySecondCommandForceOut = defenseState.throw.safe === false;
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    gameMode = "versus";
    gamePhase = "defense";
    defenseControlMode = { away: "auto", home: "manual" };
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now() - 300,
      resolved: false,
      runner: forceBatterRunner,
      baseRunners: createDefenseBaseRunnerAnimations(secondForceOutcome, forceGrounder, null, { ...fielder, role: "SS", fielding: 8, arm: 8 }, forceFieldingTarget),
      chosenFielder: { ...fielder, role: "SS", fielding: 8, arm: 8 },
      target: forceFieldingTarget,
      battedBall: forceGrounder,
      outcome: { kind: "force", caught: true, needsThrow: true, fieldingTime: 0.8 },
      throw: {
        prepareStartTime: 0.8,
        startTime: 1.4,
        endTime: 2.0,
        holdDeadline: 4.0,
        manualWait: true,
        active: false,
        safe: true,
        targetBase: "second",
        baseLabel: "second",
        from: { ...forceFieldingTarget },
        to: { ...defenseField.bases.second }
      }
    };
    const preselectedSecondCommandAllowed = canManualDefenseThrow("second");
    handleDefenseThrowCommand("second");
    const preselectedSecondCommandStarted = defenseState.throw.targetBase === "second"
      && Number.isFinite(defenseState.throw.startTime)
      && defenseState.throw.startTime <= 0.8;
    const preselectedSecondCommandForceOut = defenseState.throw.safe === false;
    const routeOnlyThirdRunner = {
      ...makeBaseRunner(findById(batters, "nomo")),
      startBase: "second",
      currentBase: "second",
      arrivalTime: 4.1,
      arrived: false,
      route: [{ ...defenseField.bases.second }, { ...defenseField.bases.third }],
      x: defenseField.bases.second.x,
      y: defenseField.bases.second.y
    };
    defenseState = {
      ...createDefenseState(),
      runner: null,
      baseRunners: [routeOnlyThirdRunner],
      throw: { targetBase: "third", startTime: 1.0, endTime: 2.1, holdDeadline: 5.0, safe: true }
    };
    refreshDefenseThrowSafety();
    const routeOnlyThirdRunnerOut = defenseState.throw.safe === false;
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "shuto"));
    activeBatter = findById(batters, "suzuki");
    battingTeam = "away";
    gamePhase = "playing";
    startDefensePlay(hitLabels.grounder, "hit", 0.42, 0, normalize({ x: 0.04, y: -1 }));
    const realGrounderPendingManual = defenseState.manualFielding === true && !defenseState.throw;
    completeManualDefenseFielding(defenseState.chosenFielder, 0.7);
    const realGrounderPostCatchTarget = defenseState.throw?.targetBase;
    const realGrounderBatterId = activeBatter.id;
    if (defenseState.throw) {
      defenseState.throw.targetBase = "second";
      defenseState.throw.baseLabel = "second";
      defenseState.throw.startTime = 0.7;
      defenseState.throw.endTime = 1.0;
      defenseState.throw.holdDeadline = 3.0;
      defenseState.throw.safe = true;
    }
    count = { strikes: 0, balls: 0, outs: 0 };
    finishDefensePlay();
    const realGrounderSecondForceOut = count.outs === 1 && bases.first?.id === realGrounderBatterId && !bases.second;
    bases = createEmptyBases();
    const trailingOutFirstRunner = makeBaseRunner(findById(batters, "shuto"));
    const trailingOutBatter = findById(batters, "suzuki");
    bases.first = trailingOutFirstRunner;
    activeBatter = trailingOutBatter;
    const trailingOutBatterRunner = createBatterRunner(activeBatter);
    setBatterRunnerDestination(trailingOutBatterRunner, "first");
    const trailingOutBaseRunners = createDefenseBaseRunnerAnimations(secondForceOutcome, forceGrounder, null, { ...fielder, role: "SS", fielding: 10, arm: 10 }, forceFieldingTarget);
    const trailingFirstRunner = trailingOutBaseRunners.find((entry) => entry.startBase === "first");
    if (trailingFirstRunner) {
      trailingFirstRunner.targetBase = "second";
      trailingFirstRunner.manualTargetBase = "second";
      trailingFirstRunner.arrivalTime = 1.0;
      trailingFirstRunner.arrived = true;
    }
    defenseState = {
      ...createDefenseState(),
      runner: trailingOutBatterRunner,
      baseRunners: trailingOutBaseRunners,
      forceTargets: createForceTargetsForPlay(forceGrounder, secondForceOutcome),
      outcome: secondForceOutcome,
      battedBall: forceGrounder,
      throw: {
        targetBase: "first",
        baseLabel: "一塁",
        startTime: 1.0,
        endTime: 1.4,
        holdDeadline: 3.4,
        safe: false
      },
      completedForceOutBases: ["first"]
    };
    count = { strikes: 0, balls: 0, outs: 0 };
    scores = { away: 0, home: 0 };
    battingTeam = "away";
    gamePhase = "defense";
    finishDefensePlay();
    const trailingForceOutAtFirstAdvancesLeadRunner = count.outs === 1
      && !bases.first
      && bases.second?.id === trailingOutFirstRunner.id
      && !bases.third
      && scores.away === 0;
    bases = createEmptyBases();
    const firstThirdFirstRunner = makeBaseRunner(findById(batters, "shuto"));
    const firstThirdRunner = makeBaseRunner(findById(batters, "otani"));
    const firstThirdBatter = findById(batters, "suzuki");
    bases.first = firstThirdFirstRunner;
    bases.third = firstThirdRunner;
    activeBatter = firstThirdBatter;
    const firstThirdBatterRunner = createBatterRunner(activeBatter);
    setBatterRunnerDestination(firstThirdBatterRunner, "first");
    const firstThirdOutcome = { kind: "force", caught: true, needsThrow: true, fieldingTime: 0.6 };
    const firstThirdForceTargets = createForceTargetsForPlay(forceGrounder, firstThirdOutcome);
    const firstThirdForceNoHome = !firstThirdForceTargets.some((entry) => entry.targetBase === "home");
    const firstThirdLeadForceTarget = getLeadForceThrowTargetBase(firstThirdOutcome, forceGrounder);
    const firstThirdBaseRunners = createDefenseBaseRunnerAnimations(firstThirdOutcome, forceGrounder, null, { ...fielder, role: "SS", fielding: 10, arm: 10 }, forceFieldingTarget);
    const firstThirdHomeRunner = firstThirdBaseRunners.find((entry) => entry.startBase === "third");
    if (firstThirdHomeRunner) {
      firstThirdHomeRunner.targetBase = "home";
      firstThirdHomeRunner.manualTargetBase = "home";
      firstThirdHomeRunner.arrivalTime = 3.2;
      firstThirdHomeRunner.arrived = false;
    }
    const firstThirdHomeThrow = createThrowState(
      { ...fielder, role: "SS", fielding: 10, arm: 10 },
      forceFieldingTarget,
      firstThirdOutcome,
      firstThirdBatterRunner,
      { targetBase: "home", baseRunners: firstThirdBaseRunners }
    );
    firstThirdHomeThrow.startTime = 1.2;
    firstThirdHomeThrow.endTime = 2.1;
    firstThirdHomeThrow.baseLabel = "本塁";
    defenseState = {
      ...createDefenseState(),
      runner: firstThirdBatterRunner,
      baseRunners: firstThirdBaseRunners,
      forceTargets: firstThirdForceTargets,
      outcome: firstThirdOutcome,
      battedBall: forceGrounder,
      throw: firstThirdHomeThrow
    };
    refreshDefenseThrowSafety();
    const firstThirdHomeTagOut = defenseState.throw.safe === false;
    count = { strikes: 0, balls: 0, outs: 0 };
    scores = { away: 0, home: 0 };
    battingTeam = "away";
    gamePhase = "defense";
    finishDefensePlay();
    const firstThirdHomeTagOutActual = {
      outs: count.outs,
      first: bases.first?.id || null,
      second: bases.second?.id || null,
      third: bases.third?.id || null,
      awayScore: scores.away
    };
    const firstThirdHomeTagOutState = count.outs === 1
      && bases.first?.id === firstThirdBatter.id
      && bases.second?.id === firstThirdFirstRunner.id
      && !bases.third
      && scores.away === 0;
    bases = createEmptyBases();
    bases.first = firstThirdFirstRunner;
    bases.third = firstThirdRunner;
    activeBatter = firstThirdBatter;
    const firstThirdSafeBatterRunner = createBatterRunner(activeBatter);
    setBatterRunnerDestination(firstThirdSafeBatterRunner, "first");
    const firstThirdSafeBaseRunners = createDefenseBaseRunnerAnimations(firstThirdOutcome, forceGrounder, null, { ...fielder, role: "SS", fielding: 10, arm: 10 }, forceFieldingTarget);
    const firstThirdSafeHomeRunner = firstThirdSafeBaseRunners.find((entry) => entry.startBase === "third");
    if (firstThirdSafeHomeRunner) {
      firstThirdSafeHomeRunner.targetBase = "home";
      firstThirdSafeHomeRunner.manualTargetBase = "home";
      firstThirdSafeHomeRunner.arrivalTime = 2.0;
      firstThirdSafeHomeRunner.arrived = true;
    }
    defenseState = {
      ...createDefenseState(),
      runner: firstThirdSafeBatterRunner,
      baseRunners: firstThirdSafeBaseRunners,
      forceTargets: firstThirdForceTargets,
      outcome: firstThirdOutcome,
      battedBall: forceGrounder,
      throw: {
        ...firstThirdHomeThrow,
        startTime: 2.4,
        endTime: 3.1,
        safe: false
      }
    };
    refreshDefenseThrowSafety();
    const firstThirdHomeSafe = defenseState.throw.safe === true;
    count = { strikes: 0, balls: 0, outs: 0 };
    scores = { away: 0, home: 0 };
    battingTeam = "away";
    gamePhase = "defense";
    finishDefensePlay();
    const firstThirdHomeSafeState = count.outs === 0
      && bases.first?.id === firstThirdBatter.id
      && bases.second?.id === firstThirdFirstRunner.id
      && !bases.third
      && scores.away === 1;
    bases = createEmptyBases();
    scores = { away: 0, home: 0 };
    gamePhase = "playing";
    defenseControlMode = { away: "auto", home: "auto" };
    return JSON.stringify({
      longTarget,
      normalTargetBase,
      riskyTargetBase,
      slowLongTarget,
      slowWallTarget,
      firstThrowTargetBase: firstThrowState.targetBase,
      secondForceTargetBase,
      secondForceRunnerAutoTarget,
      secondForceOut,
      secondForceVisibleRunnerCount,
      secondForceRemovedFirstRunnerDisplay,
      batterForceHidden,
      secondForceClearsFirstRunner,
      thirdForceTargetBase,
      thirdForceOut,
      thirdForceIgnoresNonForcedBatterAtThird,
      thirdForceClearsSecondRunner,
      doublePlayClearsBases,
      secondOnlyNoForceTarget,
      lineDropForceTarget,
      caughtFlyForceTarget,
      batterOutRemovesSecondForce,
      loadedForceTarget,
      fallbackLeadForceTarget,
      autoFallbackForceTarget,
      manualRunFirstTarget,
      manualRunSecondTarget,
      manualSpecificBaseRunnerTarget,
      manualSpecificBatterRunnerTarget,
      manualSpecificReturnBaseRunnerTarget,
      manualSpecificReturnBatterRunnerTarget,
      thirdForceAfterBatterOutActive,
      manualTargetBase: manualThrowState.targetBase,
      returnTargetBase,
      firstToThirdStopsAtSecond,
      firstToThirdFirstStepSecond,
      beforeFirstToSecondFirstStepFirst,
      beforeFirstToSecondTouchesSecond,
      touchedFirstWhileRunning,
      returnFromBeyondSecondTouchesSecond,
      thirdTargetBase,
      homeTargetBase,
      manualThrowTargetBase: manualThrowState.targetBase,
      manualThirdThrowTargetBase: manualThirdThrowState.targetBase,
      throwToSecondX: manualThrowState.to.x === defenseField.bases.second.x,
      throwPlayNeedsThrow: throwPlay.needsThrow,
      throwSetFive: getAutoThrowSetSeconds({ fielding: 5 }),
      throwSetTen: getAutoThrowSetSeconds({ fielding: 10 }),
      throwSetOne: getAutoThrowSetSeconds({ fielding: 1 }),
      manualCommandTargetBase,
      backHomeAdvanceType,
      backHomeRunsEmpty,
      backHomeBatterOnFirst,
      waitsForRunningBatterRunner,
      resolvesAfterBatterRunnerSettles,
      lateRunnerToAlreadyHeldSecondSafe,
      keyedLateRunnerToHeldSecondSafe,
      keyedLateRunnerThrowStillSecond,
      keyedLateRunnerHeldBase,
      inFlightSecondThrowKept,
      inFlightSecondSafe,
      lateFirstThrowAcceptedBefore,
      lateFirstThrowAcceptedAfter,
      finalRuleOutWhenThrowArrivedFirst,
      lateThrowToAlreadySafeRunnerSafe,
      lateHeldBaseToAlreadySafeRunnerSafe,
      lateThrowToAlreadySafeBaseRunnerSafe,
      lateHeldBaseToAlreadySafeBaseRunnerSafe,
      earlyThrowToLateBaseRunnerOut,
      secondForceOutWithoutAnimationRunner,
      secondForceOutFromSnapshotAfterBasesClear,
      manualGrounderSecondForceKind,
      manualGrounderSecondForceOut,
      throwOutDespiteSingleOutcome,
      completedForceRecordedBeforeFinish,
      completedForceSurvivesFinish,
      earlySecondCommandAllowed,
      earlySecondCommandScheduled,
      earlySecondCommandForceOut,
      preselectedSecondCommandAllowed,
      preselectedSecondCommandStarted,
      preselectedSecondCommandForceOut,
      routeOnlyThirdRunnerOut
      ,
      realGrounderPendingManual,
      realGrounderPostCatchTarget,
      realGrounderSecondForceOut,
      trailingForceOutAtFirstAdvancesLeadRunner,
      firstThirdForceNoHome,
      firstThirdLeadForceTarget,
      firstThirdHomeTagOut,
      firstThirdHomeTagOutState,
      firstThirdHomeTagOutActual,
      firstThirdHomeSafe,
      firstThirdHomeSafeState
    });
  })()`
));

assert(runnerDecisionState.normalTargetBase === "first", "ordinary hits should stop the batter-runner at first");
assert(runnerDecisionState.longTarget === "first", "auto batter-runners should stop at first instead of taking extra bases on long singles");
assert(runnerDecisionState.riskyTargetBase === "first", "batter-runners should avoid reckless second-base attempts when the ball is fielded quickly");
assert(runnerDecisionState.slowLongTarget === "first", "slow batter-runners should hold at first unless the extra base is clearly safe");
assert(runnerDecisionState.slowWallTarget === "first", "slow batter-runners should stop at first on wall hits when second base is too risky");
assert(runnerDecisionState.throwPlayNeedsThrow === true, "fielded hits should become immediate throw plays");
assert(runnerDecisionState.firstThrowTargetBase === "first", "long singles should draw the throw to first after disabling auto extra-base attempts");
assert(runnerDecisionState.secondForceTargetBase === "second", "ordinary grounders with a runner on first should draw the force throw to second");
assert(runnerDecisionState.secondForceRunnerAutoTarget === "second", "the runner from first should only be forced to second on an ordinary grounder");
assert(runnerDecisionState.secondForceOut === true, "throws that reach second before the forced runner should be outs");
assert(runnerDecisionState.secondForceVisibleRunnerCount === 0, "forced-out base runners should disappear from the defense runner display");
assert(runnerDecisionState.secondForceRemovedFirstRunnerDisplay === true, "second-base force outs should remove the first-base runner animation");
assert(runnerDecisionState.batterForceHidden === true, "first-base force outs should hide the batter-runner display");
assert(runnerDecisionState.secondForceClearsFirstRunner === true, "second-base force outs should remove the first-base runner and leave the batter at first");
assert(runnerDecisionState.thirdForceTargetBase === "third", "ordinary grounders with runners on first and second should draw the lead force throw to third");
assert(runnerDecisionState.thirdForceOut === true, "throws that reach third before the forced runner should be outs");
assert(runnerDecisionState.thirdForceIgnoresNonForcedBatterAtThird === true, "third-base force plays should judge the forced runner from second, not another runner state at third");
assert(runnerDecisionState.thirdForceClearsSecondRunner === true, "third-base force outs should remove the second-base runner and advance the first-base runner");
assert(runnerDecisionState.doublePlayClearsBases === true, "second-to-first force relays should be able to clear both the forced runner and the batter-runner");
assert(runnerDecisionState.secondOnlyNoForceTarget === null, "a runner on second alone should not create a force play at third");
assert(runnerDecisionState.lineDropForceTarget === "second", "uncaught fair liners should still force the runner from first to second");
assert(runnerDecisionState.caughtFlyForceTarget === null, "caught fly balls should remove force plays because the batter-runner is out");
assert(runnerDecisionState.batterOutRemovesSecondForce === false, "putting out the batter-runner should remove the force at second");
assert(runnerDecisionState.loadedForceTarget === "home", "loaded bases should create a force play at home");
assert(runnerDecisionState.fallbackLeadForceTarget === "third", "first-and-second grounders should first consider the lead force at third");
assert(runnerDecisionState.autoFallbackForceTarget === "second", "auto throws should fall back to the trailing force base when the lead force is too late");
assert(runnerDecisionState.manualRunFirstTarget === "second", "manual baserunning should stop a first-base runner at second even on extra-base hits");
assert(runnerDecisionState.manualRunSecondTarget === "third", "manual baserunning should stop a second-base runner at third until instructed");
assert(runnerDecisionState.manualSpecificBaseRunnerTarget === "third", "manual third-base commands should send an eligible base runner from second to third");
assert(runnerDecisionState.manualSpecificBatterRunnerTarget === "first", "manual third-base commands should not move a batter-runner stopped at first");
assert(runnerDecisionState.manualSpecificReturnBaseRunnerTarget === "second", "manual second-base return commands should send an eligible base runner back to second");
assert(runnerDecisionState.manualSpecificReturnBatterRunnerTarget === "first", "manual return commands for base runners should not move a batter-runner stopped at first");
assert(runnerDecisionState.thirdForceAfterBatterOutActive === false, "a force on advanced runners should be removed after the batter-runner is out");
assert(runnerDecisionState.manualTargetBase === "second", "up input should send the batter-runner from first to second");
assert(runnerDecisionState.returnTargetBase === "first", "right input should send the batter-runner back to first");
assert(runnerDecisionState.firstToThirdStopsAtSecond === true, "third-base commands from first should keep the runner touching second");
assert(runnerDecisionState.firstToThirdFirstStepSecond === true, "third-base commands from first should move toward second first");
assert(runnerDecisionState.beforeFirstToSecondFirstStepFirst === true, "second-base commands before first should be ignored until first is reached");
assert(runnerDecisionState.beforeFirstToSecondTouchesSecond === true, "second-base commands before first should not skip first");
assert(runnerDecisionState.touchedFirstWhileRunning === false, "batter-runner should not mark first reached while still between home and first");
assert(runnerDecisionState.returnFromBeyondSecondTouchesSecond === true, "return commands after second should route back through second");
assert(runnerDecisionState.thirdTargetBase === "third", "left input should send the batter-runner to third");
assert(runnerDecisionState.homeTargetBase === "home", "down input should send the batter-runner home from third");
assert(runnerDecisionState.manualThrowTargetBase === "second", "throws should follow the instructed batter-runner to second");
assert(runnerDecisionState.manualThirdThrowTargetBase === "third", "manual throw selection should allow third-base throws");
assert(runnerDecisionState.throwToSecondX === true, "second-base attempts should be thrown to second");
assert(Math.abs(runnerDecisionState.throwSetFive - 0.7) < 0.001, "auto fielding 5 should take 0.7 seconds before throwing");
assert(runnerDecisionState.throwSetTen < runnerDecisionState.throwSetFive, "better fielding should shorten the throw release delay");
assert(runnerDecisionState.throwSetOne > runnerDecisionState.throwSetFive, "weaker fielding should lengthen the throw release delay");
assert(runnerDecisionState.manualCommandTargetBase === "second", "number-key throw input should retarget the held ball before release");
assert(runnerDecisionState.backHomeAdvanceType === "single", "throws to home should not turn ordinary hits into home runs");
assert(runnerDecisionState.backHomeRunsEmpty === 0, "throws to home on empty bases should not create a run");
assert(runnerDecisionState.backHomeBatterOnFirst === true, "throws to home on ordinary hits should leave the batter-runner on first when safe");
assert(runnerDecisionState.waitsForRunningBatterRunner === false, "defense should not resolve while the batter-runner is still between bases");
assert(runnerDecisionState.resolvesAfterBatterRunnerSettles === true, "defense should resolve once the batter-runner has settled on a base");
assert(runnerDecisionState.lateRunnerToAlreadyHeldSecondSafe === false, "runners advancing to a base after the throw already arrived should be out");
assert(runnerDecisionState.keyedLateRunnerToHeldSecondSafe === false, "keyed runner advances to a base already holding the ball should be out");
assert(runnerDecisionState.keyedLateRunnerThrowStillSecond === true, "keyed runner advances should not erase the already-held base throw");
assert(runnerDecisionState.keyedLateRunnerHeldBase === "second", "throws that reached second should mark second as holding the ball");
assert(runnerDecisionState.inFlightSecondThrowKept === true, "runner advances should not rebuild an in-flight throw to the same base");
assert(runnerDecisionState.inFlightSecondSafe === false, "runner advances to a base with an earlier in-flight throw should be out");
assert(runnerDecisionState.lateFirstThrowAcceptedBefore === true, "late first throws should remain available while the batter-runner is between bases");
assert(runnerDecisionState.lateFirstThrowAcceptedAfter === true, "late first throws should create a real throw once commanded");
assert(runnerDecisionState.finalRuleOutWhenThrowArrivedFirst === true, "final safety refresh should force out when the throw arrived before the runner");
assert(runnerDecisionState.lateThrowToAlreadySafeRunnerSafe === true, "throws arriving after the batter-runner is already on the base should be safe");
assert(runnerDecisionState.lateHeldBaseToAlreadySafeRunnerSafe === true, "held-ball retargeting should not out a batter-runner who was already safe at the base");
assert(runnerDecisionState.lateThrowToAlreadySafeBaseRunnerSafe === true, "throws arriving after a base runner is already on the base should be safe");
assert(runnerDecisionState.lateHeldBaseToAlreadySafeBaseRunnerSafe === true, "held-ball retargeting should not out a base runner who was already safe at the base");
assert(runnerDecisionState.earlyThrowToLateBaseRunnerOut === true, "base runners advancing to a base after the throw already arrived should still be out");
assert(runnerDecisionState.secondForceOutWithoutAnimationRunner === true, "second-base force throws should out the first-base runner even if runner animation data is missing");
assert(runnerDecisionState.secondForceOutFromSnapshotAfterBasesClear === true, "second-base force throws should use the play-start runner snapshot even if live bases are cleared");
assert(runnerDecisionState.manualGrounderSecondForceKind === "force", "manual throws to second on grounders with a runner on first should become force plays");
assert(runnerDecisionState.manualGrounderSecondForceOut === true, "manual throws to second on grounders should force out the runner from first when the throw arrives first");
assert(runnerDecisionState.throwOutDespiteSingleOutcome === true, "a completed second-base throw out should count even if the play outcome was not already marked force");
assert(runnerDecisionState.completedForceRecordedBeforeFinish === true, "completed second-base force throws should stay marked out before the play finishes");
assert(runnerDecisionState.completedForceSurvivesFinish === true, "completed force outs should not be recalculated back to safe when defense resolves");
assert(runnerDecisionState.earlySecondCommandAllowed === true, "manual second-base force commands should be accepted before the fielder completes the pickup");
assert(runnerDecisionState.earlySecondCommandScheduled === true, "early second-base commands should schedule a throw for the pickup moment");
assert(runnerDecisionState.earlySecondCommandForceOut === true, "early second-base commands on force grounders should still force out the runner from first");
assert(runnerDecisionState.preselectedSecondCommandAllowed === true, "manual force throws should accept the already-selected second-base target");
assert(runnerDecisionState.preselectedSecondCommandStarted === true, "pressing the already-selected second-base target should start the pending throw");
assert(runnerDecisionState.preselectedSecondCommandForceOut === true, "already-selected second-base force throws should still record the force out");
assert(runnerDecisionState.routeOnlyThirdRunnerOut === true, "runners whose route reaches third should be out when the ball is waiting at third before arrival");
assert(runnerDecisionState.realGrounderPendingManual === true, "manual grounder plays should wait for the fielder to field the ball before creating a throw");
assert(runnerDecisionState.realGrounderPostCatchTarget === "second", "manual grounder plays with a runner on first should target the second-base force after fielding");
assert(runnerDecisionState.realGrounderSecondForceOut === true, "real grounder plays should record the second-base force out when the ball gets there first");
assert(runnerDecisionState.trailingForceOutAtFirstAdvancesLeadRunner === true, "when auto takes the out at first, the forced first-base runner should advance safely to second");
assert(runnerDecisionState.firstThirdForceNoHome === true, "runners on first and third should not create a home force on an ordinary grounder");
assert(runnerDecisionState.firstThirdLeadForceTarget === "second", "runners on first and third should create the lead force at second");
assert(runnerDecisionState.firstThirdHomeTagOut === true, "home throws should out the runner from third when the ball arrives first");
assert(runnerDecisionState.firstThirdHomeTagOutState === true, `a home tag out from first and third should leave the batter at first and the first-base runner at second with no run (${JSON.stringify(runnerDecisionState.firstThirdHomeTagOutActual)})`);
assert(runnerDecisionState.firstThirdHomeSafe === true, "home throws should be safe when the runner from third arrived first");
assert(runnerDecisionState.firstThirdHomeSafeState === true, "a safe home throw from first and third should score one and keep the batter at first and first-base runner at second");

const manualFieldingControlState = JSON.parse(runInGame(
  context,
  `(() => {
    const originalGetActiveGamepad = getActiveGamepad;
    getActiveGamepad = () => null;
    keysDown.clear();
    keysDown.add("KeyD");
    defenseState = {
      ...createDefenseState(),
      active: true,
      manualFielding: true,
      manualFieldingComplete: false,
      battedBall: buildBattedBall(0.55, normalize({ x: 0.1, y: -1 }), hitLabels.grounder),
      fielders: [
        { role: "SS", x: 500, y: 430, currentX: 500, currentY: 430, speed: 9, fielding: 9, arm: 5 },
        { role: "2B", x: 700, y: 430, currentX: 700, currentY: 430, speed: 3, fielding: 3, arm: 5 }
      ],
      runner: createBatterRunner(findById(batters, "suzuki")),
      outcome: createManualFieldingPendingOutcome({ kind: "single", scoreType: "single" }, null)
    };
    const beforeFast = defenseState.fielders[0].currentX;
    const beforeSlow = defenseState.fielders[1].currentX;
    updateManualDefenseFielders(0.5);
    const fastMove = defenseState.fielders[0].currentX - beforeFast;
    const slowMove = defenseState.fielders[1].currentX - beforeSlow;
    const fielder = { ...defenseState.fielders[0], currentX: ball.x, currentY: ball.y };
    completeManualDefenseFielding(fielder, 0.8);
    const result = {
      fastMove,
      slowMove,
      movedSameDirection: fastMove > 0 && slowMove > 0,
      fieldingScalesMovement: fastMove > slowMove,
      completesOnFielding: defenseState.manualFieldingComplete === true,
      throwWaitsAfterFielding: defenseState.throw && !Number.isFinite(defenseState.throw.startTime),
      needsThrowAfterGrounder: defenseState.outcome.needsThrow === true
    };
    keysDown.clear();
    getActiveGamepad = originalGetActiveGamepad;
    return JSON.stringify(result);
  })()`
));

assert(manualFieldingControlState.movedSameDirection === true, "manual fielding input should move all defenders in the same direction");
assert(manualFieldingControlState.fieldingScalesMovement === true, "manual fielding movement should scale with fielding ability");
assert(manualFieldingControlState.completesOnFielding === true, "manual fielding should complete when a fielder reaches the ball");
assert(manualFieldingControlState.throwWaitsAfterFielding === true, "manual grounder fielding should wait for a throw command after pickup");
assert(manualFieldingControlState.needsThrowAfterGrounder === true, "manual grounder pickups should create a throw play");

const manualGrounderRollState = JSON.parse(runInGame(
  context,
  `(() => {
    defenseControlMode = { away: "auto", home: "manual" };
    battingTeam = "away";
    gamePhase = "playing";
    activeBatter = findById(batters, "suzuki");
    bases = createEmptyBases();
    startDefensePlay(hitLabels.grounder, "hit", 0.82, 0, normalize({ x: 0.22, y: -1 }));
    const landing = { ...defenseState.landingTarget };
    const target = { ...defenseState.target };
    const origin = { ...defenseState.origin };
    const duration = getGrounderContinuousRollDuration(defenseState.battedBall, landing, target);
    const p25 = getDefenseBallPoint(0, 0, duration * 0.25);
    const p55 = getDefenseBallPoint(0, 0, duration * 0.55);
    const p85 = getDefenseBallPoint(0, 0, duration * 0.85);
    const p100 = getDefenseBallPoint(0, 0, duration);
    const landingToTarget = Math.hypot(target.x - landing.x, target.y - landing.y);
    const manualUnfieldedTarget = getManualDefenseUnfieldedTarget(defenseState.battedBall, { kind: "out", caught: true, needsThrow: false });
    const manualUnfieldedRollDistance = Math.hypot(manualUnfieldedTarget.x - landing.x, manualUnfieldedTarget.y - landing.y);
    const d25 = Math.hypot(p25.x - origin.x, p25.y - origin.y);
    const d55 = Math.hypot(p55.x - origin.x, p55.y - origin.y);
    const d85 = Math.hypot(p85.x - origin.x, p85.y - origin.y);
    const stepEarly = Math.hypot(p55.x - p25.x, p55.y - p25.y);
    const stepLate = Math.hypot(p100.x - p85.x, p100.y - p85.y);
    return JSON.stringify({
      manualFielding: defenseState.manualFielding,
      landingToTarget,
      rollsForward: d25 < d55 && d55 < d85,
      deceleratesLate: stepLate < stepEarly,
      targetBeyondLanding: landingToTarget > 160,
      unfieldedRollsToOutfield: manualUnfieldedRollDistance >= 980,
      targetIsNotLanding: Math.hypot(target.x - landing.x, target.y - landing.y) > 1,
      reachesTarget: Math.hypot(p100.x - target.x, p100.y - target.y) < 1
    });
  })()`
));

assert(manualGrounderRollState.manualFielding === true, "manual grounder plays should use manual fielding mode");
assert(manualGrounderRollState.targetBeyondLanding === true, "manual hard grounders should have a rolling target beyond the first contact point");
assert(manualGrounderRollState.unfieldedRollsToOutfield === true, "unfielded manual hard grounders should keep rolling toward the outfield");
assert(manualGrounderRollState.targetIsNotLanding === true, "manual hard grounders should not stop at the initial grounder point");
assert(manualGrounderRollState.rollsForward === true, "manual hard grounders should roll forward smoothly");
assert(manualGrounderRollState.deceleratesLate === true, "manual hard grounders should gradually decelerate near the end");
assert(manualGrounderRollState.reachesTarget === true, "manual hard grounders should finish at the rolling target");

const manualLinerRollState = JSON.parse(runInGame(
  context,
  `(() => {
    const liner = {
      origin: { x: field.plateX, y: field.plateY },
      target: { x: field.plateX + 120, y: field.plateY - 760 },
      direction: normalize({ x: 0.15, y: -1 }),
      trajectory: "liner",
      isLiner: true,
      isGrounder: false,
      power: 0.72,
      ballTime: 0.8,
      flightDistance: 760,
      landingDistance: 760
    };
    const target = getManualDefenseUnfieldedTarget(liner, { kind: "single", scoreType: "single", caught: false, needsThrow: false });
    const landing = liner.target;
    const rollDistance = Math.hypot(target.x - landing.x, target.y - landing.y);
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: 0,
      duration: 5000,
      target,
      landingTarget: landing,
      origin: liner.origin,
      battedBall: liner,
      outcome: createManualFieldingPendingOutcome({ kind: "single", scoreType: "single" }, liner),
      throw: null
    };
    const rollTime = getDefenseRollDuration(liner, landing, target);
    const p00 = getDefenseBallPoint(0, 0, liner.ballTime);
    const p12 = getDefenseBallPoint(0, 0, liner.ballTime + rollTime * 0.12);
    const p28 = getDefenseBallPoint(0, 0, liner.ballTime + rollTime * 0.28);
    const p55 = getDefenseBallPoint(0, 0, liner.ballTime + rollTime * 0.55);
    const p82 = getDefenseBallPoint(0, 0, liner.ballTime + rollTime * 0.82);
    const p100 = getDefenseBallPoint(0, 0, liner.ballTime + rollTime);
    const afterLanding = getDefenseBallPoint(0, 0, liner.ballTime + rollTime * 0.5);
    const atEnd = getDefenseBallPoint(0, 0, liner.ballTime + rollTime);
    const startStep = Math.hypot(p12.x - p00.x, p12.y - p00.y);
    const midStep = Math.hypot(p55.x - p28.x, p55.y - p28.y);
    const lateStep = Math.hypot(p100.x - p82.x, p100.y - p82.y);
    return JSON.stringify({
      rollDistance,
      startsSmoothly: startStep < midStep * 1.05,
      deceleratesLate: lateStep < midStep,
      rollsAfterLanding: Math.hypot(afterLanding.x - landing.x, afterLanding.y - landing.y) > 40,
      reachesTarget: Math.hypot(atEnd.x - target.x, atEnd.y - target.y) < 1
    });
  })()`
));

assert(manualLinerRollState.rollDistance > 120, "manual unfielded liners should receive an auto-style rolling target beyond first landing");
assert(manualLinerRollState.startsSmoothly === true, "manual unfielded liners should not jump forward immediately after landing");
assert(manualLinerRollState.deceleratesLate === true, "manual unfielded liners should decelerate naturally near the end");
assert(manualLinerRollState.rollsAfterLanding === true, "manual unfielded liners should keep moving after landing");
assert(manualLinerRollState.reachesTarget === true, "manual unfielded liners should finish at the rolling target");

const manualAutoFlyState = JSON.parse(runInGame(
  context,
  `(() => {
    gameMode = "versus";
    defenseControlMode = { away: "auto", home: "manual" };
    battingTeam = "away";
    gamePhase = "playing";
    bases = createEmptyBases();
    activeBatter = findById(batters, "suzuki");
    setMatchup();
    const originalRandom = Math.random;
    Math.random = () => 0.5;
    startDefensePlay(hitLabels.routineFly, "out", 0.45, 0, normalize({ x: 0, y: -1 }));
    Math.random = originalRandom;
    return JSON.stringify({
      manualFielding: defenseState.manualFielding,
      manualFieldingComplete: defenseState.manualFieldingComplete,
      caught: defenseState.outcome.caught,
      needsThrow: defenseState.outcome.needsThrow,
      trajectory: defenseState.battedBall.trajectory
    });
  })()`
));

assert(manualAutoFlyState.trajectory === "fly", "manual-defense fly test should create a fly ball");
assert(manualAutoFlyState.manualFielding === false, "fly balls should be auto-fielded even when defense/running is manual");
assert(manualAutoFlyState.manualFieldingComplete === true, "auto-fielded manual-mode flies should not wait for manual movement");
assert(manualAutoFlyState.caught === true && manualAutoFlyState.needsThrow === false, "catchable manual-mode flies should resolve as automatic catches");

const manualFlyAssistState = JSON.parse(runInGame(
  context,
  `(() => {
    const flyBall = buildBattedBall(0.72, normalize({ x: 0.05, y: -1 }), hitLabels.fly);
    const landing = { ...flyBall.target };
    const fielder = { role: "C", x: landing.x + 320, y: landing.y + 80, currentX: landing.x + 320, currentY: landing.y + 80, speed: 6, fielding: 6, arm: 6 };
    const farFielder = { role: "R", x: landing.x + 720, y: landing.y + 260, currentX: landing.x + 720, currentY: landing.y + 260, speed: 6, fielding: 6, arm: 6 };
    defenseState = {
      ...createDefenseState(),
      active: true,
      manualFielding: true,
      manualFieldingComplete: false,
      battedBall: flyBall,
      landingTarget: landing,
      target: landing,
      chosenFielder: fielder,
      fielders: [fielder, farFielder],
      outcome: createManualFieldingPendingOutcome({ kind: "single", scoreType: "single" }, flyBall)
    };
    keysDown.clear();
    const beforeDistance = Math.hypot(defenseState.fielders[0].currentX - landing.x, defenseState.fielders[0].currentY - landing.y);
    const farBeforeDistance = Math.hypot(defenseState.fielders[1].currentX - landing.x, defenseState.fielders[1].currentY - landing.y);
    updateManualDefenseFielders(0.5);
    const afterDistance = Math.hypot(defenseState.fielders[0].currentX - landing.x, defenseState.fielders[0].currentY - landing.y);
    const farAfterDistance = Math.hypot(defenseState.fielders[1].currentX - landing.x, defenseState.fielders[1].currentY - landing.y);
    defenseState.fielders[0] = { ...fielder };
    keysDown.add("KeyW");
    updateManualDefenseFielders(0.5);
    const manualCorrectionY = defenseState.fielders[0].currentY;
    keysDown.clear();
    return JSON.stringify({
      autoMovesTowardLanding: afterDistance < beforeDistance,
      farFielderDoesNotGather: Math.abs(farAfterDistance - farBeforeDistance) < 1,
      manualCorrectionChangesPath: manualCorrectionY < fielder.currentY
    });
  })()`
));

assert(manualFlyAssistState.autoMovesTowardLanding === true, "manual fly fielding should auto-move fielders toward the landing marker");
assert(manualFlyAssistState.farFielderDoesNotGather === true, "manual fly auto-assist should not pull every defender to the landing marker");
assert(manualFlyAssistState.manualCorrectionChangesPath === true, "manual fly fielding should still allow player input to correct the route");

const manualFlyFieldingState = JSON.parse(runInGame(
  context,
  `(() => {
    const flyBall = buildBattedBall(0.72, normalize({ x: 0.05, y: -1 }), hitLabels.fly);
    const landing = { ...flyBall.target };
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now(),
      manualFielding: true,
      manualFieldingComplete: false,
      battedBall: flyBall,
      landingTarget: landing,
      target: landing,
      chosenFielder: { role: "C", x: landing.x + 130, y: landing.y, currentX: landing.x + 130, currentY: landing.y, speed: 8, fielding: 8, arm: 6 },
      fielders: [
        { role: "C", x: landing.x + 12, y: landing.y + 8, currentX: landing.x + 12, currentY: landing.y + 8, speed: 8, fielding: 8, arm: 6 },
        { role: "R", x: landing.x + 220, y: landing.y, currentX: landing.x + 220, currentY: landing.y, speed: 4, fielding: 4, arm: 5 }
      ],
      runner: createBatterRunner(findById(batters, "suzuki")),
      outcome: createManualFieldingPendingOutcome({ kind: "single", scoreType: "single" }, flyBall),
      manualCatchRadius: 0
    };
    const earlyCatch = getManualFlyLandingCatch(Math.max(0, flyBall.ballTime - 0.7)).caught;
    ball.x = defenseState.fielders[0].currentX;
    ball.y = defenseState.fielders[0].currentY;
    resolveManualDefenseFielding(Math.max(0, flyBall.ballTime - 0.7));
    const stillControllableBeforeLanding = defenseState.manualFieldingComplete === false;
    const catchResult = getManualFlyLandingCatch(Math.max(0, flyBall.ballTime - 0.1));
    if (catchResult.caught) {
      completeManualDefenseFielding(catchResult.fielder, flyBall.ballTime, landing);
    }
    return JSON.stringify({
      earlyCatch,
      stillControllableBeforeLanding,
      catchesNearLanding: catchResult.caught,
      catchIsOut: defenseState.outcome.kind === "out",
      noThrowAfterFlyCatch: defenseState.throw === null,
      fieldingPointIsLanding: Math.hypot(defenseState.outcome.fieldingPoint.x - landing.x, defenseState.outcome.fieldingPoint.y - landing.y) < 1
    });
  })()`
));

assert(manualFlyFieldingState.earlyCatch === false, "manual fly catches should wait until the ball is near landing");
assert(manualFlyFieldingState.stillControllableBeforeLanding === true, "manual fly fielding should stay controllable before the landing window");
assert(manualFlyFieldingState.catchesNearLanding === true, "manual fly fielding should catch when a defender is at the landing marker");
assert(manualFlyFieldingState.catchIsOut === true, "manual fly catches should resolve as outs");
assert(manualFlyFieldingState.noThrowAfterFlyCatch === true, "manual fly catches should not require a throw");
assert(manualFlyFieldingState.fieldingPointIsLanding === true, "manual fly catches should use the landing marker as the catch point");

const manualBouncedFlyPickupState = JSON.parse(runInGame(
  context,
  `(() => {
    const flyBall = buildBattedBall(0.72, normalize({ x: 0.18, y: -1 }), hitLabels.fly);
    const landing = { ...flyBall.target };
    const fielder = { role: "R", x: landing.x + 10, y: landing.y + 8, currentX: landing.x + 10, currentY: landing.y + 8, speed: 7, fielding: 7, arm: 6 };
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now(),
      manualFielding: true,
      manualFieldingComplete: false,
      battedBall: flyBall,
      landingTarget: landing,
      target: landing,
      chosenFielder: fielder,
      fielders: [fielder],
      runner: createBatterRunner(findById(batters, "suzuki")),
      outcome: createManualFieldingPendingOutcome({ kind: "single", scoreType: "single" }, flyBall),
      manualCatchRadius: 0
    };
    ball.x = landing.x;
    ball.y = landing.y;
    resolveManualDefenseFielding(flyBall.ballTime + 0.42);
    return JSON.stringify({
      pickedUpAfterBounce: defenseState.manualFieldingComplete === true,
      needsThrowAfterBounce: defenseState.outcome.needsThrow === true,
      throwWaitsForCommand: defenseState.throw && !Number.isFinite(defenseState.throw.startTime),
      pickupKind: defenseState.outcome.kind
    });
  })()`
));

assert(manualBouncedFlyPickupState.pickedUpAfterBounce === true, "manual fielders should be able to pick up fly balls after they bounce");
assert(manualBouncedFlyPickupState.needsThrowAfterBounce === true, "bounced fly pickups should create a throw play");
assert(manualBouncedFlyPickupState.throwWaitsForCommand === true, "bounced fly pickups should wait for a manual throw command");

const linkedRunningState = JSON.parse(runInGame(
  context,
  `(() => {
    battingTeam = "away";
    bases = createEmptyBases();
    const batter = findById(batters, "suzuki");
    const secondRunner = makeBaseRunner(findById(batters, "ichiro"));
    bases.second = secondRunner;
    const batterRunner = createBatterRunner(batter);
    batterRunner.x = defenseField.bases.first.x;
    batterRunner.y = defenseField.bases.first.y;
    batterRunner.currentBase = "first";
    batterRunner.targetBase = "first";
    batterRunner.arrived = true;
    defenseState = {
      ...createDefenseState(),
      runner: batterRunner,
      baseRunners: [{
        ...secondRunner,
        startBase: "second",
        targetBase: "second",
        route: [{ ...defenseField.bases.second }],
        x: defenseField.bases.second.x,
        y: defenseField.bases.second.y,
        speed: getRunnerSpeed(secondRunner),
        arrivalTime: 0,
        arrived: true
      }]
    };
    setBatterRunnerManualDestination(batterRunner, "second", 0);
    advanceForcedBaseRunnersForBatterTarget("second", 0);
    const secondRunnerTarget = defenseState.baseRunners[0].targetBase;
    const runsAfterSecond = applyManualDefenseAdvancement(batter);
    const batterOnSecond = bases.second?.id === batter.id;
    const runnerOnThird = bases.third?.id === secondRunner.id;

    bases = createEmptyBases();
    const blockingSecondRunner = makeBaseRunner(findById(batters, "ichiro"));
    bases.second = blockingSecondRunner;
    const noPassBatterRunner = createBatterRunner(batter);
    noPassBatterRunner.x = defenseField.bases.first.x;
    noPassBatterRunner.y = defenseField.bases.first.y;
    noPassBatterRunner.currentBase = "first";
    noPassBatterRunner.targetBase = "first";
    noPassBatterRunner.arrived = true;
    defenseState = {
      ...createDefenseState(),
      runner: noPassBatterRunner,
      baseRunners: [{
        ...blockingSecondRunner,
        startBase: "second",
        targetBase: "second",
        route: [{ ...defenseField.bases.second }],
        x: defenseField.bases.second.x,
        y: defenseField.bases.second.y,
        speed: getRunnerSpeed(blockingSecondRunner),
        arrivalTime: 0,
        arrived: true
      }]
    };
    const noPassTarget = getBatterRunnerNoPassTargetBase("third", 0);
    setBatterRunnerManualDestination(noPassBatterRunner, noPassTarget, 0);
    const noPassBatterTarget = noPassBatterRunner.targetBase;

    bases = createEmptyBases();
    const thirdRunner = makeBaseRunner(findById(batters, "ichiro"));
    bases.third = thirdRunner;
    const batterRunnerToThird = createBatterRunner(batter);
    batterRunnerToThird.x = defenseField.bases.second.x;
    batterRunnerToThird.y = defenseField.bases.second.y;
    batterRunnerToThird.currentBase = "second";
    batterRunnerToThird.targetBase = "second";
    batterRunnerToThird.arrived = true;
    defenseState = {
      ...createDefenseState(),
      runner: batterRunnerToThird,
      baseRunners: [{
        ...thirdRunner,
        startBase: "third",
        targetBase: "third",
        route: [{ ...defenseField.bases.third }],
        x: defenseField.bases.third.x,
        y: defenseField.bases.third.y,
        speed: getRunnerSpeed(thirdRunner),
        arrivalTime: 0,
        arrived: true
      }]
    };
    setBatterRunnerManualDestination(batterRunnerToThird, "third", 0);
    advanceForcedBaseRunnersForBatterTarget("third", 0);
    const thirdRunnerTarget = defenseState.baseRunners[0].targetBase;
    const runsAfterThird = applyManualDefenseAdvancement(batter);
    return JSON.stringify({
      secondRunnerTarget,
      batterOnSecond,
      runnerOnThird,
      runsAfterSecond,
      noPassTarget,
      noPassBatterTarget,
      thirdRunnerTarget,
      runsAfterThird,
      batterOnThird: bases.third?.id === batter.id
    });
  })()`
));

assert(linkedRunningState.secondRunnerTarget === "third", "runner on second should advance to third when the batter-runner targets second");
assert(linkedRunningState.batterOnSecond === true, "batter-runner should be placed on second after a safe manual second-base attempt");
assert(linkedRunningState.runnerOnThird === true, "linked runner from second should be placed on third");
assert(linkedRunningState.runsAfterSecond === 0, "second-to-third linked running should not score");
assert(linkedRunningState.noPassTarget === "second", "batter-runners should only advance into the base vacated by the runner ahead");
assert(linkedRunningState.noPassBatterTarget === "second", "batter-runners should be capped before overtaking a leading runner");
assert(linkedRunningState.thirdRunnerTarget === "home", "runner on third should advance home when the batter-runner targets third");
assert(linkedRunningState.runsAfterThird === 1, "third-to-home linked running should score one run");
assert(linkedRunningState.batterOnThird === true, "batter-runner should be placed on third after a safe manual third-base attempt");

const deepThrowTargetState = JSON.parse(runInGame(
  context,
  `(() => {
    activeBatter = findById(batters, "suzuki");
    const fielder = { role: "C", x: field.centerX, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.75, speed: 5, fielding: 5, arm: 5 };
    const runner = createBatterRunner(activeBatter);
    const deepBall = {
      target: { x: fielder.x, y: fielder.y },
      direction: normalize({ x: 0, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.75,
      landingDistance: defenseField.fenceDistance * 0.75,
      ballTime: 0.4,
      isGrounder: true,
      isLiner: false,
      isDeep: true,
      power: 0.8,
      trajectory: "grounder",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const earlyOutcome = { kind: "double", scoreType: "double", caught: false, fieldingTime: runner.arrivalTime - 0.15 };
    const lateOutcome = { kind: "double", scoreType: "double", caught: false, fieldingTime: runner.arrivalTime + 4.5 };
    const earlyTarget = getBatterRunnerTargetBase(earlyOutcome, deepBall, fielder, fielder, runner);
    const lateTarget = getBatterRunnerTargetBase(lateOutcome, deepBall, fielder, fielder, runner);
    setBatterRunnerDestination(runner, earlyTarget);
    const earlyThrowPlay = createThrowPlayForFieldedHit(fielder, deepBall, earlyOutcome, fielder, runner);
    const earlyThrowState = createThrowState(fielder, fielder, earlyThrowPlay, runner);
    return JSON.stringify({
      earlyTarget,
      lateTarget,
      earlyNeedsThrow: earlyThrowPlay.needsThrow,
      earlyThrowTargetBase: earlyThrowState.targetBase
    });
  })()`
));

assert(deepThrowTargetState.earlyTarget === "first", "deep balls should be thrown to first before the batter-runner reaches first");
assert(deepThrowTargetState.lateTarget === "first", "auto batter-runners should stop at first on non-homer hits to avoid reckless extra-base attempts");
assert(deepThrowTargetState.earlyNeedsThrow === true, "fielded deep balls in front of the fence should always create a throw");
assert(deepThrowTargetState.earlyThrowTargetBase === "first", "deep balls fielded before the batter reaches first should throw to first");

const baseRunnerAdvanceState = JSON.parse(runInGame(
  context,
  `(() => {
    function resetRunnerTest() {
      bases = createEmptyBases();
      scores = { away: 0, home: 0 };
      battingTeam = "away";
    }

    const batter = findById(batters, "suzuki");
    const fastRunner = findById(batters, "ichiro");
    const slowRunner = findById(batters, "murakami");
    const deepSingle = {
      target: { x: field.centerX + 160, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.72 },
      direction: normalize({ x: 0.25, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.72,
      landingDistance: defenseField.fenceDistance * 0.72,
      ballTime: 4.5,
      isGrounder: false,
      isLiner: true,
      isDeep: true,
      power: 0.9,
      trajectory: "liner",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const shallowSingle = {
      ...deepSingle,
      target: { x: field.centerX - 80, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.3 },
      flightDistance: defenseField.fenceDistance * 0.3,
      landingDistance: defenseField.fenceDistance * 0.3,
      ballTime: 1.2,
      isGrounder: true,
      isLiner: false,
      isDeep: false,
      power: 0.5,
      trajectory: "grounder"
    };
    const deepDouble = {
      ...deepSingle,
      target: { x: field.centerX + 220, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.76 },
      wallReboundTarget: { x: field.centerX + 180, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.72 },
      flightDistance: defenseField.fenceDistance * 0.78,
      landingDistance: defenseField.fenceDistance * 0.76,
      ballTime: 4.8,
      wallHit: true
    };
    const shortDouble = {
      ...deepSingle,
      target: { x: field.centerX + 120, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.42 },
      flightDistance: defenseField.fenceDistance * 0.42,
      landingDistance: defenseField.fenceDistance * 0.42,
      ballTime: 1.4,
      power: 0.7,
      isDeep: false
    };
    const cleanSingle = {
      ...deepSingle,
      target: { x: field.centerX + 70, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.56 },
      flightDistance: defenseField.fenceDistance * 0.56,
      landingDistance: defenseField.fenceDistance * 0.56,
      ballTime: 1.65,
      isHardOutfieldBounce: true,
      isDeep: false,
      power: 1.06
    };

    resetRunnerTest();
    bases.second = makeBaseRunner(fastRunner);
    const fastSecondRuns = advanceRunners("single", batter, deepSingle, { kind: "single", scoreType: "single", caught: false });
    const fastSecondBase = bases.first?.id;

    resetRunnerTest();
    bases.second = makeBaseRunner(findById(batters, "sato"));
    const averageSecondCleanRuns = advanceRunners("single", batter, cleanSingle, {
      kind: "single",
      scoreType: "single",
      caught: false,
      fieldingTime: 2.0,
      fieldingPoint: { x: field.centerX + 95, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.62 }
    });

    resetRunnerTest();
    bases.first = makeBaseRunner(fastRunner);
    const fastFirstDeepSingleRuns = advanceRunners("single", batter, deepSingle, { kind: "single", scoreType: "single", caught: false });
    const fastFirstOnThirdFromSingle = bases.third?.id === fastRunner.id;

    resetRunnerTest();
    bases.second = makeBaseRunner(slowRunner);
    const slowSecondRuns = advanceRunners("single", batter, shallowSingle, { kind: "single", scoreType: "single", caught: false });
    const slowSecondOnThird = bases.third?.id === slowRunner.id;

    resetRunnerTest();
    bases.first = makeBaseRunner(fastRunner);
    const fastFirstRuns = advanceRunners("double", batter, deepDouble, { kind: "double", scoreType: "double", caught: false });
    const fastBatterOnSecond = bases.second?.id === batter.id;

    resetRunnerTest();
    bases.first = makeBaseRunner(slowRunner);
    const slowFirstRuns = advanceRunners("double", batter, shortDouble, { kind: "double", scoreType: "double", caught: false });
    const slowFirstOnThird = bases.third?.id === slowRunner.id;

    return JSON.stringify({
      fastSecondRuns,
      fastSecondBase,
      averageSecondCleanRuns,
      fastFirstDeepSingleRuns,
      fastFirstOnThirdFromSingle,
      slowSecondRuns,
      slowSecondOnThird,
      fastFirstRuns,
      fastBatterOnSecond,
      slowFirstRuns,
      slowFirstOnThird
    });
  })()`
));

assert(baseRunnerAdvanceState.fastSecondRuns === 0, "auto runners on second should not score on non-homer hits");
assert(baseRunnerAdvanceState.fastSecondBase === "suzuki", "batter should still stop at first on a single");
assert(baseRunnerAdvanceState.averageSecondCleanRuns === 0, "auto baserunning should stop second-base runners at third on clean outfield hits");
assert(baseRunnerAdvanceState.fastFirstDeepSingleRuns === 0, "fast runners from first should not score on singles");
assert(baseRunnerAdvanceState.fastFirstOnThirdFromSingle === false, "auto runners from first should stop at second on deep singles");
assert(baseRunnerAdvanceState.slowSecondRuns === 0, "slow runners on second should not score on shallow singles");
assert(baseRunnerAdvanceState.slowSecondOnThird === true, "slow runners on second should stop at third on shallow singles");
assert(baseRunnerAdvanceState.fastFirstRuns === 0, "auto runners on first should not score on non-homer extra-base contact");
assert(baseRunnerAdvanceState.fastBatterOnSecond === false, "auto batter-runners should stop at first on non-homer hits");
assert(baseRunnerAdvanceState.slowFirstRuns === 0, "slow runners on first should not score on short doubles");
assert(baseRunnerAdvanceState.slowFirstOnThird === false, "auto runners from first should stop at second on short doubles");

const defenseOutAdvancementState = JSON.parse(runInGame(
  context,
  `(() => {
    const firstRunner = makeBaseRunner(findById(batters, "ichiro"));
    const secondRunner = makeBaseRunner(findById(batters, "shuto"));
    const thirdRunner = makeBaseRunner(findById(batters, "suzuki"));

    bases = createEmptyBases();
    bases.first = firstRunner;
    bases.second = secondRunner;
    bases.third = thirdRunner;
    scores = { away: 0, home: 0 };
    battingTeam = "away";
    count.outs = 1;
    defenseState = {
      ...createDefenseState(),
      baseRunners: [
        { ...firstRunner, startBase: "first", targetBase: "second", tagUp: true },
        { ...secondRunner, startBase: "second", targetBase: "third", tagUp: true },
        { ...thirdRunner, startBase: "third", targetBase: "home", tagUp: true, scored: true }
      ]
    };
    const loadedTagRuns = applyDefenseOutAdvancements();
    const loadedTagBases = {
      first: bases.first?.id || "",
      second: bases.second?.id || "",
      third: bases.third?.id || "",
      score: scores.away
    };

    bases = createEmptyBases();
    bases.first = firstRunner;
    bases.second = secondRunner;
    scores = { away: 0, home: 0 };
    defenseState = {
      ...createDefenseState(),
      baseRunners: [
        { ...firstRunner, startBase: "first", targetBase: "second", tagUp: true },
        { ...secondRunner, startBase: "second", targetBase: "second", tagUp: false }
      ]
    };
    const blockedRuns = applyDefenseOutAdvancements();
    const blockedBases = {
      first: bases.first?.id || "",
      second: bases.second?.id || "",
      third: bases.third?.id || "",
      score: scores.away
    };

    bases = createEmptyBases();
    bases.third = thirdRunner;
    scores = { away: 0, home: 0 };
    count.outs = 2;
    defenseState = {
      ...createDefenseState(),
      throw: { visualOnly: true, targetBase: "home", endTime: 2.0 },
      baseRunners: [
        { ...thirdRunner, startBase: "third", targetBase: "home", tagUp: true, scored: true, arrivalTime: 2.6 }
      ]
    };
    const failedRuns = applyDefenseOutAdvancements();
    const failedBases = {
      third: bases.third?.id || "",
      score: scores.away,
      outs: count.outs,
      tagUpOuts: defenseState.tagUpOutsAdded || 0
    };
    count.outs = 0;

    return JSON.stringify({
      loadedTagRuns,
      loadedTagBases,
      blockedRuns,
      blockedBases,
      failedRuns,
      failedBases
    });
  })()`
));

assert(defenseOutAdvancementState.loadedTagRuns === 1, "loaded tag-up fly balls should score only the runner from third");
assert(defenseOutAdvancementState.loadedTagBases.first === "", "loaded tag-up fly balls should leave first base empty");
assert(defenseOutAdvancementState.loadedTagBases.second === "ichiro", "runner from first should move to second on a legal tag-up chain");
assert(defenseOutAdvancementState.loadedTagBases.third === "shuto", "runner from second should move to third on a legal tag-up chain");
assert(defenseOutAdvancementState.loadedTagBases.score === 1, "loaded tag-up fly balls should add exactly one run");
assert(defenseOutAdvancementState.blockedRuns === 0, "blocked tag-up attempts should not score");
assert(defenseOutAdvancementState.blockedBases.first === "ichiro", "runner from first should stay put when second base remains occupied");
assert(defenseOutAdvancementState.blockedBases.second === "shuto", "non-advancing lead runner should keep second base");
assert(defenseOutAdvancementState.blockedBases.third === "", "blocked tag-up attempts should not create a runner on third");
assert(defenseOutAdvancementState.failedRuns === 0, "failed tag-up attempts should not score");
assert(defenseOutAdvancementState.failedBases.third === "", "failed tag-up runners should be removed from the bases");
assert(defenseOutAdvancementState.failedBases.score === 0, "failed tag-up attempts should not add a run");
assert(defenseOutAdvancementState.failedBases.outs === 3, "failed tag-up attempts should add an out and can complete the third out");
assert(defenseOutAdvancementState.failedBases.tagUpOuts === 1, "failed tag-up outs should be tracked on the defense state");

const deepOutfieldFielderState = JSON.parse(runInGame(
  context,
  `(() => {
    const fielders = [
      { role: "P", x: field.centerX, y: 250, speed: 10, fielding: 10, arm: 5 },
      { role: "L", x: field.centerX - 520, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.62, speed: 5, fielding: 5, arm: 5 },
      { role: "C", x: field.centerX, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.66, speed: 5, fielding: 5, arm: 5 },
      { role: "R", x: field.centerX + 520, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.62, speed: 5, fielding: 5, arm: 5 }
    ];
    const deepRollingBall = {
      target: { x: field.centerX, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.68 },
      direction: normalize({ x: 0, y: -1 }),
      landingDistance: defenseField.fenceDistance * 0.68,
      isGrounder: true,
      isLiner: false,
      power: 0.9,
      wallHit: false,
      groundRuleDouble: false,
      isDeep: false
    };
    const shallowGrounder = {
      ...deepRollingBall,
      target: { x: field.centerX + 18, y: 330 },
      landingDistance: 420
    };
    return JSON.stringify({
      deepRole: chooseDefenseFielder(fielders, deepRollingBall).role,
      shallowRole: chooseDefenseFielder(fielders, shallowGrounder).role
    });
  })()`
));

assert(deepOutfieldFielderState.deepRole !== "P", "deep outfield rollers should be handled by outfielders");
assert(deepOutfieldFielderState.shallowRole === "P", "pitcher should still handle shallow pitcher-area grounders");

const infieldGrounderDefenseState = JSON.parse(runInGame(
  context,
  `(() => {
    selected = createSelectedTeams(defaultMenuSelection);
    const fielders = getDefensiveLineup("away");
    const secondBaseSideGrounder = {
      target: { x: defenseField.bases.first.x * 0.48 + defenseField.bases.second.x * 0.52, y: 250 },
      direction: normalize({ x: 0.72, y: -1 }),
      landingDistance: 680,
      isGrounder: true,
      isLiner: false,
      power: 0.52,
      wallHit: false,
      groundRuleDouble: false,
      isDeep: false
    };
    const shortstopSideGrounder = {
      ...secondBaseSideGrounder,
      target: { x: defenseField.bases.third.x * 0.48 + defenseField.bases.second.x * 0.52, y: 250 },
      direction: normalize({ x: -0.72, y: -1 })
    };
    const pitcherSideGrounder = {
      ...secondBaseSideGrounder,
      target: { x: field.centerX + 14, y: 330 },
      direction: normalize({ x: 0.03, y: -1 }),
      landingDistance: 420,
      power: 0.36
    };
    const runner = createBatterRunner(findById(batters, "suzuki"));
    setBatterRunnerDestination(runner, "second");
    const throwState = createThrowState(
      { role: "2B", x: 940, y: 250, speed: 6, fielding: 6, arm: 5 },
      { x: 940, y: 250 },
      { kind: "force", caught: true, needsThrow: true, fieldingTime: 0.7 },
      runner
    );
    return JSON.stringify({
      roles: fielders.map((fielder) => fielder.role),
      secondRole: chooseDefenseFielder(fielders, secondBaseSideGrounder).role,
      shortstopRole: chooseDefenseFielder(fielders, shortstopSideGrounder).role,
      pitcherRole: chooseDefenseFielder(fielders, pitcherSideGrounder).role,
      autoThrowTarget: throwState.targetBase
    });
  })()`
));

assert(infieldGrounderDefenseState.roles.includes("2B"), "defense should include a temporary second baseman");
assert(infieldGrounderDefenseState.roles.includes("SS"), "defense should include a temporary shortstop");
assert(infieldGrounderDefenseState.secondRole === "2B", "second baseman should handle first-second gap grounders");
assert(infieldGrounderDefenseState.shortstopRole === "SS", "shortstop should handle second-third gap grounders");
assert(infieldGrounderDefenseState.pitcherRole === "P", "pitcher should handle weak grounders around the mound");
assert(infieldGrounderDefenseState.autoThrowTarget === "second", "auto throws should target the batter-runner destination");

const infieldTakeoverAndCatchState = JSON.parse(runInGame(
  context,
  `(() => {
    selected = createSelectedTeams(defaultMenuSelection);
    defenseState = createDefenseState();
    activeBatter = findById(batters, "suzuki");
    const originalRandom = Math.random;
    const fielders = getDefensiveLineup("away").map((fielder) => ({ ...fielder, currentX: fielder.x, currentY: fielder.y }));
    const runner = createBatterRunner(activeBatter);
    const second = fielders.find((fielder) => fielder.role === "2B");
    const short = fielders.find((fielder) => fielder.role === "SS");
    const outfieldRoller = {
      origin: { x: field.plateX, y: field.plateY - 10 },
      target: { x: second.x + 260, y: second.y + 18 },
      direction: normalize({ x: 0.42, y: -1 }),
      flightDistance: 700,
      landingDistance: 700,
      ballTime: 0.42,
      isGrounder: true,
      isLiner: false,
      isDeep: false,
      power: 0.82,
      trajectory: "grounder",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const infieldChoice = chooseDefenseFielder(fielders, outfieldRoller);
    const missedOutcome = { kind: "single", scoreType: "single", caught: false, fieldingTime: 0.42 };
    const outfieldTarget = {
      x: field.centerX + 260,
      y: defenseField.bases.home.y - defenseField.fenceDistance * 0.55
    };
    const takeover = shouldOutfielderTakeOverAfterInfieldMiss(infieldChoice, outfieldRoller, missedOutcome, outfieldTarget);
    const takeoverChoice = chooseDefenseFielder(
      fielders.filter((fielder) => !isInfielderRole(fielder.role)),
      { ...outfieldRoller, target: outfieldTarget, landingDistance: getFenceDistance(outfieldTarget), isDeep: true }
    );
    const slowInfieldBounceRoller = {
      ...outfieldRoller,
      target: {
        x: field.centerX + 145,
        y: defenseField.bases.home.y - defenseField.fenceDistance * 0.46
      },
      direction: normalize({ x: 0.22, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.22,
      landingDistance: defenseField.fenceDistance * 0.22,
      ballTime: 1.08,
      power: 0.58,
      isDeep: false
    };
    const slowInfieldChoice = chooseDefenseFielder(fielders, slowInfieldBounceRoller);
    const slowInfieldTarget = {
      x: field.centerX + 145,
      y: defenseField.bases.home.y - defenseField.fenceDistance * 0.46
    };
    const slowInfieldTakeover = shouldOutfielderTakeOverAfterInfieldMiss(
      slowInfieldChoice,
      slowInfieldBounceRoller,
      missedOutcome,
      slowInfieldTarget
    );
    defenseState = {
      ...createDefenseState(),
      active: true,
      battedBall: slowInfieldBounceRoller,
      chosenFielder: { role: "R" },
      target: slowInfieldTarget,
      landingTarget: slowInfieldBounceRoller.target,
      outcome: { kind: "single", caught: false },
      throw: null
    };
    const slowInfieldAttemptTarget = getDefenseFielderMovementTarget(second, 0.24);
    const reachableSlowInfieldRoller = {
      ...slowInfieldBounceRoller,
      target: {
        x: second.x + 44,
        y: second.y + 18
      },
      direction: normalize({ x: 0.28, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.34,
      landingDistance: defenseField.fenceDistance * 0.34,
      ballTime: 1.12,
      power: 0.66,
      isDeep: true
    };
    const reachableSlowInfieldChoice = chooseDefenseFielder(fielders, reachableSlowInfieldRoller);
    const reachableSlowInfieldPickup = resolveMiddleInfieldBouncePickup(
      reachableSlowInfieldChoice,
      reachableSlowInfieldRoller,
      { kind: "single", scoreType: "single", caught: false },
      runner
    );
    const speedCheckSlowRoller = {
      ...slowInfieldBounceRoller,
      target: {
        x: second.x + 210,
        y: second.y + 22
      },
      direction: normalize({ x: 0.42, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.39,
      landingDistance: defenseField.fenceDistance * 0.39,
      ballTime: 0.94,
      power: 0.7,
      isDeep: true
    };
    const speedCheckPoint = getClosestPointOnBattedBallRoute(second, speedCheckSlowRoller);
    const fastSlowRollerOutcome = resolveDefenseOutcome(
      {
        ...second,
        speed: 10,
        fielding: 8,
        fieldingPoint: speedCheckPoint,
        distanceToTarget: Math.hypot(speedCheckPoint.x - second.x, speedCheckPoint.y - second.y)
      },
      speedCheckSlowRoller,
      runner
    );
    const slowSlowRollerOutcome = resolveDefenseOutcome(
      {
        ...second,
        speed: 1,
        fielding: 4,
        fieldingPoint: speedCheckPoint,
        distanceToTarget: Math.hypot(speedCheckPoint.x - second.x, speedCheckPoint.y - second.y)
      },
      speedCheckSlowRoller,
      runner
    );
    const softDeepInfieldBouncer = {
      ...slowInfieldBounceRoller,
      target: {
        x: second.x + 176,
        y: defenseField.bases.home.y - defenseField.fenceDistance * 0.5
      },
      direction: normalize({ x: 0.34, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.47,
      landingDistance: defenseField.fenceDistance * 0.47,
      ballTime: 0.82,
      power: 0.62,
      isDeep: true
    };
    const softDeepInfieldChoice = chooseDefenseFielder(fielders, softDeepInfieldBouncer);
    defenseState = {
      ...createDefenseState(),
      active: true,
      battedBall: softDeepInfieldBouncer,
      chosenFielder: { role: "R" },
      target: softDeepInfieldBouncer.target,
      landingTarget: softDeepInfieldBouncer.target,
      outcome: { kind: "single", caught: false },
      throw: null
    };
    const softDeepInfieldAttemptTarget = getDefenseFielderMovementTarget(second, 0.22);
    const softDeepInfieldPickup = resolveMiddleInfieldBouncePickup(
      {
        ...softDeepInfieldChoice,
        speed: 9,
        fielding: 8,
        distanceToTarget: Math.hypot(softDeepInfieldChoice.fieldingPoint.x - softDeepInfieldChoice.x, softDeepInfieldChoice.fieldingPoint.y - softDeepInfieldChoice.y)
      },
      softDeepInfieldBouncer,
      { kind: "single", scoreType: "single", caught: false },
      runner
    );
    const infieldDropBall = {
      origin: { x: field.plateX, y: field.plateY - 10 },
      target: {
        x: second.x + 238,
        y: second.y + 24
      },
      direction: normalize({ x: 0.52, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.36,
      landingDistance: defenseField.fenceDistance * 0.36,
      ballTime: 1.02,
      isGrounder: false,
      isLiner: true,
      isLineDrop: true,
      isSoftDrop: true,
      isDeep: true,
      power: 0.62,
      trajectory: "liner",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const infieldDropChoice = chooseDefenseFielder(fielders, infieldDropBall);
    const infieldDropFastOutcome = resolveDefenseOutcome(
      {
        ...infieldDropChoice,
        speed: 10,
        fielding: 8,
        distanceToTarget: Math.hypot(infieldDropBall.target.x - infieldDropChoice.x, infieldDropBall.target.y - infieldDropChoice.y),
        fieldingPoint: infieldDropBall.target
      },
      infieldDropBall,
      runner
    );
    const infieldDropSlowOutcome = resolveDefenseOutcome(
      {
        ...infieldDropChoice,
        speed: 1,
        fielding: 3,
        distanceToTarget: Math.hypot(infieldDropBall.target.x - infieldDropChoice.x, infieldDropBall.target.y - infieldDropChoice.y),
        fieldingPoint: infieldDropBall.target
      },
      infieldDropBall,
      runner
    );
    const middleBounceGrounder = {
      ...outfieldRoller,
      target: {
        x: second.x + 52,
        y: second.y + 12
      },
      direction: normalize({ x: 0.3, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.38,
      landingDistance: defenseField.fenceDistance * 0.38,
      ballTime: 0.72,
      power: 0.92,
      isDeep: false,
      grounderGap: true
    };
    const middleBounceChoice = chooseDefenseFielder(fielders, middleBounceGrounder);
    const middleBouncePickup = resolveMiddleInfieldBouncePickup(
      middleBounceChoice,
      middleBounceGrounder,
      { kind: "single", scoreType: "single", caught: false },
      runner
    );
    defenseState = {
      ...createDefenseState(),
      active: true,
      battedBall: middleBounceGrounder,
      chosenFielder: { role: "R" },
      target: {
        x: second.x + 190,
        y: defenseField.bases.home.y - defenseField.fenceDistance * 0.54
      },
      landingTarget: middleBounceGrounder.target,
      outcome: { kind: "single", caught: false },
      throw: null
    };
    const middleBounceAttemptTarget = getDefenseFielderMovementTarget(second, 0.18);
    const hardGrounder = {
      ...outfieldRoller,
      target: { x: second.x + 118, y: second.y + 8 },
      direction: normalize({ x: 0.38, y: -1 }),
      landingDistance: 640,
      ballTime: 0.82,
      power: 0.9
    };
    const hardGrounderChoice = chooseDefenseFielder(fielders, hardGrounder);
    const hardGrounderFielder = {
      ...hardGrounderChoice,
      distanceToTarget: Math.hypot(hardGrounderChoice.fieldingPoint.x - hardGrounderChoice.x, hardGrounderChoice.fieldingPoint.y - hardGrounderChoice.y)
    };
    const hardGrounderOutcome = resolveDefenseOutcome(hardGrounderFielder, hardGrounder, runner);
    const liner = {
      ...hardGrounder,
      target: { x: short.x - 40, y: short.y + 6 },
      direction: normalize({ x: -0.34, y: -1 }),
      isGrounder: false,
      isLiner: true,
      trajectory: "liner",
      ballTime: 0.72,
      power: 0.84
    };
    const linerFielder = { ...short, speed: 10, fielding: 10, distanceToTarget: Math.hypot(liner.target.x - short.x, liner.target.y - short.y), fieldingPoint: liner.target };
    Math.random = () => 0.99;
    const linerOutcome = resolveDefenseOutcome(linerFielder, liner, runner);
    Math.random = originalRandom;
    const marginalLiner = {
      ...liner,
      target: { x: short.x - 118, y: short.y + 10 },
      ballTime: 0.68,
      power: 0.9
    };
    const marginalLinerFielder = { ...short, distanceToTarget: Math.hypot(marginalLiner.target.x - short.x, marginalLiner.target.y - short.y), fieldingPoint: marginalLiner.target };
    const marginalLinerOutcome = resolveDefenseOutcome(marginalLinerFielder, marginalLiner, runner);
    const pitcher = fielders.find((fielder) => fielder.role === "P");
    const pitcherNearGrounder = {
      ...hardGrounder,
      target: { x: field.centerX + 40, y: 180 },
      direction: normalize({ x: 0.05, y: -1 }),
      landingDistance: 500,
      ballTime: 0.62,
      power: 1.08
    };
    const pitcherChoicePoint = getDefenseFielderRouteTarget(pitcher, pitcherNearGrounder);
    const pitcherRouteUsesCutoff = getBattedBallRouteProgressForPoint(pitcherChoicePoint, pitcherNearGrounder) < 0.99;
    const difficultGrounder = {
      ...hardGrounder,
      ballTime: 0.58,
      power: 1.08
    };
    const hardHigh = getDifficultHardBallCatch({ ...second, fielding: 9 }, difficultGrounder, 0.78, difficultGrounder.ballTime, 0.52);
    const hardLow = getDifficultHardBallCatch({ ...second, fielding: 2 }, difficultGrounder, 0.78, difficultGrounder.ballTime, 0.52);
    const hardMiss = getDifficultHardBallCatch({ ...second, fielding: 10 }, difficultGrounder, 1.4, difficultGrounder.ballTime, 0.01);
    const closeHardBall = {
      ...hardGrounder,
      target: { x: second.x + 42, y: second.y + 8 },
      direction: normalize({ x: 0.34, y: -1 }),
      ballTime: 0.36,
      power: 1.18
    };
    const closePoint = { x: second.x + 36, y: second.y + 6 };
    const closeHigh = getCloseHardBallCatch({ ...second, fielding: 9 }, closeHardBall, closePoint, 0.9);
    const closeLowMiss = getCloseHardBallCatch({ ...second, fielding: 1 }, closeHardBall, closePoint, 0.9);
    const closeOutcomeFielder = { ...second, fielding: 9, distanceToTarget: 520, fieldingPoint: closePoint };
    Math.random = () => 0.99;
    const closeOutcome = resolveDefenseOutcome(closeOutcomeFielder, closeHardBall, runner);
    Math.random = originalRandom;
    const moderateGrounder = {
      ...hardGrounder,
      target: { x: second.x + 54, y: second.y + 4 },
      direction: normalize({ x: 0.2, y: -1 }),
      ballTime: 0.5,
      power: 0.58
    };
    const moderatePoint = { x: second.x + 48, y: second.y + 4 };
    const moderateHigh = getCloseHardBallCatch({ ...second, fielding: 9 }, moderateGrounder, moderatePoint, 0.9);
    const moderateLow = getCloseHardBallCatch({ ...second, fielding: 1 }, moderateGrounder, moderatePoint, 0.9);
    const moderateOutcome = resolveDefenseOutcome(
      { ...second, fielding: 9, distanceToTarget: 480, fieldingPoint: moderatePoint },
      moderateGrounder,
      runner
    );
    const frontGrounder = {
      ...hardGrounder,
      target: { x: second.x + 86, y: second.y + 8 },
      direction: normalize({ x: 0.26, y: -1 }),
      ballTime: 0.5,
      power: 0.74
    };
    const frontPoint = getClosestPointOnBattedBallRoute(second, frontGrounder);
    const frontRelation = getBattedBallFielderRelation(second, { ...frontGrounder, target: frontPoint });
    const frontHighPickup = getInfielderFrontGrounderPickup({ ...second, speed: 8, fielding: 9 }, frontGrounder, frontPoint, frontRelation);
    const frontLowPickup = getInfielderFrontGrounderPickup({ ...second, speed: 1, fielding: 1 }, frontGrounder, frontPoint, frontRelation);
    const frontHighOutcome = resolveDefenseOutcome(
      { ...second, speed: 8, fielding: 9, distanceToTarget: 430, fieldingPoint: frontPoint },
      frontGrounder,
      runner
    );
    const routeBodyGrounder = {
      ...hardGrounder,
      target: { x: second.x + 18, y: second.y + 8 },
      direction: normalize({ x: 0.14, y: -1 }),
      landingDistance: 680,
      ballTime: 0.38,
      power: 0.96
    };
    const routeBodyPoint = getClosestPointOnBattedBallRoute(second, routeBodyGrounder);
    const widenedRouteBodyFielder = { ...second, x: routeBodyPoint.x - 154, y: routeBodyPoint.y };
    const widenedRouteBodyCatch = getInfielderRouteBodyCatch(widenedRouteBodyFielder, routeBodyGrounder, routeBodyPoint);
    const widenedClosePoint = { x: second.x + 214, y: second.y + 4 };
    const widenedCloseGrounder = {
      ...hardGrounder,
      target: widenedClosePoint,
      direction: normalize({ x: 0.36, y: -1 }),
      ballTime: 0.42,
      power: 0.92
    };
    const widenedCloseCatch = getCloseHardBallCatch(second, widenedCloseGrounder, widenedClosePoint, 0.1);
    Math.random = () => 0.99;
    const routeBodyOutcome = resolveDefenseOutcome(
      { ...second, speed: 2, fielding: 2, distanceToTarget: 520, fieldingPoint: routeBodyPoint },
      routeBodyGrounder,
      runner
    );
    Math.random = originalRandom;
    const errorShot = {
      ...hardGrounder,
      target: { x: second.x + 32, y: second.y + 6 },
      direction: normalize({ x: 0.16, y: -1 }),
      ballTime: 0.72,
      power: 1.18
    };
    const errorRelation = getBattedBallFielderRelation(second, { ...errorShot, target: errorShot.target });
    const highError = getHardShotFieldingError({ ...second, fielding: 10 }, errorShot, errorRelation, 0.08);
    const lowError = getHardShotFieldingError({ ...second, fielding: 2 }, errorShot, errorRelation, 0.08);
    Math.random = () => 0.01;
    const errorOutcome = resolveDefenseOutcome(
      { ...second, fielding: 2, distanceToTarget: 32, fieldingPoint: errorShot.target },
      errorShot,
      runner
    );
    Math.random = originalRandom;
    const laneGrounder = {
      ...hardGrounder,
      target: { x: second.x + 230, y: second.y + 6 },
      direction: normalize({ x: 0.48, y: -1 }),
      ballTime: 0.58,
      power: 0.88,
      grounderGap: true
    };
    const lanePoint = laneGrounder.target;
    const laneHigh = resolveDefenseOutcome(
      { ...second, speed: 10, fielding: 10, distanceToTarget: 230, fieldingPoint: lanePoint },
      laneGrounder,
      runner
    );
    const laneLow = resolveDefenseOutcome(
      { ...second, speed: 1, fielding: 1, distanceToTarget: 230, fieldingPoint: lanePoint },
      laneGrounder,
      runner
    );
    const lateralAttemptGrounder = {
      ...hardGrounder,
      target: { x: second.x + 270, y: second.y + 26 },
      direction: normalize({ x: 0.62, y: -1 }),
      ballTime: 0.72,
      power: 0.82,
      grounderGap: true
    };
    defenseState = {
      ...createDefenseState(),
      active: true,
      battedBall: lateralAttemptGrounder,
      chosenFielder: { role: "R" },
      target: lateralAttemptGrounder.target,
      landingTarget: lateralAttemptGrounder.target,
      outcome: { kind: "single", caught: false },
      throw: null
    };
    const lateralAttemptTarget = getDefenseFielderMovementTarget(second, 0.2);
    const linerOrigin = { x: field.plateX, y: field.plateY - 10 };
    const throughSecondDirection = normalize({ x: second.x - linerOrigin.x, y: second.y - linerOrigin.y });
    const deepRouteLiner = {
      ...hardGrounder,
      origin: linerOrigin,
      target: {
        x: linerOrigin.x + throughSecondDirection.x * 1500,
        y: linerOrigin.y + throughSecondDirection.y * 1500
      },
      direction: throughSecondDirection,
      landingDistance: 1500,
      ballTime: 0.62,
      isGrounder: false,
      isLiner: true,
      isDeep: true,
      trajectory: "liner",
      power: 0.95
    };
    const deepRouteChoice = chooseDefenseFielder(fielders, deepRouteLiner);
    Math.random = () => 0.99;
    const deepRouteOutcome = resolveDefenseOutcome(deepRouteChoice, deepRouteLiner, runner);
    Math.random = originalRandom;
    const deepRollingDirection = normalize({ x: second.x - linerOrigin.x, y: second.y - linerOrigin.y });
    const deepRollingGrounder = {
      ...hardGrounder,
      origin: linerOrigin,
      target: {
        x: linerOrigin.x + deepRollingDirection.x * 1760,
        y: linerOrigin.y + deepRollingDirection.y * 1760
      },
      direction: deepRollingDirection,
      landingDistance: 1760,
      ballTime: 0.86,
      isGrounder: true,
      isLiner: false,
      isDeep: true,
      trajectory: "grounder",
      power: 0.9
    };
    const deepRollingChoice = chooseDefenseFielder(fielders, deepRollingGrounder);
    Math.random = () => 0.05;
    const deepRollingOutcome = resolveDefenseOutcome(
      { ...deepRollingChoice, speed: 8, fielding: 8 },
      deepRollingGrounder,
      runner
    );
    Math.random = originalRandom;
    return JSON.stringify({
      infieldChoice: infieldChoice.role,
      infieldChoiceIsInfielder: isInfielderRole(infieldChoice.role),
      infieldFieldingPointBeforeStop: infieldChoice.fieldingPoint.y > outfieldRoller.target.y + 20,
      takeover,
      takeoverRole: takeoverChoice.role,
      takeoverRoleIsInfielder: isInfielderRole(takeoverChoice.role),
      slowInfieldChoiceIsInfielder: isInfielderRole(slowInfieldChoice.role),
      slowInfieldUsesRouteCutoff: getBattedBallRouteProgressForPoint(slowInfieldChoice.fieldingPoint, slowInfieldBounceRoller) < 0.98,
      slowInfieldTakeover,
      slowInfieldAttemptMoves: Boolean(slowInfieldAttemptTarget),
      slowInfieldAttemptClosesGap: slowInfieldAttemptTarget
        && Math.hypot(slowInfieldAttemptTarget.x - slowInfieldTarget.x, slowInfieldAttemptTarget.y - slowInfieldTarget.y)
          < Math.hypot(second.x - slowInfieldTarget.x, second.y - slowInfieldTarget.y),
      reachableSlowInfieldChoiceIsInfielder: isInfielderRole(reachableSlowInfieldChoice.role),
      reachableSlowInfieldPickupForce: reachableSlowInfieldPickup?.outcome?.kind === "force",
      reachableSlowInfieldPickupNeedsThrow: reachableSlowInfieldPickup?.outcome?.needsThrow === true,
      fastSlowRollerStopped: fastSlowRollerOutcome.caught === true || Boolean(fastSlowRollerOutcome.fieldingPoint),
      fastSlowRollerNeedsThrow: fastSlowRollerOutcome.needsThrow === true,
      slowSlowRollerStopped: slowSlowRollerOutcome.caught === true || Boolean(slowSlowRollerOutcome.fieldingPoint),
      slowSlowRollerNoThrow: slowSlowRollerOutcome.needsThrow !== true,
      slowSlowRollerNeedsThrow: slowSlowRollerOutcome.needsThrow === true,
      slowSlowRollerKind: slowSlowRollerOutcome.kind,
      slowSlowRollerLabel: slowSlowRollerOutcome.label,
      slowSlowRollerFieldingTime: slowSlowRollerOutcome.fieldingTime,
      softDeepInfieldChoiceIsInfielder: isInfielderRole(softDeepInfieldChoice.role),
      softDeepInfieldUsesRouteCutoff: getBattedBallRouteProgressForPoint(softDeepInfieldChoice.fieldingPoint, softDeepInfieldBouncer) < 0.98,
      softDeepInfieldAttemptMoves: Boolean(softDeepInfieldAttemptTarget),
      softDeepInfieldPickupForce: softDeepInfieldPickup?.outcome?.kind === "force",
      softDeepInfieldPickupNeedsThrow: softDeepInfieldPickup?.outcome?.needsThrow === true,
      infieldDropChoiceIsInfielder: isInfielderRole(infieldDropChoice.role),
      infieldDropFastOut: infieldDropFastOutcome.kind === "out" || infieldDropFastOutcome.kind === "force",
      infieldDropFastHandledByInfielder: infieldDropFastOutcome.caught === true || Boolean(infieldDropFastOutcome.fieldingPoint),
      infieldDropSlowOut: infieldDropSlowOutcome.kind === "out" || infieldDropSlowOutcome.kind === "force",
      middleBounceChoiceIsInfielder: isInfielderRole(middleBounceChoice.role),
      middleBounceUsesRouteCutoff: getBattedBallRouteProgressForPoint(middleBounceChoice.fieldingPoint, middleBounceGrounder) < 0.98,
      middleBouncePickupForce: middleBouncePickup?.outcome?.kind === "force",
      middleBouncePickupNeedsThrow: middleBouncePickup?.outcome?.needsThrow === true,
      middleBounceAttemptMoves: Boolean(middleBounceAttemptTarget),
      middleBounceAttemptMovesRight: middleBounceAttemptTarget && middleBounceAttemptTarget.x > second.x + 18,
      hardGrounderCaught: hardGrounderOutcome.caught,
      hardGrounderNeedsThrow: hardGrounderOutcome.needsThrow,
      hardGrounderFieldingPointPreserved: hardGrounderOutcome.fieldingPoint && Math.abs(hardGrounderOutcome.fieldingPoint.x - hardGrounderChoice.fieldingPoint.x) < 1,
      hardGrounderCaughtBeforeStop: hardGrounderOutcome.fieldingTime < hardGrounder.ballTime,
      linerCaught: linerOutcome.caught,
      linerKind: linerOutcome.kind,
      marginalLinerCaught: marginalLinerOutcome.caught,
      marginalLinerScoreType: marginalLinerOutcome.scoreType,
      pitcherRouteUsesCutoff,
      highDifficultCaught: hardHigh.caught,
      lowDifficultCaught: hardLow.caught,
      highDifficultChance: hardHigh.chance,
      lowDifficultChance: hardLow.chance,
      tooLateCaught: hardMiss.caught,
      closeHighCaught: closeHigh.caught,
      closeLowMissCaught: closeLowMiss.caught,
      closeHighChance: closeHigh.chance,
      closeLowChance: closeLowMiss.chance,
      closeOutcomeCaught: closeOutcome.caught,
      closeOutcomeLabel: closeOutcome.label,
      moderateHighCaught: moderateHigh.caught,
      moderateLowCaught: moderateLow.caught,
      moderateHighChance: moderateHigh.chance,
      moderateLowChance: moderateLow.chance,
      moderateOutcomeCaught: moderateOutcome.caught,
      moderateOutcomeNeedsThrow: moderateOutcome.needsThrow,
      frontHighPickupCaught: frontHighPickup.caught,
      frontLowPickupCaught: frontLowPickup.caught,
      frontHighOutcomeCaught: frontHighOutcome.caught,
      frontHighOutcomeNeedsThrow: frontHighOutcome.needsThrow,
      widenedRouteBodyCaught: widenedRouteBodyCatch.caught,
      widenedCloseCaught: widenedCloseCatch.caught,
      routeBodyOutcomeCaught: routeBodyOutcome.caught,
      routeBodyOutcomeNeedsThrow: routeBodyOutcome.needsThrow,
      routeBodyOutcomeKind: routeBodyOutcome.kind,
      highErrorChance: highError.chance,
      lowErrorChance: lowError.chance,
      highErrorTriggered: highError.error,
      lowErrorTriggered: lowError.error,
      errorOutcomeIsError: errorOutcome.fieldingError === true,
      errorOutcomeCaught: errorOutcome.caught,
      laneHighCaught: laneHigh.caught,
      laneHighNeedsThrow: laneHigh.needsThrow,
      laneLowCaught: laneLow.caught,
      laneLowScoreType: laneLow.scoreType,
      lateralAttempt: isInfielderAttemptRouteBall(second, lateralAttemptGrounder),
      lateralAttemptMovesRight: lateralAttemptTarget && lateralAttemptTarget.x > second.x + 30,
      deepRouteChoiceRole: deepRouteChoice.role,
      deepRouteChoiceIsInfielder: isInfielderRole(deepRouteChoice.role),
      deepRouteFieldingPointBeforeLanding: getBattedBallRouteProgressForPoint(deepRouteChoice.fieldingPoint, deepRouteLiner) < 0.98,
      deepRouteLinerCaught: deepRouteOutcome.caught,
      deepRouteLinerKind: deepRouteOutcome.kind,
      deepRollingChoiceIsInfielder: isInfielderRole(deepRollingChoice.role),
      deepRollingFieldingPointBeforeStop: getBattedBallRouteProgressForPoint(deepRollingChoice.fieldingPoint, deepRollingGrounder) < 0.98,
      deepRollingCaught: deepRollingOutcome.caught,
      deepRollingNeedsThrow: deepRollingOutcome.needsThrow
    });
  })()`
));

assert(infieldTakeoverAndCatchState.infieldChoiceIsInfielder === true, "shallow infield grounders should be checked by an infielder first");
assert(infieldTakeoverAndCatchState.infieldFieldingPointBeforeStop === true, "infielders should move to cut off the ball route before the grounder stops");
assert(infieldTakeoverAndCatchState.takeover === true, "grounders that get past the infield should switch to outfield handling");
assert(infieldTakeoverAndCatchState.takeoverRoleIsInfielder === false, "outfield takeover should assign the ball to an outfielder");
assert(infieldTakeoverAndCatchState.slowInfieldChoiceIsInfielder === true, "slow grounders with an infield first bounce should be handled by an infielder");
assert(infieldTakeoverAndCatchState.slowInfieldUsesRouteCutoff === true, "infielders should chase slow infield-bounce grounders along the ball route");
assert(infieldTakeoverAndCatchState.slowInfieldTakeover === true, "slow infield-bounce grounders that pass the infield should be handed off to outfielders");
assert(infieldTakeoverAndCatchState.slowInfieldAttemptMoves === true, "infielders should still move toward slow infield-bounce grounders before outfield takeover");
assert(infieldTakeoverAndCatchState.slowInfieldAttemptClosesGap === true, "infielders should visibly close the gap on slow grounders before they reach the outfield");
assert(infieldTakeoverAndCatchState.reachableSlowInfieldChoiceIsInfielder === true, "reachable slow infield-bounce grounders should stay with an infielder");
assert(infieldTakeoverAndCatchState.reachableSlowInfieldPickupForce === true, "reachable slow infield-bounce grounders should become infield throw plays");
assert(infieldTakeoverAndCatchState.reachableSlowInfieldPickupNeedsThrow === true, "slow infield-bounce pickups should require a throw to first");
assert(infieldTakeoverAndCatchState.fastSlowRollerStopped === true && infieldTakeoverAndCatchState.fastSlowRollerNeedsThrow === true, "infielders who arrive in time should always stop slow infield-bounce grounders");
assert(infieldTakeoverAndCatchState.slowSlowRollerStopped === true, `faster slow infielders should still react to weak grounders and stop the ball when they arrive (${JSON.stringify({ kind: infieldTakeoverAndCatchState.slowSlowRollerKind, label: infieldTakeoverAndCatchState.slowSlowRollerLabel, fieldingTime: infieldTakeoverAndCatchState.slowSlowRollerFieldingTime })})`);
assert(infieldTakeoverAndCatchState.slowSlowRollerNeedsThrow === true, "infielders should throw after fielding reachable infield grounders even when the runner may be safe");
assert(infieldTakeoverAndCatchState.softDeepInfieldChoiceIsInfielder === true, "soft grounders that first bounce in the infield should not be ignored as outfield balls");
assert(infieldTakeoverAndCatchState.softDeepInfieldUsesRouteCutoff === true, "soft infield-bounce grounders should send infielders to the rolling route");
assert(infieldTakeoverAndCatchState.softDeepInfieldAttemptMoves === true, "nearby infielders should visibly react to soft infield-bounce grounders even when another fielder finishes");
assert(infieldTakeoverAndCatchState.softDeepInfieldPickupForce === true && infieldTakeoverAndCatchState.softDeepInfieldPickupNeedsThrow === true, "reachable soft infield-bounce grounders should become throw plays");
assert(infieldTakeoverAndCatchState.infieldDropChoiceIsInfielder === true, "slow bloopers landing in the infield should be assigned to infielders first");
assert(infieldTakeoverAndCatchState.infieldDropFastHandledByInfielder === true && infieldTakeoverAndCatchState.infieldDropFastOut === true, "infielders who arrive in time should turn slow infield bloopers into outs");
assert(infieldTakeoverAndCatchState.infieldDropSlowOut === false, "slow infielders who cannot reach bloopers in time should let them fall through");
assert(infieldTakeoverAndCatchState.middleBounceChoiceIsInfielder === true, "middle infielders should react to grounders that bounce in front of second or short");
assert(infieldTakeoverAndCatchState.middleBounceUsesRouteCutoff === true, "middle-infield bounce grounders should be cut off before the final roll target");
assert(infieldTakeoverAndCatchState.middleBouncePickupForce === true, "reachable middle-infield bounce grounders should turn into infield throw plays");
assert(infieldTakeoverAndCatchState.middleBouncePickupNeedsThrow === true, "middle-infield bounce pickups should require a throw to first");
assert(infieldTakeoverAndCatchState.middleBounceAttemptMoves === true, "middle infielders should still move toward the rolling route when an outfielder finishes the play");
assert(infieldTakeoverAndCatchState.middleBounceAttemptMovesRight === true, "second basemen should take a visible step toward nearby right-side rolling grounders");
assert(infieldTakeoverAndCatchState.hardGrounderCaught === true, "quick infielders should handle hard grounders they reach");
assert(infieldTakeoverAndCatchState.hardGrounderNeedsThrow === true, "fielded infield grounders should create a throw play");
assert(infieldTakeoverAndCatchState.hardGrounderFieldingPointPreserved === true, "fielded infield grounders should use the route cutoff point as the catch point");
assert(infieldTakeoverAndCatchState.hardGrounderCaughtBeforeStop === true, "infielders should catch rolling grounders before the natural stop point");
assert(infieldTakeoverAndCatchState.linerCaught === true && infieldTakeoverAndCatchState.linerKind === "out", "infielders should catch liners they reach");
assert(infieldTakeoverAndCatchState.marginalLinerCaught === false, "infielders should not catch every hard liner that is only marginally within reach");
assert(infieldTakeoverAndCatchState.pitcherRouteUsesCutoff === true, "pitchers should also react to hard balls passing near their route");
assert(infieldTakeoverAndCatchState.highDifficultChance > infieldTakeoverAndCatchState.lowDifficultChance, "better fielders should have a higher difficult-catch chance");
assert(infieldTakeoverAndCatchState.highDifficultCaught === true, "high-fielding defenders should sometimes catch hard balls that are slightly out of reach");
assert(infieldTakeoverAndCatchState.lowDifficultCaught === false, "low-fielding defenders should miss the same difficult hard ball more often");
assert(infieldTakeoverAndCatchState.tooLateCaught === false, "fielders should not catch hard balls that are far too late");
assert(infieldTakeoverAndCatchState.closeHighChance > infieldTakeoverAndCatchState.closeLowChance, "close hard-ball catch chance should scale with fielding");
assert(infieldTakeoverAndCatchState.closeHighCaught === true, "high-fielding infielders should usually catch hard balls near their body");
assert(infieldTakeoverAndCatchState.closeLowMissCaught === false, "low-fielding infielders should still sometimes miss hard balls near their body");
assert(infieldTakeoverAndCatchState.closeOutcomeCaught === true, "near-body hard balls should become reaction catches");

assert(infieldTakeoverAndCatchState.moderateHighChance > infieldTakeoverAndCatchState.moderateLowChance, "moderate near-body grounders should scale with fielding");
assert(infieldTakeoverAndCatchState.moderateHighCaught === true, "high-fielding defenders should catch moderate grounders near their body");
assert(infieldTakeoverAndCatchState.moderateLowCaught === false, "low-fielding defenders should still miss some moderate near-body grounders");
assert(infieldTakeoverAndCatchState.moderateOutcomeCaught === true && infieldTakeoverAndCatchState.moderateOutcomeNeedsThrow === true, "near-body grounders should become fielded throw plays");
assert(infieldTakeoverAndCatchState.frontHighPickupCaught === true, "high-fielding infielders should handle grounders directly in front of them");
assert(infieldTakeoverAndCatchState.frontLowPickupCaught === false, "low-fielding infielders should not receive the front-side pickup rescue");
assert(infieldTakeoverAndCatchState.frontHighOutcomeCaught === true && infieldTakeoverAndCatchState.frontHighOutcomeNeedsThrow === true, "fielded front-side grounders should create throw plays");
assert(infieldTakeoverAndCatchState.widenedRouteBodyCaught === true, "infielders should cover roughly twenty percent more nearby grounder width");
assert(infieldTakeoverAndCatchState.widenedCloseCaught === true, "nearby hard grounder reaction range should be roughly twenty percent wider");
assert(infieldTakeoverAndCatchState.routeBodyOutcomeCaught === true && infieldTakeoverAndCatchState.routeBodyOutcomeNeedsThrow === true, "infielders should field grounders that pass through their body route");
assert(infieldTakeoverAndCatchState.routeBodyOutcomeKind === "force", "body-route infield grounders should create force throw plays");
assert(infieldTakeoverAndCatchState.lowErrorChance > infieldTakeoverAndCatchState.highErrorChance, "lower-fielding defenders should make more errors on hard shots at the body");
assert(infieldTakeoverAndCatchState.highErrorTriggered === false && infieldTakeoverAndCatchState.lowErrorTriggered === true, "the same hard-shot roll should punish weaker defenders more than elite defenders");
assert(infieldTakeoverAndCatchState.errorOutcomeIsError === true && infieldTakeoverAndCatchState.errorOutcomeCaught === false, "hard-shot errors should resolve as visible non-catch error plays");
assert(infieldTakeoverAndCatchState.laneHighCaught === true && infieldTakeoverAndCatchState.laneHighNeedsThrow === true, "excellent infielders should handle hard gap grounders that challenge their range");
assert(infieldTakeoverAndCatchState.laneLowCaught === false, "weaker infielders should allow the same hard gap grounder through");
assert(infieldTakeoverAndCatchState.lateralAttempt === true && infieldTakeoverAndCatchState.lateralAttemptMovesRight === true, "infielders should move laterally to cut off balls headed past their side even when another fielder handles the result");
assert(infieldTakeoverAndCatchState.deepRouteChoiceIsInfielder === true, "infielders should react to hard liners passing near their route");
assert(infieldTakeoverAndCatchState.deepRouteFieldingPointBeforeLanding === true, "infielders should intercept liners on the route, not wait for the landing target");
assert(infieldTakeoverAndCatchState.deepRouteLinerCaught === true && infieldTakeoverAndCatchState.deepRouteLinerKind === "out", "near-body liners should be catchable by infielders");
assert(infieldTakeoverAndCatchState.deepRollingChoiceIsInfielder === true, "deep rolling grounders should still be checked by infielders before outfielders");
assert(infieldTakeoverAndCatchState.deepRollingFieldingPointBeforeStop === true, "infielders should react along the route of deep rolling grounders");
assert(infieldTakeoverAndCatchState.deepRollingCaught === true && infieldTakeoverAndCatchState.deepRollingNeedsThrow === true, "reachable deep rolling grounders should become infield throw plays");

const fenceInPlayState = JSON.parse(runInGame(
  context,
  `(() => {
    activeBatter = findById(batters, "suzuki");
    const fielders = getDefensiveLineup("away").map((fielder) => ({ ...fielder, currentX: fielder.x, currentY: fielder.y }));
    const runner = createBatterRunner(activeBatter);
    const rollingBall = {
      origin: { x: field.plateX, y: field.plateY - 10 },
      target: { x: field.centerX, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.22 },
      direction: normalize({ x: 0, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.22,
      landingDistance: defenseField.fenceDistance * 0.22,
      ballTime: 0.5,
      isGrounder: true,
      isLiner: false,
      isDeep: false,
      power: 0.8,
      trajectory: "grounder",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    let chosen = chooseDefenseFielder(fielders, rollingBall);
    let outcome = { kind: "single", scoreType: "single", caught: false, fieldingTime: 0.5 };
    const fieldingTarget = getDefenseFieldingTarget(rollingBall, outcome);
    if (shouldOutfielderTakeOverAfterInfieldMiss(chosen, rollingBall, outcome, fieldingTarget)) {
      chosen = chooseDefenseFielder(
        fielders.filter((fielder) => !isInfielderRole(fielder.role)),
        { ...rollingBall, target: fieldingTarget, landingDistance: Math.max(rollingBall.landingDistance, getFenceDistance(fieldingTarget)), isDeep: true }
      );
    }
    setBatterRunnerDestination(runner, getBatterRunnerTargetBase(outcome, rollingBall, fieldingTarget, chosen, runner));
    const throwPlay = createThrowPlayForFieldedHit(chosen, rollingBall, outcome, fieldingTarget, runner);
    return JSON.stringify({
      chosenRole: chosen.role,
      targetDistance: getFenceDistance(fieldingTarget),
      groundRuleDouble: rollingBall.groundRuleDouble,
      needsThrow: throwPlay.needsThrow,
      throwLabel: throwPlay.label
    });
  })()`
));

assert(fenceInPlayState.chosenRole !== "P", "balls rolling deep after a shallow landing should be assigned to outfielders");
assert(fenceInPlayState.targetDistance <= defenseTuningState.fenceDistance + 1, "in-play fence rollers should stay on the field side of the fence");
assert(fenceInPlayState.groundRuleDouble === false, "ordinary fence rollers should remain in play");
assert(fenceInPlayState.needsThrow === true, "fielded in-play fence rollers should always create a throw");
assert(typeof fenceInPlayState.throwLabel === "string", "in-play fence rollers should visibly become throw plays");

const hardGrounderFenceState = JSON.parse(runInGame(
  context,
  `(() => {
    activeBatter = findById(batters, "judge");
    const fielder = { role: "R", x: field.centerX + 520, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.75, speed: 5, fielding: 5, arm: 5 };
    const runner = createBatterRunner(activeBatter);
    const hardGrounder = {
      target: { x: field.centerX + 260, y: defenseField.bases.home.y - defenseField.fenceDistance + 96 },
      direction: normalize({ x: 0.22, y: -1 }),
      flightDistance: defenseField.fenceDistance - 96,
      landingDistance: defenseField.fenceDistance - 96,
      ballTime: 0.8,
      isGrounder: true,
      isLiner: false,
      isDeep: true,
      power: 1.3,
      trajectory: "grounder",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const outcome = { kind: "double", scoreType: "double", caught: false, fieldingTime: 0.8 };
    const target = getDefenseFieldingTarget(hardGrounder, outcome);
    setBatterRunnerDestination(runner, getBatterRunnerTargetBase(outcome, hardGrounder, target, fielder, runner));
    const throwPlay = createThrowPlayForFieldedHit(fielder, hardGrounder, outcome, target, runner);
    const throwState = createThrowState(fielder, target, throwPlay, runner);
    return JSON.stringify({
      groundRuleDouble: hardGrounder.groundRuleDouble,
      atFence: isAtOutfieldFence(target),
      needsThrow: throwPlay.needsThrow,
      throwActive: Boolean(throwState)
    });
  })()`
));

assert(hardGrounderFenceState.groundRuleDouble === false, "hard grounders reaching the fence should remain in play");
assert(hardGrounderFenceState.atFence === true, "hard grounders reaching the fence should be fielded at the fence");
assert(hardGrounderFenceState.needsThrow === true, "hard grounders at the fence should create a throw");
assert(hardGrounderFenceState.throwActive === true, "hard grounders at the fence should have a throw animation state");

const hardOutfieldGrounderInfielderState = JSON.parse(runInGame(
  context,
  `(() => {
    const origin = { x: field.plateX, y: field.plateY - 10 };
    const target = { x: field.centerX - 300, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.62 };
    const battedBall = {
      origin,
      target,
      direction: normalize({ x: target.x - origin.x, y: target.y - origin.y }),
      flightDistance: defenseField.fenceDistance * 0.62,
      landingDistance: defenseField.fenceDistance * 0.62,
      ballTime: 0.76,
      isGrounder: true,
      isLiner: false,
      isHardOutfieldBounce: true,
      isDeep: true,
      power: 1.12,
      trajectory: "grounder",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const fielder = { role: "SS", x: field.centerX - 118, y: field.plateY - 410, speed: 10, fielding: 10, arm: 8 };
    const fieldingPoint = getClosestPointOnBattedBallRoute(fielder, battedBall);
    const routeFielder = {
      ...fielder,
      x: fieldingPoint.x,
      y: fieldingPoint.y,
      fieldingPoint,
      distanceToTarget: 0
    };
    const bodyCatch = getInfielderRouteBodyCatch(routeFielder, battedBall, fieldingPoint);
    const closeCatch = getCloseHardBallCatch(routeFielder, battedBall, fieldingPoint, 0.1);
    const outcome = resolveDefenseOutcome(routeFielder, battedBall, createBatterRunner(activeBatter));
    return JSON.stringify({
      playable: isHardGrounderInfieldPlayable(battedBall),
      bodyCaught: bodyCatch.caught,
      closeCaught: closeCatch.caught,
      outcomeCaught: outcome.caught,
      needsThrow: outcome.needsThrow,
      outcomeLabel: outcome.label
    });
  })()`
));

assert(hardOutfieldGrounderInfielderState.playable === true, "hard grounders headed into the outfield should still be playable by nearby infielders");
assert(hardOutfieldGrounderInfielderState.bodyCaught === true || hardOutfieldGrounderInfielderState.closeCaught === true, "nearby infielders should get a catch chance on hard outfield-bound grounders");
assert(hardOutfieldGrounderInfielderState.outcomeCaught === true && hardOutfieldGrounderInfielderState.needsThrow === true, "fielded hard outfield-bound grounders should become infield throw plays");

const randomGrounderAndInfielderChaseState = JSON.parse(runInGame(
  context,
  `(() => {
    const lanes = Array.from({ length: 64 }, (_, index) => getRandomGrounderDirection64(null, (index + 0.01) / 64, 1));
    const uniqueLaneKeys = new Set(lanes.map((lane) => \`\${lane.x.toFixed(4)},\${lane.y.toFixed(4)}\`));
    activeBatterSide = "L";
    const leftEarly = getRandomGrounderDirection64({ timingPull: -0.6 }, 0.25, 0);
    const leftLate = getRandomGrounderDirection64({ timingPull: 0.6 }, 0.75, 0);
    activeBatterSide = "R";
    const rightEarly = getRandomGrounderDirection64({ timingPull: -0.6 }, 0.75, 0);
    const rightLate = getRandomGrounderDirection64({ timingPull: 0.6 }, 0.25, 0);
    const leftMost = lanes[0].x;
    const rightMost = lanes[63].x;
    const middle = lanes[31].x;
    const origin = { x: field.plateX, y: field.plateY - 10 };
    const target = { x: field.centerX + 180, y: field.plateY - 1020 };
    const hardGrounder = {
      origin,
      target,
      direction: normalize({ x: target.x - origin.x, y: target.y - origin.y }),
      flightDistance: 1120,
      landingDistance: 1120,
      ballTime: 0.78,
      isGrounder: true,
      isLiner: false,
      power: 1.18,
      trajectory: "grounder",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false,
      isDeep: true
    };
    const second = { role: "2B", x: field.centerX + 86, y: field.plateY - 430, speed: 7, fielding: 8, arm: 6 };
    const shortstop = { role: "SS", x: field.centerX - 110, y: field.plateY - 430, speed: 7, fielding: 8, arm: 6 };
    const right = { role: "R", x: field.centerX + 520, y: field.plateY - 1180, speed: 6, fielding: 6, arm: 6 };
    const center = { role: "C", x: field.centerX, y: field.plateY - 1360, speed: 6, fielding: 6, arm: 6 };
    const eligible = getEligibleDefenseFielders([second, shortstop, right, center], hardGrounder);
    const chosen = chooseDefenseFielder([second, shortstop, right, center], hardGrounder);
    const bodyCatch = getInfielderRouteBodyCatch(chosen, hardGrounder, chosen.fieldingPoint);
    const originalRandomForOutcome = Math.random;
    Math.random = () => 0.99;
    const outcome = resolveDefenseOutcome(chosen, hardGrounder, createBatterRunner(activeBatter));
    Math.random = originalRandomForOutcome;
    return JSON.stringify({
      uniqueLaneCount: uniqueLaneKeys.size,
      leftMost,
      rightMost,
      middle,
      leftEarlyX: leftEarly.x,
      leftLateX: leftLate.x,
      rightEarlyX: rightEarly.x,
      rightLateX: rightLate.x,
      eligibleRoles: eligible.map((fielder) => fielder.role),
      chosenRole: chosen.role,
      bodyCaught: bodyCatch.caught,
      outcomeCaught: outcome.caught,
      needsThrow: outcome.needsThrow
    });
  })()`
));

assert(randomGrounderAndInfielderChaseState.uniqueLaneCount === 64, "grounder directions should use sixty-four calculable lanes");
assert(randomGrounderAndInfielderChaseState.leftMost < -0.78 && randomGrounderAndInfielderChaseState.rightMost > 0.78, "grounder lanes should cover both foul-line sides broadly");
assert(Math.abs(randomGrounderAndInfielderChaseState.middle) < 0.04, "middle grounder lanes should include near-center shots");
assert(randomGrounderAndInfielderChaseState.leftEarlyX > 0 && randomGrounderAndInfielderChaseState.leftLateX < 0, "left-handed timing bias should favor early grounders right and late grounders left");
assert(randomGrounderAndInfielderChaseState.rightEarlyX < 0 && randomGrounderAndInfielderChaseState.rightLateX > 0, "right-handed timing bias should favor early grounders left and late grounders right");
assert(randomGrounderAndInfielderChaseState.eligibleRoles.includes("2B"), "hard grounders should let infielders chase the route like outfielders");
assert(randomGrounderAndInfielderChaseState.chosenRole === "2B", "nearby infielders should beat outfielders to strong grounders in front of them");
assert(randomGrounderAndInfielderChaseState.bodyCaught === true, "strong grounders in front of infielders should be body-fieldable");
assert(randomGrounderAndInfielderChaseState.outcomeCaught === true && randomGrounderAndInfielderChaseState.needsThrow === true, "fielded strong grounders should become infield throw plays");

const outfieldPositionAndRollState = JSON.parse(runInGame(
  context,
  `(() => {
    const lineup = getDefensiveLineup("away");
    const outfielders = lineup.filter((fielder) => ["L", "C", "R"].includes(fielder.role));
    const depths = Object.fromEntries(outfielders.map((fielder) => [fielder.role, getFenceDistance(fielder) / defenseField.fenceDistance]));

    const battedBall = {
      target: { x: field.centerX, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.18 },
      direction: normalize({ x: 1, y: 0 }),
      flightDistance: defenseField.fenceDistance * 0.18,
      landingDistance: defenseField.fenceDistance * 0.31,
      ballTime: 0.7,
      isGrounder: true,
      isLiner: false,
      power: 0.4,
      trajectory: "grounder",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const originalScale = defenseRollTuning.outfieldGrounderLinerScale;
    defenseRollTuning.outfieldGrounderLinerScale = 1;
    const normalRollTarget = getDefenseFieldingTarget({ ...battedBall }, { kind: "single", scoreType: "single", caught: false });
    defenseRollTuning.outfieldGrounderLinerScale = originalScale;
    const longerRollTarget = getDefenseFieldingTarget({ ...battedBall }, { kind: "single", scoreType: "single", caught: false });
    const normalRollDistance = Math.hypot(normalRollTarget.x - battedBall.target.x, normalRollTarget.y - battedBall.target.y);
    const longerRollDistance = Math.hypot(longerRollTarget.x - battedBall.target.x, longerRollTarget.y - battedBall.target.y);
    const originalRandom = Math.random;
    Math.random = () => 0.5;
    const centerFrontDrop = {
      target: { x: field.centerX, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.43 },
      direction: normalize({ x: 0.04, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.43,
      landingDistance: defenseField.fenceDistance * 0.43,
      ballTime: 0.94,
      isGrounder: false,
      isLiner: true,
      isLineDrop: true,
      isSoftDrop: true,
      power: 0.64,
      trajectory: "liner",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const frontDropTarget = getDefenseFieldingTarget(centerFrontDrop, { kind: "single", scoreType: "single", caught: false });
    const frontDropChoice = chooseDefenseFielder(
      lineup.map((fielder) => ({ ...fielder, currentX: fielder.x, currentY: fielder.y })),
      centerFrontDrop
    );
    Math.random = originalRandom;
    const frontDropRollDistance = Math.hypot(frontDropTarget.x - centerFrontDrop.target.x, frontDropTarget.y - centerFrontDrop.target.y);
    const frontDropRollDuration = getDefenseRollDuration(centerFrontDrop, centerFrontDrop.target, frontDropTarget);
    const frontDropBounceHeight = getPostLandingBounceHeight(0.35, centerFrontDrop);
    const frontDropEarlyRollProgress = getRollingEaseProgress(0.25, centerFrontDrop);
    const frontDropMidRollProgress = getRollingEaseProgress(0.5, centerFrontDrop);
    const frontDropLateRollProgress = getRollingEaseProgress(0.75, centerFrontDrop);
    const frontDropFinishRollProgress = getRollingEaseProgress(1, centerFrontDrop);
    const shallowOutfieldLiner = {
      ...centerFrontDrop,
      isLineDrop: false,
      isSoftDrop: false,
      landingDistance: defenseField.fenceDistance * 0.5,
      flightDistance: defenseField.fenceDistance * 0.5,
      power: 0.72
    };
    Math.random = () => 0.5;
    const shallowLinerTarget = getDefenseFieldingTarget(shallowOutfieldLiner, { kind: "single", scoreType: "single", caught: false });
    Math.random = originalRandom;
    const shallowLinerRollDistance = Math.hypot(shallowLinerTarget.x - shallowOutfieldLiner.target.x, shallowLinerTarget.y - shallowOutfieldLiner.target.y);
    const shallowLinerBounceHeight = getPostLandingBounceHeight(0.35, shallowOutfieldLiner);
    Math.random = () => 0.5;
    const deepDriveFront = buildBattedBall(1.58, normalize({ x: 0.08, y: -1 }), deepDriveLabel, {
      power: 1.08,
      quality: 0.66,
      feedbackScore: 0.66,
      exitVelocity: 0.98,
      carry: 0.88,
      direction: normalize({ x: 0.08, y: -1 })
    });
    deepDriveFront.wallHit = false;
    deepDriveFront.fenceOver = false;
    deepDriveFront.distance = defenseField.fenceDistance * 0.76;
    deepDriveFront.landingDistance = defenseField.fenceDistance * 0.62;
    deepDriveFront.flightDistance = deepDriveFront.landingDistance;
    deepDriveFront.target = {
      x: deepDriveFront.origin.x + deepDriveFront.direction.x * deepDriveFront.flightDistance,
      y: deepDriveFront.origin.y + deepDriveFront.direction.y * deepDriveFront.flightDistance
    };
    const deepDriveFrontTarget = getDefenseFieldingTarget(deepDriveFront, { kind: "single", scoreType: "single", caught: false });
    Math.random = originalRandom;
    const deepDriveFrontRollDistance = Math.hypot(deepDriveFrontTarget.x - deepDriveFront.target.x, deepDriveFrontTarget.y - deepDriveFront.target.y);
    const deepDriveFrontRollDuration = getDefenseRollDuration(deepDriveFront, deepDriveFront.target, deepDriveFrontTarget);
    const deepDriveFrontBounceHeight = getPostLandingBounceHeight(0.35, deepDriveFront);
    const deepDriveFrontEarlyRollProgress = getRollingEaseProgress(0.25, deepDriveFront);
    const deepDriveFrontLateRollProgress = getRollingEaseProgress(0.75, deepDriveFront);
    const centerFielder = {
      role: "C",
      name: "C",
      x: field.centerX,
      y: defenseField.bases.home.y - defenseField.fenceDistance * 0.8,
      speed: 6,
      fielding: 6,
      arm: 6,
      currentX: field.centerX,
      currentY: defenseField.bases.home.y - defenseField.fenceDistance * 0.8
    };
    defenseState = {
      ...createDefenseState(),
      active: true,
      startTime: performance.now(),
      duration: 5000,
      fielders: [centerFielder],
      chosenFielder: centerFielder,
      target: frontDropTarget,
      landingTarget: centerFrontDrop.target,
      origin: { x: field.plateX, y: field.plateY - 10 },
      battedBall: centerFrontDrop,
      outcome: { kind: "single", scoreType: "single", caught: false, fieldingTime: centerFrontDrop.ballTime + 2 },
      runner: null,
      baseRunners: [],
      throw: null,
      resolved: false
    };
    __advanceTime(centerFrontDrop.ballTime * 1000 - 40);
    updateDefensePlay(performance.now());
    const beforeLandingFielder = { x: defenseState.fielders[0].currentX, y: defenseState.fielders[0].currentY };
    __advanceTime(80);
    updateDefensePlay(performance.now());
    const afterLandingFielder = { x: defenseState.fielders[0].currentX, y: defenseState.fielders[0].currentY };
    const landingSwitchMove = Math.hypot(afterLandingFielder.x - beforeLandingFielder.x, afterLandingFielder.y - beforeLandingFielder.y);

    return JSON.stringify({
      depths,
      normalRollDistance,
      longerRollDistance,
      frontDropRollDistance,
      frontDropChoiceRole: frontDropChoice.role,
      frontDropRollDuration,
      frontDropBounceHeight,
      frontDropEarlyRollProgress,
      frontDropMidRollProgress,
      frontDropLateRollProgress,
      frontDropFinishRollProgress,
      shallowFrontLanding: isOutfieldFrontLandingBall(shallowOutfieldLiner),
      shallowLinerRollDistance,
      shallowLinerBounceHeight,
      deepDriveFrontLanding: isDeepDriveFrontLandingBall(deepDriveFront),
      deepDriveFrontHeight: deepDriveFront.maxHeight,
      deepDriveFrontBallTime: deepDriveFront.ballTime,
      deepDriveFrontExitSpeed: deepDriveFront.exitSpeedKmh,
      deepDriveFrontRollDistance,
      deepDriveFrontRollDuration,
      deepDriveFrontBounceHeight,
      deepDriveFrontEarlyRollProgress,
      deepDriveFrontLateRollProgress,
      landingSwitchMove,
      outfieldGrounderLinerScale: defenseRollTuning.outfieldGrounderLinerScale
    });
  })()`
));

assert(outfieldPositionAndRollState.depths.L > 0.9 && outfieldPositionAndRollState.depths.L < 0.94, "left fielder should start near the fence");
assert(outfieldPositionAndRollState.depths.C > 0.9 && outfieldPositionAndRollState.depths.C < 0.94, "center fielder should start near the fence");
assert(outfieldPositionAndRollState.depths.R > 0.9 && outfieldPositionAndRollState.depths.R < 0.94, "right fielder should start near the fence");
assert(outfieldPositionAndRollState.outfieldGrounderLinerScale === 1.95, "outfield grounders and liners should use the increased roll scale");
assert(["L", "C", "R"].includes(outfieldPositionAndRollState.frontDropChoiceRole), "center-front outfield drops should make an outfielder charge forward");
assert(outfieldPositionAndRollState.frontDropRollDistance >= 160 && outfieldPositionAndRollState.frontDropRollDistance <= 460, "front-of-outfield line drops should roll naturally after landing instead of racing deep");
assert(outfieldPositionAndRollState.frontDropRollDuration >= 1.35 && outfieldPositionAndRollState.frontDropRollDuration <= 4.8, "front-of-outfield line drops should settle into a short natural roll after landing");
assert(outfieldPositionAndRollState.frontDropEarlyRollProgress < 0.34, "front-of-outfield line drops should not shoot forward immediately after landing");
assert(outfieldPositionAndRollState.frontDropEarlyRollProgress < outfieldPositionAndRollState.frontDropMidRollProgress && outfieldPositionAndRollState.frontDropMidRollProgress < outfieldPositionAndRollState.frontDropLateRollProgress, "front-of-outfield drops should keep rolling forward after the first bounce");
assert(outfieldPositionAndRollState.frontDropLateRollProgress - outfieldPositionAndRollState.frontDropMidRollProgress < outfieldPositionAndRollState.frontDropMidRollProgress - outfieldPositionAndRollState.frontDropEarlyRollProgress, "front-of-outfield drops should visibly decelerate as they roll");
assert(outfieldPositionAndRollState.frontDropLateRollProgress < 0.9, "front-of-outfield line drops should keep visibly decelerating late in the roll");
assert(outfieldPositionAndRollState.frontDropFinishRollProgress === 1, "front-of-outfield drops should still finish at the rolling target");
assert(outfieldPositionAndRollState.frontDropBounceHeight < 5, "front-of-outfield line drops should stay low after the first bounce");
assert(outfieldPositionAndRollState.shallowFrontLanding === true, "shallow outfield liners should use the natural front-of-outfield roll");
assert(outfieldPositionAndRollState.shallowLinerRollDistance <= 460, "shallow outfield liners should not race deep after landing");
assert(outfieldPositionAndRollState.shallowLinerBounceHeight < 5, "shallow outfield liners should roll low after landing");
assert(outfieldPositionAndRollState.deepDriveFrontLanding === true, "front-landing deep drives should use the hard front-roll treatment");
assert(outfieldPositionAndRollState.deepDriveFrontHeight <= 135, "front-landing deep drives should use a lower, more forceful liner arc");
assert(outfieldPositionAndRollState.deepDriveFrontBallTime < 0.82, "front-landing deep drives should reach the turf quickly");
assert(outfieldPositionAndRollState.deepDriveFrontExitSpeed >= 140, "front-landing deep drives should display a forceful real-scale exit velocity");
assert(outfieldPositionAndRollState.deepDriveFrontRollDistance >= 520, "front-landing deep drives should keep rolling after the first bounce");
assert(outfieldPositionAndRollState.deepDriveFrontRollDuration >= 1.25 && outfieldPositionAndRollState.deepDriveFrontRollDuration <= 4.2, "front-landing deep drives should roll naturally after landing");
assert(outfieldPositionAndRollState.deepDriveFrontBounceHeight < 8, "front-landing deep drives should have only a low post-landing hop");
assert(outfieldPositionAndRollState.deepDriveFrontEarlyRollProgress > outfieldPositionAndRollState.frontDropEarlyRollProgress, "front-landing deep drives should roll forward more decisively than soft drops");
assert(outfieldPositionAndRollState.deepDriveFrontLateRollProgress < 0.94, "front-landing deep drives should still decelerate naturally late in the roll");
assert(outfieldPositionAndRollState.landingSwitchMove < 18, "fielders should not jump when a bloop hit changes from landing chase to rolling chase");

const ordinaryGrounderRollState = JSON.parse(runInGame(
  context,
  `(() => {
    const battedBall = {
      target: { x: field.centerX + 30, y: field.plateY - 280 },
      direction: normalize({ x: 0.2, y: -1 }),
      flightDistance: 300,
      landingDistance: 300,
      ballTime: 0.5,
      isGrounder: true,
      isLiner: false,
      power: 0.34,
      trajectory: "grounder",
      fenceOver: false,
      wallHit: false,
      groundRuleDouble: false
    };
    const originalScale = defenseRollTuning.grounderScale;
    defenseRollTuning.grounderScale = 1;
    const normalTarget = getDefenseFieldingTarget({ ...battedBall }, { kind: "single", scoreType: "single", caught: false });
    defenseRollTuning.grounderScale = originalScale;
    const longerTarget = getDefenseFieldingTarget({ ...battedBall }, { kind: "single", scoreType: "single", caught: false });
    return JSON.stringify({
      normalDistance: Math.hypot(normalTarget.x - battedBall.target.x, normalTarget.y - battedBall.target.y),
      longerDistance: Math.hypot(longerTarget.x - battedBall.target.x, longerTarget.y - battedBall.target.y)
    });
  })()`
));

assert(ordinaryGrounderRollState.longerDistance > ordinaryGrounderRollState.normalDistance * 1.45, "ordinary grounders should roll 1.5x farther");

const keyboardBattingControlState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    activeBatterSide = "R";
    const box = getBatterMoveBox();
    const originalExtraReach = batterMoveTuning.plateSideExtraReach;
    batterMoveTuning.plateSideExtraReach = 0;
    const rightBoxWithoutExtra = getBatterMoveBox();
    activeBatterSide = "L";
    const leftBoxWithoutExtra = getBatterMoveBox();
    batterMoveTuning.plateSideExtraReach = originalExtraReach;
    activeBatterSide = "R";
    const rightBoxWithExtra = getBatterMoveBox();
    activeBatterSide = "L";
    const leftBoxWithExtra = getBatterMoveBox();
    activeBatterSide = "R";
    batter.x = (box.left + box.right) / 2;
    batter.y = (box.top + box.bottom) / 2;
    const before = { x: batter.x, y: batter.y };
    keysDown.add("ArrowRight");
    keysDown.add("ArrowUp");
    updateBatter(1000 / 60);
    const after = { x: batter.x, y: batter.y };
    keysDown.delete("ArrowRight");
    keysDown.delete("ArrowUp");
    return JSON.stringify({
      movedRight: after.x > before.x,
      movedUp: after.y < before.y,
      insideBox: after.x >= box.left && after.x <= box.right && after.y >= box.top && after.y <= box.bottom,
      rightHomeReachAdded: rightBoxWithExtra.right - rightBoxWithoutExtra.right,
      rightAwaySideUnchanged: rightBoxWithExtra.left === rightBoxWithoutExtra.left,
      leftHomeReachAdded: leftBoxWithoutExtra.left - leftBoxWithExtra.left,
      leftAwaySideUnchanged: leftBoxWithExtra.right === leftBoxWithoutExtra.right
    });
  })()`
));

assert(keyboardBattingControlState.movedRight === true, "right arrow should move the batter inside the box");
assert(keyboardBattingControlState.movedUp === true, "up arrow should move the batter toward the pitcher inside the box");
assert(keyboardBattingControlState.insideBox === true, "keyboard batter movement should stay inside the batter box");
assert(keyboardBattingControlState.rightHomeReachAdded === 18, "right-handed batters should be able to move a fist closer to home plate");
assert(keyboardBattingControlState.rightAwaySideUnchanged === true, "right-handed batter movement should only expand on the home-plate side");
assert(keyboardBattingControlState.leftHomeReachAdded === 18, "left-handed batters should be able to move a fist closer to home plate");
assert(keyboardBattingControlState.leftAwaySideUnchanged === true, "left-handed batter movement should only expand on the home-plate side");

const computerPitchAndSwingState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    const originalRandom = Math.random;
    activeBatterSide = "R";
    Math.random = () => 0;
    const shapedPlan = chooseComputerPitchPlan();
    Math.random = () => 0.99;
    const plainPlan = chooseComputerPitchPlan();
    activeBatterSide = "L";
    Math.random = () => 0;
    const leftBatterSafePlan = chooseComputerPitchPlan();
    const standardWeights = getComputerPitchTypeWeights({ fastKmh: 150, rightBreak: 5, leftBreak: 5, slowChange: 5, fastChange: 5 });
    const fastPitcherWeights = getComputerPitchTypeWeights({ fastKmh: 170, rightBreak: 5, leftBreak: 5, slowChange: 5, fastChange: 5 });
    const slowPitcherWeights = getComputerPitchTypeWeights({ fastKmh: 125, rightBreak: 9, leftBreak: 9, slowChange: 9, fastChange: 8 });
    count = { strikes: 0, balls: 0, outs: 0 };
    bases = createEmptyBases();
    const specialChance0Strike = getComputerSpecialPitchChance();
    count.strikes = 1;
    const specialChance1Strike = getComputerSpecialPitchChance();
    count.strikes = 2;
    const specialChance2Strike = getComputerSpecialPitchChance();
    bases.first = makeBaseRunner(findById(batters, "ichiro"));
    const specialChanceRunner = getComputerSpecialPitchChance();
    bases.second = makeBaseRunner(findById(batters, "shuto"));
    const specialChanceScoring = getComputerSpecialPitchChance();
    count = { strikes: 2, balls: 0, outs: 0 };
    bases = createEmptyBases();
    Math.random = () => 0.02;
    const specialPlan = chooseComputerPitchPlan();
    const strikeIntents = new Set(["awayEdge", "edge", "showCenter", "backdoor", "frontdoor", "acceleratingStrike", "ballToStrikeBurst", "brakeThenBurst", "plainEdge"]);
    const ballIntents = new Set(["awayBall", "awayEscape", "strikeToBall", "speedEscape"]);
    Math.random = () => 0.59;
    const fastStrikeCourse = getComputerPitchCornerCourse("fast");
    Math.random = () => 0.9;
    const fastBallCourse = getComputerPitchCornerCourse("fast");
    Math.random = () => 0.1;
    const slowBallCourse = getComputerPitchCornerCourse("slow");
    Math.random = () => 0.42;
    const slowAcceleratingStrikeCourse = getComputerPitchCornerCourse("slow");
    Math.random = () => 0.42;
    const normalAcceleratingStrikePlan = buildComputerPitchShape({ type: "normal", course: slowAcceleratingStrikeCourse, bendSegments: [], speedChangeSegments: [] }, activePitcher);
    Math.random = () => 0.42;
    const slowAcceleratingStrikePlan = buildComputerPitchShape({ type: "slow", course: slowAcceleratingStrikeCourse, bendSegments: [], speedChangeSegments: [] }, activePitcher);
    Math.random = () => 0.53;
    const slowBackdoorStrikeCourse = getComputerPitchCornerCourse("slow");
    Math.random = () => 0.93;
    const slowEdgeStrikeCourse = getComputerPitchCornerCourse("slow");
    Math.random = () => 0.94;
    const slowCenterStrikeCourse = getComputerPitchCornerCourse("slow");
    count = { strikes: 0, balls: 2, outs: 0 };
    Math.random = () => 0.24;
    const hitterCountBackdoorCourse = getComputerPitchCornerCourse("slow");
    Math.random = () => 0.52;
    const hitterCountFrontdoorCourse = getComputerPitchCornerCourse("slow");
    Math.random = () => 0.78;
    const hitterCountEdgeCourse = getComputerPitchCornerCourse("fast");
    count = { strikes: 1, balls: 3, outs: 0 };
    Math.random = () => 0.99;
    const threeBallFastCourse = getComputerPitchCornerCourse("fast");
    Math.random = () => 0.99;
    const threeBallSlowCourse = getComputerPitchCornerCourse("slow");
    const plainFastCourse = { direction: 1, offset: 40, intent: "plainEdge" };
    const plainFastPlan = buildComputerPitchShape({ type: "fast", course: plainFastCourse, bendSegments: [], speedChangeSegments: [] }, activePitcher);
    const plainNormalPlan = buildComputerPitchShape({ type: "normal", course: plainFastCourse, bendSegments: [], speedChangeSegments: [] }, activePitcher);
    Math.random = originalRandom;

    gameMode = "single";
    battingTeam = "away";
    activePitcher = { ...activePitcher, rightBreak: 9, fastChange: 9 };
    computerPitchPlan = {
      bendDirection: 1,
      bendStart: 0.1,
      bendEnd: 0.9,
      bendChance: 1,
      speedChangeDirection: 1,
      speedChangeStart: 0.1,
      speedChangeEnd: 0.9,
      speedChangeChance: 1
    };
    isPitching = true;
    ball.inPitch = true;
    ball.active = true;
    ball.crossedPlate = false;
    ball.staminaMistake = false;
    ball.pitchAbilityMultiplier = 1;
    ball.pitchStartTime = performance.now() - 420;
    ball.plateTime = performance.now() + 420;
    ball.curvePower = 0;
    ball.speedScale = 1;
    ball.vx = 0;
    ball.vy = 8;
    computerBendPitch();
    const shapedCurvePower = ball.curvePower;
    const shapedSpeedScale = ball.speedScale;

    activeBatter = { ...activeBatter, meet: 6 };
    isPitching = true;
    ball.inPitch = true;
    ball.active = true;
    ball.radius = 9;
    ball.pitchStartTime = performance.now() - 520;
    ball.plateTime = performance.now() + 180;
    ball.curvePower = 0;
    ball.x = field.plateX;
    ball.y = field.plateY - 82;
    ball.vx = 0;
    ball.vy = 8;
    const strikeConfidence = getComputerSwingStrikeConfidence();
    ball.x = field.plateX + 178;
    ball.y = field.plateY - 82;
    ball.vx = 0;
    ball.vy = 8;
    const ballConfidence = getComputerSwingStrikeConfidence();

    gameMode = "single";
    battingTeam = "home";
    swingState.didSwingThisPitch = false;
    swingState.isSwinging = false;
    ball.pitchStartTime = performance.now() - 610;
    ball.plateTime = performance.now() + 80;
    Math.random = () => 0.5;
    computerSwingBat();
    Math.random = originalRandom;

    return JSON.stringify({
      shapedBend: shapedPlan.bendDirection,
      shapedSpeedChange: shapedPlan.speedChangeDirection,
      shapedBendChance: shapedPlan.bendChance,
      shapedBendPower: shapedPlan.bendPower,
      shapedSpeedPower: shapedPlan.speedChangePower,
      shapedType: shapedPlan.type,
      plainType: plainPlan.type,
      leftBatterSafeBend: leftBatterSafePlan.bendDirection,
      standardWeights,
      fastPitcherWeights,
      slowPitcherWeights,
      shapedBendSegmentCount: shapedPlan.bendSegments?.length ?? 0,
      shapedSpeedSegmentCount: shapedPlan.speedChangeSegments?.length ?? 0,
      specialChance0Strike,
      specialChance1Strike,
      specialChance2Strike,
      specialChanceRunner,
      specialChanceScoring,
      specialPlanType: specialPlan.type,
      specialPlanSpread: specialPlan.targetSpread,
      fastStrikeIntent: fastStrikeCourse.intent,
      fastBallIntent: fastBallCourse.intent,
      slowBallIntent: slowBallCourse.intent,
      slowAcceleratingStrikeIntent: slowAcceleratingStrikeCourse.intent,
      normalAcceleratingStrikeSpeedDirection: normalAcceleratingStrikePlan.speedChangeDirection,
      slowAcceleratingStrikeSpeedDirection: slowAcceleratingStrikePlan.speedChangeDirection,
      normalAcceleratingStrikeHasBurst: normalAcceleratingStrikePlan.speedChangeSegments?.some((segment) => segment.direction === 1) ?? false,
      slowAcceleratingStrikeHasBurst: slowAcceleratingStrikePlan.speedChangeSegments?.some((segment) => segment.direction === 1) ?? false,
      slowBackdoorStrikeIntent: slowBackdoorStrikeCourse.intent,
      slowEdgeStrikeIntent: slowEdgeStrikeCourse.intent,
      slowCenterStrikeIntent: slowCenterStrikeCourse.intent,
      hitterCountBackdoorIntent: hitterCountBackdoorCourse.intent,
      hitterCountFrontdoorIntent: hitterCountFrontdoorCourse.intent,
      hitterCountEdgeIntent: hitterCountEdgeCourse.intent,
      threeBallFastIntent: threeBallFastCourse.intent,
      threeBallSlowIntent: threeBallSlowCourse.intent,
      plainFastBendSegments: plainFastPlan.bendSegments?.length ?? 0,
      plainFastSpeedSegments: plainFastPlan.speedChangeSegments?.length ?? 0,
      plainNormalBendSegments: plainNormalPlan.bendSegments?.length ?? 0,
      plainNormalSpeedSegments: plainNormalPlan.speedChangeSegments?.length ?? 0,
      fastStrikeCourseIsStrike: strikeIntents.has(fastStrikeCourse.intent),
      fastBallCourseIsBall: ballIntents.has(fastBallCourse.intent),
      slowBallCourseIsBall: ballIntents.has(slowBallCourse.intent),
      slowAcceleratingCourseIsStrike: strikeIntents.has(slowAcceleratingStrikeCourse.intent),
      slowBackdoorCourseIsStrike: strikeIntents.has(slowBackdoorStrikeCourse.intent),
      slowEdgeCourseIsStrike: strikeIntents.has(slowEdgeStrikeCourse.intent),
      slowCenterCourseIsStrike: strikeIntents.has(slowCenterStrikeCourse.intent),
      hitterCountBackdoorIsStrike: strikeIntents.has(hitterCountBackdoorCourse.intent),
      hitterCountFrontdoorIsStrike: strikeIntents.has(hitterCountFrontdoorCourse.intent),
      hitterCountEdgeIsStrike: strikeIntents.has(hitterCountEdgeCourse.intent),
      threeBallFastIsStrike: strikeIntents.has(threeBallFastCourse.intent),
      threeBallSlowIsStrike: strikeIntents.has(threeBallSlowCourse.intent),
      shapedTargetNearBatter: Math.abs((shapedPlan.targetX ?? field.plateX) - batter.x) < 44,
      shapedCurvePower,
      shapedSpeedScale,
      strikeConfidence,
      ballConfidence,
      swungAtObviousBall: swingState.didSwingThisPitch
    });
  })()`
));

assert(computerPitchAndSwingState.shapedBend !== 0, "computer pitchers should sometimes use left/right bend");
assert(computerPitchAndSwingState.shapedSpeedChange !== 0, "computer pitchers should sometimes use speed changes");
assert(computerPitchAndSwingState.shapedBend === 1, "computer pitchers should usually bend away from right-handed batters");
assert(computerPitchAndSwingState.leftBatterSafeBend === -1, "computer pitchers should usually bend away from left-handed batters");
assert(computerPitchAndSwingState.shapedBendChance >= 0.9 && computerPitchAndSwingState.shapedBendPower > 1, "computer pitchers should throw more visibly bending pitches");
assert(computerPitchAndSwingState.shapedSpeedPower > 1, "computer pitchers should use larger speed changes");
assert(Math.abs(computerPitchAndSwingState.standardWeights.fast - 0.418) < 0.0001, "standard computer pitchers should use fastballs slightly more often after reducing breaking pitches");
assert(Math.abs(computerPitchAndSwingState.standardWeights.normal - 0.312) < 0.0001, "standard computer pitchers should use straight pitches slightly more often after reducing breaking pitches");
assert(Math.abs(computerPitchAndSwingState.standardWeights.slow - 0.27) < 0.0001, "standard computer pitchers should reduce slow/breaking pitches only slightly");
assert(computerPitchAndSwingState.fastPitcherWeights.fast <= computerPitchAndSwingState.standardWeights.fast, "fast computer pitchers should still mix offspeed instead of becoming fastball-heavy");
assert(computerPitchAndSwingState.fastPitcherWeights.slow >= computerPitchAndSwingState.standardWeights.slow, "fast computer pitchers should keep using timing-changing slower pitches");
assert(computerPitchAndSwingState.slowPitcherWeights.slow > computerPitchAndSwingState.standardWeights.slow, "slow/breaking computer pitchers should throw more shaped slow pitches");
assert(computerPitchAndSwingState.shapedBendSegmentCount >= 1, "computer pitchers should build pitch bend segments");
assert(computerPitchAndSwingState.shapedSpeedSegmentCount >= 1, "computer pitchers should build speed-change segments");
assert(Math.abs(computerPitchAndSwingState.specialChance0Strike - 0.03) < 0.0001, "computer special pitch chance should be 3% at 0 strikes with empty bases");
assert(Math.abs(computerPitchAndSwingState.specialChance1Strike - 0.05) < 0.0001, "computer special pitch chance should be reduced to 5% at 1 strike with empty bases");
assert(Math.abs(computerPitchAndSwingState.specialChance2Strike - 0.15) < 0.0001, "computer special pitch chance should be reduced to 15% at 2 strikes with empty bases");
assert(Math.abs(computerPitchAndSwingState.specialChanceRunner - 0.18) < 0.0001, "computer special pitch chance should rise only slightly with a runner aboard");
assert(Math.abs(computerPitchAndSwingState.specialChanceScoring - 0.22) < 0.0001, "computer special pitch chance should rise only modestly in scoring position");
assert(computerPitchAndSwingState.specialPlanType === "special" && computerPitchAndSwingState.specialPlanSpread === 12, "computer pitchers should select special pitches when the special roll wins");
assert(computerPitchAndSwingState.fastStrikeCourseIsStrike === true && computerPitchAndSwingState.fastBallCourseIsBall === false, "fast/special computer courses should reduce obvious waste balls");
assert(computerPitchAndSwingState.slowBallCourseIsBall === false && computerPitchAndSwingState.slowBackdoorCourseIsStrike === true && computerPitchAndSwingState.slowEdgeCourseIsStrike === true && computerPitchAndSwingState.slowCenterCourseIsStrike === true, "slow computer courses should reduce obvious balls and favor strike-threatening pitches with two strikes");
assert(computerPitchAndSwingState.slowAcceleratingCourseIsStrike === true && computerPitchAndSwingState.normalAcceleratingStrikeHasBurst === true && computerPitchAndSwingState.slowAcceleratingStrikeHasBurst === true, "normal and slow computer pitches should include ball-to-strike accelerating or brake-then-burst pitches");
assert(computerPitchAndSwingState.hitterCountBackdoorIsStrike === true && computerPitchAndSwingState.hitterCountFrontdoorIsStrike === true && computerPitchAndSwingState.hitterCountEdgeIsStrike === true, "computer pitchers should avoid waste balls and target edges/frontdoor/backdoor in 2-0 counts");
assert(computerPitchAndSwingState.threeBallFastIsStrike === true && computerPitchAndSwingState.threeBallSlowIsStrike === true, "computer pitchers should not intentionally waste pitches in any three-ball count");
assert(computerPitchAndSwingState.plainFastBendSegments === 0 && computerPitchAndSwingState.plainFastSpeedSegments === 0 && computerPitchAndSwingState.plainNormalBendSegments === 0 && computerPitchAndSwingState.plainNormalSpeedSegments === 0, "plain edge fastballs and straight pitches should stay unshaped");
assert(computerPitchAndSwingState.shapedTargetNearBatter === false, "computer pitchers should rarely choose targets near the batter body");
assert(computerPitchAndSwingState.shapedCurvePower > 0.25, "computer pitch shaping should visibly bend the live pitch");
assert(computerPitchAndSwingState.shapedSpeedScale > 1.008, "computer pitch shaping should visibly change live pitch speed");
assert(computerPitchAndSwingState.strikeConfidence > computerPitchAndSwingState.ballConfidence + 0.45, "computer batting should strongly prefer pitches projected near the plate");
assert(computerPitchAndSwingState.swungAtObviousBall === false, "computer batting should usually take obvious balls");

const homerCandidateGrounderState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    activeBatter = { ...findById(batters, "judge"), power: 10 };
    const profile = {
      launchAngle: 34,
      exitVelocity: 1.24,
      carry: 1.2,
      power: 1.48,
      quality: 0.78,
      feedbackScore: 0.78,
      direction: normalize({ x: 0.08, y: -1 }),
      timingPull: 0.04
    };
    const converted = shouldConvertHomerCandidateToStrongInfieldGrounder(profile, 0.15);
    const kept = shouldConvertHomerCandidateToStrongInfieldGrounder(profile, 0.17);
    const result = makeStrongInfieldGrounderResultFromProfile(profile);
    const battedBall = buildBattedBall(result.power, result.direction, result.label, result.battedProfile);
    return JSON.stringify({
      converted,
      kept,
      label: result.label,
      kind: result.kind,
      isGrounder: battedBall.isGrounder,
      fenceOver: battedBall.fenceOver,
      power: result.power
    });
  })()`
));

assert(homerCandidateGrounderState.converted === true, "16% of homer candidates should be eligible to become strong infield grounders");
assert(homerCandidateGrounderState.kept === false, "homer candidate grounder conversion should stop after the 16% window");
assert(homerCandidateGrounderState.label === "内野ゴロ" && homerCandidateGrounderState.kind === "out", "converted homer candidates should become infield grounders");
assert(homerCandidateGrounderState.isGrounder === true && homerCandidateGrounderState.fenceOver === false, "converted strong infield grounders should stay in the infield play path");
assert(homerCandidateGrounderState.power >= 0.94, "converted strong infield grounders should be hard-hit balls");

const autoRunnerAndOutfieldHitReductionState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    defenseControlMode.away = "auto";
    defenseControlMode.home = "auto";
    const runnerInfo = makeBaseRunner(findById(batters, "ichiro"));
    const battedBall = {
      target: { x: field.centerX, y: defenseField.bases.home.y - defenseField.fenceDistance * 0.7 },
      direction: normalize({ x: 0.08, y: -1 }),
      flightDistance: defenseField.fenceDistance * 0.7,
      landingDistance: defenseField.fenceDistance * 0.7,
      ballTime: 0.82,
      isGrounder: false,
      isLiner: true,
      isDeep: true,
      power: 0.88,
      trajectory: "liner"
    };
    const doubleOutcome = { kind: "double", scoreType: "double", caught: false, fieldingTime: 1 };
    const firstRunnerOnDouble = createDefenseBaseRunner("first", runnerInfo, doubleOutcome, battedBall);
    const forceSafeSecond = getDefenseBaseRunnerAdvanceType({ kind: "force", caught: true, needsThrow: true }, { safe: true, targetBase: "second" });
    const outfieldHit = { label: hitLabels.cleanHit, kind: "hit", scoreType: "single", power: 0.92, direction: normalize({ x: 0.04, y: -1 }) };
    const converted = applyOutfieldHitGrounderReduction(outfieldHit, { launchAngle: 18, exitVelocity: 0.7, power: 0.74, quality: 0.66 }, 0.19);
    const kept = applyOutfieldHitGrounderReduction(outfieldHit, { launchAngle: 18, exitVelocity: 0.7, power: 0.74, quality: 0.66 }, 0.2);
    return JSON.stringify({
      firstRunnerTarget: firstRunnerOnDouble.targetBase,
      firstRunnerScored: firstRunnerOnDouble.scored,
      forceSafeSecond,
      convertedLabel: converted.label,
      convertedKind: converted.kind,
      keptLabel: kept.label,
      keptKind: kept.kind
    });
  })()`
));

assert(autoRunnerAndOutfieldHitReductionState.firstRunnerTarget === "second", "auto baserunners should only advance one base on non-homer hits");
assert(autoRunnerAndOutfieldHitReductionState.firstRunnerScored === false, "auto baserunners should not take extra bases on their own");
assert(autoRunnerAndOutfieldHitReductionState.forceSafeSecond === "single", "auto baserunners should not treat safe second-base throws as extra-base advances");
assert(autoRunnerAndOutfieldHitReductionState.convertedLabel === "内野ゴロ" && autoRunnerAndOutfieldHitReductionState.convertedKind === "out", "20% of outfield hits should convert into infield grounders");
assert(autoRunnerAndOutfieldHitReductionState.keptLabel === "クリーンヒット" && autoRunnerAndOutfieldHitReductionState.keptKind === "hit", "outfield hits outside the 20% window should stay hits");

const intentionalWalkCommandState = JSON.parse(runInGame(
  context,
  `(() => {
    gameMode = "versus";
    startGame();
    const batterBefore = activeBatter;
    const runner = selected[battingTeam].batters[1].player;
    bases = createEmptyBases();
    bases.first = makeBaseRunner(runner);
    bases.second = makeBaseRunner(runner);
    bases.third = makeBaseRunner(runner);
    scores = { away: 0, home: 0 };
    count = { strikes: 2, balls: 3, outs: 1 };
    keysDown.clear();
    intentionalWalkCommandLocked = false;

    keysDown.add("0");
    startPitch("special", { targetX: field.plateX, targetY: field.plateY, targetSpread: 0 });
    keysDown.add("3");
    const handled = tryDeclareIntentionalWalk();
    const beforeDuplicate = {
      first: bases.first?.id,
      second: bases.second?.id,
      third: bases.third?.id,
      orderIndex: battingOrderIndex[battingTeam],
      score: scores[battingTeam]
    };
    const duplicateHandled = tryDeclareIntentionalWalk();
    keysDown.delete("0");
    releaseIntentionalWalkCommandLockout();

    return JSON.stringify({
      handled,
      duplicateHandled,
      first: bases.first?.id,
      second: bases.second?.id,
      third: bases.third?.id,
      batterBefore: batterBefore.id,
      batterAfter: activeBatter.id,
      balls: count.balls,
      strikes: count.strikes,
      outs: count.outs,
      score: scores[battingTeam],
      message,
      isPitching,
      pendingPitch: Boolean(pendingPitch),
      lockedAfterRelease: intentionalWalkCommandLocked,
      duplicateChangedBases: beforeDuplicate.first !== bases.first?.id || beforeDuplicate.second !== bases.second?.id || beforeDuplicate.third !== bases.third?.id,
      duplicateChangedOrder: beforeDuplicate.orderIndex !== battingOrderIndex[battingTeam],
      duplicateChangedScore: beforeDuplicate.score !== scores[battingTeam]
    });
  })()`
));

assert(intentionalWalkCommandState.handled === true, "holding pitcher buttons 0 and 3 should trigger an intentional walk");
assert(intentionalWalkCommandState.first === intentionalWalkCommandState.batterBefore, "intentional walk should place the batter on first base");
assert(intentionalWalkCommandState.second && intentionalWalkCommandState.third, "intentional walk should force existing runners up one base");
assert(intentionalWalkCommandState.score === 1, "bases-loaded intentional walk should force in one run");
assert(intentionalWalkCommandState.balls === 0 && intentionalWalkCommandState.strikes === 0, "intentional walk should reset the count");
assert(intentionalWalkCommandState.outs === 1, "intentional walk should not add an out");
assert(intentionalWalkCommandState.message.includes("申告敬遠"), "intentional walk should show a clear message");
assert(intentionalWalkCommandState.isPitching === false && intentionalWalkCommandState.pendingPitch === false, "intentional walk should cancel the special-pitch windup");
assert(intentionalWalkCommandState.duplicateHandled === true, "held intentional-walk buttons should be consumed while locked");
assert(intentionalWalkCommandState.duplicateChangedBases === false, "held intentional-walk buttons should not walk multiple batters");
assert(intentionalWalkCommandState.duplicateChangedOrder === false, "held intentional-walk buttons should not advance the lineup multiple times");
assert(intentionalWalkCommandState.duplicateChangedScore === false, "held intentional-walk buttons should not score multiple times");
assert(intentionalWalkCommandState.lockedAfterRelease === false, "intentional-walk lockout should release after a command key is lifted");

const stalePitchKeyState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    gameMode = "versus";
    activePitcher = { ...activePitcher, control: 10 };
    keysDown.add("4");
    startPitch("normal", { targetX: field.plateX, targetY: field.plateY, targetSpread: 0 });
    __advanceTime(pitchWindupDuration + 1);
    releasePendingPitch();
    const lockedBend = getHeldBendDirection();
    const lockedKeys = Array.from(pitchControlLockoutKeys);
    releasePitchControlLockout("4");
    const freshBend = getHeldBendDirection();
    finishPitch("ボール", "ball", 0, 0);
    return JSON.stringify({
      lockedBend,
      freshBend,
      lockedKeys,
      stillHeld: isKeyHeld("4"),
      lockoutSize: pitchControlLockoutKeys.size
    });
  })()`
));

assert(stalePitchKeyState.lockedBend === 0, "held pitch keys from before release should not bend the pitch");
assert(stalePitchKeyState.lockedKeys.includes("4"), "held bend key should be locked out at release");
assert(stalePitchKeyState.freshBend === -1, "freshly released lockout should allow intentional bend input");
assert(stalePitchKeyState.stillHeld === false, "pitch control keys should be cleared after pitch resolution");
assert(stalePitchKeyState.lockoutSize === 0, "pitch control lockout should reset after pitch resolution");

const controlMissPitchKeyState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    gameMode = "versus";
    activePitcher = { ...activePitcher, control: 1 };
    keysDown.add("4");
    const originalRandom = Math.random;
    Math.random = () => 0;
    startPitch("normal", { targetX: field.plateX + 96, targetY: field.plateY - 36, targetSpread: 0 });
    Math.random = originalRandom;
    __advanceTime(pitchWindupDuration + 1);
    releasePendingPitch();
    const bendAfterMissRelease = getHeldBendDirection();
    finishPitch("ボール", "ball", 0, 0);
    return JSON.stringify({
      bendAfterMissRelease,
      stillHeld: isKeyHeld("4"),
      lockoutSize: pitchControlLockoutKeys.size
    });
  })()`
));

assert(controlMissPitchKeyState.bendAfterMissRelease === -1, "control-miss pitches should allow left/right bend after release");
assert(controlMissPitchKeyState.stillHeld === false, "control-miss pitch cleanup should clear held keys");
assert(controlMissPitchKeyState.lockoutSize === 0, "control-miss pitch cleanup should reset lockout");

const lowControlPitchState = JSON.parse(runInGame(
  context,
  `(() => {
    const low = getPitchControlProfile(1, 0, { pitchType: "normal", courseDirection: 0 });
    const average = getPitchControlProfile(5, 0, { pitchType: "normal", courseDirection: 0 });
    const high = getPitchControlProfile(10, 0, { pitchType: "normal", courseDirection: 0 });
    const edgeFast = getPitchControlProfile(1, 0, { pitchType: "fast", courseDirection: 1 });
    return JSON.stringify({
      lowTotalMiss: low.wildMissChance + low.mistakeChance,
      averageTotalMiss: average.wildMissChance + average.mistakeChance,
      highTotalMiss: high.wildMissChance + high.mistakeChance,
      lowSpread: low.spread,
      averageSpread: average.spread,
      highSpread: high.spread,
      edgeFastTotalMiss: edgeFast.wildMissChance + edgeFast.mistakeChance
    });
  })()`
));

assert(Math.abs(lowControlPitchState.lowTotalMiss - 0.55) < 0.001, "control-one pitchers should lose the target on about fifty-five percent of pitches");
assert(lowControlPitchState.averageTotalMiss > lowControlPitchState.highTotalMiss, "average control should miss badly more often than elite control");
assert(lowControlPitchState.lowTotalMiss > lowControlPitchState.averageTotalMiss, "poor control should miss badly far more often than average control");
assert(lowControlPitchState.lowSpread > lowControlPitchState.averageSpread && lowControlPitchState.averageSpread > lowControlPitchState.highSpread, "lower control should create much wider ordinary pitch scatter");
assert(lowControlPitchState.edgeFastTotalMiss > lowControlPitchState.lowTotalMiss, "poor-control edge fastballs should be even harder to command");

const finalBottomMercyState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    maxInnings = 2;
    firstBatTeam = "away";
    battingTeam = "away";
    inning = 2;
    half = "top";
    scores = { away: 1, home: 2 };
    gamePhase = "playing";
    changeSide();
    const alreadyLeadingAtBottom = { gamePhase, message, inning, half, battingTeam };

    startGame();
    maxInnings = 2;
    firstBatTeam = "away";
    battingTeam = "home";
    inning = 2;
    half = "bottom";
    scores = { away: 3, home: 2 };
    gamePhase = "playing";
    addRunsToBattingTeam(2);
    const takesLeadDuringBottom = { gamePhase, message, scores: { ...scores } };

    startGame();
    maxInnings = 2;
    firstBatTeam = "away";
    battingTeam = "home";
    inning = 1;
    half = "bottom";
    scores = { away: 3, home: 2 };
    gamePhase = "playing";
    addRunsToBattingTeam(2);
    const notFinalBottom = { gamePhase, scores: { ...scores } };

    return JSON.stringify({ alreadyLeadingAtBottom, takesLeadDuringBottom, notFinalBottom });
  })()`
));

assert(finalBottomMercyState.alreadyLeadingAtBottom.gamePhase === "gameover", "final bottom should end immediately when the second batting team already leads");
assert(finalBottomMercyState.alreadyLeadingAtBottom.message.includes("チームB勝利"), "final bottom early finish should award the win to the second batting team");
assert(finalBottomMercyState.takesLeadDuringBottom.gamePhase === "gameover", "final bottom should end as soon as the second batting team takes the lead");
assert(finalBottomMercyState.takesLeadDuringBottom.message.includes("3-4"), "final bottom early finish should keep the final score");
assert(finalBottomMercyState.notFinalBottom.gamePhase === "playing", "non-final bottom lead should not trigger the early finish");

const extraInningTiebreakState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    maxInnings = 2;
    firstBatTeam = "away";
    inning = 2;
    half = "bottom";
    battingTeam = "home";
    scores = { away: 3, home: 3 };
    count.outs = 3;
    lastOutBatterByTeam.away = findById(batters, "otani");
    lastOutBatterByTeam.home = findById(batters, "ichiro");
    gamePhase = "playing";
    changeSide();
    const extraTop = {
      gamePhase,
      inning,
      half,
      battingTeam,
      outs: count.outs,
      second: bases.second?.id
    };

    count.outs = 3;
    scores = { away: 4, home: 3 };
    changeSide();
    const extraBottom = {
      gamePhase,
      inning,
      half,
      battingTeam,
      second: bases.second?.id
    };

    count.outs = 3;
    scores = { away: 4, home: 3 };
    changeSide();
    const extraFinished = { gamePhase, message };

    return JSON.stringify({ extraTop, extraBottom, extraFinished });
  })()`
));

assert(extraInningTiebreakState.extraTop.gamePhase === "playing" && extraInningTiebreakState.extraTop.inning === 3 && extraInningTiebreakState.extraTop.half === "top", "tie after the final inning should continue into extras");
assert(extraInningTiebreakState.extraTop.outs === 0 && extraInningTiebreakState.extraTop.second === "otani", "extra innings should start with no outs and the previous last-out batter on second");
assert(extraInningTiebreakState.extraBottom.gamePhase === "playing" && extraInningTiebreakState.extraBottom.half === "bottom" && extraInningTiebreakState.extraBottom.second === "ichiro", "the bottom half of extras should also use the team's last-out batter on second");
assert(extraInningTiebreakState.extraFinished.gamePhase === "gameover" && extraInningTiebreakState.extraFinished.message.includes("チームA勝利"), "extra innings should end after a full extra inning when a team leads");

const pitcherGameRecordState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    firstBatTeam = "away";
    battingTeam = "away";
    setMatchup();
    const homeStarter = activePitcher.name;
    startPitch("normal", { targetX: field.plateX, targetY: field.plateY, targetSpread: 0 });
    resetBall();
    count.strikes = 3;
    checkCountEnd();
    const stealRunner = selected.away.batters[1].player;
    bases.first = makeBaseRunner(stealRunner);
    stealState = {
      ...createStealState(),
      active: true,
      resolved: false,
      startBase: "first",
      targetBase: "second",
      runner: makeBaseRunner(stealRunner),
      pitchResultPending: false
    };
    resolveSteal(true);
    recordPitcherStat("home", activePitcher, "hitsAllowed", 2);
    recordPitcherStat("home", activePitcher, "runsAllowed", 3);
    recordPitcherStat("home", activePitcher, "walksAllowed", 1);
    const homeSecondId = selected.home.pitchers[1].id;
    changePitcher("home", homeSecondId);
    const homeSecond = getTeamActivePitcher("home").name;
    recordPitcherOuts("home", getTeamActivePitcher("home"), 2);
    recordPitcherOuts("away", getTeamActivePitcher("away"), 3);
    endGame();
    draw();
    return JSON.stringify({
      homeStarter,
      homeSecond,
      awayLines: buildPitcherGameRecordLines("away"),
      homeLines: buildPitcherGameRecordLines("home"),
      phase: gamePhase
    });
  })()`
));

assert(pitcherGameRecordState.phase === "gameover", "pitcher records should be available after the game ends");
assert(pitcherGameRecordState.homeLines.some((line) => line.includes(`${pitcherGameRecordState.homeStarter}投手 0.2イニング`) && line.includes("投球数1") && line.includes("奪三振1") && line.includes("被安打2") && line.includes("失点3") && line.includes("四死球1")), "starter should show innings, pitch count, strikeouts, hits, runs, and walks in pitcher records");
assert(pitcherGameRecordState.homeLines.some((line) => line.includes(`${pitcherGameRecordState.homeSecond}投手 0.2イニング`)), "reliever should receive recorded outs in pitcher records");
assert(pitcherGameRecordState.awayLines.some((line) => line.includes("1.0イニング")), "team A pitcher records should show full innings");

const pitcherSaveRecordState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    gameMode = "versus";
    firstBatTeam = "away";
    battingTeam = "home";
    scores = { away: 5, home: 3 };
    bases = createEmptyBases();
    setMatchup();
    const threeRunRelieverId = selected.away.pitchers[1].id;
    changePitcher("away", threeRunRelieverId);
    const threeRunReliever = getTeamActivePitcher("away").name;
    recordPitcherOuts("away", getTeamActivePitcher("away"), 3);
    endGame();
    const threeRunLines = buildPitcherGameRecordLines("away");

    startGame();
    gameMode = "versus";
    firstBatTeam = "away";
    battingTeam = "home";
    scores = { away: 7, home: 3 };
    bases = createEmptyBases();
    bases.first = makeBaseRunner(findById(batters, "ichiro"));
    bases.second = makeBaseRunner(findById(batters, "shuto"));
    bases.third = makeBaseRunner(findById(batters, "otani"));
    setMatchup();
    const threatRelieverId = selected.away.pitchers[1].id;
    changePitcher("away", threatRelieverId);
    const threatReliever = getTeamActivePitcher("away").name;
    recordPitcherOuts("away", getTeamActivePitcher("away"), 1);
    endGame();
    const threatLines = buildPitcherGameRecordLines("away");

    startGame();
    gameMode = "versus";
    firstBatTeam = "away";
    battingTeam = "home";
    scores = { away: 7, home: 3 };
    bases = createEmptyBases();
    setMatchup();
    const noSaveRelieverId = selected.away.pitchers[1].id;
    changePitcher("away", noSaveRelieverId);
    const noSaveReliever = getTeamActivePitcher("away").name;
    recordPitcherOuts("away", getTeamActivePitcher("away"), 1);
    endGame();
    const noSaveLines = buildPitcherGameRecordLines("away");

    return JSON.stringify({
      threeRunReliever,
      threatReliever,
      noSaveReliever,
      threeRunLines,
      threatLines,
      noSaveLines
    });
  })()`
));

assert(pitcherSaveRecordState.threeRunLines.some((line) => line.includes(`${pitcherSaveRecordState.threeRunReliever}投手`) && line.includes("セーブ")), "reliever should receive a save after entering with a lead of three or fewer and pitching at least one inning");
assert(pitcherSaveRecordState.threatLines.some((line) => line.includes(`${pitcherSaveRecordState.threatReliever}投手`) && line.includes("セーブ")), "reliever should receive a save in a tying-run threat even with less than one inning pitched");
assert(!pitcherSaveRecordState.noSaveLines.some((line) => line.includes(`${pitcherSaveRecordState.noSaveReliever}投手`) && line.includes("セーブ")), "reliever should not receive a save with a four-run lead, empty bases, and less than one inning pitched");

const pitcherDecisionRecordState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    gameMode = "versus";
    scores = { away: 0, home: 0 };
    battingTeam = "away";
    setMatchup();
    const awayStarter = getTeamActivePitcher("away").name;
    const homeStarter = getTeamActivePitcher("home").name;
    recordPitcherOuts("away", getTeamActivePitcher("away"), 3);
    addRunsToBattingTeam(1);
    endGame();
    const winLossAwayLines = buildPitcherGameRecordLines("away");
    const winLossHomeLines = buildPitcherGameRecordLines("home");

    startGame();
    gameMode = "versus";
    scores = { away: 3, home: 1 };
    battingTeam = "home";
    bases = createEmptyBases();
    setMatchup();
    const leadHoldRelieverId = selected.away.pitchers[1].id;
    changePitcher("away", leadHoldRelieverId);
    const leadHoldReliever = getTeamActivePitcher("away").name;
    recordPitcherOuts("away", getTeamActivePitcher("away"), 3);
    const finalRelieverId = selected.away.pitchers[2].id;
    changePitcher("away", finalRelieverId);
    recordPitcherOuts("away", getTeamActivePitcher("away"), 3);
    endGame();
    const leadHoldLines = buildPitcherGameRecordLines("away");

    startGame();
    gameMode = "versus";
    scores = { away: 2, home: 2 };
    battingTeam = "home";
    bases = createEmptyBases();
    setMatchup();
    const tieHoldRelieverId = selected.away.pitchers[1].id;
    changePitcher("away", tieHoldRelieverId);
    const tieHoldReliever = getTeamActivePitcher("away").name;
    recordPitcherOuts("away", getTeamActivePitcher("away"), 1);
    scores = { away: 3, home: 2 };
    changePitcher("away", selected.away.pitchers[2].id);
    recordPitcherOuts("away", getTeamActivePitcher("away"), 2);
    endGame();
    const tieHoldLines = buildPitcherGameRecordLines("away");

    startGame();
    gameMode = "versus";
    scores = { away: 0, home: 0 };
    battingTeam = "away";
    bases = createEmptyBases();
    setMatchup();
    const inheritedLosingPitcher = getTeamActivePitcher("home").name;
    bases.third = makeBaseRunner(findById(batters, "ichiro"));
    changePitcher("home", selected.home.pitchers[1].id);
    const inheritedReliever = getTeamActivePitcher("home").name;
    addRunsToBattingTeam(1, [selected.home.pitchers[0].id]);
    endGame();
    const inheritedLossLines = buildPitcherGameRecordLines("home");

    startGame();
    gameMode = "versus";
    scores = { away: 3, home: 1 };
    battingTeam = "home";
    bases = createEmptyBases();
    setMatchup();
    const losingTeamHoldRelieverId = selected.away.pitchers[1].id;
    changePitcher("away", losingTeamHoldRelieverId);
    const losingTeamHoldReliever = getTeamActivePitcher("away").name;
    recordPitcherOuts("away", getTeamActivePitcher("away"), 3);
    changePitcher("away", selected.away.pitchers[2].id);
    scores = { away: 3, home: 4 };
    endGame();
    const losingTeamHoldLines = buildPitcherGameRecordLines("away");

    return JSON.stringify({
      awayStarter,
      homeStarter,
      leadHoldReliever,
      tieHoldReliever,
      inheritedLosingPitcher,
      inheritedReliever,
      losingTeamHoldReliever,
      winLossAwayLines,
      winLossHomeLines,
      leadHoldLines,
      tieHoldLines,
      inheritedLossLines,
      losingTeamHoldLines
    });
  })()`
));

assert(pitcherDecisionRecordState.winLossAwayLines.some((line) => line.includes(`${pitcherDecisionRecordState.awayStarter}投手`) && line.includes("勝利")), "winning pitcher should be the pitcher of record when the decisive run scores");
assert(pitcherDecisionRecordState.winLossHomeLines.some((line) => line.includes(`${pitcherDecisionRecordState.homeStarter}投手`) && line.includes("敗戦")), "losing pitcher should be charged with the decisive run");
assert(pitcherDecisionRecordState.leadHoldLines.some((line) => line.includes(`${pitcherDecisionRecordState.leadHoldReliever}投手`) && line.includes("ホールド")), "reliever should receive a hold after preserving a qualifying lead before leaving");
assert(!pitcherDecisionRecordState.leadHoldLines.some((line) => line.includes(`${pitcherDecisionRecordState.leadHoldReliever}投手`) && line.includes("セーブ")), "a hold pitcher should not also receive a save");
assert(pitcherDecisionRecordState.tieHoldLines.some((line) => line.includes(`${pitcherDecisionRecordState.tieHoldReliever}投手`) && line.includes("ホールド")), "reliever should receive a hold after entering tied, allowing no runs, and leaving with the team not behind");
assert(pitcherDecisionRecordState.inheritedLossLines.some((line) => line.includes(`${pitcherDecisionRecordState.inheritedLosingPitcher}投手`) && line.includes("敗戦")), "losing pitcher should be charged for an inherited runner who scores the decisive run");
assert(pitcherDecisionRecordState.inheritedLossLines.some((line) => line.includes(`${pitcherDecisionRecordState.inheritedLosingPitcher}投手`) && line.includes("失点1")), "inherited runner runs should be charged to the pitcher who put the runner on base");
assert(pitcherDecisionRecordState.inheritedLossLines.some((line) => line.includes(`${pitcherDecisionRecordState.inheritedReliever}投手`) && line.includes("失点0")), "relievers should not be charged a run for inherited runners they allow to score");
assert(pitcherDecisionRecordState.losingTeamHoldLines.some((line) => line.includes(`${pitcherDecisionRecordState.losingTeamHoldReliever}投手`) && line.includes("ホールド")), "hold should remain even if the team later loses after the pitcher leaves");

const fiveInningStarterWinState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    gameMode = "versus";
    maxInnings = 5;
    scores = { away: 0, home: 0 };
    battingTeam = "away";
    bases = createEmptyBases();
    setMatchup();
    const shortStarter = getTeamActivePitcher("away").name;
    recordPitcherOuts("away", getTeamActivePitcher("away"), 6);
    addRunsToBattingTeam(1);
    endGame();
    const shortStarterLines = buildPitcherGameRecordLines("away");

    startGame();
    gameMode = "versus";
    maxInnings = 5;
    scores = { away: 0, home: 0 };
    battingTeam = "away";
    bases = createEmptyBases();
    setMatchup();
    const qualifiedStarter = getTeamActivePitcher("away").name;
    recordPitcherOuts("away", getTeamActivePitcher("away"), 9);
    addRunsToBattingTeam(1);
    endGame();
    const qualifiedStarterLines = buildPitcherGameRecordLines("away");

    return JSON.stringify({ shortStarter, qualifiedStarter, shortStarterLines, qualifiedStarterLines });
  })()`
));

assert(!fiveInningStarterWinState.shortStarterLines.some((line) => line.includes(`${fiveInningStarterWinState.shortStarter}投手`) && line.includes("勝利")), "in a five-inning game, a starter should not receive the win before pitching three innings");
assert(fiveInningStarterWinState.qualifiedStarterLines.some((line) => line.includes(`${fiveInningStarterWinState.qualifiedStarter}投手`) && line.includes("勝利")), "in a five-inning game, a starter should receive the win after pitching at least three innings");

const nineInningRulesState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
    gameMode = "versus";
    maxInnings = 9;
    scores = { away: 0, home: 0 };
    battingTeam = "away";
    bases = createEmptyBases();
    setMatchup();
    const shortStarter = getTeamActivePitcher("away").name;
    recordPitcherOuts("away", getTeamActivePitcher("away"), 12);
    addRunsToBattingTeam(1);
    endGame();
    const shortStarterLines = buildPitcherGameRecordLines("away");

    startGame();
    gameMode = "versus";
    maxInnings = 9;
    scores = { away: 0, home: 0 };
    battingTeam = "away";
    bases = createEmptyBases();
    setMatchup();
    const qualifiedStarter = getTeamActivePitcher("away").name;
    recordPitcherOuts("away", getTeamActivePitcher("away"), 15);
    addRunsToBattingTeam(1);
    endGame();
    const qualifiedStarterLines = buildPitcherGameRecordLines("away");

    startGame();
    maxInnings = 9;
    firstBatTeam = "away";
    inning = 9;
    half = "bottom";
    battingTeam = "home";
    scores = { away: 2, home: 2 };
    count.outs = 3;
    lastOutBatterByTeam.away = findById(batters, "otani");
    gamePhase = "playing";
    changeSide();
    const extraTop = { gamePhase, inning, half, battingTeam, outs: count.outs, second: bases.second?.id };

    return JSON.stringify({ shortStarter, qualifiedStarter, shortStarterLines, qualifiedStarterLines, extraTop });
  })()`
));

assert(!nineInningRulesState.shortStarterLines.some((line) => line.includes(`${nineInningRulesState.shortStarter}投手`) && line.includes("勝利")), "in a nine-inning game, a starter should not receive the win before pitching five innings");
assert(nineInningRulesState.qualifiedStarterLines.some((line) => line.includes(`${nineInningRulesState.qualifiedStarter}投手`) && line.includes("勝利")), "in a nine-inning game, a starter should receive the win after pitching at least five innings");
assert(nineInningRulesState.extraTop.gamePhase === "playing" && nineInningRulesState.extraTop.inning === 10 && nineInningRulesState.extraTop.half === "top", "nine-inning ties should continue into a tenth-inning tiebreaker");
assert(nineInningRulesState.extraTop.outs === 0 && nineInningRulesState.extraTop.second === "otani", "nine-inning tiebreakers should start with no outs and the previous last-out batter on second");

runInGame(context, 'startGame(); activePitcher = { ...activePitcher, control: 10 }; startPitch("normal", { targetX: field.plateX, targetY: field.plateY, targetSpread: 0 });');

for (let i = 0; i < 180; i += 1) {
  context.__advanceTime(16);
  runInGame(context, "releasePendingPitch(); update(16); draw();");
}

const state = JSON.parse(runInGame(
  context,
  "JSON.stringify({ gamePhase, strikes: count.strikes, balls: count.balls, outs: count.outs, ballActive: ball.active, message })"
));

assert(state.gamePhase === "playing", "game should remain playable after one pitch");
assert(state.strikes + state.balls + state.outs > 0, "pitch should be judged");
assert(state.ballActive === false, "judged pitch should reset the active ball");
assert(!state.message.includes("ジャスト(0ms)"), "called strike should not show swing timing");

runInGame(context, 'startPitch("invalid");');
const invalidPitchState = JSON.parse(runInGame(
  context,
  "JSON.stringify({ pendingPitch: Boolean(pendingPitch), isPitching, message })"
));
assert(invalidPitchState.pendingPitch === false, "invalid pitch should not create a pending pitch");
assert(invalidPitchState.isPitching === false, "invalid pitch should not start pitching");
assert(invalidPitchState.message.includes("5/8/2/0"), "invalid pitch should explain valid pitch controls");

console.log("Smoke check passed");
