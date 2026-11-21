---
hide:
  - navigation
  - toc
  - footer
---

<div class="hero" markdown>
<p class="eyebrow">Computer algebra, inside Scratch.</p>

<h2>symSC</h2>

<p>用 <a href="https://github.com/aspizu/goboscript">GoboScript</a> 编写、可编译到原版 Scratch 3.0 的符号计算引擎。<br>
无第三方扩展依赖，在 Scratch / TurboWarp 里就能跑。</p>
</div>

<div class="grid" markdown>
[**快速开始**<span>在 Scratch 里跑第一条化简</span>](getting-started.md){ .card }
[**命令与表达式**<span>函数式命令与裸表达式</span>](guide/commands.md){ .card }
[**函数参考**<span>每个内建函数一页</span>](reference/functions/index.md){ .card }
[**内核设计**<span>arena、规范形式与规则引擎</span>](design.md){ .card }
</div>

## 它能做什么

支持有理数、任意精度整数、BigFloat 科学计数法、多项式、根式、三角、微分、极限、向量/矩阵/嵌套列表和变量定义。

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
    现在的实现**没有数学排版输出，只有线性输出**。
    旧版 [symSc](https://github.com/SQY419/Beta-Math/tree/main/symSC) 有数学输出、但缺少 Vector 等特性。

## 文档怎么读

- 想马上跑起来 → [快速开始](getting-started.md)
- 想查某个函数 → [函数参考](reference/functions/index.md)
- 想改内核 → [内核设计](design.md) 与 [性能实测](performance.md)

仓库：[SQY419/symSC](https://github.com/SQY419/symSC) · 欢迎反馈 bug
