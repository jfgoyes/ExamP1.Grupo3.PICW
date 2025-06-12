function agregarCliente() {
    var nombre = document.getElementById("nombre_cliente").value;
    var cedula = document.getElementById("cedula_cliente").value;
    var direccion = document.getElementById("direccion_cliente").value;

    // Validación básica
    if (nombre === "" || cedula === "" || direccion === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    var cliente = {
        nombre: nombre,
        cedula: cedula,
        direccion: direccion
    };

    // Obtener lista actual o iniciar una nueva
    var clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Agregar cliente nuevo
    clientes.push(cliente);

    // Guardar en localStorage
    localStorage.setItem("clientes", JSON.stringify(clientes));

    mostrarClientes();

    // Limpiar los campos del formulario
    document.getElementById("nombre_cliente").value = "";
    document.getElementById("cedula_cliente").value = "";
    document.getElementById("direccion_cliente").value = "";
}

function mostrarClientes() {
    var lista = document.getElementById("lista_clientes");
    lista.innerHTML = "";

    var clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    for (var i = 0; i < clientes.length; i++) {
        var cliente = clientes[i];
        var item = document.createElement("li");
        item.textContent = cliente.nombre + " - " + cliente.cedula + " - " + cliente.direccion;
        lista.appendChild(item);
    }
}

// Ejecutar al cargar la página
window.onload = function () {
    mostrarClientes();
};