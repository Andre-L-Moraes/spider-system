function debounce(func, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

const marvelApiKey = '6c58873b283faec8811c4118bd20cc1a';
const privateKey = '030b831175b81344b404ed9a9dfd1a8d53ee5a21';
const hash = 'f1675e47e1b76518ffa10dd10b106ea9';
const limit = 100
const marvelURL = `https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&apikey=${marvelApiKey}&ts=1&hash=${hash}`


function getAllHeroes() {
    fetch(marvelURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação da API');
      }
      return response.json();
    })
    .then(data => {
      const heroes = data.data.results;
      setAllheroes(heroes);
      initializePurePajination();
    })
    .catch(error => console.error('Erro ao buscar dados da API:', error));
  
  }
  function setAllheroes(heroes) {
    const itemsContainer = document.querySelector(".items");
    itemsContainer.innerHTML = ""; // Limpa o conteúdo existente para começar do zero
  
    heroes.forEach(hero => {
      const item = document.createElement("div");
      item.classList.add("item");
      const imageUrl = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
      item.style.backgroundImage = `url(${imageUrl})`;
  
      // Crie um elemento <p> para o nome do personagem
      const nameElement = document.createElement("p");
      nameElement.textContent = hero.name;
  
      // Adicione um evento de clique à imagem
      item.addEventListener("click", function () {
        window.open(hero.urls[0].url, "_blank"); // Abre o URL do herói em uma nova janela
      });
      
  
      item.appendChild(nameElement);
      itemsContainer.appendChild(item);
    });
  
    // Remove qualquer elemento "item" extra que não corresponda aos heróis
    const items = document.querySelectorAll(".item");
    for (let i = heroes.length; i < items.length; i++) {
      items[i].style.display = "none";
    }
  }
  
  
  function searchHero() {
    const search = document.getElementById("search");
    const searchTerm = search.value.trim(); // Remove espaços em branco extras
  
    // Verifique se o campo de pesquisa não está vazio
    if (searchTerm !== "") {
      const searchURL = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchTerm}&limit=${limit}&apikey=${marvelApiKey}&ts=1&hash=${hash}`;
  
      fetch(searchURL)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na solicitação da API');
          }
          return response.json();
        })
        .then(data => {
          const heroes = data.data.results;
          setAllheroes(heroes);
          initializePurePajination();
        })
        .catch(error => console.error('Erro ao buscar dados da API:', error));
    }
  }

///// Original

let itms = 6; // itemsPerPage
let stpg = 1; // startPage
let pltd = 4; // pageLinksToDisplay
let winw = window.innerWidth; 

function optionsByWindowSize() {
  winw = window.innerWidth;
  if (winw > 1600) { itms = 6; stpg = 1; pltd = 4; }
  else if (winw > 1230) { itms = 5; stpg = 2; pltd = 4; }
  else if (winw > 980) { itms = 4; stpg = 3; pltd = 4; }
  else if (winw > 750) { itms = 3; stpg = 4; pltd = 4; }
  else if (winw > 510) { itms = 2; stpg = 5; pltd = 4; }
  else { itms = 1; stpg = 6; pltd = 1; }
}

//purePajination Script - START
function initializePurePajination() {
  if (document.readyState === "complete") {
    var gallery = new purePajinate({ 
      containerSelector: '.items',  
      itemSelector: '.items > div', 
      navigationSelector: '.pagination',
      wrapAround: true,
      pageLinksToDisplay: pltd,
      showFirstLast: true,
      navLabelPrev: '&nbsp;&nbsp;&nbsp;',
      navLabelNext: '&nbsp;&nbsp;&nbsp;',
      navLabelFirst: '&nbsp;&nbsp;&nbsp;',
      navLabelLast: '&nbsp;&nbsp;&nbsp;',
      itemsPerPage: itms,
    });
  }
}
  //purePajination Script - END
  
   function reportWindowSize() {

     //API
   getAllHeroes();

    //Original
   optionsByWindowSize();
   initializePurePajination();
  
}

document.onreadystatechange = reportWindowSize;				
window.onresize = reportWindowSize;
document.getElementById("search").addEventListener("input", debounce(searchHero, 800));
