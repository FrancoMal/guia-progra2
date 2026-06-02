/* Motor de actividades de práctica (Fase 2).
   Lee window.ACTIVIDADES (definido por assets/actividades/<tema>.js) y las renderiza
   dentro de <section class="actividades">. Sin dependencias; usa window.resaltarJava
   (de app.js) para resaltar el código. Tipos: quiz | trazar | costo | ordenar | mapear.
   Las opciones de quiz/trazar/costo se barajan en cada render.
   En los datos, el código va como string normal (sin escapar HTML): se inserta con
   textContent, así que < > & se manejan solos. */
(function () {
  let total = 0, correctas = 0, scoreEl = null;

  const ETIQUETAS = {
    quiz: 'Quiz', trazar: 'Trazá / Predecí la salida', costo: 'Análisis de costo',
    ordenar: 'Ordená el código', mapear: 'Emparejá español ↔ inglés'
  };

  function badge(tipo) {
    const s = document.createElement('span');
    s.className = 'act-tipo';
    s.textContent = ETIQUETAS[tipo] || tipo;
    return s;
  }
  function enunciado(txt) {
    const p = document.createElement('p');
    p.className = 'act-enunciado';
    p.textContent = txt;
    return p;
  }
  function bloqueCodigo(codigo) {
    if (!codigo) return null;
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.className = 'java';
    code.textContent = codigo;          // textContent escapa < > & automáticamente
    pre.appendChild(code);
    return pre;
  }
  function explicacion(card, ok, texto) {
    let exp = card.querySelector('.act-exp');
    if (!exp) { exp = document.createElement('div'); card.appendChild(exp); }
    exp.className = 'act-exp ' + (ok ? 'ok' : 'mal');
    exp.textContent = (ok ? '✓ ¡Correcto! ' : '✗ ') + (texto || '');
  }
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function sumarTotal() { total++; }
  function acertar() { correctas++; actualizarScore(); }
  function actualizarScore() {
    if (scoreEl) scoreEl.textContent = 'Resueltas correctamente: ' + correctas + ' / ' + total;
  }

  // ---- Opción múltiple: quiz | trazar | costo ----
  function renderOpcion(act, cont) {
    sumarTotal();
    const card = document.createElement('div'); card.className = 'actividad';
    card.appendChild(badge(act.tipo));
    card.appendChild(enunciado(act.enunciado));
    const pre = bloqueCodigo(act.codigo); if (pre) card.appendChild(pre);
    const ops = document.createElement('div'); ops.className = 'act-opciones';
    // Mezclamos las opciones para que la respuesta correcta no caiga siempre en
    // la misma posición. Guardamos el texto correcto para identificarlo tras barajar.
    const textoCorrecto = act.opciones[act.correcta];
    const opciones = shuffle(act.opciones.slice());
    let resuelta = false;
    opciones.forEach((op) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'act-op'; b.textContent = op;
      b.onclick = () => {
        if (resuelta) return;
        if (op === textoCorrecto) {
          b.classList.add('correcta'); resuelta = true; acertar();
          explicacion(card, true, act.explicacion);
          ops.querySelectorAll('button').forEach(x => x.disabled = true);
        } else {
          b.classList.add('incorrecta'); b.disabled = true;
        }
      };
      ops.appendChild(b);
    });
    card.appendChild(ops);
    cont.appendChild(card);
  }

  // ---- Ordenar código: reordenar líneas con ↑/↓ ----
  function renderOrdenar(act, cont) {
    sumarTotal();
    const card = document.createElement('div'); card.className = 'actividad';
    card.appendChild(badge('ordenar'));
    card.appendChild(enunciado(act.enunciado));
    const correcto = act.lineas.slice();
    let orden = correcto.slice();
    if (correcto.length > 1) {
      do { orden = shuffle(correcto.slice()); } while (orden.join('\n') === correcto.join('\n'));
    }
    const lista = document.createElement('div'); lista.className = 'ordenar-lista';
    let ok = false;
    function pintar() {
      lista.innerHTML = '';
      orden.forEach((ln, idx) => {
        const fila = document.createElement('div'); fila.className = 'ordenar-linea';
        const ctr = document.createElement('span'); ctr.className = 'ord-ctrl';
        const up = document.createElement('button'); up.type = 'button'; up.textContent = '↑';
        up.onclick = () => { if (idx > 0) { [orden[idx - 1], orden[idx]] = [orden[idx], orden[idx - 1]]; pintar(); } };
        const dn = document.createElement('button'); dn.type = 'button'; dn.textContent = '↓';
        dn.onclick = () => { if (idx < orden.length - 1) { [orden[idx + 1], orden[idx]] = [orden[idx], orden[idx + 1]]; pintar(); } };
        ctr.appendChild(up); ctr.appendChild(dn);
        const code = document.createElement('code'); code.className = 'java'; code.textContent = ln;
        fila.appendChild(ctr); fila.appendChild(code);
        lista.appendChild(fila);
      });
      if (window.resaltarJava) window.resaltarJava();
    }
    pintar();
    card.appendChild(lista);
    const verif = document.createElement('button');
    verif.type = 'button'; verif.className = 'act-verificar'; verif.textContent = 'Verificar';
    verif.onclick = () => {
      const bien = orden.join('\n') === correcto.join('\n');
      lista.classList.toggle('todo-bien', bien);
      if (bien && !ok) { ok = true; acertar(); }
      explicacion(card, bien, bien ? act.explicacion : 'Todavía no: revisá el orden de las líneas.');
    };
    card.appendChild(verif);
    cont.appendChild(card);
  }

  // ---- Mapear: emparejar términos español ↔ inglés (TDA Wehbe ↔ Monzón) ----
  // Datos: { tipo:'mapear', enunciado, pares:[['apilar(x)','Stack.add(x)'],...], explicacion }
  // pares[i][0] = término en español (columna fija); pares[i][1] = equivalente en inglés.
  function renderMapear(act, cont) {
    sumarTotal();
    const card = document.createElement('div'); card.className = 'actividad';
    card.appendChild(badge('mapear'));
    card.appendChild(enunciado(act.enunciado));
    const pre = bloqueCodigo(act.codigo); if (pre) card.appendChild(pre);
    const opcionesDer = shuffle(act.pares.map(p => p[1]).slice());
    const lista = document.createElement('div'); lista.className = 'map-lista';
    const filas = [];
    act.pares.forEach((par) => {
      const fila = document.createElement('div'); fila.className = 'map-fila';
      const es = document.createElement('code'); es.className = 'java map-es'; es.textContent = par[0];
      const fl = document.createElement('span'); fl.className = 'map-flecha'; fl.textContent = '→';
      const sel = document.createElement('select'); sel.className = 'map-sel';
      const ph = document.createElement('option'); ph.value = ''; ph.textContent = '— elegí —'; sel.appendChild(ph);
      opcionesDer.forEach(d => { const o = document.createElement('option'); o.value = d; o.textContent = d; sel.appendChild(o); });
      fila.appendChild(es); fila.appendChild(fl); fila.appendChild(sel);
      lista.appendChild(fila);
      filas.push({ fila, sel, correcto: par[1] });
    });
    card.appendChild(lista);
    let ok = false;
    const verif = document.createElement('button');
    verif.type = 'button'; verif.className = 'act-verificar'; verif.textContent = 'Verificar';
    verif.onclick = () => {
      let bien = true;
      filas.forEach(f => {
        const acierta = f.sel.value === f.correcto;
        f.fila.classList.toggle('map-ok', acierta);
        f.fila.classList.toggle('map-mal', !acierta);
        if (!acierta) bien = false;
      });
      if (bien && !ok) { ok = true; acertar(); }
      explicacion(card, bien, bien ? act.explicacion : 'Todavía no: revisá los emparejamientos marcados en rojo.');
    };
    card.appendChild(verif);
    cont.appendChild(card);
    if (window.resaltarJava) window.resaltarJava();
  }

  window.renderActividades = function () {
    if (!Array.isArray(window.ACTIVIDADES) || !window.ACTIVIDADES.length) return;
    const sec = document.querySelector('section.actividades');
    if (!sec) return;
    sec.innerHTML = '<h2>Actividades para practicar</h2>';
    scoreEl = document.createElement('div'); scoreEl.className = 'act-score';
    sec.appendChild(scoreEl);
    total = 0; correctas = 0;
    const cont = document.createElement('div');
    sec.appendChild(cont);
    window.ACTIVIDADES.forEach(act => {
      if (act.tipo === 'corregir') return;   // las de "Encontrá el error" se retiraron
      if (act.tipo === 'ordenar') renderOrdenar(act, cont);
      else if (act.tipo === 'mapear') renderMapear(act, cont);
      else renderOpcion(act, cont);   // quiz | trazar | costo
    });
    actualizarScore();
    if (window.resaltarJava) window.resaltarJava();
  };
})();
