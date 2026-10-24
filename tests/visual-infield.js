// 実ブラウザーで内野画面の送球・捕球・タッチを再現する画像確認用。
// node tests/visual-infield.js [Chrome実行ファイル]
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawnSync } = require('child_process');
const root = path.resolve(__dirname, '..');
const viewport = process.argv[3] || '1500,1100';
const output = path.join(root, 'backups', 'visual-infield', ...(process.argv[3] ? [viewport.replace(',', 'x')] : []));
fs.mkdirSync(output, { recursive: true });
const chrome = process.argv[2] || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const setup = `
window.addEventListener('load', () => {
  setTimeout(() => {
    let clock = 10000;
    Object.defineProperty(performance, 'now', { value: () => clock });
    modeSelect.value = 'versus'; startGame(); gameMode = 'versus'; resetBall();
    defenseControlMode[fieldingTeam()] = 'manual';
    bases = createEmptyBases();
    bases.first = makeBaseRunner({ id: 'qa-runner', name: '走者', run: 5 });
    bases.third = makeBaseRunner({ id: 'qa-third', name: '三塁走者', run: 5 });
    tryStartSteal('second', clock);
    const stealPhase = location.hash.slice(1);
    if (stealPhase.startsWith('steal-')) {
      clock += 250; updateStealState(clock);
      finishPitch('ボール', 'ball'); updateStealState(clock);
      if (stealPhase !== 'steal-catch') {
        handleManualStealCatcherThrow('second', {}, clock);
        const toss = stealState.throw;
        clock = stealState.startTime + (['steal-throw', 'steal-return', 'steal-chase'].includes(stealPhase)
          ? (toss.startTime + toss.endTime) / 2 : toss.tagTime + 0.01) * 1000;
        updateStealState(clock);
        if (['steal-return', 'steal-chase'].includes(stealPhase)) {
          returnStealingRunner(clock);
          if (stealPhase === 'steal-chase') {
            clock = defenseState.startTime + (toss.endTime + 0.01) * 1000;
            const elapsed = (clock - defenseState.startTime) / 1000;
            updateDefenseBaseRunners(elapsed); updateThrowState(elapsed);
            handleRundownCommand('first'); updateRundown(elapsed + 0.08);
          }
        }
      }
      draw(); document.body.dataset.visualCheck = stealPhase; return;
    }
    clock += 200; updateStealState(clock); startPickoff('second', clock);
    const start = clock;
    const runner = defenseState.baseRunners.find(r => r.startBase === 'first');
    const phase = location.hash.slice(1) || 'throw';
    if (['grounder', 'fly-return', 'relay'].includes(phase)) {
      const target = { x: field.plateX - 190, y: field.plateY - 470 };
      const origin = { x: field.plateX, y: field.plateY };
      const fielders = initializeFielderCatchRanges(getDefensiveLineup(fieldingTeam()));
      const fielder = fielders.find(f => f.role === 'SS');
      Object.assign(fielder, target);
      const hit = { target, origin, direction: normalize({ x: -0.3, y: -1 }),
        trajectory: phase === 'grounder' ? 'grounder' : 'fly', isGrounder: phase === 'grounder',
        ballTime: 1, power: 0.3, distance: 500, landingDistance: 500, flightDistance: 500 };
      const outcome = { kind: 'out', caught: true, needsThrow: phase === 'grounder', fieldingTime: 1 };
      const returning = createDefenseBaseRunner('first', bases.first, outcome, hit, null, fielder, target,
        { active: true, startBase: 'first', targetBase: 'second', runnerId: bases.first.id, leadDistance: 220 });
      defenseState = { ...createDefenseState(), active: true, startTime: clock - 1200,
        duration: 30000, origin, target, landingTarget: target, battedBall: hit, outcome,
        fielders, chosenFielder: fielder, runner: createBatterRunner(activeBatter), baseRunners: [returning],
        unifiedCircleCatchComplete: true };
      updateDefenseBaseRunners(1.2); updateFlyReturnRequirements(1.2);
      if (phase === 'grounder') defenseState.startTime = clock - 500;
      if (phase === 'relay') {
        defenseState.throw = { from: target, to: defenseField.bases.second, targetBase: 'second',
          startTime: 1, endTime: 1.4, throwTime: 0.4 };
        defenseState.defensePreview = { base: 'first', label: '送球先' };
      } else defenseState.defensePreview = { base: 'first', label: '送球先' };
      if (phase === 'fly-return') {
        defenseState.runnerPreview = { base: 'first', label: '帰塁先' };
        addDefenseVisualEvent('捕球！', target, '#aee7ff', 650);
      }
      const point = getDefenseBallPoint(0, 0, (clock - defenseState.startTime) / 1000);
      ball.x = point.x; ball.y = point.y;
      draw(); document.body.dataset.visualCheck = phase; return;
    }
    const toss = defenseState.throw;
    const elapsed = phase === 'throw' ? toss.startTime + toss.throwTime * 0.5
      : phase === 'catch' ? toss.endTime + 0.01 : runner.arrivalTime + 0.01;
    clock = start + elapsed * 1000;
    updateDefenseBaseRunners(elapsed); updateThrowState(elapsed); updateRundown(elapsed);
    if (phase === 'tag') clock += 160;
    if (phase === 'out') { clock += 400; updateDefensePlay(clock); }
    if (phase === 'rundown') {
      defenseState.tagPresentation = null;
      runner.isOut = false; runner.arrived = false;
      const base = defenseField.bases.second;
      runner.x = base.x + 180; runner.y = base.y + 120;
      handleRundownCommand('first'); updateRundown(elapsed + 0.08);
    }
    const point = getDefenseBallPoint(0, 0, elapsed);
    ball.x = point.x; ball.y = point.y;
    draw();
    document.body.dataset.visualCheck = phase;
  }, 1200);
});`;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
  .replace('<head>', '<head><base href="' + pathToFileURL(root + path.sep).href + '">')
  .replace('<script src="script.js">', '<script>window.requestAnimationFrame = () => 0;</script><script src="script.js">')
  .replace('</body>', '<script>' + setup + '</script></body>');
const fixture = path.join(output, 'fixture.html');
fs.writeFileSync(fixture, html);
for (const phase of ['throw', 'catch', 'tag', 'out', 'rundown', 'grounder', 'fly-return', 'relay', 'steal-catch', 'steal-throw', 'steal-out', 'steal-return', 'steal-chase']) {
  if (process.argv[4] && !phase.startsWith(process.argv[4])) continue;
  const screenshot = path.join(output, phase + '.png');
  const result = spawnSync(chrome, ['--headless', '--disable-gpu', '--no-first-run',
    '--allow-file-access-from-files', '--hide-scrollbars', '--window-size=' + viewport,
    '--user-data-dir=' + path.join(output, 'profile'), '--virtual-time-budget=4000',
    '--screenshot=' + screenshot, pathToFileURL(fixture).href + '#' + phase],
    { windowsHide: true, timeout: 30000, encoding: 'utf8' });
  if (result.error || result.status !== 0 || !fs.existsSync(screenshot)) {
    throw result.error || new Error(result.stderr || 'Screenshot failed');
  }
  console.log(screenshot);
}
