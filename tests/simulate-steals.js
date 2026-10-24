// node tests/simulate-steals.js — game functions, deterministic timing samples.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const harness = fs.readFileSync(path.join(__dirname, 'baserunning.js'), 'utf8').split('const unit = createGameContext();')[0];
const createContext = new Function('require', '__dirname', harness + '\nreturn createGameContext;')(require, __dirname);
const context = createContext(20261024);
const result = vm.runInContext(`(() => {
  startGame(); gameMode = 'versus'; resetBall();
  const samples = 10000;
  const scenarios = [];
  // Use identical timing/speed samples for every ability combination.
  const draws = Array.from({length:samples}, () => ({jump:Math.random()*0.5, speed:0.9+Math.random()*0.2}));
  let catcherArm = 6;
  getTeamCatcherArm = () => catcherArm;
  const rows = [];
  for (const type of ['fast','normal','slow']) for (const rank of ['good','bad']) {
    const pitch = pitchTypes[type];
    for (const run of [7,8,9,10]) for (const arm of [6,7,8,9]) {
      catcherArm = arm;
      let successes=0, minMargin=Infinity, maxMargin=-Infinity;
      const buckets = [0,0,0,0,0], totals = [0,0,0,0,0];
      let arrival, throwArrival;
      for (const draw of draws) {
        const speedKmh = Math.round(150 * pitch.baseKmhFactor * draw.speed);
        const speed = 8.05 * pitch.speedFactor * (speedKmh/(150*pitch.baseKmhFactor)) * actualPitchSpeedBoost;
        // 60 Hz: release, whole ball past back edge, 100 ms grace, then steal update.
        const crossingFrames = Math.floor((getHomePlateBottomY()+getPitchRadius(type)-(pitcher.y+96))/speed)+1;
        const caught = (Math.ceil(pitchWindupDuration/(1000/60))+crossingFrames+6)/60;
        const start = performance.now();
        currentPitchType = type;
        beginStealAttempt({startBase:'first',targetBase:'second',runner:{id:'simulation',run},pitchType:type},start);
        stealState.plateReached = true;
        handleStealDefenseThrow('second', start+(caught-draw.jump)*1000, {
          manual:true, timingRank:rank,
          throwSpeedScale:rank==='good'?catcherStealThrowTiming.goodSpeedScale:catcherStealThrowTiming.badSpeedScale
        });
        const safe = stealState.throw.safe;
        successes += Number(safe);
        arrival = stealState.arrivalTime;
        throwArrival = stealState.throw.endTime-(caught-draw.jump);
        const margin = stealState.throw.endTime+0.12-arrival;
        minMargin=Math.min(minMargin,margin);maxMargin=Math.max(maxMargin,margin);
        const bucket=Math.min(4,Math.floor(draw.jump/0.1));totals[bucket]++;buckets[bucket]+=Number(safe);
      }
      rows.push({pitch:type,throw:rank,run,arm,n:samples,successes,rate:successes/samples*100,
        runnerSeconds:arrival,catcherToBaseSeconds:throwArrival,minMargin,maxMargin,
        jumpBins:buckets.map((n,i)=>({from:i/10,to:(i+1)/10,n:totals[i],rate:n/totals[i]*100}))});
    }
  }
  // 肩が低い場合も、好送球が遅い送球より遅くならないことを確認。
  for (const target of ['first','second','third']) for (let arm=1;arm<=15;arm++) {
    catcherArm=arm;
    const times=['perfect','good','bad'].map(rank=>{
      beginStealAttempt({startBase:'first',targetBase:'second',runner:{id:'ordering',run:10}},performance.now());
      stealState.plateReached=true;
      handleStealDefenseThrow(target,performance.now(),{manual:true,timingRank:rank,
        throwSpeedScale:catcherStealThrowTiming[rank+'SpeedScale']});
      return stealState.throw.endTime;
    });
    if (!(times[0]<=times[1] && times[1]<=times[2])) throw new Error('送球性能が逆転: '+target+' arm='+arm);
  }
  return {seed:20261024,samplesPerCombination:samples,totalTrials:rows.length*samples,
    conditions:{base:'first to second',fastKmh:150,pitchSpeedRandom:'0.9–1.1, rounded km/h',
      jumpSeconds:'uniform 0–0.5 after motion starts',catcherInputDelay:0,judgmentGraceSeconds:0.1,frameRate:60,catchPoint:'whole ball past plate back edge',
      swingMiss:false,pitchMovement:false,pickoff:false,return:false,injuryOrBoost:false},rows};
})()`, context, {timeout:120000});
const output = path.join(__dirname,'..','analysis');fs.mkdirSync(output,{recursive:true});
fs.writeFileSync(path.join(output,'steal-simulation.json'),JSON.stringify(result,null,2));
fs.writeFileSync(path.join(output,'steal-simulation.csv'),'pitch,throw,run,arm,trials,successes,success_percent,runner_seconds,catcher_to_base_seconds\n'+
 result.rows.map(r=>[r.pitch,r.throw,r.run,r.arm,r.n,r.successes,r.rate.toFixed(2),r.runnerSeconds.toFixed(4),r.catcherToBaseSeconds.toFixed(4)].join(',')).join('\n'));
console.log(JSON.stringify(result));
