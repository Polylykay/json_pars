import {createUpdateStateAction, FinishedParseState, NotStartedState, Store} from "./state";
import {FillStrategy} from "./filler";
import {Observable} from "./observer";
import {ParserBuilder} from "./builder";
import { JSONFetcherFactory } from "./fetcher";

export interface IParser {
  store: Store
  filler: FillStrategy
}
export class Parser implements IParser {
  store!: Store
  filler!: FillStrategy
  constructor(item: IParser) {
    this.store = item.store
    this.filler = item.filler
  }
  parseJson(json: string): Observable {
    const observable = new Observable(null)
    const parsingAction = createUpdateStateAction('parsing')
    this.store.dispatch(parsingAction)
    let state = new NotStartedState()
    for (const str of json) {
      state = state.parseNext(str)
    }
    console.log(state)
    if (state instanceof FinishedParseState) {
      for (const entry of Object.entries(state.value)){
        this.filler.fill(entry[0], entry[1])
      }
      observable.next(this.filler.filler)
      const waitingAction = createUpdateStateAction('waiting')
      this.store.dispatch(waitingAction)
    }
    return observable
  }
}

export class ParserFacade{
  parser = new ParserBuilder().setFiller().setStore().build();
  parse(json: string) {
    return this.parser.parseJson(json)
  }
}
let str = new JSONFetcherFactory().getJSONFetcher().fetchJSON()
const obs = new ParserFacade().parse(str)
obs.subscribe((a: any) => console.log(a))
