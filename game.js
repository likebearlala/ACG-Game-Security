const setupSteps = [
  {
    key: "identity",
    title: "選擇身份",
    options: ["普通上班族", "設計師", "律師", "醫生", "攝影師", "咖啡店老闆", "自由職業", "玩家自訂", "AI 隨機生成"],
  },
  {
    key: "playerGender",
    title: "選擇自己的性別",
    options: ["女性", "男性", "非二元", "不透露", "玩家自訂", "AI 隨機生成"],
  },
  {
    key: "relationship",
    title: "選擇目前關係",
    options: ["單身", "剛認識", "互有好感", "曖昧中", "第一次約會後", "穩定交往前", "玩家自訂", "AI 隨機生成"],
  },
  {
    key: "targetGender",
    title: "選擇攻略對象性別",
    options: ["男性", "女性", "男女皆有", "不限制", "玩家自訂", "AI 隨機生成"],
  },
  {
    key: "dangerType",
    title: "選擇攻略角色",
    options: ["新同事", "咖啡店常客", "活動認識的人", "朋友介紹", "合租室友", "旅行認識的人", "玩家自訂", "AI 隨機生成"],
  },
  {
    key: "style",
    title: "選擇故事風格",
    options: ["現實慢熱", "欺瞞拉扯", "雙向試探", "高壓祕密", "報復劇情", "玩家自訂 / 全隨機"],
  },
  {
    key: "heat",
    title: "選擇情感濃度",
    options: ["純情感向", "牽手擁抱", "親吻與心動（非露骨）", "過夜陪伴（非露骨）"],
  },
];

const pools = {
  names: {
    male: ["沈予安", "許知遠", "梁以辰", "林晏", "唐若白", "陸景澄", "賀南川", "顧承安"],
    female: ["周靜禾", "陳沐晴", "喬念", "夏知微", "宋以棠", "白若寧", "葉清梨", "程晚星"],
    neutral: ["季安", "凌澈", "南星", "青禾", "言川", "初白"],
  },
  profiles: {
    "沈予安": { age: 26, appearance: "俐落短髮、深邃眼眸、總穿白襯衫", traits: ["溫柔", "沉穩", "偶爾心軟"], background: "出版社副主編，喜歡在深夜讀未出版的手稿。" },
    "許知遠": { age: 28, appearance: "金絲眼鏡、修長手指、笑起來有酒窩", traits: ["理性", "傲嬌", "嘴硬心軟"], background: "科技公司資深工程師，下班後會彈吉他。" },
    "梁以辰": { age: 24, appearance: "微亂黑髮、金絲眼鏡、常穿深色毛衣", traits: ["傲嬌", "細心", "技術控"], background: "獨立遊戲開發者，熬夜寫代碼是日常。" },
    "林晏": { age: 27, appearance: "清爽短髮、溫潤杏眼、總帶著淡淡咖啡香", traits: ["溫柔", "神祕", "若即若離"], background: "咖啡店老闆，總在打烊後獨自坐在角落翻書。" },
    "唐若白": { age: 29, appearance: "銀框眼鏡、瘦削側臉、西裝永遠合身", traits: ["強勢", "專注", "偶爾脆弱"], background: "律師事務所合夥人，工作是他的保護色。" },
    "陸景澄": { age: 25, appearance: "微捲瀏海、琥珀色瞳、笑容帶點邪氣", traits: ["直球", "佔有欲", "偶爾孩子氣"], background: "自由攝影師，鏡頭下的世界比現實溫柔。" },
    "賀南川": { age: 30, appearance: "寸頭、深色外套、下巴線條分明", traits: ["沉默", "可靠", "壓抑感情"], background: "急診醫生，習慣在凌晨三點回家洗手三次。" },
    "顧承安": { age: 26, appearance: "黑色連帽衫、手腕有細銀鍊、眼神懶散", traits: ["慵懶", "敏銳", "嘴毒心善"], background: "音樂製作人，總在截止日前一天交出驚豔的作品。" },
    "周靜禾": { age: 25, appearance: "齊耳短髮、小鹿眼、總背帆布包", traits: ["文靜", "倔強", "暗藏堅定"], background: "獨立書店店員，正在寫自己的第一本小說。" },
    "陳沐晴": { age: 24, appearance: "馬尾、亮眼笑容、運動風穿搭", traits: ["開朗", "直率", "有點迷糊"], background: "體育新聞記者，採訪時比運動員還緊張。" },
    "喬念": { age: 27, appearance: "波浪長髮、紅唇、高跟鞋聲清脆", traits: ["優雅", "精明", "外冷內熱"], background: "品牌公關總監，社交場上的笑容從不多給。" },
    "夏知微": { age: 23, appearance: "碎瀏海、圓框眼鏡、總穿淺色洋裝", traits: ["害羞", "善良", "容易心軟"], background: "甜點店學徒，夢想開一間只有六個座位的店。" },
    "宋以棠": { age: 26, appearance: "冷白肌、銀色耳釘、眼尾微挑", traits: ["獨立", "高冷", "偶爾甜蜜"], background: "展覽策展人，說話很少但每句都精準。" },
    "白若寧": { age: 28, appearance: "黑長直、氣質清冷、總戴銀色手錶", traits: ["理智", "溫柔", "保護欲強"], background: "心理諮商師，最擅長聽別人說不出口的話。" },
    "葉清梨": { age: 22, appearance: "雙馬尾、大眼、笑起來像在發光", traits: ["活潑", "好奇", "有點任性"], background: "大學插畫系四年級，速寫本從不離身。" },
    "程晚星": { age: 25, appearance: "低馬尾、淡妝、聲音低沉好聽", traits: ["沉靜", "敏感", "浪漫主義"], background: "深夜電台主持人，只在午夜才說真心話。" },
    "季安": { age: 24, appearance: "中性穿搭、柔和五官、總戴棒球帽", traits: ["隨和", "細膩", "觀察力強"], background: "自由接案設計師，喜歡在公園畫速寫。" },
    "凌澈": { age: 27, appearance: "銀灰短髮、冷淡表情、偶爾露出笑容", traits: ["冷傲", "認真", "不善表達"], background: "古典鋼琴演奏者，只在音樂裡表達情感。" },
    "南星": { age: 23, appearance: "陽光膚色、明亮眼睛、總穿寬鬆T恤", traits: ["樂觀", "直球", "容易害羞"], background: "衝浪教練，相信每一道浪都值得追。" },
    "青禾": { age: 26, appearance: "清秀五官、細長手指、總帶著筆記本", traits: ["安靜", "溫暖", "慢熱"], background: "植物園研究員，說話像在描述季節的更迭。" },
    "言川": { age: 25, appearance: "俐落中短髮、深色穿搭、氣場很穩", traits: ["冷靜", "保護欲", "嘴硬"], background: "刑事律師，法庭上的氣勢和下班後完全不同。" },
    "初白": { age: 22, appearance: "軟綿綿的劉海、淺色瞳、笑容很治癒", traits: ["天然呆", "真誠", "偶爾認真"], background: "花藝師，相信每束花都能傳達一句說不出口的話。" },
  },
  playerGenders: ["女性", "男性", "非二元", "不透露"],
  targetGenders: ["男性", "女性", "男女皆有", "不限制"],
  partnerTraits: ["溫柔體貼型", "敏感多疑型", "強勢獨立型", "感情遲鈍型", "細心觀察型"],
  dangerTraits: ["溫柔攻勢型", "進攻直球型", "糾纏舊識型", "報復誘惑型", "陽光曖昧型"],
  jobs: ["出版社編輯", "展覽策展人", "品牌企劃", "急診護理師", "獨立攝影師", "資料分析師"],
};

