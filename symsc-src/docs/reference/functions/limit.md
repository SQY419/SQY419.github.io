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
```

## 行为细节

- **有限点**：洛必达法则 / 级数展开。
- **无穷远**：Gruntz 风格的 leading-term 比较。
- 完整 Gruntz mrv（`exp`/`log` 混合的极限）尚未实现，见 [已知限制](../../limits.md)。

## 相关

[`series`](series.md) · [`diff`](diff.md)
