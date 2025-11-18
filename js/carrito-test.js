// Script de prueba para añadir productos al carrito
document.addEventListener('DOMContentLoaded', function() {
    // Crear botón flotante de prueba
    const testBtn = document.createElement('button');
    testBtn.textContent = '🛒 Añadir Productos de Prueba';
    testBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 10000;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
    `;
    
    testBtn.onmouseover = function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
    };
    
    testBtn.onmouseout = function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    };
    
    testBtn.onclick = function() {
        // Productos de prueba con estructura correcta
        const productosDePrueba = [
            {
                id: 1,
                nombre: "Arroz Chaufa Especial",
                precio: 28.50,
                cantidad: 2,
                imagen: "imagenes/arroz-chaufa.jpg"
            },
            {
                id: 2,
                nombre: "Pollo Chijaukay",
                precio: 32.00,
                cantidad: 1,
                imagen: "imagenes/pollo-chijaukay.jpg"
            },
            {
                id: 3,
                nombre: "Wantán Frito",
                precio: 18.00,
                cantidad: 3,
                imagen: "imagenes/wantan.jpg"
            }
        ];
        
        console.log('🛒 Añadiendo productos de prueba:', productosDePrueba);
        
        // Guardar en localStorage
        localStorage.setItem('carrito', JSON.stringify(productosDePrueba));
        
        // Mostrar notificación mejorada
        const notificacion = document.createElement('div');
        notificacion.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10001;
            animation: slideIn 0.5s ease;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        `;
        
        let total = productosDePrueba.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        notificacion.innerHTML = `
            <div>✅ ${productosDePrueba.length} productos añadidos</div>
            <div style="font-size: 0.9em; margin-top: 5px;">Total: S/ ${total.toFixed(2)}</div>
        `;
        
        document.body.appendChild(notificacion);
        
        // Remover notificación después de 3 segundos
        setTimeout(() => {
            notificacion.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.parentNode.removeChild(notificacion);
                }
            }, 500);
        }, 3000);
        
        // Recargar la página para actualizar el carrito
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };
    
    // Añadir animaciones CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(testBtn);
});
