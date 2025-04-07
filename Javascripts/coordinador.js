document.addEventListener('DOMContentLoaded', () => {
  // 1. Manejo del menú hamburguesa
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
      });
  });

  // 2. Manejo del formulario
  const form = document.querySelector("form");
  const tablaBody = document.querySelector("#tabla-eventos tbody");
  const guardarBtn = document.getElementById('btn-guardar');

  form.addEventListener('submit', (e) => {
      e.preventDefault(); // ¡Esto es crucial para evitar que el formulario se envíe!
      agregarEvento();
  });

  function agregarEvento() {
      const foto = form.foto.value.trim();
      const fecha = form.fecha.value;
      const empresa = form.empresa.value.trim();
      const lugar = form.lugar.value.trim();
      const descripcion = form.descripcion.value.trim();
      const tipo = form.tipo_voluntariado.value;
      const odsSeleccionados = Array.from(form.querySelector("select[name='ods[]']").selectedOptions)
                                  .map(option => option.value);

      if (!foto || !fecha || !empresa || !lugar || !descripcion || !tipo || odsSeleccionados.length === 0) {
          alert("Por favor, completa todos los campos antes de guardar el evento.");
          return;
      }

      const fila = document.createElement("tr");
      fila.innerHTML = `
          <td>
              <figure class="image is-64x64">
                  <img src="${foto}" alt="Imagen">
              </figure>
          </td>
          <td>${descripcion}</td>
          <td>${fecha}</td>
          <td>${empresa}</td>
          <td>${lugar}</td>
          <td>${tipo}</td>
          <td>${odsSeleccionados.join("<br>")}</td>
          <td><ul><li>No asignados</li></ul></td>
          <td>
              <div class="buttons">
                  <button class="button is-small is-info">Editar</button>
                  <button class="button is-small is-danger">Eliminar</button>
              </div>
          </td>
      `;
      tablaBody.appendChild(fila);
      form.reset();
      agregarEventosEditarEliminar(fila);
  }

  // 3. Función para botones Editar/Eliminar
  function agregarEventosEditarEliminar(row) {
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
  }

  // 4. Inicializar para filas existentes
  document.querySelectorAll("tbody tr").forEach(row => {
      agregarEventosEditarEliminar(row);
  });
});