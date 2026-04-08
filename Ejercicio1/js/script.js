function verificar()
{
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
    var sexo = document.getElementById("sexo").value;

    var mensaje;

    if(sexo == "hombre")
    {
        if(edad >= 60)
        {
            mensaje = nombre + " puede jubilarse";
        }
        else
        {
            mensaje = nombre + " no puede jubilarse";
        }
    }
    else if(sexo == "mujer")
    {
        if(edad >= 54)
        {
            mensaje = nombre + " puede jubilarse";
        }
        else
        {
            mensaje = nombre + " no puede jubilarse";
        }
    }
    else
    {
        mensaje = "Seleccione un sexo";
    }

    document.getElementById("resultado").innerHTML = mensaje;
}