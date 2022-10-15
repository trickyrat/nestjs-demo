import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class PagedSortedAndFilteredResultRequestDto {
  @ApiProperty({
    description: "The count of data per page",
    minimum: 1,
    default: 20,
    type: Number
  })
  maxResultCount: number = 10;
  @ApiPropertyOptional()
  order: string | null = "asc";
  @ApiPropertyOptional()
  sorting: string | null = "id";
  @ApiProperty({
    description: "The page index",
    minimum: 0,
    default: 0,
    type: Number
  })
  skipCount: number = 0;
  @ApiPropertyOptional()
  filter: string | null;
}

