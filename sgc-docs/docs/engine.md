# 5 计算引擎

引擎 v4，支持三种对象：数（不区分 float / int）、字符串、布尔值。

## 5.1 技术参数

- 三角函数参数范围 $-10^{10} < x < 10^{10}$；所有函数保留 **15 位有效数字**。
- 实数范围 $1\times10^{-323}$ 到 $1.79769313486231\times10^{308}$（即 $2^{1024}$）。
- 常数保留 15 位小数。
- 幂 $a^b$：$a>0$ 时按 $e^{b\ln a}$；$a<0$ 时尝试把 $b$ 化成分数（小数位不足 7 位视为有理数，
  分子或分母超过 $10^8$ 视为非有理数），能化成分数就按实数幂算。
- 约定 $0^0=1$。

## 5.2 计算

- 任何 `NaN` 参与运算都得 `NaN`；任何数除以 0 得 `NaN`。
- `&` 是文本连接：`a&b` 中只要有一个不是数，就会强制转成字符串。
  `a=1`、`b=2` 时 `a&b` 得 `"12"`，`"a="&a&",b="&b` 得 `"a=1,b=2"`。

## 5.3 运算符与函数

运算符：

| 类别 | 符号 |
| --- | --- |
| 数学 | `+ - * / ^ !`（阶乘） |
| 字符串 | `&` |
| 逻辑 | `< > = <= >= == && \|\|` |

函数表（不区分大小写，输入时括号可省略但虚拟键盘会补上）：

| 函数 | 说明 |
| --- | --- |
| `sin` `cos` `tan` `csc` `sec` `cot` | 三角函数，弧度制 |
| `asin` `acos` `atan` `acsc` `asec` `acot` | 反三角函数（`arcsin` 等也可识别） |
| `sinh` `cosh` `tanh` `csch` `sech` `coth` | 双曲函数 |
| `asinh` `acosh` `atanh` `acsch` `asech` `acoth` | 反双曲函数 |
| `ln` `log` | 对数，`log(x)=log10(x)` |
| `alog` | 反常用对数，`alog(x)=10^x` |
| `abs` | 绝对值 |
| `floor` `ceil` `round` | 下取整 / 上取整 / 四舍五入 |
| `sqrt` `cbrt` | 平方根 / 立方根 |
| `min` `max` | 最值 |
| `if` | `if(条件, 值)`，不满足条件返回 `NaN` |
| `ifelse` | `ifelse(条件, 值1, 值2)` |
| `case` | `case(u,x,v,y)`：u 真返回 x（跳过 v），v 真返回 y（先算 u） |
| `gamma` | Gamma 函数 |
| `zeta` | Riemann Zeta |
| `erf` `erfc` | 高斯误差函数及其补函数 |
| `sgn` | 符号函数：>0 得 1，<0 得 -1，否则 0 |
| `lambertW` | Lambert W 主分支 |
| `expIntegral` `sinIntegral` `cosIntegral` `Li` | 指数 / 正弦 / 余弦 / 对数积分 |
| `beta` `psi` | Beta、digamma |
| `FresnelS` `FresnelC` | 菲涅尔积分 |
| `EllipticK` `EllipticE` | 第一 / 第二类完全椭圆积分 |
| `sinc` | $\frac{\sin x}{x}$ |
| `SinhIntegral` `CoshIntegral` | 双曲正弦 / 余弦积分 |
| `not` `and` `or` | 逻辑运算，`(a)and(b)`、`(a)&&(b)` |
| `mod` | 取模，余数总为正 |

4.10 起 `ifelse(b,x,y)` 可以写成三目 `(b ? x : y)`。于是符号函数可以写：

```text
sgnx = (x==0 ? 0 : x/absx)
```

## 5.4 高级运算符

v4.4 起支持，可嵌套。例如

$$\sum_{x=0}^{100}\sum_{y=0}^{100}(2x+y)$$

写成 `sum(sum(2x+y,x,0,100),y,0,100)`。

### 求和

```text
sum(f(v), v, min, max)
```

上下界可以是表达式，甚至包含高级运算符。

```text
sum(1/x^10, x, 1, 100)
```

这是 $\zeta(10)$ 的好近似，乘以 $\frac{93555}{\pi^9}$ 一类系数还能反推 π 的小数。

### 求乘积

```text
prod(f(v), v, min, max)
prod(y, y, 1, 10)     // 10! = 3628800
```

若某个 $f(v)=0$ 会立即停止。利用这一点可以做质数判断：

```text
prod(not(mod(n,v)==0), v, 2, ceil(sqrt(n)))
```

`n=43` 得 1（真），`n=20` 得 0（假）。要包含 2 的情况：

```text
(n==2 ? true : prod(not(mod(n,v)==0), v, 2, ceil(sqrt(n))))
```

### 定积分

```text
int(f(v), v, min, max)
```

Gauss–Kronrod 自适应积分，默认会自动判断敛散性，也可在设置里关掉 / 调整递归上限。

```text
int(tt, t, 0, 3)                  // 9
int(exp(-t)*t^(x-1), t, 0, 99)    // gamma 函数定义式（用 99 代替 +∞）
```

### 求导

```text
diff(f(v), v, v0)
```

中心差分，$\Delta x = 10^{-5}$：

```text
diff(sinx, x, 1)     // sin 在 1 处的导数
diff(sinx, x, x)     // 导函数
```

### fSolve

Newton 法求数值解：

```text
fSolve(x^2-2, x, 1)          // 1.414213562373095
fSolve(sin(t)-x, t, x)       // arcsin 的图像
```

也可以用来求交点：把两条曲线联立后，用初值挑出想要的那个根。

## 5.5 构造指引

### 分段函数

```text
ifelse(x<0, -x, x^2)
(x<0)(-x) + (x>=0)x^2
```

后者利用 `true=1 / false=0`，乘出来天然是分段。

### 距离

```text
dis(x,y)=sqrt(xx+yy)
dis2(x1,y1,x2,y2)=sqrt((x1-x2)^2+(y1-y2)^2)
```

### 限制定义域

```text
y=if(-1<=x<=2, x^2)
```

用乘法写法 `y=(-1<=x<=2)x^2` 在区间外会得到 `y=0` 而不是不画。也可以借定义域有限的函数
“污染”表达式：`y=x^2+0/sqrt(1+x)+0/sqrt(2-x)`（SGC 没有 CAS，不会把 `x+0` 化简掉）。
