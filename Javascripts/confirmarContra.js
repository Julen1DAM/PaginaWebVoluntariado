let contra = document.getElementById("contra");
let confcontra = document.getElementById("confcontra");
let errorMsg = document.getElementById("error-msg-confcontra");

contra.addEventListener("input", function() {
    let isValid = (confcontra.value.length >= 6 && confcontra.value == contra.value); // Es válido con mínimo 6 caracteres e 
    // igual a la contraseña original
    
    // Mostrar/ocultar mensaje de error
    errorMsg.style.display = isValid ? "none" : "block";
    
    // Cambiar clases de Bulma
    this.classList.toggle("is-danger", !isValid);
    this.classList.toggle("is-success", isValid && this.value.length > 0);
});