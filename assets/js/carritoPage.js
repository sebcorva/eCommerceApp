document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedorProductosCarrito");
    const txtSubtotal = document.getElementById("resumenSubtotal");
    const txtDescuento = document.getElementById("resumenDescuento");
    const txtTotal = document.getElementById("resumenTotal");
    const btnPagar = document.getElementById("btnRealizarPago");

    if (!contenedor) return;

    function renderCarritoPage() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        //Validar carrito contenga productos
        if (carrito.length === 0) {
            contenedor.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-cart-x fs-1 text-muted mb-3 d-block"></i>
                    <p class="text-muted fs-5">Tu carrito está vacío.</p>
                    <a href="index.html#categoria" class="btn btn-primary btn-sm mt-2">Ver Productos</a>
                </div>
            `;
            txtSubtotal.textContent = "$0";
            txtDescuento.textContent = "-$0";
            txtTotal.textContent = "$0";
            return;
        }

        contenedor.innerHTML = "";
        let subtotalAcumulado = 0;

        //Mostrar carrito y totales
        carrito.forEach(producto => {
            const valorTotalProducto = producto.precio * producto.cantidad;
            subtotalAcumulado += valorTotalProducto;

            const filaHTML = `
                <div class="row align-items-center justify-content-between pb-3 mb-3 border-bottom g-3">
                    <div class="col-4 col-sm-2 text-center">
                        <img src="${producto.imagen}" alt="${producto.nombre}"
                            class="img-fluid rounded shadow-sm"
                            style="max-height: 80px; width: 100%; object-fit: cover;">
                    </div>

                    <div class="col-8 col-sm-4">
                        <h6 class="m-0 fw-bold text-dark text-truncate">${producto.nombre}</h6>
                        <small class="text-muted d-block">Valor: $${producto.precio.toLocaleString('es-CL')}</small>
                    </div>

                    <div class="col-7 col-sm-3 d-flex align-items-center justify-content-center justify-content-sm-start gap-2">
                        <button type="button" class="btn btn-sm btn-outline-secondary px-2 py-1 btn-restar" data-id="${producto.id}">
                            <i class="bi bi-dash"></i>
                        </button>
                        <span class="fw-semibold px-2">${producto.cantidad}</span>
                        <button type="button" class="btn btn-sm btn-outline-secondary px-2 py-1 btn-sumar" data-id="${producto.id}">
                            <i class="bi bi-plus"></i>
                        </button>

                        <button type="button" class="btn btn-sm btn-link text-danger ms-2 p-0 btn-eliminar" data-id="${producto.id}" title="Eliminar producto">
                            <i class="bi bi-trash3-fill fs-5"></i>
                        </button>
                    </div>

                    <div class="col-5 col-sm-3 text-end">
                        <span class="fw-bold text-primary fs-5">$${valorTotalProducto.toLocaleString('es-CL')}</span>
                    </div>
                </div>
            `;
            contenedor.innerHTML += filaHTML;
        });

        const totalAPagar = subtotalAcumulado;

        txtSubtotal.textContent = `$${subtotalAcumulado.toLocaleString('es-CL')}`;
        txtTotal.textContent = `$${totalAPagar.toLocaleString('es-CL')}`;
    }

    // agregar producto, restar producto, eliminar producto
    contenedor.addEventListener("click", (e) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const btnSumar = e.target.closest(".btn-sumar");
        const btnRestar = e.target.closest(".btn-restar");
        const btnEliminar = e.target.closest(".btn-eliminar");

        if (btnSumar) {
            const id = btnSumar.getAttribute("data-id");
            const producto = carrito.find(item => item.id === id);
            if (producto) producto.cantidad += 1;
        }

        if (btnRestar) {
            const id = btnRestar.getAttribute("data-id");
            const producto = carrito.find(item => item.id === id);
            if (producto) {
                producto.cantidad -= 1;

                if (producto.cantidad <= 0) {
                    carrito = carrito.filter(item => item.id !== id);
                }
            }
        }

        if (btnEliminar) {
            const id = btnEliminar.getAttribute("data-id");
            carrito = carrito.filter(item => item.id !== id);
        }

        //Guardar cambios en LocalStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarritoPage();

        if (typeof actualizarContadorCarritoGlobal === "function") {
            actualizarContadorCarritoGlobal();
        } else if (typeof actualizarContadorCarrito === "function") {
            actualizarContadorCarrito();
        }
    });

    //Pagar
    if (btnPagar) {
        btnPagar.addEventListener("click", () => {
            alert("¡Gracias por tu compra en aniMug! Procesando pago...");
            localStorage.removeItem("carrito");
            window.location.href = "/index.html";
        });
    }

    renderCarritoPage();
});