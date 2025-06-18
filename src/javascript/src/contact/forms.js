document.addEventListener('DOMContentLoaded', () => {
  const SIMULATE_DEV = true; // true = simula (não envia); false = envia de verdade
  const form          = document.getElementById('contact-form');
  const formStatus    = document.getElementById('form-status');
  const bgContainer   = document.querySelector('.contact-background');

  if (!form) return;

  // Dicionário para traduzir erros do Formspree
  const dicionarioErros = {
    TYPE_EMAIL: 'não é um endereço de e‑mail válido',
    REQUIRED_FIELD_EMPTY: 'é um campo obrigatório e não pode ficar vazio',
    TOO_SHORT: 'é muito curto',
  };
  const traduzir = err => dicionarioErros[err.code] || err.message;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    formStatus.style.display = 'block';
    formStatus.innerHTML     = "<p class='text-center'>Enviando…</p>";

    const data = new FormData(form);

    // Função de sucesso: esconde o form e mostra agradecimento
    const onSuccess = () => {
      if (bgContainer) bgContainer.style.display = 'none';
      formStatus.innerHTML = `
        <div class="alert alert-success text-center">
          🎉 Obrigado! Sua mensagem foi enviada com sucesso. Em breve retornarei a partir do <strong>Email desejado de retorno.</strong>
        </div>`;
      form.reset();
    };

    // Modo DEV: simula
    if (SIMULATE_DEV) {
      console.log('💾 Dev mode — dados:', Object.fromEntries(data.entries()));
      return setTimeout(onSuccess, 800);
    }

    // Modo PROD: envia ao Formspree
    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        onSuccess();
      } else {
        const errData = await res.json();
        if (errData.errors) {
          const items = errData.errors
            .map(err => `<li>O campo <strong>${err.field||'desconhecido'}</strong> ${traduzir(err)}.</li>`)
            .join('');
          formStatus.innerHTML = `
            <div class="alert alert-danger">
              <strong>Oops! Corrija os erros abaixo:</strong>
              <ul>${items}</ul>
            </div>`;
        } else {
          formStatus.innerHTML = `
            <div class="alert alert-danger">
              Ocorreu um erro no servidor. Tente novamente mais tarde.
            </div>`;
        }
      }
    } catch (err) {
      console.error('Erro de conexão:', err);
      formStatus.innerHTML = `
        <div class="alert alert-danger">
          Erro de conexão. Verifique sua internet e tente novamente.
        </div>`;
    }
  });
});
