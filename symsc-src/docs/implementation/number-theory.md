# 数论

对应函数：`isprime`、`ifactor`、`perm`/`comb`、`powmod`、`gcd`、`lcm`。

## 数论基础

`lang/number.sl` + `lib/number.gs`：

- `lib/number.gs` 只负责字符串算术、节点转换与格式化；循环在 DSL。
- `isprime`/`ifactor`/`powmod` 的操作数限制 15 位以内；`perm`/`comb` 结果可任意大。
- `$\text{ifactor}(0)` 返回 `0`。

## hold、软失败与 20 位 ifactor

- 不把「暂时积不出来」显示成错误。
- `$\text{ifactor}($2^{64}$+1)`：15 位以上先做 30 万以内小因子试除。`nt_trial_factor` 按 7 位分块、30 轮步进（跳过 2/3/5 的倍数）算余数，找到 `274177` 后递归分解余项。
- 20 位以上或找不到小因子时返回明确错误，不进入极慢的 Big Pollard-Rho。

## 误差处理与 diff 扩展

- `Unknown + container`，命中就跳过化简、直接打印已解析的 AST，因此 `foo([2/3])` 原样输出。
- `diff` 参数扩展为 1..3 个：`diff(f,x,n)`、`diff(f,x=a)`、`diff(f,x=a,n)`；阶数上限 1024。
- 对 `P(x)*e^x` 的高阶导用 Leibniz 公式，避免 256 次逐步求导耗尽节点表。

## 回归测试：SGCC 手动步进

`tests/run_vm_worker.js` 按 `SGCC-测试方法.md` 改为：

- 不再等 60 Hz 实时轮询；
- 每个 worker 直接写入 `cases`，跑到 `finished` 非空即停；
- 超时按步数（默认 2,000,000 步）而不是墙钟。

745 条回归不再被每帧等待拖慢，语义检查不变。
