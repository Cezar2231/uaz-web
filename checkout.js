let listCart = [];
let cartBody = '';

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


function checkCart() {
    const cookieValue = getCookie('listCart');
    if (cookieValue) {
        try {
            listCart = JSON.parse(cookieValue);
        } catch (error) {
            console.error('Error parsing cookie:', error);
            listCart = [];
        }
    } else {
        listCart = [];
    }
}

function updateCartCookie() {
    setCookie('listCart', JSON.stringify(listCart), 7);  // Cookie expires in 7 days
}

function removeFromCart(index) {
    listCart.splice(index, 1);
    updateCartCookie();
    addCartToHTML();
}

function addCartToHTML() {
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    if (listCartHTML) {
        listCartHTML.innerHTML = '';

        let totalQuantityHTML = document.querySelector('.totalQuantity');
        let totalPriceHTML = document.querySelector('.totalPrice');
        let totalQuantity = 0;
        let totalPrice = 0;

        // if has product in Cart
        if (listCart.length > 0) {
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
                    totalQuantity += product.quantity;
                    totalPrice += (product.price * product.quantity);
                }
            });
        }

        if (totalQuantityHTML) totalQuantityHTML.innerText = totalQuantity;
        if (totalPriceHTML) totalPriceHTML.innerText = totalPrice + ' лв.';

        // Event listeners to remove buttons
        document.querySelectorAll('.removeBtn').forEach(button => {
            button.addEventListener('click', function () {
                let index = this.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }
}

checkCart();
addCartToHTML();

document.getElementById('order-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    // Check if the cart is not empty
    if (listCart.length > 0) {
        // Get all required fields
        let requiredFields = document.querySelectorAll('#order-form [required]');
        let allValid = true;

        // Check if all required fields are filled out
        requiredFields.forEach(field => {
            if (!field.value) {
                allValid = false;
                field.classList.add('error');  
            } else {
                field.classList.remove('error'); 
            }
        });

        // If all fields are valid, proceed with the form submission
        if (allValid) {
            let name = document.getElementById('name').value;
            let phone = document.getElementById('phone').value;
            let address = document.getElementById('address').value;
            let message = document.getElementById('message').value;
            let office = document.getElementById('office').value;
            let city = document.getElementById('city').value;

            let body = '<strong>Contact Information:</strong><br/> Имена: ' + name + '<br/> Телефон: ' + phone + '<br/> Адрес на доставка: ' +
                address + '<br/> Съобщение: ' + message + '<br/> Офис: ' + office + '<br/> Град: ' + city;

            body += '<br/><br/><strong>Поръчка:</strong>' + cartBody;

            Email.send({
                SecureToken : "7aef9683-a83b-4269-a214-0025887c76a8",
                To : 'sisko.10@abv.bg',
                From : 'sisko.10@abv.bg',
                Subject : "Нова поръчка",
                Body : body
            }).then(
                message => alert(message)
            );

            // Clear the input fields
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('address').value = '';
            document.getElementById('message').value = '';
            document.getElementById('office').value = '';
            document.getElementById('city').value = '';

            // Clear the cart
            listCart = [];
            updateCartCookie();
            addCartToHTML();

            alert('Поръчката ви е приета');
            window.location.href = "index.html#thank-you-modal";
        } else {
            alert('Моля, попълнете всички задължителни полета.');
        }
    } else {
        alert('Моля, добавете продукт в количката преди да направите поръчка.');
    }
});
