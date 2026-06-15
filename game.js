const setupSteps = [
  {
    key: "identity",
    title: "選擇身份",
    options: ["普通上班族", "設計師", "律師", "醫生", "攝影師", "咖啡店老闆", "自由職業", "玩家自訂", "AI 隨機生成"],
  },
  {
    key: "relationship",
    title: "選擇目前關係",
    options: ["單身", "剛認識", "互有好感", "曖昧中", "第一次約會後", "穩定交往前", "玩家自訂", "AI 隨機生成"],
  },
  {
    key: "dangerType",
    title: "選擇攻略角色",
    options: ["新同事", "咖啡店常客", "活動認識的人", "朋友介紹", "合租室友", "旅行認識的人", "玩家自訂", "AI 隨機生成"],
  },
  {
    key: "style",
    title: "選擇故事風格",
    options: ["現實慢熱", "青春曖昧", "雙向拉扯", "甜蜜日常", "群像戀愛", "玩家自訂 / 全隨機"],
  },
  {
    key: "heat",
    title: "選擇情感濃度",
    options: ["純情感向", "牽手擁抱", "親吻與心動（非露骨）", "過夜陪伴（非露骨）"],
  },
];

const pools = {
  names: ["沈予安", "周靜禾", "許知遠", "陳沐晴", "梁以辰", "林晏", "唐若白", "喬念"],
  partnerTraits: ["溫柔體貼型", "敏感多疑型", "強勢獨立型", "感情遲鈍型", "細心觀察型"],
  dangerTraits: ["溫柔陪伴型", "直球告白型", "舊識重逢型", "體貼照顧型", "陽光曖昧型"],
  jobs: ["出版社編輯", "展覽策展人", "品牌企劃", "急診護理師", "獨立攝影師", "資料分析師"],
};

const stages = [
  "第一階段：單身生活",
  "第二階段：自然相識",
  "第三階段：曖昧升溫",
  "第四階段：正式約會",
  "第五階段：確認關係",
  "第六階段：結局",
];

let setupIndex = 0;
let setupData = {};
let selectedOption = "";
let game = null;

const $ = (id) => document.getElementById(id);
const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function renderSetup() {
  const step = setupSteps[setupIndex];
  $("stepLabel").textContent = `Step ${setupIndex + 1} / ${setupSteps.length}`;
  $("stepBar").style.width = `${((setupIndex + 1) / setupSteps.length) * 100}%`;
  $("setupTitle").textContent = step.title;
  $("customInput").value = "";
  $("customBox").classList.add("hidden");
  selectedOption = step.options[0];
  $("setupOptions").innerHTML = step.options
    .map((option, index) => `<button class="option-card ${index === 0 ? "selected" : ""}" data-option="${option}"><b>${String.fromCharCode(65 + index)}.</b> ${option}</button>`)
    .join("");
  [...document.querySelectorAll(".option-card")].forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedOption = btn.dataset.option;
      document.querySelectorAll(".option-card").forEach((item) => item.classList.remove("selected"));
      btn.classList.add("selected");
      $("customBox").classList.toggle("hidden", !selectedOption.includes("自訂"));
    });
  });
}

function finishSetup() {
  const randomIdentity = pick(pools.jobs);
  const identity = setupData.identity.includes("隨機") ? randomIdentity : setupData.identity;
  const relation = setupData.relationship.includes("隨機") ? pick(["單身", "剛認識", "互有好感", "曖昧中"]) : setupData.relationship;
  const dangerType = setupData.dangerType.includes("隨機") ? pick(["新同事", "咖啡店常客", "朋友介紹", "旅行認識的人"]) : setupData.dangerType;
  const partnerName = pick(pools.names);
  let dangerName = pick(pools.names.filter((name) => name !== partnerName));

  game = {
    week: 1,
    ap: 5,
    stage: 0,
    sceneCount: 0,
    choicesMade: [],
    usedEvents: [],
    ended: false,
    setup: { ...setupData, identity, relation, dangerType },
    names: { partner: partnerName, danger: dangerName },
    traits: { partner: pick(pools.partnerTraits), danger: pick(pools.dangerTraits) },
    stats: {
      partner: { 愛意: rand(18, 32), 信任: rand(25, 42), 親密: rand(8, 20), 不安: rand(8, 18), 距離: rand(0, 8) },
      danger: { 心動: rand(8, 18), 吸引: rand(4, 12), 依賴: rand(3, 10), 主動: rand(4, 12), 在意: rand(0, 8) },
      player: { 壓力: rand(8, 18), 猶豫: rand(8, 18), 界線感: 50 },
    },
    log: [],
    lastTitle: "心動還沒說出口",
  };

  $("setup").classList.add("hidden");
  $("game").classList.remove("hidden");
  renderOpening();
}

function renderOpening() {
  const s = game.setup;
  const title = "開場：心動還沒說出口";
  const paragraphs = [
    `你是${s.identity}。在這座通勤時間總是被雨水拖長的城市裡，你目前處在「${s.relation}」的狀態，生活不算空白，只是還沒有遇到真正想一起往前走的人。`,
    `${game.names.partner}是${game.traits.partner}，像一杯剛好溫度的熱茶，讓人覺得安心；${game.names.danger}則以「${s.dangerType}」的身份靠近你，帶來另一種更明亮、更直接的心動。兩個人都是可以被攻略的戀愛角色，差別只在於節奏與相處方式。`,
    `你選擇的是「${s.style}」風格，情感濃度為「${s.heat}」。故事會從單身、曖昧、約會走向正常戀愛；牽手、擁抱、親吻或過夜陪伴都會以尊重界線、非露骨的方式呈現。第 1 週開始，你有 5 個行動點。每次選擇都會推動關係，也會改變你對自己的理解。`,
  ];
  showScene(title, paragraphs, openingChoices());
}

