class Popup {
  constructor(popupSelector, overlaySelector) {
    this.popup = document.querySelector(popupSelector);
    this.overlay = document.querySelector(overlaySelector);
    this.init();
  }

  // Inicializa os eventos do pop-up
  init() {
    // Fechar pop-up ao clicar fora dele
    this.overlay.addEventListener('click', () => this.close());
  }

  // Método para abrir o pop-up com data e eventos do dia selecionado
  open(dateString, events = []) {
    // Formata a data para exibição
    const date = new Date(dateString);
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString('pt-BR', { month: 'long' });
    const dayOfWeek = date.toLocaleString('pt-BR', { weekday: 'long' });

    // Atualiza o cabeçalho com o dia e a data
    this.popup.querySelector('#popup-date').textContent = `${dayOfMonth} de ${month}`;
    this.popup.querySelector('#popup-day').textContent = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

    // Geração do conteúdo dos eventos
    const eventsContent = events.length > 0
      ? `<ul>${events.map(event => `
          <li style="color: ${event.color};">
            ${event.name}
          </li>`).join('')}</ul>`
      : '<p>Sem eventos para este dia.</p>';

    // Atualiza o corpo do pop-up com os eventos
    this.popup.querySelector('.popup-body').innerHTML = eventsContent;

    // Exibe o pop-up e o overlay
    this.popup.classList.add('show');
    this.overlay.classList.add('show');
  }

  // Método para fechar o pop-up
  close() {
    this.popup.classList.remove('show');
    this.overlay.classList.remove('show');
  }
}
