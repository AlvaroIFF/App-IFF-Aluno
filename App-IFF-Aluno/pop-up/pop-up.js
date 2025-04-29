class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this.closeButton = this.popup.querySelector('.close');
    this.init();
  }

  // Inicializa os eventos do pop-up
  init() {
    // Fechar pop-up ao clicar no botão de fechar
    this.closeButton.addEventListener('click', () => this.close());

    // Fechar pop-up ao clicar fora dele
    window.addEventListener('click', (event) => {
      if (event.target === this.popup) {
        this.close();
      }
    });
  }

  // Método para abrir o pop-up
  open(content = '') {
    if (content) {
      this.popup.querySelector('.popup-content').innerHTML = `
        <span class="close">&times;</span>
        ${content}
      `;
    }
    this.popup.classList.add('show');
  }

  // Método para fechar o pop-up
  close() {
    this.popup.classList.remove('show');
  }
}
