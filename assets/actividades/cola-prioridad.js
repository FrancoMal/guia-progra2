/* Actividades de práctica — Cola de Prioridad. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  // ---------------------------------------------------------------- QUIZ
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
    tipo: 'quiz',
    enunciado: 'Dos elementos entran con la MISMA prioridad. ¿En qué orden salen?',
    opciones: ['Sale primero el que llegó último',
               'Sale primero el que llegó primero (orden de llegada)',
               'Es indistinto, el TDA no lo define',
               'Sale primero el de menor valor'],
    correcta: 1,
    explicacion: 'Ante empate de prioridad se respeta el orden de llegada: el que entró antes sale antes (comportamiento FIFO solo entre iguales).'
  },
  {
    tipo: 'quiz',
    enunciado: 'Con la convención de la materia (número más grande = más prioridad), ¿cuál de estos sale primero?',
    opciones: ['Un elemento con prioridad 2',
               'Un elemento con prioridad 5',
               'Un elemento con prioridad 9',
               'Sale primero el que se acoló antes'],
    correcta: 2,
    explicacion: 'Mayor número = más prioridad. Entre prioridades 2, 5 y 9 gana el 9, que es el más prioritario.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Para cuál de estos escenarios es más natural una cola de prioridad?',
    opciones: ['Deshacer/rehacer en un editor de texto',
               'La planificación de procesos (scheduling) y algoritmos como Dijkstra',
               'Atender pedidos estrictamente por orden de llegada',
               'Recorrer una lista de extremo a extremo'],
    correcta: 1,
    explicacion: 'Scheduling de procesos y Dijkstra atienden siempre el elemento más prioritario (mayor urgencia / menor distancia): es el uso típico de una cola de prioridad. Deshacer/rehacer es una pila y el orden estricto de llegada es una cola FIFO.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué hacen primero() y prioridad() sobre la cola de prioridad?',
    opciones: ['Sacan el elemento más prioritario y lo devuelven',
               'Devuelven valor y prioridad del más prioritario, sin sacarlo de la cola',
               'Devuelven el último elemento que se acoló',
               'primero() saca el elemento y prioridad() no'],
    correcta: 1,
    explicacion: 'primero() devuelve el valor del más prioritario y prioridad() su prioridad; ninguno lo retira. Para sacarlo está desacolar().'
  },
  {
    tipo: 'quiz',
    enunciado: 'En la implementación con lista dinámica ordenada (LD), ¿dónde está el elemento de MAYOR prioridad?',
    codigo:
`NodoPrioridad primero;  // ¿qué guarda este nodo?`,
    opciones: ['Siempre al final de la lista',
               'Siempre en el primer nodo (primero)',
               'En cualquier posición; hay que buscarlo al desacolar',
               'En el medio de la lista'],
    correcta: 1,
    explicacion: 'La LD se mantiene ordenada de mayor a menor prioridad, así que el más prioritario es siempre "primero". Por eso primero(), prioridad() y desacolar() son O(1).'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué pasa si se llama desacolar() o primero() con la cola vacía (implementación LD)?',
    opciones: ['Devuelve 0 sin problema',
               'Se viola la precondición: NullPointerException (primero es null)',
               'Crea un nodo vacío automáticamente',
               'Devuelve null y sigue funcionando'],
    correcta: 1,
    explicacion: 'La precondición es "cola no vacía". Con la cola vacía primero es null, así que primero.valor o primero.sig lanzan NullPointerException. Hay que chequear !colaVacia() antes.'
  },

  // ---------------------------------------------------------------- TRAZAR
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
    tipo: 'trazar',
    enunciado: 'Empate de prioridad. ¿Qué devuelve primero() al final? (número más grande = más prioridad)',
    codigo:
`c.inicializarCola();
c.acolarPrioridad(5, 3);
c.acolarPrioridad(8, 3);
c.acolarPrioridad(2, 7);
c.desacolar();
// primero()`,
    opciones: ['5', '8', '2'],
    correcta: 0,
    explicacion: '(5,p3) entra; (8,p3) tiene la misma prioridad y, por orden de llegada, queda detrás: (5,p3)→(8,p3). (2,p7) es más prioritario y va al frente: (2,p7)→(5,p3)→(8,p3). desacolar() saca al 2 → (5,p3)→(8,p3). El primero ahora es 5.'
  },
  {
    tipo: 'trazar',
    enunciado: '¿Qué devuelve prioridad() al final de esta secuencia? (número más grande = más prioridad)',
    codigo:
`c.inicializarCola();
c.acolarPrioridad(10, 1);
c.acolarPrioridad(20, 4);
c.acolarPrioridad(30, 4);
// prioridad()`,
    opciones: ['1', '4', '30'],
    correcta: 1,
    explicacion: '(10,p1); luego (20,p4) va al frente → (20,p4)→(10,p1); (30,p4) empata con el 20 y, por llegada, queda detrás → (20,p4)→(30,p4)→(10,p1). El primero es (20,p4), así que prioridad() devuelve 4 (y primero() devolvería 20).'
  },
  {
    tipo: 'trazar',
    enunciado: 'Dos desacolar() seguidos. ¿Qué devuelve primero() al final? (número más grande = más prioridad)',
    codigo:
`c.inicializarCola();
c.acolarPrioridad(7, 5);
c.acolarPrioridad(3, 9);
c.acolarPrioridad(8, 2);
c.acolarPrioridad(1, 6);
c.desacolar();
c.desacolar();
// primero()`,
    opciones: ['1', '7', '8'],
    correcta: 1,
    explicacion: 'Tras acolar todo queda (3,p9)→(1,p6)→(7,p5)→(8,p2). El primer desacolar() saca al 3 (p9) y el segundo al 1 (p6) → (7,p5)→(8,p2). primero() devuelve 7.'
  },

  // ---------------------------------------------------------------- COSTO
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
    tipo: 'costo',
    enunciado: 'En la LD ordenada, ¿cuál es el costo de desacolar()?',
    codigo:
`public void desacolar() {
    primero = primero.sig;
}`,
    opciones: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correcta: 0,
    explicacion: 'El más prioritario ya está en "primero". Sacarlo es solo avanzar la referencia al segundo nodo: cantidad fija de pasos, O(1).'
  },
  {
    tipo: 'costo',
    enunciado: 'En la LD ordenada, ¿cuál es el costo de primero() y prioridad()?',
    codigo:
`public int primero()   { return primero.valor; }
public int prioridad() { return primero.prioridad; }`,
    opciones: ['O(1) ambos', 'O(n) ambos', 'primero() O(1) y prioridad() O(n)', 'O(log n) ambos'],
    correcta: 0,
    explicacion: 'Ambos leen directamente un campo del nodo "primero" (que ya es el más prioritario por estar la lista ordenada): acceso directo, O(1) los dos.'
  },

  // ---------------------------------------------------------------- ORDENAR
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
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas del caso "recorrer con el turista" de acolarPrioridad (cuando el nuevo NO va al frente).',
    lineas: [
      'NodoPrioridad turista = primero;',
      'while (turista.sig != null && turista.sig.prioridad >= prioridad)',
      '    turista = turista.sig;',
      'nuevo.sig = turista.sig;',
      'turista.sig = nuevo;'
    ],
    explicacion: 'El turista arranca en primero y avanza mientras el siguiente exista y tenga prioridad mayor o igual. Cuando se detiene, el nuevo se engancha entre turista y su siguiente: primero nuevo.sig = turista.sig y recién después turista.sig = nuevo, para no perder el resto.'
  },

  // ---------------------------------------------------------------- CORREGIR
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
  },
  {
    tipo: 'corregir',
    enunciado: 'Este acolarPrioridad se cae con NullPointerException al insertar al final de la cola. ¿En qué línea está el error?',
    lineas: [
      'public void acolarPrioridad(int x, int prioridad) {',
      '    NodoPrioridad nuevo = new NodoPrioridad();',
      '    nuevo.valor = x;',
      '    nuevo.prioridad = prioridad;',
      '    if (primero == null || prioridad > primero.prioridad) {',
      '        nuevo.sig = primero;',
      '        primero = nuevo;',
      '    } else {',
      '        NodoPrioridad turista = primero;',
      '        while (turista.sig.prioridad >= prioridad)',
      '            turista = turista.sig;',
      '        nuevo.sig = turista.sig;',
      '        turista.sig = nuevo;',
      '    }',
      '}'
    ],
    lineaError: 9,
    fix: 'while (turista.sig != null && turista.sig.prioridad >= prioridad)',
    explicacion: 'Falta el control turista.sig != null en el while. Sin él, cuando el turista llega al último nodo se evalúa turista.sig.prioridad sobre null y revienta. El chequeo de null debe ir PRIMERO para cortar antes de mirar la prioridad.'
  }
];
