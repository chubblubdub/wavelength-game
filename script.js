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
let maxVotes = 0;  // Track max votes for category

// Function to get 3 random categories from the list
function getRandomCategories() {
    const shuffled = categories.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

// Function to display random categories for voting
function displayRandomCategories() {
    const randomCategories = getRandomCategories();  
    const categoriesContainer = document.getElementById('categories-list'); 

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

    // Hide the category name until the voting phase is done
    document.getElementById('category-name').textContent = "";
    document.getElementById('current-category').style.display = 'block';  // Ensure the voting phase is visible
}

// Function to handle voting
function handleVote(category, voteCountElement) {
    if (hasVoted) return;

    voteTally[category]++;
    voteCountElement.textContent = voteTally[category];  

    hasVoted = true;

    // After voting, check for the selected category with highest votes
    const selectedCategory = Object.keys(voteTally).reduce((a, b) => voteTally[a] > voteTally[b] ? a : b);

    // If the selected category has the most votes, show it
    if (voteTally[selectedCategory] > maxVotes) {
        maxVotes = voteTally[selectedCategory];
        currentCategory = selectedCategory;
    }

    // Continue checking until there's a winner
    const checkVotes = setInterval(() => {
        const currentMaxVotes = Math.max(...Object.values(voteTally));
        const winnerCategory = Object.keys(voteTally).find(category => voteTally[category] === currentMaxVotes);

        if (currentMaxVotes > maxVotes) {
            clearInterval(checkVotes);  
            // Once category has highest votes, stop checking and display the result
            displaySelectedCategory(winnerCategory);
        }
    }, 1000);
}

// Function to display selected category after voting
function displaySelectedCategory(selectedCategory) {
    // Display the winning category
    document.getElementById('category-name').textContent = selectedCategory;
    document.getElementById('categories-list').style.display = 'none';  
    document.getElementById('current-category').style.display = 'none';  
    document.getElementById('game-phase').style.display = 'block';  

    // Show the current player's turn and initiate player cycle
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
        alert(`${players[currentTurn]} answered: ${playerAnswer}`);  

        nextTurn();
    }
};

// Function to simulate player turns
function nextTurn() {
    currentTurn = (currentTurn + 1) % players.length;  
    displayPlayersTurn();  

    if (currentTurn === 0) {
        alert("All players have submitted their answers.");
    }
}

// Start the game with the first round of categories
displayRandomCategories();
