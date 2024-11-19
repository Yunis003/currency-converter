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
        console.log(obj.from)
        currentValue1.textContent = '1' + ' ' + obj.from + ' ' + '=' + `` + obj.to;
        // fetchingData();
    })
})
currencyTo.forEach((element)=>{
    element.addEventListener("click", ()=>{
        document.querySelector('.purpleBack2').classList.remove("purpleBack2");
        element.classList.add("purpleBack2");
        obj.to = element.textContent;
        console.log(obj.to);
        currentValue2.textContent = '1' + ' ' + obj.to + ' ' + '=' + `` + obj.from;
        // fetchingData();
    })
})

// async function fetchingData(){
//     await fetch(`https://v6.exchangerate-api.com/v6/3195f2d/latest/${obj.from}/${obj.to}`)
//     .then((response)=>{
//         return response.json();
//     })
//     .then((data)=>{
//         console.log(data);
//         let keys = Object.keys(data.conversion_rates);
//         obj.currentFrom = keys[0];
//         obj.currentTo = keys[1];
//         console.log(obj.currentFrom);
//         console.log(obj.currentTo);
//     })
//     .catch((error)=>{
//         console.log(error);
//     })
// }

//! update the values
inputFrom.addEventListener("input", (event)=>{
    let reNewed = inputFrom.value.replace(/[^0-9.]/g, '');  
    let reNewed2 = reNewed.textContent.replace(',', '.');
    inputFrom.value = reNewed2;   
})


// inputFrom.addEventListener("input", ()=>{
//     console.log(inputFrom.value);
//     if (inputFrom.value.includes('.')){
//         let editedValue = inputFrom.value.split('.'); // eynisini seple vergul ucun sora vergulu evezle noqteynen metod avriydi adi yadimnan cixdi
//         editedValue.splice(1, 0, '.');
//         editedValue = editedValue.join('');
//         console.log(editedValue);
//         inputTo.value = Number(editedValue) * 0.0135;
//     }
//     else if(inputFrom.value == ''){
//         inputTo.value = '';
//     }
//     else{
//         inputTo.value = inputFrom.value * 0.0135;
//     }
// })
inputTo.addEventListener("input", ()=>{
    console.log(inputTo.value);
    if (inputTo.value.includes(".")){
        let editedValue = inputTo.value.split('.');
        editedValue.splice(1, 0, '.');
        editedValue = editedValue.join('');
        inputFrom.value = Number(editedValue) * 73.8896;
    }
    else if(inputTo.value == ''){
        inputFrom.value = '';
    }
    else{
        inputFrom.value = inputTo.value / 73.8896;
    }
})