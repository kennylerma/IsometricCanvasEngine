"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var Sprite_1 = require("./display/Sprite");
var Stage_1 = require("./display/Stage");
var TileEntity_1 = require("./display/TileEntity");
/**
 * ...
 * @author Kenny Lerma
 */
var Main = /** @class */ (function () {
    function Main() {
        var _this = this;
        this._tiles = [];
        this._gridWidth = 500;
        this._gridHeight = 500;
        this.gridSize = function (width, height) {
            _this._gridWidth = width;
            _this._gridHeight = height;
            _this._stage.removeChildren();
            _this._tiles.forEach(function (tile) {
                tile.destroy();
            });
            _this._tiles = [];
            _this.setup();
        };
        this.setup = function (e) {
            if (e === void 0) { e = null; }
            _this._tileBitmap.removeEventListener("loaded", _this.setup);
            if (!_this._stage)
                _this._stage = new Stage_1.Stage();
            var rowsX = Math.floor(_this._gridWidth / 44);
            var rowsY = Math.floor(_this._gridHeight / 44);
            var rowsDiff = (rowsX - rowsY);
            var total = rowsX * rowsY;
            var w = rowsX * 44;
            var h = rowsY * 44;
            var center = (window.innerWidth / 2) - 38;
            center -= (rowsDiff * 44) / 2;
            var xPos = center;
            var yPos = 100;
            var countX = 1;
            var countY = 1;
            var row = 0;
            var isFirstRow = true;
            var isLastRow = false;
            // add tiles
            for (var i = 0; i < total; i++) {
                var tile = new TileEntity_1.TileEntity(i, _this._tileBitmap.clone(), _this._stage.canvas);
                tile.addEventListener("click", _this.handleTileSelected);
                _this._tiles.push(tile);
                if (isFirstRow || countX == 1 || countX == rowsX || isLastRow) {
                    tile.setColor('green');
                }
                else {
                    tile.setColor('gray');
                }
                tile.x = xPos - (row * 36);
                tile.y = yPos + (row * 18);
                _this._stage.addChild(tile);
                xPos += 40;
                yPos += 18;
                if (countY <= rowsY) {
                    if (countX == rowsX) {
                        countX = 1;
                        countY++;
                        row++;
                        xPos = center;
                        yPos = 100;
                    }
                    else {
                        countX++;
                    }
                }
                if (!isLastRow && countY == rowsY)
                    isLastRow = true;
                if (isFirstRow && countX == rowsX)
                    isFirstRow = false;
            }
        };
        this.handleTileSelected = function (e) {
            _this._tiles.forEach(function (tile) {
                if (tile.index != e.detail) {
                    tile.selected = false;
                }
            });
        };
        // load tile asset
        this._tileBitmap = new Sprite_1.Sprite("assets/IsoTile.png");
        this._tileBitmap.addEventListener("loaded", this.setup);
        this._tileBitmap.load();
    }
    return Main;
}());
exports.Main = Main;
window['app'] = new Main(); // lets kick this thing off.
