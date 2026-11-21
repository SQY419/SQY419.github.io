# 快速开始

## 运行

symSC 是一个 Scratch 3.0 工程，没有第三方扩展依赖。

1. 从仓库取 `cas-fixed.sb3`（仓库里另附的可运行版本），或自己用 GoboScript 编译出 `cas.sb3`；
2. 在 [TurboWarp](https://turbowarp.org/) 或 Scratch 3.0 里打开工程；
3. 点绿旗，终端出现提示符后直接输入表达式。

!!! tip "推荐 TurboWarp"
    原生 Scratch 的 warp 线程每次最多执行 500ms，TurboWarp 的 `nowarp` 积木没有这个限制。
    `expand((x+1)^20)` 这类大计算在 TurboWarp 里更稳。

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
| 拖动终端文本 | 滚动查看历史 |
| — | 最多保留 5000 行 |

`help()` 查看总览，`help(simplify)` 查看单个函数的签名与说明。

## 下一步

- [命令与表达式](guide/commands.md)：函数式命令、裸表达式、比较运算
- [变量与自定义函数](guide/variables.md)：`a=1`、`f(x)=x^2+1`、`sum`
- [容器与线性代数](guide/containers.md)：`[1,2,3]`、`[[1,2],[3,4]]`
- [函数参考](reference/functions/index.md)：每个函数一页
