const dadosBoletim = [
  {
    nome: "Matemática",
    notas: [8.5, 9.0, 7.5],
    faltas: 3
  },
  {
    nome: "Português",
    notas: [9.0, 8.0, 9.5],
    faltas: 1
  }
];

function renderizarBoletim() {
  const container = document.getElementById("quadroNotas");
  dadosBoletim.forEach(disciplina => {
    const div = document.createElement("div");
    div.className = "disciplina";

    const notasFormatadas = disciplina.notas.map(n => `<li>Nota: ${n}</li>`).join("");
    div.innerHTML = `
      <h3>${disciplina.nome}</h3>
      <ul>${notasFormatadas}</ul>
      <p>Faltas: ${disciplina.faltas}</p>
    `;
    container.appendChild(div);
  });
}

renderizarBoletim();
