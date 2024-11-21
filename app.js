//! inputs from user
let inputFrom = document.querySelector(".changeFrom");
let inputTo = document.querySelector(".changeTo");

//! wanting to change the values
let currencyFrom = document.querySelectorAll(".from");
let currencyTo = document.querySelectorAll(".to");

//! current values
let currentValue1 = document.querySelector(".currentValue1");
let currentValue2 = document.querySelector(".currentValue2");

//! burger menu
let burger = document.querySelector('.burgerMenu');
burger.addEventListener('click', () => {
    let nav = document.querySelector('.nav');
    nav.classList.toggle('nav-active');
})

document.addEventListener('click', (e) => {
    if (e.target !== nav) {
        nav.classList.remove('nav-active');
    }
})

//! assign money values to the currencies
const obj = {
    from: 'RUB',
    to: 'USD',
    currentFrom: 0,
    currentTo: 0
}

async function fetchingData(){
    await fetch(`https://v6.exchangerate-api.com/v6/3195f2d508e35437dd7db01/latest/${obj.from}`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        let conversionRateTo = data.conversion_rates[obj.to];
        obj.currentTo = conversionRateTo;
        currentValue1.textContent = '1' + ' ' + obj.from + ' '+ '=' + ' ' + conversionRateTo.toFixed(5) + ' ' +  obj.to;
        currentValue2.textContent = '1' + ' ' + obj.to + ' ' + '=' + ' ' + (1 / conversionRateTo).toFixed(5) + ' ' + obj.from;
        updateInput();
    })
    .catch((error)=>{
        console.log(error);
        alert("Its about your internet connection, please check it out and try again later (or just API is not working :D)");
        inputFrom.value = 0;
        inputTo.value = 0;
    })
}


let lastFocusedInput = null;
inputFrom.addEventListener('focus', () => {
    lastFocusedInput = inputFrom;
});
inputTo.addEventListener('focus', () => {
    lastFocusedInput = inputTo;
});
function updateInput(){
    if (lastFocusedInput === inputFrom) {
        inputTo.value = (inputFrom.value * obj.currentTo).toFixed(5);
    } else if (lastFocusedInput === inputTo) {
        inputFrom.value = (inputTo.value * (1 / obj.currentTo)).toFixed(5);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchingData();
});
currencyFrom.forEach((element)=>{
    element.addEventListener("click", ()=>{
        if (!navigator.onLine) {
            alert('You are offline. Currency conversion will not work :(');
            return;
        }
        document.querySelector('.purpleBack1').classList.remove("purpleBack1");
        element.classList.add("purpleBack1");
        obj.from = element.textContent;
        fetchingData(); 
    })
})

currencyTo.forEach((element)=>{
    element.addEventListener("click", ()=>{
        if (!navigator.onLine) {
            alert('You are offline. Currency conversion will not work :(');
            return;
        }
        document.querySelector('.purpleBack2').classList.remove("purpleBack2");
        element.classList.add("purpleBack2");
        obj.to = element.textContent;
        fetchingData();
    })
})

//! update the values dynamically

inputFrom.addEventListener("input", () => {
    if (!navigator.onLine) {
        alert('You are offline. Currency conversion will not work :(');
        inputFrom.value = '';
        inputTo.value = '';
        return;
    }
    let reNewed = inputFrom.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    let dotCount = (reNewed.match(/\./g) || []).length;
    if (dotCount > 1) {
        reNewed = reNewed.replace(/\./g, (match, index) => index === reNewed.indexOf('.') ? '.' : '');
    }
    if (reNewed.startsWith('0') && reNewed.length > 1 && reNewed[1] !== '.') {
        reNewed = '0.' + reNewed.slice(1).replace(/^0+/, '');
    }
    inputFrom.value = reNewed;

    if (reNewed.startsWith('.')) {
        inputFrom.value = '0.';
    }
    if (inputFrom.value.includes('.')) {
        let editedValue = inputFrom.value.split('.');
        if (editedValue[1] && editedValue[1].length > 5) {
            editedValue[1] = editedValue[1].slice(0, 5);
            inputFrom.value = editedValue.join('.');
        }
        inputTo.value = (Number(inputFrom.value) * obj.currentTo).toFixed(5);
    } else if (inputFrom.value == '') {
        inputTo.value = '';
    } else {
        inputTo.value = (inputFrom.value * obj.currentTo).toFixed(5);
    }
    
});

