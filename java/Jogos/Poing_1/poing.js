// Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// Velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

// Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Variável da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let Colidiu = false;

// Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Som do jogo
let raquetada;
let ponto;
let trilha;

/*
function preload() {
  raquetada = loadSound("raquetada.mp3"); // Substitua "raquetada.mp3" pelo nome do seu arquivo de som para raquetada
  ponto = loadSound("ponto.mp3"); // Substitua "ponto.mp3" pelo nome do seu arquivo de som para ponto
  trilha = loadSound("trilha.mp3"); // Se você tiver uma trilha sonora, descomente e carregue-a aqui
}*/

// Variável para controlar a rolagem da página
let pageScrollingEnabled = false;

function setup() {
  createCanvas(600, 400);
  
  // Desabilita a rolagem da página quando as setas são pressionadas
  window.addEventListener('keydown', function(event) {
    if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
      event.preventDefault();
      pageScrollingEnabled = false;
    }
  });

  // Habilita a rolagem da página quando as setas são liberadas
  window.addEventListener('keyup', function(event) {
    if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
      event.preventDefault();
      pageScrollingEnabled = true;
    }
  });
}

function draw() {
  background(0);
  mostrarBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificarColicaoRaquete(xRaquete, yRaquete);
  verificarColicaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluirPlacar();
  marcaPonto();
}

function mostrarBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width ||
    xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
    yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostrarRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (!pageScrollingEnabled) {
    if (keyIsDown(UP_ARROW)) {
      yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
      yRaquete += 10;
    }
  }
}

function verificarColisaoRaquete(x, y) {
  if (xBolinha - raio < x + raqueteComprimento && yBolinha - raio < y + raqueteAltura && y + raio > y) {
    velocidadeXBolinha *= -1;
    // raquetada.play();
  }
}

function verificarColicaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);

  if (colidiu) {
    velocidadeXBolinha *= -1;
    // raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
}

function incluirPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    // ponto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    // ponto.play();
  }
}
