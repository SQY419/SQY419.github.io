#!/bin/sh
# 构建 SGC 在线文档：源码 symsc-src/ → 产物 symsc/
# 依赖装在工作区 /workspace/pylib（mkdocs 9.8.2 / mkdocs-material 9.8.2）
set -e
cd "$(dirname "$0")"
export PATH="/usr/local/bin:$PATH"
export NO_MKDOCS_2_WARNING=1
mkdocs build --strict "$@"
echo "done → $(cd ../symsc && pwd)"
