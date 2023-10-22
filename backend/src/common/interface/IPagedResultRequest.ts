import { ILimitedResultRequest } from './ILimitedResultRequest';

export interface IPagedResultRequest extends ILimitedResultRequest {
  skipCount: number;
}
