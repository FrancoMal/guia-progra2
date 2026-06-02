/* Actividades de práctica — Diccionario Simple. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  {
    tipo: 'quiz',
    enunciado: '¿Cuál es la relación entre claves y valores en un diccionario simple?',
    opciones: ['Cada clave puede tener varios valores asociados',
               'Cada clave tiene un único valor y no hay claves repetidas',
               'Cada valor identifica a una sola clave'],
    correcta: 1,
    explicacion: 'Un diccionario simple asocia cada clave con UN valor (clave → valor). Las claves no se repiten: cada clave identifica a lo sumo un valor.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿En qué se diferencia un diccionario simple de un diccionario múltiple?',
    opciones: ['En el simple cada clave tiene un valor; en el múltiple una clave puede tener varios valores',
               'El simple no permite eliminar claves y el múltiple sí',
               'El simple guarda solo enteros y el múltiple guarda cualquier tipo',
               'No hay diferencia, son dos nombres para lo mismo'],
    correcta: 0,
    explicacion: 'La diferencia está en la cardinalidad clave→valor. En el simple cada clave apunta a UN valor (agregar sobre una clave existente actualiza). En el múltiple una misma clave puede acumular varios valores.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿En qué se diferencia un diccionario simple de un conjunto?',
    opciones: ['El conjunto ordena sus elementos y el diccionario no',
               'El conjunto guarda solo elementos (pertenencia); el diccionario asocia a cada clave un valor',
               'El diccionario permite repetidos y el conjunto no',
               'Son equivalentes: ambos guardan pares clave-valor'],
    correcta: 1,
    explicacion: 'Un conjunto solo registra qué elementos pertenecen (sin valor asociado). Un diccionario va más allá: a cada clave le asocia un valor. De hecho claves() devuelve un ConjuntoTDA, justamente porque las claves del diccionario forman un conjunto.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué devuelve el método claves() del TDA Diccionario Simple?',
    codigo:
`public interface DiccionarioSimpleTDA {
    void inicializarDiccionario();
    void agregar(int clave, int x);
    void eliminar(int clave);
    int recuperar(int clave);
    ConjuntoTDA claves();
}`,
    opciones: ['Un entero con la cantidad de claves cargadas',
               'Un ConjuntoTDA con todas las claves del diccionario',
               'El valor asociado a la primera clave',
               'Un ConjuntoTDA con todos los valores cargados'],
    correcta: 1,
    explicacion: 'claves() devuelve un ConjuntoTDA con todas las claves (no los valores). Sirve para recorrer el diccionario o validar que una clave exista antes de recuperar.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué pasa si se hace agregar(clave, x) sobre una clave que YA existe en el diccionario?',
    opciones: ['Se agrega un segundo nodo con la misma clave',
               'Se reemplaza el valor viejo por el nuevo (se actualiza)',
               'Lanza una excepción porque la clave está repetida',
               'No hace nada: ignora el segundo agregar'],
    correcta: 1,
    explicacion: 'agregar primero busca la clave. Si ya existe, NO crea un nodo nuevo: solo le reasigna el valor. Así la clave nunca queda duplicada y el diccionario sigue teniendo un único valor por clave.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Cuál es la precondición de recuperar(clave) y qué pasa si no se cumple en la versión con lista dinámica?',
    codigo:
`public int recuperar(int clave) {
    Nodo nodo = clave2Nodo(clave);   // devuelve null si la clave no está
    return nodo.valor;
}`,
    opciones: ['No tiene precondición: si la clave no está, devuelve 0',
               'La clave debe existir; si no, clave2Nodo devuelve null y revienta con NullPointerException',
               'La clave debe existir; si no, devuelve -1',
               'El diccionario debe estar vacío'],
    correcta: 1,
    explicacion: 'recuperar exige que la clave exista. Si no existe, clave2Nodo devuelve null y al hacer nodo.valor se produce un NullPointerException. Por eso conviene validar antes con claves().'
  },
  {
    tipo: 'quiz',
    enunciado: 'En agregar(int clave, int x), ¿qué representa cada parámetro?',
    opciones: ['x es la clave y clave es el valor',
               'clave es la clave (el identificador) y x es el valor asociado',
               'Ambos son claves y el valor se genera solo',
               'clave es la posición en la lista y x es el valor'],
    correcta: 1,
    explicacion: 'El primer parámetro es la clave (el identificador, por ejemplo el legajo) y el segundo es el valor asociado. Invertirlos guarda los datos cruzados y después recuperar devuelve cualquier cosa.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre un diccionario vacío. ¿Qué devuelve recuperar(1) al final?',
    codigo:
`d.inicializarDiccionario();
d.agregar(1, 10);
d.agregar(1, 20);
// recuperar(1)`,
    opciones: ['10', '20', '30 (10 + 20)'],
    correcta: 1,
    explicacion: 'La clave 1 no se duplica. El segundo agregar(1, 20) encuentra que la clave 1 ya existe y actualiza su valor de 10 a 20. recuperar(1) devuelve 20.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre un diccionario vacío. ¿Qué devuelve recuperar(2) al final?',
    codigo:
`d.inicializarDiccionario();
d.agregar(1, 10);
d.agregar(2, 20);
d.eliminar(1);
// recuperar(2)`,
    opciones: ['10', '20', 'Lanza una excepción: la clave 2 ya no existe'],
    correcta: 1,
    explicacion: 'agregar(1,10) y agregar(2,20) cargan dos claves. eliminar(1) solo borra la clave 1; la clave 2 sigue intacta con su valor 20. recuperar(2) devuelve 20.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre un diccionario vacío. ¿Cuántas claves tiene el diccionario al final (tamaño de claves())?',
    codigo:
`d.inicializarDiccionario();
d.agregar(5, 1);
d.agregar(3, 1);
d.agregar(5, 9);
d.agregar(7, 1);
// cantidad de claves`,
    opciones: ['2', '3', '4'],
    correcta: 1,
    explicacion: 'Las claves distintas son 5, 3 y 7. El agregar(5, 9) NO suma una clave nueva: la clave 5 ya existía, así que solo actualizó su valor. Quedan 3 claves.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre un diccionario vacío. ¿Qué devuelve recuperar(2) al final?',
    codigo:
`d.inicializarDiccionario();
d.agregar(2, 100);
d.agregar(4, 200);
d.agregar(2, 300);
// recuperar(2)`,
    opciones: ['100', '200', '300'],
    correcta: 2,
    explicacion: 'agregar(2,100) carga la clave 2. agregar(4,200) carga otra clave. agregar(2,300) encuentra que la clave 2 ya existe y actualiza su valor a 300. recuperar(2) devuelve 300.'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de recuperar(clave) en la implementación con lista dinámica?',
    codigo:
`public int recuperar(int clave) {
    Nodo nodo = clave2Nodo(clave);   // recorre la lista buscando la clave
    return nodo.valor;
}`,
    opciones: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
    correcta: 1,
    explicacion: 'recuperar usa clave2Nodo, que recorre la lista buscando la clave. En el peor caso la mira entera: O(n).'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de agregar(clave, x) en la implementación con lista dinámica?',
    codigo:
`public void agregar(int clave, int x) {
    Nodo nuevo = clave2Nodo(clave);   // primero busca si la clave ya está
    if (nuevo == null) {
        nuevo = new Nodo();
        nuevo.clave = clave;
        nuevo.sig = inicio;
        inicio = nuevo;
    }
    nuevo.valor = x;
}`,
    opciones: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
    correcta: 1,
    explicacion: 'Aunque insertar adelante es O(1), agregar primero llama a clave2Nodo para no duplicar la clave, y esa búsqueda recorre la lista. El costo lo domina la búsqueda: O(n).'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de eliminar(clave) en la implementación con lista dinámica?',
    codigo:
`public void eliminar(int clave) {
    if (inicio != null)
        if (inicio.clave == clave) {
            inicio = inicio.sig;
        } else {
            Nodo turista = inicio;
            while (turista.sig != null && turista.sig.clave != clave)
                turista = turista.sig;
            if (turista.sig != null)
                turista.sig = turista.sig.sig;
        }
}`,
    opciones: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
    correcta: 1,
    explicacion: 'eliminar recorre la lista con el turista buscando el nodo previo al que hay que borrar. En el peor caso llega al final: O(n).'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas de clave2Nodo(clave): recorre la lista con el turista hasta encontrar la clave y devuelve su nodo (o null).',
    lineas: [
      'Nodo turista = inicio;',
      'while (turista != null && turista.clave != clave)',
      '    turista = turista.sig;',
      'return turista;'
    ],
    explicacion: 'El turista arranca en inicio; avanza mientras no se acabe la lista y la clave no coincida; cuando para, devuelve el nodo encontrado (o null si llegó al final sin encontrarla).'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená el cuerpo de agregar(clave, x) (lista dinámica): debe actualizar si la clave existe y crear el nodo solo si no existe.',
    lineas: [
      'Nodo nuevo = clave2Nodo(clave);',
      'if (nuevo == null) {',
      '    nuevo = new Nodo();',
      '    nuevo.clave = clave;',
      '    nuevo.sig = inicio;',
      '    inicio = nuevo;',
      '}',
      'nuevo.valor = x;'
    ],
    explicacion: 'Primero se busca la clave con clave2Nodo. Si no existe (null) se crea el nodo y se engancha al inicio. La asignación del valor va al final, fuera del if: así actualiza si la clave existía y carga el valor si recién se creó.'
  },
  {
    tipo: 'mapear',
    enunciado: 'Relacioná cada operación del Diccionario Simple (español, Wehbe) con su equivalente en inglés (Monzón). OJO: en Monzón, remove pide clave Y valor; y según el apéndice recuperar puede ser getValue(k) o get(k).',
    pares: [
      ['agregar(c, v)', 'add(k, v)'],
      ['eliminar(c)', 'remove(k, v)'],
      ['recuperar(c)', 'getValue(k)'],
      ['claves()', 'getKeys(): Set']
    ],
    explicacion: 'add(k,v) es agregar (upsert). remove(k,v) es eliminar, pero en Monzón pide clave y valor. getValue(k) (o get(k) según el apéndice) es recuperar. getKeys():Set es claves(): como el Dictionary no tiene containsKey, la existencia de una clave se chequea recorriendo ese Set.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Sobre un diccionario con la clave 7 ya cargada con valor 100, se hace eliminar(99) (clave que NO existe) y después agregar(7, 500). ¿Qué pasa?',
    opciones: ['eliminar(99) lanza una excepción porque la clave 99 no existe',
               'eliminar(99) no hace nada (no es error) y agregar(7, 500) sobreescribe el valor de la clave 7 a 500',
               'agregar(7, 500) crea un segundo nodo con clave 7, así que quedan dos claves 7',
               'agregar(7, 500) lanza una excepción porque la clave 7 ya existe'],
    correcta: 1,
    explicacion: 'Eliminar una clave inexistente NO es error: eliminar(99) simplemente termina sin tocar nada. agregar es un upsert: como la clave 7 ya existe, no la duplica, solo reemplaza su valor 100 por 500.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre un diccionario vacío. ¿Qué devuelve recuperar(8) al final?',
    codigo:
`d.inicializarDiccionario();
d.agregar(8, 70);
d.agregar(8, 90);   // "modificar" = volver a agregar
d.eliminar(4);      // la clave 4 no existe
// recuperar(8)`,
    opciones: ['70', '90', 'Lanza una excepción: la clave 8 fue eliminada'],
    correcta: 1,
    explicacion: 'agregar(8,70) carga la clave 8. agregar(8,90) es un upsert: la clave 8 ya existía, así que solo actualiza su valor a 90. eliminar(4) no hace nada porque la clave 4 nunca se cargó (no es error). recuperar(8) devuelve 90.'
  }
];
