/* Parte 1: William Adrian Herrera Juela

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

// Función para cargar los datos del cliente en el formulario para editar
function editarCliente(id) {
    // Buscamos el cliente por su ID
    let cliente = listaClientes.find(function (c) {
        return c.id === id;
    });

    // Si no se encuentra salimos
    if (!cliente) {
        return;
    }
    
    // Colocamos los datos del cliente en los campos del formulario
    document.getElementById("nombre_cliente").value = cliente.nombre;
    document.getElementById("cedula_cliente").value = cliente.cedula;
    document.getElementById("direccion_cliente").value = cliente.direccion;

    // Cambiamos el botón de agregar a editar
    let boton = document.querySelector('button[onclick="agregarCliente()"]');
    boton.innerText = "Actualizar Cliente";

    // cambiamos la acción del boton
    boton.onclick = function() {
        actualizarCliente(cliente.id);
    };
}*/


// Definimos una clase para los clientes.
class ClienteService {
    static obtenerClientes() {
        return JSON.parse(localStorage.getItem("clientes")) || [];
    }

    static guardarClientes(clientes) {
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    static generarID() {
        return Date.now().toString();
    }
}

// Creamos la función que va a servir para agregar cualquier cliente en el aplicativo.
function agregarCliente() {
    const nombre = document.getElementById("nombre_cliente").value.trim();
    const cedula = document.getElementById("cedula_cliente").value.trim();
    const direccion = document.getElementById("direccion_cliente").value.trim();
    // Especificamos una invalidación si existen datos para el cliente.
    if (!nombre || !cedula || !direccion) {
        alert("Se deben rellenar todos los datos del cliente.");
        return;
    }
    // Definimos los datos de los clientes.
    const clientes = ClienteService.obtenerClientes();
    clientes.push({
        id: ClienteService.generarID(),
        nombre,
        cedula,
        direccion
    });

    ClienteService.guardarClientes(clientes);
    mostrarClientes();

    // Si ya se ha ingresado un cliente, ejecutamos el operador encargado de limpiar los campos, para poder ingresar mas clientes.
    limpiarCamposCliente();
}

// Definimos la función encargada de limpiar los registros una vez que ya hayan sido ingresados.
function limpiarCamposCliente() {
    document.getElementById("nombre_cliente").value = "";
    document.getElementById("cedula_cliente").value = "";
    document.getElementById("direccion_cliente").value = "";
}

// Establecemos la función que va a mostrar la lista de los clientes.
function mostrarClientes() {
    const lista = document.getElementById("lista_clientes");
    const select = document.getElementById("cliente_factura");
    lista.innerHTML = "";
    select.innerHTML = "";

    const clientes = ClienteService.obtenerClientes();

    clientes.forEach(cliente => {
        const li = document.createElement("li");

        // Definimos el texto del cliente que haya sido ingresado.
        li.textContent = `${cliente.nombre} (${cliente.cedula}) - ${cliente.direccion} `;

        // Definimos un botón para que el usuario pueda editar a un cliente que ya haya sido ingresado.
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.style.marginLeft = "10px";
        btnEditar.onclick = () => editarCliente(cliente.id);

        // Establecemos un botón para eliminar a un cliente que ya haya sido ingresado.
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.style.marginLeft = "5px";
        btnEliminar.onclick = () => eliminarCliente(cliente.id);

        // Definimos los botones implementados dentro de la lista li.
        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);

        lista.appendChild(li);

        // Establecemos una opción para el identificador del cliente.
        const option = document.createElement("option");
        option.value = cliente.id;
        option.textContent = cliente.nombre;
        select.appendChild(option);
    });
}