function openingChoices() {
  return [
    makeChoice("約穩定型角色吃一頓晚餐", "stable"),
    makeChoice("回覆心動型角色的曖昧訊息", "danger"),
    makeChoice("先整理自己的心意", "self"),
    makeChoice("翻看 IG 頁面，了解兩人的近況", "social"),
  ];
}

function makeChoice(label, type) {
  return { label, type };
}

function applyDelta(delta) {
  Object.entries(delta).forEach(([group, values]) => {
    Object.entries(values).forEach(([key, value]) => {
      game.stats[group][key] = clamp(game.stats[group][key] + value);
    });
  });
}

function deltaText(delta) {
  const parts = [];
  Object.entries(delta).forEach(([group, values]) => {
    Object.entries(values).forEach(([key, value]) => {
      if (value !== 0) parts.push(`${groupLabel(group)} ${statNameDisplay(key)}${value > 0 ? "+" : ""}${value}`);
    });
  });
  return parts.join("，");
}

function statNameDisplay(name) {
  const labels = { 不安: "不安", 距離: "距離", 吸引: "吸引", 主動: "主動", 在意: "在意", 猶豫: "猶豫", 界線感: "界線感" };
  return labels[name] || name;
}

function deltaItems(values) {
  return Object.entries(values)
    .filter(([, value]) => value !== 0)
    .map(([key, value]) => `${statNameDisplay(key)}${value > 0 ? "+" : ""}${value}`)
    .join("，");
}

function deltaAvatar(group) {
  if (group === "partner") return "assets/partner-cutout.png";
  if (group === "danger") return "assets/danger-cutout.png";
  return "assets/lead-cutout.png";
}

function deltaDisplayName(group) {
  if (group === "partner") return `穩定型角色｜${game.names.partner}`;
  if (group === "danger") return `心動型角色｜${game.names.danger}`;
  return `你｜${game.setup.identity}`;
}

function deltaPopupHtml(delta) {
  return Object.entries(delta)
    .filter(([, values]) => Object.values(values).some((value) => value !== 0))
    .map(([group, values]) => `
      <article class="delta-card">
        <img src="${deltaAvatar(group)}" alt="${groupLabel(group)}頭像" />
        <div>
          <strong>${deltaDisplayName(group)}</strong>
          <p>${deltaItems(values)}</p>
        </div>
      </article>
    `)
    .join("");
}

function hasDelta(delta) {
  return Boolean(delta && Object.values(delta).some((group) => Object.values(group).some((value) => value !== 0)));
}

let deltaPopupTimer = null;

function showDeltaPopup(delta) {
  if (!hasDelta(delta)) return;
  const popup = $("deltaPopup");
  const text = $("deltaPopupText");
  text.innerHTML = deltaPopupHtml(delta);
  popup.classList.remove("hidden");
  clearTimeout(deltaPopupTimer);
  deltaPopupTimer = setTimeout(hideDeltaPopup, 4200);
}

function hideDeltaPopup() {
  $("deltaPopup").classList.add("hidden");
}

function groupLabel(group) {
  return group === "partner" ? "穩定型角色" : group === "danger" ? "心動型角色" : "玩家";
}

function advanceStage() {
  const { partner, danger, player } = game.stats;
  let next = 0;
  if (danger.心動 > 25 || danger.吸引 > 20 || partner.不安 > 20) next = 1;
  if (danger.心動 > 48 || danger.主動 > 40 || partner.不安 > 45) next = 2;
  if (danger.主動 > 65 || player.壓力 > 72 || partner.不安 > 68) next = 3;
  if (partner.不安 > 82 || partner.距離 > 78) next = 4;
  if (partner.不安 >= 100 || partner.愛意 <= 15 || partner.信任 <= 10) next = 5;
  game.stage = Math.max(game.stage, next);
}

function choose(choice) {
  if (game.ended) return;
  if (game.ap <= 0) return nextWeek();
  game.ap -= 1;
  game.sceneCount += 1;
  game.choicesMade.push(choice.label);

  const scene = buildScene(choice);
  applyDelta(scene.delta);
  riskPulse(choice.type);
  advanceStage();
  if (game.stage >= 5) return showEnding("truth");
  if (game.ap <= 0) scene.paragraphs.push(`夜深之後，這一週的行動點歸零。城市安靜下來，卻不是每個人都睡得著。`);
  showScene(scene.title, scene.paragraphs, game.ap <= 0 ? [makeChoice("進入下一週", "nextWeek")] : nextChoices(choice.type), scene.delta);
}

