/**
 * Onlineshop
 *
 * Author: Colin Piguet
 *
 * Description:
 * This project is an online shop where you can add products to a cart, 
 * log in, or register. You can order these products with the integration 
 * of Stripe.
 *
 * Date: 28.06.2024
 *
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
  const product = JSON.parse(localStorage.getItem('selectedProduct'));
  if (product) {
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-name').textContent = product.name;
    const price = product.price ? `${parseFloat(product.price / 100).toFixed(2)} CHF` : 'Preis nicht verfügbar';
    document.getElementById('product-price').textContent = price;
    document.getElementById('product-description').textContent = product.description;
  }

  // Hier solltest du das accessToken aus dem localStorage abrufen
  const accessToken = localStorage.getItem('accessToken');

  document.getElementById('add-to-cart-btn').addEventListener('click', function() {
    addToCart(product._id); // product._id ist der productId
  });
});

// Die addToCart Funktion aktualisieren, um productId und accessToken zu übergeben
const addToCart = async (productId) => {
  const product = await fetch(`http://localhost:5000/api/products/find/${productId}`)
  const productJSON = await product.json()
  console.log(productJSON);

let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
currentCart.push({
    productId: productJSON
});
localStorage.setItem("cart", JSON.stringify(currentCart));
};

// Hamburger Menu ------------------------------------------------------
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

// Dropdown in Menu ----------------------------------------------------
const dropdowns = document.querySelectorAll('.dropdown-btn');

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('active');
    const dropdownContent = dropdown.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
});
