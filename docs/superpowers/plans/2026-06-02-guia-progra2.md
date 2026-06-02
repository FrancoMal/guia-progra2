# Guía de estudio Programación 2 — Plan de implementación (Fase 1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir una guía de estudio web interactiva y 100% offline para Programación 2 (Java/TDAs): shell compartido + teoría de 12 temas, y publicarla en GitHub Pages.

**Architecture:** Sitio estático multi-página (HTML/CSS/JS vanilla, sin build). Un `app.js` compartido inyecta el cromo (menú, tema, progreso, navegación, resaltado de Java) en cada página leyendo `data.js`. El contenido teórico vive como HTML estático en cada `temas/*.html`. Nada de `fetch()` ni CDNs → funciona con doble clic.

**Tech Stack:** HTML5, CSS (variables + grid), JavaScript vanilla, `localStorage`. Verificación con Playwright MCP sobre `file://`. Deploy con `gh` (cuenta FrancoMal) + GitHub Pages.

**Verificación (en vez de TDD unitario):** no hay framework de test ni build. Cada tarea con comportamiento JS se verifica cargando la página `file://` con Playwright MCP y comprobando el DOM/comportamiento; las páginas de contenido se verifican por estructura (secciones presentes) y un pase visual final.

---

## Estructura de archivos

```
index.html                  Portada: progreso global + tarjetas de los 4 bloques
assets/styles.css           Estilos: variables claro/oscuro, layout grid, componentes, tokens de código
assets/data.js              BLOQUES[] y TEMAS[] (orden, títulos, slugs, archivos) — fuente de verdad
assets/app.js               Cromo compartido: menú, tema, progreso, prev/next, resaltador Java
temas/recursividad.html     ┐
temas/complejidad.html      │
temas/listas.html           │
temas/ordenamiento.html     │
temas/pila.html             │  12 páginas de tema (misma plantilla)
temas/cola.html             │  Pila es la plantilla canónica (Task 5)
temas/cola-prioridad.html   │
temas/conjunto.html         │
temas/diccionario-simple.html
temas/diccionario-multiple.html
temas/arboles.html          │
temas/grafos.html           ┘
README.md                   Breve descripción + link a Pages
.nojekyll                   Evita que GitHub Pages procese con Jekyll
```

Rutas: páginas de `temas/` usan `../assets/...` y `../index.html`. La portada usa `assets/...`.

---

### Task 1: Esqueleto del proyecto y `data.js`

**Files:**
- Create: `assets/data.js`, `.nojekyll`, `README.md`

- [ ] **Step 1: Crear `.nojekyll` (vacío) y `README.md`**

`README.md`:
```markdown
# Guía de estudio — Programación 2 (Java / Algoritmos y Estructuras de Datos)

Guía interactiva y offline: teoría de TDAs (Pila, Cola, Cola de Prioridad, Conjunto,
Diccionarios, Árboles, Grafos) + fundamentos (recursividad, complejidad, ordenamiento).

Abrir `index.html` con doble clic, o ver online en GitHub Pages.
```

- [ ] **Step 2: Crear `assets/data.js`** con los 4 bloques y 12 temas, más un arreglo plano `TEMAS` para prev/next. Variables globales (script clásico, sin módulos):

