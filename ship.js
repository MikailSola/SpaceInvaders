function Ship() {
    this.x = width/2;

    this.draw = function() {
        fill(0, 255, 0);
        rectMode(CENTER);
        rect(this.x, 690, 50, 10);
    }
    
    this.move = function(dir) {
        this.x += dir*5;
    }
}