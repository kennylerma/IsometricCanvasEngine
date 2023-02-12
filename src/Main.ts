import { Sprite } from "./display/Sprite";
import { Stage } from "./display/Stage";
import { TileEntity } from "./display/TileEntity";

/**
 * ...
 * @author Kenny Lerma
 */
export class Main 
{
	private _stage:Stage;
    private _tileBitmap:Sprite;
    private _tiles:Array<TileEntity> = [];
    private _gridWidth:number = 500;
    private _gridHeight:number = 500;
    
    constructor()
	{
        // load tile asset
        this._tileBitmap = new Sprite("assets/IsoTile.png");
        this._tileBitmap.addEventListener("loaded", this.setup);
        this._tileBitmap.load();
    }

    public gridSize = (width:number, height:number):void =>
    {
        this._gridWidth = width;
        this._gridHeight = height;
        this._stage.removeChildren();
        this._tiles.forEach(function(tile)
        {
            tile.destroy();
        });
        this._tiles = [];
        this.setup();
    }

    private setup = (e:Event = null):void =>
    {
        this._tileBitmap.removeEventListener("loaded", this.setup);
        
        if (!this._stage) this._stage = new Stage();
        
        let rowsX = Math.floor(this._gridWidth / 44);
        let rowsY = Math.floor(this._gridHeight / 44);
        let rowsDiff = (rowsX - rowsY);
        let total = rowsX * rowsY;

        let w = rowsX * 44;
        let h = rowsY * 44;
        
        let center = (window.innerWidth / 2) - 38;
        center -= (rowsDiff * 44) / 2;

        let xPos = center;
        let yPos = 100;
        let countX = 1;
        let countY = 1;
        let row = 0;
        let isFirstRow = true;
        let isLastRow = false;

        // add tiles
        for (let i = 0; i < total; i++)
        {
            var tile:TileEntity = new TileEntity(i, this._tileBitmap.clone(), this._stage.canvas);
            tile.addEventListener("click", this.handleTileSelected);
            this._tiles.push(tile);

            if (isFirstRow || countX == 1 || countX == rowsX || isLastRow)
            {
                tile.setColor('green');
            }
            else
            {
                tile.setColor('gray');
            }
            
            tile.x = xPos - (row * 36);
            tile.y = yPos + (row * 18);
            this._stage.addChild(tile);

            xPos += 40;
            yPos += 18;

            if (countY <= rowsY)
            {
                if (countX == rowsX)
                {
                    countX = 1;
                    countY++;
                    row++;
                    xPos = center;
                    yPos = 100;
                }
                else
                {
                    countX++;
                }
            }
            
            if (!isLastRow && countY == rowsY) isLastRow = true;
            if (isFirstRow && countX == rowsX) isFirstRow = false;
        }
    }

    private handleTileSelected = (e:CustomEvent):void =>
    {
        this._tiles.forEach(function(tile)
        {
            if (tile.index != e.detail)
            {
                tile.selected = false;
            }
        });
    }
}

window['app'] = new Main();  // lets kick this thing off.