```js
const BLOQUES = [
  { id: 'fundamentos', titulo: 'Fundamentos', temas: [
      { slug: 'recursividad', titulo: 'Recursividad',              archivo: 'recursividad.html' },
      { slug: 'complejidad',  titulo: 'Complejidad y Big-O',       archivo: 'complejidad.html' },
      { slug: 'listas',       titulo: 'Memoria dinámica y listas', archivo: 'listas.html' },
      { slug: 'ordenamiento', titulo: 'Ordenamiento',              archivo: 'ordenamiento.html' },
  ]},
  { id: 'lineales', titulo: 'TDAs lineales', temas: [
      { slug: 'pila',           titulo: 'Pila',              archivo: 'pila.html' },
      { slug: 'cola',           titulo: 'Cola',              archivo: 'cola.html' },
      { slug: 'cola-prioridad', titulo: 'Cola de Prioridad', archivo: 'cola-prioridad.html' },
  ]},
  { id: 'conjuntos', titulo: 'Conjuntos y Diccionarios', temas: [
      { slug: 'conjunto',             titulo: 'Conjunto',             archivo: 'conjunto.html' },
      { slug: 'diccionario-simple',   titulo: 'Diccionario Simple',   archivo: 'diccionario-simple.html' },
      { slug: 'diccionario-multiple', titulo: 'Diccionario Múltiple', archivo: 'diccionario-multiple.html' },
  ]},
  { id: 'arboles-grafos', titulo: 'Árboles y Grafos', temas: [
      { slug: 'arboles', titulo: 'Árboles (Binario, ABB, AVL)', archivo: 'arboles.html' },
      { slug: 'grafos',  titulo: 'Grafos',                      archivo: 'grafos.html' },
  ]},
];
const TEMAS = BLOQUES.flatMap(b => b.temas.map((t, i) => ({ ...t, bloque: b.titulo, bloqueId: b.id })));
```

- [ ] **Step 3: Commit**
```bash
git add assets/data.js .nojekyll README.md && git commit -m "Add project skeleton and navigation data model"
```

---

### Task 2: `assets/styles.css`

**Files:** Create: `assets/styles.css`

- [ ] **Step 1: Variables de tema (claro por defecto, oscuro con `html.oscuro`)**

```css
:root{
  --bg:#f7f8fa; --surface:#ffffff; --fg:#1c2230; --muted:#5b6677;
  --border:#e3e7ee; --acento:#2a6df4; --acento-suave:#e7efff;
  --ok:#1f9d5b; --warn:#c9810a; --err:#d8453b;
  --code-bg:#f4f6fb; --tok-kw:#a626a4; --tok-type:#1f7199; --tok-str:#2a9d3f;
  --tok-com:#8a94a6; --tok-num:#b26a00; --tok-ann:#7a5cff;
  --radio:10px; --sidebar:260px;
  --font:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  --mono:"SF Mono",ui-monospace,Consolas,Menlo,monospace;
}
html.oscuro{
  --bg:#11151c; --surface:#1a212b; --fg:#e6eaf2; --muted:#9aa6b8;
  --border:#2a323e; --acento:#5b9dff; --acento-suave:#1d2a40;
  --code-bg:#0f141b; --tok-kw:#d68cf0; --tok-type:#5fc9e8; --tok-str:#7bdc92;
  --tok-com:#6b7686; --tok-num:#e0a45a; --tok-ann:#a99bff;
}
*{box-sizing:border-box} html,body{margin:0}
body{font-family:var(--font);background:var(--bg);color:var(--fg);line-height:1.6}
```

- [ ] **Step 2: Layout con grid-areas** (independiente del orden del DOM, porque `app.js` inyecta header y sidebar):

```css
body{display:grid;min-height:100vh;
  grid-template-columns:var(--sidebar) 1fr;
  grid-template-rows:auto 1fr;
  grid-template-areas:"header header" "sidebar main";}
.app-header{grid-area:header;position:sticky;top:0;z-index:20;display:flex;
  align-items:center;gap:1rem;padding:.6rem 1rem;background:var(--surface);
  border-bottom:1px solid var(--border)}
#sidebar{grid-area:sidebar;position:sticky;top:57px;height:calc(100vh - 57px);
  overflow-y:auto;background:var(--surface);border-right:1px solid var(--border);padding:1rem}
main{grid-area:main;padding:2rem;max-width:60rem}
@media(max-width:820px){
  body{grid-template-columns:1fr;grid-template-areas:"header" "main"}
  #sidebar{position:fixed;left:0;top:57px;width:80%;max-width:320px;transform:translateX(-100%);
    transition:transform .2s;z-index:30}
  #sidebar.abierto{transform:translateX(0)}
  .hamburguesa{display:inline-flex!important}
}
```

- [ ] **Step 3: Componentes** — nav del sidebar (bloques colapsables, ítem activo), tarjetas de portada, barra de progreso, tablas de costo, callouts (tip/error), botones, y bloque de código:

