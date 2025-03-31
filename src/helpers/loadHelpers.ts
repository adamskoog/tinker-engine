import Map, { MapConfig } from '@objects/map';
import Player from '@objects/player';

import buildPlayerSprite from '@helpers/buildPlayerSprite';

import MapsData from '@data/maps.json';

const defaultMapWdidth: number = 1024;
const defaultMapHeight: number = 576;

type Environment = {
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
}

export const setupEnvironment = (): Environment => {
    const canvas = document.querySelector('canvas');

    if (!canvas) throw Error("Canvas element not found");

    canvas.width = defaultMapWdidth;
    canvas.height = defaultMapHeight;

    const context = canvas.getContext('2d');
    if (!context) throw Error("Not able to get 2D context of canvas element");

    return { canvas, context };
}

type MapOptions = {
    key?: string | undefined,
    isDebugging: boolean
}

export const setupMap = async (context: CanvasRenderingContext2D, options: MapOptions): Promise<Map> => {
  
    const isDebug = options && options.isDebugging;
    const map = new Map(context, isDebug);

    let mapData: MapConfig = MapsData[0];
    if (options && options.key) {
        mapData = MapsData.find(map => map.key === options.key) as MapConfig;
    }

    await map.setMap(mapData);

    return map;
}

export const setupPlayer = (context: CanvasRenderingContext2D): Player => {
    const playerSprite = buildPlayerSprite();
    const player = new Player(context);
    player.setCharacter(playerSprite);

    return player;
}