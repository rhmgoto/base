const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { assert } = require('./check-utils');
const harness = fs.readFileSync(path.join(__dirname, 'baserunning.js'), 'utf8')
  .split('const unit = createGameContext();')[0];
const context = new Function('require', '__dirname', harness + '\nreturn createGameContext();')(require, __dirname);
const result = vm.runInContext(`(() => {
  const checks = {};
  for (const trajectory of ['grounder', 'liner', 'fly']) {
    const origin = { x: 600, y: 1600 };
    const landing = { x: 800, y: 900 };
    const target = { x: 900, y: 550 };
    const hit = { origin, target, trajectory, isGrounder: trajectory === 'grounder',
      isLiner: trajectory === 'liner', power: 0.7, ballTime: 1.2, maxHeight: 160 };
    defenseState = { ...createDefenseState(), active: true, origin, target,
      landingTarget: landing, battedBall: hit, duration: 10000,
      outcome: { caught: false } };
    const duration = hit.isGrounder ? getDefenseGrounderTravelSeconds()
      : hit.ballTime + getDefenseRollDuration(hit, landing, target);
    let previous = null;
    let smooth = true;
    for (let t = 0; t <= duration + 0.1; t += 1 / 120) {
      const p = getDefenseBallPoint(0, 0, t);
      const h = getDefenseBallHeightAtPoint(0, t);
      if (![p.x, p.y, h].every(Number.isFinite) || h < 0) smooth = false;
      if (previous && (Math.hypot(p.x - previous.x, p.y - previous.y) > 20
        || Math.abs(h - previous.h) > 12)) smooth = false;
      previous = { ...p, h };
    }
    checks[trajectory + 'Continuous'] = smooth;
    checks[trajectory + 'StopsOnGround'] = Math.abs(previous.h) < 0.001;
    // 捕球で軌道の終点・時刻が書き換わっても、接触した位置が保たれる。
    const contactTime = 0.63;
    const contact = getDefenseBallPoint(0, 0, contactTime);
    ball.x = contact.x; ball.y = contact.y;
    const contactHeight = getDefenseBallHeightAtPoint(0, contactTime);
    const glove = { x: contact.x + 18, y: contact.y - 9 };
    startDefenseCatchVisual({ role: 'SS', fielding: 5 }, glove, contactTime, !hit.isGrounder);
    defenseState.target = glove;
    defenseState.outcome = { caught: true, needsThrow: hit.isGrounder, fieldingTime: contactTime };
    const after = getDefenseBallPoint(0, 0, contactTime);
    const afterHeight = getDefenseBallHeightAtPoint(0, contactTime);
    checks[trajectory + 'CatchContinuous'] = Math.hypot(after.x - contact.x, after.y - contact.y) < 0.001
      && Math.abs(afterHeight - contactHeight) < 0.001;
    const held = getDefenseBallPoint(0, 0, contactTime + 1);
    checks[trajectory + 'HeldAtGlove'] = Math.hypot(held.x - glove.x, held.y - glove.y) < 0.001;
    ball.active = true;
    drawMiniDefenseField(1010, 104, 240, 176);
  }
  for (const power of [0.1, 0.7, 1.3]) {
    let lastSpeed = Infinity;
    let previous = 0;
    let slowing = true;
    for (let i = 1; i <= 1000; i++) {
      const p = getNaturalRollingProgress(i / 1000, { power });
      const speed = p - previous;
      if (speed < 0 || speed > lastSpeed + 1e-10) slowing = false;
      previous = p; lastSpeed = speed;
    }
    checks['rollDecelerates' + power] = slowing && previous === 1;
    checks['rollStopsSmoothly' + power] = lastSpeed < 0.00001;
  }
  for (const grounder of [true, false]) {
    const origin = { ...defenseField.bases.home };
    const hit = { origin, target: { x: origin.x + 900, y: origin.y - 120 },
      direction: normalize({ x: 1, y: -0.15 }), isFoulBall: true,
      isGrounder: grounder, trajectory: grounder ? 'grounder' : 'fly',
      ballTime: 1.2, maxHeight: grounder ? 8 : 260, power: 0.7 };
    const target = getFoulBallFieldingTarget(hit);
    defenseState = { ...createDefenseState(), active: true, foulPlay: true,
      startTime: performance.now(), duration: 15000, origin, target, landingTarget: hit.target,
      battedBall: hit, outcome: { kind: 'foul', caught: false, fieldingTime: 1.2 },
      chosenFielder: { role: 'SS', x: origin.x - 200, y: origin.y - 400 } };
    gamePhase = 'defense';
    const end = getFoulBallTravelEndSeconds();
    checks['foulNoPhantomHolder' + grounder] = !hasFielderSecuredBall(2.3);
    hit.isFoulBall = false; defenseState.foulPlay = false;
    checks['uncaughtFairBallNoPhantomHolder' + grounder] = !hasFielderSecuredBall(2.3);
    hit.isFoulBall = true; defenseState.foulPlay = true;
    checks['foulTrackedUntilSettled' + grounder] = !shouldResolveDefensePlayNow(end + 0.5)
      && shouldResolveDefensePlayNow(end + 1.21)
      && getDefenseDuration(hit, defenseState.outcome, null, null, target) >= (end + 1.2) * 1000;
    checks['foulCameraCoversPath' + grounder] = isInfieldOverviewActive();
    const camera = getInfieldOverviewCamera();
    for (const p of [origin, hit.target, target]) {
      const x = p.x * camera.scale + camera.x, y = p.y * camera.scale + camera.y;
      checks['foulFrame' + grounder + p.x] = x >= 0 && x <= canvas.width && y >= 145 && y <= canvas.height;
    }
    const catchTime = 0.7;
    const contact = getDefenseBallPoint(0, 0, catchTime);
    Object.assign(ball, contact);
    const glove = { x: contact.x + 12, y: contact.y - 8 };
    completeUnifiedCircleCatch({ role: 'SS', fielding: 20, arm: 5, speed: 5 }, glove, catchTime);
    const captured = getDefenseBallPoint(0, 0, catchTime);
    checks['foulCatchNoWarp' + grounder] = Math.hypot(captured.x - contact.x, captured.y - contact.y) < 0.001;
    const later = getDefenseBallPoint(0, 0, catchTime + 0.5);
    checks['foulCatchHolds' + grounder] = Math.hypot(later.x - glove.x, later.y - glove.y) < 0.001;
    checks['foulCatchKeepsCamera' + grounder] = getInfieldOverviewCamera().scale === camera.scale;
    let ballsDrawn = 0;
    const drawIcon = drawBaseballIcon;
    drawBaseballIcon = () => { ballsDrawn++; };
    drawDefenseCatchBallTransition(catchTime + 0.5, 8, 0.35);
    drawBaseballIcon = drawIcon;
    checks['foulCatchStaysVisible' + grounder] = ballsDrawn === 1;
  }
  checks.flyVisiblyAboveGrounder = getInfieldBallDisplayHeight(180, { isGrounder: false }) > 100
    && getInfieldBallDisplayHeight(12, { isGrounder: true }) < 8;
  checks.catchStyleSelection = getDefenseCatchStyle(0.3, 0, false) === 'normal'
    && getDefenseCatchStyle(0.9, 0, false) === 'scoop'
    && getDefenseCatchStyle(0.9, 1, true) === 'stretch'
    && getDefenseCatchStyle(0.3, getLiveCircleCatchReachHeight(), true) === 'jump';
  for (const style of ['normal', 'stretch', 'jump', 'scoop']) {
    for (const overview of [false, true]) {
      const point = { x: 650, y: 750 };
      defenseState = { ...createDefenseState(), active: true,
        outcome: { caught: true }, battedBall: { isGrounder: style === 'scoop' },
        catchVisual: { point, fromX: 710, shadowX: 710, shadowY: 750,
          fromY: 710, heightAtContact: 40, startTime: 1, duration: 0.2, catchStyle: style } };
      const initial = getDefenseCatchMotion(point.x, point.y, 1, overview);
      const expectedY = overview ? 750 - getInfieldBallDisplayHeight(40) : 710;
      checks['gloveContactsBall' + style + overview] = Math.abs(initial.gloveWorld.x - 710) < 0.001
        && Math.abs(initial.gloveWorld.y - expectedY) < 0.001;
      let continuous = true, previous = null;
      const scale = 1.08 * (overview ? 1.28 : 1);
      for (let i = 0; i <= 100; i++) {
        const motion = getDefenseCatchMotion(point.x, point.y, 1 + i / 100, overview);
        const gx = motion.glove.x, gy = motion.glove.y * motion.bodyScaleY;
        const renderedX = point.x + scale * (motion.leanX + gx * Math.cos(motion.rotation) - gy * Math.sin(motion.rotation));
        const renderedY = point.y + scale * (motion.drop - motion.lift + gx * Math.sin(motion.rotation) + gy * Math.cos(motion.rotation));
        if (Math.hypot(renderedX - motion.gloveWorld.x, renderedY - motion.gloveWorld.y) > 0.001) continuous = false;
        if (previous && Math.hypot(motion.gloveWorld.x - previous.x, motion.gloveWorld.y - previous.y) > 8) continuous = false;
        previous = motion.gloveWorld;
      }
      const rest = getDefenseCatchMotion(point.x, point.y, 2, overview);
      checks['gloveTracksBall' + style + overview] = continuous;
      checks['catchReturnsToRest' + style + overview] = rest.amount === 0 && rest.lift === 0 && rest.leanX === 0
        && Math.hypot(rest.gloveWorld.x - (point.x - 33 * scale), rest.gloveWorld.y - (point.y + 25 * scale)) < 0.001;
      checks['catchBodyAction' + style + overview] = style === 'jump' ? initial.lift > 0
        : style === 'stretch' ? Math.abs(initial.rotation) > 0
        : style === 'scoop' ? initial.drop > 0 && initial.bodyScaleY < 1
        : initial.lift === 0 && initial.drop === 0 && initial.rotation === 0;
    }
  }
  return checks;
})()`, context);
for (const [name, passed] of Object.entries(result)) assert(passed, name);
console.log('Defense ball motion checks passed', result);
