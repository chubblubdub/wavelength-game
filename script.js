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
let timer = 15; // Timer for voting
let interval;
let hasVoted = false;

// Function to get 3 random categories from the list
function getRandomCategories() {
    const shuffled = categories.sort(() => 0.5 - Math.random()); // Shuffle categories randomly
    return shuffled.slice(0, 3); // Select the first three after shuffling
}

// Function to display the random categories for voting
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

    startTimer();
}

// Function to handle voting
function handleVote(category, voteCountElement) {
    if (hasVoted) return;  // Prevent voting if already voted

    voteTally[category]++;
    voteCountElement.textContent = voteTally[category];  // Update tally for the category

    hasVoted = true;  // Mark that the user has voted
}

// Timer countdown function
function startTimer() {
    interval = setInterval(() => {
        timer--;
        document.getElementById('timer').textContent = timer;  // Update timer on screen

        if (timer <= 0) {
            clearInterval(interval);  // Stop the timer
            disableVoting();  // Disable further voting
        }
    }, 1000);
}

// Function to disable voting after the timer ends
function disableVoting() {
    const buttons = document.querySelectorAll('.category-button');
    buttons.forEach(button => button.disabled = true);  // Disable all category buttons

    // Optionally, you can show the final tallies after voting ends
    console.log("Final Tallies:", voteTally);
}

// Call this function to display the categories when the page loads
displayRandomCategories();
