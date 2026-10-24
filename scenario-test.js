// 場面の準備と記録のみを担当。移動・送球・捕球・アウトはscript.jsの通常処理を使う。
const scenarioTest = { active: false, config: null, epoch: null, actionAt: null,
  executed: false, events: [], seen: new Set(), savedSelected: null };
const scenarioDialog = document.createElement('dialog');
scenarioDialog.id = 'scenarioDialog';
scenarioDialog.innerHTML = `
  <form id="scenarioForm">
    <h2>場面テスト</h2>
    <p>現在メニューで選んでいるチームを使用します。能力変更はこのテスト中だけ有効です。</p>
    <button id="scenarioStealPreset" type="button">盗塁阻止テストの設定にする</button>
    <div class="scenario-grid">
      <label>アウト数<select name="outs"><option value="0">0アウト</option><option value="1">1アウト</option><option value="2">2アウト</option></select></label>
      <label>ボール数<input name="balls" type="number" min="0" max="3" value="0" required></label>
      <label>ストライク数<input name="strikes" type="number" min="0" max="2" value="0" required></label>
      <fieldset><legend>塁上走者</legend><label><input type="checkbox" name="first" checked>一塁</label><label><input type="checkbox" name="second">二塁</label><label><input type="checkbox" name="third">三塁</label></fieldset>
      <label>全走者・打者の走力<input name="run" type="number" min="1" max="30" value="9" required></label>
      <label>捕手の肩<input name="arm" type="number" min="1" max="30" value="6" required></label>
      <label>投手の球速基準（km/h）<input name="kmh" type="number" min="80" max="200" value="150" required></label>
      <label>打者の操作<select name="batterControl"><option value="player">プレイヤー操作</option><option value="cpu">CPU操作</option></select></label>
      <label>CPU打者の行動<select name="batterAction"><option value="normal">通常の打撃</option><option value="take">見逃し</option><option value="miss">空振り（テスト用）</option></select></label>
      <label>走者の操作<select name="runnerControl"><option value="player">プレイヤー操作</option><option value="cpu">CPU操作</option></select></label>
      <label>投手・守備の操作<select name="defenseControl"><option value="player">プレイヤー操作</option><option value="cpu">CPU操作</option></select></label>
      <label>次の行動<select name="action"><option value="steal">指定走者が必ず盗塁</option><option value="early">投球開始前に走り出す</option><option value="return">盗塁し、送球開始後に帰塁</option><option value="manual">通常の投球・操作担当に従う</option><option value="grounder">内野ゴロを発生</option><option value="fly">内野フライを発生</option></select></label>
      <label>盗塁する走者<select name="runnerBase"><option value="first">一塁走者（二盗）</option><option value="second">二塁走者（三盗）</option><option value="third">三塁走者（本盗）</option></select></label>
      <label>投球動作開始から盗塁まで（秒）<input name="delay" type="number" min="0" max="3" step="0.05" value="0.2" required></label>
      <label>指定する投球<select name="pitch"><option value="fast">速球</option><option value="normal">直球</option><option value="slow">遅い球</option><option value="special">決め球</option></select></label>
      <label>指定打球の方向<select name="direction"><option value="-0.35">三塁・遊撃側</option><option value="0">中央</option><option value="0.35">二塁・一塁側</option></select></label>
    </div>
    <p>「必ず」は行動の指示です。盗塁成功・捕球・アウトを強制しません。再試行は場面を復元しますが、球速のばらつきやエラーなどの乱数は通常どおりです。</p>
    <p>指定した盗塁・帰塁は操作担当に関係なく実行します。CPU打者を「見逃し／空振り」にすると盗塁への送球を集中して確認できます。空振り指定はテスト中のみ打球を発生させません。</p>
    <p id="scenarioError" role="alert"></p>
    <div class="scenario-actions"><button type="submit">この場面を準備</button><button id="scenarioCancel" type="button">閉じる</button></div>
  </form>`;
document.body.appendChild(scenarioDialog);

