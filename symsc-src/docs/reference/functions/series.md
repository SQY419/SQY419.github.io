# series

```text
series(expr, x=a, n)
```

在展开点 `a` 附近展开，保留 `n` 阶（`0..64`）。

## 示例

```text
series(1/(e^(-x)+1), x=oo, 5)
> -e^(-x) - e^(-3*x) - e^(-5*x) + e^(-2*x) + e^(-4*x) + 1

series(x^2*e^x, x=0, 20)
```

## 行为细节

- **有限点**：Taylor 级数；阶乘用十进制字符串计算并在系数里约分，
  20 阶以上的大分母可以精确显示。
- **无穷远**：渐进展开，分别处理 `e^(-x)` 型重写和 `x → 1/t` 代换。
- 高层算法在 `lang/series.sl`（DSL），AST 重写留在 `lib/series.gs`。
- `e^0` 会被直接消成 `1`，结果里不会出现 `e^0` 因子。
- 阶数超出范围会提示 `0..64`。

## 相关

[`limit`](limit.md) · [`diff`](diff.md) · [`expand`](expand.md)
