/* Parte 2: Job Goyes */
function guardarFactura () {
    const clienteId = document.getElementById("cliente_factura").value;

    if (!clienteId) {
        alert("Es obligatorio seleccionar el cliente.")
        return;
    }

    if (itemsFactura.legth === 0) {
        alert("Es obligatorio agregar por lo menos un producto.")
        return;
    }

    const total = itemsFactura.reduce((sum, item) => sum + item.subtotal, 0);
    const factura = {
        id: FacturaService.generarID(),
        clienteId,
        productos: itemsFactura,
        total,
        fecha: new Date().toISOString().split("T")[0]
    };

    const facturas = FacturaService.obtenerFacturas();
    facturas.push(factura);
    FacturaService.guardarFacturas(facturas);

    mostrarResumenFactura(factura);

    // Hacemos una limpieza de los datos agregados y actualizamos la lista.
    itemsFactura = [];
    mostrarItemsFactura();

    alert("Factura generada sin inconvenientes.")
}

function mostrarResumenFactura(factura) {
    const clientes = FacturaService.obtenerClientes();
    const productos = FacturaService.obtenerProductos();

    const cliente = clientes.find(c => c.id === factura.clienteId);
    document.getElementById("resumen_cliente").textContent = cliente ? cliente.nombre : "Cliente no especificado";
    document.getElementById("resumen_fecha").textContent = factura.fecha;
}