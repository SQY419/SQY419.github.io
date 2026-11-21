---
hide:
  - navigation
  - toc
  - footer
---

<div class="hero" markdown>

<h2>symSC</h2>

<p>Computer Algebra System written in Scratch.</p>

<p>用 <a href="https://github.com/aspizu/goboscript">GoboScript</a> 编写、可编译到原版 Scratch 3.0 的符号计算引擎。<br>
无第三方扩展依赖。</p>
</div>


## 它能做什么

支持有理数、任意精度整数、大浮点数、多项式、根式、三角、微分、极限、向量/矩阵/嵌套列表、变量定义等。

```text
simplify(2*x + 3*x - x)
> 4*x

diff(x^x, x)
> x^x + ln(x)*x^x

sqrt(8/9)
> 2/3*sqrt(2)

limit(sqrt(1+x^2)/x, x, oo)
> 1

(1+sqrt(2))^50
> 4866752642924153522*sqrt(2) + 6882627592338442563
```

!!! note "和旧版的区别"
    现在的实现**没有数学输出，只有线性输出**。
    旧版 [symSc](https://github.com/SQY419/Beta-Math/tree/main/symSC) 有数学输出，但缺少 Vector 等特性。

仓库：[SQY419/symSC](https://github.com/SQY419/symSC)

欢迎反馈 bug。
