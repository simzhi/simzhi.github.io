/* 案例配图：根据 cases.js 里的文字生成 SVG（自绘，不使用任何外部图片）。
   颜色用网站的 CSS 变量，深色模式自动适配；样式见 site.css 的 “案例配图” 部分。 */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pick = (o, l) => (o == null ? '' : typeof o === 'string' ? o : (o[l] ?? o.en ?? ''));
// 粗略估算文字宽度：中文字符按 1 个字号，其他按 0.56 个字号
const textWidth = (s, size) => [...String(s)].reduce((w, ch) => w + (/[　-鿿＀-￯]/.test(ch) ? size : /[A-Z]/.test(ch) ? size * 0.66 : size * 0.56), 0);

const GRAD = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2E9BFF"/><stop offset=".55" stop-color="#3D63F0"/><stop offset="1" stop-color="#4B3FC9"/></linearGradient>`;
const ARROW = (id) => `<marker id="${id}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ah"/></marker>`;

function svg({ viewBox, alt, body, defs = '', cls = '' }) {
  return `<svg class="${cls}" viewBox="${viewBox}" role="img" aria-label="${esc(alt)}" xmlns="http://www.w3.org/2000/svg"><title>${esc(alt)}</title><defs>${defs}</defs>${body}</svg>`;
}

/* 把文字按宽度折成最多两行（有空格时按单词，中文按字） */
function wrap(text, maxW, size) {
  if (textWidth(text, size) <= maxW) return [text];
  // 有空格按单词折行；中文列表按 “、” 折行；其他中文按字折行
  const cjkList = /、/.test(text);
  const words = cjkList ? text.split(/(?<=、)/) : /\s/.test(text) ? text.split(' ') : [...text];
  const sep = !cjkList && /\s/.test(text) ? ' ' : '';
  let a = '';
  for (let i = 0; i < words.length; i++) {
    const next = a ? a + sep + words[i] : words[i];
    if (textWidth(next, size) > maxW && a) return [a, words.slice(i).join(sep)];
    a = next;
  }
  return [a];
}
function label(x, y, lines, size, cls) {
  const lh = size * 1.2, y0 = y - ((lines.length - 1) * lh) / 2;
  return lines.map((t, i) => `<text x="${x}" y="${(y0 + i * lh).toFixed(1)}" class="${cls}" text-anchor="middle" dominant-baseline="central">${esc(t)}</text>`).join('');
}

/* ---------- Magna：协作关系图 ---------- */
function collaboration(f, l) {
  const W = 840, H = 540, cx = W / 2, cy = 270, rx = 270, ry = 212, fs = 20;
  const nodes = f.nodes.map((n, i) => {
    const a = (-90 + i * (360 / f.nodes.length)) * Math.PI / 180;
    const t = pick(n, l), w = Math.max(130, textWidth(t, fs) + 36), h = 50;
    return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), w, h, t };
  });
  const center = pick(f.center, l), cw = textWidth(center, 22) + 56;
  const body = [
    ...nodes.map((n) => `<line x1="${cx}" y1="${cy}" x2="${n.x.toFixed(1)}" y2="${n.y.toFixed(1)}" class="ln"/>`),
    ...nodes.map((n) => `<rect x="${(n.x - n.w / 2).toFixed(1)}" y="${(n.y - n.h / 2).toFixed(1)}" width="${n.w.toFixed(1)}" height="${n.h}" rx="${n.h / 2}" class="nd"/>${label(n.x, n.y, [n.t], fs, 't')}`),
    `<rect x="${cx - cw / 2}" y="${cy - 34}" width="${cw}" height="68" rx="34" fill="url(#fg-collab)" class="me"/>${label(cx, cy, [center], 22, 't me-t')}`
  ].join('');
  return svg({ viewBox: `0 0 ${W} ${H}`, alt: pick(f.alt, l), defs: GRAD('fg-collab'), body });
}

