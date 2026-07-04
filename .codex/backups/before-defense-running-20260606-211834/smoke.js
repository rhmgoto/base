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
    "soundToggleButton",
    "bgmToggleButton",
    "menuSoundToggleButton",
    "menuBgmToggleButton",
    "menuPointStatus",
    "playerChooser",
    "chooserTitle",
    "chooserOptions",
    "chooserClose",
    "modeSelect",
    "firstBatSelect",
    "inningsSelect",
    "awayBatterLName",
    "awayBatterCName",
    "awayBatterRName",
    "homeBatterLName",
    "homeBatterCName",
    "homeBatterRName",
    "awayPitcherName",
    "homePitcherName",
    "awayBatterLStats",
    "awayBatterCStats",
    "awayBatterRStats",
    "homeBatterLStats",
    "homeBatterCStats",
    "homeBatterRStats",
    "awayPitcherStats",
    "homePitcherStats"
  ].forEach(makeElement);

  makeElement("modeSelect").value = "versus";
  makeElement("firstBatSelect").value = "away";
  makeElement("inningsSelect").value = "1";

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
  if (!condition) throw new Error(message);
}

function assertNoMojibake(text, label) {
  const mojibakePattern = /(?:繝|譁|荳|蝣|縺|蜈|莠|隧|謚|驕|髢|郢|闕|�)/;
  assert(!mojibakePattern.test(text), `${label} appears to contain mojibake`);
}

function assertHtmlShell() {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const malformedTagPattern = /・\/(?:button|option|p|h3|span)>|aria-label="[^"]*>\s*$/m;
  [
    'id="gameCanvas"',
    'id="startMenu"',
    'id="startButton"',
    'id="soundToggleButton"',
    'id="bgmToggleButton"',
    'id="menuSoundToggleButton"',
    'id="menuBgmToggleButton"',
    'id="modeSelect"',
    'id="firstBatSelect"',
    'id="inningsSelect"',
    'id="awayPitcherCard"',
    'id="homeBatterRCard"',
    'id="activeBatterStats"'
  ].forEach((needle) => {
    assert(html.includes(needle), `index.html is missing ${needle}`);
  });
  assert(html.includes(">試合開始</button>"), "start button label should be readable Japanese");
  assert(html.includes(">効果音 ON</button>"), "sound toggle should default to ON");
  assert(html.includes(">BGM ON</button>"), "BGM toggle should default to ON");
  assert(html.includes('aria-label="メニュー音声設定"'), "main menu should include audio controls");
  assert(html.includes('aria-label="ゲーム開始メニュー"'), "start menu aria label should be readable Japanese");
  assert(!malformedTagPattern.test(html), "index.html contains a mojibake-damaged HTML tag");
  assert((html.match(/<button\b/g) || []).length === (html.match(/<\/button>/g) || []).length, "index.html has unbalanced button tags");
  assert((html.match(/<option\b/g) || []).length === (html.match(/<\/option>/g) || []).length, "index.html has unbalanced option tags");
  assertNoMojibake(html, "index.html");
}

assertHtmlShell();
assertNoMojibake(fs.readFileSync(path.join(root, "README.md"), "utf8"), "README.md");

const context = createGameContext();
vm.runInContext(fs.readFileSync(path.join(root, "script.js"), "utf8"), context, {
  filename: "script.js"
});

assert(makeElement("awayBatterLName").textContent.includes("オオタニ"), "menu cards are not populated");

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
assert(audioToggleState.soundText === "効果音 ON", "sound toggle text should show restored ON state");
assert(audioToggleState.menuSoundText === "効果音 ON", "menu sound toggle should mirror restored ON state");
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

assert(scoringCheerState.cheerSrc.includes("スタジアムの歓声.mp3"), "scoring cheer should use the stadium crowd audio file");
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
assert(bgmUnlockState.blocked.buttonText === "BGM開始", "blocked menu BGM should show a start prompt on the BGM button");
assert(bgmUnlockState.attempts === 2, "BGM button should retry menu BGM without changing screens");
assert(bgmUnlockState.needsGesture === false, "successful unlock should clear the user gesture flag");
assert(bgmUnlockState.current === "menu", "successful unlock should keep menu BGM active");
assert(bgmUnlockState.paused === false, "successful unlock should start menu BGM playback");

const lineupState = JSON.parse(runInGame(
  context,
  "JSON.stringify({ teams: Object.keys(selected), awayRoles: selected.away.batters.map((entry) => entry.role), homeRoles: selected.home.batters.map((entry) => entry.role) })"
));

assert(lineupState.teams.length === 2, "game should have two teams");
assert(lineupState.awayRoles.join(",") === "L,C,R", "away lineup should use the three mini-baseball fielder roles");
assert(lineupState.homeRoles.join(",") === "L,C,R", "home lineup should use the three mini-baseball fielder roles");

const rosterAndPointState = JSON.parse(runInGame(
  context,
  `(() => {
    const shuto = findById(batters, "shuto");
    const trout = findById(batters, "trout");
    const freeman = findById(batters, "freeman");
    const originalCost = pitchers[0].cost;
    const baseCost = getMenuTeamCost("away");
    pitchers[0].cost = 99;
    const pitcherIgnoredCost = getMenuTeamCost("away");
    pitchers[0].cost = originalCost;
    const originalAway = { ...menuSelection.away };
    menuSelection.away = { pitcher: "shohei", L: "otani", C: "ichiro", R: "ruth" };
    updateMenuPointStatus();
    const overLimitDisabled = startButton.disabled;
    const overLimitText = menuPointStatus.textContent;
    menuSelection.away = originalAway;
    updateMenuPointStatus();
    openPlayerChooser({ dataset: { team: "away", role: "L", kind: "batter" } });
    const chooserHtml = chooserOptions.innerHTML;
    closePlayerChooser();
    openPlayerChooser({ dataset: { team: "away", role: "pitcher", kind: "pitcher" } });
    const pitcherChooserHtml = chooserOptions.innerHTML;
    closePlayerChooser();
    const costBadgeName = { textContent: "" };
    const costBadgeStats = { innerHTML: "" };
    renderBatterPanel(shuto, costBadgeName, costBadgeStats);
    const cardHtml = costBadgeStats.innerHTML;
    return JSON.stringify({
      shuto: {
        bats: shuto.bats,
        power: shuto.power,
        meet: shuto.meet,
        run: shuto.run,
        fielding: shuto.fielding,
        arm: shuto.arm,
        cost: shuto.cost
      },
      trout: {
        bats: trout.bats,
        power: trout.power,
        meet: trout.meet,
        run: trout.run,
        fielding: trout.fielding,
        arm: trout.arm,
        cost: trout.cost
      },
      freeman: {
        bats: freeman.bats,
        power: freeman.power,
        meet: freeman.meet,
        run: freeman.run,
        fielding: freeman.fielding,
        arm: freeman.arm,
        cost: freeman.cost
      },
      baseCost,
      pitcherIgnoredCost,
      pointLimit: fielderPointLimit,
      overLimitDisabled,
      overLimitText,
      chooserHtml,
      pitcherChooserHtml,
      cardHtml,
      menuText: menuPointStatus.textContent
    });
  })()`
));

