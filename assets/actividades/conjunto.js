/* Actividades de práctica — Conjunto. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  // ───────────────────────────── QUIZ ─────────────────────────────
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
    tipo: 'quiz',
    enunciado: 'Los conjuntos { 7, 3, 5 } y { 5, 7, 3 }, ¿son iguales o distintos?',
    opciones: ['Son distintos: tienen los elementos en otro orden',
               'Son iguales: en un conjunto el orden no importa',
               'Depende de cómo estén implementados (lista o arreglo)'],
    correcta: 1,
    explicacion: 'Como el conjunto no tiene orden, lo único que cuenta es qué elementos están. Los dos tienen exactamente {3, 5, 7}, así que son iguales.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Cuál de estas operaciones del TDA Conjunto tiene como precondición que el conjunto NO esté vacío?',
    opciones: ['agregar(x)', 'pertenece(x)', 'elegir()', 'conjuntoVacío()'],
    correcta: 2,
    explicacion: 'elegir() devuelve algún elemento del conjunto, así que necesita que haya al menos uno. Llamarlo con el conjunto vacío rompe el programa.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Sobre elegir(), ¿cuál afirmación es correcta?',
    opciones: ['Devuelve siempre el último elemento agregado',
               'Devuelve algún elemento del conjunto y lo saca',
               'Devuelve algún elemento del conjunto pero NO lo saca',
               'Devuelve el menor elemento del conjunto'],
    correcta: 2,
    explicacion: 'Como no hay orden, elegir() devuelve cualquier elemento (cuál, depende de la implementación) y lo deja en el conjunto: no lo quita. Para sacarlo está sacar(x).'
  },
  {
    tipo: 'quiz',
    enunciado: 'Tenés A = {1, 2, 3} y B = {3, 4, 5}. ¿Qué da la unión A ∪ B?',
    opciones: ['{3}', '{1, 2, 4, 5}', '{1, 2, 3, 4, 5}', '{1, 2, 3, 3, 4, 5}'],
    correcta: 2,
    explicacion: 'La unión junta todos los elementos de ambos conjuntos. El 3 está en los dos, pero como no hay repetidos aparece una sola vez: {1, 2, 3, 4, 5}.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Con A = {1, 2, 3} y B = {3, 4, 5}, ¿qué da la intersección A ∩ B?',
    opciones: ['{1, 2, 3, 4, 5}', '{3}', '{1, 2, 4, 5}', '{}'],
    correcta: 1,
    explicacion: 'La intersección se queda solo con los elementos que están en AMBOS conjuntos. El único que está en A y en B es el 3.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Con A = {1, 2, 3} y B = {3, 4, 5}, ¿qué da la diferencia A − B?',
    opciones: ['{1, 2}', '{4, 5}', '{3}', '{1, 2, 4, 5}'],
    correcta: 0,
    explicacion: 'La diferencia A − B se queda con los elementos de A que NO están en B. De A = {1, 2, 3}, el 3 está en B, así que se descarta: queda {1, 2}.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Querés implementar pertenece(x), agregar(x) y unión usando solo las operaciones del TDA Conjunto. ¿Cuál es la operación base sobre la que se apoyan las demás?',
    opciones: ['elegir(), porque devuelve un elemento',
               'pertenece(x), porque preguntar si un elemento está es la idea central del conjunto',
               'conjuntoVacío(), porque indica si hay elementos'],
    correcta: 1,
    explicacion: 'pertenece(x) es la operación base: agregar la usa para no meter duplicados, y operaciones como unión/intersección se arman recorriendo y preguntando pertenece sobre el otro conjunto.'
  },

  // ───────────────────────────── TRAZAR ─────────────────────────────
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
    explicacion: 'agregar(5) → {5}; agregar(3) → {5, 3}; agregar(5) no hace nada porque 5 ya pertenece. Quedan 2 elementos: el conjunto no admite repetidos.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre un conjunto vacío. ¿Qué devuelve la última llamada a pertenece?',
    codigo:
`c.inicializarConjunto();
c.agregar(8);
c.agregar(4);
c.sacar(8);
// c.pertenece(8)`,
    opciones: ['true', 'false', 'Da error porque 8 ya no está'],
    correcta: 1,
    explicacion: 'agregar(8) → {8}; agregar(4) → {8, 4}; sacar(8) → {4}. Como el 8 ya no está, pertenece(8) devuelve false. No es error: pertenece sobre un elemento ausente simplemente da false.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Se ejecuta esta secuencia sobre un conjunto vacío. ¿Cuántos elementos tiene al final?',
    codigo:
`c.inicializarConjunto();
c.agregar(2);
c.agregar(2);
c.sacar(7);
c.agregar(9);
// ¿cantidad de elementos?`,
    opciones: ['1', '2', '3', '4'],
    correcta: 1,
    explicacion: 'agregar(2) → {2}; agregar(2) no hace nada (ya está); sacar(7) no hace nada (7 no pertenece, no rompe); agregar(9) → {2, 9}. Quedan 2 elementos.'
  },
  {
    tipo: 'trazar',
    enunciado: 'En ConjuntoLD se agrega siempre adelante (en origen) y elegir() devuelve origen.valor. Tras esta secuencia, ¿qué devuelve elegir()?',
    codigo:
`c.inicializarConjunto();
c.agregar(1);
c.agregar(6);
c.agregar(4);
// c.elegir()`,
    opciones: ['1', '6', '4', 'Un valor cualquiera, no se puede saber'],
    correcta: 2,
    explicacion: 'En la lista dinámica cada agregar inserta adelante, así que origen termina apuntando al último insertado (el 4). Como elegir() devuelve origen.valor, da 4. Ojo: esto es un detalle de ESTA implementación; conceptualmente elegir() devuelve "alguno".'
  },

  // ───────────────────────────── COSTO ─────────────────────────────
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
    tipo: 'costo',
    enunciado: '¿Cuál es el costo de agregar(x) en el conjunto, y por qué?',
    codigo:
`public void agregar(int x) {
    if (!this.pertenece(x)) {
        Nodo nuevo = new Nodo();
        nuevo.valor = x;
        nuevo.sig = origen;
        origen = nuevo;
    }
}`,
    opciones: ['O(1), porque insertar adelante es un paso fijo',
               'O(n), porque llama a pertenece(x), que recorre la estructura',
               'O(log n), porque busca de a mitades',
               'O(n²), porque recorre dos veces'],
    correcta: 1,
    explicacion: 'Insertar adelante es O(1), pero agregar primero llama a pertenece(x) para evitar duplicados, y esa búsqueda es O(n). El costo total queda dominado por la búsqueda: O(n).'
  },
  {
    tipo: 'costo',
    enunciado: 'En ConjuntoAR, sacar(x) reemplaza el elemento por el último y baja cant. ¿Cuál es su costo total?',
    codigo:
`public void sacar(int x) {
    int i = buscar(x);       // recorre el arreglo
    if (i != -1) {
        arr[i] = arr[cant - 1];
        cant--;
    }
}`,
    opciones: ['O(1): mover el último al hueco es un paso fijo',
               'O(n): hay que buscar x recorriendo el arreglo antes de sacarlo',
               'O(n²): por el reemplazo con el último',
               'O(log n): porque el arreglo está ordenado'],
    correcta: 1,
    explicacion: 'Pisar el hueco con el último es O(1), pero antes hay que ubicar x con buscar(x), que recorre el arreglo: O(n). Por eso sacar es O(n) aunque no haya que desplazar el resto.'
  },

  // ───────────────────────────── ORDENAR ─────────────────────────────
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
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas del caso "el elemento está en el primer nodo" de sacar(x) en lista dinámica.',
    lineas: [
      'public void sacar(int x) {',
      '    if (origen != null) {',
      '        if (origen.valor == x) {',
      '            origen = origen.sig;',
      '        }',
      '    }',
      '}'
    ],
    explicacion: 'Primero se chequea que la lista no esté vacía (origen != null). Si el primer nodo es el buscado, se saltea moviendo origen a origen.sig. Así el primer nodo queda desenganchado del conjunto.'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas para que sacar(x) en ConjuntoAR quede correcta (reemplazar por el último).',
    lineas: [
      'public void sacar(int x) {',
      '    int i = buscar(x);',
      '    if (i != -1) {',
      '        arr[i] = arr[cant - 1];',
      '        cant--;',
      '    }',
      '}'
    ],
    explicacion: 'Primero se busca la posición de x. Si se encontró (i != -1), se pisa ese hueco con el último elemento y se decrementa cant. Como no hay orden, no hace falta desplazar el resto.'
  },

  // ───────────────────────────── CORREGIR ─────────────────────────────
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
  },
  {
    tipo: 'corregir',
    enunciado: 'Este sacar(x) (lista dinámica) busca bien el nodo anterior al buscado, pero no termina de sacarlo. ¿En qué línea está el error?',
    lineas: [
      'public void sacar(int x) {',
      '    Nodo turista = origen;',
      '    while (turista.sig != null && turista.sig.valor != x)',
      '        turista = turista.sig;',
      '    turista.sig = turista.sig;',
      '}'
    ],
    lineaError: 4,
    fix: 'turista.sig = turista.sig.sig;',
    explicacion: 'turista.sig = turista.sig no cambia nada (se asigna a sí mismo). Para sacar el nodo hay que saltearlo enganchando con el de DOS más adelante: turista.sig = turista.sig.sig.'
  }
];
