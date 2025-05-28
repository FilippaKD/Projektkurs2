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
pixiepower.scene.Highscore = function (highscores) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    this.highscores = highscores;
    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

pixiepower.scene.Highscore.prototype = Object.create(rune.scene.Scene.prototype);
pixiepower.scene.Highscore.prototype.constructor = pixiepower.scene.Highscore;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
pixiepower.scene.Highscore.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    var bgContainer = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
    this.stage.addChild(bgContainer);

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "image_controls_background");
    this.bg.autoSize = true;
    bgContainer.addChild(this.bg);


    this.text = new rune.text.BitmapField("HIGHSCORE", "image_alfafont");

    this.text.autoSize = true;
    this.text.center = this.application.screen.center;
    this.text.y = 20;

    this.text.color = "#FFFFFF";
    this.stage.addChild(this.text);

    this.initHighscore();

};


pixiepower.scene.Highscore.prototype.initHighscore = function () {

    for (let i = 0; i < 10; i++) {
        var entry = this.highscores.get(i);

        if (entry) {
            let row = new rune.text.BitmapField(`${i + 1}. ${entry.name.toLowerCase()} ${entry.score}`, "image_font_testsmall");
            row.y = 40 + i * 20;
            row.x = 120;
            this.stage.addChild(row);
        }
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
pixiepower.scene.Highscore.prototype.update = function (step) {

    rune.scene.Scene.prototype.update.call(this, step);

    var gamepad = this.gamepads.get(0);

    if (gamepad.justPressed(2)) {
        this.application.scenes.load([
            new pixiepower.scene.Start()
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
pixiepower.scene.Highscore.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};