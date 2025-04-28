

function Thorn() {

    this.screenWidth = this.application.screen.width;
    this.screenHeight = this.application.screen.height;

    var x = Math.floor(Math.random() * (this.screenWidth - 20));
    var y = Math.floor(Math.random() * (this.screenHeight - 20));

    Entity.call(this, "bigthorns", x, y, 25, 25);
    this.makeAnimations();

    this.hitbox.set(5, 10, 10, 12);
    
}

Thorn.prototype = Object.create(Entity.prototype);
Thorn.prototype.constructor = Thorn;



Thorn.prototype.makeAnimations = function() {

   this.animation.create("grow", [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 6, false);
   this.animation.gotoAndPlay("grow");

};

Thorn.prototype.attackMode = function() {

    console.log("sdfghj")
     this.animation.create("idle", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0], 6, true);
     this.animation.gotoAndPlay("idle");


}


Thorn.prototype.update = function(step) {
    Entity.prototype.update.call(this, step);

    var current = this.animation.current

    console.log(current.frameIndex, current.frames.length)


    if (current == "grow" && !current.isPlaying && current.frameIndex == (current.frames.length - 1)) {
        console.log("ghjk")
        this.attackMode();
    }
};

