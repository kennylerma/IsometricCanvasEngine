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
exports.Sprite = void 0;
var EventDispatcher_1 = require("../events/EventDispatcher");
/**
 * ...
 * @author Kenny Lerma
 */
var Sprite = /** @class */ (function (_super) {
    __extends(Sprite, _super);
    function Sprite(src) {
        var _this = _super.call(this) || this;
        _this.load = function () {
            _this._image.addEventListener("load", _this.handleImageLoaded);
            _this._image.src = _this._src;
        };
        _this.clone = function () {
            var cloneSprite = new Sprite(_this._src);
            cloneSprite.canvas = document.createElement("canvas");
            cloneSprite.canvas.width = 78;
            cloneSprite.canvas.height = 59;
            cloneSprite.image = _this._image;
            cloneSprite.ctx = cloneSprite.canvas.getContext("2d");
            return cloneSprite;
        };
        _this.handleImageLoaded = function (e) {
            _this._imageCanvas = document.createElement("canvas");
            _this._imageCanvas.width = 78;
            _this._imageCanvas.height = 59;
            _this._ctx = _this._imageCanvas.getContext("2d");
            _this._ctx.drawImage(_this._image, 0, 0);
            _this.dispatchEvent(new Event("loaded"));
        };
        _this._src = src;
        _this._image = new Image();
        return _this;
    }
    Object.defineProperty(Sprite.prototype, "data", {
        get: function () {
            return this._imageCanvas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "image", {
        get: function () {
            return this._image;
        },
        set: function (value) {
            this._image = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "canvas", {
        get: function () {
            return this._imageCanvas;
        },
        set: function (value) {
            this._imageCanvas = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "ctx", {
        get: function () {
            return this._ctx;
        },
        set: function (value) {
            this._ctx = value;
        },
        enumerable: false,
        configurable: true
    });
    Sprite.prototype.setColor = function (color) {
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
    };
    return Sprite;
}(EventDispatcher_1.EventDispatcher));
exports.Sprite = Sprite;
