# 方程与方程组

对应函数：`solve`、`lsolve`。

## solve 的分层

`solve` 采用「原生准备数据 + DSL 求解」，避免把方程文本特判写进积木。

1. **解析与分发**（`lib/api.gs`）
   - `find_top_eq` 在最外层找第一个 `=`（跳过 `==`/`<=`/`>=`/`!=`），把 `lhs=rhs` 变成残差。
   - `solve_parse_equations` 支持单方程与 `{eq1, eq2, ...}`；`split_args` 按 `()`/`[]`/`{}` 三种括号配对，所以 `{x+y=1,x-y=2}` 不会被逗号拆错。
   - `solve_parse_var_list` 支持 `x` 或 `{x,y,...}`；省略变量时用 `collect_vars_ast` 按字母序推断。

2. **原生数据层**（`lib/solve.gs`）
   - 复用 `lib/poly.gs`：`poly_from_ast` 把残差展开成稀疏多项式，再按目标变量取系数。
   - 单方程的系数 AST 交给 DSL；一次方程组把系数矩阵与右端项放进 `solve_mat`/`solve_rhs`。
   - 提供列表构造 `ctb_begin/add/end` 与 `solve_simp` 供 DSL 调用。

3. **DSL 算法**（`lang/solve.sl`）
   - 一次：$x = -\frac{b}{a}$。
   - 二次：首项系数为负时整体取反，$D = b^2 - 4ac$；$D<0 → {}$，$D=0$ 单根，否则 $\frac{-b \pm \sqrt{D}}{2a}$，负号在前。
   - 一次方程组：带主元交换的高斯消元，检查矛盾行与秩，再回代。

4. **输出**：`K.List` 节点。无解 `{}`；单方程 `{r1, r2}`；方程组 `{x值, y值, ...}`。多组解时约定为嵌套列表，当前一次方程组只会产生 0/1 组。

## lsolve

`lsolve([[a11, ..., b1], ...])` 接受**增广矩阵**，最后一列是右端项。

- 唯一解 → `{x1, x2, ...}`；无解 → `{}`；无穷多解 → 报错。

`lib/lsolve.gs` 用行主元高斯-约当消元、主元归一化、回代；任意行数/变量数，系数是符号表达式时走同一套 `mk_*`/`solve_simp`。
