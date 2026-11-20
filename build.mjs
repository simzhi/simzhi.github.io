#!/usr/bin/env node
/* ==========================================================================
   构建脚本：读取 content.js 和 legal.js，生成可以直接发布的静态网站（dist/）。
   • 每种语言一个页面：/（英语）、/de/、/zh/，所有文字都写在 HTML 里。
   • 同时生成 Impressum / Datenschutz（填完 TODO 后才会发布）、404、robots.txt、sitemap.xml。
   • 不依赖任何第三方库：运行  node build.mjs  即可。
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { figure } from './src/figures.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'dist');
const BASE = 'https://zhihaoyang.com';
const LANGS = ['en', 'de', 'zh'];
const HTML_LANG = { en: 'en', de: 'de', zh: 'zh-Hans' };
const OG_LOCALE = { en: 'en_US', de: 'de_DE', zh: 'zh_CN' };
const LABEL = { en: 'EN', de: 'DE', zh: '中文' };
const warnings = [];

/* ---------- 读取内容文件 ---------- */
function load(file, key) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), sandbox, { filename: file });
  if (!sandbox.window[key]) throw new Error(`${file} 没有定义 window.${key}`);
  return sandbox.window[key];
}
const S = load('content.js', 'SITE');
const LEGAL = load('legal.js', 'LEGAL');
const CASES = load('cases.js', 'CASES');
const SIDE = load('cases.js', 'SIDE_PROJECTS');

/* ---------- 小工具 ---------- */
const pick = (o, l) => (o == null ? '' : typeof o === 'string' || Array.isArray(o) ? o : (o[l] != null && o[l] !== '' ? o[l] : (o.en ?? '')));
const html = (s) => String(s).replace(/&(?![a-z#0-9]+;)/gi, '&amp;');            // 内容里允许 <strong> 等标签
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = (s) => String(s).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const ui = (l, k) => { if (!S.ui[k]) warnings.push(`content.js 缺少 ui["${k}"]`); return html(pick(S.ui[k], l)); };
const uiPlain = (l, k) => plain(pick(S.ui[k], l));
const home = (l) => (l === 'en' ? '/' : `/${l}/`);
const caseUrl = (l, slug) => `${home(l)}work/${slug}/`;
const altsFor = (urlOf) => [
  ...LANGS.map((x) => ({ hreflang: HTML_LANG[x], href: BASE + urlOf(x) })),
  { hreflang: 'x-default', href: BASE + urlOf('en') }
];
const hash = (file) => crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex').slice(0, 8);
const write = (rel, data) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); };
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

/* ---------- 准备输出目录和静态文件 ---------- */
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(path.join(ROOT, 'static'), OUT, { recursive: true });
fs.copyFileSync(path.join(ROOT, 'src/site.css'), path.join(OUT, 'site.css'));
fs.copyFileSync(path.join(ROOT, 'src/site.js'), path.join(OUT, 'site.js'));
const V = { css: hash(path.join(ROOT, 'src/site.css')), js: hash(path.join(ROOT, 'src/site.js')) };

/* 简历：只有 cv/cv-<语言>.pdf 存在时才显示下载按钮 */
const CV = {};
for (const l of LANGS) {
  const f = path.join(ROOT, 'cv', `cv-${l}.pdf`);
  if (fs.existsSync(f)) { CV[l] = `/cv/cv-${l}.pdf`; write(`cv/cv-${l}.pdf`, fs.readFileSync(f)); }
  else warnings.push(`TODO：没有 cv/cv-${l}.pdf，${l} 页面暂不显示 “Download CV” 按钮`);
}

/* 法律页面：还有 TODO 的不发布。
   本地预览时可以用  node build.mjs --drafts  把草稿也生成出来（只用于本地查看，不会部署）。 */
const DRAFTS = process.argv.includes('--drafts');
const legalPages = Object.values(LEGAL).filter((p) => {
  const todo = /TODO/.test(p.de + p.en);
  if (todo) warnings.push(`TODO：legal.js 里的 “${p.title.de}” 还有 TODO，${DRAFTS ? '本地草稿模式下已生成，但正式构建不会发布' : '暂不发布'}（/${p.path}/）`);
  return !todo || DRAFTS;
});

/* ---------- 公共片段 ---------- */
const themeScript = `<script>(function(){var d=document.documentElement;d.classList.add('js');var t=null;try{t=localStorage.getItem('theme')}catch(e){}if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.setAttribute('data-theme',t)})();</script>`;

function head({ l, title, description, canonical, alternates = [], noindex = false, extra = '' }) {
  return `<!doctype html>
<html lang="${HTML_LANG[l]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}${canonical ? `<link rel="canonical" href="${canonical}">\n` : ''}${alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}">`).join('\n')}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#f2f4f8" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#050608" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Zhihao Yang">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${canonical ? `<meta property="og:url" content="${canonical}">\n` : ''}<meta property="og:image" content="${BASE}/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${OG_LOCALE[l]}">
${LANGS.filter((x) => x !== l).map((x) => `<meta property="og:locale:alternate" content="${OG_LOCALE[x]}">`).join('\n')}
<meta name="twitter:card" content="summary_large_image">
${themeScript}
<link rel="stylesheet" href="/site.css?v=${V.css}">
${extra}</head>`;
}

const themeButton = `<button class="theme-btn" id="themeBtn" type="button" aria-label="Light / Dark" title="Light / Dark"><svg id="themeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>`;