```css
.hamburguesa{display:none;background:none;border:0;color:var(--fg);font-size:1.4rem;cursor:pointer}
.app-header h1{font-size:1rem;margin:0;font-weight:600}
.app-header .spacer{flex:1}
.btn{background:var(--acento-suave);color:var(--acento);border:1px solid var(--border);
  border-radius:var(--radio);padding:.4rem .7rem;cursor:pointer;font:inherit}
.btn:hover{filter:brightness(.97)}
.nav-bloque>summary{cursor:pointer;font-weight:600;padding:.4rem 0;list-style:none}
.nav-bloque ul{list-style:none;margin:.2rem 0 .8rem;padding:0}
.nav-bloque a{display:block;padding:.35rem .6rem;border-radius:8px;color:var(--fg);text-decoration:none}
.nav-bloque a:hover{background:var(--acento-suave)}
.nav-bloque a.activo{background:var(--acento);color:#fff}
.nav-bloque a.leido::after{content:"✓";color:var(--ok);float:right}
.nav-bloque a.activo.leido::after{color:#fff}
.cards{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radio);padding:1rem}
.card h3{margin:.2rem 0 .6rem} .card ul{padding-left:1.1rem;margin:0}
.progreso{background:var(--surface);border:1px solid var(--border);border-radius:var(--radio);padding:1rem;margin-bottom:1.5rem}
.barra{height:12px;background:var(--acento-suave);border-radius:99px;overflow:hidden}
.barra>span{display:block;height:100%;background:var(--acento);width:0}
table.costo{border-collapse:collapse;width:100%;margin:1rem 0}
table.costo th,table.costo td{border:1px solid var(--border);padding:.5rem .7rem;text-align:left}
table.costo th{background:var(--acento-suave)}
.callout{border-left:4px solid var(--acento);background:var(--surface);
  border-radius:8px;padding:.8rem 1rem;margin:1rem 0}
.callout.tip{border-color:var(--ok)} .callout.error{border-color:var(--err)}
.callout .et{font-weight:700;display:block;margin-bottom:.2rem}
pre{background:var(--code-bg);border:1px solid var(--border);border-radius:var(--radio);
  padding:1rem;overflow:auto} code{font-family:var(--mono);font-size:.92em}
p code,li code{background:var(--code-bg);padding:.1em .35em;border-radius:5px}
.tok-kw{color:var(--tok-kw)} .tok-type{color:var(--tok-type)} .tok-str{color:var(--tok-str)}
.tok-com{color:var(--tok-com);font-style:italic} .tok-num{color:var(--tok-num)} .tok-ann{color:var(--tok-ann)}
.tema-nav{display:flex;justify-content:space-between;margin-top:2.5rem;gap:1rem}
.proximamente{color:var(--muted);font-style:italic}
.actividades{margin-top:2.5rem;border-top:1px dashed var(--border);padding-top:1rem}
```

- [ ] **Step 4: Commit**
```bash
git add assets/styles.css && git commit -m "Add stylesheet with light/dark theme, grid layout and components"
```

---

### Task 3: `assets/app.js` (cromo compartido)

**Files:** Create: `assets/app.js`

- [ ] **Step 1: Util de rutas y arranque**. Detecta si está en `/temas/` (prefijo `../`) o en la raíz, y el tema actual desde `body.dataset.tema`.

```js
(function(){
  const enTemas = /\/temas\//.test(location.pathname) || !!document.body.dataset.tema;
  const base = enTemas ? '../' : '';
  const slugActual = document.body.dataset.tema || null;
```

- [ ] **Step 2: Progreso en `localStorage`**
```js
  const LS_PROG='progra2:progreso', LS_TEMA='progra2:tema';
  const getProg=()=>{try{return JSON.parse(localStorage.getItem(LS_PROG))||{}}catch(e){return{}}};
  const setProg=p=>localStorage.setItem(LS_PROG,JSON.stringify(p));
```

- [ ] **Step 3: Tema claro/oscuro** (respeta `prefers-color-scheme` la primera vez)
```js
  function aplicarTema(t){document.documentElement.classList.toggle('oscuro',t==='oscuro');}
  let tema=localStorage.getItem(LS_TEMA);
  if(!tema) tema=matchMedia('(prefers-color-scheme: dark)').matches?'oscuro':'claro';
  aplicarTema(tema);
```

