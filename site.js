(() => {
  window.stelliOk = 1;
  const LANGUES = {"en": ["/", "English"], "fr": ["/fr/", "Français"], "es": ["/es/", "Español"], "it": ["/it/", "Italiano"], "pt-BR": ["/pt-br/", "Português (Brasil)"], "pt-PT": ["/pt-pt/", "Português (Portugal)"], "de": ["/de/", "Deutsch"], "ar": ["/ar/", "العربية"], "ja": ["/ja/", "日本語"], "ko": ["/ko/", "한국어"], "zh-Hant": ["/zh-hant/", "繁體中文"], "id": ["/id/", "Bahasa Indonesia"], "nl": ["/nl/", "Nederlands"], "pl": ["/pl/", "Polski"], "tr": ["/tr/", "Türkçe"], "ru": ["/ru/", "Русский"], "he": ["/he/", "עברית"], "hi": ["/hi/", "हिन्दी"], "th": ["/th/", "ไทย"], "vi": ["/vi/", "Tiếng Việt"], "ms": ["/ms/", "Bahasa Melayu"]};
  const doux = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IO = 'IntersectionObserver' in window;
  const al = (a, b) => a + Math.random() * (b - a);

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

  const haut = document.querySelector('.haut');
  if (haut) {
    const colle = () => haut.classList.toggle('colle', scrollY > 40);
    addEventListener('scroll', colle, { passive: true }); colle();
  }

  const reveles = document.querySelectorAll('.revele');
  if (doux || !IO) reveles.forEach((el) => el.classList.add('vu'));
  else {
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) { en.target.classList.add('vu'); io.unobserve(en.target); }
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.12 });
    reveles.forEach((el) => io.observe(el));
  }

  const vid = document.querySelector('.video video');
  if (vid) {
    const eco = navigator.connection && navigator.connection.saveData;
    if (doux || eco || !IO) vid.controls = true;
    else new IntersectionObserver((es) => {
      for (const en of es) {
        if (en.isIntersecting) {
          vid.preload = 'auto';
          const p = vid.play();
          if (p && p.catch) p.catch(() => { vid.controls = true; });
        } else vid.pause();
      }
    }, { threshold: 0.25 }).observe(vid);
  }

  const voyage = document.querySelector('.voyage');
  if (voyage && IO) {
    voyage.classList.add('vivant');
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) voyage.style.backgroundColor = en.target.dataset.ciel;
    }, { rootMargin: '-45% 0px -45% 0px' });
    voyage.querySelectorAll('[data-ciel]').forEach((el) => io.observe(el));
  }

  const prof = doux ? [] : [...document.querySelectorAll('.roy, .infini')];
  if (prof.length) {
    let attend = false;
    const glisse = () => {
      attend = false;
      const h = innerHeight;
      for (const s of prof) {
        const r = s.getBoundingClientRect();
        if (r.bottom < -200 || r.top > h + 200) continue;
        s.style.setProperty('--p', Math.max(-1.5, Math.min(1.5, (r.top + r.height / 2 - h / 2) / h)).toFixed(3));
      }
    };
    addEventListener('scroll', () => { if (!attend) { attend = true; requestAnimationFrame(glisse); } }, { passive: true });
    addEventListener('resize', glisse);
    glisse();
  }

  const cache = {};
  const lueur = (rgb, r) => {
    const k = rgb + '/' + r; if (cache[k]) return cache[k];
    const c = document.createElement('canvas'), s = Math.ceil(r * 2); c.width = c.height = s;
    const g = c.getContext('2d'), d = g.createRadialGradient(r, r, 0, r, r, r);
    d.addColorStop(0, `rgba(${rgb},1)`); d.addColorStop(0.22, `rgba(${rgb},.6)`); d.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = d; g.fillRect(0, 0, s, s);
    return (cache[k] = c);
  };
  const nuage = () => {
    if (cache.nuage) return cache.nuage;
    const c = document.createElement('canvas'); c.width = 320; c.height = 150;
    const g = c.getContext('2d');
    for (const [px, py, r] of [[78, 94, 50], [138, 72, 62], [204, 82, 56], [252, 100, 40], [118, 108, 46], [178, 110, 48]]) {
      const d = g.createRadialGradient(px, py, 0, px, py, r);
      d.addColorStop(0, 'rgba(255,255,255,.95)'); d.addColorStop(0.6, 'rgba(255,255,255,.55)'); d.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = d; g.beginPath(); g.arc(px, py, r, 0, 6.283); g.fill();
    }
    return (cache.nuage = c);
  };
  const combien = (W, H, aire, max) => Math.max(6, Math.min(max, Math.round(W * H / aire)));
  const etoile5 = (x, r) => { x.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.46 : r, a = i * Math.PI / 5 - Math.PI / 2; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } x.closePath(); };

  const VIES = {
    azur: {
      init: (W, H) => ({
        n: Array.from({ length: Math.min(7, Math.round(W / 150) + 3) }, () => ({ x: al(-260, W), y: al(0, H), s: al(0.45, 1.1), v: al(7, 18), a: al(0.12, 0.24) })),
        p: Array.from({ length: combien(W, H, 48000, 14) }, () => ({ x: al(0, W), y: al(0, H), v: al(18, 34), ph: al(0, 6.3), r: 0, s: al(0.8, 1.3) })),
        e: { dans: al(2.5, 5), vie: 0, pts: null },
      }),
      pas: (E, dt, t, W, H) => {
        for (const n of E.n) { n.x += n.v * dt; if (n.x > W + 20) { n.x = -320 * n.s - al(0, 140); n.y = al(0, H); } }
        for (const p of E.p) { p.y += p.v * dt; p.x += Math.sin(t * 1.1 + p.ph) * 16 * dt; p.r = Math.sin(t * 1.4 + p.ph) * 0.8; if (p.y > H + 24) { p.y = -24; p.x = al(0, W); } }
        const e = E.e; e.dans -= dt; if (e.vie > 0) e.vie -= dt;
        if (e.dans <= 0) {
          e.dans = al(6, 10); e.vie = 0.5;
          let px = (Math.random() < 0.5 ? al(0.04, 0.22) : al(0.78, 0.96)) * W, py = 0; const fin = al(H * 0.22, H * 0.45); e.pts = [[px, py]];
          while (py < fin) { py += al(18, 36); px += al(-24, 24); e.pts.push([px, py]); }
        }
      },
      dessin: (x, E, t, W, H) => {
        const nu = nuage();
        for (const n of E.n) { x.globalAlpha = n.a; x.drawImage(nu, n.x, n.y - 75 * n.s, 320 * n.s, 150 * n.s); }
        x.globalAlpha = 1; x.fillStyle = 'rgba(255,255,255,.8)'; x.strokeStyle = 'rgba(255,255,255,.55)'; x.lineWidth = 1;
        for (const p of E.p) {
          x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.scale(p.s, p.s);
          x.beginPath(); x.moveTo(0, -11); x.quadraticCurveTo(7, -2, 0, 11); x.quadraticCurveTo(-7, -2, 0, -11); x.fill();
          x.beginPath(); x.moveTo(0, -12); x.lineTo(0, 15); x.stroke(); x.restore();
        }
        const e = E.e;
        if (e.vie > 0 && e.pts) {
          const k = e.vie / 0.5;
          x.globalCompositeOperation = 'lighter';
          x.fillStyle = `rgba(200,225,255,${(0.1 * k).toFixed(3)})`; x.fillRect(0, 0, W, H);
          if (k > 0.35) {
            x.strokeStyle = `rgba(235,245,255,${k.toFixed(3)})`; x.lineWidth = 2.5; x.lineJoin = 'round'; x.shadowColor = '#bfe0ff'; x.shadowBlur = 16;
            x.beginPath(); e.pts.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.stroke(); x.shadowBlur = 0;
          }
          x.globalCompositeOperation = 'source-over';
        }
      },
    },
    lagon: {
      init: (W, H) => ({
        b: Array.from({ length: combien(W, H, 20000, 38) }, () => ({ x: al(0, W), y: al(0, H), r: al(2, 9), v: al(16, 42), ph: al(0, 6.3) })),
        r: Array.from({ length: 4 }, (_, i) => ({ x: W * (0.12 + i * 0.26) + al(-30, 30), l: al(60, 140), ph: al(0, 6.3) })),
      }),
      pas: (E, dt, t, W, H) => { for (const b of E.b) { b.y -= b.v * dt; b.x += Math.sin(t * 2 + b.ph) * 12 * dt; if (b.y < -12) { b.y = H + al(4, 40); b.x = al(0, W); } } },
      dessin: (x, E, t, W, H) => {
        x.globalCompositeOperation = 'lighter';
        const g = x.createLinearGradient(0, 0, 0, H * 0.8);
        g.addColorStop(0, 'rgba(170,255,245,.11)'); g.addColorStop(1, 'rgba(170,255,245,0)'); x.fillStyle = g;
        for (const r of E.r) {
          const o = Math.sin(t * 0.35 + r.ph) * 40;
          x.beginPath(); x.moveTo(r.x + o - r.l / 2, 0); x.lineTo(r.x + o + r.l / 2, 0); x.lineTo(r.x + o * 2.2 + r.l, H * 0.8); x.lineTo(r.x + o * 2.2 - r.l * 0.2, H * 0.8); x.closePath(); x.fill();
        }
        x.globalCompositeOperation = 'source-over'; x.lineWidth = 1.4; x.strokeStyle = 'rgba(215,255,250,.55)'; x.fillStyle = 'rgba(255,255,255,.65)';
        for (const b of E.b) {
          x.beginPath(); x.arc(b.x, b.y, b.r, 0, 6.283); x.stroke();
          x.beginPath(); x.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, Math.max(0.8, b.r * 0.22), 0, 6.283); x.fill();
        }
      },
    },
    foret: {
      init: (W, H) => ({ l: Array.from({ length: combien(W, H, 20000, 36) }, () => ({ x: al(0, W), y: al(0, H), vx: al(-12, 12), vy: al(-12, 12), ph: al(0, 6.3), f: al(1.2, 2.6), s: al(10, 22) })) }),
      pas: (E, dt, t, W, H) => {
        const fr = Math.max(0, 1 - dt * 0.9);
        for (const l of E.l) {
          l.vx = (l.vx + al(-34, 34) * dt) * fr; l.vy = (l.vy + al(-34, 34) * dt) * fr;
          const m = Math.hypot(l.vx, l.vy); if (m > 24) { l.vx *= 24 / m; l.vy *= 24 / m; }
          l.x += l.vx * dt; l.y += l.vy * dt;
          if (l.x < -24) l.x = W + 24; else if (l.x > W + 24) l.x = -24;
          if (l.y < -24) l.y = H + 24; else if (l.y > H + 24) l.y = -24;
        }
      },
      dessin: (x, E, t) => {
        const g = lueur('214,255,110', 24); x.globalCompositeOperation = 'lighter';
        for (const l of E.l) { x.globalAlpha = Math.max(0, 0.55 + 0.45 * Math.sin(t * l.f + l.ph)); x.drawImage(g, l.x - l.s, l.y - l.s, l.s * 2, l.s * 2); }
        x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
      },
    },
    sakura: {
      init: (W, H) => ({ p: Array.from({ length: combien(W, H, 21000, 36) }, () => ({ x: al(0, W), y: al(0, H), v: al(24, 52), s: al(5, 9), r: al(0, 6.3), vr: al(-1.6, 1.6), ph: al(0, 6.3), c: Math.random() < 0.3 ? '255,228,240' : '255,172,208' })) }),
      pas: (E, dt, t, W, H) => { for (const p of E.p) { p.y += p.v * dt; p.x += (Math.sin(t * 0.9 + p.ph) * 26 + 12) * dt; p.r += p.vr * dt; if (p.y > H + 16 || p.x > W + 20) { p.y = -16; p.x = al(-40, W); } } },
      dessin: (x, E, t) => {
        for (const p of E.p) {
          const s = p.s;
          x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.scale(1, 0.5 + 0.5 * Math.abs(Math.cos(t * 1.7 + p.ph)));
          x.fillStyle = `rgba(${p.c},.92)`; x.beginPath(); x.moveTo(0, s);
          x.bezierCurveTo(-s * 1.1, s * 0.2, -s * 0.8, -s, -s * 0.22, -s); x.lineTo(0, -s * 0.68); x.lineTo(s * 0.22, -s);
          x.bezierCurveTo(s * 0.8, -s, s * 1.1, s * 0.2, 0, s); x.fill(); x.restore();
        }
      },
    },
    ombres: {
      init: (W, H) => ({
        b: Array.from({ length: combien(W, H, 20000, 36) }, () => ({ x: al(0, W), y: al(0, H), v: al(14, 34), ph: al(0, 6.3), s: al(6, 14), c: Math.random() < 0.2 ? '255,150,90' : (Math.random() < 0.5 ? '190,120,255' : '255,95,210') })),
        n: Array.from({ length: Math.min(5, Math.round(W / 220) + 2) }, () => ({ x: al(0, W), y: al(0, H), v: al(10, 22), r: al(0, 6.3), vr: al(-0.5, 0.5), s: al(10, 18) })),
      }),
      pas: (E, dt, t, W, H) => {
        for (const b of E.b) { b.y -= b.v * dt; b.x += Math.sin(t * 1.6 + b.ph) * 12 * dt; if (b.y < -16) { b.y = H + al(0, 30); b.x = al(0, W); } }
        for (const n of E.n) { n.y += n.v * dt; n.r += n.vr * dt; if (n.y > H + 30) { n.y = -30; n.x = al(0, W); } }
      },
      dessin: (x, E, t) => {
        x.globalCompositeOperation = 'lighter';
        for (const b of E.b) { x.globalAlpha = Math.max(0, 0.45 + 0.4 * Math.sin(t * 5 + b.ph * 3)); x.drawImage(lueur(b.c, 20), b.x - b.s, b.y - b.s, b.s * 2, b.s * 2); }
        x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
        for (const n of E.n) {
          x.save(); x.translate(n.x, n.y); x.rotate(n.r); etoile5(x, n.s);
          x.shadowColor = 'rgba(190,110,255,.9)'; x.shadowBlur = 14; x.fillStyle = 'rgba(24,8,52,.92)'; x.fill();
          x.shadowBlur = 0; x.strokeStyle = 'rgba(200,140,255,.75)'; x.lineWidth = 1.2; x.stroke(); x.restore();
        }
      },
    },
    infini: {
      init: (W, H) => ({ s: Array.from({ length: combien(W, H, 15000, 42) }, () => ({ x: al(0, W), y: al(-H, H), l: al(40, 150), v: al(320, 760), a: al(0.14, 0.42), w: al(1, 2.4), c: Math.random() < 0.5 ? '255,226,140' : '220,210,255' })) }),
      pas: (E, dt, t, W, H) => { for (const s of E.s) { s.y += s.v * dt; if (s.y - s.l > H) { s.y = al(-200, -10); s.x = al(0, W); } } },
      dessin: (x, E) => { x.lineCap = 'round'; for (const s of E.s) { x.strokeStyle = `rgba(${s.c},${s.a})`; x.lineWidth = s.w; x.beginPath(); x.moveTo(s.x, s.y); x.lineTo(s.x, s.y - s.l); x.stroke(); } },
    },
    futur: {
      init: (W, H) => ({ e: Array.from({ length: combien(W, H, 9000, 70) }, () => ({ x: al(0, W), y: al(0, H), r: al(0.6, 2.2), ph: al(0, 6.3), f: al(0.8, 2.2) })), f: null, dans: al(1.5, 3) }),
      pas: (E, dt, t, W, H) => {
        E.dans -= dt;
        if (E.dans <= 0) { E.dans = al(3.5, 7); E.f = { x: al(W * 0.1, W * 0.9), y: al(0, H * 0.4), vx: al(260, 380) * (Math.random() < 0.5 ? -1 : 1), vy: al(120, 200), vie: 1.2 }; }
        if (E.f) { E.f.x += E.f.vx * dt; E.f.y += E.f.vy * dt; E.f.vie -= dt; if (E.f.vie <= 0) E.f = null; }
      },
      dessin: (x, E, t) => {
        x.fillStyle = '#fff3cf';
        for (const e of E.e) {
          x.globalAlpha = 0.25 + 0.6 * Math.max(0, Math.sin(t * e.f + e.ph));
          if (e.r > 1.7) { x.fillRect(e.x - e.r * 2.2, e.y - 0.5, e.r * 4.4, 1); x.fillRect(e.x - 0.5, e.y - e.r * 2.2, 1, e.r * 4.4); }
          x.beginPath(); x.arc(e.x, e.y, e.r * 0.8, 0, 6.283); x.fill();
        }
        x.globalAlpha = 1;
        const f = E.f;
        if (f) {
          const k = Math.min(1, f.vie / 0.4), tx = f.x - f.vx * 0.25, ty = f.y - f.vy * 0.25, g = x.createLinearGradient(f.x, f.y, tx, ty);
          g.addColorStop(0, `rgba(255,236,170,${(0.9 * k).toFixed(3)})`); g.addColorStop(1, 'rgba(255,236,170,0)');
          x.strokeStyle = g; x.lineWidth = 2; x.lineCap = 'round'; x.beginPath(); x.moveTo(f.x, f.y); x.lineTo(tx, ty); x.stroke();
        }
      },
    },
  };

  const scenes = [];
  document.querySelectorAll('[data-amb]').forEach((sec) => {
    const c = sec.querySelector('canvas.amb'), v = VIES[sec.dataset.amb];
    if (c && c.getContext && v) scenes.push({ sec, c, x: c.getContext('2d'), v, W: 0, H: 0, D: 0, E: null, vis: false });
  });
  const mesure = (s) => {
    const W = s.c.clientWidth, H = s.c.clientHeight;
    if (!W || !H) return false;
    const D = W * H > 1200000 ? 1 : Math.min(1.5, window.devicePixelRatio || 1);
    if (W !== s.W || H !== s.H || D !== s.D || !s.E) {
      s.W = W; s.H = H; s.D = D; s.c.width = Math.round(W * D); s.c.height = Math.round(H * D);
      s.x.setTransform(D, 0, 0, D, 0, 0); s.E = s.v.init(W, H);
      if (doux) s.v.dessin(s.x, s.E, 0, W, H);
    }
    return true;
  };
  let avant = 0, tourne = false;
  const boucle = (ms) => {
    const t = ms / 1000, dt = Math.min(0.05, avant ? t - avant : 0.016); avant = t;
    let encore = false;
    for (const s of scenes) {
      if (!s.vis || !s.E) continue;
      encore = true;
      s.x.clearRect(0, 0, s.W, s.H); s.v.pas(s.E, dt, t, s.W, s.H); s.v.dessin(s.x, s.E, t, s.W, s.H);
    }
    if (encore && !document.hidden) requestAnimationFrame(boucle); else { tourne = false; avant = 0; }
  };
  const lance = () => { if (!doux && !tourne) { tourne = true; avant = 0; requestAnimationFrame(boucle); } };
  if (scenes.length && IO) {
    const io = new IntersectionObserver((es) => {
      for (const en of es) {
        const s = scenes.find((k) => k.sec === en.target);
        if (!s) continue;
        s.vis = en.isIntersecting;
        if (s.vis && mesure(s)) lance();
      }
    }, { rootMargin: '60px 0px' });
    scenes.forEach((s) => io.observe(s.sec));
    const remesure = () => scenes.forEach((s) => { if (s.vis) mesure(s); else s.E = null; });
    if ('ResizeObserver' in window) { const ro = new ResizeObserver(remesure); scenes.forEach((s) => ro.observe(s.c)); }
    else addEventListener('resize', remesure);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) lance(); });
  }

  const pion = document.getElementById('pionnier');
  if (pion) {
    const v = /^(\d{4})-(\d{2})-(\d{2})$/.exec(pion.dataset.fin || '');
    const fin = v ? new Date(+v[1], +v[2] - 1, +v[3]) : new Date(2027, 0, 1);
    if (Date.now() >= fin.getTime()) pion.hidden = true;
    else {
      const ch = pion.querySelector('.pion-date');
      if (ch && ch.dataset.t) {
        const lg = document.documentElement.lang;
        let d;
        try { d = new Intl.DateTimeFormat(lg === 'ar' ? 'ar-u-nu-latn' : lg, { day: 'numeric', month: 'long', year: 'numeric' }).format(fin); } catch (e) { d = fin.toLocaleDateString(); }
        const w = fin.getMonth() === 0 && fin.getDate() === 1 ? ch.dataset.wy.replace('{y}', fin.getFullYear()) : ch.dataset.wd.replace('{d}', d);
        ch.querySelector('span').textContent = ch.dataset.t.replace('{w}', w);
        ch.hidden = false;
      }
    }
  }

  const c = document.getElementById('ciel');
  if (!c || !c.getContext) return;
  const x = c.getContext('2d');
  let W = 0, H = 0, D = 1, points = [], filantes = [], vu = true, prec = 0, marche = false, neige = [];
  const noel = document.documentElement.classList.contains('noel');
  const flocon = new Image();
  if (noel) flocon.src = '/img/noel/flocon.png';
  const flocons = () => {
    neige = Array.from({ length: Math.round(W * H / 7000) }, (_, i) => {
      const gros = i % 9 === 0;
      return { x: Math.random() * W, y: Math.random() * H, r: gros ? al(9, 15) : al(1.2, 3.4), v: gros ? al(26, 40) : al(16, 46), b: al(8, 26), p: al(0, 6.3), a: al(0, 6.3), va: al(-0.6, 0.6), o: gros ? al(0.75, 0.95) : al(0.45, 0.9), gros };
    });
  };
  const taille = () => {
    D = Math.min(2, window.devicePixelRatio || 1); W = c.clientWidth; H = c.clientHeight;
    c.width = Math.round(W * D); c.height = Math.round(H * D); x.setTransform(D, 0, 0, D, 0, 0);
    points = Array.from({ length: Math.round(W * H / 8000) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + 0.3, p: Math.random() * 6.3 }));
    if (noel) flocons();
  };
  const etoile = (px, py, r, rot) => {
    x.save(); x.translate(px, py); x.rotate(rot); x.fillStyle = '#ffe28c'; x.shadowColor = '#ffd36b'; x.shadowBlur = 14;
    etoile5(x, r); x.fill(); x.restore();
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
    if (noel) {
      x.fillStyle = '#ffffff';
      for (const f of neige) {
        const fx = f.x + Math.sin(t / 1000 * 0.8 + f.p) * f.b;
        if (f.gros) {
          if (!flocon.complete || !flocon.naturalWidth) continue;
          x.save(); x.globalAlpha = f.o; x.translate(fx, f.y); x.rotate(f.a); x.drawImage(flocon, -f.r, -f.r * 0.88, f.r * 2, f.r * 1.76); x.restore();
        } else { x.globalAlpha = f.o; x.beginPath(); x.arc(fx, f.y, f.r, 0, 6.283); x.fill(); }
      }
      x.globalAlpha = 1;
    }
  };
  const tour = (t) => {
    if (!vu) { marche = false; return; }
    const dt = Math.min(0.05, prec ? (t - prec) / 1000 : 0.016); prec = t;
    if (filantes.length < 6 && Math.random() < dt * 0.9) {
      const v = 110 + Math.random() * 110;
      filantes.push({ x: Math.random() * W * 1.1 - W * 0.15, y: -24, vx: v * 0.38, vy: v, r: 5 + Math.random() * 6, a: Math.random() * 6, va: (Math.random() - 0.5) * 3 });
    }
    for (const s of filantes) { s.x += s.vx * dt; s.y += s.vy * dt; s.a += s.va * dt; }
    for (const f of neige) { f.y += f.v * dt; f.a += f.va * dt; if (f.y > H + 20) { f.y = -20; f.x = Math.random() * W; } }
    filantes = filantes.filter((s) => s.y < H + 40);
    dessine(t);
    requestAnimationFrame(tour);
  };
  const demarre = () => { if (!marche) { marche = true; prec = 0; requestAnimationFrame(tour); } };
  taille();
  addEventListener('resize', () => { taille(); if (doux) dessine(0); });
  if (doux) { dessine(0); return; }
  if (IO) new IntersectionObserver((es) => { vu = es[0].isIntersecting; if (vu) demarre(); }).observe(c);
  demarre();
})();
