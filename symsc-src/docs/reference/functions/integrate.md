# integrate

```text
integrate(expr[, var])
```

不定积分，省略变量时对 `x` 积分。

## 示例

```text
integrate(x^2, x)
> 1/3*x^3

integrate(1/x, x)
> ln(abs(x))

integrate(x^(1/3), x)
> 3/4*x^(4/3)

integrate(sqrt(1/x), x)
> 2*sqrt(x)

integrate(x^a, x)
> (x^(a + 1))/(a + 1)

integrate(2^x, x)
> 2^x/ln(2)

integrate(2^(2*x), x)
> 2^(2*x)/(2*ln(2))

integrate(e^x, x)
> e^x
```

## 覆盖范围

- **线性性**：$\int(f+g) = \int f + \int g$，常数倍提出。
- **幂函数**：$x^n → \frac{x^{n+1}}{n+1}$，$n = -1$ 时为 $\ln(\left| x \right|)$；
  分数指数与 `x*sqrt(x)`、`sqrt(x)/x` 这类单项式会先统一成 $x^{\frac{pn}{pd}}$。
- **指数函数**：`integrate(x^a,x)`等。
- **线性换元**
- **基本表**
- **对数换元**：$\int g'(x)\cdot \ln(g(x)) dx = g\cdot \ln g - g`。
- **有理函数部分分式**：假分式先做长除法，分母用 `factor` 分解，
  系数用高斯-约当消元求，逐项积分（一次因子给对数/幂，二次因子给反正切或对数比值）。
- **多项式乘积**：先 `expand` 再逐项积分。

## 暂不支持

- 定积分
- 广义分部积分
- 无初等原函数的表达式
- 更一般的三角恒等变形与根式换元

积不出来时不会报错，而是把原命令文本返回。

## 相关

[`diff`](diff.md) · [`factor`](factor.md) · [`expand`](expand.md)
