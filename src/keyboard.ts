export class Keyboard {
  public scrollX: number = 0;
  public scrollY: number = 0;

  //private scrollSpeed: number = 3;
  private keys: boolean[] = [];

  constructor() {
    window.onkeydown = (event) => {
      this.keys[event.keyCode] = true;
    };

    window.onkeyup = (event) => {
      this.keys[event.keyCode] = false;
    };
  }

  public update(
    currX: number,
    currY: number,
    escapePressed?: () => void,
    debugPressed?: () => void,
    move?: (xa: number, ya: number) => void,
  ) {
    this.scrollX = currX;
    this.scrollY = currY;

    if (move) move(0, 0);

    // w
    if (this.keys[87]) {
      //this.scrollY += this.scrollSpeed;
      if (move) move(0, -1);
    }
    // a
    if (this.keys[65]) {
      //this.scrollX += this.scrollSpeed;
      if (move) move(-1, 0);
    }
    // s
    if (this.keys[83]) {
      //this.scrollY -= this.scrollSpeed;
      if (move) move(0, 1);
    }
    // d
    if (this.keys[68]) {
      //this.scrollX -= this.scrollSpeed;
      if (move) move(1, 0);
    }

    if (this.keys[27] && escapePressed) {
      escapePressed();
    }

    // 1
    if (this.keys[49] && debugPressed) {
      debugPressed();
    }

    return [this.scrollX, this.scrollY];
  }
}
