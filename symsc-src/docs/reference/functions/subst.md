# subst

```text
subst(expr, var=expr)
```

符号代入：把 `var` 替换成给定表达式，替换后仍保持符号形式。

## 示例

```text
subst(x^2, x=(a+1))
> (a + 1)^2

subst(x^2 + 2*x + 1, x=3)
> 16

simplify(subst(x^2, x=(a+1)))
> (a + 1)^2

diff(subst(x^2, x=(a+1)), a)
> 2*(a + 1)
```

## 行为细节

- 第二个参数写成 `var=expr`，右边可以是有理数、符号表达式或另一个变量。
- 代入后走智能构造器，因此 `subst(x^2, x=3)` 直接得到 `9` 而不是 `3^2` 的未化简形式。
- 想要数值结果可以直接用 [`eval`](eval.md)。

## 相关

[`simplify`](simplify.md) · [`eval`](eval.md)
