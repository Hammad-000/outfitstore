import items from "./data/product.js";

const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("search");

 
let high = items.forEach(element => {
  let value =  element.price 
  console.log(value)
})







const categoryCheckboxes = [
  document.getElementById("hoodie"),
  document.getElementById("kurta"),
  document.getElementById("perfume"),
  document.getElementById("shirt"),
  document.getElementById("pant")
];

const prevBtn = document.querySelector(".btn-1");
const page1Btn = document.querySelector(".btn-2");
const page2Btn = document.querySelector(".btn-3");
const page3Btn = document.querySelector(".btn-4");
const nextBtn = document.querySelector(".btn-next");




const rangefilter = document.querySelector(".cardsContainer") 

const cardsPerPage = 4;
let currentPage = 1;

let filteredProducts = [...items];

function renderCards(productList) {
  cardsContainer.innerHTML = "";

  if (productList.length === 0) {
    cardsContainer.innerHTML = `
      <p class="col-span-full text-center text-gray-500">
        No products found
      </p>
    `;
    return;
  }

  productList.forEach(product => {
    const card = document.createElement("div");

    card.className =
      "cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition duration-300";

    card.innerHTML = `
      <img src="${product.image}" 
           alt="${product.title}" 
           class="w-full h-48 object-cover">

      <div class="p-4">
        <h3 class="text-lg font-bold text-gray-800">
          ${product.title}
        </h3>

        <p class="text-sm text-gray-700 mb-2">
          ${product.description}
        </p>

        <p class="font-semibold text-indigo-600 mb-1">
          Price: Rs ${product.price}
        </p>

        <p class="text-yellow-500 mb-3">
          ${"★".repeat(product.rating)}
          ${"☆".repeat(5 - product.rating)}
        </p>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
}

function displayProducts() {
  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;

  const paginatedProducts = filteredProducts.slice(start, end);

  renderCards(paginatedProducts);

  updatePaginationButtons();
}

function updatePaginationButtons() {
  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);

  [page1Btn, page2Btn, page3Btn].forEach((btn, index) => {
    const pageNumber = index + 1;

    btn.textContent = pageNumber;

    if (pageNumber <= totalPages) {
      btn.style.display = "inline-block";

      if (pageNumber === currentPage) {
        btn.classList.add("bg-indigo-600", "text-white");
      } else {
        btn.classList.remove("bg-indigo-600", "text-white");
      }
    } else {
      btn.style.display = "none";
    }
  });

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

function applyFilters() {
  const selectedCategories = categoryCheckboxes
    .filter(cb => cb.checked)
    .map(cb => (cb.id === "kurta" ? "shalwarkameez" : cb.id));

  const searchTerm = searchInput.value.toLowerCase();

  filteredProducts = items.filter(product => {
    const inCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm);

    return inCategory && matchesSearch;
  });

  currentPage = 1;

  displayProducts();
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    displayProducts();
  }
});

page1Btn.addEventListener("click", () => {
  currentPage = 1;
  displayProducts();
});

page2Btn.addEventListener("click", () => {
  currentPage = 2;
  displayProducts();
});

page3Btn.addEventListener("click", () => {
  currentPage = 3;
  displayProducts();
});

document.addEventListener("DOMContentLoaded", () => {
  displayProducts();

  categoryCheckboxes.forEach(cb =>
    cb.addEventListener("change", applyFilters)
  );

  searchInput.addEventListener("input", applyFilters);

  const menuToggle = document.getElementById("menuToggle");
  const menuContent = document.getElementById("menuContent");

  if (menuToggle && menuContent) {
    menuToggle.addEventListener("click", () => {
      menuContent.classList.toggle("hidden");
    });
  }
});