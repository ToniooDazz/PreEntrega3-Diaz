const display = document.getElementById("display");
const numButtons = document.querySelectorAll(".num-btn");
const opButtons = document.querySelectorAll(".op-btn");
const clearButton = document.getElementById("borrar");
const equalsButton = document.getElementById("igual");

let currentInput = "0";
let currentOperator = "";
let previousValue = 0;

//Funciones para guardar resultado
function updateDisplay() {
    display.value = currentInput;
}
function loadState() {
    const savedState = localStorage.getItem("calculatorState");
    if (savedState) {
        const state = JSON.parse(savedState);
        currentInput = state.currentInput;
        currentOperator = state.currentOperator;
        previousValue = state.previousValue;
        updateDisplay();
    }
}
function saveState() {
    const state = {
        currentInput: currentInput,
        currentOperator: currentOperator,
        previousValue: previousValue
    };
    localStorage.setItem("calculatorState", JSON.stringify(state));
}
loadState();

// Agregando evento a los botones
numButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentInput === "0") {
            currentInput = button.textContent;
        } else {
            currentInput += button.textContent;
        }
        updateDisplay();
    });
});
opButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentOperator !== "") {
            performCalculation();
        }
        currentOperator = button.textContent;
        previousValue = parseFloat(currentInput);
        currentInput = "0";
    });
});
equalsButton.addEventListener("click", () => {
    if (currentOperator !== "") {
        performCalculation();
        currentInput = previousValue.toString();
        currentOperator = "";
        updateDisplay();
        saveState();
    }
});
clearButton.addEventListener("click", () => {
    currentInput = "0";
    currentOperator = "";
    previousValue = 0;
    updateDisplay();
});

// Funciones de botones de calculos
function performCalculation() {
    const currentValue = parseFloat(currentInput);
    switch (currentOperator) {
        case "+":
            previousValue += currentValue;
            break;
        case "-":
            previousValue -= currentValue;
            break;
        case "*":
            previousValue *= currentValue;
            break;
        case "/":
            previousValue /= currentValue;
            break;
    }
}