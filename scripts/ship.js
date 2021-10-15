function Ship() {
    this.x = width/2;
    this.y = 690

    this.draw = function() {
        fill(0, 255, 0);
        rectMode(CENTER);
        rect(this.x, this.y, 50, 10);
    }
    
    this.move = function(dir) {
        if (this.x > width-60) {
            this.x = width-61
        } else if (this.x < 60) {
            this.x = 61
        } else {
            this.x = this.x + dir;
        }

    }
}