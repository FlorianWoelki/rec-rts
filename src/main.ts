import './style.css';
import spritesheet from '../assets/spritesheet.png';
import { Keyboard } from './keyboard';
import { TileStateMask, Level, Tiles } from './level/level';
import { TileOutcomeType } from './level/tile/tile';
import { Minimap } from './minimap';
import { Troll } from './entity/troll';
import { EntityID } from './entity/entity';

let pageLoaded = false;
let initialized = false;
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

const mapWidth = 128;
const mapHeight = 128;

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
let minimap: Minimap;

const cards = new Array(1);
for (let i = 0; i < cards.length; i++) {
  cards[i] = {
    name: 'Base',
    imageX: 0,
    imageY: 9,
  };
}

const level = new Level(mapWidth, mapHeight);

const init = (): void => {
  if (!pageLoaded || imagesToLoad > 0) return;

  mapCanvas.width = window.innerWidth;
  mapCanvas.height = window.innerHeight;
  minimap = new Minimap(map2d, mapWidth, mapHeight);

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

      level.entities.forEach((e) => {
        if (
          xTile === Math.round(e.getX()) &&
          yTile === Math.round(e.getY()) &&
          e.getID() === EntityID.human
        ) {
          e.isControlled = true;
        }
      });
    }
  };

  window.onmousemove = (event) => {
    if (!mouseDown) return;
    event.preventDefault();
    const distX = event.clientX - mouseDownX;
    const distY = event.clientY - mouseDownY;

    const scrollDeadZone = 8;

    if (
      scrolling ||
      distX * distX + distY * distY > scrollDeadZone * scrollDeadZone
    ) {
      scrolling = true;
      scrollX += distX / zoom;
      scrollY += distY / zoom;
      mouseDownX = event.clientX;
      mouseDownY = event.clientY;
    }
  };

  if (!initialized) {
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
    gameLoop();
    initialized = true;
  }

  render();
};

window.onresize = init;

let selectedX: number | null = null;
let selectedY: number | null = null;
let shouldShowTileData = false;

const clickTile = (
  xTile: number,
  yTile: number,
  sx: number = 800,
  sy: number = 600,
): void => {
  const width = Math.floor(map2d.canvas.width / zoom);
  const height = Math.floor(map2d.canvas.height / zoom);

  // check if it is in range of our gui
  if (
    sx >= 0 &&
    sx <= width &&
    sy >= height - 35 &&
    sy <= height &&
    selectedX &&
    selectedY
  ) {
    const tile = level.getTile(selectedX, selectedY);
    if (tile.isPassable) {
      checkClickCard(sx, sy);
    }
    return;
  }

  if (xTile < 0 || yTile < 0 || xTile > mapWidth || yTile > mapHeight) {
    selectedX = null;
    selectedY = null;
    return;
  }

  const data = level.getTileState(xTile, yTile, TileStateMask.VISIBLE);
  if (data === 0) {
    selectedX = null;
    selectedY = null;
    return;
  }

  if (selectedX !== xTile || selectedY !== yTile) {
    selectedX = xTile;
    selectedY = yTile;

    shouldShowTileData = data === 3;
  }
};

let lastFrameTime = Date.now();
let currentFrameTime = Date.now();
let timeElapsed = 0;
const updateInterval = 60;
const gameLoop = (): void => {
  requestAnimationFrame(gameLoop);

  lastFrameTime = currentFrameTime;
  currentFrameTime = Date.now();
  timeElapsed += currentFrameTime - lastFrameTime;
  if (timeElapsed >= updateInterval) {
    timeElapsed = 0;
    update();
  }

  const scrollData = keyboard.update(
    scrollX,
    scrollY,
    () => {},
    () => {
      if (selectedX && selectedY) {
        for (let i = 0; i < 5; i++)
          level.entities.push(new Troll(selectedX, selectedY));

        level.setTileState(selectedX, selectedY, 1, TileStateMask.OWNED);
        level.recalcVisibility();

        selectedX = null;
        selectedY = null;
      }
    },
    (xa: number, ya: number) => {
      const e = level.entities.find((e) => e.isControlled);
      if (e) {
        e.xa = xa;
        e.ya = ya;
      }
    },
  );

  if (scrollX !== scrollData[0] || scrollY !== scrollData[1]) {
    scrollX = scrollData[0];
    scrollY = scrollData[1];
  }

  render();
};

const update = (): void => {
  level.update();
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

  if (selectedX && selectedY) {
    map2d.strokeStyle = 'white';
    map2d.strokeRect(
      selectedX * tileSize + xOffset,
      selectedY * tileSize + yOffset,
      tileSize,
      tileSize,
    );

    if (shouldShowTileData) {
      const tile = level.getTile(selectedX, selectedY);
      const tileOutcome = tile.getOutcome();
      if (tileOutcome) {
        map2d.fillStyle = 'rgba(0, 0, 0, 0.3)';
        map2d.fillRect(
          selectedX * tileSize + xOffset + tileSize,
          selectedY * tileSize + yOffset,
          18,
          16,
        );
        map2d.drawImage(
          tileImage,
          TileOutcomeType[tileOutcome.type].imageX * 8,
          TileOutcomeType[tileOutcome.type].imageY * 8,
          8,
          8,
          selectedX * tileSize + xOffset + 18,
          selectedY * tileSize + yOffset + 4,
          8,
          8,
        );
        drawString(
          `${tileOutcome.amount}`,
          selectedX * tileSize + xOffset + 27,
          selectedY * tileSize + yOffset + 5,
          5,
        );
      }
    }
  }

  drawHUD();
  minimap.render(mapCanvas, level, tileSize, zoom);
};

const hudItems = [
  {
    imageX: 0,
    imageY: 11,
  },
  {
    imageX: 1,
    imageY: 11,
  },
];
const drawHUD = (): void => {
  for (let i = 0; i < hudItems.length; i++) {
    map2d.drawImage(
      tileImage,
      hudItems[i].imageX * 8,
      hudItems[i].imageY * 8,
      8,
      8,
      4,
      4 + i * 14,
      8,
      8,
    );
    drawString('0', 14, 5 + i * 14, 6);
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

  if (
    sx >= cardX &&
    sx <= cardX + 16 &&
    sy >= cardY &&
    sy <= cardY + 16 &&
    selectedX &&
    selectedY
  ) {
    level.setTileState(selectedX, selectedY, 1, TileStateMask.OWNED);
    level.recalcVisibility();

    selectedX = null;
    selectedY = null;
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
