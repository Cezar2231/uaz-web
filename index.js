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
        price: 60
    },
    {
        id: 2,
        name: 'Слушалки Plantronics Audio 628 USB',
        image: 'el.jpg',
        price: 60
    },
    {
        id: 3,
        name: 'Слушалки Plantronics Audio 628 USB',
        image: 'el.jpg',
        price: 50
    },
    {
        id: 4,
        name: 'Слушалки Plantronics Audio 628 USB',
        image: 'el.jpg',
        price: 45
    },
    {
        id: 5,
        name: 'Слушалки Plantronics Audio 628 USB',
        image: 'el.jpg',
        price: 38
    },
    {
        id: 6,
        name: 'Слушалки Plantronics Audio 628 USB',
        image: 'el.jpg',
        price: 100
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price"><p class="card-text">${value.price.toLocaleString()}лв.</p></div>
            <button onclick="addToCard(${key})">Добави в количката</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
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
                <div>${value.name}</div>
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
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}