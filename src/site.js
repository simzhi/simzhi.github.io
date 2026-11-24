/* 网站的动画和交互。文字已经由构建脚本写进 HTML，这里不再渲染文字。
   页面数据（当前语言、轮换词语等）来自 HTML 里的 window.PAGE。 */
(function () {
  var P = window.PAGE || {};
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function session(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- 主题切换 ---------- */
  var themeBtn = $('#themeBtn'), icon = $('#themeIcon');
  function drawIcon() {
    if (!icon) return;
    icon.innerHTML = root.getAttribute('data-theme') === 'dark'
      ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'
      : '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  }
  // 让 Safari / Chrome 的地址栏和状态栏颜色跟着网站自己的深浅色走（不只跟系统设置）
  function syncThemeColor() {
    var bg = getComputedStyle(root).getPropertyValue('--bg').trim();
    $$('meta[name="theme-color"]').forEach(function (m) { m.setAttribute('content', bg); m.setAttribute('media', 'all'); });
    root.style.colorScheme = root.getAttribute('data-theme');
  }
  drawIcon(); syncThemeColor();
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var th = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', th);
    store('theme', th);
    drawIcon(); syncThemeColor();
  });

  /* ---------- 滚动进度条 + 导航收窄 ---------- */
  var bar = $('#progress'), nav = $('#nav');
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    var pr = h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0;
    if (bar) bar.style.transform = 'scaleX(' + pr + ')';
    if (nav) { nav.style.setProperty('--p', pr); nav.classList.toggle('rolling', pr > 0.005); }
    if (nav) nav.classList.toggle('compact', scrollY > 60);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- 手机导航菜单 ---------- */
  var menuBtn = $('#menuBtn');
  if (menuBtn && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', open);
    };
    menuBtn.addEventListener('click', function (e) { e.stopPropagation(); setMenu(!nav.classList.contains('open')); });
    $$('.links a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target)) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menuBtn.focus(); } });
    matchMedia('(min-width: 561px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  /* ---------- 滚动渐显 + 数字动画（最终数字已写在 HTML 里） ---------- */
  function countUp(el) {
    var end = +el.dataset.count, start = null;
    if (reduce || !end) { el.textContent = end; return; }
    el.textContent = '0';
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 1200, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        var n = e.target.querySelector('[data-count]');
        if (n) countUp(n);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    $$('.reveal').forEach(function (el) { io.observe(el); });

    /* 导航高亮当前区块 */
    var navLinks = $$('.links a');
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('section[id], header[id]').forEach(function (s) { secIO.observe(s); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 首屏：轮换词语 ---------- */
  var word = $('#word'), words = P.words || [], wi = 0;
  if (word && !reduce && words.length > 1) {
    setInterval(function () {
      word.classList.add('out');
      setTimeout(function () { wi = (wi + 1) % words.length; word.textContent = words[wi]; word.classList.remove('out'); }, 350);
    }, 2600);
  }

  /* ---------- 光晕、照片 3D 倾斜、玻璃高光 ---------- */
  var glow = $('#glow'), portrait = $('#portrait'), hero = $('.hero');
  if (!reduce && fine) {
    if (hero && glow) hero.addEventListener('mousemove', function (e) {
      glow.style.setProperty('--gx', (e.clientX / innerWidth * 100) + '%');
      glow.style.setProperty('--gy', (e.clientY / innerHeight * 100) + '%');
    });
    if (portrait) {
      portrait.addEventListener('mousemove', function (e) {
        var r = portrait.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        portrait.style.transform = 'rotateY(' + ((x - .5) * 14) + 'deg) rotateX(' + ((.5 - y) * 14) + 'deg)';
        portrait.style.setProperty('--px', x * 100 + '%');
        portrait.style.setProperty('--py', y * 100 + '%');
      });
      portrait.addEventListener('mouseleave', function () { portrait.style.transform = ''; });
    }
    var GLASS = '.glass, .badge, .btn, .seg, .stat, .tile, .item, .chip, .ccard, .theme-btn, .work-card', lastGlass = null;
    document.addEventListener('pointermove', function (e) {
      var g = e.target.closest ? e.target.closest(GLASS) : null;
      if (lastGlass && lastGlass !== g) { lastGlass.style.removeProperty('--mx'); lastGlass.style.removeProperty('--my'); }
      lastGlass = g;
      if (!g) return;
      var r = g.getBoundingClientRect();
      g.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      g.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  /* ---------- 经历：展开 / 收起 ---------- */
  var timeline = $('#timeline');
  if (timeline) {
    $$('.item .head', timeline).forEach(function (h) { h.setAttribute('aria-expanded', h.parentElement.classList.contains('open')); });
    timeline.addEventListener('click', function (e) {
      var head = e.target.closest('.head'); if (!head) return;
      var open = head.parentElement.classList.toggle('open');
      head.setAttribute('aria-expanded', open);
    });
  }

  /* ---------- 经历：分段控件筛选 ---------- */
  var seg = $('#seg'), pill = $('#segPill');
  function initPill() {
    if (!seg) return;
    var btn = seg.querySelector('[aria-pressed="true"]');
    pill.style.width = btn.offsetWidth + 'px';
    pill.style.transform = 'translateX(' + (btn.offsetLeft - 5) + 'px)';
  }
  if (seg) {
    $$('button', seg).forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('button', seg).forEach(function (x) { x.setAttribute('aria-pressed', x === btn); });
        initPill();
        var f = btn.dataset.filter;
        $$('.timeline .item').forEach(function (it) {
          it.classList.toggle('hidden', f !== 'all' && it.dataset.type !== f);
          it.classList.add('in');
        });
      });
    });
    initPill();
  }

  /* ---------- 复制邮箱（没有 JS 时是普通的 mailto 链接） ---------- */
  var toast = $('#toast'), tt;
  function showToast(msg, ms) {
    if (!toast) return;
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('show'); }, ms || 2000);
  }
  // 邮箱地址在 HTML 里是倒序存放的（防爬虫收集），这里拼回来，设置 mailto 和“点击复制”
  $$('[data-mail]').forEach(function (el) {
    var addr = el.getAttribute('data-mail').split('').reverse().join('');
    el.setAttribute('href', 'mailto:' + addr);
    el.setAttribute('data-copy', addr);
    var t = el.querySelector('[data-mail-text]'); if (t) t.textContent = addr;
  });
  $$('[data-copy]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (!navigator.clipboard) return;          // 退回到 mailto
      e.preventDefault();
      navigator.clipboard.writeText(el.dataset.copy).then(function () { showToast(P.toast || '✓'); },
        function () { location.href = 'mailto:' + el.dataset.copy; });
    });
  });

  /* =====================================================
     Liquid Glass 语言切换：点击或拖动镜片，然后跳转到对应语言的网址
     ===================================================== */
  var dock = $('#langDock'), lens = $('#lens');
  var opts = dock ? $$('.opt', dock) : [], lensTimer;
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  var isFirefox = /firefox/i.test(navigator.userAgent);
  if (!isSafari && !isFirefox && !reduce) {
    if (dock) dock.classList.add('refract');
    if (nav) nav.classList.add('refract');
  }
  function current() { return dock.querySelector('[aria-current="page"]') || opts[0]; }
  function placeLens(el, stretch) {
    if (!lens || !el) return;
    var x = el.offsetLeft, w = el.offsetWidth;
    lens.style.width = w + 'px';
    clearTimeout(lensTimer);
    if (stretch && !reduce) {
      lens.style.transform = 'translateX(' + x + 'px) scale(1.22, .82)';
      lensTimer = setTimeout(function () { lens.style.transform = 'translateX(' + x + 'px) scale(1)'; }, 170);
    } else {
      lens.style.transform = 'translateX(' + x + 'px) scale(1)';
    }
  }
  function go(el) {
    var l = el.dataset.lang;
    store('lang', l);
    placeLens(el, true);
    if (el === current()) return;
    var url = el.getAttribute('href') + (location.hash || '');
    document.body.classList.add('switching');
    setTimeout(function () { location.href = url; }, reduce ? 0 : 260);
  }
  if (dock && opts.length) {
    var drag = null;
    dock.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      var dr = dock.getBoundingClientRect();
      drag = { left: dr.left, moved: false, x0: e.clientX };
      dock.classList.add('pressed');
      try { dock.setPointerCapture(e.pointerId); } catch (err) {}
      var lr = lens.getBoundingClientRect();
      lens.style.transform = 'translateX(' + (lr.left - dr.left) + 'px) scale(1.12)';
    });
    dock.addEventListener('pointermove', function (e) {
      if (!drag) return;
      if (Math.abs(e.clientX - drag.x0) > 4) { drag.moved = true; dock.classList.add('dragging'); }
      if (!drag.moved) return;
      var w = lens.offsetWidth, first = opts[0], last = opts[opts.length - 1];
      var min = first.offsetLeft, max = last.offsetLeft + last.offsetWidth - w;
      var x = Math.max(min, Math.min(max, e.clientX - drag.left - w / 2));
      lens.style.transform = 'translateX(' + x + 'px) scale(1.12, 1.05)';
    });
    dock.addEventListener('pointerup', function (e) {
      if (!drag) return;
      var target = null, best = 1e9;
      opts.forEach(function (b) {
        var r = b.getBoundingClientRect(), d = Math.abs(e.clientX - (r.left + r.width / 2));
        if (d < best) { best = d; target = b; }
      });
      drag = null;
      dock.classList.remove('pressed', 'dragging');
      go(target);
    });
    dock.addEventListener('pointercancel', function () { drag = null; dock.classList.remove('pressed', 'dragging'); placeLens(current(), false); });
    // 鼠标点击由 pointerup 处理；键盘（回车）触发的 click 的 detail 为 0
    opts.forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); if (e.detail === 0) go(a); });
    });
    dock.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      var i = opts.indexOf(document.activeElement); if (i < 0) i = opts.indexOf(current());
      i = (i + (e.key === 'ArrowRight' ? 1 : -1) + opts.length) % opts.length;
      opts[i].focus(); e.preventDefault();
    });
    placeLens(current(), false);
  }

  /* ---------- 语言提示：不自动跳转，只在底部给一个提示 ---------- */
  function browserLang() {
    var list = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < list.length; i++) {
      var c = String(list[i]).toLowerCase().slice(0, 2);
      if (P.home && P.home[c]) return c;
    }
    return null;
  }
  var hintBox = $('#langHint');
  var want = store('lang') || browserLang();
  if (hintBox && P.lang && want && want !== P.lang && P.home && P.home[want] && P.hint && P.hint[want] && !session('langhint')) {
    var h = P.hint[want];
    hintBox.setAttribute('lang', want === 'zh' ? 'zh-Hans' : want);
    hintBox.innerHTML = '<span></span><a></a><button type="button">×</button>';
    hintBox.querySelector('span').textContent = h.text;
    var link = hintBox.querySelector('a');
    link.textContent = h.go; link.href = P.home[want] + (location.hash || '');
    link.addEventListener('click', function () { store('lang', want); });
    var close = hintBox.querySelector('button');
    close.setAttribute('aria-label', h.close);
    close.addEventListener('click', function () { session('langhint', '1'); hintBox.classList.remove('show'); });
    hintBox.hidden = false;
    setTimeout(function () { hintBox.classList.add('show'); }, 1200);
  }

  /* ---------- 语言栏：往下滚动时藏到屏幕下方，往上滚动、在页面顶部或底部时出现 ---------- */
  if (dock) {
    var lastY = scrollY, ticking = false, root = document.documentElement;
    var setAway = function (away) { root.classList.toggle('dock-away', away); };
    var onDockScroll = function () {
      ticking = false;
      var y = scrollY, dy = y - lastY;
      var nearEnd = y + innerHeight >= root.scrollHeight - 80;
      if (y < 120 || nearEnd || dock.contains(document.activeElement)) { setAway(false); lastY = y; return; }
      if (dy > 8) { setAway(true); lastY = y; }
      else if (dy < -8) { setAway(false); lastY = y; }
    };
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onDockScroll); } }, { passive: true });
    dock.addEventListener('focusin', function () { setAway(false); });
  }

  /* =====================================================
     彩蛋（文字在 content.js 的 eggs，样式在 site.css 末尾）
     ===================================================== */
  var E = P.eggs || {};

  // 1. 打开开发者工具时，控制台里的问候
  if (E.console && window.console) {
    try {
      console.log('%cZhihao Yang', 'font: 700 28px/1.2 -apple-system, system-ui, sans-serif; color: #3D63F0;');
      console.log('%c' + E.console, 'font: 14px/1.6 -apple-system, system-ui, sans-serif;');
    } catch (err) {}
  }

  // 2. 车灯模式：整页变暗，只剩一束近光灯的光型（明暗截止线：左侧水平、右侧 15° 上扬），跟着鼠标 / 手指走
  //    电脑：↑↑↓↓←→←→BA 打开，Esc 或再输一次关闭
  //    手机：在页面上划 ↑↑↓↓←→←→，再点两下打开；两指轻点关闭
  var touch = matchMedia('(pointer: coarse)').matches;   // 主要用手指操作的设备：提示文字换成手势说明
  var lamp = null, aimX = innerWidth / 2, aimY = innerHeight * 0.45, aimQueued = false;
  var SVGNS = 'http://www.w3.org/2000/svg';
  function placeBeam() {
    aimQueued = false;
    if (!lamp) return;
    var k = Math.max(0.55, Math.min(1, innerWidth / 900));
    var t = 'translate(' + aimX + ' ' + aimY + ') scale(' + k + ')';
    lamp.querySelectorAll('.hl-move').forEach(function (g) { g.setAttribute('transform', t); });
  }
  function aim(x, y) {
    aimX = x; aimY = y;
    if (!aimQueued) { aimQueued = true; requestAnimationFrame(placeBeam); }
  }
  function lights(on) {
    if (!lamp) {
      // 坐标以光斑最亮处为原点；截止线拐点在它左上方 (-40, -40)
      var cut = 'M-520 -40L-40 -40L190 -102L520 -102L520 320L-520 320Z';
      var wrap = document.createElement('div');
      wrap.innerHTML = '<svg class="headlights" xmlns="' + SVGNS + '" aria-hidden="true"><defs>' +
        '<clipPath id="hlCut"><path d="' + cut + '"/></clipPath>' +
        '<radialGradient id="hlHole" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="430" gradientTransform="scale(1 .5)">' +
          '<stop offset="0" stop-color="#000"/><stop offset=".3" stop-color="#000"/><stop offset=".72" stop-color="#7a7a7a"/><stop offset="1" stop-color="#fff"/></radialGradient>' +
        '<radialGradient id="hlWarm" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="380" gradientTransform="scale(1 .45)">' +
          '<stop offset="0" stop-color="#fff3d6" stop-opacity=".26"/><stop offset=".5" stop-color="#ffe7b0" stop-opacity=".1"/><stop offset="1" stop-color="#ffe7b0" stop-opacity="0"/></radialGradient>' +
        '<mask id="hlMask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">' +
          '<rect width="100%" height="100%" fill="#fff"/>' +
          '<g class="hl-move"><rect x="-520" y="-102" width="1040" height="422" fill="url(#hlHole)" clip-path="url(#hlCut)"/></g>' +
        '</mask></defs>' +
        '<rect class="hl-dark" width="100%" height="100%" mask="url(#hlMask)"/>' +
        '<g class="hl-move"><rect x="-520" y="-102" width="1040" height="422" fill="url(#hlWarm)" clip-path="url(#hlCut)"/>' +
          '<path class="hl-line" d="M-330 -40L-40 -40L150 -91"/></g>' +
        '</svg>';
      lamp = wrap.firstChild;
      document.body.appendChild(lamp);
      addEventListener('pointermove', function (e) { aim(e.clientX, e.clientY); }, { passive: true });
      addEventListener('pointerdown', function (e) { aim(e.clientX, e.clientY); }, { passive: true });
      // 车灯打开时，单指拖动只移动光束，不滚动页面（passive: false 才能阻止滚动）
      addEventListener('touchmove', function (e) {
        if (!root.classList.contains('lights-on')) return;
        var t = e.touches[0]; if (t) aim(t.clientX, t.clientY);
        if (e.cancelable) e.preventDefault();
      }, { passive: false });
      placeBeam();
      lamp.getBoundingClientRect();       // 先渲染一次，渐显动画才会生效
    }
    lamp.classList.toggle('on', on);
    root.classList.toggle('lights-on', on);
    showToast(on ? (touch && E.lightsOnTouch ? E.lightsOnTouch : E.lightsOn) : E.lightsOff, on ? 3600 : 1600);
  }

  // 键盘和手势共用一个记录：方向（U D L R）、单指轻点（1）、两指轻点（2）、字母
  var seq = [], lastAt = 0;
  function record(tok) {
    var now = Date.now();
    if (now - lastAt > 3000) seq = [];
    lastAt = now;
    seq.push(tok); if (seq.length > 10) seq.shift();
    var str = seq.join(' ');
    var lit = root.classList.contains('lights-on');
    if (E.lightsOn && (/U U D D L R L R b a$/.test(str) || /U U D D L R L R 1 1$/.test(str))) { seq = []; lights(!lit); return true; }
    if (tok === '2' && lit) { seq = []; lights(false); return true; }
    if (E.e112 && /(^| )1 1 2$/.test(str)) { seq = []; showToast(E.e112, 4500); return true; }
    return false;
  }

  // 5. 112：电脑上直接敲 1 1 2；手机上单指点、单指点、两指点
  var ARROWS = { ArrowUp: 'U', ArrowDown: 'D', ArrowLeft: 'L', ArrowRight: 'R' };
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    if (e.ctrlKey || e.metaKey || e.altKey || (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))) return;
    if (e.key === 'Escape' && panel && !panel.hidden) { closePanel(); return; }
    if (e.key === 'Escape' && root.classList.contains('lights-on')) { lights(false); return; }
    clearTimeout(pendingStatus);
    var fired;
    if (ARROWS[e.key]) fired = record(ARROWS[e.key]);
    else if (e.key.length === 1) fired = record(e.key.toLowerCase());
    if (fired || !E.fms) return;
    if (/^[0-9]$/.test(e.key)) {
      var d = +e.key;
      if (panel && !panel.hidden) { pickStatus(d); return; }
      // 1 和 2 可能是 112 的开头：稍等一下，确定后面没有接着输入再显示
      pendingStatus = setTimeout(function () { pickStatus(d); }, d === 1 || d === 2 ? 700 : 0);
    } else if (e.key === 's' || e.key === 'S') {
      if (panel && !panel.hidden) closePanel(); else openPanel();
    }
  });

  // 手势：一次触摸结束时判断是划动（方向）还是轻点（几根手指）
  var g = null;
  document.addEventListener('touchstart', function (e) {
    var t = e.touches[0];
    if (!g) g = { x: t.clientX, y: t.clientY, at: Date.now(), fingers: 0, moved: 0 };
    g.fingers = Math.max(g.fingers, e.touches.length);
  }, { passive: true });
  document.addEventListener('touchmove', function (e) {
    if (!g) return;
    var t = e.touches[0];
    g.moved = Math.max(g.moved, Math.abs(t.clientX - g.x) + Math.abs(t.clientY - g.y));
    g.ex = t.clientX; g.ey = t.clientY;
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (!g || e.touches.length) return;
    var d = g, dt = Date.now() - d.at; g = null;
    if (d.fingers === 1 && d.ex != null) {
      var dx = d.ex - d.x, dy = d.ey - d.y;
      if (Math.max(Math.abs(dx), Math.abs(dy)) > 40 && dt < 800) {
        record(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : (dy > 0 ? 'D' : 'U'));
        return;
      }
    }
    if (d.moved < 12 && dt < 350 && d.fingers <= 2) record(String(d.fingers));
  }, { passive: true });
  document.addEventListener('touchcancel', function () { g = null; }, { passive: true });

  // 3. 快速连续点击头像或 logo 5 次：随机一句话（不和上一句重复；手机上还会出现手势提示）
  var clicks = 0, clickTimer, lastLine = -1;
  function tap() {
    if (longFired) { longFired = false; return; }
    clicks++;
    clearTimeout(clickTimer); clickTimer = setTimeout(function () { clicks = 0; }, 900);
    var lines = (E.clicks || []).concat(touch && E.touchHints ? E.touchHints : []);
    if (clicks < 5 || !lines.length) return;
    clicks = 0;
    var i;
    do { i = Math.floor(Math.random() * lines.length); } while (lines.length > 1 && i === lastLine);
    lastLine = i;
    showToast(lines[i], 3200);
  }
  [$('#portrait'), $('.brand-logo')].forEach(function (el) { if (el) el.addEventListener('click', tap); });


  /* ---------- 调度中心彩蛋：FMS 车辆状态（数字键 0–9 / 状态面板） ---------- */
  var F = E.fms || null, panel = null, pendingStatus, lastFocus = null;
  function goContact() {
    var c = $('#contact');
    if (c) c.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    else if (P.home && P.lang) location.href = P.home[P.lang] + '#contact';
  }
  function pickStatus(d) {
    if (!F || !F.status || !F.status[d]) return;
    var msg = F.status[d][1];
    if (panel && !panel.hidden) {
      panel.querySelectorAll('.fms-key').forEach(function (b) { b.setAttribute('aria-pressed', +b.dataset.s === d); });
      panel.querySelector('.fms-d').textContent = d;
      panel.querySelector('.fms-t').textContent = msg;
      if (d === 5) setTimeout(function () { closePanel(); goContact(); }, reduce ? 0 : 900);
      return;
    }
    showToast(msg, 3400);
    if (d === 5) setTimeout(goContact, reduce ? 0 : 500);
  }
  function buildPanel() {
    panel = document.createElement('div');
    panel.className = 'fms-panel glass'; panel.hidden = true;
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', F.title);
    panel.innerHTML = '<div class="fms-head"><span class="fms-title"></span><button type="button" class="fms-x">×</button></div>' +
      '<div class="fms-screen" role="status" aria-live="polite"><span class="fms-d">–</span><span class="fms-t"></span></div>' +
      '<div class="fms-keys"></div>';
    panel.querySelector('.fms-title').textContent = F.title;
    panel.querySelector('.fms-t').textContent = F.prompt;
    var x = panel.querySelector('.fms-x'); x.setAttribute('aria-label', F.close);
    x.addEventListener('click', closePanel);
    var keys = panel.querySelector('.fms-keys');
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach(function (d) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'fms-key'; b.dataset.s = d; b.setAttribute('aria-pressed', 'false');
      b.innerHTML = '<b></b><span></span>';
      b.querySelector('b').textContent = d;
      b.querySelector('span').textContent = F.status[d][0];
      b.addEventListener('click', function () { pickStatus(d); });
      keys.appendChild(b);
    });
    document.body.appendChild(panel);
    document.addEventListener('pointerdown', function (e) {
      if (!panel.hidden && !panel.contains(e.target) && !(portrait && portrait.contains(e.target))) closePanel();
    });
  }
  function openPanel() {
    if (!F || !F.status) return;
    if (!panel) buildPanel();
    lastFocus = document.activeElement;
    panel.querySelector('.fms-d').textContent = '–';
    panel.querySelector('.fms-t').textContent = F.prompt;
    panel.querySelectorAll('.fms-key').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
    panel.hidden = false;
    panel.getBoundingClientRect();
    panel.classList.add('show');
    var first = panel.querySelector('.fms-key'); if (first && !touch) first.focus({ preventScroll: true });
  }
  function closePanel() {
    if (!panel || panel.hidden) return;
    panel.classList.remove('show');
    setTimeout(function () { if (!panel.classList.contains('show')) panel.hidden = true; }, reduce ? 0 : 250);
    if (lastFocus && lastFocus.focus && panel.contains(document.activeElement)) lastFocus.focus({ preventScroll: true });
  }

  // 长按头像（约 0.6 秒）打开状态面板；手机上不弹出“存储图像”菜单
  var longFired = false, pressT = null, pressAt = null;
  if (portrait && F) {
    var pimg = portrait.querySelector('img'); if (pimg) pimg.setAttribute('draggable', 'false');
    var cancelPress = function () { clearTimeout(pressT); pressT = null; };
    portrait.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      longFired = false; pressAt = { x: e.clientX, y: e.clientY };
      cancelPress();
      pressT = setTimeout(function () { pressT = null; longFired = true; openPanel(); }, 600);
    });
    portrait.addEventListener('pointermove', function (e) {
      if (pressT && pressAt && Math.abs(e.clientX - pressAt.x) + Math.abs(e.clientY - pressAt.y) > 12) cancelPress();
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) { portrait.addEventListener(t, cancelPress); });
    portrait.addEventListener('contextmenu', function (e) { if (longFired || e.pointerType === 'touch' || touch) e.preventDefault(); });
  }

  // 进度条上的小车：开到页面最底部时提示“已到现场”（每次打开页面只提示一次）
  var arrivedShown = false, unitEl = $('#unit'), rollT;
  addEventListener('scroll', function () {
    if (unitEl) { unitEl.classList.add('moving'); clearTimeout(rollT); rollT = setTimeout(function () { unitEl.classList.remove('moving'); }, 700); }
    if (arrivedShown || !E.arrived) return;
    var h = root.scrollHeight - innerHeight;
    if (h > 400 && scrollY >= h - 4) { arrivedShown = true; showToast(E.arrived, 3200); }
  }, { passive: true });


  // 用浏览器“返回”回到本页时（页面从缓存恢复），取消切换语言时的淡出效果
  addEventListener('pageshow', function (e) {
    if (e.persisted) { document.body.classList.remove('switching'); if (dock) placeLens(current(), false); }
  });

  addEventListener('resize', function () { initPill(); if (dock) placeLens(current(), false); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { initPill(); if (dock) placeLens(current(), false); });
})();