- [ ] **Step 4: Resaltador de Java** (sin dependencias; tokeniza el fuente crudo y escapa)
```js
  const KW=new Set('abstract boolean break byte case catch char class continue default do double else extends final finally float for if implements import instanceof int interface long new null package private protected public return short static super switch this throw throws try void while true false'.split(' '));
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  function highlightJava(src){
    const re=/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(@\w+)|\b(\d+(?:\.\d+)?)\b|\b([A-Z][A-Za-z0-9_]*)\b|\b([A-Za-z_]\w*)\b/g;
    let out='',last=0,m;
    while((m=re.exec(src))){
      out+=esc(src.slice(last,m.index));
      const[full,com,str,ann,num,type,word]=m;
      if(com)out+='<span class="tok-com">'+esc(com)+'</span>';
      else if(str)out+='<span class="tok-str">'+esc(str)+'</span>';
      else if(ann)out+='<span class="tok-ann">'+esc(ann)+'</span>';
      else if(num)out+='<span class="tok-num">'+num+'</span>';
      else if(type)out+='<span class="tok-type">'+esc(type)+'</span>';
      else if(word)out+=KW.has(word)?'<span class="tok-kw">'+word+'</span>':esc(word);
      last=m.index+full.length;
    }
    return out+esc(src.slice(last));
  }
  function resaltar(){document.querySelectorAll('pre>code.java,code.lang-java').forEach(c=>{c.innerHTML=highlightJava(c.textContent);});}
```

- [ ] **Step 5: Construir header + sidebar** y montarlos. El header trae hamburguesa (mobile), título-link a inicio, espaciador y botón de tema. El sidebar arma los bloques con `<details>` (abierto si contiene el tema actual) y marca leídos/activo.
```js
  function construirHeader(){
    const h=document.createElement('header');h.className='app-header';
    h.innerHTML='<button class="hamburguesa" aria-label="Menú">☰</button>'+
      '<h1><a href="'+base+'index.html" style="color:inherit;text-decoration:none">📘 Programación 2</a></h1>'+
      '<span class="spacer"></span>'+
      '<button class="btn" id="toggle-tema">'+(tema==='oscuro'?'☀️ Claro':'🌙 Oscuro')+'</button>';
    document.body.prepend(h);
    h.querySelector('#toggle-tema').onclick=()=>{tema=tema==='oscuro'?'claro':'oscuro';
      localStorage.setItem(LS_TEMA,tema);aplicarTema(tema);
      h.querySelector('#toggle-tema').textContent=tema==='oscuro'?'☀️ Claro':'🌙 Oscuro';};
    h.querySelector('.hamburguesa').onclick=()=>document.getElementById('sidebar').classList.toggle('abierto');
  }
  function construirSidebar(){
    const prog=getProg();
    const aside=document.createElement('aside');aside.id='sidebar';
    aside.innerHTML=BLOQUES.map(b=>{
      const items=b.temas.map(t=>{
        const cls=[t.slug===slugActual?'activo':'',prog[t.slug]?'leido':''].join(' ').trim();
        return '<li><a class="'+cls+'" href="'+base+'temas/'+t.archivo+'">'+t.titulo+'</a></li>';
      }).join('');
      const abierto=b.temas.some(t=>t.slug===slugActual)?' open':'';
      return '<details class="nav-bloque"'+abierto+'><summary>'+b.titulo+'</summary><ul>'+items+'</ul></details>';
    }).join('');
    document.body.appendChild(aside);
  }
```

