import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IFilteredResultRequest } from "../interface/IFilteredResultRequest";
import { PagedAndSortedResultRequestDto } from "./PagedAndSortedResultRequest.dto";

export class PagedSortedAndFilteredResultRequestDto
  extends PagedAndSortedResultRequestDto implements IFilteredResultRequest {
  @ApiPropertyOptional()
  filter: string | null;
  @ApiProperty({
    description: "The count of data per page",
    minimum: 1,
    default: 20,
    type: Number
  })
  maxResultCount: number = 10;
  @ApiProperty({
    description: "The page index",
    minimum: 0,
    default: 0,
    type: Number
  })
  skipCount: number = 0;
  @ApiPropertyOptional()
  sorting: string | null = "id";
  @ApiPropertyOptional()
  order: string | null = "asc";
}

