/* Simulacro de Parcial (cátedra Monzón). Se monta en #simulacro (solo existe en
   temas/simulacro-parcial.html). IIFE sin dependencias, 100% offline.
   - Selector de variante por legajo: P = legajo mod 3 -> variante A/B/C del Ejercicio 1.
   - Tres ejercicios con peso visible y solución modelo desplegable.
   - Cronómetro de cuenta regresiva (3 hs) con Iniciar/Pausar.
   Usa las clases ya existentes en styles.css: .sim-meta, .sim-timer, .sim-rubrica,
   .sim-ej, .sim-peso, .sim-solucion, .sim-variante (con .btn.activo). */
(function () {
  const mount = document.getElementById('simulacro');
  if (!mount) return;

  // -------------------------------------------------------------------------
  // Helpers: escapado de HTML y construcción de bloques de código Java.
  // window.resaltarJava() (definido en app.js) tokeniza los <code class="java">.
  // -------------------------------------------------------------------------
  const esc = s => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Bloque de código: el resaltador lee textContent crudo, así que NO escapamos acá;
  // dejamos el fuente tal cual y resaltarJava() se encarga de escapar < > &.
  const code = src => '<pre><code class="java">' + esc(src) + '</code></pre>';

  // -------------------------------------------------------------------------
  // Ejercicio 1: TDA modificado. Tres variantes según P = legajo mod 3.
  //   P=0 (A) -> PairStack: pila que apila/desapila de a pares.
  //   P=1 (B) -> MaximumRestrictedStack: pila con tope acotado por un máximo.
  //   P=2 (C) -> CountingQueue: cola que recuerda cuántas veces se acoló cada valor.
  // -------------------------------------------------------------------------
  const VARIANTES_EJ1 = [
    {
      letra: 'A', clave: 'PairStack',
      titulo: 'TDA PairStack (pila de pares)',
      consigna:
        'Cree el TDA <strong>PairStack</strong>, una pila que trabaja de a <strong>pares</strong>. ' +
        'En vez de apilar/desapilar de a uno, <code>add(a, b)</code> apila el par (a, b) y ' +
        '<code>remove()</code> quita el par del tope. <code>getTop()</code> devuelve el par del tope ' +
        '(podés devolver un arreglo <code>int[]</code> de dos posiciones). ' +
        '<strong>A.</strong> Escribí la interfaz con sus pre/postcondiciones. ' +
        '<strong>B.</strong> Dá una implementación <strong>estática</strong> (con arreglo). ' +
        '<strong>C.</strong> Calculá el costo de <code>add</code> y de <code>remove</code>.',
      solucion:
        '<p>La idea es la misma pila LIFO, pero cada operación toca <strong>dos</strong> celdas. ' +
        'Con un arreglo y un entero <code>count</code> (cantidad de elementos sueltos, siempre par), ' +
        'el tope lógico ocupa <code>array[count-2]</code> y <code>array[count-1]</code>.</p>' +
        code(
'public interface PairStack {\n' +
'    // Precondicion: la estructura debe estar inicializada (el constructor lo hace).\n' +
'\n' +
'    // Postcondicion: apila el par (a, b) por encima del tope actual.\n' +
'    void add(int a, int b);\n' +
'\n' +
'    // Precondicion: la pila NO esta vacia. Postcondicion: quita el par del tope.\n' +
'    void remove();\n' +
'\n' +
'    // Precondicion: la pila NO esta vacia. Devuelve el par del tope: {a, b}.\n' +
'    int[] getTop();\n' +
'\n' +
'    // true si no hay ningun par apilado.\n' +
'    boolean isEmpty();\n' +
'}') +
        code(
'public class StaticPairStack implements PairStack {\n' +
'    private static final int MAX = 10000;\n' +
'    private final int[] array = new int[MAX];\n' +
'    private int count = 0;            // cantidad de enteros guardados (siempre par)\n' +
'\n' +
'    public void add(int a, int b) {\n' +
'        array[count]     = a;\n' +
'        array[count + 1] = b;\n' +
'        count += 2;                  // un par ocupa dos celdas\n' +
'    }\n' +
'\n' +
'    public void remove() {           // pre: !isEmpty()\n' +
'        count -= 2;                  // basta retroceler el tope dos posiciones\n' +
'    }\n' +
'\n' +
'    public int[] getTop() {          // pre: !isEmpty()\n' +
'        return new int[] { array[count - 2], array[count - 1] };\n' +
'    }\n' +
'\n' +
'    public boolean isEmpty() {\n' +
'        return count == 0;\n' +
'    }\n' +
'}') +
        '<p><strong>Costo (C):</strong> tanto <code>add</code> como <code>remove</code> hacen un número ' +
        '<em>fijo</em> de asignaciones (no hay ciclos), así que ambos son <strong>O(1)</strong>. ' +
        'Como en la pila común, trabajar siempre sobre un extremo es lo que da el costo constante.</p>'
    },
    {
      letra: 'B', clave: 'MaximumRestrictedStack',
      titulo: 'TDA MaximumRestrictedStack (pila acotada)',
      consigna:
        'Cree el TDA <strong>MaximumRestrictedStack</strong>, una pila igual a <code>Stack</code> ' +
        'salvo que tiene un <strong>tope máximo</strong> <code>M</code> (un valor, no una capacidad): ' +
        'solo se puede apilar un valor <code>x</code> si <code>x &lt;= M</code>. ' +
        'El máximo <code>M</code> es una característica de la estructura, así que va como ' +
        '<strong>parámetro del constructor</strong>. ' +
        '<strong>A.</strong> Interfaz con pre/postcondiciones. ' +
        '<strong>B.</strong> Implementación <strong>estática</strong>. ' +
        '<strong>C.</strong> Costo del método que apila.',
      solucion:
        '<p>La restricción solo afecta a <code>add</code>: si <code>x &gt; M</code> es una violación de ' +
        'precondición y lanzamos una excepción. El resto es una pila LIFO normal.</p>' +
        code(
'public interface MaximumRestrictedStack {\n' +
'    // Precondicion general: la estructura debe estar inicializada.\n' +
'\n' +
'    // Precondicion: x <= getMax(). Postcondicion: apila x en el tope.\n' +
'    void add(int x);\n' +
'\n' +
'    // Precondicion: la pila NO esta vacia. Postcondicion: quita el tope.\n' +
'    void remove();\n' +
'\n' +
'    // Precondicion: la pila NO esta vacia. Devuelve el valor del tope.\n' +
'    int getTop();\n' +
'\n' +
'    boolean isEmpty();\n' +
'\n' +
'    int getMax();                    // el maximo M permitido\n' +
'}') +
        code(
'public class StaticMaxStack implements MaximumRestrictedStack {\n' +
'    private static final int CAP = 10000;\n' +
'    private final int[] array = new int[CAP];\n' +
'    private final int max;           // M: maximo valor apilable\n' +
'    private int top = 0;             // cantidad de elementos\n' +
'\n' +
'    public StaticMaxStack(int max) { // M va en el constructor\n' +
'        this.max = max;\n' +
'    }\n' +
'\n' +
'    public void add(int x) {\n' +
'        if (x > max) {               // violacion de precondicion\n' +
'            throw new RuntimeException("El valor supera el maximo M");\n' +
'        }\n' +
'        array[top++] = x;\n' +
'    }\n' +
'\n' +
'    public void remove()  { top--; }            // pre: !isEmpty()\n' +
'    public int getTop()   { return array[top - 1]; } // pre: !isEmpty()\n' +
'    public boolean isEmpty() { return top == 0; }\n' +
'    public int getMax()   { return max; }\n' +
'}') +
        '<p><strong>Costo (C):</strong> pensando el <code>if</code> como si tuviera <code>else</code>, ' +
        'nos quedamos con la peor rama: lanzar la excepción es O(1) y el cuerpo normal ' +
        '(<code>array[top++] = x</code>) también. Sumar la condición (constante) no cambia la familia. ' +
        'Por lo tanto <code>add</code> es <strong>O(1)</strong>.</p>'
    },
    {
      letra: 'C', clave: 'CountingQueue',
      titulo: 'TDA CountingQueue (cola con conteo)',
      consigna:
        'Cree el TDA <strong>CountingQueue</strong>, una cola igual a <code>Queue</code> pero donde ' +
        '<code>add(a, n)</code> acola el valor <code>a</code> <strong>n veces</strong> de una sola ' +
        'llamada, y <code>remove(n)</code> desacola los primeros <code>n</code> elementos. Debe lanzar ' +
        'error si no se puede desacolar (no hay <code>n</code> elementos). ' +
        '<strong>A.</strong> Interfaz con pre/postcondiciones. ' +
        '<strong>B.</strong> Implementación <strong>estática</strong>. ' +
        '<strong>C.</strong> Costo de <code>add</code> y de <code>remove</code>.',
      solucion:
        '<p>Es la <em>VariableQueue</em> clásica de los parciales: una cola FIFO normal donde acolar y ' +
        'desacolar reciben una cantidad. Acá uso un arreglo con <code>count</code> elementos; al ' +
        'desacolar corro todo a la izquierda.</p>' +
        code(
'public interface CountingQueue {\n' +
'    // Precondicion general: la estructura debe estar inicializada.\n' +
'\n' +
'    // Postcondicion: acola el valor a, n veces, al final de la cola. (pre: n >= 1)\n' +
'    void add(int a, int n);\n' +
'\n' +
'    // Precondicion: la cola tiene al menos n elementos.\n' +
'    // Postcondicion: quita los primeros n elementos.\n' +
'    void remove(int n);\n' +
'\n' +
'    // Precondicion: la cola NO esta vacia. Devuelve el primero (frente).\n' +
'    int getFirst();\n' +
'\n' +
'    boolean isEmpty();\n' +
'}') +
        code(
'public class StaticCountingQueue implements CountingQueue {\n' +
'    private static final int MAX = 10000;\n' +
'    private final int[] array = new int[MAX];\n' +
'    private int count = 0;\n' +
'\n' +
'    public void add(int a, int n) {\n' +
'        for (int i = 0; i < n; i++) {\n' +
'            array[count++] = a;      // se acola al final, n veces\n' +
'        }\n' +
'    }\n' +
'\n' +
'    public void remove(int n) {\n' +
'        if (n < 1 || count < n) {    // no se puede desacolar\n' +
'            throw new RuntimeException("No hay n elementos para desacolar");\n' +
'        }\n' +
'        for (int k = 0; k < n; k++) {            // desacolo n veces\n' +
'            for (int i = 0; i < count - 1; i++) {// corro todo un lugar a la izquierda\n' +
'                array[i] = array[i + 1];\n' +
'            }\n' +
'            count--;\n' +
'        }\n' +
'    }\n' +
'\n' +
'    public int getFirst() { return array[0]; }   // pre: !isEmpty()\n' +
'    public boolean isEmpty() { return count == 0; }\n' +
'}') +
        '<p><strong>Costo (C):</strong> <code>add</code> repite <code>n</code> veces una operación O(1), ' +
        'así que es <strong>O(n)</strong>. <code>remove</code> tiene dos ciclos anidados (corre el ' +
        'arreglo entero por cada uno de los <code>n</code> elementos a sacar): es ' +
        '<strong>O(n · count)</strong>, es decir cuadrático en el peor caso.</p>'
    }
  ];

  // -------------------------------------------------------------------------
  // Ejercicio 2: utilización combinando Pila + Cola + Diccionario. (Fijo)
  // -------------------------------------------------------------------------
  const EJ2 = {
    titulo: 'Ejercicio 2 — Utilización de TDAs',
    peso: '40%',
    consigna:
      'Desarrollá un método <code>static</code> que reciba una <strong>Pila</strong> y una ' +
      '<strong>Cola</strong> de enteros y devuelva un <strong>Diccionario simple</strong> que, para ' +
      'cada valor que aparezca <strong>en ambas</strong> estructuras, asocie a ese valor la cantidad ' +
      'de veces que figura en la pila. Las estructuras recibidas <strong>no deben quedar ' +
      'destruidas</strong>.',
    solucion:
      '<p>Combinamos tres TDAs. Como la pila y la cola son <strong>destructivas</strong>, primero las ' +
      '<strong>copiamos</strong>. Recorremos la cola para saber qué valores existen ahí (los marcamos ' +
      'en un diccionario auxiliar <code>enCola</code>), y luego recorremos la copia de la pila contando ' +
      'apariciones; solo dejamos en el resultado los valores que también estaban en la cola.</p>' +
      code(
'// pre: pila y cola inicializadas. No se modifican (se trabaja sobre copias).\n' +
'static Dictionary contarComunes(Stack pila, Queue cola) {\n' +
'    Stack p = copy(pila);            // copia para no destruir la entrada\n' +
'    Queue c = copy(cola);\n' +
'\n' +
'    // 1) Marco en un diccionario que valores aparecen en la cola.\n' +
'    Dictionary enCola = new Dictionary();\n' +
'    while (!c.isEmpty()) {\n' +
'        enCola.add(c.getFirst(), 1); // el valor asociado no importa, solo la clave\n' +
'        c.remove();\n' +
'    }\n' +
'\n' +
'    // 2) Cuento apariciones en la pila SOLO de los que estan en la cola.\n' +
'    Dictionary resultado = new Dictionary();\n' +
'    while (!p.isEmpty()) {\n' +
'        int x = p.getTop();\n' +
'        p.remove();\n' +
'        if (contiene(enCola, x)) {              // x esta en ambas\n' +
'            int previo = contiene(resultado, x) ? resultado.getValue(x) : 0;\n' +
'            resultado.remove(x, previo);        // saco el conteo viejo...\n' +
'            resultado.add(x, previo + 1);       // ...y guardo el nuevo\n' +
'        }\n' +
'    }\n' +
'    return resultado;\n' +
'}\n' +
'\n' +
'// helper: true si la clave k existe en el diccionario d (sin destruirlo).\n' +
'static boolean contiene(Dictionary d, int k) {\n' +
'    Set claves = d.getKeys();\n' +
'    while (!claves.isEmpty()) {\n' +
'        if (claves.choose() == k) return true;\n' +
'        claves.remove(claves.choose());\n' +
'    }\n' +
'    return false;\n' +
'}') +
      '<div class="callout tip"><span class="et">💡 Lo que se evalúa acá</span> ' +
      'Reconocer que la pila y la cola son <strong>destructivas</strong> y copiarlas; usar el ' +
      'diccionario como índice de pertenencia; y combinar los tres TDAs respetando sus operaciones ' +
      '(<code>getTop/remove</code>, <code>getFirst/remove</code>, <code>add/getValue/getKeys</code>).</div>'
  };

  // -------------------------------------------------------------------------
  // Ejercicio 3: teoría + dibujar/clasificar un árbol. (Fijo)
  // -------------------------------------------------------------------------
  const EJ3 = {
    titulo: 'Ejercicio 3 — Teoría + árbol',
    peso: '20%',
    consigna:
      '<strong>A.</strong> Explicá con tus palabras la diferencia de complejidad entre buscar un valor ' +
      'en un <strong>árbol binario cualquiera</strong> y en un <strong>ABB</strong>. ¿Qué garantiza el ' +
      '<strong>AVL</strong>? ' +
      '<strong>B.</strong> Insertá en un <strong>AVL</strong> vacío, en este orden, los valores ' +
      '<code>10, 20, 30, 25, 5, 3</code>. Dibujá el árbol resultante e indicá qué rotaciones se ' +
      'aplicaron y dónde.',
    solucion:
      '<p><strong>A.</strong> En un árbol binario sin propiedad de orden hay que <strong>recorrer ' +
      'todos los nodos</strong> en el peor caso para encontrar (o descartar) un valor: la búsqueda es ' +
      '<strong>O(n)</strong>. En un <strong>ABB</strong>, la propiedad de orden (izquierda menores, ' +
      'derecha mayores) permite <strong>descartar la mitad</strong> en cada paso, así que baja a ' +
      '<strong>O(log n)</strong>… pero solo si el árbol está <strong>balanceado</strong>: si los datos ' +
      'entran ordenados, degenera en una lista y vuelve a O(n). El <strong>AVL</strong> es un ABB que se ' +
      'rebalancea con rotaciones tras cada inserción/borrado, <strong>garantizando O(log n) siempre</strong>.</p>' +
      '<p><strong>B.</strong> Traza de las inserciones:</p>' +
      '<ul>' +
      '<li><code>10, 20, 30</code>: al insertar <code>30</code>, la raíz <code>10</code> queda con ' +
      '<code>FE = +2</code> y su hijo <code>20</code> con <code>FE = +1</code> (mismo signo) → ' +
      '<strong>rotación simple RR</strong>. Sube <code>20</code> a la raíz: <code>20</code> con hijos ' +
      '<code>10</code> (izq) y <code>30</code> (der).</li>' +
      '<li><code>25</code>: va a la izquierda de <code>30</code>. Sigue balanceado.</li>' +
      '<li><code>5</code>: va a la izquierda de <code>10</code>. Sigue balanceado.</li>' +
      '<li><code>3</code>: va a la izquierda de <code>5</code>. El nodo <code>10</code> queda con ' +
      '<code>FE = -2</code> y su hijo <code>5</code> con <code>FE = -1</code> (mismo signo) → ' +
      '<strong>rotación simple LL</strong> sobre <code>10</code>: sube <code>5</code>, con hijos ' +
      '<code>3</code> (izq) y <code>10</code> (der).</li>' +
      '</ul>' +
      '<div class="diagrama" aria-hidden="true">' +
        '<span class="nodo">raíz: 20</span><span class="flecha">→</span>' +
        '<span class="nodo">izq: 5 (3, 10)</span><span class="flecha">→</span>' +
        '<span class="nodo">der: 30 (25, –)</span>' +
      '</div>' +
      '<p>Inorden del árbol final: <code>3 5 10 20 25 30</code> (ordenado, como debe dar todo ABB/AVL). ' +
      'Altura final 2, con dos rotaciones simples en total.</p>'
  };

  // -------------------------------------------------------------------------
  // Render de un ejercicio (sin variante): titulo + peso + consigna + solución.
  // -------------------------------------------------------------------------
  function bloqueEjercicio(ej) {
    return '<section class="sim-ej">' +
      '<span class="sim-peso">' + ej.peso + '</span>' +
      '<h3>' + ej.titulo + '</h3>' +
      '<p>' + ej.consigna + '</p>' +
      '<details class="sim-solucion"><summary>Ver solución modelo</summary>' +
        ej.solucion +
      '</details>' +
    '</section>';
  }

  // Render del Ejercicio 1 según la variante elegida.
  function bloqueEj1(v) {
    return '<section class="sim-ej">' +
      '<span class="sim-peso">40%</span>' +
      '<h3>Ejercicio 1 — Variante ' + v.letra + ': ' + v.titulo + '</h3>' +
      '<p>' + v.consigna + '</p>' +
      '<details class="sim-solucion"><summary>Ver solución modelo</summary>' +
        v.solucion +
      '</details>' +
    '</section>';
  }

  // -------------------------------------------------------------------------
  // Estado y armado del DOM.
  // -------------------------------------------------------------------------
  let variante = 0;          // índice 0/1/2 = P
  let verTodas = false;      // mostrar las tres variantes del Ej1

  mount.innerHTML =
    // Barra de metadatos: rúbrica + cronómetro.
    '<div class="sim-meta">' +
      '<span class="sim-rubrica">Rúbrica: Ej1 40 / Ej2 40 / Ej3 20 — se aprueba con 60</span>' +
      '<span class="sim-timer" data-timer>03:00:00</span>' +
      '<button class="btn" data-iniciar>▶ Iniciar</button>' +
      '<button class="btn" data-reset>↺ Reiniciar</button>' +
    '</div>' +
    // Selector de variante por legajo.
    '<div class="sim-variante">' +
      '<label for="sim-legajo"><strong>Tu legajo (LU):</strong></label> ' +
      '<input class="lab-input" id="sim-legajo" type="number" inputmode="numeric" ' +
        'placeholder="ej. 1098765" aria-label="Legajo o suma de legajos">' +
      '<button class="btn" data-calc>Calcular variante</button>' +
      '<button class="btn" data-todas>Ver las 3 variantes</button>' +
    '</div>' +
    '<p class="sim-pred" data-pred><em>Ingresá tu legajo: P = legajo mód 3 te asigna la variante ' +
      '(0 → A, 1 → B, 2 → C). Mostrando la variante A por defecto.</em></p>' +
    '<div data-ej1></div>' +
    bloqueEjercicio(EJ2) +
    bloqueEjercicio(EJ3);

  const elTimer   = mount.querySelector('[data-timer]');
  const btnIniciar = mount.querySelector('[data-iniciar]');
  const btnReset  = mount.querySelector('[data-reset]');
  const inLegajo  = mount.querySelector('#sim-legajo');
  const btnCalc   = mount.querySelector('[data-calc]');
  const btnTodas  = mount.querySelector('[data-todas]');
  const elPred    = mount.querySelector('[data-pred]');
  const contEj1   = mount.querySelector('[data-ej1]');

  // ---- Render del Ejercicio 1 (una variante o las tres) ----
  function pintarEj1() {
    if (verTodas) {
      contEj1.innerHTML =
        '<p class="sim-pred"><em>Mostrando las tres variantes del Ejercicio 1.</em></p>' +
        VARIANTES_EJ1.map(bloqueEj1).join('');
    } else {
      contEj1.innerHTML = bloqueEj1(VARIANTES_EJ1[variante]);
    }
    if (window.resaltarJava) window.resaltarJava();   // resalta el Java recién insertado
  }

  // ---- Selector de variante ----
  btnCalc.addEventListener('click', function () {
    const n = parseInt(inLegajo.value, 10);
    if (isNaN(n)) {
      elPred.innerHTML = '<em>Ingresá un número de legajo válido.</em>';
      return;
    }
    const p = ((n % 3) + 3) % 3;     // módulo siempre positivo
    variante = p;
    verTodas = false;
    btnTodas.classList.remove('activo');
    const letra = VARIANTES_EJ1[p].letra;
    elPred.innerHTML = 'P = ' + n + ' mód 3 = <strong>' + p + '</strong> → te toca la ' +
      '<strong>variante ' + letra + '</strong> del Ejercicio 1.';
    pintarEj1();
  });

  btnTodas.addEventListener('click', function () {
    verTodas = !verTodas;
    btnTodas.classList.toggle('activo', verTodas);
    if (verTodas) {
      elPred.innerHTML = '<em>Comparando las tres variantes posibles del Ejercicio 1.</em>';
    } else {
      elPred.innerHTML = 'Mostrando la <strong>variante ' + VARIANTES_EJ1[variante].letra +
        '</strong> del Ejercicio 1.';
    }
    pintarEj1();
  });

  // -------------------------------------------------------------------------
  // Cronómetro de cuenta regresiva: 3 horas.
  // -------------------------------------------------------------------------
  const TOTAL = 3 * 60 * 60;         // 10800 segundos
  let restante = TOTAL;
  let corriendo = false;
  let tick = null;

  function fmt(s) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const dd = x => (x < 10 ? '0' + x : '' + x);
    return dd(h) + ':' + dd(m) + ':' + dd(sec);
  }
  function pintarTimer() {
    elTimer.textContent = fmt(restante);
    // Aviso visual en los últimos 5 minutos.
    elTimer.style.color = restante <= 300 ? 'var(--danger, #b1421d)' : '';
  }
  function pausar() {
    corriendo = false;
    if (tick) { clearInterval(tick); tick = null; }
    btnIniciar.textContent = '▶ Iniciar';
  }
  function arrancar() {
    if (corriendo || restante <= 0) return;
    corriendo = true;
    btnIniciar.textContent = '⏸ Pausar';
    tick = setInterval(function () {
      restante--;
      if (restante <= 0) {
        restante = 0;
        pintarTimer();
        pausar();
        elTimer.textContent = '00:00:00 ¡Tiempo!';
        return;
      }
      pintarTimer();
    }, 1000);
  }

  btnIniciar.addEventListener('click', function () {
    if (corriendo) pausar(); else arrancar();
  });
  btnReset.addEventListener('click', function () {
    pausar();
    restante = TOTAL;
    pintarTimer();
  });

  // ---- Arranque ----
  pintarTimer();
  pintarEj1();
})();
