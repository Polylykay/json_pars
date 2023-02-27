export interface FillStrategy {
  filler: unknown
  fill(key: string, value: string): void
}

export class Fill implements FillStrategy {
  constructor(public filler: Object | any) {}

  fill(key: string, value: string): void {
    this.filler[key] = value
  }
}
