const categories = [
    "Snack - Meal",
    "Near - Far",
    "Villain - Hero",
    "Good Movie - Bad Movie",
    "Simple - Complex Concept",
    "Fast - Slow",
    "Cold - Hot",
    "New Technology - Old Technology",
    "Healthy - Unhealthy",
    "Modern - Vintage",
    "Calm - Chaotic",
    "Quiet - Loud",
    "Easy - Hard",
    "Expensive - Cheap",
    "Sweet - Savory",
    "Short - Long",
    "Light - Dark",
    "Organized - Messy",
    "Clean - Dirty",
    "Big - Small",
    "Heavy - Light",
    "Friendly - Hostile",
    "Famous - Unknown",
    "Boring - Exciting",
    "Serious - Funny"
];

let voteTally = {};  // Store votes for each category
let currentCategory = "";
let players = ["Player1", "Player2", "Player3", "Player4"];  // Example player names
let currentTurn = 0; // Player turn counter
let hasVoted = false;

// Function to get 3 random categories from the list
function getRandomCategories() {
    const shuffled = categories.sort(() => 0.5 - Math.random()); // Shuffle categories randomly
    return shuffled.slice(0, 3); // Select the first three after shuffling
}

// Function to display random categories for voting
function displayRandomCategories() {
    const randomCategories = getRandomCategories(); // Get 3 random categories
    const categoriesContainer = document.getElementById('categories-vote'); // Ensure this element exists in HTML

    categoriesContainer.innerHTML = ''; // Clear any old categories displayed
    voteTally = {}; // Reset the tally for new vote session

    randomCategories.forEach((category) => {
        // Initialize vote tally for each category
        voteTally[category] = 0;

        const categoryButton = document.createElement('button');
        categoryButton.textContent = category;
        categoryButton.classList.add('category-button');

        const voteCount = document.createElement('span');
        voteCount.classList.add('vote-count');
        voteCount.textContent = voteTally[category];

        categoryButton.appendChild(voteCount);
        categoriesContainer.appendChild(categoryButton);

        categoryButton.onclick = () => handleVote(category, voteCount);
    });

    // Update current category text
    currentCategory = randomCategories[0];
    document.getElementById('category-name').textContent = currentCategory;

    // Display players
    displayPlayersTurn();
}

// Function to handle voting
function handleVote(category, voteCountElement) {
    if (hasVoted) return;  // Prevent voting if already voted

    voteTally[category]++;
    voteCountElement.textContent = voteTally[category];  // Update tally for the category

    hasVoted = true;  // Mark that the user has voted
}

// Function to display players around a circle (turn order)
function displayPlayersTurn() {
    const playersContainer = document.getElementById('players-circle');
    playersContainer.innerHTML = ''; // Clear previous players

    players.forEach((player, index) => {
        const playerElement = document.createElement('div');
        playerElement.classList.add('player');
        playerElement.textContent = player;

        if (index === currentTurn) {
            playerElement.style.backgroundColor = "#FF6347";  // Highlight current turn player
        }

        playersContainer.appendChild(playerElement);
    });
}

// Function to simulate player turns (bot logic)
function nextTurn() {
    currentTurn = (currentTurn + 1) % players.length; // Cycle through players
    displayPlayersTurn(); // Update player circle with new turn
    hasVoted = false; // Reset the voting status
}

// Start the game with the first round of categories
displayRandomCategories();

// Simulate turn after category vote (for now, we’ll call this manually)
setInterval(() => {
    nextTurn();  // Move to the next turn every few seconds (simulating player turns)
}, 5000);  // Change this interval as needed
