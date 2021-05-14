//JavaScript Calculator
//--------------------------------
let firstOperand = null;
let secondOperand = "";
let result = null;
let operator = null;
//Operations
const operators = document.querySelectorAll(".operator");

operators.forEach(item => {
    item.addEventListener("click", (e) => {
        if (displayScreen.innerHTML === "Nope!") {
            return
        // } else if (result == null && secondOperand !== null) {
            alert("YES")
        } else {
            if (e.target.value === "+") {
                operator = "add";
            } else if (e.target.value === "-") {
                operator = "subtract";
            } else if (e.target.value === "*") {
                operator = "multiply";
            } else if (e.target.value === "/") {
                operator = "divide";
            }
            enableButtons2();
        }
        
    })
});

const equals = document.getElementById("operate");
equals.addEventListener("click", operate);
function operate() {
    decimal.disabled = false;
    if (firstOperand == null) {
        return;
    } else if (operator == "divide" && secondOperand === "0") {
        clearDisplay();
        displayScreen.innerHTML = "Nope!";
        alert("No dividing by zero!")
    } else if (secondOperand === "" && result == null) {
        secondOperand = firstOperand;
        if (operator === "add") {
            result = Number(firstOperand) + Number(secondOperand);
        } else if (operator === "subtract") {
            result = Number(firstOperand) - Number(secondOperand);
        } else if (operator === "multiply") {
            result = Number(firstOperand) * Number(secondOperand);
        } else if (operator === "divide") {
            if (result == Infinity && secondOperand === "0") {
                result = "No dividing by Zero!"
                console.log("")
            } else {result = Number(firstOperand) / Number(secondOperand)}
        }
        roundUp(result);
        updateDisplay(result);
        result = result.toString();
    } else if (firstOperand == null || operator == null) {return}
    else {
        if (operator === "add") {
            result = Number(firstOperand) + Number(secondOperand);
        } else if (operator === "subtract") {
            result = Number(firstOperand) - Number(secondOperand);
        } else if (operator === "multiply") {
            result = Number(firstOperand) * Number(secondOperand);
        } else if (operator === "divide") {
            if (result == Infinity && secondOperand === "0") {
                result = "No dividing by Zero!"
                console.log("")
            } else {result = Number(firstOperand) / Number(secondOperand)}
        }
        roundUp(result);
        
        updateDisplay(result);
        result = result.toString();
    }
    firstOperand = result;
    result = null;
    // operator = null;
    secondOperand = "";
    enableButtons2();
}

function operate2(a) {
    decimal.disabled = false;
    if (operator === "add") {
        result = Number(a) + Number(secondOperand);
    } else if (operator === "subtract") {
        result = Number(a) - Number(secondOperand);
    } else if (operator === "multiply") {
        result = Number(a) * Number(secondOperand);
    } else if (operator === "divide") {
        result = Number(a) / Number(secondOperand);
    }
    roundUp(result);
    updateDisplay(result);
    updateFontSize();
}
//Display Numbers
const zero = document.querySelector("#btn-0");
const displayScreen = document.getElementById("display");
const decimal = document.getElementById("decimal");

function updateDisplay (display) {
    if (display == "69") {
        document.querySelector("h3").textContent = "nice ;)"
    } else {
        document.querySelector("h3").textContent = "iOS Calculator Clone"
    }
    displayScreen.innerHTML = display;
    addComma();
    updateFontSize();
}

function getFirstOperand(e) {
    if (displayScreen.innerHTML == "0") {
        firstOperand = e.target.value;
        document.getElementById("clear").textContent = "C";
    } else if (displayScreen.innerHTML === "Nope!") {
        displayScreen.innerHTML === "Nope!";
        firstOperand = e.target.value;
        document.getElementById("clear").textContent = "C";
    }
    else {
        firstOperand += e.target.value;
    }
    limitDigits();
    updateDisplay(firstOperand);
}

function getSecondOperand(e) {
    if (displayScreen.innerHTML == "0") {
        secondOperand = e.target.value;
    } else if (displayScreen.innerHTML == "Nope!") {
        return
    } else {
        secondOperand += e.target.value;
    }
    displayScreen.innerHTML !== "0" ? document.getElementById("clear").textContent = "C" : 0;
    limitDigits();
    updateDisplay(secondOperand);
}

function limitDigits() {
    if (firstOperand.includes(".")) {
        firstOperand = firstOperand.substring(0,10);
    } else if (firstOperand.replace(/[.,\s]/g,"").length > 9) {
        firstOperand = firstOperand.substring(0,9);
    } else if (secondOperand.includes(".")) {
        secondOperand = secondOperand.substring(0,10);
    } else if (secondOperand.replace(/[.,\s]/g,"").length > 9) {
        secondOperand = secondOperand.substring(0,9);
    }
}

