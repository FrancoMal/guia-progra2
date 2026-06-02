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
    tipo: 'quiz',
    enunciado: '¿En qué se diferencia una cola (FIFO) de una pila (LIFO)?',
    opciones: ['La cola saca por el mismo extremo donde agrega; la pila por el extremo opuesto',
               'La cola saca el elemento más antiguo (frente); la pila saca el más reciente (tope)',
               'No hay diferencia, son dos nombres para lo mismo'],
    correcta: 1,
    explicacion: 'La cola es FIFO: sale el que llegó primero (el frente). La pila es LIFO: sale el último que entró (el tope).'
  },
  {
    tipo: 'quiz',
    enunciado: 'En una cola, ¿por qué extremo se acola y por cuál se desacola?',
    opciones: ['Se acola por el frente y se desacola por el final',
               'Se acola por el final y se desacola por el frente',
               'Se acola y se desacola por el mismo extremo'],
    correcta: 1,
    explicacion: 'Los nuevos se forman atrás (final) y se atiende al de adelante (frente). Por eso se acola por el final y se desacola por el frente.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Cuál de estos usos es un caso típico de cola?',
    opciones: ['Deshacer/rehacer (undo) en un editor',
               'Evaluar expresiones con paréntesis balanceados',
               'Procesar pedidos en el orden en que llegan a una impresora'],
    correcta: 2,
    explicacion: 'Los buffers y las tareas que se atienden en orden de llegada son FIFO. El undo y el balanceo de paréntesis son usos clásicos de pila (LIFO).'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué recorrido de grafos/árboles se apoya en una cola?',
    opciones: ['BFS (búsqueda en anchura), por niveles',
               'DFS (búsqueda en profundidad), con recursión',
               'Búsqueda binaria'],
    correcta: 0,
    explicacion: 'BFS usa una cola para visitar por niveles: encola los vecinos y los procesa en orden de llegada. DFS se apoya en una pila (o la pila de recursión).'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué precondición tienen desacolar() y primero()?',
    opciones: ['Solo que la cola esté inicializada',
               'Que la cola esté inicializada y NO vacía',
               'No tienen precondiciones'],
    correcta: 1,
    explicacion: 'Sobre una cola vacía no hay frente que sacar ni devolver: ambas requieren cola inicializada y no vacía. Verificá if (!colaVacia()) antes de llamarlas.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué pasa si llamás primero() con la cola vacía en la implementación con lista dinámica?',
    codigo:
`public int primero() {
    return primero.valor;
}`,
    opciones: ['Devuelve 0 por defecto',
               'Lanza NullPointerException porque primero es null',
               'Devuelve el último elemento desacolado'],
    correcta: 1,
    explicacion: 'Con la cola vacía primero == null, así que primero.valor revienta con NullPointerException. Por eso es precondición que la cola no esté vacía.'
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
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre una cola vacía. ¿Qué devuelve primero() al final?',
    codigo:
`c.inicializarCola();
c.acolar(4);
c.acolar(8);
c.acolar(2);
c.desacolar();
c.desacolar();
// primero()`,
    opciones: ['8', '2', '4'],
    correcta: 1,
    explicacion: 'acolar → [4]; [4,8]; [4,8,2]; desacolar saca el frente → [8,2]; desacolar → [2]. El frente es 2.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Misma secuencia que haría una pila, pero sobre una COLA (FIFO). ¿Qué devuelve primero() al final?',
    codigo:
`c.inicializarCola();
c.acolar(10);
c.acolar(20);
c.acolar(30);
c.desacolar();
// primero()`,
    opciones: ['10', '20', '30'],
    correcta: 1,
    explicacion: 'En FIFO desacolar saca el más antiguo: [10]→[10,20]→[10,20,30]→ se va el 10 →[20,30]. El frente es 20. (Una pila habría sacado el 30 y dejado 20 en el tope: justo acá coincide el número, pero por motivos opuestos — la cola saca por el frente, la pila por el tope.)'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre una cola vacía. ¿Qué devuelve colaVacia() al final?',
    codigo:
`c.inicializarCola();
c.acolar(1);
c.acolar(2);
c.desacolar();
c.desacolar();
// colaVacia()`,
    opciones: ['true', 'false'],
    correcta: 0,
    explicacion: 'acolar → [1]; [1,2]; desacolar → [2]; desacolar → []. Se sacaron los dos elementos, así que la cola quedó vacía: true.'
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
    tipo: 'costo',
    enunciado: 'Si NO guardáramos la referencia ultimo, ¿cuál sería el costo de acolar(x) en lista dinámica?',
    codigo:
`public void acolar(int x) {
    Nodo nuevo = new Nodo();
    nuevo.valor = x;
    nuevo.sig = null;
    if (colaVacia()) {
        primero = nuevo;
    } else {
        Nodo p = primero;
        while (p.sig != null) {   // hay que llegar hasta el final
            p = p.sig;
        }
        p.sig = nuevo;
    }
}`,
    opciones: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correcta: 1,
    explicacion: 'Sin la referencia ultimo hay que recorrer toda la lista para encontrar el final antes de enganchar: eso es O(n). Por eso conviene mantener ultimo.'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de desacolar() en lista dinámica (con primero y ultimo)?',
    codigo:
`public void desacolar() {
    primero = primero.sig;
    if (primero == null) {
        ultimo = null;
    }
}`,
    opciones: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
    correcta: 0,
    explicacion: 'Solo mueve la referencia primero al siguiente nodo (y ajusta ultimo si quedó vacía): un número fijo de pasos, sin recorrer nada. O(1).'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená el cuerpo de acolar(x) (lista dinámica), CASO cola NO vacía, para enganchar el nuevo nodo al final.',
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
    tipo: 'ordenar',
    enunciado: 'Ordená el cuerpo de desacolar() (lista dinámica) para sacar el frente y dejar ultimo consistente si la cola queda vacía.',
    lineas: [
      'primero = primero.sig;',
      'if (primero == null) {',
      '    ultimo = null;',
      '}'
    ],
    explicacion: 'Primero se avanza el frente al siguiente nodo; luego se chequea si la cola quedó vacía (primero == null) y, en ese caso, se limpia ultimo para no dejar una referencia colgando.'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená el cuerpo de acolar(x) (lista dinámica) contemplando AMBOS casos: cola vacía y no vacía.',
    lineas: [
      'Nodo nuevo = new Nodo();',
      'nuevo.valor = x;',
      'nuevo.sig = null;',
      'if (colaVacia()) {',
      '    primero = nuevo;',
      '} else {',
      '    ultimo.sig = nuevo;',
      '}',
      'ultimo = nuevo;'
    ],
    explicacion: 'Se crea el nodo y se carga; si la cola estaba vacía el nuevo es el frente, si no, el viejo final lo engancha; y en cualquier caso el nuevo termina siendo ultimo.'
  },
  {
    tipo: 'mapear',
    enunciado: 'Emparejá cada operación de la cola en español (Wehbe, esta guía) con su equivalente en inglés (Monzón, tu examen). Son el mismo TDA FIFO, solo cambia el nombre.',
    pares: [
      ['acolar(x)', 'add(x)'],
      ['desacolar()', 'remove()'],
      ['primero()', 'getFirst()'],
      ['colaVacía()', 'isEmpty()']
    ],
    explicacion: 'Misma semántica FIFO en ambos idiomas: add acola por el final, remove desacola por el frente, getFirst devuelve el primero sin sacarlo e isEmpty indica si la cola está vacía.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Cola circular sobre un arreglo de tamaño N = 4 (ini, fin y cant arrancan en 0). Tras esta secuencia, ¿cuál es el estado (ini, fin, cant)?',
    codigo:
`c.inicializarCola();   // ini=0, fin=0, cant=0
c.acolar(7);           // fin=(0+1)%4
c.acolar(3);
c.acolar(9);
c.desacolar();         // ini=(0+1)%4
c.acolar(5);
c.desacolar();
// estado: (ini, fin, cant)`,
    opciones: ['(ini=2, fin=0, cant=2)', '(ini=2, fin=4, cant=2)', '(ini=1, fin=3, cant=3)'],
    correcta: 0,
    explicacion: 'acolar tres veces lleva fin de 0→1→2→3 y cant a 3. El primer desacolar mueve ini a 1 (cant=2). El cuarto acolar pone fin=(3+1)%4=0 y cant=3. El último desacolar mueve ini a 2 y cant=2. Queda ini=2, fin=0, cant=2: fin "dio la vuelta" al 0 gracias al módulo.'
  },
  {
    tipo: 'trazar',
    enunciado: 'TDA modificado tipo VariableQueue: se agrega un método acolarVarias(x, n) que acola n veces el valor x, y desacolarVarias(n) que desacola n veces. Sobre una cola vacía se ejecuta lo siguiente. ¿Qué devuelve primero() al final?',
    codigo:
`c.inicializarCola();
c.acolarVarias(5, 3);   // acola 5, tres veces  -> [5,5,5]
c.acolar(8);            // -> [5,5,5,8]
c.desacolarVarias(2);   // desacola dos veces (saca del frente)
// primero()`,
    opciones: ['5', '8', '2'],
    correcta: 0,
    explicacion: 'acolarVarias(5,3) deja [5,5,5]; acolar(8) deja [5,5,5,8]; desacolarVarias(2) saca dos veces por el frente (FIFO): se van dos cincos y queda [5,8]. El frente es 5. acolarVarias/desacolarVarias son solo n llamadas a acolar/desacolar; no cambian el TDA, lo envuelven.'
  }
];
