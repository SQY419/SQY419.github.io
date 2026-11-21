# 命令与表达式

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
simplify(expr)          expand(expr)
diff(expr[, var])       subst(expr, var=expr)
eval(expr, var=value)   approx(expr)
gcd(a, b)               lcm(a, b)
series(expr, x=a, n)    limit(expr, x, a)
```

每个命令的详细说明见 [函数参考](../reference/functions/index.md)。

!!! tip "`limit` 的无穷远"
    `limit(expr, x, a)` 里 `a` 可以是 `oo` / `infinity`，此时走渐进展开式比较。

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
