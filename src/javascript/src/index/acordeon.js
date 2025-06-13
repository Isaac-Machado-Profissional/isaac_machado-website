export function initAcordeonWithScroll() {
  const triggers = document.querySelectorAll('.acordeon-trigger');
  if (!triggers.length) return;

  // IMPORTANTE: Este valor deve ser o mesmo da sua animação no CSS.
  // Ex: transition: grid-template-rows 0.5s ease-in-out; -> o valor aqui deve ser 500.
  const ANIMATION_DURATION = 500; // 500 milissegundos

  triggers.forEach(trigger => {
    const item = trigger.closest('.acordeon-item');
    const contentContainer = document.getElementById(trigger.getAttribute('aria-controls'));

    if (!item || !contentContainer) return;

    const toggleAccordion = () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // 1. Apenas alterna o estado. Isso inicia a animação do CSS.
      trigger.setAttribute('aria-expanded', !isExpanded);
      item.classList.toggle('is-open');

      if (!isExpanded) {
        // --- SE VAI ABRIR: ROLA PARA O RODAPÉ ---

        // 2. ESPERA a animação terminar com um timeout simples.
        setTimeout(() => {
          // 3. Executa UM ÚNICO comando de scroll para o final da página.
          const pageHeight = document.body.scrollHeight;
          window.scrollTo({
            top: pageHeight,
            behavior: 'smooth'
          });
        }, ANIMATION_DURATION);

      } else {
        // --- SE VAI FECHAR: ROLA PARA O TOPO ---

        // Ao fechar, o scroll pode ser imediato, o que cria um efeito agradável.
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };

    trigger.addEventListener('click', toggleAccordion);
    trigger.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleAccordion();
      }
    });
  });
}