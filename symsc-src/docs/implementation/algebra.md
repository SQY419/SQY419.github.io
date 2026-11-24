# 代数与化简

对应函数：`simplify`、`expand`、`factor`、`subst`、`eval`、`approx`。

## 节点表达

表达式以树状节点表示，节点类型为 `K.Num`、`K.Var`、`K.Add`、`K.Mul`、`K.Pow`、`K.PowE`、`K.Sin` 等。

```goboscript
struct Node {
    kind, a, b, num, den, txt, sig, deg
}
```

### 智能构造器

所有节点通过智能构造器创建，确保规范化。

#### sqrt 的数字化简
分子分母提取最大平方因子。

#### mk_add
扁平化加法树，合并同类项，排序重建二叉加法链

#### mk_mul
扁平化，重建系数 + 因子幂

#### mk_pow
分配律处理 $(2x)^2 \to 4x^2$。

## factor

1. 转换：`fac_from_ast` 转稠密一元多项式；`fac_content`/`fac_primitive` 提取内容为本原多项式。
2. 表示：按高次到常数存储。
3. 提取：反复除 x，用有理根定理找一次因子。
4. Kronecker：高次用求值平移法枚举因子。
5. 组装：因子合并幂，内容前置。

范围是一元、有理系数；$x^{10}-1$ 能完整拆分。
