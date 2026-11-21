# sqrt

```text
sqrt(x)
```

精确平方根：能开出有理数就开出，否则提取平方因子写成 `系数 * sqrt(剩余)`。

## 示例

```text
sqrt(8)
> 2*sqrt(2)

sqrt(9)
> 3

sqrt(0)
> 0

sqrt(8/9)
> 2/3*sqrt(2)

sqrt(x)^3
> sqrt(x)*x

sqrt(x)^4
> x^2
```

## 行为细节

- 分子、分母分别提取最大平方因子：`sqrt(n/d) = (k/m) * sqrt((n/k²)/(d/m²))`。
- 数字超过 `MAX_SQRT = 1,000,000` 时跳过化简，原样保留 `sqrt(...)`。
- `sqrt(u)^2 -> u` 由规则引擎处理，因此 `sqrt(8)*sqrt(2) -> 4`。
- 对容器逐元素映射：`sqrt([1,4,9]) -> [1, 2, 3]`。

## 相关

[`expand`](expand.md) · [`abs`](abs.md) · [`approx`](approx.md)
