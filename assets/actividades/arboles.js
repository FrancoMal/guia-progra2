/* Actividades de práctica — Árboles (Binario, ABB, AVL). Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
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
    tipo: 'corregir',
    enunciado: 'Este recorrido preorden tiene un error. ¿En qué línea está?',
    lineas: [
      'void preorden(Nodo nodo) {',
      '    System.out.print(nodo.valor + " ");',
      '    preorden(nodo.izq);',
      '    preorden(nodo.der);',
      '}'
    ],
    lineaError: 1,
    fix: 'if (nodo == null) return;',
    explicacion: 'Falta el caso base. Sin el "if (nodo == null) return;" al principio, al bajar más allá de una hoja se accede a nodo.valor sobre null y explota con NullPointerException. El chequeo de null debe ir antes de usar el nodo.'
  }
];
