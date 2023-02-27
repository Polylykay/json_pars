"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserBuilder = void 0;
const parser_1 = require("./parser");
const filler_1 = require("./filler");
const state_1 = require("./state");
class ParserBuilder {
    setFiller(filler) {
        this.filler = (filler || new filler_1.Fill({}));
        return this;
    }
    setStore(store) {
        this.store = (store || new state_1.Store(new state_1.Reducer()));
        return this;
    }
    build() {
        return new parser_1.Parser(this);
    }
}
exports.ParserBuilder = ParserBuilder;
