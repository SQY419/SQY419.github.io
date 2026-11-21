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
