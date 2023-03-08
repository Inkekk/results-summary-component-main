var listaScores = [];

async function fetchApi() {
  const conexao = await fetch("data.json");
  const conexaoConvertida = conexao.json();
  console.log(conexaoConvertida);
  conexaoConvertida.then((res) => {
    res.forEach((element) => {
      listaScores.push(element.score);
      const itemEl = document.createElement("li");
      const lista = document.getElementById("summary-list");
      criaTemplate(itemEl, element);
      lista.append(itemEl);
    });
    calculaScore().then((res) => {
      document.getElementById("score").textContent = res;
    });
  });
}

async function criaTemplate(item, elemento) {
  item.innerHTML = `<li>
      <div class="summary-container ${elemento.category.toLowerCase()}">
        <div>
          <img src='${elemento.icon}' alt="icon" />
          <h4>${elemento.category}</h4>
        </div>
        <p>${elemento.score}<span class="totalof">/100</span></p>
      </div>
    </li>`;
}

async function calculaScore() {
  const sum = listaScores.reduce((accumulator, item) => accumulator + item);
  return (sum / listaScores.length).toFixed();
}

fetchApi();
