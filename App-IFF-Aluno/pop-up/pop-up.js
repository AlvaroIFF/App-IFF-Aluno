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

  // Método para abrir o pop-up com informações dos dias selecionados
  open(selectedDays = []) {
    // Verifica se foram passados dias selecionados
    const content = selectedDays.length > 0 
      ? `<ul>${selectedDays.map(day => `<li>${day}</li>`).join('')}</ul>`
      : 'Nenhum dia selecionado.';
    
    // Atualiza o conteúdo do pop-up
    this.popup.querySelector('.popup-content').innerHTML = `
      <span class="close">&times;</span>
      <h3>Dias Selecionados</h3>
      ${content}
    `;
    
    this.popup.classList.add('show');
  }

  // Método para fechar o pop-up
  close() {
    this.popup.classList.remove('show');
  }
}
