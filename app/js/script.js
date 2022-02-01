// change themes
const setTheme = (theme) => (document.documentElement.className = theme);
const radioField = document.querySelector(".radio-field");
radioField.addEventListener("change", (e) => {
  let radioBtn = e.target.value;

  if (radioBtn == "blue") {
    setTheme("blue");
  } else if (radioBtn == "light") {
    setTheme("light");
  } else {
    setTheme("custom");
  }
});
////////////////////////

class Calculator {
  constructor(previousOperationTextElement, currentOperationTextElement) {
    this.previousOperationTextElement = previousOperationTextElement;
    this.currentOperationTextElement = currentOperationTextElement;
    this.reset();
  }

  reset() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "x":
        computation = prev * current;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toFixed;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperationTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperationTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperationTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]"),
  operationButtons = document.querySelectorAll("[data-operation]"),
  equalsButton = document.querySelector("[data-equals]"),
  deleteButton = document.querySelector("[data-delete]"),
  resetButton = document.querySelector("[data-reset]"),
  previousOperationTextElement = document.querySelector(
    "[data-previous-operation]"
  ),
  currentOperationTextElement = document.querySelector(
    "[data-current-operation]"
  );

const calculator = new Calculator(
  previousOperationTextElement,
  currentOperationTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

resetButton.addEventListener("click", () => {
  calculator.reset();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
