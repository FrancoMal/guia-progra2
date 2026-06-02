# Guía de estudio interactiva — Programación 2 (Java / Algoritmos y Estructuras de Datos)

**Fecha:** 2026-06-02
**Estado:** Diseño aprobado (pendiente revisión del spec)

## 1. Propósito

Construir una guía de estudio web, interactiva y **100% offline**, para la materia
**Programación 2** (TDAs en Java, patrón `api`/`imp`/`prin`). Inspirada en
`https://francomal.github.io/practica-progra1/`, pero adaptada a algoritmos y
estructuras de datos en vez de funciones de Python.

El producto se publicará en **GitHub Pages**, pero debe funcionar también abriendo
los archivos con doble clic (sin servidor, sin build, sin conexión a internet).

## 2. Alcance y fases

El proyecto se decompone en fases. **Este spec cubre la Fase 1.** Las fases 2 y 3
se diseñan acá para que la estructura las soporte, pero se construyen después en
sus propios ciclos spec → plan.

- **Fase 1 (este spec):** estructura navegable completa + **teoría** de los 12 temas.
  Incluye: shell compartido (menú, navegación, tema claro/oscuro, progreso),
  portada, resaltado de código Java offline, y el contenido teórico de cada tema.
- **Fase 2 (después):** actividades interactivas por tema (quiz, ordenar código,
  corregir errores, trazar estructura/predecir salida, análisis de costo).
- **Fase 3 (opcional):** simuladores animados paso a paso (push/pop, recorridos).

### Objetivos (Fase 1)
- Navegación clara entre 4 bloques y 12 temas.
- Teoría correcta, didáctica y alineada al estilo del curso (precondiciones,
  implementaciones LD/A/AO, análisis de costo O()).
- Código Java legible con resaltado de sintaxis, sin dependencias externas.
- Modo claro/oscuro y seguimiento de progreso persistente.
- Responsive (estudiar desde el celular).

### No-objetivos (YAGNI)
- Sin backend, sin base de datos, sin login.
- Sin framework (React/Vue) ni paso de build (sin npm, sin bundler).
- Sin CDNs ni recursos remotos (todo vendoreado/propio).
- Las actividades interactivas NO se implementan en Fase 1 (solo se reserva el lugar).

## 3. Arquitectura

Sitio **estático multi-página** en HTML + CSS + JavaScript vanilla.

Decisión clave: el "cromo" compartido (menú lateral, encabezado, toggle de tema,
navegación anterior/siguiente, barra de progreso) lo **genera `app.js` en cada
página**. Esto evita duplicar HTML y, como NO usa `fetch()`, funciona con doble
clic en `file://` (sin errores de CORS). El contenido teórico de cada tema vive
como HTML estático dentro de su página (legible e imprimible aunque el JS falle).

### Estructura de archivos
```
index.html                  Portada: 4 bloques, accesos a temas, progreso global
assets/
  styles.css                Estilos (variables CSS para claro/oscuro)
  data.js                   Fuente de verdad: bloques + temas (orden, títulos, slugs)
  app.js                    Arma menú/nav/tema/progreso + resaltador de Java
temas/
  recursividad.html
  complejidad.html
  listas.html
  ordenamiento.html
  pila.html
  cola.html
  cola-prioridad.html
  conjunto.html
  diccionario-simple.html
  diccionario-multiple.html
  arboles.html
  grafos.html
docs/superpowers/specs/     (este documento)
```

### Modelo de datos (`assets/data.js`)
Define el árbol de navegación, consumido por `index.html` y por `app.js` en cada
página de tema:
```js
const BLOQUES = [
  { id: 'fundamentos', titulo: 'Fundamentos', temas: [
      { slug: 'recursividad',  titulo: 'Recursividad',              archivo: 'temas/recursividad.html' },
      { slug: 'complejidad',   titulo: 'Complejidad y Big-O',       archivo: 'temas/complejidad.html' },
      { slug: 'listas',        titulo: 'Memoria dinámica y listas', archivo: 'temas/listas.html' },
      { slug: 'ordenamiento',  titulo: 'Ordenamiento',              archivo: 'temas/ordenamiento.html' },
  ]},
  { id: 'lineales', titulo: 'TDAs lineales', temas: [
      { slug: 'pila',           titulo: 'Pila',              archivo: 'temas/pila.html' },
      { slug: 'cola',           titulo: 'Cola',              archivo: 'temas/cola.html' },
      { slug: 'cola-prioridad', titulo: 'Cola de Prioridad', archivo: 'temas/cola-prioridad.html' },
  ]},
  { id: 'conjuntos', titulo: 'Conjuntos y Diccionarios', temas: [
      { slug: 'conjunto',             titulo: 'Conjunto',            archivo: 'temas/conjunto.html' },
      { slug: 'diccionario-simple',   titulo: 'Diccionario Simple',  archivo: 'temas/diccionario-simple.html' },
      { slug: 'diccionario-multiple', titulo: 'Diccionario Múltiple',archivo: 'temas/diccionario-multiple.html' },
  ]},
  { id: 'arboles-grafos', titulo: 'Árboles y Grafos', temas: [
      { slug: 'arboles', titulo: 'Árboles (Binario, ABB, AVL)', archivo: 'temas/arboles.html' },
      { slug: 'grafos',  titulo: 'Grafos',                       archivo: 'temas/grafos.html' },
  ]},
];
```
Rutas relativas: las páginas de `temas/` referencian `../assets/...` y `../index.html`.
`app.js` detecta la página actual con `<body data-tema="pila">` para marcar el ítem
activo del menú y calcular anterior/siguiente.

## 4. Comportamiento del shell (`app.js`)

