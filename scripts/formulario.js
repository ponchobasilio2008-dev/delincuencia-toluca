// scripts/formulario.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('comment-form');
    const commentInput = document.getElementById('comentario');
    const charCount = document.getElementById('char-count');
    const formMessage = document.getElementById('form-message');

    // 1. Contador de caracteres para el comentario
    commentInput.addEventListener('input', () => {
        const currentLength = commentInput.value.length;
        charCount.textContent = `${currentLength}/100`;
        
        if (currentLength > 100) {
            charCount.style.color = 'red';
        } else {
            charCount.style.color = 'var(--secondary-text)';
        }
    });

    // 2. Manejo y validación del envío del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Detener el envío tradicional del formulario
        
        const data = {
            nombre: document.getElementById('nombre').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            edad: parseInt(document.getElementById('edad').value),
            comentario: commentInput.value.trim(),
            fecha: new Date().toISOString()
        };

        // Validación de longitud
        if (data.comentario.length === 0 || data.comentario.length > 100) {
            formMessage.textContent = 'Error: El comentario debe tener entre 1 y 100 caracteres.';
            formMessage.style.backgroundColor = '#fcebeb';
            formMessage.style.color = 'var(--accent-color)';
            return;
        }

        // Simulación de Envío Exitoso (SOLO CLIENTE)
        // NOTA: Para guardar datos reales, necesitarías aquí una API o un servicio externo.
        console.log("Datos listos para enviar (SIMULACIÓN):", data);
        
        formMessage.innerHTML = '¡Gracias por tu comentario! Tu mensaje ha sido enviado (simulación).';
        formMessage.style.backgroundColor = '#d4edda';
        formMessage.style.color = '#155724';
        
        form.reset(); // Limpiar el formulario
        charCount.textContent = '0/100';
    });
});