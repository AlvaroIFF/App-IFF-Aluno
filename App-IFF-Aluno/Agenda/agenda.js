const calendarGrid = document.getElementById("calendar-grid");
let eventDetailsContainer = document.getElementById("event-details-section");
if (!eventDetailsContainer) {
    const agendaContainer = document.querySelector('.agenda-container');
    if (agendaContainer) {
        eventDetailsContainer = document.createElement('div');
        eventDetailsContainer.id = 'event-details-section';
        eventDetailsContainer.dataset.selectedDay = "";
        eventDetailsContainer.innerHTML = '<p class="no-events-message">Selecione um dia para ver as atividades.</p>';
        agendaContainer.appendChild(eventDetailsContainer);
    } else {
        console.error("ERRO CRÍTICO: .agenda-container não encontrado para adicionar a seção de detalhes.");
    }
}

let userAddedEvents = {};

const predefinedColors = [
    { label: "Verde (Feriado/Recesso)", value: 'var(--cor-evento-verde)', hex: '#A7D46D' },
    { label: "Laranja (Prova)", value: 'var(--cor-evento-laranja)', hex: '#EC9632' },
    { label: "Azul (Oficina)", value: 'var(--cor-evento-azul)', hex: '#60BEE7' },
    { label: "Roxo (Sábado Letivo)", value: 'var(--cor-evento-roxo)', hex: '#493159' }
];


function updateCalendarDayDots(dayNumber) {
    const dayElement = calendarGrid.querySelector(`.day[data-day='${dayNumber}']`);
    if (!dayElement) return;
    let eventsContainer = dayElement.querySelector('.events-container');
    if (!eventsContainer) {
        eventsContainer = document.createElement("div");
        eventsContainer.classList.add("events-container");
        dayElement.appendChild(eventsContainer);
    }
    eventsContainer.innerHTML = '';
    const userEventsForDay = userAddedEvents[dayNumber] || [];
    userEventsForDay.forEach(event => {
        const eventDot = document.createElement("div");
        eventDot.classList.add("event-dot");
        const colorValue = event.color.startsWith('var(') ? getComputedStyle(document.documentElement).getPropertyValue(event.color.slice(4, -1)).trim() : event.color;
        eventDot.style.backgroundColor = colorValue || '#ccc';
        eventDot.title = event.name;
        eventsContainer.appendChild(eventDot);
    });
}

 function createEventListItem(event) {
    const listItem = document.createElement('li');
    const colorValue = event.color.startsWith('var(') ? getComputedStyle(document.documentElement).getPropertyValue(event.color.slice(4, -1)).trim() : event.color;
    listItem.style.borderLeftColor = colorValue || '#ccc';
    listItem.appendChild(document.createTextNode(event.name));
    return listItem;
 }

function removeInputForm() {
    if (!eventDetailsContainer) return;
    const form = eventDetailsContainer.querySelector('#add-event-form');
    if (form) form.remove();
    const addButton = eventDetailsContainer.querySelector('#add-new-event-button');
    if (addButton) addButton.classList.remove('hidden');
}

