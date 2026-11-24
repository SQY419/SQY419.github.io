# 求和与连乘

对应函数：`sum`、`prod`。

## sum / prod 

1. **快速项求值**：通项是有理函数时，用 `sum_fast_eval` 在整数 `k` 上直接算精确有理数，跳过 `subst_expr`/规则化简/`exact_fold`，失败才回退原路径。
2. 有理数累加约分放最后。

## 符号求和

**边界**数值上下界按大小交换。

符号上下界按 $b \leq e$。非多项式通项在符号上下界下报 符号求和只支持多项式。

1. `lang/sum.sl`层：把通项看成关于求和变量的多项式，用 Faulhaber 公式组合 $\sum_{k=1}^{n} k^p$，得到 $\sum_{x=b}^{e} f(x) = S(e) - S(b-1)$。
2. **原生层**（`lib/symsum.gs`）：`sym_prep` 复用多项式后端，把通项展开成关于 $x$ 的系数；其他变量作为符号系数；`sym_bern_init` 用有理数递推生成 Bernoulli 数；`sym_faul_coef(p,j)` 给出 $n^{p+1-j}$ 的系数；`sym_simp` 负责展开/化简闭式。
3. **接入**：`sum_range` 先调 `symsum_try`，成功用闭式，失败回落到数值循环。数值多项式区间也走闭式。

## 指数 / 几何求和

`sum` 的 DSL 先按加法拆项，多项式项走 Faulhaber / Bernoulli；$c r^x$ 项走几何级数 $c \frac{r^{e+1}-r^b}{r-1}$；

$r=1$ 退化为 $c (e-b+1)$；数值底数、整数上下界用大整数幂。

支持下面这些：
```
sum(2^x,x,a,b)
sum(3*2^x,x,0,5)
sum(2^x+x^2,x,1,n)
sum(a^x,x,0,n)
```

还支持 $P(x) r^x (\deg P \leq 2)$。$\sum_{k=0}^{n} r^k$、$k r^k$、$k^2 r^k$ 用显式公式，例如：
```
sum(x*2^x,x,0,n)
> -(n+1)*2^(n+1)+n*2^(n+2)+2
```

数值大区间退回精确数值循环。
 
