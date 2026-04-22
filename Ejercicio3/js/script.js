// ============================================================
// EXPRESIÓN REGULAR para validar el valor ingresado.
// Acepta: números enteros o decimales, positivos o negativos.
// Ejemplos válidos: 5 | -3 | 2.5 | -0.75 | 100
// Ejemplos inválidos: abc | 1.2.3 | --5 | vacío
// Desglose del patrón:
//   ^        → inicio de la cadena
//   -?       → signo negativo opcional
//   \d+      → uno o más dígitos enteros (obligatorio)
//   (\.\d+)? → parte decimal opcional: punto seguido de dígitos
//   $        → fin de la cadena
// ============================================================
var regexNumero = /^-?\d+(\.\d+)?$/;


// ------------------------------------------------------------
// FUNCIÓN validarEntrada()
// Se llama en tiempo real (oninput) mientras el usuario escribe.
// Usa la regex para verificar que el valor sea un número válido
// y muestra u oculta el mensaje de error según corresponda.
// ------------------------------------------------------------
function validarEntrada()
{
    var valorTexto = document.getElementById("valor").value;
    var spanError  = document.getElementById("errorValor");

    // Si el campo está vacío no mostramos error (el usuario aún no terminó)
    if(valorTexto === "")
    {
        spanError.textContent = "";
        return true;
    }

    // Probamos el valor contra la expresión regular
    if(!regexNumero.test(valorTexto))
    {
        // El valor NO cumple el patrón → mostramos mensaje de error
        spanError.textContent = "Ingresa un número válido (ej: 5, -3, 2.5)";
        return false; // retorna false para que convertir() pueda detenerse
    }
    else
    {
        // El valor SÍ cumple el patrón → ocultamos cualquier error previo
        spanError.textContent = "";
        return true;
    }
}


// ------------------------------------------------------------
// FUNCIÓN convertir()
// Igual que antes, pero ahora primero valida con la regex
// antes de hacer cualquier cálculo.
// ------------------------------------------------------------
function convertir()
{
    // Llamamos a validarEntrada() y detenemos si devuelve false
    if(!validarEntrada())
    {
        document.getElementById("resultado").innerHTML =
            "Corrige el valor antes de convertir.";
        return; // salimos sin calcular
    }

    var valorTexto = document.getElementById("valor").value;

    // Validación extra: campo completamente vacío
    if(valorTexto === "")
    {
        document.getElementById("resultado").innerHTML =
            "Por favor ingresa un valor.";
        return;
    }

    var valor   = parseFloat(valorTexto);
    var origen  = document.getElementById("origen").value;
    var destino = document.getElementById("destino").value;

    var resultado = convertirUnidades(valor, origen, destino);

    // Se agrega un objeto que mapea los valores del select con su nombre completo
    // para mostrar la unidad en el resultado de forma legible
    var nombreUnidades = {
    "mm": "Milímetros",
    "cm": "Centímetros",
    "m":  "Metros",
    "km": "Kilómetros",
    "in": "Pulgadas"
};

document.getElementById("resultado").innerHTML =
    "Resultado: " + resultado + " " + nombreUnidades[destino]; 
}


// ------------------------------------------------------------
// FUNCIÓN restaurar()  ← NUEVA
// Limpia todos los campos del formulario y restablece los
// valores por defecto: input vacío, selects en primera opción,
// resultado al texto inicial, y borra mensajes de error.
// ------------------------------------------------------------
function restaurar()
{
    // Limpia el campo de valor numérico
    document.getElementById("valor").value = "";

    // Regresa ambos selects a la primera opción (índice 0 = "mm")
    document.getElementById("origen").selectedIndex  = 0;
    document.getElementById("destino").selectedIndex = 0;

    // Restaura el texto por defecto del área de resultado
    document.getElementById("resultado").innerHTML =
        "Resultado aparecerá aquí";

    // Borra cualquier mensaje de error de validación que estuviera visible
    document.getElementById("errorValor").textContent = "";
}


// ============================================================
// FUNCIÓN PRINCIPAL DE CONVERSIÓN (sin cambios)
// ============================================================
function convertirUnidades(valor, origen, destino)
{
    var metros    = convertirAMetros(valor, origen);
    var resultado = convertirDesdeMetros(metros, destino);
    return resultado;
}


// FUNCIÓN PARA CONVERTIR A METROS (sin cambios)
function convertirAMetros(valor, origen)
{
    if(origen == "mm") return valor / 1000;
    if(origen == "cm") return valor / 100;
    if(origen == "m")  return valor;
    if(origen == "km") return valor * 1000;
    if(origen == "in") return valor * 0.0254;
}


// FUNCIÓN PARA CONVERTIR DESDE METROS (sin cambios)
function convertirDesdeMetros(valor, destino)
{
    if(destino == "mm") return valor * 1000;
    if(destino == "cm") return valor * 100;
    if(destino == "m")  return valor;
    if(destino == "km") return valor / 1000;
    if(destino == "in") return valor / 0.0254;
}