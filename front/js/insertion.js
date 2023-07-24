const url="http://localhost:4000/api/produits/equipements"
getProducts(url)
async function getProducts(url) {
   const response = await fetch(url);
   const data = await response.json();

   const productRow = document.getElementById('productRow');

   data.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.classList.add('col-lg-4', 'col-sm-4');
      productCard.innerHTML = `
         <div class="box_main">
            <h4 class="shirt_text text-truncate">${product.name}</h4>
            <p class="price_text">Prix : <span style="color: #262626;"> ${product.price}</span></p>
            <div class="electronic_img"><img src="${product.img}" alt=""></div>
            <div class="btn_main">
               <div class="buy_bt"><a href="#">Acheter Maintenant</a></div>
               <div class="seemore_bt"><a href="#">See More</a></div>
            </div>
         </div>
      `;

      productRow.appendChild(productCard);
   });
}