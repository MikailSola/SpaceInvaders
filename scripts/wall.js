class Wall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 64;
        this.h = 25;
    }

    draw() {
        imageMode(CENTER);
        image(imgWall, this.x, this.y, this.w, this.h);
    }

    destroy() {
        this.w = this.w - (this.w / 20)
        this.h = this.h - (this.h / 20)
    }
}