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
