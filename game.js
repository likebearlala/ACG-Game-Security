const setupSteps = [
  {
    key: "identity",
    title: "選擇身份",
    options: ["普通上班族", "設計師", "律師", "醫生", "攝影師", "咖啡店老闆", "自由職業", "玩家自訂", "AI 隨機生成"],
  },
  {
    key: "relationship",
    title: "選擇目前關係",
    options: ["戀愛半年", "戀愛三年", "同居", "異地戀", "訂婚", "已婚", "已婚有孩子", "玩家自訂", "AI 隨機生成"],
  },
  {
    key: "dangerType",
    title: "選擇危險對象",
    options: ["新同事", "上司", "前任", "健身教練", "旅行認識的人", "朋友對象", "合租室友", "玩家自訂", "AI 隨機生成"],
  },
  {
    key: "style",
    title: "選擇故事風格",
    options: ["現實慢熱", "禁忌感情", "雙向拉扯", "高壓祕密", "修羅場", "玩家自訂 / 全隨機"],
  },
  {
    key: "heat",
    title: "選擇情感濃度",
    options: ["純情感向", "輕度情慾", "中度情慾（非露骨）", "成人張力（非露骨）"],
  },
];

const pools = {
  names: ["沈予安", "周靜禾", "許知遠", "陳沐晴", "梁以辰", "林晏", "唐若白", "喬念"],
  partnerTraits: ["溫柔體貼型", "敏感多疑型", "強勢獨立型", "感情遲鈍型", "細心觀察型"],
  dangerTraits: ["溫柔攻勢型", "進攻直球型", "糾纏舊愛型", "禁忌誘惑型", "陽光曖昧型"],
  jobs: ["出版社編輯", "展覽策展人", "品牌企劃", "急診護理師", "獨立攝影師", "資料分析師"],
};

const stages = [
  "第一階段：穩定生活",
  "第二階段：危險接觸",
  "第三階段：秘密關係",
  "第四階段：感情失控",
  "第五階段：真相逼近",
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
  const relation = setupData.relationship.includes("隨機") ? pick(["同居", "訂婚", "戀愛三年", "異地戀"]) : setupData.relationship;
  const dangerType = setupData.dangerType.includes("隨機") ? pick(["新同事", "前任", "上司", "朋友對象"]) : setupData.dangerType;
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
      partner: { 愛意: rand(82, 94), 信任: rand(86, 95), 親密: rand(72, 88), 懷疑: rand(1, 8), 失望: rand(1, 8) },
      danger: { 心動: rand(8, 18), 欲望: rand(4, 12), 依賴: rand(3, 10), 佔有欲: rand(4, 12), 嫉妒: rand(0, 8) },
      player: { 壓力: rand(8, 18), 愧疚: rand(2, 10), 偽裝: 50 },
    },
    log: [],
    lastTitle: "雨還沒落下來",
  };

  $("setup").classList.add("hidden");
  $("game").classList.remove("hidden");
  renderOpening();
}

function renderOpening() {
  const s = game.setup;
  const title = "開場：雨還沒落下來";
  const paragraphs = [
    `你是${s.identity}。在這座通勤時間總是被雨水拖長的城市裡，你和${game.names.partner}已經走到「${s.relation}」這一步。你們不是沒有愛，恰恰相反，正因為日子太像真的要安定下來，每一次沉默才顯得更重。${game.names.partner}是${game.traits.partner}，會記得你不喝太甜的飲料，也會在你說「今天有點累」時，把追問吞回去。`,
    `危險是在很普通的一天出現的。${game.names.danger}以「${s.dangerType}」的身份闖進你的生活，沒有誇張台詞，沒有命中注定，只有一次電梯裡短暫的對視，一句「你看起來不像沒事」，和你回到家後仍然想起的那種不合時宜的清醒。`,
    `你選擇的是「${s.style}」風格，情感濃度為「${s.heat}」。這意味著每個人都會有自己的生活和判斷：現任不會永遠等你，危險對象也不是只為你發光。第 1 週開始，你有 5 個行動點。每次選擇都會留下痕跡，有些痕跡當下看不出來，卻會在很久之後回頭找你。`,
  ];
  showScene(title, paragraphs, openingChoices());
}

