document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Inicialización de Gráficos (Movida de main.js) ---
    // El código original de Chart.js para index.html (Homicidio, Secuestro, Extorsión)
    // Debe copiarse aquí si quieres mantener esas gráficas. Por brevedad, se omite
    // pero recuerda mover toda esa lógica de Chart.js aquí para que index.html funcione.

    
    // --- 2. Lógica de Mapa Interactivo (INEGI Style) ---

    if (document.getElementById('mapa-estados')) {
        // Mapa de Estados: Se inicializa solo si el contenedor existe en la página
        
        // Coordenadas iniciales centradas en México
        const mexicoCoords = [23.6345, -102.5528]; 
        const initialZoom = 5;

        // Inicializar el mapa
        const map = L.map('mapa-estados').setView(mexicoCoords, initialZoom);

        // Añadir una capa de mosaico (Tiles)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Ejemplo simple: Coordenadas del Estado de México (punto de interés)
        const edomexCoords = [19.3907, -99.2837]; 
        
        // Agregar un marcador inicial
        const marker = L.marker(edomexCoords).addTo(map)
            .bindPopup("<b>Estado de México</b><br>Haz clic en el mapa para simular la consulta.").openPopup();

        // Función para simular la consulta de indicadores al hacer clic en el mapa
        map.on('click', function(e) {
            const lat = e.latlng.lat.toFixed(4);
            const lng = e.latlng.lng.toFixed(4);
            
            // Simular datos sociodemográficos para el área seleccionada
            const randomPopulation = Math.floor(Math.random() * 5000000) + 100000;
            const stateName = (lat > 20) ? "Jalisco/Nayarit" : "Edomex/Toluca";
            
            document.getElementById('estado-seleccionado').innerHTML = `
                <h4>${stateName} (Simulación)</h4>
                <p><strong>Población Total:</strong> ${randomPopulation.toLocaleString()} personas</p>
                <p><strong>Escolaridad Promedio:</strong> ${((Math.random() * 3) + 9).toFixed(1)} años</p>
                <p><strong>Incidencia Homicidio:</strong> ${((Math.random() * 50) + 5).toFixed(2)} por 100k hab.</p>
                <p class="source-note">Información sociodemográfica simulada tipo INEGI.</p>
            `;
            
            L.popup()
                .setLatLng(e.latlng)
                .setContent(`Ubicación seleccionada: (${lat}, ${lng})`)
                .openOn(map);
        });
        
    }

    // --- 3. Lógica de Mapa Municipal (simulada) ---
    // Si tienes un mapa municipal (en municipios.html), aquí puedes inicializarlo,
    // pero usaremos el mismo contenedor de mapa para simplificar.
});