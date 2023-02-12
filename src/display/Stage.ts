import { Matrix } from "./Matrix";
import { TileEntity } from "./TileEntity";

/**
 * ...
 * @author Kenny Lerma
 */
 export class Stage 
 {
    private _canvas:HTMLCanvasElement;
    private _ctx:CanvasRenderingContext2D;
    private _mat:Matrix;
    private _tiles:Array<TileEntity> = [];
    private _prevTime:number;
    private _frameRate:number = 60;

    private _requestAnimationFrame:Function =
			window["requestAnimationFrame"]       ||
			window["webkitRequestAnimationFrame"] ||
			window["mozRequestAnimationFrame"]    ||
			window["oRequestAnimationFrame"] ||
			window["msRequestAnimationFrame"] ||
			function(callback:Function):void {
				window["setTimeout"](callback, 1000 / 60);
			};

    constructor()
	{
        this._canvas = document.createElement('canvas') as HTMLCanvasElement;
        this._canvas.id = 'canvas';
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._canvas.style.backgroundColor = 'rgba(153,229,255,1)';
        
        document.body.appendChild(this._canvas);

        this._ctx = this._canvas.getContext("2d") as CanvasRenderingContext2D;
        this._mat = new Matrix();

        this._prevTime = window.performance.now();

        setTimeout(this.onUpdate);
    }

    public get canvas():HTMLCanvasElement
    {
        return this._canvas;
    }

    public addChild = (tile:TileEntity):void =>
    {
        this._tiles.push(tile);
    }

    public removeChildren = ():void =>
    {
        this._tiles = [];
    }

    public get width():number
    {
        return this._canvas.width;
    }

    public get height():number
    {
        return this._canvas.height;
    }

    private onUpdate = ():void =>
    {
        requestAnimationFrame.call(window, this.onUpdate);

        var ctx:CanvasRenderingContext2D = this._ctx
        var mat:Matrix = this._mat;
        var fpsInterval:number = 1000 / this._frameRate;
        var now:number = window.performance.now();
        var elapsed:number = now - this._prevTime;

        if (elapsed >= fpsInterval)
        {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

            this._tiles.forEach(function(tile)
            {
                tile.render(ctx, mat);
            });

            
            this._prevTime = now - (elapsed % fpsInterval);
        }
    }

 }