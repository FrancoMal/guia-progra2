/* Actividades de práctica — ¿Qué es un TDA? (Fundamentos, Unidad I).
   El código va como string normal (template literals): NO hace falta escapar < > &. */
window.ACTIVIDADES = [
  {
    tipo: 'quiz',
    enunciado: '¿Qué define a un Tipo de Dato Abstracto (TDA)?',
    opciones: ['Su comportamiento: qué operaciones ofrece y qué hace cada una',
               'La estructura interna concreta con la que guarda los datos',
               'El lenguaje de programación en el que está escrito'],
    correcta: 0,
    explicacion: 'Un TDA queda definido por su comportamiento (semántica) visto desde el usuario: las operaciones y qué hacen. Los detalles de cómo se guardan los datos quedan ocultos.'
  },
  {
    tipo: 'quiz',
    enunciado: 'En la separación especificación / implementación, ¿qué cosa pertenece a la ESPECIFICACIÓN (el "qué")?',
    opciones: ['Que la pila se guarda en un arreglo de tamaño 100',
               'Que desapilar() saca el último elemento que entró y requiere pila no vacía',
               'Que cada nodo de la lista enlazada apunta al siguiente'],
    correcta: 1,
    explicacion: 'La especificación es el contrato: qué hace cada operación y qué precondiciones exige. Usar un arreglo o nodos enlazados es parte del "cómo" (la implementación), no del "qué".'
  },
  {
    tipo: 'quiz',
    enunciado: 'Un mismo TDA puede tener varias implementaciones. ¿Qué tiene que cumplirse para que el usuario pueda cambiar una por otra sin enterarse?',
    opciones: ['Que ambas usen exactamente la misma estructura interna de datos',
               'Que las dos estén escritas por el mismo programador',
               'Que ambas respeten la misma interfaz y la misma semántica (el contrato)'],
    correcta: 2,
    explicacion: 'Mientras la interfaz y el comportamiento prometido no cambien, las implementaciones son intercambiables. El usuario programa contra la interfaz, así que el "cómo" interno puede variar sin afectarlo.'
  },
  {
    tipo: 'quiz',
    enunciado: 'En el esquema de las 3 vistas de un TDA, ¿qué le interesa a la vista del USUARIO?',
    opciones: ['Cómo está implementada cada operación por dentro',
               'Qué operaciones puede invocar y qué obtiene de ellas',
               'Cómo administrar la memoria de los nodos'],
    correcta: 1,
    explicacion: 'El usuario trabaja en el nivel de abstracción más alto: solo le importa qué operaciones invoca y qué resultado obtiene. El cómo está implementado es asunto del implementador.'
  },
  {
    tipo: 'quiz',
    enunciado: '¿Qué significa que una implementación de un TDA sea CORRECTA?',
    opciones: ['Que funciona al menos en un caso de prueba',
               'Que se comporta como se espera para cualquier estado válido posible',
               'Que usa la menor cantidad de memoria posible'],
    correcta: 1,
    explicacion: 'La corrección exige cumplir el contrato en todos los estados válidos: con la estructura vacía, con un elemento, llena, etc. No alcanza con que ande en un caso puntual.'
  },
  {
    tipo: 'quiz',
    enunciado: 'La operación desapilar() de una pila tiene como precondición que la pila no esté vacía. Si se la invoca con la pila vacía, ¿qué pasa según el contrato del TDA?',
    codigo:
`// pila vacía
p.desapilar();   // se viola la precondición`,
    opciones: ['El TDA garantiza que no hace nada y sigue funcionando',
               'Se rompe el contrato y el TDA no garantiza ningún resultado',
               'El TDA crea automáticamente un elemento para poder sacarlo'],
    correcta: 1,
    explicacion: 'Violar una precondición rompe el contrato: el TDA deja de garantizar su comportamiento (puede explotar con NullPointerException, dar basura, etc.). Verificar la precondición es responsabilidad del usuario.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Una implementación con arreglo de tamaño fijo (MAX) ya llena recibe un apilar(x). ¿Qué eje del TDA explica el problema y qué pasa?',
    opciones: ['Es estática: tiene tamaño fijo, así que se desborda (overflow) y revienta',
               'Es dinámica: pide otro nodo y crece sin problema',
               'Es destructiva: el apilar borra los elementos previos'],
    correcta: 0,
    explicacion: 'Una implementación estática reserva un arreglo de tamaño fijo; si está lleno y se intenta apilar, no hay posición libre y se produce un overflow (ArrayIndexOutOfBoundsException). La versión dinámica con lista no tiene ese límite.'
  },
  {
    tipo: 'quiz',
    enunciado: 'Según el eje "destructiva vs. no destructiva", ¿por qué se dice que una pila es DESTRUCTIVA?',
    opciones: ['Porque al apilar borra todos los elementos anteriores',
               'Porque la única forma de leer todos sus elementos es ir desapilándolos, y eso la consume',
               'Porque su implementación con arreglo se puede desbordar'],
    correcta: 1,
    explicacion: 'Destructiva quiere decir que recorrerla la consume: para ver todos los elementos de la pila hay que ir sacándolos uno a uno, y al terminar queda vacía. Una estructura con iterador no destructivo se puede recorrer sin alterarla.'
  },
  {
    tipo: 'mapear',
    enunciado: 'Asociá cada concepto de TDA con su descripción correcta.',
    pares: [
      ['Especificación', 'El "qué": interfaz, semántica y precondiciones'],
      ['Implementación', 'El "cómo": el código concreto (arreglo o lista)'],
      ['Estado', 'Los valores que guarda el TDA en un instante'],
      ['Precondición', 'Lo que debe cumplirse antes de invocar una operación']
    ],
    explicacion: 'La especificación es el contrato (qué); la implementación es el código que lo cumple (cómo); el estado son los valores actuales; la precondición es la condición previa que el usuario debe garantizar para invocar la operación.'
  },
  {
    tipo: 'mapear',
    enunciado: 'Cada eje para describir un TDA es una pregunta sí/no. Asociá cada eje con un ejemplo correcto.',
    pares: [
      ['Lineal vs. no lineal', 'La pila es lineal; un árbol es no lineal'],
      ['Estática vs. dinámica', 'StaticSet (arreglo) vs. DynamicSBT (crece a demanda)'],
      ['Mutable vs. inmutable', 'Una pila cambia con apilar; un String de Java no cambia'],
      ['Destructiva vs. no destructiva', 'Leer una pila la consume; un conjunto con iterador no']
    ],
    explicacion: 'Lineal/no lineal mira si hay ramificación; estática/dinámica si el tamaño es fijo o crece; mutable/inmutable si las operaciones modifican el estado; destructiva/no destructiva si recorrerla la consume.'
  }
];
