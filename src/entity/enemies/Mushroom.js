/*function Mushroom() {
    Entity.call(this, "image_game_mushroom", 10, 10, 15, 13);
    this.animation.create("jump", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6, true);

    this.hitbox.set(-15, -15, 40, 40);
   
}

Mushroom.prototype = Object.create(Entity.prototype);
Mushroom.prototype.constructor = Mushroom;


Mushroom.prototype.update = function (player, step) {
    Entity.prototype.update.call(this, step);

    const dx = player.x - this.x;
    const dy = player.y - this.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
        const moveX = (dx / distance) * (step / 130);
        const moveY = (dy / distance) * (step / 130);

        this.x += moveX;
        this.y += moveY;

    }

    this.animation.gotoAndPlay("jump");

}
*/


function Mushroom() {
    Entity.call(this, "image_game_mushroom", this.x, this.y, 15, 13);
    this.animation.create("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6, true);

    this.hitbox.set(0, 1, 12, 12);

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

    }
    this.animation.gotoAndPlay("walk");

};

Mushroom.prototype.getDistanceOfPlayers = function (player) { 

    this.player = player;


}





