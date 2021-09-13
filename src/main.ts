import './style.css';
import spritesheet from '../assets/spritesheet.png';
import { Keyboard } from './keyboard';
import { TileStateMask, Level } from './level/level';

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
const tileSize = 16;
let zoom = 3;

const mapWidth = 128;
const mapHeight = 128;

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

const level = new Level(mapWidth, mapHeight);

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

  mapCanvas.onclick = (event) => {
    mouseDown = false;
    if (!scrolling) {
      const xOffset = Math.floor(
        scrollX + (mapCanvas.width / zoom - mapWidth * tileSize) / 2,
      );
      const yOffset = Math.floor(
        scrollY + (mapCanvas.height / zoom - mapHeight * tileSize) / 2,
      );

      const xTile = Math.floor((event.clientX / zoom - xOffset) / tileSize);
      const yTile = Math.floor((event.clientY / zoom - yOffset) / tileSize);
      clickTile(xTile, yTile);
    }
  };

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
      requestAnimationFrame(render);
    }
  };

  update();
  render();
}

let selectedX = 0;
let selectedY = 0;

function clickTile(xTile: number, yTile: number) {
  if (xTile > 0 && yTile > 0 && xTile < mapWidth && yTile < mapHeight) {
    level.setTileState(xTile, yTile, 1, TileStateMask.OWNED);
    level.recalcVisibility();
  }

  selectedX = xTile;
  selectedY = yTile;
  console.log(selectedX, selectedY);
  requestAnimationFrame(render);
}

const update = (): void => {
  requestAnimationFrame(update);
  const scrollData = keyboard.update(scrollX, scrollY);
  if (scrollX !== scrollData[0] || scrollY !== scrollData[1]) {
    scrollX = scrollData[0];
    scrollY = scrollData[1];
    requestAnimationFrame(render);
  }
};

function render() {
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
  const xOffset = Math.floor(
    scrollX + (mapCanvas.width / zoom - mapWidth * tileSize) / 2,
  );
  const yOffset = Math.floor(
    scrollY + (mapCanvas.height / zoom - mapHeight * tileSize) / 2,
  );

  level.render(mapCanvas, map2d, xOffset, yOffset, zoom);

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
