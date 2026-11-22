# limit

```text
limit(expr, x, a)
```

求 `x → a` 时的极限。`a` 可以是有限点，也可以是 `oo` / `infinity`。

## 示例

```text
limit(sqrt(1+x^2)/x, x, oo)
> 1

limit(1/x, x, oo)
> 0

limit((1+2/x)^x, x, oo)
> e^2

limit((x^2-x+1)/(x-1)^2, x, 1)
> oo

limit(1/ln(1+x)-1/x, x, 0)
> 1/2
```

## 处理的类型

- **有限点**：洛必达 / 级数；分母趋于 0 而分子非 0 时，用逐次求导确定零点阶数。
- **无穷远**：Gruntz 风格的 leading-term 比较。
- **`1^∞`**：先求 `lim f = 1`，再用 `u = f-1` 化到 `exp(lim g*u)`。
- **`0·∞` / 三角**：`atan` 在 `+∞` 重写为 `pi/2 - 1/x`；有限点的 `tan` 拆成
  `sin/cos`，交给已有的 0/0 路径。
- **分式**：极限前先 `expand` / 合并分式，`1/ln(1+x) - 1/x` 合并后用洛必达。

## 输出与报错

- 结果用 `e^L` 形式输出，避免 `exp(2)` 与 `e^2` 不一致。
- 偶数阶极点返回 `±oo`；奇数阶报「两侧不同」。
- 完整 Gruntz mrv（`exp` / `log` 混合）尚未实现。

## 嵌套

`limit` 可以出现在其它命令里，例如 `simplify(limit(1/x, x, oo))`。

## 相关

[`series`](series.md) · [`diff`](diff.md)
