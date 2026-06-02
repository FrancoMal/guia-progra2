/* Actividades de práctica — Cola de Prioridad. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  {
    tipo: 'quiz',
    enunciado: 'En una cola de prioridad, ¿qué elemento sale primero?',
    opciones: ['El que llegó primero (como en una cola FIFO)',
               'El de mayor prioridad, sin importar cuándo llegó',
               'El último en entrar, como en una pila'],
    correcta: 1,
    explicacion: 'No es FIFO: sale primero el de MAYOR prioridad. Ante empate de prioridad, recién ahí se respeta el orden de llegada.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre una cola de prioridad vacía (número más grande = más prioridad). ¿Qué devuelve primero() al final?',
    codigo:
`c.inicializarCola();
c.acolarPrioridad(1, 2);
c.acolarPrioridad(9, 8);
c.acolarPrioridad(4, 5);
// primero()`,
    opciones: ['1', '9', '4'],
    correcta: 1,
    explicacion: 'Queda ordenada por prioridad de mayor a menor: (9,p8) → (4,p5) → (1,p2). El primero es el de prioridad 8, así que primero() devuelve 9.'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de acolarPrioridad(x, prioridad) en la lista dinámica ordenada (LD)?',
    codigo:
`public void acolarPrioridad(int x, int prioridad) {
    NodoPrioridad nuevo = new NodoPrioridad();
    nuevo.valor = x;
    nuevo.prioridad = prioridad;
    if (primero == null || prioridad > primero.prioridad) {
        nuevo.sig = primero;
        primero = nuevo;
    } else {
        NodoPrioridad turista = primero;
        while (turista.sig != null && turista.sig.prioridad >= prioridad)
            turista = turista.sig;
        nuevo.sig = turista.sig;
        turista.sig = nuevo;
    }
}`,
    opciones: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correcta: 1,
    explicacion: 'Como la lista se mantiene ordenada, en el peor caso hay que recorrerla entera con el "turista" para dejar el nuevo nodo en su lugar: O(n).'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas del caso "insertar al frente" de acolarPrioridad (cuando el nuevo supera al primero actual).',
    lineas: [
      'NodoPrioridad nuevo = new NodoPrioridad();',
      'nuevo.valor = x;',
      'nuevo.prioridad = prioridad;',
      'nuevo.sig = primero;',
      'primero = nuevo;'
    ],
    explicacion: 'Primero se crea el nodo y se cargan valor y prioridad; luego el nuevo apunta al viejo primero y, recién al final, el nuevo pasa a ser primero. Si invirtieras las dos últimas, perderías el resto de la cola.'
  },
  {
    tipo: 'corregir',
    enunciado: 'Este acolarPrioridad tiene la comparación de prioridad invertida y rompe el orden. ¿En qué línea está el error?',
    lineas: [
      'public void acolarPrioridad(int x, int prioridad) {',
      '    NodoPrioridad nuevo = new NodoPrioridad();',
      '    nuevo.valor = x;',
      '    nuevo.prioridad = prioridad;',
      '    if (primero == null || prioridad < primero.prioridad) {',
      '        nuevo.sig = primero;',
      '        primero = nuevo;',
      '    } else {',
      '        NodoPrioridad turista = primero;',
      '        while (turista.sig != null && turista.sig.prioridad >= prioridad)',
      '            turista = turista.sig;',
      '        nuevo.sig = turista.sig;',
      '        turista.sig = nuevo;',
      '    }',
      '}'
    ],
    lineaError: 4,
    fix: 'if (primero == null || prioridad > primero.prioridad) {',
    explicacion: 'El nuevo va al frente cuando tiene MÁS prioridad que el primero actual: la condición debe ser prioridad > primero.prioridad. Con < se manda adelante al menos prioritario y la lista deja de estar ordenada de mayor a menor.'
  }
];
