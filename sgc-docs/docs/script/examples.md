# 完整示例

## 例 1：质数表

朴素试除法：`n` 只要有一个大于 1、小于自身的因数就不是质数。

```text
define isPrime(n){
    if n < 2 { return false; }
    v = 2;
    while v * v <= n {
        if n % v == 0 { return false; }
        v++;
    }
    return true;
}

n = 2;
while n <= 100 {
    if isPrime(n) { print(n); }
    n++;
}
```

- `v * v <= n` 比 `v <= n/2` 快得多；
- `return` 会立刻结束函数，所以找到一个因数就退出。

## 例 2：数字时钟

```text
define fix(x){
    return ifelse(length(x) == 1, "0" & x, x);
}

while true {
    print(fix(time(1)) & ":" & fix(time(2)) & ":" & fix(time(3)));
    wait();
}
```

`time(1..3)` 取时、分、秒；`length` 判断是否要补零。
实际运行时用动画循环或 `ticks()` 控制刷新频率，别真的死循环刷屏。

## 例 3：用脚本画函数图像

自己采样、自己连线，可以精确控制采样密度和断开逻辑：

```text
define plot(expr, from, to, step){
    x = from;
    prev = expr(x);
    while x <= to {
        x = x + step;
        y = expr(x);
        if abs(y - prev) < 100 {
            line(x - step, prev, x, y, "00999900");
        }
        prev = y;
    }
}
```

SGC Script 不能把表达式当函数传参，所以实际写法是直接在循环里算：

```text
clean();
refresh(false);

x = -6.283;
prev = sin(x);
while x < 6.283 {
    x = x + 0.01;
    y = sin(x);
    if abs(y - prev) < 1 {
        line(x - 0.01, prev, x, y, "00999900");
    }
    prev = y;
}
refresh();
```

`abs(y - prev) < 1` 就是在模仿 SGC 内部的断点判断——不满足就断开，避免把
$\tan x$ 的两支连起来。

## 例 4：抛物线上的动点

```text
clean();
refresh(false);

t = -3;
while t <= 3 {
    point(t, t * t, "00999900");
    t = t + 0.05;
}
refresh();

// 让小球沿着抛物线跑
t = -3;
while t <= 3 {
    clean();
    point(t, t * t, "dd000000");
    refresh();
    t = t + 0.02;
}
```

第二段循环每步都 `clean()` 再画一个点，看起来就是一个点在抛物线上滑动。

## 例 5：鼠标画板

```text
clean();
refresh(false);

while true {
    if mouse(0) == 1 {
        point(mouse(3), mouse(4), "00999900");
        refresh();
    }
}
```

- `mouse(0)` 判断是否按下；
- `mouse(3)`、`mouse(4)` 是鼠标当前在坐标系里的位置；
- 因为关掉了自动刷新，所以按下时才手动 `refresh()`，比每帧全量重绘省很多。

## 例 6：批量生成函数并做平移演示

```text
clean();

i = 0;
while i < 6 {
    addinput("sin(x+" & i & ")", "00999900", 1);
    i++;
}

// 把镜头慢慢拉远
k = 1;
while k < 3 {
    sgcScale(sgcScale() * 1.02);
    refresh();
    ticks();
    k = k + 0.02;
}
```

配合输入区的参数变量，可以做出“一族曲线依次出现”的演示效果。

## 调试建议

1. **先关自动刷新**：`refresh(false)`，画完再 `refresh()`；
2. **用 `print` 打点**：脚本的 `print` 输出在终端，和输入区的输出分开；
3. **死循环要有出口**：`while true` 一定要配合「强行停止」或内部 `break`；
4. **注意 `local`**：递归函数里忘了写 `local`，结果会莫名其妙。