function addComma() {
    let arr = displayScreen.innerHTML.replace(/,/g,"").split("");
    if (arr.includes("e")) {
        result = result.toString().replace("+","")
        return displayScreen.innerHTML = result;
    } else if (displayScreen.innerHTML.includes(".")) {
        if (arr.indexOf(".") == 4) {
            arr.splice(1, 0, ",");
            displayScreen.innerHTML = arr.join("");
        } else if (arr.indexOf(".") == 5) {
            arr.splice(2, 0, ",");
            displayScreen.innerHTML = arr.join("");
        } else if (arr.indexOf(".") == 6) {
            arr.splice(3, 0, ",");
            displayScreen.innerHTML = arr.join("");
        } else if (arr.indexOf(".") == 7) {
            arr.splice(1, 0, ",");
            arr.splice(5, 0, ",");
            displayScreen.innerHTML = arr.join("");
        } else if (arr.indexOf(".") == 8) {
            arr.splice(2, 0, ",");
            arr.splice(6, 0, ",");
            displayScreen.innerHTML = arr.join("");
        }
    } else if (arr.length == 4) {
        arr.splice(1, 0, ",");
        displayScreen.innerHTML = arr.join("");
    } else if (arr.length == 5) {
        arr.splice(2, 0, ",");
        displayScreen.innerHTML = arr.join("");
    } else if (arr.length == 6) {
        arr.splice(3, 0, ",");
        displayScreen.innerHTML = arr.join("");
    } else if (arr.length == 7) {
        arr.splice(1, 0, ",");
        arr.splice(5,0, ",");
        displayScreen.innerHTML = arr.join("");
    } else if (arr.length == 8) {
        arr.splice(2, 0, ",");
        arr.splice(6,0, ",");
        displayScreen.innerHTML = arr.join("");
    } else if (arr.length == 9) {
        arr.splice(3, 0, ",");
        arr.splice(7,0, ",");
        displayScreen.innerHTML = arr.join("");
    }
}

function roundUp(number) {
    let string = number.toString();
    if (number == null || string.indexOf(".") > 7) {
        return 
    } else if (string.indexOf(".") <= 7 && string.indexOf(".") >= 0) {
        return result = Number(number.toFixed(9 - string.indexOf(".")));
    } else if (!string.includes(".") && string.length > 9) {
        return result = result.toExponential();
    }
}

function updateFontSize() {
    if (displayScreen.innerHTML.length == 8) {
        displayScreen.style.fontSize = "70px"
    } else if (displayScreen.innerHTML.length == 9) {
        displayScreen.style.fontSize = "64px"
    } else if (displayScreen.innerHTML.length == 10) {
        displayScreen.style.fontSize = "58px"
    } else if (displayScreen.innerHTML.length >= 11) {
        displayScreen.style.fontSize = "54px"
    } else {
        displayScreen.style.fontSize = "74px"
    }
}

function enableButtons1() {
    let numBtns = Array.from(document.getElementsByClassName("num"));
    numBtns.forEach(item => {
        item.removeEventListener("click", getSecondOperand);
        item.addEventListener("click", getFirstOperand);
    });
    decimal.removeEventListener("click", getFirstOperand);
    decimal.removeEventListener("click", clickDecimal2);
    decimal.addEventListener("click", clickDecimal);
    updateFontSize();
}

function enableButtons2() {
    let numBtns = Array.from(document.getElementsByClassName("num"));
    numBtns.forEach(item => {
        item.removeEventListener("click", getFirstOperand);
        item.addEventListener("click", getSecondOperand);
    });
    decimal.removeEventListener("click", getSecondOperand);
    decimal.removeEventListener("click", clickDecimal);
    decimal.addEventListener("click", clickDecimal2);
    updateFontSize();
    decimal.disabled = false;
}

function clickDecimal (e) {
    if (displayScreen.innerHTML.includes(".") || displayScreen.innerHTML.length > 10) {
        decimal.disabled = true;
    } else if (firstOperand == null) {
        firstOperand = "0."
        updateDisplay(firstOperand);
    } else {
        firstOperand += e.target.value;
        updateDisplay(firstOperand);
        addComma();
    }
    displayScreen.innerHTML !== "0" ? document.getElementById("clear").textContent = "C" : 0;
}

function clickDecimal2 (e) {
    if (!firstOperand.includes(".") && displayScreen.innerHTML.includes(".") || displayScreen.innerHTML.length > 10) {
        decimal.disabled = true;
    }
    else if (secondOperand === "") {
        secondOperand = "0."
        updateDisplay(secondOperand)
    } else {
        secondOperand += e.target.value;
        addComma();
        updateDisplay(secondOperand)
    }
    displayScreen.innerHTML !== "0" ? document.getElementById("clear").textContent = "C" : 0;
}

//Clear
const clear = document.querySelector("#clear");
clear.addEventListener("click", clearDisplay);
function clearDisplay() {
    updateDisplay("0");
    document.getElementById("clear").innerHTML = "AC";
    decimal.disabled = false;
    updateFontSize();
    firstOperand = null;
    secondOperand = "";
    result = null;
    operator = null;
    enableButtons1();
}

window.addEventListener("load", () => {
    updateDisplay("0");
    enableButtons1();
});

window.addEventListener("keydown", function(e){
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    key.click();
});