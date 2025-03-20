let data = {}; // Stocker les données JSON
let cart = []; // Stocker les éléments du panier
let totalPrice = 0; // Prix total initialisé à 0

// Charger les données JSON
fetch('mcdo.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    data = json;
  })
  .catch(function(error) {
    console.error("Erreur : impossible de charger le fichier JSON.");
  });

let modal = document.getElementById("categoryModal");
let closeModal = document.querySelector(".close");
let categoryList = document.getElementById("categoryList");
let cartPanel = document.getElementById("cartPanel");
let cartItems = document.getElementById("cartItem");
let validateOrder = document.getElementById("validate");
let cancelOrder = document.getElementById("cancel");
let totalElement = document.getElementById("totalPrice"); // Élément pour afficher le prix total

// Fonction pour afficher une catégorie
function showCategory(category) {
  modal.style.display = "flex";

  // Vider la liste actuelle
  categoryList.innerHTML = "";

  // Créer des éléments pour chaque item de la catégorie
  if (data[category]) {
    for (let i = 0; i < data[category].length; i++) {
      let item = data[category][i];
      let itemDiv = document.createElement("div");
      itemDiv.className = "item";

      let img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;

      let details = document.createElement("div");
      details.innerHTML = "<h3>" + item.name + "</h3>" +
        "<p>" + (item.description || "") + "</p>" +
        "<p><strong>Prix :</strong> " + item.price + " €</p>" +
        "<button onclick='addToCart(\"" + category + "\", " + i + ")'>Ajouter au panier</button>";

      itemDiv.appendChild(img);
      itemDiv.appendChild(details);
      categoryList.appendChild(itemDiv);
    }
  }
}

// Fermer la modale
closeModal.addEventListener("click", function() {
  modal.style.display = "none";
});

// Afficher les modales pour chaque catégorie
document.getElementById("showBurgers").addEventListener("click", function() {
  showCategory("burgers");
});

document.getElementById("showSides").addEventListener("click", function() {
  showCategory("sides");
});

document.getElementById("showDrinks").addEventListener("click", function() {
  showCategory("drinks");
});

document.getElementById("showDesserts").addEventListener("click", function() {
  showCategory("desserts");
});

document.getElementById("showMenus").addEventListener("click", function() {
  showCategory("menus");
});

document.getElementById("showHappyMeals").addEventListener("click", function() {
  showCategory("happyMeal");
});

// Fonction pour ajouter un élément au panier
function addToCart(category, index) {
  let item = data[category][index];
  cart.push(item);
  totalPrice += item.price; // Ajouter le prix de l'article au total
  displayCart();
  updateTotalPrice(); // Mettre à jour le prix total
}

// Fonction pour afficher le panier
function displayCart() {
  cartItems.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = "<p><strong>" + item.name + "</strong></p>" +
      "<p>Prix : " + item.price + " €</p>";
    cartItems.appendChild(div);
  }
}

// Fonction pour mettre à jour le prix total
function updateTotalPrice() {
  totalElement.textContent = "Prix total : " + totalPrice.toFixed(2) + " €";
}

// Gérer le bouton "Valider commande"
validateOrder.addEventListener("click", function() {
  alert("Commande validée ! Prix total : " + totalPrice.toFixed(2) + " €");
  cart = [];
  totalPrice = 0; // Réinitialiser le prix total
  cartItems.innerHTML = "";
  updateTotalPrice(); // Mettre à jour le prix total à 0
});

// Gérer le bouton "Annuler commande"
cancelOrder.addEventListener("click", function() {
  alert("Commande annulée.");
  cart = [];
  totalPrice = 0; // Réinitialiser le prix total
  cartItems.innerHTML = "";
  updateTotalPrice(); // Mettre à jour le prix total à 0
});
