/* Laboratorio interactivo "Conjunto destructivo".
   Se monta en #conjunto-visual (solo existe en temas/conjunto.html). Sin dependencias,
   offline. Refuerza que elegir() es ALEATORIO y que recorrer un conjunto lo VACÍA. */
(function () {
  const mount = document.getElementById('conjunto-visual');
  if (!mount) return;

  let conjunto = [];           // el conjunto: valores únicos, sin orden semántico
  let animando = false;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // ---- "TDA" en JS (la idea es la misma que en Java) ----
  function pertenece(v) { return conjunto.indexOf(v) !== -1; }
  function agregar(v) { if (!pertenece(v)) { conjunto.push(v); return true; } return false; }
  function sacar(v) { const i = conjunto.indexOf(v); if (i !== -1) conjunto.splice(i, 1); }
  function elegir() { return conjunto[Math.floor(Math.random() * conjunto.length)]; } // ¡al azar!

  // ---- Estructura del widget ----
  mount.innerHTML =
    '<div class="lab-controles">' +
      '<div class="lab-grupo">' +
        '<input class="lab-input" id="conj-num" type="number" inputmode="numeric" placeholder="n.º" aria-label="Valor a agregar">' +
        '<button class="btn conj-agregar">Agregar</button>' +
        '<button class="btn conj-azar">Agregar al azar</button>' +
        '<button class="btn conj-sacar">Sacar</button>' +
      '</div>' +
      '<div class="lab-grupo">' +
        '<button class="btn conj-preset" data-seq="7,3,5,9,2,8">Ej. conjunto</button>' +
        '<button class="btn conj-vaciar">Vaciar</button>' +
      '</div>' +
    '</div>' +
    '<div class="lab-controles">' +
      '<div class="lab-grupo">' +
        '<span class="lab-lbl">Recorrer:</span>' +
        '<button class="btn lab-rec conj-destruir">Recorrer (elegir + sacar)</button>' +
        '<button class="btn conj-iterar">Iterar SIN destruir</button>' +
      '</div>' +
    '</div>' +
    '<div class="lab-salida" aria-live="polite"><span class="lab-salida-lbl">Salida</span><span class="lab-salida-vals"></span></div>' +
    '<div class="conj-layout" style="display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-start">' +
      '<div class="lab-canvas conj-canvas" style="flex:1 1 260px;min-width:240px"></div>' +
      '<pre class="conj-codigo" style="flex:0 1 320px;margin:0;min-width:240px"><code class="java">// Recorrer un conjunto = vaciarlo:\n' +
        'while (!c.conjuntoVacío()) {\n' +
        '    int x = c.elegir();   // al AZAR\n' +
        '    // ...uso x...\n' +
        '    c.sacar(x);           // y lo quito\n' +
        '}\n' +
        '// Al terminar, c quedó VACÍO.</code></pre>' +
    '</div>' +
    '<div class="lab-stats"></div>';

  const canvas = mount.querySelector('.conj-canvas');
  const stats = mount.querySelector('.lab-stats');
  const salidaLbl = mount.querySelector('.lab-salida-lbl');
  const salidaVals = mount.querySelector('.lab-salida-vals');
  const numInput = mount.querySelector('#conj-num');

  // resaltado del código Java (si está disponible)
  if (typeof window.resaltarJava === 'function') {
    try { window.resaltarJava(); } catch (e) { /* sin resaltado, no es crítico */ }
  }

  // ---- Salida ----
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
    return s;
  }

  function actualizarStats(extra) {
    const n = conjunto.length;
    let txt = n === 0 ? 'Conjunto vacío' : 'Elementos: ' + n + '  ·  sin orden, sin repetidos';
    if (extra) txt += '  ·  ' + extra;
    stats.textContent = txt;
  }

  // ---- Render de fichas ----
  function render(opts) {
    opts = opts || {};
    canvas.innerHTML = '';
    if (conjunto.length === 0) {
      canvas.innerHTML = '<p class="lab-vacio">Conjunto vacío. Agregá valores (o cargá el ejemplo) para empezar. ' +
        'Recordá: no hay orden ni repetidos.</p>';
      actualizarStats(opts.extra);
      return;
    }
    const cont = document.createElement('div');
    cont.className = 'fichas';
    conjunto.forEach(v => {
      const f = document.createElement('span');
      f.className = 'ficha';
      f.dataset.v = v;
      f.textContent = v;
      if (opts.nuevo != null && v === opts.nuevo) f.classList.add('elegida');
      cont.appendChild(f);
    });
    canvas.appendChild(cont);
    actualizarStats(opts.extra);
  }

  function fichaDe(v) {
    return canvas.querySelector('.ficha[data-v="' + v + '"]');
  }

  function setDisabled(d) {
    animando = d;
    mount.querySelectorAll('button, input').forEach(el => { el.disabled = d; });
  }

  // ---- Acciones simples ----
  function accionAgregar(v, foco) {
    if (animando || !Number.isFinite(v)) return;
    if (pertenece(v)) {
      render({ extra: '⚠️ ' + v + ' ya estaba: en un conjunto no hay repetidos' });
      const f = fichaDe(v);
      if (f) { f.classList.add('elegida'); setTimeout(() => f.classList.remove('elegida'), 500); }
      setSalida('Salida', []);
      return;
    }
    agregar(v);
    render({ nuevo: v, extra: 'agregado ' + v });
    setSalida('Salida', []);
    if (foco) { numInput.value = ''; numInput.focus(); }
  }

  function accionAzar() {
    if (animando) return;
    for (let i = 0; i < 60; i++) {
      const v = Math.floor(Math.random() * 99) + 1;
      if (!pertenece(v)) { accionAgregar(v, false); return; }
    }
  }

  function accionSacar() {
    if (animando) return;
    const v = leer();
    if (v == null) return;
    if (!pertenece(v)) {
      render({ extra: v + ' no estaba en el conjunto' });
      return;
    }
    sacar(v);
    render({ extra: 'saqué ' + v });
    numInput.value = '';
    numInput.focus();
  }

  // ---- Recorrido destructivo: elegir() al azar + sacar(), hasta vaciar ----
  async function recorrerDestruyendo() {
    if (animando || conjunto.length === 0) return;
    setDisabled(true);
    render();
    setSalida('elegir() devuelve al azar — mirá el orden impredecible:', []);
    let pasos = 0;
    // while (!c.conjuntoVacío()) { x = c.elegir(); ...; c.sacar(x); }
    while (conjunto.length > 0) {
      const x = elegir();          // ¡al azar!
      const f = fichaDe(x);
      if (f) f.classList.add('elegida');
      pushVal(x, true);            // lo "uso": lo muestro en la salida
      pasos++;
      await sleep(620);
      sacar(x);                    // y lo saco
      if (f) {
        f.classList.remove('elegida');
        f.classList.add('saliendo');
        await sleep(360);
      }
      render({ extra: 'sacados: ' + pasos });
    }
    salidaLbl.textContent = '✓ Recorrido completo en ' + pasos + ' pasos — el conjunto quedó VACÍO';
    setDisabled(false);
  }

  // ---- Iterar SIN destruir: copio a un auxiliar, lo vacío, y repongo ----
  async function iterarSinDestruir() {
    if (animando || conjunto.length === 0) return;
    setDisabled(true);
    const original = conjunto.slice();   // lo que NO quiero perder
    // copia(c): vuelco el original a un conjunto auxiliar
    const aux = conjunto.slice();
    setSalida('Trabajo sobre una COPIA (aux) — el original se repone al final:', []);
    render({ extra: 'copié ' + aux.length + ' elementos a aux' });
    await sleep(700);
    let pasos = 0;
    // recorro la COPIA con el patrón destructivo (destruyo aux, no el original)
    conjunto = aux;
    render();
    while (conjunto.length > 0) {
      const x = elegir();
      const f = fichaDe(x);
      if (f) f.classList.add('elegida');
      pushVal(x, true);
      pasos++;
      await sleep(560);
      sacar(x);
      if (f) { f.classList.remove('elegida'); f.classList.add('saliendo'); await sleep(300); }
      render({ extra: 'recorriendo la copia: ' + pasos });
    }
    // repongo el original
    conjunto = original;
    render({ extra: '✓ original intacto: ' + original.length + ' elementos' });
    salidaLbl.textContent = '✓ Recorrí los ' + pasos + ' elementos sin destruir el conjunto original';
    setDisabled(false);
  }

  // ---- Preset (construir con animación) ----
  async function cargarPreset(seq) {
    if (animando) return;
    setDisabled(true);
    conjunto = [];
    render();
    setSalida('Salida', []);
    for (const v of seq) {
      if (!pertenece(v)) { agregar(v); render({ nuevo: v }); }
      await sleep(260);
    }
    render({ extra: 'ejemplo cargado' });
    setDisabled(false);
  }

  // ---- Eventos ----
  function leer() { const v = parseInt(numInput.value, 10); return Number.isFinite(v) ? v : null; }
  mount.querySelector('.conj-agregar').onclick = () => { const v = leer(); if (v != null) accionAgregar(v, true); };
  numInput.addEventListener('keydown', e => { if (e.key === 'Enter') mount.querySelector('.conj-agregar').click(); });
  mount.querySelector('.conj-azar').onclick = accionAzar;
  mount.querySelector('.conj-sacar').onclick = accionSacar;
  mount.querySelector('.conj-vaciar').onclick = () => { if (animando) return; conjunto = []; render(); setSalida('Salida', []); };
  mount.querySelector('.conj-preset').onclick = function () { cargarPreset(this.dataset.seq.split(',').map(Number)); };
  mount.querySelector('.conj-destruir').onclick = recorrerDestruyendo;
  mount.querySelector('.conj-iterar').onclick = iterarSinDestruir;

  // arranque con un ejemplo
  [7, 3, 5, 9, 2, 8].forEach(agregar);
  render();
  setSalida('Probá "Recorrer": elegir() saca al azar, y el conjunto se vacía ↑', []);
})();
