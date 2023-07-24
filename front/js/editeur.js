const url = "http://localhost:4300/api/produits/mode";
getProducts(url);

async function getProducts(url) {
  const response = await fetch(url);
  const data = await response.json();

  const productRow = document.getElementById('productRow');

  data.forEach((product) => {
    const productCard = createProductCard(product);
    productRow.appendChild(productCard);
  });

  function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('col-lg-4', 'col-sm-4');
    productCard.innerHTML = `
      <div class="box_main">
        <h4 class="shirt_text text-truncate" contenteditable="false" > ${product.name}</h4>
        <p class="price_text">Prix :   <span style="color: #262626;" contenteditable="false">${product.price}</span></p>
        <div class="electronic_img"><img src="${product.image}" alt=""></div>
        <div class="btn_main">
          <div class="buy_bt"><a href="#" data-editable="false">Modifier</a></div>
          <div class="seemore_bt"><a href="#">Supprimer</a></div>
          <div class="save_bt" style="display: none;"><a href="#">Envoyer</a></div>
          <div class="cancel_bt" style="display: none;"><a href="#">Annuler</a></div>
        </div>
      </div>
      
    `;

    // Ajoutez ici la gestion des événements pour les boutons "Modifier" de chaque produit
    const editButton = productCard.querySelector('.buy_bt a');
    editButton.addEventListener('click', () => {
      // Récupérer les éléments éditables du produit
      const productNameElement = productCard.querySelector('.shirt_text');
      const productPriceElement = productCard.querySelector('.price_text span');

      // Rendre le nom et le prix éditables
      productNameElement.contentEditable = true;
      productPriceElement.contentEditable = true;

      // Masquer le bouton "Modifier" et afficher les boutons "Envoyer" et "Annuler"
      editButton.dataset.editable = 'true';
      const sendButton = productCard.querySelector('.save_bt');
      const cancelButton = productCard.querySelector('.cancel_bt');
      sendButton.style.display = 'inline-block';
      cancelButton.style.display = 'inline-block';

      // Focus sur le nom du produit pour faciliter l'édition
      productNameElement.focus();

      // Ajoutez ici les instructions pour gérer les modifications et les mises à jour des produits
      // Vous pouvez utiliser les valeurs "productNameElement.textContent" et "productPriceElement.textContent" pour obtenir les nouvelles valeurs
      // Lorsque l'utilisateur clique sur "Envoyer", vous pouvez envoyer les modifications à l'endpoint pour mettre à jour le produit
      // Lorsque l'utilisateur clique sur "Annuler", vous pouvez annuler les modifications en rétablissant les valeurs d'origine du produit

      sendButton.addEventListener('click', async () => {
        // Rendre les éléments non éditables
        productNameElement.contentEditable = false;
        productPriceElement.contentEditable = false;

        // Masquer les boutons "Envoyer" et "Annuler" et afficher le bouton "Modifier"
        editButton.dataset.editable = 'false';
        sendButton.style.display = 'none';
        cancelButton.style.display = 'none';

        try {
          const updatedProduct = {
            id: product.id,
            name: productNameElement.textContent,
            price: productPriceElement.textContent
          };

          const updateUrl = `http://localhost:4300/api/produits/mode/${product.id}`;

          const response = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
          });

          if (response.ok) {
            console.log('Données du produit mises à jour avec succès !');
            const editeUrl = `http://localhost:4300/api/produits/editer/`;

            const responseE = await fetch(editeUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedProduct)
            });
            if (responseE.ok) {
              alert('Données du produit mises à jour avec succès !');
            }else {
              alert('Erreur lors de la mise à jour des données du produit.');
              // Afficher une alerte rouge pour indiquer une erreur de mise à jour si nécessaire
            }

            // Afficher une alerte verte pour indiquer la mise à jour réussie si nécessaire

            // Mettre à jour les données dans le tableau avec les données renvoyées par l'API
            const updatedData = await response.json();
            // Mettez à jour l'affichage du produit avec les nouvelles valeurs si nécessaire
            // Vous pouvez également mettre à jour la liste des produits en rechargeant la page
            reloadPageWithDelay();
          } else {
            console.log('Erreur lors de la mise à jour des données du produit.');
            // Afficher une alerte rouge pour indiquer une erreur de mise à jour si nécessaire
          }
        } catch (error) {
          console.log('Une erreur s\'est produite :', error);
          // Afficher une alerte rouge pour indiquer une erreur de mise à jour si nécessaire
        }
      });

      cancelButton.addEventListener('click', () => {
        // Annuler les modifications en rétablissant les valeurs d'origine du produit
        productNameElement.textContent = product.name;
        productPriceElement.textContent = product.price;

        // Rendre les éléments non éditables
        productNameElement.contentEditable = false;
        productPriceElement.contentEditable = false;

        // Masquer les boutons "Envoyer" et "Annuler" et afficher le bouton "Modifier"
        editButton.dataset.editable = 'false';
        sendButton.style.display = 'none';
        cancelButton.style.display = 'none';
      });
    });

    return productCard;
  }

  function reloadPageWithDelay() {
    setTimeout(() => {
      location.reload();
    }, 1000); // Reloader la page après 1 seconde (ajustez le délai si nécessaire)
  }
}
