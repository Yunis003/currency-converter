//! inputs from user
let inputFrom = document.querySelector(".changeFrom");
let inputTo = document.querySelector(".changeTo");

//! wanting to change the values
let currencyFrom = document.querySelectorAll(".from");
let currencyTo = document.querySelectorAll(".to");

//! current values
let currentValue1 = document.querySelector(".currentValue1");
let currentValue2 = document.querySelector(".currentValue2");

let offlineDiv = document.querySelector('.offlineDiv');

//! burger menu
let burger = document.querySelector('.burgerMenu');
burger.addEventListener('click', () => {
    let nav = document.querySelector('.nav');
    nav.classList.toggle('nav-active');
})

//! assign money values to the currencies
const obj = {
    from: 'RUB',
    to: 'USD',
    currentFrom: 0,
    currentTo: 0
}

async function fetchingData() {
    if (obj.from === obj.to) {
        obj.currentTo = 1;
        currentValue1.textContent = '1' + ' ' + obj.from + ' ' + '=' + ' 1 ' + obj.to;
        currentValue2.textContent = '1' + ' ' + obj.to + ' ' + '=' + ' 1 ' + obj.from;
        updateInput();
        return;
    }

    await fetch(`https://v6.exchangerate-api.com/v6/38d280d6532ef9abaa883347/latest/${obj.from}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let conversionRateTo = data.conversion_rates[obj.to];
            obj.currentTo = conversionRateTo;
            currentValue1.textContent = '1' + ' ' + obj.from + ' ' + '=' + ' ' + conversionRateTo.toFixed(5) + ' ' + obj.to;
            currentValue2.textContent = '1' + ' ' + obj.to + ' ' + '=' + ' ' + (1 / conversionRateTo).toFixed(5) + ' ' + obj.from;
            updateInput();
        })
        .catch((error) => {
            console.log(error);
            offlineDiv.style.display = 'block';
            inputFrom.value = 0;
            inputTo.value = 0;
        });
}

let lastFocusedInput = null;
inputFrom.addEventListener('focus', () => {
    lastFocusedInput = inputFrom;
});
inputTo.addEventListener('focus', () => {
    lastFocusedInput = inputTo;
});

function updateInput() {
    if (lastFocusedInput === inputFrom) {
        inputTo.value = (inputFrom.value * obj.currentTo).toFixed(5);
    } else if (lastFocusedInput === inputTo) {
        inputFrom.value = (inputTo.value * (1 / obj.currentTo)).toFixed(5);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchingData();
});

currencyFrom.forEach((element) => {
    element.addEventListener("click", () => {
        document.querySelector('.purpleBack1').classList.remove("purpleBack1");
        element.classList.add("purpleBack1");
        obj.from = element.textContent;
        if (!navigator.onLine) {
            inputFrom.value = 0;
            inputTo.value = 0;
            alert('You are offline. Currency conversion will not work :(');
            currentValue1.textContent = `1 ${obj.from} = 1 ${obj.to}`;
            currentValue2.textContent = `1 ${obj.to} = 1 ${obj.from}`;
        } else {
            fetchingData();
        }
    });
});

currencyTo.forEach((element) => {
    element.addEventListener("click", () => {
        document.querySelector('.purpleBack2').classList.remove("purpleBack2");
        element.classList.add("purpleBack2");
        obj.to = element.textContent;
        if (!navigator.onLine) {
            alert('You are offline. Currency conversion will not work :(');
            inputFrom.value = 0;
            inputTo.value = 0;
            currentValue1.textContent = `1 ${obj.from} = 1 ${obj.to}`;
            currentValue2.textContent = `1 ${obj.to} = 1 ${obj.from}`;
        } else {
            fetchingData();
        }
    });
});

//! update the values dynamically

inputFrom.addEventListener("input", () => {
    if (!navigator.onLine) {
        if (obj.from === obj.to) {
            obj.currentTo = 1;
            currentValue1.textContent = '1' + ' ' + obj.from + ' ' + '=' + ' 1 ' + obj.to;
            currentValue2.textContent = '1' + ' ' + obj.to + ' ' + '=' + ' 1 ' + obj.from;
            updateInput();
        }
        else{
        alert('You are offline. Currency conversion will not work :(');
        inputFrom.value = '';
        inputTo.value = '';
        return;
        }
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
        if (obj.from === obj.to) {
            obj.currentTo = 1;
            currentValue1.textContent = '1' + ' ' + obj.from + ' ' + '=' + ' 1 ' + obj.to;
            currentValue2.textContent = '1' + ' ' + obj.to + ' ' + '=' + ' 1 ' + obj.from;
            updateInput();
        } else {
            alert('You are offline. Currency conversion will not work :(');
            inputFrom.value = '';
            inputTo.value = '';
            return;
        }
    }
    let changing = inputTo.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    let dotCount2 = (changing.match(/\./g) || []).length;
    if (dotCount2 > 1) {
        changing = changing.replace(/\./g, (match, index) => index === changing.indexOf('.') ? '.' : '');
    }
    if (changing.startsWith('0') && changing.length > 1 && changing[1] !== '.') {
        changing = '0.' + changing.slice(1).replace(/^0+/, '');
    }
    inputTo.value = changing;

    if (changing.startsWith('.')) {
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
    offlineDiv.style.display = 'none';
    inputFrom.placeholder = 'Amount...';
    inputTo.placeholder = 'Amount...';
});

window.addEventListener('offline', () => {
    offlineDiv.style.display = 'block';
    inputFrom.placeholder = 'Offline';
    inputTo.placeholder = 'Offline';
     if (obj.from === obj.to) {
        obj.currentTo = 1;
        currentValue1.textContent = '1' + ' ' + obj.from + ' ' + '=' + ' 1 ' + obj.to;
        currentValue2.textContent = '1' + ' ' + obj.to + ' ' + '=' + ' 1 ' + obj.from;
        updateInput();
    }
    else {
        currentValue1.textContent = '1' + ' ' + obj.from + ' ' + '=' + ' 1 ' + obj.to;
        currentValue2.textContent = '1' + ' ' + obj.to + ' ' + '=' + ' 1 ' + obj.from;
        inputFrom.value = 0;
        inputTo.value = 0;
    }
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