// Fuente de verdad de la navegación: bloques y temas de la guía.
// Lo consumen index.html (portada) y app.js (menú + prev/next) en cada página.
const BLOQUES = [
  { id: 'fundamentos', titulo: 'Fundamentos', temas: [
      { slug: 'recursividad', titulo: 'Recursividad',              archivo: 'recursividad.html' },
      { slug: 'complejidad',  titulo: 'Complejidad y Big-O',       archivo: 'complejidad.html' },
      { slug: 'listas',       titulo: 'Memoria dinámica y listas', archivo: 'listas.html' },
      { slug: 'ordenamiento', titulo: 'Ordenamiento',              archivo: 'ordenamiento.html' },
  ]},
  { id: 'lineales', titulo: 'TDAs lineales', temas: [
      { slug: 'pila',           titulo: 'Pila',              archivo: 'pila.html' },
      { slug: 'cola',           titulo: 'Cola',              archivo: 'cola.html' },
      { slug: 'cola-prioridad', titulo: 'Cola de Prioridad', archivo: 'cola-prioridad.html' },
  ]},
  { id: 'conjuntos', titulo: 'Conjuntos y Diccionarios', temas: [
      { slug: 'conjunto',             titulo: 'Conjunto',             archivo: 'conjunto.html' },
      { slug: 'diccionario-simple',   titulo: 'Diccionario Simple',   archivo: 'diccionario-simple.html' },
      { slug: 'diccionario-multiple', titulo: 'Diccionario Múltiple', archivo: 'diccionario-multiple.html' },
  ]},
  { id: 'arboles-grafos', titulo: 'Árboles y Grafos', temas: [
      { slug: 'arboles', titulo: 'Árboles (Binario, ABB, AVL)', archivo: 'arboles.html' },
      { slug: 'grafos',  titulo: 'Grafos',                      archivo: 'grafos.html' },
  ]},
];

// Arreglo plano en orden, para navegación anterior/siguiente.
const TEMAS = BLOQUES.flatMap(b => b.temas.map(t => ({ ...t, bloque: b.titulo, bloqueId: b.id })));
