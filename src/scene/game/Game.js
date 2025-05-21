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
projektkurs2.scene.Game = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

projektkurs2.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
projektkurs2.scene.Game.prototype.constructor = projektkurs2.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
projektkurs2.scene.Game.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    // kolla om gamepads är connected
    console.log(this.gamepads.numGamepads)

    var bgContainer = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
    this.stage.addChild(bgContainer);

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "image_game_background");
    this.bg.autoSize = true;
    bgContainer.addChild(this.bg);

    this.sol = new Sol();
    this.filippa = new Filippa();

    this.fairies = new rune.display.DisplayGroup(this.stage);

    this.fairies.addMember(this.sol)
    this.fairies.addMember(this.filippa)

    bgContainer.addChild(this.sol.emitter);
    bgContainer.addChild(this.filippa.emitter);

    this.initFlower();
    this.initWaterdroplet();

    this.lightballs = new rune.display.DisplayGroup(this.stage);

    this.initThorns();
    this.initWeeds();
    this.initMushrooms();
    this.initHud();
    this.initBossWeeds();
    this.initPowerups();

    this.waterZone = new rune.display.Graphic(
        this.flower.x,
        this.flower.y,
        this.flower.width,
        this.flower.height + 10
    );

    this.stage.addChild(this.waterZone);
    // protect the flower-ljud
    this.timers.create({
        duration: 2000,
        onTick: function () {
            var protectSound = this.application.sounds.sound.get("sound_protectheflower");
            protectSound.volume = 0.9;
            protectSound.play();
        }.bind(this)
    });



    var bgm = this.application.sounds.music.get("themesong");
    bgm.loop = true;
    bgm.volume = 0.5;
    bgm.play();



};




/**
 * @inheritDoc
 */
projektkurs2.scene.Game.prototype.m_initCamera = function (step) {
    this.camera = new Camera();
    this.cameras.addCamera(this.camera);



};

projektkurs2.scene.Game.prototype.initHud = function () {

    this.score = 0;
    this.displayCounter = new rune.text.BitmapField();
    this.displayCounter.autoSize = true;
    this.displayCounter.center = this.application.screen.center;
    this.displayCounter.y = 5;
    this.displayCounter.backgroundColor = "#000000"
    this.displayCounter.color = "#FFFFFF";
    this.stage.addChild(this.displayCounter);

    this.displayPlayer1 = new rune.text.BitmapField();
    this.displayPlayer1.color = "#FFFFFF";
    //this.displayPlayer1.y = 100;
    this.stage.addChild(this.displayPlayer1);
    this.watercan1 = new Watercan;
    this.stage.addChild(this.watercan1);



    this.displayPlayer2 = new rune.text.BitmapField();
    this.displayPlayer2.color = "#FFFFFF";
    this.displayPlayer2.x = 300;
    this.stage.addChild(this.displayPlayer2);
    this.watercan2 = new Watercan(375, 0);
    this.stage.addChild(this.watercan2);


};


projektkurs2.scene.Game.prototype.initMushrooms = function () {

    this.mushrooms = new rune.display.DisplayGroup(this.stage);


    this.timers.create({
        duration: 6000,
        repeat: Infinity,
        onTick: function () {
            var mushroom = new Mushroom();
            this.mushrooms.addMember(mushroom);
        }.bind(this)
    });

    /* this.mushrooms.forEachMember(function (mushroom) {
         var filippaDistance = this.filippa.distance(mushroom);
         var solDistance = this.sol.distance(mushroom);
 
         if (filippaDistance < solDistance) {
             var nearestPlayer = this.filippa;
         } else {
             var nearestPlayer = this.sol;
         }
     }.bind(this));*/
}


projektkurs2.scene.Game.prototype.initWaterdroplet = function () {

    this.waterdroplets = new rune.display.DisplayGroup(this.stage);

    this.timers.create({
        duration: 5000,
        repeat: Infinity,
        onTick: function () {
            this.waterdroplet = new Waterdroplet();
            this.waterdroplets.addMember(this.waterdroplet);
        }.bind(this)
    });


    this.timers.create({
        duration: 10000,
        repeat: Infinity,
        onTick: function () {
            var members = this.waterdroplets.getMembers();
            if (members.length > 0) {
                var randomI = Math.floor(Math.random() * members.length);
                var toBeRemoved = members[randomI];
                this.stage.removeChild(toBeRemoved);
                this.waterdroplets.removeMember(toBeRemoved);
            }
        }.bind(this)
    })
};