function affinityLevel(group) {
  if (!game || !game.stats[group]) return 0;
  const s = game.stats[group];
  if (group === "partner") return Math.min(15, Math.floor((s.愛意 + s.信任 + s.親密) / 20));
  if (group === "danger") return Math.min(15, Math.floor((s.心動 + s.吸引 + s.依賴) / 20));
  return 0;
}

function affinityLabel(level) {
  if (level >= 11) return "💕 心動期";
  if (level >= 6) return "💗 曖昧期";
  return "🤍 認識期";
}

function profileCard(group) {
  const p = game?.profiles?.[group];
  if (!p) return "";
  return `${p.name}（${p.age}歲）｜${p.traits.join("・")}｜${p.appearance}`;
}

function roleCard(group) {
  const p = game?.profiles?.[group];
  const name = game?.names?.[group] || "";
  if (group === "partner") {
    return `partner = 主要攻略角色 = ${name}。這是正常戀愛/穩定攻略線，不是危險對象。角色卡：${p ? `${p.age}歲，${p.traits.join("・")}，${p.appearance}，${p.background}` : "無"}`;
  }
  if (group === "danger") {
    return `danger = 危險對象 = ${name}。這是誘惑、欺瞞、報復或高風險曖昧線，不是主要攻略角色。角色卡：${p ? `${p.age}歲，${p.traits.join("・")}，${p.appearance}，${p.background}` : "無"}`;
  }
  return "";
}

function actionFocus(type) {
  if (type === "stable") return "本次選擇聚焦 partner 主要攻略角色，danger 只能作為干擾或背景壓力。";
  if (type === "danger") return "本次選擇聚焦 danger 危險對象，partner 只能作為關係壓力或後果來源。";
  if (type === "lie") return "本次選擇聚焦欺瞞行為，必須清楚標明欺瞞影響 partner 或 danger 的哪一方。";
  if (type === "social") return "本次選擇聚焦社群可見範圍，必須清楚區分 partner 與 danger 看到的內容。";
  if (type === "self") return "本次選擇聚焦玩家自我整理，可以同時提到兩名角色，但身份不可互換。";
  return "本次選擇可收束劇情，但 partner 與 danger 的身份仍不可互換。";
}

const stages = [
  "第一階段：單身生活",
  "第二階段：危險接觸",
  "第三階段：秘密曖昧",
  "第四階段：欺瞞升溫",
  "第五階段：報復逼近",
  "第六階段：結局",
];

let setupIndex = 0;
let setupData = {};
let selectedOption = "";
let game = null;
let gameStarted = false;

const $ = (id) => document.getElementById(id);
const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const avatarPool = [
  "assets/lead-cutout.png",
  "assets/partner-cutout.png",
  "assets/danger-cutout.png",
  "assets/walk-cutout.png",
];

const DEFAULT_LLM_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const DEFAULT_LLM_MODEL = "gpt-4o-mini";
const llmAPI = {
  apiKey: "",
  endpoint: DEFAULT_LLM_ENDPOINT,
  model: DEFAULT_LLM_MODEL,
  ready: false,
  skipped: false,
  lastError: "",
};

function randomAvatars() {
  const shuffled = [...avatarPool].sort(() => Math.random() - 0.5);
  return {
    player: shuffled[0],
    partner: shuffled[1],
    danger: shuffled[2],
  };
}

function avatarFor(group) {
  const fallback = {
    player: "assets/lead-cutout.png",
    partner: "assets/partner-cutout.png",
    danger: "assets/danger-cutout.png",
  };
  return game?.avatars?.[group] || fallback[group] || fallback.player;
}

function setLLMStatus(text) {
  const status = $("llmStatus");
  const detail = $("llmGateDetail");
  const label = $("llmGateStatus");
  if (status) status.textContent = `LLM狀態：${text}`;
  if (detail) detail.textContent = text;
  if (label) label.textContent = text;
}

function startGameAfterLLMGate() {
  if (gameStarted || !game) return;
  gameStarted = true;
  $("llmGate").classList.add("hidden");
  $("setup").classList.add("hidden");
  $("game").classList.remove("hidden");
  void renderOpening();
}

