document.addEventListener('DOMContentLoaded', () => {
    const products = [
      { id: 1, name: 'Produkt 1', price: '19.99€', image: 'image1.jpg' },
      { id: 2, name: 'Produkt 2', price: '29.99€', image: 'image2.jpg' },
      { id: 3, name: 'Produkt 3', price: '39.99€', image: 'image3.jpg' },
      { id: 4, name: 'Produkt 4', price: '49.99€', image: 'image4.jpg' },
      { id: 5, name: 'Produkt 5', price: '49.99€', image: 'image5.jpg' },
      { id: 6, name: 'Produkt 6', price: '49.99€', image: 'image6.jpg' },
      { id: 4, name: 'Produkt 4', price: '49.99€', image: 'image4.jpg' },
    ];
  
    const productList = document.getElementById('product-list');
  
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
  
      productCard.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">
        <p>${product.price}</p>
        <button>Zum Warenkorb hinzufügen</button>
      `;
  
      productList.appendChild(productCard);
    });
  });

