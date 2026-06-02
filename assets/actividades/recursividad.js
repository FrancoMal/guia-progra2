/* Actividades de práctica — Recursividad. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  // ───────────── QUIZ ─────────────
  {
    tipo: 'quiz',
    enunciado: '¿Qué quiere decir que una función sea recursiva?',
    opciones: ['Que se ejecuta dentro de un bucle for o while',
               'Que se llama a sí misma para resolver una versión más chica del mismo problema',
               'Que llama a otra función auxiliar para hacer el trabajo'],
    correcta: 1,
    explicacion: 'Recursión es que la función se llama a sí misma. Cada llamada resuelve un cachito y delega el resto a otra llamada con una entrada más chica, hasta llegar al caso base.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Para qué sirve el caso base en una función recursiva?',
    opciones: ['Para acelerar los cálculos repetidos',
               'Para cortar la recursión: es el problema más chico que se resuelve sin volver a llamarse',
               'Para reducir el problema en cada llamada recursiva'],
    correcta: 1,
    explicacion: 'El caso base es la condición que corta la recursión. Sin un caso base alcanzable, la función se llama infinitas veces y salta StackOverflowError.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué dos partes tiene siempre una recursión bien hecha?',
    opciones: ['Un bucle y una condición de corte',
               'Un caso base (corta) y un caso recursivo (reduce el problema)',
               'Una función pública y una privada'],
    correcta: 1,
    explicacion: 'Toda recursión necesita un caso base que corta y un caso recursivo que se llama a sí mismo con una entrada más chica, acercándose a ese caso base.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Cuando una función recursiva llega al caso base, ¿en qué orden se resuelven las llamadas pendientes?',
    opciones: ['Todas al mismo tiempo, en paralelo',
               'De adentro hacia afuera: primero devuelve el caso base y después se van resolviendo las llamadas que estaban esperando',
               'De afuera hacia adentro: primero la primera llamada que se hizo'],
    correcta: 1,
    explicacion: 'Cada llamada se apila y queda esperando el resultado de la de adentro. Al llegar al caso base, las llamadas se resuelven al volver (desapilando), de adentro hacia afuera.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Dónde se guardan las llamadas recursivas mientras esperan que devuelva la llamada de adentro?',
    opciones: ['En un arreglo auxiliar que crea el compilador',
               'En la pila de ejecución (call stack)',
               'En una cola FIFO del sistema operativo'],
    correcta: 1,
    explicacion: 'Cada llamada se apila en la pila de ejecución y queda "congelada" hasta que la llamada interna devuelve. Si se apilan demasiadas (sin caso base), la pila se llena y salta StackOverflowError.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Sobre recursión vs iteración, ¿cuál afirmación es correcta?',
    opciones: ['La recursión siempre es más rápida que un bucle equivalente',
               'Muchos problemas se pueden resolver de las dos formas; la recursión suele ser más clara pero consume pila de ejecución',
               'La iteración no puede resolver lo que resuelve la recursión'],
    correcta: 1,
    explicacion: 'Recursión e iteración suelen ser intercambiables (factorial, suma, Fibonacci). La recursiva queda más declarativa, pero cada llamada ocupa la pila; la iterativa usa memoria constante.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué pasa si una función recursiva nunca alcanza su caso base?',
    codigo:
`public int suma(int n) {
    if (n == 0) return 0;
    return n + suma(n + 1);   // ¡crece en vez de achicar!
}`,
    opciones: ['Devuelve 0 porque arranca en el caso base',
               'Se llama sin parar, la pila se llena y salta StackOverflowError',
               'El compilador la corrige y resta en lugar de sumar'],
    correcta: 1,
    explicacion: 'Acá n crece (n + 1) y nunca llega a 0, así que el caso base es inalcanzable: se apilan llamadas hasta llenar la pila → StackOverflowError.'
  },
  // ───────────── TRAZAR ─────────────
  {
    tipo: 'trazar',
    enunciado: '¿Qué devuelve factorial(4)?',
    codigo:
`public int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}
// factorial(4)`,
    opciones: ['10', '24', '120'],
    correcta: 1,
    explicacion: 'factorial(4) = 4 × 3 × 2 × 1 × 1 = 24. Las llamadas se resuelven al volver del caso base: 1 → 1 → 2 → 6 → 24.'
  },
  {
    tipo: 'trazar',
    enunciado: '¿Qué devuelve suma(4)?',
    codigo:
`public int suma(int n) {
    if (n == 0) return 0;
    return n + suma(n - 1);
}
// suma(4)`,
    opciones: ['9', '10', '16'],
    correcta: 1,
    explicacion: 'suma(4) = 4 + 3 + 2 + 1 + 0 = 10. Al volver del caso base se acumula: 0 → 1 → 3 → 6 → 10.'
  },
  {
    tipo: 'trazar',
    enunciado: '¿Qué devuelve potencia(2, 4)?',
    codigo:
`public int potencia(int base, int exp) {
    if (exp == 0) return 1;
    return base * potencia(base, exp - 1);
}
// potencia(2, 4)`,
    opciones: ['8', '16', '32'],
    correcta: 1,
    explicacion: 'potencia(2,4) = 2 × 2 × 2 × 2 × 1 = 16. El caso base es exp == 0 (vale 1); cada nivel multiplica base por la potencia con exp - 1.'
  },
  {
    tipo: 'trazar',
    enunciado: '¿Qué devuelve fib(5)?',
    codigo:
`public int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
// fib(5)`,
    opciones: ['3', '5', '8'],
    correcta: 1,
    explicacion: 'La serie arranca fib(0)=0, fib(1)=1 y cada término es la suma de los dos anteriores: 0, 1, 1, 2, 3, 5. Entonces fib(5) = 5.'
  },
  // ───────────── COSTO ─────────────
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo del Fibonacci recursivo ingenuo (dos llamadas por nivel)?',
    codigo:
`public int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}`,
    opciones: ['O(n)', 'O(n²)', 'O(2^n)', 'O(log n)'],
    correcta: 2,
    explicacion: 'Cada nivel hace dos llamadas, así que el árbol de llamadas se duplica en cada paso: O(2^n). Repite cálculos (fib(3) se recalcula varias veces). La versión iterativa es O(n).'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de suma(n), que hace una sola llamada recursiva por nivel?',
    codigo:
`public int suma(int n) {
    if (n == 0) return 0;
    return n + suma(n - 1);
}`,
    opciones: ['O(1)', 'O(n)', 'O(2^n)', 'O(log n)'],
    correcta: 1,
    explicacion: 'Es recursión lineal: hace una llamada por nivel y baja de a 1 (n, n-1, ..., 0), o sea n+1 llamadas. Eso es O(n).'
  },
  {
    tipo: 'costo',
    enunciado: 'Las Torres de Hanoi resuelven n discos haciendo DOS llamadas con n-1 discos cada una. ¿Cuál es su costo?',
    codigo:
`public void hanoi(int n, char a, char b, char c) {
    if (n == 0) return;
    hanoi(n - 1, a, c, b);
    mover(a, c);
    hanoi(n - 1, b, a, c);
}`,
    opciones: ['O(n)', 'O(n²)', 'O(2^n)', 'O(log n)'],
    correcta: 2,
    explicacion: 'Cada nivel dispara dos llamadas con n-1, igual que Fibonacci: el árbol se duplica en cada paso. La cantidad de movimientos es 2^n − 1, así que el costo es O(2^n).'
  },
  // ───────────── ORDENAR ─────────────
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas para que factorial(n) quede correcto.',
    lineas: [
      'public int factorial(int n) {',
      '    if (n == 0) return 1;',
      '    return n * factorial(n - 1);',
      '}'
    ],
    explicacion: 'Primero la firma del método; después el caso base (corta cuando n == 0); recién entonces el caso recursivo, que multiplica n por factorial(n - 1) acercándose al caso base.'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas para que potencia(base, exp) quede correcta.',
    lineas: [
      'public int potencia(int base, int exp) {',
      '    if (exp == 0) return 1;',
      '    return base * potencia(base, exp - 1);',
      '}'
    ],
    explicacion: 'Primero la firma; después el caso base (exp == 0 vale 1, porque cualquier base elevada a 0 es 1); por último el caso recursivo, que multiplica base por la potencia con exp - 1.'
  },
  // ───────────── CORREGIR ─────────────
  {
    tipo: 'corregir',
    enunciado: 'Esta versión recursiva tiene un error que provoca StackOverflowError. ¿En qué línea está?',
    lineas: [
      'public int factorial(int n) {',
      '    return n * factorial(n - 1);',
      '}'
    ],
    lineaError: 1,
    fix: 'Agregar el caso base antes del return: if (n == 0) return 1;',
    explicacion: 'Falta el caso base, así que n nunca llega a cortar: factorial sigue llamándose (n-1, n-2, ...) sin parar, la pila de ejecución se llena y salta StackOverflowError.'
  },
  {
    tipo: 'corregir',
    enunciado: 'Esta suma recursiva tiene caso base, pero igual tira StackOverflowError. ¿En qué línea está el error?',
    lineas: [
      'public int suma(int n) {',
      '    if (n == 0) return 0;',
      '    return n + suma(n);',
      '}'
    ],
    lineaError: 2,
    fix: 'return n + suma(n - 1);',
    explicacion: 'El caso recursivo no reduce el problema: llama a suma(n) con el mismo n, así que nunca baja a 0 y el caso base no se alcanza. Hay que llamar a suma(n - 1) para acercarse al caso base.'
  }
];
