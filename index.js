let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Слушалки Plantronics Audio 628 USB',
        image: 'el.jpg',
        price: 60,
        availableCount: 3
    },
    {
        id: 2,
        name: 'Слушалки Plantronics Audio 628 USB',
        image: 'el.jpg',
        price: 60,
        availableCount: 1
    },
    {
        id: 3,
        name: 'Слушалки Plantronics Audio 628 USB',
        image: 'el.jpg',
        price: 50,
        availableCount: 1
    },
    {
        id: 4,
        name: 'Слушалки Plantronics Audio 628 USB',
        image: 'el.jpg',
        price: 45,
        availableCount: 1
    },
    {
        id: 5,
        name: 'Слушалки Plantronics Audio 628 USB',
        image: 'el.jpg',
        price: 38,
        availableCount: 1
    },
    {
        id: 6,
        name: 'Слушалки Plantronics Audio 628 USB',
        image: 'el.jpg',
        price: 100,
        availableCount: 1
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}">
            <div class="title text-start ms-3">${value.name}</div>
            <hr>
            <div class="price text-start ms-3"><p class="card-text">${value.price.toLocaleString()}лв. Оставащо количество: <span class="available-count">${value.availableCount.toLocaleString()}</span></p></div>
            <button id="addButton_${key}" class="btn" onclick="addToCard(${key})">Добави в количката</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(products[key].availableCount > 0){
        if(listCards[key] == null){
            // copy product form list to list card
            listCards[key] = JSON.parse(JSON.stringify(products[key]));
            listCards[key].quantity = 1;
            let addButton = document.getElementById(`addButton_${key}`);
            if (addButton) {
                addButton.textContent = 'Добавено в количката';
            }
            products[key].availableCount--; 
        } else {
            listCards[key].quantity++;
            products[key].availableCount--; 
        }
        reloadCard();
        // Update the available count in the UI
        let availableCountElement = document.querySelector(`#addButton_${key}`).previousElementSibling.querySelector('.available-count');
        if (availableCountElement) {
            availableCountElement.textContent = products[key].availableCount;
        }
    } else {
        alert("Продуктът вече не е в наличност.");
    }
}


function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.style.zIndex = '999';
            newDiv.innerHTML = `
                <div><img src="images/${value.image}"/></div>
                <div class="sm-words">${value.name}</div>
                <div>${value.price.toLocaleString()}лв.</div>
                <div>
                    <button class="px-2 " onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = `${totalPrice.toLocaleString()} лв.`;
    quantity.innerText = count;
}


function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
        let addButton = document.getElementById(`addButton_${key}`);
        if (addButton) {
            addButton.textContent = 'Добави в количката';
            products[key].availableCount++;
        }
    } else if (quantity <= products[key].availableCount) {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    } else {
        alert('Надвишава наличното количество.');
        return; // Exit the function
    }
    reloadCard();

    // Update the available count in the UI
    let availableCountElement = document.querySelector(`#addButton_${key}`).previousElementSibling.querySelector('.available-count');
    if (availableCountElement) {
        availableCountElement.textContent = products[key].availableCount;
    }
}