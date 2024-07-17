let carts = document.querySelectorAll('.add-cart');

let products = [
  {
    name: 'Art Deco Lightning Angled',
    tag: 'Art Deco Lightning Angled  20X20 122',
    size: '20×20',
    pesa: '105',
    pid: 122,
    inCart: 0
  },
  {
    name: 'Art Deco Lightning Stripes',
    tag: 'Art Deco Triangle Stripes  16x16  1',
    size: '16×16 ',
    pesa: '65',
    pid: 1,
    inCart: 0
  },
  {
    name: 'Art Deco Box',
    tag: 'Art Deco Box 16x16  37',
    size: '16×16 ',
    pesa: '65',
    pid: 37,
    inCart: 0
  },
  {
    name: 'Art Deco Bubble',
    tag: 'Art Deco Bubble 16X16  121',
    size: '16×16 ',
    pesa: '65',
    pid: 121,
    inCart: 0
  },
  {
    name: 'Flower Power Field',
    tag: 'Flower Power Field  20x20 98',
    size: '20×20',
    pesa: '105',
    pid: 98,
    inCart: 0,
  },
  {
    name: 'Flower Power',
    tag: 'Flower Power 40x40  99',
    size: '40×40',
    pesa: '225',
    pid: 99,
    inCart: 0,
  },
  {
    name: 'Art Deco Tile',
    tag: 'Art Deco Tile  20x20  38',
    size: '20×20',
    pesa: '105',
    pid: 38,
    inCart: 0,
  },
  {
    name: 'Art Deco Cornered Stripes',
    tag: 'Art Deco Cornered Stripes 40x40  3',
    size: '40×40',
    pesa: '225',
    pid: 3,
    inCart: 0,
  },
  {
    name: 'Flower Power Cornered',
    tag: 'Flower Power Cornered 16x16  97',
    size: '16×16 ',
    pesa: '65',
    pid: 97,
    inCart: 0
  },
  {
    name: 'Art Deco Tile',
    tag: 'Art Deco Tile 40x40  39',
    size: '40×40',
    pesa: '225',
    pid: 39,
    inCart: 0,
  },
  {
    name: 'Art Deco TIle',
    tag: 'Art Deco Tile 20x100  40',
    size: '20×100',
    pesa: '295',
    pid: 40,
    inCart: 0,
  },
  {
    name: 'Art Deco Lightning',
    tag: 'Art Deco Lightning  20x100 124',
    size: '20×100',
    pesa: '295',
    pid: 124,
    inCart: 0,
  },
  {
    name: 'Flower Power Cornered',
    tag: 'Flower power Cornered 20x100  100',
    size: '20×100',
    pesa: '295',
    pid: 100,
    inCart: 0,
  }

]

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    event.preventDefault();
    cartNumbers(products[i]);
  })
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    if (!cartItems || !cartItems[product.tag]) {
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cart span').textContent = productNumbers + 1;
    }
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }

  setItems(product);
}



function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      // Product not in cart, add it
      product.inCart = 1;
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    } else {
      // Product already in cart
      alert('Product already in cart');
    }
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  displayCart();
}




function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let total = 0; // define total variable

  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
          <div class="product">
            <div class="prodet">
              <i class="fa-solid fa-rectangle-xmark" data-tag="${item.tag}"></i>
              <img src="${item.tag}.jpg">
              <span>${item.name}</span>
            </div>
            <div class="hashtag">
              <span>Silk Weave 100%</span>
            </div>
            <div class="sizdet">
              <span>${item.size}</span>
            </div>
            <div class="quandet">
              <input type="number" id="quantity" name="${item.tag}" value="${item.inCart}" min="1" max="50" onchange="updateTotalPrice('${item.tag}')">
            </div>
            <div class="totaldet">
              <span id="total-${item.tag}">$${item.pesa * item.inCart}</span>
            </div>
          </div>
          <br>
      
        `;

      total += item.pesa * item.inCart; // update total
    });


    
    localStorage.setItem("Total", JSON.stringify(+ total)); 
    document.getElementById('total-price').textContent = total;
    // ... rest of the function code
    // Add event listener to delete icon
    let deleteIcons = document.querySelectorAll(".fa-rectangle-xmark");
    deleteIcons.forEach(icon => {
      icon.addEventListener("click", () => {
        let tag = icon.getAttribute("data-tag");
        removeItemFromCart(tag);
        displayCart();
      });
    });
  }
}




function removeItemFromCart(tag) {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  let productNumbers = parseInt(localStorage.getItem("cartNumbers"));
  let item = cartItems[tag];

  if (item) {
    // Decrease cart count
    localStorage.setItem("cartNumbers", productNumbers - 1);


    // Update cart span
    document.querySelector('.cart span').textContent = parseInt(document.querySelector('.cart span').textContent) - 1;

    // Remove item from cart
    delete cartItems[tag];
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  }
}




function updateTotalPrice(productTag) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  let quantity = parseInt(document.getElementsByName(productTag)[0].value);

  cartItems[productTag].inCart = quantity;
  cartItems[productTag].total = cartItems[productTag].pesa * quantity;

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));

  let totalElement = document.getElementById(`total-${productTag}`);
  totalElement.textContent = `$${cartItems[productTag].total}`;
}

// Define a function to update the content of the element
function updateElement() {
  const element = document.getElementById("total-price");
}

// Call the function immediately to update the element once when the page loads
updateElement();

// Call the function every 5 seconds to update the element periodically
setInterval(updateElement, 5000);











displayCart();






onLoadCartNumbers();
displayCart();