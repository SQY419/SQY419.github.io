# 构建

需要 [GoboScript](https://github.com/aspizu/goboscript) 编译器。

```bash
# 在仓库根目录
GOBOSCRIPT=/path/to/goboscript ./tests/build.sh
```

产物是 `cas.sb3`；仓库另附可直接运行的 `cas-fixed.sb3`。

## 源码地图

| 文件 | 内容 |
| --- | --- |
| `lib/arena.gs` | 节点 arena |
| `lib/lex.gs`、`lib/parse.gs` | 词法与解析 |
| `lib/print.gs` | 打印 |
| `lib/rules.gs` | 化简规则 |
| `lib/diff.gs` | 求导 |
| `tests/build.sh` | 构建脚本 |

改完记得跑一遍基准，确认没有明显退化，参考 [性能实测](performance.md)。

## 文档构建

本文档用 MkDocs + Material，源码在仓库的 `symsc-src/`：

```bash
cd symsc-src
./build.sh     # 输出到 ../symsc/
mkdocs serve   # 本地预览
```
