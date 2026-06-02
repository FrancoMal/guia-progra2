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
    tipo: 'corregir',
    enunciado: 'Este recorrido revienta con NullPointerException. ¿En qué línea está el error?',
    lineas: [
      'Nodo turista = origen;',
      'while (turista.sig != null) {',
      '    System.out.println(turista.valor);',
      '    turista = turista.sig;',
      '}'
    ],
    lineaError: 1,
    fix: 'while (turista != null) {',
    explicacion: 'Hay que chequear turista != null antes de tocar turista.sig. Como está, cuando el turista llega al último nodo todavía evalúa turista.sig (ok), pero si la lista está vacía (origen == null) el primer turista.sig revienta. La condición correcta es while (turista != null).'
  }
];
