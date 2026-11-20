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
  drawIcon();
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var th = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', th);
    store('theme', th);
    drawIcon();
  });

  /* ---------- 滚动进度条 + 导航收窄 ---------- */
  var bar = $('#progress'), nav = $('#nav');
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
    if (nav) nav.classList.toggle('compact', scrollY > 60);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

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
    var GLASS = '.glass, .badge, .btn, .seg, .stat, .tile, .item, .chip, .ccard, .theme-btn', lastGlass = null;
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
    var btn = seg.querySelector('[aria-selected="true"]');
    pill.style.width = btn.offsetWidth + 'px';
    pill.style.transform = 'translateX(' + (btn.offsetLeft - 5) + 'px)';
  }
  if (seg) {
    $$('button', seg).forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('button', seg).forEach(function (x) { x.setAttribute('aria-selected', x === btn); });
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
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('show'); }, 2000);
  }
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

  // 用浏览器“返回”回到本页时（页面从缓存恢复），取消切换语言时的淡出效果
  addEventListener('pageshow', function (e) {
    if (e.persisted) { document.body.classList.remove('switching'); if (dock) placeLens(current(), false); }
  });

  addEventListener('resize', function () { initPill(); if (dock) placeLens(current(), false); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { initPill(); if (dock) placeLens(current(), false); });
})();
