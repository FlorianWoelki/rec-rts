import { Level } from '../level';

export abstract class Tile {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  public abstract render(
    level: Level,
    map2d: CanvasRenderingContext2D,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
  ): void;
}
