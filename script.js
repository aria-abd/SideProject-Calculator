const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awatingNextValue = false;

function sendNumberValue(number) {
  // Replace current display value if first value is entern
  if (awatingNextValue) {
    calculatorDisplay.textContent = number;
    awatingNextValue = false;
  } else {
    //  If current display value is 0, replace it,if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // If operator pressed, dont add decimal
  if (awatingNextValue) return;
  // IF no decimal, add on
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// calculate first and second value depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

  "=": (secondNumber) => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // prevent multiple operator
  if (operatorValue && awatingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assing firstvalue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation
    firstValue = calculation;
  }
  //   Ready for nwxt value, store operator
  awatingNextValue = true;
  operatorValue = operator;
}

// Add Event Listenes for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Reset all value display
function resetAll() {
  calculatorDisplay.textContent = "0";
  firstValue = 0;
  operatorValue = "";
  awatingNextValue = false;
}

// Event Listener
clearBtn.addEventListener("click", resetAll);
