/* Parte 2: Job Goyes */
// Creamos la función para guardar la información de la factura en base a los clientes y productos.
function guardarFactura () {
    // Definimos el cliente respectivo para la factura.
    const clienteId = document.getElementById("cliente_factura").value;
    // Establecemos una alerta en caso de no seleccionar a algún cliente.
    if (!clienteId) {
        alert("Es obligatorio seleccionar el cliente.")
        return;
    }
    // Establecemos una alerta en caso de no seleccionar a algún producto.
    if (itemsFactura.legth === 0) {
        alert("Es obligatorio agregar por lo menos un producto.")
        return;
    }
    // Definimos el total para el precio de los productos.
    const total = itemsFactura.reduce((sum, item) => sum + item.subtotal, 0);
    // Establecemos los campos a mostrar en la factura.
    const factura = {
        id: FacturaService.generarID(),
        clienteId,
        productos: itemsFactura,
        total,
        fecha: new Date().toISOString().split("T")[0]
    };
    // Hacemos un llamado a la función obtenerFacturas() que se encarga de generar los datos de la facturación.
    const facturas = FacturaService.obtenerFacturas();
    facturas.push(factura);
    FacturaService.guardarFacturas(facturas);
    // Mostramos la factura con todos los datos elegidos por el usuario.
    mostrarResumenFactura(factura);

    // Hacemos una limpieza de los datos agregados y actualizamos la lista.
    itemsFactura = [];
    mostrarItemsFactura();

    alert("Factura generada sin inconvenientes.")
}

// Creamos la función encargada de mostrar todos los datos de la factura que se va a generar.
function mostrarResumenFactura(factura) {
    // Seleccionamos las funciones obtenerClientes y obtenerProductos.
    const clientes = FacturaService.obtenerClientes();
    const productos = FacturaService.obtenerProductos();
    // Hacemos una búsqueda de algún cliente que se haya registrado previamente.
    const cliente = clientes.find(c => c.id === factura.clienteId);
    // En caso de no existir algun cliente, nos muestre un mensaje indicando Cliente no especificado.
    document.getElementById("resumen_cliente").textContent = cliente ? cliente.nombre : "Cliente no especificado";
    // Definimos la fecha de generación para la factura.
    document.getElementById("resumen_fecha").textContent = factura.fecha;
    // Mostramos los productos seleccionados.
    const tbody = document.getElementById("resumen_items");
    tbody.innerHTML = "";
    // Definimos la búsqueda de algún producto registrado previamente.
    factura.productos.forEach(item => {
        const producto = productos.find(p => p.id === item.idProducto);
        const tr = document.createElement("tr");
        // Establecemos el caso donde no se haya seleccionado algun producto.
        tr.innerHTML = `
        <td>${producto ? producto.nombre : "Producto no especificado"}</td>
        <td>${item.cantidad}</td>
        <td>${producto ? producto.precio.toFixed(2) : "0.00"}</td>
        <td>${item.subtotal.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
    // Mostramos los datos finales de la factura generada.
    document.getElementById("resumen_total").textContent = factura.total.toFixed(2);
    document.getElementById("resumen_factura").style.display = "block";
}
document.addEventListener("DOMContentLoaded", () => {
    mostrarItemsFactura();
});