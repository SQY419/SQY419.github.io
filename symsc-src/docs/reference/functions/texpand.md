# texpand
```
texpand(trig)
```
三角函数展开。

利用和式展开、倍角公式规则进行展开。

## 示例
```
texpand(sin(x+y))
> sin(x)*cos(y) + sin(y)*cos(x)

texpand(sin(2x))
> 2 sin(x)*cos(x)

texpand(sin(3x))
```
