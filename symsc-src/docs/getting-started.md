# 快速开始

## 运行

symSC 是一个 Scratch 3.0 工程，没有使用第三方扩展。只需要从仓库取 `cas.sb3`，或自行用 GoboScript 编译，然后在 [TurboWarp](https://turbowarp.org/) 或 Scratch 3.0 里打开工程。最后，点击绿旗即可开始使用。

!!! tip "推荐 TurboWarp"
    Turbowarp 的性能远超 Scratch 3.0，通常来说，Turbowarp 计算的速度会在原版 Scratch 的十倍以上。如果使用 Turbowarp，那么首次计算会由于 jit 预热而变得很慢。所以首次计算可以直接输入简单式子测试。

## 在线版

symSC 提供 HTML 版本，可以离线运行，也可以直接在浏览器中运行。HTML 版不依赖 Scratch。

[▶ 打开在线版](symSC.html){ .md-button .md-button--primary target="_blank" rel="noopener" }

## 第一条命令

在终端里输入，回车执行：

```text
simplify(2*x + 3*x - x)
> 4*x
```

## 终端操作

| 操作 | 说明 |
| --- | --- |
| ++c++ | 清屏 |
| ++h++ | 显示帮助 |

`help()` 查看总览。`help(simplify)` 查看单个函数的签名与说明。

## 下一步

- [命令与表达式](guide/commands.md)
- [变量与自定义函数](guide/variables.md)
- [容器与线性代数](guide/containers.md)
- [函数参考](reference/functions/index.md)
