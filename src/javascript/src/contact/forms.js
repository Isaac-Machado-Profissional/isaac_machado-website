document.addEventListener('DOMContentLoaded', () => {
  const SIMULATE_DEV = false;
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const bgContainer = document.querySelector('.contact-background');
  const SUBJECT_PREFIX = 'Nova mensagem do site! — ';

  if (!form) return;

  const dicionarioErros = {
    TYPE_EMAIL: 'não é um endereço de e‑mail válido',
    REQUIRED_FIELD_EMPTY: 'é um campo obrigatório e não pode ficar vazio',
    TOO_SHORT: 'é muito curto',
  };
  const traduzir = err => dicionarioErros[err.code] || err.message;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const selectSubject = document.getElementById('user-subject');
    const hiddenSubject = document.getElementById('hidden-subject');

    if (!selectSubject || !hiddenSubject) {
      console.error('Campos de assunto não encontrados no DOM');
      return;
    }

    // Preenche o hidden _subject
    hiddenSubject.value = SUBJECT_PREFIX + (selectSubject.value || '');

    // Feedback visual
    formStatus.style.display = 'block';
    formStatus.innerHTML = "<p class='text-center'>Enviando…</p>";

    // Cria o FormData
    const data = new FormData(form);

    // Remove duplicações
    data.delete('subject');
    data.delete('subject-option');

    // Callback sucesso
    const onSuccess = () => {
      if (bgContainer) bgContainer.style.display = 'none';
      formStatus.innerHTML = `
        <div class="alert alert-success text-center">
          🎉 Obrigado! Sua mensagem foi enviada com sucesso. Em breve retornarei a partir do <strong>e‑mail indicado.</strong>
        </div>`;
      form.reset();
    };

    // Modo DEV
    if (SIMULATE_DEV) {
      console.log('💾 Dev mode — dados:', Object.fromEntries(data.entries()));
      return setTimeout(onSuccess, 800);
    }

    // Envio real
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
            .map(err => `<li>O campo <strong>${err.field || 'desconhecido'}</strong> ${traduzir(err)}.</li>`)
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
