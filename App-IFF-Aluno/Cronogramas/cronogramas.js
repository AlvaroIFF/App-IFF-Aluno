const semestreAtual = "2025.1";

const disciplinas = [
  "Matemática Discreta",
  "Estrutura de Dados",
  "Linguagens Formais",
  "Programação Web",
  "Banco de Dados",
  "Engenharia de Software"
];

document.getElementById("semestre").textContent = `Semestre Atual: ${semestreAtual}`;

const container = document.querySelector(".disciplinas-cronograma");

disciplinas.forEach(nome => {
  const div = document.createElement("div");
  div.classList.add("disciplina-item");
  div.textContent = nome;
  container.appendChild(div);
});
