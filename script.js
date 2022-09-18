//board
let blockSize = 27;
let rows = 20;
let cols = 20;
let board;
let context;

//snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

//apple
let appleX;
let appleY;

let gameOver = false;


window.onload = function () {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d'); //used for drawing on the board

    placeApple();
    document.addEventListener('keyup', changeDirection);
    // update();
    setInterval(update, 1000/10); //100mls
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = 'HoneyDew';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "crimson";
    context.fillRect(appleX, appleY, blockSize, blockSize);

    if (snakeX == appleX && snakeY == appleY) {
        snakeBody.push([appleX, appleY])
        placeApple();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = 'ForestGreen';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize)
    for (let i = 0; i < snakeBody.length; i++) {
         context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        alert('Game Over');
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection (e) {
    if (e.code === 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code === "ArrowDown" && velocityY != -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (e.code === "ArrowLeft" && velocityX != 1) {
      velocityX = -1;
      velocityY = 0;
    } else if (e.code === "ArrowRight" && velocityX != -1) {
      velocityX = +1;
      velocityY = 0;
    }
}

function placeApple () {
    appleX = Math.floor(Math.random() * cols) * blockSize;
    appleY = Math.floor(Math.random() * rows) * blockSize;
}