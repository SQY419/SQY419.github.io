# isprime

```text
isprime(n)
```

判断素性。

小素数试除 + Miller-Rabin（2/3/5/7 等基），并用 Pollard-Rho 做复合性见证。

## 示例

```text
isprime(97)
> True

isprime(100)
> False
```

## 行为细节

- 操作数限制 **15 位以内**。
- 负数 / 非整数报错。
- 只有 `True` / `False` 两种返回，不做符号化。

## 相关

[`ifactor`](ifactor.md) · [`powmod`](powmod.md)
