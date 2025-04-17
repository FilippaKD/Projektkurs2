
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
   
    var deadzone = 0.00004;

    var inputX = Math.abs(stick.x) > deadzone ? stick.x : 0;
    var inputY = Math.abs(stick.y) > deadzone ? stick.y : 0;

    this.velocity.x = inputX * this.speed;
    this.velocity.y = inputY * this.speed;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

   

    this.emitter.x = this.centerX;
    this.emitter.y = this.y + this.height * 0.3;

    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
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
    const vx = this.velocity.x;
    const vy = this.velocity.y;

    let dir;

    if (vx === 0 && vy === 0) {
        dir = new rune.geom.Vector2D(0, 1).normalize(); 
    } else {
        dir = new rune.geom.Vector2D(vx, vy).normalize(); 
    }

    const ball = new LightBall(
        this.x + this.width / 2,
        this.y + this.height / 2,
        dir
    );

    return ball;
};


