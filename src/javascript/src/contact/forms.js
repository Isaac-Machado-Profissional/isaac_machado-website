document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');

  // Se o formulário não existir na página, o script não faz nada.
  if (!form) return;

  const formStatus = document.getElementById('form-status');

  async function handleSubmit(event) {
  event.preventDefault(); 
  const data = new FormData(event.target);
  const form = event.target;
  const formStatus = document.getElementById('form-status');

  // ====================================================================
  //  NOSSO DICIONÁRIO DE TRADUÇÃO
  //  Mapeia o 'código' do erro do Formspree para uma mensagem em português.
  // ====================================================================
  const dicionarioErros = {
    'TYPE_EMAIL': 'não é um endereço de e-mail válido',
    'REQUIRED_FIELD_EMPTY': 'é um campo obrigatório e não pode ficar vazio',
    'TOO_SHORT': 'é muito curto',
    // Adicione mais traduções aqui conforme necessário
  };

  // Função que pega um erro e retorna a mensagem traduzida
  const traduzirMensagem = (error) => {
    // Se o código do erro existir no nosso dicionário, usa a tradução.
    // Se não, usa a mensagem original em inglês como fallback.
    return dicionarioErros[error.code] || error.message;
  };
  // ====================================================================

  try {
    formStatus.innerHTML = "<p class='text-center'>Enviando...</p>";
    formStatus.style.display = "block";

    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // --- SUCESSO (código inalterado) ---
      const backgroundContainer = document.querySelector('.contact-background');
      if (backgroundContainer) {
        backgroundContainer.style.display = "none";
      }
      formStatus.innerHTML = "<div class='alert alert-success'>Sua mensagem foi enviada com sucesso. Retornarei para o seu email em breve.</div>";
      form.reset();
      
    } else {
      // --- TRATAMENTO DE ERRO (MODIFICADO) ---
      const errorData = await response.json();
      
      if (errorData.errors) {
        // Agora usamos a função 'traduzirMensagem' para montar a lista
        const errorMessages = errorData.errors.map(
          error => `<li>O campo <strong>'${error.field || 'desconhecido'}'</strong> ${traduzirMensagem(error)}.</li>`
        ).join('');
        
        formStatus.innerHTML = `
          <div class='alert alert-danger'>
            <strong>Oops! Por favor, corrija os seguintes erros:</strong>
            <ul>${errorMessages}</ul>
          </div>
        `;
      } else {
        formStatus.innerHTML = "<div class='alert alert-danger'>Oops! Houve um problema no servidor. Tente novamente mais tarde.</div>";
      }
    }
  } catch (error) {
    console.error('Erro no envio:', error);
    formStatus.innerHTML = "<div class='alert alert-danger'>Oops! Houve um problema de conexão. Verifique sua internet.</div>";
  }
}
  form.addEventListener("submit", handleSubmit);
});