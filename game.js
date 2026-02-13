let isGameOver = false;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;
const scoreEl = document.getElementById("score");
const overlay = document.getElementById("gameOverOverlay");
const finalScoreEl = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

let snake = [{ x: 150, y: 150 }];
let food = { x: 60, y: 60 };
let dx = 10;
let dy = 0;
let score = 0;

function drawGrid() {
  ctx.strokeStyle = "#222"; // color de los bordes
  ctx.lineWidth = 1;

  for (let x = 0; x <= canvas.width; x += 10) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += 10) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function draw() {
  if (paused || isGameOver) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();


  // Dibujar comida
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);
  // Dibujar serpiente
  ctx.fillStyle = "lime";
  snake.forEach((part) => ctx.fillRect(part.x, part.y, 10, 10));
  // Mover serpiente
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  // Comer comida
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
    food = {
      x: Math.floor(Math.random() * 30) * 10,
      y: Math.floor(Math.random() * 30) * 10,
    };
  } else {
    snake.pop();
  }
  // Colisiones
  // Colisiones
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snake.slice(1).some((p) => p.x === head.x && p.y === head.y)
  ) {
    gameOver();
  }
}
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    dx = 0;
    dy = -10;
  }
  if (e.key === "ArrowDown") {
    dx = 0;
    dy = 10;
  }
  if (e.key === "ArrowLeft") {
    dx = -10;
    dy = 0;
  }
  if (e.key === "ArrowRight") {
    dx = 10;
    dy = 0;
  }
});
let gameInterval = setInterval(draw, 100);
let paused = false;

function changeDirection(direction) {
  if (direction === "up" && dy === 0) {
    dx = 0;
    dy = -10;
  }
  if (direction === "down" && dy === 0) {
    dx = 0;
    dy = 10;
  }
  if (direction === "left" && dx === 0) {
    dx = -10;
    dy = 0;
  }
  if (direction === "right" && dx === 0) {
    dx = 10;
    dy = 0;
  }
}

const pauseBtn = document.getElementById("pauseBtn");

function togglePause() {
  paused = !paused;
  pauseBtn.textContent = paused ? "▶️ Reanudar" : "⏸️ Pausa";
}

pauseBtn.addEventListener("click", togglePause);
pauseBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  togglePause();
});

function gameOver() {
  if (isGameOver) return;

  isGameOver = true;
  paused = true;

  finalScoreEl.textContent = score;
  overlay.classList.remove("hidden");
}

function resetGame() {
  snake = [{ x: 150, y: 150 }];
  food = { x: 60, y: 60 };
  dx = 10;
  dy = 0;
  score = 0;

  scoreEl.textContent = score;

  paused = false;
  isGameOver = false;

  overlay.classList.add("hidden");
}

restartBtn.addEventListener("click", resetGame);
restartBtn.addEventListener("touchstart", e => {
  e.preventDefault();
  resetGame();
});
