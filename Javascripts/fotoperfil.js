document.getElementById('fotoPerfil').addEventListener('change', function(event) {
    const fileName = event.target.files[0]?.name || 'No se seleccionó ningún archivo';
    document.getElementById('fileName').textContent = fileName;
});