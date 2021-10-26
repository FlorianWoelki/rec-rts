import { Level } from '../level';
import { Building } from './Building';

export class Tent extends Building {
  public render(
    level: Level,
    map2d: CanvasRenderingContext2D,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
  ): void {
    const sx = 5;
    const sy = 8;
    const xo = 0.75;
    const yo = 1;

    if (
      !level.onTopTiles.find((tile) => tile.x === x - xo && tile.y === y - yo)
    ) {
      for (let yy = 0; yy < 2; yy++) {
        for (let xx = 0; xx < 5; xx++) {
          level.onTopTiles.push({
            sx: (sx + xx) * 8,
            sy: (sy + yy) * 8,
            x: x - xo,
            y: y - yo,
            xExtraOffset: xx * 8,
            yExtraOffset: yy * 8,
            dw: 8,
            dh: 8,
          });
        }
      }
    }

    for (let yy = 2; yy < 4; yy++) {
      for (let xx = 0; xx < 5; xx++) {
        level.renderTile(
          map2d,
          (sx + xx) * 8,
          (sy + yy) * 8,
          x - xo,
          y - yo,
          xOffset + xx * 8,
          yOffset + yy * 8,
          8,
          8,
        );
      }
    }
  }
}
