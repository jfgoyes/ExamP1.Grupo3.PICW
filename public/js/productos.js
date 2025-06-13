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

// Veronica Burbano - Gestión de productos

// se cambia el contenido del formulario para editar el producto
function editarProducto(id) {
    const productos = ProductoService.obtenerProductos();
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    // se llenan los campos con los datos actuales del producto
    document.getElementById("nombre_producto").value = producto.nombre;
    document.getElementById("precio_producto").value = producto.precio;

    // se cambia el botón para que diga "Actualizar"
    const btnAgregar = document.getElementById("btn_producto");
    btnAgregar.textContent = "Actualizar Producto";

    // se guarda la función de actualizar para cuando se dé clic
    btnAgregar.onclick = () => actualizarProducto(id);
}

// se guardan los cambios después de editar un producto
function actualizarProducto(id) {
    const nombre = document.getElementById("nombre_producto").value.trim();
    const precio = parseFloat(document.getElementById("precio_producto").value);

    // se valida que los campos no estén vacíos o mal
    if (!nombre || isNaN(precio) || precio <= 0) {
        alert("Debes ingresar un nombre y un precio válido.");
        return;
    }

    const productos = ProductoService.obtenerProductos();
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) return;

    // se cambia el producto en la lista
    productos[index] = { id, nombre, precio };

    // se guardan los datos actualizados
    ProductoService.guardarProductos(productos);

    // se muestra de nuevo la lista
    mostrarProductos();

    // se limpian los campos del formulario
    limpiarCamposProducto();

    // se cambia otra vez el botón a su función original
    const btnAgregar = document.getElementById("btn_producto");
    btnAgregar.textContent = "Agregar Producto";
    btnAgregar.onclick = agregarProducto;
}

// se borra un producto cuando el usuario lo confirma
function eliminarProducto(id) {
    const confirmacion = confirm("¿Seguro que quieres eliminar este producto?");
    if (!confirmacion) return;

    let productos = ProductoService.obtenerProductos();
    productos = productos.filter(p => p.id !== id);
    ProductoService.guardarProductos(productos);

    // se vuelve a mostrar la lista sin ese producto
    mostrarProductos();
}

// se muestra la lista de productos cuando la página carga
document.addEventListener("DOMContentLoaded", mostrarProductos);

