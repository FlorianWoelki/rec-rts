export class Roboter {
  private x: number;
  private y: number;

  private tx: number = 0;
  private maxTx: number = 8;
  private ty: number = 12;

  private movingTx: number = 8;
  private maxMovingTx: number = 24;

  private xspeed: number = 0;
  private yspeed: number = 0;

  private xa: number = 0;
  private ya: number = 0;

  private moving: boolean = true;
  private animation: number = 0;

  private dir: number = 0;

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
      this.ty * 8 + this.dir * 16,
      16,
      16,
      this.x * 16 + xOffset + this.xa,
      this.y * 16 + yOffset + this.ya,
      16,
      16,
    );
  }

  public update(): void {
    this.xa += this.xspeed;
    this.ya += this.yspeed;

    if (this.xspeed === 1 || this.yspeed === 1) {
      this.dir = 0;
      this.moving = true;
    } else if (this.xspeed === -1 || this.yspeed === -1) {
      this.dir = 1;
      this.moving = true;
    } else {
      this.dir = 0;
      this.moving = false;
    }

    if (Math.floor(Math.random() * 50) === 0) {
      this.xspeed = Math.floor(Math.random() * 3) - 1;
      this.yspeed = Math.floor(Math.random() * 3) - 1;
    }

    this.animation += 1;
    if (this.animation % 2 === 0) {
      this.animation = 0;
      if (!this.moving) {
        this.tx += 2;
        if (this.tx % this.maxTx === 0) {
          this.tx = 0;
        }
      } else {
        this.movingTx += 2;
        if (this.movingTx % this.maxMovingTx === 0) {
          this.movingTx = 8;
        }
      }
    }
  }
}
