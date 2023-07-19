const url = "http://localhost:4300/api/produits/mode";
getProducts(url);

async function getProducts(url) {
  const response = await fetch(url);
  const data = await response.json();

  const tableBody = document.querySelector("tbody");

  data.forEach((product) => {
    const row = document.createElement("tr");
    row.classList.add("editable-row");

    const idCell = createEditableCell(product.id, "id");
    const nameCell = createEditableCell(product.name, "name");
    const priceCell = createEditableCell(product.price, "price");
    const imgCell = createEditableCell("", "img"); // Laisser vide pour l'instant

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(imgCell); // Ajouter la cellule d'image

    const actionCell = createActionsCell(row);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}

function createEditableCell(value, columnName) {
  const cell = document.createElement("td");
  const input = document.createElement("input");
  input.classList.add("input-editable");
  input.type = "text";
  input.value = value;

  cell.appendChild(input);
  cell.dataset.columnName = columnName; // Ajouter un attribut pour stocker le nom de la colonne
  return cell;
}

function createActionsCell(row) {
  const cell = document.createElement("td");

  const sendButton = document.createElement("button");
  sendButton.textContent = "Envoyer";
  sendButton.classList.add("btn", "btn-primary", "btn-sm", "mr-2");
  sendButton.addEventListener("click", async function() {
    const rowData = getRowData(row);
    console.log(JSON.stringify(rowData));
  
    try {
      const productId = rowData.id;
      const updateUrl = `http://localhost:4300/api/produits/mode/${productId}`;
  
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(rowData)
      });
  
      if (response.ok) {
        console.log("Données du produit mises à jour avec succès !");
  
        updateRowWithData(row, rowData); // Mettre à jour les données de la ligne avec les nouvelles données
  
        location.reload();
      } else {
        console.log("Erreur lors de la mise à jour des données du produit.");
      }
    } catch (error) {
      console.log("Une erreur s'est produite :", error);
    }
  
    disableEditableCells(row);
    row.classList.remove("editing-row");
  });
  
    

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Annuler";
  cancelButton.classList.add("btn", "btn-secondary", "btn-sm");
  cancelButton.addEventListener("click", function() {
    resetEditableCells(row);
    row.classList.remove("editing-row");
  });

  cell.appendChild(sendButton);
  cell.appendChild(cancelButton);

  // Masquer les boutons par défaut
  sendButton.style.display = "none";
  cancelButton.style.display = "none";

  row.addEventListener("click", function() {
    const otherRows = document.querySelectorAll(".editable-row");
    otherRows.forEach(function(otherRow) {
      const otherSendButton = otherRow.querySelector(".btn-primary");
      const otherCancelButton = otherRow.querySelector(".btn-secondary");
      otherSendButton.style.display = "none";
      otherCancelButton.style.display = "none";
    });

    sendButton.style.display = "inline-block";
    cancelButton.style.display = "inline-block";
    row.classList.add("editing-row");
  });

  return cell;
}


function disableEditableCells(row) {
  const inputs = row.querySelectorAll(".input-editable");

  inputs.forEach(function(input) {
    input.setAttribute("readonly", "readonly");
  });
}

function resetEditableCells(row) {
  const inputs = row.querySelectorAll(".input-editable");

  inputs.forEach(function(input) {
    input.removeAttribute("readonly");
    input.value = input.dataset.originalValue;
  });
}

function updateRowWithData(row, rowData) {
  const cells = row.querySelectorAll("td");

  cells.forEach(function(cell) {
    const columnName = cell.dataset.columnName;
    const updatedValue = rowData[columnName];

    const input = cell.querySelector("input");
    input.value = updatedValue;
  });
}

function getRowData(row) {
  const inputs = row.querySelectorAll(".input-editable");
  const rowData = {};

  inputs.forEach(function(input) {
    const columnName = input.parentElement.dataset.columnName;
    let value = input.value;

    if (columnName === "id") {
      value = parseInt(value);
    }

    rowData[columnName] = value;
  });

  if (!rowData.hasOwnProperty("img")) {
    rowData["img"] = "";
  }

  return rowData;
}
