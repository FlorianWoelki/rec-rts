import { Level } from '../level/level';
import { Entity, EntityID } from './entity';

export class Human extends Entity {
  private tx: number = 0;
  private maxTx: number = 4;
  private ty: number = 12;

  private movingTx: number = 4;
  private maxMovingTx: number = 10;

  private moving: boolean = true;
  private animation: number = 0;
  private movingAnimation: number = 0;

  private deadAnimationTx: number = 8;
  private maxDeadAnimationTx: number = 14;
  private deadAnimation: number = 0;

  private isPunching: boolean = false;
  private punchTx: number = 16;
  private maxPunchAnimationTx: number = 22;
  private punchAnimation: number = 0;

  constructor(x: number, y: number) {
    super(EntityID.human, x, y);
  }

  public render(
    level: Level,
    map2d: CanvasRenderingContext2D,
    xOffset: number,
    yOffset: number,
  ): void {
    if (this.isPunching) {
      level.renderEntity(
        map2d,
        this.punchTx * 8,
        this.dirX === 1 ? (this.ty + 2) * 8 : this.ty * 8,
        this.x,
        this.y,
        xOffset,
        yOffset,
      );
    } else if (this.isPlayingDeadAnimation || this.isDead) {
      level.renderEntity(
        map2d,
        this.deadAnimationTx * 8,
        this.dirX === 1 ? (this.ty + 2) * 8 : this.ty * 8,
        this.x,
        this.y,
        xOffset,
        yOffset,
      );
    } else {
      level.renderEntity(
        map2d,
        this.moving ? this.movingTx * 8 : this.tx * 8,
        this.xa === -1 || this.dirX === 1 ? (this.ty + 2) * 8 : this.ty * 8,
        this.x,
        this.y,
        xOffset,
        yOffset,
      );
    }
  }

  public update(level: Level): void {
    if (this.isPunching) {
      this.punchAnimation += 1;
      if (this.punchAnimation % 2 === 0) {
        this.punchAnimation = 0;
        this.punchTx += 2;
        if (this.punchTx === this.maxPunchAnimationTx) {
          this.punchTx = 16;
          this.isPunching = false;
        }
      }
      return;
    }

    if (this.isPlayingDeadAnimation) {
      this.playDeadAnimation();
      return;
    }

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
      if (!this.isControlled) {
        if (Math.floor(Math.random() * 20) === 0) {
          this.xa = Math.floor(Math.random() * 3) - 1;
          this.ya = Math.floor(Math.random() * 3) - 1;
        }
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

  private playDeadAnimation(): void {
    if (this.isDead) return;

    this.deadAnimation += 1;

    if (this.deadAnimation % 2 === 0) {
      this.deadAnimation = 0;
      this.deadAnimationTx += 2;
      if (this.deadAnimationTx === this.maxDeadAnimationTx) {
        this.isDead = true;
      }
    }
  }
}
