import { ILimitedResultRequest } from "../interface/ILimitedResultRequest";

export class LimitedResultRequestDto implements ILimitedResultRequest {
  maxResultCount: number = 10;
}