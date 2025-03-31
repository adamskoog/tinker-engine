import { KEYS } from '@/constants';
import { setupEvents } from '@/events';

import { setupEnvironment, setupMap, setupPlayer } from '@helpers/loadHelpers';
import "@/style.css";

const isDebugging = import.meta.env.VITE_IS_DEBUG === "1";

// Setup our environments
const { canvas, context } = setupEnvironment();
const map = await setupMap(context, { isDebugging });
const player = setupPlayer(context);
const keys = setupEvents();

animate();

// Make sure canvas element has focus for key bindings.
canvas.focus();

// Setup main animation loop
function animate() {

    // Clear the map to prepare for redraw.
    map.clear();

    // We need to draw our current map/player/enemies. Drawing
    // these in the correct order is import so things are layered
    // correct to enforce the correct perspective.
    // Draw the map background images
    map.drawBackground();

    // Draw current player position.
    player.draw();

    // Draw forground images
    map.drawForeground();

    // stop current player movement
    player.stop();

    // determine if player is moving/direction.
    if (keys.up.pressed && keys.lastKey === KEYS.up) {
        map.moveUp(player.location);
        player.moveUp();
    } else if (keys.down.pressed && keys.lastKey === KEYS.down) {
        map.moveDown(player.location);
        player.moveDown();
    } else if (keys.left.pressed && keys.lastKey === KEYS.left) {
        map.moveLeft(player.location);
        player.moveLeft();
    } else if (keys.right.pressed && keys.lastKey === KEYS.right) {
        map.moveRight(player.location);
        player.moveRight();
    }

    // Get the next animation frame - this calls animate
    // recursively so we continue looping.
    requestAnimationFrame(animate)
}
