document.addEventListener("DOMContentLoaded", () => {
    // Determinar prefijo de ruta para subcarpetas (ej. pages/)
    const pathPrefix = window.location.pathname.includes("/pages/") ? "../" : "";

    // Obtener sesión activa
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    // Buscar el contenedor de botones de autenticación en el header
    const authContainer = document.querySelector("#menuNavegacion .d-flex.flex-column.flex-lg-row.gap-2, #menuNavegacion .d-flex.flex-column.flex-lg-row");

    if (authContainer) {
        if (usuarioLogueado) {
            // Usuario está logueado: Reemplazar botones de login/registro con enlace a Perfil y Cerrar Sesión
            authContainer.className = "d-flex align-items-center gap-3 mt-3 mt-lg-0 flex-column flex-lg-row";
            authContainer.innerHTML = `
                <a class="nav-link text-primary fw-bold d-flex align-items-center gap-2 py-1 px-2 border rounded bg-light" href="${pathPrefix}perfil.html" style="transition: all 0.3s ease;">
                    <i class="bi bi-person-circle fs-5 text-primary"></i>
                    <span>${usuarioLogueado.username}</span>
                </a>
                <button class="btn btn-outline-danger fw-semibold btn-sm" id="btnCerrarSesion">Cerrar Sesión</button>
            `;

            // Agregar evento de logout
            const btnCerrarSesion = document.getElementById("btnCerrarSesion");
            if (btnCerrarSesion) {
                btnCerrarSesion.addEventListener("click", () => {
                    localStorage.removeItem("usuarioLogueado");
                    console.log("Sesión cerrada correctamente.");
                    window.location.href = `${pathPrefix}index.html`;
                });
            }
        } else {
            // Usuario NO está logueado: Asegurar que los botones normales apunten al destino correcto
            // (Si estamos en una subcarpeta, corregir enlaces dinámicamente)
            authContainer.innerHTML = `
                <a class="btn btn-danger fw-semibold" href="${pathPrefix}login.html">Iniciar Sesión</a>
                <a class="btn btn-primary fw-semibold" href="${pathPrefix}registro.html">Registrarse</a>
            `;
        }
    }
});
