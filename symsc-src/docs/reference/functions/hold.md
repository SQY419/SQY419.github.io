# hold

```text
hold(expr)
```

原样返回括号里的文本，不解析、不化简。**文本级**抑制，不是可嵌套的 AST 节点。

## 示例

```text
hold(1+1)
> 1+1

hold(simplify(2*x + 3*x))
> simplify(2*x + 3*x)
```

## 行为细节

- `run_command` 在进入解析前截获完整的 `hold(...)`，所以内部任何写法都不会被求值。
- 用来对照「输入」与「输出」，或保留一个还没实现的表达式。
- 不能嵌套在其它命令里使用。

## 相关

[`eval`](eval.md) · [`approx`](approx.md)
