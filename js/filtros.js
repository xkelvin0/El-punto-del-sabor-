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
    let priceGap = 10;

    if (rangeInput.length === 0 || priceInput.length === 0 || !range) return;

    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);

    if ((maxVal - minVal) < priceGap) {
        if (rangeInput[0] === document.activeElement) {
            rangeInput[0].value = maxVal - priceGap;
        } else {
            rangeInput[1].value = minVal + priceGap;
        }
    } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
        range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
        range.style.right = (100 - (maxVal / rangeInput[1].max) * 100) + "%";

        // Actualizar el texto del rango
        const priceRange = document.getElementById('priceRange');
        if (priceRange) {
            priceRange.textContent = `S/ ${minVal} - S/ ${maxVal}`;
        }
    }
}

// Función para aplicar todos los filtros (precio, categoría y búsqueda)
function aplicarTodosLosFiltros() {
    const cards = document.querySelectorAll('.card');
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || 100;

    // Obtener el término de búsqueda actual desde el archivo busqueda.js
    // Para esto necesitamos hacer que las funciones sean accesibles globalmente
    if (typeof window.currentSearchTerm !== 'undefined' && typeof window.currentCategory !== 'undefined') {
        const searchTerm = window.currentSearchTerm || '';
        const category = window.currentCategory || 'all';

        let hasVisibleCards = false;

        cards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const cardCategory = card.getAttribute('data-category') || 'platos';

            // Buscar el precio en el elemento span dentro de .precio-comprar
            const precioSpan = card.querySelector('.precio-comprar span');
            let precio = 0;
            if (precioSpan) {
                const precioTexto = precioSpan.textContent.replace('S/ ', '').replace(',', '');
                precio = parseFloat(precioTexto) || 0;
            }

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
}

// Inicializar eventos de filtro de precios
document.addEventListener('DOMContentLoaded', () => {
    const rangeInput = document.querySelectorAll('.price-slider');
    const priceInput = document.querySelectorAll('.input-group input');

    if (rangeInput.length > 0) {
        rangeInput.forEach(input => {
            input.addEventListener('input', () => {
                actualizarRangoPrecios();
                aplicarTodosLosFiltros();
            });
        });
    }

    if (priceInput.length > 0) {
        priceInput.forEach(input => {
            input.addEventListener('input', (e) => {
                let minVal = parseInt(priceInput[0].value) || 0;
                let maxVal = parseInt(priceInput[1].value) || 100;
                let priceGap = 10;

                if ((maxVal - minVal >= priceGap) && maxVal <= 100) {
                    if (e.target === priceInput[0]) {
                        rangeInput[0].value = minVal;
                        actualizarRangoPrecios();
                    } else {
                        rangeInput[1].value = maxVal;
                        actualizarRangoPrecios();
                    }
                }
                aplicarTodosLosFiltros();
            });
        });
    }
});

    // Los sliders se actualizan automáticamente con el evento input
    // No necesitamos un botón separado para aplicar el filtro
