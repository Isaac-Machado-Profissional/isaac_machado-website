export function initAcordeonWithScroll() {
    const headers = document.querySelectorAll('.acordeon-header');
  
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const content  = header.nextElementSibling;
        // Estado ANTES da mudança:
        const wasClosed = !content.style.maxHeight || content.style.maxHeight === '0px';
  
        // 1) Alterna abrir/fechar
        if (wasClosed) {
          content.style.maxHeight = content.scrollHeight + "px";
          content.classList.add('open');
        } else {
          content.style.maxHeight = null;
          content.classList.remove('open');
        }
  
        // 2) Depois de um pequeno delay, faz o scroll correto
        setTimeout(() => {
          if (wasClosed) {
            // → acabou de abrir: desce para mostrar conteúdo
            const bottom = content.getBoundingClientRect().bottom;
            const winH   = window.innerHeight;
            if (bottom > winH) {
              window.scrollBy({ top: bottom - winH + 150, behavior: 'smooth' });
            }
          } else {
            // → acabou de fechar: sobe toda a tela
            window.scrollBy({ top: -window.scrollY, behavior: 'smooth' });
          }
        }, 400); // ajuste conforme sua duração de transition
      });
    });
  }
  