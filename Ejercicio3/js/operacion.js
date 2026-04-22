// Precio constante de entrada
const PRECIO_ENTRADA = 3.00;
const KEY_CONTADOR = 'comprasCineContador';

// Información de películas
// Cada película tiene un nombre y un array de horarios disponibles
const peliculas = {
    'Si Tuviera 30': {
        horarios: ['2:00 PM', '5:30 PM', '8:00 PM', '10:30 PM']
    },
    '10 Cosas que Odio de Ti': {
        horarios: ['1:00 PM', '4:00 PM', '7:00 PM', '9:30 PM']
    },
    'Nacho Libre': {
        horarios: ['3:00 PM', '6:00 PM', '9:00 PM']
    }
};

// Variables para la compra actual
let compraActual = {
    pelicula: '',
    horario: ''
};

// Inicializar al cargar la página
// Agregar event listener para DOMContentLoaded para inicializar las ventanas, posicionarlas, cargar compras y ocultar el botón de abrir
window.addEventListener('DOMContentLoaded', function () {
    inicializarVentanas();
    posicionarVentanas();
    cargarComprasDelStorage();
    ocultarBotonAbrir(); // Ocultar el botón al inicio
});

// Hacer las ventanas movibles
// Función para inicializar el movimiento de las ventanas al hacer clic en su barra de título
function inicializarVentanas() {
    const ventanas = ['ventana1', 'ventana2', 'ventana3'];

    // Agregar eventos de mouse para cada ventana
    // Al hacer clic en la barra de título, iniciar el movimiento
    // Al mover el mouse, actualizar la posición de la ventana
    // Al soltar el mouse, detener el movimiento
    ventanas.forEach(ventanaId => {
        const ventana = document.getElementById(ventanaId);
        const titulo = document.getElementById('titulo' + ventanaId.slice(-1));

        let posX = 0,
            posY = 0,
            posActualX = 0,
            posActualY = 0;

        titulo.onmousedown = iniciarMovimiento;

        function iniciarMovimiento(e) {
            e.preventDefault();
            posActualX = e.clientX;
            posActualY = e.clientY;

            document.onmousemove = moverVentana;
            document.onmouseup = detenerMovimiento;
        }

        function moverVentana(e) {
            posX = posActualX - e.clientX;
            posY = posActualY - e.clientY;
            posActualX = e.clientX;
            posActualY = e.clientY;

            ventana.style.top = (ventana.offsetTop - posY) + 'px';
            ventana.style.left = (ventana.offsetLeft - posX) + 'px';
            ventana.style.zIndex = 999;
        }

        function detenerMovimiento() {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    });
}

// Cerrar ventana
// Función para cerrar una ventana específica y verificar si se debe mostrar el botón de abrir
function cerrarVentana(ventanaId) {
    document.getElementById(ventanaId).style.display = 'none';
    verificarVentanas(); // Verificar si mostrar el botón de abrir
}

// Función para verificar si hay ventanas cerradas
// Si alguna ventana está cerrada, mostrar el botón de abrir todas; si todas están abiertas, ocultar el botón
function verificarVentanas() {
    const ventanas = ['ventana1', 'ventana2', 'ventana3'];
    const algunaCerrada = ventanas.some(ventanaId => document.getElementById(ventanaId).style.display === 'none');
    const btnAbrirTodas = document.getElementById('btn-abrir-todas');

    if (algunaCerrada) {
        btnAbrirTodas.classList.remove('oculto');
    } else {
        btnAbrirTodas.classList.add('oculto');
    }
}

// Ocultar el botón al inicio
// Función para ocultar el botón de abrir todas las ventanas al cargar la página
function ocultarBotonAbrir() {
    const btnAbrirTodas = document.getElementById('btn-abrir-todas');
    btnAbrirTodas.classList.add('oculto');
}

// Abrir todas las ventanas
// Función para abrir todas las ventanas y verificar si se debe ocultar el botón de abrir
function abrirTodas() {
    const ventanas = ['ventana1', 'ventana2', 'ventana3'];
    ventanas.forEach(ventanaId => {
        document.getElementById(ventanaId).style.display = 'block';
    });
    verificarVentanas(); // Ocultar el botón si todas están abiertas
}

// Función para posicionar las ventanas de manera ordenada al cargar la página
// Divide el contenedor en 3 secciones y centra cada ventana en su sección horizontalmente, con una separación vertical de 100px
function posicionarVentanas() {
    const contenedor = document.querySelector('.contenedor-principal');
    const anchoContenedor = contenedor.offsetWidth;
    const anchoVentana = 490;

    // Dividir el contenedor en 3 secciones y centrar cada ventana en su sección
    const anchoPorSeccion = anchoContenedor / 3;

    // Calcular las posiciones para cada ventana
    // Posiciona cada ventana en el centro de su sección, pero si el ancho del contenedor es muy pequeño, forzar la posición en 0 para evitar que se salga de la pantalla
    const posiciones = [
        { id: 'ventana1', x: anchoPorSeccion * 0 + (anchoPorSeccion - anchoVentana) / 2, y: 100 },
        { id: 'ventana2', x: anchoPorSeccion * 1 + (anchoPorSeccion - anchoVentana) / 2, y: 100 },
        { id: 'ventana3', x: anchoPorSeccion * 2 + (anchoPorSeccion - anchoVentana) / 2, y: 100 }
    ];

    // Aplicar las posiciones calculadas a cada ventana
    posiciones.forEach(pos => {
        const ventana = document.getElementById(pos.id);
        // Si el x calculado es negativo (pantalla pequeña), forzar en 0
        ventana.style.left = Math.max(0, pos.x) + 'px';
        ventana.style.top = pos.y + 'px';
    });
}

// Función para abrir el modal de compra con la información de la película y el horario seleccionado
function abrirCompra(nombrePelicula) {
    compraActual.pelicula = nombrePelicula;

    // Obtener el horario seleccionado
    // El número de película se obtiene a partir del índice del nombre en el objeto de películas, sumando 1 porque los IDs de los horarios empiezan en 1
    const numPelicula = Object.keys(peliculas).indexOf(nombrePelicula) + 1;
    const horariosSelect = document.getElementById('horario' + numPelicula);
    compraActual.horario = horariosSelect.value;

    // Llenar el modal
    document.getElementById('nombre-pelicula').value = nombrePelicula;
    document.getElementById('horario-compra').value = compraActual.horario;
    document.getElementById('cantidad-entradas').value = 1;

    // Actualizar el total a pagar al abrir el modal
    actualizarTotal();
    // Mostrar el modal
    document.getElementById('modal-compra').classList.remove('oculto');
}

// Función para actualizar el total a pagar en el modal de compra
// Calcula el total multiplicando la cantidad de entradas por el precio de la entrada y actualiza el texto en el modal
// Si la cantidad es menor a 1, muestra un total de $0.00
function actualizarTotal() {
    const cantidad = parseInt(document.getElementById('cantidad-entradas').value) || 1;
    let total;
    if (cantidad >= 1) {
        total = (cantidad * PRECIO_ENTRADA).toFixed(2);
        document.getElementById('total-precio').textContent = 'Total a Pagar: $' + total;
    } else {
        document.getElementById('total-precio').textContent = 'Total a Pagar: $0.00';
    }
}

// Agrega un event listener para el campo de cantidad de entradas para actualizar el total cada vez que cambie o se ingrese un valor
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cantidad-entradas')?.addEventListener('change', actualizarTotal);
    document.getElementById('cantidad-entradas')?.addEventListener('input', actualizarTotal);
});

