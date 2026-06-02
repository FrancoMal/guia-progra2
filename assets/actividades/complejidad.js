/* Actividades de práctica — Complejidad y Big-O. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  {
    tipo: 'quiz',
    enunciado: 'Un algoritmo realiza 3n + 5 operaciones para una entrada de tamaño n. ¿Cuál es su complejidad en notación Big-O?',
    opciones: ['O(3n + 5)', 'O(n)', 'O(5)', 'O(n²)'],
    correcta: 1,
    explicacion: 'Big-O ignora las constantes que multiplican (el 3) y los términos de menor orden (el +5). Lo único que importa es cómo crece: 3n + 5 crece de forma lineal ⇒ O(n).'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es la complejidad de este fragmento en función de n?',
    codigo:
`int suma = 0;
for (int i = 0; i < n; i++) {
    suma = suma + i;
}`,
    opciones: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correcta: 2,
    explicacion: 'Un único bucle que recorre los n elementos ejecuta el cuerpo (una operación O(1)) n veces ⇒ O(n).'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es la complejidad de estos dos bucles anidados?',
    codigo:
`for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        System.out.println(i + "," + j);
    }
}`,
    opciones: ['O(n)', 'O(2n)', 'O(n²)', 'O(log n)'],
    correcta: 2,
    explicacion: 'Un bucle de n adentro de otro de n: los costos anidados se MULTIPLICAN. El cuerpo se ejecuta n × n = n² veces ⇒ O(n²).'
  },
  {
    tipo: 'trazar',
    enunciado: 'Con n = 4, ¿cuántas veces se ejecuta la línea del println (la del cuerpo interno)?',
    codigo:
`for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        System.out.println(i + "," + j);
    }
}`,
    opciones: ['4', '8', '16', '24'],
    correcta: 2,
    explicacion: 'Por cada uno de los 4 valores de i, el bucle interno corre 4 veces. Total: 4 × 4 = 16 ejecuciones. Por eso el costo es n² (con n = 4, son 16).'
  },
  {
    tipo: 'corregir',
    enunciado: 'El comentario que indica el costo es incorrecto. ¿En qué línea está el error?',
    lineas: [
      'for (int i = 0; i < n; i++) {',
      '    for (int j = 0; j < n; j++) {',
      '        // Costo total: O(n) porque hay un for adentro de otro.',
      '        comparar(arr[i], arr[j]);',
      '    }',
      '}'
    ],
    lineaError: 2,
    fix: '// Costo total: O(n²) porque los bucles anidados se multiplican (n × n).',
    explicacion: 'Los bucles anidados se MULTIPLICAN, no se suman: n × n = n² ⇒ O(n²). La suma (O(n)) corresponde a dos bucles uno después del otro, no a uno adentro del otro.'
  }
];
