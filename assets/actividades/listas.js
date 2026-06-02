/* Actividades de práctica — Memoria dinámica y listas enlazadas. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  {
    tipo: 'quiz',
    enunciado: '¿Qué guarda cada nodo de una lista enlazada?',
    codigo:
`class Nodo {
    int valor;
    Nodo sig;
}`,
    opciones: ['Solo el valor del elemento',
               'Un valor y una referencia al siguiente nodo',
               'Un valor y el índice de su posición en la lista'],
    correcta: 1,
    explicacion: 'Cada nodo guarda un dato (valor) y un enlace al siguiente nodo (sig). Siguiendo los sig llegamos a todos los demás.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué significa que el último nodo apunte a null?',
    opciones: ['Que la lista está vacía',
               'Que ese nodo no tiene valor cargado',
               'Que es el final de la lista: no hay más nodos después'],
    correcta: 2,
    explicacion: 'null marca el final de la cadena. Por eso el recorrido con el turista corta cuando turista == null: ya no quedan nodos.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Cómo se representa una lista vacía con la convención del curso?',
    opciones: ['origen == null',
               'origen.valor == 0',
               'origen.sig == null'],
    correcta: 0,
    explicacion: 'La lista "es" su primer nodo. Si no hay primer nodo, origen vale null. Por eso inicializar() hace origen = null.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Comparando una lista enlazada con un arreglo, ¿cuál de estas afirmaciones es correcta?',
    opciones: ['El arreglo crece y se achica nodo a nodo; la lista tiene tamaño fijo',
               'El arreglo permite acceso directo por índice; la lista solo acceso secuencial',
               'Ambos permiten acceso directo por índice en O(1)'],
    correcta: 1,
    explicacion: 'El arreglo tiene tamaño fijo y datos[i] es O(1) (acceso directo). La lista tiene tamaño dinámico pero solo acceso secuencial: para llegar al elemento i hay que recorrer los anteriores.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Por qué para recorrer la lista usamos un turista en vez de mover directamente origen?',
    opciones: ['Porque mover origen es más lento que mover el turista',
               'Porque si pisamos origen perdemos la referencia al primer nodo y, con eso, toda la lista',
               'Porque el turista permite acceder a los nodos por índice'],
    correcta: 1,
    explicacion: 'origen es la única referencia al primer nodo. Si lo movemos con origen = origen.sig perdemos el acceso a los nodos anteriores. El turista recorre sin tocar origen.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué hace memoria dinámica cada vez que ejecutamos new Nodo()?',
    opciones: ['Reserva todos los nodos de la lista de una sola vez al iniciar',
               'Crea un objeto nuevo en tiempo de ejecución y devuelve una referencia a él',
               'Copia el último nodo de la lista'],
    correcta: 1,
    explicacion: 'La memoria dinámica se pide en tiempo de ejecución: cada new crea un objeto nuevo y nos da una referencia. Vamos creando nodos a medida que los necesitamos, sin saber de antemano cuántos.'
  },
  {
    tipo: 'quiz',
    enunciado: 'En el while de pertenece(x), ¿por qué turista != null va ANTES de turista.valor != x?',
    codigo:
`while (turista != null && turista.valor != x)
    turista = turista.sig;`,
    opciones: ['Por costumbre, el orden no cambia nada',
               'Porque && corta apenas el primer término es falso: así no se toca turista.valor cuando turista ya es null',
               'Porque turista.valor != x es más lento de evaluar'],
    correcta: 1,
    explicacion: 'El && evalúa de izquierda a derecha y corta apenas algo da falso (cortocircuito). Si turista llegó a null, el primer término es falso y nunca se evalúa turista.valor: así se evita el NullPointerException.'
  },
  {
    tipo: 'trazar',
    enunciado: 'La lista es 5 → 3 → 8 → null. ¿Qué imprime este recorrido?',
    codigo:
`Nodo turista = origen;
while (turista != null) {
    System.out.println(turista.valor);
    turista = turista.sig;
}`,
    opciones: ['8 3 5', '5 3 8', '5 3 8 null'],
    correcta: 1,
    explicacion: 'El turista arranca en origen (5) y avanza con turista.sig: imprime 5, 3 y 8. Cuando llega a null corta, sin imprimir nada más.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Sobre una lista vacía se ejecuta esta secuencia. ¿Cuál es el valor del primer nodo (origen.valor) al final?',
    codigo:
`lista.inicializar();
lista.agregarAdelante(4);
lista.agregarAdelante(7);
lista.agregarAdelante(2);
// origen.valor`,
    opciones: ['4', '7', '2'],
    correcta: 2,
    explicacion: 'agregarAdelante mete cada nuevo nodo al frente. [4] → [7,4] → [2,7,4]. El primero es el último que se agregó: 2.'
  },
  {
    tipo: 'trazar',
    enunciado: 'La lista es 1 → 2 → 3 → null. Se ejecuta eliminar(1), que borra el primer nodo con origen = origen.sig. ¿Cómo queda la lista?',
    codigo:
`// eliminar el primero:
if (origen.valor == x) {
    origen = origen.sig;
}`,
    opciones: ['2 → 3 → null', '1 → 3 → null', '1 → 2 → null'],
    correcta: 0,
    explicacion: 'Borrar el primero es mover origen al segundo nodo: origen = origen.sig. El 1 queda sin referencias y la lista pasa a ser 2 → 3 → null.'
  },
  {
    tipo: 'trazar',
    enunciado: 'La lista es 5 → 3 → 8 → null. ¿Qué imprime este código que muestra solo el segundo valor?',
    codigo:
`Nodo turista = origen;
turista = turista.sig;
System.out.println(turista.valor);`,
    opciones: ['5', '3', '8'],
    correcta: 1,
    explicacion: 'El turista arranca en el primero (5) y avanza un paso con turista.sig, quedando en el segundo nodo (3). Imprime 3.'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de buscar un valor recorriendo la lista con el turista?',
    codigo:
`public boolean buscar(int x) {
    Nodo turista = origen;
    while (turista != null && turista.valor != x)
        turista = turista.sig;
    return (turista != null);
}`,
    opciones: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correcta: 2,
    explicacion: 'No hay acceso directo: en el peor caso (el valor no está o es el último) el turista recorre los n nodos uno por uno. Es O(n).'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de agregarAdelante(x)?',
    codigo:
`public void agregarAdelante(int x) {
    Nodo nuevo = new Nodo();
    nuevo.valor = x;
    nuevo.sig = origen;
    origen = nuevo;
}`,
    opciones: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correcta: 0,
    explicacion: 'Solo engancha un nodo al frente con un número fijo de pasos, sin recorrer nada: O(1).'
  },
  {
    tipo: 'costo',
    enunciado: 'La lista NO guarda referencia al último nodo (solo a origen). ¿Cuál es el costo de insertar al final?',
    codigo:
`public void agregarAlFinal(int x) {
    Nodo nuevo = new Nodo();
    nuevo.valor = x;
    nuevo.sig = null;
    if (origen == null) {
        origen = nuevo;
    } else {
        Nodo turista = origen;
        while (turista.sig != null)
            turista = turista.sig;
        turista.sig = nuevo;
    }
}`,
    opciones: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correcta: 1,
    explicacion: 'Como no hay referencia al último, hay que recorrer con el turista hasta el final (turista.sig == null) para enganchar ahí el nodo nuevo. Recorrer los n nodos es O(n).'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas para que agregarAdelante(x) quede correcta.',
    lineas: [
      'Nodo nuevo = new Nodo();',
      'nuevo.valor = x;',
      'nuevo.sig = origen;',
      'origen = nuevo;'
    ],
    explicacion: 'Primero se crea el nodo y se carga el valor; después el nuevo apunta al viejo primero (nuevo.sig = origen) y, recién al final, pasa a ser el nuevo primero. Si invertís los últimos dos pasos, perdés la lista.'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas para que este recorrido imprima todos los valores con el turista.',
    lineas: [
      'Nodo turista = origen;',
      'while (turista != null) {',
      '    System.out.println(turista.valor);',
      '    turista = turista.sig;',
      '}'
    ],
    explicacion: 'El turista arranca en origen, el while corta cuando llega a null, se imprime el valor actual y recién después se avanza con turista = turista.sig. Si avanzás antes de imprimir, te salteás el primer nodo.'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas para que eliminarPrimero() borre el primer nodo (con la lista no vacía).',
    lineas: [
      'public void eliminarPrimero() {',
      '    if (origen != null) {',
      '        origen = origen.sig;',
      '    }',
      '}'
    ],
    explicacion: 'Primero se chequea que la lista no esté vacía (origen != null); recién ahí se mueve origen al segundo nodo (origen = origen.sig), que pasa a ser el nuevo primero. El nodo viejo queda sin referencias.'
  }
];
