import { Level, Tiles } from '../level';

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
        this.setSample(x, y, Math.random() * 2 - 1);
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
            (a + b + c + d) / 4.0 + (Math.random() * 2 - 1) * stepSize * scale;
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
            (a + b + d + e) / 4.0 +
            (Math.random() * 2 - 1) * stepSize * scale * 0.5;
          const g =
            (a + c + d + f) / 4.0 +
            (Math.random() * 2 - 1) * stepSize * scale * 0.5;
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

export const createAndValidateWorld = (w: number, h: number) => {
  do {
    const result = createMap(w, h);
    const count: number[] = new Array(256);

    for (let i = 0; i < w * h; i++) {
      count[result[0][i] & 0xff]++;
    }

    if (count[2 & 0xff] < 100) continue;
    if (count[1 & 0xff] < 100) continue;

    return result;
  } while (true);
};

export const createMap = (w: number, h: number) => {
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
      } else {
        map[i] = Tiles.grass.id;
      }
    }
  }

  for (let i = 0; i < (w * h) / 2800; i++) {
    let xs = Math.round(Math.random() * w);
    let ys = Math.round(Math.random() * h);
    for (let k = 0; k < 10; k++) {
      let x = xs + Math.round(Math.random() * 21 - 10);
      let y = ys + Math.round(Math.random() * 21 - 10);
      for (let j = 0; j < 100; j++) {
        let xo =
          x + Math.round(Math.random() * 5) - Math.round(Math.random() * 5);
        let yo =
          y + Math.round(Math.random() * 5) - Math.round(Math.random() * 5);
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
    const x = Math.round(Math.random() * w);
    const y = Math.round(Math.random() * h);
    for (let j = 0; j < 200; j++) {
      const xx =
        x + Math.round(Math.random() * 15) - Math.round(Math.random() * 15);
      const yy =
        y + Math.round(Math.random() * 15) - Math.round(Math.random() * 15);
      if (xx >= 0 && yy >= 0 && xx < w && yy < h) {
        if (map[xx + yy * w] == Tiles.grass.id) {
          map[xx + yy * w] = Tiles.tree.id;
        }
      }
    }
  }

  let sx = -1;
  let sy = -1;
  const radius = 1;
  while (sx === -1 || sy === -1) {
    sx = Math.round(Math.random() * w);
    sy = Math.round(Math.random() * h);
    outer: for (let y = sy - radius; y <= sy + radius; y++) {
      for (let x = sx - radius; x <= sx + radius; x++) {
        if (
          map[x + y * w] === Tiles.water.id ||
          map[x + y * w] === Tiles.tree.id
        ) {
          sx = -1;
          sy = -1;
          break outer;
        }
      }
    }
  }

  map[sx + sy * w] = Level.startingPositionId;

  console.log(map);
  return [map, data];
};
