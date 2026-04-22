// imagen-audio.js - Maneja el hover en imágenes con audio y pulsos

document.addEventListener('DOMContentLoaded', function () { // Cuando el HTML esté listo, ejecuta esta función
    // obtener imagen y audio
    const imagen = document.querySelector('.imgfix'); // Obtiene la clase de imagen (query más utilizado para clases)
    const audio = document.getElementById('audioGenero'); // Obtiene el audio por su ID

    // si no existen, salir
    if (!imagen || !audio) return; // si no existe, no hace nada para que no se rompa

    // cuando el mouse entra en la imagen
    imagen.addEventListener('mouseenter', function () {
        imagen.classList.add('pulsando'); // inicia pulsos
        audio.play(); // reproduce el audio
    });

    // cuando el mouse sale de la imagen
    imagen.addEventListener('mouseleave', function () {
        imagen.classList.remove('pulsando'); // detiene pulsos
        audio.pause(); // pausa el audio
        audio.currentTime = 0; // reinicia desde el inicio
    });
});
