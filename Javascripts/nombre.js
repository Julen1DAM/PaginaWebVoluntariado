let nombre = document.getElementById("string");
let errorMsg = document.getElementById("error-msg-nombre");
nombre.addEventListener("input", function() {
    // Permitimos letras (incluidas vocales acentuadas) y ñ
    const isValid = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]*$/.test(this.value);
    
    if (!isValid) {
      this.value = this.value.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/g, "");
      errorMsg.style.display = "block";
    } else {
      errorMsg.style.display = "none";
    }
    
    // Cambiar color del borde
    this.classList.toggle("is-danger", !isValid);
    this.classList.toggle("is-success", isValid && this.value.length > 0);
  });
