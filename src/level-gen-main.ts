import { createAndValidateWorld } from './level/generator/level-generator';
import { Tiles } from './level/level';

const mapCanvas = document.querySelector<HTMLCanvasElement>('#map')!;
mapCanvas.width = window.innerWidth;
mapCanvas.height = window.innerHeight;
const map2d = mapCanvas.getContext('2d')!;
map2d.imageSmoothingEnabled = false;

const width = 128;
const height = 128;
const imageData = map2d.createImageData(width, height);

const map = createAndValidateWorld(width, height)[0];

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = x + y * width;

    if (map[i] === Tiles.water.id) {
      imageData.data[i * 4] = 0;
      imageData.data[i * 4 + 1] = 0;
      imageData.data[i * 4 + 2] = 255;
      imageData.data[i * 4 + 3] = 255;
    }
    if (map[i] === Tiles.grass.id) {
      imageData.data[i * 4] = 0;
      imageData.data[i * 4 + 1] = 255;
      imageData.data[i * 4 + 2] = 0;
      imageData.data[i * 4 + 3] = 255;
    }
    if (map[i] === Tiles.sand.id) {
      imageData.data[i * 4] = 255;
      imageData.data[i * 4 + 1] = 255;
      imageData.data[i * 4 + 2] = 0;
      imageData.data[i * 4 + 3] = 255;
    }
    if (map[i] === Tiles.tree.id) {
      imageData.data[i * 4] = 0;
      imageData.data[i * 4 + 1] = 200;
      imageData.data[i * 4 + 2] = 0;
      imageData.data[i * 4 + 3] = 255;
    }
    if (map[i] === Tiles.rock.id) {
      imageData.data[i * 4] = 200;
      imageData.data[i * 4 + 1] = 200;
      imageData.data[i * 4 + 2] = 200;
      imageData.data[i * 4 + 3] = 255;
    }
    if (map[i] === Tiles.flower.id) {
      imageData.data[i * 4] = 0;
      imageData.data[i * 4 + 1] = 255;
      imageData.data[i * 4 + 2] = 255;
      imageData.data[i * 4 + 3] = 255;
    }
    if (map[i] === Tiles.startingPosition.id) {
      imageData.data[i * 4] = 255;
      imageData.data[i * 4 + 1] = 0;
      imageData.data[i * 4 + 2] = 0;
      imageData.data[i * 4 + 3] = 255;
    }
  }
}

const newCanvas = document.createElement('canvas');
newCanvas.width = imageData.width;
newCanvas.height = imageData.height;

newCanvas.getContext('2d')!.putImageData(imageData, 0, 0);

const zoom = 6;
map2d.scale(zoom, zoom);
map2d.drawImage(newCanvas, 0, 0);
