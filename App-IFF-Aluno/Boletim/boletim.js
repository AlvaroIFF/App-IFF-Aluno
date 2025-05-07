const disciplinas = [
  {
    nome: "Matemática",
    notas: [8.5, 9.0, 7.5],
    faltas: 3
  },
  {
    nome: "Português",
    notas: [9.0, 8.0, 9.5],
    faltas: 1
  },
  {
    nome: "Biologia",
    notas: [7.5, 6.0, 8.0],
    faltas: 2
  }
];

function criarCardDisciplina(disciplina) {
  const container = document.querySelector(".disciplinas-container");

  const card = document.createElement("div");
  card.className = "card-disciplina";

  const notasHTML = disciplina.notas.map((nota, index) =>
    `<li>Nota ${index + 1}: ${nota}</li>`
  ).join("");

  card.innerHTML = `
    <h3>${disciplina.nome}</h3>
    <ul>${notasHTML}</ul>
    <p><strong>Faltas:</strong> ${disciplina.faltas}</p>
  `;

  container.appendChild(card);
}

disciplinas.forEach(criarCardDisciplina);

const disciplinas = [
  {
    nome: "Matemática",
    professor: "Prof. João",
    nota: "8.5",
    frequencia: "95%",
  },
  {
    nome: "Português",
    professor: "Profa. Maria",
    nota: "9.0",
    frequencia: "98%",
  },
  {
    nome: "História",
    professor: "Prof. Carlos",
    nota: "7.8",
    frequencia: "92%",
  }
];

// Seleciona o container onde as disciplinas serão inseridas
const container = document.querySelector(".disciplinas-container");

// Para cada disciplina, cria e adiciona um bloco de HTML
disciplinas.forEach(disciplina => {
  const disciplinaDiv = document.createElement("div");
  disciplinaDiv.classList.add("disciplina");

  disciplinaDiv.innerHTML = `
    <h3>${disciplina.nome}</h3>
    <p><strong>Professor:</strong> ${disciplina.professor}</p>
    <p><strong>Nota:</strong> ${disciplina.nota}</p>
    <p><strong>Frequência:</strong> ${disciplina.frequencia}</p>
    <hr>
  `;

  container.appendChild(disciplinaDiv);
});
