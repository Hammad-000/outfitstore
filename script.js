import items from "./data/product.js";

const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("search");
let products = items.slice(0,15)
 
const categoryCheckboxes = [
  document.getElementById("hoodie"),
  document.getElementById("kurta"),
  document.getElementById("perfume"),
  document.getElementById("shirt"),
  document.getElementById("pant")
];


function renderCards(productList) {
  cardsContainer.innerHTML = "";

  if (productList.length === 0) {
    cardsContainer.innerHTML = `<p class="col-span-full text-center text-gray-500">No products found</p>`;
    return;
  }

  productList.forEach(product => {
    const card = document.createElement("div");
    card.className = " cursor-pointer  bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition hover:shadow-2xl hover:scale-[1.02] duration-300 ";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-bold text-gray-800">${product.title}</h3>
        <p class="text-sm text-gray-700 mb-2">${product.description}</p>
        <p class="font-semibold text-indigo-600 mb-1">Price: $${product.price}</p>
        <p class="text-yellow-500 mb-3">${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}</p>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}


function applyFilters() {
  const selectedCategories = categoryCheckboxes
    .filter(cb => cb.checked)
    .map(cb => cb.id === "kurta" ? "shalwarkameez" : cb.id);

  const searchTerm = searchInput.value.toLowerCase();

  const filtered = products.filter(product => {
    const inCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesSearch = product.title.toLowerCase().includes(searchTerm);
    return inCategory && matchesSearch;
  });

  renderCards(filtered);
}


document.addEventListener("DOMContentLoaded", () => {
  renderCards(products);

  categoryCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  searchInput.addEventListener("input", applyFilters);

  const menuToggle = document.getElementById("menuToggle");
  const menuContent = document.getElementById("menuContent");
  
  if (menuToggle && menuContent) {
    menuToggle.addEventListener("click", () => {
      menuContent.classList.toggle("hidden");
    });
  }
});


