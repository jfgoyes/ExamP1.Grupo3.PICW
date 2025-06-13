// Esta lista guardará todos los clientes
let listaClientes = [];

// Verificamos si ya hay clientes guardados en localStorage
// Si hay, los cargamos al iniciar la página
if (localStorage.getItem("clientes")) {
    listaClientes = JSON.parse(localStorage.getItem("clientes"));
    mostrarClientes(); // Llamamos a la función para mostrar los clientes en pantalla
}

// Funcion para generar un ID automático usando la hora actual
function generarID() {
    return Date.now().toString();
}

// Funcion para guardar la lista de clientes en localStorage
function guardarClientes() {
    // Aqui se convierte el array a texto con JSON.stringify
    localStorage.setItem("clientes", JSON.stringify(listaClientes));
}

// Esta función se va a ejecutar cuando el usuario presione el botón "Agregar Cliente"
function agregarCliente() {
    // Con esto obtenemos los datos que el usuario escribió en los campos de texto
    let nombre = document.getElementById("nombre_cliente").value;
    let cedula = document.getElementById("cedula_cliente").value;
    let direccion = document.getElementById("direccion_cliente").value;

    // Se verifica que ningun campo este vacio
    if (nombre === "" || cedula === "" || direccion === "") {
        alert("Faltan datos del cliente");
        return; // Salimos de la función si falta algo
    }

    let nuevoCliente = {
        id: generarID(), // Generamos un ID único
        nombre: nombre,
        cedula: cedula,
        direccion: direccion
    };

    // Se agrega el nuevo cliente a la lista
    listaClientes.push(nuevoCliente);

    // Guardamos la lista completa en localStorage
    guardarClientes();

    // Se muestra los clientes actualizados en pantalla
    mostrarClientes();

    // Se limpia los campos
    limpiarCamposCliente();
}

// Funcion para limpiar el formulario
function limpiarCamposCliente() {
    document.getElementById("nombre_cliente").value = "";
    document.getElementById("cedula_cliente").value = "";
    document.getElementById("direccion_cliente").value = "";
}

// Funcion para mostrar los clientes en pantalla
function mostrarClientes() {
    // obtenemos los elementos donde vamos a mostrar los clientes
    let lista = document.getElementById("lista_clientes");
    let select = document.getElementById("cliente_factura");
    
    // Limpiamos el contenido actual
    lista.innerHTML = "";
    select.innerHTML = "";

    // Ahora recorremos cada cliente en la lista y lo mostramos
    for (let i = 0; i < listaClientes.length; i++) {
        let cliente = listaClientes[i];

        // Creamos un elemento de lista
        let item = document.createElement("li");
        item.innerText = cliente.nombre + " (" + cliente.cedula + ") - " + cliente.direccion;
        
        // Agregamos un botón para editar el cliente
       let btnEditar = document.createElement("button");
        btnEditar.innerText = "Editar";
        btnEditar.onclick = function() {
            editarCliente(cliente.id);
        };

        // Boton para eliminar el cliente
        let btnEliminar = document.createElement("button");
        btnEliminar.innerText = "Eliminar";
        btnElimminar.style.marginLeft = "5px"; // Espacio entre botones
        btnEliminar.onclick = function() {
            eliminarCliente(cliente.id);
        };

        // Agregamos los botones de la lista
        item.appendChild(btnEditar);
        item.appendChild(btnEliminar);

        // Agregamos el item a la lista
        lista.appendChild(item);

        // Agregamos el cliente al select para facturas
        let option = document.createElement("option");
        option.value = cliente.id;
        option.text = cliente.nombre;
        select.appendChild(option); 
    }
}