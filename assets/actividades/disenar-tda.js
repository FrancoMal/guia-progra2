/* Actividades de práctica — Diseñar un TDA propio.
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  {
    tipo: 'quiz',
    enunciado: 'El examen pide "crear el TDA CircularBuffer, imitando la implementación de Queue, será una estructura lineal destructiva y mutable". ¿Qué significa que sea DESTRUCTIVA?',
    opciones: ['Que borra los datos de la memoria al cerrarse el programa',
               'Que la única forma de leer todos sus elementos es ir sacándolos, y al terminar queda vacía',
               'Que cada operación devuelve una estructura nueva sin tocar la original'],
    correcta: 1,
    explicacion: 'Una estructura destructiva (como Pila o Cola) no tiene un recorrido que la deje intacta: para ver todo hay que ir consumiendo. Si un método no debe alterarla, se trabaja sobre una copia.'
  },
  {
    tipo: 'quiz',
    enunciado: 'La consigna aclara: "Crear el TDA Pair. La diferencia con una dupla es que el par es mutable". ¿Sobre qué eje de diseño está hablando?',
    opciones: ['Estática vs. dinámica',
               'Lineal vs. no-lineal',
               'Mutable vs. inmutable'],
    correcta: 2,
    explicacion: 'Que el Par sea mutable significa que sus operaciones modifican el mismo objeto (se le puede cambiar una componente). Una dupla, en cambio, sería inmutable: no se toca, cada cambio daría un objeto nuevo. Mismo dato, decisión de diseño opuesta.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Diseñás un Conjunto de Pilas (un Set cuyos elementos son pilas). ¿Qué decisión EXTRA te obliga a tomar este TDA "contenedor de TDAs" que no aparecía con un Set de enteros?',
    opciones: ['Definir cuándo dos pilas son iguales (por contenido), porque == compara referencias, no contenido',
               'Usar genéricos para que el Set acepte cualquier tipo',
               'Hacer la implementación obligatoriamente dinámica'],
    correcta: 0,
    explicacion: 'Set.add no repite y Set.remove busca por igualdad. Con int alcanza ==, pero == entre pilas compara si son el mismo objeto en memoria, no su contenido. Por eso un contenedor de TDAs obliga a DEFINIR la igualdad de los elementos contenidos.'
  },
  {
    tipo: 'quiz',
    enunciado: 'En el integrador está prohibido el uso de estructuras de la JRE y de genéricos. ¿Cuál de estas opciones es VÁLIDA para implementar tu TDA?',
    codigo:
`// Opción A
private ArrayList<Integer> datos;

// Opción B
private int[] datos = new int[MAX];
private int count;

// Opción C
private HashMap<Integer,Integer> mapa;`,
    opciones: ['La opción A (ArrayList)',
               'La opción B (arreglo nativo + contador)',
               'La opción C (HashMap)'],
    correcta: 1,
    explicacion: 'ArrayList y HashMap son estructuras de la JRE y además usan genéricos: prohibidas, y motivo de desaprobación directa. Solo se permiten arreglos nativos (int[]), nodos propios y los TDAs implementados a mano.'
  },
  {
    tipo: 'trazar',
    enunciado: 'Esta es la implementación estática (arreglo circular con MAX) de add. Partiendo de un buffer vacío con MAX = 4 (frente = 0, cola = 0, count = 0), se hace add(7), add(2), add(9). ¿Cuánto vale "cola" después?',
    codigo:
`public void add(int x) {
    datos[cola] = x;
    cola = (cola + 1) % MAX;   // MAX = 4
    count++;
}`,
    opciones: ['3', '0', '4'],
    correcta: 0,
    explicacion: 'Cada add escribe en datos[cola] y avanza cola en módulo 4: 0 -> 1 -> 2 -> 3. Tras tres add, cola vale 3 (la próxima posición libre). Recién al pasar de 3 daría la vuelta a 0.'
  },
  {
    tipo: 'ordenar',
    enunciado: 'Ordená las líneas del método add(x) de la implementación dinámica (nodos) de un CircularBuffer, que encola al final manteniendo una referencia "ultimo".',
    lineas: [
      'Nodo nuevo = new Nodo();',
      'nuevo.valor = x;',
      'nuevo.sig = null;',
      'if (frente == null) frente = nuevo;',
      'else ultimo.sig = nuevo;',
      'ultimo = nuevo;'
    ],
    explicacion: 'Primero se crea el nodo y se cargan sus campos (valor y sig en null). Después se decide: si el buffer estaba vacío, el nuevo es el frente; si no, se engancha después del último. Recién al final el nuevo pasa a ser "ultimo".'
  },
  {
    tipo: 'trazar',
    enunciado: 'Una Pila se implementa SOBRE una cola de prioridad de pares (valor, orden): a cada elemento se le da un orden creciente y la cola devuelve primero el de MAYOR orden. Se hace add(5), add(3), add(8). ¿Qué devuelve getTop()?',
    codigo:
`public void add(int x) {
    pq.add(x, proximoOrden);   // (valor, prioridad = orden)
    proximoOrden++;
}
public int getTop() { return pq.getMax(); }  // el de MAYOR orden`,
    opciones: ['8', '5', '3'],
    correcta: 0,
    explicacion: 'add(5) entra con orden 0, add(3) con orden 1, add(8) con orden 2. getTop devuelve el de mayor orden (el último apilado): el 8, con orden 2. Así la cola de prioridad de máximos reproduce el comportamiento LIFO de una pila.'
  },
  {
    tipo: 'mapear',
    enunciado: 'Asociá cada TDA inventado del integrador con el TDA de la cursada que imita.',
    pares: [
      ['CircularBuffer', 'Cola (Queue)'],
      ['Pair (mutable)', 'Dupla / Tupla'],
      ['StackSobrePQ', 'Pila (Stack)'],
      ['ClassHierarchy', 'Árbol binario']
    ],
    explicacion: 'El CircularBuffer imita una Cola (FIFO con vuelta en círculo); el Pair es una dupla pero mutable; StackSobrePQ es una Pila respaldada por otra estructura; y ClassHierarchy modela la jerarquía de clases sobre árboles binarios.'
  }
];
