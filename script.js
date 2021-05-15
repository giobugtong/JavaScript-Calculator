//JavaScript Calculator
//--------------------------------
class Calculator {
    constructor(displayScreen) {
        this.displayScreen = displayScreen;
        this.clear();
    }
    
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.secondOperand = "";
        this.operation = undefined;
        this.displayScreen.innerHTML = "0";
    }
    
    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".") || number === "." && this.currentOperand.length > 8) {
            return
        } else if (number === "." && !this.currentOperand.includes(".") && this.currentOperand === "") {
            this.currentOperand = "0";
        } else if (number === "0" && this.currentOperand === "" || number === "0" && this.currentOperand === "0") {
            this.currentOperand = "0";
            return this.displayScreen.innerHTML = "0";
        } else if (this.currentOperand === Number(this.currentOperand) && this.previousOperand === "") {
            this.currentOperand = "";
        }
        if(number !== "0") document.querySelector("#allClear").innerHTML = "C";
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    
    chooseOperation(operation) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let result;
        let previous = Number(this.previousOperand);
        let current = Number(this.currentOperand);
        let firstOperand
        if (isNaN(previous) || isNaN(current)) return
        if (this.operation != undefined && this.previousOperand === "") {
            console.log("DECREMENT");
            this.previousOperand = current;
            switch (this.operation) {
                case "+": {
                    console.log("current " + current)
                    console.log("secondOperand " + this.secondOperand)
                    firstOperand = Number(current - Number(this.secondOperand));
                    console.log("firstOperand " + firstOperand)
                    result = current + firstOperand;
                    break;
                }
                case "–": {
                    console.log("current " + current)
                    console.log("secondOperand " + this.secondOperand)
                    firstOperand = Math.abs(current - Number(this.secondOperand));
                    console.log("firstOperand " + firstOperand)
                    result = current - firstOperand;
                    break;
                }
                case "×": {
                    firstOperand = Number(current / Number(this.secondOperand));
                    result = current * firstOperand;
                    break;
                }
                case "÷": {
                    if (current == "0") {
                        result = "pls don't";
                    } else {
                        console.log("current " + current)
                        console.log("secondOperand " + this.secondOperand)
                        firstOperand = Number(Number(this.secondOperand) / current);
                        result = current / firstOperand;
                        console.log("firstOperand " + firstOperand)
                    }
                    break;
                }
                default:
                    return
            }
        } else 
        
        switch (this.operation) {
            case "+": {
                result = previous + current;
                break;
            }
            case "–": {
                result = previous - current;
                break;
            }
            case "×": {
                result = previous * current;
                break;
            }
            case "÷": {
                if (current == "0") {
                    result = "pls don't";
                } else {
                    result = previous / current;
                }
                break;
            }
            default:
                return
        }
        this.secondOperand = this.previousOperand;
        this.currentOperand = result;
        this.previousOperand = "";
    }

    updateDisplay() {
        if(this.currentOperand.toString().includes(".")) {
            this.currentOperand = this.currentOperand.toString().substring(0,10);
        } else if (this.currentOperand > 9) {
            this.currentOperand = this.currentOperand.toString().substring(0,9);
        } else if (this.currentOperand === "0") {
            return this.currentOperand = "";
        }
        this.displayScreen.innerHTML = this.currentOperand;
    }
    
    changeSign(number) {
        this.number = number;
        let result
        result = Number(number) * -1;
        this.currentOperand = result;
    }
    
    toPercent(number) {
        this.number = number;
        let result
        result = Number(number) / 100;
        this.currentOperand = result;
    }

    // roundOff (number) {
    //     let string = number.toString();
    //     let roundedOff;
    //     if (number == "" || string.indexOf(".") > 7) {
    //         return 
    //     } else if (string.indexOf(".") <= 7 && string.indexOf(".") >= 0) {
    //         roundedOff = Number(number.toFixed(9 - string.indexOf(".")));
    //     } else if (!string.includes(".") && string.length > 9) {
    //         roundedOff = this.currentOperand.toExponential();
    //     }
    //     return roundedOff;
    // }
}

const numberButtons = document.querySelectorAll(".num");
const operationButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const allClearButton = document.querySelector("#allClear");
const changeSignButton = document.querySelector("#changeSign");
const percentButton = document.querySelector("#percent");
const displayScreen = document.querySelector("#display");

const calculator = new Calculator(displayScreen);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (calculator.currentOperand === "") return
        calculator.chooseOperation(button.innerHTML);
        displayScreen.innerHTML = calculator.previousOperand;
    })
});

equalsButton.addEventListener("click", () => {
    if (calculator.currentOperand === "") return
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    document.querySelector("#allClear").innerHTML = "AC";
})

percentButton.addEventListener("click", () => {
    if (calculator.currentOperand === "") return
    calculator.toPercent(calculator.currentOperand);
    calculator.updateDisplay();
})

changeSignButton.addEventListener("click", () => {
    if (calculator.currentOperand === "") return
    calculator.changeSign(calculator.currentOperand);
    calculator.updateDisplay();
})

window.addEventListener("keydown", function(e){
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    key.click();
});