function scenarioRecord(key, label, absoluteTime = performance.now()) {
  if (!scenarioTest.active || scenarioTest.seen.has(key)) return;
  scenarioTest.seen.add(key);
  const seconds = scenarioTest.epoch == null ? 0 : (absoluteTime - scenarioTest.epoch) / 1000;
  scenarioTest.events.push({ label, seconds });
  const list = document.getElementById('scenarioEvents');
  const entry = document.createElement('li');
  entry.textContent = `${seconds.toFixed(3)}秒　${label}`;
  list.appendChild(entry);
}

function scenarioStop() {
  if (scenarioTest.savedSelected) selected = scenarioTest.savedSelected;
  if (scenarioTest.savedControls) {
    ({ gameMode, playerTeam, defenseControlMode } = scenarioTest.savedControls);
    scenarioTest.savedControls = null;
  }
  scenarioTest.savedSelected = null;
  scenarioTest.active = false;
  scenarioTest.actionAt = null;
  document.getElementById('scenarioStatus').hidden = true;
}

function getScenarioControl(role) {
  return scenarioTest.active ? scenarioTest.config[role + "Control"] === "player" : null;
}

function prepareScenario(config) {
  config = { ...config,
    batterControl: config.batterControl || (["fielding", "watch"].includes(config.control) ? "cpu" : "player"),
    runnerControl: config.runnerControl || (["fielding", "watch"].includes(config.control) ? "cpu" : "player"),
    defenseControl: config.defenseControl || (["batting", "watch"].includes(config.control) ? "cpu" : "player")
  };
  if (['steal','return','early'].includes(config.action)) {
    const target = { first:'second', second:'third', third:'home' }[config.runnerBase];
    if (!config[config.runnerBase]) throw new Error('盗塁を指定した塁に走者を配置してください。');
    if (target !== 'home' && config[target]) throw new Error('盗塁先の塁を空けてください。');
  }
  scenarioStop();
  closePauseMenu();
  keysDown.clear();
  gamePhase = 'menu';
  startGame('versus');
  if (gamePhase !== 'playing') throw new Error('通常対戦のチーム編成・コスト上限を確認してください。');
  scenarioTest.savedSelected = selected;
  scenarioTest.savedControls = { gameMode, playerTeam, defenseControlMode };
  selected = JSON.parse(JSON.stringify(selected));
  scenarioTest.config = { ...config };
  scenarioTest.active = true;
  scenarioTest.epoch = null;
  scenarioTest.actionAt = null;
  scenarioTest.executed = false;
  scenarioTest.events = [];
  scenarioTest.seen = new Set();
  scenarioTest.throwIds = new WeakMap();
  scenarioTest.throwCount = 0;
  gameMode = 'single';
  playerTeam = config.defenseControl === 'player' ? fieldingTeam() : battingTeam;
  defenseControlMode = { away:'manual', home:'manual' };
  for (const entry of selected[battingTeam].batters) entry.player.run = config.run;
  const catcher = selected[fieldingTeam()].batters.find(entry => entry.role === catcherRole);
  if (catcher) catcher.player.arm = config.arm;
  getTeamActivePitcher(fieldingTeam()).fastKmh = config.kmh;
  setMatchup();
  count = { outs:config.outs, balls:config.balls, strikes:config.strikes };
  bases = createEmptyBases();
  ['first','second','third'].forEach((base,index) => {
    if (!config[base]) return;
    const source = selected[battingTeam].batters[(index+1)%selected[battingTeam].batters.length].player;
    bases[base] = makeBaseRunner({ ...source, id:`scenario-${base}`, name:`テスト${getBaseLabel(base)}走者`, run:config.run });
  });
  autoPitchTimer = Infinity; computerPitchPlan = null;
  document.getElementById('scenarioEvents').replaceChildren();
  document.getElementById('scenarioStatus').hidden = false;
  document.getElementById('scenarioSummary').textContent = `${config.outs}アウト／走力${config.run}／捕手の肩${config.arm}。準備完了`;
  const manualPitch = config.defenseControl === 'player' && !['grounder','fly','early'].includes(config.action);
  document.getElementById('scenarioExecute').disabled = manualPitch;
  document.getElementById('scenarioExecute').textContent = manualPitch ? '投球操作待ち（ボタン2／キー2など）' : '設定の行動を開始';
  if (config.action === 'early') {
    document.getElementById('scenarioExecute').textContent = '投球前に走者をスタート';
    document.getElementById('scenarioSummary').textContent += '。「投球前に走者をスタート」を押してから、投球または牽制してください（盗塁までの秒数は使用しません）。';
  }
  clearTeamGamepadHistory();
  scenarioTest.waitForInputRelease = true;
  document.getElementById('scenarioEdit').disabled = false;
  message = '場面テスト：通常の操作で投球すると、指定の行動が始まります';
  if (config.defenseControl === 'player') document.getElementById('scenarioSummary').textContent += '。通常の操作で投球してください。捕手の送球も手動です。';
  updateSidebarAbilityPanels();
}

