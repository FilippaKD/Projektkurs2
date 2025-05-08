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


    var start = new rune.text.BitmapField("Start");
    start.x = 20;
    start.y = 70;
    start.color = "#FFFFFF";
    this.stage.addChild(start);

    var controls = new rune.text.BitmapField("Controls");
    controls.x = 20;
    controls.y = 100;
    controls.color = "#FFFFFF";
    this.stage.addChild(controls);

    var credits = new rune.text.BitmapField("Credits");
    credits.x = 20;
    credits.y = 130;
    credits.color = "#FFFFFF";
    this.stage.addChild(credits);



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