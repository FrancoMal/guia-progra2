/* Actividades de práctica — Grafos. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  {
    tipo: 'quiz',
    enunciado: '¿Qué guarda la celda mAdy[o][d] en una matriz de adyacencia y qué significa un 0?',
    opciones: ['La cantidad de vecinos del vértice o; 0 significa que no tiene vecinos',
               'El peso de la arista del vértice o al d; 0 significa "sin arista"',
               'La etiqueta del vértice de destino; 0 es la etiqueta del primer vértice'],
    correcta: 1,
    explicacion: 'mAdy[o][d] almacena el peso de la arista o→d. Un 0 es el valor centinela que indica que esa arista no existe.'
  },
  {
    tipo: 'quiz',
    enunciado: 'En un grafo NO dirigido implementado con matriz, agregás la arista entre A y B. ¿Qué celdas hay que cargar?',
    codigo:
`public void agregarArista(int origen, int destino, int peso) {
    int o = vertice2indice(origen);
    int d = vertice2indice(destino);
    // ...
}`,
    opciones: ['Solo mAdy[o][d], igual que en uno dirigido',
               'mAdy[o][d] y además mAdy[d][o], para que la matriz quede simétrica',
               'Solo mAdy[d][o], porque la arista se guarda desde el destino'],
    correcta: 1,
    explicacion: 'En un grafo no dirigido la conexión vale en los dos sentidos, así que se cargan las dos celdas (mAdy[o][d] y mAdy[d][o]) y la matriz queda simétrica. Cargar una sola lo convertiría sin querer en dirigido.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Grafo no dirigido con aristas 1-2, 1-3 y 2-4. Se hace un BFS desde 1. Al elegir entre varios vecinos, se toma el de menor etiqueta primero. ¿En qué orden se visitan los vértices?',
    codigo:
`// Aristas (no dirigido): 1-2, 1-3, 2-4
// BFS desde 1, vecinos en orden de etiqueta
bfs(g, 1);`,
    opciones: ['1, 2, 4, 3', '1, 2, 3, 4', '1, 3, 2, 4'],
    correcta: 1,
    explicacion: 'BFS visita por niveles. Nivel 0: 1. Sus vecinos directos son 2 y 3 (nivel 1), que se encolan en ese orden. Recién después se procesa 4 (vecino de 2, nivel 2). Orden: 1, 2, 3, 4.'
  },
  {
    tipo: 'costo',
    enunciado: 'Usando matriz de adyacencia, ¿cuál es el costo de existeArista(o, d) una vez ubicados los índices, y cuánto espacio ocupa la matriz (V = cantidad de vértices)?',
    codigo:
`public boolean existeArista(int origen, int destino) {
    int o = vertice2indice(origen);
    int d = vertice2indice(destino);
    return (mAdy[o][d] != 0);
}`,
    opciones: ['existeArista O(V) y espacio O(V)',
               'existeArista O(1) y espacio O(V²)',
               'existeArista O(V²) y espacio O(1)'],
    correcta: 1,
    explicacion: 'Acceder a mAdy[o][d] es un acceso directo a una celda: O(1). Pero la matriz es n×n, así que ocupa O(V²) de espacio aunque haya pocas aristas. La matriz paga espacio para ganar velocidad de consulta.'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas del cuerpo de un DFS recursivo para que recorra correctamente sin repetir vértices.',
    lineas: [
      'visitados.agregar(v);',
      'procesar(v);',
      'ConjuntoTDA vs = g.vertices();',
      'while (!vs.conjuntoVacio()) {',
      '    int w = vs.elegir();',
      '    vs.sacar(w);',
      '    if (g.existeArista(v, w) && !visitados.pertenece(w))',
      '        dfs(g, w, visitados);',
      '}'
    ],
    explicacion: 'Primero se marca v como visitado y se procesa. Después se recorren todos los vértices: por cada uno que sea vecino de v y aún no esté visitado, se baja recursivamente con dfs. Marcar antes de recursar es lo que evita volver a entrar al mismo nodo.'
  },
  {
    tipo: 'corregir',
    enunciado: 'Este DFS entra en bucle infinito ante un ciclo. ¿En qué línea está el error?',
    lineas: [
      'void dfs(GrafoTDA g, int v, ConjuntoTDA visitados) {',
      '    procesar(v);',
      '    ConjuntoTDA vs = g.vertices();',
      '    while (!vs.conjuntoVacio()) {',
      '        int w = vs.elegir();',
      '        vs.sacar(w);',
      '        if (g.existeArista(v, w) && !visitados.pertenece(w))',
      '            dfs(g, w, visitados);',
      '    }',
      '}'
    ],
    lineaError: 1,
    fix: 'visitados.agregar(v); procesar(v);',
    explicacion: 'Nunca se marca v como visitado, así que la condición !visitados.pertenece(w) siempre da true y, ante un ciclo, se vuelve a entrar a los mismos nodos sin fin. Hay que agregar v al conjunto de visitados (antes de procesar) al inicio de la función.'
  }
];
