/* Actividades de práctica — Cómo se rinde (Monzón).
   Quiz sobre las REGLAS del examen project-based: prohibiciones, entregables y manejo de error.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  {
    tipo: 'quiz',
    enunciado: 'En el examen de Monzón, ¿cuál de estas cosas está PROHIBIDA y alcanza para desaprobar?',
    opciones: ['Usar arreglos crudos (int[]) que vos mismo manejás',
               'Usar genéricos (List<Integer>) y estructuras de la JRE (ArrayList, HashMap)',
               'Implementar tus propios TDAs con nodos enlazados'],
    correcta: 1,
    explicacion: 'El enunciado prohíbe expresamente librerías, genéricos y estructuras de datos que vienen con la JRE, y dice que no respetarlo es suficiente para desaprobar. Los arreglos crudos y los TDAs propios sin genéricos sí están permitidos.'
  },
  {
    tipo: 'quiz',
    enunciado: 'El apunte de Monzón usa genéricos (por ejemplo Stack<T>) en sus ejemplos. ¿Qué tenés que hacer en TU entrega del examen?',
    opciones: ['Copiar el estilo del apunte y usar genéricos, ya que es el material oficial',
               'Escribir los TDAs con tipos concretos (int), porque el examen prohíbe genéricos aunque el apunte los use',
               'Usar genéricos solo en los TDAs y tipos concretos en el resto'],
    correcta: 1,
    explicacion: 'Los genéricos del apunte son solo para explicar. El examen los prohíbe sin excepción, así que tu código debe usar tipos concretos (típicamente int). No alcanza con que "el apunte lo hace": en la entrega, nada de <T>.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Sobre las pruebas del código, ¿qué pide exactamente la cátedra?',
    opciones: ['Tests unitarios con un framework (por ejemplo JUnit)',
               'Un set de prueba en el método main del proyecto; no se piden tests unitarios',
               'No hace falta probar nada, alcanza con que compile'],
    correcta: 1,
    explicacion: 'El requisito es desarrollar un set de prueba que demuestre que el código funciona, pero NO tests unitarios: alcanza con armar pruebas en el método main (crear la estructura, ejecutar los métodos, verificar resultados).'
  },
  {
    tipo: 'quiz',
    enunciado: 'Tenés un Diccionario. Llamás a eliminar(clave) con una clave que NO existe, y a recuperar(clave) con otra clave que tampoco existe. Según el criterio de manejo de error de la cátedra, ¿qué corresponde en cada caso?',
    codigo:
`d.remove(claveInexistente, v);   // eliminar lo que no está
d.getValue(claveInexistente);    // recuperar lo que no está`,
    opciones: ['Ambas deben lanzar una excepción',
               'eliminar no hace nada (no es error); recuperar lanza una excepción (sí rompe el contrato)',
               'eliminar lanza una excepción; recuperar devuelve 0'],
    correcta: 1,
    explicacion: 'Eliminar una clave inexistente NO es un error: pediste que esa clave no esté y no está, así que la operación simplemente no hace nada. Recuperar una clave inexistente SÍ rompe el contrato: no hay valor coherente para devolver, por eso se lanza una excepción.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué se debe entregar SIEMPRE además del código que resuelve el ejercicio?',
    opciones: ['Solo el archivo .java principal, sin documentación',
               'Las precondiciones en la firma de cada método y la estrategia escrita de cada método en la carpeta strategies (txt/MD/pdf)',
               'Un video explicando la solución'],
    correcta: 1,
    explicacion: 'En la firma de cada método van las precondiciones (en integradores también postcondiciones e invariantes), y en la carpeta strategies va la estrategia escrita de cada método en formato txt, MD o pdf. Cualquier otro formato no se corrige.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Vas a rendir el PARCIAL. ¿Hasta qué tema entra y qué conviene priorizar?',
    opciones: ['Entra todo, incluidos grafos y AVL/Árbol B',
               'Llega hasta árboles; grafos y AVL/Árbol B NO entran (esos son de final)',
               'Solo entran pila y cola'],
    correcta: 1,
    explicacion: 'El alcance del parcial llega hasta árboles. Grafos y los árboles balanceados (AVL/Árbol B) recién entran en el final. Por eso en el parcial conviene clavar pila, cola, conjunto, diccionario y árboles binarios/ABB.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Muchos enunciados usan un predicado para elegir la variante del ejercicio. En un integrador grupal, ¿cómo se calcula?',
    opciones: ['Con la edad del integrante más grande módulo 3',
               'Con la suma de los legajos del grupo módulo 3 (da 0, 1 o 2)',
               'Con la cantidad de integrantes del grupo'],
    correcta: 1,
    explicacion: 'El predicado P se calcula como (suma de los legajos del grupo) módulo 3, dando P(a)=0, P(b)=1 o P(c)=2. Ese número elige la variante del ejercicio que te toca resolver. En el final individual se usa tu propio legajo módulo 3.'
  }
];
