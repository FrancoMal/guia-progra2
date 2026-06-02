/* Actividades de práctica — Conversión entre TDAs.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  // ───────────────────────────── QUIZ (reversibilidad) ─────────────────────────────
  {
    tipo: 'quiz',
    enunciado: '¿Cuándo una conversión A → B es REVERSIBLE (se puede volver a la A original)?',
    opciones: ['Siempre que A y B sean del mismo tamaño',
               'Cuando B conserva toda la información que distinguía A (orden, duplicados, forma)',
               'Cuando B es una estructura más simple que A',
               'Nunca: convertir siempre pierde información'],
    correcta: 1,
    explicacion: 'Reversible significa que B guarda suficiente para reconstruir A. Si B descarta algo que A distinguía (el orden, los repetidos o la forma), esa información se borra y no se puede adivinar para volver atrás.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Convertir una Pila (o una Cola) a un Conjunto, ¿es reversible?',
    opciones: ['Sí, porque pasan los mismos valores',
               'No, porque el conjunto pierde el orden y los duplicados',
               'Sí, siempre que la pila no tenga repetidos',
               'Solo si el conjunto está vacío'],
    correcta: 1,
    explicacion: 'El conjunto no tiene orden y no admite repetidos. Al volcar [7, 3, 5] queda {3, 5, 7} sin rastro de cuál era el tope, y [4, 4, 9] queda {4, 9} sin saber cuántos 4 había. Muchas pilas distintas dan el mismo conjunto: no hay inversa.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Dos pilas distintas, [tope→7, 3, 5] y [tope→5, 3, 7], se convierten a conjunto. ¿Qué conjuntos dan?',
    opciones: ['Dan conjuntos distintos: {7,3,5} y {5,3,7}',
               'Dan el MISMO conjunto {3, 5, 7}: por eso no se puede volver atrás',
               'La segunda da error porque repite valores',
               'Dan {7} y {5} respectivamente (solo el tope)'],
    correcta: 1,
    explicacion: 'Como el conjunto no tiene orden, {7,3,5} y {5,3,7} son el mismo conjunto {3,5,7}. Dos pilas diferentes terminan en el mismo conjunto, así que es imposible decidir desde el conjunto cuál era la pila original.'
  },
  {
    tipo: 'quiz',
    enunciado: 'El Ej3 pide convertir un árbol binario a un diccionario y poder RECUPERAR el árbol. ¿Qué tienen que ser las claves para que sea reversible?',
    opciones: ['La altura de cada nodo',
               'La posición de cada nodo (raíz=1, izq de i = 2·i, der de i = 2·i+1)',
               'El valor de cada nodo',
               'Un número al azar distinto por nodo'],
    correcta: 1,
    explicacion: 'Si la clave codifica la POSICIÓN del nodo, el diccionario guarda la forma completa del árbol y se puede reconstruir. La altura no alcanza: no dice quién era padre de quién, así que con altura la conversión no es reversible.'
  },

  // ───────────────────────────── TRAZAR (invierte / preserva) ─────────────────────────────
  {
    tipo: 'trazar',
    enunciado: 'Se vuelca la pila [tope→7, 3, 5] a una cola sacando el tope y encolándolo. ¿En qué orden SALDRÁN los elementos de la cola (de adelante hacia atrás)?',
    codigo:
`// pila: tope→7, 3, 5  (el 7 es el tope, el 5 el fondo)
while (!p.isEmpty()) {
    q.add(p.getTop());   // encolo el tope...
    p.remove();          // ...y lo desapilo
}
// ¿en qué orden sale la cola?`,
    opciones: ['7, 3, 5', '5, 3, 7', '3, 5, 7', 'Al azar'],
    correcta: 0,
    explicacion: 'La pila sale por el tope: primero 7, después 3, último 5. Se encolan en ese orden, y la cola es FIFO, así que sale 7, 3, 5. Volcar una pila invierte respecto del fondo: el fondo (5) queda último.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se vuelca la cola [4, 9, 1] (el 4 es el primero) a una pila, sacando el primero y apilándolo. Tras el vuelco, ¿cuál queda como TOPE de la pila?',
    codigo:
`// cola: primero→4, 9, 1  (el 4 sale primero)
while (!c.isEmpty()) {
    p.add(c.getFirst());   // apilo el primero...
    c.remove();            // ...y lo desencolo
}
// ¿cuál es el tope de la pila?`,
    opciones: ['4 (el que salió primero de la cola)',
               '1 (el último que salió de la cola)',
               '9 (el del medio)',
               'No se puede saber'],
    correcta: 1,
    explicacion: 'La cola preserva el orden al salir: 4, 9, 1. Se apilan en ese orden, y el último en apilarse (el 1) queda en el tope. Volcar a una pila invierte: el primero de la cola (4) termina en el fondo.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se convierte la cola [4, 4, 4, 9] a un conjunto agregando cada elemento. ¿Cuántos elementos tiene el conjunto al final?',
    codigo:
`// cola: 4, 4, 4, 9
while (!c.isEmpty()) {
    conj.add(c.getFirst());   // agrego al conjunto
    c.remove();
}
// ¿cuántos elementos tiene conj?`,
    opciones: ['4', '2', '1', '3'],
    correcta: 1,
    explicacion: 'El conjunto no admite repetidos: los tres 4 colapsan en uno solo. Queda {4, 9}, o sea 2 elementos. Por eso la conversión pierde la información de cuántos 4 había: es irreversible.'
  },

  // ───────────────────────────── MAPEAR ─────────────────────────────
  {
    tipo: 'mapear',
    enunciado: 'Asociá cada conversión con si es reversible o pierde información.',
    pares: [
      ['List ↔ Stack', 'Reversible (conserva orden y duplicados)'],
      ['Pila/Cola → Conjunto', 'Pierde el orden y los duplicados'],
      ['BinaryTree → Dictionary por posición', 'Reversible (la clave guarda la forma)'],
      ['Árbol → Dictionary nodo→altura', 'Pierde la forma (la altura no dice el padre)']
    ],
    explicacion: 'Es reversible cuando el destino conserva toda la información: List↔Stack mantiene orden y repetidos, y el diccionario por posición guarda la forma del árbol. Pierde información cuando el destino descarta algo: el conjunto borra orden y duplicados, y un diccionario nodo→altura no conserva quién era padre de quién.'
  }
];
