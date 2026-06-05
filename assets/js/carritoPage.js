document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedorProductosCarrito");
    const resumenSubtotal = document.getElementById("resumenSubtotal");
    const resumenDescuento = document.getElementById("resumenDescuento");
    const resumenTotal = document.getElementById("resumenTotal");
    const btnRealizarPago = document.getElementById("btnRealizarPago");

    // Formateador de moneda en pesos chilenos (CLP)
    function formatCLP(value) {
        return "$" + value.toLocaleString("es-CL");
    }

    // Obtener la sesión activa y clave del carrito
    function obtenerInfoSesion() {
        const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
        const username = usuario ? usuario.username : "invitado";
        const key = "carrito_" + username;
        return { usuario, username, key };
    }

    // Renderizar los productos y actualizar totales
    function renderizarCarrito() {
        const { usuario, key } = obtenerInfoSesion();
        const carrito = JSON.parse(localStorage.getItem(key)) || [];

        if (!contenedor) return;

        if (carrito.length === 0) {
            // Carrito vacío
            contenedor.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-cart-x fs-1 text-muted mb-3 d-block"></i>
                    <p class="text-muted fs-5">Tu carrito de compras está vacío.</p>
                    <a href="index.html#categoria" class="btn btn-primary mt-3 px-4 fw-semibold">Explorar Productos</a>
                </div>
            `;
            // Totales a cero
            resumenSubtotal.textContent = formatCLP(0);
            resumenDescuento.textContent = formatCLP(0);
            resumenTotal.textContent = formatCLP(0);
            return;
        }

        // Renderizar items
        let htmlContent = "";
        let subtotal = 0;

        carrito.forEach(item => {
            // Normalizar ruta de la imagen si viene con ../
            let rutaImagen = item.imagen;
            if (rutaImagen.startsWith("../")) {
                rutaImagen = rutaImagen.substring(3);
            }

            const itemSubtotal = item.precio * item.cantidad;
            subtotal += itemSubtotal;

            htmlContent += `
                <div class="row align-items-center justify-content-between pb-3 mb-3 border-bottom g-3">
                    <!-- Foto Producto -->
                    <div class="col-4 col-sm-2 text-center">
                        <img src="${rutaImagen}" alt="${item.nombre}" class="img-fluid rounded shadow-sm" style="max-height: 80px; object-fit: cover;">
                    </div>
                    
                    <!-- Descripción y Precio Unitario -->
                    <div class="col-8 col-sm-4">
                        <h6 class="m-0 fw-bold text-dark text-truncate">${item.nombre}</h6>
                        <small class="text-muted d-block">Valor: ${formatCLP(item.precio)}</small>
                    </div>
                    
                    <!-- Controles de Cantidad y Eliminar -->
                    <div class="col-7 col-sm-3 d-flex align-items-center justify-content-center justify-content-sm-start gap-2">
                        <button type="button" class="btn btn-sm btn-outline-secondary px-2 py-1 btn-cantidad" data-action="decrease" data-id="${item.id}">
                            <i class="bi bi-dash"></i>
                        </button>
                        <span class="fw-semibold px-2">${item.cantidad}</span>
                        <button type="button" class="btn btn-sm btn-outline-secondary px-2 py-1 btn-cantidad" data-action="increase" data-id="${item.id}">
                            <i class="bi bi-plus"></i>
                        </button>
                        
                        <button type="button" class="btn btn-sm btn-link text-danger ms-2 p-0 btn-eliminar" data-id="${item.id}" title="Eliminar producto">
                            <i class="bi bi-trash3-fill fs-5"></i>
                        </button>
                    </div>
                    
                    <!-- Valor Total por Producto -->
                    <div class="col-5 col-sm-3 text-end">
                        <span class="fw-bold text-primary fs-5">${formatCLP(itemSubtotal)}</span>
                    </div>
                </div>
            `;
        });

        contenedor.innerHTML = htmlContent;

        // Calcular descuentos: 10% de descuento si es usuario logueado
        const porcentajeDescuento = usuario ? 0.10 : 0.00;
        const descuento = Math.round(subtotal * porcentajeDescuento);
        const total = subtotal - descuento;

        // Mostrar totales en la tarjeta lateral
        resumenSubtotal.textContent = formatCLP(subtotal);
        resumenDescuento.textContent = (descuento > 0 ? "-" : "") + formatCLP(descuento);
        resumenTotal.textContent = formatCLP(total);
    }

    // Manejar eventos de modificar cantidad y eliminar
    if (contenedor) {
        contenedor.addEventListener("click", (e) => {
            const { key } = obtenerInfoSesion();
            const carrito = JSON.parse(localStorage.getItem(key)) || [];

            // 1. Modificar cantidad (+ / -)
            const btnCantidad = e.target.closest(".btn-cantidad");
            if (btnCantidad) {
                const id = btnCantidad.dataset.id;
                const action = btnCantidad.dataset.action;
                const index = carrito.findIndex(item => item.id === id);

                if (index !== -1) {
                    if (action === "increase") {
                        carrito[index].cantidad += 1;
                    } else if (action === "decrease") {
                        if (carrito[index].cantidad > 1) {
                            carrito[index].cantidad -= 1;
                        } else {
                            // Si baja de 1, lo removemos
                            carrito.splice(index, 1);
                        }
                    }
                    localStorage.setItem(key, JSON.stringify(carrito));
                    renderizarCarrito();
                    if (window.actualizarBadgeCarrito) {
                        window.actualizarBadgeCarrito();
                    }
                }
                return;
            }

            // 2. Eliminar ítem
            const btnEliminar = e.target.closest(".btn-eliminar");
            if (btnEliminar) {
                const id = btnEliminar.dataset.id;
                const nuevoCarrito = carrito.filter(item => item.id !== id);
                
                localStorage.setItem(key, JSON.stringify(nuevoCarrito));
                renderizarCarrito();
                if (window.actualizarBadgeCarrito) {
                    window.actualizarBadgeCarrito();
                }
            }
        });
    }

    // Manejar evento de pago
    if (btnRealizarPago) {
        btnRealizarPago.addEventListener("click", () => {
            const { key } = obtenerInfoSesion();
            const carrito = JSON.parse(localStorage.getItem(key)) || [];

            if (carrito.length === 0) {
                alert("No tienes productos en el carrito para pagar.");
                return;
            }

            const totalPagar = resumenTotal.textContent;
            alert(`¡Muchas gracias por tu compra! Tu pago de ${totalPagar} ha sido procesado con éxito.`);
            
            // Vaciar carrito
            localStorage.removeItem(key);
            
            // Re-renderizar
            renderizarCarrito();
            if (window.actualizarBadgeCarrito) {
                window.actualizarBadgeCarrito();
            }
        });
    }

    // Renderizado inicial
    renderizarCarrito();
});
