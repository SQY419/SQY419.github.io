# 求和与级数

## 23. sum / prod 性能

区间版本做了三层优化：

1. **快速项求值**：通项是有理函数（`Num` / `Var` / `Add` / `Mul` / 整数指数 `Pow`）时，
   用 `sum_fast_eval` 在整数 `k` 上直接算精确有理数，跳过 `subst_expr` / 规则化简 / `exact_fold`，
   失败才回退原路径。
2. **等差数列捷径**：`sum(x, x, b, e)` 直接用 `(b+e)(e-b+1)/2`，O(1)。
3. **有理数累加**：小范围用安全整数 `rat_add` / `rat_mul`，溢出后切十进制大整数；
   求和用**分母 LCM** 合并，避免分母乘积膨胀，约分统一放到最后（`br_finalize`）。

效果：`sum(1/x^2,x,1,25)` 从约 13 秒降到约 1.8 秒（同一 scratch-vm 环境），595/595 回归通过。

## 24. 符号求和

1. **DSL**（`lang/sum.sl`）：把通项看成关于求和变量的多项式，用 Faulhaber 公式
   组合 `sum_{k=1}^{n} k^p`，得到 `sum_{x=b}^{e} f(x) = S(e) - S(b-1)`。
2. **原生层**（`lib/symsum.gs`）：
   - `sym_prep` 复用多项式后端，把通项展开成关于 `x` 的系数；其他变量作为符号系数；
   - `sym_bern_init` 用有理数递推生成 Bernoulli 数（到 16 次）；
   - `sym_faul_coef(p,j)` 给出 `n^(p+1-j)` 的系数；
   - `sym_simp` 负责展开/化简闭式。
3. **接入**：`sum_range` 先调 `symsum_try`，成功用闭式，失败回落到数值循环。
   数值多项式区间也走闭式，`sum(x^2,x,1,100000)` 不再逐项算。
4. **边界**：数值上下界按大小交换（保持「10 到 0 也求和 1..10」）；符号上下界按 `b <= e`。
   非多项式通项在符号上下界下报「符号求和只支持多项式」。

数值整数上下界不逐项循环：`symsum_try` 先走原生大整数 Faulhaber，幂超过安全整数时用
十进制大整数累加，`100000^6` 不会溢出。负上下界退回普通数值循环，超过 10000 项报范围过大。

## 28. 指数 / 几何求和

`sum` 的 DSL 先按加法拆项：

- 多项式项走 Faulhaber / Bernoulli；
- `c*r^x` 项走几何级数 `c*(r^(e+1)-r^b)/(r-1)`；`r=1` 退化为 `c*(e-b+1)`；
- 数值底数 / 整数上下界用大整数幂；
- 只对含求和变量的表达式做 `sym_simp`，纯数值结果直接返回，避免大整数被通用分式化简破坏。

支持 `sum(2^x,x,a,b)`、`sum(2^x,x,0,n)`、`sum(3*2^x,x,0,5)`、`sum(2^x+x^2,x,1,n)`、`sum(a^x,x,0,n)`。

进一步支持 `P(x)*r^x`（`deg P ≤ 2`）：`sum_{k=0}^{n} r^k`、`k r^k`、`k^2 r^k` 用显式公式，
例如 `sum(x*2^x,x,0,n) = -(n+1)2^(n+1)+n*2^(n+2)+2`。数值大区间退回精确数值循环。

## 34. series 搬入 DSL

`series` 的高层算法在 `lang/series.sl`，通过 `vm_series` 运行：

- `taylor`：有限点 Taylor 循环，调用 native `series_diff` / `series_at`；
- `series_at_inf`：无穷远展开，分别处理 `e^(-x)` 型重写与 `x → 1/t` 代换；
- 结构重写 `series_exp_rewrite` / `series_has_exp` / `series_eval_value` 仍在 `lib/series.gs`，
  因为它们需要 AST 节点映射表。

旧 native `series_build` / `series_inf` / `series_dispatch` 已删除，`api.gs` 改调 `vm_series`。
series 相关过程从 710 块降到 591 块。
