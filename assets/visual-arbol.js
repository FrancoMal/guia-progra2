/* Laboratorio interactivo de Árbol Binario de Búsqueda (ABB).
   Se monta en #arbol-visual (solo existe en temas/arboles.html). Sin dependencias,
   offline. Insertá valores, mirá el árbol armarse, y corré los recorridos animados. */
(function () {
  const mount = document.getElementById('arbol-visual');
  if (!mount) return;
  const NS = 'http://www.w3.org/2000/svg';
  const COLW = 64, ROWH = 80, R = 21;

  let root = null;
  let animando = false;

  // ---- ABB ----
  function insertar(v) { root = ins(root, v); }
  function ins(n, v) {
    if (!n) return { v: v, izq: null, der: null, _el: null };
    if (v < n.v) n.izq = ins(n.izq, v);
    else if (v > n.v) n.der = ins(n.der, v);
    return n;
  }
  function existe(n, v) { while (n) { if (v === n.v) return true; n = v < n.v ? n.izq : n.der; } return false; }
  function altura(n) { return n ? 1 + Math.max(altura(n.izq), altura(n.der)) : 0; }
  function contar(n) { return n ? 1 + contar(n.izq) + contar(n.der) : 0; }
  function inorden(n, a) { if (!n) return; inorden(n.izq, a); a.push(n); inorden(n.der, a); }
  function preorden(n, a) { if (!n) return; a.push(n); preorden(n.izq, a); preorden(n.der, a); }
  function postorden(n, a) { if (!n) return; postorden(n.izq, a); postorden(n.der, a); a.push(n); }
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // ---- Estructura del widget ----
  mount.innerHTML =
    '<div class="lab-controles">' +
      '<div class="lab-grupo">' +
        '<input class="lab-input" id="lab-num" type="number" inputmode="numeric" placeholder="n.º" aria-label="Valor a insertar">' +
        '<button class="btn lab-insertar">Insertar</button>' +
        '<button class="btn lab-azar">Al azar</button>' +
      '</div>' +
      '<div class="lab-grupo">' +
        '<button class="btn lab-preset" data-seq="50,30,70,20,40,60,80">Ej. balanceado</button>' +
        '<button class="btn lab-preset" data-seq="1,2,3,4,5,6">Ej. degenerado</button>' +
        '<button class="btn lab-vaciar">Vaciar</button>' +
      '</div>' +
    '</div>' +
    '<div class="lab-controles">' +
      '<div class="lab-grupo">' +
        '<span class="lab-lbl">Recorrer:</span>' +
        '<button class="btn lab-rec" data-rec="pre">Preorden</button>' +
        '<button class="btn lab-rec" data-rec="in">Inorden</button>' +
        '<button class="btn lab-rec" data-rec="post">Postorden</button>' +
      '</div>' +
      '<div class="lab-grupo">' +
        '<input class="lab-input" id="lab-buscar" type="number" inputmode="numeric" placeholder="buscar…" aria-label="Valor a buscar">' +
        '<button class="btn lab-buscar">Buscar</button>' +
      '</div>' +
    '</div>' +
    '<div class="lab-salida" aria-live="polite"><span class="lab-salida-lbl">Resultado</span><span class="lab-salida-vals"></span></div>' +
    '<div class="lab-canvas"></div>' +
    '<div class="lab-stats"></div>';

  const canvas = mount.querySelector('.lab-canvas');
  const stats = mount.querySelector('.lab-stats');
  const salidaLbl = mount.querySelector('.lab-salida-lbl');
  const salidaVals = mount.querySelector('.lab-salida-vals');
  const numInput = mount.querySelector('#lab-num');
  const buscarInput = mount.querySelector('#lab-buscar');

  function setSalida(label, vals) {
    salidaLbl.textContent = label;
    salidaVals.innerHTML = '';
    (vals || []).forEach(v => pushVal(v));
  }
  function pushVal(v, actual) {
    salidaVals.querySelectorAll('.lab-val.actual').forEach(s => s.classList.remove('actual'));
    const s = document.createElement('span');
    s.className = 'lab-val' + (actual ? ' actual' : '');
    s.textContent = v;
    salidaVals.appendChild(s);
  }
  function actualizarStats() {
    const n = contar(root);
    stats.textContent = n === 0 ? '' : 'Nodos: ' + n + '  ·  Altura: ' + altura(root) +
      (n > 0 && altura(root) === n ? '  ·  ⚠️ degenerado (lista) → buscar O(n)' : '');
  }
  function limpiarEstados() {
    canvas.querySelectorAll('.lab-nodo').forEach(g => g.classList.remove('visitando', 'visitado', 'en-camino', 'encontrado'));
  }

  // ---- Render SVG ----
  function render(nuevoVal) {
    canvas.innerHTML = '';
    const orden = []; inorden(root, orden);
    const n = orden.length;
    if (n === 0) {
      canvas.innerHTML = '<p class="lab-vacio">Insertá valores (o cargá un ejemplo) para ver cómo se arma el árbol.</p>';
      actualizarStats();
      return;
    }
    const h = altura(root);
    orden.forEach((nd, i) => { nd._col = i; });
    (function depth(nd, d) { if (!nd) return; nd._d = d; depth(nd.izq, d + 1); depth(nd.der, d + 1); })(root, 0);
    const W = n * COLW, H = h * ROWH;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.width = W + 'px'; svg.style.maxWidth = '100%'; svg.style.height = 'auto';
    const pos = nd => ({ x: (nd._col + 0.5) * COLW, y: (nd._d + 0.5) * ROWH });
    // aristas primero (debajo de los nodos)
    (function edges(nd) {
      if (!nd) return;
      const p = pos(nd);
      [nd.izq, nd.der].forEach(c => {
        if (c) {
          const pc = pos(c);
          const ln = document.createElementNS(NS, 'line');
          ln.setAttribute('x1', p.x); ln.setAttribute('y1', p.y);
          ln.setAttribute('x2', pc.x); ln.setAttribute('y2', pc.y);
          ln.setAttribute('class', 'lab-edge');
          svg.appendChild(ln);
        }
      });
      edges(nd.izq); edges(nd.der);
    })(root);
    // nodos
    orden.forEach(nd => {
      const p = pos(nd);
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'lab-nodo');
      g.setAttribute('transform', 'translate(' + p.x + ',' + p.y + ')');
      g.dataset.v = nd.v;
      const c = document.createElementNS(NS, 'circle'); c.setAttribute('r', R);
      const t = document.createElementNS(NS, 'text'); t.setAttribute('text-anchor', 'middle'); t.setAttribute('dy', '0.34em'); t.textContent = nd.v;
      g.appendChild(c); g.appendChild(t); svg.appendChild(g); nd._el = g;
      if (nuevoVal != null && nd.v === nuevoVal) g.classList.add('nodo-nuevo');
    });
    canvas.appendChild(svg);
    actualizarStats();
  }

  function setDisabled(d) {
    animando = d;
    mount.querySelectorAll('button, input').forEach(el => { el.disabled = d; });
  }

  // ---- Acciones ----
  function agregarValor(v, nuevo) {
    if (!Number.isFinite(v)) return false;
    if (existe(root, v)) { render(); flashExiste(v); return false; }
    insertar(v); render(nuevo ? v : null); return true;
  }
  function flashExiste(v) { setSalida('El valor ' + v + ' ya está en el árbol', []); }

  async function insertarSecuencia(seq) {
    if (animando) return;
    setDisabled(true);
    root = null; render(); setSalida('Construyendo…', []);
    for (const v of seq) {
      if (!existe(root, v)) { insertar(v); render(v); }
      await sleep(280);
    }
    setSalida('Listo: ' + seq.length + ' valores insertados', []);
    setDisabled(false);
  }

  async function animarRecorrido(tipo) {
    if (animando || !root) return;
    setDisabled(true);
    limpiarEstados();
    const a = [];
    ({ pre: preorden, in: inorden, post: postorden })[tipo](root, a);
    const nombre = { pre: 'Preorden (raíz, izq, der)', in: 'Inorden (izq, raíz, der)', post: 'Postorden (izq, der, raíz)' }[tipo];
    setSalida(nombre + ':', []);
    for (let i = 0; i < a.length; i++) {
      const nd = a[i];
      nd._el.classList.add('visitando');
      pushVal(nd.v, true);
      await sleep(620);
      nd._el.classList.remove('visitando');
      nd._el.classList.add('visitado');
    }
    setDisabled(false);
  }

  async function animarBusqueda(v) {
    if (animando || !root || !Number.isFinite(v)) return;
    setDisabled(true);
    limpiarEstados();
    setSalida('Buscando ' + v + ':', []);
    let n = root;
    while (n) {
      n._el.classList.add('en-camino');
      pushVal(n.v, true);
      await sleep(560);
      if (v === n.v) { n._el.classList.remove('en-camino'); n._el.classList.add('encontrado'); salidaLbl.textContent = '✓ Encontrado: ' + v + ' (comparaciones: ' + (salidaVals.children.length) + ')'; setDisabled(false); return; }
      n._el.classList.add('visitado');
      n = v < n.v ? n.izq : n.der;
    }
    salidaLbl.textContent = '✗ ' + v + ' no está en el árbol (recorrido el camino hasta un hueco)';
    setDisabled(false);
  }

  // ---- Eventos ----
  function leer(input) { const v = parseInt(input.value, 10); return Number.isFinite(v) ? v : null; }
  mount.querySelector('.lab-insertar').onclick = () => { const v = leer(numInput); if (v != null) { agregarValor(v, true); numInput.value = ''; numInput.focus(); } };
  numInput.addEventListener('keydown', e => { if (e.key === 'Enter') mount.querySelector('.lab-insertar').click(); });
  mount.querySelector('.lab-azar').onclick = () => {
    for (let i = 0; i < 30; i++) { const v = Math.floor(Math.random() * 99) + 1; if (!existe(root, v)) { agregarValor(v, true); return; } }
  };
  mount.querySelector('.lab-vaciar').onclick = () => { if (animando) return; root = null; render(); setSalida('Árbol vacío', []); };
  mount.querySelectorAll('.lab-preset').forEach(b => { b.onclick = () => insertarSecuencia(b.dataset.seq.split(',').map(Number)); });
  mount.querySelectorAll('.lab-rec').forEach(b => { b.onclick = () => animarRecorrido(b.dataset.rec); });
  mount.querySelector('.lab-buscar').onclick = () => { const v = leer(buscarInput); if (v != null) animarBusqueda(v); };
  buscarInput.addEventListener('keydown', e => { if (e.key === 'Enter') mount.querySelector('.lab-buscar').click(); });

  // arranque con un ejemplo
  [50, 30, 70, 20, 40, 60].forEach(insertar);
  render();
  setSalida('Probá los recorridos, o insertá y buscá valores ↑', []);
})();
