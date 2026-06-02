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
    tipo: 'quiz',
    enunciado: '¿Qué describe la notación Big-O de un algoritmo?',
    opciones: ['El tiempo exacto en segundos que tarda',
               'Cómo crece el costo según el tamaño de la entrada, en el peor caso',
               'La cantidad de memoria que ocupa el programa',
               'El mejor caso posible del algoritmo'],
    correcta: 1,
    explicacion: 'Big-O no mide segundos ni memoria: describe el ritmo de crecimiento del costo a medida que crece n, y lo hace para el peor caso.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Un algoritmo hace 5n² + 100n + 30 operaciones. ¿Cuál es su complejidad?',
    opciones: ['O(n)', 'O(100n)', 'O(n²)', 'O(5n²)'],
    correcta: 2,
    explicacion: 'Nos quedamos con el término que más crece (n²) y borramos constantes y términos menores. 5n² + 100n + 30 ⇒ O(n²).'
  },
  {
    tipo: 'quiz',
    enunciado: 'De los siguientes órdenes, ¿cuál crece MÁS RÁPIDO cuando n se hace grande?',
    opciones: ['O(log n)', 'O(n)', 'O(n²)', 'O(1)'],
    correcta: 2,
    explicacion: 'De mejor (más lento en crecer) a peor: O(1) → O(log n) → O(n) → O(n²). De esta lista, O(n²) es el que crece más rápido.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Cuál de estas afirmaciones es correcta sobre las constantes en Big-O?',
    opciones: ['O(2n) es peor que O(n) porque hace el doble de trabajo',
               'O(2n) = O(n): la constante no cambia el orden',
               'O(n/2) es mejor que O(n) y por eso es O(log n)',
               'O(100n) es O(n²) porque 100 es un número grande'],
    correcta: 1,
    explicacion: 'Las constantes que multiplican no cambian el orden: O(2n) = O(n/2) = O(100n) = O(n). Lo único que importa es cómo crece, no el factor que lo multiplica.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Una búsqueda lineal puede encontrar el valor en el primer intento. Aun así, ¿cuál es su complejidad?',
    opciones: ['O(1), porque a veces lo encuentra enseguida',
               'O(log n), porque va descartando elementos',
               'O(n), porque en el peor caso recorre todo',
               'O(n²), porque compara todos contra todos'],
    correcta: 2,
    explicacion: 'Encontrarlo en el primer intento es el mejor caso (O(1)), pero Big-O describe el PEOR caso: si el valor no está o está al final, recorre los n elementos ⇒ O(n).'
  },
  {
    tipo: 'quiz',
    enunciado: 'Dos bloques de código se ejecutan uno después del otro: el primero es O(n) y el segundo también es O(n). ¿Cuál es el costo total?',
    opciones: ['O(n²), porque se multiplican', 'O(n), porque O(n) + O(n) = O(2n) = O(n)', 'O(2n²)', 'O(log n)'],
    correcta: 1,
    explicacion: 'En secuencia los costos se SUMAN: O(n) + O(n) = O(2n), y como las constantes se descartan, queda O(n). La multiplicación es solo cuando un bucle está adentro de otro.'
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
    tipo: 'costo',
    enunciado: '¿Cuál es la complejidad de estos tres bucles anidados?',
    codigo:
`for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        for (int k = 0; k < n; k++) {
            contar++;
        }
    }
}`,
    opciones: ['O(n²)', 'O(3n)', 'O(n³)', 'O(n log n)'],
    correcta: 2,
    explicacion: 'Tres bucles de n anidados se multiplican: n × n × n = n³. El cuerpo corre n³ veces ⇒ O(n³).'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es la complejidad de este bucle, donde i se divide a la mitad en cada vuelta?',
    codigo:
`int i = n;
while (i > 1) {
    System.out.println(i);
    i = i / 2;
}`,
    opciones: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correcta: 1,
    explicacion: 'En cada vuelta i se parte a la mitad (n → n/2 → n/4 → ...), así que la cantidad de pasos es log₂(n) ⇒ O(log n). Dividir a la mitad en cada paso es la firma de O(log n).'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es la complejidad TOTAL de estos dos bucles, que están uno después del otro (no anidados)?',
    codigo:
`for (int i = 0; i < n; i++) {
    System.out.println(i);
}
for (int j = 0; j < n; j++) {
    System.out.println(j);
}`,
    opciones: ['O(n²)', 'O(n)', 'O(2n²)', 'O(log n)'],
    correcta: 1,
    explicacion: 'Los bucles están en secuencia, no anidados: sus costos se SUMAN. O(n) + O(n) = O(2n) = O(n). Solo se multiplica cuando uno está adentro del otro.'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es la complejidad de acceder al elemento de la mitad de un arreglo?',
    codigo:
`int medio = arr[n / 2];
return medio;`,
    opciones: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correcta: 0,
    explicacion: 'Acceder a una posición de un arreglo por su índice es un costo fijo, no depende de n: O(1). No hay ningún bucle que recorra los datos.'
  },
  {
    tipo: 'costo',
    enunciado: 'En este bucle interno j arranca en i, no en 0. ¿Cuál es la complejidad?',
    codigo:
`for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {
        comparar(arr[i], arr[j]);
    }
}`,
    opciones: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correcta: 2,
    explicacion: 'Aunque el interno hace menos vueltas (n + (n-1) + ... + 1 ≈ n²/2 comparaciones), sigue siendo proporcional a n². Descartando la constante 1/2 ⇒ O(n²).'
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
    tipo: 'trazar',
    enunciado: 'Con n = 16, ¿cuántas veces se ejecuta el println? (i se divide a la mitad en cada vuelta)',
    codigo:
`int i = n;
while (i > 1) {
    System.out.println(i);
    i = i / 2;
}`,
    opciones: ['16', '8', '4', '2'],
    correcta: 2,
    explicacion: 'i toma los valores 16 → 8 → 4 → 2, y con i = 1 el while corta. Imprime en 16, 8, 4 y 2: son 4 veces, que es log₂(16) = 4. Esto muestra por qué el costo es O(log n).'
  },
  {
    tipo: 'trazar',
    enunciado: 'Con n = 5, ¿cuántas veces se ejecuta la línea suma += i?',
    codigo:
`int suma = 0;
for (int i = 0; i < n; i++) {
    suma += i;
}`,
    opciones: ['4', '5', '6', '10'],
    correcta: 1,
    explicacion: 'El bucle va con i = 0, 1, 2, 3, 4 (mientras i < 5): son 5 iteraciones. La línea se ejecuta n veces, por eso el costo es O(n).'
  },
  {
    tipo: 'quiz',
    enunciado: 'En el vocabulario C / L / P de la cátedra, ¿qué clasificación le corresponde a este bucle?',
    codigo:
`for (int i = 0; i < 5; i++) {
    System.out.println(i);
}`,
    opciones: ['L (lineal), porque hay un for que recorre',
               'C (constante), porque el tope es fijo y no depende de n',
               'P (polinómico), porque imprime varias veces',
               'L (lineal), porque hace 5 vueltas'],
    correcta: 1,
    explicacion: 'La complejidad depende del TAMAÑO de la entrada (n), no del número literal de vueltas. Este for siempre hace 5 iteraciones pase lo que pase con n, así que es C (constante) ≈ O(1). Sería L (lineal) si el tope fuera n.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Según el vocabulario C / L / P, ¿cuál de estas equivalencias con Big-O es la correcta?',
    opciones: ['C ≈ O(n), L ≈ O(n²), P ≈ O(1)',
               'C ≈ O(1), L ≈ O(n), P ≈ O(n²) o más',
               'C ≈ O(log n), L ≈ O(n log n), P ≈ O(2ⁿ)',
               'C ≈ O(n²), L ≈ O(n), P ≈ O(1)'],
    correcta: 1,
    explicacion: 'C (constante) ≈ O(1): el costo no depende de n. L (lineal) ≈ O(n): recorre la entrada una vez. P (polinómico) ≈ O(n²) o más (O(n³), …): bucles anidados sobre n.'
  },
  {
    tipo: 'costo',
    enunciado: 'Aplicando la técnica paso a paso, ¿cuál es la complejidad de este método? (el if con throw está antes del bucle)',
    codigo:
`int primero(int[] arr, int n) {
    if (n == 0) {
        throw new RuntimeException("vacío");
    }
    for (int i = 0; i < n; i++) {
        if (arr[i] > 0) return i;
    }
    return -1;
}`,
    opciones: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
    correcta: 1,
    explicacion: 'El if con throw es O(1) (la condición es O(1) y el throw también). El for es O(n) y su cuerpo es O(1). Sumando las partes en secuencia, O(1) + O(n) = O(n): gana el término dominante.'
  },
  {
    tipo: 'costo',
    enunciado: 'Hay un bucle simple y, después, dos bucles anidados. ¿Cuál es la complejidad TOTAL?',
    codigo:
`for (int i = 0; i < n; i++) {
    suma += arr[i];
}
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        comparar(arr[i], arr[j]);
    }
}`,
    opciones: ['O(n)', 'O(n²)', 'O(n³)', 'O(n + n²)'],
    correcta: 1,
    explicacion: 'El primer bloque es O(n) y el segundo (anidados) es O(n²). Están en secuencia, así que se SUMAN: O(n) + O(n²), y gana el término dominante ⇒ O(n²).'
  },
  {
    tipo: 'costo',
    enunciado: 'Caso engañoso: los dos while comparten la misma i, que NO se reinicia. ¿Cuál es la complejidad?',
    codigo:
`int i = 0;
int maxSeq = 0;
while (i < n) {
    int largo = 0;
    while (i < n && arr[i] == 1) {
        largo++;
        i++;
    }
    if (largo > maxSeq) maxSeq = largo;
    i++;
}`,
    opciones: ['O(n²), porque hay dos while anidados',
               'O(n), porque i avanza en total n veces entre los dos while',
               'O(log n), porque algo se divide',
               'O(1), porque maxSeq es una sola variable'],
    correcta: 1,
    explicacion: 'Aunque los while estén anidados, comparten la misma i y NUNCA la reinician: i pasa una sola vez por cada valor de 0 a n. Sumando todas las vueltas de ambos while, i avanza n veces en total ⇒ O(n), no O(n²).'
  },
  {
    tipo: 'costo',
    enunciado: 'Costo ESPACIAL: ¿cuánta memoria extra usa esta versión recursiva del factorial?',
    codigo:
`int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
    opciones: ['O(1) espacial, usa pocas variables',
               'O(n) espacial, apila una llamada por cada nivel',
               'O(n²) espacial',
               'O(log n) espacial'],
    correcta: 1,
    explicacion: 'Cada llamada recursiva queda apilada hasta llegar al caso base: conviven n llamadas a la vez (factorial(n), factorial(n-1), …). El costo espacial es O(profundidad) = O(n). La versión iterativa con un for sería O(1) espacial.'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená los pasos de la técnica para calcular el costo de un método con if y bucles, de lo primero a lo último.',
    lineas: [
      'Recorrer el código por partes, anotando el costo de cada bloque.',
      'En cada if, sumar la condición y quedarse con el peor de las dos ramas (throw y return son O(1)).',
      'Tachar las constantes y las ramas baratas (O(1)).',
      'Al anidar bucles, multiplicar sus costos.',
      'Al sumar partes en secuencia, quedarse con el término dominante.'
    ],
    explicacion: 'Primero se descompone el método, luego se resuelve cada if (condición + peor rama), se tachan las constantes, se multiplican los bucles anidados y, al final, se suma todo quedándose con el término que más crece.'
  }
];
