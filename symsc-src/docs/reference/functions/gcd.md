# gcd

```text
gcd(a, b)
```

求最大公因式：整数走整数 GCD，多项式走多项式 GCD。

## 示例

```text
gcd(x^3+y^3,x^5+y^5)
> x + y
```

## 行为细节

- 一元：精确除法（Euclid）。
- 二元：modular GCD —— 多个采样点、两个素数 CRT，再用精确的 Q 除法验证。
- n 元：Kronecker 替换 / 网格采样 + 张量插值，网格点数上限为 256。
- 这是按需命令，比 `simplify` 重，属于秒级以下但不在毫秒表里。
- 系数使用十进制 BigInt，大整数同样适用。

## 相关

[`lcm`](lcm.md) · [`simplify`](simplify.md)
