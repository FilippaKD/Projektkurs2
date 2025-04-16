
function Filippa(keyboard) {
    Fairy.call(this, "Filippa", keyboard, 20, 20);
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
        //minVelocityX: -0.05, 
       // maxVelocityX: 0.05, 
       // maxVelocityY: 0.4,  
        maxLifespan: 800
    });
}

Filippa.prototype = Object.create(Fairy.prototype);
Filippa.prototype.constructor = Filippa;

Filippa.prototype.movement = function() {

    this.emitter.emit(1);

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

    this.emitter.x = this.centerX;
    this.emitter.y = this.y + this.height * 0.3;
    
    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
        this.animation.gotoAndPlay("walk");
    } else {
        this.animation.gotoAndPlay("idle");
    }

};



/*
function Filippa(keyboard) {
    Fairy.call(this, "Filippa", keyboard, 20, 20);
}

Filippa.prototype = Object.create(Fairy.prototype);
Filippa.prototype.constructor = Filippa;


Filippa.prototype.movement = function() {
   
    this.entity.velocity.x = 0;
    this.entity.velocity.y = 0;

    if (this.keyboard.pressed("a")) {
        this.entity.velocity.x = -1;
        this.entity.flippedX = false;
    }
    if (this.keyboard.pressed("d")) {
        this.entity.velocity.x = 1;
        this.entity.flippedX = true;
    }
    if (this.keyboard.pressed("w")) {
        this.entity.velocity.y = -1;
    }
    if (this.keyboard.pressed("s")) {
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