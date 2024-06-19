document.addEventListener('DOMContentLoaded', async function() {

    // Daten für Produkte von Backend holen
    const response = await fetch('http://10.80.4.29:3000/products')
    const products = await response.json();

    // Produkte der Kategorie mWrist anzeigen
    const productList = document.getElementById('mWrist-list');
    
    const filteredProducts = products.filter(product => product.category === 'mWrist');
    
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.price}</p>
      `;
      
      productCard.addEventListener('click', () => viewProduct(product));
      productList.appendChild(productCard);
    });
  });
  
  // Funktion zur Anzeige eines einzelnen Produkts
  function viewProduct(product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = '../../product.html';
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
  