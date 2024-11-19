//! inputs from user
let inputFrom = document.querySelector(".changeFrom");
let inputTo = document.querySelector(".changeTo");

//! wanting to change the values
let currencyFrom = document.querySelectorAll(".from");
let currencyTo = document.querySelectorAll(".to");

//! current values
let currentValue1 = document.querySelector(".currentValue1");
let currentValue2 = document.querySelector(".currentValue2");

//! assign money values to the currencies
const obj = {
    from: 'RUB',
    to: 'USD',
    currentFrom: 0,
    currentTo: 0
}

currencyFrom.forEach((element)=>{
    element.addEventListener("click", ()=>{
        document.querySelector('.purpleBack1').classList.remove("purpleBack1");
        element.classList.add("purpleBack1");
        obj.from = element.textContent;
        fetchingData();
    })
})
currencyTo.forEach((element)=>{
    element.addEventListener("click", ()=>{
        document.querySelector('.purpleBack2').classList.remove("purpleBack2");
        element.classList.add("purpleBack2");
        obj.to = element.textContent;
        fetchingData();
    })
})

async function fetchingData(){
    await fetch(`https://v6.exchangerate-api.com/v6/3195f2d508e35437dd7db01f/latest/${obj.from}`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        let conversionRateTo = data.conversion_rates[obj.to];
        let conversionRateFrom = data.conversion_rates[obj.from];
        obj.currentFrom = conversionRateFrom;
        obj.currentTo = conversionRateTo;
        currentValue1.textContent = `1 ${obj.from} = ${conversionRateTo} ${obj.to}`;
        currentValue2.textContent = `1 ${obj.to} = ${(1 / conversionRateTo).toFixed(4)} ${obj.from}`;
    })
    .catch((error)=>{
        console.log(error);
    })
}
// ele bir sey elemelisen ki tutax ki bu currentvalue 1 ve 2 deyisir ama sinxronda deyismeliyem cunki beyaq ayrica curencto nun icinde eledim deyismir dinamik gerey 2 defe sorusum oda sefdi
//! update the values dynamically

inputFrom.addEventListener("input", ()=>{
    let reNewed = inputFrom.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    inputFrom.value = reNewed;
    if (inputFrom.value.includes('.')){
        let editedValue = inputFrom.value.split('.');
        editedValue.splice(1, 0, '.');
        editedValue = editedValue.join('');
        inputTo.value = Number(editedValue) * obj.currentTo;
    }
    else if(inputFrom.value == ''){
        inputTo.value = '';
    }
    else{
        inputTo.value = inputFrom.value * obj.currentFrom;
    }
})
inputTo.addEventListener("input", ()=>{
    let reNewed2 = inputTo.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    inputTo.value = reNewed2;
    
    if (inputTo.value.includes(".")){
        let editedValue = inputTo.value.split('.');
        editedValue.splice(1, 0, '.');
        editedValue = editedValue.join('');
        inputFrom.value = Number(editedValue) * obj.currentFrom;
    }
    else if(inputTo.value == ''){
        inputFrom.value = '';
    }
    else{
        inputFrom.value = inputTo.value * obj.currentTo;
    }
})

//* big o notationu daha cox olan bir metod
// const obj = {
//     from: 'RUB',
//     to: 'USD',
//     currentFrom: 0,
//     currentTo: 0
// }

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