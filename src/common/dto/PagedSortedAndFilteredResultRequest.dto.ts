import { IFilteredResultRequest } from "../interface/IFilteredResultRequest";
import { PagedAndSortedResultRequestDto } from "./PagedAndSortedResultRequest.dto";

export class PagedSortedAndFilteredResultRequestDto
  extends PagedAndSortedResultRequestDto implements IFilteredResultRequest {
  filter: string | null;
  maxResultCount: number = 10;
  skipCount: number = 0;
  sorting: string | null = "id";
  order: string | null = "asc";
}

