/* Actividades de práctica — Árbol B (Unidad VI).
   El código va como string normal (template literals): NO hace falta escapar < > &.
   Las explicaciones NO mencionan la posición de las opciones (se barajan). */
window.ACTIVIDADES = [
  // ---------------- QUIZ (definición y orden) ----------------
  {
    tipo: 'quiz',
    enunciado: 'En un árbol B de orden q = 2t + 1, ¿cuántas claves puede guardar como MÁXIMO cada nodo?',
    opciones: ['2t claves', 't claves', '2t + 1 claves', 't + 1 claves'],
    correcta: 0,
    explicacion: 'El orden q = 2t + 1 es el máximo de hijos. Como un nodo con k claves tiene k + 1 hijos, el máximo de claves es q − 1 = 2t. El mínimo (salvo la raíz) es t.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Por qué los árboles B se usan para datos en disco (bases de datos, índices) en vez de un AVL?',
    opciones: ['Porque al meter muchas claves por nodo, la altura es mínima y se hacen poquísimos accesos a disco',
               'Porque el AVL no permite valores repetidos y el árbol B sí',
               'Porque el árbol B no necesita estar balanceado',
               'Porque comparar claves dentro de un nodo es más caro que un acceso a disco'],
    correcta: 0,
    explicacion: 'Lo caro es cada acceso a disco, no comparar claves en memoria. El árbol B mete muchas claves por nodo, así que su altura log_t n es de 3 o 4 niveles: muy pocos accesos. El AVL, con un valor por nodo, tiene altura log2 n y obliga a muchos más accesos.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Un invariante del árbol B dice que TODAS las hojas están al mismo nivel. ¿Cómo se logra eso?',
    opciones: ['Porque el árbol crece y decrece por la RAÍZ, no por las hojas',
               'Porque al insertar siempre se rota como en un AVL',
               'Porque las hojas se reordenan después de cada operación',
               'Porque solo se permite insertar valores ordenados'],
    correcta: 0,
    explicacion: 'A diferencia del ABB (que crece por las hojas), el árbol B aumenta su altura partiendo la raíz y la disminuye fusionando hacia la raíz. Como toda la rama crece o se acorta desde arriba, las hojas se mantienen siempre al mismo nivel: el árbol queda balanceado por construcción.'
  },

  // ---------------- QUIZ (¿cambia la altura tras insertar?) ----------------
  {
    tipo: 'quiz',
    enunciado: 'Árbol B con t = 2 (entre 2 y 4 claves por nodo). Insertás una clave en una hoja que tiene 2 claves. ¿Cambia la altura del árbol?',
    codigo:
`hoja antes:  [ 10 · 30 ]      // 2 claves, hay lugar
insertar(20)
hoja después: [ 10 · 20 · 30 ] // 3 claves, sigue ok`,
    opciones: ['No, la altura no cambia: la hoja tenía lugar y no hubo división',
               'Sí, la altura aumenta en 1 con cada inserción',
               'Sí, la altura disminuye en 1',
               'Depende del valor que se inserte'],
    correcta: 0,
    explicacion: 'Con t = 2 el máximo es 4 claves. La hoja pasa de 2 a 3 claves: no se pasa de 4, así que no hay overflow ni división. La altura solo cambia cuando una división se propaga hasta partir la raíz, y acá eso no pasó.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Árbol B de un solo nodo (la raíz, que también es hoja) con t = 2 y ya tiene 4 claves (lleno). Insertás una 5ª clave. ¿Cambia la altura?',
    codigo:
`raíz (única, hoja): [ 50 · 60 · 65 · 70 ]   // llena (4 = 2t)
insertar(52)  -> overflow: [ 50 · 52 · 60 · 65 · 70 ]`,
    opciones: ['Sí, la altura aumenta en 1: la raíz se divide y la clave del medio crea una raíz nueva',
               'No, la altura no cambia: simplemente entra la 5ª clave',
               'No, porque la raíz puede tener cualquier cantidad de claves',
               'Sí, pero la altura DISMINUYE en 1'],
    correcta: 0,
    explicacion: 'La raíz está llena (4 claves) y al insertar la 5ª entra en overflow. Como no tiene padre, su clave del medio sube a un nodo nuevo que se crea como nueva raíz, con los dos pedazos como hijos. El árbol crece hacia la raíz: la altura aumenta en 1.'
  },

  // ---------------- TRAZAR (inserción con división) ----------------
  {
    tipo: 'trazar',
    enunciado: 'Árbol B con t = 2 (máximo 4 claves). Una hoja LLENA recibe una clave más y entra en overflow. ¿Qué clave SUBE al padre al dividir?',
    codigo:
`hoja llena:  [ 50 · 60 · 65 · 70 ]
insertar(52)
overflow:    [ 50 · 52 · 60 · 65 · 70 ]   // 5 claves`,
    opciones: ['El 60 (la clave del medio)', 'El 50 (la menor)', 'El 70 (la mayor)', 'El 52 (la recién insertada)'],
    correcta: 0,
    explicacion: 'Al dividir, sube la clave del MEDIO. De las 5 claves [50, 52, 60, 65, 70], la del medio es el 60. El nodo se parte en [50, 52] y [65, 70], que pasan a ser los hijos izquierdo y derecho del 60 en el padre.'
  },

  // ---------------- QUIZ (¿cambia la altura tras fusionar?) ----------------
  {
    tipo: 'quiz',
    enunciado: 'Eliminás una clave y un nodo queda en underflow (menos de t). La reparación se propaga hacia arriba fusionando, hasta que la RAÍZ se queda sin claves. ¿Cambia la altura?',
    opciones: ['Sí, la altura DISMINUYE en 1: la raíz vacía se elimina y su único hijo pasa a ser la nueva raíz',
               'No, la altura nunca cambia al eliminar',
               'Sí, la altura AUMENTA en 1',
               'No, porque la raíz puede quedar vacía sin problema'],
    correcta: 0,
    explicacion: 'Cuando la fusión se propaga hasta vaciar la raíz (su última clave bajó en la fusión), esa raíz vacía se elimina y su único hijo pasa a ser la nueva raíz. El árbol se acorta desde la raíz: la altura decrece en 1. Es el único caso en que eliminar cambia la altura.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Eliminás una clave de una hoja que tenía 3 claves, con t = 2 (mínimo 2). Tras borrar, la hoja queda con 2 claves. ¿Hay que pedir prestado o fusionar?',
    codigo:
`hoja antes:  [ 10 · 20 · 30 ]   // 3 claves
eliminar(20)
hoja después: [ 10 · 30 ]        // 2 claves`,
    opciones: ['No hace falta nada: 2 es el mínimo permitido, no hay underflow',
               'Hay que pedir prestado a un hermano sí o sí',
               'Hay que fusionar con un hermano sí o sí',
               'Hay que dividir la hoja'],
    correcta: 0,
    explicacion: 'Con t = 2 el mínimo es 2 claves. La hoja queda justo con 2: cumple el invariante, no hay underflow. No se toca nada. El préstamo o la fusión solo aparecen cuando la hoja cae por DEBAJO de t.'
  },

  // ---------------- COSTO ----------------
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo total de buscar un valor en un árbol B (orden q = 2t + 1, n claves)?',
    codigo:
`// En cada nodo: búsqueda lineal entre sus claves -> O(t)
// Cantidad de niveles (altura) -> O(log_t n)
buscar(raiz, x);`,
    opciones: ['O(t · log_t n)', 'O(log2 n)', 'O(n)', 'O(t · n)'],
    correcta: 0,
    explicacion: 'La altura del árbol B es O(log_t n) (un nodo por nivel). Dentro de cada nodo la búsqueda lineal entre las claves cuesta O(t). Multiplicando: O(t · log_t n). En disco lo que pesa es la altura (los accesos), no el factor t que ocurre en memoria.'
  },

  // ---------------- MAPEAR (vocabulario del árbol B) ----------------
  {
    tipo: 'mapear',
    enunciado: 'Relacioná cada concepto del árbol B con su significado.',
    pares: [
      ['overflow (más de 2t claves)', 'el nodo se DIVIDE y la clave del medio sube'],
      ['underflow (menos de t claves)', 'préstamo de un hermano, o fusión'],
      ['crece la altura', 'una división llega a partir la raíz'],
      ['decrece la altura', 'una fusión vacía la raíz'],
      ['orden q = 2t + 1', 'máximo de hijos por nodo']
    ],
    explicacion: 'Overflow (pasarse de 2t) se repara dividiendo: la clave del medio sube al padre. Underflow (quedar por debajo de t) se repara con préstamo de un hermano o, si nadie puede dar, con fusión. La altura solo crece cuando una división parte la raíz, y solo decrece cuando una fusión la vacía. El orden q = 2t + 1 es el máximo de referencias a hijos.'
  }
];
