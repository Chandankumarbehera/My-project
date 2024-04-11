let products = [];

function getData() {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      products = data.products;
      filtering();
      initializeSwiper();
      localStorage.setItem("products", JSON.stringify(products));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function filtering() {
  const Top_Products = products.filter((pro) => pro.rating > 4.8);

  const swiperContainer = document.querySelector(".swiper-wrapper");
  swiperContainer.innerHTML = "";

  Top_Products.forEach((p) => {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("swiper-slide");
    imgDiv.style.border = "1px solid #ccc";

    const img = document.createElement("img");
    img.src = p.thumbnail;
    img.alt = p.title;
    img.style.width = "100%";
    img.style.height = "40vh";

    imgDiv.appendChild(img);
    swiperContainer.appendChild(imgDiv);
  });

  const swiperContainerParent = document.querySelector(".swiper-container");
  swiperContainerParent.style.overflow = "hidden";
}

function initializeSwiper() {
  const swiper = new Swiper(".swiper-container", {
    direction: "horizontal",
    loop: true, // Set to true if you want the slider to loop
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
    },

    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });
}

getData();

document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("loggedInUser"));
  const userEmailElement = document.getElementById("userEmail");
  if (userData) {
    userEmailElement.textContent = userData.email;
  } else {
    window.location.replace("pages/login.html");
  }
});