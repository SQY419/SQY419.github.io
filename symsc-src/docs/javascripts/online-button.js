/* 「在线版」入口
   单文件计算器放在 docs/symSC.html，构建后就是 <站点>/symSC.html。
   想换版本时只替换这一个文件即可，这里不需要改。 */
(function () {
  function appUrl() {
    // 站点可能挂在 /symsc/ 下，也可能在本地预览时挂在根路径
    var path = window.location.pathname;
    var i = path.indexOf("/symsc/");
    return (i >= 0 ? path.slice(0, i) : "") + "/symsc/symSC.html";
  }

  function mount() {
    var nav = document.querySelector(".md-header__inner");
    if (!nav || nav.querySelector(".symsc-online")) return;

    var a = document.createElement("a");
    a.className = "symsc-online";
    a.href = appUrl();
    a.target = "_blank";
    a.rel = "noopener";
    a.title = "在新标签页打开 symSC 在线版";
    a.innerHTML =
      '<span class="symsc-online__icon" aria-hidden="true">▶</span>' +
      '<span class="symsc-online__text">在线版</span>';

    // 放在搜索框（或仓库链接）左边，尽量贴近页头右侧的常规操作区
    var anchor =
      nav.querySelector('label[for="__search"]') ||
      nav.querySelector(".md-header__source");
    if (anchor) {
      nav.insertBefore(a, anchor);
    } else {
      nav.appendChild(a);
    }
  }

  // 侧栏里的「在线版」也开新标签页，别把文档刷走
  function decorateNav() {
    var links = document.querySelectorAll('.md-nav__link[href$="symSC.html"]');
    for (var i = 0; i < links.length; i++) {
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  mount();
  decorateNav();
  document.addEventListener("DOMContentLoaded", function () {
    mount();
    decorateNav();
  });
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function () {
      mount();
      decorateNav();
    });
  }
})();
