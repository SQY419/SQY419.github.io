# 特殊函数

## 菲涅尔积分 FresnelS / FresnelC

$$S(x)=\int_0^x\sin\frac{\pi}{2}t^2\,dt,\qquad C(x)=\int_0^x\cos\frac{\pi}{2}t^2\,dt$$

它们是奇函数，只需处理 $x>0$。

被积函数在 $x$ 大时振荡极快，直接上自适应积分会很慢。SGC 分段处理：

- $x\le4.59$（约 $1.46\pi$）：20 阶高斯积分，或直接用级数；
- $x>4.59$：用渐近展开

$$S(x)\sim\frac12-\frac{1}{\pi x}\cos\frac{\pi x^2}{2},\qquad
C(x)\sim\frac12+\frac{1}{\pi x}\sin\frac{\pi x^2}{2}$$

再用 Horner 形式把多项式部分整理成嵌套乘法，减少运算量。

实测和 WolframAlpha 对比：

| $x$ | WolframAlpha | SGC |
| --- | --- | --- |
| 0.5 | 0.0647324328599 | 0.0647324328541 |
| 1 | 0.4382591473903 | 0.4382591473851 |
| 3 | 0.4963129989673 | 0.4963129989544 |

## LambertW

$W(x)$ 是 $f(w)=we^w$ 的反函数，主分支定义在 $\left[-\frac1e,\infty\right)$，
满足 $W(x)e^{W(x)}=x$。很多含指数的超越方程可以用它解出来。

牛顿迭代：

$$w_{n+1}=w_n-\frac{w_ne^{w_n}-x}{w_ne^{w_n}+e^{w_n}}$$

- 初值取 $1$：$W(1)$ 几步就收敛，但 $W(100)$ 收敛极慢（初始值太差）；
- 初值改取 $w_0=\sqrt[3]{x/2+0.95}$（$x\in[20,200]$ 拟合）：$W(100)$ 四步就到
  $3.385630140$；
- $x\gg200$ 时改用对数迭代，再取指数还原。

SGC 只实现主分支；$w<-1$ 的那一支没有做。

## Gamma 与 Psi

Gamma 是阶乘的解析延拓：

$$\Gamma(x)=\int_0^\infty e^{-t}t^{x-1}\,dt,\qquad x!=\Gamma(x+1)$$

直接积分太慢，SGC 用 **Lanczos 近似**（$g=7$，$n=9$）：

$$\Gamma(z)\approx\sqrt{2\pi}\left(z+g+\tfrac12\right)^{z+\frac12}e^{-(z+g+\frac12)}
\left(p_0+\sum_{k=1}^{8}\frac{p_k}{z+k}\right)$$

精度随 $x$ 增大而下降：$x=100$ 约 13 位，$x=10000$ 约 12.7 位。
需要更高精度时改用 luschnyCF4，或者用 $\Gamma(x)=x\Gamma(x-1)$ 递推。

由余元公式

$$\Gamma(p)\Gamma(1-p)=\frac{\pi}{\sin p\pi}$$

只需计算 $p>0.5$ 的一半，另一半反推。

$\psi(x)=\dfrac{\Gamma'(x)}{\Gamma(x)}$ 同理，也有对称关系，只需算一半。

## Zeta

$$\zeta(s)=\sum_{k=1}^{\infty}\frac{1}{k^s},\qquad \Re(s)>1$$

这个级数在 $s$ 接近 1 时收敛极慢：算 $\zeta(2)$ 想要 10 位精度，需要上亿项，
显然不能直接用。

SGC 用两个加速手段：

1. 交错级数

$$\zeta(s)=\frac{1}{1-2^{1-s}}\sum_{k=1}^{\infty}\frac{(-1)^{k-1}}{k^s}$$

2. 函数方程

$$\zeta(s)=2^s\pi^{s-1}\sin\frac{\pi s}{2}\,\Gamma(1-s)\,\zeta(1-s)$$

这样可以把 $s<0$ 的值映射到 $s>1$ 去算，覆盖整个实轴。

$s=1$ 是极点。注意到 $1/\zeta(x)$ 在 $x=1$ 处是 0，连续可导，
所以 SGC 对 $1/\zeta(x)$ 做 20 阶 Chebyshev 近似——在整条实轴上都很稳。
