document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DATOS SIMULADOS NACIONALES PARA GRÁFICAS DE LÍNEA ---
    // (Estos datos son fijos para Homicidio/Secuestro/Extorsión)
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

    // --- 2. DATOS POR ESTADO PARA EL MAPA HEXAGONAL ---
    // Tasas por 100 mil habitantes, simulando 3 delitos diferentes.
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
    
    // Función central para cambiar el color del hexágono basado en la tasa
    function getHexColor(rate, maxRate) {
        // Mapea la tasa a un color en la escala de calor (de blanco/gris a rojo)
        const normalized = rate / maxRate;
        
        if (normalized < 0.1) return '#ffffff'; // Tasa muy baja
        if (normalized < 0.2) return '#fcd8d8';
        if (normalized < 0.4) return '#e8a9a9';
        if (normalized < 0.6) return '#e07d7d';
        if (normalized < 0.8) return '#cc4c4c';
        return '#cc0000'; // Tasa muy alta (rojo)
    }

    // --- 3. LÓGICA DE ACTUALIZACIÓN DE MAPA HEXAGONAL ---
    const crimeSelector = document.getElementById('crime-type-selector');
    const hexElements = document.querySelectorAll('.hex');
    const legendSpans = document.querySelectorAll('.color-legend span');
    
    function updateHexMap(crimeType) {
        const data = crimeData[crimeType];
        
        if (!data) return;

        // A. Actualizar la Leyenda de Colores
        legendSpans.forEach((span, index) => {
            if (data.legend[index]) {
                span.textContent = data.legend[index];
            }
        });
        
        // B. Actualizar las Tasas y Colores de los Hexágonos
        hexElements.forEach(hex => {
            const stateCode = hex.textContent.trim();
            const rate = data.states[stateCode];

            if (rate !== undefined) {
                // 1. Actualizar el atributo data-rate
                hex.setAttribute('data-rate', rate);
                
                // 2. Aplicar el color de fondo dinámico
                hex.style.backgroundColor = getHexColor(rate, data.maxRate);
                
                // 3. Cambiar el color del texto si es necesario (para contraste)
                hex.style.color = (getHexColor(rate, data.maxRate) === '#ffffff' || getHexColor(rate, data.maxRate) === '#fcd8d8') ? '#1c2732' : 'white';
                
                // 4. Actualizar el tooltip (title)
                hex.setAttribute('title', `${stateCode}: ${rate} por 100k hab.`);
            }
        });
    }

    // C. Escuchar el cambio en el selector
    if (crimeSelector) {
        crimeSelector.addEventListener('change', (event) => {
            updateHexMap(event.target.value);
        });
        
        // Inicializar el mapa al cargar con la opción por defecto
        updateHexMap(crimeSelector.value);
    }

    // --- 4. CONFIGURACIÓN E INICIALIZACIÓN DE GRÁFICAS (Chart.js) ---
    const chartConfig = {
        // ... (Tu configuración Chart.js) ...
    };

    // (Tu código de inicialización de Chart.js para Homicidio, Secuestro, Extorsión va aquí abajo)
    // Se ha omitido aquí por brevedad, pero debe mantenerse en tu archivo main.js real.
    
    // EJEMPLO DE INICIALIZACIÓN (MANTÉN ESTE BLOQUE EN TU ARCHIVO REAL)
    if (document.getElementById('chartHomicidio')) {
        // GRÁFICO PRINCIPAL DE HOMICIDIO
        const chartHomicidio = new Chart(document.getElementById('chartHomicidio').getContext('2d'), {
            type: 'line',
            data: { /* ... datos de dataHomicidioNacional ... */ },
            options: { /* ... opciones ... */ }
        });
    }
    // (Asegúrate de incluir aquí también el código para chartSecuestro y chartExtorsion)
    
});