export class Keyboard {
  public scrollX: number = 0;
  public scrollY: number = 0;

  private scrollSpeed: number = 2;
  private keys: boolean[] = [];

  constructor() {
    window.onkeydown = (event) => {
      this.keys[event.keyCode] = true;
    };

    window.onkeyup = (event) => {
      this.keys[event.keyCode] = false;
      this.scrollX = 0;
      this.scrollY = 0;
    };
  }

  public update(callback: () => void): void {
    // w
    if (this.keys[87]) {
      this.scrollY += this.scrollSpeed;
      callback();
    }
    // a
    if (this.keys[65]) {
      this.scrollX += this.scrollSpeed;
      callback();
    }
    // s
    if (this.keys[83]) {
      this.scrollY -= this.scrollSpeed;
      callback();
    }
    // d
    if (this.keys[68]) {
      this.scrollX -= this.scrollSpeed;
      callback();
    }
  }
}