function configureLLMFromForm() {
  const apiKey = $("llmApiKey").value.trim();
  const endpoint = $("llmEndpoint").value.trim() || DEFAULT_LLM_ENDPOINT;
  const model = $("llmModel").value.trim() || DEFAULT_LLM_MODEL;
  if (!apiKey) {
    setLLMStatus("請先輸入 API Key，或選擇陽春版。");
    return false;
  }
  llmAPI.apiKey = apiKey;
  llmAPI.endpoint = endpoint;
  llmAPI.model = model;
  llmAPI.ready = true;
  llmAPI.skipped = false;
  setLLMStatus("LLM API 已設定，準備進入遊戲。");
  return true;
}

function llmScenePrompt(choice, scene) {
  const partnerAff = affinityLevel("partner");
  const dangerAff = affinityLevel("danger");
  const snapshot = {
    week: game.week,
    ap: game.ap,
    stageIndex: game.stage,
    stage: stages[game.stage],
    action: choice.label,
    actionType: choice.type,
    setup: game.setup,
    names: game.names,
    traits: game.traits,
    profiles: game.profiles,
    roleMap: { partner: roleCard("partner"), danger: roleCard("danger") },
    currentFocusRule: actionFocus(choice.type),
    affinity: { partner: { level: partnerAff, label: affinityLabel(partnerAff) }, danger: { level: dangerAff, label: affinityLabel(dangerAff) } },
    stats: game.stats,
    title: scene.title,
    sourceParagraphs: scene.paragraphs,
    recentChoices: game.choicesMade.slice(-8),
    existingDeltaShape: scene.delta,
    validChoiceTypes: ["stable", "danger", "lie", "self", "social", "nextWeek", "ending"],
  };

  return `你是繁體中文視覺小說戀愛遊戲的劇情導演，也是資深乙女遊戲編劇。
請根據玩家開局設定、目前數值、最近選擇、角色姓名與性別，生成下一個完整可互動劇情節點。

角色設定規範：
- ${roleCard("partner")}，好感階段：${affinityLabel(partnerAff)}（${partnerAff}/15）
- ${roleCard("danger")}，好感階段：${affinityLabel(dangerAff)}（${dangerAff}/15）
- 本次焦點：${actionFocus(choice.type)}
- partner 與 danger 是兩個不同角色，姓名、身份、性格、數值線都不可互換。
- 寫到 partner 時只能使用主要攻略角色、穩定線、正常戀愛線、信任與親密語境。
- 寫到 danger 時只能使用危險對象、誘惑線、欺瞞/報復/高風險曖昧語境。
- 不要把 danger 稱為主要攻略角色；不要把 partner 稱為危險對象。
- 若同一段同時出現兩人，必須用姓名明確區分誰說話、誰行動、誰造成後果。
- 請嚴格依照角色的性格關鍵詞決定對白風格和行為模式。

安全邊界：
- 角色都必須是成年人。不要加入未成年。
- 可以保留欺瞞、報復、曖昧拉扯、肢體接觸、親吻、過夜、關係失控與後果。
- 玩家關係起點是單身、剛認識、曖昧或正常戀愛推進。

寫作規範：
- 語言風格：使用甜蜜、細膩且帶點俏皮的語氣。避免粗俗、歧視或沉重內容。
- 字數限制：所有敘述和台詞總字數不超過 300 字。每個單句不超過 30 字。
- 情感與好感度層次：
  好感度分為三階段：「好感 0-5」為初步認識（語氣禮貌、保持距離）、「好感 6-10」為互有好感與曖昧（語氣親暱、會臉紅）、「好感 11-15」為穩定交往前的心動（語氣甜蜜、有肢體接觸）。
  請根據當前好感階段決定角色的親密度與對白語氣。
- 分支機制：最多生成 3 個選項。每個選項應引導不同的好感度變化，並在對應場景做出自然回饋。

輸出必須是純 JSON，不能有 markdown，格式如下：
{
  "title": "本段標題",
  "paragraphs": ["3 到 5 段小說式劇情，每段單句必小於 30 字，總長小於 300 字"],
  "delta": {
    "partner": { "必須沿用 existingDeltaShape.partner 的所有 key": 0 },
    "danger": { "必須沿用 existingDeltaShape.danger 的所有 key": 0 },
    "player": { "必須沿用 existingDeltaShape.player 的所有 key": 0 }
  },
  "choices": [
    { "label": "下一個具體行動，必須和本段劇情直接相關", "type": "stable|danger|lie|self|social|nextWeek|ending" }
  ],
  "ending": null
}

規則：
- choices 必須有 2 到 3 個，不能每次都一樣。
- 每個 choice 要導向不同的情緒與風險：坦白、靠近、欺瞞、報復、抽身、推進關係等。
- choices.label 要像玩家真正在對 LLM 下指令，不要寫成泛用選單，字數小於 30 字。
- 如果目前選擇或數值已經足以收束，ending 可改成：
  { "title": "結局名", "focus": "self|partner|danger", "paragraphs": ["3 到 5 段結局小說"] }
- 不要讓 AI 直接改遊戲規則；delta 只做小到中等幅度變動，數字介於 -18 到 18。
- 回覆內容要明顯呼應本次 action 與 setup，讓不同設定與選項產生不同小說內容、選項與可能結局。
- 回覆前先自我檢查：${game.names.partner} 是否全程是 partner/主要攻略角色？${game.names.danger} 是否全程是 danger/危險對象？若混淆，請自行重寫後再輸出 JSON。
- choices.label 如果要點名角色，必須直接使用正確姓名，不要只寫「他/她/對方」。

目前遊戲狀態：
${JSON.stringify(snapshot)}`;
}

function extractJSON(text) {
  const trimmed = String(text || "").trim();
  if (!trimmed) throw new Error("LLM returned empty content");
  try {
    return JSON.parse(trimmed);
  } catch (_) {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) throw new Error("LLM did not return JSON");
    return JSON.parse(trimmed.slice(start, end + 1));
  }
}

function cleanTextArray(value, fallback) {
  const items = Array.isArray(value) ? value : [];
  const cleaned = items.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 5);
  return cleaned.length >= 2 ? cleaned : fallback;
}

