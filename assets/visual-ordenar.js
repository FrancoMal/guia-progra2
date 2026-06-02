/* Laboratorio interactivo de algoritmos de ordenamiento.
   Se monta en #ordenar-visual (solo existe en temas/ordenamiento.html). Sin dependencias,
   offline. Elegí un algoritmo, mezclá el arreglo y mirá las barras compararse, intercambiarse
   y quedar ordenadas paso a paso, con contadores de comparaciones e intercambios. */
(function () {
  const mount = document.getElementById('ordenar-visual');
  if (!mount) return;

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // ---- Estado ----
  let datos = [];          // valores actuales del arreglo
  let pasos = [];          // lista de pasos precomputados del algoritmo
  let idx = 0;             // próximo paso a aplicar
  let comparaciones = 0;
  let intercambios = 0;
  let animando = false;    // true durante "Auto"
  let auto = false;        // flag para cortar el modo automático
  const VEL = 380;         // ms por paso en modo automático

  const ALGOS = {
    insercion: 'Inserción',
    burbuja: 'Burbuja',
    seleccion: 'Selección'
  };

  // ---- Generación de pasos ----
  // Cada algoritmo no toca 'datos': trabaja sobre una copia y emite una lista de "pasos".
  // Tipos de paso:
  //   { t:'comparar',  i, j }            -> resalta i y j como comparados
  //   { t:'swap',      i, j }            -> intercambia i y j en el arreglo dibujado
  //   { t:'ordenado',  i }               -> marca la posición i como ya ordenada (final)
  //   { t:'fin' }                        -> todo ordenado

  function pasosInsercion(a) {
    const ps = [];
    const n = a.length;
    if (n > 0) ps.push({ t: 'ordenado', i: 0 }); // a[0] es el tramo ordenado inicial
    for (let i = 1; i < n; i++) {
      let j = i;
      // corremos el actual hacia la izquierda mientras sea menor que su vecino
      while (j > 0) {
        ps.push({ t: 'comparar', i: j - 1, j: j });
        if (a[j - 1] > a[j]) {
          ps.push({ t: 'swap', i: j - 1, j: j });
          const tmp = a[j - 1]; a[j - 1] = a[j]; a[j] = tmp;
          j--;
        } else {
          break;
        }
      }
      ps.push({ t: 'ordenado', i: i }); // el tramo [0..i] quedó ordenado entre sí
    }
    ps.push({ t: 'fin' });
    return ps;
  }

  function pasosBurbuja(a) {
    const ps = [];
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
      let huboSwap = false;
      for (let j = 0; j < n - 1 - i; j++) {
        ps.push({ t: 'comparar', i: j, j: j + 1 });
        if (a[j] > a[j + 1]) {
          ps.push({ t: 'swap', i: j, j: j + 1 });
          const tmp = a[j]; a[j] = a[j + 1]; a[j + 1] = tmp;
          huboSwap = true;
        }
      }
      ps.push({ t: 'ordenado', i: n - 1 - i }); // el mayor del tramo quedó al final
      if (!huboSwap) break;                       // ya estaba ordenado
    }
    // marcamos como ordenado todo lo que quede sin marcar (hasta el inicio)
    ps.push({ t: 'fin' });
    return ps;
  }

  function pasosSeleccion(a) {
    const ps = [];
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        ps.push({ t: 'comparar', i: min, j: j });
        if (a[j] < a[min]) min = j;
      }
      if (min !== i) {
        ps.push({ t: 'swap', i: i, j: min });
        const tmp = a[i]; a[i] = a[min]; a[min] = tmp;
      }
      ps.push({ t: 'ordenado', i: i }); // a[i] quedó en su posición final
    }
    if (n > 0) ps.push({ t: 'ordenado', i: n - 1 });
    ps.push({ t: 'fin' });
    return ps;
  }

  function generarPasos(algo, a) {
    const copia = a.slice();
    if (algo === 'burbuja') return pasosBurbuja(copia);
    if (algo === 'seleccion') return pasosSeleccion(copia);
    return pasosInsercion(copia);
  }

  // ---- Estructura del widget ----
  mount.innerHTML =
    '<div class="lab-controles">' +
      '<div class="lab-grupo">' +
        '<span class="lab-lbl">Algoritmo</span>' +
        '<select class="lab-input" id="ord-algo" aria-label="Algoritmo de ordenamiento" style="width:auto">' +
          '<option value="insercion">Inserción</option>' +
          '<option value="burbuja">Burbuja</option>' +
          '<option value="seleccion">Selección</option>' +
        '</select>' +
      '</div>' +
      '<div class="lab-grupo">' +
        '<button class="btn ord-mezclar">Mezclar</button>' +
        '<button class="btn ord-reiniciar">Reiniciar</button>' +
      '</div>' +
      '<div class="lab-grupo">' +
        '<button class="btn lab-rec ord-paso">Paso ▸</button>' +
        '<button class="btn lab-rec ord-auto">Auto ▶</button>' +
      '</div>' +
    '</div>' +
    '<div class="lab-salida" aria-live="polite"><span class="lab-salida-lbl">—</span><span class="lab-salida-vals"></span></div>' +
    '<div class="lab-canvas"><div class="sort-canvas"></div></div>' +
    '<div class="lab-stats"></div>';

  const selAlgo = mount.querySelector('#ord-algo');
  const canvas = mount.querySelector('.sort-canvas');
  const stats = mount.querySelector('.lab-stats');
  const salidaLbl = mount.querySelector('.lab-salida-lbl');
  const salidaVals = mount.querySelector('.lab-salida-vals');
  const btnPaso = mount.querySelector('.ord-paso');
  const btnAuto = mount.querySelector('.ord-auto');

  const maxVal = () => datos.length ? Math.max.apply(null, datos) : 1;

  // ---- Render ----
  function render() {
    canvas.innerHTML = '';
    if (datos.length === 0) {
      canvas.parentElement.innerHTML = '<p class="lab-vacio">Mezclá un arreglo para ver el ordenamiento paso a paso.</p>';
      return;
    }
    // si veníamos del estado vacío, hay que recrear el contenedor de barras
    if (!mount.querySelector('.sort-canvas')) {
      const c = mount.querySelector('.lab-canvas');
      c.innerHTML = '<div class="sort-canvas"></div>';
    }
    const cv = mount.querySelector('.sort-canvas');
    cv.innerHTML = '';
    const max = maxVal();
    datos.forEach(v => {
      const bar = document.createElement('div');
      bar.className = 'sort-bar';
      bar.style.height = (24 + Math.round((v / max) * 176)) + 'px'; // 24..200px
      bar.textContent = v;
      cv.appendChild(bar);
    });
  }

  function barras() { return mount.querySelectorAll('.sort-bar'); }
  function limpiarTransitorios() {
    barras().forEach(b => b.classList.remove('comparando', 'intercambio'));
  }

  function actualizarStats() {
    const algo = ALGOS[selAlgo.value];
    stats.textContent = 'Algoritmo: ' + algo +
      '  ·  Comparaciones: ' + comparaciones +
      '  ·  Intercambios: ' + intercambios +
      (idx >= pasos.length && pasos.length ? '  ·  ✓ ordenado (todos O(n²) en el peor caso)' : '');
  }

  function setSalida(lbl) {
    salidaLbl.textContent = lbl;
    salidaVals.textContent = '';
  }

  function setDisabled(d) {
    // durante Auto bloqueamos todo menos el botón Auto (que pasa a "Pausar")
    mount.querySelectorAll('button, input, select').forEach(el => { el.disabled = d; });
    if (d) btnAuto.disabled = false;
  }

  // ---- Aplicar un paso al dibujo ----
  function aplicarPaso(p) {
    limpiarTransitorios();
    const bs = barras();
    if (p.t === 'comparar') {
      comparaciones++;
      if (bs[p.i]) bs[p.i].classList.add('comparando');
      if (bs[p.j]) bs[p.j].classList.add('comparando');
      setSalida('Comparo ' + datos[p.i] + ' y ' + datos[p.j]);
    } else if (p.t === 'swap') {
      intercambios++;
      const tmp = datos[p.i]; datos[p.i] = datos[p.j]; datos[p.j] = tmp;
      const max = maxVal();
      // actualizamos altura/etiqueta de las dos barras y las marcamos
      [p.i, p.j].forEach(k => {
        if (!bs[k]) return;
        bs[k].style.height = (24 + Math.round((datos[k] / max) * 176)) + 'px';
        bs[k].textContent = datos[k];
        bs[k].classList.add('intercambio');
      });
      setSalida('Intercambio ' + datos[p.i] + ' ⇄ ' + datos[p.j]);
    } else if (p.t === 'ordenado') {
      if (bs[p.i]) bs[p.i].classList.add('ordenado');
      setSalida('Posición ' + p.i + ' fija');
    } else if (p.t === 'fin') {
      barras().forEach(b => b.classList.add('ordenado'));
      setSalida('✓ Arreglo ordenado');
    }
    actualizarStats();
  }

  // avanza un único paso; devuelve false si ya no quedan
  function paso() {
    if (idx >= pasos.length) { return false; }
    const p = pasos[idx++];
    aplicarPaso(p);
    if (idx >= pasos.length) {
      btnPaso.disabled = true;
      btnAuto.disabled = true;
    }
    return idx < pasos.length;
  }

  async function correrAuto() {
    if (animando) { auto = false; return; } // segundo click = pausar
    if (idx >= pasos.length) return;
    animando = true;
    auto = true;
    setDisabled(true);
    btnAuto.textContent = 'Pausar ⏸';
    btnAuto.classList.add('lab-rec');
    while (auto && idx < pasos.length) {
      paso();
      await sleep(VEL);
    }
    animando = false;
    auto = false;
    setDisabled(false);
    btnAuto.textContent = 'Auto ▶';
    if (idx >= pasos.length) { btnPaso.disabled = true; btnAuto.disabled = true; }
  }

  // ---- Reinicios ----
  function reiniciarPasos() {
    // recalcula los pasos para el arreglo actual sin cambiar los valores
    pasos = generarPasos(selAlgo.value, datos);
    idx = 0;
    comparaciones = 0;
    intercambios = 0;
    limpiarTransitorios();
    barras().forEach(b => b.classList.remove('ordenado'));
    btnPaso.disabled = datos.length < 2;
    btnAuto.disabled = datos.length < 2;
    setSalida('Listo: ' + ALGOS[selAlgo.value] + ' sobre ' + datos.length + ' valores');
    actualizarStats();
  }

  function mezclar() {
    if (animando) return;
    const n = 12;
    datos = [];
    const vals = [];
    for (let i = 1; i <= n; i++) vals.push(i * 7);  // 7,14,...,84 (alturas bien distintas)
    // Fisher–Yates
    for (let i = vals.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = vals[i]; vals[i] = vals[j]; vals[j] = t;
    }
    datos = vals;
    render();
    reiniciarPasos();
  }

  // ---- Eventos ----
  selAlgo.onchange = () => { if (!animando) { render(); reiniciarPasos(); } };
  mount.querySelector('.ord-mezclar').onclick = mezclar;
  mount.querySelector('.ord-reiniciar').onclick = () => { if (!animando) { render(); reiniciarPasos(); } };
  btnPaso.onclick = () => { if (!animando) paso(); };
  btnAuto.onclick = correrAuto;

  // ---- Arranque con un ejemplo ----
  datos = [55, 21, 77, 7, 49, 35, 84, 14, 63, 28, 70, 42];
  render();
  reiniciarPasos();
  setSalida('Probá «Paso ▸» o «Auto ▶», o mezclá para un arreglo nuevo ↑');
})();
