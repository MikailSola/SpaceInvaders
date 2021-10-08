function Bullet(x, y) {
    this.x = x;
    this.y = y;
    this.r = 4;
    this.toDelete = false;

    this.draw = function() {
        noStroke();
        fill(0, 255, 0);
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }

    this.destroy = function() {
        this.toDelete = true;
    }

    this.collision = function(bullet) {
        var d = dist(this.x, this.y, bullet.x, bullet.y);
        if (d < this.r*2 + bullet.r*2) {
            return true;
        } else {
            return false;
        }
    }

    this.move = function() {
        this.y = this.y - 5;
    }
}
