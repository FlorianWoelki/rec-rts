import { createAndValidateWorld } from './generator/level-generator';
import { Grass } from './tile/grass';
import { Sand } from './tile/sand';
import { Tree } from './tile/tree';
import { Water } from './tile/water';

interface LevelTile {
  visible: number;
  owned: boolean;
  tileId: number;
}

export const Tiles = {
  water: new Water(0),
  grass: new Grass(1),
  sand: new Sand(2),
  tree: new Tree(3),
};

export class Level {
  public tiles: LevelTile[];

  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.tiles = new Array(width * height);

    this.init();
  }

  private init(): void {
    const map = createAndValidateWorld(this.width, this.height);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.tiles[x + y * this.height] = {
          visible: 0,
          owned: false,
          tileId: map[0][x + y * this.height],
        };
      }
    }
  }
}
