import re, os

files = ['calculus.md', 'sum-series.md']

for name in files:
    path = name
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 匹配 "DSL 删除了旧的 ... 调用；"
    content = re.sub(r'DSL 删除了旧的 `integ_rational_linear` 分支，统一在 `K_MUL` / `K_POW` 的兜底位置调用；', '', content)
    
    # 重新检查
    if '旧 实现里' in content:
        print(f"仍有 旧 实现里 in {name}")
    if '删除了旧的' in content:
        print(f"仍有 删除了旧的 in {name}")
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Done {name}")
