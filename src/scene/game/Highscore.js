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


    this.text = new rune.text.BitmapField("HIGHSCORES", "image_alfafont");

    this.text.autoSize = true;
    this.text.center = this.application.screen.center;
    this.text.y = 15;

    this.text.color = "#FFFFFF";
    this.stage.addChild(this.text);

    this.initHighscore();

};


pixiepower.scene.Highscore.prototype.initHighscore = function () {
    var onePlayerHeader = new rune.text.BitmapField("1 PLAYER", "image_alfafont");
    onePlayerHeader.autoSize = true;
    onePlayerHeader.y = 35;
    onePlayerHeader.x = 70;
    this.stage.addChild(onePlayerHeader);
    for (let i = 0; i < 10; i++) {
        var entry = this.highscores.get(i, 0);

        if (entry) {
            var row = new rune.text.BitmapField(`${i + 1}. ${entry.name.toLowerCase()} ${entry.score}`, "image_font_testsmall");
            row.y = 60 + i * 15;
            row.x = 60;
            this.stage.addChild(row);
        }
    }

    var twoPlayerHeader = new rune.text.BitmapField("2 PLAYER", "image_alfafont");
    twoPlayerHeader.autoSize = true;
    twoPlayerHeader.y = 35;
    twoPlayerHeader.x = 250;
    this.stage.addChild(twoPlayerHeader);

    for (let i = 0; i < 10; i++) {
        var entry = this.highscores.get(i, 1);

        if (entry) {
            var row = new rune.text.BitmapField(`${i + 1}. ${entry.name.toLowerCase()} ${entry.score}`, "image_font_testsmall");
            row.y = 60 + i * 15;
            row.x = 240;
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

    if (gamepad.justPressed(1)) {
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