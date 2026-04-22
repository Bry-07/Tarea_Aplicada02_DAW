// ================================================
// ROCKOLA - Ejercicio 02
// canciones.js  -  DOM y Expresiones Regulares
// ================================================


// -----------------------------------------------
// 1. LISTA DE 20 CANCIONES
//    - Agrega la ruta de tu imagen en "imagen"
//    - Agrega la ruta de tu audio en "audio"
// -----------------------------------------------
var canciones = [
    // --- CUMBIA ---
    { titulo: "Cómo Te Voy a Olvidar",   artista: "Los Ángeles Azules",    genero: "Cumbia",      imagen: "img/LAA-como-te-voy-a-olvidar-portada.webp",          audio: "audio/Los Ángeles Azules - Como Te Voy A Olvidar (Letra).mp3" },
    { titulo: "Nunca Es Suficiente",      artista: "Los Ángeles Azules",    genero: "Cumbia",      imagen: "img/ab67616d0000b273ee781f78d61281d76e98e900.jpg",          audio: "audio/Los Ángeles Azules - Nunca Es Suficiente ft. Natalia Lafourcade (letra).mp3" },
    { titulo: "La Cumbia Sampuesana",     artista: "Carlos Vives",          genero: "Cumbia",      imagen: "img/a4234884308_10.jpg",          audio: "audio/Cumbia Sampuesana.mp3" },

    // --- FOLCLORE ---
    { titulo: "El Torito Pinto",          artista: "Folklore Salvadoreño",  genero: "Folclore",    imagen: "img/folklor.jpeg",        audio: "audio/Folclor de El Salvador - El Torito Pinto.mp3" },
    { titulo: "El Carbonero",             artista: "Folklore Salvadoreño",  genero: "Folclore",    imagen: "img/Festival_para_el_Buen_Vivir_y_Gobernando_con_la_Gente_-San_Miguel._(24558149730).jpg",        audio: "audio/El Carbonero.mp3" },
    { titulo: "Adentro Cojutepeque",      artista: "Folklore Salvadoreño",  genero: "Folclore",    imagen: "img/COopJBnWUAAaa_z.jpg",        audio: "audio/Adentro  Cojutepeque.mp3" },

    // --- ROCK INGLÉS ---
    { titulo: "Chop Suey!",               artista: "System of a Down",      genero: "Rock Inglés", imagen: "img/sys.webp",      audio: "audio/system of a down  chop suey!  sub. español.mp3" },
    { titulo: "Nothing Else Matters",     artista: "Metallica",             genero: "Rock Inglés", imagen: "img/nothing.jpg",      audio: "audio/Metallica- Nothing else matters (sub. españolinglés).mp3" },
    { titulo: "Under the Bridge",         artista: "Red Hot Chili Peppers", genero: "Rock Inglés", imagen: "img/under.jpg",      audio: "audio/Red Hot Chili Peppers - Under The Bridge (Lyrics).mp3" },
    { titulo: "November Rain",            artista: "Guns N' Roses",         genero: "Rock Inglés", imagen: "img/noven.jpg",      audio: "audio/Guns N' Roses - November Rain.mp3" },

    // --- ROCK ESPAÑOL ---
    { titulo: "Desde Mi Cielo",           artista: "Mägo de Oz",            genero: "Rock Español",imagen: "img/cielo.jpg",    audio: "audio/Desde mi cielo.mp3" },
    { titulo: "De Música Ligera",         artista: "Soda Stereo",           genero: "Rock Español",imagen: "img/music.jpg",    audio: "audio/Soda Stereo - De Música Ligera (Lyrics).mp3" },
    { titulo: "Rayando el Sol",           artista: "Maná",                  genero: "Rock Español",imagen: "img/sol.jpg",    audio: "audio/Maná  Rayando el Sol [Letra].mp3" },

    // --- ROMÁNTICAS ---
    { titulo: "Mary es mi Amor",         artista: "Leo Dan",               genero: "Romántica",   imagen: "img/mary.jpg",         audio: "audio/Leo Dan - Mary es mi amor (Letra).mp3" },
    { titulo: "Amor Eterno",              artista: "Rocío Dúrcal",          genero: "Romántica",   imagen: "img/love.jpg",         audio: "audio/Rocío Dúrcal  Amor Eterno [Letra].mp3" },
    { titulo: "Amar y Querer",            artista: "José José",             genero: "Romántica",   imagen: "img/amar.jpg",         audio: "audio/AMAR Y QUERER - José José (LETRA).mp3" },
    { titulo: "Simplemente Amigos",       artista: "Ana Gabriel",   genero: "Romántica",   imagen: "img/amigos.jpg",         audio: "audio/Ana Gabriel  Simplemente Amigos [Letra].mp3" },

    // --- INSTRUMENTALES ---
    { titulo: "Cat by the Fireplace",     artista: "Música Ambiental",      genero: "Instrumental",imagen: "img/instrumentales.jpg",  audio: "audio/Cat by the Fireplace.mp3" },
    { titulo: "Für Elise",               artista: "Ludwig van Beethoven",   genero: "Instrumental",imagen: "img/beto.jpg",  audio: "audio/Beethoven - Für Elise.mp3" },
    { titulo: "Canon in D",              artista: "Johann Pachelbel",       genero: "Instrumental",imagen: "img/ca.webp",  audio: "audio/Canon in D - Pachelbel.mp3" },
];


