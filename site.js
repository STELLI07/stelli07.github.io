(() => {
  const LANGUES = {"en": ["/", "English"], "fr": ["/fr/", "Français"], "es": ["/es/", "Español"], "it": ["/it/", "Italiano"], "pt-BR": ["/pt-br/", "Português (Brasil)"], "pt-PT": ["/pt-pt/", "Português (Portugal)"], "de": ["/de/", "Deutsch"], "ar": ["/ar/", "العربية"], "ja": ["/ja/", "日本語"], "ko": ["/ko/", "한국어"], "zh-Hant": ["/zh-hant/", "繁體中文"], "id": ["/id/", "Bahasa Indonesia"], "nl": ["/nl/", "Nederlands"], "pl": ["/pl/", "Polski"], "tr": ["/tr/", "Türkçe"], "ru": ["/ru/", "Русский"], "he": ["/he/", "עברית"], "hi": ["/hi/", "हिन्दी"], "th": ["/th/", "ไทย"], "vi": ["/vi/", "Tiếng Việt"], "ms": ["/ms/", "Bahasa Melayu"]};
  const doux = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const choix = document.getElementById('langue');
  if (choix) choix.addEventListener('change', () => { location.href = choix.value; });

  try {
    const ici = document.documentElement.lang;
    const trouve = (n) => {
      n = (n || '').toLowerCase();
      if (n.startsWith('pt')) return /^pt-(pt|ao|mz)/.test(n) ? 'pt-PT' : 'pt-BR';
      if (n.startsWith('zh')) return /hant|tw|hk|mo/.test(n) ? 'zh-Hant' : null;
      if (n === 'iw' || n.startsWith('iw-')) return 'he';
      if (n === 'in' || n.startsWith('in-')) return 'id';
      const p = n.split('-')[0];
      return LANGUES[p] ? p : null;
    };
    let voulue = null;
    for (const n of (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language])) { voulue = trouve(n); if (voulue) break; }
    if (voulue && voulue !== ici && !localStorage.getItem('stelli-langue-ok')) {
      const b = document.getElementById('suggere');
      const a = document.createElement('a');
      a.href = LANGUES[voulue][0]; a.lang = voulue; a.textContent = LANGUES[voulue][1];
      const x = document.createElement('button');
      x.type = 'button'; x.textContent = '×'; x.setAttribute('aria-label', 'OK');
      x.addEventListener('click', () => { b.hidden = true; try { localStorage.setItem('stelli-langue-ok', '1'); } catch (e) {} });
      b.append(a, x); b.hidden = false;
    }
  } catch (e) {}

  const voyage = document.querySelector('.voyage');
  if (voyage && 'IntersectionObserver' in window) {
    voyage.classList.add('vivant');
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) voyage.style.backgroundColor = en.target.dataset.ciel;
    }, { rootMargin: '-45% 0px -45% 0px' });
    voyage.querySelectorAll('[data-ciel]').forEach((el) => io.observe(el));
  }

  const c = document.getElementById('ciel');
  if (!c || !c.getContext) return;
  const x = c.getContext('2d');
  let W = 0, H = 0, D = 1, points = [], filantes = [], vu = true, avant = 0;
  const taille = () => {
    D = Math.min(2, window.devicePixelRatio || 1); W = c.clientWidth; H = c.clientHeight;
    c.width = Math.round(W * D); c.height = Math.round(H * D); x.setTransform(D, 0, 0, D, 0, 0);
    points = Array.from({ length: Math.round(W * H / 8000) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + 0.3, p: Math.random() * 6.3 }));
  };
  const etoile = (px, py, r, rot) => {
    x.save(); x.translate(px, py); x.rotate(rot); x.fillStyle = '#ffe28c'; x.shadowColor = '#ffd36b'; x.shadowBlur = 14; x.beginPath();
    for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.46 : r, a = i * Math.PI / 5 - Math.PI / 2; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    x.closePath(); x.fill(); x.restore();
  };
  const dessine = (t) => {
    x.clearRect(0, 0, W, H);
    for (const s of points) { x.globalAlpha = doux ? 0.55 : 0.3 + 0.35 * Math.sin(t / 900 + s.p); x.fillStyle = '#fff6d6'; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.283); x.fill(); }
    x.globalAlpha = 1;
    for (const s of filantes) {
      const tx = s.x - s.vx * 0.45, ty = s.y - s.vy * 0.45, g = x.createLinearGradient(s.x, s.y, tx, ty);
      g.addColorStop(0, 'rgba(255,214,120,.6)'); g.addColorStop(1, 'rgba(255,214,120,0)');
      x.strokeStyle = g; x.lineWidth = s.r * 0.55; x.lineCap = 'round'; x.beginPath(); x.moveTo(s.x, s.y); x.lineTo(tx, ty); x.stroke();
      etoile(s.x, s.y, s.r, s.a);
    }
  };
  const tour = (t) => {
    if (!vu) return;
    const dt = Math.min(0.05, avant ? (t - avant) / 1000 : 0.016); avant = t;
    if (filantes.length < 6 && Math.random() < dt * 0.9) {
      const v = 110 + Math.random() * 110;
      filantes.push({ x: Math.random() * W * 1.1 - W * 0.15, y: -24, vx: v * 0.38, vy: v, r: 5 + Math.random() * 6, a: Math.random() * 6, va: (Math.random() - 0.5) * 3 });
    }
    for (const s of filantes) { s.x += s.vx * dt; s.y += s.vy * dt; s.a += s.va * dt; }
    filantes = filantes.filter((s) => s.y < H + 40);
    dessine(t);
    requestAnimationFrame(tour);
  };
  taille();
  addEventListener('resize', () => { taille(); if (doux) dessine(0); });
  if (doux) { dessine(0); return; }
  new IntersectionObserver((es) => { const v = es[0].isIntersecting; if (v && !vu) { vu = true; avant = 0; requestAnimationFrame(tour); } vu = v; }).observe(c);
  requestAnimationFrame(tour);
})();
