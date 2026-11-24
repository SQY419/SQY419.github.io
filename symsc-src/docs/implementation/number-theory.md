# 数论

对应函数：`isprime`、`ifactor`、`perm`/`comb`、`powmod`、`gcd`、`lcm`。

## 数论基础

- `lib/number.gs` 只负责字符串算术、节点转换与格式化；循环在 DSL。
- `isprime`/`ifactor`/`powmod` 的操作数限制 15 位以内；`perm`/`comb` 结果可任意大。


## ifactor

认为 $ifactor(0)$ 应当返回 $0$。

15 位以上先做 30 万以内小因子试除，20 位以上或找不到小因子时返回明确错误。例如 $\text{ifactor}(2^{64}+1)$，`nt_trial_factor` 按 7 位分块、30 轮步进算余数，找到 `274177` 后递归分解余项。
