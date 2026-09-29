console.log("helloooo");

function getColor(type) {
  switch (type) {
    case "Acier":
      return "#B7B7CE";
    case "Combat":
      return "#C22E28";
    case "Dragon":
      return "#6F35FC";
    case "Eau":
      return "#6390F0";
    case "Électrik":
      return "#F7D02C";
    case "Fée":
      return "#D685AD";
    case "Feu":
      return "#EE8130";
    case "Glace":
      return "#96D9D6";
    case "Insecte":
      return "#A6B91A";
    case "Normal":
      return "#A8A77A";
    case "Plante":
      return "#7AC74C";
    case "Poison":
      return "#A33EA1";
    case "Psy":
      return "#F95587";
    case "Roche":
      return "#B6A136";
    case "Sol":
      return "#E2BF65";
    case "Spectre":
      return "#735797";
    case "Ténèbres":
      return "#705746";
    case "Vol":
      return "#A98FF3";
    default:
      return "#A8A878";
  }
}

async function loadData(numero) {
  const reponse = await fetch(`https://tyradex.app/api/v1/gen/${numero}`);
  const data = await reponse.json();
  let list = document.querySelector("main");
  document
    .querySelectorAll("main article")
    .forEach((article) => article.remove());
  data.forEach((pokemon) => {
    let mainType = pokemon.types?.[0]?.name;
    let typesSpans = (pokemon.types ?? [])
      .map(
        (type) =>
          `<span class="types" style="background-color: ${getColor(type.name)}">${type.name}</span>`,
      )
      .join("");
    let newArticle = document.createElement("article");
    newArticle.style.backgroundColor = getColor(mainType);
    newArticle.style.borderColor = getColor(mainType);
    getColor(newArticle);
    newArticle.dataset.types =
      pokemon.types?.map((t) => t.name).join("|") ?? "";
    newArticle.innerHTML = `<figure>
          <picture>
            <img src=${pokemon.sprites.regular} alt="Image Pokemon" />
          </picture>
          <figcaption>
          <div class="types-container">${typesSpans}</div>
            <h2>${pokemon.name.fr}</h2>
            <ol>
              <li>Points de vie : ${pokemon.stats.hp}</li>
              <li>Attaque : ${pokemon?.stats?.atk}</li>
              <li>Défense : ${pokemon.stats.def}</li>
              <li>Attaque spécial : ${pokemon.stats.spe_atk}</li>
              <li>Vitesse : ${pokemon.stats.vit}</li>
            </ol>
          </figcaption>
        </figure>`;

    list.appendChild(newArticle);
  });
  applyTypeFilter();
}

let select = document.querySelector("select");
select.addEventListener("change", function () {
  console.log(select.value);
  loadData(select.value);
});

let selectType = document.querySelector("#type");

function applyTypeFilter() {
  const typeChoisi = selectType.value;
  document.querySelectorAll("main article").forEach((article) => {
    const types = article.dataset.types.split("|");
    article.style.display =
      typeChoisi === "" || types.includes(typeChoisi) ? "" : "none";
  });
}

selectType.addEventListener("change", function () {
  console.log(selectType.value);
  applyTypeFilter();
});

loadData(1);
