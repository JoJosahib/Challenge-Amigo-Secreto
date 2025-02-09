let amigos = [];

function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre.");
        input.value = ""
        return;
    }

    if (/\d/.test(nombre)) {
        alert("El nombre no puede contener números.");
        input.value = ""
        return;
    }

    nombre = nombre.toLowerCase().replace(/\b\w/g, letra => letra.toUpperCase());

    if (amigos.includes(nombre)) {
        alert("Este nombre ya ha sido agregado.");
        input.value = ""
        return;
    }

    amigos.push(nombre);
    actualizarLista();
    input.value = "";
}

function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    amigos.forEach(amigo => {
        let li = document.createElement("li");
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debes ingresar al menos dos amigos para sortear.");
        return;
    }

    // Limpiar la lista de amigos en la interfaz
    document.getElementById("listaAmigos").innerHTML = "";

    let copiaAmigos = [...amigos];
    let resultado = [];

    while (copiaAmigos.length > 0) {
        let indice = Math.floor(Math.random() * copiaAmigos.length);
        let amigo = copiaAmigos.splice(indice, 1)[0];
        resultado.push(amigo);
    }

    mostrarResultado(resultado);
    // Oculta  el botón de sortear  
    document.querySelector(".button-draw").style.display = "none";   
    
    // Mostrar el botón de sortear de nuevo
    document.getElementById("boton-reset").style.display = "flex";

    // Deshabilitar el botón de añadir amigos
    document.querySelector(".button-add").disabled = true;
}

function mostrarResultado(resultado) {
    let listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = "";

    for (let i = 0; i < resultado.length; i++) {
        let siguiente = (i + 1) % resultado.length;
        let li = document.createElement("li");

        // Mensaje amigable
        li.textContent = `🎁 ¡Sorpresa! ${resultado[i]} le regala a ${resultado[siguiente]} 🎉`;
        listaResultado.appendChild(li);
    }
}

function resetearJuego() {
    // Limpiar la lista de amigos y los resultados
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";

    // Mostrar el botón de sortear
    document.querySelector(".button-draw").style.display = "flex";
    
    // Ocultar el botón de "Sortear de nuevo"
    document.getElementById("boton-reset").style.display = "none";

    // Habilitar nuevamente el botón de añadir amigos
    document.querySelector(".button-add").disabled = false;
}