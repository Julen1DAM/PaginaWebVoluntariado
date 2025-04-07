document.addEventListener('DOMContentLoaded', () => {
  // Menú hamburguesa
  const $navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });

  // Agrega funcionalidad de editar y eliminar a cada fila existente
  document.querySelectorAll("#tabla-eventos tbody tr").forEach(row => {
    const editarBtn = row.querySelector(".button.is-info");
    const eliminarBtn = row.querySelector(".button.is-danger");

    eliminarBtn.addEventListener("click", () => {
      row.remove();
    });

    editarBtn.addEventListener("click", () => {
      const celdas = row.querySelectorAll("td");
      const esEdicion = editarBtn.textContent === "Guardar";

      for (let i = 1; i < celdas.length - 1; i++) {
        if (!esEdicion) {
          const texto = celdas[i].textContent;
          celdas[i].innerHTML = `<input type="text" value="${texto}">`;
        } else {
          const input = celdas[i].querySelector("input");
          celdas[i].textContent = input.value;
        }
      }

      editarBtn.textContent = esEdicion ? "Editar" : "Guardar";
    });
  });
});
