/* ===========================================================
   SGC · 坐标系工作台
   - 背景是可拖动的坐标系网格（canvas 绘制，随平移无限延伸）
   - 四张卡片贴在坐标系上，可拖动、可展开收起
   =========================================================== */
(function () {
    'use strict';

    var UNIT = 44;              // 一个小格 = 44px
    var MAJOR = 5;              // 每 5 格一条主网格线
    var canvas = document.getElementById('grid');
    var ctx = canvas.getContext('2d');
    var stage = document.getElementById('stage');
    var panels = [].slice.call(document.querySelectorAll('.panel'));
    var fullBtn = document.getElementById('fullscreen-btn');

    var tx = 0, ty = 0;         // 世界原点在屏幕上的位置
    var vw = 0, vh = 0;
    var zTop = 10;              // 置顶用的层级计数器

    /* ---------------- 视图 ---------------- */
    function applyView() {
        stage.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
        draw();
    }

    /* ---------------- 网格绘制 ---------------- */
    function draw() {
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var w = vw, h = vh;

        if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
        }

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        var u = UNIT;

        /* 次网格线 */
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(26,23,18,0.10)';
        ctx.beginPath();
        var x0 = ((tx % u) + u) % u;
        for (var x = x0; x <= w; x += u) {
            var px = Math.round(x) + 0.5;
            ctx.moveTo(px, 0);
            ctx.lineTo(px, h);
        }
        var y0 = ((ty % u) + u) % u;
        for (var y = y0; y <= h; y += u) {
            var py = Math.round(y) + 0.5;
            ctx.moveTo(0, py);
            ctx.lineTo(w, py);
        }
        ctx.stroke();

        /* 主网格线（每 5 格） */
        var step = u * MAJOR;
        ctx.strokeStyle = 'rgba(26,23,18,0.17)';
        ctx.beginPath();
        var mx0 = ((tx % step) + step) % step;
        for (var mx = mx0; mx <= w; mx += step) {
            var mpx = Math.round(mx) + 0.5;
            ctx.moveTo(mpx, 0);
            ctx.lineTo(mpx, h);
        }
        var my0 = ((ty % step) + step) % step;
        for (var my = my0; my <= h; my += step) {
            var mpy = Math.round(my) + 0.5;
            ctx.moveTo(0, mpy);
            ctx.lineTo(w, mpy);
        }
        ctx.stroke();

        /* 装饰函数曲线 */
        ctx.strokeStyle = 'rgba(193,68,46,0.15)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        for (var sx = 0; sx <= w; sx += 3) {
            var wx = (sx - tx) / u;
            var sy = ty - Math.sin(wx * 0.62) * 1.9 * u;
            if (sx === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
        }
        ctx.stroke();

        /* 坐标轴 */
        var axisX = Math.round(tx) + 0.5;
        var axisY = Math.round(ty) + 0.5;
        ctx.strokeStyle = 'rgba(26,23,18,0.45)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, axisY);
        ctx.lineTo(w, axisY);
        ctx.moveTo(axisX, 0);
        ctx.lineTo(axisX, h);
        ctx.stroke();

        /* 轴箭头 */
        ctx.fillStyle = 'rgba(26,23,18,0.45)';
        ctx.beginPath();
        ctx.moveTo(w - 1, axisY);
        ctx.lineTo(w - 9, axisY - 4);
        ctx.lineTo(w - 9, axisY + 4);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(axisX, 1);
        ctx.lineTo(axisX - 4, 9);
        ctx.lineTo(axisX + 4, 9);
        ctx.closePath();
        ctx.fill();

        /* 轴标签 */
        ctx.font = '13px "math", "Songti SC", serif';
        ctx.fillStyle = 'rgba(26,23,18,0.5)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText('x', w - 14, axisY - 8);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('y', axisX + 9, 10);

        /* 刻度数字 */
        var labelY = Math.max(16, Math.min(ty + 14, h - 10));
        var labelX = Math.max(10, Math.min(tx + 8, w - 12));
        ctx.font = '10.5px "script", ui-monospace, monospace';
        ctx.fillStyle = 'rgba(26,23,18,0.38)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        for (var lx = mx0; lx <= w; lx += step) {
            var val = Math.round((lx - tx) / u);
            if (val === 0) continue;
            ctx.fillText(String(val), Math.round(lx), labelY);
        }
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (var ly = my0; ly <= h; ly += step) {
            var valY = Math.round((ty - ly) / u);
            if (valY === 0) continue;
            ctx.fillText(String(valY), labelX, Math.round(ly));
        }

        /* 原点 */
        ctx.beginPath();
        ctx.arc(tx, ty, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(193,68,46,0.75)';
        ctx.fill();
    }

    /* ---------------- 卡片 ---------------- */
    function applyPanel(p) {
        p.style.setProperty('--x', p._x + 'px');
        p.style.setProperty('--y', p._y + 'px');
    }

    function place(p, screenX, screenY) {
        p._x = Math.round(screenX - tx);
        p._y = Math.round(screenY - ty);
        applyPanel(p);
    }

    function bringToFront(p) {
        zTop += 1;
        p.style.zIndex = zTop;
    }

    function isCollapsed(p) {
        return p.classList.contains('is-collapsed');
    }

    var ready = false;
    var laying = false;

    function toggle(p, force) {
        var collapse = typeof force === 'boolean' ? force : !isCollapsed(p);
        p.classList.toggle('is-collapsed', collapse);
        var btn = p.querySelector('.panel__toggle');
        if (btn) btn.setAttribute('aria-expanded', String(!collapse));
        if (!collapse) {
            bringToFront(p);
            if (ready && !laying) ensureVisible(p);
        }
    }

    /* 展开后如果超出视野，把视图平移过去（主要给小屏用） */
    function ensureVisible(p) {
        if (laying) return;
        setTimeout(function () {
            var r = p.getBoundingClientRect();
            var dx = 0, dy = 0;
            if (r.top < 60) {
                dy = 60 - r.top;
            } else if (r.bottom > vh - 14) {
                dy = Math.min(vh - 14 - r.bottom, 60 - r.top);
            }
            if (r.left < 12) dx = 12 - r.left;
            else if (r.right > vw - 12) dx = vw - 12 - r.right;
            if (!dx && !dy) return;
            tx += Math.round(dx);
            ty += Math.round(dy);
            applyView();
        }, 300);
    }

    /* 拖动卡片：只从标题栏抓起 */
    panels.forEach(function (p) {
        var head = p.querySelector('.panel__head');
        p._x = 0;
        p._y = 0;

        var drag = null;

        head.addEventListener('pointerdown', function (e) {
            if (e.button !== 0 && e.pointerType === 'mouse') return;
            if (e.target.closest('button, a')) return;

            drag = {
                id: e.pointerId,
                sx: e.clientX,
                sy: e.clientY,
                px: p._x,
                py: p._y,
                moved: false
            };
            head.setPointerCapture(e.pointerId);
            p.classList.add('is-dragging');
            bringToFront(p);
        });

        head.addEventListener('pointermove', function (e) {
            if (!drag || e.pointerId !== drag.id) return;
            var dx = e.clientX - drag.sx;
            var dy = e.clientY - drag.sy;
            if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
            if (!drag.moved) return;
            p._x = drag.px + dx;
            p._y = drag.py + dy;
            applyPanel(p);
        });

        var lastDrag = 0;

        function endDrag(e) {
            if (!drag || e.pointerId !== drag.id) return;
            p.classList.remove('is-dragging');
            if (drag.moved) lastDrag = Date.now();
            drag = null;
        }

        /* 用 click 收尾：真实指针和程序化点击都能触发折叠 */
        head.addEventListener('click', function () {
            if (Date.now() - lastDrag < 350) return;
            toggle(p);
        });

        head.addEventListener('pointerup', endDrag);
        head.addEventListener('pointercancel', function (e) {
            if (!drag || e.pointerId !== drag.id) return;
            p.classList.remove('is-dragging');
            drag = null;
        });

        /* 键盘：方向键微调，回车/空格折叠 */
        head.addEventListener('keydown', function (e) {
            var n = e.shiftKey ? 4 : 24;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle(p);
                return;
            }
            var dx = 0, dy = 0;
            if (e.key === 'ArrowLeft') dx = -n;
            else if (e.key === 'ArrowRight') dx = n;
            else if (e.key === 'ArrowUp') dy = -n;
            else if (e.key === 'ArrowDown') dy = n;
            else return;
            e.preventDefault();
            p._x += dx;
            p._y += dy;
            applyPanel(p);
        });

        /* 折叠按钮 */
        var btn = p.querySelector('.panel__toggle');
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggle(p);
        });

        p.addEventListener('pointerdown', function () { bringToFront(p); });
    });

    /* ---------------- 平移坐标系 ---------------- */
    var pan = null;

    document.addEventListener('pointerdown', function (e) {
        if (e.target.closest('.panel, .hud')) return;
        if (document.querySelector('.panel.is-full')) return;
        if (e.button !== 0 && e.pointerType === 'mouse') return;

        pan = { id: e.pointerId, x: e.clientX, y: e.clientY, tx: tx, ty: ty };
        document.body.classList.add('is-panning');
    });

    document.addEventListener('pointermove', function (e) {
        if (!pan || e.pointerId !== pan.id) return;
        tx = pan.tx + (e.clientX - pan.x);
        ty = pan.ty + (e.clientY - pan.y);
        applyView();
    });

    function endPan(e) {
        if (!pan || e.pointerId !== pan.id) return;
        pan = null;
        document.body.classList.remove('is-panning');
    }

    document.addEventListener('pointerup', endPan);
    document.addEventListener('pointercancel', endPan);

    /* 双击空白：复位 */
    document.addEventListener('dblclick', function (e) {
        if (e.target.closest('.panel, .hud')) return;
        layout(false);
        applyView();
    });

    /* ---------------- 初始布局 ---------------- */
    function byId(id) {
        for (var i = 0; i < panels.length; i++) if (panels[i].dataset.card === id) return panels[i];
        return null;
    }

    function layout(resetStates) {
        vw = window.innerWidth;
        vh = window.innerHeight;
        tx = Math.round(vw / 2);
        ty = Math.round(vh / 2);

        var home = byId('home'), online = byId('online'), help = byId('help'), about = byId('about');
        var mobile = vw < 1000;

        /* 排版期间关掉过渡，否则量到的是动画中途的高度 */
        laying = true;
        stage.classList.add('no-anim');

        /* 先定折叠状态，再量高度排位置 */
        if (resetStates) {
            panels.forEach(function (p) {
                toggle(p, mobile ? true : p !== home);
            });
        }

        if (mobile) {
            var w = Math.min(vw - 32, 560);
            var x = Math.max(16, Math.round((vw - w) / 2));
            panels.forEach(function (p) { p.style.setProperty('--w', w + 'px'); });

            var y = 62;
            [home, online, help, about].forEach(function (p) {
                if (!p) return;
                place(p, x, y);
                y += p.getBoundingClientRect().height + 10;
            });
        } else {
            home.style.setProperty('--w', '470px');
            var rightW = Math.min(700, vw - 570 - 40);
            online.style.setProperty('--w', Math.max(420, rightW) + 'px');
            help.style.setProperty('--w', '430px');
            about.style.setProperty('--w', '430px');

            place(home, 60, 76);
            place(online, 570, 96);
            place(help, 604, 196);
            place(about, 638, 292);
        }

        /* 强制样式落定后再测量 */
        void stage.offsetHeight;
        stage.classList.remove('no-anim');
        laying = false;

        stage.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
    }

    /* ---------------- 工具按钮 ---------------- */
    document.querySelectorAll('.tools button').forEach(function (b) {
        b.addEventListener('click', function () {
            var act = b.dataset.act;
            if (act === 'expand') panels.forEach(function (p) { toggle(p, false); });
            else if (act === 'collapse') panels.forEach(function (p) { toggle(p, true); });
            else if (act === 'reset') { layout(false); applyView(); }
        });
    });

    /* 首页的「在线使用」 */
    document.querySelectorAll('[data-open]').forEach(function (b) {
        b.addEventListener('click', function () {
            var p = byId(b.dataset.open);
            if (!p) return;
            toggle(p, false);
            bringToFront(p);
            if (p.dataset.card === 'online') loadFrame();
            /* 平移让卡片进入视野 */
            var r = p.getBoundingClientRect();
            if (r.right > vw - 20 || r.left < 20 || r.top < 70 || r.bottom > vh - 10) {
                tx += Math.round(vw / 2 - (r.left + r.width / 2));
                ty += Math.round(Math.min(vh / 2, 120) - r.top);
                applyView();
            }
        });
    });

    /* ---------------- 在线版：按需加载 ---------------- */
    var frameLoaded = false;

    function loadFrame() {
        if (frameLoaded) return;
        var holder = document.getElementById('frame-holder');
        var ph = document.getElementById('frame-placeholder');
        if (!holder) return;
        frameLoaded = true;
        if (ph) ph.remove();
        var f = document.createElement('iframe');
        f.src = '/sgc/v4/calculator/';
        f.title = 'SGC v4.13.4 计算器';
        f.setAttribute('allow', 'fullscreen');
        holder.appendChild(f);
    }

    var loadBtn = document.getElementById('load-frame');
    if (loadBtn) loadBtn.addEventListener('click', loadFrame);

    /* ---------------- 在线版：全屏 ---------------- */
    var saved = null;

    function toggleFull() {
        var p = byId('online');
        if (!p) return;
        var on = p.classList.contains('is-full');
        if (!on) {
            saved = { x: p._x, y: p._y, w: p.style.getPropertyValue('--w') };
            p.classList.add('is-full');
            p.style.setProperty('--w', (vw - 24) + 'px');
            p._x = 12 - tx;
            p._y = 60 - ty;
            applyPanel(p);
            bringToFront(p);
            fullBtn.classList.add('is-on');
            fullBtn.setAttribute('aria-pressed', 'true');
            fullBtn.setAttribute('aria-label', '退出全屏');
            loadFrame();
        } else {
            p.classList.remove('is-full');
            if (saved) {
                p._x = saved.x;
                p._y = saved.y;
                if (saved.w) p.style.setProperty('--w', saved.w);
                applyPanel(p);
            }
            fullBtn.classList.remove('is-on');
            fullBtn.setAttribute('aria-pressed', 'false');
            fullBtn.setAttribute('aria-label', '全屏');
        }
        draw();
    }

    if (fullBtn) fullBtn.addEventListener('click', toggleFull);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            var p = byId('online');
            if (p && p.classList.contains('is-full')) toggleFull();
        }
    });

    /* ---------------- 尺寸变化 ---------------- */
    var rt;
    window.addEventListener('resize', function () {
        clearTimeout(rt);
        rt = setTimeout(function () {
            var p = byId('online');
            if (p && p.classList.contains('is-full')) {
                p.style.setProperty('--w', (window.innerWidth - 24) + 'px');
                p._x = 12 - tx;
                p._y = 60 - ty;
                applyPanel(p);
            }
            vw = window.innerWidth;
            vh = window.innerHeight;
            draw();
        }, 120);
    });

    /* ---------------- 启动 ---------------- */
    function boot() {
        vw = window.innerWidth;
        vh = window.innerHeight;
        layout(true);
        applyView();
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(function () { draw(); });
        }
        /* 首帧补齐：部分 WebView 首绘时会漏掉 canvas 图层 */
        requestAnimationFrame(draw);
        setTimeout(draw, 250);
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) draw();
        });
        ready = true;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
