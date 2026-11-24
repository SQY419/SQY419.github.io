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

- 同类项按基的 `sig` 合并，系数用精确有理数相加，系数为 0 的项直接丢弃。
- 规则引擎只在 `sig` 变化时继续下一轮，最多 8 轮。

## 相关

[`expand`](expand.md) · [`subst`](subst.md) · [`approx`](approx.md)
