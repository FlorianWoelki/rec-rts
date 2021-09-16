import spritesheet from '../../assets/spritesheet.png';
import { createAndValidateWorld } from './generator/level-generator';
import { Grass } from './tile/grass';
import { Sand } from './tile/sand';
import { Tile } from './tile/tile';
import { Tree } from './tile/tree';
import { Water } from './tile/water';

export const Tiles: Record<string, Tile> = {
  water: new Water(0),
  grass: new Grass(1),
  sand: new Sand(2),
  tree: new Tree(3),
  startingPosition: new Grass(999),
};

const tilesIdArray = Object.entries(Tiles).map(([_, tile]) => tile);

export enum TileStateMask {
  OWNED = 1 << 0,
  VISIBLE = 3 << 1,
}

export class Level {
  public tiles: number[];
  public tilesState: number[];
  public tileSize: number = 16;

  public tileImage: HTMLImageElement;
  private imagesToLoad: number = 0;

  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.tiles = new Array(width * height);
    this.tilesState = new Array(width * height);

    this.tileImage = this.loadImage(spritesheet);
  }

  private loadImage(path: string): HTMLImageElement {
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
    this.tilesState = map[1];
    this.tilesState.fill(0);
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
        const tile = this.getTile(x, y);
        const tileState = this.getTileState(x, y, TileStateMask.OWNED);
        tile.render(this, map2d, x, y, xOffset, yOffset);

        if (tileState === 1) {
          map2d.drawImage(
            this.tileImage,
            0 * 8,
            6 * 8,
            16,
            16,
            x * this.tileSize + xOffset,
            y * this.tileSize + yOffset,
            16,
            16,
          );
        }
      }
    }

    // draw hide tiles
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const tileState = this.getTileState(x, y, TileStateMask.VISIBLE);
        if (tileState === 1) {
          map2d.drawImage(
            this.tileImage,
            30 * 8,
            2 * 8,
            8,
            8,
            x * this.tileSize + xOffset + 0,
            y * this.tileSize + yOffset + 0,
            8,
            8,
          );
          map2d.drawImage(
            this.tileImage,
            30 * 8,
            2 * 8,
            8,
            8,
            x * this.tileSize + xOffset + 8,
            y * this.tileSize + yOffset + 0,
            8,
            8,
          );
          map2d.drawImage(
            this.tileImage,
            30 * 8,
            2 * 8,
            8,
            8,
            x * this.tileSize + xOffset + 0,
            y * this.tileSize + yOffset + 8,
            8,
            8,
          );
          map2d.drawImage(
            this.tileImage,
            30 * 8,
            2 * 8,
            8,
            8,
            x * this.tileSize + xOffset + 8,
            y * this.tileSize + yOffset + 8,
            8,
            8,
          );
        } else {
          for (let i = 0; i < 4; i++) {
            const xSide = (i % 2) * 2 - 1;
            const ySide = (i >> 1) * 2 - 1;

            const u =
              this.getTileState(x, y + ySide, TileStateMask.VISIBLE) !==
              tileState;
            const l =
              this.getTileState(x + xSide, y, TileStateMask.VISIBLE) !==
              tileState;

            let xt = 32 - 7;
            let yt = 1;
            if (tileState === 3) yt += 3;

            if (u) yt += ySide;
            if (l) xt += xSide;

            map2d.drawImage(
              this.tileImage,
              xt * 8,
              yt * 8,
              8,
              8,
              x * this.tileSize + xOffset + (i % 2) * 8,
              y * this.tileSize + yOffset + (i >> 1) * 8,
              8,
              8,
            );
          }
        }
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
    const foundTile = tilesIdArray.find(
      (tile) => this.tiles[x + y * this.width] === tile.id,
    );
    return foundTile ?? Tiles.water;
  }

  public getTileState(x: number, y: number, mask: TileStateMask): number {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return 0;
    if (mask === TileStateMask.VISIBLE)
      return (this.tilesState[x + y * this.width] & mask) >> 1;
    return this.tilesState[x + y * this.width] & mask;
  }

  public setTileState(
    x: number,
    y: number,
    data: number,
    mask: TileStateMask,
  ): void {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    if (mask === TileStateMask.VISIBLE) {
      const oldData = this.tilesState[x + y * this.width];
      this.tilesState[x + y * this.width] = (data << 1) | (oldData & 1);
    } else {
      this.tilesState[x + y * this.width] ^= data;
    }
  }

  public setTile(x: number, y: number, tile: Tile): void {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    this.tiles[x + y * this.width] = tile.id;
  }

  public recalcVisibility(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let tileState = this.getTileState(x, y, TileStateMask.VISIBLE);
        if (tileState === 3) {
          tileState >>= 1;
        }

        this.setTileState(x, y, tileState, TileStateMask.VISIBLE);
      }
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const owned = this.getTileState(x, y, TileStateMask.OWNED);
        if (owned) {
          this.revealTile(x, y, 4);
        }
      }
    }
  }

  public revealTile(xx: number, yy: number, radius: number): void {
    for (let y = yy - radius; y <= yy + radius; y++) {
      if (y < 0 || y >= this.height) continue;
      for (let x = xx - radius; x <= xx + radius; x++) {
        if (x < 0 || x >= this.width) continue;
        const xd = x - xx;
        const yd = y - yy;
        if (xd * xd + yd * yd <= radius * radius + 2) {
          if (
            y === 0 ||
            x === 0 ||
            x === this.width - 1 ||
            y === this.height - 1
          ) {
            continue;
          }

          this.setTileState(x, y, 3, TileStateMask.VISIBLE);
        }
      }
    }
  }
}
