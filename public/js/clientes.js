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

