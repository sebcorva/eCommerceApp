import { agregarAlCarrito } from "./carrito.js";

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-productos");

    if (!contenedor) return;

    const categoriaActual = contenedor.getAttribute("data-categoria");

    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    const productosFiltrados = productos.filter(p => p.categoria === categoriaActual);

    contenedor.innerHTML = "";

    //Muestra mensaje si no hay productos
    if (productosFiltrados.length === 0) {
        contenedor.innerHTML = `<p class="text-center text-muted my-5">Próximamente más productos en esta categoría.</p>`;
        return;
    }

    //Renderizado de Productos
    productosFiltrados.forEach(producto => {
        const tieneDescuento = producto.descuento > 0;
        const precioFinal = tieneDescuento
            ? producto.precio * (1 - producto.descuento / 100)
            : producto.precio;

        //Etiqueta descuento
        const badgeDescuento = tieneDescuento
            ? `<p class="badge-new">${producto.descuento}% OFF</p>`
            : "";

        const tarjetaHTML = `
            <div class="col d-flex justify-content-center">
                <div class="card producto-card shadow-sm border-0 position-relative h-100 w-100" style="max-width: 22rem;">
                    <div class="position-relative overflow-hidden">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        ${badgeDescuento}
                    </div>
                    <div class="card-body px-3 py-3 d-flex flex-column justify-content-between">
                        <div>
                            <h3 class="h5 card-title text-start fw-semibold mb-2 text-primary">${producto.nombre}</h3>
                            <p class="text-start">${producto.descripcion}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="fs-4 fw-bold text-dark">$${precioFinal.toLocaleString('es-CL')}</span>
                            
                            <a href="#" class="text-decoration-none link-dark fs-3 btn-agregar-carrito"
                               data-id="${producto.id}"
                               data-nombre="${producto.nombre}"
                               data-precio="${precioFinal}"
                               data-imagen="${producto.imagen}">
                                <i class="bi bi-cart-plus"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        contenedor.innerHTML += tarjetaHTML;

        //Agregar producto al Carrito
        contenedor.addEventListener("click", (e) => {
            const boton = e.target.closest(".btn-agregar-carrito");

            if (boton) {
                e.preventDefault();
                e.stopImmediatePropagation();

                const id = boton.getAttribute("data-id");
                const nombre = boton.getAttribute("data-nombre");
                const precio = boton.getAttribute("data-precio");
                const imagen = boton.getAttribute("data-imagen");

                agregarAlCarrito(id, nombre, precio, imagen);
            }
        });
    });
});