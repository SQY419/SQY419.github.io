(function () {
    var toggle = document.querySelector('.menu-toggle');
    var links = document.getElementById('sgc-nav-links');
    if (!toggle || !links) return;

    function setOpen(open) {
        links.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    }

    toggle.addEventListener('click', function (event) {
        event.stopPropagation();
        setOpen(!links.classList.contains('open'));
    });

    links.addEventListener('click', function (event) {
        if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.navbar')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') setOpen(false);
    });

    var desktop = window.matchMedia('(min-width: 769px)');
    if (desktop.addEventListener) {
        desktop.addEventListener('change', function (event) {
            if (event.matches) setOpen(false);
        });
    }
})();
