# transpose

```text
transpose(m)
```

矩阵转置，行列互换。

## 示例

```text
transpose([[1,2],[3,4]])
> [[1, 3], [2, 4]]
```

## 行为细节

- 输入是「行的列表」，每个元素是一行。
- 非矩形输入会报错。

## 相关

[`det`](det.md) · [`dot`](dot.md)