Responsabilidades (todas sin red, sin fetch):
1. **Construir el menú lateral** desde `BLOQUES`, con bloques colapsables, resaltando
   el tema actual.
2. **Navegación anterior/siguiente** entre temas según el orden de `data.js`.
3. **Tema claro/oscuro:** toggle que persiste en `localStorage` (`progra2:tema`);
   respeta `prefers-color-scheme` la primera vez.
4. **Progreso:** botón "Marcar como leído" por tema; estado en `localStorage`
   (`progra2:progreso` = `{ [slug]: true }`); la portada muestra "X/12" y una barra.
5. **Resaltado de Java:** resaltador propio basado en regex que aplica a los bloques
   `<pre><code class="java">`. Cubre: comentarios (`//`, `/* */`), strings, palabras
   clave (`class`, `public`, `void`, `int`, `if`, `while`, `return`, `new`, `null`,
   `boolean`, `interface`, `implements`, `@Override`, etc.), tipos con mayúscula
   inicial, y números. Sin dependencias externas.
6. **Menú responsive:** en pantallas chicas el menú lateral se colapsa en un botón
   hamburguesa.

`app.js` debe ser robusto: si un tema no define `data-tema`, igual renderiza el menú
sin romper.

## 5. Anatomía de una página de tema (Fase 1)

Cada `temas/*.html` contiene, en este orden:
1. **¿Qué es y cuándo se usa?** — intuición + analogía cotidiana.
2. **Interfaz del TDA** — operaciones con sus **precondiciones** (igual que los
   `api/*.java` del curso). Para temas no-TDA (recursividad, complejidad,
   ordenamiento) esta sección se adapta a "ideas clave".
3. **Implementaciones** — código Java comentado (una o más: LD / A / AO) con una
   descripción/diagrama del comportamiento. Los diagramas se hacen con HTML/CSS o
   SVG embebido (nunca imágenes externas, para no romper el funcionamiento offline).
4. **Costo** — tabla Big-O por operación y el porqué.
5. **Errores comunes / trampas de parcial.**
6. **Resumen / cheat-sheet.**
7. **Sección de actividades** — contenedor vacío con un cartel "Próximamente"
   (se llena en Fase 2).

El contenido teórico se basa en el código real de la carpeta `ejemplos codigo/`
(Pila, Cola de Prioridad LD/DA/AO, Conjunto AR/LD, Diccionario Simple/Múltiple,
Grafo MA) para mantener fidelidad con el curso, incluyendo convenciones como el
nodo "turista" para recorrer listas.

## 6. Temas y orden (12 temas en 4 bloques)

1. **Fundamentos:** Recursividad · Complejidad y Big-O · Memoria dinámica y listas
   enlazadas · Ordenamiento (selección, inserción, burbuja, quicksort, mergesort)
2. **TDAs lineales:** Pila · Cola · Cola de Prioridad
3. **Conjuntos y Diccionarios:** Conjunto · Diccionario Simple · Diccionario Múltiple
4. **Árboles y Grafos:** Árboles (Binario, ABB, AVL) · Grafos (matriz/lista de
   adyacencia, DFS/BFS, caminos)

## 7. Diseño visual

- **Layout:** menú lateral fijo a la izquierda + contenido a la derecha; en mobile,
  menú colapsable.
- **Tema claro/oscuro** con variables CSS (`--bg`, `--fg`, `--acento`, etc.).
- **Código:** monoespaciada, fondo diferenciado, resaltado de sintaxis, scroll
  horizontal si hace falta.
- **Componentes:** tarjetas para bloques en la portada, tablas para análisis de
  costo, "callouts" para tips y errores comunes.
- **Tipografía/estética:** limpia y legible, foco en el estudio; español en toda la UI.
- **Accesibilidad:** contraste suficiente, navegable por teclado, HTML semántico.

## 8. Actividades interactivas (Fase 2 — diseñadas, no implementadas ahora)

Adaptación de las del sitio de referencia a estructuras de datos:
- **Quiz conceptual** (opción múltiple / verdadero-falso).
- **Ordenar código** (drag&drop de líneas para armar un método o algoritmo).
- **Corregir errores** (encontrar y arreglar el bug de un fragmento).
- **Trazar la estructura / predecir salida** — reemplazo de "¿qué devuelve el
  return?": dada una secuencia de operaciones sobre el TDA, indicar el estado final
  de la estructura y/o qué imprime.
- **Análisis de costo** — elegir el O() de un fragmento (propio de Programación 2).

La Fase 1 deja en cada página un contenedor `<section class="actividades">` listo
para alojar estos widgets.

## 9. Verificación

- Abrir `index.html` y cada `temas/*.html` con doble clic (protocolo `file://`) y
  confirmar que: el menú se arma, la navegación anterior/siguiente funciona, el
  toggle de tema persiste, el progreso persiste, y el código Java aparece resaltado.
- Validar que no haya ninguna petición de red (todo offline).
- Revisar responsive en viewport angosto.

## 10. Despliegue

GitHub Pages servirá la raíz del repositorio. Al ser estático y con rutas relativas,
no requiere configuración especial. (La inicialización de git / repo se hará cuando
el usuario lo indique; no es parte de la Fase 1.)

## 11. Decomposición para el plan de implementación

Orden sugerido de construcción:
1. `data.js` (fuente de verdad de la navegación).
2. `styles.css` (incluye claro/oscuro y responsive).
3. `app.js` (menú, navegación, tema, progreso, resaltador Java).
4. `index.html` (portada + progreso global).
5. Una página de tema "plantilla" completa (ej. **Pila**) para fijar el formato.
6. Las 11 páginas de tema restantes siguiendo la plantilla.
7. Verificación offline de todo el conjunto.
