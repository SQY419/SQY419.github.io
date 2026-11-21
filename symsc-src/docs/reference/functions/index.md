# 函数参考

这里有函数相关的详细说明。

在终端里也可以用 `help(函数名)` 查看。

## 代数与化简

| 函数 | 作用 |
| --- | --- |
| [`simplify`](simplify.md) | 代数化简：合并同类项、约分、规则重写 |
| [`expand`](expand.md) | 展开括号与整数幂 |
| [`subst`](subst.md) | 符号代入 |
| [`eval`](eval.md) | 代入数值后直接求值 |
| [`approx`](approx.md) | 转成 BigFloat 浮点近似 |

## 微积分

| 函数 | 作用 |
| --- | --- |
| [`diff`](diff.md) | 求导（含 `x^x`、`5^x`、链式法则） |
| [`limit`](limit.md) | 极限，支持 `oo` |
| [`series`](series.md) | 无穷远点的渐进展开 |

## 求和与连乘

| 函数 | 作用 |
| --- | --- |
| [`sum`](sum.md) | 区间求和 / 容器求和 |
| [`prod`](prod.md) | 区间连乘 / 容器连乘 |

## 数论

| 函数 | 作用 |
| --- | --- |
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
| [`det`](det.md) | 行列式（1×1 ~ 3×3） |
| [`unitV`](unitv.md) | 单位向量 |
| [`abs`](abs.md) | 绝对值 / 向量模长 |

## 基础数学

| 函数 | 作用 |
| --- | --- |
| [`sqrt`](sqrt.md) | 精确根式化简 |
| [`sin` / `cos` / `tan`](trig.md) | 三角函数，特殊角给根式值 |
| [`exp` / `ln` / `log`](exp-log.md) | 指数与对数 |

## 系统

| 函数 | 作用 |
| --- | --- |
| [`help`](help.md) | 查看帮助 |
| [`purge`](purge.md) | 删除变量并返回值 |

!!! note "关于精度"
    所有条目按仓库 README / NOTES / DESIGN 整理；示例里的 `>` 是终端实际输出。
    没有写输出的条目只是用法示意。以 `help(函数名)` 为准。
