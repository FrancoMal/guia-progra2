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
  }
];
