import { Level } from '../level';
import { Tile } from './tile';

export class Dirt extends Tile {
  constructor(id: number) {
    super(id);
    this.color = 0x78350f;
  }

  public render(
    level: Level,
    map2d: CanvasRenderingContext2D,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
  ): void {
    const sx = 6 * 8;
    const sy = 4 * 8;

    const u = level.getTile(x, y - 1).id === this.id;
    const d = level.getTile(x, y + 1).id === this.id;
    const l = level.getTile(x - 1, y).id === this.id;
    const r = level.getTile(x + 1, y).id === this.id;
    const ul = level.getTile(x - 1, y - 1).id === this.id;
    const ur = level.getTile(x + 1, y - 1).id === this.id;
    const dl = level.getTile(x - 1, y + 1).id === this.id;
    const dr = level.getTile(x + 1, y + 1).id === this.id;

    if (!u && !l) {
      level.renderTile(map2d, 5 * 8, 3 * 8, x, y, xOffset, yOffset);
    } else {
      if (u && l && !ul) {
        level.renderTile(map2d, 9 * 8, 4 * 8, x, y, xOffset, yOffset);
      } else {
        level.renderTile(
          map2d,
          !l ? 5 * 8 : sx,
          !u ? 3 * 8 : sy,
          x,
          y,
          xOffset,
          yOffset,
        );
      }
    }

    if (!u && !r) {
      level.renderTile(map2d, 7 * 8, 3 * 8, x, y, xOffset + 8, yOffset);
    } else {
      if (u && r && !ur) {
        level.renderTile(map2d, 8 * 8, 4 * 8, x, y, xOffset + 8, yOffset);
      } else {
        level.renderTile(
          map2d,
          !r ? 7 * 8 : sx,
          !u ? 3 * 8 : sy,
          x,
          y,
          xOffset + 8,
          yOffset,
        );
      }
    }

    if (!d && !l) {
      level.renderTile(map2d, 5 * 8, 5 * 8, x, y, xOffset, yOffset + 8);
    } else {
      if (d && l && !dl) {
        level.renderTile(map2d, 9 * 8, 3 * 8, x, y, xOffset, yOffset + 8);
      } else {
        level.renderTile(
          map2d,
          !l ? 5 * 8 : sx,
          !d ? 5 * 8 : sy,
          x,
          y,
          xOffset,
          yOffset + 8,
        );
      }
    }

    if (!d && !r) {
      level.renderTile(map2d, 7 * 8, 5 * 8, x, y, xOffset + 8, yOffset + 8);
    } else {
      if (d && r && !dr) {
        level.renderTile(map2d, 8 * 8, 3 * 8, x, y, xOffset + 8, yOffset + 8);
      } else {
        level.renderTile(
          map2d,
          !r ? 7 * 8 : sx,
          !d ? 5 * 8 : sy,
          x,
          y,
          xOffset + 8,
          yOffset + 8,
        );
      }
    }
  }
}
