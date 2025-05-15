
function BossWeed() {
    var canvasWidth = 400;
    this.x = Math.random() * canvasWidth;
    this.y = -Math.random() * 50;
    this.hp = 3;

    Entity.call(this, "image_game_bossweed", this.x, this.y, 32, 32);
    this.animation.create("walk", [0, 1, 2, 3, 4], 6, true);

    /* this.emitY = this.y + this.height * 0.3;
 
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
     this.addChild(this.emitter);*/

    this.canHit = true;

    this.hitbox.set(2, 2, 28, 28);




}

BossWeed.prototype = Object.create(Entity.prototype);
BossWeed.prototype.constructor = BossWeed;


BossWeed.prototype.update = function (step) {
    Entity.prototype.update.call(this, step);
    //  this.emitter.x = this.centerX;
    // this.emitter.y = this.y + this.height * 0.3;
    var centerX = 400 / 2;
    var centerY = 225 / 2;

    var dx = centerX - this.x;
    var dy = centerY - this.y;

    var dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
        this.x += (dx / dist) * (step / 200);
        this.y += (dy / dist) * (step / 200);
    }
    this.animation.gotoAndPlay("walk");

};




