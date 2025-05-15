function Powerup(picture) {

    this.screenWidth = this.application.screen.width;
    this.screenHeight = this.application.screen.height;


    var x = Math.floor(Math.random() * (this.screenWidth - 20));
    var y = Math.floor(Math.random() * (this.screenHeight - 20));


    Entity.call(this, picture, x, y, 20, 20);
    this.makeAnimations();

    this.hitbox.set(5, 8, 8, 8);
    
}

Powerup.prototype = Object.create(Entity.prototype);
Powerup.prototype.constructor = Powerup;

Powerup.prototype.makeAnimations = function() {

   this.animation.create("idle", [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0], 6, true);
   this.animation.gotoAndPlay("idle");

};

Powerup.prototype.update = function(step) {
    Entity.prototype.update.call(this, step);
    
};