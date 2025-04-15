let contra = document.getElementById("contra");
let errorMsg = document.getElementById("error-msg-contra");

contra.addEventListener("input", function() {
    let isValid = this.value.length >= 6; // Es válido con mínimo 6 caracteres
    
    // Mostrar/ocultar mensaje de error
    errorMsg.style.display = isValid ? "none" : "block";
    
    // Cambiar clases de Bulma
    this.classList.toggle("is-danger", !isValid);
    this.classList.toggle("is-success", isValid && this.value.length > 0);
});
