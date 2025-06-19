document.querySelectorAll('.navbar-link-custom').forEach(link => {
  const border = link.querySelector('.link-border');
  let prefetched = false;

  link.addEventListener('click', e => {
    e.preventDefault();             
    const url = link.href;          

    // Pré-carrega uma vez
    if (!prefetched) {
      fetch(url, { mode: 'no-cors' });
      prefetched = true;
    }

    // Reinicia a animação
    link.classList.remove('clicked');
    void border.getBoundingClientRect();  
    link.classList.add('clicked');

    // Função que faz o redirect
    const redirect = () => window.location.href = url;

    // Verifica se a animação já terminou (dashoffset = 0)
    const currentOffset = window.getComputedStyle(border).strokeDashoffset;
    if (currentOffset === '0px' || currentOffset === '0') {
      // Já está “desenhada” → redireciona na hora
      return redirect();
    }

    // Senão, aguarda o fim da transição
    const onEnd = evt => {
      if (evt.propertyName === 'stroke-dashoffset') {
        border.removeEventListener('transitionend', onEnd);
        redirect();
      }
    };
    border.addEventListener('transitionend', onEnd);
  });
});
