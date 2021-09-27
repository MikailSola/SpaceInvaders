class Bullet {
    constructor(x, y, r, toDelete) {
        this.x = x;
        this.y = y;
        this.r = 3;
        this.toDelete = false;
    }

    move() {
        noStroke();
        fill(150, 0, 255);
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }

    evaporate() {
        this.toDelete = true;
    }

    hits() {
        var d = dist(this.x, this.y, invader.x, invader.y);
        if (d < this.r + invader.r) {
            return true;
        } else {
            return false;
        }
    }

    move() {
        this.y = this.y - 5;
    
    }
}