// Creamos la función que va a servir para editar un cliente ingresado.
function editarCliente(id) {
    const clientes = ClienteService.obtenerClientes();
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return;

    // Especificamos los campos a editar del cliente ingresado.
    document.getElementById("nombre_cliente").value = cliente.nombre;
    document.getElementById("cedula_cliente").value = cliente.cedula;
    document.getElementById("direccion_cliente").value = cliente.direccion;

    // Hacemos un cambio del botón agregar hacia el boton actualizar, para actualizar la información.
    const btnAgregar = document.querySelector('button[onclick="agregarCliente()"]');
    btnAgregar.textContent = "Actualizar Cliente";

    // Eliminamos el parámetro onclick de agregar cliente y lo especificamos para que se pueda actualizar los datos del cliente.
    btnAgregar.onclick = () => actualizarCliente(id);
}

/* Parte 2: Steven German Caluña Rojas

// Creamos la función para actualizar los datos de los clientes que ya hayan sido ingresados.
function actualizarCliente() {
    const nombre = document.getElementById("nombre_cliente").vale.trim();
    const cedula = document.getElementById("cedula_cliente").value.trim();
    const direccion = document.getElementById("direccion_cliente").value.trim();
    // Establecemos una condición para invalidar cualquier valor diferente de los datos establecidos.
    if (!nombre || !cedula || !direccion) {
        alert("Es obligatorio ingresar los datos del cliente.")
        return;
    }
    // Buscamos el identificador de los clientes a actualizar.
    const clientes = ClienteService.obtenerClientes();
    const index = clientes.findIndex(c => c.id === id);
    if(index === -1) return;
    // Establecemos las variables de los datos a actualizar.
    clientes[index] = { id, nombre, cedula, direccion };
    ClienteService.guardarClientes(clientes);

    mostrarClientes();
    limpiarCamposCliente();

    // Restauramos el boton para agregar nuevamente a los clientes.
    const btnAgregar = document.querySelector('button[onclick]');
    btnAgregar.textContent = "Añadir cliente";
    btnAgregar.onclick = agregarCliente;
}

// Establecemos la función para eliminar algún cliente que haya sido registrado.
function eliminarCliente(id) {
    if (!confirm("¿Desea eliminar este cliente?")) return;
        // Buscamos el identificador del cliente a eliminar.
        let clientes = ClienteService.obtenerClientes();
        clientes = clientes.filter(c => c.id !== id);
        ClienteService.guardarClientes(clientes);

        mostrarClientes();
}

document.addEventListener("DOMContentLoaded", mostrarClientes);*/

// Creamos la función para actualizar los datos de los clientes que ya hayan sido ingresados.
function actualizarCliente(id) {
    const nombre = document.getElementById("nombre_cliente").value.trim();
    const cedula = document.getElementById("cedula_cliente").value.trim();
    const direccion = document.getElementById("direccion_cliente").value.trim();
    // Establecemos una condición para invalidar cualquier valor diferente de los datos establecidos.
    if (!nombre || !cedula || !direccion) {
        alert("Es obligatorio ingresar los datos del cliente.");
        return;
    }
    // Buscamos el identificador de los clientes a actualizar.
    const clientes = ClienteService.obtenerClientes();
    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) return;
    // Establecemos las variables de los datos a actualizar.
    clientes[index] = { id, nombre, cedula, direccion };
    ClienteService.guardarClientes(clientes);

    mostrarClientes();
    limpiarCamposCliente();
    // Restauramos el boton para agregar nuevamente a los clientes.
    const btnAgregar = document.querySelector('button[onclick]');
    btnAgregar.textContent = "Agregar Cliente";
    btnAgregar.onclick = agregarCliente;
}

// Establecemos la función para eliminar algún cliente que haya sido registrado.
function eliminarCliente(id) {
    if (!confirm("¿Desea eliminar este cliente?")) return;
    // Buscamos el identificador del cliente a eliminar.
    let clientes = ClienteService.obtenerClientes();
    clientes = clientes.filter(c => c.id !== id);
    ClienteService.guardarClientes(clientes);

    mostrarClientes();
}

document.addEventListener("DOMContentLoaded", mostrarClientes);