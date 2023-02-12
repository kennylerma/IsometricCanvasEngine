"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stage = void 0;
var Matrix_1 = require("./Matrix");
/**
 * ...
 * @author Kenny Lerma
 */
var Stage = /** @class */ (function () {
    function Stage() {
        var _this = this;
        this._tiles = [];
        this._frameRate = 60;
        this._requestAnimationFrame = window["requestAnimationFrame"] ||
            window["webkitRequestAnimationFrame"] ||
            window["mozRequestAnimationFrame"] ||
            window["oRequestAnimationFrame"] ||
            window["msRequestAnimationFrame"] ||
            function (callback) {
                window["setTimeout"](callback, 1000 / 60);
            };
        this.addChild = function (tile) {
            _this._tiles.push(tile);
        };
        this.removeChildren = function () {
            _this._tiles = [];
        };
        this.onUpdate = function () {
            requestAnimationFrame.call(window, _this.onUpdate);
            var ctx = _this._ctx;
            var mat = _this._mat;
            var fpsInterval = 1000 / _this._frameRate;
            var now = window.performance.now();
            var elapsed = now - _this._prevTime;
            if (elapsed >= fpsInterval) {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, _this._canvas.width, _this._canvas.height);
                _this._tiles.forEach(function (tile) {
                    tile.render(ctx, mat);
                });
                _this._prevTime = now - (elapsed % fpsInterval);
            }
        };
        this._canvas = document.createElement('canvas');
        this._canvas.id = 'canvas';
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._canvas.style.backgroundColor = 'rgba(153,229,255,1)';
        document.body.appendChild(this._canvas);
        this._ctx = this._canvas.getContext("2d");
        this._mat = new Matrix_1.Matrix();
        this._prevTime = window.performance.now();
        setTimeout(this.onUpdate);
    }
    Object.defineProperty(Stage.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "width", {
        get: function () {
            return this._canvas.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "height", {
        get: function () {
            return this._canvas.height;
        },
        enumerable: false,
        configurable: true
    });
    return Stage;
}());
exports.Stage = Stage;
