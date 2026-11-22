# perm / comb

```text
perm(n, k)     排列数 A(n, k)
comb(n, k)     组合数 C(n, k)
```

## 示例

```text
perm(5, 2)
> 20

comb(5, 2)
> 10

comb(100, 50)
```

## 行为细节

- 用十进制大整数乘法 / 精确除法，结果可以是任意大整数。
- `k > n` 或负数按组合数定义报错。
- 不展开成因子形式，直接给整数结果。

## 相关

[`ifactor`](ifactor.md) · [`powmod`](powmod.md)
