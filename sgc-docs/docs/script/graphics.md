# 图形库

脚本画的东西在**独立的脚本图层**上，不影响函数图像，也不进入 `.sgc` 存档。

## 刷新模型

默认每次绘图都会立刻刷新，所以画几百个点会非常慢。正确做法：

```text
refresh(false);   // 关掉自动刷新
// …画很多东西…
refresh();        // 一次性刷新
```

```text
clean();          // 清空脚本图层
```

## 图元

| 调用 | 说明 |
| --- | --- |
| `point(x, y[, color])` | 画一个点 |
| `line(x1, y1, x2, y2[, color])` | 线段 |
| `rect(x1, y1, x2, y2[, color])` | 矩形边框 |
| `fillrect(x1, y1, x2, y2[, color])` | 填充矩形 |
| `circ(x, y, r[, color])` | 圆边框 |
| `fillcirc(x, y, r[, color])` | 填充圆 |
| `text(文本, x, y, size, ?, font, color)` | 文字 |

```text
point(1, 2);
point(1, 2, "red");
line(1, 2, 4, 5);
rect(1, 2, 4, 5);
fillrect(1, 2, 4, 5, "red");
circ(0, 0, 1);
fillcirc(0, 0, 1, "blue");
text("Hello SGC!", 0, 0, 1, 0, 1, 0);
```

不填颜色就用默认色。除内置名字（`"red"` 等）外，也可以用 `aabbccdd` 颜色码。

## 图片

```text
loadImage("https://sqy419.axolotlpower.com/sgc/v4/logo00.svg", "myImage");
image("myImage", 0, 0, 100, 0);
```

- `loadImage(url, 名称)` 只负责下载进缓存；
- `image(名称, x, y, 尺寸, 透明度)` 负责显示，最后一个参数可以不写；
- 同一个图片只需 `loadImage` 一次，之后可以反复 `image`。

## 例：自己描一条正弦曲线

```text
clean();
refresh(false);

x = -6.28;
while x <= 6.28 {
    y = sin(x);
    point(x, y, "00999900");
    x = x + 0.02;
}

refresh();
```

用 `line` 连起来更像“函数图像”：

```text
clean();
refresh(false);

x = -6.28;
prevY = sin(x);
while x <= 6.28 {
    y = sin(x);
    line(x - 0.02, prevY, x, y);
    prevY = y;
    x = x + 0.02;
}

refresh();
```

## 例：画坐标系网格

```text
clean();
refresh(false);

i = -10;
while i <= 10 {
    if i != 0 {
        line(i, -10, i, 10, "aaaaaa00");
        line(-10, i, 10, i, "aaaaaa00");
    }
    i++;
}

line(-10, 0, 10, 0);
line(0, -10, 0, 10);
refresh();
```

## 例：进度条

```text
clean();
refresh(false);

i = 0;
while i <= 100 {
    clean();
    fillrect(0, 0, 10, 1, "dddddd00");
    fillrect(0, 0, i / 10, 1, "00999900");
    refresh();
    i++;
}
```

!!! note "层级"
    脚本图层永远在函数图像之上；要盖住某个对象，只能调整输入顺序或透明度。
