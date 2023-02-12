"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
/**
 * ...
 * @author Kenny Lerma
 */
var Renderer = /** @class */ (function () {
    function Renderer() {
        this.render = function (image, ctx, mat) {
            ctx.setTransform(mat.a, mat.b, mat.c, mat.d, mat.tx, mat.ty);
            ctx.drawImage(image, 0, 0);
        };
        //console.log("Renderer");
    }
    Object.defineProperty(Renderer, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    return Renderer;
}());
exports.Renderer = Renderer;