function navBar(l, links) {
  // 手机上：链接多于一个时，折叠进“菜单”按钮（见 site.css 的 “手机导航菜单”）
  const menu = (links.match(/<a /g) || []).length > 1;
  return `<a class="skip" href="#main">${ui(l, 'skip')}</a>
<nav class="bar${menu ? ' has-menu' : ''}" id="nav" aria-label="Main">
  <div class="inner">
    <a class="brand" href="${home(l)}#top"><img class="brand-logo" src="/logo.svg" alt="" width="30" height="30"><span>${ui(l, 'name.short')}</span></a>
    <div class="links" id="navLinks">
${menu ? `      <div class="menu-list"><div class="menu-inner">
${links}
      </div></div>` : links}
      ${themeButton}${menu ? `
      <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="navLinks" aria-label="${uiPlain(l, 'nav.menu')}"><span></span><span></span></button>` : ''}
    </div>
  </div>
</nav>`;
}

const ambient = `<div class="ambient" aria-hidden="true"><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i></div>
<div id="progress"></div>`;

const refractFilter = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <filter id="lg-refract" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="11" result="noise"/>
    <feGaussianBlur in="noise" stdDeviation="2.5" result="soft"/>
    <feDisplacementMap in="SourceGraphic" in2="soft" scale="28" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</svg>`;

function footer(l) {
  const links = legalPages.map((p) => `<a href="/${p.path}/">${ui(l, p.path === 'impressum' ? 'legal.impressum' : 'legal.privacy')}</a>`).join('');
  return `<footer>
  <p>${ui(l, 'footer')}</p>
  ${links ? `<nav aria-label="Legal">${links}</nav>` : ''}
</footer>`;
}

function langDock(l, urlOf = home) {
  return `<div class="lang-dock" id="langDock" role="navigation" aria-label="Language / Sprache / 语言">
  <span class="lens" id="lens"></span>
  <span class="globe" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg></span>
  ${LANGS.map((x) => `<a class="opt" draggable="false" href="${urlOf(x)}" hreflang="${HTML_LANG[x]}" lang="${HTML_LANG[x]}" data-lang="${x}"${x === l ? ' aria-current="page"' : ''}>${LABEL[x]}</a>`).join('\n  ')}
