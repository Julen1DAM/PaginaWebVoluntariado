const btnEntrar = document.getElementById('btnEntrar')
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("contra");
const error = document.getElementById("error");
function iniciarSesion() {
    const usuario = usernameInput.value;
    const contrasena = passwordInput.value;
    switch (usuario) {
        case "Iryna":
            if (contrasena === "4Vientos") {
                window.location.href = "paginaAdmin.html";
            } else {
                error.innerHTML = "Contraseña incorrecta.";
                error.style.color = "red";
            }
            break;
        case "Juan":
            if (contrasena === "123456") {
                window.location.href = "usuario.html";
            } else {
                error.innerHTML = "Contraseña incorrecta.";
                error.style.color = "red";
            }
            break;
        default:
            error.innerHTML = "Usuario no encontrado.";
            error.style.color = "red";
            break;
    }
}
btnEntrar.addEventListener('click', function(e) {
    e.preventDefault();
    iniciarSesion();
});