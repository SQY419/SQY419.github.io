# sqrt

```text
sqrt(x)
```

平方根。

能开出有理数就开出，否则提取平方因子写成 `系数 * sqrt(剩余)`；遇到 `sqrt(A + B*sqrt(D))` 会尝试去嵌套。

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

去嵌套：

```text
sqrt(4-2*sqrt(3)) -> sqrt(3) - 1
sqrt(2-sqrt(3))   -> -1/2*sqrt(2) + 1/2*sqrt(6)
sqrt(7+4*sqrt(3)) -> sqrt(3) + 2
sqrt(3+2*sqrt(2)) -> sqrt(2) + 1
```

## 行为细节

- 分子、分母分别提取最大平方因子：`sqrt(n/d) = (k/m) * sqrt((n/k²)/(d/m²))`。
- 数字超过 `MAX_SQRT = 1,000,000` 时跳过化简，原样保留 `sqrt(...)`。
- 去嵌套：拆出 `A` 与 `B*sqrt(D)`，要求 `A² - B²D` 是非负完全平方，
  再构造 `sqrt(u) ± sqrt(v)`；`B<0` 时交换两项保证取正根，只支持拆这一种嵌套。
- 对容器逐元素映射：`sqrt([1,4,9]) -> [1, 2, 3]`。

## 相关

[`expand`](expand.md) · [`abs`](abs.md) · [`approx`](approx.md)
