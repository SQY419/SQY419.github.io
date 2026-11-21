# 8 脚本

SGC Script 是栈式编译语言，用来操作 SGC 底层、改设置、做演示动画。已更新到 SGC Script II。

## 8.1 编辑器

菜单 → 高级功能 → 脚本进入编辑器。字体为 JetBrains Mono，带连字，当前行高亮。
工具栏：运行、强行停止、返回编辑器、清空、打开、保存。

## 8.2 语法

`//` 之后到行尾是注释。

### 数据类型与运算符

支持数、字符串、布尔、数组：

```text
1
-2.5
"hello SGC!"
[1, 2, 3]
[1, [2, [3]]]
```

运算符：`+ - * / ^ < > == <= >= != % && || and or not`
数学函数：`sin cos tan ln log sqrt abs floor ceil round min max random`
字符串/列表：`substr length string number find count concat flatten`
扩展：`load get getFileUrl getInput ticks`

`min`、`max` 这类参数个数可变的属于 `BUILTIN_VAR`，其余固定参数的属于 `BUILTIN`。
关键字还有 `split`、`define`、`local`。

| 函数 | 说明 |
| --- | --- |
| `substr(s,a,b)` | s 的第 a 到 b 个字符 |
| `length(a)` | 列表长度 / 字符串字符数 / 数字转字符串后的长度 |
| `find(a,b)` | b 在 a 中第一次出现的位置，找不到返回 0 |
| `count(a,b)` | b 在 a 中出现的次数 |
| `load()` `getFileUrl()` | 从本地加载文件为字符串 / URL |
| `input(title)` | 弹窗输入字符串 |
| `get(url)` | 取回 URL 内容 |
| `round(a[,b])` | 保留 b 位小数 |
| `random(a,b)` | 区间随机数 |
| `ticks()` | 计时器（ms） |

参数个数不匹配会抛出错误。

### 变量

```text
a = 1;
b = "text";
```

变量首字符不能是数字，不能用关键字。局部变量用 `local` 声明，例如在函数里。

### 列表

索引从 1 开始，支持负索引（`c[-1]` 是最后一项），字符串也能这样取字符：

```text
print("hello SGC!"[1]);    // "h"
print("hello SGC!"[-1]);   // "!"
```

```text
test = [0,1,2];
test.append(3);      // [0,1,2,3]
test.insert(2,666);  // 在第二项前插入
test.remove(2);      // 删除第二项
```

一维正索引越界会自动填充（`test[5]=3` 补 0），负索引越界则报错。
`split` 拆分、`flatten` 压平、`concat` 串联：

```text
c.split("a,b,c,SGC");      // 默认逗号
c.split("a|b|c|SGC","|");
flatten([0,1,[0,1,[0,1,2]]]);
concat([0,1],[2],"SGC");
```

### 循环与分支

只有 `while`，可用 `break`，支持嵌套：

```text
a = 0;
while a <= 100 {
    a++;
    if a == 50 { break; }
}
print(a);
```

```text
if k % 2 == 0 {
    print(k + "是偶数");
} else {
    print(k + "是奇数");
}
```

### 函数

```text
define hello(){
    print("hello sgc!");
}

define Fib(x){
    if x == 1 || x == 2 { return 1; }
    else { return Fib(x - 1) + Fib(x - 2); }
}
```

支持递归。`local` 声明局部变量，全局写法会在递归时互相覆盖，结果不同。

## 8.3 操作底层

```text
addinput("y=x^2");
addinput("y=x^2", "00999900", 1);   // 颜色 + 是否显示
delinput(3);                        // 删第 3 项，不传参则清空
sgcInputColor(2, "62999900");
```

```text
sgcTrans(1.5, 1);          // 原点左移 1.5、上移 1
sgcScale(sgcScale()/2.6);  // 单位长度放大 2.6 倍
```

## 8.4 系统常数

```text
sgcInput()      // 所有输入
ticks()         // 启动以来的毫秒数
time()          // 24 小时制时间，time(1..3) 取时分秒
mouse(3) mouse(4)   // 鼠标在坐标系中的坐标
mouse(0)        // 是否按下
```

## 8.5 图形库

```text
refresh();          // 刷新一次
refresh(false);     // 关闭自动刷新
clean();            // 清空脚本图层

point(1, 2);
point(1, 2, "red");
line(1, 2, 4, 5);
text("Hello SGC!", 0, 0, 1, 0, 1, 0);
rect(1, 2, 4, 5);
fillrect(1, 2, 4, 5, "red");
circ(0, 0, 1);
fillcirc(0, 0, 1, "blue");
```

图片先缓存再显示：

```text
loadImage("https://sqy419.axolotlpower.com/sgc/v4/logo00.svg", "myImage");
image("myImage", 0, 0, 100, 0);
```

## 8.6 动画

```text
frameSpeed(1.14514);
frameMax(6000);   // 最大 99999
frameStart();
frameStop();
```

## 8.7 声音

```text
loadSound("https://sqy419.axolotlpower.com/download/assets/music/omr.mp3", "test");
loadsound("test");     // 从本地加载，命名为 test
playSound("test");
```
