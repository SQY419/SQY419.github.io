# 内核设计

目标不是做一个完整的 CAS（那不可能），而是在 Scratch 的执行模型里做到**可扩展**的符号计算。

> 本文是 [DESIGN.md](https://github.com/SQY419/symSC/blob/main/DESIGN.md) 的摘要，完整细节以仓库原文为准。

## 1. 运行约束

Scratch / GoboScript 的关键限制：

- 没有指针/对象，列表是唯一的动态容器。
- 自定义积木的局部变量在递归时行为未定义。
- 没有 `break` / `continue` / `for`，只有 `repeat` / `until` / `forever`。
- 字符串只能逐字符处理；列表下标从 1 开始。
- TurboWarp 的 `nowarp` 积木没有 500ms 限制；原生 Scratch 的 warp 线程每次最多跑 500ms。

由此得到四条铁律：

1. **不使用递归**。解析、树遍历、打印全部用显式栈 / 工作列表。
2. **每个节点用整数 ID 表示**，ID 就是列表下标，`0` 表示 null / 错误。
3. **每个命令开始时重置 arena**，避免跨命令的垃圾与碎片。
4. **所有 `local` 只出现在 proc / func 内**（这是 gobo 的 bug）。

## 2. 节点 arena

`lib/arena.gs` 用一个 struct list：

```goboscript
struct Node {
    kind, a, b, num, den, txt, sig, deg
}
list Node nodes;
```

| 字段 | 含义 |
| --- | --- |
| `kind` | `K.Num`、`K.Var`、`K.Add`、`K.Mul`、`K.Pow`、`K.PowE`、`K.Sin` … `K.E`、`K.Float` |
| `a` / `b` | 子节点 ID；一元函数只用 `a` |
| `num` / `den` | 有理数字面量；`Pow` 的 `num` 表示整数指数；`PowE` 用 `b` 指向指数 |
| `txt` | 变量名 |
| `sig` | 规范签名，用于结构相等、排序、同类项合并 |
| `deg` | 总次数，用于加法项排序 |

- 列表第 1 项是 dummy，真实节点从 ID 2 开始；`node_count` 指向最后一个真实节点。
- 达到 `MAX_NODES` 时设置 `err` 并返回 0。
- **不存 Sub / Div / Neg**：`a - b` → `Add(a, Neg(b))`，`a / b` → `Mul(a, Pow(b, -1))`，`Neg(x)` → `Mul(-1, x)`。
- 整数指数用 `Pow`；有理数或含变量的指数用 `PowE`，这样既能精确合并/展开整数幂，又支持 `5^x`、`x^x`、`x^2.5`。

### sig 是什么

`sig` 是节点的规范字符串：`N:num/den`、`V:name`、`A[term1;term2;...]`、`M[factor1;...]`、`P(base,exp)`、`F<kind>(child)`、`PI`、`E`。

`sig` 相等即可判定两个规范化子表达式相同。注意只有 `mk_add` / `mk_mul` 返回的**根节点** sig 是完整扁平签名；二叉链内部的中间节点 sig 为空。

## 3. 规范形式与智能构造器

所有表达式在解析时就直接经过 `mk_add` / `mk_mul` / `mk_pow`，树里不存在未化简的 `0+x`、`1*x`、`x^1`。

### mk_num

约分、分母为正、检查 `2^53` 安全范围；`0` 统一成 `0/1`；溢出时设置 `err`，不静默转 float。

### sqrt 的数字化简

- `sqrt(0) → 0`，`sqrt(1) → 1`。
- 分子、分母分别提取最大平方因子，得到 `sqrt(n/d) = (k/m) * sqrt((n/k²)/(d/m²))`。
- 剩余根式为 1 时直接返回有理数。
- 数字超过 `MAX_SQRT = 1,000,000` 跳过化简。
- `build_product` 会把 `pow_node` 返回的数字因子折回系数，避免出现 `2*2`。

### mk_add

1. 用显式栈扁平化两侧的 `Add`。
2. 每项拆成 `系数 × 基`：数字项基为 0；`Mul` 的数字因子乘进系数。
3. 按基的 `sig` 合并同类项，精确有理数相加，系数 0 丢弃。
4. **Pythagorean pass**：`sin(u)^2` 与 `cos(u)^2` 参数 `sig` 相同且系数相同则合并成常数。
5. 按「次数降序 → 项类型 rank → sig」排序后重建二叉 `Add` 链；根节点写扁平 `A[...]` sig。

`term_order_rank` 让变量/变量幂排在乘积项前、常数最后，输出更像 `x - 2*y + 1`。

### mk_mul

1. 扁平化；数字因子乘进系数；`Pow` 拆成底数^指数，`PowE` 作为不透明因子。
2. 按底数 `sig` 合并同底数、指数相加；指数 0 丢弃。
3. 重建系数 + 各因子 `pow_node`，根节点写扁平 `M[...]` sig。
4. **不自动分配律**，`(x+1)*(x-1)` 保持乘积。

### mk_pow

指数 0 → 1，指数 1 → 底数；数字底数走精确有理数幂；`Mul` 底数分配为各因子幂（`(2*x)^2` → `4*x^2`）；指数绝对值超过 `MAX_EXP` 报错。

## 4. 解析

`lib/lex.gs` 逐字符扫描：数字精确转有理数（整数部分 + 小数部分 / 10^k），标识符用 `norm_ident` 转小写。

`lib/parse.gs` 用 shunting-yard，全部显式：

| 运算符 | 优先级 |
| --- | ---: |
| `+` `-` | 2 |
| `*` `/` | 3 |
| 一元负号 | 4 |
| `^` | 5 |
| 函数标记 | 6 |

- `^` 右结合；一元负号低于 `^`，所以 `-x^2 = -(x^2)`。
- 解析过程中直接调用智能构造器，拿到的已经是规范树。
- 未知函数、缺括号、逗号错误等设置 `err` 并停止。

## 5. 打印

`lib/print.gs` 用任务栈（节点任务 / 文本任务）迭代打印：

- 优先级：Add 1，Mul 2，Pow/PowE 3，原子 4；父优先级更高时加括号。
- 加法/乘法先扁平化：负项打印成 ` - `，输出 `x - 2*y` 而不是 `x + -2*y`；系数 1 省略。
- 负指数打印成分数：`x^-1` → `1/x`，`x^-2` → `1/x^2`。
- 输出先写入 `pr_parts`，最后 join 一次；超过 `MAX_OUTPUT` 截断。

## 6. 求导

`lib/diff.gs` 用后序显式栈，`df_done` / `df_val` 按节点 ID 缓存导数，避免共享子树重复计算。

- 数字/常量 → 0；变量匹配求导变量 → 1，否则 0。
- `Add` → 两边相加；`Mul` → 乘积法则。
- `Pow(base, n)` → `n * base^(n-1) * base'`。
- `PowE(base, exp)`：指数是数字常量时走幂函数公式（`x^2.5` → `5/2*x^(3/2)`）；指数含变量时 `base^exp * (exp' * ln(base) + exp * base'/base)`。
- 函数走链式法则：`sin' = cos`、`cos' = -sin`、`tan' = 1/cos^2`、`exp' = exp`、`ln' = 1/u`、`log' = 1/(u*ln(10))`、`sqrt' = 1/(2*sqrt(u))`。

## 代码地图

| 文件 | 内容 |
| --- | --- |
| `lib/arena.gs` | 节点 arena |
| `lib/lex.gs` / `lib/parse.gs` | 词法与 shunting-yard 解析 |
| `lib/print.gs` | 线性输出 |
| `lib/rules.gs` | 规则引擎 |
| `lib/diff.gs` | 求导 |
| `tests/build.sh` | 调用 GoboScript 编译器 |
