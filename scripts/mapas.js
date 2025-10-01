// scripts/mapas.js

// Las funciones openNav y closeNav deben estar definidas en global.js
// No las definimos aquí para evitar conflictos, asumimos que GLOBAL.JS se carga.

document.addEventListener('DOMContentLoaded', () => {
    
    // Asocia el botón de cerrar al script al cargar (necesario para el sidebar)
    const closeBtn = document.querySelector('.sidebar .closebtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNav);
    }
    
    
    // --- 1. Lógica de Mapa de Estados (PÁGINA estados.html) ---

    if (document.getElementById('mapa-estados')) {
        // ... (Tu código para el mapa de Estados, el panel de info, y la inicialización de Leaflet va aquí.
        // Lo omito por brevedad, pero asume que es el código grande y correcto).
        // INICIALIZACIÓN DEL MAPA DE ESTADOS...
        const mexicoCoords = [23.6345, -102.5528]; 
        const initialZoom = 5;

        const map = L.map('mapa-estados').setView(mexicoCoords, initialZoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        // ... (resto de la lógica del mapa de estados)
    }

    // --- 2. Lógica de Mapa Municipal (PÁGINA municipios.html) ---

    if (document.getElementById('mapa-municipal')) {
        const tolucaCoords = [19.2907, -99.6537]; 
        const municipalZoom = 12; 

        const map = L.map('mapa-municipal').setView(tolucaCoords, municipalZoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Puntos de incidencia específicos para ROBOS
        const puntosRobo = [
            { name: 'Toluca Centro/Norte', coords: [19.305, -99.67], cases: 350, color: 'darkred' }, 
            { name: 'Toluca Sur/Salida', coords: [19.255, -99.65], cases: 500, color: 'darkred' }, 
            { name: 'Metepec (Av. Tecnológico)', coords: [19.28, -99.58], cases: 210, color: 'orange' },        
            { name: 'Zinacantepec Conurbado', coords: [19.33, -99.69], cases: 145, color: 'gold' }, 
            { name: 'Lerma Zonas Industriales', coords: [19.33, -99.51], cases: 110, color: 'yellowgreen' },
        ];

        puntosRobo.forEach(punto => {
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
        
        L.marker(tolucaCoords).bindPopup("<b>Toluca Centro (Referencia)</b>").addTo(map);

        // Remover el mensaje conceptual del HTML una vez que el mapa carga
        document.getElementById('mapa-municipal').innerHTML = '';
    }
});