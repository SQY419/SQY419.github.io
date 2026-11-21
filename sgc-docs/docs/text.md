# 文本

## 普通文本

```text
text:<内容>,x,y,size,type
```

`type = 0` 表示字号随缩放变化，`1` 表示不随缩放变化。

```text
text:"你好SGC!",0,0,1,0
```

## 高级文本

高级文本用于几何对象的标签，支持可嵌套的转义符：

| 转义 | 效果 |
| --- | --- |
| `/r … /-r` | 正体（regular） |
| `/b … /-b` | 加粗 |
| `/s3 … /-s3` | 放大 3 倍（1–9、a–f 对应 10–15 倍） |
| `/u … /-u` | 下划线 |
| `/su` | 上标 |
| `/sd` | 下标 |

例如显示 H₂O：`/rH/sd2/-sdO/-r`。转义符可以嵌套。

## STeX

SGC 内置 FastSTeX v1.2 终端，能渲染一部分 LaTeX 公式，并缓存编译结果。

```text
latex:<latex>,x,y,size,0
text:<latex>,x,y,size,t
```

`x`、`y`、`size` 都可以是表达式，所以公式可以“动”：

```text
latex:"\frac{1}{"&a&"}="&1/a,0,0,0.6
```

拖动滑动条时公式会实时刷新。

### 括号自动适配

STeX 不需要 `\left` `\right`，匹配的括号会自动长到合适高度：

```text
(x+\frac{1}{x})
```

也支持隐式补全：`\sqrt{(1+\frac{1}{x}}` 会自己补上右括号。

### 常用命令

| 命令 | 说明 |
| --- | --- |
| `\Rightarrow` `\rightarrow` `\longeq` | ⇒ → == |
| `{ }` `[ ]` `\|` | 括号 / 绝对值（无需 `\left`） |
| `\int` `\sum` `\prod` `\partial` `\infty` | 积分、求和、连乘、偏导、无穷 |
| `\pi` `\+空格` | π、空格 |
| `\mathrm` | 正体 |
| `\lfloor` `\rfloor` `\lceil` `\rceil` | 取整符号 |
| `\frac{a}{b}` `\sqrt{a}` `\sqrt[k]{x}` | 分式、根式 |
| `\overset{v}{u}` `\underset{v}{u}` | 上下标装饰 |
| `a^{b}` `a_{b}` `a^{x}_{y}` | 上下标 |
| `\overrightarrow{AB}` `\overline{x}` | 向量、上划线 |

例：$\dfrac{\partial x^x}{\partial x}=x^x(1+\ln x)$ 用 STeX 写就是

```text
\frac{\partial x^x}{\partial x}=x^{x}(1+\ln x)
```
