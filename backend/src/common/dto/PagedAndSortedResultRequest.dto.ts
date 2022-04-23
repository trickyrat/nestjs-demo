import { IPagedAndSortedResultRequest } from "../interface/IPagedAndSortedResultRequest";
import { IPagedResultRequest } from "../interface/IPagedResultRequest";
import { PagedResultRequestDto } from "./PagedResultRequest.dto";


export class PagedAndSortedResultRequestDto extends PagedResultRequestDto implements IPagedAndSortedResultRequest, IPagedResultRequest {
  order: string | null = "asc";
  maxResultCount: number = 10;
  skipCount: number = 0;
  sorting: string | null = "id";
}