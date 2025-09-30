document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DATOS SIMULADOS PARA LOS GRÁFICOS DE EVOLUCIÓN NACIONAL ---
    // Simulando datos de 2015 a 2024 con tendencias fluctuantes
    const labels = [
        'ene 15', 'jul 15', 'ene 16', 'jul 16', 'ene 17', 'jul 17', 'ene 18', 'jul 18', 
        'ene 19', 'jul 19', 'ene 20', 'jul 20', 'ene 21', 'jul 21', 'ene 22', 'jul 22', 
        'ene 23', 'jul 23', 'ene 24', 'jul 24', 'ene 25', 'ago 25'
    ];
    
    const dataHomicidio = {
        // Línea INEGI (Tasa por 100k hab. ajustada)
        inegi: [28, 30, 31, 33, 36, 38, 40, 41, 42, 40, 38, 36, 37, 35, 33, 32, 31, 30, 29, 28, 27, 26],
        // Línea SESNSP (Tasa por 100k hab. víctimas)
        sesnsp: [25, 28, 30, 32, 35, 37, 39, 40, 41, 39, 37, 35, 36, 34, 32, 31, 30, 29, 28, 27, 26, 25]
    };
    
    const dataSecuestro = {
        // Tasa Secuestro Nacional (simulación de tendencia a la baja)
        tasa: [1.8, 1.7, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.3, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1]
    };

    const dataExtorsion = {
        // Tasa Extorsión Nacional (simulación de tendencia a la alta)
        tasa: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.2]
    };

    // --- 2. CONFIGURACIÓN BASE PARA LAS GRÁFICAS ---
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
            point: { radius: 0 } // Quitar puntos para un look más limpio
        }
    };
    
    // --- 3. CREAR GRÁFICO PRINCIPAL DE HOMICIDIO ---
    new Chart(document.getElementById('chartHomicidio').getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'INEGI',
                    data: dataHomicidio.inegi,
                    borderColor: '#cc0000', // Rojo para INEGI
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'SESNSP',
                    data: dataHomicidio.sesnsp,
                    borderColor: '#4A90E2', // Azul para SESNSP
                    borderWidth: 2,
                    tension: 0.4
                }
            ]
        },
        options: {
            ...chartConfig,
            scales: { ...chartConfig.scales, y: { beginAtZero: false, min: 20 } } // Ajuste vertical
        }
    });

    // --- 4. CREAR GRÁFICO MINI: SECUESTRO ---
    new Chart(document.getElementById('chartSecuestro').getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Secuestro',
                data: dataSecuestro.tasa,
                borderColor: '#4A90E2',
                borderWidth: 2,
                tension: 0.4,
                fill: false
            }]
        },
        options: chartConfig
    });

    // --- 5. CREAR GRÁFICO MINI: EXTORSIÓN ---
    new Chart(document.getElementById('chartExtorsion').getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Extorsión',
                data: dataExtorsion.tasa,
                borderColor: '#cc0000',
                borderWidth: 2,
                tension: 0.4,
                fill: false
            }]
        },
        options: chartConfig
    });
});