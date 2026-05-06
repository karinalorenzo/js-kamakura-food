//DEBE imprimir en pantalla la información de filtros.

//DEBE imprimir en pantalla los productos, con su Título, descripción y precio en € y botón de añadir.
import { filters, products } from "../assets/data/data.js";

const filtersContainer = document.getElementById("filters");
const productsContainer = document.getElementById("products");

export function renderFilters() {
    filtersContainer.innerHTML = "";

    filters.forEach(filter => {
        const button = document.createElement("button");
        button.classList.add("filter");
        button.textContent = filter;
        button.dataset.category = filter;
        filtersContainer.appendChild(button);
    });
}

export function renderProducts(list) {
    productsContainer.innerHTML = "";

    list.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("product-container");

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="price-container">
                <h5>${item.price} €</h5>
                <button class="add-button" data-id="${item.id}">Añadir</button>
            </div>
        `;

        productsContainer.appendChild(div);
    });
}
