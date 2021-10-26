import { Level } from '../level';
import { Tile, TileOutcome } from './tile';

export class Tree extends Tile {
  constructor(id: number) {
    super(id);
    this.isFarmable = true;
    this.isPassable = false;
    this.isOnGrass = true;
    this.color = 0x065f46;
  }

  public render(
    level: Level,
    map2d: CanvasRenderingContext2D,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
  ): void {
    const sx = 2 * 8;
    const sy = 9 * 8;

    const u = level.getTile(x, y - 1).id === this.id;
    const l = level.getTile(x - 1, y).id === this.id;
    const r = level.getTile(x + 1, y).id === this.id;
    const d = level.getTile(x, y + 1).id === this.id;
    const ul = level.getTile(x - 1, y - 1).id === this.id;
    const ur = level.getTile(x + 1, y - 1).id === this.id;
    const dl = level.getTile(x - 1, y + 1).id === this.id;
    const dr = level.getTile(x + 1, y + 1).id === this.id;

    if (!level.onTopTiles.find((tile) => tile.x === x && tile.y === y)) {
      if (u && ul && l) {
        level.onTopTiles.push({
          sx: sx + 2 * 8,
          sy,
          x,
          y,
          xExtraOffset: 0,
          yExtraOffset: 0,
        });
      } else {
        level.onTopTiles.push({
          sx,
          sy,
          x,
          y,
          xExtraOffset: 0,
          yExtraOffset: 0,
        });
      }

      if (u && ur && r) {
        level.onTopTiles.push({
          sx: sx + 2 * 8,
          sy: sy + 1 * 8,
          x,
          y,
          xExtraOffset: 8,
          yExtraOffset: 0,
        });
      } else {
        level.onTopTiles.push({
          sx: sx + 1 * 8,
          sy,
          x,
          y,
          xExtraOffset: 8,
          yExtraOffset: 0,
        });
      }
    }

    if (d && dl && l) {
      level.renderTile(
        map2d,
        sx + 2 * 8,
        sy + 1 * 8,
        x,
        y,
        xOffset,
        yOffset + 8,
      );
    } else {
      level.renderTile(map2d, sx, sy + 1 * 8, x, y, xOffset, yOffset + 8);
    }
    if (d && dr && r) {
      level.renderTile(map2d, sx + 2 * 8, sy, x, y, xOffset + 8, yOffset + 8);
    } else {
      level.renderTile(
        map2d,
        sx + 1 * 8,
        sy + 1 * 8,
        x,
        y,
        xOffset + 8,
        yOffset + 8,
      );
    }
  }

  public getOutcome(): TileOutcome {
    return {
      amount: 3,
      type: 'wood',
    };
  }
}
