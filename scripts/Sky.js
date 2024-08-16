const skyDom = document.querySelector(".sky");
const skyDomStyle = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyDomStyle.width);
const skyHeight = parseFloat(skyDomStyle.height);
console.log(skyWidth);
class Sky extends Rectangle {
  constructor() {
    super(skyWidth, skyHeight, 0, 0, -100, 0, skyDom);
  }
  onMove() {
    if (this.left <= -skyWidth / 2) {
      this.left = 0;
    }
  }
}
const sky = new Sky();
setInterval(() => {
  sky.move(16 / 1000);
}, 16);
