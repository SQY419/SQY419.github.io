# diff

```text
diff(expr[, var])
```

对 `expr` 求导，省略 `var` 时默认对 `x` 求导。

## 示例

```text
diff(sin(x^2))
> 2*cos(x^2)*x

diff(5^x)
> ln(5)*5^x

diff(x^x)
> ln(x)*x^x + x^x

diff(x^2.5)
> 5/2*x^(3/2)

diff(x^x, x)
> x^x + ln(x)*x^x

diff(sqrt(x)^4)
> 2*x
```

## 求导规则

| 节点 | 结果 |
| --- | --- |
| 数字 / 常量 | `0` |
| 变量 | 匹配求导变量时为 `1`，否则 `0` |
| `Add` | 逐项相加 |
| `Mul` | 乘积法则 |
| `Pow(base, n)` | `n * base^(n-1) * base'` |
| `PowE(base, exp)` | 指数含变量时 `base^exp * (exp' * ln(base) + exp * base'/base)` |
| `sin` / `cos` / `tan` | `cos` / `-sin` / `1/cos^2`（链式法则） |
| `exp` / `ln` / `log` | `exp` / `1/u` / `1/(u*ln(10))` |
| `sqrt` | `1/(2*sqrt(u))` |

## 行为细节

- 后序遍历，导数按节点 ID 缓存，共享子树不会重复计算。
- `PowE` 有两种情况：指数是数字常量时按幂函数求导（例如 `x^2.5`），指数含变量时走 `base^exp` 公式（例如 `5^x`、`x^x`）。
- 求导结果同样经过规范构造器，会自动合并同类项。

## 相关

[`limit`](limit.md) · [`simplify`](simplify.md)
