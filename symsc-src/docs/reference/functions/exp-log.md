# exp / ln / log

```text
exp(x)    ln(x)    log(x)
```

`ln` 是以 `e` 为底的自然对数，`log` 是以 10 为底的对数。

## 示例

```text
ln(exp(x))
> x

exp(ln(x))
> x

diff(5^x)
> ln(5)*5^x
```

## 行为细节

- `ln(exp(x))`、`exp(ln(x))` 这类互逆结构会被规则直接消去（在定义域内）。
- 求导：`exp' = exp`，`ln' = 1/u`，`log' = 1/(u*ln(10))`。
- 常数 `e` 是内建常量，`pi` 同理。

## 相关

[`sqrt`](sqrt.md) · [`diff`](diff.md)
