# eval

```text
eval(expr, var=value)
```

把变量代成数值后直接求值，用来快速验证一个式子在某个点的结果。

## 示例

```text
eval(x^2 + 2*x + 1, x=3)
```

```text
eval((x+1)^10, x=2)
```

## 行为细节

- 嵌套的 `eval` 会产生浮点节点（`K.Float`），它参与普通算术，但不再保持精确有理数。
- 需要保留符号结构时用 [`subst`](subst.md)；需要小数近似时用 [`approx`](approx.md)。
- 实测 `eval(x^2+2*x+1, x=3)` 约 3–4 ms，`eval((x+1)^10, x=2)` 约 3 ms。

## 相关

[`subst`](subst.md) · [`approx`](approx.md)