/* ---------- Audi：车辆大灯把灯光投到地面、行人脚下（抽象示意） ---------- */
function pedestrians(f, l) {
  const G = 262, people = [480, 592, 694];             // 地面高度和行人位置
  const beams = people.map((x, i) =>
    `<path d="M288 192 L${x - 44} ${G + 4} L${x + 44} ${G + 4} Z" fill="url(#fg-beam)" opacity="${0.55 - i * 0.1}"/>`).join('');
  const pools = people.map((x) =>
    `<ellipse cx="${x}" cy="${G + 3}" rx="54" ry="11" fill="url(#fg-pool)"/><ellipse cx="${x}" cy="${G + 3}" rx="30" ry="5.5" fill="#BFF4FF" opacity=".75"/>`).join('');
  const person = (x) => `<circle cx="${x}" cy="${G - 74}" r="13" class="pp"/><rect x="${x - 15}" y="${G - 58}" width="30" height="58" rx="15" class="pp"/>`;
  const body = `
    ${beams}
    <line x1="20" y1="${G + 3}" x2="760" y2="${G + 3}" class="ln"/>
    ${pools}
    <path d="M44 236 Q40 196 78 186 L132 176 Q160 132 214 130 L250 132 Q276 140 286 186 Q298 196 296 232 Q294 240 284 240 L56 240 Q46 240 44 236 Z" fill="url(#fg-car)"/>
    <path d="M150 178 Q172 146 210 144 L240 146 Q258 152 264 178 Z" class="win"/>
    <circle cx="96" cy="242" r="22" class="wh"/><circle cx="244" cy="242" r="22" class="wh"/>
    <ellipse cx="284" cy="192" rx="9" ry="6" fill="#7DE3FF"/>
    ${people.map(person).join('')}`;
  const defs = GRAD('fg-car') +
    `<linearGradient id="fg-beam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7DE3FF" stop-opacity=".9"/><stop offset="1" stop-color="#7DE3FF" stop-opacity=".12"/></linearGradient>` +
    `<radialGradient id="fg-pool"><stop offset="0" stop-color="#7DE3FF" stop-opacity=".95"/><stop offset=".6" stop-color="#5BB8FF" stop-opacity=".45"/><stop offset="1" stop-color="#8e8cff" stop-opacity="0"/></radialGradient>`;
  return svg({ viewBox: '0 0 780 290', alt: pick(f.alt, l), defs, body });
}

/* ---------- HxGN：需求澄清流程（宽屏横排，窄屏竖排） ---------- */
function flow(f, l) {
  const steps = f.steps.map((s) => pick(s, l));
  const alt = pick(f.alt, l);
  // 宽屏
  const bw = 168, gap = 46, fs = 19, W = steps.length * bw + (steps.length - 1) * gap + 20;
  const wide = steps.map((t, i) => {
    const x = 10 + i * (bw + gap), last = i === steps.length - 1;
    return `<rect x="${x}" y="30" width="${bw}" height="96" rx="22" class="${last ? 'me' : 'nd'}"${last ? ' fill="url(#fg-flow-w)"' : ''}/>` +
      `<text x="${x + 20}" y="54" class="ts${last ? ' me-t' : ''}">${i + 1}</text>` +
      label(x + bw / 2, 84, wrap(t, bw - 28, fs), fs, `t${last ? ' me-t' : ''}`) +
      (last ? '' : `<line x1="${x + bw + 6}" y1="78" x2="${x + bw + gap - 6}" y2="78" class="ar" marker-end="url(#fg-flow-a)"/>`);
  }).join('');
  // 窄屏
  const nh = 64, ngap = 30, nW = 440;
  const narrow = steps.map((t, i) => {
    const y = 10 + i * (nh + ngap), last = i === steps.length - 1;
    return `<rect x="20" y="${y}" width="${nW - 40}" height="${nh}" rx="22" class="${last ? 'me' : 'nd'}"${last ? ' fill="url(#fg-flow-n)"' : ''}/>` +
      `<text x="44" y="${y + nh / 2}" class="ts${last ? ' me-t' : ''}" dominant-baseline="central">${i + 1}</text>` +
      label(nW / 2 + 10, y + nh / 2, [t], 21, `t${last ? ' me-t' : ''}`) +
      (last ? '' : `<line x1="${nW / 2}" y1="${y + nh + 4}" x2="${nW / 2}" y2="${y + nh + ngap - 4}" class="ar" marker-end="url(#fg-flow-a2)"/>`);
  }).join('');
  const nH = steps.length * nh + (steps.length - 1) * ngap + 20;
  return svg({ cls: 'fig-wide', viewBox: `0 0 ${W} 156`, alt, defs: GRAD('fg-flow-w') + ARROW('fg-flow-a'), body: wide }) +
    svg({ cls: 'fig-narrow', viewBox: `0 0 ${nW} ${nH}`, alt, defs: GRAD('fg-flow-n') + ARROW('fg-flow-a2'), body: narrow });
}

