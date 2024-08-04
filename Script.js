let apiKey = "78dcb6af8793dc23a80313de";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let i = 0; i < dropdown.length; i++) {
    for(currCode in countryList) {
        let selected;
        if(i === 0) {
            selected = currCode == "USD" ? "selected" : "";
        } else if(i == 1) {
            selected = currCode == "INR" ? "selected" : "";
        }
        let optionTag = `<option value="${currCode}" ${selected}>${currCode}</option>`;
        dropdown[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropdown[i].addEventListener("change", (evt) => {
        loadFlag(evt.target);
    });
}

function loadFlag(element) {
    for(code in countryList) {
        if(code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`;
        }
    }
}

window.addEventListener("onload", () => {
    updateExchangeRate();
});

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const exchangeIcon = document.querySelector(".dropdown i");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempCode;
    loadFlag(fromCurr);
    loadFlag(toCurr);
    updateExchangeRate();
})

function updateExchangeRate() {
    const amount = document.querySelector(".amount input");
    const message = document.querySelector(".msg");
    let amountValue = amount.value;
    if(amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }
    message.innerText = "Getting exchange rate.....";
    const URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value}`;
    fetch(URL).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurr.value];
        let totalExchangeRate = (amountValue * exchangeRate).toFixed(2);
        message.innerText = `${amountValue} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`;
    }).catch(() => {
        message.innerText = "Something went wrong...!";
    });
}