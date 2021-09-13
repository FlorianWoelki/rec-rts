import { Level } from '../level';

export abstract class Tile {
  public id: number;

  public isOwned: boolean = false;
  public visible: number = 0;

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
