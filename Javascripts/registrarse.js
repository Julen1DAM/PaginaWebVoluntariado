const btnEntrar = document.getElementById('btnEntrar')
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
function iniciarSesion() {
    const usuario = usernameInput.value;
    const contrasena = passwordInput.value;
    switch (usuario) {
        case "Iryna":
            if (contrasena === "4Vientos") {
                window.location.href = "paginaAdmin.html";
            } else {
                alert("Contraseña incorrecta.");
            }
            break;
        case "Juan":
            if (contrasena === "1234") {
                window.location.href = "usuario.html";
            } else {
                alert("Contraseña incorrecta.");
            }
            break;
        default:
            alert("Usuario no reconocido.");
            break;
    }
}
btnEntrar.addEventListener('click', function(e) {
    e.preventDefault();
    iniciarSesion();
});