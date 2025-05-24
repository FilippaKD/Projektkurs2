function Waterdroplet() {

    this.screenWidth = this.application.screen.width;
    this.screenHeight = this.application.screen.height;


    var x = Math.floor(Math.random() * (this.screenWidth - 20));
    var y = Math.floor(Math.random() * (this.screenHeight - 30)) + 20;
    console.log(this.screenHeight)


    Entity.call(this, "image_game_waterdroplet", x, y, 20, 20);
    this.makeAnimations();

    this.hitbox.set(5, 8, 8, 8);
    
}

Waterdroplet.prototype = Object.create(Entity.prototype);
Waterdroplet.prototype.constructor = Waterdroplet;

Waterdroplet.prototype.makeAnimations = function() {

   this.animation.create("idle", [0, 1, 2, 1, 0], 6, true);
   this.animation.gotoAndPlay("idle");

};

Waterdroplet.prototype.dropWater = function() {

    this.animation.create("drop", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 27, 25, 26, 27], 30, false);
    this.animation.gotoAndPlay("drop");

};

Waterdroplet.prototype.update = function(step) {
    Entity.prototype.update.call(this, step);
    var current = this.animation.current;

    if (current.name == "drop" && current.frameIndex == (current.frames.length - 1)) {
        this.parent.removeChild(this);
    }
};