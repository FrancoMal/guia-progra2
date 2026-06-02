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
    tipo: 'corregir',
    enunciado: 'Este agregar(clave, x) debería actualizar el valor si la clave ya existe, pero duplica la clave. ¿En qué línea está el error?',
    lineas: [
      'public void agregar(int clave, int x) {',
      '    Nodo nuevo = new Nodo();',
      '    nuevo.clave = clave;',
      '    nuevo.valor = x;',
      '    nuevo.sig = inicio;',
      '    inicio = nuevo;',
      '}'
    ],
    lineaError: 1,
    fix: 'Nodo nuevo = clave2Nodo(clave); if (nuevo == null) { nuevo = new Nodo(); nuevo.clave = clave; nuevo.sig = inicio; inicio = nuevo; } nuevo.valor = x;',
    explicacion: 'Crea un nodo nuevo sin buscar primero si la clave ya está. Hay que buscarla con clave2Nodo: si existe, solo se reasigna el valor; si no existe, recién ahí se crea el nodo. Así la clave nunca queda duplicada.'
  }
];
