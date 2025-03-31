import type { Coordinate } from '@/types';

import Boundary from '@objects/boundary';

const buildBoudaries = async (context: CanvasRenderingContext2D, mapKey: string, position: Coordinate): Promise<Boundary[]> => {


    const collisionDataResponse = await fetch(`/assets/maps/${mapKey}/collisions.json`);
    const collisionData = await collisionDataResponse.json();

    // 70 is assume width of map - can we make this generic?
    let collisions = [];
    for (let i = 0; i < collisionData.length; i+= 70) {
        collisions.push(collisionData.slice(i, i + 70));
    }

    const boundaries: Boundary[] = [];
    collisions.forEach((row: any, i: number) => {
        row.forEach((symbol: any, j: number) => {
            if (symbol !== 0) {
                boundaries.push(new Boundary(context, { 
                    x: j * Boundary.width + position.x, 
                    y: i * Boundary.height + position.y 
                }))
            }
        });
    });

    return boundaries;
}

export default buildBoudaries;