// Función para confirmar la compra, guardar los datos en localStorage y mostrar un resumen de la compra
// Utilizamos el .value de los campos del modal para obtener la información actualizada, calculamos el total
// y luego guardamos la compra en localStorage utilizando la función guardarCompra. Finalmente, mostramos un 
// alert con el resumen de la compra y cerramos el modal.
function confirmarCompra() {
    const pelicula = document.getElementById('nombre-pelicula').value;
    const horario = document.getElementById('horario-compra').value;
    const cantidad = parseInt(document.getElementById('cantidad-entradas').value);
    const total = (cantidad * PRECIO_ENTRADA).toFixed(2);

    if (cantidad < 1) {
        alert('Ingrese una cantidad válida');
        return;
    }

    // Guardar en localStorage
    guardarCompra(pelicula, horario, cantidad, total);

    alert('¡Compra realizada exitosamente!\n\nPelícula: ' + pelicula + '\nHorario: ' + horario + '\nEntradas: ' + cantidad + '\nTotal: $' + total);

    cerrarModal();
}

// Guardar compra en localStorage
function guardarCompra(pelicula, horario, cantidad, total) {
    // Obtener el contador actual de compras
    // Si no existe, iniciar en 0
    let contador = parseInt(localStorage.getItem(KEY_CONTADOR)) || 0;
    contador++;

    // Crear un string con los datos separados por | para facilitar la lectura
    // Formato: pelicula|horario|cantidad|total|fecha
    const fecha = new Date().toLocaleString('es-ES');
    const datosCompra = pelicula + '|' + horario + '|' + cantidad + '|' + total + '|' + fecha;

    // Guardar en localStorage con una clave única (compra_1, compra_2, etc)
    localStorage.setItem('compra_' + contador, datosCompra);

    // Guardar el nuevo contador
    localStorage.setItem(KEY_CONTADOR, contador);
}

