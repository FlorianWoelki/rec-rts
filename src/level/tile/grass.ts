import { Level, Tiles } from '../level';
import { Tile } from './tile';

export class Grass extends Tile {
  constructor(id: number) {
    super(id);
    this.color = 0x10b981;
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
    const sy = 4 * 8;

    const u =
      level.getTile(x, y - 1).id === this.id ||
      level.getTile(x, y - 1).id === Tiles.tree.id ||
      level.getTile(x, y - 1).id === Tiles.flower.id;
    const d =
      level.getTile(x, y + 1).id === this.id ||
      level.getTile(x, y + 1).id === Tiles.tree.id ||
      level.getTile(x, y + 1).id === Tiles.flower.id;
    const l =
      level.getTile(x - 1, y).id === this.id ||
      level.getTile(x - 1, y).id === Tiles.tree.id ||
      level.getTile(x - 1, y).id === Tiles.flower.id;
    const r =
      level.getTile(x + 1, y).id === this.id ||
      level.getTile(x + 1, y).id === Tiles.tree.id ||
      level.getTile(x + 1, y).id === Tiles.flower.id;
    const ul =
      level.getTile(x - 1, y - 1).id === this.id ||
      level.getTile(x - 1, y - 1).id === Tiles.tree.id ||
      level.getTile(x - 1, y - 1).id === Tiles.flower.id;
    const ur =
      level.getTile(x + 1, y - 1).id === this.id ||
      level.getTile(x + 1, y - 1).id === Tiles.tree.id ||
      level.getTile(x + 1, y - 1).id === Tiles.flower.id;
    const dl =
      level.getTile(x - 1, y + 1).id === this.id ||
      level.getTile(x - 1, y + 1).id === Tiles.tree.id ||
      level.getTile(x - 1, y + 1).id === Tiles.flower.id;
    const dr =
      level.getTile(x + 1, y + 1).id === this.id ||
      level.getTile(x + 1, y + 1).id === Tiles.tree.id ||
      level.getTile(x + 1, y + 1).id === Tiles.flower.id;

    if (!u && !l) {
      level.renderTile(map2d, 0, 3 * 8, x, y, xOffset, yOffset);
    } else {
      if (u && l && !ul) {
        level.renderTile(map2d, 4 * 8, 4 * 8, x, y, xOffset, yOffset);
      } else {
        level.renderTile(
          map2d,
          !l ? 0 : sx,
          !u ? 3 * 8 : sy,
          x,
          y,
          xOffset,
          yOffset,
        );
      }
    }

    if (!u && !r) {
      level.renderTile(map2d, 2 * 8, 3 * 8, x, y, xOffset + 8, yOffset);
    } else {
      if (u && r && !ur) {
        level.renderTile(map2d, 3 * 8, 4 * 8, x, y, xOffset + 8, yOffset);
      } else {
        level.renderTile(
          map2d,
          !r ? 2 * 8 : sx,
          !u ? 3 * 8 : sy,
          x,
          y,
          xOffset + 8,
          yOffset,
        );
      }
    }

    if (!d && !l) {
      level.renderTile(map2d, 0, 5 * 8, x, y, xOffset, yOffset + 8);
    } else {
      if (d && l && !dl) {
        level.renderTile(map2d, 4 * 8, 3 * 8, x, y, xOffset, yOffset + 8);
      } else {
        level.renderTile(
          map2d,
          !l ? 0 : sx,
          !d ? 5 * 8 : sy,
          x,
          y,
          xOffset,
          yOffset + 8,
        );
      }
    }

    if (!d && !r) {
      level.renderTile(map2d, 2 * 8, 5 * 8, x, y, xOffset + 8, yOffset + 8);
    } else {
      if (d && r && !dr) {
        level.renderTile(map2d, 3 * 8, 3 * 8, x, y, xOffset + 8, yOffset + 8);
      } else {
        level.renderTile(
          map2d,
          !r ? 2 * 8 : sx,
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
