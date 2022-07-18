const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const finishedMessageElement = document.getElementById('game-finished-message')
const messageTextElement = document.querySelector('[data-finished-message]')
const restartButton = document.getElementById('restart-btn')
const possibleWinScenarios = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

let currentTurn = 'x'

function startGame() {
    setBoardHover()

    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    })
}

function handleClick(e) {
    const cell = e.target
    placeText(cell)
    if (checkWin()) {
        gameOver('win')
    } else if (checkDraw()) {
        gameOver('draw')
    } else {
        switchTurns()
        setBoardHover()
    }
}

function placeText(cell) {
    cell.classList.add(currentTurn)
}

function switchTurns() {
    currentTurn == 'x' ? currentTurn = 'o' : currentTurn = 'x'
}

function setBoardHover() {
    boardElement.classList.remove('x')
    boardElement.classList.remove('o')
    boardElement.classList.add(currentTurn)
}

function checkWin() {
    return possibleWinScenarios.some(scenario => {
        return scenario.every(index => {
            return cellElements[index].classList.contains(currentTurn)
        })
    })
}

function checkDraw() {
    return [...cellElements].every(cell => {
        return (cell.classList.contains('x') || cell.classList.contains('o'))
    })
}

function gameOver(outcome) {
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick)
    })
    finishedMessageElement.classList.add('show')
    if (outcome == 'win') {
        currentTurn == 'x' ?
            messageTextElement.textContent = 'X wins!' :
            messageTextElement.textContent = 'O wins!'
    } else {
        messageTextElement.textContent = 'Draw!'
    }
    restartButton.addEventListener('click', restart)
}

function restart() {
    finishedMessageElement.classList.remove('show')
    cellElements.forEach(cell => {
        cell.classList.remove('x')
        cell.classList.remove('o')
    })
    startGame()
}

startGame()