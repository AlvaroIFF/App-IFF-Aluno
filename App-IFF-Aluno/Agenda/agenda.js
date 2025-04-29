// Função para gerar o calendário
function generateCalendar() {
    const popup = new Popup('#popup', '.popup-overlay');
    const calendarGrid = document.getElementById("calendar-grid");
    const daysInMonth = 31; // Dias de março
    const startDay = 1; // Dia da semana que março começa (sábado: 6)
  
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
      
      // Exemplo: Adicionando eventos em dias específicos
      if ([7, 12, 21, 29].includes(i)) { // Dias com eventos
        const eventDot = document.createElement("div");
        eventDot.classList.add("event-dot");
        eventDot.style.backgroundColor = i === 7 ? "orange" :
                                         i === 12 ? "blue" :
                                         i === 21 ? "pink" :
                                         "green";
        dayElement.appendChild(eventDot);
          // Adiciona evento de clique no dia com eventos
    dayElement.addEventListener("click", () => {
        const dateString = `2025-03-${i.toString().padStart(2, '0')}`; // Formata a data
        popup.open(dateString, [
            { name: 'Evento Exemplo', color: eventDot.style.backgroundColor }
        ]); // Abre o pop-up com os eventos do dia
    });
}
          
      }
  
      calendarGrid.appendChild(dayElement);
    }
  }


  
  // Chamar a função quando o documento carregar
  document.addEventListener("DOMContentLoaded", generateCalendar);
