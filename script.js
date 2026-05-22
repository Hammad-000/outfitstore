import items from "./data/product.js";

const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("search");

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

let newitems = [...items]


 let prices = newitems.map(e => e.price);

  let lowToHigh = [...prices].sort((a, b)=> a - b)
 let highTolow = [...prices].sort((a, b)=> b - a)
 

 console.log(lowToHigh)
 console.log(highTolow)




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

    card.className = "group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md";

card.innerHTML = `
  <!-- Product Image Wrap -->
  <div class="relative overflow-hidden bg-gray-100 aspect-video">
    <img src="${product.image}" 
         alt="${product.title}" 
         class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
    <!-- Optional Badge (e.g., Sale/New) -->
  
  </div>

  <!-- Product Content -->
  <div class="flex flex-1 flex-col p-5">
    <!-- Title & Rating Row -->
    <div class="mb-2 flex items-start justify-between gap-2">
      <h3 class="line-clamp-1 font-semibold text-gray-900 transition-colors group-hover:text-indigo-600 text-base md:text-lg" title="${product.title}">
        ${product.title}
      </h3>
      <div class="flex items-center text-2xl text-amber-500 shrink-0 mt-1" aria-label="Rating: ${product.rating} out of 5 stars">
        ${"★".repeat(Math.round(product.rating))}
        <span class="text-gray-300  ">${"★".repeat(5 - Math.round(product.rating))}</span>
      </div>
    </div>

    <!-- Description -->
    <p class="line-clamp-2 text-sm leading-relaxed text-gray-500 mb-4 flex-1">
      ${product.description}
    </p>

    <!-- Price & Action Button -->
    <div class="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
      <div class="flex flex-col">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wider">Price</span>
        <span class="text-lg font-bold text-gray-900">
          Rs ${Number(product.price).toLocaleString()}
        </span>
      </div>
      
      <button class="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        Add to Cart
      </button>
    </div>
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