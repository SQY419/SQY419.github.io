with open('runtime.md', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.splitlines()
new_lines = []
skip_until_next_header = False

for i, line in enumerate(lines):
    # 跳过关于删除旧的描述
    if '删除旧积分路径' in line or '删除旧的' in line or '删除未接线的' in line:
        continue
    # 也跳过关于最初积木数量的句子
    if '最初 `main` sprite' in line:
        continue
    # 检查是否是列表缩行 (starts with -) 且前面是一个被跳过的行
    # 简单处理：如果前一行是 blank 且当前行以 - 开头，跳过
    if new_lines and new_lines[-1].strip() == '' and line.strip().startswith('-'):
        continue
    new_lines.append(line)

with open('runtime.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))
print("cleaned runtime.md")
