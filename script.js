let data = {}; // Stocker les données JSON

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

      // Créer l'image
      let img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;

      // Créer la section des détails
      let details = document.createElement("div");
      details.innerHTML = `<h3>${item.name}</h3>
          <p>${item.description || ""}</p>
          <p><strong>Prix :</strong> ${item.price} €</p>
          <p><strong>Calories :</strong> ${item.calories || "N/A"} kcal</p>`;

      // Créer le bouton "Ajouter à ma commande"
      let secondaryBtn = document.createElement('button');
      secondaryBtn.textContent = 'Ajouter à ma commande';

      // Ajouter l'image et les détails à la div de l'item
      itemDiv.appendChild(img);
      itemDiv.appendChild(details);

      // Ajouter le bouton à la div de l'item (pas dans "details")
      itemDiv.appendChild(secondaryBtn);

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
