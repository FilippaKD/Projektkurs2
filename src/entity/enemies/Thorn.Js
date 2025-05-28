

function Thorn() {

    this.screenWidth = this.application.screen.width;
    this.screenHeight = this.application.screen.height;

    var x = Math.floor(Math.random() * (this.screenWidth - 20));
    var y = Math.floor(Math.random() * (this.screenHeight - 40)) + 20;

    Entity.call(this, "image_game_thorns", x, y, 26, 25);
    this.makeAnimations();

    this.hitbox.set(5, 10, 9, 11);
    
}

Thorn.prototype = Object.create(Entity.prototype);
Thorn.prototype.constructor = Thorn;



Thorn.prototype.makeAnimations = function() {

   this.animation.create("grow", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 5, false);
   this.animation.gotoAndPlay("grow");

};


Thorn.prototype.attackMode = function() {

    this.animation.create("idle", [22, 23], 2, true);
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

   this.animation.create("stuck", [24, 25, 26, 27, 28], 3, true);
   this.animation.gotoAndPlay("stuck");

};