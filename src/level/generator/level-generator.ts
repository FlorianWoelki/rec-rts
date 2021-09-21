import { Tiles } from '../level';

Math.seed = (s: number): (() => number) => {
  const mask = 0xffffffff;
  let m_w = (123456789 + s) & mask;
  let m_z = (987654321 - s) & mask;

  return () => {
    m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

    let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
  };
};

let random: () => number = Math.seed(
  Math.random() * (10 + Math.random() * (100 - 10)),
);

export class LevelGen {
  public w: number;
  public h: number;
  public values: number[];

  constructor(w: number, h: number, featureSize: number) {
    this.w = w;
    this.h = h;
    this.values = new Array(w * h);

    for (let y = 0; y < h; y += featureSize) {
      for (let x = 0; x < w; x += featureSize) {
        this.setSample(x, y, random() * 2 - 1);
      }
    }

    let stepSize = featureSize;
    let scale = 1.0 / w;
    let scaleMod = 1;
    do {
      const halfStep = stepSize / 2;
      for (let y = 0; y < h; y += stepSize) {
        for (let x = 0; x < w; x += stepSize) {
          const a = this.sample(x, y);
          const b = this.sample(x + stepSize, y);
          const c = this.sample(x, y + stepSize);
          const d = this.sample(x + stepSize, y + stepSize);

          const e =
            (a + b + c + d) / 4.0 + (random() * 2 - 1) * stepSize * scale;
          this.setSample(x + halfStep, y + halfStep, e);
        }
      }

      for (let y = 0; y < w; y += stepSize) {
        for (let x = 0; x < w; x += stepSize) {
          const a = this.sample(x, y);
          const b = this.sample(x + stepSize, y);
          const c = this.sample(x, y + stepSize);
          const d = this.sample(x + halfStep, y + halfStep);
          const e = this.sample(x + halfStep, y - halfStep);
          const f = this.sample(x - halfStep, y + halfStep);

          const H =
            (a + b + d + e) / 4.0 + (random() * 2 - 1) * stepSize * scale * 0.5;
          const g =
            (a + c + d + f) / 4.0 + (random() * 2 - 1) * stepSize * scale * 0.5;
          this.setSample(x + halfStep, y, H);
          this.setSample(x, y + halfStep, g);
        }
      }
      stepSize /= 2;
      scale *= scaleMod + 0.8;
      scaleMod *= 0.3;
    } while (stepSize > 1);
  }

  sample(x: number, y: number) {
    return this.values[(x & (this.w - 1)) + (y & (this.h - 1)) * this.w];
  }

  setSample(x: number, y: number, value: number) {
    this.values[(x & (this.w - 1)) + (y & (this.h - 1)) * this.w] = value;
  }
}

export const createAndValidateWorld = (
  w: number,
  h: number,
  seed: number = Math.random() * Number.MAX_SAFE_INTEGER,
) => {
  do {
    const result = createMap(w, h, seed);
    const count: number[] = new Array(256);

    for (let i = 0; i < w * h; i++) {
      count[result[0][i] & 0xff]++;
    }

    if (count[Tiles.rock.id & 0xff] < 100) continue;
    if (count[Tiles.sand.id & 0xff] < 100) continue;
    if (count[Tiles.grass.id & 0xff] < 100) continue;
    if (count[Tiles.tree.id & 0xff] < 100) continue;

    return result;
  } while (true);
};

