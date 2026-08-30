let meals = [];
let selectedCuisine = "any";
let selectedEffort = "any";
let selectedBudget = "any";

// DOM elements
const cuisineButtons = document.querySelectorAll("[data-cuisine]");
const effortButtons = document.querySelectorAll("[data-effort]");
const budgetButtons = document.querySelectorAll("[data-budget]");
const decideButton = document.querySelector("#decideButton");
const mealName = document.querySelector("#mealName");
const mealTime = document.querySelector("#mealTime");
const mealBudget = document.querySelector("#mealBudget");
const mealEffort = document.querySelector("#mealEffort");
const mealProtien = document.querySelector("#mealProtien");
const ingredientsList = document.querySelector("#ingredients");

fetch("meals.json")
    .then(response => response.json())
    .then(data => {
        meals = data;

        // JSON has loaded
        decideButton.disabled = false;
    })
    .catch(error => {
        console.error(
            "Could not load meal data:",
            error
        );
    });

cuisineButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedCuisine = button.dataset.cuisine;

        updateSelectedButton(
            cuisineButtons,
            button
        );
    });
});

effortButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedEffort = button.dataset.effort;

        updateSelectedButton(
            effortButtons,
            button
        );
    });
});

budgetButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedBudget = button.dataset.budget;

        updateSelectedButton(
            budgetButtons,
            button
        );
    });
});

function updateSelectedButton(buttons, selectedButton) {
    buttons.forEach(button => {
        button.classList.remove("selected");
    });
    selectedButton.classList.add("selected");
}

function getMatchingMeals() {
    return meals.filter(meal => {
        const cuisineMatches =
            selectedCuisine === "any" ||
            meal.cuisine === selectedCuisine;

        const effortMatches =
            selectedEffort === "any" ||
            meal.effort === selectedEffort;

        const budgetMatches =
            selectedBudget === "any" ||
            meal.budget === selectedBudget;

        return (
            cuisineMatches &&
            effortMatches &&
            budgetMatches
        );
    });
}

function chooseMeal(mealList) {
    const randomIndex =
        Math.floor(Math.random() * mealList.length);
    return mealList[randomIndex];
}

function displayMeal(meal) {
    mealName.textContent = meal.name;
    mealTime.textContent = `${meal.time} minutes`;
    mealBudget.textContent = `${meal.budget}`;
    mealEffort.textContent = `${meal.effort}`;
    mealProtien.textContent = `${meal.protien}`;

    // Clear old ingredients
    ingredientsList.innerHTML = "";

    // Add ingredients
    meal.ingredients.forEach(ingredient => {
        const listItem = document.createElement("li");
        listItem.textContent = ingredient;
        ingredientsList.appendChild(listItem);
    });
}

decideButton.addEventListener("click", () => {
    const matchingMeals = getMatchingMeals();

    // No matching recipes
    if (matchingMeals.length === 0) {
        mealName.textContent = "No meals found!";
        mealTime.textContent = "";
        mealBudget.textContent = "";
        mealEffort.textContent = "";
        ingredientsList.innerHTML = "";
        return;
    }

    // Pick a random matching recipe
    const chosenMeal = chooseMeal(matchingMeals);
    displayMeal(chosenMeal); // Show the recipe
});