# 动画与声音

## 逐帧动画

脚本通过 `frame` 库驱动 SGC 的帧动画，和输入区里的 `#n` 配合：

```text
polygon((0,0),(1,1),(2,0),(0,0))#1
```

表示这个多边形只在第 1 帧显示。

| 调用 | 作用 |
| --- | --- |
| `frameSpeed(1.5)` | 设置速度，默认 1 |
| `frameMax(6000)` | 最大帧数，上限 99999 |
| `frameStart()` | 开始播放 |
| `frameStop()` | 停止播放 |

```text
frameSpeed(1.14514);
frameMax(6000);
frameStart();
```

播放与暂停也可以点动画控制台里的按钮；「帧：***」可以跳到指定帧。

## 用脚本做时间轴

想在每一帧做点别的事（改颜色、移动坐标系），就在脚本里自己维护帧号：

```text
refresh(false);

frame = 1;
while frame <= 120 {
    clean();
    // 用一个圆周上的点表示进度
    angle = frame / 120 * 6.283185307179586;
    point(cos(angle), sin(angle), "00999900");
    refresh();

    frame++;
    ticks();     // 让出一帧
}
```

`ticks()` 在这里只是提供一个时间锚点；真正的调速靠 `frameSpeed` 或调整循环步长。

## 声音

```text
loadSound("https://sqy419.axolotlpower.com/download/assets/music/omr.mp3", "test");
playSound("test");
```

从本地加载（同一个音频文件）：

```text
loadsound("test");   // 从本地文件加载，命名为 test
playSound("test");
```

- `loadSound(url, 名称)`：网络加载；
- `loadsound(名称)`：本地加载；
- `playSound(名称)`：播放。

!!! tip "预加载"
    `loadSound` 只下载，不播放。先把要用的音频都加载好，播放时就不会卡。

## 配合输入区动画

输入区变量本身也能做动画（设置 → 变量设置 → 动画模式：往返循环 / 单向循环 / 单增一次）。
脚本改变量值同样会立刻反映到图上：

```text
a = 0;
while a <= 2 {
    a = a + 0.01;
    refresh();
}
```

输入区里只要有依赖 `a` 的表达式，图形就会跟着动。
