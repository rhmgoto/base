const fs=require('fs'),path=require('path'),{pathToFileURL}=require('url'),{spawnSync}=require('child_process');
const root=path.resolve(__dirname,'..'),out=path.join(root,'backups','visual-scenario');fs.mkdirSync(out,{recursive:true});
const setup=`window.addEventListener('load',()=>setTimeout(()=>{
 let clock=10000;Object.defineProperty(performance,'now',{value:()=>clock});
 const phase=location.hash.slice(1);
 if(phase==='settings'){document.getElementById('scenarioOpen').click();}
 else if(phase==='manual-input') {
  prepareScenario({outs:0,balls:0,strikes:0,first:true,second:false,third:false,run:8,arm:8,kmh:155,
   batterControl:'cpu',runnerControl:'cpu',defenseControl:'player',batterAction:'take',action:'steal',runnerBase:'first',delay:0.2,pitch:'fast',direction:0});
  executeScenario();
  for(let i=0;i<120;i++){clock+=16.667;update(16.667);}
  if(pendingPitch||isPitching||stealState.active) throw Error('Automatic pitch in manual mode');
  window.dispatchEvent(new KeyboardEvent('keydown',{key:'2',code:'Digit2'}));
  window.dispatchEvent(new KeyboardEvent('keyup',{key:'2',code:'Digit2'}));
  for(let i=0;i<400&&!canManualStealCatcherThrow();i++){clock+=16.667;update(16.667);}
  if(!canManualStealCatcherThrow()) throw Error('Catcher not ready');
  window.dispatchEvent(new KeyboardEvent('keydown',{key:'8',code:'Digit8'}));
  window.dispatchEvent(new KeyboardEvent('keyup',{key:'8',code:'Digit8'}));
  if(!stealState.throw||stealState.throw.targetBase!=='second') throw Error('Keyboard throw failed');
  draw();
 }
 else {
  prepareScenario({outs:1,balls:0,strikes:1,first:true,second:false,third:false,run:9,arm:6,kmh:150,
   control:'both',action:'steal',runnerBase:'first',delay:0.2,pitch:'fast',direction:-0.35});
  startPitch('fast');clock+=250;update(16.667);
  clock+=1400;finishPitch('ボール','ball');updateStealState(clock);scenarioObserve();
  handleManualStealCatcherThrow('second');clock=stealState.startTime+(stealState.throw.startTime+stealState.throw.endTime)*500;
  updateStealState(clock);scenarioObserve();draw();
 }
 document.body.dataset.scenarioReady=phase;
},1200));`;
const html=fs.readFileSync(path.join(root,'index.html'),'utf8').replace('<head>','<head><base href="'+pathToFileURL(root+path.sep).href+'">')
 .replace('<script src="script.js">','<script>window.requestAnimationFrame=()=>0;</script><script src="script.js">')
 .replace('</body>','<script>'+setup+'</script></body>');
const fixture=path.join(out,'fixture.html');fs.writeFileSync(fixture,html);
for(const phase of ['settings','play','manual-input']){
 const screenshot=path.join(out,phase+'.png');
 const result=spawnSync('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless','--disable-gpu','--no-first-run',
  '--allow-file-access-from-files','--hide-scrollbars','--window-size=1500,1100','--user-data-dir='+path.join(out,'profile'),
  '--virtual-time-budget=4000','--dump-dom','--screenshot='+screenshot,pathToFileURL(fixture).href+'#'+phase],
  {windowsHide:true,timeout:30000,encoding:'utf8'});
 if(result.status!==0||!result.stdout.includes('data-scenario-ready="'+phase+'"'))throw new Error(result.stderr+'\n'+result.stdout.slice(-2000));
 console.log(screenshot);
}
