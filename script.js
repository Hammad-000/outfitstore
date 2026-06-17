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

const cartCountBadge = document.getElementById("cartCountBadge");
const cartItemsFeed = document.querySelector("#cartDrawer .overflow-y-auto");
const subtotalEl = document.querySelector("#cartDrawer .text-slate-300 + p"); // Targets subtotal value
const totalAmountEl = document.querySelector("#cartDrawer .text-transparent"); // Targets total amount value
const drawerHeaderBadge = document.querySelector("#cartDrawer h2 span");

let cart = [];
let filteredProducts = [...items];
const cardsPerPage = 4;
let currentPage = 1;


function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
}

function updateQuantity(productId, amount) {
  const cartItem = cart.find(item => item.id === productId);
  if (!cartItem) return;

  cartItem.quantity += amount;

  if (cartItem.quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  }

  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (cartCountBadge) cartCountBadge.textContent = totalItems;
  if (drawerHeaderBadge) drawerHeaderBadge.textContent = `${totalItems} Item${totalItems === 1 ? '' : 's'}`;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (subtotalEl) subtotalEl.textContent = `Rs ${subtotal.toLocaleString()}`;
  if (totalAmountEl) totalAmountEl.textContent = `Rs ${subtotal.toLocaleString()}`;

  // 4. Render Cart Items List Inside Slide-over Drawer
  if (!cartItemsFeed) return;
  cartItemsFeed.innerHTML = "";

  if (cart.length === 0) {
    cartItemsFeed.innerHTML = `
      <div class="flex flex-col items-center justify-center h-48 text-center text-gray-400">
        <p class="text-sm">Your cart feels lonely.</p>
        <p class="text-xs text-gray-500 mt-1">Add some sweet items to get started!</p>
      </div>
    `;
    return;
  }

  cart.forEach(item => {
    const itemRow = document.createElement("div");
    itemRow.className = "flex items-center gap-4 pt-4 first:pt-0";
    itemRow.innerHTML = `
      <div class="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <img src="${item.image}" alt="${item.title}" class="h-full w-full object-cover">
      </div>
      <div class="flex flex-1 flex-col">
        <div class="flex justify-between text-base font-semibold">
          <h3 class="line-clamp-1 text-gray-200">${item.title}</h3>
          <p class="ml-4 text-cyan-400 font-medium">Rs ${(item.price * item.quantity).toLocaleString()}</p>
        </div>
        <p class="mt-0.5 text-xs text-gray-400">Unit Price: Rs ${Number(item.price).toLocaleString()}</p>
        <div class="flex flex-1 items-end justify-between text-sm mt-2">
          
          <!-- Quantity Control Actions -->
          <div class="flex items-center border border-white/10 rounded-lg bg-white/5 overflow-hidden">
            <button class="minus-qty px-2.5 py-1 text-gray-400 hover:bg-white/10 hover:text-white transition cursor-pointer" data-id="${item.id}">-</button>
            <span class="px-2 text-white text-xs font-medium">${item.quantity}</span>
            <button class="plus-qty px-2.5 py-1 text-gray-400 hover:bg-white/10 hover:text-white transition cursor-pointer" data-id="${item.id}">+</button>
          </div>
          
          <button type="button" class="remove-item font-medium text-red-400 hover:text-red-300 transition text-xs cursor-pointer" data-id="${item.id}">
            Remove
          </button>
        </div>
      </div>
    `;
    itemRow.querySelector(".minus-qty").addEventListener("click", () => updateQuantity(item.id, -1));
    itemRow.querySelector(".plus-qty").addEventListener("click", () => updateQuantity(item.id, 1));
    itemRow.querySelector(".remove-item").addEventListener("click", () => removeFromCart(item.id));

    cartItemsFeed.appendChild(itemRow);
  });
}


