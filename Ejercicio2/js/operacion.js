// Precio constante de entrada
const PRECIO_ENTRADA = 3.00;
const KEY_CONTADOR = 'comprasCineContador';

// Información de películas
const peliculas = {
    'La Aventura Espacial': {
        horarios: ['2:00 PM', '5:30 PM', '8:00 PM', '10:30 PM']
    },
    'Amor Bajo las Estrellas': {
        horarios: ['1:00 PM', '4:00 PM', '7:00 PM', '9:30 PM']
    },
    'El Misterio del Bosque': {
        horarios: ['3:00 PM', '6:00 PM', '9:00 PM']
    }
};

// Variables para la compra actual
let compraActual = {
    pelicula: '',
    horario: ''
};

// Inicializar al cargar la página
window.addEventListener('DOMContentLoaded', function () {
    inicializarVentanas();
    cargarComprasDelStorage();
    ocultarBotonAbrir(); // Ocultar el botón al inicio
});

// Hacer las ventanas movibles
function inicializarVentanas() {
    const ventanas = ['ventana1', 'ventana2', 'ventana3'];

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
function cerrarVentana(ventanaId) {
    document.getElementById(ventanaId).style.display = 'none';
    verificarVentanas(); // Verificar si mostrar el botón de abrir
}

// Función para verificar si hay ventanas cerradas
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
function ocultarBotonAbrir() {
    const btnAbrirTodas = document.getElementById('btn-abrir-todas');
    btnAbrirTodas.classList.add('oculto');
}

// Abrir todas las ventanas
function abrirTodas() {
    const ventanas = ['ventana1', 'ventana2', 'ventana3'];
    ventanas.forEach(ventanaId => {
        document.getElementById(ventanaId).style.display = 'block';
    });
    verificarVentanas(); // Ocultar el botón si todas están abiertas
}

// Abrir modal de compra
function abrirCompra(nombrePelicula) {
    compraActual.pelicula = nombrePelicula;

    // Obtener el horario seleccionado
    const numPelicula = Object.keys(peliculas).indexOf(nombrePelicula) + 1;
    const horariosSelect = document.getElementById('horario' + numPelicula);
    compraActual.horario = horariosSelect.value;

    // Llenar el modal
    document.getElementById('nombre-pelicula').value = nombrePelicula;
    document.getElementById('horario-compra').value = compraActual.horario;
    document.getElementById('cantidad-entradas').value = 1;

    actualizarTotal();

    document.getElementById('modal-compra').classList.remove('oculto');
}

// Actualizar total a pagar
function actualizarTotal() {
    const cantidad = parseInt(document.getElementById('cantidad-entradas').value) || 1;
    const total = (cantidad * PRECIO_ENTRADA).toFixed(2);
    document.getElementById('total-precio').textContent = '$' + total;
}

// Event listener para cantidad de entradas
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cantidad-entradas')?.addEventListener('change', actualizarTotal);
    document.getElementById('cantidad-entradas')?.addEventListener('input', actualizarTotal);
});

// Confirmar compra
function confirmarCompra() {
    const pelicula = document.getElementById('nombre-pelicula').value;
    const horario = document.getElementById('horario-compra').value;
    const cantidad = parseInt(document.getElementById('cantidad-entradas').value);
    const total = (cantidad * PRECIO_ENTRADA).toFixed(2);

    if (cantidad < 1) {
        alert('Ingrese una cantidad válida');
        return;
    }

    // Guardar en localStorage (SIN JSON)
    guardarCompra(pelicula, horario, cantidad, total);

    alert('¡Compra realizada exitosamente!\n\nPelícula: ' + pelicula + '\nHorario: ' + horario + '\nEntradas: ' + cantidad + '\nTotal: $' + total);

    cerrarModal();
}

// Guardar compra en localStorage
function guardarCompra(pelicula, horario, cantidad, total) {
    // Obtener el contador actual de compras
    let contador = parseInt(localStorage.getItem(KEY_CONTADOR)) || 0;
    contador++;

    // Crear un string con los datos separados por | (tubería)
    // Formato: pelicula|horario|cantidad|total|fecha
    const fecha = new Date().toLocaleString('es-ES');
    const datosCompra = pelicula + '|' + horario + '|' + cantidad + '|' + total + '|' + fecha;

    // Guardar en localStorage con una clave única (compra_1, compra_2, etc)
    localStorage.setItem('compra_' + contador, datosCompra);

    // Guardar el nuevo contador
    localStorage.setItem(KEY_CONTADOR, contador);
}

// Cargar compras del storage (SIN JSON)
function cargarComprasDelStorage() {
    let compras = [];
    let contador = parseInt(localStorage.getItem(KEY_CONTADOR)) || 0;

    // Recorrer todas las compras guardadas
    for (let i = 1; i <= contador; i++) {
        const datosCompra = localStorage.getItem('compra_' + i);
        if (datosCompra) {
            // Dividir el string por | para obtener los datos
            const partes = datosCompra.split('|');
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

    return compras;
}

// Mostrar todas las compras
function mostrarCompras() {
    const compras = cargarComprasDelStorage();
    const listaCompras = document.getElementById('lista-compras');

    if (compras.length === 0) {
        listaCompras.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No hay compras realizadas</p>';
    } else {
        listaCompras.innerHTML = '';
        let totalGeneral = 0;

        compras.forEach((compra, index) => {
            totalGeneral += parseFloat(compra.total);
            const itemHTML = `
                <div class="item-compra">
                    <h4>#${index + 1} - ${compra.pelicula}</h4>
                    <p><strong>Horario:</strong> ${compra.horario}</p>
                    <p><strong>Entradas:</strong> ${compra.cantidad}</p>
                    <p><strong>Total:</strong> $${parseFloat(compra.total).toFixed(2)}</p>
                    <p><strong>Fecha:</strong> ${compra.fecha}</p>
                </div>
            `;
            listaCompras.innerHTML += itemHTML;
        });

        // Agregar total general
        const totalHTML = `
            <div class="item-compra" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">
                <h4 style="color: white; margin-bottom: 5px;">TOTAL GENERAL DE COMPRAS</h4>
                <p style="color: white; font-size: 1.3rem; font-weight: bold; margin: 0;">$${totalGeneral.toFixed(2)}</p>
            </div>
        `;
        listaCompras.innerHTML += totalHTML;
    }

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
        let contador = parseInt(localStorage.getItem(KEY_CONTADOR)) || 0;

        // Eliminar todas las compras guardadas
        for (let i = 1; i <= contador; i++) {
            localStorage.removeItem('compra_' + i);
        }

        // Resetear el contador
        localStorage.removeItem(KEY_CONTADOR);

        alert('Datos restaurados. Todas las compras han sido eliminadas.');

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