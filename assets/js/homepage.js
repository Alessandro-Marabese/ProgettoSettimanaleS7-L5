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
      col.classList.add("col");
      const card = document.createElement("div");
      card.classList.add("card", "shadow-lg", "my-2");
      card.setAttribute("data-id", ele._id);
      const cardImg = document.createElement("img");
      cardImg.classList.add("card-img-top", "object-fit-contain");
      cardImg.src = ele.imageUrl;
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.innerText = ele.name;
      const priceParag = document.createElement("p");
      priceParag.classList.add("card-text");
      priceParag.innerHTML = `${ele.price} €`;
      const modifyBtn = document.createElement("a");
      modifyBtn.classList.add("btn", "btn-primary", "me-2");
      modifyBtn.innerText = "Modifica";
      modifyBtn.href = `./backoffice.html?_id=${ele._id}`;
      const detailsBtn = document.createElement("a");
      detailsBtn.classList.add("btn", "btn-primary");
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
