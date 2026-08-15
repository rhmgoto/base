const canvas = byId("gameCanvas");
const ctx = canvas.getContext("2d");

function byId(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Missing required DOM element: #${id}`);
  }
  return element;
}

const shell = document.querySelector(".game-shell");
const menu = byId("startMenu");
const menuButton = byId("menuButton");
const startButton = byId("startButton");
const practiceStartButton = byId("practiceStartButton");
const pitchingPracticeStartButton = byId("pitchingPracticeStartButton");
const homeRunDerbyStartButton = byId("homeRunDerbyStartButton");
const soundToggleButton = byId("soundToggleButton");
const bgmToggleButton = byId("bgmToggleButton");
const menuSoundToggleButton = byId("menuSoundToggleButton");
const menuBgmToggleButton = byId("menuBgmToggleButton");
const soundToggleButtons = [soundToggleButton, menuSoundToggleButton].filter(Boolean);
const bgmToggleButtons = [bgmToggleButton, menuBgmToggleButton].filter(Boolean);
const playerEditorButton = null;
const playerEditor = null;
const playerEditorTitle = null;
const playerEditorClose = null;
const playerEditorKind = null;
const playerEditorList = null;
const playerEditorForm = null;
const playerEditorNewButton = null;
const playerEditorResetButton = null;
const playerEditorStatus = null;
const awayPitcherPointStatus = byId("awayPitcherPointStatus");
const awayFielderPointStatus = byId("awayFielderPointStatus");
const homePitcherPointStatus = byId("homePitcherPointStatus");
const homeFielderPointStatus = byId("homeFielderPointStatus");
const playerChooser = byId("playerChooser");
const chooserTitle = byId("chooserTitle");
const chooserOptions = byId("chooserOptions");
const chooserClose = byId("chooserClose");
const chooserTitleHome = byId("chooserTitleHome");
const chooserOptionsHome = byId("chooserOptionsHome");
const chooserCloseHome = byId("chooserCloseHome");
const pitcherChangeControls = byId("pitcherChangeControls");
const modeSelect = byId("modeSelect");
const firstBatSelect = byId("firstBatSelect");
const inningsSelect = byId("inningsSelect");
const stadiumSelect = byId("stadiumSelect");
const p1DefenseSelect = byId("p1DefenseSelect");
const p2DefenseSelect = byId("p2DefenseSelect");
const awayPresetSelect = byId("awayPresetSelect");
const homePresetSelect = byId("homePresetSelect");
const practicePitcherControlSelect = byId("practicePitcherControlSelect");
const practicePitcherTypeSelect = byId("practicePitcherTypeSelect");
const pitchingPracticeBatterTypeSelect = byId("pitchingPracticeBatterTypeSelect");
const practiceBatterSelect = byId("practiceBatterSelect");
const practicePitcherSelect = byId("practicePitcherSelect");
const homeRunDerbyPlayerCountSelect = byId("homeRunDerbyPlayerCountSelect");
const homeRunDerbyAwayBatterSelect = byId("homeRunDerbyAwayBatterSelect");
const homeRunDerbyHomeBatterSelect = byId("homeRunDerbyHomeBatterSelect");
const menuPlayerCards = Array.from(document.querySelectorAll(".menu-player-card"));
const awayBatterSSName = byId("awayBatterSSName");
const awayBatter2BName = byId("awayBatter2BName");
const awayBatterLName = byId("awayBatterLName");
const awayBatterCName = byId("awayBatterCName");
const awayBatterRName = byId("awayBatterRName");
const awayBatterCAName = byId("awayBatterCAName");
const awayBatterDHName = byId("awayBatterDHName");
const awayBench1Name = byId("awayBench1Name");
const awayBench2Name = byId("awayBench2Name");
const awayBench3Name = byId("awayBench3Name");
const homeBatterSSName = byId("homeBatterSSName");
const homeBatter2BName = byId("homeBatter2BName");
const homeBatterLName = byId("homeBatterLName");
const homeBatterCName = byId("homeBatterCName");
const homeBatterRName = byId("homeBatterRName");
const homeBatterCAName = byId("homeBatterCAName");
const homeBatterDHName = byId("homeBatterDHName");
const homeBench1Name = byId("homeBench1Name");
const homeBench2Name = byId("homeBench2Name");
const homeBench3Name = byId("homeBench3Name");
const awayPitcherName = byId("awayPitcherName");
const awayPitcher2Name = byId("awayPitcher2Name");
const awayPitcher3Name = byId("awayPitcher3Name");
const awayPitcher4Name = byId("awayPitcher4Name");
const awayPitcher5Name = byId("awayPitcher5Name");
const homePitcherName = byId("homePitcherName");
const homePitcher2Name = byId("homePitcher2Name");
const homePitcher3Name = byId("homePitcher3Name");
const homePitcher4Name = byId("homePitcher4Name");
const homePitcher5Name = byId("homePitcher5Name");
const awayBatterSSStats = byId("awayBatterSSStats");
const awayBatter2BStats = byId("awayBatter2BStats");
const awayBatterLStats = byId("awayBatterLStats");
const awayBatterCStats = byId("awayBatterCStats");
const awayBatterRStats = byId("awayBatterRStats");
const awayBatterCAStats = byId("awayBatterCAStats");
const awayBatterDHStats = byId("awayBatterDHStats");
const awayBench1Stats = byId("awayBench1Stats");
const awayBench2Stats = byId("awayBench2Stats");
const awayBench3Stats = byId("awayBench3Stats");
const homeBatterSSStats = byId("homeBatterSSStats");
const homeBatter2BStats = byId("homeBatter2BStats");
const homeBatterLStats = byId("homeBatterLStats");
const homeBatterCStats = byId("homeBatterCStats");
const homeBatterRStats = byId("homeBatterRStats");
const homeBatterCAStats = byId("homeBatterCAStats");
const homeBatterDHStats = byId("homeBatterDHStats");
const homeBench1Stats = byId("homeBench1Stats");
const homeBench2Stats = byId("homeBench2Stats");
const homeBench3Stats = byId("homeBench3Stats");
const awayPitcherStats = byId("awayPitcherStats");
const awayPitcher2Stats = byId("awayPitcher2Stats");
const awayPitcher3Stats = byId("awayPitcher3Stats");
const awayPitcher4Stats = byId("awayPitcher4Stats");
const awayPitcher5Stats = byId("awayPitcher5Stats");
const homePitcherStats = byId("homePitcherStats");
const homePitcher2Stats = byId("homePitcher2Stats");
const homePitcher3Stats = byId("homePitcher3Stats");
const homePitcher4Stats = byId("homePitcher4Stats");
const homePitcher5Stats = byId("homePitcher5Stats");
const awayTeamAutoButton = byId("awayTeamAutoButton");
const homeTeamAutoButton = byId("homeTeamAutoButton");
const awayTeamResetButton = byId("awayTeamResetButton");
const homeTeamResetButton = byId("homeTeamResetButton");
const activeBatterName = byId("activeBatterName");
const activePitcherName = byId("activePitcherName");
const activeBatterStats = byId("activeBatterStats");
const activePitcherStats = byId("activePitcherStats");

const field = {
  centerX: canvas.width / 2,
  moundY: 72,
  plateY: 746,
  plateX: canvas.width / 2,
  plateScale: 1.3,
  strikeZoneTop: 702,
  strikeZoneBottom: 756,
  strikeZoneWidth: 72,
  rightBox: { left: 452, right: 585, top: 649, bottom: 802 },
  leftBox: { left: 695, right: 828, top: 649, bottom: 802 }
};

const batterMoveTuning = {
  plateSideGap: 46,
  moundSideShrink: (42 * field.plateScale) / 3,
  horizontalRangeScale: 0.5,
  plateSideNudge: 10,
  cpuPlateSideNudge: 13,
  cpuPitchSideMoveScale: 0.34,
  cpuSlowPitchMoveBonus: 0.24,
  cpuPitchSideMoveSpeed: 3.8,
  plateSideExtraReach: 18,
  plateSideSafetyBallRadiusScale: 1,
  // ボール1個分 (直径 = 半径×2) ごとに2を足す。これまでよりベース寄りに立てるようにする追加分。
  // 4 (ボール2個分) からボール2個分 (4) 減らして 0 (追加分なし、元の基準に戻す)。
  plateSideExtraBallReach: 0,
  // ベースと反対側 (外側) に立てる幅の追加分。単位は plateSideExtraBallReach と同じ (ボール半径の倍数)。
  // 4 = ボール2個分。
  awaySideExtraBallReach: 4,
  shoeLimitOffsetY: -12,
  keyboardMoveSpeed: 5.2
};

// CPU打者の「球の見極め」と「バットの追従」をまとめた調整値。
// 以前は遅い球かどうか (slowPitchScore) が見極めにも追従にも掛け算で入っていたため、
// 速球や決め球では見極めが完全に消え、隅を突かれるとほぼ空振りになっていた。
const computerBatterTuning = {
  // 球速による読み取りやすさ。readSpeedEasyKmh 以下で 1、readSpeedHardKmh 以上で下限まで落ちる。
  readSpeedEasyKmh: 118,
  readSpeedHardKmh: 168,
  // 速球でも読み取りが 0 にならないようにする下限。0 にすると従来の挙動に戻る。
  pitchReadFloor: 0.42,
  // ストライクの確信度が 0 になるまでの、ゾーンからの距離。
  // 以前は 32 + meet*3.4 (ミート8で約59) と広すぎ、ゾーンから20離れた球でも確信度が
  // 0.68 になっていた。そのため下の見送りゲートが一度も働かず、CPUは何でも振っていた。
  strikeConfidenceTolerance: 8,
  strikeConfidenceMeetScale: 1,
  // 手元まで引きつけたときの読み。ベースの左右からどれだけ外れて見えるかで評価する。
  // 以前は本塁までの2D距離を見ていたが、振り始めを早めた結果この距離は「残りの飛行距離」に
  // 支配されるようになり、常に0になって「引きつけて見極める」判断が死んでいた。
  lateReadTolerance: 26,
  lateReadMeetScale: 2.2,
  lateReadWeight: 0.3,
  // 変化の大きい球ほど「ストライクだ」と確信できない。許容幅をこの割合まで狭める。
  breakFullPressure: 2.6,
  breakToleranceDrop: 0.42,
  // 変化量をどれだけ正確に読めるか。1 で正確、小さいほど曲がりを小さく見積もって引っかかる。
  curveReadLow: 0.5,
  curveReadHigh: 0.92,
  // 確信度がこれを下回ると原則見送る (それでも chaseChance の分だけは手を出す)。
  chaseGateConfidence: 0.46,
  // 見送るべき球につい手を出す割合。0 にすると完璧に見極めてしまい面白くない。
  // ゲートに近い球ほど誘われ、明らかなボール球にはほとんど手を出さないようにする。
  chaseChanceScale: 1,
  chaseChanceBase: 0.08,
  chaseChanceLowMeetBonus: 0.16,
  chaseTemptationExponent: 2.6,
  // 振ると決めたときに実際に振る確率。確信度が低いほど下がる。
  // exponent を大きくすると、確信の低い球 (＝際どいボール) だけが選択的に減る。
  swingChanceBase: 0.08,
  swingChanceConfidenceScale: 0.92,
  swingChanceExponent: 3.2,
  // スイングを始める投球進行度。startSwing からバットが出るまでに時間がかかるので、
  // 本塁到達 (1.0) より手前で振り始めないと間に合わない。
  // 以前は 0.92 を中心にしていたが、実測ではその帯の空振り率が82%と最悪だった。
  swingWindowStart: 0.58,
  swingWindowEnd: 1.08,
  swingTimingCenter: 0.7,
  // 振り始めのばらつき。大きいほど空振りが増える。
  swingTimingJitter: 0.1,
  // ミートが高い打者ほどばらつきを抑える。1 でミート最大時にばらつき0。
  swingTimingJitterMeetScale: 0.6,
  // ミートが高い打者ほど中心に寄せる (低い打者は遅れて振る)。
  swingTimingMeetShift: 0.05,
  // 予測到達点がゾーンからこれだけ外れていれば「ボール」と確信できる。
  zoneExitFullRead: 26,
  // ゾーンから逃げていく量。方向は問わない (外角に限らず内角や落ちる球も対象)。
  escapeFullRead: 26,
  // 逃げる球でなくても、ゾーンを外れる見込みならある程度は見送る。
  escapeBaseWeight: 0.55,
  // バットが左右に追従できる幅。ストライクゾーン幅は 72 なので、隅に届くにはこの程度が要る。
  horizontalReach: 46,
  horizontalMeetBonus: 18
};

// 球速から「どれだけ球種・コースを読めるか」を出す。1 で完全に読める。
function getComputerPitchReadScore() {
  const speedRead = Number.isFinite(currentPitchSpeedKmh)
    ? clamp(
        (computerBatterTuning.readSpeedHardKmh - currentPitchSpeedKmh)
          / Math.max(1, computerBatterTuning.readSpeedHardKmh - computerBatterTuning.readSpeedEasyKmh),
        0,
        1
      )
    : 0;
  const slowPitchRead = Math.max(currentPitchType === "slow" ? 1 : 0, speedRead);
  return clamp(
    computerBatterTuning.pitchReadFloor + slowPitchRead * (1 - computerBatterTuning.pitchReadFloor),
    0,
    1
  );
}

// ストライクだが黄色ゾーンの外 (ベースをかすめる際どいコース) の接触判定。
// ここだけ届く範囲が狭く、空振りが多くなりすぎていた。
// reachBonus を大きくすると空振りが減るが、この帯は quality の減点が大きいので
// 増えた接触はヒットではなくファウルや凡打になる。
const edgeStrikeContactTuning = {
  // 36 (元) → 68。ベースをかすめる球の空振りが多すぎたので届く範囲を広げる。
  reachBonus: 68,
  meetScale: 0.4,
  // 広げる前の基準。reachBonus をこれより大きくした分が「広げた帯」になる。
  referenceReachBonus: 36,
  // 広げた帯に頼って当てた打球をファウルにする確率。
  // この帯の quality はもともと0付近まで落ちていて減点しても効かないので、
  // 「空振りをファウルに変える」ことで安打が増えないようにする。
  // 1 を超える値にすると、帯の浅いところで当てた打球もほぼ確実にファウルになる。
  extendedFoulChance: 2,
  // ファウルにならなかった打球も、詰まった当たりにして安打になりにくくする。
  extendedPowerDrop: 0.6,
  extendedLaunchAngleCap: 10
};

// 球種ごとのコントロールの難しさ。コーナーを狙ったときの散らばりにだけ掛ける。
// 以前はコーナー狙いで球種の差がまったく出ず、外角の速球が決まりすぎていた。
// 真ん中に投げるときのばらつき (pitchTypes の targetSpread) には影響しない。
const pitchControlTuning = {
  typeSpreadMultiplier: { slow: 1, normal: 1, fast: 1.3, special: 1 }
};

const showHbpHitBox = false;

const batters = [
  { id: "otani", name: "オオタニ", bats: "L", power: 9, meet: 8, run: 9, infieldDefense: 4, outfieldDefense: 9, arm: 9, cost: 9 },
  { id: "ichiro", name: "イチロー", bats: "L", power: 4, meet: 20, run: 10, infieldDefense: 3, outfieldDefense: 11, arm: 11, cost: 28 },
  { id: "sato", name: "サトウ", bats: "L", power: 6, meet: 5, run: 4, infieldDefense: 4, outfieldDefense: 4, arm: 6, cost: 5 },
  { id: "freeman", name: "フリーマン", bats: "L", power: 6, meet: 9, run: 6, infieldDefense: 7, outfieldDefense: 2, arm: 7, cost: 6 },
  { id: "schwarber", name: "シュワバー", bats: "L", power: 10, meet: 1, run: 3, infieldDefense: 1, outfieldDefense: 2, arm: 2, cost: 5 },
  { id: "shuto", name: "シュウトウ", bats: "L", power: 2, meet: 4, run: 10, infieldDefense: 3, outfieldDefense: 8, arm: 7, cost: 5 },
  { id: "shinjo", name: "シンジョウ", bats: "R", power: 4, meet: 3, run: 6, infieldDefense: 3, outfieldDefense: 10, arm: 10, cost: 4 },
  { id: "suzuki", name: "スズキ", bats: "R", power: 6, meet: 5, run: 6, infieldDefense: 3, outfieldDefense: 5, arm: 7, cost: 5 },
  { id: "trout", name: "トラウト", bats: "R", power: 7, meet: 6, run: 6, infieldDefense: 3, outfieldDefense: 6, arm: 5, cost: 6 },
  { id: "judge", name: "ジャッジ", bats: "R", power: 10, meet: 8, run: 5, infieldDefense: 3, outfieldDefense: 5, arm: 5, cost: 9 },
  { id: "ruth", name: "ルース", bats: "R", power: 20, meet: 15, run: 6, infieldDefense: 3, outfieldDefense: 4, arm: 4, cost: 30 },
  { id: "kimhyesong", name: "キムヘソン", bats: "L", power: 4, meet: 4, run: 5, infieldDefense: 5, outfieldDefense: 5, arm: 5, cost: 3 },
  { id: "betts", name: "ベッツ", bats: "R", power: 7, meet: 5, run: 6, infieldDefense: 8, outfieldDefense: 8, arm: 8, cost: 5 },
  { id: "okamoto", name: "オカモト", bats: "R", power: 5, meet: 5, run: 6, infieldDefense: 6, outfieldDefense: 5, arm: 7, cost: 5 },
  { id: "murakami", name: "ムラカミ", bats: "L", power: 7, meet: 4, run: 3, infieldDefense: 3, outfieldDefense: 2, arm: 3, cost: 5 },
  { id: "nagashima", name: "ナガシマ", bats: "R", power: 15, meet: 13, run: 8, infieldDefense: 11, outfieldDefense: 2, arm: 11, cost: 25 },
  { id: "leejunghoo", name: "イジョンフ", bats: "L", power: 4, meet: 7, run: 5, infieldDefense: 2, outfieldDefense: 6, arm: 6, cost: 5 },
  { id: "rodgers", name: "ロジャース", bats: "R", power: 6, meet: 1, run: 3, infieldDefense: 3, outfieldDefense: 3, arm: 6, cost: 3 },
  { id: "harper", name: "ハーパー", bats: "L", power: 8, meet: 6, run: 6, infieldDefense: 5, outfieldDefense: 5, arm: 7, cost: 8 },
  { id: "arraez", name: "アラエス", bats: "L", power: 1, meet: 10, run: 5, infieldDefense: 3, outfieldDefense: 2, arm: 5, cost: 5 },
  { id: "wittjr", name: "ウィットJr．", bats: "R", power: 6, meet: 5, run: 9, infieldDefense: 8, outfieldDefense: 4, arm: 7, cost: 7 },
  { id: "goldschmidt", name: "ゴールドシュミット", bats: "R", power: 7, meet: 6, run: 6, infieldDefense: 6, outfieldDefense: 2, arm: 6, cost: 6 },
  { id: "bonds", name: "ボンズ", bats: "L", power: 19, meet: 14, run: 8, infieldDefense: 3, outfieldDefense: 10, arm: 10, cost: 28 },
  { id: "outman", name: "アウトマン", bats: "L", power: 6, meet: 2, run: 5, infieldDefense: 3, outfieldDefense: 7, arm: 7, cost: 4 },
  { id: "jones", name: "ジョーンズ", bats: "R", power: 6, meet: 2, run: 3, infieldDefense: 1, outfieldDefense: 2, arm: 2, cost: 2 },
  { id: "greene", name: "グリーン", bats: "L", power: 5, meet: 6, run: 4, infieldDefense: 3, outfieldDefense: 7, arm: 6, cost: 5 },
  { id: "sadaharu", name: "サダハル", bats: "L", power: 20, meet: 11, run: 5, infieldDefense: 6, outfieldDefense: 2, arm: 7, cost: 25 },
  { id: "carpenter", name: "カーペンター", bats: "L", power: 6, meet: 6, run: 4, infieldDefense: 1, outfieldDefense: 3, arm: 4, cost: 4 },
  { id: "tucker", name: "タッカー", bats: "L", power: 6, meet: 5, run: 7, infieldDefense: 2, outfieldDefense: 6, arm: 7, cost: 5 },
  { id: "mcgonigle", name: "マクゴニグル", bats: "L", power: 4, meet: 7, run: 6, infieldDefense: 4, outfieldDefense: 2, arm: 6, cost: 5 },
  { id: "torkelson", name: "トーケルソン", bats: "R", power: 6, meet: 3, run: 4, infieldDefense: 4, outfieldDefense: 2, arm: 3, cost: 4 },
  { id: "acunajr", name: "アクーニャJr.", bats: "R", power: 6, meet: 6, run: 10, infieldDefense: 2, outfieldDefense: 3, arm: 8, cost: 7 },
  { id: "ydiaz", name: "Y.ディアス", bats: "R", power: 5, meet: 7, run: 4, infieldDefense: 1, outfieldDefense: 2, arm: 3, cost: 5 },
  { id: "rose", name: "ローズ", bats: "S", power: 4, meet: 20, run: 6, infieldDefense: 8, outfieldDefense: 8, arm: 8, cost: 26 },
  { id: "henderson", name: "ヘンダーソン", bats: "R", power: 4, meet: 18, run: 20, infieldDefense: 3, outfieldDefense: 8, arm: 7, cost: 24 },
  { id: "yoshida", name: "ヨシダ", bats: "L", power: 3, meet: 7, run: 4, infieldDefense: 1, outfieldDefense: 3, arm: 4, cost: 4 },
  { id: "zaiahope", name: "ザイア・ホープ", bats: "L", power: 4, meet: 3, run: 7, infieldDefense: 3, outfieldDefense: 6, arm: 6, cost: 4 },
  { id: "alvarez", name: "アルバレス", bats: "L", power: 8, meet: 9, run: 3, infieldDefense: 1, outfieldDefense: 1, arm: 2, cost: 6 },
  { id: "caminero", name: "カミネロ", bats: "R", power: 8, meet: 6, run: 4, infieldDefense: 4, outfieldDefense: 2, arm: 6, cost: 7 },
  { id: "pca", name: "PCA", bats: "L", power: 7, meet: 7, run: 9, infieldDefense: 4, outfieldDefense: 9, arm: 9, cost: 8 }
];

const catchers = [
  { id: "calraleigh", name: "カル・ローリー", bats: "R", power: 6, meet: 2, run: 3, arm: 8, cost: 5 },
  { id: "willsmith", name: "ウィル・スミス", bats: "R", power: 5, meet: 7, run: 6, arm: 8, cost: 6 },
  { id: "nomura", name: "ノムラ", bats: "R", power: 15, meet: 12, run: 5, arm: 13, cost: 27 },
  { id: "kaicannon", name: "カイキャノン", bats: "R", power: 3, meet: 4, run: 4, arm: 10, cost: 4 },
  { id: "dingler", name: "ディングラー", bats: "R", power: 7, meet: 6, run: 3, arm: 9, cost: 7 },
  { id: "rodgers", name: "ロジャース", bats: "R", power: 6, meet: 1, run: 3, arm: 7, cost: 3 },
  { id: "johnnybench", name: "ジョニーベンチ", bats: "R", power: 17, meet: 14, run: 5, arm: 15, cost: 29 },
  { id: "rushing", name: "ラッシング", bats: "L", power: 6, meet: 3, run: 3, arm: 6, cost: 4 },
  { id: "wakatsuki", name: "ワカツキ", bats: "R", power: 3, meet: 3, run: 3, arm: 5, cost: 2 }
];

const pitchers = [
  { id: "shohei", name: "ショウヘイ", throws: "R", fastKmh: 165, rightBreak: 9, leftBreak: 5, slowChange: 8, fastChange: 8, control: 6, stuff: 8, fielding: 7, stamina: 6, cost: 9 },
  { id: "yamamoto", name: "ヤマモト", throws: "R", fastKmh: 157, rightBreak: 8, leftBreak: 3, slowChange: 7, fastChange: 7, control: 9, stuff: 7, fielding: 6, stamina: 7, cost: 8 },
  { id: "saiki", name: "サイキ", throws: "R", fastKmh: 155, rightBreak: 5, leftBreak: 2, slowChange: 10, fastChange: 6, control: 6, stuff: 6, fielding: 5, stamina: 7, cost: 6 },
  { id: "kershaw", name: "カーショウ", throws: "L", fastKmh: 148, rightBreak: 4, leftBreak: 10, slowChange: 6, fastChange: 4, control: 8, stuff: 5, fielding: 4, stamina: 5, cost: 6 },
  { id: "hikari", name: "ヒカリ", throws: "L", fastKmh: 220, rightBreak: 1, leftBreak: 1, slowChange: 9, fastChange: 1, control: 3, stuff: 6, fielding: 4, stamina: 6, cost: 5 },
  { id: "magari", name: "マガリ", throws: "R", fastKmh: 100, rightBreak: 9, leftBreak: 9, slowChange: 9, fastChange: 9, control: 9, stuff: 6, fielding: 8, stamina: 4, cost: 5 },
  { id: "imanaga", name: "イマナガ", throws: "L", fastKmh: 149, rightBreak: 3, leftBreak: 6, slowChange: 5, fastChange: 10, control: 5, stuff: 8, fielding: 5, stamina: 6, cost: 6 },
  { id: "darvish", name: "ダルビッシュ", throws: "R", fastKmh: 158, rightBreak: 9, leftBreak: 8, slowChange: 6, fastChange: 5, control: 7, stuff: 4, fielding: 5, stamina: 5, cost: 6 },
  { id: "sawamura", name: "サワムラ", throws: "R", fastKmh: 172, rightBreak: 17, leftBreak: 16, slowChange: 24, fastChange: 17, control: 25, stuff: 32, fielding: 7, stamina: 16, cost: 30 },
  { id: "miller", name: "ミラー", throws: "R", fastKmh: 171, rightBreak: 8, leftBreak: 6, slowChange: 8, fastChange: 3, control: 8, stuff: 14, fielding: 6, stamina: 3, cost: 4 },
  { id: "ootake", name: "オオタケ", throws: "L", fastKmh: 143, rightBreak: 4, leftBreak: 4, slowChange: 5, fastChange: 5, control: 10, stuff: 7, fielding: 8, stamina: 6, cost: 6 },
  { id: "misiorowski", name: "ミジオロスキー", throws: "R", fastKmh: 169, rightBreak: 7, leftBreak: 4, slowChange: 5, fastChange: 9, control: 5, stuff: 9, fielding: 4, stamina: 7, cost: 8 },
  { id: "hanifee", name: "ハニフィー", throws: "R", fastKmh: 156, rightBreak: 2, leftBreak: 10, slowChange: 2, fastChange: 2, control: 5, stuff: 2, fielding: 5, stamina: 3, cost: 1 },
  { id: "sugiyama", name: "スギヤマ", throws: "R", fastKmh: 158, rightBreak: 2, leftBreak: 1, slowChange: 9, fastChange: 7, control: 3, stuff: 9, fielding: 3, stamina: 3, cost: 3 },
  { id: "sasaki", name: "ササキ", throws: "R", fastKmh: 165, rightBreak: 5, leftBreak: 2, slowChange: 6, fastChange: 4, control: 4, stuff: 7, fielding: 4, stamina: 5, cost: 6 },
  { id: "matsui", name: "マツイ", throws: "L", fastKmh: 150, rightBreak: 2, leftBreak: 5, slowChange: 5, fastChange: 5, control: 5, stuff: 5, fielding: 5, stamina: 3, cost: 3 },
  { id: "rodgers", name: "ロジャース", throws: "R", fastKmh: 125, rightBreak: 2, leftBreak: 2, slowChange: 3, fastChange: 1, control: 3, stuff: 3, fielding: 3, stamina: 3, cost: 3 },
  { id: "fujinami", name: "フジナミ", throws: "R", fastKmh: 159, rightBreak: 7, leftBreak: 3, slowChange: 5, fastChange: 5, control: 0, stuff: 9, fielding: 3, stamina: 6, cost: 5 },
  { id: "skubal", name: "スクバル", throws: "L", fastKmh: 164, rightBreak: 6, leftBreak: 8, slowChange: 8, fastChange: 6, control: 6, stuff: 8, fielding: 5, stamina: 7, cost: 8 },
  { id: "ashby", name: "アシュビー", throws: "L", fastKmh: 157, rightBreak: 4, leftBreak: 6, slowChange: 4, fastChange: 4, control: 4, stuff: 5, fielding: 5, stamina: 4, cost: 3 },
  { id: "melton", name: "メルトン", throws: "R", fastKmh: 155, rightBreak: 4, leftBreak: 3, slowChange: 8, fastChange: 3, control: 9, stuff: 5, fielding: 8, stamina: 6, cost: 6 },
  { id: "cyyoung", name: "サイヤング", throws: "R", fastKmh: 175, rightBreak: 18, leftBreak: 17, slowChange: 27, fastChange: 17, control: 27, stuff: 33, fielding: 7, stamina: 16, cost: 32 },
  { id: "maddux", name: "マダックス", throws: "R", fastKmh: 155, rightBreak: 22, leftBreak: 20, slowChange: 29, fastChange: 18, control: 29, stuff: 32, fielding: 7, stamina: 15, cost: 32 },
  { id: "phillips", name: "フィリップス", throws: "R", fastKmh: 158, rightBreak: 7, leftBreak: 3, slowChange: 3, fastChange: 3, control: 4, stuff: 6, fielding: 5, stamina: 3, cost: 3 },
  { id: "yamaoka", name: "ヤマオカ", throws: "R", fastKmh: 145, rightBreak: 7, leftBreak: 3, slowChange: 9, fastChange: 7, control: 8, stuff: 8, fielding: 6, stamina: 7, cost: 6 },
  { id: "ediaz", name: "E.ディアス", throws: "R", fastKmh: 164, rightBreak: 8, leftBreak: 1, slowChange: 4, fastChange: 9, control: 8, stuff: 15, fielding: 6, stamina: 3, cost: 4 },
  { id: "jansen", name: "ジャンセン", throws: "R", fastKmh: 161, rightBreak: 9, leftBreak: 7, slowChange: 3, fastChange: 6, control: 9, stuff: 13, fielding: 5, stamina: 3, cost: 4 },
  { id: "rojas", name: "ロハス", throws: "R", fastKmh: 77, rightBreak: 3, leftBreak: 1, slowChange: 3, fastChange: 1, control: 6, stuff: 2, fielding: 3, stamina: 3, cost: 1 },
  { id: "summers", name: "サマーズ", throws: "L", fastKmh: 152, rightBreak: 2, leftBreak: 4, slowChange: 4, fastChange: 2, control: 3, stuff: 3, fielding: 4, stamina: 3, cost: 1 },
  { id: "enriquez", name: "エンリケス", throws: "R", fastKmh: 166, rightBreak: 3, leftBreak: 2, slowChange: 2, fastChange: 4, control: 3, stuff: 6, fielding: 3, stamina: 3, cost: 1 },
  { id: "glasnow", name: "グラスノー", throws: "R", fastKmh: 158, rightBreak: 8, leftBreak: 3, slowChange: 8, fastChange: 4, control: 3, stuff: 7, fielding: 7, stamina: 6, cost: 6 },
  { id: "robleski", name: "ロブレスキー", throws: "L", fastKmh: 156, rightBreak: 3, leftBreak: 6, slowChange: 4, fastChange: 3, control: 7, stuff: 4, fielding: 7, stamina: 7, cost: 5 },
  { id: "wheeler", name: "ウィーラー", throws: "R", fastKmh: 159, rightBreak: 8, leftBreak: 8, slowChange: 5, fastChange: 6, control: 6, stuff: 8, fielding: 5, stamina: 7, cost: 7 },
  { id: "valdes", name: "バルデス", throws: "L", fastKmh: 158, rightBreak: 9, leftBreak: 7, slowChange: 7, fastChange: 6, control: 5, stuff: 7, fielding: 4, stamina: 7, cost: 7 },
  { id: "clemens", name: "\u30af\u30ec\u30e1\u30f3\u30b9", throws: "R", fastKmh: 161, rightBreak: 18, leftBreak: 13, slowChange: 32, fastChange: 14, control: 30, stuff: 31, fielding: 7, stamina: 16, cost: 30 },
  { id: "johnson", name: "\u30b8\u30e7\u30f3\u30bd\u30f3", throws: "L", fastKmh: 164, rightBreak: 10, leftBreak: 40, slowChange: 10, fastChange: 17, control: 27, stuff: 33, fielding: 7, stamina: 15, cost: 29 },
  { id: "sabrowski", name: "\u30b5\u30d6\u30ed\u30a6\u30b9\u30ad", throws: "L", fastKmh: 151, rightBreak: 4, leftBreak: 10, slowChange: 10, fastChange: 10, control: 2, stuff: 10, fielding: 4, stamina: 1, cost: 2 },
  { id: "kelly", name: "\u30b1\u30ea\u30fc", throws: "R", fastKmh: 148, rightBreak: 5, leftBreak: 3, slowChange: 5, fastChange: 4, control: 6, stuff: 4, fielding: 5, stamina: 9, cost: 4 },
  { id: "riverryan", name: "リバーライアン", throws: "R", fastKmh: 162, rightBreak: 4, leftBreak: 3, slowChange: 6, fastChange: 6, control: 3, stuff: 8, fielding: 4, stamina: 5, cost: 4 },
  { id: "anderson", name: "アンダーソン", throws: "R", fastKmh: 157, rightBreak: 5, leftBreak: 2, slowChange: 7, fastChange: 5, control: 5, stuff: 6, fielding: 5, stamina: 4, cost: 3 },
  { id: "tscott", name: "T.スコット", throws: "L", fastKmh: 160, rightBreak: 3, leftBreak: 9, slowChange: 3, fastChange: 9, control: 7, stuff: 9, fielding: 7, stamina: 4, cost: 3 },
  { id: "bsmith", name: "B.スミス", throws: "R", fastKmh: 158, rightBreak: 3, leftBreak: 1, slowChange: 8, fastChange: 5, control: 3, stuff: 6, fielding: 4, stamina: 5, cost: 3 }
];

const pitchTypes = {
  normal: { key: "5", label: "直球", speedFactor: 1.15 / 1.4, baseKmhFactor: 0.87, color: "#ffffff", targetSpread: 30, staminaCost: 1.5 },
  slow: { key: "8", label: "遅い球", speedFactor: (1.15 / 1.4) * 0.7, baseKmhFactor: 0.73, color: "#ffe66b", targetSpread: 42, staminaCost: 1 },
  fast: { key: "2", label: "速球", speedFactor: 1.15, baseKmhFactor: 1, color: "#aee7ff", targetSpread: 24, staminaCost: 2 },
  special: { key: "0", label: "決め球", speedFactor: 1.15 * 1.1, baseKmhFactor: 1.1, color: "#ffcf70", targetSpread: 16, staminaCost: 6, stuffMultiplier: 2 }
};

// 表示球速はそのままに、実際の到達時間だけを調整する係数。
const actualPitchSpeedReductionScale = 0.8;
const actualPitchSpeedBoost = 1.265 * 1.15 * 1.15 * 1.1 * 1.3 * 1.2 * actualPitchSpeedReductionScale;
const computerPitchShapeRateScale = 0.9;
const computerPitchStrikeZoneRateScale = 1.42;
const pitcherAbilityTuning = {
  globalMultiplier: 1.1,
  stuffBoost: 0,
  stuffEffectScale: 1.4,
  lowStuffProfileBoost: 0.34,
  insideMishitPenalty: 0.64,
  insideChasePenalty: 0.8,
  insideMishitFloor: 0.36,
  insideChaseFloor: 0.28,
  // 加速する変化球 (fastChange 側) が強すぎるので、加速方向だけ効果を70%に落とす。
  // 減速方向 (slowChange) には掛からない。
  accelerateSpeedChangeScale: 0.7
};
const staminaTuning = {
  pointsPerRating: 18.2,
  cpuAutoChangeThresholdRatio: 0.5,
  pitchCostMultiplier: 0.55,
  horizontalVariationCostRate: 0.1,
  verticalVariationCostRate: 0.2,
  strikeoutRecovery: 2,
  outRecovery: 1,
  sideChangeRecovery: 5,
  runPenalty: 5,
  homerRunPenalty: 7,
  hitPenalty: 3,
  walkPenalty: 3,
  abilityDrops: [
    { threshold: 0.7, multiplier: 1 },
    { threshold: 0.5, multiplier: 0.9 },
    { threshold: 0.3, multiplier: 0.8 },
    { threshold: 0.1, multiplier: 0.7 },
    { threshold: 0.05, multiplier: 0.5 },
    { threshold: 0, multiplier: 0.3 }
  ],
  controlSpreadBonus: 1.15,
  fatigueDriftMax: 44,
  bendExhaustedMultiplier: 0.35,
  speedChangeExhaustedMultiplier: 0.45,
  mistakeChanceMax: 0.1
};
const stealTuning = {
  enabled: true,
  catcherArm: 5,
  catcherReleaseDelaySeconds: 0.3,
  swingMissThrowDelaySeconds: 0.16,
  catcherExchangeSeconds: 0.52,
  catcherThrowBaseSpeed: 760,
  catcherThrowSpeedScale: 0.95,
  manualQuickThrowSpeedScale: 1.18,
  // 球種ごとに走者が稼げるリード秒。
  // 球速の差は「投球が本塁に届くまでの時間」(遅い球0.82秒 / 速球0.41秒) として
  // すでに判定に効いているので、ここで大きな差をつけると二重に不利になる。
  // 以前は速球0.58 / 決め球0.46 まで下げていて、走力10が完璧なスタートを切っても
  // 速球では刺される状態だった。差を薄くして「最高のスタートなら走れる」を残す。
  pitcherTypeLead: {
    slow: 1.1,
    normal: 0.95,
    fast: 0.85,
    special: 0.8
  },
  runSpeedScale: 1.03,
  // 盗塁の到達時間だけ走力差を圧縮する。1 で圧縮なし、小さいほど走力差が縮む。
  // 0.44 で走力1と走力10の二塁到達差が約1.80秒から約1.00秒になる。
  // getRunnerSpeed 自体は変えないので、内野安打や進塁の速さには影響しない。
  runSpeedSpreadScale: 0.44,
  quickJumpLead: 0.24,
  lateJumpPenalty: 0.22,
  // フライングは早ければ早いほど重くする。
  // earlyJumpPenalty が最低保証、そこに早すぎた秒数 × earlyJumpPenaltyPerSecond を足し、
  // maxEarlyJumpPenalty で頭打ちにする。
  earlyJumpPenalty: 0.6,
  earlyJumpPenaltyPerSecond: 0.6,
  maxEarlyJumpPenalty: 1.4
};

// CPUの盗塁。走力の高い走者だけが仕掛ける。
const computerStealTuning = {
  enabled: true,
  // これ未満の走力では仕掛けない
  minRunRating: 7,
  // 走力 minRunRating で baseChance、走力10 で maxChance
  baseChance: 0.16,
  maxChance: 0.42,
  // 三盗は二盗より控えめにする
  thirdBaseChanceScale: 0.45,
  // 2アウトでは仕掛けない (打者に任せる)
  attemptWithTwoOuts: false,
  // 投球動作開始から何秒後にスタートするか。0.18秒以内なら最良のジャンプ、
  // 0.45秒を超えると遅れとしてペナルティがつく (getStealJumpLead)。
  jumpDelayMin: 0.02,
  jumpDelayMax: 0.52
};
const battingFeedbackDisplayPenalty = 0.1;
const battingPracticeHomerBoostMultiplier = 4.2;
const oppositeHandedBattingAdvantageMultiplier = 1.2;
const battingGoodContactZoneScale = 0.9;
const buntTuning = {
  // バントの評価はバットとボールの接触で決める。
  // contactBase は当たりさえすれば得られる下限、contactScale は芯で捉えたときの上積み。
  contactBase: 0.3,
  contactScale: 0.5,
  goodFeedback: 0.45,
  greatFeedback: 0.5,
  solidFeedback: 0.3,
  popupFeedback: 0.3,
  forcePopupFeedback: 0.3,
  goodQuality: 0.68,
  goodTiming: 0.58,
  goodSweetSpot: 0.58,
  goodLineChance: 0.96,
  solidLineChance: 0.2,
  solidPitcherFrontChance: 0.68,
  badLineBase: 0.1,
  badLineQualityScale: 0.32,
  badLineSweetSpotScale: 0.16,
  badLineMin: 0.08,
  badLineMax: 0.48,
  foulBase: 0.1,
  foulQualityScale: 0.3,
  foulTimingScale: 0.09,
  foulBadContactScale: 0.12,
  foulMin: 0.075,
  foulMax: 0.36,
  popupBase: 0.018,
  popupBadContactScale: 0.72,
  popupTimingScale: 0.08,
  popupMin: 0.018,
  popupMax: 0.9,
  forcePopupBadScore: 0.72,
  popupReductionRate: 0.1,
  solidContactQuality: 0.48,
  solidContactTiming: 0.46,
  solidContactSweetSpot: 0.44,
  solidContactPopupReduction: 0.25,
  // 方向入力がないバントはほぼポップフライにする
  noAimPopupChance: 0.92,
  // 方向入力 (スティック) があっても一定確率でポップフライになるようにする追加分。
  aimedPopupBonus: 0.3,
  // 良いバントでもポップフライを完全には免除しない。1 で免除なし、0 で完全免除。
  goodBuntPopupScale: 0.74,
  // 下入力で勢いを殺し、上入力でプッシュ気味に強く出す
  deadenPowerDrop: 0.035,
  pushPowerBonus: 0.075,
  // 横に狙ったバントはファウルラインを切りやすいので、ファウル率の下限と上乗せを別に持つ
  aimedFoulMin: 0.2,
  lateralFoulBonus: 0.2,
  // 打球方向がファウルラインを越えないように角度を抑える割合 (1 でライン上)
  fairAngleMargin: 0.86,
  // バントの転がる距離の倍率。大きくするほど守備が追いつきやすくなる。
  // 1.5 (元) → 2.1 (40%増し) → 3.15 (さらに1.5倍) → 4.0。
  rollDistanceBoost: 4.0
};

// forcedRegardlessOfContact は方向入力なしのバント用。
// 当たりの良し悪しに関係なくポップフライにし、ゴロへの救済も行わない。
// 良いバントは以前ポップフライを完全に免除していたが、それだと狙ったバントが
// 100%ゴロになってしまうので、goodBuntPopupScale をかけて確率を残す。
function resolveBuntPopupOutcome(goodBunt, forcePopup, protectedPopupChance, forcedRegardlessOfContact = false) {
  const popupChance = protectedPopupChance * (goodBunt ? buntTuning.goodBuntPopupScale : 1);
  const popupCandidate = forcedRegardlessOfContact
    || (!goodBunt && forcePopup)
    || Math.random() < popupChance;
  const popupConvertedToPitcherFront = popupCandidate
    && !forcedRegardlessOfContact
    && Math.random() < buntTuning.popupReductionRate;
  return {
    popupCandidate,
    popupConvertedToPitcherFront,
    pitcherBuntPopup: popupCandidate && !popupConvertedToPitcherFront
  };
}

const pitchWindupDuration = 940;
const pitchSpeedChangeLimit = 0.7;
const pitchBendEffect = 1.15;
const pitchSpeedChangeEffect = 1.05 * 1.15;
const maxPitchSpeedChangeAmount = (0.0018 + 10 * 0.00072) * 9 * pitchSpeedChangeEffect;
const batJudgmentSpeedMultiplier = 1.6;
const homeRunFrequencyMultiplier = 1.6;
const powerHitterHomeRunReductionRate = 0.624;
const homeRunPowerTuning = {
  standardCandidateBonusMax: 0.36,
  superCandidateBonusPerPoint: 0.016,
  maxCandidateBonus: 0.89,
  standardMishitRescueMax: 0.08,
  superMishitRescuePerPoint: 0.00625,
  maxMishitRescue: 0.28,
  standardCarryBonusMeters: 10,
  superCarryBonusMetersPerPoint: 1.5,
  cancelledToWallRate: 0.8,
  // 低パワー打者のホームラン候補率を下げるためのペナルティ。
  // ど真ん中をほぼ完璧に捉えた (homeRunGrade≒0.95) ケースで、
  // パワー5で候補率50%・パワー3で30%くらいになるように逆算した値。
  // 旧式 (5-standardPower)/4 は power=5 でペナルティが0になってしまい、
  // 係数をいくら上げても power=5 の確率を下げられなかったため、
  // 「パワーが上がるほど直線的にペナルティが減る」形に変更している。
  lowPowerCandidatePenaltyBase: 0.57,
  lowPowerCandidatePenaltyPerPoint: 0.05,
  // ど真ん中以外はさらにペナルティを強める倍率 (旧式の 0.12/0.06 = 2倍と同じ比率)。
  lowPowerCandidatePenaltyOutsideMultiplier: 2
};
const homeRunVarietyTuning = {
  standardDeepDrivePaceMin: 0.88,
  standardDeepDrivePaceMax: 1.24,
  superDeepDrivePacePerPoint: 0.12,
  maxDeepDrivePace: 2.2,
  lowPowerLinerWallRate: 0.7,
  highPowerLinerWallRate: 0.4,
  lowPowerFlyWallRate: 0.28,
  highPowerFlyWallRate: 0.1
};
const homerToStrongInfieldGrounderRate = 0.16;
const batLengthMultiplier = 0.648 * 0.85 * 0.9;
const batInnerTrimRatio = 0.65 * 1.1;
const batOuterTrimRatio = -0.05;
const batThicknessMultiplier = 1.5;
const meetZoneWidthScale = 0.8;
const sweetSpotWidthScale = 0.85 * 0.8;
const sweetSpotScoreEaseScale = 1.3;
const sweetSpotScoreDistanceEaseScale = 1.4;
const sweetSpotTuning = {
  visualBaseHalfWidth: 0.003125 * 0.9 * sweetSpotWidthScale,
  visualMeetStep: 0.000208375 * 0.9 * sweetSpotWidthScale,
  scoreBaseHalfWidth: 0.003125 * 0.9 * 3.84 * 1.1 * 1.15 * sweetSpotWidthScale * sweetSpotScoreEaseScale * sweetSpotScoreDistanceEaseScale,
  scoreMeetStep: 0.000208375 * 0.9 * 3.84 * 1.1 * 1.15 * sweetSpotWidthScale * sweetSpotScoreEaseScale * sweetSpotScoreDistanceEaseScale,
  visualMinHalfWidth: 0.0025 * 0.9 * sweetSpotWidthScale,
  minHalfWidth: 0.0025 * 0.9 * 3.84 * 1.1 * 1.15 * sweetSpotWidthScale * sweetSpotScoreEaseScale * sweetSpotScoreDistanceEaseScale,
  maxHalfWidth: 0.14 * 0.9 * sweetSpotWidthScale
};

const teams = {
  away: { label: "チームA（1P）" },
  home: { label: "チームB（2P）" }
};

const teamIds = ["away", "home"];
const pitcherRoles = ["pitcher", "pitcher2", "pitcher3", "pitcher4", "pitcher5"];
const infielderRoles = ["SS", "2B"];
const outfielderRoles = ["L", "C", "R"];
const catcherRole = "CA";
const dhRole = "DH";
const defensiveBatterRoles = [...infielderRoles, ...outfielderRoles, catcherRole];
const batterRoles = [...defensiveBatterRoles, dhRole];
const benchRoles = ["bench1", "bench2", "bench3"];
const benchCostLimit = 15;
const benchSinglePlayerCostLimit = benchCostLimit / 2;
const lineupOrderKey = "lineupOrder";
const baseNames = ["first", "second", "third"];
const baseIndexByName = { home: 0, first: 1, second: 2, third: 3 };
const baseNameByIndex = ["home", "first", "second", "third"];
const teamPointLimit = 68;
const awayRegularLineupOrder = ["2B", "CA", "R", "L", "SS", "C", "DH"];
const homeRegularLineupOrder = ["R", "L", "2B", "CA", "C", "SS", "DH"];
const teamPresets = {
  tigers: {
    label: "タイガース",
    selection: { pitcher: "melton", pitcher2: "valdes", pitcher3: "jansen", pitcher4: "summers", pitcher5: "hanifee", SS: "torkelson", "2B": "mcgonigle", L: "greene", C: "outman", R: "zaiahope", CA: "dingler", DH: "carpenter", bench1: "", bench2: "", bench3: "", lineupOrder: [...awayRegularLineupOrder] }
  },
  dodgers: {
    label: "ドジャース",
    selection: { pitcher: "shohei", pitcher2: "yamamoto", pitcher3: "ediaz", pitcher4: "skubal", pitcher5: "enriquez", SS: "kimhyesong", "2B": "freeman", L: "betts", C: "tucker", R: "otani", CA: "willsmith", DH: "rushing", bench1: "", bench2: "", bench3: "", lineupOrder: [...homeRegularLineupOrder] }
  },
  dendos: {
    label: "デンドーズ",
    selection: { pitcher: "cyyoung", pitcher2: "sawamura", pitcher3: "clemens", pitcher4: "johnson", pitcher5: "maddux", SS: "nagashima", "2B": "sadaharu", L: "ruth", C: "bonds", R: "ichiro", CA: "johnnybench", DH: "nomura", bench1: "rose", bench2: "henderson", bench3: "", lineupOrder: [...batterRoles] }
  },
  allstar: {
    label: "オールスター",
    // 選手は自由に入れ替えられる。合計ポイントの上限はないが、
    // 1人あたり maxPlayerCost まで (デンドーズ級の選手は選べない)。
    maxPlayerCost: 10,
    selection: { pitcher: "shohei", pitcher2: "yamamoto", pitcher3: "misiorowski", pitcher4: "skubal", pitcher5: "wheeler", SS: "wittjr", "2B": "harper", L: "acunajr", C: "judge", R: "otani", CA: "calraleigh", DH: "freeman", bench1: "trout", bench2: "goldschmidt", bench3: "schwarber", lineupOrder: ["R", "C", "2B", "SS", "L", "DH", "CA"] }
  },
  samurai: {
    label: "侍ジャパン",
    allowedPlayerIds: ["yamaoka", "saiki", "sugiyama", "ootake", "fujinami", "shohei", "yamamoto", "sasaki", "imanaga", "darvish", "otani", "suzuki", "shuto", "murakami", "okamoto", "kaicannon", "yoshida", "sato", "shinjo", "wakatsuki"],
    selection: { pitcher: "yamaoka", pitcher2: "saiki", pitcher3: "sugiyama", pitcher4: "ootake", pitcher5: "fujinami", SS: "okamoto", "2B": "murakami", L: "shuto", C: "suzuki", R: "otani", CA: "kaicannon", DH: "yoshida", bench1: "sato", bench2: "shinjo", bench3: "wakatsuki", lineupOrder: ["R", "C", "SS", "2B", "L", "DH", "CA"] }
  }
};
const defaultTeamPresetBySide = { away: "dodgers", home: "dodgers" };
const defaultMenuSelection = {
  away: cloneTeamSelection(teamPresets[defaultTeamPresetBySide.away].selection),
  home: cloneTeamSelection(teamPresets[defaultTeamPresetBySide.home].selection)
};

const rosterStorageKey = "simplestBaseballRosterV1";
const rosterStorageBackupKey = `${rosterStorageKey}Backup`;
const rosterIndexedDbName = "simplestBaseballRoster";
const rosterIndexedDbStore = "roster";
const rosterIndexedDbKey = "current";
const defaultBatters = batters.map((player) => ({ ...player }));
const defaultCatchers = catchers.map((player) => ({ ...player }));
const defaultPitchers = pitchers.map((player) => ({ ...player }));
const originalMenuBatterIds = { away: "original-away-batter", home: "original-home-batter" };
const originalMenuBatters = Object.fromEntries(teamIds.map((team) => [team, createDefaultOriginalMenuBatter(team)]));
const practiceOnlyPitchers = [
  { id: "battingpractice", name: "打撃投手", throws: "L", fastKmh: 120, rightBreak: 0, leftBreak: 0, slowChange: 0, fastChange: 0, control: 18, stuff: -64, fielding: 5, stamina: 99, cost: 0, practiceOnly: true },
  { id: "testpitchera", name: "試験用投手A", throws: "R", fastKmh: 150, rightBreak: 5, leftBreak: 5, slowChange: 5, fastChange: 5, control: 5, stuff: 4096, fielding: 5, stamina: 5, cost: 5, practiceOnly: true }
];
let playerEditorState = { kind: "batter", playerId: batters[0]?.id ?? "", isNew: false };
let chooserSortState = { team: "", role: "", kind: "", key: "" };
let chooserSortStates = {
  away: { team: "", role: "", kind: "", key: "" },
  home: { team: "", role: "", kind: "", key: "" }
};

const scoringHitTypes = new Set(["single", "double", "triple", "homer"]);
const defenseFieldDistanceScale = 0.8 * 1.15;
const defenseFenceHeightScale = 1.15;

const baseDefenseField = {
  fenceDistance: 2280 * defenseFieldDistanceScale,
  fenceHeight: 120 * defenseFenceHeightScale,
  grassRadius: 2190 * defenseFieldDistanceScale,
  deepHitDistance: 1440 * defenseFieldDistanceScale,
  doubleDistance: 1770 * defenseFieldDistanceScale,
  wallHitDistance: 2160 * defenseFieldDistanceScale,
  foulLineTopY: -1065 * defenseFieldDistanceScale,
  foulLineInset: -2250 * defenseFieldDistanceScale
};

const defenseField = {
  ...baseDefenseField,
  bases: {
    home: { x: field.plateX, y: field.plateY + 42 },
    first: { x: 1352, y: 290 },
    second: { x: field.plateX, y: -208 },
    third: { x: -72, y: 290 }
  }
};

const realFieldMetrics = {
  pitcherToPlateMeters: 18.44,
  leftRightFieldFenceMeters: 95,
  centerFieldFenceMeters: 118,
  fairLineAngleDegrees: 55
};

const stadiumPresets = {
  fireworks: {
    id: "fireworks",
    name: "大花火スタジアム",
    surface: "grass",
    // 芝の刈り込み、内野の土、ベースパス、ウォーニングトラックを描く
    realisticField: true,
    centerFenceMeters: realFieldMetrics.centerFieldFenceMeters,
    lineFenceMeters: realFieldMetrics.leftRightFieldFenceMeters,
    fenceHeight: baseDefenseField.fenceHeight,
    grassRadiusScale: 1,
    hasFoulGroundDetails: false,
    hasOcean: false,
    hasMountains: false,
    hasDome: false,
    airCarryScale: 1
  },
  homeRunVision: {
    id: "homeRunVision",
    name: "ホームランヴィジョンフィールド",
    surface: "visionGrass",
    centerFenceMeters: realFieldMetrics.centerFieldFenceMeters,
    lineFenceMeters: realFieldMetrics.leftRightFieldFenceMeters,
    fenceHeight: baseDefenseField.fenceHeight,
    grassRadiusScale: 1,
    hasFoulGroundDetails: true,
    suppressFoulGroundStands: true,
    hasOcean: false,
    hasMountains: false,
    hasDome: false,
    hasHomeRunVision: true,
    hasReliefCar: true,
    airCarryScale: 1
  },
  mStadium: {
    id: "mStadium",
    name: "Mスタジアムです。",
    surface: "obsidian",
    centerFenceMeters: 118,
    lineFenceMeters: 118,
    fenceHeight: baseDefenseField.fenceHeight,
    grassRadiusScale: 1,
    hasFoulGroundDetails: true,
    suppressFoulGroundStands: true,
    hasOcean: false,
    hasMountains: false,
    hasDome: false,
    hasMStadium: true,
    airCarryScale: 1
  },
  xStadium: {
    id: "xStadium",
    name: "Xスタジアム",
    surface: "grass",
    centerFenceMeters: realFieldMetrics.centerFieldFenceMeters,
    lineFenceMeters: realFieldMetrics.leftRightFieldFenceMeters,
    fenceHeight: baseDefenseField.fenceHeight,
    grassRadiusScale: 1,
    hasFoulGroundDetails: false,
    hasOcean: false,
    hasMountains: false,
    hasDome: false,
    hasXStadium: true,
    fireworkScale: 1,
    airCarryScale: 1
  },
  aozora: {
    id: "aozora",
    name: "青空グラウンド",
    surface: "dirt",
    centerFenceMeters: 85,
    lineFenceMeters: 85,
    fenceHeight: baseDefenseField.fenceHeight * 0.42,
    grassRadiusScale: 0.72,
    hasFoulGroundDetails: true,
    hasOcean: false,
    hasMountains: false,
    hasDome: false,
    airCarryScale: 1
  },
  hyperOcean: {
    id: "hyperOcean",
    name: "ハイパーオーシャンパーク",
    surface: "premiumGrass",
    centerFenceMeters: 115,
    lineFenceMeters: 92,
    fenceHeight: baseDefenseField.fenceHeight * 0.86,
    grassRadiusScale: 1,
    hasFoulGroundDetails: true,
    hasOcean: true,
    hasMountains: false,
    hasDome: false,
    airCarryScale: 1
  },
  shiokaze: {
    id: "shiokaze",
    name: "潮風球場",
    surface: "seaBreezeGrass",
    centerFenceMeters: realFieldMetrics.centerFieldFenceMeters,
    lineFenceMeters: realFieldMetrics.leftRightFieldFenceMeters,
    fenceHeight: baseDefenseField.fenceHeight * 0.82,
    grassRadiusScale: 1.04,
    hasFoulGroundDetails: true,
    hasOcean: false,
    hasMountains: false,
    hasDome: false,
    hasSeaBreeze: true,
    seaBreezeParkMeters: { width: 1024, depth: 256 },
    windSideForce: 0.075,
    airCarryScale: 1
  },
  riverside: {
    id: "riverside",
    name: "リバーサイドパーク",
    surface: "riverGrass",
    centerFenceMeters: 112,
    lineFenceMeters: 112,
    fenceHeight: baseDefenseField.fenceHeight * 0.42,
    grassRadiusScale: 1,
    hasFoulGroundDetails: true,
    hasOcean: false,
    hasMountains: false,
    hasDome: false,
    hasRiver: true,
    riverInPlay: false,
    riverCenterMeters: 190,
    riverWidthMeters: 40,
    riverBankMeters: 24,
    koiVariants: 64,
    airCarryScale: 1
  },
  americanRoyal: {
    id: "americanRoyal",
    name: "アメリカンロイヤルパーク",
    surface: "royalGrass",
    centerFenceMeters: 112,
    lineFenceMeters: 112,
    fenceHeight: baseDefenseField.fenceHeight * 1.42,
    grassRadiusScale: 1,
    hasFoulGroundDetails: false,
    hasOcean: false,
    hasMountains: false,
    hasDome: false,
    royalEnclosed: true,
    airCarryScale: 1
  },
  spaceStadium: {
    id: "spaceStadium",
    name: "スペーススタジアム",
    surface: "spaceGlow",
    centerFenceMeters: 140,
    lineFenceMeters: 140,
    fenceHeight: baseDefenseField.fenceHeight * 1.16,
    grassRadiusScale: 1,
    hasFoulGroundDetails: false,
    hasOcean: false,
    hasMountains: false,
    hasDome: false,
    hasSpaceStadium: true,
    fireworkScale: 1.18,
    airCarryScale: 1.5,
    lowGravityTimeScale: 1.75
  },
  nextDome: {
    id: "nextDome",
    name: "ネクストドーム",
    surface: "artificialTurf",
    centerFenceMeters: realFieldMetrics.centerFieldFenceMeters,
    lineFenceMeters: realFieldMetrics.leftRightFieldFenceMeters,
    fenceHeight: baseDefenseField.fenceHeight,
    grassRadiusScale: 1,
    hasFoulGroundDetails: true,
    hasOcean: false,
    hasMountains: false,
    hasDome: true,
    airCarryScale: 1,
    fireworkScale: 1.6
  }
};
let currentStadiumId = "fireworks";

function getCurrentStadium() {
  return stadiumPresets[currentStadiumId] || stadiumPresets.fireworks;
}

function isHomeRunVisionField() {
  return getCurrentStadium().hasHomeRunVision === true;
}

function isShiokazeStadium() {
  return getCurrentStadium().hasSeaBreeze === true;
}

function getStadiumFenceDistance(stadium) {
  const fenceMeters = Number.isFinite(stadium?.centerFenceMeters) ? stadium.centerFenceMeters : realFieldMetrics.centerFieldFenceMeters;
  return baseDefenseField.fenceDistance * (fenceMeters / realFieldMetrics.centerFieldFenceMeters);
}

function applyStadiumPreset(stadiumId = currentStadiumId) {
  const stadium = stadiumPresets[stadiumId] || stadiumPresets.fireworks;
  currentStadiumId = stadium.id;
  const fenceDistance = getStadiumFenceDistance(stadium);
  const distanceRatio = fenceDistance / baseDefenseField.fenceDistance;
  defenseField.fenceDistance = fenceDistance;
  defenseField.fenceHeight = stadium.fenceHeight;
  defenseField.grassRadius = baseDefenseField.grassRadius * distanceRatio * (stadium.grassRadiusScale ?? 1);
  defenseField.deepHitDistance = baseDefenseField.deepHitDistance * distanceRatio;
  defenseField.doubleDistance = baseDefenseField.doubleDistance * distanceRatio;
  defenseField.wallHitDistance = baseDefenseField.wallHitDistance * distanceRatio;
  defenseField.foulLineTopY = baseDefenseField.foulLineTopY * distanceRatio;
  defenseField.foulLineInset = baseDefenseField.foulLineInset * distanceRatio;
}

const battedBallSpeedMultiplier = {
  grounder: 1.62,
  liner: 3.2,
  fly: 1
};
const battedBallPaceMultiplier = 1.3;

const hardGrounderTuning = {
  minPower: 0.58,
  initialSpeedScale: 0.86,
  rollMinDistance: 660,
  rollMaxDistance: 3100,
  rollDistanceScale: 1.18,
  rollBaseSpeed: 330,
  rollEaseExponent: 1.45
};
const hardBattedBallSpeedScale = 0.8;
const deepDriveBallSpeedScale = 1.42;

const defenseRollTuning = {
  distanceScale: 2.25,
  grounderScale: 1.5,
  outfieldGrounderLinerScale: 1.95,
  frontDropRollMin: 115,
  frontDropRollMax: 260,
  frontFlyDropRollMin: 135,
  frontFlyDropRollMax: 310,
  lineDropRollMin: 160,
  lineDropRollMax: 360
};
const outfieldFenceFieldingInset = 36;

const deepDriveTuning = {
  minPowerHitter: 8,
  minPower: 1.34,
  maxPower: 3.08,
  powerStep: 0.34,
  qualityBonus: 0.48,
  sweetSpotBonus: 0.54,
  timingPenaltyScale: 940
};
const bigOutfieldFlyHeightScale = 1.5;
const bigOutfieldFlyDistanceScale = 0.92;

const yellowZoneHitTuning = {
  maxContactBoost: 0.66,
  minHitEase: 0.64,
  maxHitEase: 0.9,
  baseHitEase: 0.46,
  boostHitEase: 0.96,
  qualityHitEase: 0.18,
  sweetSpotHitEase: 0.12,
  velocityHitEase: 0.14,
  timingOutPenalty: 0.3,
  deepDriveRollRatio: 0.62,
  fenceRollRatio: 0.38,
  lineLinerRollRatio: 0.16,
  dropRollRatio: 0.7,
  linerRollRatio: 0.16,
  liftDamping: 10,
  driveLiftAssist: 12,
  carryBoost: 0.42,
  fenceScoreBoost: 0.28
};
const effectiveBatterPowerScale = 0.9;
const goodContactEaseScale = 1.2;

const defenseThrowResultHoldSeconds = 2.0;
const runnerSpeedScale = 0.85;
const runnerSpeedBaseRun = 3.5;
const runnerSpeedUnit = 27.84375;
// 手動守備で、捕球や送球到達のあと次の送球指示を待つ時間 (秒)。
// これを過ぎて指示がなければ次のプレーへ進む。
const manualThrowIdleSeconds = 2;
const abilitySpeedBaseRating = 3.5;
const lowAbilityActualBoost = 1.2;
const fielderSpeedUnit = 21.176470588235293;
const defenseFielderMoveSpeedScale = 0.880308;
const throwSpeedUnit = 89.29411764705881;
const fielderReactionDelayTuning = {
  slowest: 1.5,
  fastest: 0.5,
  midpointFielding: 5,
  midpointDelay: 1.0
};
const showFielderCatchRangeDebug = true;
const fielderCatchRangeDebugStyle = {
  fill: "rgba(255, 104, 180, 0.07)",
  stroke: "rgba(255, 104, 180, 0.2)"
};
// 接触時にこの高さ以上あれば、ノーバウンド捕球とみなす。
const airCatchMinHeight = 12;

// 直接捕球を狙ったライナーを弾く確率と、弾いてから拾い直すまでの硬直時間 (秒)。
// 強い打球を捕り損ねて弾く仕組み。
// 記録上のエラーにはせず、拾い直すまで送球できない「硬直」で表現する。
// ライナー限定だったものを、強い打球全般に広げた。
const battedBallDropTuning = {
  // ライナー系はこの確率 (守備力が平均なら従来どおり10%)
  linerChance: 0.1,
  // ライナー以外は、この強さを超えた打球だけが落球の対象になる
  minPower: 0.72,
  // この強さで落球確率が最大になる
  fullPower: 1.25,
  minChance: 0.04,
  maxChance: 0.2,
  // 守備力による増減の幅。守備5が基準で、守備10なら -fieldingSwing/2 される。
  fieldingSwing: 0.09,
  chanceFloor: 0.01,
  chanceCeiling: 0.32,
  // 弾いたあと動けない時間
  freezeSeconds: 0.9,
  // 強い打球ほど長く弾む
  freezePowerBonus: 0.5
};

const wallReboundTuning = {
  minDistance: 96,
  maxDistance: 230,
  powerDistance: 58,
  baseRollSpeed: 145,
  minRollSeconds: 1.8,
  maxRollSeconds: 5.8
};
const infieldGrounderTuning = {
  secondShortOutBoostChance: 0.39,
  sideMin: 0.42,
  sideMax: 0.78,
  secondShortPowerFloor: 1.16,
  gapGrounderMinSide: 0.42,
  gapGrounderMaxSide: 0.88,
  softPowerMin: 0.32,
  hardPowerMax: 1.38
};
const defenseRangeTuning = {
  infielderGrounderRouteReach: 252,
  infielderReachBonus: 112,
  outfielderReachBonus: 46,
  flyReachBaseScale: 0.1,
  flyReachFieldingScale: 0.012,
  flyReachMinScale: 0.12,
  flyReachMaxScale: 0.24,
  universalReachScale: 1.2,
  nearMissCatchGrace: 0.28,
  closeHardBallRadius: 204,
  closeHardBallBaseChance: 0.58,
  closeHardBallFieldingChance: 0.045,
  difficultCatchTimeWindow: 0.58,
  difficultCatchBaseChance: 0.16,
  difficultCatchFieldingChance: 0.084
};

// 外野の守備位置の深さ (フェンスまでの割合)。
// 0.92 だと深すぎて、フェンスの50〜60%地点に落ちる打球まで600〜800ユニット離れており、
// 物理的に追いつけない帯ができていた。前に出すと浅い打球を拾えるが、深い打球は抜けやすくなる。
const outfieldStartDepthRatio = 0.84;

function outfielderStartPoint(side, depthRatio = outfieldStartDepthRatio) {
  const center = defenseField.bases.home;
  const angle = side === "L" ? -132 : side === "R" ? -48 : -90;
  const radians = degreesToRadians(angle);
  const activeDepthRatio = getCurrentStadium().hasRiver && getCurrentStadium().riverInPlay === false
    ? Math.min(depthRatio, 0.9)
    : depthRatio;
  const centerFenceMeters = Number.isFinite(getCurrentStadium().centerFenceMeters)
    ? getCurrentStadium().centerFenceMeters
    : realFieldMetrics.centerFieldFenceMeters;
  const forwardUnits = 3 / Math.max(0.001, centerFenceMeters / Math.max(1, defenseField.fenceDistance));
  const depth = Math.max(0, defenseField.fenceDistance * activeDepthRatio - forwardUnits);
  return clampOutfielderBeyondRiversideRiver(clampPointInsideFence({
    x: center.x + Math.cos(radians) * depth,
    y: center.y + Math.sin(radians) * depth
  }, 42), side);
}

function infielderStartPoint(role) {
  const first = defenseField.bases.first;
  const second = defenseField.bases.second;
  const third = defenseField.bases.third;
  if (role === "2B") {
    return {
      x: first.x * 0.48 + second.x * 0.52,
      y: first.y * 0.48 + second.y * 0.52 + 70
    };
  }
  return {
    x: third.x * 0.48 + second.x * 0.52,
    y: third.y * 0.48 + second.y * 0.52 + 70
  };
}

function getFieldUnitsForMeters(meters, direction = { x: 0, y: -1 }) {
  const metersPerUnit = getMetersPerBattedBallFieldUnit({
    direction,
    fenceTravelDistance: defenseField.fenceDistance
  });
  return meters / Math.max(0.001, metersPerUnit);
}

// 打球が発生して守備画面に切り替わったとき、投手がどれだけ本塁側へ出た位置から
// 守備を始めるか (メートル)。大きくするほどバントや投手前のゴロに強くなる。
// +1.5m ≒ 選手スプライトの頭一つ分 (画面上で約24px) をホーム方向に前進。
const pitcherDefenseStartAdvanceMeters = 6.5;

function getPitcherDefenseStartPoint(baseFielder) {
  return {
    ...baseFielder,
    y: baseFielder.y + getFieldUnitsForMeters(pitcherDefenseStartAdvanceMeters, { x: 0, y: -1 })
  };
}

const defensiveLineups = {
  away: [
    { role: "P", name: "P", x: field.centerX, y: 250, speed: 8, fielding: 8, arm: 6 },
    { role: "2B", name: "セカンド", ...infielderStartPoint("2B"), speed: 9, fielding: 8, arm: 5 },
    { role: "SS", name: "ショート", ...infielderStartPoint("SS"), speed: 9, fielding: 8, arm: 5 },
    { role: "L", name: "L", ...outfielderStartPoint("L"), speed: 6, fielding: 6, arm: 6 },
    { role: "C", name: "C", ...outfielderStartPoint("C"), speed: 6, fielding: 7, arm: 7, rangeBonus: 44 },
    { role: "R", name: "R", ...outfielderStartPoint("R"), speed: 6, fielding: 6, arm: 6 }
  ],
  home: [
    { role: "P", name: "P", x: field.centerX, y: 250, speed: 8, fielding: 8, arm: 6 },
    { role: "2B", name: "セカンド", ...infielderStartPoint("2B"), speed: 9, fielding: 8, arm: 5 },
    { role: "SS", name: "ショート", ...infielderStartPoint("SS"), speed: 9, fielding: 8, arm: 5 },
    { role: "L", name: "L", ...outfielderStartPoint("L"), speed: 6, fielding: 6, arm: 6 },
    { role: "C", name: "C", ...outfielderStartPoint("C"), speed: 6, fielding: 7, arm: 7, rangeBonus: 44 },
    { role: "R", name: "R", ...outfielderStartPoint("R"), speed: 6, fielding: 6, arm: 6 }
  ]
};

const temporaryInfielderRoles = new Set(["2B", "SS"]);
const infieldDefenseRoles = new Set(["P", "2B", "SS"]);

function isTemporaryInfielderRole(role) {
  return temporaryInfielderRoles.has(role);
}

function isInfielderRole(role) {
  return infieldDefenseRoles.has(role);
}

const batterSprite = new Image();
batterSprite.src = "assets/batter-sprites.png";

const batterHbpSprite = new Image();
batterHbpSprite.src = "assets/batter-hbp.png";

const batterFollowSprite = new Image();
batterFollowSprite.src = "assets/batter-follow.png";

const teamBBatterSprite = new Image();
teamBBatterSprite.src = "assets/team-b-batter.png";

const teamBBatterHbpSprite = new Image();
teamBBatterHbpSprite.src = "assets/team-b-batter-hbp.png";

const teamBBatterFollowSprite = new Image();
teamBBatterFollowSprite.src = "assets/team-b-batter-follow.png";

const teamAPitcherSprite = new Image();
teamAPitcherSprite.src = "assets/team-a-pitcher.png";

const teamBPitcherSprite = new Image();
teamBPitcherSprite.src = "assets/team-b-pitcher.png";

const batterSpriteSets = {
  away: {
    image: batterSprite,
    hbpImage: batterHbpSprite,
    followImage: batterFollowSprite,
    frames: {
      stance: { sx: 300, sy: 44, sw: 368, sh: 766 },
      swing: { sx: 909, sy: 86, sw: 799, sh: 709 },
      follow: { sx: 341, sy: 66, sw: 797, sh: 794 },
      hbp: { sx: 397, sy: 48, sw: 896, sh: 805 }
    }
  },
  home: {
    image: teamBBatterSprite,
    hbpImage: teamBBatterHbpSprite,
    followImage: teamBBatterFollowSprite,
    frames: {
      stance: { sx: 299, sy: 44, sw: 367, sh: 766 },
      swing: { sx: 908, sy: 87, sw: 799, sh: 707 },
      follow: { sx: 352, sy: 72, sw: 888, sh: 770 },
      hbp: { sx: 398, sy: 46, sw: 901, sh: 804 }
    }
  }
};

const pitcherSpriteSets = {
  away: {
    image: teamAPitcherSprite,
    frames: {
      set: { sx: 235, sy: 77, sw: 250, sh: 658 },
      windup: { sx: 666, sy: 78, sw: 311, sh: 674 },
      release: { sx: 1164, sy: 190, sw: 413, sh: 573 }
    }
  },
  home: {
    image: teamBPitcherSprite,
    frames: {
      set: { sx: 245, sy: 78, sw: 247, sh: 641 },
      windup: { sx: 663, sy: 84, sw: 323, sh: 664 },
      release: { sx: 1165, sy: 211, sw: 414, sh: 548 }
    }
  }
};

let gameMode = "versus";
let practicePitcherControl = "auto";
let practicePitcherType = "A";
let pitchingPracticeBatterType = "A";
let practiceBatterId = getDefaultPracticeBatterId();
let practicePitcherId = getDefaultPracticePitcherId();
let homeRunDerbyPlayerCount = 1;
let homeRunDerbyBatterIds = { away: getDefaultPracticeBatterId(), home: getDefaultPracticeBatterId() };
const HOME_RUN_DERBY_REGULATION_BALLS = 5;
let selectedTeamPresetBySide = { ...defaultTeamPresetBySide };
let practiceActiveBatter = null;
let practiceActivePitcher = null;
let homeRunDerbyState = createHomeRunDerbyState();
let defenseControlMode = { away: "manual", home: "manual" };
let gamePhase = "menu";
let maxInnings = 1;
let firstBatTeam = "away";
const playerTeam = "away";
let battingTeam = "away";
let inning = 1;
let half = "top";
let scores = { away: 0, home: 0 };
let inningScores = createInningScores();
let batterGameRecords = createBatterGameRecords();
let pitcherGameRecords = createPitcherGameRecords();
let pitcherDecisionEvents = [];
let selected = createSelectedTeams(defaultMenuSelection);
let menuSelection = cloneMenuSelection(defaultMenuSelection);
let battingOrderIndex = { away: 0, home: 0 };
let lastOutBatterByTeam = { away: null, home: null };
let automaticTiebreakRunnerUsed = { away: false, home: false };
let bases = createEmptyBases();
let reliefBoostState = createReliefBoostState();
let pendingGameEnd = null;

let activeBatter = selected.away.batters[0].player;
let activePitcher = getTeamActivePitcher("home");
let activeBatterSide = "R";

let pitcher = {
  x: field.centerX,
  y: field.moundY,
  windupTime: 0,
  minX: field.centerX - 86,
  maxX: field.centerX + 86,
  moveStep: 18
};

let batter = {
  x: 520,
  y: 720,
  speed: 330
};

let count = { strikes: 0, balls: 0, outs: 0 };
let ball = {
  x: pitcher.x,
  y: pitcher.y,
  prevX: pitcher.x,
  prevY: pitcher.y,
  vx: 0,
  vy: 0,
  baseVx: 0,
  baseVy: 0,
  speedScale: 1,
  radius: 9,
  active: false,
  inPitch: false,
  crossedPlate: false,
  touchedPlate: false,
  wasHit: false,
  pitchStartTime: 0,
  plateTime: 0,
  targetX: field.plateX,
  targetY: field.plateY,
  spin: 0,
  curvePower: 0,
  staminaMistake: false,
  horizontalVariationStaminaCharged: false,
  verticalVariationStaminaCharged: false,
  pitchAbilityMultiplier: 1,
  trail: []
};

let currentPitchType = "";
let currentPitchSpeedKmh = null;
let lastPitchSpeedKmh = null;
let message = "メニューで設定して試合開始";
let isPitching = false;
let pendingPitch = null;
let autoPitchTimer = Number.POSITIVE_INFINITY;
let inputLockedUntil = 0;
let computerPitchPlan = null;

let swingState = {
  isSwinging: false,
  startTime: 0,
  duration: 450,
  followHoldDuration: 200,
  cooldownUntil: 0,
  didSwingThisPitch: false,
  madeContact: false,
  lastCheckProgress: 0,
  type: "strong",
  isBuntStance: false,
  buntAimX: 0,
  buntAimY: 0,
  buntAimMemoryX: 0,
  buntAimMemoryY: 0,
  buntAimMemoryMagnitude: 0,
  buntAimMemoryTime: 0
};
const buntAimMemoryDuration = 650;

let defenseState = createDefenseState();
let stealState = createStealState();
// CPUが今の投球で盗塁を仕掛ける計画。投球動作の開始時に決めて、狙った間合いで走り出す。
let computerStealPlan = null;

let hitEffect = { active: false, startTime: 0, text: "", color: "#fff2a8" };
let battingFeedback = { active: false, startTime: 0, lines: [] };
let hbpPose = { active: false, startTime: 0, duration: 1800 };
let reliefCarEffect = { active: false, startTime: 0, duration: 3600, pitcherName: "", team: "away" };
let homeRunVisionDisplay = { advice: "", startTime: 0 };
let xStadiumPrompt = { active: false, offeredDefenseStartTime: null, goRect: null, dontRect: null };
const keysDown = new Set();
const pitchAdjustmentKeys = ["1", "3", "4", "6"];
const SAFE_TOLERANCE = 0.03;
let pitchControlLockoutKeys = new Set();
let mouseAim = { active: false, x: 0, y: 0 };
let lastFrameTime = performance.now();
const gamepadState = {
  teamIndexes: { away: null, home: null },
  previousButtons: { away: new Set(), home: new Set() },
  previousDirections: { away: new Set(), home: new Set() },
  lastDirectionPress: { away: { time: 0, directions: new Set() }, home: { time: 0, directions: new Set() } },
  lastThrowButtonPress: { away: 0, home: 0 },
  virtualKeys: new Set(),
  lastButton: { index: null, team: null, time: 0 },
  menuCursors: {
    away: { x: 0, y: 0, initialized: false, element: null },
    home: { x: 0, y: 0, initialized: false, element: null }
  }
};
const gamepadButtons = {
  A: 2,
  B: 1,
  X: 3,
  Y: 0,
  LB: 4,
  RB: 5,
  INTENTIONAL_WALK: 9,
  PAUSE: 12
};

let pauseMenuState = {
  active: false,
  team: "away",
  mode: "main",
  selectedIndex: 0,
  selectedRole: null,
  selectedBase: null,
  message: ""
};

let switchBatterChoice = {
  active: false,
  team: "away",
  batterId: "",
  selectedSide: "L",
  axisHeld: false
};

function createStealState() {
  return {
    active: false,
    earlyRequest: false,
    resolved: false,
    runner: null,
    startBase: null,
    targetBase: null,
    route: [],
    startTime: 0,
    requestTime: 0,
    motionElapsedSeconds: null,
    jumpLead: 0,
    arrivalTime: 0,
    pitchType: "",
    pitchResultPending: false,
    plateReached: false,
    catcherThrowReady: false,
    catcherThrowReadyTime: 0,
    manualThrowRequired: false,
    swingMissDelaySeconds: 0,
    throw: null,
    outcome: null
  };
}

function createHomeRunDerbyState() {
  return {
    active: false,
    playerCount: 1,
    currentTeam: "away",
    round: "regulation",
    balls: { away: 0, home: 0 },
    suddenBalls: { away: 0, home: 0 },
    suddenRound: 0,
    batters: { away: null, home: null },
    lastPitchPoints: 0,
    lastPitchHomer: false
  };
}

const sounds = {
  swing: new Audio("audio/swing.wav"),
  hit: new Audio("audio/hit2.mp3"),
  cheer: new Audio("audio/スタジアムの歓声.mp3"),
  firework: new Audio("audio/打ち上げ花火.mp3")
};

Object.values(sounds).forEach((sound) => {
  sound.preload = "auto";
  sound.volume = 0.75;
});

const bgmTracks = {
  menu: new Audio("audio/sports_broadcast_baseball_bgm_loop.wav"),
  relaxed: new Audio("audio/bright_relaxed_sports_broadcast_bgm_loop.wav"),
  scoring: new Audio("audio/mountain_wind_stadium_anthem_bgm_loop.wav")
};

Object.values(bgmTracks).forEach((track) => {
  track.preload = "auto";
  track.loop = true;
  track.volume = 0.42;
});

let currentBgmKey = null;
let bgmNeedsUserGesture = false;
let activeLineupOrderPicker = null;
const audioSettings = {
  soundEffects: true,
  bgm: true
};

const hitLabels = {
  single: "ヒット",
  cleanHit: "クリーンヒット",
  outfieldLiner: "外野ライナー",
  gapGrounder: "内野間へのゴロ",
  double: "ツーベース",
  triple: "スリーベース",
  homer: "ホームラン",
  softGrounder: "ボテボテのゴロ",
  grounder: "平凡な内野ゴロ",
  hardGrounder: "強いゴロ",
  scorchingGrounder: "痛烈なゴロ",
  lineLiner: "ライン際ライナー",
  lineDrop: "ライン際ポテン",
  fenceLiner: "低いフェン直ライナー",
  frontDrop: "手前ポテン",
  lineEdge: "ライン際ギリギリ",
  lineEdgeGrounder: "ライン際痛烈ゴロ",
  centerReturnGrounder: "センター返しゴロ",
  centerReturnLiner: "センター返しライナー",
  chaseFly: "追走フライ",
  toweringFly: "大飛球",
  fenceEdgeFly: "フェンス際大飛球",
  popup: "内野ポップフライ",
  routineFly: "平凡なフライ",
  fly: "フライ",
  foul: "ファウル"
};

function getGrounderQualityLabel(profile = {}, classification = "quality") {
  if (classification === "weak") return hitLabels.softGrounder;
  if (classification === "routine") return hitLabels.grounder;
  if (classification === "hard") return hitLabels.hardGrounder;
  if (classification === "scorching") return hitLabels.scorchingGrounder;

  const quality = clamp(profile?.feedbackScore ?? profile?.quality ?? 0.45, 0, 1);
  const exitVelocity = clamp(profile?.exitVelocity ?? 0.5, 0, 1.75);
  if (profile?.homerConvertedGrounder || (quality >= 0.72 && exitVelocity >= 0.88)) {
    return hitLabels.scorchingGrounder;
  }
  if (profile?.outfieldHitConvertedGrounder || (quality >= 0.52 && exitVelocity >= 0.66)) {
    return hitLabels.hardGrounder;
  }
  if (quality < 0.26 || exitVelocity < 0.4) return hitLabels.softGrounder;
  return hitLabels.grounder;
}

function isStandardGrounderLabel(label) {
  return label === hitLabels.softGrounder
    || label === hitLabels.grounder
    || label === hitLabels.hardGrounder
    || label === hitLabels.scorchingGrounder
    || label === hitLabels.gapGrounder;
}

const deepDriveLabel = "強烈な打球";
const superDeepDriveLabel = "超強烈な打球";

function populateSelects() {
  loadRosterFromStorage();
  renderPracticePlayerSelects();
  updateMenuAbilityPanels();
}

function renderPracticePlayerSelects() {
  renderPracticePlayerSelect(practiceBatterSelect, getAllHitters(), practiceBatterId, "batter");
  renderPracticePlayerSelect(practicePitcherSelect, getPracticePitchers(), practicePitcherId, "pitcher");
  renderPracticePlayerSelect(homeRunDerbyAwayBatterSelect, getAllHitters(), homeRunDerbyBatterIds.away, "batter");
  renderPracticePlayerSelect(homeRunDerbyHomeBatterSelect, getAllHitters(), homeRunDerbyBatterIds.home, "batter");
  practiceBatterId = practiceBatterSelect?.value || getAllHitters()[0]?.id || "";
  practicePitcherId = practicePitcherSelect?.value || getPracticePitchers()[0]?.id || "";
  homeRunDerbyBatterIds = {
    away: homeRunDerbyAwayBatterSelect?.value || getAllHitters()[0]?.id || "",
    home: homeRunDerbyHomeBatterSelect?.value || getAllHitters()[0]?.id || ""
  };
}

function getPracticePitchers() {
  return [...practiceOnlyPitchers, ...pitchers];
}

function getDefaultPracticeBatterId() {
  return findById(getAllHitters(), "ruth")?.id || getAllHitters()[0]?.id || "";
}

function getDefaultPracticePitcherId() {
  return findById(getPracticePitchers(), "battingpractice")?.id || getPracticePitchers()[0]?.id || "";
}

function renderPracticePlayerSelect(select, list, selectedId, kind) {
  if (!select) return;
  const currentId = list.some((player) => player.id === selectedId) ? selectedId : list[0]?.id || "";
  select.innerHTML = list
    .map((player) => {
      const side = kind === "pitcher" ? handLabel(player.throws) : handLabel(player.bats);
      const summary = kind === "pitcher"
        ? `${player.name}（${side}投 / 球速${player.fastKmh} / 制球${player.control} / 球威${player.stuff}）`
        : `${player.name}（${side}打 / パ${player.power} / ミ${player.meet} / 走${player.run}）`;
      return `<option value="${escapeHtml(player.id)}">${escapeHtml(summary)}</option>`;
    })
    .join("");
  select.value = currentId;
}

function handLabel(hand) {
  if (hand === "R") return "右";
  if (hand === "L") return "左";
  return "左右";
}

function getStorage() {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch {
    return null;
  }
}

function normalizePlayerId(name, kind) {
  const base = String(name || kind || "player")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32) || kind;
  const existingIds = new Set([...batters, ...catchers, ...pitchers].map((player) => player.id));
  let id = `custom-${kind}-${base}`;
  let index = 2;
  while (existingIds.has(id)) {
    id = `custom-${kind}-${base}-${index}`;
    index += 1;
  }
  return id;
}

function sanitizeNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.round(clamp(number, min, max));
}

const rosterAbilityMax = 99;
const rosterAbilityMin = 0;
const rosterStuffMin = -99;

function sanitizeRosterPlayer(player, kind, fallback = {}) {
  const name = String(player?.name || fallback.name || "新規選手").trim().slice(0, 18) || "新規選手";
  const id = String(player?.id || fallback.id || normalizePlayerId(name, kind)).trim();
  const cost = sanitizeNumber(player?.cost, 1, 99, fallback.cost ?? 5);
  if (kind === "pitcher") {
    return {
      id,
      name,
      throws: ["R", "L"].includes(player?.throws) ? player.throws : fallback.throws ?? "R",
      fastKmh: sanitizeNumber(player?.fastKmh, 80, 230, fallback.fastKmh ?? 150),
      rightBreak: sanitizeNumber(player?.rightBreak, rosterAbilityMin, rosterAbilityMax, fallback.rightBreak ?? 5),
      leftBreak: sanitizeNumber(player?.leftBreak, rosterAbilityMin, rosterAbilityMax, fallback.leftBreak ?? 5),
      slowChange: sanitizeNumber(player?.slowChange, rosterAbilityMin, rosterAbilityMax, fallback.slowChange ?? 5),
      fastChange: sanitizeNumber(player?.fastChange, rosterAbilityMin, rosterAbilityMax, fallback.fastChange ?? 5),
      control: sanitizeNumber(player?.control, rosterAbilityMin, rosterAbilityMax, fallback.control ?? 5),
      stuff: sanitizeNumber(player?.stuff, rosterStuffMin, rosterAbilityMax, fallback.stuff ?? 5),
      fielding: sanitizeNumber(player?.fielding, rosterAbilityMin, rosterAbilityMax, fallback.fielding ?? 5),
      stamina: sanitizeNumber(player?.stamina, rosterAbilityMin, rosterAbilityMax, fallback.stamina ?? 6),
      cost
    };
  }
  if (kind === "catcher") {
    return {
      id,
      name,
      bats: ["R", "L", "S"].includes(player?.bats) ? player.bats : fallback.bats ?? "R",
      power: sanitizeNumber(player?.power, rosterAbilityMin, rosterAbilityMax, fallback.power ?? 5),
      meet: sanitizeNumber(player?.meet, rosterAbilityMin, rosterAbilityMax, fallback.meet ?? 5),
      run: sanitizeNumber(player?.run, rosterAbilityMin, rosterAbilityMax, fallback.run ?? 5),
      arm: sanitizeNumber(player?.arm, rosterAbilityMin, rosterAbilityMax, fallback.arm ?? 5),
      cost
    };
  }
  return {
    id,
    name,
    bats: ["R", "L", "S"].includes(player?.bats) ? player.bats : fallback.bats ?? "R",
    power: sanitizeNumber(player?.power, rosterAbilityMin, rosterAbilityMax, fallback.power ?? 5),
    meet: sanitizeNumber(player?.meet, rosterAbilityMin, rosterAbilityMax, fallback.meet ?? 5),
    run: sanitizeNumber(player?.run, rosterAbilityMin, rosterAbilityMax, fallback.run ?? 5),
    infieldDefense: sanitizeNumber(player?.infieldDefense, rosterAbilityMin, rosterAbilityMax, fallback.infieldDefense ?? fallback.fielding ?? 5),
    outfieldDefense: sanitizeNumber(player?.outfieldDefense, rosterAbilityMin, rosterAbilityMax, fallback.outfieldDefense ?? fallback.fielding ?? 5),
    arm: sanitizeNumber(player?.arm, rosterAbilityMin, rosterAbilityMax, fallback.arm ?? 5),
    cost
  };
}

function replaceRosterList(target, nextPlayers, defaults, kind) {
  const sanitized = Array.isArray(nextPlayers)
    ? nextPlayers.map((player, index) => sanitizeRosterPlayer(player, kind, defaults[index] ?? {}))
    : [];
  const unique = [];
  const usedIds = new Set();
  sanitized.forEach((player) => {
    if (!player.id || usedIds.has(player.id)) return;
    usedIds.add(player.id);
    unique.push(player);
  });
  target.splice(0, target.length, ...(unique.length ? unique : defaults.map((player) => ({ ...player }))));
}

function buildRosterStoragePayload() {
  return JSON.stringify({
    version: 3,
    savedAt: new Date().toISOString(),
    batters,
    catchers,
    pitchers
  });
}

function requestPersistentRosterStorage() {
  try {
    if (typeof navigator !== "undefined" && navigator.storage?.persist) navigator.storage.persist().catch(() => {});
  } catch {
    // Some browsers do not expose persistent storage for local files.
  }
}

function getIndexedDb() {
  try {
    return typeof indexedDB === "undefined" ? null : indexedDB;
  } catch {
    return null;
  }
}

function openRosterDatabase() {
  const dbApi = getIndexedDb();
  if (!dbApi) return Promise.reject(new Error("IndexedDB unavailable"));
  return new Promise((resolve, reject) => {
    const request = dbApi.open(rosterIndexedDbName, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(rosterIndexedDbStore)) db.createObjectStore(rosterIndexedDbStore);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("IndexedDB open failed"));
  });
}

async function saveRosterToIndexedDb(payload) {
  const db = await openRosterDatabase();
  try {
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(rosterIndexedDbStore, "readwrite");
      transaction.objectStore(rosterIndexedDbStore).put(payload, rosterIndexedDbKey);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error || new Error("IndexedDB save failed"));
      transaction.onabort = () => reject(transaction.error || new Error("IndexedDB save aborted"));
    });
    const saved = await loadRosterPayloadFromIndexedDb();
    return saved === payload;
  } finally {
    db.close?.();
  }
}

async function loadRosterPayloadFromIndexedDb() {
  const db = await openRosterDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(rosterIndexedDbStore, "readonly");
      const request = transaction.objectStore(rosterIndexedDbStore).get(rosterIndexedDbKey);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error("IndexedDB load failed"));
    });
  } finally {
    db.close?.();
  }
}

function applyRosterPayload(payload) {
  const saved = typeof payload === "string" ? JSON.parse(payload || "null") : payload;
  if (!saved) return false;
  const savedBatters = Array.isArray(saved.batters)
    ? saved.batters.filter((player) => player?.id !== "dingler" && !defaultCatchers.some((catcher) => catcher.id === player?.id))
    : saved.batters;
  replaceRosterList(batters, savedBatters, defaultBatters, "batter");
  replaceRosterList(catchers, saved.catchers, defaultCatchers, "catcher");
  replaceRosterList(pitchers, saved.pitchers, defaultPitchers, "pitcher");
  applyDefaultRosterUpdates(batters, defaultBatters, defaultBatters.map((player) => player.id), "batter");
  applyDefaultRosterUpdates(catchers, defaultCatchers, defaultCatchers.map((player) => player.id), "catcher");
  applyDefaultRosterUpdates(pitchers, defaultPitchers, defaultPitchers.map((player) => player.id), "pitcher");
  return true;
}

function applyDefaultRosterUpdates(target, defaults, ids, kind) {
  ids.forEach((id) => {
    const defaultPlayer = defaults.find((player) => player.id === id);
    if (!defaultPlayer) return;
    const clean = sanitizeRosterPlayer(defaultPlayer, kind, defaultPlayer);
    const existingIndex = target.findIndex((player) => player.id === id);
    if (existingIndex >= 0) {
      target[existingIndex] = clean;
    } else {
      target.push(clean);
    }
  });
}

function loadRosterFromStorage() {
  const storage = getStorage();
  if (!storage) return;
  try {
    applyRosterPayload(storage.getItem(rosterStorageKey) || storage.getItem(rosterStorageBackupKey) || "null");
  } catch {
    storage.removeItem(rosterStorageKey);
  }
}

async function loadRosterFromPersistentStorage() {
  try {
    const payload = await loadRosterPayloadFromIndexedDb();
    if (!payload || !applyRosterPayload(payload)) return false;
    renderPracticePlayerSelects();
    updateMenuAbilityPanels();
    if (!playerEditor?.classList.contains("hidden")) renderPlayerEditor();
    return true;
  } catch {
    return false;
  }
}

function saveRosterToStorage() {
  const storage = getStorage();
  if (!storage) return { ok: false, message: "ブラウザ保存を使えません" };
  try {
    requestPersistentRosterStorage();
    const payload = buildRosterStoragePayload();
    storage.setItem(rosterStorageKey, payload);
    storage.setItem(rosterStorageBackupKey, payload);
    saveRosterToIndexedDb(payload).catch(() => {});
    const verified = storage.getItem(rosterStorageKey) === payload || storage.getItem(rosterStorageBackupKey) === payload;
    return verified
      ? { ok: true, message: "保存しました" }
      : { ok: false, message: "保存確認に失敗しました" };
  } catch {
    return { ok: false, message: "保存に失敗しました" };
  }
}

async function saveRosterDurably() {
  requestPersistentRosterStorage();
  const payload = buildRosterStoragePayload();
  let localVerified = false;
  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(rosterStorageKey, payload);
      storage.setItem(rosterStorageBackupKey, payload);
      localVerified = storage.getItem(rosterStorageKey) === payload || storage.getItem(rosterStorageBackupKey) === payload;
    } catch {
      localVerified = false;
    }
  }

  let indexedVerified = false;
  try {
    indexedVerified = await saveRosterToIndexedDb(payload);
  } catch {
    indexedVerified = false;
  }

  if (indexedVerified) return { ok: true, message: "保存しました" };
  if (localVerified) return { ok: true, message: "保存しました（簡易保存）" };
  return { ok: false, message: "ブラウザ保存に失敗しました" };
}

function resetRosterToDefaults() {
  replaceRosterList(batters, defaultBatters, defaultBatters, "batter");
  replaceRosterList(catchers, defaultCatchers, defaultCatchers, "catcher");
  replaceRosterList(pitchers, defaultPitchers, defaultPitchers, "pitcher");
  getStorage()?.removeItem(rosterStorageKey);
  getStorage()?.removeItem(rosterStorageBackupKey);
  openRosterDatabase()
    .then((db) => new Promise((resolve) => {
      const transaction = db.transaction(rosterIndexedDbStore, "readwrite");
      transaction.objectStore(rosterIndexedDbStore).delete(rosterIndexedDbKey);
      transaction.oncomplete = () => {
        db.close?.();
        resolve();
      };
      transaction.onerror = () => {
        db.close?.();
        resolve();
      };
    }))
    .catch(() => {});
  selected = createSelectedTeams(defaultMenuSelection);
  menuSelection = cloneMenuSelection(defaultMenuSelection);
  activeLineupOrderPicker = null;
  playerEditorState = { kind: playerEditorState.kind, playerId: getPlayerEditorList()[0]?.id ?? "", isNew: false };
  practiceBatterId = getDefaultPracticeBatterId();
  practicePitcherId = getDefaultPracticePitcherId();
  renderPracticePlayerSelects();
  renderPlayerEditor();
  updateMenuAbilityPanels();
  setPlayerEditorStatus("初期値に戻しました");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getPlayerEditorList(kind = playerEditorState.kind) {
  return kind === "pitcher" ? pitchers : batters;
}

function getPlayerEditorCurrentPlayer() {
  const list = getPlayerEditorList();
  return list.find((player) => player.id === playerEditorState.playerId) || list[0] || null;
}

function openPlayerEditor() {
  closePlayerChooser();
  if (!getPlayerEditorCurrentPlayer()) {
    playerEditorState.playerId = getPlayerEditorList()[0]?.id ?? "";
  }
  renderPlayerEditor();
  playerEditor?.classList.remove("hidden");
}

function closePlayerEditor() {
  playerEditor?.classList.add("hidden");
}

function setPlayerEditorStatus(text, type = "info") {
  if (!playerEditorStatus) return;
  playerEditorStatus.textContent = text;
  playerEditorStatus.dataset.status = type;
}

function flashPlayerEditorSaveButton(success) {
  const button = playerEditorForm?.querySelector?.('button[type="submit"]');
  if (!button) return;
  button.classList.remove("save-confirmed", "save-failed");
  button.classList.add(success ? "save-confirmed" : "save-failed");
  setTimeout(() => {
    button.classList.remove("save-confirmed", "save-failed");
  }, 650);
}

function renderPlayerEditor() {
  if (!playerEditor || !playerEditorKind || !playerEditorList || !playerEditorForm) return;
  playerEditorKind.value = playerEditorState.kind;
  if (playerEditorTitle) playerEditorTitle.textContent = playerEditorState.kind === "pitcher" ? "投手能力値変更" : "野手能力値変更";
  renderPlayerEditorList();
  renderPlayerEditorForm();
}

function renderPlayerEditorList() {
  const list = getPlayerEditorList();
  playerEditorList.innerHTML = list.map((player) => `
    <button class="editor-player-button${player.id === playerEditorState.playerId ? " selected" : ""}" type="button" data-player-id="${escapeHtml(player.id)}">
      <strong>${escapeHtml(player.name)}</strong>
      <span>${player.cost ?? 5}P</span>
    </button>
  `).join("");
}

function editorNumberInput(field, label, value, min = 1, max = rosterAbilityMax) {
  return `
    <label>
      ${label}
      <input type="number" data-field="${field}" min="${min}" max="${max}" step="1" value="${escapeHtml(value)}">
    </label>
  `;
}

function editorSelect(field, label, value, options) {
  return `
    <label>
      ${label}
      <select data-field="${field}">
        ${options.map(([optionValue, optionLabel]) => `<option value="${optionValue}" ${optionValue === value ? "selected" : ""}>${optionLabel}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderPlayerEditorForm() {
  const player = getPlayerEditorCurrentPlayer();
  if (!player) {
    playerEditorForm.innerHTML = "";
    return;
  }
  const isPitcher = playerEditorState.kind === "pitcher";
  const fields = isPitcher
    ? [
      editorSelect("throws", "投", player.throws, [["R", "右"], ["L", "左"]]),
      editorNumberInput("fastKmh", "球速", player.fastKmh, 80, 230),
      editorNumberInput("rightBreak", "右変化", player.rightBreak),
      editorNumberInput("leftBreak", "左変化", player.leftBreak),
      editorNumberInput("slowChange", "減速", player.slowChange),
      editorNumberInput("fastChange", "加速", player.fastChange),
      editorNumberInput("control", "制球", player.control),
      editorNumberInput("stuff", "球威", player.stuff),
      editorNumberInput("fielding", "守備", player.fielding ?? 5),
      editorNumberInput("stamina", "スタミナ", player.stamina ?? 6),
      editorNumberInput("cost", "獲得P", player.cost ?? 5, 1, 99)
    ]
    : [
      editorSelect("bats", "打", player.bats, [["R", "右"], ["L", "左"], ["S", "両"]]),
      editorNumberInput("power", "パワー", player.power),
      editorNumberInput("meet", "ミート", player.meet),
      editorNumberInput("run", "走塁", player.run),
      editorNumberInput("infieldDefense", "内野", player.infieldDefense ?? player.fielding ?? 5),
      editorNumberInput("outfieldDefense", "外野", player.outfieldDefense ?? player.fielding ?? 5),
      editorNumberInput("arm", "肩", player.arm ?? 5),
      editorNumberInput("cost", "獲得P", player.cost ?? 5, 1, 99)
    ];
  playerEditorForm.innerHTML = `
    <label class="editor-name-field">
      名前
      <input type="text" data-field="name" maxlength="18" value="${escapeHtml(player.name)}">
    </label>
    <div class="editor-field-grid">
      ${fields.join("")}
    </div>
    <div class="editor-form-actions">
      <button type="submit">保存</button>
    </div>
  `;
}

async function createNewEditorPlayer() {
  const kind = playerEditorState.kind;
  const name = kind === "pitcher" ? "新規投手" : "新規野手";
  const player = sanitizeRosterPlayer({ id: normalizePlayerId(name, kind), name }, kind);
  getPlayerEditorList(kind).push(player);
  playerEditorState.playerId = player.id;
  playerEditorState.isNew = true;
  const saveResult = await saveRosterDurably();
  renderPracticePlayerSelects();
  renderPlayerEditor();
  updateMenuAbilityPanels();
  flashPlayerEditorSaveButton(saveResult.ok);
  setPlayerEditorStatus(saveResult.ok ? "新規選手を追加して保存しました" : `新規選手を追加しました / ${saveResult.message}`, saveResult.ok ? "saved" : "error");
}

async function savePlayerEditorForm() {
  const player = getPlayerEditorCurrentPlayer();
  if (!player || !playerEditorForm) return;
  const next = { ...player };
  playerEditorForm.querySelectorAll("[data-field]").forEach((input) => {
    next[input.dataset.field] = input.value;
  });
  const clean = sanitizeRosterPlayer(next, playerEditorState.kind, player);
  Object.assign(player, clean);
  const saveResult = await saveRosterDurably();
  selected = createSelectedTeams(menuSelection);
  renderPracticePlayerSelects();
  updateMenuAbilityPanels();
  renderPlayerEditor();
  flashPlayerEditorSaveButton(saveResult.ok);
  setPlayerEditorStatus(saveResult.ok ? `${player.name}を保存しました` : `${player.name}の保存に失敗しました: ${saveResult.message}`, saveResult.ok ? "saved" : "error");
}

function cloneMenuSelection(source) {
  return Object.fromEntries(teamIds.map((team) => [
    team,
    {
      ...getTeamPreset(defaultTeamPresetBySide[team]).selection,
      ...source[team],
      [lineupOrderKey]: getSelectionLineupOrder(source[team])
    }
  ]));
}

function cloneTeamSelection(selection) {
  return { ...selection, [lineupOrderKey]: getSelectionLineupOrder(selection) };
}

function getTeamPreset(id) {
  return teamPresets[id] || teamPresets.tigers;
}

function getSelectedTeamPresetId(team) {
  return selectedTeamPresetBySide[team] || defaultTeamPresetBySide[team] || "tigers";
}

function getSelectedTeamPreset(team) {
  return getTeamPreset(getSelectedTeamPresetId(team));
}

function isDendosTeam(team) {
  return getSelectedTeamPresetId(team) === "dendos";
}

function isUnlimitedCostTeam(team) {
  return ["dendos", "allstar"].includes(getSelectedTeamPresetId(team));
}

function isMenuTeamLocked(team) {
  return Boolean(getSelectedTeamPreset(team)?.locked);
}

function getMenuPresetAllowedPlayerIds(team) {
  const allowed = getSelectedTeamPreset(team)?.allowedPlayerIds;
  return Array.isArray(allowed) ? allowed : null;
}

function isMenuPlayerAllowedByPreset(team, playerId) {
  if (!playerId) return true;
  const allowed = getMenuPresetAllowedPlayerIds(team);
  return !allowed || allowed.includes(playerId);
}

// 1人あたりの獲得ポイント上限。合計の上限とは別で、上限を超える選手は選べない。
function getMenuPresetMaxPlayerCost(team) {
  const max = getSelectedTeamPreset(team)?.maxPlayerCost;
  return Number.isFinite(max) ? max : null;
}

function isMenuPlayerOverPresetCost(team, kind, playerId) {
  const max = getMenuPresetMaxPlayerCost(team);
  if (max === null || !playerId) return false;
  return getMenuPlayerCost(getPlayerListForKind(kind), playerId) > max;
}

function doesMenuPointLimitApply(team) {
  return !isAnyPracticeMode() && !isUnlimitedCostTeam(team);
}

function applyTeamPresetMenuSelection(team, presetId) {
  const preset = getTeamPreset(presetId);
  selectedTeamPresetBySide[team] = presetId;
  menuSelection[team] = cloneTeamSelection(preset.selection);
}

function createSelectedTeams(selection) {
  return Object.fromEntries(teamIds.map((team) => [team, createSelectedTeam(selection[team])]));
}

function createSelectedTeam(selection) {
  const selectedPitchers = pitcherRoles.map((role) => createMatchPitcher(findById(pitchers, selection[role])));
  const lineupOrder = getSelectionLineupOrder(selection);
  const selectedBench = benchRoles.map((role) => ({
    role,
    player: selection?.[role] ? createBenchPlayerForMatch(findSelectedById(getPlayerListForRole(role), selection[role])) : null
  }));
  return {
    pitchers: selectedPitchers,
    activePitcherId: selectedPitchers[0].id,
    usedPitcherIds: [selectedPitchers[0].id],
    batters: lineupOrder.map((role) => ({
      role,
      player: findById(getPlayerListForRole(role), selection[role])
    })),
    bench: selectedBench,
    usedBenchIds: []
  };
}

function getSelectionLineupOrder(selection) {
  const order = Array.isArray(selection?.[lineupOrderKey]) ? selection[lineupOrderKey] : batterRoles;
  const validOrder = order.filter((role, index) => batterRoles.includes(role) && order.indexOf(role) === index);
  const missingRoles = batterRoles.filter((role) => !validOrder.includes(role));
  return [...validOrder, ...missingRoles].slice(0, batterRoles.length);
}

function getMenuLineupOrder(team) {
  const order = getSelectionLineupOrder(menuSelection[team]);
  menuSelection[team][lineupOrderKey] = order;
  return order;
}

function createMatchPitcher(player) {
  const pitcherInfo = { ...player };
  pitcherInfo.currentStamina = getPitcherMaxStamina(pitcherInfo);
  pitcherInfo.pitchCount = 0;
  return pitcherInfo;
}

function getPitcherMaxStamina(player) {
  return Math.max(1, player?.stamina ?? 6) * staminaTuning.pointsPerRating;
}

function getPitcherStaminaPercent(player = activePitcher) {
  const max = getPitcherMaxStamina(player);
  return clamp((player?.currentStamina ?? max) / max, 0, 1);
}

function getPitcherStaminaState(player = activePitcher) {
  const percent = getPitcherStaminaPercent(player);
  if (percent >= 0.7) return { label: "元気", percent };
  if (percent >= 0.5) return { label: "少し疲れ", percent };
  if (percent >= 0.3) return { label: "疲労", percent };
  if (percent >= 0.1) return { label: "バテ気味", percent };
  return { label: "バテバテ", percent };
}

function getPitcherGameStaminaText(player = activePitcher) {
  const max = getPitcherMaxStamina(player);
  const current = clamp(player?.currentStamina ?? max, 0, max);
  return `${Math.round(current)}/${Math.round(max)}`;
}

function getStaminaFatigueScore(player = activePitcher) {
  return clamp((0.7 - getPitcherStaminaPercent(player)) / 0.7, 0, 1);
}

function getStaminaSpeedDrop(player = activePitcher) {
  const fastKmh = player?.fastKmh ?? 150;
  return fastKmh * (1 - getStaminaAbilityMultiplier(player));
}

function getStaminaAbilityMultiplier(player = activePitcher) {
  const percent = getPitcherStaminaPercent(player);
  return staminaTuning.abilityDrops.find((entry) => percent >= entry.threshold)?.multiplier ?? 0.3;
}

function getStaminaChangeMultiplier(player = activePitcher, exhaustedMultiplier = 1) {
  const multiplier = getStaminaAbilityMultiplier(player);
  return getPitcherStaminaPercent(player) < 0.1 ? multiplier * exhaustedMultiplier : multiplier;
}

function adjustPitcherStamina(player, amount) {
  if (!player || !Number.isFinite(amount)) return;
  const max = getPitcherMaxStamina(player);
  player.currentStamina = clamp((player.currentStamina ?? max) + amount, 0, max);
}

function consumePitchStamina(player, pitch) {
  if (isAnyPracticeMode()) return;
  adjustPitcherStamina(player, -(pitch?.staminaCost ?? 2) * staminaTuning.pitchCostMultiplier);
}

function consumePitchVariationStamina(axis) {
  if (isAnyPracticeMode() || !ball.inPitch) return;
  const pitch = pitchTypes[currentPitchType];
  if (!pitch) return;
  const isHorizontal = axis === "horizontal";
  const flag = isHorizontal ? "horizontalVariationStaminaCharged" : "verticalVariationStaminaCharged";
  if (ball[flag]) return;
  ball[flag] = true;
  const rate = isHorizontal ? staminaTuning.horizontalVariationCostRate : staminaTuning.verticalVariationCostRate;
  adjustPitcherStamina(activePitcher, -(pitch.staminaCost ?? 2) * rate * staminaTuning.pitchCostMultiplier);
}

function applyHomeRunPitcherStaminaPenalty(player) {
  if (isAnyPracticeMode()) return;
  adjustPitcherStamina(player, -staminaTuning.homerRunPenalty);
}

function recordPitchThrown(player) {
  if (!player) return;
  player.pitchCount = (player.pitchCount ?? 0) + 1;
  recordCurrentPitcherStat("pitchCount", 1, player);
}

function createEmptyBases() {
  return Object.fromEntries(baseNames.map((base) => [base, null]));
}

function createDefenseState() {
  return {
    active: false,
    startTime: 0,
    duration: 1500,
    fielders: [],
    chosenFielder: null,
    target: { x: field.centerX, y: field.plateY },
    origin: { x: field.plateX, y: field.plateY },
    ballPath: { x: 0, y: -1 },
    battedBall: null,
    landingTarget: null,
    outcome: null,
    runner: null,
    baseRunners: [],
    throw: null,
    heldBallBase: null,
    heldBallSince: null,
    lastManualThrowCommandTime: null,
    homeRunFireworks: null,
    homeRunFireworksSoundPlayed: false,
    resolved: false,
    outCallShown: false,
    completedForceOutBases: [],
    judgmentLog: [],
    outEvents: [],
    forceTargets: [],
    manualFielding: false,
    manualFieldingComplete: false,
    manualFieldingMissed: false,
    manualCatchRadius: 0,
    unifiedCircleCatchComplete: false,
    trailResetAtLanding: false,
    catchVisual: null,
    landingMissVisual: null
  };
}

function resetDefenseState() {
  defenseState = createDefenseState();
  xStadiumPrompt = { active: false, offeredDefenseStartTime: null, goRect: null, dontRect: null };
}

function readMenu() {
  gameMode = modeSelect.value;
  applyStadiumPreset(stadiumSelect?.value || "fireworks");
  const nextAwayPreset = teamPresets[awayPresetSelect?.value] ? awayPresetSelect.value : defaultTeamPresetBySide.away;
  const nextHomePreset = teamPresets[homePresetSelect?.value] ? homePresetSelect.value : defaultTeamPresetBySide.home;
  if (nextAwayPreset !== selectedTeamPresetBySide.away) applyTeamPresetMenuSelection("away", nextAwayPreset);
  if (nextHomePreset !== selectedTeamPresetBySide.home) applyTeamPresetMenuSelection("home", nextHomePreset);
  practicePitcherControl = practicePitcherControlSelect?.value === "manual" ? "manual" : "auto";
  practicePitcherType = ["A", "B", "C"].includes(practicePitcherTypeSelect?.value) ? practicePitcherTypeSelect.value : "A";
  pitchingPracticeBatterType = ["A", "B"].includes(pitchingPracticeBatterTypeSelect?.value) ? pitchingPracticeBatterTypeSelect.value : "A";
  practiceBatterId = practiceBatterSelect?.value || practiceBatterId || batters[0]?.id || "";
  practicePitcherId = practicePitcherSelect?.value || practicePitcherId || getPracticePitchers()[0]?.id || "";
  homeRunDerbyPlayerCount = homeRunDerbyPlayerCountSelect?.value === "2" ? 2 : 1;
  homeRunDerbyBatterIds = {
    away: homeRunDerbyAwayBatterSelect?.value || homeRunDerbyBatterIds.away || getAllHitters()[0]?.id || "",
    home: homeRunDerbyHomeBatterSelect?.value || homeRunDerbyBatterIds.home || getAllHitters()[0]?.id || ""
  };
  firstBatTeam = firstBatSelect.value;
  maxInnings = Number(inningsSelect.value);
  if (gameMode === "watch") {
    if (p1DefenseSelect) p1DefenseSelect.value = "manual";
    if (p2DefenseSelect) p2DefenseSelect.value = "manual";
  }
  defenseControlMode = gameMode === "watch"
    ? { away: "auto", home: "auto" }
    : {
        away: getDefenseRunControlMode(p1DefenseSelect?.value),
        home: getDefenseRunControlMode(p2DefenseSelect?.value)
      };
  selected = createSelectedTeams(menuSelection);
}

function isBattingPracticeMode() {
  return gameMode === "practice";
}

function isPitchingPracticeMode() {
  return gameMode === "pitchPractice";
}

function isHomeRunDerbyMode() {
  return gameMode === "homerDerby";
}

function isAnyPracticeMode() {
  return isBattingPracticeMode() || isPitchingPracticeMode() || isHomeRunDerbyMode();
}

function getDefenseRunControlMode(value) {
  return value === "auto" && gameMode === "watch" ? "auto" : "manual";
}

function findById(list, id) {
  return list.find((item) => item.id === id) || list[0];
}

function getTeamActivePitcher(team) {
  const teamState = selected[team];
  return teamState.pitchers.find((pitcherInfo) => pitcherInfo.id === teamState.activePitcherId) || teamState.pitchers[0];
}

function createPitcherGameRecords() {
  return { away: {}, home: {} };
}

function createInningScores() {
  return { away: [], home: [] };
}

function createReliefBoostState() {
  return { away: null, home: null };
}

function createBatterGameRecords() {
  return { away: {}, home: {} };
}

function getBatterRecordKey(player) {
  return player?.id || player?.name || "unknown";
}

function ensureBatterGameRecord(team, player = activeBatter, role = getCurrentBatterRole(team)) {
  if (isAnyPracticeMode() || !team || !player) return null;
  const teamRecords = batterGameRecords[team] || (batterGameRecords[team] = {});
  const key = getBatterRecordKey(player);
  const lineup = selected?.[team]?.batters || [];
  const lineupIndex = lineup.findIndex((entry) => entry?.player?.id === player.id);
  const existingCount = Object.keys(teamRecords).length;
  const record = teamRecords[key] || {
    id: player.id,
    name: player.name,
    role: role || lineup[lineupIndex]?.role || "",
    order: lineupIndex >= 0 ? lineupIndex : lineup.length + existingCount,
    entrySequence: existingCount,
    appeared: true,
    plateAppearances: 0,
    atBats: 0,
    runs: 0,
    hits: 0,
    rbi: 0,
    doubles: 0,
    triples: 0,
    homeRuns: 0,
    strikeouts: 0,
    walks: 0,
    hbp: 0,
    sacrificeBunts: 0,
    sacrificeFlies: 0,
    errorsReached: 0,
    timesReachedBase: 0
  };
  record.name = player.name;
  if (role) record.role = role;
  record.appeared = true;
  teamRecords[key] = record;
  return record;
}

function initializeBatterGameRecords() {
  batterGameRecords = createBatterGameRecords();
  teamIds.forEach((team) => {
    selected?.[team]?.batters?.forEach((entry) => ensureBatterGameRecord(team, entry.player, entry.role));
  });
}

function recordBatterPlateAppearance(resultType, options = {}) {
  if (isAnyPracticeMode()) return;
  const record = ensureBatterGameRecord(battingTeam, activeBatter, getCurrentBatterRole(battingTeam));
  if (!record) return;
  const runsBattedIn = Math.max(0, options.rbi ?? options.runs ?? 0);
  record.plateAppearances += 1;
  record.rbi += runsBattedIn;
  markReliefBoostBatterFaced(fieldingTeam(), activePitcher);
  clearPinchHitBoost(activeBatter);
  if (resultType === "walk") {
    record.walks += 1;
    record.timesReachedBase += 1;
    return;
  }
  if (resultType === "hbp") {
    record.hbp += 1;
    record.timesReachedBase += 1;
    return;
  }
  if (resultType === "sacrificeBunt") {
    record.sacrificeBunts += 1;
    return;
  }
  if (resultType === "sacrificeFly") {
    record.sacrificeFlies += 1;
    return;
  }
  record.atBats += 1;
  if (resultType === "strikeout") record.strikeouts += 1;
  if (resultType === "error") {
    record.errorsReached += 1;
    record.timesReachedBase += 1;
  }
  if (resultType === "fielderChoice") record.timesReachedBase += 1;
  if (scoringHitTypes.has(resultType)) {
    record.hits += 1;
    record.timesReachedBase += 1;
    if (resultType === "double") record.doubles += 1;
    if (resultType === "triple") record.triples += 1;
    if (resultType === "homer") record.homeRuns += 1;
  }
}

function recordBatterRunScored(team, runner) {
  if (isAnyPracticeMode() || !team || !runner) return;
  const record = ensureBatterGameRecord(team, runner, null);
  if (record) record.runs += 1;
}

function recordLineScoreRuns(team, runs) {
  if (isAnyPracticeMode() || !team || !runs || runs <= 0) return;
  const index = Math.max(0, inning - 1);
  if (!inningScores[team]) inningScores[team] = [];
  inningScores[team][index] = (inningScores[team][index] || 0) + runs;
}

function recordScoringRunners(team, runners) {
  if (isAnyPracticeMode() || !Array.isArray(runners)) return;
  runners.forEach((runner) => recordBatterRunScored(team, runner));
}

function getScoreLead(team, scoreState = scores) {
  const opponent = team === "away" ? "home" : "away";
  return (scoreState?.[team] ?? 0) - (scoreState?.[opponent] ?? 0);
}

function ensurePitcherGameRecord(team, pitcherInfo = getTeamActivePitcher(team)) {
  if (isAnyPracticeMode() || !team || !pitcherInfo) return null;
  const teamRecords = pitcherGameRecords[team] || (pitcherGameRecords[team] = {});
  const existingCount = Object.keys(teamRecords).length;
  const entryLead = getScoreLead(team);
  const entryRunnersOn = baseNames.reduce((total, base) => total + (bases?.[base] ? 1 : 0), 0);
  const record = teamRecords[pitcherInfo.id] || {
    id: pitcherInfo.id,
    name: pitcherInfo.name,
    outs: 0,
    strikeouts: 0,
    hitsAllowed: 0,
    runsAllowed: 0,
    earnedRunsAllowed: 0,
    walksAllowed: 0,
    pitchCount: pitcherInfo.pitchCount ?? 0,
    save: false,
    win: false,
    loss: false,
    hold: false,
    holdCandidate: false,
    started: existingCount === 0,
    entryLead,
    entryRunnersOn,
    entryScores: { away: scores.away, home: scores.home },
    exitLead: null,
    order: existingCount
  };
  record.name = pitcherInfo.name;
  teamRecords[pitcherInfo.id] = record;
  return record;
}

function recordPitcherStat(team, pitcherInfo, stat, amount = 1) {
  if (isAnyPracticeMode() || !stat || !amount) return;
  const record = ensurePitcherGameRecord(team, pitcherInfo);
  if (record) record[stat] = (record[stat] || 0) + amount;
}

function applyPitcherEventStaminaPenalty(player, amount) {
  if (isAnyPracticeMode() || !player || !amount || amount <= 0) return;
  adjustPitcherStamina(player, -amount);
}

function recordPitcherHitAllowed(team, pitcherInfo, amount = 1) {
  recordPitcherStat(team, pitcherInfo, "hitsAllowed", amount);
  applyPitcherEventStaminaPenalty(pitcherInfo, staminaTuning.hitPenalty * amount);
}

function recordCurrentPitcherWalkAllowed(amount = 1, pitcherInfo = activePitcher) {
  recordCurrentPitcherStat("walksAllowed", amount, pitcherInfo);
  applyPitcherEventStaminaPenalty(pitcherInfo, staminaTuning.walkPenalty * amount);
}

function recordCurrentPitcherStat(stat, amount = 1, pitcherInfo = activePitcher) {
  recordPitcherStat(fieldingTeam(), pitcherInfo, stat, amount);
}

function recordPitcherOuts(team, pitcherInfo, outs) {
  if (isAnyPracticeMode() || !outs || outs <= 0) return;
  recordPitcherStat(team, pitcherInfo, "outs", outs);
}

function recordCurrentPitcherOuts(outs, pitcherInfo = activePitcher) {
  recordPitcherOuts(fieldingTeam(), pitcherInfo, outs);
}

function formatPitcherInningsFromOuts(outs) {
  const fullInnings = Math.floor((outs || 0) / 3);
  const partialOuts = (outs || 0) % 3;
  return `${fullInnings}.${partialOuts}`;
}

function getPitcherGameRecordEntries(team) {
  return Object.values(pitcherGameRecords[team] || {})
    .sort((a, b) => a.order - b.order)
    .map((record) => ({
      ...record,
      innings: formatPitcherInningsFromOuts(record.outs)
    }));
}

function buildPitcherGameRecordLines(team) {
  const entries = getPitcherGameRecordEntries(team);
  if (!entries.length) return ["登板なし"];
  return entries.map((record) => `${record.name}投手 ${record.innings}イニング${formatPitcherDecisionLabels(record)} / 投球数${record.pitchCount || 0} / 奪三振${record.strikeouts || 0} / 被安打${record.hitsAllowed || 0} / 失点${record.runsAllowed || 0} / 四死球${record.walksAllowed || 0}`);
}

function formatPitcherDecisionLabels(record) {
  const labels = [];
  if (record.win) labels.push("勝利");
  if (record.loss) labels.push("敗戦");
  if (record.hold) labels.push("ホールド");
  if (record.save) labels.push("セーブ");
  return labels.length ? ` / ${labels.join(" / ")}` : "";
}

function isSaveSituationForRecord(record) {
  if (!record || record.started || record.outs < 1 || record.entryLead <= 0) return false;
  const threeRunLeadSave = record.entryLead <= 3 && record.outs >= 3;
  const tyingRunThreatSave = record.entryLead <= (record.entryRunnersOn || 0) + 2;
  return threeRunLeadSave || tyingRunThreatSave;
}

function finalizePitcherAppearance(team, pitcherInfo = getTeamActivePitcher(team)) {
  const record = ensurePitcherGameRecord(team, pitcherInfo);
  if (!record || record.finalized) return record;
  record.exitLead = getScoreLead(team);
  const leadHeld = record.exitLead >= 0;
  const leadEntryHold = record.entryLead > 0
    && leadHeld
    && (
      (record.entryLead <= 3 && record.outs >= 3)
      || record.entryLead <= (record.entryRunnersOn || 0) + 2
      || record.outs >= 9
    );
  const tieEntryHold = record.entryLead === 0 && leadHeld && (record.runsAllowed || 0) === 0 && record.outs > 0;
  record.holdCandidate = !record.started && record.outs > 0 && !record.save && (leadEntryHold || tieEntryHold);
  record.finalized = true;
  return record;
}

function recordPitcherDecisionEvent(team, runs, beforeScores, afterScores, responsiblePitcherIds = []) {
  if (isAnyPracticeMode() || !runs || runs <= 0) return;
  const fielding = team === "away" ? "home" : "away";
  const scoringPitcher = getTeamActivePitcher(team);
  const allowingPitcher = getTeamActivePitcher(fielding);
  for (let offset = 1; offset <= runs; offset += 1) {
    pitcherDecisionEvents.push({
      team,
      runNumber: (beforeScores?.[team] ?? 0) + offset,
      scoresBefore: { ...beforeScores },
      scoresAfter: {
        ...beforeScores,
        [team]: (beforeScores?.[team] ?? 0) + offset
      },
      scoringPitcherId: scoringPitcher?.id,
      allowingPitcherId: responsiblePitcherIds[offset - 1] || allowingPitcher?.id,
      fieldingTeam: fielding,
      inning,
      half
    });
  }
}

function recordResponsiblePitcherRunsAllowed(fielding, runs, responsiblePitcherIds = [], staminaPenaltyPerRun = staminaTuning.runPenalty, earnedRunFlags = []) {
  if (isAnyPracticeMode() || !runs || runs <= 0) return;
  const fallbackPitcher = getTeamActivePitcher(fielding);
  const totals = new Map();
  const earnedTotals = new Map();
  for (let index = 0; index < runs; index += 1) {
    const pitcherId = responsiblePitcherIds[index] || fallbackPitcher?.id;
    if (!pitcherId) continue;
    totals.set(pitcherId, (totals.get(pitcherId) || 0) + 1);
    if (earnedRunFlags[index] !== false) {
      earnedTotals.set(pitcherId, (earnedTotals.get(pitcherId) || 0) + 1);
    }
  }
  totals.forEach((amount, pitcherId) => {
    const pitcherInfo = selected?.[fielding]?.pitchers?.find((entry) => entry.id === pitcherId) || fallbackPitcher;
    recordPitcherStat(fielding, pitcherInfo, "runsAllowed", amount);
    const earnedAmount = earnedTotals.get(pitcherId) || 0;
    if (earnedAmount > 0) recordPitcherStat(fielding, pitcherInfo, "earnedRunsAllowed", earnedAmount);
    applyPitcherEventStaminaPenalty(pitcherInfo, staminaPenaltyPerRun * amount);
  });
}

function markPitcherSaveIfEligible() {
  if (isAnyPracticeMode() || scores.away === scores.home) return null;
  const winner = scores.away > scores.home ? "away" : "home";
  const loser = winner === "away" ? "home" : "away";
  const finalPitcher = getTeamActivePitcher(winner);
  const record = ensurePitcherGameRecord(winner, finalPitcher);
  if (!record || record.started || record.outs < 1) return null;
  const finalLead = scores[winner] - scores[loser];
  if (finalLead <= 0 || record.entryLead <= 0) return null;
  if (!isSaveSituationForRecord(record)) return null;
  record.save = true;
  return record;
}

function getPitcherRecordById(team, pitcherId) {
  return pitcherGameRecords?.[team]?.[pitcherId] || null;
}

function chooseWinningPitcherRecord(winner, preferredPitcherId) {
  const preferred = getPitcherRecordById(winner, preferredPitcherId);
  const starterWinMinimumOuts = getStarterWinMinimumOuts();
  if (preferred && (!preferred.started || preferred.outs >= starterWinMinimumOuts)) return preferred;
  const entries = Object.values(pitcherGameRecords[winner] || {}).sort((a, b) => a.order - b.order);
  return entries.find((record) => !record.started && record.outs > 0)
    || entries.find((record) => record.started && record.outs >= starterWinMinimumOuts)
    || null;
}

function getStarterWinMinimumOuts() {
  if (maxInnings >= 9) return 15;
  if (maxInnings >= 5) return 9;
  return 3;
}

function markPitcherWinLossAndHolds() {
  if (isAnyPracticeMode()) return;
  if (scores.away === scores.home) {
    markPitcherHolds();
    return;
  }
  const winner = scores.away > scores.home ? "away" : "home";
  const loser = winner === "away" ? "home" : "away";
  const decisiveRun = (scores[loser] || 0) + 1;
  const decisiveEvent = pitcherDecisionEvents.find((event) => event.team === winner && event.runNumber === decisiveRun);
  if (!decisiveEvent) {
    markPitcherHolds();
    return;
  }
  const winningRecord = chooseWinningPitcherRecord(winner, decisiveEvent?.scoringPitcherId);
  const losingRecord = getPitcherRecordById(loser, decisiveEvent?.allowingPitcherId);
  if (winningRecord) {
    winningRecord.win = true;
    winningRecord.save = false;
  }
  if (losingRecord) losingRecord.loss = true;
  markPitcherHolds();
}

function markPitcherHolds() {
  ["away", "home"].forEach((team) => {
    Object.values(pitcherGameRecords[team] || {}).forEach((record) => {
      if (record.holdCandidate && !record.win && !record.loss && !record.save) {
        record.hold = true;
      } else {
        record.hold = false;
      }
    });
  });
}

function getTeamCatcher(team) {
  const player = selected?.[team]?.batters?.find((entry) => entry.role === catcherRole)?.player || findById(catchers, menuSelection?.[team]?.[catcherRole]);
  return applyBenchDefenseRoleAdjustment(player, catcherRole);
}

function getTeamCatcherArm(team) {
  return getTeamCatcher(team)?.arm ?? stealTuning.catcherArm;
}

function canUsePitcher(team, pitcherId) {
  const teamState = selected[team];
  return teamState.pitchers.some((pitcherInfo) => pitcherInfo.id === pitcherId)
    && teamState.activePitcherId !== pitcherId
    && !teamState.usedPitcherIds.includes(pitcherId);
}

function isCpuPitcherTeam(team) {
  if (isAnyPracticeMode()) return false;
  if (gameMode === "watch") return true;
  if (gameMode === "single") return team !== playerTeam;
  return false;
}

function getNextUnusedPitcher(team) {
  const teamState = selected?.[team];
  if (!teamState?.pitchers?.length) return null;
  return teamState.pitchers.find((pitcherInfo) => canUsePitcher(team, pitcherInfo.id)) || null;
}

function getHalfInningKey() {
  return `${inning}-${half}`;
}

function startReliefBoost(team, pitcherInfo) {
  if (isAnyPracticeMode() || !team || !pitcherInfo || fieldingTeam() !== team) return;
  reliefBoostState[team] = {
    pitcherId: pitcherInfo.id,
    halfInningKey: getHalfInningKey(),
    battersFaced: 0
  };
}

function clearReliefBoostForTeam(team) {
  if (team && reliefBoostState?.[team]) reliefBoostState[team] = null;
}

function isReliefBoostActive(player = activePitcher) {
  if (isAnyPracticeMode() || !player) return false;
  const team = fieldingTeam();
  const state = reliefBoostState?.[team];
  return Boolean(state
    && state.pitcherId === player.id
    && state.halfInningKey === getHalfInningKey());
}

function getReliefPitcherBoostMultiplier(player = activePitcher) {
  if (!isReliefBoostActive(player)) return 1;
  const state = reliefBoostState[fieldingTeam()];
  return (state?.battersFaced ?? 0) <= 0 ? 1.2 : 1.05;
}

function markReliefBoostBatterFaced(team = fieldingTeam(), pitcherInfo = activePitcher) {
  const state = reliefBoostState?.[team];
  if (!state || !pitcherInfo || state.pitcherId !== pitcherInfo.id || state.halfInningKey !== getHalfInningKey()) return;
  state.battersFaced += 1;
}

function maybeAutoChangeCpuPitcher(team = fieldingTeam()) {
  if (gamePhase !== "playing" || !isCpuPitcherTeam(team)) return false;
  if (isPitching || pendingPitch || ball.active || (stealState.active && !stealState.resolved)) return false;
  const currentPitcher = getTeamActivePitcher(team);
  const currentStamina = currentPitcher?.currentStamina ?? getPitcherMaxStamina(currentPitcher);
  const maxStamina = getPitcherMaxStamina(currentPitcher);
  const changeThreshold = maxStamina * (staminaTuning.cpuAutoChangeThresholdRatio ?? 0.5);
  if (!Number.isFinite(currentStamina) || !Number.isFinite(changeThreshold) || currentStamina >= changeThreshold) return false;
  const nextPitcher = getNextUnusedPitcher(team);
  if (!nextPitcher) return false;
  return changePitcher(team, nextPitcher.id);
}

function changePitcher(team, pitcherId) {
  if (!canUsePitcher(team, pitcherId)) return false;
  finalizePitcherAppearance(team, getTeamActivePitcher(team));
  selected[team].activePitcherId = pitcherId;
  selected[team].usedPitcherIds.push(pitcherId);
  const nextPitcher = getTeamActivePitcher(team);
  ensurePitcherGameRecord(team, nextPitcher);
  startReliefBoost(team, nextPitcher);
  if (fieldingTeam() === team) {
    setMatchup();
    resetBall();
    if (isHomeRunVisionField()) {
      startReliefCarEntrance(team, activePitcher);
      message = `${teamLabel(team)} 投手交代: ${activePitcher.name}、リリーフカーで登場`;
    } else {
      message = `${teamLabel(team)} 投手交代: ${activePitcher.name}`;
    }
  }
  updateSidebarAbilityPanels();
  renderPitcherChangeControls();
  return true;
}

function getAvailableBenchEntries(team) {
  const teamState = selected?.[team];
  if (!teamState?.bench?.length) return [];
  const used = new Set(teamState.usedBenchIds || []);
  return teamState.bench.filter((entry) => entry?.player && !used.has(entry.player.id));
}

function markBenchUsed(team, playerId) {
  const teamState = selected?.[team];
  if (!teamState || !playerId) return;
  if (!Array.isArray(teamState.usedBenchIds)) teamState.usedBenchIds = [];
  if (!teamState.usedBenchIds.includes(playerId)) teamState.usedBenchIds.push(playerId);
}

function findLineupEntryByPlayerId(team, playerId) {
  return selected?.[team]?.batters?.find((entry) => entry?.player?.id === playerId) || null;
}

function substituteLineupPlayer(team, lineupEntry, benchPlayer, reason = "sub") {
  if (!lineupEntry || !benchPlayer) return false;
  lineupEntry.player = {
    ...benchPlayer,
    fromBench: true,
    substitutionReason: reason,
    pinchHitBoostActive: reason === "pinchHit",
    benchSourceKind: benchPlayer.benchSourceKind || getBenchSourceKind(benchPlayer)
  };
  ensureBatterGameRecord(team, lineupEntry.player, lineupEntry.role);
  markBenchUsed(team, benchPlayer.id);
  if (team === battingTeam || team === fieldingTeam()) setMatchup();
  updateSidebarAbilityPanels();
  return true;
}

function substituteCurrentBatter(team, benchPlayer) {
  if (team !== battingTeam || !benchPlayer) return false;
  const lineup = selected?.[team]?.batters;
  if (!lineup?.length) return false;
  const index = battingOrderIndex[team] % lineup.length;
  const ok = substituteLineupPlayer(team, lineup[index], benchPlayer, "pinchHit");
  if (ok) message = `${teamLabel(team)} PH: ${benchPlayer.name}`;
  return ok;
}

function isPinchHitBoostActive(batterInfo = activeBatter) {
  return Boolean(batterInfo?.pinchHitBoostActive && batterInfo === activeBatter && battingTeam && !isAnyPracticeMode());
}

function clearPinchHitBoost(batterInfo = activeBatter) {
  if (batterInfo?.pinchHitBoostActive) batterInfo.pinchHitBoostActive = false;
}

function substituteRunner(team, baseName, benchPlayer) {
  if (team !== battingTeam || !baseNames.includes(baseName) || !benchPlayer || !bases?.[baseName]) return false;
  const oldRunner = bases[baseName];
  const lineupEntry = findLineupEntryByPlayerId(team, oldRunner.id);
  if (!lineupEntry) return false;
  const nextRunner = makeBaseRunner(benchPlayer);
  nextRunner.responsiblePitcherId = oldRunner.responsiblePitcherId;
  nextRunner.responsibleTeam = oldRunner.responsibleTeam;
  nextRunner.unearnedRun = oldRunner.unearnedRun;
  bases[baseName] = nextRunner;
  const ok = substituteLineupPlayer(team, lineupEntry, benchPlayer, "pinchRun");
  if (ok) message = `${teamLabel(team)} PR: ${benchPlayer.name}`;
  return ok;
}

function substituteDefender(team, role, benchPlayer) {
  if (team !== fieldingTeam() || !defensiveBatterRoles.includes(role) || !benchPlayer) return false;
  const lineupEntry = selected?.[team]?.batters?.find((entry) => entry.role === role);
  const ok = substituteLineupPlayer(team, lineupEntry, benchPlayer, "defense");
  if (ok) message = `${teamLabel(team)} DEF: ${getMenuRoleLabel(role)} ${benchPlayer.name}`;
  return ok;
}

function startReliefCarEntrance(team, pitcherInfo = activePitcher) {
  if (!getCurrentStadium().hasReliefCar) return;
  reliefCarEffect = {
    active: true,
    startTime: performance.now(),
    duration: 3600,
    pitcherName: pitcherInfo?.name || "",
    team
  };
}

function findSelectedById(list, id) {
  return id ? list.find((item) => item.id === id) || null : null;
}

function isCatcherRole(role) {
  return role === catcherRole;
}

function isDhRole(role) {
  return role === dhRole;
}

function isCatcherLikePlayer(player) {
  return Boolean(player && !("infieldDefense" in player) && !("outfieldDefense" in player));
}

function isRodgersPlayer(player) {
  return player?.id === "rodgers";
}

function getRodgersFielderProfile() {
  return batters.find((player) => player.id === "rodgers") || null;
}

function getRodgersCatcherProfile() {
  return catchers.find((player) => player.id === "rodgers") || null;
}

function resolveRodgersForRole(player, role = null) {
  if (!isRodgersPlayer(player)) return player;
  const fielder = getRodgersFielderProfile() || player;
  const catcher = getRodgersCatcherProfile() || player;
  return {
    ...player,
    power: fielder.power ?? catcher.power ?? player.power,
    meet: fielder.meet ?? catcher.meet ?? player.meet,
    run: fielder.run ?? catcher.run ?? player.run,
    infieldDefense: fielder.infieldDefense ?? player.infieldDefense ?? player.fielding ?? 5,
    outfieldDefense: fielder.outfieldDefense ?? player.outfieldDefense ?? player.fielding ?? 5,
    arm: isCatcherRole(role) ? (catcher.arm ?? player.arm ?? 5) : (fielder.arm ?? player.arm ?? 5),
    cost: fielder.cost ?? catcher.cost ?? player.cost
  };
}

function getBenchSourceKind(player) {
  return isCatcherLikePlayer(player) ? "catcher" : "fielder";
}

function createBenchPlayerForMatch(player) {
  if (!player) return null;
  const resolved = resolveRodgersForRole(player, null);
  return {
    ...resolved,
    benchSourceKind: getBenchSourceKind(player)
  };
}

function applyBenchDefenseRoleAdjustment(player, role) {
  if (!player) return player;
  const adjusted = { ...resolveRodgersForRole(player, role) };
  if (isRodgersPlayer(adjusted) || !adjusted.fromBench) return adjusted;
  if (adjusted.benchSourceKind === "catcher" && !isCatcherRole(role) && !isDhRole(role)) {
    adjusted.arm = Math.max(1, (adjusted.arm ?? 5) - 1);
    adjusted.infieldDefense = 2;
    adjusted.outfieldDefense = 2;
    adjusted.fielding = 2;
  } else if (adjusted.benchSourceKind === "fielder" && isCatcherRole(role)) {
    adjusted.arm = Math.max(1, (adjusted.arm ?? 5) - 4);
  }
  return adjusted;
}

function getAllHitters() {
  const hitters = [...batters, ...Object.values(originalMenuBatters), ...catchers];
  const usedIds = new Set();
  return hitters.filter((player) => {
    if (!player?.id) return false;
    if (usedIds.has(player.id)) return false;
    usedIds.add(player.id);
    return true;
  });
}

function getPlayerListForRole(role) {
  if (benchRoles.includes(role)) return getAllHitters();
  if (isDhRole(role)) return getAllHitters();
  return isCatcherRole(role) ? catchers : [...batters, ...Object.values(originalMenuBatters)];
}

function getPlayerListForKind(kind) {
  if (kind === "pitcher") return pitchers;
  if (kind === "catcher") return catchers;
  if (kind === "hitter") return getAllHitters();
  return [...batters, ...Object.values(originalMenuBatters)];
}

function getChooserKindForRole(role) {
  if (pitcherRoles.includes(role)) return "pitcher";
  if (benchRoles.includes(role)) return "hitter";
  if (isDhRole(role)) return "hitter";
  return isCatcherRole(role) ? "catcher" : "batter";
}

function getMenuPlayerCost(list, id) {
  return findSelectedById(list, id)?.cost ?? 0;
}

function getMenuFielderTeamCost(team, selection = menuSelection[team]) {
  return batterRoles.reduce((total, role) => total + getMenuPlayerCost(getPlayerListForRole(role), selection[role]), 0);
}

function getMenuPitcherTeamCost(team, selection = menuSelection[team]) {
  return pitcherRoles.reduce((total, role) => total + getMenuPlayerCost(pitchers, selection[role]), 0);
}

function getMenuBenchTeamCost(team, selection = menuSelection[team]) {
  return benchRoles.reduce((total, role) => total + getMenuPlayerCost(getPlayerListForRole(role), selection?.[role]), 0);
}

function getMenuTeamCost(team, selection = menuSelection[team]) {
  return getMenuFielderTeamCost(team, selection) + getMenuPitcherTeamCost(team, selection) - getMenuSamePlayerCostExemption(selection);
}

function getMenuTeamCostWithCandidate(team, role, kind, playerId) {
  const selection = {
    ...menuSelection[team],
    [lineupOrderKey]: getMenuLineupOrder(team),
    [role]: playerId
  };
  return getMenuTeamCost(team, selection);
}

function getMenuBenchCostWithCandidate(team, role, playerId) {
  const selection = {
    ...menuSelection[team],
    [lineupOrderKey]: getMenuLineupOrder(team),
    [role]: playerId
  };
  return getMenuBenchTeamCost(team, selection);
}

function isBenchSinglePlayerCostOverLimit(team, playerId) {
  if (!doesMenuPointLimitApply(team) || !playerId) return false;
  const cost = getMenuPlayerCost(getPlayerListForRole("bench1"), playerId);
  return cost > benchSinglePlayerCostLimit;
}

function hasMenuBenchSinglePlayerCostOverLimit(team, selection = menuSelection[team]) {
  if (!doesMenuPointLimitApply(team) || !selection) return false;
  return benchRoles.some((role) => isBenchSinglePlayerCostOverLimit(team, selection[role]));
}

function isMenuTeamComplete(team) {
  const selection = menuSelection[team];
  return pitcherRoles.every((role) => findSelectedById(pitchers, selection[role]))
    && batterRoles.every((role) => findSelectedById(getPlayerListForRole(role), selection[role]))
    && !hasMenuSamePlayerConflict(team);
}

function hasMenuPitcherCatcherConflict(team, selection = menuSelection[team]) {
  return Boolean(selection?.[catcherRole] && pitcherRoles.some((role) => selection?.[role] === selection[catcherRole]));
}

function hasMenuSamePlayerConflict(team, selection = menuSelection[team]) {
  if (!selection) return false;
  return hasDuplicateSelectionInRoles(selection, pitcherRoles)
    || hasDuplicateSelectionInRoles(selection, [...batterRoles, ...benchRoles]);
}

function hasDuplicateSelectionInRoles(selection, roles) {
  const usedIds = new Set();
  return roles.some((role) => {
    const playerId = selection[role];
    if (!playerId) return false;
    if (usedIds.has(playerId)) return true;
    usedIds.add(playerId);
    return false;
  });
}

function getMenuSamePlayerCostExemption(selection = null) {
  if (!selection) return 0;
  const rodgersPitcherCosts = pitcherRoles
    .filter((role) => selection[role] === "rodgers")
    .map(() => getMenuPlayerCost(pitchers, "rodgers"));
  const rodgersBatterCosts = batterRoles
    .filter((role) => selection[role] === "rodgers")
    .map((role) => getMenuPlayerCost(getPlayerListForRole(role), "rodgers"));
  if (!rodgersPitcherCosts.length || rodgersBatterCosts.length !== 1) return 0;
  return Math.min(rodgersPitcherCosts[0], rodgersBatterCosts[0]);
}

function updateMenuPointStatus() {
  const awayCost = getMenuTeamCost("away");
  const homeCost = getMenuTeamCost("home");
  const awayBenchCost = getMenuBenchTeamCost("away");
  const homeBenchCost = getMenuBenchTeamCost("home");
  const skipAwayLimit = !doesMenuPointLimitApply("away");
  const skipHomeLimit = !doesMenuPointLimitApply("home");
  const skipAwayBenchLimit = !doesMenuPointLimitApply("away");
  const skipHomeBenchLimit = !doesMenuPointLimitApply("home");
  const awayOver = doesMenuPointLimitApply("away") && awayCost > teamPointLimit;
  const homeOver = doesMenuPointLimitApply("home") && homeCost > teamPointLimit;
  const awayBenchOver = !skipAwayBenchLimit && awayBenchCost > benchCostLimit;
  const homeBenchOver = !skipHomeBenchLimit && homeBenchCost > benchCostLimit;
  const awayBenchSingleOver = hasMenuBenchSinglePlayerCostOverLimit("away");
  const homeBenchSingleOver = hasMenuBenchSinglePlayerCostOverLimit("home");
  const isIncomplete = !isMenuTeamComplete("away") || !isMenuTeamComplete("home");
  const isOver = awayOver || homeOver || awayBenchOver || homeBenchOver || awayBenchSingleOver || homeBenchSingleOver;
  renderPointStatus(awayPitcherPointStatus, skipAwayLimit ? "合計P 制限なし" : "合計P", awayCost, skipAwayLimit ? null : teamPointLimit, awayOver);
  renderPointStatus(awayFielderPointStatus, skipAwayBenchLimit ? "Bench 制限なし" : "Bench", awayBenchCost, skipAwayBenchLimit ? null : benchCostLimit, awayBenchOver || awayBenchSingleOver);
  renderPointStatus(homePitcherPointStatus, skipHomeLimit ? "合計P 制限なし" : "合計P", homeCost, skipHomeLimit ? null : teamPointLimit, homeOver);
  renderPointStatus(homeFielderPointStatus, skipHomeBenchLimit ? "Bench 制限なし" : "Bench", homeBenchCost, skipHomeBenchLimit ? null : benchCostLimit, homeBenchOver || homeBenchSingleOver);
  startButton.disabled = isOver || isIncomplete;
}

function renderPointStatus(element, label, cost, limit, isOver) {
  if (!element) return;
  element.textContent = limit == null ? `${label} ${cost}` : `${label} ${cost}/${limit}`;
  element.classList.toggle("over-limit", isOver);
  element.classList.remove("point-status-hidden");
}

function hidePointStatus(element) {
  if (!element) return;
  element.textContent = "";
  element.classList.add("point-status-hidden");
}

function getMenuRoleLabel(role) {
  if (role === "bench1") return "\u63a7\u3048\u91ce\u624b1";
  if (role === "bench2") return "\u63a7\u3048\u91ce\u624b2";
  if (role === "bench3") return "\u63a7\u3048\u91ce\u624b3";
  if (role === "pitcher") return "先発投手";
  if (role === "pitcher2") return "控え投手1";
  if (role === "pitcher3") return "控え投手2";
  if (role === "pitcher4") return "控え投手3";
  if (role === "pitcher5") return "控え投手4";
  if (role === "SS") return "ショート";
  if (role === "2B") return "セカンド";
  if (role === "L") return "レフト";
  if (role === "C") return "センター";
  if (role === "CA") return "捕手";
  if (role === "DH") return "DH";
  return "ライト";
}

function getLineupCardId(team, role) {
  const side = team === "away" ? "away" : "home";
  if (role === "bench1") return `${side}Bench1Card`;
  if (role === "bench2") return `${side}Bench2Card`;
  if (role === "bench3") return `${side}Bench3Card`;
  if (role === "pitcher") return `${side}PitcherCard`;
  if (role === "pitcher2") return `${side}Pitcher2Card`;
  if (role === "pitcher3") return `${side}Pitcher3Card`;
  if (role === "pitcher4") return `${side}Pitcher4Card`;
  if (role === "pitcher5") return `${side}Pitcher5Card`;
  return `${side}Batter${role}Card`;
}

function getLineupCard(team, role) {
  return document.getElementById(getLineupCardId(team, role));
}

function getLineupSlotNumber(team, role) {
  return getMenuLineupOrder(team).indexOf(role) + 1;
}

function moveMenuLineupRoleToSlot(team, role, slotIndex) {
  if (isMenuTeamLocked(team)) return false;
  const order = getMenuLineupOrder(team);
  const currentIndex = order.indexOf(role);
  const targetIndex = clamp(slotIndex, 0, order.length - 1);
  if (currentIndex < 0 || currentIndex === targetIndex) return false;
  order.splice(currentIndex, 1);
  order.splice(targetIndex, 0, role);
  menuSelection[team][lineupOrderKey] = order;
  return true;
}

function swapMenuLineupPlayers(team, firstRole, secondRole) {
  if (isMenuTeamLocked(team)) return false;
  if (!team || !batterRoles.includes(firstRole) || !batterRoles.includes(secondRole) || firstRole === secondRole) return false;
  if (getChooserKindForRole(firstRole) !== getChooserKindForRole(secondRole)) return false;
  const firstPlayerId = menuSelection[team][firstRole];
  menuSelection[team][firstRole] = menuSelection[team][secondRole];
  menuSelection[team][secondRole] = firstPlayerId;
  return true;
}

function changeLineupSlotPosition(team, oldRole, newRole) {
  if (isMenuTeamLocked(team)) return false;
  if (!team || !batterRoles.includes(oldRole) || !batterRoles.includes(newRole) || oldRole === newRole) return false;
  if (getChooserKindForRole(oldRole) !== getChooserKindForRole(newRole)) return false;
  const order = getMenuLineupOrder(team);
  const oldIndex = order.indexOf(oldRole);
  const newIndex = order.indexOf(newRole);
  if (oldIndex < 0 || newIndex < 0) return false;
  const oldPlayerId = menuSelection[team][oldRole];
  menuSelection[team][oldRole] = menuSelection[team][newRole];
  menuSelection[team][newRole] = oldPlayerId;
  order[oldIndex] = newRole;
  order[newIndex] = oldRole;
  menuSelection[team][lineupOrderKey] = order;
  return true;
}

function updateLineupCardShell(team, role) {
  const card = getLineupCard(team, role);
  if (!card) return;
  const isBatter = batterRoles.includes(role);
  const isBench = benchRoles.includes(role);
  const isPitcher = pitcherRoles.includes(role);
  batterRoles.forEach((batterRole) => card.classList.remove(`field-role-${batterRole}`));
  benchRoles.forEach((benchRole) => card.classList.remove(`bench-role-${benchRole}`));
  pitcherRoles.forEach((pitcherRole) => card.classList.remove(`pitcher-role-${pitcherRole}`));
  card.classList.toggle("lineup-slot", isBatter);
  card.classList.toggle("field-symbol", isBatter || isBench);
  card.classList.toggle("pitcher-list-item", isPitcher);
  card.classList.toggle("lineup-order-pending", activeLineupOrderPicker?.team === team && activeLineupOrderPicker?.role === role);
  card.classList.toggle("lineup-slot-dragging", false);
  card.draggable = isBatter && !isMenuTeamLocked(team);
  if (isBatter) {
    const slotNumber = getLineupSlotNumber(team, role);
    card.classList.add(`field-role-${role}`);
    card.dataset.slotIndex = String(slotNumber - 1);
    card.style ||= {};
    card.style.order = "";
    card.setAttribute("aria-label", `${teamLabel(team)} ${slotNumber}番 ${getMenuRoleLabel(role)}`);
  } else {
    if (isBench) card.classList.add(`bench-role-${role}`);
    if (isPitcher) card.classList.add(`pitcher-role-${role}`);
    card.draggable = false;
    card.style ||= {};
    card.style.order = "";
  }
}

function getBatterDefenseRating(player, role = null) {
  player = applyBenchDefenseRoleAdjustment(player, role);
  if (role && infielderRoles.includes(role)) return player.infieldDefense ?? player.fielding ?? 5;
  if (role && outfielderRoles.includes(role)) return player.outfieldDefense ?? player.fielding ?? 5;
  if (role && isCatcherRole(role)) return player.arm ?? player.fielding ?? 5;
  if (role && isDhRole(role)) return 0;
  return Math.max(player.infieldDefense ?? player.fielding ?? 5, player.outfieldDefense ?? player.fielding ?? 5);
}

function getChooserPlayerSummary(player, kind, role = null) {
  if (kind === "pitcher") {
    return `球速 ${player.fastKmh} / 制球 ${player.control} / 球威 ${player.stuff} / スタ ${player.stamina ?? 6} / 獲得P ${player.cost ?? 5}`;
  }
  if (kind === "catcher" || isCatcherRole(role) || isCatcherLikePlayer(player)) {
    return `パ ${player.power} / ミ ${player.meet} / 走 ${player.run} / 肩 ${player.arm ?? 5}`;
  }
  return `パ ${player.power} / ミ ${player.meet} / 走 ${player.run} / 内 ${player.infieldDefense ?? 5} / 外 ${player.outfieldDefense ?? 5} / 肩 ${player.arm ?? 5}`;
}

function getChooserDefenseClass(player, key) {
  const infield = player.infieldDefense ?? player.fielding ?? 5;
  const outfield = player.outfieldDefense ?? player.fielding ?? 5;
  if (infield === outfield) return "";
  if (key === "infieldDefense" && infield > outfield) return "defense-strong-infield";
  if (key === "outfieldDefense" && outfield > infield) return "defense-strong-outfield";
  return "";
}

function chooserStatRow(label, value, sortKey, options = {}) {
  const className = [options.className, sortKey ? "sortable-stat" : "", chooserSortState.key === sortKey ? "sort-active" : ""]
    .filter(Boolean)
    .join(" ");
  return statRow(label, value, { ...options, sortKey, className });
}

function chooserHandRow(label, value, handValue) {
  const className = ["sortable-stat", chooserSortState.key === "hand" && chooserSortState.hand === handValue ? "sort-active" : ""]
    .filter(Boolean)
    .join(" ");
  return statRow(label, value, { sortKey: "hand", sortHand: handValue, className });
}

function chooserSpeedRow(label, value, sortKey) {
  return speedRow(label, value, { sortKey, className: chooserSortState.key === sortKey ? "sortable-stat sort-active" : "sortable-stat" });
}

function chooserStaminaStatRow(value, sortKey) {
  return staminaStatRow(value, { sortKey, className: chooserSortState.key === sortKey ? "sortable-stat sort-active" : "sortable-stat" });
}

function getChooserPlayerStats(player, kind, role = null) {
  if (kind === "pitcher") {
    return [
      chooserSpeedRow("球速", player.fastKmh, "fastKmh"),
      chooserStaminaStatRow(player.stamina ?? 6, "stamina"),
      pitchCross(player, true),
      chooserStatRow("制球", player.control, "control"),
      chooserStatRow("球威", player.stuff, "stuff"),
      chooserStatRow("守備", player.fielding ?? 5, "fielding")
    ].join("");
  }
  if (kind === "catcher" || isCatcherRole(role) || isCatcherLikePlayer(player)) {
    return [
      chooserStatRow("パワー", player.power, "power"),
      chooserStatRow("ミート", player.meet, "meet"),
      chooserStatRow("走塁", player.run, "run"),
      chooserStatRow("肩", player.arm ?? 5, "arm")
    ].join("");
  }
  const infield = player.infieldDefense ?? player.fielding ?? 5;
  const outfield = player.outfieldDefense ?? player.fielding ?? 5;
  return [
    chooserStatRow("パワー", player.power, "power"),
    chooserStatRow("ミート", player.meet, "meet"),
    chooserStatRow("走塁", player.run, "run"),
    chooserStatRow("内野", infield, "infieldDefense", { className: getChooserDefenseClass(player, "infieldDefense") }),
    chooserStatRow("外野", outfield, "outfieldDefense", { className: getChooserDefenseClass(player, "outfieldDefense") }),
    chooserStatRow("肩", player.arm ?? 5, "arm")
  ].join("");
}

function createDefaultOriginalMenuBatter(team = "away") {
  return {
    id: originalMenuBatterIds[team] || `original-${team}-batter`,
    name: "オリジナル",
    bats: "R",
    power: 5,
    meet: 5,
    run: 4,
    infieldDefense: 4,
    outfieldDefense: 4,
    arm: 3,
    cost: 5,
    originalMenuPlayer: true
  };
}

function shouldShowOriginalBatterCreator(kind) {
  return kind === "batter" || kind === "hitter";
}

function getOriginalMenuBatter(team) {
  if (!originalMenuBatters[team]) originalMenuBatters[team] = createDefaultOriginalMenuBatter(team);
  return originalMenuBatters[team];
}

function getOriginalBatterBudget(player) {
  return clamp(Number(player?.cost ?? 5), 1, 10) * 5;
}

function getOriginalBatterPointTotal(player) {
  return ["power", "meet", "run", "infieldDefense", "outfieldDefense", "arm"]
    .reduce((total, key) => total + Number(player?.[key] ?? 1), 0);
}

function renderOriginalBatterCreator(team, role, kind) {
  if (!shouldShowOriginalBatterCreator(kind)) return "";
  const player = getOriginalMenuBatter(team);
  const total = getOriginalBatterPointTotal(player);
  const budget = getOriginalBatterBudget(player);
  const remaining = budget - total;
  const selectedClass = player.id === menuSelection[team][role] ? " selected" : "";
  const overClass = remaining < 0 ? " original-over-budget" : "";
  const stepper = (field, value, min, max, className = "") => `
    <span class="original-stepper ${className}">
      <button class="original-step-button" type="button" data-original-step-field="${field}" data-original-step="1" aria-label="${field}を増やす">▲</button>
      <input class="original-step-value" type="text" data-original-field="${field}" data-original-min="${min}" data-original-max="${max}" value="${escapeHtml(value)}" readonly tabindex="-1">
      <button class="original-step-button" type="button" data-original-step-field="${field}" data-original-step="-1" aria-label="${field}を減らす">▼</button>
    </span>
  `;
  const statInput = (field, label, value) => `
    <label class="stat-row original-stat-row">
      <span class="stat-name">${label}</span>
      ${stepper(field, value, 1, 12, "original-stat-stepper")}
      <span class="ability-bar" aria-hidden="true"><span class="ability-bar-fill" style="width:${clamp(value / 12, 0, 1) * 100}%"></span></span>
    </label>
  `;
  return `
    <form class="original-player-creator${selectedClass}${overClass}" data-team="${escapeHtml(team)}" data-role="${escapeHtml(role)}" data-kind="${escapeHtml(kind)}">
      <strong class="chooser-player-title original-player-title">
        <span class="original-name-side">
          <input class="original-name-input" type="text" data-original-field="name" maxlength="18" value="${escapeHtml(player.name)}" aria-label="名前">
          <select class="original-hand-select" data-original-field="bats" aria-label="打席">
            <option value="R" ${player.bats === "R" ? "selected" : ""}>右</option>
            <option value="L" ${player.bats === "L" ? "selected" : ""}>左</option>
          </select>
        </span>
        <span class="original-title-numbers">
          <span class="original-point-status" data-original-point-status>${remaining}</span>
          <em class="original-cost-badge">${stepper("cost", player.cost, 1, 10, "original-cost-stepper")}P</em>
        </span>
      </strong>
      <div class="chooser-card-stats compact-stats original-card-stats">
        ${statInput("power", "パワー", player.power)}
        ${statInput("meet", "ミート", player.meet)}
        ${statInput("run", "走塁", player.run)}
        ${statInput("infieldDefense", "内野", player.infieldDefense)}
        ${statInput("outfieldDefense", "外野", player.outfieldDefense)}
        ${statInput("arm", "肩", player.arm)}
      </div>
    </form>
  `;
}

function readOriginalBatterForm(form) {
  const team = form?.dataset?.team || form?.getAttribute?.("data-team") || "away";
  const current = getOriginalMenuBatter(team);
  const next = { ...current };
  form?.querySelectorAll?.("[data-original-field]")?.forEach((input) => {
    const field = input.dataset.originalField;
    if (field === "name") {
      next.name = String(input.value || "オリジナル").trim().slice(0, 18) || "オリジナル";
    } else if (field === "bats") {
      next.bats = input.value === "L" ? "L" : "R";
    } else if (field === "cost") {
      next.cost = sanitizeNumber(input.value, 1, 10, current.cost ?? 5);
    } else {
      next[field] = sanitizeNumber(input.value, 1, 12, current[field] ?? 1);
    }
  });
  next.originalMenuPlayer = true;
  return next;
}

function updateOriginalBatterCreatorState(form) {
  if (!form) return null;
  const preview = readOriginalBatterForm(form);
  const total = getOriginalBatterPointTotal(preview);
  const budget = getOriginalBatterBudget(preview);
  const remaining = budget - total;
  const status = form.querySelector("[data-original-point-status]");
  if (status) status.textContent = String(remaining);
  form.querySelectorAll("[data-original-field]").forEach((input) => {
    const field = input.dataset.originalField;
    if (!["power", "meet", "run", "infieldDefense", "outfieldDefense", "arm"].includes(field)) return;
    const bar = input.closest(".original-stat-row")?.querySelector(".ability-bar-fill");
    if (bar) bar.style.width = `${clamp(Number(input.value || 1) / 12, 0, 1) * 100}%`;
  });
  form.classList.toggle("original-over-budget", remaining < 0);
  return { preview, total, budget, remaining };
}

function submitOriginalBatterCreator(form) {
  const state = updateOriginalBatterCreatorState(form);
  if (!state || state.remaining < 0) return;
  const team = form.dataset?.team || form.getAttribute?.("data-team") || "away";
  const role = form.dataset?.role || form.getAttribute?.("data-role") || "";
  const kind = form.dataset?.kind || form.getAttribute?.("data-kind") || "batter";
  if (!role) return;
  const player = getOriginalMenuBatter(team);
  Object.assign(player, state.preview, { id: originalMenuBatterIds[team], originalMenuPlayer: true });
  if (isMenuPlayerUnavailable(team, role, kind, player.id)) {
    renderPlayerChooserOptions(team);
    return;
  }
  menuSelection[team][role] = player.id;
  closePlayerChooser(team);
  updateMenuAbilityPanels();
}

function renderChooserOption(player, team, role, kind) {
  const unavailable = isMenuPlayerUnavailable(team, role, kind, player.id);
  const selectedClass = player.id === menuSelection[team][role] ? " selected" : "";
  const unavailableClass = unavailable ? " unavailable" : "";
  const side = kind === "pitcher" ? handLabel(player.throws) : handLabel(player.bats);
  const currentSort = chooserSortStates[team] || chooserSortState;
  return `
    <button class="chooser-option${selectedClass}${unavailableClass}" type="button" data-team="${escapeHtml(team)}" data-role="${escapeHtml(role)}" data-player-id="${escapeHtml(player.id)}" data-kind="${escapeHtml(kind)}" ${unavailable ? "disabled" : ""}>
      <strong class="chooser-player-title"><span>${escapeHtml(player.name)} <span class="chooser-hand-sort sortable-stat${currentSort.key === "hand" && currentSort.hand === (kind === "pitcher" ? player.throws : player.bats) ? " sort-active" : ""}" data-sort-key="hand" data-sort-hand="${escapeHtml(kind === "pitcher" ? player.throws : player.bats)}">${escapeHtml(side)}</span></span><em class="sortable-stat${currentSort.key === "cost" ? " sort-active" : ""}" data-sort-key="cost">${player.cost ?? 5}P</em></strong>
      <div class="chooser-card-stats compact-stats">${getChooserPlayerStats(player, kind, role)}</div>
    </button>
  `;
}

function renderEmptyBenchChooserOption(team, role, kind) {
  const selectedClass = menuSelection[team]?.[role] ? "" : " selected";
  return `
    <button class="chooser-option${selectedClass}" type="button" data-team="${escapeHtml(team)}" data-role="${escapeHtml(role)}" data-player-id="" data-kind="${escapeHtml(kind)}">
      <strong class="chooser-player-title"><span>\u7a7a\u6b04</span><em>0P</em></strong>
      <div class="chooser-card-stats compact-stats">\u3053\u306e\u63a7\u3048\u67a0\u306f\u4f7f\u7528\u3057\u306a\u3044</div>
    </button>
  `;
}

function getChooserElements(team) {
  return team === "home"
    ? {
        pane: playerChooser?.querySelector?.('[data-chooser-team="home"]'),
        title: chooserTitleHome,
        options: chooserOptionsHome
      }
    : {
        pane: playerChooser?.querySelector?.('[data-chooser-team="away"]'),
        title: chooserTitle,
        options: chooserOptions
      };
}

function hasOpenChooserPane() {
  return teamIds.some((team) => !getChooserElements(team).pane?.classList.contains("hidden"));
}

function openPlayerChooser(card) {
  const team = card.dataset.team;
  const role = card.dataset.role;
  const kind = getChooserKindForRole(role) || card.dataset.kind;
  if (isMenuTeamLocked(team)) {
    closePlayerChooser(team);
    message = `${teamLabel(team)}はメンバー固定です`;
    return;
  }
  chooserSortStates[team] = { team, role, kind, key: "" };
  chooserSortState = chooserSortStates[team];
  const elements = getChooserElements(team);
  if (elements.title) elements.title.textContent = `${team === "away" ? "1P" : "2P"} ${teamLabel(team)} ${getMenuRoleLabel(role)}`;
  elements.pane?.classList.remove("hidden");
  renderPlayerChooserOptions(team);
  playerChooser.classList.remove("hidden");
}

function renderPlayerChooserOptions(team = chooserSortState.team) {
  const state = chooserSortStates[team] || chooserSortState;
  chooserSortState = state;
  const { role, kind } = state;
  const elements = getChooserElements(team);
  if (!elements.options || !team || !role || !kind) return;
  const list = getChooserPlayerList(kind);
  elements.options.innerHTML = [
    benchRoles.includes(role) ? renderEmptyBenchChooserOption(team, role, kind) : "",
    renderOriginalBatterCreator(team, role, kind),
    ...list.map((player) => renderChooserOption(player, team, role, kind))
  ].join("");
}

function getChooserSortValue(player, key) {
  if (!key || key === "cost") return player.cost ?? 5;
  if (key === "infieldDefense") return player.infieldDefense ?? player.fielding ?? 5;
  if (key === "outfieldDefense") return player.outfieldDefense ?? player.fielding ?? 5;
  return Number(player[key] ?? 0);
}

function getChooserPlayerHand(player, kind = chooserSortState.kind) {
  return kind === "pitcher" ? player.throws : player.bats;
}

function getChooserPlayerList(kind) {
  const source = getPlayerListForKind(kind);
  const sortKey = chooserSortState.kind === kind ? chooserSortState.key : "";
  return source
    .filter((player) => !player.originalMenuPlayer)
    .filter((player) => isMenuPlayerAllowedByPreset(chooserSortState.team, player.id))
    .map((player, index) => ({ player, index }))
    .sort((a, b) => {
      if (sortKey === "hand") {
        const hand = chooserSortState.hand;
        return (getChooserPlayerHand(b.player, kind) === hand ? 1 : 0) - (getChooserPlayerHand(a.player, kind) === hand ? 1 : 0)
          || ((b.player.cost ?? 5) - (a.player.cost ?? 5))
          || (a.index - b.index);
      }
      if (sortKey) {
        return (getChooserSortValue(b.player, sortKey) - getChooserSortValue(a.player, sortKey))
          || ((b.player.cost ?? 5) - (a.player.cost ?? 5))
          || (a.index - b.index);
      }
      return ((b.player.cost ?? 5) - (a.player.cost ?? 5)) || (a.index - b.index);
    })
    .map((entry) => entry.player);
}

function sortPlayerChooserBy(key, options = {}) {
  if (!key || playerChooser.classList.contains("hidden")) return;
  const team = options.team || chooserSortState.team;
  const state = chooserSortStates[team] || chooserSortState;
  state.key = key;
  state.hand = options.hand || "";
  chooserSortStates[team] = state;
  chooserSortState = state;
  renderPlayerChooserOptions(team);
}

function isMenuPlayerUnavailable(team, role, kind, playerId) {
  const selection = menuSelection[team];
  if (!playerId && benchRoles.includes(role)) return false;
  if (playerId === selection[role]) return false;
  if (kind !== "pitcher" && kind !== "batter" && kind !== "catcher" && kind !== "hitter") return false;
  if (!isMenuPlayerAllowedByPreset(team, playerId)) return true;
  if (isMenuPlayerOverPresetCost(team, kind, playerId)) return true;
  const duplicateRoles = kind === "pitcher" ? pitcherRoles : [...batterRoles, ...benchRoles];
  if (duplicateRoles.some((otherRole) => otherRole !== role && selection[otherRole] === playerId)) return true;
  if (benchRoles.includes(role)) {
    return doesMenuPointLimitApply(team)
      && (isBenchSinglePlayerCostOverLimit(team, playerId) || getMenuBenchCostWithCandidate(team, role, playerId) > benchCostLimit);
  }
  return doesMenuPointLimitApply(team) && getMenuTeamCostWithCandidate(team, role, kind, playerId) > teamPointLimit;
}

function closePlayerChooser(team = null) {
  if (team) {
    const elements = getChooserElements(team);
    elements.pane?.classList.add("hidden");
    if (elements.options) elements.options.innerHTML = "";
    chooserSortStates[team] = { team: "", role: "", kind: "", key: "" };
    if (!hasOpenChooserPane()) playerChooser.classList.add("hidden");
    return;
  }
  teamIds.forEach((side) => {
    const elements = getChooserElements(side);
    elements.pane?.classList.add("hidden");
    if (elements.options) elements.options.innerHTML = "";
    chooserSortStates[side] = { team: "", role: "", kind: "", key: "" };
  });
  chooserSortState = { team: "", role: "", kind: "", key: "" };
  playerChooser.classList.add("hidden");
}

function selectMenuPlayer(option) {
  const team = option.dataset.team;
  const role = option.dataset.role;
  const kind = option.dataset.kind;
  if (isMenuTeamLocked(team)) return;
  if (isMenuPlayerUnavailable(team, role, kind, option.dataset.playerId)) return;
  menuSelection[team][role] = option.dataset.playerId;
  closePlayerChooser(team);
  updateMenuAbilityPanels();
}

const menuPanelElements = {
  away: {
    pitcher: { name: awayPitcherName, stats: awayPitcherStats },
    pitcher2: { name: awayPitcher2Name, stats: awayPitcher2Stats },
    pitcher3: { name: awayPitcher3Name, stats: awayPitcher3Stats },
    pitcher4: { name: awayPitcher4Name, stats: awayPitcher4Stats },
    pitcher5: { name: awayPitcher5Name, stats: awayPitcher5Stats },
    SS: { name: awayBatterSSName, stats: awayBatterSSStats },
    "2B": { name: awayBatter2BName, stats: awayBatter2BStats },
    L: { name: awayBatterLName, stats: awayBatterLStats },
    C: { name: awayBatterCName, stats: awayBatterCStats },
    R: { name: awayBatterRName, stats: awayBatterRStats },
    CA: { name: awayBatterCAName, stats: awayBatterCAStats },
    DH: { name: awayBatterDHName, stats: awayBatterDHStats },
    bench1: { name: awayBench1Name, stats: awayBench1Stats },
    bench2: { name: awayBench2Name, stats: awayBench2Stats },
    bench3: { name: awayBench3Name, stats: awayBench3Stats }
  },
  home: {
    pitcher: { name: homePitcherName, stats: homePitcherStats },
    pitcher2: { name: homePitcher2Name, stats: homePitcher2Stats },
    pitcher3: { name: homePitcher3Name, stats: homePitcher3Stats },
    pitcher4: { name: homePitcher4Name, stats: homePitcher4Stats },
    pitcher5: { name: homePitcher5Name, stats: homePitcher5Stats },
    SS: { name: homeBatterSSName, stats: homeBatterSSStats },
    "2B": { name: homeBatter2BName, stats: homeBatter2BStats },
    L: { name: homeBatterLName, stats: homeBatterLStats },
    C: { name: homeBatterCName, stats: homeBatterCStats },
    R: { name: homeBatterRName, stats: homeBatterRStats },
    CA: { name: homeBatterCAName, stats: homeBatterCAStats },
    DH: { name: homeBatterDHName, stats: homeBatterDHStats },
    bench1: { name: homeBench1Name, stats: homeBench1Stats },
    bench2: { name: homeBench2Name, stats: homeBench2Stats },
    bench3: { name: homeBench3Name, stats: homeBench3Stats }
  }
};

function renderMenuPlayerPanel(team, role) {
  const panel = menuPanelElements[team][role];
  if (pitcherRoles.includes(role)) {
    updateLineupCardShell(team, role);
    renderMenuPitcherSlot(findSelectedById(pitchers, menuSelection[team][role]), panel.name, panel.stats);
    const card = getLineupCard(team, role);
    const picker = card?.querySelector?.(".position-picker");
    if (picker) picker.textContent = getPitcherRoleShortLabel(role);
    return;
  }
  if (benchRoles.includes(role)) {
    updateLineupCardShell(team, role);
    renderMenuBenchSlot(findSelectedById(getPlayerListForRole(role), menuSelection[team][role]), panel.name, panel.stats);
    const card = getLineupCard(team, role);
    const picker = card?.querySelector?.(".position-picker");
    if (picker) picker.textContent = getMenuRoleLabel(role);
    return;
  }
  updateLineupCardShell(team, role);
  renderMenuFielderSymbol(team, role, findSelectedById(getPlayerListForRole(role), menuSelection[team][role]), panel.name, panel.stats);
  const card = getLineupCard(team, role);
  const picker = card?.querySelector?.(".position-picker");
  if (picker) picker.textContent = getMenuRoleLabel(role);
}

function getPitcherRoleShortLabel(role) {
  if (role === "pitcher") return "先発";
  const index = pitcherRoles.indexOf(role);
  return index > 0 ? `控え${index}` : "控え";
}

function renderMenuPitcherSlot(player, nameElement, statsElement) {
  nameElement.textContent = player?.name ?? "未選択";
  statsElement.innerHTML = `
    <div class="menu-simple-cost">
      <span>獲得P</span>
      <strong>${player?.cost ?? 0}</strong>
    </div>
  `;
}

function renderMenuBenchSlot(player, nameElement, statsElement) {
  nameElement.textContent = player?.name ?? "Not selected";
  statsElement.innerHTML = `
    <div class="menu-simple-cost">
      <span>Bench</span>
      <strong>${player?.cost ?? 0}pt</strong>
    </div>
  `;
}

function renderMenuFielderSymbol(team, role, player, nameElement, statsElement) {
  nameElement.textContent = player?.name ?? "未選択";
  statsElement.innerHTML = `
    <div class="field-symbol-info">
      <button class="lineup-order-button" type="button" data-team="${team}" data-role="${role}">${getLineupSlotNumber(team, role)}番</button>
      <strong>${player?.cost ?? 0}pt</strong>
    </div>
    ${renderLineupOrderPicker(team, role)}
  `;
}

function resetMenuTeam(team) {
  if (!menuSelection[team]) return;
  if (isMenuTeamLocked(team)) {
    applyTeamPresetMenuSelection(team, getSelectedTeamPresetId(team));
    activeLineupOrderPicker = null;
    closePlayerChooser();
    updateMenuAbilityPanels();
    return;
  }
  [...pitcherRoles, ...batterRoles, ...benchRoles].forEach((role) => {
    menuSelection[team][role] = "";
  });
  menuSelection[team][lineupOrderKey] = [...batterRoles];
  activeLineupOrderPicker = null;
  closePlayerChooser();
  updateMenuAbilityPanels();
}

function autoFillMenuTeam(team) {
  if (!menuSelection[team]) return;
  applyTeamPresetMenuSelection(team, getSelectedTeamPresetId(team));
  activeLineupOrderPicker = null;
  closePlayerChooser();
  updateMenuAbilityPanels();
}

function renderLineupOrderPicker(team, role) {
  if (activeLineupOrderPicker?.team !== team || activeLineupOrderPicker?.role !== role) return "";
  const currentSlot = getLineupSlotNumber(team, role);
  return `
    <div class="lineup-order-picker" aria-label="打順選択">
      ${batterRoles.map((_, index) => {
        const orderNumber = index + 1;
        return `<button class="lineup-order-choice${orderNumber === currentSlot ? " selected" : ""}" type="button" data-team="${team}" data-role="${role}" data-order-index="${index}">${orderNumber}</button>`;
      }).join("")}
    </div>
  `;
}

function updateMenuAbilityPanels() {
  teamIds.forEach((team) => {
    pitcherRoles.forEach((role) => renderMenuPlayerPanel(team, role));
    batterRoles.forEach((role) => renderMenuPlayerPanel(team, role));
    benchRoles.forEach((role) => renderMenuPlayerPanel(team, role));
  });
  updateMenuPointStatus();
  updateSidebarAbilityPanels();
}

function renderBatterPanel(player, nameElement, statsElement, role = null) {
  nameElement.textContent = `${player.name} ${handLabel(player.bats)} ${player.cost ?? 5}P`;
  const isCatcher = isCatcherRole(role) || isCatcherLikePlayer(player);
  statsElement.innerHTML = (isCatcher ? [
    statRow("パワー", player.power),
    statRow("ミート", player.meet),
    statRow("走塁", player.run),
    statRow("肩", player.arm ?? 5)
  ] : [
    statRow("パワー", player.power),
    statRow("ミート", player.meet),
    statRow("走塁", player.run),
    statRow("内野", player.infieldDefense ?? player.fielding ?? 5),
    statRow("外野", player.outfieldDefense ?? player.fielding ?? 5),
    statRow("肩", player.arm ?? 5)
  ]).join("");
}

function renderPitcherPanel(player, nameElement, statsElement) {
  nameElement.textContent = `${player.name} ${handLabel(player.throws)} ${player.cost ?? 5}P`;
  statsElement.innerHTML = [
    speedRow("球速", player.fastKmh),
    pitchCross(player),
    statRow("制球", player.control),
    statRow("球威", player.stuff),
    staminaStatRow(player.stamina ?? 6),
    statRow("守備", player.fielding ?? 5)
  ].join("");
}

function updateSidebarAbilityPanels() {
  if (!activeBatterName || !activePitcherName || !activeBatterStats || !activePitcherStats) return;
  activePitcherName.textContent = `${activePitcher.name} ${handLabel(activePitcher.throws)}`;
  activePitcherStats.innerHTML = [
    speedRow("球速", activePitcher.fastKmh),
    staminaBar(activePitcher),
    statRow("投球数", activePitcher.pitchCount ?? 0),
    pitchCross(activePitcher),
    statRow("制球", activePitcher.control),
    statRow("球威", activePitcher.stuff)
  ].join("");

  activeBatterName.textContent = `${activeBatter.name} ${handLabel(activeBatter.bats)}`;
  const activeRole = isAnyPracticeMode() ? null : getCurrentBatterRole(battingTeam);
  const activeIsCatcher = isCatcherRole(activeRole) || isCatcherLikePlayer(activeBatter);
  activeBatterStats.innerHTML = (activeIsCatcher ? [
    statRow("パワー", activeBatter.power),
    statRow("ミート", activeBatter.meet),
    statRow("走塁", activeBatter.run),
    statRow("肩", activeBatter.arm ?? 5),
    statRow("打席", handLabel(activeBatterSide))
  ] : [
    statRow("パワー", activeBatter.power),
    statRow("ミート", activeBatter.meet),
    statRow("走塁", activeBatter.run),
    statRow("内野", activeBatter.infieldDefense ?? activeBatter.fielding ?? 5),
    statRow("外野", activeBatter.outfieldDefense ?? activeBatter.fielding ?? 5),
    statRow("肩", activeBatter.arm ?? 5),
    statRow("打席", handLabel(activeBatterSide))
  ]).join("");
  renderPitcherChangeControls();
}

function renderPitcherChangeControls() {
  if (!pitcherChangeControls || !selected?.away || gamePhase === "menu") {
    if (pitcherChangeControls) pitcherChangeControls.innerHTML = "";
    return;
  }
  const team = fieldingTeam();
  const teamState = selected[team];
  pitcherChangeControls.innerHTML = `
    <div class="pitcher-change-title">${teamLabel(team)} 投手交代</div>
    <div class="pitcher-change-buttons">
      ${teamState.pitchers.map((pitcherInfo) => {
        const isCurrent = pitcherInfo.id === teamState.activePitcherId;
        const used = teamState.usedPitcherIds.includes(pitcherInfo.id);
        const disabled = isCurrent || used || gamePhase !== "playing";
        const label = isCurrent ? "登板中" : used ? "登板済" : "交代";
        return `<button class="pitcher-change-button" type="button" data-team="${team}" data-pitcher-id="${pitcherInfo.id}" ${disabled ? "disabled" : ""}>
          <strong>${pitcherInfo.name}</strong><span>${label}</span>
        </button>`;
      }).join("")}
    </div>
  `;
}

function statRow(label, value, options = {}) {
  const numericValue = Number(value);
  const showAbilityBar = Number.isFinite(numericValue) && numericValue >= 1 && numericValue <= 10;
  const sortAttr = options.sortKey ? ` data-sort-key="${escapeHtml(options.sortKey)}"` : "";
  const className = ["stat-row", options.className].filter(Boolean).join(" ");
  const valueHtml = showAbilityBar
    ? `
      <span class="stat-value-main">${value}</span>
      <span class="ability-bar" aria-hidden="true">
        <span class="ability-bar-fill" style="width: ${clamp(numericValue, 0, 10) * 10}%"></span>
      </span>
    `
    : value;
  return `
    <div class="${className}"${sortAttr}>
      <span class="stat-name">${label}</span>
      <span class="stat-value${showAbilityBar ? " stat-value-with-bar" : ""}">${valueHtml}</span>
    </div>
  `;
}

function staminaStatRow(value, options = {}) {
  const sortAttr = options.sortKey ? ` data-sort-key="${escapeHtml(options.sortKey)}"` : "";
  const className = ["stat-row", "stamina-stat-row", options.className].filter(Boolean).join(" ");
  return `
    <div class="${className}"${sortAttr}>
      <span class="stat-name">スタミナ</span>
      <span class="stat-value stat-value-with-bar">
        <span class="stat-value-main">${value}</span>
        <span class="ability-bar" aria-hidden="true">
          <span class="ability-bar-fill" style="width: ${clamp(Number(value) || 0, 0, 10) * 10}%"></span>
        </span>
      </span>
    </div>
  `;
}

function costBadge(value) {
  return `
    <div class="cost-badge">
      <span class="cost-label">獲得</span>
      <strong class="cost-value">${value}</strong>
      <span class="cost-unit">pt</span>
    </div>
  `;
}

function speedRow(label, value, options = {}) {
  const sortAttr = options.sortKey ? ` data-sort-key="${escapeHtml(options.sortKey)}"` : "";
  const className = ["stat-row", "speed-row", options.className].filter(Boolean).join(" ");
  return `
    <div class="${className}"${sortAttr}>
      <span class="stat-name">${label}</span>
      <span class="stat-value">${value} km/h</span>
    </div>
  `;
}

function staminaBar(player) {
  const state = getPitcherStaminaState(player);
  const percent = Math.round(state.percent * 100);
  const staminaText = getPitcherGameStaminaText(player);
  return `
    <div class="stamina-row">
      <div class="stamina-row-header">
        <span class="stat-name">スタミナ</span>
        <em>${state.label}</em>
        <strong class="stamina-value">${staminaText}</strong>
      </div>
      <div class="stamina-track" aria-label="スタミナ ${percent}%">
        <div class="stamina-fill stamina-${getStaminaClass(state.percent)}" style="width: ${percent}%"></div>
        <span class="stamina-mark stamina-mark-70"></span>
        <span class="stamina-mark stamina-mark-50"></span>
        <span class="stamina-mark stamina-mark-30"></span>
        <span class="stamina-mark stamina-mark-10"></span>
      </div>
    </div>
  `;
}

function getStaminaClass(percent) {
  if (percent >= 0.7) return "fresh";
  if (percent >= 0.5) return "light";
  if (percent >= 0.3) return "tired";
  return "empty";
}

function pitchCross(player, sortable = false) {
  const sortAttr = (key) => sortable ? ` data-sort-key="${key}"` : "";
  const cellClass = (baseClass, key) => ["cross-cell", baseClass, sortable ? "sortable-stat" : "", sortable && chooserSortState.key === key ? "sort-active" : ""].filter(Boolean).join(" ");
  return `
    <div class="pitch-cross" aria-label="変化能力">
      <div class="${cellClass("cross-up", "slowChange")}"${sortAttr("slowChange")}><span data-short-label="減">減速</span><strong>${player.slowChange}</strong></div>
      <div class="${cellClass("cross-left", "leftBreak")}"${sortAttr("leftBreak")}><span>左</span><strong>${player.leftBreak}</strong></div>
      <div class="cross-core">変化</div>
      <div class="${cellClass("cross-right", "rightBreak")}"${sortAttr("rightBreak")}><span>右</span><strong>${player.rightBreak}</strong></div>
      <div class="${cellClass("cross-down", "fastChange")}"${sortAttr("fastChange")}><span data-short-label="加">加速</span><strong>${player.fastChange}</strong></div>
    </div>
  `;
}

function startGame(modeOverride = null) {
  readMenu();
  if (modeOverride) gameMode = modeOverride;
  if (!isAnyPracticeMode() && (!isMenuTeamComplete("away") || !isMenuTeamComplete("home"))) {
    message = "全選手を選択してください";
    updateMenuPointStatus();
    return;
  }
  if (!isAnyPracticeMode() && ((doesMenuPointLimitApply("away") && getMenuTeamCost("away") > teamPointLimit) || (doesMenuPointLimitApply("home") && getMenuTeamCost("home") > teamPointLimit) || (doesMenuPointLimitApply("away") && getMenuBenchTeamCost("away") > benchCostLimit) || (doesMenuPointLimitApply("home") && getMenuBenchTeamCost("home") > benchCostLimit) || hasMenuBenchSinglePlayerCostOverLimit("away") || hasMenuBenchSinglePlayerCostOverLimit("home"))) {
    message = `獲得ポイントは各チーム合計${teamPointLimit}以内`;
    updateMenuPointStatus();
    return;
  }
  practiceActiveBatter = (isBattingPracticeMode() || isPitchingPracticeMode()) ? findById(getAllHitters(), practiceBatterId) : null;
  practiceActivePitcher = (isBattingPracticeMode() || isPitchingPracticeMode()) ? createMatchPitcher(findById(getPracticePitchers(), practicePitcherId)) : null;
  homeRunDerbyState = isHomeRunDerbyMode()
    ? {
      ...createHomeRunDerbyState(),
      active: true,
      playerCount: homeRunDerbyPlayerCount,
      batters: { ...homeRunDerbyBatterIds }
    }
    : createHomeRunDerbyState();
  scores = { away: 0, home: 0 };
  inningScores = createInningScores();
  batterGameRecords = createBatterGameRecords();
  pitcherGameRecords = createPitcherGameRecords();
  pitcherDecisionEvents = [];
  bases = createEmptyBases();
  battingOrderIndex = { away: 0, home: 0 };
  lastOutBatterByTeam = { away: null, home: null };
  automaticTiebreakRunnerUsed = { away: false, home: false };
  reliefBoostState = createReliefBoostState();
  clearPendingGameEnd();
  inning = 1;
  half = "top";
  battingTeam = isPitchingPracticeMode() ? "home" : (isBattingPracticeMode() || isHomeRunDerbyMode()) ? "away" : firstBatTeam;
  count = { strikes: 0, balls: 0, outs: 0 };
  inputLockedUntil = 0;
  resetDefenseState();
  gamePhase = "playing";
  lastPitchSpeedKmh = null;
  battingFeedback.active = false;
  shell?.classList.remove("menu-open");
  menu.classList.add("hidden");
  closePlayerChooser();
  initializeBatterGameRecords();
  setMatchup();
  ensurePitcherGameRecord(fieldingTeam(), activePitcher);
  resetBall();
  resetSwing();
  message = isHomeRunDerbyMode()
    ? getHomeRunDerbyStatusMessage()
    : isBattingPracticeMode()
    ? `打撃練習: ${activeBatter.name} vs ${activePitcher.name}`
    : isPitchingPracticeMode()
      ? `投球練習: ${activePitcher.name} vs ${activeBatter.name}`
    : `${teamLabel(battingTeam)}攻撃: ${activeBatter.name} vs ${activePitcher.name}`;
  updateCurrentBgm(true);
  scheduleNextPitch();
}

function showMenu() {
  gamePhase = "menu";
  inputLockedUntil = 0;
  clearPendingGameEnd();
  shell?.classList.add("menu-open");
  menu.classList.remove("hidden");
  updateMenuAbilityPanels();
  resetBall();
  resetSwing();
  resetDefenseState();
  lastPitchSpeedKmh = null;
  message = "メニューで設定して試合開始";
  updateCurrentBgm(true);
}

function setMatchup() {
  if (isHomeRunDerbyMode()) {
    activeBatter = findById(getAllHitters(), homeRunDerbyState.batters?.[battingTeam] || homeRunDerbyBatterIds[battingTeam]);
    activePitcher = createMatchPitcher(findById(getPracticePitchers(), "battingpractice"));
  } else if (isAnyPracticeMode()) {
    activeBatter = practiceActiveBatter || findById(getAllHitters(), practiceBatterId);
    activePitcher = practiceActivePitcher || createMatchPitcher(findById(getPracticePitchers(), practicePitcherId));
    practiceActiveBatter = activeBatter;
    practiceActivePitcher = activePitcher;
  } else {
    activeBatter = getCurrentBatter(battingTeam);
    activePitcher = getTeamActivePitcher(fieldingTeam());
    ensurePitcherGameRecord(fieldingTeam(), activePitcher);
  }
  activeBatterSide = resolveBatterSide(activeBatter, activePitcher);
  setupSwitchBatterChoice();
  const box = getBatterMoveBox();
  batter.x = getInitialBatterX(box);
  batter.y = 738;
  updateSidebarAbilityPanels();
}

function getInitialBatterX(box) {
  const center = (box.left + box.right) / 2;
  if (isPlayerBatting()) return center;
  const towardPlate = activeBatterSide === "R" ? 1 : -1;
  return clamp(center + towardPlate * batterMoveTuning.cpuPlateSideNudge, box.left, box.right);
}

function getCurrentBatter(team) {
  const lineup = selected[team].batters;
  return lineup[battingOrderIndex[team] % lineup.length].player;
}

function getCurrentBatterRole(team) {
  const lineup = selected[team].batters;
  return lineup[battingOrderIndex[team] % lineup.length]?.role ?? null;
}

function advanceBattingOrder() {
  if (isAnyPracticeMode()) return;
  battingOrderIndex[battingTeam] = (battingOrderIndex[battingTeam] + 1) % selected[battingTeam].batters.length;
}

function recordLastOutBatter(team = battingTeam, player = activeBatter) {
  if (isAnyPracticeMode() || !team || !player) return;
  lastOutBatterByTeam[team] = {
    id: player.id,
    name: player.name,
    run: player.run ?? 5
  };
}

function recordLastOutFromDefense(forceOutBases = [], throwOutRunner = null) {
  if (forceOutBases.includes("first")) {
    recordLastOutBatter(battingTeam, activeBatter);
    return;
  }
  const lastForceBase = forceOutBases[forceOutBases.length - 1];
  const forcedRunner = lastForceBase
    ? (defenseState.baseRunners || []).find((runner) => runner.targetBase === lastForceBase || runner.manualTargetBase === lastForceBase)
    : null;
  recordLastOutBatter(battingTeam, throwOutRunner || forcedRunner || activeBatter);
}

function getTiebreakRunner(team) {
  const recorded = lastOutBatterByTeam[team];
  if (recorded) return recorded;
  const lineup = selected?.[team]?.batters || [];
  if (!lineup.length) return null;
  const previousIndex = (battingOrderIndex[team] - 1 + lineup.length) % lineup.length;
  return lineup[previousIndex]?.player || lineup[0]?.player || null;
}

function applyExtraInningTiebreakRunner() {
  if (isAnyPracticeMode() || inning <= maxInnings) return;
  const runner = getTiebreakRunner(battingTeam);
  bases = createEmptyBases();
  if (runner) {
    bases.second = makeBaseRunner({ ...runner, unearnedRun: true });
    automaticTiebreakRunnerUsed[battingTeam] = true;
  }
}

function resetPracticePlateAppearance() {
  if (!isAnyPracticeMode()) return false;
  bases = createEmptyBases();
  count = { strikes: 0, balls: 0, outs: 0 };
  battingOrderIndex = { away: 0, home: 0 };
  setMatchup();
  return true;
}

function getHomeRunDerbyStatusMessage() {
  if (!isHomeRunDerbyMode()) return "";
  const team = homeRunDerbyState.currentTeam || battingTeam;
  const batter = findById(getAllHitters(), homeRunDerbyState.batters?.[team] || homeRunDerbyBatterIds[team]);
  if (homeRunDerbyState.round === "sudden") {
    return `ホームラン競争 サドンデス${homeRunDerbyState.suddenRound || 1}: ${teamLabel(team)} ${batter.name}`;
  }
  const ballNumber = (homeRunDerbyState.balls?.[team] || 0) + 1;
  const bonus = ballNumber === HOME_RUN_DERBY_REGULATION_BALLS ? " / 最終球HRは2点" : "";
  return `ホームラン競争 ${teamLabel(team)} ${ballNumber}/${HOME_RUN_DERBY_REGULATION_BALLS}球 ${batter.name}${bonus}`;
}

function getHomeRunDerbyModeLabel() {
  if (!isHomeRunDerbyMode()) return "";
  return homeRunDerbyState.playerCount === 2 ? "MODE: HR競争 2人用" : "MODE: HR競争 1人用";
}

function isHomeRunDerbyLastRegulationBall(team = battingTeam) {
  return isHomeRunDerbyMode()
    && homeRunDerbyState.round === "regulation"
    && (homeRunDerbyState.balls?.[team] || 0) === HOME_RUN_DERBY_REGULATION_BALLS - 1;
}

function handleHomeRunDerbyPitchResult(isHomer, metricText = "", battedBall = null) {
  if (!isHomeRunDerbyMode() || !homeRunDerbyState.active) return false;
  const team = battingTeam;
  const points = isHomer ? (isHomeRunDerbyLastRegulationBall(team) ? 2 : 1) : 0;
  scores[team] += points;
  homeRunDerbyState.lastPitchPoints = points;
  homeRunDerbyState.lastPitchHomer = Boolean(isHomer);
  const resultText = isHomer
    ? `ホームラン +${points}`
    : "ホームランならず";
  const detailText = metricText ? ` / ${metricText}` : "";
  const adviceText = isHomeRunVisionField() ? setHomeRunVisionAdviceDisplay(battedBall, isHomer) : "";
  message = `${resultText}${detailText}${adviceText ? ` / ${adviceText}` : ""} / A ${scores.away} - B ${scores.home}`;
  showEffect(resultText, isHomer ? "#ff6f61" : "#aee7ff");
  advanceHomeRunDerbyTurn();
  resetPracticePlateAppearance();
  if (gamePhase === "playing" && !isInputLocked()) scheduleNextPitch(isHomer ? 1100 : 800);
  return true;
}

const homeRunVisionAdvicePatterns = buildHomeRunVisionAdvicePatterns();

function buildHomeRunVisionAdvicePatterns() {
  const distancePatterns = [
    { band: "near", text: "あと少しで届く打球です。最後のひと伸びを作るため、芯の少し下を強く押し込みましょう" },
    { band: "short", text: "フェンスまで距離が残っています。ゾーン中央を待って、打球の初速をもう一段上げたいです" },
    { band: "deep", text: "外野深くまでは運べています。角度と速度のどちらかを少し整えるとホームラン圏に入ります" },
    { band: "foul", text: "飛距離よりも方向が惜しい打球です。振り出しを急がず、フェアゾーンへ押し返しましょう" }
  ];
  const anglePatterns = [
    { band: "low", text: "角度が低めです。ボールの少し下を叩いて、ライナーからフライ寄りに上げましょう" },
    { band: "ideal", text: "角度はかなり良いです。この形なら、あとは芯の強さを足すだけです" },
    { band: "high", text: "角度が高く、途中で失速しています。もう少し前へ押し込むスイングが合います" },
    { band: "pop", text: "上がりすぎています。ミートポイントを少し前にして、こすらず強く捉えましょう" }
  ];
  const speedPatterns = [
    { band: "soft", text: "打球速度が不足しています。タイミングを合わせて、強振の力を最後まで伝えましょう" },
    { band: "medium", text: "打球速度は悪くありません。芯に近づけるほど、同じ角度でも大きく伸びます" },
    { band: "hard", text: "打球速度は十分です。方向と角度が整えば、次はスタンドまで届きます" },
    { band: "elite", text: "打球速度はホームラン級です。フェアゾーン中央へ乗せる意識を優先しましょう" }
  ];
  const contactPatterns = [
    { band: "center", text: "芯に近い内容です。今の狙いを続けつつ、球の下半分を逃さないようにしましょう" },
    { band: "edge", text: "芯の端に当たっています。バットの中心へ半個分だけ近づける意識が有効です" },
    { band: "timing", text: "タイミングのずれが出ています。早すぎる時は待ち、遅い時は始動を少し早めましょう" },
    { band: "miss", text: "ミートが浅い打球です。まずはゾーン中央を選び、無理な球を追わないことが近道です" }
  ];
  const patterns = [];
  distancePatterns.forEach((distance) => {
    anglePatterns.forEach((angle) => {
      speedPatterns.forEach((speed) => {
        contactPatterns.forEach((contact) => {
          patterns.push({
            distance: distance.band,
            angle: angle.band,
            speed: speed.band,
            contact: contact.band,
            text: `アドバイス: ${distance.text}。${angle.text}。${speed.text}。${contact.text}`
          });
        });
      });
    });
  });
  if (patterns.length !== 256) throw new Error("Home Run Vision advice patterns must contain 256 entries");
  return patterns;
}

function getHomeRunVisionAdvice(battedBall = null) {
  if (!battedBall) return homeRunVisionAdvicePatterns[0].text;
  const profile = battedBall.battedProfile || {};
  const fenceDistance = getFenceDistance(battedBall.target || {
    x: field.plateX,
    y: field.plateY + 42 - defenseField.fenceDistance
  });
  const flightDistance = battedBall.flightDistance ?? battedBall.landingDistance ?? fenceDistance;
  const remainingMeters = Math.max(0, Math.round(getBattedBallDistanceMeters(Math.max(0, fenceDistance - flightDistance), {
    direction: battedBall.direction,
    fenceTravelDistance: fenceDistance
  })));
  const angle = Math.round(battedBall.launchAngleDegrees ?? 0);
  const speed = Math.round(battedBall.exitSpeedKmh ?? 0);
  const feedbackScore = clamp(profile.feedbackScore ?? profile.readableQuality ?? profile.quality ?? 0.45, 0, 1);
  const timingPull = Math.abs(profile.timingPull ?? 0);
  const distanceBand = battedBall.isFoulBall
    ? "foul"
    : remainingMeters <= 8
      ? "near"
      : remainingMeters <= 22
        ? "deep"
        : "short";
  const angleBand = battedBall.isGrounder || angle < 14
    ? "low"
    : angle > 50
      ? "pop"
      : angle > 42
        ? "high"
        : "ideal";
  const speedBand = speed >= 165
    ? "elite"
    : speed >= 150
      ? "hard"
      : speed >= 135
        ? "medium"
        : "soft";
  const contactBand = feedbackScore >= 0.76
    ? "center"
    : timingPull > 0.62
      ? "timing"
      : feedbackScore >= 0.48
        ? "edge"
        : "miss";
  const best = homeRunVisionAdvicePatterns
    .map((pattern, index) => ({
      pattern,
      index,
      score:
        (pattern.distance === distanceBand ? 8 : 0)
        + (pattern.angle === angleBand ? 6 : 0)
        + (pattern.speed === speedBand ? 5 : 0)
        + (pattern.contact === contactBand ? 5 : 0)
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)[0]?.pattern;
  return best?.text || homeRunVisionAdvicePatterns[0].text;
}

function getSeaBreezeDirectionSeed(profile = null) {
  const raw = Math.sin(
    (performance.now() * 0.00037)
    + ((profile?.timingPull ?? 0) * 2.1)
    + ((profile?.exitVelocity ?? 1) * 1.7)
  );
  return raw >= 0 ? 1 : -1;
}

function applySeaBreezeToBattedBallDirection(direction, power = 0.8, profile = null, traits = {}) {
  if (!isShiokazeStadium() || !direction || traits.isBunt) return direction;
  const stadium = getCurrentStadium();
  const seed = getSeaBreezeDirectionSeed(profile);
  const lift = traits.isPopupFly ? 0.45 : 1;
  const carryFactor = clamp((power - 0.42) / 1.28, 0.25, 1);
  const sideForce = (stadium.windSideForce ?? 0.06) * lift * carryFactor * seed;
  return normalize({
    x: direction.x + sideForce,
    y: direction.y
  });
}

function appendHomeRunVisionAdviceToMessage(battedBall = null) {
  if (!isHomeRunVisionField() || !battedBall || battedBall.fenceOver || message.includes("アドバイス:")) return;
  const advice = setHomeRunVisionAdviceDisplay(battedBall, false);
  message += ` / ${advice}`;
}

function setHomeRunVisionAdviceDisplay(battedBall = null, isHomer = false) {
  const advice = isHomer
    ? "アドバイス: 文句なしのホームランです。今の打球角度と打球速度を再現できれば、次もスタンドまで届きます。"
    : getHomeRunVisionAdvice(battedBall);
  homeRunVisionDisplay = {
    advice,
    startTime: performance.now()
  };
  return advice;
}

function advanceHomeRunDerbyTurn() {
  const team = battingTeam;
  if (homeRunDerbyState.round === "regulation") {
    homeRunDerbyState.balls[team] = (homeRunDerbyState.balls[team] || 0) + 1;
    const awayDone = (homeRunDerbyState.balls.away || 0) >= HOME_RUN_DERBY_REGULATION_BALLS;
    const homeDone = (homeRunDerbyState.balls.home || 0) >= HOME_RUN_DERBY_REGULATION_BALLS;
    if (!awayDone || !homeDone) {
      const nextTeam = team === "away" ? "home" : "away";
      if ((homeRunDerbyState.balls[nextTeam] || 0) < HOME_RUN_DERBY_REGULATION_BALLS) {
        battingTeam = nextTeam;
        homeRunDerbyState.currentTeam = nextTeam;
        return;
      }
      return;
    }
    if (scores.away === scores.home) {
      homeRunDerbyState.round = "sudden";
      homeRunDerbyState.suddenRound = 1;
      homeRunDerbyState.suddenBalls = { away: 0, home: 0 };
      battingTeam = "away";
      homeRunDerbyState.currentTeam = "away";
      message = `同点、サドンデスへ / A ${scores.away} - B ${scores.home}`;
      return;
    }
    endHomeRunDerby();
    return;
  }

  homeRunDerbyState.suddenBalls[team] = 1;
  if (team === "away") {
    battingTeam = "home";
    homeRunDerbyState.currentTeam = "home";
    return;
  }
  if (scores.away !== scores.home) {
    endHomeRunDerby();
    return;
  }
  homeRunDerbyState.suddenRound += 1;
  homeRunDerbyState.suddenBalls = { away: 0, home: 0 };
  battingTeam = "away";
  homeRunDerbyState.currentTeam = "away";
  message = `サドンデス継続 / A ${scores.away} - B ${scores.home}`;
}

function endHomeRunDerby() {
  clearPendingGameEnd();
  gamePhase = "gameover";
  ball.active = false;
  pendingPitch = null;
  isPitching = false;
  autoPitchTimer = Number.POSITIVE_INFINITY;
  const result = scores.away === scores.home ? "引き分け" : scores.away > scores.home ? "A勝利" : "B勝利";
  message = `ホームラン競争終了 A ${scores.away} - B ${scores.home} ${result}`;
  showEffect(result, "#ff6f61");
}

function resolveBatterSide(batterInfo, pitcherInfo) {
  if (batterInfo.bats === "S") return pitcherInfo.throws === "R" ? "L" : "R";
  return batterInfo.bats;
}

function teamLabel(team) {
  const preset = getSelectedTeamPreset(team);
  if (preset?.label) return preset.label;
  return teams[team]?.label || team;
}

function fieldingTeam() {
  return battingTeam === "away" ? "home" : "away";
}

function isComputerControlledGameMode() {
  return gameMode === "single" || isAnyPracticeMode() || gameMode === "watch";
}

function isPlayerBatting() {
  if (isBattingPracticeMode()) return true;
  if (isHomeRunDerbyMode()) return homeRunDerbyState.playerCount === 2 || battingTeam === "away";
  if (isPitchingPracticeMode()) return false;
  if (gameMode === "watch") return false;
  return gameMode === "versus" || battingTeam === playerTeam;
}

function isPlayerPitching() {
  if (isBattingPracticeMode()) return practicePitcherControl === "manual";
  if (isHomeRunDerbyMode()) return false;
  if (isPitchingPracticeMode()) return true;
  if (gameMode === "watch") return false;
  return gameMode === "versus" || fieldingTeam() === playerTeam;
}

function isPlayerFielding() {
  return isPlayerPitching();
}

function isManualDefenseControl() {
  return false;
}

function isManualThrowControl() {
  const team = fieldingTeam();
  if (gameMode === "watch") return false;
  if (gameMode === "single" && team !== playerTeam) return false;
  return isPlayerFielding() && defenseControlMode[team] === "manual";
}

function isManualBaserunningControl(team = battingTeam) {
  if (isAnyPracticeMode()) return false;
  if (gameMode === "watch") return false;
  if (gameMode === "single" && team !== playerTeam) return false;
  return isPlayerBatting() && defenseControlMode[team] === "manual";
}

const computerJudgmentNextPitchDelay = 2000;
const sideChangeInputDelay = 2000;
const gameEndResultDelayMs = 1500;

function isInputLocked(now = performance.now()) {
  return now < inputLockedUntil;
}

function shouldAutoScheduleComputerPitch() {
  return gamePhase === "playing" && !isSwitchBatterChoicePending() && isComputerControlledGameMode() && !isPlayerPitching();
}

function scheduleNextComputerPitchAfterJudgment(delay = computerJudgmentNextPitchDelay) {
  if (isInputLocked()) return;
  if (shouldAutoScheduleComputerPitch() && !isPitching && !pendingPitch && !ball.active) {
    scheduleNextPitch(delay);
  }
}

function scheduleNextPitch(delay = 900) {
  if (isSwitchBatterChoicePending()) {
    computerPitchPlan = null;
    autoPitchTimer = Number.POSITIVE_INFINITY;
    return;
  }
  if (isComputerControlledGameMode() && !isPlayerPitching()) {
    maybeAutoChangeCpuPitcher(fieldingTeam());
    computerPitchPlan = chooseComputerPitchPlan();
    autoPitchTimer = Math.max(performance.now(), inputLockedUntil) + delay;
    return;
  }
  computerPitchPlan = null;
  autoPitchTimer = Number.POSITIVE_INFINITY;
}

function resetBall() {
  ball.x = pitcher.x;
  ball.y = pitcher.y + 18;
  ball.prevX = ball.x;
  ball.prevY = ball.y;
  ball.vx = 0;
  ball.vy = 0;
  ball.baseVx = 0;
  ball.baseVy = 0;
  ball.speedScale = 1;
  ball.active = false;
  ball.inPitch = false;
  ball.crossedPlate = false;
  ball.touchedPlate = false;
  ball.wasHit = false;
  ball.pitchStartTime = 0;
  ball.plateTime = 0;
  ball.targetX = field.plateX;
  ball.targetY = field.plateY;
  ball.spin = 0;
  ball.curvePower = 0;
  ball.staminaMistake = false;
  ball.horizontalVariationStaminaCharged = false;
  ball.verticalVariationStaminaCharged = false;
  ball.pitchAbilityMultiplier = 1;
  ball.trail = [];
  hbpPose.active = false;
  computerPitchPlan = null;
  isPitching = false;
  pendingPitch = null;
  currentPitchType = "";
  currentPitchSpeedKmh = null;
  stealState = createStealState();
  releasePitchControlLockout();
}

function clearPitchControlKeys() {
  pitchAdjustmentKeys.forEach((key) => {
    keysDown.delete(key);
    keysDown.delete(`Digit${key}`);
    keysDown.delete(`Numpad${key}`);
  });
  releasePitchControlLockout();
}

function armPitchControlLockout() {
  pitchControlLockoutKeys = new Set(pitchAdjustmentKeys.filter((key) => isKeyHeld(key)));
}

function releasePitchControlLockout(key = null) {
  if (key === null) {
    pitchControlLockoutKeys.clear();
    return;
  }
  pitchControlLockoutKeys.delete(key);
}

function releaseInactivePitchControlLockouts() {
  pitchControlLockoutKeys.forEach((key) => {
    if (!isKeyHeld(key)) pitchControlLockoutKeys.delete(key);
  });
}

function resetSwing() {
  swingState.isSwinging = false;
  swingState.startTime = 0;
  swingState.cooldownUntil = 0;
  swingState.didSwingThisPitch = false;
  swingState.computerSwingProgress = null;
  swingState.madeContact = false;
  swingState.lastCheckProgress = 0;
  swingState.type = "strong";
  swingState.isBuntStance = false;
  swingState.buntAimX = 0;
  swingState.buntAimY = 0;
  swingState.buntAimMemoryX = 0;
  swingState.buntAimMemoryY = 0;
  swingState.buntAimMemoryMagnitude = 0;
  swingState.buntAimMemoryTime = 0;
}

function resetCountOnly() {
  count.strikes = 0;
  count.balls = 0;
}

function canDeclareIntentionalWalk() {
  const canCancelSpecialWindup = isPitching && pendingPitch && currentPitchType === "special" && !ball.inPitch && !ball.active;
  return gamePhase === "playing"
    && isPlayerPitching()
    && ((!isPitching && !pendingPitch && !ball.active) || canCancelSpecialWindup)
    && !(stealState.active && !stealState.resolved);
}

function declareIntentionalWalk() {
  resetBall();
  resetSwing();
  const runs = advanceRunners("walk", activeBatter);
  recordBatterPlateAppearance("walk", { runs });
  recordCurrentPitcherWalkAllowed(1);
  resetCountOnly();
  message = runs > 0 ? `申告敬遠: ${runs}点` : "申告敬遠";
  showEffect(runs > 0 ? `申告敬遠 +${runs}` : "申告敬遠", "#aee7ff");
  if (pendingGameEnd) return;
  if (gamePhase !== "gameover" && !resetPracticePlateAppearance()) {
    advanceBattingOrder();
    setMatchup();
  }
}

function startPitch(typeKey, options = {}) {
  if (isSwitchBatterChoicePending()) return;
  if (gamePhase !== "playing" || isInputLocked() || isPitching || pendingPitch || ball.active || (stealState.active && !stealState.resolved)) return;
  const pitch = pitchTypes[typeKey];
  if (!pitch) {
    message = "球種は 5/8/2/0 から選んでください";
    return;
  }
  if (Number.isFinite(options.pitcherX)) {
    pitcher.x = clamp(options.pitcherX, pitcher.minX, pitcher.maxX);
  }
  const now = performance.now();
  if (isAnyPracticeMode()) battingFeedback.active = false;
  const startX = pitcher.x;
  const startY = pitcher.y + 96;
  const pitchRadius = getPitchRadius(typeKey);
  recordPitchThrown(activePitcher);
  consumePitchStamina(activePitcher, pitch);
  const pitchAbilityMultiplier = pitch.abilityMultiplier ?? 1;
  const staminaFatigue = getStaminaFatigueScore(activePitcher);
  const staminaMistake = isStaminaMistake(activePitcher);
  const course = options.course || getHeldCourseAim();
  const effectiveControl = getStaminaAdjustedControl(activePitcher) * pitchAbilityMultiplier * pitcherAbilityTuning.globalMultiplier;
  const controlProfile = getPitchControlProfile(effectiveControl, staminaFatigue, {
    pitchType: typeKey,
    courseDirection: course.direction,
    countPressure: options.countPressure ?? 0
  });
  const sharedAim = getSharedPitchCourseAim(course, pitchRadius, typeKey, pitch);
  const intendedX = options.targetX ?? sharedAim.targetX;
  const intendedY = getPitchVerticalTarget();
  const baseSpread = options.targetSpread ?? sharedAim.targetSpread;
  const targetSpread = baseSpread * controlProfile.spread;
  const controlMiss = staminaMistake
    ? getStaminaMistakeTarget(intendedX, intendedY)
    : getPitchControlMiss(controlProfile, intendedX, intendedY);
  const lockTarget = options.lockTarget === true;
  const fatigueDrift = lockTarget ? 0 : getStaminaFatigueDrift(activePitcher);
  const targetX = controlMiss.x + (lockTarget ? 0 : randomBetween(-targetSpread, targetSpread)) + fatigueDrift;
  const targetY = getPitchVerticalTarget();
  const speedKmh = Math.max(40, Math.round((getEffectivePitcherFastKmh(activePitcher) - getStaminaSpeedDrop(activePitcher)) * pitch.baseKmhFactor * randomBetween(0.9, 1.1)));
  const referenceKmh = 150 * pitch.baseKmhFactor;
  const baseGameSpeed = 8.05 * pitch.speedFactor;
  const speedRatio = speedKmh / referenceKmh;
  const actualPitchSpeed = baseGameSpeed * speedRatio * actualPitchSpeedBoost;
  const framesToPlate = (field.plateY - startY) / actualPitchSpeed;

  resetSwing();
  ball.x = startX;
  ball.y = startY;
  ball.prevX = startX;
  ball.prevY = startY;
  ball.radius = pitchRadius;
  ball.active = false;
  ball.baseVx = 0;
  ball.baseVy = 0;
  ball.speedScale = 1;
  ball.inPitch = false;
  ball.crossedPlate = false;
  ball.touchedPlate = false;
  ball.wasHit = false;
  ball.pitchStartTime = now;
  ball.plateTime = now + pitchWindupDuration + framesToPlate * (1000 / 60);
  ball.targetX = targetX;
  ball.targetY = targetY;
  ball.spin = 0;
  ball.curvePower = 0;
  ball.staminaMistake = staminaMistake;
  ball.horizontalVariationStaminaCharged = false;
  ball.verticalVariationStaminaCharged = false;
  ball.pitchAbilityMultiplier = pitchAbilityMultiplier;
  ball.trail = [];
  currentPitchType = typeKey;
  currentPitchSpeedKmh = null;
  isPitching = true;
  pitcher.windupTime = now;
  pendingPitch = { releaseTime: now + pitchWindupDuration, typeKey, startX, startY, targetX, targetY, framesToPlate, speedKmh, controlMissType: controlMiss.type, staminaMistake, pitchAbilityMultiplier, courseDirection: course.direction || 0 };
  autoPitchTimer = Number.POSITIVE_INFINITY;
  if (isBuntButtonHeld()) startBuntStance(now);
  message = `${pitch.label}、モーション開始`;
  if (startEarlyRequestedSteal(now)) {
    message = `${pitch.label}、盗塁スタートが早すぎます`;
  } else {
    planComputerSteal(now);
  }
  updateSidebarAbilityPanels();
}

function getPitchVerticalTarget() {
  return field.plateY;
}

function getPitchControlProfile(control = 5, staminaFatigue = 0, options = {}) {
  const effectiveControl = clamp(control ?? 5, 1, 10);
  const wildness = clamp((10 - (control ?? 5)) / 9, 0, 1);
  const edgeCommandPitch = options.courseDirection !== 0 && isEdgeCommandPitch(options.pitchType);
  const edgeFastballPressure = edgeCommandPitch
    ? wildness * (options.pitchType === "fast" ? 1.08 : options.pitchType === "normal" ? 0.92 : 0.78)
    : 0;
  const fatigueSpread = 1 + staminaFatigue * staminaTuning.controlSpreadBonus;
  const severeWildness = Math.pow(wildness, 1.18);
  const countPressure = clamp(options.countPressure ?? 0, 0, 1);
  const commandTightening = 1 - countPressure * 0.58;
  const missTightening = 1 - countPressure * 0.74;
  const wildMissTightening = 1 - countPressure * 0.82;
  const edgeMajorMissChance = getEdgeCommandMajorMissChance(effectiveControl, staminaFatigue) * missTightening;
  const regularMajorMissChance = getCenterCommandMajorMissChance(effectiveControl, staminaFatigue) * missTightening;
  const totalMajorMissChance = clamp(edgeCommandPitch ? edgeMajorMissChance : regularMajorMissChance, 0, 0.78);
  const edgeSpread = getEdgeCommandHorizontalSpread(effectiveControl) * (1 + staminaFatigue * 0.28) * commandTightening;
  return {
    wildness,
    edgeDirection: options.courseDirection || 0,
    edgeFastballPressure,
    countPressure,
    // コーナー狙いのときだけ球種の差を出す。真ん中系の枝は触らない。
    spread: edgeCommandPitch
      ? clamp(edgeSpread * getPitchTypeControlMultiplier(options.pitchType), 3.3, 69)
      : clamp((0.38 + wildness * 3.35) * fatigueSpread * commandTightening * 1.5, 0.51, 8.78),
    wildMissChance: totalMajorMissChance * 0.5 * wildMissTightening,
    mistakeChance: totalMajorMissChance * 0.5
  };
}

function getEdgeCommandMajorMissChance(control, staminaFatigue = 0) {
  const command = clamp(control ?? 5, 1, 10);
  const base = command <= 5
    ? 0.15 - (command - 1) * 0.025
    : 0.05 - (command - 5) * 0.008;
  return clamp(base + staminaFatigue * 0.02, 0.01, 0.17);
}

function getCenterCommandMajorMissChance(control, staminaFatigue = 0) {
  const command = clamp(control ?? 5, 1, 10);
  const base = command <= 5
    ? 0.08 - (command - 1) * 0.0125
    : 0.03 - (command - 5) * 0.004;
  return clamp(base + staminaFatigue * 0.014, 0.006, 0.1);
}

function getEdgeCommandHorizontalSpread(control) {
  const command = clamp(control ?? 5, 1, 10);
  const points = [
    { control: 1, spread: 120 },
    { control: 3, spread: 84 },
    { control: 5, spread: 54 },
    { control: 8, spread: 21 },
    { control: 10, spread: 7.5 }
  ];
  for (let i = 0; i < points.length - 1; i += 1) {
    const from = points[i];
    const to = points[i + 1];
    if (command <= to.control) {
      const t = (command - from.control) / (to.control - from.control);
      return from.spread + (to.spread - from.spread) * t;
    }
  }
  return points[points.length - 1].spread;
}

function getStaminaAdjustedControl(player) {
  return clamp((player.control ?? 5) * getStaminaAbilityMultiplier(player), 1, 10);
}

function getCurrentPitchAbilityMultiplier() {
  return ball.pitchAbilityMultiplier ?? 1;
}

function getCurrentPitchStuffMultiplier() {
  return pitchTypes[currentPitchType]?.stuffMultiplier ?? getCurrentPitchAbilityMultiplier();
}

function getEffectivePitcherStuff(player = activePitcher) {
  return ((player.stuff ?? 5) + pitcherAbilityTuning.stuffBoost) * getCurrentPitchStuffMultiplier() * pitcherAbilityTuning.globalMultiplier * getReliefPitcherBoostMultiplier(player);
}

function getEffectivePitcherFastKmh(player = activePitcher) {
  return (player?.fastKmh ?? 150) * getReliefPitcherBoostMultiplier(player);
}

function getPitcherStuffPressure(player = activePitcher) {
  return (getEffectivePitcherStuff(player) - 5) * 0.05 * pitcherAbilityTuning.stuffEffectScale;
}

function getLowPitcherStuffProfileBoost(player = activePitcher) {
  return clamp((5 - getEffectivePitcherStuff(player)) / 8, 0, 1) * pitcherAbilityTuning.lowStuffProfileBoost;
}

function isStaminaMistake(player) {
  const fatigue = getStaminaFatigueScore(player);
  if (fatigue <= 0) return false;
  return Math.random() < fatigue * staminaTuning.mistakeChanceMax;
}

function getStaminaMistakeTarget(intendedX, intendedY) {
  return {
    x: field.plateX + randomBetween(-18, 18),
    y: field.plateY + randomBetween(-16, 18),
    type: "staminaMistake"
  };
}

function getStaminaFatigueDrift(player) {
  const fatigue = getStaminaFatigueScore(player);
  if (fatigue <= 0) return 0;
  const controlEase = clamp((11 - (player.control ?? 5)) / 10, 0.1, 1);
  return randomBetween(-1, 1) * fatigue * staminaTuning.fatigueDriftMax * controlEase;
}

function getPitchRadius(typeKey) {
  return typeKey === "fast" || typeKey === "special" ? 8 : 9;
}

function isEdgeCommandPitch(typeKey) {
  return typeKey === "normal" || typeKey === "fast" || typeKey === "special";
}

// コーナーを狙ったときの散らばりに掛ける球種係数。1 が基準、大きいほど隅を突きにくい。
function getPitchTypeControlMultiplier(typeKey) {
  const multiplier = pitchControlTuning.typeSpreadMultiplier[typeKey];
  return Number.isFinite(multiplier) ? multiplier : 1;
}

function getPitchCourseTargetX(course, pitchRadius = 8, typeKey = "normal") {
  if (!course?.direction || !isEdgeCommandPitch(typeKey)) return field.plateX + (course?.offset ?? 0);
  const plateEdgeX = getHomePlateEdgeXAtY(field.plateY, course.direction);
  return plateEdgeX + course.direction * Math.max(1.5, pitchRadius - 3.5);
}

function getSharedPitchCourseAim(course, pitchRadius = 8, typeKey = "normal", pitch = pitchTypes[typeKey]) {
  const direction = Math.sign(course?.direction || 0);
  const sharedCourse = {
    direction,
    offset: direction * 48
  };
  return {
    course: sharedCourse,
    targetX: getPitchCourseTargetX(sharedCourse, pitchRadius, typeKey),
    targetY: field.plateY,
    targetSpread: getPitchCourseBaseSpread(sharedCourse, typeKey, pitch)
  };
}

function getPitchCourseBaseSpread(course, typeKey, pitch) {
  if (!course?.direction) return pitch.targetSpread;
  if (!isEdgeCommandPitch(typeKey)) return 8;
  return 1;
}

function getHomePlateEdgeXAtY(y, direction = 1) {
  const points = getHomePlatePoints();
  const intersections = [];
  points.forEach((point, index) => {
    const nextPoint = points[(index + 1) % points.length];
    if (point.y === nextPoint.y) {
      if (Math.abs(y - point.y) < 0.001) {
        intersections.push(point.x, nextPoint.x);
      }
      return;
    }
    const minY = Math.min(point.y, nextPoint.y);
    const maxY = Math.max(point.y, nextPoint.y);
    if (y < minY || y > maxY) return;
    const t = (y - point.y) / (nextPoint.y - point.y);
    intersections.push(point.x + (nextPoint.x - point.x) * t);
  });
  if (!intersections.length) return field.plateX + Math.sign(direction || 1) * 36 * field.plateScale;
  return direction < 0 ? Math.min(...intersections) : Math.max(...intersections);
}

function getPitchControlMiss(controlProfile, intendedX, intendedY) {
  if (controlProfile.wildness <= 0) return { x: intendedX, y: intendedY, type: "none" };
  const roll = Math.random();
  if (roll < controlProfile.mistakeChance) {
    const centerPull = 0.58 + controlProfile.wildness * 0.28;
    return {
      x: intendedX + (field.plateX - intendedX) * centerPull,
      y: intendedY + (field.plateY - intendedY) * centerPull,
      type: "mistake"
    };
  }
  if (roll < controlProfile.mistakeChance + controlProfile.wildMissChance) {
    const missDistance = randomBetween(42 + controlProfile.wildness * 18, 108 + controlProfile.wildness * 116);
    const angle = randomBetween(0, Math.PI * 2);
    if (controlProfile.edgeDirection) {
      const verticalMiss = randomBetween(-missDistance * 0.55, missDistance * 0.45);
      return {
        x: intendedX + controlProfile.edgeDirection * missDistance,
        y: intendedY + verticalMiss,
        type: "wild"
      };
    }
    return {
      x: intendedX + Math.cos(angle) * missDistance,
      y: intendedY + Math.sin(angle) * missDistance * 0.72,
      type: "wild"
    };
  }
  return { x: intendedX, y: intendedY, type: "none" };
}

function releasePendingPitch() {
  if (!pendingPitch || performance.now() < pendingPitch.releaseTime) return;
  ball.x = pendingPitch.startX;
  ball.y = pendingPitch.startY;
  ball.prevX = ball.x;
  ball.prevY = ball.y;
  ball.vx = (pendingPitch.targetX - pendingPitch.startX) / pendingPitch.framesToPlate;
  ball.vy = (pendingPitch.targetY - pendingPitch.startY) / pendingPitch.framesToPlate;
  ball.baseVx = ball.vx;
  ball.baseVy = ball.vy;
  ball.speedScale = 1;
  ball.active = true;
  ball.inPitch = true;
  ball.crossedPlate = false;
  ball.touchedPlate = isBallTouchingHomePlate();
  ball.pitchStartTime = pendingPitch.releaseTime;
  ball.plateTime = pendingPitch.releaseTime + pendingPitch.framesToPlate * (1000 / 60);
  ball.trail = [];
  currentPitchSpeedKmh = pendingPitch.speedKmh;
  lastPitchSpeedKmh = pendingPitch.speedKmh;
  ball.staminaMistake = pendingPitch.staminaMistake === true;
  ball.pitchAbilityMultiplier = pendingPitch.pitchAbilityMultiplier ?? 1;
  armPitchControlLockout();
  if (pendingPitch.courseDirection < 0) pitchControlLockoutKeys.add("4");
  if (pendingPitch.courseDirection > 0) pitchControlLockoutKeys.add("6");
  pendingPitch = null;
  message = ball.staminaMistake ? `失投気味 ${currentPitchSpeedKmh}km/h` : `${pitchTypes[currentPitchType].label} ${currentPitchSpeedKmh}km/h`;
}

function getHeldCourseAim() {
  if (isKeyHeld("4") && !isKeyHeld("6")) return { direction: -1, offset: -48 };
  if (isKeyHeld("6") && !isKeyHeld("4")) return { direction: 1, offset: 48 };
  return { direction: 0, offset: 0 };
}

function movePitcherOnPlate(direction) {
  if (gamePhase !== "playing" || isPitching || pendingPitch || ball.active) return;
  pitcher.x = clamp(pitcher.x + direction * pitcher.moveStep, pitcher.minX, pitcher.maxX);
  ball.x = pitcher.x;
  message = direction < 0 ? "投手位置を左へ移動" : "投手位置を右へ移動";
}

function getDangerousBendDirectionForBatter() {
  return activeBatterSide === "R" ? -1 : 1;
}

function getSafeBendDirectionForBatter(preferredDirection = 0, dangerRoll = Math.random()) {
  const dangerousDirection = getDangerousBendDirectionForBatter();
  if (preferredDirection === 0) return 0;
  if (preferredDirection !== dangerousDirection) return preferredDirection;
  return dangerRoll < 0.05 ? preferredDirection : -preferredDirection;
}

function normalizePitchTypeWeights(weights) {
  const total = Math.max(0.01, weights.fast + weights.normal + weights.slow);
  return {
    fast: weights.fast / total,
    normal: weights.normal / total,
    slow: weights.slow / total
  };
}

function getComputerPitchTypeWeights(player = activePitcher) {
  const fastKmh = player?.fastKmh ?? 150;
  const breakSkill = Math.max(player?.rightBreak ?? 5, player?.leftBreak ?? 5);
  const slowSkill = player?.slowChange ?? 5;
  const fastChangeSkill = player?.fastChange ?? 5;
  const slowPitcherBias = clamp((148 - fastKmh) / 42, 0, 1);
  const breakingBias = clamp((breakSkill + slowSkill + fastChangeSkill - 15) / 18, 0, 1);
  const powerPitcherBreakingBias = clamp((fastKmh - 158) / 26, 0, 1) * clamp((slowSkill + fastChangeSkill - 9) / 10, 0, 1);
  const weights = {
    fast: 0.4 - slowPitcherBias * 0.1 - powerPitcherBreakingBias * 0.08,
    normal: 0.3 + slowPitcherBias * 0.03 + powerPitcherBreakingBias * 0.03,
    slow: 0.3 + slowPitcherBias * 0.1 + breakingBias * 0.1 + powerPitcherBreakingBias * 0.05
  };
  const clampedSlow = clamp(weights.slow, 0.16, 0.58);
  const reducedSlow = clampedSlow * computerPitchShapeRateScale;
  const redistributedSlow = clampedSlow - reducedSlow;
  return normalizePitchTypeWeights({
    fast: clamp(weights.fast, 0.16, 0.68) + redistributedSlow * 0.6,
    normal: clamp(weights.normal, 0.18, 0.46) + redistributedSlow * 0.4,
    slow: clamp(reducedSlow, 0.12, 0.48)
  });
}

function chooseWeightedComputerPitchType(weights, roll = Math.random()) {
  if (roll < weights.fast) return "fast";
  if (roll < weights.fast + weights.normal) return "normal";
  return "slow";
}

function createComputerBendSegment(direction, start, end, chance = 1, power = 1) {
  return { direction, start, end, chance, power };
}

function createComputerSpeedChangeSegment(direction, start, end, chance = 1, power = 1) {
  return { direction, start, end, chance, power };
}

function syncComputerPitchPlanLegacyFields(plan) {
  const firstBend = plan.bendSegments?.find((segment) => segment.direction !== 0);
  plan.bendDirection = firstBend?.direction ?? 0;
  plan.bendStart = firstBend?.start ?? randomBetween(0.58, 0.72);
  plan.bendEnd = firstBend?.end ?? randomBetween(0.82, 0.96);
  plan.bendChance = firstBend?.chance ?? 0;
  plan.bendPower = firstBend?.power ?? 1;
  const firstSpeedChange = plan.speedChangeSegments?.find((segment) => segment.direction !== 0);
  plan.speedChangeDirection = firstSpeedChange?.direction ?? 0;
  plan.speedChangeStart = firstSpeedChange?.start ?? randomBetween(0.62, 0.76);
  plan.speedChangeEnd = firstSpeedChange?.end ?? randomBetween(0.84, 0.98);
  plan.speedChangeChance = firstSpeedChange?.chance ?? 0;
  plan.speedChangePower = firstSpeedChange?.power ?? 1;
  return plan;
}

function getPreferredComputerBendDirection(player = activePitcher, fallbackDirection = 0, roll = Math.random()) {
  const rightBreak = clamp(player?.rightBreak ?? 5, 0, 20);
  const leftBreak = clamp(player?.leftBreak ?? 5, 0, 20);
  if (Math.abs(rightBreak - leftBreak) < 1) return fallbackDirection || (roll < 0.5 ? -1 : 1);
  const preferredDirection = rightBreak > leftBreak ? 1 : -1;
  const advantage = Math.abs(rightBreak - leftBreak);
  const preferredChance = clamp(0.58 + advantage * 0.035, 0.58, 0.86);
  return roll < preferredChance ? preferredDirection : (fallbackDirection || -preferredDirection);
}

function getPreferredComputerSpeedChangeDirection(player = activePitcher, fallbackDirection = -1, roll = Math.random()) {
  const slowSkill = Math.max(0, Number(player?.slowChange ?? 5));
  const fastSkill = Math.max(0, Number(player?.fastChange ?? 5));
  if (Math.abs(fastSkill - slowSkill) < 1) return fallbackDirection;
  const preferredDirection = fastSkill > slowSkill ? 1 : -1;
  const advantage = Math.abs(fastSkill - slowSkill);
  const preferredChance = clamp(0.56 + advantage * 0.04, 0.56, 0.88);
  return roll < preferredChance ? preferredDirection : fallbackDirection;
}

function getComputerCountStrikePressure() {
  const balls = clamp(count?.balls ?? 0, 0, 3);
  const strikes = clamp(count?.strikes ?? 0, 0, 2);
  if (balls >= 3) return 1;
  if (balls === 2 && strikes === 0) return 0.92;
  if (balls === 2 && strikes === 1) return 0.82;
  if (balls > strikes) return clamp(0.58 + (balls - strikes) * 0.18, 0, 0.94);
  if (balls >= 2) return 0.55;
  return 0;
}

function shouldComputerPrioritizeStrike() {
  return getComputerCountStrikePressure() >= 0.32;
}

function shouldComputerAvoidWasteBall() {
  return clamp(count?.balls ?? 0, 0, 3) >= 3;
}

function getComputerStrikeCommandLevel() {
  const balls = clamp(count?.balls ?? 0, 0, 3);
  const strikes = clamp(count?.strikes ?? 0, 0, 2);
  if (balls >= 3) return 1;
  if (balls === 2) return strikes <= 1 ? 0.84 : 0.68;
  if (balls > strikes) return 0.48;
  return 0;
}

function isComputerWasteBallIntent(intent) {
  return ["awayBall", "strikeToBall", "strikeToBallBurst", "speedEscape", "hbpBackdoor"].includes(intent);
}

function normalizeComputerPitchCourseForCount(course, type) {
  const strikeCommand = getComputerStrikeCommandLevel();
  if (!course || strikeCommand <= 0) return course;
  const dangerousDirection = getDangerousBendDirectionForBatter();
  const awayFromBatter = -dangerousDirection;
  const side = course.direction || awayFromBatter;
  if (strikeCommand >= 0.84 && (isComputerWasteBallIntent(course.intent) || course.intent === "brakeThenBurst")) {
    return { direction: side === dangerousDirection ? awayFromBatter : side, offset: 0, intent: "plainEdge" };
  }
  if (strikeCommand >= 0.68 && isComputerWasteBallIntent(course.intent)) {
    return { direction: side === dangerousDirection ? awayFromBatter : side, offset: 0, intent: type === "fast" ? "plainEdge" : "edge" };
  }
  return course;
}

function getComputerPitchStrikeOffsetScale() {
  const threeBallStrikeBias = shouldComputerAvoidWasteBall() ? 1.24 : 1;
  return 1 / (computerPitchStrikeZoneRateScale * threeBallStrikeBias);
}

function getComputerPressurePitchFactor() {
  const strikes = clamp(count?.strikes ?? 0, 0, 2);
  const scoringRunner = Boolean(bases?.second || bases?.third);
  const anyRunner = scoringRunner || Boolean(bases?.first);
  return clamp((strikes >= 2 ? 0.46 : strikes === 1 ? 0.12 : 0) + (scoringRunner ? 0.34 : anyRunner ? 0.18 : 0), 0, 1);
}

function getComputerPitchCornerCourse(type, player = activePitcher) {
  const dangerousDirection = getDangerousBendDirectionForBatter();
  const awayFromBatter = -dangerousDirection;
  const roll = Math.random();
  const strikeOffsetScale = getComputerPitchStrikeOffsetScale();
  const prioritizeStrike = shouldComputerPrioritizeStrike();
  const avoidWasteBall = shouldComputerAvoidWasteBall();
  const pressure = getComputerPressurePitchFactor();
  const countPressure = getComputerCountStrikePressure();
  const edgeMax = countPressure >= 0.8 ? 36 : countPressure >= 0.5 ? 42 : 48;
  const edgeMin = countPressure >= 0.8 ? 20 : countPressure >= 0.5 ? 24 : 28;
  if (avoidWasteBall) {
    if ((type === "fast" || type === "special") && roll < 0.28) {
      return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(28, 42) * strikeOffsetScale, intent: "plainEdge" };
    }
    if (roll < 0.25) return { direction: -awayFromBatter, offset: -awayFromBatter * randomBetween(24, 40) * strikeOffsetScale, intent: "backdoor" };
    if (roll < 0.5) return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(22, 38) * strikeOffsetScale, intent: "frontdoor" };
    if (roll < 0.74) return { direction: -awayFromBatter, offset: -awayFromBatter * randomBetween(24, 42) * strikeOffsetScale, intent: "ballToStrikeBurst" };
    if (roll < 0.9) {
      const side = getPreferredComputerBendDirection(player, Math.random() < 0.5 ? -1 : 1);
      const safeSide = side === dangerousDirection && Math.random() > 0.03 ? awayFromBatter : side;
      return { direction: safeSide, offset: safeSide * randomBetween(22, 38) * strikeOffsetScale, intent: "edge" };
    }
    return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(24, 38) * strikeOffsetScale, intent: "plainEdge" };
  }
  if (type === "fast" || type === "special") {
    const allowPlainEdge = type === "fast";
    if (prioritizeStrike) {
      if (allowPlainEdge && roll < 0.32) return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(30, 46) * strikeOffsetScale, intent: "plainEdge" };
      if (roll < 0.32 + pressure * 0.16) return { direction: 0, offset: randomBetween(-10, 10), intent: "earlyBrakeStrike" };
      if (roll < 0.56 + pressure * 0.1) return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(32, 50) * strikeOffsetScale, intent: "awayEdge" };
      if (roll < 0.74) {
        const side = Math.random() < 0.5 ? -1 : 1;
        return { direction: side === dangerousDirection && Math.random() > 0.03 ? awayFromBatter : side, offset: side * randomBetween(30, 48) * strikeOffsetScale, intent: "edge" };
      }
      if (roll < 0.84) return { direction: -awayFromBatter, offset: -awayFromBatter * randomBetween(28, 44) * strikeOffsetScale, intent: "backdoor" };
      if (roll < 0.96) return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(26, 42) * strikeOffsetScale, intent: "frontdoor" };
      return allowPlainEdge
        ? { direction: awayFromBatter, offset: awayFromBatter * randomBetween(30, 46) * strikeOffsetScale, intent: "plainEdge" }
        : { direction: awayFromBatter, offset: awayFromBatter * randomBetween(32, 50) * strikeOffsetScale, intent: "awayEdge" };
    }
    if (allowPlainEdge && roll < 0.34) return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(28, 44) * strikeOffsetScale, intent: "plainEdge" };
    if (roll < 0.38 + pressure * 0.18) return { direction: 0, offset: randomBetween(-12, 12), intent: "earlyBrakeStrike" };
    if (roll < 0.62 + pressure * 0.08) return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(30, 48) * strikeOffsetScale, intent: "awayEdge" };
    if (roll < 0.82) {
      const side = Math.random() < 0.5 ? -1 : 1;
      return { direction: side === dangerousDirection && Math.random() > 0.03 ? awayFromBatter : side, offset: side * randomBetween(28, 46) * strikeOffsetScale, intent: "edge" };
    }
    if (roll < 0.95) return { direction: -awayFromBatter, offset: -awayFromBatter * randomBetween(26, 44) * strikeOffsetScale, intent: "ballToStrikeBurst" };
    return avoidWasteBall
      ? { direction: awayFromBatter, offset: awayFromBatter * randomBetween(30, 46) * strikeOffsetScale, intent: "awayEdge" }
      : { direction: awayFromBatter, offset: awayFromBatter * randomBetween(28, 44) * strikeOffsetScale, intent: "plainEdge" };
  }
  if (prioritizeStrike) {
    if (type === "normal" && roll < 0.18) return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(edgeMin, edgeMax) * strikeOffsetScale, intent: "plainEdge" };
    if (roll < 0.18) return { direction: -awayFromBatter, offset: -awayFromBatter * randomBetween(edgeMin, edgeMax) * strikeOffsetScale, intent: "backdoor" };
    if (roll < 0.36) return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(22, edgeMax) * strikeOffsetScale, intent: "frontdoor" };
    if (roll < 0.6 + pressure * 0.08) return { direction: -awayFromBatter, offset: -awayFromBatter * randomBetween(edgeMin, edgeMax) * strikeOffsetScale, intent: "acceleratingStrike" };
    if (roll < 0.76 + pressure * 0.1) return { direction: -awayFromBatter, offset: -awayFromBatter * randomBetween(edgeMin + 2, edgeMax + 4) * strikeOffsetScale, intent: pressure > 0.34 ? "brakeThenBurst" : "ballToStrikeBurst" };
    if (roll < 0.94) {
      const side = getPreferredComputerBendDirection(player, Math.random() < 0.5 ? -1 : 1);
      const safeSide = side === dangerousDirection && Math.random() > 0.03 ? awayFromBatter : side;
      return { direction: safeSide, offset: safeSide * randomBetween(22, 40) * strikeOffsetScale, intent: "edge" };
    }
    return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(22, edgeMax) * strikeOffsetScale, intent: "plainEdge" };
  }
  if (type === "normal" && roll < 0.18) return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(26, 42) * strikeOffsetScale, intent: "plainEdge" };
  if (roll < 0.04) return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(30, 48) * strikeOffsetScale, intent: "strikeToBall" };
  if (roll < 0.4 + pressure * 0.08) return { direction: -awayFromBatter, offset: -awayFromBatter * randomBetween(26, 46) * strikeOffsetScale, intent: "acceleratingStrike" };
  if (roll < 0.66 + pressure * 0.1) return { direction: -awayFromBatter, offset: -awayFromBatter * randomBetween(28, 48) * strikeOffsetScale, intent: pressure > 0.34 ? "brakeThenBurst" : "ballToStrikeBurst" };
  if (roll < 0.7) return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(30, 48) * strikeOffsetScale, intent: "speedEscape" };
  if (roll < 0.71) return { direction: dangerousDirection, offset: dangerousDirection * randomBetween(18, 30) * strikeOffsetScale, intent: "hbpBackdoor" };
  if (roll < 0.82) return { direction: -awayFromBatter, offset: -awayFromBatter * randomBetween(26, 46) * strikeOffsetScale, intent: "backdoor" };
  if (roll < 0.91) return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(24, 42) * strikeOffsetScale, intent: "frontdoor" };
  if (roll < 0.98) {
    const side = getPreferredComputerBendDirection(player, Math.random() < 0.5 ? -1 : 1);
    return { direction: side, offset: side * randomBetween(22, 40) * strikeOffsetScale, intent: "edge" };
  }
  return { direction: awayFromBatter, offset: awayFromBatter * randomBetween(22, 38) * strikeOffsetScale, intent: "plainEdge" };
}

function buildComputerPitchShape(plan, player = activePitcher) {
  if (player?.practiceOnly) {
    plan.bendSegments = [];
    plan.speedChangeSegments = [];
    return syncComputerPitchPlanLegacyFields(plan);
  }
  const type = plan.type;
  const course = plan.course;
  const dangerousDirection = getDangerousBendDirectionForBatter();
  const awayFromBatter = -dangerousDirection;
  const breakSkill = Math.max(player?.rightBreak ?? 5, player?.leftBreak ?? 5);
  const slowSkill = player?.slowChange ?? 5;
  const fastChangeSkill = player?.fastChange ?? 5;
  const shapeSkill = clamp((breakSkill + slowSkill + fastChangeSkill) / 30, 0.1, 1.25);
  const bendSegments = [];
  const speedChangeSegments = [];
  const preferredBendDirection = getSafeBendDirectionForBatter(getPreferredComputerBendDirection(player, awayFromBatter), 0.5);
  const preferredSpeedChangeDirection = getPreferredComputerSpeedChangeDirection(player, type === "slow" ? -1 : 1);
  const pressure = plan.countPressure ?? getComputerPressurePitchFactor();
  const strikeCommand = getComputerStrikeCommandLevel();
  const addEarlyBrake = (power = 1) => speedChangeSegments.push(createComputerSpeedChangeSegment(-1, randomBetween(0.08, 0.18), randomBetween(0.32, 0.48), 0.98, power + slowSkill * 0.055));
  const addLateBurst = (power = 1) => speedChangeSegments.push(createComputerSpeedChangeSegment(1, randomBetween(0.58, 0.74), randomBetween(0.88, 0.99), 0.98, power + fastChangeSkill * 0.06));
  const addMiddleChange = (direction, power = 1) => bendSegments.push(createComputerBendSegment(direction, randomBetween(0.34, 0.48), randomBetween(0.72, 0.9), 0.96, power + shapeSkill * 0.42));
  const slowCommandShapeScale = type === "slow" ? (pressure >= 0.8 ? 0.62 : pressure >= 0.55 ? 0.72 : 0.84) : 1;

  if (course.intent === "plainEdge") {
    plan.bendSegments = bendSegments;
    plan.speedChangeSegments = speedChangeSegments;
    return syncComputerPitchPlanLegacyFields(plan);
  }

  if (type === "fast") {
    const isAwayEscape = course.intent === "awayEscape";
    const earlyBrakeStrike = course.intent === "earlyBrakeStrike";
    if (earlyBrakeStrike) {
      addEarlyBrake(1.18);
      if (Math.random() < 0.48) addMiddleChange(preferredBendDirection, 0.46);
      if (Math.random() < 0.58) addLateBurst(1.08);
    } else {
      if (isAwayEscape || Math.random() < 0.46) {
        const bendDirection = isAwayEscape ? awayFromBatter : preferredBendDirection;
        bendSegments.push(createComputerBendSegment(bendDirection, isAwayEscape ? 0.5 : 0.56, 0.94, isAwayEscape ? 0.96 : 0.88, (isAwayEscape ? 0.76 : 0.6) + shapeSkill * 0.38));
      }
      if (isAwayEscape || Math.random() < 0.42 + pressure * 0.18) {
        const speedDirection = isAwayEscape ? -1 : getPreferredComputerSpeedChangeDirection(player, 1);
        const start = speedDirection < 0 ? randomBetween(0.18, 0.42) : randomBetween(0.38, 0.68);
        speedChangeSegments.push(createComputerSpeedChangeSegment(speedDirection, start, randomBetween(Math.max(start + 0.16, 0.68), 0.96), isAwayEscape ? 0.96 : 0.9, (isAwayEscape ? 1.08 : 0.82) + Math.max(slowSkill, fastChangeSkill) * 0.05));
      }
    }
  } else {
    const escapeIntent = course.intent === "strikeToBall" || course.intent === "strikeToBallBurst" || course.intent === "speedEscape";
    const accelerateIntoZone = course.intent === "acceleratingStrike" || course.intent === "ballToStrikeBurst";
    const brakeThenBurst = course.intent === "brakeThenBurst";
    const hbpBackdoor = course.intent === "hbpBackdoor";
    const firstDirection = hbpBackdoor
      ? awayFromBatter
      : course.intent === "backdoor" || course.intent === "frontdoor" || escapeIntent || accelerateIntoZone
        ? getSafeBendDirectionForBatter(course.direction, 0.5)
        : preferredBendDirection;
    const bendStart = escapeIntent || accelerateIntoZone || hbpBackdoor ? randomBetween(0.28, 0.46) : randomBetween(0.44, 0.6);
    bendSegments.push(createComputerBendSegment(firstDirection, bendStart, randomBetween(0.76, 0.92), 0.96, ((hbpBackdoor ? 1.18 : 0.9) + shapeSkill * 0.46) * slowCommandShapeScale));
    if (type === "slow" && Math.random() < (0.5 + slowSkill * 0.028) * (pressure >= 0.55 ? 0.72 : 1)) {
      bendSegments.push(createComputerBendSegment(-firstDirection, randomBetween(0.66, 0.8), randomBetween(0.88, 0.99), 0.86, (0.5 + shapeSkill * 0.26) * slowCommandShapeScale));
    }
    if (type === "slow" && Math.random() < (0.24 + breakSkill * 0.022) * (pressure >= 0.55 ? 0.66 : 1)) {
      bendSegments.push(createComputerBendSegment(firstDirection, randomBetween(0.8, 0.88), 0.99, 0.78, (0.36 + shapeSkill * 0.18) * slowCommandShapeScale));
    }
    if (brakeThenBurst || (type === "normal" && Math.random() < 0.22 + pressure * 0.28) || (type === "slow" && Math.random() < 0.3 + pressure * 0.32)) {
      addEarlyBrake(brakeThenBurst ? 1.08 : 0.86);
      addLateBurst(brakeThenBurst ? 1.16 : 0.94);
    }
    if (accelerateIntoZone || course.intent === "speedEscape" || escapeIntent || Math.random() < (type === "slow" ? 0.78 + pressure * 0.12 : 0.64 + pressure * 0.16)) {
      const slowBias = type === "slow" ? 0.68 : 0.48;
      const fallbackDirection = Math.random() < slowBias ? -1 : 1;
      const direction = (course.intent === "speedEscape" && type === "slow") || accelerateIntoZone || escapeIntent ? 1 : getPreferredComputerSpeedChangeDirection(player, fallbackDirection);
      const powerBonus = course.intent === "speedEscape" || escapeIntent ? 0.34 : accelerateIntoZone ? 0.26 : 0;
      if (course.intent === "speedEscape" && type === "slow") {
        speedChangeSegments.push(createComputerSpeedChangeSegment(-1, randomBetween(0.14, 0.24), randomBetween(0.44, 0.6), 0.92, (0.78 + slowSkill * 0.044) * slowCommandShapeScale));
        addLateBurst(0.86 * slowCommandShapeScale);
      } else if (accelerateIntoZone || escapeIntent) {
        speedChangeSegments.push(createComputerSpeedChangeSegment(1, randomBetween(0.28, 0.54), randomBetween(0.76, 0.96), 0.98, (1.04 + powerBonus + fastChangeSkill * 0.06) * slowCommandShapeScale));
      } else {
        const start = direction < 0 ? randomBetween(0.24, 0.52) : randomBetween(0.36, 0.72);
        speedChangeSegments.push(createComputerSpeedChangeSegment(direction, start, randomBetween(Math.max(start + 0.16, 0.72), 0.96), 0.94, (0.84 + powerBonus + Math.max(slowSkill, fastChangeSkill) * 0.056) * slowCommandShapeScale));
      }
    }
  }

  if (type === "special") {
    if (!bendSegments.length) bendSegments.push(createComputerBendSegment(getSafeBendDirectionForBatter(awayFromBatter), 0.52, 0.94, 0.98, 1.3));
    else bendSegments.forEach((segment) => { segment.power *= 1.18; segment.chance = Math.max(segment.chance, 0.96); });
    if (!speedChangeSegments.length || Math.random() < 0.74) {
      const direction = Math.random() < 0.4 ? -1 : 1;
      const start = direction < 0 ? randomBetween(0.16, 0.42) : randomBetween(0.46, 0.72);
      speedChangeSegments.push(createComputerSpeedChangeSegment(direction, start, randomBetween(Math.max(start + 0.18, 0.8), 0.98), 0.95, 1.24));
    }
  }

  const dangerousSegments = bendSegments.filter((segment) => segment.direction === dangerousDirection);
  dangerousSegments.forEach((segment) => {
    segment.chance *= 0.28;
    segment.power *= 0.52;
  });
  if (strikeCommand >= 0.68) {
    const shapeScale = strikeCommand >= 0.84 ? 0.32 : 0.52;
    bendSegments.forEach((segment) => {
      segment.power *= shapeScale;
      segment.chance *= 0.82;
    });
    speedChangeSegments.forEach((segment) => {
      segment.power *= strikeCommand >= 0.84 ? 0.44 : 0.62;
      segment.chance *= 0.86;
    });
    if (plan.course?.intent === "plainEdge" || strikeCommand >= 0.84) {
      bendSegments.splice(0, bendSegments.length);
      speedChangeSegments.splice(0, speedChangeSegments.length);
    }
  }
  plan.bendSegments = bendSegments;
  plan.speedChangeSegments = speedChangeSegments;
  return syncComputerPitchPlanLegacyFields(plan);
}

function getPracticePitcherType() {
  return ["A", "B", "C"].includes(practicePitcherType) ? practicePitcherType : "A";
}

function choosePracticePitchPlan() {
  const type = isHomeRunDerbyMode() ? "A" : getPracticePitcherType();
  if (type === "A") {
    const pitchType = Math.random() < 0.82 ? "normal" : "fast";
    return syncComputerPitchPlanLegacyFields({
      type: pitchType,
      course: { direction: 0, offset: 0, intent: "practiceCenter" },
      targetX: field.plateX + randomBetween(-8, 8),
      targetSpread: 3,
      bendSegments: [],
      speedChangeSegments: []
    });
  }
  if (type === "B") {
    const pitchType = Math.random() < 0.56 ? "fast" : "normal";
    const side = Math.random() < 0.5 ? -1 : 1;
    const sharedAim = getSharedPitchCourseAim({ direction: side }, getPitchRadius(pitchType), pitchType, pitchTypes[pitchType]);
    return syncComputerPitchPlanLegacyFields({
      type: pitchType,
      course: { direction: side, offset: side * 42, intent: "plainEdge" },
      targetX: sharedAim.targetX,
      targetY: sharedAim.targetY,
      targetSpread: sharedAim.targetSpread,
      lockTarget: false,
      bendSegments: [],
      speedChangeSegments: []
    });
  }
  return null;
}

function getComputerPlanPitcherProfile(player = activePitcher) {
  if (gameMode === "practice" && getPracticePitcherType() === "C" && player?.practiceOnly) {
    return {
      ...player,
      rightBreak: 5,
      leftBreak: 5,
      slowChange: 5,
      fastChange: 5,
      control: 8,
      stuff: 5,
      practiceOnly: false
    };
  }
  return player;
}

function chooseComputerPitchPlan() {
  if (gameMode === "practice" || isHomeRunDerbyMode()) {
    const practicePlan = choosePracticePitchPlan();
    if (practicePlan) return practicePlan;
  }
  const planPitcher = getComputerPlanPitcherProfile(activePitcher);
  if (activePitcher?.practiceOnly && !(gameMode === "practice" && getPracticePitcherType() === "C")) {
    return syncComputerPitchPlanLegacyFields({
      type: "fast",
      course: { direction: 0, offset: 0, intent: "center" },
      targetX: field.plateX,
      targetY: field.plateY,
      targetSpread: 0,
      bendSegments: [],
      speedChangeSegments: []
    });
  }
  const typeRoll = Math.random();
  const specialChance = getComputerSpecialPitchChance();
  let type = "normal";
  const countPressure = getComputerCountStrikePressure();
  if (typeRoll < specialChance) {
    type = "special";
  } else {
    const regularRoll = (typeRoll - specialChance) / Math.max(0.01, 1 - specialChance);
    type = chooseWeightedComputerPitchType(getComputerPitchTypeWeights(planPitcher), regularRoll);
  }
  if (countPressure >= 0.8 && type === "slow" && Math.random() < 0.72) {
    type = "normal";
  } else if (countPressure >= 0.55 && type === "slow" && Math.random() < 0.48) {
    type = "normal";
  }
  const course = normalizeComputerPitchCourseForCount(getComputerPitchCornerCourse(type, planPitcher), type);
  const awayFromBatter = -getDangerousBendDirectionForBatter();
  const dangerousDirection = getDangerousBendDirectionForBatter();

  const plan = {
    type,
    course,
    countPressure,
    pitcherX: getComputerPitcherPlateX(course, planPitcher),
    targetSpread: type === "special" ? (countPressure >= 0.55 ? 6 : 10) : type === "slow" ? (countPressure >= 0.55 ? 5 : 12) : type === "fast" ? (countPressure >= 0.55 ? 5 : 9) : (countPressure >= 0.55 ? 6 : 12),
    bendSegments: [],
    speedChangeSegments: []
  };
  const edgeTargetX = (side) => getPitchCourseTargetX({ direction: side || 0 }, getPitchRadius(type), type);
  if (course.intent === "awayBall") {
    const side = awayFromBatter;
    plan.targetX = edgeTargetX(side);
    plan.targetSpread = 1;
  } else if (course.intent === "ballToStrikeBurst" || course.intent === "acceleratingStrike") {
    const side = course.direction || awayFromBatter;
    const edgeX = edgeTargetX(side);
    plan.targetX = field.plateX + side * randomBetween(18, Math.max(20, Math.abs(edgeX - field.plateX) - 4));
    plan.targetSpread = 1;
  } else if (course.intent === "strikeToBallBurst" || course.intent === "strikeToBall") {
    const side = course.direction || awayFromBatter;
    plan.targetX = edgeTargetX(side);
    plan.targetSpread = 1;
  } else if (course.intent === "hbpBackdoor") {
    const side = dangerousDirection;
    const edgeX = edgeTargetX(side);
    plan.targetX = field.plateX + side * randomBetween(18, Math.max(20, Math.abs(edgeX - field.plateX) - 8));
    plan.targetSpread = 1;
  } else if (course.intent === "plainEdge") {
    const side = course.direction || awayFromBatter;
    plan.targetX = edgeTargetX(side);
    plan.targetSpread = 0;
    plan.lockTarget = true;
  } else if (type === "fast" && course.intent === "earlyBrakeStrike") {
    plan.targetX = field.plateX + randomBetween(-18, 18);
    plan.targetSpread = 7;
  }
  applySharedComputerPitchAim(plan);
  constrainComputerPitchPlanToPlayerReach(plan);
  return buildComputerPitchShape(plan, planPitcher);
}

function applySharedComputerPitchAim(plan) {
  if (!plan || !pitchTypes[plan.type]) return plan;
  const sharedAim = getSharedPitchCourseAim(
    plan.course,
    getPitchRadius(plan.type),
    plan.type,
    pitchTypes[plan.type]
  );
  plan.targetX = sharedAim.targetX;
  plan.targetY = sharedAim.targetY;
  plan.targetSpread = sharedAim.targetSpread;
  plan.lockTarget = false;
  return plan;
}

function constrainComputerPitchPlanToPlayerReach(plan) {
  if (!plan || !Number.isFinite(plan.targetX) || !isEdgeCommandPitch(plan.type)) return;
  const leftEdge = getPitchCourseTargetX({ direction: -1 }, getPitchRadius(plan.type), plan.type);
  const rightEdge = getPitchCourseTargetX({ direction: 1 }, getPitchRadius(plan.type), plan.type);
  plan.targetX = clamp(plan.targetX, leftEdge, rightEdge);
  if (plan.course?.direction) {
    const sharedAim = getSharedPitchCourseAim(plan.course, getPitchRadius(plan.type), plan.type, pitchTypes[plan.type]);
    plan.targetX = sharedAim.targetX;
    plan.targetSpread = sharedAim.targetSpread;
    plan.lockTarget = false;
  }
}

function getComputerPitcherPlateX(course, player = activePitcher) {
  const side = course?.direction || getPreferredComputerBendDirection(player, Math.random() < 0.5 ? -1 : 1);
  const edgeBias = course?.intent === "awayBall" || course?.intent === "strikeToBall" || course?.intent === "strikeToBallBurst" ? 1.0 : course?.intent === "hbpBackdoor" ? 1.18 : course?.intent === "showCenter" || course?.intent === "earlyBrakeStrike" ? 0.45 : 0.78;
  return clamp(field.centerX - side * randomBetween(18, 58) * edgeBias, pitcher.minX, pitcher.maxX);
}

function getComputerSpecialPitchChance() {
  const strikes = clamp(count?.strikes ?? 0, 0, 2);
  const balls = clamp(count?.balls ?? 0, 0, 3);
  const baseChance = strikes >= 2 ? 0.15 : strikes === 1 ? 0.05 : 0.03;
  const scoringRunner = Boolean(bases?.second || bases?.third);
  const anyRunner = scoringRunner || Boolean(bases?.first);
  const runnerBonus = scoringRunner ? 0.05 : anyRunner ? 0.02 : 0;
  const staminaPercent = getPitcherStaminaPercent(activePitcher);
  const enoughStamina = staminaPercent >= 0.42;
  const tiredPenalty = staminaPercent < 0.22 ? 0.12 : staminaPercent < 0.34 ? 0.06 : 0;
  const pinchBonus = enoughStamina && strikes >= 2 ? (scoringRunner ? 0.02 : anyRunner ? 0.01 : 0) : 0;
  const ballCountPenalty = balls >= 3 ? 0.14 : balls === 2 ? 0.08 : balls > strikes ? 0.04 : 0;
  return clamp(baseChance + runnerBonus + pinchBonus - tiredPenalty - ballCountPenalty, 0, 0.95);
}

function computerBendPitch() {
  if (!isComputerControlledGameMode() || isPlayerPitching() || !computerPitchPlan || !isPitching || !ball.inPitch || ball.crossedPlate) return;
  const progress = getPitchProgress();
  const bendSegments = computerPitchPlan.bendSegments?.length
    ? computerPitchPlan.bendSegments
    : [{ direction: computerPitchPlan.bendDirection, start: computerPitchPlan.bendStart, end: computerPitchPlan.bendEnd, chance: computerPitchPlan.bendChance, power: computerPitchPlan.bendPower }];
  bendSegments.forEach((segment) => {
    if (segment.direction !== 0 && progress > segment.start && progress < segment.end) {
      applyPitchBend(segment.direction, 1.08 * computerPitchShapeRateScale * (segment.chance ?? 1) * (segment.power ?? 1), progress);
    }
  });
  const speedChangeSegments = computerPitchPlan.speedChangeSegments?.length
    ? computerPitchPlan.speedChangeSegments
    : [{ direction: computerPitchPlan.speedChangeDirection, start: computerPitchPlan.speedChangeStart, end: computerPitchPlan.speedChangeEnd, chance: computerPitchPlan.speedChangeChance, power: computerPitchPlan.speedChangePower }];
  speedChangeSegments.forEach((segment) => {
    if (segment.direction !== 0 && progress > segment.start && progress < segment.end) {
      applyPitchSpeedChange(segment.direction, 1.02 * computerPitchShapeRateScale * (segment.chance ?? 1) * (segment.power ?? 1));
    }
  });
}

function swingBat(type = "strong") {
  const now = performance.now();
  if (isInputLocked(now)) return;
  if (gamePhase !== "playing" || !isPlayerBatting()) return;
  startSwing(now, type);
}

function startSwing(now = performance.now(), type = "strong") {
  if (swingState.didSwingThisPitch && (isPitching || pendingPitch || ball.inPitch)) return;
  if (now < swingState.cooldownUntil || swingState.isSwinging) return;
  swingState.isSwinging = true;
  swingState.startTime = now;
  swingState.cooldownUntil = now + 430;
  swingState.didSwingThisPitch = true;
  swingState.madeContact = false;
  swingState.lastCheckProgress = 0;
  swingState.type = type === "weak" || type === "bunt" || type === "grounder" ? type : "strong";
  if (swingState.type !== "bunt") {
    swingState.isBuntStance = false;
    swingState.buntAimX = 0;
    swingState.buntAimY = 0;
    swingState.buntAimMemoryX = 0;
    swingState.buntAimMemoryY = 0;
    swingState.buntAimMemoryMagnitude = 0;
    swingState.buntAimMemoryTime = 0;
  }
  playSound("swing");
  if (!isPitching || pendingPitch) message = "まだ投球されていません";
}

function updateBuntStance(now = performance.now()) {
  if (gamePhase !== "playing" || !isPlayerBatting()) {
    cancelBuntStance();
    return;
  }
  if (isBuntButtonHeld()) {
    startBuntStance(now);
  } else if (isBuntStanceActive()) {
    cancelBuntStance();
  }
}

function startBuntStance(now = performance.now()) {
  if (isInputLocked(now) || swingState.madeContact || ball.crossedPlate) return;
  if (swingState.isSwinging && !isBuntStanceActive()) return;
  if (swingState.didSwingThisPitch && !isBuntStanceActive()) return;
  if (isBuntStanceActive()) {
    const aim = getBuntAimForContact(now);
    swingState.buntAimX = aim.x;
    swingState.buntAimY = aim.y;
    return;
  }
  swingState.isSwinging = true;
  swingState.startTime = now;
  swingState.cooldownUntil = 0;
  swingState.didSwingThisPitch = true;
  swingState.madeContact = false;
  swingState.lastCheckProgress = getBatSwingProgress();
  swingState.type = "bunt";
  swingState.isBuntStance = true;
  const aim = getBuntAimForContact(now);
  swingState.buntAimX = aim.x;
  swingState.buntAimY = aim.y;
  if (!isPitching || pendingPitch) message = "バントの構え";
}

function cancelBuntStance() {
  if (!isBuntStanceActive()) return;
  if (isPitching && ball.inPitch && hasBallPassedHomePlate()) return;
  swingState.isSwinging = false;
  swingState.didSwingThisPitch = false;
  swingState.madeContact = false;
  swingState.lastCheckProgress = 0;
  swingState.type = "strong";
  swingState.isBuntStance = false;
  swingState.buntAimX = 0;
  swingState.buntAimY = 0;
  swingState.buntAimMemoryX = 0;
  swingState.buntAimMemoryY = 0;
  swingState.buntAimMemoryMagnitude = 0;
  swingState.buntAimMemoryTime = 0;
}

function isBuntStanceActive() {
  return swingState.isSwinging && swingState.type === "bunt" && swingState.isBuntStance;
}

function isBuntButtonHeld() {
  if (isPhysicalKeyHeld("3")) return true;
  const gamepad = getGamepadForTeam(battingTeam);
  return !!gamepad && isGamepadButtonDown(gamepad, gamepadButtons.X);
}

function getBuntAimInput() {
  const keyboardLeft = keysDown.has("ArrowLeft") || keysDown.has("a") || keysDown.has("A");
  const keyboardRight = keysDown.has("ArrowRight") || keysDown.has("d") || keysDown.has("D");
  const keyboardUp = keysDown.has("ArrowUp") || keysDown.has("w") || keysDown.has("W");
  const keyboardDown = keysDown.has("ArrowDown") || keysDown.has("s") || keysDown.has("S");
  const keyboardX = keyboardLeft === keyboardRight ? 0 : keyboardLeft ? -1 : 1;
  const keyboardY = keyboardUp === keyboardDown ? 0 : keyboardUp ? -1 : 1;
  const gamepad = getGamepadForTeam(battingTeam);
  const axisX = gamepad?.axes?.[0] ?? 0;
  const axisY = gamepad?.axes?.[1] ?? 0;
  const gamepadX = Math.abs(axisX) >= 0.22 ? axisX : 0;
  const gamepadY = Math.abs(axisY) >= 0.28 ? axisY : 0;
  const x = gamepadX || keyboardX;
  const y = gamepadY || keyboardY;
  const magnitude = clamp(Math.hypot(x, y), 0, 1);
  if (magnitude <= 0) return { x: 0, y: 0, magnitude: 0 };
  return {
    x: clamp(x / magnitude, -1, 1),
    y: clamp(y / magnitude, -1, 1),
    magnitude
  };
}

function rememberBuntAim(aim, now = performance.now()) {
  if (!aim || aim.magnitude < 0.18) return;
  swingState.buntAimMemoryX = aim.x;
  swingState.buntAimMemoryY = aim.y;
  swingState.buntAimMemoryMagnitude = aim.magnitude;
  swingState.buntAimMemoryTime = now;
}

function getBuntAimForContact(now = performance.now()) {
  const aim = getBuntAimInput();
  if (aim.magnitude >= 0.18) {
    rememberBuntAim(aim, now);
    return aim;
  }
  if (
    swingState.buntAimMemoryMagnitude >= 0.18
    && now - swingState.buntAimMemoryTime <= buntAimMemoryDuration
  ) {
    return {
      x: swingState.buntAimMemoryX,
      y: swingState.buntAimMemoryY,
      magnitude: swingState.buntAimMemoryMagnitude
    };
  }
  return aim;
}


function getProjectedPitchPlatePosition() {
  if (!ball.inPitch || !Number.isFinite(ball.vy) || Math.abs(ball.vy) < 0.001) {
    return { x: ball.x, y: ball.y };
  }
  const framesToPlate = clamp((field.plateY - ball.y) / ball.vy, 0, 90);
  const progress = getPitchProgress();
  const curveDrift = ball.curvePower * Math.max(0, progress - 0.28) * 0.31 * framesToPlate * getComputerCurveReadScale();
  return {
    x: ball.x + ball.vx * framesToPlate + curveDrift,
    y: field.plateY
  };
}

// 曲がり量をどれだけ正確に読めるか。1 で正確、小さいほど曲がりを小さく見積もる。
// 以前は打者に関係なく一律 0.58 だったので、ミートの高い打者でも外の変化球に引っかかった。
function getComputerCurveReadScale() {
  const meetSkill = clamp(((activeBatter?.meet ?? 5) - 3) / 12, 0, 1);
  return computerBatterTuning.curveReadLow
    + meetSkill * (computerBatterTuning.curveReadHigh - computerBatterTuning.curveReadLow);
}

// CPU打者が構え直す (バッターボックス内で位置を調整する) ためだけの到達点予測。
// getProjectedPitchPlatePosition は変化球の曲がりをあえて0.58倍に減衰させて
// 「スイングするかどうかの判断を見誤る」選球眼の甘さを表現しているが、
// 同じ甘い予測を立ち位置の調整にも使ってしまうと、スイングを振る判断自体は
// 正しくても実際の到達点まで体が寄り切れず、変化球や外角球で空振りが増えすぎる。
// 選球眼はそのままに、体の寄りだけ正確な曲がり量で追わせる。
function getComputerBatterTrackingPosition() {
  if (!ball.inPitch || !Number.isFinite(ball.vy) || Math.abs(ball.vy) < 0.001) {
    return { x: ball.x, y: ball.y };
  }
  const framesToPlate = clamp((field.plateY - ball.y) / ball.vy, 0, 90);
  const progress = getPitchProgress();
  const curveDrift = ball.curvePower * Math.max(0, progress - 0.28) * 0.31 * framesToPlate;
  return {
    x: ball.x + ball.vx * framesToPlate + curveDrift,
    y: field.plateY
  };
}

function getComputerSwingStrikeConfidence() {
  const projected = getProjectedPitchPlatePosition();
  const projectedDistance = distanceToHomePlate(projected.x, projected.y, ball.radius);
  const meet = activeBatter?.meet ?? 5;
  // 変化の大きい球ほど「ストライクだ」と確信できる幅を狭める。
  const breakPressure = clamp(Math.abs(ball.curvePower) / Math.max(0.01, computerBatterTuning.breakFullPressure), 0, 1);
  const strikeTolerance = (computerBatterTuning.strikeConfidenceTolerance + meet * computerBatterTuning.strikeConfidenceMeetScale)
    * (1 - breakPressure * computerBatterTuning.breakToleranceDrop);
  const projectedStrike = clamp(1 - projectedDistance / Math.max(1, strikeTolerance), 0, 1);
  // 手元の読みは「いまベースの左右からどれだけ外れているか」で見る。
  // 本塁までの距離で見ると、判断時点では残りの飛行距離しか表さず常に0になってしまう。
  const lateralMiss = Math.max(0, Math.abs(ball.x - field.plateX) - field.strikeZoneWidth / 2 - ball.radius);
  const lateReadTolerance = computerBatterTuning.lateReadTolerance + meet * computerBatterTuning.lateReadMeetScale;
  const lateCurrentRead = clamp(1 - lateralMiss / Math.max(1, lateReadTolerance), 0, 1);
  const lateWeight = clamp(computerBatterTuning.lateReadWeight, 0, 1);
  return clamp(projectedStrike * (1 - lateWeight) + lateCurrentRead * lateWeight, 0, 1);
}

function getComputerOutsideEscapeTakeAdjustment(strikeConfidence) {
  const projected = getProjectedPitchPlatePosition();
  const projectedDistance = distanceToHomePlate(projected.x, projected.y, ball.radius);
  const currentDistance = distanceToHomePlate(ball.x, ball.y, ball.radius);
  const nearZone = clamp(1 - Math.min(projectedDistance, currentDistance) / 92, 0, 1);
  // 見極めは「外角へ逃げる球」に限らない。ゾーンからどれだけ外れる見込みかで判断する。
  const zoneExitScore = clamp(projectedDistance / computerBatterTuning.zoneExitFullRead, 0, 1);
  // 手元でゾーンから離れていく球ほど読みにくいので、逃げる量は割り増しにとどめる。
  const escapeScore = clamp(
    (projectedDistance - currentDistance) / computerBatterTuning.escapeFullRead,
    0,
    1
  );
  const escapeWeight = computerBatterTuning.escapeBaseWeight
    + escapeScore * (1 - computerBatterTuning.escapeBaseWeight);
  const ballZoneScore = clamp(projectedDistance / 70, 0, 1);
  const pitchReadScore = getComputerPitchReadScore();
  const meetReadSkill = clamp(((activeBatter?.meet ?? 5) - 3) / 12, 0, 1);
  const readAccuracy = 0.46 + meetReadSkill * 0.54;
  const takeStrength = nearZone
    * pitchReadScore
    * zoneExitScore
    * escapeWeight
    * (0.48 + ballZoneScore * 0.72)
    * readAccuracy;
  return {
    takeStrength: clamp(takeStrength, 0, 0.88),
    chaseMultiplier: clamp(1 - takeStrength * (1 + ballZoneScore * 0.45), 0.06, 1),
    swingMultiplier: clamp(1 - takeStrength * (0.85 + ballZoneScore * 0.7), 0.04, 1),
    confidencePenalty: takeStrength * (0.25 + ballZoneScore * 0.35),
    ballZoneScore
  };
}

function computerSwingBat() {
  if (isPitchingPracticeMode() && pitchingPracticeBatterType !== "B") return;
  if ((gameMode !== "single" && gameMode !== "watch" && !isPitchingPracticeMode() && !isHomeRunDerbyMode()) || isPlayerBatting() || !isPitching || !ball.inPitch || ball.crossedPlate || swingState.didSwingThisPitch) return;
  const progress = getPitchProgress();
  if (progress < computerBatterTuning.swingWindowStart || progress > computerBatterTuning.swingWindowEnd) return;
  // 振り始めは投球ごとに決めた1点。ここに達するまでは球を見てから判断する。
  if (progress < getComputerSwingTargetProgress()) return;
  const strikeConfidence = getComputerSwingStrikeConfidence();
  const outsideEscapeTake = getComputerOutsideEscapeTakeAdjustment(strikeConfidence);
  const adjustedStrikeConfidence = clamp(strikeConfidence - outsideEscapeTake.confidencePenalty, 0, 1);
  if (isHomeRunDerbyMode()) {
    if (adjustedStrikeConfidence < 0.18 && Math.random() > 0.18 * outsideEscapeTake.chaseMultiplier) return;
    const derbySwingChance = clamp(0.42 + adjustedStrikeConfidence * 0.7 + activeBatter.meet * 0.025, 0.18, 0.96) * outsideEscapeTake.swingMultiplier;
    if (Math.random() < derbySwingChance) startSwing(performance.now(), "strong");
    return;
  }
  // ゲートに近い球ほど誘われる。明らかなボール球では誘い自体がほぼ消える。
  const meetDiscipline = clamp(((activeBatter?.meet ?? 5) - 3) / 12, 0, 1);
  const chaseTemptation = clamp(
    adjustedStrikeConfidence / Math.max(0.01, computerBatterTuning.chaseGateConfidence),
    0,
    1
  );
  const chaseChance = computerBatterTuning.chaseChanceScale
    * (computerBatterTuning.chaseChanceBase + (1 - meetDiscipline) * computerBatterTuning.chaseChanceLowMeetBonus)
    * Math.pow(chaseTemptation, computerBatterTuning.chaseTemptationExponent);
  if (adjustedStrikeConfidence < computerBatterTuning.chaseGateConfidence
    && Math.random() >= chaseChance * outsideEscapeTake.chaseMultiplier) return;
  const swingChance = Math.pow(
    clamp(
      computerBatterTuning.swingChanceBase + adjustedStrikeConfidence * computerBatterTuning.swingChanceConfidenceScale,
      0,
      1
    ),
    Math.max(0.1, computerBatterTuning.swingChanceExponent)
  ) * outsideEscapeTake.swingMultiplier;
  if (Math.random() < swingChance) startSwing(performance.now(), chooseComputerSwingType());
}

// 振り始める進行度は投球ごとに1回だけ決める。
// 以前はフレームごとの抽選だったため、狙った帯より遅いフレームでも先に当たりが出てしまい、
// 実際の振り始めが 0.85〜1.05 に散らばって空振りが激増していた。
function getComputerSwingTargetProgress() {
  if (Number.isFinite(swingState.computerSwingProgress)) return swingState.computerSwingProgress;
  const meetSkill = clamp(((activeBatter?.meet ?? 5) - 3) / 12, 0, 1);
  const center = computerBatterTuning.swingTimingCenter
    + (1 - meetSkill) * computerBatterTuning.swingTimingMeetShift;
  const jitter = computerBatterTuning.swingTimingJitter
    * (1 - meetSkill * computerBatterTuning.swingTimingJitterMeetScale);
  const target = clamp(
    center + (Math.random() * 2 - 1) * jitter,
    computerBatterTuning.swingWindowStart,
    computerBatterTuning.swingWindowEnd
  );
  swingState.computerSwingProgress = target;
  return target;
}

function chooseComputerSwingType(roll = Math.random()) {
  const strikes = clamp(count?.strikes ?? 0, 0, 2);
  if (strikes >= 2) return "weak";
  if (strikes === 1) return roll < 0.5 ? "strong" : "weak";
  return "strong";
}

function pollGamepadInput() {
  clearGamepadVirtualKeys();
  syncGamepadAssignments();

  const pitchingTeam = isBattingPracticeMode() ? "away" : fieldingTeam();
  const pitchingGamepad = getGamepadForTeam(pitchingTeam);
  const pitchStartButtonPressed = gamePhase === "playing"
    && isPlayerPitching()
    && pitchingGamepad
    && hasPitchStartGamepadButtonPressed(pitchingGamepad);
  if (pitchingGamepad) {
    const directions = getGamepadDirections(pitchingGamepad);

    if (isPlayerPitching() && gamePhase === "playing") {
      if (!isPitching && !pendingPitch && pitchStartButtonPressed) {
        if (directions.has("left")) addGamepadVirtualKey("4");
        if (directions.has("right")) addGamepadVirtualKey("6");
      }
      if (isGamepadButtonDown(pitchingGamepad, gamepadButtons.X)) addGamepadVirtualKey("0");
      if (isGamepadButtonDown(pitchingGamepad, gamepadButtons.B) || directions.has("down")) addGamepadVirtualKey("3");
    }

    if (isPlayerPitching() && gamePhase === "playing" && isPitching && ball.inPitch) {
      if (directions.has("left")) addGamepadVirtualKey("4");
      if (directions.has("right")) addGamepadVirtualKey("6");
      const vertical = pitchingGamepad.axes?.[1] ?? 0;
      if (vertical < -0.42 || directions.has("up")) addGamepadVirtualKey("1");
      if (vertical > 0.42 || directions.has("down")) addGamepadVirtualKey("3");
      if (isGamepadButtonDown(pitchingGamepad, gamepadButtons.B)) addGamepadVirtualKey("3");
      if (isGamepadButtonDown(pitchingGamepad, gamepadButtons.Y)) addGamepadVirtualKey("1");
    }
  }

  teamIds.forEach((team) => {
    const gamepad = getGamepadForTeam(team);
    if (!gamepad) {
      gamepadState.previousButtons[team].clear();
      gamepadState.previousDirections[team].clear();
      return;
    }
    updateMenuGamepadCursor(gamepad, team);
    handleGamepadButtonPresses(gamepad, team, {
      suppressBattingButtons: pitchStartButtonPressed
        && team === battingTeam
        && team !== pitchingTeam
        && gamepad === pitchingGamepad
    });
    gamepadState.previousDirections[team] = getGamepadDirections(gamepad);
  });
  releaseInactivePitchControlLockouts();
  updateMenuGamepadCursorVisibility();
}

function getConnectedGamepads() {
  if (typeof navigator === "undefined" || typeof navigator.getGamepads !== "function") return [];
  return Array.from(navigator.getGamepads() || []).filter(Boolean);
}

function syncGamepadAssignments() {
  const gamepads = getConnectedGamepads();
  if (!gamepads.length) {
    gamepadState.teamIndexes.away = null;
    gamepadState.teamIndexes.home = null;
    clearTeamGamepadHistory();
    return;
  }
  const used = new Set();
  teamIds.forEach((team) => {
    const current = gamepads.find((pad) => pad.index === gamepadState.teamIndexes[team]);
    if (current) {
      used.add(current.index);
      return;
    }
    gamepadState.teamIndexes[team] = null;
  });
  teamIds.forEach((team) => {
    if (gamepadState.teamIndexes[team] !== null) return;
    const next = gamepads.find((pad) => !used.has(pad.index));
    if (!next) return;
    gamepadState.teamIndexes[team] = next.index;
    used.add(next.index);
  });
}

function getGamepadForTeam(team) {
  const gamepads = getConnectedGamepads();
  if (!gamepads?.length) return null;
  const assigned = gamepads.find((pad) => pad.index === gamepadState.teamIndexes[team]);
  if (assigned) return assigned;
  return gamepads.length === 1 ? gamepads[0] : null;
}

function getActiveGamepad() {
  const activeTeam = gamePhase === "defense" ? fieldingTeam() : gamePhase === "playing" && isPlayerBatting() ? battingTeam : fieldingTeam();
  return getGamepadForTeam(activeTeam);
}

function clearTeamGamepadHistory() {
  teamIds.forEach((team) => {
    gamepadState.previousButtons[team].clear();
    gamepadState.previousDirections[team].clear();
  });
}

function clearGamepadVirtualKeys() {
  gamepadState.virtualKeys.forEach((key) => keysDown.delete(key));
  gamepadState.virtualKeys.clear();
}

function addGamepadVirtualKey(key) {
  keysDown.add(key);
  gamepadState.virtualKeys.add(key);
}

function updateMenuGamepadCursor(gamepad, team) {
  const cursor = gamepadState.menuCursors[team];
  if (!cursor) return;
  if (gamePhase !== "menu") {
    setMenuGamepadCursorVisible(team, false);
    return;
  }
  ensureMenuGamepadCursor(team);
  if (!cursor.initialized) initializeMenuGamepadCursor(team);
  const directions = getGamepadDirections(gamepad);
  const rawX = gamepad.axes?.[0] ?? 0;
  const rawY = gamepad.axes?.[1] ?? 0;
  const x = Math.abs(rawX) >= 0.16 ? rawX : (directions.has("right") ? 1 : directions.has("left") ? -1 : 0);
  const y = Math.abs(rawY) >= 0.16 ? rawY : (directions.has("down") ? 1 : directions.has("up") ? -1 : 0);
  if (x || y) {
    const speed = 12;
    cursor.x = clamp(cursor.x + x * speed, 8, Math.max(8, window.innerWidth - 8));
    cursor.y = clamp(cursor.y + y * speed, 8, Math.max(8, window.innerHeight - 8));
  }
  updatePlayerChooserGamepadScroll(gamepad, team, y);
  setMenuGamepadCursorVisible(team, true);
  renderMenuGamepadCursor(team);
}

function updatePlayerChooserGamepadScroll(gamepad, team, verticalInput = 0) {
  if (gamePhase !== "menu" || !playerChooser || playerChooser.classList.contains("hidden")) return;
  const elements = getChooserElements(team);
  const pane = elements.pane;
  if (!pane || pane.classList.contains("hidden") || pane.scrollHeight <= pane.clientHeight) return;
  const cursor = gamepadState.menuCursors[team];
  if (!cursor) return;
  const rect = pane.getBoundingClientRect();
  const isInOwnPane = cursor.x >= rect.left && cursor.x <= rect.right && cursor.y >= rect.top && cursor.y <= rect.bottom;
  if (!isInOwnPane) return;
  const stickY = gamepad.axes?.[1] ?? 0;
  const y = Math.abs(stickY) >= 0.16
    ? stickY
    : verticalInput;
  if (Math.abs(y) < 0.16) return;
  const edgeMargin = Math.min(120, Math.max(52, rect.height * 0.16));
  const nearTop = cursor.y <= rect.top + edgeMargin;
  const nearBottom = cursor.y >= rect.bottom - edgeMargin;
  if ((y < 0 && !nearTop) || (y > 0 && !nearBottom)) return;
  const before = pane.scrollTop;
  pane.scrollTop = clamp(
    pane.scrollTop + y * 26,
    0,
    Math.max(0, pane.scrollHeight - pane.clientHeight)
  );
  if (pane.scrollTop !== before) {
    cursor.y = clamp(cursor.y, rect.top + 12, rect.bottom - 12);
  }
}

function updateMenuGamepadCursorVisibility() {
  if (gamePhase === "menu") return;
  teamIds.forEach((team) => setMenuGamepadCursorVisible(team, false));
}

function ensureMenuGamepadCursor(team) {
  const cursor = gamepadState.menuCursors[team];
  if (!cursor || cursor.element || !document.body) return;
  const element = document.createElement("div");
  element.className = `gamepad-menu-cursor ${team === "away" ? "team-away" : "team-home"}`;
  element.textContent = team === "away" ? "1P" : "2P";
  document.body.appendChild(element);
  cursor.element = element;
}

function initializeMenuGamepadCursor(team) {
  const cursor = gamepadState.menuCursors[team];
  const fallbackX = team === "away" ? window.innerWidth * 0.34 : window.innerWidth * 0.66;
  const fallbackY = window.innerHeight * 0.44;
  const card = document.querySelector(`.menu-player-card[data-team="${team}"]`);
  const rect = card?.getBoundingClientRect?.();
  cursor.x = rect ? rect.left + rect.width / 2 : fallbackX;
  cursor.y = rect ? rect.top + rect.height / 2 : fallbackY;
  cursor.initialized = true;
}

function renderMenuGamepadCursor(team) {
  const cursor = gamepadState.menuCursors[team];
  if (!cursor?.element) return;
  cursor.element.style.transform = `translate(${Math.round(cursor.x)}px, ${Math.round(cursor.y)}px)`;
}

function setMenuGamepadCursorVisible(team, visible) {
  const cursor = gamepadState.menuCursors[team];
  if (!cursor?.element) return;
  cursor.element.classList.toggle("visible", Boolean(visible));
}

function clickMenuGamepadCursor(team) {
  const cursor = gamepadState.menuCursors[team];
  if (!cursor || gamePhase !== "menu") return;
  ensureMenuGamepadCursor(team);
  if (!cursor.initialized) initializeMenuGamepadCursor(team);
  const target = document.elementFromPoint?.(cursor.x, cursor.y);
  if (!target || target === cursor.element) return;
  if (!canTeamGamepadUseMenuTarget(team, target)) return;
  const clickable = target.closest?.("button, select, option, input, label, [role='button'], .menu-player-card, .lineup-order-choice, .chooser-option, .editor-player-button") || target;
  if (!canTeamGamepadUseMenuTarget(team, clickable)) return;
  if (handleMenuCursorSelectChoice(clickable)) return;
  if (typeof clickable.focus === "function") clickable.focus();
  clickable.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, clientX: cursor.x, clientY: cursor.y }));
  clickable.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, clientX: cursor.x, clientY: cursor.y }));
  clickable.click?.();
}

function getMenuTargetTeam(target) {
  return target?.closest?.("[data-chooser-team]")?.dataset?.chooserTeam
    || target?.closest?.("[data-team]")?.dataset?.team
    || "";
}

function canTeamGamepadUseMenuTarget(team, target) {
  if (!team || !target) return false;
  if (playerChooser && !playerChooser.classList.contains("hidden")) {
    const targetTeam = getMenuTargetTeam(target);
    if (targetTeam && targetTeam !== team) return false;
    const pane = target.closest?.("[data-chooser-team]");
    if (pane && pane.dataset.chooserTeam !== team) return false;
  }
  return true;
}

function handleMenuCursorSelectChoice(target) {
  const select = target?.tagName === "SELECT"
    ? target
    : target?.tagName === "LABEL"
    ? target.querySelector?.("select")
    : target?.closest?.("label")?.querySelector?.("select");
  if (!select || select.disabled || select.options.length <= 0) return false;
  select.selectedIndex = (select.selectedIndex + 1) % select.options.length;
  select.dispatchEvent(new Event("input", { bubbles: true }));
  select.dispatchEvent(new Event("change", { bubbles: true }));
  select.focus?.();
  return true;
}

function closeMenuGamepadOverlay(team = null) {
  if (gamePhase !== "menu") return false;
  if (playerChooser && !playerChooser.classList.contains("hidden")) {
    if (team && !getChooserElements(team).pane?.classList.contains("hidden")) {
      closePlayerChooser(team);
      return true;
    }
    if (!team) {
      closePlayerChooser();
      return true;
    }
    return true;
  }
  if (playerEditor && !playerEditor.classList.contains("hidden")) {
    playerEditor.classList.add("hidden");
    return true;
  }
  return false;
}

function getGamepadDirections(gamepad) {
  const directions = new Set();
  const x = gamepad.axes?.[0] ?? 0;
  const y = gamepad.axes?.[1] ?? 0;
  if (x < -0.42 || isGamepadButtonDown(gamepad, 14)) directions.add("left");
  if (x > 0.42 || isGamepadButtonDown(gamepad, 15)) directions.add("right");
  if (y < -0.42 || isGamepadButtonDown(gamepad, 12)) directions.add("up");
  if (y > 0.42 || isGamepadButtonDown(gamepad, 13)) directions.add("down");
  return directions;
}

function hasPitchStartGamepadButtonPressed(gamepad) {
  return isGamepadButtonDown(gamepad, gamepadButtons.A)
    || isGamepadButtonDown(gamepad, gamepadButtons.B)
    || isGamepadButtonDown(gamepad, gamepadButtons.Y)
    || isGamepadButtonDown(gamepad, gamepadButtons.X);
}

function setupSwitchBatterChoice() {
  if (activeBatter?.bats !== "S" || !isPlayerBatting()) {
    switchBatterChoice.active = false;
    return;
  }
  const selectedSide = activePitcher?.throws === "R" ? "L" : "R";
  activeBatterSide = selectedSide;
  switchBatterChoice = {
    active: true,
    team: battingTeam,
    batterId: activeBatter.id,
    selectedSide,
    axisHeld: false
  };
}

function isSwitchBatterChoicePending() {
  return Boolean(switchBatterChoice.active && activeBatter?.id === switchBatterChoice.batterId && battingTeam === switchBatterChoice.team);
}

function setSwitchBatterChoiceSide(side) {
  if (!isSwitchBatterChoicePending()) return;
  if (side !== "R" && side !== "L") return;
  switchBatterChoice.selectedSide = side;
  activeBatterSide = side;
  const box = getBatterMoveBox();
  batter.x = getInitialBatterX(box);
  batter.y = 738;
  updateSidebarAbilityPanels();
}

function confirmSwitchBatterChoice() {
  if (!isSwitchBatterChoicePending()) return false;
  activeBatterSide = switchBatterChoice.selectedSide;
  switchBatterChoice.active = false;
  message = `${activeBatter.name} ${handLabel(activeBatterSide)}打席`;
  if (shouldAutoScheduleComputerPitch() && !isPitching && !pendingPitch && !ball.active) scheduleNextPitch(500);
  return true;
}

function canOpenPauseMenu() {
  if (isAnyPracticeMode()) return false;
  if (gamePhase !== "playing") return false;
  if (isPitching || pendingPitch || ball.active || stealState.active) return false;
  return true;
}

function openPauseMenu(team) {
  if (!canOpenPauseMenu()) return false;
  pauseMenuState = { active: true, team, mode: "main", selectedIndex: 0, selectedRole: null, selectedBase: null, message: "" };
  return true;
}

function closePauseMenu() {
  pauseMenuState.active = false;
  pauseMenuState.mode = "main";
  pauseMenuState.selectedIndex = 0;
  pauseMenuState.selectedRole = null;
  pauseMenuState.selectedBase = null;
}

function getPauseMainOptions(team) {
  if (team === fieldingTeam()) {
    return [
      { label: "\u6295\u624b\u4ea4\u4ee3", action: "pitcher" },
      { label: "\u5b88\u5099\u9078\u624b\u4ea4\u4ee3", action: "defenseRole" },
      { label: "\u9589\u3058\u308b", action: "close" }
    ];
  }
  if (team === battingTeam) {
    return [
      { label: "\u4ee3\u6253", action: "pinchHit" },
      { label: "\u4ee3\u8d70", action: "runnerBase" },
      { label: "\u9589\u3058\u308b", action: "close" }
    ];
  }
  return [{ label: "\u9589\u3058\u308b", action: "close" }];
}

function getPausePlayerHandLabel(player, kind = "batter") {
  const hand = kind === "pitcher" ? player?.throws : player?.bats;
  if (!hand) return "";
  return kind === "pitcher" ? `${handLabel(hand)}投` : `${handLabel(hand)}打`;
}

function getPausePlayerRoleLabel(player, role = null, kind = "batter") {
  const roleLabel = kind === "pitcher"
    ? "投手"
    : role
      ? getMenuRoleLabel(role)
      : isCatcherLikePlayer(player)
        ? "捕手"
        : "野手";
  const handLabelText = getPausePlayerHandLabel(player, kind);
  return handLabelText ? `${roleLabel} ${handLabelText}` : roleLabel;
}

function formatPausePlayerAbilityLine(player, role = null, kind = "batter") {
  if (!player) return "";
  if (kind === "pitcher") {
    return `球速${player.fastKmh ?? "--"} / 制${player.control ?? "-"} 球威${player.stuff ?? "-"} スタ${player.stamina ?? "-"} 守${player.fielding ?? "-"} / ${getPitcherGameStaminaText(player)}`;
  }
  const resolved = role ? applyBenchDefenseRoleAdjustment({ ...player, fromBench: player.fromBench }, role) : player;
  const isCatcher = isCatcherRole(role) || isCatcherLikePlayer(resolved);
  const defenseText = isCatcher
    ? `肩${resolved.arm ?? 5}`
    : `内${resolved.infieldDefense ?? resolved.fielding ?? 5} 外${resolved.outfieldDefense ?? resolved.fielding ?? 5} 肩${resolved.arm ?? 5}`;
  return `パ${resolved.power ?? "-"} ミ${resolved.meet ?? "-"} 走${resolved.run ?? "-"} ${defenseText} / ${resolved.cost ?? 0}P`;
}

function getPauseReplacementContext() {
  const team = pauseMenuState.team;
  if (pauseMenuState.mode === "pitcher") {
    const player = getTeamActivePitcher(team);
    return player ? { label: "現在", player, roleLabel: "投手", ability: formatPausePlayerAbilityLine(player, null, "pitcher") } : null;
  }
  if (pauseMenuState.mode === "pinchHitBench") {
    const lineup = selected?.[team]?.batters || [];
    const entry = lineup[battingOrderIndex[team] % Math.max(1, lineup.length)];
    return entry?.player ? { label: "元", player: entry.player, roleLabel: getMenuRoleLabel(entry.role), ability: formatPausePlayerAbilityLine(entry.player, entry.role, "batter") } : null;
  }
  if (pauseMenuState.mode === "runnerBench") {
    const player = bases?.[pauseMenuState.selectedBase];
    const entry = player ? findLineupEntryByPlayerId(team, player.id) : null;
    return player ? { label: "元", player, roleLabel: entry?.role ? getMenuRoleLabel(entry.role) : "走者", ability: formatPausePlayerAbilityLine(player, entry?.role, "batter") } : null;
  }
  if (pauseMenuState.mode === "defenseBench") {
    const entry = selected?.[team]?.batters?.find((item) => item.role === pauseMenuState.selectedRole);
    return entry?.player ? { label: "元", player: entry.player, roleLabel: getMenuRoleLabel(entry.role), ability: formatPausePlayerAbilityLine(entry.player, entry.role, "batter") } : null;
  }
  return null;
}

function getPauseOptionDetail(option) {
  if (!option) return "";
  if (option.action === "usePitcher") {
    const pitcherInfo = selected?.[pauseMenuState.team]?.pitchers?.find((player) => player.id === option.pitcherId);
    return formatPausePlayerAbilityLine(pitcherInfo, null, "pitcher");
  }
  if (option.action === "useBench") {
    const benchPlayer = getAvailableBenchEntries(pauseMenuState.team).find((entry) => entry.player.id === option.benchId)?.player;
    const targetRole = pauseMenuState.mode === "defenseBench" ? pauseMenuState.selectedRole : null;
    return formatPausePlayerAbilityLine(benchPlayer, targetRole, "batter");
  }
  return option.detail || "";
}

function drawPauseFittedText(text, x, y, maxWidth, startSize = 14, weight = "normal") {
  let fontSize = startSize;
  ctx.font = `${weight} ${fontSize}px sans-serif`;
  while (ctx.measureText(text).width > maxWidth && fontSize > 9) {
    fontSize -= 1;
    ctx.font = `${weight} ${fontSize}px sans-serif`;
  }
  ctx.fillText(text, x, y);
}
function getPauseOptions() {
  const team = pauseMenuState.team;
  if (pauseMenuState.mode === "main") return getPauseMainOptions(team);
  if (pauseMenuState.mode === "pitcher") {
    return selected?.[team]?.pitchers
      ?.filter((pitcherInfo) => canUsePitcher(team, pitcherInfo.id))
      .map((pitcherInfo) => ({
        label: `${pitcherInfo.name} / ${getPausePlayerRoleLabel(pitcherInfo, null, "pitcher")} / ${pitcherInfo.cost ?? 0}P`,
        action: "usePitcher",
        pitcherId: pitcherInfo.id
      })) || [];
  }
  if (pauseMenuState.mode === "defenseRole") {
    return defensiveBatterRoles.map((role) => {
      const entry = selected?.[team]?.batters?.find((item) => item.role === role);
      return { label: `${getMenuRoleLabel(role)} ${entry?.player?.name || ""}`, action: "selectDefenseRole", role };
    });
  }
  if (pauseMenuState.mode === "defenseBench" || pauseMenuState.mode === "pinchHitBench" || pauseMenuState.mode === "runnerBench") {
    return getAvailableBenchEntries(team).map((entry) => {
      const role = pauseMenuState.mode === "defenseBench" ? pauseMenuState.selectedRole : null;
      return {
        label: `${entry.player.name} / ${getPausePlayerRoleLabel(entry.player, role, "batter")} / ${entry.player.cost ?? 0}P`,
        action: "useBench",
        benchId: entry.player.id
      };
    });
  }
  if (pauseMenuState.mode === "runnerBase") {
    return baseNames
      .filter((baseName) => bases?.[baseName])
      .map((baseName) => ({ label: `${baseName} ${bases[baseName].name}`, action: "selectRunnerBase", baseName }));
  }
  return [];
}

function handlePauseSelection(option) {
  if (!option) return;
  const team = pauseMenuState.team;
  if (option.action === "close") {
    closePauseMenu();
    return;
  }
  if (option.action === "pitcher" || option.action === "defenseRole" || option.action === "pinchHit") {
    pauseMenuState.mode = option.action === "pinchHit" ? "pinchHitBench" : option.action;
    pauseMenuState.selectedIndex = 0;
    return;
  }
  if (option.action === "runnerBase") {
    pauseMenuState.mode = "runnerBase";
    pauseMenuState.selectedIndex = 0;
    return;
  }
  if (option.action === "usePitcher") {
    changePitcher(team, option.pitcherId);
    closePauseMenu();
    return;
  }
  if (option.action === "selectDefenseRole") {
    pauseMenuState.selectedRole = option.role;
    pauseMenuState.mode = "defenseBench";
    pauseMenuState.selectedIndex = 0;
    return;
  }
  if (option.action === "selectRunnerBase") {
    pauseMenuState.selectedBase = option.baseName;
    pauseMenuState.mode = "runnerBench";
    pauseMenuState.selectedIndex = 0;
    return;
  }
  if (option.action === "useBench") {
    const benchPlayer = getAvailableBenchEntries(team).find((entry) => entry.player.id === option.benchId)?.player;
    if (pauseMenuState.mode === "pinchHitBench") substituteCurrentBatter(team, benchPlayer);
    if (pauseMenuState.mode === "runnerBench") substituteRunner(team, pauseMenuState.selectedBase, benchPlayer);
    if (pauseMenuState.mode === "defenseBench") substituteDefender(team, pauseMenuState.selectedRole, benchPlayer);
    closePauseMenu();
  }
}

function handlePauseMenuGamepad(gamepad, justPressed) {
  const options = getPauseOptions();
  const axisY = gamepad.axes?.[1] ?? 0;
  if (justPressed(gamepadButtons.B) || justPressed(gamepadButtons.PAUSE)) {
    if (pauseMenuState.mode === "main") closePauseMenu();
    else {
      pauseMenuState.mode = "main";
      pauseMenuState.selectedIndex = 0;
    }
    return;
  }
  if (Math.abs(axisY) > 0.55 && !pauseMenuState.axisHeld) {
    pauseMenuState.selectedIndex = clamp(pauseMenuState.selectedIndex + (axisY > 0 ? 1 : -1), 0, Math.max(0, options.length - 1));
    pauseMenuState.axisHeld = true;
  } else if (Math.abs(axisY) <= 0.3) {
    pauseMenuState.axisHeld = false;
  }
  if (justPressed(gamepadButtons.A)) handlePauseSelection(options[pauseMenuState.selectedIndex]);
}

function handleSwitchBatterChoiceGamepad(gamepad, team, justPressed) {
  if (!isSwitchBatterChoicePending() || team !== battingTeam) return false;
  const axisX = gamepad.axes?.[0] ?? 0;
  if (Math.abs(axisX) > 0.55 && !switchBatterChoice.axisHeld) {
    setSwitchBatterChoiceSide(axisX < 0 ? "L" : "R");
    switchBatterChoice.axisHeld = true;
  } else if (Math.abs(axisX) <= 0.3) {
    switchBatterChoice.axisHeld = false;
  }
  if (justPressed(gamepadButtons.A)) confirmSwitchBatterChoice();
  if (justPressed(gamepadButtons.B)) setSwitchBatterChoiceSide(switchBatterChoice.selectedSide === "R" ? "L" : "R");
  return true;
}

function handleGamepadButtonPresses(gamepad, team, options = {}) {
  const pressed = new Set();
  (gamepad.buttons || []).forEach((button, index) => {
    if (button?.pressed) pressed.add(index);
  });
  const previousButtons = gamepadState.previousButtons[team] || new Set();
  const justPressed = (index) => pressed.has(index) && !previousButtons.has(index);
  const directions = getGamepadDirections(gamepad);
  updateDefenseThrowDirectionTiming(team, directions);
  const newPresses = [...pressed].filter((index) => !previousButtons.has(index));
  if (newPresses.length) recordLastGamepadButton(team, newPresses[newPresses.length - 1]);

  if (handleSwitchBatterChoiceGamepad(gamepad, team, justPressed)) {
    gamepadState.previousButtons[team] = pressed;
    return;
  }
  if (isSwitchBatterChoicePending()) {
    gamepadState.previousButtons[team] = pressed;
    return;
  }

  if (pauseMenuState.active) {
    if (pauseMenuState.team === team) handlePauseMenuGamepad(gamepad, justPressed);
    gamepadState.previousButtons[team] = pressed;
    return;
  }

  if (gamePhase === "menu") {
    if (justPressed(gamepadButtons.A)) clickMenuGamepadCursor(team);
    if (justPressed(gamepadButtons.B)) closeMenuGamepadOverlay(team);
    gamepadState.previousButtons[team] = pressed;
    return;
  }

  if (justPressed(gamepadButtons.PAUSE) && openPauseMenu(team)) {
    gamepadState.previousButtons[team] = pressed;
    return;
  }

  if (!options.suppressBattingButtons && gamePhase === "playing" && isPlayerBatting() && team === battingTeam) {
    if (justPressed(gamepadButtons.A)) {
      swingBat("strong");
    }
    if (justPressed(gamepadButtons.B)) {
      swingBat("weak");
    }
    if (justPressed(gamepadButtons.Y)) {
      if (directions.size > 0) {
        tryStartSteal(getGamepadThrowTarget(directions));
      } else {
        swingBat("grounder");
      }
    }
  }

  const pitchingTeam = isBattingPracticeMode() ? "away" : fieldingTeam();
  if (gamePhase === "playing" && isPlayerPitching() && team === pitchingTeam) {
    if (justPressed(gamepadButtons.INTENTIONAL_WALK)) {
      if (canDeclareIntentionalWalk()) declareIntentionalWalk();
      gamepadState.previousButtons[team] = pressed;
      return;
    }
    if (!isPitching && !pendingPitch) {
      if (justPressed(gamepadButtons.LB)) movePitcherOnPlate(-1);
      if (justPressed(gamepadButtons.RB)) movePitcherOnPlate(1);
    }
    if (justPressed(gamepadButtons.A)) startPitch("fast");
    if (justPressed(gamepadButtons.B)) startPitch("normal");
    if (justPressed(gamepadButtons.Y)) startPitch("slow");
    if (justPressed(gamepadButtons.X)) startPitch("special");
  }
  if (gamePhase === "playing" && team === fieldingTeam() && canManualStealCatcherThrow()) {
    const stealThrowTarget = getGamepadThrowTarget(directions);
    if (justPressed(gamepadButtons.A) && ["second", "third"].includes(stealThrowTarget)) {
      gamepadState.lastThrowButtonPress[team] = performance.now();
      handleManualStealCatcherThrow(stealThrowTarget, getStealCatcherThrowTimingOptions(team, directions));
    }
  }
  if (gamePhase === "defense" && team === fieldingTeam()) {
    const throwTarget = getGamepadThrowTarget(directions);
    if (justPressed(gamepadButtons.A)) {
      gamepadState.lastThrowButtonPress[team] = performance.now();
      handleDefenseThrowCommand(throwTarget, getDefenseThrowTimingOptions(team, directions));
    }
  }
  if (gamePhase === "defense" && team === battingTeam) {
    if (justPressed(gamepadButtons.A)) handleBatterRunnerBaseCommand(getGamepadThrowTarget(directions), "advance");
    if (justPressed(gamepadButtons.B)) handleBatterRunnerBaseCommand(getGamepadThrowTarget(directions), "return");
    if (justPressed(gamepadButtons.X)) handleAllRunnerBaseCommand("advance");
    if (justPressed(gamepadButtons.Y)) handleAllRunnerBaseCommand("return");
  }

  gamepadState.previousButtons[team] = pressed;
}

function recordLastGamepadButton(team, index) {
  gamepadState.lastButton = {
    index,
    team,
    time: performance.now()
  };
}

function updateDefenseThrowDirectionTiming(team, directions) {
  const previous = gamepadState.previousDirections[team] || new Set();
  const hasNewDirection = directions.size > 0
    && (previous.size === 0 || [...directions].some((direction) => !previous.has(direction)));
  if (!hasNewDirection) return;
  gamepadState.lastDirectionPress[team] = {
    time: performance.now(),
    directions: new Set(directions)
  };
}

const quickDefenseThrowSpeedScale = 1.1;
const normalDefenseThrowSpeedScale = 0.8 * 0.85;
const normalDefenseThrowArcMultiplier = 1.5;
const quickDefenseThrowTimeMultiplier = 1 / quickDefenseThrowSpeedScale;
const normalDefenseThrowTimeMultiplier = 1 / normalDefenseThrowSpeedScale;
const quickDefenseThrowTimingWindowMs = 450;
const catcherStealThrowTiming = {
  perfectWindowMs: 140,
  goodWindowMs: 360,
  strongThrowArrivalBonusSeconds: 0.3,
  // タイミングを外した送球は到達が遅れる
  missedThrowArrivalPenaltySeconds: 0.3,
  perfectSpeedScale: 1.18,
  goodSpeedScale: 1.0,
  badSpeedScale: 0.8,
  perfectArcMultiplier: 1,
  goodArcMultiplier: 1.12,
  badArcMultiplier: 1.45
};

function getDefenseThrowTimingOptions(team, activeDirections = null) {
  const now = performance.now();
  const directionPress = gamepadState.lastDirectionPress[team];
  const directionTime = directionPress?.time || 0;
  const buttonTime = gamepadState.lastThrowButtonPress[team] || now;
  const diff = Math.abs(buttonTime - directionTime);
  const currentDirections = activeDirections instanceof Set ? activeDirections : directionPress?.directions;
  const hasMatchingDirection = currentDirections?.size > 0
    && [...currentDirections].some((direction) => directionPress?.directions?.has(direction));
  const timingSuccess = directionTime > 0
    && hasMatchingDirection
    && diff <= quickDefenseThrowTimingWindowMs;
  const quick = timingSuccess;
  return {
    throwTimingSuccess: timingSuccess,
    throwTimeMultiplier: timingSuccess ? quickDefenseThrowTimeMultiplier : normalDefenseThrowTimeMultiplier,
    throwArcMultiplier: timingSuccess ? 1 : normalDefenseThrowArcMultiplier,
    throwTimingLabel: quick ? "クイック送球" : "普通送球"
  };
}

function getStealCatcherThrowTimingOptions(team, activeDirections = null) {
  const now = performance.now();
  const directionPress = gamepadState.lastDirectionPress[team];
  const directionTime = directionPress?.time || 0;
  const buttonTime = gamepadState.lastThrowButtonPress[team] || now;
  const diff = Math.abs(buttonTime - directionTime);
  const currentDirections = activeDirections instanceof Set ? activeDirections : directionPress?.directions;
  const hasMatchingDirection = currentDirections?.size > 0
    && [...currentDirections].some((direction) => directionPress?.directions?.has(direction));
  const timingRank = directionTime > 0 && hasMatchingDirection && diff <= catcherStealThrowTiming.perfectWindowMs
    ? "perfect"
    : directionTime > 0 && hasMatchingDirection && diff <= catcherStealThrowTiming.goodWindowMs
      ? "good"
      : "bad";
  const label = timingRank === "perfect" ? "最高送球" : timingRank === "good" ? "良い送球" : "遅い送球";
  return {
    timingRank,
    throwSpeedScale: timingRank === "perfect"
      ? catcherStealThrowTiming.perfectSpeedScale
      : timingRank === "good"
        ? catcherStealThrowTiming.goodSpeedScale
        : catcherStealThrowTiming.badSpeedScale,
    throwArcMultiplier: timingRank === "perfect"
      ? catcherStealThrowTiming.perfectArcMultiplier
      : timingRank === "good"
        ? catcherStealThrowTiming.goodArcMultiplier
        : catcherStealThrowTiming.badArcMultiplier,
    throwTimingLabel: label
  };
}

function getGamepadThrowTarget(directions) {
  if (directions.has("up")) return "second";
  if (directions.has("left")) return "third";
  if (directions.has("down")) return "home";
  return "first";
}

function tryStartSteal(targetBase, now = performance.now()) {
  if (!stealTuning.enabled || stealState.active) return false;
  if (gamePhase !== "playing" || !isPlayerBatting() || ball.crossedPlate) return false;
  const candidate = getStealCandidate(targetBase);
  if (!candidate) return false;
  if (!isPitching && !pendingPitch) {
    stealState = {
      ...createStealState(),
      earlyRequest: true,
      targetBase: candidate.targetBase,
      requestTime: now,
      pitchType: candidate.pitchType || "normal"
    };
    message = "盗塁スタートが早すぎます";
    showEffect("早すぎるスタート", "#ff8f70");
    return true;
  }
  return beginStealAttempt(candidate, now, { earlyRequest: false });
}

function beginStealAttempt(candidate, now = performance.now(), options = {}) {
  if (!candidate) return false;
  const route = [{ ...getDefenseBasePointByName(candidate.startBase) }, { ...getDefenseBasePointByName(candidate.targetBase) }];
  const routeDistance = getRunnerRouteDistance(route);
  const runnerSpeed = getStealRunnerSpeed(candidate.runner);
  const lead = stealTuning.pitcherTypeLead[pendingPitch?.typeKey || currentPitchType || candidate.pitchType] ?? 0.18;
  const motionElapsedSeconds = getPitchMotionElapsedSeconds(now);
  // フライングは「仕掛けた時点」が投球動作からどれだけ前だったかで重さを決める
  const jumpMotionElapsed = options.earlyRequest && Number.isFinite(options.requestTime)
    ? getPitchMotionElapsedSeconds(options.requestTime)
    : motionElapsedSeconds;
  const jumpLead = getStealJumpLead(jumpMotionElapsed, options.earlyRequest);
  stealState = {
    ...createStealState(),
    active: true,
    earlyRequest: Boolean(options.earlyRequest),
    runner: { ...candidate.runner },
    startBase: candidate.startBase,
    targetBase: candidate.targetBase,
    route,
    startTime: now,
    requestTime: options.requestTime ?? now,
    motionElapsedSeconds,
    jumpLead,
    arrivalTime: Math.max(0.35, routeDistance / runnerSpeed - lead - jumpLead),
    pitchType: currentPitchType || candidate.pitchType || "normal"
  };
  const start = route[0];
  stealState.runner.x = start.x;
  stealState.runner.y = start.y;
  message = `${stealState.runner.name || "ランナー"} 盗塁スタート`;
  showEffect("盗塁!", "#ffcf70");
  return true;
}

// 盗塁のときだけ走力差を圧縮した速度を使う。
// 走力の低い走者を基準に、上位の伸びだけを鈍らせる。
function getStealRunnerSpeed(runnerInfo) {
  const baseSpeed = getRunnerSpeed(runnerInfo) * stealTuning.runSpeedScale;
  const slowestSpeed = getRunnerSpeed({ run: 1 }) * stealTuning.runSpeedScale;
  const spreadScale = clamp(stealTuning.runSpeedSpreadScale ?? 1, 0, 1);
  return slowestSpeed + (baseSpeed - slowestSpeed) * spreadScale;
}

function getPitchMotionElapsedSeconds(now = performance.now()) {
  const motionStart = Number.isFinite(pendingPitch?.releaseTime)
    ? pendingPitch.releaseTime - pitchWindupDuration
    : Number.isFinite(pitcher.windupTime) && pitcher.windupTime > 0
      ? pitcher.windupTime
      : ball.pitchStartTime || now;
  return (now - motionStart) / 1000;
}

// 盗塁のスタート補正。投球動作の開始直後が最良で、遅れるほど小さくなる。
// フライングは、投球動作の何秒前に仕掛けたかに応じてペナルティを重くする。
function getStealJumpLead(motionElapsedSeconds = 0, earlyRequest = false) {
  if (earlyRequest || motionElapsedSeconds < 0) {
    const earlySeconds = Math.max(0, -(motionElapsedSeconds || 0));
    const penalty = stealTuning.earlyJumpPenalty + earlySeconds * stealTuning.earlyJumpPenaltyPerSecond;
    return -Math.min(penalty, stealTuning.maxEarlyJumpPenalty);
  }
  if (motionElapsedSeconds <= 0.18) return stealTuning.quickJumpLead;
  if (motionElapsedSeconds <= 0.45) {
    const t = (motionElapsedSeconds - 0.18) / 0.27;
    return stealTuning.quickJumpLead * (1 - t) + 0.06 * t;
  }
  if (motionElapsedSeconds <= 0.8) {
    const t = (motionElapsedSeconds - 0.45) / 0.35;
    return 0.06 * (1 - t) - stealTuning.lateJumpPenalty * 0.55 * t;
  }
  return -stealTuning.lateJumpPenalty;
}

// 走力に応じた盗塁の仕掛け率。minRunRating 未満は 0。
function getComputerStealChance(runnerInfo, targetBase) {
  const run = runnerInfo?.run ?? 5;
  if (run < computerStealTuning.minRunRating) return 0;
  const spread = Math.max(1, 10 - computerStealTuning.minRunRating);
  const growth = clamp((run - computerStealTuning.minRunRating) / spread, 0, 1);
  const chance = computerStealTuning.baseChance
    + (computerStealTuning.maxChance - computerStealTuning.baseChance) * growth;
  return targetBase === "third" ? chance * computerStealTuning.thirdBaseChanceScale : chance;
}

// 投球動作の開始時に、仕掛けるかどうかとスタートのタイミングを決めておく。
// プレイヤーと同じ beginStealAttempt を通すので、ジャンプの良し悪しも同じ計算になる。
function planComputerSteal(now = performance.now()) {
  computerStealPlan = null;
  if (!computerStealTuning.enabled || !stealTuning.enabled) return false;
  if (gamePhase !== "playing" || isPlayerBatting()) return false;
  if (stealState.active || stealState.earlyRequest) return false;
  if (!computerStealTuning.attemptWithTwoOuts && count.outs >= 2) return false;
  const candidate = getStealCandidate("second") || getStealCandidate("third");
  if (!candidate) return false;
  if (Math.random() >= getComputerStealChance(candidate.runner, candidate.targetBase)) return false;
  computerStealPlan = {
    targetBase: candidate.targetBase,
    startDelaySeconds: randomBetween(computerStealTuning.jumpDelayMin, computerStealTuning.jumpDelayMax)
  };
  return true;
}

function updateComputerSteal(now = performance.now()) {
  if (!computerStealPlan) return false;
  if (stealState.active || isPlayerBatting() || ball.crossedPlate || gamePhase !== "playing") {
    computerStealPlan = null;
    return false;
  }
  if (getPitchMotionElapsedSeconds(now) < computerStealPlan.startDelaySeconds) return false;
  const candidate = getStealCandidate(computerStealPlan.targetBase);
  computerStealPlan = null;
  if (!candidate) return false;
  return beginStealAttempt(candidate, now, { earlyRequest: false });
}

function startEarlyRequestedSteal(now = performance.now()) {
  if (!stealState.earlyRequest || stealState.active) return false;
  const candidate = getStealCandidate(stealState.targetBase);
  if (!candidate) {
    stealState = createStealState();
    return false;
  }
  return beginStealAttempt(candidate, now, {
    earlyRequest: true,
    requestTime: stealState.requestTime || now
  });
}

function getStealCandidate(targetBase) {
  const pitchType = pendingPitch?.typeKey || currentPitchType || "normal";
  if (targetBase === "second" && bases.first && !bases.second) {
    return { runner: bases.first, startBase: "first", targetBase: "second", pitchType };
  }
  if (targetBase === "third" && bases.second && !bases.third) {
    return { runner: bases.second, startBase: "second", targetBase: "third", pitchType };
  }
  return null;
}

function updateStealState(now = performance.now()) {
  if (!stealState.active || stealState.resolved) return;
  const elapsedSeconds = (now - stealState.startTime) / 1000;
  const progress = stealState.arrivalTime > 0 ? clamp(elapsedSeconds / stealState.arrivalTime, 0, 1) : 1;
  const point = getRunnerRoutePoint(stealState.route, progress);
  stealState.runner.x = point.x;
  stealState.runner.y = point.y;
  stealState.runner.arrived = progress >= 1;
  stealState.plateReached = stealState.plateReached || ball.crossedPlate || (!ball.inPitch && stealState.pitchResultPending);
  if (stealState.plateReached && !stealState.throw) {
    if (isManualStealCatcherThrowControl()) {
      prepareManualStealCatcherThrow(elapsedSeconds);
    } else {
      handleStealDefenseThrow(stealState.targetBase, now);
    }
  }

  const throwState = stealState.throw;
  if (throwState) {
    throwState.active = elapsedSeconds >= throwState.startTime && elapsedSeconds <= throwState.endTime;
    if (!throwState.completed && elapsedSeconds >= throwState.endTime) {
      throwState.completed = true;
      if (throwState.targetBase === stealState.targetBase) {
        resolveSteal(!throwState.safe);
        return;
      }
    }
  }
  if (stealState.runner.arrived) resolveSteal(false);
}

function isManualStealCatcherThrowControl() {
  const team = fieldingTeam();
  if (!stealState.active || stealState.resolved || !stealState.plateReached) return false;
  if (gameMode === "watch" || isAnyPracticeMode()) return false;
  if (gameMode === "single" && team !== playerTeam) return false;
  return isPlayerFielding() && defenseControlMode[team] === "manual";
}

function prepareManualStealCatcherThrow(elapsedSeconds) {
  if (stealState.catcherThrowReady) return;
  stealState.catcherThrowReady = true;
  stealState.catcherThrowReadyTime = elapsedSeconds;
  stealState.manualThrowRequired = true;
  message = "捕手捕球、二塁/三塁へ送球できます";
  showEffect("送球可能", "#aee7ff");
}

function canManualStealCatcherThrow() {
  return Boolean(
    stealState.active
    && !stealState.resolved
    && stealState.plateReached
    && stealState.catcherThrowReady
    && stealState.manualThrowRequired
    && !stealState.throw
    && isManualStealCatcherThrowControl()
  );
}

function handleManualStealCatcherThrow(targetBase, timingOptions = {}, now = performance.now()) {
  if (!canManualStealCatcherThrow()) return false;
  const ok = handleStealDefenseThrow(targetBase, now, {
    manual: true,
    throwSpeedScale: timingOptions.throwSpeedScale,
    throwArcMultiplier: timingOptions.throwArcMultiplier,
    throwTimingLabel: timingOptions.throwTimingLabel,
    timingRank: timingOptions.timingRank
  });
  if (ok) {
    stealState.manualThrowRequired = false;
    message = `${getBaseLabel(targetBase)}へ${timingOptions.throwTimingLabel || "送球"}`;
  }
  return ok;
}

function handleStealDefenseThrow(targetBase, now = performance.now(), options = {}) {
  if (!stealState.active || stealState.resolved || stealState.throw || !stealState.plateReached) return false;
  if (!["second", "third"].includes(targetBase)) return false;
  const elapsedSeconds = (now - stealState.startTime) / 1000;
  const from = { ...defenseField.bases.home };
  const to = { ...getDefenseBasePointByName(targetBase) };
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  const throwSpeedScale = options.throwSpeedScale ?? (stealTuning.manualQuickThrowSpeedScale ?? 1.18);
  const throwSpeed = (stealTuning.catcherThrowBaseSpeed + getTeamCatcherArm(fieldingTeam()) * 22) * throwSpeedScale;
  const rawThrowTime = stealTuning.catcherExchangeSeconds + distance / throwSpeed;
  // 好送球は到達を早め、タイミングを外した送球は到達が遅れる
  const timingRank = options.timingRank || (options.manual ? "bad" : "auto");
  const timingAdjust = targetBase !== "second"
    ? 0
    : ["perfect", "good"].includes(timingRank)
      ? -catcherStealThrowTiming.strongThrowArrivalBonusSeconds
      : timingRank === "bad"
        ? catcherStealThrowTiming.missedThrowArrivalPenaltySeconds
        : 0;
  const throwTime = Math.max(0.1, rawThrowTime + timingAdjust);
  const swingMissDelay = stealState.swingMissDelaySeconds ?? 0;
  const startTime = elapsedSeconds + (stealTuning.catcherReleaseDelaySeconds ?? 0.3) + swingMissDelay;
  const endTime = startTime + throwTime;
  const arcMultiplier = options.throwArcMultiplier ?? 1;
  stealState.throw = {
    active: false,
    from,
    to,
    targetBase,
    startTime,
    endTime,
    throwTime,
    arcMultiplier,
    throwSpeedScale,
    manual: Boolean(options.manual),
    timingRank,
    throwTimingLabel: options.throwTimingLabel || "",
    safe: targetBase !== stealState.targetBase || stealState.arrivalTime <= endTime,
    completed: false,
    baseLabel: getBaseLabel(targetBase)
  };
  message = options.throwTimingLabel
    ? `${stealState.throw.baseLabel}へ${options.throwTimingLabel}`
    : `${stealState.throw.baseLabel}へ盗塁阻止送球`;
  return true;
}

function getStealThrowBallColor(throwState) {
  if (throwState?.timingRank === "perfect") return "#ff4f4f";
  if (throwState?.timingRank === "good") return "#ffe45c";
  return "#fff2a8";
}

function resolveSteal(isOut) {
  if (!stealState.active || stealState.resolved) return;
  stealState.resolved = true;
  const runner = stealState.runner;
  if (isOut) {
    bases[stealState.startBase] = null;
    count.outs += 1;
    recordCurrentPitcherOuts(1);
    message = `${getBaseLabel(stealState.targetBase)}盗塁アウト`;
    showEffect("盗塁アウト", "#ffcf70");
  } else {
    bases[stealState.startBase] = null;
    bases[stealState.targetBase] = makeBaseRunner(runner);
    message = `${getBaseLabel(stealState.targetBase)}盗塁成功`;
    showEffect("盗塁成功", "#fff2a8");
  }
  const shouldCheckCount = stealState.pitchResultPending || isOut;
  stealState = createStealState();
  if (shouldCheckCount) {
    checkCountEnd();
    scheduleNextComputerPitchAfterJudgment();
  }
}

function getHitAndRunLeadState() {
  if (!stealState.active || stealState.resolved || !stealState.startBase || !stealState.targetBase) return null;
  const elapsedSeconds = Math.max(0, (performance.now() - stealState.startTime) / 1000);
  const progress = stealState.arrivalTime > 0 ? clamp(elapsedSeconds / stealState.arrivalTime, 0, 1) : 1;
  const routeDistance = getRunnerRouteDistance(stealState.route);
  const point = getRunnerRoutePoint(stealState.route, progress);
  return {
    active: true,
    startBase: stealState.startBase,
    targetBase: stealState.targetBase,
    runnerId: stealState.runner?.id || stealState.runner?.name || null,
    elapsedSeconds,
    progress,
    leadDistance: routeDistance * progress,
    point
  };
}

function isGamepadButtonDown(gamepad, index) {
  return Boolean(gamepad.buttons?.[index]?.pressed);
}

function update(delta) {
  const now = performance.now();
  pollGamepadInput();
  updateCurrentBgm();
  if (pauseMenuState.active) return;
  if (pendingGameEnd) {
    updatePendingGameEnd(now);
    if (gamePhase !== "gameover") {
      if (gamePhase === "defense") updateDefensePlay(now);
      if (hitEffect.active && now - hitEffect.startTime > 1000) hitEffect.active = false;
      if (hbpPose.active && now - hbpPose.startTime > hbpPose.duration) hbpPose.active = false;
      return;
    }
  }
  if (gamePhase === "defense") {
    updateDefensePlay(now);
    if (hitEffect.active && now - hitEffect.startTime > 1000) hitEffect.active = false;
    return;
  }
  if (gamePhase === "playing" && isPlayerBatting()) updateBatter(delta);
  else if (gamePhase === "playing") {
    updateComputerSteal(now);
    updateComputerBatterPosition(delta);
  }
  updateBuntStance(now);
  if (shouldAutoScheduleComputerPitch() && !isInputLocked(now) && !isPitching && !pendingPitch && !ball.active && !stealState.active && !Number.isFinite(autoPitchTimer)) {
    scheduleNextComputerPitchAfterJudgment();
  }
  if (isComputerControlledGameMode() && gamePhase === "playing" && !isInputLocked(now) && !isPitching && !pendingPitch && !ball.active && now > autoPitchTimer) {
    const plan = computerPitchPlan || chooseComputerPitchPlan();
    startPitch(plan.type, plan);
  }
  releasePendingPitch();
  computerBendPitch();
  if (ball.active) updateBall(delta);
  updateStealState(now);
  computerSwingBat();
  if (isPitching && ball.inPitch && !swingState.madeContact && isBallHittingBatter()) {
    if (swingState.didSwingThisPitch) {
      ball.crossedPlate = true;
      finishPitch("空振り", "strike", 0, performance.now() - ball.plateTime);
    } else if (isStrikePitchForHbp()) {
      ball.crossedPlate = true;
      finishPitch("ストライク", "strike", 0, performance.now() - ball.plateTime);
    } else {
      finishPitch("デッドボール", "hbp");
    }
    return;
  }
  if (isPitching && ball.inPitch && isBatInJudgmentWindow(now) && !swingState.madeContact) {
    checkSwingContact();
  }
  if (isPitching && ball.inPitch && !ball.crossedPlate && hasBallPassedHomePlate()) {
    ball.crossedPlate = true;
    judgePitchAtPlate();
  }
  if (!isBuntStanceActive() && swingState.isSwinging && now - swingState.startTime > swingState.duration + swingState.followHoldDuration) swingState.isSwinging = false;
  if (hitEffect.active && now - hitEffect.startTime > 1000) hitEffect.active = false;
  if (hbpPose.active && now - hbpPose.startTime > hbpPose.duration) hbpPose.active = false;
}

function updateBatter(delta = 1000 / 60) {
  const box = getBatterMoveBox();
  if (mouseAim.active) {
    batter.x = mouseAim.x;
    batter.y = mouseAim.y;
  }
  // バント姿勢中はスティックと矢印キーを打球方向の指示に使うので、打者は動かさない。
  // 動かしてしまうとバットがボールから離れ、狙うほど当たらなくなる。
  const aimOnlyInput = isBuntStanceActive();
  const keyboardMove = aimOnlyInput ? { x: 0, y: 0 } : getBatterKeyboardMove();
  const gamepadMove = aimOnlyInput ? { x: 0, y: 0 } : getBatterGamepadMove();
  const move = {
    x: gamepadMove.x || keyboardMove.x,
    y: gamepadMove.y || keyboardMove.y
  };
  if (move.x || move.y) {
    const frameScale = delta / (1000 / 60);
    batter.x += move.x * batterMoveTuning.keyboardMoveSpeed * frameScale;
    batter.y += move.y * batterMoveTuning.keyboardMoveSpeed * frameScale;
    mouseAim.active = false;
  }
  batter.x = clamp(batter.x, box.left, box.right);
  batter.y = clamp(batter.y, box.top, box.bottom);
}

function updateComputerBatterPosition(delta = 1000 / 60) {
  if (!shouldMoveComputerBatter()) return;
  const box = getBatterMoveBox();
  const projected = getComputerBatterTrackingPosition();
  const projectedDistance = distanceToHomePlate(projected.x, projected.y, ball.radius);
  const zoneRead = clamp(1 - projectedDistance / 132, 0, 1);
  if (zoneRead <= 0) return;
  const outsideSign = activeBatterSide === "R" ? 1 : -1;
  const pitchSide = (projected.x - field.plateX) * outsideSign;
  // 速球でも追従が止まらないよう、見極めと同じ読み取りスコアを使う。
  const pitchReadScore = getComputerPitchReadScore();
  const meetRead = clamp(((activeBatter?.meet ?? 5) - 3) / 12, 0, 1);
  const moveScale = batterMoveTuning.cpuPitchSideMoveScale
    + pitchReadScore * batterMoveTuning.cpuSlowPitchMoveBonus;
  const maxMove = computerBatterTuning.horizontalReach + meetRead * computerBatterTuning.horizontalMeetBonus;
  const initialX = getInitialBatterX(box);
  const targetX = clamp(
    initialX + clamp(pitchSide * moveScale * zoneRead, -maxMove, maxMove) * outsideSign,
    box.left,
    box.right
  );
  const frameScale = delta / (1000 / 60);
  const speed = batterMoveTuning.cpuPitchSideMoveSpeed * (1 + pitchReadScore * 0.9 + meetRead * 0.35);
  const dx = targetX - batter.x;
  batter.x += clamp(dx, -speed * frameScale, speed * frameScale);
  batter.x = clamp(batter.x, box.left, box.right);
  batter.y = clamp(batter.y, box.top, box.bottom);
}

function shouldMoveComputerBatter() {
  return (gameMode === "single" || gameMode === "watch" || isPitchingPracticeMode() || isHomeRunDerbyMode())
    && !isPlayerBatting()
    && isPitching
    && ball.inPitch
    && !ball.crossedPlate
    && !swingState.didSwingThisPitch;
}

function getBatterKeyboardMove() {
  return {
    x: (isKeyHeld("ArrowRight") ? 1 : 0) - (isKeyHeld("ArrowLeft") ? 1 : 0),
    y: (isKeyHeld("ArrowDown") ? 1 : 0) - (isKeyHeld("ArrowUp") ? 1 : 0)
  };
}

function getBatterGamepadMove() {
  const gamepad = getGamepadForTeam(battingTeam);
  if (!gamepad) return { x: 0, y: 0 };
  const x = gamepad.axes?.[0] ?? 0;
  const y = gamepad.axes?.[1] ?? 0;
  return {
    x: Math.abs(x) >= 0.18 ? x : 0,
    y: Math.abs(y) >= 0.18 ? y : 0
  };
}

function isBatInJudgmentWindow(now = performance.now()) {
  if (isBuntStanceActive()) return true;
  return swingState.isSwinging && now - swingState.startTime <= swingState.duration;
}

function getBatterMoveBox() {
  const baseBox = activeBatterSide === "R" ? field.rightBox : field.leftBox;
  const plateHalfTop = 36 * field.plateScale;
  const plateLeftLimit = field.plateX - plateHalfTop - batterMoveTuning.plateSideGap;
  const plateRightLimit = field.plateX + plateHalfTop + batterMoveTuning.plateSideGap;
  const rawLeft = activeBatterSide === "R" ? baseBox.left : Math.max(baseBox.left, plateRightLimit);
  const rawRight = activeBatterSide === "R" ? Math.min(baseBox.right, plateLeftLimit) : baseBox.right;
  const plateNudge = activeBatterSide === "R" ? batterMoveTuning.plateSideNudge : -batterMoveTuning.plateSideNudge;
  const center = (rawLeft + rawRight) / 2 + plateNudge;
  const halfWidth = ((rawRight - rawLeft) * batterMoveTuning.horizontalRangeScale) / 2;
  const plateTop = field.plateY - 12 * field.plateScale;
  const left = center - halfWidth;
  const right = center + halfWidth;
  const plateSideReach = Math.max(
    0,
    batterMoveTuning.plateSideExtraReach - (ball?.radius ?? 9) * batterMoveTuning.plateSideSafetyBallRadiusScale
  ) + (ball?.radius ?? 9) * batterMoveTuning.plateSideExtraBallReach;
  const awaySideReach = (ball?.radius ?? 9) * batterMoveTuning.awaySideExtraBallReach;
  return {
    left: activeBatterSide === "L" ? left - plateSideReach : left - awaySideReach,
    right: activeBatterSide === "R" ? right + plateSideReach : right + awaySideReach,
    top: Math.max(baseBox.top + batterMoveTuning.moundSideShrink, plateTop + batterMoveTuning.shoeLimitOffsetY),
    bottom: baseBox.bottom
  };
}

function updateBall(delta) {
  const frameScale = delta / (1000 / 60);
  ball.trail.push({ x: ball.x, y: ball.y });
  if (ball.trail.length > 26) ball.trail.shift();
  const prevX = ball.x;
  const prevY = ball.y;
  ball.prevX = prevX;
  ball.prevY = prevY;
  if (ball.inPitch) {
    const progress = getPitchProgress();
    const heldBend = isPlayerPitching() ? getHeldBendDirection() : 0;
    const heldSpeedChange = isPlayerPitching() ? getHeldSpeedChangeDirection() : 0;
    if (heldBend !== 0) applyPitchBend(heldBend, frameScale, progress);
    if (heldSpeedChange !== 0) applyPitchSpeedChange(heldSpeedChange, frameScale);
    ball.x += ball.curvePower * Math.max(0, progress - 0.28) * 0.31 * frameScale;
  }
  ball.x += ball.vx * frameScale;
  ball.y += ball.vy * frameScale;
  ball.spin += 0.18 * frameScale;
  if (ball.inPitch) markPlateTouch(prevX, prevY, ball.x, ball.y);
  if (!ball.inPitch) ball.vy += 0.18 * frameScale;
  if (ball.inPitch && isPitchOutOfHorizontalBounds()) {
    ball.crossedPlate = true;
    finishPitch("ボール", "ball", 0, 0);
    return;
  }
  if (ball.y < -80 || ball.y > canvas.height + 90 || ball.x < -140 || ball.x > canvas.width + 140) {
    ball.active = false;
  }
}

function isPitchOutOfHorizontalBounds() {
  return ball.x + ball.radius < 0 || ball.x - ball.radius > canvas.width;
}

function applyPitchBend(direction, frameScale = 1, progress = getPitchProgress()) {
  if (ball.staminaMistake) {
    message = "失投で変化しない";
    return;
  }
  const rating = direction > 0 ? activePitcher.rightBreak : activePitcher.leftBreak;
  const staminaMultiplier = getStaminaChangeMultiplier(activePitcher, staminaTuning.bendExhaustedMultiplier);
  const ability = (0.55 + rating * 0.09) * (ball.pitchAbilityMultiplier ?? 1) * pitcherAbilityTuning.globalMultiplier * staminaMultiplier;
  const bendStrength = (0.11 + Math.sin(progress * Math.PI) * 0.07) * ability;
  consumePitchVariationStamina("horizontal");
  ball.curvePower = clamp(ball.curvePower + direction * bendStrength * pitchBendEffect * frameScale, -4.25 * ability * pitchBendEffect, 4.25 * ability * pitchBendEffect);
  ball.vx = clamp(ball.vx + direction * bendStrength * 0.55 * pitchBendEffect * frameScale, -6.1 * pitchBendEffect, 6.1 * pitchBendEffect);
  ball.spin += direction * 0.42 * frameScale;
  message = direction < 0 ? "左へ変化中" : "右へ変化中";
}

function applyPitchSpeedChange(direction, frameScale = 1) {
  if (ball.staminaMistake) {
    message = "失投で変化しない";
    return;
  }
  const rating = (direction < 0 ? activePitcher.slowChange : activePitcher.fastChange) * (ball.pitchAbilityMultiplier ?? 1) * pitcherAbilityTuning.globalMultiplier;
  const ratingEffect = Math.pow(Math.max(1, rating) / 10, 2);
  const staminaMultiplier = getStaminaChangeMultiplier(activePitcher, staminaTuning.speedChangeExhaustedMultiplier);
  const accelerateScale = direction > 0 ? pitcherAbilityTuning.accelerateSpeedChangeScale : 1;
  const changeAmount = maxPitchSpeedChangeAmount * ratingEffect * staminaMultiplier * frameScale * accelerateScale;
  const nextScale = clamp(ball.speedScale + direction * changeAmount, 1 - pitchSpeedChangeLimit, 1 + pitchSpeedChangeLimit);
  if (nextScale === ball.speedScale) return;

  consumePitchVariationStamina("vertical");
  const velocityMultiplier = nextScale / ball.speedScale;
  ball.vx *= velocityMultiplier;
  ball.vy *= velocityMultiplier;
  ball.speedScale = nextScale;
  updateDynamicPlateTime();
  message = direction < 0 ? `減速中: ${rating}` : `加速中: ${rating}`;
}

function updateDynamicPlateTime() {
  if (!ball.inPitch || ball.vy <= 0) return;
  const framesToPlate = Math.max(0, (field.plateY - ball.y) / ball.vy);
  ball.plateTime = performance.now() + framesToPlate * (1000 / 60);
}

function getHeldBendDirection() {
  const left = isPitchControlHeld("4");
  const right = isPitchControlHeld("6");
  if (left === right) return 0;
  return left ? -1 : 1;
}

function getHeldSpeedChangeDirection() {
  const slow = isPitchControlHeld("1");
  const fast = isPitchControlHeld("3");
  if (slow === fast) return 0;
  return slow ? -1 : 1;
}

function isKeyHeld(key) {
  return keysDown.has(key) || keysDown.has(`Digit${key}`) || keysDown.has(`Numpad${key}`);
}

function isPhysicalKeyHeld(key) {
  return isKeyHeld(key) && !gamepadState.virtualKeys.has(key);
}

function isPitchControlHeld(key) {
  return isKeyHeld(key) && !pitchControlLockoutKeys.has(key);
}

function checkSwingContact() {
  const bestHit = findBestSwingContact();
  if (!bestHit) return;
  const contact = buildContactProfile(bestHit);
  if (!contact.isContact) return;

  swingState.madeContact = true;
  playSound("hit");
  const result = promoteLiftedContactResult(decideHitResult(contact));
  showBattingFeedback(contact, result);
  result.direction = result.direction || (result.popupFly
    ? getPopupFlyDirection(contact.timeDiff)
    : result.routineFly
    ? getRoutineFlyDirection(contact.timeDiff)
    : result.frontDrop
    ? getFrontDropDirection(contact.timeDiff)
    : result.grounderGap || result.gapLiner
    ? getInfieldGapGrounderDirection(contact.timeDiff)
    : getHitDirection(contact.timeDiff, result.kind === "foul"));
  result.direction = nudgeGoodContactDirectionFair(result.direction, contact, result);
  if ((result.kind === "hit" || result.kind === "out") && !isFairDirection(result.direction)) {
    result.label = hitLabels.foul;
    result.kind = "foul";
    result.power = Math.min(result.power, 0.32);
  }
  finishPitch(result.label, result.kind, result.power, contact.timeDiff, result.direction, result.battedProfile ?? null);
}

function nudgeGoodContactDirectionFair(direction, contact, result = {}) {
  if (!direction || !contact || result.kind === "foul" || result.battedProfile?.isFoul) return direction;
  if (result.kind !== "hit" && result.kind !== "out") return direction;
  if (isFairDirection(direction)) return direction;
  const score = getContactFeedbackScore(contact);
  if (score < 0.5) return direction;
  const timingPull = clamp((contact.timeDiff ?? 0) / 260, -1, 1);
  const tooFarOutFrontOrLate = Math.abs(timingPull) > (score >= 0.6 ? 0.92 : 0.86);
  if (tooFarOutFrontOrLate && score < 0.68) return direction;
  const fairRatio = Math.tan(55 * Math.PI / 180) * (score >= 0.6 ? 0.9 : 0.97);
  const y = direction.y < -0.05 ? direction.y : -Math.max(0.2, Math.abs(direction.y || 0.7));
  return normalize({
    x: Math.sign(direction.x || timingPull || 1) * Math.abs(y) * fairRatio,
    y
  });
}

function showBattingFeedback(contact, result = {}) {
  battingFeedback = {
    active: true,
    startTime: performance.now(),
    lines: buildBattingFeedbackLines(contact, result)
  };
}

function buildBattingFeedbackLines(contact, result = {}) {
  const isBunt = Boolean(result.battedProfile?.isBunt);
  const timingAbs = Math.abs(contact.timeDiff ?? 0);
  const timingLabel = contact.timeDiff < -35
    ? `${Math.round(timingAbs)}ms 早い`
    : contact.timeDiff > 35
      ? `${Math.round(timingAbs)}ms 遅い`
      : `${Math.round(timingAbs)}ms ほぼ合い`;
  const sweetSpotScore = clamp(contact.sweetSpotScore ?? 0, 0, 1);
  const barrelScore = clamp(contact.barrelScore ?? 0, 0, 1);
  const zoneScore = getFeedbackZoneScore(contact);
  const practicalSweetSpotScore = getPracticalSweetSpotScore(contact);
  const zoneText = getFeedbackZoneText(contact);
  const balancedScore = isBunt
    ? getBuntFeedbackScore({ barrelScore })
    : getBattingFeedbackBalancedScore(getBattingFeedbackScoreInput(contact, result.battedProfile));
  if (isBunt) {
    const buntAimText = (contact.buntAimMagnitude ?? result.battedProfile?.buntAimControl ?? 0) > 0 ? "あり" : "なし";
    return [
      getBattingFeedbackResultText(result),
      `バント評価: バットの当たり ${Math.round(barrelScore * 100)}% / 方向入力 ${buntAimText}`,
      `総合: ${Math.round(balancedScore * 100)}%`
    ];
  }
  return [
    getBattingFeedbackResultText(result),
    `タイミング: ${timingLabel}`,
    `スイートスポット: ${Math.round(practicalSweetSpotScore * 100)}% / 接触の深さ: ${Math.round(barrelScore * 100)}%`,
    zoneText,
    `総合: ${Math.round(balancedScore * 100)}%`
  ];
}

function getBattingFeedbackResultText(result = {}) {
  const label = result?.label || result?.battedProfile?.label || "打球";
  return `打球: ${label}`;
}

function getBattingFeedbackBalancedScore(scores) {
  return getDisplayedBattingFeedbackScore(scores);
}

function getFeedbackZoneScore(contact = {}) {
  return clamp(contact.zoneScore ?? (contact.inGoodContactZone ? 1 : 0), 0, 1);
}

function getFeedbackZoneRate(contact = {}) {
  if (Number.isFinite(contact.zoneDistanceRate)) return Math.max(0, contact.zoneDistanceRate);
  return Math.max(0, (1 - getFeedbackZoneScore(contact)) * 100);
}

function getPracticalSweetSpotScore(contact = {}) {
  const sweetSpotScore = clamp(contact.sweetSpotScore ?? 0, 0, 1);
  const barrelScore = clamp(contact.barrelScore ?? 0, 0, 1);
  const quality = clamp(contact.quality ?? 0, 0, 1);
  return clamp(Math.max(sweetSpotScore, Math.min(barrelScore, quality) * 0.72), 0, 1);
}

function getFeedbackZoneText(contact = {}) {
  const rate = Math.round(getFeedbackZoneRate(contact));
  return `ゾーン: ${getZoneRateLabel(rate)} ${rate}%`;
}

function getZoneRateLabel(rate = 0) {
  if (rate <= 30) return "中心";
  if (rate <= 70) return "中間";
  if (rate <= 100) return "端";
  if (rate <= 130) return "少し外れ";
  if (rate <= 170) return "外れ";
  return "大外れ";
}

function getBattingFeedbackScoreInput(contact = {}, profile = null) {
  return {
    timingScore: clamp(contact.timingScore ?? 0, 0, 1),
    sweetSpotScore: getPracticalSweetSpotScore(contact),
    barrelScore: clamp(contact.barrelScore ?? 0, 0, 1),
    zoneScore: getFeedbackZoneScore(contact),
    zoneDistanceRate: getFeedbackZoneRate(contact),
    quality: clamp(contact.quality ?? 0, 0, 1),
    profileScore: getBattedBallProfileScore(profile)
  };
}

// バントはゾーンではなく、バットにボールが当たったかどうかで評価する。
// 当たっていれば基本的に成立し、芯を外すほど質が落ちる。
function getBuntFeedbackScore(scores = {}) {
  const contact = clamp(scores.barrelScore ?? scores.contactScore ?? 0, 0, 1);
  return clamp(buntTuning.contactBase + contact * buntTuning.contactScale, 0, 1);
}

function getBattedBallProfileScore(profile = null) {
  if (!profile) return null;
  const exitVelocity = clamp(profile.exitVelocity ?? 0, 0, 1.75);
  const carry = clamp(profile.carry ?? 0, 0, 1.85);
  const launchAngle = Number.isFinite(profile.launchAngle) ? profile.launchAngle : 0;
  const angleScore = clamp(1 - Math.abs(launchAngle - 22) / 38, 0, 1);
  const lowLineScore = clamp(1 - Math.abs(launchAngle - 12) / 24, 0, 1) * clamp((exitVelocity - 0.42) / 0.5, 0, 1);
  const flyDriveScore = clamp(1 - Math.abs(launchAngle - 30) / 30, 0, 1) * clamp((carry - 0.52) / 0.58, 0, 1);
  const angleQuality = Math.max(angleScore, lowLineScore, flyDriveScore);
  const distanceQuality = clamp((carry - 0.22) / 1.12, 0, 1);
  const speedQuality = clamp((exitVelocity - 0.28) / 0.98, 0, 1);
  return clamp(speedQuality * 0.4 + angleQuality * 0.26 + distanceQuality * 0.34, 0, 1);
}

function getRawBattingFeedbackScore(scores) {
  const timing = clamp(scores.timingScore ?? 0, 0, 1);
  const sweetSpot = clamp(scores.sweetSpotScore ?? 0, 0, 1);
  const barrel = clamp(scores.barrelScore ?? 0, 0, 1);
  const zone = clamp(scores.zoneScore ?? 0, 0, 1);
  const zoneDistanceRate = Number.isFinite(scores.zoneDistanceRate)
    ? Math.max(0, scores.zoneDistanceRate)
    : Math.max(0, (1 - zone) * 100);
  const quality = clamp(scores.quality ?? 0, 0, 1);
  const profileScore = Number.isFinite(scores.profileScore) ? clamp(scores.profileScore, 0, 1) : null;
  const hiddenResultScore = profileScore === null ? quality : clamp(quality * 0.58 + profileScore * 0.42, 0, 1);
  const weighted = timing * 0.16 + sweetSpot * 0.12 + barrel * 0.11 + zone * 0.32 + hiddenResultScore * 0.29;
  const timingCap = timing < 0.4 ? 0.66 : timing < 0.55 ? 0.78 : timing < 0.72 ? 0.9 : 1;
  const zoneCap = getZoneBattingFeedbackCap(zoneDistanceRate);
  return clamp(Math.min(weighted, timingCap, zoneCap), 0, 1);
}

function getZoneBattingFeedbackCap(rate = 0) {
  const zoneDistanceRate = Math.max(0, rate);
  if (zoneDistanceRate <= 100) return 1;
  if (zoneDistanceRate <= 130) return 0.7;
  if (zoneDistanceRate <= 170) return 0.5;
  return 0.3;
}

function getDisplayedBattingFeedbackScore(scores) {
  const raw = getRawBattingFeedbackScore(scores);
  return clamp(raw, 0, 1);
}

function promoteLiftedContactResult(result) {
  const profile = result?.battedProfile;
  if (!profile || result.kind !== "hit") return result;
  if (["forcedWeak", "severe"].includes(getGoodContactZoneMissStage(profile.plateDistance ?? 0))) return result;
  if (result.deepDrive || result.fenceEdgeFly || result.fenceLiner || result.chaseFly || result.lineLiner) return result;
  const powerDriveScore = getPowerDriveScore();
  if (profile.isFoul || profile.launchAngle < 16 || profile.exitVelocity < 0.78 || profile.carry < 0.62) return result;
  if (powerDriveScore < 0.18) return result;
  if (shouldTurnModerateLiftIntoStrongHit(profile)) {
    return makeStrongFeedbackGroundDriveResult(profile);
  }
  if (profile.carry >= 0.92 || profile.launchAngle >= 26 || profile.fenceEdgeFlyScore >= 0.36) {
    return powerDriveScore >= 0.42 ? makeDeepDriveResultFromProfile(profile) : makeFenceEdgeFlyResultFromProfile(profile);
  }
  return makeFenceEdgeFlyResultFromProfile(profile);
}

function playSound(name) {
  if (!audioSettings.soundEffects) return;
  const sound = sounds[name];
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function playScoringCheer(runs) {
  if (runs > 0) playSound("cheer");
}

function updateHomeRunFireworksSound(elapsedSeconds) {
  const fireworks = defenseState.homeRunFireworks;
  if (!fireworks || defenseState.homeRunFireworksSoundPlayed) return;
  if (elapsedSeconds < fireworks.startDelay) return;
  defenseState.homeRunFireworksSoundPlayed = true;
  playSound("firework");
}

function updateAudioToggleButtons() {
  soundToggleButtons.forEach((button) => {
    button.textContent = audioSettings.soundEffects ? "効果音 ON" : "効果音 OFF";
    button.setAttribute("aria-pressed", String(audioSettings.soundEffects));
  });
  bgmToggleButtons.forEach((button) => {
    const isPlayingOrStarting = audioSettings.bgm && currentBgmKey && !bgmNeedsUserGesture;
    button.textContent = !audioSettings.bgm
      ? "BGM OFF"
      : isPlayingOrStarting
        ? "BGM ON"
        : "BGM開始";
    button.setAttribute("aria-pressed", String(audioSettings.bgm));
  });
}

function setSoundEffectsEnabled(enabled) {
  audioSettings.soundEffects = enabled;
  updateAudioToggleButtons();
}

function setBgmEnabled(enabled) {
  audioSettings.bgm = enabled;
  if (enabled) {
    updateCurrentBgm(true);
  } else {
    pauseAllBgm();
  }
  updateAudioToggleButtons();
}

function toggleSoundEffects() {
  setSoundEffectsEnabled(!audioSettings.soundEffects);
}

function toggleBgm() {
  setBgmEnabled(!audioSettings.bgm);
}

function handleBgmButtonClick() {
  if (audioSettings.bgm && (bgmNeedsUserGesture || !currentBgmKey)) {
    unlockBgmAfterUserGesture();
    return;
  }
  toggleBgm();
}

function getCurrentBgmKey() {
  if (gamePhase === "menu" || gamePhase === "gameover") return "menu";
  if (gamePhase !== "playing" && gamePhase !== "defense") return null;
  return bases.second || bases.third ? "scoring" : "relaxed";
}

function pauseAllBgm() {
  Object.values(bgmTracks).forEach((track) => {
    track.muted = true;
    if (typeof track.pause === "function") track.pause();
  });
  currentBgmKey = null;
  bgmNeedsUserGesture = false;
}

function updateCurrentBgm(force = false) {
  const nextKey = getCurrentBgmKey();
  if (!audioSettings.bgm || !nextKey) {
    pauseAllBgm();
    return;
  }
  if (!force && currentBgmKey === nextKey) return;

  Object.entries(bgmTracks).forEach(([key, track]) => {
    if (key === nextKey) return;
    track.muted = true;
    if (typeof track.pause === "function") track.pause();
  });

  const nextTrack = bgmTracks[nextKey];
  if (!nextTrack) return;
  currentBgmKey = nextKey;
  nextTrack.muted = false;
  const playResult = nextTrack.play?.();
  if (playResult?.catch) {
    playResult
      .then(() => {
        bgmNeedsUserGesture = false;
        updateAudioToggleButtons();
      })
      .catch(() => {
        bgmNeedsUserGesture = true;
        if (currentBgmKey === nextKey) currentBgmKey = null;
        updateAudioToggleButtons();
      });
  } else {
    bgmNeedsUserGesture = false;
    updateAudioToggleButtons();
  }
}

function unlockBgmAfterUserGesture() {
  if (!audioSettings.bgm) return;
  if (!bgmNeedsUserGesture && currentBgmKey) return;
  updateCurrentBgm(true);
}

function findBestSwingContact() {
  const swingProgress = getBatSwingProgress();
  const previousProgress = Math.min(swingState.lastCheckProgress, swingProgress);
  const sweep = swingProgress - previousProgress;
  const samples = Math.max(8, Math.ceil(Math.abs(sweep) * 36));
  let bestHit = null;
  for (let i = 0; i <= samples; i += 1) {
    const sampleRatio = i / samples;
    const progress = previousProgress + sweep * sampleRatio;
    const sampleX = ball.prevX + (ball.x - ball.prevX) * sampleRatio;
    const sampleY = ball.prevY + (ball.y - ball.prevY) * sampleRatio;
    const bat = getBatSegment(progress);
    const batContact = closestPointOnSegment(sampleX, sampleY, bat.x1, bat.y1, bat.x2, bat.y2);
    if (!bestHit || batContact.distance < bestHit.distanceToBat) {
      bestHit = { batContact, distanceToBat: batContact.distance, x: sampleX, y: sampleY };
    }
  }
  swingState.lastCheckProgress = swingProgress;
  return bestHit;
}

function buildContactProfile(bestHit) {
  const distanceToBat = bestHit.distanceToBat;
  const batterMeet = getEffectiveBatterMeet(activeBatter);
  const meetBonus = (batterMeet - 5) * 3;
  const meetContactScale = getMeetBatContactScale();
  const nearPlate = Math.abs(bestHit.y - field.plateY) < 138 + meetBonus;
  const inGoodContactZone = isBallInGoodContactZone(bestHit.x, bestHit.y, ball.radius);
  const strikeZoneDistance = distanceToHomePlate(bestHit.x, bestHit.y, ball.radius);
  const outsideStrikeZone = strikeZoneDistance > 0;
  const outsideContactPoint = isOutsideContactPoint(bestHit.x);
  const outsideReachBonus = outsideStrikeZone && outsideContactPoint ? ball.radius * 2 : 0;
  // 黄色ゾーン外でも実際にはストライクの球 (際どいコース) は、ミートが低い打者でも
  // 最低限バットには当てられるようにしたい。ここに meetBonus をフルで掛けると、
  // 低ミート打者にとって「際どいストライク」が「明らかなボール球」とほぼ同じ難易度になり、
  // 空振り確定に近くなってしまうため、この帯だけ meet の影響を弱める。
  const edgeStrikeMeetBonus = meetBonus * edgeStrikeContactTuning.meetScale;
  const rawPreExtensionContactRange = ((inGoodContactZone ? ball.radius + 58 + meetBonus : outsideStrikeZone ? ball.radius + 22 + meetBonus : ball.radius + edgeStrikeContactTuning.reachBonus + edgeStrikeMeetBonus)) * batThicknessMultiplier * meetContactScale;
  const preExtensionContactRange = rawPreExtensionContactRange * meetZoneWidthScale;
  const baseContactRange = preExtensionContactRange + outsideReachBonus * batThicknessMultiplier * meetZoneWidthScale;
  // 際どいストライクで「広げた帯」に頼って当てた度合い。
  // ここに頼った打球は quality を落として、ヒットではなくファウルや凡打に寄せる。
  const isEdgeStrikeContact = !inGoodContactZone && !outsideStrikeZone;
  const edgeStrikeReferenceRange = isEdgeStrikeContact
    ? (ball.radius + edgeStrikeContactTuning.referenceReachBonus + edgeStrikeMeetBonus)
      * batThicknessMultiplier * meetContactScale * meetZoneWidthScale
    : 0;
  const edgeExtendedUse = isEdgeStrikeContact && preExtensionContactRange > edgeStrikeReferenceRange
    ? clamp(
        (distanceToBat - edgeStrikeReferenceRange) / Math.max(1, preExtensionContactRange - edgeStrikeReferenceRange),
        0,
        1
      )
    : 0;

  const timeDiff = performance.now() - ball.plateTime;
  const timingScore = Math.max(0, 1 - Math.abs(timeDiff) / ((360 + batterMeet * 7) * 0.7));
  // 判定バットを太くした分、快打評価では中心線からの距離を少し戻す。
  const effectiveBatDistance = distanceToBat / batThicknessMultiplier;
  const barrelScore = Math.max(0, 1 - effectiveBatDistance / ((78 + batterMeet * 4) * 1.05));
  const sweetSpotScore = isBuntStanceActive() ? 1 : getContactSweetSpotScore(bestHit);
  const plateDistance = distanceToGoodContactZone(bestHit.x, bestHit.y, ball.radius);
  const zoneDistanceRate = getGoodContactZoneDistanceRate(bestHit.x, bestHit.y, ball.radius);
  const zoneMissUnits = getGoodContactZoneMissUnits(plateDistance, ball.radius);
  const zoneMissStage = getGoodContactZoneMissStage(plateDistance);
  const zoneMissPenalty = getGoodContactZoneMissPenalty(zoneMissUnits);
  const contactSweetSpotForRange = isBuntStanceActive() ? 1 : sweetSpotScore;
  const naturalContactRange = baseContactRange
    * getInsideMishitContactMultiplier(bestHit, contactSweetSpotForRange, outsideStrikeZone)
    * getGoodContactZoneMissContactMultiplier(zoneMissUnits, outsideStrikeZone);
  const contactRescueExtension = ball.radius * 2;
  const contactRange = naturalContactRange + contactRescueExtension;
  const contactRescueUse = nearPlate
    ? clamp((distanceToBat - naturalContactRange) / Math.max(1, contactRescueExtension), 0, 1)
    : 0;
  const zoneReach = (68 + batterMeet * 12) * battingGoodContactZoneScale;
  const zoneScore = getZoneScoreFromDistanceRate(zoneDistanceRate);
  const zoneBand = getContactZoneBand({ inGoodContactZone, plateDistance, zoneScore, zoneDistanceRate });
  const zoneCenterBonus = inGoodContactZone ? Math.pow(zoneScore, 5.2) * 0.62 : 0;
  const zoneEdgePenalty = inGoodContactZone ? (Math.pow(1 - zoneScore, 0.72) * 0.82 + clamp((0.48 - zoneScore) / 0.48, 0, 1) * 0.18) * 1.5 : 0;
  const rescueChasePenalty = contactRescueUse * (outsideStrikeZone || !inGoodContactZone ? 0.74 : 0.42);
  const chasePenalty = (inGoodContactZone ? clamp(Math.pow(1 - zoneScore, 0.74) * 1.35, 0, 1.35) : clamp(zoneMissPenalty, 0, 1.45)) + rescueChasePenalty;
  const stuffPenalty = getPitcherStuffPressure(activePitcher);
  const naturalOutsideReachUse = outsideStrikeZone && outsideContactPoint
    ? clamp((distanceToBat - preExtensionContactRange * 0.86) / Math.max(1, baseContactRange - preExtensionContactRange * 0.86), 0, 1)
    : 0;
  const outsideReachUse = clamp(Math.max(naturalOutsideReachUse, contactRescueUse * 1.18), 0, 1.35);
  const edgePenalty = (inGoodContactZone ? zoneEdgePenalty : 0.58) + outsideReachUse * 0.46 + zoneMissPenalty * 0.86 + contactRescueUse * 0.32;
  const yellowZoneBoost = getYellowZoneContactBoost(inGoodContactZone, outsideStrikeZone, zoneScore);
  const lowMeetPressure = clamp((10 - batterMeet) / 7, 0, 1);
  const sweetSpotMiss = 1 - sweetSpotScore;
  const sweetSpotPenalty = (sweetSpotMiss * (inGoodContactZone ? 0.1 : 0.24)
    + Math.pow(sweetSpotMiss, 1.18) * lowMeetPressure * (inGoodContactZone ? 0.18 : 0.34)) * 1.2;
  const lowMeetQualityDrag = sweetSpotMiss * lowMeetPressure * 0.132;
  const rawQuality = timingScore * 0.34 + barrelScore * 0.2 + sweetSpotScore * 0.16 + zoneScore * 0.22 + 0.1 + (inGoodContactZone ? 0.02 + Math.pow(zoneScore, 3.35) * 0.16 + zoneCenterBonus : 0) + yellowZoneBoost - chasePenalty - stuffPenalty - edgePenalty - sweetSpotPenalty - lowMeetQualityDrag;
  const hittableShape = clamp(timingScore * 0.26 + barrelScore * 0.22 + sweetSpotScore * 0.2 + zoneScore * 0.32, 0, 1);
  const goodContactEase = Math.max(0, rawQuality) * (goodContactEaseScale - 1) * (0.55 + hittableShape * 0.45);
  const quality = clamp(rawQuality + goodContactEase, 0, 1);
  const buntAim = isBuntStanceActive() ? getBuntAimForContact() : { x: 0, y: 0, magnitude: 0 };
  return {
    isContact: nearPlate && distanceToBat <= contactRange,
    // 届く範囲は式が入り組んでいるので、判定に使った値をそのまま返す。
    // テスト側で式を組み直すと、本体を変えたときに気付かず食い違う。
    naturalContactRange,
    contactRescueExtension,
    contactRange,
    // 際どいストライクで「広げた帯」に頼って当てた度合い (ファウル判定で使う)
    edgeExtendedUse,
    x: bestHit.x,
    y: bestHit.y,
    timeDiff,
    timingScore,
    barrelScore,
    sweetSpotScore,
    zoneScore,
    zoneDistanceRate,
    zoneBand,
    plateDistance,
    zoneMissUnits,
    zoneMissStage,
    outsideStrikeZone,
    outsideReachUse,
    contactRescueUse,
    inGoodContactZone,
    yellowZoneBoost,
    quality,
    buntAimX: buntAim.x,
    buntAimY: buntAim.y,
    buntAimMagnitude: buntAim.magnitude
  };
}

function getInsideMishitContactMultiplier(bestHit, sweetSpotScore, outsideStrikeZone = false) {
  if (!isInsideContactPoint(bestHit?.x)) return 1;
  const insideDepth = getInsideContactDepth(bestHit.x);
  if (insideDepth <= 0) return 1;
  const sweetSpotMiss = clamp((0.22 - sweetSpotScore) / 0.22, 0, 1);
  const depthFactor = clamp(insideDepth / (field.strikeZoneWidth * 0.42), 0, 1);
  const penalty = outsideStrikeZone ? pitcherAbilityTuning.insideChasePenalty : pitcherAbilityTuning.insideMishitPenalty;
  const floor = outsideStrikeZone ? pitcherAbilityTuning.insideChaseFloor : pitcherAbilityTuning.insideMishitFloor;
  return clamp(1 - sweetSpotMiss * depthFactor * penalty, floor, 1);
}

function getContactSweetSpotScore(bestHit) {
  if (!isBuntStanceActive()) return getSweetSpotScore(bestHit.batContact.t);
  const reference = getSweetSpotReferenceSegment();
  const contact = closestPointOnSegment(bestHit.x, bestHit.y, reference.x1, reference.y1, reference.x2, reference.y2);
  return getSweetSpotScore(contact.t);
}

function isInsideContactPoint(x) {
  return getInsideContactDepth(x) > 0;
}

function isOutsideContactPoint(x) {
  return getOutsideContactDepth(x) > 0;
}

function getOutsideContactDepth(x) {
  const outsideOffset = activeBatterSide === "R"
    ? x - field.plateX
    : field.plateX - x;
  return Math.max(0, outsideOffset);
}

function getInsideContactDepth(x) {
  const insideOffset = activeBatterSide === "R"
    ? field.plateX - x
    : x - field.plateX;
  return Math.max(0, insideOffset);
}

function getYellowZoneContactBoost(inGoodContactZone, outsideStrikeZone, zoneScore) {
  if (inGoodContactZone) {
    const centeredScore = clamp(zoneScore ?? 0, 0, 1);
    return yellowZoneHitTuning.maxContactBoost * Math.pow(centeredScore, 2.45);
  }
  return 0;
}

function getGoodContactZoneMissUnits(distance = 0, radius = ball.radius) {
  return Math.max(0, distance) / Math.max(1, radius * 2);
}

// outsideStrikeZone (実際にストライクゾーンの外＝チェイス球) はこれまで通り厳しいまま。
// 逆に「黄色ゾーンからは外れているが実際にはストライク」の際どいコースは、
// 大きく外れていても最低限バットに当たる可能性を残すため、床を高くする。
function getGoodContactZoneMissContactMultiplier(missUnits = 0, outsideStrikeZone = false) {
  const units = clamp(missUnits, 0, 3);
  const floor = outsideStrikeZone ? 0.24 : 0.55;
  if (units <= 0) return 1;
  if (units <= 1) return Math.max(floor, 1 - units * 0.38);
  if (units <= 2) return Math.max(floor, 0.62 - (units - 1) * 0.26);
  return floor;
}

function getGoodContactZoneMissPenalty(missUnits = 0) {
  const units = clamp(missUnits, 0, 3);
  if (units <= 0) return 0;
  return clamp(units * 0.46 + Math.max(0, units - 1) * 0.34, 0, 1.45);
}

function getGoodContactZoneMissStage(distance = 0) {
  const px = Math.max(0, distance);
  if (px >= 40) return "severe";
  if (px >= 30) return "forcedWeak";
  if (px >= 16) return "clear";
  if (px > 0) return "slight";
  return "inside";
}

function isStrongHitResult(result) {
  return Boolean(result?.scoreType === "homer"
    || result?.deepDrive
    || result?.fenceLiner
    || result?.fenceEdgeFly
    || result?.chaseFly
    || result?.lineLiner
    || result?.hardOutfieldHit
    || result?.hardOutfieldBounce);
}

function getContactZoneBand(contact = {}) {
  const rate = getFeedbackZoneRate(contact);
  if (rate <= 30) return "center";
  if (rate <= 70) return "middle";
  if (rate <= 100) return "edge";
  if (rate <= 130) return "slightOutside";
  if (rate <= 170) return "outside";
  return "farOutside";
}

function getZoneBandContactScore(contact = {}, profile = null) {
  const timing = clamp(contact.timingScore ?? 0, 0, 1);
  const sweetSpot = clamp(contact.sweetSpotScore ?? 0, 0, 1);
  const barrel = clamp(contact.barrelScore ?? 0, 0, 1);
  const quality = clamp(contact.quality ?? 0, 0, 1);
  const profileScore = Number.isFinite(profile?.feedbackScore)
    ? clamp(profile.feedbackScore, 0, 1)
    : clamp(getBattedBallProfileScore(profile) ?? quality, 0, 1);
  return clamp(timing * 0.2 + sweetSpot * 0.22 + barrel * 0.18 + quality * 0.24 + profileScore * 0.16, 0, 1);
}

function judgePitchAtPlate() {
  if (swingState.madeContact) return;
  if (swingState.didSwingThisPitch) {
    finishPitch("空振り", "strike", 0, performance.now() - ball.plateTime);
    return;
  }
  const inZone = ball.touchedPlate || isBallInStrikeZone();
  finishPitch(inZone ? "見逃しストライク" : "ボール", inZone ? "strike" : "ball", 0, 0);
}

function decideHitResult(contact) {
  return decideHitResultFromBattedProfile(contact);
}

function shouldResolveBuntProfileAsPopupFly(profile) {
  return Boolean(profile?.isBunt
    && !profile.pitcherBuntPopup
    && !profile.popupConvertedToPitcherFront
    && !profile.buntPitcherFrontGrounder
    && (profile.launchAngle ?? 0) >= 12);
}

function decideHitResultFromBattedProfile(contact) {
  const profile = buildBattedBallProfile(contact);
  contact.battedProfile = profile;
  const roll = Math.random();

  if (profile.isFoul) {
    return { label: hitLabels.foul, kind: "foul", power: profile.power, direction: profile.direction, battedProfile: profile };
  }
  if (profile.isBunt && (profile.pitcherBuntPopup || shouldResolveBuntProfileAsPopupFly(profile))) {
    return makePopupFlyResultFromProfile({
      ...profile,
      pitcherBuntPopup: true
    });
  }
  if (profile.isBunt) {
    return makeBuntGrounderResultFromProfile(profile);
  }

  const feedbackScore = getContactFeedbackScore(contact);
  return decideUnifiedBattedBallResult(contact, profile, feedbackScore, roll);
}

function decideUnifiedBattedBallResult(contact, profile, feedbackScore, roll = Math.random()) {
  const zoneBand = contact.zoneBand ?? getContactZoneBand(contact);
  const zoneRate = getFeedbackZoneRate(contact);
  const zoneScore = clamp(contact.zoneScore ?? profile.zoneScore ?? 0, 0, 1);
  const timingScore = clamp(contact.timingScore ?? profile.timingScore ?? 0, 0, 1);
  const sweetSpotScore = clamp(contact.sweetSpotScore ?? profile.sweetSpotScore ?? 0, 0, 1);
  const rawQuality = clamp(
    feedbackScore * 0.58
      + zoneScore * 0.2
      + timingScore * 0.12
      + sweetSpotScore * 0.1,
    0,
    1
  );
  const zoneQualityScale = zoneBand === "center"
    ? 1.08
    : zoneBand === "middle"
      ? 1
      : zoneBand === "edge"
        ? 0.82
        : zoneBand === "slightOutside"
          ? 0.62
          : zoneBand === "outside"
            ? 0.42
            : 0.24;
  const quality = clamp(0.16 + rawQuality * zoneQualityScale + randomBetween(-0.09, 0.09), 0, 1);
  const unifiedProfile = {
    ...profile,
    feedbackScore: quality,
    displayOverallScore: feedbackScore,
    unifiedBattedBall: true,
    unifiedQuality: quality,
    zoneBand,
    zoneDistanceRate: zoneRate,
    preserveUnifiedDirection: true
  };

  const outsideFoulChance = zoneBand === "slightOutside"
    ? 0.3
    : zoneBand === "outside"
      ? 0.44
      : zoneBand === "farOutside"
        ? 0.58
        : zoneBand === "edge"
          ? 0.12
          : 0.03;
  if (roll < outsideFoulChance) {
    return {
      label: hitLabels.foul,
      kind: "foul",
      power: clamp(profile.power ?? 0.36, 0.14, 0.62),
      direction: profile.direction,
      battedProfile: unifiedProfile
    };
  }

  const launchAngle = profile.launchAngle ?? 10;
  const trajectoryRoll = Math.random();
  const grounderSwing = profile.swingType === "grounder";
  let trajectory = launchAngle < 8 ? "grounder" : launchAngle < 18 ? "liner" : "fly";
  if (quality < 0.38 && trajectoryRoll < 0.28) trajectory = "popup";
  else if (quality < 0.5 && trajectoryRoll < 0.46) trajectory = "fly";
  else if (quality < 0.72 && trajectoryRoll < 0.25) trajectory = "fly";
  else if (trajectory === "grounder" && trajectoryRoll > 0.86) trajectory = "liner";
  else if (trajectory === "liner" && trajectoryRoll > 0.82) trajectory = "fly";
  else if (trajectory === "fly" && trajectoryRoll < 0.1) trajectory = "liner";
  if (grounderSwing) {
    if (trajectory === "popup" && quality >= 0.48 && trajectoryRoll > 0.18) trajectory = "grounder";
    else if (trajectory === "fly") trajectory = trajectoryRoll < 0.84 ? "grounder" : "liner";
    else if (trajectory === "liner" && trajectoryRoll < 0.72) trajectory = "grounder";
  }

  const displayedOverall = clamp(feedbackScore, 0, 1);
  const liftGrade = clamp(Math.max(quality, displayedOverall * 0.96), 0, 1);
  if (!grounderSwing && liftGrade >= 0.6 && (zoneBand === "center" || zoneBand === "middle") && trajectory !== "fly") {
    const powerDrive = clamp(getPowerDriveScore(), 0, 1);
    const liftChance = clamp(
      0.18 + ((liftGrade - 0.6) / 0.4) * 0.55 + powerDrive * 0.14,
      0.18,
      0.86
    );
    if (Math.random() < liftChance) trajectory = "fly";
  }

  if (zoneBand === "farOutside" && Math.random() < 0.54) trajectory = Math.random() < 0.52 ? "popup" : "grounder";
  else if (zoneBand === "outside" && Math.random() < 0.34) trajectory = Math.random() < 0.45 ? "popup" : "grounder";

  if (trajectory === "popup") return makeUnifiedPopupResult(unifiedProfile, quality);
  if (trajectory === "grounder") return makeUnifiedGrounderResult(unifiedProfile, quality);
  if (trajectory === "liner") return makeUnifiedLinerResult(unifiedProfile, quality);
  return makeUnifiedFlyResult(unifiedProfile, quality);
}

function makeUnifiedResultProfile(profile, trajectory, distanceRatio) {
  return {
    ...profile,
    unifiedTrajectory: trajectory,
    unifiedDistanceRatio: distanceRatio,
    preserveUnifiedDirection: true
  };
}

function makeUnifiedPopupResult(profile, quality) {
  const resultProfile = {
    ...makeUnifiedResultProfile(profile, "fly", randomBetween(0.1, 0.22)),
    unifiedFlightTimeScale: 1.9
  };
  return makePopupFlyResultFromProfile({
    ...resultProfile,
    power: clamp(0.26 + quality * 0.22, 0.26, 0.5)
  });
}

function makeUnifiedGrounderResult(profile, quality) {
  const directionX = Math.abs(profile.direction?.x ?? 0);
  if (quality < 0.3) {
    const resultProfile = makeUnifiedResultProfile(profile, "grounder", randomBetween(0.1, 0.2));
    return makeGrounderOutResultFromProfile(resultProfile, randomBetween(0.22, 0.4), {
      classification: "weak",
      keepProfileDirection: true,
      power: randomBetween(0.22, 0.4)
    });
  }
  if (quality < 0.5) {
    const resultProfile = makeUnifiedResultProfile(profile, "grounder", randomBetween(0.18, 0.32));
    return makeGrounderOutResultFromProfile(resultProfile, randomBetween(0.42, 0.64), {
      classification: "routine",
      keepProfileDirection: true,
      power: randomBetween(0.42, 0.64)
    });
  }
  if (quality < 0.72) {
    const resultProfile = makeUnifiedResultProfile(profile, "grounder", randomBetween(0.28, 0.48));
    if (directionX < 0.12 && Math.random() < 0.28) return makeCenterReturnGrounderResultFromProfile(resultProfile);
    if (directionX > 0.58 && Math.random() < 0.24) return makeLineEdgeGrounderResultFromProfile(resultProfile);
    if (Math.random() < 0.46) return makeGapGrounderResult(resultProfile);
    return makeGrounderOutResultFromProfile(resultProfile, randomBetween(0.66, 0.84), {
      classification: "hard",
      keepProfileDirection: true,
      power: randomBetween(0.66, 0.84)
    });
  }
  const resultProfile = makeUnifiedResultProfile(profile, "grounder", randomBetween(0.4, 0.62));
  if (directionX < 0.14 && Math.random() < 0.3) return makeCenterReturnGrounderResultFromProfile(resultProfile);
  if (directionX > 0.5 && Math.random() < 0.3) return makeLineEdgeGrounderResultFromProfile(resultProfile);
  if (Math.random() < 0.5) return makeGapGrounderResult(resultProfile);
  return makeGrounderOutResultFromProfile(resultProfile, randomBetween(0.86, 1.06), {
    classification: "scorching",
    keepProfileDirection: true,
    power: randomBetween(0.86, 1.06)
  });
}

function makeUnifiedLinerResult(profile, quality) {
  const directionX = Math.abs(profile.direction?.x ?? 0);
  if (quality < 0.28) {
    return Math.random() < 0.58
      ? makeUnifiedPopupResult(profile, quality)
      : makeUnifiedGrounderResult(profile, quality);
  }
  if (quality < 0.5) {
    const resultProfile = makeUnifiedResultProfile(profile, "liner", randomBetween(0.3, 0.52));
    return Math.random() < 0.48
      ? makeFrontDropResultFromProfile(resultProfile)
      : makeLineDropResultFromProfile(resultProfile);
  }
  if (quality < 0.72) {
    const resultProfile = makeUnifiedResultProfile(profile, "liner", randomBetween(0.42, 0.7));
    if (directionX < 0.12 && Math.random() < 0.3) return makeCenterReturnLinerResultFromProfile(resultProfile);
    if (directionX > 0.58 && Math.random() < 0.28) return makeLineLinerResultFromProfile(resultProfile);
    return makeHardOutfieldBounceHitResultFromProfile(resultProfile);
  }
  const resultProfile = makeUnifiedResultProfile(profile, "liner", randomBetween(0.6, 0.94));
  if (directionX < 0.14 && Math.random() < 0.22) return makeCenterReturnLinerResultFromProfile(resultProfile);
  if (directionX > 0.5 && Math.random() < 0.42) return makeLineEdgeResultFromProfile(resultProfile);
  return Math.random() < 0.58
    ? makeLineLinerResultFromProfile(resultProfile)
    : makeFenceLinerResultFromProfile(resultProfile);
}

function makeUnifiedFlyResult(profile, quality) {
  const homeRunPower = getHomeRunPowerProfile();
  const displayedOverall = clamp(profile.displayOverallScore ?? quality, 0, 1);
  const homeRunGrade = clamp(Math.max(quality, displayedOverall * 0.96), 0, 1);
  const homeRunEligibilityFloor = 0.6 - homeRunPower.mishitRescue;
  if (homeRunGrade < homeRunEligibilityFloor && quality < 0.34) {
    return Math.random() < 0.38
      ? makeUnifiedPopupResult(profile, quality)
      : makeUnifiedRoutineFlyResult(profile, randomBetween(0.24, 0.48));
  }
  if (homeRunGrade < homeRunEligibilityFloor && quality < 0.58) {
    const resultProfile = makeUnifiedResultProfile(profile, "fly", randomBetween(0.38, 0.68));
    return Math.random() < 0.72
      ? makeUnifiedRoutineFlyResult(resultProfile, resultProfile.unifiedDistanceRatio)
      : makeChaseFlyResultFromProfile(resultProfile);
  }
  if (homeRunGrade < homeRunEligibilityFloor) {
    const resultProfile = makeUnifiedResultProfile(profile, "fly", randomBetween(0.64, 0.92));
    if (Math.random() < 0.68) {
      return makeChaseFlyResultFromProfile({
        ...resultProfile,
        unifiedFlightTimeScale: randomBetween(0.78, 0.94),
        unifiedOverFielderFly: true
      });
    }
    return makeToweringFlyResultFromProfile({
      ...resultProfile,
      unifiedDistanceRatio: randomBetween(0.78, 1),
      unifiedFlightTimeScale: randomBetween(0.52, 0.74),
      unifiedOverFielderFly: true
    });
  }
  const lowPowerCandidatePenalty = clamp(
    homeRunPowerTuning.lowPowerCandidatePenaltyBase - homeRunPower.standardPower * homeRunPowerTuning.lowPowerCandidatePenaltyPerPoint,
    0,
    1
  ) * (profile.zoneBand === "center" ? 1 : homeRunPowerTuning.lowPowerCandidatePenaltyOutsideMultiplier);
  const homeRunCandidateChance = clamp(
    0.12
      + ((homeRunGrade - 0.6) / 0.4) * 0.68
      + homeRunPower.candidateBonus
      - lowPowerCandidatePenalty,
    homeRunPower.superPower > 0 ? 0.06 : 0.02,
    homeRunPower.superPower > 0 ? 0.97 : 0.94
  );
  const longBallRoll = Math.random();
  if (longBallRoll < homeRunCandidateChance) {
    return makeDeepDriveResultFromProfile({
      ...makeUnifiedResultProfile(profile, "fly", randomBetween(1.1, 1.24)),
      unifiedHomerCandidate: true,
      unifiedFlightTimeScale: randomBetween(0.94, 1.06)
    });
  }
  const remainingRoll = (longBallRoll - homeRunCandidateChance) / Math.max(0.001, 1 - homeRunCandidateChance);
  if (remainingRoll < 0.42) {
    return makeFenceEdgeFlyResultFromProfile({
      ...makeUnifiedResultProfile(profile, "fly", randomBetween(1.04, 1.12)),
      unifiedForceWallHit: true,
      unifiedFlightTimeScale: randomBetween(0.9, 1.04)
    });
  }
  return makeChaseFlyResultFromProfile({
    ...makeUnifiedResultProfile(profile, "fly", randomBetween(0.76, 1)),
    unifiedFlightTimeScale: randomBetween(0.72, 0.88),
    unifiedOverFielderFly: true
  });
}

function makeUnifiedRoutineFlyResult(profile, distanceRatio) {
  return makeRoutineFlyResultFromProfile({
    ...profile,
    unifiedDistanceRatio: distanceRatio,
    unifiedFlightTimeScale: 1.34
  });
}











function makeScoreDrivenLongBallProfile(profile, { score = 0.6, zoneCenter = 0, powerDriveScore = 0, lowPower = 0, ordinaryPower = 0, superScore = 0 } = {}) {
  const scoreLift = clamp((score - 0.54) / 0.34, 0, 1);
  const nonPowerWallBias = lowPower * clamp((score - 0.74) / 0.22, 0, 1);
  const launchFloor = 17 + zoneCenter * 6 + powerDriveScore * 4 + superScore * 4 - lowPower * 2;
  const launchCeiling = 36 + powerDriveScore * 5 + superScore * 4;
  const targetLaunch = clamp(profile.launchAngle ?? 20, launchFloor, launchCeiling);
  return {
    ...profile,
    scoreDrivenLongBall: true,
    feedbackScore: Math.max(profile.feedbackScore ?? 0, score),
    power: Math.max(
      profile.power ?? 0.8,
      1.18
        + scoreLift * 0.74
        + zoneCenter * 0.28
        + powerDriveScore * 0.86
        + ordinaryPower * 0.16
        - nonPowerWallBias * 0.24
    ),
    exitVelocity: Math.max(
      profile.exitVelocity ?? 0.6,
      0.88
        + scoreLift * 0.3
        + zoneCenter * 0.18
        + powerDriveScore * 0.38
        - nonPowerWallBias * 0.08
    ),
    carry: Math.max(
      profile.carry ?? 0.58,
      0.9
        + scoreLift * 0.38
        + zoneCenter * 0.28
        + powerDriveScore * 0.54
        + superScore * 0.12
        - nonPowerWallBias * 0.18
    ),
    launchAngle: targetLaunch,
    fenceLinerScore: Math.max(profile.fenceLinerScore ?? 0, 0.22 + scoreLift * 0.2 + powerDriveScore * 0.16),
    fenceEdgeFlyScore: Math.max(profile.fenceEdgeFlyScore ?? 0, 0.42 + scoreLift * 0.34 + powerDriveScore * 0.2),
    toweringFlyScore: Math.max(profile.toweringFlyScore ?? 0, 0.24 + superScore * 0.34 + powerDriveScore * 0.18)
  };
}

function getContactFeedbackScore(contact) {
  return clamp(getRawBattingFeedbackScore(getBattingFeedbackScoreInput(contact, contact?.battedProfile)) - battingFeedbackDisplayPenalty, 0, 1);
}

function shouldTurnModerateLiftIntoStrongHit(profile, score = profile?.feedbackScore ?? profile?.quality ?? 0) {
  if (!profile || profile.isFoul) return false;
  return score >= 0.54
    && score < 0.76
    && (profile.exitVelocity ?? 0) >= 0.36
    && (profile.launchAngle ?? 0) >= 10
    && (profile.launchAngle ?? 0) <= 46;
}

function makeStrongFeedbackGroundDriveResult(profile, roll = Math.random()) {
  const strongProfile = {
    ...profile,
    feedbackScore: Math.max(profile.feedbackScore ?? 0, profile.quality ?? 0.62),
    power: Math.max(profile.power ?? 0.72, 0.86),
    exitVelocity: Math.max(profile.exitVelocity ?? 0.5, 0.8),
    carry: Math.max(profile.carry ?? 0.5, 0.62),
    launchAngle: clamp(profile.launchAngle ?? 14, 9, 18)
  };
  const sideBias = Math.abs(profile.direction?.x ?? 0) + Math.abs(profile.timingPull ?? 0) * 0.55;
  const sideChance = clamp(0.12 + sideBias * 0.8 + (profile.lineEdgeScore ?? 0) * 0.42, 0.12, 0.46);
  if (roll < sideChance) {
    return makeLineEdgeResultFromProfile(strongProfile);
  }
  if (roll < sideChance + 0.2 && (profile.launchAngle ?? 0) >= 18 && (profile.lineDropScore ?? 0) > 0.08) {
    return makeLineDropResultFromProfile(strongProfile);
  }
  return makeHardOutfieldBounceHitResultFromProfile(strongProfile);
}

function makeZoneMissWeakContactResult(profile, missUnits = 0, roll = Math.random(), stage = "clear") {
  const severe = stage === "severe";
  if (severe && roll < 0.42) {
    return { label: hitLabels.foul, kind: "foul", power: clamp(profile?.power ?? 0.24, 0.12, 0.42), direction: profile?.direction, battedProfile: profile };
  }
  if (roll < 0.26 + clamp(missUnits, 0, 3) * 0.12) {
    return { label: hitLabels.foul, kind: "foul", power: clamp(profile?.power ?? 0.34, 0.18, 0.56), direction: profile?.direction, battedProfile: profile };
  }
  if (severe) return makePopupFlyResultFromProfile({ ...profile, power: Math.min(profile?.power ?? 0.34, 0.42), launchAngle: Math.max(profile?.launchAngle ?? 24, 24) });
  if ((profile?.launchAngle ?? 0) >= 22 || roll > 0.72) return makePopupFlyResultFromProfile(profile);
  return makeGrounderOutResultFromProfile(
    profile,
    clamp((profile?.power ?? 0.48) * 0.72, 0.22, 0.62),
    { classification: "weak" }
  );
}



function shouldRouteHardContactToOpenLane(profile, contact, roll) {
  if (!profile || !contact) return false;
  if (profile.launchAngle < -1 || profile.launchAngle > 32) return false;
  if (profile.exitVelocity < 0.5 || contact.quality < 0.24 || contact.sweetSpotScore < 0.2) return false;
  const lowDriveBonus = profile.launchAngle <= 14 ? 0.14 : 0;
  const lineBonus = clamp((profile.lineEdgeScore * 1.8 + profile.lineLinerScore + profile.gapScore - 0.22) * 0.34, 0, 0.28);
  const centerContactBonus = contact.inGoodContactZone ? 0.12 : 0;
  const chance = clamp(
    0.3
      + clamp((profile.exitVelocity - 0.5) / 0.6, 0, 1) * 0.22
      + clamp((contact.quality - 0.24) / 0.5, 0, 1) * 0.14
      + lowDriveBonus
      + lineBonus
      + centerContactBonus,
    0.34,
    0.92
  );
  return roll < chance;
}

function makeHardOpenLaneResult(profile) {
  if ((profile.lowPowerHighMeetDriveSkill ?? 0) > 0.18 && (profile.exitVelocity ?? 0) >= 0.42) {
    return makeHardOutfieldBounceHitResultFromProfile(profile);
  }
  if (isCleanCenterReturnCandidate(profile)) return makeCenterReturnResultFromProfile(profile);
  if ((profile.launchAngle ?? 0) <= 13) return makeGapGrounderResult(profile);
  if (isHardOutfieldBounceCandidate(profile, profile.quality ?? profile.feedbackScore ?? 0.5)) return makeHardOutfieldBounceHitResultFromProfile(profile);
  const timingPull = Math.abs(profile.timingPull ?? 0);
  if ((profile.lineEdgeScore > 0.035 || timingPull > 0.1 || Math.abs(profile.direction?.x ?? 0) > 0.055) && Math.random() < 0.97) {
    return makeLineEdgeResultFromProfile(profile);
  }
  if ((profile.launchAngle ?? 0) <= 22 || profile.lineLinerScore > 0.12) {
    return makeLineLinerResultFromProfile(profile);
  }
  return makeGapLinerResult(profile);
}

function isCleanCenterReturnCandidate(profile) {
  if (!profile) return false;
  const launchAngle = profile.launchAngle ?? 0;
  const centerLane = Math.abs(profile.direction?.x ?? 0) <= 0.13 && Math.abs(profile.timingPull ?? 0) <= 0.21;
  return centerLane
    && launchAngle >= -1
    && launchAngle <= 22
    && (profile.exitVelocity ?? 0) >= 0.5
    && (profile.quality ?? 0) >= 0.28;
}

function isHardOutfieldBounceCandidate(profile, quality = 0.5) {
  if (!profile) return false;
  const launchAngle = profile.launchAngle ?? 0;
  return launchAngle >= 6
    && launchAngle <= 30
    && (profile.exitVelocity ?? 0) >= 0.42
    && quality >= 0.24
    && Math.abs(profile.direction?.x ?? 0) <= 0.42;
}

function makeCenterReturnResultFromProfile(profile) {
  const launchAngle = profile.launchAngle ?? 0;
  return launchAngle <= 9
    ? makeCenterReturnGrounderResultFromProfile(profile)
    : makeCenterReturnLinerResultFromProfile(profile);
}

function buildBattedBallProfile(contact) {
  const {
    timeDiff,
    quality,
    timingScore = 0.5,
    barrelScore = 0.5,
    zoneScore,
    zoneDistanceRate,
    plateDistance,
    zoneMissUnits = 0,
    outsideReachUse = 0,
    contactRescueUse = 0,
    outsideStrikeZone,
    sweetSpotScore,
    inGoodContactZone,
    yellowZoneBoost = 0,
    buntAimX = 0,
    buntAimY = 0,
    buntAimMagnitude = 0,
    edgeExtendedUse = 0
  } = contact;
  const swingType = getCurrentSwingType();
  const grounderSwing = swingType === "grounder";
  const abs = Math.abs(timeDiff);
  const power = getEffectiveBatterPower(activeBatter);
  const meet = getEffectiveBatterMeet(activeBatter);
  const powerDriveScore = getPowerDriveScore(power);
  const stuffPressure = getPitcherStuffPressure(activePitcher);
  const lowStuffProfileBoost = getLowPitcherStuffProfileBoost(activePitcher);
  const goodZoneMissDrag = getGoodContactZoneMissPenalty(zoneMissUnits);
  const rescueContactDrag = clamp(Math.max(contactRescueUse, outsideReachUse * 0.45), 0, 1.2);
  const chasePenalty = (inGoodContactZone ? Math.pow(1 - clamp(zoneScore, 0, 1), 0.74) * 0.72 : (1 - zoneScore) * 1.08 + goodZoneMissDrag + 0.62) + rescueContactDrag * 0.58;
  const timingPenaltyScale = inGoodContactZone ? 0.45 : yellowZoneBoost > 0 ? 0.68 : 1;
  const timingPenalty = (abs > 260 ? 0.18 : abs > 150 ? 0.08 : 0) * timingPenaltyScale;
  const powerBoost = (power - 5) * 0.035;
  const meetBoost = (meet - 5) * 0.018;
  const handednessContactMultiplier = getHandednessBattingContactMultiplier(activeBatter, activePitcher);
  const handednessContactBoost = handednessContactMultiplier - 1;
  const practicePitcherContactBoost = (gameMode === "practice" || isHomeRunDerbyMode()) && activePitcher?.practiceOnly && swingType !== "bunt" ? 0.16 * battingPracticeHomerBoostMultiplier : 0;
  const zoneCenterBoost = inGoodContactZone ? Math.pow(clamp(zoneScore, 0, 1), 5.1) * 0.88 : 0;
  const zoneEdgeDrag = inGoodContactZone ? (Math.pow(1 - clamp(zoneScore, 0, 1), 0.72) * 0.95 + clamp((0.5 - clamp(zoneScore, 0, 1)) / 0.5, 0, 1) * 0.22) * 0.08 : 0;
  const centerSweetSpotDriveBoost = inGoodContactZone ? zoneCenterBoost * clamp((sweetSpotScore - 0.42) / 0.48, 0, 1) : 0;
  const pitchQualityBoost = inGoodContactZone ? -0.04 + Math.pow(zoneScore, 4.1) * 0.2 + zoneCenterBoost : -0.62 - (1 - zoneScore) * 0.48 - goodZoneMissDrag * 0.46;
  const outsideZoneDrag = !inGoodContactZone ? clamp(0.5 + goodZoneMissDrag * 0.82, 0.5, 1.65) : 0;
  const sweetSpotCenterBoost = clamp((sweetSpotScore - 0.82) / 0.18, 0, 1) * 0.1;
  const lowPowerMastery = getLowPowerGoodContactMastery({ power, quality, timingScore, sweetSpotScore, barrelScore, zoneScore, inGoodContactZone });
  const profileEase = quality * (goodContactEaseScale - 1) * clamp((timingScore + barrelScore + sweetSpotScore) / 2.2, 0, 1);
  const readableQualityCore = quality + profileEase + powerBoost + meetBoost + pitchQualityBoost + practicePitcherContactBoost + sweetSpotCenterBoost + lowPowerMastery * 0.12 - zoneEdgeDrag - rescueContactDrag * 0.34;
  const readableQuality = clamp(readableQualityCore * handednessContactMultiplier - stuffPressure - chasePenalty - timingPenalty, 0, 1);
  const lowMeetPressure = clamp((10 - meet) / 7, 0, 1);
  const sweetSpotMiss = 1 - sweetSpotScore;
  const weakGrounderBias = clamp((0.66 - quality) / 0.5, 0, 1)
    * clamp((0.68 - sweetSpotScore) / 0.56, 0, 1)
    * (inGoodContactZone ? 0.72 : 1);
  const timingPull = clamp(timeDiff / 260, -1, 1);
  const yellowDriveScore = yellowZoneBoost > 0
    ? yellowZoneBoost * clamp((quality - 0.42) / 0.36, 0, 1) * clamp((sweetSpotScore - 0.52) / 0.34, 0, 1)
    : 0;
  const qualityDrag = sweetSpotMiss * (0.17 + lowMeetPressure * 0.13) + chasePenalty * 0.42 + stuffPressure + outsideZoneDrag * 1.22 + zoneEdgeDrag * 0.45 + goodZoneMissDrag * 0.86 + rescueContactDrag * 0.72;
  const centerDriveScore = inGoodContactZone
    ? clamp((zoneScore - 0.74) / 0.26, 0, 1) * clamp((quality - 0.1) / 0.38, 0, 1) * clamp((sweetSpotScore - 0.1) / 0.54, 0, 1)
    : 0;
  const centerMistakeDrive = inGoodContactZone
    ? Math.pow(clamp(zoneScore, 0, 1), 5.2)
      * clamp((timingScore + barrelScore + sweetSpotScore + quality) / 2.35, 0, 1)
      * clamp((sweetSpotScore + barrelScore) / 1.1, 0, 1)
    : 0;
  const exitVelocity = clamp(0.4 + readableQuality * 0.88 + powerBoost * 1.7 + practicePitcherContactBoost * 0.72 + lowStuffProfileBoost * 0.2 + handednessContactBoost * 0.22 + sweetSpotCenterBoost * 0.08 + yellowDriveScore * 0.12 + centerDriveScore * 0.58 + centerMistakeDrive * (0.18 + powerDriveScore * 0.1) + zoneCenterBoost * 0.62 + centerSweetSpotDriveBoost * 0.28 + lowPowerMastery * 0.24 - qualityDrag * 1.22, 0.12, 1.75);
  const hardLiftScore = clamp((exitVelocity - 0.78) / 0.58, 0, 1)
    * clamp((quality + barrelScore + timingScore) / 2.15, 0, 1)
    * clamp(zoneScore + (inGoodContactZone ? 0.18 : 0), 0, 1)
    * (0.28 + Math.max(powerDriveScore, lowPowerMastery * 0.38) * 0.72);
  const hittableLiftBoost = inGoodContactZone ? 1 + Math.pow(zoneScore, 4.2) * 11 + zoneCenterBoost * 36 + sweetSpotScore * 5 : 0;
  const yellowLiftDamping = yellowZoneBoost * yellowZoneHitTuning.liftDamping * (1 - clamp((sweetSpotScore - 0.56) / 0.34, 0, 1));
  const timingLiftPenalty = Math.abs(timingPull) * (inGoodContactZone ? 2.2 : yellowZoneBoost > 0 ? 3.6 : 6);
  const centerDriveLiftAssist = inGoodContactZone
    ? centerDriveScore * (18 + Math.max(powerDriveScore, lowPowerMastery * 0.42) * 44)
      + centerMistakeDrive * (10 + powerDriveScore * 18 + clamp((quality - 0.48) / 0.32, 0, 1) * 10)
    : 0;
  const yellowDriveLiftAssist = yellowDriveScore * yellowZoneHitTuning.driveLiftAssist;
  const hardContactLiftAssist = hardLiftScore * (inGoodContactZone ? 22 : 14);
  const liftBoost = hittableLiftBoost + readableQuality * 9.4 + sweetSpotScore * 6.6 + sweetSpotCenterBoost * 10 + centerDriveLiftAssist + yellowDriveLiftAssist + hardContactLiftAssist + lowStuffProfileBoost * 12 - yellowLiftDamping - outsideZoneDrag * 46 - zoneEdgeDrag * 12 - goodZoneMissDrag * 30;
  const mishitLift = Math.max(0, sweetSpotMiss - 0.6) * 20 + lowMeetPressure * sweetSpotMiss * 5;
  const launchAngle = clamp(
    2
      + sweetSpotScore * 31
      + readableQuality * 23
      + (power - 5) * 2.1
      + practicePitcherContactBoost * 22
      + handednessContactBoost * 5
      + lowPowerMastery * 8
      - timingLiftPenalty
      - Math.max(0, plateDistance - 44) * 0.08
      - weakGrounderBias * 4.8
      - (grounderSwing ? 62 : 0)
      + liftBoost
      + mishitLift,
    -10,
    grounderSwing ? 11 : 68
  );
  const spin = clamp((1 - sweetSpotScore) * 0.58 + Math.abs(timingPull) * 0.3 + (!inGoodContactZone ? 0.18 : 0), 0, 1.35);
  const carry = clamp(exitVelocity * (1 - spin * 0.18) + (launchAngle > 14 && launchAngle < 44 ? 0.34 : 0) + (power - 5) * 0.05 + practicePitcherContactBoost * 0.78 + lowStuffProfileBoost * 0.28 + handednessContactBoost * 0.18 + sweetSpotCenterBoost * 0.12 + lowPowerMastery * 0.28 + (inGoodContactZone ? 0.01 + Math.pow(zoneScore, 4.2) * 0.12 + centerDriveScore * (0.3 + Math.max(powerDriveScore, lowPowerMastery * 0.36) * 0.86) + centerMistakeDrive * (0.16 + powerDriveScore * 0.28) + zoneCenterBoost * 0.72 + centerSweetSpotDriveBoost * 0.24 : 0) + hardLiftScore * 0.2 + yellowZoneBoost * 0.08 + yellowDriveScore * yellowZoneHitTuning.carryBoost * 0.56 - outsideZoneDrag * 1.02 - zoneEdgeDrag * 0.35 - goodZoneMissDrag * 0.52 - weakGrounderBias * 0.045 - (grounderSwing ? 0.18 : 0), 0.08, 1.85);
  const direction = getPhysicsHitDirection(timingPull, spin, launchAngle);
  const gapScore = clamp(exitVelocity * 0.46 + sweetSpotScore * 0.3 + zoneScore * 0.22 - spin * 0.18 + Math.abs(direction.x) * 0.14, 0, 1);
  const lineContact = clamp((Math.abs(timingPull) - 0.28) / 0.58, 0, 1);
  const timingSide = getTimingSideFromPullValue(timingPull, 0.08);
  const oppositeFieldContact = timingSide === getOppositeFieldSide()
    ? clamp((Math.abs(timingPull) - 0.22) / 0.56, 0, 1)
    : 0;
  const pulledContact = timingSide === getPullSide()
    ? clamp((Math.abs(timingPull) - 0.22) / 0.56, 0, 1)
    : 0;
  const lineQuality = clamp(readableQuality * 0.58 + sweetSpotScore * 0.34 + zoneScore * 0.18 - spin * 0.16, 0, 1);
  const lowDriveContact = clamp((launchAngle - 15) / 16, 0, 1) * clamp((32 - launchAngle) / 13, 0, 1);
  const lineLinerScore = clamp(
    (0.1 + lineContact * 0.92 + lowDriveContact * 0.54 + Math.abs(direction.x) * 0.18)
      * lineQuality
      * clamp((exitVelocity - 0.42) / 0.44, 0, 1),
    0,
    0.94
  );
  const lineDropScore = clamp(
    0.2 + (0.26 + lineContact * 0.78 + Math.abs(direction.x) * 0.18)
      * (1 - sweetSpotScore * 0.24)
      * clamp((launchAngle - 8) / 18, 0, 1)
      * clamp((1.2 - exitVelocity) / 0.72, 0, 1)
      * (0.72 + readableQuality * 0.32)
      * (1 + clamp((exitVelocity - 0.5) / 0.34, 0, 1) * 0.22)
      * (1 + oppositeFieldContact * 0.68 + pulledContact * 0.2),
    0,
    0.82
  );
  const frontDropScore = clamp(
    0.04 + (0.14 + readableQuality * 0.34)
      * clamp((launchAngle - 9) / 11, 0, 1)
      * clamp((31 - launchAngle) / 15, 0, 1)
      * clamp((1.14 - exitVelocity) / 0.66, 0, 1)
      * (0.68 + (1 - sweetSpotScore) * 0.42)
      * (1 - lineContact * 0.52),
    0,
    0.46
  );
  const lineEdgeScore = clamp(
    (0.16 + lineContact * 1.22 + Math.abs(direction.x) * 0.66)
      * clamp((Math.abs(timingPull) - 0.04) / 0.3, 0, 1)
      * clamp((exitVelocity - 0.32) / 0.44, 0, 1)
      * clamp((33 - launchAngle) / 24, 0, 1)
      * (0.56 + zoneScore * 0.32 + sweetSpotScore * 0.22)
      * (1.18 + oppositeFieldContact * 0.82 + pulledContact * 0.72 + clamp((quality - 0.42) / 0.35, 0, 1) * 0.32),
    0,
    0.94
  );
  const fenceLinerScore = clamp(
    clamp((exitVelocity - 0.76) / 0.42, 0, 1)
      * clamp((carry - 0.66) / 0.42, 0, 1)
      * clamp((launchAngle - 10) / 13, 0, 1)
      * clamp((34 - launchAngle) / 18, 0, 1)
      * (0.48 + powerDriveScore * 0.54 + centerDriveScore * 0.28 + yellowDriveScore * 0.24)
      * (!inGoodContactZone ? 0.34 : 1),
    0,
    0.94
  );
  const chaseFlyScore = clamp(
    readableQuality
      * clamp((launchAngle - 27) / 20, 0, 1)
      * clamp((carry - 0.72) / 0.4, 0, 1)
      * (0.82 + Math.abs(timingPull) * 0.38),
    0,
    0.9
  ) * (!inGoodContactZone ? 0.34 : 1);
  const toweringFlyScore = clamp(
    readableQuality
      * sweetSpotScore
      * clamp((power - 5.5) / 4.5, 0, 1)
      * clamp((launchAngle - 33) / 23, 0, 1)
      * clamp((carry - 0.86) / 0.44, 0, 1),
    0,
    0.78
  ) * (!inGoodContactZone ? 0.24 : 0.92);
  const fenceEdgeFlyScore = clamp(
    0.18 + (0.28 + readableQuality * 0.72)
      * (0.45 + sweetSpotScore * 0.65)
      * clamp((power - 3.8) / 4.2, 0, 1)
      * clamp((launchAngle - 27) / 17, 0, 1)
      * clamp((carry - 0.66) / 0.48, 0, 1)
      * clamp((2.05 - carry) / 1, 0, 1),
    0,
    0.78
  ) * (!inGoodContactZone ? 0.26 : 0.9);
  const centerFenceEdgeFlyScore = clamp(fenceEdgeFlyScore + centerDriveScore * powerDriveScore * 0.18, 0, 0.84);
  const yellowFenceEdgeFlyScore = clamp(centerFenceEdgeFlyScore + yellowDriveScore * yellowZoneHitTuning.fenceScoreBoost * 0.72, 0, 0.88);
  // 際どいストライクを「広げた帯」で拾った打球は、安打にせずファウルへ逃がす。
  const edgeExtendedFoul = edgeExtendedUse > 0
    && Math.random() < edgeExtendedUse * edgeStrikeContactTuning.extendedFoulChance;
  const isFoul = edgeExtendedFoul
    || (Math.abs(timingPull) > 0.82 && (readableQuality < 0.62 || spin > 0.72));
  const feedbackScore = getRawBattingFeedbackScore({
    timingScore,
    sweetSpotScore,
    barrelScore,
    zoneScore: clamp(zoneScore ?? (inGoodContactZone ? 1 : 0), 0, 1),
    zoneDistanceRate,
    quality,
    profileScore: getBattedBallProfileScore({
      exitVelocity,
      carry,
      launchAngle
    })
  });
  if (swingType === "bunt") {
    const buntMeetSkill = clamp((meet - 3) / 9, 0, 1);
    const hasAim = Math.abs(buntAimX) > 0 || Math.abs(buntAimY) > 0;
    const aimedSide = Math.abs(buntAimX) > 0 ? Math.sign(buntAimX) : 0;
    const aimControlScore = hasAim ? 1 : 0;
    const noAimPenalty = hasAim ? 0 : 0.3;
    const buntCoreScore = getBuntFeedbackScore({ barrelScore });
    const buntQuality = clamp(buntCoreScore + buntMeetSkill * 0.1 + aimControlScore * 0.12 - noAimPenalty, 0, 1);
    const buntContactScore = clamp(buntCoreScore + buntMeetSkill * 0.05 + aimControlScore * 0.08 - noAimPenalty * 0.65, 0, 1);
    const goodBunt = buntContactScore >= buntTuning.goodFeedback;
    const greatBunt = buntContactScore >= buntTuning.greatFeedback;
    const solidBuntContact = buntContactScore >= buntTuning.solidFeedback;
    const badBuntScore = goodBunt
      ? 0
      : clamp(
          (buntTuning.popupFeedback - buntContactScore) / buntTuning.popupFeedback
            + Math.max(0, buntTuning.solidFeedback - buntContactScore) * 0.55
            + (hasAim ? 0 : 0.12),
          0,
          1
        );
    const baseLineChance = greatBunt
      ? clamp(0.9 + (buntContactScore - buntTuning.greatFeedback) * 0.4, 0.9, buntTuning.goodLineChance)
      : goodBunt
      ? clamp(0.72 + (buntContactScore - buntTuning.goodFeedback) * 3.6, 0.72, 0.9)
      : solidBuntContact
      ? clamp(buntTuning.solidLineChance + (buntContactScore - buntTuning.solidFeedback) * 0.24, 0.18, 0.26)
      : clamp(
          buntTuning.badLineBase + buntContactScore * 0.2 + buntMeetSkill * 0.05,
          buntTuning.badLineMin,
          Math.min(0.28, buntTuning.badLineMax)
        );
    const aimedLineBoost = aimedSide ? 0.12 : 0;
    const lineChance = clamp(baseLineChance + aimedLineBoost, buntTuning.badLineMin, buntTuning.goodLineChance);
    const pitcherFrontChance = goodBunt
      ? greatBunt ? clamp(0.04 - (buntContactScore - buntTuning.greatFeedback) * 0.3, 0.01, 0.04) : 0.12
      : solidBuntContact
      ? clamp(buntTuning.solidPitcherFrontChance + (buntContactScore - buntTuning.solidFeedback) * 0.42, 0.68, 0.76)
      : clamp(0.32 + buntContactScore * 0.5, 0.32, 0.52);
    const roll = Math.random();
    const side = aimedSide || (Math.random() < 0.5 ? -1 : 1);
    const aimAssist = aimedSide ? 0.16 + buntMeetSkill * 0.08 : 0;
    // 横に狙ったバントはラインを切りやすいので、ファウル率を上乗せする。
    const lateralFoulBonus = aimedSide ? buntTuning.lateralFoulBonus : 0;
    const buntFoulChance = clamp(
      buntTuning.foulBase
        + (1 - buntQuality) * buntTuning.foulQualityScale
        + badBuntScore * (buntTuning.foulBadContactScale + 0.22)
        + lateralFoulBonus,
      aimedSide ? buntTuning.aimedFoulMin : buntTuning.foulMin,
      Math.min(0.82, buntTuning.foulMax + 0.12)
    ) + (hasAim ? 0 : 0.06);
    const buntIsFoul = Math.random() < buntFoulChance;
    const pitcherBuntPopupChance = clamp(
      buntTuning.popupBase + 0.08 + badBuntScore * (buntTuning.popupBadContactScale + 0.22)
        + (hasAim ? buntTuning.aimedPopupBonus : 0.16),
      buntTuning.popupMin,
      Math.min(0.82, buntTuning.popupMax + 0.18)
    );
    const popupProtection = solidBuntContact
      ? clamp(
          (buntContactScore - buntTuning.solidFeedback) / 0.2,
          0,
          1
        )
      : 0;
    const protectedPopupChance = pitcherBuntPopupChance * (1 - popupProtection * buntTuning.solidContactPopupReduction);
    const forcePopup = buntContactScore <= buntTuning.forcePopupFeedback
      && (buntContactScore <= 0.3 || badBuntScore >= buntTuning.forcePopupBadScore)
      && !solidBuntContact;
    // 方向入力なしのバントは当たりの良し悪しに関係なくポップフライにする
    const noAimForcedPopup = !hasAim && Math.random() < buntTuning.noAimPopupChance;
    const {
      popupCandidate,
      popupConvertedToPitcherFront,
      pitcherBuntPopup
    } = resolveBuntPopupOutcome(goodBunt, forcePopup, protectedPopupChance, noAimForcedPopup);
    const finalBuntIsFoul = buntIsFoul
      && !pitcherBuntPopup
      && !popupConvertedToPitcherFront;
    const pitcherFrontGrounder = popupConvertedToPitcherFront
      || (!hasAim && !pitcherBuntPopup);
    const aimDown = hasAim && buntAimY > 0.4;
    const aimUp = hasAim && buntAimY < -0.4;
    const directionFromAim = aimDown
      ? normalize({ x: side * randomBetween(0.05, 0.28), y: -randomBetween(0.2, 0.42) })
      : aimUp
        ? normalize({ x: side * randomBetween(0.04, 0.18), y: -1 })
        : null;
    const rawBuntDirection = pitcherBuntPopup
      ? normalize({ x: randomBetween(-0.1, 0.1), y: -1 })
      : pitcherFrontGrounder
      ? normalize({ x: randomBetween(-0.14, 0.14), y: -1 })
      : directionFromAim
      ? directionFromAim
      : roll < lineChance
      ? goodBunt
        ? normalize({ x: side * randomBetween(0.95 + aimAssist, 1.25 + aimAssist), y: -randomBetween(0.42, 0.66) })
        : normalize({ x: side * randomBetween(0.72 + aimAssist * 0.7, 1.02 + aimAssist * 0.7), y: -randomBetween(0.58, 0.82) })
      : roll < lineChance + pitcherFrontChance
        ? normalize({ x: randomBetween(-0.16, 0.16), y: -1 })
        : normalize({ x: side * randomBetween(0.92 + aimAssist, 1.18 + aimAssist), y: -randomBetween(0.38, 0.68) });
    // 横へ狙ったバントはそのままだとファウルラインの外を向いてしまうので、
    // フェアゾーンに収まる角度まで戻す。ファウルにするかは buntIsFoul 側で決める。
    const buntDirection = finalBuntIsFoul
      ? rawBuntDirection
      : clampBuntDirectionInsideFairLines(rawBuntDirection);
    const noAimPowerBoost = hasAim ? 0 : 0.1;
    // 下入力は勢いを殺し、上入力はプッシュ気味に強く出す
    const deadenBonus = (hasAim ? 0.045 : 0) + (aimDown ? buntTuning.deadenPowerDrop : 0);
    const pushBonus = aimUp ? buntTuning.pushPowerBonus : 0;
    const buntPower = clamp(0.05 + buntQuality * 0.07 + noAimPowerBoost + pushBonus - deadenBonus, 0.045, 0.3);
    const badBuntLift = goodBunt ? 0 : clamp((0.62 - buntQuality) / 0.62, 0, 1) * randomBetween(0, 16);
    return {
      exitVelocity: pitcherBuntPopup
        ? clamp(0.1 + buntQuality * 0.08, 0.1, 0.22)
        : clamp(0.08 + buntQuality * 0.1 + noAimPowerBoost + pushBonus - deadenBonus, 0.07, 0.36),
      launchAngle: pitcherBuntPopup
        ? randomBetween(30, 58)
        : popupConvertedToPitcherFront
          ? randomBetween(-6, 1)
          : pitcherFrontGrounder
            ? randomBetween(-5, 2)
            : clamp(-4 + buntContactScore * 2 + badBuntLift, -10, goodBunt ? 3 : 18),
      direction: buntDirection,
      spin: clamp(0.26 + badBuntScore * 0.3 + (hasAim ? 0 : 0.08), 0.18, 0.82),
      carry: pitcherBuntPopup ? clamp(0.08 + badBuntScore * 0.08, 0.08, 0.18) : clamp(0.02 + buntQuality * 0.035, 0.02, 0.065),
      feedbackScore: buntContactScore,
      gapScore: 0,
      timingPull,
      oppositeFieldContact: 0,
      pulledContact: 0,
      lineLinerScore: 0,
      lineDropScore: 0,
      frontDropScore: 0,
      lineEdgeScore: 0,
      fenceLinerScore: 0,
      chaseFlyScore: 0,
      toweringFlyScore: 0,
      fenceEdgeFlyScore: 0,
      power: buntPower,
      readableQuality,
      sweetSpotCenterBoost,
      outsideZoneDrag,
      pitchQualityBoost,
      yellowZoneBoost,
      plateDistance,
      zoneMissUnits,
      isFoul: finalBuntIsFoul,
      buntQuality,
      buntContactScore,
      buntAimControl: aimControlScore,
      buntHasAim: hasAim,
      buntAimY,
      buntLineChance: pitcherBuntPopup || pitcherFrontGrounder ? 0 : lineChance,
      buntPitcherFrontChance: pitcherBuntPopup ? 0 : pitcherFrontGrounder ? 1 : pitcherFrontChance,
      buntFoulChance,
      badBuntScore,
      pitcherBuntPopupChance,
      protectedPopupChance,
      popupCandidate,
      popupConvertedToPitcherFront,
      solidBuntContact,
      pitcherBuntPopup,
      buntPitcherFrontGrounder: pitcherFrontGrounder,
      swingType,
      isBunt: true
    };
  }
  // 広げた帯で拾った打球は詰まった当たりにする。強い打球にはしない。
  const edgeExtendedWeaken = 1 - edgeExtendedUse * edgeStrikeContactTuning.extendedPowerDrop;
  return {
    exitVelocity: exitVelocity * edgeExtendedWeaken,
    launchAngle: edgeExtendedUse > 0 ? Math.min(launchAngle, edgeStrikeContactTuning.extendedLaunchAngleCap) : launchAngle,
    direction,
    spin,
    carry: carry * edgeExtendedWeaken,
    feedbackScore,
    gapScore,
    timingPull,
    oppositeFieldContact,
    pulledContact,
    lineLinerScore,
    lineDropScore,
    frontDropScore,
    lineEdgeScore,
    fenceLinerScore: clamp(fenceLinerScore + practicePitcherContactBoost * 0.32 + lowStuffProfileBoost * 0.16, 0, 0.9),
    chaseFlyScore,
    toweringFlyScore: clamp(toweringFlyScore + practicePitcherContactBoost * 0.36 + lowStuffProfileBoost * 0.18, 0, 0.96),
    fenceEdgeFlyScore: clamp((yellowZoneBoost > 0 ? yellowFenceEdgeFlyScore : inGoodContactZone ? centerFenceEdgeFlyScore : fenceEdgeFlyScore) + practicePitcherContactBoost * 0.42 + lowStuffProfileBoost * 0.2, 0, 0.96),
    power: clamp(exitVelocity * 0.74 + carry * 0.52 + practicePitcherContactBoost * 0.42 + lowStuffProfileBoost * 0.22, 0.08, deepDriveTuning.maxPower),
    readableQuality,
    sweetSpotCenterBoost,
    outsideZoneDrag,
    pitchQualityBoost,
    yellowZoneBoost,
    plateDistance,
    zoneMissUnits,
    swingType,
    grounderSwing,
    isFoul
  };
}

function getHandednessBattingContactMultiplier(batterInfo = activeBatter, pitcherInfo = activePitcher) {
  const batterSide = resolveBatterSide(batterInfo, pitcherInfo);
  if ((batterSide === "L" && pitcherInfo?.throws === "R") || (batterSide === "R" && pitcherInfo?.throws === "L")) {
    return oppositeHandedBattingAdvantageMultiplier;
  }
  return 1;
}

function getCurrentSwingType() {
  return swingState?.type === "weak" || swingState?.type === "bunt" || swingState?.type === "grounder" ? swingState.type : "strong";
}

function isActiveBatterObject(batter) {
  return !batter || batter === activeBatter;
}

function getEffectiveBatterMeet(batter = activeBatter) {
  const meet = (batter?.meet ?? 5) + (isPinchHitBoostActive(batter) ? 3 : 0);
  if (!isActiveBatterObject(batter)) return meet;
  const swingType = getCurrentSwingType();
  if (swingType === "bunt") return meet + 5;
  return swingType === "weak" ? meet + 2 : meet;
}

function getEffectiveBatterPower(batter = activeBatter) {
  const power = (batter?.power ?? 5) + (isPinchHitBoostActive(batter) ? 3 : 0);
  const swingType = isActiveBatterObject(batter) ? getCurrentSwingType() : "strong";
  const swingAdjustedPower = swingType === "bunt"
    ? Math.max(1, power - 5)
    : swingType === "weak"
      ? Math.max(1, power - 2)
      : power;
  return swingAdjustedPower * effectiveBatterPowerScale;
}

function getPowerDriveScore(power = getEffectiveBatterPower(activeBatter)) {
  return clamp((power - 3) / 7, 0, 1);
}

function getSwingAdjustedBatterPowerRating(batter = activeBatter) {
  return getEffectiveBatterPower(batter) / Math.max(0.001, effectiveBatterPowerScale);
}

function getHomeRunPowerProfile(powerRating = getSwingAdjustedBatterPowerRating(activeBatter)) {
  const rating = Math.max(1, Number.isFinite(powerRating) ? powerRating : 5);
  const standardPower = clamp(rating, 1, 10);
  const superPower = Math.max(0, rating - 10);
  const standardDrive = clamp((standardPower - 3) / 7, 0, 1);
  const candidateBonus = clamp(
    standardDrive * homeRunPowerTuning.standardCandidateBonusMax
      + superPower * homeRunPowerTuning.superCandidateBonusPerPoint,
    0,
    homeRunPowerTuning.maxCandidateBonus
  );
  const mishitRescue = clamp(
    clamp((standardPower - 7) / 3, 0, 1) * homeRunPowerTuning.standardMishitRescueMax
      + superPower * homeRunPowerTuning.superMishitRescuePerPoint,
    0,
    homeRunPowerTuning.maxMishitRescue
  );
  const carryBonusMeters =
    clamp((standardPower - 5) / 5, 0, 1) * homeRunPowerTuning.standardCarryBonusMeters
    + superPower * homeRunPowerTuning.superCarryBonusMetersPerPoint;
  return {
    rating,
    standardPower,
    superPower,
    standardDrive,
    candidateBonus,
    mishitRescue,
    carryBonusMeters
  };
}

function getLowPowerGoodContactMastery({ power = 5, quality = 0, timingScore = 0, sweetSpotScore = 0, barrelScore = 0, zoneScore = 0, inGoodContactZone = false } = {}) {
  const lowPower = clamp((5.2 - power) / 4.2, 0, 1);
  if (lowPower <= 0 || !inGoodContactZone) return 0;
  const contactGrade = getRawBattingFeedbackScore({
    timingScore,
    sweetSpotScore,
    barrelScore,
    zoneScore: inGoodContactZone ? 1 : zoneScore,
    quality
  });
  return lowPower
    * clamp((contactGrade - 0.72) / 0.22, 0, 1)
    * clamp((sweetSpotScore - 0.62) / 0.28, 0, 1)
    * clamp((timingScore - 0.62) / 0.28, 0, 1);
}

function getLowPowerContactDropSkill({ power = 5, quality = 0, timingScore = 0, sweetSpotScore = 0, barrelScore = 0, zoneScore = 0, inGoodContactZone = false } = {}) {
  const lowPower = clamp((5.4 - power) / 4.6, 0, 1);
  if (lowPower <= 0) return 0;
  const contactGrade = getRawBattingFeedbackScore({
    timingScore,
    sweetSpotScore: Math.max(sweetSpotScore, barrelScore * 0.62),
    barrelScore,
    zoneScore: inGoodContactZone ? Math.max(zoneScore, 0.92) : zoneScore,
    quality
  });
  const contactControl = clamp((contactGrade - 0.48) / 0.34, 0, 1);
  const sweetControl = clamp((Math.max(sweetSpotScore, barrelScore * 0.72) - 0.42) / 0.42, 0, 1);
  const timingControl = clamp((timingScore - 0.46) / 0.42, 0, 1);
  return lowPower * contactControl * sweetControl * timingControl;
}

function getLowPowerHighMeetDriveSkill({ power = 5, meet = activeBatter?.meet ?? 5, quality = 0, timingScore = 0, sweetSpotScore = 0, barrelScore = 0, zoneScore = 0, inGoodContactZone = false } = {}) {
  const lowPower = clamp((5.4 - power) / 4.6, 0, 1);
  if (lowPower <= 0 || !inGoodContactZone) return 0;
  const meetControl = clamp((meet - 5) / 4, 0, 1);
  const contactGrade = getRawBattingFeedbackScore({
    timingScore,
    sweetSpotScore: Math.max(sweetSpotScore, barrelScore * 0.7),
    barrelScore,
    zoneScore: Math.max(zoneScore, 0.92),
    quality
  });
  const contactControl = clamp((contactGrade - 0.42) / 0.32, 0, 1);
  const sweetControl = clamp((Math.max(sweetSpotScore, barrelScore * 0.78) - 0.34) / 0.4, 0, 1);
  const timingControl = clamp((timingScore - 0.34) / 0.44, 0, 1);
  const meetDrivenContact = clamp(0.28 + meetControl * 0.42 + contactControl * 0.36, 0, 1);
  const contactShape = clamp(0.5 + sweetControl * 0.28 + timingControl * 0.22, 0, 1);
  return lowPower * meetDrivenContact * contactShape;
}

function getPullSide() {
  return activeBatterSide === "R" ? -1 : 1;
}

function getOppositeFieldSide() {
  return -getPullSide();
}

function getTimingSideFromPullValue(timingPull, threshold = 0.08) {
  if (timingPull < -threshold) return getPullSide();
  if (timingPull > threshold) return getOppositeFieldSide();
  return 0;
}

function getTimingSideFromTimeDiff(timeDiff, threshold = 70) {
  if (timeDiff < -threshold) return getPullSide();
  if (timeDiff > threshold) return getOppositeFieldSide();
  return 0;
}

function getPhysicsHitDirection(timingPull, spin, launchAngle) {
  const timingSide = getTimingSideFromPullValue(timingPull);
  const timingStrength = clamp(Math.abs(timingPull), 0, 1);
  const sideBias = timingSide * (0.24 + timingStrength * 1.08);
  const centerDriftScale = 1 - timingStrength * 0.82;
  const grounderSpread = launchAngle < 15 ? 0.2 + clamp(spin, 0, 1) * 0.1 : 0;
  const openGrassDrift = timingStrength < 0.46 && Math.random() < (launchAngle < 22 ? 0.56 : 0.42)
    ? (Math.random() < 0.5 ? -1 : 1) * randomBetween(0.26, launchAngle < 18 ? 0.74 : 0.56)
    : 0;
  const centerDrift = (randomBetween(-0.3 - grounderSpread, 0.3 + grounderSpread) + spin * randomBetween(-0.18, 0.18)) * centerDriftScale;
  const vertical = launchAngle < 8 ? randomBetween(-0.74, -0.56) : launchAngle < 22 ? randomBetween(-1.16, -0.86) : randomBetween(-1.08, -0.78);
  const x = keepClearTimingDirection(sideBias + centerDrift + openGrassDrift, timingSide, timingStrength, 0.24);
  return normalize({
    x,
    y: vertical
  });
}

function keepClearTimingDirection(x, timingSide, timingStrength, threshold = 0.24) {
  if (!timingSide || timingStrength < threshold || Math.sign(x) === timingSide) return x;
  return timingSide * (0.18 + timingStrength * 0.32);
}

function makePopupFlyResultFromProfile(profile) {
  return {
    ...makePopupFlyResult(clamp(profile.power + randomBetween(-0.08, 0.1), 0.26, 0.58)),
    direction: getFlyBallDirection(profile, randomBetween(0.3, 0.52)),
    battedProfile: profile
  };
}

function makeRoutineFlyResultFromProfile(profile) {
  return {
    ...makeRoutineFlyResult(clamp(profile.power + randomBetween(-0.09, 0.12), 0.46, 0.84)),
    direction: getFlyBallDirection(profile, randomBetween(0.44, 0.7)),
    battedProfile: profile
  };
}

function makeLineLinerResultFromProfile(profile) {
  return { label: hitLabels.lineLiner, kind: "hit", power: clamp(profile.power + 0.08, 0.82, 1.1), scoreType: "double", lineLiner: true, direction: getLineLinerDirection(profile), battedProfile: profile };
}

function makeHardOutfieldBounceHitResultFromProfile(profile) {
  const feedbackScore = clamp(profile.feedbackScore ?? profile.quality ?? 0.6, 0, 1);
  const solidScoreBoost = clamp((feedbackScore - 0.66) / 0.18, 0, 1);
  const bounceProfile = {
    ...profile,
    hardOutfieldBounce: true,
    feedbackScore,
    power: Math.max(profile.power ?? 0.72, 1.1 + solidScoreBoost * 0.12),
    exitVelocity: Math.max(profile.exitVelocity ?? 0.58, feedbackScore >= 0.5 ? 1.08 + solidScoreBoost * 0.12 : 0.96),
    carry: Math.max(profile.carry ?? 0.56, 0.74 + solidScoreBoost * 0.12),
    launchAngle: clamp((profile.launchAngle ?? 17) + (feedbackScore >= 0.64 ? 0.5 : 1.5), 16, 25)
  };
  if (Math.abs(profile.direction?.x ?? 0) > 0.5 || (profile.lineLinerScore ?? 0) > 0.5) {
    return {
      ...makeLineLinerResultFromProfile(bounceProfile),
      hardOutfieldBounce: true,
      battedProfile: bounceProfile
    };
  }
  return {
    ...makeGapLinerResult(bounceProfile),
    label: bounceProfile.unifiedBattedBall ? hitLabels.outfieldLiner : hitLabels.cleanHit,
    hardOutfieldBounce: true,
    gapLiner: true,
    power: clamp((profile.power ?? 0.72) + 0.36 + solidScoreBoost * 0.12, 1.14, 1.32),
    direction: getCleanOutfieldHitDirection(bounceProfile),
    battedProfile: bounceProfile
  };
}

function getCleanOutfieldHitDirection(profile) {
  const meet = clamp(activeBatter?.meet ?? 5, 1, 10);
  const power = clamp(activeBatter?.power ?? 5, 1, 10);
  const centerBias = clamp((meet - 5) / 4, 0, 1) * clamp((6 - power) / 5, 0, 1);
  const base = profile?.direction ?? normalize({ x: 0, y: -1 });
  const timingPull = profile?.timingPull ?? 0;
  const timingSide = getTimingSideFromPullValue(timingPull, 0.16);
  const timingCarry = timingSide * clamp(Math.abs(timingPull) * 0.08, 0, 0.08);
  const lane = clamp(base.x * (0.42 - centerBias * 0.18) + timingCarry + randomBetween(-0.18, 0.18), -0.34, 0.34);
  return normalize({
    x: lane,
    y: -randomBetween(0.96, 1.08)
  });
}

function makeLineDropResultFromProfile(profile) {
  const depthPower = clamp(profile.power + Math.abs(profile.timingPull ?? 0) * 0.08 + randomBetween(-0.04, 0.08), 0.54, 0.78);
  return { label: hitLabels.lineDrop, kind: "hit", power: depthPower, scoreType: "single", lineDrop: true, direction: getLineBallDirection(profile, randomBetween(0.62, 0.78)), battedProfile: profile };
}

function makeLowOutfieldHitResultFromProfile(profile) {
  const sideCarry = Math.abs(profile?.direction?.x ?? 0);
  if ((profile.lineDropScore ?? 0) > 0.1 || sideCarry > 0.18 || Math.abs(profile.timingPull ?? 0) > 0.24) {
    return makeLineDropResultFromProfile(profile);
  }
  if ((profile.lineLinerScore ?? 0) > 0.08 && (profile.exitVelocity ?? 0) >= 0.5) {
    return makeLineLinerResultFromProfile(profile);
  }
  return makeGapLinerResult(profile);
}

function makeFenceLinerResultFromProfile(profile) {
  if ((profile.exitVelocity ?? 0) < 0.88 || (profile.carry ?? 0) < 0.86 || (profile.launchAngle ?? 0) < 16) {
    return makeLineLinerResultFromProfile(profile);
  }
  if (shouldConvertHomerCandidateToStrongInfieldGrounder(profile)) {
    return makeStrongInfieldGrounderResultFromProfile(profile);
  }
  const scoreType = profile.launchAngle >= 25 && profile.exitVelocity >= 1.06 && profile.carry >= 1.08 ? "homer" : "single";
  return { label: hitLabels.fenceLiner, kind: "hit", power: clamp(profile.power + profile.carry * 0.28, 1.0, 1.62), scoreType, fenceLiner: true, direction: getStrongLinerLaneDirection(profile, 0.42), battedProfile: profile };
}

function makeFrontDropResultFromProfile(profile) {
  const timingSide = getTimingSideFromPullValue(profile.timingPull ?? 0, 0.06);
  const sideDrift = timingSide
    ? timingSide * randomBetween(0.18, 0.38)
    : randomBetween(-0.18, 0.18);
  return { label: hitLabels.frontDrop, kind: "hit", power: clamp(profile.power, 0.48, 0.64), scoreType: "single", frontDrop: true, direction: normalize({ x: sideDrift, y: -1 }), battedProfile: profile };
}

function makeLineEdgeResultFromProfile(profile) {
  const edgePower = clamp(profile.power + profile.carry * 0.12 + Math.abs(profile.timingPull ?? 0) * 0.1 + randomBetween(-0.04, 0.1), 0.74, 1.08);
  return { label: hitLabels.lineEdge, kind: "hit", power: edgePower, scoreType: "double", lineEdge: true, direction: getLineBallDirection(profile, randomBetween(1.16, 1.3)), battedProfile: profile };
}

function makeLineEdgeGrounderResultFromProfile(profile) {
  const edgePower = clamp(profile.power + profile.carry * 0.1 + Math.abs(profile.timingPull ?? 0) * 0.12 + randomBetween(0.02, 0.16), 0.68, 1.16);
  return { label: hitLabels.lineEdgeGrounder, kind: "hit", power: edgePower, scoreType: "double", lineEdgeGrounder: true, direction: getLineBallDirection(profile, randomBetween(1.2, 1.34)), battedProfile: profile };
}

function makeBuntGrounderResultFromProfile(profile) {
  const quality = clamp(profile?.buntQuality ?? profile?.buntContactScore ?? 0.45, 0, 1);
  const profilePower = clamp(profile?.power ?? 0.08, 0.04, 0.28);
  const deadenedPower = clamp(Math.max(profilePower * 0.92, 0.045 + quality * 0.05) + randomBetween(-0.008, 0.012), 0.04, 0.24);
  const pitcherFrontGrounder = Boolean(profile?.buntPitcherFrontGrounder || profile?.popupConvertedToPitcherFront);
  return {
    label: "バントゴロ",
    kind: "out",
    power: deadenedPower,
    direction: profile?.direction ?? normalize({ x: 0, y: -1 }),
    battedProfile: {
      ...profile,
      power: deadenedPower,
      exitVelocity: Math.min(profile?.exitVelocity ?? deadenedPower, 0.2),
      carry: Math.min(profile?.carry ?? 0.04, 0.08),
      launchAngle: pitcherFrontGrounder ? Math.min(profile?.launchAngle ?? 1, 2) : profile?.launchAngle,
      buntPitcherFrontGrounder: pitcherFrontGrounder
    }
  };
}

function makeGrounderOutResultFromProfile(profile, power = profile?.power, options = {}) {
  const directionChoice = getGrounderOutDirectionChoice(profile, options);
  const adjustedPower = getGrounderOutPower(profile, power, directionChoice, options);
  return {
    label: getGrounderQualityLabel(profile, options.classification),
    kind: "out",
    power: adjustedPower,
    direction: directionChoice.direction,
    battedProfile: profile
  };
}

function getGrounderOutPower(profile, power = profile?.power, directionChoice = {}, options = {}) {
  if (Number.isFinite(options.power)) return options.power;
  const basePower = power ?? profile?.power ?? 0.5;
  if (options.classification === "weak") return clamp(basePower, 0.2, 0.42);
  if (options.classification === "routine") return clamp(basePower, 0.4, 0.66);
  const quality = clamp(profile?.quality ?? 0.45, 0, 1);
  const exitVelocity = clamp(profile?.exitVelocity ?? basePower, 0, 1.75);
  const timingMiss = clamp(Math.abs(profile?.timingPull ?? 0), 0, 1);
  const meet = clamp(activeBatter?.meet ?? 5, 1, 10);
  const powerRating = clamp(activeBatter?.power ?? 5, 1, 10);
  const cleanContact = quality * 0.42 + clamp(exitVelocity / 1.3, 0, 1) * 0.38 + (powerRating - 1) / 9 * 0.2;
  const mishitPenalty = timingMiss * (0.16 + (10 - meet) * 0.018);
  const variance = randomBetween(-0.18, 0.22) * (1.08 - meet * 0.035);
  const variedPower = basePower * (0.72 + cleanContact * 0.62 - mishitPenalty + variance);
  const boostedFloor = directionChoice.boosted
    ? infieldGrounderTuning.secondShortPowerFloor * (0.86 + cleanContact * 0.22 + randomBetween(-0.04, 0.08))
    : infieldGrounderTuning.softPowerMin;
  return clamp(
    Math.max(variedPower, boostedFloor),
    infieldGrounderTuning.softPowerMin,
    infieldGrounderTuning.hardPowerMax
  );
}

function getGrounderOutDirection(profile, options = {}) {
  return getGrounderOutDirectionChoice(profile, options).direction;
}

function getGrounderOutDirectionChoice(profile, options = {}) {
  const hasExplicitDirectionOptions = Number.isFinite(options.boostRoll)
    || Number.isFinite(options.sideRoll)
    || Number.isFinite(options.sideAmount)
    || options.keepProfileDirection;
  if (!hasExplicitDirectionOptions) {
    return { direction: getRandomGrounderDirection64(profile), boosted: true };
  }
  const boostRoll = options.boostRoll ?? Math.random();
  const timingPull = profile?.timingPull ?? 0;
  const meet = clamp(activeBatter?.meet ?? 5, 1, 10);
  if (boostRoll >= infieldGrounderTuning.secondShortOutBoostChance) {
    const baseDirection = profile?.direction ?? normalize({ x: 0, y: -1 });
    const timingSide = getTimingSideFromPullValue(timingPull, 0.1);
    const contactSpread = (1 - (profile?.quality ?? 0.45)) * 0.22 + Math.abs(timingPull) * 0.18 + (10 - meet) * 0.012;
    const sideJitter = randomBetween(-contactSpread, contactSpread);
    const timingDrift = timingSide * clamp(Math.abs(timingPull) * 0.18, 0, 0.26);
    return { direction: normalize({ x: baseDirection.x + sideJitter + timingDrift, y: baseDirection.y || -1 }), boosted: false };
  }
  const sideRoll = options.sideRoll ?? Math.random();
  const side = Math.abs(timingPull) > 0.16
    ? Math.sign(timingPull)
    : sideRoll < 0.5 ? -1 : 1;
  const quality = clamp(profile?.quality ?? 0.45, 0, 1);
  if (!Number.isFinite(options.sideAmount) && Math.random() < 0.28) {
    const openLaneAmount = randomBetween(0.24, 0.9) + (1 - quality) * randomBetween(0, 0.08);
    return { direction: normalize({ x: side * openLaneAmount, y: -randomBetween(0.7, 1.02) }), boosted: true };
  }
  const sideAmount = options.sideAmount ?? randomBetween(
    infieldGrounderTuning.sideMin - (10 - meet) * 0.006,
    infieldGrounderTuning.sideMax + Math.abs(timingPull) * 0.16 + (1 - quality) * 0.08
  );
  return { direction: normalize({ x: side * sideAmount, y: -1 }), boosted: true };
}

function makeChaseFlyResultFromProfile(profile) {
  const sideDrift = clamp(Math.abs(profile.timingPull ?? 0) * 0.42 + randomBetween(0.18, 0.34), 0.24, 0.68);
  const side = getPulledHitSide(profile.timingPull ?? 0);
  return { label: hitLabels.chaseFly, kind: "hit", power: clamp(profile.power + profile.carry * 0.22, 0.94, 1.32), scoreType: "double", chaseFly: true, direction: getFlyBallDirection({ ...profile, direction: normalize({ x: side * sideDrift, y: -1 }) }, 0.18), battedProfile: profile };
}

function makeToweringFlyResultFromProfile(profile) {
  if (shouldConvertHomerCandidateToStrongInfieldGrounder(profile)) {
    return makeStrongInfieldGrounderResultFromProfile(profile);
  }
  const side = getPulledHitSide(profile.timingPull ?? 0);
  const centerDrift = randomBetween(-0.18, 0.18);
  const sideDrift = Math.abs(profile.timingPull ?? 0) > 0.28 ? side * randomBetween(0.12, 0.34) : centerDrift;
  return { label: hitLabels.toweringFly, kind: "out", power: clamp(profile.power + profile.carry * 0.36, 1.08, deepDriveTuning.maxPower), toweringFly: true, direction: getFlyBallDirection({ ...profile, direction: normalize({ x: sideDrift, y: -1 }) }, 0.22), battedProfile: profile };
}

function makeFenceEdgeFlyResultFromProfile(profile) {
  if (shouldTurnModerateLiftIntoStrongHit(profile)) {
    return makeStrongFeedbackGroundDriveResult(profile);
  }
  if (shouldConvertHomerCandidateToStrongInfieldGrounder(profile)) {
    return makeStrongInfieldGrounderResultFromProfile(profile);
  }
  const side = getTimingSideFromPullValue(profile.timingPull ?? 0, 0.42);
  const driveFloor = 1.02 + getPowerDriveScore() * 0.26;
  return { label: hitLabels.fenceEdgeFly, kind: "hit", power: clamp(profile.power + profile.carry * 0.42, driveFloor, 1.82), scoreType: "single", fenceEdgeFly: true, direction: getFlyBallDirection({ ...profile, direction: normalize({ x: side * randomBetween(0.04, 0.16) + randomBetween(-0.07, 0.07), y: -1 }) }, 0.18), battedProfile: profile };
}

function makeDeepDriveResultFromProfile(profile) {
  if (shouldConvertHomerCandidateToStrongInfieldGrounder(profile)) {
    return makeStrongInfieldGrounderResultFromProfile(profile);
  }
  const driveFloor = 1.18 + getPowerDriveScore() * 0.32;
  const feedbackScore = clamp(profile.feedbackScore ?? profile.quality ?? 0.6, 0, 1);
  const batterPower = getHomeRunPowerProfile();
  const isSuperDrive = batterPower.superPower > 0
    ? feedbackScore >= 0.72
    : batterPower.standardPower >= 8 && feedbackScore >= 0.86;
  const label = isSuperDrive ? superDeepDriveLabel : deepDriveLabel;
  const powerBoost = isSuperDrive ? 0.38 : 0;
  const distancePowerBoost =
    clamp(((profile.exitVelocity ?? 0.9) - 0.92) / 0.62, 0, 1) * 0.26
    + clamp(((profile.carry ?? 0.9) - 0.9) / 0.68, 0, 1) * 0.34
    + clamp((feedbackScore - 0.64) / 0.36, 0, 1) * 0.24
    + getPowerDriveScore() * 0.12;
  const deepDriveTrajectory = isSuperDrive || (profile.launchAngle ?? 18) >= 23
    ? "fly"
    : "liner";
  const direction = deepDriveTrajectory === "fly"
    ? getFlyBallDirection(profile, 0.12)
    : getStrongLinerLaneDirection({ ...profile, launchAngle: Math.min(profile.launchAngle ?? 18, 22) }, 0.46);
  return {
    label,
    kind: "hit",
    power: clamp(profile.power + profile.carry * 0.62 + powerBoost + distancePowerBoost, driveFloor, deepDriveTuning.maxPower),
    scoreType: "single",
    deepDrive: true,
    superDeepDrive: isSuperDrive,
    direction,
    battedProfile: {
      ...profile,
      feedbackScore,
      deepDriveTrajectory,
      batterPowerRating: batterPower.rating
    }
  };
}

function shouldConvertHomerCandidateToStrongInfieldGrounder(profile, roll = Math.random()) {
  if (!profile || profile.isFoul) return false;
  if (profile.battingPracticeHomerCandidate) return false;
  if (profile.centerZoneHomerCandidate) return false;
  if ((profile.power ?? 0) < 1.05) return false;
  const flightStrength = clamp(((profile.exitVelocity ?? 0.8) - 0.72) / 0.52, 0, 1)
    * clamp(((profile.carry ?? 0.78) - 0.68) / 0.52, 0, 1);
  const powerDrive = clamp(getPowerDriveScore() + flightStrength * 0.28, 0, 1);
  if (getPowerDriveScore() < 0.22 || powerDrive < 0.28) return false;
  return roll < homerToStrongInfieldGrounderRate;
}

function makeStrongInfieldGrounderResultFromProfile(profile) {
  const direction = getRandomGrounderDirection64(profile);
  const grounderProfile = {
    ...profile,
    direction,
    launchAngle: Math.min(profile.launchAngle ?? 4, 5),
    exitVelocity: Math.max(profile.exitVelocity ?? 0.72, 0.92),
    carry: Math.max(profile.carry ?? 0.58, 0.68),
    power: Math.max(profile.power ?? 0.78, 0.94),
    homerConvertedGrounder: true
  };
  return {
    label: hitLabels.scorchingGrounder,
    kind: "out",
    power: clamp((profile.power ?? 0.78) + 0.22, 0.94, infieldGrounderTuning.hardPowerMax),
    direction,
    battedProfile: grounderProfile
  };
}

function getFlyBallDirection(profile, spread = 0.32) {
  const baseDirection = profile?.direction ?? normalize({ x: 0, y: -1 });
  const timingPull = profile?.timingPull ?? 0;
  const timingSide = getTimingSideFromPullValue(timingPull, 0.1);
  const sideCarry = timingSide * clamp(0.08 + Math.abs(timingPull) * 0.28, 0, 0.42);
  const quality = clamp(profile?.quality ?? 0.5, 0, 1);
  const missSpread = spread * (0.95 + (1 - quality) * 0.72);
  const sideJitter = randomBetween(-missSpread, missSpread);
  const openGrassJitter = Math.random() < 0.28
    ? (Math.random() < 0.5 ? -1 : 1) * randomBetween(0.14, 0.46)
    : 0;
  const depthJitter = randomBetween(-0.18, 0.16);
  const x = keepClearTimingDirection(baseDirection.x + sideCarry + sideJitter + openGrassJitter, timingSide, Math.abs(timingPull), 0.22);
  return normalize({
    x,
    y: baseDirection.y + depthJitter || -1
  });
}

function getVariedFlyLandingDirection(direction, profile = null, traits = {}) {
  const baseDirection = direction ?? normalize({ x: 0, y: -1 });
  const timingPull = profile?.timingPull ?? 0;
  const timingSide = getTimingSideFromPullValue(timingPull, 0.12);
  const side = timingSide || Math.sign(baseDirection.x || 0) || (Math.random() < 0.5 ? -1 : 1);
  const quality = clamp(profile?.quality ?? profile?.feedbackScore ?? 0.5, 0, 1);
  const lineChance = traits.isRoutineFly
    ? 0.38
    : traits.isChaseFly
      ? 0.2
      : traits.isToweringFly
        ? 0.12
        : 0.24;
  const lineDrift = Math.random() < lineChance
    ? side * randomBetween(0.34, 0.74) * (1.08 - quality * 0.2)
    : 0;
  const sideJitter = randomBetween(-0.28, 0.28) * (traits.isToweringFly ? 0.72 : 1);
  const depthJitter = randomBetween(-0.14, 0.12);
  return normalize({
    x: clamp(baseDirection.x + lineDrift + sideJitter, -1.16, 1.16),
    y: baseDirection.y + depthJitter || -1
  });
}

function getPulledHitSide(timingPull) {
  return timingPull < 0 ? getPullSide() : getOppositeFieldSide();
}

function getLineBallDirection(profile, sideStrength = 0.76) {
  const timingPull = profile.timingPull ?? 0;
  const side = getPulledHitSide(timingPull);
  const oppositeLineBoost = getTimingSideFromPullValue(timingPull, 0.08) === getOppositeFieldSide()
    ? clamp((Math.abs(timingPull) - 0.14) / 0.52, 0, 1) * 0.18
    : 0;
  const pullLineBoost = getTimingSideFromPullValue(timingPull, 0.08) === getPullSide()
    ? clamp((Math.abs(timingPull) - 0.14) / 0.52, 0, 1) * 0.12
    : 0;
  const powerSideCarry = clamp(((profile.power ?? 0.65) - 0.6) * 0.14, -0.04, 0.12);
  const strength = clamp(sideStrength + oppositeLineBoost + pullLineBoost + powerSideCarry + randomBetween(-0.02, 0.05), 0.72, 1.28);
  return normalize({
    x: side * randomBetween(strength, strength + 0.2),
    y: -randomBetween(0.9, 0.98)
  });
}

function getLineLinerDirection(profile) {
  const timingPull = profile?.timingPull ?? 0;
  const timingSide = getTimingSideFromPullValue(timingPull, 0.08);
  const side = timingSide || Math.sign(profile?.direction?.x ?? 0) || (Math.random() < 0.5 ? -1 : 1);
  const timingCarry = clamp(Math.abs(timingPull) * 0.12, 0, 0.14);
  const sideStrength = randomBetween(1.28, 1.34) + timingCarry;
  return normalize({
    x: side * clamp(sideStrength, 1.3, 1.32),
    y: -randomBetween(0.95, 0.98)
  });
}

function getStrongLinerLaneDirection(profile, sideStrength = 0.76) {
  const timingPull = profile?.timingPull ?? 0;
  const timingSide = getTimingSideFromPullValue(timingPull, 0.08);
  const side = timingSide || Math.sign(profile?.direction?.x ?? 0) || (Math.random() < 0.5 ? -1 : 1);
  const laneRoll = Math.random();
  const timingCarry = clamp(Math.abs(timingPull) * 0.18, 0, 0.18);
  const laneStrength = laneRoll < 0.58
    ? randomBetween(0.34, 0.62) + timingCarry
    : randomBetween(Math.max(0.58, sideStrength * 0.78), Math.min(1.08, sideStrength + 0.22));
  return normalize({
    x: side * clamp(laneStrength, 0.3, 1.08),
    y: -randomBetween(0.78, 1.04)
  });
}

function getOutfieldBounceLaneDirection(profile) {
  const baseDirection = profile?.direction ?? normalize({ x: randomBetween(-0.12, 0.12), y: -1 });
  const timingPull = profile?.timingPull ?? 0;
  const timingSide = getTimingSideFromPullValue(timingPull, 0.16);
  const timingCarry = timingSide * clamp(Math.abs(timingPull) * 0.14, 0, 0.12);
  const centerBias = clamp((baseDirection.x ?? 0) * 0.42 + timingCarry + randomBetween(-0.16, 0.16), -0.34, 0.34);
  return normalize({
    x: centerBias,
    y: -randomBetween(0.94, 1.12)
  });
}


function makeDeepDriveResult(contact, bonus = 0) {
  const batterPower = getEffectiveBatterPower(activeBatter);
  const drivePower = clamp(
    deepDriveTuning.minPower
      + Math.max(0, batterPower - deepDriveTuning.minPowerHitter) * deepDriveTuning.powerStep
      + contact.quality * deepDriveTuning.qualityBonus
      + contact.sweetSpotScore * deepDriveTuning.sweetSpotBonus
      - Math.abs(contact.timeDiff) / deepDriveTuning.timingPenaltyScale
      + bonus,
    0.9,
    deepDriveTuning.maxPower
  );
  return { label: deepDriveLabel, kind: "hit", power: drivePower, scoreType: "single", deepDrive: true };
}

function getProfileResultPower(profileOrPower) {
  return typeof profileOrPower === "number" ? profileOrPower : profileOrPower?.power ?? 0.62;
}

function getProfileResultSource(profileOrPower) {
  return typeof profileOrPower === "number" ? null : profileOrPower;
}

function getProfileResultDirection(profileOrPower) {
  return typeof profileOrPower === "number" ? null : profileOrPower?.direction ?? null;
}

function makeGapGrounderResult(profileOrPower) {
  const power = getProfileResultPower(profileOrPower);
  const profile = getProfileResultSource(profileOrPower);
  return {
    label: hitLabels.gapGrounder,
    kind: "hit",
    power: Math.max(power, 0.66),
    scoreType: "single",
    grounderGap: true,
    direction: getGapGrounderDirection(profileOrPower),
    battedProfile: profile
  };
}

function getCenterReturnDirection(profileOrPower, maxSide = 0.075) {
  const sourceDirection = getProfileResultDirection(profileOrPower) ?? normalize({ x: 0, y: -1 });
  const sourceX = clamp(sourceDirection.x * 0.42, -maxSide, maxSide);
  return normalize({
    x: sourceX + randomBetween(-maxSide * 0.45, maxSide * 0.45),
    y: -randomBetween(0.96, 1.04)
  });
}

function makeCenterReturnGrounderResultFromProfile(profile) {
  const power = getProfileResultPower(profile);
  return {
    label: hitLabels.centerReturnGrounder,
    kind: "hit",
    power: clamp(power + 0.1, 0.78, 1.04),
    scoreType: "single",
    centerReturn: true,
    centerReturnGrounder: true,
    direction: getCenterReturnDirection(profile, 0.06),
    battedProfile: profile
  };
}

function makeCenterReturnLinerResultFromProfile(profile) {
  const power = getProfileResultPower(profile);
  return {
    label: hitLabels.centerReturnLiner,
    kind: "hit",
    power: clamp(power + 0.08, 0.84, 1.08),
    scoreType: "single",
    centerReturn: true,
    centerReturnLiner: true,
    direction: getCenterReturnDirection(profile, 0.08),
    battedProfile: profile
  };
}

function getGapGrounderDirection(profileOrPower) {
  const profile = getProfileResultSource(profileOrPower);
  const sourceDirection = getProfileResultDirection(profileOrPower) ?? normalize({ x: randomBetween(-0.28, 0.28), y: -1 });
  const timingPull = profile?.timingPull ?? 0;
  const timingSide = getTimingSideFromPullValue(timingPull, 0.12);
  const sourceSide = Math.sign(sourceDirection.x) || timingSide || (Math.random() < 0.5 ? -1 : 1);
  const sideStrength = clamp(
    Math.max(
      Math.abs(sourceDirection.x) + randomBetween(0.08, 0.22),
      randomBetween(infieldGrounderTuning.gapGrounderMinSide, infieldGrounderTuning.gapGrounderMaxSide)
    ),
    infieldGrounderTuning.gapGrounderMinSide,
    infieldGrounderTuning.gapGrounderMaxSide
  );
  return normalize({ x: sourceSide * sideStrength, y: -randomBetween(0.82, 1.04) });
}

function getGapLinerDirection(profileOrPower) {
  const profile = getProfileResultSource(profileOrPower);
  const sourceDirection = getProfileResultDirection(profileOrPower) ?? normalize({ x: randomBetween(-0.32, 0.32), y: -1 });
  const timingPull = profile?.timingPull ?? 0;
  const timingSide = getTimingSideFromPullValue(timingPull, 0.1);
  const side = Math.sign(sourceDirection.x) || timingSide || (Math.random() < 0.5 ? -1 : 1);
  const laneScatter = Math.random() < 0.58 ? randomBetween(0.44, 0.82) : randomBetween(0.28, 0.62);
  const sideStrength = Math.max(Math.abs(sourceDirection.x), laneScatter) + randomBetween(-0.03, 0.2);
  return normalize({
    x: side * clamp(sideStrength, 0.28, 0.9),
    y: -randomBetween(0.88, 1.16)
  });
}

function makeGapLinerResult(profileOrPower) {
  const power = getProfileResultPower(profileOrPower);
  return { label: hitLabels.cleanHit, kind: "hit", power: clamp(power + randomBetween(0.02, 0.08), 0.84, 0.92), scoreType: "single", gapLiner: true, direction: getGapLinerDirection(profileOrPower), battedProfile: getProfileResultSource(profileOrPower) };
}

function makeFrontDropResult(profileOrPower) {
  const power = getProfileResultPower(profileOrPower);
  const direction = getProfileResultDirection(profileOrPower) ?? normalize({ x: randomBetween(-0.22, 0.22), y: -1 });
  return { label: hitLabels.frontDrop, kind: "hit", power: clamp(power, 0.52, 0.66), scoreType: "single", frontDrop: true, direction: normalize({ x: direction.x + randomBetween(-0.18, 0.18), y: direction.y || -1 }), battedProfile: getProfileResultSource(profileOrPower) };
}

function makePopupFlyResult(power) {
  return { label: hitLabels.popup, kind: "out", power: clamp(power, 0.26, 0.58), popupFly: true };
}

function makeRoutineFlyResult(power) {
  return { label: hitLabels.routineFly, kind: "out", power: clamp(power, 0.46, 0.84), routineFly: true };
}

function finishPitch(label, kind, power = 0, timeDiff = 0, hitDirection = null, battedProfile = null) {
  isPitching = false;
  ball.inPitch = false;
  pendingPitch = null;
  autoPitchTimer = Number.POSITIVE_INFINITY;
  if (label === "空振り" && kind === "strike" && stealState.active && !stealState.resolved) {
    stealState.swingMissDelaySeconds = stealTuning.swingMissThrowDelaySeconds ?? 0.16;
  }
  clearPitchControlKeys();
  if (kind === "strike") {
    count.strikes += 1;
    const suffix = shouldShowTimingSuffix(label) ? `: ${timingSuffix(timeDiff)}` : "";
    message = `${label}${suffix}`;
    showEffect(label, "#f9f871");
    ball.active = false;
    if (handleHomeRunDerbyPitchResult(false)) return;
  } else if (kind === "foul") {
    stealState = createStealState();
    const isBuntFoul = battedProfile?.isBunt || getCurrentSwingType() === "bunt";
    if (isBuntFoul && count.strikes >= 2) {
      count.strikes += 1;
      count.outs += 1;
      recordBatterPlateAppearance("strikeout");
      recordLastOutBatter(battingTeam, activeBatter);
      recordCurrentPitcherOuts(1);
      recordCurrentPitcherStat("strikeouts", 1);
      adjustPitcherStamina(activePitcher, staminaTuning.strikeoutRecovery);
      resetCountOnly();
      message = "バントファウル三振";
      showEffect("三振", "#f9f871");
      ball.active = false;
      if (!resetPracticePlateAppearance()) {
        if (count.outs >= 3 && maybeDelayGameEndAfterFinalOut()) return;
        advanceBattingOrder();
        setMatchup();
      }
      checkCountEnd();
      return;
    }
    startFoulBallPlay(label, power, timeDiff, hitDirection, battedProfile);
    return;
  } else if (kind === "ball") {
    count.balls += 1;
    message = "ボール";
    showEffect("ボール", "#aee7ff");
    ball.active = false;
    if (handleHomeRunDerbyPitchResult(false)) return;
  } else if (kind === "hbp") {
    stealState = createStealState();
    if (handleHomeRunDerbyPitchResult(false)) return;
    const runs = advanceRunners("walk", activeBatter);
    recordBatterPlateAppearance("hbp", { runs });
    recordCurrentPitcherWalkAllowed(1);
    message = runs > 0 ? `デッドボール: ${runs}点` : "デッドボール";
    showEffect(runs > 0 ? `デッドボール +${runs}` : "デッドボール", "#ff8f70");
    hbpPose.active = true;
    hbpPose.startTime = performance.now();
    ball.active = false;
    resetCountOnly();
    if (pendingGameEnd) return;
    if (!resetPracticePlateAppearance()) {
      advanceBattingOrder();
      setMatchup();
    }
  } else if (kind === "out") {
    const hitAndRunState = getHitAndRunLeadState();
    stealState = createStealState();
    startDefensePlay(label, kind, power, timeDiff, hitDirection, battedProfile, hitAndRunState);
    return;
  } else if (kind === "hit") {
    const hitAndRunState = getHitAndRunLeadState();
    stealState = createStealState();
    startDefensePlay(label, kind, power, timeDiff, hitDirection, battedProfile, hitAndRunState);
    return;
  }
  if (stealState.active && !stealState.resolved) {
    stealState.pitchResultPending = true;
    return;
  }
  checkCountEnd();
  scheduleNextComputerPitchAfterJudgment();
}

function getScoringHitType(outcome) {
  if (!outcome || !scoringHitTypes.has(outcome.scoreType)) return "single";
  return normalizeAutoHitAdvanceType(outcome.scoreType);
}

// 自動走塁では打者走者が一塁で止まるので、長打性の当たりも単打として扱う。
// 記録・表示・塁状態をここで揃えておく。手動走塁ではプレイヤーの指示が優先される。
function normalizeAutoHitAdvanceType(type) {
  if (type === "homer" || type === "walk") return type;
  if (scoringHitTypes.has(type) && !isManualBaserunningControl()) return "single";
  return type;
}

function getHitLabelByScoreType(scoreType) {
  return hitLabels[scoreType] || hitLabels.single;
}

// --- 走塁結果の単一表現 -----------------------------------------------------
// 1プレーの走塁は「走者ごとに どこから / どこへ / アウトか」へ正規化し、
// 塁状態への反映は必ず applyRunnerResults を通す。塁の占有チェックと得点集計を
// 1箇所に集約しておかないと、同じ塁を二重に埋めて走者が消える、到達していない
// 走者が得点する、といった不整合が経路ごとにばらばらに出る。
function createRunnerResult(runnerInfo, startBase, targetBase, options = {}) {
  if (!runnerInfo) return null;
  const start = startBase || "batter";
  return {
    runnerInfo,
    startBase: start,
    targetBase: targetBase || start,
    out: Boolean(options.out),
    forceUnearned: Boolean(options.forceUnearned)
  };
}

function getRunnerResultStartIndex(result) {
  if (!result || result.startBase === "batter") return 0;
  return baseIndexByName[result.startBase] ?? 0;
}

function getRunnerResultTargetIndex(result) {
  const index = getBatterRunnerTargetIndex(result?.targetBase);
  return Number.isFinite(index) && index >= 0 ? index : getRunnerResultStartIndex(result);
}

// 走者を1人ずつ塁に置く。空いている塁を探す順番は「目標塁 → 手前 → 奥」。
// 目標塁が先行走者で埋まっていれば手前で止まり、それも埋まっていれば奥へ回す。
function findAvailableBaseIndex(nextBases, startIndex, targetIndex) {
  const floorIndex = Math.max(1, startIndex);
  for (let index = Math.max(floorIndex, targetIndex); index >= floorIndex; index -= 1) {
    if (!nextBases[baseNameByIndex[index]]) return index;
  }
  for (let index = Math.max(floorIndex, targetIndex) + 1; index <= 3; index += 1) {
    if (!nextBases[baseNameByIndex[index]]) return index;
  }
  return -1;
}

function applyRunnerResults(results, options = {}) {
  const allowRuns = options.allowRuns !== false;
  const nextBases = createEmptyBases();
  const scoringResponsiblePitcherIds = [];
  const scoringEarnedRunFlags = [];
  const scoringRunners = [];
  let runs = 0;
  // 先頭走者から確定させる。前を走る走者が空けた塁にしか後続が入らないので、
  // 走者どうしが同じ塁を奪い合って消えることがない。
  [...(results || [])]
    .filter((result) => result?.runnerInfo)
    .sort((a, b) => getRunnerResultStartIndex(b) - getRunnerResultStartIndex(a))
    .forEach((result) => {
      if (result.out) return;
      const targetIndex = getRunnerResultTargetIndex(result);
      if (targetIndex >= 4) {
        runs += 1;
        trackScoringRunner(result.runnerInfo, scoringResponsiblePitcherIds, scoringEarnedRunFlags, {
          forceUnearned: result.forceUnearned
        });
        scoringRunners.push(result.runnerInfo);
        return;
      }
      const baseIndex = findAvailableBaseIndex(nextBases, getRunnerResultStartIndex(result), targetIndex);
      if (baseIndex < 1) return;
      nextBases[baseNameByIndex[baseIndex]] = makeBaseRunner(result.runnerInfo);
    });

  if (options.commit === false) return { runs, bases: nextBases, scoringRunners };

  bases = nextBases;
  const scoredRuns = allowRuns ? runs : 0;
  recordScoringRunners(battingTeam, allowRuns ? scoringRunners : []);
  addRunsToBattingTeam(scoredRuns, allowRuns ? scoringResponsiblePitcherIds : [], {
    homer: Boolean(options.homer),
    earnedRunFlags: allowRuns ? scoringEarnedRunFlags : []
  });
  playScoringCheer(scoredRuns);
  return { runs: scoredRuns, bases: nextBases, scoringRunners };
}

// 打者が一塁へ走ることで、詰まっている塁の走者は進むしかない。
// 戻り値は「封じられている一番奥の塁」の番号 (0 なら誰も封じられていない)。
function getForcedAdvanceBaseLimit(baseState = bases) {
  if (!baseState?.first) return 0;
  if (!baseState.second) return 1;
  if (!baseState.third) return 2;
  return 3;
}

function advanceRunners(type, batterInfo, battedBall = null, outcome = null) {
  const groundRuleDouble = Boolean(battedBall?.groundRuleDouble);
  const runScoredOnError = Boolean(outcome?.fieldingError);
  const batterRunnerInfo = runScoredOnError ? { ...batterInfo, unearnedRun: true } : batterInfo;
  type = groundRuleDouble ? "double" : normalizeAutoHitAdvanceType(type);

  if (type === "walk") {
    const forcedLimit = getForcedAdvanceBaseLimit(bases);
    const results = [3, 2, 1]
      .map((baseIndex) => {
        const baseName = baseNameByIndex[baseIndex];
        const nextBaseName = baseIndex >= 3 ? "home" : baseNameByIndex[baseIndex + 1];
        return createRunnerResult(bases[baseName], baseName, baseIndex <= forcedLimit ? nextBaseName : baseName);
      })
      .filter(Boolean);
    results.push(createRunnerResult(makeBaseRunner(batterRunnerInfo), "batter", "first"));
    return applyRunnerResults(results).runs;
  }

  const steps = Math.max(1, getBaseAdvanceSteps(type));
  const results = [
    { base: 3, runner: bases.third },
    { base: 2, runner: bases.second },
    { base: 1, runner: bases.first },
    { base: 0, runner: makeBaseRunner(batterRunnerInfo) }
  ]
    .filter((entry) => entry.runner)
    .map(({ base, runner }) => {
      const extraAdvance = groundRuleDouble ? 0 : getExtraRunnerAdvance(base, type, runner, battedBall, outcome);
      const nextIndex = Math.min(4, base + steps + extraAdvance);
      return createRunnerResult(
        runner,
        base === 0 ? "batter" : baseNameByIndex[base],
        nextIndex >= 4 ? "home" : baseNameByIndex[nextIndex],
        { forceUnearned: runScoredOnError }
      );
    });
  return applyRunnerResults(results, { homer: type === "homer" }).runs;
}

function getSecondBatTeam() {
  return firstBatTeam === "away" ? "home" : "away";
}

function isFinalBottomSecondBatTeamLeading() {
  const secondHalfTeam = getSecondBatTeam();
  const firstHalfTeam = firstBatTeam;
  return !isAnyPracticeMode()
    && inning >= maxInnings
    && half === "bottom"
    && battingTeam === secondHalfTeam
    && scores[secondHalfTeam] > scores[firstHalfTeam];
}

function getMercyRuleThreshold() {
  if (inning >= 7) return 7;
  if (inning >= 5) return 10;
  return null;
}

function getMercyRuleWinner() {
  const threshold = getMercyRuleThreshold();
  if (!threshold || isAnyPracticeMode() || scores.away === scores.home) return null;
  const winner = scores.away > scores.home ? "away" : "home";
  return scores[winner] - scores[fieldingOpponentTeam(winner)] >= threshold ? winner : null;
}

function fieldingOpponentTeam(team) {
  return team === "away" ? "home" : "away";
}

function shouldEndByMercyRuleAfterScore() {
  const winner = getMercyRuleWinner();
  return Boolean(
    winner
    && half === "bottom"
    && battingTeam === getSecondBatTeam()
    && winner === battingTeam
  );
}

function shouldEndByMercyRuleAfterCompletedHalf() {
  const winner = getMercyRuleWinner();
  if (!winner) return false;
  if (half === "bottom" && battingTeam === getSecondBatTeam()) return true;
  if (half === "top" && battingTeam === firstBatTeam && winner === getSecondBatTeam()) return true;
  return false;
}

function shouldEndGameAfterCompletedHalfNow() {
  if (isAnyPracticeMode() || count.outs < 3) return false;
  const firstHalfTeam = firstBatTeam;
  const secondHalfTeam = getSecondBatTeam();
  if (shouldEndByMercyRuleAfterCompletedHalf()) return true;
  if (battingTeam === firstHalfTeam) {
    return inning >= maxInnings && scores[secondHalfTeam] > scores[firstHalfTeam];
  }
  return inning >= maxInnings && scores.away !== scores.home;
}

function maybeDelayGameEndAfterFinalOut(reasonLabel = "") {
  if (!shouldEndGameAfterCompletedHalfNow()) return false;
  endGame(reasonLabel);
  return true;
}

function addRunsToBattingTeam(runs, responsiblePitcherIds = [], options = {}) {
  const beforeScores = { away: scores.away, home: scores.home };
  recordLineScoreRuns(battingTeam, runs);
  scores[battingTeam] += runs;
  const afterScores = { away: scores.away, home: scores.home };
  if (runs > 0) {
    recordPitcherDecisionEvent(battingTeam, runs, beforeScores, afterScores, responsiblePitcherIds);
    const penaltyPerRun = options.homer ? staminaTuning.homerRunPenalty : staminaTuning.runPenalty;
    recordResponsiblePitcherRunsAllowed(fieldingTeam(), runs, responsiblePitcherIds, penaltyPerRun, options.earnedRunFlags || []);
    endGameIfMercyRuleReached() || endGameIfFinalBottomSecondBatTeamLeads();
  }
}

function endGameIfFinalBottomSecondBatTeamLeads() {
  if (!isFinalBottomSecondBatTeamLeading()) return false;
  endGame();
  return true;
}

function endGameIfMercyRuleReached() {
  if (!shouldEndByMercyRuleAfterScore()) return false;
  endGame("コールドゲーム");
  return true;
}

function getExtraRunnerAdvance(base, type, runner, battedBall, outcome) {
  if (!runner || !battedBall || type === "walk" || type === "homer" || type === "triple") return 0;
  if (!isManualBaserunningControl()) return 0;
  if (base === 2 && type === "single" && shouldRunnerScoreFromSecondOnSingle(runner, battedBall, outcome)) return 1;
  if (base === 1 && type === "single" && shouldRunnerReachThirdFromFirstOnSingle(runner, battedBall, outcome)) return 1;
  if (base === 1 && type === "double" && shouldRunnerScoreFromFirstOnDouble(runner, battedBall, outcome)) return 1;
  return 0;
}

function createDefenseBaseRunnerAnimations(outcome, battedBall, throwState = null, fielder = null, fieldingTarget = null, hitAndRunState = null) {
  return [
    createDefenseBaseRunner("first", bases.first, outcome, battedBall, throwState, fielder, fieldingTarget, hitAndRunState),
    createDefenseBaseRunner("second", bases.second, outcome, battedBall, throwState, fielder, fieldingTarget, hitAndRunState),
    createDefenseBaseRunner("third", bases.third, outcome, battedBall, throwState, fielder, fieldingTarget, hitAndRunState)
  ].filter(Boolean);
}

// プレー途中で進塁の判断が変わったときに走者を丸ごと作り直すと、
// createDefenseBaseRunner が bases (プレー開始時の塁) から作り直すため、
// すでに走った分・踏んだ塁・手動の指示が消え、生還済みの走者まで開始塁に戻ってしまう。
// 走り出している走者はそのまま生かし、まだ塁で止まっている走者だけ新しい判断に差し替える。
function refreshDefenseBaseRunnerAnimations(outcome, battedBall, throwState = null, fielder = null, fieldingTarget = null, hitAndRunState = null) {
  const rebuilt = createDefenseBaseRunnerAnimations(outcome, battedBall, throwState, fielder, fieldingTarget, hitAndRunState);
  const live = new Map(
    (defenseState.baseRunners || [])
      .filter((runner) => runner?.startBase)
      .map((runner) => [runner.startBase, runner])
  );
  return rebuilt.map((runner) => {
    const current = live.get(runner.startBase);
    return shouldKeepLiveDefenseBaseRunner(current) ? current : runner;
  });
}

// 「もう動き出している走者」は作り直さない。
// 塁上で止まったままの走者だけが、新しい判断 (タッチアップなど) の対象になる。
function shouldKeepLiveDefenseBaseRunner(runner) {
  if (!runner || !runner.startBase) return false;
  if (runner.manualTargetBase) return true;
  if (runner.isOut) return true;
  const startIndex = baseIndexByName[runner.startBase] ?? 0;
  if (getDefenseRunnerCompletedBaseIndex(runner) > startIndex) return true;
  if (runner.arrived && runner.currentBase && runner.currentBase !== runner.startBase) return true;
  return Boolean(runner.running) && !runner.arrived;
}

function createDefenseBaseRunner(baseName, runnerInfo, outcome, battedBall, throwState = null, fielder = null, fieldingTarget = null, hitAndRunState = null) {
  if (!runnerInfo) return null;
  const startBase = baseIndexByName[baseName];
  const manualBaserunning = isManualBaserunningControl();
  const tagUp = shouldTagUpFromBase(baseName, runnerInfo, outcome, battedBall, fielder, fieldingTarget);
  const groundOutAdvance = shouldAdvanceOnGroundOut(baseName, runnerInfo, outcome, battedBall);
  const automaticAdvanceType = tagUp ? "tagup" : groundOutAdvance ? "groundout" : getDefenseBaseRunnerAdvanceType(outcome, throwState);
  const advanceType = battedBall?.groundRuleDouble
    ? "double"
    : manualBaserunning && automaticAdvanceType && !tagUp && !groundOutAdvance ? "single" : automaticAdvanceType;
  const extraAdvance = manualBaserunning || outcome?.kind === "force" ? 0 : getExtraRunnerAdvance(startBase, advanceType, runnerInfo, battedBall, outcome);
  const nextBase = advanceType
    ? Math.min(4, startBase + getBaseAdvanceSteps(advanceType) + (advanceType === "tagup" ? 0 : extraAdvance))
    : startBase;
  const route = createBaseRunnerRoute(startBase, nextBase);
  const speed = getDefenseBaseRunnerSpeed(runnerInfo);
  const startLeadDistance = getDefenseRunnerStartLeadDistance(baseName, runnerInfo, battedBall, outcome, hitAndRunState, nextBase);
  const leadMaxRatio = isHitAndRunRunnerForBase(baseName, runnerInfo, hitAndRunState) ? 0.995 : 0.82;
  const ledRoute = applyRunnerLeadToRoute(route, startLeadDistance, leadMaxRatio);
  const routeStartTime = tagUp ? Math.max(0, outcome.fieldingTime ?? battedBall?.ballTime ?? 0) : 0;
  const distance = getRunnerRouteDistance(ledRoute);
  return {
    ...runnerInfo,
    runnerId: runnerInfo.id || runnerInfo.name || baseName,
    startBase: baseName,
    originalBase: baseName,
    currentBase: baseName,
    targetBase: nextBase >= 4 ? "home" : baseNameByIndex[nextBase],
    forceBase: null,
    forceObligation: false,
    running: nextBase !== startBase,
    returning: false,
    leftBaseTime: routeStartTime,
    reachedBaseTime: null,
    returnedBaseTime: null,
    isOut: false,
    tagUp,
    groundOutAdvance,
    scored: nextBase >= 4,
    route: ledRoute,
    routeStartTime,
    routeDuration: distance > 0 ? distance / speed : 0,
    x: ledRoute[0].x,
    y: ledRoute[0].y,
    speed,
    arrivalTime: routeStartTime + (distance > 0 ? distance / speed : 0),
    arrived: distance === 0
  };
}

function getDefenseBaseRunnerAdvanceType(outcome, throwState = null) {
  if (!outcome) return null;
  if (defenseState.battedBall?.groundRuleDouble) return "double";
  if (outcome.kind === "out" || (outcome.caught && !outcome.needsThrow)) return null;
  if (outcome.kind === "force") {
    if (!throwState) return "single";
    if (!throwState?.safe) return null;
    if (!isManualBaserunningControl()) return "single";
    return throwState.targetBase === "second" ? "double" : "single";
  }
  return getScoringHitType(outcome);
}

function getBaseAdvanceSteps(type) {
  return type === "homer" ? 4 : type === "triple" ? 3 : type === "double" ? 2 : type === "single" || type === "tagup" || type === "groundout" ? 1 : 0;
}

function shouldTagUpFromBase(baseName, runnerInfo, outcome, battedBall, fielder = null, fieldingTarget = null) {
  if (!runnerInfo || !outcome || !battedBall || !fielder || !fieldingTarget) return false;
  if (isManualBaserunningControl()) return false;
  if (count.outs >= 2) return false;
  if (outcome.kind !== "out" || !outcome.caught || outcome.needsThrow) return false;
  if (fielder.role === "P" || battedBall.isGrounder || battedBall.isLiner || battedBall.isPopupFly) return false;
  const startBase = baseIndexByName[baseName];
  if (!startBase || startBase >= 4) return false;
  if (startBase !== 3) return false;
  const catchDepth = getFenceDistance(fieldingTarget);
  const depthRatio = catchDepth / Math.max(1, defenseField.fenceDistance);
  if (catchDepth < getTagUpDepthThreshold(startBase)) return false;
  const runnerTime = getRunnerRouteDistance(createBaseRunnerRoute(startBase, startBase + 1)) / getDefenseBaseRunnerSpeed(runnerInfo);
  const throwTarget = getDefenseBasePoint(startBase + 1);
  const throwDistance = Math.hypot(throwTarget.x - fieldingTarget.x, throwTarget.y - fieldingTarget.y);
  const throwProfile = getThrowProfile(fielder, throwDistance, {
    targetBase: baseNameByIndex[startBase + 1],
    from: fieldingTarget
  });
  const defenseTime = (outcome.fieldingTime ?? battedBall.ballTime ?? 0) + getAutoThrowSetSeconds(fielder) + throwProfile.throwTime;
  const safeMargin = defenseTime - runnerTime;
  const runScore = clamp(((runnerInfo.run ?? 5) - 1) / 9, 0, 1);
  const marginScore = clamp((safeMargin + 0.08) / 0.9, 0, 1);
  if (startBase === 3) {
    const score = depthRatio * 0.62 + runScore * 0.22 + marginScore * 0.3 - clamp((0.46 - depthRatio) / 0.24, 0, 1) * 0.22;
    return score >= 0.64;
  }
  return false;
}

function getTagUpDepthThreshold(startBase) {
  const ratio = startBase === 3 ? 0.36 : startBase === 2 ? 0.52 : 0.68;
  return defenseField.fenceDistance * ratio;
}

function getTagUpRightFieldScore(fieldingTarget) {
  if (!fieldingTarget) return 0;
  return clamp((fieldingTarget.x - field.plateX) / 420, 0, 1);
}

function shouldAdvanceOnGroundOut(baseName, runnerInfo, outcome, battedBall) {
  if (!baseName || !runnerInfo || !outcome || !battedBall) return false;
  if (outcome.kind !== "out" || !outcome.caught || outcome.needsThrow) return false;
  if (!battedBall.isGrounder) return false;
  const startBase = baseIndexByName[baseName];
  return startBase >= 1 && startBase <= 3;
}

function getDefenseRunnerStartLeadDistance(baseName, runnerInfo, battedBall, outcome, hitAndRunState = null, nextBase = null) {
  if (!baseName || !runnerInfo || !battedBall) return 0;
  const startBase = baseIndexByName[baseName];
  if (startBase < 1 || startBase > 3) return 0;
  if (!nextBase || nextBase <= startBase) return 0;
  const run = getOpenEndedAbilityRating(runnerInfo.run ?? 5);
  // run=5 (平均) で塁間の約10%のリードになるよう係数を調整 (26 + 5*12.2 ≒ 87px ≒ 塁間868pxの10%)。
  const normalLead = battedBall.isGrounder ? 26 + run * 12.2 : 0;
  const isHitAndRunRunner = hitAndRunState?.active
    && hitAndRunState.startBase === baseName
    && (!hitAndRunState.runnerId || hitAndRunState.runnerId === runnerInfo.id || hitAndRunState.runnerId === runnerInfo.name);
  const baseSegmentDistance = getRunnerRouteDistance(createBaseRunnerRoute(startBase, startBase + 1));
  const actualRunningLead = Number.isFinite(hitAndRunState?.leadDistance)
    ? hitAndRunState.leadDistance
    : 0;
  const fallbackHitAndRunLead = 130 + run * 12;
  const hitAndRunLead = isHitAndRunRunner
    ? actualRunningLead > 0 ? actualRunningLead : fallbackHitAndRunLead
    : 0;
  const maxSegment = baseSegmentDistance * (isHitAndRunRunner ? 0.995 : 0.5);
  return clamp(Math.max(normalLead, hitAndRunLead), 0, maxSegment);
}

function isHitAndRunRunnerForBase(baseName, runnerInfo, hitAndRunState = null) {
  return Boolean(
    hitAndRunState?.active
      && hitAndRunState.startBase === baseName
      && (!hitAndRunState.runnerId || hitAndRunState.runnerId === runnerInfo?.id || hitAndRunState.runnerId === runnerInfo?.name)
  );
}

function applyRunnerLeadToRoute(route, leadDistance = 0, maxRatio = 0.82) {
  if (!route?.length || route.length < 2 || leadDistance <= 0) return route;
  const totalDistance = getRunnerRouteDistance(route);
  if (totalDistance <= 0) return route;
  const startPoint = getRunnerRoutePoint(route, clamp(leadDistance / totalDistance, 0, maxRatio));
  return [{ ...startPoint }, ...route.slice(1)];
}

function getTagUpRiskMargin(runnerInfo, fielder, catchDepth) {
  const runnerBoost = ((runnerInfo.run ?? 5) - 5) * 0.025;
  const armPenalty = ((fielder?.arm ?? 5) - 5) * 0.035;
  const depthBonus = clamp((catchDepth - defenseField.fenceDistance * 0.42) / (defenseField.fenceDistance * 0.38), 0, 1) * 0.14;
  return clamp(0.22 - runnerBoost + armPenalty - depthBonus, 0.08, 0.34);
}

function createBaseRunnerRoute(startBase, nextBase) {
  const route = [];
  const clampedNext = Math.min(4, Math.max(startBase, nextBase));
  for (let base = startBase; base <= clampedNext; base += 1) {
    route.push({ ...getDefenseBasePoint(base) });
  }
  return route.length ? route : [{ ...getDefenseBasePoint(startBase) }];
}

function getDefenseBasePoint(base) {
  if (base >= 4 || base <= 0) return defenseField.bases.home;
  return defenseField.bases[baseNameByIndex[base]];
}

function getDefenseBaseRunnerSpeed(runnerInfo) {
  return getRunnerSpeed(runnerInfo);
}

function getRunnerSpeed(runnerInfo) {
  return (runnerSpeedBaseRun + getEffectiveRunRating(runnerInfo?.run ?? 5)) * runnerSpeedUnit * runnerSpeedScale;
}

function getEffectiveRunRating(runRating) {
  return getRedistributedMovementRating(runRating);
}

function getOpenEndedAbilityRating(rating, fallback = 5) {
  const value = Number(rating ?? fallback);
  return Number.isFinite(value) ? Math.max(1, value) : Math.max(1, fallback);
}

function getBaseCompressedMovementRating(rating) {
  const value = getOpenEndedAbilityRating(rating);
  const highRunCompression = 0.775;
  return 1 + (value - 1) * highRunCompression;
}

function boostLowActualAbilityRating(currentRating, maxRating) {
  const boostedRatingOne = Math.min(maxRating, (abilitySpeedBaseRating + currentRating) * lowAbilityActualBoost - abilitySpeedBaseRating);
  return { boostedRatingOne, maxRating };
}

function getRedistributedMovementRating(rating) {
  const value = getOpenEndedAbilityRating(rating);
  const oldRatingThree = getBaseCompressedMovementRating(3);
  const oldRatingTen = getBaseCompressedMovementRating(10);
  const boosted = boostLowActualAbilityRating(oldRatingThree, oldRatingTen);
  return boosted.boostedRatingOne + ((value - 1) / 9) * (boosted.maxRating - boosted.boostedRatingOne);
}

function getRedistributedFieldingMovementRating(rating) {
  const value = getOpenEndedAbilityRating(rating);
  const oldRatingFloor = getBaseCompressedMovementRating(3.6);
  const oldRatingTen = getBaseCompressedMovementRating(10);
  const boosted = boostLowActualAbilityRating(oldRatingFloor, oldRatingTen);
  return boosted.boostedRatingOne + ((value - 1) / 9) * (boosted.maxRating - boosted.boostedRatingOne);
}

function shouldRunnerScoreFromSecondOnSingle(runner, battedBall, outcome) {
  return getAggressiveRunnerScore(runner, battedBall, outcome) >= 0.66;
}

function shouldRunnerReachThirdFromFirstOnSingle(runner, battedBall, outcome) {
  return getAggressiveRunnerScore(runner, battedBall, outcome) >= 0.72;
}

function shouldRunnerScoreFromFirstOnDouble(runner, battedBall, outcome) {
  return getAggressiveRunnerScore(runner, battedBall, outcome) >= 0.82;
}

function getAggressiveRunnerScore(runner, battedBall, outcome) {
  const fieldingPoint = outcome?.fieldingPoint || battedBall.wallReboundTarget || battedBall.target || defenseField.bases.second;
  const depthRatio = clamp(getFenceDistance(fieldingPoint) / defenseField.fenceDistance, 0, 1);
  const run = getOpenEndedAbilityRating(runner.run ?? 5);
  const runnerBoost = (run - 5) * 0.085;
  const slowRunnerPenalty = clamp((5 - run) / 4, 0, 1) * 0.18;
  const ballTimeBoost = clamp((battedBall.ballTime ?? 0.8) / 3.5, 0, 0.34);
  const trajectoryBoost = battedBall.wallHit || battedBall.groundRuleDouble
    ? 0.34
    : battedBall.isHardOutfieldBounce ? 0.28
    : battedBall.isLiner ? 0.18
    : battedBall.isGrounder ? 0.1
    : 0.2;
  const powerBoost = clamp((battedBall.power ?? 0.5) * 0.14, 0, 0.28);
  const fieldingDelay = Number.isFinite(outcome?.fieldingTime)
    ? Math.max(0, outcome.fieldingTime - (battedBall.ballTime ?? 0.8))
    : 0;
  const fieldingDelayBoost = clamp(fieldingDelay / 2.8, 0, 0.22);
  const cleanHitBoost = outcome?.scoreType === "single" && (battedBall.isHardOutfieldBounce || (battedBall.isLiner && !battedBall.isLineDrop && depthRatio >= 0.42))
    ? 0.12
    : 0;
  const shortHitPenalty = outcome?.scoreType === "single" && depthRatio < 0.34 ? 0.2 : 0;
  return depthRatio * 0.84 + runnerBoost + ballTimeBoost + trajectoryBoost + powerBoost + fieldingDelayBoost + cleanHitBoost - shortHitPenalty - slowRunnerPenalty;
}

function makeBaseRunner(player) {
  if (!player) return null;
  return {
    id: player.id,
    name: player.name,
    run: player.run ?? 5,
    unearnedRun: Boolean(player.unearnedRun),
    responsiblePitcherId: player.responsiblePitcherId ?? (!isAnyPracticeMode() ? getTeamActivePitcher(fieldingTeam())?.id : null),
    responsibleTeam: player.responsibleTeam ?? (!isAnyPracticeMode() ? fieldingTeam() : null)
  };
}

function getRunnerResponsiblePitcherId(runner) {
  return runner?.responsiblePitcherId ?? (!isAnyPracticeMode() ? getTeamActivePitcher(fieldingTeam())?.id : null);
}

function trackScoringRunner(runner, responsiblePitcherIds, earnedRunFlags, options = {}) {
  responsiblePitcherIds.push(getRunnerResponsiblePitcherId(runner));
  earnedRunFlags.push(!(options.forceUnearned || runner?.unearnedRun));
}

function formatRuns(runs) {
  return runs > 0 ? `${runs}点` : "得点なし";
}

// フェンス直撃は打席結果の文言からは分からないので、結果表示に残す。
// (安打として成立した場合、表示は「○塁セーフ」や「ヒット」になり、
//  outcome.label の「フェンス直撃」がどこにも出ないため)
function getBattedBallHighlightLabel(battedBall = defenseState.battedBall) {
  if (!battedBall || battedBall.fenceOver) return "";
  if (battedBall.groundRuleDouble) return "エンタイトルツーベース";
  if (battedBall.wallHit) return "フェンス直撃";
  return "";
}

function withBattedBallHighlight(baseMessage, battedBall = defenseState.battedBall) {
  const highlight = getBattedBallHighlightLabel(battedBall);
  return highlight ? `${highlight} / ${baseMessage}` : baseMessage;
}

function createHomeRunFireworks(battedBall) {
  if (!battedBall?.fenceOver) return null;
  const homerRuns = getPendingHomeRunRuns();
  const stadium = getCurrentStadium();
  const isBigFireworksStadium = stadium.id === "fireworks";
  const fireworkScale = (stadium.fireworkScale ?? 1) * (isBigFireworksStadium ? 7 : 1);
  const burstCount = Math.round((homerRuns >= 4 ? 28 : homerRuns === 3 ? 20 : homerRuns === 2 ? 15 : 10) * fireworkScale);
  const sparkBase = Math.round((homerRuns >= 4 ? 36 : homerRuns === 3 ? 30 : homerRuns === 2 ? 26 : 22) * Math.sqrt(fireworkScale));
  const duration = (homerRuns >= 4 ? 4.2 : homerRuns === 3 ? 3.6 : homerRuns === 2 ? 3.2 : 3) * (fireworkScale > 1 ? 1.12 : 1);
  const center = getFenceCenter();
  const direction = normalize({
    x: (battedBall.target?.x ?? field.centerX) - center.x,
    y: (battedBall.target?.y ?? center.y - defenseField.fenceDistance) - center.y
  });
  const side = normalize({ x: -direction.y, y: direction.x });
  const colors = ["#fff2a8", "#ff6f61", "#aee7ff", "#d6f2df", "#ffb3f0"];
  const boatCatch = getHomeRunBoatCatch(battedBall);
  const oceanBoats = getHomeRunOceanWaitingBoats(battedBall, boatCatch);
  const rockets = createSpaceHomeRunRockets(battedBall, homerRuns, duration);
  const mStadiumRocket = createMStadiumHomeRunRocket(battedBall, homerRuns);
  const trains = createAozoraHomeRunTrains(battedBall, duration);
  const bursts = Array.from({ length: burstCount }, (_, burstIndex) => {
    const standDistance = defenseField.fenceDistance + randomBetween(70, homerRuns >= 4 ? 430 : 260);
    const lateral = randomBetween(homerRuns >= 4 ? -720 : -420, homerRuns >= 4 ? 720 : 420);
    const origin = isBigFireworksStadium
      ? getBigFireworksVisibleOrigin(burstIndex, burstCount)
      : {
          x: center.x + direction.x * standDistance + side.x * lateral,
          y: center.y + direction.y * standDistance + side.y * lateral
        };
    const sparkCount = sparkBase + Math.floor(randomBetween(0, homerRuns >= 4 ? 24 : 13));
    return {
      origin,
      screenLocked: isBigFireworksStadium,
      delay: burstIndex * (isBigFireworksStadium ? 0.035 : homerRuns >= 4 ? 0.15 : 0.24) + randomBetween(0, isBigFireworksStadium ? 0.09 : 0.18),
      color: colors[burstIndex % colors.length],
      sparks: Array.from({ length: sparkCount }, () => {
        const angle = randomBetween(0, Math.PI * 2);
        const speed = randomBetween(82, homerRuns >= 4 ? 260 : 190);
        return {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
          size: randomBetween(4.5, homerRuns >= 4 ? 10.5 : 8.5)
        };
      })
    };
  });
  const burstDuration = bursts.reduce((max, burst) => Math.max(max, burst.delay + 1.08), 0);
  const rocketDuration = rockets.reduce((max, rocket) => Math.max(max, rocket.delay + rocket.duration + 0.7), 0);
  const mStadiumRocketDuration = mStadiumRocket
    ? mStadiumRocket.delay + mStadiumRocket.duration + mStadiumRocket.endingDuration
    : 0;
  const trainDuration = trains.reduce((max, train) => Math.max(max, train.delay + train.duration + 0.4), 0);
  return {
    startDelay: Math.max(0.15, battedBall.ballTime ?? 0.7),
    duration: Math.max(boatCatch ? 5.8 : duration, burstDuration, rocketDuration, mStadiumRocketDuration, trainDuration),
    bursts,
    rockets,
    mStadiumRocket,
    trains,
    oceanBoats,
    boatCatch
  };
}

function getBigFireworksVisibleOrigin(burstIndex, burstCount) {
  const marginX = 96;
  const top = 92;
  const bottom = Math.min(canvas.height * 0.62, 520);
  const columns = 7;
  const rows = 4;
  const column = burstIndex % columns;
  const row = Math.floor(burstIndex / columns) % rows;
  const cycle = Math.floor(burstIndex / (columns * rows));
  const xStep = (canvas.width - marginX * 2) / Math.max(1, columns - 1);
  const yStep = (bottom - top) / Math.max(1, rows - 1);
  return {
    x: clamp(marginX + column * xStep + randomBetween(-54, 54) + (cycle % 2 ? xStep * 0.34 : 0), marginX, canvas.width - marginX),
    y: clamp(top + row * yStep + randomBetween(-34, 34), top, bottom)
  };
}

function createAozoraHomeRunTrains(battedBall, duration = 3) {
  if (getCurrentStadium().id !== "aozora" || !battedBall?.fenceOver) return [];
  const center = getFenceCenter();
  const trackY = center.y - defenseField.fenceDistance - 310;
  const leftStart = center.x - defenseField.fenceDistance - 620;
  const rightStart = center.x + defenseField.fenceDistance + 620;
  const travel = defenseField.fenceDistance * 2 + 1240;
  return [
    {
      startX: leftStart,
      endX: leftStart + travel,
      y: trackY,
      delay: 0.25,
      duration: Math.max(3.1, duration + 0.8),
      direction: 1,
      colors: ["#ff6f61", "#fff07a", "#74fff5", "#9f83ff"]
    },
    {
      startX: rightStart,
      endX: rightStart - travel,
      y: trackY + 46,
      delay: 0.65,
      duration: Math.max(3.4, duration + 1.1),
      direction: -1,
      colors: ["#5ec8ff", "#ff8fb3", "#b6f27b", "#ffd36e"]
    }
  ];
}

function createSpaceHomeRunRockets(battedBall, homerRuns, duration) {
  if (!getCurrentStadium().hasSpaceStadium || !battedBall?.fenceOver) return [];
  const center = getFenceCenter();
  const direction = normalize({
    x: (battedBall.target?.x ?? field.centerX) - center.x,
    y: (battedBall.target?.y ?? center.y - defenseField.fenceDistance) - center.y
  });
  const side = normalize({ x: -direction.y, y: direction.x });
  const standDistance = defenseField.fenceDistance + 260;
  const lateral = randomBetween(-180, 180);
  const start = {
    x: center.x + direction.x * standDistance + side.x * lateral,
    y: center.y + direction.y * standDistance + side.y * lateral
  };
  const end = {
    x: start.x + side.x * randomBetween(120, 240) + direction.x * 480,
    y: start.y + direction.y * 360 - 640
  };
  return [{
    start,
    end,
    delay: 0.12,
    duration: clamp(duration * 0.92, 2.4, 4.2),
    color: "#ffef8a",
    wobble: randomBetween(34, 54),
    size: homerRuns >= 4 ? 1.28 : homerRuns >= 2 ? 1.14 : 1
  }];
}

function createMStadiumHomeRunRocket(battedBall, homerRuns) {
  const stadium = getCurrentStadium();
  if (!(stadium.hasMStadium || stadium.hasXStadium) || !battedBall?.fenceOver) return null;
  const center = getFenceCenter();
  const launchX = clamp(
    battedBall.target?.x ?? field.plateX,
    field.plateX - defenseField.fenceDistance * 0.36,
    field.plateX + defenseField.fenceDistance * 0.36
  );
  const launchY = center.y - defenseField.fenceDistance - 92;
  const flightHeight = homerRuns >= 4 ? 760 : homerRuns >= 2 ? 700 : 640;
  return {
    start: { x: launchX, y: launchY },
    end: { x: launchX + randomBetween(-28, 28), y: launchY - flightHeight },
    delay: 0.18,
    duration: stadium.hasXStadium ? 64 : homerRuns >= 4 ? 4.25 : 3.65,
    endingDuration: 3.45,
    smokeSeed: Math.floor(randomBetween(0, 1000)),
    cosmicJourney: stadium.hasXStadium === true,
    lines: stadium.hasXStadium ? getXStadiumHomeRunJourneyLines(homerRuns) : getMStadiumHomeRunEndingLines(homerRuns)
  };
}

function getMStadiumHomeRunEndingLines(homerRuns = 1) {
  if (homerRuns >= 4) {
    return [
      "黒曜石の空へ、満塁弾が打ち上がりました。",
      "Mスタジアムの夜は、この一振りを忘れません。",
      "すべての走者が帰り、物語は最高高度へ。"
    ];
  }
  if (homerRuns >= 2) {
    return [
      "白いロケットが、ホームランの軌道を追って昇ります。",
      "黒曜石のフィールドに、勝負を変える光が残りました。",
      "Mスタジアムは、この打球を歓声として記録します。"
    ];
  }
  return [
    "打球はフェンスを越え、ロケットは夜空へ向かいます。",
    "黒曜石のフィールドに、ひとすじの白い炎が伸びました。",
    "Mスタジアムです。ここからまた、新しい勝負が始まります。"
  ];
}

function getXStadiumHomeRunJourneyLines(homerRuns = 1) {
  if (homerRuns >= 4) {
    return [
      "Xスタジアム発、満塁ホームラン宇宙便。",
      "64秒の旅路が、すべての走者の帰還を祝います。",
      "Mスタジアムから続く試合は、さらに遠い空へ。"
    ];
  }
  return [
    "Xスタジアム発、ホームラン宇宙便。",
    "64秒間、白いロケットが打球の余韻を運びます。",
    "試合は続きます。舞台だけが、星の近くへ進みました。"
  ];
}

function getHomeRunBoatCatch(battedBall) {
  if (!getCurrentStadium().hasOcean || !battedBall?.fenceOver) return null;
  const projectedLanding = getHomeRunWaterLandingPoint(battedBall);
  const waitingBoats = getHyperOceanLandingBoats(projectedLanding, battedBall);
  const nearest = waitingBoats
    .map((boat) => ({ boat, distance: Math.hypot(boat.x - projectedLanding.x, boat.y - projectedLanding.y) }))
    .sort((a, b) => a.distance - b.distance)[0];
  if (!nearest || nearest.distance > 420) return null;
  const moveRatio = nearest.distance <= 72 ? 0 : clamp((nearest.distance - 72) / 310, 0, 1);
  const catchX = nearest.boat.x + (projectedLanding.x - nearest.boat.x) * moveRatio;
  const catchY = nearest.boat.y + (projectedLanding.y - nearest.boat.y) * moveRatio;
  const catchAngle = Math.atan2(projectedLanding.y - nearest.boat.y, projectedLanding.x - nearest.boat.x);
  return {
    boatId: nearest.boat.id,
    homeX: nearest.boat.x,
    homeY: nearest.boat.y,
    x: catchX,
    y: catchY,
    ballX: projectedLanding.x,
    ballY: projectedLanding.y,
    distance: nearest.distance,
    moveRatio,
    catchAngle,
    startTime: Math.max(0.12, battedBall.ballTime ?? 0.8),
    travelDuration: clamp((battedBall.ballTime ?? 0.8) + 0.55, 0.85, 1.65)
  };
}

function getHomeRunWaterLandingPoint(battedBall) {
  const center = getFenceCenter();
  const direction = normalize({
    x: (battedBall?.target?.x ?? field.centerX) - center.x,
    y: (battedBall?.target?.y ?? center.y - defenseField.fenceDistance) - center.y
  });
  return {
    x: center.x + direction.x * (defenseField.fenceDistance + 290),
    y: center.y + direction.y * (defenseField.fenceDistance + 290)
  };
}

function getHomeRunOceanWaitingBoats(battedBall, boatCatch = null) {
  if (!getCurrentStadium().hasOcean || !battedBall?.fenceOver) return [];
  return getHyperOceanLandingBoats(getHomeRunWaterLandingPoint(battedBall), battedBall, boatCatch?.boatId);
}

function getPendingHomeRunRuns() {
  return 1 + baseNames.reduce((total, base) => total + (bases[base] ? 1 : 0), 0);
}

function startDefensePlay(label, kind, power, timeDiff, hitDirection = null, battedProfile = null, hitAndRunState = null) {
  const direction = hitDirection || getHitDirection(timeDiff, false);
  const battedBall = buildBattedBall(power, direction, label, battedProfile);
  appendBattedBallFeedback(battedBall);
  if (shouldTreatAirLandingAsFoul(battedBall)) {
    startFairBattedBallFoulPlay(battedBall, battedBall.target);
    return;
  }
  const fielders = initializeFielderCatchRanges(getDefensiveLineup(fieldingTeam()));
  const manualFielding = isManualDefenseControl();
  let chosenFielder = battedBall.isBunt ? chooseBuntDefenseFielder(fielders, battedBall) : chooseDefenseFielder(fielders, battedBall);
  const runner = createBatterRunner(activeBatter);
  let outcome = resolveDefenseOutcome(chosenFielder, battedBall, runner);
  const infieldRoutePickup = resolveMiddleInfieldBouncePickup(chosenFielder, battedBall, outcome, runner);
  if (infieldRoutePickup) {
    outcome = infieldRoutePickup.outcome;
    chosenFielder = infieldRoutePickup.fielder;
  }
  let fieldingTarget = getDefenseFieldingTarget(battedBall, outcome);
  if (battedBall.rolledFoulBeforeOutfield) {
    startFairBattedBallFoulPlay(battedBall, fieldingTarget);
    return;
  }
  if (shouldOutfielderTakeOverAfterInfieldMiss(chosenFielder, battedBall, outcome, fieldingTarget)) {
    const outfielder = chooseDefenseFielder(
      fielders.filter((fielder) => !isInfielderRole(fielder.role)),
      { ...battedBall, target: fieldingTarget, landingDistance: Math.max(battedBall.landingDistance ?? 0, getFenceDistance(fieldingTarget)), isDeep: true }
    );
    if (outfielder) {
      chosenFielder = outfielder;
      outcome = {
        ...outcome,
        fieldingTime: Math.max(outcome.fieldingTime ?? battedBall.ballTime, getDefenseBallFieldingArrivalTime(battedBall, fieldingTarget))
      };
    }
  }
  const infieldInterception = resolveInfieldInterceptionBeforeOutfield(fielders, battedBall, outcome, runner);
  if (infieldInterception) {
    chosenFielder = infieldInterception.fielder;
    outcome = infieldInterception.outcome;
    fieldingTarget = infieldInterception.target;
  }
  const fenceOutcome = resolveFenceBoundaryOutcome(battedBall, outcome, fieldingTarget);
  if (fenceOutcome) {
    outcome = fenceOutcome.outcome;
    fieldingTarget = fenceOutcome.target;
  } else {
    const grounderPickup = resolveGrounderPickupThrow(chosenFielder, battedBall, outcome, fieldingTarget, runner);
    if (grounderPickup) {
      outcome = grounderPickup.outcome;
      fieldingTarget = grounderPickup.target;
    }
  }
  outcome = alignFieldingTimeWithBallArrival(battedBall, outcome, fieldingTarget, chosenFielder);
  setBatterRunnerDestination(runner, getBatterRunnerTargetBase(outcome, battedBall, fieldingTarget, chosenFielder, runner));
  const automaticOutcome = outcome;
  if (manualFielding) {
    outcome = createManualFieldingPendingOutcome(automaticOutcome, battedBall);
    fieldingTarget = getManualDefenseUnfieldedTarget(battedBall, automaticOutcome);
  } else {
    outcome = createThrowPlayForFieldedHit(chosenFielder, battedBall, outcome, fieldingTarget, runner);
  }
  const baseRunners = createDefenseBaseRunnerAnimations(outcome, battedBall, null, chosenFielder, fieldingTarget, hitAndRunState);
  const forceTargets = createForceTargetsForPlay(battedBall, outcome);
  const forceMapForPlay = new Map(forceTargets.map((target) => [target.startBase, target.targetBase]));
  runner.forceBase = forceMapForPlay.get("batter") || null;
  runner.forceObligation = Boolean(runner.forceBase);
  baseRunners.forEach((baseRunner) => {
    baseRunner.forceBase = forceMapForPlay.get(baseRunner.startBase) || null;
    baseRunner.forceObligation = Boolean(baseRunner.forceBase);
  });
  let throwState = manualFielding
    ? null
    : createThrowState(chosenFielder, fieldingTarget, outcome, runner, {
      manualWait: isManualThrowControl(),
      targetBase: getInitialDefenseThrowTargetBase(outcome, battedBall, runner, {
        fielder: chosenFielder,
        fieldingTarget,
        baseRunners,
        minStartTime: getFieldingTimeForThrowDecision(outcome, battedBall, fieldingTarget, chosenFielder),
        autoFallback: !isManualThrowControl()
      }),
      baseRunners,
      minStartTime: getFieldingTimeForThrowDecision(outcome, battedBall, fieldingTarget, chosenFielder)
    });
  if (!throwState && !isManualThrowControl()) {
    throwState = createTagUpVisualThrowState(chosenFielder, fieldingTarget, outcome, battedBall, baseRunners, {
      live: true
    });
  }
  if (outcome.caught && !outcome.needsThrow && !throwState) throwState = null;

  gamePhase = "defense";
  isPitching = false;
  pendingPitch = null;
  autoPitchTimer = Number.POSITIVE_INFINITY;
  resetSwing();
  ball.active = true;
  ball.inPitch = false;
  ball.crossedPlate = true;
  ball.wasHit = true;
  ball.trail = [];
  ball.x = battedBall.origin.x;
  ball.y = battedBall.origin.y;
  ball.vx = 0;
  ball.vy = 0;
  ball.radius = 8;

  defenseState = {
    ...createDefenseState(),
    active: true,
    startTime: performance.now(),
    duration: manualFielding ? 15000 : getDefenseDuration(battedBall, outcome, runner, throwState, fieldingTarget),
    fielders,
    chosenFielder,
    target: fieldingTarget,
    landingTarget: getDefenseVisualLandingTarget(battedBall),
    origin: battedBall.origin,
    ballPath: direction,
    battedBall,
    outcome,
    runner,
    baseRunners,
    throw: throwState,
    forceTargets,
    automaticOutcome,
    manualFielding,
    manualFieldingComplete: !manualFielding,
    manualCatchRadius: getManualDefenseCatchRadius(chosenFielder, battedBall),
    homeRunFireworks: createHomeRunFireworks(battedBall),
    resolved: false
  };

  const metricText = getBattedBallMetricText(battedBall);
  const baseMessage = battedBall.fenceOver
    ? "大きな当たり、フェンス際へ"
    : battedBall.wallHit
      ? "高いフェンスへ一直線"
    : manualFielding
      ? "守備操作: スティックで野手を動かして捕球"
      : `${chosenFielder.role} が打球へ走る`;
  message = metricText ? `${baseMessage} / ${metricText}` : baseMessage;
}

function startFoulBallPlay(label, power, timeDiff, hitDirection = null, battedProfile = null) {
  const direction = hitDirection || getHitDirection(timeDiff, true);
  const battedBall = createFoulBattedBall(power, direction, label, battedProfile);
  appendBattedBallFeedback(battedBall);
  const fielders = initializeFielderCatchRanges(getDefensiveLineup(fieldingTeam()));
  let chosenFielder = chooseFoulDefenseFielder(fielders, battedBall);
  let outcome = resolveFoulDefenseOutcome(chosenFielder, battedBall);
  let fieldingTarget = outcome.caught ? battedBall.target : getFoulBallFieldingTarget(battedBall);
  outcome = alignFieldingTimeWithBallArrival(battedBall, outcome, fieldingTarget, chosenFielder);

  gamePhase = "defense";
  isPitching = false;
  pendingPitch = null;
  autoPitchTimer = Number.POSITIVE_INFINITY;
  resetSwing();
  ball.active = true;
  ball.inPitch = false;
  ball.crossedPlate = true;
  ball.wasHit = true;
  ball.trail = [];
  ball.x = battedBall.origin.x;
  ball.y = battedBall.origin.y;
  ball.vx = 0;
  ball.vy = 0;
  ball.radius = 8;

  defenseState = {
    ...createDefenseState(),
    active: true,
    foulPlay: true,
    startTime: performance.now(),
    duration: getDefenseDuration(battedBall, outcome, null, null, fieldingTarget),
    fielders,
    chosenFielder,
    target: fieldingTarget,
    landingTarget: getDefenseVisualLandingTarget(battedBall),
    origin: battedBall.origin,
    ballPath: direction,
    battedBall,
    outcome,
    runner: null,
    baseRunners: [],
    throw: null,
    forceTargets: [],
    automaticOutcome: outcome,
    manualFielding: false,
    manualFieldingComplete: true,
    manualCatchRadius: getManualDefenseCatchRadius(chosenFielder, battedBall),
    resolved: false
  };

  const metricText = getBattedBallMetricText(battedBall);
  const baseMessage = outcome.caught
    ? `${chosenFielder.role} ファールフライを追う`
    : `${chosenFielder.role} ファールボールを追う`;
  message = metricText ? `${baseMessage} / ${metricText}` : baseMessage;
}

function startFairBattedBallFoulPlay(sourceBattedBall, fieldingTarget = null) {
  const target = fieldingTarget || sourceBattedBall.foulCrossingPoint || sourceBattedBall.target;
  const battedBall = {
    ...sourceBattedBall,
    isFoulBall: true,
    fenceOver: false,
    wallHit: false,
    groundRuleDouble: false,
    target,
    landingDistance: Math.hypot(target.x - sourceBattedBall.origin.x, target.y - sourceBattedBall.origin.y),
    flightDistance: Math.hypot(target.x - sourceBattedBall.origin.x, target.y - sourceBattedBall.origin.y)
  };
  const fielders = initializeFielderCatchRanges(getDefensiveLineup(fieldingTeam()));
  const chosenFielder = chooseFoulDefenseFielder(fielders, battedBall);
  let outcome = resolveFoulDefenseOutcome(chosenFielder, battedBall);
  let finalTarget = outcome.caught ? battedBall.target : getFoulBallFieldingTarget(battedBall);
  outcome = alignFieldingTimeWithBallArrival(battedBall, outcome, finalTarget, chosenFielder);

  gamePhase = "defense";
  isPitching = false;
  pendingPitch = null;
  autoPitchTimer = Number.POSITIVE_INFINITY;
  resetSwing();
  ball.active = true;
  ball.inPitch = false;
  ball.crossedPlate = true;
  ball.wasHit = true;
  ball.trail = [];
  ball.x = battedBall.origin.x;
  ball.y = battedBall.origin.y;
  ball.vx = 0;
  ball.vy = 0;
  ball.radius = 8;

  defenseState = {
    ...createDefenseState(),
    active: true,
    foulPlay: true,
    startTime: performance.now(),
    duration: getDefenseDuration(battedBall, outcome, null, null, finalTarget),
    fielders,
    chosenFielder,
    target: finalTarget,
    landingTarget: getDefenseVisualLandingTarget(battedBall),
    origin: battedBall.origin,
    ballPath: battedBall.direction,
    battedBall,
    outcome,
    runner: null,
    baseRunners: [],
    throw: null,
    forceTargets: [],
    automaticOutcome: outcome,
    manualFielding: false,
    manualFieldingComplete: true,
    manualCatchRadius: getManualDefenseCatchRadius(chosenFielder, battedBall),
    resolved: false
  };
  const metricText = getBattedBallMetricText(battedBall);
  const baseMessage = outcome.caught
    ? `${chosenFielder.role} ファールフライを追う`
    : `${chosenFielder.role} ファールボールを追う`;
  message = metricText ? `${baseMessage} / ${metricText}` : baseMessage;
}

function createFoulBattedBall(power, direction, label, battedProfile = null) {
  const profile = battedProfile ? { ...battedProfile, isFoul: true } : { isFoul: true };
  const foulPower = clamp(power || profile.power || 0.36, 0.18, 0.78);
  const variedDirection = label === hitLabels.popup || label === hitLabels.routineFly || label === hitLabels.fly
    ? getVariedFlyLandingDirection(direction, profile, { isRoutineFly: label !== hitLabels.popup })
    : direction;
  let battedBall = buildBattedBall(foulPower, variedDirection, label || hitLabels.foul, profile);
  if (isPointInFairTerritory(battedBall.target, 10)) {
    const adjustedTarget = getFoulVisualTarget(battedBall.target, variedDirection);
    const adjustedDirection = normalize({
      x: adjustedTarget.x - battedBall.origin.x,
      y: adjustedTarget.y - battedBall.origin.y
    });
    const adjustedDistance = Math.hypot(adjustedTarget.x - battedBall.origin.x, adjustedTarget.y - battedBall.origin.y);
    battedBall = {
      ...battedBall,
      target: adjustedTarget,
      direction: adjustedDirection,
      landingDistance: adjustedDistance,
      flightDistance: adjustedDistance
    };
  }
  const foulDepthScale = battedBall.isGrounder
    ? randomBetween(0.82, 1.12)
    : battedBall.isPopupFly
      ? randomBetween(0.68, 1.34)
      : randomBetween(0.74, 1.42);
  const flightDistance = clamp(
    (battedBall.flightDistance || battedBall.landingDistance || (260 + foulPower * 760)) * foulDepthScale,
    battedBall.isGrounder ? 170 : 240,
    battedBall.isPopupFly ? 880 : 1360
  );
  const finalDirection = battedBall.direction || variedDirection;
  const rawTarget = {
    x: battedBall.origin.x + finalDirection.x * flightDistance,
    y: battedBall.origin.y + finalDirection.y * flightDistance
  };
  // 距離を伸縮させると本塁から見た角度が変わり、補正済みの落下点が
  // フェアゾーンへ戻ってしまう。最終的な落下点をもう一度ファウル側へ押し出す。
  const foulLanding = ensureFoulLandingPoint(battedBall.origin, rawTarget, finalDirection);
  return {
    ...battedBall,
    isFoulBall: true,
    fenceOver: false,
    wallHit: false,
    groundRuleDouble: false,
    flightDistance: foulLanding.distance,
    landingDistance: foulLanding.distance,
    target: foulLanding.target,
    direction: foulLanding.direction,
    maxHeight: battedBall.isGrounder ? Math.min(battedBall.maxHeight || 12, 18) : Math.max(battedBall.maxHeight || 120, 120),
    ballTime: Math.max(0.42, battedBall.ballTime ?? 0.8)
  };
}

function chooseFoulDefenseFielder(fielders, battedBall) {
  if (!fielders?.length) return null;
  const target = battedBall?.target || defenseField.bases.home;
  const candidates = fielders
    .filter((fielder) => {
      if (!battedBall?.isGrounder) return true;
      return fielder.role === "P" || isInfielderRole(fielder.role);
    })
    .map((fielder) => {
      const distance = Math.hypot(target.x - fielder.x, target.y - fielder.y);
      const sidePenalty = target.x < field.centerX && fielder.x > field.centerX ? 160 : target.x > field.centerX && fielder.x < field.centerX ? 160 : 0;
      const catcherBonus = fielder.role === "CA" && !battedBall?.isGrounder ? -90 : 0;
      return {
        fielder: { ...fielder, distanceToTarget: distance, fieldingPoint: target },
        score: distance + sidePenalty + catcherBonus
      };
    })
    .sort((a, b) => a.score - b.score);
  return candidates[0]?.fielder || fielders[0];
}

function resolveFoulDefenseOutcome(fielder, battedBall) {
  const fallback = {
    kind: "foul",
    label: "ファウル",
    caught: false,
    fieldingTime: battedBall.ballTime ?? 0.8
  };
  if (!fielder || !battedBall || battedBall.isGrounder) return fallback;
  const airOutcome = resolveDefenseOutcome(fielder, battedBall, null);
  if (airOutcome?.caught && !airOutcome.needsThrow) {
    return {
      ...airOutcome,
      kind: "foulOut",
      label: "ファールフライ",
      scoreType: null
    };
  }
  return fallback;
}

function getFoulBallFieldingTarget(battedBall) {
  if (!battedBall) return defenseField.bases.home;
  if (battedBall.isGrounder) {
    const rollDistance = 160 + clamp(battedBall.power ?? 0.4, 0, 1) * 420;
    return {
      x: battedBall.target.x + (battedBall.direction?.x ?? 0) * rollDistance,
      y: battedBall.target.y + (battedBall.direction?.y ?? -0.3) * rollDistance
    };
  }
  return battedBall.target;
}

function appendBattedBallFeedback(battedBall) {
  return;
}

function getDisplayLaunchAngleDegrees(battedBall) {
  if (Number.isFinite(battedBall?.launchAngleDegrees)) {
    return Math.round(battedBall.launchAngleDegrees);
  }
  if (Number.isFinite(battedBall?.battedProfile?.launchAngle)) {
    return Math.round(clamp(battedBall.battedProfile.launchAngle, -20, 70));
  }
  return Math.round(getBattedBallApproxLaunchAngle(battedBall));
}

function getBattedBallApproxLaunchAngle(battedBall) {
  if (battedBall.isGrounder) return -3;
  if (battedBall.isPopupFly) return 55;
  if (battedBall.isRoutineFly) return 34;
  if (battedBall.isLiner) return 16;
  return 24;
}

function shouldAutoFieldFlyInManualDefense(battedBall) {
  return Boolean(battedBall && battedBall.trajectory === "fly" && !battedBall.isGrounder && !battedBall.isLiner);
}

function createManualFieldingPendingOutcome(automaticOutcome, battedBall) {
  const scoreType = getScoringHitType(automaticOutcome);
  return {
    kind: scoreType || "single",
    label: hitLabels.single,
    scoreType: scoreType || "single",
    caught: false,
    needsThrow: false,
    fieldingTime: Number.POSITIVE_INFINITY,
    pendingManualFielding: true,
    manualFielding: true,
    airOutPossible: !battedBall?.isGrounder
  };
}

function getManualDefenseUnfieldedTarget(battedBall, automaticOutcome = null) {
  if (!battedBall) return defenseField.bases.second;
  const scoreType = getScoringHitType(automaticOutcome) || "single";
  if (battedBall.isGrounder) {
    const target = getDefenseFieldingTarget(battedBall, {
      kind: scoreType,
      label: getHitLabelByScoreType(scoreType),
      scoreType,
      caught: false,
      needsThrow: false
    });
    return getManualUnfieldedGrounderRollTarget(battedBall, target);
  }
  return getDefenseFieldingTarget(battedBall, {
    kind: scoreType,
    label: getHitLabelByScoreType(scoreType),
    scoreType,
    caught: false,
    needsThrow: false
  });
}

function getManualUnfieldedGrounderRollTarget(battedBall, target) {
  const landing = battedBall?.target;
  if (!battedBall || !landing || !target) return target;
  const currentRollDistance = Math.hypot(target.x - landing.x, target.y - landing.y);
  const minRollDistance = isHardGrounder(battedBall)
    ? 980 + clamp((battedBall.power ?? hardGrounderTuning.minPower) - hardGrounderTuning.minPower, 0, 0.7) * 620
    : 520;
  if (currentRollDistance >= minRollDistance) return target;
  const direction = normalize(battedBall.direction || { x: 0, y: -1 });
  return clampPointInsideFence({
    x: landing.x + direction.x * minRollDistance,
    y: landing.y + direction.y * minRollDistance
  }, 12);
}

function getDefensiveLineup(team) {
  const template = defensiveLineups[team];
  const pitcherInfo = getTeamActivePitcher(team);
  const fieldersByRole = new Map(selected[team].batters.map((entry) => [entry.role, entry.player]));
  return template.map((fielder) => {
    const stadiumFielder = outfielderRoles.includes(fielder.role)
      ? { ...fielder, ...outfielderStartPoint(fielder.role) }
      : fielder;
    if (fielder.role === "P") {
      return clampFielderInsideFence({
        ...getPitcherDefenseStartPoint(stadiumFielder),
        name: pitcherInfo.name,
        speed: pitcherInfo.fielding ?? 5,
        fielding: pitcherInfo.fielding ?? 5,
        arm: 5
      });
    }
    const player = applyBenchDefenseRoleAdjustment(fieldersByRole.get(fielder.role) || selected[team].batters[0].player, fielder.role);
    const defenseRating = getBatterDefenseRating(player, fielder.role);
    return clampFielderInsideFence({
      ...stadiumFielder,
      name: player.name,
      speed: defenseRating,
      fielding: defenseRating,
      arm: player.arm ?? 5
    });
  });
}

function getDefenseDuration(battedBall, outcome, runner, throwState, fieldingTarget = null) {
  if (battedBall.fenceOver) return Math.max(isHomeRunVisionField() ? 6400 : 6200, ((battedBall.ballTime ?? 0.7) + 5.4) * 1000);
  const runnerSeconds = runner ? runner.arrivalTime : 0;
  const throwSeconds = throwState
    ? Number.isFinite(throwState.endTime)
      ? throwState.endTime + defenseThrowResultHoldSeconds
      : (throwState.holdDeadline ?? throwState.prepareStartTime + defenseThrowResultHoldSeconds)
    : 0;
  const fieldingSeconds = (outcome.fieldingTime ?? battedBall.ballTime) + (outcome.caught ? defenseThrowResultHoldSeconds : 1.45);
  const rollSeconds = (!outcome.caught || outcome.needsThrow) && fieldingTarget
    ? battedBall.ballTime + getDefenseRollDuration(battedBall, battedBall.target, fieldingTarget) + 0.45
    : 0;
  const maxDuration = throwState?.manualWait ? 16000 : 12500;
  const duration = clamp(Math.max(fieldingSeconds, runnerSeconds, throwSeconds, rollSeconds) * 1000, 1900, maxDuration);
  return isHomeRunVisionField() ? Math.max(6400, duration) : duration;
}

function alignFieldingTimeWithBallArrival(battedBall, outcome, fieldingTarget, fielder = null) {
  if (!outcome?.caught || !battedBall || !fieldingTarget) return outcome;
  const visualArrivalTime = getDefenseBallFieldingArrivalTime(battedBall, fieldingTarget);
  const fielderArrivalTime = getDefenseFielderArrivalTime(fielder, fieldingTarget);
  const fieldingTime = Math.max(outcome.fieldingTime ?? battedBall.ballTime, visualArrivalTime, fielderArrivalTime);
  return fieldingTime === outcome.fieldingTime ? outcome : { ...outcome, fieldingTime };
}

function getDefenseFielderArrivalTime(fielder, fieldingTarget) {
  if (!fielder || !fieldingTarget) return 0;
  const distance = Math.hypot(fieldingTarget.x - fielder.x, fieldingTarget.y - fielder.y);
  return getFielderReactionDelay(fielder) + distance / getFielderSpeed(fielder);
}

function getDefenseBallFieldingArrivalTime(battedBall, fieldingTarget) {
  const landing = battedBall.target;
  const rollDistance = Math.hypot(fieldingTarget.x - landing.x, fieldingTarget.y - landing.y);
  if (rollDistance < 8) return battedBall.ballTime ?? 0;
  return (battedBall.ballTime ?? 0)
    + getDefenseRollDuration(battedBall, landing, fieldingTarget);
}

function createBatterRunner(batterInfo) {
  const start = { ...defenseField.bases.home };
  const destination = { ...defenseField.bases.first };
  const speed = getRunnerSpeed(batterInfo);
  const route = [start, destination];
  const distance = getRunnerRouteDistance(route);
  return {
    ...batterInfo,
    runnerId: batterInfo?.id || batterInfo?.name || "batter",
    start,
    destination,
    route,
    startBase: "batter",
    originalBase: "home",
    currentBase: "home",
    returnBase: "home",
    routeStartTime: 0,
    routeDuration: distance / speed,
    targetBase: "first",
    forceBase: "first",
    forceObligation: true,
    running: true,
    returning: false,
    leftBaseTime: 0,
    reachedBaseTime: null,
    returnedBaseTime: null,
    isOut: false,
    baseLabel: "一塁",
    x: start.x,
    y: start.y,
    speed,
    arrivalTime: distance / speed,
    arrived: false
  };
}

function getBatterRunnerTargetBase(outcome, battedBall = null, fieldingTarget = null, fielder = null, runner = null) {
  if (battedBall?.fenceOver || outcome?.scoreType === "homer") return "home";
  if (battedBall?.groundRuleDouble) return "second";
  if (outcome?.targetBase) return outcome.targetBase;
  // 打者走者は一塁で止める。長打性の当たりでどこまで進むかの自動判断は行わない。
  // 手動走塁では、この先の進塁と帰塁をプレイヤーが指示する。
  return "first";
}

function shouldUseRunnerPositionForOutfieldThrow(outcome, battedBall, fieldingTarget, fielder, runner) {
  if (!outcome || outcome.caught || !battedBall || !fieldingTarget || !fielder || !runner) return false;
  if (battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  return fielder.role !== "P" && isDeepOutfieldBall(battedBall) && (outcome.scoreType || outcome.kind === "single" || outcome.kind === "double");
}

function getFieldingTimeForThrowDecision(outcome, battedBall, fieldingTarget, fielder) {
  return Math.max(
    outcome?.fieldingTime ?? battedBall?.ballTime ?? 0,
    getDefenseBallFieldingArrivalTime(battedBall, fieldingTarget),
    getDefenseFielderArrivalTime(fielder, fieldingTarget)
  );
}

function hasBatterRunnerReachedFirstAtFielding(outcome, battedBall, fieldingTarget, fielder, runner) {
  return getFieldingTimeForThrowDecision(outcome, battedBall, fieldingTarget, fielder) >= runner.arrivalTime;
}

function createThrowPlayForFieldedHit(fielder, battedBall, outcome, fieldingTarget, runner) {
  if (!outcome || outcome.caught || outcome.needsThrow || !runner) return outcome;
  if (outcome.fieldingError) return outcome;
  if (battedBall?.fenceOver || battedBall?.groundRuleDouble) return outcome;
  const isFieldedHit = ["single", "double"].includes(outcome.kind) || scoringHitTypes.has(outcome.scoreType);
  const isInPlayFenceBall = fieldingTarget && isAtOutfieldFence(fieldingTarget);
  if (!isFieldedHit && !(fielder.role !== "P" && (isDeepOutfieldBall(battedBall) || isInPlayFenceBall))) return outcome;
  return {
    ...outcome,
    kind: "force",
    label: `${fielder.role} 送球`,
    caught: true,
    needsThrow: true,
    fieldingTime: Math.max(
      outcome.fieldingTime ?? battedBall?.ballTime ?? 0,
      getDefenseBallFieldingArrivalTime(battedBall, fieldingTarget),
      getDefenseFielderArrivalTime(fielder, fieldingTarget)
    )
  };
}

function getInitialDefenseThrowTargetBase(outcome, battedBall, runner, options = {}) {
  if (!outcome?.needsThrow) return runner?.targetBase || outcome?.targetBase || "first";
  if (options.autoFallback) {
    const autoTarget = getAutomaticForceThrowTargetBase(outcome, battedBall, runner, options);
    if (autoTarget) return autoTarget;
    return runner?.targetBase || outcome.targetBase || "first";
  }
  const forceTargetBase = getLeadForceThrowTargetBase(outcome, battedBall);
  if (forceTargetBase) return forceTargetBase;
  return runner?.targetBase || outcome.targetBase || "first";
}

// CPUが狙える塁の候補。封殺の対象だけでなく、封じられていない進塁中の走者も含める。
// 封殺だけを見ていると、余分な塁を狙う走者を無視して一塁へ投げてしまう。
function getCpuThrowTargetCandidates(outcome, battedBall, batterRunner, baseRunners) {
  const candidates = new Map();
  const forceTargets = createForceTargetsForPlay(battedBall, outcome);
  forceTargets
    .filter((entry) => isForceTargetEntryActive(entry, forceTargets, []))
    .forEach((entry) => {
      const runnerArrival = getForceTargetRunnerArrival(entry, batterRunner, baseRunners);
      if (!Number.isFinite(runnerArrival)) return;
      candidates.set(entry.targetBase, { targetBase: entry.targetBase, runnerArrival });
    });

  [...(baseRunners || []), batterRunner].forEach((entry) => {
    if (!entry || entry.isOut || entry.arrived) return;
    const targetBase = entry.manualTargetBase || entry.targetBase;
    const targetIndex = getBatterRunnerTargetIndex(targetBase);
    if (targetIndex < 1 || targetIndex > 4 || !Number.isFinite(entry.arrivalTime)) return;
    const existing = candidates.get(targetBase);
    // 同じ塁を複数が狙うなら、先に着く走者に間に合わせる必要がある
    if (!existing || entry.arrivalTime < existing.runnerArrival) {
      candidates.set(targetBase, { targetBase, runnerArrival: entry.arrivalTime });
    }
  });

  return [...candidates.values()]
    .sort((a, b) => getForceTargetBaseIndex(b.targetBase) - getForceTargetBaseIndex(a.targetBase));
}

// 本塁 → 三塁 → 二塁 → 一塁 の順に見て、送球が間に合う一番先の塁へ投げる。
// どこも間に合わなければ一塁で確実なアウトを取り、それも無理なら
// 一番先の塁へ投げて進塁を止める。
function getAutomaticForceThrowTargetBase(outcome, battedBall, runner, options = {}) {
  if (!outcome?.needsThrow || outcome.kind !== "force") return null;
  if (!isForceEligibleBattedBall(battedBall, outcome)) return null;
  const evaluations = getCpuThrowTargetCandidates(outcome, battedBall, runner, options.baseRunners)
    .map((candidate) => {
      const throwArrival = estimateAutoThrowArrivalToBase(candidate.targetBase, outcome, options);
      const margin = Number.isFinite(throwArrival)
        ? candidate.runnerArrival - throwArrival
        : Number.NEGATIVE_INFINITY;
      return { ...candidate, throwArrival, margin };
    });
  if (!evaluations.length) return null;

  const reachable = evaluations.find((entry) => entry.margin >= getCpuLeadForceThrowRequiredMargin(entry.targetBase));
  if (reachable) return reachable.targetBase;

  // 余裕はなくても一塁で打者をアウトにできるなら、確実な1つを取る
  const firstTarget = evaluations.find((entry) => entry.targetBase === "first");
  if (firstTarget && firstTarget.margin >= 0) return "first";

  return evaluations[0].targetBase;
}

// 送球先ごとに必要な余裕 (秒)。先の塁ほど失敗したときの損が大きいので少しだけ厳しくする。
function getCpuLeadForceThrowRequiredMargin(targetBase) {
  if (targetBase === "home") return 0.1;
  if (targetBase === "third") return 0.08;
  if (targetBase === "second") return 0.06;
  return 0.02;
}

function getForceTargetRunnerArrival(forceTarget, batterRunner = null, baseRunners = null) {
  if (!forceTarget) return null;
  if (forceTarget.startBase === "batter") return batterRunner?.arrivalTime ?? null;
  const runner = (baseRunners || []).find((entry) => entry.startBase === forceTarget.startBase && entry.targetBase === forceTarget.targetBase)
    || createForcedRunnerFromInfo(forceTarget.runnerInfo, forceTarget.startBase, forceTarget.targetBase);
  return runner?.arrivalTime ?? null;
}

function estimateAutoThrowArrivalToBase(targetBase, outcome, options = {}) {
  const fielder = options.fielder;
  const fieldingTarget = options.fieldingTarget;
  if (!targetBase || !fielder || !fieldingTarget) return null;
  const destination = getDefenseBasePointByName(targetBase);
  const distance = Math.hypot(destination.x - fieldingTarget.x, destination.y - fieldingTarget.y);
  const prepareStartTime = Math.max(outcome.fieldingTime ?? 0, options.minStartTime ?? 0);
  return prepareStartTime + getAutoThrowSetSeconds(fielder) + getThrowProfile(fielder, distance, {
    targetBase,
    from: fieldingTarget
  }).throwTime;
}

function getLeadForceThrowTargetBase(outcome, battedBall) {
  if (!outcome?.needsThrow || outcome.kind !== "force") return null;
  if (!isForceEligibleBattedBall(battedBall, outcome)) return null;
  const activeTargets = createForceTargetsForPlay(battedBall, outcome)
    .filter((entry) => isForceTargetEntryActive(entry, createForceTargetsForPlay(battedBall, outcome), []));
  if (activeTargets.some((entry) => entry.targetBase === "home")) return "home";
  if (activeTargets.some((entry) => entry.targetBase === "third")) return "third";
  if (activeTargets.some((entry) => entry.targetBase === "second")) return "second";
  return null;
}

function isForceEligibleBattedBall(battedBall, outcome = null) {
  if (!battedBall) return outcome?.kind === "force";
  if (battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  if (outcome?.caught && !outcome?.needsThrow) return false;
  return true;
}

function isAtOutfieldFence(point, tolerance = outfieldFenceFieldingInset + 4) {
  return point && point.y < getFenceCenter().y && getFenceDistance(point) >= defenseField.fenceDistance - tolerance;
}

function setBatterRunnerDestination(runner, targetBase) {
  if (!runner) return;
  const route = createBatterRunnerRoute(runner, targetBase);
  const destination = { ...route[route.length - 1] };
  const routeStartTime = runner.routeStartTime ?? 0;
  const routeDuration = getRunnerRouteDistance(route) / runner.speed;
  runner.start = { ...route[0] };
  runner.destination = destination;
  runner.route = route;
  runner.targetBase = targetBase;
  runner.baseLabel = getBaseLabel(targetBase);
  runner.routeStartTime = routeStartTime;
  runner.routeDuration = routeDuration;
  runner.arrivalTime = routeStartTime + routeDuration;
  runner.arrived = false;
}

function createBatterRunnerRoute(runner, targetBase) {
  const targetIndex = getBatterRunnerTargetIndex(targetBase);
  const currentBase = runner.currentBase ?? "home";
  const touchedIndex = getBatterRunnerTouchedBaseIndex(runner);
  const physicalIndex = getBatterRunnerPhysicalBaseIndex(runner);
  const atHomeStart = currentBase === "home"
    && Math.hypot((runner.x ?? defenseField.bases.home.x) - defenseField.bases.home.x, (runner.y ?? defenseField.bases.home.y) - defenseField.bases.home.y) < 1;
  if (atHomeStart && targetIndex > 0) {
    return createBaseRunnerRoute(0, targetIndex);
  }
  if ((runner.arrived || runner.routeStartTime === undefined) && touchedIndex >= 0 && targetIndex > touchedIndex) {
    return createBaseRunnerRoute(touchedIndex, targetIndex);
  }
  if (!runner.arrived && targetIndex > touchedIndex) {
    const route = [{ x: runner.x, y: runner.y }];
    for (let base = Math.max(1, touchedIndex + 1); base <= targetIndex; base += 1) {
      route.push({ ...getDefenseBasePoint(base) });
    }
    return route;
  }
  if (!runner.arrived && targetIndex < physicalIndex) {
    const route = [{ x: runner.x, y: runner.y }];
    for (let base = physicalIndex; base >= targetIndex; base -= 1) {
      route.push({ ...getDefenseBasePoint(base) });
    }
    return route;
  }
  return [{ x: runner.x, y: runner.y }, getDefenseBasePointByName(targetBase)];
}

function getBatterRunnerPhysicalBaseIndex(runner) {
  if (!runner) return 0;
  if (runner.arrived) return getBatterRunnerTargetIndex(runner.targetBase ?? runner.currentBase ?? "home");
  const points = [defenseField.bases.home, defenseField.bases.first, defenseField.bases.second, defenseField.bases.third];
  let closestIndex = getRunnerBaseIndex(runner.currentBase ?? "home");
  let closestDistance = Number.POSITIVE_INFINITY;
  points.forEach((point, index) => {
    const distance = Math.hypot((runner.x ?? point.x) - point.x, (runner.y ?? point.y) - point.y);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });
  return closestIndex;
}

function getBatterRunnerTouchedBaseIndex(runner) {
  if (!runner) return 0;
  if (runner.arrived) return getBatterRunnerTargetIndex(runner.targetBase ?? runner.currentBase ?? "home");
  return getRunnerBaseIndex(runner.currentBase ?? "home");
}

function getRunnerBaseIndex(baseName) {
  return baseIndexByName[baseName] ?? (baseName === "home" ? 0 : -1);
}

function getBatterRunnerTargetIndex(baseName) {
  return baseName === "home" ? 4 : getRunnerBaseIndex(baseName);
}

function getDefenseBasePointByName(baseName) {
  return { ...(defenseField.bases[baseName] || defenseField.bases.first) };
}

function getBaseLabel(baseName) {
  return baseName === "home" ? "本塁" : baseName === "third" ? "三塁" : baseName === "second" ? "二塁" : "一塁";
}

function getForceTargetBaseIndex(baseName) {
  return baseName === "home" ? 4 : getRunnerBaseIndex(baseName);
}

function getNextBatterRunnerBase(baseName) {
  return baseName === "first" ? "second" : baseName === "second" ? "third" : baseName === "third" ? "home" : null;
}

function getPreviousBatterRunnerBase(baseName) {
  return baseName === "home" ? "third" : baseName === "third" ? "second" : baseName === "second" ? "first" : baseName === "first" ? "home" : null;
}

function setBatterRunnerManualDestination(runner, targetBase, elapsedSeconds, mode = "advance") {
  if (!runner || !targetBase) return;
  if (!canBatterRunnerTargetBase(runner, targetBase, mode)) return;
  runner.currentBase = runner.arrived ? runner.targetBase : runner.currentBase;
  runner.returnBase = runner.arrived ? runner.currentBase : runner.returnBase;
  runner.arrived = false;
  runner.routeStartTime = elapsedSeconds;
  runner.route = createBatterRunnerRoute(runner, targetBase);
  runner.destination = { ...runner.route[runner.route.length - 1] };
  runner.targetBase = targetBase;
  runner.baseLabel = getBaseLabel(targetBase);
  runner.routeDuration = getRunnerRouteDistance(runner.route) / runner.speed;
  runner.arrivalTime = elapsedSeconds + runner.routeDuration;
  runner.manualControlled = true;
}

function canBatterRunnerTargetBase(runner, targetBase, mode = "advance") {
  if (!runner || !targetBase) return false;
  const targetIndex = getBatterRunnerTargetIndex(targetBase);
  const currentIndex = getRunnerBaseIndex(runner.currentBase ?? "home");
  if (mode === "return") {
    if (currentIndex <= 0) return false;
    const returnIndex = getRunnerBaseIndex(targetBase);
    return !runner.arrived
      && returnIndex === currentIndex
      && getBatterRunnerTargetIndex(runner.targetBase) === currentIndex + 1;
  }
  return runner.arrived && targetIndex === currentIndex + 1;
}

function getSequentialBatterRunnerTargetBase(runner, requestedBase, mode = "advance") {
  if (!runner) return null;
  const currentIndex = getRunnerBaseIndex(runner.currentBase ?? "home");
  if (mode === "return") {
    if (runner.arrived) return null;
    const targetIndex = getBatterRunnerTargetIndex(runner.targetBase);
    if (targetIndex !== currentIndex + 1) return null;
    return baseNameByIndex[currentIndex] || "home";
  }
  const requestedIndex = getBatterRunnerTargetIndex(requestedBase);
  const nextIndex = currentIndex + 1;
  if (requestedIndex !== nextIndex) return null;
  return nextIndex >= 4 ? "home" : baseNameByIndex[nextIndex];
}

function handleBatterRunnerBaseCommand(targetBase, mode = "advance") {
  mode = normalizeManualRunnerCommandMode(mode);
  if (!mode) return;
  if (!canControlBatterRunner()) return;
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  updateBatterRunner(elapsedSeconds);
  const runner = defenseState.runner;
  const legalTargetBase = getSequentialBatterRunnerTargetBase(runner, targetBase, mode);
  if (!canBatterRunnerTargetBase(runner, legalTargetBase, mode)) {
    if (handleManualBaseRunnerCommandToTarget(targetBase, mode, elapsedSeconds)) {
      retargetCpuDefenseThrowToAdvancingRunner(elapsedSeconds);
      refreshDefenseThrowSafety();
    }
    return;
  }
  setBatterRunnerManualDestination(runner, legalTargetBase, elapsedSeconds, mode);
  if (mode === "advance") advanceForcedBaseRunnersForBatterTarget(legalTargetBase, elapsedSeconds);
  retargetCpuDefenseThrowToAdvancingRunner(elapsedSeconds);
  refreshDefenseThrowSafety();
  message = mode === "return" ? `${getBaseLabel(legalTargetBase)}へ帰塁指示` : `${getBaseLabel(legalTargetBase)}へ走塁指示`;
}

function handleManualBaseRunnerCommandToTarget(targetBase, mode, elapsedSeconds) {
  mode = normalizeManualRunnerCommandMode(mode);
  if (!mode) return false;
  const targetIndex = getBatterRunnerTargetIndex(targetBase);
  if (targetIndex < 1 || targetIndex > 4) return false;
  const runner = getManualBaseRunnerForTarget(targetIndex, mode, elapsedSeconds);
  if (!runner) return false;
  if (mode === "return") {
    setDefenseBaseRunnerReturnDestination(runner, targetIndex, elapsedSeconds);
  } else {
    setDefenseBaseRunnerManualDestination(runner, targetIndex, elapsedSeconds);
  }
  message = mode === "return" ? `${getBaseLabel(targetBase)}へ帰塁指示` : `${getBaseLabel(targetBase)}へ走塁指示`;
  return true;
}

function getManualBaseRunnerForTarget(targetIndex, mode, elapsedSeconds) {
  mode = normalizeManualRunnerCommandMode(mode);
  if (!mode) return null;
  if (!defenseState.baseRunners?.length) return null;
  const startIndex = mode === "return" ? targetIndex : targetIndex - 1;
  const candidates = defenseState.baseRunners.filter((runner) => {
    updateDefenseBaseRunnerPosition(runner, elapsedSeconds);
    if (mode === "return") {
      return isDefenseBaseRunnerReturningToBase(runner, targetIndex);
    }
    return isDefenseBaseRunnerStoppedOnBase(runner, startIndex);
  });
  return candidates[0] || null;
}

function normalizeManualRunnerCommandMode(mode) {
  return mode === "return" || mode === "advance" ? mode : null;
}

function getBatterRunnerNoPassTargetBase(targetBase, elapsedSeconds) {
  const targetIndex = getBatterRunnerTargetIndex(targetBase);
  const runner = defenseState.runner;
  if (!runner || targetIndex <= 1 || !defenseState.baseRunners?.length) return targetBase;
  const batterCurrentIndex = getBatterRunnerTouchedBaseIndex(runner);
  let allowedIndex = targetIndex;
  defenseState.baseRunners.forEach((baseRunner) => {
    updateDefenseBaseRunnerPosition(baseRunner, elapsedSeconds);
    const startIndex = getRunnerBaseIndex(baseRunner.startBase);
    const targetRunnerIndex = getBatterRunnerTargetIndex(baseRunner.targetBase ?? baseRunner.startBase);
    const leaderIndex = Math.max(startIndex, targetRunnerIndex);
    if (leaderIndex > batterCurrentIndex && leaderIndex <= allowedIndex) {
      allowedIndex = targetIndex === leaderIndex
        ? allowedIndex
        : Math.max(1, leaderIndex);
    }
  });
  return baseNameByIndex[allowedIndex] || "first";
}

function advanceForcedBaseRunnersForBatterTarget(targetBase, elapsedSeconds) {
  if (!defenseState.baseRunners?.length) return;
  const targetIndex = getBatterRunnerTargetIndex(targetBase);
  if (targetIndex < 2) return;
  for (let base = 3; base >= targetIndex; base -= 1) {
    const runner = defenseState.baseRunners.find((entry) => isDefenseBaseRunnerStoppedOnBase(entry, base));
    if (!runner) continue;
    updateDefenseBaseRunnerPosition(runner, elapsedSeconds);
    setDefenseBaseRunnerManualDestination(runner, Math.min(4, base + 1), elapsedSeconds);
  }
}

function handleAllRunnerBaseCommand(mode = "advance") {
  if (!canControlBatterRunner()) return;
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  updateBatterRunner(elapsedSeconds);
  if (mode === "advance") {
    advanceBatterRunnerOneBase(elapsedSeconds);
    advanceAllBaseRunnersOneBase(elapsedSeconds);
    message = "全走者進塁指示";
  } else {
    returnBatterRunnerOneBase(elapsedSeconds);
    returnAllBaseRunnersOneBase(elapsedSeconds);
    message = "全走者帰塁指示";
  }
  retargetCpuDefenseThrowToAdvancingRunner(elapsedSeconds);
  refreshDefenseThrowSafety();
}

function advanceBatterRunnerOneBase(elapsedSeconds) {
  const runner = defenseState.runner;
  if (!runner) return;
  const currentIndex = getRunnerBaseIndex(runner.currentBase ?? "home");
  const nextIndex = currentIndex + 1;
  if (nextIndex > 4) return;
  const targetBase = nextIndex >= 4 ? "home" : baseNameByIndex[nextIndex];
  if (!canBatterRunnerTargetBase(runner, targetBase, "advance")) return;
  setBatterRunnerManualDestination(runner, targetBase, elapsedSeconds);
}

function returnBatterRunnerOneBase(elapsedSeconds) {
  const runner = defenseState.runner;
  if (!runner) return;
  if (getRunnerBaseIndex(runner.currentBase ?? "home") <= 0) return;
  const targetBase = runner.currentBase ?? "home";
  if (!canBatterRunnerTargetBase(runner, targetBase, "return")) return;
  setBatterRunnerManualDestination(runner, targetBase, elapsedSeconds);
}

function advanceAllBaseRunnersOneBase(elapsedSeconds) {
  if (!defenseState.baseRunners?.length) return;
  for (let base = 3; base >= 1; base -= 1) {
    const runner = getBaseRunnerAtOrHeadingFromBase(base);
    if (!runner) continue;
    updateDefenseBaseRunnerPosition(runner, elapsedSeconds);
    const currentIndex = getDefenseBaseRunnerCurrentIndex(runner);
    if (currentIndex < 1 || currentIndex >= 4) continue;
    if (!canDefenseBaseRunnerAdvance(runner, currentIndex)) continue;
    setDefenseBaseRunnerManualDestination(runner, currentIndex + 1, elapsedSeconds);
  }
}

function returnAllBaseRunnersOneBase(elapsedSeconds) {
  if (!defenseState.baseRunners?.length) return;
  defenseState.baseRunners.forEach((runner) => {
    updateDefenseBaseRunnerPosition(runner, elapsedSeconds);
    const currentIndex = getDefenseBaseRunnerCurrentIndex(runner);
    const targetIndex = getBatterRunnerTargetIndex(runner.targetBase);
    if (currentIndex <= 0) return;
    if (runner.arrived || targetIndex !== currentIndex + 1) return;
    setDefenseBaseRunnerReturnDestination(runner, currentIndex, elapsedSeconds);
  });
}

function getBaseRunnerAtOrHeadingFromBase(baseIndex) {
  return defenseState.baseRunners?.find((runner) => {
    return isDefenseBaseRunnerStoppedOnBase(runner, baseIndex);
  }) || null;
}

// startBase はプレー開始時の塁 (封殺や走者の同定に使う) なので動かさない。
// いま踏んでいる塁は currentBase が持つ。手動指示の判定はこちらを見る。
function getDefenseBaseRunnerCurrentIndex(runner) {
  if (!runner) return -1;
  return getRunnerBaseIndex(runner.currentBase ?? runner.startBase);
}

function canDefenseBaseRunnerAdvance(runner, currentIndex) {
  if (!isDefenseBaseRunnerStoppedOnBase(runner, currentIndex)) return false;
  const targetIndex = currentIndex + 1;
  if (targetIndex > 4) return false;
  return getRunnerBaseIndex(runner.targetBase ?? runner.startBase) === currentIndex;
}

function isDefenseBaseRunnerStoppedOnBase(runner, baseIndex) {
  if (!runner || !runner.arrived || baseIndex < 1 || baseIndex > 3) return false;
  return getDefenseBaseRunnerCurrentIndex(runner) === baseIndex;
}

function isDefenseBaseRunnerReturningToBase(runner, returnBaseIndex) {
  if (!runner || runner.arrived || returnBaseIndex < 1 || returnBaseIndex > 3) return false;
  const headingIndex = getBatterRunnerTargetIndex(runner.targetBase);
  return getDefenseBaseRunnerCurrentIndex(runner) === returnBaseIndex && headingIndex === returnBaseIndex + 1;
}

function updateDefenseBaseRunnerPosition(runner, elapsedSeconds) {
  if (!runner?.route || runner.arrivalTime <= 0) return;
  if (runner.arrived) return;
  const routeStartTime = runner.routeStartTime ?? 0;
  const routeDuration = runner.routeDuration ?? runner.arrivalTime;
  const progress = routeDuration > 0 ? clamp((elapsedSeconds - routeStartTime) / routeDuration, 0, 1) : 1;
  const point = getRunnerRoutePoint(runner.route, progress);
  runner.x = point.x;
  runner.y = point.y;
  runner.arrived = progress >= 1;
  if (runner.arrived) {
    runner.currentBase = runner.targetBase || runner.currentBase || runner.startBase;
  }
}

function setDefenseBaseRunnerManualDestination(runner, nextBase, elapsedSeconds) {
  const targetBase = nextBase >= 4 ? "home" : baseNameByIndex[nextBase];
  runner.routeStartTime = elapsedSeconds;
  runner.route = [{ x: runner.x, y: runner.y }, { ...getDefenseBasePoint(nextBase) }];
  runner.targetBase = targetBase;
  runner.manualTargetBase = targetBase;
  if (defenseState.outcome?.kind === "out" && defenseState.outcome.caught) {
    runner.tagUp = true;
  }
  runner.scored = nextBase >= 4;
  runner.routeDuration = getRunnerRouteDistance(runner.route) / runner.speed;
  runner.arrivalTime = elapsedSeconds + runner.routeDuration;
  runner.arrived = false;
}

function setDefenseBaseRunnerReturnDestination(runner, baseIndex, elapsedSeconds) {
  const targetBase = baseNameByIndex[baseIndex];
  if (!targetBase) return;
  runner.routeStartTime = elapsedSeconds;
  runner.route = [{ x: runner.x, y: runner.y }, { ...getDefenseBasePoint(baseIndex) }];
  runner.targetBase = targetBase;
  runner.manualTargetBase = targetBase;
  runner.scored = false;
  runner.routeDuration = getRunnerRouteDistance(runner.route) / runner.speed;
  runner.arrivalTime = elapsedSeconds + runner.routeDuration;
  runner.arrived = false;
}

function canControlBatterRunner() {
  return gamePhase === "defense"
    && isPlayerBatting()
    && defenseState.active
    && !defenseState.resolved
    && defenseState.runner
    && !defenseState.battedBall?.fenceOver;
}

function retargetDefenseThrowToBatterRunner(elapsedSeconds = 0) {
  const runner = defenseState.runner;
  if (!runner || !defenseState.chosenFielder || !defenseState.target || defenseState.outcome?.kind === "homer") return;
  if (defenseState.throw?.targetBase === runner.targetBase && Number.isFinite(defenseState.throw.endTime)) {
    defenseState.outcome = {
      ...(defenseState.outcome || {}),
      kind: "force",
      label: `${getBaseLabel(runner.targetBase)}送球`,
      caught: true,
      needsThrow: true
    };
    if (shouldJudgeBatterRunnerAtThrowTarget(defenseState.throw, runner)) {
      defenseState.throw.safe = !isBatterRunnerOutAtThrowTarget(defenseState.throw, runner);
    } else {
      refreshDefenseThrowSafety();
    }
    defenseState.duration = getDefenseDuration(defenseState.battedBall, defenseState.outcome, runner, defenseState.throw, defenseState.target);
    if (elapsedSeconds * 1000 > defenseState.duration - 400) {
      defenseState.duration = elapsedSeconds * 1000 + 1200;
    }
    return;
  }
  const heldBase = getThrowHeldBaseAtTime(defenseState.throw, elapsedSeconds);
  if (heldBase) {
    defenseState.heldBallBase = heldBase;
    defenseState.heldBallSince = defenseState.throw.endTime;
  }
  const baseHoldingBall = defenseState.heldBallBase;
  if (baseHoldingBall) {
    defenseState.outcome = {
      ...(defenseState.outcome || {}),
      kind: "force",
      label: `${getBaseLabel(baseHoldingBall)}返球済み`,
      caught: true,
      needsThrow: true
    };
    if (runner.targetBase === baseHoldingBall && defenseState.throw && shouldJudgeBatterRunnerAtThrowTarget(defenseState.throw, runner)) {
      defenseState.throw.safe = !isBatterRunnerOutAtThrowTarget(defenseState.throw, runner);
    }
    if (defenseState.throw) defenseState.throw.holdDeadline = Math.max(
      defenseState.throw.holdDeadline ?? elapsedSeconds,
      (runner.arrivalTime ?? elapsedSeconds) + defenseThrowResultHoldSeconds
    );
    defenseState.duration = getDefenseDuration(defenseState.battedBall, defenseState.outcome, runner, defenseState.throw, defenseState.target);
    if (elapsedSeconds * 1000 > defenseState.duration - 400) {
      defenseState.duration = elapsedSeconds * 1000 + 1200;
    }
    return;
  }
  defenseState.outcome = {
    ...(defenseState.outcome || {}),
    kind: "force",
    label: `${defenseState.chosenFielder.role} 送球`,
    caught: true,
    needsThrow: true,
    fieldingTime: Math.max(
      defenseState.outcome?.fieldingTime ?? defenseState.battedBall?.ballTime ?? 0,
      getDefenseBallFieldingArrivalTime(defenseState.battedBall, defenseState.target),
      getDefenseFielderArrivalTime(defenseState.chosenFielder, defenseState.target)
    )
  };
  defenseState.throw = createThrowState(defenseState.chosenFielder, defenseState.target, defenseState.outcome, runner, {
    manualWait: isManualThrowControl(),
    minStartTime: getFieldingTimeForThrowDecision(
      defenseState.outcome,
      defenseState.battedBall,
      defenseState.target,
      defenseState.chosenFielder
    )
  });
  defenseState.duration = getDefenseDuration(defenseState.battedBall, defenseState.outcome, runner, defenseState.throw, defenseState.target);
  if (elapsedSeconds * 1000 > defenseState.duration - 400) {
    defenseState.duration = elapsedSeconds * 1000 + 1200;
  }
}

function shouldJudgeBatterRunnerAtThrowTarget(throwState, runner) {
  if (!throwState || !runner || throwState.targetBase !== runner.targetBase) return false;
  if (isBatterRunnerAlreadySafeAtThrowTarget(throwState, runner)) return true;
  const forcedRunner = getForcedRunnerForThrowTarget(throwState.targetBase, runner, defenseState.baseRunners);
  return !forcedRunner || forcedRunner === runner || getForcedRunnerStartBaseForTarget(throwState.targetBase) === "batter";
}

function getThrowHeldBaseAtTime(throwState, elapsedSeconds) {
  if (!throwState || !throwState.targetBase || !Number.isFinite(throwState.endTime)) return null;
  return elapsedSeconds >= throwState.endTime ? throwState.targetBase : null;
}

function handleDefenseThrowCommand(targetBase, options = {}) {
  if (!canManualDefenseThrow(targetBase)) return;
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  updateBatterRunner(elapsedSeconds);
  updateDefenseBaseRunners(elapsedSeconds);
  const previousThrow = defenseState.throw;
  const isTagUpThrow = isManualTagUpThrowOpportunity(targetBase, elapsedSeconds);
  const isBaseRelay = previousThrow && Number.isFinite(previousThrow.endTime) && elapsedSeconds >= previousThrow.endTime;
  const from = isBaseRelay ? previousThrow.to : defenseState.target;
  const commandStartTime = isBaseRelay
    ? elapsedSeconds
    : Math.max(elapsedSeconds, previousThrow?.prepareStartTime ?? elapsedSeconds);
  const thrower = isBaseRelay
    ? { ...(defenseState.chosenFielder || {}), arm: 5, fielding: 5 }
    : defenseState.chosenFielder;
  // 捕球アウト後など needsThrow が立たない場面でも送球状態を作れるようにする
  const throwOutcome = { ...(defenseState.outcome || {}), caught: true, needsThrow: true };
  const throwRunner = isTagUpThrow
    ? getLeadTagUpRunnerForTarget(targetBase) || defenseState.runner
    : defenseState.runner;
  defenseState.throw = createThrowState(thrower, from, throwOutcome, throwRunner, {
    targetBase,
    immediate: true,
    startTime: commandStartTime,
    minStartTime: commandStartTime,
    baseRunners: defenseState.baseRunners,
    throwTimeMultiplier: options.throwTimeMultiplier ?? 1,
    throwArcMultiplier: options.throwArcMultiplier ?? 1,
    throwTimingSuccess: Boolean(options.throwTimingSuccess),
    tagUpPlay: isTagUpThrow,
    throwTimingLabel: options.throwTimingSuccess ? "ナイス送球" : options.throwTimingLabel || ""
  });
  if (isForceThrowTargetBase(targetBase, defenseState.outcome, defenseState.battedBall)) {
    defenseState.outcome = {
      ...(defenseState.outcome || {}),
      kind: "force",
      caught: true,
      needsThrow: true
    };
    refreshDefenseThrowSafety();
  }
  defenseState.heldBallBase = null;
  defenseState.heldBallSince = null;
  defenseState.lastManualThrowCommandTime = elapsedSeconds;
  defenseState.duration = getDefenseDuration(defenseState.battedBall, defenseState.outcome, defenseState.runner, defenseState.throw, defenseState.target);
  if (elapsedSeconds * 1000 > defenseState.duration - 400) {
    defenseState.duration = elapsedSeconds * 1000 + 1200;
  }
  message = `${getBaseLabel(targetBase)}へ送球指示`;
  if (options.throwTimingSuccess) {
    message = `${getBaseLabel(targetBase)}へナイス送球`;
  } else if (options.throwTimingLabel) {
    message = `${getBaseLabel(targetBase)}へ${options.throwTimingLabel}`;
  }
}

// 野手がボールを保持していれば、攻撃側が進塁していなくても任意の塁へ投げられる。
// 送球が飛んでいる間だけは受け付けない (多重送球の防止)。
function canManualDefenseThrow(targetBase) {
  if (gamePhase !== "defense" || !isManualThrowControl() || !defenseState.active || defenseState.resolved) return false;
  if (!targetBase) return false;
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  // 捕球前でも、捕球の瞬間に投げる指示は先出しできる
  if (defenseState.throw?.manualWait) return true;
  if (!hasFielderSecuredBall(elapsedSeconds)) return false;
  return !isManualThrowInFlight(elapsedSeconds);
}

function hasFielderSecuredBall(elapsedSeconds) {
  const outcome = defenseState.outcome;
  if (!outcome || outcome.pendingManualFielding) return false;
  if (!defenseState.chosenFielder || !defenseState.target) return false;
  const secureTime = outcome.fieldingTime ?? defenseState.battedBall?.ballTime;
  return Number.isFinite(secureTime) && elapsedSeconds >= secureTime;
}

function isManualThrowInFlight(elapsedSeconds) {
  const throwState = defenseState.throw;
  if (!throwState || throwState.visualOnly) return false;
  if (!Number.isFinite(throwState.startTime) || !Number.isFinite(throwState.endTime)) return false;
  return elapsedSeconds >= throwState.startTime && elapsedSeconds < throwState.endTime;
}

// 送球中、または次の送球指示を待っている間は true。
// この間はプレーを終わらせない。
function isManualThrowDecisionPending(elapsedSeconds) {
  if (!isManualThrowControl()) return false;
  if (isManualThrowInFlight(elapsedSeconds)) return true;
  const idleDeadline = getManualThrowIdleDeadline();
  return Number.isFinite(idleDeadline) && elapsedSeconds < idleDeadline;
}

// 捕球や送球到達から一定時間なにも指示がなければ、次のプレーへ進む。
function getManualThrowIdleDeadline() {
  if (!isManualThrowControl()) return null;
  const outcome = defenseState.outcome;
  if (!outcome) return null;
  const secureTime = outcome.fieldingTime ?? defenseState.battedBall?.ballTime ?? 0;
  const marks = [secureTime];
  if (Number.isFinite(defenseState.throw?.endTime)) marks.push(defenseState.throw.endTime);
  if (Number.isFinite(defenseState.lastManualThrowCommandTime)) marks.push(defenseState.lastManualThrowCommandTime);
  return Math.max(...marks) + manualThrowIdleSeconds;
}

function getRunnerRouteDistance(route) {
  return route.slice(1).reduce((total, point, index) => {
    const previous = route[index];
    return total + Math.hypot(point.x - previous.x, point.y - previous.y);
  }, 0);
}

function createThrowState(fielder, fieldingTarget, outcome, runner, options = {}) {
  if (!outcome.needsThrow) return null;
  const targetBase = options.targetBase || runner?.targetBase || outcome.targetBase || "first";
  const playType = isForceThrowTargetBase(targetBase, outcome, defenseState.battedBall) ? "force" : "tag";
  const destination = getDefenseBasePointByName(targetBase);
  const distance = Math.hypot(destination.x - fieldingTarget.x, destination.y - fieldingTarget.y);
  const throwProfile = getThrowProfile(fielder, distance, {
    targetBase,
    from: fieldingTarget
  });
  const prepareStartTime = Math.max(options.prepareStartTime ?? outcome.fieldingTime, options.minStartTime ?? 0);
  const fieldingTime = options.immediate
    ? (options.startTime ?? prepareStartTime)
    : options.manualWait
      ? Number.POSITIVE_INFINITY
      : prepareStartTime + getAutoThrowSetSeconds(fielder);
  const throwTime = throwProfile.throwTime * (options.throwTimeMultiplier ?? 1);
  const throwArrivalTime = fieldingTime + throwTime;
  const holdDeadline = Number.isFinite(throwArrivalTime)
    ? throwArrivalTime + defenseThrowResultHoldSeconds
    : options.manualWait
      ? prepareStartTime + 15
      : prepareStartTime + defenseThrowResultHoldSeconds;
  return {
    active: false,
    from: { ...fieldingTarget },
    to: { ...destination },
    prepareStartTime,
    startTime: fieldingTime,
    endTime: fieldingTime + throwTime,
    playType,
    baseTouchTime: playType === "force" ? fieldingTime + throwTime : null,
    tagTime: playType === "tag" ? fieldingTime + throwTime : null,
    holdDeadline,
    manualWait: Boolean(options.manualWait),
    tagUpPlay: Boolean(options.tagUpPlay),
    throwTime,
    throwTimingLabel: options.throwTimingLabel || "",
    throwTimingSuccess: Boolean(options.throwTimingSuccess),
    arcHeight: throwProfile.arcHeight * (options.throwArcMultiplier ?? 1),
    bounce: throwProfile.bounce,
    baseLabel: getBaseLabel(targetBase),
    targetBase,
    safe: Number.isFinite(throwArrivalTime) ? isDefenseThrowSafeAtBase(targetBase, throwArrivalTime, runner, options.baseRunners, outcome) : true
  };
}

function getLeadTagUpRunnerForTarget(targetBase = null, baseRunners = defenseState.baseRunners) {
  return (baseRunners || [])
    .filter((runner) => runner?.tagUp && runner.targetBase && runner.targetBase !== runner.startBase)
    .filter((runner) => !targetBase || runner.targetBase === targetBase)
    .sort((a, b) => getRunnerBaseIndex(b.targetBase) - getRunnerBaseIndex(a.targetBase))[0] || null;
}

function isManualTagUpThrowOpportunity(targetBase, elapsedSeconds = (performance.now() - defenseState.startTime) / 1000) {
  if (!targetBase || !isManualThrowControl() || gamePhase !== "defense" || !defenseState.active || defenseState.resolved) return false;
  const outcome = defenseState.outcome;
  if (outcome?.kind !== "out" || !outcome.caught || outcome.needsThrow) return false;
  if (!defenseState.chosenFielder || !defenseState.target) return false;
  const tagRunner = getLeadTagUpRunnerForTarget(targetBase);
  if (!tagRunner || tagRunner.isOut) return false;
  const catchTime = outcome.fieldingTime ?? defenseState.battedBall?.ballTime ?? 0;
  return elapsedSeconds >= catchTime;
}

function getManualTagUpHoldDeadline(outcome = defenseState.outcome) {
  if (!isManualThrowControl() || outcome?.kind !== "out" || !outcome.caught || outcome.needsThrow) return null;
  const tagRunners = (defenseState.baseRunners || []).filter((runner) => runner?.tagUp && runner.targetBase && runner.targetBase !== runner.startBase);
  if (!tagRunners.length) return null;
  const latestArrival = Math.max(...tagRunners.map((runner) => runner.arrivalTime || 0));
  return latestArrival + defenseThrowResultHoldSeconds;
}

function createTagUpVisualThrowState(fielder, fieldingTarget, outcome, battedBall, baseRunners = [], options = {}) {
  if (!fielder || !fieldingTarget || !outcome || !battedBall) return null;
  if (outcome.kind !== "out" || !outcome.caught || outcome.needsThrow) return null;
  const tagRunner = getLeadTagUpRunnerForTarget(null, baseRunners);
  if (!tagRunner) return null;
  const targetBase = tagRunner.targetBase;
  const destination = getDefenseBasePointByName(targetBase);
  const distance = Math.hypot(destination.x - fieldingTarget.x, destination.y - fieldingTarget.y);
  const throwProfile = getThrowProfile(fielder, distance, {
    targetBase,
    from: fieldingTarget
  });
  const prepareStartTime = Math.max(0, outcome.fieldingTime ?? battedBall.ballTime ?? 0);
  const startTime = prepareStartTime + Math.max(0.12, getAutoThrowSetSeconds(fielder) * 0.42);
  const throwTime = throwProfile.throwTime;
  const endTime = startTime + throwTime;
  const live = options.live === true;
  return {
    active: false,
    visualOnly: !live,
    tagUpPlay: live,
    from: { ...fieldingTarget },
    to: { ...destination },
    prepareStartTime,
    startTime,
    endTime,
    playType: "tag",
    tagTime: live ? endTime : null,
    holdDeadline: endTime + defenseThrowResultHoldSeconds,
    manualWait: false,
    throwTime,
    arcHeight: throwProfile.arcHeight,
    bounce: throwProfile.bounce,
    baseLabel: getBaseLabel(targetBase),
    targetBase,
    safe: live ? isDefenseThrowSafeAtBase(targetBase, endTime, null, baseRunners, outcome) : true
  };
}

function getAutoThrowSetSeconds(fielder) {
  const fielding = getOpenEndedAbilityRating(fielder?.fielding ?? fielder?.speed ?? 5);
  return clamp(0.7 - ((fielding - 1) / 9) * 0.5, 0.08, 0.7);
}

function isDefenseThrowSafeAtBase(targetBase, throwArrivalTime, batterRunner = null, baseRunners = null, outcome = defenseState.outcome) {
  const throwState = defenseState.throw?.targetBase === targetBase
    ? { ...defenseState.throw, endTime: throwArrivalTime }
    : { targetBase, startTime: throwArrivalTime, endTime: throwArrivalTime };
  if (hasRunnerAlreadySafeAtThrowTarget(throwState, batterRunner, baseRunners, outcome)) return true;
  const runnerArrival = getDefenseThrowTargetRunnerArrival(targetBase, batterRunner, baseRunners, outcome);
  return runnerArrival == null || runnerArrival <= throwArrivalTime;
}

function refreshDefenseThrowSafety() {
  const throwState = defenseState.throw;
  updateHeldBallBaseFromThrow();
  if (throwState?.targetBase && (defenseState.completedForceOutBases || []).includes(throwState.targetBase)) {
    throwState.safe = false;
    return;
  }
  if (hasRunnerAlreadySafeAtThrowTarget(throwState, defenseState.runner, null, defenseState.outcome)) {
    if (throwState) throwState.safe = true;
    return;
  }
  if (getForceOutBasesFromThrowState(throwState).length) {
    if (throwState) throwState.safe = false;
    return;
  }
  if (defenseState.heldBallBase && hasRunnerTargetingThrowBase(defenseState.heldBallBase, defenseState.runner, null, defenseState.outcome)) {
    if (throwState) throwState.safe = !hasRunnerOutAtThrowTarget(throwState, defenseState.runner, null, defenseState.outcome);
    return;
  }
  if (!throwState || !Number.isFinite(throwState.endTime)) return;
  if (hasRunnerOutAtThrowTarget(throwState, defenseState.runner, null, defenseState.outcome)) {
    throwState.safe = false;
    return;
  }
  throwState.safe = isDefenseThrowSafeAtBase(throwState.targetBase, throwState.endTime, defenseState.runner, null, defenseState.outcome);
}

function updateHeldBallBaseFromThrow() {
  const throwState = defenseState.throw;
  if (!throwState || !throwState.targetBase || !Number.isFinite(throwState.endTime)) return;
  if (!throwState.completed && performance.now && defenseState.startTime) {
    const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
    if (elapsedSeconds < throwState.endTime) return;
    throwState.completed = true;
  }
  if (throwState.completed) {
    defenseState.heldBallBase = throwState.targetBase;
    defenseState.heldBallSince = throwState.endTime;
  }
}

function isBatterRunnerOutAtThrowTarget(throwState, runner) {
  if (!throwState || !runner || !throwState.targetBase || runner.targetBase !== throwState.targetBase) return false;
  if (isBatterRunnerAlreadySafeAtThrowTarget(throwState, runner)) return false;
  return judgeOutPlay(runner, throwState.targetBase, throwState).out;
}

function isBatterRunnerAlreadySafeAtThrowTarget(throwState, runner) {
  if (!throwState || !runner || !throwState.targetBase || runner.targetBase !== throwState.targetBase) return false;
  if (!Number.isFinite(throwState.startTime) || !Number.isFinite(runner.arrivalTime)) return false;
  return runner.arrived && runner.arrivalTime <= throwState.startTime;
}

function getRunnerKey(runner) {
  if (!runner) return "";
  return runner.runnerId || runner.id || runner.name || runner.startBase || "runner";
}

function recalculateForceStateForPlay(completedForceOutBases = defenseState.completedForceOutBases || []) {
  const activeTargets = getForceTargetsForCurrentPlay()
    .filter((target) => isForceTargetEntryActive(target, getForceTargetsForCurrentPlay(), completedForceOutBases));
  return new Map(activeTargets.map((target) => [target.startBase, target.targetBase]));
}

function getRunnerForceBase(runner, forceMap = recalculateForceStateForPlay()) {
  if (!runner) return null;
  const startBase = runner.startBase || (runner === defenseState.runner ? "batter" : null);
  return startBase ? forceMap.get(startBase) || null : null;
}

function hasForceObligationToBase(runner, targetBase, forceMap = recalculateForceStateForPlay()) {
  return Boolean(targetBase && getRunnerForceBase(runner, forceMap) === targetBase);
}

function canRunnerBeForceOutAtBase(runner, targetBase, forceMap = recalculateForceStateForPlay()) {
  if (!runner || !targetBase) return false;
  if (runner.manualTargetBase) return hasForceObligationToBase(runner, targetBase, forceMap);
  return getRunnerForceBase(runner, forceMap) === targetBase;
}

function logDefenseJudgment(entry) {
  defenseState.judgmentLog = defenseState.judgmentLog || [];
  defenseState.judgmentLog.push({
    time: Number.isFinite(entry.time) ? Number(entry.time.toFixed(3)) : null,
    ...entry
  });
  if (defenseState.judgmentLog.length > 40) defenseState.judgmentLog.shift();
}

function recordDefenseOutEvent({ runner = null, base = null, outType = "unknown", time = null, reason = "" } = {}) {
  defenseState.outEvents = defenseState.outEvents || [];
  const event = {
    runnerId: getRunnerKey(runner),
    base,
    outType,
    time: Number.isFinite(time) ? Number(time.toFixed(3)) : null,
    reason,
    outNumber: count.outs + defenseState.outEvents.length + 1
  };
  defenseState.outEvents.push(event);
  logDefenseJudgment({
    result: `${String(outType).toUpperCase()}_OUT_RECORDED`,
    runnerId: event.runnerId,
    targetBase: base,
    time,
    reason
  });
  return event;
}

// runner.arrivalTime は「いま向かっている最終目的地」への到達時刻でしかない。
// 1塁→本塁のように複数塁を一気に進む走者を二塁で封殺できるか判定するときに
// runner.arrivalTime (本塁到達時刻) をそのまま使うと、実際には二塁を先に safe に
// 通過していても「本塁着はまだ先だから間に合った」として誤ってアウトになってしまう。
// ルート上で対象塁の座標を実際に通過する時刻を距離から逆算する。
function getRunnerArrivalTimeAtBaseIndex(runner, baseIndex) {
  if (!runner) return null;
  if (!runner.route || runner.route.length < 2 || !Number.isFinite(baseIndex)) return runner?.arrivalTime ?? null;
  const targetPoint = getDefenseBasePoint(baseIndex);
  let cumulative = 0;
  for (let i = 1; i < runner.route.length; i += 1) {
    const previous = runner.route[i - 1];
    const current = runner.route[i];
    cumulative += Math.hypot(current.x - previous.x, current.y - previous.y);
    if (Math.hypot(current.x - targetPoint.x, current.y - targetPoint.y) < 2) {
      const routeStartTime = runner.routeStartTime ?? 0;
      // speed が欠けている走者で 0 を返すと、封殺の判定が必ずセーフになってしまう。
      if (!Number.isFinite(runner.speed) || runner.speed <= 0) return runner.arrivalTime ?? routeStartTime;
      return routeStartTime + cumulative / runner.speed;
    }
  }
  return runner.arrivalTime ?? null;
}

function judgeOutPlay(runner, targetBase, throwState, options = {}) {
  if (!runner || !targetBase || !throwState || throwState.visualOnly) {
    return { result: "NO_PLAY", out: false, reason: "Missing runner, base, or live throw" };
  }
  const ballSecureTime = throwState.endTime;
  const runnerArrivalTime = runner.arrivalTime;
  if (!Number.isFinite(ballSecureTime) || !Number.isFinite(runnerArrivalTime)) {
    return { result: "SAFE", out: false, reason: "Missing timing data" };
  }
  const forceMap = recalculateForceStateForPlay(options.completedForceOutBases);
  const forcedBase = getRunnerForceBase(runner, forceMap);
  const forced = canRunnerBeForceOutAtBase(runner, targetBase, forceMap);
  if (forced) {
    const baseTouchTime = throwState.baseTouchTime ?? ballSecureTime;
    const forcedArrivalTime = getRunnerArrivalTimeAtBaseIndex(runner, getForceTargetBaseIndex(targetBase)) ?? runnerArrivalTime;
    const out = baseTouchTime + SAFE_TOLERANCE < forcedArrivalTime;
    return {
      result: out ? "FORCE_OUT" : "SAFE",
      out,
      outType: out ? "force" : null,
      forcedBase,
      reason: out
        ? "Ball secured and forced base touched before runner arrived"
        : "Forced runner reached base before or with the throw",
      ballSecureTime,
      baseTouchTime,
      runnerArrivalTime: forcedArrivalTime
    };
  }
  const tagTime = throwState.tagTime ?? ballSecureTime;
  // 封じられていない走者でも、塁と塁の間にいるうちに向かっている塁へボールが先着すればアウト (挟殺)。
  // 送球の playType は「その塁が封殺の対象か」を表すだけなので、ここでは走者の状況で判断する。
  // 塁上で止まっている走者は arrivalTime が過去なので、この時刻比較で自然にセーフになる。
  const tagAttempt = isRunnerDestinedForBase(runner, targetBase);
  const out = tagAttempt && tagTime + SAFE_TOLERANCE < runnerArrivalTime;
  return {
    result: out ? "TAG_OUT" : "SAFE",
    out,
    outType: out ? "tag" : null,
    forcedBase,
    reason: out
      ? "Runner was not forced; tag play beat runner to safe base"
      : "Runner was not forced; base touch alone cannot record an out",
    ballSecureTime,
    tagTime,
    runnerArrivalTime
  };
}

function hasRunnerTargetingThrowBase(targetBase, batterRunner = null, baseRunners = null, outcome = defenseState.outcome) {
  return getDefenseThrowTargetRunners(targetBase, batterRunner, baseRunners, outcome).length > 0;
}

function hasRunnerAlreadySafeAtThrowTarget(throwState, batterRunner = null, baseRunners = null, outcome = defenseState.outcome) {
  if (!throwState?.targetBase) return false;
  return getDefenseThrowTargetRunners(throwState.targetBase, batterRunner, baseRunners, outcome)
    .some((runner) => isDefenseRunnerAlreadySafeAtThrowTarget(throwState, runner));
}

function hasRunnerOutAtThrowTarget(throwState, batterRunner = null, baseRunners = null, outcome = defenseState.outcome) {
  if (!throwState?.targetBase) return false;
  return getDefenseThrowTargetRunners(throwState.targetBase, batterRunner, baseRunners, outcome)
    .some((runner) => isDefenseRunnerOutAtThrowTarget(throwState, runner));
}

function isDefenseRunnerAlreadySafeAtThrowTarget(throwState, runner) {
  if (!throwState || !runner || !throwState.targetBase || runner.targetBase !== throwState.targetBase) return false;
  if (!Number.isFinite(throwState.startTime) || !Number.isFinite(runner.arrivalTime)) return false;
  return runner.arrived && runner.arrivalTime <= throwState.startTime;
}

function isDefenseRunnerOutAtThrowTarget(throwState, runner) {
  if (!throwState || !runner || !throwState.targetBase || runner.targetBase !== throwState.targetBase) return false;
  if (isDefenseRunnerAlreadySafeAtThrowTarget(throwState, runner)) return false;
  return judgeOutPlay(runner, throwState.targetBase, throwState).out;
}

function getDefenseThrowTargetRunnerArrival(targetBase, batterRunner = null, baseRunners = null, outcome = defenseState.outcome) {
  const arrivals = getDefenseThrowTargetRunners(targetBase, batterRunner, baseRunners, outcome)
    .map((runner) => runner.arrivalTime)
    .filter(Number.isFinite);
  return arrivals.length ? Math.min(...arrivals) : null;
}

function getDefenseThrowTargetRunners(targetBase, batterRunner = null, baseRunners = null, outcome = defenseState.outcome) {
  if (isForceThrowTargetBase(targetBase, outcome, defenseState.battedBall)) {
    const forcedRunner = getForcedRunnerForThrowTarget(targetBase, batterRunner, baseRunners);
    if (forcedRunner) return [forcedRunner];
  }
  if (isRunnerHeadingToDefenseBase(batterRunner, targetBase)) return [batterRunner];
  const runners = [];
  (baseRunners || defenseState.baseRunners)?.forEach((runner) => {
    if (isRunnerHeadingToDefenseBase(runner, targetBase)) runners.push(runner);
  });
  return runners;
}

function isForceThrowTargetBase(targetBase, outcome = defenseState.outcome, battedBall = defenseState.battedBall) {
  if (!targetBase) return false;
  if (!isForceEligibleBattedBall(battedBall, outcome)) return false;
  return isForceTargetActive(targetBase);
}

// タッチの対象になるのは、その塁を目的地にしている走者だけ。
// 通り抜けるだけの塁ではタッチアウトにならない。
function isRunnerDestinedForBase(runner, targetBase) {
  if (!runner || !targetBase) return false;
  return runner.manualTargetBase === targetBase || runner.targetBase === targetBase;
}

function isRunnerHeadingToDefenseBase(runner, targetBase) {
  if (!runner || !targetBase) return false;
  if (runner.targetBase === targetBase || runner.manualTargetBase === targetBase) return true;
  const targetIndex = getForceTargetBaseIndex(targetBase);
  if (targetIndex < 1 || targetIndex > 4) return false;
  return runnerRouteIncludesDefenseBase(runner.route, targetIndex);
}

function runnerRouteIncludesDefenseBase(route, targetIndex) {
  if (!route?.length) return false;
  const target = getDefenseBasePoint(targetIndex);
  return route.some((point, index) => index > 0 && Math.hypot(point.x - target.x, point.y - target.y) < 2);
}

function getForcedRunnerForThrowTarget(targetBase, batterRunner = null, baseRunners = null) {
  if (!isForceTargetActive(targetBase)) return null;
  const forceTarget = getForceTargetsForCurrentPlay().find((entry) => entry.targetBase === targetBase);
  const startBase = forceTarget?.startBase || getForcedRunnerStartBaseForTarget(targetBase);
  if (startBase === "batter") {
    return canRunnerBeForceOutAtBase(batterRunner, targetBase) ? batterRunner : null;
  }
  if (!startBase) return null;
  const activeRunner = (baseRunners || defenseState.baseRunners || []).find((runner) => runner.startBase === startBase);
  if (activeRunner) return canRunnerBeForceOutAtBase(activeRunner, targetBase) ? activeRunner : null;
  const forceRunner = createForcedRunnerFromForceTarget(forceTarget)
    || createForcedRunnerFromBaseState(startBase, targetBase);
  return canRunnerBeForceOutAtBase(forceRunner, targetBase) ? forceRunner : null;
}

function createForcedRunnerFromForceTarget(forceTarget) {
  if (!forceTarget?.runnerInfo || !forceTarget.startBase || !forceTarget.targetBase) return null;
  return createForcedRunnerFromInfo(forceTarget.runnerInfo, forceTarget.startBase, forceTarget.targetBase);
}

function createForcedRunnerFromBaseState(startBase, targetBase) {
  const runnerInfo = bases[startBase];
  if (!runnerInfo) return null;
  return createForcedRunnerFromInfo(runnerInfo, startBase, targetBase);
}

function createForcedRunnerFromInfo(runnerInfo, startBase, targetBase) {
  const startIndex = baseIndexByName[startBase];
  const targetIndex = getBatterRunnerTargetIndex(targetBase);
  if (startIndex < 1 || targetIndex <= startIndex) return null;
  const route = createBaseRunnerRoute(startIndex, targetIndex);
  const speed = getDefenseBaseRunnerSpeed(runnerInfo);
  const distance = getRunnerRouteDistance(route);
  return {
    ...runnerInfo,
    startBase,
    currentBase: startBase,
    targetBase,
    route,
    routeStartTime: 0,
    routeDuration: distance > 0 ? distance / speed : 0,
    arrivalTime: distance > 0 ? distance / speed : 0,
    // speed を持たせないと getRunnerArrivalTimeAtBaseIndex が到達時刻を 0 と算出し、
    // 封殺の判定が必ずセーフになる。
    speed,
    arrived: false,
    x: route[0].x,
    y: route[0].y
  };
}

function isForceTargetActive(targetBase) {
  const targetIndex = getForceTargetBaseIndex(targetBase);
  if (targetIndex < 1 || targetIndex > 4) return false;
  const outStartBases = new Set((defenseState.completedForceOutBases || []).map(getForcedRunnerStartBaseForTarget).filter(Boolean));
  const forceTargets = getForceTargetsForCurrentPlay();
  if (forceTargets.length) {
    const target = forceTargets.find((entry) => entry.targetBase === targetBase);
    return isForceTargetEntryActive(target, forceTargets);
  }
  if (outStartBases.has("batter")) return false;
  for (let baseIndex = 1; baseIndex < targetIndex; baseIndex += 1) {
    const baseName = baseNameByIndex[baseIndex];
    if (!bases[baseName] || outStartBases.has(baseName)) return false;
  }
  if (targetBase !== "first") {
    const runnerStartBase = getForcedRunnerStartBaseForTarget(targetBase);
    if (!runnerStartBase || !bases[runnerStartBase] || outStartBases.has(runnerStartBase)) return false;
  }
  return true;
}

function createForceTargetsForPlay(battedBall, outcome, baseState = bases) {
  if (!isForceEligibleBattedBall(battedBall, outcome)) return [];
  const targets = [{ targetBase: "first", startBase: "batter" }];
  if (baseState.first) targets.push({ targetBase: "second", startBase: "first", runnerInfo: { ...baseState.first } });
  if (baseState.first && baseState.second) targets.push({ targetBase: "third", startBase: "second", runnerInfo: { ...baseState.second } });
  if (baseState.first && baseState.second && baseState.third) targets.push({ targetBase: "home", startBase: "third", runnerInfo: { ...baseState.third } });
  return targets;
}

// 封殺の義務を負っている走者。打者走者は startBase が "batter"。
function getForceTargetRunner(target) {
  if (!target?.startBase) return null;
  if (target.startBase === "batter") return defenseState.runner || null;
  return (defenseState.baseRunners || []).find((runner) => runner.startBase === target.startBase) || null;
}

// 走者が踏み終えた一番先の塁。
// getRunnerBaseIndex は打者走者の「ホーム=出発点」を前提に home を 0 として返すため、
// 生還した塁上走者にそのまま使うと「まだ一塁にも達していない」扱いになってしまう。
// 塁上走者にとっての home はゴール (4) なので、ここで別扱いする。
function getRunnerTouchedBaseIndex(runner) {
  if (!runner) return -1;
  if (runner === defenseState.runner) return getBatterRunnerTouchedBaseIndex(runner);
  const baseName = runner.currentBase ?? runner.startBase;
  return baseName === "home" ? 4 : getRunnerBaseIndex(baseName);
}

// その塁を踏み終えて、さらに先へ向かった走者は、もうそこでは封殺できない。
// 「踏んだだけ」で解除すると、判定時点で一塁に到達している通常のゴロアウトまで
// セーフになってしまうので、その塁を目指している間は封殺の対象のままにする。
function isForceTargetSatisfied(target) {
  const targetIndex = getForceTargetBaseIndex(target?.targetBase);
  if (!target || targetIndex < 1) return false;
  const runner = getForceTargetRunner(target);
  if (!runner) return false;
  if (getRunnerTouchedBaseIndex(runner) < targetIndex) return false;
  return !isRunnerDestinedForBase(runner, target.targetBase);
}

function isForceTargetEntryActive(target, forceTargets = getForceTargetsForCurrentPlay(), completedForceOutBases = defenseState.completedForceOutBases || []) {
  if (!target) return false;
  if (isForceTargetSatisfied(target)) return false;
  const outStartBases = new Set(completedForceOutBases.map(getForcedRunnerStartBaseForTarget).filter(Boolean));
  if (outStartBases.has(target.startBase) || outStartBases.has("batter")) return false;
  const targetIndex = getForceTargetBaseIndex(target.targetBase);
  for (let baseIndex = 1; baseIndex < targetIndex; baseIndex += 1) {
    const chainedBase = baseNameByIndex[baseIndex];
    if (outStartBases.has(chainedBase)) return false;
    if (!forceTargets.some((entry) => entry.startBase === chainedBase)) return false;
  }
  return true;
}

function getForceTargetsForCurrentPlay() {
  if (defenseState.forceTargets?.length) return defenseState.forceTargets;
  return createForceTargetsForPlay(defenseState.battedBall, defenseState.outcome);
}

function getActiveForceTargets() {
  return getForceTargetsForCurrentPlay().filter((entry) => isForceTargetActive(entry.targetBase));
}

function annotateRunnerForceStates(batterRunner = defenseState.runner, baseRunners = defenseState.baseRunners) {
  const forceMap = recalculateForceStateForPlay();
  const apply = (runner, startBase) => {
    if (!runner || !startBase) return;
    const forceBase = forceMap.get(startBase) || null;
    runner.forceBase = forceBase;
    runner.forceObligation = Boolean(forceBase);
  };
  apply(batterRunner, "batter");
  (baseRunners || []).forEach((runner) => apply(runner, runner.startBase));
}

function getThrowProfile(fielder, distance, options = {}) {
  const arm = getOpenEndedAbilityRating(fielder?.arm ?? 5);
  const legacyArm = clamp(arm, 1, 10);
  const longThrowFactor = clamp((distance - 420) / 1180, 0, 1);
  const longOutfieldHomeThrow = isLongOutfieldHomeThrow(fielder, distance, options);
  const baseSpeed = getArmThrowSpeed(arm);
  const outfieldArmSpeedScale = longOutfieldHomeThrow
    ? 1 - ((legacyArm - 1) / 9) * 0.2
    : 1;
  const longThrowPenalty = Math.max(0.08, 0.76 - arm * 0.045 + (longOutfieldHomeThrow ? ((legacyArm - 1) / 9) * 0.14 : 0));
  const speedMultiplier = clamp(1 - longThrowFactor * longThrowPenalty, longOutfieldHomeThrow ? 0.28 : 0.22, 1);
  const throwSpeed = baseSpeed * outfieldArmSpeedScale * speedMultiplier;
  const minimumTime = Math.max(0.42, 0.78
    + longThrowFactor * (1.35 - arm * 0.055)
    + (longOutfieldHomeThrow ? longThrowFactor * 0.16 : 0));
  const needsBounce = distance >= 900 && (longOutfieldHomeThrow ? arm <= 8 : arm < 8);
  const bounceDrag = needsBounce
    ? clamp(
        ((longOutfieldHomeThrow ? 9 - arm : 8 - arm) / (longOutfieldHomeThrow ? 8 : 7)) * ((distance - 900) / 760),
        longOutfieldHomeThrow ? 0.18 : 0.06,
        longOutfieldHomeThrow ? 0.52 : 0.24
      )
    : 0;
  const bounceTimePenalty = needsBounce && longOutfieldHomeThrow
    ? clamp((9 - arm) * 0.12 + longThrowFactor * 0.28, 0.24, 1.12)
    : 0;
  const throwTime = Math.max(distance / throwSpeed, minimumTime + bounceTimePenalty) * (1 + bounceDrag);
  const arcHeight = Math.max(28, 38 + longThrowFactor * (210 - arm * 7 + (longOutfieldHomeThrow ? 28 : 0)));
  const bounce = needsBounce
    ? {
        enabled: true,
        progress: clamp(0.58 + arm * 0.018 - longThrowFactor * (longOutfieldHomeThrow ? 0.09 : 0.05), 0.5, 0.68),
        height: clamp(22 + (longOutfieldHomeThrow ? 9 - arm : 8 - arm) * 5 + longThrowFactor * 18, 28, longOutfieldHomeThrow ? 74 : 62)
      }
    : null;
  return { throwSpeed, throwTime, arcHeight, longThrowFactor, bounce };
}

function isLongOutfieldHomeThrow(fielder, distance, options = {}) {
  if (options.targetBase !== "home") return false;
  if (!outfielderRoles.includes(fielder?.role)) return false;
  const from = options.from || fielder || {};
  const outfieldDepth = Math.max(0, (defenseField.bases.home.y ?? field.plateY) - (from.y ?? fielder?.y ?? 0));
  return distance >= 900 || outfieldDepth >= defenseField.fenceDistance * 0.38;
}

function getThrowPointAtProgress(throwState, progress) {
  const t = clamp(progress, 0, 1);
  if (!throwState?.bounce?.enabled) {
    const eased = 1 - Math.pow(1 - t, 1.4);
    return {
      x: throwState.from.x + (throwState.to.x - throwState.from.x) * eased,
      y: throwState.from.y + (throwState.to.y - throwState.from.y) * eased
    };
  }
  const bounceProgress = clamp(throwState.bounce.progress ?? 0.62, 0.45, 0.78);
  const bouncePoint = getThrowBouncePoint(throwState);
  if (t <= bounceProgress) {
    const segmentT = clamp(t / bounceProgress, 0, 1);
    const eased = 1 - Math.pow(1 - segmentT, 1.22);
    return {
      x: throwState.from.x + (bouncePoint.x - throwState.from.x) * eased,
      y: throwState.from.y + (bouncePoint.y - throwState.from.y) * eased
    };
  }
  const segmentT = clamp((t - bounceProgress) / (1 - bounceProgress), 0, 1);
  const eased = 1 - Math.pow(1 - segmentT, 1.55);
  return {
    x: bouncePoint.x + (throwState.to.x - bouncePoint.x) * eased,
    y: bouncePoint.y + (throwState.to.y - bouncePoint.y) * eased
  };
}

function getThrowBouncePoint(throwState) {
  const progress = clamp(throwState?.bounce?.progress ?? 0.62, 0.45, 0.78);
  return {
    x: throwState.from.x + (throwState.to.x - throwState.from.x) * progress,
    y: throwState.from.y + (throwState.to.y - throwState.from.y) * progress
  };
}

function getArmThrowSpeed(armRating) {
  const value = getOpenEndedAbilityRating(armRating);
  const minThrowSpeed = 800;
  const maxThrowSpeed = 1100;
  return minThrowSpeed + ((value - 1) / 9) * (maxThrowSpeed - minThrowSpeed);
}

function resolveGrounderPickupThrow(fielder, battedBall, outcome, fieldingTarget, runner) {
  if (outcome.caught || outcome.kind !== "single" || !runner || battedBall.fenceOver || battedBall.wallHit) return null;
  const distance = Math.hypot(fieldingTarget.x - fielder.x, fieldingTarget.y - fielder.y);
  const pickupDelay = battedBall.isGrounder ? 0.34 : battedBall.isLiner ? 0.46 : 0.58;
  const pickupTime = Math.max(
    battedBall.ballTime + pickupDelay,
    getFielderReactionDelay(fielder) + distance / getFielderSpeed(fielder) + 0.22
  );
  const targetBase = getBatterRunnerTargetBase(outcome, battedBall, fieldingTarget, fielder, runner);
  const throwRunner = createBatterRunner(activeBatter);
  setBatterRunnerDestination(throwRunner, targetBase);
  if (pickupTime >= throwRunner.arrivalTime) return null;
  return {
    target: fieldingTarget,
    outcome: {
      kind: "force",
      label: `${fielder.role} ${battedBall.isGrounder ? "ゴロ処理" : "捕球処理"}`,
      caught: true,
      needsThrow: true,
      targetBase,
      fieldingTime: pickupTime
    }
  };
}

function getDefenseFieldingTarget(battedBall, outcome) {
  if (battedBall?.isFoulBall && !outcome?.caught) return getFoulBallFieldingTarget(battedBall);
  if (battedBall.fenceOver) return getHomeRunFielderWatchTarget(battedBall);
  if (battedBall.groundRuleDouble && battedBall.riverEntryPoint) return battedBall.riverEntryPoint;
  if (outcome?.fieldingPoint && (outcome.caught || outcome.needsThrow || battedBall.isGrounder)) return outcome.fieldingPoint;
  if (outcome.caught && !outcome.needsThrow) return battedBall.target;
  if (battedBall.wallHit) return battedBall.wallReboundTarget || battedBall.target;
  if (isOutfieldFrontLandingBall(battedBall)) {
    return getOutfieldFrontDropRollTarget(battedBall);
  }
  if (isDeepDriveFrontLandingBall(battedBall)) {
    return getDeepDriveFrontRollTarget(battedBall);
  }
  if (battedBall.isLineEdge || battedBall.isLineEdgeGrounder) {
    return getLineEdgeRollTarget(battedBall, outcome);
  }
  if (battedBall.isBunt) {
    return getBuntRollTarget(battedBall);
  }
  const hardGrounder = isHardGrounder(battedBall);
  const strongOutfieldRoll = (battedBall.isLiner || hardGrounder || battedBall.power >= 0.58) && battedBall.landingDistance > 620;
  const fenceRoom = Math.max(0, defenseField.fenceDistance - battedBall.flightDistance - 120);
  const fenceRollDistance = clamp(fenceRoom * 0.72, 680, 1500);
  const baseRollDistance = outcome.kind === "double"
    ? strongOutfieldRoll ? fenceRollDistance : 820
    : strongOutfieldRoll ? clamp(fenceRoom * 0.46, 520, 1120) : 340;
  const scaledRollDistance = baseRollDistance * defenseRollTuning.distanceScale;
  const outfieldRollScale = isOutfieldGrounderOrLiner(battedBall)
    ? defenseRollTuning.outfieldGrounderLinerScale
    : 1;
  const grounderRollScale = battedBall.isGrounder ? defenseRollTuning.grounderScale : 1;
  const rollDistance = hardGrounder
    ? clamp(scaledRollDistance * grounderRollScale * outfieldRollScale * hardGrounderTuning.rollDistanceScale, hardGrounderTuning.rollMinDistance, hardGrounderTuning.rollMaxDistance * grounderRollScale * outfieldRollScale)
    : scaledRollDistance * grounderRollScale * outfieldRollScale;
  const projectedTarget = {
    x: battedBall.target.x + battedBall.direction.x * rollDistance,
    y: battedBall.target.y + battedBall.direction.y * rollDistance
  };
  const foulCrossing = !battedBall.isFoulBall && getFoulLineCrossingBeforeOutfield(battedBall.target, projectedTarget);
  if (foulCrossing) {
    battedBall.rolledFoulBeforeOutfield = true;
    battedBall.foulCrossingPoint = foulCrossing;
    return foulCrossing;
  }
  const riverEntry = getRiversideRiverEntryPoint(battedBall.target, projectedTarget);
  if (riverEntry) {
    battedBall.groundRuleDouble = true;
    battedBall.riverEntryPoint = riverEntry;
    return riverEntry;
  }
  if (isPastOutfieldFence(projectedTarget)) {
    if (shouldBounceIntoStands(battedBall, projectedTarget)) {
      battedBall.groundRuleDouble = true;
    }
    return clampPointInsideFence(projectedTarget, outfieldFenceFieldingInset);
  }
  return clampPointInsideFence(projectedTarget, 12);
}

function getBuntRollTarget(battedBall) {
  const quality = clamp(battedBall.battedProfile?.buntQuality ?? 0.45, 0, 1);
  const rollDistanceScale = getBuntRollDistanceScale(quality);
  const rollDistance = (randomBetween(24, 64) + (1 - quality) * randomBetween(20, 85))
    * rollDistanceScale
    * buntTuning.rollDistanceBoost;
  const projectedTarget = {
    x: battedBall.target.x + (battedBall.direction?.x ?? 0) * rollDistance,
    y: battedBall.target.y + (battedBall.direction?.y ?? -1) * rollDistance
  };
  const foulCrossing = !battedBall.isFoulBall && getFoulLineCrossingBeforeOutfield(battedBall.target, projectedTarget);
  if (foulCrossing) {
    battedBall.rolledFoulBeforeOutfield = true;
    battedBall.foulCrossingPoint = foulCrossing;
    return foulCrossing;
  }
  return clampPointInsideFence(projectedTarget, 12);
}

function getBuntRollDistanceScale(quality = 0.45) {
  const q = clamp(quality, 0, 1);
  if (q >= 0.82) return 1;
  if (q >= 0.68) return 1 + (0.82 - q) / 0.14 * 0.35;
  return clamp(2.1 - q * 0.55, 1.35, 2.1);
}

function getLineEdgeRollTarget(battedBall, outcome = {}) {
  const extraBaseRoll = outcome.kind === "double" || outcome.scoreType === "double";
  const lineCarry = Math.abs(battedBall.direction?.x ?? 0);
  const powerRoll = clamp((battedBall.power ?? 0.82) - 0.72, 0, 0.42) * 520;
  const lineRoll = lineCarry * 180;
  const rollDistance = clamp(randomBetween(extraBaseRoll ? 580 : 420, extraBaseRoll ? 1080 : 780) + powerRoll + lineRoll, 430, 1280);
  const projectedTarget = {
    x: battedBall.target.x + battedBall.direction.x * rollDistance,
    y: battedBall.target.y + battedBall.direction.y * rollDistance
  };
  const foulCrossing = !battedBall.isFoulBall && getFoulLineCrossingBeforeOutfield(battedBall.target, projectedTarget);
  if (foulCrossing) {
    battedBall.rolledFoulBeforeOutfield = true;
    battedBall.foulCrossingPoint = foulCrossing;
    return foulCrossing;
  }
  return clampPointInsideFence(projectedTarget, 10);
}

function isOutfieldFrontDropBall(battedBall) {
  const landingDistance = battedBall?.landingDistance ?? 0;
  return Boolean(
    battedBall
      && !battedBall.wallHit
      && !battedBall.fenceOver
      && (battedBall.isLineDrop || battedBall.isFrontDrop || (battedBall.isSoftDrop && battedBall.isLiner))
      && landingDistance > defenseField.fenceDistance * 0.39
  );
}

function isOutfieldFrontLandingBall(battedBall) {
  if (!battedBall || battedBall.isGrounder || battedBall.wallHit || battedBall.fenceOver || battedBall.groundRuleDouble) return false;
  if (isOutfieldFrontDropBall(battedBall)) return true;
  const landingDistance = battedBall.landingDistance ?? getFenceDistance(battedBall.target);
  if (landingDistance < defenseField.fenceDistance * 0.39 || landingDistance > 1450) return false;
  if (battedBall.isLineEdge || battedBall.isLineLiner || battedBall.isFenceLiner || battedBall.isDeep) return false;
  if (battedBall.isLiner && (battedBall.power ?? 0) <= 0.84) return true;
  if (battedBall.trajectory === "fly" && (battedBall.power ?? 0) <= 0.78 && !battedBall.isChaseFly && !battedBall.isFenceEdgeFly) return true;
  return false;
}

function isOutfieldFlyLandingBall(battedBall) {
  if (!battedBall || battedBall.isGrounder || battedBall.isLiner || battedBall.isPopupFly || battedBall.wallHit || battedBall.fenceOver || battedBall.groundRuleDouble) return false;
  if (battedBall.trajectory !== "fly") return false;
  const landingDistance = battedBall.landingDistance ?? getFenceDistance(battedBall.target);
  return landingDistance >= defenseField.fenceDistance * 0.34;
}

function isDeepDriveFrontLandingBall(battedBall) {
  if (!battedBall?.isDeepDrive || battedBall.isSuperDeepDrive) return false;
  if (battedBall.wallHit || battedBall.fenceOver || battedBall.groundRuleDouble) return false;
  const landingDistance = battedBall.landingDistance ?? battedBall.flightDistance ?? getFenceDistance(battedBall.target);
  return landingDistance >= defenseField.fenceDistance * 0.42
    && landingDistance <= defenseField.fenceDistance * 0.78;
}

function getOutfieldFrontDropRollTarget(battedBall) {
  const isLineStyle = battedBall.isLineDrop || (battedBall.isLiner && !battedBall.isFrontDrop);
  const isFrontFlyDrop = battedBall.isFrontDrop && battedBall.trajectory === "fly";
  const minRoll = isLineStyle ? defenseRollTuning.lineDropRollMin : isFrontFlyDrop ? defenseRollTuning.frontFlyDropRollMin : defenseRollTuning.frontDropRollMin;
  const maxRoll = isLineStyle ? defenseRollTuning.lineDropRollMax : isFrontFlyDrop ? defenseRollTuning.frontFlyDropRollMax : defenseRollTuning.frontDropRollMax;
  const powerRoll = clamp((battedBall.power ?? 0.6) - 0.5, 0, 0.35) * (isLineStyle ? 210 : 150);
  const rollDistance = clamp(randomBetween(minRoll, maxRoll) + powerRoll, minRoll, maxRoll + 90);
  const projectedTarget = {
    x: battedBall.target.x + battedBall.direction.x * rollDistance,
    y: battedBall.target.y + battedBall.direction.y * rollDistance
  };
  const foulCrossing = !battedBall.isFoulBall && getFoulLineCrossingBeforeOutfield(battedBall.target, projectedTarget);
  if (foulCrossing) {
    battedBall.rolledFoulBeforeOutfield = true;
    battedBall.foulCrossingPoint = foulCrossing;
    return foulCrossing;
  }
  return clampPointInsideFence(projectedTarget, 18);
}

function getDeepDriveFrontRollTarget(battedBall) {
  const fenceRoom = Math.max(0, defenseField.fenceDistance - (battedBall.flightDistance ?? battedBall.landingDistance ?? 0) - 90);
  const powerRoll = clamp((battedBall.power ?? 1.1) - 1.0, 0, 0.72) * 360;
  const rollDistance = clamp(fenceRoom * 0.4 + powerRoll + randomBetween(160, 360), 520, 1260);
  const projectedTarget = {
    x: battedBall.target.x + battedBall.direction.x * rollDistance,
    y: battedBall.target.y + battedBall.direction.y * rollDistance
  };
  return clampPointInsideFence(projectedTarget, 18);
}

function getHomeRunFielderWatchTarget(battedBall) {
  return clampPointInsideFence(battedBall?.target || { x: field.centerX, y: defenseField.bases.home.y - defenseField.fenceDistance }, 86);
}

function shouldBounceIntoStands(battedBall, projectedTarget) {
  return false;
}

function getOutfieldFenceOvershoot(point) {
  if (!isPastOutfieldFence(point)) return 0;
  return getFenceDistance(point) - defenseField.fenceDistance;
}

function isOutfieldGrounderOrLiner(battedBall) {
  if (!battedBall || (!battedBall.isGrounder && !battedBall.isLiner)) return false;
  return Math.max(0, field.plateY - battedBall.target.y) > defenseField.fenceDistance * 0.28
    || battedBall.landingDistance > defenseField.fenceDistance * 0.28;
}

function resolveFenceBoundaryOutcome(battedBall, outcome, fieldingTarget) {
  if (!battedBall.groundRuleDouble) return null;
  return {
    target: fieldingTarget,
    outcome: {
      kind: "double",
      label: "エンタイトル2ベース",
      scoreType: "double",
      caught: false,
      fieldingTime: getDefenseBallFieldingArrivalTime(battedBall, fieldingTarget)
    }
  };
}

function getFenceCenter() {
  return defenseField.bases.home;
}

function getFenceDistance(point) {
  const center = getFenceCenter();
  return Math.hypot(point.x - center.x, point.y - center.y);
}

function getRiversideRiverDistanceForMeters(meters) {
  const stadium = getCurrentStadium();
  const centerMeters = Number.isFinite(stadium.centerFenceMeters) ? stadium.centerFenceMeters : realFieldMetrics.centerFieldFenceMeters;
  return defenseField.fenceDistance * (meters / centerMeters);
}

function getRiversideRiverMetrics() {
  const stadium = getCurrentStadium();
  if (!stadium.hasRiver || stadium.riverInPlay === false) return null;
  return {
    centerDistance: getRiversideRiverDistanceForMeters(stadium.riverCenterMeters ?? 64),
    halfWidth: getRiversideRiverDistanceForMeters(stadium.riverWidthMeters ?? 40) / 2,
    xSpan: defenseField.fenceDistance * 0.96
  };
}

function getRiversideRiverCenterY(x) {
  const metrics = getRiversideRiverMetrics();
  if (!metrics) return Infinity;
  const center = getFenceCenter();
  const n = clamp((x - field.plateX) / Math.max(1, metrics.xSpan), -1.15, 1.15);
  const bend = Math.sin(n * Math.PI * 1.08) * 54 + Math.sin((n + 0.18) * Math.PI * 2.1) * 20;
  return center.y - metrics.centerDistance + bend;
}

function getRiversideRiverFarEdgeY(x) {
  const metrics = getRiversideRiverMetrics();
  if (!metrics) return -Infinity;
  return getRiversideRiverCenterY(x) - metrics.halfWidth;
}

function getRiversideRiverNearEdgeY(x) {
  const metrics = getRiversideRiverMetrics();
  if (!metrics) return Infinity;
  return getRiversideRiverCenterY(x) + metrics.halfWidth;
}

function isPointInRiversideRiver(point) {
  const metrics = getRiversideRiverMetrics();
  if (!metrics || !point) return false;
  if (Math.abs(point.x - field.plateX) > metrics.xSpan) return false;
  if (point.y >= getFenceCenter().y) return false;
  return Math.abs(point.y - getRiversideRiverCenterY(point.x)) <= metrics.halfWidth;
}

function getRiversideRiverEntryPoint(start, end) {
  const stadium = getCurrentStadium();
  if (!stadium.hasRiver || stadium.riverInPlay === false || !start || !end) return null;
  const samples = 54;
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const point = {
      x: start.x + (end.x - start.x) * t,
      y: start.y + (end.y - start.y) * t
    };
    if (isPointInRiversideRiver(point)) return point;
  }
  return null;
}

function clampOutfielderBeyondRiversideRiver(point, role = "") {
  const stadium = getCurrentStadium();
  if (!stadium.hasRiver || stadium.riverInPlay === false || !outfielderRoles.includes(role) || !point) return point;
  const farEdgeY = getRiversideRiverFarEdgeY(point.x) - 28;
  if (!Number.isFinite(farEdgeY) || point.y <= farEdgeY) return point;
  return { ...point, y: farEdgeY };
}

function clampFielderOutsideRiversideRiver(point, role = "") {
  const stadium = getCurrentStadium();
  if (!stadium.hasRiver || stadium.riverInPlay === false || !point || !isPointInRiversideRiver(point)) return point;
  if (outfielderRoles.includes(role)) {
    return { ...point, y: getRiversideRiverFarEdgeY(point.x) - 18 };
  }
  return { ...point, y: getRiversideRiverNearEdgeY(point.x) + 18 };
}

function isPastOutfieldFence(point) {
  return point.y < getFenceCenter().y && getFenceDistance(point) > defenseField.fenceDistance;
}

function clampPointInsideFence(point, inset = 0) {
  if (!isPastOutfieldFence(point)) return { ...point };
  const center = getFenceCenter();
  const distance = getFenceDistance(point) || 1;
  const scale = Math.max(0, defenseField.fenceDistance - inset) / distance;
  return {
    x: center.x + (point.x - center.x) * scale,
    y: center.y + (point.y - center.y) * scale
  };
}

function clampFielderInsideFence(fielder) {
  const point = clampPointInsideFence(fielder, 36);
  return { ...fielder, x: point.x, y: point.y };
}

function getFenceIntersectionFromPoint(origin, direction) {
  const center = getFenceCenter();
  const dx = direction.x;
  const dy = direction.y;
  const ox = origin.x - center.x;
  const oy = origin.y - center.y;
  const a = dx * dx + dy * dy;
  const b = 2 * (ox * dx + oy * dy);
  const c = ox * ox + oy * oy - defenseField.fenceDistance * defenseField.fenceDistance;
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0 || a === 0) return null;
  const root = Math.sqrt(discriminant);
  const candidates = [(-b - root) / (2 * a), (-b + root) / (2 * a)].filter((value) => value > 0);
  if (!candidates.length) return null;
  const travelDistance = Math.min(...candidates);
  const point = {
    x: origin.x + dx * travelDistance,
    y: origin.y + dy * travelDistance
  };
  if (point.y >= center.y) return null;
  return { point, travelDistance };
}

function buildBattedBall(power, direction, label, battedProfile = null) {
  const origin = { x: field.plateX, y: field.plateY - 10 };
  const batterHomeRunPower = getHomeRunPowerProfile(
    battedProfile?.batterPowerRating ?? getSwingAdjustedBatterPowerRating(activeBatter)
  );
  const isBunt = Boolean(battedProfile?.isBunt);
  const isPopupFly = label === hitLabels.popup || shouldResolveBuntProfileAsPopupFly(battedProfile);
  const isRoutineFly = label === hitLabels.routineFly || label === hitLabels.fly;
  const isLineLiner = label === hitLabels.lineLiner;
  const isLineDrop = label === hitLabels.lineDrop;
  const isFenceLiner = label === hitLabels.fenceLiner;
  const isFrontDrop = label === hitLabels.frontDrop;
  const isLineEdge = label === hitLabels.lineEdge;
  const isLineEdgeGrounder = label === hitLabels.lineEdgeGrounder;
  const isCenterReturnGrounder = label === hitLabels.centerReturnGrounder;
  const isCenterReturnLiner = label === hitLabels.centerReturnLiner;
  const isChaseFly = label === hitLabels.chaseFly;
  const isToweringFly = label === hitLabels.toweringFly;
  const isFenceEdgeFly = label === hitLabels.fenceEdgeFly;
  const isSuperDeepDrive = label === superDeepDriveLabel || (label === deepDriveLabel && power >= 2.45);
  const isDeepDrive = label === deepDriveLabel || isSuperDeepDrive;
  const deepDriveTrajectory = battedProfile?.deepDriveTrajectory
    ?? (isSuperDeepDrive ? "fly" : "liner");
  const isBattingPracticeHomerCandidate = Boolean(battedProfile?.battingPracticeHomerCandidate);
  const isCenterZoneHomerCandidate = Boolean(battedProfile?.centerZoneHomerCandidate);
  const isScoreDrivenLongBall = Boolean(battedProfile?.scoreDrivenLongBall);
  if (isLineLiner) {
    direction = getLineLinerDirection({ ...(battedProfile || {}), direction });
  }
  direction = applySeaBreezeToBattedBallDirection(direction, power, battedProfile, { isBunt, isPopupFly });
  const fenceDistance = defenseField.fenceDistance;
  const contactScore = clamp(battedProfile?.feedbackScore ?? battedProfile?.quality ?? 0.5, 0, 1);
  const profileExitVelocity = clamp(battedProfile?.exitVelocity ?? power, 0.08, 1.85);
  const profileCarry = clamp(battedProfile?.carry ?? power, 0.08, 1.95);
  const isHardOutfieldBounceProfile = Boolean(battedProfile?.hardOutfieldBounce);
  const monsterContactBonus = contactScore >= 0.8
    ? Math.pow(clamp((contactScore - 0.8) / 0.2, 0, 1), 1.25) * (360 + clamp((profileExitVelocity - 1.05) / 0.55, 0, 1) * 360)
    : 0;
  const rawPowerMonsterDistance = Math.max(0, power - 2.35) * 460;
  const isExcellentLineLiner = isLineLiner
    && contactScore >= 0.76
    && profileExitVelocity >= 0.9
    && profileCarry >= 0.86;
  const isHardOutfieldBounce = isHardOutfieldBounceProfile;
  const unifiedDistanceRatio = Number.isFinite(battedProfile?.unifiedDistanceRatio)
    ? clamp(battedProfile.unifiedDistanceRatio, 0.06, 1.2)
    : null;
  const rawDistance = unifiedDistanceRatio !== null
    ? fenceDistance * unifiedDistanceRatio
    : isBunt && isPopupFly
    ? randomBetween(120, 260)
    : isBunt
    ? (randomBetween(72, 170) + (1 - clamp(battedProfile?.buntQuality ?? 0.4, 0, 1)) * 70) * getBuntRollDistanceScale(battedProfile?.buntQuality ?? 0.4)
    : isPopupFly
    ? randomBetween(220, 620)
    : isHardOutfieldBounce
    ? randomBetween(1380, 1680) + Math.max(0, power - 0.9) * 140 + Math.max(0, profileExitVelocity - 0.76) * 190
    : isFrontDrop
    ? randomBetween(760, 1080)
    : isLineEdgeGrounder
    ? randomBetween(900, 1340)
    : isCenterReturnGrounder
    ? randomBetween(980, 1420)
    : isCenterReturnLiner
    ? randomBetween(1120, 1560)
    : isLineEdge
    ? randomBetween(1220, 1780)
    : isLineLiner
    ? isExcellentLineLiner
      ? fenceDistance + randomBetween(-70, 120) + Math.max(0, power - 0.98) * 180 + Math.max(0, profileExitVelocity - 0.9) * 240
      : randomBetween(1180, 1520) + Math.max(0, power - 0.82) * 110
    : isLineDrop
    ? randomBetween(820, 1220)
    : isFenceLiner
    ? fenceDistance + randomBetween(-190, 90) + Math.max(0, power - 1.15) * 260 + Math.max(0, profileExitVelocity - 1.0) * 220
    : isChaseFly
    ? randomBetween(1500, 2070)
    : isFenceEdgeFly
    ? fenceDistance + randomBetween(-120, 420) + Math.max(0, power - 1.18) * 90 + Math.max(0, profileCarry - 0.92) * 120 + monsterContactBonus * 0.28
    : isDeepDrive
    ? fenceDistance + randomBetween(isSuperDeepDrive ? -360 : -560, isSuperDeepDrive ? 110 : 20) + Math.max(0, power - 1.25) * 120 + Math.max(0, profileCarry - 1.05) * 220 + monsterContactBonus + rawPowerMonsterDistance
    : isToweringFly
    ? randomBetween(1660, 2260) + Math.max(0, power - 1.12) * 390 + Math.max(0, power - 2.0) * 680
    : isRoutineFly
    ? randomBetween(980, 1820)
    : 180 + Math.pow(Math.max(power, 0.08), 0.86) * 1040;
  const scoreDrivenHomerPush = isScoreDrivenLongBall
    && contactScore >= 0.6
    && (isDeepDrive || isFenceEdgeFly || isFenceLiner);
  const centerZoneHomerPush = isCenterZoneHomerCandidate
    && contactScore >= 0.66
    && (isDeepDrive || isFenceEdgeFly || isFenceLiner);
  const naturalLongBallBonusMeters = centerZoneHomerPush
    ? 2.5 + contactScore * 1.5
    : scoreDrivenHomerPush
      ? 2 + contactScore
      : 0;
  const naturalLongBallDistanceBonus = naturalLongBallBonusMeters
    * fenceDistance
    / Math.max(1, getActualFenceDistanceMetersForDirection(direction));
  const boostedRawDistance = rawDistance + naturalLongBallDistanceBonus;
  let distance = shouldShortenBigOutfieldFly({
    isChaseFly,
    isFenceEdgeFly,
    isDeepDrive,
    isToweringFly,
    unifiedHomerCandidate: Boolean(battedProfile?.unifiedHomerCandidate)
  })
    ? boostedRawDistance * (isBattingPracticeHomerCandidate ? 1.04 : bigOutfieldFlyDistanceScale)
    : boostedRawDistance;
  const isGrounder = isCenterReturnGrounder || isLineEdgeGrounder || (!isPopupFly && !isRoutineFly && !isFrontDrop && !isLineEdge && !isLineLiner && !isLineDrop && !isFenceLiner && !isCenterReturnLiner && !isChaseFly && !isFenceEdgeFly && (isStandardGrounderLabel(label) || power < 0.38));
  const isLiner = isHardOutfieldBounce
    || isCenterReturnLiner
    || isLineEdge
    || isLineLiner
    || isLineDrop
    || isFenceLiner
    || (isDeepDrive && deepDriveTrajectory === "liner")
    || (!isGrounder && !isPopupFly && !isRoutineFly && !isFrontDrop && !isChaseFly && !isFenceEdgeFly && power < 0.94);
  const trajectory = isGrounder ? "grounder" : isLiner ? "liner" : "fly";
  if (!isGrounder && !isBunt) {
    distance *= getCurrentStadium().airCarryScale ?? 1;
  }
  if (isGrounder && !isBunt && !isLineEdgeGrounder && !isCenterReturnGrounder && !battedProfile?.preserveUnifiedDirection) {
    direction = getRandomGrounderDirection64(battedProfile);
  }
  if (!isBunt && trajectory === "fly" && !isPopupFly && !isFrontDrop) {
    direction = getVariedFlyLandingDirection(direction, battedProfile, {
      isRoutineFly,
      isChaseFly,
      isToweringFly,
      isFenceEdgeFly
    });
  }
  const isSoftDrop = isFrontDrop || isLineDrop || (label === hitLabels.single && isLiner && power <= 0.66);
  const carryScale = isPopupFly || isRoutineFly ? 1 : isGrounder ? 0.62 : isLiner ? 0.72 : power < 1.05 ? 0.82 : 1;
  const fairDeepFlight = !isGrounder && isFairDirection(direction);
  const fenceIntersection = isFairDirection(direction) ? getFenceIntersectionFromPoint(origin, direction) : null;
  const fenceTravelDistance = fenceIntersection?.travelDistance ?? fenceDistance;
  const forceUnifiedWallHit = Boolean(battedProfile?.unifiedForceWallHit && fairDeepFlight && fenceIntersection);
  if (forceUnifiedWallHit) {
    distance = Math.max(distance, fenceTravelDistance + 18);
  }
  let landingDistance = isLineLiner
    ? isHardOutfieldBounce
      ? distance * randomBetween(0.72, 0.84)
      : isExcellentLineLiner
      ? Math.min(distance, fenceTravelDistance + 60) * randomBetween(0.78, 0.9)
      : distance * randomBetween(0.48, 0.62)
    : isHardOutfieldBounce
    ? Math.min(distance, clamp(distance * randomBetween(0.82, 0.93), 1320, defenseField.fenceDistance * 0.62))
    : isFrontDrop
    ? distance * randomBetween(0.84, 0.94)
    : isLineEdgeGrounder
    ? distance * randomBetween(0.42, 0.58)
    : isLineEdge
    ? distance * randomBetween(0.72, 0.86)
    : isLineDrop
    ? distance * randomBetween(0.94, 1.02)
    : isFenceLiner
    ? distance < fenceTravelDistance - 48
      ? distance * randomBetween(0.88, 0.96)
      : Math.min(distance, fenceTravelDistance + 110) * randomBetween(0.985, 1.01)
    : isChaseFly
    ? distance * randomBetween(0.94, 1.03)
    : isFenceEdgeFly
    ? Math.min(distance, fenceDistance + 126) * randomBetween(0.99, 1.015)
    : isToweringFly
    ? distance * randomBetween(0.94, 1.04)
    : distance * carryScale;
  if (!isBunt && trajectory === "fly" && !isPopupFly && !isFrontDrop) {
    const baseFlyDepthScale = isRoutineFly
      ? 1.14
      : isChaseFly
        ? 1.1
        : isToweringFly
          ? 1.08
          : 1.06;
    const depthRoll = Math.random();
    const depthVarietyScale = depthRoll < 0.28
      ? (isRoutineFly ? randomBetween(0.64, 0.9) : randomBetween(0.78, 0.96))
      : depthRoll > 0.68
        ? (isRoutineFly ? randomBetween(1.18, 1.42) : randomBetween(1.1, 1.24))
        : randomBetween(0.92, 1.14);
    const lineRatio = Math.abs(direction.x / Math.min(-0.01, direction.y));
    const lineDepthTrim = lineRatio > 0.82 ? randomBetween(0.9, 1.02) : 1;
    const shallowFloor = isRoutineFly ? 980 : isChaseFly ? 1200 : 1080;
    landingDistance = clamp(
      landingDistance * baseFlyDepthScale * depthVarietyScale * lineDepthTrim + randomBetween(15, 90),
      shallowFloor,
      fenceTravelDistance + 90
    );
  }
  if (isBunt && !isPopupFly) {
    const buntQuality = clamp(battedProfile?.buntQuality ?? 0.4, 0, 1);
    const buntDistanceCap = (randomBetween(55, 120) + (1 - buntQuality) * randomBetween(20, 75)) * getBuntRollDistanceScale(buntQuality);
    landingDistance = Math.min(landingDistance, buntDistanceCap);
  }
  const isHardOutfieldHit = isHardOutfieldBounce || (isLiner && power >= 0.78 && landingDistance > 620);
  const isHardBattedBall = (isGrounder && power >= hardGrounderTuning.minPower)
    || isLineEdgeGrounder
    || isLineEdge
    || isLineLiner
    || isFenceLiner
    || isHardOutfieldHit
    || (!isRoutineFly && !isPopupFly && power >= 1.05);
  const isDeep = distance > defenseField.deepHitDistance;
  const ballSpeedMultiplier = battedBallSpeedMultiplier[trajectory] ?? 1;
  const baseBallTime = isGrounder
    ? 0.32
    : isLineEdgeGrounder
    ? 0.28
    : isPopupFly
    ? 1.08
    : isFrontDrop
    ? 1.5
    : isLineDrop
    ? 0.94
    : isFenceLiner
    ? 0.64
    : isLineEdge
    ? 0.58
    : isChaseFly
    ? 1.48
    : isFenceEdgeFly
    ? 1.76
    : isToweringFly
    ? 1.84
    : isRoutineFly
    ? 1.18
    : isLiner
    ? 0.58
    : 0.7;
  let baseBallSpeed = (isGrounder ? 1220 : isLiner ? 760 : isPopupFly ? 360 : isRoutineFly ? 540 : 620)
    * ballSpeedMultiplier
    * battedBallPaceMultiplier
    * (isHardBattedBall ? hardBattedBallSpeedScale : 1)
    * (isLineEdgeGrounder ? 1.22 : isLineEdge ? 1.12 : isLineLiner ? 1.08 : isFenceLiner ? 1.05 : isDeepDrive ? getDeepDriveBallPaceScale({
      powerProfile: batterHomeRunPower,
      contactScore,
      isSuperDeepDrive
    }) : isFrontDrop ? 0.7 : isFenceEdgeFly ? 0.66 : isToweringFly ? 0.68 : isChaseFly ? 0.78 : isSoftDrop ? 0.74 : isGrounder && power >= hardGrounderTuning.minPower ? hardGrounderTuning.initialSpeedScale : isHardOutfieldBounce ? 1.08 : isHardOutfieldHit ? 0.88 : 1);
  if (isBunt) {
    baseBallSpeed *= isPopupFly ? 0.72 : 0.26;
  }
  const homeRunQualityBoost = getHomeRunQuality({ contactScore, profileExitVelocity, power });
  const homeRunFrequencyDistanceBonus = !isBunt && fairDeepFlight && !isGrounder
    ? (homeRunFrequencyMultiplier - 1) * 80 * clamp(homeRunQualityBoost + (isFenceLiner ? 0.12 : 0), 0.28, 1)
    : 0;
  const homeRunTestDistance = distance + homeRunFrequencyDistanceBonus;
  const possibleHomerFlightDistance = getPossibleHomeRunFlightDistance(
    homeRunTestDistance,
    fenceTravelDistance,
    {
      isFenceEdgeFly,
      isToweringFly,
      isChaseFly,
      isDeepDrive,
      isFenceLiner,
      power,
      contactScore,
      profileExitVelocity,
      profileCarry,
      direction,
      unifiedHomerCandidate: Boolean(battedProfile?.unifiedHomerCandidate),
      centerZoneHomerCandidate: isCenterZoneHomerCandidate,
      scoreDrivenLongBall: isScoreDrivenLongBall,
      batterPowerRating: batterHomeRunPower.rating
    }
  );
  const possibleFenceOver = fairDeepFlight && fenceIntersection && possibleHomerFlightDistance > fenceTravelDistance;
  let possibleHomerHeight = isFenceEdgeFly
    ? randomBetween(330, 450) * bigOutfieldFlyHeightScale
    : isToweringFly
    ? randomBetween(390, 540) * bigOutfieldFlyHeightScale
    : isDeepDrive && isLiner
    ? randomBetween(185, 245)
      + batterHomeRunPower.standardDrive * 42
      + batterHomeRunPower.superPower * 4
    : isFenceLiner
    ? randomBetween(116, 206) + Math.max(0, power - 1.18) * 340
    : getBattedBallMaxHeight(trajectory, power, possibleHomerFlightDistance) * (isRoutineFly || isChaseFly || isDeepDrive ? bigOutfieldFlyHeightScale : 1);
  if (forceUnifiedWallHit) {
    possibleHomerHeight = Math.min(possibleHomerHeight, defenseField.fenceHeight * 0.88);
  }
  if (!isFenceLiner && !isLiner) {
    const homerQuality = getHomeRunQuality({ contactScore, profileExitVelocity, power });
    const nearWallLift = clamp((132 - getBattedBallDistanceMeters(possibleHomerFlightDistance)) / 24, 0, 1);
    possibleHomerHeight *= 1 + nearWallLift * (1 - homerQuality) * 0.22;
  }
  const heightAtFence = fenceIntersection
    ? getBattedBallHeightAtDistance(fenceTravelDistance, {
        flightDistance: possibleHomerFlightDistance,
        maxHeight: possibleHomerHeight,
        trajectory
      })
    : 0;
  const possibleHomerMeters = getBattedBallDistanceMeters(possibleHomerFlightDistance, {
    direction,
    fenceTravelDistance
  });
  const fenceMeters = getBattedBallDistanceMeters(fenceTravelDistance, {
    direction,
    fenceTravelDistance
  });
  const clearanceMeters = possibleHomerMeters - fenceMeters;
  const clearsFenceNaturally = possibleFenceOver
    && heightAtFence >= defenseField.fenceHeight;
  const possibleWallHit = clearsFenceNaturally
    && Math.random() < getNaturalFenceWallHitChance({
      powerProfile: batterHomeRunPower,
      contactScore,
      clearanceMeters,
      isLiner: isLiner || isFenceLiner,
      isDeepDrive,
      isFenceLiner,
      isFenceEdgeFly,
      isToweringFly,
      isChaseFly
    });
  const domeRule = getNextDomeBattedBallRule({
    direction,
    trajectory,
    distance,
    possibleHomerFlightDistance,
    possibleHomerHeight,
    fairDeepFlight,
    fenceTravelDistance,
    fenceIntersection,
    isGrounder,
    isLiner,
    isPopupFly,
    isRoutineFly,
    isToweringFly,
    isFenceEdgeFly,
    isDeepDrive,
    isFenceLiner
  });
  let fenceOver = domeRule?.kind === "homer"
    || (clearsFenceNaturally && !possibleWallHit);
  if (forceUnifiedWallHit && domeRule?.kind !== "groundRuleDouble") {
    fenceOver = false;
  }
  const cancelledHomerFallback = possibleWallHit ? "wall" : null;
  const flyWallHit = trajectory === "fly"
    ? distance >= fenceTravelDistance - (isFenceEdgeFly ? 38 : isDeepDrive ? 52 : 24)
    : isFenceLiner
      ? distance >= fenceTravelDistance - 70
      : isExcellentLineLiner
        ? distance >= fenceTravelDistance - 96
      : distance >= defenseField.wallHitDistance;
  let groundRuleDouble = domeRule?.kind === "groundRuleDouble";
  if (groundRuleDouble) fenceOver = false;
  let wallHit = !groundRuleDouble
    && !fenceOver
    && fairDeepFlight
    && fenceIntersection
    && (cancelledHomerFallback === "wall" || distance >= fenceTravelDistance || flyWallHit || possibleWallHit);
  if (forceUnifiedWallHit && !groundRuleDouble) {
    wallHit = true;
  }
  const flightDistance = fenceOver ? possibleHomerFlightDistance : wallHit ? fenceTravelDistance : groundRuleDouble ? Math.min(distance, fenceTravelDistance + 70) : landingDistance;
  const contactSpeedLift = getSolidContactSpeedLift(contactScore, profileExitVelocity);
  if (fenceOver) {
    baseBallSpeed *= getHomeRunBallSpeedScale({
      contactScore,
      profileExitVelocity,
      power,
      flightDistance,
      fenceTravelDistance,
      isLiner: isLiner || isFenceLiner,
      powerProfile: batterHomeRunPower
    });
  } else if (isHardBattedBall || isHardOutfieldHit || isLineLiner || isLineEdge || isLineEdgeGrounder || isFenceLiner) {
    baseBallSpeed *= contactSpeedLift;
  }
  const isDeepDriveFrontLanding = isDeepDrive
    && !isSuperDeepDrive
    && !wallHit
    && !fenceOver
    && landingDistance >= fenceDistance * 0.42
    && landingDistance <= fenceDistance * 0.78;
  const maxHeight = fenceOver
    ? possibleHomerHeight
    : isPopupFly ? randomBetween(170, 230)
    : isRoutineFly ? randomBetween(320, 430) * 1.28
    : isToweringFly ? randomBetween(360, 520) * bigOutfieldFlyHeightScale
    : isFenceEdgeFly ? randomBetween(330, 450) * bigOutfieldFlyHeightScale
    : isChaseFly ? randomBetween(240, 330) * bigOutfieldFlyHeightScale
    : isDeepDrive ? isSuperDeepDrive ? randomBetween(260, 390) : isDeepDriveFrontLanding ? randomBetween(78, 132) : randomBetween(108, 180)
    : isFrontDrop ? randomBetween(108, 158)
    : isHardOutfieldBounce ? randomBetween(132, 172)
    : isLineLiner ? randomBetween(34, 58)
    : isLineEdge ? randomBetween(18, 38)
    : isFenceLiner ? randomBetween(92, 176) + Math.max(0, power - 1.12) * 42
    : isSoftDrop ? 56 : getBattedBallMaxHeight(trajectory, power, flightDistance) * (trajectory === "fly" ? 1.32 : 1);
  const wallImpactHeight = wallHit ? clamp(heightAtFence || 74 + (power - 0.75) * 88, 18, defenseField.fenceHeight - 8) : 0;
  const rawTarget = {
    x: origin.x + direction.x * flightDistance,
    y: origin.y + direction.y * flightDistance
  };
  const target = wallHit && fenceIntersection
    ? fenceIntersection.point
    : fenceOver
      ? rawTarget
      : clampPointInsideFence(rawTarget, 12);
  const riverEntryPoint = !fenceOver && !wallHit && isPointInRiversideRiver(target)
    ? { ...target }
    : null;
  if (riverEntryPoint) {
    groundRuleDouble = true;
  }
  const wallReboundTarget = wallHit
    ? clampPointInsideFence({
        x: target.x - direction.x * getWallReboundDistance(power),
        y: target.y - direction.y * getWallReboundDistance(power)
      }, 42)
    : null;
  const lowGravityTimeScale = !isGrounder && !isBunt ? (getCurrentStadium().lowGravityTimeScale ?? 1) : 1;
  const ballTime = (baseBallTime / (ballSpeedMultiplier * battedBallPaceMultiplier) + flightDistance / baseBallSpeed)
    * lowGravityTimeScale
    * (battedProfile?.unifiedFlightTimeScale ?? 1);
  const flightDistanceMeters = getBattedBallDistanceMeters(flightDistance, {
    direction,
    fenceTravelDistance
  });
  const maxHeightMeters = getBattedBallDistanceMeters(maxHeight, {
    direction,
    fenceTravelDistance
  });
  const launchAngleDegrees = getBattedBallLaunchAngleDegrees({
    trajectory,
    isGrounder,
    isLineEdgeGrounder,
    maxHeightMeters,
    flightDistanceMeters,
    profileLaunchAngle: battedProfile?.launchAngle
  });
  const exitSpeedKmh = getDisplayExitSpeedKmh({
    power,
    profile: battedProfile,
    trajectory,
    isGrounder,
    isLiner,
    isDeepDrive,
    isFenceLiner,
    isLineEdgeGrounder,
    fenceOver,
    flightDistanceMeters,
    ballTime,
    launchAngle: launchAngleDegrees
  });
  return { origin, direction, target, wallReboundTarget, distance, landingDistance, flightDistance, flightDistanceMeters, maxHeightMeters, launchAngleDegrees, exitSpeedKmh, battedProfile, power, trajectory, isGrounder, isLiner, isPopupFly, isRoutineFly, isLineLiner, isLineDrop, isFenceLiner, isFrontDrop, isLineEdge, isLineEdgeGrounder, isCenterReturnGrounder, isCenterReturnLiner, isCenterReturn: isCenterReturnGrounder || isCenterReturnLiner, isChaseFly, isToweringFly, isFenceEdgeFly, isDeepDrive, isSuperDeepDrive, isSoftDrop, isHardOutfieldHit, isHardOutfieldBounce, isDeep, isBunt, fenceOver, wallHit, cancelledHomerFallback, groundRuleDouble, riverEntryPoint, domeRule, ballTime, maxHeight, wallImpactHeight };
}

function getNextDomeBattedBallRule({
  direction,
  trajectory,
  distance,
  possibleHomerFlightDistance,
  possibleHomerHeight,
  fairDeepFlight,
  fenceTravelDistance,
  fenceIntersection,
  isGrounder,
  isLiner,
  isPopupFly,
  isRoutineFly,
  isToweringFly,
  isFenceEdgeFly,
  isDeepDrive,
  isFenceLiner
} = {}) {
  if (!getCurrentStadium().hasDome || isGrounder || !Number.isFinite(possibleHomerHeight)) return null;
  const fair = isFairDirection(direction);
  const domeContactHeight = 455;
  const innerRingHeight = 510;
  const outerRingHeight = 560;
  const depthRatio = fenceTravelDistance > 0 ? distance / fenceTravelDistance : 0;
  const highEnough = possibleHomerHeight >= domeContactHeight;
  if (!highEnough && !isPopupFly) return null;
  if (fair && possibleHomerHeight >= outerRingHeight && depthRatio >= 0.82 && (isFenceEdgeFly || isToweringFly || isDeepDrive || isFenceLiner)) {
    return { kind: "homer", label: "スーパーリング本塁打", contact: "outerRing" };
  }
  if (fair && possibleHomerHeight >= innerRingHeight && depthRatio >= 0.54 && depthRatio < 0.82) {
    return { kind: "groundRuleDouble", label: "スーパーリング二塁打", contact: "innerRing" };
  }
  if (possibleHomerHeight >= domeContactHeight || isPopupFly) {
    return { kind: "inPlay", label: "天井インプレイ", contact: "ceiling" };
  }
  return null;
}

function getSolidContactSpeedLift(contactScore = 0.5, exitVelocity = 0.6) {
  const scoreLift = clamp((contactScore - 0.58) / 0.24, 0, 1) * 0.18;
  const velocityLift = clamp((exitVelocity - 0.62) / 0.34, 0, 1) * 0.12;
  return 1 + scoreLift + velocityLift;
}

function getHomeRunQuality({ contactScore = 0.5, profileExitVelocity = 1, power = 1.2 } = {}) {
  return clamp(
    contactScore * 0.42
      + clamp((profileExitVelocity - 0.84) / 0.64, 0, 1) * 0.3
      + clamp((power - 1.18) / 1.18, 0, 1) * 0.28,
    0,
    1
  );
}

function getDeepDriveBallPaceScale({ powerProfile = null, contactScore = 0.5, isSuperDeepDrive = false } = {}) {
  const resolvedPower = powerProfile || getHomeRunPowerProfile();
  const standardPace = homeRunVarietyTuning.standardDeepDrivePaceMin
    + resolvedPower.standardDrive
      * (homeRunVarietyTuning.standardDeepDrivePaceMax - homeRunVarietyTuning.standardDeepDrivePaceMin);
  const contactPace = clamp((contactScore - 0.58) / 0.42, 0, 1) * 0.08;
  const superPace = resolvedPower.superPower
    * homeRunVarietyTuning.superDeepDrivePacePerPoint;
  return clamp(
    standardPace + contactPace + superPace + (isSuperDeepDrive && resolvedPower.superPower > 0 ? 0.08 : 0),
    homeRunVarietyTuning.standardDeepDrivePaceMin,
    homeRunVarietyTuning.maxDeepDrivePace
  );
}

function getNaturalFenceWallHitChance({
  powerProfile = null,
  contactScore = 0.5,
  clearanceMeters = 0,
  isLiner = false,
  isDeepDrive = false,
  isFenceLiner = false,
  isFenceEdgeFly = false,
  isToweringFly = false,
  isChaseFly = false
} = {}) {
  if (!isDeepDrive && !isFenceLiner && !isFenceEdgeFly && !isToweringFly && !isChaseFly) return 0;
  const resolvedPower = powerProfile || getHomeRunPowerProfile();
  const baseRate = isLiner
    ? homeRunVarietyTuning.lowPowerLinerWallRate
      + resolvedPower.standardDrive
        * (homeRunVarietyTuning.highPowerLinerWallRate - homeRunVarietyTuning.lowPowerLinerWallRate)
    : homeRunVarietyTuning.lowPowerFlyWallRate
      + resolvedPower.standardDrive
        * (homeRunVarietyTuning.highPowerFlyWallRate - homeRunVarietyTuning.lowPowerFlyWallRate);
  const clearanceRelief = clamp(clearanceMeters / 28, 0, 1) * (isLiner ? 0.2 : 0.08);
  const contactRelief = clamp((contactScore - 0.62) / 0.38, 0, 1) * (isLiner ? 0.08 : 0.04);
  const superPowerRelief = clamp(resolvedPower.superPower * 0.035, 0, 0.32);
  return clamp(
    baseRate - clearanceRelief - contactRelief - superPowerRelief,
    resolvedPower.superPower > 0 ? 0.01 : 0.06,
    0.72
  );
}

function shouldReducePowerHitterHomeRunToWallHit(traits = {}) {
  if (!traits.fenceOver) return false;
  return Math.random() < getNaturalFenceWallHitChance({
    powerProfile: getHomeRunPowerProfile(traits.batterPowerRating),
    contactScore: traits.contactScore,
    clearanceMeters: traits.clearanceMeters,
    isLiner: traits.isLiner,
    isDeepDrive: traits.isDeepDrive,
    isFenceLiner: traits.isFenceLiner,
    isFenceEdgeFly: traits.isFenceEdgeFly,
    isToweringFly: traits.isToweringFly,
    isChaseFly: traits.isChaseFly
  });
}

function getHomeRunBallSpeedScale({ contactScore = 0.5, profileExitVelocity = 1, power = 1.2, flightDistance = 0, fenceTravelDistance = defenseField.fenceDistance, isLiner = false, powerProfile = null } = {}) {
  const resolvedPower = powerProfile || getHomeRunPowerProfile();
  if (isLiner) {
    return clamp(
      0.84
        + getHomeRunQuality({ contactScore, profileExitVelocity, power }) * 0.12
        + resolvedPower.standardDrive * 0.1
        + resolvedPower.superPower * 0.025,
      0.84,
      1.2
    );
  }
  const quality = getHomeRunQuality({ contactScore, profileExitVelocity, power });
  const clearance = clamp((flightDistance - fenceTravelDistance) / 420, 0, 1);
  return clamp(0.72 + quality * 0.22 + clearance * 0.14, 0.72, 1.08);
}

function getDisplayExitSpeedKmh({ power = 0.5, profile = null, trajectory = "liner", isGrounder = false, isLiner = false, isDeepDrive = false, isFenceLiner = false, isLineEdgeGrounder = false, fenceOver = false, flightDistanceMeters = null, ballTime = null, launchAngle = null } = {}) {
  const exitVelocity = clamp(profile?.exitVelocity ?? power, 0.08, 1.85);
  const feedbackScore = clamp(profile?.feedbackScore ?? profile?.quality ?? 0.5, 0, 1);
  const trajectoryBonus = isLineEdgeGrounder ? 6 : isGrounder ? -4 : isLiner ? 8 : 0;
  const strongBonus = isDeepDrive || isFenceLiner ? 8 : 0;
  const solidContactBonus = fenceOver ? 0 : clamp((feedbackScore - 0.58) / 0.24, 0, 1) * 16;
  const homeRunFloatPenalty = fenceOver && trajectory === "fly"
    ? 12 * (1 - getHomeRunQuality({ contactScore: feedbackScore, profileExitVelocity: exitVelocity, power }))
    : 0;
  const contactSpeed = 72 + exitVelocity * 54 + feedbackScore * 28 + trajectoryBonus + strongBonus + solidContactBonus - homeRunFloatPenalty;
  const measuredSpeed = getMeasuredExitSpeedKmh({
    flightDistanceMeters,
    ballTime,
    launchAngle: Number.isFinite(launchAngle) ? launchAngle : profile?.launchAngle,
    isGrounder,
    isLiner,
    fenceOver
  });
  const speed = Number.isFinite(measuredSpeed)
    ? measuredSpeed * 0.82 + contactSpeed * 0.18
    : contactSpeed;
  const displaySpeed = Number.isFinite(measuredSpeed) ? speed : isDeepDrive ? speed * deepDriveBallSpeedScale : speed;
  return Math.round(clamp(displaySpeed, 55, 195));
}

function getMeasuredExitSpeedKmh({ flightDistanceMeters = null, ballTime = null, launchAngle = null, isGrounder = false, isLiner = false, fenceOver = false } = {}) {
  if (!Number.isFinite(flightDistanceMeters) || flightDistanceMeters <= 0) return null;
  if (isGrounder) return null;
  const angle = clamp(Math.abs(Number.isFinite(launchAngle) ? launchAngle : isLiner ? 16 : 26), 4, 48);
  const sin2Theta = Math.sin(degreesToRadians(angle * 2));
  const projectileSpeed = sin2Theta > 0.12
    ? Math.sqrt((flightDistanceMeters * 9.80665) / sin2Theta) * 3.6
    : null;
  if (!Number.isFinite(projectileSpeed)) return null;
  const trajectoryFactor = fenceOver ? 1.18 : isLiner ? 1.32 : 1.12;
  return projectileSpeed * trajectoryFactor;
}

function getBattedBallDistanceMeters(distance, options = {}) {
  const metersPerFieldUnit = getMetersPerBattedBallFieldUnit(options);
  return Math.round(Math.max(0, distance) * metersPerFieldUnit);
}

function getFieldUnitsFromMeters(meters) {
  const stadium = getCurrentStadium();
  const centerMeters = Number.isFinite(stadium.centerFenceMeters) ? stadium.centerFenceMeters : realFieldMetrics.centerFieldFenceMeters;
  return Math.max(0, meters) * (defenseField.fenceDistance / centerMeters);
}

function getBattedBallLaunchAngleDegrees({ trajectory = "liner", isGrounder = false, isLineEdgeGrounder = false, maxHeightMeters = null, flightDistanceMeters = null, profileLaunchAngle = null } = {}) {
  if (isGrounder || isLineEdgeGrounder || trajectory === "grounder") {
    return Math.round(clamp(Number.isFinite(profileLaunchAngle) ? profileLaunchAngle : -2, -8, 5));
  }
  if (Number.isFinite(maxHeightMeters) && maxHeightMeters > 0 && Number.isFinite(flightDistanceMeters) && flightDistanceMeters > 0) {
    const visualAngle = radiansToDegrees(Math.atan((4 * maxHeightMeters) / flightDistanceMeters));
    return Math.round(clamp(visualAngle, 4, 58));
  }
  return Math.round(clamp(Number.isFinite(profileLaunchAngle) ? profileLaunchAngle : 16, -8, 58));
}

function getMetersPerBattedBallFieldUnit({ direction = null, fenceTravelDistance = null } = {}) {
  const actualFenceMeters = getActualFenceDistanceMetersForDirection(direction);
  const fieldFenceUnits = Number.isFinite(fenceTravelDistance) && fenceTravelDistance > 0
    ? fenceTravelDistance
    : defenseField.fenceDistance;
  return actualFenceMeters / fieldFenceUnits;
}

function getActualFenceDistanceMetersForDirection(direction = null) {
  const stadium = getCurrentStadium();
  const centerMeters = Number.isFinite(stadium.centerFenceMeters) ? stadium.centerFenceMeters : realFieldMetrics.centerFieldFenceMeters;
  const lineMeters = Number.isFinite(stadium.lineFenceMeters) ? stadium.lineFenceMeters : realFieldMetrics.leftRightFieldFenceMeters;
  if (stadium.id === "aozora") return centerMeters;
  if (!direction || !Number.isFinite(direction.x) || !Number.isFinite(direction.y)) {
    return centerMeters;
  }
  const lateralRatio = clamp(Math.abs(direction.x), 0, Math.sin(degreesToRadians(realFieldMetrics.fairLineAngleDegrees)));
  const foulRatio = Math.sin(degreesToRadians(realFieldMetrics.fairLineAngleDegrees));
  const towardLine = Math.pow(clamp(lateralRatio / foulRatio, 0, 1), 1.15);
  return centerMeters - (centerMeters - lineMeters) * towardLine;
}

function getBattedBallMetricText(battedBall) {
  if (!battedBall) return "";
  if (battedBall.fenceOver) return `飛距離 ${battedBall.flightDistanceMeters ?? getBattedBallDistanceMeters(battedBall.flightDistance ?? 0)}m`;
  return `打球速度 ${battedBall.exitSpeedKmh ?? getDisplayExitSpeedKmh({ power: battedBall.power, profile: battedBall.battedProfile, trajectory: battedBall.trajectory, isGrounder: battedBall.isGrounder, isLiner: battedBall.isLiner, isDeepDrive: battedBall.isDeepDrive, isFenceLiner: battedBall.isFenceLiner, isLineEdgeGrounder: battedBall.isLineEdgeGrounder, fenceOver: battedBall.fenceOver })}km/h`;
}

function shouldShortenBigOutfieldFly(traits) {
  if (traits?.unifiedHomerCandidate) return false;
  return Boolean(traits?.isChaseFly || traits?.isFenceEdgeFly || traits?.isDeepDrive || traits?.isToweringFly);
}

function getPossibleHomeRunFlightDistance(distance, fenceTravelDistance, traits = {}) {
  const direction = traits.direction || null;
  const fenceMeters = getBattedBallDistanceMeters(fenceTravelDistance, { direction, fenceTravelDistance });
  const rawMeters = getBattedBallDistanceMeters(distance, { direction, fenceTravelDistance });
  const contactScore = clamp(traits.contactScore ?? 0.5, 0, 1);
  const profileExitVelocity = clamp(traits.profileExitVelocity ?? traits.power ?? 1, 0.08, 1.85);
  const profileCarry = clamp(traits.profileCarry ?? traits.power ?? 1, 0.08, 1.95);
  const power = clamp(traits.power ?? 1.2, 0.08, 3);
  const batterHomeRunPower = getHomeRunPowerProfile(traits.batterPowerRating ?? 5);
  const quality = getHomeRunQuality({ contactScore, profileExitVelocity, power });
  const exitQuality = clamp((profileExitVelocity - 0.88) / 0.76, 0, 1);
  const carryQuality = clamp((profileCarry - 0.88) / 0.78, 0, 1);
  const powerQuality = clamp((power - 1.18) / 1.22, 0, 1);
  const eliteQuality = clamp((quality - 0.82) / 0.18, 0, 1);
  const lowPowerCarryPenaltyMeters = clamp((5 - batterHomeRunPower.standardPower) / 4, 0, 1) * 14;
  const batterPowerCarryMeters = batterHomeRunPower.standardDrive * 12;
  const ordinaryCarryCompression = clamp((rawMeters - 118) / 48, 0, 1) * (0.34 + (1 - eliteQuality) * 0.22);
  const compressedRawMeters = rawMeters - Math.max(0, rawMeters - 118) * ordinaryCarryCompression;
  const rawCarryMeters = Math.max(0, rawMeters - 98) * clamp(0.025 + quality * 0.055 + exitQuality * 0.018, 0.025, 0.1);
  const modestFlyFactor = clamp((rawMeters - 90) / 24, 0, 1);
  const naturalMeters =
    compressedRawMeters
    + rawCarryMeters
    + Math.pow(quality, 1.35) * 3.5 * modestFlyFactor
    + Math.pow(exitQuality, 1.3) * 3 * modestFlyFactor
    + Math.pow(carryQuality, 1.25) * 2.5 * modestFlyFactor
    + Math.pow(powerQuality, 1.2) * 2.5 * modestFlyFactor
    + Math.pow(eliteQuality, 1.55) * 18
    + batterPowerCarryMeters * modestFlyFactor
    - lowPowerCarryPenaltyMeters * modestFlyFactor
    + batterHomeRunPower.carryBonusMeters * modestFlyFactor;
  const styleBonus = traits.isFenceEdgeFly
    ? -7
    : traits.isFenceLiner
      ? -1 + exitQuality * 2.5
      : traits.isChaseFly
        ? -4 + quality * 2
        : traits.isToweringFly
          ? 1 + carryQuality * 3
          : traits.isDeepDrive
            ? -2 + quality * 3
            : 0;
  const scoreLimitedMaximumMeters = contactScore < 0.7
    ? 136 + clamp((contactScore - 0.55) / 0.15, 0, 1) * 7 + exitQuality * 2 + carryQuality * 2
    : contactScore < 0.8
      ? 145 + clamp((contactScore - 0.7) / 0.1, 0, 1) * 10 + exitQuality * 3 + carryQuality * 3
      : 154 + clamp((contactScore - 0.8) / 0.2, 0, 1) * 18 + exitQuality * 4 + carryQuality * 4;
  const minimumOverFenceMeters = fenceMeters + (contactScore >= 0.8 ? 4 : 2);
  const absoluteMaximumMeters =
    138
    + batterHomeRunPower.standardDrive * 22
    + batterHomeRunPower.superPower * 2;
  const maximumMeters = clamp(
    Math.max(minimumOverFenceMeters, scoreLimitedMaximumMeters + batterHomeRunPower.carryBonusMeters),
    0,
    absoluteMaximumMeters
  );
  const lowGravityCarryScale = getCurrentStadium().hasSpaceStadium ? (getCurrentStadium().airCarryScale ?? 1) : 1;
  const candidateCarryMeters = traits.unifiedHomerCandidate
    ? randomBetween(-14, 4)
      + quality * 2
      + batterHomeRunPower.standardDrive * 3
      + batterHomeRunPower.superPower * 1.1
    : 0;
  const centerCarryMeters = traits.centerZoneHomerCandidate ? 2.5 : 0;
  const scoreCarryMeters = traits.scoreDrivenLongBall ? 2 : 0;
  const finalMeters = clamp(
    naturalMeters
      + styleBonus
      + candidateCarryMeters
      + centerCarryMeters
      + scoreCarryMeters,
    0,
    maximumMeters
  ) * lowGravityCarryScale;
  const metersPerFieldUnit = fenceMeters / Math.max(1, fenceTravelDistance);
  return finalMeters / Math.max(0.001, metersPerFieldUnit);
}

function getWallReboundDistance(power) {
  return clamp(
    wallReboundTuning.minDistance + Math.max(0, power - 0.75) * wallReboundTuning.powerDistance,
    wallReboundTuning.minDistance,
    wallReboundTuning.maxDistance
  );
}

function isHardGrounder(battedBall) {
  return Boolean(battedBall?.isGrounder && battedBall.power >= hardGrounderTuning.minPower);
}

function isHardGrounderInfieldPlayable(battedBall) {
  if (!isHardGrounder(battedBall)) return false;
  if (battedBall.wallHit || battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  const landingDistance = battedBall.landingDistance ?? battedBall.flightDistance ?? getFenceDistance(battedBall.target);
  return landingDistance <= defenseField.fenceDistance * 0.76;
}

function getBattedBallMaxHeight(trajectory, power, flightDistance) {
  if (trajectory === "grounder") return 12;
  if (trajectory === "liner") return 30 + clamp(power, 0, 1.3) * 24;
  return 150 + clamp((flightDistance - 420) / 900, 0, 1) * 120 + clamp((power - 0.85) / 0.55, 0, 1) * 90;
}

function chooseDefenseFielder(fielders, battedBall) {
  const eligibleFielders = getEligibleDefenseFielders(fielders, battedBall);
  return eligibleFielders.reduce((best, fielder) => {
    const fieldingPoint = getDefenseFielderRouteTarget(fielder, battedBall);
    const distance = Math.hypot(fieldingPoint.x - fielder.x, fieldingPoint.y - fielder.y);
    const roleFit = getDefenseRoleFit(fielder, battedBall);
    const speed = getFielderSpeed(fielder);
    const quickBuntReaction = fielder.role === "P" && isPitcherHandledGrounder(battedBall);
    const reactionDelay = quickBuntReaction ? getFielderReactionDelay({ ...fielder, quickBuntReaction }) : getFielderReactionDelay(fielder);
    const score = reactionDelay + distance / speed - roleFit;
    const candidate = { ...fielder, quickBuntReaction, distanceToTarget: distance, fieldingPoint, roleFit, reactionDelay, score };
    return !best || candidate.score < best.score ? candidate : best;
  }, null);
}

function chooseBuntDefenseFielder(fielders, battedBall) {
  const candidates = fielders.filter((fielder) => fielder.role === "P" || isTemporaryInfielderRole(fielder.role));
  const target = battedBall?.target || { x: field.plateX, y: field.plateY - 180 };
  return (candidates.length ? candidates : fielders).reduce((best, fielder) => {
    const fieldingPoint = getClosestPointOnBattedBallRoute(fielder, battedBall) || target;
    const distanceToTarget = Math.hypot((fielder.x ?? 0) - fieldingPoint.x, (fielder.y ?? 0) - fieldingPoint.y);
    const pitcherChargeBonus = fielder.role === "P" ? -260 : 0;
    const score = distanceToTarget + pitcherChargeBonus;
    if (!best || score < best.score) return { ...fielder, quickBuntReaction: fielder.role === "P", fieldingPoint, distanceToTarget, score };
    return best;
  }, null) || chooseDefenseFielder(fielders, battedBall);
}

function getDefenseFielderRouteTarget(fielder, battedBall) {
  if (isInfielderRole(fielder?.role) && (isPotentialInfieldRouteBall(battedBall) || isInfielderNearGrounderRoute(fielder, battedBall) || isInfielderReactionRouteBall(fielder, battedBall) || isInfielderAwareOfRouteBall(fielder, battedBall))) {
    return getClosestPointOnBattedBallRoute(fielder, battedBall);
  }
  return battedBall?.target || { x: fielder?.x ?? field.centerX, y: fielder?.y ?? 250 };
}

function getClosestPointOnBattedBallRoute(fielder, battedBall) {
  const origin = battedBall.origin || { x: field.plateX, y: field.plateY - 10 };
  const target = battedBall.target || origin;
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const lengthSq = dx * dx + dy * dy;
  if (lengthSq <= 1) return target;
  const rawT = ((fielder.x - origin.x) * dx + (fielder.y - origin.y) * dy) / lengthSq;
  const t = clamp(rawT, 0.22, 0.86);
  return {
    x: origin.x + dx * t,
    y: origin.y + dy * t
  };
}

function getBattedBallRouteProgressForPoint(point, battedBall) {
  const origin = battedBall.origin || { x: field.plateX, y: field.plateY - 10 };
  const target = battedBall.target || origin;
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const lengthSq = dx * dx + dy * dy;
  if (lengthSq <= 1) return 1;
  return clamp(((point.x - origin.x) * dx + (point.y - origin.y) * dy) / lengthSq, 0, 1);
}

function getBattedBallRouteArrivalTime(point, battedBall) {
  const progress = getBattedBallRouteProgressForPoint(point, battedBall);
  return Math.max(0.08, (battedBall.ballTime ?? 0.6) * progress);
}

// 外野に落ちる打球では、内野手の経路チェックに当たっても外野手を候補から外さない。
// 以前は外野前に落ちるライナーが「内野手だけ」に絞られ、担当から外れた外野手が
// getDefenseFielderMovementTarget で null を返して、その場から一歩も動かなかった。
// (センター前の落球で外野手がフェンス手前に突っ立って見えるのはこれが原因)
function withOutfieldersWhenBallLandsOutfield(infielders, fielders, battedBall) {
  if (!isOutfieldFrontLandingBall(battedBall) && !isOutfieldFlyLandingBall(battedBall)) return infielders;
  const outfielders = fielders.filter((fielder) => !isInfielderRole(fielder.role));
  return outfielders.length ? [...infielders, ...outfielders] : infielders;
}

function getEligibleDefenseFielders(fielders, battedBall) {
  // 「打球の実際の経路が内野手のそばを通るか」を見るチェックは、
  // 「だいたいどこに落ちるか」で外野手だけに絞ってしまう大まかな分岐より先に見る。
  // 以前はライナー・低い打球用の反応チェックが isOutfieldFlyLandingBall などの
  // 外野送り分岐より後ろにあったため、外野着地と判定された低めのライナーは
  // 経路チェックまで処理が届かず、そばを通っても内野手が全く反応しなかった。
  const routeReactionInfielders = battedBall?.isGrounder
    ? fielders.filter((fielder) => isInfielderReactionRouteBall(fielder, battedBall))
    : [];
  if (routeReactionInfielders.length) return routeReactionInfielders;
  const lineDropRouteInfielders = battedBall?.isLineDrop
    ? fielders.filter((fielder) => isInfielderLineDropRouteBall(fielder, battedBall))
    : [];
  if (lineDropRouteInfielders.length) return withOutfieldersWhenBallLandsOutfield(lineDropRouteInfielders, fielders, battedBall);
  if (isSlowInfieldDropBall(battedBall)) {
    return fielders.filter((fielder) => isInfielderRole(fielder.role));
  }
  const linerRouteReactionInfielders = battedBall?.isLiner && !battedBall.isLineLiner
    ? fielders.filter((fielder) => isInfielderReactionRouteBall(fielder, battedBall))
    : [];
  if (linerRouteReactionInfielders.length) return withOutfieldersWhenBallLandsOutfield(linerRouteReactionInfielders, fielders, battedBall);
  if (battedBall?.isPopupFly) {
    return fielders.filter((fielder) => fielder.role === "P" || isTemporaryInfielderRole(fielder.role));
  }
  if (isOutfieldFlyLandingBall(battedBall)) {
    return fielders.filter((fielder) => !isInfielderRole(fielder.role));
  }
  if (isOutfieldFrontLandingBall(battedBall)) {
    return fielders.filter((fielder) => !isInfielderRole(fielder.role));
  }
  if (battedBall?.isGrounder && isHardGrounder(battedBall)) {
    const activeInfielders = fielders.filter((fielder) => isInfielderAttemptRouteBall(fielder, battedBall));
    if (activeInfielders.length) return activeInfielders;
  }
  if (battedBall?.isGrounder && isPotentialInfieldRouteBall(battedBall)) {
    return fielders.filter((fielder) => isInfielderRole(fielder.role));
  }
  const routeAttemptInfielders = battedBall?.isGrounder
    ? fielders.filter((fielder) => isInfielderAttemptRouteBall(fielder, battedBall) || isInfielderNearGrounderRoute(fielder, battedBall))
    : [];
  if (routeAttemptInfielders.length) return routeAttemptInfielders;
  if (isDeepOutfieldBall(battedBall)) {
    const awareInfielders = fielders.filter((fielder) => isInfielderAwareOfRouteBall(fielder, battedBall));
    return fielders.filter((fielder) => !isInfielderRole(fielder.role) || awareInfielders.some((infielder) => infielder.role === fielder.role));
  }
  if (battedBall?.isGrounder) {
    return fielders.filter((fielder) => isInfielderRole(fielder.role));
  }
  return fielders;
}

function isInfielderLineDropRouteBall(fielder, battedBall) {
  if (!fielder || !isInfielderRole(fielder.role)) return false;
  if (!battedBall?.isLineDrop || battedBall.wallHit || battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  const point = getClosestPointOnBattedBallRoute(fielder, battedBall);
  const progress = getBattedBallRouteProgressForPoint(point, battedBall);
  if (progress < 0.1 || progress > 0.9) return false;
  if (!isInfielderPlayableRouteHeight(fielder, battedBall, point, 18)) return false;
  const distance = Math.hypot(point.x - fielder.x, point.y - fielder.y);
  const fielding = getFielderFieldingRating(fielder);
  const speed = getFielderSpeedRating(fielder);
  const routeRadius = 82 + fielding * 16 + speed * 9;
  return distance <= routeRadius;
}

function isInfielderNearGrounderRoute(fielder, battedBall) {
  if (!fielder || !isTemporaryInfielderRole(fielder.role)) return false;
  if (!battedBall?.isGrounder || battedBall.wallHit || battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  const point = getClosestPointOnBattedBallRoute(fielder, battedBall);
  const progress = getBattedBallRouteProgressForPoint(point, battedBall);
  if (progress < 0.08 || progress > 0.94) return false;
  const distance = Math.hypot(point.x - fielder.x, point.y - fielder.y);
  const fielding = getFielderFieldingRating(fielder);
  const speed = getFielderSpeedRating(fielder);
  const power = battedBall.power ?? 0.8;
  const ballTime = battedBall.ballTime ?? 0.7;
  const softRollBonus = power <= 0.9 || ballTime >= 0.62 ? 96 : 28;
  const routeRadius = 116 + fielding * 18 + speed * 11 + softRollBonus;
  return distance <= routeRadius;
}

function isInfielderAwareOfRouteBall(fielder, battedBall) {
  if (!fielder || !isTemporaryInfielderRole(fielder.role)) return false;
  if (!battedBall || (!battedBall.isGrounder && !battedBall.isLiner && !battedBall.isLineDrop)) return false;
  if (battedBall.isLineLiner || battedBall.isPopupFly || battedBall.wallHit || battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  if (battedBall.isHardOutfieldBounce && !isHardGrounderInfieldPlayable(battedBall)) return false;
  const point = getClosestPointOnBattedBallRoute(fielder, battedBall);
  const progress = getBattedBallRouteProgressForPoint(point, battedBall);
  if (progress < 0.12 || progress > 0.82) return false;
  const distance = Math.hypot(point.x - fielder.x, point.y - fielder.y);
  const fielding = getFielderFieldingRating(fielder);
  const speed = getFielderSpeedRating(fielder);
  if (!isInfielderPlayableRouteHeight(fielder, battedBall, point, 6)) return false;
  const awarenessRadius = 96 + fielding * 18 + speed * 10 + (battedBall.isGrounder ? 80 : 28) + (isHardGrounder(battedBall) ? 120 : 0);
  return distance <= awarenessRadius;
}

function isInfielderPlayableRouteHeight(fielder, battedBall, point, bonus = 0) {
  if (!battedBall || battedBall.isGrounder) return true;
  const fielding = getFielderFieldingRating(fielder);
  const ballHeight = getBattedBallRouteHeightAtPoint(point, battedBall);
  const playableHeight = 58 + fielding * 5 + bonus;
  return ballHeight <= playableHeight;
}

function getBattedBallRouteHeightAtPoint(point, battedBall) {
  if (!battedBall || battedBall.isGrounder) return 0;
  const defaultHeight = battedBall.isLiner ? 36 : 0;
  const maxHeight = Number.isFinite(battedBall.maxHeight) ? battedBall.maxHeight : defaultHeight;
  return getParabolicArcHeight(getBattedBallRouteProgressForPoint(point, battedBall), maxHeight);
}

function isInfielderReactionRouteBall(fielder, battedBall) {
  if (!fielder || !isInfielderRole(fielder.role)) return false;
  if (!battedBall || (!battedBall.isGrounder && !battedBall.isLiner && !battedBall.isLineDrop)) return false;
  if (battedBall.isLineLiner) return false;
  if (battedBall.isHardOutfieldBounce && !isHardGrounderInfieldPlayable(battedBall)) return false;
  if (isDeepLineLinerPastInfield(battedBall)) return false;
  if (battedBall.wallHit || battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  if (!Number.isFinite(battedBall.ballTime)) return false;
  const point = getClosestPointOnBattedBallRoute(fielder, battedBall);
  const progress = getBattedBallRouteProgressForPoint(point, battedBall);
  if (progress < 0.1 || progress > 0.96) return false;
  if (!isInfielderPlayableRouteHeight(fielder, battedBall, point)) return false;
  if (getInfielderRouteBodyCatch(fielder, battedBall, point).caught) return true;
  const distance = Math.hypot(point.x - fielder.x, point.y - fielder.y);
  const fielding = getFielderFieldingRating(fielder);
  const routeRadius = defenseRangeTuning.closeHardBallRadius + fielding * 13 + (isTemporaryInfielderRole(fielder.role) ? 88 : 36);
  const linerRouteScale = battedBall.isLiner && isTemporaryInfielderRole(fielder.role) ? 0.736 : 1;
  const gapGrounderRouteScale = battedBall.grounderGap && isTemporaryInfielderRole(fielder.role)
    ? clamp(0.72 + fielding * 0.035, 0.78, 1.08)
    : 1;
  const hardGrounderRouteScale = isHardGrounder(battedBall) && isTemporaryInfielderRole(fielder.role)
    ? 2.18
    : 1;
  const infieldBounceScale = isTemporaryInfielderRole(fielder.role)
    ? isSlowInfieldBounceGrounder(battedBall)
      ? 2.05
      : isMiddleInfieldBounceGrounder(battedBall)
        ? 1.72
        : isSoftInfieldGrounder(battedBall)
          ? 1.82
          : 1
    : 1;
  return distance <= routeRadius * linerRouteScale * gapGrounderRouteScale * hardGrounderRouteScale * infieldBounceScale;
}

function isInfielderAttemptRouteBall(fielder, battedBall) {
  if (!fielder || !isInfielderRole(fielder.role)) return false;
  if (!battedBall || (!battedBall.isGrounder && !battedBall.isLiner && !battedBall.isLineDrop)) return false;
  if (battedBall.isLineLiner) return false;
  if (battedBall.isHardOutfieldBounce && !isHardGrounderInfieldPlayable(battedBall)) return false;
  if (isDeepLineLinerPastInfield(battedBall)) return false;
  if (battedBall.wallHit || battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  const landingDistance = battedBall.landingDistance ?? battedBall.flightDistance ?? getFenceDistance(battedBall.target);
  if (fielder.role === "P" && landingDistance > defenseField.fenceDistance * 0.52) return false;
  if (battedBall.isGrounder && landingDistance > defenseField.fenceDistance * (isHardGrounder(battedBall) ? 0.78 : 0.64)) return false;
  const point = getClosestPointOnBattedBallRoute(fielder, battedBall);
  const progress = getBattedBallRouteProgressForPoint(point, battedBall);
  if (progress < 0.1 || progress > 0.97) return false;
  if (!isInfielderPlayableRouteHeight(fielder, battedBall, point, 10)) return false;
  const distance = Math.hypot(point.x - fielder.x, point.y - fielder.y);
  const lateralMove = Math.abs(point.x - fielder.x);
  const fielding = getFielderFieldingRating(fielder);
  const hardGrounder = isHardGrounder(battedBall);
  const attemptRadius = defenseRangeTuning.closeHardBallRadius
    + fielding * (hardGrounder ? 30 : 18)
    + (isTemporaryInfielderRole(fielder.role) ? (hardGrounder ? 286 : 158) : 104)
    + (battedBall.grounderGap ? 126 : 0)
    + (hardGrounder && isTemporaryInfielderRole(fielder.role) ? 260 : 0)
    + (isMiddleInfieldBounceGrounder(battedBall) && isTemporaryInfielderRole(fielder.role) ? 132 : 0)
    + (isSlowInfieldBounceGrounder(battedBall) && isTemporaryInfielderRole(fielder.role) ? 132 : 0)
    + (isSoftInfieldGrounder(battedBall) && isTemporaryInfielderRole(fielder.role) ? 104 : 0);
  return (lateralMove > (hardGrounder ? 4 : 18) || hardGrounder) && distance <= attemptRadius;
}

function isPotentialInfieldRouteBall(battedBall) {
  if (!battedBall || (!battedBall.isGrounder && !battedBall.isLiner && !battedBall.isLineDrop)) return false;
  if (isDeepLineLinerPastInfield(battedBall)) return false;
  if (battedBall.wallHit || battedBall.groundRuleDouble) return false;
  if (isSlowInfieldBounceGrounder(battedBall)) return true;
  if (isMiddleInfieldBounceGrounder(battedBall)) return true;
  if (isSoftInfieldGrounder(battedBall)) return true;
  const outfieldDepth = Math.max(0, field.plateY - battedBall.target.y);
  return outfieldDepth <= defenseField.fenceDistance * 0.54
    && (battedBall.landingDistance ?? 0) <= 1080
    && !battedBall.isDeep;
}

function isMiddleInfieldBounceGrounder(battedBall) {
  if (!battedBall?.isGrounder) return false;
  if (battedBall.wallHit || battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  const firstBounceDistance = battedBall.landingDistance ?? battedBall.flightDistance ?? getFenceDistance(battedBall.target);
  return firstBounceDistance <= defenseField.fenceDistance * 0.5
    && (battedBall.power ?? 0) <= 1.08
    && !battedBall.isDeep;
}

function isSlowInfieldBounceGrounder(battedBall) {
  if (!battedBall?.isGrounder) return false;
  if (battedBall.wallHit || battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  const firstBounceDistance = battedBall.landingDistance ?? battedBall.flightDistance ?? getFenceDistance(battedBall.target);
  const power = battedBall.power ?? 0;
  const ballTime = battedBall.ballTime ?? 0;
  const slowPace = (power <= 0.82 && ballTime >= 0.58) || (power <= 0.92 && ballTime >= 0.72) || ballTime >= 0.9;
  return firstBounceDistance <= defenseField.fenceDistance * 0.52
    && slowPace;
}

function isSoftInfieldGrounder(battedBall) {
  if (!battedBall?.isGrounder) return false;
  if (battedBall.wallHit || battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  const firstBounceDistance = battedBall.landingDistance ?? battedBall.flightDistance ?? getFenceDistance(battedBall.target);
  const power = battedBall.power ?? 0;
  const ballTime = battedBall.ballTime ?? 0;
  return firstBounceDistance <= defenseField.fenceDistance * 0.56
    && (power <= 0.74 || (power <= 0.9 && ballTime >= 0.58));
}

function isSlowInfieldDropBall(battedBall) {
  if (!battedBall || battedBall.isGrounder) return false;
  if (battedBall.wallHit || battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  const landingDistance = battedBall.landingDistance ?? battedBall.flightDistance ?? getFenceDistance(battedBall.target);
  const power = battedBall.power ?? 0;
  const ballTime = battedBall.ballTime ?? 0;
  const isSoftInfieldArc = battedBall.isSoftDrop
    || battedBall.isFrontDrop
    || battedBall.isLineDrop
    || battedBall.isPopupFly
    || (battedBall.trajectory === "fly" && power <= 0.82)
    || (battedBall.isLiner && power <= 0.74);
  return landingDistance <= defenseField.fenceDistance * 0.46
    && ballTime >= 0.72
    && power <= 0.86
    && isSoftInfieldArc;
}

function isDeepOutfieldBall(battedBall) {
  if (!battedBall) return false;
  const outfieldDepth = Math.max(0, field.plateY - battedBall.target.y);
  return outfieldDepth > defenseField.fenceDistance * 0.34
    || battedBall.landingDistance > defenseField.fenceDistance * 0.34
    || battedBall.wallHit
    || battedBall.groundRuleDouble
    || battedBall.isDeep;
}

function isDeepLineLinerPastInfield(battedBall) {
  if (!battedBall?.isLineLiner) return false;
  const landingDistance = battedBall.landingDistance ?? battedBall.flightDistance ?? getFenceDistance(battedBall.target);
  const direction = battedBall.direction || { x: 0, y: -1 };
  const lineRatio = Math.abs(direction.x / Math.min(-0.01, direction.y));
  return landingDistance >= 1120 && lineRatio >= 0.95;
}

function shouldOutfielderHandleFieldingTarget(battedBall, fieldingTarget) {
  if (!battedBall || !fieldingTarget) return false;
  const targetDepthFromHome = getFenceDistance(fieldingTarget);
  const targetOutfieldDepth = Math.max(0, defenseField.bases.home.y - fieldingTarget.y);
  if (isSlowInfieldDropBall(battedBall)) {
    return targetDepthFromHome > defenseField.fenceDistance * 0.42
      || targetOutfieldDepth > defenseField.fenceDistance * 0.42;
  }
  if (isSlowInfieldBounceGrounder(battedBall)) {
    return targetDepthFromHome > defenseField.fenceDistance * 0.4
      || targetOutfieldDepth > defenseField.fenceDistance * 0.4;
  }
  if (isSoftInfieldGrounder(battedBall)) {
    return targetDepthFromHome > defenseField.fenceDistance * 0.44
      || targetOutfieldDepth > defenseField.fenceDistance * 0.44;
  }
  return targetDepthFromHome > defenseField.fenceDistance * 0.34
    || targetOutfieldDepth > defenseField.fenceDistance * 0.34
    || battedBall.wallHit
    || battedBall.isDeep;
}

function shouldOutfielderTakeOverAfterInfieldMiss(fielder, battedBall, outcome, fieldingTarget) {
  return Boolean(
    fielder
      && isInfielderRole(fielder.role)
      && !outcome?.caught
      && shouldOutfielderHandleFieldingTarget(battedBall, fieldingTarget)
  );
}

function getDefenseRoleFit(fielder, battedBall) {
  const side = battedBall.direction.x;
  const pitcherGrounder = isPitcherHandledGrounder(battedBall);
  const strongOutfieldBall = battedBall.landingDistance > 880 || (battedBall.isLiner && battedBall.power >= 0.78);
  const hardGrounder = isHardGrounder(battedBall);
  if (isOutfieldFrontLandingBall(battedBall)) {
    if (fielder.role === "P") return -8.4;
    if (isTemporaryInfielderRole(fielder.role)) return -6.2;
    if (fielder.role === "L") return side < -0.12 ? 6.2 : side > 0.24 ? 0.4 : 2.8;
    if (fielder.role === "R") return side > 0.12 ? 6.2 : side < -0.24 ? 0.4 : 2.8;
    if (fielder.role === "C") return 7.2 - Math.abs(side) * 0.28 + (fielder.rangeBonus ?? 0) / 55;
  }
  if (isSlowInfieldDropBall(battedBall)) {
    if (fielder.role === "P") return Math.abs(side) < 0.16 ? 2.2 : 0.2;
    if (fielder.role === "2B") return side > 0.1 ? 3.4 : side > -0.08 ? 1.4 : -1.1;
    if (fielder.role === "SS") return side < -0.1 ? 3.4 : side < 0.08 ? 1.4 : -1.1;
    return -3.2;
  }
  const infieldFirstBounceGrounder = battedBall.isGrounder
    && (isSlowInfieldBounceGrounder(battedBall) || isSoftInfieldGrounder(battedBall) || !isDeepOutfieldBall(battedBall));
  if (infieldFirstBounceGrounder) {
    if (fielder.role === "P") return pitcherGrounder ? 5.6 : battedBall.landingDistance < 620 ? 1.8 : -1.8;
    if (fielder.role === "2B") return side > 0.12 ? 3.2 : side > -0.08 ? 1.1 : -1.35;
    if (fielder.role === "SS") return side < -0.12 ? 3.2 : side < 0.08 ? 1.1 : -1.35;
    return -2.6;
  }
  if (battedBall.isLineLiner || battedBall.isLineDrop) {
    if (fielder.role === "P") return -7.5;
    if (isTemporaryInfielderRole(fielder.role)) return -2.4;
    if (fielder.role === "L") return side < 0 ? 2.4 : -1.2;
    if (fielder.role === "R") return side > 0 ? 2.4 : -1.2;
    if (fielder.role === "C") return -0.35;
  }
  if (battedBall.isChaseFly && !isInfielderRole(fielder.role)) return 1.15 + (fielder.rangeBonus ?? 0) / 70;
  if (battedBall.isPopupFly) return fielder.role === "P" ? 3.6 : -0.4;
  if (battedBall.isRoutineFly && !isInfielderRole(fielder.role)) return 1.15;
  if (fielder.role === "P") return pitcherGrounder ? 5.1 : strongOutfieldBall ? -8 : -0.9;
  if (isTemporaryInfielderRole(fielder.role)) {
    if (hardGrounder) {
      if (fielder.role === "2B") return side > 0.08 ? 4.3 : side > -0.14 ? 1.7 : -0.6;
      if (fielder.role === "SS") return side < -0.08 ? 4.3 : side < 0.14 ? 1.7 : -0.6;
    }
    return strongOutfieldBall ? -5.2 : -0.65;
  }
  if (pitcherGrounder) return -1.65;
  if (fielder.role === "L") return side < -0.18 ? 1.05 : side > 0.25 ? -0.55 : 0.15;
  if (fielder.role === "R") return side > 0.18 ? 1.05 : side < -0.25 ? -0.55 : 0.15;
  if (fielder.role === "C") return 0.5 + (fielder.rangeBonus ?? 0) / 80 - Math.abs(side) * 0.25;
  return 0;
}

function resolveInfieldInterceptionBeforeOutfield(fielders, battedBall, outcome, runner) {
  if (!battedBall || battedBall.fenceOver || battedBall.wallHit || battedBall.groundRuleDouble) return null;
  if (!battedBall.isGrounder && !battedBall.isLiner && !battedBall.isPopupFly) return null;
  const originalFieldingTime = outcome?.fieldingTime ?? battedBall.ballTime ?? Infinity;
  const currentIsOutfielder = outcome && !outcome.caught ? true : false;
  const candidates = (fielders || [])
    .filter((fielder) => battedBall.isPopupFly
      ? fielder.role === "P" || isTemporaryInfielderRole(fielder.role)
      : isTemporaryInfielderRole(fielder.role))
    .map((fielder) => {
      if (battedBall.isPopupFly) {
        const popupCatch = getInfieldPopupFlyCatch(fielder, battedBall, battedBall.target);
        if (!popupCatch.caught) return null;
        const popupFielder = {
          ...fielder,
          fieldingPoint: battedBall.target,
          distanceToTarget: popupCatch.routeGap
        };
        return {
          fielder: popupFielder,
          outcome: makeInfieldPopupFlyOutcome(popupFielder, battedBall, popupCatch.fieldingTime, battedBall.target),
          target: battedBall.target,
          fieldingTime: popupCatch.fieldingTime
        };
      }
      if (!isInfielderReactionRouteBall(fielder, battedBall)
        && !isInfielderAttemptRouteBall(fielder, battedBall)
        && !isInfielderAwareOfRouteBall(fielder, battedBall)) {
        return null;
      }
      const target = getClosestPointOnBattedBallRoute(fielder, battedBall);
      const distanceToTarget = Math.hypot(target.x - fielder.x, target.y - fielder.y);
      const routeFielder = {
        ...fielder,
        fieldingPoint: target,
        distanceToTarget
      };
      const routeOutcome = resolveDefenseOutcome(routeFielder, battedBall, runner);
      if (!routeOutcome?.caught && !routeOutcome?.needsThrow) return null;
      if (!currentIsOutfielder && (routeOutcome.fieldingTime ?? Infinity) > originalFieldingTime + 0.08) return null;
      return {
        fielder: routeFielder,
        outcome: routeOutcome,
        target,
        fieldingTime: routeOutcome.fieldingTime ?? originalFieldingTime
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.fieldingTime - b.fieldingTime);
  return candidates[0] || null;
}

function getFielderSpeed(fielder) {
  return getFieldingMoveSpeed(fielder?.speed ?? fielder?.fielding ?? 5);
}

function getFielderFieldingRating(fielder) {
  return getOpenEndedAbilityRating(fielder?.fielding ?? fielder?.speed ?? 5);
}

function getFielderSpeedRating(fielder) {
  return getOpenEndedAbilityRating(fielder?.speed ?? fielder?.fielding ?? 5);
}

function getFieldingMoveSpeed(fieldingRating) {
  return (abilitySpeedBaseRating + getRedistributedFieldingMovementRating(fieldingRating)) * fielderSpeedUnit * defenseFielderMoveSpeedScale;
}

function getFielderReactionDelay(fielder) {
  if (fielder?.quickBuntReaction) return 0.04;
  const fielding = getOpenEndedAbilityRating(fielder?.fielding ?? fielder?.speed ?? 5);
  const delay = fielding <= fielderReactionDelayTuning.midpointFielding
    ? fielderReactionDelayTuning.slowest - (fielding - 1) * ((fielderReactionDelayTuning.slowest - fielderReactionDelayTuning.midpointDelay) / 4)
    : fielderReactionDelayTuning.midpointDelay - (fielding - fielderReactionDelayTuning.midpointFielding) * ((fielderReactionDelayTuning.midpointDelay - fielderReactionDelayTuning.fastest) / 5);
  return clamp(delay, 0.08, fielderReactionDelayTuning.slowest);
}

function isPitcherHandledGrounder(battedBall) {
  const side = Math.abs(battedBall.direction?.x ?? 0);
  return battedBall.isGrounder
    && !isDeepOutfieldBall(battedBall)
    && side < 0.18
    && (battedBall.landingDistance < 760 || (battedBall.power < 0.58 && battedBall.landingDistance < 960));
}

function getBattedBallFielderRelation(fielder, battedBall) {
  const fromHomeToBall = Math.max(0, field.plateY - battedBall.target.y);
  const fromHomeToFielder = Math.max(0, field.plateY - fielder.y);
  const sideGap = Math.abs(battedBall.target.x - fielder.x);
  const frontGap = fromHomeToFielder - fromHomeToBall;
  const behindGap = fromHomeToBall - fromHomeToFielder;
  return {
    sideGap,
    frontGap,
    behindGap,
    landsInFront: frontGap > 60,
    splitsGap: behindGap > 130 && sideGap > 135
  };
}

function getDifficultHardBallCatch(fielder, battedBall, fielderTime, ballTime, roll = Math.random()) {
  if (!fielder || !battedBall || (!battedBall.isGrounder && !battedBall.isLiner)) return { caught: false, chance: 0 };
  if (battedBall.isHardOutfieldBounce && isTemporaryInfielderRole(fielder.role)) return { caught: false, chance: 0 };
  if ((battedBall.power ?? 0) < 0.56 && !battedBall.isLiner) return { caught: false, chance: 0 };
  const lateBy = fielderTime - ballTime;
  const fielding = getFielderFieldingRating(fielder);
  if (battedBall.grounderGap && isTemporaryInfielderRole(fielder.role) && fielding < 5) return { caught: false, chance: 0 };
  const window = defenseRangeTuning.difficultCatchTimeWindow + fielding * 0.022;
  if (lateBy < -0.04 || lateBy > window) return { caught: false, chance: 0 };
  const timingFactor = clamp(1 - lateBy / window, 0, 1);
  const chance = clamp(
    (defenseRangeTuning.difficultCatchBaseChance
      + fielding * defenseRangeTuning.difficultCatchFieldingChance
      + timingFactor * 0.2)
      * (battedBall.isLiner && isTemporaryInfielderRole(fielder.role) ? 0.72 : 1),
    0.08,
    0.92
  );
  return { caught: roll < chance, chance };
}

function getCloseHardBallCatch(fielder, battedBall, fieldingPoint, roll = Math.random()) {
  if (!fielder || !battedBall || (!battedBall.isGrounder && !battedBall.isLiner)) return { caught: false, chance: 0, distance: Infinity };
  if (battedBall.isHardOutfieldBounce && isTemporaryInfielderRole(fielder.role) && !isHardGrounderInfieldPlayable(battedBall)) return { caught: false, chance: 0, distance: Infinity };
  if ((battedBall.power ?? 0) < 0.56 && !battedBall.isLiner) return { caught: false, chance: 0, distance: Infinity };
  const distance = Math.hypot((fieldingPoint?.x ?? battedBall.target.x) - fielder.x, (fieldingPoint?.y ?? battedBall.target.y) - fielder.y);
  const fielding = getFielderFieldingRating(fielder);
  if (battedBall.grounderGap && isTemporaryInfielderRole(fielder.role) && fielding < 5) return { caught: false, chance: 0, distance };
  const hardGrounderFrontBonus = isHardGrounder(battedBall) && isTemporaryInfielderRole(fielder.role) ? 52 : 0;
  const radius = (defenseRangeTuning.closeHardBallRadius + fielding * 4 + hardGrounderFrontBonus) * (battedBall.isGrounder ? 1.35 : 1);
  const linerScale = battedBall.isLiner && isTemporaryInfielderRole(fielder.role) ? 0.82 : 1;
  const hiddenLinerRangeScale = battedBall.isLiner ? 0.8 : 1;
  const effectiveRadius = radius * linerScale * hiddenLinerRangeScale;
  if (battedBall.isLiner && isTemporaryInfielderRole(fielder.role)) {
    const bodyLinerLimit = 48 + fielding * 5;
    if (distance > bodyLinerLimit) return { caught: false, chance: 0, distance };
  }
  if (distance > effectiveRadius) return { caught: false, chance: 0, distance };
  const distanceBonus = clamp(1 - distance / effectiveRadius, 0, 1) * 0.22;
  const chance = clamp(
    (defenseRangeTuning.closeHardBallBaseChance
      + fielding * defenseRangeTuning.closeHardBallFieldingChance
      + distanceBonus
      + (isHardGrounder(battedBall) && isTemporaryInfielderRole(fielder.role) ? 0.05 : 0))
      * (battedBall.isLiner && isTemporaryInfielderRole(fielder.role) ? 0.84 : 1),
    0.62,
    0.995
  );
  return { caught: roll < chance, chance, distance };
}

function getHardShotFieldingError(fielder, battedBall, relation, roll = Math.random()) {
  if (!fielder || !battedBall || (!battedBall.isGrounder && !battedBall.isLiner)) return { error: false, chance: 0 };
  if ((battedBall.power ?? 0) < 0.78) return { error: false, chance: 0 };
  if (battedBall.isSoftDrop || battedBall.wallHit || battedBall.fenceOver) return { error: false, chance: 0 };
  const fielding = getFielderFieldingRating(fielder);
  const sideGap = relation?.sideGap ?? Infinity;
  if (sideGap > (battedBall.isLiner ? 74 : 88)) return { error: false, chance: 0 };
  const powerPressure = clamp(((battedBall.power ?? 0.78) - 0.78) / 0.55, 0, 1);
  const baseChance = (battedBall.isLiner ? 0.08 : 0.1) + powerPressure * 0.12;
  const lowFieldingPenalty = clamp((5 - fielding) / 4, 0, 1) * 0.045;
  const veryLowFieldingPenalty = clamp((3 - fielding) / 2, 0, 1) * 0.035;
  const fieldingReduction = fielding * 0.011;
  const chance = clamp(baseChance + lowFieldingPenalty + veryLowFieldingPenalty - fieldingReduction, 0.025, 0.28);
  return { error: roll < chance, chance };
}

function makeFieldingErrorOutcome(fielder, battedBall, fieldingTime, fieldingPoint) {
  return {
    kind: "single",
    label: `${fielder.role} エラー`,
    scoreType: "single",
    caught: false,
    needsThrow: false,
    fieldingError: true,
    fieldingTime,
    fieldingPoint,
    errorPoint: fieldingPoint
  };
}

function getInfieldPopupFlyCatch(fielder, battedBall, fieldingPoint = null) {
  if (!fielder || !battedBall?.isPopupFly || !(fielder.role === "P" || isTemporaryInfielderRole(fielder.role))) {
    return { caught: false, fieldingTime: Infinity, routeGap: Infinity };
  }
  const target = fieldingPoint || battedBall.target;
  if (!target) return { caught: false, fieldingTime: Infinity, routeGap: Infinity };
  const fielding = getFielderFieldingRating(fielder);
  const speed = getFielderSpeedRating(fielder);
  const routeGap = Math.hypot((fielder.x ?? 0) - target.x, (fielder.y ?? 0) - target.y);
  const infieldRange = 82 + fielding * 14 + speed * 8 + (fielder.role === "P" ? 34 : 22);
  if (routeGap > infieldRange) {
    return { caught: false, fieldingTime: Infinity, routeGap };
  }
  const reactionDelay = getFielderReactionDelay(fielder) * 0.68;
  const fielderTime = reactionDelay + Math.max(0, routeGap - (76 + fielding * 12)) / Math.max(1, getFielderSpeed(fielder));
  const ballTime = Math.max(0.72, battedBall.ballTime ?? 1.1);
  const catchWindow = 0.55 + fielding * 0.04 + speed * 0.02;
  if (fielderTime > ballTime + catchWindow) {
    return { caught: false, fieldingTime: Infinity, routeGap, fielderTime };
  }
  return {
    caught: true,
    fieldingTime: Math.max(ballTime, fielderTime),
    routeGap,
    fielderTime
  };
}

function makeInfieldPopupFlyOutcome(fielder, battedBall, fieldingTime, fieldingPoint) {
  return {
    kind: "out",
    label: `${fielder.role} ${hitLabels.popup}`,
    caught: true,
    needsThrow: false,
    fieldingTime: Math.max(battedBall.ballTime ?? 0.9, fieldingTime ?? 0),
    fieldingPoint
  };
}

function getGuaranteedSlowInfieldGrounderPickup(fielder, battedBall, fieldingPoint) {
  if (!fielder || !fieldingPoint || !isInfielderRole(fielder.role) || !isSlowInfieldBounceGrounder(battedBall)) {
    return { caught: false, fieldingTime: Infinity, ballArrival: Infinity, fielderTime: Infinity };
  }
  const fielding = getFielderFieldingRating(fielder);
  const speed = getFielderSpeedRating(fielder);
  const routeGap = Math.hypot(fieldingPoint.x - fielder.x, fieldingPoint.y - fielder.y);
  const routeProgress = getBattedBallRouteProgressForPoint(fieldingPoint, battedBall);
  if (routeProgress < 0.1 || routeProgress > 0.97) {
    return { caught: false, fieldingTime: Infinity, ballArrival: Infinity, fielderTime: Infinity, routeGap };
  }
  const softRollReach = 122 + fielding * 28 + speed * 20 + (fielder.role === "P" ? 36 : 0);
  if (routeGap > softRollReach) {
    return { caught: false, fieldingTime: Infinity, ballArrival: Infinity, fielderTime: Infinity, routeGap };
  }
  const reactionDelay = getFielderReactionDelay(fielder);
  const lowMobilityPenalty = speed < 3 ? (3 - speed) * 0.24 : 0;
  const fielderTime = reactionDelay * 0.88
    + Math.max(0, routeGap - (64 + fielding * 18 + speed * 8)) / getFielderSpeed(fielder)
    + lowMobilityPenalty;
  const ballArrival = getBattedBallRouteArrivalTime(fieldingPoint, battedBall);
  const secureWindow = 0.18 + fielding * 0.03 + speed * 0.02;
  const caught = fielderTime <= ballArrival + secureWindow;
  return {
    caught,
    fieldingTime: Math.max(ballArrival, fielderTime) + 0.04,
    ballArrival,
    fielderTime,
    routeGap
  };
}

function makeInfieldGrounderPickupOutcome(fielder, fieldingTime, fieldingPoint, runner, label = "ゴロ処理") {
  return { kind: "force", label: `${fielder.role} ${label}`, caught: true, needsThrow: true, targetBase: "first", fieldingTime, fieldingPoint };
}

function getInfielderFrontGrounderPickup(fielder, battedBall, fieldingPoint, relation) {
  if (!fielder || !fieldingPoint || !isTemporaryInfielderRole(fielder.role) || !battedBall?.isGrounder) {
    return { caught: false, fieldingTime: Infinity, ballArrival: Infinity, fielderTime: Infinity, routeGap: Infinity };
  }
  if ((battedBall.isHardOutfieldBounce && !isHardGrounderInfieldPlayable(battedBall)) || battedBall.wallHit || battedBall.fenceOver || battedBall.groundRuleDouble) {
    return { caught: false, fieldingTime: Infinity, ballArrival: Infinity, fielderTime: Infinity, routeGap: Infinity };
  }
  const routeProgress = getBattedBallRouteProgressForPoint(fieldingPoint, battedBall);
  if (routeProgress < 0.1 || routeProgress > 0.97) {
    return { caught: false, fieldingTime: Infinity, ballArrival: Infinity, fielderTime: Infinity, routeGap: Infinity };
  }
  const fielding = getFielderFieldingRating(fielder);
  const speed = getFielderSpeedRating(fielder);
  if (fielding < 4) {
    return { caught: false, fieldingTime: Infinity, ballArrival: Infinity, fielderTime: Infinity, routeGap: Infinity };
  }
  const sideGap = relation?.sideGap ?? Math.abs(fieldingPoint.x - fielder.x);
  const routeGap = Math.hypot(fieldingPoint.x - fielder.x, fieldingPoint.y - fielder.y);
  const hardGrounderReachBoost = isHardGrounder(battedBall) ? 1 : 0;
  const sideLimit = 66 + fielding * 8.5 + speed * 3.2 + hardGrounderReachBoost * 72;
  const routeLimit = 126 + fielding * 21 + speed * 9 + hardGrounderReachBoost * 176;
  if (sideGap > sideLimit || routeGap > routeLimit) {
    return { caught: false, fieldingTime: Infinity, ballArrival: Infinity, fielderTime: Infinity, routeGap, sideGap };
  }
  const ballArrival = getBattedBallRouteArrivalTime(fieldingPoint, battedBall);
  const quickStep = 82 + fielding * 13 + speed * 7 + hardGrounderReachBoost * 42;
  const fielderTime = getFielderReactionDelay(fielder) * (hardGrounderReachBoost ? 0.56 : 0.72)
    + Math.max(0, routeGap - quickStep) / getFielderSpeed(fielder);
  const secureWindow = 0.14 + fielding * 0.034 + speed * 0.016 + hardGrounderReachBoost * 0.22;
  const caught = fielderTime <= ballArrival + secureWindow;
  return {
    caught,
    fieldingTime: Math.max(ballArrival, fielderTime) + 0.05,
    ballArrival,
    fielderTime,
    routeGap,
    sideGap
  };
}

function getGuaranteedSlowInfieldDropPlay(fielder, battedBall, fieldingPoint) {
  if (!fielder || !fieldingPoint || !isInfielderRole(fielder.role) || !isSlowInfieldDropBall(battedBall)) {
    return { handled: false, fieldingTime: Infinity, fielderTime: Infinity };
  }
  const fielding = getFielderFieldingRating(fielder);
  const speed = getFielderSpeedRating(fielder);
  const distance = Math.hypot(fieldingPoint.x - fielder.x, fieldingPoint.y - fielder.y);
  const reachableDistance = 126 + fielding * 20 + speed * 16 + (fielder.role === "P" ? 42 : 0);
  if (distance > reachableDistance) {
    return { handled: false, fieldingTime: Infinity, fielderTime: Infinity, distance };
  }
  const reactionDelay = getFielderReactionDelay(fielder);
  const fielderTime = reactionDelay * 0.82 + Math.max(0, distance - (76 + fielding * 10)) / getFielderSpeed(fielder);
  const landingTime = battedBall.ballTime ?? 0;
  const catchWindow = 0.22 + fielding * 0.02 + speed * 0.014;
  const pickupWindow = 0.54 + fielding * 0.03 + speed * 0.02;
  const catchesInAir = fielderTime <= landingTime + catchWindow;
  const handled = fielderTime <= landingTime + pickupWindow;
  return {
    handled,
    catchesInAir,
    fieldingTime: Math.max(landingTime, fielderTime) + (catchesInAir ? 0 : 0.08),
    fielderTime,
    distance
  };
}

function makeSlowInfieldDropOutcome(fielder, play, fieldingPoint, runner) {
  if (play.catchesInAir || !runner) {
    return { kind: "out", label: `${fielder.role} ポテン捕球`, caught: true, needsThrow: false, fieldingTime: play.fieldingTime, fieldingPoint };
  }
  return makeInfieldGrounderPickupOutcome(fielder, play.fieldingTime, fieldingPoint, runner, "ポテン処理");
}

function resolveMiddleInfieldBouncePickup(fielder, battedBall, outcome, runner) {
  if (!fielder || !runner || outcome?.caught || outcome?.kind !== "single") return null;
  const slowInfieldRoller = isSlowInfieldBounceGrounder(battedBall);
  const softInfieldRoller = isSoftInfieldGrounder(battedBall);
  if (!isInfielderRole(fielder.role) || (!isMiddleInfieldBounceGrounder(battedBall) && !slowInfieldRoller && !softInfieldRoller)) return null;
  const fieldingPoint = fielder.fieldingPoint || getClosestPointOnBattedBallRoute(fielder, battedBall);
  const guaranteedPickup = getGuaranteedSlowInfieldGrounderPickup(fielder, battedBall, fieldingPoint);
  if (guaranteedPickup.caught) {
    return {
      fielder: {
        ...fielder,
        fieldingPoint,
        distanceToTarget: guaranteedPickup.routeGap
      },
      outcome: makeInfieldGrounderPickupOutcome(fielder, guaranteedPickup.fieldingTime, fieldingPoint, runner)
    };
  }
  const routeProgress = getBattedBallRouteProgressForPoint(fieldingPoint, battedBall);
  if (routeProgress < 0.1 || routeProgress > 0.96) return null;
  const fielding = getFielderFieldingRating(fielder);
  const speed = getFielderSpeedRating(fielder);
  const routeGap = Math.hypot(fieldingPoint.x - fielder.x, fieldingPoint.y - fielder.y);
  const reactionDelay = getFielderReactionDelay(fielder);
  const fielderTime = reactionDelay * 0.82 + Math.max(0, routeGap - (88 + fielding * 13)) / getFielderSpeed(fielder);
  const ballArrival = getBattedBallRouteArrivalTime(fieldingPoint, battedBall);
  const pickupWindow = 0.18
    + fielding * 0.032
    + speed * 0.018
    + (battedBall.grounderGap ? 0.12 : 0.06)
    + (slowInfieldRoller ? 0.44 : 0)
    + (softInfieldRoller ? 0.28 : 0);
  const rangeLimit = 142
    + fielding * 22
    + speed * 12
    + (battedBall.grounderGap ? 58 : 0)
    + (slowInfieldRoller ? 104 : 0)
    + (softInfieldRoller ? 82 : 0);
  if (routeGap > rangeLimit || fielderTime > ballArrival + pickupWindow) return null;
  const fieldingTime = Math.max(ballArrival, fielderTime) + 0.06;
  return {
    fielder: {
      ...fielder,
      fieldingPoint,
      distanceToTarget: routeGap
    },
    outcome: makeInfieldGrounderPickupOutcome(fielder, fieldingTime, fieldingPoint, runner)
  };
}

function getInfielderRouteBodyCatch(fielder, battedBall, fieldingPoint) {
  if (!fielder || !isTemporaryInfielderRole(fielder.role)) return { caught: false, routeGap: Infinity, timeGrace: 0 };
  if (!battedBall || (!battedBall.isGrounder && !battedBall.isLiner && !battedBall.isLineDrop)) return { caught: false, routeGap: Infinity, timeGrace: 0 };
  if (battedBall.isHardOutfieldBounce && !isHardGrounderInfieldPlayable(battedBall)) return { caught: false, routeGap: Infinity, timeGrace: 0 };
  if (isDeepLineLinerPastInfield(battedBall)) return { caught: false, routeGap: Infinity, timeGrace: 0 };
  if (battedBall.wallHit || battedBall.groundRuleDouble || battedBall.fenceOver) return { caught: false, routeGap: Infinity, timeGrace: 0 };
  const point = fieldingPoint || getClosestPointOnBattedBallRoute(fielder, battedBall);
  const routeProgress = getBattedBallRouteProgressForPoint(point, battedBall);
  if (routeProgress < 0.12 || routeProgress > 0.94) return { caught: false, routeGap: Infinity, timeGrace: 0 };
  if (!isInfielderPlayableRouteHeight(fielder, battedBall, point, 4)) return { caught: false, routeGap: Infinity, timeGrace: 0 };
  const routeGap = Math.hypot(point.x - fielder.x, point.y - fielder.y);
  const fielding = getFielderFieldingRating(fielder);
  const speed = getFielderSpeedRating(fielder);
  const hardGrounderBodyBoost = isHardGrounder(battedBall) ? 92 : 0;
  const grounderWidth = (74 + fielding * 8 + speed * 5 + (battedBall.grounderGap ? 34 : 18) + hardGrounderBodyBoost) * 1.58;
  const linerWidth = (34 + fielding * 4 + speed * 1.5) * 0.8;
  const lineDropWidth = 46 + fielding * 6 + speed * 2.5;
  const width = battedBall.isGrounder ? grounderWidth : battedBall.isLineDrop ? lineDropWidth : linerWidth;
  const timeGrace = battedBall.isGrounder ? 0.22 + fielding * 0.012 + (isHardGrounder(battedBall) ? 0.2 : 0) : 0.08 + fielding * 0.006;
  if (battedBall.isGrounder && (isSlowInfieldBounceGrounder(battedBall) || isSoftInfieldGrounder(battedBall))) {
    const ballArrival = getBattedBallRouteArrivalTime(point, battedBall);
    const fielderTime = getFielderReactionDelay(fielder) * 0.88
      + Math.max(0, routeGap - (64 + fielding * 18 + speed * 8)) / getFielderSpeed(fielder);
    if (fielderTime > ballArrival + timeGrace) {
      return { caught: false, routeGap, timeGrace };
    }
  }
  return {
    caught: routeGap <= width,
    routeGap,
    timeGrace
  };
}

function makeStrictCircleCatchOutcome(fielder, battedBall, fieldingPoint, fieldingTime, runner = null) {
  if (battedBall.isGrounder && runner) {
    return { kind: "force", label: `${fielder.role} 捕球`, caught: true, needsThrow: true, fieldingTime, fieldingPoint };
  }
  if (battedBall.isGrounder) {
    return { kind: "out", label: `${fielder.role} 捕球`, caught: true, needsThrow: false, fieldingTime, fieldingPoint };
  }
  if ((battedBall.isLiner || battedBall.isLineDrop || battedBall.trajectory === "fly" || battedBall.isPopupFly) && runner) {
    return { kind: "out", label: `${fielder.role} 捕球`, caught: true, needsThrow: false, fieldingTime, fieldingPoint };
  }
  return { kind: "out", label: `${fielder.role} 捕球`, caught: true, needsThrow: false, fieldingTime, fieldingPoint };
}

function makeStrictCircleMissOutcome(fielder, battedBall, fieldingPoint, fielderTime, fieldingPointBallTime) {
  if (battedBall.isGrounder || battedBall.isLiner || battedBall.isLineDrop) {
    return resolveDroppedBallOutcome(fielder, { ...battedBall, target: fieldingPoint });
  }
  const relation = getBattedBallFielderRelation(fielder, { ...battedBall, target: fieldingPoint });
  if (relation.splitsGap) return { kind: "double", label: hitLabels.double, scoreType: "double", caught: false, fieldingTime: Math.max(fieldingPointBallTime, fielderTime) };
  if (relation.landsInFront) return { kind: "single", label: hitLabels.single, scoreType: "single", caught: false, fieldingTime: Math.max(fieldingPointBallTime, fielderTime) };
  if (battedBall.isDeep || battedBall.distance > defenseField.doubleDistance || battedBall.isChaseFly || battedBall.isDeepDrive) {
    return { kind: "double", label: hitLabels.double, scoreType: "double", caught: false, fieldingTime: fieldingPointBallTime };
  }
  return { kind: "single", label: hitLabels.single, scoreType: "single", caught: false, fieldingTime: Math.max(fieldingPointBallTime, fielderTime) };
}

function resolveDefenseOutcome(fielder, battedBall, runner = null) {
  if (battedBall.fenceOver) return { kind: "homer", label: hitLabels.homer, scoreType: "homer", caught: false };
  if (battedBall.wallHit) return { kind: "double", label: "フェンス直撃", scoreType: "double", caught: false };

  const fieldingPoint = fielder.fieldingPoint || battedBall.target;
  const speed = getFielderSpeed(fielder);
  const fielderReach = getStableFielderCatchRangeRadius(fielder);
  const adjustedFielderReach = fielderReach;
  const distanceToTarget = Number.isFinite(fielder.distanceToTarget)
    ? fielder.distanceToTarget
    : Math.hypot(fieldingPoint.x - fielder.x, fieldingPoint.y - fielder.y);
  const runDistance = Math.max(0, distanceToTarget - adjustedFielderReach);
  const reactionDelay = getFielderReactionDelay(fielder);
  const fielderTime = runDistance <= 0
    ? 0
    : reactionDelay + runDistance / speed;
  const ballTime = battedBall.ballTime;
  const routeProgress = getBattedBallRouteProgressForPoint(fieldingPoint, battedBall);
  const useRouteArrivalTime = isInfielderRole(fielder.role)
    && (battedBall.isGrounder || battedBall.isLiner || battedBall.isLineDrop)
    && routeProgress < 0.98;
  const fieldingPointBallTime = useRouteArrivalTime
    ? getBattedBallRouteArrivalTime(fieldingPoint, battedBall)
    : ballTime;
  const strictCircleCanField = fielderTime <= fieldingPointBallTime + 0.04;
  const strictFieldingTime = Math.max(fieldingPointBallTime, fielderTime);
  if (strictCircleCanField) {
    return makeStrictCircleCatchOutcome(fielder, battedBall, fieldingPoint, strictFieldingTime, runner);
  }
  return makeStrictCircleMissOutcome(fielder, battedBall, fieldingPoint, fielderTime, fieldingPointBallTime);
}

function isCatchableOutfieldFly(battedBall, fielder, fielderTime, ballTime) {
  if (!battedBall || !fielder || fielder.role === "P") return false;
  if (battedBall.isGrounder || battedBall.isLiner || battedBall.isSoftDrop || battedBall.wallHit || battedBall.fenceOver) return false;
  const fielding = getFielderFieldingRating(fielder);
  const speed = getFielderSpeedRating(fielder);
  const routineBonus = battedBall.isRoutineFly ? 0.08 + fielding * 0.006 : 0;
  const chaseBonus = battedBall.isChaseFly ? 0.045 + fielding * 0.004 : 0;
  const grace = 0.16 + speed * 0.012 + fielding * 0.01 + routineBonus + chaseBonus;
  return fielderTime <= ballTime + grace;
}

function resolveDroppedBallOutcome(fielder, battedBall, relation = getBattedBallFielderRelation(fielder, battedBall)) {
  const outfieldDepth = field.plateY - battedBall.target.y;
  const sideDepth = Math.abs(battedBall.target.x - field.plateX);
  const fielderMissDistance = Math.hypot(battedBall.target.x - fielder.x, battedBall.target.y - fielder.y);
  if (relation.splitsGap) return { kind: "double", label: hitLabels.double, scoreType: "double", caught: false };
  if (relation.landsInFront && fielderMissDistance < 520) return { kind: "single", label: hitLabels.single, scoreType: "single", caught: false };
  const gapLiner = battedBall.isLiner && (fielderMissDistance > 520 || outfieldDepth > 760 || sideDepth > 760);
  const throughOutfield = gapLiner || outfieldDepth > 1160 || sideDepth > 1120 || fielderMissDistance > 820;
  if (throughOutfield) return { kind: "double", label: hitLabels.double, scoreType: "double", caught: false };
  return { kind: "single", label: hitLabels.single, scoreType: "single", caught: false };
}

function updateDefensePlay(now) {
  if (!defenseState.active) return;
  const progress = clamp((now - defenseState.startTime) / defenseState.duration, 0, 1);
  const eased = 1 - Math.pow(1 - progress, 2);
  const elapsedSeconds = (now - defenseState.startTime) / 1000;

  updateBatterRunner(elapsedSeconds);
  updateDefenseBaseRunners(elapsedSeconds);
  if (defenseState.unifiedCircleCatchComplete || !defenseState.outcome?.caught) {
    updateThrowState(elapsedSeconds);
  }
  refreshDefenseThrowSafety();
  updateHomeRunFireworksSound(elapsedSeconds);
  const ballPoint = getDefenseBallPoint(progress, eased, elapsedSeconds);
  ball.x = ballPoint.x;
  ball.y = ballPoint.y;
  if (shouldResetTrailAtLanding(elapsedSeconds)) {
    ball.trail = [];
    defenseState.trailResetAtLanding = true;
  }
  ball.trail.push({ x: ball.x, y: ball.y, progress, elapsedSeconds });
  if (ball.trail.length > 26) ball.trail.shift();
  ball.spin += 0.22;
  showImmediateCatchOutCall(elapsedSeconds);

  const previousMovementElapsed = defenseState.lastMovementElapsedSeconds ?? elapsedSeconds;
  const movementDeltaSeconds = clamp(elapsedSeconds - previousMovementElapsed, 0, 0.08);
  if (defenseState.manualFielding && !defenseState.manualFieldingComplete) {
    updateManualDefenseFielders(movementDeltaSeconds);
    resolveManualDefenseFielding(elapsedSeconds);
  } else {
    defenseState.fielders = defenseState.fielders.map((fielder) => {
      const heldAtCatchPoint = getCompletedInfieldCatchHoldPoint(fielder, elapsedSeconds);
      if (heldAtCatchPoint) {
        return {
          ...fielder,
          currentX: heldAtCatchPoint.x,
          currentY: heldAtCatchPoint.y
        };
      }
      const chaseTarget = getDefenseFielderMovementTarget(fielder, elapsedSeconds);
      if (!chaseTarget) return fielder;
      if (shouldUseIncrementalPostLandingChase(elapsedSeconds, chaseTarget)) {
        const currentX = fielder.currentX ?? fielder.x;
        const currentY = fielder.currentY ?? fielder.y;
        const dx = chaseTarget.x - currentX;
        const dy = chaseTarget.y - currentY;
        const distance = Math.hypot(dx, dy) || 1;
        const maxRunDistance = getFielderSpeed(fielder) * movementDeltaSeconds;
        const runProgress = clamp(maxRunDistance / distance, 0, 1);
        const current = clampFielderOutsideRiversideRiver(clampPointInsideFence({
          x: currentX + dx * runProgress,
          y: currentY + dy * runProgress
        }, 36), fielder.role);
        return {
          ...fielder,
          currentX: current.x,
          currentY: current.y
        };
      }
      const dx = chaseTarget.x - fielder.x;
      const dy = chaseTarget.y - fielder.y;
      const distance = Math.hypot(dx, dy) || 1;
      const runSeconds = Math.max(0, elapsedSeconds - getFielderReactionDelay(fielder));
      const maxRunDistance = getFielderSpeed(fielder) * runSeconds;
      const runProgress = clamp(maxRunDistance / distance, 0, 1);
      const current = clampFielderOutsideRiversideRiver(clampPointInsideFence({
        x: fielder.x + dx * runProgress,
        y: fielder.y + dy * runProgress
      }, 36), fielder.role);
      return {
        ...fielder,
        currentX: current.x,
        currentY: current.y
      };
    });
  }
  defenseState.lastMovementElapsedSeconds = elapsedSeconds;

  resolveUnifiedFielderCircleCatch(elapsedSeconds);
  resolveUnifiedCircleMissAfterArrival(elapsedSeconds);
  updateDefenseLandingMissVisual(elapsedSeconds);
  showImmediateCatchOutCall(elapsedSeconds);

  if (shouldResolveDefensePlayNow(elapsedSeconds)) {
    finishDefensePlay();
    return;
  }

  // 進塁中の走者や手動送球の指示待ちが残っているうちは、時間切れでの打ち切りもしない
  const advancingHold = getAdvancingRunnerHoldDeadline();
  const advancingRunnersSettled = !Number.isFinite(advancingHold) || elapsedSeconds >= advancingHold;
  if (
    progress >= 1
    && !defenseState.resolved
    && isBatterRunnerSettledForResolution()
    && advancingRunnersSettled
    && !isManualThrowDecisionPending(elapsedSeconds)
  ) {
    finishDefensePlay();
  }
}

function getCompletedInfieldCatchHoldPoint(fielder, elapsedSeconds) {
  if (!fielder || fielder.role !== defenseState.chosenFielder?.role) return null;
  if (!isInfielderRole(fielder.role)) return null;
  const outcome = defenseState.outcome;
  if (!outcome?.caught || !outcome.fieldingPoint) return null;
  const fieldingTime = outcome.fieldingTime ?? defenseState.battedBall?.ballTime ?? 0;
  if (elapsedSeconds + 0.001 < fieldingTime) return null;
  return outcome.fieldingPoint;
}

function resolveLiveInfielderContactCatch(elapsedSeconds) {
  if (!defenseState.active || defenseState.resolved || defenseState.manualFielding) return false;
  if (defenseState.liveInfielderContactCatchComplete) return false;
  const battedBall = defenseState.battedBall;
  if (!battedBall || battedBall.fenceOver || battedBall.wallHit || battedBall.groundRuleDouble) return false;
  if (defenseState.outcome?.caught || defenseState.throw) return false;
  const height = getDefenseBallHeightAtPoint(
    clamp((performance.now() - defenseState.startTime) / defenseState.duration, 0, 1),
    elapsedSeconds
  );
  const maxContactHeight = getLiveCircleCatchMaxHeight(battedBall);
  if (height > maxContactHeight) return false;
  const fielders = defenseState.fielders || [];
  const candidates = fielders
    .map((fielder) => {
      const current = {
        x: fielder.currentX ?? fielder.x,
        y: fielder.currentY ?? fielder.y
      };
      const distance = Math.hypot(current.x - ball.x, current.y - ball.y);
      const radius = getLiveCircleCatchRadius(fielder, battedBall);
      return { fielder, current, distance, radius };
    })
    .filter((candidate) => candidate.distance <= candidate.radius)
    .sort((a, b) => a.distance - b.distance);
  const best = candidates[0];
  if (!best) return false;
  completeLiveInfielderContactCatch(best.fielder, best.current, elapsedSeconds, null, height);
  return true;
}

function resolveUnifiedFielderCircleCatch(elapsedSeconds) {
  if (!defenseState.active || defenseState.resolved || defenseState.unifiedCircleCatchComplete) return false;
  const battedBall = defenseState.battedBall;
  if (!battedBall || battedBall.fenceOver || battedBall.wallHit || battedBall.groundRuleDouble) return false;
  if (defenseState.throw?.active) return false;

  const progress = clamp((performance.now() - defenseState.startTime) / defenseState.duration, 0, 1);
  const height = getDefenseBallHeightAtPoint(progress, elapsedSeconds);
  if (height > 124) return false;

  const ballRadius = ball?.radius ?? 8;
  const candidates = (defenseState.fielders || [])
    .map((fielder) => {
      const current = getDefenseFielderDrawPosition(fielder);
      const circleRadius = getVisibleFielderCatchRangeRadius(fielder, battedBall);
      const distance = Math.hypot(current.x - ball.x, current.y - ball.y);
      return { fielder, current, distance, circleRadius };
    })
    .filter((candidate) => candidate.distance <= candidate.circleRadius + ballRadius)
    .sort((a, b) => a.distance - b.distance);

  const best = candidates[0];
  if (!best) return false;
  completeUnifiedCircleCatch(best.fielder, best.current, elapsedSeconds);
  return true;
}

function completeUnifiedCircleCatch(fielder, fieldingPoint, elapsedSeconds) {
  const battedBall = defenseState.battedBall;
  const contactHeight = getDefenseBallHeightAtPoint(
    clamp((performance.now() - defenseState.startTime) / defenseState.duration, 0, 1),
    elapsedSeconds
  );
  const caughtInAir = isCaughtAirBattedBallAtTime(battedBall, elapsedSeconds, contactHeight);

  startDefenseCatchVisual(fielder, fieldingPoint, elapsedSeconds, caughtInAir);
  defenseState.unifiedCircleCatchComplete = true;
  defenseState.throw = null;

  if (battedBall?.isFoulBall && !caughtInAir) {
    defenseState.target = fieldingPoint;
    defenseState.chosenFielder = { ...fielder, x: fieldingPoint.x, y: fieldingPoint.y, currentX: fieldingPoint.x, currentY: fieldingPoint.y };
    defenseState.outcome = {
      kind: "foul",
      label: "ファウル",
      caught: false,
      needsThrow: false,
      fieldingTime: elapsedSeconds,
      fieldingPoint
    };
    defenseState.duration = Math.max(defenseState.duration, elapsedSeconds * 1000 + 700);
    message = `${fielder.role} ファウルボール処理`;
    return;
  }

  if (defenseState.manualFielding) {
    completeManualDefenseFielding(fielder, elapsedSeconds, fieldingPoint, caughtInAir);
    return;
  }
  completeLiveInfielderContactCatch(fielder, fieldingPoint, elapsedSeconds, caughtInAir);
}

function startDefenseCatchVisual(fielder, fieldingPoint, elapsedSeconds, caughtInAir) {
  const battedBall = defenseState.battedBall;
  if (!battedBall || !fieldingPoint) return;
  const progress = clamp((performance.now() - defenseState.startTime) / defenseState.duration, 0, 1);
  const height = getDefenseBallHeightAtPoint(progress, elapsedSeconds);
  const visualHeight = getDefenseBallVisualHeightOffset(height, battedBall);
  const catchRadius = getVisibleFielderCatchRangeRadius(fielder, battedBall);
  const catchDistance = Math.hypot(ball.x - fieldingPoint.x, ball.y - fieldingPoint.y);
  defenseState.catchVisual = {
    startTime: elapsedSeconds,
    duration: caughtInAir ? 0.2 : 0.14,
    fromX: ball.x,
    fromY: ball.y - visualHeight,
    shadowX: ball.x,
    shadowY: ball.y,
    toX: fieldingPoint.x,
    toY: fieldingPoint.y - 32,
    point: { x: fieldingPoint.x, y: fieldingPoint.y },
    catchRadius,
    edgeCatchRatio: catchRadius > 0 ? catchDistance / catchRadius : 0,
    caughtInAir: Boolean(caughtInAir),
    fielderRole: fielder?.role || ""
  };
  defenseState.landingMissVisual = null;
}

function updateDefenseLandingMissVisual(elapsedSeconds) {
  if (!defenseState.active || defenseState.landingMissVisual || defenseState.unifiedCircleCatchComplete) return;
  const battedBall = defenseState.battedBall;
  if (!battedBall || battedBall.isGrounder || battedBall.wallHit || battedBall.fenceOver || battedBall.groundRuleDouble) return;
  const landingTime = Math.max(0.1, battedBall.ballTime ?? 1);
  if (elapsedSeconds < landingTime) return;
  const landing = defenseState.landingTarget || battedBall.target;
  if (!landing) return;
  const nearest = (defenseState.fielders || []).reduce((best, fielder) => {
    const point = getDefenseFielderDrawPosition(fielder);
    const radius = getVisibleFielderCatchRangeRadius(fielder, battedBall);
    const distance = Math.hypot(point.x - landing.x, point.y - landing.y);
    const candidate = { fielder, point, radius, distance };
    return !best || distance < best.distance ? candidate : best;
  }, null);
  defenseState.landingMissVisual = {
    startTime: elapsedSeconds,
    point: { x: landing.x, y: landing.y },
    fielderPoint: nearest ? { ...nearest.point } : null,
    catchRadius: nearest?.radius ?? 0,
    gap: nearest ? Math.max(0, nearest.distance - nearest.radius - (ball?.radius ?? 8)) : 0
  };
}

function resolveUnifiedCircleMissAfterArrival(elapsedSeconds) {
  if (!defenseState.active || defenseState.resolved || defenseState.unifiedCircleCatchComplete) return false;
  const outcome = defenseState.outcome;
  const battedBall = defenseState.battedBall;
  if (!outcome?.caught || !battedBall || battedBall.fenceOver || battedBall.wallHit) return false;
  if (isCaughtAirBattedBall(battedBall) && outcome.kind === "out" && !outcome.needsThrow) return false;
  const expectedArrival = Math.max(battedBall.ballTime ?? 0, outcome.fieldingTime ?? 0);
  if (elapsedSeconds <= expectedArrival + 0.12) return false;

  defenseState.throw = null;
  if (battedBall.isFoulBall) {
    defenseState.outcome = {
      kind: "foul",
      label: "ファウル",
      caught: false,
      needsThrow: false,
      fieldingTime: elapsedSeconds
    };
    defenseState.target = getFoulBallFieldingTarget(battedBall);
    return true;
  }

  const scoreType = battedBall.isDeep || battedBall.distance > defenseField.doubleDistance ? "double" : "single";
  const missedOutcome = {
    kind: scoreType,
    label: getHitLabelByScoreType(scoreType),
    scoreType,
    caught: false,
    needsThrow: false,
    fieldingTime: elapsedSeconds
  };
  defenseState.outcome = missedOutcome;
  defenseState.target = getManualDefenseUnfieldedTarget(battedBall, missedOutcome);
  if (defenseState.runner) {
    setBatterRunnerDestination(defenseState.runner, getBatterRunnerTargetBase(
      missedOutcome,
      battedBall,
      defenseState.target,
      defenseState.chosenFielder,
      defenseState.runner
    ));
  }
  defenseState.baseRunners = refreshDefenseBaseRunnerAnimations(
    missedOutcome,
    battedBall,
    null,
    defenseState.chosenFielder,
    defenseState.target
  );
  defenseState.forceTargets = createForceTargetsForPlay(battedBall, missedOutcome);
  defenseState.duration = Math.max(
    defenseState.duration,
    getDefenseDuration(battedBall, missedOutcome, defenseState.runner, null, defenseState.target)
  );
  return true;
}

function getLiveCircleCatchMaxHeight(battedBall) {
  if (!battedBall) return 0;
  if (battedBall.isGrounder) return 72;
  if (battedBall.isLineDrop || battedBall.isSoftDrop) return 106;
  if (battedBall.isLiner) return 118;
  if (battedBall.trajectory === "fly" || battedBall.isPopupFly || battedBall.isRoutineFly) return 124;
  return 104;
}

function getLiveCircleCatchRadius(fielder, battedBall) {
  const base = getLiveInfielderContactRadius(fielder, battedBall);
  const ballRadius = ball?.radius ?? 8;
  return base + ballRadius + 8;
}

function completeLiveInfielderContactCatch(fielder, fieldingPoint, elapsedSeconds, caughtInAirOverride = null, contactHeight = null) {
  const battedBall = defenseState.battedBall;
  const caughtInAir = caughtInAirOverride ?? isCaughtAirBattedBallAtTime(battedBall, elapsedSeconds, contactHeight);
  // 強い打球を弾いた場合はアウトにならず、拾い直すまで動けない
  const droppedLiner = caughtInAir && shouldDropBattedBallOnCatch(battedBall, fielder);
  const outcome = droppedLiner
    ? {
      kind: "force",
      label: `${fielder.role} 落球`,
      caught: true,
      needsThrow: true,
      targetBase: "first",
      fieldingTime: elapsedSeconds + getBattedBallDropFreezeSeconds(battedBall),
      fieldingPoint,
      errorPoint: fieldingPoint,
      // エフェクトは硬直明けではなく「弾いた瞬間」から出す
      dropTime: elapsedSeconds,
      linerDrop: true,
      droppedBall: true
    }
    : {
      kind: caughtInAir ? "out" : "force",
      label: `${fielder.role} 捕球処理`,
      caught: true,
      needsThrow: !caughtInAir,
      targetBase: "first",
      fieldingTime: elapsedSeconds,
      fieldingPoint
    };
  const chosenFielder = {
    ...fielder,
    x: fieldingPoint.x,
    y: fieldingPoint.y,
    currentX: fieldingPoint.x,
    currentY: fieldingPoint.y,
    fieldingPoint,
    distanceToTarget: 0
  };
  if (droppedLiner) showEffect("落球", "#ff6f61");
  defenseState.liveInfielderContactCatchComplete = true;
  defenseState.chosenFielder = chosenFielder;
  defenseState.target = fieldingPoint;
  defenseState.outcome = outcome;
  defenseState.fielders = defenseState.fielders.map((entry) => entry.role === fielder.role
    ? { ...entry, currentX: fieldingPoint.x, currentY: fieldingPoint.y, fieldingPoint }
    : entry);
  defenseState.baseRunners = refreshDefenseBaseRunnerAnimations(outcome, battedBall, null, chosenFielder, fieldingPoint);
  defenseState.forceTargets = createForceTargetsForPlay(battedBall, outcome);
  if (outcome.needsThrow) {
    defenseState.throw = createThrowState(chosenFielder, fieldingPoint, outcome, defenseState.runner, {
      manualWait: isManualThrowControl(),
      targetBase: getInitialDefenseThrowTargetBase(outcome, battedBall, defenseState.runner, {
        fielder: chosenFielder,
        fieldingTarget: fieldingPoint,
        baseRunners: defenseState.baseRunners,
        minStartTime: getFieldingTimeForThrowDecision(outcome, battedBall, fieldingPoint, chosenFielder),
        autoFallback: !isManualThrowControl()
      }),
      baseRunners: defenseState.baseRunners,
      minStartTime: getFieldingTimeForThrowDecision(outcome, battedBall, fieldingPoint, chosenFielder)
    });
  } else {
    defenseState.throw = null;
  }
  defenseState.duration = Math.max(
    defenseState.duration,
    elapsedSeconds * 1000 + 1400,
    getDefenseDuration(battedBall, outcome, defenseState.runner, defenseState.throw, fieldingPoint)
  );
  const metricText = getBattedBallMetricText(battedBall);
  message = metricText ? `${outcome.label} / ${metricText}` : outcome.label;
}

function isCaughtAirBattedBall(battedBall) {
  return Boolean(battedBall && !battedBall.isGrounder);
}

// 落下時刻だけで判定すると、描画上まだ浮いているボールが地面扱いになり、
// 「ノーバウンド捕球に見えるのにゴロ処理」という食い違いが出る。
// 接触時の高さが分かる場合はそちらを優先する。
function isCaughtAirBattedBallAtTime(battedBall, elapsedSeconds, contactHeight = null) {
  if (!isCaughtAirBattedBall(battedBall)) return false;
  if (Number.isFinite(contactHeight) && contactHeight >= airCatchMinHeight) return true;
  const firstLandingTime = Math.max(0, battedBall.ballTime ?? 0);
  return elapsedSeconds <= firstLandingTime + 0.08;
}

// 直接捕球を狙ったライナーは一定確率で弾く。
function isLinerTypeBattedBall(battedBall) {
  return Boolean(battedBall
    && (battedBall.isLiner || battedBall.isLineLiner || battedBall.isLineDrop || battedBall.isFenceLiner));
}

// 打球の強さで落球しやすさが決まる。ライナーは従来どおり基準10%。
function getBattedBallDropPowerScore(battedBall) {
  const span = Math.max(0.01, battedBallDropTuning.fullPower - battedBallDropTuning.minPower);
  return clamp(((battedBall?.power ?? 0) - battedBallDropTuning.minPower) / span, 0, 1);
}

function getBattedBallDropChance(battedBall, fielder) {
  if (!battedBall || battedBall.isBunt || battedBall.fenceOver || battedBall.wallHit) return 0;
  const linerType = isLinerTypeBattedBall(battedBall);
  if (!linerType && (battedBall.power ?? 0) < battedBallDropTuning.minPower) return 0;
  const powerScore = getBattedBallDropPowerScore(battedBall);
  const base = linerType
    ? battedBallDropTuning.linerChance
    : battedBallDropTuning.minChance
      + (battedBallDropTuning.maxChance - battedBallDropTuning.minChance) * powerScore;
  // 守備力5を基準にして増減する (5なら補正なし)
  const fieldingSkill = clamp((getFielderFieldingRating(fielder) - 5) / 5, -1, 1);
  const fieldingAdjust = -fieldingSkill * (battedBallDropTuning.fieldingSwing / 2);
  return clamp(base + fieldingAdjust, battedBallDropTuning.chanceFloor, battedBallDropTuning.chanceCeiling);
}

function getBattedBallDropFreezeSeconds(battedBall) {
  return battedBallDropTuning.freezeSeconds
    + getBattedBallDropPowerScore(battedBall) * battedBallDropTuning.freezePowerBonus;
}

function shouldDropBattedBallOnCatch(battedBall, fielder) {
  const chance = getBattedBallDropChance(battedBall, fielder);
  return chance > 0 && Math.random() < chance;
}

function resolveLivePostLandingPickup(elapsedSeconds) {
  if (!defenseState.active || defenseState.resolved || defenseState.manualFielding) return false;
  if (defenseState.livePostLandingPickupComplete) return false;
  const battedBall = defenseState.battedBall;
  if (!battedBall || battedBall.isGrounder || battedBall.fenceOver || battedBall.wallHit || battedBall.groundRuleDouble) return false;
  if (defenseState.outcome?.caught || defenseState.throw) return false;
  const ballTime = Math.max(0.1, battedBall.ballTime ?? 1);
  if (elapsedSeconds < ballTime + 0.02) return false;
  const height = getDefenseBallHeightAtPoint(
    clamp((performance.now() - defenseState.startTime) / defenseState.duration, 0, 1),
    elapsedSeconds
  );
  if (height > 72) return false;
  const candidates = (defenseState.fielders || [])
    .map((fielder) => {
      const current = {
        x: fielder.currentX ?? fielder.x,
        y: fielder.currentY ?? fielder.y
      };
      const distance = Math.hypot(current.x - ball.x, current.y - ball.y);
      const pickupBonus = !isInfielderRole(fielder.role) && (isOutfieldFrontLandingBall(battedBall) || isDeepDriveFrontLandingBall(battedBall))
        ? 42
        : 0;
      const radius = getFielderCatchRangeRadius(fielder, battedBall) + pickupBonus + 8;
      return { fielder, current, distance, radius };
    })
    .filter((candidate) => candidate.distance <= candidate.radius)
    .sort((a, b) => a.distance - b.distance);
  const best = candidates[0];
  if (!best) return false;
  completeLivePostLandingPickup(best.fielder, best.current, elapsedSeconds);
  return true;
}

function completeLivePostLandingPickup(fielder, fieldingPoint, elapsedSeconds) {
  const battedBall = defenseState.battedBall;
  const scoreType = defenseState.outcome?.scoreType || defenseState.outcome?.kind || (battedBall?.isDeep ? "double" : "single");
  const outcome = {
    kind: "force",
    label: `${fielder.role} バウンド処理`,
    scoreType,
    caught: true,
    needsThrow: true,
    targetBase: getBatterRunnerTargetBase(defenseState.outcome || { scoreType }, battedBall, fieldingPoint, fielder, defenseState.runner),
    fieldingTime: elapsedSeconds,
    fieldingPoint,
    postLandingPickup: true
  };
  const chosenFielder = {
    ...fielder,
    x: fieldingPoint.x,
    y: fieldingPoint.y,
    currentX: fieldingPoint.x,
    currentY: fieldingPoint.y,
    fieldingPoint,
    distanceToTarget: 0
  };
  defenseState.livePostLandingPickupComplete = true;
  defenseState.chosenFielder = chosenFielder;
  defenseState.target = fieldingPoint;
  defenseState.outcome = outcome;
  defenseState.fielders = defenseState.fielders.map((entry) => entry.role === fielder.role
    ? { ...entry, currentX: fieldingPoint.x, currentY: fieldingPoint.y, fieldingPoint }
    : entry);
  defenseState.baseRunners = refreshDefenseBaseRunnerAnimations(outcome, battedBall, null, chosenFielder, fieldingPoint);
  defenseState.forceTargets = createForceTargetsForPlay(battedBall, outcome);
  defenseState.throw = createThrowState(chosenFielder, fieldingPoint, outcome, defenseState.runner, {
    manualWait: isManualThrowControl(),
    targetBase: getInitialDefenseThrowTargetBase(outcome, battedBall, defenseState.runner, {
      fielder: chosenFielder,
      fieldingTarget: fieldingPoint,
      baseRunners: defenseState.baseRunners,
      minStartTime: getFieldingTimeForThrowDecision(outcome, battedBall, fieldingPoint, chosenFielder),
      autoFallback: !isManualThrowControl()
    }),
    baseRunners: defenseState.baseRunners,
    minStartTime: getFieldingTimeForThrowDecision(outcome, battedBall, fieldingPoint, chosenFielder)
  });
  defenseState.duration = Math.max(
    defenseState.duration,
    elapsedSeconds * 1000 + 1400,
    getDefenseDuration(battedBall, outcome, defenseState.runner, defenseState.throw, fieldingPoint)
  );
  const metricText = getBattedBallMetricText(battedBall);
  message = metricText ? `${outcome.label} / ${metricText}` : outcome.label;
}

function shouldUseIncrementalPostLandingChase(elapsedSeconds, chaseTarget) {
  const battedBall = defenseState.battedBall;
  if (!battedBall || battedBall.isGrounder || battedBall.wallHit || battedBall.fenceOver) return false;
  const ballTime = Math.max(0.1, battedBall.ballTime ?? 1);
  if (elapsedSeconds <= ballTime) return false;
  const landing = defenseState.landingTarget || battedBall.target;
  if (!landing || !chaseTarget) return false;
  if (shouldOutfielderChaseLivePostLandingBall(battedBall, elapsedSeconds, ballTime)) return true;
  return Math.hypot(chaseTarget.x - landing.x, chaseTarget.y - landing.y) > 12;
}

function updateManualDefenseFielders(deltaSeconds) {
  const move = getManualDefenseMoveVector();
  defenseState.fielders = defenseState.fielders.map((fielder) => {
    const currentX = fielder.currentX ?? fielder.x;
    const currentY = fielder.currentY ?? fielder.y;
    const assist = getManualFlyAutoAssistVector(fielder);
    const combined = normalizeManualDefenseMove({
      x: assist.x + move.x * move.magnitude * 0.85,
      y: assist.y + move.y * move.magnitude * 0.85
    });
    if (!combined.magnitude) return { ...fielder, currentX, currentY };
    const fielding = getFielderFieldingRating(fielder);
    const speed = getFielderSpeed(fielder) * (0.72 + fielding * 0.035) * combined.magnitude;
    const current = clampFielderOutsideRiversideRiver(clampPointInsideFence({
      x: currentX + combined.x * speed * deltaSeconds,
      y: currentY + combined.y * speed * deltaSeconds
    }, 36), fielder.role);
    return {
      ...fielder,
      currentX: current.x,
      currentY: current.y
    };
  });
}

function getManualFlyAutoAssistVector(fielder) {
  const battedBall = defenseState.battedBall;
  if (!defenseState.manualFielding || !battedBall || battedBall.isGrounder || battedBall.isLiner || battedBall.wallHit || battedBall.fenceOver) {
    return { x: 0, y: 0, magnitude: 0 };
  }
  if (fielder.role !== getManualFlyAssistFielderRole()) return { x: 0, y: 0, magnitude: 0 };
  const landing = defenseState.landingTarget || battedBall.target;
  if (!landing) return { x: 0, y: 0, magnitude: 0 };
  const currentX = fielder.currentX ?? fielder.x;
  const currentY = fielder.currentY ?? fielder.y;
  const dx = landing.x - currentX;
  const dy = landing.y - currentY;
  const distance = Math.hypot(dx, dy);
  const stopRadius = Math.max(34, getManualDefenseCatchRadius(fielder, battedBall) * 0.62);
  if (distance <= stopRadius) return { x: 0, y: 0, magnitude: 0 };
  const ease = clamp((distance - stopRadius) / 180, 0.18, 1);
  return {
    x: dx / distance * ease,
    y: dy / distance * ease,
    magnitude: ease
  };
}

function getManualFlyAssistFielderRole() {
  const battedBall = defenseState.battedBall;
  const landing = defenseState.landingTarget || battedBall?.target;
  if (!landing || !defenseState.fielders?.length) return null;
  const best = defenseState.fielders.reduce((closest, fielder) => {
    const currentX = fielder.currentX ?? fielder.x;
    const currentY = fielder.currentY ?? fielder.y;
    const distance = Math.hypot(currentX - landing.x, currentY - landing.y);
    return !closest || distance < closest.distance ? { role: fielder.role, distance } : closest;
  }, null);
  return best?.role ?? null;
}

function normalizeManualDefenseMove(vector) {
  const magnitude = Math.hypot(vector.x, vector.y);
  if (!magnitude) return { x: 0, y: 0, magnitude: 0 };
  return {
    x: vector.x / magnitude,
    y: vector.y / magnitude,
    magnitude: clamp(magnitude, 0, 1)
  };
}

function getManualDefenseMoveVector() {
  let x = 0;
  let y = 0;
  const gamepad = getGamepadForTeam(fieldingTeam());
  if (gamepad) {
    x += gamepad.axes?.[0] ?? 0;
    y += gamepad.axes?.[1] ?? 0;
    if (isGamepadButtonDown(gamepad, 14)) x -= 1;
    if (isGamepadButtonDown(gamepad, 15)) x += 1;
    if (isGamepadButtonDown(gamepad, 12)) y -= 1;
    if (isGamepadButtonDown(gamepad, 13)) y += 1;
  }
  if (keysDown.has("KeyA") || keysDown.has("a") || keysDown.has("A")) x -= 1;
  if (keysDown.has("KeyD") || keysDown.has("d") || keysDown.has("D")) x += 1;
  if (keysDown.has("KeyW") || keysDown.has("w") || keysDown.has("W")) y -= 1;
  if (keysDown.has("KeyS") || keysDown.has("s") || keysDown.has("S")) y += 1;
  if (Math.abs(x) < 0.18) x = 0;
  if (Math.abs(y) < 0.18) y = 0;
  const magnitude = Math.hypot(x, y);
  if (!magnitude) return { x: 0, y: 0, magnitude: 0 };
  return {
    x: x / magnitude,
    y: y / magnitude,
    magnitude: clamp(magnitude, 0, 1)
  };
}

function resolveManualDefenseFielding(elapsedSeconds) {
  const battedBall = defenseState.battedBall;
  if (!battedBall || defenseState.manualFieldingComplete) return;
  const closest = getClosestManualDefenseFielderToBall();
  if (!closest) return;
  defenseState.chosenFielder = closest.fielder;
  defenseState.manualCatchRadius = getManualDefenseCatchRadius(closest.fielder, battedBall);
  const ballHasLanded = elapsedSeconds > (battedBall.ballTime ?? 0) + 0.18;
  const missDeadline = Math.max(5.2, (battedBall.ballTime ?? 1) + getManualDefenseMissGrace(battedBall));
  if (ballHasLanded && elapsedSeconds >= missDeadline && isBatterRunnerSettledForResolution()) {
    completeManualDefenseMiss(elapsedSeconds);
  }
}

function getManualFlyLandingCatch(elapsedSeconds) {
  const battedBall = defenseState.battedBall;
  if (!battedBall || battedBall.isGrounder || battedBall.wallHit || battedBall.fenceOver) {
    return { caught: false, fielder: null, distance: Infinity };
  }
  const ballTime = battedBall.ballTime ?? 0;
  const catchWindowStart = Math.max(0, ballTime - (battedBall.trajectory === "fly" ? 0.42 : 0.18));
  if (elapsedSeconds < catchWindowStart) return { caught: false, fielder: null, distance: Infinity };
  const landing = defenseState.landingTarget || battedBall.target;
  if (!landing) return { caught: false, fielder: null, distance: Infinity };
  return defenseState.fielders.reduce((best, fielder) => {
    const current = {
      x: fielder.currentX ?? fielder.x,
      y: fielder.currentY ?? fielder.y
    };
    const distance = Math.hypot(current.x - landing.x, current.y - landing.y);
    const radius = getManualDefenseCatchRadius(fielder, battedBall) + (battedBall.trajectory === "fly" ? 4 : 4);
    const candidate = {
      caught: elapsedSeconds <= ballTime + 0.18 && distance <= radius,
      fielder: { ...fielder, x: current.x, y: current.y, currentX: current.x, currentY: current.y },
      distance
    };
    if (!best || candidate.distance < best.distance) return candidate;
    return best;
  }, null) || { caught: false, fielder: null, distance: Infinity };
}

function getClosestManualDefenseFielderToBall() {
  if (!defenseState.fielders?.length) return null;
  return defenseState.fielders.reduce((best, fielder) => {
    const current = {
      x: fielder.currentX ?? fielder.x,
      y: fielder.currentY ?? fielder.y
    };
    const distance = Math.hypot(current.x - ball.x, current.y - ball.y);
    const candidate = { fielder: { ...fielder, x: current.x, y: current.y, currentX: current.x, currentY: current.y }, distance };
    return !best || candidate.distance < best.distance ? candidate : best;
  }, null);
}

function getManualDefenseCatchRadius(fielder, battedBall) {
  return getStableFielderCatchRangeRadius(fielder);
}

function getFielderCatchRangeRadius(fielder, battedBall) {
  return getStableFielderCatchRangeRadius(fielder);
}

function getStableFielderCatchRangeRadius(fielder) {
  if (Number.isFinite(fielder?.catchRangeRadius)) return fielder.catchRangeRadius;
  return calculateFielderCatchRangeRadius(fielder);
}

function calculateFielderCatchRangeRadius(fielder) {
  const fielding = getFielderRangeFieldingRating(fielder);
  return (42 + fielding * 5.2) * 1.2;
}

function initializeFielderCatchRanges(fielders) {
  return (fielders || []).map((fielder) => ({
    ...fielder,
    currentX: fielder.x,
    currentY: fielder.y,
    catchRangeRadius: calculateFielderCatchRangeRadius(fielder)
  }));
}

function getFielderRangeFieldingRating(fielder) {
  const rosterRating = getCurrentDefenseRatingForRole(fielder?.role);
  if (Number.isFinite(rosterRating)) return getOpenEndedAbilityRating(rosterRating);
  const direct = Number.isFinite(fielder?.fielding)
    ? fielder.fielding
    : Number.isFinite(fielder?.speed)
      ? fielder.speed
      : null;
  if (direct !== null) return getOpenEndedAbilityRating(direct);
  const roleMatch = defenseState?.fielders?.find((entry) => entry.role === fielder?.role);
  if (Number.isFinite(roleMatch?.fielding)) return getOpenEndedAbilityRating(roleMatch.fielding);
  if (Number.isFinite(roleMatch?.speed)) return getOpenEndedAbilityRating(roleMatch.speed);
  return 5;
}

function getCurrentDefenseRatingForRole(role) {
  if (!role) return null;
  if (role === "P") return getTeamActivePitcher(fieldingTeam())?.fielding ?? null;
  const entry = selected?.[fieldingTeam()]?.batters?.find((item) => item.role === role);
  const player = entry?.player;
  if (!player) return null;
  return getBatterDefenseRating(player, role);
}

function getVisibleFielderCatchRangeRadius(fielder, battedBall) {
  return getFielderCatchRangeRadius(fielder, battedBall);
}

function getLiveInfielderContactRadius(fielder, battedBall) {
  return getFielderCatchRangeRadius(fielder, battedBall);
}

function getManualDefensePickupRadius(fielder, battedBall, elapsedSeconds) {
  const baseRadius = getManualDefenseCatchRadius(fielder, battedBall);
  if (!battedBall) return baseRadius;
  const landed = elapsedSeconds > (battedBall.ballTime ?? 0) + 0.08;
  if (battedBall.isGrounder) return baseRadius * 1.18;
  if (landed) return baseRadius * 1.28;
  return baseRadius;
}

function getManualDefenseMissGrace(battedBall) {
  if (battedBall?.isGrounder) return 4.4;
  if (battedBall?.isLiner) return 3.8;
  return 6.2;
}

function completeManualDefenseFielding(fielder, elapsedSeconds, fieldingPointOverride = null, caughtInAirOverride = null) {
  const battedBall = defenseState.battedBall;
  const fieldingPoint = fieldingPointOverride || { x: fielder.currentX ?? fielder.x, y: fielder.currentY ?? fielder.y };
  const caughtInAir = caughtInAirOverride ?? isCaughtAirBattedBallAtTime(battedBall, elapsedSeconds);
  const droppedLiner = caughtInAir && shouldDropBattedBallOnCatch(battedBall, fielder);
  const label = droppedLiner
    ? `${fielder.role} 落球`
    : caughtInAir ? `${fielder.role} 捕球` : `${fielder.role} 捕球処理`;
  defenseState.manualFieldingComplete = true;
  defenseState.target = fieldingPoint;
  defenseState.chosenFielder = { ...fielder, x: fieldingPoint.x, y: fieldingPoint.y, currentX: fieldingPoint.x, currentY: fieldingPoint.y };
  defenseState.fielders = defenseState.fielders.map((entry) => entry.role === fielder.role
    ? { ...entry, currentX: fieldingPoint.x, currentY: fieldingPoint.y }
    : entry);
  defenseState.outcome = caughtInAir && !droppedLiner
    ? {
      kind: "out",
      label,
      caught: true,
      needsThrow: false,
      fieldingTime: elapsedSeconds,
      fieldingPoint,
      manualFielding: true
    }
    : {
      kind: "force",
      label,
      caught: true,
      needsThrow: true,
      // 弾いた場合は拾い直すまで動けない
      fieldingTime: elapsedSeconds + (droppedLiner ? getBattedBallDropFreezeSeconds(battedBall) : 0),
      fieldingPoint,
      errorPoint: droppedLiner ? fieldingPoint : undefined,
      dropTime: droppedLiner ? elapsedSeconds : undefined,
      manualFielding: true,
      linerDrop: droppedLiner,
      droppedBall: droppedLiner
    };
  defenseState.baseRunners = refreshDefenseBaseRunnerAnimations(
    defenseState.outcome,
    battedBall,
    null,
    defenseState.chosenFielder,
    fieldingPoint
  );
  defenseState.forceTargets = createForceTargetsForPlay(battedBall, defenseState.outcome);
  if (defenseState.outcome.needsThrow) {
    defenseState.throw = createThrowState(defenseState.chosenFielder, fieldingPoint, defenseState.outcome, defenseState.runner, {
      manualWait: true,
      targetBase: getInitialDefenseThrowTargetBase(defenseState.outcome, battedBall, defenseState.runner),
      baseRunners: defenseState.baseRunners,
      minStartTime: Math.max(
        elapsedSeconds,
        getFieldingTimeForThrowDecision(defenseState.outcome, battedBall, fieldingPoint, defenseState.chosenFielder)
      )
    });
    if (defenseState.throw) {
      defenseState.throw.holdDeadline = Math.max(defenseState.throw.holdDeadline ?? 0, elapsedSeconds + 6);
    }
    refreshDefenseThrowSafety();
  } else {
    defenseState.throw = isManualThrowControl()
      ? null
      : createTagUpVisualThrowState(
        defenseState.chosenFielder,
        fieldingPoint,
        defenseState.outcome,
        battedBall,
        defenseState.baseRunners,
        { live: true }
      );
  }
  defenseState.duration = Math.max(
    elapsedSeconds * 1000 + 1600,
    getDefenseDuration(battedBall, defenseState.outcome, defenseState.runner, defenseState.throw, fieldingPoint)
  );
  const baseMessage = defenseState.outcome.needsThrow ? `${fielder.role} 捕球、送球先を選択` : `${fielder.role} 捕球`;
  const metricText = getBattedBallMetricText(defenseState.battedBall);
  message = metricText ? `${baseMessage} / ${metricText}` : baseMessage;
}

function completeManualDefenseMiss(elapsedSeconds) {
  const scoreType = getScoringHitType(defenseState.automaticOutcome) || "single";
  defenseState.manualFieldingComplete = true;
  defenseState.manualFieldingMissed = true;
  defenseState.outcome = {
    kind: scoreType,
    label: getHitLabelByScoreType(scoreType),
    scoreType,
    caught: false,
    needsThrow: false,
    fieldingTime: elapsedSeconds,
    manualFielding: true
  };
  defenseState.throw = null;
  defenseState.duration = Math.max(defenseState.duration, elapsedSeconds * 1000 + 1200);
  const metricText = getBattedBallMetricText(defenseState.battedBall);
  message = metricText ? `捕球できず、ヒット / ${metricText}` : "捕球できず、ヒット";
}

function getDefenseFielderMovementTarget(fielder, elapsedSeconds) {
  if (!fielder || !defenseState.active || !defenseState.battedBall) return null;
  if (fielder.role === defenseState.chosenFielder?.role) {
    return clampOutfielderBeyondRiversideRiver(getDefenseFielderChaseTarget(elapsedSeconds), fielder.role);
  }
  if (!isInfielderRole(defenseState.chosenFielder?.role) && shouldInfielderAttemptRollingRoute(fielder, defenseState.battedBall, defenseState.target)) {
    return getInfielderRollingAttemptTarget(fielder, defenseState.battedBall, defenseState.target);
  }
  if (isInfielderAttemptRouteBall(fielder, defenseState.battedBall)) {
    return getClosestPointOnBattedBallRoute(fielder, defenseState.battedBall);
  }
  if (shouldInfielderAttemptRollingRoute(fielder, defenseState.battedBall, defenseState.target)) {
    return getInfielderRollingAttemptTarget(fielder, defenseState.battedBall, defenseState.target);
  }
  return null;
}

function getInfielderRollingAttemptTarget(fielder, battedBall, fieldingTarget) {
  const rollingBall = { ...battedBall, target: fieldingTarget };
  const routeTarget = getClosestPointOnBattedBallRoute(fielder, rollingBall);
  const directionX = Math.sign((fieldingTarget?.x ?? routeTarget.x) - fielder.x) || Math.sign((battedBall?.direction?.x ?? 0)) || 1;
  const minStep = 34;
  if (Math.abs(routeTarget.x - fielder.x) < minStep) {
    return {
      ...routeTarget,
      x: fielder.x + directionX * minStep
    };
  }
  return routeTarget;
}

function shouldInfielderAttemptRollingRoute(fielder, battedBall, fieldingTarget) {
  if (!fielder || !isTemporaryInfielderRole(fielder.role)) return false;
  if (!battedBall?.isGrounder || !fieldingTarget) return false;
  if (battedBall.wallHit || battedBall.groundRuleDouble || battedBall.fenceOver) return false;
  if (isInfielderNearGrounderRoute(fielder, { ...battedBall, target: fieldingTarget })) return true;
  const slowInfieldRoller = isSlowInfieldBounceGrounder(battedBall);
  const softInfieldRoller = isSoftInfieldGrounder(battedBall);
  if (!isMiddleInfieldBounceGrounder(battedBall) && !slowInfieldRoller && !softInfieldRoller && !battedBall.grounderGap) return false;
  const rollingBall = { ...battedBall, target: fieldingTarget };
  const point = getClosestPointOnBattedBallRoute(fielder, rollingBall);
  const progress = getBattedBallRouteProgressForPoint(point, rollingBall);
  if (progress < 0.1 || progress > 0.97) return false;
  const distance = Math.hypot(point.x - fielder.x, point.y - fielder.y);
  const fielding = getFielderFieldingRating(fielder);
  const radius = defenseRangeTuning.closeHardBallRadius
    + fielding * 20
    + 184
    + (battedBall.grounderGap ? 72 : 0)
    + (slowInfieldRoller ? 106 : 0)
    + (softInfieldRoller ? 88 : 0);
  return distance <= radius;
}

function showImmediateCatchOutCall(elapsedSeconds) {
  const outcome = defenseState.outcome;
  if (!outcome || defenseState.outCallShown) return;
  if (!defenseState.unifiedCircleCatchComplete) return;
  if (outcome.kind !== "out" || !outcome.caught || outcome.needsThrow) return;
  const fieldingTime = Math.max(0.1, outcome.fieldingTime ?? defenseState.battedBall?.ballTime ?? 1);
  if (elapsedSeconds < fieldingTime) return;
  defenseState.outCallShown = true;
  message = `${outcome.label}、アウト`;
  showEffect("アウト", "#ffcf70");
}

function getDefenseFielderChaseTarget(elapsedSeconds) {
  if (defenseState.battedBall?.fenceOver) return defenseState.target;
  const ballTime = Math.max(0.1, defenseState.battedBall?.ballTime ?? 1);
  if (isOutfieldFlyChaseToLanding(defenseState.battedBall, elapsedSeconds, ballTime)) {
    return defenseState.landingTarget || defenseState.target;
  }
  if (shouldOutfielderChaseLivePostLandingBall(defenseState.battedBall, elapsedSeconds, ballTime)) {
    return { x: ball.x, y: ball.y };
  }
  if (defenseState.outcome?.caught || defenseState.throw) return defenseState.target;
  return defenseState.target;
}

function shouldOutfielderChaseLivePostLandingBall(battedBall, elapsedSeconds, ballTime) {
  if (!battedBall || battedBall.isGrounder || battedBall.fenceOver || battedBall.wallHit || battedBall.groundRuleDouble) return false;
  if (!isOutfieldFrontLandingBall(battedBall) && !isDeepDriveFrontLandingBall(battedBall) && !isOutfieldFlyLandingBall(battedBall)) return false;
  return elapsedSeconds > ballTime + 0.04 && !defenseState.throw && !defenseState.outcome?.caught;
}

function isOutfieldFlyChaseToLanding(battedBall, elapsedSeconds, ballTime) {
  if (!battedBall || battedBall.isGrounder || battedBall.fenceOver) return false;
  if (isOutfieldFlyLandingBall(battedBall)) return elapsedSeconds <= ballTime + 0.42;
  if (isOutfieldFrontLandingBall(battedBall)) return elapsedSeconds <= ballTime + 0.16;
  return elapsedSeconds <= ballTime;
}

// タッチアップ・ゴロアウト進塁に限らず、打者走者以外の走者がまだ次の塁へ
// 走っている間はプレーを終わらせない。ここで待たないと、送球プレーの猶予時間
// (throwState.holdDeadline) だけで判定が確定してしまい、例えば1塁走者が
// 本塁を狙って走っている途中で送球側の処理が先に片付いたときに、
// 生還が認められないまま直前の塁で足止めされてしまう。
function getAdvancingRunnerHoldDeadline(baseRunners = defenseState.baseRunners) {
  const arrivals = (baseRunners || [])
    .filter((runner) => runner && !runner.isOut && !runner.arrived)
    .map((runner) => runner.arrivalTime)
    .filter(Number.isFinite);
  return arrivals.length ? Math.max(...arrivals) : null;
}

function shouldResolveDefensePlayNow(elapsedSeconds) {
  const outcome = defenseState.outcome;
  if (!outcome || defenseState.resolved) return false;
  if (outcome.pendingManualFielding) return false;
  refreshDefenseThrowSafety();

  if (outcome.kind === "homer" || outcome.scoreType === "homer" || defenseState.battedBall?.fenceOver) {
    return elapsedSeconds >= getHomeRunPlayFinishTime(
      defenseState.battedBall,
      defenseState.homeRunFireworks
    );
  }

  // 手動送球では、投げるかどうかを決める時間を待つ
  if (isManualThrowDecisionPending(elapsedSeconds)) return false;

  if (outcome.kind === "out" && outcome.caught && !outcome.needsThrow) {
    if (!defenseState.unifiedCircleCatchComplete) return false;
    const tagUpThrowHold = Number.isFinite(defenseState.throw?.holdDeadline)
      ? defenseState.throw.holdDeadline
      : outcome.fieldingTime + defenseThrowResultHoldSeconds;
    const manualTagUpHold = getManualTagUpHoldDeadline(outcome);
    const advancingHold = getAdvancingRunnerHoldDeadline();
    const holdDeadline = Math.max(
      Number.isFinite(manualTagUpHold) ? Math.max(tagUpThrowHold, manualTagUpHold) : tagUpThrowHold,
      Number.isFinite(advancingHold) ? advancingHold : Number.NEGATIVE_INFINITY
    );
    return elapsedSeconds >= holdDeadline
      && isBatterRunnerSettledForResolution();
  }

  if (defenseState.manualFieldingComplete && !outcome.needsThrow && !outcome.caught) {
    return elapsedSeconds >= (outcome.fieldingTime ?? elapsedSeconds) + 1
      && isBatterRunnerSettledForResolution();
  }

  const throwState = defenseState.throw;
  if (throwState) {
    const advancingHold = getAdvancingRunnerHoldDeadline();
    const combinedHoldDeadline = Number.isFinite(advancingHold)
      ? Math.max(throwState.holdDeadline, advancingHold)
      : throwState.holdDeadline;
    if (!Number.isFinite(throwState.startTime)) {
      return elapsedSeconds >= combinedHoldDeadline && isBatterRunnerSettledForResolution();
    }
    if (Number.isFinite(throwState.endTime)) {
      return elapsedSeconds >= combinedHoldDeadline
        && isBatterRunnerSettledForResolution();
    }
  }

  return false;
}

function retargetCpuDefenseThrowToAdvancingRunner(elapsedSeconds = 0) {
  if (isManualThrowControl()) return false;
  const caughtFly = defenseState.outcome?.kind === "out" && defenseState.outcome.caught;
  const candidates = [
    ...(defenseState.baseRunners || []),
    ...(caughtFly ? [] : [defenseState.runner])
  ]
    .filter((runner) => runner && !runner.isOut && runner.targetBase && !runner.arrived)
    .sort((a, b) => {
      const baseDifference = getBatterRunnerTargetIndex(b.targetBase) - getBatterRunnerTargetIndex(a.targetBase);
      if (baseDifference !== 0) return baseDifference;
      return (a.arrivalTime ?? Number.POSITIVE_INFINITY) - (b.arrivalTime ?? Number.POSITIVE_INFINITY);
    });
  const threatenedRunner = candidates[0];
  if (!threatenedRunner || !defenseState.chosenFielder || !defenseState.target) return false;

  const previousThrow = defenseState.throw;
  // endTime (ボール到着) ではなく startTime (野手が実際に投げた瞬間) を基準に、
  // まだ捕球・送球準備中で「投げてすらいない」送球先は差し替えられるようにする。
  // 以前は endTime 基準だったため、一塁への送球先を決めた直後、
  // 野手がまだボールにすら触れていない段階でも「もう一塁へ投げる予定だから」と
  // 差し替えを拒否し、打者走者が二塁・三塁へ向かっているのに無駄な一塁送球が
  // 確定してしまっていた。
  const previousThrowReleased = previousThrow && Number.isFinite(previousThrow.startTime) && elapsedSeconds >= previousThrow.startTime;
  if (previousThrowReleased && Number.isFinite(previousThrow.endTime) && elapsedSeconds < previousThrow.endTime) {
    return previousThrow.targetBase === threatenedRunner.targetBase;
  }
  if (
    previousThrow
    && previousThrow.targetBase === threatenedRunner.targetBase
    && Number.isFinite(previousThrow.endTime)
  ) {
    refreshDefenseThrowSafety();
    previousThrow.holdDeadline = Math.max(
      previousThrow.holdDeadline ?? elapsedSeconds,
      (threatenedRunner.arrivalTime ?? elapsedSeconds) + defenseThrowResultHoldSeconds
    );
    return true;
  }

  const isRelay = Boolean(
    previousThrow
    && Number.isFinite(previousThrow.endTime)
    && elapsedSeconds >= previousThrow.endTime
  );
  const from = isRelay ? previousThrow.to : defenseState.target;
  const thrower = isRelay
    ? { ...(defenseState.chosenFielder || {}), arm: 5, fielding: 5 }
    : defenseState.chosenFielder;
  const throwOutcome = {
    ...(defenseState.outcome || {}),
    caught: true,
    needsThrow: true
  };
  const nextThrow = createThrowState(thrower, from, throwOutcome, threatenedRunner, {
    targetBase: threatenedRunner.targetBase,
    immediate: true,
    startTime: Math.max(elapsedSeconds, throwOutcome.fieldingTime ?? 0),
    minStartTime: Math.max(elapsedSeconds, throwOutcome.fieldingTime ?? 0),
    baseRunners: defenseState.baseRunners
  });
  if (!nextThrow) return false;
  if (caughtFly) {
    nextThrow.tagUpPlay = true;
  } else {
    defenseState.outcome = {
      ...defenseState.outcome,
      kind: "force",
      caught: true,
      needsThrow: true
    };
  }
  defenseState.throw = nextThrow;
  defenseState.heldBallBase = null;
  defenseState.heldBallSince = null;
  defenseState.duration = Math.max(
    defenseState.duration ?? 0,
    getDefenseDuration(
      defenseState.battedBall,
      defenseState.outcome,
      defenseState.runner,
      defenseState.throw,
      defenseState.target
    ),
    (nextThrow.holdDeadline + 0.4) * 1000
  );
  return true;
}

function getHomeRunPlayFinishTime(battedBall, fireworks) {
  const ballTime = Math.max(0.15, battedBall?.ballTime ?? 0.7);
  if (!fireworks) return ballTime + 1.2;
  const startDelay = Math.max(ballTime, fireworks.startDelay ?? 0);
  const fullEffectFinish = startDelay + Math.max(0, fireworks.duration ?? 0);
  const standardCelebrationFinish = startDelay + 5.8;
  return Math.min(fullEffectFinish, standardCelebrationFinish);
}

function isBatterRunnerSettledForResolution() {
  const runner = defenseState.runner;
  if (!runner) return true;
  return Boolean(runner.arrived && isRunnerAtDefenseBase(runner));
}

function isRunnerAtDefenseBase(runner) {
  if (!runner) return true;
  const targetIndex = getBatterRunnerTargetIndex(runner.targetBase ?? runner.currentBase ?? "first");
  const point = getDefenseBasePoint(targetIndex);
  return Math.hypot((runner.x ?? point.x) - point.x, (runner.y ?? point.y) - point.y) < 2;
}

function updateBatterRunner(elapsedSeconds) {
  const runner = defenseState.runner;
  if (!runner) return;
  const routeStartTime = runner.routeStartTime ?? 0;
  const routeDuration = runner.routeDuration ?? runner.arrivalTime;
  const runnerProgress = routeDuration > 0 ? clamp((elapsedSeconds - routeStartTime) / routeDuration, 0, 1) : 1;
  const point = getRunnerRoutePoint(runner.route || [runner.start, runner.destination], runnerProgress);
  runner.x = point.x;
  runner.y = point.y;
  updateBatterRunnerTouchedBase(runner, runnerProgress);
  runner.arrived = runnerProgress >= 1;
  if (runner.arrived) {
    runner.currentBase = runner.targetBase;
    runner.reachedBaseTime = runner.arrivalTime;
    runner.running = false;
    runner.returnBase = getPreviousBatterRunnerBase(runner.currentBase) || runner.returnBase;
  }
}

function updateBatterRunnerTouchedBase(runner, runnerProgress) {
  if (!runner?.route || runner.route.length < 2) return;
  const currentIndex = getRunnerBaseIndex(runner.currentBase ?? "home");
  const totalDistance = getRunnerRouteDistance(runner.route);
  const traveledDistance = totalDistance * clamp(runnerProgress, 0, 1);
  let distanceToPoint = 0;
  for (let i = 1; i < runner.route.length; i += 1) {
    const previous = runner.route[i - 1];
    const current = runner.route[i];
    distanceToPoint += Math.hypot(current.x - previous.x, current.y - previous.y);
    if (traveledDistance + 0.1 < distanceToPoint) continue;
    const baseIndex = getDefenseBaseIndexForPoint(current);
    if (baseIndex > currentIndex && baseIndex <= 3) {
      runner.currentBase = baseNameByIndex[baseIndex];
      runner.returnBase = getPreviousBatterRunnerBase(runner.currentBase) || runner.returnBase;
    }
  }
}

function getDefenseBaseIndexForPoint(point) {
  for (let base = 0; base <= 3; base += 1) {
    const basePoint = getDefenseBasePoint(base);
    if (Math.hypot(point.x - basePoint.x, point.y - basePoint.y) < 1) return base;
  }
  return -1;
}

// 打者走者と違い、塁上走者は最終到達 (arrived) までルート途中の currentBase を更新していなかった。
// そのため「1塁→本塁」のように複数塁を一気に進む走者は、完全に生還するまで
// ずっと currentBase が "first" のままとなり、二塁への封殺義務がいつまでも解けなかった。
// ルート上の通過点 (各塁) を踏むたびに currentBase を進めることで、途中経過を正しく反映する。
function updateDefenseBaseRunnerTouchedBase(runner, runnerProgress) {
  if (!runner?.route || runner.route.length < 2) return;
  const currentBaseName = runner.currentBase ?? runner.startBase;
  const currentIndex = currentBaseName === "home" ? 4 : (baseIndexByName[currentBaseName] ?? 0);
  const totalDistance = getRunnerRouteDistance(runner.route);
  const traveledDistance = totalDistance * clamp(runnerProgress, 0, 1);
  let distanceToPoint = 0;
  for (let i = 1; i < runner.route.length; i += 1) {
    const previous = runner.route[i - 1];
    const current = runner.route[i];
    distanceToPoint += Math.hypot(current.x - previous.x, current.y - previous.y);
    if (traveledDistance + 0.1 < distanceToPoint) continue;
    const baseIndex = getDefenseRunnerBaseIndexForPoint(current);
    if (baseIndex > currentIndex && baseIndex >= 1 && baseIndex <= 4) {
      runner.currentBase = baseIndex >= 4 ? "home" : baseNameByIndex[baseIndex];
    }
  }
}

// getDefenseBaseIndexForPoint は base 0(ホーム側の起点) までしか見ないため、
// 塁上走者の最終目的地としてのホーム (base 4、座標は base 0 と同じ) を判定できない。
function getDefenseRunnerBaseIndexForPoint(point) {
  for (let base = 1; base <= 4; base += 1) {
    const basePoint = getDefenseBasePoint(base);
    if (Math.hypot(point.x - basePoint.x, point.y - basePoint.y) < 1) return base;
  }
  return -1;
}

function updateDefenseBaseRunners(elapsedSeconds) {
  if (!defenseState.baseRunners?.length) return;
  defenseState.baseRunners.forEach((runner) => {
    if (!runner.route || runner.route.length < 2 || runner.arrivalTime <= 0) {
      const point = runner.route?.[0] || getDefenseBasePoint(baseIndexByName[runner.startBase] ?? 0);
      runner.x = point.x;
      runner.y = point.y;
      runner.arrived = true;
      return;
    }
    const routeStartTime = runner.routeStartTime ?? 0;
    const routeDuration = runner.routeDuration ?? runner.arrivalTime;
    const runnerProgress = routeDuration > 0 ? clamp((elapsedSeconds - routeStartTime) / routeDuration, 0, 1) : 1;
    const point = getRunnerRoutePoint(runner.route, runnerProgress);
    runner.x = point.x;
    runner.y = point.y;
    updateDefenseBaseRunnerTouchedBase(runner, runnerProgress);
    runner.arrived = runnerProgress >= 1;
    if (runner.arrived) {
      runner.currentBase = runner.targetBase || runner.startBase;
      runner.reachedBaseTime = runner.arrivalTime;
      runner.running = false;
      runner.returning = false;
    }
  });
}

function getRunnerRoutePoint(route, progress) {
  if (!route || route.length < 2) return route?.[0] || defenseField.bases.home;
  const totalDistance = getRunnerRouteDistance(route);
  let remaining = totalDistance * clamp(progress, 0, 1);
  for (let i = 1; i < route.length; i += 1) {
    const previous = route[i - 1];
    const current = route[i];
    const segmentDistance = Math.hypot(current.x - previous.x, current.y - previous.y);
    if (remaining <= segmentDistance || i === route.length - 1) {
      const t = segmentDistance > 0 ? clamp(remaining / segmentDistance, 0, 1) : 1;
      return {
        x: previous.x + (current.x - previous.x) * t,
        y: previous.y + (current.y - previous.y) * t
      };
    }
    remaining -= segmentDistance;
  }
  return route[route.length - 1];
}

function updateThrowState(elapsedSeconds) {
  const throwState = defenseState.throw;
  if (!throwState) return;
  throwState.active = elapsedSeconds >= throwState.startTime && elapsedSeconds <= throwState.endTime;
  if (Number.isFinite(throwState.endTime) && elapsedSeconds >= throwState.endTime && !throwState.completed) {
    throwState.completed = true;
    defenseState.heldBallBase = throwState.targetBase || null;
    defenseState.heldBallSince = throwState.endTime;
    refreshDefenseThrowSafety();
    if (getForceOutBasesFromThrowState(throwState).length) {
      recordCompletedForceOut(throwState);
    }
    retargetCpuDefenseThrowToAdvancingRunner(elapsedSeconds);
  }
}

function recordCompletedForceOut(throwState) {
  if (!throwState || throwState.safe || !throwState.targetBase) return;
  defenseState.completedForceOutBases = defenseState.completedForceOutBases || [];
  if (!defenseState.completedForceOutBases.includes(throwState.targetBase)) {
    defenseState.completedForceOutBases.push(throwState.targetBase);
  }
  removeCompletedForceOutRunnersFromDefenseDisplay();
}

function removeCompletedForceOutRunnersFromDefenseDisplay() {
  const forceOutBases = defenseState.completedForceOutBases || [];
  if (!forceOutBases.length) return;
  const outStartBases = new Set(forceOutBases.map(getForcedRunnerStartBaseForTarget).filter(Boolean));
  if (outStartBases.has("batter") && defenseState.runner) {
    defenseState.runner.forceOut = true;
  }
  if (defenseState.baseRunners?.length) {
    defenseState.baseRunners = defenseState.baseRunners.filter((runner) => !outStartBases.has(runner.startBase));
  }
}

function getForceOutBasesFromThrowState(throwState) {
  if (throwState?.visualOnly) return [];
  if (!throwState?.targetBase || !Number.isFinite(throwState.endTime)) return [];
  if (!isForceThrowTargetBase(throwState.targetBase, defenseState.outcome, defenseState.battedBall)) return [];
  const forcedRunner = getForcedRunnerForThrowTarget(throwState.targetBase, defenseState.runner, defenseState.baseRunners);
  if (!forcedRunner || !Number.isFinite(forcedRunner.arrivalTime)) return [];
  if (isDefenseRunnerAlreadySafeAtThrowTarget(throwState, forcedRunner)) return [];
  const judgment = judgeOutPlay(forcedRunner, throwState.targetBase, throwState);
  return judgment.result === "FORCE_OUT" ? [throwState.targetBase] : [];
}

function getThrowOutRunner(throwState) {
  if (throwState?.visualOnly) return null;
  if (throwState?.tagUpPlay) return null;
  if (!throwState?.targetBase || !Number.isFinite(throwState.endTime)) return null;
  const forcedRunner = getForcedRunnerForThrowTarget(throwState.targetBase, defenseState.runner, defenseState.baseRunners);
  if (forcedRunner) {
    const judgment = judgeOutPlay(forcedRunner, throwState.targetBase, throwState);
    if (judgment.out) {
      logDefenseJudgment({
        ...judgment,
        runnerId: getRunnerKey(forcedRunner),
        targetBase: throwState.targetBase,
        time: throwState.endTime
      });
      return forcedRunner;
    }
  }
  const targetRunners = getDefenseThrowTargetRunners(
    throwState.targetBase,
    defenseState.runner,
    defenseState.baseRunners,
    defenseState.outcome
  );
  for (const runner of targetRunners) {
    const judgment = judgeOutPlay(runner, throwState.targetBase, throwState);
    logDefenseJudgment({
      ...judgment,
      runnerId: getRunnerKey(runner),
      targetBase: throwState.targetBase,
      time: throwState.endTime
    });
    if (judgment.out) return runner;
  }
  return null;
}

function getDefenseBallPoint(progress, eased, elapsedSeconds = 0) {
  const throwState = defenseState.throw;
  if (throwState && elapsedSeconds >= throwState.startTime) {
    const throwProgress = clamp((elapsedSeconds - throwState.startTime) / throwState.throwTime, 0, 1);
    return getThrowPointAtProgress(throwState, throwProgress);
  }

  const landing = defenseState.landingTarget || defenseState.target;
  const outcome = defenseState.outcome;
  if (defenseState.battedBall?.isGrounder && !defenseState.battedBall.wallHit && !defenseState.battedBall.fenceOver) {
    const target = defenseState.target || landing;
    const travelSeconds = outcome?.caught
      ? Math.max(0.1, outcome.fieldingTime ?? defenseState.battedBall.ballTime ?? 1)
      : getGrounderContinuousRollDuration(defenseState.battedBall, landing, target);
    const t = getGrounderContinuousRollProgress(elapsedSeconds / travelSeconds);
    return {
      x: defenseState.origin.x + (target.x - defenseState.origin.x) * t,
      y: defenseState.origin.y + (target.y - defenseState.origin.y) * t
    };
  }
  if (outcome?.caught) {
    const fieldingTime = Math.max(0.1, outcome.fieldingTime ?? defenseState.battedBall?.ballTime ?? 1);
    const catchProgress = clamp(elapsedSeconds / fieldingTime, 0, 1);
    const t = getBattedBallTravelProgress(catchProgress);
    return {
      x: defenseState.origin.x + (defenseState.target.x - defenseState.origin.x) * t,
      y: defenseState.origin.y + (defenseState.target.y - defenseState.origin.y) * t
    };
  }
  if (defenseState.battedBall?.wallHit) {
    const ballTime = Math.max(0.1, defenseState.battedBall.ballTime ?? 1);
    if (elapsedSeconds <= ballTime) {
      const travelProgress = getBattedBallTravelProgress(clamp(elapsedSeconds / ballTime, 0, 1));
      return {
        x: defenseState.origin.x + (landing.x - defenseState.origin.x) * travelProgress,
        y: defenseState.origin.y + (landing.y - defenseState.origin.y) * travelProgress
      };
    }
    const reboundDuration = getDefenseRollDuration(defenseState.battedBall, landing, defenseState.target);
    const reboundProgress = clamp((elapsedSeconds - ballTime) / reboundDuration, 0, 1);
    const t = 1 - Math.pow(1 - reboundProgress, 1.15);
    return {
      x: landing.x + (defenseState.target.x - landing.x) * t,
      y: landing.y + (defenseState.target.y - landing.y) * t
    };
  }
  if (defenseState.battedBall?.fenceOver) {
    const ballTime = Math.max(0.1, defenseState.battedBall.ballTime ?? 1);
    const travelProgress = getBattedBallTravelProgress(clamp(elapsedSeconds / ballTime, 0, 1));
    const homerTarget = defenseState.landingTarget || defenseState.battedBall.target || defenseState.target;
    return {
      x: defenseState.origin.x + (homerTarget.x - defenseState.origin.x) * travelProgress,
      y: defenseState.origin.y + (homerTarget.y - defenseState.origin.y) * travelProgress
    };
  }

  const ballTime = Math.max(0.1, defenseState.battedBall?.ballTime ?? defenseState.duration / 1000);
  if (elapsedSeconds <= ballTime) {
    const t = getBattedBallTravelProgress(elapsedSeconds / ballTime);
    return {
      x: defenseState.origin.x + (landing.x - defenseState.origin.x) * t,
      y: defenseState.origin.y + (landing.y - defenseState.origin.y) * t
    };
  }
  const rollProgress = getDefenseRollProgress(elapsedSeconds, ballTime);
  const t = getRollingEaseProgress(rollProgress);
  return {
    x: landing.x + (defenseState.target.x - landing.x) * t,
    y: landing.y + (defenseState.target.y - landing.y) * t
  };
}

function getGrounderContinuousRollDuration(battedBall, landing, target) {
  const firstHopSeconds = Math.max(0.1, battedBall?.ballTime ?? 0.45);
  const rollSeconds = getDefenseRollDuration(battedBall, landing, target);
  return Math.max(0.35, firstHopSeconds + rollSeconds * 0.86);
}

function getGrounderContinuousRollProgress(progress) {
  const t = clamp(progress, 0, 1);
  return 1 - Math.pow(1 - t, 1.85);
}

function getPostLandingHoldSeconds(battedBall) {
  if (!battedBall || battedBall.isGrounder) return 0;
  if (isDeepDriveFrontLandingBall(battedBall)) return 0.08;
  if (isOutfieldFrontLandingBall(battedBall)) return 0.08;
  if (battedBall.isSoftDrop) return 0.58;
  if (battedBall.isLiner) return 0.44;
  return 0.34;
}

function shouldResetTrailAtLanding(elapsedSeconds) {
  const battedBall = defenseState.battedBall;
  if (!battedBall || battedBall.isGrounder || battedBall.wallHit || battedBall.fenceOver) return false;
  if (defenseState.trailResetAtLanding) return false;
  if (defenseState.outcome?.caught && !defenseState.outcome?.needsThrow) return false;
  return elapsedSeconds >= Math.max(0.1, battedBall.ballTime ?? 1);
}

function getRollingEaseProgress(progress, battedBall = defenseState.battedBall) {
  const t = clamp(progress, 0, 1);
  if (isDeepDriveFrontLandingBall(battedBall)) {
    return getSmoothPostLandingRollProgress(t, 1.62, 1.06);
  }
  if (isOutfieldFrontLandingBall(battedBall)) {
    return getSoftOutfieldDropRollProgress(t);
  }
  const exponent = isHardGrounder(battedBall) ? 1.82 : 1.72;
  const startExponent = isHardGrounder(battedBall) ? 0.96 : 1.12;
  return getSmoothPostLandingRollProgress(t, exponent, startExponent);
}

function getSoftOutfieldDropRollProgress(progress) {
  const t = clamp(progress, 0, 1);
  return 1 - Math.pow(1 - Math.pow(t, 1.25), 1.55);
}

function getSmoothPostLandingRollProgress(progress, easeOutExponent = 1.72, startExponent = 1.12) {
  const t = clamp(progress, 0, 1);
  return 1 - Math.pow(1 - Math.pow(t, startExponent), easeOutExponent);
}

function getDefenseRollDuration(battedBall, landing, target) {
  const rollDistance = Math.hypot(target.x - landing.x, target.y - landing.y);
  if (battedBall?.wallHit) {
    const powerFactor = clamp(0.86 + (battedBall.power ?? 0.9) * 0.08, 0.86, 1.02);
    return clamp(
      rollDistance / (wallReboundTuning.baseRollSpeed * powerFactor),
      wallReboundTuning.minRollSeconds,
      wallReboundTuning.maxRollSeconds
    );
  }
  const trajectory = battedBall?.trajectory;
  const baseSpeed = isDeepDriveFrontLandingBall(battedBall)
    ? 440
    : isOutfieldFrontLandingBall(battedBall)
    ? 210
    : isHardGrounder(battedBall) ? hardGrounderTuning.rollBaseSpeed : trajectory === "grounder" ? 430 : trajectory === "liner" ? 390 : 350;
  const powerFactor = isDeepDriveFrontLandingBall(battedBall)
    ? clamp(0.82 + (battedBall?.power ?? 1.1) * 0.14, 0.92, 1.18)
    : isOutfieldFrontLandingBall(battedBall)
    ? clamp(0.68 + (battedBall?.power ?? 0.6) * 0.14, 0.68, 0.86)
    : battedBall?.power ? clamp(0.72 + battedBall.power * 0.18, 0.72, 0.96) : 0.82;
  const minSeconds = isDeepDriveFrontLandingBall(battedBall) ? 1.25 : isOutfieldFrontLandingBall(battedBall) ? 1.35 : 1.15;
  const maxSeconds = isDeepDriveFrontLandingBall(battedBall) ? 4.2 : isOutfieldFrontLandingBall(battedBall) ? 4.8 : 8.4;
  return clamp(rollDistance / (baseSpeed * battedBallPaceMultiplier * powerFactor), minSeconds, maxSeconds);
}

function getDefenseRollProgress(elapsedSeconds, ballTime) {
  const landing = defenseState.landingTarget || defenseState.target;
  const rollTime = getDefenseRollDuration(defenseState.battedBall, landing, defenseState.target);
  return clamp((elapsedSeconds - ballTime) / rollTime, 0, 1);
}

function getBattedBallTravelProgress(progress) {
  const clamped = clamp(progress, 0, 1);
  const trajectory = defenseState.battedBall?.trajectory;
  if (trajectory === "fly") return clamped;
  if (trajectory === "liner") return clamped;
  if (trajectory === "grounder") return clamped;
  return 1 - Math.pow(1 - clamped, 1.35);
}

function isObviousFoulFlyOut(battedBall) {
  return Boolean(
    battedBall?.isFoulBall
      && !battedBall.rolledFoulBeforeOutfield
      && !battedBall.isGrounder
      && battedBall.trajectory === "fly"
  );
}

function shouldOfferXStadiumPromptBeforeDefenseFinish(outcome) {
  return Boolean(
    getCurrentStadium().hasMStadium
      && !isAnyPracticeMode()
      && !xStadiumPrompt.active
      && xStadiumPrompt.offeredDefenseStartTime !== defenseState.startTime
      && (outcome?.scoreType === "homer" || outcome?.kind === "homer" || defenseState.battedBall?.fenceOver)
  );
}

function showXStadiumPrompt() {
  xStadiumPrompt = {
    active: true,
    offeredDefenseStartTime: defenseState.startTime,
    goRect: null,
    dontRect: null
  };
  gamePhase = "xStadiumPrompt";
  message = "XスタジアムにGOしますか？";
}

function handleXStadiumPromptChoice(goToXStadium) {
  if (!xStadiumPrompt.active) return false;
  xStadiumPrompt.active = false;
  if (goToXStadium) {
    applyStadiumPreset("xStadium");
    message = "XスタジアムへGO！試合はMスタジアムの続きです";
  } else {
    message = "Mスタジアムで試合を続けます";
  }
  gamePhase = "defense";
  finishDefensePlay();
  return true;
}

function finishDefensePlay() {
  const outcome = defenseState.outcome;
  if (shouldOfferXStadiumPromptBeforeDefenseFinish(outcome)) {
    showXStadiumPrompt();
    return;
  }
  const defendingPitcher = activePitcher;
  const metricText = getBattedBallMetricText(defenseState.battedBall);
  refreshDefenseThrowSafety();
  defenseState.resolved = true;
  defenseState.active = false;
  gamePhase = "playing";
  ball.active = false;
  if (defenseState.foulPlay) {
    if (handleHomeRunDerbyPitchResult(false, metricText, defenseState.battedBall)) return;
    if (outcome?.caught) {
      count.outs += 1;
      recordBatterPlateAppearance("out");
      recordLastOutBatter(battingTeam, activeBatter);
      recordPitcherOuts(fieldingTeam(), defendingPitcher, 1);
      adjustPitcherStamina(defendingPitcher, staminaTuning.outRecovery);
      resetCountOnly();
      const baseMessage = `${outcome.label || "ファールフライ"}、アウト`;
      message = metricText ? `${baseMessage} / ${metricText}` : baseMessage;
      showEffect("ファールアウト", "#ffcf70");
      if (!resetPracticePlateAppearance()) {
        if (count.outs >= 3 && maybeDelayGameEndAfterFinalOut()) {
          appendHomeRunVisionAdviceToMessage(defenseState.battedBall);
          defenseState.active = true;
          gamePhase = "defense";
          return;
        }
        advanceBattingOrder();
        setMatchup();
      }
      checkCountEnd();
    } else {
      if (count.strikes < 2) count.strikes += 1;
      const baseMessage = `ファウル: ${outcome?.label || "ファールボール"}`;
      message = metricText ? `${baseMessage} / ${metricText}` : baseMessage;
      showEffect("ファウル", "#fff2a8");
    }
    appendHomeRunVisionAdviceToMessage(defenseState.battedBall);
    if (gamePhase === "playing" && !isInputLocked()) scheduleNextPitch(900);
    return;
  }
  resetCountOnly();

  if (isHomeRunDerbyMode()) {
    const isHomer = outcome?.scoreType === "homer" || defenseState.battedBall?.fenceOver;
    handleHomeRunDerbyPitchResult(isHomer, metricText, defenseState.battedBall);
    return;
  }

  const forceOutBasesFromThrow = getForceOutBasesFromThrowState(defenseState.throw);
  const completedForceOutBases = defenseState.completedForceOutBases || [];
  const throwOutRunner = getThrowOutRunner(defenseState.throw);
  const throwOut = defenseState.throw && (forceOutBasesFromThrow.length > 0 || completedForceOutBases.length > 0 || throwOutRunner);
  if (outcome.kind === "force" || throwOut) {
    if (throwOut) {
      if (forceOutBasesFromThrow.length) {
        defenseState.completedForceOutBases = [
          ...new Set([...(defenseState.completedForceOutBases || []), ...forceOutBasesFromThrow])
        ];
        defenseState.throw.safe = false;
        removeCompletedForceOutRunnersFromDefenseDisplay();
      }
      const forceOutBases = defenseState.completedForceOutBases || [];
      const isForceOut = forceOutBases.length > 0;
      const outsBeforePlay = count.outs;
      const runnerSnapshot = captureBaseRunnerAdvanceSnapshot();
      if (isForceOut) recordCompletedForceOut(defenseState.throw);
      // 捕球アウト (打者) と送球アウトは同じプレーで同時に起こる。
      // 以前は throwOut が真だと捕球アウトを扱う else if に入れず、打者のアウトが
      // 数えられないうえ、アウトのはずの打者が一塁に置かれて満塁が維持されていた。
      const caughtBatterOut = outcome.kind === "out" && outcome.caught && !outcome.needsThrow;
      if (caughtBatterOut && count.outs < 3) {
        recordDefenseOutEvent({
          runner: defenseState.runner || activeBatter,
          base: null,
          outType: "fly",
          time: outcome.fieldingTime ?? defenseState.battedBall?.ballTime,
          reason: "Batter-runner out on legal catch during a throw play"
        });
        count.outs += 1;
        recordLastOutBatter(battingTeam, activeBatter);
        recordPitcherOuts(fieldingTeam(), defendingPitcher, 1);
        adjustPitcherStamina(defendingPitcher, staminaTuning.outRecovery);
      }
      // clamp は min > max のとき min を返すので、残りアウト数が 0 でも 1 を足してしまう。
      const remainingOuts = Math.max(0, 3 - count.outs);
      const outsToAdd = Math.min(isForceOut ? Math.max(1, forceOutBases.length) : 1, remainingOuts);
      if (isForceOut) {
        forceOutBases.slice(0, outsToAdd).forEach((base) => {
          recordDefenseOutEvent({
            runner: getForcedRunnerForThrowTarget(base, defenseState.runner, defenseState.baseRunners),
            base,
            outType: "force",
            time: defenseState.throw?.endTime,
            reason: "Force play recorded at forced base"
          });
        });
      } else {
        recordDefenseOutEvent({
          runner: throwOutRunner,
          base: defenseState.throw?.targetBase,
          outType: "tag",
          time: defenseState.throw?.endTime,
          reason: "Non-forced runner retired on tag play"
        });
      }
      count.outs += outsToAdd;
      recordLastOutFromDefense(forceOutBases, throwOutRunner);
      recordPitcherOuts(fieldingTeam(), defendingPitcher, outsToAdd);
      adjustPitcherStamina(defendingPitcher, staminaTuning.outRecovery);
      // 封殺で3アウト目が成立した場合、その回の得点は認めない。
      const runs = resolveDefensePlayBaseState({
        batterInfo: activeBatter,
        forceOutBases: isForceOut ? forceOutBases : [],
        outRunners: isForceOut ? [] : [throwOutRunner],
        batterOut: caughtBatterOut,
        allowRuns: !(isForceOut && count.outs >= 3)
      });
      const batterResultType = caughtBatterOut
        ? getCaughtOutBatterResultType(runs)
        : getForcePlayBatterResultType({
            forceOutBases: isForceOut ? forceOutBases : [],
            outsBeforePlay,
            outsToAdd,
            runnerSnapshot,
            runs
          });
      recordBatterPlateAppearance(batterResultType, { runs });
      const throwOutMessage = outsToAdd >= 2 ? "ゲッツー" : `${defenseState.throw.baseLabel}アウト`;
      const outMessage = caughtBatterOut
        ? `${outcome.label || "フライ"}、アウト / ${throwOutMessage}`
        : throwOutMessage;
      const playLabel = batterResultType === "sacrificeBunt" ? `犠打 / ${outMessage}` : outMessage;
      const baseMessage = runs > 0 ? `${playLabel} / 進塁 ${runs}点` : playLabel;
      message = metricText ? `${baseMessage} / ${metricText}` : baseMessage;
      showEffect(runs > 0 ? `進塁 +${runs}` : outsToAdd >= 2 ? "ゲッツー" : "アウト", "#ffcf70");
    } else {
      const advanceType = getBatterRunnerAdvanceTypeFromThrow(defenseState.throw);
      const hitRecordType = getBatterFinalHitRecordType(advanceType);
      if (!outcome.fieldingError && outcome.kind === "force") {
        recordPitcherHitAllowed(fieldingTeam(), defendingPitcher, 1);
        if (hitRecordType === "homer") recordPitcherStat(fieldingTeam(), defendingPitcher, "homeRunsAllowed", 1);
      }
      // 送球プレーや手動進塁ではアニメーション上の到達塁が正。
      // それ以外 (送球が発生しなかったヒット) だけ打球結果から機械的に進塁させる。
      const useDefenseAnimation = (outcome.kind === "force" && defenseState.baseRunners?.length)
        || (defenseState.runner?.manualControlled && defenseState.runner.targetBase !== "first");
      const runs = useDefenseAnimation
        ? resolveDefensePlayBaseState({ batterInfo: activeBatter })
        : advanceRunners(advanceType, activeBatter, defenseState.battedBall, outcome);
      recordBatterPlateAppearance(!outcome.fieldingError && outcome.kind === "force" ? hitRecordType : "fielderChoice", { runs });
      const baseLabel = defenseState.throw?.baseLabel || "一塁";
      const baseMessage = withBattedBallHighlight(`${baseLabel}セーフ: ${formatRuns(runs)}`);
      message = metricText ? `${baseMessage} / ${metricText}` : baseMessage;
      showEffect(runs > 0 ? `セーフ +${runs}` : "セーフ", "#fff2a8");
    }
  } else if (outcome.kind === "out") {
    recordDefenseOutEvent({
      runner: defenseState.runner || activeBatter,
      base: null,
      outType: "fly",
      time: outcome.fieldingTime ?? defenseState.battedBall?.ballTime,
      reason: "Batter-runner out on legal catch"
    });
    count.outs += 1;
    recordLastOutBatter(battingTeam, activeBatter);
    recordPitcherOuts(fieldingTeam(), defendingPitcher, 1);
    adjustPitcherStamina(defendingPitcher, staminaTuning.outRecovery);
    const advanceRuns = count.outs < 3 ? applyDefenseOutAdvancements() : 0;
    const batterResultType = getCaughtOutBatterResultType(advanceRuns);
    recordBatterPlateAppearance(batterResultType, { runs: advanceRuns });
    const advanced = count.outs < 3 && hasDefenseOutAdvancements();
    const baseMessage = batterResultType === "sacrificeFly"
      ? `${outcome.label}、犠牲フライ / 進塁 ${advanceRuns}点`
      : advanceRuns > 0
      ? `${outcome.label}、アウト / 進塁 ${advanceRuns}点`
      : advanced
      ? `${outcome.label}、アウト / ランナー進塁`
      : `${outcome.label}、アウト`;
    message = metricText ? `${baseMessage} / ${metricText}` : baseMessage;
    showEffect(advanceRuns > 0 ? `進塁 +${advanceRuns}` : "アウト", "#ffcf70");
  } else if (outcome.fieldingError) {
    const runs = advanceRunners("single", activeBatter, defenseState.battedBall, outcome);
    recordBatterPlateAppearance("error", { runs });
    const baseMessage = `${outcome.label}: ${formatRuns(runs)}`;
    message = metricText ? `${baseMessage} / ${metricText}` : baseMessage;
    showEffect(runs > 0 ? `エラー +${runs}` : "エラー", "#ff6f61");
  } else {
    const scoreType = getScoringHitType(outcome);
    const hitRecordType = getBatterFinalHitRecordType(scoreType);
    if (scoringHitTypes.has(hitRecordType)) recordPitcherHitAllowed(fieldingTeam(), defendingPitcher, 1);
    if (hitRecordType === "homer") recordPitcherStat(fieldingTeam(), defendingPitcher, "homeRunsAllowed", 1);
    const runs = advanceRunners(scoreType, activeBatter, defenseState.battedBall, outcome);
    recordBatterPlateAppearance(hitRecordType, { runs });
    const label = getHitLabelByScoreType(hitRecordType);
    const baseMessage = withBattedBallHighlight(`${label}: ${formatRuns(runs)}`);
    message = metricText ? `${baseMessage} / ${metricText}` : baseMessage;
    const effectText = hitRecordType === "homer" && metricText
      ? `${label} ${metricText.replace("飛距離 ", "")}`
      : runs > 0 ? `${label} +${runs}` : label;
    showEffect(effectText, hitRecordType === "homer" ? "#ff6f61" : "#fff2a8");
  }

  appendHomeRunVisionAdviceToMessage(defenseState.battedBall);
  if (pendingGameEnd || (!isAnyPracticeMode() && count.outs >= 3 && maybeDelayGameEndAfterFinalOut())) {
    defenseState.active = true;
    gamePhase = "defense";
    return;
  }
  if (!resetPracticePlateAppearance()) {
    advanceBattingOrder();
    setMatchup();
  }
  checkCountEnd();
  if (gamePhase === "playing" && !isInputLocked()) scheduleNextPitch(900);
}

// --- 守備プレー終了時の塁状態の確定 ------------------------------------------
// 封殺・タッチアウト・セーフ・手動進塁はどれも「アニメーション上の走者が最終的に
// どの塁にいるか、誰がアウトか」を塁状態へ写す処理でしかないので、1本にまとめる。
// 経路ごとに別実装を持つと、押し出しの有無や走者の上書きが食い違う。
function getDefensePlayElapsedSeconds() {
  if (!Number.isFinite(defenseState.startTime)) return null;
  const elapsed = (performance.now() - defenseState.startTime) / 1000;
  return Number.isFinite(elapsed) ? elapsed : null;
}

// 走路上のどこまで塁を踏み終えたか。到達前に判定が下りた走者を、実際には
// 踏んでいない塁へ進めてしまわないために使う。
function getDefenseRunnerCompletedBaseIndex(runner) {
  // 走路の起点は「いま踏んでいる塁」。手動指示で走路を引き直した場合もこれに合う。
  const originBase = runner?.currentBase ?? runner?.startBase;
  const startIndex = originBase === "batter" ? 0 : baseIndexByName[originBase] ?? 0;
  const route = runner?.route;
  if (!route || route.length < 2) return startIndex;
  let completed = startIndex;
  for (let index = 1; index < route.length; index += 1) {
    const previous = route[index - 1];
    const current = route[index];
    const segment = Math.hypot(current.x - previous.x, current.y - previous.y);
    const traveled = Math.hypot((runner.x ?? previous.x) - previous.x, (runner.y ?? previous.y) - previous.y);
    if (traveled + 1 < segment) break;
    completed = startIndex + index;
  }
  return Math.min(4, completed);
}

// 走者が最終的に到達した塁。到達していなければ踏み終えた塁で止める。
function getSettledRunnerBase(runner, resolutionTime = getDefensePlayElapsedSeconds()) {
  if (!runner) return null;
  const target = runner.manualTargetBase || runner.targetBase || runner.currentBase || runner.startBase;
  if (!target) return null;
  if (runner.arrived) return target;
  if (Number.isFinite(runner.arrivalTime) && Number.isFinite(resolutionTime) && runner.arrivalTime <= resolutionTime) {
    return target;
  }
  const completedIndex = getDefenseRunnerCompletedBaseIndex(runner);
  if (completedIndex >= 4) return "home";
  // 打者走者は本塁が出発点なので、踏み終えた塁が 0 でも「生還」ではなく一塁扱いにする。
  return baseNameByIndex[Math.max(1, completedIndex)] || runner.startBase || null;
}

function getDefensePlayOutStartBases(forceOutBases = [], outRunners = []) {
  const outStartBases = new Set(
    forceOutBases.map(getForcedRunnerStartBaseForTarget).filter(Boolean)
  );
  outRunners.forEach((runner) => {
    if (!runner) return;
    const startBase = runner === defenseState.runner ? "batter" : runner.startBase;
    if (startBase) outStartBases.add(startBase);
  });
  return outStartBases;
}

function resolveDefensePlayBaseState(options = {}) {
  const batterInfo = options.batterInfo;
  const forceOutBases = (options.forceOutBases || []).filter(Boolean);
  const outRunners = (options.outRunners || []).filter(Boolean);
  const outStartBases = getDefensePlayOutStartBases(forceOutBases, outRunners);
  // 捕球アウトの打者は送球の対象走者ではないので、呼び出し側から明示的に受け取る。
  if (options.batterOut) outStartBases.add("batter");
  const batterOut = outStartBases.has("batter");
  const resolutionTime = getDefensePlayElapsedSeconds();
  const batterBase = getSettledRunnerBase(defenseState.runner, resolutionTime) || "first";
  // 打者走者が一塁を占めると、詰まっている走者は進むしかない。
  // 打者が一塁で封殺された場合は封じが解けるので誰も進まない。
  const forcedLimit = !batterOut && batterBase === "first" ? getForcedAdvanceBaseLimit(bases) : 0;
  const results = [];
  const animatedStartBases = new Set();

  (defenseState.baseRunners || []).forEach((runner) => {
    if (!runner?.startBase) return;
    animatedStartBases.add(runner.startBase);
    const startIndex = baseIndexByName[runner.startBase] ?? 0;
    const settledBase = getSettledRunnerBase(runner, resolutionTime) || runner.startBase;
    const settledIndex = getBatterRunnerTargetIndex(settledBase);
    // 封じられた走者はその場に留まれない。
    const forcedIndex = startIndex >= 1 && startIndex <= forcedLimit ? startIndex + 1 : 0;
    const finalIndex = Math.max(settledIndex, forcedIndex);
    results.push(createRunnerResult(
      runner,
      runner.startBase,
      finalIndex >= 4 ? "home" : baseNameByIndex[finalIndex] || runner.startBase,
      { out: outStartBases.has(runner.startBase) }
    ));
  });

  // アニメーションを持たない走者 (封殺で表示から外れた走者など) を拾う。
  for (let baseIndex = 1; baseIndex <= 3; baseIndex += 1) {
    const baseName = baseNameByIndex[baseIndex];
    const runnerInfo = bases[baseName];
    if (!runnerInfo || animatedStartBases.has(baseName)) continue;
    const forced = baseIndex <= forcedLimit;
    const nextBaseName = baseIndex >= 3 ? "home" : baseNameByIndex[baseIndex + 1];
    results.push(createRunnerResult(runnerInfo, baseName, forced ? nextBaseName : baseName, {
      out: outStartBases.has(baseName)
    }));
  }

  if (batterInfo) {
    results.push(createRunnerResult(makeBaseRunner(batterInfo), "batter", batterBase, { out: batterOut }));
  }

  return applyRunnerResults(results, { allowRuns: options.allowRuns }).runs;
}

function getForcedRunnerStartBaseForTarget(targetBase) {
  if (targetBase === "first") return "batter";
  const outBaseIndex = getForceTargetBaseIndex(targetBase);
  if (outBaseIndex <= 1) return null;
  return baseNameByIndex[outBaseIndex - 1] || null;
}

function getBatterRunnerAdvanceTypeFromThrow(throwState) {
  const batterTarget = defenseState.runner?.targetBase || "first";
  if (batterTarget === "home") return "homer";
  if (batterTarget === "third") return "triple";
  if (batterTarget === "second") return "double";
  return "single";
}

function getBatterFinalHitRecordType(baseHitType = "single") {
  const normalizedBase = scoringHitTypes.has(baseHitType) ? baseHitType : "single";
  const batterTarget = defenseState.runner?.targetBase || "first";
  const finalType = batterTarget === "home"
    ? "homer"
    : batterTarget === "third"
      ? "triple"
      : batterTarget === "second"
        ? "double"
        : normalizedBase;
  const baseRank = { single: 1, double: 2, triple: 3, homer: 4 };
  return (baseRank[finalType] || 1) > (baseRank[normalizedBase] || 1) ? finalType : normalizedBase;
}

function captureBaseRunnerAdvanceSnapshot(baseState = bases) {
  return baseNames
    .map((baseName) => ({
      runnerKey: getBatterRecordKey(baseState?.[baseName]),
      startBase: baseName
    }))
    .filter((entry) => entry.runnerKey !== "unknown");
}

function didSnapshotRunnerAdvance(snapshot = [], runs = 0, baseState = bases) {
  if (runs > 0) return true;
  return snapshot.some((entry) => {
    const destination = baseNames.find((baseName) => getBatterRecordKey(baseState?.[baseName]) === entry.runnerKey);
    return destination && baseIndexByName[destination] > baseIndexByName[entry.startBase];
  });
}

function getForcePlayBatterResultType(options = {}) {
  const forceOutBases = options.forceOutBases || [];
  const batterOutAtFirst = forceOutBases.includes("first");
  const isSacrificeBunt = batterOutAtFirst
    && defenseState.battedBall?.isBunt
    && !defenseState.outcome?.fieldingError
    && (options.outsBeforePlay ?? 0) < 2
    && options.outsToAdd === 1
    && didSnapshotRunnerAdvance(options.runnerSnapshot, options.runs);
  if (isSacrificeBunt) return "sacrificeBunt";
  return batterOutAtFirst ? "out" : "fielderChoice";
}

function getCaughtOutBatterResultType(runs = 0) {
  const isSacrificeFly = runs > 0
    && defenseState.outcome?.caught
    && !defenseState.battedBall?.isBunt
    && !defenseState.battedBall?.isGrounder
    && outfielderRoles.includes(defenseState.chosenFielder?.role);
  return isSacrificeFly ? "sacrificeFly" : "out";
}

function hasDefenseOutAdvancements() {
  return Boolean(defenseState.baseRunners?.some((runner) => runner.tagUp || runner.groundOutAdvance));
}

// 捕球アウト後の進塁 (タッチアップとゴロアウト時の進塁)。
// ゴロアウトで全走者が無条件に1つ進むのと、タッチアップが三塁からのみなのは
// 意図した簡略化なので、進塁するかどうかの判定はここでは足さない。
// ただし進塁先が与えられるのは実際に到達できた走者だけで、
// プレー終了時に走り切れていない走者は踏み終えた塁で止める。
function applyDefenseOutAdvancements() {
  if (count.outs >= 3) return 0;
  const advancingRunners = defenseState.baseRunners?.filter((runner) => runner.tagUp || runner.groundOutAdvance) || [];
  if (!advancingRunners.length) return 0;
  const advancingByStartBase = new Map(
    advancingRunners.filter((runner) => runner.startBase).map((runner) => [runner.startBase, runner])
  );
  const resolutionTime = getDefensePlayElapsedSeconds();
  const results = [];
  let tagUpOuts = 0;
  for (let baseIndex = 3; baseIndex >= 1; baseIndex -= 1) {
    const baseName = baseNameByIndex[baseIndex];
    const runnerInfo = bases[baseName];
    if (!runnerInfo) continue;
    const runner = advancingByStartBase.get(baseName);
    if (!runner) {
      results.push(createRunnerResult(runnerInfo, baseName, baseName));
      continue;
    }
    const tagUpOut = Boolean(runner.tagUp) && !isTagUpRunnerSafe(runner);
    if (tagUpOut) {
      tagUpOuts += 1;
      recordLastOutBatter(battingTeam, runner);
    }
    const targetBase = getSettledRunnerBase(runner, resolutionTime) || baseName;
    results.push(createRunnerResult(runner, baseName, targetBase, { out: tagUpOut }));
  }

  if (tagUpOuts > 0) {
    const outsToAdd = clamp(tagUpOuts, 0, Math.max(0, 3 - count.outs));
    count.outs += outsToAdd;
    recordPitcherOuts(fieldingTeam(), getTeamActivePitcher(fieldingTeam()), outsToAdd);
    if (outsToAdd > 0) adjustPitcherStamina(getTeamActivePitcher(fieldingTeam()), staminaTuning.outRecovery);
    defenseState.tagUpOutsAdded = (defenseState.tagUpOutsAdded || 0) + outsToAdd;
  }
  return applyRunnerResults(results, { allowRuns: count.outs < 3 }).runs;
}

function isTagUpRunnerSafe(runner) {
  const throwState = defenseState.throw;
  if (!runner?.tagUp || !throwState || throwState.targetBase !== runner.targetBase) return true;
  if (throwState.visualOnly) return true;
  if (!Number.isFinite(runner.arrivalTime) || !Number.isFinite(throwState.endTime)) return true;
  return !judgeOutPlay(runner, runner.targetBase, throwState).out;
}

function checkCountEnd() {
  if (count.strikes >= 3) {
    count.outs += 1;
    recordBatterPlateAppearance("strikeout");
    recordLastOutBatter(battingTeam, activeBatter);
    recordCurrentPitcherOuts(1);
    recordCurrentPitcherStat("strikeouts", 1);
    adjustPitcherStamina(activePitcher, staminaTuning.strikeoutRecovery);
    resetCountOnly();
    message = "三振";
    showEffect("三振", "#f9f871");
    if (!resetPracticePlateAppearance()) {
      if (count.outs >= 3 && maybeDelayGameEndAfterFinalOut()) return;
      advanceBattingOrder();
      setMatchup();
    }
  }
  if (count.balls >= 4) {
    const runs = advanceRunners("walk", activeBatter);
    recordBatterPlateAppearance("walk", { runs });
    recordCurrentPitcherWalkAllowed(1);
    resetCountOnly();
    message = runs > 0 ? `四球: ${runs}点` : "四球";
    showEffect(runs > 0 ? `四球 +${runs}` : "四球", "#aee7ff");
    if (pendingGameEnd) return;
    if (!resetPracticePlateAppearance()) {
      advanceBattingOrder();
      setMatchup();
    }
  }
  if (!isAnyPracticeMode() && count.outs >= 3) changeSide();
}

function changeSide() {
  clearReliefBoostForTeam(fieldingTeam());
  adjustPitcherStamina(activePitcher, staminaTuning.sideChangeRecovery);
  inputLockedUntil = performance.now() + sideChangeInputDelay;
  autoPitchTimer = Number.POSITIVE_INFINITY;
  count.outs = 0;
  bases = createEmptyBases();
  resetCountOnly();
  resetBall();
  resetSwing();
  const firstHalfTeam = firstBatTeam;
  const secondHalfTeam = firstBatTeam === "away" ? "home" : "away";
  if (shouldEndByMercyRuleAfterCompletedHalf()) {
    endGame("コールドゲーム");
    return;
  }
  if (battingTeam === firstHalfTeam) {
    battingTeam = secondHalfTeam;
    half = "bottom";
    setMatchup();
    applyExtraInningTiebreakRunner();
    if (endGameIfFinalBottomSecondBatTeamLeads()) return;
    message = `${inning}回ウラ、${teamLabel(battingTeam)}攻撃`;
  } else {
    if (inning >= maxInnings) {
      if (scores.away !== scores.home) {
        endGame();
        return;
      }
      inning += 1;
      half = "top";
      battingTeam = firstHalfTeam;
      setMatchup();
      applyExtraInningTiebreakRunner();
      message = `${inning}回表、延長戦 ${teamLabel(battingTeam)}攻撃`;
      scheduleNextPitch(0);
      return;
    }
    inning += 1;
    half = "top";
    battingTeam = firstHalfTeam;
    setMatchup();
    applyExtraInningTiebreakRunner();
    message = `${inning}回表、${teamLabel(battingTeam)}攻撃`;
  }
  scheduleNextPitch(0);
}

function clearPendingGameEnd() {
  pendingGameEnd = null;
}

function lockGameEndDelay(readyAt) {
  inputLockedUntil = Math.max(inputLockedUntil || 0, readyAt);
  autoPitchTimer = Number.POSITIVE_INFINITY;
  computerPitchPlan = null;
  pendingPitch = null;
}

function updatePendingGameEnd(now = performance.now()) {
  if (!pendingGameEnd) return false;
  if (now >= pendingGameEnd.readyAt) {
    finishGameEnd(pendingGameEnd.reasonLabel);
  }
  return true;
}

function finishGameEnd(reasonLabel = "") {
  clearPendingGameEnd();
  ensurePitcherGameRecord("away", getTeamActivePitcher("away"));
  ensurePitcherGameRecord("home", getTeamActivePitcher("home"));
  markPitcherSaveIfEligible();
  markPitcherWinLossAndHolds();
  gamePhase = "gameover";
  const result = scores.away === scores.home ? "引き分け" : scores.away > scores.home ? "チームA勝利" : "チームB勝利";
  message = `${reasonLabel ? `${reasonLabel} ` : ""}試合終了 ${scores.away}-${scores.home} ${result}`;
  showEffect(result, "#ff6f61");
}

function endGame(reasonLabel = "", options = {}) {
  if (options.delay === false || gamePhase === "gameover") {
    finishGameEnd(reasonLabel);
    return;
  }
  const delayMs = Number.isFinite(options.delayMs) ? options.delayMs : gameEndResultDelayMs;
  if (delayMs <= 0) {
    finishGameEnd(reasonLabel);
    return;
  }
  const readyAt = performance.now() + delayMs;
  pendingGameEnd = { reasonLabel, readyAt };
  lockGameEndDelay(readyAt);
}


function getHitDirection(timeDiff, isFoul) {
  if (isFoul) {
    const side = getTimingSideFromTimeDiff(timeDiff, 0) || (Math.random() < 0.5 ? -1 : 1);
    return normalize({ x: side * randomBetween(0.95, 1.32), y: randomBetween(-0.82, -0.34) });
  }
  const timingSide = getTimingSideFromTimeDiff(timeDiff, 95);
  if (timingSide) {
    return normalize({ x: timingSide * randomBetween(0.48, 1.08), y: randomBetween(-1.02, -0.66) });
  }
  if (Math.random() < 0.72) {
    const side = Math.random() < 0.5 ? -1 : 1;
    return normalize({ x: side * randomBetween(0.34, 0.76), y: randomBetween(-1.02, -0.68) });
  }
  return normalize({ x: randomBetween(-0.24, 0.24), y: randomBetween(-1.05, -0.74) });
}

function getPreferredGrounderSideFromTiming(profile = null) {
  const timingPull = profile?.timingPull ?? (Number.isFinite(profile?.timeDiff) ? clamp(profile.timeDiff / 260, -1, 1) : 0);
  if (Math.abs(timingPull) < 0.08) return 0;
  const early = timingPull < 0;
  if (activeBatterSide === "L") return early ? 1 : -1;
  return early ? -1 : 1;
}

function getRandomGrounderDirection64(profile = null, roll = Math.random(), biasRoll = Math.random()) {
  const laneCount = 64;
  const preferredSide = getPreferredGrounderSideFromTiming(profile);
  const timingStrength = clamp(Math.abs(profile?.timingPull ?? (Number.isFinite(profile?.timeDiff) ? profile.timeDiff / 260 : 0)), 0, 1);
  const biasChance = preferredSide === 0 ? 0 : 0.12 + timingStrength * 0.18;
  let lane = clamp(Math.floor(roll * laneCount), 0, laneCount - 1);
  if (preferredSide !== 0 && biasRoll < biasChance) {
    lane = preferredSide > 0
      ? 32 + clamp(Math.floor(roll * 32), 0, 31)
      : clamp(Math.floor(roll * 32), 0, 31);
  }
  const minDegrees = -55;
  const maxDegrees = 55;
  const angle = degreesToRadians(minDegrees + ((lane + 0.5) / laneCount) * (maxDegrees - minDegrees));
  return normalize({
    x: Math.sin(angle),
    y: -Math.cos(angle)
  });
}

function getInfieldGapGrounderDirection(timeDiff) {
  return getRandomGrounderDirection64();
}

function getFrontDropDirection(timeDiff) {
  const side = getTimingSideFromTimeDiff(timeDiff, 80) || (Math.random() < 0.5 ? -1 : 1);
  return normalize({
    x: side * randomBetween(0.2, 0.4),
    y: randomBetween(-1.08, -0.92)
  });
}

function getPopupFlyDirection(timeDiff) {
  const timingSide = getTimingSideFromTimeDiff(timeDiff, 70);
  const drift = timingSide * clamp(Math.abs(timeDiff) / 280, 0, 1) * 0.24 + randomBetween(-0.12, 0.12);
  return normalize({
    x: drift,
    y: randomBetween(-1.08, -0.92)
  });
}

function getRoutineFlyDirection(timeDiff) {
  const side = getTimingSideFromTimeDiff(timeDiff, 80) || (Math.random() < 0.5 ? -1 : 1);
  return normalize({
    x: side * randomBetween(0.18, 0.48),
    y: randomBetween(-1.08, -0.86)
  });
}

function isFairDirection(direction) {
  if (direction.y >= -0.05) return false;
  return Math.abs(direction.x / direction.y) <= Math.tan(55 * Math.PI / 180);
}

function isPointInFairTerritory(point, tolerance = 0) {
  if (!point) return false;
  const home = defenseField.bases.home || { x: field.plateX, y: field.plateY + 42 };
  const depth = home.y - point.y;
  if (depth < -tolerance) return false;
  const fairLimit = Math.tan(degreesToRadians(realFieldMetrics.fairLineAngleDegrees)) * Math.max(0, depth);
  return Math.abs(point.x - home.x) <= fairLimit + tolerance;
}

function shouldTreatAirLandingAsFoul(battedBall) {
  if (!battedBall || battedBall.isFoulBall || battedBall.isGrounder) return false;
  if (battedBall.fenceOver || battedBall.wallHit || battedBall.groundRuleDouble) return false;
  if (!battedBall.target) return false;
  if (isFairDirection(battedBall.direction || {
    x: battedBall.target.x - (battedBall.origin?.x ?? field.plateX),
    y: battedBall.target.y - (battedBall.origin?.y ?? field.plateY)
  })) {
    return false;
  }
  return !isPointInFairTerritory(battedBall.target, 2);
}

function getFoulLineCrossingBeforeOutfield(start, end) {
  if (!start || !end || !isPointInFairTerritory(start, 2) || isPointInFairTerritory(end, 2)) return null;
  let low = 0;
  let high = 1;
  for (let i = 0; i < 18; i += 1) {
    const mid = (low + high) / 2;
    const point = {
      x: start.x + (end.x - start.x) * mid,
      y: start.y + (end.y - start.y) * mid
    };
    if (isPointInFairTerritory(point, 2)) low = mid;
    else high = mid;
  }
  const crossing = {
    x: start.x + (end.x - start.x) * high,
    y: start.y + (end.y - start.y) * high
  };
  return getFenceDistance(crossing) <= defenseField.fenceDistance * 0.42 ? crossing : null;
}

// バントの打球方向をフェアゾーンに収まる角度まで戻す。
// 横へ狙ったバントの方向がそのままだとファウルラインの外を向いてしまう。
function clampBuntDirectionInsideFairLines(direction) {
  if (!direction) return direction;
  const depth = Math.abs(direction.y);
  if (depth <= 0.0001) return direction;
  const limit = Math.tan(degreesToRadians(realFieldMetrics.fairLineAngleDegrees))
    * depth
    * buntTuning.fairAngleMargin;
  if (Math.abs(direction.x) <= limit) return direction;
  return normalize({ x: clamp(direction.x, -limit, limit), y: direction.y });
}

// 落下点がフェアゾーンに入っていたら、深さを保ったままファウル側へ押し出す。
function ensureFoulLandingPoint(origin, target, direction) {
  const from = origin || { x: field.plateX, y: field.plateY };
  if (!target || !isPointInFairTerritory(target, 0)) {
    return {
      target,
      direction,
      distance: target ? Math.hypot(target.x - from.x, target.y - from.y) : 0
    };
  }
  const adjustedTarget = getFoulVisualTarget(target, direction);
  return {
    target: adjustedTarget,
    direction: normalize({ x: adjustedTarget.x - from.x, y: adjustedTarget.y - from.y }),
    distance: Math.hypot(adjustedTarget.x - from.x, adjustedTarget.y - from.y)
  };
}

function getFoulVisualTarget(point, direction = null) {
  const home = defenseField.bases.home || { x: field.plateX, y: field.plateY + 42 };
  const depth = Math.max(70, home.y - (point?.y ?? home.y - 160));
  const side = Math.sign(direction?.x ?? 0) || Math.sign((point?.x ?? home.x) - home.x) || (Math.random() < 0.5 ? -1 : 1);
  const fairLimit = Math.tan(degreesToRadians(realFieldMetrics.fairLineAngleDegrees)) * depth;
  return {
    x: home.x + side * (fairLimit + 58),
    y: home.y - depth
  };
}

function isBallHittingBatter() {
  if (!ball.inPitch || ball.crossedPlate || ball.y < field.strikeZoneTop - 60) return false;
  const polygon = getHbpHitPolygon();
  if (isPointInPolygon(ball.x, ball.y, polygon)) return true;
  return polygon.some((point, index) => {
    const nextPoint = polygon[(index + 1) % polygon.length];
    return distancePointToSegment(ball.x, ball.y, point.x, point.y, nextPoint.x, nextPoint.y) <= ball.radius;
  });
}

// デッドボール判定の輪郭。ヘルメットのツバとバットは含まず、頭〜肩〜腰〜脚の概形だけをたどる。
// dy は batter.y からの縦オフセット、halfWidth は中心線 (batter.x) からの片側幅。
// region は実物とのズレを補正するための横方向シフト先 ("head" はホーム寄り、"body" は外側)。
const hbpBodySilhouetteProfile = [
  { dy: -140, halfWidth: 5, region: "head" },   // 頭頂
  { dy: -130, halfWidth: 17, region: "head" },
  { dy: -120, halfWidth: 22, region: "head" },  // ヘルメットの一番張り出した高さ (ツバは含めない)
  { dy: -108, halfWidth: 20, region: "head" },
  { dy: -96, halfWidth: 17, region: "head" },   // ヘルメット下端・首
  { dy: -82, halfWidth: 25, region: "body" },   // 肩
  { dy: -58, halfWidth: 22, region: "body" },
  { dy: -32, halfWidth: 18, region: "body" },   // ウエスト
  { dy: -12, halfWidth: 22, region: "body" },   // 腰
  { dy: 14, halfWidth: 26, region: "body" },    // 太もも・スタンスの開き
  { dy: 40, halfWidth: 31, region: "body" }     // 足首 (スタンスが一番広い高さ)
];
// シルエットに対してどれだけ内側に判定を絞るか (0.9 = 10%小さく)。
const hbpHitboxSilhouetteScale = 0.9;
// 頭部と胴体・脚部を実物のズレに合わせて横にずらす量 (ボール1個分 = 半径×2)。
// 頭部: ホーム方向に1個分 → 外側へ半個分戻して0.5個分に。
const hbpHeadRegionShiftBallWidths = 0.5;
const hbpBodyRegionShiftBallWidths = 1;

function getHbpHitPolygon() {
  const profile = hbpBodySilhouetteProfile;
  const minDy = profile[0].dy;
  const maxDy = profile[profile.length - 1].dy;
  const centerDy = (minDy + maxDy) / 2;
  const scale = hbpHitboxSilhouetteScale;
  const ballWidth = (ball?.radius ?? 9) * 2;
  // ホーム方向が画面のどちら向きかは、打者が左右どちらの打席に立っているかで変わるので、
  // プレート位置と打者位置の大小関係から都度求める。
  const towardHomeSign = Math.sign(field.plateX - batter.x) || 1;
  const regionShiftX = (region) => {
    if (region === "head") return towardHomeSign * hbpHeadRegionShiftBallWidths * ballWidth;
    return -towardHomeSign * hbpBodyRegionShiftBallWidths * ballWidth;
  };
  const scaledPoint = (point, sign) => ({
    x: batter.x + point.halfWidth * scale * sign + regionShiftX(point.region),
    y: batter.y + centerDy + (point.dy - centerDy) * scale
  });
  const rightSide = profile.map((point) => scaledPoint(point, 1));
  const leftSide = [...profile].reverse().map((point) => scaledPoint(point, -1));
  return [...rightSide, ...leftSide];
}

function isStrikePitchForHbp() {
  if (ball.touchedPlate || isBallTouchingHomePlate()) return true;
  if (!ball.inPitch || ball.vy <= 0) return false;

  const plateBottom = field.plateY + 42 * field.plateScale;
  const framesToPlateBottom = (plateBottom - ball.y) / ball.vy;
  if (framesToPlateBottom < 0) return false;

  const currentProgress = getPitchProgress();
  const samples = Math.max(6, Math.ceil(framesToPlateBottom / 3));
  for (let i = 1; i <= samples; i += 1) {
    const framesAhead = framesToPlateBottom * (i / samples);
    const progress = clamp(currentProgress + (i / samples) * (1.25 - currentProgress), 0, 1.25);
    const curveDrift = ball.curvePower * Math.max(0, progress - 0.28) * 0.31 * framesAhead;
    const projectedX = ball.x + ball.vx * framesAhead + curveDrift;
    const projectedY = ball.y + ball.vy * framesAhead;
    if (isBallTouchingHomePlate(projectedX, projectedY, ball.radius)) return true;
  }
  return false;
}

function nextPitch() {
  if (gamePhase === "defense") return;
  if (isInputLocked()) return;
  if (gamePhase === "gameover") {
    showMenu();
    return;
  }
  if (gamePhase === "playing" && (isPitching || pendingPitch || ball.inPitch)) return;
  resetBall();
  resetSwing();
  message = isHomeRunDerbyMode()
    ? getHomeRunDerbyStatusMessage()
    : isBattingPracticeMode()
    ? practicePitcherControl === "manual" ? "打撃練習: 5/8/2で投球してください" : "打撃練習: 次の投球を待っています"
    : isPitchingPracticeMode() ? "投球練習: 5/8/2で投球してください"
    : gameMode === "single" ? "次の投球を待っています" : "5/8/2で投球してください";
  scheduleNextPitch(700);
}

function isBallInStrikeZone() {
  return isBallTouchingHomePlate();
}

function getHomePlatePoints() {
  const scale = field.plateScale;
  return [
    { x: field.plateX - 36 * scale, y: field.plateY - 12 * scale },
    { x: field.plateX + 36 * scale, y: field.plateY - 12 * scale },
    { x: field.plateX + 26 * scale, y: field.plateY + 22 * scale },
    { x: field.plateX, y: field.plateY + 42 * scale },
    { x: field.plateX - 26 * scale, y: field.plateY + 22 * scale }
  ];
}

function getGoodContactZonePoints() {
  const scale = field.plateScale;
  const meet = activeBatter?.meet ?? 5;
  const meetDelta = meet - 5;
  const plateTop = field.plateY - 12 * scale;
  const zoneScale = (2 / 3) * battingGoodContactZoneScale;
  const pitcherDirectionShrink = 18 * scale;
  const baseExtension = Math.max(0, (42 + meetDelta * 3.5) * scale * zoneScale - pitcherDirectionShrink);
  const extension = baseExtension * 1.44;
  const sidePad = meetDelta * 1.7 * scale;
  const halfTop = clamp(((36 * scale) + sidePad) * zoneScale, 14 * scale, 50 * scale);
  const halfShoulder = clamp(((26 * scale) + sidePad * 0.85) * zoneScale, 10 * scale, 40 * scale);
  const catcherSideY = field.plateY + 22 * scale + extension;
  return [
    { x: field.plateX - halfTop, y: plateTop - extension },
    { x: field.plateX + halfTop, y: plateTop - extension },
    { x: field.plateX + halfTop, y: plateTop },
    { x: field.plateX + halfShoulder, y: catcherSideY },
    { x: field.plateX - halfShoulder, y: catcherSideY },
    { x: field.plateX - halfTop, y: plateTop }
  ];
}

function hasBallPassedHomePlate() {
  const plateBottom = field.plateY + 42 * field.plateScale;
  return ball.y - ball.radius > plateBottom;
}

function markPlateTouch(prevX, prevY, nextX, nextY) {
  if (ball.touchedPlate) return;
  const samples = Math.max(2, Math.ceil(Math.hypot(nextX - prevX, nextY - prevY) / Math.max(1, ball.radius * 0.75)));
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const x = prevX + (nextX - prevX) * t;
    const y = prevY + (nextY - prevY) * t;
    if (isBallTouchingHomePlate(x, y, ball.radius)) {
      ball.touchedPlate = true;
      return;
    }
  }
}

function isBallTouchingHomePlate(x = ball.x, y = ball.y, radius = ball.radius) {
  const points = getHomePlatePoints();
  if (isPointInPolygon(x, y, points)) return true;
  return points.some((point, index) => {
    const nextPoint = points[(index + 1) % points.length];
    return distancePointToSegment(x, y, point.x, point.y, nextPoint.x, nextPoint.y) <= radius;
  });
}

function distanceToHomePlate(x = ball.x, y = ball.y, radius = ball.radius) {
  const points = getHomePlatePoints();
  if (isPointInPolygon(x, y, points)) return 0;
  const edgeDistance = points.reduce((minDistance, point, index) => {
    const nextPoint = points[(index + 1) % points.length];
    return Math.min(minDistance, distancePointToSegment(x, y, point.x, point.y, nextPoint.x, nextPoint.y));
  }, Number.POSITIVE_INFINITY);
  return Math.max(0, edgeDistance - radius);
}

function isBallInGoodContactZone(x = ball.x, y = ball.y, radius = ball.radius) {
  return distanceToGoodContactZone(x, y, radius) <= 0;
}


function getZoneScoreFromDistanceRate(rate = 100) {
  const zoneDistanceRate = Math.max(0, rate);
  const scoreCurve = [
    { rate: 0, score: 1 },
    { rate: 20, score: 0.98 },
    { rate: 50, score: 0.85 },
    { rate: 80, score: 0.65 },
    { rate: 100, score: 0.5 },
    { rate: 130, score: 0.3 },
    { rate: 170, score: 0.1 },
    { rate: 190, score: 0 }
  ];
  if (zoneDistanceRate >= scoreCurve[scoreCurve.length - 1].rate) return 0;
  for (let index = 1; index < scoreCurve.length; index += 1) {
    const next = scoreCurve[index];
    if (zoneDistanceRate > next.rate) continue;
    const previous = scoreCurve[index - 1];
    const progress = (zoneDistanceRate - previous.rate) / (next.rate - previous.rate);
    return previous.score + (next.score - previous.score) * progress;
  }
  return 0;
}

function getGoodContactZoneCenterMarkerRadius() {
  return 8 * field.plateScale;
}

function getGoodContactZoneDistanceRate(x = ball.x, y = ball.y, radius = ball.radius) {
  const points = getGoodContactZonePoints();
  const center = getPolygonCenter(points);
  const dx = x - center.x;
  const dy = y - center.y;
  const distance = Math.hypot(dx, dy);
  if (distance <= 0.0001) return 0;
  const boundaryDistance = getPolygonBoundaryDistanceFromCenter(points, center, dx / distance, dy / distance);
  const adjustedDistance = Math.max(0, distance - (isPointInPolygon(x, y, points) ? 0 : radius));
  const markerRadius = getGoodContactZoneCenterMarkerRadius();
  const scoredDistance = Math.max(0, adjustedDistance - markerRadius);
  return Math.max(0, scoredDistance / Math.max(1, boundaryDistance - markerRadius) * 100);
}

function getPolygonCenter(points = []) {
  return points.reduce((sum, point) => ({
    x: sum.x + point.x / Math.max(1, points.length),
    y: sum.y + point.y / Math.max(1, points.length)
  }), { x: 0, y: 0 });
}

function getPolygonBoundaryDistanceFromCenter(points, center, dirX, dirY) {
  let best = Number.POSITIVE_INFINITY;
  for (let i = 0; i < points.length; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const hit = getRaySegmentIntersectionDistance(center.x, center.y, dirX, dirY, a.x, a.y, b.x, b.y);
    if (Number.isFinite(hit) && hit > 0) best = Math.min(best, hit);
  }
  if (Number.isFinite(best)) return best;
  return points.reduce((max, point) => Math.max(max, Math.hypot(point.x - center.x, point.y - center.y)), 1);
}

function getRaySegmentIntersectionDistance(originX, originY, dirX, dirY, ax, ay, bx, by) {
  const segX = bx - ax;
  const segY = by - ay;
  const denom = cross2d(dirX, dirY, segX, segY);
  if (Math.abs(denom) < 0.000001) return null;
  const relX = ax - originX;
  const relY = ay - originY;
  const t = cross2d(relX, relY, segX, segY) / denom;
  const u = cross2d(relX, relY, dirX, dirY) / denom;
  if (t < 0 || u < -0.000001 || u > 1.000001) return null;
  return t;
}

function cross2d(ax, ay, bx, by) {
  return ax * by - ay * bx;
}

function distanceToGoodContactZone(x = ball.x, y = ball.y, radius = ball.radius) {
  const points = getGoodContactZonePoints();
  if (isPointInPolygon(x, y, points)) return 0;
  const edgeDistance = points.reduce((minDistance, point, index) => {
    const nextPoint = points[(index + 1) % points.length];
    return Math.min(minDistance, distancePointToSegment(x, y, point.x, point.y, nextPoint.x, nextPoint.y));
  }, Number.POSITIVE_INFINITY);
  return Math.max(0, edgeDistance - radius);
}

function isPointInPolygon(x, y, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const pi = points[i];
    const pj = points[j];
    const intersects = (pi.y > y) !== (pj.y > y) && x < ((pj.x - pi.x) * (y - pi.y)) / (pj.y - pi.y) + pi.x;
    if (intersects) inside = !inside;
  }
  return inside;
}

function getPitchProgress() {
  const total = ball.plateTime - ball.pitchStartTime;
  if (total <= 0) return 0;
  return clamp((performance.now() - ball.pitchStartTime) / total, 0, 1.25);
}

function getBatSegment(progress = getBatSwingProgress()) {
  if (isBuntStanceActive()) return getBuntBatSegment();
  const side = activeBatterSide === "R" ? 1 : -1;
  const handleX = batter.x + side * 46;
  const handleY = batter.y - 2 - (36 * field.plateScale);
  const swingArc = getBatSwingArc(progress);
  const angle = activeBatterSide === "R" ? swingArc.angle : Math.PI - swingArc.angle;
  const length = 172 * batLengthMultiplier * getMeetBatLengthScale();
  return trimBatJudgmentSegment({
    x1: handleX,
    y1: handleY,
    x2: handleX + Math.cos(angle) * length,
    y2: handleY + Math.sin(angle) * length
  });
}

function getBuntBatSegment() {
  return getRawBuntBatSegment();
}

function getRawBuntBatSegment() {
  const side = activeBatterSide === "R" ? 1 : -1;
  // Bunt uses the visible black bat in the swing sprite as the contact guide.
  const handleX = batter.x + side * 48;
  const handleY = batter.y - 68;
  const length = 108;
  return {
    x1: handleX,
    y1: handleY,
    x2: handleX + side * length,
    y2: handleY - 8
  };
}

function getMeetBatLengthScale(meet = activeBatter?.meet ?? 5) {
  return clamp(1 + (meet - 5) * 0.032, 0.86, 1.16);
}

function getMeetBatContactScale(meet = getEffectiveBatterMeet(activeBatter)) {
  return clamp(1 + (meet - 5) * 0.055, 0.78, 1.28);
}

function trimBatJudgmentSegment(segment) {
  const dx = segment.x2 - segment.x1;
  const dy = segment.y2 - segment.y1;
  const insideSign = activeBatterSide === "R" ? -1 : 1;
  const endpoint1IsInside = segment.x1 * insideSign >= segment.x2 * insideSign;
  const trim1 = endpoint1IsInside ? batInnerTrimRatio : batOuterTrimRatio;
  const trim2 = endpoint1IsInside ? batOuterTrimRatio : batInnerTrimRatio;
  return {
    x1: segment.x1 + dx * trim1,
    y1: segment.y1 + dy * trim1,
    x2: segment.x2 - dx * trim2,
    y2: segment.y2 - dy * trim2
  };
}

function getSwingProgress() {
  if (!swingState.isSwinging) return 0;
  if (isBuntStanceActive()) return 0;
  return clamp((performance.now() - swingState.startTime) / swingState.duration, 0, 1);
}

function getBatSwingProgress() {
  if (!swingState.isSwinging) return 0;
  if (isBuntStanceActive()) return 1;
  return clamp((performance.now() - swingState.startTime) / (swingState.duration / batJudgmentSpeedMultiplier), 0, 1);
}

function getBatSwingArc(progress) {
  const startAngle = batterAngleToCanvasRadians(200);
  const impactAngle = batterAngleToCanvasRadians(125);
  const finishAngle = batterAngleToCanvasRadians(45);
  const windupHold = 0.1;
  const impactAt = 0.62;
  if (progress <= windupHold) return { angle: startAngle, phase: "ready" };
  if (progress <= impactAt) {
    const t = (progress - windupHold) / (impactAt - windupHold);
    // 以前は smoothstep (t*t*(3-2t)) で impactAt 直前に角速度がほぼ0まで落ちていた。
    // 直後の follow フェーズは 1-(1-t)^2 で開始直後が最速のため、impactAt の瞬間に
    // 角速度が0→最大へ不連続に跳ね上がり、ちょうどストライクゾーンを通過する
    // 区間 (実測で progress 0.64〜0.67 相当) の実時間当たり判定窓が極端に狭くなっていた。
    // ease-in (t*t) にして impactAt 到達時点である程度の角速度を残し、follow の
    // 立ち上がりとの速度差を縮めることで、ゾーン通過区間の実時間を広げる。
    const eased = t * t;
    return { angle: startAngle + (impactAngle - startAngle) * eased, phase: "swing" };
  }
  const t = (progress - impactAt) / (1 - impactAt);
  const eased = 1 - Math.pow(1 - t, 2);
  return { angle: impactAngle + (finishAngle - impactAngle) * eased, phase: "follow" };
}

function describeTiming(timeDiff) {
  if (timeDiff < -230) return "かなり早い";
  if (timeDiff < -85) return "少し早い";
  if (timeDiff <= 85) return "ジャスト";
  if (timeDiff <= 230) return "少し遅い";
  return "かなり遅い";
}

function timingSuffix(timeDiff) {
  return Number.isFinite(timeDiff) ? `${describeTiming(timeDiff)} (${Math.round(timeDiff)}ms)` : "";
}

function shouldShowTimingSuffix(label) {
  return label === "空振り" || label === "ストライク";
}

function showEffect(text, color) {
  hitEffect.active = true;
  hitEffect.startTime = performance.now();
  hitEffect.text = text;
  hitEffect.color = color;
}

function draw() {
  if (gamePhase === "xStadiumPrompt") {
    drawDefenseView();
    drawHud();
    drawXStadiumPrompt();
    if (pauseMenuState.active) drawPauseMenu();
    if (isSwitchBatterChoicePending()) drawSwitchBatterChoice();
    return;
  }
  if (gamePhase === "defense") {
    drawDefenseView();
    drawHud();
    drawBattingFeedback();
    drawHitEffect();
    if (pauseMenuState.active) drawPauseMenu();
    if (isSwitchBatterChoicePending()) drawSwitchBatterChoice();
    return;
  }
  drawField();
  drawPlateAndZone();
  drawGoodContactZone();
  drawPitcher();
  drawReliefCarEntrance();
  drawBatter();
  drawStealPlay();
  drawHbpHitBox();
  drawBallTrail();
  drawBall();
  drawSwingEffect();
  drawPitchSpeedDisplay();
  drawHud();
  drawPitcherGameRecordsBoard();
  drawBattingFeedback();
  drawHitEffect();
  if (pauseMenuState.active) drawPauseMenu();
  if (isSwitchBatterChoicePending()) drawSwitchBatterChoice();
}

function drawSwitchBatterChoice() {
  const width = 500;
  const height = 190;
  const x = (canvas.width - width) / 2;
  const y = 132;
  ctx.save();
  ctx.fillStyle = "rgba(9, 18, 30, 0.64)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(248, 250, 252, 0.97)";
  ctx.strokeStyle = "#1f2937";
  ctx.lineWidth = 3;
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#111827";
  ctx.font = "700 25px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${activeBatter?.name || ""} 打席選択`, x + width / 2, y + 44);
  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#4b5563";
  ctx.fillText("左スティック左右で選択  /  ボタン1で決定", x + width / 2, y + 70);
  drawSwitchChoiceButton(x + 58, y + 100, 170, 54, "左打席", switchBatterChoice.selectedSide === "L");
  drawSwitchChoiceButton(x + width - 228, y + 100, 170, 54, "右打席", switchBatterChoice.selectedSide === "R");
  ctx.restore();
}

function drawSwitchChoiceButton(x, y, width, height, label, selected) {
  ctx.fillStyle = selected ? "#2563eb" : "#e5e7eb";
  ctx.strokeStyle = selected ? "#1d4ed8" : "#9ca3af";
  ctx.lineWidth = 2;
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = selected ? "#ffffff" : "#111827";
  ctx.font = selected ? "700 22px sans-serif" : "20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, x + width / 2, y + 35);
}

function drawPauseMenu() {
  const options = getPauseOptions();
  const replacementContext = getPauseReplacementContext();
  const width = 680;
  const rowHeight = 58;
  const contextHeight = replacementContext ? 50 : 0;
  const height = 124 + contextHeight + Math.max(1, options.length) * rowHeight;
  const x = (canvas.width - width) / 2;
  const y = (canvas.height - height) / 2;
  ctx.save();
  ctx.fillStyle = "rgba(9, 18, 30, 0.78)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(248, 250, 252, 0.96)";
  ctx.strokeStyle = "#1f2937";
  ctx.lineWidth = 3;
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#111827";
  ctx.font = "700 26px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(`${teamLabel(pauseMenuState.team)} Pause`, x + 28, y + 42);
  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#4b5563";
  ctx.fillText("Left stick: select   Button1: OK   Button2/12: back", x + 28, y + 66);
  let listTop = y + 92;
  if (replacementContext) {
    ctx.fillStyle = "#dbeafe";
    ctx.fillRect(x + 24, y + 82, width - 48, 42);
    ctx.fillStyle = "#1e3a8a";
    ctx.font = "700 15px sans-serif";
    drawPauseFittedText(`${replacementContext.label}: ${replacementContext.roleLabel} ${replacementContext.player.name}`, x + 42, y + 101, width - 84, 15, "700");
    ctx.fillStyle = "#1f2937";
    drawPauseFittedText(replacementContext.ability, x + 42, y + 119, width - 84, 13, "normal");
    listTop = y + 138;
  }
  if (!options.length) {
    ctx.fillStyle = "#991b1b";
    ctx.font = "18px sans-serif";
    ctx.fillText("No available players", x + 28, listTop + 16);
    ctx.restore();
    return;
  }
  options.forEach((option, index) => {
    const rowY = listTop + index * rowHeight;
    const selectedRow = index === pauseMenuState.selectedIndex;
    ctx.fillStyle = selectedRow ? "#2563eb" : "#e5e7eb";
    ctx.fillRect(x + 24, rowY, width - 48, rowHeight - 8);
    ctx.fillStyle = selectedRow ? "#ffffff" : "#111827";
    ctx.font = selectedRow ? "700 18px sans-serif" : "17px sans-serif";
    drawPauseFittedText(option.label, x + 42, rowY + 22, width - 84, selectedRow ? 18 : 17, selectedRow ? "700" : "normal");
    const detail = getPauseOptionDetail(option);
    if (detail) {
      ctx.fillStyle = selectedRow ? "#e0ecff" : "#374151";
      drawPauseFittedText(detail, x + 42, rowY + 43, width - 84, 13, "normal");
    }
  });
  ctx.restore();
}

function drawXStadiumPrompt() {
  const width = 640;
  const height = 236;
  const x = (canvas.width - width) / 2;
  const y = canvas.height * 0.5 - height / 2;
  const goRect = { x: x + 92, y: y + 156, width: 190, height: 54 };
  const dontRect = { x: x + width - 282, y: y + 156, width: 190, height: 54 };
  xStadiumPrompt.goRect = goRect;
  xStadiumPrompt.dontRect = dontRect;

  ctx.save();
  ctx.fillStyle = "rgba(5, 5, 12, 0.72)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const panel = ctx.createLinearGradient(x, y, x, y + height);
  if (panel?.addColorStop) {
    panel.addColorStop(0, "rgba(29, 25, 44, 0.96)");
    panel.addColorStop(0.55, "rgba(11, 10, 18, 0.96)");
    panel.addColorStop(1, "rgba(35, 30, 54, 0.96)");
    ctx.fillStyle = panel;
  } else {
    ctx.fillStyle = "rgba(20, 18, 32, 0.96)";
  }
  roundRect(x, y, width, height, 14);
  ctx.fill();
  ctx.strokeStyle = "rgba(232, 226, 255, 0.62)";
  ctx.lineWidth = 3;
  roundRect(x + 2, y + 2, width - 4, height - 4, 12);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#f4f0ff";
  ctx.font = "bold 32px sans-serif";
  ctx.fillText("XスタジアムにGOしますか？", x + width / 2, y + 54);
  ctx.font = "18px sans-serif";
  ctx.fillStyle = "#d9d4f4";
  ctx.fillText("試合状況はそのまま、球場だけが切り替わります。", x + width / 2, y + 96);
  ctx.fillText("Xスタではホームラン後に64秒間の宇宙への旅が始まります。", x + width / 2, y + 124);

  drawXStadiumPromptButton(goRect, "GO", "#72f2a4", "#102418");
  drawXStadiumPromptButton(dontRect, "Don’t", "#f4c0c0", "#281616");
  ctx.restore();
}

function drawXStadiumPromptButton(rect, label, fill, textColor) {
  ctx.save();
  ctx.fillStyle = fill;
  roundRect(rect.x, rect.y, rect.width, rect.height, 9);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.68)";
  ctx.lineWidth = 2;
  roundRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, 8);
  ctx.stroke();
  ctx.fillStyle = textColor;
  ctx.font = "bold 25px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, rect.x + rect.width / 2, rect.y + rect.height / 2);
  ctx.restore();
}

// 大花火スタジアムのグラウンド表現。距離はすべてフィールド座標のユニット。
// 1メートル ≒ 17.8 ユニット、塁間 ≒ 869 ユニット。
const realisticFieldTuning = {
  mowCellSize: 186,            // 芝の刈り込み市松の1マス
  mowLightAlpha: 0.055,
  mowDarkAlpha: 0.05,
  warningTrackWidth: 132,      // フェンス手前の土の輪
  infieldArcRadius: 1180,      // 内野の土の扇形の半径
  basePathWidth: 104,          // ベースパスの幅
  moundRadius: 176,
  homeCircleRadius: 208,
  dirtColor: "#c58845",
  trackColor: "#b0763c",
  infieldGrassColor: "#5aa356"
};

// 芝の上に市松の刈り込みを敷き、内野の土・ベースパス・マウンド・
// ウォーニングトラックを重ねてMLB風のグラウンドにする。
function drawRealisticFieldDetails(stadium, centerX, centerY) {
  if (!stadium?.realisticField) return;
  const tuning = realisticFieldTuning;
  const grassRadius = defenseField.grassRadius;

  // 芝の刈り込み (市松)。芝の内側だけに乗せる。
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, grassRadius, Math.PI, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  const cell = tuning.mowCellSize;
  const startX = centerX - grassRadius;
  const startY = centerY - grassRadius;
  for (let row = 0; row * cell < grassRadius; row += 1) {
    for (let column = 0; column * cell < grassRadius * 2; column += 1) {
      if ((row + column) % 2 !== 0) continue;
      ctx.fillStyle = row % 2 === 0
        ? `rgba(255, 255, 255, ${tuning.mowLightAlpha})`
        : `rgba(0, 0, 0, ${tuning.mowDarkAlpha})`;
      ctx.fillRect(startX + column * cell, startY + row * cell, cell, cell);
    }
  }
  ctx.restore();

  // ウォーニングトラック (外側の縁をフェンスに合わせる)
  ctx.save();
  ctx.strokeStyle = tuning.trackColor;
  ctx.lineWidth = tuning.warningTrackWidth;
  ctx.beginPath();
  ctx.arc(centerX, centerY, defenseField.fenceDistance - tuning.warningTrackWidth / 2, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 内野の土 (扇形)
  ctx.fillStyle = tuning.dirtColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, tuning.infieldArcRadius, Math.PI, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  // 内野の芝ダイヤ。各塁をベースパス幅の半分だけ内側へ寄せた四角形。
  const diamondCenter = {
    x: (centerX + defenseField.bases.second.x) / 2,
    y: (centerY + defenseField.bases.second.y) / 2
  };
  const inset = tuning.basePathWidth / 2;
  const insetPoint = (point) => {
    const dx = diamondCenter.x - point.x;
    const dy = diamondCenter.y - point.y;
    const length = Math.hypot(dx, dy) || 1;
    return { x: point.x + (dx / length) * inset, y: point.y + (dy / length) * inset };
  };
  const corners = [
    { x: centerX, y: centerY },
    defenseField.bases.first,
    defenseField.bases.second,
    defenseField.bases.third
  ].map(insetPoint);
  ctx.fillStyle = tuning.infieldGrassColor;
  ctx.beginPath();
  corners.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  ctx.fill();

  // マウンドと本塁の土の円
  ctx.fillStyle = tuning.dirtColor;
  ctx.beginPath();
  ctx.arc(diamondCenter.x, diamondCenter.y, tuning.moundRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(centerX, centerY, tuning.homeCircleRadius, 0, Math.PI * 2);
  ctx.fill();
}

function drawStadiumTurfPattern(stadium = getCurrentStadium()) {
  if (stadium.surface === "obsidian") {
    const base = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (base?.addColorStop) {
      base.addColorStop(0, "#050509");
      base.addColorStop(0.42, "#14121e");
      base.addColorStop(0.72, "#08070d");
      base.addColorStop(1, "#1c1727");
      ctx.fillStyle = base;
    } else {
      ctx.fillStyle = "#0c0a12";
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    for (let y = -40; y < canvas.height + 80; y += 46) {
      for (let x = -40; x < canvas.width + 80; x += 46) {
        const shade = ((x / 46 + y / 46) % 3 + 3) % 3;
        ctx.fillStyle = shade === 0 ? "rgba(41, 36, 58, 0.22)" : shade === 1 ? "rgba(7, 7, 12, 0.28)" : "rgba(73, 52, 94, 0.12)";
        ctx.fillRect(x, y, 46, 46);
        ctx.strokeStyle = "rgba(132, 104, 170, 0.08)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, 45, 45);
      }
    }
    for (let i = 0; i < 260; i += 1) {
      const x = (i * 97 + (i % 11) * 17) % canvas.width;
      const y = (i * 53 + (i % 7) * 29) % canvas.height;
      ctx.strokeStyle = i % 4 === 0 ? "rgba(177, 130, 220, 0.18)" : "rgba(18, 16, 27, 0.32)";
      ctx.lineWidth = 1 + (i % 3) * 0.35;
      drawLine(x - 10, y + 4, x + 12, y - 5);
    }
    ctx.restore();
    return;
  }
  if (stadium.surface === "dirt") {
    const dirt = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (dirt?.addColorStop) {
      dirt.addColorStop(0, "#d8a161");
      dirt.addColorStop(0.5, "#bd7d42");
      dirt.addColorStop(1, "#9f6134");
      ctx.fillStyle = dirt;
    } else {
      ctx.fillStyle = "#bd7d42";
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = -canvas.height; i < canvas.width; i += 70) {
      ctx.fillStyle = "rgba(255, 232, 180, 0.055)";
      ctx.fillRect(i, 0, 32, canvas.height);
    }
    ctx.save();
    for (let i = 0; i < 520; i += 1) {
      const x = (i * 83 + (i % 11) * 19) % canvas.width;
      const y = (i * 47 + (i % 13) * 23) % canvas.height;
      const r = i % 17 === 0 ? 3.2 : i % 7 === 0 ? 2.1 : 1.1;
      ctx.fillStyle = i % 5 === 0 ? "rgba(92, 54, 32, 0.28)" : "rgba(255, 222, 170, 0.16)";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < 150; i += 1) {
      const x = (i * 127 + (i % 5) * 31) % canvas.width;
      const y = (i * 71 + (i % 9) * 17) % canvas.height;
      ctx.strokeStyle = i % 2 === 0 ? "rgba(112, 65, 38, 0.18)" : "rgba(243, 191, 126, 0.14)";
      ctx.lineWidth = 1.2 + (i % 3) * 0.4;
      drawLine(x - 8, y + 2, x + 8, y - 3);
    }
    ctx.restore();
    return;
  }
  if (stadium.surface === "spaceGlow") {
    const base = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (base?.addColorStop) {
      base.addColorStop(0, "#020309");
      base.addColorStop(0.42, "#090d14");
      base.addColorStop(0.72, "#111720");
      base.addColorStop(1, "#04060b");
      ctx.fillStyle = base;
    } else {
      ctx.fillStyle = "#090d14";
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    const gloss = ctx.createRadialGradient(field.plateX, field.plateY + 120, 40, field.plateX, field.plateY + 120, canvas.width * 0.72);
    if (gloss?.addColorStop) {
      gloss.addColorStop(0, "rgba(88, 122, 150, 0.16)");
      gloss.addColorStop(0.42, "rgba(42, 64, 82, 0.08)");
      gloss.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gloss;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.018)";
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.22);
    ctx.restore();
    return;
  }
  ctx.fillStyle = stadium.surface === "royalGrass"
    ? "#2f7148"
    : stadium.surface === "premiumGrass"
      ? "#64ad5f"
    : stadium.surface === "artificialTurf"
        ? "#3aa65f"
        : stadium.surface === "riverGrass"
          ? "#4f9b49"
      : "#5fa85b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < canvas.width; i += 56) {
    ctx.fillStyle = i % 112 === 0
      ? (stadium.surface === "royalGrass" ? "rgba(200,239,191,0.105)" : stadium.surface === "premiumGrass" ? "rgba(220,255,220,0.09)" : stadium.surface === "artificialTurf" ? "rgba(190,255,220,0.11)" : stadium.surface === "riverGrass" ? "rgba(220,255,205,0.075)" : "rgba(255,255,255,0.05)")
      : (stadium.surface === "royalGrass" ? "rgba(4,42,24,0.075)" : "rgba(0,0,0,0.045)");
    ctx.fillRect(i, 0, 56, canvas.height);
  }
  if (stadium.surface === "royalGrass") {
    ctx.save();
    ctx.lineWidth = 1;
    for (let i = 0; i < 420; i += 1) {
      const x = (i * 83 + (i % 7) * 19) % canvas.width;
      const y = (i * 47 + (i % 11) * 13) % canvas.height;
      ctx.strokeStyle = i % 4 === 0 ? "rgba(208,239,184,0.13)" : "rgba(8,66,35,0.16)";
      drawLine(x, y + 5, x + ((i % 3) - 1) * 2, y - 4 - (i % 4));
    }
    ctx.restore();
  }
  if (stadium.surface === "riverGrass") {
    for (let i = 0; i < 220; i += 1) {
      const x = (i * 73) % canvas.width;
      const y = (i * 41) % canvas.height;
      ctx.strokeStyle = i % 3 === 0 ? "rgba(232,255,218,0.08)" : "rgba(27,80,38,0.08)";
      ctx.lineWidth = 1;
      drawLine(x, y, x + 18, y - 4);
    }
  }
}

function drawAmericanRoyalGrassDetails(centerX, homeY, radius) {
  if (getCurrentStadium().surface !== "royalGrass") return;
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, homeY, radius, Math.PI, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  for (let x = centerX - radius; x <= centerX + radius; x += 74) {
    const stripeIndex = Math.floor((x - centerX + radius) / 74);
    ctx.fillStyle = stripeIndex % 2 === 0 ? "rgba(171,222,151,0.075)" : "rgba(5,56,29,0.065)";
    ctx.fillRect(x, homeY - radius, 38, radius);
  }

  const span = Math.max(1, Math.floor(radius * 2));
  const depth = Math.max(1, Math.floor(radius));
  for (let i = 0; i < 560; i += 1) {
    const x = centerX - radius + ((i * 149 + (i % 9) * 17) % span);
    const y = homeY - ((i * 101 + (i % 13) * 11) % depth);
    if (Math.hypot(x - centerX, y - homeY) > radius - 4) continue;
    ctx.strokeStyle = i % 5 === 0 ? "rgba(218,241,190,0.18)" : "rgba(7,70,34,0.2)";
    ctx.lineWidth = 1.2;
    drawLine(x, y + 6, x + ((i % 3) - 1) * 2, y - 5 - (i % 4));
  }
  ctx.restore();
}

function drawNextDomeRoofScreen() {
  if (!getCurrentStadium().hasDome) return;
  ctx.save();
  const fullRoof = ctx.createLinearGradient(0, 0, 0, canvas.height);
  if (fullRoof?.addColorStop) {
    fullRoof.addColorStop(0, "#f4f6fa");
    fullRoof.addColorStop(0.42, "#c8d0d8");
    fullRoof.addColorStop(1, "#87939e");
    ctx.fillStyle = fullRoof;
  } else {
    ctx.fillStyle = "#c8d0d8";
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const roof = ctx.createRadialGradient(field.plateX, 80, 120, field.plateX, 260, 820);
  if (roof?.addColorStop) {
    roof.addColorStop(0, "#f5f7fb");
    roof.addColorStop(0.48, "#cfd7df");
    roof.addColorStop(1, "#7e8b96");
    ctx.fillStyle = roof;
  } else {
    ctx.fillStyle = "#cfd7df";
  }
  ctx.beginPath();
  ctx.ellipse(field.plateX, 200, 760, 260, 0, Math.PI, Math.PI * 2);
  ctx.lineTo(canvas.width, 0);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  drawNextDomeRoofHighlights(field.plateX, 96, 1);
  ctx.restore();
}

function drawNextDomeRoofHighlights(cx, cy, scale = 1) {
  ctx.save();
  [
    { x1: -620, y1: 18, x2: 620, y2: 54, width: 7, color: "rgba(255,255,255,0.48)" },
    { x1: -520, y1: 64, x2: 520, y2: 92, width: 5, color: "rgba(180,225,255,0.34)" },
    { x1: -410, y1: 110, x2: 410, y2: 128, width: 4, color: "rgba(255,242,168,0.28)" }
  ].forEach((ring) => {
    ctx.strokeStyle = ring.color;
    ctx.lineWidth = ring.width * scale;
    drawLine(cx + ring.x1 * scale, cy + ring.y1 * scale, cx + ring.x2 * scale, cy + ring.y2 * scale);
  });
  ctx.restore();
}

function drawStadiumFoulGroundDetails(homeY = field.plateY + 42) {
  if (!getCurrentStadium().hasFoulGroundDetails) return;
  ctx.save();
  const stadium = getCurrentStadium();
  const benches = stadium.hasSeaBreeze
    ? [
        { x: field.plateX - 540, y: homeY - 145 },
        { x: field.plateX + 540, y: homeY - 145 }
      ]
    : [
        { x: field.plateX - 710, y: homeY - 230 },
        { x: field.plateX + 710, y: homeY - 230 }
      ];
  benches.forEach((bench) => {
    ctx.fillStyle = "rgba(80, 48, 28, 0.38)";
    roundRect(bench.x - 104, bench.y - 30, 208, 56, 8);
    ctx.fill();
    ctx.fillStyle = "#8b593a";
    roundRect(bench.x - 92, bench.y - 18, 184, 17, 5);
    ctx.fill();
    ctx.fillStyle = "#6e452f";
    roundRect(bench.x - 76, bench.y + 6, 152, 12, 4);
    ctx.fill();
    ctx.strokeStyle = "rgba(42, 35, 30, 0.5)";
    ctx.lineWidth = 3;
    drawLine(bench.x - 70, bench.y + 18, bench.x - 70, bench.y + 34);
    drawLine(bench.x + 70, bench.y + 18, bench.x + 70, bench.y + 34);
  });
  if (getCurrentStadium().suppressFoulGroundStands) {
    ctx.restore();
    return;
  }
  if (stadium.hasSeaBreeze) {
    ctx.restore();
    return;
  }
  [
    { x: field.plateX - 850, y: homeY - 380 },
    { x: field.plateX + 850, y: homeY - 380 }
  ].forEach((stand) => {
    for (let row = 0; row < 4; row += 1) {
      ctx.fillStyle = row % 2 === 0 ? "rgba(255, 235, 137, 0.76)" : "rgba(135, 189, 224, 0.72)";
      roundRect(stand.x - 120, stand.y + row * 22, 240, 12, 6);
      ctx.fill();
    }
  });
  ctx.restore();
}

function drawNextDomeFoulGroundDetails(homeY = field.plateY + 42) {
  if (!getCurrentStadium().hasDome) return;
  ctx.save();
  [
    { x: field.plateX - 880, y: homeY - 320 },
    { x: field.plateX + 880, y: homeY - 320 }
  ].forEach((stand) => {
    ctx.fillStyle = "rgba(35, 48, 71, 0.52)";
    roundRect(stand.x - 155, stand.y - 34, 310, 104, 12);
    ctx.fill();
    for (let row = 0; row < 5; row += 1) {
      ctx.fillStyle = row % 2 === 0 ? "rgba(214,242,223,0.82)" : "rgba(255,235,137,0.8)";
      roundRect(stand.x - 130, stand.y - 14 + row * 18, 260, 9, 5);
      ctx.fill();
    }
  });
  [
    { x: field.plateX - 510, y: homeY - 115 },
    { x: field.plateX + 510, y: homeY - 115 }
  ].forEach((pit) => {
    ctx.fillStyle = "rgba(20, 28, 40, 0.48)";
    roundRect(pit.x - 76, pit.y - 18, 152, 42, 8);
    ctx.fill();
    ctx.fillStyle = "#d7e5ef";
    ctx.fillRect(pit.x - 42, pit.y - 6, 38, 20);
    ctx.fillStyle = "#233047";
    ctx.beginPath();
    ctx.arc(pit.x + 26, pit.y + 4, 12, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function getHyperOceanBoats() {
  const center = getFenceCenter();
  const distance = defenseField.fenceDistance + 270;
  return Array.from({ length: 16 }, (_, index) => {
    const offset = -0.92 + (1.84 * index) / 15;
    const angle = -Math.PI / 2 + offset;
    const lane = index % 3;
    const laneDistance = distance + (lane - 1) * 82;
    return {
      id: index,
      style: index % 3,
      x: center.x + Math.cos(angle) * laneDistance,
      y: center.y + Math.sin(angle) * laneDistance,
      angle
    };
  });
}

function getHyperOceanLandingBoats(landing, battedBall = null, caughtBoatId = null) {
  if (!landing) return [];
  const base = Math.abs(Math.round((landing.x * 0.013 + landing.y * 0.017) * 10));
  const count = 3 + (base % 3);
  return Array.from({ length: count }, (_, index) => {
    const angle = (Math.PI * 2 * index) / count + 0.46 + (base % 7) * 0.05;
    const distance = 180 + (index % 2) * 74 + (base % 5) * 8;
    const x = landing.x + Math.cos(angle) * distance;
    const y = landing.y + Math.sin(angle) * distance;
    return {
      id: 100 + index,
      style: (index + base) % 3,
      x,
      y,
      angle: Math.atan2(landing.y - y, landing.x - x),
      waitingNearLanding: true,
      caughtCandidate: caughtBoatId === 100 + index
    };
  });
}

function drawBoat(boat, caught = false, alpha = 1) {
  ctx.save();
  ctx.translate(boat.x, boat.y);
  const catchAngle = caught && Number.isFinite(boat.catchAngle) ? boat.catchAngle : boat.angle;
  ctx.rotate(catchAngle + Math.PI / 2);
  const modelScale = boat.waitingNearLanding ? 2.25 : 2;
  ctx.scale(modelScale, modelScale);
  ctx.globalAlpha = alpha;
  const boatStyle = boat.style ?? 0;
  const isWaitingBoat = Boolean(boat.waitingNearLanding);
  const hullFill = boatStyle === 1
    ? "#f8fbff"
    : boatStyle === 2
      ? "#67c8f5"
      : "#163760";
  const hullStroke = boatStyle === 1 ? "#111827" : boatStyle === 2 ? "#f7fbff" : "#8ed9ff";
  const reachedCatch = !caught || boat.hasReachedCatch !== false;
  const halfWidth = caught ? 58 : 46;
  const halfHeight = caught ? 20 : 16;
  const activeFill = caught && reachedCatch ? "#fff2a8" : hullFill;
  const activeStroke = caught && reachedCatch ? "#1f4660" : hullStroke;
  drawModeledBoatHull({
    halfWidth,
    halfHeight,
    fill: activeFill,
    stroke: activeStroke,
    style: boatStyle,
    waiting: isWaitingBoat,
    caught: caught && reachedCatch
  });
  if (boatStyle === 1) {
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2;
    drawLine(-38, -8, 38, -2);
    drawLine(-34, 8, 34, 12);
    ctx.fillStyle = "#111827";
    ctx.font = "8px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ホームラン号", 0, 0);
  } else if (boatStyle === 2) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-28, -9, 56, 18);
    ctx.fillStyle = "#2e92d0";
    ctx.font = "9px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ハイパー号", 0, 0);
  } else {
    ctx.fillStyle = "#8ed9ff";
    ctx.fillRect(-26, -9, 20, 7);
    ctx.fillStyle = "#b9efff";
    ctx.fillRect(6, 2, 30, 8);
    ctx.fillStyle = "#2b5f90";
    ctx.fillRect(-24, 6, 42, 8);
  }
  const rowPhase = Number.isFinite(boat.rowPhase) ? boat.rowPhase : 0;
  drawBoatOars(rowPhase, caught);
  ctx.fillStyle = "#233047";
  ctx.beginPath();
  ctx.arc(0, -5, 6, 0, Math.PI * 2);
  ctx.fill();
  if (caught && reachedCatch) {
    ctx.strokeStyle = "#fff2a8";
    ctx.lineWidth = 5;
    drawLine(0, -18, 0, -48);
    drawBaseballIcon(0, -58, 8);
  }
  ctx.restore();
}

function drawModeledBoatHull({ halfWidth, halfHeight, fill, stroke, style = 0, waiting = false, caught = false }) {
  const topFill = caught ? fill : fill;
  const sideFill = style === 1
    ? "#d6e0ea"
    : style === 2
      ? "#288fc8"
      : "#0b223d";
  const farSideFill = style === 1
    ? "#eef5fb"
    : style === 2
      ? "#8ddcff"
      : "#2a6c9d";
  const noseFill = style === 1 ? "#ffffff" : style === 2 ? "#b7edff" : "#5dbde8";
  ctx.save();
  ctx.globalAlpha *= waiting ? 0.62 : 0.45;
  ctx.fillStyle = "rgba(3, 18, 35, 0.52)";
  ctx.beginPath();
  ctx.ellipse(6, halfHeight * 0.9, halfWidth * 1.18, halfHeight * 0.62, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(174, 231, 255, 0.22)";
  ctx.beginPath();
  ctx.ellipse(-10, halfHeight * 1.3, halfWidth * 0.92, halfHeight * 0.24, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.lineJoin = "round";
  ctx.strokeStyle = stroke;
  ctx.lineWidth = waiting ? 3.2 : 3;

  ctx.fillStyle = farSideFill;
  ctx.beginPath();
  ctx.moveTo(-halfWidth * 0.76, -halfHeight * 0.92);
  ctx.lineTo(halfWidth * 0.54, -halfHeight * 0.92);
  ctx.lineTo(halfWidth, -halfHeight * 0.08);
  ctx.lineTo(halfWidth * 0.62, 0);
  ctx.lineTo(-halfWidth * 0.9, -halfHeight * 0.2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = sideFill;
  ctx.beginPath();
  ctx.moveTo(-halfWidth * 0.9, -halfHeight * 0.2);
  ctx.lineTo(halfWidth * 0.62, 0);
  ctx.lineTo(halfWidth, halfHeight * 0.08);
  ctx.lineTo(halfWidth * 0.56, halfHeight * 0.96);
  ctx.lineTo(-halfWidth * 0.76, halfHeight * 0.96);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = topFill;
  ctx.beginPath();
  ctx.moveTo(-halfWidth, 0);
  ctx.lineTo(-halfWidth * 0.72, -halfHeight);
  ctx.lineTo(halfWidth * 0.62, -halfHeight);
  ctx.lineTo(halfWidth, 0);
  ctx.lineTo(halfWidth * 0.62, halfHeight);
  ctx.lineTo(-halfWidth * 0.72, halfHeight);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.32)";
  ctx.beginPath();
  ctx.moveTo(-halfWidth * 0.58, -halfHeight * 0.74);
  ctx.lineTo(halfWidth * 0.3, -halfHeight * 0.72);
  ctx.lineTo(halfWidth * 0.18, -halfHeight * 0.28);
  ctx.lineTo(-halfWidth * 0.68, -halfHeight * 0.24);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(0,0,0,0.24)";
  ctx.beginPath();
  ctx.moveTo(-halfWidth * 0.64, halfHeight * 0.28);
  ctx.lineTo(halfWidth * 0.54, halfHeight * 0.18);
  ctx.lineTo(halfWidth * 0.42, halfHeight * 0.78);
  ctx.lineTo(-halfWidth * 0.58, halfHeight * 0.78);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = noseFill;
  ctx.beginPath();
  ctx.moveTo(halfWidth * 0.62, -halfHeight);
  ctx.lineTo(halfWidth, 0);
  ctx.lineTo(halfWidth * 0.62, halfHeight);
  ctx.lineTo(halfWidth * 0.42, 0);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.42)";
  ctx.lineWidth = 1.6;
  drawLine(-halfWidth * 0.64, -halfHeight * 0.82, halfWidth * 0.42, -halfHeight * 0.8);
  drawLine(-halfWidth * 0.68, halfHeight * 0.82, halfWidth * 0.48, halfHeight * 0.72);
  ctx.restore();
}

function getDriftingBoat(boat, elapsedSeconds = 0) {
  if (!boat?.waitingNearLanding) return boat;
  const drift = Math.sin(elapsedSeconds * 0.38 + boat.id) * 30;
  const bob = Math.cos(elapsedSeconds * 0.31 + boat.id * 0.7) * 18;
  const slowTurn = Math.sin(elapsedSeconds * 0.29 + boat.id * 0.41) * 0.22;
  const forward = Math.cos(elapsedSeconds * 0.24 + boat.id * 0.21) * 14;
  const side = normalize({ x: -Math.sin(boat.angle), y: Math.cos(boat.angle) });
  const front = normalize({ x: Math.cos(boat.angle), y: Math.sin(boat.angle) });
  return {
    ...boat,
    x: boat.x + side.x * drift + front.x * forward,
    y: boat.y + side.y * drift + front.y * forward + bob,
    angle: boat.angle + slowTurn,
    rowPhase: elapsedSeconds * 1.25 + boat.id * 0.3
  };
}

function drawBoatOars(rowPhase = 0, caught = false) {
  const sweep = Math.sin(rowPhase) * 10;
  const reach = caught ? 34 : 28;
  const bladeColor = caught ? "#fff2a8" : "#e9f4ff";
  ctx.save();
  ctx.strokeStyle = "rgba(35, 48, 71, 0.86)";
  ctx.lineWidth = 3;
  [
    { side: -1, y: -18 },
    { side: 1, y: 18 }
  ].forEach((oar) => {
    const bladeX = -10 + sweep;
    const bladeY = oar.y + oar.side * reach;
    drawLine(-14, oar.y * 0.55, bladeX, bladeY);
    ctx.fillStyle = bladeColor;
    ctx.beginPath();
    ctx.ellipse(bladeX, bladeY, 9, 4, oar.side * 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
  ctx.restore();
}

function getAnimatedBoatForCatch(boat, boatCatch, elapsedSeconds = 0) {
  if (!boatCatch || boatCatch.boatId !== boat.id) return boat;
  const travelStart = Math.max(0, (boatCatch.startTime ?? 0) - 0.45);
  const travelDuration = Math.max(0.35, boatCatch.travelDuration ?? 1.25);
  const travelProgress = clamp((elapsedSeconds - travelStart) / travelDuration, 0, 1);
  const eased = travelProgress * travelProgress * (3 - 2 * travelProgress);
  return {
    ...boat,
    x: (boatCatch.homeX ?? boat.x) + ((boatCatch.x ?? boat.x) - (boatCatch.homeX ?? boat.x)) * eased,
    y: (boatCatch.homeY ?? boat.y) + ((boatCatch.y ?? boat.y) - (boatCatch.homeY ?? boat.y)) * eased,
    catchAngle: boatCatch.catchAngle,
    rowPhase: elapsedSeconds * 12 + boat.id,
    hasReachedCatch: travelProgress >= 0.98
  };
}

function drawHyperOceanBeyondOutfield() {
  if (!getCurrentStadium().hasOcean) return;
  const center = getFenceCenter();
  const top = center.y - defenseField.fenceDistance - 780;
  ctx.save();
  const oceanLeft = field.plateX - defenseField.fenceDistance - 1600;
  const oceanWidth = defenseField.fenceDistance * 2 + 3200;
  const oceanHeight = 1180;
  ctx.beginPath();
  ctx.rect(oceanLeft, top, oceanWidth, oceanHeight);
  ctx.arc(center.x, center.y, defenseField.fenceDistance + 6, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip("evenodd");
  const gradient = ctx.createLinearGradient(field.plateX, top, field.plateX, center.y - defenseField.fenceDistance + 190);
  if (gradient?.addColorStop) {
    gradient.addColorStop(0, "#4eb3d3");
    gradient.addColorStop(1, "#156b91");
    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = "#2f91b7";
  }
  ctx.fillRect(oceanLeft, top, oceanWidth, oceanHeight);
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 4;
  for (let i = 0; i < 9; i += 1) {
    const y = top + 90 + i * 76;
    drawLine(oceanLeft + 80, y, oceanLeft + oceanWidth - 80, y + Math.sin(i) * 18);
  }
  const boatCatch = defenseState.homeRunFireworks?.boatCatch;
  const elapsedSeconds = defenseState.active ? (performance.now() - defenseState.startTime) / 1000 : 0;
  const oceanBoats = defenseState.homeRunFireworks?.oceanBoats || [];
  if (!oceanBoats.length) {
    getHyperOceanBoats().forEach((boat) => {
      drawBoat(boat, false, 0.76);
    });
  }
  oceanBoats.forEach((boat) => {
    const isCaughtBoat = boatCatch?.boatId === boat.id;
    const displayBoat = isCaughtBoat
      ? getAnimatedBoatForCatch(boat, boatCatch, elapsedSeconds)
      : getDriftingBoat(boat, elapsedSeconds);
    drawBoat(displayBoat, isCaughtBoat, isCaughtBoat ? 1 : 0.88);
  });
  ctx.restore();
}

function drawNextDomeBeyondOutfield() {
  if (!getCurrentStadium().hasDome) return;
  const center = getFenceCenter();
  const standY = center.y - defenseField.fenceDistance - 210;
  ctx.save();
  const roof = ctx.createLinearGradient(field.plateX, standY - 720, field.plateX, standY + 150);
  if (roof?.addColorStop) {
    roof.addColorStop(0, "#f5f7fb");
    roof.addColorStop(0.56, "#c6d0d9");
    roof.addColorStop(1, "#87939e");
    ctx.fillStyle = roof;
  } else {
    ctx.fillStyle = "#c6d0d9";
  }
  ctx.fillRect(field.plateX - defenseField.fenceDistance - 760, standY - 760, defenseField.fenceDistance * 2 + 1520, 840);
  drawNextDomeRoofHighlights(field.plateX, standY - 650, 1.45);
  for (let tier = 0; tier < 4; tier += 1) {
    ctx.fillStyle = tier % 2 === 0 ? "rgba(35, 48, 71, 0.68)" : "rgba(48, 74, 95, 0.62)";
    roundRect(field.plateX - 680 + tier * 34, standY - tier * 38, 1360 - tier * 68, 42, 10);
    ctx.fill();
    ctx.fillStyle = tier % 2 === 0 ? "rgba(255, 235, 137, 0.82)" : "rgba(214, 242, 223, 0.82)";
    roundRect(field.plateX - 620 + tier * 34, standY + 11 - tier * 38, 1240 - tier * 68, 8, 4);
    ctx.fill();
  }
  ctx.restore();
}

function drawSpaceStadiumStars(left, top, width, height, count = 90) {
  for (let i = 0; i < count; i += 1) {
    const x = left + ((i * 97 + (i % 11) * 23) % Math.max(1, width));
    const y = top + ((i * 53 + (i % 7) * 19) % Math.max(1, height));
    const alpha = 0.56 + (i % 5) * 0.1;
    ctx.fillStyle = `rgba(235, 252, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, i % 9 === 0 ? 3.2 : i % 4 === 0 ? 1.9 : 1.35, 0, Math.PI * 2);
    ctx.fill();
    if (i % 11 === 0) {
      ctx.strokeStyle = `rgba(160, 255, 250, ${alpha * 0.58})`;
      ctx.lineWidth = 1;
      drawLine(x - 9, y, x + 9, y);
      drawLine(x, y - 9, x, y + 9);
    }
  }
}

function drawSpaceStadiumMoon(x, y, radius) {
  const glow = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius * 2.6);
  if (glow?.addColorStop) {
    glow.addColorStop(0, "rgba(230, 248, 255, 0.72)");
    glow.addColorStop(0.36, "rgba(112, 222, 255, 0.22)");
    glow.addColorStop(1, "rgba(112, 222, 255, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, radius * 2.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#e8f8ff";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(7, 18, 31, 0.22)";
  ctx.beginPath();
  ctx.arc(x + radius * 0.35, y - radius * 0.12, radius * 0.92, 0, Math.PI * 2);
  ctx.fill();
}

function drawSpaceStadiumBattingBackdrop() {
  if (!getCurrentStadium().hasSpaceStadium) return;
  ctx.save();
  const skyHeight = 96;
  const sky = ctx.createLinearGradient(0, 0, 0, skyHeight);
  if (sky?.addColorStop) {
    sky.addColorStop(0, "#01030c");
    sky.addColorStop(0.58, "#04101f");
    sky.addColorStop(1, "#092033");
    ctx.fillStyle = sky;
  } else {
    ctx.fillStyle = "#081728";
  }
  ctx.fillRect(0, 0, canvas.width, skyHeight);
  drawSpaceStadiumStars(0, 4, canvas.width, 86, 150);
  drawSpaceStadiumMoon(canvas.width - 126, 34, 23);
  ctx.globalCompositeOperation = "lighter";
  for (let x = 70; x < canvas.width; x += 170) {
    ctx.strokeStyle = "rgba(114, 255, 246, 0.16)";
    ctx.lineWidth = 3;
    drawLine(x, skyHeight - 8, x + 28, 10);
  }
  ctx.restore();
}

function drawSpaceStadiumFieldLights(centerX, homeY, radius) {
  if (!getCurrentStadium().hasSpaceStadium) return;
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, homeY, radius, Math.PI, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  const shine = ctx.createLinearGradient(centerX - radius, homeY - radius, centerX + radius, homeY);
  if (shine?.addColorStop) {
    shine.addColorStop(0, "rgba(255, 255, 255, 0.012)");
    shine.addColorStop(0.38, "rgba(125, 155, 180, 0.06)");
    shine.addColorStop(0.55, "rgba(72, 210, 218, 0.055)");
    shine.addColorStop(1, "rgba(255, 255, 255, 0.008)");
    ctx.fillStyle = shine;
    ctx.fillRect(centerX - radius, homeY - radius, radius * 2, radius);
  }
  ctx.fillStyle = "rgba(16, 24, 32, 0.18)";
  ctx.fillRect(centerX - radius, homeY - radius, radius * 2, radius);
  ctx.globalCompositeOperation = "lighter";
  for (let ring = 0.28; ring <= 0.96; ring += 0.17) {
    ctx.strokeStyle = ring > 0.75 ? "rgba(181, 148, 80, 0.075)" : "rgba(82, 205, 214, 0.07)";
    ctx.lineWidth = ring > 0.75 ? 2 : 1.4;
    ctx.beginPath();
    ctx.arc(centerX, homeY, radius * ring, Math.PI + 0.05, Math.PI * 2 - 0.05);
    ctx.stroke();
  }
  for (let i = 0; i < 105; i += 1) {
    const angle = Math.PI + ((i * 29) % 180) * Math.PI / 180;
    const distance = radius * (0.18 + ((i * 37) % 78) / 100);
    const x = centerX + Math.cos(angle) * distance;
    const y = homeY + Math.sin(angle) * distance;
    ctx.fillStyle = i % 4 === 0 ? "rgba(195, 166, 88, 0.22)" : "rgba(96, 215, 220, 0.2)";
    ctx.beginPath();
    ctx.arc(x, y, i % 6 === 0 ? 1.8 : 1.1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function getSpaceInfieldFill(centerX, topY, bottomY) {
  const fill = ctx.createLinearGradient(centerX, topY, centerX, bottomY);
  if (fill?.addColorStop) {
    fill.addColorStop(0, "#030409");
    fill.addColorStop(0.35, "#080b11");
    fill.addColorStop(0.68, "#151a22");
    fill.addColorStop(1, "#05070c");
    return fill;
  }
  return "#080b11";
}

function getSpaceOutfieldFill(centerX, homeY, radius) {
  const fill = ctx.createRadialGradient(centerX, homeY - radius * 0.3, radius * 0.08, centerX, homeY, radius);
  if (fill?.addColorStop) {
    fill.addColorStop(0, "rgba(22, 30, 40, 0.98)");
    fill.addColorStop(0.45, "rgba(9, 14, 22, 0.96)");
    fill.addColorStop(0.78, "rgba(18, 24, 32, 0.94)");
    fill.addColorStop(1, "rgba(3, 5, 10, 0.96)");
    return fill;
  }
  return "rgba(9, 14, 22, 0.96)";
}

function getObsidianFieldFill(centerX, topY, bottomY) {
  const fill = ctx.createLinearGradient(centerX, topY, centerX, bottomY);
  if (fill?.addColorStop) {
    fill.addColorStop(0, "#090811");
    fill.addColorStop(0.36, "#191428");
    fill.addColorStop(0.68, "#050509");
    fill.addColorStop(1, "#221a32");
    return fill;
  }
  return "#100d19";
}

function drawMStadiumBeyondOutfield() {
  if (!getCurrentStadium().hasMStadium) return;
  const center = getFenceCenter();
  const innerRadius = defenseField.fenceDistance + 34;
  const outerRadius = innerRadius + 270;
  ctx.save();
  if (traceRiversideOutfieldAnnulus(innerRadius, outerRadius, 182, 358, 18)) {
    const seats = ctx.createRadialGradient(center.x, center.y, innerRadius, center.x, center.y, outerRadius);
    if (seats?.addColorStop) {
      seats.addColorStop(0, "rgba(38, 34, 52, 0.96)");
      seats.addColorStop(0.55, "rgba(74, 61, 92, 0.94)");
      seats.addColorStop(1, "rgba(26, 24, 35, 0.96)");
      ctx.fillStyle = seats;
    } else {
      ctx.fillStyle = "rgba(52, 45, 67, 0.95)";
    }
    ctx.fill();
  }
  for (let radius = innerRadius + 26; radius < outerRadius; radius += 42) {
    ctx.strokeStyle = radius % 84 === 0 ? "rgba(185, 160, 215, 0.42)" : "rgba(125, 106, 154, 0.36)";
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, Math.PI + 0.08, Math.PI * 2 - 0.08);
    ctx.stroke();
  }
  ctx.fillStyle = "#ece8ff";
  ctx.font = "bold 30px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Mスタジアムです。", center.x, center.y - outerRadius + 72);
  ctx.restore();
}

function drawSpaceStadiumBeyondOutfield() {
  if (!getCurrentStadium().hasSpaceStadium) return;
  const center = getFenceCenter();
  const innerRadius = defenseField.fenceDistance + 18;
  const standsOuterRadius = innerRadius + 440;
  const skyOuterRadius = standsOuterRadius + 680;
  const left = center.x - skyOuterRadius - 260;
  const top = center.y - skyOuterRadius - 430;
  const width = skyOuterRadius * 2 + 520;
  const height = skyOuterRadius + 620;
  ctx.save();

  ctx.beginPath();
  ctx.rect(left, top, width, height);
  ctx.arc(center.x, center.y, defenseField.fenceDistance + 4, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip("evenodd");

  const sky = ctx.createLinearGradient(center.x, top, center.x, center.y - defenseField.fenceDistance);
  if (sky?.addColorStop) {
    sky.addColorStop(0, "#01020a");
    sky.addColorStop(0.62, "#04101e");
    sky.addColorStop(1, "#082033");
    ctx.fillStyle = sky;
  } else {
    ctx.fillStyle = "#04101e";
  }
  ctx.fillRect(left, top, width, height);
  drawSpaceStadiumStars(left, top + 40, width, Math.max(120, height * 0.62), 300);
  drawSpaceStadiumMoon(center.x + defenseField.fenceDistance * 0.64, center.y - defenseField.fenceDistance - 360, 42);

  traceRiversideOutfieldAnnulus(innerRadius, standsOuterRadius, 177, 363, 18);
  ctx.fillStyle = "rgba(5, 12, 24, 0.92)";
  ctx.fill();
  for (let row = 0; row < 11; row += 1) {
    const radius = innerRadius + 34 + row * 45;
    ctx.strokeStyle = row % 2 === 0 ? "rgba(24, 54, 73, 0.92)" : "rgba(9, 22, 39, 0.96)";
    ctx.lineWidth = 34;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, Math.PI, Math.PI * 2);
    ctx.stroke();
    for (let angle = 181; angle <= 359; angle += 2) {
      const rad = degreesToRadians(angle + (row % 2) * 1.5);
      const palette = ["#fff2a8", "#aee7ff", "#ff8dc7", "#d6f2df", "#bca7ff", "#ff6f61"];
      ctx.fillStyle = palette[(row + Math.floor(angle / 2)) % palette.length];
      ctx.beginPath();
      ctx.arc(center.x + Math.cos(rad) * radius, center.y + Math.sin(rad) * radius, angle % 8 === 0 ? 5.6 : 3.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalCompositeOperation = "lighter";
  for (let radius = innerRadius + 26; radius < standsOuterRadius; radius += 54) {
    ctx.strokeStyle = radius % 108 < 54 ? "rgba(124, 255, 246, 0.26)" : "rgba(255, 238, 120, 0.24)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, Math.PI + 0.01, Math.PI * 2 - 0.01);
    ctx.stroke();
  }
  for (let angle = 188; angle <= 352; angle += 18) {
    const rad = degreesToRadians(angle);
    const x = center.x + Math.cos(rad) * (standsOuterRadius + 16);
    const y = center.y + Math.sin(rad) * (standsOuterRadius + 16);
    ctx.strokeStyle = "rgba(119, 255, 247, 0.28)";
    ctx.lineWidth = 7;
    drawLine(x, y, center.x + Math.cos(rad) * innerRadius, center.y + Math.sin(rad) * innerRadius);
  }
  ctx.restore();
}

function drawAmericanRoyalBattingBackdrop() {
  if (!getCurrentStadium().royalEnclosed) return;
  ctx.save();
  const backdropHeight = 66;
  const wall = ctx.createLinearGradient(0, 0, 0, 390);
  if (wall?.addColorStop) {
    wall.addColorStop(0, "#101715");
    wall.addColorStop(0.48, "#283428");
    wall.addColorStop(1, "#4a3d2b");
    ctx.fillStyle = wall;
  } else {
    ctx.fillStyle = "#283428";
  }
  ctx.fillRect(0, 0, canvas.width, backdropHeight);
  ctx.fillStyle = "#141d1a";
  ctx.fillRect(0, 0, canvas.width, 40);
  ctx.fillStyle = "#c99b4c";
  ctx.fillRect(0, backdropHeight - 8, canvas.width, 6);
  for (let x = 0; x < canvas.width; x += 160) {
    const column = ctx.createLinearGradient(x, 0, x + 22, 0);
    if (column?.addColorStop) {
      column.addColorStop(0, "rgba(91,55,28,0.84)");
      column.addColorStop(0.42, "rgba(176,113,55,0.78)");
      column.addColorStop(1, "rgba(67,39,22,0.88)");
      ctx.fillStyle = column;
    } else {
      ctx.fillStyle = "rgba(112,70,37,0.82)";
    }
    roundRect(x + 22, 6, 22, backdropHeight - 10, 6);
    ctx.fill();
    ctx.fillStyle = "rgba(232,194,106,0.54)";
    ctx.fillRect(x + 28, 14, 4, backdropHeight - 24);
  }
  for (let x = 0; x <= canvas.width; x += 80) {
    ctx.fillStyle = "rgba(4,11,10,0.34)";
    ctx.fillRect(x, 0, 8, backdropHeight);
  }
  ctx.restore();
}

function drawHomeRunVisionBeyondOutfield() {
  if (!getCurrentStadium().hasHomeRunVision) return;
  const focus = getHomeRunVisionScreenFocusPoint();
  const centerX = focus.x;
  const screenY = focus.y;
  const screenWidth = 1120;
  const screenHeight = 360;
  const panelWidth = 1010;
  const panelHeight = 248;
  ctx.save();
  ctx.fillStyle = "rgba(22, 33, 42, 0.8)";
  roundRect(centerX - screenWidth / 2, screenY - screenHeight / 2, screenWidth, screenHeight, 22);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 242, 168, 0.82)";
  ctx.lineWidth = 10;
  ctx.stroke();
  const glow = ctx.createLinearGradient(centerX - panelWidth / 2, screenY - 118, centerX + panelWidth / 2, screenY + 112);
  glow.addColorStop(0, "rgba(64,184,216,0.94)");
  glow.addColorStop(0.5, "rgba(255,242,168,0.98)");
  glow.addColorStop(1, "rgba(255,111,97,0.92)");
  ctx.fillStyle = glow;
  roundRect(centerX - panelWidth / 2, screenY - 122, panelWidth, panelHeight, 14);
  ctx.fill();
  ctx.fillStyle = "rgba(20, 28, 40, 0.86)";
  ctx.font = "bold 42px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("ホームランヴィジョン", centerX, screenY - 88);
  ctx.font = "bold 22px sans-serif";
  ctx.fillText("無観客・スイング解析中", centerX, screenY - 48);
  drawHomeRunVisionAdviceText(centerX - 460, screenY - 10, 920, homeRunVisionDisplay.advice || "打球結果のあと、ここにアドバイスを表示します。");
  ctx.strokeStyle = "rgba(35, 48, 71, 0.58)";
  ctx.lineWidth = 12;
  drawLine(centerX - 370, screenY + screenHeight / 2, centerX - 370, screenY + screenHeight / 2 + 150);
  drawLine(centerX + 370, screenY + screenHeight / 2, centerX + 370, screenY + screenHeight / 2 + 150);
  ctx.strokeStyle = "rgba(255,255,255,0.24)";
  ctx.lineWidth = 2;
  for (let x = centerX - 480; x <= centerX + 480; x += 80) {
    drawLine(x, screenY - 112, x, screenY + 112);
  }
  ctx.restore();
}

function getHomeRunVisionScreenFocusPoint() {
  return {
    x: field.plateX,
    y: field.plateY + 42 - defenseField.fenceDistance - 250
  };
}

function drawHomeRunVisionAdviceText(x, y, maxWidth, text) {
  ctx.save();
  ctx.fillStyle = "rgba(20, 28, 40, 0.9)";
  ctx.font = "bold 25px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const cleanText = String(text || "").replace(/^アドバイス:\s*/, "");
  const lines = wrapJapaneseTextForCanvas(cleanText, maxWidth, 4);
  lines.forEach((line, index) => {
    ctx.fillText(index === 0 ? `アドバイス: ${line}` : line, x, y + index * 34);
  });
  ctx.restore();
}

function wrapJapaneseTextForCanvas(text, maxWidth, maxLines = 4) {
  const chars = [...String(text || "")];
  const lines = [];
  let line = "";
  chars.forEach((char) => {
    const next = line + char;
    if (line && ctx.measureText(next).width > maxWidth) {
      lines.push(line);
      line = char;
      return;
    }
    line = next;
  });
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;
  const trimmed = lines.slice(0, maxLines);
  let last = trimmed[maxLines - 1];
  while (ctx.measureText(`${last}…`).width > maxWidth && last.length > 0) {
    last = last.slice(0, -1);
  }
  trimmed[maxLines - 1] = `${last}…`;
  return trimmed;
}

function drawAmericanRoyalBeyondOutfield() {
  if (!getCurrentStadium().royalEnclosed) return;
  const center = getFenceCenter();
  const innerRadius = defenseField.fenceDistance + 26;
  const standsOuterRadius = innerRadius + 430;
  const wallOuterRadius = standsOuterRadius + 520;
  const left = center.x - wallOuterRadius - 360;
  const top = center.y - wallOuterRadius - 520;
  const width = wallOuterRadius * 2 + 720;
  const height = wallOuterRadius + 760;
  ctx.save();

  ctx.beginPath();
  ctx.rect(left, top, width, height);
  ctx.arc(center.x, center.y, defenseField.fenceDistance + 4, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip("evenodd");

  const wall = ctx.createLinearGradient(center.x, top, center.x, center.y - defenseField.fenceDistance);
  if (wall?.addColorStop) {
    wall.addColorStop(0, "#111816");
    wall.addColorStop(0.58, "#26372f");
    wall.addColorStop(1, "#4a3d2b");
    ctx.fillStyle = wall;
  } else {
    ctx.fillStyle = "#26372f";
  }
  ctx.fillRect(left, top, width, height);

  traceRiversideOutfieldAnnulus(standsOuterRadius, wallOuterRadius, 176, 364);
  ctx.fillStyle = "#18231f";
  ctx.fill();
  for (let radius = standsOuterRadius + 48; radius < wallOuterRadius; radius += 74) {
    ctx.strokeStyle = radius % 148 < 74 ? "rgba(107,91,63,0.34)" : "rgba(10,18,15,0.42)";
    ctx.lineWidth = 42;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, Math.PI, Math.PI * 2);
    ctx.stroke();
  }

  traceRiversideOutfieldAnnulus(innerRadius, standsOuterRadius, 177, 363);
  ctx.fillStyle = "#2a3931";
  ctx.fill();
  for (let row = 0; row < 8; row += 1) {
    const radius = innerRadius + 32 + row * 48;
    ctx.strokeStyle = row % 2 === 0 ? "#182923" : "#3a4b3f";
    ctx.lineWidth = 34;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, Math.PI, Math.PI * 2);
    ctx.stroke();
    for (let angle = 182; angle <= 358; angle += 3) {
      const rad = degreesToRadians(angle + (row % 2) * 1.4);
      const palette = ["#efd494", "#d9e6d7", "#a94c49", "#7196aa", "#f4eee0"];
      ctx.fillStyle = palette[(row + Math.floor(angle / 3)) % palette.length];
      ctx.beginPath();
      ctx.arc(center.x + Math.cos(rad) * radius, center.y + Math.sin(rad) * radius, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.strokeStyle = "#c99b4c";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(center.x, center.y, standsOuterRadius + 8, Math.PI, Math.PI * 2);
  ctx.stroke();
  for (let angle = 180; angle <= 360; angle += 10) {
    const rad = degreesToRadians(angle);
    const innerX = center.x + Math.cos(rad) * innerRadius;
    const innerY = center.y + Math.sin(rad) * innerRadius;
    const outerX = center.x + Math.cos(rad) * wallOuterRadius;
    const outerY = center.y + Math.sin(rad) * wallOuterRadius;
    ctx.strokeStyle = "rgba(12,20,16,0.5)";
    ctx.lineWidth = 7;
    drawLine(innerX, innerY, outerX, outerY);
  }
  ctx.restore();
}

function drawAozoraRuralBeyondOutfield() {
  if (getCurrentStadium().id !== "aozora") return;
  const center = getFenceCenter();
  const innerRadius = defenseField.fenceDistance + 18;
  const fieldOuterRadius = innerRadius + 780;
  const left = center.x - fieldOuterRadius - 1260;
  const top = center.y - fieldOuterRadius - 360;
  const width = fieldOuterRadius * 2 + 2520;
  const height = fieldOuterRadius + 620;
  ctx.save();

  ctx.beginPath();
  ctx.rect(left, top, width, height);
  ctx.arc(center.x, center.y, defenseField.fenceDistance + 4, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip("evenodd");

  const sky = ctx.createLinearGradient(center.x, top, center.x, center.y - defenseField.fenceDistance);
  if (sky?.addColorStop) {
    sky.addColorStop(0, "#bfe9ff");
    sky.addColorStop(0.58, "#dff4ff");
    sky.addColorStop(1, "#f7fbef");
    ctx.fillStyle = sky;
  } else {
    ctx.fillStyle = "#dff4ff";
  }
  ctx.fillRect(left, top, width, height);

  const rural = ctx.createLinearGradient(center.x, top, center.x, top + height);
  if (rural?.addColorStop) {
    rural.addColorStop(0, "#cfe878");
    rural.addColorStop(0.45, "#bfe36a");
    rural.addColorStop(1, "#a9d957");
    ctx.fillStyle = rural;
  } else {
    ctx.fillStyle = "#bfe36a";
  }
  ctx.fillRect(left, top, width, height);

  ctx.strokeStyle = "rgba(245, 255, 190, 0.28)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 18; i += 1) {
    const x = left + (i / 17) * width;
    drawLine(x, top, x + 140, top + height);
  }

  const flowers = ["#fff7a8", "#ff8fb3", "#f2f6ff", "#b687ff"];
  for (let i = 0; i < 160; i += 1) {
    const angle = degreesToRadians(184 + ((i * 37) % 172));
    const radius = innerRadius + 70 + ((i * 53) % Math.max(1, fieldOuterRadius - innerRadius - 140));
    const x = center.x + Math.cos(angle) * radius;
    const y = center.y + Math.sin(angle) * radius;
    ctx.fillStyle = flowers[i % flowers.length];
    ctx.beginPath();
    ctx.arc(x, y, i % 5 === 0 ? 3.2 : 2.1, 0, Math.PI * 2);
    ctx.fill();
  }

  drawAozoraLargeTree(center.x - fieldOuterRadius * 0.58, center.y - fieldOuterRadius * 0.62, 1.08);
  drawAozoraLargeTree(center.x + fieldOuterRadius * 0.02, center.y - fieldOuterRadius * 0.78, 1.24);
  drawAozoraLargeTree(center.x + fieldOuterRadius * 0.56, center.y - fieldOuterRadius * 0.58, 1.02);
  ctx.restore();
}

function drawAozoraLargeTree(x, y, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#815530";
  roundRect(-10, -8, 20, 78, 8);
  ctx.fill();
  const leaves = [
    { x: -28, y: -18, r: 38, c: "#4f9a43" },
    { x: 18, y: -22, r: 42, c: "#5cad4f" },
    { x: 0, y: -52, r: 45, c: "#68b85d" },
    { x: 36, y: 0, r: 34, c: "#3f8738" },
    { x: -42, y: 4, r: 32, c: "#5aa84d" }
  ];
  leaves.forEach((leaf) => {
    ctx.fillStyle = leaf.c;
    ctx.beginPath();
    ctx.arc(leaf.x, leaf.y, leaf.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawShiokazeParkBeyondOutfield() {
  if (!isShiokazeStadium()) return;
  const center = getFenceCenter();
  const parkWidth = getShiokazeParkWidthUnits();
  const parkDepth = getShiokazeParkDepthUnits();
  const left = field.plateX - parkWidth / 2;
  const top = center.y - defenseField.fenceDistance - parkDepth * 0.92;
  ctx.save();
  drawShiokazeParkScene(left, top, parkWidth, parkDepth, 1);
  drawShiokazeOutfieldSeats(center.x, center.y, defenseField.fenceDistance + 120);
  ctx.restore();
}

function getShiokazeParkWidthUnits() {
  return getFieldUnitsFromMeters(getCurrentStadium().seaBreezeParkMeters?.width ?? 1024);
}

function getShiokazeParkDepthUnits() {
  return getFieldUnitsFromMeters(getCurrentStadium().seaBreezeParkMeters?.depth ?? 256);
}

function drawShiokazeParkScene(left, top, width, height, detailScale = 1) {
  const waterY = top + height * 0.18;
  const grass = ctx.createLinearGradient(left, top, left, top + height);
  grass.addColorStop(0, "#9bdd63");
  grass.addColorStop(0.48, "#7fce5a");
  grass.addColorStop(1, "#63b94f");
  ctx.fillStyle = grass;
  ctx.fillRect(left, top, width, height);
  drawShiokazeGrassTexture(left, top, width, height, detailScale);

  ctx.fillStyle = "#65bdda";
  ctx.beginPath();
  ctx.moveTo(left, top);
  for (let i = 0; i <= 32; i += 1) {
    const t = i / 32;
    const x = left + width * t;
    const y = waterY + Math.sin(t * Math.PI * 5.5) * 34 + Math.sin(t * Math.PI * 11) * 13;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(left + width, top - height * 0.35);
  ctx.lineTo(left, top - height * 0.35);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(245,255,255,0.62)";
  ctx.lineWidth = 5 * detailScale;
  for (let i = 0; i < 5; i += 1) {
    const waveY = waterY - 68 - i * 42;
    drawLine(left + 80 + i * 140, waveY, left + width - 120, waveY + Math.sin(i) * 18);
  }

  ctx.strokeStyle = "#d8c18a";
  ctx.lineWidth = 28 * detailScale;
  ctx.beginPath();
  for (let i = 0; i <= 30; i += 1) {
    const t = i / 30;
    const x = left + width * t;
    const y = waterY + 72 + Math.sin(t * Math.PI * 4) * 22;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  drawShiokazeTetrapods(left, waterY, width, detailScale);
  drawShiokazeParkDetails(left, top, width, height, detailScale);
  drawShiokazeAreaFeatures(left, top, width, height, detailScale);
  drawShiokazeShelters(left, top, width, height, detailScale);
}

function drawShiokazeTetrapods(left, waterY, width, detailScale = 1) {
  ctx.save();
  ctx.strokeStyle = "rgba(100, 112, 118, 0.72)";
  ctx.lineWidth = 5 * detailScale;
  for (let i = 0; i < 18; i += 1) {
    if (i % 4 === 2) continue;
    const x = left + 90 + i * (width - 180) / 17;
    const y = waterY + 18 + Math.sin(i * 1.7) * 22;
    drawLine(x - 14, y, x + 14, y);
    drawLine(x, y - 14, x, y + 14);
    drawLine(x - 10, y + 10, x + 10, y - 10);
  }
  ctx.restore();
}

function drawShiokazeParkDetails(left, top, width, height, detailScale = 1) {
  const flowers = ["#fff5a6", "#ff9abd", "#e8f7ff", "#c9a6ff"];
  for (let i = 0; i < 90; i += 1) {
    const x = left + ((i * 73) % Math.max(1, width - 140)) + 70;
    const y = top + height * 0.36 + ((i * 47) % Math.max(1, height * 0.48));
    ctx.fillStyle = flowers[i % flowers.length];
    ctx.beginPath();
    ctx.arc(x, y, (i % 3 === 0 ? 3.2 : 2.2) * detailScale, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 22; i += 1) {
    const x = left + 120 + ((i * 211) % Math.max(1, width - 240));
    const y = top + height * (0.34 + ((i * 37) % 52) / 100);
    drawShiokazeTree(x, y, (0.75 + (i % 4) * 0.12) * detailScale);
  }
  for (let i = 0; i < 12; i += 1) {
    const x = left + 160 + i * (width - 320) / 11;
    const y = top + height * 0.48 + Math.sin(i * 1.1) * 54;
    drawShiokazeBench(x, y, detailScale);
    drawShiokazeLamp(x + 58, y - 30, detailScale);
  }
}

function drawShiokazeGrassTexture(left, top, width, height, detailScale = 1) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = Math.max(1, 1.2 * detailScale);
  for (let i = 0; i < 90; i += 1) {
    const x = left + ((i * 97) % Math.max(1, width));
    const y = top + ((i * 53) % Math.max(1, height));
    drawLine(x, y, x + 22 + (i % 5) * 6, y - 7 + (i % 3) * 4);
  }
  ctx.strokeStyle = "rgba(34,112,53,0.16)";
  for (let i = 0; i < 70; i += 1) {
    const x = left + ((i * 131) % Math.max(1, width));
    const y = top + ((i * 71) % Math.max(1, height));
    drawLine(x, y, x + 18, y + 5);
  }
  ctx.restore();
}

function getShiokazeAreas(left, top, width, height) {
  const names = ["東海岸エリア", "遊歩道エリア", "球場エリア", "魚釣りエリア", "潮風エリア"];
  return names.map((name, index) => ({
    name,
    index,
    left: left + (width * index) / 5,
    right: left + (width * (index + 1)) / 5,
    centerX: left + width * (index + 0.5) / 5,
    top,
    bottom: top + height
  }));
}

function drawShiokazeAreaFeatures(left, top, width, height, detailScale = 1) {
  const areas = getShiokazeAreas(left, top, width, height);
  const waterY = top + height * 0.18;
  drawShiokazeParkSign(left + width * 0.5, top + height * 0.31, "潮風公園", 1.25 * detailScale);
  areas.forEach((area) => {
    drawShiokazeParkSign(area.centerX, top + height * 0.42, area.name, 0.82 * detailScale);
    drawShiokazeDirectionalSign(area.centerX - width * 0.055, top + height * 0.58, area.index, detailScale);
  });
  drawShiokazeCoastRocks(areas[0].left, waterY + 52, width / 5, detailScale);
  drawShiokazePromenadeShade(areas[1].left, top + height * 0.52, width / 5, detailScale);
  drawShiokazeBallparkGate(areas[2].centerX, top + height * 0.64, detailScale);
  drawShiokazeFishingPiers(areas[3].left, waterY + 40, width / 5, detailScale);
  drawShiokazeWindFlags(areas[4].left, top + height * 0.44, width / 5, detailScale);
}

function drawShiokazeParkSign(x, y, text, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#7a5632";
  roundRect(-82, -32, 164, 48, 7);
  ctx.fill();
  ctx.fillStyle = "#f8f3d8";
  roundRect(-72, -24, 144, 28, 4);
  ctx.fill();
  ctx.fillStyle = "#23422c";
  ctx.font = "bold 15px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 0, -10);
  ctx.strokeStyle = "#5d4635";
  ctx.lineWidth = 4;
  drawLine(-44, 16, -44, 46);
  drawLine(44, 16, 44, 46);
  ctx.restore();
}

function drawShiokazeDirectionalSign(x, y, areaIndex, scale = 1) {
  const labels = ["←東海岸", "遊歩道→", "球場入口", "釣り場→", "潮風広場→"];
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#ffffff";
  roundRect(-54, -20, 108, 30, 4);
  ctx.fill();
  ctx.strokeStyle = "#3f5c48";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#2d4c39";
  ctx.font = "bold 11px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(labels[areaIndex] || "案内", 0, -2);
  ctx.strokeStyle = "#5d4635";
  ctx.lineWidth = 3;
  drawLine(0, 10, 0, 38);
  ctx.restore();
}

function drawShiokazeShelters(left, top, width, height, detailScale = 1) {
  for (let i = 0; i < 16; i += 1) {
    const area = i % 5;
    const row = Math.floor(i / 5);
    const x = left + width * (area + 0.18 + ((i * 17) % 48) / 100) / 5;
    const y = top + height * (0.5 + row * 0.12 + ((i * 13) % 18) / 100);
    drawShiokazeShelter(x, y, i + 1, 0.8 * detailScale);
  }
}

function drawShiokazeShelter(x, y, number, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#f7fbff";
  roundRect(-24, -18, 48, 36, 3);
  ctx.fill();
  ctx.strokeStyle = "#9aa7b2";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#334155";
  ctx.font = "7px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(number), 0, 0);
  ctx.restore();
}

function drawShiokazeCoastRocks(left, y, width, detailScale = 1) {
  ctx.save();
  ctx.fillStyle = "rgba(114, 124, 128, 0.7)";
  for (let i = 0; i < 12; i += 1) {
    ctx.beginPath();
    ctx.ellipse(left + 35 + i * width / 12, y + Math.sin(i) * 20, 16 * detailScale, 9 * detailScale, i * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawShiokazePromenadeShade(left, y, width, detailScale = 1) {
  for (let i = 0; i < 7; i += 1) {
    drawShiokazeTree(left + 35 + i * width / 7, y + Math.sin(i * 1.2) * 26, 0.95 * detailScale);
  }
}

function drawShiokazeBallparkGate(x, y, detailScale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(detailScale, detailScale);
  ctx.strokeStyle = "#34513a";
  ctx.lineWidth = 8;
  drawLine(-72, 36, -72, -32);
  drawLine(72, 36, 72, -32);
  drawLine(-82, -32, 82, -32);
  ctx.fillStyle = "#f8f3d8";
  roundRect(-68, -64, 136, 28, 5);
  ctx.fill();
  ctx.fillStyle = "#24432e";
  ctx.font = "bold 13px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("潮風球場入口", 0, -46);
  ctx.restore();
}

function drawShiokazeFishingPiers(left, y, width, detailScale = 1) {
  ctx.save();
  ctx.strokeStyle = "#8b6b45";
  ctx.lineWidth = 8 * detailScale;
  for (let i = 0; i < 3; i += 1) {
    const x = left + width * (0.22 + i * 0.24);
    drawLine(x, y + 36, x + 70, y - 64);
    ctx.strokeStyle = "#3b5561";
    ctx.lineWidth = 2 * detailScale;
    drawLine(x + 70, y - 64, x + 84, y - 38);
    ctx.strokeStyle = "#8b6b45";
    ctx.lineWidth = 8 * detailScale;
  }
  ctx.restore();
}

function drawShiokazeWindFlags(left, y, width, detailScale = 1) {
  ctx.save();
  for (let i = 0; i < 8; i += 1) {
    const x = left + 34 + i * width / 8;
    ctx.strokeStyle = "#405061";
    ctx.lineWidth = 4 * detailScale;
    drawLine(x, y + 64, x, y);
    ctx.fillStyle = i % 2 ? "#7ec8e3" : "#fff2a8";
    ctx.beginPath();
    ctx.moveTo(x, y + 4);
    ctx.quadraticCurveTo(x + 38, y + 8 + Math.sin(i) * 8, x + 58, y + 22);
    ctx.lineTo(x, y + 30);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawShiokazeOutfieldSeats(cx, cy, radius) {
  ctx.save();
  for (let row = 0; row < 4; row += 1) {
    ctx.strokeStyle = row % 2 === 0 ? "rgba(255, 237, 153, 0.82)" : "rgba(114, 181, 210, 0.78)";
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(cx, cy, radius + row * 32, degreesToRadians(205), degreesToRadians(335));
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(80, 105, 82, 0.48)";
  ctx.lineWidth = 5;
  for (let angle = 210; angle <= 330; angle += 15) {
    const rad = degreesToRadians(angle);
    drawLine(
      cx + Math.cos(rad) * (radius - 20),
      cy + Math.sin(rad) * (radius - 20),
      cx + Math.cos(rad) * (radius + 132),
      cy + Math.sin(rad) * (radius + 132)
    );
  }
  ctx.restore();
}

function drawShiokazeTree(x, y, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#8a6339";
  roundRect(-7, 0, 14, 48, 6);
  ctx.fill();
  ["#7fbd4b", "#8dcc56", "#a2d967"].forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc((index - 1) * 17, -8 - index * 6, 29 - index * 2, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawShiokazeBench(x, y, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#9a6a3e";
  roundRect(-34, -8, 68, 10, 4);
  ctx.fill();
  roundRect(-30, 7, 60, 8, 4);
  ctx.fill();
  ctx.strokeStyle = "#5d4635";
  ctx.lineWidth = 3;
  drawLine(-24, 15, -24, 27);
  drawLine(24, 15, 24, 27);
  ctx.restore();
}

function drawShiokazeLamp(x, y, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = "#405061";
  ctx.lineWidth = 4;
  drawLine(0, 0, 0, 58);
  ctx.fillStyle = "rgba(255, 242, 168, 0.72)";
  ctx.beginPath();
  ctx.arc(0, -4, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawRiversideBeyondOutfield() {
  if (!getCurrentStadium().hasRiver) return;
  const center = getFenceCenter();
  const stadium = getCurrentStadium();
  const bankWidth = getRiversideHomeRunZoneUnits(stadium.riverBankMeters ?? 24);
  const riverWidth = getRiversideHomeRunZoneUnits(stadium.riverWidthMeters ?? 40);
  const nearBankInner = defenseField.fenceDistance + 24;
  const nearBankOuter = nearBankInner + bankWidth;
  const riverOuter = nearBankOuter + riverWidth;
  const farBankOuter = riverOuter + bankWidth;
  ctx.save();

  if (traceRiversideOutfieldAnnulus(nearBankInner, nearBankOuter, 178, 362, 16)) {
    ctx.fillStyle = "#a77b4f";
    ctx.fill();
  }
  if (traceRiversideOutfieldAnnulus(nearBankOuter, riverOuter, 178, 362, 22)) {
    const water = ctx.createLinearGradient(field.plateX, center.y - nearBankOuter, field.plateX, center.y - riverOuter);
    if (water?.addColorStop) {
      water.addColorStop(0, "#2f93bd");
      water.addColorStop(0.52, "#58bbd3");
      water.addColorStop(1, "#1f719f");
      ctx.fillStyle = water;
    } else {
      ctx.fillStyle = "#399bc1";
    }
    ctx.fill();
  }
  if (traceRiversideOutfieldAnnulus(riverOuter, farBankOuter, 178, 362, 18)) {
    ctx.fillStyle = "#b58a5a";
    ctx.fill();
  }

  drawRiversideRiverFlowLines(nearBankOuter, riverOuter);
  drawRiversideKoi(nearBankOuter, riverOuter);
  drawRiversideRiverbankDetails(nearBankInner, nearBankOuter, riverOuter, farBankOuter);

  ctx.restore();
}

function getRiversideHomeRunZoneUnits(meters) {
  const stadium = getCurrentStadium();
  const centerMeters = Number.isFinite(stadium.centerFenceMeters) ? stadium.centerFenceMeters : realFieldMetrics.centerFieldFenceMeters;
  return defenseField.fenceDistance * (meters / centerMeters);
}

function traceRiversideOutfieldAnnulus(innerRadius, outerRadius, startDegrees = 180, endDegrees = 360, curve = 0) {
  const center = getFenceCenter();
  const samples = 48;
  ctx.beginPath();
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const angle = degreesToRadians(startDegrees + (endDegrees - startDegrees) * t);
    const wobble = Math.sin(t * Math.PI * 3.1) * curve;
    const x = center.x + Math.cos(angle) * (innerRadius + wobble);
    const y = center.y + Math.sin(angle) * (innerRadius + wobble);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  for (let i = samples; i >= 0; i -= 1) {
    const t = i / samples;
    const angle = degreesToRadians(startDegrees + (endDegrees - startDegrees) * t);
    const wobble = Math.sin(t * Math.PI * 2.4 + 0.7) * curve;
    const x = center.x + Math.cos(angle) * (outerRadius + wobble);
    const y = center.y + Math.sin(angle) * (outerRadius + wobble);
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  return true;
}

function getRiversideArcPoint(radius, t, curve = 0) {
  const center = getFenceCenter();
  const angle = degreesToRadians(180 + 180 * t);
  const wobble = Math.sin(t * Math.PI * 2.7) * curve;
  return {
    x: center.x + Math.cos(angle) * (radius + wobble),
    y: center.y + Math.sin(angle) * (radius + wobble)
  };
}

function drawRiversideRiverFlowLines(innerRadius, outerRadius) {
  ctx.save();
  ctx.strokeStyle = "rgba(235, 252, 255, 0.36)";
  ctx.lineWidth = 4;
  for (let lane = 0.18; lane <= 0.84; lane += 0.22) {
    const radius = innerRadius + (outerRadius - innerRadius) * lane;
    ctx.beginPath();
    for (let i = 0; i <= 40; i += 1) {
      const t = i / 40;
      const point = getRiversideArcPoint(radius, t, 18);
      point.y += Math.sin(t * Math.PI * 8 + lane * 5) * 5;
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    }
    ctx.stroke();
  }
  ctx.restore();
}

function getRiversideKoiVariant(index) {
  const palettes = [
    ["#f8f5e8", "#d94831"],
    ["#fff7d6", "#111827"],
    ["#f7f7f2", "#e69f2e"],
    ["#1f2937", "#f8f5e8"],
    ["#f97316", "#ffffff"],
    ["#f8fafc", "#b91c1c"],
    ["#fde68a", "#7c2d12"],
    ["#e5e7eb", "#2563eb"]
  ];
  const palette = palettes[index % palettes.length];
  return {
    body: palette[0],
    spot: palette[1],
    size: 0.72 + ((index * 7) % 8) * 0.055,
    speed: 0.8 + ((index * 11) % 9) * 0.12,
    wiggle: 0.12 + ((index * 5) % 7) * 0.035,
    spotCount: 1 + (index % 4),
    direction: index % 2 === 0 ? 1 : -1
  };
}

function getRiversideKoiSchool(innerRadius, outerRadius, elapsedSeconds = 0) {
  return Array.from({ length: getCurrentStadium().koiVariants ?? 64 }, (_, index) => {
    const variant = getRiversideKoiVariant(index);
    const lane = ((index * 13) % 61) / 60;
    const baseT = ((index * 17) % 64) / 64;
    const motion = elapsedSeconds * 0.007 * variant.speed * variant.direction;
    const t = ((baseT + motion) % 1 + 1) % 1;
    const radius = innerRadius + (outerRadius - innerRadius) * (0.12 + lane * 0.76);
    const point = getRiversideArcPoint(radius, t, 14);
    return {
      ...variant,
      id: index,
      x: point.x,
      y: point.y + Math.sin(elapsedSeconds * variant.speed + index) * 8,
      angle: degreesToRadians(180 + 180 * t) + (variant.direction > 0 ? Math.PI / 2 : -Math.PI / 2)
    };
  });
}

function drawRiversideKoi(innerRadius, outerRadius) {
  const elapsedSeconds = defenseState.active ? (performance.now() - defenseState.startTime) / 1000 : performance.now() / 1000;
  const koiSchool = getRiversideKoiSchool(innerRadius, outerRadius, elapsedSeconds);
  koiSchool.forEach((koi) => drawRiversideKoiFish(koi));
}

function drawRiversideKoiFish(koi) {
  ctx.save();
  ctx.translate(koi.x, koi.y);
  ctx.rotate(koi.angle);
  ctx.scale(koi.size, koi.size);
  ctx.globalAlpha = 0.84;
  ctx.fillStyle = "rgba(4, 28, 42, 0.22)";
  ctx.beginPath();
  ctx.ellipse(3, 5, 18, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = koi.body;
  ctx.beginPath();
  ctx.ellipse(0, 0, 18, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = koi.spot;
  for (let i = 0; i < koi.spotCount; i += 1) {
    ctx.beginPath();
    ctx.ellipse(-8 + i * 6, Math.sin(i + koi.id) * 2, 4, 3, 0.35, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = koi.body;
  ctx.beginPath();
  ctx.moveTo(18, 0);
  ctx.lineTo(30, -7);
  ctx.lineTo(27, 0);
  ctx.lineTo(30, 7);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.beginPath();
  ctx.ellipse(-12, -5, 4, 2, -0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawRiversideRiverbankDetails(nearInner, nearOuter, riverOuter, farOuter) {
  ctx.save();
  const detailRadii = [nearInner + (nearOuter - nearInner) * 0.55, riverOuter + (farOuter - riverOuter) * 0.48];
  detailRadii.forEach((radius, bankIndex) => {
    for (let i = 0; i < 22; i += 1) {
      const t = (i + bankIndex * 0.37) / 22;
      const point = getRiversideArcPoint(radius + ((i % 4) - 1.5) * 9, t, 14);
      if (i % 5 === 0) {
        ctx.fillStyle = "rgba(60, 105, 57, 0.86)";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 14 + (i % 3) * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#6d4e2f";
        ctx.fillRect(point.x - 2, point.y + 10, 4, 16);
      } else {
        ctx.fillStyle = "rgba(185, 173, 132, 0.76)";
        ctx.beginPath();
        ctx.ellipse(point.x, point.y, 6, 4, 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });
  ctx.restore();
}

function getRiversideRiverBandPoints(extraWidth = 0) {
  const metrics = getRiversideRiverMetrics();
  if (!metrics) return null;
  const left = field.plateX - metrics.xSpan;
  const right = field.plateX + metrics.xSpan;
  const samples = 32;
  const upper = [];
  const lower = [];
  for (let i = 0; i <= samples; i += 1) {
    const x = left + (right - left) * (i / samples);
    const y = getRiversideRiverCenterY(x);
    upper.push({ x, y: y - metrics.halfWidth - extraWidth });
    lower.push({ x, y: y + metrics.halfWidth + extraWidth });
  }
  return { upper, lower };
}

function traceRiversideRiverBand(extraWidth = 0) {
  const band = getRiversideRiverBandPoints(extraWidth);
  if (!band) return false;
  ctx.beginPath();
  band.upper.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  [...band.lower].reverse().forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.closePath();
  return true;
}

function drawRiversideRiver() {
  if (!getCurrentStadium().hasRiver) return;
  const metrics = getRiversideRiverMetrics();
  if (!metrics) return;
  ctx.save();

  if (traceRiversideRiverBand(50)) {
    ctx.fillStyle = "#8e6b45";
    ctx.fill();
  }
  if (traceRiversideRiverBand(32)) {
    ctx.fillStyle = "#b99160";
    ctx.fill();
  }
  if (traceRiversideRiverBand(0)) {
    const bandGradient = ctx.createLinearGradient(field.plateX, getFenceCenter().y - metrics.centerDistance - metrics.halfWidth, field.plateX, getFenceCenter().y - metrics.centerDistance + metrics.halfWidth);
    if (bandGradient?.addColorStop) {
      bandGradient.addColorStop(0, "#2e8bbb");
      bandGradient.addColorStop(0.55, "#56b3d0");
      bandGradient.addColorStop(1, "#1d6f9f");
      ctx.fillStyle = bandGradient;
    } else {
      ctx.fillStyle = "#3a9fc5";
    }
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(236, 252, 255, 0.42)";
  ctx.lineWidth = 5;
  for (let lane = -0.55; lane <= 0.6; lane += 0.38) {
    ctx.beginPath();
    for (let i = 0; i <= 26; i += 1) {
      const x = field.plateX - metrics.xSpan * 0.92 + (metrics.xSpan * 1.84 * i) / 26;
      const y = getRiversideRiverCenterY(x) + metrics.halfWidth * lane + Math.sin(i * 0.8 + lane * 4) * 7;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  for (let i = 0; i < 34; i += 1) {
    const side = i % 2 === 0 ? -1 : 1;
    const x = field.plateX - metrics.xSpan * 0.84 + (metrics.xSpan * 1.68 * i) / 33;
    const y = getRiversideRiverCenterY(x) + side * (metrics.halfWidth + 24 + (i % 3) * 8);
    ctx.fillStyle = i % 3 === 0 ? "rgba(72, 96, 58, 0.84)" : "rgba(180, 166, 126, 0.72)";
    if (i % 3 === 0) {
      ctx.beginPath();
      ctx.arc(x, y, 12 + (i % 4) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#6d4e2f";
      ctx.fillRect(x - 2, y + 8, 4, 16);
    } else {
      ctx.beginPath();
      ctx.ellipse(x, y, 7, 4, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const riverPoint = defenseState.battedBall?.riverEntryPoint;
  if (defenseState.active && riverPoint) {
    const elapsed = (performance.now() - defenseState.startTime) / 1000;
    const age = Math.max(0, elapsed - (defenseState.battedBall?.ballTime ?? 0.8));
    const alpha = clamp(1 - age / 2.2, 0, 1);
    if (alpha > 0) {
      ctx.strokeStyle = `rgba(255,255,255,${0.8 * alpha})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(riverPoint.x, riverPoint.y, 18 + age * 18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = `rgba(18, 63, 91, ${0.28 * alpha})`;
      ctx.beginPath();
      ctx.arc(riverPoint.x, riverPoint.y + age * 10, 10 + age * 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawField() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const stadium = getCurrentStadium();
  drawStadiumTurfPattern(stadium);
  drawNextDomeRoofScreen();
  drawStadiumFoulGroundDetails(field.plateY + 42);
  drawNextDomeFoulGroundDetails(field.plateY + 42);
  ctx.fillStyle = stadium.surface === "obsidian" ? getObsidianFieldFill(field.centerX, 70, 836) : stadium.surface === "seaBreezeGrass" ? "#82cf5c" : stadium.surface === "spaceGlow" ? getSpaceInfieldFill(field.centerX, 70, 836) : "#d89548";
  ctx.beginPath();
  ctx.moveTo(field.centerX, 70);
  ctx.lineTo(24, 836);
  ctx.lineTo(1256, 836);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = stadium.surface === "dirt"
    ? "rgba(255, 232, 170, 0.16)"
    : stadium.surface === "obsidian"
      ? getObsidianFieldFill(field.centerX, 754, 405)
    : stadium.surface === "seaBreezeGrass"
      ? "#82cf5c"
    : stadium.surface === "spaceGlow"
      ? getSpaceOutfieldFill(field.centerX, 754, 405)
    : stadium.surface === "royalGrass"
      ? "rgba(47, 119, 70, 0.94)"
      : "#68b560";
  ctx.beginPath();
  ctx.arc(field.centerX, 754, 405, Math.PI, Math.PI * 2);
  ctx.fill();
  drawAmericanRoyalGrassDetails(field.centerX, 754, 405);
  drawSpaceStadiumFieldLights(field.centerX, 754, 405);
  ctx.strokeStyle = "rgba(255,255,255,0.76)";
  ctx.lineWidth = 5;
  const plateTopY = field.plateY - 12 * field.plateScale;
  const plateHalfTop = 36 * field.plateScale;
  const lineEndY = 92;
  const lineDx = Math.tan(55 * Math.PI / 180) * (plateTopY - lineEndY);
  if (stadium.hasSpaceStadium) {
    drawSpaceElectricLine(field.plateX - plateHalfTop, plateTopY, field.plateX - plateHalfTop - lineDx, lineEndY, "#74fff5");
    drawSpaceElectricLine(field.plateX + plateHalfTop, plateTopY, field.plateX + plateHalfTop + lineDx, lineEndY, "#ff7ec8");
  } else {
    drawLine(field.plateX - plateHalfTop, plateTopY, field.plateX - plateHalfTop - lineDx, lineEndY);
    drawLine(field.plateX + plateHalfTop, plateTopY, field.plateX + plateHalfTop + lineDx, lineEndY);
  }
  ctx.fillStyle = stadium.surface === "obsidian" ? "rgba(10, 9, 16, 0.94)" : stadium.surface === "seaBreezeGrass" ? "#73bd51" : stadium.surface === "spaceGlow" ? "rgba(28, 34, 42, 0.92)" : "#c8793b";
  ctx.beginPath();
  ctx.ellipse(pitcher.x, pitcher.y + 18, 68, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f8f3d8";
  ctx.fillRect(field.centerX - 96, pitcher.y + 13, 192, 8);
  ctx.fillStyle = "#233047";
  ctx.fillRect(pitcher.x - 9, pitcher.y + 9, 18, 16);
}

function drawDefenseView() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const stadium = getCurrentStadium();
  drawStadiumTurfPattern(stadium);
  drawNextDomeRoofScreen();

  const camera = getDefenseCameraOffset();
  ctx.save();
  ctx.translate(camera.x, camera.y);

  drawHyperOceanBeyondOutfield();
  drawNextDomeBeyondOutfield();
  drawRiversideBeyondOutfield();
  drawSpaceStadiumBeyondOutfield();
  drawHomeRunVisionBeyondOutfield();
  drawMStadiumBeyondOutfield();
  drawShiokazeParkBeyondOutfield();
  drawAozoraRuralBeyondOutfield();
  drawStadiumFoulGroundDetails(field.plateY + 42);
  drawNextDomeFoulGroundDetails(field.plateY + 42);

  ctx.fillStyle = stadium.surface === "obsidian" ? getObsidianFieldFill(field.plateX, defenseField.foulLineTopY, field.plateY + 42) : stadium.surface === "seaBreezeGrass" ? "#82cf5c" : stadium.surface === "spaceGlow" ? getSpaceInfieldFill(field.plateX, defenseField.foulLineTopY, field.plateY + 42) : "#d89548";
  ctx.beginPath();
  ctx.moveTo(field.plateX, field.plateY + 42);
  ctx.lineTo(defenseField.foulLineInset, defenseField.foulLineTopY);
  ctx.lineTo(canvas.width - defenseField.foulLineInset, defenseField.foulLineTopY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = stadium.surface === "dirt"
    ? "rgba(255, 235, 174, 0.14)"
    : stadium.surface === "obsidian"
      ? getObsidianFieldFill(field.plateX, field.plateY + 42, defenseField.grassRadius)
    : stadium.surface === "seaBreezeGrass"
      ? "#82cf5c"
    : stadium.surface === "spaceGlow"
      ? getSpaceOutfieldFill(field.plateX, field.plateY + 42, defenseField.grassRadius)
    : stadium.surface === "royalGrass"
      ? "rgba(45, 116, 67, 0.94)"
      : "#6ebf69";
  ctx.beginPath();
  ctx.arc(field.plateX, field.plateY + 42, defenseField.grassRadius, Math.PI, Math.PI * 2);
  ctx.fill();
  drawRealisticFieldDetails(stadium, field.plateX, field.plateY + 42);
  drawAmericanRoyalGrassDetails(field.plateX, field.plateY + 42, defenseField.grassRadius);
  drawSpaceStadiumFieldLights(field.plateX, field.plateY + 42, defenseField.grassRadius);
  drawAmericanRoyalBeyondOutfield();

  ctx.strokeStyle = "rgba(255,255,255,0.78)";
  ctx.lineWidth = 5;
  drawLine(field.plateX, field.plateY + 42, defenseField.foulLineInset, defenseField.foulLineTopY);
  drawLine(field.plateX, field.plateY + 42, canvas.width - defenseField.foulLineInset, defenseField.foulLineTopY);
  drawDefenseBases();

  ctx.strokeStyle = "rgba(35,48,71,0.28)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(field.plateX, field.plateY + 42, defenseField.fenceDistance, Math.PI, Math.PI * 2);
  ctx.stroke();
  drawOutfieldWall();

  drawDefenseTarget();
  drawHomeRunFireworks();
  drawGrounderBounceMarks();
  drawPostLandingBounceMarker();
  drawLandingImpactMarker();
  drawThrowPath();
  drawFielderCatchRanges();
  drawDefenseFielders();
  drawDefenseBaseRunners();
  drawBatterRunner();
  drawBallTrail();
  drawBall();
  drawDefenseCatchEffect();
  drawDefenseLandingMissEffect();
  drawFieldingErrorEffect();
  ctx.restore();
}

function drawHomeRunFireworks() {
  const fireworks = defenseState.homeRunFireworks;
  if (!defenseState.active || !fireworks) return;
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000 - fireworks.startDelay;
  if (elapsedSeconds < 0 || elapsedSeconds > fireworks.duration + 0.65) return;

  ctx.save();
  ctx.lineCap = "round";
  fireworks.bursts.forEach((burst) => {
    const age = elapsedSeconds - burst.delay;
    if (age < 0 || age > 1.08) return;
    const progress = clamp(age / 1.08, 0, 1);
    const alpha = 1 - progress;
    const rise = 42 + progress * 82;
    const camera = burst.screenLocked ? getDefenseCameraOffset() : { x: 0, y: 0 };
    const x = burst.origin.x - camera.x;
    const y = burst.origin.y - camera.y - rise;

    ctx.strokeStyle = `rgba(255, 255, 255, ${0.28 * alpha})`;
    ctx.lineWidth = 4;
    drawLine(x, y + 52, x, y - 14);

    burst.sparks.forEach((spark) => {
      const sx = x + spark.x * progress;
      const sy = y + spark.y * progress + progress * progress * 42;
      ctx.strokeStyle = hexToRgba(burst.color, 0.95 * alpha);
      ctx.lineWidth = spark.size;
      drawLine(
        sx - spark.x * 0.11 * (1 - progress),
        sy - spark.y * 0.11 * (1 - progress),
        sx,
        sy
      );
    });

    ctx.fillStyle = hexToRgba("#ffffff", 0.58 * alpha);
    ctx.beginPath();
    ctx.arc(x, y, 18 + progress * 36, 0, Math.PI * 2);
    ctx.fill();
  });
  drawSpaceHomeRunRockets(fireworks, elapsedSeconds);
  drawMStadiumHomeRunRocket(fireworks, elapsedSeconds);
  drawBoatCatchHomeRunEffect(fireworks, elapsedSeconds);
  drawAozoraHomeRunTrains(fireworks, elapsedSeconds);
  ctx.restore();
}

function drawAozoraHomeRunTrains(fireworks, elapsedSeconds) {
  const trains = fireworks?.trains || [];
  if (!trains.length) return;
  trains.forEach((train) => {
    const age = elapsedSeconds - train.delay;
    if (age < 0 || age > train.duration + 0.4) return;
    const progress = clamp(age / train.duration, 0, 1);
    const ease = progress * progress * (3 - 2 * progress);
    const x = train.startX + (train.endX - train.startX) * ease;
    const alpha = age > train.duration ? 1 - clamp((age - train.duration) / 0.4, 0, 1) : 1;
    drawAozoraColorTrain(x, train.y, train.direction, train.colors, alpha);
  });
}

function drawAozoraColorTrain(x, y, direction = 1, colors = ["#ff6f61", "#fff07a", "#74fff5"], alpha = 1) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.translate(x, y);
  ctx.scale(direction, 1);
  ctx.strokeStyle = "rgba(92, 73, 48, 0.82)";
  ctx.lineWidth = 5;
  drawLine(-150, 34, 190, 34);
  drawLine(-150, 46, 190, 46);
  for (let car = 0; car < 4; car += 1) {
    const cx = -132 + car * 78;
    ctx.fillStyle = colors[car % colors.length];
    roundRect(cx, -18, 70, 44, 9);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    for (let w = 0; w < 3; w += 1) {
      roundRect(cx + 10 + w * 18, -8, 12, 13, 3);
      ctx.fill();
    }
    ctx.fillStyle = "#3b3c42";
    ctx.beginPath();
    ctx.arc(cx + 14, 29, 7, 0, Math.PI * 2);
    ctx.arc(cx + 54, 29, 7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#ffe28a";
  ctx.beginPath();
  ctx.arc(186, 2, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSpaceHomeRunRockets(fireworks, elapsedSeconds) {
  const rockets = fireworks?.rockets || [];
  if (!rockets.length) return;
  rockets.forEach((rocket) => {
    const age = elapsedSeconds - rocket.delay;
    if (age < 0 || age > rocket.duration + 0.7) return;
    const progress = clamp(age / rocket.duration, 0, 1);
    const ease = 1 - Math.pow(1 - progress, 2.4);
    const arc = Math.sin(progress * Math.PI) * rocket.wobble;
    const x = rocket.start.x + (rocket.end.x - rocket.start.x) * ease + arc;
    const y = rocket.start.y + (rocket.end.y - rocket.start.y) * ease - Math.sin(progress * Math.PI) * 120;
    const prevProgress = clamp((age - 0.08) / rocket.duration, 0, 1);
    const prevEase = 1 - Math.pow(1 - prevProgress, 2.4);
    const prevArc = Math.sin(prevProgress * Math.PI) * rocket.wobble;
    const px = rocket.start.x + (rocket.end.x - rocket.start.x) * prevEase + prevArc;
    const py = rocket.start.y + (rocket.end.y - rocket.start.y) * prevEase - Math.sin(prevProgress * Math.PI) * 120;
    const alpha = age > rocket.duration ? 1 - clamp((age - rocket.duration) / 0.7, 0, 1) : 1;
    const angle = Math.atan2(y - py, x - px);

    ctx.strokeStyle = hexToRgba(rocket.color, 0.72 * alpha);
    ctx.lineWidth = 8;
    drawLine(px, py, x, y);
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * alpha})`;
    ctx.lineWidth = 3;
    drawLine(px - Math.cos(angle) * 18, py - Math.sin(angle) * 18, x, y);

    drawSpaceCartoonRocket(x, y, angle, alpha, rocket.size ?? 1);

    if (progress >= 0.98) {
      const burstAge = age - rocket.duration;
      const burstAlpha = 1 - clamp(burstAge / 0.7, 0, 1);
      ctx.strokeStyle = hexToRgba(rocket.color, 0.86 * burstAlpha);
      ctx.lineWidth = 4;
      for (let i = 0; i < 8; i += 1) {
        const burstAngle = (Math.PI * 2 * i) / 8 + burstAge;
        const length = 30 + burstAge * 96;
        drawLine(x, y, x + Math.cos(burstAngle) * length, y + Math.sin(burstAngle) * length);
      }
    }
  });
}

function drawSpaceCartoonRocket(x, y, angle, alpha = 1, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.globalAlpha = alpha;

  const flame = ctx.createLinearGradient(-74, 0, -130, 0);
  if (flame?.addColorStop) {
    flame.addColorStop(0, "#fff36d");
    flame.addColorStop(0.5, "#ff9f3a");
    flame.addColorStop(1, "#ff6f2c");
    ctx.fillStyle = flame;
  } else {
    ctx.fillStyle = "#ff9f3a";
  }
  ctx.beginPath();
  ctx.moveTo(-64, -18);
  ctx.lineTo(-118, -36);
  ctx.lineTo(-101, -14);
  ctx.lineTo(-136, 0);
  ctx.lineTo(-101, 14);
  ctx.lineTo(-118, 36);
  ctx.lineTo(-64, 18);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#d8d5cb";
  ctx.strokeStyle = "#703221";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-52, -20);
  ctx.lineTo(-84, -36);
  ctx.lineTo(-74, -6);
  ctx.lineTo(-52, 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-52, 20);
  ctx.lineTo(-84, 36);
  ctx.lineTo(-74, 6);
  ctx.lineTo(-52, -4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ef5757";
  ctx.beginPath();
  ctx.moveTo(-12, -34);
  ctx.quadraticCurveTo(-62, -62, -78, -18);
  ctx.lineTo(-35, -10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-12, 34);
  ctx.quadraticCurveTo(-62, 62, -78, 18);
  ctx.lineTo(-35, 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fff5e6";
  ctx.beginPath();
  ctx.moveTo(-64, -28);
  ctx.quadraticCurveTo(-10, -68, 58, -28);
  ctx.quadraticCurveTo(92, -8, 98, 0);
  ctx.quadraticCurveTo(92, 8, 58, 28);
  ctx.quadraticCurveTo(-10, 68, -64, 28);
  ctx.quadraticCurveTo(-38, 0, -64, -28);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f45b5b";
  ctx.beginPath();
  ctx.moveTo(58, -28);
  ctx.quadraticCurveTo(92, -8, 98, 0);
  ctx.quadraticCurveTo(92, 8, 58, 28);
  ctx.quadraticCurveTo(72, 0, 58, -28);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#aee7ff";
  ctx.strokeStyle = "#703221";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(16, 0, 17, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.beginPath();
  ctx.arc(9, -6, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = "rgba(255, 242, 168, 0.64)";
  ctx.lineWidth = 8;
  drawLine(-116, 0, -174, 0);
  ctx.restore();
}

function drawMStadiumHomeRunRocket(fireworks, elapsedSeconds) {
  const rocket = fireworks?.mStadiumRocket;
  if (!rocket) return;
  const age = elapsedSeconds - rocket.delay;
  if (age < 0 || age > rocket.duration + rocket.endingDuration) return;
  drawMStadiumLaunchPad(rocket.start.x, rocket.start.y, clamp(1 - age / 4.2, 0, 1));
  if (age <= rocket.duration + 0.25) {
    const progress = clamp(age / rocket.duration, 0, 1);
    const ease = 1 - Math.pow(1 - progress, 2.1);
    const drift = Math.sin(progress * Math.PI * 2.2 + rocket.smokeSeed) * (1 - progress) * 9;
    const x = rocket.start.x + (rocket.end.x - rocket.start.x) * ease + drift;
    const y = rocket.start.y + (rocket.end.y - rocket.start.y) * ease;
    const alpha = age > rocket.duration ? 1 - clamp((age - rocket.duration) / 0.25, 0, 1) : 1;
    drawMStadiumRocketPlume(x, y, rocket.start.y, progress, alpha);
    drawMStadiumPhotoRocket(x, y, alpha, 1 + progress * 0.12);
  }
  const endingAge = age - rocket.duration;
  if (endingAge >= 0) drawMStadiumHomeRunEnding(rocket, endingAge);
}

function drawMStadiumLaunchPad(x, y, alpha = 1) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.strokeStyle = "rgba(22, 22, 28, 0.88)";
  ctx.lineWidth = 6;
  drawLine(x - 88, y + 12, x + 88, y + 12);
  drawLine(x - 58, y + 12, x - 28, y - 94);
  drawLine(x + 58, y + 12, x + 28, y - 94);
  drawLine(x - 28, y - 94, x + 28, y - 94);
  ctx.strokeStyle = "rgba(188, 180, 205, 0.34)";
  ctx.lineWidth = 3;
  drawLine(x - 44, y - 34, x + 44, y - 34);
  drawLine(x - 36, y - 64, x + 36, y - 64);
  ctx.restore();
}

function drawMStadiumRocketPlume(x, y, groundY, progress, alpha = 1) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const flameLength = 92 + progress * 72;
  const flame = ctx.createLinearGradient(x, y + 34, x, y + flameLength);
  if (flame?.addColorStop) {
    flame.addColorStop(0, `rgba(255, 255, 248, ${0.96 * alpha})`);
    flame.addColorStop(0.32, `rgba(255, 220, 97, ${0.9 * alpha})`);
    flame.addColorStop(0.72, `rgba(255, 123, 48, ${0.72 * alpha})`);
    flame.addColorStop(1, `rgba(255, 87, 35, ${0.05 * alpha})`);
    ctx.fillStyle = flame;
  } else {
    ctx.fillStyle = `rgba(255, 202, 84, ${0.86 * alpha})`;
  }
  ctx.beginPath();
  ctx.moveTo(x - 20, y + 36);
  ctx.quadraticCurveTo(x - 34, y + flameLength * 0.48, x - 10, y + flameLength);
  ctx.lineTo(x + 10, y + flameLength);
  ctx.quadraticCurveTo(x + 34, y + flameLength * 0.48, x + 20, y + 36);
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
  for (let i = 0; i < 18; i += 1) {
    const spread = 34 + progress * 120 + (i % 5) * 12;
    const sx = x + Math.cos(i * 1.7) * spread * (0.34 + (i % 4) * 0.12);
    const sy = groundY + 18 + Math.sin(i * 1.15) * 18 + (i % 3) * 8;
    const radius = 24 + progress * 42 + (i % 6) * 5;
    ctx.fillStyle = `rgba(238, 236, 229, ${0.34 * alpha * (1 - progress * 0.28)})`;
    ctx.beginPath();
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawMStadiumPhotoRocket(x, y, alpha = 1, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.globalAlpha *= alpha;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.fillStyle = "#f1f0eb";
  ctx.strokeStyle = "rgba(28, 30, 36, 0.78)";
  ctx.lineWidth = 3.5;
  roundRect(-12, -116, 24, 144, 9);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#d9dde2";
  ctx.beginPath();
  ctx.moveTo(-11, -112);
  ctx.quadraticCurveTo(0, -148, 11, -112);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#14151b";
  roundRect(-13, -46, 26, 42, 3);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  roundRect(-9, -88, 18, 28, 4);
  ctx.fill();

  ctx.fillStyle = "#e8e4da";
  ctx.beginPath();
  ctx.moveTo(-12, 18);
  ctx.lineTo(-30, 46);
  ctx.lineTo(-14, 44);
  ctx.lineTo(-4, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(12, 18);
  ctx.lineTo(30, 46);
  ctx.lineTo(14, 44);
  ctx.lineTo(4, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = `rgba(255, 245, 170, ${0.7 * alpha})`;
  ctx.beginPath();
  ctx.arc(0, 42, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMStadiumHomeRunEnding(rocket, endingAge) {
  const duration = rocket.endingDuration ?? 3.4;
  const progress = clamp(endingAge / duration, 0, 1);
  const fadeIn = clamp(endingAge / 0.55, 0, 1);
  const fadeOut = 1 - clamp((endingAge - duration + 0.7) / 0.7, 0, 1);
  const alpha = Math.min(fadeIn, fadeOut);
  if (alpha <= 0) return;
  const camera = getDefenseCameraOffset();
  const screenCenterX = canvas.width / 2 - camera.x;
  const screenBaseY = canvas.height * 0.76 - camera.y;
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.fillStyle = "rgba(5, 5, 10, 0.58)";
  roundRect(screenCenterX - 410, screenBaseY - 136, 820, 188, 12);
  ctx.fill();
  ctx.fillStyle = "#f3f0ff";
  ctx.strokeStyle = "rgba(18, 16, 28, 0.88)";
  ctx.lineWidth = 4;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const yOffset = 42 - progress * 74;
  (rocket.lines || []).forEach((line, index) => {
    const y = screenBaseY - 66 + index * 45 + yOffset;
    ctx.font = index === 0 ? "bold 28px sans-serif" : "bold 23px sans-serif";
    ctx.strokeText(line, screenCenterX, y);
    ctx.fillText(line, screenCenterX, y);
  });
  ctx.restore();
}

function drawBoatCatchHomeRunEffect(fireworks, elapsedSeconds) {
  const boatCatch = fireworks?.boatCatch;
  if (!boatCatch) return;
  const catchMoment = (boatCatch.startTime ?? 0.8) + (boatCatch.travelDuration ?? 1.2);
  const age = elapsedSeconds - catchMoment;
  if (age < 0 || age > 2.6) return;
  const alpha = 1 - age / 2.6;
  const x = boatCatch.x ?? boatCatch.ballX;
  const y = boatCatch.y ?? boatCatch.ballY;
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = `rgba(174, 231, 255, ${0.9 * alpha})`;
  ctx.lineWidth = 7;
  for (let i = 0; i < 10; i += 1) {
    const angle = (Math.PI * 2 * i) / 10 + age * 1.6;
    const inner = 18 + age * 22;
    const outer = 64 + age * 82 + (i % 2) * 24;
    drawLine(
      x + Math.cos(angle) * inner,
      y + Math.sin(angle) * inner,
      x + Math.cos(angle) * outer,
      y + Math.sin(angle) * outer
    );
  }
  ctx.strokeStyle = `rgba(255, 242, 168, ${0.9 * alpha})`;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(x, y, 40 + age * 78, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = `rgba(255, 255, 255, ${0.38 * alpha})`;
  ctx.beginPath();
  ctx.arc(x, y, 24 + age * 58, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * alpha})`;
  ctx.font = "bold 26px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("CATCH!", x, y - 96 - age * 18);
  ctx.restore();
}

function drawDefenseCatchEffect() {
  const outcome = defenseState.outcome;
  // 落球は捕球エフェクトを出さない (弾いたのに捕った演出が重なると紛らわしい)
  if (!defenseState.active || !outcome?.caught || outcome.fieldingError || outcome.droppedBall) return;
  const catchVisual = defenseState.catchVisual;
  const fieldingTime = Math.max(
    0.1,
    catchVisual?.startTime ?? outcome.fieldingTime ?? defenseState.battedBall?.ballTime ?? 1
  );
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  const age = elapsedSeconds - fieldingTime;
  const noBounceCatch = isNoBounceDefenseCatch(outcome, defenseState.battedBall);
  const duration = noBounceCatch ? 0.46 : 0.58;
  if (age < 0 || age > duration) return;
  const point = catchVisual?.point || outcome.fieldingPoint || defenseState.target;
  if (!point) return;
  const progress = clamp(age / duration, 0, 1);
  const alpha = Math.pow(1 - progress, 1.35);
  if (noBounceCatch && catchVisual?.catchRadius > 0) {
    const circleAlpha = clamp(1 - age / 0.18, 0, 1);
    if (circleAlpha > 0) {
      ctx.save();
      ctx.strokeStyle = `rgba(190, 238, 244, ${0.18 * circleAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(catchVisual.point.x, catchVisual.point.y, catchVisual.catchRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }
  if (!noBounceCatch) {
    drawSimpleDefensePickupEffect(point, progress, alpha);
    return;
  }
  const effectPoint = {
    x: catchVisual?.toX ?? point.x,
    y: catchVisual?.toY ?? point.y - 32
  };
  const edgeCatch = (catchVisual?.edgeCatchRatio ?? 0) >= 0.78;
  const ringRadius = 10 + progress * (edgeCatch ? 29 : 23);
  const glowRadius = 13 + progress * 8;
  const particleCount = edgeCatch ? 12 : 9;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const glow = ctx.createRadialGradient(
    effectPoint.x,
    effectPoint.y,
    0,
    effectPoint.x,
    effectPoint.y,
    glowRadius
  );
  glow.addColorStop(0, `rgba(255, 255, 255, ${0.52 * alpha})`);
  glow.addColorStop(0.45, edgeCatch
    ? `rgba(255, 225, 145, ${0.26 * alpha})`
    : `rgba(188, 239, 255, ${0.24 * alpha})`);
  glow.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(effectPoint.x, effectPoint.y, glowRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = edgeCatch
    ? `rgba(255, 225, 145, ${0.78 * alpha})`
    : `rgba(215, 247, 255, ${0.72 * alpha})`;
  ctx.lineWidth = edgeCatch ? 2.5 : 2;
  ctx.beginPath();
  ctx.arc(effectPoint.x, effectPoint.y, ringRadius, 0, Math.PI * 2);
  ctx.stroke();

  for (let index = 0; index < particleCount; index += 1) {
    const angle = (Math.PI * 2 * index) / particleCount + 0.24;
    const distance = 7 + progress * (edgeCatch ? 31 : 24) + (index % 3) * 2;
    const particleRadius = Math.max(0.8, (edgeCatch ? 2.4 : 2) * (1 - progress * 0.55));
    ctx.fillStyle = index % 2 === 0
      ? `rgba(255, 255, 255, ${0.82 * alpha})`
      : edgeCatch
      ? `rgba(255, 218, 126, ${0.76 * alpha})`
      : `rgba(164, 235, 255, ${0.7 * alpha})`;
    ctx.beginPath();
    ctx.arc(
      effectPoint.x + Math.cos(angle) * distance,
      effectPoint.y + Math.sin(angle) * distance,
      particleRadius,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  ctx.restore();
}

function drawDefenseLandingMissEffect() {
  const visual = defenseState.landingMissVisual;
  if (!defenseState.active || !visual || defenseState.unifiedCircleCatchComplete) return;
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  const age = elapsedSeconds - visual.startTime;
  const duration = 0.9;
  if (age < 0 || age > duration) return;
  const progress = clamp(age / duration, 0, 1);
  const alpha = 1 - progress;
  const impactRadius = 18 + progress * 54;

  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = `rgba(255, 184, 92, ${0.96 * alpha})`;
  ctx.fillStyle = `rgba(216, 104, 58, ${0.18 * alpha})`;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(visual.point.x, visual.point.y, impactRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  for (let index = 0; index < 6; index += 1) {
    const angle = Math.PI * 2 * index / 6 + 0.18;
    const inner = impactRadius + 6;
    const outer = inner + 14 + progress * 12;
    drawLine(
      visual.point.x + Math.cos(angle) * inner,
      visual.point.y + Math.sin(angle) * inner,
      visual.point.x + Math.cos(angle) * outer,
      visual.point.y + Math.sin(angle) * outer
    );
  }

  if (visual.fielderPoint && visual.catchRadius > 0) {
    ctx.strokeStyle = `rgba(255, 118, 92, ${0.82 * alpha})`;
    ctx.fillStyle = `rgba(255, 118, 92, ${0.06 * alpha})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(visual.fielderPoint.x, visual.fielderPoint.y, visual.catchRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    const dx = visual.point.x - visual.fielderPoint.x;
    const dy = visual.point.y - visual.fielderPoint.y;
    const distance = Math.hypot(dx, dy) || 1;
    const edgeX = visual.fielderPoint.x + dx / distance * visual.catchRadius;
    const edgeY = visual.fielderPoint.y + dy / distance * visual.catchRadius;
    ctx.setLineDash([8, 7]);
    ctx.strokeStyle = `rgba(255, 242, 168, ${0.76 * alpha})`;
    ctx.lineWidth = 3;
    drawLine(edgeX, edgeY, visual.point.x, visual.point.y);
    ctx.setLineDash([]);
  }
  ctx.restore();
}

function isNoBounceDefenseCatch(outcome, battedBall) {
  if (!outcome?.caught || !battedBall || battedBall.isGrounder || outcome.postLandingPickup) return false;
  if (defenseState.catchVisual?.caughtInAir) return true;
  if (/バウンド|ゴロ処理|捕球処理/.test(outcome.label || "")) return false;
  const fieldingTime = outcome.fieldingTime ?? Number.POSITIVE_INFINITY;
  const firstLandingTime = battedBall.ballTime ?? 0;
  return fieldingTime <= firstLandingTime + 0.08;
}

function drawSimpleDefensePickupEffect(point, progress, alpha) {
  const radius = 14 + progress * 24;
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = `rgba(174, 231, 255, ${0.72 * alpha})`;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = `rgba(255, 255, 255, ${0.26 * alpha})`;
  ctx.beginPath();
  ctx.arc(point.x, point.y, 9 + progress * 8, 0, Math.PI * 2);
  ctx.fill();
  for (let i = 0; i < 4; i += 1) {
    const angle = (Math.PI * 2 * i) / 4 + Math.PI / 4;
    const inner = radius + 4;
    const outer = inner + 9 + progress * 8;
    drawLine(
      point.x + Math.cos(angle) * inner,
      point.y + Math.sin(angle) * inner,
      point.x + Math.cos(angle) * outer,
      point.y + Math.sin(angle) * outer
    );
  }
  ctx.restore();
}

// 落球でもこのエフェクトを出す。記録上のエラーにはしないが、
// 「弾いた」ことが見て分かるようにする。
function drawFieldingErrorEffect() {
  const outcome = defenseState.outcome;
  if (!defenseState.active || (!outcome?.fieldingError && !outcome?.droppedBall)) return;
  const effectStartTime = outcome.droppedBall && Number.isFinite(outcome.dropTime)
    ? outcome.dropTime
    : outcome.fieldingTime;
  const fieldingTime = Math.max(0.1, effectStartTime ?? defenseState.battedBall?.ballTime ?? 1);
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  const age = elapsedSeconds - fieldingTime;
  const duration = 1.3;
  if (age < 0 || age > duration) return;
  const point = outcome.errorPoint || outcome.fieldingPoint || defenseState.target;
  if (!point) return;
  const progress = clamp(age / duration, 0, 1);
  const alpha = 1 - progress;
  const shakeX = Math.sin(age * 48) * 4 * alpha;
  const shakeY = Math.cos(age * 39) * 3 * alpha;
  const x = point.x + shakeX;
  const y = point.y + shakeY;
  ctx.save();
  ctx.lineCap = "round";
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = `rgba(255, 70, 78, ${0.98 * alpha})`;
  ctx.fillStyle = `rgba(255, 111, 97, ${0.42 * alpha})`;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(x, y, 22 + progress * 72, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = `rgba(255, 242, 168, ${0.92 * alpha})`;
  ctx.lineWidth = 5;
  for (let i = 0; i < 10; i += 1) {
    const angle = (Math.PI * 2 * i) / 10 - progress * 0.28;
    const inner = 32 + progress * 34;
    const outer = inner + 30 + (i % 2) * 18;
    drawLine(
      x + Math.cos(angle) * inner,
      y + Math.sin(angle) * inner,
      x + Math.cos(angle) * outer,
      y + Math.sin(angle) * outer
    );
  }

  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = `rgba(72, 12, 22, ${0.92 * alpha})`;
  ctx.lineWidth = 7;
  drawLine(x - 30, y - 24, x + 30, y + 24);
  drawLine(x + 30, y - 24, x - 30, y + 24);
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.96 * alpha})`;
  ctx.lineWidth = 3;
  drawLine(x - 30, y - 24, x + 30, y + 24);
  drawLine(x + 30, y - 24, x - 30, y + 24);

  ctx.strokeStyle = `rgba(72, 12, 22, ${0.92 * alpha})`;
  ctx.lineWidth = 6;
  ctx.fillStyle = `rgba(255, 255, 255, ${0.98 * alpha})`;
  ctx.font = "bold 26px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeText("エラー!", x, y - 76 - progress * 26);
  ctx.fillText("エラー!", x, y - 76 - progress * 26);
  ctx.restore();
}

function hexToRgba(hex, alpha) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

function drawDefenseBases() {
  const { home, first, second, third } = defenseField.bases;
  if (getCurrentStadium().hasSpaceStadium) {
    drawSpaceStadiumBases(home, first, second, third);
    return;
  }
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.lineWidth = 4;
  drawLine(first.x, first.y, second.x, second.y);
  drawLine(second.x, second.y, third.x, third.y);

  drawBaseDiamond(home.x, home.y, "H", "#fff8df");
  drawBaseDiamond(first.x, first.y, "1", "#fff8df");
  drawBaseDiamond(second.x, second.y, "2", "#fff8df");
  drawBaseDiamond(third.x, third.y, "3", "#fff8df");
  ctx.restore();
}

function drawSpaceElectricLine(x1, y1, x2, y2, color = "#74fff5") {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = hexToRgba(color, 0.065);
  ctx.lineWidth = 13;
  drawLine(x1, y1, x2, y2);
  ctx.strokeStyle = hexToRgba(color, 0.3);
  ctx.lineWidth = 4;
  drawLine(x1, y1, x2, y2);
  ctx.strokeStyle = "rgba(210, 235, 245, 0.36)";
  ctx.lineWidth = 1.2;
  drawLine(x1, y1, x2, y2);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.max(1, Math.hypot(dx, dy));
  const nx = -dy / length;
  const ny = dx / length;
  const palette = ["#74fff5", "#fff07a", "#ff7ec8", "#9f83ff"];
  for (let i = 0; i <= length; i += 46) {
    const t = i / length;
    const x = x1 + dx * t + nx * ((i / 46) % 2 === 0 ? 7 : -7);
    const y = y1 + dy * t + ny * ((i / 46) % 2 === 0 ? 7 : -7);
    ctx.fillStyle = hexToRgba(palette[Math.floor(i / 46) % palette.length], 0.28);
    ctx.beginPath();
    ctx.arc(x, y, 2.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawSpaceStadiumBases(home, first, second, third) {
  ctx.save();
  [
    [home, first],
    [first, second],
    [second, third],
    [third, home]
  ].forEach(([from, to], index) => {
    const colors = ["#74fff5", "#fff07a", "#ff7ec8", "#9f83ff"];
    drawSpaceElectricLine(from.x, from.y, to.x, to.y, colors[index % colors.length]);
  });
  drawSpaceBaseDiamond(home.x, home.y, "H", 0);
  drawSpaceBaseDiamond(first.x, first.y, "1", 1);
  drawSpaceBaseDiamond(second.x, second.y, "2", 2);
  drawSpaceBaseDiamond(third.x, third.y, "3", 3);
  ctx.restore();
}

function drawSpaceBaseDiamond(x, y, label, index) {
  const colors = ["#74fff5", "#fff07a", "#ff7ec8", "#9f83ff", "#ff6f61"];
  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  colors.forEach((color, colorIndex) => {
    const angle = (Math.PI * 2 * colorIndex) / colors.length + index * 0.45;
    ctx.fillStyle = hexToRgba(color, 0.22);
    ctx.beginPath();
    ctx.arc(x + Math.cos(angle) * 20, y + Math.sin(angle) * 20, 3.2, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);
  const glow = ctx.createLinearGradient(-18, -18, 18, 18);
  if (glow?.addColorStop) {
    glow.addColorStop(0, "#27303c");
    glow.addColorStop(0.36, hexToRgba(colors[index % colors.length], 0.44));
    glow.addColorStop(0.72, "#111821");
    glow.addColorStop(1, "#303846");
    ctx.fillStyle = glow;
  } else {
    ctx.fillStyle = "#1b2430";
  }
  ctx.shadowColor = colors[index % colors.length];
  ctx.shadowBlur = 7;
  ctx.fillRect(-17, -17, 34, 34);
  ctx.strokeStyle = "rgba(210, 232, 242, 0.55)";
  ctx.lineWidth = 2;
  ctx.strokeRect(-17, -17, 34, 34);
  ctx.restore();

  ctx.fillStyle = "#d7edf4";
  ctx.font = "bold 15px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y + 1);
}

function drawBaseDiamond(x, y, label, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = color;
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 3;
  ctx.fillRect(-13, -13, 26, 26);
  ctx.strokeRect(-13, -13, 26, 26);
  ctx.restore();

  ctx.fillStyle = "#233047";
  ctx.font = "bold 13px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y + 1);
}

function drawOutfieldWall() {
  const homeY = field.plateY + 42;
  const wallHeight = defenseField.fenceHeight;
  const stadium = getCurrentStadium();
  const lowFence = stadium.id === "aozora" || stadium.id === "riverside";
  const royalWall = stadium.royalEnclosed === true;
  const spaceWall = stadium.hasSpaceStadium === true;
  ctx.save();

  ctx.strokeStyle = royalWall ? "rgba(5, 14, 20, 0.58)" : spaceWall ? "rgba(1, 8, 20, 0.72)" : "rgba(18, 34, 47, 0.32)";
  ctx.lineWidth = lowFence ? 36 : royalWall ? 94 : spaceWall ? 82 : 70;
  ctx.beginPath();
  ctx.arc(field.plateX, homeY + 18, defenseField.fenceDistance + 12, Math.PI, Math.PI * 2);
  ctx.stroke();

  if (royalWall) {
    drawAmericanRoyalWoodFence(homeY, wallHeight);
    ctx.restore();
    return;
  }

  ctx.strokeStyle = lowFence ? "#587b5e" : royalWall ? "#183d38" : spaceWall ? "#092332" : "#254b55";
  ctx.lineWidth = lowFence ? 28 : royalWall ? 78 : spaceWall ? 66 : 58;
  ctx.beginPath();
  ctx.arc(field.plateX, homeY, defenseField.fenceDistance, Math.PI, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = lowFence ? "#33543e" : royalWall ? "#0c2928" : spaceWall ? "#061423" : "#173340";
  ctx.lineWidth = lowFence ? 10 : royalWall ? 30 : spaceWall ? 24 : 22;
  ctx.beginPath();
  ctx.arc(field.plateX, homeY + 18, defenseField.fenceDistance, Math.PI, Math.PI * 2);
  ctx.stroke();

  for (let layer = 0; layer <= 5; layer += 1) {
    const t = layer / 5;
    ctx.strokeStyle = royalWall
      ? `rgba(30, 79, 67, ${0.5 - t * 0.045})`
      : spaceWall
        ? `rgba(106, 255, 247, ${0.28 - t * 0.025})`
      : `rgba(37, 75, 85, ${0.34 - t * 0.035})`;
    ctx.lineWidth = royalWall ? 18 : 12;
    ctx.beginPath();
    ctx.arc(field.plateX, homeY - wallHeight * t, defenseField.fenceDistance, Math.PI, Math.PI * 2);
    ctx.stroke();
  }

  ctx.strokeStyle = lowFence ? "#f4dc7b" : royalWall ? "#d8bb68" : spaceWall ? "#7dfff2" : "#7fc7b0";
  ctx.lineWidth = lowFence ? 6 : royalWall ? 13 : spaceWall ? 11 : 9;
  ctx.beginPath();
  ctx.arc(field.plateX, homeY - wallHeight, defenseField.fenceDistance, Math.PI, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = royalWall ? "rgba(255, 232, 157, 0.94)" : spaceWall ? "rgba(255, 230, 120, 0.9)" : "rgba(255, 240, 184, 0.8)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(field.plateX, homeY - wallHeight - 10, defenseField.fenceDistance - 2, Math.PI, Math.PI * 2);
  ctx.stroke();

  for (let angle = 185; angle <= 355; angle += 17) {
    const rad = degreesToRadians(angle);
    const x = field.plateX + Math.cos(rad) * defenseField.fenceDistance;
    const y = homeY + Math.sin(rad) * defenseField.fenceDistance;
    ctx.strokeStyle = lowFence ? "#38563f" : royalWall ? "#071d1e" : spaceWall ? "#03101f" : "#102833";
    ctx.lineWidth = lowFence ? 5 : royalWall ? 11 : spaceWall ? 9 : 8;
    drawLine(x, y - wallHeight - 14, x, y + 24);
    ctx.strokeStyle = "rgba(255, 240, 184, 0.55)";
    ctx.lineWidth = 2;
    drawLine(x - 3, y - wallHeight - 8, x - 3, y + 18);
  }
  ctx.restore();
}

function drawAmericanRoyalWoodFence(homeY, wallHeight) {
  const radius = defenseField.fenceDistance;
  const baseY = homeY;
  const topY = homeY - wallHeight;
  const woodLayers = [
    { t: 0.08, color: "#3b2415", width: 78 },
    { t: 0.28, color: "#5b351c", width: 74 },
    { t: 0.48, color: "#6e4324", width: 70 },
    { t: 0.68, color: "#4f2e19", width: 66 },
    { t: 0.88, color: "#7a4b28", width: 62 }
  ];

  ctx.save();
  for (const layer of woodLayers) {
    const y = baseY - wallHeight * layer.t;
    ctx.strokeStyle = layer.color;
    ctx.lineWidth = layer.width;
    ctx.beginPath();
    ctx.arc(field.plateX, y, radius, Math.PI, Math.PI * 2);
    ctx.stroke();
  }

  for (let grain = 0; grain < 7; grain += 1) {
    const t = 0.1 + grain * 0.13;
    const y = baseY - wallHeight * t;
    ctx.strokeStyle = grain % 2 === 0 ? "rgba(235, 169, 88, 0.34)" : "rgba(42, 22, 12, 0.28)";
    ctx.lineWidth = grain % 2 === 0 ? 4 : 3;
    ctx.beginPath();
    ctx.arc(field.plateX, y + Math.sin(grain) * 5, radius + (grain % 3) * 3 - 3, Math.PI, Math.PI * 2);
    ctx.stroke();
  }

  ctx.strokeStyle = "#2c190f";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(field.plateX, baseY + 18, radius, Math.PI, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#d8ad5a";
  ctx.lineWidth = 15;
  ctx.beginPath();
  ctx.arc(field.plateX, topY, radius, Math.PI, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 237, 177, 0.88)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(field.plateX, topY - 10, radius - 2, Math.PI, Math.PI * 2);
  ctx.stroke();

  for (let angle = 184; angle <= 356; angle += 12) {
    const rad = degreesToRadians(angle);
    const x = field.plateX + Math.cos(rad) * radius;
    const y = homeY + Math.sin(rad) * radius;
    const postGradient = ctx.createLinearGradient(x - 8, y - wallHeight - 20, x + 12, y + 20);
    if (postGradient?.addColorStop) {
      postGradient.addColorStop(0, "#2c170c");
      postGradient.addColorStop(0.45, "#8a552b");
      postGradient.addColorStop(1, "#32190d");
      ctx.strokeStyle = postGradient;
    } else {
      ctx.strokeStyle = "#6b3d20";
    }
    ctx.lineWidth = 12;
    drawLine(x, y - wallHeight - 16, x, y + 25);
    ctx.strokeStyle = "rgba(255, 226, 143, 0.58)";
    ctx.lineWidth = 2.5;
    drawLine(x - 4, y - wallHeight - 8, x - 4, y + 16);
  }

  for (let angle = 188; angle <= 352; angle += 28) {
    const rad = degreesToRadians(angle);
    const x = field.plateX + Math.cos(rad) * radius;
    const y = homeY + Math.sin(rad) * radius - wallHeight * 0.52;
    ctx.fillStyle = "rgba(226, 182, 91, 0.38)";
    ctx.beginPath();
    ctx.ellipse(x, y, 22, 5, rad, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function shouldHoldCameraForShortDefenseThrow(throwState, elapsedSeconds) {
  if (!throwState || !Number.isFinite(throwState.startTime) || elapsedSeconds < throwState.startTime) return false;
  const distance = Math.hypot(
    (throwState.to?.x ?? 0) - (throwState.from?.x ?? 0),
    (throwState.to?.y ?? 0) - (throwState.from?.y ?? 0)
  );
  return distance <= 820 && elapsedSeconds <= (throwState.endTime ?? throwState.startTime) + 0.2;
}

function getDefenseCameraOffset() {
  if (!defenseState.active) return { x: 0, y: 0 };
  if (defenseState.battedBall?.fenceOver) return getHomeRunCameraOffset();
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  const chosen = defenseState.fielders.find((fielder) => fielder.role === defenseState.chosenFielder.role);
  let focusX = chosen ? ball.x * 0.68 + chosen.currentX * 0.32 : ball.x;
  let focusY = chosen ? ball.y * 0.68 + chosen.currentY * 0.32 : ball.y;
  if (shouldHoldCameraForShortDefenseThrow(defenseState.throw, elapsedSeconds)) {
    focusX = defenseState.throw.from.x;
    focusY = defenseState.throw.from.y;
  }
  const homeY = field.plateY + 42;
  let minX = field.plateX - defenseField.fenceDistance - 160;
  let maxX = field.plateX + defenseField.fenceDistance + 160;
  let minY = homeY - defenseField.fenceDistance - 180;
  const maxY = homeY + 120;
  if (isHomeRunVisionField()) {
    const vision = getHomeRunVisionScreenFocusPoint();
    const visionWeight = clamp((elapsedSeconds - Math.max(0.8, defenseState.battedBall?.ballTime ?? 0.8)) / 1.05, 0, 1);
    focusX = focusX * (1 - visionWeight) + vision.x * visionWeight;
    focusY = focusY * (1 - visionWeight) + vision.y * visionWeight;
    minX = Math.min(minX, vision.x - 560);
    maxX = Math.max(maxX, vision.x + 560);
    minY = Math.min(minY, vision.y - 210);
  }
  const cameraX = clamp(canvas.width / 2 - focusX, canvas.width - maxX, -minX);
  const cameraY = clamp(canvas.height / 2 - focusY, canvas.height - maxY, -minY);
  return { x: cameraX, y: cameraY };
}

function getHomeRunCameraOffset() {
  const battedBall = defenseState.battedBall;
  const fireworks = defenseState.homeRunFireworks;
  const center = getFenceCenter();
  const elapsedSeconds = defenseState.active ? (performance.now() - defenseState.startTime) / 1000 : 0;
  const travelProgress = clamp(elapsedSeconds / Math.max(0.1, battedBall.ballTime ?? 1), 0, 1);
  const standFocus = getHomeRunStandFocusPoint();
  const ballFocus = {
    x: ball.x,
    y: ball.y - getDefenseBallVisualHeightOffset(getDefenseBallHeightAtPoint(travelProgress, elapsedSeconds), battedBall) * 0.28
  };
  const standWeight = clamp((elapsedSeconds - (battedBall.ballTime ?? 0.8) * 0.58) / 0.7, 0, 1);
  const focusX = ballFocus.x * (1 - standWeight) + standFocus.x * standWeight;
  const focusY = ballFocus.y * (1 - standWeight) + standFocus.y * standWeight;
  const target = battedBall?.target || standFocus;
  const focusBoundsX = Math.max(defenseField.fenceDistance + 520, Math.abs((target?.x ?? field.plateX) - field.plateX) + 420, Math.abs(standFocus.x - field.plateX) + 420);
  const minX = field.plateX - focusBoundsX;
  const maxX = field.plateX + focusBoundsX;
  const minY = Math.min(center.y - defenseField.fenceDistance - 1080, (target?.y ?? center.y) - 520, standFocus.y - 520);
  const maxY = center.y + 120;
  return {
    x: clamp(canvas.width / 2 - focusX, canvas.width - maxX, -minX),
    y: clamp(canvas.height * 0.44 - focusY, canvas.height - maxY, -minY)
  };
}

function getHomeRunStandFocusPoint() {
  const fireworks = defenseState.homeRunFireworks;
  if (fireworks?.boatCatch) {
    return {
      x: fireworks.boatCatch.x ?? fireworks.boatCatch.ballX,
      y: (fireworks.boatCatch.y ?? fireworks.boatCatch.ballY) - 60
    };
  }
  if (fireworks?.rockets?.length) {
    const rocket = fireworks.rockets[0];
    return {
      x: (rocket.start.x + rocket.end.x) / 2,
      y: Math.min(rocket.start.y, rocket.end.y) - 70
    };
  }
  if (fireworks?.mStadiumRocket) {
    const rocket = fireworks.mStadiumRocket;
    return {
      x: (rocket.start.x + rocket.end.x) / 2,
      y: rocket.start.y - 360
    };
  }
  if (fireworks?.trains?.length) {
    const train = fireworks.trains[0];
    return {
      x: (train.startX + train.endX) / 2,
      y: train.y
    };
  }
  const target = defenseState.battedBall?.target || {
    x: field.plateX,
    y: getFenceCenter().y - defenseField.fenceDistance - 260
  };
  if (isHomeRunVisionField()) {
    const vision = getHomeRunVisionScreenFocusPoint();
    return { x: vision.x, y: vision.y - 12 };
  }
  if (getCurrentStadium().hasOcean && defenseState.battedBall?.fenceOver) {
    const water = getHomeRunWaterLandingPoint(defenseState.battedBall);
    return { x: water.x, y: water.y - 62 };
  }
  return { x: target.x, y: target.y - 86 };
}

function getBattedBallFirstLandingPoint(battedBall) {
  if (!battedBall?.target) return null;
  if (defenseState?.active && defenseState.battedBall === battedBall) {
    if (defenseState.outcome?.caught && !defenseState.outcome?.needsThrow && defenseState.target) {
      return defenseState.target;
    }
    return defenseState.landingTarget || battedBall.target;
  }
  return battedBall.target;
}

function getBattedBallFirstLandingTime(battedBall) {
  if (defenseState?.active && defenseState.battedBall === battedBall) {
    if (defenseState.outcome?.caught && !defenseState.outcome?.needsThrow) {
      return Math.max(0.1, defenseState.outcome.fieldingTime ?? battedBall?.ballTime ?? 1);
    }
  }
  return Math.max(0.1, battedBall?.ballTime ?? 1);
}

function getDefenseVisualLandingTarget(battedBall) {
  return battedBall?.target || null;
}

function drawDefenseTarget() {
  if (!defenseState.active) return;
  const battedBall = defenseState.battedBall;
  const target = getBattedBallFirstLandingPoint(battedBall) || defenseState.target;
  if (battedBall && !battedBall.isGrounder && !battedBall.wallHit && !battedBall.fenceOver) {
    drawFlyLandingTarget(target, battedBall, getBattedBallFirstLandingTime(battedBall));
    return;
  }
  ctx.save();
  ctx.strokeStyle = "rgba(255, 242, 168, 0.72)";
  ctx.fillStyle = "rgba(255, 242, 168, 0.24)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(target.x, target.y, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.setLineDash([8, 8]);
  drawBattedBallGuide(target);
  ctx.restore();
}

function drawFlyLandingTarget(target, battedBall, landingTime = null) {
  const elapsedSeconds = defenseState.active ? (performance.now() - defenseState.startTime) / 1000 : 0;
  const ballTime = Math.max(0.1, landingTime ?? battedBall.ballTime ?? 1);
  const timeLeft = Math.max(0, ballTime - elapsedSeconds);
  const afterLandingAge = Math.max(0, elapsedSeconds - ballTime);
  if (afterLandingAge > 0.85) return;
  const markerAlpha = afterLandingAge > 0 ? clamp(1 - afterLandingAge / 0.85, 0, 1) * 0.38 : 1;
  const arrivalProgress = clamp(elapsedSeconds / ballTime, 0, 1);
  const outerRadius = 46 + (1 - arrivalProgress) * 34;
  const catchRadius = defenseState.manualFielding
    ? Math.max(defenseState.manualCatchRadius || 0, getManualDefenseCatchRadius(defenseState.chosenFielder, battedBall))
    : 34;
  const pulse = 1 + Math.sin(performance.now() / 110) * 0.06;

  ctx.save();
  ctx.fillStyle = `rgba(174, 231, 255, ${0.16 * markerAlpha})`;
  ctx.strokeStyle = `rgba(174, 231, 255, ${0.95 * markerAlpha})`;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(target.x, target.y, outerRadius * pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = `rgba(255, 242, 168, ${0.94 * markerAlpha})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(target.x, target.y, catchRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(255, 255, 255, ${0.88 * markerAlpha})`;
  ctx.lineWidth = 4;
  drawLine(target.x - 34, target.y, target.x + 34, target.y);
  drawLine(target.x, target.y - 34, target.x, target.y + 34);

  if (afterLandingAge <= 0) {
    ctx.setLineDash([10, 9]);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 2;
    drawBattedBallGuide(target);
    ctx.setLineDash([]);
  }

  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 5;
  ctx.strokeStyle = `rgba(26, 41, 55, ${0.78 * markerAlpha})`;
  ctx.fillStyle = `rgba(255, 248, 223, ${markerAlpha})`;
  const label = timeLeft > 0 ? `落下 ${timeLeft.toFixed(1)}秒` : "落下地点";
  ctx.strokeText(label, target.x, target.y - outerRadius - 24);
  ctx.fillText(label, target.x, target.y - outerRadius - 24);
  ctx.restore();
}

function drawLandingImpactMarker() {
  if (!defenseState.active || !defenseState.battedBall) return;
  const battedBall = defenseState.battedBall;
  if (battedBall.isGrounder) return;
  if (defenseState.outcome?.caught && !battedBall.isGrounder && !defenseState.outcome?.needsThrow) return;
  if (battedBall.fenceOver || battedBall.wallHit) return;

  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  const impactAge = elapsedSeconds - getBattedBallFirstLandingTime(battedBall);
  if (impactAge < 0 || impactAge > 1.45) return;

  const target = getBattedBallFirstLandingPoint(battedBall) || defenseState.target;
  const alpha = 1 - impactAge / 1.45;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(216, 149, 72, 0.42)";
  ctx.beginPath();
  ctx.ellipse(target.x, target.y + 8, 32 + impactAge * 38, 10 + impactAge * 14, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 242, 168, 0.88)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(target.x, target.y, 20 + impactAge * 48, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(110, 76, 35, 0.55)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(target.x - 18, target.y + 7);
  ctx.quadraticCurveTo(target.x - 6, target.y - 12 - impactAge * 18, target.x + 7, target.y + 4);
  ctx.quadraticCurveTo(target.x + 17, target.y + 16, target.x + 28, target.y + 5);
  ctx.stroke();

  ctx.restore();
}

function drawGrounderBounceMarks() {
  if (!defenseState.active || !defenseState.battedBall?.isGrounder) return;
  const battedBall = defenseState.battedBall;
  if (battedBall.fenceOver || battedBall.wallHit) return;

  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  const ballTime = Math.max(0.1, battedBall.ballTime ?? 1);
  const activeProgress = clamp(elapsedSeconds / ballTime, 0, 1);
  const landing = defenseState.landingTarget || defenseState.target;
  const origin = defenseState.origin;
  const marks = 5;

  ctx.save();
  for (let i = 1; i <= marks; i += 1) {
    const t = i / (marks + 1);
    if (t > activeProgress + 0.24) continue;
    const fade = clamp(1 - Math.max(0, activeProgress - t) / 0.55, 0.2, 1);
    const x = origin.x + (landing.x - origin.x) * t;
    const y = origin.y + (landing.y - origin.y) * t;
    const size = 8 + i * 2;

    ctx.globalAlpha = fade;
    ctx.fillStyle = "rgba(216, 149, 72, 0.34)";
    ctx.beginPath();
    ctx.ellipse(x, y + 7, size * 1.7, size * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 242, 168, 0.55)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y + 2, size, Math.PI * 0.12, Math.PI * 1.32);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPostLandingBounceMarker() {
  if (!defenseState.active || !defenseState.battedBall || defenseState.battedBall.isGrounder) return;
  const battedBall = defenseState.battedBall;
  if (battedBall.fenceOver || battedBall.wallHit) return;
  if (defenseState.outcome?.caught && !defenseState.outcome?.needsThrow) return;

  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  const ballTime = Math.max(0.1, battedBall.ballTime ?? 1);
  if (elapsedSeconds < ballTime) return;

  const holdSeconds = getPostLandingHoldSeconds(battedBall);
  const holdAge = elapsedSeconds - ballTime;
  if (holdAge > 0.55) return;
  const rollT = getDefenseRollProgress(elapsedSeconds, ballTime);
  if (rollT > 0.68) return;

  const isLandingHold = holdAge < holdSeconds;
  const bouncePhase = getPostLandingBounceVisualPhase(rollT, battedBall);
  const alpha = isLandingHold
    ? (1 - holdAge / 0.55) * (0.42 + bouncePhase * 0.2)
    : (1 - holdAge / 0.55) * (0.26 + bouncePhase * 0.28);
  const markerPoint = getBattedBallFirstLandingPoint(battedBall) || defenseState.target;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "rgba(255, 242, 168, 0.82)";
  ctx.fillStyle = "rgba(216, 149, 72, 0.28)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(markerPoint.x, markerPoint.y + 8, 30 + bouncePhase * 18, 9 + bouncePhase * 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawBattedBallGuide(target) {
  const trajectory = defenseState.battedBall?.trajectory;
  if (trajectory === "fly" || trajectory === "liner") {
    ctx.beginPath();
    for (let i = 0; i <= 18; i += 1) {
      const t = i / 18;
      const x = defenseState.origin.x + (target.x - defenseState.origin.x) * t;
      const y = defenseState.origin.y + (target.y - defenseState.origin.y) * t - getBattedBallFlightHeight(t, defenseState.battedBall) * 0.62;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    return;
  }
  drawLine(defenseState.origin.x, defenseState.origin.y, target.x, target.y);
}

function drawDefenseFielders() {
  if (!defenseState.active) return;
  const runProgress = clamp((performance.now() - defenseState.startTime) / defenseState.duration, 0, 1);
  defenseState.fielders.forEach((fielder) => {
    const isChosen = fielder.role === defenseState.chosenFielder.role;
    const position = getDefenseFielderDrawPosition(fielder);
    drawDefenseFielder(position.x, position.y, fielder.role, fielder.name, isChosen, runProgress);
  });
}

function drawFielderCatchRanges() {
  if (!showFielderCatchRangeDebug || !defenseState.active || !defenseState.fielders?.length) return;
  const battedBall = defenseState.battedBall;
  ctx.save();
  defenseState.fielders.forEach((fielder) => {
    const position = getDefenseFielderDrawPosition(fielder);
    const radius = getVisibleFielderCatchRangeRadius(fielder, battedBall);
    if (!Number.isFinite(radius) || radius <= 0) return;
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fielderCatchRangeDebugStyle.fill;
    ctx.strokeStyle = fielderCatchRangeDebugStyle.stroke;
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
  });
  ctx.restore();
}

function getDefenseFielderDrawPosition(fielder) {
  return {
    x: fielder.currentX ?? fielder.x,
    y: fielder.currentY ?? fielder.y
  };
}

function drawThrowPath() {
  const throwState = defenseState.throw;
  if (!throwState) return;
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  if (elapsedSeconds < throwState.prepareStartTime) return;
  if (!Number.isFinite(throwState.startTime)) return;

  const isPreparing = elapsedSeconds < throwState.startTime;
  const throwProgress = isPreparing
    ? 0
    : clamp((elapsedSeconds - throwState.startTime) / throwState.throwTime, 0, 1);
  const ballPoint = getThrowPointAtProgress(throwState, throwProgress);
  const previousPoint = getThrowPointAtProgress(throwState, Math.max(0, throwProgress - 0.035));
  const direction = normalize({
    x: ballPoint.x - previousPoint.x || throwState.to.x - throwState.from.x,
    y: ballPoint.y - previousPoint.y || throwState.to.y - throwState.from.y
  });
  const arrowPoint = getThrowPointAtProgress(throwState, 0.72);
  const quickThrow = throwState.throwTimingSuccess && !isPreparing;

  ctx.save();
  ctx.strokeStyle = isPreparing
    ? "rgba(255, 242, 168, 0.44)"
    : throwState.safe
    ? "rgba(255, 227, 116, 0.74)"
    : "rgba(174, 231, 255, 0.78)";
  ctx.lineWidth = isPreparing ? 4 : 7;
  ctx.setLineDash(isPreparing ? [6, 12] : [15, 12]);
  if (throwState.bounce?.enabled) {
    const bouncePoint = getThrowBouncePoint(throwState);
    drawLine(throwState.from.x, throwState.from.y, bouncePoint.x, bouncePoint.y);
    drawLine(bouncePoint.x, bouncePoint.y, throwState.to.x, throwState.to.y);
  } else {
    drawLine(throwState.from.x, throwState.from.y, throwState.to.x, throwState.to.y);
  }
  ctx.setLineDash([]);

  if (!isPreparing) {
    ctx.strokeStyle = throwState.safe
      ? "rgba(255, 255, 255, 0.62)"
      : "rgba(255, 255, 255, 0.74)";
    ctx.lineWidth = 3;
    const trailLength = 44;
    drawLine(
      ballPoint.x - direction.x * trailLength,
      ballPoint.y - direction.y * trailLength,
      ballPoint.x + direction.x * 12,
      ballPoint.y + direction.y * 12
    );
  }

  if (throwState.bounce?.enabled) {
    const bouncePoint = getThrowBouncePoint(throwState);
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.beginPath();
    ctx.arc(bouncePoint.x, bouncePoint.y, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!isPreparing && !quickThrow) {
    ctx.fillStyle = throwState.safe ? "#ffe374" : "#aee7ff";
    ctx.beginPath();
    ctx.moveTo(arrowPoint.x + direction.x * 24, arrowPoint.y + direction.y * 24);
    ctx.lineTo(arrowPoint.x - direction.x * 18 - direction.y * 13, arrowPoint.y - direction.y * 18 + direction.x * 13);
    ctx.lineTo(arrowPoint.x - direction.x * 18 + direction.y * 13, arrowPoint.y - direction.y * 18 - direction.x * 13);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawBatterRunner() {
  const runner = defenseState.runner;
  if (!runner) return;
  if (isBatterRunnerOutOnCompletedForce()) return;
  const runProgress = clamp((performance.now() - defenseState.startTime) / Math.max(1, runner.arrivalTime * 1000), 0, 1);
  drawMiniRunner(runner.x, runner.y, runProgress, { jersey: "#d84e5f", cap: "#bf4331", facing: getRunnerFacingDirection(runner) });
  if (isPinchHitBoostActive(activeBatter) && runner.id === activeBatter?.id) {
    drawTemporaryBoostAura(runner.x, runner.y - 22, {
      radiusX: 31,
      radiusY: 58,
      label: "PH"
    });
  }
}

function drawStealPlay() {
  if (!stealState.active || !stealState.runner) return;
  const elapsedSeconds = (performance.now() - stealState.startTime) / 1000;
  const runProgress = stealState.arrivalTime > 0 ? clamp(elapsedSeconds / stealState.arrivalTime, 0, 1) : 0;
  ctx.save();
  ctx.strokeStyle = "rgba(255, 207, 112, 0.82)";
  ctx.lineWidth = 5;
  ctx.setLineDash([12, 10]);
  const start = stealState.route[0];
  const end = stealState.route[1];
  if (start && end) drawLine(start.x, start.y, end.x, end.y);
  ctx.setLineDash([]);
  drawMiniRunner(stealState.runner.x, stealState.runner.y, runProgress, { jersey: "#ffcf70", cap: "#c76c20", scale: 0.88, facing: getRunnerFacingDirection(stealState.runner) });

  if (stealState.throw) {
    const throwState = stealState.throw;
    const t = throwState.throwTime > 0 ? clamp((elapsedSeconds - throwState.startTime) / throwState.throwTime, 0, 1) : 1;
    const arcOffset = Math.sin(t * Math.PI) * 34 * (throwState.arcMultiplier || 1);
    const throwPoint = {
      x: throwState.from.x + (throwState.to.x - throwState.from.x) * t,
      y: throwState.from.y + (throwState.to.y - throwState.from.y) * t - arcOffset
    };
    ctx.strokeStyle = throwState.safe ? "rgba(174, 231, 255, 0.9)" : "rgba(255, 227, 116, 0.95)";
    ctx.lineWidth = 4;
    drawLine(throwState.from.x, throwState.from.y, throwPoint.x, throwPoint.y);
    ctx.fillStyle = getStealThrowBallColor(throwState);
    ctx.strokeStyle = "#102833";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(throwPoint.x, throwPoint.y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawDefenseBaseRunners() {
  const visibleBaseRunners = getVisibleDefenseBaseRunners();
  if (!visibleBaseRunners.length) return;
  const elapsedSeconds = (performance.now() - defenseState.startTime) / 1000;
  visibleBaseRunners.forEach((runner) => {
    const routeStartTime = runner.routeStartTime ?? 0;
    const routeDuration = runner.routeDuration ?? runner.arrivalTime;
    const runProgress = routeDuration > 0
      ? clamp((elapsedSeconds - routeStartTime) / routeDuration, 0, 1)
      : 0;
    drawMiniRunner(runner.x, runner.y, runProgress, {
      jersey: runner.scored && runner.arrived ? "#ffcf70" : "#ff9f43",
      cap: "#c76c20",
      scale: 0.76
    });
  });
}

function getVisibleDefenseBaseRunners() {
  return (defenseState.baseRunners || []).filter((runner) => !isBaseRunnerOutOnCompletedForce(runner));
}

function isBatterRunnerOutOnCompletedForce() {
  return (defenseState.completedForceOutBases || [])
    .some((targetBase) => getForcedRunnerStartBaseForTarget(targetBase) === "batter");
}

function isBaseRunnerOutOnCompletedForce(runner) {
  if (!runner) return false;
  const outStartBases = new Set(
    (defenseState.completedForceOutBases || [])
      .map(getForcedRunnerStartBaseForTarget)
      .filter(Boolean)
  );
  return outStartBases.has(runner.startBase);
}

function getRunnerFacingDirection(runner) {
  if (!runner) return 1;
  const route = runner.route || [runner.start, runner.destination].filter(Boolean);
  if (route.length >= 2) {
    const current = { x: runner.x ?? route[0].x, y: runner.y ?? route[0].y };
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    route.forEach((point, index) => {
      const distance = Math.hypot(current.x - point.x, current.y - point.y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });
    const nextPoint = route[Math.min(route.length - 1, nearestIndex + 1)] || route[nearestIndex];
    const previousPoint = route[Math.max(0, nearestIndex - 1)] || route[nearestIndex];
    const dx = nextPoint.x - previousPoint.x;
    if (Math.abs(dx) > 4) return Math.sign(dx);
  }
  if (runner.destination && Number.isFinite(runner.x)) {
    const dx = runner.destination.x - runner.x;
    if (Math.abs(dx) > 4) return Math.sign(dx);
  }
  return runner.facing || 1;
}

function drawMiniRunner(x, y, runProgress, options = {}) {
  const bob = Math.sin(runProgress * Math.PI * 12) * 3;
  const stride = Math.sin(runProgress * Math.PI * 14);
  const armSwing = Math.sin(runProgress * Math.PI * 14 + Math.PI);
  const scale = options.scale ?? 0.82;
  const jersey = options.jersey || "#d84e5f";
  const cap = options.cap || "#bf4331";
  const facing = options.facing && options.facing < 0 ? -1 : 1;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.ellipse(x, y + 30, 25 * scale, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.translate(x, y + bob);
  ctx.scale(scale * facing, scale);

  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  drawLine(-5, 20, -21 - stride * 11, 40);
  drawLine(5, 20, 18 + stride * 13, 39);
  drawLine(-10, 8, -28 - armSwing * 9, 19);
  drawLine(10, 8, 25 + armSwing * 8, 17);

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(-23 - stride * 11, 42, 9, 4.5, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(20 + stride * 13, 41, 9, 4.5, 0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = jersey;
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 3;
  roundRect(-15, -2, 30, 29, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ffd7b2";
  ctx.beginPath();
  ctx.ellipse(4, -24, 20, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = cap;
  ctx.beginPath();
  ctx.arc(2, -30, 22, Math.PI, Math.PI * 2);
  ctx.lineTo(24, -30);
  ctx.quadraticCurveTo(14, -14, -14, -16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(18, -31);
  ctx.lineTo(36, -29);
  ctx.lineTo(18, -23);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawDefenseFielder(x, y, role, name, isChosen, runProgress = 0) {
  const teamColor = fieldingTeam() === "away" ? "#153f24" : "#b8202d";
  const accentColor = isChosen ? "#ffcf70" : "#ffffff";
  const bob = isChosen ? Math.sin(runProgress * Math.PI * 10) * 3 : 0;
  const stride = isChosen ? Math.sin(runProgress * Math.PI * 12) : 0;
  const scale = isChosen ? 1.08 : 0.96;
  const groundY = y + 34 * scale;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
  ctx.beginPath();
  ctx.ellipse(x, groundY, isChosen ? 30 : 24, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(x, y + bob);
  ctx.scale(scale, scale);

  ctx.strokeStyle = "rgba(35, 48, 71, 0.35)";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  drawLine(-10, 24, -22 - stride * 8, 42);
  drawLine(10, 24, 22 + stride * 8, 42);

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(-23 - stride * 8, 44, 10, 5, -0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(23 + stride * 8, 44, 10, 5, 0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = teamColor;
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 4;
  ctx.beginPath();
  roundRect(-18, 0, 36, 32, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-4, 4, 8, 28);

  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 5;
  drawLine(-17, 9, -31 - stride * 6, 23);
  drawLine(17, 9, 31 + stride * 6, 23);

  ctx.fillStyle = "#fff7f0";
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(-33 - stride * 6, 25, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(33 + stride * 6, 25, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ffd7b2";
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, -25, 25, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = teamColor;
  ctx.beginPath();
  ctx.arc(0, -30, 27, Math.PI, Math.PI * 2);
  ctx.lineTo(27, -30);
  ctx.quadraticCurveTo(10, -12, -20, -15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = teamColor;
  ctx.beginPath();
  ctx.ellipse(24, -28, 17, 7, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = accentColor;
  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(role, 0, -33);

  ctx.fillStyle = "#233047";
  ctx.beginPath();
  ctx.arc(-8, -25, 2.5, 0, Math.PI * 2);
  ctx.arc(8, -25, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, -18, 7, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();

  ctx.restore();
  drawDefenseFielderNameLabel(x, y + bob, name || role, role, isChosen);
}

function drawDefenseFielderNameLabel(x, y, name, role, isChosen) {
  const label = role === "P" ? `投 ${name}` : name;
  ctx.save();
  const rect = getDefenseFielderNameLabelRect(x, y, label, isChosen);

  ctx.fillStyle = isChosen ? "rgba(255, 207, 112, 0.96)" : "rgba(255, 255, 255, 0.92)";
  ctx.strokeStyle = "rgba(35, 48, 71, 0.72)";
  ctx.lineWidth = 2;
  roundRect(rect.x, rect.y, rect.width, rect.height, 7);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#233047";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  fitText(label, rect.x + rect.width / 2, rect.y + rect.height / 2 + 1, rect.width - 12);
  ctx.restore();
}

function getDefenseFielderNameLabelRect(x, y, label, isChosen) {
  const fontSize = isChosen ? 17 : 15;
  ctx.font = `bold ${fontSize}px sans-serif`;
  const textWidth = Math.min(ctx.measureText(label).width, 112);
  const width = textWidth + 18;
  const height = fontSize + 12;
  const visible = getDefenseVisibleWorldBounds();
  const prefersLeft = x + 48 + width > visible.right;
  return {
    x: clamp(prefersLeft ? x - 48 - width : x + 48, visible.left, visible.right - width),
    y: clamp(y - 40, visible.top, visible.bottom - height),
    width,
    height
  };
}

function getDefenseVisibleWorldBounds() {
  const camera = getDefenseCameraOffset();
  return {
    left: -camera.x + 14,
    right: canvas.width - camera.x - 14,
    top: -camera.y + 16,
    bottom: canvas.height - camera.y - 16
  };
}

function drawPlateAndZone() {
  if (getCurrentStadium().hasSpaceStadium) {
    drawSpaceHomePlate();
    return;
  }
  const scale = field.plateScale;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(field.plateX - 36 * scale, field.plateY - 12 * scale);
  ctx.lineTo(field.plateX + 36 * scale, field.plateY - 12 * scale);
  ctx.lineTo(field.plateX + 26 * scale, field.plateY + 22 * scale);
  ctx.lineTo(field.plateX, field.plateY + 42 * scale);
  ctx.lineTo(field.plateX - 26 * scale, field.plateY + 22 * scale);
  ctx.closePath();
  ctx.fill();
}

function drawSpaceHomePlate() {
  const points = getHomePlatePoints();
  const palette = ["#74fff5", "#fff07a", "#ff7ec8", "#9f83ff", "#ff6f61"];
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  points.forEach((point, index) => {
    const next = points[(index + 1) % points.length];
    ctx.strokeStyle = hexToRgba(palette[index % palette.length], 0.07);
    ctx.lineWidth = 13;
    drawLine(point.x, point.y, next.x, next.y);
    ctx.strokeStyle = hexToRgba(palette[index % palette.length], 0.34);
    ctx.lineWidth = 3.8;
    drawLine(point.x, point.y, next.x, next.y);
  });

  const plateGlow = ctx.createRadialGradient(field.plateX, field.plateY + 16, 8, field.plateX, field.plateY + 16, 92);
  if (plateGlow?.addColorStop) {
    plateGlow.addColorStop(0, "rgba(180, 220, 230, 0.2)");
    plateGlow.addColorStop(0.36, "rgba(76, 190, 205, 0.09)");
    plateGlow.addColorStop(1, "rgba(116,255,245,0)");
    ctx.fillStyle = plateGlow;
    ctx.beginPath();
    ctx.arc(field.plateX, field.plateY + 16, 72, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  const fill = ctx.createLinearGradient(field.plateX - 48, field.plateY - 18, field.plateX + 48, field.plateY + 52);
  if (fill?.addColorStop) {
    fill.addColorStop(0, "#303745");
    fill.addColorStop(0.34, "#4a4930");
    fill.addColorStop(0.58, "#24464e");
    fill.addColorStop(0.78, "#3a2f4a");
    fill.addColorStop(1, "#202833");
    ctx.fillStyle = fill;
  } else {
    ctx.fillStyle = "#26313c";
  }
  ctx.fill();
  ctx.strokeStyle = "rgba(220, 240, 242, 0.48)";
  ctx.lineWidth = 2;
  ctx.stroke();

  for (let i = 0; i < 14; i += 1) {
    const angle = -Math.PI * 0.1 + (Math.PI * 1.2 * i) / 17;
    const x = field.plateX + Math.cos(angle) * 58;
    const y = field.plateY + 18 + Math.sin(angle) * 46;
    ctx.fillStyle = hexToRgba(palette[i % palette.length], 0.34);
    ctx.beginPath();
    ctx.arc(x, y, i % 3 === 0 ? 3.2 : 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawGoodContactZone() {
  const points = getGoodContactZonePoints();
  const center = getPolygonCenter(points);
  const markerRadius = getGoodContactZoneCenterMarkerRadius();
  ctx.save();
  ctx.fillStyle = "rgba(255, 238, 112, 0.18)";
  ctx.strokeStyle = "rgba(255, 248, 178, 0.32)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "rgba(27, 52, 68, 0.16)";
  ctx.fillStyle = "rgba(112, 244, 255, 0.24)";
  ctx.lineWidth = Math.max(1.2, 1.5 * field.plateScale);
  ctx.beginPath();
  ctx.arc(center.x, center.y, markerRadius, 0, Math.PI * 2);
  ctx.moveTo(center.x - markerRadius * 1.5, center.y);
  ctx.lineTo(center.x + markerRadius * 1.5, center.y);
  ctx.moveTo(center.x, center.y - markerRadius * 1.5);
  ctx.lineTo(center.x, center.y + markerRadius * 1.5);
  ctx.stroke();
  ctx.strokeStyle = "rgba(162, 250, 255, 0.3)";
  ctx.lineWidth = Math.max(0.8, 1 * field.plateScale);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(center.x, center.y, Math.max(2, 2.5 * field.plateScale), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPitcher() {
  const team = fieldingTeam();
  const spriteSet = pitcherSpriteSets[team];
  if (spriteSet.image.complete && spriteSet.image.naturalWidth > 0) {
    drawPitcherSprite(team);
  } else {
    drawPlayer(pitcher.x, pitcher.y, 1, "#286ed6", true);
    if (isReliefBoostActive(activePitcher)) {
      drawTemporaryBoostAura(pitcher.x, pitcher.y - 10, {
        radiusX: 52,
        radiusY: 82
      });
    }
  }
}

function drawReliefCarEntrance() {
  if (!reliefCarEffect.active || !getCurrentStadium().hasReliefCar) return;
  const age = performance.now() - reliefCarEffect.startTime;
  const progress = clamp(age / reliefCarEffect.duration, 0, 1);
  if (progress >= 1) {
    reliefCarEffect.active = false;
    return;
  }

  const fromLeft = reliefCarEffect.team === "away";
  const startX = fromLeft ? field.plateX - 820 : field.plateX + 820;
  const endX = pitcher.x + (fromLeft ? -54 : 54);
  const startY = field.plateY - 105;
  const endY = pitcher.y + 58;
  const ease = 1 - Math.pow(1 - progress, 2.8);
  const x = startX + (endX - startX) * ease;
  const y = startY + (endY - startY) * ease;
  const facing = fromLeft ? 1 : -1;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(facing, 1);
  ctx.fillStyle = "rgba(255,255,255,0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 31, 96, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  const silver = ctx.createLinearGradient(-82, -36, 82, 26);
  silver.addColorStop(0, "#f8fbff");
  silver.addColorStop(0.38, "#b7c2cb");
  silver.addColorStop(0.72, "#eef3f7");
  silver.addColorStop(1, "#8c98a3");
  ctx.fillStyle = silver;
  roundRect(-82, -28, 164, 54, 12);
  ctx.fill();
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = "rgba(90, 179, 213, 0.62)";
  roundRect(-48, -54, 96, 39, 12);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#f4d0a6";
  ctx.beginPath();
  ctx.arc(-13, -35, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = reliefCarEffect.team === "away" ? "#2e73d2" : "#d94f42";
  roundRect(-29, -25, 32, 28, 8);
  ctx.fill();
  ctx.fillStyle = "#e8f8ff";
  roundRect(10, -45, 26, 18, 6);
  ctx.fill();
  ctx.fillStyle = "#ffcf70";
  ctx.beginPath();
  ctx.arc(86, -4, 8, 0, Math.PI * 2);
  ctx.fill();
  [-48, 48].forEach((wheelX) => {
    ctx.fillStyle = "#233047";
    ctx.beginPath();
    ctx.arc(wheelX, 28, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#d7e5ef";
    ctx.beginPath();
    ctx.arc(wheelX, 28, 6, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  if (reliefCarEffect.pitcherName) {
    ctx.save();
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(20, 28, 40, 0.82)";
    roundRect(x - 96, y - 92, 192, 30, 8);
    ctx.fill();
    ctx.fillStyle = "#fff2a8";
    ctx.fillText(`${reliefCarEffect.pitcherName} 登場`, x, y - 77);
    ctx.restore();
  }
}

function drawPitcherSprite(team) {
  const spriteSet = pitcherSpriteSets[team];
  const frames = spriteSet.frames;
  let frame = frames.set;
  if (pendingPitch) {
    const motionProgress = clamp((performance.now() - pitcher.windupTime) / pitchWindupDuration, 0, 1);
    frame = motionProgress < 0.12 ? frames.set : motionProgress < 0.8 ? frames.windup : frames.release;
  } else if (isPitching) {
    frame = frames.release;
  }
  const drawHeight = frame === frames.release ? 132 : 148;
  const drawWidth = drawHeight * (frame.sw / frame.sh);
  const footY = pitcher.y + 64;
  const drawX = frame === frames.release ? pitcher.x - drawWidth * 0.52 : pitcher.x - drawWidth * 0.5;
  ctx.save();
  if (activePitcher.throws === "L") {
    ctx.translate(pitcher.x * 2, 0);
    ctx.scale(-1, 1);
  }
  if (isReliefBoostActive(activePitcher)) {
    drawSpriteBodyAura(spriteSet.image, frame, drawX, footY - drawHeight, drawWidth, drawHeight);
  }
  ctx.drawImage(spriteSet.image, frame.sx, frame.sy, frame.sw, frame.sh, drawX, footY - drawHeight, drawWidth, drawHeight);
  ctx.restore();
}

function drawBatter() {
  const spriteSet = batterSpriteSets[battingTeam];
  const pose = getBatterPoseLayers()[0].pose;
  const image = getBatterPoseImage(spriteSet, pose);
  if (image.complete && image.naturalWidth > 0) {
    drawBatterSprite(battingTeam);
  } else {
    drawPlayer(batter.x, batter.y, 1.18, "#e04f42", false);
    if (isPinchHitBoostActive(activeBatter)) {
      drawTemporaryBoostAura(batter.x, batter.y - 12, {
        radiusX: 54,
        radiusY: 88
      });
    }
  }
}

function drawSpriteBodyAura(image, frame, drawX, drawY, drawWidth, drawHeight, alpha = 1) {
  const age = performance.now() / 1000;
  const pulse = 0.5 + Math.sin(age * 4.1) * 0.5;
  const shadowColor = `rgba(255, 60, 58, ${0.78 + pulse * 0.14})`;

  ctx.save();
  ctx.globalAlpha = 0.16 * alpha;
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = 36 + pulse * 10;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  for (let i = 0; i < 5; i += 1) {
    ctx.drawImage(image, frame.sx, frame.sy, frame.sw, frame.sh, drawX, drawY, drawWidth, drawHeight);
  }
  ctx.restore();
}

function drawTemporaryBoostAura(x, y, options = {}) {
  const age = performance.now() / 1000;
  const pulse = 0.5 + Math.sin(age * 4.4) * 0.5;
  const radiusX = (options.radiusX ?? 58) + pulse * 4;
  const radiusY = (options.radiusY ?? 88) + pulse * 6;
  const color = options.color || "255, 92, 84";
  const secondaryColor = options.secondaryColor || "255, 178, 138";

  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  const glow = ctx.createRadialGradient(x, y, Math.max(6, radiusX * 0.12), x, y, radiusY);
  glow.addColorStop(0, `rgba(${color}, ${0.12 + pulse * 0.025})`);
  glow.addColorStop(0.55, `rgba(${color}, 0.14)`);
  glow.addColorStop(0.82, `rgba(${secondaryColor}, 0.12)`);
  glow.addColorStop(1, `rgba(${color}, 0)`);
  ctx.fillStyle = glow;
  ctx.shadowColor = `rgba(${color}, 0.62)`;
  ctx.shadowBlur = 26;
  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = `rgba(${secondaryColor}, ${0.24 + pulse * 0.08})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(x, y, radiusX * 0.86, radiusY * 0.92, 0, 0, Math.PI * 2);
  ctx.stroke();

  if (options.label) {
    ctx.fillStyle = `rgba(${secondaryColor}, 0.84)`;
    ctx.strokeStyle = "rgba(40, 12, 18, 0.74)";
    ctx.lineWidth = 2;
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(options.label, x, y - radiusY * 0.64);
    ctx.fillText(options.label, x, y - radiusY * 0.64);
  }
  ctx.restore();
}

function drawHbpHitBox() {
  if (!showHbpHitBox) return;
  const polygon = getHbpHitPolygon();
  if (!polygon.length) return;
  ctx.save();
  ctx.fillStyle = "rgba(255, 96, 96, 0.12)";
  ctx.strokeStyle = "rgba(255, 96, 96, 0.52)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  polygon.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawBatterSprite(team) {
  const spriteSet = batterSpriteSets[team];
  const frames = spriteSet.frames;
  const layers = getBatterPoseLayers();
  ctx.save();
  if (activeBatterSide === "L") {
    ctx.translate(batter.x * 2, 0);
    ctx.scale(-1, 1);
  }
  const expandedLayers = layers.flatMap(expandBatterPoseLayer);
  if (isPinchHitBoostActive(activeBatter)) {
    expandedLayers.forEach((layer) => {
      const image = getBatterPoseImage(spriteSet, layer.pose);
      const frame = frames[layer.pose];
      const drawHeight = getBatterDrawHeight(layer.pose);
      const drawWidth = drawHeight * (frame.sw / frame.sh);
      const drawX = getBatterDrawX(layer.pose, drawWidth);
      const drawY = batter.y + 58 - drawHeight;
      drawSpriteBodyAura(image, frame, drawX, drawY, drawWidth, drawHeight, layer.alpha);
    });
  }
  expandedLayers.forEach((layer) => {
    const image = getBatterPoseImage(spriteSet, layer.pose);
    const frame = frames[layer.pose];
    const drawHeight = getBatterDrawHeight(layer.pose);
    const drawWidth = drawHeight * (frame.sw / frame.sh);
    const drawX = getBatterDrawX(layer.pose, drawWidth);
    const drawY = batter.y + 58 - drawHeight;
    ctx.globalAlpha = layer.alpha;
    ctx.drawImage(image, frame.sx, frame.sy, frame.sw, frame.sh, drawX, drawY, drawWidth, drawHeight);
  });
  ctx.globalAlpha = 1;
  ctx.restore();
}

function getBatterPoseLayers() {
  if (hbpPose.active) return [{ pose: "hbp", alpha: 1 }];
  if (isBuntStanceActive()) return [{ pose: "swing", alpha: 1 }];
  if (!swingState.isSwinging) return [{ pose: "stance", alpha: 1 }];
  const elapsed = performance.now() - swingState.startTime;
  if (elapsed < 200) return [{ pose: "stance", alpha: 1 }];
  if (elapsed < 350) return blendPose("swingStart", "swing", (elapsed - 200) / 150);
  if (elapsed < 430) return [{ pose: "swing", alpha: 1 }];
  if (elapsed < swingState.duration) return blendPose("swing", "follow", (elapsed - 430) / (swingState.duration - 430));
  return [{ pose: "follow", alpha: 1 }];
}

function expandBatterPoseLayer(layer) {
  if (layer.pose !== "swingStart") return [layer];
  return [{ pose: "stance", alpha: layer.alpha }];
}

function getBatterPoseImage(spriteSet, pose) {
  if (pose === "hbp") return spriteSet.hbpImage;
  if (pose === "follow") return spriteSet.followImage;
  return spriteSet.image;
}

function blendPose(fromPose, toPose, amount) {
  const alpha = clamp(amount, 0, 1);
  return [
    { pose: fromPose, alpha: 1 - alpha },
    { pose: toPose, alpha }
  ];
}

function getBatterDrawHeight(pose) {
  if (pose === "hbp") return 232;
  if (pose === "follow") return 198;
  if (pose === "swing") return 198;
  return 204;
}

function getBatterDrawX(pose, drawWidth) {
  if (pose === "hbp") return batter.x - drawWidth * 0.56;
  if (pose === "follow") return batter.x - drawWidth * 0.58;
  if (pose === "swing") return batter.x - 70;
  return batter.x - drawWidth * 0.52;
}

function drawPlayer(x, y, scale, uniformColor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#fff2a8";
  ctx.beginPath();
  ctx.arc(0, -45, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = uniformColor;
  ctx.fillRect(-20, -30, 40, 46);
  ctx.restore();
}

function drawBallTrail() {
  for (let i = 0; i < ball.trail.length; i += 1) {
    const p = ball.trail[i];
    const alpha = i / Math.max(1, ball.trail.length);
    const heightOffset = gamePhase === "defense" ? getDefenseBallHeightAtPoint(p.progress ?? 0, p.elapsedSeconds ?? 0) : 0;
    ctx.fillStyle = `rgba(255, 245, 204, ${alpha * 0.42})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y - heightOffset, 3 + alpha * 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBall() {
  if (!ball.active && !isPitching) ctx.globalAlpha = 0.5;
  if (gamePhase === "defense") {
    drawDefenseBall();
    ctx.globalAlpha = 1;
    return;
  }
  const pitch = pitchTypes[currentPitchType];
  if (currentPitchType === "special") drawSpecialPitchGlow(ball.x, ball.y, ball.radius);
  drawBaseballIcon(ball.x, ball.y, ball.radius, pitch ? pitch.color : "#ffffff", ball.spin);
  ctx.globalAlpha = 1;
}

function drawSpecialPitchGlow(x, y, radius = ball.radius) {
  const time = performance.now();
  const pulse = 0.5 + Math.sin(time / 82) * 0.5;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = `rgba(255, 230, 120, ${0.52 + pulse * 0.18})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, radius + 1.5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255, 207, 112, 0.42)";
  ctx.lineWidth = 2;
  drawLine(x - 18, y + 4, x - 7, y + 1);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.38)";
  ctx.lineWidth = 1.4;
  drawLine(x - 13, y - 3, x - 5, y - 2);
  ctx.restore();
}

function drawBaseballIcon(x, y, radius = ball.radius, fill = "#ffffff", spin = ball.spin) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#bf4331";
  ctx.lineWidth = Math.max(1.4, radius * 0.22);
  const seam = Math.sin(spin) * Math.min(3, radius * 0.38);
  const seamX = radius * 0.5;
  const seamY = radius * 0.25;
  drawLine(x - seamX, y - seamY + seam, x + seamX, y + seamY - seam);
  drawLine(x - seamX, y + seamY - seam, x + seamX, y - seamY + seam);
}

function drawDefenseBall() {
  const progress = defenseState.active
    ? clamp((performance.now() - defenseState.startTime) / defenseState.duration, 0, 1)
    : 0;
  const elapsedSeconds = defenseState.active ? (performance.now() - defenseState.startTime) / 1000 : 0;
  const heightOffset = getDefenseBallHeightAtPoint(progress, elapsedSeconds);
  const battedBall = defenseState.battedBall;
  const highFlyAmount = getHighFlyVisualAmount(battedBall, heightOffset);
  const visualHeightOffset = getDefenseBallVisualHeightOffset(heightOffset, battedBall);
  const radius = battedBall?.trajectory === "fly" ? ball.radius + 2 - highFlyAmount * 1.8 : ball.radius;
  drawWallImpactEffect(elapsedSeconds, visualHeightOffset);
  if (drawDefenseCatchBallTransition(elapsedSeconds, radius)) return;

  if (heightOffset > 4) {
    const shadowAlpha = 0.24 - highFlyAmount * 0.14;
    const shadowWidth = highFlyAmount > 0
      ? radius + 14 + heightOffset * 0.024
      : radius + heightOffset * 0.08;
    ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
    ctx.beginPath();
    ctx.ellipse(ball.x, ball.y + 4, shadowWidth, 5 - highFlyAmount * 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  if (highFlyAmount > 0.18) {
    ctx.save();
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.16 + highFlyAmount * 0.2})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    drawLine(ball.x, ball.y, ball.x, ball.y - visualHeightOffset);
    ctx.setLineDash([]);
    ctx.strokeStyle = `rgba(174, 231, 255, ${0.24 + highFlyAmount * 0.24})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y - visualHeightOffset, radius + 12 + highFlyAmount * 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  if (defenseState.throw?.active) {
    ctx.strokeStyle = "rgba(174, 231, 255, 0.82)";
    ctx.lineWidth = 6;
    drawLine(ball.x - 24, ball.y - visualHeightOffset + 3, ball.x + 12, ball.y - visualHeightOffset - 3);
    ctx.fillStyle = "rgba(174, 231, 255, 0.22)";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y - visualHeightOffset, radius + 8, 0, Math.PI * 2);
    ctx.fill();
  } else if (battedBall?.trajectory === "grounder") {
    ctx.strokeStyle = "rgba(216, 149, 72, 0.55)";
    ctx.lineWidth = 3;
    drawLine(ball.x - 18, ball.y + 8, ball.x + 12, ball.y + 8);
  } else if (battedBall?.trajectory === "liner") {
    ctx.strokeStyle = "rgba(174, 231, 255, 0.42)";
    ctx.lineWidth = 4;
    drawLine(ball.x - 20, ball.y - visualHeightOffset, ball.x + 8, ball.y - visualHeightOffset);
  } else {
    ctx.strokeStyle = `rgba(255, 242, 168, ${0.45 + highFlyAmount * 0.2})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y - visualHeightOffset, radius + 8 + highFlyAmount * 6, 0, Math.PI * 2);
    ctx.stroke();
  }

  const defenseThrowBallFill = defenseState.throw?.active && defenseState.throw.throwTimingSuccess
    ? "#ff8a83"
    : "#ffffff";
  drawBaseballIcon(ball.x, ball.y - visualHeightOffset, radius, defenseThrowBallFill);
}

function drawDefenseCatchBallTransition(elapsedSeconds, radius) {
  const visual = defenseState.catchVisual;
  if (!visual || !defenseState.outcome?.caught) return false;
  const age = elapsedSeconds - visual.startTime;
  if (age < 0) return false;
  if (age <= visual.duration) {
    const progress = clamp(age / Math.max(0.01, visual.duration), 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const arc = Math.sin(progress * Math.PI) * 10;
    const x = visual.fromX + (visual.toX - visual.fromX) * eased;
    const y = visual.fromY + (visual.toY - visual.fromY) * eased - arc;
    const shadowAlpha = 0.24 * (1 - progress);
    ctx.save();
    ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
    ctx.beginPath();
    ctx.ellipse(visual.shadowX, visual.shadowY + 4, radius + 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(174, 255, 218, ${0.4 + progress * 0.5})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, radius + 7 - progress * 3, 0, Math.PI * 2);
    ctx.stroke();
    drawBaseballIcon(x, y, Math.max(4, radius * (1 - progress * 0.28)));
    ctx.restore();
    return true;
  }
  const throwState = defenseState.throw;
  const throwStarted = throwState?.active
    && Number.isFinite(throwState.startTime)
    && elapsedSeconds >= throwState.startTime;
  return !throwStarted;
}

function getHighFlyVisualAmount(battedBall, heightOffset) {
  if (!battedBall || battedBall.trajectory !== "fly") return 0;
  const highArc = battedBall.isRoutineFly || battedBall.isToweringFly || battedBall.isFenceEdgeFly || battedBall.isChaseFly || battedBall.isDeep || battedBall.maxHeight >= 320;
  if (!highArc) return 0;
  return clamp(heightOffset / 380, 0, 1);
}

function getDefenseBallVisualHeightOffset(heightOffset, battedBall) {
  const highFlyAmount = getHighFlyVisualAmount(battedBall, heightOffset);
  return heightOffset * (1 + highFlyAmount * 0.42);
}

function drawWallImpactEffect(elapsedSeconds, heightOffset) {
  const battedBall = defenseState.battedBall;
  if (!battedBall?.wallHit) return;
  const impactTime = battedBall.ballTime ?? 0;
  const impactAge = elapsedSeconds - impactTime;
  if (impactAge < 0 || impactAge > 0.5) return;
  const impactPoint = defenseState.landingTarget || battedBall.target;
  const alpha = 1 - impactAge / 0.5;
  ctx.save();
  ctx.strokeStyle = `rgba(255, 242, 168, ${0.85 * alpha})`;
  ctx.fillStyle = `rgba(255, 111, 97, ${0.22 * alpha})`;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(impactPoint.x, impactPoint.y - heightOffset, 22 + impactAge * 46, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.72 * alpha})`;
  ctx.lineWidth = 3;
  drawLine(impactPoint.x - 34, impactPoint.y - heightOffset, impactPoint.x + 34, impactPoint.y - heightOffset);
  drawLine(impactPoint.x, impactPoint.y - heightOffset - 30, impactPoint.x, impactPoint.y - heightOffset + 30);
  ctx.restore();
}

function getDefenseBallHeightAtPoint(progress, elapsedSeconds = 0) {
  const throwState = defenseState.throw;
  if (throwState && elapsedSeconds >= throwState.startTime) {
    return getDefenseThrowHeight(elapsedSeconds);
  }

  const trajectory = defenseState.battedBall?.trajectory;
  const battedBall = defenseState.battedBall;
  if (defenseState.outcome?.caught && !defenseState.outcome?.needsThrow) {
    const fieldingTime = Math.max(0.1, defenseState.outcome.fieldingTime ?? battedBall?.ballTime ?? 1);
    const catchProgress = clamp(elapsedSeconds / fieldingTime, 0, 1);
    if (trajectory === "grounder") return getGrounderFlightHeight(catchProgress, battedBall);
    return getBattedBallFlightHeight(catchProgress, battedBall);
  }
  if (defenseState.outcome && (!defenseState.outcome.caught || defenseState.outcome.needsThrow)) {
    const ballTime = Math.max(0.1, battedBall?.ballTime ?? defenseState.duration / 1000);
    if (elapsedSeconds <= ballTime) {
      const t = clamp(elapsedSeconds / ballTime, 0, 1);
      if (trajectory === "grounder") return getGrounderFlightHeight(t, battedBall);
      if (battedBall?.wallHit) return getWallHitFlightHeight(t, battedBall);
      return getBattedBallFlightHeight(t, battedBall);
    }
    if (battedBall?.wallHit) return getWallHitAfterImpactHeight(elapsedSeconds - ballTime, battedBall);
    if (battedBall?.fenceOver) return 0;
    const rollT = getDefenseRollProgress(elapsedSeconds, ballTime);
    return getPostLandingBounceHeight(rollT, battedBall);
  }
  if (trajectory === "grounder") return getGrounderFlightHeight(progress, battedBall);
  return getBattedBallFlightHeight(progress, battedBall);
}

function isHardInfieldFirstBounceGrounder(battedBall) {
  if (!battedBall?.isGrounder) return false;
  const firstBounceDistance = battedBall.landingDistance ?? battedBall.flightDistance ?? getFenceDistance(battedBall.target);
  return firstBounceDistance <= 860
    && (battedBall.grounderGap || battedBall.isLineEdgeGrounder || battedBall.isCenterReturnGrounder)
    && (battedBall.power ?? 0) >= 0.56;
}

function getGrounderFlightHeight(progress, battedBall) {
  const t = clamp(progress, 0, 1);
  if (battedBall?.isBunt) {
    return Math.abs(Math.sin(t * Math.PI * 5)) * 3.2;
  }
  if (isHardInfieldFirstBounceGrounder(battedBall)) {
    const hopHeight = battedBall?.isLineEdgeGrounder ? 11 : 9;
    const skim = Math.sin(t * Math.PI) * hopHeight;
    const lateDipSoftener = Math.sin(Math.min(1, t / 0.82) * Math.PI) * 2.4;
    return Math.max(0, skim + lateDipSoftener);
  }
  return Math.abs(Math.sin(t * Math.PI * 7)) * 8;
}

function getBattedBallFlightHeight(progress, battedBall) {
  if (!battedBall) return 0;
  const t = clamp(progress, 0, 1);
  return getParabolicArcHeight(t, battedBall.maxHeight ?? 120);
}

function getPostLandingBouncePhase(rollProgress, battedBall) {
  const t = clamp(rollProgress, 0, 1);
  const bounceCount = isHardInfieldFirstBounceGrounder(battedBall) ? 1.45 : isDeepDriveFrontLandingBall(battedBall) ? 1.35 : isOutfieldFrontLandingBall(battedBall) ? 1.05 : battedBall?.isSoftDrop ? 1.8 : battedBall?.isLiner ? 2.15 : 2.35;
  return Math.abs(Math.sin(t * Math.PI * bounceCount));
}

function getPostLandingBounceVisualPhase(rollProgress, battedBall) {
  const t = clamp(rollProgress, 0, 1);
  const lateRollDamping = Math.pow(1 - t, 1.65);
  return getPostLandingBouncePhase(t, battedBall) * lateRollDamping;
}

function getPostLandingBounceHeight(rollProgress, battedBall) {
  const t = clamp(rollProgress, 0, 1);
  const bounceHeight = isHardInfieldFirstBounceGrounder(battedBall) ? 7.5 : isDeepDriveFrontLandingBall(battedBall) ? 6.5 : isOutfieldFrontLandingBall(battedBall) ? 4.4 : battedBall?.isSoftDrop ? 20 : battedBall?.isLiner ? 17 : 13;
  const damping = Math.pow(1 - t, isHardInfieldFirstBounceGrounder(battedBall) ? 3.75 : isDeepDriveFrontLandingBall(battedBall) ? 2.1 : isOutfieldFrontLandingBall(battedBall) ? 3.8 : 3.35);
  return getPostLandingBouncePhase(t, battedBall) * bounceHeight * damping;
}

function getWallHitFlightHeight(progress, battedBall) {
  const t = clamp(progress, 0, 1);
  const arcHeight = getBattedBallFlightHeight(t, battedBall);
  return Math.max(arcHeight, (battedBall.wallImpactHeight ?? 90) * t);
}

function getWallHitAfterImpactHeight(secondsAfterImpact, battedBall) {
  const t = clamp(secondsAfterImpact / 0.42, 0, 1);
  const slideHeight = (battedBall.wallImpactHeight ?? 90) * Math.pow(1 - t, 3);
  const bounce = Math.abs(Math.sin(t * Math.PI * 2.4)) * 5 * Math.pow(1 - t, 1.6);
  return slideHeight + bounce;
}

function getBattedBallHeightAtDistance(distanceAlongFlight, battedBall) {
  if (!battedBall || battedBall.flightDistance <= 0) return 0;
  return getBattedBallFlightHeight(distanceAlongFlight / battedBall.flightDistance, battedBall);
}

function getDefenseThrowHeight(elapsedSeconds) {
  const throwState = defenseState.throw;
  if (!throwState) return 0;
  const t = clamp((elapsedSeconds - throwState.startTime) / throwState.throwTime, 0, 1);
  if (throwState.bounce?.enabled) {
    const bounceProgress = clamp(throwState.bounce.progress ?? 0.62, 0.45, 0.78);
    if (t <= bounceProgress) {
      const segmentT = clamp(t / bounceProgress, 0, 1);
      return getParabolicArcHeight(segmentT, (throwState.arcHeight ?? 42) * 0.68);
    }
    const segmentT = clamp((t - bounceProgress) / (1 - bounceProgress), 0, 1);
    const damping = Math.pow(1 - segmentT, 1.45);
    return Math.abs(Math.sin(segmentT * Math.PI * 2.3)) * (throwState.bounce.height ?? 34) * damping;
  }
  return getParabolicArcHeight(t, throwState.arcHeight ?? 42);
}

function getParabolicArcHeight(t, maxHeight) {
  const clamped = clamp(t, 0, 1);
  return Math.max(0, maxHeight * 4 * clamped * (1 - clamped));
}

function drawSwingEffect() {
  if (!swingState.isSwinging) return;
  if (isBuntStanceActive()) return;
  drawBatDebugPath();
  const progress = getSwingProgress();
  ctx.strokeStyle = `rgba(255, 242, 168, ${1 - progress * 0.7})`;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(batter.x + (activeBatterSide === "R" ? -68 : 68), batter.y - 50, 88, Math.PI * 1.03, Math.PI * (1.64 + progress * 0.25));
  ctx.stroke();
}

function drawBatDebugPath() {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const current = getBatSegment();
  const hitWidth = getVisibleBatHitWidth();
  const sweetSpot = getSweetSpotSegment(getSweetSpotReferenceSegment(current));

  ctx.strokeStyle = "rgba(255, 255, 255, 0.055)";
  ctx.lineWidth = hitWidth;
  drawLine(current.x1, current.y1, current.x2, current.y2);

  ctx.strokeStyle = "rgba(255, 214, 102, 0.22)";
  ctx.lineWidth = hitWidth + 4;
  drawLine(sweetSpot.x1, sweetSpot.y1, sweetSpot.x2, sweetSpot.y2);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 3;
  drawLine(current.x1, current.y1, current.x2, current.y2);

  ctx.strokeStyle = "rgba(35, 48, 71, 0.18)";
  ctx.lineWidth = 1.2;
  drawLine(current.x1, current.y1, current.x2, current.y2);
  ctx.restore();
}

function getVisibleBatHitWidth() {
  const inGoodContactZone = isBallInGoodContactZone();
  const outsideStrikeZone = distanceToHomePlate(ball.x, ball.y, ball.radius) > 0;
  const meetBonus = (getEffectiveBatterMeet(activeBatter) - 5) * 3;
  const outsideReachBonus = outsideStrikeZone && isOutsideContactPoint(ball.x) ? ball.radius * 2 : 0;
  return Math.max(14, ((inGoodContactZone ? ball.radius + 48 : outsideStrikeZone ? ball.radius + 18 : ball.radius + 28) + meetBonus + outsideReachBonus) * batThicknessMultiplier * meetZoneWidthScale * getMeetBatContactScale());
}

function getSweetSpotSegment(segment) {
  const center = 0.68;
  const halfWidth = getSweetSpotHalfWidth("visual");
  const start = clamp(center - halfWidth, 0, 1);
  const end = clamp(center + halfWidth, 0, 1);
  return {
    x1: segment.x1 + (segment.x2 - segment.x1) * start,
    y1: segment.y1 + (segment.y2 - segment.y1) * start,
    x2: segment.x1 + (segment.x2 - segment.x1) * end,
    y2: segment.y1 + (segment.y2 - segment.y1) * end
  };
}

function drawHud() {
  drawPanel(18, 18, 360, 164, "#233047");
  ctx.fillStyle = "#fff2a8";
  ctx.font = "bold 24px monospace";
  const modeLabel = isHomeRunDerbyMode() ? getHomeRunDerbyModeLabel() : isBattingPracticeMode() ? "MODE: 打撃練習" : isPitchingPracticeMode() ? "MODE: 投球練習" : gameMode === "single" ? `MODE: 1人用 vs ${teamLabel("home")}` : gameMode === "watch" ? "MODE: 観戦モード" : "MODE: 2人用";
  ctx.fillText(modeLabel, 38, 52);
  ctx.fillStyle = "#f8f3d8";
  ctx.font = "bold 22px monospace";
  if (isHomeRunDerbyMode()) {
    const team = homeRunDerbyState.currentTeam || battingTeam;
    const ballsText = homeRunDerbyState.round === "sudden"
      ? `SD ${homeRunDerbyState.suddenRound || 1}  ${teamLabel(team)}`
      : `${teamLabel(team)} ${(homeRunDerbyState.balls?.[team] || 0) + 1}/${HOME_RUN_DERBY_REGULATION_BALLS}球`;
    ctx.fillText(`A ${scores.away} - B ${scores.home}`, 38, 86);
    ctx.fillText(ballsText, 38, 120);
    ctx.font = "bold 17px monospace";
    ctx.fillText(isHomeRunDerbyLastRegulationBall(team) ? "最終球: HR 2点" : "HR 1点", 38, 150);
  } else {
    ctx.fillText(`${inning}${half === "top" ? "表" : "裏"}  A ${scores.away} - B ${scores.home}`, 38, 86);
    ctx.fillText(`S ${Math.min(count.strikes, 2)}  B ${Math.min(count.balls, 3)}  O ${Math.min(count.outs, 2)}`, 38, 120);
    drawBaseRunnerIndicator(306, 78);
    drawBaseRunnerNames(38, 148);
  }
  drawPitchingMilestoneStatus();
  drawLastGamepadButton();
  if (gamePhase === "defense") drawDefenseHud();
}

function drawPitchingMilestoneStatus() {
  if (["menu", "gameover"].includes(gamePhase) || isAnyPracticeMode()) return;
  const achievements = teamIds
    .map((team) => getPitchingAchievement(team, false))
    .filter(Boolean);
  achievements.forEach((achievement, index) => {
    const width = achievement.perfect ? 350 : 420;
    const height = 30;
    const x = (canvas.width - width) / 2;
    const y = 16 + index * 36;
    ctx.save();
    if (achievement.perfect) {
      const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
      gradient.addColorStop(0, "rgba(225, 201, 109, 0.94)");
      gradient.addColorStop(1, "rgba(143, 196, 223, 0.94)");
      ctx.fillStyle = gradient;
      ctx.strokeStyle = "#477f9f";
    } else {
      ctx.fillStyle = "rgba(217, 173, 50, 0.94)";
      ctx.strokeStyle = "#8b6812";
    }
    ctx.lineWidth = 2;
    roundRect(x, y, width, height, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = achievement.perfect ? "#173f5b" : "#3e2d05";
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${teamLabel(achievement.team)} ${achievement.pitcherName} ${achievement.displayLabel}`, x + width / 2, y + height / 2 + 1);
    ctx.restore();
  });
}

function drawLastGamepadButton() {
  const last = gamepadState.lastButton;
  if (!Number.isFinite(last?.index) || !last.time) return;
  const age = performance.now() - last.time;
  if (age > 4200) return;
  const alpha = age > 3200 ? clamp(1 - (age - 3200) / 1000, 0, 1) : 1;
  const x = canvas.width - 142;
  const y = 18;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(18, 32, 42, 0.88)";
  roundRect(x, y, 124, 42, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(174, 231, 255, 0.72)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#aee7ff";
  ctx.font = "bold 12px sans-serif";
  ctx.fillText(last.team === "home" ? "2P" : "1P", x + 12, y + 17);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 22px monospace";
  ctx.fillText(`BTN ${last.index}`, x + 44, y + 29);
  ctx.restore();
}

function drawPitchSpeedDisplay() {
  if (gamePhase !== "playing") return;
  const text = lastPitchSpeedKmh == null ? "--- km/h" : `${lastPitchSpeedKmh} km/h`;
  const x = activeBatterSide === "R" ? field.plateX + 92 : field.plateX - 268;
  const y = field.plateY - 118;
  ctx.save();
  ctx.fillStyle = "rgba(18, 32, 42, 0.9)";
  roundRect(x, y, 176, 58, 8);
  ctx.fill();
  ctx.strokeStyle = "#aee7ff";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#aee7ff";
  ctx.font = "bold 15px sans-serif";
  ctx.fillText("球速", x + 16, y + 22);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 28px monospace";
  ctx.fillText(text, x + 16, y + 48);
  ctx.restore();
}

function drawBaseRunnerIndicator(x, y) {
  const size = 17;
  drawHudBaseDiamond(x, y - 22, size, Boolean(bases.second));
  drawHudBaseDiamond(x + 24, y + 2, size, Boolean(bases.first));
  drawHudBaseDiamond(x - 24, y + 2, size, Boolean(bases.third));
}

function drawBaseRunnerNames(x, y) {
  ctx.save();
  ctx.font = "bold 16px sans-serif";
  ctx.fillStyle = "#f8f3d8";
  const entries = [
    ["1塁", bases.first],
    ["2塁", bases.second],
    ["3塁", bases.third]
  ];
  entries.forEach(([label, runner], index) => {
    const text = runner ? `${label}:${runner.name}` : `${label}:---`;
    ctx.fillStyle = runner ? "#fff2a8" : "rgba(248, 243, 216, 0.58)";
    fitHudText(text, x + index * 108, y, 100);
  });
  ctx.restore();
}

function fitHudText(text, x, y, maxWidth) {
  let fontSize = 16;
  ctx.font = `bold ${fontSize}px sans-serif`;
  while (ctx.measureText(text).width > maxWidth && fontSize > 11) {
    fontSize -= 1;
    ctx.font = `bold ${fontSize}px sans-serif`;
  }
  ctx.fillText(text, x, y);
}

function drawHudBaseDiamond(x, y, size, occupied) {
  const half = size / 2;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y - half);
  ctx.lineTo(x + half, y);
  ctx.lineTo(x, y + half);
  ctx.lineTo(x - half, y);
  ctx.closePath();
  ctx.fillStyle = occupied ? "#d7372f" : "#3d4b52";
  ctx.strokeStyle = occupied ? "#ffb3a8" : "#9eaeb3";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawDefenseHud() {
  if (!defenseState.active) return;
  drawMiniDefenseField(1010, 104, 240, 176);
}

function drawMiniDefenseField(x, y, width, height) {
  const home = defenseField.bases.home;
  const project = (point) => {
    const outDepth = home.y - point.y;
    return {
      x: clamp(x + width / 2 + ((point.x - home.x) / defenseField.fenceDistance) * width * 0.48, x + 12, x + width - 12),
      y: clamp(y + height - 20 - (outDepth / defenseField.fenceDistance) * (height - 38), y + 12, y + height - 12)
    };
  };
  const basePoints = {
    home: project(defenseField.bases.home),
    first: project(defenseField.bases.first),
    second: project(defenseField.bases.second),
    third: project(defenseField.bases.third)
  };

  ctx.save();
  ctx.fillStyle = "rgba(18, 32, 42, 0.88)";
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 242, 168, 0.75)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "rgba(92, 168, 91, 0.72)";
  ctx.beginPath();
  ctx.arc(x + width / 2, y + height - 18, width * 0.52, Math.PI, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(216, 149, 72, 0.78)";
  ctx.beginPath();
  ctx.moveTo(basePoints.home.x, basePoints.home.y);
  ctx.lineTo(basePoints.first.x, basePoints.first.y);
  ctx.lineTo(basePoints.second.x, basePoints.second.y);
  ctx.lineTo(basePoints.third.x, basePoints.third.y);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(basePoints.home.x, basePoints.home.y);
  ctx.lineTo(basePoints.first.x, basePoints.first.y);
  ctx.lineTo(basePoints.second.x, basePoints.second.y);
  ctx.lineTo(basePoints.third.x, basePoints.third.y);
  ctx.closePath();
  ctx.stroke();

  Object.values(basePoints).forEach((base) => {
    ctx.fillStyle = "#fff8df";
    ctx.beginPath();
    ctx.rect(base.x - 4, base.y - 4, 8, 8);
    ctx.fill();
  });

  const heldBase = defenseState.heldBallBase;
  if (heldBase && basePoints[heldBase]) {
    const p = basePoints[heldBase];
    ctx.fillStyle = "#ffe374";
    ctx.strokeStyle = "#102833";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#102833";
    ctx.font = "bold 9px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("B", p.x, p.y);
  }

  defenseState.fielders.forEach((fielder) => {
    const p = project({ x: fielder.currentX ?? fielder.x, y: fielder.currentY ?? fielder.y });
    const chosen = fielder.role === defenseState.chosenFielder?.role;
    ctx.fillStyle = chosen ? "#ffe374" : "#aee7ff";
    ctx.strokeStyle = "#102833";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(p.x, p.y, chosen ? 7 : 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#102833";
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(fielder.role, p.x, p.y);
  });

  const visibleBaseRunners = getVisibleDefenseBaseRunners();
  if (visibleBaseRunners.length) {
    visibleBaseRunners.forEach((runner) => {
      const runnerPoint = project(runner);
      ctx.fillStyle = runner.scored && runner.arrived ? "#ffcf70" : "#ff9f43";
      ctx.strokeStyle = "#102833";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(runnerPoint.x, runnerPoint.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#102833";
      ctx.font = "bold 9px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(runner.scored ? "H" : "R", runnerPoint.x, runnerPoint.y);
    });
  }

  if (defenseState.runner && !isBatterRunnerOutOnCompletedForce()) {
    const runnerPoint = project(defenseState.runner);
    ctx.fillStyle = "#ff6f61";
    ctx.strokeStyle = "#102833";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(runnerPoint.x, runnerPoint.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  if (ball.active) {
    const ballPoint = project(ball);
    ctx.fillStyle = "#fff2a8";
    ctx.strokeStyle = "#102833";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballPoint.x, ballPoint.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#102833";
    ctx.font = "bold 8px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("B", ballPoint.x, ballPoint.y);
  }

  ctx.restore();
}

function getDefensePredictionLabel(outcome) {
  if (!outcome) return "---";
  if (outcome.label === "フェンス直撃" && outcome.scoreType === "double") return "フェンス直撃 2ベース";
  if (outcome.scoreType && scoringHitTypes.has(outcome.scoreType)) return getHitLabelByScoreType(outcome.scoreType);
  return outcome.label;
}

function getDefenseStateLabel(elapsedSeconds) {
  const outcome = defenseState.outcome;
  const throwState = defenseState.throw;
  if (throwState) {
    if (!Number.isFinite(throwState.startTime)) return "送球先を選択";
    if (elapsedSeconds < throwState.startTime) return "送球準備";
    if (elapsedSeconds <= throwState.endTime) return `${throwState.baseLabel}へ送球中`;
    return throwState.safe ? `${throwState.baseLabel}セーフ` : `${throwState.baseLabel}アウト`;
  }
  if (outcome.kind === "out") return "フライ/ライナー捕球";
  if (outcome.kind === "homer") return "ホームラン";
  if (outcome.label === "フェンス直撃") return "フェンス直撃";
  return "打球処理中";
}

function drawPlayersInfo() {
  drawPitcherGameCard(
    pitcher.x + 105,
    pitcher.y + 28,
    activePitcher
  );
  drawBatterGameCard(
    canvas.width - 356,
    canvas.height - 130,
    activeBatter
  );
}

function drawBattingFeedback() {
  if (!battingFeedback.active || !battingFeedback.lines?.length) return;
  const age = performance.now() - battingFeedback.startTime;
  if (!isAnyPracticeMode() && age > 5200) {
    battingFeedback.active = false;
    return;
  }
  const alpha = isAnyPracticeMode() ? 1 : age > 4300 ? clamp(1 - (age - 4300) / 900, 0, 1) : 1;
  const width = 410;
  const lineHeight = 22;
  const height = 54 + battingFeedback.lines.length * lineHeight + 16;
  const x = 18;
  const y = canvas.height - height - 18;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(20, 30, 44, 0.88)";
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 242, 168, 0.85)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#fff2a8";
  ctx.font = "bold 16px sans-serif";
  ctx.fillText("打撃チェック", x + 16, y + 25);
  ctx.fillStyle = "#ffffff";
  ctx.font = "14px sans-serif";
  battingFeedback.lines.forEach((line, index) => {
    fitText(line, x + 16, y + 52 + index * lineHeight, width - 32);
  });
  ctx.restore();
}

function drawPitcherGameCard(x, y, player) {
  const width = 344;
  const height = 254;
  const safeX = clamp(x, 18, canvas.width - width - 18);
  const safeY = clamp(y, 100, canvas.height - height - 18);
  drawAbilityCardFrame(safeX, safeY, width, height, "投手能力", player.name, "#3787bd");
  drawGameStatRow(safeX + 16, safeY + 54, 150, "球速", `${player.fastKmh} km/h`);
  drawGameStatRow(safeX + 182, safeY + 54, 144, "制球", player.control ?? 5);
  drawGameStatRow(safeX + 182, safeY + 84, 144, "球威", player.stuff ?? 5);
  drawGameStatRow(safeX + 16, safeY + 84, 150, "投球数", player.pitchCount ?? 0);
  drawGameStaminaBar(safeX + 16, safeY + 114, width - 32, player);
  drawGamePitchCross(safeX + 72, safeY + 148, player);
}

function drawPitcherGameRecordsBoard() {
  if (gamePhase !== "gameover") return;
  drawGameResultBoard();
  return;
  const width = 760;
  const x = (canvas.width - width) / 2;
  const awayEntries = getPitcherGameRecordEntries("away");
  const homeEntries = getPitcherGameRecordEntries("home");
  const maxRows = Math.max(awayEntries.length || 1, homeEntries.length || 1);
  const rowHeight = 46;
  const height = 154 + maxRows * rowHeight;
  const y = clamp(208, 90, canvas.height - height - 28);

  ctx.save();
  ctx.fillStyle = "rgba(20, 30, 44, 0.9)";
  roundRect(x, y, width, height, 10);
  ctx.fill();
  ctx.strokeStyle = "#f3d57c";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "#fff2a8";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText("試合結果", x + width / 2, y + 38);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText(message, x + width / 2, y + 72);

  ctx.textAlign = "left";
  ctx.font = "bold 18px sans-serif";
  ctx.fillStyle = "#aee7ff";
  ctx.fillText(`${teamLabel("away")} 投手記録`, x + 34, y + 112);
  ctx.fillText(`${teamLabel("home")} 投手記録`, x + width / 2 + 34, y + 112);

  drawPitcherGameRecordColumn(x + 34, y + 142, width / 2 - 62, awayEntries, rowHeight);
  drawPitcherGameRecordColumn(x + width / 2 + 34, y + 142, width / 2 - 62, homeEntries, rowHeight);
  ctx.restore();
}

function drawGameResultBoard() {
  const board = { x: 28, y: 18, width: canvas.width - 56, height: canvas.height - 36 };
  ctx.save();
  ctx.fillStyle = "rgba(248, 251, 255, 0.98)";
  roundRect(board.x, board.y, board.width, board.height, 8);
  ctx.fill();
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#102833";
  ctx.font = "bold 28px sans-serif";
  ctx.fillText("試合結果", board.x + board.width / 2, board.y + 28);
  ctx.font = "bold 20px sans-serif";
  ctx.fillText(`${teamLabel("away")} ${scores.away} - ${scores.home} ${teamLabel("home")}`, board.x + board.width / 2, board.y + 58);
  drawGameResultScoreTable(board.x + 24, board.y + 78, board.width - 48, 86);
  const halfWidth = (board.width - 68) / 2;
  drawGameResultBattingTable("away", board.x + 24, board.y + 184, halfWidth, 330);
  drawGameResultBattingTable("home", board.x + 44 + halfWidth, board.y + 184, halfWidth, 330);
  drawGameResultPitchingTable("away", board.x + 24, board.y + 536, halfWidth, 250);
  drawGameResultPitchingTable("home", board.x + 44 + halfWidth, board.y + 536, halfWidth, 250);
  ctx.restore();
}

function getBattingGameRecordEntries(team) {
  return Object.values(batterGameRecords[team] || {})
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999)
      || (a.entrySequence ?? 999) - (b.entrySequence ?? 999)
      || a.name.localeCompare(b.name))
    .filter((record) => record.appeared
      || record.plateAppearances > 0
      || selected?.[team]?.batters?.some((entry) => entry?.player?.id === record.id));
}

function getTeamHitsFromBatters(team) {
  return getBattingGameRecordEntries(team).reduce((total, record) => total + (record.hits || 0), 0);
}

function getLineScoreInningCount() {
  return Math.max(maxInnings, inningScores.away.length, inningScores.home.length, inning);
}

function formatBattingAverage(record) {
  if (!record.atBats) return ".---";
  return (record.hits / record.atBats).toFixed(3).replace(/^0/, "");
}

function calculateBattingOnBasePercentage(record) {
  const denominator = (record.atBats || 0)
    + (record.walks || 0)
    + (record.hbp || 0)
    + (record.sacrificeFlies || 0);
  if (!denominator) return null;
  return ((record.hits || 0) + (record.walks || 0) + (record.hbp || 0)) / denominator;
}

function calculateBattingSluggingPercentage(record) {
  const atBats = record.atBats || 0;
  if (!atBats) return null;
  const doubles = record.doubles || 0;
  const triples = record.triples || 0;
  const homeRuns = record.homeRuns || 0;
  const singles = Math.max(0, (record.hits || 0) - doubles - triples - homeRuns);
  const totalBases = singles + doubles * 2 + triples * 3 + homeRuns * 4;
  return totalBases / atBats;
}

function formatBattingOps(record) {
  const onBasePercentage = calculateBattingOnBasePercentage(record);
  const sluggingPercentage = calculateBattingSluggingPercentage(record);
  if (onBasePercentage == null && sluggingPercentage == null) return ".---";
  return ((onBasePercentage || 0) + (sluggingPercentage || 0)).toFixed(3).replace(/^0/, "");
}

function getTeamTimesReachedBase(team) {
  return getBattingGameRecordEntries(team).reduce((total, record) => {
    if (Number.isFinite(record.timesReachedBase)) return total + record.timesReachedBase;
    return total
      + (record.hits || 0)
      + (record.walks || 0)
      + (record.hbp || 0)
      + (record.errorsReached || 0);
  }, 0);
}

function getPitchingAchievement(team, final = gamePhase === "gameover") {
  if (isAnyPracticeMode()) return null;
  const opponent = team === "away" ? "home" : "away";
  const entries = getPitcherGameRecordEntries(team);
  const starter = entries.find((record) => record.started);
  const minimumOuts = final ? 27 : 18;
  const completedByStarter = entries.length === 1 && starter && starter.outs >= minimumOuts;
  if (!completedByStarter || (starter.hitsAllowed || 0) > 0 || (scores[opponent] || 0) > 0) return null;
  if (final && (scores[team] || 0) <= (scores[opponent] || 0)) return null;
  if (!final && gamePhase === "gameover") return null;
  const perfect = getTeamTimesReachedBase(opponent) === 0 && !automaticTiebreakRunnerUsed[opponent];
  return {
    team,
    pitcherId: starter.id,
    pitcherName: starter.name,
    perfect,
    label: perfect ? "完全試合" : "ノーヒットノーラン",
    displayLabel: `${perfect ? "完全試合" : "ノーヒットノーラン"}${final ? "" : "継続中"}`
  };
}

function formatPitcherEra(record) {
  if (!record.outs) return "--";
  return ((record.earnedRunsAllowed || 0) * 27 / record.outs).toFixed(2);
}

function drawGameResultTableCell(text, x, y, width, height, options = {}) {
  ctx.fillStyle = options.fill || "#ffffff";
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "#d9dee7";
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = options.color || "#102833";
  const fontSize = options.fontSize || 12;
  const weight = options.bold ? "bold" : "normal";
  ctx.font = `${weight} ${fontSize}px sans-serif`;
  ctx.textAlign = options.align || "center";
  ctx.textBaseline = "middle";
  const tx = options.align === "left" ? x + 6 : options.align === "right" ? x + width - 6 : x + width / 2;
  drawGameResultFittedText(String(text ?? ""), tx, y + height / 2, width - 8, fontSize, weight, ctx.textAlign);
}

function drawGameResultScoreTable(x, y, width, height) {
  const inningCount = getLineScoreInningCount();
  const nameWidth = 140;
  const totalWidth = 48;
  const hitWidth = 48;
  const inningWidth = Math.max(30, (width - nameWidth - totalWidth - hitWidth) / inningCount);
  const rowHeight = height / 3;
  drawGameResultTableCell("", x, y, nameWidth, rowHeight, { fill: "#e9edf2", bold: true });
  for (let i = 0; i < inningCount; i += 1) {
    drawGameResultTableCell(i + 1, x + nameWidth + i * inningWidth, y, inningWidth, rowHeight, { fill: "#e9edf2", bold: true });
  }
  drawGameResultTableCell("計", x + nameWidth + inningCount * inningWidth, y, totalWidth, rowHeight, { fill: "#e9edf2", bold: true });
  drawGameResultTableCell("安", x + nameWidth + inningCount * inningWidth + totalWidth, y, hitWidth, rowHeight, { fill: "#e9edf2", bold: true });
  teamIds.forEach((team, row) => {
    const rowY = y + rowHeight * (row + 1);
    drawGameResultTableCell(teamLabel(team), x, rowY, nameWidth, rowHeight, { align: "left", bold: true, color: "#0023b8" });
    for (let i = 0; i < inningCount; i += 1) {
      drawGameResultTableCell(inningScores[team]?.[i] || 0, x + nameWidth + i * inningWidth, rowY, inningWidth, rowHeight, { color: "#0023b8" });
    }
    drawGameResultTableCell(scores[team], x + nameWidth + inningCount * inningWidth, rowY, totalWidth, rowHeight, { fill: "#f4f4f4", bold: true });
    drawGameResultTableCell(getTeamHitsFromBatters(team), x + nameWidth + inningCount * inningWidth + totalWidth, rowY, hitWidth, rowHeight, { fill: "#f4f4f4", bold: true });
  });
}

function drawGameResultSectionTitle(title, x, y, width) {
  ctx.fillStyle = "#233047";
  ctx.font = "bold 16px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  drawGameResultFittedText(title, x, y, width, 16, "bold", "left");
}

function drawGameResultFittedText(text, x, y, maxWidth, startSize = 12, weight = "normal", align = "center") {
  let fontSize = startSize;
  ctx.textAlign = align;
  ctx.font = `${weight} ${fontSize}px sans-serif`;
  while (ctx.measureText(text).width > maxWidth && fontSize > 8) {
    fontSize -= 1;
    ctx.font = `${weight} ${fontSize}px sans-serif`;
  }
  ctx.fillText(text, x, y);
}

function drawGameResultBattingTable(team, x, y, width, height) {
  drawGameResultSectionTitle(`${teamLabel(team)} 打撃成績`, x, y - 12, width);
  const headers = ["守", "選手名", "率", "OPS", "打", "得", "安", "点", "二", "三", "本", "振", "四", "死", "犠打", "犠飛", "失"];
  const colWidths = [30, 116, 42, 45, 28, 28, 28, 28, 26, 26, 26, 26, 26, 26, 32, 32, 26];
  const scale = width / colWidths.reduce((sum, value) => sum + value, 0);
  const widths = colWidths.map((value) => value * scale);
  const rowHeight = 26;
  const maxRows = Math.max(0, Math.floor(height / rowHeight) - 1);
  drawGameResultRow(headers, x, y, widths, rowHeight, { fill: "#e9edf2", bold: true, fontSize: 11 });
  getBattingGameRecordEntries(team).slice(0, maxRows).forEach((record, index) => {
    const values = [
      getMenuRoleLabel(record.role).slice(0, 2),
      record.name,
      formatBattingAverage(record),
      formatBattingOps(record),
      record.atBats,
      record.runs,
      record.hits,
      record.rbi,
      record.doubles,
      record.triples,
      record.homeRuns,
      record.strikeouts,
      record.walks,
      record.hbp,
      record.sacrificeBunts || 0,
      record.sacrificeFlies || 0,
      record.errorsReached
    ];
    drawGameResultRow(values, x, y + rowHeight * (index + 1), widths, rowHeight, { fontSize: 11, nameColumn: 1 });
  });
}

function drawGameResultPitchingTable(team, x, y, width, height) {
  drawGameResultSectionTitle(`${teamLabel(team)} 投手成績`, x, y - 12, width);
  drawPitchingAchievementBadge(team, x, y - 12, width);
  const headers = ["勝敗", "選手名", "防御率", "回", "球", "打者", "安", "本", "三", "四死", "失", "責"];
  const colWidths = [40, 118, 50, 36, 40, 40, 30, 30, 30, 36, 30, 30];
  const scale = width / colWidths.reduce((sum, value) => sum + value, 0);
  const widths = colWidths.map((value) => value * scale);
  const rowHeight = 30;
  drawGameResultRow(headers, x, y, widths, rowHeight, { fill: "#e9edf2", bold: true, fontSize: 11 });
  getPitcherGameRecordEntries(team).slice(0, 6).forEach((record, index) => {
    const battersFaced = (record.outs || 0) + (record.hitsAllowed || 0) + (record.walksAllowed || 0);
    const values = [
      formatPitcherDecisionLabelsPlain(record),
      record.name,
      formatPitcherEra(record),
      record.innings,
      record.pitchCount || 0,
      battersFaced,
      record.hitsAllowed || 0,
      record.homeRunsAllowed || 0,
      record.strikeouts || 0,
      record.walksAllowed || 0,
      record.runsAllowed || 0,
      record.earnedRunsAllowed || 0
    ];
    drawGameResultRow(values, x, y + rowHeight * (index + 1), widths, rowHeight, { fontSize: 11, nameColumn: 1 });
  });
}

function drawPitchingAchievementBadge(team, x, y, width) {
  const achievement = getPitchingAchievement(team, true);
  if (!achievement) return;
  const badgeWidth = achievement.perfect ? 112 : 152;
  const badgeHeight = 24;
  const badgeX = x + width - badgeWidth;
  const badgeY = y - badgeHeight / 2;
  ctx.save();
  if (achievement.perfect) {
    const gradient = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeWidth, badgeY + badgeHeight);
    gradient.addColorStop(0, "#e1c96d");
    gradient.addColorStop(1, "#8fc4df");
    ctx.fillStyle = gradient;
    ctx.strokeStyle = "#477f9f";
  } else {
    ctx.fillStyle = "#d9ad32";
    ctx.strokeStyle = "#8b6812";
  }
  ctx.lineWidth = 2;
  roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 6);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = achievement.perfect ? "#173f5b" : "#3e2d05";
  ctx.font = "bold 13px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(achievement.displayLabel, badgeX + badgeWidth / 2, badgeY + badgeHeight / 2 + 1);
  ctx.restore();
}

function formatPitcherDecisionLabelsPlain(record) {
  if (record.win) return "勝";
  if (record.loss) return "敗";
  if (record.save) return "S";
  if (record.hold) return "H";
  return "";
}

function drawGameResultRow(values, x, y, widths, height, options = {}) {
  let cx = x;
  values.forEach((value, index) => {
    drawGameResultTableCell(value, cx, y, widths[index], height, {
      fill: options.fill,
      bold: options.bold,
      fontSize: options.fontSize,
      align: index === options.nameColumn ? "left" : "center",
      color: index === options.nameColumn ? "#0023b8" : "#102833"
    });
    cx += widths[index];
  });
}

function drawPitcherGameRecordColumn(x, y, width, entries, rowHeight) {
  if (!entries.length) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "16px sans-serif";
    ctx.fillText("登板なし", x, y + 16);
    return;
  }
  entries.forEach((record, index) => {
    const rowY = y + index * rowHeight;
    ctx.fillStyle = record.win || record.save || record.hold ? "#fff2a8" : "#ffffff";
    drawFittedBoardText(`${record.name}投手 ${record.innings}イニング${formatPitcherDecisionLabels(record)}`, x, rowY + 15, width - 88, 15, "bold");
    drawFittedBoardText(`投球数${record.pitchCount || 0}`, x + width - 84, rowY + 15, 84, 13, "bold");
    ctx.fillStyle = "#dfeaf2";
    drawFittedBoardText(`奪三振${record.strikeouts || 0}  被安打${record.hitsAllowed || 0}  失点${record.runsAllowed || 0}  四死球${record.walksAllowed || 0}`, x, rowY + 35, width, 13, "normal");
  });
}

function drawFittedBoardText(text, x, y, maxWidth, startSize = 14, weight = "normal") {
  let fontSize = startSize;
  ctx.font = `${weight} ${fontSize}px sans-serif`;
  while (ctx.measureText(text).width > maxWidth && fontSize > 10) {
    fontSize -= 1;
    ctx.font = `${weight} ${fontSize}px sans-serif`;
  }
  ctx.fillText(text, x, y);
}

function drawBatterGameCard(x, y, player) {
  const width = 300;
  const height = 118;
  const safeX = clamp(x, 18, canvas.width - width - 18);
  const safeY = clamp(y, 100, canvas.height - height - 18);
  drawAbilityCardFrame(safeX, safeY, width, height, "打者能力", player.name, "#d84e5f");
  drawGameStatRow(safeX + 16, safeY + 56, 126, "パワー", player.power);
  drawGameStatRow(safeX + 158, safeY + 56, 126, "ミート", player.meet);
  drawGameStatRow(safeX + 16, safeY + 86, 126, "走塁", player.run);
  drawGameStatRow(safeX + 158, safeY + 86, 126, "打席", handLabel(activeBatterSide));
}

function drawAbilityCardFrame(x, y, width, height, role, name, headerColor) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(x + 5, y + 5, width, height);
  ctx.fillStyle = "rgba(248, 251, 255, 0.96)";
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "#78acd0";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = headerColor;
  ctx.fillRect(x, y, width, 40);
  ctx.strokeStyle = "#78acd0";
  ctx.lineWidth = 3;
  drawLine(x, y + 40, x + width, y + 40);
  ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
  roundRect(x + 10, y + 8, 76, 24, 6);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText(role, x + 18, y + 26);
  ctx.font = "bold 24px sans-serif";
  fitText(name, x + 98, y + 28, width - 112);
}

function drawGameStatRow(x, y, width, label, value) {
  ctx.fillStyle = "#eaf6ff";
  roundRect(x, y, width, 24, 7);
  ctx.fill();
  ctx.strokeStyle = "#b8d8ea";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#233047";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText(label, x + 8, y + 16);
  ctx.textAlign = "right";
  ctx.font = "bold 17px sans-serif";
  ctx.fillText(String(value), x + width - 8, y + 18);
  ctx.textAlign = "left";
}

function drawGamePitchCross(x, y, player) {
  drawCrossCell(x + 66, y, 66, 32, "減速", player.slowChange);
  drawCrossCell(x, y + 38, 66, 32, "左", player.leftBreak);
  ctx.fillStyle = "#3787bd";
  roundRect(x + 72, y + 38, 54, 32, 8);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("変化", x + 85, y + 59);
  drawCrossCell(x + 132, y + 38, 66, 32, "右", player.rightBreak);
  drawCrossCell(x + 66, y + 76, 66, 32, "加速", player.fastChange);
}

function drawCrossCell(x, y, width, height, label, value) {
  ctx.fillStyle = "#ffffff";
  roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.strokeStyle = "#a9cce2";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#39749b";
  ctx.font = "bold 12px sans-serif";
  ctx.fillText(label, x + 8, y + 20);
  ctx.textAlign = "right";
  ctx.fillStyle = "#213a56";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText(String(value), x + width - 8, y + 23);
  ctx.textAlign = "left";
}

function drawMiniHelp() {
  drawPanel(18, 698, 368, 130, "rgba(255, 240, 184, 0.9)");
  ctx.fillStyle = "#233047";
  ctx.font = "bold 14px sans-serif";
  const gamepadCount = getConnectedGamepads().length;
  ctx.fillText(`Pad認識: ${gamepadCount}台 / チームA=1P チームB=2P`, 34, 724);
  ctx.fillText("打撃: 左スティック移動 / ボタン2強スイング / ボタン1弱スイング", 34, 750);
  ctx.fillText("走塁: A+方向 進塁 / B+方向 帰塁 / X全進 / Y全帰", 34, 776);
  ctx.fillText("投球: A速球 B直球 Y遅球 X決め球", 34, 802);
  ctx.fillText("守備: 左スティック方向 + ボタン2 送球", 34, 824);
}

function drawHitEffect() {
  if (!hitEffect.active) return;
  const t = (performance.now() - hitEffect.startTime) / 1000;
  ctx.save();
  ctx.globalAlpha = 1 - t * 0.34;
  ctx.fillStyle = hitEffect.color;
  ctx.strokeStyle = "#233047";
  ctx.lineWidth = 7;
  ctx.font = "bold 58px sans-serif";
  ctx.textAlign = "center";
  ctx.strokeText(hitEffect.text, field.centerX, 390 - t * 52);
  ctx.fillText(hitEffect.text, field.centerX, 390 - t * 52);
  ctx.restore();
}

function drawPanel(x, y, width, height, color) {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(x + 5, y + 5, width, height);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "#f3d57c";
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, width, height);
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function roundRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function fitText(text, x, y, maxWidth) {
  let fontSize = 24;
  ctx.font = `bold ${fontSize}px sans-serif`;
  while (ctx.measureText(text).width > maxWidth && fontSize > 15) {
    fontSize -= 1;
    ctx.font = `bold ${fontSize}px sans-serif`;
  }
  ctx.fillText(text, x, y);
}

function distancePointToSegment(px, py, x1, y1, x2, y2) {
  return closestPointOnSegment(px, py, x1, y1, x2, y2).distance;
}

function closestPointOnSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;
  if (lengthSq === 0) return { distance: Math.hypot(px - x1, py - y1), t: 0 };
  const t = clamp(((px - x1) * dx + (py - y1) * dy) / lengthSq, 0, 1);
  return { distance: Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy)), t };
}

function getSweetSpotScore(t) {
  const center = 0.68;
  const halfWidth = getSweetSpotHalfWidth("score") * 1.5;
  const normalizedDistance = Math.abs(t - center) / Math.max(halfWidth, 0.0001);
  const contactFloor = 0.15;
  if (normalizedDistance <= 1) {
    return clamp(Math.max(1 - normalizedDistance * 0.32, contactFloor), 0, 1);
  }
  const outsideTailScore = 0.68 * Math.exp(-(normalizedDistance - 1) * 0.22);
  return clamp(Math.max(outsideTailScore, contactFloor), 0, 1);
}

function getSweetSpotReferenceSegment(currentSegment = getBatSegment()) {
  return isBuntStanceActive() ? getRawBuntBatSegment() : currentSegment;
}

function getSweetSpotHalfWidth(type) {
  const meetDelta = getEffectiveBatterMeet(activeBatter) - 5;
  const base = type === "visual" ? sweetSpotTuning.visualBaseHalfWidth : sweetSpotTuning.scoreBaseHalfWidth;
  const step = type === "visual" ? sweetSpotTuning.visualMeetStep : sweetSpotTuning.scoreMeetStep;
  const min = type === "visual" ? sweetSpotTuning.visualMinHalfWidth : sweetSpotTuning.minHalfWidth;
  return clamp(base + meetDelta * step, min, sweetSpotTuning.maxHalfWidth);
}

function normalize(vector) {
  const length = Math.hypot(vector.x, vector.y) || 1;
  return { x: vector.x / length, y: vector.y / length };
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

function batterAngleToCanvasRadians(degreesFromUp) {
  return degreesToRadians(degreesFromUp - 90);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function updateMouseAim(event) {
  const point = getCanvasPoint(event);
  mouseAim = { active: true, x: point.x, y: point.y };
}

function getCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height)
  };
}

function isPointInRect(point, rect) {
  return Boolean(
    point && rect
      && point.x >= rect.x
      && point.x <= rect.x + rect.width
      && point.y >= rect.y
      && point.y <= rect.y + rect.height
  );
}

function gameLoop(time) {
  const delta = Math.min(40, time - lastFrameTime);
  lastFrameTime = time;
  update(delta);
  draw();
  requestAnimationFrame(gameLoop);
}

function drawGameStaminaBar(x, y, width, player) {
  const state = getPitcherStaminaState(player);
  ctx.fillStyle = "#eaf6ff";
  roundRect(x, y, width, 24, 7);
  ctx.fill();
  ctx.strokeStyle = "#b8d8ea";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#233047";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("スタミナ", x + 8, y + 16);
  const barX = x + 82;
  const barY = y + 7;
  const barWidth = width - 148;
  ctx.fillStyle = "#b9c7d1";
  roundRect(barX, barY, barWidth, 10, 5);
  ctx.fill();
  ctx.fillStyle = getGameStaminaColor(state.percent);
  roundRect(barX, barY, barWidth * state.percent, 10, 5);
  ctx.fill();
  drawGameStaminaMarks(barX, barY, barWidth);
  ctx.textAlign = "center";
  ctx.fillStyle = "#162033";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText(getPitcherGameStaminaText(player), barX + barWidth / 2, barY + 9);
  ctx.textAlign = "right";
  ctx.fillStyle = "#233047";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText(state.label, x + width - 8, y + 16);
  ctx.textAlign = "left";
}

function drawGameStaminaMarks(x, y, width) {
  ctx.save();
  ctx.strokeStyle = "rgba(35, 48, 71, 0.58)";
  ctx.lineWidth = 2;
  [0.7, 0.5, 0.3, 0.1].forEach((mark) => {
    const markX = x + width * mark;
    drawLine(markX, y - 1, markX, y + 11);
  });
  ctx.strokeStyle = "rgba(248, 251, 255, 0.5)";
  ctx.lineWidth = 1;
  [0.7, 0.4, 0.2].forEach((mark) => {
    const markX = x + width * mark + 1.5;
    drawLine(markX, y, markX, y + 10);
  });
  ctx.restore();
}

function getGameStaminaColor(percent) {
  if (percent >= 0.7) return "#35a86b";
  if (percent >= 0.4) return "#e0a531";
  if (percent >= 0.2) return "#d86a3d";
  return "#bf4331";
}

window.addEventListener("keydown", (event) => {
  unlockBgmAfterUserGesture();
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) event.preventDefault();
  keysDown.add(event.code);
  keysDown.add(event.key);
  if (isSwitchBatterChoicePending()) {
    if (!event.repeat && event.code === "ArrowLeft") setSwitchBatterChoiceSide("L");
    if (!event.repeat && event.code === "ArrowRight") setSwitchBatterChoiceSide("R");
    if (!event.repeat && event.code === "Enter") confirmSwitchBatterChoice();
    return;
  }
  if (!event.repeat && event.code === "Space" && gamePhase === "playing" && isPlayerBatting()) swingBat();
  // 矢印で進塁、Shift+矢印で帰塁。走りすぎた走者を戻せるようにしている。
  const runnerCommandMode = event.shiftKey ? "return" : "advance";
  if (!event.repeat && event.code === "ArrowUp" && gamePhase === "defense") handleBatterRunnerBaseCommand("second", runnerCommandMode);
  if (!event.repeat && event.code === "ArrowLeft" && gamePhase === "defense") handleBatterRunnerBaseCommand("third", runnerCommandMode);
  if (!event.repeat && event.code === "ArrowDown" && gamePhase === "defense") handleBatterRunnerBaseCommand("home", runnerCommandMode);
  if (!event.repeat && event.code === "ArrowRight" && gamePhase === "defense") handleBatterRunnerBaseCommand("first", runnerCommandMode);
  if (!event.repeat && gamePhase === "defense" && event.key === "6") handleDefenseThrowCommand("first");
  if (!event.repeat && gamePhase === "defense" && event.key === "8") handleDefenseThrowCommand("second");
  if (!event.repeat && gamePhase === "defense" && event.key === "4") handleDefenseThrowCommand("third");
  if (!event.repeat && gamePhase === "defense" && event.key === "2") handleDefenseThrowCommand("home");
  if (event.code === "Enter") nextPitch();
  if (event.key === "r" || event.key === "R") showMenu();
  if (event.key === "o" || event.key === "O") {
    modeSelect.value = "single";
    if (gamePhase !== "menu") switchLiveMode("single");
  }
  if (event.key === "t" || event.key === "T") {
    modeSelect.value = "versus";
    if (gamePhase !== "menu") switchLiveMode("versus");
  }
  if (gamePhase === "playing" && isPlayerPitching() && event.key === "7") movePitcherOnPlate(-1);
  if (gamePhase === "playing" && isPlayerPitching() && event.key === "9") movePitcherOnPlate(1);
  if (gamePhase === "playing" && isPlayerPitching() && event.key === "5") startPitch("normal");
  if (gamePhase === "playing" && isPlayerPitching() && event.key === "8") startPitch("slow");
  if (gamePhase === "playing" && isPlayerPitching() && event.key === "2") startPitch("fast");
  if (gamePhase === "playing" && isPlayerPitching() && event.key === "0") startPitch("special");
});

window.addEventListener("pointerdown", (event) => {
  if (bgmToggleButtons.includes(event.target)) return;
  unlockBgmAfterUserGesture();
});

window.addEventListener("keyup", (event) => {
  keysDown.delete(event.code);
  keysDown.delete(event.key);
  const key = event.code.startsWith("Digit") || event.code.startsWith("Numpad") ? event.code.slice(-1) : event.key;
  releasePitchControlLockout(key);
});

window.addEventListener("blur", () => {
  keysDown.clear();
  gamepadState.virtualKeys.clear();
  clearTeamGamepadHistory();
  releasePitchControlLockout();
});

document.addEventListener?.("visibilitychange", () => {
  if (document.hidden) {
    keysDown.clear();
    gamepadState.virtualKeys.clear();
    clearTeamGamepadHistory();
    releasePitchControlLockout();
  }
});

window.addEventListener?.("gamepadconnected", (event) => {
  syncGamepadAssignments();
  const count = getConnectedGamepads()?.length ?? 0;
  message = count >= 2 ? "ゲームパッド2台接続" : "ゲームパッド接続";
});

window.addEventListener?.("gamepaddisconnected", (event) => {
  teamIds.forEach((team) => {
    if (event.gamepad?.index === gamepadState.teamIndexes[team]) gamepadState.teamIndexes[team] = null;
  });
  syncGamepadAssignments();
  clearGamepadVirtualKeys();
  clearTeamGamepadHistory();
  message = "ゲームパッド切断";
});

canvas.addEventListener("mousemove", (event) => {
  if (gamePhase !== "playing" || !isPlayerBatting()) return;
  updateMouseAim(event);
});

canvas.addEventListener("mouseleave", () => {
  mouseAim.active = false;
});

canvas.addEventListener("mousedown", (event) => {
  if (event.button !== 0) return;
  if (gamePhase === "xStadiumPrompt") {
    event.preventDefault();
    const point = getCanvasPoint(event);
    if (isPointInRect(point, xStadiumPrompt.goRect)) handleXStadiumPromptChoice(true);
    else if (isPointInRect(point, xStadiumPrompt.dontRect)) handleXStadiumPromptChoice(false);
    return;
  }
  if (gamePhase !== "playing" || !isPlayerBatting()) return;
  event.preventDefault();
  updateMouseAim(event);
  swingBat();
});

function switchLiveMode(mode) {
  gameMode = mode;
  scheduleNextPitch(700);
  message = mode === "single" ? "1人用に変更" : "2人用に変更";
}

function handleLineupDragStart(event) {
  const card = event.currentTarget;
  if (card.dataset.kind !== "batter" || isMenuTeamLocked(card.dataset.team)) {
    event.preventDefault();
    return;
  }
  card.classList.add("lineup-slot-dragging");
  event.dataTransfer?.setData("text/plain", JSON.stringify({
    team: card.dataset.team,
    role: card.dataset.role
  }));
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
}

function handleLineupDragOver(event) {
  const card = event.currentTarget;
  if (card.dataset.kind !== "batter" || isMenuTeamLocked(card.dataset.team)) return;
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
}

function handleLineupDrop(event) {
  const targetCard = event.currentTarget;
  if (!batterRoles.includes(targetCard.dataset.role) || isMenuTeamLocked(targetCard.dataset.team)) return;
  event.preventDefault();
  let source = null;
  try {
    source = JSON.parse(event.dataTransfer?.getData("text/plain") || "null");
  } catch {
    source = null;
  }
  if (!source || source.team !== targetCard.dataset.team) return;
  if (swapMenuLineupPlayers(source.team, source.role, targetCard.dataset.role)) {
    updateMenuAbilityPanels();
  }
}

function handleLineupDragEnd(event) {
  event.currentTarget.classList.remove("lineup-slot-dragging");
}

function handleLineupOrderButtonClick(event) {
  const choice = event.target.closest?.(".lineup-order-choice");
  if (choice) {
    event.preventDefault();
    event.stopPropagation();
    if (isMenuTeamLocked(choice.dataset.team)) return true;
    moveMenuLineupRoleToSlot(choice.dataset.team, choice.dataset.role, Number(choice.dataset.orderIndex));
    activeLineupOrderPicker = null;
    updateMenuAbilityPanels();
    return true;
  }
  const button = event.target.closest?.(".lineup-order-button");
  if (!button) return false;
  event.preventDefault();
  event.stopPropagation();
  const team = button.dataset.team;
  const role = button.dataset.role;
  if (!team || !role) return true;
  if (isMenuTeamLocked(team)) return true;
  activeLineupOrderPicker = activeLineupOrderPicker?.team === team && activeLineupOrderPicker?.role === role
    ? null
    : { team, role };
  updateMenuAbilityPanels();
  return true;
}

startButton.addEventListener("click", () => startGame());
modeSelect?.addEventListener("change", () => {
  readMenu();
  updateMenuAbilityPanels();
});
stadiumSelect?.addEventListener("change", () => {
  applyStadiumPreset(stadiumSelect.value);
  updateMenuAbilityPanels();
  draw();
});
awayPresetSelect?.addEventListener("change", () => {
  readMenu();
  updateMenuAbilityPanels();
});
homePresetSelect?.addEventListener("change", () => {
  readMenu();
  updateMenuAbilityPanels();
});
practiceStartButton?.addEventListener("click", () => {
  startGame("practice");
});
pitchingPracticeStartButton?.addEventListener("click", () => {
  startGame("pitchPractice");
});
homeRunDerbyStartButton?.addEventListener("click", () => {
  startGame("homerDerby");
});
practiceBatterSelect?.addEventListener("change", () => {
  practiceBatterId = practiceBatterSelect.value;
});
practicePitcherSelect?.addEventListener("change", () => {
  practicePitcherId = practicePitcherSelect.value;
});
pitchingPracticeBatterTypeSelect?.addEventListener("change", () => {
  pitchingPracticeBatterType = ["A", "B"].includes(pitchingPracticeBatterTypeSelect.value) ? pitchingPracticeBatterTypeSelect.value : "A";
});
homeRunDerbyPlayerCountSelect?.addEventListener("change", () => {
  homeRunDerbyPlayerCount = homeRunDerbyPlayerCountSelect.value === "2" ? 2 : 1;
});
homeRunDerbyAwayBatterSelect?.addEventListener("change", () => {
  homeRunDerbyBatterIds.away = homeRunDerbyAwayBatterSelect.value;
});
homeRunDerbyHomeBatterSelect?.addEventListener("change", () => {
  homeRunDerbyBatterIds.home = homeRunDerbyHomeBatterSelect.value;
});
menuButton.addEventListener("click", showMenu);
playerEditorButton?.addEventListener("click", openPlayerEditor);
playerEditorClose?.addEventListener("click", closePlayerEditor);
playerEditorKind?.addEventListener("change", () => {
  playerEditorState.kind = playerEditorKind.value === "pitcher" ? "pitcher" : "batter";
  playerEditorState.playerId = getPlayerEditorList()[0]?.id ?? "";
  playerEditorState.isNew = false;
  setPlayerEditorStatus("");
  renderPlayerEditor();
});
playerEditorNewButton?.addEventListener("click", createNewEditorPlayer);
playerEditorResetButton?.addEventListener("click", resetRosterToDefaults);
playerEditorList?.addEventListener("click", (event) => {
  const button = event.target.closest(".editor-player-button");
  if (!button) return;
  playerEditorState.playerId = button.dataset.playerId;
  playerEditorState.isNew = false;
  setPlayerEditorStatus("");
  renderPlayerEditor();
});
playerEditorForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  savePlayerEditorForm();
});
awayTeamAutoButton?.addEventListener("click", () => autoFillMenuTeam("away"));
homeTeamAutoButton?.addEventListener("click", () => autoFillMenuTeam("home"));
awayTeamResetButton?.addEventListener("click", () => resetMenuTeam("away"));
homeTeamResetButton?.addEventListener("click", () => resetMenuTeam("home"));
soundToggleButtons.forEach((button) => button.addEventListener("click", toggleSoundEffects));
bgmToggleButtons.forEach((button) => button.addEventListener("click", handleBgmButtonClick));
menuPlayerCards.forEach((card) => {
  const picker = card.querySelector(".position-picker");
  const openCardChooser = (event) => {
    if (handleLineupOrderButtonClick(event)) return;
    openPlayerChooser(card);
  };
  card.addEventListener("click", openCardChooser);
  card.addEventListener("keydown", (event) => {
    if (event.code !== "Enter" && event.code !== "Space") return;
    if (event.target?.closest?.(".lineup-order-button, .lineup-order-choice")) return;
    event.preventDefault();
    openCardChooser();
  });
  card.addEventListener("dragstart", handleLineupDragStart);
  card.addEventListener("dragover", handleLineupDragOver);
  card.addEventListener("drop", handleLineupDrop);
  card.addEventListener("dragend", handleLineupDragEnd);
  picker.addEventListener("click", (event) => {
    event.stopPropagation();
    openCardChooser();
  });
});
chooserClose.addEventListener("click", () => closePlayerChooser("away"));
chooserCloseHome?.addEventListener("click", () => closePlayerChooser("home"));

function getChooserEventTeam(event) {
  return event.target.closest("[data-chooser-team]")?.dataset?.chooserTeam || event.target.closest("[data-team]")?.dataset?.team || chooserSortState.team || "away";
}

function handleChooserOptionsClick(event) {
  if (event.target.closest("[data-sort-key]")) return;
  const originalForm = event.target.closest(".original-player-creator");
  if (originalForm) {
    const stepButton = event.target.closest("[data-original-step-field]");
    if (stepButton) {
      const field = stepButton.dataset.originalStepField;
      const input = originalForm.querySelector(`[data-original-field="${field}"]`);
      if (input) {
        const min = Number(input.dataset.originalMin ?? 1);
        const max = Number(input.dataset.originalMax ?? (field === "cost" ? 10 : 12));
        const step = Number(stepButton.dataset.originalStep ?? 0);
        input.value = String(sanitizeNumber(Number(input.value || 0) + step, min, max, Number(input.value || min)));
        updateOriginalBatterCreatorState(originalForm);
      }
      return;
    }
    const costBadge = event.target.closest(".original-cost-badge");
    if (costBadge) return;
    if (event.target.closest("input, select, button")) return;
    submitOriginalBatterCreator(originalForm);
    return;
  }
  const option = event.target.closest(".chooser-option");
  if (!option || option.disabled) return;
  selectMenuPlayer(option);
}

function handleChooserOptionsInput(event) {
  const form = event.target.closest(".original-player-creator");
  if (!form) return;
  updateOriginalBatterCreatorState(form);
}

function handleChooserOptionsChange(event) {
  const form = event.target.closest(".original-player-creator");
  if (!form) return;
  updateOriginalBatterCreatorState(form);
}

function handleChooserOptionsSubmit(event) {
  const form = event.target.closest(".original-player-creator");
  if (!form) return;
  event.preventDefault();
  submitOriginalBatterCreator(form);
}

function handleChooserOptionsDblClick(event) {
  const sortTarget = event.target.closest("[data-sort-key]");
  if (!sortTarget) return;
  event.preventDefault();
  event.stopPropagation();
  sortPlayerChooserBy(sortTarget.dataset.sortKey, { team: getChooserEventTeam(event), hand: sortTarget.dataset.sortHand || "" });
}

[chooserOptions, chooserOptionsHome].filter(Boolean).forEach((optionsElement) => {
  optionsElement.addEventListener("click", handleChooserOptionsClick);
  optionsElement.addEventListener("input", handleChooserOptionsInput);
  optionsElement.addEventListener("change", handleChooserOptionsChange);
  optionsElement.addEventListener("submit", handleChooserOptionsSubmit);
  optionsElement.addEventListener("dblclick", handleChooserOptionsDblClick);
});
pitcherChangeControls?.addEventListener("click", (event) => {
  const button = event.target.closest(".pitcher-change-button");
  if (!button || button.disabled) return;
  changePitcher(button.dataset.team, button.dataset.pitcherId);
});
populateSelects();
loadRosterFromPersistentStorage();
updateAudioToggleButtons();
showMenu();
setTimeout(() => updateCurrentBgm(true), 0);
requestAnimationFrame(gameLoop);
