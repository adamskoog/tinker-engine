class Sprite {

    source: string;
    loaded: boolean = false;

    public element: HTMLImageElement;

    constructor(source: string) {
        this.source = source;

        this.element = new Image();
        this.element.src = this.source;
        this.element.onload = () => {
            this.loaded = true;
        }
    }
}

export default Sprite;