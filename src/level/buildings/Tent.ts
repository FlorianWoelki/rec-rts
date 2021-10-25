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

    for (let yy = 0; yy < 3; yy++) {
      for (let xx = 0; xx < 3; xx++) {
        if (yy === 0 || yy === 1) {
          level.onTopTiles.push({
            sx: (sx + xx) * 8,
            sy: (sy + yy) * 8,
            x: x - 1,
            y: y - 2,
            xExtraOffset: xx * 16,
            yExtraOffset: yy * 16,
            dw: 16,
            dh: 16,
          });
        } else {
          level.renderTile(
            map2d,
            (sx + xx) * 8,
            (sy + yy) * 8,
            x - 1,
            y - 2,
            xOffset + xx * 16,
            yOffset + yy * 16,
            16,
            16,
          );
        }
      }
    }
  }
}
