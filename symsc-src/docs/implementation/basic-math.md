# 基础数学

对应函数：`sqrt`、`sin/cos/tan`、`exp/ln/log`、`mod/%`。

## 平方根

- `sqrt(0) → 0`，`sqrt(1) → 1`。
- 分子、分母分别提取最大平方因子，得到 `sqrt(n/d) = (k/m) * sqrt((n/k²)/(d/m²))`。
- 剩余根式为 1 时直接返回有理数。
- 数字超过 `MAX_SQRT = 1,000,000` 跳过化简。
- `build_product` 会把 `pow_node` 返回的数字因子折回系数，避免出现 `2*2`。

## 三角函数

- `sin`、`cos`、`tan` 的算法通过 DSL 和原生层实现。
- 特殊零点：`sin(pi)`/`tan(pi)` 等，`tg_special` 优化；`tan(n*pi)` 归约到 `nn == d`。
- 求导：`sin' = cos`、`cos' = -sin`、`tan' = 1/cos^2`。
- 链式法则集成在 `diff` 中。

## 指数与对数

- `exp`、`ln`、`log` 基于 DSL 与原生层。
- `e^0`/`pi^0` 直接返回 `1`。
- `exp` 的指数绝对值过大时会转换为 BigFloat 或返回 `Infinity`。
- 求导：`exp' = exp`、`ln' = 1/u`、`log' = 1/(u*ln(10))`。

## 取模

- `mod` / `%` 为整数运算是取余数，支持负数。
- 在解析和打印环节有特殊处理，保证结果一致。

## 其他

- `csc`/`sec`/`cot` 在解析时重写为 `1/sin`、`1/cos`、`cos/sin`，不新增 AST 类型。
- 积分器补上 `K.PowE` 的分数指数：`x^(pn/pd)` 调 `i_pow`；`sqrt(1/x)`、`(1/x)^(1/2)` 先把内外层指数相乘再积分。
