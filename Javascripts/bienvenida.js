document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const bienvenida = document.getElementById("bienvenida");
  const modalToggle = document.getElementById("modal-toggle");
  const modal = document.getElementById("ventanaIS");

  // Ocultamos el mensaje de bienvenida
  bienvenida.style.display = "none";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("contra").value;

    // Validaciones básicas
    const isUsernameValid = username.match(/^[a-zA-Z0-9]+$/);
    const isPasswordValid = password.length >= 6;

    // Mostrar/ocultar mensajes de error según validación
    document.getElementById("error-msg-usuario").style.display = isUsernameValid ? "none" : "block";
    document.getElementById("error-msg-contra").style.display = isPasswordValid ? "none" : "block";

    if (isUsernameValid && isPasswordValid) {
      // Mostrar mensaje de bienvenida personalizado
      bienvenida.textContent = `¡Bienvenido, ${username}!`;
      bienvenida.style.display = "block";
      
      // Cerrar el modal después de un breve retraso
      setTimeout(() => {
        modalToggle.checked = false; // Esto cierra el modal (porque desmarca el checkbox)
        modal.style.display = "none"; // Esto es redundante pero por si acaso
        
        // Ocultar el mensaje 
        setTimeout(() => {
          bienvenida.style.display = "none";
        }, 5000);
      }, 3000);
    }
  });
});