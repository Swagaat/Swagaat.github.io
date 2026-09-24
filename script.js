"use strict";
const calculator = document.querySelector("#calculator");
if (calculator) {
  const display = document.querySelector("#display");
  let current = "0", previous = null, operator = null, replace = true;
  const render = () => { display.textContent = current; };
  function clear() { current = "0"; previous = null; operator = null; replace = true; }
  function compute() {
    if (operator === null || replace) return;
    const a = previous, b = Number(current);
    const result = operator === "+" ? a + b : operator === "-" ? a - b : operator === "*" ? a * b : a / b;
    current = Number.isFinite(result) ? String(Number(result.toPrecision(12))) : "Cannot divide by zero";
    previous = null; operator = null; replace = true;
  }
  function input(key) {
    if (key === "C") clear();
    else if (/^[0-9.]$/.test(key)) {
      if (replace) { current = "0"; replace = false; }
      if (key === ".") { if (!current.includes(".")) current += "."; }
      else if (current.length < 16) current = current === "0" ? key : current + key;
    } else if (key === "=") compute();
    else if (["+", "-", "*", "/"].includes(key)) {
      if (operator && !replace) compute();
      if (Number.isFinite(Number(current))) { previous = Number(current); operator = key; replace = true; }
    }
    render();
  }
  calculator.addEventListener("click", event => {
    const button = event.target.closest("button[data-key]");
    if (button) input(button.dataset.key);
  });
  document.addEventListener("keydown", event => {
    if (event.ctrlKey || event.metaKey || event.altKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
    // Let Enter activate a focused link or button through its native click behavior.
    if (event.key === "Enter" && event.target.closest("a, button")) return;
    const key = event.key === "Enter" ? "=" : event.key === "Escape" ? "C" : event.key;
    if (/^[0-9.+*/=\-]$/.test(key) || key === "C") { event.preventDefault(); input(key); }
  });
}
