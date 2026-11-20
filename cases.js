/* ==========================================================================
   项目案例（Selected work）和个人项目（Side projects）的全部文字
   • 每个案例有三种语言：en / de / zh。每种语言里：
       title    标题
       meta     副标题行（公司 · 角色 · 时间）
       sections 正文段落，按顺序显示：h 是小标题，html 是内容
   • summary 是首页卡片上的一句话摘要（三种语言）。
   • figure 是配图（自绘 SVG），里面只有图上的文字和 alt 说明。
   • slug 是网址的一部分：/work/<slug>/、/de/work/<slug>/、/zh/work/<slug>/
   • 正文来自 WEBSITE_BRIEF.md 附录 A–D，请不要扩写或补充数字。
   ========================================================================== */

window.CASES = [
  {
    "slug": "ev-lighting",
    "summary": {
      "en": "A premium carmaker's new all-electric model: I led its exterior lighting as Lead Engineer, through two prototype rounds and into the first pre-series builds.",
      "de": "Ein neues vollelektrisches Modell eines Premiumherstellers: Als Lead Engineer habe ich die Außenbeleuchtung durch zwei Prototypenphasen bis in die ersten Vorserienaufbauten geführt.",
      "zh": "一家豪华品牌的全新纯电车型：我作为 Lead Engineer 负责外部照明，走过两轮原型样件，进入首批预批量试生产。"
    },
    "figure": {
      "type": "collaboration",
      "after": 2,
      "alt": {
        "en": "Diagram: the Lead Engineer in the middle, connected to designers, the carmaker, three suppliers in Germany, China and Austria, purchasing, quality and the project manager.",
        "de": "Diagramm: der Lead Engineer in der Mitte, verbunden mit Design, Fahrzeughersteller, drei Lieferanten in Deutschland, China und Österreich, Einkauf, Qualität und Projektleitung.",
        "zh": "示意图：Lead Engineer 位于中心，连接设计师、主机厂、德国、中国和奥地利的三家供应商、采购、质量和项目经理。"
      },
      "center": {
        "en": "Lead Engineer (me)",
        "de": "Lead Engineer (ich)",
        "zh": "Lead Engineer（我）"
      },
      "nodes": [
        {
          "en": "Designers",
          "de": "Design",
          "zh": "设计师"
        },
        {
          "en": "Carmaker",
          "de": "Fahrzeughersteller",
          "zh": "主机厂"
        },
        {
          "en": "Supplier · Germany",
          "de": "Lieferant · Deutschland",
          "zh": "供应商 · 德国"
        },
        {
          "en": "Supplier · China",
          "de": "Lieferant · China",
          "zh": "供应商 · 中国"
        },
        {
          "en": "Supplier · Austria",
          "de": "Lieferant · Österreich",
          "zh": "供应商 · 奥地利"
        },
        {
          "en": "Purchasing",
          "de": "Einkauf",
          "zh": "采购"
        },
        {
          "en": "Quality",
          "de": "Qualität",
          "zh": "质量"
        },
        {
          "en": "Project manager",
          "de": "Projektleitung",
          "zh": "项目经理"
        }
      ]
    },
    "photo": {
      "src": "/work/ev-lighting",
      "width": 1400,
      "height": 787,
      "alt": {
        "en": "A dark car at night with its headlamps lighting the road.",
        "de": "Ein dunkles Auto bei Nacht, dessen Scheinwerfer die Straße ausleuchten.",
        "zh": "夜色中一辆深色汽车，大灯照亮路面。"
      },
      "credit": {"name": "Brad Starkey", "url": "https://unsplash.com/photos/a-car-driving-down-a-road-at-night-xLLzI9Eou18"}
    },
    "en": {
      "title": "Lighting a new electric vehicle: from prototype to pre-series",
      "meta": "Magna Steyr Engineering · Lead Engineer, Exterior Lighting (from 2024) · 2023–2025",
      "sections": [
        {
          "h": "Context",
          "html": "<p>A premium carmaker was developing a new all-electric model, and our engineering team was responsible for its exterior lighting: headlamps, daytime running lights and rear lamps. About six months after joining Magna, I became Lead Engineer for these systems. I led them until I left in July 2025, through two prototype rounds and into the first pre-series builds.</p>"
        },
        {
          "h": "The challenge",
          "html": "<ul><li><strong>Design, regulation and feasibility pulled in different directions.</strong> A distinctive light signature had to pass homologation and still be buildable.</li><li><strong>Three suppliers in three countries.</strong> Headlamps and daytime running lights came from Germany, rear lamps from China, and the bumper cover around the rear lamps from Austria.</li><li><strong>Interfaces between suppliers.</strong> The rear lamps had to fit precisely into a bumper cover made by a different company.</li><li><strong>Language barriers.</strong> The suppliers' engineers and the carmaker's designers and software engineers did not share a working language, so information could easily get lost between them.</li><li><strong>Time pressure.</strong> Each prototype round had fixed dates, and late parts put the whole build at risk.</li></ul>"
        },
        {
          "h": "My role",
          "html": "<p>I was the technical lead, without line management. I ran technical reviews, clarified requirements, tracked issues to closure, reported on the project and represented lighting in meetings with the carmaker. I worked daily with designers, the carmaker's engineers, purchasing, quality, our suppliers and the project manager. I relayed information between the suppliers and the carmaker's teams so that nothing was lost in translation. When deliveries slipped, I tracked them closely and kept every stakeholder up to date.</p>"
        },
        {
          "h": "How I handled design changes",
          "html": "<ol><li>Check technical feasibility and potential risks with the supplier.</li><li>Bring the options and risks to the designer and the project lead.</li><li>Get a clear decision.</li><li>Implement it and track it to closure.</li></ol>\n<p>I ran this loop for around a hundred design changes during the project.</p>"
        },
        {
          "h": "Example: fitting the rear lamps into the bumper",
          "html": "<p>The designer's rear-lamp concept did not fit the bumper cover as drawn. I worked out a technically feasible version with the lamp supplier's engineers, then confirmed it with the bumper supplier. I took the result back to the designer, and after several rounds of refinement the design was approved.</p>\n<p>Tools and methods: Jira for issue tracking, CATIA design reviews and PFMEA risk assessment.</p>"
        },
        {
          "h": "Result",
          "html": "<p>Both prototype rounds were completed, each with dozens of issues tracked to closure, and the lamps went into the first pre-series builds. My manager and the customer both recognised the work. The vehicle has not been launched yet.</p>"
        },
        {
          "h": "What I took away",
          "html": "<p>In a project with many parties, progress depends on fast, clear communication between departments. Getting the right people to a decision quickly solves most problems before they grow. I use the same approach today when implementing software for public-safety customers.</p>"
        }
      ]
    },
    "de": {
      "title": "Licht für ein neues Elektrofahrzeug: vom Prototyp zur Vorserie",
      "meta": "Magna Steyr Engineering · Lead Engineer Außenbeleuchtung (ab 2024) · 2023–2025",
      "sections": [
        {
          "h": "Ausgangslage",
          "html": "<p>Ein Premiumhersteller entwickelte ein neues vollelektrisches Modell. Unser Engineering-Team war für die Außenbeleuchtung verantwortlich: Scheinwerfer, Tagfahrlicht und Heckleuchten. Etwa sechs Monate nach meinem Einstieg bei Magna übernahm ich die Rolle als Lead Engineer für diese Systeme. Ich begleitete sie bis zu meinem Wechsel im Juli 2025 durch zwei Prototypenphasen bis in die ersten Vorserienaufbauten.</p>"
        },
        {
          "h": "Die Herausforderung",
          "html": "<ul><li><strong>Design, Gesetzgebung und Machbarkeit standen im Spannungsfeld.</strong> Eine markante Lichtsignatur musste die Homologation bestehen und trotzdem herstellbar bleiben.</li><li><strong>Drei Lieferanten in drei Ländern.</strong> Scheinwerfer und Tagfahrlicht kamen aus Deutschland, die Heckleuchten aus China und die Stoßfängerverkleidung rund um die Heckleuchten aus Österreich.</li><li><strong>Schnittstellen zwischen Lieferanten.</strong> Die Heckleuchten mussten präzise in eine Stoßfängerverkleidung eines anderen Herstellers passen.</li><li><strong>Sprachbarrieren.</strong> Die Ingenieure der Lieferanten und die Designer und Softwareingenieure des Fahrzeugherstellers hatten keine gemeinsame Arbeitssprache, Informationen konnten leicht verloren gehen.</li><li><strong>Zeitdruck.</strong> Jede Prototypenphase hatte feste Termine, verspätete Teile gefährdeten den gesamten Aufbau.</li></ul>"
        },
        {
          "h": "Meine Rolle",
          "html": "<p>Ich war technisch verantwortlich, ohne disziplinarische Führung. Ich leitete technische Reviews, klärte Anforderungen, verfolgte offene Punkte bis zum Abschluss, erstellte Projektberichte und vertrat die Beleuchtung in Abstimmungen mit dem Fahrzeughersteller. Täglich arbeitete ich mit Designern, den Ingenieuren des Herstellers, Einkauf, Qualität, unseren Lieferanten und der Projektleitung zusammen. Zwischen Lieferanten und den Teams des Herstellers habe ich Informationen übermittelt und sichergestellt, dass sie korrekt ankommen. Bei Lieferverzögerungen habe ich den Stand eng verfolgt und alle Beteiligten laufend informiert.</p>"
        },
        {
          "h": "Wie ich Designänderungen umgesetzt habe",
          "html": "<ol><li>Technische Machbarkeit und mögliche Risiken mit dem Lieferanten klären.</li><li>Optionen und Risiken mit Design und Projektleitung besprechen.</li><li>Eine klare Entscheidung herbeiführen.</li><li>Die Entscheidung umsetzen und bis zum Abschluss verfolgen.</li></ol>\n<p>Diesen Ablauf habe ich im Projekt für rund hundert Designänderungen durchlaufen.</p>"
        },
        {
          "h": "Beispiel: Heckleuchte und Stoßfänger",
          "html": "<p>Das Heckleuchten-Konzept des Designers passte in der gezeichneten Form nicht zur Stoßfängerverkleidung. Mit den Ingenieuren des Leuchtenlieferanten erarbeitete ich eine technisch machbare Variante und ließ sie vom Stoßfängerlieferanten bestätigen. Mit diesem Ergebnis ging ich zum Designer; nach mehreren Optimierungsschleifen gab er die Lösung frei.</p>\n<p>Werkzeuge und Methoden: Jira für das Issue-Tracking, CATIA-Design-Reviews und PFMEA zur Risikobewertung.</p>"
        },
        {
          "h": "Ergebnis",
          "html": "<p>Beide Prototypenphasen wurden abgeschlossen, jeweils mit Dutzenden offener Punkte, die bis zum Abschluss verfolgt wurden, und die Leuchten gingen in die ersten Vorserienaufbauten. Meine Führungskraft und der Kunde haben die Arbeit ausdrücklich anerkannt. Das Fahrzeug ist noch nicht auf dem Markt.</p>"
        },
        {
          "h": "Was ich mitgenommen habe",
          "html": "<p>In einem Projekt mit vielen Beteiligten hängt der Fortschritt von schneller, klarer Kommunikation zwischen den Abteilungen ab. Wer die richtigen Personen schnell zu einer Entscheidung bringt, löst die meisten Probleme, bevor sie groß werden. Genauso arbeite ich heute bei der Implementierung von Software für Kunden im Bereich öffentliche Sicherheit.</p>"
        }
      ]
    },
    "zh": {
      "title": "为一款新电动车设计灯光：从原型到预批量",
      "meta": "Magna Steyr Engineering · 外部照明 Lead Engineer（2024 年起）· 2023–2025",
      "sections": [
        {
          "h": "背景",
          "html": "<p>一家豪华汽车品牌正在开发一款全新的纯电车型，我们的工程团队负责其外部照明：前大灯、日间行车灯和尾灯。加入 Magna 大约半年后，我开始担任这些系统的 Lead Engineer，一直到 2025 年 7 月离职，带着项目走过了两轮原型样件，进入首批预批量试生产。</p>"
        },
        {
          "h": "挑战",
          "html": "<ul><li><strong>造型、法规和可行性之间的拉扯。</strong> 独特的灯光签名既要通过法规认证，又要能造得出来。</li><li><strong>三个国家的三家供应商。</strong> 前大灯和日行灯来自德国，尾灯来自中国，尾灯周围的保险杠覆盖件来自奥地利。</li><li><strong>供应商之间的接口。</strong> 尾灯必须精确地配合另一家公司生产的保险杠覆盖件。</li><li><strong>语言障碍。</strong> 供应商的工程师和主机厂的设计师、软件工程师没有共同的工作语言，信息很容易在中间丢失或走样。</li><li><strong>时间压力。</strong> 每轮原型都有固定节点，零件一旦延迟就会影响整车搭建。</li></ul>"
        },
        {
          "h": "我的角色",
          "html": "<p>我是技术负责人，不带人事管理。我负责技术评审、需求澄清、问题跟踪直到关闭、项目报告，并代表灯光部分参加与主机厂的会议。日常和设计师、主机厂工程师、采购、质量、供应商以及项目经理协作。我在供应商和主机厂团队之间同步信息，确保准确无误。供应商交付延迟时，我及时跟踪，并把最新情况同步给所有相关方。</p>"
        },
        {
          "h": "我如何处理设计变更",
          "html": "<ol><li>先和供应商确认技术可行性和潜在风险。</li><li>把方案和风险带给设计师和项目负责人。</li><li>拿到明确的决定。</li><li>执行并跟踪到关闭。</li></ol>\n<p>整个项目中，这个流程我走了大约 100 次。</p>"
        },
        {
          "h": "举个例子：尾灯和保险杠的配合",
          "html": "<p>设计师的尾灯方案按图纸无法和保险杠覆盖件配合。我拿着设计方案和灯光供应商的工程师做出了技术上可行的版本，再与保险杠供应商确认可行性，最后带着结果回到设计师那里。经过几轮优化，设计师认可了方案。</p>\n<p>工具和方法：Jira 跟踪问题，CATIA 设计评审，PFMEA 风险评估。</p>"
        },
        {
          "h": "结果",
          "html": "<p>两轮原型全部完成，每轮几十个问题都跟踪到关闭，车灯进入首批预批量试生产。工作得到了上级和客户的认可。该车型尚未发布。</p>"
        },
        {
          "h": "收获",
          "html": "<p>在多方参与的项目里，进展取决于部门之间快速、清晰的沟通。尽快让对的人做出决定，大多数问题就能在变大之前解决。如今为公共安全客户实施软件时，我仍然用同样的方法。</p>"
        }
      ]
    }
  },
  {
    "slug": "talking-to-pedestrians",
    "summary": {
      "en": "Without a driver, pedestrians lose eye contact, waves and nods. My Master's thesis at AUDI explored how vehicle lighting can fill that gap.",
      "de": "Ohne Fahrer fehlen Fußgängern Blickkontakt, Handzeichen und Nicken. Meine Masterarbeit bei AUDI untersuchte, wie Fahrzeuglicht diese Lücke schließen kann.",
      "zh": "没有司机，行人就失去了眼神交流、挥手和点头。我在 AUDI 的硕士论文研究如何用车辆灯光填补这个空白。"
    },
    "figure": {
      "type": "pedestrians",
      "after": 0,
      "alt": {
        "en": "Abstract illustration: a car's headlamps project light onto the ground at the feet of several pedestrians.",
        "de": "Abstrakte Illustration: die Scheinwerfer eines Autos projizieren Licht auf den Boden, direkt vor die Füße mehrerer Fußgänger.",
        "zh": "抽象插图：汽车大灯把灯光投射到地面上，落在几位行人的脚下。"
      }
    },
    "en": {
      "title": "How should a self-driving car talk to pedestrians?",
      "meta": "AUDI AG · Internship and Master's thesis, Lighting Innovation · 2022–2023",
      "sections": [
        {
          "h": "Context",
          "html": "<p>Without a driver, there is no eye contact, wave or nod. Pedestrians lose the signals they rely on to decide whether it is safe to cross. My Master's thesis at AUDI AG, supervised jointly with TUM, explored how vehicle lighting can fill that gap: <em>Machine-Human Communication – AI-Based Communication with Innovative Light Functions for Automated Driving</em>. Before the thesis, I spent six months as an intern in the same lighting innovation team.</p>"
        },
        {
          "h": "The challenge",
          "html": "<ul><li><strong>A research question that had to run on a real car.</strong> The concept had to work outside a lab, on a test vehicle, with real sensors and real lighting hardware.</li><li><strong>Three disciplines at once.</strong> Lighting technology, perception with deep learning and human–machine interaction each had their own experts and constraints.</li><li><strong>People, not just technology.</strong> A signal only works if pedestrians understand it, so the concept had to be tested with people.</li></ul>"
        },
        {
          "h": "What I did",
          "html": "<ul><li>During the internship, I helped build a test vehicle for human–machine communication, programmed control logic with Siemens LOGO! and analysed vehicle bus signals. I also supported tests of digital matrix LED headlamps.</li><li>Most existing concepts address one pedestrian at a time. In the thesis, I designed a light-based concept that communicates with several pedestrians at once. A deep-learning model judges whether each pedestrian is paying attention to the vehicle, and the light signals actively draw their attention if not. I developed it into a working prototype on the test vehicle.</li><li>I implemented the software in Python, integrated it into the vehicle's development framework, and planned and ran a study with test participants.</li></ul>"
        },
        {
          "h": "Result",
          "html": "<p>The prototype ran on the test vehicle and was evaluated with participants in realistic street scenarios. Most participants responded positively and found that the light signals caught their attention in a comfortable way. The thesis was completed at TUM in May 2023.</p>"
        },
        {
          "h": "What I took away",
          "html": "<p>Turning an open research question into something people can try needs clear requirements early and constant checks against real users. I still work this way: understand what people actually need, build it, then verify it works.</p>"
        }
      ]
    },
    "de": {
      "title": "Wie spricht ein selbstfahrendes Auto mit Fußgängern?",
      "meta": "AUDI AG · Praktikum und Masterarbeit, Beleuchtungsinnovation · 2022–2023",
      "sections": [
        {
          "h": "Ausgangslage",
          "html": "<p>Ohne Fahrer gibt es keinen Blickkontakt, kein Handzeichen, kein Nicken. Fußgänger verlieren genau die Signale, mit denen sie entscheiden, ob sie sicher über die Straße gehen können. Meine Masterarbeit bei der AUDI AG, gemeinsam betreut mit der TUM, untersuchte, wie Fahrzeuglicht diese Lücke schließen kann: <em>Maschine-Mensch-Kommunikation – KI-basierte Kommunikation mit innovativen Lichtfunktionen für automatisiertes Fahren</em>. Davor war ich sechs Monate als Praktikant im selben Team für Beleuchtungsinnovation.</p>"
        },
        {
          "h": "Die Herausforderung",
          "html": "<ul><li><strong>Eine Forschungsfrage, die im echten Fahrzeug funktionieren musste.</strong> Das Konzept sollte nicht nur im Labor laufen, sondern auf einem Versuchsträger mit echter Sensorik und Lichttechnik.</li><li><strong>Drei Disziplinen gleichzeitig.</strong> Lichttechnik, Umfelderkennung mit Deep Learning und Mensch-Maschine-Interaktion hatten jeweils eigene Experten und Randbedingungen.</li><li><strong>Menschen, nicht nur Technik.</strong> Ein Signal funktioniert nur, wenn Fußgänger es verstehen. Deshalb musste das Konzept mit Menschen getestet werden.</li></ul>"
        },
        {
          "h": "Was ich gemacht habe",
          "html": "<ul><li>Im Praktikum habe ich beim Aufbau eines Versuchsfahrzeugs für Mensch-Maschine-Kommunikation mitgearbeitet, Steuerungslogik mit Siemens LOGO! programmiert und Bussystemsignale analysiert. Außerdem habe ich Tests von Digital-Matrix-LED-Scheinwerfern unterstützt.</li><li>Die meisten bestehenden Konzepte richten sich jeweils an einen einzelnen Fußgänger. In der Masterarbeit habe ich ein lichtbasiertes Konzept entworfen, das mit mehreren Fußgängern gleichzeitig kommuniziert. Ein Deep-Learning-Modell erkennt, ob jeder Fußgänger das Fahrzeug wahrnimmt, und die Lichtsignale ziehen seine Aufmerksamkeit aktiv auf sich, wenn nicht. Daraus habe ich einen funktionsfähigen Prototyp auf dem Versuchsträger entwickelt.</li><li>Die Software habe ich in Python umgesetzt, in die Entwicklungsumgebung des Fahrzeugs integriert und eine Probandenstudie geplant und durchgeführt.</li></ul>"
        },
        {
          "h": "Ergebnis",
          "html": "<p>Der Prototyp lief auf dem Versuchsträger und wurde mit Probanden in realistischen Straßenszenarien evaluiert. Die meisten Teilnehmenden bewerteten das Konzept positiv und gaben an, dass die Lichtsignale ihre Aufmerksamkeit auf angenehme Weise gewannen. Die Arbeit habe ich im Mai 2023 an der TUM abgeschlossen.</p>"
        },
        {
          "h": "Was ich mitgenommen habe",
          "html": "<p>Aus einer offenen Forschungsfrage etwas zu machen, das Menschen ausprobieren können, braucht früh klare Anforderungen und ständigen Abgleich mit echten Nutzern. So arbeite ich bis heute: verstehen, was Menschen wirklich brauchen, umsetzen und dann prüfen, dass es funktioniert.</p>"
        }
      ]
    },
    "zh": {
      "title": "自动驾驶汽车该如何与行人“对话”？",
      "meta": "AUDI AG · 灯光创新实习与硕士论文 · 2022–2023",
      "sections": [
        {
          "h": "背景",
          "html": "<p>没有司机，就没有眼神交流、挥手或点头。行人失去了判断“现在能不能过马路”的依据。我在 AUDI AG 完成、由 TUM 共同指导的硕士论文，研究的就是如何用车辆灯光填补这个空白，题目是《机器与人的交流——面向自动驾驶、基于 AI 和创新灯光功能的沟通》。写论文之前，我在同一个灯光创新团队实习了六个月。</p>"
        },
        {
          "h": "挑战",
          "html": "<ul><li><strong>研究问题要在真车上跑起来。</strong> 方案不能只停留在实验室，而是要在装有真实传感器和灯光硬件的测试车上工作。</li><li><strong>三个学科同时参与。</strong> 灯光技术、基于深度学习的感知、人机交互，各有各的专家和约束。</li><li><strong>关键在人，不只是技术。</strong> 信号只有被行人看懂才有用，所以方案必须拿到人身上去测试。</li></ul>"
        },
        {
          "h": "我做了什么",
          "html": "<ul><li>实习期间，我参与搭建了一台用于人机交流的测试车，用 Siemens LOGO! 编写控制逻辑并分析总线信号，还协助测试了数字矩阵 LED 大灯。</li><li>现有方案大多只面向单个行人。论文中，我设计了一个能同时与多名行人沟通的灯光方案：用深度学习模型判断每个行人是否注意到了车辆，如果没有，就用灯光信号主动吸引他的注意。我把它做成了测试车上可运行的原型。</li><li>我用 Python 实现了软件，集成到车辆的开发框架中，并策划和执行了一项受试者研究。</li></ul>"
        },
        {
          "h": "结果",
          "html": "<p>原型在测试车上成功运行，并在接近真实的街道场景中由受试者进行了评估。大多数受试者给出了积极评价，认为灯光信号以舒适的方式吸引了他们的注意。论文于 2023 年 5 月在 TUM 完成。</p>"
        },
        {
          "h": "收获",
          "html": "<p>把一个开放的研究问题变成人们能亲自体验的东西，需要尽早把需求弄清楚，并不断用真实用户来检验。我至今仍这样工作：先弄懂人们真正需要什么，再做出来，然后确认它确实有效。</p>"
        }
      ]
    }
  },
  {
    "slug": "control-room-software",
    "summary": {
      "en": "When an alarm goes off, a control room has seconds to act. I implement OnCall dispatch software for industrial customers that run their own control rooms.",
      "de": "Wenn ein Alarm eingeht, hat eine Leitstelle nur Sekunden. Ich implementiere die Leitstellensoftware OnCall für Industriekunden mit eigenen Leitstellen.",
      "zh": "警报响起时，指挥中心只有几秒钟。我为拥有自己指挥中心的工业客户实施调度软件 OnCall。"
    },
    "figure": {
      "type": "flow",
      "after": 3,
      "alt": {
        "en": "Flow: workshops, flowcharts, demo system, use cases, customer sign-off.",
        "de": "Ablauf: Workshops, Flussdiagramme, Demosystem, Use Cases, Freigabe durch den Kunden.",
        "zh": "流程：工作坊、流程图、演示系统、Use Case、客户签字确认。"
      },
      "steps": [
        {
          "en": "Workshops",
          "de": "Workshops",
          "zh": "工作坊"
        },
        {
          "en": "Flowcharts",
          "de": "Flussdiagramme",
          "zh": "流程图"
        },
        {
          "en": "Demo system",
          "de": "Demosystem",
          "zh": "演示系统"
        },
        {
          "en": "Use cases",
          "de": "Use Cases",
          "zh": "Use Case"
        },
        {
          "en": "Customer sign-off",
          "de": "Freigabe durch den Kunden",
          "zh": "客户签字确认"
        }
      ]
    },
    "en": {
      "title": "Fitting mission-critical dispatch software to how a control room really works",
      "meta": "HxGN Safety & Infrastructure, an Octave company (formerly part of Hexagon) · Senior Implementation Analyst · 2025–today",
      "sections": [
        {
          "h": "Context",
          "html": "<p>When an alarm goes off, a control room has seconds to understand what is happening and send the right people. OnCall is the software these teams use to take alarms, dispatch responders and coordinate the response. I implement it for industrial customers that run their own control rooms. I supported one project through to go-live, handling configuration, installation, testing and on-site go-live support. I am now working on a second, currently in requirements clarification against the customer's detailed requirements specification.</p>"
        },
        {
          "h": "The challenge",
          "html": "<ul><li><strong>Workflows that are hard to put into words.</strong> Control-room staff know exactly what they do in an emergency, but much of it has never been written down.</li><li><strong>Requirements that keep moving.</strong> Customers' needs change during the project, and there are rarely precise use cases to build against.</li><li><strong>No room for error.</strong> When software helps keep people safe, every configuration and every fix has to be verified.</li></ul>"
        },
        {
          "h": "What I do",
          "html": "<ul><li>Ask targeted questions early, so the customer and our developers build toward the same picture.</li><li>Turn customer workflows into clear requirements and system configurations.</li><li>Coordinate testing, bug fixing and rollout with the customer and our international teams.</li></ul>"
        },
        {
          "h": "Example: when the workflow is unclear",
          "html": "<p>When a customer could not describe a process, or their needs changed, I ran workshops with the control-room team and drew their processes as flowcharts. I set up a demo system so they could try the workflow themselves, then wrote up candidate use cases for them to confirm. This turned vague expectations into requirements both sides could sign off.</p>"
        },
        {
          "h": "Products in my care",
          "html": "<p>Beyond projects, I am responsible for one in-house product and support another:</p>\n<ul><li><strong>Directory application (owner).</strong> An advanced phone book inside OnCall. Dispatchers use it to find contacts and their details, look up locations and who to call there, and see who is responsible at a given place at a given time. Almost all of our German-speaking customers use it. I find issues and work with development to resolve them.</li><li><strong>Location database (support).</strong> Stores and serves information about special locations that dispatchers need during an incident.</li></ul>"
        },
        {
          "h": "Result",
          "html": "<p>The first project is deployed and in use. The second is in requirements clarification, where getting the use cases right now prevents costly changes later.</p>"
        },
        {
          "h": "What I take away",
          "html": "<p>In mission-critical software, unclear requirements are the biggest risk, more than the technology itself. My time coordinating designers, suppliers and carmakers taught me to get the right people to a clear decision early. I do the same here, with control-room teams instead of lamp suppliers.</p>"
        }
      ]
    },
    "de": {
      "title": "Einsatzkritische Leitstellensoftware so umsetzen, wie eine Leitstelle wirklich arbeitet",
      "meta": "HxGN Safety & Infrastructure, ein Unternehmen von Octave (ehemals Teil von Hexagon) · Senior Implementation Analyst · seit 2025",
      "sections": [
        {
          "h": "Ausgangslage",
          "html": "<p>Wenn ein Alarm eingeht, hat eine Leitstelle nur Sekunden, um die Lage zu verstehen und die richtigen Kräfte zu alarmieren. OnCall ist die Software, mit der diese Teams Alarme annehmen, Einsatzkräfte disponieren und den Einsatz koordinieren. Ich implementiere sie für Industriekunden mit eigenen Leitstellen. Ein Projekt habe ich bis zur Inbetriebnahme begleitet, mit Konfiguration, Installation, Tests und Vor-Ort-Unterstützung beim Go-live. Aktuell arbeite ich an einem zweiten, das sich in der Anforderungsklärung auf Basis eines umfangreichen Lastenhefts des Kunden befindet.</p>"
        },
        {
          "h": "Die Herausforderung",
          "html": "<ul><li><strong>Abläufe, die schwer in Worte zu fassen sind.</strong> Das Leitstellenpersonal weiß genau, was im Ernstfall zu tun ist, aber vieles davon ist nirgends dokumentiert.</li><li><strong>Anforderungen in Bewegung.</strong> Die Bedürfnisse der Kunden ändern sich während des Projekts, und präzise Use Cases gibt es selten.</li><li><strong>Kein Raum für Fehler.</strong> Wenn Software hilft, Menschen zu schützen, muss jede Konfiguration und jede Korrektur verifiziert werden.</li></ul>"
        },
        {
          "h": "Was ich mache",
          "html": "<ul><li>Früh gezielte Fragen stellen, damit Kunde und Entwicklung auf dasselbe Bild hinarbeiten.</li><li>Abläufe der Kunden in klare Anforderungen und Systemkonfigurationen überführen.</li><li>Tests, Fehlerbehebung und Rollout mit dem Kunden und unseren internationalen Teams koordinieren.</li></ul>"
        },
        {
          "h": "Beispiel: wenn der Ablauf unklar ist",
          "html": "<p>Wenn ein Kunde einen Prozess nicht beschreiben konnte oder sich seine Anforderungen änderten, habe ich Workshops mit dem Leitstellenteam durchgeführt und die Abläufe als Flussdiagramme dargestellt. Auf einem Demosystem konnte der Kunde den Ablauf selbst ausprobieren; anschließend habe ich mögliche Use Cases zur Bestätigung ausgearbeitet. So wurden aus vagen Erwartungen Anforderungen, die beide Seiten freigeben konnten.</p>"
        },
        {
          "h": "Produkte in meiner Verantwortung",
          "html": "<p>Neben den Projekten verantworte ich ein eigenes Produkt und unterstütze ein weiteres:</p>\n<ul><li><strong>Telefonbuch-Anwendung (verantwortlich).</strong> Ein erweitertes Telefonbuch in OnCall. Disponenten finden damit Kontakte und deren Daten, schlagen Orte und die dortigen Ansprechpartner nach und sehen, wer zu einer bestimmten Zeit an einem bestimmten Ort zuständig ist. Fast alle unsere Kunden im deutschsprachigen Raum nutzen sie. Ich identifiziere Probleme und löse sie gemeinsam mit der Entwicklung.</li><li><strong>Ortsdatenbank (Unterstützung).</strong> Speichert Informationen zu besonderen Orten, die Disponenten im Einsatz brauchen, und stellt sie bereit.</li></ul>"
        },
        {
          "h": "Ergebnis",
          "html": "<p>Das erste Projekt ist in Betrieb. Das zweite befindet sich in der Anforderungsklärung; sauber definierte Use Cases verhindern hier spätere teure Änderungen.</p>"
        },
        {
          "h": "Was ich mitnehme",
          "html": "<p>Bei einsatzkritischer Software sind unklare Anforderungen das größte Risiko, größer als die Technik selbst. Aus der Abstimmung zwischen Designern, Lieferanten und Fahrzeugherstellern weiß ich, wie wichtig es ist, die richtigen Personen früh zu einer klaren Entscheidung zu bringen. Genau das mache ich hier, nur mit Leitstellenteams statt Leuchtenlieferanten.</p>"
        }
      ]
    },
    "zh": {
      "title": "让关键任务调度软件贴合指挥中心的真实工作方式",
      "meta": "HxGN Safety & Infrastructure（隶属 Octave，原属 Hexagon）· 高级实施分析师 · 2025 年至今",
      "sections": [
        {
          "h": "背景",
          "html": "<p>警报响起时，指挥中心只有几秒钟去弄清发生了什么，并派出合适的人。OnCall 就是这些团队用来接警、调度和协调应急响应的软件。我为拥有自己指挥中心的工业客户实施这套系统。一个项目我一直支持到上线，负责配置、安装、测试和现场上线支持。目前正在做第二个项目，处于需求澄清阶段，依据的是客户内容详尽的需求规格书（Lastenheft）。</p>"
        },
        {
          "h": "挑战",
          "html": "<ul><li><strong>工作流程很难说清楚。</strong> 指挥中心的人很清楚紧急情况下该做什么，但很多从来没有写下来。</li><li><strong>需求不断变化。</strong> 客户的需求在项目中不断调整，很少有准确的 Use Case 可以依据。</li><li><strong>不容出错。</strong> 当软件关系到人的安全，每一项配置、每一个修复都必须经过验证。</li></ul>"
        },
        {
          "h": "我做什么",
          "html": "<ul><li>尽早提出有针对性的问题，让客户和开发团队朝着同一个目标工作。</li><li>把客户的工作流程转化为清晰的需求和系统配置。</li><li>与客户和国际团队协调测试、缺陷修复和上线。</li></ul>"
        },
        {
          "h": "举个例子：流程说不清的时候",
          "html": "<p>客户说不清流程或需求变了时，我组织指挥中心团队开工作坊，把他们的流程画成流程图；搭一套演示系统让客户自己试用，再整理出可能的 Use Case 请客户确认。这样，模糊的期望就变成了双方都能签字确认的需求。</p>"
        },
        {
          "h": "我负责的产品",
          "html": "<p>除了项目，我还负责一个内部产品，并支持另一个：</p>\n<ul><li><strong>电话簿应用（负责）。</strong> OnCall 中的高级电话簿。调度员用它查找联系人及其联系方式、查询地点和该地点的联系人，并查看某个时间、某个地点由谁负责。几乎所有德语区客户都在使用。我负责发现问题，并与开发团队一起解决。</li><li><strong>地点数据库（支持）。</strong> 存储和提供调度员在处置事件时需要的特殊地点信息。</li></ul>"
        },
        {
          "h": "结果",
          "html": "<p>第一个项目已部署并投入使用。第二个项目处于需求澄清阶段，现在把 Use Case 定义清楚，可以避免后期代价高昂的变更。</p>"
        },
        {
          "h": "收获",
          "html": "<p>在关键任务软件中，最大的风险不是技术本身，而是需求不清。在 Magna 协调设计师、供应商和主机厂的经历让我知道，要尽早让对的人做出明确的决定。在这里我也这样做，只是对象从车灯供应商换成了指挥中心团队。</p>"
        }
      ]
    }
  }
];