export const createMap = (
  w: number,
  h: number,
  seed: number = Math.random() * Number.MAX_SAFE_INTEGER,
) => {
  random = Math.seed(seed);

  const mnoise1 = new LevelGen(w, h, 16);
  const mnoise2 = new LevelGen(w, h, 16);
  const mnoise3 = new LevelGen(w, h, 16);

  const noise1 = new LevelGen(w, h, 32);
  const noise2 = new LevelGen(w, h, 32);

  const map: number[] = new Array(w * h);
  const data: number[] = new Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = x + y * w;

      let val = Math.abs(noise1.values[i] - noise2.values[i]) * 3 - 2;
      let mval = Math.abs(mnoise1.values[i] - mnoise2.values[i]);
      mval = Math.abs(mval - mnoise3.values[i]) * 3 - 2;

      let xd = (x / (w - 1.0)) * 2 - 1;
      let yd = (y / (h - 1.0)) * 2 - 1;
      if (xd < 0) xd = -xd;
      if (yd < 0) yd = -yd;
      let dist = xd >= yd ? xd : yd;
      dist = dist * dist * dist * dist;
      dist = dist * dist * dist * dist;
      val = val + 1 - dist * 20;

      if (val < -0.5) {
        map[i] = Tiles.water.id;
      } else if (val > 0.5 && mval < -1.5) {
        map[i] = Tiles.rock.id;
      } else {
        map[i] = Tiles.grass.id;
      }
    }
  }

  for (let i = 0; i < (w * h) / 2800; i++) {
    let xs = Math.round(random() * w);
    let ys = Math.round(random() * h);
    for (let k = 0; k < 10; k++) {
      let x = xs + Math.round(random() * 21 - 10);
      let y = ys + Math.round(random() * 21 - 10);
      for (let j = 0; j < 100; j++) {
        let xo = x + Math.round(random() * 5) - Math.round(random() * 5);
        let yo = y + Math.round(random() * 5) - Math.round(random() * 5);
        for (let yy = yo - 1; yy <= yo + 1; yy++) {
          for (let xx = xo - 1; xx <= xo + 1; xx++) {
            if (xx >= 0 && yy >= 0 && xx < w && yy < h) {
              if (map[xx + yy * w] == 1) {
                map[xx + yy * w] = Tiles.sand.id;
              }
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < (w * h) / 400; i++) {
    const x = Math.round(random() * w);
    const y = Math.round(random() * h);
    for (let j = 0; j < 200; j++) {
      const xx = x + Math.round(random() * 15) - Math.round(random() * 15);
      const yy = y + Math.round(random() * 15) - Math.round(random() * 15);
      if (xx >= 0 && yy >= 0 && xx < w && yy < h) {
        if (map[xx + yy * w] == Tiles.grass.id) {
          map[xx + yy * w] = Tiles.tree.id;
        }
      }
    }
  }

  for (let i = 0; i < (w * h) / 40; i++) {
    const xx = Math.round(random() * w);
    const yy = Math.round(random() * h);
    if (xx >= 0 && yy >= 0 && xx < w && yy << h) {
      if (map[xx + yy * w] === Tiles.sand.id) {
        map[xx + yy * w] = Tiles.cactus.id;
      }
    }
  }

  /*for (let i = 0; i < (w * h) / 2800; i++) {
    const xs = Math.round(random() * w);
    const ys = Math.round(random() * h);
    for (let k = 0; k < 10; k++) {
      const x = xs + Math.round(random() * 21 - 10);
      const y = ys + Math.round(random() * 21 - 10);
      for (let j = 0; j < 100; j++) {
        const xo = x + Math.round(random() * 5 - random() * 5);
        const yo = y + Math.round(random() * 5 - random() * 5);
        for (let yy = yo - 1; yy <= yo + 1; yy++) {
          for (let xx = xo - 1; xx <= xo + 1; xx++) {
            if (xx >= 0 && yy >= 0 && xx < w && yy < h) {
              if (map[xx + yy * w] === Tiles.grass.id) {
                map[xx + yy * w] = Tiles.dirt.id;
              }
            }
          }
        }
      }
    }
  }*/

  for (let i = 0; i < (w * h) / 400; i++) {
    const x = Math.round(random() * w);
    const y = Math.round(random() * h);
    for (let j = 0; j < 30; j++) {
      const xx = x + Math.round(random() * 5) - Math.round(random() * 5);
      const yy = y + Math.round(random() * 5) - Math.round(random() * 5);
      if (xx >= 0 && yy >= 0 && xx < w && yy < h) {
        if (map[xx + yy * w] == Tiles.grass.id) {
          map[xx + yy * w] = Tiles.flower.id;
        }
      }
    }
  }

  let sx = -1;
  let sy = -1;
  const radius = 1;
  const treeRadius = 3;
  const rockRadius = 5;
  const needTreeAmount = 3;
  const needRockAmount = 1;

  while (sx === -1 || sy === -1) {
    sx = Math.round(random() * w);
    sy = Math.round(random() * h);
    outer: for (let y = sy - radius; y <= sy + radius; y++) {
      for (let x = sx - radius; x <= sx + radius; x++) {
        if (
          map[x + y * w] === Tiles.water.id ||
          map[x + y * w] === Tiles.rock.id ||
          map[x + y * w] === Tiles.tree.id
        ) {
          sx = -1;
          sy = -1;
          break outer;
        }
      }
    }

    const shouldHaveTrees = shouldHaveResources(
      map,
      w,
      sx,
      sy,
      treeRadius,
      needTreeAmount,
      Tiles.tree.id,
    );
    const shouldHaveRocks = shouldHaveResources(
      map,
      w,
      sx,
      sy,
      rockRadius,
      needRockAmount,
      Tiles.rock.id,
    );

    if (!shouldHaveTrees || !shouldHaveRocks) {
      sx = -1;
      sy = -1;
    }
  }

  map[sx + sy * w] = Tiles.startingPosition.id;

  return [map, data];
};

const shouldHaveResources = (
  map: number[],
  w: number,
  sx: number,
  sy: number,
  radius: number,
  amount: number,
  tileId: number,
): boolean => {
  let currentAmount = 0;
  for (let y = sy - radius; y <= sy + radius; y++) {
    for (let x = sx - radius; x <= sx + radius; x++) {
      if (map[x + y * w] === tileId) {
        currentAmount++;
      }
    }
  }

  return currentAmount >= amount;
};
