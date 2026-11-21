# 列表与字符串

## 创建列表

```text
a = [0, 1, 2, 3, 4, 5];
b = [0, 1, 2, [3, 4, 5]];   // 可嵌套
c = Array[5];               // 5 个空位
d = [];                     // 空列表
```

## 索引

**下标从 1 开始**，支持负索引（`-1` 是最后一项）：

```text
c = [0,1,2,3,4,5];
print(c[2]);      // 1
print(c[-1]);     // 5

print("hello SGC!"[1]);    // "h"
print("hello SGC!"[-1]);   // "!"
```

字符串也能这样取字符，这一点在拼字符串时很有用。

### 赋值与越界

```text
c[2] = "aaa";     // 把第二项换掉
```

- 一维**正索引**越界会自动填充 0：`test=[0,1,2]; test[5]=3;` 之后是 `[0,1,2,0,3]`；
- 多维越界会报错：`test[2][5]=3`；
- **负索引**越界也报错：`test[-5]` → `Error: Array index out of range`。

## 增删

```text
test = [0,1,2];
test.append(3);          // 末尾追加 → [0,1,2,3]
test.insert(2, 666);     // 在第 2 项前插入 → [0,666,1,2,3]
test.remove(2);          // 删除第 2 项 → [0,1,2,3]
```

`insert` / `remove` 的索引越界都会抛错。

## 拆分与拼接

```text
c = [];
c.split("a,b,c,SGC");         // 默认按逗号
c.split("a|b|c|SGC", "|");    // 指定分隔符
```

返回的是列表：

```text
["a","b","c","SGC"]
```

压平与串联：

```text
flatten([0,1,[0,1,[0,1,2]]]);   // [0,1,0,1,0,1,2]
concat([0,1], [2], "SGC");      // [0,1,2,"SGC"]
```

## 统计与查找

| 调用 | 结果 |
| --- | --- |
| `length(a)` | 列表长度 / 字符串字符数 / 数字转字符串后的长度 |
| `find(a,b)` | b 第一次出现的位置，找不到返回 0 |
| `count(a,b)` | b 出现的次数 |
| `substr(s,a,b)` | s 的第 a 到 b 个字符 |

```text
s = "hello SGC!";
print(length(s));          // 10
print(find(s, "SGC"));     // 7
print(substr(s, 1, 5));    // "hello"
```

## 实用片段

### 求和

```text
total = 0;
i = 1;
while i <= length(nums) {
    total = total + nums[i];
    i++;
}
```

### 反转字符串

```text
s = "hello";
out = "";
i = length(s);
while i >= 1 {
    out = out & s[i];
    i--;
}
print(out);      // "olleh"
```

### 逐行处理文本

```text
lines = [];
lines.split(text, "\n");
```

`&` 用来拼字符串，任一侧不是数时会强制转成字符串。
