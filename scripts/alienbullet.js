class AlienBullet {
    constructor(x, y) {
        this.toDelete = false;
        this.x = x
        this.y = y
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

    draw() {
        fill(255, 0, 0)
        rect(this.x, this.y, 4, 4);
    }

    move() {
        this.y = this.y + 5;
    }

    destroy() {
        this.toDelete = true;
    }
}