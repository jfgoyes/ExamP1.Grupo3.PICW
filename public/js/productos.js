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
<<<<<<< HEAD

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

=======
*/

// Creamos una clase para los productos.
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
>>>>>>> daae9ea50de14176a0bc17c6e6ef12d9945c9a21
