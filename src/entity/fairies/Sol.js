
function Sol(keyboard) {
    Fairy.call(this, "SolSmall", keyboard, 20, 20);
    this.emitY = this.y + this.height * 0.3;
       
    this.emitter = new rune.particle.Emitter(this.centerX, this.emitY, 3, 5, {
        particles: [Glitter],
        capacity: 150,
        accelerationY: 0.00005,
        accelerationX: 0.00005,
       maxRotation: 10,
        dragY: 0.2,
          
        maxVelocityX: 0.06,
        minVelocityX: -0.06,
         maxVelocityY: 0.15,  
        maxLifespan: 1000
    });
}

Sol.prototype = Object.create(Fairy.prototype);
Sol.prototype.constructor = Sol;

Sol.prototype.movement = function() {

    this.emitter.emit(1)

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

    this.emitter.x = this.centerX;
    this.emitter.y = this.y + this.height * 0.3;

    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
        this.animation.gotoAndPlay("walk");
        if (this.velocity.y == -1) {
            this.animation.gotoAndPlay("backwards");
        }
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
