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
    tipo: 'corregir',
    enunciado: 'Este agregar tiene un error: crea una clave nueva aunque ya exista. ¿En qué línea está?',
    lineas: [
      'public void agregar(int clave, int valor) {',
      '    NodoClave nodo = new NodoClave();   // siempre crea una clave nueva',
      '    nodo.clave = clave;',
      '    nodo.sigClave = inicio;',
      '    inicio = nodo;',
      '    // ... agrega el valor a nodo.valores',
      '}'
    ],
    lineaError: 1,
    fix: 'NodoClave nodo = clave2NodoClave(clave); if (nodo == null) { nodo = new NodoClave(); nodo.clave = clave; nodo.sigClave = inicio; inicio = nodo; }',
    explicacion: 'Hay que buscar primero la clave con clave2NodoClave y crear un NodoClave nuevo solo si devuelve null. Crear siempre uno duplica la clave: te quedan dos NodoClave con la misma clave y los valores repartidos entre ambas.'
  }
];