- [ ] **Step 6: Prev/next y "marcar como leído"** (solo en páginas de tema)
```js
  function navTema(){
    if(!slugActual)return;
    const i=TEMAS.findIndex(t=>t.slug===slugActual);
    const prev=TEMAS[i-1],next=TEMAS[i+1];
    const main=document.querySelector('main');
    const prog=getProg();
    const wrap=document.createElement('div');wrap.className='tema-nav';
    wrap.innerHTML=(prev?'<a class="btn" href="'+base+'temas/'+prev.archivo+'">← '+prev.titulo+'</a>':'<span></span>')+
      '<button class="btn" id="marcar">'+(prog[slugActual]?'✓ Leído':'Marcar como leído')+'</button>'+
      (next?'<a class="btn" href="'+base+'temas/'+next.archivo+'">'+next.titulo+' →</a>':'<span></span>');
    main.appendChild(wrap);
    wrap.querySelector('#marcar').onclick=function(){
      const p=getProg();p[slugActual]=!p[slugActual];setProg(p);
      this.textContent=p[slugActual]?'✓ Leído':'Marcar como leído';
      const link=document.querySelector('#sidebar a.activo');if(link)link.classList.toggle('leido',!!p[slugActual]);
    };
  }
```

- [ ] **Step 7: Portada** (solo si existe `#portada`): progreso global + tarjetas por bloque
```js
  function portada(){
    const cont=document.getElementById('portada');if(!cont)return;
    const prog=getProg();const hechos=TEMAS.filter(t=>prog[t.slug]).length;
    const pct=Math.round(hechos/TEMAS.length*100);
    const cards=BLOQUES.map(b=>'<div class="card"><h3>'+b.titulo+'</h3><ul>'+
      b.temas.map(t=>'<li><a href="temas/'+t.archivo+'">'+t.titulo+(prog[t.slug]?' ✓':'')+'</a></li>').join('')+
      '</ul></div>').join('');
    cont.innerHTML='<div class="progreso"><strong>Progreso:</strong> '+hechos+'/'+TEMAS.length+
      ' temas leídos<div class="barra"><span style="width:'+pct+'%"></span></div></div>'+
      '<div class="cards">'+cards+'</div>';
  }
  construirHeader();construirSidebar();navTema();portada();resaltar();
})();
```

- [ ] **Step 8: Verificar con Playwright MCP** (tras tener index + Pila en Task 4/5). Placeholder de verificación: cargar `file://.../temas/pila.html`, comprobar `#sidebar a.activo` existe, click en `#toggle-tema` agrega `html.oscuro`, click en `#marcar` persiste y al recargar sigue ✓, y que hay `span.tok-kw` dentro de `pre code.java`.

- [ ] **Step 9: Commit**
```bash
git add assets/app.js && git commit -m "Add shared shell: nav, theme toggle, progress and Java highlighter"
```

---

### Task 4: `index.html` (portada)

**Files:** Create: `index.html`

