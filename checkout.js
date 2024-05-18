let listCart = [];

function checkCart() {
    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}

function updateCartCookie() {
    document.cookie = `listCart=${JSON.stringify(listCart)}; path=/`;
}

function removeFromCart(index) {
    listCart.splice(index, 1);
    updateCartCookie();
    addCartToHTML();
}

function addCartToHTML() {
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;

    // if has product in Cart
    if (listCart) {
        listCart.forEach((product, index) => {
            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                    `<img src="${product.image}">
                    <div class="info-container">
                        <div class="info py-3 ps-3">
                            <div class="name ms-3">${product.name}</div>
                            <div class="price">${product.price} лв.</div>
                        </div>
                        <button class="removeBtn" data-index="${index}">x</button>
                    </div>
                    <div class="quantity fs-5">${product.quantity}</div>
                    <div class="returnPrice">${product.price * product.quantity} лв.</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        });
    }

    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = totalPrice + ' лв.';

    // Add event listeners to remove buttons
    document.querySelectorAll('.removeBtn').forEach(button => {
        button.addEventListener('click', function () {
            let index = this.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

checkCart();
addCartToHTML();
