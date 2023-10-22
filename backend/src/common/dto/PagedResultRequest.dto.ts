import { ApiProperty, OmitType } from '@nestjs/swagger';
import { LimitedResultRequestDto } from './LimitedResultRequest.dto';

export class PagedResultRequestDto extends OmitType(
  LimitedResultRequestDto,
  [],
) {
  @ApiProperty({
    description: 'The page index',
    minimum: 0,
    default: 0,
    type: Number,
  })
  skipCount: number = 0;
}
