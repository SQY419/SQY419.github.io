# length

```text
length(container)
```

返回容器的元素个数（只数最外层）。

## 示例

```text
length([1,2,3])
> 3

length({1, {2, 3}, [4, 5]})
> 3
```

## 行为细节

- 对向量、矩阵、普通列表都适用，矩阵返回行数。
- 下标从 1 开始，合法范围是 `1..length`。

## 相关

[`makelist`](makelist.md) · [`abs`](abs.md)
