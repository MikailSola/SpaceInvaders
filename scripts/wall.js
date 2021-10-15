function Wall(x, y) {
    this.x = x;
    this.y = y;
    this.w = 64;
    this.h = 25;

    this.draw = function () {
        imageMode(CENTER);
        image(imgWall, this.x, this.y, this.w, this.h);
    }

    this.destroy = function () {
        this.w = this.w - (this.w / 20)
        this.h = this.h - (this.h / 20)
    }
}