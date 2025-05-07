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
