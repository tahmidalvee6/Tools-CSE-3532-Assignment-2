let allProducts = [];

//  this is for fetch product from products.json file
function localFetch() {
  fetch("./data/products.json")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      allProducts = data.products; // Store products for search
      const container = document.getElementById("product-grid");
      data.products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card-wrapper");
        card.innerHTML = ` 
                <div class="product-card bg-white rounded-2xl border border-gray-300 overflow-hidden transform transition duration-300 ease-in-out hover:shadow-lg">
                <!-- <p>${product.id}</p> -->
                    <img src="${product.image}" class="mx-auto h-56 object-contain p-4" alt="shirt">
                    <div class="p-5">
                        <p class=" font-medium text-gray-900 mb-3">${product.title}</p>
                        <p class="text-xl text-yellow-300 mb-2">${product.rating}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-base font-bold text-gray-900">$${product.price}</span>
                            <button id='btn-${product.id}' onclick="addToCart(${product.id}, ${product.price})" class="text-white bg-orange-500 rounded-lg px-4 py-2 text-xs font-semibold transform transition duration-300 ease-in-out hover:bg-gray-900">Add To Cart</button>
                        </div>
                    </div>
                </div>
            `;
        container.appendChild(card);
      });
    });
}
localFetch();

function goToProducts() {
  document.getElementById("products").scrollIntoView({
    behavior: "smooth",
  });
}

//  search functinality
function filterProducts() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const container = document.getElementById("product-grid");
  if (searchInput === "") {
    container.innerHTML = "";
    allProducts.forEach((product) => {
      card = document.createElement("div");
      card.classList.add("product-card-wrapper");
      card.innerHTML = ` 
                <div class="product-card bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg">
                    <img src="${product.image}" class="mx-auto h-56 object-contain p-4" alt="shirt">
                    <div class="p-5">
                        <p class="text-sm font-medium text-gray-900 mb-3">${product.title}</p>
                        <p class="text-xl text-yellow-300 mb-2">${product.rating}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-base font-bold text-gray-900">$${product.price}</span>
                            <button id='btn-${product.id}' onclick="addToCart(${product.id}, ${product.price})" class="text-white bg-orange-500 rounded-lg px-4 py-2 text-xs font-semibold hover:bg-gray-900">Add To Cart</button>
                        </div>
                    </div>
                </div>
            `;
      container.appendChild(card);
    });
    return;
  }

  container.innerHTML = "";
  allProducts.forEach((product) => {
    if (product.title.toLowerCase().includes(searchInput)) {
      card = document.createElement("div");
      card.classList.add("product-card-wrapper");
      card.innerHTML = ` 
                <div class="product-card bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg">
                    <img src="${product.image}" class="mx-auto h-56 object-contain p-4" alt="shirt">
                    <div class="p-5">
                        <p class="text-sm font-medium text-gray-900 mb-3">${product.title}</p>
                        <p class="text-xl text-yellow-300 mb-2">${product.rating}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-base font-bold text-gray-900">$${product.price}</span>
                            <button id='btn-${product.id}' onclick="addToCart(${product.id}, ${product.price})" class="text-white bg-orange-500 rounded-lg px-4 py-2 text-xs font-semibold hover:bg-gray-900">Add To Cart</button>
                        </div>
                    </div>
                </div>
            `;
      container.appendChild(card);
    }
  });
}

//  fetch review
function fetchReview() {
  fetch("./data/reviews.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("reviews");

      data.reviews.forEach((review) => {
        const item = document.createElement("div");
        item.classList.add("carousel-item");

        item.innerHTML = `
          <div class="bg-white border border-gray-300 rounded-2xl p-6 w-80">
            
            <p class="text-yellow-400 text-sm mb-2">
              ${review.rating}
            </p>

            <p class="text-gray-500 text-sm italic mb-4">
              "${review.review}"
            </p>

            <div class="flex items-center gap-3">
              <img src="${review.image}" 
                   class="w-10 h-10 rounded-full object-cover border" />

              <div>
                <p class="font-semibold text-sm text-gray-900">
                  ${review.name}
                </p>
                <p class="text-xs text-gray-400">
                  ${review.date}
                </p>
              </div>
            </div>

          </div>
        `;

        container.appendChild(item);
      });
      autoSlide();
    });
}
fetchReview();

const container = document.getElementById("reviews");
// nextx btn
function nextReview() {
  container.scrollBy({
    left: 320,
    behavior: "smooth",
  });
}
// previous btn
function prevReview() {
  container.scrollBy({
    left: -320,
    behavior: "smooth",
  });
}
// autp play slide
function autoSlide() {
  setInterval(() => {
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      container.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      nextReview();
    }
  }, 5000);
}

