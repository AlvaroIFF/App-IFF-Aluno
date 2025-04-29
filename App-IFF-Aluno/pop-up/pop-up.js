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

  // Método para abrir o pop-up com o dia selecionado
  open(day, content = '') {
    // Atualiza o conteúdo do pop-up com o dia no topo
    const popupContent = `
      <h3>Dia Selecionado: ${day}</h3>
      <div class="popup-body">${content}</div>
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
