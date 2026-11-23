# expand

```text
expand(expr)
```

展开括号与整数幂。

## 示例

```text
expand((x+1)^3)
> x^3 + 3*x^2 + 3*x + 1

expand((x+1)^10)
> x^10 + 10*x^9 + ... + 1

expand((x+y)^10)
> x^10 + 10*x^9*y + ... + y^10
```

## 行为细节

- 更深的多元展开可能触及节点上限，会明确报错。

## 相关

[`simplify`](simplify.md) · [`subst`](subst.md)
