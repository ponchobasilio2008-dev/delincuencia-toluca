// --- DECLARACIÓN GLOBAL DE openNav y closeNav (FUERA DE DOMContentLoaded) ---
window.openNav = function() {
    // Abre el menú lateral desde la derecha
    document.getElementById("sidebar-menu").style.width = "250px"; 
};

function closeNav() {
    // Cierra el menú lateral
    document.getElementById("sidebar-menu").style.width = "0";
}


document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DATOS SIMULADOS NACIONALES PARA GRÁFICAS DE LÍNEA ---
    const labels = [
        'ene 15', 'jul 15', 'ene 16', 'jul 16', 'ene 17', 'jul 17', 'ene 18', 'jul 18', 
        'ene 19', 'jul 19', 'ene 20', 'jul 20', 'ene 21', 'jul 21', 'ene 22', 'jul 22', 
        'ene 23', 'jul 23', 'ene 24', 'jul 24', 'ene 25', 'ago 25'
    ];
    
    const dataHomicidioNacional = {
        inegi: [28, 30, 31, 33, 36, 38, 40, 41, 42, 40, 38, 36, 37, 35, 33, 32, 31, 30, 29, 28, 27, 26],
        sesnsp: [25, 28, 30, 32, 35, 37, 39, 40, 41, 39, 37, 35, 36, 34, 32, 31, 30, 29, 28, 27, 26, 25]
    };
    const dataSecuestro = { tasa: [1.8, 1.7, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.3, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1] };
    const dataExtorsion = { tasa: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.2] };

    // --- 2. DATOS POR ESTADO PARA EL MAPA HEXAGONAL (INTERACTIVO) ---
    const crimeData = {
        homicidio_int: {
            legend: ['1.8', '8.7', '15.5', '22.4', '29.3', '36.1', '43.0', '49.9', '56.7'],
            states: {
                BC: 22.4, SON: 36.1, SIN: 49.9, CHIH: 43.0, COAH: 15.5, ZAC: 29.3, NAY: 8.7, JAL: 29.3,
                GTO: 36.1, QRO: 1.8, MEX: 10.0, COL: 56.7, TAM: 22.4, VER: 15.5
            },
            maxRate: 56.7
        },
        robo_vehiculo: {
            legend: ['5.0', '15.0', '25.0', '35.0', '45.0', '50.0', '55.0', '60.0', '65.0'],
            states: {
                BC: 62.0, SON: 45.0, SIN: 35.0, CHIH: 25.0, COAH: 15.0, ZAC: 25.0, NAY: 10.0, JAL: 48.0,
                GTO: 55.0, QRO: 18.0, MEX: 65.0, COL: 30.0, TAM: 50.0, VER: 40.0
            },
            maxRate: 65.0
        },
        feminicidio: {
            legend: ['0.1', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0'],
            states: {
                BC: 1.5, SON: 2.0, SIN: 1.0, CHIH: 2.5, COAH: 0.5, ZAC: 1.5, NAY: 0.5, JAL: 1.0,
                GTO: 3.0, QRO: 0.1, MEX: 3.5, COL: 4.0, TAM: 3.0, VER: 2.5
            },
            maxRate: 4.0
        }
    };
    
    // Función central para cambiar el color del hexágono basado en la tasa (Escala de calor)
    function getHexColor(rate, maxRate) {
        const normalized = rate / maxRate;
        if (normalized < 0.1) return '#ffffff'; 
        if (normalized < 0.2) return '#fcd8d8';
        if (normalized < 0.4) return '#e8a9a9';
        if (normalized < 0.6) return '#e07d7d';
        if (normalized < 0.8) return '#cc4c4c';
        return '#cc0000'; 
    }

    // --- 3. LÓGICA DE ACTUALIZACIÓN DE MAPA HEXAGONAL ---
    const crimeSelector = document.getElementById('crime-type-selector');
    const hexElements = document.querySelectorAll('.hex');
    const legendSpans = document.querySelectorAll('.color-legend span');
    
    function updateHexMap(crimeType) {
        const data = crimeData[crimeType];
        
        if (!data) return;

        legendSpans.forEach((span, index) => {
            if (data.legend[index]) {
                span.textContent = data.legend[index];
            }
        });
        
        hexElements.forEach(hex => {
            const stateCode = hex.textContent.trim();
            const rate = data.states[stateCode];

            if (rate !== undefined) {
                hex.setAttribute('data-rate', rate);
                const bgColor = getHexColor(rate, data.maxRate);
                hex.style.backgroundColor = bgColor;
                
                const isLight = bgColor === '#ffffff' || bgColor === '#fcd8d8' || bgColor === '#e8a9a9';
                hex.style.color = isLight ? '#1c2732' : 'white';
                
                hex.setAttribute('title', `${stateCode}: ${rate} por 100k hab.`);
            }
        });
    }

    // A. Escuchar el cambio en el selector
    if (crimeSelector) {
        crimeSelector.addEventListener('change', (event) => {
            updateHexMap(event.target.value);
        });
        
        // Inicializar el mapa al cargar con la opción por defecto
        updateHexMap(crimeSelector.value);
    }

    // --- 4. CONFIGURACIÓN E INICIALIZACIÓN DE GRÁFICAS (Chart.js) ---
    const chartConfig = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false }
        },
        scales: {
            x: { 
                grid: { display: false },
                ticks: { maxRotation: 0, minRotation: 0, autoSkip: true, maxTicksLimit: 6 } 
            },
            y: { 
                beginAtZero: true,
                title: { display: true, text: 'tasa anualizada' }
            }
        },
        elements: {
            point: { radius: 0 } 
        }
    };
    
    // GRÁFICO PRINCIPAL DE HOMICIDIO
    if (document.getElementById('chartHomicidio')) {
        new Chart(document.getElementById('chartHomicidio').getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    { label: 'INEGI', data: dataHomicidioNacional.inegi, borderColor: '#cc0000', borderWidth: 2, tension: 0.4 },
                    { label: 'SESNSP', data: dataHomicidioNacional.sesnsp, borderColor: '#4A90E2', borderWidth: 2, tension: 0.4 }
                ]
            },
            options: {
                ...chartConfig,
                scales: { ...chartConfig.scales, y: { beginAtZero: false, min: 20 } } 
            }
        });
    }

    // GRÁFICO MINI: SECUESTRO
    if (document.getElementById('chartSecuestro')) {
        new Chart(document.getElementById('chartSecuestro').getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{ label: 'Secuestro', data: dataSecuestro.tasa, borderColor: '#4A90E2', borderWidth: 2, tension: 0.4, fill: false }]
            },
            options: chartConfig
        });
    }

    // GRÁFICO MINI: EXTORSIÓN
    if (document.getElementById('chartExtorsion')) {
        new Chart(document.getElementById('chartExtorsion').getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{ label: 'Extorsión', data: dataExtorsion.tasa, borderColor: '#cc0000', borderWidth: 2, tension: 0.4, fill: false }]
            },
            options: chartConfig
        });
    }

    // --- 5. LÓGICA DEL MENÚ HAMBURGUESA ---
    // Asociar el botón de cerrar al script
    const closeBtn = document.querySelector('.sidebar .closebtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNav);
    }
});