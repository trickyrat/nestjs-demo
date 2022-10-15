import { ApiPropertyOptional, OmitType } from "@nestjs/swagger";
import { PagedResultRequestDto } from "./PagedResultRequest.dto";


export class PagedAndSortedResultRequestDto extends OmitType(PagedResultRequestDto, []) {
  @ApiPropertyOptional()
  order: string | null = "asc";
  @ApiPropertyOptional()
  sorting: string | null = "id";
}