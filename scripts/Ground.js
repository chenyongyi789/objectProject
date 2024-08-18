const landDom = document.querySelector(".land");
const landDomStyle = getComputedStyle(landDom);
const landWidth = parseFloat(landDomStyle.width);
const landHeight = parseFloat(landDomStyle.height);

class Land extends Rectangle {
  constructor(speed) {
    super(
      landWidth,
      landHeight,
      0,
      parseFloat(landDomStyle.top),
      speed,
      0,
      landDom
    );
  }
  onMove() {
    if (this.left <= -landWidth / 2) {
      this.left = 0;
    }
  }
}
