document.addEventListener("DOMContentLoaded", () => {
    // 1. Obtener la sesión activa
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    // 2. Si no hay sesión, redirigir al login
    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para acceder a tu perfil.");
        window.location.href = "login.html";
        return;
    }

    // 3. Mostrar los datos del usuario en la interfaz
    const perfilNombre = document.getElementById("perfilNombre");
    const perfilEmail = document.getElementById("perfilEmail");

    if (perfilNombre) {
        perfilNombre.textContent = `Bienvenido, ${usuarioLogueado.nombre}`;
    }
    if (perfilEmail) {
        perfilEmail.textContent = usuarioLogueado.email;
    }

    // 4. Rellenar los campos del modal de direcciones
    const inputDireccion = document.getElementById("inputDireccion");
    const inputComuna = document.getElementById("inputComuna");
    const inputRegion = document.getElementById("inputRegion");

    if (inputDireccion) inputDireccion.value = usuarioLogueado.direccion || "";
    if (inputComuna) inputComuna.value = usuarioLogueado.comuna || "";
    if (inputRegion) inputRegion.value = usuarioLogueado.region || "";

    // 5. Manejar el envío del formulario de direcciones
    const direccionForm = document.getElementById("direccionForm");
    if (direccionForm) {
        direccionForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Guardar valores del formulario
            const nuevaDireccion = inputDireccion.value.trim();
            const nuevaComuna = inputComuna.value.trim();
            const nuevaRegion = inputRegion.value.trim();

            // Actualizar el objeto de la sesión activa
            usuarioLogueado.direccion = nuevaDireccion;
            usuarioLogueado.comuna = nuevaComuna;
            usuarioLogueado.region = nuevaRegion;
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));

            // Actualizar en la lista global de usuarios
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const index = usuarios.findIndex(u => u.username.toLowerCase() === usuarioLogueado.username.toLowerCase());

            if (index !== -1) {
                usuarios[index].direccion = nuevaDireccion;
                usuarios[index].comuna = nuevaComuna;
                usuarios[index].region = nuevaRegion;
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
            }

            alert("Dirección de despacho actualizada con éxito.");

            // Cerrar el modal usando la API de Bootstrap 5
            const modalElement = document.getElementById("modalDireccion");
            if (modalElement && typeof bootstrap !== "undefined") {
                const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                modalInstance.hide();
            }
        });
    }
});