function riskPulse(type) {
  const p = game.stats.partner;
  const d = game.stats.danger;
  const pl = game.stats.player;
  if (type === "danger" && (d.心動 + d.主動 > 95 || game.setup.style.includes("群像戀愛"))) {
    p.不安 = clamp(p.不安 + rand(2, 5));
    pl.壓力 = clamp(pl.壓力 + rand(3, 7));
  }
  if (p.不安 >= 30 && !game.log.includes("probe")) game.log.push("probe");
  if (p.不安 >= 50 && !game.log.includes("phone")) game.log.push("phone");
  if (pl.猶豫 > 70 && !game.log.includes("insomnia")) game.log.push("insomnia");
}

function buildScene(choice) {
  const pn = game.names.partner;
  const dn = game.names.danger;
  const style = game.setup.style;
  const highPressure = style.includes("群像戀愛");
  const heat = game.setup.heat;
  const scenePools = {
    stable: [
      {
        id: "stable-dinner",
      title: pick(["廚房裡的燈", "一頓太平常的晚餐", "回家路上的傘"]),
      delta: { partner: { 愛意: 4, 信任: 3, 親密: 4, 不安: -2, 距離: -3 }, danger: { 心動: -1, 吸引: 0, 依賴: -1, 主動: 2, 在意: 3 }, player: { 壓力: -4, 猶豫: -5, 界線感: 1 } },
      paragraphs: [
        `${pn}在你進門前就把湯熱好了。不是什麼大事，一只小碗，一雙筷子，桌邊還放著你前幾天隨口說想吃的青菜。你坐下時，手機在口袋裡震了一下，你沒有立刻拿出來。`,
        `${pn}像是察覺了，又像是刻意放過你，只問：「今天是不是很累？」這句話太輕，反而讓你心裡某個地方塌下去。你忽然意識到，穩定不是無聊，它是有人願意反覆接住你的普通。`,
        heat.includes("純") ? `你們靠在沙發上看一部很慢的電影，肩膀碰著肩膀，親密安靜得像一盞不刺眼的燈。` : `電影播到一半，${pn}把你的手握過去。那一瞬間你沒有躲，卻也沒有完全放鬆。溫度是真的，心虛也是真的。`,
      ],
      },
      {
        id: "stable-family",
        title: "家庭聚餐的空位",
        delta: { partner: { 愛意: 5, 信任: 4, 親密: 3, 不安: -1, 距離: -2 }, danger: { 心動: -2, 吸引: 0, 依賴: 0, 主動: 3, 在意: 4 }, player: { 壓力: 2, 猶豫: -3, 界線感: 1 } },
        paragraphs: [
          `${pn}帶你去和朋友吃飯。桌上有人聊房租、聊年終、聊誰又分手了，所有話題都普通得像生活本身。你坐在旁邊笑，偶爾替${pn}接一句話，像你們一直都是一隊。`,
          `中途你去洗手間，手機亮了一下，是${dn}發來的 IG 限動回覆。你沒有點開，只把手機翻面。鏡子裡的你看起來很鎮定，可你知道，鎮定有時只是把慌張折得更整齊。`,
          `回到座位時，${pn}把你的杯子往你手邊推了推。這個細節太小，小到沒有人會注意，卻讓你的猶豫短暫地有了重量。`,
        ],
      },
      {
        id: "stable-future",
        title: "下個月的行程表",
        delta: { partner: { 愛意: 3, 信任: 5, 親密: 3, 不安: -2, 距離: -1 }, danger: { 心動: 0, 吸引: 0, 依賴: -1, 主動: 2, 在意: 2 }, player: { 壓力: 4, 猶豫: 4, 界線感: 2 } },
        paragraphs: [
          `${pn}把手機遞給你看行事曆：「這兩天你哪天比較空？我們可以把旅行訂下來。」`,
          `你盯著那幾個被圈起來的日期，忽然想起另一個聊天框裡，${dn}也問過你差不多的問題。未來原本應該是令人安心的字眼，此刻卻像兩條岔路被硬塞進同一張地圖。`,
          `你說「我看看」，語氣聽起來很自然。${pn}點點頭，沒有催。越是沒有催，你越覺得自己像在偷走對方的耐心。`,
        ],
      },
    ],
    danger: [
      {
        id: "danger-line-night",
      title: pick(["深夜訊息", "電梯獨處", "雨天共傘", "咖啡杯邊的名字"]),
      delta: { partner: { 愛意: -1, 信任: -2, 親密: -1, 不安: highPressure ? 6 : 3, 距離: 2 }, danger: { 心動: 8, 吸引: heat.includes("純") ? 2 : 5, 依賴: 4, 主動: 5, 在意: 2 }, player: { 壓力: 8, 猶豫: 10, 界線感: 3 } },
      paragraphs: [
        `【LINE｜00:47】${dn}：睡了嗎？`,
        `${dn}沒有立刻說想你，那樣太俗，也太容易被拒絕。對方只是發來一張便利店門口的照片，雨絲被路燈照得很細，下一句是：「剛才看到一個背影很像你。」`,
        `你盯著螢幕很久，明知道這不是普通同事或普通朋友該有的距離。可偏偏那種被看見的感覺，比任何直白邀約都更難推開。你回了一句「還沒睡」，幾秒後，對面顯示正在輸入。`,
        `${dn}說：「那我是不是可以多佔用你五分鐘？」你忽然聽見客廳裡${pn}翻身的聲音，像現實在提醒你：五分鐘也會有重量。`,
      ],
      },
      {
        id: "danger-rain",
        title: "雨棚下的三分鐘",
        delta: { partner: { 愛意: -2, 信任: -1, 親密: -1, 不安: highPressure ? 5 : 2, 距離: 2 }, danger: { 心動: 7, 吸引: heat.includes("純") ? 1 : 4, 依賴: 5, 主動: 4, 在意: 1 }, player: { 壓力: 7, 猶豫: 8, 界線感: 2 } },
        paragraphs: [
          `下班時忽然下雨，便利店門口擠滿沒帶傘的人。${dn}站在你旁邊，肩膀離你很近，近到你能聞到對方外套上被雨水打濕後的味道。`,
          `${dn}把傘往你這邊偏了一點：「你先走，我等下一班車。」這句話很克制，克制得像故意留給你選擇。你如果拒絕，一切都還能說成普通；你如果接受，普通就會被雨水泡軟。`,
          `你們一起走到路口，誰都沒有說破。紅燈倒數時，${dn}忽然低聲說：「我有時候真的很討厭你回家這件事。」`,
        ],
      },
      {
        id: "danger-project",
        title: "會議室的玻璃門",
        delta: { partner: { 愛意: -1, 信任: -1, 親密: 0, 不安: 3, 距離: 1 }, danger: { 心動: 6, 吸引: heat.includes("純") ? 1 : 3, 依賴: 6, 主動: 5, 在意: 2 }, player: { 壓力: 9, 猶豫: 7, 界線感: 4 } },
        paragraphs: [
          `你和${dn}被留下來改一份資料。會議室的玻璃門沒有完全關上，外面走廊偶爾有人經過，這種隨時會被看見的距離，反而讓每個停頓都變得很響。`,
          `${dn}把筆記本推到你面前，手指短暫碰到你的手背。不是意外，也不像挑釁。那一下很輕，卻讓你接下來三分鐘都沒看懂螢幕上的字。`,
          `你提醒自己要正常呼吸。手機裡${pn}的訊息安靜躺著：「晚點要不要一起買宵夜？」`,
        ],
      },
    ],
    self: [
      {
        id: "self-store",
      title: pick(["一個人的便利店", "失眠前奏", "把手機扣在桌上"]),
      delta: { partner: { 愛意: -2, 信任: 0, 親密: -2, 不安: 1, 距離: 3 }, danger: { 心動: 0, 吸引: 0, 依賴: -1, 主動: 3, 在意: 1 }, player: { 壓力: -2, 猶豫: 2, 界線感: -1 } },
      paragraphs: [
        `你沒有回任何人的訊息。便利店的冷氣開得太足，冰櫃嗡嗡作響，你拿著一瓶無糖茶站了很久，像站在自己生活的旁觀席。`,
        `手機螢幕亮了又暗。${pn}問你幾點回，${dn}問你明天要不要一起喝咖啡。兩條訊息一前一後，誰都沒有逼你，但你知道真正逼人的從來不是文字，是你看完後沒有立刻刪掉的那幾秒。`,
        `你把手機扣在桌上。這個動作看似乾淨，心裡卻並沒有因此變得清白。`,
      ],
      },
      {
        id: "self-insomnia",
        title: "凌晨三點的天花板",
        delta: { partner: { 愛意: -1, 信任: 0, 親密: -1, 不安: 1, 距離: 2 }, danger: { 心動: 1, 吸引: 0, 依賴: 0, 主動: 2, 在意: 0 }, player: { 壓力: 6, 猶豫: 7, 界線感: -2 } },
        paragraphs: [
          `你凌晨三點醒來，天花板被窗簾縫裡漏進來的路燈照出一道淡黃。${pn}睡在旁邊，呼吸很穩，你卻像被某種看不見的聲音叫醒。`,
          `你沒有拿手機。這是你今晚唯一做對的事，卻也不能因此抵消之前做錯的那些。你忽然很想把一切說出來，又很清楚告白不是卸貨，它會把重量分給另一個完全無辜的人。`,
          `清晨快到時，你終於睡著。夢裡有人一直敲門，但你不知道門外站的是誰。`,
        ],
      },
      {
        id: "self-work",
        title: "白天的失誤",
        delta: { partner: { 愛意: -1, 信任: -1, 親密: -1, 不安: 2, 距離: 2 }, danger: { 心動: 0, 吸引: 0, 依賴: 1, 主動: 1, 在意: 0 }, player: { 壓力: 10, 猶豫: 5, 界線感: -3 } },
        paragraphs: [
          `你白天在工作上犯了一個很低級的錯。不是能力問題，是你走神太久，把兩份本來不該混在一起的資料寄給了同一個人。`,
          `同事提醒你時，你第一反應不是懊惱，而是害怕：如果工作都開始露出裂縫，感情裡那些更細的猶豫，還能撐多久？`,
          `${dn}傳訊息問你是不是不舒服，${pn}也問你晚上想吃什麼。兩種關心同時抵達，你卻只覺得更喘。`,
        ],
      },
    ],
    social: [
      {
        id: "social-ig-post",
      title: pick(["IG 頁面的蛛絲", "一個讚", "公開與摯友限定"]),
      delta: { partner: { 愛意: 1, 信任: 0, 親密: 0, 不安: 2, 距離: 0 }, danger: { 心動: 3, 吸引: 1, 依賴: 1, 主動: 4, 在意: 5 }, player: { 壓力: 5, 猶豫: 4, 界線感: 2 } },
      paragraphs: [
        `【IG｜22:11】${pn} 更新了一則貼文：終於把下個月的旅行訂好了。配圖是兩張車票，角落裡有一隻伸懶腰的貓。朋友在留言區起鬨，說你們是不是快有好消息。`,
        `幾分鐘後，${dn}點了讚。沒有評論，沒有多餘表情，只有那個小小的紅心停在一排熟人名字裡。它看起來無害，卻像有人在公開場合碰了一下你的手背。`,
        `你開始猶豫要不要把某些限時動態丟進摯友名單，或乾脆對某個人隱藏。這個念頭冒出來時，你自己都愣了一下。原來祕密不是從猶豫言開始的，它從「我只是調整一下可見範圍」開始。`,
      ],
      },
      {
        id: "social-close-friends",
        title: "摯友名單",
        delta: { partner: { 愛意: 0, 信任: -1, 親密: 0, 不安: 4, 距離: 1 }, danger: { 心動: 4, 吸引: 1, 依賴: 2, 主動: 5, 在意: 3 }, player: { 壓力: 6, 猶豫: 5, 界線感: 3 } },
        paragraphs: [
          `你發了一則很普通的限時動態：便利店咖啡、半張夜路、沒有文字。真正不普通的是，你把可見範圍調成了摯友。`,
          `${dn}幾乎立刻回覆：「所以我是摯友？」你盯著那句話，明知道它帶著笑，卻也藏著試探。`,
          `同一時間，${pn}坐在你對面滑手機，忽然問：「你剛剛是不是發限動？」你的手指停住，空氣像被按下靜音。`,
        ],
      },
      {
        id: "social-tagged",
        title: "共同朋友的標記",
        delta: { partner: { 愛意: -1, 信任: -2, 親密: 0, 不安: 6, 距離: 2 }, danger: { 心動: 3, 吸引: 1, 依賴: 1, 主動: 6, 在意: 4 }, player: { 壓力: 9, 猶豫: 6, 界線感: 1 } },
        paragraphs: [
          `共同朋友在 IG 發了一張聚會照，背景角落裡剛好拍到你和${dn}站得很近。照片不清楚，但姿態比文字更會說話。`,
          `${pn}沒有立刻問，只是在晚餐時提了一句：「你昨天也在那附近？」語氣像閒聊，眼神卻沒有離開你。`,
          `你知道這種時候不能急著解釋，急著解釋的人通常最像有事。可你沉默得太久，也同樣像有事。`,
        ],
      },
    ],
    lie: [
      {
        id: "boundary-evening",
        title: "留給自己的晚上",
        delta: game.stats.player.界線感 > 60
          ? { partner: { 愛意: 1, 信任: 2, 親密: 0, 不安: -2, 距離: -1 }, danger: { 心動: 1, 吸引: 1, 依賴: 1, 主動: 0, 在意: 0 }, player: { 壓力: -8, 猶豫: -3, 界線感: 5 } }
          : { partner: { 愛意: 0, 信任: 1, 親密: 0, 不安: -1, 距離: 0 }, danger: { 心動: 1, 吸引: 1, 依賴: 0, 主動: 1, 在意: 0 }, player: { 壓力: -5, 猶豫: -1, 界線感: 4 } },
        paragraphs: [
          `你沒有急著回覆任何邀約，而是把晚上留給自己。洗完澡後，你把手機放遠，認真想了一遍：你喜歡的是被需要，還是真的想和某個人一起生活？`,
          `${pn}傳來一張晚餐照片，${dn}則問你明天要不要喝咖啡。你沒有逃避，只是決定等心情穩一點再好好回答。`,
          `這個選擇不浪漫，卻很重要。健康的關係不是每一秒都黏在一起，而是你能在靠近前先照顧好自己。`,
        ],
      },
      {
        id: "boundary-chat",
        title: "把話說清楚",
        delta: { partner: { 愛意: 2, 信任: 3, 親密: 1, 不安: -3, 距離: -2 }, danger: { 心動: 2, 吸引: 1, 依賴: 1, 主動: 1, 在意: 0 }, player: { 壓力: -6, 猶豫: -4, 界線感: 6 } },
        paragraphs: [
          `你打開聊天框，沒有故意曖昧，也沒有把話說得過滿。你只是誠實地寫下：「我很珍惜和你相處，但我想慢一點。」`,
          `${dn}回得很快：「可以，我也想好好認識你。」這句話沒有戲劇性的拉扯，卻讓你鬆了一口氣。`,
          `你忽然發現，界線不是拒絕心動，而是讓心動有機會長成比較好的樣子。`,
        ],
      },
      {
        id: "boundary-sleepover",
        title: "過夜前的約定",
        delta: { partner: { 愛意: 3, 信任: 4, 親密: 3, 不安: -2, 距離: -2 }, danger: { 心動: 4, 吸引: 3, 依賴: 2, 主動: 2, 在意: 1 }, player: { 壓力: -4, 猶豫: -2, 界線感: 5 } },
        paragraphs: [
          `雨下得太大，你們決定今晚不勉強趕末班車。過夜這件事被說得很清楚：各自休息、互相尊重，不用把親密推得比心意更快。`,
          `睡前你們並肩坐在窗邊聊天，手指碰到一起時，誰都沒有急著更進一步。那種被尊重的安心，反而比任何衝動都更讓人心動。`,
          `隔天早上，城市被雨洗得很亮。你知道關係往前了一小步，也知道這一步是你們一起同意的。`,
        ],
      },
    ],
  };
  return takeEvent(choice.type, scenePools[choice.type] || scenePools.self);
}

