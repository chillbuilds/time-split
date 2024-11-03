let mousePos

$(document).mousemove(event => {
    mousePos = {x: event.clientX, y: event.clientY}
})

let timerWidth = $('#timer-container').outerWidth()
let timerHeight = $('#timer-container').outerHeight()
let timerPos = $('#timer-container').position()
let screenWidth = window.outerWidth
let hovered = false

function checkMousePosition() {
    timerWidth = $('#timer-container').outerWidth()
    timerHeight = $('#timer-container').outerHeight()
    timerPos = $('#timer-container').position()
    const inBounds = mousePos.x >= timerPos.left &&
                           mousePos.x <= timerPos.left + timerWidth &&
                           mousePos.y >= timerPos.top &&
                           mousePos.y <= timerPos.top + timerHeight

    if (inBounds && !hovered) {
        hovered = true
        window.electron.send('toMain', 'hovered')
    } else if (!inBounds && hovered) {
        hovered = false
        window.electron.send('toMain', 'left')
    }
}

let gameStarted = false

$(document).ready(()=>{
    setInterval(function() {
        checkMousePosition()
    }, 10)
})

// window.electron.send('toMain', 'inputValue')