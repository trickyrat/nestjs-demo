import { ApiProperty, ApiResponse } from "@nestjs/swagger";
import { IHasTotalCount } from "../interface/IHasTotalCount";
import { IListResult } from "../interface/IListResult";
import { IPagedResult } from "../interface/IPagedResult";
import { ListResultDto } from "./ListResult.dto";

export class PagedResultDto<T> extends ListResultDto<T> implements IHasTotalCount, IPagedResult<T>, IListResult<T> {
  @ApiProperty()
  totalCount: number;
  constructor(items: ReadonlyArray<T>, totalCount: number,) {
    super(items);
    this.totalCount = totalCount;
  }
}