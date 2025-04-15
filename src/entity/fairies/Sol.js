
function Sol(keyboard) {
    Fairy.call(this, "SolSmall", keyboard, 20, 20);
}

Sol.prototype = Object.create(Fairy.prototype);
Sol.prototype.constructor = Sol;

Sol.prototype.movement = function() {
    this.velocity.x = 0;
    this.velocity.y = 0;

    if (this.keyboard.pressed("LEFT")) {
        this.velocity.x = -1;
        this.flippedX = false;
    }
    if (this.keyboard.pressed("RIGHT")) {
        this.velocity.x = 1;
        this.flippedX = true;
    }
    if (this.keyboard.pressed("UP")) {
        this.velocity.y = -1;
    }
    if (this.keyboard.pressed("DOWN")) {
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


/*
function Sol(keyboard) {
    Fairy.call(this, "SolSmall", keyboard, 20, 20);
}

Sol.prototype = Object.create(Fairy.prototype);
Sol.prototype.constructor = Sol;


Sol.prototype.movement = function() {
    this.entity.velocity.x = 0;
    this.entity.velocity.y = 0;

    if (this.keyboard.pressed("LEFT")) {
        this.entity.velocity.x = -1;
        this.entity.flippedX = false;
    }
    if (this.keyboard.pressed("RIGHT")) {
        this.entity.velocity.x = 1;
        this.entity.flippedX = true;
    }
    if (this.keyboard.pressed("UP")) {
        this.entity.velocity.y = -1;
    }
    if (this.keyboard.pressed("DOWN")) {
        this.entity.velocity.y = 1;
    }
    
    this.entity.x += this.entity.velocity.x;
    this.entity.y += this.entity.velocity.y;
    
    if (this.entity.velocity.x !== 0 || this.entity.velocity.y !== 0) {
        this.entity.animation.gotoAndPlay("walk");
    } else {
        this.entity.animation.gotoAndPlay("idle");
    }
    
};
*/
