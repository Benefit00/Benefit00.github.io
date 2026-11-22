(function () {
  var root = document.documentElement;

  // Theme toggle (remembers choice)
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) toggle.addEventListener('click', function () {
    var current = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Mobile nav
  var navBtn = document.querySelector('.nav-toggle'), nav = document.getElementById('site-nav');
  if (navBtn && nav) navBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    navBtn.setAttribute('aria-expanded', open);
  });

  // Home page section filter
  var grid = document.getElementById('post-grid');
  var chips = document.querySelectorAll('.chip[data-filter]');
  function applyFilter(f) {
    if (!grid) return;
    grid.dataset.filter = f;
    var shown = 0;
    grid.querySelectorAll('.grid-item').forEach(function (el) {
      var ok = f === 'all' || el.dataset.section === f;
      el.hidden = !ok; if (ok) shown++;
    });
    chips.forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.filter === f); });
    var feature = document.querySelector('[data-hide-on-filter]');
    if (feature) feature.hidden = f !== 'all';
    var empty = document.querySelector('.empty');
    if (empty) empty.hidden = shown > 0;
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      applyFilter(c.dataset.filter);
      history.replaceState(null, '', c.dataset.filter === 'all' ? location.pathname : '#' + c.dataset.filter);
    });
  });
  if (grid) applyFilter(location.hash.slice(1) && document.querySelector('.chip[data-filter="' + location.hash.slice(1) + '"]') ? location.hash.slice(1) : 'all');

  // Reading progress
  var bar = document.querySelector('.progress span'), post = document.querySelector('.post .prose');
  if (bar && post) {
    var onScroll = function () {
      var r = post.getBoundingClientRect();
      var p = Math.min(Math.max((window.innerHeight - r.top) / (r.height + window.innerHeight * 0.3), 0), 1);
      bar.style.width = (p * 100) + '%';
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  // Copy link
  document.querySelectorAll('.copy-link').forEach(function (b) {
    b.addEventListener('click', function () {
      navigator.clipboard && navigator.clipboard.writeText(b.dataset.url).then(function () {
        var t = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = t; }, 1500);
      });
    });
  });
})();
