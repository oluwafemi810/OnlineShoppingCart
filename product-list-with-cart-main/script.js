document.addEventListener('DOMContentLoaded', () => {
  const foodSection = document.querySelector('.food-section');
  const cartItems = document.querySelector('.cart-items');
  const cartCount = document.querySelector('.cart-count');
  const cartTotal = document.querySelector('.cart-total');
  const totalAmountEl = document.querySelector('.total-amount');
  
  fetch('data.json')
    .then(res => res.json())
    .then(foods => {
      foodSection.innerHTML = foods.map((food, index) => `
        <div class="food-item" data-index="${index}">
          <div class="food-image-section">
            <img class="food-image" src="${food.image.desktop}" alt="${food.name}">
            <div class="add-to-cart">
                <img src="assets/images/icon-add-to-cart.svg">
              <p>Add to Cart</p>
            </div>
            <div class="quantity-selector">
              <button class="quantity-btn minus">-</button>
              <span class="quantity-num">0</span>
              <button class="quantity-btn plus">+</button>
            </div>
          </div>
          <div class="food-description">
            <p>${food.category}</p>
            <strong>${food.name}</strong>
            <p>$${food.price.toFixed(2)}</p>
          </div>
        </div>
      `).join('');

      const cart = {};

      foodSection.querySelectorAll('.food-item').forEach(item => {
        const index = item.dataset.index;
        const plusBtn = item.querySelector('.plus');
        const minusBtn = item.querySelector('.minus');
        const qtyDisplay = item.querySelector('.quantity-num');

        // Add item to cart
        plusBtn.addEventListener('click', () => {
          if (!cart[index]) cart[index] = { ...foods[index], quantity: 0 };
          cart[index].quantity++;
          qtyDisplay.textContent = cart[index].quantity;
          updateCart();
        });

        // Remove/decrement item
        minusBtn.addEventListener('click', () => {
          if (!cart[index]) return;
          cart[index].quantity--;
          if (cart[index].quantity < 0) cart[index].quantity = 0;
          qtyDisplay.textContent = cart[index].quantity;
          updateCart();
        });
      });

      function updateCart() {
        cartItems.innerHTML = '';
        let totalCount = 0;
        let totalAmount = 0;

        Object.values(cart).forEach(item => {
            if (item.quantity > 0) {
        let itemAmount = item.price * item.quantity;
        totalCount += item.quantity;
        totalAmount += itemAmount;

        cartItems.innerHTML += `
            <div class="price-tag">
            <h4 class = "order-item-name">${item.name}</h4>
            <div class="item-clearance">
                <strong>${item.quantity}x</strong>
                <p>@$${item.price.toFixed(2)}</p>
                <p>$${itemAmount.toFixed(2)}</p>
                <button class="cancel-button">
                <img src="assets/images/icon-remove-item.svg">
                </button>
            </div>
            <hr class="item-line">
            </div>
        `;
        }
    });

        cartCount.textContent = totalCount;

        /* SHOW / HIDE TOTAL */
        if (totalCount > 0) {
            cartTotal.style.display = 'block';
            totalAmountEl.textContent = `$${totalAmount.toFixed(2)}`;
        } else {
            cartTotal.style.display = 'none';
        }

        // Remove item buttons
        cartItems.querySelectorAll('.cancel-button').forEach((btn, i) => {
            btn.addEventListener('click', () => {
            const keys = Object.keys(cart).filter(key => cart[key].quantity > 0);
            const key = keys[i];
            cart[key].quantity = 0;
            foodSection.querySelector(
                `.food-item[data-index="${key}"] .quantity-num`
            ).textContent = 0;
            updateCart();
            });
        });
        }
    })
    .catch(err => console.error(err));
});