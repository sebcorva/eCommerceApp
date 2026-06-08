document.addEventListener("DOMContentLoaded", () => {

    const pathPrefix = window.location.pathname.includes("/pages/") ? "../" : "";

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")) || JSON.parse(sessionStorage.getItem("usuarioLogueado"));

    const authContainer = document.querySelector("#menuNavegacion .d-flex.flex-column.flex-lg-row.gap-2, #menuNavegacion .d-flex.flex-column.flex-lg-row");
    //Validar header
    if (authContainer) {
        if (usuarioLogueado) {
            authContainer.className = "d-flex align-items-center gap-3 mt-3 mt-lg-0 flex-column flex-lg-row";

            let botonAdmin = "";
            let botonPerfil = "";

            //Validar boton admin o perfil
            if (usuarioLogueado.role === "admin") {
                botonAdmin = `
                    <a class="btn btn-warning fw-bold btn-sm d-flex align-items-center gap-1" href="${pathPrefix}adminPanel.html">
                        <i class="bi bi-shield-lock-fill"></i> Panel Admin
                    </a>
                `;
            } else {
                botonPerfil = `
                    <a class="nav-link text-primary fw-bold d-flex align-items-center gap-2 py-1 px-2 border rounded bg-light" href="${pathPrefix}perfil.html" style="transition: all 0.3s ease;">
                        <i class="bi bi-person-circle fs-5 text-primary"></i>
                        <span>${usuarioLogueado.username}</span>
                    </a>
                `;
            }


            authContainer.innerHTML = `
                ${botonAdmin}
                ${botonPerfil}
                <button class="btn btn-outline-danger fw-semibold btn-sm" id="btnCerrarSesion">Cerrar Sesión</button>
            `;

            //Logout
            const btnCerrarSesion = document.getElementById("btnCerrarSesion");
            if (btnCerrarSesion) {
                btnCerrarSesion.addEventListener("click", () => {
                    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
                    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

                    if (usuarioLogueado) {
                        const index = usuarios.findIndex(u => u.username.toLowerCase() === usuarioLogueado.username.toLowerCase());

                        if (index !== -1) {
                            usuarios[index].carrito = carritoActual;
                            localStorage.setItem("usuarios", JSON.stringify(usuarios));
                        }
                    }

                    localStorage.removeItem("usuarioLogueado");
                    sessionStorage.removeItem("usuarioLogueado");
                    localStorage.removeItem("carrito");

                    alert("Sesión cerrada correctamente.");
                    window.location.href = `${pathPrefix}index.html`;
                });
            }
        } else {
            authContainer.innerHTML = `
                <a class="btn btn-danger fw-semibold" href="${pathPrefix}login.html">Iniciar Sesión</a>
                <a class="btn btn-primary fw-semibold" href="${pathPrefix}registro.html">Registrarse</a>
            `;
        }
    }
    //Actualizar contador carrito global
    function actualizarContadorCarritoGlobal() {
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

    actualizarContadorCarritoGlobal();
});
