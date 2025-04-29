document.addEventListener('DOMContentLoaded', () => {
  const inscribirseBtns = document.querySelectorAll('.inscribirse-btn');

  // Crear un contenedor para mensajes si no existe
  let mensajeContenedor = document.createElement('div');
  mensajeContenedor.id = "mensajeContenedor";
  mensajeContenedor.style.position = "fixed";
  mensajeContenedor.style.top = "1rem";
  mensajeContenedor.style.right = "1rem";
  mensajeContenedor.style.zIndex = "1000";
  document.body.appendChild(mensajeContenedor);

  function mostrarMensaje(texto, tipo) {
    const mensaje = document.createElement('div');
    mensaje.className = `notification ${tipo === "success" ? "is-success" : "is-warning"}`;
    mensaje.style.marginBottom = "0.5rem";
    mensaje.innerHTML = `
      <button class="delete"></button>
      ${texto}
    `;

    // Botón de cerrar mensaje
    mensaje.querySelector('.delete').addEventListener('click', () => {
      mensaje.remove();
    });

    mensajeContenedor.appendChild(mensaje);

    // Desaparecer automáticamente tras 3 segundos
    setTimeout(() => {
      mensaje.remove();
    }, 3000);
  }

  inscribirseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.textContent.trim() === "Inscribirse") {
        mostrarMensaje("¡Te has inscrito correctamente!", "success");
        btn.textContent = "Desapuntarse";
        btn.classList.add("apuntado");
      } else {
        mostrarMensaje("Te has desapuntado.", "warning");
        btn.textContent = "Inscribirse";
        btn.classList.remove("apuntado");
      }
    });
  });
});
