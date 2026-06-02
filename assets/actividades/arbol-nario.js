/* Actividades de práctica — Árbol genérico (n-ario).
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  // ---------------- QUIZ (concepto y representación) ----------------
  {
    tipo: 'quiz',
    enunciado: '¿Qué distingue a un árbol n-ario (genérico) de un árbol binario?',
    opciones: ['Cada nodo puede tener cualquier cantidad de hijos, no solo dos',
               'Sus valores siempre están ordenados de menor a mayor',
               'No puede tener hojas',
               'Su altura siempre es O(log n)'],
    correcta: 0,
    explicacion: 'En un árbol binario cada nodo tiene a lo sumo dos hijos; en uno n-ario (genérico) un nodo puede tener cualquier cantidad de hijos. Por eso modela bien directorios, organigramas o menús, donde un nodo no está limitado a dos hijos.'
  },
  {
    tipo: 'quiz',
    enunciado: 'En la representación "hijo-mayor / hermano-siguiente", ¿qué guarda cada nodo?',
    opciones: ['Solo 2 referencias: HijoMayor (primer hijo) y HermanoSiguiente (próximo hermano)',
               'Una lista de tamaño variable con todos sus hijos',
               'Tres referencias: izquierdo, central y derecho',
               'Un arreglo fijo de exactamente N hijos'],
    correcta: 0,
    explicacion: 'La gracia de la representación left-child right-sibling es que cada nodo guarda solo 2 referencias: HijoMayor apunta al primer hijo y HermanoSiguiente al próximo hermano. Así un árbol de N hijos se reduce a uno binario.'
  },
  {
    tipo: 'quiz',
    enunciado: 'La raíz "2" tiene tres hijos: 7, 21 y 8 (en ese orden). Con la representación hijo-mayor / hermano-siguiente, ¿cómo se enlazan?',
    codigo:
`        2
       /|\\
      7 21 8`,
    opciones: ['2.hijoMayor = 7;  7.hermanoSig = 21;  21.hermanoSig = 8',
               '2.hijoMayor = 7;  2.hermanoSig = 21;  2.hermanoSig = 8',
               '2.hijoMayor = 8;  8.hermanoSig = 21;  21.hermanoSig = 7',
               '2.hermanoSig = 7;  7.hijoMayor = 21;  21.hijoMayor = 8'],
    correcta: 0,
    explicacion: 'El nodo padre apunta por HijoMayor solo al primer hijo (7). Los demás hijos forman una cadena de hermanos: 7.hermanoSig = 21 y 21.hermanoSig = 8. El padre NO apunta directo al segundo ni al tercer hijo.'
  },
  {
    tipo: 'quiz',
    enunciado: 'En la representación hijo-mayor / hermano-siguiente, ¿cuándo un nodo es una HOJA (no tiene hijos)?',
    opciones: ['Cuando hijoMayor == null (sin importar si tiene hermanoSig)',
               'Cuando hermanoSig == null',
               'Cuando hijoMayor == null y hermanoSig == null',
               'Cuando es el último de la cadena de hermanos'],
    correcta: 0,
    explicacion: 'Una hoja es un nodo sin hijos, o sea con hijoMayor == null. Que tenga o no hermanoSig es irrelevante: el hermano siguiente NO es un hijo, es otro nodo del mismo nivel (mismo padre).'
  },
  {
    tipo: 'quiz',
    enunciado: 'En el TDA ANaTDA, ¿qué devuelve HijoMayor()?',
    opciones: ['Otro árbol (ANaTDA): el subárbol del primer hijo',
               'Un int: el valor del primer hijo',
               'Un boolean: si el nodo tiene hijos',
               'Una lista con todos los hijos'],
    correcta: 0,
    explicacion: 'Igual que getLeft()/getRight() en el BinaryTree recursivo, HijoMayor() y HermanoSiguiente() devuelven otro árbol (un ANaTDA), no un valor. Para leer el dato del primer hijo harías arbol.HijoMayor().Valor().'
  },

  // ---------------- TRAZAR (recorrido sobre la representación) ----------------
  {
    tipo: 'trazar',
    enunciado: 'La raíz "2" tiene como primer hijo a 7, y 7 tiene como hermanos siguientes a 21 y 8. Ninguno tiene hijos propios. ¿Qué imprime recorrer(raiz)?',
    codigo:
`void recorrer(Nodo nodo) {
    if (nodo == null) return;
    System.out.print(nodo.valor + " ");
    recorrer(nodo.hijoMayor);
    recorrer(nodo.hermanoSig);
}
// 2.hijoMayor = 7;  7.hermanoSig = 21;  21.hermanoSig = 8
recorrer(raiz);`,
    opciones: ['2 7 21 8', '7 21 8 2', '2 8 21 7', '8 21 7 2'],
    correcta: 0,
    explicacion: 'Se imprime el 2 (raíz), se baja por hijoMayor a 7 (se imprime), y desde 7 se sigue por hermanoSig a 21 y luego a 8. Como ninguno tiene hijos, el resultado es 2 7 21 8.'
  },
  {
    tipo: 'trazar',
    enunciado: 'La raíz 2 tiene como primer hijo a 7 (y 7 tiene de hermano a 21). Además, 7 tiene un hijo propio: 1. ¿Qué imprime recorrer(raiz)?',
    codigo:
`void recorrer(Nodo nodo) {
    if (nodo == null) return;
    System.out.print(nodo.valor + " ");
    recorrer(nodo.hijoMayor);
    recorrer(nodo.hermanoSig);
}
// 2.hijoMayor = 7;  7.hijoMayor = 1;  7.hermanoSig = 21
recorrer(raiz);`,
    opciones: ['2 7 1 21', '2 7 21 1', '2 1 7 21', '2 21 7 1'],
    correcta: 0,
    explicacion: 'Desde 2 se baja a 7 y se imprime. Antes de seguir con su hermano 21, la recursión por hijoMayor visita primero el hijo de 7, que es 1. Recién al volver se procesa el hermano 21. Orden: 2 7 1 21.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Con el mismo recorrido, contá las hojas. La raíz 2 tiene hijos 7 y 21; 7 tiene un hijo (1) y 21 no tiene hijos. ¿Cuántas hojas tiene el árbol?',
    codigo:
`// Una hoja = nodo con hijoMayor == null.
// 2.hijoMayor = 7;  7.hermanoSig = 21;  7.hijoMayor = 1;  21.hijoMayor = null;  1.hijoMayor = null
// ¿Cuántos nodos tienen hijoMayor == null?`,
    opciones: ['2 (el 1 y el 21)', '1 (solo el 1)', '3 (el 1, el 21 y el 7)', '0'],
    correcta: 0,
    explicacion: 'Son hojas los nodos sin hijos (hijoMayor == null): el 1 (hijo de 7, sin hijos) y el 21 (sin hijos). El 7 NO es hoja porque tiene a 1 como hijo; el 2 tampoco. Total: 2 hojas. Ojo: tener hermanoSig no convierte a un nodo en interno.'
  }
];