/* ---------- 智能家居：架构图（宽屏 / 窄屏） ---------- */
function smarthome(f, l) {
  const L = Object.fromEntries(Object.entries(f.labels).map(([k, v]) => [k, pick(v, l)]));
  const alt = pick(f.alt, l);
  const box = (x, y, w, h, title, sub, me, grad) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" class="${me ? 'me' : 'nd'}"${me ? ` fill="url(#${grad})"` : ''}/>` +
    (sub ? (() => { const sl = wrap(sub, w - 24, 16); const off = sl.length > 1 ? 22 : 13;
        return label(x + w / 2, y + h / 2 - off, [title], 21, `t${me ? ' me-t' : ''}`) + label(x + w / 2, y + h / 2 + (sl.length > 1 ? 18 : 16), sl, 16, 'ts'); })()
         : label(x + w / 2, y + h / 2, [title], 21, `t${me ? ' me-t' : ''}`));
  const line = (x1, y1, x2, y2, m) => `<path d="M${x1} ${y1} C${(x1 + x2) / 2} ${y1} ${(x1 + x2) / 2} ${y2} ${x2} ${y2}" class="ar" marker-end="url(#${m})"/>`;
  const wide = box(20, 30, 270, 76, L.matter) + box(20, 172, 270, 96, L.other, L.otherSub) +
    box(350, 182, 220, 76, L.ha) + box(640, 104, 220, 86, L.apple, '', true, 'fg-sh-w') +
    line(290, 68, 634, 132, 'fg-sh-a') + line(290, 220, 344, 220, 'fg-sh-a') + line(570, 220, 634, 162, 'fg-sh-a');
  const narrow = box(20, 20, 210, 112, L.other, L.otherSub) + box(250, 20, 210, 96, L.matter) +
    box(20, 176, 210, 72, L.ha) + box(130, 318, 220, 80, L.apple, '', true, 'fg-sh-n') +
    `<line x1="125" y1="136" x2="125" y2="170" class="ar" marker-end="url(#fg-sh-a2)"/>` +
    `<path d="M125 252 C125 290 200 290 214 312" class="ar" marker-end="url(#fg-sh-a2)"/>` +
    `<path d="M355 120 C355 230 300 260 282 312" class="ar" marker-end="url(#fg-sh-a2)"/>`;
  return svg({ cls: 'fig-wide', viewBox: '0 0 880 290', alt, defs: GRAD('fg-sh-w') + ARROW('fg-sh-a'), body: wide }) +
    svg({ cls: 'fig-narrow', viewBox: '0 0 480 410', alt, defs: GRAD('fg-sh-n') + ARROW('fg-sh-a2'), body: narrow });
}

const TYPES = { collaboration, pedestrians, flow, smarthome };
export function figure(f, l) {
  if (!f || !TYPES[f.type]) return '';
  return `<figure class="fig glass">${TYPES[f.type](f, l)}</figure>`;
}
