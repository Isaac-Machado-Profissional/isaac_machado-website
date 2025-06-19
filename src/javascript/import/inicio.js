import '../../css/src/inicio.css';
import "../src/index/index.js";
import "../src/global/cookie.js";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../src/global/hover.js";




document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('profile-img');

  const onImageReady = () => {
    // 1) faz o fade+zoom
    img.classList.add('visible');

    // 2) inicializa o AOS
    AOS.init({
      duration: 1000,
      once: true    
    });

    // 3) e já recalcula tudo para garantir que os offsets estão corretos
    AOS.refresh();
  };

  if (img.complete) {
    // Se já veio do cache
    onImageReady();
  } else {
    // Senão, espera o load
    img.addEventListener('load', onImageReady);
  }
});



