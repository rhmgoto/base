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
    clock += 200; updateStealState(clock); startPickoff('second', clock);
    const start = clock;
    const runner = defenseState.baseRunners.find(r => r.startBase === 'first');
    const phase = location.hash.slice(1) || 'throw';
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
for (const phase of ['throw', 'catch', 'tag', 'out', 'rundown']) {
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
