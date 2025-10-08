// scripts/formulario.js

const LS_KEY = 'proyecto_seguridad_comentarios'; // Clave para LocalStorage
const MAX_CHARS = 100;
const ACCENT_COLOR = '#cc0000'; // Rojo de tu diseño
const SECONDARY_TEXT_COLOR = '#666'; // Gris de tu diseño

// Función para cargar comentarios del LocalStorage
function loadComments() {
    const commentsJson = localStorage.getItem(LS_KEY);
    // Devuelve un array vacío si no hay datos guardados
    return commentsJson ? JSON.parse(commentsJson) : [];
}

// Función para guardar comentarios en el LocalStorage
function saveComments(comments) {
    localStorage.setItem(LS_KEY, JSON.stringify(comments));
}

// Función para renderizar y mostrar los comentarios guardados
function renderComments() {
    const commentsContainer = document.getElementById('comments-display-area');
    if (!commentsContainer) return;

    const comments = loadComments();
    
    if (comments.length === 0) {
        commentsContainer.innerHTML = '<p class="text-center">Aún no hay comentarios. ¡Sé el primero!</p>';
        return;
    }

    let html = '<h4>Comentarios Recientes:</h4>';
    // Mostrar solo los 5 más recientes
    comments.slice(0, 5).forEach(comment => { 
        const date = new Date(comment.fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' });
        
        html += `
            <div class="comment-card">
                <p><strong>${comment.nombre}</strong> <small>(${comment.edad} años) - ${date}</small></p>
                <p class="comment-text">${comment.comentario}</p>
            </div>
        `;
    });
    commentsContainer.innerHTML = html;
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('comment-form');
    const commentInput = document.getElementById('comentario');
    const charCount = document.getElementById('char-count');
    const formMessage = document.getElementById('form-message');

    // Cargar y mostrar comentarios al iniciar
    renderComments();

    // 1. Contador de caracteres
    commentInput.addEventListener('input', () => {
        const currentLength = commentInput.value.length;
        charCount.textContent = `${currentLength}/${MAX_CHARS}`;
        
        // Cambiar color si se excede el límite
        charCount.style.color = (currentLength > MAX_CHARS || currentLength === 0) ? ACCENT_COLOR : SECONDARY_TEXT_COLOR;
    });
    
    // Inicializar el contador al cargar la página
    commentInput.dispatchEvent(new Event('input'));


    // 2. Manejo y validación del envío del formulario (GUARDADO EN LOCALSTORAGE)
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const data = {
            nombre: document.getElementById('nombre').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            // Aseguramos que la edad sea un número
            edad: parseInt(document.getElementById('edad').value), 
            comentario: commentInput.value.trim(),
            fecha: new Date().toISOString()
        };

        // Validación de longitud
        if (data.comentario.length === 0 || data.comentario.length > MAX_CHARS) {
            formMessage.textContent = `Error: El comentario debe tener entre 1 y ${MAX_CHARS} caracteres.`;
            formMessage.style.backgroundColor = '#fcebeb';
            formMessage.style.color = ACCENT_COLOR;
            return;
        }

        // --- LÓGICA DE GUARDADO LOCAL ---
        const comments = loadComments();
        comments.unshift(data); // Agregar el nuevo comentario al inicio
        saveComments(comments);

        
        formMessage.innerHTML = '¡Gracias! Tu comentario se guardó localmente en este navegador.';
        formMessage.style.backgroundColor = '#d4edda';
        formMessage.style.color = '#155724'; // Color de éxito
        
        form.reset(); // Limpiar el formulario
        
        // Volver a renderizar para mostrar el nuevo comentario
        renderComments(); 
        
        // Re-inicializar el contador después del reset
        commentInput.dispatchEvent(new Event('input'));
    });
});