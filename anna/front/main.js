const productList = document.getElementById('product-list');

function displayProducts(products) {
  products.forEach((product) => {
    const li = document.createElement('li');
    li.textContent = product.name;
    productList.appendChild(li);
  });
}

function fetchProducts() {
    fetch('http://localhost:4000/api/produits/mode')
    
    .then((response) => response.json())
    .then((data) => {
      displayProducts(data);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des produits', error);
    });
}

fetchProducts();
