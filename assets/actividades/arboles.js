/* Actividades de práctica — Árboles (Binario, ABB, AVL). Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  // ---------------- QUIZ (definiciones y propiedades) ----------------
  {
    tipo: 'quiz',
    enunciado: '¿Qué propiedad de orden cumple un ABB (Árbol Binario de Búsqueda)?',
    opciones: ['Para cada nodo, los menores van a la izquierda y los mayores a la derecha',
               'Para cada nodo, los menores van a la derecha y los mayores a la izquierda',
               'Los hijos se ubican en cualquier lado mientras el árbol esté balanceado'],
    correcta: 0,
    explicacion: 'En un ABB, para cada nodo todo el subárbol izquierdo tiene valores menores y todo el derecho, mayores. Esa propiedad es la que permite buscar descartando una mitad en cada paso.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué recorrido de un ABB imprime los valores ordenados de menor a mayor?',
    opciones: ['Preorden (raíz, izquierda, derecha)',
               'Inorden (izquierda, raíz, derecha)',
               'Postorden (izquierda, derecha, raíz)'],
    correcta: 1,
    explicacion: 'El inorden visita primero todo el subárbol izquierdo (los menores), después la raíz y por último el derecho (los mayores). En un ABB eso da la secuencia ordenada.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Cuál es la definición de una hoja en un árbol binario?',
    opciones: ['El nodo de arriba de todo, el único sin padre',
               'Un nodo que tiene exactamente un hijo',
               'Un nodo sin hijos (izquierdo y derecho en null)',
               'Cualquier nodo que no sea la raíz'],
    correcta: 2,
    explicacion: 'Una hoja es un nodo sin hijos: tanto izq como der están en null. El nodo sin padre es la raíz, no la hoja.'
  },
  {
    tipo: 'quiz',
    enunciado: 'En este árbol, los valores se insertaron en un ABB. ¿Cuál es su altura (longitud del camino más largo desde la raíz hasta una hoja)?',
    codigo:
`        8
       / \\
      3   10
       \\
        6`,
    opciones: ['1', '2', '3', '4'],
    correcta: 1,
    explicacion: 'El camino más largo es 8 → 3 → 6, que tiene 2 aristas. La altura se mide en cantidad de aristas, así que es 2 (no se cuentan los nodos).'
  },
  {
    tipo: 'quiz',
    enunciado: 'Un árbol binario está vacío. ¿Cómo se representa eso en el código Java de la teoría?',
    opciones: ['Con un Nodo cuyo valor es 0',
               'Con la raíz en null',
               'Con un arreglo de tamaño 0',
               'No se puede representar un árbol vacío'],
    correcta: 1,
    explicacion: 'Un árbol vacío es null: la raíz en null significa "no hay nada". Por eso el caso base de casi toda recursión sobre árboles es "if (nodo == null)".'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Por qué un AVL aplica rotaciones después de insertar o borrar?',
    opciones: ['Para ordenar los valores de menor a mayor',
               'Para mantener el árbol balanceado y garantizar O(log n)',
               'Para eliminar los valores repetidos',
               'Para convertir el árbol en una lista'],
    correcta: 1,
    explicacion: 'El AVL se rebalancea con rotaciones para que las alturas de los subárboles no difieran en más de 1. Así mantiene la altura cercana a log n y garantiza O(log n) siempre, incluso en el peor caso.'
  },
  {
    tipo: 'quiz',
    enunciado: 'En un ABB, ¿dónde queda el valor MÍNIMO de todo el árbol?',
    opciones: ['En la raíz',
               'En la hoja más a la izquierda (bajando siempre por izq)',
               'En la hoja más a la derecha (bajando siempre por der)',
               'Siempre en una hoja, pero no se puede saber cuál'],
    correcta: 1,
    explicacion: 'Como los menores siempre van a la izquierda, el mínimo está al final del camino que baja siempre por nodo.izq. El máximo, en cambio, está bajando siempre por la derecha.'
  },

  // ---------------- TRAZAR (recorridos sobre un ABB construido) ----------------
  {
    tipo: 'trazar',
    enunciado: 'Se insertan en este orden los valores 5, 3, 8, 1 en un ABB vacío. ¿Qué imprime el recorrido inorden?',
    codigo:
`Nodo raiz = null;
raiz = insertar(raiz, 5);
raiz = insertar(raiz, 3);
raiz = insertar(raiz, 8);
raiz = insertar(raiz, 1);
inorden(raiz);`,
    opciones: ['5 3 8 1', '1 3 5 8', '1 3 8 5'],
    correcta: 1,
    explicacion: 'El árbol queda con raíz 5; el 3 va a la izquierda, el 8 a la derecha y el 1 a la izquierda del 3. El inorden (izq, raíz, der) recorre 1, 3, 5, 8: siempre ordenado en un ABB.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se insertan 5, 3, 8, 1, 4 en un ABB vacío. ¿Qué imprime el recorrido PREORDEN (raíz, izq, der)?',
    codigo:
`raiz = insertar(raiz, 5);
raiz = insertar(raiz, 3);
raiz = insertar(raiz, 8);
raiz = insertar(raiz, 1);
raiz = insertar(raiz, 4);
preorden(raiz);`,
    opciones: ['1 3 4 5 8', '5 3 1 4 8', '5 3 8 1 4', '1 4 3 8 5'],
    correcta: 1,
    explicacion: 'Árbol: raíz 5; a la izquierda 3 (con 1 a su izq y 4 a su der); a la derecha 8. El preorden visita raíz antes que los hijos: 5, después todo el subárbol izquierdo (3, 1, 4) y por último el derecho (8) → 5 3 1 4 8.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se insertan 5, 3, 8, 1, 4 en un ABB vacío. ¿Qué imprime el recorrido POSTORDEN (izq, der, raíz)?',
    codigo:
`raiz = insertar(raiz, 5);
raiz = insertar(raiz, 3);
raiz = insertar(raiz, 8);
raiz = insertar(raiz, 1);
raiz = insertar(raiz, 4);
postorden(raiz);`,
    opciones: ['5 3 1 4 8', '1 3 4 5 8', '1 4 3 8 5', '8 4 1 3 5'],
    correcta: 2,
    explicacion: 'Mismo árbol: raíz 5, izquierda 3 (1 a su izq, 4 a su der), derecha 8. El postorden deja la raíz para el final: primero el subárbol izquierdo (1, 4, 3), luego el derecho (8) y por último la raíz (5) → 1 4 3 8 5.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se insertan 7, 3, 9, 1, 5 en un ABB vacío. ¿Qué imprime el recorrido POSTORDEN (izq, der, raíz)?',
    codigo:
`raiz = insertar(raiz, 7);
raiz = insertar(raiz, 3);
raiz = insertar(raiz, 9);
raiz = insertar(raiz, 1);
raiz = insertar(raiz, 5);
postorden(raiz);`,
    opciones: ['1 5 3 9 7', '1 3 5 7 9', '7 3 1 5 9', '1 5 9 3 7'],
    correcta: 0,
    explicacion: 'Árbol: raíz 7; a la izquierda 3 (con 1 a su izq y 5 a su der); a la derecha 9. Postorden (izq, der, raíz): subárbol izquierdo 1, 5, 3; luego 9; al final la raíz 7 → 1 5 3 9 7.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se insertan 50, 30, 70, 20, 40, 60, 80 en un ABB vacío. ¿Qué imprime el recorrido PREORDEN (raíz, izq, der)?',
    codigo:
`int[] datos = {50, 30, 70, 20, 40, 60, 80};
for (int x : datos) raiz = insertar(raiz, x);
preorden(raiz);`,
    opciones: ['20 30 40 50 60 70 80', '50 30 20 40 70 60 80', '50 70 30 80 60 40 20', '20 40 30 60 80 70 50'],
    correcta: 1,
    explicacion: 'Árbol balanceado: raíz 50; izquierda 30 (con 20 y 40); derecha 70 (con 60 y 80). Preorden visita raíz primero: 50, después el subárbol izquierdo (30, 20, 40) y luego el derecho (70, 60, 80) → 50 30 20 40 70 60 80.'
  },

  // ---------------- COSTO ----------------
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de buscar(x) en un ABB balanceado?',
    codigo:
`boolean buscar(Nodo nodo, int x) {
    if (nodo == null) return false;
    if (x == nodo.valor) return true;
    if (x < nodo.valor)
        return buscar(nodo.izq, x);
    else
        return buscar(nodo.der, x);
}`,
    opciones: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correcta: 1,
    explicacion: 'En un ABB balanceado cada comparación descarta la mitad del árbol, así que el costo es O(log n). Ojo: si el ABB degenera en lista (datos ya ordenados), cae a O(n) en el peor caso. El AVL garantiza O(log n) siempre.'
  },
  {
    tipo: 'costo',
    enunciado: 'Se insertan los valores 1, 2, 3, 4, 5 (ya ordenados) en un ABB. ¿Cuál es el costo de buscar(x) en el árbol resultante?',
    codigo:
`int[] datos = {1, 2, 3, 4, 5};
for (int x : datos) raiz = insertar(raiz, x);
// el árbol degenera en una lista hacia la derecha
buscar(raiz, 5);`,
    opciones: ['O(log n) igual, porque sigue siendo un ABB', 'O(n), porque el árbol degeneró en lista', 'O(1), porque inserta al final', 'O(n²)'],
    correcta: 1,
    explicacion: 'Al insertar valores ya ordenados, cada nodo cuelga a la derecha del anterior y el árbol degenera en una lista. Buscar pasa a recorrer un nodo por nivel: O(n). Un ABB NO es O(log n) por definición, solo si está balanceado (lo que garantiza el AVL).'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de un recorrido inorden sobre un árbol de n nodos?',
    codigo:
`void inorden(Nodo nodo) {
    if (nodo == null) return;
    inorden(nodo.izq);
    System.out.print(nodo.valor + " ");
    inorden(nodo.der);
}`,
    opciones: ['O(log n)', 'O(n)', 'O(n²)', 'Depende de si está balanceado'],
    correcta: 1,
    explicacion: 'Un recorrido visita cada nodo exactamente una vez, sin descartar ninguno. Por eso siempre es O(n), esté balanceado o no. Lo que cambia con el balance es buscar e insertar, no los recorridos.'
  },

  // ---------------- ORDENAR ----------------
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas del cuerpo del recorrido inorden recursivo (izquierda, raíz, derecha).',
    lineas: [
      'if (nodo == null) return;',
      'inorden(nodo.izq);',
      'System.out.print(nodo.valor + " ");',
      'inorden(nodo.der);'
    ],
    explicacion: 'Primero el caso base que corta la recursión en un subárbol vacío. Después se recorre el subárbol izquierdo, se visita la raíz y por último el derecho: ese orden (izq, raíz, der) es lo que define al inorden.'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas de insertar(nodo, x) en un ABB para que respete la propiedad de orden y devuelva la nueva raíz del subárbol.',
    lineas: [
      'if (nodo == null) return nuevoNodo(x);',
      'if (x < nodo.valor)',
      '    nodo.izq = insertar(nodo.izq, x);',
      'else if (x > nodo.valor)',
      '    nodo.der = insertar(nodo.der, x);',
      'return nodo;'
    ],
    explicacion: 'Primero el caso base: si el lugar está vacío, ahí va el nodo nuevo. Después se compara: si x es menor baja por la izquierda, si es mayor por la derecha (y si es igual no hace nada). Al final devuelve el nodo para reenganchar el subárbol actualizado.'
  },

  // ---------------- MAPEAR (vocabulario ES ↔ EN del TDA de Monzón) ----------------
  {
    tipo: 'mapear',
    enunciado: 'Relacioná cada término de árboles de esta guía (español) con su equivalente del TDA BinaryTree de Monzón (inglés).',
    pares: [
      ['raiz() (valor de la raíz)', 'getRoot() : int'],
      ['hijoIzq() (subárbol izquierdo)', 'getLeft() : BinaryTree'],
      ['hijoDer() (subárbol derecho)', 'getRight() : BinaryTree'],
      ['insertar(x) en un ABB', 'SearchBinaryTree.add(int)'],
      ['podar la rama izquierda', 'removeLeft()']
    ],
    explicacion: 'En el modelo recursivo de Monzón, getRoot() devuelve el VALOR de la raíz, pero getLeft()/getRight() devuelven otro BinaryTree (el subárbol completo, o null), no un valor. add(int) inserta respetando el orden en un SearchBinaryTree (el ABB), y removeLeft()/removeRight() podan toda la rama.'
  },

  // ---------------- QUIZ (conteo: números de Catalan) ----------------
  {
    tipo: 'quiz',
    enunciado: 'Tenés 4 valores distintos α < β < γ < δ. ¿Cuántos ABB distintos (con distinta forma) se pueden armar con esos 4 valores, y cuántos de ellos son AVL (de altura mínima)?',
    opciones: ['14 ABB distintos, y 4 de ellos son AVL',
               '24 ABB distintos, y 14 de ellos son AVL',
               '4 ABB distintos, y 1 de ellos es AVL',
               '8 ABB distintos, y 2 de ellos son AVL'],
    correcta: 0,
    explicacion: 'La cantidad de formas de ABB con n valores distintos es el n-ésimo número de Catalan; para n=4 es 14 (no 24: el orden de inserción no importa, solo la forma final). De esas 14 formas, las que tienen altura mínima (las balanceadas estilo AVL) son 4: las que dejan como raíz a β o a γ con sus subárboles bien repartidos.'
  },

  // ---------------- TRAZAR (recorrido por niveles / BFS) ----------------
  {
    tipo: 'trazar',
    enunciado: 'Se insertan 50, 30, 70, 20, 40, 60, 80 en un ABB vacío. ¿Qué imprime el recorrido POR NIVELES (BFS, con una Cola)?',
    codigo:
`int[] datos = {50, 30, 70, 20, 40, 60, 80};
for (int x : datos) raiz = insertar(raiz, x);
porNiveles(raiz);`,
    opciones: ['50 30 70 20 40 60 80', '20 30 40 50 60 70 80', '50 30 20 40 70 60 80', '20 40 30 60 80 70 50'],
    correcta: 0,
    explicacion: 'El árbol queda: raíz 50; nivel 1: 30 y 70; nivel 2: 20, 40 (hijos de 30) y 60, 80 (hijos de 70). El BFS con cola los visita nivel por nivel, de izquierda a derecha: 50 / 30 70 / 20 40 60 80. No es ninguno de los recorridos en profundidad.'
  }
];
