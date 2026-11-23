import re, os

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 删除模式1: "旧实现里..." 整句
    # 模式包括多个单词直到句号、分号或换行
    patterns = [
        # "旧实现里...修正。" 这类
        r'旧实现里[^\n]*\n[^\n]*[。\.]',
        # "旧 native ... 已删除，..."
        r'旧 [^\n]*已删除，[^\n]*\n',
        # "删除了旧的...调用；"
        r'DSL 删除了旧的 [^\n]*调用[;、]',
        # "仍走旧规则输出"
        r'仍走旧规则输出 [^\n]*[。]',
    ]
    
    modified = content
    for i, pat in enumerate(patterns):
        modified, count = re.subn(pat, '', modified, flags=re.IGNORECASE)
        if count:
            print(f"  删除模式{i+1}: {count} 处")
    
    return modified

files = [
    'calculus.md',
    'lexing-numbers.md',  # 也要检查这个
    'runtime.md',
    'solve-factor.md',
    'sum-series.md'
]

for name in files:
    path = os.path.join('.', name)
    if os.path.exists(path):
        orig = open(path, 'r', encoding='utf-8').read()
        new = process_file(path)
        if new != orig:
            open(path, 'w', encoding='utf-8').write(new)
            print(f"已处理 {name}")
        else:
            print(f"未修改 {name}")
    else:
        print(f"文件不存在: {name}")
