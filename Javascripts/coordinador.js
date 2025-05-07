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

// Editar/Eliminar filas
  const filas = document.querySelectorAll("table tbody tr");
  filas.forEach(row => {
    const editarBtn = row.querySelector(".button.is-info");
    const eliminarBtn = row.querySelector(".button.is-danger");
    
    if(eliminarBtn) {
      eliminarBtn.addEventListener("click", () => {
        row.remove();
      });
    }
    
    if(editarBtn) {
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
  });
// Filtrado de voluntarios
  const filterForm = document.querySelector('.filtroForm');
  if (!filterForm) return;

  const filterButton = filterForm.querySelector('button[type="button"]');
  const tagsContainer = document.querySelector('#voluntarios .tags');
  const volunteerTable = document.querySelector('#voluntarios table tbody');
  
  if (!volunteerTable) return;
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

  function aplicarFiltros() {
    const nombreFilter = filterForm.querySelector('input[name="nombre"]').value.toLowerCase();
    const disponibilidadFilter = Array.from(filterForm.querySelector('select[name="disponibilidad[]"]').selectedOptions).map(opt => opt.value);
    const horasMinFilter = parseInt(filterForm.querySelector('input[name="horas_min"]').value) || 0;
    const voluntariadoFilter = filterForm.querySelector('select[name="voluntariado"]').value;
    const cursoFilter = filterForm.querySelector('select[name="curso"]').value;
    
    if(tagsContainer) tagsContainer.innerHTML = '';
    
    if (nombreFilter) {
      anadirTag('Nombre', nombreFilter);
    }
    if (disponibilidadFilter.length > 0) {
      anadirTag('Disponibilidad', disponibilidadFilter.join(', '));
    }
    if (horasMinFilter > 0) {
      anadirTag('Horas mínimas', horasMinFilter);
    }
    if (voluntariadoFilter) {
      anadirTag('Voluntariado', voluntariadoFilter);
    }
    if (cursoFilter) {
      anadirTag('Curso', cursoFilter);
    }
    
    volunteersData.forEach(volunteer => {
      let matches = true;
      
      if (nombreFilter && !volunteer.nombre.toLowerCase().includes(nombreFilter)) {
        matches = false;
      }
      
      if (disponibilidadFilter.length > 0 && 
          !disponibilidadFilter.some(day => volunteer.disponibilidad.includes(day))) {
        matches = false;
      }
      
      if (horasMinFilter > 0 && volunteer.horas < horasMinFilter) {
        matches = false;
      }
      
      if (voluntariadoFilter && !volunteer.voluntariados.includes(voluntariadoFilter)) {
        matches = false;
      }
      
      if (cursoFilter && volunteer.curso !== cursoFilter) {
        matches = false;
      }
      
      volunteer.element.style.display = matches ? '' : 'none';
      volunteer.visible = matches;
    });
  }
  
  function anadirTag(label, value) {
    if(!tagsContainer) return;
    
    const tag = document.createElement('span');
    tag.className = 'tag is-info';
    tag.innerHTML = `${label}: ${value} <button class="delete is-small"></button>`;
    
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
      
      aplicarFiltros();
    });
    
    tagsContainer.appendChild(tag);
  }
  
  if(filterButton) {
    filterButton.addEventListener('click', aplicarFiltros);
  }
  
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('clear-filters')) {
      filterForm.reset();
      aplicarFiltros();
    }
  });