function executeScenario() {
  if (!scenarioTest.active || scenarioTest.executed || gamePhase !== 'playing' || isPitching || pendingPitch) return;
  const config = scenarioTest.config;
  if (config.action === 'early') {
    const target = {first:'second',second:'third',third:'home'}[config.runnerBase];
    const candidate = getStealCandidate(target);
    const now = performance.now();
    if (!candidate || !beginStealAttempt(candidate, now, {earlyRequest:true})) return;
    scenarioTest.executed = true;
    scenarioTest.epoch = now;
    scenarioRecord('steal-start','投球前の盗塁開始',now);
    document.getElementById('scenarioExecute').disabled = true;
    document.getElementById('scenarioEdit').disabled = true;
    document.getElementById('scenarioSummary').textContent = '走者がスタートしました。通常の操作で投球・牽制できます。';
  } else if (['grounder','fly'].includes(config.action)) {
    scenarioTest.executed = true;
    document.getElementById('scenarioEdit').disabled = true;
    document.getElementById('scenarioSummary').textContent = '指定打球のテスト中。捕球・進塁・送球は通常の操作です。';
    scenarioTest.epoch = performance.now();
    const fly = config.action === 'fly';
    startDefensePlay(fly ? hitLabels.popup : hitLabels.centerReturnGrounder, fly ? 'out' : 'hit',
      0.35, 0, normalize({x:config.direction,y:-1}), {unifiedDistanceRatio:0.23,quality:0.5});
    scenarioRecord('start', fly ? '指定した内野フライ発生' : '指定した内野ゴロ発生');
    document.getElementById('scenarioExecute').disabled = true;
  } else if (config.defenseControl !== 'player') startPitch(config.pitch);
}

