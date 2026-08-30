let meals = [];
let selectedCuisine = "any";
let selectedEffort = "any";
let selectedBudget = "any";

// Load meal data
fetch("meals.json")
    .then(Response => Response.json())
    .then(data=> {
        meals = data;
    })
    .catch(error => {
        console.error("Could not load meal data:", error);
    })

// DOM elements
const cuisineButtons = document.querySelectorAll("[data-cuisine]");
const effortButtons = document.querySelectorAll("[data-effort]");
const budgetButtons = document.querySelectorAll("[data-budget]");
const decideButton = document.querySelector("#decideButton");
const mealName = document.querySelector("#mealName");
const mealTime = document.querySelector("#mealTime");
const mealBudget = document.querySelector("#mealBudget");
const mealEffort = document.querySelector("#mealEffort");
const ingredientsList = document.querySelector("#ingredients");

// Load meal data
fetch("meals.json")
    .then(response => response.json())

    .then(data => {
        meals = data;
        // json has loaded and the user can now use the decide button
        decideButton.disabled = false;
    })

    .catch(error => {
        console.error(
            "Could not load meal data:",
            error
        );
    });