function takeEvent(type, events) {
  if (!game.usedEvents) game.usedEvents = [];
  const unused = events.filter((event) => !game.usedEvents.includes(event.id));
  const source = pick(unused.length ? unused : events);
  const event = { ...source, paragraphs: [...source.paragraphs] };
  game.usedEvents.push(event.id);
  if (unused.length === 0) {
    event.paragraphs = [
      ...event.paragraphs,
      `這不是第一次發生類似的事了。真正可怕的重複不是生活沒有新意，而是你明知道它會留下痕跡，卻仍然用差不多的方式讓自己陷進去。`,
    ];
  }
  return event;
}

function nextChoices(previousType) {
  const base = [
    makeChoice("主動安排和穩定型角色的約會", "stable"),
    makeChoice("答應心動型角色單獨約會", "danger"),
    makeChoice("安排自己的獨處時間", "self"),
    makeChoice("暫時放慢兩邊訊息", "self"),
  ];
  if (game.stats.partner.不安 >= 30) base[0] = makeChoice("面對穩定型角色的試探", "stable");
  if (game.stats.danger.主動 >= 55) base[1] = makeChoice("回應心動型角色的邀約", "danger");
  if (previousType === "danger") base.push(makeChoice("整理聊天語氣與界線", "self"));
  if (game.ap <= 2) base.push(makeChoice("提前結束本週", "nextWeek"));
  return base;
}

