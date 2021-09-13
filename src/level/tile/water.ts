import { Level } from '../level';
import { Tile } from './tile';

export class Water extends Tile {
  public render(
    level: Level,
    map2d: CanvasRenderingContext2D,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
  ): void {
    const sx = 1 * 8;
    const sy = 1 * 8;
    level.renderTile(map2d, sx, sy, x, y, xOffset, yOffset);
    level.renderTile(map2d, sx, sy, x, y, xOffset + 8, yOffset);
    level.renderTile(map2d, sx, sy, x, y, xOffset, yOffset + 8);
    level.renderTile(map2d, sx, sy, x, y, xOffset + 8, yOffset + 8);
    /*for (var i = 0; i < 4; i++) {
          var xSide = (i % 2) * 2 - 1;
          var ySide = (i >> 1) * 2 - 1;

          var t_u = level.getTile(x, y + ySide).id !== tile.id;
          var t_l = level.getTile(x + xSide, y).id !== tile.id;
          var t_ul = level.getTile(x + xSide, y + ySide).id !== tile.id;

          var xt = 1;
          var yt = 1 + tile.id * 3;

          if (t_u) yt += ySide;
          if (t_l) xt += xSide;
          if (!t_u && !t_l && t_ul) {
            xt += 3 - (i % 2);
            yt -= i >> 1;
          }

          map2d.drawImage(
            tileImage,
            xt * 8,
            yt * 8,
            8,
            8,
            x * tileSize + xOffset + (i % 2) * 8,
            y * tileSize + yOffset + (i >> 1) * 8,
            8,
            8,
          );
        }*/
  }
}
