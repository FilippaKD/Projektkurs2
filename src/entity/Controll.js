function Controll() {

    Entity.call(this, "image_controls_controll", 60, 60, 300, 130);
    
}

Controll.prototype = Object.create(Entity.prototype);
Controll.prototype.constructor = Controll;


Controll.prototype.SlideOne = function() {

   this.animation.create("one", [1, 0], 4, true);
   this.animation.gotoAndPlay("one");
};

Controll.prototype.SlideTwo = function() {

   this.animation.create("two", [2, 3], 4, true);
   this.animation.gotoAndPlay("two");
};

Controll.prototype.SlideThree = function() {

   this.animation.create("three", [4, 5], 4, true);
   this.animation.gotoAndPlay("three");
};