function nextWeek() {
  if (game.ended) return;
  if (game.week >= 12) return showEnding("deadline");
  game.week += 1;
  game.ap = 5;
  const weekly = weeklyEvent();
  applyDelta(weekly.delta);
  advanceStage();
  if (game.stage >= 5) return showEnding("truth");
  showScene(weekly.title, weekly.paragraphs, nextChoices("week"), weekly.delta);
}

function weeklyEvent() {
  const pn = game.names.partner;
  const dn = game.names.danger;
  const uncertainty = game.stats.partner.不安;
  if (game.week >= 10) {
    return {
      title: "最後幾週的心意整理",
      delta: { partner: { 愛意: 2, 信任: 1, 親密: 1, 不安: 2, 距離: 0 }, danger: { 心動: 3, 吸引: 2, 依賴: 2, 主動: 3, 在意: 2 }, player: { 壓力: 6, 猶豫: 4, 界線感: 2 } },
      paragraphs: [
        `第 ${game.week} 週開始時，你感覺故事快要走到一個需要回答的地方。不是誰逼你選，而是你終於想知道，自己真正期待的是哪一種陪伴。`,
        `${pn}和${dn}都用自己的方式靠近你。你可以告白，也可以暫緩，重點是不要用模糊拖住任何人的期待。`,
      ],
    };
  }
  if (uncertainty >= 70) {
    return {
      title: "週一早晨的談心",
      delta: { partner: { 愛意: 2, 信任: 3, 親密: 2, 不安: -6, 距離: -4 }, danger: { 心動: 1, 吸引: 0, 依賴: 1, 主動: 1, 在意: 1 }, player: { 壓力: -8, 猶豫: -5, 界線感: 5 } },
      paragraphs: [
        `新的一週開始，${pn}把早餐放在桌上，問你：「你最近是不是有很多心事？」`,
        `你沒有把問題推開，而是承認自己還在整理感情。這不是完美答案，但它足夠真誠，也讓你們有機會重新調整相處的距離。`,
      ],
    };
  }
  if (game.stats.danger.主動 >= 75) {
    return {
      title: "想更常見面",
      delta: { partner: { 愛意: 0, 信任: 1, 親密: 0, 不安: 1, 距離: 0 }, danger: { 心動: 5, 吸引: 3, 依賴: 4, 主動: 5, 在意: 3 }, player: { 壓力: 4, 猶豫: 3, 界線感: 2 } },
      paragraphs: [
        `${dn}在週一中午問你：「這週可以多見一次嗎？不用很久，散步也可以。」`,
        `你聽見對方語氣裡的期待，也提醒自己不要只被氣氛推著走。喜歡可以靠近，但靠近也需要明確、舒服、彼此同意的節奏。`,
      ],
    };
  }
  return {
    title: pickUnusedWeekly(["新的一週，新的靠近", "週一的天氣預報", "還能裝作不心動嗎", "週三的未接來電", "電梯裡的微笑", "晚餐桌上的邀約"]),
    delta: { partner: { 愛意: 1, 信任: 1, 親密: 1, 不安: 0, 距離: -1 }, danger: { 心動: 2, 吸引: 1, 依賴: 1, 主動: 2, 在意: 1 }, player: { 壓力: 2, 猶豫: 2, 界線感: 1 } },
    paragraphs: [
      `第 ${game.week} 週開始。城市照常運轉，捷運照常擁擠，但你發現自己開始期待某些訊息提示。`,
      `${pn}傳來一張早餐照片，${dn}問你：「今天會見到你嗎？」兩句話都很普通，卻都讓你認真想了很久。`,
    ],
  };
}

