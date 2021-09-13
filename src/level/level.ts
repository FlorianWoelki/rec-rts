import spritesheet from '../../assets/spritesheet.png';
import { createAndValidateWorld } from './generator/level-generator';
import { Grass } from './tile/grass';
import { Sand } from './tile/sand';
import { Tile } from './tile/tile';
import { Tree } from './tile/tree';
import { Water } from './tile/water';

export const Tiles = {
  water: new Water(0),
  grass: new Grass(1),
  sand: new Sand(2),
  tree: new Tree(3),
};

export const TilesArray: Tile[] = Object.entries(Tiles).map(([, Tile]) => Tile);

export class Level {
  public tiles: number[];
  public tileSize: number = 16;

  public tileImage: HTMLImageElement;
  private imagesToLoad: number = 0;

  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.tiles = new Array(width * height);

    this.tileImage = this.loadImage(spritesheet);
  }

  loadImage(path: string): HTMLImageElement {
    var result = new Image();
    this.imagesToLoad++;
    result.onload = (): void => {
      this.imagesToLoad--;
      if (this.imagesToLoad === 0) {
        this.init();
      }
    };
    result.src = path;
    return result;
  }

  private init(): void {
    const map = createAndValidateWorld(this.width, this.height);

    this.tiles = map[0];
  }

  public render(
    mapCanvas: HTMLCanvasElement,
    map2d: CanvasRenderingContext2D,
    xOffset: number,
    yOffset: number,
    zoom: number,
  ): void {
    const x0 = Math.floor(-xOffset / this.tileSize);
    const y0 = Math.floor(-yOffset / this.tileSize);
    const x1 = Math.ceil((-xOffset + mapCanvas.width / zoom) / this.tileSize);
    const y1 = Math.ceil((-yOffset + mapCanvas.height / zoom) / this.tileSize);

    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        this.getTile(x, y).render(this, map2d, x, y, xOffset, yOffset);
      }
    }
  }

  public renderTile(
    map2d: CanvasRenderingContext2D,
    sx: number,
    sy: number,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
  ): void {
    map2d.drawImage(
      this.tileImage,
      sx,
      sy,
      8,
      8,
      x * this.tileSize + xOffset,
      y * this.tileSize + yOffset,
      8,
      8,
    );
  }

  public getTile(x: number, y: number): Tile {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height)
      return Tiles.water;
    return TilesArray[this.tiles[x + y * this.width]];
  }

  public setTile(x: number, y: number, tile: Tile): void {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    this.tiles[x + y * this.width] = tile.id;
  }
}
