document.addEventListener('DOMContentLoaded', () => {
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
  const filas = document.querySelectorAll("table tbody tr");
  filas.forEach(row => {
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


document.addEventListener('DOMContentLoaded', function() {
  const filterForm = document.querySelector('.filtroForm');
  const filterButton = filterForm.querySelector('button[type="button"]');
  const tagsContainer = document.querySelector('#voluntarios .tags');
  const volunteerTable = document.querySelector('#voluntarios table tbody');
  const originalVolunteers = Array.from(volunteerTable.querySelectorAll('tr'));

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
      voluntarios: [],// Inicialmente sin voluntarios
      estado: 'Pendiente' // Estado inicial de la actividad
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
       <td><td>
        <span class="tag is-warning">${actividad.estado}</span>
      </td></td>
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
  // Abrir modal de historial
  document.querySelectorAll('.btn-historial').forEach(btn => {
    btn.addEventListener('click', function() {
      const nombreVoluntario = this.getAttribute('data-voluntario');
      document.getElementById('nombreVoluntarioHistorial').textContent = `Historial de ${nombreVoluntario}`;
      
      // Aquí podrías hacer una llamada AJAX para obtener los datos reales del historial
      // Por ahora usaremos datos de ejemplo
      const datosHistorial = {
        "Juan Pérez": [
          { actividad: "Recolección de alimentos", fecha: "2023-10-15", organizacion: "Banco de Alimentos", horas: 4, estado: "Completado" },
          { actividad: "Taller educativo", fecha: "2023-09-20", organizacion: "Escuela Primaria", horas: 3, estado: "Completado" },
          { actividad: "Limpieza de parque", fecha: "2023-11-05", organizacion: "Ayuntamiento", horas: 5, estado: "Completado" }
        ],
        "María Gómez": [
          { actividad: "Apoyo escolar", fecha: "2023-10-10", organizacion: "Centro Comunitario", horas: 6, estado: "Completado" },
          { actividad: "Evento benéfico", fecha: "2023-11-15", organizacion: "Cruz Roja", horas: 8, estado: "Completado" }
        ],
        // Agrega más datos según sea necesario
      };

      const tabla = document.getElementById('tablaHistorial');
      tabla.innerHTML = ''; // Limpiar tabla
      
      if (datosHistorial[nombreVoluntario]) {
        datosHistorial[nombreVoluntario].forEach(item => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
            <td>${item.actividad}</td>
            <td>${item.fecha}</td>
            <td>${item.organizacion}</td>
            <td>${item.horas}</td>
            <td><span class="tag is-success">${item.estado}</span></td>
          `;
          tabla.appendChild(fila);
        });
      } else {
        tabla.innerHTML = '<tr><td colspan="5" class="has-text-centered">No hay actividades registradas</td></tr>';
      }

      document.getElementById('modalHistorial').classList.add('is-active');
    });
  });

  // Cerrar modal de historial
  document.getElementById('cerrarModalHistorial').addEventListener('click', cerrarModalHistorial);
  document.getElementById('cerrarModalHistorialBtn').addEventListener('click', cerrarModalHistorial);
  
  function cerrarModalHistorial() {
    document.getElementById('modalHistorial').classList.remove('is-active');
  }
