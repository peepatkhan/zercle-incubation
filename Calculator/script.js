const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete] ");
const allClearButton = document.querySelector("[data-all-clear]");

const currentScreenTextElement = document.querySelector(
  "[data-operand-current]"
);
const previousScreenTextElement = document.querySelector(
  "[data-operand-previous]"
);

class Calculator {
  constructor(currentScreenTextElement, previousScreenTextElement) {
    this.currentScreenTextElement = currentScreenTextElement;
    this.previousScreenTextElement = previousScreenTextElement;
    this.clear();
  }
  clear() {
    this.current0perand = "";
    this.previous0perand = "";
    this.operation = null;
  }
  delete() {
    this.current0perand = this.current0perand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.current0perand.includes(".")) return;
    this.current0perand = this.current0perand.toString() + number.toString();
  }

  flushOperation(operation) {
    if (this.current0perand === "") return;
    if (this.previous0perand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previous0perand = this.current0perand;
    this.current0perand = "";
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previous0perand);
    const current = parseFloat(this.current0perand);

    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = previous + current;
        break;
      case "-":
        computation = previous - current;
        break;
      case "x":
        computation = previous * current;
        break;
      case "÷":
        computation = previous / current;
        break;
      default:
        return;
    }
    this.current0perand = computation;
    this.previous0perand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.currentScreenTextElement.innerText = this.current0perand;
    if (this.operation != null) {
      this.previousScreenTextElement.innerText = `${this.previous0perand} ${this.operation}`;
    }
  }
}

const calculator = new Calculator(
  currentScreenTextElement,
  previousScreenTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.flushOperation(button.innerText);
    calculator.updateDisplay();
  });
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
  console.log(calculator.current0perand);
});
