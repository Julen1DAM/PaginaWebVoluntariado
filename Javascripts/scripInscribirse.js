const btn = document.getElementById("btnInscribirse");
document.addEventListener('DOMContentLoaded', () => {
  const inscribirseBtns = document.querySelectorAll('.inscribirse-btn');
  inscribirseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.textContent === "Inscribirse") {
        alert("Te has inscrito.");
        btn.textContent = "Desapuntarse";
        btn.classList.add("apuntado");
      } else {
        alert("Te has desapuntado.");
        btn.textContent = "Inscribirse";
        btn.classList.remove("apuntado");
      }
    });
  });
});