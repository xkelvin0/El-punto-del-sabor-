// ============================================
// BÚSQUEDA Y FILTRADO DE PLATOS
// ============================================

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentCategory = 'all';
    let currentSearchTerm = '';

    // Hacer las variables accesibles globalmente para otros scripts
    window.currentCategory = currentCategory;
    window.currentSearchTerm = currentSearchTerm;

    if (!searchInput) return;

    function filterCards() {
        // Llamar a la función de filtros que combina todos los filtros
        if (typeof aplicarTodosLosFiltros === 'function') {
            aplicarTodosLosFiltros();
        } else {
            // Fallback si la función no está disponible
            const cards = document.querySelectorAll('.card');
            let hasVisibleCards = false;

            cards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const cardCategory = card.getAttribute('data-category') || 'platos';

                const matchesSearch = title.includes(currentSearchTerm);
                const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;

                if (matchesSearch && matchesCategory) {
                    card.classList.remove('hidden');
                    hasVisibleCards = true;
                } else {
                    card.classList.add('hidden');
                }
            });

            const noResults = document.getElementById('noResults');
            if (!hasVisibleCards) {
                if (!noResults) {
                    const noResultsElement = document.createElement('p');
                    noResultsElement.id = 'noResults';
                    noResultsElement.textContent = 'No se encontraron platos que coincidan con tu búsqueda.';
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

    // Event listeners para búsqueda y filtros
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.toLowerCase();
        window.currentSearchTerm = currentSearchTerm; // Actualizar variable global
        filterCards();
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.getAttribute('data-category');
            window.currentCategory = currentCategory; // Actualizar variable global
            filterCards();
        });
    });

    // Inicializar con todos los platos visibles
    filterCards();
}

document.addEventListener('DOMContentLoaded', setupSearch);
