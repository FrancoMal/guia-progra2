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
  let modoAVL = false;
  let resetSeq = 0;   // se incrementa al reiniciar para cancelar animaciones en curso

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

  // ---- AVL: equilibrio y rotaciones (solo se usan en modo AVL; no afectan al ABB) ----
  // Factor de equilibrio: FE = altura(der) − altura(izq).
  function fe(n) { return n ? altura(n.der) - altura(n.izq) : 0; }
  // ¿Hay algún nodo en TODO el árbol con |FE| > 1? (recorre el árbol entero).
  function hayDesbalance(n) { return !!n && (Math.abs(fe(n)) > 1 || hayDesbalance(n.izq) || hayDesbalance(n.der)); }

  // Padre de un nodo dentro de un árbol (null si es la raíz o no está).
  function padreDe(raiz, nodo) {
    let p = null, n = raiz;
    while (n && n !== nodo) { p = n; n = nodo.v < n.v ? n.izq : n.der; }
    return n === nodo ? p : null;
  }

  // Camino raíz→valor recién insertado (de raíz a hoja).
  function caminoHasta(raiz, v) {
    const c = []; let n = raiz;
    while (n) { c.push(n); if (v === n.v) break; n = v < n.v ? n.izq : n.der; }
    return c;
  }

  // Primer nodo desequilibrado subiendo desde la hoja (el más profundo).
  function primerDesbalanceado(raiz, v) {
    const c = caminoHasta(raiz, v);
    for (let i = c.length - 1; i >= 0; i--) if (Math.abs(fe(c[i])) > 1) return c[i];
    return null;
  }

  // Rotaciones puras: devuelven la nueva raíz del subárbol rotado.
  function rotarDerecha(z) { const y = z.izq; z.izq = y.der; y.der = z; return y; } // LL
  function rotarIzquierda(z) { const y = z.der; z.der = y.izq; y.izq = z; return y; } // RR

  // Aplica el caso de rotación a 'z' y reengancha el resultado en su padre.
  function aplicarRotacion(z, caso) {
    let nueva;
    if (caso === 'LL') nueva = rotarDerecha(z);
    else if (caso === 'RR') nueva = rotarIzquierda(z);
    else if (caso === 'LR') { z.izq = rotarIzquierda(z.izq); nueva = rotarDerecha(z); }
    else if (caso === 'RL') { z.der = rotarDerecha(z.der); nueva = rotarIzquierda(z); }
    else return;
    const p = padreDe(root, z);
    if (!p) root = nueva;
    else if (p.izq === z) p.izq = nueva;
    else p.der = nueva;
  }

  // Caso correcto según el desequilibrio (regla mismo signo / signo distinto).
  function casoCorrecto(z) {
    if (fe(z) < -1) { // pesado a la izquierda
      return fe(z.izq) <= 0 ? 'LL' : 'LR';
    } else { // pesado a la derecha (fe > 1)
      return fe(z.der) >= 0 ? 'RR' : 'RL';
    }
  }

  // Hijo del lado pesado de un nodo desequilibrado.
  function hijoPesado(z) { return fe(z) < 0 ? z.izq : z.der; }

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
        '<button class="btn lab-reiniciar">↺ Reiniciar</button>' +
      '</div>' +
      '<div class="lab-grupo">' +
        '<label class="lab-lbl" style="display:inline-flex;align-items:center;gap:.4rem;cursor:pointer;text-transform:none;letter-spacing:0;font-size:.85rem;">' +
          '<input type="checkbox" id="lab-avl" style="width:1rem;height:1rem;accent-color:var(--accent);cursor:pointer;"> Modo AVL (auto-equilibrado)' +
        '</label>' +
      '</div>' +
    '</div>' +
    '<div class="lab-controles" id="lab-avl-fila" hidden>' +
      '<div class="lab-grupo">' +
        '<span class="lab-lbl">Casos AVL:</span>' +
        '<button class="btn lab-preset-avl" data-seq="30,20,10">→ LL</button>' +
        '<button class="btn lab-preset-avl" data-seq="10,20,30">→ RR</button>' +
        '<button class="btn lab-preset-avl" data-seq="30,10,20">→ LR</button>' +
        '<button class="btn lab-preset-avl" data-seq="10,30,20">→ RL</button>' +
      '</div>' +
      '<div class="lab-grupo">' +
        '<span class="lab-lbl">Rotar:</span>' +
        '<button class="btn lab-rot" data-rot="LL" disabled>LL</button>' +
        '<button class="btn lab-rot" data-rot="RR" disabled>RR</button>' +
        '<button class="btn lab-rot" data-rot="LR" disabled>LR</button>' +
        '<button class="btn lab-rot" data-rot="RL" disabled>RL</button>' +
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
  const avlCheck = mount.querySelector('#lab-avl');
  const avlFila = mount.querySelector('#lab-avl-fila');
  const rotBtns = Array.from(mount.querySelectorAll('.lab-rot'));
  let mostrarFE = false; // dibujar badges de factor de equilibrio en cada nodo

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
    if (n === 0) { stats.textContent = ''; return; }
    let txt = 'Nodos: ' + n + '  ·  Altura: ' + altura(root);
    if (modoAVL) {
      txt += '  ·  Modo AVL: el árbol se mantiene equilibrado (altura ≈ log₂ n)';
    } else if (altura(root) === n) {
      txt += '  ·  ⚠️ degenerado (lista) → buscar O(n)';
    }
    stats.textContent = txt;
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
      if (mostrarFE) {
        const f = fe(nd);
        const badge = document.createElementNS(NS, 'text');
        badge.setAttribute('text-anchor', 'middle');
        // Bien arriba del nodo para que el círculo agrandado (al resaltar) no lo tape.
        badge.setAttribute('x', 0); badge.setAttribute('y', -(R + 8));
        badge.setAttribute('font-size', '13');
        badge.setAttribute('font-family', 'var(--font-mono)');
        badge.setAttribute('font-weight', '700');
        // El color va por STYLE inline (no por atributo) para ganarle a la regla
        // ".lab-nodo.encontrado text { fill:#fff }" que, si no, pintaría de blanco el
        // FE de los nodos resaltados durante una rotación.
        badge.style.fill = Math.abs(f) > 1 ? 'var(--err)' : (f === 0 ? 'var(--muted)' : 'var(--accent-2)');
        badge.style.paintOrder = 'stroke';     // halo papel detrás del número (legible sobre aristas)
        badge.style.stroke = 'var(--surface)';
        badge.style.strokeWidth = '2px';
        badge.textContent = (f > 0 ? '+' : '') + f;
        g.appendChild(badge);
      }
      if (nuevoVal != null && nd.v === nuevoVal) g.classList.add('nodo-nuevo');
    });
    canvas.appendChild(svg);
    actualizarStats();
  }

  function setDisabled(d) {
    animando = d;
    mount.querySelectorAll('button, input').forEach(el => { el.disabled = d; });
    // Los botones de rotación solo se habilitan durante una pausa de equilibrado.
    if (!d) rotBtns.forEach(b => { b.disabled = true; });
    // "Reiniciar" queda SIEMPRE disponible: también sirve para salir de una
    // animación o de una pausa de rotación AVL a medio resolver.
    const rb = mount.querySelector('.lab-reiniciar');
    if (rb) rb.disabled = false;
  }

  // ---- Acciones ----
  function agregarValor(v, nuevo) {
    if (!Number.isFinite(v)) return false;
    if (existe(root, v)) { render(); flashExiste(v); return false; }
    insertar(v); render(nuevo ? v : null); return true;
  }
  function flashExiste(v) { setSalida('El valor ' + v + ' ya está en el árbol', []); }

  // ---- Flujo AVL interactivo ----
  function resaltar(nodo, clase) { if (nodo && nodo._el) nodo._el.classList.add(clase); }

  // Habilita/inhabilita solo los 4 botones de rotación.
  function rotEnabled(on) { rotBtns.forEach(b => { b.disabled = !on; }); }

  // Espera a que el usuario elija una rotación; devuelve 'LL'|'RR'|'LR'|'RL'.
  let esperarRotacion = null;
  function pedirRotacion() {
    return new Promise(resolve => {
      esperarRotacion = caso => { esperarRotacion = null; rotEnabled(false); resolve(caso); };
      rotEnabled(true);
    });
  }

  // Inserta un valor en modo AVL: detecta el primer nodo desbalanceado,
  // pausa, pide la rotación al usuario y la aplica con animación.
  async function agregarValorAVL(v) {
    if (!Number.isFinite(v)) return;
    const mi = resetSeq;
    if (existe(root, v)) { render(); flashExiste(v); return; }
    insertar(v);
    mostrarFE = true;
    render(v);
    setSalida('Insertado ' + v + '. Factores de equilibrio (FE = altura der − altura izq) arriba de cada nodo.', []);
    await sleep(650);
    if (mi !== resetSeq) return;

    // Mientras quede algún nodo con |FE| > 1, pedir y aplicar rotaciones
    // (una sola inserción suele necesitar una; el bucle lo hace robusto).
    let z = primerDesbalanceado(root, v);
    if (!z) {
      setSalida('✓ ' + v + ' insertado. Todos los |FE| ≤ 1: el árbol sigue equilibrado.', []);
      return;
    }
    while (z) {
      const feZ = fe(z);
      const lado = feZ < 0 ? 'izquierda' : 'derecha';
      const hijo = hijoPesado(z);
      limpiarEstados();
      render(v); // re-render: limpia estados pero mantiene los badges de FE
      resaltar(z, 'encontrado');
      if (hijo) resaltar(hijo, 'en-camino');
      const correcto = casoCorrecto(z);
      setSalida('⚠️ Desequilibrio en el nodo ' + z.v + ' (FE = ' + (feZ > 0 ? '+' : '') + feZ + ', pesado a la ' + lado +
        '). Regla: signos iguales → rotación simple (LL/RR); signos distintos → rotación doble (LR/RL). Elegí la rotación ↑', []);

      // Esperar la elección del usuario (con reintentos si se equivoca).
      let caso = await pedirRotacion();
      if (mi !== resetSeq) return;
      while (caso !== correcto) {
        const explicacion = (caso === 'LL' || caso === 'RR')
          ? 'pediste una rotación simple, pero acá los signos del nodo y su hijo difieren.'
          : 'pediste una rotación doble, pero acá los signos coinciden.';
        setSalida('✗ ' + caso + ' no resuelve este caso: ' + explicacion + ' Probá otra vez ↑', []);
        caso = await pedirRotacion();
        if (mi !== resetSeq) return;
      }

      // Aplicar y animar.
      const doble = caso[0] !== caso[1];
      setSalida('✓ ' + caso + ' es la correcta. Aplicando rotación ' + (doble ? 'doble' : 'simple') + '…', []);
      await sleep(550);
      if (mi !== resetSeq) return;
      aplicarRotacion(z, caso);
      render(v);
      await sleep(450);
      if (mi !== resetSeq) return;
      z = primerDesbalanceado(root, v);
    }
    limpiarEstados();
    render(v);
    setSalida('✓ Árbol reequilibrado: todos los |FE| ≤ 1.', []);
  }

  // Inserta una secuencia en modo AVL, pausando en cada desequilibrio.
  async function insertarSecuenciaAVL(seq) {
    if (animando) return;
    setDisabled(true);
    const mi = resetSeq;
    root = null; mostrarFE = true; render();
    for (const v of seq) {
      await agregarValorAVL(v);
      if (mi !== resetSeq) return;
      await sleep(360);
      if (mi !== resetSeq) return;
    }
    setDisabled(false);
  }

  // Inserta un único valor en modo AVL (envuelve el bloqueo de controles).
  async function insertarUnoAVL(v) {
    if (animando || v == null) return;
    setDisabled(true);
    await agregarValorAVL(v);
    setDisabled(false);
  }

  async function insertarSecuencia(seq) {
    if (animando) return;
    setDisabled(true);
    const mi = resetSeq;
    root = null; render(); setSalida('Construyendo…', []);
    for (const v of seq) {
      if (!existe(root, v)) { insertar(v); render(v); }
      await sleep(280);
      if (mi !== resetSeq) return;
    }
    setSalida('Listo: ' + seq.length + ' valores insertados', []);
    setDisabled(false);
  }

  async function animarRecorrido(tipo) {
    if (animando || !root) return;
    setDisabled(true);
    const mi = resetSeq;
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
      if (mi !== resetSeq) return;
      nd._el.classList.remove('visitando');
      nd._el.classList.add('visitado');
    }
    setDisabled(false);
  }

  async function animarBusqueda(v) {
    if (animando || !root || !Number.isFinite(v)) return;
    setDisabled(true);
    const mi = resetSeq;
    limpiarEstados();
    setSalida('Buscando ' + v + ':', []);
    let n = root;
    while (n) {
      n._el.classList.add('en-camino');
      pushVal(n.v, true);
      await sleep(560);
      if (mi !== resetSeq) return;
      if (v === n.v) { n._el.classList.remove('en-camino'); n._el.classList.add('encontrado'); salidaLbl.textContent = '✓ Encontrado: ' + v + ' (comparaciones: ' + (salidaVals.children.length) + ')'; setDisabled(false); return; }
      n._el.classList.add('visitado');
      n = v < n.v ? n.izq : n.der;
    }
    salidaLbl.textContent = '✗ ' + v + ' no está en el árbol (recorrido el camino hasta un hueco)';
    setDisabled(false);
  }

  // ---- Reiniciar: vuelve al ejemplo inicial; cancela cualquier animación o pausa AVL ----
  const EJEMPLO_INICIAL = [50, 30, 70, 20, 40, 60];
  function reiniciar() {
    resetSeq++;                                      // invalida animaciones en curso
    if (esperarRotacion) esperarRotacion('cancel');  // destraba una pausa de rotación AVL
    animando = false;
    setDisabled(false);
    modoAVL = avlCheck.checked;                      // respeta el toggle actual de AVL
    mostrarFE = modoAVL;
    limpiarEstados();
    root = null;
    EJEMPLO_INICIAL.forEach(insertar);
    render();
    setSalida(modoAVL ? 'Reiniciado al ejemplo inicial (modo AVL activo).' : 'Reiniciado al ejemplo inicial.', []);
  }

  // ---- Eventos ----
  function leer(input) { const v = parseInt(input.value, 10); return Number.isFinite(v) ? v : null; }
  mount.querySelector('.lab-insertar').onclick = () => {
    if (animando) return;
    const v = leer(numInput);
    if (v == null) return;
    numInput.value = '';
    if (modoAVL) { insertarUnoAVL(v); numInput.focus(); }
    else { agregarValor(v, true); numInput.focus(); }
  };
  numInput.addEventListener('keydown', e => { if (e.key === 'Enter') mount.querySelector('.lab-insertar').click(); });
  mount.querySelector('.lab-azar').onclick = () => {
    if (animando) return;
    for (let i = 0; i < 40; i++) {
      const v = Math.floor(Math.random() * 99) + 1;
      if (!existe(root, v)) { if (modoAVL) insertarUnoAVL(v); else agregarValor(v, true); return; }
    }
  };
  mount.querySelector('.lab-vaciar').onclick = () => { if (animando) return; root = null; render(); setSalida(modoAVL ? 'Árbol AVL vacío' : 'Árbol vacío', []); };
  mount.querySelector('.lab-reiniciar').onclick = reiniciar;   // siempre activo (también destraba)
  mount.querySelectorAll('.lab-preset').forEach(b => { b.onclick = () => { if (animando) return; const seq = b.dataset.seq.split(',').map(Number); if (modoAVL) insertarSecuenciaAVL(seq); else insertarSecuencia(seq); }; });
  mount.querySelectorAll('.lab-preset-avl').forEach(b => { b.onclick = () => { if (animando) return; insertarSecuenciaAVL(b.dataset.seq.split(',').map(Number)); }; });
  rotBtns.forEach(b => { b.onclick = () => { if (esperarRotacion) esperarRotacion(b.dataset.rot); }; });
  mount.querySelectorAll('.lab-rec').forEach(b => { b.onclick = () => animarRecorrido(b.dataset.rec); });
  mount.querySelector('.lab-buscar').onclick = () => { const v = leer(buscarInput); if (v != null) animarBusqueda(v); };
  buscarInput.addEventListener('keydown', e => { if (e.key === 'Enter') mount.querySelector('.lab-buscar').click(); });

  // Toggle Modo AVL: muestra los controles de rotación y los factores de equilibrio.
  // NO reconstruye el árbol (eso disparaba rotaciones apenas se tildaba el modo, lo
  // cual confundía): solo muestra los FE sobre el árbol actual. Las rotaciones
  // aparecen al INSERTAR valores nuevos o al probar un caso (→ LL/RR/LR/RL).
  avlCheck.onchange = () => {
    if (animando) { avlCheck.checked = modoAVL; return; }
    modoAVL = avlCheck.checked;
    avlFila.hidden = !modoAVL;
    rotEnabled(false);
    mostrarFE = modoAVL;
    limpiarEstados();
    render();
    if (modoAVL) {
      const desbalanceado = hayDesbalance(root);
      setSalida(desbalanceado
        ? 'Modo AVL activado. Ojo: este árbol ya tiene algún |FE| > 1 (no es AVL válido). Insertá un valor para reequilibrar, o reiniciá.'
        : 'Modo AVL activado: arriba de cada nodo está su factor de equilibrio (FE = altura der − altura izq). Insertá valores o probá un caso (→ LL/RR/LR/RL); cuando algún |FE| > 1, vas a elegir la rotación.', []);
    } else {
      setSalida('Modo AVL desactivado: vuelve a comportarse como un ABB común.', []);
    }
  };

  // arranque con un ejemplo
  EJEMPLO_INICIAL.forEach(insertar);
  render();
  setSalida('Probá los recorridos, o insertá y buscá valores ↑', []);
})();
