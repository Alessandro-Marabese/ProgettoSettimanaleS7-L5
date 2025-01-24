const myForm = document.getElementById("myForm");

const params = new URLSearchParams(window.location.search);
const productId = params.get("_id");
const URL = productId ? "https://striveschool-api.herokuapp.com/api/product/" + productId : "https://striveschool-api.herokuapp.com/api/product/";

window.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("addButton");
  const secondaryTitle = document.getElementById("backofficeSubtitle");
  const deleteButton = document.getElementById("dltBtn");

  if (productId) {
    addButton.innerText = "Modifica il prodotto";
    addButton.classList.add("btn-secondary");
    secondaryTitle.innerText = "Sezione - Modifica prodotto";

    deleteButton.onclick = deleteProduct;

    fetch(URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNzU3MWI3NDcwMTAwMTU4YjJiYzYiLCJpYXQiOjE3Mzc3MTcxMDUsImV4cCI6MTczODkyNjcwNX0.DP65Mqtsa2k0LUzt3lZQS4396dpDJRC3LkWlFkedQDw",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((product) => {
        myForm.elements.name.value = product.name;
        myForm.elements.description.value = product.description;
        myForm.elements.brand.value = product.brand;
        myForm.elements.imageUrl.value = product.imageUrl;
        myForm.elements.price.value = product.price;
      });
  } else {
    secondaryTitle.innerText = "Sezione - Inserisci un nuovo prodotto";
    deleteButton.classList.add("d-none");
  }
});

myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newProduct = {
    name: myForm.elements.name.value.trim(),
    description: myForm.elements.description.value.trim(),
    brand: myForm.elements.brand.value.trim(),
    imageUrl: myForm.elements.imageUrl.value.trim(),
    price: parseFloat(myForm.elements.price.value.trim()),
  };

  if (
    !myForm.elements.name.value ||
    !myForm.elements.description.value ||
    !myForm.elements.brand.value ||
    !myForm.elements.imageUrl.value ||
    isNaN(myForm.elements.price.value)
  ) {
    alert("Tutti i campi devono essere compilati correttamente.");
    return;
  }
  console.log(newProduct);

  fetch(URL, {
    method: productId ? "PUT" : "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNzU3MWI3NDcwMTAwMTU4YjJiYzYiLCJpYXQiOjE3Mzc3MTcxMDUsImV4cCI6MTczODkyNjcwNX0.DP65Mqtsa2k0LUzt3lZQS4396dpDJRC3LkWlFkedQDw",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore: non è stato possibile aggiungere il nuovo prodotto");
      }
    })
    .then((newprod) => {
      if (productId) {
        alert("Il prodotto con id: " + newprod._id + " è stato modificato con successo!");
      } else if (!productId) {
        alert("Il nuovo prodotto con id: " + newprod._id + " è stato aggiunto con successo!");
        myForm.reset();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function deleteProduct() {
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNzU3MWI3NDcwMTAwMTU4YjJiYzYiLCJpYXQiOjE3Mzc3MTcxMDUsImV4cCI6MTczODkyNjcwNX0.DP65Mqtsa2k0LUzt3lZQS4396dpDJRC3LkWlFkedQDw",
    },
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((eliminatedProduct) => {
      alert("Il prodotto con id " + eliminatedProduct._id + "è stato eliminato con successo!");
      window.location.href("./index.html");
    });
}
