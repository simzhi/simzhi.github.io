# zhihaoyang.com

个人网站的源码。网站由 `build.mjs` 生成静态页面，再由 GitHub Actions 自动发布到 GitHub Pages（自定义域名 zhihaoyang.com）。

## 文件说明

| 文件 / 文件夹 | 作用 | 需要改吗 |
|---|---|---|
| `content.js` | **网站全部文字**（英 / 德 / 中三语） | 改文字只改这里 |
| `legal.js` | Impressum 和 Datenschutzerklärung 的内容 | 填写 TODO |
| `cv/` | 公开版简历 PDF：`cv-en.pdf`、`cv-de.pdf`、`cv-zh.pdf` | 放入文件即可 |
| `static/` | 照片、logo、图标、分享预览图、CNAME | 换照片时替换同名文件 |
| `src/site.css` | 样式（颜色、字体、布局） | 一般不用改 |
| `src/site.js` | 动画和交互 | 一般不用改 |
| `build.mjs` | 构建脚本：生成 `dist/` | 一般不用改 |
| `serve.mjs` | 本地预览服务器 | 不用改 |
| `.github/workflows/pages.yml` | 自动构建和发布 | 不用改 |

`dist/` 是生成的结果，不提交到仓库。

## 本地预览

需要安装 Node.js（18 或更新版本），不需要安装任何依赖。

```bash
npm run preview
```

然后在浏览器打开 http://localhost:8080 。英语是 `/`，德语是 `/de/`，中文是 `/zh/`。

`npm run preview` 使用草稿模式：还有 TODO 的 Impressum / Datenschutz 也会生成，方便你查看，但正式发布时不会出现。

只想检查构建结果（和线上完全一样）：

```bash
node build.mjs
```

构建结束时会列出所有待办事项（缺少的简历、还有 TODO 的法律页面等）。

## 修改文字

1. 打开 `content.js`，找到要改的文字。每段文字都写成 `{ en: "…", de: "…", zh: "…" }`。
2. 保存后运行 `npm run preview` 检查效果。
3. 提交并推送到 `main`，GitHub Actions 会在一两分钟内自动发布。

也可以直接在 GitHub 网页上编辑 `content.js` 并提交，网站同样会自动更新。

不再需要手动修改版本号：样式和脚本的链接会根据文件内容自动更新，浏览器会拿到最新版本。

## 简历下载

把公开版简历放进 `cv/` 文件夹，文件名分别是 `cv-en.pdf`、`cv-de.pdf`、`cv-zh.pdf`。只有存在的语言才会显示 “Download CV” 按钮。

**公开版简历不要包含住址、电话和出生日期。**

## Impressum 和 Datenschutz

内容在 `legal.js`。只要某个页面里还有 `TODO`，它就不会发布，页脚也不会显示链接。全部填写完成后，下一次发布时它们会自动出现在 `/impressum/` 和 `/datenschutz/`，并加入 sitemap。

## 部署

推送到 `main` 分支后，`.github/workflows/pages.yml` 会自动：

1. 运行 `node build.mjs` 生成 `dist/`；
2. 把 `dist/` 发布到 GitHub Pages。

仓库设置中 **Settings → Pages → Source** 必须是 **GitHub Actions**。部署进度可以在仓库的 **Actions** 标签页查看。
