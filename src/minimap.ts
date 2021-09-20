import { Level, TileStateMask } from './level/level';

export class Minimap {
  private map2d: CanvasRenderingContext2D;
  private imageData: ImageData;
  private minimapCanvas = document.createElement('canvas');

  private width: number;
  private height: number;

  constructor(map2d: CanvasRenderingContext2D, width: number, height: number) {
    this.map2d = map2d;
    this.width = width;
    this.height = height;

    this.imageData = map2d.createImageData(width, height);
    this.minimapCanvas.width = this.imageData.width;
    this.minimapCanvas.height = this.imageData.height;
  }

  public getRGB(hex: number): [number, number, number] {
    const r = (hex >> 16) & 0xff;
    const g = (hex >> 8) & 0xff;
    const b = hex & 0xff;
    return [r, g, b];
  }

  public render(
    mapCanvas: HTMLCanvasElement,
    level: Level,
    tileSize: number,
    zoom: number,
  ): void {
    const downScale = 10;
    const mapX =
      Math.floor(this.map2d.canvas.width / zoom) -
      mapCanvas.width / (tileSize + zoom + downScale) -
      8;
    const mapY = 8;
    const width = Math.round(mapCanvas.width / (tileSize + zoom + downScale));

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const i = x + y * this.width;
        const tile = level.getTile(x, y);
        const [r, g, b] = this.getRGB(tile.color);

        if (level.getTileState(x, y, TileStateMask.OWNED)) {
          this.imageData.data[i * 4] = 255;
          this.imageData.data[i * 4 + 1] = 0;
          this.imageData.data[i * 4 + 2] = 0;
          this.imageData.data[i * 4 + 3] = 255;
        } else if (level.getTileState(x, y, TileStateMask.VISIBLE) >= 1) {
          this.imageData.data[i * 4] = r;
          this.imageData.data[i * 4 + 1] = g;
          this.imageData.data[i * 4 + 2] = b;
          this.imageData.data[i * 4 + 3] = 255;
        } else {
          this.imageData.data[i * 4] = 0;
          this.imageData.data[i * 4 + 1] = 0;
          this.imageData.data[i * 4 + 2] = 0;
          this.imageData.data[i * 4 + 3] = 255;
        }
      }
    }

    this.minimapCanvas.getContext('2d')!.putImageData(this.imageData, 0, 0);
    this.map2d.drawImage(this.minimapCanvas, mapX, mapY, width, width);

    this.map2d.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    this.map2d.strokeRect(mapX, mapY, width, width);
  }
}
