"""把没写进 nav 的 Markdown 自动挂到「未归类」下。

这样在 GitHub 网页上直接新建 .md 也能出现在站点里，不必手改 mkdocs.yml。
已写进 nav 的页面不会重复出现。
"""

import os


def _collect(value, out):
    """递归收集 nav 里出现过的文件路径。"""
    if isinstance(value, str):
        out.add(value)
    elif isinstance(value, list):
        for item in value:
            _collect(item, out)
    elif isinstance(value, dict):
        for item in value.values():
            _collect(item, out)


def on_config(config):
    nav = config.get("nav") or []
    listed = set()
    _collect(nav, listed)

    docs_dir = config["docs_dir"]
    if not os.path.isabs(docs_dir):
        base = os.path.dirname(config["config_file_path"])
        docs_dir = os.path.join(base, docs_dir)

    missing = []
    for root, dirs, files in os.walk(docs_dir):
        dirs[:] = [d for d in dirs if not d.startswith(".") and d != "assets"]
        for name in files:
            if not name.endswith(".md"):
                continue
            rel = os.path.relpath(os.path.join(root, name), docs_dir)
            rel = rel.replace(os.sep, "/")
            if rel.startswith(".") or rel in listed:
                continue
            missing.append(rel)

    if missing:
        missing.sort()
        nav.append({"未归类": missing})
        config["nav"] = nav

    return config
