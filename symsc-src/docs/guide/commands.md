# 命令与表达式

!!! tip "oo 与 Infinity"
    `oo` 与 `Infinity` 是等价的。一般情况下，`Infinity` 会自动变成 `oo`。

## 裸表达式

不需要包一层命令，直接写式子就会解析、化简并打印：

```text
1+1
> 2

1/0
> oo

1+1/x-(x+1)/x
> 0
```

## 函数式命令

```text
simplify(expr)              expand(expr)          factor(expr)
solve(eq, var)              solve({eqs}, {vars})
diff(expr[, var[, n]])      integrate(expr[, var])
subst(expr, var=expr)       eval(expr, var=value)  approx(expr)
limit(expr, x, a)           series(expr, x=a, n)
sum(expr, var, a, b)        prod(expr, var, a, b)
gcd(a, b)                   lcm(a, b)
lsolve(augmented_matrix)
isprime(n)                  ifactor(n)
perm(n, k)                  comb(n, k)              powmod(a, b, m)
mod(a, b)                   hold(expr)
```

命令可以嵌套，内层先求值。

每个命令的详细说明见 [函数参考](../reference/functions/index.md)。

!!! tip "`limit` 的无穷远"
    `limit(expr, x, a)` 里 `a` 可以是 `oo` / `infinity`，此时走渐进展开式比较。

## 隐式乘法

两个 token 挨着写会自动补乘号：

```text
3x            -> 3*x
2pi           -> 2*pi
2(x+1)        -> 2*(x + 1)
(2+x)(3+x)    -> (x + 2)*(x + 3)
sin(x)cos(x)  -> sin(x)*cos(x)
```

`x(y)` 仍按函数调用解析，不会补乘号。

## `%` 与 `mod`

`%` 的优先级和 `*`、`/` 相同，`mod(a,b)` 等价：

```text
10%3            -> 1
mod(10,3)       -> 1
10%3+1          -> 2
mod(-10,3)      -> 2
```

符号情形也会化简：`x%x -> 0`。

## 三角倒数

`csc` / `sec` / `cot` 在解析时直接重写成 `1/sin`、`1/cos`、`cos/sin`，
因此求导、近似、打印都能直接用。

## 化简是默认行为

每个输入先解析成节点树，再做化简、规则匹配和结构重写；结果最后送入终端。
解析阶段就调用智能构造器，所以树里不会出现未化简的 `0+x`、`1*x`、`x^1`。

分式相加会自动通分，并在分子中做多项式合并：

```text
1+1/x              -> (x + 1)/x
1/x+1/y            -> (x + y)/(x*y)
x/y+z/y            -> (x + z)/y
1+1/x-(x+1)/x      -> 0
```

`expand` 才做分配律，`(x+1)*(x-1)` 默认保持乘积。

## 比较运算

```text
1<2       -> True
2<1       -> False
1==1      -> True
1==2      -> False
x<2       -> x < 2
x==x      -> True
sqrt(2)<sqrt(3) -> True
```

无法直接判断时保留比较式，例如 `x < 2`。

## 报错

```text
1+
> Error: Missing operator number @ func 'tokenizer'

[1,2,3][0]
> Error: Index out of range @ func 'index'
```

错误信息会带上出错的内部函数名，方便定位。
