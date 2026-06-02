/* Laboratorio interactivo de Árbol B (orden t=2: 2..4 claves por nodo).
   Se monta en #arbolb-visual (solo existe en temas/arbol-b.html). Sin dependencias,
   offline. Insertá claves y mirá cómo la hoja se desborda y se DIVIDE, subiendo la
   clave del medio al padre; cuando la división llega a la raíz, crece la altura. */
(function () {
  const mount = document.getElementById('arbolb-visual');
  if (!mount) return;
  const NS = 'http://www.w3.org/2000/svg';

  // Orden mínimo t=2: cada nodo (salvo la raíz) tiene entre t-1=1 y 2t-1=3 claves.
  // Permitimos un OVERFLOW temporal de 4 claves para animar la división.
  const T = 2;
  const MAX_KEYS = 2 * T - 1;          // 3 claves como máximo "estable"
  const OVERFLOW = MAX_KEYS + 1;       // 4 claves dispara la división

  // Geometría del dibujo
  const KW = 36, NH = 34, PADX = 24, GAPX = 28, ROWH = 92, MARGIN = 16;

  let root = nodoNuevo(true);
  let animando = false;

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // ---- Estructura del Árbol B ----
  function nodoNuevo(hoja) { return { claves: [], hijos: [], hoja: !!hoja, _el: null }; }

  function existe(n, v) {
    let i = 0;
    while (i < n.claves.length && v > n.claves[i]) i++;
    if (i < n.claves.length && v === n.claves[i]) return true;
    return n.hoja ? false : existe(n.hijos[i], v);
  }

  function altura(n) { let h = 1; while (!n.hoja) { n = n.hijos[0]; h++; } return h; }
  function contarClaves(n) {
    let c = n.claves.length;
    if (!n.hoja) n.hijos.forEach(h => { c += contarClaves(h); });
    return c;
  }

  // Localiza la hoja donde caería v, devolviendo el camino raíz→hoja.
  function caminoHasta(v) {
    const camino = [];
    let n = root;
    while (true) {
      camino.push(n);
      if (n.hoja) break;
      let i = 0;
      while (i < n.claves.length && v > n.claves[i]) i++;
      n = n.hijos[i];
    }
    return camino;
  }

  function insertarEnHoja(hoja, v) {
    let i = hoja.claves.length - 1;
    hoja.claves.push(0);
    while (i >= 0 && hoja.claves[i] > v) { hoja.claves[i + 1] = hoja.claves[i]; i--; }
    hoja.claves[i + 1] = v;
  }

  // ---- Render SVG ----
  // Calcula el ancho que ocupa el subárbol y posiciona cada nodo en (_x,_y).
  function anchoNodo(n) { return PADX * 2 + n.claves.length * KW; }

  function layout(n, depth, xCursor) {
    n._y = MARGIN + depth * ROWH;
    if (n.hoja) {
      const w = anchoNodo(n);
      n._x = xCursor.x;
      xCursor.x += w + GAPX;
      n._cx = n._x + w / 2;
      return;
    }
    const childCenters = [];
    n.hijos.forEach(h => { layout(h, depth + 1, xCursor); childCenters.push(h._cx); });
    const w = anchoNodo(n);
    // centrar el nodo sobre el promedio de sus hijos
    const mid = (childCenters[0] + childCenters[childCenters.length - 1]) / 2;
    n._x = mid - w / 2;
    n._cx = mid;
  }

  function dibujarNodo(svg, n) {
    const w = anchoNodo(n);
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'btree-nodo');
    g.setAttribute('transform', 'translate(' + n._x + ',' + n._y + ')');
    n._el = g;

    const rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('x', 0); rect.setAttribute('y', 0);
    rect.setAttribute('width', w); rect.setAttribute('height', NH);
    rect.setAttribute('rx', 8);
    g.appendChild(rect);

    n.claves.forEach((c, i) => {
      if (i > 0) {
        const sep = document.createElementNS(NS, 'line');
        const sx = PADX + i * KW;
        sep.setAttribute('x1', sx); sep.setAttribute('y1', 4);
        sep.setAttribute('x2', sx); sep.setAttribute('y2', NH - 4);
        sep.setAttribute('class', 'btree-sep');
        g.appendChild(sep);
      }
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('class', 'btree-key');
      t.setAttribute('x', PADX + i * KW + KW / 2);
      t.setAttribute('y', NH / 2);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('dy', '0.34em');
      t.textContent = c;
      g.appendChild(t);
    });
    svg.appendChild(g);
    if (!n.hoja) n.hijos.forEach(h => dibujarNodo(svg, h));
  }

  function dibujarAristas(svg, n) {
    if (n.hoja) return;
    const px = n._cx, py = n._y + NH;
    n.hijos.forEach(h => {
      const ln = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', px); ln.setAttribute('y1', py);
      ln.setAttribute('x2', h._cx); ln.setAttribute('y2', h._y);
      ln.setAttribute('class', 'lab-edge');
      svg.appendChild(ln);
      dibujarAristas(svg, h);
    });
  }

  function render() {
    canvas.innerHTML = '';
    if (root.claves.length === 0 && root.hoja) {
      canvas.innerHTML = '<p class="lab-vacio">Insertá claves (o cargá un ejemplo) para ver cómo la hoja se desborda y se divide.</p>';
      actualizarStats();
      return;
    }
    const cursor = { x: MARGIN };
    layout(root, 0, cursor);
    const h = altura(root);
    const W = Math.max(cursor.x, MARGIN * 2 + 40);
    const H = MARGIN * 2 + (h - 1) * ROWH + NH;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.width = W + 'px'; svg.style.maxWidth = '100%'; svg.style.height = 'auto';
    dibujarAristas(svg, root);
    dibujarNodo(svg, root);
    canvas.appendChild(svg);
    actualizarStats();
  }

  // ---- Estructura del widget ----
  mount.innerHTML =
    '<div class="lab-controles">' +
      '<div class="lab-grupo">' +
        '<input class="lab-input" id="bt-num" type="number" inputmode="numeric" placeholder="clave" aria-label="Clave a insertar">' +
        '<button class="btn bt-insertar">Insertar</button>' +
        '<button class="btn bt-azar">Al azar</button>' +
        '<button class="btn bt-vaciar">Vaciar</button>' +
      '</div>' +
      '<div class="lab-grupo">' +
        '<span class="lab-lbl">Ejemplos:</span>' +
        '<button class="btn lab-rec bt-preset" data-seq="10,20,30,40,50,60,70">Crece en cadena</button>' +
        '<button class="btn lab-rec bt-preset" data-seq="5,15,25,35,45,55,65,75,85,95">Dos niveles</button>' +
      '</div>' +
    '</div>' +
    '<div class="lab-salida" aria-live="polite"><span class="lab-salida-lbl">Estado</span><span class="lab-salida-vals"></span></div>' +
    '<div class="lab-canvas"></div>' +
    '<div class="lab-stats"></div>';

  const canvas = mount.querySelector('.lab-canvas');
  const stats = mount.querySelector('.lab-stats');
  const salidaLbl = mount.querySelector('.lab-salida-lbl');
  const salidaVals = mount.querySelector('.lab-salida-vals');
  const numInput = mount.querySelector('#bt-num');

  function setSalida(label, vals) {
    salidaLbl.textContent = label;
    salidaVals.innerHTML = '';
    (vals || []).forEach((v, i) => {
      const s = document.createElement('span');
      s.className = 'lab-val' + (i === vals.length - 1 ? ' actual' : '');
      s.textContent = v;
      salidaVals.appendChild(s);
    });
  }

  function actualizarStats() {
    const claves = contarClaves(root);
    if (claves === 0) { stats.textContent = ''; return; }
    const h = altura(root);
    stats.textContent = 'Altura: ' + h + '  ·  Claves: ' + claves +
      '  ·  orden t=' + T + ' (máx ' + MAX_KEYS + ' claves por nodo)';
  }

  function setDisabled(d) {
    animando = d;
    mount.querySelectorAll('button, input').forEach(el => { el.disabled = d; });
  }

  // ---- División de un nodo lleno (overflow de 4 claves) ----
  // Parte n en izquierda/derecha y sube la clave del medio. Devuelve la nueva raíz
  // del subárbol modificado a través del padre (o crea raíz nueva si n era la raíz).
  function dividir(padre, idxHijo, n) {
    // n.claves tiene OVERFLOW (4) claves: [a, b, C, d] → sube C (índice T=2).
    const medioIdx = T;                 // con OVERFLOW=4 sube la 3.ª clave (índice 2)
    const subeClave = n.claves[medioIdx];

    const der = nodoNuevo(n.hoja);
    der.claves = n.claves.slice(medioIdx + 1);
    n.claves = n.claves.slice(0, medioIdx);
    if (!n.hoja) {
      der.hijos = n.hijos.slice(medioIdx + 1);
      n.hijos = n.hijos.slice(0, medioIdx + 1);
    }

    if (padre === null) {
      // n era la raíz: crece la altura.
      const nueva = nodoNuevo(false);
      nueva.claves = [subeClave];
      nueva.hijos = [n, der];
      root = nueva;
    } else {
      padre.claves.splice(idxHijo, 0, subeClave);
      padre.hijos.splice(idxHijo + 1, 0, der);
    }
  }

  // ---- Inserción animada con división ----
  async function insertarAnimado(v) {
    if (animando) return;
    if (!Number.isFinite(v)) return;
    if (existe(root, v)) { setSalida('La clave ' + v + ' ya está en el árbol', []); return; }

    setDisabled(true);
    const camino = caminoHasta(v);
    const hoja = camino[camino.length - 1];

    // 1) marcar el descenso por el camino
    for (const n of camino) {
      if (n._el) n._el.classList.add('activo');
      await sleep(280);
    }
    // 2) insertar en la hoja y redibujar
    insertarEnHoja(hoja, v);
    setSalida('Insertada ' + v + ' en la hoja', hoja.claves.slice());
    render();
    await sleep(360);

    // 3) subir dividiendo mientras haya overflow
    for (let k = camino.length - 1; k >= 0; k--) {
      const n = camino[k];
      if (n.claves.length < OVERFLOW) break;

      // ¿esta división cambia la altura? (solo si es la raíz)
      const cambiaAltura = (k === 0);
      if (cambiaAltura) {
        setSalida('⚠️ ¿cambia la altura? (mirá): la raíz se desborda y se parte', n.claves.slice());
      } else {
        setSalida('Overflow (' + n.claves.length + ' claves): se divide y sube la del medio', n.claves.slice());
      }
      // resaltar el nodo que se va a dividir
      render();
      if (n._el) n._el.classList.add('activo');
      await sleep(620);

      const padre = k === 0 ? null : camino[k - 1];
      let idxHijo = 0;
      if (padre) idxHijo = padre.hijos.indexOf(n);
      dividir(padre, idxHijo, n);
      render();
      await sleep(420);
    }

    setSalida('Listo: ' + v + ' insertada', []);
    setDisabled(false);
  }

  // ---- Secuencia de ejemplo ----
  async function insertarSecuencia(seq) {
    if (animando) return;
    setDisabled(true);
    root = nodoNuevo(true);
    render();
    setSalida('Construyendo…', []);
    for (const v of seq) {
      if (existe(root, v)) continue;
      const camino = caminoHasta(v);
      const hoja = camino[camino.length - 1];
      insertarEnHoja(hoja, v);
      // subir dividiendo (sin micro-animación por paso, pero sí redibujando)
      for (let k = camino.length - 1; k >= 0; k--) {
        const n = camino[k];
        if (n.claves.length < OVERFLOW) break;
        const padre = k === 0 ? null : camino[k - 1];
        const idxHijo = padre ? padre.hijos.indexOf(n) : 0;
        dividir(padre, idxHijo, n);
      }
      render();
      setSalida('Insertando…', [v]);
      await sleep(420);
    }
    setSalida('Listo: ' + seq.length + ' claves', []);
    setDisabled(false);
  }

  // ---- Eventos ----
  function leer() { const v = parseInt(numInput.value, 10); return Number.isFinite(v) ? v : null; }
  mount.querySelector('.bt-insertar').onclick = () => {
    const v = leer();
    if (v != null) { insertarAnimado(v); numInput.value = ''; numInput.focus(); }
  };
  numInput.addEventListener('keydown', e => { if (e.key === 'Enter') mount.querySelector('.bt-insertar').click(); });
  mount.querySelector('.bt-azar').onclick = () => {
    if (animando) return;
    for (let i = 0; i < 40; i++) {
      const v = Math.floor(Math.random() * 99) + 1;
      if (!existe(root, v)) { insertarAnimado(v); return; }
    }
  };
  mount.querySelector('.bt-vaciar').onclick = () => {
    if (animando) return;
    root = nodoNuevo(true);
    render();
    setSalida('Árbol vacío', []);
  };
  mount.querySelectorAll('.bt-preset').forEach(b => {
    b.onclick = () => insertarSecuencia(b.dataset.seq.split(',').map(Number));
  });

  // ---- Arranque con un ejemplo precargado ----
  // Esta secuencia ya provoca una división de raíz, así que arranca con 2 niveles.
  [10, 20, 30, 40, 50].forEach(v => {
    const camino = caminoHasta(v);
    const hoja = camino[camino.length - 1];
    insertarEnHoja(hoja, v);
    for (let k = camino.length - 1; k >= 0; k--) {
      const n = camino[k];
      if (n.claves.length < OVERFLOW) break;
      const padre = k === 0 ? null : camino[k - 1];
      const idxHijo = padre ? padre.hijos.indexOf(n) : 0;
      dividir(padre, idxHijo, n);
    }
  });
  render();
  setSalida('Insertá una clave y mirá la división ↑', []);
})();
