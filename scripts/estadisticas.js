document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('estadistica-content');
    const buttons = document.querySelectorAll('.stat-button');
    let allData = null; 

    // 1. Cargar los datos JSON
    fetch('data/estadisticas-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo de datos: estadisticas-data.json');
            }
            return response.json();
        })
        .then(data => {
            allData = data;
            // Mostrar la estadística por defecto al cargar la página
            displayStatistic('percepcion_inseguridad');
        })
        .catch(error => {
            console.error("Error al cargar o procesar datos:", error);
            if (contentArea) {
                contentArea.innerHTML = '<p style="color: red;">Error: No se pudieron cargar las estadísticas. Revisa la consola para más detalles.</p>';
            }
        });

    // 2. Manejar los clics en los botones (si existen)
    if (buttons.length > 0) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const statType = button.getAttribute('data-stat');
                displayStatistic(statType);
            });
        });
    }

    // 3. Función para renderizar el contenido
    function displayStatistic(type) {
        if (!allData || !contentArea) return; 

        const stat = allData[type];
        let htmlContent = `
            <h3>${stat.title}</h3>
            <p class="description">${stat.description}</p>
        `;

        if (type === 'confianza_autoridades') {
            // GRÁFICO DE BARRAS (CONFIANZA)
            const instituciones = stat.instituciones;
            htmlContent += '<div class="bar-chart-container">';
            
            for (const key in instituciones) {
                const nombre = key.replace(/_/g, ' ').toUpperCase();
                const valor = instituciones[key];
                
                htmlContent += `
                    <div class="bar-item">
                        <span class="bar-label">${nombre}</span>
                        <div class="bar-graph">
                            <div class="bar-fill" style="width: ${valor}%;">${valor}%</div>
                        </div>
                    </div>
                `;
            }
            htmlContent += '</div>';

        } else {
            // TARJETAS DE MÉTRICAS SIMPLES (PERCEPCIÓN/CIFRA NEGRA)
            htmlContent += `
                <div class="stat-metrics">
                    <div class="metric-card primary">
                        <h4>TOLUCA (PERCEPCIÓN LOCAL)</h4>
                        <p class="value">${stat.toluca}%</p>
                    </div>
                    <div class="metric-card secondary">
                        <h4>ESTADO DE MÉXICO</h4>
                        <p class="value">${stat.edomex}%</p>
                    </div>
                    <div class="metric-card national">
                        <h4>PROMEDIO NACIONAL</h4>
                        <p class="value">${stat.nacional}%</p>
                    </div>
                </div>
            `;
        }

        contentArea.innerHTML = htmlContent;
    }
});