function normalizeChoiceType(type) {
  const allowed = new Set(["stable", "danger", "lie", "self", "social", "nextWeek", "ending"]);
  return allowed.has(type) ? type : "self";
}

function normalizeLLMChoices(value, fallback) {
  const items = Array.isArray(value) ? value : [];
  const choices = items
    .map((item) => {
      if (typeof item === "string") return makeChoice(item.trim(), "self");
      return makeChoice(String(item?.label || "").trim(), normalizeChoiceType(item?.type));
    })
    .filter((choice) => choice.label)
    .slice(0, 3);
  return choices.length >= 2 ? choices : fallback;
}

function cloneDelta(delta) {
  return JSON.parse(JSON.stringify(delta || {}));
}

function normalizeLLMDelta(value, fallback) {
  const normalized = cloneDelta(fallback);
  Object.keys(normalized).forEach((group) => {
    Object.keys(normalized[group]).forEach((key) => {
      const raw = Number(value?.[group]?.[key]);
      normalized[group][key] = Number.isFinite(raw) ? Math.max(-18, Math.min(18, Math.round(raw))) : normalized[group][key];
    });
  });
  return normalized;
}

function normalizeLLMEnding(value) {
  if (!value || typeof value !== "object") return null;
  const paragraphs = cleanTextArray(value.paragraphs, []);
  if (paragraphs.length < 2) return null;
  const focus = ["self", "partner", "danger"].includes(value.focus) ? value.focus : "self";
  return {
    title: String(value.title || "生成結局").trim() || "生成結局",
    focus,
    paragraphs,
  };
}

function normalizeLLMNode(payload, scene, fallbackChoices) {
  return {
    ...scene,
    title: String(payload.title || scene.title).trim() || scene.title,
    paragraphs: cleanTextArray(payload.paragraphs, scene.paragraphs),
    delta: normalizeLLMDelta(payload.delta, scene.delta),
    choices: normalizeLLMChoices(payload.choices, fallbackChoices),
    ending: normalizeLLMEnding(payload.ending),
    generatedByLLM: true,
  };
}