- [ ] **Step 1: Página mínima que monta el contenedor de portada**
```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Guía de estudio · Programación 2</title>
<link rel="stylesheet" href="assets/styles.css">
</head>
<body>
<main>
  <h1>Guía de estudio · Programación 2</h1>
  <p>Algoritmos y estructuras de datos en Java (TDAs). Elegí un tema para empezar.</p>
  <div id="portada"></div>
</main>
<script src="assets/data.js"></script>
<script src="assets/app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar** abriendo `index.html`: se ven header, sidebar, barra de progreso 0/12 y 4 tarjetas con links.

- [ ] **Step 3: Commit**
```bash
git add index.html && git commit -m "Add landing page with global progress and block cards"
```

---

### Task 5: `temas/pila.html` — plantilla canónica

**Files:** Create: `temas/pila.html`

Esta página fija el formato que copiarán las otras 11. Basada en `ejemplos codigo/.../api/PilaTDA.java` (operaciones: `inicializarPila`, `apilar`, `desapilar`, `tope`, `pilaVacía`; LIFO; costo O(1)).

- [ ] **Step 1: Escribir la página completa** con el esqueleto + las 7 secciones de la anatomía:

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pila · Guía Programación 2</title>
<link rel="stylesheet" href="../assets/styles.css">
</head>
<body data-tema="pila">
<main>
<article>
  <h1>Pila (Stack)</h1>

  <h2>1. ¿Qué es y cuándo se usa?</h2>
  <p>Una <strong>pila</strong> es una colección <strong>LIFO</strong> (Last In, First Out):
     el último elemento en entrar es el primero en salir. Analogía: una pila de platos —
     solo podés sacar el de arriba. Se usa para deshacer/rehacer, evaluación de expresiones,
     control de llamadas recursivas, etc.</p>

  <h2>2. Interfaz del TDA</h2>
  <p>Operaciones y <strong>precondiciones</strong>:</p>
  <pre><code class="java">public interface PilaTDA {
    void inicializarPila();   // Sin precondiciones.
    void apilar(int x);       // Pila inicializada.
    void desapilar();         // Pila inicializada y no vacía.
    int tope();               // Pila inicializada y no vacía.
    boolean pilaVacia();      // Pila inicializada.
}</code></pre>

  <h2>3. Implementaciones</h2>
  <h3>Con lista dinámica (LD)</h3>
  <p>El tope es el primer nodo de la lista. Todas las operaciones son O(1).</p>
  <pre><code class="java">public class PilaLD implements PilaTDA {
    class Nodo { int valor; Nodo sig; }
    Nodo tope;
    public void inicializarPila(){ tope = null; }
    public void apilar(int x){ Nodo n = new Nodo(); n.valor = x; n.sig = tope; tope = n; }
    public void desapilar(){ tope = tope.sig; }
    public int tope(){ return tope.valor; }
    public boolean pilaVacia(){ return tope == null; }
}</code></pre>
  <h3>Con arreglo (A)</h3>
  <pre><code class="java">public class PilaA implements PilaTDA {
    int[] datos; int tope;          // 'tope' es la cantidad de elementos
    public void inicializarPila(){ datos = new int[100]; tope = 0; }
    public void apilar(int x){ datos[tope] = x; tope++; }
    public void desapilar(){ tope--; }
    public int tope(){ return datos[tope - 1]; }
    public boolean pilaVacia(){ return tope == 0; }
}</code></pre>

  <h2>4. Costo</h2>
  <table class="costo"><thead><tr><th>Operación</th><th>LD</th><th>Arreglo</th></tr></thead>
  <tbody>
    <tr><td>inicializarPila</td><td>O(1)</td><td>O(1)</td></tr>
    <tr><td>apilar</td><td>O(1)</td><td>O(1)</td></tr>
    <tr><td>desapilar</td><td>O(1)</td><td>O(1)</td></tr>
    <tr><td>tope</td><td>O(1)</td><td>O(1)</td></tr>
    <tr><td>pilaVacia</td><td>O(1)</td><td>O(1)</td></tr>
  </tbody></table>

  <h2>5. Errores comunes</h2>
  <div class="callout error"><span class="et">⚠️ Cuidado</span>
    Llamar <code>desapilar()</code> o <code>tope()</code> sobre una pila vacía viola la
    precondición (NullPointerException en LD, índice negativo en arreglo).</div>
  <div class="callout tip"><span class="et">💡 Tip de parcial</span>
    Siempre inicializá la pila antes de usarla y verificá <code>pilaVacia()</code> antes de
    desapilar o pedir el tope.</div>

  <h2>6. Resumen</h2>
  <ul>
    <li>LIFO: el último en entrar es el primero en salir.</li>
    <li>Operaciones clave: apilar, desapilar, tope, pilaVacia.</li>
    <li>Todas O(1) tanto en LD como en arreglo.</li>
  </ul>

  <section class="actividades" data-actividades>
    <h2>Actividades</h2>
    <p class="proximamente">🚧 Próximamente (Fase 2): quiz, ordenar código, corregir errores, trazá la pila y análisis de costo.</p>
  </section>
</article>
</main>
<script src="../assets/data.js"></script>
<script src="../assets/app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificación end-to-end con Playwright MCP** sobre `file://.../temas/pila.html`:
  - `#sidebar a.activo` tiene texto "Pila".
  - El bloque "TDAs lineales" (`<details open>`) está abierto.
  - Existe `pre code.java span.tok-kw` (resaltado aplicado).
  - Click en `#toggle-tema` → `document.documentElement.classList.contains('oscuro')` true.
  - Click en `#marcar` → recargar → botón dice "✓ Leído" y el link del sidebar tiene clase `leido`.
  - Prev/next: existe link "Cola de Prioridad →" y "← ..." (Ordenamiento, según orden global).

- [ ] **Step 3: Commit**
```bash
git add temas/pila.html && git commit -m "Add Pila topic page (canonical template) and verify shell end-to-end"
```

