// ============================================
// SISTEMA DE NOTIFICACIONES
// ============================================

function mostrarNotificacion(mensaje, tipo = 'exito') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    
    // Estilos básicos
    notificacion.style.position = 'fixed';
    notificacion.style.top = '20px';
    notificacion.style.right = '20px';
    notificacion.style.padding = '15px 20px';
    notificacion.style.borderRadius = '4px';
    notificacion.style.color = 'white';
    notificacion.style.zIndex = '1000';
    notificacion.style.opacity = '0';
    notificacion.style.transition = 'opacity 0.3s, transform 0.3s';
    notificacion.style.transform = 'translateX(100%)';
    
    // Estilos según el tipo
    if (tipo === 'error') {
        notificacion.style.backgroundColor = '#e74c3c';
    } else if (tipo === 'advertencia') {
        notificacion.style.backgroundColor = '#f39c12';
    } else {
        notificacion.style.backgroundColor = '#2ecc71';
    }
    
    // Agregar al documento
    document.body.appendChild(notificacion);
    
    // Mostrar con animación
    setTimeout(() => {
        notificacion.style.opacity = '1';
        notificacion.style.transform = 'translateX(0)';
    }, 10);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notificacion.style.opacity = '0';
        notificacion.style.transform = 'translateX(100%)';
        
        // Eliminar después de la animación
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}
