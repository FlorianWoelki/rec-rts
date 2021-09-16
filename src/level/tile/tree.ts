import { Level, Tiles } from '../level';
import { Tile } from './tile';

export class Tree extends Tile {
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
    const grassSx = 1 * 8;
    const grassSy = 4 * 8;

    const u =
      level.getTile(x, y - 1).id === Tiles.water.id ||
      level.getTile(x, y - 1).id === Tiles.sand.id;
    const d =
      level.getTile(x, y + 1).id === Tiles.water.id ||
      level.getTile(x, y + 1).id === Tiles.sand.id;
    const l =
      level.getTile(x - 1, y).id === Tiles.water.id ||
      level.getTile(x - 1, y).id === Tiles.sand.id;
    const r =
      level.getTile(x + 1, y).id === Tiles.water.id ||
      level.getTile(x + 1, y).id === Tiles.sand.id;

    if (u && l) {
      level.renderTile(map2d, 0, 3 * 8, x, y, xOffset, yOffset);
    } else {
      level.renderTile(
        map2d,
        l ? 0 : grassSx,
        u ? 3 * 8 : grassSy,
        x,
        y,
        xOffset,
        yOffset,
      );
    }

    if (u && r) {
      level.renderTile(map2d, 2 * 8, 3 * 8, x, y, xOffset + 8, yOffset);
    } else {
      level.renderTile(
        map2d,
        r ? 2 * 8 : grassSx,
        u ? 3 * 8 : grassSy,
        x,
        y,
        xOffset + 8,
        yOffset,
      );
    }

    if (d && l) {
      level.renderTile(map2d, 0, 5 * 8, x, y, xOffset, yOffset + 8);
    } else {
      level.renderTile(
        map2d,
        l ? 0 : grassSx,
        d ? 5 * 8 : grassSy,
        x,
        y,
        xOffset,
        yOffset + 8,
      );
    }

    if (d && r) {
      level.renderTile(map2d, 2 * 8, 5 * 8, x, y, xOffset + 8, yOffset + 8);
    } else {
      level.renderTile(
        map2d,
        r ? 2 * 8 : grassSx,
        d ? 5 * 8 : grassSy,
        x,
        y,
        xOffset + 8,
        yOffset + 8,
      );
    }

    const sx = 2 * 8;
    const sy = 6 * 8;
    level.renderTile(map2d, sx, sy, x, y, xOffset, yOffset);
    level.renderTile(map2d, sx + 8, sy, x, y, xOffset + 8, yOffset);
    level.renderTile(map2d, sx, sy + 8, x, y, xOffset, yOffset + 8);
    level.renderTile(map2d, sx + 8, sy + 8, x, y, xOffset + 8, yOffset + 8);
  }

  public getOutcome(): number {
    return 3;
  }
}
