# 运行时与测试

## 积木数量

32298 / 32444；加入 series DSL 与两个极限规则后为 32809 / 32955 块，相对最初减少 631 块（约 -1.9%）。

主要削减：

  `bi_pow_str` 直接使用数值指数，去掉字符串解析循环。
  全部有理式统一由 `integ_rational_partial` 处理。
  同步清理 `tools/dslc.py` 的 NATIVES 表与 `lib/vm.gs` 分派分支。
- 死代码由编译器自动剥离：没有调用者的函数不会进入 sb3。


1. 把高层算法搬回 `.sl`：DSL 只有字节码列表，不占 Scratch 积木；
2. 做功能裁剪/多产物（核心代数 / +微积分 / 完整版）；
3. 拆分巨型分派器（`vm_native` 779 块、`mk_func` 522、`mk_add` 506、`pr_handle` 409）；
4. 合并 `pr_*` / `mk_*` / 多项式模块之间的重复逻辑。

统计：`python3 tools/blocks.py symSC.sb3 --top 20`。

## 数论

`lang/number.sl` + `lib/number.gs`：


`lib/number.gs` 只负责字符串算术、节点转换与格式化；循环在 DSL。
`isprime` / `ifactor` / `powmod` 的操作数限制 15 位以内；`perm` / `comb` 结果可任意大。
`ifactor(0)` 返回 `0`。

## hold、软失败与 20 位 ifactor

  不把「暂时积不出来」显示成错误。
- `ifactor(2^64+1)`：15 位以上先做 30 万以内小因子试除。`nt_trial_factor` 按 7 位分块、
  30 轮步进（跳过 2/3/5 的倍数）算余数，找到 `274177` 后递归分解余项。
  20 位以上或找不到小因子时返回明确错误，不进入极慢的 Big Pollard-Rho。

## 未定义函数容器参数与 diff 扩展

  `Unknown + container`，命中就跳过化简、直接打印已解析的 AST，因此 `foo([2/3])` 原样输出。
- `diff` 参数扩展为 1..3 个：`diff(f,x,n)`、`diff(f,x=a)`、`diff(f,x=a,n)`；
  阶数上限 1024。
- 对 `P(x)*e^x` 的高阶导用 Leibniz 公式，避免 256 次逐步求导耗尽节点表。

## 回归测试：SGCC 手动步进

`tests/run_vm_worker.js` 按 `SGCC-测试方法.md` 改为：

  不再等 60 Hz 实时轮询；
- 每个 worker 直接写入 `cases`，跑到 `finished` 非空即停；
- 超时按步数（默认 2,000,000 步）而不是墙钟。

745 条回归不再被每帧等待拖慢，语义检查不变。

