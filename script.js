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
let answers = []; // Store answers for each player

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

  // Start the first player's turn
  nextTurn();
}

// Function to handle the turn-based system
function nextTurn() {
  const currentPlayer = players[currentPlayerIndex];
  const answersContainer = document.getElementById("answers-container");

  // Show current player
  const currentPlayerDiv = document.createElement("div");
  currentPlayerDiv.classList.add("current-player");
  currentPlayerDiv.textContent = `${currentPlayer}'s Turn!`;

  // Display input field for the player to enter their answer
  const inputField = document.createElement("input");
  inputField.id = "player-answer";
  inputField.placeholder = `Enter your answer for "${selectedCategory.name}"`;

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.onclick = () => submitAnswer(inputField.value);

  // Add elements to the DOM
  answersContainer.innerHTML = ""; // Clear previous content
  answersContainer.appendChild(currentPlayerDiv);
  answersContainer.appendChild(inputField);
  answersContainer.appendChild(submitButton);
}

// Function to submit the current player's answer
function submitAnswer(answer) {
  const answersContainer = document.getElementById("answers-container");

  if (!answer) {
    alert("Please enter an answer!");
    return;
  }

  // Store the answer for the current player
  answers[currentPlayerIndex] = answer;

  // Display the answer in a list
  const answerDiv = document.createElement("div");
  answerDiv.classList.add("player-answer");
  answerDiv.textContent = `${players[currentPlayerIndex]}: ${answer}`;
  answersContainer.appendChild(answerDiv);

  // Move to the next player's turn
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

  // Proceed to the next turn
  if (currentPlayerIndex === 0) {
    // All players have answered, start the next phase (e.g., review answers or score)
    endRound();
  } else {
    nextTurn(); // Show the next player's turn
  }
}

// Function to handle the end of the round
function endRound() {
  const answersContainer = document.getElementById("answers-container");
  answersContainer.innerHTML = `<h2>Round Over!</h2><p>All answers are in!</p>`;

  // Display all players' answers
  answers.forEach((answer, index) => {
    const answerDiv = document.createElement("div");
    answerDiv.classList.add("all-answers");
    answerDiv.textContent = `${players[index]}: ${answer}`;
    answersContainer.appendChild(answerDiv);
  });

  // Optionally, you can add logic here for scoring or moving to the next round
}
