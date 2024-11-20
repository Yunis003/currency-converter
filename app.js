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
    currentTo: 0,
    inputFrom: null,
    inputTo: null
}
//* INTERNETI SONDUR O ISLEMESIN AMA YANDIRANDA O AVTOMATIK ISLEMELIDI HECNEYE CLICK INPUT ELEMEDEN ELAVE ELEDIYIMIZ ISLEMELIDI HEMIN AN

async function fetchingData(){
    await fetch(`https://v6.exchangerate-api.com/v6/3195f2d508e35437dd7db01f/latest/${obj.from}`)
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

function updateInput(){
    if (inputFrom.value){
        inputTo.value = inputFrom.value * obj.currentTo;
    }
    if (inputTo.value){
        inputFrom.value = inputTo.value * (1 / obj.currentTo);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchingData();
});

//! update the values dynamically
//* inputlara nese reqem yazanda axirina 500 dene 0 artirir, duzgun hesablasada cox sifir artirir dalina

inputFrom.addEventListener("input", ()=>{
    let reNewed = inputFrom.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    inputFrom.value = reNewed;
    //!!! inputa 0.1 yazanda onu 0 kimi qaytarir onu deqiq duzeltmek lazimdi NOQTEDEN SONRANI UMUMIYYETLE OXUMUR ONA FIKIR VER
    //!!! inputda noqteden sora maks uzunluq 5 dene olmalidi tofixed(5) ile
    if (inputFrom.value.includes('.')){
        if (inputFrom.value.index(0) == '.'){
            inputTo.value = '';
        }
        let editedValue = inputFrom.value.split('.');
        editedValue.splice(1, 0, '.');
        editedValue = editedValue.join('');
        inputTo.value = Number(editedValue) * obj.currentTo;
    }
    else if(inputFrom.value == ''){
        inputTo.value = '';
    }
    else{
        inputTo.value = inputFrom.value * obj.currentTo;
    }
})
inputTo.addEventListener("input", ()=>{
    let reNewed2 = inputTo.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    inputTo.value = reNewed2;
    
    if (inputTo.value.includes(".")){
        if(inputTo.value.index(0) == '.'){
            inputFrom.value = '';
        }
        let editedValue = inputTo.value.split('.');
        editedValue.splice(1, 0, '.');
        editedValue = editedValue.join('');
        inputFrom.value = Number(editedValue) * (1 / obj.currentTo);
    }
    else if(inputTo.value == ''){
        inputFrom.value = '';
    }
    else{
        inputFrom.value = inputTo.value * (1 / obj.currentTo);
    }
})
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