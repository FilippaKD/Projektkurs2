//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
projektkurs2.scene.Start = function (score) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    this.score = score;
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

projektkurs2.scene.Start.prototype = Object.create(rune.scene.Scene.prototype);
projektkurs2.scene.Start.prototype.constructor = projektkurs2.scene.Start;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
projektkurs2.scene.Start.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    var bgContainer = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
    this.stage.addChild(bgContainer);

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "image_menu_background");
    this.bg.autoSize = true;
    bgContainer.addChild(this.bg);

    //this.bg.animation.create("idle", [0, 1, 2, 1, 0], 6, true);
    //this.bg.animation.gotoAndPlay("idle");


    this.initChoices();

};


projektkurs2.scene.Start.prototype.initChoices = function () {
    
    var title = new rune.text.BitmapField("PIXIE POWER", rune.text.BitmapFormat.FONT_MEDIUM);
    title.center = this.application.screen.center;
    title.y = 30;
    title.color = "#FFFFFF";
    this.stage.addChild(title);

    this.selected = [];
    this.backgrounds = [];

    var texts = ["Start", "Controls", "Credits"];
    var startY = 70;

    for (var i = 0; i < texts.length; i++) {

        var text = new rune.text.BitmapField(texts[i]);
        text.x = 20;
        text.y = startY + i * 30;
        text.color = "#FFFFFF";
        this.stage.addChild(text);
        this.selected.push(text);

        
    }

    this.selectedI = 0;
    this.updateHighlight();

   

};


projektkurs2.scene.Start.prototype.updateHighlight = function () {
    
    for (var i = 0; i < this.selected.length; i++) {
        console.log("ghjkl")
        this.selected[i].backgroundColor = (i == this.selectedI) ; 
    }

};


projektkurs2.scene.Start.prototype.startSelected = function () {
    
   switch (this.selectedI) {
    case 0:
         this.application.scenes.load([
            new projektkurs2.scene.Game()
        ]);
        break;
    case 1:
         this.application.scenes.load([
            new projektkurs2.scene.Controls()
        ]);
        break;
    case 2:
         this.application.scenes.load([
            new projektkurs2.scene.Credits()
        ]);
        break;    
   }


};




/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
projektkurs2.scene.Start.prototype.update = function (step) {

    rune.scene.Scene.prototype.update.call(this, step);

    var gamepad = this.gamepads.get(0);

    if (gamepad.stickLeftJustDown) {
        this.selectedI = (this.selectedI + 1) % this.selected.length;
        this.updateHighlight();
    } else if(gamepad.stickLeftJustUp) {
        this.selectedI = (this.selectedI - 1 + this.selected.length) % this.selected.length;
        this.updateHighlight(); 
    }

    if (gamepad.justPressed(2)) {
        this.startSelected();
    }
    
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
projektkurs2.scene.Start.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};