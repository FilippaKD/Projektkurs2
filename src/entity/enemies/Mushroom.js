function Mushroom() {
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

