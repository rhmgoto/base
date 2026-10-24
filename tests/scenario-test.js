const fs = require('fs'), path = require('path'), vm = require('vm');
const {assert} = require('./check-utils');
const harness=fs.readFileSync(path.join(__dirname,'baserunning.js'),'utf8').split('const unit = createGameContext();')[0];
const context=new Function('require','__dirname',harness+'\nreturn createGameContext();')(require,__dirname);
context.document.createElement=()=>({appendChild(){},replaceChildren(){},addEventListener(){},showModal(){this.open=true;},close(){this.open=false;}});
context.document.body={appendChild(){}};
const getElement=context.document.getElementById;
context.document.getElementById=id=>{
  const e=getElement(id);e.appendChild=()=>{};e.replaceChildren=()=>{};return e;
};
vm.runInContext(fs.readFileSync(path.join(__dirname,'../scenario-test.js'),'utf8'),context);
const result=vm.runInContext(`(() => {
 const config={outs:1,balls:2,strikes:1,first:true,second:false,third:false,run:9,arm:6,kmh:150,
   control:'both',action:'steal',runnerBase:'first',delay:0.2,pitch:'fast',direction:-0.35};
 prepareScenario(config);
 const original=scenarioTest.savedSelected;
 const originalJson=JSON.stringify(original);
 const setup=count.outs===1&&count.balls===2&&bases.first.run===9&&getTeamCatcherArm(fieldingTeam())===6;
 if (['grounder','fly'].includes(scenarioTest.config.action)) executeScenario(); else startPitch('fast');
 __advanceTime(250);update(16.667);
 const started=stealState.active&&scenarioTest.seen.has('steal-start');
 finishPitch('ボール','ball');updateStealState(performance.now());scenarioObserve();
 handleManualStealCatcherThrow('second');
 __advanceTime((stealState.throw.tagTime+1)*1000);updateStealState(performance.now());scenarioObserve();
 __advanceTime(901);updateStealState(performance.now());scenarioObserve();
 const logged=scenarioTest.events.some(e=>e.label.includes('送球到達'))&&scenarioTest.seen.has('settled');
 prepareScenario(config);
 const retry=count.outs===1&&count.balls===2&&count.strikes===1&&bases.first?.run===9
  &&!bases.second&&!stealState.active&&!defenseState.active&&scenarioTest.events.length===0;
 let invalid=false;try{prepareScenario({...config,second:true});}catch(e){invalid=true;}
 const plays=[];
 for(const action of ['grounder','fly']){
  prepareScenario({...config,action});if (['grounder','fly'].includes(scenarioTest.config.action)) executeScenario(); else startPitch('fast');
  plays.push(gamePhase==='defense'&&defenseState.active&&!!defenseState.battedBall);
  for(let i=0;i<1400&&gamePhase==='defense';i++){__advanceTime(16.667);update(16.667);}
 }
 const controls=[];
 for(const control of ['both','batting','fielding','watch']){
  prepareScenario({...config,control,action:'return'});if (['grounder','fly'].includes(scenarioTest.config.action)) executeScenario(); else startPitch('fast');
  __advanceTime(250);update(16.667);
  const ordered=stealState.active;
  finishPitch('ボール','ball');updateStealState(performance.now());
  if(canManualStealCatcherThrow())handleManualStealCatcherThrow('second');
  const ready=stealState.throw;
  __advanceTime(stealState.startTime+ready.startTime*1000+60-performance.now());
  updateStealState(performance.now());scenarioObserve();
  controls.push(ordered&&gamePhase==='defense'&&defenseState.stealRundown&&scenarioTest.seen.has('return'));
 }
 const catcherTests=[];
 for(const batterAction of ['take','miss']) {
  prepareScenario({...config,balls:0,strikes:0,batterControl:'cpu',runnerControl:'cpu',defenseControl:'player',batterAction});
  const waiting=!pendingPitch&&!isPitching&&!stealState.active;
  executeScenario();
  const noAutomaticPitch=!pendingPitch&&!isPitching;
  const pad={axes:[0,0],buttons:Array.from({length:16},()=>({pressed:false}))};
  pad.buttons[gamepadButtons.A].pressed=true;
  handleGamepadButtonPresses(pad,fieldingTeam());
  pad.buttons[gamepadButtons.A].pressed=false;
  handleGamepadButtonPresses(pad,fieldingTeam());
  for(let i=0;i<400&&!canManualStealCatcherThrow();i++){__advanceTime(16.667);update(16.667);}
  const caught=!!stealState.catcherCaughtAt&&!swingState.madeContact&&!stealState.throw;
  const swung=batterAction==='take'?!swingState.didSwingThisPitch:swingState.didSwingThisPitch;
  pad.axes=[0,-1];pad.buttons[gamepadButtons.A].pressed=true;
  handleGamepadButtonPresses(pad,fieldingTeam());
  catcherTests.push(waiting&&noAutomaticPitch&&caught&&swung&&!!stealState.throw);
 }
 const savedPads=navigator.getGamepads;
 const firstPad={index:0,buttons:[],axes:[0,0]}, secondPad={index:1,buttons:[],axes:[0,0]};
 navigator.getGamepads=()=>[firstPad,secondPad];
 prepareScenario({...config,batterControl:'cpu',runnerControl:'cpu',defenseControl:'player'});
 const padRouting=getGamepadForTeam(fieldingTeam())===firstPad&&getGamepadForTeam(battingTeam)===null;
 navigator.getGamepads=savedPads;
 const earlyTests=[];
 for(const runnerBase of ['first','second','third']) {
  const early={...config,first:false,second:false,third:false,[runnerBase]:true,runnerBase,
    action:'early',batterControl:'cpu',runnerControl:'cpu',defenseControl:'player'};
  prepareScenario(early);
  startPitch('fast');
  const waits=!pendingPitch&&!isPitching;
  executeScenario();
  const startedEarly=stealState.active&&!pendingPitch&&!isPitching&&scenarioTest.seen.has('steal-start');
  __advanceTime(100);update(16.667);
  startPitch('fast');
  const pitched=!!pendingPitch&&scenarioTest.events.find(e=>e.label==='投球動作開始')?.seconds>0;
  prepareScenario(early);
  earlyTests.push(waits&&startedEarly&&pitched&&!stealState.active&&!pendingPitch);
 }
 const splitControls=[];
 for(const batterControl of ['player','cpu']) for(const runnerControl of ['player','cpu']) for(const defenseControl of ['player','cpu']) {
  prepareScenario({...config,batterControl,runnerControl,defenseControl,action:'manual'});
  const roles=isPlayerBatting()===(batterControl==='player')&&isPlayerRunning()===(runnerControl==='player')
   &&isManualBaserunningControl()===(runnerControl==='player')&&isManualThrowControl()===(defenseControl==='player');
  const steal=tryStartSteal('second')===(runnerControl==='player');
  prepareScenario({...config,batterControl,runnerControl,defenseControl,action:'grounder'});if (['grounder','fly'].includes(scenarioTest.config.action)) executeScenario(); else startPitch('fast');
  const running=!!canControlBatterRunner()===(runnerControl==='player');
  splitControls.push(roles&&steal&&running);
 }
 showMenu();
 const restored=!scenarioTest.active&&JSON.stringify(original)===originalJson;
 return {setup,started,logged,retry,invalid,plays,controls,splitControls,catcherTests,padRouting,earlyTests,restored};
})()`,context,{timeout:30000});
assert(result.setup&&result.started&&result.logged&&result.retry&&result.invalid&&result.plays.every(Boolean)&&result.controls.every(Boolean)&&result.splitControls.every(Boolean)&&result.catcherTests.every(Boolean)&&result.padRouting&&result.earlyTests.every(Boolean)&&result.restored,JSON.stringify(result));
console.log('Scenario tests passed',result);


