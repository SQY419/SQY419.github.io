# series

```text
series(expr, x=a, n)
```

在展开点附近做渐进展开，保留 `n` 阶。

## 示例

```text
series(1/(e^(-x)+1), x=oo, 5)
> -e^(-x) - e^(-3*x) - e^(-5*x) + e^(-2*x) + e^(-4*x) + 1
```

## 行为细节

- 展开点写在第二个参数里，`x=oo` 表示无穷远点展开（多用于渐近分析）。
- 与 [`limit`](limit.md) 共用无穷远的 leading-term 机制。
- `n` 是保留的阶数，阶数越高项数越多，也越慢。

## 相关

[`limit`](limit.md) · [`expand`](expand.md)
