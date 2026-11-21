# approx

```text
approx(expr)
```

把精确结果转成浮点近似（BigFloat：尾数 + 十进制指数），用于看不动的根式或天文数字。

## 示例

```text
approx(2^(2^100))
> 1e381600854690000000000000000000

approx([sqrt(2),pi])
> [1.4142135624, 3.1415926536]

approx(sqrt(sum(1/x^2,x,1,20)*6))
> 3.0946695241
```

## 行为细节

- BigFloat 用「尾数 + 十进制指数」两个 double 表示；超出 double 范围的幂回退到 `log10` 路径。
- 因此 `2^(2^100)` 这类数会以科学计数法输出，而不是溢出成 `Infinity`。
- 容器会逐元素近似，见 [容器与线性代数](../../guide/containers.md)。

## 相关

[`eval`](eval.md) · [`sqrt`](sqrt.md)
