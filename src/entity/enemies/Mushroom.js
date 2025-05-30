
function Mushroom() {
    Entity.call(this, "image_game_mushroom", this.x, this.y, 15, 13);
    this.animation.create("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6, true);
    this.animation.create("jump", [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 6, true);
    this.animation.create("jumpDown", [20, 19, 18, 17, 16, 15, 14, 13, 12, 11], 6, true);

    this.hitbox.set(0, 1, 12, 12);

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
        maxLifespan: 800
    });
    this.addChild(this.emitter);

    var canvasWidth = 400;
    var spawnEdge = Math.floor(Math.random() * 4);

    switch (spawnEdge) {
        case 0: 
            this.x = Math.random() * canvasWidth;
            this.y = -16;
            break;
        case 1: 
            this.x = canvasWidth + 16;
            this.y = Math.random() * 225;
            break;
        case 2: 
            this.x = Math.random() * canvasWidth;
            this.y = 225 + 16;
            break;
        case 3:
            this.x = -16;
            this.y = Math.random() * 225;
            break;
    }

}


Mushroom.prototype = Object.create(Entity.prototype);
Mushroom.prototype.constructor = Mushroom;


Mushroom.prototype.update = function (step) {
    Entity.prototype.update.call(this, step);
    
    const dx = this.player.x - this.x;
    const dy = this.player.y - this.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
        const moveX = (dx / distance) * (step / 130);
        const moveY = (dy / distance) * (step / 130);

        this.x += moveX;
        this.y += moveY;

        if (moveY > moveX) {
            if (moveY < 0) {
                 this.animation.gotoAndPlay("jump");
            } else {
                this.animation.gotoAndPlay("jumpDown");
            }
        } else {
            this.animation.gotoAndPlay("walk");
        }

        /*
        if (moveX < 0) {
            console.log("sdfg")
            this.flippedX = true;
        } else {
            this.flippedX = false;
        }

        if (moveY < 0) {
            console.log("upp")
           this.animation.gotoAndPlay("jump");
        } else {
          this.animation.gotoAndPlay("jumpDown");
        }
*/
         

    }


};

Mushroom.prototype.getDistanceOfPlayers = function (player) { 

    this.player = player;

}





