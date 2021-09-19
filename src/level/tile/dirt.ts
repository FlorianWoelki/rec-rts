import { Level } from '../level';
import { Tile } from './tile';

export class Dirt extends Tile {
  public render(
    level: Level,
    map2d: CanvasRenderingContext2D,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
  ): void {}
}