// Función para cargar las compras desde localStorage
// Lee el contador de compras para saber cuántas compras hay guardadas, luego recorre cada compra guardada,
// la divide por | para obtener los datos y las almacena en un array de objetos
function cargarComprasDelStorage() {
    let compras = [];
    // Obtener el contador de compras para saber cuántas compras hay guardadas
    // Inicialmente, si no existe, se considera que hay 0 compras
    let contador = parseInt(localStorage.getItem(KEY_CONTADOR)) || 0;

    // Recorrer todas las compras guardadas
    for (let i = 1; i <= contador; i++) {
        const datosCompra = localStorage.getItem('compra_' + i);
        if (datosCompra) {
            // Dividir el string por | para obtener los datos
            // split para convertir el string en un array, luego crear un objeto con los datos y agregarlo al array de compras
            const partes = datosCompra.split('|');
            // Push de un objeto con los datos de la compra al array de compras, incluyendo el número de compra para mostrarlo en el resumen
            compras.push({
                numero: i,
                pelicula: partes[0],
                horario: partes[1],
                cantidad: partes[2],
                total: partes[3],
                fecha: partes[4]
            });
        }
    }
    // Y retornar el array de compras para ser utilizado en la función mostrarCompras
    return compras;
}

// Función para mostrar el resumen de compras en un modal
// Obtiene las compras desde localStorage utilizando la función cargarComprasDelStorage
// Luego genera el HTML para mostrar cada compra en el modal
function mostrarCompras() {
    const compras = cargarComprasDelStorage();
    const listaCompras = document.getElementById('lista-compras');

    // Si no hay compras, mostrar un mensaje indicando que no hay compras realizadas
    if (compras.length === 0) {
        listaCompras.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No hay compras realizadas</p>';
    // Si hay compras, generar el HTML para mostrar cada compra en el modal, incluyendo un total general al final
    } else {
        // Limpiar el contenido anterior del modal antes de mostrar las compras
        listaCompras.innerHTML = '';
        let totalGeneral = 0;

        // Recorrer cada compra y generar el HTML para mostrarla en el modal, sumando el total de cada compra al total general
        compras.forEach((compra, index) => {
            // Sumar el total de la compra al total general, convirtiendo el total a número con parseFloat para evitar concatenaciones de strings
            totalGeneral += parseFloat(compra.total);
            // Generar el HTML para mostrar la compra en el modal, incluyendo el número de compra, película, horario, cantidad, total y fecha
            const itemHTML = `
                <div class="item-compra">
                    <h4>#${index + 1} - ${compra.pelicula}</h4>
                    <p><strong>Horario:</strong> ${compra.horario}</p>
                    <p><strong>Entradas:</strong> ${compra.cantidad}</p>
                    <p><strong>Total:</strong> $${parseFloat(compra.total).toFixed(2)}</p>
                    <p><strong>Fecha:</strong> ${compra.fecha}</p>
                </div>
            `;
            // Agregar el HTML de la compra al contenido del modal utilizando innerHTML para mostrarlo en la página
            listaCompras.innerHTML += itemHTML;
        });

        // Agregar total general
        // Generar el HTML para mostrar el total general al final del modal, con un estilo diferente para destacarlo
        const totalHTML = `
            <div class="item-compra" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">
                <h4 style="color: white; margin-bottom: 5px;">TOTAL GENERAL DE COMPRAS</h4>
                <p style="color: white; font-size: 1.3rem; font-weight: bold; margin: 0;">$${totalGeneral.toFixed(2)}</p>
            </div>
        `;
        // Agregar el HTML del total general al contenido del modal utilizando innerHTML para mostrarlo en la página
        listaCompras.innerHTML += totalHTML;
    }
    // Mostrar el modal de compras
    document.getElementById('modal-compras').classList.remove('oculto');
}

// Cerrar modal de compra
function cerrarModal() {
    document.getElementById('modal-compra').classList.add('oculto');
}

// Cerrar modal de compras
function cerrarModalCompras() {
    document.getElementById('modal-compras').classList.add('oculto');
}

// Limpiar/Restaurar datos
function limpiarDatos() {
    if (confirm('¿Está seguro de que desea eliminar todas las compras registradas?')) {
        // Obtener el contador
        // Si no existe, iniciar en 0
        let contador = parseInt(localStorage.getItem(KEY_CONTADOR)) || 0;

        // Eliminar todas las compras guardadas
        // Recorrer desde 1 hasta el contador para eliminar cada compra guardada en localStorage utilizando removeItem
        for (let i = 1; i <= contador; i++) {
            localStorage.removeItem('compra_' + i);
        }

        // Resetear el contador
        localStorage.removeItem(KEY_CONTADOR);
        // Mostrar un mensaje indicando que la limpieza se ha realizado
        alert('Limpieza hecha. Todas las compras han sido eliminadas.');

        // Si el modal de compras está abierto, actualizar
        const modal = document.getElementById('modal-compras');
        if (!modal.classList.contains('oculto')) {
            mostrarCompras();
        }
    }
}

// Cerrar modales al hacer clic fuera
window.addEventListener('click', function (event) {
    const modalCompra = document.getElementById('modal-compra');
    const modalCompras = document.getElementById('modal-compras');

    if (event.target === modalCompra) {
        cerrarModal();
    }
    if (event.target === modalCompras) {
        cerrarModalCompras();
    }
});