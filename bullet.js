class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, 3, 3);
    }

    move() {
        this.y = this.y - 5;
    }
}
