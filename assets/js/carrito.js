export function actualizarContadorCarrito() {

    const badge = document.querySelector(".nav-item .badge");
    if (!badge) return;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    if (totalProductos > 0) {
        badge.textContent = totalProductos;
        badge.classList.remove("d-none");
    } else {
        badge.classList.add("d-none");
    }
}

export function agregarAlCarrito(id, nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            id: id,
            nombre: nombre,
            precio: parseFloat(precio),
            imagen: imagen,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContadorCarrito();

    console.log(`${nombre} añadido al carrito.`);
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
});