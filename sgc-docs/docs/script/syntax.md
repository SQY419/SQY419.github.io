# 语法与流程

## 注释与语句

```text
// 这是注释，直到行尾
a = 1;
```

语句用分号分隔，也可以靠换行。SGC Script 不区分大小写（包括函数名）。

## 数据类型

| 类型 | 例子 |
| --- | --- |
| 数 | `1`、`-2.5`、`0.333333333333333`（不区分 int / float） |
| 字符串 | `"hello SGC!"`、`"SQY!+-*/"` |
| 布尔 | `true`、`false` |
| 列表 | `[1, 2, 3]`、`[1, [2, [3]]]`、`[]` |

## 运算符

```text
+  -  *  /  ^
<  >  ==  <=  >=  !=
%  &&  ||  and  or  not
```

`+` 在字符串之间是拼接，`%` 是取模。逻辑运算里 `true=1`、`false=0`，
所以 `(x<0)(-x) + (x>=0)x^2` 这种写法在脚本里同样成立。

## 变量

```text
a = 1;
b = "text";
```

- 首字符不能是数字；
- 不能用关键字命名（`while`、`if`、`define`、`local`、`return`、`true`、`false`…）；
- 赋值即创建，作用域默认是全局。

### local

在函数里需要独立变量时，必须用 `local` 声明，否则递归会互相覆盖：

```text
define f(x){
    if x > 2 { return; }
    local i = 0;
    while i < 3 {
        print([i, x]);
        f(i);
        i++;
    }
}
```

把 `local i = 0;` 换成 `i = 0;`，输出会完全不同——`i` 成了全局变量，
递归调用会把它改掉。

## 分支

```text
if 条件 {
    语句;
}

if 条件 {
    语句;
} else {
    语句;
}
```

没有 `else if` 语法，需要时嵌套：

```text
if x > 0 {
    print("正");
} else {
    if x < 0 {
        print("负");
    } else {
        print("零");
    }
}
```

## 循环

只有 `while`：

```text
i = 0;
while i < 10 {
    print(i);
    i++;
}
```

`break` 跳出当前循环，支持嵌套：

```text
a = 0;
while a <= 100 {
    a++;
    if a == 50 { break; }
}
print(a);      // 50
```

!!! warning "没有 continue / for"
    需要“跳过本次”时，用 `if` 把后面的语句包起来。

## 函数

```text
define hello(x){
    print(x);
    return x;
}

define Fib(x){
    if x == 1 || x == 2 { return 1; }
    else { return Fib(x - 1) + Fib(x - 2); }
}
print(Fib(6));      // 8
```

- `return` 可以不带值，表示提前结束；
- 支持递归，参数与局部变量用 `local` 管好；
- 参数个数必须匹配，否则抛错：`Function 'get' expected 1 argument, but 0 were given`。

## 常见错误

| 现象 | 原因 |
| --- | --- |
| `Array index out of range` | 索引越界（负索引越界也报这个） |
| `expected N argument` | 调用参数个数不对 |
| 脚本卡住 | `while` 条件永远成立，按「强行停止」 |
| 递归爆栈 | 缺终止条件，或 `local` 没写导致状态串了 |
