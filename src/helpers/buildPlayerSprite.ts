import Sprite from "@objects/sprite"
import type { PlayerSprites } from "@objects/player";

const buildPlayerSprite = (): PlayerSprites => {

    const src = `/assets/player/`;

    const up = new Sprite(`${src}playerUp.png`);
    const down = new Sprite(`${src}playerDown.png`);
    const left = new Sprite(`${src}playerLeft.png`);
    const right = new Sprite(`${src}playerRight.png`);

    return {
        up,
        down,
        left,
        right
    };
}

export default buildPlayerSprite;