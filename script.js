//JavaScript Calculator
//--------------------------------

//Operation
function operate(operator, num1, num2) {
    return operator(num1, num2);
}

//Add
function add(num1, num2) {
    return num1 + num2;
}

//Subtract
function subtract(num1, num2) {
    return num1 - num2;
}

//Multiply
function multiply(num1, num2) {
    return num1 * num2;
}

//Divide
function divide(num1, num2) {
    if (num2 == 0) {
        alert("Nice try. No dividing by ZERO!");
    } else {
        return num1 / num2;
    }
}


