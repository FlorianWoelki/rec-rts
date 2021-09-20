import { Level } from '../level';
import { Tile } from './tile';

export class Cactus extends Tile {
  constructor(id: number) {
    super(id);
    this.isOnSand = true;
    this.color = 0xfbbf24;
  }

  public render(
    level: Level,
    map2d: CanvasRenderingContext2D,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
  ): void {
    const sx = 7 * 8;
    const sy = 0 * 8;
    level.renderTile(map2d, sx, sy, x, y, xOffset, yOffset);
    level.renderTile(map2d, sx + 8, sy, x, y, xOffset + 8, yOffset);
    level.renderTile(map2d, sx, sy + 8, x, y, xOffset, yOffset + 8);
    level.renderTile(map2d, sx + 8, sy + 8, x, y, xOffset + 8, yOffset + 8);
  }
}
