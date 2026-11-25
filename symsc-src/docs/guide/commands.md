# 命令

!!! tip "oo 与 Infinity"
    `oo` 与 `Infinity` 是等价的。一般情况下，`Infinity` 会自动变成 `oo`。

直接输入表达式即可，例如下面：

```text
1+1
> 2

1/0
> oo

1+1/x-(x+1)/x
> 0
```

## 命令

命令是函数式的。

```text
simplify(expr)              
expand(expr)          
factor(expr)
solve(eq, var)              
solve({eqs}, {vars})
diff(expr[, var[, n]])      
integrate(expr[, var])
subst(expr, var=expr)       
eval(expr, var=value)
approx(expr)
...
```

函数可以嵌套。

## 隐式乘法

两个词挨着写会自动补乘号：

```text
3x            -> 3*x
2pi           -> 2*pi
2(x+1)        -> 2*(x + 1)
(2+x)(3+x)    -> (x + 2)*(x + 3)
sin(x)cos(x)  -> sin(x)*cos(x)
```

`x(y)` 按函数调用解析，不会补乘号。

## `%` 与 `mod`

`%` 的优先级和 `*`、`/` 相同，`mod(a,b)` 等价：

```text
10%3            -> 1
mod(10,3)       -> 1
10%3+1          -> 2
mod(-10,3)      -> 2
```

## 默认化简

每个输入先解析成节点树，再做化简、规则匹配和结构重写；结果最后送入终端。

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
