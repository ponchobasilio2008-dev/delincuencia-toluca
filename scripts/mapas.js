// scripts/mapas.js

// --- DECLARACIÓN GLOBAL DE openNav y closeNav (Menú Hamburguesa) ---
window.openNav = function() {
    document.getElementById("sidebar-menu").style.width = "250px"; 
};

function closeNav() {
    document.getElementById("sidebar-menu").style.width = "0";
}


document.addEventListener('DOMContentLoaded', () => {
    
    // Asocia el botón de cerrar al script al cargar
    const closeBtn = document.querySelector('.sidebar .closebtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNav);
    }
    
    
    // --- 1. Lógica de Mapa de Estados (PÁGINA estados.html) ---

    if (document.getElementById('mapa-estados')) {
        const mexicoCoords = [23.6345, -102.5528]; 
        const initialZoom = 5;

        const map = L.map('mapa-estados').setView(mexicoCoords, initialZoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const puntosInteres = [
            { name: "CDMX", coords: [19.4326, -99.1332], hom: 22.1, rob: 40.5, esc: 11.2 },
            { name: "ESTADO DE MÉXICO", coords: [19.2907, -99.6537], hom: 18.5, rob: 45.6, esc: 9.8 },
            { name: "JALISCO", coords: [20.6597, -103.3496], hom: 33.0, rob: 22.4, esc: 10.5 },
            { name: "NUEVO LEÓN", coords: [25.6866, -100.3161], hom: 12.3, rob: 15.0, esc: 10.9 },
        ];
        
        puntosInteres.forEach(punto => {
            L.marker(punto.coords).addTo(map)
                .bindPopup(`<b>${punto.name}</b><br>Haz clic en el mapa para simular la consulta.`)
                .on('click', () => updateInfoPanel(punto.name, punto.hom, punto.rob, punto.esc));
        });

        map.on('click', function(e) {
            const lat = e.latlng.lat.toFixed(4);
            const lng = e.latlng.lng.toFixed(4);
            
            updateInfoPanel("Área Geográfica Seleccionada", ((Math.random() * 50) + 5).toFixed(2), ((Math.random() * 30) + 10).toFixed(1), ((Math.random() * 3) + 9).toFixed(1));
            
            L.popup()
                .setLatLng(e.latlng)
                .setContent(`Ubicación: (${lat}, ${lng})`)
                .openOn(map);
        });
        
        function updateInfoPanel(stateName, homRate, robRate, escYears) {
            const randomPopulation = Math.floor(Math.random() * 5000000) + 1000000;
            
            document.getElementById('estado-seleccionado').innerHTML = `
                <h4>${stateName}</h4>
                <p><strong>Población 2020:</strong> ${randomPopulation.toLocaleString()} personas</p>
                <p><strong>Escolaridad Promedio:</strong> ${escYears} años</p>
                <p style="color: #cc0000;"><strong>Homicidio Intencional:</strong> ${homRate} por 100k hab.</p>
                <p><strong>Robo de Vehículo:</strong> ${robRate} por 100k hab.</p>
                <p class="source-note"><a href="https://www.inegi.org.mx/" target="_blank">Ver más indicadores sociodemográficos</a></p>
            `;
        }
        
        // Inicializar el panel con los datos de EDOMEX al cargar
        updateInfoPanel(puntosInteres[1].name, puntosInteres[1].hom, puntosInteres[1].rob, puntosInteres[1].esc);
    }

    // --- 2. Lógica de Mapa Municipal (PÁGINA municipios.html) ---

    if (document.getElementById('mapa-municipal')) {
        const tolucaCoords = [19.2907, -99.6537]; 
        const municipalZoom = 12; // Zoom ajustado para el Valle de Toluca

        const map = L.map('mapa-municipal').setView(tolucaCoords, municipalZoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Puntos de incidencia específicos para ROBOS (basados en las cifras de la tabla)
        const puntosRobo = [
            // Toluca (Zona de mayor robo de vehículo) - 850 casos
            { name: 'Toluca Centro/Norte', coords: [19.305, -99.67], cases: 350, color: 'darkred' }, 
            { name: 'Toluca Sur/Salida', coords: [19.255, -99.65], cases: 500, color: 'darkred' }, 
            
            // Metepec (Segundo más alto) - 210 casos
            { name: 'Metepec (Av. Tecnológico)', coords: [19.28, -99.58], cases: 210, color: 'orange' },        
            
            // Zinacantepec - 145 casos
            { name: 'Zinacantepec Conurbado', coords: [19.33, -99.69], cases: 145, color: 'gold' }, 
            
            // Lerma - 110 casos
            { name: 'Lerma Zonas Industriales', coords: [19.33, -99.51], cases: 110, color: 'yellowgreen' },
        ];

        puntosRobo.forEach(punto => {
            // Usamos un círculo con un radio proporcional al número de casos
            L.circle(punto.coords, {
                color: punto.color,
                fillColor: punto.color,
                fillOpacity: 0.6,
                radius: punto.cases * 0.5 // Ajuste para que el tamaño sea visible
            }).addTo(map).bindPopup(`
                <b>${punto.name}</b><br>
                Delito: Robo de Vehículo (Sim.)<br>
                Casos (Trim.): <b>${punto.cases}</b>
            `);
        });
        
        // Agregar un marcador de referencia para la capital
        L.marker(tolucaCoords).bindPopup("<b>Toluca Centro (Referencia)</b>").addTo(map);

        // Remover el mensaje conceptual del HTML una vez que el mapa carga
        document.getElementById('mapa-municipal').innerHTML = '';
    }
});