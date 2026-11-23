# calculus.md: 删除技术细节过多的串行条目，精简结构
# 但我们只删除旧相关表述，保持内容完整，因为用户说要的是现在的行为

with open('runtime.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 删除未来计划段（从"进一步路线"开始到文件结束）
new_lines = []
in_future = False
for line in lines:
    stripped = line.strip()
    if stripped.startswith('进一步路线'):
        in_future = True
        continue
    if in_future:
        if line.strip() and not line.strip().startswith('1.'):
            # 如果是非列表项，也标记未来
            pass
        elif line.strip().startswith('1.') or line.strip().startswith('2.') or line.strip().startswith('3.') or line.strip().startswith('4.'):
            continue
        else:
            # 未来的段落结束
            in_future = False
    new_lines.append(line)

with open('runtime.md', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print("裁减 runtime.md 未来路线")
