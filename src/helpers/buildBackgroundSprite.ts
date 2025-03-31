import Sprite from "@objects/sprite"

const buildBackgroundSprite = (mapKey: string): Sprite => {

    const src = `/assets/maps/${mapKey}/background.png`;
    return new Sprite(src);
}

export default buildBackgroundSprite;