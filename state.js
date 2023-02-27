"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotStartedState = exports.InvalidParseState = exports.FinishedParseState = exports.ObjOpenedState = exports.Store = exports.Reducer = exports.createUpdateStateAction = void 0;
const createUpdateStateAction = (payload) => {
    return { name: 'UPDATE_STATE', payload };
};
exports.createUpdateStateAction = createUpdateStateAction;
class Reducer {
    reduce(state, action) {
        switch (action.name) {
            case 'UPDATE_STATE':
                return { ...state, status: action.payload };
            default:
                return { ...state };
        }
    }
}
exports.Reducer = Reducer;
class Store {
    constructor(reducer) {
        this.reducer = reducer;
        this.state = { status: "waiting" };
    }
    dispatch(action) {
        this.state = this.reducer.reduce(this.state, action);
    }
}
exports.Store = Store;
class ObjOpenedState {
    constructor() {
        this.str = null;
        this.entries = [];
    }
    parseNext(char) {
        if (char === '"' && this.str === null) {
            this.str = '';
            return this;
        }
        if (char === '"' && this.str !== null) {
            if (this.entries[this.entries.length - 1]?.length === 1) {
                this.entries[this.entries.length - 1].push(this.str);
            }
            else {
                this.entries.push([this.str]);
            }
            this.str = null;
            return this;
        }
        if (char === '}' && this.str === null) {
            let obj = {};
            for (const [key, value] of this.entries) {
                obj[key] = value;
            }
            return new FinishedParseState(obj);
        }
        if (this.str === null) {
            if (char === ':') {
                return this;
            }
            if (char === ',') {
                return this;
            }
        }
        if (this.str !== null) {
            this.str += char;
            return this;
        }
        if (!isNaN(+char)) {
            return this;
        }
        return new InvalidParseState();
    }
}
exports.ObjOpenedState = ObjOpenedState;
class FinishedParseState {
    constructor(value) { this.value = value; }
    parseNext(char) {
        return new InvalidParseState().parseNext(char);
    }
}
exports.FinishedParseState = FinishedParseState;
class InvalidParseState {
    parseNext(char) {
        throw new Error();
    }
}
exports.InvalidParseState = InvalidParseState;
class NotStartedState {
    parseNext(char) {
        if (char == '{') {
            return new ObjOpenedState();
        }
        else {
            return new InvalidParseState();
        }
    }
}
exports.NotStartedState = NotStartedState;
