// ============================================
// FILTROS DE PRECIOS
// ============================================

// Variables globales para el rango de precios
let minPrice = 0;
let maxPrice = 100;

// Función para actualizar el rango de precios
function actualizarRangoPrecios() {
    const rangeInput = document.querySelectorAll('.price-slider');
    const priceInput = document.querySelectorAll('.input-group input');
    const range = document.querySelector('.slider-track');
    const priceGap = 5; // Reducir la brecha mínima para mejor usabilidad

    if (rangeInput.length === 0 || priceInput.length === 0 || !range) return;

    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);

    // Asegurar que los valores estén dentro del rango permitido
    minVal = Math.min(Math.max(minVal, 0), 100);
    maxVal = Math.min(Math.max(maxVal, 0), 100);

    // Actualizar los valores de los inputs
    priceInput[0].value = minVal;
    priceInput[1].value = maxVal;

    // Actualizar la posición de la barra de rango
    range.style.left = ((minVal / 100) * 100) + "%";
    range.style.right = (100 - (maxVal / 100) * 100) + "%";

    // Actualizar el texto del rango
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.textContent = `S/ ${minVal} - S/ ${maxVal}`;
    }
    
    // Aplicar los filtros
    aplicarTodosLosFiltros();
}

// Función para aplicar todos los filtros (precio, categoría y búsqueda)
function aplicarTodosLosFiltros() {
    const cards = document.querySelectorAll('.card');
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || 100;

    // Obtener el término de búsqueda actual
    const searchTerm = (window.currentSearchTerm || '').toLowerCase();
    const category = window.currentCategory || 'all';

    let hasVisibleCards = false;

    cards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const cardCategory = card.getAttribute('data-category') || 'platos';
        
        // Obtener el precio del atributo data-price
        const precio = parseFloat(card.getAttribute('data-price')) || 0;

        const matchesSearch = title.includes(searchTerm);
        const matchesCategory = category === 'all' || cardCategory === category;
        const matchesPrice = precio >= minPrice && precio <= maxPrice;

        if (matchesSearch && matchesCategory && matchesPrice) {
            card.classList.remove('hidden');
            hasVisibleCards = true;
        } else {
            card.classList.add('hidden');
        }
    });

        // Mostrar mensaje si no hay resultados
        const noResults = document.getElementById('noResults');
        if (!hasVisibleCards) {
            if (!noResults) {
                const noResultsElement = document.createElement('p');
                noResultsElement.id = 'noResults';
                noResultsElement.textContent = 'No se encontraron platos que coincidan con los filtros aplicados.';
                noResultsElement.style.textAlign = 'center';
                noResultsElement.style.margin = '20px 0';
                noResultsElement.style.color = '#666';
                document.querySelector('.menu').appendChild(noResultsElement);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }

// Inicializar eventos de filtro de precios
document.addEventListener('DOMContentLoaded', () => {
    const rangeInput = document.querySelectorAll('.price-slider');
    const priceInput = document.querySelectorAll('.input-group input');
    const priceGap = 5; // Brecha mínima entre los controles

    if (rangeInput.length > 0) {
        rangeInput.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                let minVal = parseInt(rangeInput[0].value);
                let maxVal = parseInt(rangeInput[1].value);
                
                // Si es el control izquierdo (mínimo)
                if (e.target === rangeInput[0]) {
                    // Asegurar que no pase del valor máximo - gap
                    if (maxVal - minVal < priceGap) {
                        rangeInput[0].value = maxVal - priceGap;
                    }
                    // Asegurar que no sea menor que 0
                    if (minVal < 0) rangeInput[0].value = 0;
                } 
                // Si es el control derecho (máximo)
                else if (e.target === rangeInput[1]) {
                    // Asegurar que no sea menor que el valor mínimo + gap
                    if (maxVal - minVal < priceGap) {
                        rangeInput[1].value = minVal + priceGap;
                    }
                    // Asegurar que no sea mayor que 100
                    if (maxVal > 100) rangeInput[1].value = 100;
                }
                
                actualizarRangoPrecios();
            });
        });
    }

    if (priceInput.length > 0) {
        priceInput.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                let minVal = parseInt(priceInput[0].value) || 0;
                let maxVal = parseInt(priceInput[1].value) || 100;
                
                // Validar y ajustar los valores
                if (isNaN(minVal)) minVal = 0;
                if (isNaN(maxVal)) maxVal = 100;
                
                minVal = Math.min(Math.max(minVal, 0), 99);
                maxVal = Math.min(Math.max(maxVal, 1), 100);
                
                // Asegurar la brecha mínima
                if (index === 0) { // Si es el input de mínimo
                    if (maxVal - minVal < priceGap) {
                        minVal = maxVal - priceGap;
                        if (minVal < 0) minVal = 0;
                        priceInput[0].value = minVal;
                    }
                } else { // Si es el input de máximo
                    if (maxVal - minVal < priceGap) {
                        maxVal = minVal + priceGap;
                        if (maxVal > 100) maxVal = 100;
                        priceInput[1].value = maxVal;
                    }
                }
                
                // Actualizar los controles deslizantes
                rangeInput[0].value = minVal;
                rangeInput[1].value = maxVal;
                
                actualizarRangoPrecios();
            });
        });
    }
    
    // Inicializar el rango de precios al cargar la página
    actualizarRangoPrecios();
});

    // Los sliders se actualizan automáticamente con el evento input
    // No necesitamos un botón separado para aplicar el filtro
