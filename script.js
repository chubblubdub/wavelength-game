// Full list of categories with initial vote counts set to 0
let categories = [
  { name: 'Snack - Meal', votes: 0 },
  { name: 'Near - Far', votes: 0 },
  { name: 'Villain - Hero', votes: 0 },
  { name: 'Good Movie - Bad Movie', votes: 0 },
  { name: 'Simple - Complex Concept', votes: 0 },
  { name: 'Fast - Slow', votes: 0 },
  { name: 'Cold - Hot', votes: 0 },
  { name: 'New Technology - Old Technology', votes: 0 },
  { name: 'Healthy - Unhealthy', votes: 0 },
  { name: 'Modern - Vintage', votes: 0 },
  { name: 'Calm - Chaotic', votes: 0 },
  { name: 'Quiet - Loud', votes: 0 },
  { name: 'Easy - Hard', votes: 0 },
  { name: 'Expensive - Cheap', votes: 0 },
  { name: 'Sweet - Savory', votes: 0 },
  { name: 'Short - Long', votes: 0 },
  { name: 'Light - Dark', votes: 0 },
  { name: 'Organized - Messy', votes: 0 },
  { name: 'Clean - Dirty', votes: 0 },
  { name: 'Big - Small', votes: 0 },
  { name: 'Heavy - Light', votes: 0 },
  { name: 'Friendly - Hostile', votes: 0 },
  { name: 'Famous - Unknown', votes: 0 },
  { name: 'Boring - Exciting', votes: 0 },
  { name: 'Serious - Funny', votes: 0 }
];

// Track selected category
let selectedCategory = null;

// Track players and turn management
let players = ["Player 1", "Player 2", "Player 3", "Player 4"];
let currentPlayerIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  displayCategories();
});

// Function to display the categories and voting buttons
function displayCategories() {
  const categoryContainer = document.getElementById("categories-vote");
  categoryContainer.innerHTML = "";  // Clear any previous content

  // Create and display buttons for each category
  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.onclick = () => voteForCategory(index);
    categoryContainer.appendChild(button);
  });
}

// Function to handle voting for a category
function voteForCategory(index) {
  // Increment vote count for the selected category
  categories[index].votes++;

  // Hide the voting buttons
  const categoryContainer = document.getElementById("categories-vote");
  categoryContainer.innerHTML = "";  // Clear buttons

  // Check if one category has the most votes
  checkCategoryVotes();
}

// Function to check which category has the most votes
function checkCategoryVotes() {
  // Sort categories by vote count in descending order
  categories.sort((a, b) => b.votes - a.votes);

  // Get the category with the most votes
  selectedCategory = categories[0];

  // Display the selected category and start the game
  startGame();
}

// Function to start the game by displaying the selected category and player names
function startGame() {
  const categoryContainer = document.getElementById("categories-vote");
  const gameContainer = document.getElementById("game-phase");
  const playersContainer = document.getElementById("players-circle");

  // Display the selected category
  categoryContainer.innerHTML = `<h2>${selectedCategory.name}</h2>`;

  // Remove voting section and display player names
  gameContainer.style.display = "block";
  playersContainer.innerHTML = "";

  players.forEach(player => {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player");
    playerDiv.textContent = player;
    playersContainer.appendChild(playerDiv);
  });

  // Transition to the next part of the game (e.g., start the timer, enter answers, etc.)
  // For now, just show the player names in a circle
  displayNextTurn();
}

// Function to move to the next player's turn
function displayNextTurn() {
  const playersContainer = document.getElementById("players-circle");
  const playerDivs = playersContainer.getElementsByClassName("player");
  
  // Cycle to the next player in the list
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

  // Highlight the current player (you could style this further)
  for (let i = 0; i < playerDivs.length; i++) {
    playerDivs[i].style.backgroundColor = i === currentPlayerIndex ? "#FF6347" : "lightgray";
  }
}
