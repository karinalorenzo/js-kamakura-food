//DEBE buscar los productos por los filtros

import { products } from "../assets/data/data.js";
import { renderProducts } from "./menu.js";

const searchInput = document.getElementById("searcher");

export function initSearcher() {
    searchInput.addEventListener("input", () => {
        const text = searchInput.value.toLowerCase().trim();

        // Si el buscador está vacío → mostrar todos los productos
        if (text === "") {
            renderProducts(products);
            return;
        }

        // Filtrar por nombre o categoría
        const filtered = products.filter(item =>
            item.name.toLowerCase().includes(text) ||
            item.category.toLowerCase().includes(text)
        );

        renderProducts(filtered);
    });
}
