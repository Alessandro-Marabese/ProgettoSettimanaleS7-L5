fetch("https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNzU3MWI3NDcwMTAwMTU4YjJiYzYiLCJpYXQiOjE3Mzc3MTcxMDUsImV4cCI6MTczODkyNjcwNX0.DP65Mqtsa2k0LUzt3lZQS4396dpDJRC3LkWlFkedQDw",
  },
})
  .then((response) => {
    console.log(response);
    if (response.ok) {
      return response.json();
    }
  })
  .then((productobj) => {
    const row = document.getElementById("indexRow");
    productobj.forEach((ele) => {
      const col = document.createElement("div");
      col.classList.add("col", "mb-3");
      const card = document.createElement("div");
      card.classList.add("card", "border-0", "h-100");
      card.setAttribute("data-id", ele._id);
      const cardImg = document.createElement("img");
      cardImg.classList.add("card-img-top");
      cardImg.src = ele.imageUrl;
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title", "fw-bold");
      cardTitle.innerText = ele.name;
      const priceParag = document.createElement("p");
      priceParag.classList.add("card-text", "fs-3", "text-success");
      priceParag.innerHTML = `${ele.price} €`;
      const modifyBtn = document.createElement("a");
      modifyBtn.classList.add("btn", "btn-secondary", "me-2", "mt-2");
      modifyBtn.innerText = "Modifica";
      modifyBtn.href = `./backoffice.html?_id=${ele._id}`;
      const detailsBtn = document.createElement("a");
      detailsBtn.classList.add("btn", "btn-primary", "mt-2", "align-middle");
      detailsBtn.innerText = "Vai al dettaglio";
      detailsBtn.href = `./detailspage.html?_id=${ele._id}`;
      card.appendChild(cardImg);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(priceParag);
      cardBody.appendChild(modifyBtn);
      cardBody.appendChild(detailsBtn);
      card.appendChild(cardBody);
      col.appendChild(card);
      row.appendChild(col);
    });
  });
