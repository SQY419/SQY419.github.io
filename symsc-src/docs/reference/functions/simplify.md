# simplify

```text
simplify(expr)
```

对表达式做代数化简：合并同类项、约分、应用化简规则，直到结构不再变化。

## 示例

```text
simplify(2*x + 3*x - x)
> 4*x

simplify(x+2*x)
> 3*x

simplify(sin(x+y)^2 + cos(y+x)^2)
> 1

simplify((x^3+y^3)/(x^5+y^5))
> (x^2 - x*y + y^2)/(x^4 - ... + y^4)
```

## 行为细节

- 表达式在解析时就经过规范构造器，`0+x`、`1*x`、`x^1` 不会出现在树里。
- 同类项按基的 `sig` 合并，系数用精确有理数相加，系数为 0 的项直接丢弃。
- `sin(u)^2 + cos(u)^2` 有专门的 Pythagorean pass，参数 `sig` 相同才合并。
- 规则引擎只在 `sig` 变化时继续下一轮，最多 8 轮。
- **不做分配律**，`(x+1)*(x-1)` 保持乘积；要展开请用 [`expand`](expand.md)。

## 相关

[`expand`](expand.md) · [`subst`](subst.md) · [`approx`](approx.md)
