const products = [
  { id: 1, name: "Laptop", price: 50000, image: "images/laptop.png" },
  { id: 2, name: "Phone", price: 20000, image: "images/phone.png" },
  { id: 3, name: "Headphones", price: 3000, image: "images/headphones.png" },
  { id: 4, name: "Smart Watch", price: 7000, image: "images/watch.png" },
  { id: 5, name: "Tablet", price: 15000, image: "images/tablet.png" },
  { id: 6, name: "Camera", price: 40000, image: "images/camera.png" },
  { id: 7, name: "Keyboard", price: 2000, image: "images/keyboard.png" },
  { id: 8, name: "Mouse", price: 1000, image: "images/mouse.png" },
  { id: 9, name: "Monitor", price: 12000, image: "images/monitor.png" },
  { id: 10, name: "Speaker", price: 5000, image: "images/speaker.png" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* PRODUCT PAGE */
if (document.getElementById("products")) {
  const container = document.getElementById("products");

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;

    container.appendChild(div);
  });

  updateCartCount();
}

/* ADD */
function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) item.qty++;
  else cart.push({ ...products.find(p => p.id === id), qty: 1 });

  saveCart();
  updateCartCount();
}

/* SAVE */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* COUNT */
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

/* CART PAGE */
if (document.getElementById("cartItems")) renderCart();

function renderCart() {
  const list = document.getElementById("cartItems");
  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.qty}
      <div class="actions">
        <button class="qty" onclick="changeQty(${item.id}, 1)">+</button>
        <button class="qty" onclick="changeQty(${item.id}, -1)">-</button>
        <button class="remove" onclick="removeItem(${item.id})">X</button>
      </div>
    `;

    list.appendChild(li);
  });

  document.getElementById("total").textContent = "Total: ₹" + total;
}

/* CHANGE */
function changeQty(id, amount) {
  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.qty += amount;
  if (item.qty <= 0) cart = cart.filter(p => p.id !== id);

  saveCart();
  renderCart();
}

/* REMOVE */
function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  renderCart();
}

/* BUY */
function buyNow() {
  if (cart.length === 0) return alert("Cart is empty!");

  document.getElementById("popup").style.display = "flex";

  cart = [];
  localStorage.removeItem("cart");
}

/* CLOSE POPUP */
function closePopup() {
  document.getElementById("popup").style.display = "none";
  location.reload();
}