document.addEventListener("DOMContentLoaded", () => {
    //Validar usuario sea role admin
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")) || JSON.parse(sessionStorage.getItem("usuarioLogueado"));
    if (!usuarioLogueado || usuarioLogueado.role !== "admin") {
        alert("Acceso denegado. Se requieren permisos de Administrador.");
        window.location.href = "index.html";
        return;
    }

    const tablaBody = document.getElementById("tablaProductosBody");
    const form = document.getElementById("formProducto");
    const inputId = document.getElementById("productoId");
    const inputNombre = document.getElementById("nombre");
    const inputCategoria = document.getElementById("categoria");
    const inputPrecio = document.getElementById("precio");
    const inputDescuento = document.getElementById("descuento");
    const inputStock = document.getElementById("stock");
    const inputImagen = document.getElementById("imagen");
    const inputDescripcion = document.getElementById("descripcion");

    const formTitulo = document.getElementById("formTitulo");
    const btnGuardar = document.getElementById("btnGuardar");
    const btnCancelar = document.getElementById("btnCancelar");

    //Mostrar productos
    function renderTabla() {
        const productos = JSON.parse(localStorage.getItem("productos")) || [];
        tablaBody.innerHTML = "";

        if (productos.length === 0) {
            tablaBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">No hay productos en el inventario.</td></tr>`;
            return;
        }

        productos.forEach(p => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>
                    <img src="${p.imagen}" alt="${p.nombre}" class="rounded border shadow-sm" style="width: 50px; hieght: 50px; object-fit: cover;">
                </td>
                <td>
                    <span class="fw-bold text-dark d-block">${p.nombre}</span>
                    <small class="text-muted text-truncate d-inline-block" style="max-width: 150px;">${p.descripcion}</small>
                </td>
                <td><span class="badge bg-secondary text-capitalize">${p.categoria}</span></td>
                <td class="fw-semibold">$${p.precio.toLocaleString('es-CL')}</td>
                <td class="text-danger fw-bold">${p.descuento}%</td>
                <td>
                    <span class="badge ${p.stock > 5 ? 'bg-success' : 'bg-danger'}">${p.stock} u.</span>
                </td>
                <td class="text-center">
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary btn-editar" data-id="${p.id}" title="Editar"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-outline-danger btn-eliminar" data-id="${p.id}" title="Eliminar"><i class="bi bi-trash3-fill"></i></button>
                    </div>
                </td>
            `;
            tablaBody.appendChild(fila);
        });
    }

    //Crear y editar productos
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        const idActual = inputId.value;

        const datosProducto = {
            id: idActual || inputNombre.value.toLowerCase().trim().replace(/[^a-z0-gz-𠮷]/g, "-"),
            nombre: inputNombre.value.trim(),
            categoria: inputCategoria.value,
            precio: parseInt(inputPrecio.value),
            descuento: parseInt(inputDescuento.value),
            stock: parseInt(inputStock.value),
            imagen: inputImagen.value.trim(),
            descripcion: inputDescripcion.value.trim()
        };

        if (idActual) {
            //Editar producto
            const index = productos.findIndex(p => p.id === idActual);
            if (index !== -1) productos[index] = datosProducto;
            alert("¡Producto actualizado con éxito!");
        } else {
            //Crear producto
            if (productos.some(p => p.id === datosProducto.id)) {
                alert("Ya existe un producto con un nombre muy similar. Intenta cambiarlo ligeramente.");
                return;
            }
            productos.push(datosProducto);
            alert("¡Producto agregado al catálogo correctamente!");
        }

        //Guardar y resetear formulario
        localStorage.setItem("productos", JSON.stringify(productos));
        form.reset();
        cancelarEdicion();
        renderTabla();
    });

    //Capturar clicks
    tablaBody.addEventListener("click", (e) => {
        const btnEditar = e.target.closest(".btn-editar");
        const btnEliminar = e.target.closest(".btn-eliminar");
        let productos = JSON.parse(localStorage.getItem("productos")) || [];

        //Eliminar
        if (btnEliminar) {
            const id = btnEliminar.getAttribute("data-id");
            if (confirm("¿Estás completamente seguro de eliminar este producto del catálogo?")) {
                productos = productos.filter(p => p.id !== id);
                localStorage.setItem("productos", JSON.stringify(productos));
                renderTabla();
            }
        }

        //Editar
        if (btnEditar) {
            const id = btnEditar.getAttribute("data-id");
            const producto = productos.find(p => p.id === id);

            if (producto) {
                formTitulo.innerHTML = `<i class="bi bi-pencil-square me-2 text-warning"></i>Editar Producto`;
                btnGuardar.textContent = "Actualizar Cambios";
                btnGuardar.className = "btn btn-warning fw-semibold";
                btnCancelar.classList.remove("d-none");

                inputId.value = producto.id;
                inputNombre.value = producto.nombre;
                inputCategoria.value = producto.categoria;
                inputPrecio.value = producto.precio;
                inputDescuento.value = producto.descuento;
                inputStock.value = producto.stock;
                inputImagen.value = producto.imagen;
                inputDescripcion.value = producto.descripcion;
            }
        }
    });

    //Cancelar
    btnCancelar.addEventListener("click", cancelarEdicion);

    function cancelarEdicion() {
        form.reset();
        inputId.value = "";
        formTitulo.innerHTML = `<i class="bi bi-plus-circle-fill me-2"></i>Agregar Producto`;
        btnGuardar.textContent = "Guardar Producto";
        btnGuardar.className = "btn btn-primary fw-semibold";
        btnCancelar.classList.add("d-none");
    }

    renderTabla();
});