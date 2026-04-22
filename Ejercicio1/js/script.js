function verificar()
{
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
    var sexo = document.getElementById("sexo").value;

    //  EXPRESIONES REGULARES
    // Regex para el nombre: solo permite letras (incluyendo tildes y ñ) y espacios.
    // [a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+ = uno o más caracteres válidos, $ = fin.
    var regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    // Regex para la edad: solo permite números enteros positivos de 1 a 3 dígitos.
    //  [1-9] = primer dígito no puede ser cero, \d{0,2} = 0 a 2 dígitos más, $ = fin.
    var regexEdad = /^[1-9]\d{0,2}$/;
   

    var mensaje;

    // VALIDACIONES CON LAS EXPRESIONES REGULARES 
    // .test() prueba si el valor cumple con el patrón; devuelve true o false.

    // Verificar que el nombre no esté vacío y cumpla el patrón.
    if (!nombre || !regexNombre.test(nombre))
    {
        // Si falla, mostrar error y detener la función con return.
        mostrarError("Por favor ingrese un nombre válido (solo letras y espacios).");
        return; // Detiene la ejecución para no continuar con datos inválidos.
    }

    // Verificar que la edad no esté vacía y cumpla el patrón.
    if (!edad || !regexEdad.test(edad))
    {
        mostrarError("Por favor ingrese una edad válida (número entero positivo).");
        return;
    }

    // Verificar que se haya seleccionado un sexo.
    if (sexo === "")
    {
        mostrarError("Por favor seleccione un sexo.");
        return;
    }
    

    // OBJETO PERSONA 
    // Se crea un objeto literal que agrupa los datos de la persona.
    // Usar un objeto es una buena práctica: mantiene los datos organizados
    // y permite acceder a ellos con la notación punto (persona.nombre, etc.).
    var persona = {
        nombre: nombre,             // Propiedad: nombre ingresado por el usuario.
        edad: parseInt(edad),       // Propiedad: edad convertida a número entero.
        sexo: sexo                  // Propiedad: sexo seleccionado en el select.
    };
   

    // LÓGICA DE JUBILACIÓN (usando el objeto persona) 
    // Ahora se accede a los datos a través del objeto en lugar de variables sueltas.
    if (persona.sexo == "hombre")
    {
        if (persona.edad >= 60)
        {
            mensaje = persona.nombre + " puede jubilarse";
        }
        else
        {
            mensaje = persona.nombre + " no puede jubilarse";
        }
    }
    else if (persona.sexo == "mujer")
    {
        if (persona.edad >= 54)
        {
            mensaje = persona.nombre + " puede jubilarse";
        }
        else
        {
            mensaje = persona.nombre + " no puede jubilarse";
        }
    }
    

    // Mostrar el resultado en el div correspondiente usando el DOM.
    var divResultado = document.getElementById("resultado");
    divResultado.innerHTML = mensaje;

    //  RESTABLECER ESTILOS DEL RESULTADO 
    // Se quita la clase de error (si estaba puesta) y se regresa al estilo normal.
    divResultado.classList.remove("error");
    divResultado.classList.add("exito");
   
}

// FUNCIÓN AUXILIAR PARA MOSTRAR ERRORES 
// Se creó esta función para reutilizar el código de mostrar errores
// sin repetirlo cada vez. Recibe el texto del error como parámetro.
function mostrarError(texto)
{
    var divResultado = document.getElementById("resultado");
    divResultado.innerHTML = " " + texto;           // Muestra el mensaje en el div.
    divResultado.classList.remove("exito");            // Quita estilo de éxito.
    divResultado.classList.add("error");               // Aplica estilo de error (rojo).
}
