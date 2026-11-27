# collect

```
collect(expr, var)
```
按变量收集表达式，合并同类项。
collect可合并默认不会合并的系数。

## 示例
```
collect(a*x+b*x, x)
> (a+b) * x
```

分式也会把变量提取出来。

```
collect((a*b*x+2)/a, x)
> b*x + 2/a
```
