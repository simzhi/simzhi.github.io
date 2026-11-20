/* 生成网页用的图片（只在换照片时手动运行：npm install && npm run images）
   • static/photo.jpg → static/img/portrait-{400,700,1000}.{avif,webp,jpg}，裁成 4:5
   网站构建（build.mjs）和 GitHub Actions 都不需要这个脚本。 */
import sharp from 'sharp';
import fs from 'fs';

const SRC = 'static/photo.jpg', OUT = 'static/img';
const FOCUS_X = 0.52;          // 横向裁剪位置：0 = 最左，1 = 最右
fs.mkdirSync(OUT, { recursive: true });

const meta = await sharp(SRC).rotate().metadata();
const H = meta.height, W = Math.round(H * 0.8), left = Math.round(FOCUS_X * (meta.width - W));
for (const w of [400, 700, 1000]) {
  const img = sharp(SRC).rotate().extract({ left, top: 0, width: W, height: H }).resize(w);
  await img.clone().avif({ quality: 50, effort: 6 }).toFile(`${OUT}/portrait-${w}.avif`);
  await img.clone().webp({ quality: 74 }).toFile(`${OUT}/portrait-${w}.webp`);
  await img.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${OUT}/portrait-${w}.jpg`);
}
for (const f of fs.readdirSync(OUT)) console.log(`${OUT}/${f}`, fs.statSync(`${OUT}/${f}`).size, 'bytes');
