/* Parte 1: Tiffani Nathalia Torres Diaz

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
*/

// Creamos una clase para gestionar los productos desde el localStorage.
class ProductoService {
    static obtenerProductos() {
        return JSON.parse(localStorage.getItem("productos")) || [];
    }

    static guardarProductos(productos) {
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    static generarID() {
        return Date.now().toString();
    }
}

// Creamos la función que va a servir para agregar cualquier producto en el aplicativo.
function agregarProducto() {
    const nombre = document.getElementById("nombre_producto").value.trim();
    const precio = parseFloat(document.getElementById("precio_producto").value);
    // Especificamos una invalidación si no existen datos para el producto.
    if (!nombre || isNaN(precio) || precio <= 0) {
        alert("Nombre y precio válido son obligatorios.");
        return;
    }
    // Definimos los datos de los productos.
    const productos = ProductoService.obtenerProductos();
    productos.push({
        id: ProductoService.generarID(),
        nombre,
        precio
    });

    ProductoService.guardarProductos(productos);
    mostrarProductos();


    // Si ya se ha ingresado un producto, ejecutamos el operador encargado de limpiar los campos, para poder ingresar mas productos.
    limpiarCamposProducto();
}

// Definimos la función encargada de limpiar los productos una vez que ya hayan sido ingresados.
function limpiarCamposProducto() {
    document.getElementById("nombre_producto").value = "";
    document.getElementById("precio_producto").value = "";
}

// Establecemos la función que va a mostrar la lista de los productos.
function mostrarProductos() {
    const lista = document.getElementById("lista_productos");
    const select = document.getElementById("producto_factura");
    lista.innerHTML = "";
    select.innerHTML = "";

    const productos = ProductoService.obtenerProductos();
    productos.forEach(producto => {
        const li = document.createElement("li");
        // Definimos el texto del producto que haya sido ingresado.
        li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;

        // Definimos un botón para que el usuario pueda editar a un producto que ya haya sido ingresado.
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.style.marginLeft = "10px";
        btnEditar.onclick = () => editarProducto(producto.id);

        // Establecemos un botón para eliminar a un producto que ya haya sido ingresado.
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.style.marginLeft = "5px";
        btnEliminar.onclick = () => eliminarProducto(producto.id);
        // Definimos los botones implementados dentro de la lista li.
        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);

        lista.appendChild(li);

        // Establecemos una opción para seleccionar el identificador del producto.
        const option = document.createElement("option");
        option.value = producto.id;
        option.textContent = producto.nombre;
        select.appendChild(option);
    });
}

/* Parte 2: Veronica Janeth Yampuezan Burbano */