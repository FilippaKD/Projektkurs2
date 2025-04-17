
function Filippa(keyboard) {
    Fairy.call(this, "Filippa", keyboard, 20, 20);
}

Filippa.prototype = Object.create(Fairy.prototype);
Filippa.prototype.constructor = Filippa;

Filippa.prototype.movement = function() {
    this.velocity.x = 0;
    this.velocity.y = 0;

    if (this.keyboard.pressed("a")) {
        this.velocity.x = -1;
        this.flippedX = false;
    }
    if (this.keyboard.pressed("d")) {
        this.velocity.x = 1;
        this.flippedX = true;
    }
    if (this.keyboard.pressed("w")) {
        this.velocity.y = -1;
    }
    if (this.keyboard.pressed("s")) {
        this.velocity.y = 1;
    }
    
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    
    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
        this.animation.gotoAndPlay("walk");
    } else {
        this.animation.gotoAndPlay("idle");
    }

};