// Modal Actividades
  const modal = document.getElementById('modalActividad');
  if (!modal) return;

  const btnAbrir = document.getElementById('btnAñadirActividad');
  const btnCerrar = document.getElementById('cerrarModal');
  const btnCancelar = document.getElementById('cancelarActividad');
  const btnGuardar = document.getElementById('guardarActividad');
  
  const fotoInput = document.getElementById('fotoActividad');
  const descripcionInput = document.getElementById('descripcionActividad');
  const fechasHorariosInput = document.getElementById('fechasHorarios');
  const empresaInput = document.getElementById('empresaActividad');
  const lugarInput = document.getElementById('lugarActividad');
  const tipoVoluntariadoSelect = document.getElementById('tipoVoluntariado');
  const odsSelect = document.getElementById('odsActividad');
  
  const tablaEventos = document.getElementById('lista-eventos');

  if(btnAbrir) {
    btnAbrir.addEventListener('click', () => {
      resetForm();
      modal.classList.add('is-active');
    });
  }

  const cerrarModal = () => modal.classList.remove('is-active');
  if(btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
  if(btnCancelar) btnCancelar.addEventListener('click', cerrarModal);

  if(btnGuardar) {
    btnGuardar.addEventListener('click', () => {
      if (!validarFormulario()) return;
      
      const nuevaActividad = {
        foto: fotoInput.value || './Imagenes/voluntariado.png',
        descripcion: descripcionInput.value,
        fechas: fechasHorariosInput.value,
        empresa: empresaInput.value,
        lugar: lugarInput.value,
        tipo: tipoVoluntariadoSelect.value,
        ods: Array.from(odsSelect.selectedOptions).map(option => option.value).join(', '),
        voluntarios: [],
        estado: 'Activa'
      };
      
      if(tablaEventos) agregarActividadATabla(nuevaActividad);
      cerrarModal();
      resetForm();
    });
  }

  function validarFormulario() {
    // 2. Validación de campos obligatorios
    const camposRequeridos = [
      { elemento: fotoInput, mensaje: "URL de la foto es requerida" },
      { elemento: fechasHorariosInput, mensaje: "Fechas y horarios son requeridos" },
      { elemento: descripcionInput, mensaje: "Descripción es requerida" },
      { elemento: empresaInput, mensaje: "Empresa/Organización es requerida" },
      { elemento: lugarInput, mensaje: "Lugar es requerido" }
    ];
  
    for (const campo of camposRequeridos) {
      if (campo.elemento.value.trim() === "") {
        alert(campo.mensaje);
        campo.elemento.focus();
        return false;
      }
    }
  
    // 3. Validación tipo de voluntariado
    if (tipoVoluntariadoSelect.value === "") {
      alert("Selecciona un tipo de voluntariado");
      tipoVoluntariadoSelect.focus();
      return false;
    }
  
    // 4. Validación ODS (mínimo 1 seleccionado)
    if (odsSelect.selectedOptions.length === 0) {
      alert("Debes seleccionar al menos un ODS");
      odsSelect.focus();
      return false;
    }
  
    return true; // Si pasa todas las validaciones
  }
  function agregarActividadATabla(actividad) {
    const row = document.createElement('tr');
    
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
      <td style="white-space: pre-wrap">${actividad.fechas}</td>
      <td>${actividad.empresa}</td>
      <td>${actividad.lugar}</td>
      <td>${actividad.tipo}</td>
      <td>${actividad.ods}</td>
      <td><span class="tag is-succes">${actividad.estado}</span></td>
      <td>${listaVoluntarios}</td>
      <td>
        <div class="buttons">
          <a class="button is-small is-info">Editar</a>
          <a class="button is-small is-danger">Eliminar</a>
        </div>
      </td>
    `;
    
    if(tablaEventos) tablaEventos.insertBefore(row, tablaEventos.firstChild);
  }

  function resetForm() {
    if(fotoInput) fotoInput.value = '';
    if(descripcionInput) descripcionInput.value = '';
    if(empresaInput) empresaInput.value = '';
    if(lugarInput) lugarInput.value = '';
    if(tipoVoluntariadoSelect) tipoVoluntariadoSelect.value = '';
    if(odsSelect) odsSelect.selectedIndex = -1;
    if(fechasHorariosInput) fechasHorariosInput.value = '';
  }

  modal.querySelector('.modal-background').addEventListener('click', cerrarModal);

// Historial Voluntarios
  document.querySelectorAll('.btn-historial').forEach(btn => {
    btn.addEventListener('click', function() {
      const nombreVoluntario = this.getAttribute('data-voluntario');
      const nombreVoluntarioElement = document.getElementById('nombreVoluntarioHistorial');
      if(nombreVoluntarioElement) nombreVoluntarioElement.textContent = `Historial de ${nombreVoluntario}`;
      
      const datosHistorial = {
        "Juan Pérez": [
          { actividad: "Recolección de alimentos", fecha: "2023-10-15", organizacion: "Banco de Alimentos", horas: 4, estado: "Completado" },
          { actividad: "Taller educativo", fecha: "2023-09-20", organizacion: "Escuela Primaria", horas: 3, estado: "Completado" },
          { actividad: "Limpieza de parque", fecha: "2023-11-05", organizacion: "Ayuntamiento", horas: 5, estado: "Completado" }
        ],
        "María Gómez": [
          { actividad: "Apoyo escolar", fecha: "2023-10-10", organizacion: "Centro Comunitario", horas: 6, estado: "Completado" },
          { actividad: "Evento benéfico", fecha: "2023-11-15", organizacion: "Cruz Roja", horas: 8, estado: "Completado" }
        ]
      };

      const tabla = document.getElementById('tablaHistorial');
      if(tabla) tabla.innerHTML = '';
      
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
          if(tabla) tabla.appendChild(fila);
        });
      } else if(tabla) {
        tabla.innerHTML = '<tr><td colspan="5" class="has-text-centered">No hay actividades registradas</td></tr>';
      }

      const modalHistorial = document.getElementById('modalHistorial');
      if(modalHistorial) modalHistorial.classList.add('is-active');
    });
  });

  const cerrarModalHistorial = () => {
    const modalHistorial = document.getElementById('modalHistorial');
    if(modalHistorial) modalHistorial.classList.remove('is-active');
  }
  
  const cerrarBtn1 = document.getElementById('cerrarModalHistorial');
  const cerrarBtn2 = document.getElementById('cerrarModalHistorialBtn');
  if(cerrarBtn1) cerrarBtn1.addEventListener('click', cerrarModalHistorial);
  if(cerrarBtn2) cerrarBtn2.addEventListener('click', cerrarModalHistorial);
// Modal Organización
  const modalOrg = document.getElementById('modal-org');
  if (!modalOrg) return;

  const abrirBtn = document.getElementById('abrirModalOrg');
  if(abrirBtn) {
    abrirBtn.addEventListener('click', () => {
      modalOrg.classList.add('is-active');
    });
  }

  modalOrg.querySelectorAll('.delete, .button.is-light').forEach(btn => {
    btn.addEventListener('click', () => {
      modalOrg.classList.remove('is-active');
    });
  });

  const formOrg = modalOrg.querySelector('form');
  if(formOrg) {
    formOrg.addEventListener('submit', (e) => {
      e.preventDefault();
      modalOrg.classList.remove('is-active');
    });
  }
});