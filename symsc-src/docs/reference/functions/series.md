# series

```text
series(expr, x=a, n)
```

在展开点 `a` 附近展开，保留 `n` 阶，最高64阶。

## 示例

```text
series(1/(e^(-x)+1), x=oo, 5)
> -e^(-x) - e^(-3*x) - e^(-5*x) + e^(-2*x) + e^(-4*x) + 1

series(x^2*e^x, x=0, 20)
```

## 行为细节

- **有限点**：Taylor 级数。
- **无穷远**：渐进展开，分别处理 $e^{-x}$ 型重写和 $x → \frac{1}{t}$ 代换。

## 相关

[`limit`](limit.md) · [`diff`](diff.md) · [`expand`](expand.md)
