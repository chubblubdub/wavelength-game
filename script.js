let username = '';
let gameCategory = '';
let isGuesser = false;
let players = [];
let currentPlayerIndex = 0;

function createOrJoinGame() {
  username = document.getElementById('username').value;
  if (username.trim() === '') {
    alert('Please enter a username!');
    return;
  }
  
  // Show the game section
  document.getElementById('username-section').style.display = 'none';
  document.getElementById('game-section').style.display = 'block';
  
  players.push(username);
  startGame();
}

function startGame() {
  // Start with category selection
  document.getElementById('category-section').style.display = 'block';
}

function chooseCategory(category) {
  gameCategory = category;
  // Hide category selection and move to guessing section
  document.getElementById('category-section').style.display = 'none';
  document.getElementById('guesser-section').style.display = 'block';
  
  // Simulate the arrow rotating through the players
  setTimeout(() => {
    rotateGuesser();
  }, 1500); // 15 seconds to vote on category, could also add timer
}

function rotateGuesser() {
  isGuesser = true;
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  const currentGuesser = players[currentPlayerIndex];

  alert(`${currentGuesser} is the guesser!`);
  document.getElementById('guesser-section').style.display = 'none';
  document.getElementById('guessing-section').style.display = 'block';
  
  // Show other players' input
  console.log('Category:', gameCategory);
  console.log('Players: ', players);
}

function submitGuess() {
  const guess = document.getElementById('guess-slider').value;
  alert(`You guessed: ${guess}`);
  // Process guess submission logic (e.g., compare with the actual value)
  // Update game state, inform other players, and rotate to the next round
  endTurn();
}

function endTurn() {
  isGuesser = false;
  document.getElementById('guessing-section').style.display = 'none';
  document.getElementById('guesser-section').style.display = 'block';
}
