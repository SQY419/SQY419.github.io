# 示例集

## 化简与展开

```text
simplify(2*x + 3*x - x)
> 4*x

simplify(x+2*x)
> 3*x

simplify(sin(x+y)^2+cos(y+x)^2)
> 1

expand((x+1)^3)
> x^3 + 3*x^2 + 3*x + 1

expand((x+1)^10)
> x^10 + 10*x^9 + ... + 1
```

## 求导

```text
diff(sin(x^2))
> 2*cos(x^2)*x

diff(5^x)
> ln(5)*5^x

diff(x^x)
> ln(x)*x^x + x^x

diff(x^2.5)
> 5/2*x^(3/2)

diff(y,y)
> 1
```

## 根式与幂

```text
sqrt(8)
> 2*sqrt(2)

sqrt(9)
> 3

sqrt(8/9)
> 2/3*sqrt(2)

8^(1/3)
> 2

12^(1/2)
> 2*sqrt(3)

sqrt(x)-x^(1/2)
> 0

sqrt(x)^3
> sqrt(x)*x

sqrt(x)^4
> x^2
```

## 特殊角

```text
sin(pi/8)    -> 1/2*sqrt(-sqrt(2) + 2)
cos(pi/8)    -> 1/2*sqrt(sqrt(2) + 2)
tan(pi/8)    -> sqrt(2) - 1

sin(pi/5)    -> 1/4*sqrt(-2*sqrt(5) + 10)
cos(pi/5)    -> 1/4*sqrt(5) + 1/4
tan(pi/5)    -> sqrt(-2*sqrt(5) + 5)
```

## 极限与级数

```text
limit(sqrt(1+x^2)/x, x, oo)
> 1

limit(1/x, x, oo)
> 0

series(1/(e^(-x)+1), x=oo, 5)
> -e^(-x) - e^(-3*x) - e^(-5*x) + e^(-2*x) + e^(-4*x) + 1
```

## 大数

```text
approx(2^(2^100))
> 1e381600854690000000000000000000

(1+sqrt(2))^50
> 4866752642924153522*sqrt(2) + 6882627592338442563

10^20*x + 10^20*x
> 200000000000000000000*x

(10^20+1)*(10^20-1)
> 9999999999999999999999999999999999999999
```

## 多项式

```text
gcd(x^3+y^3,x^5+y^5)
> x + y

simplify((x^3+y^3)/(x^5+y^5))
> (x^2 - x*y + y^2)/(x^4 - ... + y^4)
```

## 代入

```text
subst(x^2, x=(a+1))
> (a + 1)^2

subst(x^2 + 2*x + 1, x=3)
> 16

ln(exp(x))
> x

exp(ln(x))
> x
```
