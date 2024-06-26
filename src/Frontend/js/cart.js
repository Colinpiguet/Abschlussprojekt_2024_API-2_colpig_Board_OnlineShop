function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Initial cart:', cart);
    const cartElement = document.getElementById('cart');
    const totalPriceElement = document.getElementById('total-price');

    cartElement.innerHTML = "";

    if (cart.length === 0) {
        cartElement.innerHTML = '<p>Der Warenkorb ist leer.</p>';
    } else {
        cart.forEach(productReturn => {
            const product = productReturn.productId;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const price = product.price ? `${parseFloat(product.price / 100).toFixed(2)} CHF` : 'Preis nicht verfügbar';

            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${price}</p>
                <button onclick="removeFromCart('${product._id}')">Entfernen</button>
            `;
            cartElement.appendChild(cartItem);
        });

        updateTotalPrice();
    }

    document.getElementById('checkout-button').addEventListener('click', async function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const items = cart.map(product => ({
            id: product.productId._id,
            quantity: product.quantity || 1,
        }));
    
        try {
            const response = await fetch("http://localhost:5000/api/checkout/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items }),
            });
            console.log(response);
    
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
    
            const { url } = await response.json();
            location.href = url;
    
            if (error) {
                console.error(error);
            }
        } catch (e) {
            console.error(e);
        }
    });

    function updateTotalPrice() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalPrice = cart.reduce((sum, product) => {
            const price = product.productId.price ? parseFloat(product.productId.price.replace('CHF', '').replace(',', '.')) : 0;
            return sum + price;
        }, 0) / 100;
        document.getElementById('total-price').textContent = totalPrice.toFixed(2) + ' CHF';
    }
};

document.addEventListener('DOMContentLoaded', loadCart);


function removeFromCart(productId) {
    console.log('Removing product with ID:', productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart before removal:', cart);
    cart = cart.filter(product => product.productId._id !== productId);
    console.log('Cart after removal:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
   
    loadCart()
}

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
