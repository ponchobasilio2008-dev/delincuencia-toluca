// scripts/mapas.js

// --- DECLARACIÓN GLOBAL DE openNav y closeNav (desde global.js) ---
window.openNav = function() {
    document.getElementById("sidebar-menu").style.width = "250px"; 
};

function closeNav() {
    document.getElementById("sidebar-menu").style.width = "0";
}


document.addEventListener('DOMContentLoaded', () => {
    
    // Asocia el botón de cerrar al script al cargar (necesario para el sidebar)
    const closeBtn = document.querySelector('.sidebar .closebtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNav);
    }
    
    // --- FUNCIÓN CENTRAL DE INICIALIZACIÓN DE LEAFLET ---

    function initializeLeafletMap(containerId, initialCoords, initialZoom, pointsData) {
        if (!document.getElementById(containerId)) return;
        
        try {
            // 1. Inicializar el mapa
            const map = L.map(containerId).setView(initialCoords, initialZoom);

            // 2. Añadir capa de mosaico
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            // 3. Añadir puntos de interés (si existen)
            if (pointsData) {
                pointsData.forEach(punto => {
                    L.circle(punto.coords, {
                        color: punto.color,
                        fillColor: punto.color,
                        fillOpacity: 0.6,
                        radius: punto.cases * 0.5 
                    }).addTo(map).bindPopup(`
                        <b>${punto.name}</b><br>
                        Delito: Robo de Vehículo (Sim.)<br>
                        Casos (Trim.): <b>${punto.cases}</b>
                    `);
                });
                
                // Agregar marcador de referencia
                L.marker(initialCoords).bindPopup("<b>Toluca Centro (Referencia)</b>").addTo(map);
            }
            
            // 4. Invalidar el tamaño para asegurar que se dibuje correctamente
            map.invalidateSize(); 

        } catch (e) {
            console.error(`Error al inicializar el mapa ${containerId}: `, e);
            document.getElementById(containerId).innerHTML = '<p style="color:red; text-align:center;">Error al cargar el mapa. Verifique las librerías de Leaflet.</p>';
        }
    }

    // --- MAPA DE ESTADOS (estados.html) ---
    if (document.getElementById('mapa-estados')) {
        // (Tu lógica de mapa de estados, simplificada para usar la nueva función)
        const mexicoCoords = [23.6345, -102.5528]; 
        // Lógica de actualización de panel lateral (updateInfoPanel) necesaria para estados.html
        // ... (Tu código updateInfoPanel debe ir aquí si no está en global.js) ...
        initializeLeafletMap('mapa-estados', mexicoCoords, 5, null);
    }


    // --- MAPA DE MUNICIPIOS (municipios.html) ---
    if (document.getElementById('mapa-municipal')) {
        const tolucaCoords = [19.2907, -99.6537]; 
        const municipalZoom = 12; 

        // Puntos de incidencia específicos para ROBOS (usados en la tabla)
        const puntosRobo = [
            { name: 'Toluca Centro/Norte', coords: [19.305, -99.67], cases: 350, color: 'darkred' }, 
            { name: 'Toluca Sur/Salida', coords: [19.255, -99.65], cases: 500, color: 'darkred' }, 
            { name: 'Metepec (Av. Tecnológico)', coords: [19.28, -99.58], cases: 210, color: 'orange' },        
            { name: 'Zinacantepec Conurbado', coords: [19.33, -99.69], cases: 145, color: 'gold' }, 
            { name: 'Lerma Zonas Industriales', coords: [19.33, -99.51], cases: 110, color: 'yellowgreen' },
        ];

        initializeLeafletMap('mapa-municipal', tolucaCoords, municipalZoom, puntosRobo);

        // Remover el mensaje conceptual del HTML
        document.getElementById('mapa-municipal').innerHTML = '';
    }
});