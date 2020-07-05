function calcAmount() {
    let price = 1000;
    let amountInput = document.querySelector("input[name='amount-input']");
    let showAmount = document.querySelector("span.show-amount");
    let amountNumber = parseInt(amountInput.value);
    if ( amountNumber > 10) {
        alert("max 10");
        return;
    } else if (amountNumber < 1) { 
        alert("min 1");
    } else {
    
    let amount = parseInt(amountInput.value) * price;
    
    showAmount.innerHTML = amount; }

    


}