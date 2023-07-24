// const productList = document.getElementById('product-list');

// function displayProducts(products) {
//   products.forEach((product) => {
//     const li = document.createElement('li');
//     li.textContent = product.name;
//     productList.appendChild(li);
//   });
// }

// function fetchProducts() {
//     fetch('http://localhost:4000/api/produits/equipements')
    
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       displayProducts(data);
//     })
//     .catch((error) => {
//       console.error('Erreur lors de la récupération des produits', error);
//     });
// }

// fetchProducts();
// Fonction pour mettre à jour le contenu du carrousel avec les données de l'API
function materielsportifs(data) {
  const materielTitle = document.querySelector('.materiel_name');
  const priceText = document.querySelector('.price_text');
  const materielImg = document.querySelector('.materiel_img img');

  // Récupérer les données de l'API
  const name = data.name;
  const price = data.price;
  const img = data.img;

  // Mettre à jour les éléments HTML avec les données de l'API
  materielTitle.textContent = name;
  priceText.innerHTML = `Start Price  <span style="color: #262626;">${price}</span>`;
  materielImg.src = img;
}

// Fonction pour récupérer les données de l'API
function getDataFromAPI() {
  fetch("http://localhost:4000/api/produits/equipements")
    .then(response => response.json())
    .then(data => {
      // Appeler la fonction pour mettre à jour le contenu du carrousel avec les données de l'API
      materielsportifs(data);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération des données de l\'API :', error);
    });
}

// Appeler la fonction pour obtenir les données de l'API et mettre à jour le contenu du carrousel
getDataFromAPI();
