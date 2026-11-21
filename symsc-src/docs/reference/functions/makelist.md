# makelist

```text
makelist(expr, var, a, b)
```

按区间 `a..b` 生成列表，`var` 依次取值。

## 示例

```text
makelist(x+1, x, 0, 3)
> {1, 2, 3, 4}
```

## 行为细节

- 上下界必须是整数，步长固定为 1。
- 结果用 `{ }` 普通列表返回，可继续传给 `sum`、`prod` 或做索引。
- 元素表达式会经过规范化，`makelist(x*2, x, 0, 2)` 得到 `{0, 2, 4}`。

## 相关

[`sum`](sum.md) · [`length`](length.md)
