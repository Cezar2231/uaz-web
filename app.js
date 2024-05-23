let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let close = document.querySelector('.close');
let checkoutText = document.querySelector('.checkout-text');

if (!cart.style.right) {
    cart.style.right = '-100%';
}

iconCart.addEventListener('click', function(){
    if (cart.style.right === '-100%') {
        cart.style.right = '0';
    } else {
        cart.style.right = '-100%';
    }
});

close.addEventListener('click', function(){
    cart.style.right = '-100%';
});

let products = null;

fetch('product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
});

function addDataToHTML() {
    let sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        let listProductHTML = section.querySelector('.listProduct');
        listProductHTML.innerHTML = '';

        let category = section.id.replace('-', ' ');
        let filteredProducts = products.filter(product => product.category === category);

        filteredProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="" class="product-image" data-id="${product.id}">
            <h2 class="mt-2">${product.name}</h2>
            <hr>
            <div class="price">${product.price} лв.</div>
            <button class="addCart" onclick="addCart(${product.id})">Добави в количката</button>`;
            listProductHTML.appendChild(newProduct);
        });

        section.querySelectorAll('.product-image').forEach(img => {
            img.addEventListener('click', function() {
                let productId = this.dataset.id;
                showProductModal(productId);
            });
        });
    });
}

// Show product modal with details
function showProductModal(productId) {
    let product = products.find(p => p.id == productId);
    if (product) {
        document.getElementById('modal-image').src = product.image;
        document.getElementById('modal-name').innerText = product.name;
        document.getElementById('modal-description').innerText = product.description;
        document.getElementById('modal-price').innerText = product.price + ' лв.';
        document.getElementById('modal-addCart').setAttribute('onclick', `addCart(${product.id})`);

        // Show the modal
        let modal = document.getElementById('product-modal');
        modal.style.display = 'block';
    }
}

// Close the modal when the user clicks on <span> (x)
document.querySelector('.product-modal .close').addEventListener('click', function() {
    document.getElementById('product-modal').style.display = 'none';
});

// Close the modal when the user clicks anywhere outside of the modal
window.addEventListener('click', function(event) {
    let modal = document.getElementById('product-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

let listCart = [];
function checkCart(){
    var cookieValue = document.cookie.split('; ').find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();

function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));
    if(!listCart[$idProduct]) {
        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    }else{
        listCart[$idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    addCartToHTML();
}
addCartToHTML();

function addCartToHTML(){
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;
    let totalPrice = 0;

    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                `<img src="${product.image}">
                <div class="content">
                    <div class="name">${product.name}</div>
                    <div class="price">${product.price} лв.</div>
                </div>
                <div class="quantity">
                    <button onclick="changeQuantity(${product.id}, '-')">-</button>
                    <span class="value">${product.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, '+')">+</button>
                </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity += product.quantity;
                totalPrice += product.price * product.quantity;
            }
        });
    }
    totalHTML.innerText = totalQuantity;
    checkoutText.textContent = `Поръчай: ${totalPrice} лв.`;
}

function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    addCartToHTML();
}