function renderCards(productList) {
  cardsContainer.innerHTML = "";

  if (productList.length === 0) {
    cardsContainer.innerHTML = `
      <p class="col-span-full text-center text-gray-400 py-12">
        No products found matching your active criteria.
      </p>
    `;
    return;
  }

  productList.forEach(product => {
    const card = document.createElement("div");
    
    card.className = "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md";

    card.innerHTML = `
      <!-- Product Image Wrap -->
      <div class="relative overflow-hidden bg-white/5 aspect-video">
        <img src="${product.image}" 
             alt="${product.title}" 
             class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
      </div>

      <!-- Product Content -->
      <div class="flex flex-1 flex-col p-5">
        <div class="mb-2 flex items-start justify-between gap-2">
          <h3 class="line-clamp-1 font-semibold text-white transition-colors group-hover:text-cyan-400 text-base md:text-lg" title="${product.title}">
            ${product.title}
          </h3>
          <div class="flex items-center text-xl text-amber-400 shrink-0 mt-1" aria-label="Rating: ${product.rating} out of 5 stars">
            ${"★".repeat(Math.round(product.rating))}
            <span class="text-white/20">${"★".repeat(5 - Math.round(product.rating))}</span>
          </div>
        </div>

        <p class="line-clamp-2 text-sm leading-relaxed text-gray-400 mb-4 flex-1">
          ${product.description}
        </p>

        <!-- Price & Action Button -->
        <div class="mt-auto flex items-center justify-between pt-3 border-t border-white/10">
          <div class="flex flex-col">
            <span class="text-xs text-gray-400 font-medium uppercase tracking-wider">Price</span>
            <span class="text-lg font-bold text-white">
              Rs ${Number(product.price).toLocaleString()}
            </span>
          </div>
          
          <button class="add-to-cart-btn cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    `;
    card.querySelector(".add-to-cart-btn").addEventListener("click", (e) => {
      e.stopPropagation(); 
      addToCart(product);
    });

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
  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage) || 1;

  [page1Btn, page2Btn, page3Btn].forEach((btn, index) => {
    const pageNumber = index + 1;
    btn.textContent = pageNumber;

    if (pageNumber <= totalPages) {
      btn.style.display = "inline-block";
      if (pageNumber === currentPage) {
        btn.classList.add("bg-cyan-500", "text-slate-950");
        btn.classList.remove("bg-white/10", "text-white");
      } else {
        btn.classList.remove("bg-cyan-500", "text-slate-950");
        btn.classList.add("bg-white/10", "text-white");
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

page1Btn.addEventListener("click", () => { currentPage = 1; displayProducts(); });
page2Btn.addEventListener("click", () => { currentPage = 2; displayProducts(); });
page3Btn.addEventListener("click", () => { currentPage = 3; displayProducts(); });

document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  updateCartUI(); 

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

    const form = document.getElementById('checkoutForm');
    const successModal = document.getElementById('successModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
        
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    const panel = document.getElementById('cartPanel');

    const openBtn = document.getElementById('openCart');
    const closeBtn = document.getElementById('closeCart');
    const continueBtn = document.getElementById('keepShopping');

    function toggleDrawer(isOpen) {
      if (isOpen) {
        drawer.classList.remove('invisible');
        setTimeout(() => {
          overlay.classList.replace('bg-slate-950/0', 'bg-slate-950/60');
          overlay.classList.replace('backdrop-blur-none', 'backdrop-blur-sm');
          panel.classList.replace('translate-x-full', 'translate-x-0');
        }, 10);
      } else {
        overlay.classList.replace('bg-slate-950/60', 'bg-slate-950/0');
        overlay.classList.replace('backdrop-blur-sm', 'backdrop-blur-none');
        panel.classList.replace('translate-x-0', 'translate-x-full');
        setTimeout(() => {
          drawer.classList.add('invisible');
        }, 300);
      }
    }

    openBtn.addEventListener('click', () => toggleDrawer(true));
    closeBtn.addEventListener('click', () => toggleDrawer(false));
    overlay.addEventListener('click', () => toggleDrawer(false));
    continueBtn.addEventListener('click', () => toggleDrawer(false));

    const menuToggle = document.getElementById('menuToggle');
    const menuContent = document.getElementById('menuContent');
    menuToggle.addEventListener('click', () => {
      menuContent.classList.toggle('hidden');
    });

    // form.addEventListener('submit', (e) => {
    //   e.preventDefault(); 

    //   const orderDetails = {
    //     name: `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`,
    //     email: document.getElementById('email').value,
    //     phone: document.getElementById('phone').value,
    //     address: `${document.getElementById('address').value}, ${document.getElementById('city').value}`
    //   };

    //   console.log("Order Processed Successfully:", orderDetails);

    //   successModal.classList.remove('hidden');
    // });

    // modalCloseBtn.addEventListener('click', () => {
    //   window.location.href = "index.html";
    // });