function scenarioObserve(recordOnly = false) {
  if (!scenarioTest.active || scenarioTest.epoch == null) return;
  const now = performance.now();
  if (!recordOnly && scenarioTest.actionAt != null && now >= scenarioTest.actionAt) {
    scenarioTest.actionAt = null;
    const base = scenarioTest.config.runnerBase;
    const target = {first:'second',second:'third',third:'home'}[base];
    const candidate = gamePhase === 'playing' && !stealState.active && !ball.crossedPlate ? getStealCandidate(target) : null;
    // CPU担当でも通常の盗塁開始処理へ指示を渡す（手動入力用の担当チェックは通さない）。
    if (candidate && beginStealAttempt(candidate, now, {earlyRequest:!isPitching&&!pendingPitch})) scenarioRecord('steal-start','盗塁開始');
    else scenarioRecord('steal-rejected','盗塁開始不可（打球・走者状態を確認）');
  }
  if (stealState.active && stealState.catcherCaughtAt != null)
    scenarioRecord('catcher','捕手捕球',stealState.catcherCaughtAt);
  if (!recordOnly && scenarioTest.config.action === 'return' && stealState.throw && !stealState.decision
      && now >= stealState.startTime + stealState.throw.startTime*1000 + 50 && !scenarioTest.seen.has('return')) {
    returnStealingRunner(now);
    scenarioRecord('return','送球後の帰塁指示');
  }
  const toss = stealState.active ? stealState.throw : defenseState.active ? defenseState.throw : null;
  const epoch = stealState.active ? stealState.startTime : defenseState.startTime;
  if (toss && Number.isFinite(toss.endTime)) {
    if (!scenarioTest.throwIds.has(toss)) scenarioTest.throwIds.set(toss,++scenarioTest.throwCount);
    const id = scenarioTest.throwIds.get(toss);
    if (now >= epoch+toss.startTime*1000) scenarioRecord('throw-'+id,`${getBaseLabel(toss.targetBase)}へ送球開始`,epoch+toss.startTime*1000);
    if (now >= epoch+toss.endTime*1000) scenarioRecord('catch-'+id,`${getBaseLabel(toss.targetBase)}へ送球到達`,epoch+toss.endTime*1000);
  }
  const runners = stealState.active ? [{...stealState.runner,targetBase:stealState.targetBase,arrivalTime:stealState.arrivalTime}]
    : defenseState.active ? [defenseState.runner,...defenseState.baseRunners].filter(Boolean) : [];
  for (const runner of runners) {
    if (runner.arrived && !runner.isOut && Number.isFinite(runner.arrivalTime))
      scenarioRecord(`runner-${runner.id}-${runner.targetBase}-${runner.arrivalTime}`,
        `${runner.name || '打者走者'}：${getBaseLabel(runner.targetBase)}到達`,epoch+runner.arrivalTime*1000);
  }
  if (stealState.decision) scenarioRecord('steal-result',stealState.decision.out?'盗塁タッチアウト':'盗塁・帰塁セーフ');
  for (const out of defenseState.active ? defenseState.completedThrowOuts || [] : [])
    scenarioRecord('out-'+out.startBase,`${getBaseLabel(out.targetBase)}：${out.outType==='force'?'フォース':'タッチ'}アウト`,defenseState.startTime+out.time*1000);
  if (defenseState.active && defenseState.outcome?.caught && !defenseState.outcome?.needsThrow
      && now >= defenseState.startTime+defenseState.outcome.fieldingTime*1000)
    scenarioRecord('fly-catch','フライ捕球アウト',defenseState.startTime+defenseState.outcome.fieldingTime*1000);
  if (scenarioTest.executed && !isPitching && !pendingPitch && !ball.active && !stealState.active && !defenseState.active) {
    scenarioRecord('settled','プレー終了：同じ場面を再試行できます');
    autoPitchTimer = Infinity;
  }
}

// 空振り指定だけ接触を抑え、ストライク・盗塁・送球の判定は通常処理に任せる。
function scenarioBatterAction() {
  return scenarioTest.active && !isPlayerBatting() ? scenarioTest.config.batterAction || 'normal' : 'normal';
}
const scenarioOriginalComputerSwing = computerSwingBat;
computerSwingBat = function() {
  const action = scenarioBatterAction();
  if (action === 'take') return;
  if (action === 'miss') {
    if (gamePhase === 'playing' && isPitching && ball.inPitch && !ball.crossedPlate
        && !swingState.didSwingThisPitch && getPitchProgress() >= 0.75) startSwing(performance.now(), 'strong');
    return;
  }
  return scenarioOriginalComputerSwing();
};
const scenarioOriginalContact = checkSwingContact;
checkSwingContact = function(...args) {
  if (scenarioBatterAction() === 'miss') return;
  return scenarioOriginalContact(...args);
};

