/* Actividades de práctica — Conjunto. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  {
    tipo: 'quiz',
    enunciado: '¿Cuál es la característica que define a un conjunto?',
    opciones: ['Guarda los elementos en el orden en que se insertan',
               'No tiene elementos repetidos y no tiene orden',
               'Permite repetidos pero los mantiene ordenados'],
    correcta: 1,
    explicacion: 'En un conjunto cada elemento aparece a lo sumo una vez (sin repetidos) y no existe "el primero" ni "el último" (sin orden). Lo único que importa es si un elemento pertenece o no.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre un conjunto vacío. ¿Cuántos elementos tiene al final?',
    codigo:
`c.inicializarConjunto();
c.agregar(5);
c.agregar(3);
c.agregar(5);
// ¿cantidad de elementos?`,
    opciones: ['1', '2', '3'],
    correcta: 1,
    explicacion: 'agregar(5) → {5}; agregar(3) → {5,3}; agregar(5) no hace nada porque 5 ya pertenece. Quedan 2 elementos: el conjunto no admite repetidos.'
  },
  {
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de pertenece(x) en la implementación con lista dinámica?',
    codigo:
`public boolean pertenece(int x) {
    Nodo turista = origen;
    while (turista != null && turista.valor != x)
        turista = turista.sig;
    return (turista != null);
}`,
    opciones: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correcta: 2,
    explicacion: 'En el peor caso recorre toda la lista buscando x (cuando no está o está al final): O(n).'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas para que agregar(x) (lista dinámica) quede correcta, respetando la regla del conjunto.',
    lineas: [
      'public void agregar(int x) {',
      '    if (!this.pertenece(x)) {',
      '        Nodo nuevo = new Nodo();',
      '        nuevo.valor = x;',
      '        nuevo.sig = origen;',
      '        origen = nuevo;',
      '    }',
      '}'
    ],
    explicacion: 'Primero se chequea que x NO pertenezca (así se evitan repetidos). Recién ahí se crea el nodo, se carga el valor, se engancha al origen viejo y el nuevo pasa a ser el origen.'
  },
  {
    tipo: 'corregir',
    enunciado: 'Este agregar(x) tiene un error: rompe la definición de conjunto. ¿En qué línea está?',
    lineas: [
      'public void agregar(int x) {',
      '    Nodo nuevo = new Nodo();',
      '    nuevo.valor = x;',
      '    nuevo.sig = origen;',
      '    origen = nuevo;',
      '}'
    ],
    lineaError: 1,
    fix: 'if (!this.pertenece(x)) {  // ...y cerrar el bloque con } antes del cierre del método',
    explicacion: 'Falta chequear pertenece antes de insertar. Sin el if (!pertenece(x)), entran duplicados y deja de ser un conjunto. Esa verificación no es opcional: es parte de la operación agregar.'
  }
];
