//! inputs from user
let inputFrom = document.querySelector(".changeFrom");
let inputTo = document.querySelector(".changeTo");

//! wanting to change the values
let currencyFrom = document.querySelectorAll(".from");
let currencyTo = document.querySelectorAll(".to");

//! current values
let currentValue1 = document.querySelector(".currentValue1");
let currentValue2 = document.querySelector(".currentValue2");

inputFrom.addEventListener("input", ()=>{
    console.log(inputFrom.value);
    if (inputFrom.value.includes('.')){
        let editedValue = inputFrom.value.split('.');
        editedValue.splice(1, 0, '.');
        editedValue = editedValue.join('');
        console.log(editedValue);
        inputTo.value = Number(editedValue) * 1.7;
    }
    else{
        inputTo.value = inputFrom.value * 1.7;
    }
})
//* eger input daxil edende reqemler noqte ile ayrilirsa o ya milyonuda xarakterize ede biler qepiyinide xarakterize ede biler.