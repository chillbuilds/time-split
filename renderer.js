const timer = new Timer()
let timing = false
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

$(document).ready(()=>{
    setInterval(function() {
        checkMousePosition()
    }, 10)
})

window.electron.lowerOpacity(() => {
    let timerOpacity = $('#timer-container').css('opacity')
    if(timerOpacity > 0.1){
        timerOpacity = timerOpacity - 0.1
        $('#timer-container').css('opacity', timerOpacity)
    }
})

window.electron.raiseOpacity(() => {
    let timerOpacity = $('#timer-container').css('opacity')
    if(timerOpacity < 1){
        timerOpacity = parseFloat(timerOpacity) + 0.1
        console.log(timerOpacity)
        $('#timer-container').css('opacity', timerOpacity)
    }
})

window.electron.onSplit(() => {

    if(!timing){
        timing = true
        timer.start({precision: 'secondTenths'})

        timer.addEventListener('secondTenthsUpdated', function (e) {
            let hours = timer.getTimeValues().hours
            let minutes = timer.getTimeValues().minutes
            let seconds = timer.getTimeValues().seconds
            let tenthSeconds = timer.getTimeValues().secondTenths
        
            if(hours < 10){
                $('#hours').html('0' + hours + ':')    
            }else{
                $('#hours').html(hours + ':')
            }
            if(minutes < 10){
                $('#minutes').html('0' + minutes + ':')    
            }else{
                $('#minutes').html(minutes + ':')
            }
            if(seconds < 10){
                $('#seconds').html('0' + seconds + '.')    
            }else{
                $('#seconds').html(seconds + '.')
            }
            $('#tenthSeconds').html(tenthSeconds)
        })
    }else{
        timing = false
        timer.stop()
    }

    
})

// window.electron.send('toMain', 'inputValue')