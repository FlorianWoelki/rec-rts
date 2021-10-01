import { Level } from '../level/level';

export class Human {
  private x: number;
  private y: number;

  private tx: number = 0;
  private maxTx: number = 4;
  private ty: number = 12;

  private movingTx: number = 4;
  private maxMovingTx: number = 10;

  private xa: number = 0;
  private ya: number = 0;
  private dirX: number = 0;

  private moving: boolean = true;
  private animation: number = 0;
  private movingAnimation: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public render(
    map2d: CanvasRenderingContext2D,
    tileImage: HTMLImageElement,
    xOffset: number,
    yOffset: number,
  ): void {
    map2d.drawImage(
      tileImage,
      this.moving ? this.movingTx * 8 : this.tx * 8,
      this.xa === -1 || this.dirX === 1 ? (this.ty + 2) * 8 : this.ty * 8,
      16,
      16,
      this.x * 16 + xOffset,
      this.y * 16 + yOffset,
      16,
      16,
    );
  }

  public update(level: Level): void {
    if (this.xa === 1 || this.ya === 1) {
      this.moving = true;
      this.dirX = 0;
    } else if (this.xa === -1 || this.ya === -1) {
      this.moving = true;
      this.dirX = 1;
    } else {
      this.moving = false;
    }

    if (this.move(level)) {
      if (Math.floor(Math.random() * 20) === 0) {
        this.xa = Math.floor(Math.random() * 3) - 1;
        this.ya = Math.floor(Math.random() * 3) - 1;
      }
    } else {
      this.xa = 0;
      this.ya = 0;
    }

    this.animation += 1;
    this.movingAnimation += 1;

    if (this.animation % 5 === 0 && !this.moving) {
      this.animation = 0;
      this.tx += 2;
      if (this.tx % this.maxTx === 0) {
        this.tx = 0;
      }
    }

    if (this.movingAnimation % 2 === 0 && this.moving) {
      this.movingAnimation = 0;
      this.movingTx += 2;
      if (this.movingTx % this.maxMovingTx === 0) {
        this.movingTx = 4;
      }
    }
  }

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
