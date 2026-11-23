# 快速开始

## 运行

symSC 是一个 Scratch 3.0 工程，没有第三方扩展依赖。

1. 从仓库取 `cas.sb3`，或自行用 GoboScript 编译；
2. 在 [TurboWarp](https://turbowarp.org/) 或 Scratch 3.0 里打开工程；
3. 点绿旗开始使用。

!!! tip "推荐 TurboWarp"
    Turbowarp 的性能远超 Scratch 3.0，通常来说，Turbowarp 计算的速度会在原版 Scratch 的十倍以上。

## 不想装环境？

打开 [symSC 在线版](symSC.html)，用浏览器直接算，不用装 Scratch：

[▶ 打开在线版](symSC.html){ .md-button .md-button--primary target="_blank" rel="noopener" }

单文件 HTML，离线也能用。

## 第一条命令

在终端里输入，回车执行：

```text
simplify(2*x + 3*x - x)
> 4*x
```

裸表达式也会自动化简：

```text
1+1
> 2

1/0
> oo
```

## 终端操作

| 操作 | 说明 |
| --- | --- |
| ++c++ | 清屏 |
| ++h++ | 显示帮助 |

`help()` 查看总览，`help(simplify)` 查看单个函数的签名与说明。

## 下一步

- [命令与表达式](guide/commands.md)：函数式命令、裸表达式、比较运算
- [变量与自定义函数](guide/variables.md)：`a=1`、`f(x)=x^2+1`、`sum`
- [容器与线性代数](guide/containers.md)：`[1,2,3]`、`[[1,2],[3,4]]`
- [函数参考](reference/functions/index.md)：每个函数一页
