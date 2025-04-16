function Waterdropplet() {

    this.screenWidth = this.application.screen.width;
    this.screenHeight = this.application.screen.height;


    var x = Math.floor(Math.random() * (this.screenWidth - 20));
    var y = Math.floor(Math.random() * (this.screenHeight - 20));


    Entity.call(this, "Waterdropplet", x, y, 20, 20);
    this.makeAnimations();

    this.hitbox.set(5, 8, 8, 8);
    
}

Waterdropplet.prototype = Object.create(Entity.prototype);
Waterdropplet.prototype.constructor = Waterdropplet;

Waterdropplet.prototype.makeAnimations = function() {

   this.animation.create("idle", [0, 1, 2, 1, 0], 6, true);
   this.animation.gotoAndPlay("idle");
};