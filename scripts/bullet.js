class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 2;
        this.toDelete = false;
    }

    draw() {
        noStroke();
        fill(0, 255, 0);
        rect(this.x, this.y, this.r * 2, this.r * 2);
    }

    destroy() {
        this.toDelete = true;
    }

    collision(bullet) {
        if (this.x > bullet.x - bullet.w &&
            this.x < bullet.x + bullet.w &&
            this.y > bullet.y - bullet.h &&
            this.y < bullet.y + bullet.h) {
            return true;
        } else {
            return false;
        }
    }

    move() {
        this.y = this.y - 5;
        if (this.y < -5) {
            this.toDelete = true;
        }
    }
}