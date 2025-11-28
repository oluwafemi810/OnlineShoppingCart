fetch('data.json')
  .then(response => response.json())
  .then(foods => {
    const foodSection = document.querySelector('.food-section');

    foodSection.innerHTML = foods.map(food => `
      <div>
        <div class="food-image-section">
          <img class="food-image" src="${food.image.desktop}" alt="${food.name}">
          <div class="add-to-cart">
            <img src="assets/images/icon-add-to-cart.svg" alt="">
            <p>Add to Cart</p>
          </div>
        </div>
        <div class="food-description">
          <p>${food.category}</p>
          <strong>${food.name}</strong>
          <p>$${food.price.toFixed(2)}</p>
        </div>
      </div>
    `).join('');
  })
  .catch(err => console.error('Error loading JSON:', err));

  