---
hide:
  - navigation
  - toc
  - footer
---

<div class="hero" markdown>
<p class="ui-note">SQY Graphic Calculator · Version 4.12+</p>

<h2>SGC 用户说明</h2>

<p>SGC 是一个跑在 Scratch 里的数学软件：画函数、做几何、跑脚本、渲染公式。<br>
本说明依据《稽何计算器用户说明》第 18 次修订整理。</p>
</div>

<div class="grid" markdown>
[**快速开始**<span>五分钟画出第一条曲线</span>](quickstart.md){ .card }
[**计算引擎**<span>运算符、函数表、高级运算符</span>](engine.md){ .card }
[**脚本**<span>SGC Script II 与图形库</span>](script.md){ .card }
[**常见问题**<span>画不出图？先看这里</span>](faq.md){ .card }
</div>

## 这是什么

SGC 始于 2022，在 Scratch 3 以及支持 Scratch 3 的平台上运行。它可以绘制显函数、隐函数、
参数方程、极坐标，做简单的统计与回归，创建几何对象，用 SGC Script 写演示动画，
用 STeX 渲染公式。

!!! tip "速度"
    在 TurboWarp / HTML 环境下，运行速度与 Desmos、GeoGebra 接近；
    参数与精度都可以自己调，必要时能画得比 Desmos 更细。

## 入口

- 在线使用：[sqy419.axolotlpower.com/sgc](https://sqy419.axolotlpower.com/sgc/)
- 下载与版本：[下载页](https://sqy419.axolotlpower.com/download/)
- 旧版本归档：V4 / V3 / V2 / V1.0.5

## 目录

1. [主界面](interface.md)
2. [输入](input.md)
3. [输入对象操作](objects.md)
4. [坐标系](coords.md)
5. [计算引擎](engine.md)
6. [几何](geometry.md)
7. [文本](text.md)
8. [脚本](script.md)
9. [统计](stats.md)
10. [设置](settings.md)
11. [多边形、逐帧动画与批注](polygon.md)
12. [附录](appendix.md)
13. [关于内部实现的一些说明](internals.md)

## 致谢

- turbowarp.org、GitHub Pages、gtd232（美西螈力量）
- Obdopqo：四万字超大画笔字库与示例字库、多边形填充与点击判断
- Alpha Math、Origin 图形计算器：同类作品，交流互鉴
- “6”的科学计算器：公式渲染器、幂的计算、傅里叶变换音乐生成器
- 其他为 SGC 做出贡献的开发者

使用了 CMU Sans Serif、CMU Serif、JetBrains Mono 等字体，以及 -Rex- 的 SFE 字符注入器。
