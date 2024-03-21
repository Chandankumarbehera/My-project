const products = JSON.parse(localStorage.getItem("products"));
console.log(products);
const mainDiv = document.getElementById("products");
let filteredProducts = [];

displayData(products);

// function displayData (data)
// {
//     mainDiv.textContent=""
//     data.map((pro) =>
//     {
//         const div = document.createElement('div')
//         const image = document.createElement('img')
//         image.src = pro.thumbnail;
//         image.alt = pro.title;
//         image.height = "200";
//         image.width = "100";
//         image.classList.add('card-img')
//         const link = document.createElement('a')
//         link.href = ` pro.html/?id=${pro.id} `
//         link.target="_blank"
//         const title = document.createElement('h3');
//         title.textContent = pro.title;
//         title.classList.add('card-title')
//         link.appendChild(title)
//         div.classList.add('card')
//         div.append(image,link);
//         mainDiv.appendChild(div)
//     })
// }

function displayData(data) {
  mainDiv.textContent = ""; // Clear previous content

  data.forEach((pro) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-3");
    cardDiv.style.width = "18rem";

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const image = document.createElement("img");
    image.src = pro.thumbnail;
    image.alt = pro.title;
    image.style.objectFit = "cover";
    image.style.height = "200px";
    image.classList.add("card-img-top", "product-image");

    // Add a container div to maintain aspect ratio
    const imgAspectRatioContainer = document.createElement("div");
    imgAspectRatioContainer.classList.add("img-aspect-ratio");

    // Add image to the aspect ratio container
    imgAspectRatioContainer.appendChild(image);

    imageContainer.appendChild(imgAspectRatioContainer);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.textContent = pro.title;
    title.classList.add("card-title");

    const description = document.createElement("p");
    description.textContent = pro.description;
    description.classList.add("card-text");

    const priceButtonWrapper = document.createElement("div");
    priceButtonWrapper.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    const price = document.createElement("p");
    price.textContent = `Price: ₹${pro.price}`;

    price.classList.add("card-text");

    const viewButton = document.createElement("a");
    viewButton.href = `pro.html?id=${pro.id}`;
    viewButton.target = "_blank";

    viewButton.textContent = "View";
    viewButton.classList.add("btn", "btn-primary");

    priceButtonWrapper.appendChild(price);
    priceButtonWrapper.appendChild(viewButton);

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(priceButtonWrapper);

    cardDiv.appendChild(imageContainer);
    cardDiv.appendChild(cardBody);

    mainDiv.appendChild(cardDiv);
  });
}

populateCategoryDropdown();

function populateCategoryDropdown() {
  const categoryDropdown = document.getElementById("categories");
  categoryDropdown.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select Category";
  defaultOption.value = ""; // Set an empty value for default option
  categoryDropdown.appendChild(defaultOption);

  const categories = getUniqueCategories(products);
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.textContent = category;
    option.value = category;
    categoryDropdown.appendChild(option);
  });
}

function getUniqueCategories(products) {
  const uniqueCategories = [];
  products.forEach((product) => {
    if (!uniqueCategories.includes(product.category)) {
      uniqueCategories.push(product.category);
    }
  });
  return uniqueCategories;
}

document.getElementById("categories").addEventListener("change", filterSelect);

function filterSelect(e) {
  const selectedCategory = e.target.value;
  if (selectedCategory === "all") {
    displayData(products);
    filteredProducts = [];
  } else {
    filteredProducts = products.filter(
      (pro) => pro.category === selectedCategory
    );
    displayData(filteredProducts);
  }
}

document.getElementById("sorting").addEventListener("change", sortProducts);

function sortProducts(e) {
  const sortBy = e.target.value;
  if (filteredProducts.length > 0) {
    if (sortBy === "asc") {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "0") {
      filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
    displayData(filteredProducts);
  } else {
    if (sortBy === "desc") {
      products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "asc") {
      products.sort((a, b) => b.title.localeCompare(a.title));
    }
    displayData(products);
  }
}

document.getElementById("searchInput").addEventListener("input", searchResults);

function searchResults(e) {
  const keyword = e.target.value.trim().toLowerCase();
  if (keyword === "") {
    displayData(filteredProducts.length ? filteredProducts : products);
  } else {
    const filtered = filteredProducts.length ? filteredProducts : products;
    const searchResults = filtered.filter((pro) => {
      return (
        pro.title.toLowerCase().includes(keyword) ||
        pro.category.toLowerCase().includes(keyword)
      );
    });
    displayData(searchResults);
  }
}

document.getElementById("resetButton").addEventListener("click", resetFilters);
function resetFilters() {
  document.getElementById("searchInput").value = "";
  const categoryDropdown = document.getElementById("categories");
  categoryDropdown.selectedIndex = 0;
  const sortingDropdown = document.getElementById("sorting");
  sortingDropdown.selectedIndex = 0;
  filteredProducts = [];
  displayData(products);
}