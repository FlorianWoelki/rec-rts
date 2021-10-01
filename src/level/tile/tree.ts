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

    if (!level.onTopTiles.find((tile) => tile.x === x && tile.y === y)) {
      level.onTopTiles.push({ sx, sy, x, y, xOffset: 0, yOffset: 0 });
      level.onTopTiles.push({
        sx: sx + 8,
        sy,
        x,
        y,
        xOffset: 8,
        yOffset: 0,
      });
    }
    //level.renderTile(map2d, sx, sy, x, y, xOffset, yOffset);
    //level.renderTile(map2d, sx + 8, sy, x, y, xOffset + 8, yOffset);
    level.renderTile(map2d, sx, sy + 8, x, y, xOffset, yOffset + 8);
    level.renderTile(map2d, sx + 8, sy + 8, x, y, xOffset + 8, yOffset + 8);
  }

  public getOutcome(): TileOutcome {
    return {
      amount: 3,
      type: 'wood',
    };
  }
}