projektkurs2.scene.Game.prototype.initPowerups = function () {


    this.timers.create({
        duration: 9000,
        repeat: Infinity,
        onTick: function () {
            if (Math.random() > 0.25 && !this.jesusPowerup) {
                this.jesusPowerup = new Powerup("image_game_powerup_jesus");
                this.stage.addChild(this.jesusPowerup);
            }

        }.bind(this)
    });

    this.timers.create({
        duration: 9000,
        repeat: Infinity,
        onTick: function () {
            if (Math.random() > 0.25 && !this.bombPowerup) {
                this.bombPowerup = new Powerup("image_game_powerup_bomb");
                this.stage.addChild(this.bombPowerup);
            }

        }.bind(this)
    });


};



projektkurs2.scene.Game.prototype.initWeeds = function () {

    this.weeds = new rune.display.DisplayGroup(this.stage);

    var spawnInterval = 3000;

    this.timers.create({
        duration: spawnInterval,
        repeat: Infinity,
        onTick: function () {
            var weed = new Weed();
            this.weeds.addMember(weed);
        }
    });


    this.timers.create({
        duration: 8000,
        repeat: Infinity,
        onTick: function () {
            spawnInterval = Math.max(1000, spawnInterval - 200);
        }
    });

}

projektkurs2.scene.Game.prototype.initBossWeeds = function () {
    this.bossWeeds = new rune.display.DisplayGroup(this.stage);

    var spawnInterval = 70000;

    this.timers.create({
        duration: spawnInterval,
        repeat: Infinity,
        onTick: function () {
            var bossWeed = new BossWeed();
            this.bossWeeds.addMember(bossWeed);
        }
    });


    this.timers.create({
        duration: 8000,
        repeat: Infinity,
        onTick: function () {
            spawnInterval = Math.max(1000, spawnInterval - 200);
        }
    });
}

// Taggbuskar initiering
projektkurs2.scene.Game.prototype.initThorns = function () {

    this.allThorns = new rune.display.DisplayGroup(this.stage);

    var spawnInterval = 3000;

    this.timers.create({
        duration: spawnInterval,
        repeat: Infinity,
        onTick: function () {
            this.thorn = new Thorn();
            this.allThorns.addMember(this.thorn);
        }
    });

    this.timers.create({
        duration: 8000,
        repeat: Infinity,
        onTick: function () {
            spawnInterval = Math.max(1000, spawnInterval - 200);
        }
    });

};


projektkurs2.scene.Game.prototype.initFlower = function () {

    this.flower = new Flower();
    this.stage.addChild(this.flower);


    this.timers.create({
        duration: 8000,
        repeat: Infinity,
        onTick: function () {
            this.flower.flowerDamage(5);
        }.bind(this)
    });


};


projektkurs2.scene.Game.prototype.handleThorns = function () {

    this.fairies.forEachMember(function (fairy) {
        if (fairy.hitTestGroup(this.allThorns)) {
            fairy.isStuck = true;
        }
    }.bind(this));

};

projektkurs2.scene.Game.prototype.handleWaterdroplets = function () {

    this.waterdroplets.forEachMember(function (droplet) {
        var collected = false;

        this.fairies.forEachMember(function (fairy) {
            if (droplet.hitTestObject(fairy) && fairy.waterCollection < 3 && !collected) {
                fairy.addDrop(1);
                this.waterdroplets.removeMember(droplet);
                collected = true;
            }
        }.bind(this));
    }.bind(this));


    if (this.filippa.hitTestObject(this.waterZone) && this.gamepads.get(0).justPressed(7) && this.filippa.waterCollection > 0) {
        this.flower.flowerHeal(this.filippa.waterCollection);
        var droppedWater = new Waterdroplet;
        droppedWater.x = this.filippa.x;
        droppedWater.y = this.filippa.y;
        droppedWater.dropWater();
        this.stage.addChild(droppedWater);
        this.filippa.waterCollection = 0;


    }

    if (this.sol.hitTestObject(this.waterZone) && this.gamepads.get(1).justPressed(7) && this.sol.waterCollection > 0) {
        this.flower.flowerHeal(this.sol.waterCollection);
        var droppedWater = new Waterdroplet;
        droppedWater.x = this.sol.x;
        droppedWater.y = this.sol.y;
        droppedWater.dropWater();
        this.stage.addChild(droppedWater);
        this.sol.waterCollection = 0;
    }


};


