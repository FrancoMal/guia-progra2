/* Actividades de práctica — Recursividad. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
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
  }
];
