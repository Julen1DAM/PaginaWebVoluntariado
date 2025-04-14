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
});
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionamos todas las filas de las tablas
  const filas = document.querySelectorAll("table tbody tr");

  // Iteramos sobre cada fila para añadir eventos a los botones de Editar y Eliminar
  filas.forEach(row => {
    const editarBtn = row.querySelector(".button.is-info");
    const eliminarBtn = row.querySelector(".button.is-danger");

    // Evento para eliminar la fila
    eliminarBtn.addEventListener("click", () => {
      row.remove();  // Elimina la fila
    });

    // Evento para editar la fila
    editarBtn.addEventListener("click", () => {
      const celdas = row.querySelectorAll("td");
      const esEdicion = editarBtn.textContent === "Guardar";  // Comprobamos si estamos en modo edición

      // Iteramos sobre las celdas (excluyendo la foto y las acciones)
      for (let i = 1; i < celdas.length - 1; i++) {
        if (!esEdicion) {
          const texto = celdas[i].textContent;  // Obtenemos el texto actual de la celda
          celdas[i].innerHTML = `<input type="text" value="${texto}">`;  // Convertimos el texto en un campo de texto
        } else {
          const input = celdas[i].querySelector("input");  // Buscamos el campo de texto
          celdas[i].textContent = input.value;  // Actualizamos el texto de la celda con el valor del campo de texto
        }
      }

      // Cambiar el texto del botón entre "Editar" y "Guardar"
      editarBtn.textContent = esEdicion ? "Editar" : "Guardar";
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // Referencias a los elementos del DOM
  const filterForm = document.querySelector('.filtroForm');
  const filterButton = filterForm.querySelector('button[type="button"]');
  const tagsContainer = document.querySelector('#voluntarios .tags');
  const volunteerTable = document.querySelector('#voluntarios table tbody');
  const originalVolunteers = Array.from(volunteerTable.querySelectorAll('tr'));
  
  // Datos de ejemplo (en un caso real, estos vendrían de una API)
  const volunteersData = originalVolunteers.map(row => {
    const cells = row.querySelectorAll('td');
    return {
      element: row,
      nombre: cells[1].textContent,
      correo: cells[2].textContent,
      descripcion: cells[3].textContent,
      voluntariados: cells[4].textContent.split(', '),
      disponibilidad: cells[5].textContent.split(', '),
      horas: parseInt(cells[6].textContent),
      curso: cells[7].textContent,
      visible: true
    };
  });

  // Función para aplicar los filtros
  function applyFilters() {
    // Obtener valores del formulario
    const nombreFilter = filterForm.querySelector('input[name="nombre"]').value.toLowerCase();
    const disponibilidadFilter = Array.from(filterForm.querySelector('select[name="disponibilidad[]"]').selectedOptions).map(opt => opt.value);
    const horasMinFilter = parseInt(filterForm.querySelector('input[name="horas_min"]').value) || 0;
    const voluntariadoFilter = filterForm.querySelector('select[name="voluntariado"]').value;
    const cursoFilter = filterForm.querySelector('select[name="curso"]').value;
    
    // Limpiar tags anteriores
    tagsContainer.innerHTML = '';
    
    // Crear tags para los filtros aplicados
    if (nombreFilter) {
      addFilterTag('Nombre', nombreFilter);
    }
    if (disponibilidadFilter.length > 0) {
      addFilterTag('Disponibilidad', disponibilidadFilter.join(', '));
    }
    if (horasMinFilter > 0) {
      addFilterTag('Horas mínimas', horasMinFilter);
    }
    if (voluntariadoFilter) {
      addFilterTag('Voluntariado', voluntariadoFilter);
    }
    if (cursoFilter) {
      addFilterTag('Curso', cursoFilter);
    }
    
    // Aplicar filtros a los datos
    volunteersData.forEach(volunteer => {
      let matches = true;
      
      // Filtro por nombre (nombre o apellido)
      if (nombreFilter && !volunteer.nombre.toLowerCase().includes(nombreFilter)) {
        matches = false;
      }
      
      // Filtro por disponibilidad
      if (disponibilidadFilter.length > 0 && 
          !disponibilidadFilter.some(day => volunteer.disponibilidad.includes(day))) {
        matches = false;
      }
      
      // Filtro por horas mínimas
      if (horasMinFilter > 0 && volunteer.horas < horasMinFilter) {
        matches = false;
      }
      
      // Filtro por tipo de voluntariado
      if (voluntariadoFilter && !volunteer.voluntariados.includes(voluntariadoFilter)) {
        matches = false;
      }
      
      // Filtro por curso
      if (cursoFilter && volunteer.curso !== cursoFilter) {
        matches = false;
      }
      
      // Mostrar u ocultar según coincida con los filtros
      volunteer.element.style.display = matches ? '' : 'none';
      volunteer.visible = matches;
    });
  }
  
  // Función para añadir tags de filtro
  function addFilterTag(label, value) {
    const tag = document.createElement('span');
    tag.className = 'tag is-info';
    tag.innerHTML = `${label}: ${value} <button class="delete is-small"></button>`;
    
    // Eliminar filtro al hacer clic en la X
    const deleteButton = tag.querySelector('.delete');
    deleteButton.addEventListener('click', function() {
      if (label === 'Nombre') {
        filterForm.querySelector('input[name="nombre"]').value = '';
      } else if (label === 'Disponibilidad') {
        Array.from(filterForm.querySelector('select[name="disponibilidad[]"]').options).forEach(opt => {
          opt.selected = false;
        });
      } else if (label === 'Horas mínimas') {
        filterForm.querySelector('input[name="horas_min"]').value = '';
      } else if (label === 'Voluntariado') {
        filterForm.querySelector('select[name="voluntariado"]').value = '';
      } else if (label === 'Curso') {
        filterForm.querySelector('select[name="curso"]').value = '';
      }
      
      applyFilters();
    });
    
    tagsContainer.appendChild(tag);
  }
  
  // Evento para el botón de filtrar
  filterButton.addEventListener('click', applyFilters);
  
  // Evento para borrar todos los filtros
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('clear-filters')) {
      filterForm.reset();
      applyFilters();
    }
  });
});