function pickUnusedWeekly(titles) {
  if (!game.usedEvents) game.usedEvents = [];
  const unused = titles.filter((title) => !game.usedEvents.includes(`weekly:${title}`));
  const title = pick(unused.length ? unused : titles);
  game.usedEvents.push(`weekly:${title}`);
  return title;
}

function showEnding(reason) {
  game.ended = true;
  game.stage = 5;
  game.ap = 0;
  const ending = resolveEnding(reason);
  game.ending = ending;
  showScene(ending.title, ending.paragraphs, [makeChoice("查看大結局圖", "openEndingPage"), makeChoice("重新開始新周目", "restartGame")], ending.delta);
  renderEndingPage(ending);
}

function resolveEnding(reason) {
  const pn = game.names.partner;
  const dn = game.names.danger;
  const { partner, danger, player } = game.stats;
  const readyForPartner = partner.愛意 >= 55 && partner.信任 >= 45 && player.界線感 >= 45;
  const readyForDanger = danger.心動 >= 55 && danger.吸引 >= 35 && danger.主動 >= 35 && player.界線感 >= 35;
  const needsPause = player.壓力 >= 80 || player.猶豫 >= 75;
  const delta = { partner: { 愛意: 0, 信任: 0, 親密: 0, 不安: 0, 距離: 0 }, danger: { 心動: 0, 吸引: 0, 依賴: 0, 主動: 0, 在意: 0 }, player: { 壓力: 0, 猶豫: 0, 界線感: 0 } };

  if (readyForPartner && partner.愛意 >= danger.心動) {
    return {
      title: "大結局｜穩定告白",
      focus: "partner",
      delta,
      paragraphs: [
        `第 ${game.week} 週，你約${pn}去那間常常路過卻一直沒進去的甜點店。你沒有準備誇張台詞，只是把這段時間的心意說清楚。`,
        `${pn}聽完後笑了一下，說：「我也想試試看，慢慢來也可以。」你們沒有立刻變成童話裡的人，卻開始了一段正常、清楚、彼此尊重的戀愛。`,
        `結局：HE1 穩定戀愛。你們決定正式交往，從日常約會、牽手與慢慢建立信任開始。`,
      ],
    };
  }

  if (readyForDanger) {
    return {
      title: "大結局｜心動成真",
      focus: "danger",
      delta,
      paragraphs: [
        `第 ${game.week} 週，${dn}問你要不要一起看夜景。風吹得有點冷，你們靠得很近，卻仍然把每一步都說得清楚。`,
        `你說自己也喜歡對方。${dn}沒有急著把氣氛推得更快，只是握住你的手，問：「那我們從下一次正式約會開始？」`,
        `結局：HE2 心動成真。你們把曖昧變成正常戀愛，親密建立在同意、尊重與清楚溝通上。`,
      ],
    };
  }

  if (needsPause || reason === "truth") {
    return {
      title: "大結局｜先照顧自己",
      focus: "self",
      delta,
      paragraphs: [
        `你發現自己太急著回答別人的期待，反而忘了問自己真正需要什麼。於是你把兩邊的邀約都放慢，認真安排一段只屬於自己的時間。`,
        `${pn}和${dn}都沒有被你拖著等待。你把話說清楚，也謝謝他們曾經帶給你的心動。`,
        `結局：GE1 自我成長。這一輪沒有進入戀愛，但你學會了界線、誠實與照顧自己。`,
      ],
    };
  }

  return {
    title: "大結局｜友好收束",
    focus: "self",
    delta,
    paragraphs: [
      `第 12 週，你沒有選擇一場戲劇化告白，而是分別和${pn}、${dn}好好吃了一頓飯。`,
      `有些心動適合成為戀愛，有些心動則適合停在美好的朋友距離。你們沒有互相傷害，也沒有把模糊拖成負擔。`,
      `結局：NE1 友好收束。你保留了溫柔，也把下一次戀愛留給更確定的自己。`,
    ],
  };
}

