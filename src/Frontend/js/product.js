document.addEventListener('DOMContentLoaded', function() {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (product) {
      document.getElementById('product-name').textContent = product.name;
      document.getElementById('product-image').src = product.image;
      document.getElementById('product-price').textContent = product.price;
      document.getElementById('product-description').textContent = product.description;
    }
    
  });

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
