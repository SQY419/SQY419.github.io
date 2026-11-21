# series

```text
series(expr, x=a, n)
```

在展开点`a`附近做展开，保留 `n` 阶。

无穷原点使用渐进展开；有限点使用 Taylor 级数。

## 示例

```text
series(1/(e^(-x)+1), x=oo, 5)
> -e^(-x) - e^(-3*x) - e^(-5*x) + e^(-2*x) + e^(-4*x) + 1
```

## 行为细节

- 展开点写在第二个参数里，`x=oo` 表示无穷远点展开。
- 与 [`limit`](limit.md) 共用无穷远的 leading-term 机制。

## 相关

[`limit`](limit.md) · [`expand`](expand.md)
