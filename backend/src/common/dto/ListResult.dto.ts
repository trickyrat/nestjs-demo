import { ApiProperty } from "@nestjs/swagger";
import { IListResult } from "../interface/IListResult";

export class ListResultDto<T> implements IListResult<T> {
  @ApiProperty()
  readonly items: ReadonlyArray<T>;

  constructor(items: ReadonlyArray<T>) {
    this.items = items
  }
}