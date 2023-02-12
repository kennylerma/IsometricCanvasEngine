import { Sprite } from "./Sprite";
import { Matrix } from "./Matrix";
import { Renderer } from "./Renderer";
import { EventDispatcher } from "../events/EventDispatcher";

/**
 * ...
 * @author Kenny Lerma
 */
 export class TileEntity extends EventDispatcher
 {
    private _image:Sprite;
    private _mat:Matrix;
    private _mainCanvas:HTMLCanvasElement;
    private _index:number;
    private _originalColor:string = '';
    private _currentColor:string = '';
    private _isSelected:boolean = false;

    constructor(index:number, bm:Sprite, mainCanvas:HTMLCanvasElement)
	{
		super();

        //console.log("TileEntity");
        this._index = index;
        this._mat = new Matrix();
        this._image = bm;

        this._mainCanvas = mainCanvas;
        this._mainCanvas.addEventListener("mousemove", this.handleMouseMove);
        this._mainCanvas.addEventListener("click", this.handleMouseClick);
    }

    public destroy = ():void =>
    {
        this._mainCanvas.removeEventListener("mousemove", this.handleMouseMove);
        this._mainCanvas.removeEventListener("click", this.handleMouseClick);
        this._mainCanvas = null;
    }

    public get index():number
    {
        return this._index;
    }

    public get selected():boolean
    {
        return this._isSelected;
    }

    public set selected(v:boolean)
    {
        this._isSelected = false;
        this.setColor(this._originalColor);
    }

    public get x():number  { return this._mat.tx }
		
    public set x(v:number)
    {
        this._mat.tx = v;
    }
    
    public get y():number  { return this._mat.ty }
    
    public set y(v:number)
    {
        this._mat.ty = v;
    }

    public get matrix():Matrix { return this._mat }

    public setColor = (color:string):void =>
    {
        if (this._originalColor == "") this._originalColor = color;
        if (this._currentColor == "" || color != this._currentColor)
        {
            this._image.setColor(color);
            this._currentColor = color;
        }
    }

    // must use arrow syntax to be able to access private variables. :(
    public render = (ctx:CanvasRenderingContext2D, mat:Matrix):void =>
    {
        var concatMatrix:Matrix = mat.clone();
        concatMatrix.concat(this._mat);
        Renderer.instance.render(this._image.data, ctx, concatMatrix);
    }

    private handleMouseMove = (e:MouseEvent):void =>
    {
        let posX = (e.pageX - this._mainCanvas.offsetLeft);
        let posY = (e.pageY - this._mainCanvas.offsetTop);

        let minx = this.x;
        let maxx = this.x + 37;
        let miny = this.y;
        let maxy = this.y + 15;

        let minx_b = this.x + 41;
        let maxx_b = this.x + 75;
        let miny_b = this.y + 16;
        let maxy_b = this.y + 34;

        // get percentage of travel in x and y ranges
        let xPercent = this.percentage(posX, minx, maxx);
        let yPercent = this.percentage(posY, miny, maxy);
        let xPercent_b = this.percentage(posX, minx_b, maxx_b);
        let yPercent_b = this.percentage(posY, miny_b, maxy_b);
        // amount of travel in the x and y coordinates
        let xDiff = maxx - minx;
        let yDiff = maxy - miny;

        // use the x and y range percentage to determine the amount of allowed travel within the x and y range. 
        let targetY = Math.abs((xPercent * yDiff) - maxy);
        let targetX = Math.abs((yPercent / xDiff) + this.x);
        let targetY_b = Math.abs((xPercent_b * yDiff) - maxy_b);
        let targetX_b = Math.abs((yPercent_b * xDiff) + maxx_b);
        let targetY_c = Math.abs((xPercent_b * yDiff) + maxy_b); // we only want the surface and not the sides

        if (posY >= targetY && posX >= targetX && posY <= targetY_b && posX <= targetX_b 
            && (posX > minx && posY < (targetY_c)))
        {
            this._currentColor = this._isSelected ? "red" : this._originalColor;
            this.setColor(this._currentColor + "Highlight");
        }
        else
        {
            this.setColor(this._isSelected ? "red" : this._originalColor);
        }
    }

    private handleMouseClick = (e:MouseEvent):void =>
    {
        if (this._currentColor == this._originalColor + "Highlight")
        {
            this.setColor("redHighlight");
            this._isSelected = true;
            const evt = new CustomEvent('click', {detail: this._index});
            this.dispatchEvent(evt);
        }
    }

    private percentage = (X:number, minValue:number, maxValue:number ):number =>
    {
        return (X - minValue)/(maxValue - minValue);
    }
 }