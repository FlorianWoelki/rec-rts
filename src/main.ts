import './style.css';
import spritesheet from '../assets/spritesheet.png';
import { Keyboard } from './keyboard';

let pageLoaded = false;
window.onload = (): void => {
  pageLoaded = true;
  init();
};
window.onresize = init;

let mouseDown = false;
let scrolling = false;

let mouseDownX = 0;
let mouseDownY = 0;

let scrollX = 0;
let scrollY = 0;
var tileSize = 16;
var zoom = 3;

var mapWidth = 32;
var mapHeight = 32;

var tileImage = loadImage(spritesheet);
var imagesToLoad = 0;

const mapCanvas = document.querySelector<HTMLCanvasElement>('#map')!;
const map2d = mapCanvas.getContext('2d')!;
const keyboard = new Keyboard();

var cards = new Array(6);
for (let i = 0; i < cards.length; i++) {
  cards[i] = {
    name: 'Base',
    imageX: 0,
    imageY: 6,
  };
}

var level = new Array(mapWidth * mapHeight);
for (let y = 0; y < mapHeight; y++) {
  for (let x = 0; x < mapWidth; x++) {
    level[x + y * mapWidth] = {
      color: 0xff00ff,
      visible: false,
      owned: false,
      land: 2 - Math.floor(Math.random() * Math.random() * 3),
    };
  }
}

function loadImage(path: string) {
  var result = new Image();
  imagesToLoad++;
  result.onload = function () {
    imagesToLoad--;
    if (imagesToLoad === 0) {
      init();
    }
  };
  result.src = path;
  return result;
}

async function init() {
  if (!pageLoaded || imagesToLoad > 0) return;

  mapCanvas.width = window.innerWidth;
  mapCanvas.height = window.innerHeight;

  mapCanvas.onmousedown = function (event) {
    event.preventDefault();
    mouseDown = true;
    scrolling = false;
    mouseDownX = event.clientX;
    mouseDownY = event.clientY;
  };

  mapCanvas.onclick = function (event) {
    mouseDown = false;
    if (!scrolling) {
      var xOffset = Math.floor(
        scrollX + (mapCanvas.width / zoom - mapWidth * tileSize) / 2,
      );
      var yOffset = Math.floor(
        scrollY + (mapCanvas.height / zoom - mapHeight * tileSize) / 2,
      );

      var xTile = Math.floor((event.clientX / zoom - xOffset) / tileSize);
      var yTile = Math.floor((event.clientY / zoom - yOffset) / tileSize);
      clickTile(xTile, yTile);
    }
  };

  var xOffset = Math.floor(
    scrollX + (mapCanvas.width / zoom - mapWidth * tileSize) / 2,
  );
  var yOffset = Math.floor(
    scrollY + (mapCanvas.height / zoom - mapHeight * tileSize) / 2,
  );

  var xTile = Math.floor((800 / zoom - xOffset) / tileSize);
  var yTile = Math.floor((600 / zoom - yOffset) / tileSize);
  clickTile(xTile, yTile);

  window.onmousemove = function (event) {
    if (!mouseDown) return;
    event.preventDefault();
    var distX = event.clientX - mouseDownX;
    var distY = event.clientY - mouseDownY;

    var scrollDeadZone = 8;

    if (
      scrolling ||
      distX * distX + distY * distY > scrollDeadZone * scrollDeadZone
    ) {
      scrolling = true;
      scrollX += distX / zoom;
      scrollY += distY / zoom;
      mouseDownX = event.clientX;
      mouseDownY = event.clientY;
      requestAnimationFrame(renderMap);
    }
  };

  update();
}

let selectedX = 0;
let selectedY = 0;

function clickTile(xTile: number, yTile: number) {
  if (xTile > 0 && yTile > 0 && xTile < mapWidth && yTile < mapHeight) {
    var tile = getTile(xTile, yTile);
    tile.owned = !tile.owned;
    recalcVisibility();
  }

  selectedX = xTile;
  selectedY = yTile;
  console.log(selectedX, selectedY);
  requestAnimationFrame(renderMap);
}

