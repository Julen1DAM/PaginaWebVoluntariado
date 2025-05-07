document.addEventListener('DOMContentLoaded', () => {
    const modalToggle = document.getElementById('modal-org-toggle');
    const modal = document.getElementById('modal-org');

    modalToggle.addEventListener('change', () => {
      if (modalToggle.checked) {
        modal.classList.add('is-active');
      } else {
        modal.classList.remove('is-active');
      }
    });
  });