---

### Tasks 6–16: Resto de páginas de tema

Cada página sigue **exactamente** la plantilla de Pila: mismo `<head>`, `<body data-tema="SLUG">`,
las 7 secciones (1. ¿Qué es?/Idea · 2. Interfaz del TDA o Ideas clave · 3. Implementaciones/código ·
4. Costo · 5. Errores comunes · 6. Resumen · 7. `<section class="actividades">` con "Próximamente"),
y los dos `<script>` finales. Todo el código Java va en `<pre><code class="java">`.
Fuente: la carpeta `ejemplos codigo/` del repo y los TDAs vistos.

**Definición de "hecho" por página:** abre con doble clic; el sidebar marca el tema activo;
hay al menos un bloque de código resaltado; las 7 secciones presentes; contenido correcto y en español.

- [ ] **Task 6 — `temas/recursividad.html`** (`data-tema="recursividad"`): caso base vs. caso recursivo, pila de llamadas, ejemplos (factorial, Fibonacci, recorrer lista). Sección 2 = "Ideas clave". Costo: comparar Fibonacci recursivo O(2ⁿ) vs iterativo O(n). Errores: falta de caso base → stack overflow. Commit: `Add Recursividad topic page`.

- [ ] **Task 7 — `temas/complejidad.html`** (`data-tema="complejidad"`): notación Big-O, órdenes comunes (O(1), O(log n), O(n), O(n log n), O(n²)), cómo contar operaciones, mejor/peor caso. Tabla con ejemplos por orden. Errores: confundir costo de un bucle anidado. Commit: `Add Complejidad/Big-O topic page`.

- [ ] **Task 8 — `temas/listas.html`** (`data-tema="listas"`): memoria dinámica, nodo (`valor`+`sig`), lista enlazada simple; operaciones agregar/eliminar/recorrer con el nodo "turista" (convención del curso). Costo O(n) recorrido. Errores: perder la referencia al primero. Commit: `Add Listas enlazadas topic page`.

- [ ] **Task 9 — `temas/ordenamiento.html`** (`data-tema="ordenamiento"`): selección, inserción, burbuja (O(n²)) y quicksort, mergesort (O(n log n)) con código Java. Tabla comparativa de costos. Errores: límites de índices. Commit: `Add Ordenamiento topic page`.

- [ ] **Task 10 — `temas/cola.html`** (`data-tema="cola"`): FIFO, interfaz (`inicializarCola`, `acolar`, `desacolar`, `primero`, `colaVacia`), implementación LD con punteros primero/último. Costo O(1). Commit: `Add Cola topic page`.

- [ ] **Task 11 — `temas/cola-prioridad.html`** (`data-tema="cola-prioridad"`): basada en `ColaPrioridadTDA` y `ColaPrioridadLD` reales (interfaz `acolarPrioridad`, `desacolar`, `primero`, `prioridad`, `colaVacia`; LD ordenada, `acolarPrioridad` O(n) y el resto O(1); mencionar DA y AO). Código real de la carpeta. Commit: `Add Cola de Prioridad topic page`.

- [ ] **Task 12 — `temas/conjunto.html`** (`data-tema="conjunto"`): `ConjuntoTDA` (agregar, sacar, pertenece, conjuntoVacio, elegir, etc.), implementación por arreglo (AR) y por lista (LD). Operaciones de conjunto. Costo. Commit: `Add Conjunto topic page`.

- [ ] **Task 13 — `temas/diccionario-simple.html`** (`data-tema="diccionario-simple"`): `DiccionarioSimpleTDA` (agregar clave/valor, eliminar, recuperar, claves), implementación A y LD. Costo. Commit: `Add Diccionario Simple topic page`.

- [ ] **Task 14 — `temas/diccionario-multiple.html`** (`data-tema="diccionario-multiple"`): `DiccionarioMultipleTDA` (una clave → conjunto de valores), implementación con nodos clave/valor (real de la carpeta). Costo. Commit: `Add Diccionario Múltiple topic page`.

