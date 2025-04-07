document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    console.log('validador listo')
    form.addEventListener('submit', (e) => {
        console.log('validador listo')
      const foto = form.foto;
      const fecha = form.fecha;
      const empresa = form.empresa;
      const lugar = form.lugar;
      const descripcion = form.descripcion;
      const tipo = form.tipo_voluntariado;

      // Validar foto
      if (!foto.value.trim()) {
        e.preventDefault();
        alert("Por favor ingresa la URL de la foto.");
        foto.focus();
        return;
      }
      const fechaIngresada = new Date(fecha.value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0); // Eliminar hora para comparar solo la fecha

      if (!fecha.value || fechaIngresada <= hoy) {
        e.preventDefault();
        alert("La fecha debe ser posterior a hoy.");
        fecha.focus();
        return;
      }

      // Validar empresa
      if (!empresa.value.trim()) {
        e.preventDefault();
        alert("Por favor ingresa el nombre de la empresa.");
        empresa.focus();
        return;
      }

      // Validar lugar
      if (!lugar.value.trim()) {
        e.preventDefault();
        alert("Por favor ingresa el lugar del evento.");
        lugar.focus();
        return;
      }

      // Validar descripción
      if (!descripcion.value.trim()) {
        e.preventDefault();
        alert("Por favor ingresa una descripción del evento.");
        descripcion.focus();
        return;
      }

      // Validar tipo de voluntariado
      if (!tipo.value) {
        e.preventDefault();
        alert("Por favor selecciona un tipo de voluntariado.");
        tipo.focus();
        return;
      }

      // Si todo está bien, el formulario se envía normalmente
    });
  });