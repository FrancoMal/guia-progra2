/* Laboratorio interactivo de Grafos. Se monta en #grafo-visual (solo en temas/grafos.html).
   Dibujá el grafo (clic en dos vértices para conectar/desconectar), miralo junto a su matriz de
   adyacencia, y corré DFS / BFS animados. Sin dependencias, offline. */
(function () {
  const mount = document.getElementById('grafo-visual');
  if (!mount) return;
  const NS = 'http://www.w3.org/2000/svg';
  const R = 21;

  let vertices = [];     // etiquetas (números), índice = posición
  let adj = [];          // matriz n×n de 0/1 (por índice)
  let dirigido = false;
  let sel = null;        // índice seleccionado al construir aristas
  let animando = false;

  // ---- modelo ----
  function nuevoGrafo(n, aristas) {
    vertices = []; adj = [];
    for (let i = 0; i < n; i++) { vertices.push(i + 1); adj.push(new Array(n).fill(0)); }
    (aristas || []).forEach(([a, b]) => { adj[a][b] = 1; if (!dirigido) adj[b][a] = 1; });
  }
  function agregarVertice() {
    const lbl = vertices.length ? Math.max.apply(null, vertices) + 1 : 1;
    vertices.push(lbl);
    adj.forEach(f => f.push(0));
    adj.push(new Array(vertices.length).fill(0));
  }
  function toggleArista(i, j) {
    if (i === j) return;
    const val = adj[i][j] ? 0 : 1;
    adj[i][j] = val;
    if (!dirigido) adj[j][i] = val;
  }
  function hayArista(i, j) { return dirigido ? adj[i][j] : (adj[i][j] || adj[j][i]); }
  function vecinos(i) {
    const r = [];
    for (let j = 0; j < vertices.length; j++) if (i !== j && hayArista(i, j)) r.push(j);
    return r.sort((a, b) => vertices[a] - vertices[b]);
  }
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // ---- recorridos ----
  function dfsPasos(start) {
    const vis = new Array(vertices.length).fill(false), pasos = [];
    (function rec(u, p) { vis[u] = true; pasos.push({ u: u, from: p }); vecinos(u).forEach(v => { if (!vis[v]) rec(v, u); }); })(start, -1);
    return pasos;
  }
  function bfsPasos(start) {
    const vis = new Array(vertices.length).fill(false), pasos = [], q = [[start, -1]];
    vis[start] = true;
    while (q.length) {
      const item = q.shift(), u = item[0];
      pasos.push({ u: u, from: item[1] });
      vecinos(u).forEach(v => { if (!vis[v]) { vis[v] = true; q.push([v, u]); } });
    }
    return pasos;
  }

  // ---- estructura del widget ----
  mount.innerHTML =
    '<div class="lab-controles">' +
      '<div class="lab-grupo">' +
        '<button class="btn g-add">+ Vértice</button>' +
        '<button class="btn g-dir" aria-pressed="false">Dirigido: no</button>' +
        '<button class="btn g-vaciar">Vaciar</button>' +
      '</div>' +
      '<div class="lab-grupo">' +
        '<button class="btn lab-preset g-preset" data-g="ejemplo">Ejemplo</button>' +
        '<button class="btn lab-preset g-preset" data-g="ciclo">Ciclo</button>' +
      '</div>' +
    '</div>' +
    '<div class="lab-controles">' +
      '<div class="lab-grupo">' +
        '<span class="lab-lbl">Desde</span>' +
        '<select class="lab-input g-desde" aria-label="Vértice de inicio"></select>' +
        '<span class="lab-lbl">Recorrer</span>' +
        '<button class="btn lab-rec g-dfs">DFS</button>' +
        '<button class="btn lab-rec g-bfs">BFS</button>' +
      '</div>' +
    '</div>' +
    '<p class="grafo-hint">Hacé clic en dos vértices para <strong>conectar o desconectar</strong> una arista.</p>' +
    '<div class="lab-salida" aria-live="polite"><span class="lab-salida-lbl">Resultado</span><span class="lab-salida-vals"></span></div>' +
    '<div class="grafo-layout">' +
      '<div class="grafo-canvas lab-canvas"></div>' +
      '<div class="mat-box"><div class="mat-titulo">Matriz de adyacencia</div><div class="mat-wrap"></div></div>' +
    '</div>' +
    '<div class="lab-stats"></div>';

  const canvas = mount.querySelector('.grafo-canvas');
  const matWrap = mount.querySelector('.mat-wrap');
  const stats = mount.querySelector('.lab-stats');
  const salidaLbl = mount.querySelector('.lab-salida-lbl');
  const salidaVals = mount.querySelector('.lab-salida-vals');
  const desdeSel = mount.querySelector('.g-desde');

  let nodeEls = [], edgeEls = {};

  function setSalida(label) { salidaLbl.textContent = label; salidaVals.innerHTML = ''; }
  function pushVal(v) {
    salidaVals.querySelectorAll('.lab-val.actual').forEach(s => s.classList.remove('actual'));
    const s = document.createElement('span'); s.className = 'lab-val actual'; s.textContent = v;
    salidaVals.appendChild(s);
  }
  function actualizarStats() {
    const n = vertices.length;
    let m = 0;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (adj[i][j]) m++;
    if (!dirigido) m = m / 2;
    stats.textContent = n === 0 ? '' : 'Vértices: ' + n + '  ·  Aristas: ' + m + '  ·  ' + (dirigido ? 'dirigido' : 'no dirigido');
  }
  function actualizarDesde() {
    const prev = desdeSel.value;
    desdeSel.innerHTML = vertices.map((l, i) => '<option value="' + i + '">' + l + '</option>').join('');
    if (prev !== '' && +prev < vertices.length) desdeSel.value = prev;
  }

  // ---- render ----
  function render() {
    nodeEls = []; edgeEls = {};
    canvas.innerHTML = '';
    const n = vertices.length;
    if (n === 0) { canvas.innerHTML = '<p class="lab-vacio">Agregá vértices y conectalos, o cargá un ejemplo.</p>'; renderMatriz(); actualizarStats(); actualizarDesde(); return; }
    const RR = Math.max(82, n * 13);
    const C = RR + R + 22;
    const SZ = C * 2;
    const pos = i => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return { x: C + RR * Math.cos(a), y: C + RR * Math.sin(a) }; };
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + SZ + ' ' + SZ);
    svg.style.width = SZ + 'px'; svg.style.maxWidth = '100%'; svg.style.height = 'auto';
    // flecha (dirigido)
    if (dirigido) {
      const defs = document.createElementNS(NS, 'defs');
      defs.innerHTML = '<marker id="g-flecha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="grafo-flecha" d="M0,0 L10,5 L0,10 z"/></marker>';
      svg.appendChild(defs);
    }
    // aristas
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (!adj[i][j]) continue;
        if (!dirigido && j < i && adj[j][i]) continue; // no dirigido: una línea por par
        const p1 = pos(i), p2 = pos(j);
        let x2 = p2.x, y2 = p2.y;
        if (dirigido) { const dx = p2.x - p1.x, dy = p2.y - p1.y, d = Math.hypot(dx, dy) || 1; x2 = p2.x - dx / d * (R + 7); y2 = p2.y - dy / d * (R + 7); }
        const ln = document.createElementNS(NS, 'line');
        ln.setAttribute('x1', p1.x); ln.setAttribute('y1', p1.y); ln.setAttribute('x2', x2); ln.setAttribute('y2', y2);
        ln.setAttribute('class', 'grafo-edge');
        if (dirigido) ln.setAttribute('marker-end', 'url(#g-flecha)');
        svg.appendChild(ln);
        edgeEls[i + '-' + j] = ln;
      }
    }
    // nodos
    for (let i = 0; i < n; i++) {
      const p = pos(i);
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'grafo-nodo'); g.dataset.i = i;
      g.setAttribute('transform', 'translate(' + p.x + ',' + p.y + ')');
      const c = document.createElementNS(NS, 'circle'); c.setAttribute('r', R);
      const t = document.createElementNS(NS, 'text'); t.setAttribute('text-anchor', 'middle'); t.setAttribute('dy', '0.34em'); t.textContent = vertices[i];
      g.appendChild(c); g.appendChild(t); svg.appendChild(g);
      if (i === sel) g.classList.add('sel');
      g.addEventListener('click', () => onNodeClick(i));
      nodeEls[i] = g;
    }
    canvas.appendChild(svg);
    renderMatriz();
    actualizarStats();
    actualizarDesde();
  }

  function renderMatriz() {
    const n = vertices.length;
    if (n === 0) { matWrap.innerHTML = ''; return; }
    let html = '<table class="mat"><thead><tr><th></th>';
    vertices.forEach(l => html += '<th>' + l + '</th>');
    html += '</tr></thead><tbody>';
    for (let i = 0; i < n; i++) {
      html += '<tr data-r="' + i + '"><th>' + vertices[i] + '</th>';
      for (let j = 0; j < n; j++) html += '<td data-r="' + i + '" data-c="' + j + '"' + (adj[i][j] ? ' class="uno"' : '') + '>' + (adj[i][j] ? '1' : '·') + '</td>';
      html += '</tr>';
    }
    matWrap.innerHTML = html + '</tbody></table>';
  }

  // ---- interacción ----
  function onNodeClick(i) {
    if (animando) return;
    if (sel === null) { sel = i; }
    else if (sel === i) { sel = null; }
    else { toggleArista(sel, i); sel = null; }
    render();
  }
  function setDisabled(d) { animando = d; mount.querySelectorAll('button, select').forEach(el => { el.disabled = d; }); }
  function limpiar() {
    nodeEls.forEach(g => g && g.classList.remove('visitando', 'visitado'));
    Object.values(edgeEls).forEach(e => e.classList.remove('activa'));
    matWrap.querySelectorAll('.fila-activa').forEach(tr => tr.classList.remove('fila-activa'));
    matWrap.querySelectorAll('.celda-activa').forEach(td => td.classList.remove('celda-activa'));
  }
  function edge(a, b) { return edgeEls[a + '-' + b] || edgeEls[b + '-' + a]; }

  async function recorrer(tipo) {
    if (animando || vertices.length === 0) return;
    const start = +desdeSel.value || 0;
    setDisabled(true); limpiar();
    const pasos = (tipo === 'dfs' ? dfsPasos : bfsPasos)(start);
    setSalida((tipo === 'dfs' ? 'DFS' : 'BFS') + ' desde ' + vertices[start] + ':');
    for (const paso of pasos) {
      matWrap.querySelectorAll('.fila-activa').forEach(tr => tr.classList.remove('fila-activa'));
      matWrap.querySelectorAll('.celda-activa').forEach(td => td.classList.remove('celda-activa'));
      nodeEls[paso.u].classList.add('visitando');
      const fila = matWrap.querySelector('tr[data-r="' + paso.u + '"]');
      if (fila) fila.classList.add('fila-activa');
      if (paso.from >= 0) {
        const e = edge(paso.from, paso.u); if (e) e.classList.add('activa');
        const celda = matWrap.querySelector('td[data-r="' + paso.from + '"][data-c="' + paso.u + '"]');
        if (celda) celda.classList.add('celda-activa');
      }
      pushVal(vertices[paso.u]);
      await sleep(700);
      nodeEls[paso.u].classList.remove('visitando');
      nodeEls[paso.u].classList.add('visitado');
    }
    const total = vertices.length;
    if (pasos.length < total) salidaLbl.textContent += '  (alcanzó ' + pasos.length + ' de ' + total + ' vértices)';
    setDisabled(false);
  }

  // ---- eventos ----
  mount.querySelector('.g-add').onclick = () => { agregarVertice(); render(); };
  mount.querySelector('.g-vaciar').onclick = () => { if (animando) return; vertices = []; adj = []; sel = null; render(); setSalida('Grafo vacío'); };
  mount.querySelector('.g-dir').onclick = e => {
    if (animando) return;
    dirigido = !dirigido;
    e.currentTarget.textContent = 'Dirigido: ' + (dirigido ? 'sí' : 'no');
    e.currentTarget.setAttribute('aria-pressed', dirigido ? 'true' : 'false');
    render();
  };
  mount.querySelector('.g-dfs').onclick = () => recorrer('dfs');
  mount.querySelector('.g-bfs').onclick = () => recorrer('bfs');
  mount.querySelectorAll('.g-preset').forEach(b => {
    b.onclick = () => {
      if (animando) return;
      sel = null;
      if (b.dataset.g === 'ciclo') nuevoGrafo(5, [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]);
      else nuevoGrafo(4, [[0, 1], [0, 2], [1, 3], [2, 3]]);
      render();
      setSalida('Probá DFS o BFS, o tocá vértices para editar ↑');
    };
  });

  // arranque
  nuevoGrafo(4, [[0, 1], [0, 2], [1, 3], [2, 3]]);
  render();
  setSalida('Probá DFS o BFS, o conectá vértices con un clic ↑');
})();
