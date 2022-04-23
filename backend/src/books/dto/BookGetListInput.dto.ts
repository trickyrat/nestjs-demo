import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PagedSortedAndFilteredResultRequestDto } from "src/common/dto/PagedSortedAndFilteredResultRequest.dto";
import { ITimedResultRequest } from "src/common/interface/ITimedResultRequest";

export class BookGetListInput extends PagedSortedAndFilteredResultRequestDto implements ITimedResultRequest {
  @ApiPropertyOptional()
  startDate: string;
  @ApiPropertyOptional()
  endDate: string;
}