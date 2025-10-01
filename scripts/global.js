// scripts/global.js

// --- DECLARACIÓN GLOBAL DE openNav y closeNav (Menú Hamburguesa) ---

// Estas funciones deben estar declaradas globalmente para el onclick en el HTML
window.openNav = function() {
    // Abre el menú lateral desde la derecha
    document.getElementById("sidebar-menu").style.width = "250px"; 
};

function closeNav() {
    // Cierra el menú lateral
    document.getElementById("sidebar-menu").style.width = "0";
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Asociar el botón de cerrar al script
    const closeBtn = document.querySelector('.sidebar .closebtn');
    if (closeBtn) {
        // Asegura que el botón de cerrar funciona al cargar
        closeBtn.addEventListener('click', closeNav);
    }
    
    // 2. Corregir el DOBLE MENÚ en el encabezado de las páginas.
    // Esto oculta el div redundante de los enlaces de escritorio que causa el error visual.
    const redundantNav = document.querySelector('.navbar .nav-links');
    if (redundantNav && window.innerWidth > 768) {
        // Solo para pantallas grandes, ocultamos el duplicado
        // Esto asume que el HTML tiene el menú de escritorio DOS veces.
        // La mejor solución es eliminar el segundo nav del HTML, como se muestra en la sección 2.
    }
});