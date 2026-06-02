/* Motor de actividades de práctica (Fase 2).
   Lee window.ACTIVIDADES (definido por assets/actividades/<tema>.js) y las renderiza
   dentro de <section class="actividades">. Sin dependencias; usa window.resaltarJava
   (de app.js) para resaltar el código. Tipos: quiz | trazar | costo | ordenar | corregir.
   En los datos, el código va como string normal (sin escapar HTML): se inserta con
   textContent, así que < > & se manejan solos. */
(function () {
  let total = 0, correctas = 0, scoreEl = null;

  const ETIQUETAS = {
    quiz: 'Quiz', trazar: 'Trazá / Predecí la salida', costo: 'Análisis de costo',
    ordenar: 'Ordená el código', corregir: 'Encontrá el error'
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
    let resuelta = false;
    act.opciones.forEach((op, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'act-op'; b.textContent = op;
      b.onclick = () => {
        if (resuelta) return;
        if (i === act.correcta) {
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

  // ---- Corregir: clic en la línea con el bug ----
  function renderCorregir(act, cont) {
    sumarTotal();
    const card = document.createElement('div'); card.className = 'actividad';
    card.appendChild(badge('corregir'));
    card.appendChild(enunciado(act.enunciado));
    const lista = document.createElement('div'); lista.className = 'corregir-lista';
    let resuelta = false;
    act.lineas.forEach((ln, i) => {
      const fila = document.createElement('div'); fila.className = 'corregir-linea';
      const code = document.createElement('code'); code.className = 'java'; code.textContent = ln;
      fila.appendChild(code);
      fila.onclick = () => {
        if (resuelta) return;
        if (i === act.lineaError) {
          fila.classList.add('correcta'); resuelta = true; acertar();
          const fix = (act.fix ? 'Corrección: ' + act.fix + '. ' : '') + (act.explicacion || '');
          explicacion(card, true, fix);
        } else {
          fila.classList.add('incorrecta');
        }
      };
      lista.appendChild(fila);
    });
    card.appendChild(lista);
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
      if (act.tipo === 'ordenar') renderOrdenar(act, cont);
      else if (act.tipo === 'corregir') renderCorregir(act, cont);
      else renderOpcion(act, cont);   // quiz | trazar | costo
    });
    actualizarScore();
    if (window.resaltarJava) window.resaltarJava();
  };
})();
