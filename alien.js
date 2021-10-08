function Alien(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.v = 1;
    this.r = 20;
    this.toDelete = false;

    this.draw = function() {
        image(img, this.x, this.y, this.r*2, this.r*2);
    }

    this.destroy = function() {
        this.toDelete = true;
    }

    this.move = function() {
        var dir;
        if (this.x < 79) {
            for (var i = 0; i < aliens.length; i++) {
                this.y = this.y + 40;
                this.x = this.x + 1
                this.v = this.v * -1;
            }  
        } else if (this.x > (width - 79)) {
            for (var i = 0; i < aliens.length; i++) {
                this.y = this.y + 40;
                this.x = this.x - 1
                this.v = this.v * -1;
            }
        } else {
            this.x = this.x + this.v;
        }
    }

    this.shoot = function() {
        
    }
}