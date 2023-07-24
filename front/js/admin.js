const url = "http://localhost:4300/api/produits/editer";
getProducts(url);

async function getProducts(url) {
  const response = await fetch(url);
  const data = await response.json();

  const productRow = document.getElementById('productRow');

  data.forEach((product) => {
    const productRowElement = createProductRow(product); // Call createProductRow function
    productRow.appendChild(productRowElement); // Append the table row to the productRow element
  });

  function createProductRow(product) {
    const productRow = document.createElement('tr');
  
    const productNameCell = document.createElement('td');
    productNameCell.textContent = product.name;
    productRow.appendChild(productNameCell);
  
    const productPriceCell = document.createElement('td');
    productPriceCell.textContent = product.price;
    productRow.appendChild(productPriceCell);
  
    // const productImageCell = document.createElement('td');
    // const productImage = document.createElement('img');
    // productImage.src = product.image;
    // productImage.alt = product.name;
    // productImageCell.appendChild(productImage);
    // productRow.appendChild(productImageCell);
  
    const productActionsCell = document.createElement('td');
    
    const editButton = document.createElement('button');
    editButton.textContent = 'cancel';
    editButton.classList.add('btn','btn-sm', 'btn-ouline-dark');
    editButton.addEventListener('click', () => handleEditProduct(product, productNameCell, productPriceCell));
    productActionsCell.appendChild(editButton);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'confirm';
    deleteButton.classList.add('btn', 'btn-sm','btn-outline-danger');
    deleteButton.addEventListener('click', () => handleDeleteProduct(product, productRow));
    productActionsCell.appendChild(deleteButton);
  
    productRow.appendChild(productActionsCell);
  
    return productRow;
  }
}
