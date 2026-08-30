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