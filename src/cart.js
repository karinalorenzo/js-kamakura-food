import { products } from "../assets/data/data.js";

const cartContainer = document.getElementById("cart-container");
const cartProductsContainer = document.getElementById("cart-products");
const cartTotal = document.getElementById("cart-total");

let cart = [];

// ⭐ Crear badge dinámicamente
const cartIcon = document.getElementById("cart");
const cartCount = document.createElement("span");

cartCount.id = "cart-count";
cartCount.classList.add("cart-count");
cartCount.style.display = "none"; // oculto al inicio

cartIcon.appendChild(cartCount);

// ⭐ Actualizar numerito del carrito
function updateCartCount() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.style.display = "flex";
    } else {
        cartCount.style.display = "none";
    }
}

export function getCart() {
    return cart;
}

export function clearCart() {
    cart = [];
    renderCart();
    updateCartCount(); // ⭐ actualizar badge
}

export function calculateTotal() {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

export function toggleCart() {
    const isHidden = cartContainer.style.display === "" || cartContainer.style.display === "none";

    if (isHidden) {
        cartContainer.style.display = "flex";
    } else {
        cartContainer.style.display = "none";
    }
}

export function addToCart(id) {
    const exists = cart.find(item => item.id === id);

    if (!exists) {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
    updateCartCount(); // ⭐ actualizar badge
}

export function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
    updateCartCount(); // ⭐ actualizar badge
}

function increaseQuantity(id) {
    const item = cart.find(p => p.id === id);
    item.quantity++;
    renderCart();
    updateCartCount(); // ⭐ actualizar badge
}

function decreaseQuantity(id) {
    const item = cart.find(p => p.id === id);
    item.quantity--;

    if (item.quantity === 0) {
        removeFromCart(id);
        return;
    }

    renderCart();
    updateCartCount(); // ⭐ actualizar badge
}

export function renderCart() {
    cartProductsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartProductsContainer.innerHTML = `<h3>Añade un plato a tu menú</h3>`;
        cartTotal.textContent = "Total: €";
        return;
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-container");

        div.innerHTML = `
            <button class="close-button" data-id="${item.id}">
                <img src="./assets/img/close.svg" alt="close">
            </button>

            <div class="text-container">
                <h3>${item.name}</h3>
                <h5>${item.price} €</h5>
            </div>

            <div class="quantity-container">
                <button class="increase" data-id="${item.id}">+</button>
                <p class="quantity">${item.quantity}</p>
                <button class="decrease" data-id="${item.id}">-</button>
            </div>
        `;

        cartProductsContainer.appendChild(div);
    });

    const total = calculateTotal().toFixed(2);
    cartTotal.textContent = `Total: ${total} €`;

    addCartListeners();
}

function addCartListeners() {
    document.querySelectorAll(".close-button").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            removeFromCart(id);
        });
    });

    document.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            increaseQuantity(id);
        });
    });

    document.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            decreaseQuantity(id);
        });
    });
}
