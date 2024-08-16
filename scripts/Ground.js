const landDom = document.querySelector(".land");
const landDomStyle = getComputedStyle(landDom);
const landWidth = parseFloat(landDomStyle.width);
const landHeight = parseFloat(landDomStyle.height);
class Land extends Rectangle {
  constructor() {
    super(
      landWidth,
      landHeight,
      0,
      parseFloat(landDomStyle.top),
      -100,
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
const land = new Land();
setInterval(() => {
  land.move(16 / 1000);
}, 16);
