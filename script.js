const products = [
  { id: 1, image: "./images/hoodie1.webp", title: "Hoodie1", description: "Men's Hoodie Regular Fit Fleece Fabric", price: 500, category: "hoodie", rating: 5 },
  { id: 2, image: "./images/hoodie2.webp", title: "Hoodie2", description: "Men's Hoodie Regular Fit Fleece Fabric", price: 400, category: "hoodie", rating: 4 },
  { id: 3, image: "./images/hoodie3.webp", title: "Hoodie3", description: "Men's Hoodie Regular Fit Fleece Fabric", price: 300, category: "hoodie", rating: 3 },
  { id: 4, image: "./images/hoodie1.webp", title: "Hoodie4", description: "Men's Hoodie Regular Fit Fleece Fabric", price: 200, category: "hoodie", rating: 2 },
  { id: 5, image: "./images/kurta.webp", title: "Kurta1", description: "Men's Kurta Regular Fit", price: 800, category: "shalwarkameez", rating: 2 },
  { id: 6, image: "./images/kurta3.webp", title: "Kurta2", description: "Men's Kurta Regular Fit", price: 1200, category: "shalwarkameez", rating: 3 },
  { id: 7, image: "./images//k.webp", title: "Kurta3", description: "Men's Kurta Regular Fit", price: 1200, category: "shalwarkameez", rating: 4 },
  { id: 8, image: "./images/kurta4.webp", title: "Kurta4", description: "Men's Kurta Regular Fit", price: 2000, category: "shalwarkameez", rating: 5 },
  { id: 9, image: "./images/perfume4.webp", title: "Perfume1", description: "TimeUS Men's Perfume", price: 250, category: "perfume", rating: 2 },
  { id: 10, image: "./images/perfume2.webp", title: "Perfume2", description: "Men's Perfume", price: 400, category: "perfume", rating: 4 },
  { id: 11, image: "./images/perfume3.webp", title: "Perfume3", description: "Men's Perfume", price: 300, category: "perfume", rating: 3 },
  { id: 12, image: "./images/perfume4.webp", title: "Perfume4", description: "Men's Perfume", price: 500, category: "perfume", rating: 5 },
  { id: 13, image: "./images/shirt1.jpg", title: "Shirt1", description: "Men's Shirt", price: 700, category: "shirt", rating: 5 },
  { id: 14, image: "./images/shirt2.webp", title: "Shirt2", description: "Men's Shirt", price: 600, category: "shirt", rating: 3 },
  { id: 15, image: "./images/shirt3.webp", title: "Shirt3", description: "Men's Shirt", price: 500, category: "shirt", rating: 4 },
  { id: 16, image: "./images/shirt4.webp", title: "Shirt4", description: "Men's Shirt", price: 400, category: "shirt", rating: 2 },
  { id: 17, image: "./images/pant1.webp", title: "Pant1", description: "Men's Pant", price: 500, category: "pant", rating: 4 },
  { id: 18, image: "./images/pant2.webp", title: "Pant2", description: "Men's Pant", price: 300, category: "pant", rating: 2 },
  { id: 19, image: "./images/pant3.webp", title: "Pant3", description: "Men's Pant", price: 800, category: "pant", rating: 5 },
  { id: 20, image: "./images/pant4.webp", title: "Pant4", description: "Men's Pant", price: 400, category: "pant", rating: 3 }


];

const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("search");

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


