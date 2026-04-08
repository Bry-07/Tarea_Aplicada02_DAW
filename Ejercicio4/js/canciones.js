document.addEventListener('DOMContentLoaded', function () { // Cuando el html esté listo, ejecuta esta función, parecido al window.onload pero más específico para el HTML
    const songsByPage = { // objeto que almacena las canciones por página y que funciona como una tabla de datos en memoria, la clave es 'cumbias.html' y el valor es un array de canciones entonces se guía por el array para mostrarlas en el html
        'cumbias.html': ['Cómo te voy a olvidar','Nunca es suficiente', 'La cumbia sampuesana', 'Fiesta Cumbianera', 'Sombrero Azul'],
        'folclore.html': ['El carbonero','Las Cortadoras','Adentro Cojutepeque','Mi Tierra Querida','El Torito Pinto'],
        'rock-ingles.html': ['I Don\'t Want To Miss A Thing','Nothing Else Matters','Can\'t Stop','November Rain','Under The Bridge'],
        'rock-espanol.html': ['Rayando el Sol','Entre dos Tierras','De música Ligera','Desde mi Cielo','Amargo Adiós'],
        'romanticas.html': ['Bachata en Fukuoka','Amar y Querer','Simplemente Amigos','Amor Eterno','María es mi amor'],
        'instrumentales.html': ['Cat by the Fireplace','Canon in D','Für Elise','River Flows in You','The Pink Panther Theme']
    };

    // obtener nombre de archivo actual
    const parts = location.pathname.split('/'); // Splitea el path de la página actual, el path es la dirección de la página, por ejemplo '/home/usuario/Documentos/html/index.html' y sirve para identificar la página que se está cargando
    const file = parts[parts.length - 1] || parts[parts.length - 2]; // esto obtiene el último elemento del array que es el nombre del archivo, si el último es vacío (por ejemplo si la URL termina con '/') entonces toma el penúltimo,
    // esto es para manejar casos donde la URL puede terminar con '/' o no y con eso sabe en qué página estamos de forma muy específica ya que luego

    const list = songsByPage[file]; // Utilizamos esto, y lo anterior obtiene el nombre del archivo exacto para obtener la lista de canciones correspondiente a esa página, por ejemplo si estamos en 'cumbias.html' entonces list será el 
    // array de canciones de cumbias, si no encuentra el archivo en el objeto entonces list será undefined

    /*
    Básicamente, con esas tres lineas obtenemos el nombre del archivo conforme a la ruta, luego con ese nombre obtenemos la lista de canciones correspondiente 
    a esa página, y luego con esa lista podemos mostrar las canciones en el HTML, agregándolos al contenedor adecuado en el HTML.
    */

    const container = document.getElementById('songContainer'); // Obtenemos el contenedor conforme a la ID
    if (!container || !list) return; // Si está vacío o no existe, no hace nada

    function render() { // En cambio si existe, renderiza las canciones en el HTML
        container.innerHTML = list.map((s, i) => // Para cada canción en la lista
            `<div class="song-item"><span class="song-number">${i+1}.</span> <span class="song-label">${s}</span></div>` // 
        ).join(''); // map() recorre el arreglo para cada canción, s = nombre de la canción, i = posición y genera html incrustando
        // el nombre de la canción en el html como un div con clase 'song-item' y el número de la canción como el número de la canción
        // que suma 1 a cada elemento del array, y luego separa cada canción con un salto de línea
        // al final, .join('') junta todos los elementos del array en un solo string
    }

    // render inicial
    render(); // llamada a la función render para mostrar las canciones al cargar la página

    // actualizar título h2 si existe
    const h2 = document.querySelector('h2'); // Obtenemos el elemento h2 de la página y se actualiza ya que busca el primer h2 en la página
    if (h2) h2.textContent = file.replace('.html','').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    /*
    Básicamente el if se encarga de limpiar el documento en el que nos encontramos, por ejemplo el documento "rock-ingles.html" se convierte en "Rock Ingles" 
    y lo muestra como título, esto es para que el título sea dinámico y se adapte a cada página sin necesidad de escribirlo manualmente en cada HTML, 
    sino que se genera automáticamente a partir del nombre del archivo.
    */

    // manejar botón de agregar canción (si existe en la página)
    const btn = document.getElementById('btnAgregarSong'); // Obtenemos el botón de agregar canción por su ID, si no existe, no hace nada, pero si existe, 
    // le agregamos un evento click para que al hacer clic en el botón se ejecute la función que agrega una nueva canción a la lista

    if (btn) {  // Si existe ejecuta el código, sino, no hace nada, funciona para que no se rompa en todas las páginas si es que en alguna no existe
        btn.addEventListener('click', function () { // Agregamos el evento click al botón
            const nueva = prompt('Ingrese el nombre de la nueva canción:'); // Muestra un prompt para que ingrese el nombre de la canción
            if (nueva && nueva.trim()) { // Si el nombre no está vacío y no es solo espacios, entonces agrega la canción a la lista, trim() elimina los espacios al inicio y al final del string
                list.push(nueva.trim()); // Agrega la canción a la lista en el html (push es como empujar o agregar algo a un array)
                render(); // Renderiza la lista de canciones en el html
            }
        });
    }
});