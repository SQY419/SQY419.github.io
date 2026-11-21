# expand

```text
expand(expr)
```

展开括号与整数幂。默认的解析/化简只保持乘积结构，需要展开时显式调用。

## 示例

```text
expand((x+1)^3)
> x^3 + 3*x^2 + 3*x + 1

expand((x+1)^10)
> x^10 + 10*x^9 + ... + 1

expand((x+y)^10)
> x^10 + 10*x^9*y + ... + y^10
```

## 行为细节

- 展开是主要性能成本，规模参考 [性能实测](../../performance.md)：

| 输入 | 耗时（scratch-vm 解释器） |
| --- | ---: |
| `expand((x+1)^3)` | 8.4–9.4 ms |
| `expand((x+1)^10)` | 约 42 ms |
| `expand((x+y)^10)` | 约 72 ms |
| `expand((x+1)^20)` | 约 146 ms |

- 更深的多元展开可能触及节点上限，会以错误提示保护，而不是静默出错。

## 相关

[`simplify`](simplify.md) · [`subst`](subst.md)
