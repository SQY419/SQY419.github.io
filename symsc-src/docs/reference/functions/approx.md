# approx

```text
approx(expr)
```

把精确结果转成浮点近似。利用 Scratch 特性实现了大浮点数表示，类似 `1.14514e1919810`，
不局限于 `1e308`。

## 示例

```text
approx(2^(2^100))
> 1e381600854690000000000000000000

approx(e^100)
approx(e^10000)
> 8.8068182256e4342

approx([sqrt(2),pi])
> [1.4142135624, 3.1415926536]
```

## 行为细节

- 大浮点数用「尾数 + 十进制指数」两个 double 表示；超出 double 范围的幂回退到
  `log(base)*exponent` 路径，因此 `e^10000` 不会变成 `Infinity`。
- 常量底数 `e` / `pi` / 数字的 `K.Pow` 都支持，不只 `K.PowE`。
- 容器会逐元素近似。

## 相关

[`eval`](eval.md) · [`sqrt`](sqrt.md)
