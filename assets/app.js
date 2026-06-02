/* Cromo compartido de la guía: menú lateral, tema claro/oscuro, progreso,
   navegación anterior/siguiente y resaltado de Java. Sin dependencias ni fetch:
   funciona abriendo los archivos con doble clic (file://). */
(function () {
  const enTemas = /\/temas\//.test(location.pathname) || !!document.body.dataset.tema;
  const base = enTemas ? '../' : '';
  const slugActual = document.body.dataset.tema || null;

  // Favicon SVG embebido (offline, sin pedido de red): marca de la guía.
  if (!document.querySelector('link[rel="icon"]')) {
    const fav = document.createElement('link');
    fav.rel = 'icon';
    fav.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23b1421d'/%3E%3Cg fill='%23fdf3e6'%3E%3Crect x='8' y='9' width='16' height='3.4' rx='1.7'/%3E%3Crect x='8' y='14.3' width='16' height='3.4' rx='1.7'/%3E%3Crect x='8' y='19.6' width='10' height='3.4' rx='1.7'/%3E%3C/g%3E%3C/svg%3E";
    document.head.appendChild(fav);
  }

  // ---- Progreso y tema en localStorage ----
  const LS_PROG = 'progra2:progreso', LS_TEMA = 'progra2:tema';
  const getProg = () => { try { return JSON.parse(localStorage.getItem(LS_PROG)) || {}; } catch (e) { return {}; } };
  const setProg = p => localStorage.setItem(LS_PROG, JSON.stringify(p));

  function aplicarTema(t) { document.documentElement.classList.toggle('oscuro', t === 'oscuro'); }
  let tema = localStorage.getItem(LS_TEMA);
  if (!tema) tema = matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro';
  aplicarTema(tema);

  // ---- Resaltador de Java (tokeniza el fuente crudo y escapa) ----
  const KW = new Set(('abstract boolean break byte case catch char class continue default do double else ' +
    'extends final finally float for if implements import instanceof int interface long new null package ' +
    'private protected public return short static super switch this throw throws try void while true false').split(' '));
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  function highlightJava(src) {
    const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(@\w+)|\b(\d+(?:\.\d+)?)\b|\b([A-Z][A-Za-z0-9_]*)\b|\b([A-Za-z_]\w*)\b/g;
    let out = '', last = 0, m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      const com = m[1], str = m[2], ann = m[3], num = m[4], type = m[5], word = m[6];
      if (com) out += '<span class="tok-com">' + esc(com) + '</span>';
      else if (str) out += '<span class="tok-str">' + esc(str) + '</span>';
      else if (ann) out += '<span class="tok-ann">' + esc(ann) + '</span>';
      else if (num) out += '<span class="tok-num">' + num + '</span>';
      else if (type) out += '<span class="tok-type">' + esc(type) + '</span>';
      else if (word) out += KW.has(word) ? '<span class="tok-kw">' + word + '</span>' : esc(word);
      last = m.index + m[0].length;
    }
    return out + esc(src.slice(last));
  }
  function resaltar() {
    document.querySelectorAll('code.java, code.lang-java').forEach(c => { c.innerHTML = highlightJava(c.textContent); });
  }
  window.resaltarJava = resaltar;   // lo usa el motor de actividades (Fase 2)

  // ---- Header ----
  const SVG_MARCA = '<svg viewBox="0 0 32 32" aria-hidden="true">' +
    '<rect width="32" height="32" rx="7"></rect>' +
    '<g class="m-bars"><rect x="8" y="9" width="16" height="3.4" rx="1.7"></rect>' +
    '<rect x="8" y="14.3" width="16" height="3.4" rx="1.7"></rect>' +
    '<rect x="8" y="19.6" width="10" height="3.4" rx="1.7"></rect></g></svg>';
  function etiquetaTema() {
    return tema === 'oscuro'
      ? '<span class="t-ico" aria-hidden="true">☀</span><span class="t-lbl">Claro</span>'
      : '<span class="t-ico" aria-hidden="true">☾</span><span class="t-lbl">Oscuro</span>';
  }
  function construirHeader() {
    const h = document.createElement('header');
    h.className = 'app-header';
    h.innerHTML =
      '<button class="hamburguesa" aria-label="Abrir o cerrar el menú" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '<a class="marca" href="' + base + 'index.html">' +
        '<span class="marca-glifo">' + SVG_MARCA + '</span>' +
        '<span class="marca-txt">Programación&nbsp;<b>2</b></span>' +
      '</a>' +
      '<span class="spacer"></span>' +
      '<button class="btn btn-tema" id="toggle-tema" aria-label="Cambiar tema claro u oscuro">' + etiquetaTema() + '</button>';
    document.body.prepend(h);
    const btn = h.querySelector('#toggle-tema');
    btn.onclick = () => {
      tema = tema === 'oscuro' ? 'claro' : 'oscuro';
      localStorage.setItem(LS_TEMA, tema);
      aplicarTema(tema);
      btn.innerHTML = etiquetaTema();
    };
    const ham = h.querySelector('.hamburguesa');
    ham.onclick = () => {
      const abierto = document.body.classList.toggle('menu-open');
      ham.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    };
  }

  // ---- Sidebar ----
  function construirSidebar() {
    const prog = getProg();
    const aside = document.createElement('aside');
    aside.id = 'sidebar';
    aside.innerHTML = BLOQUES.map(b => {
      const items = b.temas.map(t => {
        const cls = [t.slug === slugActual ? 'activo' : '', prog[t.slug] ? 'leido' : ''].join(' ').trim();
        return '<li><a class="' + cls + '" href="' + base + 'temas/' + t.archivo + '">' + t.titulo + '</a></li>';
      }).join('');
      const abierto = b.temas.some(t => t.slug === slugActual) ? ' open' : '';
      return '<details class="nav-bloque"' + abierto + '><summary>' + b.titulo + '</summary><ul>' + items + '</ul></details>';
    }).join('');
    document.body.appendChild(aside);
    aside.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', cerrarMenu); });
    if (!document.querySelector('.menu-backdrop')) {
      const bd = document.createElement('div');
      bd.className = 'menu-backdrop';
      bd.addEventListener('click', cerrarMenu);
      document.body.appendChild(bd);
    }
  }
  function cerrarMenu() {
    document.body.classList.remove('menu-open');
    const ham = document.querySelector('.hamburguesa');
    if (ham) ham.setAttribute('aria-expanded', 'false');
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarMenu(); });

  // ---- Navegación de tema (prev/next + marcar leído) ----
  function navTema() {
    if (!slugActual) return;
    const i = TEMAS.findIndex(t => t.slug === slugActual);
    const prev = TEMAS[i - 1], next = TEMAS[i + 1];
    const main = document.querySelector('main');
    if (!main) return;
    const prog = getProg();
    const wrap = document.createElement('div');
    wrap.className = 'tema-nav';
    wrap.innerHTML =
      (prev ? '<a class="btn" href="' + base + 'temas/' + prev.archivo + '">← ' + prev.titulo + '</a>' : '<span></span>') +
      '<button class="btn" id="marcar">' + (prog[slugActual] ? '✓ Leído' : 'Marcar como leído') + '</button>' +
      (next ? '<a class="btn" href="' + base + 'temas/' + next.archivo + '">' + next.titulo + ' →</a>' : '<span></span>');
    main.appendChild(wrap);
    wrap.querySelector('#marcar').onclick = function () {
      const p = getProg();
      p[slugActual] = !p[slugActual];
      setProg(p);
      this.textContent = p[slugActual] ? '✓ Leído' : 'Marcar como leído';
      const link = document.querySelector('#sidebar a.activo');
      if (link) link.classList.toggle('leido', !!p[slugActual]);
    };
  }

  // ---- Portada ----
  function portada() {
    const cont = document.getElementById('portada');
    if (!cont) return;
    const prog = getProg();
    const hechos = TEMAS.filter(t => prog[t.slug]).length;
    const pct = Math.round(hechos / TEMAS.length * 100);
    const cards = BLOQUES.map(b => '<div class="card"><h3>' + b.titulo + '</h3><ul>' +
      b.temas.map(t => '<li><a href="temas/' + t.archivo + '">' + t.titulo + (prog[t.slug] ? ' ✓' : '') + '</a></li>').join('') +
      '</ul></div>').join('');
    cont.innerHTML =
      '<div class="progreso">' +
        '<div class="prog-top"><strong>Tu progreso</strong>' +
        '<span class="prog-pct">' + hechos + ' / ' + TEMAS.length + ' temas · ' + pct + '%</span></div>' +
        '<div class="barra"><span style="width:' + pct + '%"></span></div>' +
      '</div>' +
      '<div class="cards">' + cards + '</div>';
  }

  // ---- Índice de la página ("En esta página", estilo Notion) ----
  function slugificar(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'sec';
  }
  function construirTOC() {
    if (!slugActual) return;                       // solo en páginas de tema
    const article = document.querySelector('main article');
    if (!article) return;
    const heads = Array.prototype.filter.call(article.children,
      el => el.tagName === 'H2' || el.tagName === 'H3');
    const usados = {};
    function idDe(el, base2) {
      if (el.id) return el.id;
      let s = slugificar(base2), id = s, k = 1;
      while (usados[id] || document.getElementById(id)) id = s + '-' + (k++);
      usados[id] = 1; el.id = id; return id;
    }
    const entradas = [];
    heads.forEach(h => {
      const txt = h.textContent.replace(/^\s*\d+\.\s*/, '').trim();   // saca "3. "
      if (txt) entradas.push({ id: idDe(h, txt), txt: txt, lvl: h.tagName === 'H3' ? 3 : 2, el: h });
    });
    const act = document.querySelector('section.actividades');
    if (act) { if (!act.id) act.id = 'actividades'; entradas.push({ id: act.id, txt: 'Actividades', lvl: 2, el: act }); }
    if (entradas.length < 3) return;               // un índice de 1-2 ítems no aporta
    const nav = document.createElement('nav');
    nav.id = 'toc'; nav.setAttribute('aria-label', 'Índice de esta página');
    const tit = document.createElement('p'); tit.className = 'toc-titulo'; tit.textContent = 'En esta página';
    nav.appendChild(tit);
    const links = {};
    entradas.forEach(e => {
      const a = document.createElement('a');
      a.href = '#' + e.id; a.className = 'toc-l toc-l' + e.lvl; a.textContent = e.txt;
      a.addEventListener('click', cerrarMenu);
      nav.appendChild(a); links[e.id] = a;
    });
    document.body.appendChild(nav);
    document.body.classList.add('con-toc');
    // Scroll-spy: resalta la sección visible más cercana al tope.
    let activo = null;
    function marcar(id) {
      if (activo === id) return;
      if (activo && links[activo]) links[activo].classList.remove('activo');
      activo = id; if (links[id]) links[id].classList.add('activo');
    }
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(es => {
        const vis = es.filter(x => x.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis.length) marcar(vis[0].target.id);
      }, { rootMargin: '-66px 0px -65% 0px', threshold: 0 });
      entradas.forEach(e => obs.observe(e.el));
    }
  }

  construirHeader();
  construirSidebar();
  navTema();
  portada();
  construirTOC();
  resaltar();

  // ---- Fase 2: cargar actividades de práctica del tema (si existen) ----
  if (slugActual) {
    const cargar = (src, cb) => {
      const s = document.createElement('script');
      s.src = src; s.onload = cb; s.onerror = () => {};
      document.body.appendChild(s);
    };
    cargar(base + 'assets/actividades.js', () => {
      cargar(base + 'assets/actividades/' + slugActual + '.js', () => {
        if (window.renderActividades) window.renderActividades();
      });
    });
  }
})();
