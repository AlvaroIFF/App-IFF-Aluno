document.addEventListener('DOMContentLoaded', () => {
    const subjectCards = document.querySelectorAll('.subject-card');

    subjectCards.forEach(card => {
        card.addEventListener('click', function() {
            const subjectNameElement = this.querySelector('.card-subject-name');
            const subjectCodeElement = this.querySelector('.card-subject-code');

            const subjectName = subjectNameElement ? subjectNameElement.textContent.trim() : 'Nome não disponível';
            const subjectCode = subjectCodeElement ? subjectCodeElement.textContent.trim() : 'Código não disponível';

            console.log(`Card clicado: ${subjectName} (Código: ${subjectCode})`);

            this.classList.toggle('subject-card-active');
        });
    });
});