function endingAvatar(focus) {
  if (focus === "partner") return "assets/partner-cutout.png";
  if (focus === "danger") return "assets/danger-cutout.png";
  return "assets/lead-cutout.png";
}

function endingFocusLabel(focus) {
  if (focus === "partner") return `你選擇面對：${game.names.partner}`;
  if (focus === "danger") return `結局核心人物：${game.names.danger}`;
  return `自我成長：${game.setup.identity}`;
}

function renderEndingPage(ending = game.ending) {
  if (!ending) return;
  $("endingAvatar").src = endingAvatar(ending.focus);
  $("endingAvatar").alt = `${endingFocusLabel(ending.focus)}頭像`;
  $("endingTitle").textContent = ending.title;
  $("endingFocus").textContent = endingFocusLabel(ending.focus);
  $("endingStory").innerHTML = ending.paragraphs.map((p) => `<p>${p}</p>`).join("");
  $("setup").classList.add("hidden");
  $("game").classList.add("hidden");
  $("endingPage").classList.remove("hidden");
  $("freeForm").classList.add("hidden");
  hideDeltaPopup();
}

function showScene(title, paragraphs, choices, delta = null) {
  game.lastTitle = title;
  $("weekNo").textContent = game.week;
  $("phaseLabel").textContent = stages[game.stage];
  $("sceneTitle").textContent = title;
  $("playerRole").textContent = game.setup.identity;
  $("partnerName").textContent = game.names.partner;
  $("dangerName").textContent = game.names.danger;
  const apLine = `<p class="message">目前行動點：${game.ap} / 5。關係階段：${stages[game.stage]}。距離大結局最多還有 ${Math.max(0, 12 - game.week)} 週。</p>`;
  const deltaLine = hasDelta(delta) ? `<p class="delta">數值變動：${deltaText(delta)}</p>` : "";
  $("story").innerHTML = paragraphs.map((p) => `<p>${p}</p>`).join("") + apLine + deltaLine + thresholdText();
  showDeltaPopup(delta);
  $("choices").innerHTML = choices.map((choice) => `<button data-type="${choice.type}" data-label="${choice.label}">${choice.label}</button>`).join("");
  [...$("choices").querySelectorAll("button")].forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.type === "restartGame") restartGame();
      if (btn.dataset.type === "openEndingPage") renderEndingPage();
      if (btn.dataset.type === "nextWeek") nextWeek();
      else if (btn.dataset.type !== "restartGame" && btn.dataset.type !== "openEndingPage") choose({ label: btn.dataset.label, type: btn.dataset.type });
    });
  });
  $("freeForm").classList.toggle("hidden", Boolean(game.ended));
  renderStats();
}

