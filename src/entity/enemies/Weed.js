
function Weed(direction, keyboard) {
    Entity.call(this, "weedsmall", this.x, this.y, 16, 16);
    this.animation.create("walk", [0, 1, 2, 3, 4, 5], 6, true);
    this.keyboard = keyboard;

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
    var centerX = 400 / 2;
    var centerY = 225 / 2;

    var dx = centerX - this.x;
    var dy = centerY - this.y;

    var dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
        this.x += (dx / dist) * (step / 130);
        this.y += (dy / dist) * (step / 130);
    }
    this.animation.gotoAndPlay("walk");

};









