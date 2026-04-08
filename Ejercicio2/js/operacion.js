function ordenar()
{
    var numeros = [];

    numeros[0] = document.getElementById("n1").value;
    numeros[1] = document.getElementById("n2").value;
    numeros[2] = document.getElementById("n3").value;
    numeros[3] = document.getElementById("n4").value;
    numeros[4] = document.getElementById("n5").value;
    numeros[5] = document.getElementById("n6").value;
    numeros[6] = document.getElementById("n7").value;
    numeros[7] = document.getElementById("n8").value;

    numeros.sort();

    document.getElementById("resultado").innerHTML =
        "Orden lexicográfico: " + numeros.join(" , ");
}