/* Actividades de práctica — Cola. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  {
    tipo: 'quiz',
    enunciado: '¿Qué política de acceso sigue una cola?',
    opciones: ['LIFO: el último en entrar es el primero en salir',
               'FIFO: el primero en entrar es el primero en salir',
               'Acceso aleatorio por índice'],
    correcta: 1,
    explicacion: 'La cola es FIFO: se acola por el final y se desacola por el frente, igual que la fila del banco.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre una cola vacía. ¿Qué devuelve primero() al final?',
    codigo:
`c.inicializarCola();
c.acolar(1);
c.acolar(2);
c.desacolar();
c.acolar(3);
// primero()`,
    opciones: ['1', '2', '3'],
    correcta: 1,
    explicacion: 'acolar(1) → [1]; acolar(2) → [1,2]; desacolar() saca el frente → [2]; acolar(3) → [2,3]. El frente es 2.'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de acolar(x) en la implementación con lista dinámica, manteniendo la referencia ultimo?',
    codigo:
`public void acolar(int x) {
    Nodo nuevo = new Nodo();
    nuevo.valor = x;
    nuevo.sig = null;
    if (colaVacia()) {
        primero = nuevo;
    } else {
        ultimo.sig = nuevo;
    }
    ultimo = nuevo;
}`,
    opciones: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
    correcta: 0,
    explicacion: 'Como guardamos la referencia ultimo, enganchamos el nuevo nodo al final sin recorrer la lista: un número fijo de pasos, O(1).'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená el cuerpo de acolar(x) (lista dinámica) para que enganche el nuevo nodo al final.',
    lineas: [
      'Nodo nuevo = new Nodo();',
      'nuevo.valor = x;',
      'nuevo.sig = null;',
      'ultimo.sig = nuevo;',
      'ultimo = nuevo;'
    ],
    explicacion: 'Primero se crea el nodo y se carga el valor; el nuevo queda al final (sig = null); el viejo final apunta al nuevo (ultimo.sig = nuevo) y recién al final el nuevo pasa a ser ultimo.'
  },
  {
    tipo: 'corregir',
    enunciado: 'Este acolar(x) falla al agregar el PRIMER elemento. ¿En qué línea está el error?',
    lineas: [
      'public void acolar(int x) {',
      '    Nodo nuevo = new Nodo();',
      '    nuevo.valor = x;',
      '    nuevo.sig = null;',
      '    if (colaVacia()) {',
      '        primero = nuevo;',
      '    } else {',
      '        ultimo.sig = nuevo;',
      '    }',
      '}'
    ],
    lineaError: 9,
    fix: '    }\n    ultimo = nuevo;',
    explicacion: 'Falta actualizar ultimo después del if. Sin ultimo = nuevo, al acolar el primer elemento ultimo queda en null y el próximo acolar engancha mal con ultimo.sig.'
  }
];
