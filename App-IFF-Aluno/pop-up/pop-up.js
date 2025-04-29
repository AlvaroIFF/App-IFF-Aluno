class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this.init();
  }

  // Inicializa os eventos do pop-up
  init() {
    // Fechar pop-up ao clicar fora dele
    window.addEventListener('click', (event) => {
      if (event.target === this.popup) {
        this.close();
      }
    });
  }

  // Método para abrir o pop-up com eventos do dia selecionado
  open(day, events = []) {
    // Geração do conteúdo dos eventos
    const eventsContent = events.length > 0
      ? `<ul>${events.map(event => `
          <li style="color: ${event.color};">
            ${event.name}
          </li>`).join('')}</ul>`
      : '<p>Sem eventos para este dia.</p>';

    // Atualiza o conteúdo do pop-up com o dia e os eventos
    const popupContent = `
      <h3>Dia Selecionado: ${day}</h3>
      <div class="popup-body">
        ${eventsContent}
      </div>
    `;

    this.popup.querySelector('.popup-content').innerHTML = popupContent;

    // Exibe o pop-up
    this.popup.classList.add('show');
  }

  // Método para fechar o pop-up
  close() {
    this.popup.classList.remove('show');
  }
}