// -----------------------------------------------
// 2. REFERENCIAS AL DOM
// -----------------------------------------------
var inputBuscar    = document.getElementById('inputBuscar');
var listaCanciones = document.getElementById('listaCanciones');
var mensajeInicial = document.getElementById('mensajeInicial');
var infoCancion    = document.getElementById('infoCancion');
var imgCancion     = document.getElementById('imgCancion');
var audioCancion   = document.getElementById('audioCancion');
var tituloCancion  = document.getElementById('tituloCancion');
var artistaCancion = document.getElementById('artistaCancion');
var generoCancion  = document.getElementById('generoCancion');


// -----------------------------------------------
// 3. MOSTRAR TODAS LAS CANCIONES AL CARGAR
// -----------------------------------------------
function mostrarCanciones() {
    listaCanciones.innerHTML = ''; // Limpia la lista

    for (var i = 0; i < canciones.length; i++) {
        var cancion = canciones[i];

        // Crear el elemento div para la canción
        var item = document.createElement('div');
        item.className = 'item-cancion';
        item.setAttribute('data-index', i); // guarda la posición del arreglo

        item.innerHTML =
            '<div class="nombre-cancion">' + (i + 1) + '. ' + cancion.titulo + '</div>' +
            '<div class="info-extra">' + cancion.artista + ' · ' + cancion.genero + '</div>';

        // Al hacer clic, seleccionar la canción
        item.addEventListener('click', function () {
            seleccionarCancion(this);
        });

        listaCanciones.appendChild(item);
    }
}


// -----------------------------------------------
// 4. SELECCIONAR CANCIÓN → MOSTRAR IMAGEN Y AUDIO
// -----------------------------------------------
function seleccionarCancion(itemClickeado) {
    // Quitar la clase "seleccionado" del anterior
    var todos = document.querySelectorAll('.item-cancion');
    for (var i = 0; i < todos.length; i++) {
        todos[i].classList.remove('seleccionado');
    }

    // Marcar el item clickeado
    itemClickeado.classList.add('seleccionado');

    // Obtener los datos de la canción usando el índice guardado
    var index   = itemClickeado.getAttribute('data-index');
    var cancion = canciones[index];

    // Actualizar el panel derecho
    imgCancion.src     = cancion.imagen;
    imgCancion.alt     = cancion.genero;
    audioCancion.src   = cancion.audio;
    tituloCancion.textContent  = cancion.titulo;
    artistaCancion.textContent = '' + cancion.artista;
    generoCancion.textContent  = '' + cancion.genero;

    // Mostrar el panel (estaba oculto)
    mensajeInicial.style.display = 'none';
    infoCancion.style.display    = 'block';
}


// -----------------------------------------------
// 5. FILTRAR CON EXPRESIÓN REGULAR AL ESCRIBIR
// -----------------------------------------------
inputBuscar.addEventListener('input', function () {
    var busqueda = this.value; // Texto que escribe el usuario

    // Crear la expresión regular con el texto escrito
    // 'i' = ignora mayúsculas/minúsculas
    var regex = new RegExp(busqueda, 'i');

    // Recorrer todos los items y mostrar/ocultar según coincidencia
    var items = document.querySelectorAll('.item-cancion');
    for (var i = 0; i < items.length; i++) {
        var nombreCancion = canciones[i].titulo;

        if (regex.test(nombreCancion)) {
            items[i].classList.remove('oculto'); // La muestra
        } else {
            items[i].classList.add('oculto');    // La oculta
        }
    }
});


// -----------------------------------------------
// 6. INICIAR: mostrar canciones al cargar la página
// -----------------------------------------------
mostrarCanciones();
