window.onload = init;

let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    rect = {},
    drag = false;

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.style.overflow = 'hidden';

    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);
}

function mouseDown(e) {
    rect.startX = e.pageX - this.offsetLeft;
    rect.startY = e.pageY - this.offsetTop;
    drag = true;
}

function mouseUp() {
    drag = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function mouseMove(e) {
    if (drag) {
        rect.w = (e.pageX - this.offsetLeft) - rect.startX;
        rect.h = (e.pageY - this.offsetTop) - rect.startY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    }
}

function draw() {
    ctx.setLineDash([6]);
    ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
}