assert(rosterAndPointState.shuto.bats === "L", "Shuto should be a left-handed batter");
assert(rosterAndPointState.shuto.power === 1, "Shuto power should match the roster table");
assert(rosterAndPointState.shuto.meet === 3, "Shuto meet should match the roster table");
assert(rosterAndPointState.shuto.run === 10, "Shuto run should match the roster table");
assert(rosterAndPointState.shuto.fielding === 8, "Shuto fielding should match the roster table");
assert(rosterAndPointState.shuto.arm === 6, "Shuto arm should match the roster table");
assert(rosterAndPointState.shuto.cost === 4, "Shuto cost should match the roster table");
assert(rosterAndPointState.trout.bats === "R", "Trout should be a right-handed batter");
assert(rosterAndPointState.trout.power === 7, "Trout power should match the roster table");
assert(rosterAndPointState.trout.meet === 6, "Trout meet should match the roster table");
assert(rosterAndPointState.trout.run === 6, "Trout run should match the roster table");
assert(rosterAndPointState.trout.fielding === 6, "Trout fielding should match the roster table");
assert(rosterAndPointState.trout.arm === 5, "Trout arm should match the roster table");
assert(rosterAndPointState.trout.cost === 6, "Trout cost should match the roster table");
assert(rosterAndPointState.freeman.bats === "L", "Freeman should be a left-handed batter");
assert(rosterAndPointState.freeman.power === 6, "Freeman power should match the roster table");
assert(rosterAndPointState.freeman.meet === 7, "Freeman meet should match the roster table");
assert(rosterAndPointState.freeman.run === 4, "Freeman run should match the roster table");
assert(rosterAndPointState.freeman.fielding === 6, "Freeman fielding should match the roster table");
assert(rosterAndPointState.freeman.arm === 5, "Freeman arm should match the roster table");
assert(rosterAndPointState.freeman.cost === 5, "Freeman cost should match the roster table");
assert(rosterAndPointState.baseCost === rosterAndPointState.pitcherIgnoredCost, "pitcher cost should not affect team point totals");
assert(rosterAndPointState.pointLimit === 20, "fielder point limit should be 20 per team");
assert(rosterAndPointState.overLimitDisabled === true, "teams over 20 fielder points should not be startable");
assert(rosterAndPointState.overLimitText.includes("/20"), "menu should show the 20-point fielder limit");
assert(rosterAndPointState.chooserHtml.includes("cost-badge"), "batter chooser should show cost as a separate badge");
assert(rosterAndPointState.chooserHtml.includes("chooser-card-stats"), "batter chooser should render card-style stat rows");
assert(rosterAndPointState.chooserHtml.includes("打"), "batter chooser should show batting side");
assert(rosterAndPointState.pitcherChooserHtml.includes("投"), "pitcher chooser should show throwing side");
assert(rosterAndPointState.chooserHtml.includes("獲得"), "batter chooser cost badge should be clearly labeled");
assert(rosterAndPointState.cardHtml.includes("cost-badge"), "batter cards should show cost as a separate prominent badge");
assert(!rosterAndPointState.cardHtml.includes('<span class="stat-name">獲得</span>'), "batter cards should not render cost as a normal stat row");

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
      inGoodContactZone: false,
      yellowZoneBoost: 0
    });
    const hit = { label: hitLabels.single, kind: "hit", power: profile.power, scoreType: "single", battedProfile: profile };
    const demoted = applyNonYellowHitChancePenalty(hit, profile, 0.69);
    const kept = applyNonYellowHitChancePenalty(hit, profile, 0.71);
    return JSON.stringify({
      topExtension: plateTop - topY,
      topWidth,
      effectivePower10: getEffectiveBatterPower({ power: 10 }),
      effectivePower1: getEffectiveBatterPower({ power: 1 }),
      demotedKind: demoted.kind,
      keptKind: kept.kind
    });
  })()`
));

assert(battingTighteningState.topExtension <= 16, "good-contact yellow zone should be shorter toward the pitcher");
assert(battingTighteningState.topExtension >= 8, "good-contact yellow zone should still leave a visible pitcher-side area");
assert(battingTighteningState.topWidth > 60, "good-contact yellow zone should keep its horizontal reach");
assert(Math.abs(battingTighteningState.effectivePower10 - 9) < 0.001, "effective batter power should be reduced by ten percent");
assert(Math.abs(battingTighteningState.effectivePower1 - 0.9) < 0.001, "low effective batter power should also be reduced by ten percent");
assert(battingTighteningState.demotedKind === "out", "non-yellow hits should lose the penalty roll seventy percent of the time");
assert(battingTighteningState.keptKind === "hit", "non-yellow hits should remain hits outside the penalty roll");

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
  "JSON.stringify({ fenceDistance: defenseField.fenceDistance, fenceHeight: defenseField.fenceHeight, grassRadius: defenseField.grassRadius, fielderSpeed: getFielderSpeed({ speed: 5 }), fielderSpeed1: getFielderSpeed({ speed: 1 }), fielderSpeed10: getFielderSpeed({ speed: 10 }) })"
));

assert(Math.abs(defenseTuningState.fenceDistance - 2097.6) < 0.001, "fence distance should be 15% longer than the compact field");
assert(Math.abs(defenseTuningState.fenceHeight - 138) < 0.001, "fence height should be 15% taller");
assert(Math.abs(defenseTuningState.grassRadius - 2014.8) < 0.001, "outfield grass should match the wider field scale");
assert(defenseTuningState.fielderSpeed === 180, "fielders should move 1.5x faster");
assert(Math.abs(defenseTuningState.fielderSpeed10 - defenseTuningState.fielderSpeed1 * 3) < 0.001, "fielding 10 should move three times as fast as fielding 1");

const fenceState = JSON.parse(runInGame(
  context,
  `(() => {
    const outside = { x: field.plateX, y: defenseField.bases.home.y - defenseField.fenceDistance - 260 };
    const clamped = clampPointInsideFence(outside, 36);
    const wallBall = buildBattedBall(1.2, normalize({ x: 0, y: -1 }), "フェンステスト");
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
      outcome: { kind: "double", label: "フェンス直撃", scoreType: "double", caught: false },
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

const homeRunFireworksState = JSON.parse(runInGame(
  context,
  `(() => {
    const homerBall = buildBattedBall(2.2, normalize({ x: 0.04, y: -1 }), hitLabels.toweringFly);
    homerBall.fenceOver = true;
    homerBall.ballTime = 0.9;
    homerBall.target = {
      x: field.plateX,
      y: defenseField.bases.home.y - defenseField.fenceDistance - 520
    };
    const fireworks = createHomeRunFireworks(homerBall);
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
    return JSON.stringify({
      hasFireworks: Boolean(fireworks),
      burstCount: fireworks?.bursts.length,
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
      fenceTopY: defenseField.bases.home.y - defenseField.fenceDistance
    });
  })()`
));

assert(homeRunFireworksState.hasFireworks === true, "home runs should create fireworks");
assert(homeRunFireworksState.burstCount >= 10, "home run fireworks should launch many visible bursts");
assert(homeRunFireworksState.sparkCounts.every((count) => count >= 22), "each fireworks burst should have many sparks");
assert(Math.abs(homeRunFireworksState.startDelay - 0.9) < 0.001, "fireworks should start when the ball reaches the stands");
assert(homeRunFireworksState.duration === 3, "home run fireworks should last about three seconds");
assert(homeRunFireworksState.defenseDuration >= 3900, "home run defense view should stay long enough to show three-second fireworks");
assert(homeRunFireworksState.fireworkSrc.includes("打ち上け\u3099花火.mp3"), "home run fireworks should use the launch-fireworks audio file");
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

const runnerSpeedState = JSON.parse(runInGame(
  context,
  `(() => {
    const slowRunner = createBatterRunner({ id: "slow", name: "SLOW", run: 1 });
    const normalRunner = createBatterRunner({ id: "normal", name: "NORMAL", run: 5 });
    const fastRunner = createBatterRunner({ id: "fast", name: "FAST", run: 10 });
    return JSON.stringify({
      slow: slowRunner.speed,
      normal: normalRunner.speed,
      fast: fastRunner.speed,
      baseRunnerSpeed: getDefenseBaseRunnerSpeed({ run: 5 }),
      expectedNormal: (runnerSpeedBaseRun + 5) * runnerSpeedUnit
    });
  })()`
));

assert(Math.abs(runnerSpeedState.normal - runnerSpeedState.expectedNormal) < 0.001, "runner speed should use the shared run-speed formula");
assert(Math.abs(runnerSpeedState.baseRunnerSpeed - runnerSpeedState.normal) < 0.001, "base runners and batter-runners should use the same speed");
assert(Math.abs(runnerSpeedState.fast - runnerSpeedState.slow * 3) < 0.001, "run 10 should be three times as fast as run 1");

const pitchSpeedChangeState = JSON.parse(runInGame(
  context,
  "JSON.stringify({ effect: pitchSpeedChangeEffect, amount: maxPitchSpeedChangeAmount })"
));

assert(Math.abs(pitchSpeedChangeState.effect - 1.05) < 0.000001, "pitch speed-change effect should be 1.5x the previous 0.7 value");
assert(Math.abs(pitchSpeedChangeState.amount - ((0.0018 + 10 * 0.00072) * 9 * 1.05)) < 0.000001, "pitch speed-change amount should use the boosted effect");

const pitchControlState = JSON.parse(runInGame(
  context,
  `(() => {
    const low = getPitchControlProfile(1);
    const high = getPitchControlProfile(10);
    const intended = { x: field.plateX + 96, y: field.plateY - 36 };
    const originalRandom = Math.random;
    Math.random = () => 0;
    const lowMistake = getPitchControlMiss(low, intended.x, intended.y);
    Math.random = () => 0;
    const highMistake = getPitchControlMiss(high, intended.x, intended.y);
    Math.random = originalRandom;
    return JSON.stringify({
      low,
      high,
      lowMistakeDistanceFromCenter: Math.hypot(lowMistake.x - field.plateX, lowMistake.y - field.plateY),
      highMistakeDistanceFromCenter: Math.hypot(highMistake.x - field.plateX, highMistake.y - field.plateY),
      intendedDistanceFromCenter: Math.hypot(intended.x - field.plateX, intended.y - field.plateY)
    });
  })()`
));

assert(pitchControlState.low.spread > pitchControlState.high.spread * 4, "low-control pitchers should have much larger horizontal command spread");
assert(pitchControlState.low.verticalSpread > pitchControlState.high.verticalSpread * 3, "low-control pitchers should have much larger vertical command spread");
assert(pitchControlState.low.mistakeChance > 0.15, "low-control pitchers should have a meaningful chance to leak pitches toward the middle");
assert(pitchControlState.high.mistakeChance === 0, "high-control pitchers should not have forced middle mistakes");
assert(pitchControlState.lowMistakeDistanceFromCenter < pitchControlState.intendedDistanceFromCenter * 0.3, "low-control mistakes should drift strongly toward the middle");
assert(pitchControlState.highMistakeDistanceFromCenter === pitchControlState.intendedDistanceFromCenter, "high-control pitches should keep the intended target when no miss is applied");

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
      homeX: defenseField.bases.home.x,
      homeY: defenseField.bases.home.y
    });
  })()`
));

assert(baseRunnerAnimationState.count === 1, "defense should animate existing base runners");
assert(baseRunnerAnimationState.startBase === "second", "second-base runner animation should preserve the starting base");
assert(baseRunnerAnimationState.targetBase === "home", "a fast second-base runner should be shown scoring on a deep single");
assert(baseRunnerAnimationState.scored === true, "scoring base runners should be marked as scored");
assert(baseRunnerAnimationState.arrived === true, "base runner animation should arrive at its destination");
assert(Math.abs(baseRunnerAnimationState.x - baseRunnerAnimationState.homeX) < 0.001, "scoring runner should finish at home plate");
assert(Math.abs(baseRunnerAnimationState.y - baseRunnerAnimationState.homeY) < 0.001, "scoring runner should finish at home plate");

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
    bases = createEmptyBases();
    bases.third = thirdRunner;
    const deepAnimations = createDefenseBaseRunnerAnimations(outcome, flyBall, null, deepFielder, deepTarget);
    const shallowAnimations = createDefenseBaseRunnerAnimations(outcome, { ...flyBall, target: shallowTarget, landingDistance: defenseField.fenceDistance * 0.28, isDeep: false }, null, shallowFielder, shallowTarget);
    defenseState = { ...createDefenseState(), baseRunners: deepAnimations };
    const tagUpRuns = applyDefenseTagUps();
    return JSON.stringify({
      toweringFlag: towering.isToweringFly,
      toweringHeight: towering.maxHeight,
      toweringBallTime: towering.ballTime,
      toweringVisualAmount: getHighFlyVisualAmount(towering, towering.maxHeight * 0.9),
      toweringVisualHeight: getDefenseBallVisualHeightOffset(towering.maxHeight * 0.9, towering),
      grounderVisualHeight: getDefenseBallVisualHeightOffset(120, { trajectory: "grounder", maxHeight: 12 }),
      deepTagUp: deepAnimations[0],
      shallowTagUp: shallowAnimations[0],
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
assert(toweringFlyAndTagUpState.tagUpRuns === 1, "successful tag ups should add a run");
assert(toweringFlyAndTagUpState.thirdAfterTag === null, "successful tag ups should clear third base");

const throwProfileState = JSON.parse(runInGame(
  context,
  `(() => {
    const weakLong = getThrowProfile({ arm: 3 }, 1500);
    const strongLong = getThrowProfile({ arm: 10 }, 1500);
    const weakShort = getThrowProfile({ arm: 1 }, 420);
    const strongShort = getThrowProfile({ arm: 10 }, 420);
    const normalShort = getThrowProfile({ arm: 5 }, 420);
    const normalLong = getThrowProfile({ arm: 5 }, 1500);
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
      normalLongArc: normalLong.arcHeight
    });
  })()`
));

assert(throwProfileState.normalLongTime > throwProfileState.normalShortTime, "long throws should be slower than short throws");
assert(throwProfileState.normalLongArc > throwProfileState.normalShortArc, "long throws should have a higher arc");
assert(throwProfileState.strongLongTime < throwProfileState.weakLongTime, "strong-arm fielders should throw long balls faster");
assert(throwProfileState.strongLongArc < throwProfileState.weakLongArc, "strong-arm fielders should throw long balls on a lower arc");
assert(Math.abs(throwProfileState.normalShortSpeed - 660) < 0.001, "arm 5 should keep the current base throw speed");
assert(Math.abs(throwProfileState.strongShortSpeed - throwProfileState.weakShortSpeed * 3) < 0.001, "arm 10 should throw three times as fast as arm 1");

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
      landingDistance: 940,
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

    const builtLine = buildBattedBall(0.9, normalize({ x: 0.86, y: -0.82 }), hitLabels.lineLiner);
    const builtDrop = buildBattedBall(0.62, normalize({ x: -0.7, y: -0.9 }), hitLabels.lineDrop);
    const builtFrontDrop = buildBattedBall(0.58, normalize({ x: 0.1, y: -1 }), hitLabels.frontDrop);
    const builtLineEdge = buildBattedBall(0.82, normalize({ x: 0.98, y: -0.78 }), hitLabels.lineEdge);
    const builtChase = buildBattedBall(1.04, normalize({ x: 0.36, y: -1 }), hitLabels.chaseFly);
    const builtFenceEdge = buildBattedBall(1.28, normalize({ x: 0.08, y: -1 }), hitLabels.fenceEdgeFly);
    const builtRoutineFly = buildBattedBall(0.68, normalize({ x: 0.16, y: -1 }), hitLabels.routineFly);
    const originalRandom = Math.random;
    Math.random = () => 0.99;
    const builtFenceLiner = buildBattedBall(1.26, normalize({ x: 0.05, y: -1 }), hitLabels.fenceLiner);
    Math.random = () => 0.47;
    const fenceEdgeWall = buildBattedBall(1.28, normalize({ x: 0.04, y: -1 }), hitLabels.fenceEdgeFly);
    Math.random = () => 0.3;
    const deepDriveWall = buildBattedBall(1.86, normalize({ x: 0.04, y: -1 }), deepDriveLabel);
    Math.random = () => 0.99;
    const fenceEdgeHomer = buildBattedBall(1.28, normalize({ x: 0.04, y: -1 }), hitLabels.fenceEdgeFly);
    Math.random = () => 0.82;
    const barelyHomer = buildBattedBall(1.34, normalize({ x: 0, y: -1 }), hitLabels.fenceEdgeFly);
    Math.random = () => 0.99;
    const deepDriveHomer = buildBattedBall(1.95, normalize({ x: 0.04, y: -1 }), deepDriveLabel);
    Math.random = () => 0.99;
    const perfectDeepDriveHomer = buildBattedBall(2.5, normalize({ x: 0.04, y: -1 }), deepDriveLabel);
    Math.random = originalRandom;
    const lineFast = resolveDefenseOutcome(fastFielder, lineLiner, runner);
    const lineWeak = resolveDefenseOutcome(weakFielder, lineLiner, runner);
    const dropFast = resolveDefenseOutcome(fastFielder, lineDrop, runner);
    const dropWeak = resolveDefenseOutcome(weakFielder, lineDrop, runner);
    const chaseFast = resolveDefenseOutcome(fastChaser, chaseFly, runner);
    const chaseWeak = resolveDefenseOutcome(weakChaser, chaseFly, runner);

    return JSON.stringify({
      builtLineFlag: builtLine.isLineLiner,
      builtDropFlag: builtDrop.isLineDrop,
      builtFrontDropFlag: builtFrontDrop.isFrontDrop,
      builtFrontDropSoft: builtFrontDrop.isSoftDrop,
      builtFrontDropHeight: builtFrontDrop.maxHeight,
      builtFrontDropLandingDistance: builtFrontDrop.landingDistance,
      builtLineEdgeFlag: builtLineEdge.isLineEdge,
      builtLineEdgeDirectionX: Math.abs(builtLineEdge.direction.x),
      builtChaseFlag: builtChase.isChaseFly,
      builtFenceLinerFlag: builtFenceLiner.isFenceLiner,
      builtFenceLinerTrajectory: builtFenceLiner.trajectory,
      builtFenceLinerWallHit: builtFenceLiner.wallHit,
      builtFenceLinerOver: builtFenceLiner.fenceOver,
      builtFenceLinerHeight: builtFenceLiner.maxHeight,
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
      deepDriveHomerOver: deepDriveHomer.fenceOver,
      deepDriveHomerWallHit: deepDriveHomer.wallHit,
      deepDriveHomerFlightOverFence: deepDriveHomer.flightDistance - defenseField.fenceDistance,
      perfectDeepDriveHomerOver: perfectDeepDriveHomer.fenceOver,
      perfectDeepDriveHomerFlightOverFence: perfectDeepDriveHomer.flightDistance - defenseField.fenceDistance,
      builtRoutineFlyFlag: builtRoutineFly.isRoutineFly,
      builtRoutineFlyHeight: builtRoutineFly.maxHeight,
      builtRoutineFlyVisualAmount: getHighFlyVisualAmount(builtRoutineFly, builtRoutineFly.maxHeight * 0.85),
      builtRoutineFlyVisualHeight: getDefenseBallVisualHeightOffset(builtRoutineFly.maxHeight * 0.85, builtRoutineFly),
      lineFast,
      lineWeak,
      dropFast,
      dropWeak,
      chaseFast,
      chaseWeak
    });
  })()`
));

