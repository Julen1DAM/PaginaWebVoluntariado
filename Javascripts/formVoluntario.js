    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('fotoPerfil').addEventListener('change', function (event) {
            const fileName = event.target.files[0]?.name || 'No se seleccionó ningún archivo';
            document.getElementById('fileName').textContent = fileName;
        });
        const radios = document.getElementsByName('answer');
        radios.forEach(radio => {
            radio.addEventListener('change', toggleVoluntariadoFields);
        });
    });

    function toggleVoluntariadoFields() {
        const fields = document.getElementById('voluntariadoFields');
        const radios = document.getElementsByName('answer');
        fields.style.display = radios[0].checked ? 'block' : 'none';
    }