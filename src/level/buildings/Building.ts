import { Level } from '../level';

export abstract class Building {
  protected id: number;

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

  public update(_level: Level, _xt: number, _yt: number): void {}
}
