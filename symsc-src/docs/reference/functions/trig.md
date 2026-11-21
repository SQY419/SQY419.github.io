# sin / cos / tan

```text
sin(x)   cos(x)   tan(x)
```

三角函数。特殊角直接给根式值，其余保持符号形式。

## 示例

```text
sin(pi/8)    -> 1/2*sqrt(-sqrt(2) + 2)
cos(pi/8)    -> 1/2*sqrt(sqrt(2) + 2)
tan(pi/8)    -> sqrt(2) - 1

sin(pi/5)    -> 1/4*sqrt(-2*sqrt(5) + 10)
cos(pi/5)    -> 1/4*sqrt(5) + 1/4
tan(pi/5)    -> sqrt(-2*sqrt(5) + 5)
```

容器会逐元素映射：

```text
sin([0,pi/2])
> [0, 1]
```

## 行为细节

- 只对可精确表示的特殊角做根式化简，`sin(1)` 保持 `sin(1)`。
- 反三角 `asin` / `acos` / `atan` 参与解析，但符号化简能力有限。
- 化简会使用诱导公式等。

## 求导

```text
diff(sin(x^2))
> 2*cos(x^2)*x
```

`sin' = cos`，`cos' = -sin`，`tan' = 1/cos^2`。

## 相关

[`exp / ln / log`](exp-log.md) · [`simplify`](simplify.md)
