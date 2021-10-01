import spritesheet from '../../assets/spritesheet.png';
import { Human } from '../entity/human';
import { createAndValidateWorld } from './generator/level-generator';
import { Cactus } from './tile/cactus';
import { Dirt } from './tile/dirt';
import { Flower } from './tile/flower';
import { Grass } from './tile/grass';
import { Rock } from './tile/rock';
import { Sand } from './tile/sand';
import { Tile } from './tile/tile';
import { Tree } from './tile/tree';
import { Water } from './tile/water';

export const Tiles = {
  water: new Water(0),
  grass: new Grass(1),
  sand: new Sand(2),
  tree: new Tree(3),
  rock: new Rock(4),
  flower: new Flower(5),
  cactus: new Cactus(6),
  dirt: new Dirt(7),
  startingPosition: new Grass(999),
};

const tilesIdArray = Object.entries(Tiles).map(([_, tile]) => tile);

export enum TileStateMask {
  OWNED = 1 << 0,
  VISIBLE = 3 << 1,
}

export interface OnTopTile {
  sx: number;
  sy: number;
  x: number;
  y: number;
  xOffset: number;
  yOffset: number;
}

export class Level {
  public tiles: number[];
  public data: number[];
  public tilesState: number[];
  public tileSize: number = 16;

  public tickCount: number = 0;

  public tileImage: HTMLImageElement;
  private imagesToLoad: number = 0;

  public width: number;
  public height: number;
  private seed?: number;

  public entities: Human[] = [];
  public onTopTiles: OnTopTile[] = [];

  constructor(width: number, height: number, seed?: number) {
    this.width = width;
    this.height = height;
    this.seed = seed;
    this.tiles = new Array(width * height);
    this.data = new Array(width * height);
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
    const map = createAndValidateWorld(this.width, this.height, this.seed);

    this.tiles = map[0];
    this.tilesState = [...map[1]];
    this.data = [...map[1]];
    this.tilesState.fill(0);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tileId = this.tiles[x + y * this.width];
        if (tileId === Tiles.startingPosition.id) {
          for (let i = 0; i < 5; i++) {
            this.entities.push(new Human(x, y));
          }
        }
      }
    }
  }

  public update(): void {
    this.tickCount++;
    if (this.tickCount >= Number.MAX_VALUE) {
      this.tickCount = 0;
    }

    for (let i = 0; i < (this.width * this.height) / 50; i++) {
      const xt = Math.round(Math.random() * this.width);
      const yt = Math.round(Math.random() * this.height);
      this.getTile(xt, yt).update(this, xt, yt);
    }

    this.entities.forEach((entity) => entity.update(this));
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
        if (tile.isOnGrass) {
          const grassTile = tilesIdArray.find(
            (tile) => tile.id === Tiles.grass.id,
          )!;
          grassTile.render(this, map2d, x, y, xOffset, yOffset);
        } else if (tile.isOnSand) {
          const sandTile = tilesIdArray.find(
            (tile) => tile.id === Tiles.sand.id,
          )!;
          sandTile.render(this, map2d, x, y, xOffset, yOffset);
        }

        tile.render(this, map2d, x, y, xOffset, yOffset);

        if (tileState === 1) {
          map2d.drawImage(
            this.tileImage,
            0 * 8,
            9 * 8,
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

    this.entities.forEach((entity) =>
      entity.render(map2d, this.tileImage, xOffset, yOffset),
    );

    this.onTopTiles.forEach((tile) => {
      this.renderTile(
        map2d,
        tile.sx,
        tile.sy,
        tile.x,
        tile.y,
        tile.xOffset + xOffset,
        tile.yOffset + yOffset,
      );
    });

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
      this.tiles[x + y * this.width] = Tiles.dirt.id;
    }
  }

  public setTile(x: number, y: number, tile: Tile): void {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    this.tiles[x + y * this.width] = tile.id;
  }

  public setData(x: number, y: number, value: number): void {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    this.data[x + y * this.width] = value;
  }

  public getData(x: number, y: number): number {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return 0;
    return this.data[x + y * this.width] & 0xff;
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
