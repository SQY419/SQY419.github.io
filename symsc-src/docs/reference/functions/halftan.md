# halftan
```
halftan(trig)
```
用万能公式重写表达式。

即另$t = \tan \frac{x}{2}$， 有$\sin x = \frac{2t}{1+t^2}$，$\cos x = \frac{1−t^2}{1+t^2}$，$\tan x = \frac{2t}{1−t^2}$。

## 示例
```
halftan(sin(x))
> 2 tan(1/2 x)/(tan(1/2 x)^2 + 1)

halftan(tan(2x))
> 2 tan(x)/(- tan(x)^2 + 1)
```
