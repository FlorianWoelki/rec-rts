export class Keyboard {
  private scrollSpeed: number = 3;
  private keys: boolean[] = [];

  constructor() {
    window.onkeydown = (event) => {
      this.keys[event.keyCode] = true;
    };

    window.onkeyup = (event) => {
      this.keys[event.keyCode] = false;
    };
  }

  public update(callback: () => void): void {
    // w
    if (this.keys[87]) {
      scrollY += this.scrollSpeed;
      callback();
    }
    // a
    if (this.keys[65]) {
      scrollX += this.scrollSpeed;
      callback();
    }
    // s
    if (this.keys[83]) {
      scrollY -= this.scrollSpeed;
      callback();
    }
    // d
    if (this.keys[68]) {
      scrollX -= this.scrollSpeed;
      callback();
    }
  }
}
