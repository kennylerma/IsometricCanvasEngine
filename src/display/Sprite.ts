import { EventDispatcher } from "../events/EventDispatcher";
import { Matrix } from "./Matrix";


/**
 * ...
 * @author Kenny Lerma
 */
 export class Sprite extends EventDispatcher
 {
    private _image:HTMLImageElement;
    private _imageCanvas:HTMLCanvasElement;
    private _ctx:CanvasRenderingContext2D;
    private _src:string;
    private _mat:Matrix;

    constructor(src:string)
	{
        super();
        
        this._src = src;
        this._image = new Image();
    }

    public load = ():void =>
    {
        this._image.addEventListener("load", this.handleImageLoaded);
        this._image.src = this._src;
    }

    public get data ():HTMLCanvasElement
    {
        return this._imageCanvas;
    }

    public clone = ():Sprite =>
    {
        var cloneSprite:Sprite = new Sprite(this._src);
        cloneSprite.canvas = document.createElement("canvas") as HTMLCanvasElement;
        cloneSprite.canvas.width = 78;
        cloneSprite.canvas.height = 59;
        cloneSprite.image = this._image;
		
        cloneSprite.ctx = cloneSprite.canvas.getContext("2d") as CanvasRenderingContext2D;
        
        return cloneSprite;
    }

    public set image(value:HTMLImageElement)
    {
        this._image = value;
    }

    public get image():HTMLImageElement
    {
        return this._image;
    }

    public set canvas(value:HTMLCanvasElement)
    {
        this._imageCanvas = value;
    }

    public get canvas():HTMLCanvasElement
    {
        return this._imageCanvas;
    }

    public set ctx(value:CanvasRenderingContext2D)
    {
        this._ctx = value;
    }

    public get ctx():CanvasRenderingContext2D
    {
        return this._ctx;
    }

    public setColor(color:string):void
    {
        this._ctx.clearRect(0, 0, this._imageCanvas.width, this._imageCanvas.height);

        switch (color) {
            case 'gray':
                this._ctx.drawImage(this._image, 0, 0);
                break;

            case 'red':
                this._ctx.drawImage(this._image, -78, 0);
                break;

            case 'green':
                this._ctx.drawImage(this._image, -156, 0);
                break;

            case 'grayHighlight':
                this._ctx.drawImage(this._image, -234, 0);
                break;

            case 'redHighlight':
                this._ctx.drawImage(this._image, -312, 0);
                break;

            case 'greenHighlight':
                this._ctx.drawImage(this._image, -390, 0);
                break;
        }
    }

    private handleImageLoaded = (e:Event):void =>
    {
        this._imageCanvas = document.createElement("canvas") as HTMLCanvasElement;
        this._imageCanvas.width = 78;
        this._imageCanvas.height = 59;
		this._ctx = this._imageCanvas.getContext("2d") as CanvasRenderingContext2D;
        this._ctx.drawImage(this._image, 0, 0);

        this.dispatchEvent(new Event("loaded"));
    }
 }