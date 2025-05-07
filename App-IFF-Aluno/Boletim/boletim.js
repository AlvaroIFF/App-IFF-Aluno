const disciplinas = [
  {
    nome: "Matemática",
    professor: "Prof. João",
    av1: 8.5,
    av2: 7.0,
    av3: 9.0
  },
  {
    nome: "Português",
    professor: "Profa. Maria",
    av1: 9.0,
    av2: 8.5,
    av3: 9.5
  },
  {
    nome: "História",
    professor: "Prof. Carlos",
    av1: 7.0,
    av2: 6.5,
    av3: 8.0
  }
];

const container = document.querySelector(".disciplinas-container");

disciplinas.forEach(disciplina => {
  const media = ((disciplina.av1 + disciplina.av2 + disciplina.av3) / 3).toFixed(2);

  const disciplinaDiv = document.createElement("div");
  disciplinaDiv.classList.add("disciplina");

  disciplinaDiv.innerHTML = `
    <h3>${disciplina.nome}</h3>
    <p><strong>Professor:</strong> ${disciplina.professor}</p>
    <p>AV1: ${disciplina.av1}</p>
    <p>AV2: ${disciplina.av2}</p>
    <p>AV3: ${disciplina.av3}</p>
    <p><strong>Média Final:</strong> ${media}</p>
    <hr>
  `;

  container.appendChild(disciplinaDiv);
});
