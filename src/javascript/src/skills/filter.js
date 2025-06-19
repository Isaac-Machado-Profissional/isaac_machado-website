import Shuffle from 'shufflejs';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.skills-row');
  const shuffleInstance = new Shuffle(container, {
    itemSelector: '.mix',
    buffer: 1,
    speed: 500,
  });

  const filterButtons = document.querySelectorAll('.controls button');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 0) embaralha TODOS os itens
    //   shuffleInstance.sort({ randomize: true });

      const isActive = button.classList.contains('active');
      const group = button.getAttribute('data-group');

      // 1) limpa 'active' de todos
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // 2) se o botão já estava ativo ou for 'all', mostramos todos
      if (isActive || group === 'all') {
        shuffleInstance.filter(Shuffle.ALL_ITEMS);
      } else {
        // 3) caso contrário, ativamos só este e filtramos
        button.classList.add('active');
        shuffleInstance.filter(element => {
          const groups = JSON.parse(element.getAttribute('data-groups'));
          return groups.includes(group);
        });
      }
    });
  });
});
