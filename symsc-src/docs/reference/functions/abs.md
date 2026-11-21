# abs

```text
abs(x)
```

数值取绝对值；对向量返回模长。

## 示例

```text
abs(-3)
> 3

abs([3,4])
> 5

abs(abs(x))
> abs(x)
```

## 行为细节

- 对符号表达式保留 `abs(...)`，并会化简嵌套：`abs(abs(x)) -> abs(x)`。
- 对容器逐元素映射时遵循「一元标量函数」规则。
- 求导时 `abs` 按链式法则处理，分段点不做特殊讨论。

## 相关

[`unitV`](unitv.md) · [`sqrt`](sqrt.md)
