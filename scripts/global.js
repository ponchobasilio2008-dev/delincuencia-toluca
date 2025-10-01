// scripts/global.js

// --- DECLARACIÓN GLOBAL DE openNav y closeNav (Menú Hamburguesa) ---

// Estas funciones deben estar declaradas globalmente (fuera de DOMContentLoaded)
// para que el onclick en el HTML las pueda encontrar inmediatamente.
window.openNav = function() {
    // Abre el menú lateral desde la derecha
    document.getElementById("sidebar-menu").style.width = "250px"; 
};

function closeNav() {
    // Cierra el menú lateral
    document.getElementById("sidebar-menu").style.width = "0";
}

document.addEventListener('DOMContentLoaded', () => {
    // Asociar el botón de cerrar al script
    const closeBtn = document.querySelector('.sidebar .closebtn');
    if (closeBtn) {
        // Asegura que el botón de cerrar funciona al cargar
        // Usamos el evento click, aunque el HTML ya tiene el onclick. Esto es un fallback seguro.
        closeBtn.addEventListener('click', closeNav);
    }
});