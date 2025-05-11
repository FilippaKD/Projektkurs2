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
projektkurs2.scene.Controls = function (score) {

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

projektkurs2.scene.Controls.prototype = Object.create(rune.scene.Scene.prototype);
projektkurs2.scene.Controls.prototype.constructor = projektkurs2.scene.Controls;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
projektkurs2.scene.Controls.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    var bgContainer = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
    this.stage.addChild(bgContainer);

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "image_controls_background");
    this.bg.autoSize = true;
    bgContainer.addChild(this.bg);

    this.text = new rune.text.BitmapField("Controls");

    this.text.autoSize = true;
    this.text.center = this.application.screen.center;
    this.text.y = 10;

    this.text.color = "#FFFFFF";
    this.stage.addChild(this.text);

    this.desc = new rune.text.BitmapField("Protect the flower while collecting and watering the flower");

    this.desc.autoSize = true;
    this.desc.center = this.application.screen.center;
    this.desc.y = 25;

    this.desc.color = "#FFFFFF";
    this.stage.addChild(this.desc);

    this.initControls();

};


projektkurs2.scene.Controls.prototype.initControls = function () {
    

    this.control = new Entity("image_controls_control", 110, 70, 200, 120);

    this.stage.addChild(this.control);

    var shoot = new rune.text.BitmapField("Shoot");
    shoot.y = 100;
    shoot.x = 310;
    shoot.color = "#FFFFFF";
    this.stage.addChild(shoot);

    var drop = new rune.text.BitmapField("Drop collected water");
    drop.y = 68;
    drop.x = 255;
    drop.color = "#FFFFFF";
    this.stage.addChild(drop);

    var stop = new rune.text.BitmapField("Stand still");
    stop.y = 68;
    stop.x = 85;
    stop.color = "#FFFFFF";
    this.stage.addChild(stop);

    var move = new rune.text.BitmapField("Move ------");
    move.y = 112;
    move.x = 65;
    move.color = "#FFFFFF";
    this.stage.addChild(move);



};



/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
projektkurs2.scene.Credits.prototype.update = function (step) {

    rune.scene.Scene.prototype.update.call(this, step);

    var gamepad = this.gamepads.get(0);

    if (gamepad.justPressed(2)) {
         this.application.scenes.load([
            new projektkurs2.scene.Start()
        ]);
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
projektkurs2.scene.Credits.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};