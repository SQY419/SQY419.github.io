# cross

```text
cross(a, b)
```

三维向量叉积。

## 示例

```text
cross([1,2,3],[4,5,6])
> [-3, 6, -3]
```

## 行为细节

- 只接受长度为 3 的向量。
- 结果仍是向量，可以继续 `dot`、`abs` 或索引。

## 相关

[`dot`](dot.md) · [`unitV`](unitv.md)
