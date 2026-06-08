document.addEventListener("DOMContentLoaded", () => {

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")) || JSON.parse(sessionStorage.getItem("usuarioLogueado"));

    //Proteger usuarios no logeados
    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para acceder a tu perfil.");
        window.location.href = "login.html";
        return;
    }

    //Mostrar datos de usuario
    const perfilNombre = document.getElementById("perfilNombre");
    const perfilEmail = document.getElementById("perfilEmail");

    if (perfilNombre) {
        perfilNombre.textContent = `Bienvenido, ${usuarioLogueado.nombre}`;
    }
    if (perfilEmail) {
        perfilEmail.textContent = usuarioLogueado.email;
    }

    //Rellenar direcciones modal
    const inputDireccion = document.getElementById("inputDireccion");
    const inputComuna = document.getElementById("inputComuna");
    const inputRegion = document.getElementById("inputRegion");

    if (inputDireccion) inputDireccion.value = usuarioLogueado.direccion || "";
    if (inputComuna) inputComuna.value = usuarioLogueado.comuna || "";
    if (inputRegion) inputRegion.value = usuarioLogueado.region || "";

    //Formulario cambiar direccion de envio
    const direccionForm = document.getElementById("direccionForm");
    if (direccionForm) {
        direccionForm.addEventListener("submit", (e) => {
            e.preventDefault();

            //Guardar valores del formulario
            const nuevaDireccion = inputDireccion.value.trim();
            const nuevaComuna = inputComuna.value.trim();
            const nuevaRegion = inputRegion.value.trim();

            //Actualizar el objeto de la sesión activa
            usuarioLogueado.direccion = nuevaDireccion;
            usuarioLogueado.comuna = nuevaComuna;
            usuarioLogueado.region = nuevaRegion;
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));

            //Actualizar
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const index = usuarios.findIndex(u => u.username.toLowerCase() === usuarioLogueado.username.toLowerCase());

            if (index !== -1) {
                usuarios[index].direccion = nuevaDireccion;
                usuarios[index].comuna = nuevaComuna;
                usuarios[index].region = nuevaRegion;
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
            }

            alert("Dirección de despacho actualizada con éxito.");

            //Cerrar modal
            const modalElement = document.getElementById("modalDireccion");
            if (modalElement && typeof bootstrap !== "undefined") {
                const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                modalInstance.hide();
            }
        });
    }
});
