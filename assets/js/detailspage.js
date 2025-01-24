const params = new URLSearchParams(window.location.search);
const productId = params.get("_id");

fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
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
    const detailContainer = document.getElementById("details");
    const nameProduct = document.createElement("h3");
    nameProduct.innerText = product.name;
    const brandProduct = document.createElement("h4");
    brandProduct.innerText = product.brand;
    const descrProduct = document.createElement("p");
    descrProduct.innerText = product.description;
    const priceProduct = document.createElement("p");
    priceProduct.innerHTML = `${product.price} €`;
    detailContainer.appendChild(nameProduct);
    detailContainer.appendChild(brandProduct);
    detailContainer.appendChild(descrProduct);
    detailContainer.appendChild(priceProduct);
  })
  .catch((err) => {
    console.log(err);
  });
