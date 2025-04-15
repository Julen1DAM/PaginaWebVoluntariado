document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('username');
    const errorMsg = document.getElementById('error-msg-usuario');
  
    input.addEventListener('input', function() {
      // Permitimos letras (incluidas vocales acentuadas), números y la ñ
      const isValid = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9]*$/.test(this.value);
      
      if (!isValid) {
        this.value = this.value.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9]/g, '');
        errorMsg.style.display = 'block';
      } else {
        errorMsg.style.display = 'none';
      }
      
      // Cambiar color del borde
      this.classList.toggle('is-danger', !isValid);
      this.classList.toggle('is-success', isValid && this.value.length > 0);
    });
  });