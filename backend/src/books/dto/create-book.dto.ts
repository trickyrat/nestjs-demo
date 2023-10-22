import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  publishDate: string;
  @ApiProperty()
  authorId: number;
}
