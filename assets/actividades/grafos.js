/* Actividades de práctica — Grafos. Plantilla canónica de la Fase 2.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  // ───────────────────────────── QUIZ (conceptos) ─────────────────────────────
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
    enunciado: '¿Cuál es la diferencia entre un grafo dirigido y uno no dirigido?',
    opciones: ['En el dirigido las aristas tienen peso y en el no dirigido no',
               'En el no dirigido la arista vale en los dos sentidos; en el dirigido tiene un único sentido (A→B no implica B→A)',
               'El dirigido se guarda con matriz y el no dirigido con lista, no hay otra diferencia'],
    correcta: 1,
    explicacion: 'En un grafo no dirigido la conexión es simétrica (A-B = B-A). En uno dirigido la arista tiene sentido: que exista A→B no implica que exista B→A. El peso es independiente de esto.'
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
    tipo: 'quiz',
    enunciado: 'El grado de un vértice es la cantidad de aristas que tocan ese vértice. En el grafo no dirigido con aristas 1-2, 1-3 y 1-4, ¿cuál es el grado del vértice 1?',
    opciones: ['1', '2', '3', '4'],
    correcta: 2,
    explicacion: 'El vértice 1 está conectado con 2, 3 y 4: tres aristas lo tocan, así que su grado es 3. Los vértices 2, 3 y 4 tienen grado 1 cada uno.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Cuándo conviene usar una lista de adyacencia en lugar de una matriz de adyacencia?',
    opciones: ['Cuando el grafo es ralo (pocas aristas), porque ocupa proporcional a la cantidad de aristas y no V²',
               'Siempre, porque consultar si existe una arista es más rápido que con matriz',
               'Cuando el grafo es denso (muchas aristas), para ahorrar espacio'],
    correcta: 0,
    explicacion: 'La lista conviene en grafos ralos: ocupa O(V + A) en vez de O(V²). La contra es que existeArista deja de ser O(1) porque hay que recorrer la lista del origen. Para grafos densos, la matriz aprovecha mejor el espacio.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué estructura auxiliar usa cada recorrido para decidir el orden en que visita los vértices?',
    opciones: ['DFS usa una cola (FIFO) y BFS una pila (LIFO)',
               'DFS usa una pila (o la recursión, que es una pila implícita) y BFS usa una cola (FIFO)',
               'Ambos usan exactamente la misma estructura, una cola con prioridad'],
    correcta: 1,
    explicacion: 'DFS avanza en profundidad apoyándose en una pila (normalmente la pila de llamadas, vía recursión). BFS visita por niveles usando una cola FIFO. Esa es la diferencia clave entre los dos recorridos.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Por qué tanto DFS como BFS necesitan obligatoriamente un conjunto de visitados?',
    opciones: ['Para ordenar los vértices de menor a mayor etiqueta antes de recorrer',
               'Para evitar volver a entrar a un vértice ya procesado y caer en un bucle infinito ante ciclos',
               'Solo es necesario en grafos dirigidos; en los no dirigidos se puede omitir'],
    correcta: 1,
    explicacion: 'Sin el conjunto de visitados, ante un ciclo el recorrido vuelve a entrar a los mismos nodos una y otra vez (bucle infinito). El conjunto es obligatorio en cualquier grafo, dirigido o no, que pueda tener ciclos.'
  },
  // ───────────────────────────── TRAZAR (DFS / BFS) ─────────────────────────────
  {
    tipo: 'trazar',
    enunciado: 'Grafo no dirigido con aristas 1-2, 1-3 y 2-4. Se hace un BFS desde 1. Al elegir entre varios vecinos, se toma el de menor etiqueta primero. ¿En qué orden se visitan los vértices?',
    codigo:
`// Aristas (no dirigido): 1-2, 1-3, 2-4
// BFS desde 1, vecinos en orden de etiqueta creciente
bfs(g, 1);`,
    opciones: ['1, 2, 4, 3', '1, 2, 3, 4', '1, 3, 2, 4'],
    correcta: 1,
    explicacion: 'BFS visita por niveles. Nivel 0: 1. Sus vecinos directos son 2 y 3 (nivel 1), que se encolan en ese orden. Recién después se procesa 4 (vecino de 2, nivel 2). Orden: 1, 2, 3, 4.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Grafo no dirigido con aristas 1-2, 1-3, 2-4 y 3-4. Se hace un DFS desde 1 tomando siempre el vecino de menor etiqueta primero. ¿En qué orden se visitan los vértices?',
    codigo:
`// Aristas (no dirigido): 1-2, 1-3, 2-4, 3-4
// DFS desde 1, vecinos en orden de etiqueta creciente
dfs(g, 1, visitados);`,
    opciones: ['1, 2, 3, 4', '1, 2, 4, 3', '1, 3, 4, 2'],
    correcta: 1,
    explicacion: 'Desde 1 bajo al menor vecino: 2. Desde 2 los vecinos son 1 (visitado) y 4 → bajo a 4. Desde 4 los vecinos son 2 (visitado) y 3 → bajo a 3. Desde 3 todo está visitado y se retrocede. Orden: 1, 2, 4, 3.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Mismo grafo no dirigido (aristas 1-2, 1-3, 2-4, 3-4), pero ahora un BFS desde 1, tomando el vecino de menor etiqueta primero. ¿En qué orden se visitan los vértices?',
    codigo:
`// Aristas (no dirigido): 1-2, 1-3, 2-4, 3-4
// BFS desde 1, vecinos en orden de etiqueta creciente
bfs(g, 1);`,
    opciones: ['1, 2, 4, 3', '1, 2, 3, 4', '1, 4, 2, 3'],
    correcta: 1,
    explicacion: 'BFS por niveles: nivel 0 es 1; sus vecinos 2 y 3 forman el nivel 1 y se encolan en ese orden. Al procesar 2 se encola 4; al procesar 3, su vecino 4 ya está marcado. Orden: 1, 2, 3, 4. (Comparalo con el DFS del mismo grafo, que da 1, 2, 4, 3.)'
  },
  {
    tipo: 'trazar',
    enunciado: 'Grafo DIRIGIDO con aristas 1→2, 1→3, 2→4 y 3→4. Se hace un DFS desde 1 siguiendo solo las flechas salientes y tomando el vecino de menor etiqueta primero. ¿En qué orden se visitan los vértices?',
    codigo:
`// Aristas (dirigido): 1->2, 1->3, 2->4, 3->4
// DFS desde 1, vecinos salientes en orden de etiqueta creciente
dfs(g, 1, visitados);`,
    opciones: ['1, 2, 3, 4', '1, 2, 4, 3', '1, 3, 4, 2'],
    correcta: 1,
    explicacion: 'Como es dirigido solo se siguen las flechas salientes. Desde 1 bajo al menor: 2. Desde 2 sale 2→4, bajo a 4. Desde 4 no sale ninguna flecha, retrocedo. Vuelvo a 1 y sigo con 3 (1→3). Desde 3 sale 3→4 pero 4 ya está visitado. Orden: 1, 2, 4, 3.'
  },
  // ───────────────────────────── COSTO ─────────────────────────────
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
    tipo: 'costo',
    enunciado: 'Con matriz de adyacencia, ¿cuál es el costo de recorrer TODOS los vecinos de un vértice v (revisar a quién está conectado)?',
    codigo:
`// Recorre la fila de v en la matriz buscando vecinos
ConjuntoTDA vs = g.vertices();
while (!vs.conjuntoVacio()) {
    int w = vs.elegir();
    vs.sacar(w);
    if (g.existeArista(v, w))
        procesar(w);
}`,
    opciones: ['O(1), porque la matriz da acceso directo',
               'O(V), porque hay que revisar las V posibles celdas de la fila de v',
               'O(V²), porque por cada vecino se recorre toda la matriz'],
    correcta: 1,
    explicacion: 'Para saber los vecinos de v hay que mirar las V celdas de su fila (un existeArista O(1) por cada posible vértice). Eso da O(V), aunque v tenga pocos vecinos reales. Con lista de adyacencia esto bajaría a O(grado de v).'
  },
  {
    tipo: 'costo',
    enunciado: 'Con matriz de adyacencia, ¿cuál es el costo de un recorrido completo DFS o BFS sobre un grafo de V vértices?',
    codigo:
`// Por cada vértice visitado se recorre su fila entera
// buscando vecinos no visitados (existeArista por cada w)
dfs(g, inicio, visitados);`,
    opciones: ['O(V), se visita cada vértice una sola vez',
               'O(V²), porque por cada uno de los V vértices se revisa su fila de V celdas',
               'O(log V), por la naturaleza recursiva del recorrido'],
    correcta: 1,
    explicacion: 'Cada vértice se visita una vez, pero al visitarlo hay que revisar su fila completa (V posibles vecinos). V vértices × V celdas = O(V²). Con lista de adyacencia los recorridos bajan a O(V + A), donde A es la cantidad de aristas.'
  },
  // ───────────────────────────── ORDENAR ─────────────────────────────
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
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas de agregarArista para un grafo NO dirigido (la matriz tiene que quedar simétrica).',
    lineas: [
      'int o = vertice2indice(origen);',
      'int d = vertice2indice(destino);',
      'mAdy[o][d] = peso;',
      'mAdy[d][o] = peso;'
    ],
    explicacion: 'Primero se traducen las etiquetas origen y destino a sus índices. Luego se cargan las DOS celdas con el peso: mAdy[o][d] y su simétrica mAdy[d][o], porque en un grafo no dirigido la arista vale en ambos sentidos.'
  },
  // ───────────────────────────── CORREGIR ─────────────────────────────
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
  },
  {
    tipo: 'corregir',
    enunciado: 'Este agregarArista pretende construir un grafo NO dirigido, pero los recorridos no encuentran la conexión en el sentido destino→origen. ¿En qué línea está el problema?',
    lineas: [
      'public void agregarArista(int origen, int destino, int peso) {',
      '    int o = vertice2indice(origen);',
      '    int d = vertice2indice(destino);',
      '    mAdy[o][d] = peso;',
      '}'
    ],
    lineaError: 3,
    fix: 'mAdy[o][d] = peso; mAdy[d][o] = peso;',
    explicacion: 'Solo se carga la celda mAdy[o][d], así que la arista queda en un único sentido (dirigido). Para un grafo no dirigido falta cargar también la celda simétrica mAdy[d][o] = peso, de modo que la conexión valga en ambos sentidos.'
  }
];
