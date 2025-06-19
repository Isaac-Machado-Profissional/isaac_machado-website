// seu_script_principal.js
import Swal from 'sweetalert2';

window.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const btnAccept = document.getElementById('btn-accept');
    const btnSettings = document.getElementById('btn-settings');
    // REMOVA: const dialog = document.getElementById('settings-dialog');
    const storageKey = 'cookieConsent';
    const prefsStorageKey = 'cookieConsentPrefs'; // Usado para salvar as preferências detalhadas

    // --- Funções de exibição/ocultação do banner ---
    function showBanner() {
        banner.classList.add('show');
        // Você pode querer usar 'flex' aqui se o conteúdo do banner for flexível
        // banner.style.display = 'flex';
    }

    function hideBanner() {
        banner.classList.remove('show');
        // Usar 'display: none' é mais seguro para esconder completamente e remover do fluxo
        banner.style.display = 'none';
    }

    // --- Função para aplicar as preferências de cookies ---
    // NO SEU CASO, se você não tem analytics/marketing, essa função é mais simples
    function applyCookiePreferences(prefs) {
        console.log('Preferências de Cookies Aplicadas:', prefs);
        // Como você não usa analytics/marketing, essas condições não farão nada além do console.log
        if (prefs.analytics) {
            // console.log('Cookies de Estatísticas (NÃO ATIVOS neste site) ativados no consentimento!');
            // Nenhuma ação real de carregamento de script aqui, pois não são usados.
        }
        if (prefs.marketing) {
            // console.log('Cookies de Marketing (NÃO ATIVOS neste site) ativados no consentimento!');
            // Nenhuma ação real de carregamento de script aqui, pois não são usados.
        }
        // Os cookies essenciais (o localStorage do banner) são sempre considerados ativos.
    }

    // --- Verifica consentimento no localStorage ao carregar a página ---
    const consent = localStorage.getItem(storageKey);
    // Para TESTE, você pode comentar a linha abaixo para sempre mostrar o banner:
    // if (consent !== 'accepted') {
    if (consent === null || consent !== 'accepted') { // Mostrar se nunca consentiu ou se não aceitou
        showBanner();
    } else {
        // Se já aceitou, tenta carregar as preferências e aplicá-las
        try {
            const savedPrefs = JSON.parse(localStorage.getItem(prefsStorageKey));
            if (savedPrefs) {
                applyCookiePreferences(savedPrefs);
            }
        } catch (e) {
            console.error("Erro ao carregar preferências de cookies:", e);
            // Se houver erro nas prefs, talvez seja bom mostrar o banner de novo para redefinir.
            showBanner();
        }
    }

    // --- Event Listener para o botão 'Aceitar' tudo ---
    btnAccept.addEventListener('click', () => {
        // Quando aceita tudo, registra essencial como true e os outros como false
        // se eles não estão sendo usados. Se não tem opção para eles, é melhor ser explícito.
        const allAcceptedPrefs = {
            essential: true,
            analytics: false, // Se não usa, configure como false mesmo ao "aceitar tudo"
            marketing: false, // Se não usa, configure como false
        };
        localStorage.setItem(prefsStorageKey, JSON.stringify(allAcceptedPrefs));
        localStorage.setItem(storageKey, 'accepted'); // Marca como consentido
        applyCookiePreferences(allAcceptedPrefs); // Aplica as preferências (que nesse caso não faz nada)
        hideBanner();
    });

    // --- Event Listener para o botão 'Configurações' (SweetAlert2) ---
    btnSettings.addEventListener('click', () => {
        let currentPrefs = {
            essential: true,
            analytics: false,
            marketing: false,
        };
        try {
            const saved = JSON.parse(localStorage.getItem(prefsStorageKey));
            if (saved) {
                currentPrefs = saved;
            }
        } catch (e) {
            console.error("Erro ao carregar preferências para o modal de configurações:", e);
        }

        Swal.fire({
            title: 'Configurações de Privacidade', // Título mais abrangente
            html: `
                <form id="cookieSettingsForm" style="text-align: left; padding: 10px;">
                    <label style="display: block; margin-bottom: 10px;">
                        <input type="checkbox" name="essential" checked disabled style="margin-right: 5px;">
                        Tecnologias Essenciais
                    </label>
                    <p>Necessário para o funcionamento do site. <br> <a href="/privacidade/">Saiba mais</a></p>
                </form>
            `,
            showCancelButton: true,
            confirmButtonText: 'Salvar Preferências',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'swal2-cookie-settings-popup',
            },
            preConfirm: () => {
                const form = Swal.getPopup().querySelector('#cookieSettingsForm');
                const formData = new FormData(form);

                // Retorna apenas essential: true, já que as outras checkboxes não existem
                return {
                    essential: true,
                    // analytics: formData.has('analytics'), // Remover, pois não existe mais no HTML
                    // marketing: formData.has('marketing'), // Remover, pois não existe mais no HTML
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem(prefsStorageKey, JSON.stringify(result.value));
                localStorage.setItem(storageKey, 'accepted');
                applyCookiePreferences(result.value); // Ainda chama, mas não faz nada com analytics/marketing
                hideBanner();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Usuário cancelou ou clicou fora, banner permanece visível
            }
        });
    });
});