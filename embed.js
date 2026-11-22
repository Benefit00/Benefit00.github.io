/*!
 * Benefit blog — latest-posts widget
 * Paste on any website:
 *   <div data-benefit-blog data-limit="3"></div>
 *   <script src="https://blog.blevin.cc/embed.js" async></script>
 *
 * Options (all optional, as data- attributes on the div):
 *   data-limit="3"                 number of posts (1–12)
 *   data-section="cyber-security"  only one section (life-lessons, cyber-security, it, finance, other)
 *   data-theme="auto|light|dark"   colour scheme (default auto)
 *   data-layout="grid|list"        card grid or compact list (default grid)
 *   data-title="From the blog"     heading text ("" to hide)
 *   data-target="_blank"           open links in a new tab
 */
(function () {
  var script = document.currentScript;
  var base = script ? new URL(script.src).origin : 'https://blog.blevin.cc';

  var CSS = [
    ':host{all:initial;display:block;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;',
    '--bg:#ffffff;--fg:#0f172a;--muted:#64748b;--line:#e2e8f0;--card:#ffffff;--hover:#f8fafc}',
    ':host([data-mode=dark]){--bg:transparent;--fg:#f1f5f9;--muted:#94a3b8;--line:#1e293b;--card:#0f172a;--hover:#111c33}',
    '*{box-sizing:border-box}',
    '.head{display:flex;align-items:baseline;justify-content:space-between;gap:1rem;margin:0 0 1rem}',
    'h2{margin:0;font-size:1.35rem;font-weight:700;color:var(--fg);letter-spacing:-.01em}',
    '.all{font-size:.9rem;color:var(--muted);text-decoration:none;white-space:nowrap}.all:hover{color:var(--fg)}',
    '.grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}',
    'a.card{display:flex;flex-direction:column;gap:.55rem;padding:1.15rem 1.2rem 1.1rem;border:1px solid var(--line);border-radius:14px;background:var(--card);',
    'color:var(--fg);text-decoration:none;position:relative;overflow:hidden;transition:transform .2s,border-color .2s,box-shadow .2s}',
    'a.card:before{content:"";position:absolute;inset:0 0 auto 0;height:3px;background:var(--c)}',
    'a.card:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--c) 45%,var(--line));box-shadow:0 10px 30px -12px color-mix(in srgb,var(--c) 40%,transparent)}',
    '.meta{display:flex;gap:.6rem;align-items:center;font-size:.75rem;color:var(--muted)}',
    '.pill{color:var(--c);font-weight:600;text-transform:uppercase;letter-spacing:.06em}',
    '.t{font-size:1.02rem;font-weight:650;line-height:1.35;margin:0}',
    '.s{font-size:.88rem;line-height:1.55;color:var(--muted);margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}',
    '.list a.card{flex-direction:row;align-items:baseline;justify-content:space-between;padding:.85rem 1rem;border-radius:10px}',
    '.list a.card:before{inset:0 auto 0 0;width:3px;height:auto}',
    '.list .grid{grid-template-columns:1fr;gap:.5rem}.list .s{display:none}.list .meta{flex-shrink:0}',
    '.err{color:var(--muted);font-size:.9rem}'
  ].join('');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function render(host, feed) {
    var o = host.dataset;
    var limit = Math.min(Math.max(parseInt(o.limit || '3', 10) || 3, 1), 12);
    var items = feed.items.filter(function (i) { return !o.section || i._section.slug === o.section; }).slice(0, limit);
    var title = o.title != null ? o.title : 'From the blog';
    var target = o.target ? ' target="' + esc(o.target) + '" rel="noopener"' : '';
    var allUrl = o.section ? base + '/' + o.section + '/' : base + '/';

    var mode = o.theme || 'auto';
    if (mode === 'auto') mode = document.documentElement.dataset.theme || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    host.setAttribute('data-mode', mode);

    var root = host.shadowRoot || host.attachShadow({ mode: 'open' });
    var cards = items.map(function (i) {
      var d = new Date(i.date_published).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
      return '<a class="card" style="--c:' + esc(i._section.color) + '" href="' + esc(i.url) + '"' + target + '>' +
        '<span class="meta"><span class="pill">' + esc(i._section.short) + '</span><span>' + d + '</span></span>' +
        '<p class="t">' + esc(i.title) + '</p><p class="s">' + esc(i.summary) + '</p></a>';
    }).join('');

    root.innerHTML = '<style>' + CSS + '</style><div class="' + (o.layout === 'list' ? 'list' : '') + '">' +
      (title ? '<div class="head"><h2>' + esc(title) + '</h2><a class="all" href="' + esc(allUrl) + '"' + target + '>View all →</a></div>' : '') +
      '<div class="grid">' + (cards || '<p class="err">No posts yet.</p>') + '</div></div>';
  }

  var hosts = document.querySelectorAll('[data-benefit-blog]');
  if (!hosts.length) return;
  fetch(base + '/feed.json', { mode: 'cors' })
    .then(function (r) { return r.json(); })
    .then(function (feed) { hosts.forEach(function (h) { render(h, feed); }); })
    .catch(function () {
      hosts.forEach(function (h) { h.innerHTML = '<a href="' + base + '/">Read the blog →</a>'; });
    });
})();
