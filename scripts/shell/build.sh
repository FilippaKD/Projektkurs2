#!/bin/bash


npx google-closure-compiler \
--language_out ECMASCRIPT5_STRICT \
--warning_level DEFAULT \
--compilation_level WHITESPACE_ONLY \
--isolation_mode IIFE \
--js "./../../lib/rune.js" \
--js "./../../src/scope/Manifest.js" \
--js "./../../src/data/resource/Requests.js" \
--js "./../../src/entity/fx/Oscillator.js" \
--js "./../../src/entity/fx/Camera.js" \
--js "./../../src/system/Main.js" \
--js "./../../src/scope/Alias.js" \
--js "./../../src/entity/Entity.js" \
--js "./../../src/entity/fx/Glitter.js" \
--js "./../../src/entity/fairies/Fairy.js" \
--js "./../../src/entity/fairies/Sol.js" \
--js "./../../src/entity/fairies/Filippa.js" \
--js "./../../src/entity/LightBall.js" \
--js "./../../src/entity/enemies/Weed.js" \
--js "./../../src/entity/enemies/BossWeed.js" \
--js "./../../src/entity/enemies/Mushroom.js" \
--js "./../../src/entity/powerups/Waterdroplet.js" \
--js "./../../src/entity/enemies/Thorn.js" \
--js "./../../src/entity/Flower.js" \
--js "./../../src/entity/Watercan.js" \
--js "./../../src/scene/game/GameOver.js" \
--js "./../../src/scene/game/Game.js" \
--js_output_file "./../../dist/projektkurs2.js";