function openingChoices() {
  return [
    makeChoice("陪現任吃一頓久違的晚餐", "stable"),
    makeChoice("回覆危險對象的試探訊息", "danger"),
    makeChoice("把工作和感情都暫時晾著", "self"),
    makeChoice("翻看 IG 頁面，觀察兩人的動態", "social"),
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
      if (value !== 0) parts.push(`${groupLabel(group)} ${key}${value > 0 ? "+" : ""}${value}`);
    });
  });
  return parts.join("，");
}

function deltaItems(values) {
  return Object.entries(values)
    .filter(([, value]) => value !== 0)
    .map(([key, value]) => `${key}${value > 0 ? "+" : ""}${value}`)
    .join("，");
}

function deltaAvatar(group) {
  if (group === "partner") return "assets/partner-cutout.png";
  if (group === "danger") return "assets/danger-cutout.png";
  return "assets/lead-cutout.png";
}

function deltaDisplayName(group) {
  if (group === "partner") return `現任｜${game.names.partner}`;
  if (group === "danger") return `危險對象｜${game.names.danger}`;
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
  return group === "partner" ? "現任" : group === "danger" ? "危險對象" : "玩家";
}

function advanceStage() {
  const { partner, danger, player } = game.stats;
  let next = 0;
  if (danger.心動 > 25 || danger.欲望 > 20 || partner.懷疑 > 20) next = 1;
  if (danger.心動 > 48 || danger.佔有欲 > 40 || partner.懷疑 > 45) next = 2;
  if (danger.佔有欲 > 65 || player.壓力 > 72 || partner.懷疑 > 68) next = 3;
  if (partner.懷疑 > 82 || partner.失望 > 78) next = 4;
  if (partner.懷疑 >= 100 || partner.愛意 <= 15 || partner.信任 <= 10) next = 5;
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
  if (type === "danger" && (d.心動 + d.佔有欲 > 95 || game.setup.style.includes("高壓"))) {
    p.懷疑 = clamp(p.懷疑 + rand(2, 5));
    pl.壓力 = clamp(pl.壓力 + rand(3, 7));
  }
  if (p.懷疑 >= 30 && !game.log.includes("probe")) game.log.push("probe");
  if (p.懷疑 >= 50 && !game.log.includes("phone")) game.log.push("phone");
  if (pl.愧疚 > 70 && !game.log.includes("insomnia")) game.log.push("insomnia");
}

