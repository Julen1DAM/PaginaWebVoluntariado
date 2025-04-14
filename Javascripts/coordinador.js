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
document.addEventListener('DOMContentLoaded', () => {
  // Elementos del modal
  const modal = document.getElementById('modalActividad');
  const btnAbrir = document.getElementById('btnAñadirActividad');
  const btnCerrar = document.getElementById('cerrarModal');
  const btnCancelar = document.getElementById('cancelarActividad');
  const btnGuardar = document.getElementById('guardarActividad');
  const btnAgregarFecha = document.getElementById('agregarFecha');
  
  // Elementos del formulario
  const inputFecha = document.getElementById('fechaActividad');
  const listaFechas = document.getElementById('listaFechas');
  const fechasSeleccionadas = document.getElementById('fechasSeleccionadas');
  const fotoInput = document.getElementById('fotoActividad');
  const descripcionInput = document.getElementById('descripcionActividad');
  const empresaInput = document.getElementById('empresaActividad');
  const lugarInput = document.getElementById('lugarActividad');
  const tipoVoluntariadoSelect = document.getElementById('tipoVoluntariado');
  const odsSelect = document.getElementById('odsActividad');
  
  // Tabla de eventos
  const tablaEventos = document.getElementById('lista-eventos');

  // Array para almacenar las fechas seleccionadas
  let fechas = [];

  // Abrir modal
  btnAbrir.addEventListener('click', () => {
    // Limpiar el formulario al abrir
    resetForm();
    modal.classList.add('is-active');
  });

  // Cerrar modal
  btnCerrar.addEventListener('click', () => {
    modal.classList.remove('is-active');
  });

  btnCancelar.addEventListener('click', () => {
    modal.classList.remove('is-active');
  });

  // Agregar fecha a la lista
  btnAgregarFecha.addEventListener('click', () => {
    const fecha = inputFecha.value;
    if (fecha && !fechas.includes(fecha)) {
      fechas.push(fecha);
      actualizarListaFechas();
      inputFecha.value = ''; // Limpiar el input después de agregar
    }
  });

  // Función para actualizar la lista visual de fechas
  function actualizarListaFechas() {
    listaFechas.innerHTML = '';
    fechas.forEach((fecha, index) => {
      const tag = document.createElement('span');
      tag.className = 'tag is-info';
      tag.innerHTML = `
        ${fecha}
        <button class="delete is-small" data-index="${index}"></button>
      `;
      listaFechas.appendChild(tag);
    });
    
    // Actualizar el input hidden con las fechas como string separado por comas
    fechasSeleccionadas.value = fechas.join(',');
    
    // Agregar event listeners a los botones de eliminar
    document.querySelectorAll('#listaFechas .delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        fechas.splice(index, 1);
        actualizarListaFechas();
      });
    });
  }

  // Guardar actividad
  btnGuardar.addEventListener('click', () => {
    // Validar campos obligatorios
    if (!validarFormulario()) {
      return;
    }
    
    // Obtener los ODS seleccionados
    const odsSeleccionados = Array.from(odsSelect.selectedOptions).map(option => option.value);
    
    // Crear la nueva actividad
    const nuevaActividad = {
      foto: fotoInput.value || './Imagenes/voluntariado.png',
      descripcion: descripcionInput.value,
      fechas: fechas.join(', '),
      empresa: empresaInput.value,
      lugar: lugarInput.value,
      tipo: tipoVoluntariadoSelect.value,
      ods: odsSeleccionados.join(', '),
      voluntarios: [] // Inicialmente sin voluntarios
    };
    
    // Añadir la actividad a la tabla
    agregarActividadATabla(nuevaActividad);
    
    // Cerrar el modal y limpiar el formulario
    modal.classList.remove('is-active');
    resetForm();
  });

  // Función para validar el formulario
  function validarFormulario() {
    if (fechas.length === 0) {
      alert('Por favor, añade al menos una fecha para la actividad');
      return false;
    }
    
    if (!descripcionInput.value) {
      alert('Por favor, ingresa una descripción para la actividad');
      return false;
    }
    
    if (!empresaInput.value) {
      alert('Por favor, ingresa el nombre de la empresa/organización');
      return false;
    }
    
    if (!lugarInput.value) {
      alert('Por favor, ingresa el lugar donde se realizará la actividad');
      return false;
    }
    
    if (!tipoVoluntariadoSelect.value) {
      alert('Por favor, selecciona un tipo de voluntariado');
      return false;
    }
    
    return true;
  }

  // Función para agregar una actividad a la tabla
  function agregarActividadATabla(actividad) {
    const row = document.createElement('tr');
    
    // Formatear la lista de voluntarios
    let listaVoluntarios = '<ul>';
    if (actividad.voluntarios && actividad.voluntarios.length > 0) {
      actividad.voluntarios.forEach(voluntario => {
        listaVoluntarios += `<li>${voluntario}</li>`;
      });
    } else {
      listaVoluntarios += '<li>No hay voluntarios inscritos aún</li>';
    }
    listaVoluntarios += '</ul>';
    
    row.innerHTML = `
      <td>
        <figure class="image is-64x64">
          <img src="${actividad.foto}" alt="${actividad.descripcion}">
        </figure>
      </td>
      <td>${actividad.descripcion}</td>
      <td>${actividad.fechas}</td>
      <td>${actividad.empresa}</td>
      <td>${actividad.lugar}</td>
      <td>${actividad.tipo}</td>
      <td>${actividad.ods}</td>
      <td>${listaVoluntarios}</td>
      <td>
        <div class="buttons">
          <a class="button is-small is-info">Editar</a>
          <a class="button is-small is-danger">Eliminar</a>
        </div>
      </td>
    `;
    
    // Agregar la fila a la tabla (al inicio)
    tablaEventos.insertBefore(row, tablaEventos.firstChild);
  }

  // Función para limpiar el formulario
  function resetForm() {
    fotoInput.value = '';
    descripcionInput.value = '';
    empresaInput.value = '';
    lugarInput.value = '';
    tipoVoluntariadoSelect.value = '';
    odsSelect.selectedIndex = -1;
    inputFecha.value = '';
    fechas = [];
    listaFechas.innerHTML = '';
    fechasSeleccionadas.value = '';
  }
  // Cerrar modal haciendo clic en el fondo
  modal.querySelector('.modal-background').addEventListener('click', () => {
    modal.classList.remove('is-active');
  });
});
