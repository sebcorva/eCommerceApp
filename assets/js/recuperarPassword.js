document.addEventListener("DOMContentLoaded", () => {
    const recuperarForm = document.getElementById("recuperarForm");
    const instruccionesTexto = document.getElementById("instruccionesTexto");

    const grupoEmail = document.getElementById("grupoEmail");
    const inputEmail = document.getElementById("email");
    const txtErrorEmail = document.getElementById("errorEmail");

    const seccionNuevasClaves = document.getElementById("seccionNuevasClaves");
    const inputNewPassword = document.getElementById("newPassword");
    const inputRepeatPassword = document.getElementById("repeatPassword");

    const btnAccion = document.getElementById("btnAccionForm");

    let pasoActual = 1;
    let usuarioEncontrado = null;

    recuperarForm.addEventListener("submit", (e) => {

        e.preventDefault();
        //Validar email
        if (pasoActual === 1) {
            const correoIngresado = inputEmail.value.trim().toLowerCase();
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            inputEmail.classList.remove("is-invalid");

            if (!inputEmail.checkValidity() || correoIngresado === "") {
                inputEmail.classList.add("is-invalid");
                txtErrorEmail.textContent = "Por favor, ingresa un formato de correo válido.";
                return;
            }

            usuarioEncontrado = usuarios.find(u => u.email && u.email.toLowerCase() === correoIngresado);

            if (!usuarioEncontrado) {
                inputEmail.classList.add("is-invalid");
                txtErrorEmail.textContent = "Este correo electrónico no está registrado en aniMug.";
                return;
            }

            //Visilidad de paso 2 de recuperacion de contraseña
            instruccionesTexto.innerHTML = `Hola ${usuarioEncontrado.username}, ingresa tu nueva contraseña:`;
            instruccionesTexto.className = "text-center my-4 fw-semibold";

            grupoEmail.classList.add("d-none");
            seccionNuevasClaves.classList.remove("d-none");

            //Actualizar texto de boton
            btnAccion.textContent = "Confirmar Nueva Contraseña";
            btnAccion.className = "btn btn-success w-100 fw-semibold";

            pasoActual = 2;
        }

        //Procesar nuevas claves
        else if (pasoActual === 2) {
            const nuevaClave = inputNewPassword.value;
            const repetirClave = inputRepeatPassword.value;
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            inputNewPassword.classList.remove("is-invalid", "is-valid");
            inputRepeatPassword.classList.remove("is-invalid", "is-valid");

            let formularioValido = true;

            if (nuevaClave.length < 4) {
                inputNewPassword.classList.add("is-invalid");
                formularioValido = false;
            } else {
                inputNewPassword.classList.add("is-valid");
            }

            if (nuevaClave !== repetirClave || repetirClave === "") {
                inputRepeatPassword.classList.add("is-invalid");
                formularioValido = false;
            } else {
                inputRepeatPassword.classList.add("is-valid");
            }

            if (!formularioValido) return;

            //Actualizar nuevas claves
            const index = usuarios.findIndex(u => u.username.toLowerCase() === usuarioEncontrado.username.toLowerCase());

            if (index !== -1) {
                usuarios[index].password = nuevaClave;

                localStorage.removeItem("usuarioLogueado");
                sessionStorage.removeItem("usuarioLogueado");
                localStorage.setItem("usuarios", JSON.stringify(usuarios));

                alert("¡Contraseña actualizada con éxito!");
                window.location.href = "login.html";
            } else {
                alert("Error del sistema al localizar tu cuenta.");
            }
        }
    });
});