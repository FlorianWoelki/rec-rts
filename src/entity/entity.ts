import { Level } from '../level/level';

export const EntityID = {
  human: 0,
  pig: 1,
  troll: 2,
};

export abstract class Entity {
  protected id: number;
  protected x: number;
  protected y: number;

  public xa: number = 0;
  public ya: number = 0;
  protected dirX: number = 0;

  public isDead: boolean = false;
  protected isPlayingDeadAnimation: boolean = false;

  public isControlled = false;

  constructor(id: number, x: number, y: number) {
    this.id = id;
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
    if (
      !level.getTile(
        Math.round((this.x * 16 + 8 * xa) / 16),
        Math.round((this.y * 16 + 8 * ya) / 16),
      ).isPassable
    ) {
      return false;
    }

    this.x += xa / 16;
    this.y += ya / 16;
    return true;
  }

  public getID(): number {
    return this.id;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }
}
