class Popup {
  constructor(popupSelector, overlaySelector) {
    this.popup = document.querySelector(popupSelector);
    this.overlay = document.querySelector(overlaySelector);
    this.init();
  }

  // Inicializa o comportamento do pop-up
  init() {
    // Fecha o pop-up ao clicar no overlay
    this.overlay.addEventListener('click', () => this.close());
  }

  // Abre o pop-up com a data e os eventos do dia
  open(dateString, events = []) {
    // Formata a data para exibição
    const date = new Date(dateString);
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString('pt-BR', { month: 'long' });
    const dayOfWeek = date.toLocaleString('pt-BR', { weekday: 'long' });

    // Atualiza o cabeçalho com a data
    this.popup.querySelector('#popup-date').textContent = `${dayOfMonth} de ${month}`;
    this.popup.querySelector('#popup-day').textContent =
      dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

    // Atualiza o corpo com os eventos
    const eventsContent =
      events.length > 0
        ? `<ul>${events
            .map(
              (event) => `
          <li style="color: ${event.color};">
            <span class="event-name">${event.name}</span>
          </li>`
            )
            .join('')}</ul>`
        : '<p>Sem eventos para este dia.</p>';

    this.popup.querySelector('.popup-body').innerHTML = eventsContent;

    // Exibe o pop-up e o overlay
    this.popup.classList.add('show');
    this.overlay.classList.add('show');
  }

  // Fecha o pop-up
  close() {
    this.popup.classList.remove('show');
    this.overlay.classList.remove('show');
  }
}
