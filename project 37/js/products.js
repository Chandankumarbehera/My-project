const products = JSON.parse(localStorage.getItem("products"));
console.log(products);
const mainDiv = document.getElementById("products");
let filteredProducts = [];

displayData(products);

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

    const imgAspectRatioContainer = document.createElement("div");
    imgAspectRatioContainer.classList.add("img-aspect-ratio");
    imgAspectRatioContainer.appendChild(image);
    imageContainer.appendChild(imgAspectRatioContainer);

    const cardBody = document.createElement("div");
    cardBody.classList.add(
      "card-body",
      "d-flex",
      "flex-column",
      "justify-content-between"
    );

    const title = document.createElement("h5");
    title.textContent = pro.title;
    title.classList.add("card-title");

    const description = document.createElement("p");
    description.textContent = pro.description;
    description.classList.add("card-text");

    const price = document.createElement("p");
    price.textContent = `Price: ₹${pro.price}`;
    price.classList.add("card-text");

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "mt-3"
    );

    const viewButtonContent = document.createElement("span");
    viewButtonContent.innerHTML = '<i class="fas fa-eye"></i>'; // Assuming you have Font Awesome linked

    // Create the button element
    const viewButton = document.createElement("a");
    viewButton.href = `pro.html?id=${pro.id}`;
    viewButton.target = "_blank";
    viewButton.classList.add("btn", "btn-primary");
    viewButton.appendChild(viewButtonContent);

    const addToCartButtonContent = document.createElement("span");
    addToCartButtonContent.innerHTML = '<i class="fas fa-shopping-cart"></i>'; // Using Font Awesome icon

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("btn", "btn-primary");
    addToCartButton.appendChild(addToCartButtonContent); // Append the span to the button

    addToCartButton.addEventListener("click", function () {
      addToCart(pro);
    });

    buttonGroup.appendChild(viewButton);
    buttonGroup.appendChild(addToCartButton);

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(price);
    cardBody.appendChild(buttonGroup);

    cardDiv.appendChild(imageContainer);
    cardDiv.appendChild(cardBody);

    mainDiv.appendChild(cardDiv);
  });
}

function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItemIndex = cartItems.findIndex(
    (item) => item.id === product.id
  );

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity++;
  } else {
    cartItems.push({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
    });
  }

  updateCartCount(cartItems);

  localStorage.setItem("cart", JSON.stringify(cartItems));

  alert("Item added to cart!");
}

window.addEventListener("load", function () {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount(cartItems);
});

function updateCartCount(cartItems) {
  const cartCountSpan = document.getElementById("cartCount");
  let totalCount = 0;

  if (cartItems && cartItems.length > 0) {
    totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  const previousCount = parseInt(localStorage.getItem("cartItemCount")) || 0;

  if (totalCount !== previousCount) {
    localStorage.setItem("cartItemCount", totalCount);
  }

  cartCountSpan.textContent = totalCount;
}

populateCategoryDropdown();

function populateCategoryDropdown() {
  const categoryDropdown = document.getElementById("categories");
  categoryDropdown.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select Category";
  defaultOption.value = "";
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