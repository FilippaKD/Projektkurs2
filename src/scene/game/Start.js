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
pixiepower.scene.Start = function (score) {

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

pixiepower.scene.Start.prototype = Object.create(rune.scene.Scene.prototype);
pixiepower.scene.Start.prototype.constructor = pixiepower.scene.Start;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
pixiepower.scene.Start.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    var bgContainer = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
    this.stage.addChild(bgContainer);

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "image_menu_background");
    this.bg.autoSize = true;
    bgContainer.addChild(this.bg);
    var title = new rune.text.BitmapField("PIXIE POWER", "image_pixie_latestfont");

    this.highscores = new rune.data.Highscores("pixiepower", 10, 1);


    title.autoSize = true;
    title.y = 20;
    title.x = 70;


    this.stage.addChild(title);


    var sound = this.application.sounds.master.get("sound_startsong");
    sound.volume = 0.4;
    sound.loop = true;
    sound.play();

    this.timers.create({
        duration: 1000,
        onTick: function () {
            var protectSound = this.application.sounds.sound.get("sound_storymission");
            protectSound.volume = 1;
            protectSound.play();
        }.bind(this)
    });


    //this.bg.animation.create("idle", [0, 1, 2, 1, 0], 6, true);
    //this.bg.animation.gotoAndPlay("idle");

    this.initElderflowers();
    this.initChoices();

    // testa tavla 
    var tavla = new rune.display.Sprite(220, 65, 150, 200, "image_start_scoreboard");
    this.stage.addChild(tavla);

    var highscore = new rune.text.BitmapField("highscore", "image_font_testnew");
    //highscore.autoSize = true;
    highscore.y = 22;
    highscore.x = 40;
    tavla.addChild(highscore);

     for (let i = 0; i < 3; i++) {
        var entry = this.highscores.get(i);

        if (entry) {
            let row = new rune.text.BitmapField(`${i + 1}. ${entry.name.toLowerCase()} ${entry.score}`, "image_font_testsmall");
            row.y = 40 + i * 20;
            row.x = 20;
            tavla.addChild(row);
        }
    }

};

pixiepower.scene.Start.prototype.initElderflowers = function () {

    this.emitter = new rune.particle.Emitter(400, 0, 2, 190, {
        particles: [Glitter],
        capacity: 150,
        accelerationY: 0.00000005,
        accelerationX: -0.0005,
        dragY: 0.2,
        minVelocityX: -0.004,
        maxVelocityX: -0.004,
        maxVelocityY: -0.015,
        //minVelocityX: -0.05, 
        // maxVelocityX: 0.05, 
        // maxVelocityY: 0.4,  
        maxLifespan: 50000
    });

    this.emitCounter = 0;
    this.emitInterval = 30;

    this.stage.addChild(this.emitter);


};

pixiepower.scene.Start.prototype.initChoices = function () {


    this.selected = [];

    var texts = ["1 PLAYER", "2 PLAYERS", "HIGHSCORES", "CONTROLS", "CREDITS"];
    var startY = 70;

    for (var i = 0; i < texts.length; i++) {

        var text = new rune.text.BitmapField(texts[i], "image_alfafont");
        text.x = 10;
        text.y = startY + i * 20;
        text.color = "#FFFFFF";
        text.autoSize = true;
        this.stage.addChild(text);
        this.selected.push(text);
    }

    this.selectedI = 0;
    this.updateHighlight();


};


pixiepower.scene.Start.prototype.updateHighlight = function () {

    for (var i = 0; i < this.selected.length; i++) {
        if (i == this.selectedI) {
            this.selected[i].flicker.start(Infinity, 350);
        } else {
            this.selected[i].flicker.stop();
        }
    }

};


pixiepower.scene.Start.prototype.startSelected = function () {

    switch (this.selectedI) {
        case 0:
            this.application.scenes.load([
                new pixiepower.scene.ChoosePlayer(this.highscores)
            ]);
            break;
        case 1:
            this.application.scenes.load([
                new pixiepower.scene.ChoosePlayer()
            ]);
            break;
        case 2:
            this.application.scenes.load([
                new pixiepower.scene.Highscore(this.highscores)
            ]);
            break;
        case 3:
            this.application.scenes.load([
                new pixiepower.scene.Controls()
            ]);
            break;
        case 4:
            this.application.scenes.load([
                new pixiepower.scene.Credits()
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
pixiepower.scene.Start.prototype.update = function (step) {

    rune.scene.Scene.prototype.update.call(this, step);

    var gamepad = this.gamepads.get(0);

    if (gamepad.stickLeftJustDown) {
        this.selectedI++;
        if (this.selectedI >= this.selected.length) {
            this.selectedI = 0;
        }
        this.updateHighlight();
    } else if (gamepad.stickLeftJustUp) {
        this.selectedI--;
        if (this.selectedI < 0) {
            this.selectedI = this.selected.length - 1;
        }
        this.updateHighlight();
    }

    if (gamepad.justPressed(0)) {
        this.startSelected();
    }

    this.emitCounter++;
if (this.emitCounter >= this.emitInterval) {
    this.emitter.emit(1); 
    this.emitCounter = 0;
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
pixiepower.scene.Start.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};