const birdDom = document.querySelector(".bird");
const birdDomStyle = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdDomStyle.width);
const birdHeight = parseFloat(birdDomStyle.height);
const birdLeft = parseFloat(birdDomStyle.left);
const birdTop = parseFloat(birdDomStyle.top);
const gameHeight = document.querySelector(".game").clientHeight;
class Bird extends Rectangle {
  constructor() {
    super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
    this.addSpeed = 1500; //向下的加速度，单位：像素/秒²
    this.maxY = gameHeight - landHeight - birdHeight;
    this.swingStatus = 1; // 小鸟翅膀状态
    this.timer = null; //翅膀煽动的计时器
    this.render();
  }
  //开始煽动翅膀
  startSwing() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.swingStatus++;
      if (this.swingStatus === 4) {
        this.swingStatus = 1;
      }
      this.render();
    }, 300);
  }
  //停止煽动翅膀
  stopSwing() {
    clearInterval(this.timer);
    this.timer = null;
  }
  render() {
    super.render(); //重用父类渲染逻辑
    birdDom.className = `bird swing${this.swingStatus}`;
  }
  move(duration) {
    super.move(duration); //调用父类方法
    //根据加速度改变速度
    this.ySpeed += this.addSpeed * duration;
  }
  onMove() {
    //控制坐标范围
    if (this.top < 0) {
      this.top = 0;
    } else if (this.top > this.maxY) {
      this.top = this.maxY;
    }
  }
  //向上跳，直接给一个向上的速度
  jump() {
    this.ySpeed = -450;
  }
}
