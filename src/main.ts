import './style.css';
import spritesheet from '../assets/spritesheet.png';
import { Keyboard } from './keyboard';
import { TileStateMask, Level, Tiles } from './level/level';

let pageLoaded = false;
window.onload = (): void => {
  pageLoaded = true;
  init();
};

let mouseDown = false;
let scrolling = false;

let mouseDownX = 0;
let mouseDownY = 0;

let scrollX = 0;
let scrollY = 0;
let startingX = 0;
let startingY = 0;
const tileSize = 16;
let zoom = 3;

const mapWidth = 32;
const mapHeight = 32;

let imagesToLoad = 0;
const loadImage = (path: string): HTMLImageElement => {
  const result = new Image();
  imagesToLoad++;
  result.onload = (): void => {
    imagesToLoad--;
    if (imagesToLoad === 0) {
      init();
    }
  };
  result.src = path;
  return result;
};

const tileImage = loadImage(spritesheet);

const mapCanvas = document.querySelector<HTMLCanvasElement>('#map')!;
const map2d = mapCanvas.getContext('2d')!;
const keyboard = new Keyboard();

const cards = new Array(1);
for (let i = 0; i < cards.length; i++) {
  cards[i] = {
    name: 'Base',
    imageX: 0,
    imageY: 6,
  };
}

const level = new Level(mapWidth, mapHeight);

const init = (): void => {
  if (!pageLoaded || imagesToLoad > 0) return;

  mapCanvas.width = window.innerWidth;
  mapCanvas.height = window.innerHeight;

  mapCanvas.onmousedown = (event) => {
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
        scrollX + -startingX * 16 + window.innerWidth / zoom / 2,
      );
      const yOffset = Math.floor(
        scrollY + -startingY * 16 + window.innerHeight / zoom / 2,
      );

      const xTile = Math.floor((event.clientX / zoom - xOffset) / tileSize);
      const yTile = Math.floor((event.clientY / zoom - yOffset) / tileSize);
      clickTile(xTile, yTile, event.clientX / zoom, event.clientY / zoom);
    }
  };

  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      const i = x + y * mapWidth;

      if (level.tiles[i] === Tiles.startingPosition.id) {
        startingX = x;
        startingY = y;

        level.setTileState(startingX, startingY, 1, TileStateMask.OWNED);
        level.recalcVisibility();
      }
    }
  }

  window.onmousemove = (event) => {
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
};

let selectedX = -1;
let selectedY = -1;
let shouldDrawSelection = false;
let shouldShowTileData = false;

const clickTile = (
  xTile: number,
  yTile: number,
  sx: number,
  sy: number,
): void => {
  const width = Math.floor(map2d.canvas.width / zoom);
  const height = Math.floor(map2d.canvas.height / zoom);

  // check if it is in range of our gui
  if (sx >= 0 && sx <= width && sy >= height - 35 && sy <= height) {
    checkClickCard(sx, sy);
    return;
  }

  if (xTile < 0 || yTile < 0 || xTile > mapWidth || yTile > mapHeight) {
    selectedX = -1;
    selectedY = -1;
    return;
  }

  if (selectedX !== xTile || selectedY !== yTile) {
    selectedX = xTile;
    selectedY = yTile;
    shouldDrawSelection = true;

    const data = level.getTileState(xTile, yTile, TileStateMask.VISIBLE);
    shouldShowTileData = data === 3;
  }

  requestAnimationFrame(render);
};

const update = (): void => {
  requestAnimationFrame(update);
  const scrollData = keyboard.update(scrollX, scrollY, () => {
    shouldDrawSelection = false;
    requestAnimationFrame(render);
  });
  if (scrollX !== scrollData[0] || scrollY !== scrollData[1]) {
    scrollX = scrollData[0];
    scrollY = scrollData[1];
    requestAnimationFrame(render);
  }
};

const render = (): void => {
  const maxZoom = 300;
  const aspectRation = 16 / 9;
  zoom = Math.max(
    Math.floor(mapCanvas.height / maxZoom + 1),
    Math.floor(mapCanvas.width / (maxZoom * aspectRation) + 1),
  );

  if (scrollX > startingX * tileSize) scrollX = startingX * tileSize;
  if (scrollY > startingY * tileSize) scrollY = startingY * tileSize;
  if (scrollX < startingX * tileSize - (mapWidth - 2) * tileSize)
    scrollX = startingX * tileSize - (mapWidth - 2) * tileSize;
  if (scrollY < startingY * tileSize - (mapHeight - 2) * tileSize)
    scrollY = startingY * tileSize - (mapHeight - 2) * tileSize;

  map2d.imageSmoothingEnabled = false;
  map2d.setTransform(zoom, 0, 0, zoom, 0, 0);

  const xOffset = Math.floor(
    scrollX + -startingX * 16 + window.innerWidth / zoom / 2,
  );
  const yOffset = Math.floor(
    scrollY + -startingY * 16 + window.innerHeight / zoom / 2,
  );

  level.render(mapCanvas, map2d, xOffset, yOffset, zoom);

  //draw cards
  for (var i = 0; i < cards.length; i++) {
    const width = Math.floor(map2d.canvas.width / zoom);
    const height = Math.floor(map2d.canvas.height / zoom);

    map2d.fillStyle = 'rgba(255, 255, 255, 0.3)';
    map2d.fillRect(0, height - 35, width, height);
    drawString(cards[i].name, width / 2 + 2, height - 25 - 5, 3);
    drawCard(cards[i].imageX, cards[i].imageY, width / 2, height - 25);
  }

  if (shouldDrawSelection) {
    map2d.strokeStyle = 'white';
    map2d.strokeRect(
      selectedX * tileSize + xOffset,
      selectedY * tileSize + yOffset,
      tileSize,
      tileSize,
    );

    if (shouldShowTileData) {
      const tile = level.getTile(selectedX, selectedY);
      drawString(
        `Outcome: ${tile.getOutcome()}`,
        selectedX * tileSize + xOffset + 18,
        selectedY * tileSize + yOffset + 6,
        4,
      );
    }
  }
};

const tileCharacters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ      ' + '0123456789.,!?\'":;()+-=*/\\%     ';

const drawString = (
  string: string,
  x: number,
  y: number,
  fontSize = 8,
): void => {
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
};

const checkClickCard = (sx: number, sy: number): void => {
  const width = Math.floor(map2d.canvas.width / zoom);
  const height = Math.floor(map2d.canvas.height / zoom);

  const cardX = width / 2;
  const cardY = height - 25;

  if (sx >= cardX && sx <= cardX + 16 && sy >= cardY && sy <= cardY + 16) {
    level.setTileState(selectedX, selectedY, 1, TileStateMask.OWNED);
    level.recalcVisibility();
    requestAnimationFrame(render);

    selectedX = -1;
    selectedY = -1;
  }
};

const drawCard = (
  imageX: number,
  imageY: number,
  x: number,
  y: number,
): void => {
  map2d.beginPath();
  map2d.strokeStyle = 'yellow';
  map2d.rect(x, y, 16, 16);
  map2d.stroke();
  map2d.drawImage(tileImage, imageX * 8, imageY * 8, 16, 16, x, y, 16, 16);
};
