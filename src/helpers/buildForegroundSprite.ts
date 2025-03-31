import Sprite from "@objects/sprite"

const buildForegroundSprite = (mapKey: string): Sprite => {
    const src = `/assets/maps/${mapKey}/foreground.png`;
    return new Sprite(src);
}

export default buildForegroundSprite;