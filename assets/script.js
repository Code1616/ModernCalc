let currentNumber = '0';
let previousNumber = '';
let operation = null;
let shouldResetScreen = false;
let memory = 0;

const currentDisplay = document.querySelector('.current');
const historyDisplay = document.querySelector('.history');

function updateDisplay() {
    currentDisplay.textContent = currentNumber;
    historyDisplay.textContent = previousNumber + (operation ? ` ${operation} ` : '');
}

function appendNumber(number) {
    if (shouldResetScreen) {
        currentNumber = number;
        shouldResetScreen = false;
    } else {
        currentNumber = currentNumber === '0' ? number : currentNumber + number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetScreen) {
        currentNumber = '0.';
        shouldResetScreen = false;
    } else if (!currentNumber.includes('.')) {
        currentNumber += '.';
    }
    updateDisplay();
}

function setOperation(operator) {
    if (operation !== null) calculate();
    previousNumber = currentNumber;
    operation = operator;
    shouldResetScreen = true;
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(current)) return;

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

    currentNumber = computation.toString();
    operation = null;
    previousNumber = '';
    shouldResetScreen = true;
    updateDisplay();
}

function operate(op) {
    const current = parseFloat(currentNumber);
    let result;

    switch (op) {
        case 'sqrt':
            result = Math.sqrt(current);
            break;
        case 'pow':
            result = Math.pow(current, 2);
            break;
        case '1/x':
            result = 1 / current;
            break;
    }

    currentNumber = result.toString();
    updateDisplay();
}

function clearAll() {
    currentNumber = '0';
    previousNumber = '';
    operation = null;
    shouldResetScreen = false;
    updateDisplay();
}

function memoryStore() {
    memory = parseFloat(currentNumber);
}

function memoryRecall() {
    currentNumber = memory.toString();
    updateDisplay();
}

function memoryClear() {
    memory = 0;
}

function memoryAdd() {
    memory += parseFloat(currentNumber);
}


document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') appendNumber(event.key);
    if (event.key === '.') appendDecimal();
    if (event.key === '=' || event.key === 'Enter') calculate();
    if (event.key === 'Escape') clearAll();
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        setOperation(event.key);
    }
});
let isDarkMode = true;

function toggleTheme() {
    const body = document.body;
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
        body.classList.remove('light-mode');
    } else {
        body.classList.add('light-mode');
    }

    localStorage.setItem('darkMode', isDarkMode);
}

window.addEventListener('load', () => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
        isDarkMode = savedDarkMode === 'true';
        if (!isDarkMode) {
            document.body.classList.add('light-mode');
        }
    }
});
