# symSC 文档

用 MkDocs + Material 构建的 [symSC](https://github.com/SQY419/symSC) 文档，产物输出到仓库根的 `symsc/`：

```text
https://sqy.axolotlpower.com/symsc/
```

## 目录约定

| 路径 | 作用 |
| --- | --- |
| `docs/` | Markdown 源文件（只改这里） |
| `mkdocs.yml` | 站点配置、导航、主题、扩展 |
| `docs/reference/functions/` | 每个内建函数一页 |
| `docs/stylesheets/extra.css` | 字体、卡片、表格样式 |
| `docs/symSC.html` | 在线版单文件计算器，构建后发布到 `/symsc/symSC.html` |
| `docs/javascripts/online-button.js` | 页头「在线版」按钮（运行时插入，不依赖模板） |
| `../symsc/` | 构建产物，**不要手改**，随源码一起提交 |

## 自动构建（推荐）

在 GitHub 网页上改完 `symsc-src/**` 里的任何文件（包括新建 `.md`）并提交到 `main`，
`.github/workflows/docs.yml` 会自动：

1. `pip install mkdocs-material==9.8.2`
2. `mkdocs build -f symsc-src/mkdocs.yml --strict`（输出到 `symsc/`）
3. 有变化就提交 `docs: 自动构建 <时间>` 回到 `main`，GitHub Pages 随即重建

所以**不需要在本地装环境，也不用改 `symsc/`**。

新建的 Markdown 即使没写进 `nav` 也会被 `hooks/auto_nav.py` 收到「未归类」下，
不会因为 `--strict` 的「页面不在导航中」警告而构建失败；想放置到指定位置，
还是建议在 `mkdocs.yml` 的 `nav:` 里加一行。

## 在线版（单文件计算器）

`docs/symSC.html` 是 TurboWarp packager 打出来的单文件计算器，构建时原样复制到
`symsc/symSC.html`，线上地址：

```text
https://sqy.axolotlpower.com/symsc/symSC.html
```

页头右上角的「▶ 在线版」按钮（`docs/javascripts/online-button.js` 运行时注入）、
首页和「快速开始」页的按钮、侧栏的「在线版 ↗」都指向它。**换版本不用改任何链接**：

1. 用新的 `symSC.html` 覆盖 `symsc-src/docs/symSC.html`，文件名保持不变；
2. 提交到 `main`，workflow 自动构建，`symsc/symSC.html` 就换新了。

> 不要把手写的 HTML 直接放进 `symsc/`：那是构建产物，`mkdocs build` 每次都会先清空整个目录。

## 本地预览 / 构建

```bash
cd symsc-src
mkdocs serve      # http://127.0.0.1:8000/symsc/
./build.sh        # 等价于 mkdocs build --strict
```

## 新增一个函数页

1. 在 `docs/reference/functions/` 下按现有模板新建 `.md`（签名 → 示例 → 行为细节 → 相关）；
2. 在 `mkdocs.yml` 的 `nav:` 里挂到对应分组；
3. 回到 `docs/reference/functions/index.md` 的表格里加一行；
4. `./build.sh`。

## 内容来源

正文按仓库的 `README.md`、`NOTES.md`、`DESIGN.md`、`PERFORMANCE.md` 整理；
示例中的 `>` 是终端实际输出，没有 `>` 的只是用法示意。