async function generateLLMScene(choice, scene, fallbackChoices) {
  if (!llmAPI.ready || !llmAPI.apiKey || llmAPI.skipped) {
    return { ...scene, choices: fallbackChoices };
  }
  setLLMStatus("LLM API 正在生成劇情與選項");

  try {
    const response = await fetch(llmAPI.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${llmAPI.apiKey}`,
      },
      body: JSON.stringify({
        model: llmAPI.model,
        messages: [
          {
            role: "system",
            content: "你是繁體中文乙女視覺小說遊戲引擎與資深戀愛劇本編劇。你只輸出可解析 JSON。partner 永遠是主要攻略角色；danger 永遠是危險對象，兩者姓名、身份、性格與劇情功能不可互換。請根據角色卡維持角色一致性，用甜蜜細膩的語氣生成劇情、下一步選項（最多3個）、數值變動與可能結局。每個單句不超過30字，總字數不超過300字。",
          },
          { role: "user", content: llmScenePrompt(choice, scene) },
        ],
        temperature: 0.95,
        top_p: 0.92,
        max_tokens: 1400,
      }),
    });
    if (!response.ok) throw new Error(`LLM API HTTP ${response.status}`);
    const reply = await response.json();
    const content = reply?.choices?.[0]?.message?.content || "";
    const payload = extractJSON(content);
    const node = normalizeLLMNode(payload, scene, fallbackChoices);
    setLLMStatus("LLM API 已生成本段劇情與選項");
    return node;
  } catch (error) {
    llmAPI.lastError = error?.message || String(error);
    console.error("LLM API scene generation failed", error);
    setLLMStatus(`LLM API 失敗：${llmAPI.lastError}`);
    return {
      ...scene,
      paragraphs: [
        ...scene.paragraphs,
        `LLM API 呼叫失敗，目前使用陽春版規則。錯誤：${llmAPI.lastError}。請確認 API Key、Endpoint、Model，或該供應商是否允許瀏覽器 CORS 呼叫。`,
      ],
      choices: fallbackChoices,
      generatedByLLM: false,
    };
  }
}


function allTargetNames() {
  return [...pools.names.male, ...pools.names.female, ...pools.names.neutral];
}

function namesForTargetGender(targetGender) {
  if (targetGender.includes("男") && !targetGender.includes("女")) {
    return { partner: pools.names.male, danger: pools.names.male };
  }
  if (targetGender.includes("女") && !targetGender.includes("男")) {
    return { partner: pools.names.female, danger: pools.names.female };
  }
  if (targetGender.includes("男女")) {
    return Math.random() < 0.5
      ? { partner: pools.names.male, danger: pools.names.female }
      : { partner: pools.names.female, danger: pools.names.male };
  }
  return { partner: allTargetNames(), danger: allTargetNames() };
}

function playerProfileLabel() {
  return `${game.setup.identity}｜${game.setup.playerGender || "未設定"}`;
}

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
  const playerGender = setupData.playerGender.includes("隨機") ? pick(pools.playerGenders) : setupData.playerGender;
  const relation = setupData.relationship.includes("隨機") ? pick(["單身", "剛認識", "互有好感", "曖昧中"]) : setupData.relationship;
  const targetGender = setupData.targetGender.includes("隨機") ? pick(pools.targetGenders) : setupData.targetGender;
  const dangerType = setupData.dangerType.includes("隨機") ? pick(["新同事", "咖啡店常客", "朋友介紹", "旅行認識的人"]) : setupData.dangerType;
  const targetNames = namesForTargetGender(targetGender);
  const partnerName = pick(targetNames.partner);
  let dangerName = pick(targetNames.danger.filter((name) => name !== partnerName));
  if (!dangerName) dangerName = pick(allTargetNames().filter((name) => name !== partnerName));

  gameStarted = false;

  const partnerProfile = pools.profiles[partnerName] || { age: rand(23, 30), appearance: "氣質出眾", traits: ["溫柔", "認真", "細心"], background: "在城市裡安靜生活的人。" };
  const dangerProfile = pools.profiles[dangerName] || { age: rand(22, 29), appearance: "眼神帶著吸引力", traits: ["神祕", "大膽", "迷人"], background: "總是在不經意間出現的人。" };

  game = {
    week: 1,
    ap: 5,
    stage: 0,
    sceneCount: 0,
    choicesMade: [],
    usedEvents: [],
    ended: false,
    setup: { ...setupData, identity, playerGender, relation, targetGender, dangerType },
    names: { partner: partnerName, danger: dangerName },
    avatars: randomAvatars(),
    traits: { partner: pick(pools.partnerTraits), danger: pick(pools.dangerTraits) },
    profiles: {
      partner: { name: partnerName, ...partnerProfile },
      danger: { name: dangerName, ...dangerProfile },
    },
    stats: {
      partner: { 愛意: rand(18, 32), 信任: rand(25, 42), 親密: rand(8, 20), 不安: rand(8, 18), 距離: rand(0, 8) },
      danger: { 心動: rand(8, 18), 吸引: rand(4, 12), 依賴: rand(3, 10), 主動: rand(4, 12), 在意: rand(0, 8) },
      player: { 壓力: rand(8, 18), 猶豫: rand(8, 18), 界線感: 50 },
    },
    log: [],
    lastTitle: "雨還沒落下來",
  };

  llmAPI.ready = false;
  llmAPI.skipped = false;
  llmAPI.apiKey = "";
  llmAPI.lastError = "";
  $("setup").classList.add("hidden");
  $("llmGate").classList.remove("hidden");
  $("llmApiKey").value = "";
  $("llmEndpoint").value = DEFAULT_LLM_ENDPOINT;
  $("llmModel").value = DEFAULT_LLM_MODEL;
  setLLMStatus("請輸入 API Key 以啟用 LLM，或選擇陽春版。");
}

async function renderOpening() {
  const s = game.setup;
  const title = "開場：雨還沒落下來";
  const paragraphs = [
    `你是${s.identity}，性別設定是「${s.playerGender}」。今晚你把自己推進一段新的關係裡：${s.relation}。這不是已婚或現任伴侶的背叛，而是單身之後，從試探、曖昧到可能認真戀愛的危險靠近。`,
    `你想攻略的對象性別設定是「${s.targetGender}」。${game.names.partner}帶著${game.traits.partner}的氣質靠近你，而${game.names.danger}則以「${s.dangerType}」的方式留下另一條看似更刺激的路。`,
    `這局風格是「${s.style}」，親密尺度是「${s.heat}」。你可以選擇坦白靠近，也可以選擇欺瞞、報復或曖昧拉扯；每一次選擇都會改變接下來的小說內容、選項與可能結局。`,
  ];
  const baseScene = { title, paragraphs, delta: emptyDelta() };
  const opening = await generateLLMScene(makeChoice("根據開局設定生成第一幕", "self"), baseScene, openingChoices());
  showScene(opening.title, opening.paragraphs, opening.choices, null);
}

function openingChoices() {
  return [
    makeChoice("約主要攻略角色吃一頓晚餐", "stable"),
    makeChoice("回覆危險對象的試探訊息", "danger"),
    makeChoice("把兩邊的訊息都暫時晾著", "self"),
    makeChoice("翻看 IG 頁面，觀察兩人的動態", "social"),
  ];
}

function makeChoice(label, type) {
  return { label, type };
}

function emptyDelta() {
  return Object.fromEntries(
    Object.entries(game.stats).map(([group, values]) => [
      group,
      Object.fromEntries(Object.keys(values).map((key) => [key, 0])),
    ])
  );
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
  if (group === "partner") return avatarFor("partner");
  if (group === "danger") return avatarFor("danger");
  return avatarFor("player");
}

function deltaDisplayName(group) {
  if (group === "partner") return `主要攻略角色｜${game.names.partner}`;
  if (group === "danger") return `危險對象｜${game.names.danger}`;
  return `你｜${playerProfileLabel()}`;
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
  return group === "partner" ? "主要攻略角色" : group === "danger" ? "危險對象" : "玩家";
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

async function choose(choice) {
  if (game.ended) return;
  if (game.ap <= 0) return nextWeek();
  game.ap -= 1;
  game.sceneCount += 1;
  game.choicesMade.push(choice.label);

  const baseScene = buildScene(choice);
  const fallbackChoices = game.ap <= 0 ? [makeChoice("進入下一週", "nextWeek")] : nextChoices(choice.type);
  const scene = await generateLLMScene(choice, baseScene, fallbackChoices);
  applyDelta(scene.delta);
  riskPulse(choice.type);
  advanceStage();
  if (scene.ending) return showGeneratedEnding(scene.ending, scene.delta);
  if (choice.type === "ending" || game.stage >= 5) return showEnding("truth");
  if (game.ap <= 0) scene.paragraphs.push("這一週的行動點已用完，接下來的選擇會把你推進下一週。");
  showScene(scene.title, scene.paragraphs, game.ap <= 0 ? [makeChoice("進入下一週", "nextWeek")] : scene.choices, scene.delta);
}

function riskPulse(type) {
  const p = game.stats.partner;
  const d = game.stats.danger;
  const pl = game.stats.player;
  if (type === "danger" && (d.心動 + d.主動 > 95 || game.setup.style.includes("高壓") || game.setup.style.includes("報復"))) {
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
  const highPressure = style.includes("高壓") || style.includes("報復");
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
        id: "lie-overtime",
        title: "一個看似完整的理由",
        delta: game.stats.player.界線感 > 60
          ? { partner: { 愛意: -1, 信任: -1, 親密: -1, 不安: 2, 距離: 3 }, danger: { 心動: 5, 吸引: 2, 依賴: 3, 主動: 4, 在意: 0 }, player: { 壓力: 15, 猶豫: 12, 界線感: 5 } }
          : { partner: { 愛意: -3, 信任: -5, 親密: -2, 不安: 12, 距離: 9 }, danger: { 心動: 4, 吸引: 2, 依賴: 2, 主動: 5, 在意: 1 }, player: { 壓力: 20, 猶豫: 14, 界線感: -8 } },
        paragraphs: [
          `你說今晚要加班，語氣平穩到連自己都差點相信。${pn}在電話那頭停了一下，只回：「好，那你別太晚。」`,
          `掛斷後你沒有立刻鬆一口氣。欺瞞真正可怕的地方不是說出口，而是它需要你接下來用更多細節去維護：幾點下班、誰在場、為什麼背景音那麼安靜。`,
          `${dn}看著你收起手機，低聲問：「你每次都這樣嗎？」沒有審判，卻比審判更難受。`,
        ],
      },
      {
        id: "lie-delete",
        title: "刪除之前先看了一眼",
        delta: { partner: { 愛意: -2, 信任: -3, 親密: -1, 不安: game.stats.player.界線感 > 60 ? 3 : 10, 距離: 5 }, danger: { 心動: 4, 吸引: 1, 依賴: 4, 主動: 7, 在意: 2 }, player: { 壓力: 13, 猶豫: 11, 界線感: game.stats.player.界線感 > 60 ? 4 : -5 } },
        paragraphs: [
          `你打開和${dn}的聊天記錄，手指停在刪除鍵上。那些句子其實沒有多露骨，甚至很多都只是「到了嗎」「今天辛苦了」，可它們排列在一起，就成了一段不能被看見的關係。`,
          `你刪掉之前又看了一眼。就是這一眼，讓你知道自己不是怕被發現而已，你也捨不得那部分被證明存在過的自己。`,
          `手機鎖屏後，${pn}剛好傳來訊息：「你剛剛在笑什麼？」你才發現自己的表情沒有收乾淨。`,
        ],
      },
      {
        id: "lie-location",
        title: "定位關掉的那一秒",
        delta: { partner: { 愛意: -3, 信任: -5, 親密: -2, 不安: 9, 距離: 7 }, danger: { 心動: 5, 吸引: 2, 依賴: 3, 主動: 5, 在意: 1 }, player: { 壓力: 18, 猶豫: 12, 界線感: -2 } },
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
    makeChoice("主動安排和主要攻略角色的約會", "stable"),
    makeChoice("答應危險對象單獨見面", "danger"),
    makeChoice("用加班當理由製造空檔", "lie"),
    makeChoice("暫時冷處理兩邊訊息", "self"),
  ];
  if (game.stats.partner.不安 >= 30) base[0] = makeChoice("面對主要攻略角色的試探", "stable");
  if (game.stats.danger.主動 >= 55) base[1] = makeChoice("處理危險對象的逼近", "danger");
  if (previousType === "danger") base.push(makeChoice("刪除聊天記錄", "lie"));
  if (game.ap <= 2) base.push(makeChoice("提前結束本週", "nextWeek"));
  return base;
}

async function nextWeek() {
  if (game.ended) return;
  if (game.week >= 12) return showEnding("deadline");
  game.week += 1;
  game.ap = 5;
  const weekChoice = makeChoice("進入下一週", "week");
  game.choicesMade.push(weekChoice.label);
  const baseWeekly = weeklyEvent();
  const weekly = await generateLLMScene(weekChoice, baseWeekly, nextChoices("week"));
  applyDelta(weekly.delta);
  advanceStage();
  if (weekly.ending) return showGeneratedEnding(weekly.ending, weekly.delta);
  if (game.stage >= 5) return showEnding("truth");
  showScene(weekly.title, weekly.paragraphs, weekly.choices, weekly.delta);
}

function weeklyEvent() {
  const pn = game.names.partner;
  const dn = game.names.danger;
  const suspicion = game.stats.partner.不安;
  if (game.week >= 10) {
    return {
      title: "最後幾週的倒數",
      delta: { partner: { 愛意: -2, 信任: -2, 親密: -1, 不安: 5, 距離: 4 }, danger: { 心動: 4, 吸引: 2, 依賴: 4, 主動: 6, 在意: 4 }, player: { 壓力: 12, 猶豫: 10, 界線感: -2 } },
      paragraphs: [
        `第 ${game.week} 週開始時，你明顯感覺到時間不再站在你這邊。每個人都還在照常生活，但照常只是表面，真正的東西已經在底下發燙。`,
        `${pn}開始不再把疑問吞回去，${dn}也不再滿足於只能在縫隙裡出現。你知道，這段危險曖昧最晚會在第 12 週前走到結局，不會永遠用「下次再說」拖著。`,
      ],
    };
  }
  if (suspicion >= 70) {
    return {
      title: "週一早晨的質問",
      delta: { partner: { 愛意: -8, 信任: -10, 親密: -5, 不安: 8, 距離: 12 }, danger: { 心動: 2, 吸引: 0, 依賴: 3, 主動: 8, 在意: 3 }, player: { 壓力: 16, 猶豫: 12, 界線感: -5 } },
      paragraphs: [
        `新的一週開始得很糟。${pn}沒有繞圈子，只問你：「你最近到底在瞞我什麼？」`,
        `這不是吵架的語氣，甚至很平靜。可你知道，平靜常常代表對方已經在心裡走過很多遍崩潰的路。窗外天光很白，你忽然覺得所有藉口都太薄。`,
      ],
    };
  }
  if (game.stats.danger.主動 >= 75) {
    return {
      title: "不能只在縫隙裡見面",
      delta: { partner: { 愛意: -3, 信任: -2, 親密: -3, 不安: 5, 距離: 4 }, danger: { 心動: 7, 吸引: 4, 依賴: 8, 主動: 10, 在意: 8 }, player: { 壓力: 14, 猶豫: 9, 界線感: 2 } },
      paragraphs: [
        `${dn}在週一中午把你堵在樓梯間，聲音壓得很低：「我不想每次都像借來的時間。」`,
        `你看見對方眼底的疲憊和不甘。這段關係開始長出自己的要求，不再滿足於一條深夜訊息、一杯順路咖啡。你沒有被逼迫，卻清楚感覺到選擇正在縮窄。`,
      ],
    };
  }
  return {
    title: pickUnusedWeekly(["新的一週，舊的問題", "週一的天氣預報", "還能裝作沒事嗎", "週三的未接來電", "電梯裡的沉默", "晚餐桌上的空位"]),
    delta: { partner: { 愛意: 0, 信任: 0, 親密: 0, 不安: 1, 距離: 0 }, danger: { 心動: 2, 吸引: 1, 依賴: 1, 主動: 2, 在意: 1 }, player: { 壓力: 4, 猶豫: 3, 界線感: 0 } },
    paragraphs: [
      `第 ${game.week} 週開始。城市照常運轉，捷運照常擁擠，所有人看起來都能把自己的生活處理得很好。`,
      `${pn}傳來一張早餐照片，問你今天會不會準時回訊息。幾乎同一時間，${dn}問你：「今天會見到你嗎？」兩句話都很普通，普通到你無法責怪任何人。`,
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

function showGeneratedEnding(ending, delta = null) {
  game.ended = true;
  game.stage = 5;
  game.ap = 0;
  game.ending = { ...ending, delta: delta || resolveEnding("truth").delta };
  showScene(game.ending.title, game.ending.paragraphs, [makeChoice("查看結局詳情", "openEndingPage"), makeChoice("重新開始", "restartGame")], game.ending.delta);
  renderEndingPage(game.ending);
}

function resolveEnding(reason) {
  const pn = game.names.partner;
  const dn = game.names.danger;
  const { partner, danger, player } = game.stats;
  const highCollapse = partner.不安 >= 85 || partner.信任 <= 25 || partner.距離 >= 75;
  const guiltyRepair = player.猶豫 >= 70 && partner.愛意 >= 55 && partner.信任 >= 35;
  const dangerBreak = danger.主動 >= 78 || danger.在意 >= 70;
  const quietExit = danger.心動 < 45 && partner.不安 < 50 && player.猶豫 >= 45;
  const delta = { partner: { 愛意: 0, 信任: 0, 親密: 0, 不安: 0, 距離: 0 }, danger: { 心動: 0, 吸引: 0, 依賴: 0, 主動: 0, 在意: 0 }, player: { 壓力: 0, 猶豫: 0, 界線感: 0 } };

  if (guiltyRepair && !dangerBreak) {
    return {
      title: "大結局｜主動坦白",
      focus: "partner",
      delta,
      paragraphs: [
        `第 ${game.week} 週，或者更準確地說，在你終於撐不下去的那天晚上，你沒有再編新的理由。你把手機放在桌上，對${pn}說：「我有事要告訴你，可能會很難聽。」`,
        `${pn}很久沒有說話。你看見對方眼裡的震動、受傷，還有一點點你最害怕看見的失望。坦白沒有讓事情變好，它只是讓所有人終於站到真相面前。`,
        `${dn}在隔天收到你的訊息後，只回了一句：「我知道了。」這不是原諒，也不是祝福，而是一種把自己從你的混亂裡拔出來的清醒。`,
        `結局：HE1 主動坦白。沒有已婚，也沒有現任，但欺瞞仍然有代價。你和${pn}沒有立刻和好，接下來會是很長的修復、追問、沉默和重新建立邊界。`,
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
        `${pn}沒有知道全部。或者說，沒有在這一輪知道全部。你的生活看似恢復平穩，可你心裡很清楚，有些東西不是沒爆炸就等於沒發生。`,
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
        `${pn}看到的時候沒有立刻質問，只把手機截圖遞到你面前。那一刻你知道，所有你以為藏得很好的曖昧，都已經被拼成一條完整的證據鏈。`,
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
        `真相不是某一天突然砸下來的。它其實早就存在於你晚回訊息的時間、刪掉的通知、說話前短暫的停頓裡。第 ${game.week} 週，${pn}終於把那些細節攤開。`,
        `你坐在客廳裡，聽見自己的心跳聲。${pn}問的每一句都很準，準到你連生氣都沒有資格。你可以否認一件事，卻無法否認所有事情排列起來的方向。`,
        `${dn}在另一端等你的回覆。可這一次，你誰都安撫不了。你把兩邊都拖到疼痛裡，也終於被疼痛反過來清算。`,
        `結局：BE1 徹底翻車。這不是已婚或現任背叛，卻仍然是欺瞞造成的關係崩裂。`,
      ],
    };
  }

  return {
    title: "大結局｜雙線崩盤",
    focus: "self",
    delta,
    paragraphs: [
      `第 12 週，故事沒有等到一個漂亮的坦白，也沒有等到一場體面的告別。只是某天開始，${pn}不再主動問你幾點回訊息，${dn}也不再把每個深夜都留給你。`,
      `你以為最糟糕的結局是爆發，後來才知道，冷掉也可以很殘忍。沒有尖銳的質問，沒有摔門，只有兩段關係同時把你從中心位置移開。`,
      `你還是照常上班、吃飯、滑 IG，只是每次看到相似的街角、相似的訊息提示，都會想起自己曾經有很多次機會停下來。`,
      `結局：BE2 雙線崩盤。你沒有失去全世界，但失去了兩個曾經認真朝你走來的人。`,
    ],
  };
}

function endingAvatar(focus) {
  if (focus === "partner") return avatarFor("partner");
  if (focus === "danger") return avatarFor("danger");
  return avatarFor("player");
}

function endingFocusLabel(focus) {
  if (focus === "partner") return `你選擇面對：${game.names.partner}`;
  if (focus === "danger") return `結局核心人物：${game.names.danger}`;
  return `沒有選擇任何人：${playerProfileLabel()}`;
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
  $("playerRole").textContent = playerProfileLabel();
  $("partnerName").textContent = game.names.partner;
  $("dangerName").textContent = game.names.danger;
  const pp = game.profiles?.partner;
  const dp = game.profiles?.danger;
  if ($("partnerProfile")) $("partnerProfile").textContent = pp ? `${pp.age}歲｜${pp.traits.join("・")}` : "";
  if ($("dangerProfile")) $("dangerProfile").textContent = dp ? `${dp.age}歲｜${dp.traits.join("・")}` : "";
  $("playerAvatar").src = avatarFor("player");
  $("partnerAvatar").src = avatarFor("partner");
  $("dangerAvatar").src = avatarFor("danger");
  const apLine = `<p class="message">目前行動點：${game.ap} / 5。關係階段：${stages[game.stage]}。距離大結局最多還有 ${Math.max(0, 12 - game.week)} 週。</p>`;
  const deltaLine = hasDelta(delta) ? `<p class="delta">數值變動：${deltaText(delta)}</p>` : "";
  $("story").innerHTML = paragraphs.map((p) => `<p>${p}</p>`).join("") + apLine + deltaLine + thresholdText();
  showDeltaPopup(delta);
  const choicesEl = $("choices");
  choicesEl.innerHTML = "";
  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.dataset.type = choice.type;
    btn.dataset.label = choice.label;
    btn.textContent = choice.label;
    choicesEl.appendChild(btn);
  });
  [...choicesEl.querySelectorAll("button")].forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.type === "restartGame") restartGame();
      if (btn.dataset.type === "openEndingPage") renderEndingPage();
      if (btn.dataset.type === "nextWeek") void nextWeek();
      else if (btn.dataset.type !== "restartGame" && btn.dataset.type !== "openEndingPage") void choose({ label: btn.dataset.label, type: btn.dataset.type });
    });
  });
  $("freeForm").classList.toggle("hidden", Boolean(game.ended));
  renderStats();
}

function thresholdText() {
  const notes = [];
  if (game.stats.partner.不安 >= 30) notes.push(`主要攻略角色的不安已經越過試探線，對方開始記得你的時間差與語氣變化。`);
  if (game.stats.partner.不安 >= 50) notes.push(`手機、定位、IG 摯友名單與貼文可見範圍，都可能變成下一次衝突的火種。`);
  if (game.stats.player.猶豫 >= 70) notes.push(`猶豫太高，你開始失眠，白天容易恍神，也更可能突然想坦白。`);
  if (game.stats.player.壓力 >= 80) notes.push(`壓力逼近臨界點，任何一句追問都可能讓你失控。`);
  if (!notes.length) return "";
  return `<p class="message">${notes.join(" ")}</p>`;
}

function renderStats() {
  const groups = [
    ["主要攻略角色", "partner"],
    ["危險對象", "danger"],
    ["玩家狀態", "player"],
  ];
  $("stats").innerHTML = groups
    .map(([title, key]) => {
      const aff = (key === "partner" || key === "danger") ? affinityLevel(key) : -1;
      const affHtml = aff >= 0 ? `<div class="affinity-badge affinity-${aff >= 11 ? 'high' : aff >= 6 ? 'mid' : 'low'}">${affinityLabel(aff)} <span>${aff}/15</span></div>` : "";
      const profile = game?.profiles?.[key];
      const profileHtml = profile ? `<p class="profile-line">${profile.traits.join("・")}｜${profile.appearance}</p>` : "";
      return `<section class="stat-group"><h3>${title}</h3>${affHtml}${profileHtml}${Object.entries(game.stats[key]).map(([name, value]) => statRow(name, value)).join("")}</section>`;
    })
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
  if (value.includes("主要攻略") || value.includes("回訊息") || value.includes("坦白") || value.includes("約會")) type = "stable";
  if (value.includes("危險") || value.includes("訊息") || value.includes("見面") || value.includes("咖啡")) type = "danger";
  if (value.includes("騙") || value.includes("加班") || value.includes("刪") || value.includes("報復") || lowered.includes("lie")) type = "lie";
  $("freeInput").value = "";
  void choose({ label: `自訂行動：${value}`, type });
});

$("saveBtn").addEventListener("click", () => {
  localStorage.setItem("dangerous-ambiguous-save", JSON.stringify(game));
  alert("已保存。");
});

$("loadBtn").addEventListener("click", () => {
  const raw = localStorage.getItem("dangerous-ambiguous-save");
  if (!raw) return alert("目前沒有存檔。");
  game = JSON.parse(raw);
  game.usedEvents = game.usedEvents || [];
  game.avatars = game.avatars || randomAvatars();
  game.ended = Boolean(game.ended);
  if (!game.profiles) {
    const pp = pools.profiles[game.names.partner] || { age: 25, appearance: "氣質出眾", traits: ["溫柔", "認真", "細心"], background: "在城市裡安靜生活的人。" };
    const dp = pools.profiles[game.names.danger] || { age: 24, appearance: "眼神帶著吸引力", traits: ["神祕", "大膽", "迷人"], background: "總是在不經意間出現的人。" };
    game.profiles = { partner: { name: game.names.partner, ...pp }, danger: { name: game.names.danger, ...dp } };
  }
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
  gameStarted = false;
  $("game").classList.add("hidden");
  $("llmGate").classList.add("hidden");
  $("endingPage").classList.add("hidden");
  $("setup").classList.remove("hidden");
  $("freeForm").classList.remove("hidden");
  renderSetup();
}

$("startLlmBtn").addEventListener("click", () => {
  if (configureLLMFromForm()) startGameAfterLLMGate();
});

$("skipLlmBtn").addEventListener("click", () => {
  llmAPI.skipped = true;
  llmAPI.ready = false;
  llmAPI.apiKey = "";
  setLLMStatus("已選擇陽春版，不使用 LLM API。");
  startGameAfterLLMGate();
});
$("restartBtn").addEventListener("click", restartGame);
$("endingRestart").addEventListener("click", restartGame);
$("endingBack").addEventListener("click", () => {
  $("endingPage").classList.add("hidden");
  $("game").classList.remove("hidden");
});

renderSetup();
