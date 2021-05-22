//JavaScript Calculator

class Calculator {
    constructor(displayScreen) {
        this.displayScreen = displayScreen;
        this.clear();
    }
    
    clear() { //resets all variables to initial values
        this.currentOperand = "";
        this.previousOperand = "";
        this.secondOperand = "";
        this.operation = undefined;
        this.displayScreen.innerHTML = "0";
    }
    
    appendNumber(number) {
        if (number === "." && this.currentOperand.toString().includes(".") || number === "." && this.currentOperand.toString().length > 8) {
            return // prevents user from entering a decimal point "." more than once for each operand
        } else if (number === "." && !this.currentOperand.toString().includes(".") && this.currentOperand === "") {
            this.currentOperand = "0"; // allows user to enter a decimal while retaining the zero "0" before the decimal point
        } else if (number !== "0" && number !== "." && this.currentOperand === "0") {
            document.querySelector("#allClear").innerHTML = "C";
            return this.currentOperand = number.toString(); 
        } else if (number === "." && this.currentOperand === "0") {
            return this.currentOperand = "0" + number.toString();
        } else if (this.currentOperand === "-0" && number !== ".") {
            document.querySelector("#allClear").innerHTML = "C";
            return this.currentOperand = "-" + number.toString();
        } else if (number === "0" && this.currentOperand === "" || number === "0" && this.currentOperand === "0") {
            this.currentOperand = "0";
            return this.displayScreen.innerHTML = "0"; //prevents user from entering a long string of zeros 
        } else if (this.currentOperand === Number(this.currentOperand) && this.previousOperand === "") {
            return this.currentOperand = number.toString(); //allows user to enter a fresh computation after successful computation i.e. user pressed equals button to compute
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
        if(number !== "0") document.querySelector("#allClear").innerHTML = "C";
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
        let firstOperand;
        if (isNaN(previous) || isNaN(current)) return
        if (this.operation != undefined && this.previousOperand === "") { //computes continuously with the most recent operation as you keep pressing equals button
            this.previousOperand = current;
            switch (this.operation) {
                case "+": {
                    firstOperand = Math.abs(current - Number(this.secondOperand));
                    result = current + firstOperand;
                    break;
                }
                case "–": {
                    firstOperand = Math.abs(current - Number(this.secondOperand));
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
                        firstOperand = Number(Number(this.secondOperand) / current);
                        result = current / firstOperand;
                    }
                    break;
                }
                default:
                    return
            }
            result = this.roundOff(result);
            if (result.toString().includes("e")) {
                this.currentOperand = result;
            } else {
                result = Number(result);
                this.currentOperand = Number(result);
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
                    this.currentOperand = "pls don't";
                    return this.previousOperand = "";
                } else {
                    result = previous / current;
                }
                break;
            }
            default:
                return
        }
        result = this.roundOff(result);
        if (result.toString().includes("e")) {
            this.currentOperand = result;
        } else {
            result = Number(result);
            this.currentOperand = Number(result);
        }
        this.secondOperand = this.previousOperand;
        this.previousOperand = "";
    }

    formatDigits(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (number === "pls don't") {
            integerDisplay = "pls don't"
        } else {
            integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        if (this.currentOperand.toString().includes("-")) {
            if (this.currentOperand.toString().includes(".")) {
                this.currentOperand = this.currentOperand.toString().substring(0,11);
            } else if (this.currentOperand.length > 10) {
                this.currentOperand = this.currentOperand.toString().substring(0,11);
            }
        } else if (this.currentOperand.toString().includes(".")) {
            this.currentOperand = this.currentOperand.toString().substring(0,10);
        } else if (this.currentOperand.length > 9) {
            this.currentOperand = this.currentOperand.toString().substring(0,9);
        }
        this.displayScreen.innerHTML = this.formatDigits(this.currentOperand);
    }

    changeSign(number) {
        this.number = number;
        let result
        if (number === "0" || number === "") {
            return this.currentOperand = "-0";
        } else if (number === "-0") return this.currentOperand = "0"
        result = Number(number) * -1;
        this.currentOperand = result.toString();
        this.secondOperand = this.secondOperand * -1;
    }
    
    toPercent(number) {
        this.number = number;
        let result
        result = Number(number) / 100;
        this.currentOperand = result;
    }

    roundOff (number) {
        let string = number.toString();
        let roundedOff;
        if(number == "0") return this.currentOperand = 0
        if (number == "" || string.indexOf(".") > 7) {
            return 
        } else if (string.indexOf(".") <= 7 && string.indexOf(".") >= 0) {
            roundedOff = Number(number.toFixed(9 - string.indexOf(".")));
        } else if (!string.includes(".") && string.length > 9) {
            roundedOff = Number(this.currentOperand).toExponential();
        } else return string;
        return roundedOff;
    }
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
        if (calculator.currentOperand === "" || calculator.currentOperand === "pls don't") return
        calculator.chooseOperation(button.innerHTML);
        displayScreen.innerHTML = calculator.formatDigits(calculator.previousOperand);
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
    if (calculator.currentOperand === "" || calculator.currentOperand === "pls don't") return
    calculator.toPercent(calculator.currentOperand);
    calculator.updateDisplay();
})

changeSignButton.addEventListener("click", () => {
    if (calculator.currentOperand === "pls don't") return
    calculator.changeSign(calculator.currentOperand);
    calculator.updateDisplay();
})

window.addEventListener("keydown", function(e){
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    key.click();
});