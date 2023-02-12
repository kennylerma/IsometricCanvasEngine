"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileEntity = void 0;
var Matrix_1 = require("./Matrix");
var Renderer_1 = require("./Renderer");
var EventDispatcher_1 = require("../events/EventDispatcher");
/**
 * ...
 * @author Kenny Lerma
 */
var TileEntity = /** @class */ (function (_super) {
    __extends(TileEntity, _super);
    function TileEntity(index, bm, mainCanvas) {
        var _this = _super.call(this) || this;
        _this._originalColor = '';
        _this._currentColor = '';
        _this._isSelected = false;
        _this.destroy = function () {
            _this._mainCanvas.removeEventListener("mousemove", _this.handleMouseMove);
            _this._mainCanvas.removeEventListener("click", _this.handleMouseClick);
            _this._mainCanvas = null;
        };
        _this.setColor = function (color) {
            if (_this._originalColor == "")
                _this._originalColor = color;
            if (_this._currentColor == "" || color != _this._currentColor) {
                _this._image.setColor(color);
                _this._currentColor = color;
            }
        };
        // must use arrow syntax to be able to access private variables. :(
        _this.render = function (ctx, mat) {
            var concatMatrix = mat.clone();
            concatMatrix.concat(_this._mat);
            Renderer_1.Renderer.instance.render(_this._image.data, ctx, concatMatrix);
        };
        _this.handleMouseMove = function (e) {
            var posX = (e.pageX - _this._mainCanvas.offsetLeft);
            var posY = (e.pageY - _this._mainCanvas.offsetTop);
            var minx = _this.x;
            var maxx = _this.x + 37;
            var miny = _this.y;
            var maxy = _this.y + 15;
            var minx_b = _this.x + 41;
            var maxx_b = _this.x + 75;
            var miny_b = _this.y + 16;
            var maxy_b = _this.y + 34;
            // get percentage of travel in x and y ranges
            var xPercent = _this.percentage(posX, minx, maxx);
            var yPercent = _this.percentage(posY, miny, maxy);
            var xPercent_b = _this.percentage(posX, minx_b, maxx_b);
            var yPercent_b = _this.percentage(posY, miny_b, maxy_b);
            // amount of travel in the x and y coordinates
            var xDiff = maxx - minx;
            var yDiff = maxy - miny;
            // use the x and y range percentage to determine the amount of allowed travel within the x and y range. 
            var targetY = Math.abs((xPercent * yDiff) - maxy);
            var targetX = Math.abs((yPercent / xDiff) + _this.x);
            var targetY_b = Math.abs((xPercent_b * yDiff) - maxy_b);
            var targetX_b = Math.abs((yPercent_b * xDiff) + maxx_b);
            var targetY_c = Math.abs((xPercent_b * yDiff) + maxy_b); // we only want the surface and not the sides
            if (posY >= targetY && posX >= targetX && posY <= targetY_b && posX <= targetX_b
                && (posX > minx && posY < (targetY_c))) {
                _this._currentColor = _this._isSelected ? "red" : _this._originalColor;
                _this.setColor(_this._currentColor + "Highlight");
            }
            else {
                _this.setColor(_this._isSelected ? "red" : _this._originalColor);
            }
        };
        _this.handleMouseClick = function (e) {
            if (_this._currentColor == _this._originalColor + "Highlight") {
                _this.setColor("redHighlight");
                _this._isSelected = true;
                var evt = new CustomEvent('click', { detail: _this._index });
                _this.dispatchEvent(evt);
            }
        };
        _this.percentage = function (X, minValue, maxValue) {
            return (X - minValue) / (maxValue - minValue);
        };
        //console.log("TileEntity");
        _this._index = index;
        _this._mat = new Matrix_1.Matrix();
        _this._image = bm;
        _this._mainCanvas = mainCanvas;
        _this._mainCanvas.addEventListener("mousemove", _this.handleMouseMove);
        _this._mainCanvas.addEventListener("click", _this.handleMouseClick);
        return _this;
    }
    Object.defineProperty(TileEntity.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TileEntity.prototype, "selected", {
        get: function () {
            return this._isSelected;
        },
        set: function (v) {
            this._isSelected = false;
            this.setColor(this._originalColor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TileEntity.prototype, "x", {
        get: function () { return this._mat.tx; },
        set: function (v) {
            this._mat.tx = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TileEntity.prototype, "y", {
        get: function () { return this._mat.ty; },
        set: function (v) {
            this._mat.ty = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TileEntity.prototype, "matrix", {
        get: function () { return this._mat; },
        enumerable: false,
        configurable: true
    });
    return TileEntity;
}(EventDispatcher_1.EventDispatcher));
exports.TileEntity = TileEntity;
