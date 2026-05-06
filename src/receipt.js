//Aquí intenta poner las funcionalidades del recibo
import { getCart, calculateTotal, clearCart } from "./cart.js";

const receiptContainer = document.getElementById("receipt-container");
const receiptProducts = document.getElementById("receipt-product");
const receiptTotal = document.getElementById("receipt-total");
const closeReceiptBtn = document.getElementById("close-receipt");

const productsContainer = document.getElementById("products-container"); // carrito visible

export function showReceipt() {
    const cart = getCart();

    receiptProducts.innerHTML = "";

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("receipt-product");

        const subtotal = (item.price * item.quantity).toFixed(2);

        div.innerHTML = `
            <h3>${item.name}</h3>
            <div class="receipt-price">
                <p>Cantidad: ${item.quantity}</p>
                <h5>${subtotal} €</h5>
            </div>
        `;

        receiptProducts.appendChild(div);
    });

    const total = calculateTotal().toFixed(2);
    receiptTotal.textContent = `Total: ${total} €`;

    // Ocultar carrito
    productsContainer.style.display = "none";

    // Mostrar recibo
    receiptContainer.style.display = "flex";
    
    const payButton = document.getElementById("pay-button");
    if (payButton) {
        payButton.addEventListener("click", showModal);
    }
}

export function hideReceipt() {
    receiptContainer.style.display = "none";
    productsContainer.style.display = "flex";

    receiptProducts.innerHTML = "";
    receiptTotal.textContent = "Total: €";
}

closeReceiptBtn.addEventListener("click", hideReceipt);


function showModal() {

    // 1. Ocultar recibo
    hideReceipt();

    // 2. Limpiar carrito
    clearCart();

    // 3. Crear modal dinámico
    const modal = document.createElement('div');
    modal.classList.add('confirmation-modal');

    modal.innerHTML = `
        <div class="confirmation-modal-content">
            <button class="close-button" id="close-modal">
                <img src="./assets/img/close.svg" alt="close">
            </button>
            <h3>Gracias por tu compra</h3>
            <p>¡Pedido realizado con éxito, gracias por comprar en Kamakura Food!</p>
            <img src="./assets/img/logo.svg" alt="Logo" class="modal-logo">
        </div>
    `;

    document.body.appendChild(modal);

    // 4. Cerrar modal
    const closeModalButton = modal.querySelector('#close-modal');
    closeModalButton.addEventListener('click', () => {
        modal.remove();
    });
}
