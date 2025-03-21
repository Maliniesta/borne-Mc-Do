<<<<<<< HEAD
let data = []; // Stocker les données JSON
let cart = []; // Stocker les éléments du panier
let totalPrice = 0; // Prix total initialisé à 0
=======
// Stocker les données JSON
let data = {}; 
// Stocker les éléments du panier
let cart = []; 
// Prix total initialisé à 0
let totalPrice = 0; 
>>>>>>> c8afc1718c67cfc688f0916b5831095aa5bc5181

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
// recupération d'élément dans le DOM
let modal = document.getElementById("categoryModal");
let closeModal = document.querySelector(".close");
let categoryList = document.getElementById("categoryList");
let cartPanel = document.getElementById("cartPanel");
let cartItems = document.getElementById("cartItem");
let validateOrder = document.getElementById("validate");
let cancelOrder = document.getElementById("cancel");
let totalElement = document.getElementById("totalPrice"); 

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

      // Ajouter l'image et les détails à la div de l'item
      itemDiv.appendChild(img);
      itemDiv.appendChild(details);

      // Ajouter l'itemDiv à la liste de la catégorie
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
  if (category === "happyMeal") {
    chooseToyOrBook(index); // Appelle la fonction pour choisir l'option
  } else {
    let item = data[category][index];
    cart.push(item);
    totalPrice += item.price; // Ajouter le prix de l'article au total
    displayCart();
    updateTotalPrice(); // Mettre à jour le prix total
  }
}

// Fonction pour retirer un élément du panier
function removeFromCart(index) {
  let item = cart[index];
  totalPrice -= item.price; // Soustraire le prix de l'article du total
  cart.splice(index, 1); // Retirer l'article du panier
  displayCart();
  updateTotalPrice(); // Mettre à jour le prix total
}

// Fonction pour créer un élément HTML pour un article du panier
function createCartItemElement(item, index) {
  let div = document.createElement("div");
  div.className = "cart-item";

  let itemName = document.createElement("p");
  itemName.innerHTML = "<strong>" + item.name + "</strong>";
  div.appendChild(itemName);

  let itemPrice = document.createElement("p");
  itemPrice.textContent = "Prix : " + item.price + " €";
  div.appendChild(itemPrice);

  let removeButton = document.createElement("button");
  removeButton.classList.add("delet");
  removeButton.textContent = "Retirer";
  removeButton.addEventListener("click", function() {
    removeFromCart(index);
  });
  div.appendChild(removeButton);

  return div;
}

// Fonction pour afficher le panier
function displayCart() {
  cartItems.innerHTML = ""; // Réinitialiser l'affichage du panier
  cart.forEach(function(item, index) {
    let cartItemElement = createCartItemElement(item, index);
    cartItems.appendChild(cartItemElement);
  });
}

// Fonction pour mettre à jour le prix total
function updateTotalPrice() {
  totalElement.textContent = "Prix total : " + totalPrice.toFixed(2) + " €";
}

<<<<<<< HEAD
 // Gérer le bouton "Valider commande"
 validateOrder.addEventListener("click", function() {
  showOrderSummary(); // Afficher la modale du récapitulatif
  cart = []; // Réinitialiser le panier après validation
  totalPrice = 0; // Réinitialiser le total
  cartItems.innerHTML = ""; // Réinitialiser l'affichage du panier
  updateTotalPrice(); // Mettre à jour l'affichage du prix total
=======
// Gérer le bouton "Valider commande"
validateOrder.addEventListener("click", function() {
  // to fixed(2) formate le nombre apres la virgule a 2
  alert("Commande validée ! Prix total : " + totalPrice.toFixed(2) + " €");
  cart = [];
  totalPrice = 0; // Réinitialiser le prix total
  cartItems.innerHTML = "";
  updateTotalPrice(); // Mettre à jour le prix total à 0
>>>>>>> c8afc1718c67cfc688f0916b5831095aa5bc5181
});




// Gérer le bouton "Annuler commande"
cancelOrder.addEventListener("click", function() {
  alert("Commande annulée.");
  cart = [];
  totalPrice = 0; // Réinitialiser le prix total
  cartItems.innerHTML = "";
  updateTotalPrice(); // Mettre à jour le prix total à 0
});

// Gestion des diapositives pour le carrousel
const slide = [
  "image-mc-do/carousel/pub1.jpg",
  "image-mc-do/carousel/pub3.jpg",
  "image-mc-do/carousel/pub4.jpg"
];
let number = 0;

function ChangeSlide(sens) {
  number = number + sens;
  if (number >= slide.length) number = 0;
  if (number < 0) number = slide.length - 1;
  document.getElementById("carousel").src = slide[number];
}

setInterval(function() {
  ChangeSlide(1);
}, 3000);

// Fonction pour gérer le choix Jouet ou Livre
function chooseToyOrBook(happyMealIndex) {
  const modal = document.createElement("div");
  modal.className = "modal-happy";
  modal.style.display = "flex";

  modal.innerHTML = `
    <div class="modal-content">
      <h3>Choisissez une option pour votre Happy Meal :</h3>
      <button id="chooseToy">Jouet Pokémon</button>
      <button id="chooseBook">Livre Disney</button>
    </div>
  `;
  document.body.appendChild(modal);

  function handleSelection(toyChoice) {
    const selectedItem = { ...data.happyMeal[happyMealIndex], toy: toyChoice };
    cart.push(selectedItem);
    totalPrice += selectedItem.price;
    updateTotalPrice();
    displayCart();
    modal.remove(); // Fermer la modale après la sélection
  }

  document.getElementById("chooseToy").addEventListener("click", function() {
    handleSelection("Jouet Pokémon");
  });

  document.getElementById("chooseBook").addEventListener("click", function() {
    handleSelection("Livre Disney");
  });
}


// Fonction pour générer un numéro de table
function generateTableNumber() {
  const min = 50; // Limite inférieure
  const max = 999; // Limite supérieure
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction pour afficher la modale de récapitulatif
function showOrderSummary() {
  // Créer une modale
  const modal = document.createElement("div");
  modal.className = "modal-sell";
  modal.style.display = "flex";

  // Contenu de la modale
  const tableNumber = generateTableNumber();
  let orderItems = "";
  cart.forEach(function (item) {
    orderItems += `<li>${item.name} - ${item.price.toFixed(2)} €</li>`;
  });

  modal.innerHTML = `
    <div class="modal-content">
      <h2>Récapitulatif de votre commande</h2>
      <ul>${orderItems}</ul>
      <p><strong>Prix Total : </strong> ${totalPrice.toFixed(2)} €</p>
      <p><strong>Numéro de Table : </strong>${tableNumber}</p>
      <button id="closeModal">Fermer</button>
    </div>
  `;
 
  
  // Ajouter la modale au DOM
  document.body.appendChild(modal);

  // Gérer la fermeture de la modale
  document.getElementById("closeModal").addEventListener("click", function () {
    modal.remove();
  });
}

  
  cart = []; // Réinitialiser le panier après validation
  totalPrice = 0; // Réinitialiser le total
  cartItems.innerHTML = "";
  updateTotalPrice(); // Mettre à jour l'affichage du prix total

