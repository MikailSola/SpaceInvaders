class Ship {
    constructor(x, y) {
        this.x = width / 2;
        this.y = 690
        this.w = 50
        this.h = 16.25
    }

    draw() {
        fill(0, 255, 0);
        rectMode(CENTER);
        image(imgShip, this.x, this.y, this.w, this.h);
    }

    move(dir) {
        if (this.x > width - 60) {
            this.x = width - 61
        } else if (this.x < 60) {
            this.x = 61
        } else {
            this.x = this.x + dir;
        }

    }
}