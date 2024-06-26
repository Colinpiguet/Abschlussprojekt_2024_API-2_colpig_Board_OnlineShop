document.addEventListener('DOMContentLoaded', async function() {
  // Daten für Produkte von Backend holen
  const response = await fetch('http://localhost:5000/api/products');
  const products = await response.json(); 

  // Alle Produkte auf der Startseite anzeigen
  const productList = document.getElementById('product-list');
  
  products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      
      // Stelle sicher, dass der Preis korrekt formatiert ist
      const price = product.price ? `${parseFloat(product.price / 100).toFixed(2)} CHF` : 'Preis nicht verfügbar';

      productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${price}</p>
      `;
      
      productCard.addEventListener('click', () => viewProduct(product));
      productList.appendChild(productCard);
  });
});

// Funktion zur Anzeige eines einzelnen Produkts
function viewProduct(product) {
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = 'product.html';
}

// Hamburger Menü
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

// Dropdown im Menü
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
