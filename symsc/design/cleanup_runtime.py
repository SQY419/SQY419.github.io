with open('runtime.md', 'r', encoding='utf-8') as f:
    content = f.read()

# 删除整个表格（用例数量演进表格）
import re
# 找出表格开始的行
table_start = content.find('## 用例数量演进')
if table_start != -1:
    # 找到下一个间接标题或结束
    table_end = content.find('## ', table_start + 1)
    if table_end == -1:
        table_end = len(content)
    content = content[:table_start] + content[table_end:]
    
with open('runtime.md', 'w', encoding='utf-8') as f:
    f.write(content)
print("removed 用例数量演进")
