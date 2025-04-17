function Flower() {



    Entity.call(this, "Flower", 185, 100, 32, 32);
    //this.makeAnimations();

    this.hitbox.set(5, 8, 15, 20);
    
}

Flower.prototype = Object.create(Entity.prototype);
Flower.prototype.constructor = Flower;

Flower.prototype.makeAnimations = function() {

   this.animation.create("idle", [0, 1, 2, 1, 0], 6, true);
   this.animation.gotoAndPlay("idle");
};