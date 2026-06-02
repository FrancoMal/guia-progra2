/* Actividades de práctica — Pila. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  {
    tipo: 'quiz',
    enunciado: '¿Qué política de acceso sigue una pila?',
    opciones: ['FIFO: el primero en entrar es el primero en salir',
               'LIFO: el último en entrar es el primero en salir',
               'Acceso aleatorio por índice'],
    correcta: 1,
    explicacion: 'La pila es LIFO: solo se agrega y se saca por el mismo extremo (el tope).'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de apilar(x) en la implementación con lista dinámica?',
    codigo:
`public void apilar(int x) {
    Nodo nuevo = new Nodo();
    nuevo.valor = x;
    nuevo.sig = tope;
    tope = nuevo;
}`,
    opciones: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
    correcta: 0,
    explicacion: 'Inserta siempre adelante (en el tope) con un número fijo de pasos: O(1).'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre una pila vacía. ¿Qué devuelve tope() al final?',
    codigo:
`p.inicializarPila();
p.apilar(5);
p.apilar(3);
p.desapilar();
p.apilar(7);
// tope()`,
    opciones: ['5', '3', '7'],
    correcta: 2,
    explicacion: 'apilar(5) → [5]; apilar(3) → [3,5]; desapilar() → [5]; apilar(7) → [7,5]. El tope es 7.'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas para que apilar(x) (lista dinámica) quede correcta.',
    lineas: [
      'Nodo nuevo = new Nodo();',
      'nuevo.valor = x;',
      'nuevo.sig = tope;',
      'tope = nuevo;'
    ],
    explicacion: 'Primero se crea el nodo y se carga el valor; luego se engancha al tope viejo y, recién al final, el nuevo pasa a ser el tope.'
  },
  {
    tipo: 'corregir',
    enunciado: 'Este tope() tiene un error. ¿En qué línea está?',
    lineas: [
      'public int tope() {',
      '    return tope.sig.valor;',
      '}'
    ],
    lineaError: 1,
    fix: 'return tope.valor;',
    explicacion: 'El tope es el primer nodo, así que se devuelve tope.valor, no el del siguiente.'
  },

  // ---------- Nuevas actividades ----------

  {
    tipo: 'quiz',
    enunciado: 'En una pila, ¿por qué extremo se agregan y se sacan los elementos?',
    opciones: ['Se agrega por un extremo y se saca por el otro',
               'Se agrega y se saca siempre por el mismo extremo (el tope)',
               'Se puede agregar o sacar por cualquier posición'],
    correcta: 1,
    explicacion: 'La pila trabaja sobre un solo extremo: tanto apilar como desapilar operan en el tope. Eso es lo que la hace LIFO y O(1).'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Cuál de estos usos es un caso típico de pila?',
    opciones: ['Una cola de impresión que atiende en orden de llegada',
               'La función "deshacer" (undo) de un editor de texto',
               'Una agenda de turnos ordenada por hora'],
    correcta: 1,
    explicacion: 'El "deshacer" revierte primero la última acción hecha: es LIFO puro, el caso clásico de pila. La cola de impresión y la agenda son FIFO/orden, no pila.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Para verificar que los paréntesis de una expresión estén balanceados se usa una pila. ¿Por qué?',
    opciones: ['Porque hay que cerrar primero el paréntesis abierto más recientemente (LIFO)',
               'Porque hay que cerrar primero el paréntesis abierto más antiguo (FIFO)',
               'Porque se necesita acceso aleatorio a cada paréntesis'],
    correcta: 0,
    explicacion: 'En "( [ ] )" el corchete abierto al último es el primero en cerrarse. Ese orden LIFO es exactamente el de una pila: se apila cada apertura y se desapila al encontrar el cierre.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Durante la ejecución de llamadas recursivas, ¿cómo administra el sistema las llamadas pendientes?',
    opciones: ['En una cola: la primera llamada es la primera en terminar',
               'En una pila: la última llamada en abrirse es la primera en terminar',
               'En un arreglo ordenado por nombre de método'],
    correcta: 1,
    explicacion: 'La pila de ejecución apila cada llamada; la más reciente se resuelve y desapila primero. Por eso una recursión sin caso base desborda la pila (stack overflow).'
  },
  {
    tipo: 'quiz',
    enunciado: 'Comparando la implementación con lista dinámica (LD) y con arreglo (A), ¿cuál afirmación es correcta?',
    opciones: ['La LD es más rápida porque sus operaciones son O(1) y las del arreglo no',
               'Ambas tienen todas las operaciones O(1); el arreglo puede llenarse y la LD crece según haga falta',
               'El arreglo es siempre mejor porque no usa nodos'],
    correcta: 1,
    explicacion: 'Las dos implementaciones son O(1) en todas las operaciones. La diferencia es de capacidad: el arreglo tiene tamaño fijo (puede desbordar), mientras la LD reserva un nodo por elemento a medida que crece.'
  },
  {
    tipo: 'quiz',
    enunciado: 'En la implementación con arreglo, el atributo tope es un entero que guarda la cantidad de elementos. ¿Dónde está el último elemento apilado?',
    codigo:
`int[] datos;
int tope;   // cantidad de elementos`,
    opciones: ['En datos[tope]', 'En datos[tope - 1]', 'En datos[0]'],
    correcta: 1,
    explicacion: 'Si hay tope elementos, ocupan los índices 0..tope-1. El último apilado está en datos[tope - 1]; datos[tope] es la próxima posición libre.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre una pila vacía. ¿Qué devuelve tope() al final?',
    codigo:
`p.inicializarPila();
p.apilar(8);
p.apilar(2);
p.apilar(6);
p.desapilar();
p.desapilar();
// tope()`,
    opciones: ['8', '2', '6'],
    correcta: 0,
    explicacion: 'apilar(8) → [8]; apilar(2) → [2,8]; apilar(6) → [6,2,8]; desapilar() → [2,8]; desapilar() → [8]. El tope es 8.'
  },
  {
    tipo: 'trazar',
    enunciado: 'La pila se imprime sacando elemento por elemento. ¿Qué imprime este código?',
    codigo:
`p.inicializarPila();
p.apilar(1);
p.apilar(2);
p.apilar(3);
while (!p.pilaVacia()) {
    System.out.print(p.tope());
    p.desapilar();
}`,
    opciones: ['123', '321', '111'],
    correcta: 1,
    explicacion: 'La pila queda [3,2,1] (3 en el tope). Al sacar e imprimir el tope cada vez salen en orden 3, 2, 1: imprime "321". Una pila invierte el orden de inserción.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se pasan los elementos de una pila a otra, uno por uno. ¿Qué devuelve b.tope() al final?',
    codigo:
`a.inicializarPila();
a.apilar(1);
a.apilar(2);
a.apilar(3);
b.inicializarPila();
while (!a.pilaVacia()) {
    b.apilar(a.tope());
    a.desapilar();
}
// b.tope()`,
    opciones: ['3', '1', '2'],
    correcta: 1,
    explicacion: 'a se vacía sacando 3, luego 2, luego 1, y cada uno se apila en b. b queda [1,2,3] (1 en el tope). Pasar una pila a otra invierte el orden, por eso el tope de b es el fondo de a: 1.'
  },
  {
    tipo: 'costo',
    enunciado: 'En la implementación con arreglo, ¿cuál es el costo de desapilar()?',
    codigo:
`public void desapilar() {
    tope--;
}`,
    opciones: ['O(1)', 'O(n)', 'O(log n)'],
    correcta: 0,
    explicacion: 'Solo decrementa el entero tope: una operación de paso fijo, sin recorrer ni mover el arreglo. Es O(1).'
  },
  {
    tipo: 'costo',
    enunciado: '¿Por qué todas las operaciones de la pila (apilar, desapilar, tope, pilaVacia) son O(1)?',
    opciones: ['Porque el arreglo y la lista son siempre chicos',
               'Porque siempre se trabaja sobre un solo extremo (el tope), sin recorrer la estructura',
               'Porque Java optimiza las pilas automáticamente'],
    correcta: 1,
    explicacion: 'Todas las operaciones tocan únicamente el tope (insertar/quitar/leer ahí o comparar con null). Como nunca hay que recorrer los n elementos, el costo no depende de n: O(1).'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas para que apilar(x) (implementación con arreglo) quede correcta.',
    lineas: [
      'public void apilar(int x) {',
      '    datos[tope] = x;',
      '    tope++;',
      '}'
    ],
    explicacion: 'Primero se guarda x en la posición libre datos[tope] y recién después se incrementa tope. Si se incrementara antes, x quedaría en la posición equivocada.'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas para que, partiendo de pila vacía, esta secuencia deje la pila como [7,5] (con el 7 en el tope).',
    lineas: [
      'p.inicializarPila();',
      'p.apilar(5);',
      'p.apilar(2);',
      'p.desapilar();',
      'p.apilar(7);'
    ],
    explicacion: 'inicializar → []; apilar(5) → [5]; apilar(2) → [2,5]; desapilar() saca el 2 → [5]; apilar(7) → [7,5]. El 2 se apila y se desapila enseguida; quedan el 5 de base y el 7 en el tope.'
  },
  {
    tipo: 'corregir',
    enunciado: 'Este desapilar() (lista dinámica) puede romper el programa. ¿En qué línea está el problema?',
    lineas: [
      'public void desapilar() {',
      '    tope = tope.sig;',
      '}'
    ],
    lineaError: 1,
    fix: 'if (!pilaVacia()) tope = tope.sig;',
    explicacion: 'Si la pila está vacía, tope es null y tope.sig lanza NullPointerException. Hay que respetar la precondición verificando !pilaVacia() antes de avanzar el tope.'
  },
  {
    tipo: 'corregir',
    enunciado: 'Este tope() de la implementación con arreglo tiene un error. ¿En qué línea está?',
    lineas: [
      'public int tope() {',
      '    return datos[tope];',
      '}'
    ],
    lineaError: 1,
    fix: 'return datos[tope - 1];',
    explicacion: 'tope es la cantidad de elementos, así que datos[tope] es la posición libre (basura). El último apilado está en datos[tope - 1].'
  }
];
