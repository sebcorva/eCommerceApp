document.addEventListener("DOMContentLoaded", () => {
    const carritos = document.querySelectorAll(".bi-cart-plus");

    carritos.forEach(carrito => {
        carrito.addEventListener("click", (e) => {
            e.preventDefault(); 
            
            carrito.classList.add("activo");

            setTimeout(() => {
                carrito.classList.remove("activo");
            }, 400);
        });
    });
});