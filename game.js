window.onload = init;
window.onresize = init;

var mouseDown = false;
var scrolling = false;

var mouseDownX = 0;
var mouseDownY = 0;

var scrollX = 0;
var scrollY = 0;
var tileSize = 16;
var zoom = 2;

var mapWidth = 32;
var mapHeight = 32;

var level = new Array(mapWidth * mapHeight);
for (var y = 0; y < mapHeight; y++) {
    for (var x = 0; x < mapWidth; x++) {
        level[x + y * mapWidth] = {
            color: 0xff00ff,
            visible: false,
            owned: false,
            land: Math.random() < 0.5
        }
    }
}

function init() {
    var mapCanvas = document.getElementById("map");
    mapCanvas.width = (window.innerWidth) / zoom;
    mapCanvas.height = (window.innerHeight - 128) / zoom;

    mapCanvas.onmousedown = function(event) {
        event.preventDefault();
        mouseDown = true;
        scrolling = false;
        mouseDownX = event.clientX;
        mouseDownY = event.clientY;
    };

    window.onmouseup = function(event) {
        event.preventDefault();
        mouseDown = false;
        if (!scrolling) {
            var mapCanvas = document.getElementById("map");
            var xOffset = Math.floor(scrollX + (mapCanvas.width - mapWidth * tileSize) / 2);
            var yOffset = Math.floor(scrollY + (mapCanvas.height - mapHeight * tileSize) / 2);

            var xTile = Math.floor((event.clientX / zoom - xOffset) / tileSize);
            var yTile = Math.floor((event.clientY / zoom - yOffset) / tileSize);
            clickTile(xTile, yTile);
        }
    };

    window.onmousemove = function(event) {
        if (!mouseDown) return;
        event.preventDefault();
        var distX = event.clientX - mouseDownX;
        var distY = event.clientY - mouseDownY;

        var scrollDeadZone = 8;

        if (scrolling || distX * distX + distY * distY > scrollDeadZone * scrollDeadZone) {
            scrolling = true;
            scrollX += distX / zoom;
            scrollY += distY / zoom;
            mouseDownX = event.clientX;
            mouseDownY = event.clientY;
            renderMap();
        }
    };

    renderMap();
}

var selectedX = 0;
var selectedY = 0;

function clickTile(xTile, yTile) {
    if (xTile >= 0 && yTile >= 0 && xTile < mapWidth && yTile < mapHeight) {
        var tile = getTile(xTile, yTile);
        tile.land = !tile.land;
        /*if (level[xTile + yTile * mapWidth].owned) {
            level[xTile + yTile * mapWidth].owned = false;
            level[xTile + yTile * mapWidth].color = 0xff0000;
        } else {
            level[xTile + yTile * mapWidth].owned = true;
            level[xTile + yTile * mapWidth].color = 0xffff00;
        }*/
        recalcVisibility();
    }

    selectedX = xTile;
    selectedY = yTile;
    renderMap();
}

function recalcVisibility() {
    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {
            level[x + y * mapWidth].visible = false;
        }
    }

    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {
            if (level[x + y * mapWidth].owned) {
                revealTile(x, y, 4);
            }
        }
    }
}

function revealTile(xTile, yTile, radius) {
    for (var y = yTile - radius; y <= yTile + radius; y++) {
        if (y < 0 || y >= mapHeight) continue;
        for (var x = xTile - radius; x <= xTile + radius; x++) {
            if (x < 0 || x >= mapWidth) continue;
            var xd = x - xTile;
            var yd = y - yTile;
            if (xd * xd + yd * yd <= radius * radius + 2) {
                level[x + y * mapWidth].visible = true;
            }
        }
    }
}

function renderMap() {
    var mapCanvas = document.getElementById("map");

    var xOverflow = Math.max(0, (mapWidth + 4) * tileSize - mapCanvas.width) / 2;
    var yOverflow = Math.max(0, (mapHeight + 4) * tileSize - mapCanvas.height) / 2;

    if (scrollX < -xOverflow) scrollX = -xOverflow;
    if (scrollY < -yOverflow) scrollY = -yOverflow;
    if (scrollX > xOverflow) scrollX = xOverflow;
    if (scrollY > yOverflow) scrollY = yOverflow;

    var map2d = mapCanvas.getContext("2d");
    var xOffset = Math.floor(scrollX + (mapCanvas.width - mapWidth * tileSize) / 2);
    var yOffset = Math.floor(scrollY + (mapCanvas.height - mapHeight * tileSize) / 2);
    var x0 = Math.floor(-xOffset / tileSize);
    var y0 = Math.floor(-yOffset / tileSize);
    var x1 = Math.ceil((-xOffset + mapCanvas.width) / tileSize);
    var y1 = Math.ceil((-yOffset + mapCanvas.height) / tileSize);

    for (var y = y0; y < y1; y++) {
        for (var x = x0; x < x1; x++) {
            var tile = getTile(x, y);
            if (tile.land) {
                map2d.fillStyle = "#00ff00";
                map2d.fillRect(x * tileSize + xOffset + 0, y * tileSize + yOffset + 0, 8, 8);
                map2d.fillRect(x * tileSize + xOffset + 8, y * tileSize + yOffset + 0, 8, 8);
                map2d.fillRect(x * tileSize + xOffset + 0, y * tileSize + yOffset + 8, 8, 8);
                map2d.fillRect(x * tileSize + xOffset + 8, y * tileSize + yOffset + 8, 8, 8);
            } else {
                map2d.fillStyle = "#0000ff";
                map2d.fillRect(x * tileSize + xOffset + 0, y * tileSize + yOffset + 0, 8, 8);
                map2d.fillRect(x * tileSize + xOffset + 8, y * tileSize + yOffset + 0, 8, 8);
                map2d.fillRect(x * tileSize + xOffset + 0, y * tileSize + yOffset + 8, 8, 8);
                map2d.fillRect(x * tileSize + xOffset + 8, y * tileSize + yOffset + 8, 8, 8);
            }
        }
    }
}

function getTile(x, y) {
    if (x < 0 || y < 0 || x >= mapWidth || y >= mapWidth) return level[0];
    else return level[x + y * mapWidth];
}

/*window.onload = init;
let units = [];

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

    window.onkeydown = function(e) {
        if (e.keyCode === 32) { // If space is pressed
            let unit = new Unit("Unit" + (units.length + 1));
            units.push(unit);
        }
    }
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

let Unit = function(name) {
    this.name = name;
    this.health = 0;

    this.getHealth();

    this.getName();
};

Unit.prototype = {
    getHealth: function() {
        return this.health;
    },

    getName: function() {
        return this.name;
    }
};*/
