// Seleciona o elemento canvas e obtém o contexto de desenho 2D
var tela = document.querySelector('#mycanvas');
var pincel = tela.getContext('2d');

// Define a cor de fundo do canvas
pincel.fillStyle = 'lightgray';
pincel.fillRect(0, 0, 600, 400);

// Variáveis para o raio do alvo e coordenadas aleatórias
var raio = 10;
var xAleatorio;
var yAleatorio;

// Função para desenhar um círculo
function desenhaCirculo(x, y, raio, cor) {
    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}
// Função para limpar o canvas
function limpaTela() {
    pincel.clearRect(0, 0, 600, 400);
}
  // Função para desenhar o alvo
function desenhaAlvo(x, y) {
    desenhaCirculo(x, y, raio + 20, 'red');
    desenhaCirculo(x, y, raio + 10, 'white');
    desenhaCirculo(x, y, raio, 'red');
}
 // Função para sortear uma posição aleatória
function sorteiaPosicao(maximo) {
    return Math.floor(Math.random() * maximo);
}
// Função para atualizar o conteúdo do canvas
function atualizaTela() {
    limpaTela();
    xAleatorio = sorteiaPosicao(600);
    yAleatorio = sorteiaPosicao(400);
    desenhaAlvo(xAleatorio, yAleatorio);
}
// Intervalo padrão (1000 ms = 1 segundo)
var intervalo = 1000;

// Função para alterar o intervalo com base no valor do controle deslizante
function alteraIntervalo() {
    intervalo = parseInt(document.getElementById('intervalo').value);
    document.getElementById('intervaloValor').textContent = intervalo;
    clearInterval(timer); // Para o intervalo atual
    timer = setInterval(atualizaTela, intervalo); // Inicia um novo intervalo
}
    // Inicializa o intervalo com a função atualizaTela
    timer = setInterval(atualizaTela, intervalo);

function dispara(evento) {
    var x = evento.pageX - tela.offsetLeft;
    var y = evento.pageY - tela.offsetTop;

    if ((x > xAleatorio - raio) &&
        (x < xAleatorio + raio) &&
        (y > yAleatorio - raio) &&
        (y < yAleatorio + raio)) {
        alert('Acertou!');
    }
}

tela.onclick = dispara;
