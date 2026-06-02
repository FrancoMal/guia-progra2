/* Laboratorio interactivo de Curvas de complejidad. Se monta en #curvas-visual
   (solo existe en temas/complejidad.html). Dibuja y compara O(1), O(log n), O(n),
   O(n log n), O(n²) y O(2ⁿ) en un mismo gráfico SVG, con un slider para n que muestra
   el costo de cada función. Sin dependencias, offline (funciona con file://). */
(function () {
  const mount = document.getElementById('curvas-visual');
  if (!mount) return;
  const NS = 'http://www.w3.org/2000/svg';

  // Geometría del lienzo (coordenadas internas del viewBox).
  const W = 640, H = 360, PAD_L = 46, PAD_R = 16, PAD_T = 18, PAD_B = 34;
  const N_MAX = 40;            // n máximo del eje X (y del slider)
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // Definición de cada curva. f(n) es el costo "crudo"; el color sale del CSS via stroke.
  // 'clase' marca si es polinómica (tratable) o exponencial (intratable).
  const CURVAS = [
    { id: 'c1',    lbl: 'O(1)',       color: '#6f6552', clase: 'poli', f: function () { return 1; } },
    { id: 'clogn', lbl: 'O(log n)',   color: '#2f7d52', clase: 'poli', f: function (n) { return Math.log2(n) + 1; } },
    { id: 'cn',    lbl: 'O(n)',       color: '#1c6a5b', clase: 'poli', f: function (n) { return n; } },
    { id: 'cnlogn',lbl: 'O(n log n)', color: '#a9711a', clase: 'poli', f: function (n) { return n * (Math.log2(n) + 1); } },
    { id: 'cn2',   lbl: 'O(n²)',      color: '#b1421d', clase: 'poli', f: function (n) { return n * n; } },
    { id: 'c2n',   lbl: 'O(2ⁿ)',      color: '#7a2bbf', clase: 'expo', f: function (n) { return Math.pow(2, n); } }
  ];
  // Estado: qué curvas están visibles. Por defecto, todas.
  const visible = {};
  CURVAS.forEach(c => { visible[c.id] = true; });

  let nActual = 8;            // posición inicial del slider
  let animando = false;

  // ---- estructura del widget ----
  let chks = '';
  CURVAS.forEach(c => {
    chks +=
      '<label class="lab-lbl" style="text-transform:none;letter-spacing:0;cursor:pointer;display:inline-flex;align-items:center;gap:.32rem;color:' + c.color + '">' +
        '<input type="checkbox" class="cv-chk" data-id="' + c.id + '" checked> ' + c.lbl +
      '</label>';
  });

  mount.innerHTML =
    '<div class="lab-controles">' +
      '<div class="lab-grupo">' +
        '<span class="lab-lbl">Mostrar:</span>' + chks +
      '</div>' +
    '</div>' +
    '<div class="lab-controles">' +
      '<div class="lab-grupo" style="flex:1;min-width:230px">' +
        '<span class="lab-lbl">n =</span>' +
        '<input type="range" class="cv-slider" min="1" max="' + N_MAX + '" value="' + nActual + '" step="1" aria-label="Tamaño de la entrada n" style="flex:1;min-width:150px;accent-color:var(--accent)">' +
        '<span class="lab-val actual cv-nval" style="min-width:2.4em;text-align:right">' + nActual + '</span>' +
      '</div>' +
      '<div class="lab-grupo">' +
        '<button class="btn cv-todas">Mostrar todas</button>' +
        '<button class="btn cv-solo-poli">Solo tratables</button>' +
        '<button class="btn lab-rec cv-platos">Ejemplo: lavar platos</button>' +
      '</div>' +
    '</div>' +
    '<div class="lab-salida" aria-live="polite"><span class="lab-salida-lbl">Costo en n = ' + nActual + '</span><span class="lab-salida-vals"></span></div>' +
    '<div class="lab-canvas"></div>' +
    '<div class="lab-stats"></div>';

  const canvas    = mount.querySelector('.lab-canvas');
  const stats     = mount.querySelector('.lab-stats');
  const salidaLbl = mount.querySelector('.lab-salida-lbl');
  const salidaVals= mount.querySelector('.lab-salida-vals');
  const slider    = mount.querySelector('.cv-slider');
  const nval      = mount.querySelector('.cv-nval');

  function setDisabled(d) {
    animando = d;
    mount.querySelectorAll('button, input').forEach(el => { el.disabled = d; });
  }

  // ---- escalas ----
  // X: n de 1..N_MAX → píxeles. Y: costo normalizado en escala LOGARÍTMICA para que
  // O(1) y O(2ⁿ) convivan sin que el exponencial se dispare fuera del lienzo.
  function x(n) { return PAD_L + (n - 1) / (N_MAX - 1) * (W - PAD_L - PAD_R); }
  // techo del eje Y = el mayor costo dibujable (2^N_MAX) acotado con clamp.
  const Y_MAX_LOG = Math.log10(Math.pow(2, N_MAX)); // ~12
  function y(costo) {
    const c = Math.max(costo, 0.0001);
    let t = Math.log10(c + 1) / Y_MAX_LOG;          // 0..1 normalizado (log)
    t = Math.min(1, Math.max(0, t));                // clamp dentro del lienzo
    return (H - PAD_B) - t * (H - PAD_T - PAD_B);
  }

  // ---- formato de números grandes ----
  function fmt(v) {
    if (!isFinite(v)) return '∞';
    if (v < 1000) return (Number.isInteger(v) ? v : v.toFixed(1)).toString();
    if (v < 1e6)  return (v / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    if (v < 1e9)  return (v / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    if (v < 1e12) return (v / 1e9).toFixed(1).replace(/\.0$/, '') + 'G';
    return v.toExponential(1);
  }

  // ---- render del gráfico ----
  function svgEl(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function render() {
    canvas.innerHTML = '';
    const svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'curvas-svg' });
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Gráfico comparativo de órdenes de complejidad');

    // --- banda "intratable" de fondo (zona exponencial, parte alta del lienzo) ---
    // Marca visual de la frontera tratable vs intratable: O(2ⁿ) se despega y trepa.
    const fronteraY = y(Math.pow(2, 14)); // referencia: donde lo exponencial ya "explotó"
    svg.appendChild(svgEl('rect', {
      x: PAD_L, y: PAD_T, width: W - PAD_L - PAD_R, height: fronteraY - PAD_T,
      fill: '#7a2bbf', opacity: '0.06'
    }));
    const fl = svgEl('line', { x1: PAD_L, y1: fronteraY, x2: W - PAD_R, y2: fronteraY,
      stroke: '#7a2bbf', 'stroke-width': '1', 'stroke-dasharray': '3 4', opacity: '0.5' });
    svg.appendChild(fl);
    const ftxt = svgEl('text', { x: W - PAD_R, y: fronteraY - 5, 'text-anchor': 'end',
      class: 'curva-lbl', fill: '#7a2bbf' });
    ftxt.textContent = 'zona intratable (exponencial)';
    svg.appendChild(ftxt);

    // --- ejes ---
    svg.appendChild(svgEl('line', { x1: PAD_L, y1: PAD_T, x2: PAD_L, y2: H - PAD_B,
      stroke: 'var(--line)', 'stroke-width': '1' }));
    svg.appendChild(svgEl('line', { x1: PAD_L, y1: H - PAD_B, x2: W - PAD_R, y2: H - PAD_B,
      stroke: 'var(--line)', 'stroke-width': '1' }));
    // etiquetas de ejes
    const ejeX = svgEl('text', { x: W - PAD_R, y: H - PAD_B + 24, 'text-anchor': 'end',
      class: 'curva-lbl', fill: 'var(--muted)' });
    ejeX.textContent = 'n (tamaño de la entrada) →';
    svg.appendChild(ejeX);
    const ejeY = svgEl('text', { x: PAD_L - 4, y: PAD_T + 2, 'text-anchor': 'end',
      class: 'curva-lbl', fill: 'var(--muted)' });
    ejeY.textContent = 'costo';
    svg.appendChild(ejeY);
    // marcas de n en el eje X
    [1, 10, 20, 30, 40].forEach(n => {
      const tx = svgEl('text', { x: x(n), y: H - PAD_B + 16, 'text-anchor': 'middle',
        class: 'curva-lbl', fill: 'var(--faint)' });
      tx.textContent = n;
      svg.appendChild(tx);
    });

    // --- línea vertical del slider (n actual) ---
    const vx = x(nActual);
    svg.appendChild(svgEl('line', { x1: vx, y1: PAD_T, x2: vx, y2: H - PAD_B,
      stroke: 'var(--accent)', 'stroke-width': '1.5', 'stroke-dasharray': '2 3', opacity: '0.75' }));
    const ntag = svgEl('text', { x: vx, y: PAD_T - 4, 'text-anchor': 'middle',
      class: 'curva-lbl', fill: 'var(--accent)', 'font-weight': '700' });
    ntag.textContent = 'n=' + nActual;
    svg.appendChild(ntag);

    // --- curvas ---
    CURVAS.forEach(c => {
      if (!visible[c.id]) return;
      let d = '';
      for (let i = 0; i <= 200; i++) {
        const n = 1 + (N_MAX - 1) * i / 200;
        const px = x(n), py = y(c.f(n));
        d += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ' ' + py.toFixed(1) + ' ';
      }
      const path = svgEl('path', { d: d, class: 'curva', stroke: c.color });
      if (c.clase === 'expo') path.setAttribute('stroke-dasharray', '1 0'); // sólida igual, marca semántica
      svg.appendChild(path);

      // punto + etiqueta sobre el valor en n actual
      const py = y(c.f(nActual));
      svg.appendChild(svgEl('circle', { cx: vx, cy: py, r: '3.2', fill: c.color }));
      const lt = svgEl('text', { x: vx + 6, y: py - 4, class: 'curva-lbl', fill: c.color, 'font-weight': '700' });
      lt.textContent = c.lbl;
      svg.appendChild(lt);
    });

    canvas.appendChild(svg);
    actualizarSalida();
    actualizarStats();
  }

  // ---- salida: costo de cada función visible en n actual ----
  function actualizarSalida() {
    salidaLbl.textContent = 'Costo en n = ' + nActual;
    salidaVals.innerHTML = '';
    CURVAS.forEach(c => {
      if (!visible[c.id]) return;
      const s = document.createElement('span');
      s.className = 'lab-val';
      s.style.color = c.color;
      s.innerHTML = c.lbl + ' = <strong>' + fmt(c.f(nActual)) + '</strong>';
      salidaVals.appendChild(s);
    });
    if (!salidaVals.children.length) {
      const s = document.createElement('span');
      s.className = 'lab-val';
      s.textContent = '(no hay curvas seleccionadas)';
      salidaVals.appendChild(s);
    }
  }

  function actualizarStats() {
    const cn2 = nActual * nActual;
    const c2n = Math.pow(2, nActual);
    stats.innerHTML = 'Mové el slider para ver cómo se separan las curvas. ' +
      'En n = ' + nActual + ', O(n²) ya pide <strong>' + fmt(cn2) + '</strong> pasos y O(2ⁿ) <strong>' + fmt(c2n) + '</strong>: ' +
      'lo polinómico se mantiene tratable; lo exponencial explota.';
  }

  // ---- ejemplo motivador: lavar los platos ----
  // Algoritmo A = 40·n  (lineal, constante alta).  Algoritmo B = 30·n + 10·n² (cuadrático).
  // En n=1 empatan (40=40); desde n=2 el término n² de B lo hace perder. A partir del cruce, A gana.
  function costoA(n) { return 40 * n; }
  function costoB(n) { return 30 * n + 10 * n * n; }
  function cruceAB() {
    // 40n = 30n + 10n²  ⇒  10n = 10n²  ⇒  n = 1. Para n ≤ 1 empatan; n ≥ 2, A gana.
    // Buscamos el primer n entero donde A pasa a ser estrictamente menor que B.
    for (let n = 1; n <= N_MAX; n++) if (costoA(n) < costoB(n)) return n;
    return null;
  }

  async function animarPlatos() {
    if (animando) return;
    setDisabled(true);
    const cruce = cruceAB();
    salidaLbl.textContent = '🍽️ Lavar los platos — A = 40·n  vs  B = 30·n + 10·n²';
    // Recorremos n creciente mostrando quién gana, y dejamos el slider sobre el cruce.
    for (let n = 1; n <= 6; n++) {
      salidaVals.innerHTML = '';
      const a = costoA(n), b = costoB(n);
      const ganador = a < b ? 'A' : (b < a ? 'B' : '=');
      [['A = 40·n', a, '#1c6a5b', ganador === 'A'],
       ['B = 30·n+10·n²', b, '#b1421d', ganador === 'B']].forEach(row => {
        const s = document.createElement('span');
        s.className = 'lab-val' + (row[3] ? ' actual' : '');
        s.style.color = row[2];
        s.innerHTML = 'n=' + n + ': ' + row[0] + ' = <strong>' + fmt(row[1]) + '</strong>' + (row[3] ? ' ✓' : '');
        salidaVals.appendChild(s);
      });
      nActual = n; slider.value = n; nval.textContent = n;
      render(); // re-render mueve la línea vertical
      // restauramos el rótulo del ejemplo (render lo pisa)
      salidaLbl.textContent = '🍽️ Lavar los platos — A = 40·n  vs  B = 30·n + 10·n²';
      await sleep(720);
    }
    stats.innerHTML = 'Cruce en <strong>n = ' + cruce + '</strong>: con pocas piezas, la constante alta de A pesa, ' +
      'pero el término <strong>n²</strong> de B crece tan rápido que desde n = ' + cruce + ' en adelante ' +
      'conviene el algoritmo <strong>A (lineal)</strong>. La moraleja de Big-O: a la larga, el orden manda sobre las constantes.';
    setDisabled(false);
  }

  // ---- eventos ----
  slider.addEventListener('input', () => {
    nActual = parseInt(slider.value, 10) || 1;
    nval.textContent = nActual;
    render();
  });
  mount.querySelectorAll('.cv-chk').forEach(chk => {
    chk.addEventListener('change', () => {
      visible[chk.dataset.id] = chk.checked;
      render();
    });
  });
  mount.querySelector('.cv-todas').onclick = () => {
    if (animando) return;
    CURVAS.forEach(c => { visible[c.id] = true; });
    mount.querySelectorAll('.cv-chk').forEach(chk => { chk.checked = true; });
    render();
  };
  mount.querySelector('.cv-solo-poli').onclick = () => {
    if (animando) return;
    CURVAS.forEach(c => { visible[c.id] = (c.clase === 'poli'); });
    mount.querySelectorAll('.cv-chk').forEach(chk => {
      const c = CURVAS.find(x => x.id === chk.dataset.id);
      chk.checked = c.clase === 'poli';
    });
    render();
  };
  mount.querySelector('.cv-platos').onclick = animarPlatos;

  // ---- arranque con ejemplo ----
  render();
})();
