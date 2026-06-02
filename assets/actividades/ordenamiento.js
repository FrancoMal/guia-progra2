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
    tipo: 'quiz',
    enunciado: 'De estos algoritmos, ¿cuál NO es in-place (necesita un arreglo auxiliar proporcional a n)?',
    opciones: ['Selección',
               'Inserción',
               'Mergesort',
               'Burbuja'],
    correcta: 2,
    explicacion: 'Mergesort necesita un arreglo auxiliar para combinar las mitades, por eso no es in-place. Selección, inserción y burbuja reusan el mismo arreglo.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Cuál de estas frases describe la idea de la inserción (insertion sort)?',
    opciones: ['En cada vuelta busca el mínimo del tramo no ordenado y lo pone al principio',
               'Toma cada elemento y lo inserta en su lugar dentro del tramo ya ordenado de la izquierda',
               'Compara pares adyacentes y los intercambia si están desordenados',
               'Elige un pivote y particiona el arreglo en menores y mayores'],
    correcta: 1,
    explicacion: 'La inserción agarra el elemento actual y lo encaja en el tramo ordenado de la izquierda, corriendo a la derecha los mayores. La opción 1 es selección, la 3 es burbuja y la 4 es quicksort.'
  },
  {
    tipo: 'quiz',
    enunciado: 'En quicksort, ¿qué hace la partición?',
    opciones: ['Divide el arreglo justo a la mitad por la posición',
               'Deja el pivote en su posición definitiva, con los menores a la izquierda y los mayores a la derecha',
               'Ordena por completo las dos mitades antes de combinarlas',
               'Recorre buscando el mínimo para llevarlo al frente'],
    correcta: 1,
    explicacion: 'Particionar reacomoda los elementos alrededor del pivote y lo deja en su lugar final; después se ordena cada lado por recursión. Partir a la mitad por posición es mergesort.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿En qué caso quicksort cae a su peor costo O(n²)?',
    opciones: ['Cuando el arreglo está totalmente desordenado',
               'Cuando los pivotes quedan muy desbalanceados (por ejemplo, un arreglo ya ordenado con pivote en el extremo)',
               'Cuando el arreglo tiene un número par de elementos',
               'Nunca: quicksort siempre es O(n log n)'],
    correcta: 1,
    explicacion: 'Si el pivote deja casi todo de un solo lado (caso típico: arreglo ya ordenado tomando el último como pivote), las particiones se desbalancean y el costo degenera a O(n²).'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Por qué mergesort garantiza O(n log n) incluso en el peor caso, a diferencia de quicksort?',
    opciones: ['Porque siempre divide el arreglo a la mitad, sin depender de un pivote',
               'Porque no usa recursión',
               'Porque es in-place y ahorra memoria',
               'Porque compara solo pares adyacentes'],
    correcta: 0,
    explicacion: 'Mergesort parte siempre por el medio, así que el árbol de recursión tiene altura log n pase lo que pase. Quicksort depende del pivote y puede desbalancearse.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Cuál es el MEJOR caso de la inserción y cuándo aparece?',
    opciones: ['O(n²), siempre',
               'O(n), cuando el arreglo ya está (casi) ordenado',
               'O(log n), cuando el arreglo es chico',
               'O(n log n), cuando el arreglo está al revés'],
    correcta: 1,
    explicacion: 'Si el arreglo ya está ordenado, el while interno no corre casi nunca y la inserción hace una sola pasada: O(n). Por eso es buena para arreglos casi ordenados.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Partiendo de [4, 2, 3, 1], ¿cómo queda el arreglo después de UNA pasada completa de burbuja (el for interno entero, j de 0 a n-2)?',
    codigo:
`// Estado inicial: [4, 2, 3, 1]
// Comparamos pares adyacentes: a[j] > a[j+1] ⇒ swap
// j = 0: a[0] con a[1]
// j = 1: a[1] con a[2]
// j = 2: a[2] con a[3]`,
    opciones: ['[2, 3, 1, 4]', '[1, 2, 3, 4]', '[2, 4, 3, 1]', '[1, 4, 3, 2]'],
    correcta: 0,
    explicacion: 'j=0: 4>2 ⇒ swap → [2,4,3,1]. j=1: 4>3 ⇒ swap → [2,3,4,1]. j=2: 4>1 ⇒ swap → [2,3,1,4]. Tras una pasada el mayor (4) burbujeó al final: [2, 3, 1, 4].'
  },
  {
    tipo: 'trazar',
    enunciado: 'Partiendo de [5, 2, 4, 1, 3], ¿cómo queda el arreglo después de la PRIMERA vuelta de selección (i = 0)?',
    codigo:
`// Estado inicial: [5, 2, 4, 1, 3]
// i = 0: buscamos el mínimo de todo el arreglo
//        y lo intercambiamos con la posición 0.`,
    opciones: ['[1, 2, 4, 5, 3]', '[2, 5, 4, 1, 3]', '[1, 2, 3, 4, 5]', '[1, 5, 4, 2, 3]'],
    correcta: 0,
    explicacion: 'El mínimo de [5,2,4,1,3] es 1 (índice 3). Se intercambia a[0] con a[3] y el resto queda igual: [5,2,4,1,3] ⇒ [1, 2, 4, 5, 3]. Solo el 5 y el 1 cambian de lugar; el arreglo todavía no está ordenado.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Partiendo de [4, 2, 3, 1], ¿cómo queda el arreglo después de la PRIMERA iteración de inserción (i = 1)?',
    codigo:
`// Estado inicial: [4, 2, 3, 1]
// i = 1: actual = a[1] = 2
// Corremos a la derecha los mayores que 'actual'
// y lo insertamos en su hueco.`,
    opciones: ['[2, 4, 3, 1]', '[2, 3, 4, 1]', '[1, 2, 3, 4]', '[2, 4, 1, 3]'],
    correcta: 0,
    explicacion: 'actual=2. j=0: a[0]=4 > 2 ⇒ corro: a[1]=4, j=-1. Inserto: a[0]=2. Queda [2, 4, 3, 1]. Solo se acomodó el segundo elemento dentro del tramo ordenado [4].'
  },
  {
    tipo: 'trazar',
    enunciado: 'Quicksort (esquema de Lomuto, pivote = último). Sobre [3, 5, 2, 1, 4] se llama particion(a, 0, 4) con pivote = 4. ¿Cómo queda el arreglo y dónde termina el pivote?',
    codigo:
`int pivote = a[hasta];   // a[4] = 4
int i = desde - 1;       // i = -1
for (int j = desde; j < hasta; j++) {
    if (a[j] <= pivote) { i++; swap(a, i, j); }
}
swap(a, i + 1, hasta);   // pivote a su lugar
return i + 1;`,
    opciones: ['[3, 2, 1, 4, 5], pivote en índice 3',
               '[1, 2, 3, 4, 5], pivote en índice 4',
               '[3, 5, 2, 1, 4], pivote en índice 4',
               '[2, 1, 3, 4, 5], pivote en índice 2'],
    correcta: 0,
    explicacion: 'pivote=4, i=-1. j=0: 3<=4 ⇒ i=0, swap(0,0) → [3,5,2,1,4]. j=1: 5<=4? no. j=2: 2<=4 ⇒ i=1, swap(1,2) → [3,2,5,1,4]. j=3: 1<=4 ⇒ i=2, swap(2,3) → [3,2,1,5,4]. Final: swap(i+1=3, 4) → [3, 2, 1, 4, 5]. Devuelve 3: el pivote 4 quedó en el índice 3, con menores a la izquierda.'
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
    tipo: 'costo',
    enunciado: 'La selección siempre busca el mínimo recorriendo todo el tramo restante, sin importar cómo venga el arreglo. ¿Cuál es su costo en el MEJOR caso (arreglo ya ordenado)?',
    codigo:
`static void seleccion(int[] a) {
    int n = a.length;
    for (int i = 0; i < n - 1; i++) {
        int min = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[min]) min = j;
        }
        swap(a, i, min);
    }
}`,
    opciones: ['O(n), porque ya está ordenado',
               'O(n log n)',
               'O(n²), igual que su peor caso',
               'O(1)'],
    correcta: 2,
    explicacion: 'La selección no tiene atajos: los dos bucles anidados se ejecutan completos siempre, esté ordenado o no. Por eso su mejor, promedio y peor caso son todos O(n²).'
  },
  {
    tipo: 'costo',
    enunciado: 'Mirá la tabla de costos. ¿Qué algoritmo tiene mejor caso O(n) pero peor caso O(n²)?',
    codigo:
`| Algoritmo  | Mejor      | Promedio   | Peor       |
| seleccion  | O(n²)      | O(n²)      | O(n²)      |
| insercion  | O(n)       | O(n²)      | O(n²)      |
| quicksort  | O(n log n) | O(n log n) | O(n²)      |
| mergesort  | O(n log n) | O(n log n) | O(n log n) |`,
    opciones: ['seleccion', 'insercion', 'quicksort', 'mergesort'],
    correcta: 1,
    explicacion: 'La inserción tiene mejor caso O(n) (arreglo casi ordenado) y peor caso O(n²) (al revés). Quicksort tiene peor caso O(n²) pero su mejor es O(n log n), no O(n).'
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
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas del cuerpo del while de inserción que corre los mayores a la derecha e inserta el valor actual.',
    lineas: [
      'while (j >= 0 && a[j] > actual) {',
      '    a[j + 1] = a[j];',
      '    j--;',
      '}',
      'a[j + 1] = actual;'
    ],
    explicacion: 'Mientras haya elementos mayores que actual, los corremos un lugar a la derecha (a[j+1] = a[j]) y bajamos j. Al salir del while, j+1 es el hueco donde va el valor actual.'
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
  },
  {
    tipo: 'corregir',
    enunciado: 'Esta burbuja ordena al revés (de mayor a menor) en vez de menor a mayor. ¿En qué línea está el error?',
    lineas: [
      'static void burbuja(int[] a) {',
      '    int n = a.length;',
      '    for (int i = 0; i < n - 1; i++) {',
      '        for (int j = 0; j < n - 1 - i; j++) {',
      '            if (a[j] < a[j + 1]) {',
      '                swap(a, j, j + 1);',
      '            }',
      '        }',
      '    }',
      '}'
    ],
    lineaError: 4,
    fix: 'if (a[j] > a[j + 1]) {',
    explicacion: 'La comparación está invertida: con a[j] < a[j+1] manda los chicos al final y ordena de mayor a menor. Para ordenar de menor a mayor hay que intercambiar cuando a[j] > a[j+1].'
  }
];
