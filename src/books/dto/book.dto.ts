import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  publishDate: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  author: string;
}
