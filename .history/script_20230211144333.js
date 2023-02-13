/ Variables pour la taille du canvas et la taille des cellules
const canvasSize = 500;
const cellSize = 20;

// Variables pour la direction du serpent
let direction = "right";

// Variables pour la nourriture et la position du serpent
let food;
let snake = [];

// Variables pour le score et la vitesse du jeu
let score = 0;
let speed = 100;

// Initialisation du canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = canvasSize;
canvas.height = canvasSize;

// Initialisation du serpent
for (let i = 5; i >= 0; i--) {
  snake.push({ x: i, y: 0 });
}

// Fonction pour dessiner le serpent sur le canvas
function drawSnake() {
  snake.forEach((cell) => {
    ctx.fillStyle = "green";
    ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
  });
}

// Fonction pour générer une nouvelle nourriture
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvasSize / cellSize)),
    y: Math.floor(Math.random() * (canvasSize / cellSize)),
  };
}

// Fonction pour dessiner la nourriture sur le canvas
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

// Fonction pour mettre à jour la position du serpent
function updateSnakePosition() {
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "right") headX++;
  if (direction === "left") headX--;
  if (direction === "up") headY--;
  if (direction === "down") headY++;

  // Vérifier si le serpent mange la nourriture
  if (headX === food.x && headY === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }

  // Ajouter une nouvelle tête au serpent
  let newHead = { x: headX, y: headY };
  snake.unshift(newHead);
}

// Fonction pour vérifier si le serpent se mord la queue ou touche les bords
function checkCollision() {
  let headX = snake[0].x;
  let headY = snake[0].y;

  // Vérifier si le serpent touche les bords
  if (headX < 0 || headX >= canvasSize / cellSize) {
    clearInterval(gameInterval);
    alert("Game Over! Score: " + score);
  }
  if (headY < 0 || headY >= canvasSize / cellSize) {
    clearInterval(gameInterval);