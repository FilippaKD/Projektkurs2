

function Thorn() {

    var x = 100;
    var y = 100;

    Entity.call(this, "thorns", x, y, 25, 25);
    this.makeAnimations();

    this.hitbox.set(5, 8, 8, 8);
    
}

Thorn.prototype = Object.create(Entity.prototype);
Thorn.prototype.constructor = Thorn;

Thorn.prototype.makeAnimations = function() {

   this.animation.create("idle", [0, 1, 3, 4, 5], 1, true);
   this.animation.gotoAndPlay("idle");
};