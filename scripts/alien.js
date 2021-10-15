class Alien {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.v = 3;
        this.w = 40;
        this.h = 40;
        this.toDelete = false;
    }

    collision(wall) {
        if (this.x > wall.x - wall.w &&
            this.x < wall.x + wall.w &&
            this.y > wall.y - wall.h &&
            this.y < wall.y + wall.h) {
            return true;
        } else {
            return false;
        }
    }

    draw() {
        image(this.img, this.x, this.y, this.w, this.h);
    }

    destroy() {
        this.toDelete = true;
    }

    move() {
        if (this.x < 79) {
            this.x = this.x + 4
            this.y = this.y + 40;
            this.v = this.v * -1;

        } else if (this.x > (width - 79)) {
            this.x = this.x - 4
            this.y = this.y + 40;
            this.v = this.v * -1;
        } else {
            this.x = this.x + this.v;
        }
    }
}