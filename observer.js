"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observable = void 0;
class Observable {
    constructor(value) {
        this.value = value;
        this._observers = [];
    }
    subscribe(observer) {
        this._observers.push(observer);
    }
    unsubscribe(observer) {
        const index = this._observers.indexOf(observer);
        this._observers.splice(index, 1);
    }
    next(value) {
        this.value = value;
        for (const observer of this._observers) {
            observer(value);
        }
    }
}
exports.Observable = Observable;