inputTo.addEventListener("input", () => {
    if (!navigator.onLine) {
        alert('You are offline. Currency conversion will not work :(');
        inputFrom.value = '';
        inputTo.value = '';
        return;
    }
    let reNewed2 = inputTo.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    let dotCount = (reNewed2.match(/\./g) || []).length;
    if (dotCount > 1) {
        reNewed2 = reNewed2.replace(/\./g, (match, index) => index === reNewed2.indexOf('.') ? '.' : '');
    }
    if (reNewed2.startsWith('0') && reNewed2.length > 1 && reNewed2[1] !== '.') {
        reNewed2 = '0.' + reNewed2.slice(1).replace(/^0+/, '');
    }
    inputTo.value = reNewed2;

    if (reNewed2.startsWith('.')) {
        inputTo.value = '0.';
    }
    if (inputTo.value.includes(".")) {
        let editedValue = inputTo.value.split('.');
        if (editedValue[1] && editedValue[1].length > 5) {
            editedValue[1] = editedValue[1].slice(0, 5);
            inputTo.value = editedValue.join('.');
        }
        inputFrom.value = (Number(inputTo.value) * (1 / obj.currentTo)).toFixed(5);
    } else if (inputTo.value == '') {
        inputFrom.value = '';
    } else {
        inputFrom.value = (inputTo.value * (1 / obj.currentTo)).toFixed(5);
    }
});



//! online and offline events
window.addEventListener('online', () => {
    alert('You are back online :)');
    inputFrom.placeholder = 'Amount...';
    inputTo.placeholder = 'Amount...';
    fetchingData();
});

//* ele seyde elave eleki elementlere klik eliyende asagidaki spanlarinda textleri deyissin
//* WIFI TEMASIDA ISLEMIR
window.addEventListener('offline', () => {
    alert('You are offline. Currency conversion will not work :(');
    inputFrom.placeholder = 'Offline';
    inputTo.placeholder = 'Offline';
});

//* big o notationu daha cox olan bir metod (biraz sehv olma ehtimali var)
// currencyFrom.forEach((element)=>{
//     element.addEventListener("click", ()=>{
//         document.querySelector('.purpleBack1').classList.remove("purpleBack1");
//         element.classList.add("purpleBack1");
//         obj.from = element.textContent;
//         fetchingData();
//         console.log(obj.from)
//         currentValue1.textContent = '1' + ' ' + obj.from + ' ' + '=' + `` + obj.to;
//     })
// })
// currencyTo.forEach((element)=>{
//     element.addEventListener("click", ()=>{
//         document.querySelector('.purpleBack2').classList.remove("purpleBack2");
//         element.classList.add("purpleBack2");
//         obj.to = element.textContent;
//         fetchingData();
//         console.log(obj.to);
//         currentValue2.textContent = '1' + ' ' + obj.to + ' ' + '=' + `` + obj.from;
//     })
// })

// async function fetchingData(){
//     await fetch(`https://v6.exchangerate-api.com/v6/3195f2d508e35437dd7db01f/latest/${obj.from}`)
//     .then((response)=>{
//         return response.json();
//     })
//     .then((data)=>{
//         console.log(data);
//         let keys = Object.keys(data.conversion_rates);
//         let values = Object.values(data.conversion_rates);
//         obj.currentFrom = values[keys.indexOf(obj.from)];
//         obj.currentTo = values[keys.indexOf(obj.to)];
//         console.log(obj.currentFrom);
//         console.log(obj.currentTo);
//     })
//     .catch((error)=>{
//         console.log(error);
//     })
// }