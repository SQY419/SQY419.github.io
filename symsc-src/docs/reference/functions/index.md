# 函数参考

这里有函数相关的详细说明。

在终端里也可以用 `help(函数名)` 查看。

## 代数与化简

| 函数 | 作用 |
| --- | --- |
| [`simplify`](simplify.md) | 代数化简 |
| [`expand`](expand.md) | 展开括号与整数幂 |
| [`factor`](factor.md) | 多项式因式分解 |
| [`subst`](subst.md) | 符号代入 |
| [`eval`](eval.md) | 代入数值后直接求值 |
| [`approx`](approx.md) | 浮点近似 |

## 方程与方程组

| 函数 | 作用 |
| --- | --- |
| [`solve`](solve.md) | 解方程（组） |
| [`lsolve`](lsolve.md) | 增广矩阵解线性方程组 |

## 微积分

| 函数 | 作用 |
| --- | --- |
| [`diff`](diff.md) | 求导 |
| [`integrate`](integrate.md) | 不定积分 |
| [`limit`](limit.md) | 极限 |
| [`series`](series.md) | Taylor / 无穷远展开 |

## 求和与连乘

| 函数 | 作用 |
| --- | --- |
| [`sum`](sum.md) | 区间求和 / 容器求和 |
| [`prod`](prod.md) | 区间连乘 / 容器连乘 |

## 数论

| 函数 | 作用 |
| --- | --- |
| [`isprime`](isprime.md) | 素性判定 |
| [`ifactor`](ifactor.md) | 整数分解 |
| [`perm` / `comb`](perm-comb.md) | 排列数 / 组合数 |
| [`powmod`](powmod.md) | 模幂 |
| [`gcd`](gcd.md) | 整数或多项式最大公因式 |
| [`lcm`](lcm.md) | 整数或多项式最小公倍式 |

## 容器

| 函数 | 作用 |
| --- | --- |
| [`length`](length.md) | 容器长度 |
| [`makelist`](makelist.md) | 按区间生成列表 |
| [`dot`](dot.md) | 点积 |
| [`cross`](cross.md) | 三维叉积 |
| [`transpose`](transpose.md) | 转置 |
| [`det`](det.md) | 行列式 |
| [`unitV`](unitv.md) | 单位向量 |
| [`abs`](abs.md) | 绝对值 / 向量模长 |

## 基础数学

| 函数 | 作用 |
| --- | --- |
| [`sqrt`](sqrt.md) | 根式化简 |
| [`sin` / `cos` / `tan`](trig.md) | 三角函数 |
| [`exp` / `ln` / `log`](exp-log.md) | 指数与对数 |
| [`mod` / `%`](mod.md) | 取余 |

## 系统

| 函数 | 作用 |
| --- | --- |
| [`help`](help.md) | 查看帮助 |
| [`purge`](purge.md) | 删除变量、函数并返回值 |
| [`hold`](hold.md) | 惰性求值 |

!!! note "说明"
    示例里的 `>` 是终端实际输出。没有写输出的条目只是用法示意。
