// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
let playerScore = 0;
let goalScore = 3; // Score to complete a round
let roundInProgress = true; // Tracks if a round is currently being played

// Shop variables
const shop = document.getElementById("shop");
const skipShopButton = document.getElementById("skipShop");

// Function to open the shop
function openShop() {
    shop.style.display = 'block'; // Show shop
    roundInProgress = false; // Stop the round while in shop
}

// Function to close the shop and continue to the next round
function closeShop() {
    shop.style.display = 'none'; // Hide shop
    startNextRound(); // Start the next round
}

// Add event listener for the "Skip Shop" button
skipShopButton.addEventListener('click', closeShop);

// Function to start the next round
function startNextRound() {
    console.log("Starting next round");
    playerScore = 0; // Reset player score
    goalScore += 2;  // Increase the goal score for the next round
    roundInProgress = true; // Resume game
    // You can add more logic here to increase difficulty
}

// Simple game loop for now (for demo purposes)
function gameLoop() {
    if (roundInProgress) {
        // Basic gameplay logic
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        // Simulate scoring (for demo)
        playerScore++;

        // Check if player reached the goal score
        if (playerScore >= goalScore) {
            console.log("Round completed!");
            openShop(); // Open shop after round
        }

        // Draw score
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + playerScore, 10, 20);
        ctx.fillText("Goal: " + goalScore, 10, 50);
    }

    requestAnimationFrame(gameLoop); // Continue game loop
}

// Start the game loop
gameLoop();
