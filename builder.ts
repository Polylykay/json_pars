import {Parser} from "./parser";
import {Fill, FillStrategy} from "./filler";
import {Reducer, Store} from "./state";

export class ParserBuilder{
  filler!: FillStrategy
  store!: Store
  setFiller(filler?: FillStrategy) {
    this.filler = (filler || new Fill({}))
    return this
  }
  setStore(store?: Store){
    this.store = (store|| new Store(new Reducer()))
    return this
  }
  build() {
    return new Parser(this)
  }
}
