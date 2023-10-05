const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
let gameInterval;
let playerScore = 0;
let computerScore = 0;
let isMuted = false;

// Adicione um ouvinte de evento ao botão de mute
const muteButton = document.getElementById('muteButton');
muteButton.addEventListener('click', toggleMute);

// Função para alternar entre mute e desmute
function toggleMute() {
const sounds = document.querySelectorAll('audio');

sounds.forEach(sound => {
sound.muted = !sound.muted;
});

if (isMuted) {
muteButton.textContent = 'Som Ligado';
} else {
muteButton.textContent = 'Mudo';
}

isMuted = !isMuted;
}

// Configuração das raquetes
const paddleWidth = 10;
const paddleHeight = 100;
let playerY = (canvas.height - paddleHeight) / 2;
let computerY = (canvas.height - paddleHeight) / 2;
const playerPaddleSpeed = 10; // Velocidade da raquete do jogador
const computerPaddleSpeed = 4.5; // Velocidade da raquete do adversário (computador)

// Configuração da bola
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Função para desenhar as raquetes
function drawPaddle(x, y) {
  ctx.fillStyle = '#8d0606';
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Função para desenhar a bola
function drawBall(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = '#8d0606';
  ctx.fill();
  ctx.closePath();
}

// Função para atualizar a exibição da pontuação na tela
function updateScore() {
  const playerScoreElement = document.getElementById('playerScore');
  const computerScoreElement = document.getElementById('computerScore');

  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}

// Função principal do jogo
function gameLoop() {

    // Dentro da função gameLoop(), quando um ponto é marcado (bola sai da tela):
    if (ballX < 0) {
    // Ponto do computador
    computerScore++;
    updateScore();
    // Tocar o som de ponto
    const pointSound = document.getElementById('pointSound');
    pointSound.play();
    }

    if (ballX > canvas.width) {
    // Ponto do jogador
    playerScore++;
    updateScore();
    // Tocar o som de ponto
    const pointSound = document.getElementById('pointSound');
    pointSound.play();
    }

  // Limpar o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Movimentar a bola
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Movimentar as raquetes
  if (playerY < 0) playerY = 0;
  if (playerY > canvas.height - paddleHeight) playerY = canvas.height - paddleHeight;
  if (computerY < 0) computerY = 0;
  if (computerY > canvas.height - paddleHeight) computerY = canvas.height - paddleHeight;

  // Colisão com as raquetes
  if (
    ballX < paddleWidth &&
    ballY > playerY &&
    ballY < playerY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    // Tocar o som de ponto
    const pointSound = document.getElementById('collisionSound');
    pointSound.play();
  }

  if (
    ballX > canvas.width - paddleWidth &&
    ballY > computerY &&
    ballY < computerY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    // Tocar o som de ponto
    const pointSound = document.getElementById('collisionSound');
    pointSound.play();
  }

  // Colisão com as bordas superior e inferior
  if (ballY < 0 || ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Verificar se a bola saiu da tela
  if (ballX < 0) {
    // Ponto do computador
    computerScore++;
    updateScore();
    // Reiniciar a posição da bola
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5;
    ballSpeedY = 5;
    // Tocar o som de ponto
    const pointSound = document.getElementById('pointSound');
    pointSound.play();
  }

  if (ballX > canvas.width) {
    // Ponto do jogador
    playerScore++;
    updateScore();
    // Reiniciar a posição da bola
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5;
    ballSpeedY = 5;
    // Tocar o som de ponto
    const pointSound = document.getElementById('pointSound');
    pointSound.play();
  }

  // Movimentar a raquete do computador automaticamente
  if (ballY > computerY + paddleHeight / 2) {
    computerY += computerPaddleSpeed;
  } else {
    computerY -= computerPaddleSpeed;
  }

  // Desenhar as raquetes e a bola
  drawPaddle(0, playerY);
  drawPaddle(canvas.width - paddleWidth, computerY);
  drawBall(ballX, ballY);
}

// Função para iniciar/reiniciar o jogo
function startGame() {
  playerScore = 0;
  computerScore = 0;
  playerY = (canvas.height - paddleHeight) / 2;
  computerY = (canvas.height - paddleHeight) / 2;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 5;
  ballSpeedY = 5;

  if (gameInterval) {
    clearInterval(gameInterval);
  }

  gameInterval = setInterval(gameLoop, 1000 / 60); // Define a taxa de atualização do jogo (60 quadros por segundo)

  // Tocar o som de início
  const startSound = document.getElementById('startSound');
  startSound.play();

  // Atualizar a exibição da pontuação
  updateScore();
}

// Adicionar event listeners para capturar os eventos de teclado
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp') {
    playerY -= playerPaddleSpeed;
  } else if (event.key === 'ArrowDown') {
    playerY += playerPaddleSpeed;
  }
});

// Impedir que a página role quando as teclas de seta são pressionadas
window.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();
  }
});

// Adicionar um ouvinte de evento para o botão de início/reinício
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);

// Iniciar o jogo inicialmente
startGame();