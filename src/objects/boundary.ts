import type { Coordinate } from '@/types';
 
class Boundary {
    static readonly width: number = 24;
    static readonly height: number = 24;

    context: CanvasRenderingContext2D;
    position: Coordinate;
    
    constructor(context: CanvasRenderingContext2D, initialPosition: Coordinate) {
        this.context = context;
        this.position = initialPosition;
    }

    public draw(show: boolean = false) {
        if (show) {
            this.context.fillStyle = 'red';
            this.context.fillRect(this.position.x, this.position.y, Boundary.width, Boundary.height);
        }
    }
}

export default Boundary;