projektkurs2.scene.Game.prototype.handlePowerups = function () {

    this.fairies.forEachMember(function (fairy) {
        if (fairy.hitTestObject(this.jesusPowerup)) {

            this.jesus = new Jesus();
            // jesusljud

            var isThatJesusSound = this.application.sounds.sound.get("sound_isthatjesus");
            isThatJesusSound.volume = 0.9;
            isThatJesusSound.play();

            this.jesus.x = this.flower.x;
            this.jesus.y = this.flower.y - 35;
            this.stage.addChild(this.jesus);

            this.flower.flowerHeal(100);

            this.stage.removeChild(this.jesusPowerup);
        }
    }.bind(this))

    this.fairies.forEachMember(function (fairy) {
        if (fairy.hitTestObject(this.bombPowerup)) {
            fairy.powerUpShooting = true;
            this.timers.create({
                duration: 5000,
                onComplete: function () {
                    fairy.powerUpShooting = false;
                }
            });
            this.stage.removeChild(this.bombPowerup);
        }
    }.bind(this))

}


projektkurs2.scene.Game.prototype.gameOver = function () {

    if (this.flower.flowerLifeBar == 0) {
        console.log("gameover");

        var cam = this.cameras.getCameraAt(0);

        cam.target = this.flower;
        console.log(cam.target);

        //cam.center = this.application.screen.center;
        cam.viewport.zoom = 2.0;

        //cam.centerX = this.flower.x + this.flower.width / 2;
        //cam.centerY = this.flower.y + this.flower.height / 2;

        var score = this.score;


        this.application.scenes.load([
            new projektkurs2.scene.GameOver(score)
        ]);


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
projektkurs2.scene.Game.prototype.update = function (step) {

    rune.scene.Scene.prototype.update.call(this, step);
    this.sol.movement();
    this.filippa.movement();

    this.gameOver();
    this.displayCounter.text = "";
    this.displayCounter.text = this.score.toString();

    /* Flytta på detta
       this.displayPlayer1.text = "";
       this.displayPlayer1.text = "Player 1 " + this.sol.waterCollection.toString() + "/3";
       this.watercan1.updatePicture(this.sol.waterCollection);
    
       this.displayPlayer2.text = "";
       this.displayPlayer2.text = "Player 2 " + this.filippa.waterCollection.toString() + "/3";
       this.watercan2.updatePicture(this.filippa.waterCollection);
    */


    // HEJ GOOPh
    var cam = this.cameras.getCameraAt(0);
    this.mushrooms.forEachMember(function (mushroom) {
        rune.physics.Space.separate(this.flower, mushroom);
        var filippaDistance = this.filippa.distance(mushroom);
        var solDistance = this.sol.distance(mushroom);

        if (filippaDistance < solDistance) {
            var nearestPlayer = this.filippa;
        } else {
            var nearestPlayer = this.sol;
        }

        mushroom.getDistanceOfPlayers(nearestPlayer);

        if (mushroom.hitTestGroup(this.fairies)) {

            this.stage.removeChild(mushroom);
            this.mushrooms.removeMember(mushroom);
            cam.wavy = true;

            cam.tint = new rune.camera.CameraTint();
            cam.tint.color = new rune.color.Color24();
            cam.tint.opacity = 0.4;

            // Färger för svampeffekten
            let colors = [
                { r: 255, g: 105, b: 180 },
                { r: 255, g: 0, b: 0 },
                { r: 255, g: 128, b: 0 },
                { r: 255, g: 255, b: 0 },
                { r: 0, g: 255, b: 0 },
                { r: 128, g: 0, b: 255 }
            ];

            let index = 0;

            // Fadetimer för färgerna på svampeffekten
            let fadeTimer = this.timers.create({
                duration: 250,
                repeat: 24,
                onTick: () => {
                    let c = colors[index];
                    cam.tint.color.setRGB(c.r, c.g, c.b);
                    index++;
                    if (index >= colors.length) {
                        index = 0;
                    }
                }
            });
// are we tripping-ljud
            this.timers.create({
                duration: 1000,
                onTick: function () {
                    var sound = this.application.sounds.sound.get("sound_arewetripping");
                    sound.volume = 0.9;
                    sound.play();
                }.bind(this)
            });


            // Svamptimer hur länge den ska hålla på
            this.timers.create({
                duration: 7000,
                onComplete: function () {
                    this.timers.remove(fadeTimer);
                    cam.tint.opacity = 0;
                    cam.wavy = false;
                }
            });
        }
    }.bind(this));


    this.weeds.forEachMember(function (weed) {
        rune.physics.Space.separate(this.flower, weed);
        if (this.flower.hitTestObject(weed) && weed.canHit) {
            this.flower.flowerDamage(2);
            this.flower.flicker.start();
            weed.canHit = false;
            this.timers.create({
                duration: 2000,
                onTick: function () {
                    weed.canHit = true;
                }
            })
        }

        //HÄR LIGGER DET
        this.fairies.forEachMember(function (fairy) {

            rune.physics.Space.separate(fairy, weed);



        }.bind(this))
    }.bind(this));


    this.lightballs.forEachMember(function (ball) {
        if (ball.isDead) {
            this.lightballs.removeMember(ball);
        }

        // Såhär gör man om man använder display group för att at bort går inte med vanlig array
        this.allThorns.forEachMember(function (thorn) {
            if (ball.hitTestObject(thorn)) {
                this.allThorns.removeMember(thorn);
                this.lightballs.removeMember(ball);
                this.fairies.forEachMember(function (fairy) {
                    if (fairy.isStuck == true && fairy.hitTestObject(thorn)) {

                        fairy.isStuck = false;
                    }
                });


                return false;
            }
        }.bind(this));


        this.weeds.forEachMember(function (weed) {
            if (ball.hitTestObject(weed)) {
                weed.hp--;

                // Glitter när ett ogräs dör
                if (weed.hp == 0) {
                    this.stage.addChild(weed.emitter);
                    weed.emitter.emit(30);
                    this.weeds.removeMember(weed);
                }

                var originalColor = rune.color.Color24.fromHex("4b692f");
                var hitColor = rune.color.Color24.fromHex("ac2828");
                weed.texture.replaceColor(originalColor, hitColor);
                this.timers.create({
                    duration: 200,
                    onTick: function () {
                        weed.texture.replaceColor(hitColor, originalColor);
                    }
                });
                this.lightballs.removeMember(ball);
                this.score++
                console.log(this.score);
            }

        }.bind(this));

        this.mushrooms.forEachMember(function (mushroom) {
            rune.physics.Space.separate(this.flower, mushroom);
            if (ball.hitTestObject(mushroom)) {
                this.mushrooms.removeMember(mushroom);
                this.lightballs.removeMember(ball);
                this.score++;

                console.log(this.score);
            }
        }.bind(this));

        // bigboss
        this.bossWeeds.forEachMember(function (bossWeed) {
            console.log(" bossWeed");
            if (ball.hitTestObject(bossWeed)) {

                this.lightballs.removeMember(ball);
                bossWeed.hp--;
                this.camera.shake.start(300, 1, 1);

                var originalColor = rune.color.Color24.fromHex("4b692f");
                var hitColor = rune.color.Color24.fromHex("ac2828");
                bossWeed.texture.replaceColor(originalColor, hitColor);
                this.timers.create({
                    duration: 200,
                    onTick: function () {
                        bossWeed.texture.replaceColor(hitColor, originalColor);
                    }
                });
            }

            if (bossWeed.hp == 0) {
                var weed1 = new Weed(bossWeed.x, bossWeed.y);
                var weed2 = new Weed(bossWeed.x + 10, bossWeed.y + 10);

                this.weeds.addMember(weed1);
                this.weeds.addMember(weed2);

                this.bossWeeds.removeMember(bossWeed);

              
                    var sound = this.application.sounds.sound.get("sound_teamwork");
                    sound.volume = 0.9;
                    sound.play();

                this.score++;
            }
        }.bind(this));

    }.bind(this));



    this.bossWeeds.forEachMember(function (bossWeed) {
        rune.physics.Space.separate(this.flower, bossWeed);
    }.bind(this));

    this.allThorns.forEachMember(function (thorn) {
        rune.physics.Space.separate(this.flower, thorn);
    }.bind(this));

    console.log(this.lightballs.numMembers)


    // Skottlogik (tilläggning på scen)
    if (this.gamepads.get(0).justPressed(2)) {
        if (this.filippa.isStuck == false) {
            if (this.filippa.powerUpShooting) {
                var balls = this.filippa.shootPowerUp();
                for (let i = 0; i < balls.length; i++) {
                    this.lightballs.addMember(balls[i]);
                }
            } else {
                var ball = this.filippa.shoot();
                this.lightballs.addMember(ball);
            }

        }

    }

    if (this.gamepads.get(1).justPressed(2)) {
        if (this.sol.isStuck == false) {
            if (this.sol.powerUpShooting) {
                var balls = this.sol.shootPowerUp();
                for (let i = 0; i < balls.length; i++) {
                    this.lightballs.addMember(balls[i]);
                }
            } else {
                var ball = this.sol.shoot();
                this.lightballs.addMember(ball);
            }
        }


    }

    // Med tangentbord
    /*
    if (this.keyboard.justPressed("SPACE")) {
        const ball = this.filippa.shoot();
       this.lightballs.addMember(ball);
    }
    
    if (this.keyboard.justPressed("SPACE")) {
        const ball = this.sol.shoot();
       this.lightballs.addMember(ball);
    }
    */
    this.handleThorns();
    this.handleWaterdroplets();
    this.handlePowerups();


};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
projektkurs2.scene.Game.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};