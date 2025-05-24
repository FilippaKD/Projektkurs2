

function Thorn() {

    this.screenWidth = this.application.screen.width;
    this.screenHeight = this.application.screen.height;

    var x = Math.floor(Math.random() * (this.screenWidth - 20));
    var y = Math.floor(Math.random() * (this.screenHeight - 30)) + 20;

    Entity.call(this, "image_game_thorns", x, y, 26, 25);
    this.makeAnimations();

    this.hitbox.set(2, 6, 8, 10);
    
}

Thorn.prototype = Object.create(Entity.prototype);
Thorn.prototype.constructor = Thorn;



Thorn.prototype.makeAnimations = function() {

   this.animation.create("grow", [21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 6, false);
   this.animation.gotoAndPlay("grow");

};

Thorn.prototype.attackMode = function() {

     this.animation.create("idle", [1, 0], 2, true);
     this.animation.gotoAndPlay("idle");
}


Thorn.prototype.update = function(step) {
    Entity.prototype.update.call(this, step);

    var current = this.animation.current;

    if (current.name == "grow" && current.frameIndex == (current.frames.length - 1)) {
        this.attackMode();
    }
};

Thorn.prototype.fairyStuck = function() {

   this.animation.create("stuck", [22, 23, 24, 25, 26], 3, true);
   this.animation.gotoAndPlay("stuck");

};