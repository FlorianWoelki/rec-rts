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

const buffer = new Uint8ClampedArray(width * height * 4);
const map = createAndValidateWorld(width, height)[0];

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4;
    if (map[i] === Tiles.water.id) {
      buffer[i] = 0;
      buffer[i + 1] = 0;
      buffer[i + 2] = 255;
      buffer[i + 3] = 255;
    }
    if (map[i] === Tiles.grass.id) {
      buffer[i] = 0;
      buffer[i + 1] = 255;
      buffer[i + 2] = 0;
      buffer[i + 3] = 255;
    }
    if (map[i] === Tiles.sand.id) {
      buffer[i] = 255;
      buffer[i + 1] = 255;
      buffer[i + 2] = 0;
      buffer[i + 3] = 255;
    }
    if (map[i] === Tiles.tree.id) {
      buffer[i] = 0;
      buffer[i + 1] = 200;
      buffer[i + 2] = 0;
      buffer[i + 3] = 255;
    }
  }
}
imageData.data.set(buffer);

const newCanvas = document.createElement('canvas');
newCanvas.width = imageData.width;
newCanvas.height = imageData.height;

newCanvas.getContext('2d')!.putImageData(imageData, 0, 0);

const zoom = 8;
map2d.scale(zoom, zoom);
map2d.drawImage(newCanvas, 0, 0);