assert(variedBattedBallState.builtLineFlag === true, "line-liner labels should create line-liner batted balls");
assert(variedBattedBallState.builtDropFlag === true, "line-drop labels should create line-drop batted balls");
assert(variedBattedBallState.builtFrontDropFlag === true, "front-drop labels should create front-drop batted balls");
assert(variedBattedBallState.builtFrontDropSoft === true, "front drops should behave like soft drops");
assert(variedBattedBallState.builtFrontDropHeight <= 72, "front drops should fall with a low soft arc");
assert(variedBattedBallState.builtFrontDropLandingDistance < 1100, "front drops should land in front of the fielders");
assert(variedBattedBallState.builtLineEdgeFlag === true, "line-edge labels should create line-edge batted balls");
assert(variedBattedBallState.builtLineEdgeDirectionX > 0.65, "line-edge balls should stay close to the foul line");
assert(variedBattedBallState.builtChaseFlag === true, "chase-fly labels should create chase-fly batted balls");
assert(variedBattedBallState.builtFenceLinerFlag === true, "fence-liner labels should create low fence-liner batted balls");
assert(variedBattedBallState.builtFenceLinerTrajectory === "liner", "fence liners should use a liner trajectory");
assert(variedBattedBallState.builtFenceLinerWallHit === true, "low fence liners should be able to hit the wall");
assert(variedBattedBallState.builtFenceLinerOver === false, "low fence liners should stay in play instead of becoming high fly homers");
assert(variedBattedBallState.builtFenceLinerHeight < 150, "fence liners should stay visibly lower than large fly balls");
assert(variedBattedBallState.builtFenceEdgeFlag === true, "fence-edge labels should create fence-edge batted balls");
assert(variedBattedBallState.builtFenceEdgeTrajectory === "fly", "fence-edge balls should use a fly trajectory");
assert(variedBattedBallState.builtFenceEdgeDistanceFromFence <= 220, "fence-edge balls should land near the fence");
assert(variedBattedBallState.builtFenceEdgeHeight >= 495, "fence-edge balls should have the boosted large fly-ball arc");
assert(variedBattedBallState.fenceEdgeWallHit === true, "barely short fence-edge flies should hit the wall instead of becoming automatic homers");
assert(variedBattedBallState.fenceEdgeWallOver === false, "barely short fence-edge flies should stay in play");
assert(variedBattedBallState.fenceEdgeWallFlightOverFence <= 1, "wall-scraper misses should stop at the fence");
assert(variedBattedBallState.fenceEdgeHomerOver === true, "strong fence-edge flies should be able to become just-enough homers");
assert(variedBattedBallState.fenceEdgeHomerWallHit === false, "just-enough homers should not also be wall hits");
assert(variedBattedBallState.fenceEdgeHomerFlightOverFence < 200, "fence-edge homers should only clear the wall by a small amount");
assert(variedBattedBallState.barelyHomerOver === true, "some fence-edge home runs should barely clear the wall");
assert(variedBattedBallState.barelyHomerFlightOverFence > 0 && variedBattedBallState.barelyHomerFlightOverFence < 80, "barely-cleared home runs should stay close to the fence");
assert(variedBattedBallState.deepDriveWallHit === true, "deep drives should be able to reach the wall");
assert(variedBattedBallState.deepDriveWallOver === false, "wall-bound deep drives should stay in play");
assert(variedBattedBallState.deepDriveHomerOver === true, "well-struck deep drives should be able to become home runs");
assert(variedBattedBallState.deepDriveHomerWallHit === false, "deep-drive home runs should not also be wall hits");
assert(variedBattedBallState.perfectDeepDriveHomerOver === true, "perfect deep drives should still become home runs");
assert(variedBattedBallState.perfectDeepDriveHomerFlightOverFence > variedBattedBallState.deepDriveHomerFlightOverFence + 120, "perfect deep drives should keep a clearly larger home-run ceiling");
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
    Math.random = () => 0.46;
    const veryForgivingCenterDriveResult = decideHitResultFromBattedProfile({
      timeDiff: 255,
      quality: 0.38,
      timingScore: 0.38,
      barrelScore: 0.56,
      sweetSpotScore: 0.44,
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
    Math.random = originalRandom;
    const yellowZoneBoost = getYellowZoneContactBoost(false, false, 0.82);
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
      inGoodContactZone: false,
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
      inGoodContactZone: false,
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
      inGoodContactZone: false,
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
      inGoodContactZone: false,
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
      inGoodContactZone: false,
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
      inGoodContactZone: false,
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
      inGoodContactZone: false,
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
      inGoodContactZone: false,
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
      inGoodContactZone: false,
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
    Math.random = originalRandom;
    return JSON.stringify({
      goodExitVelocity: good.exitVelocity,
      badExitVelocity: bad.exitVelocity,
      goodCarry: good.carry,
      badCarry: bad.carry,
      goodSpin: good.spin,
      badSpin: bad.spin,
      goodLaunchAngle: good.launchAngle,
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
      yellowPopupEscapeKind: yellowPopupEscape.kind,
      yellowPopupEscapePopup: Boolean(yellowPopupEscape.popupFly),
      yellowCenterKind: yellowCenterResult.kind,
      yellowCenterRoutineFly: Boolean(yellowCenterResult.routineFly),
      yellowCenterPopup: Boolean(yellowCenterResult.popupFly),
      yellowHighOutsideKind: yellowHighOutsideResult.kind,
      yellowHighOutsideRoutineFly: Boolean(yellowHighOutsideResult.routineFly),
      yellowHighOutsidePopup: Boolean(yellowHighOutsideResult.popupFly),
      yellowHighOutsideDrag: yellowHighOutsideProfile.outsideZoneDrag,
      yellowHighOutsideFenceScore: yellowHighOutsideProfile.fenceEdgeFlyScore
    });
  })()`
));

assert(battedProfileState.goodExitVelocity > battedProfileState.badExitVelocity, "good contact should produce higher exit velocity");
assert(battedProfileState.goodCarry > battedProfileState.badCarry, "good contact should carry farther");
assert(battedProfileState.goodSpin < battedProfileState.badSpin, "mishits should add more spin and drag");
assert(battedProfileState.goodLaunchAngle >= 34, "good contact should be able to lift outfield fly balls");
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
assert(battedProfileState.centerDriveFenceEdge || battedProfileState.centerDriveDeepDrive, "middle-zone mistake contact should be able to lift toward the fence");
assert(battedProfileState.centerDriveRoutineFly === false, "middle-zone mistake contact should not fall back to a routine fly first");
assert(battedProfileState.centerDriveWallHit === true, "middle-zone mistake contact should be able to hit the fence");
assert(battedProfileState.centerDriveHomerOver === true, "middle-zone mistake contact should be able to clear the fence");
assert(battedProfileState.offTimingCenterDriveKind === "hit", "slightly off-timing middle-zone contact should still create a threatening drive");
assert(battedProfileState.offTimingCenterDriveFenceEdge || battedProfileState.offTimingCenterDriveDeepDrive, "slightly off-timing middle-zone contact should keep a fence-drive route");
assert(battedProfileState.offTimingCenterDriveRoutineFly === false, "slightly off-timing middle-zone contact should not become routine first");
assert(battedProfileState.forgivingCenterDriveKind === "hit", "forgiving middle-zone contact should still be a hit");
assert(battedProfileState.forgivingCenterDriveRoutineFly === false, "forgiving middle-zone contact should not become a routine fly");
assert(battedProfileState.veryForgivingCenterDriveKind === "hit", "very forgiving middle-zone contact should still be a hit");
assert(battedProfileState.veryForgivingCenterDriveGrounder === false, "very forgiving middle-zone contact should not stay as a grounder");
assert(["hit", "out", "foul"].includes(battedProfileState.looseCenterDriveKind), "loose middle-zone contact should resolve as a playable result under stronger stuff pressure");
assert(battedProfileState.looseCenterDriveGrounder === false, "loose middle-zone contact should not stay as a grounder");
assert(battedProfileState.hardLowLiftExitVelocity >= 0.9, "hard contact should keep strong exit velocity");
assert(battedProfileState.hardLowLiftLaunchAngle >= 24, "hard contact should lift even when the sweet spot is imperfect");
assert(battedProfileState.gapLinerHasDirection === true, "gap-liner results should preserve the profile hit direction");
assert(battedProfileState.liftedGenericFenceEdge || battedProfileState.liftedGenericDeepDrive, "lifted strong contact should not lose its launch angle when converted to a play result");
assert(battedProfileState.liftedGenericGrounder === false, "lifted strong contact should not remain a grounder-style result");
assert(battedProfileState.outsideToweringFlyScore < 0.12, "outside-zone chased pitches should rarely become towering extra-base flies");
assert(battedProfileState.outsideZoneDrag >= 0.16, "outside-zone chased pitches should receive long-ball drag");
assert(["out", "hit"].includes(battedProfileState.outsideDecisionKind), "outside-zone hit decision should resolve without falling through or throwing");
assert(typeof battedProfileState.outsideDecisionLabel === "string", "outside-zone hit decision should return a visible result label");
assert(battedProfileState.yellowZoneBoost >= 0.37, "yellow-zone edge contact should receive the stronger good-contact chance boost");
assert(battedProfileState.yellowCenterBoost >= 0.55, "yellow-zone center contact should receive the full strong boost");
assert(battedProfileState.yellowHighBoost >= 0.55, "yellow-zone contact above the plate should still receive the full boost");
assert(battedProfileState.yellowBoostedPower > battedProfileState.yellowNoBoostPower, "yellow-zone contact boost should create better contact");
assert(battedProfileState.yellowBoostedCarry > battedProfileState.yellowNoBoostCarry, "yellow-zone contact boost should help the ball carry");
assert(battedProfileState.yellowBoostedLaunchAngle >= 24, "yellow-zone contact boost should lift strong contact toward fence drives");
assert(battedProfileState.yellowResultKind === "hit", "yellow-zone boosted contact should turn catchable fly outcomes into hittable liners");
assert(battedProfileState.yellowResultRoutineFly === false, "yellow-zone boosted contact should not be routed to a routine fly");
assert(battedProfileState.yellowFenceKind === "hit", "strong yellow-zone contact should be able to threaten the fence");
assert(battedProfileState.yellowFenceEdge || battedProfileState.yellowFenceDeepDrive, "strong yellow-zone contact should create fence-threatening hits");
assert(battedProfileState.yellowLineLinerKind === "hit", "strong yellow-zone contact should create driven liner hits");
assert(battedProfileState.yellowLineLiner || battedProfileState.yellowLineLinerFenceEdge || battedProfileState.yellowLineLinerDeepDrive, "strong yellow-zone contact should keep a driven hit route");
assert(battedProfileState.yellowDeepDriveKind === "hit", "excellent yellow-zone contact should create deep drives");
assert(battedProfileState.yellowDeepDrive === true, "excellent yellow-zone contact should have a fence-threatening deep-drive route");
assert(battedProfileState.yellowDeepDriveWallHit === true, "excellent yellow-zone deep drives should be able to hit the fence");
assert(battedProfileState.yellowDeepDriveHomerOver === true, "excellent yellow-zone deep drives should be able to clear the fence");
assert(battedProfileState.yellowDropKind === "hit", "yellow-zone contact should create drop hits");
assert(battedProfileState.yellowDropRoutineFly === false && battedProfileState.yellowDropPopup === false, "yellow-zone contact should not collapse into easy fly outs");
assert(["hit", "out", "foul"].includes(battedProfileState.yellowFallbackKind), "yellow-zone fallback should always return a concrete play result");
assert(typeof battedProfileState.yellowFallbackLabel === "string", "yellow-zone fallback should return a visible label");
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
    Math.random = originalRandom;
    return JSON.stringify(values);
  })()`
));

