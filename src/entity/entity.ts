import { Level } from '../level/level';

export abstract class Entity {
  protected x: number;
  protected y: number;

  protected xa: number = 0;
  protected ya: number = 0;
  protected dirX: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public abstract render(
    level: Level,
    map2d: CanvasRenderingContext2D,
    xOffset: number,
    yOffset: number,
  ): void;

  public update(_level: Level): void {}

  public move(level: Level): boolean {
    if (this.xa !== 0 || this.ya !== 0) {
      let stopped = true;
      if (this.xa !== 0 && this.move2(level, this.xa, 0)) stopped = false;
      if (this.ya !== 0 && this.move2(level, 0, this.ya)) stopped = false;
      if (
        this.xa !== 0 &&
        this.ya !== 0 &&
        !this.move3(level, this.xa, this.ya)
      ) {
        this.xa = 0;
        this.ya = 0;
      }
      return !stopped;
    }

    return true;
  }

  public move3(level: Level, xa: number, ya: number): boolean {
    const xt0 = this.x + xa;
    const yt0 = this.y + ya;

    if (
      !level.getTile(
        xa === 1 ? Math.floor(xt0) : Math.round(xt0),
        ya === 1 ? Math.floor(yt0) : Math.round(yt0),
      ).isPassable
    ) {
      return false;
    }
    return true;
  }

  public move2(level: Level, xa: number, ya: number): boolean {
    const xr = 0;
    const yr = 0;

    const xto0 = this.x - xr;
    const yto0 = this.y - yr;
    const xto1 = this.x + xr;
    const yto1 = this.y + yr;

    const xt0 = this.x + xa - xr;
    const yt0 = this.y + ya - yr;
    const xt1 = this.x + xa + xr;
    const yt1 = this.y + ya + yr;
    let blocked = false;
    for (let yt = yt0; yt <= yt1; yt++) {
      for (let xt = xt0; xt <= xt1; xt++) {
        if (xt >= xto0 && xt <= xto1 && yt >= yto0 && yt <= yto1) continue;
        if (!level.getTile(Math.round(xt), Math.round(yt)).isPassable) {
          blocked = true;
          return false;
        }
      }
    }
    if (blocked) return false;

    this.x += xa / 16;
    this.y += ya / 16;
    return true;
  }
}
