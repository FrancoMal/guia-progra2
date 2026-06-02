/* Laboratorio interactivo de la pila de llamadas (recursión).
   Se monta en #recursion-visual (solo existe en temas/recursividad.html). Sin
   dependencias, offline. Elegí una función y un n, y mirá cómo se apilan las
   llamadas, se llega al caso base y los valores van burbujeando al desapilar. */
(function () {
  const mount = document.getElementById('recursion-visual');
  if (!mount) return;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // Límite duro de marcos para no colgar el navegador en el modo "romper".
  const LIMITE_PILA = 60;

  // ---- Definición de cada función como un "árbol de llamadas" ----
  // Cada función devuelve una lista de pasos para animar. Un paso es:
  //   { tipo:'entrar', etiqueta, base }  -> apila un frame
  //   { tipo:'salir',  etiqueta, valor } -> muestra el valor y desapila
  // Construimos los pasos simulando la recursión (sin animar todavía).
  const FUNCIONES = {
    factorial: {
      nombre: 'factorial',
      etiqueta: 'factorial(n)',
      maxN: 10,
      caso: 'n == 0 → 1',
      construir(n, pasos) {
        const et = 'factorial(' + n + ')';
        const base = n <= 0;
        pasos.push({ tipo: 'entrar', etiqueta: et, base: base });
        if (base) { pasos.push({ tipo: 'salir', etiqueta: et, valor: 1 }); return 1; }
        const sub = this.construir(n - 1, pasos);
        const v = n * sub;
        pasos.push({ tipo: 'salir', etiqueta: et, valor: v });
        return v;
      }
    },
    suma: {
      nombre: 'suma',
      etiqueta: 'suma(n)',
      maxN: 12,
      caso: 'n == 0 → 0',
      construir(n, pasos) {
        const et = 'suma(' + n + ')';
        const base = n <= 0;
        pasos.push({ tipo: 'entrar', etiqueta: et, base: base });
        if (base) { pasos.push({ tipo: 'salir', etiqueta: et, valor: 0 }); return 0; }
        const sub = this.construir(n - 1, pasos);
        const v = n + sub;
        pasos.push({ tipo: 'salir', etiqueta: et, valor: v });
        return v;
      }
    },
    potencia: {
      nombre: 'potencia',
      etiqueta: 'potencia(2, n)',
      maxN: 10,
      caso: 'n == 0 → 1',
      construir(n, pasos) {
        const et = 'potencia(2, ' + n + ')';
        const base = n <= 0;
        pasos.push({ tipo: 'entrar', etiqueta: et, base: base });
        if (base) { pasos.push({ tipo: 'salir', etiqueta: et, valor: 1 }); return 1; }
        const sub = this.construir(n - 1, pasos);
        const v = 2 * sub;
        pasos.push({ tipo: 'salir', etiqueta: et, valor: v });
        return v;
      }
    },
    fibonacci: {
      nombre: 'fibonacci',
      etiqueta: 'fib(n)',
      maxN: 8,
      caso: 'n <= 1 → n',
      construir(n, pasos) {
        const et = 'fib(' + n + ')';
        const base = n <= 1;
        pasos.push({ tipo: 'entrar', etiqueta: et, base: base });
        if (base) { pasos.push({ tipo: 'salir', etiqueta: et, valor: n }); return n; }
        const a = this.construir(n - 1, pasos);
        const b = this.construir(n - 2, pasos);
        const v = a + b;
        pasos.push({ tipo: 'salir', etiqueta: et, valor: v });
        return v;
      }
    }
  };

  // ---- Estructura del widget ----
  mount.innerHTML =
    '<div class="lab-controles">' +
      '<div class="lab-grupo">' +
        '<span class="lab-lbl">Función:</span>' +
        '<button class="btn lab-rec lab-fn" data-fn="factorial">factorial</button>' +
        '<button class="btn lab-fn" data-fn="suma">suma</button>' +
        '<button class="btn lab-fn" data-fn="potencia">potencia</button>' +
        '<button class="btn lab-fn" data-fn="fibonacci">fibonacci</button>' +
      '</div>' +
      '<div class="lab-grupo">' +
        '<span class="lab-lbl">n =</span>' +
        '<input class="lab-input" id="rec-n" type="number" inputmode="numeric" value="3" min="0" aria-label="Valor de n">' +
      '</div>' +
    '</div>' +
    '<div class="lab-controles">' +
      '<div class="lab-grupo">' +
        '<button class="btn rec-paso">▶ Paso</button>' +
        '<button class="btn rec-auto">⏩ Auto</button>' +
        '<button class="btn rec-reiniciar">↺ Reiniciar</button>' +
      '</div>' +
      '<div class="lab-grupo">' +
        '<button class="btn rec-romper">💥 Romper la recursión</button>' +
      '</div>' +
    '</div>' +
    '<div class="lab-salida" aria-live="polite"><span class="lab-salida-lbl">Pila de llamadas</span><span class="lab-salida-vals"></span></div>' +
    '<div class="frames"></div>' +
    '<div class="lab-stats"></div>';

  const frames = mount.querySelector('.frames');
  const stats = mount.querySelector('.lab-stats');
  const salidaLbl = mount.querySelector('.lab-salida-lbl');
  const salidaVals = mount.querySelector('.lab-salida-vals');
  const nInput = mount.querySelector('#rec-n');
  const btnPaso = mount.querySelector('.rec-paso');
  const btnAuto = mount.querySelector('.rec-auto');

  // ---- Estado de la animación ----
  let fnActual = 'factorial';
  let pasos = [];        // lista de pasos precomputados
  let idx = 0;           // índice del próximo paso a ejecutar
  let pilaEls = [];      // pila de elementos .frame vivos (paralela a la pila real)
  let llamadasTotales = 0;
  let animando = false;  // true mientras corre "Auto"
  let roto = false;      // modo "romper la recursión"

  function setDisabled(d) {
    animando = d;
    mount.querySelectorAll('button, input').forEach(el => { el.disabled = d; });
  }

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

  function marcarFn() {
    mount.querySelectorAll('.lab-fn').forEach(b => {
      b.classList.toggle('lab-rec', b.dataset.fn === fnActual);
    });
  }

  // Crea el elemento visual de un frame y lo apila (arriba del todo).
  function crearFrame(texto, base) {
    const el = document.createElement('div');
    el.className = 'frame activo' + (base ? ' base' : '');
    el.textContent = texto + (base ? '   ← caso base' : '');
    frames.appendChild(el);
    return el;
  }

  function leerN() {
    const v = parseInt(nInput.value, 10);
    return Number.isFinite(v) ? v : null;
  }

  function actualizarStats() {
    const fn = FUNCIONES[fnActual];
    let txt = 'Función: ' + fn.etiqueta + '  ·  caso base: ' + fn.caso;
    if (pasos.length) {
      txt += '  ·  llamadas totales: ' + llamadasTotales;
      if (fnActual === 'fibonacci') {
        txt += '  ·  ⚠️ se duplican → O(2ⁿ)';
      }
    }
    if (roto) {
      txt = '⚠️ La entrada NO baja al caso base: la pila crece sin fin → StackOverflowError';
    }
    stats.textContent = txt;
  }

  // ---- Preparar una corrida (precomputar pasos) ----
  function reiniciar(silencioso) {
    frames.innerHTML = '';
    salidaVals.innerHTML = '';
    pilaEls = [];
    idx = 0;
    llamadasTotales = 0;
    pasos = [];
    roto = false;
    const n = leerN();
    const fn = FUNCIONES[fnActual];
    if (n == null || n < 0) {
      salidaLbl.textContent = 'Ingresá un n ≥ 0 para construir las llamadas';
      vaciarPila();
      actualizarStats();
      return;
    }
    if (n > fn.maxN) {
      // Demasiados pasos para animar cómodo: avisamos pero permitimos hasta maxN.
      nInput.value = fn.maxN;
      reiniciar(true);
      salidaLbl.textContent = 'n se limitó a ' + fn.maxN + ' (con más, ' + fn.nombre + ' genera demasiadas llamadas para animar)';
      return;
    }
    fn.construir(n, pasos);
    vaciarPila();
    if (!silencioso) {
      setSalida('Listo: ' + fn.etiqueta.replace('n', n) + '. Tocá ▶ Paso o ⏩ Auto', []);
    }
    actualizarStats();
  }

  function vaciarPila() {
    if (frames.children.length === 0) {
      frames.innerHTML = '<p class="lab-vacio">La pila está vacía. Elegí una función y un n, después ▶ Paso para apilar la primera llamada.</p>';
    }
  }
  function limpiarVacio() {
    const v = frames.querySelector('.lab-vacio');
    if (v) v.remove();
  }

  // Ejecuta UN paso de la simulación. Devuelve false si ya no quedan pasos.
  async function paso() {
    if (idx >= pasos.length) {
      if (pasos.length && pilaEls.length === 0) {
        salidaLbl.textContent = '✓ Terminó: ' + FUNCIONES[fnActual].etiqueta.replace('n', leerN() ?? '') + ' devolvió ' + (pasos.length ? pasos[pasos.length - 1].valor : '');
      }
      return false;
    }
    const p = pasos[idx++];
    limpiarVacio();
    if (p.tipo === 'entrar') {
      llamadasTotales++;
      // El frame de abajo (el que llamó) deja de ser el "activo".
      const prev = pilaEls[pilaEls.length - 1];
      if (prev) prev.classList.remove('activo');
      const el = crearFrame(p.etiqueta, p.base);
      pilaEls.push(el);
      pushVal(p.etiqueta, true);
      salidaLbl.textContent = p.base
        ? 'Caso base alcanzado: ' + p.etiqueta + ' se resuelve directo'
        : 'Entra ' + p.etiqueta + ' (se apila y espera)';
    } else {
      // RETORNA: la cima muestra su valor, se marca .retornando y se desapila.
      const el = pilaEls.pop();
      if (el) {
        el.classList.remove('activo');
        el.classList.add('retornando');
        el.textContent = p.etiqueta + '   ⤳ devuelve ' + p.valor;
        salidaLbl.textContent = p.etiqueta + ' devuelve ' + p.valor + ' (burbujea hacia arriba)';
        pushVal('↩ ' + p.valor, true);
        await sleep(animando ? 260 : 0);
        el.remove();
      }
      // El frame que queda en la cima vuelve a estar "activo".
      const top = pilaEls[pilaEls.length - 1];
      if (top) top.classList.add('activo');
      if (pilaEls.length === 0) {
        salidaLbl.textContent = '✓ Terminó: ' + FUNCIONES[fnActual].etiqueta.replace('n', leerN() ?? '') + ' devolvió ' + p.valor;
        vaciarPila();
      }
    }
    actualizarStats();
    return true;
  }

  // ---- Acciones de los botones ----
  async function unPaso() {
    if (animando) return;
    if (idx === 0 && pasos.length === 0) reiniciar(true);
    await paso();
  }

  async function auto() {
    if (animando) return;
    if (idx >= pasos.length) reiniciar(true);
    if (pasos.length === 0) return;
    setDisabled(true);
    while (idx < pasos.length) {
      const cont = await paso();
      if (!cont) break;
      await sleep(560);
    }
    setDisabled(false);
  }

  // Modo "romper la recursión": apila marcos sin caso base hasta desbordar.
  async function romper() {
    if (animando) return;
    setDisabled(true);
    frames.innerHTML = '';
    salidaVals.innerHTML = '';
    pilaEls = [];
    pasos = [];
    idx = 0;
    llamadasTotales = 0;
    roto = true;
    const fn = FUNCIONES[fnActual];
    // Recursión MAL escrita: se llama con el mismo n (nunca baja al caso base).
    let n = leerN();
    if (n == null) n = 3;
    salidaLbl.textContent = 'Recursión sin reducir: ' + fn.nombre + '(' + n + ') llama a ' + fn.nombre + '(' + n + ')…';
    actualizarStats();
    for (let i = 0; i < LIMITE_PILA; i++) {
      limpiarVacio();
      llamadasTotales++;
      const prev = pilaEls[pilaEls.length - 1];
      if (prev) prev.classList.remove('activo');
      const el = crearFrame(fn.nombre + '(' + n + ')', false);
      pilaEls.push(el);
      // El scroll sigue a la cima de la pila.
      frames.scrollTop = frames.scrollHeight;
      await sleep(Math.max(28, 120 - i * 2));
    }
    // ¡Boom! Cartel de desbordamiento.
    const boom = document.createElement('div');
    boom.className = 'frame';
    boom.style.borderLeftColor = 'var(--err)';
    boom.style.color = 'var(--err)';
    boom.style.fontWeight = '700';
    boom.textContent = '✗ java.lang.StackOverflowError — la pila se llenó';
    frames.appendChild(boom);
    frames.scrollTop = frames.scrollHeight;
    salidaLbl.textContent = '💥 StackOverflowError: nunca se alcanzó el caso base';
    pushVal('StackOverflowError', true);
    actualizarStats();
    setDisabled(false);
  }

  // ---- Eventos ----
  mount.querySelectorAll('.lab-fn').forEach(b => {
    b.onclick = () => {
      if (animando) return;
      fnActual = b.dataset.fn;
      marcarFn();
      reiniciar();
    };
  });
  nInput.addEventListener('input', () => { if (!animando) reiniciar(); });
  nInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !animando) btnAuto.click(); });
  btnPaso.onclick = unPaso;
  btnAuto.onclick = auto;
  mount.querySelector('.rec-reiniciar').onclick = () => { if (!animando) reiniciar(); };
  mount.querySelector('.rec-romper').onclick = romper;

  // ---- Arranque con un ejemplo ----
  marcarFn();
  reiniciar();
})();
