// Função para gerar o calendário
function generateCalendar() {
    const popup = new Popup('#popup', '.popup-overlay');
    const calendarGrid = document.getElementById("calendar-grid");
    const daysInMonth = 31; // Dias de março
    const startDay = 1; // Dia da semana que março começa (sábado: 6)

    const eventos = {
        7: [
            { name: 'Prova de história da Arte', color: '#EC9632' }, //LARANJA
            { name: 'Aula de Reforço', color: '#60BEE7' } //AZUL
           ],
        12: [
            { name: 'Prova de Matemática', color: '#A7D46D' } //VERDE
           ],
        15: [
            { name: 'Sábado Letivo', color: '#493159' } //ROXO
        21: [
            { name: 'Feira de Ciências', color: '#EC9632' }, //ROXA
            { name: 'Exposição de Arte', color: '#493159' }
           ],
        29: [
            { name: 'Simulado Final', color: '#EC9632' }
           ]
    };
  
    // Adicionar espaços vazios antes do primeiro dia
    for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("day", "empty");
        calendarGrid.appendChild(emptyDay);
    }

    // Adicionar os dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.innerHTML = `<span>${i}</span>`;

        // Verifica se há eventos para o dia
        if (eventos[i]) {
            // Cria um contêiner para os pontos de eventos
            const eventsContainer = document.createElement("div");
            eventsContainer.classList.add("events-container");

            // Adiciona um ponto colorido para cada evento do dia
            eventos[i].forEach(event => {
                const eventDot = document.createElement("div");
                eventDot.classList.add("event-dot");
                eventDot.style.backgroundColor = event.color; // Define a cor do ponto
                eventsContainer.appendChild(eventDot);
            });

            // Adiciona o contêiner de eventos ao elemento do dia
            dayElement.appendChild(eventsContainer);

            // Adiciona evento de clique para exibir detalhes
            dayElement.addEventListener("click", () => {
                const dateString = `2025-03-${i.toString().padStart(2, '0')}`; // Formata a data
                popup.open(dateString, eventos[i]); // Abre o pop-up com os eventos do dia
            });
        }

        calendarGrid.appendChild(dayElement);
    }
}

// Chamar a função quando o documento carregar
document.addEventListener("DOMContentLoaded", generateCalendar);
