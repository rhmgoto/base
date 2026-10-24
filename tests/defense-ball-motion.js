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
  return checks;
})()`, context);
for (const [name, passed] of Object.entries(result)) assert(passed, name);
console.log('Defense ball motion checks passed', result);