- [ ] **Task 15 — `temas/arboles.html`** (`data-tema="arboles"`): árbol binario (nodo izq/der), recorridos preorden/inorden/postorden, ABB (búsqueda/inserción O(log n) promedio), noción de AVL (balanceo). Errores: olvidar caso nodo nulo. Commit: `Add Árboles topic page`.

- [ ] **Task 16 — `temas/grafos.html`** (`data-tema="grafos"`): basado en `GrafoTDA`/`GrafoMA` reales (vértices, aristas con peso, matriz de adyacencia; mencionar lista de adyacencia), recorridos DFS/BFS, noción de camino. Costo según representación. Commit: `Add Grafos topic page`.

---

### Task 17: Verificación offline completa

- [ ] **Step 1:** Con Playwright MCP, navegar `file://` a `index.html` y a las 12 páginas; confirmar en cada una: header+sidebar presentes, tema activo correcto, al menos un `span.tok-kw`, sin errores en consola (`browser_console_messages` vacío de errores), y `browser_network_requests` sin requests externas (todo offline).
- [ ] **Step 2:** En index, marcar 2 temas como leídos, recargar, y verificar que la barra de progreso refleja 2/12 (persistencia global).
- [ ] **Step 3:** Revisar viewport angosto (820px): el menú se colapsa y la hamburguesa lo abre.
- [ ] **Step 4: Commit** (si hubo arreglos) `Fix issues found during offline verification`.

---

### Task 18: Publicar en GitHub Pages (cuenta FrancoMal)

- [ ] **Step 1: Inicializar git y primer commit** (si aún no se hizo por tarea). Verificar identidad:
```bash
git init -b main
git config user.name "Franco Tomas Malfetano"
git config user.email "franmalfe@gmail.com"
```
- [ ] **Step 2: `.gitignore`** para no subir la carpeta de ejemplos compilados ni binarios:
```
ejemplos codigo/
*.class
bin/
```
(Decisión: el repo de la guía publica solo la guía; el código de ejemplo queda local. Confirmar con el usuario si quiere incluir `ejemplos codigo/` también.)
- [ ] **Step 3: Crear repo y push** con `gh` (público para Pages gratis):
```bash
gh repo create guia-progra2 --public --source=. --remote=origin --description "Guía de estudio interactiva de Programación 2 (Java/TDAs)" --push
```
- [ ] **Step 4: Habilitar GitHub Pages** desde la rama `main`, carpeta raíz:
```bash
gh api -X POST repos/FrancoMal/guia-progra2/pages -f "source[branch]=main" -f "source[path]=/"
```
- [ ] **Step 5:** Esperar el build y obtener la URL:
```bash
gh api repos/FrancoMal/guia-progra2/pages --jq .html_url
```

---

### Task 19: Verificar el sitio publicado

- [ ] **Step 1:** Con Playwright MCP (o `gh api`), abrir la URL de Pages (`https://francomal.github.io/guia-progra2/`) y confirmar que la portada carga, el sidebar funciona y una página de tema se ve resaltada. (Pages puede tardar 1–2 min en estar disponible.)
- [ ] **Step 2:** Reportar la URL final al usuario.

---

## Self-Review

**Cobertura del spec:** §3 arquitectura → Tasks 1–4; §4 shell → Task 3; §5 anatomía de tema → Task 5 + 6–16; §6 temas → Tasks 5–16 (12/12); §7 visual → Task 2; §8 actividades (diferidas) → contenedor "Próximamente" en cada página; §9 verificación → Tasks 17/19; §10 deploy → Task 18. Sin huecos.

**Placeholder scan:** el único "Próximamente" es contenido intencional del producto (Fase 2), no un placeholder del plan. El código de foundation está completo. Las páginas 6–16 tienen lista de secciones + fuente + definición de hecho (accionable, no vago).

**Consistencia de tipos/nombres:** `BLOQUES`/`TEMAS`, claves `localStorage` `progra2:progreso`/`progra2:tema`, clases CSS (`#sidebar`, `.nav-bloque`, `.activo`, `.leido`, `#toggle-tema`, `#marcar`, `#portada`, `pre code.java`, `.tok-*`) y `body[data-tema]` coinciden entre Tasks 2, 3, 4 y 5.
