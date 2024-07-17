let carts = document.querySelectorAll('.add-cart');


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

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

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
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }

    }
    localStorage.setItem("productsInCart", JSON.stringify
        (cartItems));
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
        (".products");

    console.log(cartItems);

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
         <div class="product">
             <div class="prodet">
                 <i class="fa-solid fa-rectangle-xmark"></i>
                 <img src="${item.tag}.jpg">
                 <span>${item.name}</span>
             </div>
             <div class="quandet">
             <input type="number" oninput="getvalue()" id="quantity" name="quantity" value="${item.inCart}" min="1" max="50">
          </div>
           
             <div class="sizdet">
                <input type="number" oninput="getvalue()"  id="sizerange" name="quantity" value="0" min="0" max="500">
             </div>
             
             <div id="totaldet">
             $0.00
             </div>
         </div>
    `

        });
    }

}
function getvalue(){
let name = document.getElementById('sizerange').value
let qua = document.getElementById('quantity').value
if (name <=25){
    document.getElementById('totaldet').innerHTML = name * 47 * qua;
    }
    else if (name >50){
        document.getElementById('totaldet').innerHTML = name * 42 *qua;
    }
    else if (name > 75){
        document.getElementById('totaldet').innerHTML = name * 36.5 * qua;
    }
    else if (150 <= name <= 300){
        document.getElementById('totaldet').innerHTML = name * 30 * qua
    }
    else if (300 <= name <= 500){
        document.getElementById('totaldet').innerHTML = name * 26 * qua
    }
    else{
    document.getElementById('totaldet').innerHTML = "Select valid size"

    }
}




onLoadCartNumbers();
displayCart();