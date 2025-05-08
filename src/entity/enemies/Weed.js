
function Weed(direction) {
    Entity.call(this, "image_game_weed", this.x, this.y, 16, 16);
    this.animation.create("walk", [0, 1, 2, 3, 4, 5], 6, true);

    this.emitY = this.y + this.height * 0.3;

    this.emitter = new rune.particle.Emitter(this.centerX, this.emitY, 6, 8, {
        particles: [Glitter],
        capacity: 30,
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
    this.addChild(this.emitter);

    this.canHit = true;

    this.hitbox.set(5, 5, 10, 10);


    var canvasWidth = 400;
    var canvasHeight = 225;

    if (direction === "north") {
        this.x = Math.random() * canvasWidth;
        this.y = 0;
    } else if (direction === "south") {
        this.x = Math.random() * canvasWidth;
        this.y = canvasHeight;
    } else if (direction === "west") {
        this.x = 0;
        this.y = Math.random() * canvasHeight;
    } else if (direction === "east") {
        this.x = canvasWidth;
        this.y = Math.random() * canvasHeight;
    }

}

Weed.prototype = Object.create(Entity.prototype);
Weed.prototype.constructor = Weed;


Weed.prototype.update = function (step) {
    Entity.prototype.update.call(this, step);
    this.emitter.x = this.centerX;
    this.emitter.y = this.y + this.height * 0.3;
    var centerX = 400 / 2;
    var centerY = 225 / 2;

    var dx = centerX - this.x;
    var dy = centerY - this.y;

    var dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
        this.x += (dx / dist) * (step / 100);
        this.y += (dy / dist) * (step / 100);
    }
    this.animation.gotoAndPlay("walk");

};









