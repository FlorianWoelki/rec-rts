import { Level } from '../level';
import { Tile } from './tile';

export class Water extends Tile {
  private position1: number = 0;
  private position2: number = 0;
  private position3: number = 0;
  private position4: number = 0;
  private shouldAnimate: boolean = true;

  constructor(id: number) {
    super(id);
    this.isPassable = false;
    this.color = 0x3b82f6;
  }

  public render(
    level: Level,
    map2d: CanvasRenderingContext2D,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
  ): void {
    if (this.shouldAnimate) {
      this.position1 = Math.round(3 + Math.random() * (6 - 3));
      this.position2 = Math.round(3 + Math.random() * (6 - 3));
      this.position3 = Math.round(3 + Math.random() * (6 - 3));
      this.position4 = Math.round(3 + Math.random() * (6 - 3));
      this.shouldAnimate = false;
    }

    const sx = 1 * 8;
    const sy = 1 * 8;

    const u = level.getTile(x, y - 1).id === this.id;
    const d = level.getTile(x, y + 1).id === this.id;
    const l = level.getTile(x - 1, y).id === this.id;
    const r = level.getTile(x + 1, y).id === this.id;
    const ul = level.getTile(x - 1, y - 1).id === this.id;
    const ur = level.getTile(x + 1, y - 1).id === this.id;

    if (!u && !l) {
      level.renderTile(map2d, 0, 0, x, y, xOffset, yOffset);
    } else {
      if (u && l && !ul) {
        level.renderTile(map2d, 4 * 8, 1 * 8, x, y, xOffset, yOffset);
      } else if (u && l) {
        level.renderTile(
          map2d,
          this.position1 * 8,
          2 * 8,
          x,
          y,
          xOffset,
          yOffset,
        );
      } else {
        level.renderTile(
          map2d,
          !l ? 0 : sx,
          !u ? 0 : sy,
          x,
          y,
          xOffset,
          yOffset,
        );
      }
    }

    if (!u && !r) {
      level.renderTile(map2d, 2 * 8, 0, x, y, xOffset + 8, yOffset);
    } else {
      if (u && r && !ur) {
        level.renderTile(map2d, 3 * 8, 1 * 8, x, y, xOffset + 8, yOffset);
      } else if (u && r) {
        level.renderTile(
          map2d,
          this.position2 * 8,
          2 * 8,
          x,
          y,
          xOffset + 8,
          yOffset,
        );
      } else {
        level.renderTile(
          map2d,
          !r ? 2 * 8 : sx,
          !u ? 0 : sy,
          x,
          y,
          xOffset + 8,
          yOffset,
        );
      }
    }

    if (!d && !l) {
      level.renderTile(map2d, 0, 2 * 8, x, y, xOffset, yOffset + 8);
    } else if (d && l) {
      level.renderTile(
        map2d,
        this.position3 * 8,
        2 * 8,
        x,
        y,
        xOffset,
        yOffset + 8,
      );
    } else {
      level.renderTile(
        map2d,
        !l ? 0 : sx,
        !d ? 2 * 8 : sy,
        x,
        y,
        xOffset,
        yOffset + 8,
      );
    }

    if (!d && !r) {
      level.renderTile(map2d, 2 * 8, 2 * 8, x, y, xOffset + 8, yOffset + 8);
    } else if (d && r) {
      level.renderTile(
        map2d,
        this.position4 * 8,
        2 * 8,
        x,
        y,
        xOffset + 8,
        yOffset + 8,
      );
    } else {
      level.renderTile(
        map2d,
        !r ? 2 * 8 : sx,
        !d ? 2 * 8 : sy,
        x,
        y,
        xOffset + 8,
        yOffset + 8,
      );
    }

    if (u && !l && ul) {
      level.renderTile(map2d, 4 * 8, 0, x, y, xOffset, yOffset - 8);
    }

    if (u && !r && ur) {
      level.renderTile(map2d, 3 * 8, 0, x, y, xOffset + 8, yOffset - 8);
    }
  }

  public update(level: Level, _xt: number, _yt: number): void {
    if (level.tickCount % 10 === 0) {
      this.shouldAnimate = true;
    }
  }
}
