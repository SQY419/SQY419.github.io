# 词法与数值细节

## 37. 隐式乘号与终端横幅

词法器在 token 之间插入隐式 `*`：

- 数字 / 科学计数法后接标识符或 `(`：`3x`、`2pi`、`2sin(x)`、`2(x+1)`；
- `)` / `]` / `}` 后接数字、标识符或 `(`：`(2+x)(3+x)`、`(x)3`、`sin(x)cos(x)`。

`x(y)` 仍按函数调用解析，不插入乘号。

终端第一行是 **sb3 编译时间**：`symSC build YYYY-M-D H:M:S`。
`build-symsc.sh` 在 `goboscript build` 后调用 `tools/stamp_build.py` 替换占位符
（默认 `Asia/Shanghai`，可用 `BUILD_TZ` 覆盖），所以重新打开 sb3 时间不变。

## 38. 精确三角零点与大指数 BigFloat

- `sin(pi)` / `tan(pi)` / `sin(3*pi)`：`tg_special` 原来用 `0` 同时表示「未命中」和「结果 0」，
  真正的零值被当成未处理。现在零值返回 `mk_num 0,1`，`tan(n*pi)` 归约到 `nn == d`。
- `approx(e^10000)`：`ap_big_pow` 原来只处理 `K.PowE`，`e^n` 走双精度 `exp` 后溢出成 `Infinity`。
  现在同时处理 `K.Pow` 的常量底数 `e` / `pi` / 数字，先用 `log(base)*exponent` 判断是否超过
  双精度范围，再构造 BigFloat。`approx(e^10000) = 8.8068182256e4342`。

## 39. 二次无理数幂与 Big 系数

`1/(1+sqrt(2))^50` 解析时已由 `surd_power` 展开成 `a + b*sqrt(2)`，但分母有理化在
`expand_expr` 里把 Big 系数当成 0，出现 `(2*sqrt(2)+2)` 这类错误因子。

修复：

- `expand_expr` 的标量分支加入 `K.Big`；
- `rationalize.gs` 直接处理 `k + c*sqrt(d)`：用 `k²-d*c²` 判断范数，为 `±1` 时构造共轭
  `k/norm - c/norm*sqrt(d)`，并输出 Big 系数。

```text
simplify(1/(1+sqrt(2))^50) -> -4866752642924153522*sqrt(2) + 6882627592338442563
expand((1+sqrt(2))^50)     ->  4866752642924153522*sqrt(2) + 6882627592338442563
```

## 41. csc / sec / cot

解析器在 `apply_func` 中直接重写：`csc → 1/sin`、`sec → 1/cos`、`cot → cos/sin`，
不新增 AST 类型，`diff`、`approx`、打印器都复用已有 sin/cos 路径。

积分器同时补上 `K.PowE` 的分数指数：`x^(pn/pd)` 调 `i_pow`；
`sqrt(1/x)`、`(1/x)^(1/2)` 先把内外层指数相乘再积分。

## 44. e^0、series 大阶与单项式积分

- `mk_pow_expr` 对 `e^0` / `pi^0` 直接返回 `1`；
- `series` 阶数上限从 16 提到 64，`taylor` 的阶乘改用十进制字符串并在 `series_coeff` 里约分；
- 积分器增加单项式识别：遍历 `Var / Mul / Sqrt / Pow / PowE`，把 `x*sqrt(x)`、
  `1/(x*sqrt(x))`、`sqrt(x)/x` 统一成 `x^(pn/pd)` 再积分，系数一并提取。

## 45. 高阶单项式导数

`diff(x^20,x,20)` 原来逐次求导用双精度累乘系数，超过 `MAX_SAFE` 就报溢出错。
现在：

- `mk_mul` 在两个 `K.Num` 整数相乘可能超过 `MAX_SAFE` 时改用 `bi_mul_str` 生成 `K.Big`；
- `diff` 对 `x^m` 的 n 阶导直接用 `bi_mul_str` 算下降阶乘，构造 `coeff*x^(m-n)`。

## 46. 根号去嵌套

规则 8 `rule_sqrt_denest` 处理 `sqrt(A + B*sqrt(D))`：

- 从 `K.Add` 拆出有理常数 `A` 与 `B*sqrt(D)`；
- `Delta = A² - B²D` 必须是非负完全平方；
- `u=(A+sqrt(Delta))/2`、`v=(A-sqrt(Delta))/2`，构造 `sqrt(u) ± sqrt(v)`，符号由 `B` 决定；
- `B<0` 且 `u<v` 时交换两项，保证取正平方根。

## 47. 列表元素后接除法的名称冲突

`{x/y, x/z}` 曾报「列表元素为空」：解析器的容器基址列表叫 `cs_base`，而平方根合并逻辑
也用了同名全局列表，解析 `x/y` 触发 `mk_mul` 时把基址覆盖成 3，逗号处误判为空元素。

修复：解析器基址改名 `pc_base` 并在 `parse.gs` 内独立声明。

## 50 / 51. mod 与错误显示

- `%` 与 `mod(a,b)` 都走 `mod_nodes`：`nt_dec` 取十进制整数、`nt_mod` 任意精度取余、
  `nt_node` 转回 AST；负数按非负余数（`mod(-10,3)=2`）。
- `x%x`、`(x+1)%(x+1)` 直接 0；被除数 0 也返回 0；`mod(0,0)` 报「模数为零」。
- `term_error_raw` 的兜底从固定 `Unknown error` 改成显示实际错误文本
  `Error: <具体消息> @ func 'cas'`；补齐 18 条遗漏消息到 `err_zh` / `err_en` / `err_fn`（共 157 条），
  终端不再出现 `??`。