function thresholdText() {
  const notes = [];
  if (game.stats.partner.不安 >= 30) notes.push(`穩定型角色的不安已經越過試探線，對方開始記得你的時間差與語氣變化。`);
  if (game.stats.partner.不安 >= 50) notes.push(`訊息節奏、邀約頻率與公開互動，都會影響下一次談心的氣氛。`);
  if (game.stats.player.猶豫 >= 70) notes.push(`猶豫太高，你開始失眠，白天容易恍神，也更可能突然想告白。`);
  if (game.stats.player.壓力 >= 80) notes.push(`壓力有點高，你需要安排休息，才不會在重要對話裡說錯話。`);
  if (!notes.length) return "";
  return `<p class="message">${notes.join(" ")}</p>`;
}

function renderStats() {
  const groups = [
    ["穩定型角色", "partner"],
    ["心動型角色", "danger"],
    ["玩家狀態", "player"],
  ];
  $("stats").innerHTML = groups
    .map(([title, key]) => `<section class="stat-group"><h3>${title}</h3>${Object.entries(game.stats[key]).map(([name, value]) => statRow(name, value)).join("")}</section>`)
    .join("");
}

function statRow(name, value) {
  const cls = value >= 70 ? "danger" : value >= 45 ? "warn" : "";
  return `<div class="stat-row"><div class="stat-top"><span class="stat-name">${statNameDisplay(name)}</span><strong>${value}</strong></div><div class="meter ${cls}"><i style="width:${value}%"></i></div></div>`;
}

$("nextSetup").addEventListener("click", () => {
  const step = setupSteps[setupIndex];
  const custom = $("customInput").value.trim();
  setupData[step.key] = selectedOption.includes("自訂") && custom ? custom : selectedOption;
  setupIndex += 1;
  if (setupIndex >= setupSteps.length) finishSetup();
  else renderSetup();
});

$("deltaPopupClose").addEventListener("click", hideDeltaPopup);

$("freeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const value = $("freeInput").value.trim();
  if (!value) return;
  const lowered = value.toLowerCase();
  let type = "self";
  if (value.includes("穩定型角色") || value.includes("回家") || value.includes("告白") || value.includes("約會")) type = "stable";
  if (value.includes("心動") || value.includes("訊息") || value.includes("見面") || value.includes("咖啡")) type = "danger";
  if (value.includes("界線") || value.includes("獨處") || value.includes("過夜") || lowered.includes("boundary")) type = "lie";
  $("freeInput").value = "";
  choose({ label: `自訂行動：${value}`, type });
});

$("saveBtn").addEventListener("click", () => {
  localStorage.setItem("safe-romance-save", JSON.stringify(game));
  alert("已保存。");
});

$("loadBtn").addEventListener("click", () => {
  const raw = localStorage.getItem("safe-romance-save");
  if (!raw) return alert("目前沒有存檔。");
  game = JSON.parse(raw);
  game.usedEvents = game.usedEvents || [];
  game.ended = Boolean(game.ended);
  $("setup").classList.add("hidden");
  if (game.ended && game.ending) {
    renderEndingPage(game.ending);
  } else {
    $("game").classList.remove("hidden");
    $("endingPage").classList.add("hidden");
    showScene(game.lastTitle || "讀取存檔", ["你回到保存時的那一刻。空氣沒有倒退，但選擇重新亮了起來。"], nextChoices("load"));
  }
});

function restartGame() {
  setupIndex = 0;
  setupData = {};
  game = null;
  $("game").classList.add("hidden");
  $("endingPage").classList.add("hidden");
  $("setup").classList.remove("hidden");
  $("freeForm").classList.remove("hidden");
  renderSetup();
}

$("restartBtn").addEventListener("click", restartGame);
$("endingRestart").addEventListener("click", restartGame);
$("endingBack").addEventListener("click", () => {
  $("endingPage").classList.add("hidden");
  $("game").classList.remove("hidden");
});

renderSetup();
