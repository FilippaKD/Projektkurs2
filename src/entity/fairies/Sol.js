
function Sol() {
    Fairy.call(this, "image_game_Sol", 20, 20);
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


// -----------Styrning med tangentbord--------------------
Sol.prototype.movement = function () {

    if (this.isStuck) {
        this.velocity.x = 0;
        this.velocity.y = 0;
        return;
    }

    this.emitter.emit(2)

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
        this.lastVX = this.velocity.x;
        this.lastVY = this.velocity.y;
        if (this.velocity.y == -1) {
            this.animation.gotoAndPlay("backwards");
        }
    } else {
        this.animation.gotoAndPlay("idle");
    }
};





// --------------Styrning med kontroll---------------------
/*
Sol.prototype.movement = function() {
    this.emitter.emit(2);

     if (this.isStuck) {
        this.velocity.x = 0;
        this.velocity.y = 0;
        return;
    }

   // Dosa 2
    var gamepad = this.gamepads.get(1); 

    var stick = gamepad.stickLeft;
   
    this.velocity.x = stick.x * this.speed;
    this.velocity.y = stick.y * this.speed;

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
*/


Sol.prototype.shoot = function () {

    let dir;

    dir = new rune.geom.Vector2D(this.lastVX, this.lastVY).normalize();

    const ball = new LightBall(
        this.x + this.width / 2,
        this.y + this.height / 2,
        dir
    );

    return ball;
};