function showAddEventForm(dayNumber) {
    if (!eventDetailsContainer) return;
    const originalAddButton = eventDetailsContainer.querySelector('#add-new-event-button');
    if (originalAddButton) originalAddButton.classList.add('hidden');
    removeInputForm();

    const formContainer = document.createElement('div');
    formContainer.id = 'add-event-form';

    let colorOptionsHTML = '<label>Cor:</label><div class="color-options-group">';
    predefinedColors.forEach((color, index) => {
        colorOptionsHTML += `
            <div class="color-option">
                <input type="radio" id="color-option-${index}" name="activity_color_choice" value="${color.value}" ${index === 0 ? 'checked' : ''}>
                <span class="color-swatch" style="background-color: ${color.hex};"></span>
                <label for="color-option-${index}">${color.label}</label>
            </div>
        `;
    });
    colorOptionsHTML += `
        <div class="color-option">
            <input type="radio" id="color-option-custom" name="activity_color_choice" value="custom">
            <label for="color-option-custom">Outra Cor:</label>
            <div id="custom-color-picker-container">
                 <input type="color" id="new-activity-color" value="${getComputedStyle(document.documentElement).getPropertyValue('--cor-evento-padrao').trim() || '#6A1B9A'}" disabled>
            </div>
        </div>
    </div>`;

    formContainer.innerHTML = `
        <label for="new-activity-name">Nome:</label>
        <input type="text" id="new-activity-name" required>
        ${colorOptionsHTML}
        <div class="form-buttons">
            <button id="cancel-new-activity">Cancelar</button>
            <button id="save-new-activity">Salvar</button>
        </div>
    `;
    const titleH3 = eventDetailsContainer.querySelector('h3');
    if (titleH3) titleH3.insertAdjacentElement('afterend', formContainer);
    else eventDetailsContainer.appendChild(formContainer);

    const saveBtn = formContainer.querySelector('#save-new-activity');
    const cancelBtn = formContainer.querySelector('#cancel-new-activity');
    const nameInput = formContainer.querySelector('#new-activity-name');
    const colorPicker = formContainer.querySelector('#new-activity-color');
    const radioButtons = formContainer.querySelectorAll('input[name="activity_color_choice"]');

    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            colorPicker.disabled = radio.id !== 'color-option-custom';
        });
    });

    saveBtn.addEventListener('click', () => {
        const activityName = nameInput.value.trim();
        let activityColor = '';

        const selectedRadio = formContainer.querySelector('input[name="activity_color_choice"]:checked');
        if (selectedRadio) {
            if (selectedRadio.value === 'custom') {
                activityColor = colorPicker.value;
            } else {
                activityColor = selectedRadio.value;
            }
        } else {
            activityColor = 'var(--cor-evento-padrao)';
        }


        if (activityName) {
            const newEvent = { name: activityName, color: activityColor };
            if (!userAddedEvents[dayNumber]) userAddedEvents[dayNumber] = [];
            userAddedEvents[dayNumber].push(newEvent);

            let listElement = eventDetailsContainer.querySelector('ul');
            const noEventsMessage = eventDetailsContainer.querySelector('p.no-events-message');
            if (!listElement) {
                listElement = document.createElement('ul');
                if (noEventsMessage) noEventsMessage.remove();
                 const currentForm = eventDetailsContainer.querySelector('#add-event-form');
                 if (currentForm) currentForm.insertAdjacentElement('afterend', listElement);
                 else if (titleH3) titleH3.insertAdjacentElement('afterend', listElement);
                 else eventDetailsContainer.appendChild(listElement);
            }
            listElement.appendChild(createEventListItem(newEvent));
            updateCalendarDayDots(dayNumber);
            removeInputForm();
        } else {
            nameInput.style.borderColor = 'red';
            setTimeout(() => { nameInput.style.borderColor = '#ccc'; }, 1500);
        }
    });
    cancelBtn.addEventListener('click', removeInputForm);
}

function displayDayDetails(dayNumber) {
    if (!eventDetailsContainer) return;
    eventDetailsContainer.dataset.selectedDay = dayNumber;
    calendarGrid.querySelectorAll('.day.selected-day').forEach(d => d.classList.remove('selected-day'));
    const selectedDayElement = calendarGrid.querySelector(`.day[data-day='${dayNumber}']`);
    if (selectedDayElement) selectedDayElement.classList.add('selected-day');

    const userEventsForDay = userAddedEvents[dayNumber] || [];
    const dateString = `${dayNumber.toString().padStart(2, '0')} de Março`;
    eventDetailsContainer.innerHTML = `<h3>${dateString}</h3>`;

    if (userEventsForDay.length > 0) {
        const eventList = document.createElement('ul');
        userEventsForDay.forEach(event => eventList.appendChild(createEventListItem(event)));
        eventDetailsContainer.appendChild(eventList);
    } else {
        const noEventsMessage = document.createElement('p');
        noEventsMessage.classList.add('no-events-message');
        noEventsMessage.textContent = 'Nenhuma atividade agendada.';
        eventDetailsContainer.appendChild(noEventsMessage);
    }
    const addButton = document.createElement('button');
    addButton.id = 'add-new-event-button';
    addButton.textContent = 'Adicionar Atividade';
    eventDetailsContainer.appendChild(addButton);
}

function generateCalendar() {
    if (!calendarGrid) {
        console.error("ERRO CRÍTICO: #calendar-grid não encontrado para gerar calendário.");
        return;
    }
    calendarGrid.innerHTML = '';
    const daysInMonth = 31;
    const year = 2025;
    const monthIndex = 2; /*Contagem dos meses inicia em 0*/
    const startDayOfWeek = new Date(year, monthIndex, 1).getDay();

    for (let i = 0; i < startDayOfWeek; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("day", "empty");
        calendarGrid.appendChild(emptyDay);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.dataset.day = i;
        dayElement.innerHTML = `<span>${i}</span>`;
        dayElement.addEventListener("click", () => displayDayDetails(i));
        calendarGrid.appendChild(dayElement);
        updateCalendarDayDots(i);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (!eventDetailsContainer) {
        eventDetailsContainer = document.getElementById("event-details-section");
        if (!eventDetailsContainer) {
             console.error("ERRO CRÍTICO: Container #event-details-section não encontrado!");
             return;
        }
    }
    generateCalendar();

    eventDetailsContainer.addEventListener('click', (event) => {
        if (event.target && event.target.id === 'add-new-event-button') {
            const selectedDay = parseInt(eventDetailsContainer.dataset.selectedDay);
            if (selectedDay) {
                showAddEventForm(selectedDay);
            }
        }
    });
});
