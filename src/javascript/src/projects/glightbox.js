document.addEventListener('DOMContentLoaded', (event) => {
    
    // Inicializa o GLightbox
    // Ele vai procurar automaticamente por qualquer elemento com a classe "glightbox"
    const lightbox = GLightbox({
        // Opções opcionais, mas recomendadas
        touchNavigation: true, // Permite navegar pelas imagens/vídeos com o dedo em mobile
        loop: false, // Se você tiver vários itens, decide se a galeria volta ao início
        skin: 'clean', // Um tema visual mais moderno
        height: 'auto', // Altura se ajusta ao conteúdo
        descriptionPosition: 'right'
    });

});