function recalcVisibility() {
  for (var y = 0; y < mapHeight; y++) {
    for (var x = 0; x < mapWidth; x++) {
      level[x + y * mapWidth].visible &= 1;
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

function revealTile(xTile: number, yTile: number, radius: number) {
  for (var y = yTile - radius; y <= yTile + radius; y++) {
    if (y < 0 || y >= mapHeight) continue;
    for (var x = xTile - radius; x <= xTile + radius; x++) {
      if (x < 0 || x >= mapWidth) continue;
      var xd = x - xTile;
      var yd = y - yTile;
      if (xd * xd + yd * yd <= radius * radius + 2) {
        if (y === 0 || x === 0 || x === mapWidth - 1 || y === mapHeight - 1)
          continue;
        level[x + y * mapWidth].visible = 3;
      }
    }
  }
}

const update = (): void => {
  requestAnimationFrame(update);
  keyboard.update(renderMap);
};

function renderMap() {
  var maxZoom = 300;
  var aspectRation = 16 / 9;
  zoom = Math.max(
    Math.floor(mapCanvas.height / maxZoom + 1),
    Math.floor(mapCanvas.width / (maxZoom * aspectRation) + 1),
  );

  var xOverflow =
    Math.max(0, (mapWidth + 4) * tileSize - mapCanvas.width / zoom) / 2;
  var yOverflow =
    Math.max(0, (mapHeight + 4) * tileSize - mapCanvas.height / zoom) / 2;

  if (scrollX < -xOverflow) scrollX = -xOverflow;
  if (scrollY < -yOverflow) scrollY = -yOverflow;
  if (scrollX > xOverflow) scrollX = xOverflow;
  if (scrollY > yOverflow) scrollY = yOverflow;

  map2d.imageSmoothingEnabled = false;
  map2d.setTransform(zoom, 0, 0, zoom, 0, 0);
  var xOffset = Math.floor(
    scrollX + (mapCanvas.width / zoom - mapWidth * tileSize) / 2,
  );
  var yOffset = Math.floor(
    scrollY + (mapCanvas.height / zoom - mapHeight * tileSize) / 2,
  );
  var x0 = Math.floor(-xOffset / tileSize);
  var y0 = Math.floor(-yOffset / tileSize);
  var x1 = Math.ceil((-xOffset + mapCanvas.width / zoom) / tileSize);
  var y1 = Math.ceil((-yOffset + mapCanvas.height / zoom) / tileSize);

  for (var y = y0; y < y1; y++) {
    for (var x = x0; x < x1; x++) {
      var tile = getTile(x, y);
      if (tile.land == 0) {
        map2d.drawImage(
          tileImage,
          5 * 8,
          0 * 8,
          8,
          8,
          x * tileSize + xOffset + 0,
          y * tileSize + yOffset + 0,
          8,
          8,
        );
        map2d.drawImage(
          tileImage,
          5 * 8,
          0 * 8,
          8,
          8,
          x * tileSize + xOffset + 8,
          y * tileSize + yOffset + 0,
          8,
          8,
        );
        map2d.drawImage(
          tileImage,
          5 * 8,
          0 * 8,
          8,
          8,
          x * tileSize + xOffset + 0,
          y * tileSize + yOffset + 8,
          8,
          8,
        );
        map2d.drawImage(
          tileImage,
          5 * 8,
          0 * 8,
          8,
          8,
          x * tileSize + xOffset + 8,
          y * tileSize + yOffset + 8,
          8,
          8,
        );
      } else {
        for (var i = 0; i < 4; i++) {
          var xSide = (i % 2) * 2 - 1;
          var ySide = (i >> 1) * 2 - 1;

          var t_u = getTile(x, y + ySide).land !== tile.land;
          var t_l = getTile(x + xSide, y).land !== tile.land;
          var t_ul = getTile(x + xSide, y + ySide).land !== tile.land;

          var xt = 1;
          var yt = 1 + (tile.land - 1) * 3;

          if (t_u) yt += ySide;
          if (t_l) xt += xSide;
          if (!t_u && !t_l && t_ul) {
            xt += 3 - (i % 2);
            yt -= i >> 1;
          }

          map2d.drawImage(
            tileImage,
            xt * 8,
            yt * 8,
            8,
            8,
            x * tileSize + xOffset + (i % 2) * 8,
            y * tileSize + yOffset + (i >> 1) * 8,
            8,
            8,
          );
        }
      }

      if (tile.owned) {
        map2d.drawImage(
          tileImage,
          0 * 8,
          6 * 8,
          16,
          16,
          x * tileSize + xOffset,
          y * tileSize + yOffset,
          16,
          16,
        );
      }
    }
  }
  for (var y = y0; y < y1; y++) {
    for (var x = x0; x < x1; x++) {
      var tile = getTile(x, y);
      if (tile.visible === 1) {
        map2d.drawImage(
          tileImage,
          30 * 8,
          2 * 8,
          8,
          8,
          x * tileSize + xOffset + 0,
          y * tileSize + yOffset + 0,
          8,
          8,
        );
        map2d.drawImage(
          tileImage,
          30 * 8,
          2 * 8,
          8,
          8,
          x * tileSize + xOffset + 8,
          y * tileSize + yOffset + 0,
          8,
          8,
        );
        map2d.drawImage(
          tileImage,
          30 * 8,
          2 * 8,
          8,
          8,
          x * tileSize + xOffset + 0,
          y * tileSize + yOffset + 8,
          8,
          8,
        );
        map2d.drawImage(
          tileImage,
          30 * 8,
          2 * 8,
          8,
          8,
          x * tileSize + xOffset + 8,
          y * tileSize + yOffset + 8,
          8,
          8,
        );
      } else {
        for (var i = 0; i < 4; i++) {
          var xSide = (i % 2) * 2 - 1;
          var ySide = (i >> 1) * 2 - 1;

          var t_u = getTile(x, y + ySide).visible !== tile.visible;
          var t_l = getTile(x + xSide, y).visible !== tile.visible;
          var t_ul = getTile(x + xSide, y + ySide).visible !== tile.visible;

          var xt = 32 - 7;
          var yt = 1;
          if (tile.visible == 3) yt += 3;

          if (t_u) yt += ySide;
          if (t_l) xt += xSide;

          map2d.drawImage(
            tileImage,
            xt * 8,
            yt * 8,
            8,
            8,
            x * tileSize + xOffset + (i % 2) * 8,
            y * tileSize + yOffset + (i >> 1) * 8,
            8,
            8,
          );
        }
      }
    }
  }

  drawString('GOLD: 500', 4, 4 + 10 * 0);
  drawString('FOOD: 0/100', 4, 4 + 10 * 1);

  drawInventoryPanel();

  //draw cards
  for (var i = 0; i < cards.length; i++) {
    drawString(cards[i].name, 6, 34 + i * 24, 3);
    drawCard(cards[i].imageX, cards[i].imageY, 4, 38 + i * 24);
  }
}

function drawInventoryPanel() {
  map2d.beginPath();
  map2d.fillStyle = 'rgba(255, 255, 255, 0.3)';
  map2d.fillRect(0, 30, 24, 24 * cards.length + 6);
  map2d.stroke();
}

function getTile(x: number, y: number) {
  if (x < 0 || y < 0 || x >= mapWidth || y >= mapWidth) return level[0];
  else return level[x + y * mapWidth];
}

var tileCharacters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ      ' + '0123456789.,!?\'":;()+-=*/\\%     ';

function drawString(string: string, x: number, y: number, fontSize = 8) {
  string = string.toUpperCase();

  for (var i = 0; i < string.length; i++) {
    var index = tileCharacters.indexOf(string.charAt(i));
    var xt = 0 + (index % 32);
    var yt = 29 + (index >> 5);
    map2d.drawImage(
      tileImage,
      xt * 8,
      yt * 8,
      8,
      8,
      x + i * fontSize,
      y,
      fontSize,
      fontSize,
    );
  }
}

function drawCard(imageX: number, imageY: number, x: number, y: number): void {
  map2d.beginPath();
  map2d.strokeStyle = 'yellow';
  map2d.rect(x, y, 16, 16);
  map2d.stroke();
  map2d.drawImage(tileImage, imageX * 8, imageY * 8, 16, 16, x, y, 16, 16);
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
