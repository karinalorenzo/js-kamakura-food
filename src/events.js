import { products } from "../assets/data/data.js";
import { renderFilters, renderProducts } from "./menu.js";
import { toggleCart, addToCart } from "./cart.js";
import { showReceipt } from "./receipt.js";
import { initSearcher } from "./searcher.js";



renderFilters();
renderProducts(products);
initSearcher();

document.getElementById("filters").addEventListener("click", e => {
    if (!e.target.classList.contains("filter")) return;

    const category = e.target.dataset.category;

    if (category === "todos") {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(item => item.category === category);
    renderProducts(filtered);
});

// Listener para los botones "Añadir"
document.getElementById("products").addEventListener("click", e => {
    if (!e.target.classList.contains("add-button")) return;

    const id = Number(e.target.dataset.id);
    addToCart(id);
});

document.getElementById("cart").addEventListener("click", toggleCart);

document.getElementById("proceedPay-button").addEventListener("click", showReceipt);

