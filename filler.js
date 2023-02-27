"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fill = void 0;
class Fill {
    constructor(filler) {
        this.filler = filler;
    }
    fill(key, value) {
        this.filler[key] = value;
    }
}
exports.Fill = Fill;
