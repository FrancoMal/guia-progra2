/* Cromo compartido de la guía: menú lateral, tema claro/oscuro, progreso,
   navegación anterior/siguiente y resaltado de Java. Sin dependencias ni fetch:
   funciona abriendo los archivos con doble clic (file://). */
(function () {
  const enTemas = /\/temas\//.test(location.pathname) || !!document.body.dataset.tema;
  const base = enTemas ? '../' : '';
  const slugActual = document.body.dataset.tema || null;

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
    document.querySelectorAll('pre>code.java, code.lang-java').forEach(c => { c.innerHTML = highlightJava(c.textContent); });
  }

  // ---- Header ----
  function construirHeader() {
    const h = document.createElement('header');
    h.className = 'app-header';
    h.innerHTML =
      '<button class="hamburguesa" aria-label="Abrir menú">☰</button>' +
      '<h1><a href="' + base + 'index.html" style="color:inherit;text-decoration:none">📘 Programación 2</a></h1>' +
      '<span class="spacer"></span>' +
      '<button class="btn" id="toggle-tema">' + (tema === 'oscuro' ? '☀️ Claro' : '🌙 Oscuro') + '</button>';
    document.body.prepend(h);
    const btn = h.querySelector('#toggle-tema');
    btn.onclick = () => {
      tema = tema === 'oscuro' ? 'claro' : 'oscuro';
      localStorage.setItem(LS_TEMA, tema);
      aplicarTema(tema);
      btn.textContent = tema === 'oscuro' ? '☀️ Claro' : '🌙 Oscuro';
    };
    h.querySelector('.hamburguesa').onclick = () => document.getElementById('sidebar').classList.toggle('abierto');
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
  }

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
      '<div class="progreso"><strong>Progreso:</strong> ' + hechos + '/' + TEMAS.length + ' temas leídos' +
      '<div class="barra"><span style="width:' + pct + '%"></span></div></div>' +
      '<div class="cards">' + cards + '</div>';
  }

  construirHeader();
  construirSidebar();
  navTema();
  portada();
  resaltar();
})();
