import { Level } from '../level';

export enum TileOutcomeType {
  WOOD,
}

export interface TileOutcome {
  amount: number;
  type: TileOutcomeType;
}

export abstract class Tile {
  public id: number;
  public isFarmable: boolean = false;
  public isPassable: boolean = true;

  constructor(id: number) {
    this.id = id;
  }

  public abstract render(
    level: Level,
    map2d: CanvasRenderingContext2D,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
  ): void;

  public getOutcome(): TileOutcome | undefined {
    return undefined;
  }
}