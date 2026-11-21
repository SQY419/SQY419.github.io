# prod

```text
prod(expr, var, a, b)     区间连乘
prod(container)           容器连乘
```

## 示例

```text
prod(x,x,1,5)
> 120

prod({2,3,4})
> 24
```

## 行为细节

- 与 [`sum`](sum.md) 对称：区间上下界必须是整数，容器形式递归连乘。
- 结果同样走精确有理数/大整数路径。

## 相关

[`sum`](sum.md)
