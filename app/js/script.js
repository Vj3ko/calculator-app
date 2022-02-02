const setTheme = (theme) => (document.documentElement.className = theme);
const radioField = document.querySelector(".radio-field");
const userPrefersLight =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;
const userPrefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const inputs = document.querySelectorAll("input");
inputs.checked = false;

// move checkbox on user preference theme
if (userPrefersLight) {
  inputs[1].checked = true;
} else if (userPrefersDark) {
  inputs[0].checked = true;
} else {
  inputs[2].checked = true;
}
// change themes
radioField.addEventListener("change", (e) => {
  let radioBtn = e.target;

  if (radioBtn.value == "blue") {
    setTheme("blue");
  } else if (radioBtn.value == "light") {
    setTheme("light");
  } else {
    setTheme("custom");
  }
});

//Calculator

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
      case "*":
        computation = prev * current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
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
      this.previousOperationTextElement.innerText = "";
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

// allow user to use keyboard for numbers and operations input
window.addEventListener("keypress", (e) => {
  let keyPressed = e.key;
  numberButtons.forEach((button) => {
    if (keyPressed == button.innerText) {
      calculator.appendNumber(keyPressed);
      calculator.updateDisplay();
    }
  });

  operationButtons.forEach((button) => {
    if (keyPressed == button.innerText) {
      calculator.chooseOperation(keyPressed);
      calculator.updateDisplay();
    }
  });
});

// when user presses enter  activates '='
// when user presses C  activates 'reset'
// when user presses backspace activates 'del'
const keys = document.querySelectorAll(".key");
function keyboardInput() {
  document.addEventListener("keyup", function (event) {
    if (event.code === 'NumpadEnter') {
      keys[2].click();
    } else if (event.code === 'Backspace') {
      keys[0].click();
    } else if (event.code === 'KeyC' && keys[1].value == "c") {
      keys[1].click();
    } else {
      return;
    }
  });
}

keyboardInput();
