import mixitup from 'mixitup';

document.addEventListener('DOMContentLoaded', () => {
    const mixer = mixitup('.skills-row', {
        selectors: {
            target: '.mix'
        },
        animation: {
            queue: true, // ativa fila para não dar erro de overflow
        }
    });

    const filterButtons = document.querySelectorAll('.controls button');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isActive = button.classList.contains('active');
            const selector = button.getAttribute('data-filter');

            if (isActive) {
                // Remove active e reseta filtro IMEDIATAMENTE
                button.classList.remove('active');
                mixer.filter('all').catch(console.error);
            } else {
                // Atualiza active IMEDIATAMENTE e aplica filtro
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                mixer.filter(selector).catch(console.error);
            }
        }); 
    });
});
