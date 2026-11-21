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

遵循数学规则，没啥说的。可查询自动微分法。

## 行为细节

- 后序遍历，导数按节点 ID 缓存，共享子树不会重复计算。
- 求导结果同样经过规范构造器，自动简化。

## 相关

[`limit`](limit.md) · [`simplify`](simplify.md)
