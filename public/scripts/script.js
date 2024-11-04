let isDragging = false
let offset = { x: 0, y: 0 }

$('#timer-container')
    .on('mousedown', function(e) {
        isDragging = true
        offset.x = e.clientX - $(this).offset().left
        offset.y = e.clientY - $(this).offset().top
        $(this).css('cursor', 'grabbing')
    })
    .on('mousemove', function(e) {
        if(isDragging){
            $(this).css({
                left: e.clientX - offset.x + 'px',
                top: e.clientY - offset.y + 'px',
            })
        }
    })
    .on('mouseup mouseleave', function() {
        isDragging = false
        $(this).css('cursor', 'grab')
    })