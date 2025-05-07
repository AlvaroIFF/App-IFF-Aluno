document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os cards de disciplina
    const subjectCards = document.querySelectorAll('.subject-card');

    subjectCards.forEach(card => {
        // Adiciona um ouvinte de evento de clique a cada card
        card.addEventListener('click', function() {
            // Pega os elementos do nome e código da disciplina dentro do card clicado
            const subjectNameElement = this.querySelector('.card-subject-name');
            const subjectCodeElement = this.querySelector('.card-subject-code');

            // Extrai o texto do nome e código, com um fallback caso não encontre
            const subjectName = subjectNameElement ? subjectNameElement.textContent.trim() : 'Nome não disponível';
            const subjectCode = subjectCodeElement ? subjectCodeElement.textContent.trim() : 'Código não disponível';

            // Exibe no console o nome e código da disciplina clicada (para depuração)
            console.log(`Card clicado: ${subjectName} (Código: ${subjectCode})`);

            // Alterna a classe 'subject-card-active' no card clicado
            // Isso ativa/desativa a borda esquerda mais grossa definida no CSS
            this.classList.toggle('subject-card-active');
        });
    });
});
