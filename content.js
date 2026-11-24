/* ==========================================================================
   网站全部文字都在这个文件里 —— 修改文字只需要改这里。
   All text on the website lives in this file.
   构建脚本 build.mjs 会读取这个文件，生成 /、/de/、/zh/ 三个语言的页面。
   改完后运行  npm run preview  在本地查看；推送到 main 后自动发布。

   规则很简单：
   • 每段文字都写成 { en: "英文", de: "德文", zh: "中文" }
   • 用英文双引号 "..." 包住文字；文字里如果要用双引号，写成 \"
   • 每一项后面记得保留逗号 ,
   • 可以用 <strong>加粗</strong> 和 <br>（换行）
   • 某种语言留空时，会自动显示英文
   ========================================================================== */

window.SITE = {

  /* ---------------- 搜索引擎用的个人信息（JSON-LD 结构化数据） ---------------- */
  person: {
    name: "Zhihao Yang",
    alternateName: "杨志豪",
    jobTitle: "Senior Implementation Analyst",
    worksFor: "HxGN Safety & Infrastructure",
    city: "Munich",
    country: "DE",
    alumniOf: "Technical University of Munich",
    languages: ["en", "de", "zh"],
    linkedin: "https://www.linkedin.com/in/zh-yang",
    email: "zhihao.yang@gmx.de"
  },

  /* ---------------- 零散的短文字 ---------------- */
  ui: {
    /* 名字：<span class="grad">…</span> 里的部分显示为蓝紫渐变色 */
    "name.short":   { en: "Zhihao Yang", de: "Zhihao Yang", zh: "杨志豪" },
    "hero.name":    { en: "Zhihao <span class=\"grad\">Yang.</span>",
                      de: "Zhihao <span class=\"grad\">Yang.</span>",
                      zh: "杨<span class=\"grad\">志豪</span>" },
    "page.title":   { en: "Zhihao Yang", de: "Zhihao Yang", zh: "杨志豪 · Zhihao Yang" },

    "nav.about":   { en: "About",   de: "Über mich", zh: "关于我" },
    "nav.values":   { en: "Values",  de: "Werte",     zh: "理念" },
    "nav.journey":  { en: "Journey", de: "Werdegang", zh: "经历" },
    "nav.contact":  { en: "Contact", de: "Kontakt",   zh: "联系" },

    /* 首屏 */
    "hero.hello":   { en: "Hello, I'm", de: "Hallo, ich bin", zh: "你好，我是" },
    // 轮换句子 = rotPre + 轮换的词 + rotPost
    "hero.rotPre":  { en: "I turn ",                         de: "Ich mache aus ",                 zh: "我把" },
    "hero.rotPost": { en: "<br>into working solutions.",     de: "<br>funktionierende Lösungen.",  zh: "<br>变成可落地的解决方案。" },
    "hero.lead": {
      en: "Engineer at the intersection of customers, software and technical systems. Based near Munich.",
      de: "Ingenieur an der Schnittstelle von Kunden, Software und technischen Systemen. Lebt bei München.",
      zh: "工作在客户、软件与技术系统交汇处的工程师，现居慕尼黑附近。"
    },
    "hero.cta1":   { en: "Get in touch",     de: "Kontakt aufnehmen", zh: "联系我" },
    "hero.cta2":   { en: "See my journey ›", de: "Mein Werdegang ›",  zh: "查看经历 ›" },
    "hero.badge":  { en: "Senior Implementation Analyst", de: "Senior Implementation Analyst", zh: "高级实施分析师" },
    "hero.scroll": { en: "Scroll", de: "Scrollen", zh: "向下滚动" },

    /* 关于我 */
    "about.kicker": { en: "About me", de: "Über mich", zh: "关于我" },
    "about.title":  {
      en: "From headlights to mission-critical software.",
      de: "Vom Scheinwerfer zur einsatzkritischen Software.",
      zh: "从车灯，到关键任务软件。"
    },
    "about.p1": {
      en: "Today I'm a <strong>Senior Implementation Analyst at HxGN Safety & Infrastructure</strong>, implementing mission-critical software for public-safety customers and looking after two of our own software products.",
      de: "Heute bin ich <strong>Senior Implementation Analyst bei HxGN Safety & Infrastructure</strong>. Ich implementiere einsatzkritische Software für Kunden der öffentlichen Sicherheit und betreue zwei unternehmenseigene Softwareprodukte.",
      zh: "目前我是 <strong>HxGN Safety & Infrastructure 的高级实施分析师</strong>，为公共安全领域的客户实施和配置关键任务软件，并负责公司两款自有软件产品的运营支持。"
    },
    "about.p2": {
      en: "Before that I spent my early career in <strong>automotive lighting</strong> — researching how light lets automated cars talk to people at AUDI, and leading exterior lighting development from prototype to pre-series at Magna Steyr.",
      de: "Davor war ich in der <strong>Fahrzeugbeleuchtung</strong> tätig – bei AUDI habe ich erforscht, wie Licht automatisierten Fahrzeugen die Kommunikation mit Menschen ermöglicht, bei Magna Steyr habe ich die Entwicklung von Außenbeleuchtung vom Prototyp bis zur Vorserie geleitet.",
      zh: "此前我从事<strong>汽车照明</strong>工作：在奥迪研究灯光如何让自动驾驶汽车与人沟通；在麦格纳斯太尔，作为主管工程师负责外部照明系统从样件到预批量的开发。"
    },
    "about.p3": {
      en: "What connects it all: asking the right questions until a fuzzy idea becomes something concrete — then making sure it really works.",
      de: "Was alles verbindet: die richtigen Fragen stellen, bis aus einer vagen Idee etwas Konkretes wird – und dann sicherstellen, dass es wirklich funktioniert.",
      zh: "贯穿始终的是：不断提出对的问题，直到模糊的想法变得具体——然后确保它真正可行。"
    },

    /* 理念 */
    "values.kicker": { en: "What I care about", de: "Was mir wichtig ist", zh: "我在意的事" },
    "values.title":  {
      en: "Good work is clear, reliable and shared.",
      de: "Gute Arbeit ist klar, verlässlich und gemeinsam.",
      zh: "好的工作，清晰、可靠、彼此连接。"
    },

    /* 经历 */
    "journey.kicker": { en: "Journey", de: "Werdegang", zh: "经历" },
    "journey.title":  { en: "Where I've been.", de: "Meine Stationen.", zh: "一路走来。" },
    "filter.all":     { en: "All",       de: "Alle",       zh: "全部" },
    "filter.work":    { en: "Work",      de: "Beruf",      zh: "工作" },
    "filter.edu":     { en: "Education", de: "Ausbildung", zh: "教育" },

    /* 联系 */
    "contact.kicker": { en: "Contact",     de: "Kontakt",     zh: "联系方式" },
    "contact.title":  { en: "Let's talk.", de: "Sprechen wir.", zh: "聊一聊吧。" },
    "contact.lead": {
      en: "Always happy to hear about projects, roles — or just to connect.",
      de: "Ich freue mich über Nachrichten zu Projekten, Stellen – oder einfach zum Vernetzen.",
      zh: "欢迎和我聊项目、职位机会，或者只是认识一下。"
    },
    "contact.email":     { en: "Email",          de: "E-Mail",               zh: "邮箱" },
    "contact.copy":      { en: "Click to copy",  de: "Klicken zum Kopieren", zh: "点击复制" },
    "contact.open":      { en: "Open profile ›", de: "Profil öffnen ›",      zh: "打开主页 ›" },
    "contact.location":  { en: "Location",       de: "Standort",             zh: "所在地" },
    "contact.place":     { en: "Munich, Germany", de: "München, Deutschland", zh: "德国 · 慕尼黑" },
    "contact.country":   { en: "Germany",        de: "Deutschland",          zh: "德国" },
    "contact.map":       { en: "Open in Maps ›", de: "In Karte öffnen ›",    zh: "在地图中打开 ›" },
    "toast.copied":      { en: "✓ Email copied · request to talk logged", de: "✓ E-Mail kopiert · Sprechwunsch registriert", zh: "✓ 邮箱已复制 · 通话请求已登记" },

    /* 项目案例（内容在 cases.js） */
    "nav.work":         { en: "Work",         de: "Projekte",            zh: "项目" },
    "nav.menu":         { en: "Menu",         de: "Menü",                zh: "菜单" },
    "skip":             { en: "Skip to content", de: "Zum Inhalt springen", zh: "跳到正文" },
    "work.kicker":      { en: "Selected work", de: "Ausgewählte Projekte", zh: "精选项目" },
    "work.title":       { en: "A closer look at three projects.", de: "Drei Projekte im Detail.", zh: "深入看看三个项目。" },
    "case.readmore":    { en: "Read more ›",  de: "Weiterlesen ›",       zh: "阅读全文 ›" },
    "case.back":        { en: "‹ All projects", de: "‹ Alle Projekte",   zh: "‹ 全部项目" },
    "case.next":        { en: "Next case ›",  de: "Nächstes Projekt ›",  zh: "下一个项目 ›" },
    "case.photo":       { en: "Symbolic image · Photo:", de: "Symbolbild · Foto:", zh: "示意图片 · 摄影：" },
    "journey.caselink": { en: "Read the case study ›", de: "Zur Fallstudie ›", zh: "查看项目详情 ›" },
    "side.kicker":      { en: "Side projects", de: "Privatprojekte",     zh: "个人项目" },
    "side.title":       { en: "What I build at home.", de: "Was ich zu Hause baue.", zh: "业余时间做的事。" },
    "side.toggle":      { en: "Read more",    de: "Mehr lesen",          zh: "展开全文" },

    /* 简历下载按钮（只有 cv/ 文件夹里有对应语言的 PDF 时才会显示） */
    "cv.download":       { en: "Download CV",    de: "Lebenslauf herunterladen", zh: "下载简历" },

    /* 语言提示：访客浏览器是另一种语言时显示，用的是“目标语言”的文字 */
    "langhint.text":     { en: "This page is also available in English.", de: "Diese Seite gibt es auch auf Deutsch.", zh: "本页面也有中文版。" },
    "langhint.go":       { en: "Switch",         de: "Wechseln",             zh: "切换" },
    "langhint.close":    { en: "Close",          de: "Schließen",            zh: "关闭" },

    /* 页脚的法律链接（页面内容在 legal.js） */
    "legal.impressum":   { en: "Imprint",        de: "Impressum",            zh: "Impressum" },
    "legal.privacy":     { en: "Privacy",        de: "Datenschutz",          zh: "隐私声明" },


    "footer": {
      en: "© 2026 Zhihao Yang · Designed with care in Munich",
      de: "© 2026 Zhihao Yang · Mit Sorgfalt gestaltet in München",
      zh: "© 2026 杨志豪 · 用心设计于慕尼黑"
    }
  },

  /* ---------------- 首屏轮换的词（按顺序轮播） ---------------- */
  rotator: {
    en: ["unclear requirements", "customer needs", "complex systems", "new ideas"],
    de: ["unklaren Anforderungen", "Kundenbedürfnissen", "komplexen Systemen", "neuen Ideen"],
    zh: ["模糊的需求", "客户的诉求", "复杂的系统", "新的想法"]
  },

  /* ---------------- 404 页面：做成 Leitstelle（调度中心）的“警情界面” ----------------
     访客打开不存在的地址时显示。会按网址（/de/…、/zh/…）或浏览器语言只显示一种语言。
     status 用的是德国救援车辆的 FMS 状态码：3 = 接受任务，4 = 已到现场。                  */
  notFound: {
    tag:       { en: "Incident",  de: "Einsatz",  zh: "警情" },
    keyword:   { en: "INFO 404 · Page missing", de: "INFO 404 · Seite vermisst", zh: "INFO 404 · 页面失踪" },
    title:     { en: "On scene. Nothing found.", de: "Am Einsatzort. Nichts gefunden.", zh: "已到现场，未发现目标。" },
    text: {
      en: "We dispatched a unit to this address, but this page doesn't exist or has moved.",
      de: "Wir haben ein Fahrzeug zu dieser Adresse alarmiert, aber diese Seite gibt es nicht oder sie wurde verschoben.",
      zh: "我们已经派车前往这个地址，但这个页面不存在，或已经移动。"
    },
    location:  { en: "Location", de: "Einsatzort", zh: "事发地址" },
    coords:    { en: "Not in the map data", de: "Nicht im Kartenmaterial", zh: "地图数据中查无此处" },
    priority:  { en: "Priority", de: "Priorität", zh: "优先级" },
    prioValue: { en: "Low · nobody hurt", de: "Niedrig · niemand verletzt", zh: "低 · 无人受伤" },
    unit:      { en: "Unit status", de: "Fahrzeugstatus", zh: "车辆状态" },
    unitValue: { en: "On scene", de: "Am Einsatzort", zh: "已到现场" },
    logTitle:  { en: "Incident log", de: "Einsatzprotokoll", zh: "处置记录" },
    /* 处置记录：[时间, 文字]，时间是从接警开始算的 分:秒 */
    log: {
      en: [["00:00", "Call received: page requested"], ["00:07", "Address checked: not in the map data"], ["00:42", "Unit dispatched · status 3"], ["04:04", "Status 4 · on scene: nothing here"]],
      de: [["00:00", "Notruf eingegangen: Seite angefordert"], ["00:07", "Adresse geprüft: nicht im Kartenmaterial"], ["00:42", "Fahrzeug alarmiert · Status 3"], ["04:04", "Status 4 · am Einsatzort: nichts gefunden"]],
      zh: [["00:00", "接到报警：请求页面"], ["00:07", "核对地址：地图数据中查无此处"], ["00:42", "已派车 · 状态 3"], ["04:04", "状态 4 · 已到现场：未发现目标"]]
    },
    back:      { en: "Return to station", de: "Zurück zur Wache", zh: "收队，返回首页" },
    note:      { en: "Real emergency? Call 112.", de: "Echter Notfall? 112 anrufen.", zh: "真有紧急情况？请拨打 112。" }
  },

  /* ---------------- 彩蛋（藏起来的小惊喜） ----------------
     • console：打开浏览器开发者工具（F12）时，控制台里的问候
     • lightsOn / lightsOff：在键盘上按 ↑↑↓↓←→←→BA，开 / 关“车灯模式”
       （手机：两指按住约 0.6 秒；或在页面上划 ↑↑↓↓←→←→ 再点两下；lightsOnTouch 是手机上的提示）
     • clicks：连续快速点击头像或左上角 logo 5 次，随机显示其中一句
     • touchHints：手机上点 5 次时也可能出现的手势提示
     • e112：在页面上直接敲 1 1 2（欧洲急救电话）；手机：点、点、两指点                       */
  eggs: {
    console: {
      en: "Hi, curious person 👋 Since you've opened DevTools anyway, you might as well get in touch.\nPsst: try ↑ ↑ ↓ ↓ ← → ← → B A, or the number keys 0–9.",
      de: "Hallo, neugierige Person 👋 Wenn du schon die DevTools offen hast, kannst du dich auch gleich melden.\nPsst: probier mal ↑ ↑ ↓ ↓ ← → ← → B A – oder die Zifferntasten 0–9.",
      zh: "你好，好奇的朋友 👋 既然你都打开开发者工具了，不如直接联系我吧。\n悄悄告诉你：试试 ↑ ↑ ↓ ↓ ← → ← → B A"
    },
    lightsOn:  { en: "💡 Headlights on. Press Esc to switch them off.", de: "💡 Scheinwerfer an. Mit Esc wieder aus.", zh: "💡 车灯已打开，按 Esc 关闭。" },
    lightsOnTouch: { en: "💡 Headlights on. Tap with two fingers to switch them off.", de: "💡 Scheinwerfer an. Mit zwei Fingern tippen zum Ausschalten.", zh: "💡 车灯已打开，两指轻点关闭。" },
    lightsOff: { en: "Headlights off.", de: "Scheinwerfer aus.", zh: "车灯已关闭。" },
    clicks: {
      en: ["You found an easter egg 🥚", "Servus from Munich! 🥨", "Fun fact: my career started in automotive lighting.", "Customers speak German, developers speak English. I make sure they understand each other.", "Still clicking? Just send me an email 😄"],
      de: ["Du hast ein Osterei gefunden 🥚", "Servus aus München! 🥨", "Fun Fact: Angefangen habe ich in der Fahrzeugbeleuchtung.", "Kunden sprechen Deutsch, Entwickler Englisch – ich sorge dafür, dass sie sich verstehen.", "Immer noch am Klicken? Schreib mir lieber eine Mail 😄"],
      zh: ["你发现了一个彩蛋 🥚", "来自慕尼黑的问候：Servus! 🥨", "冷知识：我的职业生涯是从汽车车灯开始的。", "客户说德语，开发说英语，我负责让他们说同一种话。", "还在点？不如直接给我发封邮件 😄"]
    },
    /* 只在手机 / 平板上出现：和 clicks 混在一起随机显示，提示手机上的手势 */
    touchHints: {
      en: ["Psst: hold two fingers on the page for a moment 💡", "Psst: tap, tap, then tap with two fingers 🚨", "Psst: press and hold my photo 📟"],
      de: ["Psst: halte kurz zwei Finger auf die Seite 💡", "Psst: tippen, tippen, dann mit zwei Fingern tippen 🚨", "Psst: halte mein Foto gedrückt 📟"],
      zh: ["悄悄告诉你：两根手指在页面上按住一会儿 💡", "悄悄告诉你：点一下、点一下，再两指轻点 🚨", "悄悄告诉你：长按我的照片 📟"]
    },
    /* 车辆状态（FMS，德国救援车辆的状态码 0–9）：
       电脑上直接按数字键；也可以长按头像（手机）或按 S 键打开状态面板。按 5（Sprechwunsch）会跳到联系方式。
       每一项是 [面板上的短名称, 弹出的话]                                                        */
    fms: {
      title:  { en: "Vehicle status (FMS)", de: "Fahrzeugstatus (FMS)", zh: "车辆状态（FMS）" },
      prompt: { en: "Choose a status", de: "Status wählen", zh: "请选择状态" },
      close:  { en: "Close", de: "Schließen", zh: "关闭" },
      status: {
        en: [["Priority call", "Status 0 · Priority call. In a real emergency, please dial 112."],
             ["On radio", "Status 1 · Available on radio, and on LinkedIn."],
             ["At station", "Status 2 · Available at station, near Munich."],
             ["Job accepted", "Status 3 · Job accepted. On my way."],
             ["On scene", "Status 4 · On scene: you're reading my website."],
             ["Request to talk", "Status 5 · Request to talk. Patching you through to contact…"],
             ["Out of service", "Status 6 · Out of service. Even dispatchers need coffee ☕"],
             ["Patient on board", "Status 7 · Patient on board. Don't worry, it's only a bug 🐞"],
             ["At destination", "Status 8 · At destination. Thanks for riding along!"],
             ["Guest unit", "Status 9 · Guest unit signed on. Welcome, visitor!"]],
        de: [["Prio-Sprechwunsch", "Status 0 · Priorisierter Sprechwunsch. Im echten Notfall bitte 112 wählen."],
             ["Frei über Funk", "Status 1 · Einsatzbereit über Funk – und auf LinkedIn."],
             ["Frei auf Wache", "Status 2 · Einsatzbereit auf Wache, bei München."],
             ["Einsatz übernommen", "Status 3 · Einsatz übernommen. Bin unterwegs."],
             ["Am Einsatzort", "Status 4 · Am Einsatzort: Du liest gerade meine Website."],
             ["Sprechwunsch", "Status 5 · Sprechwunsch. Ich verbinde zum Kontakt …"],
             ["Nicht einsatzbereit", "Status 6 · Nicht einsatzbereit. Auch Disponenten brauchen Kaffee ☕"],
             ["Patient aufgenommen", "Status 7 · Patient aufgenommen. Keine Sorge, nur ein Bug 🐞"],
             ["Am Transportziel", "Status 8 · Am Transportziel. Danke fürs Mitfahren!"],
             ["Fremdanmeldung", "Status 9 · Fremdanmeldung. Willkommen, Besucher!"]],
        zh: [["优先通话", "状态 0 · 优先通话请求。真有紧急情况，请拨打 112。"],
             ["电台待命", "状态 1 · 电台待命，LinkedIn 上也在线。"],
             ["在站待命", "状态 2 · 在站待命，就在慕尼黑附近。"],
             ["接受任务", "状态 3 · 接受任务，正在路上。"],
             ["已到现场", "状态 4 · 已到现场：你正在看我的网站。"],
             ["请求通话", "状态 5 · 请求通话，正在为你转接联系方式……"],
             ["暂停服务", "状态 6 · 暂停服务。调度员也需要咖啡 ☕"],
             ["病人已上车", "状态 7 · 病人已上车。别担心，只是一个 bug 🐞"],
             ["到达目的地", "状态 8 · 到达目的地。谢谢一路同行！"],
             ["外来车辆", "状态 9 · 外来车辆登录。欢迎你，访客！"]]
      }
    },
    /* 导航栏的进度条上有一辆小车，滚到页面最底部时显示 */
    arrived: { en: "🚑 Status 4 · On scene. You made it to the end!", de: "🚑 Status 4 · Am Einsatzort. Du hast es bis ans Ende geschafft!", zh: "🚑 状态 4 · 已到现场。你看到最后啦！" },
    e112: {
      en: "🚨 Incident received… but this is just a website. In a real emergency, call 112.",
      de: "🚨 Einsatz eingegangen … aber das hier ist nur eine Website. Im echten Notfall: 112 anrufen.",
      zh: "🚨 收到警情……不过这里只是个网站。真有紧急情况，请拨打 112。"
    }
  },

  /* ---------------- 数字卡片：n 是数字 ---------------- */
  stats: [
    { n: 4, label: { en: "Companies, from TÜV SÜD to HxGN", de: "Unternehmen, von TÜV SÜD bis HxGN", zh: "家公司，从 TÜV SÜD 到 HxGN" } },
    { n: 2, label: { en: "Degrees from TU Munich",         de: "Abschlüsse an der TU München",     zh: "个慕尼黑工业大学学位" } },
    { n: 2, label: { en: "Software products in my care",   de: "Softwareprodukte in meiner Verantwortung", zh: "款由我负责的软件产品" } },
    { n: 3, label: { en: "Languages — English, German, Chinese", de: "Sprachen – Englisch, Deutsch, Chinesisch", zh: "种语言：英语、德语、中文" } }
  ],

  /* ---------------- 理念卡片 ----------------
     size: 卡片宽度 w2 / w3 / w4（每一行加起来 = 6）
     feature: true 表示彩色高亮卡片 */
  values: [
    { icon: "💬", size: "w4", feature: true,
      title: { en: "Clarity first", de: "Klarheit zuerst", zh: "清晰优先" },
      text:  { en: "I ask targeted questions early, so customers and developers build toward the same picture — not two different ones.",
               de: "Ich stelle früh gezielte Fragen, damit Kunden und Entwickler auf dasselbe Bild hinarbeiten – nicht auf zwei verschiedene.",
               zh: "尽早提出有针对性的问题，让客户和开发团队朝着同一个目标努力，而不是各想各的。" } },
    { icon: "🛡️", size: "w2",
      title: { en: "Reliability", de: "Verlässlichkeit", zh: "可靠" },
      text:  { en: "When software keeps people safe, every fix gets verified.",
               de: "Wenn Software Menschen schützt, wird jede Korrektur überprüft.",
               zh: "当软件关乎人们的安全，每一次修复都要验证。" } },
    { icon: "🤝", size: "w3",
      title: { en: "Bridging people", de: "Brücken bauen", zh: "连接人与团队" },
      text:  { en: "Connecting customers, engineers, suppliers and teams across disciplines and countries.",
               de: "Kunden, Entwickler, Lieferanten und Teams über Fachbereiche und Länder hinweg verbinden.",
               zh: "连接客户、工程师、供应商，以及跨专业、跨国家的团队。" } },
    { icon: "💡", size: "w3",
      title: { en: "Curiosity", de: "Neugier", zh: "好奇心" },
      text:  { en: "From mechanical engineering to robotics, deep learning and software — I like learning how things work.",
               de: "Vom Maschinenbau über Robotik und Deep Learning bis zur Software – ich will verstehen, wie Dinge funktionieren.",
               zh: "从机械工程到机器人、深度学习再到软件——我喜欢弄明白事物是如何运作的。" } }
  ],

  /* ---------------- 经历（最新的写在最上面） ----------------
     type: "work" 工作 或 "edu" 教育
     points: 点开后显示的要点，每种语言一个列表 */
  journey: [
    { case: "control-room-software",   /* 链接到 cases.js 里的案例 */
      type: "work",
      when:  { en: "2025 – today", de: "2025 – heute", zh: "2025 – 至今" },
      title: { en: "Senior Implementation Analyst", de: "Senior Implementation Analyst", zh: "高级实施分析师" },
      place: { en: "HxGN Safety & Infrastructure, an Octave company · Munich area", de: "HxGN Safety & Infrastructure, ein Unternehmen von Octave · Großraum München", zh: "HxGN Safety & Infrastructure（隶属 Octave）· 慕尼黑地区" },
      points: {
        en: ["Implement and configure mission-critical software for public-safety customers.",
             "Turn customer workflows into clear requirements and system configurations.",
             "Coordinate testing, bug fixing and rollout with customers and international teams.",
             "Responsible for the operational support of two in-house software products."],
        de: ["Implementierung und Konfiguration einsatzkritischer Software für Kunden der öffentlichen Sicherheit.",
             "Kundenabläufe in klare Anforderungen und Systemkonfigurationen überführen.",
             "Koordination von Tests, Fehlerbehebung und Rollout mit Kunden und internationalen Teams.",
             "Verantwortlich für die operative Betreuung von zwei unternehmenseigenen Softwareprodukten."],
        zh: ["为公共安全领域的客户实施和配置关键任务软件。",
             "将客户的工作流程转化为清晰的需求和系统配置。",
             "与客户及国际团队协调测试、问题修复和上线。",
             "负责公司两款自有软件产品的运营支持。"]
      } },
    { case: "ev-lighting",   /* 链接到 cases.js 里的案例 */
      type: "work",
      when:  { en: "2023 – 2025" },
      title: { en: "Project / Lead Engineer, Automotive Lighting", de: "Project / Lead Engineer – Automotive Lighting", zh: "项目工程师 / 主管工程师 · 汽车照明" },
      place: { en: "Magna Steyr Engineering · Munich", de: "Magna Steyr Engineering · München", zh: "麦格纳斯太尔工程 · 慕尼黑" },
      points: {
        en: ["Led exterior lighting development as Lead Engineer and SE team lead, from prototype to pre-series.",
             "Aligned requirements with design and engineering; coordinated international suppliers.",
             "Worked with customers, product management, purchasing and sales; contributed to PFMEA."],
        de: ["Entwicklung von Außenbeleuchtungssystemen als Lead Engineer und SE-Teamleiter vom Prototyp bis zur Vorserie koordiniert.",
             "Anforderungen mit Design und Engineering abgestimmt, internationale Lieferanten koordiniert.",
             "Zusammenarbeit mit Kunden, Produktmanagement, Einkauf und Vertrieb; Mitwirkung an der PFMEA."],
        zh: ["作为主管工程师和 SE 团队负责人，协调外部照明系统从样件到预批量的开发。",
             "与设计和工程部门对齐需求，协调国际供应商。",
             "与客户、产品管理、采购和销售协作；参与 PFMEA 风险评估。"]
      } },
    { case: "talking-to-pedestrians",   /* 链接到 cases.js 里的案例 */
      type: "work",
      when:  { en: "2022 – 2023" },
      title: { en: "Master's Thesis & Internship, Lighting Innovation", de: "Masterarbeit & Praktikum – Beleuchtungsinnovation", zh: "硕士论文与实习 · 照明创新" },
      place: { en: "AUDI AG · Ingolstadt", zh: "奥迪 AUDI AG · 因戈尔施塔特" },
      points: {
        en: ["Developed concepts and prototypes for light-based human–machine communication in automated driving, using deep learning.",
             "Helped build a test vehicle; programmed control logic with LOGO! and analysed bus signals.",
             "Supported testing of digital matrix LED headlights."],
        de: ["Konzepte und Prototypen für Lichtfunktionen zur Mensch-Maschine-Kommunikation beim automatisierten Fahren entwickelt – mit Deep Learning.",
             "Mitarbeit am Versuchsfahrzeug; Steuerungslogik mit LOGO! programmiert und Bussignale analysiert.",
             "Tests von Digital-Matrix-LED-Scheinwerfern unterstützt."],
        zh: ["开发用于自动驾驶人机交互的灯光功能概念与原型，并运用深度学习。",
             "参与试验车开发；使用 LOGO! 编写控制逻辑并分析总线信号。",
             "支持数字矩阵 LED 大灯的测试。"]
      } },
    { type: "work",
      when:  { en: "2021 – 2022" },
      title: { en: "Working Student, Automotive Technical Services", de: "Werkstudent – Technische Dienstleistungen Automotive", zh: "工读生 · 汽车技术服务" },
      place: { en: "TÜV SÜD · Munich", de: "TÜV SÜD · München", zh: "TÜV SÜD · 慕尼黑" },
      points: {
        en: ["Built and maintained an Access database for tracking type approvals.",
             "Structured and documented standards such as ISO 21448 and ISO 21434."],
        de: ["Access-Datenbank zur Überwachung von Typgenehmigungen entwickelt und gepflegt.",
             "Standards wie ISO 21448 und ISO 21434 strukturiert und dokumentiert."],
        zh: ["开发并维护用于跟踪型式认证的 Access 数据库。",
             "整理并记录 ISO 21448、ISO 21434 等标准。"]
      } },
    { case: "talking-to-pedestrians",   /* 链接到 cases.js 里的案例 */
      type: "edu",
      when:  { en: "2021 – 2023" },
      title: { en: "M.Sc. Robotics, Cognition, Intelligence", zh: "机器人、认知与智能 · 理学硕士" },
      place: { en: "Technical University of Munich", de: "Technische Universität München", zh: "慕尼黑工业大学" },
      points: {
        en: ["Master's thesis at AUDI on lighting for human–machine communication."],
        de: ["Masterarbeit bei AUDI zu Licht für die Mensch-Maschine-Kommunikation."],
        zh: ["在奥迪完成硕士论文，研究面向人机交互的灯光。"]
      } },
    { type: "edu",
      when:  { en: "2017 – 2021" },
      title: { en: "B.Sc. Mechanical Engineering", de: "B.Sc. Maschinenwesen", zh: "机械工程 · 理学学士" },
      place: { en: "Technical University of Munich", de: "Technische Universität München", zh: "慕尼黑工业大学" },
      points: {
        en: ["Foundation in engineering design, mechanics and product development."],
        de: ["Grundlagen in Konstruktion, Mechanik und Produktentwicklung."],
        zh: ["打下工程设计、力学与产品开发的基础。"]
      } }
  ],

  /* ---------------- 技能标签（不需要翻译的直接写文字） ---------------- */
  skills: [
    { en: "Requirements analysis",   de: "Anforderungsanalyse",       zh: "需求分析" },
    { en: "Implementation & rollout", de: "Implementierung & Rollout", zh: "实施与上线" },
    { en: "Testing & debugging",      de: "Tests & Fehleranalyse",     zh: "测试与问题排查" },
    "Jira", "DevOps", "SQL", "Python", "VBA & Access", "CATIA V5/V6", "Autodesk Inventor"
  ]
};
