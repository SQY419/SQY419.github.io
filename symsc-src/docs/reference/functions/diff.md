# diff

```text
diff(expr)              对 x 求一阶导
diff(expr, var)         对 var 求导
diff(expr, var, n)      n 阶导
diff(expr, var=a)       先求导再代入 a
diff(expr, var=a, n)    先求 n 阶导再在 a 处求值
```

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

diff(x^3, x, 2)
> 6*x

diff(x^2, x=2)
> 4

diff(1/x)
> -1/x^2

diff(x^20, x, 20)
> 2432902008176640000
```

## 求导规则

自动微分法。

## 行为细节

- 后序遍历，导数按节点 ID 缓存，共享子树不会重复计算。
- 高阶导数最多 **1024 阶**；`n = 0` 返回原式。
- 对 `P(x)*e^x` 的高阶导用 Leibniz 公式 `e^x * Σ C(n,k) P^(k)(x)`，
  避免逐步求导耗尽节点表，例如下面式子：
  ```
  diff(x^2*e^x, x, 256) = (x^2 + 512*x + 65280)*e^x
  ```
- 求导结果同样经过规范构造器，自动合并同类项。

## 相关

[`limit`](limit.md) · [`series`](series.md) · [`integrate`](integrate.md)
