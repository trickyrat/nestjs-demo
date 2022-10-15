import { ApiProperty } from "@nestjs/swagger";

export class LimitedResultRequestDto {
  @ApiProperty({
    description: "The count of data per page",
    minimum: 1,
    default: 20,
    type: Number
  })
  maxResultCount: number = 10;
}