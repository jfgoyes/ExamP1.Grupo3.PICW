class ProductoEscolar {
    static obtener() {
        return JSON.parse(localStorage.getItem("productos_escolares")) || [];
    }

    static guardar(lista) {
        localStorage.setItem("productos_escolares", JSON.stringify(lista));
    }

    static nuevoID() {
        return Date.now().toString();
    }
}

function guardarProducto() {
    const nombre = document.getElementById("nombre_escolar").value.trim();
    const precio = parseFloat(document.getElementById("precio_escolar").value);

    if (!nombre || isNaN(precio) || precio <= 0) {
        return alert("Nombre y precio válido son obligatorios.");
    }

    const lista = ProductoEscolar.obtener();
    lista.push({ id: ProductoEscolar.nuevoID(), nombre, precio });
    ProductoEscolar.guardar(lista);
    mostrarProductos();
    limpiarCampos();
}

function limpiarCampos() {
    document.getElementById("nombre_escolar").value = "";
    document.getElementById("precio_escolar").value = "";
}

function mostrarProductos() {
    const lista = document.getElementById("lista_escolar");
    const select = document.getElementById("seleccion_escolar");
    lista.innerHTML = select.innerHTML = "";

    ProductoEscolar.obtener().forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.nombre} - $${p.precio.toFixed(2)}`;

        const btnEditar = crearBoton("Editar", () => editarProducto(p.id));
        const btnEliminar = crearBoton("Eliminar", () => eliminarProducto(p.id));

        li.append(btnEditar, btnEliminar);
        lista.appendChild(li);

        const op = document.createElement("option");
        op.value = p.id;
        op.textContent = p.nombre;
        select.appendChild(op);
    });
}

function crearBoton(texto, accion) {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.onclick = accion;
    btn.style.marginLeft = "10px";
    return btn;
}

function editarProducto(id) {
    const lista = ProductoEscolar.obtener();
    const prod = lista.find(p => p.id === id);
    if (!prod) return alert("Producto no encontrado.");

    const nombre = prompt("Nuevo nombre:", prod.nombre);
    const precio = prompt("Nuevo precio:", prod.precio);

    if (nombre && !isNaN(precio) && parseFloat(precio) > 0) {
        prod.nombre = nombre.trim();
        prod.precio = parseFloat(precio);
        ProductoEscolar.guardar(lista);
        mostrarProductos();
    } else {
        alert("Datos no válidos.");
    }
}

function eliminarProducto(id) {
    if (!confirm("¿Eliminar este producto?")) return;
    const lista = ProductoEscolar.obtener().filter(p => p.id !== id);
    ProductoEscolar.guardar(lista);
    mostrarProductos();
}