function buildScene(choice) {
  const pn = game.names.partner;
  const dn = game.names.danger;
  const style = game.setup.style;
  const highPressure = style.includes("高壓") || style.includes("修羅場");
  const heat = game.setup.heat;
  const scenePools = {
    stable: [
      {
        id: "stable-dinner",
      title: pick(["廚房裡的燈", "一頓太平常的晚餐", "回家路上的傘"]),
      delta: { partner: { 愛意: 4, 信任: 3, 親密: 4, 懷疑: -2, 失望: -3 }, danger: { 心動: -1, 欲望: 0, 依賴: -1, 佔有欲: 2, 嫉妒: 3 }, player: { 壓力: -4, 愧疚: -5, 偽裝: 1 } },
      paragraphs: [
        `${pn}在你進門前就把湯熱好了。不是什麼大事，一只小碗，一雙筷子，桌邊還放著你前幾天隨口說想吃的青菜。你坐下時，手機在口袋裡震了一下，你沒有立刻拿出來。`,
        `${pn}像是察覺了，又像是刻意放過你，只問：「今天是不是很累？」這句話太輕，反而讓你心裡某個地方塌下去。你忽然意識到，穩定不是無聊，它是有人願意反覆接住你的普通。`,
        heat.includes("純") ? `你們靠在沙發上看一部很慢的電影，肩膀碰著肩膀，親密安靜得像一盞不刺眼的燈。` : `電影播到一半，${pn}把你的手握過去。那一瞬間你沒有躲，卻也沒有完全放鬆。溫度是真的，心虛也是真的。`,
      ],
      },
      {
        id: "stable-family",
        title: "家庭聚餐的空位",
        delta: { partner: { 愛意: 5, 信任: 4, 親密: 3, 懷疑: -1, 失望: -2 }, danger: { 心動: -2, 欲望: 0, 依賴: 0, 佔有欲: 3, 嫉妒: 4 }, player: { 壓力: 2, 愧疚: -3, 偽裝: 1 } },
        paragraphs: [
          `${pn}帶你去和朋友吃飯。桌上有人聊房租、聊年終、聊誰又分手了，所有話題都普通得像生活本身。你坐在旁邊笑，偶爾替${pn}接一句話，像你們一直都是一隊。`,
          `中途你去洗手間，手機亮了一下，是${dn}發來的 IG 限動回覆。你沒有點開，只把手機翻面。鏡子裡的你看起來很鎮定，可你知道，鎮定有時只是把慌張折得更整齊。`,
          `回到座位時，${pn}把你的杯子往你手邊推了推。這個細節太小，小到沒有人會注意，卻讓你的愧疚短暫地有了重量。`,
        ],
      },
      {
        id: "stable-future",
        title: "下個月的行程表",
        delta: { partner: { 愛意: 3, 信任: 5, 親密: 3, 懷疑: -2, 失望: -1 }, danger: { 心動: 0, 欲望: 0, 依賴: -1, 佔有欲: 2, 嫉妒: 2 }, player: { 壓力: 4, 愧疚: 4, 偽裝: 2 } },
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
      delta: { partner: { 愛意: -1, 信任: -2, 親密: -1, 懷疑: highPressure ? 6 : 3, 失望: 2 }, danger: { 心動: 8, 欲望: heat.includes("純") ? 2 : 5, 依賴: 4, 佔有欲: 5, 嫉妒: 2 }, player: { 壓力: 8, 愧疚: 10, 偽裝: 3 } },
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
        delta: { partner: { 愛意: -2, 信任: -1, 親密: -1, 懷疑: highPressure ? 5 : 2, 失望: 2 }, danger: { 心動: 7, 欲望: heat.includes("純") ? 1 : 4, 依賴: 5, 佔有欲: 4, 嫉妒: 1 }, player: { 壓力: 7, 愧疚: 8, 偽裝: 2 } },
        paragraphs: [
          `下班時忽然下雨，便利店門口擠滿沒帶傘的人。${dn}站在你旁邊，肩膀離你很近，近到你能聞到對方外套上被雨水打濕後的味道。`,
          `${dn}把傘往你這邊偏了一點：「你先走，我等下一班車。」這句話很克制，克制得像故意留給你選擇。你如果拒絕，一切都還能說成普通；你如果接受，普通就會被雨水泡軟。`,
          `你們一起走到路口，誰都沒有說破。紅燈倒數時，${dn}忽然低聲說：「我有時候真的很討厭你回家這件事。」`,
        ],
      },
      {
        id: "danger-project",
        title: "會議室的玻璃門",
        delta: { partner: { 愛意: -1, 信任: -1, 親密: 0, 懷疑: 3, 失望: 1 }, danger: { 心動: 6, 欲望: heat.includes("純") ? 1 : 3, 依賴: 6, 佔有欲: 5, 嫉妒: 2 }, player: { 壓力: 9, 愧疚: 7, 偽裝: 4 } },
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
      delta: { partner: { 愛意: -2, 信任: 0, 親密: -2, 懷疑: 1, 失望: 3 }, danger: { 心動: 0, 欲望: 0, 依賴: -1, 佔有欲: 3, 嫉妒: 1 }, player: { 壓力: -2, 愧疚: 2, 偽裝: -1 } },
      paragraphs: [
        `你沒有回任何人的訊息。便利店的冷氣開得太足，冰櫃嗡嗡作響，你拿著一瓶無糖茶站了很久，像站在自己生活的旁觀席。`,
        `手機螢幕亮了又暗。${pn}問你幾點回，${dn}問你明天要不要一起喝咖啡。兩條訊息一前一後，誰都沒有逼你，但你知道真正逼人的從來不是文字，是你看完後沒有立刻刪掉的那幾秒。`,
        `你把手機扣在桌上。這個動作看似乾淨，心裡卻並沒有因此變得清白。`,
      ],
      },
      {
        id: "self-insomnia",
        title: "凌晨三點的天花板",
        delta: { partner: { 愛意: -1, 信任: 0, 親密: -1, 懷疑: 1, 失望: 2 }, danger: { 心動: 1, 欲望: 0, 依賴: 0, 佔有欲: 2, 嫉妒: 0 }, player: { 壓力: 6, 愧疚: 7, 偽裝: -2 } },
        paragraphs: [
          `你凌晨三點醒來，天花板被窗簾縫裡漏進來的路燈照出一道淡黃。${pn}睡在旁邊，呼吸很穩，你卻像被某種看不見的聲音叫醒。`,
          `你沒有拿手機。這是你今晚唯一做對的事，卻也不能因此抵消之前做錯的那些。你忽然很想把一切說出來，又很清楚坦白不是卸貨，它會把重量分給另一個完全無辜的人。`,
          `清晨快到時，你終於睡著。夢裡有人一直敲門，但你不知道門外站的是誰。`,
        ],
      },
      {
        id: "self-work",
        title: "白天的失誤",
        delta: { partner: { 愛意: -1, 信任: -1, 親密: -1, 懷疑: 2, 失望: 2 }, danger: { 心動: 0, 欲望: 0, 依賴: 1, 佔有欲: 1, 嫉妒: 0 }, player: { 壓力: 10, 愧疚: 5, 偽裝: -3 } },
        paragraphs: [
          `你白天在工作上犯了一個很低級的錯。不是能力問題，是你走神太久，把兩份本來不該混在一起的資料寄給了同一個人。`,
          `同事提醒你時，你第一反應不是懊惱，而是害怕：如果工作都開始露出裂縫，感情裡那些更細的謊，還能撐多久？`,
          `${dn}傳訊息問你是不是不舒服，${pn}也問你晚上想吃什麼。兩種關心同時抵達，你卻只覺得更喘。`,
        ],
      },
    ],
    social: [
      {
        id: "social-ig-post",
      title: pick(["IG 頁面的蛛絲", "一個讚", "公開與摯友限定"]),
      delta: { partner: { 愛意: 1, 信任: 0, 親密: 0, 懷疑: 2, 失望: 0 }, danger: { 心動: 3, 欲望: 1, 依賴: 1, 佔有欲: 4, 嫉妒: 5 }, player: { 壓力: 5, 愧疚: 4, 偽裝: 2 } },
      paragraphs: [
        `【IG｜22:11】${pn} 更新了一則貼文：終於把下個月的旅行訂好了。配圖是兩張車票，角落裡有一隻伸懶腰的貓。朋友在留言區起鬨，說你們是不是快有好消息。`,
        `幾分鐘後，${dn}點了讚。沒有評論，沒有多餘表情，只有那個小小的紅心停在一排熟人名字裡。它看起來無害，卻像有人在公開場合碰了一下你的手背。`,
        `你開始猶豫要不要把某些限時動態丟進摯友名單，或乾脆對某個人隱藏。這個念頭冒出來時，你自己都愣了一下。原來祕密不是從謊言開始的，它從「我只是調整一下可見範圍」開始。`,
      ],
      },
      {
        id: "social-close-friends",
        title: "摯友名單",
        delta: { partner: { 愛意: 0, 信任: -1, 親密: 0, 懷疑: 4, 失望: 1 }, danger: { 心動: 4, 欲望: 1, 依賴: 2, 佔有欲: 5, 嫉妒: 3 }, player: { 壓力: 6, 愧疚: 5, 偽裝: 3 } },
        paragraphs: [
          `你發了一則很普通的限時動態：便利店咖啡、半張夜路、沒有文字。真正不普通的是，你把可見範圍調成了摯友。`,
          `${dn}幾乎立刻回覆：「所以我是摯友？」你盯著那句話，明知道它帶著笑，卻也藏著試探。`,
          `同一時間，${pn}坐在你對面滑手機，忽然問：「你剛剛是不是發限動？」你的手指停住，空氣像被按下靜音。`,
        ],
      },
      {
        id: "social-tagged",
        title: "共同朋友的標記",
        delta: { partner: { 愛意: -1, 信任: -2, 親密: 0, 懷疑: 6, 失望: 2 }, danger: { 心動: 3, 欲望: 1, 依賴: 1, 佔有欲: 6, 嫉妒: 4 }, player: { 壓力: 9, 愧疚: 6, 偽裝: 1 } },
        paragraphs: [
          `共同朋友在 IG 發了一張聚會照，背景角落裡剛好拍到你和${dn}站得很近。照片不清楚，但姿態比文字更會說話。`,
          `${pn}沒有立刻問，只是在晚餐時提了一句：「你昨天也在那附近？」語氣像閒聊，眼神卻沒有離開你。`,
          `你知道這種時候不能急著解釋，急著解釋的人通常最像有事。可你沉默得太久，也同樣像有事。`,
        ],
      },
    ],
    lie: [
      {
        id: "lie-overtime",
      title: "一個看似完整的理由",
      delta: game.stats.player.偽裝 > 60
        ? { partner: { 愛意: -1, 信任: -1, 親密: -1, 懷疑: 2, 失望: 3 }, danger: { 心動: 5, 欲望: 2, 依賴: 3, 佔有欲: 4, 嫉妒: 0 }, player: { 壓力: 15, 愧疚: 12, 偽裝: 5 } }
        : { partner: { 愛意: -3, 信任: -5, 親密: -2, 懷疑: 12, 失望: 9 }, danger: { 心動: 4, 欲望: 2, 依賴: 2, 佔有欲: 5, 嫉妒: 1 }, player: { 壓力: 20, 愧疚: 14, 偽裝: -8 } },
      paragraphs: [
        `你說今晚要加班，語氣平穩到連自己都差點相信。${pn}在電話那頭停了一下，只回：「好，那你別太晚。」`,
        `掛斷後你沒有立刻鬆一口氣。謊話真正可怕的地方不是說出口，而是它需要你接下來用更多細節去維護：幾點下班、誰在場、為什麼背景音那麼安靜。`,
        `${dn}看著你收起手機，低聲問：「你每次都這樣嗎？」沒有審判，卻比審判更難受。`,
      ],
      },
      {
        id: "lie-delete",
        title: "刪除之前先看了一眼",
        delta: { partner: { 愛意: -2, 信任: -3, 親密: -1, 懷疑: game.stats.player.偽裝 > 60 ? 3 : 10, 失望: 5 }, danger: { 心動: 4, 欲望: 1, 依賴: 4, 佔有欲: 7, 嫉妒: 2 }, player: { 壓力: 13, 愧疚: 11, 偽裝: game.stats.player.偽裝 > 60 ? 4 : -5 } },
        paragraphs: [
          `你打開和${dn}的聊天記錄，手指停在刪除鍵上。那些句子其實沒有多露骨，甚至很多都只是「到了嗎」「今天辛苦了」，可它們排列在一起，就成了一段不能被看見的關係。`,
          `你刪掉之前又看了一眼。就是這一眼，讓你知道自己不是怕被發現而已，你也捨不得那部分被證明存在過的自己。`,
          `手機鎖屏後，${pn}剛好從浴室出來：「你剛剛在笑什麼？」你才發現自己的表情沒有收乾淨。`,
        ],
      },
      {
        id: "lie-location",
        title: "定位關掉的那一秒",
        delta: { partner: { 愛意: -3, 信任: -5, 親密: -2, 懷疑: 9, 失望: 7 }, danger: { 心動: 5, 欲望: 2, 依賴: 3, 佔有欲: 5, 嫉妒: 1 }, player: { 壓力: 18, 愧疚: 12, 偽裝: -2 } },
        paragraphs: [
          `你把手機定位關掉。系統跳出提醒時，你盯著那行字，突然覺得科技比人誠實得多，它至少會在你做出選擇前問一次確認。`,
          `${dn}在街角等你，沒有催，只是把手插在外套口袋裡。你走過去的每一步都很慢，像在給自己最後反悔的時間。`,
          `可你沒有反悔。真正讓人害怕的不是衝動，是你發現自己其實很清醒。`,
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
    makeChoice("主動安排和現任的約會", "stable"),
    makeChoice("答應危險對象單獨見面", "danger"),
    makeChoice("用加班當理由製造空檔", "lie"),
    makeChoice("暫時冷處理兩邊訊息", "self"),
  ];
  if (game.stats.partner.懷疑 >= 30) base[0] = makeChoice("面對現任的試探", "stable");
  if (game.stats.danger.佔有欲 >= 55) base[1] = makeChoice("處理危險對象的逼近", "danger");
  if (previousType === "danger") base.push(makeChoice("刪除聊天記錄", "lie"));
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
  const suspicion = game.stats.partner.懷疑;
  if (game.week >= 10) {
    return {
      title: "最後幾週的倒數",
      delta: { partner: { 愛意: -2, 信任: -2, 親密: -1, 懷疑: 5, 失望: 4 }, danger: { 心動: 4, 欲望: 2, 依賴: 4, 佔有欲: 6, 嫉妒: 4 }, player: { 壓力: 12, 愧疚: 10, 偽裝: -2 } },
      paragraphs: [
        `第 ${game.week} 週開始時，你明顯感覺到時間不再站在你這邊。每個人都還在照常生活，但照常只是表面，真正的東西已經在底下發燙。`,
        `${pn}開始不再把疑問吞回去，${dn}也不再滿足於只能在縫隙裡出現。你知道，這段關係最晚會在第 12 週前走到結局，不會永遠用「下次再說」拖著。`,
      ],
    };
  }
  if (suspicion >= 70) {
    return {
      title: "週一早晨的質問",
      delta: { partner: { 愛意: -8, 信任: -10, 親密: -5, 懷疑: 8, 失望: 12 }, danger: { 心動: 2, 欲望: 0, 依賴: 3, 佔有欲: 8, 嫉妒: 3 }, player: { 壓力: 16, 愧疚: 12, 偽裝: -5 } },
      paragraphs: [
        `新的一週開始得很糟。${pn}把早餐放在桌上，沒有坐下，只問你：「你最近到底在瞞我什麼？」`,
        `這不是吵架的語氣，甚至很平靜。可你知道，平靜常常代表對方已經在心裡走過很多遍崩潰的路。窗外天光很白，你忽然覺得所有藉口都太薄。`,
      ],
    };
  }
  if (game.stats.danger.佔有欲 >= 75) {
    return {
      title: "不能只在縫隙裡見面",
      delta: { partner: { 愛意: -3, 信任: -2, 親密: -3, 懷疑: 5, 失望: 4 }, danger: { 心動: 7, 欲望: 4, 依賴: 8, 佔有欲: 10, 嫉妒: 8 }, player: { 壓力: 14, 愧疚: 9, 偽裝: 2 } },
      paragraphs: [
        `${dn}在週一中午把你堵在樓梯間，聲音壓得很低：「我不想每次都像借來的時間。」`,
        `你看見對方眼底的疲憊和不甘。這段關係開始長出自己的要求，不再滿足於一條深夜訊息、一杯順路咖啡。你沒有被逼迫，卻清楚感覺到選擇正在縮窄。`,
      ],
    };
  }
  return {
    title: pickUnusedWeekly(["新的一週，舊的問題", "週一的天氣預報", "還能裝作沒事嗎", "週三的未接來電", "電梯裡的沉默", "晚餐桌上的空位"]),
    delta: { partner: { 愛意: 0, 信任: 0, 親密: 0, 懷疑: 1, 失望: 0 }, danger: { 心動: 2, 欲望: 1, 依賴: 1, 佔有欲: 2, 嫉妒: 1 }, player: { 壓力: 4, 愧疚: 3, 偽裝: 0 } },
    paragraphs: [
      `第 ${game.week} 週開始。城市照常運轉，捷運照常擁擠，所有人看起來都能把自己的生活處理得很好。`,
      `${pn}傳來一張早餐照片，問你今天會不會準時回家。幾乎同一時間，${dn}問你：「今天會見到你嗎？」兩句話都很普通，普通到你無法責怪任何人。`,
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
  const highCollapse = partner.懷疑 >= 85 || partner.信任 <= 25 || partner.失望 >= 75;
  const guiltyRepair = player.愧疚 >= 70 && partner.愛意 >= 55 && partner.信任 >= 35;
  const dangerBreak = danger.佔有欲 >= 78 || danger.嫉妒 >= 70;
  const quietExit = danger.心動 < 45 && partner.懷疑 < 50 && player.愧疚 >= 45;
  const delta = { partner: { 愛意: 0, 信任: 0, 親密: 0, 懷疑: 0, 失望: 0 }, danger: { 心動: 0, 欲望: 0, 依賴: 0, 佔有欲: 0, 嫉妒: 0 }, player: { 壓力: 0, 愧疚: 0, 偽裝: 0 } };

  if (guiltyRepair && !dangerBreak) {
    return {
      title: "大結局｜主動坦白",
      focus: "partner",
      delta,
      paragraphs: [
        `第 ${game.week} 週，或者更準確地說，在你終於撐不下去的那天晚上，你沒有再編新的理由。你把手機放在桌上，對${pn}說：「我有事要告訴你，可能會很難聽。」`,
        `${pn}很久沒有說話。你看見對方眼裡的震動、受傷，還有一點點你最害怕看見的失望。坦白沒有讓事情變好，它只是讓所有人終於站到真相面前。`,
        `${dn}在隔天收到你的訊息後，只回了一句：「我知道了。」這不是原諒，也不是祝福，而是一種把自己從你的混亂裡拔出來的清醒。`,
        `結局：HE1 主動坦白。你和${pn}沒有立刻和好，但關係沒有當場死亡。接下來會是很長的修復、追問、沉默和重新建立邊界。這不是浪漫的大團圓，是成年人的代價。`,
      ],
    };
  }

  if (quietExit && reason === "deadline") {
    return {
      title: "大結局｜悄然抽身",
      focus: "self",
      delta,
      paragraphs: [
        `第 12 週前，你終於做了一個不像戲劇高潮的決定：不再回覆曖昧的訊息，不再把限時動態分給某個特定的人看，也不再用工作當作所有空白的藉口。`,
        `${dn}察覺得很快，問你：「所以就這樣？」你看著那句話很久，最後只回：「對不起。」這三個字很輕，但比任何解釋都更像句號。`,
        `${pn}沒有知道全部。或者說，沒有在這一輪知道全部。你們的生活看似恢復平穩，可你心裡很清楚，有些東西不是沒爆炸就等於沒發生。`,
        `結局：隱藏結局「悄然抽身」。你全身而退，代價是往後很久都無法理直氣壯地享受平靜。`,
      ],
    };
  }

  if (dangerBreak) {
    return {
      title: "大結局｜危險對象失控",
      focus: "danger",
      delta,
      paragraphs: [
        `${dn}沒有再等你選。第 ${game.week} 週，對方在 IG 發了一則只有你們看得懂的限時動態，文字很短：「借來的時間，總要有人還。」`,
        `${pn}看到的時候沒有立刻質問，只把手機遞到你面前。那一刻你知道，所有你以為藏得很好的曖昧，都已經被拼成一條完整的證據鏈。`,
        `你試著解釋，卻發現語言在真相面前很窄。${dn}也沒有得到想要的答案，佔有、委屈和不甘一起往外翻，把三個人的生活都拖進同一場公開的難堪。`,
        `結局：BE4 危險對象黑化報復。你沒有真正選擇任何人，最後也沒有人再相信你的選擇。`,
      ],
    };
  }

  if (highCollapse || reason === "truth") {
    return {
      title: "大結局｜徹底翻車",
      focus: "self",
      delta,
      paragraphs: [
        `真相不是某一天突然砸下來的。它其實早就存在於你晚回家的時間、刪掉的通知、說話前短暫的停頓裡。第 ${game.week} 週，${pn}終於把那些細節攤開。`,
        `你坐在客廳裡，聽見自己的心跳聲。${pn}問的每一句都很準，準到你連生氣都沒有資格。你可以否認一件事，卻無法否認所有事情排列起來的方向。`,
        `${dn}在另一端等你的回覆。可這一次，你誰都安撫不了。你把兩邊都拖到疼痛裡，也終於被疼痛反過來清算。`,
        `結局：BE1 徹底翻車。分開不是最痛的部分，最痛的是對方離開前已經不再想知道更多。`,
      ],
    };
  }

  return {
    title: "大結局｜雙線崩盤",
    focus: "self",
    delta,
    paragraphs: [
      `第 12 週，故事沒有等到一個漂亮的坦白，也沒有等到一場體面的告別。只是某天開始，${pn}不再主動問你幾點回家，${dn}也不再把每個深夜都留給你。`,
      `你以為最糟糕的結局是爆發，後來才知道，冷掉也可以很殘忍。沒有尖銳的質問，沒有摔門，只有兩段關係同時把你從中心位置移開。`,
      `你還是照常上班、吃飯、滑 IG，只是每次看到相似的街角、相似的訊息提示，都會想起自己曾經有很多次機會停下來。`,
      `結局：BE2 雙線崩盤。你沒有失去全世界，但失去了兩個曾經認真朝你走來的人。`,
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
  return `沒有選擇任何人：${game.setup.identity}`;
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
  if (game.stats.partner.懷疑 >= 30) notes.push(`現任的懷疑已經越過試探線，對方開始記得你的時間差與語氣變化。`);
  if (game.stats.partner.懷疑 >= 50) notes.push(`手機、定位、IG 摯友名單與貼文可見範圍，都可能變成下一次衝突的火種。`);
  if (game.stats.player.愧疚 >= 70) notes.push(`愧疚太高，你開始失眠，白天容易恍神，也更可能突然想坦白。`);
  if (game.stats.player.壓力 >= 80) notes.push(`壓力逼近臨界點，任何一句追問都可能讓你失控。`);
  if (!notes.length) return "";
  return `<p class="message">${notes.join(" ")}</p>`;
}

function renderStats() {
  const groups = [
    ["現任對象", "partner"],
    ["危險對象", "danger"],
    ["玩家狀態", "player"],
  ];
  $("stats").innerHTML = groups
    .map(([title, key]) => `<section class="stat-group"><h3>${title}</h3>${Object.entries(game.stats[key]).map(([name, value]) => statRow(name, value)).join("")}</section>`)
    .join("");
}

function statRow(name, value) {
  const cls = value >= 70 ? "danger" : value >= 45 ? "warn" : "";
  return `<div class="stat-row"><div class="stat-top"><span class="stat-name">${name}</span><strong>${value}</strong></div><div class="meter ${cls}"><i style="width:${value}%"></i></div></div>`;
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
  if (value.includes("現任") || value.includes("回家") || value.includes("坦白") || value.includes("約會")) type = "stable";
  if (value.includes("危險") || value.includes("訊息") || value.includes("見面") || value.includes("咖啡")) type = "danger";
  if (value.includes("騙") || value.includes("加班") || value.includes("刪") || lowered.includes("lie")) type = "lie";
  $("freeInput").value = "";
  choose({ label: `自訂行動：${value}`, type });
});

$("saveBtn").addEventListener("click", () => {
  localStorage.setItem("dangerous-relationship-save", JSON.stringify(game));
  alert("已保存。");
});

$("loadBtn").addEventListener("click", () => {
  const raw = localStorage.getItem("dangerous-relationship-save");
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
