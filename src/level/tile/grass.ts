import { Level } from '../level';
import { Tile } from './tile';

export class Grass extends Tile {
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
    level.renderTile(map2d, sx, sy, x, y, xOffset, yOffset);
    level.renderTile(map2d, sx, sy, x, y, xOffset + 8, yOffset);
    level.renderTile(map2d, sx, sy, x, y, xOffset, yOffset + 8);
    level.renderTile(map2d, sx, sy, x, y, xOffset + 8, yOffset + 8);
  }
}