assert(powerSeparationState[1].fenceOver === false && powerSeparationState[1].wallHit === false, "power-1 hitters should stay in scrappy-hit range even on strong contact");
assert(powerSeparationState[5].wallHit === true || powerSeparationState[5].distance > powerSeparationState[1].distance * 1.5, "power-5 hitters should clearly outdistance power-1 hitters");
assert(powerSeparationState[10].fenceOver === true, "power-10 hitters should keep the home-run ceiling");
assert(powerSeparationState[10].distance > powerSeparationState[5].distance, "power-10 hitters should outdistance power-5 hitters on top contact");

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
    const rightFrontDropEarly = makeFrontDropResultFromProfile({ timingPull: -0.7, power: 0.58 }).direction;
    const rightFrontDropLate = makeFrontDropResultFromProfile({ timingPull: 0.7, power: 0.58 }).direction;

    activeBatterSide = "L";
    const leftEarly = buildBattedBallProfile({ ...contact, timeDiff: -180 }).direction;
    const leftLate = buildBattedBallProfile({ ...contact, timeDiff: 180 }).direction;
    const leftNeutral = buildBattedBallProfile({ ...contact, timeDiff: 0 }).direction;
    const leftLineEarly = getLineBallDirection({ timingPull: -0.7 }, 0.82);
    const leftLineLate = getLineBallDirection({ timingPull: 0.7 }, 0.82);

    Math.random = originalRandom;
    return JSON.stringify({
      rightEarlyX: rightEarly.x,
      rightLateX: rightLate.x,
      rightNeutralX: rightNeutral.x,
      rightFrontDropEarlyX: rightFrontDropEarly.x,
      rightFrontDropLateX: rightFrontDropLate.x,
      leftEarlyX: leftEarly.x,
      leftLateX: leftLate.x,
      leftNeutralX: leftNeutral.x,
      leftLineEarlyX: leftLineEarly.x,
      leftLineLateX: leftLineLate.x
    });
  })()`
));

assert(hitDirectionState.rightEarlyX < -0.35, "right-handed early contact should pull to left field");
assert(hitDirectionState.rightLateX > 0.35, "right-handed late contact should go opposite field");
assert(Math.abs(hitDirectionState.rightNeutralX) < 0.12, "right-handed just contact should stay near center with neutral random drift");
assert(hitDirectionState.rightFrontDropEarlyX < 0, "right-handed front drops should respect pull timing");
assert(hitDirectionState.rightFrontDropLateX > 0, "right-handed front drops should respect opposite-field timing");
assert(hitDirectionState.leftEarlyX > 0.35, "left-handed early contact should pull to right field");
assert(hitDirectionState.leftLateX < -0.35, "left-handed late contact should go opposite field");
assert(Math.abs(hitDirectionState.leftNeutralX) < 0.12, "left-handed just contact should stay near center with neutral random drift");
assert(hitDirectionState.leftLineEarlyX > 0.55, "left-handed line balls should pull on early contact");
assert(hitDirectionState.leftLineLateX < -0.55, "left-handed line balls should go opposite on late contact");

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
assert(rareBattedBallFrequencyState.linerDropFrontDropScore >= 0.24 || rareBattedBallFrequencyState.linerDropLineDropScore >= 0.24, "outfield-front drops should be common enough to enter the result lottery");
assert(rareBattedBallFrequencyState.fenceEdgeLaunchAngle >= 35, "fence-edge fly candidates should include big outfield fly angles");
assert(rareBattedBallFrequencyState.fenceEdgeCarry >= 0.76, "fence-edge fly candidates should include reachable carry values");
assert(rareBattedBallFrequencyState.fenceEdgeScore >= 0.42, "fence-edge flies should be common enough to enter the result lottery");

const runnerDecisionState = JSON.parse(runInGame(
  context,
  `(() => {
    activeBatter = findById(batters, "ichiro");
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
    activeBatter = findById(batters, "schwarber");
    const slowRunner = createBatterRunner(activeBatter);
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
    const slowWallTarget = getBatterRunnerTargetBase({ kind: "double", scoreType: "double", caught: false, fieldingTime: 2.0 }, wallBall, wallFielder, wallFielder, slowRunner);
    setBatterRunnerDestination(runner, longTarget);
    const throwPlay = createThrowPlayForFieldedHit(fielder, longBall, { kind: "single", scoreType: "single", caught: false, fieldingTime: 8.0 }, fielder, runner);
    const firstThrowState = createThrowState(fielder, fielder, throwPlay, runner);
    runner.x = defenseField.bases.first.x;
    runner.y = defenseField.bases.first.y;
    runner.currentBase = "first";
    runner.targetBase = "first";
    runner.arrived = true;
    setBatterRunnerManualDestination(runner, "second", 2.4);
    const manualThrowPlay = createThrowPlayForFieldedHit(fielder, longBall, { kind: "single", scoreType: "single", caught: false, fieldingTime: 8.0 }, fielder, runner);
    const manualThrowState = createThrowState(fielder, fielder, manualThrowPlay, runner);
    setBatterRunnerManualDestination(runner, "first", 2.8);
    const returnTargetBase = runner.targetBase;
    runner.x = defenseField.bases.first.x;
    runner.y = defenseField.bases.first.y;
    runner.currentBase = "first";
    runner.targetBase = "first";
    runner.arrived = true;
    setBatterRunnerManualDestination(runner, "third", 3.0);
    const firstToThirdStopsAtSecond = runner.route.some((point) => point.x === defenseField.bases.second.x && point.y === defenseField.bases.second.y);
    runner.x = defenseField.bases.second.x;
    runner.y = defenseField.bases.second.y;
    runner.currentBase = "second";
    runner.targetBase = "second";
    runner.arrived = true;
    setBatterRunnerManualDestination(runner, "third", 3.2);
    const thirdTargetBase = runner.targetBase;
    runner.x = defenseField.bases.third.x;
    runner.y = defenseField.bases.third.y;
    runner.currentBase = "third";
    runner.targetBase = "third";
    runner.arrived = true;
    setBatterRunnerManualDestination(runner, "home", 3.6);
    const homeTargetBase = runner.targetBase;
    return JSON.stringify({
      longTarget,
      normalTargetBase,
      riskyTargetBase,
      slowWallTarget,
      firstThrowTargetBase: firstThrowState.targetBase,
      manualTargetBase: manualThrowState.targetBase,
      returnTargetBase,
      firstToThirdStopsAtSecond,
      thirdTargetBase,
      homeTargetBase,
      manualThrowTargetBase: manualThrowState.targetBase,
      throwToSecondX: manualThrowState.to.x === defenseField.bases.second.x,
      throwPlayNeedsThrow: throwPlay.needsThrow
    });
  })()`
));

assert(runnerDecisionState.normalTargetBase === "first", "ordinary hits should stop the batter-runner at first");
assert(runnerDecisionState.longTarget === "first", "long hits should stop the batter-runner at first until instructed");
assert(runnerDecisionState.riskyTargetBase === "first", "batter-runners should avoid reckless second-base attempts when the ball is fielded quickly");
assert(runnerDecisionState.slowWallTarget === "first", "slow batter-runners should stop at first on wall hits when second base is too risky");
assert(runnerDecisionState.throwPlayNeedsThrow === true, "fielded hits should become immediate throw plays");
assert(runnerDecisionState.firstThrowTargetBase === "first", "uninstructed batter-runners should draw the throw to first");
assert(runnerDecisionState.manualTargetBase === "second", "up input should send the batter-runner from first to second");
assert(runnerDecisionState.returnTargetBase === "first", "right input should send the batter-runner back to first");
assert(runnerDecisionState.firstToThirdStopsAtSecond === true, "third-base commands from first should keep the runner touching second");
assert(runnerDecisionState.thirdTargetBase === "third", "left input should send the batter-runner to third");
assert(runnerDecisionState.homeTargetBase === "home", "down input should send the batter-runner home from third");
assert(runnerDecisionState.manualThrowTargetBase === "second", "throws should follow the instructed batter-runner to second");
assert(runnerDecisionState.throwToSecondX === true, "second-base attempts should be thrown to second");

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
assert(deepThrowTargetState.lateTarget === "first", "deep balls should still stop the batter-runner at first without an advance command");
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
    const slowRunner = findById(batters, "schwarber");
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

    resetRunnerTest();
    bases.second = makeBaseRunner(fastRunner);
    const fastSecondRuns = advanceRunners("single", batter, deepSingle, { kind: "single", scoreType: "single", caught: false });
    const fastSecondBase = bases.first?.id;

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
      slowSecondRuns,
      slowSecondOnThird,
      fastFirstRuns,
      fastBatterOnSecond,
      slowFirstRuns,
      slowFirstOnThird
    });
  })()`
));

