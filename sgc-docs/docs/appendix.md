# 附录

## 示例表达式

可以直接复制到输入区（虚拟键盘支持粘贴）。

### 二维

```text
sin(xx+yy)=0

(x>0)(sin(x))+x(x<0)

r=acos(sin(θ))

a=21.2; x^(2/3)+0.9sqrt(3.3-xx)sin(3ax)

a=-1; b=1; c=1; y=ax^2+bx+c

sin(xx-yy)=sin(2xy)

sin(xx+yy)=sin(xy)

exp(sinx+cosy)=sin(exp(x+y))
```

### 三维

```text
exp(sinx+cosy)=sin(exp(x+y))

xyz=1

xx+yy+zz=1

xx+yy+zz-4xyz=0
```

## 几个软件对比

隐函数绘制的对比（SGC / Desmos / thetamath）：

| 函数 |
| --- |
| $y=\ln(\sin x+\cos y)$ |
| $x\csc x+y\csc y=xy\csc(xy)$ |
| $y=\dfrac{\ln(x-1)}{x-2}$ |

SGC 的隐函数走区块加载与 marching squares，精度够时细节通常比 Desmos 更完整，
但切面型的隐函数仍可能丢失。

## 版本与获取

- 当前版本 4.10（说明书对应 4.12+）；4.5 以上可以在 SGC 内获取更新。
- V5（JavaScript 版）正在制作中。
