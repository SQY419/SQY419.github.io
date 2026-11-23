/* 侧栏里的站外链接（默认是「在线版 ↗」）在新标签页打开，
   免得点一下把文档刷走。链接本身写在 mkdocs.yml 的 nav 里。 */
(function () {
  function decorate() {
    var links = document.querySelectorAll(
      '.md-nav__link[href^="http"], .md-nav__link[href$="symSC.html"]'
    );
    for (var i = 0; i < links.length; i++) {
      // 只处理导航项，正文里的站外链接保持原样
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }
  decorate();
  if (window.document$) {
    window.document$.subscribe(decorate);
  }
})();
