// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

// Game variables
let playerScore = 0;
let aiScore = 0;
let goalScore = 3;
let round = 1;
let playerPoints = 0;
let ballSpeed = 5;
let playerPaddle = { width: 20, height: 100, x: 10, y: canvas.height / 2 - 50, speed: 10 };
let aiPaddle = { width: 20, height: 100, x: canvas.width - 30, y: canvas.height / 2 - 50, speed: 7 };
let balls = [{ x: canvas.width / 2, y: canvas.height / 2, radius: 10, dx: ballSpeed, dy: ballSpeed }];

// Power-ups (these can be expanded)
const powerUps = [
    { name: "Wider Paddle", effect: () => { playerPaddle.height += 20; }, cost: 5, rarity: "common" },
    { name: "Faster Paddle", effect: () => { playerPaddle.speed += 2; }, cost: 10, rarity: "rare" },
    { name: "Extra Ball", effect: () => { balls.push({ x: canvas.width / 2, y: canvas.height / 2, radius: 10, dx: ballSpeed, dy: ballSpeed }); }, cost: 15, rarity: "epic" }
];

// Game functions
function drawPaddle(paddle) {
    ctx.fillStyle = "white";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function updateBall(ball) {
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.dy = -ball.dy;
    if (ball.x - ball.radius < 0) {
        aiScore++;
        resetBall(ball);
    }
    if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        resetBall(ball);
    }
}

function resetBall(ball) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles and balls
    drawPaddle(playerPaddle);
    drawPaddle(aiPaddle);
    balls.forEach(ball => {
        drawBall(ball);
        updateBall(ball);
    });

    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