</div>`;
}

/* ---------- 主页各部分 ---------- */
const chev = '<span class="chev" aria-hidden="true"><svg viewBox="0 0 12 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 1v10M1 6h10"/></svg></span>';
const delay = (i) => (i ? ` d${Math.min(i, 3)}` : '');

function hero(l) {
  const words = pick(S.rotator, l);
  const cv = CV[l] ? `\n        <a class="btn ghost" href="${CV[l]}" download>${ui(l, 'cv.download')}</a>` : '';
  return `<header class="hero" id="top">
    <div class="glow" id="glow"></div>
    <div class="wrap">
      <div>
        <p class="eyebrow reveal">${ui(l, 'hero.hello')}</p>
        <h1 class="reveal d1">${ui(l, 'hero.name')}</h1>
        <p class="rotator reveal d2">${ui(l, 'hero.rotPre')}<span class="word" id="word">${esc(words[0] || '')}</span>${ui(l, 'hero.rotPost')}</p>
        <p class="lead reveal d2">${ui(l, 'hero.lead')}</p>
        <div class="ctas reveal d3">
        <a class="btn primary" href="#contact">${ui(l, 'hero.cta1')}</a>
        <a class="btn ghost" href="#journey">${ui(l, 'hero.cta2')}</a>${cv}
        </div>
      </div>
      <div class="portrait-wrap reveal d2">
        <div class="portrait" id="portrait"><div class="photo"><picture>
          <source type="image/avif" srcset="/img/portrait-400.avif 400w, /img/portrait-700.avif 700w, /img/portrait-1000.avif 1000w" sizes="(max-width: 820px) min(290px, 74vw), 350px">
          <source type="image/webp" srcset="/img/portrait-400.webp 400w, /img/portrait-700.webp 700w, /img/portrait-1000.webp 1000w" sizes="(max-width: 820px) min(290px, 74vw), 350px">
          <img src="/img/portrait-700.jpg" srcset="/img/portrait-400.jpg 400w, /img/portrait-700.jpg 700w, /img/portrait-1000.jpg 1000w" sizes="(max-width: 820px) min(290px, 74vw), 350px" alt="${esc(uiPlain(l, 'name.short'))}" width="1000" height="1250" fetchpriority="high">
        </picture></div></div>
        <div class="badge"><span class="dot"></span> ${ui(l, 'hero.badge')}</div>
      </div>
    </div>
  </header>`;
}

function about(l) {
  const stats = S.stats.map((s, i) => `<div class="stat reveal${delay(i)}"><div class="n" data-count="${s.n}">${s.n}</div><div class="l">${html(pick(s.label, l))}</div></div>`).join('\n        ');
  return `<section class="block" id="about">
    <div class="wrap about-grid">
      <div>
        <p class="kicker reveal">${ui(l, 'about.kicker')}</p>
        <h2 class="reveal d1">${ui(l, 'about.title')}</h2>
        <div class="prose">
          <p class="reveal d2">${ui(l, 'about.p1')}</p>
          <p class="reveal d2">${ui(l, 'about.p2')}</p>
          <p class="reveal d3">${ui(l, 'about.p3')}</p>
        </div>
      </div>
      <div class="stats">
        ${stats}
      </div>
    </div>
  </section>`;
}

function values(l) {
  const tiles = S.values.map((v, i) => `<div class="tile ${v.size || 'w3'}${v.feature ? ' feature' : ''} reveal${i % 2 ? ' d1' : ''}">
          <div class="icon" aria-hidden="true">${v.icon || ''}</div><h3>${html(pick(v.title, l))}</h3><p>${html(pick(v.text, l))}</p>
        </div>`).join('\n        ');
  return `<section class="block" id="values">
    <div class="wrap">
      <p class="kicker reveal">${ui(l, 'values.kicker')}</p>
      <h2 class="reveal d1">${ui(l, 'values.title')}</h2>
      <div class="bento">
        ${tiles}
      </div>
    </div>
  </section>`;
}

function caseLink(j, l) {
  if (!j.case) return '';
  if (!CASES.some((c) => c.slug === j.case)) { warnings.push(`content.js：经历里的 case “${j.case}” 在 cases.js 里找不到`); return ''; }
  return `<p class="case-link"><a href="${caseUrl(l, j.case)}">${ui(l, 'journey.caselink')}</a></p>`;
}

/* ---------- Selected work 和 Side projects ---------- */
function work(l) {
  const cards = CASES.map((c, i) => `<a class="work-card reveal${delay(i)}" href="${caseUrl(l, c.slug)}">
          <span class="meta">${html(c[l].meta)}</span>
          <h3>${html(c[l].title)}</h3>
          <p>${html(pick(c.summary, l))}</p>
          <span class="more">${ui(l, 'case.readmore')}</span>
        </a>`).join('\n        ');
  return `<section class="block" id="work">
    <div class="wrap">
      <p class="kicker reveal">${ui(l, 'work.kicker')}</p>
      <h2 class="reveal d1">${ui(l, 'work.title')}</h2>
      <div class="work-grid">
        ${cards}
      </div>
    </div>
  </section>`;
}

function sections(c, l, Hn = 'h2') {
  return c[l].sections.map((s, i) => `<${Hn}>${html(s.h)}</${Hn}>\n${s.html}${c.figure && c.figure.after === i ? '\n' + figure(c.figure, l) : ''}`).join('\n');
}

function side(l) {
  const cards = SIDE.map((p) => `<details class="side-card glass reveal" id="${p.slug}">
          <summary><h3>${html(p[l].title)}</h3><span class="meta">${html(p[l].meta)}</span><span class="toggle">${ui(l, 'side.toggle')}</span></summary>
          <div class="side-body">
