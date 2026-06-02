/* Actividades de práctica — Diccionario Múltiple. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  {
    tipo: 'quiz',
    enunciado: '¿En qué se diferencia un diccionario múltiple de un diccionario simple?',
    opciones: ['En el simple cada clave guarda un solo valor; en el múltiple cada clave guarda un conjunto de valores',
               'En el múltiple las claves pueden repetirse; en el simple no',
               'No hay diferencia: cambia solo el nombre de la estructura'],
    correcta: 0,
    explicacion: 'El diccionario simple asocia clave → 1 valor. El múltiple generaliza eso: clave → un conjunto de valores (varios valores por clave, sin repetidos).'
  },
  {
    tipo: 'quiz',
    enunciado: 'Los valores asociados a una misma clave en un diccionario múltiple forman un conjunto. ¿Qué implica eso?',
    opciones: ['Que pueden repetirse pero quedan ordenados de menor a mayor',
               'Que no hay valores repetidos y no importa el orden',
               'Que la clave solo puede tener como máximo un valor'],
    correcta: 1,
    explicacion: 'Un conjunto no admite elementos repetidos ni define un orden. Por eso agregar dos veces el mismo valor a una clave deja un único ejemplar.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué hace agregar(clave, valor) si la clave todavía no existe en el diccionario?',
    opciones: ['Lanza una excepción porque la clave no está',
               'No hace nada y deja el diccionario igual',
               'Crea la clave y le agrega ese valor como primer elemento de su conjunto'],
    correcta: 2,
    explicacion: 'agregar resuelve la clave con clave2NodoClave; si devuelve null, crea un NodoClave nuevo y recién después le suma el valor. Una clave siempre nace con al menos un valor.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué devuelve recuperar(clave) cuando la clave NO existe en el diccionario?',
    opciones: ['null',
               'Un conjunto vacío',
               'Lanza una excepción de clave inexistente'],
    correcta: 1,
    explicacion: 'recuperar arma un ConjuntoTDA, busca la clave y solo la llena si la encuentra. Si no existe, devuelve el conjunto vacío sin romper.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Cuál es la diferencia entre eliminar(clave) y eliminarValor(clave, valor)?',
    opciones: ['eliminar borra la clave entera con todos sus valores; eliminarValor saca un solo valor del conjunto de esa clave',
               'Son equivalentes: las dos borran toda la clave',
               'eliminar saca un valor; eliminarValor borra la clave entera'],
    correcta: 0,
    explicacion: 'eliminar(clave) quita el NodoClave completo (y con él todos sus valores). eliminarValor(clave, valor) solo saca ese valor del conjunto de la clave.'
  },
  {
    tipo: 'quiz',
    enunciado: 'En eliminarValor, si al sacar el valor la clave queda con el conjunto vacío, ¿qué pasa según esta implementación?',
    codigo:
`public void eliminarValor(int clave, int valor) {
    NodoClave nodo = clave2NodoClave(clave);
    // ... saca el valor de nodo.valores ...
    if (nodo.valores == null)
        this.eliminar(clave);
}`,
    opciones: ['Queda una clave "fantasma" sin valores',
               'Se elimina la clave entera del diccionario',
               'Se vuelve a agregar el valor automáticamente'],
    correcta: 1,
    explicacion: 'La convención es que una clave sin valores no tiene sentido. Si nodo.valores quedó en null, se llama a eliminar(clave) para borrarla del todo.'
  },
  {
    tipo: 'quiz',
    enunciado: 'En agregar(int clave, int valor), ¿por qué importa el orden de los parámetros?',
    opciones: ['No importa: agregar(7, 2) y agregar(2, 7) hacen lo mismo',
               'El primero es la clave y el segundo el valor; invertirlos guarda los datos en el lugar equivocado y no da error de compilación',
               'Importa solo si la clave ya existía'],
    correcta: 1,
    explicacion: 'Ambos son int, así que invertirlos compila igual. Pero agregar(7, 2) mete 2 en la clave 7, mientras que agregar(2, 7) mete 7 en la clave 2: estructura distinta.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Sobre un diccionario múltiple vacío se ejecuta esta secuencia. ¿Cuántos valores tiene recuperar(1) al final?',
    codigo:
`d.inicializarDiccionario();
d.agregar(1, 10);
d.agregar(1, 20);
d.agregar(1, 10);
// recuperar(1)`,
    opciones: ['1', '2', '3'],
    correcta: 1,
    explicacion: 'Los valores de una clave forman un conjunto. agregar(1,10) → {10}; agregar(1,20) → {20,10}; agregar(1,10) no agrega nada porque el 10 ya está. Quedan 2 valores.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Sobre un diccionario múltiple vacío se ejecuta esta secuencia. ¿Cuántas claves tiene el diccionario al final (tamaño de claves())?',
    codigo:
`d.inicializarDiccionario();
d.agregar(5, 1);
d.agregar(3, 1);
d.agregar(5, 2);
d.agregar(8, 9);
// claves()`,
    opciones: ['2', '3', '4'],
    correcta: 1,
    explicacion: 'Las claves distintas son 5, 3 y 8. agregar(5,2) suma un valor a una clave que ya existía, no crea clave nueva. Quedan 3 claves.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Sobre un diccionario múltiple vacío se ejecuta esta secuencia. ¿Cuántos valores tiene recuperar(7) al final?',
    codigo:
`d.inicializarDiccionario();
d.agregar(7, 4);
d.agregar(7, 9);
d.agregar(7, 4);
d.agregar(7, 1);
d.agregar(2, 4);
// recuperar(7)`,
    opciones: ['2', '3', '4'],
    correcta: 1,
    explicacion: 'En la clave 7: agrega 4, 9, después 4 (repetido, se ignora) y 1. Quedan {4,9,1} = 3 valores. El agregar(2,4) toca otra clave y no afecta a la 7.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Recordá que agregar inserta cada valor nuevo AL INICIO de la lista de valores de la clave. Tras esta secuencia, ¿en qué orden recorre la lista nodo.valores de la clave 1 (del primero al último)?',
    codigo:
`d.inicializarDiccionario();
d.agregar(1, 10);
d.agregar(1, 20);
d.agregar(1, 30);
// recorrido de la lista interna de la clave 1`,
    opciones: ['10, 20, 30', '30, 20, 10', '20, 10, 30'],
    correcta: 1,
    explicacion: 'Cada valor nuevo se engancha adelante (nuevo.sigValor = nodo.valores; nodo.valores = nuevo). El último en entrar queda primero: 30, 20, 10. Como conjunto da igual, pero la lista física queda invertida.'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de agregar(clave, valor) en la implementación con lista dinámica (n claves, m valores por clave)?',
    codigo:
`public void agregar(int clave, int valor) {
    NodoClave nodo = clave2NodoClave(clave);   // ubica la clave
    if (nodo == null) { /* crea la clave */ }
    NodoValor turista = nodo.valores;          // recorre los valores
    while (turista != null && turista.valor != valor)
        turista = turista.sigValor;
    if (turista == null) { /* agrega el valor */ }
}`,
    opciones: ['O(1)', 'O(n + m)', 'O(n²)', 'O(log n)'],
    correcta: 1,
    explicacion: 'Primero ubica la clave recorriendo la lista de claves: O(n). Después recorre el conjunto de valores de esa clave para no duplicar: O(m). En total O(n + m).'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de clave2NodoClave(clave) con n claves y m valores por clave?',
    codigo:
`private NodoClave clave2NodoClave(int clave) {
    NodoClave turista = inicio;
    while (turista != null && turista.clave != clave)
        turista = turista.sigClave;
    return turista;
}`,
    opciones: ['O(1)', 'O(m)', 'O(n)', 'O(n + m)'],
    correcta: 2,
    explicacion: 'Solo recorre la lista de CLAVES (sigClave), nunca entra a los valores. En el peor caso mira las n claves: O(n).'
  },
  {
    tipo: 'costo',
    enunciado: 'recuperar(clave) ubica la clave y vuelca sus m valores en un ConjuntoTDA, cuyo agregar chequea repetidos y es lineal. ¿Cuál es el costo total (n claves, m valores)?',
    codigo:
`public ConjuntoTDA recuperar(int clave) {
    ConjuntoTDA valores = new ConjuntoAR();
    valores.inicializarConjunto();
    NodoClave nodo = clave2NodoClave(clave);   // O(n)
    if (nodo != null) {
        NodoValor turista = nodo.valores;
        while (turista != null) {
            valores.agregar(turista.valor);    // agregar del conjunto: O(m)
            turista = turista.sigValor;
        }
    }
    return valores;
}`,
    opciones: ['O(n + m)', 'O(n + m²)', 'O(1)', 'O(n²)'],
    correcta: 1,
    explicacion: 'Ubicar la clave es O(n). Después, por cada uno de los m valores se llama al agregar del conjunto, que es O(m) porque chequea repetidos: m·O(m) = O(m²). Total: O(n + m²).'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas del cuerpo de agregar(clave, valor) (lista dinámica): hay que resolver la clave y recién después agregar el valor a su conjunto sin duplicar.',
    lineas: [
      'NodoClave nodo = clave2NodoClave(clave);',
      'if (nodo == null) { nodo = new NodoClave(); nodo.clave = clave; nodo.sigClave = inicio; inicio = nodo; }',
      'NodoValor turista = nodo.valores;',
      'while (turista != null && turista.valor != valor) turista = turista.sigValor;',
      'if (turista == null) { NodoValor nuevo = new NodoValor(); nuevo.valor = valor; nuevo.sigValor = nodo.valores; nodo.valores = nuevo; }'
    ],
    explicacion: 'Primero se ubica la clave y, si no existe, se la crea. Recién con la clave resuelta se recorre su conjunto de valores; solo si el valor no estaba (turista == null) se lo agrega adelante, evitando repetidos.'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas del cuerpo de recuperar(clave) (lista dinámica): arma el conjunto, ubica la clave y vuelca sus valores.',
    lineas: [
      'ConjuntoTDA valores = new ConjuntoAR();',
      'valores.inicializarConjunto();',
      'NodoClave nodo = clave2NodoClave(clave);',
      'NodoValor turista = nodo.valores;',
      'while (turista != null) { valores.agregar(turista.valor); turista = turista.sigValor; }',
      'return valores;'
    ],
    explicacion: 'Primero se crea e inicializa el ConjuntoTDA de salida. Después se ubica la clave y se arranca el recorrido desde nodo.valores, agregando cada valor al conjunto. Al final se devuelve el conjunto (vacío si la clave no tenía valores).'
  }
];
