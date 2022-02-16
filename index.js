// Challenge #1
// Fetch all the menu items from http://localhost:3000/menu. 
// For each menu item create a span element that contains the name of 
// the menu item, and add it to the #menu-items div.

// Challenge #2
// When the page loads, display the first menu item. You should set 
// the image, name, description, and price. All the correct elements to 
// set are located in the #dish section element.

// Challenge #3
// When the user clicks on the menu items on the left, they should see 
// all the details for that specific menu item.

// Challenge #4
// The user should be able to add the menu items to their cart. 
// When the user presses the 'Add to Cart' button, that number 
// should be added to however many are currently in the cart.

// For example, if there are currently 2 burritos in the cart, and 
// the user adds 2 more, the total should be 4. 

let meals = [];
let currentMeal;


fetch('http://localhost:3000/menu')
.then(res => res.json())
.then(menuData => {
  meals = menuData;
  showDetails(meals[0])

  showAllNames();

  updateCart();
  }); 


function showAllNames() {
    meals.forEach(meal => {
        addToNavBar(meal)
    });
}

function addToNavBar(meal) {
    let elementNameDiv = document.querySelector('#menu-items');
    let elementNameSpan = document.createElement('span');
    elementNameSpan.textContent = meal.name;
    elementNameDiv.appendChild(elementNameSpan);

    elementNameSpan.addEventListener('click', e => {
        showDetails(meal);
    })
}

function showDetails(meal) {
    currentMeal = meal;

    let imgHolder = document.querySelector('#dish-image');
    let dishDescription= document.querySelector('#dish-description');
    let dishName = document.querySelector('#dish-name');
    let dishPrice = document.querySelector('#dish-price');
    let cartAmount = document.querySelector('#number-in-cart');

    imgHolder.src = meal.image;
    dishDescription.textContent = meal.description;
    dishName.textContent = meal.name;
    dishPrice.textContent = meal.price;
    cartAmount.textContent = meal.number_in_bag;
}

function updateCart() {
    let form = document.querySelector('#cart-form');
    form.addEventListener('submit', e => {
        e.preventDefault();

        const amountToAdd = e.target['cart-amount'].value;

        currentMeal.number_in_bag += parseInt(amountToAdd);

        let cartNumber = document.querySelector('#number-in-cart');

        cartNumber.textContent = currentMeal.number_in_bag;

        e.target.reset();
    })
}