import { IListResult } from "../interface/IListResult";

export class ListResultDto<T> implements IListResult<T> {
  readonly items: ReadonlyArray<T>;

  constructor(items: ReadonlyArray<T>) {
    this.items = items
  }
}