assert(baseRunnerAdvanceState.fastSecondRuns === 1, "fast runners on second should score on deep singles");
assert(baseRunnerAdvanceState.fastSecondBase === "suzuki", "batter should still stop at first on a single");
assert(baseRunnerAdvanceState.slowSecondRuns === 0, "slow runners on second should not score on shallow singles");
assert(baseRunnerAdvanceState.slowSecondOnThird === true, "slow runners on second should stop at third on shallow singles");
assert(baseRunnerAdvanceState.fastFirstRuns === 1, "fast runners on first should score on deep doubles");
assert(baseRunnerAdvanceState.fastBatterOnSecond === true, "batter should reach second on a double");
assert(baseRunnerAdvanceState.slowFirstRuns === 0, "slow runners on first should not score on short doubles");
assert(baseRunnerAdvanceState.slowFirstOnThird === true, "slow runners on first should stop at third on short doubles");

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
    if (shouldOutfielderHandleFieldingTarget(rollingBall, fieldingTarget) && chosen.role === "P") {
      chosen = chooseDefenseFielder(
        fielders.filter((fielder) => fielder.role !== "P"),
        { ...rollingBall, target: fieldingTarget, landingDistance: Math.max(rollingBall.landingDistance, getFenceDistance(fieldingTarget)) }
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
assert(fenceInPlayState.throwLabel.includes("送球"), "in-play fence rollers should visibly become throw plays");

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

    return JSON.stringify({
      depths,
      normalRollDistance,
      longerRollDistance,
      outfieldGrounderLinerScale: defenseRollTuning.outfieldGrounderLinerScale
    });
  })()`
));

assert(outfieldPositionAndRollState.depths.L > 0.78 && outfieldPositionAndRollState.depths.L < 0.82, "left fielder should start at 80% outfield depth");
assert(outfieldPositionAndRollState.depths.C > 0.78 && outfieldPositionAndRollState.depths.C < 0.82, "center fielder should start at 80% outfield depth");
assert(outfieldPositionAndRollState.depths.R > 0.78 && outfieldPositionAndRollState.depths.R < 0.82, "right fielder should start at 80% outfield depth");
assert(outfieldPositionAndRollState.outfieldGrounderLinerScale === 1.95, "outfield grounders and liners should use the increased roll scale");

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
      insideBox: after.x >= box.left && after.x <= box.right && after.y >= box.top && after.y <= box.bottom
    });
  })()`
));

assert(keyboardBattingControlState.movedRight === true, "right arrow should move the batter inside the box");
assert(keyboardBattingControlState.movedUp === true, "up arrow should move the batter toward the pitcher inside the box");
assert(keyboardBattingControlState.insideBox === true, "keyboard batter movement should stay inside the batter box");

const stalePitchKeyState = JSON.parse(runInGame(
  context,
  `(() => {
    startGame();
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
assert(!state.message.includes("ジャスト (0ms)"), "called strike should not show swing timing");

runInGame(context, 'startPitch("invalid");');
const invalidPitchState = JSON.parse(runInGame(
  context,
  "JSON.stringify({ pendingPitch: Boolean(pendingPitch), isPitching, message })"
));
assert(invalidPitchState.pendingPitch === false, "invalid pitch should not create a pending pitch");
assert(invalidPitchState.isPitching === false, "invalid pitch should not start pitching");
assert(invalidPitchState.message.includes("球種"), "invalid pitch should explain valid pitch controls");

console.log("Smoke check passed");
