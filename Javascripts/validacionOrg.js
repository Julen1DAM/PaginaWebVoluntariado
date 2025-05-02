let nombre = document.getElementById("NomPerOrg");
let cp = document.getElementById("CodPosOrg");
let telefono = document.getElementById("TelOrg");
let email = document.getElementById("CorreoOrg");
let nombreError = document.getElementById("errorNomPerOrg");
let cpError = document.getElementById("errorCodPosOrg");
let telefonoError = document.getElementById("errorTelOrg");
let emailError = document.getElementById("errorCorreoOrg");
document.getElementById("botonOrg").addEventListener("click", function () {
    let isValid = true;

    // Validate NomPerOrg
    const nombreRegex = /^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
    if (!nombreRegex.test(nombre.value.trim())) {
        nombreError.textContent = "El nombre solo puede contener letras y espacios.";
        isValid = false;
    } else {
        nombreError.textContent = "";
    }

    // Validate CodPosOrg
    const cpRegex = /^\d{5}$/;
    if (!cpRegex.test(cp.value.trim())) {
        cpError.textContent = "El código postal debe ser un número de 5 dígitos.";
        isValid = false;
    } else {
        cpError.textContent = "";
    }

    // Validate TelOrg
    const telefonoRegex = /^\d{9}$/;
    if (!telefonoRegex.test(telefono.value.trim())) {
        telefonoError.textContent = "El teléfono debe ser un número de 9 dígitos.";
        isValid = false;
    } else {
        telefonoError.textContent = "";
    }

    // Validate CorreoOrg
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = "El correo debe tener un formato válido.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    if (!isValid) {
        event.preventDefault();
    }
});