// Original categories list (for comparison)
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

  // Add each random category as a button
  randomCategories.forEach((category) => {
    const categoryButton = document.createElement('button');
    categoryButton.textContent = category;
    categoryButton.classList.add('category-button');
    categoriesContainer.appendChild(categoryButton);
  });
}

// Call this function to display the categories when needed (e.g., when players are ready to vote)
displayRandomCategories();
