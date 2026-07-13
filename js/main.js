/* Corporate Gardener — sticky nav, mobile menu, scroll reveal,
   the growing line, and progressive-enhancement contact form.
   No dependencies, no build step. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mark that JS is running so reveal elements can start hidden (they stay
  // visible with no JS, so content is never gated on a transition).
  document.body.classList.add('js');

  /* ---------- Sticky nav surface ---------- */
  var nav = document.getElementById('top');
  function onScrollNav() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  onScrollNav();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Scroll reveal (varied, not one uniform fade) ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reveals.length && 'IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // stagger siblings inside a shared group for a gentle cascade
        var group = el.parentElement ? el.parentElement.querySelectorAll(':scope > .reveal') : [el];
        var idx = Array.prototype.indexOf.call(group, el);
        el.style.transitionDelay = (idx > 0 ? Math.min(idx * 70, 280) : 0) + 'ms';
        el.classList.add('visible');
        io.unobserve(el);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- The growing line ----------
     A single stem is drawn down the page as you scroll, from the manifesto to
     the contact section, with a few leaves that sprout as the draw passes them.
     Everything is generated from live page geometry so it survives reflow. */
  var vineWrap = document.querySelector('.vine-wrap');
  var svg = vineWrap ? vineWrap.querySelector('.vine') : null;
  var stem = svg ? svg.querySelector('.vine-stem') : null;
  var leafGroup = svg ? svg.querySelector('.vine-leaves') : null;

  var vine = null; // { start, end, length, leaves: [{el, at}] }

  function buildVine() {
    if (!svg || !stem || !leafGroup) return;

    var startEl = document.getElementById('approach');
    var endEl = document.getElementById('contact');
    if (!startEl || !endEl) return;

    var docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    var startY = startEl.getBoundingClientRect().top + window.scrollY + 20;
    var endY = endEl.getBoundingClientRect().top + window.scrollY + endEl.offsetHeight * 0.5;
    var vh = endY - startY;
    if (vh < 200) return;

    // The vine lives in the left gutter, gently meandering.
    var x = Math.max(18, Math.min(window.innerWidth * 0.045, 64));
    var amp = Math.max(10, Math.min(window.innerWidth * 0.02, 26));

    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', docH);
    svg.setAttribute('viewBox', '0 0 ' + window.innerWidth + ' ' + docH);

    // Build a smooth meander using cubic segments.
    var segs = Math.max(6, Math.round(vh / 320));
    var step = vh / segs;
    var d = 'M ' + x + ' ' + startY;
    for (var i = 0; i < segs; i++) {
      var y0 = startY + step * i;
      var y1 = startY + step * (i + 1);
      var dir = i % 2 === 0 ? 1 : -1;
      var cx = x + amp * dir;
      d += ' C ' + cx + ' ' + (y0 + step * 0.34) + ', ' + cx + ' ' + (y1 - step * 0.34) + ', ' + x + ' ' + y1;
    }
    stem.setAttribute('d', d);

    var len = stem.getTotalLength();
    stem.style.strokeDasharray = len;
    stem.style.strokeDashoffset = reduceMotion ? 0 : len;

    // Leaves at a few points along the stem, alternating sides.
    leafGroup.innerHTML = '';
    var leaves = [];
    var points = [0.18, 0.4, 0.62, 0.82];
    points.forEach(function (t, n) {
      var pt = stem.getPointAtLength(len * t);
      var side = n % 2 === 0 ? 1 : -1;
      var lx = pt.x, ly = pt.y;
      var ex = lx + 30 * side, ey = ly - 18;
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      // a small leaf: a curved almond shape off the stem
      var dd = 'M ' + lx + ' ' + ly +
        ' C ' + (lx + 12 * side) + ' ' + (ly - 4) + ', ' + (ex - 8 * side) + ' ' + (ey + 8) + ', ' + ex + ' ' + ey +
        ' C ' + (ex - 4 * side) + ' ' + (ey + 14) + ', ' + (lx + 16 * side) + ' ' + (ly + 8) + ', ' + lx + ' ' + ly + ' Z';
      path.setAttribute('d', dd);
      leafGroup.appendChild(path);
      leaves.push({ el: path, at: t });
    });

    vine = { start: startY, end: endY, length: len, leaves: leaves };
    updateVine();
  }

  function updateVine() {
    if (!vine || !stem) return;
    var viewMid = window.scrollY + window.innerHeight * 0.72;
    var progress = (viewMid - vine.start) / (vine.end - vine.start);
    progress = Math.max(0, Math.min(1, progress));
    if (!reduceMotion) {
      stem.style.strokeDashoffset = vine.length * (1 - progress);
    }
    vine.leaves.forEach(function (leaf) {
      if (progress >= leaf.at) leaf.el.classList.add('sprouted');
      else leaf.el.classList.remove('sprouted');
    });
  }

  /* ---------- Rested scroll loop ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScrollNav();
      updateVine();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildVine, 180);
  });

  // Build once fonts/images have settled so geometry is stable.
  window.addEventListener('load', buildVine);
  setTimeout(buildVine, 400);

  /* ---------- Contact form (progressive enhancement) ----------
     Without JS the form posts normally (Netlify Forms handles it). With JS we
     submit in the background and show an inline thank-you, no page reload. */
  var form = document.querySelector('.contact-form');
  var status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      // Let the browser run native validation first.
      if (!form.checkValidity()) return;
      e.preventDefault();

      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      status.className = 'form-status';
      status.textContent = '';

      var data = new URLSearchParams(new FormData(form)).toString();
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data
      }).then(function (res) {
        if (!res.ok) throw new Error('bad status ' + res.status);
        form.classList.add('is-sent');
        status.className = 'form-status is-ok';
        status.textContent = 'Thank you, that’s with me. I’ll come back to you personally, usually within a couple of days.';
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Send it over'; }
        status.className = 'form-status is-error';
        status.innerHTML = 'Something went wrong sending that. Please email me directly at <a href="mailto:npbrocklebank@gmail.com">npbrocklebank@gmail.com</a>.';
      });
    });
  }
})();
