import { KEYS } from "@/constants";

type KeyDirection = {
    pressed: boolean
}

type KeyInfo = {
    lastKey: string,
    up: KeyDirection,
    down: KeyDirection,
    left: KeyDirection,
    right: KeyDirection
}

export const setupEvents = (): KeyInfo => {

    let keys: KeyInfo = {
        lastKey: KEYS.down,
        up: { pressed: false },
        down: { pressed: false },
        left: { pressed: false },
        right: { pressed: false }
    };

    window.addEventListener('keydown', (evt) => {

        switch (evt.key) {
            case 'w':
            case 'ArrowUp':
                keys.up.pressed = true;
                keys.lastKey = KEYS.up;
                break;
            case 's':
            case 'ArrowDown':
                keys.down.pressed = true;
                keys.lastKey = KEYS.down;
                break;
            case 'a':
            case 'ArrowLeft':
                keys.left.pressed = true;
                keys.lastKey = KEYS.left;
                break;
            case 'd':
            case 'ArrowRight':
                keys.right.pressed = true;
                keys.lastKey = KEYS.right;
                break;
        }
    });

    window.addEventListener('keyup', (evt) => {

        switch (evt.key) {
            case 'w':
            case 'ArrowUp':
                keys.up.pressed = false;
                break;
            case 's':
            case 'ArrowDown':
                keys.down.pressed = false;
                break;
            case 'a':
            case 'ArrowLeft':
                keys.left.pressed = false;
                break;
            case 'd':
            case 'ArrowRight':
                keys.right.pressed = false;
                break;
        }
    });

    return keys;
}
