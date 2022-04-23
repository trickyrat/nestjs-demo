import { ILimitedResultRequest } from "./ILimitedResultRequest";
import { IPagedResultRequest } from "./IPagedResultRequest";
import { ISortedResultRequest } from "./ISortedResultRequest";

export interface IPagedAndSortedResultRequest extends IPagedResultRequest, ILimitedResultRequest, ISortedResultRequest {

}