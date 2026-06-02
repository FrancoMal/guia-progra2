/* Actividades de práctica — Ordenamiento. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  {
    tipo: 'quiz',
    enunciado: '¿Cuáles de estos algoritmos tienen costo promedio O(n log n)?',
    opciones: ['Selección e inserción',
               'Burbuja y selección',
               'Quicksort y mergesort'],
    correcta: 2,
    explicacion: 'Quicksort y mergesort usan dividir y vencer y promedian O(n log n). Selección, inserción y burbuja son cuadráticos O(n²).'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de burbuja en el peor caso? (un for adentro de otro for)',
    codigo:
`static void burbuja(int[] a) {
    int n = a.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                swap(a, j, j + 1);
            }
        }
    }
}`,
    opciones: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
    correcta: 3,
    explicacion: 'Son dos bucles anidados que recorren el arreglo: aproximadamente n por n comparaciones ⇒ O(n²).'
  },
  {
    tipo: 'trazar',
    enunciado: 'Partiendo de [3, 1, 2], ¿cómo queda el arreglo después de UNA sola pasada de burbuja (el for interno completo)?',
    codigo:
`// Estado inicial: [3, 1, 2]
// Comparamos pares adyacentes (a[j] > a[j+1] ⇒ swap)
// j = 0: comparar a[0] con a[1]
// j = 1: comparar a[1] con a[2]`,
    opciones: ['[1, 2, 3]', '[1, 3, 2]', '[2, 1, 3]'],
    correcta: 0,
    explicacion: 'j=0: 3 > 1 ⇒ swap → [1, 3, 2]. j=1: 3 > 2 ⇒ swap → [1, 2, 3]. Tras una pasada queda [1, 2, 3] y el mayor (3) burbujeó al final. (En este caso queda ordenado de casualidad, pero el resultado de la primera pasada es [1, 2, 3]).'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas para intercambiar a[i] con a[j] usando una variable temporal.',
    lineas: [
      'int tmp = a[i];',
      'a[i] = a[j];',
      'a[j] = tmp;'
    ],
    explicacion: 'Primero guardamos a[i] en tmp para no perderlo, después pisamos a[i] con a[j] y, por último, ponemos el valor guardado en a[j]. Si cambiás el orden, se pierde uno de los dos valores.'
  },
  {
    tipo: 'corregir',
    enunciado: 'Este selección tiene un error en el límite del bucle interno. ¿En qué línea está?',
    lineas: [
      'static void seleccion(int[] a) {',
      '    int n = a.length;',
      '    for (int i = 0; i < n - 1; i++) {',
      '        int min = i;',
      '        for (int j = i + 1; j <= n; j++) {',
      '            if (a[j] < a[min]) min = j;',
      '        }',
      '        swap(a, i, min);',
      '    }',
      '}'
    ],
    lineaError: 4,
    fix: 'for (int j = i + 1; j < n; j++) {',
    explicacion: 'Con j <= n el bucle llega a j = n y accede a a[n], que no existe (los índices válidos van de 0 a n-1): salta ArrayIndexOutOfBoundsException. La condición correcta es j < n.'
  }
];