${sections(p, l, 'h4')}
          </div>
        </details>`).join('\n        ');
  return `<section class="block" id="side">
    <div class="wrap">
      <p class="kicker reveal">${ui(l, 'side.kicker')}</p>
      <h2 class="reveal d1">${ui(l, 'side.title')}</h2>
      ${cards}
    </div>
  </section>`;
}

function journey(l) {
  const items = S.journey.map((j, i) => {
    const pts = pick(j.points, l) || [];
    return `<li class="item reveal${i === 0 ? ' open' : ''}" data-type="${j.type}">
          <button class="head" type="button"><span class="when">${html(pick(j.when, l))}</span>
            <span class="title"><strong>${html(pick(j.title, l))}</strong><span>${html(pick(j.place, l))}</span></span>${chev}</button>
          <div class="body"><div><ul>${pts.map((p) => `<li>${html(p)}</li>`).join('')}</ul>${caseLink(j, l)}</div></div>
        </li>`;
  }).join('\n        ');
  const chips = S.skills.map((s) => `<span class="chip">${html(pick(s, l))}</span>`).join('');
  return `<section class="block" id="journey">
    <div class="wrap">
      <p class="kicker reveal">${ui(l, 'journey.kicker')}</p>
      <h2 class="reveal d1">${ui(l, 'journey.title')}</h2>
      <div class="seg reveal d2" id="seg" role="group">
        <span class="pill" id="segPill"></span>
        <button type="button" data-filter="all" aria-pressed="true">${ui(l, 'filter.all')}</button>
        <button type="button" data-filter="work" aria-pressed="false">${ui(l, 'filter.work')}</button>
        <button type="button" data-filter="edu" aria-pressed="false">${ui(l, 'filter.edu')}</button>
      </div>
      <ul class="timeline" id="timeline">
        ${items}
      </ul>
      <div class="chips reveal">${chips}</div>
    </div>
  </section>`;
}

function contact(l) {
  const p = S.person;
  const cv = CV[l] ? `\n      <p class="reveal d2" style="margin-top:28px"><a class="btn ghost" href="${CV[l]}" download>${ui(l, 'cv.download')}</a></p>` : '';
  return `<section class="block contact" id="contact">
    <div class="wrap">
      <p class="kicker reveal">${ui(l, 'contact.kicker')}</p>
      <h2 class="reveal d1">${ui(l, 'contact.title')}</h2>
      <div class="prose"><p class="reveal d2">${ui(l, 'contact.lead')}</p></div>
      <div class="contact-cards">
        <a class="ccard reveal" href="mailto:${esc(p.email)}" data-copy="${esc(p.email)}">
          <span class="ic" style="background:linear-gradient(135deg,#0a84ff,#5e5ce6)" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg></span>
          <span class="k">${ui(l, 'contact.email')}</span>
          <span class="v">${esc(p.email)}</span>
          <span class="h">${ui(l, 'contact.copy')}</span>
        </a>
        <a class="ccard reveal d1" href="${esc(p.linkedin)}" target="_blank" rel="noopener">
          <span class="ic" style="background:linear-gradient(135deg,#0a66c2,#2997ff)" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8.5h-3V20h3V8.5zM5 3.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5zM20.5 13.3c0-3-1.6-4.9-4.2-4.9-1.4 0-2.4.7-2.8 1.4V8.5h-3V20h3v-6c0-1.5.6-2.6 2-2.6s1.9 1 1.9 2.6v6h3.1v-6.7z"/></svg></span>
          <span class="k">LinkedIn</span>
          <span class="v">in/${esc(p.linkedin.replace(/.*\/in\//, '').replace(/\/$/, ''))}</span>
          <span class="h">${ui(l, 'contact.open')}</span>
        </a>
        <a class="ccard reveal d2" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(p.city + ', Germany')}" target="_blank" rel="noopener">
          <span class="ic" style="background:linear-gradient(135deg,#30d158,#0a84ff)" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg></span>
          <span class="k">${ui(l, 'contact.location')}</span>
          <span class="v">${ui(l, 'contact.place')}</span>
          <span class="h">${ui(l, 'contact.map')}</span>
        </a>
      </div>${cv}
    </div>
  </section>`;
}

function personLd() {
  const p = S.person;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: p.name,
    alternateName: p.alternateName,
    url: `${BASE}/`,
    image: `${BASE}/img/portrait-1000.jpg`,
    jobTitle: p.jobTitle,
    worksFor: { '@type': 'Organization', name: p.worksFor },
    address: { '@type': 'PostalAddress', addressLocality: p.city, addressCountry: p.country },
    alumniOf: { '@type': 'CollegeOrUniversity', name: p.alumniOf },
    knowsLanguage: p.languages,
    sameAs: [p.linkedin]
  };
}

/* ---------- 生成三种语言的主页 ---------- */
const alternates = altsFor(home);
/* 页面给 site.js 的数据：当前语言、各语言版本的网址、提示文字等 */
const pageData = (l, urlOf, extra = {}) => ({
  lang: l,
  toast: plain(pick(S.ui['toast.copied'], l)),
  home: Object.fromEntries(LANGS.map((x) => [x, urlOf(x)])),
  hint: Object.fromEntries(LANGS.map((x) => [x, { text: uiPlain(x, 'langhint.text'), go: uiPlain(x, 'langhint.go'), close: uiPlain(x, 'langhint.close') }])),
  ...extra
});
const pageEnd = (l, urlOf, data) => `${langDock(l, urlOf)}
${refractFilter}
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<div class="lang-hint" id="langHint" role="status" hidden></div>
<script>window.PAGE=${json(data)};</script>
<script src="/site.js?v=${V.js}" defer></script>
</body>
</html>
`;
for (const l of LANGS) {
  const page = pageData(l, home, { words: pick(S.rotator, l) });
  const doc = `${head({
    l,
    title: uiPlain(l, 'page.title'),
    description: uiPlain(l, 'hero.lead'),
    canonical: BASE + home(l),
    alternates,
    extra: `<script type="application/ld+json">${json(personLd())}</script>\n`
  })}
<body>
${ambient}
${navBar(l, [
    ['#about', 'nav.about'], ['#work', 'nav.work'], ['#values', 'nav.values'], ['#journey', 'nav.journey'], ['#contact', 'nav.contact']
  ].map(([h, k]) => `      <a href="${h}"${k === 'nav.contact' ? ' class="keep"' : ''}>${ui(l, k)}</a>`).join('\n'))}
<main id="main">
  ${hero(l)}
  ${about(l)}
  ${work(l)}
  ${values(l)}
  ${journey(l)}
  ${side(l)}
  ${contact(l)}
  ${footer(l)}
</main>
${pageEnd(l, home, page)}`;
  write(l === 'en' ? 'index.html' : `${l}/index.html`, doc);
}

/* 案例照片（通用图库照片，标注“示意图片”和作者） */
function casePhoto(c, l) {
  const p = c.photo;
  if (!p || typeof p !== 'object') return '';
  return `      <figure class="case-photo glass">
        <img src="${p.src}-1400.webp" srcset="${p.src}-800.webp 800w, ${p.src}-1400.webp 1400w" sizes="(max-width: 760px) 100vw, 720px" width="${p.width}" height="${p.height}" alt="${esc(pick(p.alt, l))}" decoding="async">
        <figcaption>${ui(l, 'case.photo')} <a href="${p.credit.url}" rel="noopener">${esc(p.credit.name)}</a> / Unsplash</figcaption>
      </figure>`;
}

/* ---------- 案例页面：/work/<slug>/、/de/work/<slug>/、/zh/work/<slug>/ ---------- */
CASES.forEach((c, i) => {
  if (typeof c.photo === 'string' && /TODO/.test(c.photo)) warnings.push(`TODO：cases.js 里 “${c.slug}” 的照片还没选（${c.photo}）`);
  const next = CASES[(i + 1) % CASES.length];
  const urlOf = (x) => caseUrl(x, c.slug);
  for (const l of LANGS) {
    const doc = `${head({
      l,
      title: `${plain(c[l].title)} · ${uiPlain(l, 'name.short')}`,
      description: plain(pick(c.summary, l)),
      canonical: BASE + urlOf(l),
      alternates: altsFor(urlOf)
    })}
<body>
${ambient}
${navBar(l, `      <a href="${home(l)}#work" class="keep">${ui(l, 'nav.work')}</a>`)}
<main id="main" class="case">
  <div class="wrap">
    <article>
      <a class="back" href="${home(l)}#work">${ui(l, 'case.back')}</a>
      <h1>${html(c[l].title)}</h1>
      <p class="meta">${html(c[l].meta)}</p>
${casePhoto(c, l)}
      <div class="prose-case">
${sections(c, l)}
      </div>
    </article>
    <nav class="case-nav" aria-label="Cases">
      <a class="btn ghost" href="${home(l)}#work">${ui(l, 'case.back')}</a>
      <a class="btn primary" href="${caseUrl(l, next.slug)}">${ui(l, 'case.next')}</a>
    </nav>
  </div>
  ${footer(l)}
</main>
${pageEnd(l, urlOf, pageData(l, urlOf))}`;
    write(`${urlOf(l).slice(1)}index.html`, doc);
  }
});

/* ---------- 法律页面（德语正式版 + 英语说明） ---------- */
function simplePage({ l, title, description, canonical, noindex, body }) {
  return `${head({ l, title, description, canonical, noindex })}
<body>
${ambient}
${navBar(l, '')}
<main id="main" class="page">
  <div class="wrap">
${body}
  </div>
  ${footer(l)}
</main>
<script>window.PAGE={};</script>
<script src="/site.js?v=${V.js}" defer></script>
</body>
</html>
`;
}
for (const p of legalPages) {
  write(`${p.path}/index.html`, simplePage({
    l: 'de',
    title: `${p.title.de} · Zhihao Yang`,
    description: `${p.title.de} – zhihaoyang.com`,
    canonical: `${BASE}/${p.path}/`,
    body: `    <article class="glass">
      <h1>${esc(p.title.de)}</h1>
      ${p.de}
      <section lang="en">
        <h2>${esc(p.title.en)} (English)</h2>
        ${p.en}
      </section>
      <p><a href="/">← zhihaoyang.com</a></p>
    </article>`
  }));
}

/* ---------- 404（三语） ---------- */
write('404.html', simplePage({
  l: 'en',
  title: `404 · ${uiPlain('en', '404.title')}`,
  description: uiPlain('en', '404.text'),
  noindex: true,
  body: `    <article class="glass">
      <h1>404</h1>
${LANGS.map((l) => `      <section lang="${HTML_LANG[l]}">
        <h2>${ui(l, '404.title')}</h2>
        <p>${ui(l, '404.text')}</p>
        <p><a class="btn ghost" href="${home(l)}">${ui(l, '404.back')}</a></p>
      </section>`).join('\n')}
    </article>`
}));

/* ---------- robots.txt 和 sitemap.xml ---------- */
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`);
const today = new Date().toISOString().slice(0, 10);
const altLinks = alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`).join('\n');
const urls = [
  ...LANGS.map((l) => `  <url>\n    <loc>${BASE}${home(l)}</loc>\n    <lastmod>${today}</lastmod>\n${altLinks}\n  </url>`),
  ...CASES.flatMap((c) => {
    const urlOf = (x) => caseUrl(x, c.slug);
    const alts = altsFor(urlOf).map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`).join('\n');
    return LANGS.map((l) => `  <url>\n    <loc>${BASE}${urlOf(l)}</loc>\n    <lastmod>${today}</lastmod>\n${alts}\n  </url>`);
  }),
  ...legalPages.map((p) => `  <url>\n    <loc>${BASE}/${p.path}/</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`);

/* ---------- 报告 ---------- */
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); f.isDirectory() ? walk(p) : files.push(path.relative(OUT, p).replace(/\\/g, '/')); } })(OUT);
console.log(`✓ 已生成 dist/（${files.length} 个文件）：`);
console.log(files.filter((f) => f.endsWith('.html') || f.endsWith('.xml') || f.endsWith('.txt')).map((f) => '  ' + f).join('\n'));
if (warnings.length) console.log('\n待办 / 提醒：\n' + [...new Set(warnings)].map((w) => '  • ' + w).join('\n'));
