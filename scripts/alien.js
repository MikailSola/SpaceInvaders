function Alien(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.v = 1;
    this.w = 40;
    this.h = 40;
    this.toDelete = false;


    this.draw = function () {
        image(img, this.x, this.y, this.w, this.h);
    }

    this.destroy = function () {
        this.toDelete = true;
    }

    this.move = function () {
        if (this.x < 79) {
            this.x = this.x + 1
            this.y = this.y + 40;
            this.v = this.v * -1;

        } else if (this.x > (width - 79)) {
            this.x = this.x - 1
            this.y = this.y + 40;
            this.v = this.v * -1;
        } else {
            this.x = this.x + this.v;
        }
    }
}