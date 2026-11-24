# 微积分

对应函数：`diff`、`integrate`、`limit`、`series`。

## 简易符号积分

`integrate(expr[, var])` 的算法在 `lang/integrate.sl`，原生层 `lib/integrate.gs` 只提供线性分解与函数构造：

- 线性拆分；幂函数 $x^n \to \frac{x^{n+1}}{n+1}$，$n=-1 → \ln(\left| x \right|)$；
- 线性换元 $u = ax+b$ 统一除以 $a$，覆盖幂、`sin/cos/tan/exp/ln/sqrt`；
- 积分表
- 多项式乘积先 `expand` 再逐项积分。

## 极限

- **极点**：分母趋 0 而分子非 0 时，逐次求导确定零点阶数；偶数阶给 `±oo`，奇数阶报两侧不同。`(x^2-x+1)/(x-1)^2 → oo`。
- **1^∞**：先求 $\lim f = 1$，再用 $u = f-1$ 化到 $\exp(lim g\cdot u)$；$\left(1+\frac{2}{x}\right)^x$、`\left(\frac{2x+3}{2x+1}\right)^{x+1}`、`\left(\frac{a^x+b^x+c^x}{3}\right)^{\frac{1}{x}}` 走这条路径。
- **分式合并**：极限先化简、合并，例如$\frac{1}{\ln(1+x)}-\frac{1}{x}$` 合并后洛必达得 $\frac{1}{2}$。

## 对数换元

- 识别 $\int g'(x) \cdot \ln(g(x)) \mathrm{d}x = g \ln g - g$，例如 $\int \ln(\ln x)/x \mathrm{d}x = \ln x \cdot \ln \ln x - \ln x$；

## 有理函数积分

### 第一层：单个线性因子幂

- $\int \frac{A*x+B}{a*x+b}^n \mathrm{d}x$ 拆成 $\frac{A/a}{(a*x+b)^{n-1}} + \frac{B - A*b/a}{(a*x+b)^n}$ 再用幂函数积分，例如 $\frac{x}{(1-x)^3}$、$\frac{x}{(2x+1)^3}$、$\frac{x}{1-x}$。

### 互异线性因子部分分式

分母分解为互异一次因子时，按 $A_i = \frac{P(r_i)}{Q'(r_i)}$ 求系数再逐项积分，支持 $\frac{1}{x^2-1}$、$\frac{x}{x^2-1}$ 等。

## 通用部分分式

`integ_rational_partial` 把有理函数积分补全到分母可分解为一次/二次有理因子：

1. **展平分式**：沿乘积树把 $(x*(x+1))^{-1}$、$\frac{1}{x^2}$、负整数幂拆成分子/分母；
2. **假分式**：一元多项式长除法，商逐项积分，余式进入部分分式；
3. **分母分解**：复用 `lib/factor.gs`，因子归一化成首一多项式并按 `nd_sig` 合并重根，总次数必须等于分母次数；
4. **系数**：每个 $f_i^k$ 列未知量（一次一个、二次两个），以 $Q/f_i^k$ 为基构造线性方程组，带行交换的高斯-约当消元；
5. **逐项积分**：
   - $\frac{A}{(x-r)^k}$：$k=1$ 对数，$k>1$ 幂函数；
   - $\frac{Bx+C}{(x^2+bx+c)^k}$：先拆出 $\frac{B}{2}f'$`，剩余用递推 $I_k = \frac{2x+b}{(k-1)D f^{k-1}} + 2 \frac{2k-3}{(k-1)D} I_{k-1}, D = 4c-b^2$；$D>0$ 用反正切，$D<0$ 用对数比值。

## 求导

`lib/diff.gs` 用后序显式栈，`df_done`/`df_val` 按节点 ID 缓存导数，避免共享子树重复计算。

## series

`series` 的高层算法在 `lang/series.sl`，通过 `vm_series` 运行：

- `taylor`：有限点 Taylor 循环，调用 native `series_diff`/`series_at`；
- `series_at_inf`：无穷远展开，分别处理 $e^{-x}$ 型重写与 $x \to \frac{1}{t}$ 代换；
- 结构重写 `series_exp_rewrite`/`series_has_exp`/`series_eval_value` 仍在 `lib/series.gs`，因为它们需要 AST 节点映射表。
