"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserFacade = exports.Parser = void 0;
const state_1 = require("./state");
const observer_1 = require("./observer");
const builder_1 = require("./builder");
const fetcher_1 = require("./fetcher");
class Parser {
    constructor(item) {
        this.store = item.store;
        this.filler = item.filler;
    }
    parseJson(json) {
        const observable = new observer_1.Observable(null);
        const parsingAction = (0, state_1.createUpdateStateAction)('parsing');
        this.store.dispatch(parsingAction);
        let state = new state_1.NotStartedState();
        for (const str of json) {
            state = state.parseNext(str);
        }
        console.log(state);
        if (state instanceof state_1.FinishedParseState) {
            for (const entry of Object.entries(state.value)) {
                this.filler.fill(entry[0], entry[1]);
            }
            observable.next(this.filler.filler);
            const waitingAction = (0, state_1.createUpdateStateAction)('waiting');
            this.store.dispatch(waitingAction);
        }
        return observable;
    }
}
exports.Parser = Parser;
class ParserFacade {
    constructor() {
        this.parser = new builder_1.ParserBuilder().setFiller().setStore().build();
    }
    parse(json) {
        return this.parser.parseJson(json);
    }
}
exports.ParserFacade = ParserFacade;
let str = new fetcher_1.JSONFetcherFactory().getJSONFetcher().fetchJSON();
const obs = new ParserFacade().parse(str);
obs.subscribe((a) => console.log(a));
