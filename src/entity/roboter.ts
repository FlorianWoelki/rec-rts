export class Roboter {
  private x: number;
  private y: number;

  private tx: number = 0;
  private ty: number = 12;

  private animation: number = 0;

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
      this.tx * 8,
      this.ty * 8,
      16,
      16,
      this.x * 16 + xOffset,
      this.y * 16 + yOffset,
      16,
      16,
    );
  }

  public update(): void {
    this.animation += 1;
    if (this.animation % 2 === 0) {
      this.tx += 2;
      if (this.tx % 8 === 0) {
        this.tx = 0;
      }
      this.animation = 0;
    }
  }
}