// モード外では必ず元の関数に委譲する。
// 設定確定に使ったボタンを投球操作として持ち越さない。
// 片側だけを操作するテストでは、守備チームが後攻でも1Pを使う。
const scenarioOriginalTeamGamepad = getGamepadForTeam;
getGamepadForTeam = function(team) {
  if (scenarioTest.active) {
    const offense = getScenarioControl('batter') || getScenarioControl('runner');
    const defense = getScenarioControl('defense');
    if (offense !== defense) {
      const humanTeam = defense ? fieldingTeam() : battingTeam;
      return team === humanTeam ? getConnectedGamepads()[0] || null : null;
    }
  }
  return scenarioOriginalTeamGamepad(team);
};
const scenarioOriginalPollInput = pollGamepadInput;
pollGamepadInput = function() {
  if (scenarioTest.active && scenarioTest.waitForInputRelease) {
    const held = getConnectedGamepads().some(pad => (pad.buttons || []).some(button => button?.pressed))
      || touchControlState.buttons.size > 0;
    if (held) return;
    scenarioTest.waitForInputRelease = false;
    clearTeamGamepadHistory();
  }
  return scenarioOriginalPollInput();
};
const scenarioOriginalStartPitch = startPitch;
startPitch = function(type, options) {
  if (scenarioTest.active && scenarioTest.seen.has('settled')) return;
  const wasPending = pendingPitch;
  if (scenarioTest.active && scenarioTest.config.action === 'early' && !scenarioTest.executed) {
    message = '先に「投球前に走者をスタート」を押してください';
    return;
  }
  const result = scenarioOriginalStartPitch(type, options);
  if (scenarioTest.active && scenarioTest.config.action === 'early' && pendingPitch && pendingPitch !== wasPending)
    scenarioRecord('start','投球動作開始');
  if (scenarioTest.active && pendingPitch && pendingPitch !== wasPending && !scenarioTest.executed) {
    scenarioTest.executed = true; scenarioTest.epoch = performance.now();
    document.getElementById('scenarioEdit').disabled = true;
    document.getElementById('scenarioSummary').textContent = 'テスト進行中。操作・アウト判定は通常と共通です。';
    document.getElementById('scenarioExecute').disabled = true;
    scenarioRecord('start','投球動作開始');
    if (['steal','return'].includes(scenarioTest.config.action))
      scenarioTest.actionAt = scenarioTest.epoch + scenarioTest.config.delay*1000;
  }
  return result;
};
const scenarioOriginalUpdate = update;
update = function(delta) {
  if (scenarioDialog.open) return;
  if (scenarioTest.active) autoPitchTimer = Infinity;
  const result = scenarioOriginalUpdate(delta);
  if (!pauseMenuState.active) scenarioObserve();
  document.getElementById('scenarioEdit').disabled = scenarioTest.active
    && (isPitching || !!pendingPitch || ball.active || stealState.active || defenseState.active);
  return result;
};
const scenarioOriginalAutoPitch = shouldAutoScheduleComputerPitch;
shouldAutoScheduleComputerPitch = function() { return !scenarioTest.active && scenarioOriginalAutoPitch(); };
const scenarioOriginalComputerSteal = planComputerSteal;
planComputerSteal = function(...args) { return scenarioTest.active && scenarioTest.config.action !== 'manual' ? false : scenarioOriginalComputerSteal(...args); };
const scenarioOriginalFinishDefense = finishDefensePlay;
finishDefensePlay = function(...args) { scenarioObserve(true); return scenarioOriginalFinishDefense(...args); };
const scenarioOriginalResolveSteal = resolveSteal;
resolveSteal = function(...args) { scenarioObserve(true); return scenarioOriginalResolveSteal(...args); };

document.getElementById('scenarioStealPreset').addEventListener('click', () => {
  const fields = document.getElementById('scenarioForm').elements;
  const preset = { outs:0, balls:0, strikes:0, batterControl:'cpu', runnerControl:'cpu',
    defenseControl:'player', batterAction:'take', action:'steal', runnerBase:'first', delay:0.2 };
  for (const [key,value] of Object.entries(preset)) fields.namedItem(key).value = String(value);
  for (const base of ['first','second','third']) fields.namedItem(base).checked = base === 'first';
});
document.getElementById('scenarioOpen').addEventListener('click',()=>scenarioDialog.showModal());
// 設定欄の数字入力を、投球・走塁のキー操作に渡さない。
scenarioDialog.addEventListener('keydown',event=>event.stopPropagation());
scenarioDialog.addEventListener('keyup',event=>event.stopPropagation());
document.getElementById('scenarioEdit').addEventListener('click',()=>scenarioDialog.showModal());
document.getElementById('scenarioCancel').addEventListener('click',()=>scenarioDialog.close());
document.getElementById('scenarioExecute').addEventListener('click',executeScenario);
document.getElementById('scenarioRetry').addEventListener('click',()=>prepareScenario(scenarioTest.config));
document.getElementById('scenarioForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const config = Object.fromEntries(data);
  for (const key of ['outs','balls','strikes','run','arm','kmh','delay','direction']) config[key]=Number(config[key]);
  for (const base of ['first','second','third']) config[base]=data.has(base);
  try { prepareScenario(config); scenarioDialog.close(); document.getElementById('scenarioError').textContent=''; }
  catch (error) { document.getElementById('scenarioError').textContent=error.message; }
});
