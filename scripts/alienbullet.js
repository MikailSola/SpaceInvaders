function AlienBullet (x, y) {
    this.toDelete = false;
    this.x = x
    this.y = y

    this.collision = function (bullet) {
        if (this.x > bullet.x - bullet.w && 
        this.x < bullet.x + bullet.w && 
        this.y > bullet.y - bullet.h && 
        this.y < bullet.y + bullet.h) {
            return true;
        } else {
            return false;
        }
    }

    this.draw = function () {
        fill(255, 0, 0)
        rect(this.x, this.y, 4, 4);
    }

    this.move = function () {
        this.y = this.y + 5;
    }

    this.destroy = function () {
        this.toDelete = true;
    }
}