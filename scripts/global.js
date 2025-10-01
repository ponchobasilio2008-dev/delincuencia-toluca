// scripts/global.js

// --- DECLARACIÓN GLOBAL DE openNav y closeNav (Menú Hamburguesa) ---

// Estas funciones deben estar declaradas globalmente para el onclick en el HTML
window.openNav = function() {
    document.getElementById("sidebar-menu").style.width = "250px"; 
};

function closeNav() {
    document.getElementById("sidebar-menu").style.width = "0";
}

document.addEventListener('DOMContentLoaded', () => {
    // Asociar el botón de cerrar al script
    const closeBtn = document.querySelector('.sidebar .closebtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNav);
    }
});