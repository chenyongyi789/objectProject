const gameWidth = document.querySelector(".game").clientWidth;
const gameDom = document.querySelector(".game");
class Pipe extends Rectangle {
  constructor(height, top, xSpeed, dom) {
    super(52, height, gameWidth, top, xSpeed, 0, dom);
  }
  onMove() {
    if (this.left < -this.width) {
      //移除dom
      this.dom.remove();
    }
  }
}
function getRandom(min, max) {
  //   console.log(Math.floor(Math.random() * (max - min + 1) + min));
  return Math.floor(Math.random() * (max - min) + min);
}
class PipePare {
  constructor(xSpeed) {
    const pipeUp = document.createElement("div");
    const pipeDown = document.createElement("div");
    pipeUp.className = "pipe up";
    pipeDown.className = "pipe down";
    this.spaceHeight = 150; //空隙位置的高度
    this.minHeight = 80; //水管最小高度
    this.maxHeight =
      gameHeight - landHeight - this.minHeight - this.spaceHeight;
    const pipeUpHeight = getRandom(this.minHeight, this.maxHeight);
    const pipeDowHeight =
      gameHeight - landHeight - pipeUpHeight - this.spaceHeight;
    const pipeDownTop = gameHeight - landHeight - pipeDowHeight;
    this.pipeUp = new Pipe(pipeUpHeight, 0, xSpeed, pipeUp); //上水管
    this.pipeDown = new Pipe(pipeDowHeight, pipeDownTop, xSpeed, pipeDown); //下水管
    gameDom.appendChild(pipeUp);
    gameDom.appendChild(pipeDown);
  }
  /**
   * 该柱子对是否已经移出了视野
   */
  get useLess() {
    return this.pipeUp.left < -this.pipeUp.width;
  }
  move(duration) {
    this.pipeUp.move(duration);
    this.pipeDown.move(duration);
  }
}
/**
 * 用于不断的产生柱子对
 */
class PipePareProducer {
  constructor(xSpeed) {
    this.speed = xSpeed;
    this.pipeArr = [];
    this.timer = null;
    this.tick = 1500;
  }
  startProduce() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.pipeArr.push(new PipePare(this.speed));
      //移除掉用不到的柱子
      this.pipeArr.forEach((item, index) => {
        if (item.useLess) {
          //没用的柱子对
          this.pipeArr.splice(index, 1);
          index--;
        }
      });
    }, this.tick);
  }
  stopProduce() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
