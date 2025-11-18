// Integración con backend para formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                consulta: document.getElementById('consulta').value,
                message: document.getElementById('message').value.trim()
            };
            
            // Validación básica
            if (!formData.name || !formData.email || !formData.message) {
                mostrarNotificación('Por favor complete todos los campos requeridos', 'error');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                mostrarNotificación('Por favor ingrese un email válido', 'error');
                return;
            }
            
            // Mostrar loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Debug: mostrar qué se va a enviar
            console.log('Datos a enviar:', {
                name: formData.name,
                email: formData.email,
                consulta: formData.consulta,
                message: formData.message
            });
            
            try {
                // Enviar datos al backend
                const response = await fetch('../backend/api/contacto-simple.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        consulta: formData.consulta,
                        message: formData.message
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    mostrarNotificación('¡Mensaje enviado correctamente!', 'success');
                    contactForm.reset();
                } else {
                    mostrarNotificación(result.message || 'Error al enviar el mensaje', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                mostrarNotificación('Error de conexión. Por favor intenta más tarde.', 'error');
            } finally {
                // Restaurar botón
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Función para mostrar notificaciones (si no existe)
function mostrarNotificación(mensaje, tipo) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    
    // Estilos
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Colores según tipo
    if (tipo === 'success') {
        notificacion.style.backgroundColor = '#28a745';
    } else if (tipo === 'error') {
        notificacion.style.backgroundColor = '#dc3545';
    } else {
        notificacion.style.backgroundColor = '#17a2b8';
    }
    
    // Agregar al DOM
    document.body.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notificacion.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    }, 5000);
}