# powmod

```text
powmod(a, b, m)
```

模幂 `a^b mod m`，用平方-乘实现。

## 示例

```text
powmod(2, 10, 1000)
> 24

powmod(3, 100000, 7)
```

## 行为细节

- 算法循环在 DSL 里，`nt_modmul` 对 15 位以内整数走数值快速路径，
  超出安全整数时回退到 `lib/big.gs` 的十进制运算。
- 操作数限制 **15 位以内**。
- `m = 0` 报错。

## 相关

[`mod`](mod.md) · [`isprime`](isprime.md)
