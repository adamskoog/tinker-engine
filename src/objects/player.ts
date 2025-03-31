import type { Location } from "@/types";

import Sprite from "@objects/sprite";

type Frames = {
    max: number,
    val: number,
    elapsed: number
}

export type PlayerSprites = {
    up: Sprite,
    down: Sprite,
    left: Sprite,
    right: Sprite
}

class Player {

    static readonly scale: number = .5;

    context: CanvasRenderingContext2D;
    loaded: boolean = false;

    frames: Frames = { max: 4, val: 0, elapsed: 0 };
    location: Location | undefined;
    
    image: Sprite | undefined;
    sprites: PlayerSprites | undefined;

    moving: boolean = false;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    private setLocation(image: Sprite) {
        this.location = {
            x: (this.context.canvas.width / 2) - (image.element.width / 4), 
            y: (this.context.canvas.height / 2) - image.element.height,
            width: (image.element.width / 4) * Player.scale, 
            height: (image.element.height) * Player.scale
        };
    }

    public setCharacter(sprites: PlayerSprites, frames = { max: 4 }) {
        this.sprites = sprites;

        this.frames = { ...frames, val: 0, elapsed: 0 };

        // default player direction
        this.image = this.sprites.down;

        // setup the default player location.
        if (!this.image.loaded) {
            const that = this;
            this.image.element.onload = function () {
                if (!that.image) return;
                that.setLocation(that.image);
            }
        } else {
            this.setLocation(this.image);
        }

        this.loaded = true;
    }

    public moveUp(): void {
        if (!this.sprites) return;

        this.moving = true;
        this.image = this.sprites.up;
    }

    public moveDown(): void {
        if (!this.sprites) return;

        this.moving = true;
        this.image = this.sprites.down;
    }

    public moveLeft(): void {
        if (!this.sprites) return;

        this.moving = true;
        this.image = this.sprites.left;
    }

    public moveRight(): void {
        if (!this.sprites) return;

        this.moving = true;
        this.image = this.sprites.right;
    }

    public stop(): void {
        this.moving = false;
    }

    public draw(): void {
        if (!this.loaded || !this.image || !this.location) return;

        // this.context.fillStyle = 'blue';
        // this.context.fillRect(this.location.x, this.location.y, this.location.width, this.location.height);
 
        this.context.drawImage(
            this.image.element, 
            this.frames.val * (this.image.element.width / 4),
            0,
            this.image.element.width / 4,
            this.image.element.height,
            this.location.x, 
            this.location.y, 
            this.location.width,
            this.location.height
        );

        if (!this.moving) return;

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
        }
    }
}

export default Player;