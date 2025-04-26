// gradientRestart.js
export function initGradientRestart() {
    const links = document.querySelectorAll(
      '.navbar-custom .nav-link.active, .navbar-custom .nav-link[aria-current="page"]'
    );
    links.forEach(el => {
      el.addEventListener('mouseenter', () => {
        // 1) Zera a animação
        el.style.animation = 'none';
        // 2) Força reflow para garantir que o navegador aplique o style acima
        void el.offsetWidth;
        // 3) Religa a animação (já zerada)
        el.style.animation = 'gradient-slide-up 3s ease infinite';
      });
    });
  }
  