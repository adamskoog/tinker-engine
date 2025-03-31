import type { Coordinate, Location } from '@/types';

import Boundary from '@objects/boundary';
import Sprite from '@objects/sprite';

import buildBoudaries from '@helpers/buildBoundaries';
import buildBackgroundSprite from '@helpers/buildBackgroundSprite';
import buildForegroundSprite from '@helpers/buildForegroundSprite';

export type MapConfig = {
    key: string,
    title: string,
    startPosition: Coordinate
}

class Map {
    static showBoundary: boolean = false;

    loaded: boolean = false;
    isDebugging: boolean = false;

    context: CanvasRenderingContext2D;

    background: Sprite | undefined;
    foreground: Sprite | undefined;
    boundaries: Boundary[] | undefined;
    position: Coordinate | undefined;
    velocity: number = 2.25;

    constructor(context: CanvasRenderingContext2D, isDebugging: boolean = false) {
        this.context = context;
        this.isDebugging = isDebugging;
    }

    private isColliding(location: Location): boolean {

        if (!this.boundaries) return false;

        for (let i = 0; i < this.boundaries.length; i++) {
            const boundary = this.boundaries[i];

            if (
                location.x + location.width >= boundary.position.x &&
                location.x <= boundary.position.x + Boundary.width &&
                location.y <= boundary.position.y + Boundary.height &&
                location.y + location.height >= boundary.position.y
            ) {
                return true;
            }
        }

        return false;
    }

    private setMapTitle(title: string): void {
        const elem = document.querySelector('.title') as HTMLElement;
        if (elem) {
            elem.innerText = title;
        }
    }

    public setDebug(isDebugging: boolean) {
        this.isDebugging = isDebugging;
    }

    public async setMap(config: MapConfig): Promise<void> {
        const boundaries = await buildBoudaries(this.context, config.key, config.startPosition);

        this.background = buildBackgroundSprite(config.key);
        this.foreground = buildForegroundSprite(config.key);
        this.position = config.startPosition;
        this.boundaries = boundaries;

        this.setMapTitle(config.title);

        this.loaded = true;
    }

    public moveUp(location: Location | undefined) {

        if (!this.position || !this.boundaries || !location) return;

        if (this.isColliding({...location, y: location.y - this.velocity })) return;

        this.position.y += this.velocity

        this.boundaries.forEach(boundary => {
            boundary.position.y += this.velocity;
        })
    }

    public moveDown(location: Location | undefined) {

        if (!this.position || !this.boundaries || !location) return;

        if (this.isColliding({...location, y: location.y + this.velocity })) return;

        this.position.y -= this.velocity

        this.boundaries.forEach(boundary => {
            boundary.position.y -= this.velocity
        })
    }

    public moveLeft(location: Location | undefined) {

        if (!this.position || !this.boundaries || !location) return;

        if (this.isColliding({...location, x: location.x - this.velocity })) return;

        this.position.x += this.velocity

        this.boundaries.forEach(boundary => {
            boundary.position.x += this.velocity;
        })
    }

    public moveRight(location: Location | undefined) {

        if (!this.position || !this.boundaries || !location) return;

        if (this.isColliding({...location, x: location.x + this.velocity })) return;

        this.position.x -= this.velocity

        this.boundaries.forEach(boundary => {
            boundary.position.x -= this.velocity
        })
    }

    public clear() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    public drawBackground() {
        if (!this.loaded) return; 
        
        if (this.background && this.position) {
            this.context.drawImage(this.background.element, this.position.x, this.position.y);
        }

        if (this.boundaries) {
            this.boundaries.forEach(boundary => {
                boundary.draw(this.isDebugging);
            })
        }
    }

    public drawForeground() {
        if (!this.loaded) return; 
        
        if (this.foreground && this.position) {
            this.context.drawImage(this.foreground.element, this.position.x, this.position.y);
        }
    }
}

export default Map;