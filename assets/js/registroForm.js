document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");

    form.addEventListener("submit", (e) => {
        //Evitar el envio automatico del formulario antes de validar
        e.preventDefault();
        e.stopPropagation();


        let isValid = true;
        const nombre = document.getElementById("nombre");
        const fechaNacimiento = document.getElementById("fecha_nacimiento");
        const email = document.getElementById("email");
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const password2 = document.getElementById("password2");

        const setError = (element, message) => {
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");

            let feedback = element.nextElementSibling;
            if (!feedback || !feedback.classList.contains("invalid-feedback")) {
                feedback = document.createElement("div");
                feedback.className = "invalid-feedback";
                element.parentNode.appendChild(feedback);
            }
            feedback.textContent = message;
            isValid = false;
        };

        const setSuccess = (element) => {
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");
        };

        // Validaciones de campos

        // Nombre
        if (!nombre.value.trim()) {
            setError(nombre, "El nombre es obligatorio y no puede estar vacío.");
        } else {
            setSuccess(nombre);
        }

        // Fecha de Nacimiento
        if (!fechaNacimiento.value) {
            setError(fechaNacimiento, "La fecha de nacimiento es obligatoria.");
        } else {
            const fechaNac = new Date(fechaNacimiento.value);
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaNac.getFullYear();
            const mes = hoy.getMonth() - fechaNac.getMonth();

            if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
                edad--;
            }

            if (edad < 13) {
                setError(fechaNacimiento, "Debes tener al menos 13 años para registrarte.");
            } else {
                setSuccess(fechaNacimiento);
            }
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            setError(email, "El email es obligatorio.");
        } else if (!emailRegex.test(email.value.trim())) {
            setError(email, "Por favor, ingrese un formato de correo válido.");
        } else {
            setSuccess(email);
        }

        // Nombre de Usuario
        if (!username.value.trim()) {
            setError(username, "El nombre de usuario es obligatorio.");
        } else {
            setSuccess(username);
        }

        // Contraseña
        const passValue = password.value;
        const tieneLetraMayuscula = /[A-Z]/.test(passValue);
        const tieneNumero = /[0-9]/.test(passValue);

        if (!passValue) {
            setError(password, "La contraseña es obligatoria.");
        } else if (passValue.length < 6 || passValue.length > 18) {
            setError(password, "La contraseña debe tener entre 6 y 18 caracteres.");
        } else if (!tieneLetraMayuscula || !tieneNumero) {
            setError(password, "La contraseña debe incluir al menos una letra mayúscula y un número.");
        } else {
            setSuccess(password);
        }

        // Confirmar Contraseña
        if (!password2.value) {
            setError(password2, "Por favor, confirme su contraseña.");
        } else if (password.value !== password2.value) {
            setError(password2, "Las contraseñas no coinciden.");
        } else {
            setSuccess(password2);
        }

        // Dirección de despacho (Opcional)
        const direccion = document.getElementById("direccion");
        if (direccion.value.trim()) {
            setSuccess(direccion);
        } else {
            direccion.classList.remove("is-invalid", "is-valid");
        }

        // Verificar si el username o email ya existen en localStorage
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usernameVal = username.value.trim();
        const emailVal = email.value.trim();

        if (usernameVal) {
            const existeUsuario = usuarios.some(u => u.username.toLowerCase() === usernameVal.toLowerCase());
            if (existeUsuario) {
                setError(username, "El nombre de usuario ya está registrado.");
            }
        }
        if (emailVal && emailRegex.test(emailVal)) {
            const existeEmail = usuarios.some(u => u.email.toLowerCase() === emailVal.toLowerCase());
            if (existeEmail) {
                setError(email, "El correo electrónico ya está registrado.");
            }
        }
        //Fin validaciones 

        if (isValid) {
            const nuevoUsuario = {
                nombre: nombre.value.trim(),
                fechaNacimiento: fechaNacimiento.value,
                email: emailVal,
                direccion: direccion.value.trim(),
                username: usernameVal,
                password: password.value
            };

            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            console.log("¡Registro completado con éxito! Ahora puedes iniciar sesión.");
            window.location.href = "login.html";
        }
    });

    // Limpiar formulario
    form.addEventListener("reset", () => {
        const inputs = form.querySelectorAll(".form-control");
        inputs.forEach(input => {
            input.classList.remove("is-invalid", "is-valid");
        });
    });
});