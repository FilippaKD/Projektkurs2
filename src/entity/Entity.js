
function Entity(name, x, y, width, height) {

    rune.display.Sprite.call(this, x, y, width, height, name);
    //this.entity = new rune.display.Sprite(x, y, width, height, name);

    this.acceleration = 1;
    this.speed = 1;


   // this.initHitboxes();

}

Entity.prototype = Object.create(rune.display.Sprite.prototype);
Entity.prototype.constructor = Entity;


Entity.prototype.initHitboxes = function() {

    this.hitbox.debug = true;
   this.hitbox.debugColor = rune.util.Palette.RED;

}