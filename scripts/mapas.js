
window.openNav = function() {
    document.getElementById("sidebar-menu").style.width = "250px"; 
};

function closeNav() {
    document.getElementById("sidebar-menu").style.width = "0";
}


document.addEventListener('DOMContentLoaded', () => {
    
    const closeBtn = document.querySelector('.sidebar .closebtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNav);
    }
    

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
        
        updateInfoPanel(puntosInteres[1].name, puntosInteres[1].hom, puntosInteres[1].rob, puntosInteres[1].esc);
    }


    if (document.getElementById('chartMunicipalRobo')) {
        
        const ctx = document.getElementById('chartMunicipalRobo').getContext('2d');
        
        const municipalData = {
            municipios: ['Toluca', 'Metepec', 'Zinacantepec', 'Lerma'],
            casos: [850, 210, 145, 110] 
        };

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: municipalData.municipios,
                datasets: [{
                    label: 'Denuncias de Robo de Vehículo (Trimestrales)',
                    data: municipalData.casos,
                    backgroundColor: [
                        '#cc0000', // Rojo para Toluca (el más alto)
                        '#ff7f00', 
                        '#ffb84d', 
                        '#ffdb99'
                    ],
                    borderColor: [
                        '#990000',
                        '#cc6600',
                        '#cc933d',
                        '#ccb06a'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, 
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Concentración de Robo de Vehículo en el Valle de Toluca'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de Casos Reportados'
                        }
                    }
                }
            }
        });
    }
});