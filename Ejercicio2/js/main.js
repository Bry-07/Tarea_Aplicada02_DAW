//Cuando la página se cargue, muestra el menú
window.onload = function () {
    mostrarMenu(); // Llamada a la función mostrarMenu
};

function mostrarMenu() { // Función que muestra el menú

    var opcion = prompt( // Muestra el menú y pide una opción
        "Menú\n" +
        "1. Cumbias\n" +
        "2. Folclore Salvadoreño\n" +
        "3. Rock Inglés\n" +
        "4. Rock Español\n" +
        "5. Románticas\n" +
        "6. Instrumentales\n" +
        "7. Salir"
    );

    if (opcion == null) {
        return; // Si cancela, no hace nada
    }

    switch (opcion) { // Redirige según la opción elegida
        case "1":
            window.location.href = "cumbias.html"; // Redirige a cumbias.html y cambia de página
            break;
        case "2":
            window.location.href = "folclore.html"; // Redirige a folclore.html
            break;
        case "3":
            window.location.href = "rock-ingles.html";
            break;
        case "4":
            window.location.href = "rock-espanol.html";
            break;
        case "5":
            window.location.href = "romanticas.html";
            break;
        case "6":
            window.location.href = "instrumentales.html";
            break;
        case "7":
            window.location.href = "salir.html";
            break;
        default:
            alert("Opción no válida"); // si se escribe algo que no es del 1 al 7, muestra un error 
            mostrarMenu(); // vuelve a preguntar solo si es inválida
    }
}