import { Pixel } from './Pixel.js';
import { Snake } from './Snake.js';

const playarea = document.getElementById('playarea');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const playerSelector = document.getElementById('select-player');
const gameoverText = document.getElementById('gameover-text');

const pixels = [];

let game;
let snake;
let direction = 'up';
let currentScore = 0;
let highScore = 0;
let difficulty = 75;
let startingLength = 5;

export { pixels };

/* ------------------------------------------- */
/* ------ FUNCTIONS -------------------------- */
/* ------------------------------------------- */

const getRandomPixel = () => {
    const x = Math.floor(Math.random() * 50);
    const y = Math.floor(Math.random() * 50);

    return pixels[x][y];
}

const generateFood = () => {
    let pixel;
    do {
        pixel = getRandomPixel();
    } while (pixel.isSnake());
    pixel.addFood();
}

function gameOver() {
    clearInterval(game);
    currentScore = 0;
    gameoverText.classList.remove('d-none');
    snake.blink();
}

function gameplay() {
    const updateScore = score => {
        scoreDisplay.innerText = score;
        if (score > highScore) {
            highScoreDisplay.innerText = highScore = score;
        }
    }

    let nextPixel;

    switch (direction) {
        case 'down':
            nextPixel = snake.lookDown();
            break;
        case 'left':
            nextPixel = snake.lookLeft();
            break;
        case 'right':
            nextPixel = snake.lookRight();
            break;
        default:
            nextPixel = snake.lookUp();
    }

    if (nextPixel.isFood()) {
        snake.eat();
        generateFood();
        currentScore++;
    } else if (nextPixel.isSnake()) {
        gameOver();
        return;
    }

    snake.move();
    updateScore(currentScore);
}

function startGame() {

    gameoverText.classList.add('d-none');
    clearInterval(game);

    for (let row of pixels) {
        for (let pixel of row) {
            pixel.clearAll();
        }
    }

    snake = null;
    direction = 'up';

    const head = getRandomPixel();
    snake = new Snake(head);
    snake.grow(startingLength);

    generateFood();

    game = setInterval(gameplay, difficulty)
}

/* ------------------------------------------- */
/* ------ MAIN ------------------------------- */
/* ------------------------------------------- */

// Generate the playarea only once on page load
for (let i = 0; i < 50; i++) {
    pixels[i] = [];
    for (let j = 0; j < 50; j++) {
        const pixelElement = document.createElement('div');
        pixelElement.className = 'pixel';
        playarea.appendChild(pixelElement);

        const pixel = new Pixel(pixelElement, i, j);

        pixels[i][j] = pixel;
    }
}

startGame();


window.addEventListener('keydown', (event) => {

    switch (event.key) {
        case 'ArrowUp':
            if (direction === 'down') break;
            direction = 'up';
            break;
        case 'ArrowRight':
            if (direction === 'left') break;
            direction = 'right';
            break;
        case 'ArrowDown':
            if (direction === 'up') break;
            direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction === 'right') break;
            direction = 'left';
            break;
    }
})

window.addEventListener('keypress', (event) => {
    if (event.key === ' ') {
        gameOver();
        startGame();
    }
})