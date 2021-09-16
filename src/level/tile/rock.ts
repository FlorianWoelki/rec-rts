import { Level } from '../level';
import { Tile } from './tile';

export class Rock extends Tile {
  constructor(id: number) {
    super(id);
    this.isFarmable = true;
    this.isPassable = false;
  }

  public render(
    level: Level,
    map2d: CanvasRenderingContext2D,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
  ): void {
    const sx = 1 * 8;
    const sy = 7 * 8;

    const u = level.getTile(x, y - 1).id === this.id;
    const d = level.getTile(x, y + 1).id === this.id;
    const l = level.getTile(x - 1, y).id === this.id;
    const r = level.getTile(x + 1, y).id === this.id;
    const ul = level.getTile(x - 1, y - 1).id === this.id;
    const ur = level.getTile(x + 1, y - 1).id === this.id;
    const dl = level.getTile(x - 1, y + 1).id === this.id;
    const dr = level.getTile(x + 1, y + 1).id === this.id;

    if (!u && !l) {
      level.renderTile(map2d, 0, 6 * 8, x, y, xOffset, yOffset);
    } else {
      if (u && l && !ul) {
        level.renderTile(map2d, 4 * 8, 7 * 8, x, y, xOffset, yOffset);
      } else {
        level.renderTile(
          map2d,
          !l ? 0 : sx,
          !u ? 6 * 8 : sy,
          x,
          y,
          xOffset,
          yOffset,
        );
      }
    }

    if (!u && !r) {
      level.renderTile(map2d, 2 * 8, 6 * 8, x, y, xOffset + 8, yOffset);
    } else {
      if (u && r && !ur) {
        level.renderTile(map2d, 3 * 8, 7 * 8, x, y, xOffset + 8, yOffset);
      } else {
        level.renderTile(
          map2d,
          !r ? 2 * 8 : sx,
          !u ? 6 * 8 : sy,
          x,
          y,
          xOffset + 8,
          yOffset,
        );
      }
    }

    if (!d && !l) {
      level.renderTile(map2d, 0, 8 * 8, x, y, xOffset, yOffset + 8);
    } else {
      if (d && l && !dl) {
        level.renderTile(map2d, 4 * 8, 6 * 8, x, y, xOffset, yOffset + 8);
      } else {
        level.renderTile(
          map2d,
          !l ? 0 : sx,
          !d ? 8 * 8 : sy,
          x,
          y,
          xOffset,
          yOffset + 8,
        );
      }
    }

    if (!d && !r) {
      level.renderTile(map2d, 2 * 8, 8 * 8, x, y, xOffset + 8, yOffset + 8);
    } else {
      if (d && r && !dr) {
        level.renderTile(map2d, 3 * 8, 6 * 8, x, y, xOffset + 8, yOffset + 8);
      } else {
        level.renderTile(
          map2d,
          !r ? 2 * 8 : sx,
          !d ? 8 * 8 : sy,
          x,
          y,
          xOffset + 8,
          yOffset + 8,
        );
      }
    }

    /*if (u && !l && ul) {
      level.renderTile(map2d, 4 * 8, 6 * 8, x, y, xOffset, yOffset - 8);
    }

    if (u && !r && ur) {
      level.renderTile(map2d, 3 * 8, 6 * 8, x, y, xOffset + 8, yOffset - 8);
    }*/
  }
}
