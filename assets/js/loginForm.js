document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        let isValid = true;

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

        const usernameVal = username.value.trim();
        const passwordVal = password.value;

        // Validar campos vacíos
        if (!usernameVal) {
            setError(username, "El nombre de usuario es obligatorio.");
        } else {
            setSuccess(username);
        }

        if (!passwordVal) {
            setError(password, "La contraseña es obligatoria.");
        } else {
            setSuccess(password);
        }

        //Si los campos no están vacíos, validar contra localStorage
        if (isValid) {
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            //Buscar el usuario
            const usuarioEncontrado = usuarios.find(u => u.username.toLowerCase() === usernameVal.toLowerCase());

            if (!usuarioEncontrado) {
                setError(username, "El nombre de usuario no está registrado.");
            } else if (usuarioEncontrado.password !== passwordVal) {
                setError(password, "La contraseña es incorrecta.");
            } else {
                setSuccess(username);
                setSuccess(password);

                if (usuarioEncontrado.role == "admin") {
                    sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

                    alert(`¡Bienvenido Panel de Control, Administrador ${usuarioEncontrado.nombre}!`);
                    window.location.href = "adminPanel.html";
                } else {
                    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

                    if (usuarioEncontrado.carrito) {
                        localStorage.setItem("carrito", JSON.stringify(usuarioEncontrado.carrito));
                    } else {
                        localStorage.removeItem("carrito");
                    }

                    alert(`¡Bienvenido de vuelta, ${usuarioEncontrado.nombre}!`);
                    window.location.href = "index.html";
                }

            }
        }
    });

    //Limpieza de estados al escribir
    username.addEventListener("input", () => {
        username.classList.remove("is-invalid", "is-valid");
    });
    password.addEventListener("input", () => {
        password.classList.remove("is-invalid", "is-valid");
    });
});
