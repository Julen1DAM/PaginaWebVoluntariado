document.addEventListener('DOMContentLoaded', () => {
    // Menú hamburguesa
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (navbarBurger && navbarMenu) {
        navbarBurger.addEventListener('click', () => {
            navbarBurger.classList.toggle('is-active');
            navbarMenu.classList.toggle('is-active');
        });
    }

    // Manejo de modales
    const modals = {
        nueva: {
            open: document.getElementById('btnNuevaActividad'),
            close: document.querySelectorAll('#modalActividad .delete, #modalActividad .cancel'),
            modal: document.getElementById('modalActividad')
        },
        detalles: {
            open: document.querySelectorAll('.btn-info'),
            close: document.querySelectorAll('#modalDetallesActividad .delete, #modalDetallesActividad .cancel'),
            modal: document.getElementById('modalDetallesActividad')
        }
    };

    // Funcionalidad para abrir/cerrar modales
    Object.entries(modals).forEach(([key, modalConfig]) => {
        // Abrir modal
        if (modalConfig.open) {
            if (modalConfig.open instanceof Element) {
                modalConfig.open.addEventListener('click', () => {
                    modalConfig.modal.classList.add('is-active');
                });
            } else if (modalConfig.open instanceof NodeList) {
                modalConfig.open.forEach(btn => {
                    btn.addEventListener('click', () => {
                        modalConfig.modal.classList.add('is-active');
                    });
                });
            }
        }

        // Cerrar modal
        if (modalConfig.close) {
            modalConfig.close.forEach(btn => {
                btn.addEventListener('click', () => {
                    modalConfig.modal.classList.remove('is-active');
                });
            });
        }
    });

    // Cerrar menú al hacer clic en enlaces móviles
    document.querySelectorAll('.navbar-item').forEach(item => {
        item.addEventListener('click', () => {
            if (navbarBurger && navbarMenu) {
                navbarBurger.classList.remove('is-active');
                navbarMenu.classList.remove('is-active');
            }
        });
    });
});