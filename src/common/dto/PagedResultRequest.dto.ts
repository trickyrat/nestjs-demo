import { ILimitedResultRequest } from "../interface/ILimitedResultRequest";
import { IPagedResultRequest } from "../interface/IPagedResultRequest";
import { LimitedResultRequestDto } from "./LimitedResultRequest.dto";

export class PagedResultRequestDto extends LimitedResultRequestDto implements IPagedResultRequest, ILimitedResultRequest {
  skipCount: number = 0;
  maxResultCount: number = 10;
}