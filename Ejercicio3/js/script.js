function convertir()
{
    var valor = parseFloat(document.getElementById("valor").value);
    var origen = document.getElementById("origen").value;
    var destino = document.getElementById("destino").value;

    var resultado = convertirUnidades(valor, origen, destino);

    document.getElementById("resultado").innerHTML =
        "Resultado: " + resultado;
}


// FUNCIÓN PRINCIPAL DE CONVERSIÓN
function convertirUnidades(valor, origen, destino)
{
    var metros = convertirAMetros(valor, origen);

    var resultado = convertirDesdeMetros(metros, destino);

    return resultado;
}


// FUNCIÓN PARA CONVERTIR A METROS
function convertirAMetros(valor, origen)
{
    if(origen == "mm") return valor / 1000;
    if(origen == "cm") return valor / 100;
    if(origen == "m") return valor;
    if(origen == "km") return valor * 1000;
    if(origen == "in") return valor * 0.0254;
}


// FUNCIÓN PARA CONVERTIR DESDE METROS
function convertirDesdeMetros(valor, destino)
{
    if(destino == "mm") return valor * 1000;
    if(destino == "cm") return valor * 100;
    if(destino == "m") return valor;
    if(destino == "km") return valor / 1000;
    if(destino == "in") return valor / 0.0254;
}