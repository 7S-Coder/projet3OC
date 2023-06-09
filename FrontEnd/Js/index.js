const urlPosts = "http://localhost:5678/api/works";
const urlCategories = "http://localhost:5678/api/categories";
const portfolio = document.querySelector("#portfolio");
const gallery = document.querySelector(".gallery");
const btnDiv = document.createElement("div");
let ids;
btnDiv.classList.add("btnDiv");

init();

categoriesButtons(urlCategories);

function init() {
  fetch(urlPosts)
    .then((response) => response.json())
    .then((apiData) => {
      data = apiData;
      createPosts(data);
      categoryNames = [new Set(data.map((post) => post.category.name))];
    })
    .catch((error) => {
      console.error(error);
    });
}

function createPosts(data) {
  // allPosts = [data];
  for (let i = 0; i < data.length; i++) {
    const posts = data[i];
    // Récupération de l'élément du DOM qui accueillera les figures
    document.querySelector(".gallery");
    // Création d’une balise dédiée à un post
    const postElement = document.createElement("figure");
    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = posts.imageUrl;
    const descElement = document.createElement("figcaption");
    descElement.innerText = posts.title;

    // On rattache la balise figure a la section Fiches
    gallery.appendChild(postElement);
    // On rattache l’image à pieceElement (la balise article)
    postElement.appendChild(imageElement);
    postElement.appendChild(descElement);
  }
}

function toggleActiveClass(buttons, activeButton) {
  for (let button of buttons) {
    button.classList.remove("actif");
  }

  activeButton.classList.add("actif");
}

async function categoriesButtons(urlCategories) {
  const response = await fetch(urlCategories);
  const apiData = await response.json();
  const data = apiData;

  const btnDiv = document.createElement("div");
  btnDiv.classList.add("btnDiv");

  for (let categorie of data) {
    const buttonElement = document.createElement("button");
    buttonElement.innerText = categorie.name;
    buttonElement.classList = categorie.name;

    btnDiv.appendChild(buttonElement);
  }

  const portfolio = document.querySelector("#portfolio");
  portfolio.prepend(btnDiv);

  const allButtonElement = document.createElement("button");
  allButtonElement.innerText = "Tous";
  allButtonElement.style.cursor = "pointer";

  btnDiv.prepend(allButtonElement);

  const categoryButtons = btnDiv.querySelectorAll("button");

  for (let button of categoryButtons) {
    button.addEventListener("click", async function () {
      gallery.innerHTML = "";
      const filteredData = await getAllPostsByCategory(button.classList.value);
      createPosts(filteredData);

      toggleActiveClass(categoryButtons, button);
    });
  }

  allButtonElement.addEventListener("click", async function () {
    gallery.innerHTML = "";
    init();
  });
}

function getAllPostsByCategory(category = "") {
  let filteredData = data;

  if (category) {
    filteredData = data.filter((post) => post.category.name === category);
  }

  return filteredData;
}

async function getAllPosts() {
  const response = await fetch(urlPosts);
  const data = await response.json();
  return data;
}

function actifColor(constElement) {
  constElement.style.backgroundColor = "#1d6154";
  constElement.style.color = "white";
}
