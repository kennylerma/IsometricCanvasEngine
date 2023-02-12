"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
        this.delegate = document.createDocumentFragment();
    }
    EventDispatcher.prototype.addEventListener = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.delegate.addEventListener.apply(this.delegate, args);
    };
    EventDispatcher.prototype.dispatchEvent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.delegate.dispatchEvent.apply(this.delegate, args);
    };
    EventDispatcher.prototype.removeEventListener = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.delegate.removeEventListener.apply(this.delegate, args);
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;
