
function Filippa() {
    Fairy.call(this, "Filippa", 20, 20);
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

/*
// --------------Styrning med tangentbord----------------
Filippa.prototype.movement = function() {

    this.emitter.emit(2);

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
        this.lastVX = this.velocity.x;
        this.lastVY = this.velocity.y;
        if (this.velocity.y == -1) {
            this.animation.gotoAndPlay("backwards");
        }
    } else {
        this.animation.gotoAndPlay("idle");
    }
};

*/



// -------------Styrning med kontroll-----------

Filippa.prototype.movement = function() {
    this.emitter.emit(2);
 

    // Dosa 1
    var gamepad = this.gamepads.get(0); 
    var stick = gamepad.stickLeft;
   

    this.velocity.x = stick.x * 0.8;
    this.velocity.y = stick.y * 0.8;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

   

    this.emitter.x = this.centerX;
    this.emitter.y = this.y + this.height * 0.3;

    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
        this.lastVX = this.velocity.x;
        this.lastVY = this.velocity.y;
        if (this.velocity.y < 0) {
            this.animation.gotoAndPlay("backwards");
        } else {
            this.animation.gotoAndPlay("walk");
        }

        this.flippedX = this.velocity.x > 0;
    } else {
        this.animation.gotoAndPlay("idle");
    }
};


// Skjutning 

Filippa.prototype.shoot = function() {
   
    let dir;

    dir = new rune.geom.Vector2D(this.lastVX, this.lastVY).normalize(); 
    
    const ball = new LightBall(
        this.x + this.width / 2,
        this.y + this.height / 2,
        dir
    );

    return ball;
};