let balance = 1000;
let dele_charge = 120;
let isdiscount = false;
let discount = 10;
let initialcart = 0;
let total_cost = 0;
let total_cart = 0;

let total_bal = document.querySelector(".total-bal");
let add_price = document.getElementById("money-input");
let final_bal = document.getElementById("final-bal");
let cart_price = document.getElementById("cart-money");
let add_money_btn = document.getElementById("add-money");
let show_discount = document.getElementById("dis-show");
let placeOrder = document.getElementById("place-order");
let cupon_input = document.getElementById("cupon-input");
let add_cupon_btn = document.getElementById("add-cupon");
let cartCount = document.getElementById("cart-count");

total_bal.innerHTML = balance;
final_bal.innerHTML = `00`;

function addToCart(id, price) {
  let btn = document.getElementById("btn-" + id);
  if (btn.innerText == "Add To Cart") {
    total_cart += 1;
    let newCart = initialcart + price;
    let discountAmount = 0;
    if (isdiscount) {
      discountAmount = (newCart * discount) / 100;
    }
    let totalCost = newCart + dele_charge - discountAmount;
    if (totalCost > balance) {
      alert("Warning! Not enough balance.");
      return;
    }
    initialcart = newCart;
    cart_price.innerHTML = initialcart;
    // alert("Successfully added cart!");
    btn.innerText = "Remove From Cart";
    btn.classList.remove("bg-orange-500");
    btn.classList.add("bg-red-500");
    cartCount.innerText = total_cart;
    calculation();
  } else {
    total_cart -= 1;
    initialcart = initialcart - price;
    cart_price.innerHTML = initialcart;
    btn.innerText = "Add To Cart";
    btn.classList.remove("bg-red-500");
    btn.classList.add("bg-orange-500");
    cartCount.innerText = total_cart;
    calculation();
    // alert("Remove From Cart");
  }
}

add_money_btn.addEventListener("click", function () {
  const inputValue = parseFloat(add_price.value);

  if (isNaN(inputValue) || inputValue == "") {
    alert("Please enter a valid amount");
    return;
  }
  balance += inputValue;
  total_bal.innerHTML = balance;
  add_price.value = "";
  calculation();
});

add_cupon_btn.addEventListener("click", function () {
  const inputValue = cupon_input.value;
  if (inputValue == "SMART10") {
    isdiscount = true;
    alert("cupon applied");
    calculation();
  } else {
    isdiscount = false;
    alert("invalid cupon code!");
  }
});
function calculation() {
  let discountAmount = 0;
  if (isdiscount) {
    discountAmount = (initialcart * discount) / 100;
  }
  let totalCost = initialcart + dele_charge - discountAmount;
  let finalTotal = balance - totalCost;
  if (finalTotal < 0) {
    finalTotal = 0;
  }
  final_bal.innerHTML = totalCost;
}

placeOrder.addEventListener("click", function () {
  if (initialcart == 0) {
    alert("your cart is empty!");
    return;
  }
  let discountAmount = 0;
  if (isdiscount) {
    discountAmount = (initialcart * discount) / 100;
  }
  let totalCost = initialcart + dele_charge - discountAmount;

  if (totalCost > balance) {
    alert("Warning! Not enough balance.");
    return;
  }
  balance = balance - totalCost;
  total_bal.innerText = balance;

  let allButtons = document.querySelectorAll('button[id^="btn-"]');
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].innerText = "Add To Cart";
    allButtons[i].classList.remove("bg-red-500");
    allButtons[i].classList.add("bg-orange-500");
  }

  initialcart = 0;
  total_cart = 0;
  cart_price.innerText = "00";
  cartCount.innerHTML = "0"
  isdiscount = false;
  cupon_input.value = "";

  calculation();
  alert("Order placed successfully! Thank you for shopping!");
});

// ── Auto Carousel ──
let current = 0;
const total = 3;
const track = document.getElementById("carouselTrack");

setInterval(function () {
  current = (current + 1) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
}, 4000);

document.getElementById("carouselPrev").addEventListener("click", function () {
  current = (current - 1 + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
});

document.getElementById("carouselNext").addEventListener("click", function () {
  current = (current + 1) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
});

// Back to Top Button
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.remove("hidden");
  } else {
    backToTopBtn.classList.add("hidden");
  }
});

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