window.SIDE_PROJECTS = [
  {
    "slug": "smart-home",
    "figure": {
      "type": "smarthome",
      "after": 1,
      "alt": {
        "en": "Architecture: Matter devices connect directly to Apple Home; other devices such as EcoFlow, LEDVANCE, Tado and Aqara connect to Home Assistant, which bridges them into Apple Home.",
        "de": "Architektur: Matter-Geräte sind direkt mit Apple Home verbunden; andere Geräte wie EcoFlow, LEDVANCE, Tado und Aqara laufen über Home Assistant, das sie an Apple Home weitergibt.",
        "zh": "架构：Matter 设备直接接入 Apple Home；EcoFlow、LEDVANCE、Tado、Aqara 等其他设备接入 Home Assistant，再桥接到 Apple Home。"
      },
      "labels": {
        "matter": {
          "en": "Matter devices",
          "de": "Matter-Geräte",
          "zh": "Matter 设备"
        },
        "other": {
          "en": "Other devices",
          "de": "Andere Geräte",
          "zh": "其他设备"
        },
        "otherSub": {
          "en": "EcoFlow, LEDVANCE, Tado, Aqara …",
          "de": "EcoFlow, LEDVANCE, Tado, Aqara …",
          "zh": "EcoFlow、LEDVANCE、Tado、Aqara …"
        },
        "ha": {
          "en": "Home Assistant",
          "de": "Home Assistant",
          "zh": "Home Assistant"
        },
        "apple": {
          "en": "Apple Home",
          "de": "Apple Home",
          "zh": "Apple Home"
        }
      }
    },
    "en": {
      "title": "One home, one app: bridging smart-home ecosystems",
      "meta": "Side project · Home Assistant, Apple Home, Matter",
      "sections": [
        {
          "h": "The problem",
          "html": "<p>Apple Home is the easiest app for everyone at home to use, but many devices don't support it. Energy systems, some lights and other devices each came with their own app.</p>"
        },
        {
          "h": "The setup",
          "html": "<ul><li>Devices that support Matter connect directly to Apple Home.</li><li>Everything else connects to Home Assistant, which bridges it into Apple Home.</li><li>Some devices had no official integration. For the EcoFlow home battery system and LEDVANCE lights, I used open-source integrations from GitHub to bring them into Home Assistant.</li></ul>"
        },
        {
          "h": "What it does now",
          "html": "<p>Everything is controlled from one app. The setup handles energy monitoring, automated scenes and remote access.</p>"
        },
        {
          "h": "Automations I use every day",
          "html": "<ul><li>When everyone has left, the Tado heating and all lights switch off.</li><li>When the first person comes home after dark, the entrance light turns on.</li><li>Aqara presence sensors turn the laundry-room light on when someone is there and off when the room is empty.</li></ul>"
        },
        {
          "h": "Why it matters to me",
          "html": "<p>It is a small version of what I do at work: different systems that were never designed to talk to each other, and an integration layer that makes them simple for the people who use them.</p>"
        }
      ]
    },
    "de": {
      "title": "Ein Zuhause, eine App: Smart-Home-Ökosysteme verbinden",
      "meta": "Privatprojekt · Home Assistant, Apple Home, Matter",
      "sections": [
        {
          "h": "Das Problem",
          "html": "<p>Apple Home ist für alle im Haushalt die einfachste App, aber viele Geräte unterstützen sie nicht. Energiesysteme, manche Leuchten und andere Geräte hatten jeweils ihre eigene App.</p>"
        },
        {
          "h": "Der Aufbau",
          "html": "<ul><li>Geräte mit Matter-Unterstützung sind direkt in Apple Home eingebunden.</li><li>Alle anderen laufen über Home Assistant, das sie an Apple Home weitergibt.</li><li>Für einige Geräte gab es keine offizielle Integration. Den EcoFlow-Heimspeicher und die LEDVANCE-Leuchten habe ich über Open-Source-Integrationen von GitHub in Home Assistant eingebunden.</li></ul>"
        },
        {
          "h": "Was es heute kann",
          "html": "<p>Alles lässt sich in einer App steuern. Das System übernimmt Energiemonitoring, automatisierte Szenen und den Fernzugriff.</p>"
        },
        {
          "h": "Automationen, die ich täglich nutze",
          "html": "<ul><li>Sobald alle das Haus verlassen haben, schalten sich die Tado-Heizung und alle Lichter aus.</li><li>Kommt die erste Person bei Dunkelheit nach Hause, geht das Licht am Eingang an.</li><li>Aqara-Präsenzsensoren schalten das Licht in der Waschküche ein, sobald jemand dort ist, und wieder aus, wenn der Raum leer ist.</li></ul>"
        },
        {
          "h": "Warum es mir wichtig ist",
          "html": "<p>Es ist eine kleine Version meiner Arbeit: verschiedene Systeme, die nie füreinander gemacht wurden, und eine Integrationsschicht, die sie für die Nutzer einfach macht.</p>"
        }
      ]
    },
    "zh": {
      "title": "一个家，一个 App：打通不同的智能家居生态",
      "meta": "个人项目 · Home Assistant、Apple Home、Matter",
      "sections": [
        {
          "h": "问题",
          "html": "<p>对家里每个人来说，Apple Home 是最方便的 App，但很多设备并不支持它。能源系统、部分灯具和其他设备各有各的 App。</p>"
        },
        {
          "h": "方案",
          "html": "<ul><li>支持 Matter 的设备直接接入 Apple Home。</li><li>其他设备接入 Home Assistant，再由它桥接到 Apple Home。</li><li>有些设备没有官方集成。EcoFlow 家用储能系统和 LEDVANCE 灯具，我用 GitHub 上的开源集成接入了 Home Assistant。</li></ul>"
        },
        {
          "h": "现在的效果",
          "html": "<p>所有设备在一个 App 里控制，实现了能源监控、自动化场景和远程访问。</p>"
        },
        {
          "h": "每天在用的自动化",
          "html": "<ul><li>家里没人时，自动关闭 Tado 暖气和所有灯光。</li><li>天黑后第一个人到家时，自动打开门口的灯。</li><li>洗衣房用 Aqara 人体存在传感器，有人时自动开灯，没人时自动关灯。</li></ul>"
        },
        {
          "h": "为什么重要",
          "html": "<p>它是我工作的一个缩影：本来互不相通的系统，加上一层集成，让使用的人觉得简单。</p>"
        }
      ]
    }
  }
];
