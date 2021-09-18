import { Level } from '../level';
import { Tile } from './tile';

export class Flower extends Tile {
  constructor(id: number) {
    super(id);
    this.isOnGrass = true;
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
    const sy = 0 * 8;
    level.renderTile(map2d, sx, sy, x, y, xOffset + 4, yOffset + 4);
  }
}
