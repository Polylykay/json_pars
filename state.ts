type Status = 'parsing' | 'waiting'
interface AppState{
  status: Status
}
interface Action {
  name: string;
  payload: any
}
export const createUpdateStateAction  = (payload: Status): Action => {
  return {name:'UPDATE_STATE', payload}
}

export class Reducer{
  reduce(state: AppState, action: Action): AppState {
    switch (action.name) {
      case 'UPDATE_STATE':
        return {...state, status: action.payload}
      default:
        return {...state}
    }
  }
}
export class Store{
  state: AppState = {status: "waiting"}
  constructor(private reducer: Reducer) {
  }
  dispatch(action: Action) {
    this.state = this.reducer.reduce(this.state, action)
  }
}
interface ParseState {
  parseNext(char: string): ParseState;
}
export class ObjOpenedState implements ParseState{
  str: string | null = null
  entries: string[][] = []
  parseNext(char: string): ParseState {
    if (char === '"' && this.str === null) {
      this.str = ''
      return this;
    }
    if (char === '"' && this.str !== null) {
      if (this.entries[this.entries.length - 1]?.length === 1) {
        this.entries[this.entries.length - 1].push(this.str)
      } else {
        this.entries.push([this.str])
      }
      this.str = null
      return this;
    }
    if (char === '}' && this.str === null) {
      let obj: any = {}
      for (const [key, value] of this.entries) {
        obj[key] = value
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
      this.str += char
      return this;
    }
    if (!isNaN(+char)) {
      return this
    }
    return new InvalidParseState();
  }
}
export class FinishedParseState implements ParseState{
  value!: Object
  constructor(value: Object) {this.value = value }
  parseNext(char: string): ParseState {
    return new InvalidParseState().parseNext(char)
  }
}
export class InvalidParseState implements ParseState{
  parseNext(char: string): ParseState {
    throw new Error()
  }
}
export class NotStartedState implements ParseState {
  parseNext(char: string): ParseState {
    if (char == '{') {
      return new ObjOpenedState();
    } else {
      return new InvalidParseState();
    }
  }
}
