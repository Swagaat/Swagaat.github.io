// Form Validation
if (document.querySelector("#contact")) {
  document.querySelector("#contact").addEventListener("submit", function (event) {
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !message) {
      event.preventDefault();
      alert("Please fill in all required fields!");
    } else {
      alert("Form submitted successfully!");
    }
  });
}

// Calculator Functionality
if (document.querySelector("#calculator")) {
  let currentOperand = '';
  let previousOperand = '';
  let operation = undefined;

  function appendNumber(number) {
    // Prevent multiple dots in the number
    if (number === '.' && currentOperand.includes('.')) return;

    currentOperand = currentOperand.toString() + number.toString(); // Append the number
    updateDisplay();
  }

  function chooseOperation(op) {
    if (currentOperand === '') return; // Ignore if no number is entered
    if (previousOperand !== '') {
      compute(); // Compute the result before choosing a new operation
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
  }

  function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return; // Ignore if operands are invalid

    switch (operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return;
    }

    currentOperand = computation; // Set the result as the current operand
    operation = undefined;
    previousOperand = '';
    updateDisplay();
  }

  function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
  }

  function updateDisplay() {
    const display = document.getElementById('display');
    display.value = currentOperand; // Show the current operand
  }

  // Attach event handlers only to calculator buttons
  const buttons = document.querySelectorAll("#calculator .buttons button");
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const value = this.innerText;

      if (!isNaN(value) || value === '.') {
        appendNumber(value); // Append number or dot
      } else if (['+', '-', '*', '/'].includes(value)) {
        chooseOperation(value); // Choose operation
      } else if (value === '=') {
        compute(); // Perform computation
      } else if (value === 'C') {
        clearDisplay(); // Clear the display
      }
    });
  });
}
