# 系统操作

脚本通过 `system` 库直接改 SGC 的输入区与坐标系。

## 输入区

```text
addinput("y=x^2");
```

在当前输入区末尾添加一条。参数必须是字符串，传数字会自动转成字符串。

```text
addinput("y=x^2", "00999900", 1);
```

第二个参数是颜色（`aabbccdd`，见[约定](../conventions.md)），第三个是是否显示。

```text
delinput(3);     // 删除第 3 条
delinput();      // 不传参 = 清空所有输入
```

改颜色与读取：

```text
sgcInputColor(2, "62999900");   // 把第 2 条改成蓝色
all = sgcInput();               // 取出所有输入
```

## 坐标系

```text
sgcTrans(1.5, 1);            // 原点左移 1.5、上移 1
sgcScale(sgcScale() / 2.6);  // 单位长度放大 2.6 倍
```

读取当前状态：

```text
sgcTrans()[1];   // x 方向偏移
sgcTrans()[2];   // y 方向偏移
sgcScale();      // 当前缩放
```

利用这两个函数可以做“镜头运动”：在 `while` 里逐步改 `sgcTrans` / `sgcScale`，
每步 `refresh()` 一次，就是一段平滑的推拉镜头。

## 时间与鼠标

| 调用 | 含义 |
| --- | --- |
| `ticks()` | 启动以来的毫秒数 |
| `time()` | 24 小时制时间；`time(1..3)` 取时、分、秒 |
| `mouse(3)` `mouse(4)` | 鼠标在坐标系中的 x、y |
| `mouse(0)` | 鼠标是否按下（1 / 0） |

```text
t0 = ticks();
// …做点事…
print((ticks() - t0) / 1000);   // 用时（秒）
```

## 文件、网络与输入

| 调用 | 作用 |
| --- | --- |
| `load()` | 从本地加载文件为字符串 |
| `getFileUrl()` | 从本地加载文件为 URL |
| `get(url)` | 取回 URL 的内容 |
| `input(title)` | 弹窗让用户输入字符串 |

```text
name = input("你的名字？");
print("hello " & name);
```

!!! warning "网络请求是阻塞的"
    `get()` 在返回前会卡住整个脚本；别在动画循环里频繁调用。

## 一个例子：自动铺一列函数

```text
clean();
i = 0;
while i < 5 {
    addinput("sin(x+" & i & ")");
    i++;
}
```

每运行一次就多 5 条正弦曲线（记得先清屏或改 `delinput()`）。
