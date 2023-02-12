"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
/**
 * ...
 * @author Kenny Lerma
 */
var Matrix = /** @class */ (function () {
    function Matrix(a, b, c, d, tx, ty) {
        var _this = this;
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
        this.clone = function () {
            return new Matrix(_this.a, _this.b, _this.c, _this.d, _this.tx, _this.ty);
        };
        this.concat = function (m) {
            _this.t0 = _this.a;
            _this.a = _this.a * m.a + _this.b * m.c;
            _this.b = _this.t0 * m.b + _this.b * m.d;
            _this.t0 = _this.c;
            _this.c = _this.c * m.a + _this.d * m.c;
            _this.d = _this.t0 * m.b + _this.d * m.d;
            _this.t0 = _this.tx;
            _this.tx = _this.tx * m.a + _this.ty * m.c + m.tx;
            _this.ty = _this.t0 * m.b + _this.ty * m.d + m.ty;
        };
        //console.log("Matrix");
    }
    return Matrix;
}());
exports.Matrix = Matrix;
