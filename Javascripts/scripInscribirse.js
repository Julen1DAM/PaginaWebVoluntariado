document.addEventListener('DOMContentLoaded', () => {
const btn1 = document.getElementById('btn1')
function inscribirse(nombreVoluntariado) {
  if (btn1.classList.contains('is-danger')) {
    // Ya está inscrito, desapuntar
    btn1.classList.remove('is-danger');
    btn1.textContent = 'Inscribirse';
    alert("Te has desapuntado de: " + nombreVoluntariado);
  } else {
    // Apuntarse
    btn1.classList.add('is-danger');
    btn1.textContent = 'Desapuntarse';
    alert("Te has inscrito en: " + nombreVoluntariado);
  }
}

btn1.addEventListener('onclick', inscribirse)
})