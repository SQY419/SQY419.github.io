# 写作指南

这一页同时是「怎么用」和「能长什么样」的示例。

## 图片

把图片放进 `docs/assets/`，用相对路径引用：

```markdown
![终端截图](assets/terminal.png)
```

需要控制尺寸、对齐，用 `attr_list`（已启用）：

```markdown
![终端截图](assets/terminal.png){ width="420" }
![终端截图](assets/terminal.png){ width="320" align=right }
```

Material 还支持按配色切换图片（浅色 / 深色各一张）：

```markdown
![浅色](assets/shot-light.png#only-light)
![深色](assets/shot-dark.png#only-dark)
```

!!! tip "路径规则"
    路径是**相对当前 `.md` 文件**的。放在 `guide/`、`reference/functions/` 里的页面要写 `../assets/xxx.png`、`../../assets/xxx.png`。
    文件名里避免 `_`（会被当成斜体）和空格，用小写加连字符。

## LaTeX

行内公式用 `$...$`：

```markdown
求导结果 $\frac{d}{dx}x^x = x^x(\ln x + 1)$ 保持精确。
```

渲染效果：求导结果 $\frac{d}{dx}x^x = x^x(\ln x + 1)$ 保持精确。

独立公式用 `$$...$$`，**前后各留一个空行**：

```markdown
$$
\sqrt{\frac{8}{9}} = \frac{2}{3}\sqrt{2}
$$
```

$$
\sqrt{\frac{8}{9}} = \frac{2}{3}\sqrt{2}
$$

多行推导用 `aligned`：

```markdown
$$
\begin{aligned}
(x+1)^3 &= (x+1)(x^2+2x+1) \\
        &= x^3+3x^2+3x+1
\end{aligned}
$$
```

$$
\begin{aligned}
(x+1)^3 &= (x+1)(x^2+2x+1) \\
        &= x^3+3x^2+3x+1
\end{aligned}
$$

矩阵、极限、求和都能写：

$$
\det\begin{pmatrix}1&2\\3&4\end{pmatrix} = -2, \qquad
\lim_{x\to\infty}\frac{\sqrt{1+x^2}}{x}=1, \qquad
\sum_{k=1}^{n} k = \frac{n(n+1)}{2}
$$

!!! warning "不要用 `\( \)` 和 `\[ \]`"
    正文里直接写 `$...$` / `$$...$$` 就行。`arithmatex` 会负责把它们包成 MathJax 认识的格式；
    如果在 Markdown 里手写 `\(`，反斜杠会被当成转义。

!!! note "公式不显示？"
    MathJax 已随站点本地打包（`javascripts/mathjax/tex-svg.js`），不依赖 CDN。
    如果公式显示成原始文本，检查：① `$$` 前后是否有空行；② `mkdocs.yml` 里 `pymdownx.arithmatex` 是否还是 `generic: true`。

## 代码块

带语言标注会高亮，右上角有复制按钮：

```text
simplify(2*x + 3*x - x)
> 4*x
```

终端输入输出建议用 ```text```，避免被当成某种语言高亮。

## 提示框

```markdown
!!! note "标题"
    内容缩进四个空格。

!!! warning
    没有标题也行。
```

!!! example "效果"
    这是 `!!! example`。

支持 `note` / `tip` / `warning` / `danger` / `example` / `quote` / `details`。

## 表格与列表

| 写法 | 效果 |
| --- | --- |
| `**粗体**` | **粗体** |
| `` `行内代码` `` | `行内代码` |
| `[文字](https://example.com)` | [文字](https://example.com) |
| `++ctrl+s++` | ++ctrl+s++ |

## 链接到其它页面

写相对的 `.md` 路径，构建时会自动转成正确 URL：

```markdown
见 [函数参考](../reference/functions/index.md) 和 [内核设计](../design.md)。
```

见 [函数参考](../reference/functions/index.md) 和 [内核设计](../design.md)。

构建用 `--strict`，链接写错会直接失败，不会静默上线。

## 在线版计算器

`symSC.html` 是打包好的单文件应用，作为普通静态文件放在 `docs/symSC.html`（不是 `.md`），
构建时原样复制成 `symsc/symSC.html`。它不属于 Markdown 页面，不用写进 `nav`。

更新版本时用同名文件覆盖再提交即可——页头按钮、首页按钮和侧栏入口都指向这同一个地址，
不需要改链接：

```text
docs/symSC.html  →  /symsc/symSC.html
```
