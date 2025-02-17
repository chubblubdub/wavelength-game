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

let voteTally = {};  
let currentCategory = "";
let players = ["Player1", "Player2", "Player3", "Player4"];  
let currentTurn = 0; 
let hasVoted = false;
let answers = {}; // Store player answers

// Function to get 3 random categories from the list
function getRandomCategories() {
    const shuffled = categories.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

// Function to display random categories for voting
function displayRandomCategories() {
    const randomCategories = getRandomCategories();  
    const categoriesContainer = document.getElementById('categories-vote'); 

    categoriesContainer.innerHTML = '';  
    voteTally = {};  

    randomCategories.forEach((category) => {
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

    // Hide the voting UI after category selection
    document.getElementById('category-name').textContent = "Select a category";
    document.getElementById('current-category').style.display = 'block';
}

// Function to handle voting
function handleVote(category, voteCountElement) {
    if (hasVoted) return;

    voteTally[category]++;
    voteCountElement.textContent = voteTally[category];  

    hasVoted = true;

    // After voting, determine the selected category with highest votes
    const selectedCategory = Object.keys(voteTally).reduce((a, b) => voteTally[a] > voteTally[b] ? a : b);

    // Now, show the selected category
    document.getElementById('category-name').textContent = selectedCategory;

    // Hide the category voting and display the game phase
    document.getElementById('categories-vote').style.display = 'none';
    document.getElementById('current-category').style.display = 'none';
    document.getElementById('game-phase').style.display = 'block';
    document.getElementById('game-category').textContent = selectedCategory;
    document.getElementById('current-player').textContent = `It's ${players[currentTurn]}'s turn!`;

    displayPlayersTurn();
}

// Function to display players around a circle (turn order)
function displayPlayersTurn() {
    const playersContainer = document.getElementById('players-circle');
    playersContainer.innerHTML = ''; 

    players.forEach((player, index) => {
        const playerElement = document.createElement('div');
        playerElement.classList.add('player');
        playerElement.textContent = player;

        if (index === currentTurn) {
            playerElement.style.backgroundColor = "#FF6347";
        }

        playersContainer.appendChild(playerElement);
    });
}

// Function to handle player submitting their answer
document.getElementById('submit-answer').onclick = () => {
    const playerAnswer = document.getElementById('answer-input').value;
    if (playerAnswer.trim() !== "") {
        answers[players[currentTurn]] = playerAnswer;
        alert(`${players[currentTurn]} answered: ${playerAnswer}`);  // Show answer for now

        nextTurn();
    }
};

// Function to simulate player turns
function nextTurn() {
    currentTurn = (currentTurn + 1) % players.length;  
    displayPlayersTurn();  

    if (currentTurn === 0) {
        // Optionally, add logic to proceed to next round or phase
        alert("All players have submitted their answers.");
    }
}

// Start the game with the first round of categories
displayRandomCategories();
