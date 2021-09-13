import { Level } from '../level';
import { Tile } from './tile';

export class Tree extends Tile {
  public render(
    level: Level,
    map2d: CanvasRenderingContext2D,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
  ): void {
    const sx = 2 * 8;
    const sy = 6 * 8;
    level.renderTile(map2d, 1 * 8, 4 * 8, x, y, xOffset, yOffset);
    level.renderTile(map2d, 1 * 8, 4 * 8, x, y, xOffset + 8, yOffset);
    level.renderTile(map2d, 1 * 8, 4 * 8, x, y, xOffset, yOffset + 8);
    level.renderTile(map2d, 1 * 8, 4 * 8, x, y, xOffset + 8, yOffset + 8);

    level.renderTile(map2d, sx, sy, x, y, xOffset, yOffset);
    level.renderTile(map2d, sx + 8, sy, x, y, xOffset + 8, yOffset);
    level.renderTile(map2d, sx, sy + 8, x, y, xOffset, yOffset + 8);
    level.renderTile(map2d, sx + 8, sy + 8, x, y, xOffset + 8, yOffset + 8);
  }
}
