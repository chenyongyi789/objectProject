class Game {
  constructor() {
    this.bird = new Bird();
    this.ground = new Land(-100);
    this.sky = new Sky();
    this.pipe = new PipePareProducer(-100);
    this.timer = null;
    this.tick = 16;
    this.gameOver = false;
  }
  start() {
    if (this.timer) {
      return;
    }
    if (this.gameOver) {
      window.location.reload();
    }
    this.pipe.startProduce();
    this.timer = setInterval(() => {
      const duration = this.tick / 1000;
      this.bird.move(duration);
      this.ground.move(duration);
      this.sky.move(duration);
      this.pipe.pipeArr.forEach((item) => {
        item.move(duration);
      });
      if (this.isGameOver()) {
        this.stop();
        this.gameOver = true;
      }
    }, this.tick);
  }
  isHit(rect1, rect2) {
    const centerX1 = rect1.left + rect1.width / 2;
    const centerY1 = rect1.top + rect1.height / 2;
    const centerX2 = rect2.left + rect2.width / 2;
    const centerY2 = rect2.top + rect2.height / 2;
    const disX = Math.abs(centerX1 - centerX2);
    const disY = Math.abs(centerY1 - centerY2);
    if (
      disX < (rect1.width + rect2.width) / 2 &&
      disY < (rect1.height + rect2.height) / 2
    ) {
      return true;
    }
    return false;
  }
  isGameOver() {
    const maxY = gameHeight - landHeight - this.bird.height;
    if (this.bird.top === maxY) {
      return true;
    }
    for (let i = 0; i < this.pipe.pipeArr.length; i++) {
      const pair = this.pipe.pipeArr[i];
      console.log(pair);
      if (
        this.isHit(this.bird, pair.pipeUp) ||
        this.isHit(this.bird, pair.pipeDown)
      ) {
        return true;
      }
    }
    return false;
  }
  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.bird.stopSwing();
    this.pipe.stopProduce();
  }
  regEvnet() {
    window.onkeydown = (e) => {
      console.log(this.timer);
      if (e.key === "Enter") {
        if (this.timer) {
          this.stop();
        } else {
          this.start();
        }
      } else if (e.key === " ") {
        this.bird.jump();
      }
    };
  }
}

const gameInstance = new Game();
gameInstance.regEvnet();
