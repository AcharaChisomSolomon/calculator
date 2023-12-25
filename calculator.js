const displayEl = document.getElementById('input-display')
const buttons = document.querySelectorAll('.button')

let currentTotal = 0;
let currentDisplay = '0'
let currentAction = ''
let justStarting = true
let isPreviousClickAnAction = false

const symbols = ['C', '←', '÷', 'x', '-', '+', '=']

const handleDeletion = () => {
    if (currentDisplay.length > 1) {
        currentDisplay = currentDisplay.substring(0, currentDisplay.length - 1)
    } else {
        if (Number(currentDisplay) > 0) {
            currentDisplay = '0'
        }
    }

    displayEl.innerText = currentDisplay
}

const handleReset = () => {
    currentTotal = 0
    currentDisplay = '0'
    currentAction = ''
    justStarting = true
    displayEl.innerText = currentDisplay
}

const handleOperation = () => {
    switch(currentAction) {
        case '+':
            currentTotal += Number(currentDisplay)
            break
        case '-':
            currentTotal = currentTotal - Number(currentDisplay)
            break
        case 'x':
            currentTotal *= Number(currentDisplay)
            break
        case '÷':
            currentTotal /= Number(currentDisplay)
            break
    }
}

const handleEquals = () => {
    if (currentAction) {
        handleOperation()

        currentDisplay = currentTotal.toString()
        currentAction = ''
        displayEl.innerText = currentDisplay
    }
}

const handleSettingOperation = val => {
    if (justStarting) {
        justStarting = false
        currentTotal = Number(currentDisplay)
    } else {
        if (!isPreviousClickAnAction) {
            isPreviousClickAnAction = true
            handleOperation()
        }
    }

    currentAction = val
    currentDisplay = '0'
    displayEl.innerText = currentDisplay
}

const handleAction = val => {
    switch(val) {
        case 'C':
            isPreviousClickAnAction = false
            handleReset()
            break
        case '←':
            isPreviousClickAnAction = false
            handleDeletion()
            break
        case '=':
            isPreviousClickAnAction = false
            handleEquals()
            break
        default:
            handleSettingOperation(val)
            break
    }
}

const handleNumber = val => {
    if (Number(currentDisplay) > 0) {
        currentDisplay += val
    } else {
        if (Number(val) > 0) {
            currentDisplay = val
        }
    }

    displayEl.innerText = currentDisplay
}

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerText

        if (symbols.includes(value)) {
            handleAction(value)
        } else {
            isPreviousClickAnAction = false
            handleNumber(value)
        }
    })
})